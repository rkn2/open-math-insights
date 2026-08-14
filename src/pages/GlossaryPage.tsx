import { useState, useMemo } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SearchInput } from "@/components/ui/SearchInput";

interface Term {
  term: string;
  definition: string;
  category: "data" | "privacy" | "statistics" | "methods" | "infrastructure";
  seeAlso?: string[];
}

const TERMS: Term[] = [
  {
    term: "Annotation",
    definition:
      "Human- or machine-applied labels on raw data. In education research: coding student work for error types, labeling problem-solving strategies, or marking productive vs. unproductive struggle. Different teams may use the term differently — the CAMEL network identified this as a key area where shared definitions are needed.",
    category: "methods",
    seeAlso: ["Codebook", "Inter-Rater Reliability"],
  },
  {
    term: "CC-BY-4.0",
    definition:
      "A Creative Commons license that allows anyone to use, share, and adapt the data for any purpose — including commercial — as long as they credit the original source. The most common license on OMI.",
    category: "infrastructure",
    seeAlso: ["CC0-1.0", "License"],
  },
  {
    term: "CC0-1.0",
    definition:
      "A Creative Commons public domain dedication. No restrictions — you don't even need to give credit (though it's good practice). Typically used for government-produced data.",
    category: "infrastructure",
    seeAlso: ["CC-BY-4.0", "License"],
  },
  {
    term: "Cluster Analysis",
    definition:
      "An unsupervised machine learning technique that groups similar data points together. In education data: finding groups of countries with similar PISA trajectories, or identifying student learning profiles. K-Means is the most common algorithm. Clusters are descriptive — they show what groups exist, not why.",
    category: "statistics",
    seeAlso: ["Machine Learning", "Feature Importance"],
  },
  {
    term: "Codebook",
    definition:
      "A document that tells someone else what every variable in your dataset means — the key to reading the data. Includes variable names, descriptions, valid values, and coding schemes. More narrative than a data dictionary; meant for human understanding.",
    category: "data",
    seeAlso: ["Data Dictionary", "Annotation", "Schema"],
  },
  {
    term: "Confidence Interval",
    definition:
      "A range of values that, if the study were repeated many times, would contain the true population value a specified percentage of the time (usually 95%). A NAEP score of 240 ± 5 means the interval 235–245 would capture the true average in 95 out of 100 repeated samples. It does NOT mean there's a 95% chance the true value is in this specific interval.",
    category: "statistics",
    seeAlso: ["Statistical Significance", "Sample Size"],
  },
  {
    term: "Correlation",
    definition:
      "A statistical measure of how two variables move together (r ranges from −1 to +1). A positive correlation means they tend to increase together; negative means one increases as the other decreases. Correlation does not imply causation — two variables can be correlated because of a third factor.",
    category: "statistics",
    seeAlso: ["Effect Size"],
  },
  {
    term: "Data Dictionary",
    definition:
      "A structured, technical specification of every column in a dataset: name, data type, valid values, units, and constraints. More machine-oriented than a codebook. Example: the NAEP dataset's data dictionary would specify that 'jurisdiction' is a string with valid values {NP, CA, FL, MA, NY, TX}.",
    category: "data",
    seeAlso: ["Codebook", "Schema", "Metadata"],
  },
  {
    term: "De-identification",
    definition:
      "The process of removing or obscuring personally identifiable information (PII) from a dataset so that individuals cannot be identified. Includes stripping direct identifiers (names, IDs), suppressing small cells (fewer than 5 students), and auditing free-text fields. Required under FERPA before publishing education data.",
    category: "privacy",
    seeAlso: ["FERPA", "PII", "Small-Cell Suppression"],
  },
  {
    term: "DOI (Digital Object Identifier)",
    definition:
      "A permanent, unique identifier for a dataset or publication (e.g., 10.6084/m9.figshare.25309000). DOIs resolve to a landing page even if URLs change. Most data repositories (OSF, Dataverse, Figshare) mint DOIs automatically upon publication. Always include the DOI in your citation.",
    category: "infrastructure",
    seeAlso: ["FAIR Principles"],
  },
  {
    term: "Effect Size",
    definition:
      "A measure of how large a difference or relationship is, independent of sample size. Cohen's d is the most common: d = 0.2 is small, 0.5 is medium, 0.8 is large. A statistically significant result can have a tiny effect size — meaning it's real but too small to matter in practice.",
    category: "statistics",
    seeAlso: ["Statistical Significance", "Confidence Interval"],
  },
  {
    term: "FAIR Principles",
    definition:
      "A set of guidelines for scientific data management: Findable (metadata, DOIs), Accessible (open protocols), Interoperable (standard formats and schemas), Reusable (clear licensing, provenance). OMI's Data Depot is designed around these principles.",
    category: "infrastructure",
    seeAlso: ["DOI", "Metadata", "License"],
  },
  {
    term: "Feature Importance",
    definition:
      "In machine learning, a measure of how much each input variable contributes to a prediction. Methods include Gini importance, permutation importance, and SHAP values. In education: does prior correctness, time spent, or hint usage best predict mastery? Feature importance shows which variables the model relies on most — but importance ≠ causation.",
    category: "statistics",
    seeAlso: ["Machine Learning", "Cluster Analysis"],
  },
  {
    term: "FERPA",
    definition:
      "The Family Educational Rights and Privacy Act — a U.S. federal law that protects the privacy of student education records. FERPA applies to all schools receiving federal funding. Sharing student data without consent requires de-identification or a qualifying exception (e.g., the 'studies' exception under §99.31(a)(6)).",
    category: "privacy",
    seeAlso: ["De-identification", "PII", "IRB"],
  },
  {
    term: "Inter-Rater Reliability (IRR)",
    definition:
      "A measure of how much two or more human coders agree when independently coding the same data. Cohen's kappa (κ) is the standard metric: κ ≥ 0.70 is the typical threshold for acceptable agreement. Kappa corrects for chance agreement — raw percent agreement alone is misleading.",
    category: "methods",
    seeAlso: ["Annotation", "Codebook", "Kappa"],
  },
  {
    term: "IRB (Institutional Review Board)",
    definition:
      "A committee that reviews and approves research involving human subjects. Required before any data collection from students or teachers. IRB approval does not mean data can be published freely — published datasets must still be de-identified unless participants consented to identifiable data sharing.",
    category: "privacy",
    seeAlso: ["FERPA", "De-identification"],
  },
  {
    term: "Kappa (Cohen's κ)",
    definition:
      "A statistic that measures agreement between two raters, correcting for agreement that would occur by chance. Values range from −1 (systematic disagreement) to +1 (perfect agreement). In education research, κ ≥ 0.70 is the standard threshold for establishing that an annotation codebook is reliable enough to use.",
    category: "statistics",
    seeAlso: ["Inter-Rater Reliability", "Annotation"],
  },
  {
    term: "License",
    definition:
      "A legal document that specifies how data can be used. Without a license, downstream users cannot legally reuse your data. OMI publishes under three licenses: CC-BY-4.0 (attribution required), CC0-1.0 (public domain), and Public Domain. Always choose explicitly — 'no license' ≠ 'free to use.'",
    category: "infrastructure",
    seeAlso: ["CC-BY-4.0", "CC0-1.0"],
  },
  {
    term: "Machine Learning (ML)",
    definition:
      "Finding patterns in data that are too complex for a human to specify as rules. Supervised ML learns from labeled examples (e.g., 'this is productive struggle'); unsupervised ML finds natural groupings without labels. ML can process scale humans can't but cannot establish causation or be better than its training data.",
    category: "statistics",
    seeAlso: ["Cluster Analysis", "Feature Importance"],
  },
  {
    term: "Metadata",
    definition:
      "Data about data. Dataset-level metadata describes who collected it, when, what population it covers, and what license applies. Variable-level metadata describes what each column means — that's essentially your data dictionary. Good metadata is what makes a dataset findable and reusable by someone who wasn't involved in collecting it.",
    category: "data",
    seeAlso: ["Data Dictionary", "Schema", "FAIR Principles"],
  },
  {
    term: "NAEP",
    definition:
      "The National Assessment of Educational Progress — 'The Nation's Report Card.' A congressionally mandated U.S. assessment administered by NCES. Tests students in grades 4 and 8 (and sometimes 12) on a 0–500 scale linked across years for trend analysis. Scores are reported at national and state levels, never at the school or student level.",
    category: "data",
    seeAlso: ["PISA", "Scale Score"],
  },
  {
    term: "PII (Personally Identifiable Information)",
    definition:
      "Any data element that could identify a specific individual, alone or in combination with other information. Direct PII: names, IDs, addresses, photos. Indirect PII: school name + grade + year in a small class. All PII must be removed before publishing education data on OMI.",
    category: "privacy",
    seeAlso: ["De-identification", "FERPA", "Small-Cell Suppression"],
  },
  {
    term: "PISA",
    definition:
      "The Programme for International Student Assessment, administered by the OECD every three years. Tests 15-year-olds (regardless of grade) in reading, math, and science. Scores are centered at 500 with a standard deviation of 100 (set in 2003). Designed for cross-country comparison, not within-school assessment.",
    category: "data",
    seeAlso: ["NAEP", "Scale Score"],
  },
  {
    term: "Sample Size",
    definition:
      "The number of observations in a dataset or analysis. Larger samples produce more precise estimates (narrower confidence intervals) and can detect smaller effects. Small samples can be misleading — a 20-point NAEP score difference based on 12 students means much less than the same difference based on 12,000.",
    category: "statistics",
    seeAlso: ["Confidence Interval", "Small-Cell Suppression"],
  },
  {
    term: "Scale Score",
    definition:
      "A score on a standardized, linked scale designed for comparison across years or groups. NAEP uses a 0–500 scale; PISA centers at 500 with SD=100. Scale scores from different assessments cannot be compared directly — a 240 on NAEP and a 480 on PISA are on completely different scales.",
    category: "data",
    seeAlso: ["NAEP", "PISA"],
  },
  {
    term: "Schema",
    definition:
      "The structure of a dataset: what fields exist, their data types, and their relationships. Like a blueprint for a building. The NAEP dataset's schema is: year (integer), grade (integer), jurisdiction (string), jurisdiction_label (string), avg_scale_score (float). A schema is structural; a codebook adds meaning.",
    category: "data",
    seeAlso: ["Data Dictionary", "Codebook", "Metadata"],
  },
  {
    term: "Small-Cell Suppression",
    definition:
      "The practice of withholding or aggregating data cells that contain fewer than a threshold number of observations (typically 5). Serves two purposes: protects student privacy (small groups are more identifiable) and ensures statistical reliability (estimates from tiny groups are unreliable). Standard practice at NCES and most state education agencies.",
    category: "privacy",
    seeAlso: ["De-identification", "PII", "Sample Size"],
  },
  {
    term: "Statistical Significance",
    definition:
      "A result is 'statistically significant' (typically p < .05) when it's unlikely to have occurred by chance alone. This says nothing about whether the result is large, important, or practically meaningful — only that it's unlikely to be zero. Always pair with effect size.",
    category: "statistics",
    seeAlso: ["Effect Size", "Confidence Interval", "Sample Size"],
  },
];

