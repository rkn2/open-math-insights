import type { Dataset, DatasetSummary, StatsResponse } from "@/shared/types";

/**
 * Local fallback fixtures — used by the hooks in src/hooks/* whenever the real
 * API isn't reachable (e.g. running the frontend standalone with no backend
 * deployed yet). Only real, externally-hosted public datasets are listed here.
 * Each entry links to its original source via sourceUrl and carries a verified
 * citation from the dataset's SOURCE.md.
 */
export const mockDatasets: Dataset[] = [
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
  // 132 NAEP data points + 525,534 ASSISTments rows + 452 PISA data points.
  recordCount: 526_118,
  dataStored: "83 MB",
  contributingDistricts: 0,
};
