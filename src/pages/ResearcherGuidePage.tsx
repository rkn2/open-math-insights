import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

const REPOSITORIES: {
  name: string;
  url: string;
  focus: string;
  bestFor: string;
  doi: boolean;
  costNote: string;
}[] = [
  {
    name: "OSF (Open Science Framework)",
    url: "https://osf.io/",
    focus: "Reproducible research workflows. Preregistration, version control, and multi-format archiving in one place.",
    bestFor: "Studies where you want preregistration, supplemental materials, and data archived together.",
    doi: true,
    costNote: "Free for public projects (private storage capped; check current limits).",
  },
  {
    name: "Hugging Face Datasets",
    url: "https://huggingface.co/docs/datasets",
    focus: "ML-ready datasets with built-in versioning, dataset cards, and one-line Python loading.",
    bestFor: "Data you expect others to load programmatically, especially for ML/NLP research pipelines.",
    doi: false,
    costNote: "Free for public datasets. See their docs for private-repo and storage tiers.",
  },
  {
    name: "Harvard Dataverse",
    url: "https://dataverse.harvard.edu/",
    focus: "Long-term preservation with rich, structured metadata and formal citation support.",
    bestFor: "Social science and education datasets that need institutional-grade archiving and formal citation.",
    doi: true,
    costNote: "Free for researchers. Some institutional Dataverse installations have their own policies.",
  },
  {
    name: "ICPSR",
    url: "https://www.icpsr.umich.edu/",
    focus: "Curated social science data archive with disclosure review, restricted-use tiers, and long-term preservation.",
    bestFor: "Sensitive education or survey data requiring restricted access, disclosure review, or formal data-use agreements.",
    doi: true,
    costNote: "Deposit is free for many institutions. Membership-based access model; check your institution.",
  },
  {
    name: "Figshare",
    url: "https://figshare.com/",
    focus: "Quick, low-friction sharing of figures, datasets, and supplemental files with DOI minting.",
    bestFor: "Supplemental data, figures, or small-to-medium datasets you want citable and shareable fast.",
    doi: true,
    costNote: "Free tier available. Institutional portals may offer more storage; check your university.",
  },
];

const DEID_DIRECT = [
  "Student names, parent/guardian names",
  "Student ID numbers, Social Security numbers",
  "Email addresses, phone numbers, home addresses",
  "Photographs, biometric data",
  "Dates of birth (day-level; year or age range may be acceptable)",
];

const DEID_INDIRECT = [
  "School name combined with grade, teacher, and year (may identify a single student in small classes)",
  "Exact test date if combined with school and grade",
  "Free-text responses that mention names, places, or identifying details",
  "Disability or accommodation flags in small populations",
  "Race/ethnicity in cells with fewer than 5 students",
];

const DEID_STEPS = [
  {
    title: "Strip direct identifiers",
    description: "Remove every column listed above. If you need a student key for longitudinal linking, replace it with a random ID generated outside the dataset.",
  },
  {
    title: "Assess indirect identifiers",
    description: "For each remaining column, ask: could combining this field with other public information identify a student? Apply suppression or generalization (e.g., age band instead of age, district instead of school) where the answer is yes.",
  },
  {
    title: "Apply small-cell suppression",
    description: "Any cell with fewer than 5 observations should be suppressed or aggregated. This is the standard threshold used by NCES and most state education agencies.",
  },
  {
    title: "Audit free-text fields",
    description: "Student responses, teacher comments, and open-ended survey answers frequently contain names and identifying details. Read or programmatically scan every free-text value before publishing.",
  },
  {
    title: "Document what you did",
    description: "Record the de-identification steps in a README or metadata file that ships with the dataset. Reviewers and reusers need to know what was removed and how.",
  },
];

const DATA_PREP = [
  {
    title: "Use open, non-proprietary formats",
    description: "CSV for tabular data, JSON for structured metadata, Parquet for large datasets. Avoid Excel-only formats. They drop precision and embed formatting that breaks reproducibility.",
  },
  {
    title: "Include a data dictionary",
    description: "One file listing every column: name, type, units, valid range, and what it means. This is the single most useful thing you can include after the data itself.",
  },
  {
    title: "Choose a license explicitly",
    description: "CC-BY-4.0 (attribution required), CC0-1.0 (public domain dedication), or Public Domain. If you don't choose, downstream users can't legally reuse your data. OMI uses these three, so pick the one that fits your funder and institution.",
  },
  {
    title: "Write a citation string",
    description: "Tell people exactly how to cite the dataset. Include authors, title, year, repository, and DOI or URL. Most repositories will generate one for you, but check that it's correct.",
  },
  {
    title: "Add a SOURCE or README file",
    description: "Explain where the data came from, how it was collected, what population it represents, and any known limitations. Datasets without provenance information are difficult for others to trust and reuse.",
  },
];

const NOTEBOOK_LINKS = [
  {
    title: "Exploring Math Assessment Data",
    description: "Load the NAEP and PISA datasets, run descriptive statistics, plot trends over time, and try a basic clustering analysis, all in under 30 minutes.",
    colabUrl: "https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/01_exploring_math_data.ipynb",
  },
  {
    title: "Comparing NAEP and PISA: What Can (and Can't) You Ask?",
    description: "A guided walkthrough of what makes these two assessments different, what questions each can answer, and how to analyze within-system trends without making apples-to-oranges comparisons.",
    colabUrl: "https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/02_comparing_naep_and_pisa.ipynb",
  },
];

