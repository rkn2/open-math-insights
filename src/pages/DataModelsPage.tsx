import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

interface MetadataField {
  field: string;
  required: boolean;
  description: string;
}

interface DataModel {
  id: string;
  name: string;
  icon: string;
  description: string;
  examples: string[];
  typicalSize: string;
  granularity: string;
  privacyLevel: "low" | "medium" | "high";
  metadata: MetadataField[];
  omiDatasets: string[];
}

const MODELS: DataModel[] = [
  {
    id: "assessment",
    name: "Assessment Data",
    icon: "📊",
    description: "Aggregate or student-level results from standardized tests, district benchmarks, or classroom assessments. Typically reported as scale scores, proficiency levels, or raw scores across demographic groups, jurisdictions, or time periods.",
    examples: [
      "NAEP national/state math scores (aggregate)",
      "PISA international math scores (aggregate)",
      "State assessment results by district (aggregate)",
      "Classroom pre/post test scores (student-level, de-identified)",
    ],
    typicalSize: "100 – 100K rows",
    granularity: "Jurisdiction-year (aggregate) or student-item (individual)",
    privacyLevel: "low",
    metadata: [
      { field: "Assessment name", required: true, description: "Official name of the assessment instrument" },
      { field: "Grade levels tested", required: true, description: "K-2, 3-5, 6-8, 9-12" },
      { field: "Score type", required: true, description: "Scale score, proficiency level, raw score, percentile" },
      { field: "Score scale and range", required: true, description: "e.g., NAEP 0-500, PISA centered at 500" },
      { field: "Population / sampling", required: true, description: "Who was tested and how they were sampled" },
      { field: "Year(s) of administration", required: true, description: "Assessment cycle dates" },
      { field: "Reporting level", required: true, description: "National, state, district, school, student" },
      { field: "Confidence intervals", required: false, description: "Margins of error for aggregate estimates" },
    ],
    omiDatasets: ["NAEP Math Scale Scores", "PISA Math Scores"],
  },
  {
    id: "classroom-observation",
    name: "Classroom Observation",
    icon: "👁️",
    description: "Structured records of what happens in classrooms during instruction, including teacher behaviors, student engagement, discourse patterns, or implementation fidelity. Collected by trained observers using a rubric or protocol.",
    examples: [
      "CLASS (Classroom Assessment Scoring System) observation ratings",
      "Mathematical Quality of Instruction (MQI) scores",
      "Research team observation notes coded with a rubric",
      "Video-coded discourse analysis",
    ],
    typicalSize: "100 – 10K observations",
    granularity: "Lesson-segment or lesson-level",
    privacyLevel: "high",
    metadata: [
      { field: "Observation protocol", required: true, description: "Name and version of the instrument used" },
      { field: "Observer training", required: true, description: "How observers were trained and certified" },
      { field: "Inter-rater reliability", required: true, description: "Kappa or ICC values for observer agreement" },
      { field: "Unit of observation", required: true, description: "What constitutes one observation (lesson, segment, etc.)" },
      { field: "Setting", required: true, description: "Grade, subject, school type" },
      { field: "Coding scheme", required: true, description: "Categories, codes, and decision rules" },
      { field: "Video/audio policy", required: false, description: "Whether raw recordings exist and access conditions" },
    ],
    omiDatasets: [],
  },
  {
    id: "student-work",
    name: "Student Work & Responses",
    icon: "📝",
    description: "Artifacts of student mathematical thinking, including written solutions, digital notebook logs, problem-solving traces, or item responses. The richest source of reasoning data, but also the highest privacy sensitivity.",
    examples: [
      "Scanned written math solutions (de-identified)",
      "Jupyter notebook telemetry logs (keystroke/cell-execution level)",
      "Item response data from adaptive tutoring systems",
      "ASSISTments skill-builder problem-response logs",
    ],
    typicalSize: "1K – 10M rows",
    granularity: "Student-item or student-action level",
    privacyLevel: "high",
    metadata: [
      { field: "Task / item description", required: true, description: "What students were asked to do" },
      { field: "Response format", required: true, description: "Multiple choice, open response, digital trace, etc." },
      { field: "Correctness coding", required: false, description: "How correct/incorrect was determined" },
      { field: "De-identification method", required: true, description: "How student identifiers were removed/replaced" },
      { field: "Annotation scheme", required: false, description: "If responses were coded for strategies, errors, etc." },
      { field: "Collection context", required: true, description: "Classroom, homework, assessment, tutoring system" },
      { field: "Temporal information", required: false, description: "Timestamps, duration, sequence information" },
    ],
    omiDatasets: ["ASSISTments Skill Builder"],
  },
  {
    id: "survey",
    name: "Survey & Questionnaire",
    icon: "📋",
    description: "Self-report data from students, teachers, or parents, covering attitudes, beliefs, self-efficacy, pedagogical practices, or demographic information. Collected via structured instruments with established psychometric properties.",
    examples: [
      "STEM Identity survey (pre/post per module)",
      "Teacher self-efficacy questionnaire",
      "Student math anxiety scale",
      "PISA student and school questionnaires",
    ],
    typicalSize: "100 – 50K respondents",
    granularity: "Respondent-item level",
    privacyLevel: "medium",
    metadata: [
      { field: "Instrument name and version", required: true, description: "Published instrument with citation" },
      { field: "Construct measured", required: true, description: "What the survey intends to measure" },
      { field: "Response scale", required: true, description: "Likert scale, open-ended, multiple choice, etc." },
      { field: "Psychometric properties", required: false, description: "Reliability (alpha), validity evidence" },
      { field: "Administration mode", required: true, description: "Paper, online, in-class, take-home" },
      { field: "Timing", required: true, description: "Pre/post, single administration, longitudinal" },
      { field: "Demographic variables", required: false, description: "What demographic data was collected and how" },
    ],
    omiDatasets: [],
  },
  {
    id: "tutoring-logs",
    name: "Tutoring & Learning System Logs",
    icon: "🖥️",
    description: "Machine-generated records from intelligent tutoring systems, learning management systems, or educational software. These capture student interactions at the action level. High volume, structured, and already digital.",
    examples: [
      "ASSISTments problem-level logs with hints and correctness",
      "Khan Academy exercise completion logs",
      "LMS click-stream data",
      "Adaptive learning platform mastery trajectories",
    ],
    typicalSize: "10K – 100M rows",
    granularity: "Action-level (click, attempt, hint request)",
    privacyLevel: "medium",
    metadata: [
      { field: "Platform name and version", required: true, description: "Software system that generated the logs" },
      { field: "Action types", required: true, description: "What events are logged (attempts, hints, navigation)" },
      { field: "Skill / knowledge model", required: false, description: "How content is organized (skills, units, standards)" },
      { field: "Timestamp format", required: true, description: "Resolution, timezone, epoch format" },
      { field: "Student ID format", required: true, description: "How students are identified (hashed, sequential, etc.)" },
      { field: "Correctness determination", required: true, description: "How correct/incorrect is defined" },
      { field: "Hint / scaffold structure", required: false, description: "What support was available and how it was logged" },
    ],
    omiDatasets: ["ASSISTments Skill Builder"],
  },
];

