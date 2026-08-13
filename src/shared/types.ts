/**
 * Shared types for Open Math Insights (OMI).
 *
 * These are the single source of truth for the shape of data that flows between
 * the mock Lambda handlers (infra/lambda/handlers/*) and the frontend hooks
 * (frontend/src/hooks/*) — keeping them in one package means the mock fixtures
 * and the UI can never silently drift apart.
 */

export type GradeBand = "K-2" | "3-5" | "6-8" | "9-12";

export type DatasetLicense = "CC-BY-4.0" | "CC0-1.0" | "Public Domain";

export type PiiReviewStatus = "reviewed-no-pii" | "pending-review";

/**
 * "public-external" = a real dataset downloaded from an outside public source (see
 * data/public/<id>/SOURCE.md for provenance) — shown with a "Verified public dataset"
 * badge and a link out to `sourceUrl`. "omi-consortium" (the default) = an
 * illustrative fixture attributed to a fictional OMI contributor, same as the
 * original 8 demo datasets. "community-contributed" = published via the
 * contribution/review workflow (see DatasetSubmission below) — shown with a
 * "Community contributed" badge.
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
  /** Defaults to "omi-consortium" when omitted — see DatasetSourceType. */
  sourceType?: DatasetSourceType;
  /** Link to the original external source — set only when sourceType is "public-external". */
  sourceUrl?: string;
  /**
   * Exact citation text to display, taken verbatim from the dataset's SOURCE.md.
   * Public-external datasets must set this rather than relying on the generated
   * "Open Math Insights [publisher]" citation (see DatasetDetailPage's
   * citationFor()) — that generated form is only accurate for the illustrative
   * omi-consortium fixtures, which really are (fictionally) OMI-published.
   */
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
 * Data contribution + review / RBAC
 *
 * Roles form a hierarchy (admin ⊇ reviewer ⊇ contributor ⊇ pending) — use
 * `roleSatisfies()` rather than `===` wherever a route or UI element requires
 * "at least" a given role. This file is the single source of truth for that
 * hierarchy so the frontend's route guards and the Lambda's `requireRole()`
 * (infra/lambda/util/auth.ts) can never define it differently.
 *
 * "pending" is the bottom tier, not a real role — every self-signup lands
 * here (Cognito's PostConfirmation trigger) and can do nothing until an
 * admin approves them into contributor/reviewer/admin (see
 * getPendingUsers.ts/postApproveUser.ts). It exists in this hierarchy at all
 * only so `roleSatisfies("pending", "contributor")` correctly comes back
 * false everywhere, the same way every other role check already works —
 * no separate "is approved yet" flag needed anywhere.
 * ---------------------------------------------------------------------- */

export type UserRole = "pending" | "contributor" | "reviewer" | "admin";

/** Ordered low → high. Index comparison is the hierarchy check. */
export const ROLE_HIERARCHY: UserRole[] = ["pending", "contributor", "reviewer", "admin"];

export function roleSatisfies(userRole: UserRole, required: UserRole): boolean {
  return ROLE_HIERARCHY.indexOf(userRole) >= ROLE_HIERARCHY.indexOf(required);
}

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

/** A self-signed-up user still in the "pending" group, awaiting admin approval. */
export interface PendingUser {
  /**
   * Cognito's real Username — confirmed against real accounts (both
   * self-signup and AdminCreateUser) to be an opaque generated UUID, NOT the
   * email address; `signInAliases: { email: true }` makes email valid to
   * *sign in* with, it doesn't make email the Username. Treat this as
   * opaque — pass it straight to postApproveUser.ts/postRejectUser.ts,
   * never construct or parse it.
   */
  username: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface PendingUsersResponse {
  users: PendingUser[];
}

/** "pending" is deliberately not an option here — you approve *into* a real role, never back into pending. */
export interface ApproveUserRequest {
  role: "contributor" | "reviewer" | "admin";
}

export type SubmissionStatus =
  | "draft"
  | "submitted"
  | "in_review"
  | "changes_requested"
  | "approved"
  | "rejected"
  | "withdrawn";

/**
 * A submitter's self-reported checklist. Deliberately NOT sufficient on its
 * own to mark a dataset `piiReviewStatus: "reviewed-no-pii"` — only a
 * reviewer's decision (see ReviewDecisionEntry) can do that. `hasRightsToPublish`
 * exists because nothing else stops someone re-submitting a dataset they don't
 * actually have the right to publish under the claimed license.
 */
export interface PiiAttestation {
  noDirectIdentifiers: boolean;
  dataIsDeidentified: boolean;
  hasRightsToPublish: boolean;
  notes?: string;
}

export type PiiScanPatternType = "ssn" | "email" | "phone";

/**
 * A single automated PII-scan hit. Deliberately carries only the pattern
 * family and an approximate line number — never the matched text — so the
 * scanner's own results can't become a new place PII gets stored.
 */
export interface PiiScanFinding {
  patternType: PiiScanPatternType;
  approximateLineNumber: number;
}

/**
 * Server-side-authoritative results of the automated "certain standards"
 * checks. The client runs the same logic for instant feedback in the wizard,
 * but only this server-computed result (recomputed at submit time) gates
 * what a reviewer sees — the client-side pass is UX, not a gate.
 */
export interface AutomatedCheckResult {
  metadataComplete: boolean;
  missingMetadataFields: string[];
  fileContentSane: boolean;
  fileContentIssues: string[];
  piiScanFindings: PiiScanFinding[];
  /**
   * True only when piiScanFindings is empty. Display copy MUST frame this as
   * "no pattern matches found — human review is still required," never as a
   * bare "PII-free" checkmark — see submissionValidation.ts.
   */
  piiScanClear: boolean;
  standardsMatchCount: number;
  checkedAt: string;
}

export type ReviewAction =
  | "submitted"
  | "resubmitted"
  | "approved"
  | "rejected"
  | "changes_requested"
  | "withdrawn";

/** Append-only — this is the accountability trail behind "No PII, ever." */
export interface ReviewDecisionEntry {
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: ReviewAction;
  comment?: string;
  timestamp: string;
}

export interface SubmissionFileRef {
  name: string;
  size: string;
  type: string;
  /** Set once actually uploaded (Tier B: a real S3 object key). */
  storageKey?: string;
}

/**
 * A dataset contribution moving through the review workflow. On approval, a
 * real `Dataset` (sourceType: "community-contributed") gets published from
 * this record's metadata — see datasetMerge.ts / postSubmissionDecision.ts.
 *
 * v1 non-goals, stated explicitly rather than left ambiguous: submissions are
 * net-new only (no editing an already-published dataset through this flow),
 * and there is no reviewer "claiming" UX — concurrent decisions are resolved
 * by a conditional write on expected status, not a lock.
 */
export interface DatasetSubmission {
  id: string;
  status: SubmissionStatus;
  submitterId: string;
  submitterName: string;
  createdAt: string;
  updatedAt: string;

  title: string;
  summary: string;
  description: string;
  gradeBands: GradeBand[];
  topics: string[];
  license: DatasetLicense;
  sourceType: "community-contributed" | "public-external";
  /** Required when sourceType is "public-external" — reviewers use this to plausibility-check the claim. */
  sourceUrl?: string;
  contributorAttribution: string;

  /**
   * Optional, not required — absent means "upload" (every submission created
   * before this field existed is implicitly an upload). See SubmissionIngestMode's
   * doc comment for why upload and link are mutually exclusive, not combinable.
   */
  ingestMode?: SubmissionIngestMode;
  /** Set only when ingestMode is "link" — where the submitter says their data actually lives. */
  linkUrl?: string;

  files: SubmissionFileRef[];
  piiAttestation: PiiAttestation;
  /** Matched CCSS-style codes from the Standards Aligner, or a manual override. */
  standardsMatches: string[];
  standardsOverrideJustification?: string;

  automatedChecks?: AutomatedCheckResult;
  /** Field-mapping-to-the-unified-schema state — see SchemaMappingResult's doc comment. */
  schemaMapping?: SchemaMappingResult;
  decisionHistory: ReviewDecisionEntry[];

  /** Set once approved and published — links to the resulting Dataset.id. */
  publishedDatasetId?: string;
}

export interface SubmissionListResponse {
  submissions: DatasetSubmission[];
  total: number;
}

export interface PresignUploadRequest {
  submissionId: string;
  fileName: string;
  fileType: string;
  fileSizeBytes: number;
}

export interface PresignUploadResponse {
  uploadUrl: string;
  fields: Record<string, string>;
  storageKey: string;
}

/* -------------------------------------------------------------------------
 * Unified schema + AI-assisted field mapping
 *
 * A submission's own field names (whether uploaded or linked) rarely match
 * the canonical names OMI wants across datasets — this is the admin-defined
 * target schema, and the (advisory-only) machinery that maps a submission's
 * fields onto it. Same posture as the PII scanner: an AI proposal or a
 * submitter's own field list is never sufficient by itself — only a
 * reviewer's confirmation (SchemaMappingStatus "reviewer_confirmed") is the
 * real gate, enforced server-side in postSubmissionDecision.ts's "approved"
 * transition. See infra/lambda/handlers/postSchemaMappingAnalyze.ts.
 * ---------------------------------------------------------------------- */

/**
 * "upload" and "link" are mutually exclusive, not combinable — a submission
 * either brings its own files or points at where the data already lives, so
 * there's exactly one place to look for source fields, not two to reconcile.
 */
export type SubmissionIngestMode = "upload" | "link";

export type UnifiedSchemaFieldDataType = "string" | "number" | "boolean" | "date" | "id" | "categorical";

/** Admin-authored canonical field — the mapping target every submission's own fields get matched against. */
export interface UnifiedSchemaField {
  id: string;
  name: string;
  description: string;
  dataType: UnifiedSchemaFieldDataType;
  required: boolean;
  /** Common alternate names (e.g. "student_id" aliasing "stu_id", "learner_id") — given to the AI prompt verbatim. */
  aliases: string[];
}

export interface UnifiedSchemaResponse {
  fields: UnifiedSchemaField[];
  /**
   * Bumped on every PUT /schema — recorded on a submission's SchemaMappingResult
   * so it's visible which schema version a mapping was made against. There is
   * deliberately no migration/re-mapping flow when the schema changes later —
   * an already-confirmed mapping just keeps pointing at field ids that may no
   * longer exist. A real gap, not hidden, just out of scope for this pass.
   */
  version: number;
  updatedAt: string;
}

/**
 * One field as it actually appears in the submitter's data. `sampleValues` is
 * capped (a handful of values, never a full column dump) — same "never store
 * more than a sample" instinct as PiiScanFinding storing only a pattern type
 * and line number, never the matched text.
 */
export interface SourceFieldDescriptor {
  name: string;
  sampleValues: string[];
  inferredType?: string;
}

/**
 * `unifiedFieldId: null` means a reviewer (or the AI) decided this source
 * field genuinely has no home in the unified schema — a real answer, not a
 * gap to chase down.
 */
export interface SchemaFieldMapping {
  sourceField: string;
  unifiedFieldId: string | null;
  /** 0-1, only ever set by the AI proposal — a reviewer's own edits don't carry a confidence score. */
  confidence?: number;
  proposedBy: "ai" | "reviewer";
  note?: string;
}

export type SchemaMappingStatus = "not_started" | "ai_proposed" | "reviewer_confirmed";

export interface SchemaMappingResult {
  sourceFields: SourceFieldDescriptor[];
  mappings: SchemaFieldMapping[];
  unifiedSchemaVersion: number;
  status: SchemaMappingStatus;
}

export interface LinkSniffResponse {
  sourceFields: SourceFieldDescriptor[];
}

export interface SchemaMappingAnalyzeResponse {
  schemaMapping: SchemaMappingResult;
}

export interface SchemaMappingPatchRequest {
  mappings: SchemaFieldMapping[];
  /** Reviewer explicitly finalizes — the only way status becomes "reviewer_confirmed". */
  confirm: boolean;
}

/* -------------------------------------------------------------------------
 * "Ask AI" dataset insights chat
 *
 * The Lambda is stateless per turn — the upstream AI gateway's
 * `previous_response_id` mechanism carries conversation state server-side,
 * so no chat-history table is needed here. Dataset grounding context is only
 * built and sent by the Lambda on the FIRST turn of a thread (no
 * previousResponseId); every follow-up just forwards the new message plus
 * the last responseId. See infra/lambda/handlers/postInsightsChat.ts.
 * ---------------------------------------------------------------------- */

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface InsightsChatRequest {
  datasetId: string;
  /** Capped client + server side (see postInsightsChat.ts) to bound cost/abuse. */
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
   * (currently: NAEP/PISA only — see summarizeCsvRows in shared/src/csv.ts).
   * The frontend uses this to render an honest "grounded in real data" vs.
   * "metadata only" disclaimer rather than asserting one blindly.
   */
  groundedInRealData: boolean;
}
