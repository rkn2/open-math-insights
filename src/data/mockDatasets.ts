import type { Dataset, DatasetSummary, StatsResponse } from "@/shared/types";

/**
 * Local fallback fixtures — used by the hooks in src/hooks/* whenever the real
 * API isn't reachable (e.g. running the frontend standalone with no backend
 * deployed yet). This keeps the demo fully browsable out of the box. The
 * authoritative mock data served by the real API lives in
 * infra/lambda/data/datasets.json — kept in sync by hand for now since this is
 * a scaffold, not a shipped product.
 */
export const mockDatasets: Dataset[] = [
  {
    id: "grade5-fraction-word-problems",
    title: "Grade 5 Fraction Word-Problem Responses (Anonymized)",
    summary: "12,400 de-identified student responses to open-ended fraction word problems.",
    description:
      "A collection of anonymized short-answer responses to 40 fraction word problems administered across 6 partner districts in the 2024–25 school year. Each response is tagged with the standard it targets and a rubric score (1–4). No student, teacher, or school identifiers are included — see the Metadata tab for the de-identification review notes.",
    gradeBands: ["3-5"],
    topics: ["Fractions", "Word Problems"],
    license: "CC-BY-4.0",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "OMI Data Collective",
    publishedDate: "2025-02-14",
    fileCount: 3,
    totalSize: "84 MB",
    doi: "10.5281/omi.24601",
    files: [
      { name: "responses_2024-25.csv", size: "61 MB", type: "CSV" },
      { name: "item_bank.json", size: "1.8 MB", type: "JSON" },
      { name: "rubric_and_codebook.pdf", size: "2.1 MB", type: "PDF" },
    ],
    relatedDatasetIds: ["k2-number-sense-assessment-bank", "middle-school-ratios-proportions"],
  },
  {
    id: "algebra1-eoc-item-bank",
    title: "Algebra I End-of-Course Item Bank",
    summary: "540 released and openly licensed Algebra I end-of-course items with answer keys.",
    description:
      "A curated bank of Algebra I end-of-course assessment items released into the public domain or openly licensed by contributing states and districts, standardized into a single item format with difficulty tags and standard alignment.",
    gradeBands: ["9-12"],
    topics: ["Algebra I", "Assessment & Growth"],
    license: "CC0-1.0",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "Open Assessment Lab",
    publishedDate: "2024-11-02",
    fileCount: 2,
    totalSize: "18 MB",
    doi: "10.5281/omi.24187",
    files: [
      { name: "algebra1_items.jsonl", size: "16 MB", type: "JSONL" },
      { name: "standards_crosswalk.csv", size: "2 MB", type: "CSV" },
    ],
    relatedDatasetIds: ["open-geometry-proof-dataset", "naep-style-grade8-released-items-2025"],
  },
  {
    id: "district-math-growth-scores",
    title: "District-Wide Math Growth Scores 2021–2024",
    summary: "Aggregated, grade-band-level growth scores across 36 contributing districts.",
    description:
      "Three years of aggregated (never individual-student) math growth-score summaries, rolled up to grade-band and district level, published to support research on measuring growth in under-resourced districts. All values below school-level minimum-N thresholds are suppressed.",
    gradeBands: ["6-8", "9-12"],
    topics: ["Assessment & Growth"],
    license: "CC-BY-4.0",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "OMI Data Collective",
    publishedDate: "2024-09-30",
    fileCount: 4,
    totalSize: "6 MB",
    doi: "10.5281/omi.23904",
    files: [
      { name: "growth_scores_2021-2024.csv", size: "4.1 MB", type: "CSV" },
      { name: "district_metadata.csv", size: "0.4 MB", type: "CSV" },
      { name: "suppression_methodology.pdf", size: "1.2 MB", type: "PDF" },
      { name: "readme.md", size: "8 KB", type: "Markdown" },
    ],
    relatedDatasetIds: ["algebra1-eoc-item-bank", "naep-style-grade8-released-items-2025"],
  },
  {
    id: "open-geometry-proof-dataset",
    title: "Open Geometry Proof Dataset",
    summary: "3,200 student-written geometry proofs, hand-scored and machine-parsed.",
    description:
      "Student-written two-column and paragraph geometry proofs collected across high school geometry classrooms, each paired with a rubric score and a structured parse of the proof's logical steps — intended for research on automated proof assessment.",
    gradeBands: ["9-12"],
    topics: ["Geometry"],
    license: "Public Domain",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "Dr. Priya Nandan, Open Assessment Lab",
    publishedDate: "2024-05-19",
    fileCount: 3,
    totalSize: "112 MB",
    doi: "10.5281/omi.22811",
    files: [
      { name: "proofs_raw_text.jsonl", size: "94 MB", type: "JSONL" },
      { name: "proofs_parsed_steps.json", size: "15 MB", type: "JSON" },
      { name: "scoring_rubric.pdf", size: "3 MB", type: "PDF" },
    ],
    relatedDatasetIds: ["algebra1-eoc-item-bank"],
  },
  {
    id: "k2-number-sense-assessment-bank",
    title: "K-2 Number Sense Assessment Bank",
    summary: "An openly licensed bank of early number-sense assessment tasks and scoring guides.",
    description:
      "One-on-one number-sense assessment tasks (counting, subitizing, comparing quantities) designed for K-2 classrooms, with audio-free scoring guides so they can be administered without recording student voices — a deliberate design choice to keep the dataset PII-free.",
    gradeBands: ["K-2"],
    topics: ["Number Sense"],
    license: "CC0-1.0",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "Lincoln Elementary Math Dept",
    publishedDate: "2025-04-01",
    fileCount: 2,
    totalSize: "5 MB",
    doi: "10.5281/omi.25102",
    files: [
      { name: "tasks_and_scoring_guide.pdf", size: "4.6 MB", type: "PDF" },
      { name: "task_bank.csv", size: "0.4 MB", type: "CSV" },
    ],
    relatedDatasetIds: ["grade5-fraction-word-problems"],
  },
  {
    id: "stats-probability-classroom-item-set",
    title: "Statistics & Probability Classroom Item Set",
    summary: "A middle-school statistics & probability item set with sample student work.",
    description:
      "A set of 210 statistics and probability items designed for middle-school classrooms, contributed with de-identified sample student responses illustrating common misconceptions, for use in teacher training and item-analysis research.",
    gradeBands: ["6-8"],
    topics: ["Statistics & Probability"],
    license: "CC-BY-4.0",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "OMI Data Collective",
    publishedDate: "2024-08-12",
    fileCount: 2,
    totalSize: "22 MB",
    doi: "10.5281/omi.23512",
    files: [
      { name: "item_set.csv", size: "3 MB", type: "CSV" },
      { name: "sample_responses.jsonl", size: "19 MB", type: "JSONL" },
    ],
    relatedDatasetIds: ["middle-school-ratios-proportions", "naep-style-grade8-released-items-2025"],
  },
  {
    id: "middle-school-ratios-proportions",
    title: "Middle School Ratios & Proportions Problem Bank",
    summary: "480 openly licensed ratio-and-proportion problems with worked solutions.",
    description:
      "A problem bank spanning unit rates, scale, and proportional relationships, contributed by a consortium of middle-school math departments, each item paired with a full worked solution for classroom or tutoring use.",
    gradeBands: ["6-8"],
    topics: ["Ratios & Proportions"],
    license: "CC-BY-4.0",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "Lincoln Middle School Math Dept",
    publishedDate: "2025-01-22",
    fileCount: 1,
    totalSize: "9 MB",
    doi: "10.5281/omi.24990",
    files: [{ name: "ratios_proportions_bank.pdf", size: "9 MB", type: "PDF" }],
    relatedDatasetIds: ["grade5-fraction-word-problems", "stats-probability-classroom-item-set"],
  },
  {
    id: "naep-style-grade8-released-items-2025",
    title: "NAEP-style Grade 8 Released Items (2025)",
    summary: "150 grade 8 released items modeled on NAEP frameworks, with scoring keys.",
    description:
      "Grade 8 assessment items written to mirror the cognitive demand and format of NAEP math frameworks, released for open classroom and research use with full scoring keys and standard alignment.",
    gradeBands: ["6-8"],
    topics: ["Assessment & Growth"],
    license: "Public Domain",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "Open Assessment Lab",
    publishedDate: "2025-06-03",
    fileCount: 2,
    totalSize: "14 MB",
    doi: "10.5281/omi.25340",
    files: [
      { name: "released_items_2025.pdf", size: "11 MB", type: "PDF" },
      { name: "scoring_keys.csv", size: "3 MB", type: "CSV" },
    ],
    relatedDatasetIds: ["algebra1-eoc-item-bank", "district-math-growth-scores"],
  },

  // --- Real, publicly-sourced datasets (downloaded — see data/public/<id>/SOURCE.md) ---
  {
    id: "naep-math-scale-scores-2003-2024",
    title: "NAEP Mathematics Scale Scores — Grades 4 & 8 (2003–2024)",
    summary:
      "132 real average scale-score data points for national and 5-state jurisdictions, pulled live from the official Nation's Report Card API.",
    description:
      "Average NAEP mathematics scale scores (the \"MRPCM\" composite scale, all students) for grades 4 and 8, covering the national public-school population and five states (California, Texas, New York, Massachusetts, Florida) across eleven assessment years from 2003 to 2024. Unlike the other datasets in this Data Depot, this one was assembled by directly querying NCES's public Nation's Report Card Data Service API for every grade × jurisdiction × year combination — each value traces back to an official federal government data source.",
    gradeBands: ["3-5", "6-8"],
    topics: ["Assessment & Growth"],
    license: "Public Domain",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "National Center for Education Statistics (NCES)",
    publishedDate: "2026-08-11",
    fileCount: 2,
    totalSize: "5 KB",
    doi: "N/A (see source)",
    files: [
      { name: "naep_math_scale_scores.csv", size: "3.6 KB", type: "CSV" },
      { name: "SOURCE.md", size: "1.5 KB", type: "Markdown" },
    ],
    relatedDatasetIds: ["assistments-2009-2010-skill-builder", "pisa-math-scores-owid-2009-2022"],
    sourceType: "public-external",
    sourceUrl: "https://www.nationsreportcard.gov/",
    citationText:
      "U.S. Department of Education, Institute of Education Sciences, National Center for Education Statistics, National Assessment of Educational Progress (NAEP), various years, 2003–2024 Mathematics Assessments. Retrieved from The Nation's Report Card (https://www.nationsreportcard.gov).",
  },
  {
    id: "assistments-2009-2010-skill-builder",
    title: "ASSISTments 2009–2010 Skill Builder Data",
    summary:
      "525,534 real, anonymized math tutoring-system problem-response logs — a classic educational-data-mining dataset.",
    description:
      "Real problem-response logs from the ASSISTments online math tutoring system, school year 2009–2010 — one row per problem attempt, with an anonymized student ID, the skill being practiced, whether the response was correct, attempt count, hint usage, and response timing, spanning students across roughly grades 4–10. Widely cited in the educational-data-mining and knowledge-tracing research communities. Retrieved from a figshare mirror; file integrity verified by MD5 checksum against the figshare record.",
    gradeBands: ["3-5", "6-8", "9-12"],
    topics: ["Algebra I", "Fractions", "Assessment & Growth"],
    license: "CC-BY-4.0",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "ASSISTments / Worcester Polytechnic Institute (via figshare mirror)",
    publishedDate: "2024-02-29",
    fileCount: 2,
    totalSize: "83.2 MB",
    doi: "10.6084/m9.figshare.25309000.v2",
    files: [
      { name: "skill_builder_data.csv", size: "79.4 MB", type: "CSV" },
      { name: "SOURCE.md", size: "1.8 KB", type: "Markdown" },
    ],
    relatedDatasetIds: ["naep-math-scale-scores-2003-2024", "pisa-math-scores-owid-2009-2022"],
    sourceType: "public-external",
    sourceUrl: "https://doi.org/10.6084/m9.figshare.25309000.v2",
    citationText:
      "ASSISTments Skill-builder data 2009-2010 (https://sites.google.com/site/assistmentsdata/home/2009-2010-assistment-data/skill-builder-data-2009-2010). Mirror used here: Liang, Zhijie (2024). ASSISTments2009 [Dataset]. figshare. https://doi.org/10.6084/m9.figshare.25309000.v2",
  },
  {
    id: "pisa-math-scores-owid-2009-2022",
    title: "OECD PISA Mathematics Scores by Country (2009–2022)",
    summary:
      "452 real average PISA math scores by country and year, via Our World in Data's OECD PISA database export.",
    description:
      "Average PISA (Programme for International Student Assessment) mathematics score for 15-year-old students, by country and assessment year (2009–2022). PISA measures how well 15-year-olds — roughly the end of compulsory schooling — can apply math to real-world problems, and is the standard international benchmark for comparing math outcomes across school systems.",
    gradeBands: ["9-12"],
    topics: ["Assessment & Growth", "International Comparison"],
    license: "CC-BY-4.0",
    piiReviewStatus: "reviewed-no-pii",
    contributor: "OECD (via Our World in Data)",
    publishedDate: "2026-08-11",
    fileCount: 3,
    totalSize: "17 KB",
    doi: "N/A (see source)",
    files: [
      { name: "pisa_math_scores.csv", size: "12.3 KB", type: "CSV" },
      { name: "pisa_math_scores.metadata.json", size: "3.1 KB", type: "JSON" },
      { name: "SOURCE.md", size: "1.3 KB", type: "Markdown" },
    ],
    relatedDatasetIds: ["naep-math-scale-scores-2003-2024", "assistments-2009-2010-skill-builder"],
    sourceType: "public-external",
    sourceUrl: "https://ourworldindata.org/grapher/academic-performance?subject=mathematics",
    citationText:
      'OECD (2023) – with minor processing by Our World in Data. "Average performance of 15-year-old students in mathematics" [dataset]. OECD, "PISA Database" [original data]. Via https://ourworldindata.org/grapher/academic-performance',
  },
];

export function toDatasetSummary(dataset: Dataset): DatasetSummary {
  const { files, description, relatedDatasetIds, ...summary } = dataset;
  return summary;
}

export const mockDatasetSummaries: DatasetSummary[] = mockDatasets.map(toDatasetSummary);

export const mockStats: StatsResponse = {
  datasetCount: mockDatasets.length,
  // 42,300 illustrative records from the omi-consortium fixtures + 525,534 real
  // ASSISTments rows + 132 real NAEP data points + 452 real PISA data points.
  recordCount: 568_418,
  dataStored: "1.9 TB",
  contributingDistricts: 36,
};
