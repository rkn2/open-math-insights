/**
 * Client-side dataset discovery engine — matches user questions against the
 * indexed dataset metadata and (for NAEP/PISA) real CSV summary stats. No
 * external API calls; every answer is grounded in what's on this site.
 */
import { mockDatasets } from "@/data/mockDatasets";
import { parseCsv, summarizeCsvRows } from "@/shared/csv";
import type { CsvSummaryStats } from "@/shared/csv";
import type { Dataset } from "@/shared/types";

// ---------------------------------------------------------------------------
// Search result shape
// ---------------------------------------------------------------------------

export interface SearchResult {
  datasetId: string;
  title: string;
  relevance: "high" | "medium" | "low";
  reason: string;
  score: number;
}

// ---------------------------------------------------------------------------
// Short display labels — used where the full title is too long for a chip or
// inline sentence. Defined here rather than splitting on punctuation that
// isn't uniformly present across all titles.
// ---------------------------------------------------------------------------

const SHORT_LABELS: Record<string, string> = {
  "naep-math-scale-scores-2003-2024": "NAEP Math Scores",
  "assistments-2009-2010-skill-builder": "ASSISTments",
  "pisa-math-scores-owid-2009-2022": "PISA Math Scores",
};

export function shortLabel(datasetId: string): string {
  return SHORT_LABELS[datasetId] ?? datasetId;
}

// ---------------------------------------------------------------------------
// CSV stats cache — keyed by dataset id, stored as a single shared Promise so
// concurrent callers don't double-fetch.
// ---------------------------------------------------------------------------

interface DatasetCsvStats {
  stats: CsvSummaryStats;
  /** The score column name we actually care about for this dataset. */
  scoreColumn: string | undefined;
  /** Readable year range derived from the data itself. */
  yearRange: { min: number; max: number } | undefined;
}

const CSV_REGISTRY: Record<string, { file: string; scoreColumn: string }> = {
  "naep-math-scale-scores-2003-2024": {
    file: "naep_math_scale_scores.csv",
    scoreColumn: "avg_scale_score",
  },
  "pisa-math-scores-owid-2009-2022": {
    file: "pisa_math_scores.csv",
    scoreColumn: "pisa_math_all_average",
  },
};

const csvCache = new Map<string, Promise<DatasetCsvStats | null>>();

function fetchAndCacheCsv(datasetId: string): Promise<DatasetCsvStats | null> {
  const existing = csvCache.get(datasetId);
  if (existing) return existing;

  const entry = CSV_REGISTRY[datasetId];
  if (!entry) {
    const p = Promise.resolve(null);
    csvCache.set(datasetId, p);
    return p;
  }

  const promise = fetch(`${import.meta.env.BASE_URL}data/${entry.file}`)
    .then((res) => {
      if (!res.ok) return null;
      return res.text();
    })
    .then((text) => {
      if (!text) return null;
      const rows = parseCsv(text);
      const stats = summarizeCsvRows(rows);

      // Derive year range from data
      const yearCol = stats.numericColumnStats.find((c) => c.column === "year");
      const yearRange = yearCol ? { min: yearCol.min, max: yearCol.max } : undefined;

      // Find the score column we actually want
      const scoreCol = stats.numericColumnStats.find((c) => c.column === entry.scoreColumn);

      return {
        stats,
        scoreColumn: scoreCol ? scoreCol.column : undefined,
        yearRange,
      } satisfies DatasetCsvStats;
    })
    .catch(() => null);

  csvCache.set(datasetId, promise);
  return promise;
}

/** Eagerly warm the cache for all known CSV datasets. */
export function prefetchCsvStats(): void {
  for (const id of Object.keys(CSV_REGISTRY)) {
    fetchAndCacheCsv(id);
  }
}

export async function getCsvStats(datasetId: string): Promise<DatasetCsvStats | null> {
  return fetchAndCacheCsv(datasetId);
}

// ---------------------------------------------------------------------------
// Keyword search
// ---------------------------------------------------------------------------

