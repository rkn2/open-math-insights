/**
 * Shared types for Open Math Insights (OMI).
 */

export type GradeBand = "K-2" | "3-5" | "6-8" | "9-12";

export type DatasetLicense = "CC-BY-4.0" | "CC0-1.0" | "Public Domain";

export type PiiReviewStatus = "reviewed-no-pii" | "pending-review";

/**
 * "public-external" = a real dataset from an outside public source, shown with a
 * "Verified public dataset" badge and a link out to `sourceUrl`.
 * "community-contributed" = submitted via the contribution/review workflow.
 * "omi-consortium" = reserved for future OMI-curated datasets.
 */
export type DatasetSourceType = "public-external" | "omi-consortium" | "community-contributed";

export interface DatasetFileEntry {
  name: string;
  /** Human-readable size, e.g. "2.3 MB" — kept as a display string for this mock/demo scope. */
  size: string;
  type: string;
}

export interface Dataset {
  id: string;
  title: string;
  summary: string;
  description: string;
  gradeBands: GradeBand[];
  topics: string[];
  license: DatasetLicense;
  piiReviewStatus: PiiReviewStatus;
  contributor: string;
  publishedDate: string;
  fileCount: number;
  totalSize: string;
  doi: string;
  files: DatasetFileEntry[];
  relatedDatasetIds: string[];
  /** See DatasetSourceType. */
  sourceType?: DatasetSourceType;
  /** Link to the original external source — set only when sourceType is "public-external". */
  sourceUrl?: string;
  /** Exact citation text to display. Public-external datasets should set this. */
  citationText?: string;
}

/** Slim shape used for list/grid views — avoids shipping every dataset's full files[] array. */
export type DatasetSummary = Omit<Dataset, "files" | "description" | "relatedDatasetIds">;

export interface DatasetListResponse {
  datasets: DatasetSummary[];
  total: number;
}

export interface StatsResponse {
  datasetCount: number;
  recordCount: number;
  dataStored: string;
  contributingDistricts: number;
}

export type JupyterSessionStatus = "pending" | "unavailable";

export interface JupyterLaunchResponse {
  status: JupyterSessionStatus;
  sessionId: string;
  message: string;
}

export interface ApiErrorBody {
  error: string;
  message: string;
}

/* -------------------------------------------------------------------------
 * "Ask AI" dataset insights chat (reserved for upcoming chat interface)
 * ---------------------------------------------------------------------- */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface InsightsChatRequest {
  datasetId: string;
  message: string;
  /** Omit on the first turn of a new chat thread. */
  previousResponseId?: string;
}

export interface InsightsChatResponse {
  reply: string;
  /** Pass back as previousResponseId on the next call to continue this thread. */
  responseId: string;
  /**
   * True only when this reply's grounding included real computed CSV stats
   * (currently: NAEP/PISA only — see summarizeCsvRows in csv.ts). The frontend
   * uses this to render an honest "grounded in real data" vs. "metadata only"
   * disclaimer rather than asserting one blindly.
   */
  groundedInRealData: boolean;
}