export function ResearcherGuidePage() {
  useDocumentTitle("Researcher Guide");
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Researcher Guide"
        title="Share, prepare, and analyze open education data"
        subtitle="A practical guide for education researchers. Topics range from de-identifying a classroom dataset to publishing it in an open repository and running your first analysis."
      />

      {/* ── Repository comparison ─────────────────────────── */}
      <section id="repositories" className="mt-16 scroll-mt-24">
        <SectionHeading
          eyebrow="Where to share"
          title="Choosing a data repository"
          as="h2"
        />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          There is no single best repository. The right choice depends on your data, your
          audience, and your funder's requirements. The table below compares five repositories
          commonly used for education data. Platform policies change; we link to each
          repository's documentation rather than stating limits that may already be outdated.
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 pr-4">Repository</th>
                <th className="py-3 pr-4">Focus</th>
                <th className="py-3 pr-4">Best for</th>
                <th className="py-3 pr-4">DOI</th>
                <th className="py-3">Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {REPOSITORIES.map((r) => (
                <tr key={r.name} className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-primary-300 hover:decoration-primary-600"
                    >
                      {r.name}
                    </a>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">{r.focus}</td>
                  <td className="py-3 pr-4 text-slate-600">{r.bestFor}</td>
                  <td className="py-3 pr-4 text-slate-600">{r.doi ? "Yes" : "No"}</td>
                  <td className="py-3 text-slate-600">{r.costNote}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── De-identification ─────────────────────────────── */}
      <section id="deidentification" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Before you share"
          title="De-identification checklist for education data"
          as="h2"
        />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          Under FERPA, student education records are protected. Sharing them without consent
          requires that all personally identifiable information (PII) is removed or that the
          data qualifies for a FERPA exception. This checklist is what OMI uses before tagging
          any dataset "Reviewed — No PII." It is not legal advice; consult your IRB or
          institutional data governance office for your specific situation.
        </p>
        <p className="mt-2 max-w-3xl text-xs text-slate-400">
          Reference:{" "}
          <a
            href="https://studentprivacy.ed.gov/content/data-de-identification-an-overview-of-basic-terms"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            PTAC Data De-identification Overview
          </a>{" "}
          |{" "}
          <a
            href="https://nces.ed.gov/pubsearch/pubsinfo.asp?pubid=2011602"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            NCES Statistical Standards
          </a>
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <h3 className="font-display font-bold text-slate-900">
              Direct identifiers <Badge tone="coral">Must remove</Badge>
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {DEID_DIRECT.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 text-coral-500" aria-hidden>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h3 className="font-display font-bold text-slate-900">
              Indirect identifiers <Badge tone="amber">Assess case-by-case</Badge>
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {DEID_INDIRECT.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-0.5 text-amber-500" aria-hidden>⚠</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-10">
          <h3 className="font-display text-lg font-bold text-slate-900">
            Step-by-step de-identification process
          </h3>
          <ol className="mt-6 space-y-6">
            {DEID_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 font-display text-sm font-bold text-primary-700">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-display font-bold text-slate-900">{step.title}</h4>
                  <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Preparing your data ───────────────────────────── */}
      <section id="data-prep" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Packaging your dataset"
          title="Preparing data for publication"
          as="h2"
        />

        <div className="mt-8 space-y-6">
          {DATA_PREP.map((item, i) => (
            <div key={item.title} className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 font-display text-sm font-bold text-teal-700">
                {i + 1}
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Analysis notebooks ────────────────────────────── */}
      <section id="notebooks" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Hands-on analysis"
          title="Starter notebooks"
          as="h2"
        />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          These Jupyter notebooks run in Google Colab with no install required. They load
          real data from OMI's Data Depot and walk through the kind of exploratory analysis
          that a first look at education data usually calls for.
        </p>
        <p className="mt-2 max-w-3xl text-xs text-slate-400">
          Running notebooks requires a free Google account. You can view notebook contents without signing in.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {NOTEBOOK_LINKS.map((nb) => (
            <Card key={nb.title} hover>
              <h3 className="font-display font-bold text-slate-900">{nb.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{nb.description}</p>
              <a
                href={nb.colabUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
                </svg>
                Open in Google Colab
              </a>
            </Card>
          ))}
        </div>
      </section>

      {/* ── FERPA quick-reference ──────────────────────────── */}
      <section className="mt-20 scroll-mt-24">
        <div className="rounded-3xl bg-slate-50 p-8 sm:p-10">
          <SectionHeading
            eyebrow="Regulatory context"
            title="FERPA quick reference for data sharing"
            as="h2"
            align="center"
          />
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-sm leading-relaxed text-slate-600">
            <p>
              <strong className="text-slate-900">What FERPA protects:</strong>{" "}
              Education records are records directly related to a student and maintained by an
              educational agency or institution. This includes grades, test scores, disciplinary
              records, and most data generated in a school context.
            </p>
            <p>
              <strong className="text-slate-900">When you can share without consent:</strong>{" "}
              FERPA permits disclosure of <em>de-identified</em> records, meaning records from which all
              personally identifiable information has been removed, and where the institution has
              made a reasonable determination that a student's identity cannot be ascertained
              through the remaining data, alone or in combination with other information.
            </p>
            <p>
              <strong className="text-slate-900">The "studies" exception (§99.31(a)(6)):</strong>{" "}
              Organizations conducting studies for or on behalf of an educational institution may
              receive PII without consent under a formal data-sharing agreement, but published
              results must still be de-identified. If you're publishing a <em>dataset</em>, not
              just study results, de-identification is the path.
            </p>
            <p className="text-xs text-slate-400">
              This is an overview, not legal guidance. Your institution's IRB and data governance
              office are the authorities for your specific case. See{" "}
              <a
                href="https://studentprivacy.ed.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                studentprivacy.ed.gov
              </a>{" "}
              for the primary source.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