const CATEGORY_LABELS: Record<Term["category"], string> = {
  data: "Data & Documentation",
  privacy: "Privacy & Ethics",
  statistics: "Statistics & ML",
  methods: "Methods",
  infrastructure: "Infrastructure",
};

const CATEGORY_COLORS: Record<Term["category"], string> = {
  data: "bg-primary-100 text-primary-700",
  privacy: "bg-rose-100 text-rose-700",
  statistics: "bg-teal-100 text-teal-700",
  methods: "bg-amber-100 text-amber-700",
  infrastructure: "bg-slate-200 text-slate-700",
};

export function GlossaryPage() {
  useDocumentTitle("Glossary");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Term["category"] | "all">("all");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TERMS.filter((t) => {
      if (activeCategory !== "all" && t.category !== activeCategory) return false;
      if (q && !t.term.toLowerCase().includes(q) && !t.definition.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [search, activeCategory]);

  const categories: (Term["category"] | "all")[] = ["all", "data", "privacy", "statistics", "methods", "infrastructure"];

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Reference"
        title="Glossary"
        subtitle="Definitions for terms used across OMI — data documentation, privacy, statistics, and infrastructure. Searchable and cross-referenced."
      />

      <div className="mt-8 space-y-4">
        <SearchInput
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {cat === "all" ? "All" : CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {filtered.length} of {TERMS.length} terms
      </p>

      <dl className="mt-6 divide-y divide-slate-100">
        {filtered.map((t) => (
          <div key={t.term} id={t.term.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-24 py-6">
            <dt className="flex flex-wrap items-center gap-2">
              <span className="font-display text-lg font-bold text-slate-900">{t.term}</span>
              <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${CATEGORY_COLORS[t.category]}`}>
                {CATEGORY_LABELS[t.category]}
              </span>
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600">
              {t.definition}
            </dd>
            {t.seeAlso && t.seeAlso.length > 0 && (
              <dd className="mt-2 flex flex-wrap gap-1.5">
                <span className="text-xs text-slate-400">See also:</span>
                {t.seeAlso.map((ref) => (
                  <a
                    key={ref}
                    href={`#${ref.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                    className="text-xs font-medium text-primary-600 hover:underline"
                  >
                    {ref}
                  </a>
                ))}
              </dd>
            )}
          </div>
        ))}
      </dl>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-slate-400">
          No terms match your search. Try a different keyword or clear the filter.
        </p>
      )}
    </div>
  );
}
