import { useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

const PHASES = [
  {
    number: 1,
    title: "Prepare your data",
    status: "You do this",
    items: [
      {
        label: "De-identify the dataset",
        detail: "Remove all direct identifiers (names, IDs, emails, addresses, dates of birth). Assess indirect identifiers (school + grade + year in small classes). Suppress cells with fewer than 5 observations. Audit free-text fields for names or identifying details.",
        link: { label: "De-identification checklist →", to: "/researcher-guide#deidentification" },
      },
      {
        label: "Choose a file format",
        detail: "CSV for tabular data, JSON for structured metadata, Parquet for large datasets. Avoid Excel-only formats — they drop precision and embed formatting that breaks reproducibility.",
      },
      {
        label: "Write a data dictionary",
        detail: "One file listing every column: name, data type, valid values, units, and what it means. This is the single most useful thing you can include after the data itself.",
        link: { label: "Codebooks & Data Dictionaries guide →", to: "/learning-center/codebooks" },
      },
      {
        label: "Choose a license",
        detail: "CC-BY-4.0 (attribution required), CC0-1.0 (public domain), or Public Domain. If you don't choose, downstream users can't legally reuse your data.",
      },
      {
        label: "Write a SOURCE or README file",
        detail: "Explain where the data came from, how it was collected, what population it represents, and any known limitations.",
      },
    ],
  },
  {
    number: 2,
    title: "Describe your dataset",
    status: "Fill out this form",
    items: [
      { label: "Dataset title", detail: "A descriptive name including the data source, grade levels, and year range." },
      { label: "Summary", detail: "One or two sentences describing the dataset — what it contains and why it's useful." },
      { label: "Grade bands", detail: "Which K-12 grades the data covers: K-2, 3-5, 6-8, 9-12 (select all that apply)." },
      { label: "Topics", detail: "Subject areas: e.g., Assessment & Growth, Algebra, Fractions, International Comparison." },
      { label: "License", detail: "Which open license you're publishing under." },
      { label: "Source URL", detail: "Where the original data lives, if it's published elsewhere (e.g., NCES, Figshare, OSF)." },
      { label: "Contributor", detail: "Your name or organization." },
      { label: "Citation", detail: "How others should cite this dataset (authors, title, year, repository, DOI if available)." },
      { label: "File list", detail: "The files you're submitting, with approximate sizes." },
    ],
  },
  {
    number: 3,
    title: "Submit for review",
    status: "OMI team reviews",
    items: [
      { label: "PII review", detail: "The OMI team verifies that the dataset has been de-identified according to our checklist. We check for direct identifiers, small-cell risks, and free-text fields." },
      { label: "Metadata review", detail: "We verify that the data dictionary, README, and metadata are complete and accurate." },
      { label: "Technical review", detail: "We confirm files are in open formats, are not corrupted, and match the described schema." },
      { label: "Feedback", detail: "If anything needs revision, we'll send specific feedback. Most datasets need one round of revision." },
    ],
  },
  {
    number: 4,
    title: "Publication",
    status: "Dataset goes live",
    items: [
      { label: "Tagged and indexed", detail: "Your dataset appears in the Data Depot with grade band, topic, and license tags, and is searchable and filterable." },
      { label: "PII badge", detail: "Once the review passes, your dataset is tagged 'Reviewed — No PII' so users know it's been checked." },
      { label: "Citation ready", detail: "The dataset detail page includes a citation tab and, if applicable, a DOI link." },
      { label: "Community announcement", detail: "New datasets are highlighted in the 'What's New' section on the home page." },
    ],
  },
];

const CHECKLIST = [
  "Dataset is de-identified (no direct PII, small cells suppressed, free text audited)",
  "Data is in an open format (CSV, JSON, or Parquet — not Excel-only)",
  "Data dictionary is included (one file listing every column with types and descriptions)",
  "License is chosen (CC-BY-4.0, CC0-1.0, or Public Domain)",
  "SOURCE or README file explains provenance, population, and limitations",
  "Citation string is written (authors, title, year, repository, DOI)",
  "IRB approval obtained if data was collected from human subjects",
];

export function ContributePage() {
  useDocumentTitle("Contribute Data");
  const [checked, setChecked] = useState<boolean[]>(new Array(CHECKLIST.length).fill(false));
  const completedCount = checked.filter(Boolean).length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Contribute"
        title="Share your data with the OMI community"
        subtitle="A step-by-step process for preparing, submitting, and publishing education data on the Data Depot — from de-identification through review to publication."
      />

      {/* ── Process overview ──────────────────────────── */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PHASES.map((phase) => (
          <div key={phase.number} className="text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-display font-bold text-white">
              {phase.number}
            </div>
            <h3 className="mt-3 font-display font-bold text-slate-900">{phase.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{phase.status}</p>
          </div>
        ))}
      </div>

      {/* ── Detailed phases ───────────────────────────── */}
      {PHASES.map((phase) => (
        <section key={phase.number} id={`phase-${phase.number}`} className="mt-16 scroll-mt-24">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 font-display text-sm font-bold text-primary-700">
              {phase.number}
            </div>
            <h2 className="font-display text-xl font-bold text-slate-900">{phase.title}</h2>
            <Badge tone="slate">{phase.status}</Badge>
          </div>

          <div className="mt-6 space-y-4">
            {phase.items.map((item) => (
              <Card key={item.label}>
                <h4 className="font-display font-bold text-slate-900">{item.label}</h4>
                <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                {"link" in item && item.link && (
                  <ButtonLink to={item.link.to} variant="ghost" size="sm" className="mt-2">
                    {item.link.label}
                  </ButtonLink>
                )}
              </Card>
            ))}
          </div>
        </section>
      ))}

      {/* ── Interactive checklist ──────────────────────── */}
      <section className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Before you submit"
          title="Pre-submission checklist"
          as="h2"
        />
        <p className="mt-2 text-sm text-slate-500">
          Check each item as you complete it. All items should be checked before submitting.
        </p>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
          <ul className="space-y-3">
            {CHECKLIST.map((item, i) => (
              <li key={i}>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={checked[i]}
                    onChange={() =>
                      setChecked((prev) => {
                        const next = [...prev];
                        next[i] = !next[i];
                        return next;
                      })
                    }
                    className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className={`text-sm ${checked[i] ? "text-slate-400 line-through" : "text-slate-700"}`}>
                    {item}
                  </span>
                </label>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
            <span className="text-sm text-slate-500">
              {completedCount} of {CHECKLIST.length} complete
            </span>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-primary-600 transition-all"
                style={{ width: `${(completedCount / CHECKLIST.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-primary-700 to-teal-600 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Ready to contribute?</h2>
        <p className="mt-2 text-primary-100">
          Once your checklist is complete, reach out through the Community page to start the
          submission process. The OMI team will guide you through the review.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/community" size="lg" variant="outlineLight">
            Contact the team
          </ButtonLink>
          <ButtonLink to="/researcher-guide" size="lg" variant="outlineLight">
            Researcher Guide
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
