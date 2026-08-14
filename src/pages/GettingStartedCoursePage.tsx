import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "what-is-omi", label: "1. What is OMI?" },
  { id: "data-depot", label: "2. The Data Depot" },
  { id: "reading-metadata", label: "3. Reading metadata" },
  { id: "licensing", label: "4. Licensing & citation" },
  { id: "load-data", label: "5. Load data in Colab" },
  { id: "next-steps", label: "6. Next steps" },
];

const DATASETS_OVERVIEW = [
  {
    name: "NAEP Math Scale Scores",
    what: "National and state-level average math scores for U.S. grades 4 and 8",
    rows: "132 data points",
    years: "2003–2024",
    link: "/data-depot/naep-math-scale-scores-2003-2024",
  },
  {
    name: "PISA Math Scores",
    what: "International math scores for 15-year-olds across 80+ countries",
    rows: "452 data points",
    years: "2003–2022",
    link: "/data-depot/pisa-math-scores-owid-2009-2022",
  },
  {
    name: "ASSISTments Skill Builder",
    what: "Individual student tutoring logs with skill-level correctness and hint usage",
    rows: "525,534 rows",
    years: "2009–2010",
    link: "/data-depot/assistments-2009-2010-skill-builder",
  },
];

const METADATA_FIELDS = [
  { field: "Grade Bands", meaning: "Which K–12 grades the data covers (K–2, 3–5, 6–8, 9–12)" },
  { field: "Topics", meaning: "Subject areas — e.g., Assessment & Growth, Algebra I, International Comparison" },
  { field: "License", meaning: "How you're allowed to reuse the data — CC-BY-4.0, CC0-1.0, or Public Domain" },
  { field: "PII Review Status", meaning: "Whether the dataset has been reviewed for personally identifiable information" },
  { field: "Contributor", meaning: "The organization that produced or curated the data" },
  { field: "Source URL", meaning: "Where the original data lives (e.g., NCES, OECD, Figshare)" },
  { field: "DOI", meaning: "A permanent digital identifier for citing the dataset" },
];