/** Stop-words removed from queries before matching. */
const STOP_WORDS = new Set([
  "a", "an", "the", "is", "it", "in", "on", "of", "to", "for", "and", "or",
  "are", "was", "were", "be", "been", "has", "have", "had", "do", "does",
  "did", "what", "which", "who", "how", "can", "i", "me", "my", "this",
  "that", "with", "about", "from", "any", "some", "all", "their", "its",
  "you", "your", "there", "here", "tell", "show", "give", "find", "get",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

interface FieldWeight {
  text: string;
  weight: number;
}

function getSearchableFields(dataset: Dataset): FieldWeight[] {
  return [
    { text: dataset.title, weight: 10 },
    { text: dataset.topics.join(" "), weight: 8 },
    { text: dataset.gradeBands.join(" "), weight: 6 },
    { text: dataset.contributor, weight: 5 },
    { text: dataset.summary, weight: 3 },
    { text: dataset.description, weight: 1 },
  ];
}

/**
 * Expand common query terms to also match domain synonyms, e.g. "international"
 * should hit PISA even though the word "international" only appears in the
 * topic name "International Comparison".
 */
const SYNONYMS: Record<string, string[]> = {
  international: ["pisa", "country", "countries", "oecd"],
  pisa: ["international", "country", "countries", "oecd"],
  naep: ["national", "report", "card", "nces"],
  tutoring: ["assistments", "skill", "builder"],
  assistments: ["tutoring", "skill", "builder", "wpi"],
  grade: ["3-5", "6-8", "9-12", "k-2"],
  elementary: ["3-5", "k-2"],
  middle: ["6-8"],
  high: ["9-12"],
  algebra: ["algebra"],
  fractions: ["fractions"],
  assessment: ["assessment", "growth", "scores", "scale"],
  scores: ["score", "scale", "average", "avg"],
  average: ["avg", "mean", "score"],
  country: ["international", "pisa", "oecd"],
  state: ["jurisdiction", "national", "naep"],
  student: ["students", "learner"],
};

export function searchDatasets(query: string): SearchResult[] {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [];

  // Expand tokens with synonyms
  const expandedTokens = new Set(tokens);
  for (const token of tokens) {
    const syns = SYNONYMS[token];
    if (syns) {
      for (const syn of syns) expandedTokens.add(syn);
    }
  }

  const results: SearchResult[] = [];

  for (const dataset of mockDatasets) {
    const fields = getSearchableFields(dataset);
    let totalScore = 0;
    const matchedFields: string[] = [];

    for (const { text, weight } of fields) {
      const lower = text.toLowerCase();
      let fieldHits = 0;
      for (const token of expandedTokens) {
        if (lower.includes(token)) {
          fieldHits++;
        }
      }
      if (fieldHits > 0) {
        totalScore += fieldHits * weight;
        if (weight >= 8) matchedFields.push("title/topic");
        else if (weight >= 5) matchedFields.push("contributor/grade");
        else matchedFields.push("description");
      }
    }

    if (totalScore > 0) {
      const relevance: SearchResult["relevance"] =
        totalScore >= 15 ? "high" : totalScore >= 5 ? "medium" : "low";

      const uniqueFields = [...new Set(matchedFields)];
      results.push({
        datasetId: dataset.id,
        title: dataset.title,
        relevance,
        reason: `Matched in ${uniqueFields.join(", ")}`,
        score: totalScore,
      });
    }
  }

  // Sort by relevance tier, then by score within tier
  return results.sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    const tierDiff = order[a.relevance] - order[b.relevance];
    if (tierDiff !== 0) return tierDiff;
    return b.score - a.score;
  });
}

// ---------------------------------------------------------------------------
// Response generation
// ---------------------------------------------------------------------------

/** Look up a dataset by id. */
function findDataset(id: string): Dataset | undefined {
  return mockDatasets.find((d) => d.id === id);
}

/**
 * Detect whether the user is asking for quantitative/aggregate data about a
 * specific dataset (e.g. "what's the average NAEP score?" or "PISA score
 * range"). Requires an aggregation keyword — bare mentions of "score" or
 * "scores" without an aggregation intent fall through to the normal search
 * path so discovery queries like "which datasets have scores by state?" still
 * list results.
 */