const PRIVACY_LABELS: Record<DataModel["privacyLevel"], { tone: "teal" | "amber" | "coral"; label: string }> = {
  low: { tone: "teal", label: "Low sensitivity" },
  medium: { tone: "amber", label: "Medium sensitivity" },
  high: { tone: "coral", label: "High sensitivity" },
};

export function DataModelsPage() {
  useDocumentTitle("Data Models");
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Data Models"
        title="Five types of education data"
        subtitle="Structured data models with metadata templates. Every dataset on OMI is documented consistently, regardless of where it came from or who collected it."
      />

      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
        Inspired by{" "}
        <a
          href="https://www.designsafe-ci.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-600 underline decoration-primary-300 hover:decoration-primary-600"
        >
          DesignSafe-CI's data models
        </a>{" "}
        for natural hazards engineering, OMI defines five structured types for K–12 math education data.
        Each type has its own metadata template, a checklist of required and recommended fields that
        ensure the dataset is findable, interpretable, and reusable.
      </p>

      {/* ── Quick navigation ──────────────────────────── */}
      <div className="mt-8 flex flex-wrap gap-2">
        {MODELS.map((m) => (
          <a
            key={m.id}
            href={`#${m.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <span aria-hidden>{m.icon}</span>
            {m.name}
          </a>
        ))}
      </div>

      {/* ── Data model cards ──────────────────────────── */}
      {MODELS.map((model) => (
        <section key={model.id} id={model.id} className="mt-16 scroll-mt-24">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl" aria-hidden>{model.icon}</span>
            <h2 className="font-display text-xl font-bold text-slate-900">{model.name}</h2>
            <Badge tone={PRIVACY_LABELS[model.privacyLevel].tone}>
              {PRIVACY_LABELS[model.privacyLevel].label}
            </Badge>
          </div>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            {model.description}
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Typical size</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{model.typicalSize}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Granularity</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{model.granularity}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Examples</p>
              <ul className="mt-1 space-y-0.5 text-sm text-slate-700">
                {model.examples.slice(0, 3).map((ex) => (
                  <li key={ex} className="text-xs">• {ex}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metadata template */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-slate-900">Metadata template</h3>
            <div className="mt-2 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    <th className="py-2 pr-4">Field</th>
                    <th className="py-2 pr-4">Required</th>
                    <th className="py-2">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {model.metadata.map((field) => (
                    <tr key={field.field} className="align-top">
                      <td className="py-2 pr-4 font-medium text-slate-900">{field.field}</td>
                      <td className="py-2 pr-4">
                        {field.required ? (
                          <span className="text-xs font-semibold text-teal-600">Required</span>
                        ) : (
                          <span className="text-xs text-slate-400">Recommended</span>
                        )}
                      </td>
                      <td className="py-2 text-slate-600">{field.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {model.omiDatasets.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-slate-500">
                <strong className="text-slate-700">On OMI now:</strong>{" "}
                {model.omiDatasets.join(", ")}
              </p>
            </div>
          )}
        </section>
      ))}

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-slate-50 p-10 text-center">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Ready to prepare your dataset?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Pick the data model that matches your dataset, use the metadata template as a checklist,
          and follow the contribution workflow to submit.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/contribute" variant="outline" size="sm">
            Contribution workflow →
          </ButtonLink>
          <ButtonLink to="/learning-center/codebooks" variant="outline" size="sm">
            Codebooks guide →
          </ButtonLink>
          <ButtonLink to="/learning-center/schemas-metadata-annotation" variant="outline" size="sm">
            Schemas & metadata →
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