export function GettingStartedCoursePage() {
  useDocumentTitle("Getting Started with OMI Datasets");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Getting Started" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="Course · Beginner · 30 min"
          title="Getting Started with OMI Datasets"
          subtitle="A guided tour of the Data Depot, dataset metadata, licensing, citation, and how to load data into a notebook — everything you need for your first session with OMI."
        />
      </div>

      {/* Course outline sidebar-style navigation */}
      <nav className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Course outline
        </h2>
        <ol className="mt-3 space-y-1.5">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm font-medium text-primary-600 hover:text-primary-800 hover:underline"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Section 1 ──────────────────────────────────── */}
      <section id="what-is-omi" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="What is OMI?" as="h2" />
        <div className="prose-slate mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            <strong className="text-slate-900">Open Math Insights (OMI)</strong> is an open data
            platform for K–12 math education. It brings together openly licensed datasets, browser-based
            analysis tools, and learning resources — all in one place, with no accounts or installs
            required.
          </p>
          <p>
            OMI is built around four pillars:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Data Depot", desc: "A curated catalog of openly licensed math datasets with standardized metadata, de-identification review, and citation info." },
              { title: "Compute Tools", desc: "In-browser tools for exploring data — a graphing explorer, standards aligner, and runnable Jupyter notebooks on Google Colab." },
              { title: "Learning Center", desc: "Courses and tutorials (like this one) that teach data literacy using real, open data." },
              { title: "Community", desc: "A Slack workspace and contributor network for sharing datasets, asking questions, and collaborating." },
            ].map((pillar) => (
              <Card key={pillar.title}>
                <h4 className="font-display font-bold text-slate-900">{pillar.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{pillar.desc}</p>
              </Card>
            ))}
          </div>
          <p>
            Everything on OMI follows three principles: <strong>no PII ever</strong> (no student-identifying
            data), <strong>cost-conscious infrastructure</strong> (static hosting, tools run only when needed),
            and <strong>built for collaboration</strong> (open licenses, community-driven).
          </p>
        </div>
      </section>

      {/* ── Section 2 ──────────────────────────────────── */}
      <section id="data-depot" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 2" title="The Data Depot" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The <ButtonLink to="/data-depot" variant="ghost" size="sm">Data Depot</ButtonLink> is
            OMI's dataset catalog. Each dataset has a detail page with an overview, file list,
            metadata card, and citation — everything you need to decide whether it fits your work
            and how to use it properly.
          </p>
          <p>
            Here's what's currently available:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Dataset</th>
                  <th className="py-3 pr-4">What it contains</th>
                  <th className="py-3 pr-4">Size</th>
                  <th className="py-3">Years</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DATASETS_OVERVIEW.map((d) => (
                  <tr key={d.name} className="align-top">
                    <td className="py-3 pr-4 font-medium text-slate-900">
                      <ButtonLink to={d.link} variant="ghost" size="sm">
                        {d.name}
                      </ButtonLink>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{d.what}</td>
                    <td className="py-3 pr-4 text-slate-600">{d.rows}</td>
                    <td className="py-3 text-slate-600">{d.years}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Use the <strong>search bar</strong> and <strong>filters</strong> at the top of the Data Depot
            to narrow by grade band, topic, or license. Clicking a dataset card opens its detail page.
          </p>
        </div>
      </section>

      {/* ── Section 3 ──────────────────────────────────── */}
      <section id="reading-metadata" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 3" title="Reading a dataset's metadata" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Every dataset on OMI has a <strong>metadata card</strong> — a standardized set of fields
            that tells you what the data covers, how it's licensed, and whether it's been reviewed for
            privacy. Here's what each field means:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Field</th>
                  <th className="py-3">What it tells you</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {METADATA_FIELDS.map((f) => (
                  <tr key={f.field}>
                    <td className="py-3 pr-4 font-medium text-slate-900">{f.field}</td>
                    <td className="py-3 text-slate-600">{f.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Why PII review matters:</strong> Every dataset on OMI goes through a de-identification
              review before publication. The "Reviewed — No PII" badge means the dataset has been checked
              against our{" "}
              <ButtonLink to="/researcher-guide#deidentification" variant="ghost" size="sm">
                de-identification checklist
              </ButtonLink>
              . If you're contributing data, the{" "}
              <ButtonLink to="/researcher-guide" variant="ghost" size="sm">Researcher Guide</ButtonLink>{" "}
              walks through the full process.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4 ──────────────────────────────────── */}
      <section id="licensing" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 4" title="Licensing & citation" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Every dataset on OMI is published under one of three open licenses. Understanding which
            one applies tells you what you can do with the data:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <Badge tone="teal">CC-BY-4.0</Badge>
              <p className="mt-3 text-sm text-slate-600">
                Use, share, and adapt for any purpose — including commercial — as long as you
                <strong> credit the original source</strong>. This is the most common license on OMI.
              </p>
            </Card>
            <Card>
              <Badge tone="primary">CC0-1.0</Badge>
              <p className="mt-3 text-sm text-slate-600">
                Public domain dedication. No restrictions at all — you don't even need to give
                credit (though it's good practice). Used for government-produced data.
              </p>
            </Card>
            <Card>
              <Badge tone="slate">Public Domain</Badge>
              <p className="mt-3 text-sm text-slate-600">
                Works whose copyright has expired or that were produced by the U.S. government.
                Equivalent to CC0 in practice.
              </p>
            </Card>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">How to cite a dataset</h3>
          <p>
            Each dataset's detail page includes a <strong>Citation</strong> tab with a ready-to-copy
            citation string. Always cite the dataset by its provided citation — this gives credit to the
            original contributors and helps others find the same data.
          </p>
          <p>
            If a dataset has a <strong>DOI</strong> (Digital Object Identifier), use it in your citation.
            DOIs are permanent links that will keep working even if URLs change.
          </p>
        </div>
      </section>

      {/* ── Section 5 ──────────────────────────────────── */}
      <section id="load-data" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 5" title="Load data in Google Colab" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The fastest way to start analyzing OMI data is with our pre-built Jupyter notebooks on
            Google Colab. No install, no setup — just click and run.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Exploring Math Assessment Data</h4>
              <p className="mt-2 text-sm text-slate-600">
                Descriptive stats, trend plots, and a clustering analysis — a complete first look
                at the NAEP and PISA datasets.
              </p>
              <a
                href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/01_exploring_math_data.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
              >
                Open in Colab →
              </a>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Comparing NAEP and PISA</h4>
              <p className="mt-2 text-sm text-slate-600">
                What's comparable and what isn't — within-system trends, cross-system indexing,
                and a reference table of valid vs. invalid questions.
              </p>
              <a
                href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/02_comparing_naep_and_pisa.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
              >
                Open in Colab →
              </a>
            </Card>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">Loading data yourself</h3>
          <p>
            If you want to write your own notebook, loading OMI data takes one line of pandas:
          </p>
          <div className="overflow-x-auto rounded-xl bg-slate-900 p-4">
            <pre className="text-sm text-slate-200">
              <code>{`import pandas as pd

# Load NAEP data directly from OMI's GitHub repository
naep = pd.read_csv(
    "https://raw.githubusercontent.com/rkn2/open-math-insights"
    "/main/public/data/naep_math_scale_scores.csv"
)

# Load PISA data
pisa = pd.read_csv(
    "https://raw.githubusercontent.com/rkn2/open-math-insights"
    "/main/public/data/pisa_math_scores.csv"
)`}</code>
            </pre>
          </div>
          <p>
            This works in Google Colab, any Jupyter notebook, or any Python environment with
            pandas and internet access.
          </p>
        </div>
      </section>

      {/* ── Section 6 ──────────────────────────────────── */}
      <section id="next-steps" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 6" title="Next steps" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>You've completed the Getting Started course. Here's where to go from here:</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Explore the Data Depot</h4>
              <p className="mt-1 text-sm text-slate-600">
                Browse all available datasets, filter by grade band and topic, and read the
                full metadata for any dataset that interests you.
              </p>
              <ButtonLink to="/data-depot" variant="outline" size="sm" className="mt-3">
                Open Data Depot →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Try the tools</h4>
              <p className="mt-1 text-sm text-slate-600">
                Use the Graphing Explorer to plot NAEP and PISA data, or the Standards Aligner
                to match problems to CCSS standards — all in your browser.
              </p>
              <ButtonLink to="/use-omi" variant="outline" size="sm" className="mt-3">
                Use OMI tools →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Share your own data</h4>
              <p className="mt-1 text-sm text-slate-600">
                The Researcher Guide walks through de-identification, choosing a repository,
                and preparing education data for publication.
              </p>
              <ButtonLink to="/researcher-guide" variant="outline" size="sm" className="mt-3">
                Researcher Guide →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Join the community</h4>
              <p className="mt-1 text-sm text-slate-600">
                Connect with other educators and researchers on Slack, contribute datasets,
                and help shape what OMI builds next.
              </p>
              <ButtonLink to="/community" variant="outline" size="sm" className="mt-3">
                Community →
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Completion banner ─────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Course complete</h2>
        <p className="mt-2 text-teal-100">
          You now know how to find, evaluate, cite, and load OMI datasets. Go build something.
        </p>
      </div>
    </div>
  );
}