function detectStatsIntent(query: string): string | null {
  const lower = query.toLowerCase();
  const aggregationKeywords = [
    "average", "avg", "mean", "range", "min", "max", "minimum", "maximum",
    "how many", "count", "rows", "data points", "statistics", "stats",
  ];
  const hasAggregation = aggregationKeywords.some((k) => lower.includes(k));
  if (!hasAggregation) return null;

  // Try to identify which dataset
  if (lower.includes("naep")) return "naep-math-scale-scores-2003-2024";
  if (lower.includes("pisa")) return "pisa-math-scores-owid-2009-2022";
  if (lower.includes("assistments") || lower.includes("tutoring"))
    return "assistments-2009-2010-skill-builder";

  return null;
}

function formatScoreStats(
  dataset: Dataset,
  csvStats: DatasetCsvStats,
): string {
  const parts: string[] = [];

  if (csvStats.yearRange) {
    parts.push(
      `covers years **${csvStats.yearRange.min}** to **${csvStats.yearRange.max}**`,
    );
  }

  if (csvStats.scoreColumn) {
    const col = csvStats.stats.numericColumnStats.find(
      (c) => c.column === csvStats.scoreColumn,
    );
    if (col) {
      parts.push(
        `scores range from **${col.min.toFixed(1)}** to **${col.max.toFixed(1)}** (average **${col.avg.toFixed(1)}**)`,
      );
    }
  }

  parts.push(`contains **${csvStats.stats.rowCount}** data points`);

  return `The **${dataset.title}** dataset ${parts.join(", and ")}.`;
}

export interface QuickReply {
  label: string;
  value: string;
}

/** Return type for generateResponse — includes the dataset IDs cited. */
export interface GeneratedResponse {
  text: string;
  groundedInData: boolean;
  /** Dataset IDs mentioned in this response, for rendering real links. */
  datasetIds: string[];
  quickReplies?: QuickReply[];
}

// ---------------------------------------------------------------------------
// Guided decision tree
// ---------------------------------------------------------------------------

const GUIDE_START_REPLIES: QuickReply[] = [
  { label: "U.S. math trends", value: "__guide:us-trends" },
  { label: "International comparison", value: "__guide:international" },
  { label: "Student learning data", value: "__guide:student-learning" },
  { label: "Not sure yet", value: "__guide:not-sure" },
];

const BACK_REPLY: QuickReply = { label: "Start over", value: "__guide:start" };
const STATS_REPLY: QuickReply = { label: "Get live stats", value: "__guide:stats" };

function handleGuidedFlow(key: string): GeneratedResponse | null {
  switch (key) {
    case "__guide:start":
      return {
        text: "What kind of data are you looking for?",
        groundedInData: false,
        datasetIds: [],
        quickReplies: GUIDE_START_REPLIES,
      };

    case "__guide:us-trends": {
      const ds = findDataset("naep-math-scale-scores-2003-2024");
      return {
        text:
          `For U.S. math trends, the best fit is **${ds?.title}** — ${ds?.summary}\n\n` +
          "It covers grades 4 and 8 for national public schools plus five states (CA, FL, MA, NY, TX), from 2003 to 2024.",
        groundedInData: false,
        datasetIds: ["naep-math-scale-scores-2003-2024"],
        quickReplies: [
          STATS_REPLY,
          { label: "Compare with PISA", value: "__guide:international" },
          BACK_REPLY,
        ],
      };
    }

    case "__guide:international": {
      const ds = findDataset("pisa-math-scores-owid-2009-2022");
      return {
        text:
          `For international comparison, the dataset is **${ds?.title}** — ${ds?.summary}\n\n` +
          "It covers 80+ countries of 15-year-old students across PISA cycles from 2003 to 2022. " +
          "Note: PISA uses its own scoring scale, so scores can't be directly compared to NAEP.",
        groundedInData: false,
        datasetIds: ["pisa-math-scores-owid-2009-2022"],
        quickReplies: [
          STATS_REPLY,
          { label: "U.S. trends (NAEP)", value: "__guide:us-trends" },
          BACK_REPLY,
        ],
      };
    }

    case "__guide:student-learning": {
      const ds = findDataset("assistments-2009-2010-skill-builder");
      return {
        text:
          `For individual student learning data, we have **${ds?.title}** — ${ds?.summary}\n\n` +
          "This is student-level tutoring system data with 525k+ rows — correctness, hint usage, and skill labels. " +
          "It's the only row-level dataset in the collection (NAEP and PISA are aggregate scores only). " +
          "Note: the CSV is ~80 MB and hosted externally on Figshare.",
        groundedInData: false,
        datasetIds: ["assistments-2009-2010-skill-builder"],
        quickReplies: [
          { label: "See other datasets", value: "__guide:start" },
          BACK_REPLY,
        ],
      };
    }

    case "__guide:not-sure":
      return {
        text: "No problem — let's narrow it down. What **grade level** are you most interested in?",
        groundedInData: false,
        datasetIds: [],
        quickReplies: [
          { label: "Elementary (K–5)", value: "__guide:grade-elementary" },
          { label: "Middle school (6–8)", value: "__guide:grade-middle" },
          { label: "High school (9–12)", value: "__guide:grade-high" },
          { label: "All grades", value: "__guide:grade-all" },
        ],
      };

    case "__guide:grade-elementary": {
      const ds = findDataset("naep-math-scale-scores-2003-2024");
      return {
        text:
          `For elementary-level data, your best option is **${ds?.title}** — it includes **grade 4** national and state scores.\n\n` +
          "The ASSISTments dataset also covers some 3–5 content (fractions, basic algebra), but at the individual student level from a tutoring system rather than a standardized assessment.",
        groundedInData: false,
        datasetIds: [
          "naep-math-scale-scores-2003-2024",
          "assistments-2009-2010-skill-builder",
        ],
        quickReplies: [STATS_REPLY, BACK_REPLY],
      };
    }

    case "__guide:grade-middle": {
      return {
        text:
          "For middle school, you have two options:\n\n" +
          "- **NAEP Math Scale Scores** — grade 8 aggregate trends by year and jurisdiction\n" +
          "- **ASSISTments Skill Builder** — individual student tutoring data with skill-level detail (grades 3–8 content)\n\n" +
          "NAEP is better for tracking trends over time; ASSISTments is better for studying how individual students learn.",
        groundedInData: false,
        datasetIds: [
          "naep-math-scale-scores-2003-2024",
          "assistments-2009-2010-skill-builder",
        ],
        quickReplies: [STATS_REPLY, BACK_REPLY],
      };
    }

    case "__guide:grade-high": {
      return {
        text:
          "For high school, the options are:\n\n" +
          "- **PISA Math Scores** — international comparison of 15-year-olds (typically grade 9–10 in the U.S.)\n" +
          "- **ASSISTments Skill Builder** — includes Algebra I content used by some 9–12 students\n\n" +
          "PISA is better for cross-country benchmarking; ASSISTments is better for studying skill mastery at the individual level.",
        groundedInData: false,
        datasetIds: [
          "pisa-math-scores-owid-2009-2022",
          "assistments-2009-2010-skill-builder",
        ],
        quickReplies: [STATS_REPLY, BACK_REPLY],
      };
    }

    case "__guide:grade-all": {
      return {
        text:
          "Here are all **3 datasets** currently on OMI:\n\n" +
          "- **NAEP Math Scale Scores** — U.S. national/state trends, grades 4 & 8, 2003–2024\n" +
          "- **PISA Math Scores** — international comparison, 15-year-olds, 80+ countries, 2003–2022\n" +
          "- **ASSISTments Skill Builder** — individual student tutoring logs, 525k rows, skill-level detail\n\n" +
          "Each measures something different — NAEP and PISA are aggregate assessment scores, while ASSISTments is row-level learning data.",
        groundedInData: false,
        datasetIds: [
          "naep-math-scale-scores-2003-2024",
          "pisa-math-scores-owid-2009-2022",
          "assistments-2009-2010-skill-builder",
        ],
        quickReplies: [STATS_REPLY, BACK_REPLY],
      };
    }

    case "__guide:stats":
      return {
        text: "I can compute live statistics from the CSV data. Which dataset?",
        groundedInData: false,
        datasetIds: [],
        quickReplies: [
          { label: "NAEP stats", value: "What are the NAEP statistics?" },
          { label: "PISA stats", value: "What are the PISA statistics?" },
          BACK_REPLY,
        ],
      };

    default:
      return null;
  }
}

/**
 * Generate a complete chat response for the user's question, entirely
 * client-side. Returns the response text (markdown), whether it was grounded
 * in real computed data, and which dataset IDs were cited.
 */
export async function generateResponse(query: string): Promise<GeneratedResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      text: "Please ask a question about the datasets available on OMI!",
      groundedInData: false,
      datasetIds: [],
    };
  }

  // Guided decision tree flow
  if (trimmed.startsWith("__guide:")) {
    const result = handleGuidedFlow(trimmed);
    if (result) return result;
  }

  // Greetings
  const lower = trimmed.toLowerCase();
  if (/^(hi|hello|hey|greetings)\b/.test(lower)) {
    return {
      text:
        "Hello! I can help you explore the **3 datasets** currently indexed on Open Math Insights.\n\n" +
        "You can type a question, or let me walk you through finding the right dataset:",
      groundedInData: false,
      datasetIds: [],
      quickReplies: [
        { label: "Help me find a dataset", value: "__guide:start" },
        { label: "What datasets do you have?", value: "__guide:grade-all" },
        { label: "Get live stats", value: "__guide:stats" },
      ],
    };
  }

  // Check for stats intent
  const statsDatasetId = detectStatsIntent(lower);
  if (statsDatasetId) {
    const dataset = findDataset(statsDatasetId);
    if (dataset) {
      const csvStats = await getCsvStats(statsDatasetId);
      if (csvStats) {
        const statsText = formatScoreStats(dataset, csvStats);
        return {
          text: statsText,
          groundedInData: true,
          datasetIds: [statsDatasetId],
        };
      }
      // ASSISTments or failed fetch — metadata only
      return {
        text:
          `I have metadata for **${dataset.title}** but the CSV data isn't available for live stats in the browser. ` +
          `Here's what I know: ${dataset.summary}`,
        groundedInData: false,
        datasetIds: [statsDatasetId],
      };
    }
  }

  // Keyword search
  const results = searchDatasets(trimmed);

  if (results.length === 0) {
    return {
      text:
        "I didn't find any matching datasets for that query. I can only search the **3 datasets** currently indexed on OMI (NAEP, ASSISTments, and PISA).\n\n" +
        "Want me to walk you through finding the right one?",
      groundedInData: false,
      datasetIds: [],
      quickReplies: [
        { label: "Help me find a dataset", value: "__guide:start" },
        { label: "Show all datasets", value: "__guide:grade-all" },
      ],
    };
  }

  // Build response with dataset recommendations
  const parts: string[] = [];
  const allIds: string[] = [];
  const highRelevance = results.filter((r) => r.relevance === "high");
  const otherRelevance = results.filter((r) => r.relevance !== "high");

  if (highRelevance.length > 0) {
    parts.push(
      highRelevance.length === 1
        ? "I found a strong match:"
        : `I found **${highRelevance.length} strong matches**:`,
    );
    for (const r of highRelevance) {
      const ds = findDataset(r.datasetId);
      if (ds) {
        parts.push(`\n- **${ds.title}** — ${ds.summary}`);
        allIds.push(r.datasetId);
      }
    }
  }

  if (otherRelevance.length > 0) {
    if (highRelevance.length > 0) {
      parts.push("\nYou might also look at:");
    } else {
      parts.push("Here are some possibly relevant datasets:");
    }
    for (const r of otherRelevance) {
      const ds = findDataset(r.datasetId);
      if (ds) {
        parts.push(`\n- **${ds.title}** — ${ds.summary}`);
        allIds.push(r.datasetId);
      }
    }
  }

  // If any result has CSV data available, add a stats hint
  const csvableResults = results.filter((r) => r.datasetId in CSV_REGISTRY);
  if (csvableResults.length > 0) {
    const names = csvableResults.map((r) => shortLabel(r.datasetId));
    parts.push(
      `\nI can compute live statistics for ${names.join(" and ")} — just ask about averages, ranges, or data-point counts.`,
    );
  }

  return { text: parts.join("\n"), groundedInData: false, datasetIds: allIds };
}
