import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "what-is-a-schema", label: "1. What is a schema?" },
  { id: "what-is-metadata", label: "2. What is metadata?" },
  { id: "what-is-annotation", label: "3. What is annotation?" },
  { id: "why-distinctions-matter", label: "4. Why these distinctions matter" },
  { id: "ai-ready-vs-human-ready", label: "5. AI-ready vs human-ready" },
  { id: "practical-advice", label: "6. Practical advice" },
  { id: "further-reading", label: "7. Further reading" },
];

const NAEP_SCHEMA_FIELDS = [
  { field: "year", type: "int", example: "2022", meaning: "Assessment year" },
  { field: "grade", type: "int", example: "4", meaning: "Grade level tested" },
  { field: "jurisdiction", type: "string", example: "AL", meaning: "State or national code" },
  { field: "jurisdiction_label", type: "string", example: "Alabama", meaning: "Human-readable name" },
  { field: "avg_scale_score", type: "float", example: "229.0", meaning: "Average math scale score" },
];

const METADATA_LEVELS = [
  {
    level: "Dataset-level",
    description: "Describes the dataset as a whole",
    examples: "Who collected the data, when, what population it covers, what license governs reuse, how to cite it",
    tone: "primary" as const,
  },
  {
    level: "Variable-level",
    description: "Describes each column or field — your data dictionary",
    examples: "What each column name means, its data type, valid values, units of measurement, how missing values are coded",
    tone: "teal" as const,
  },
];

const ANNOTATION_EXAMPLES = [
  {
    domain: "Student work analysis",
    what: "Labeling each student response with the type of mathematical error (e.g., place-value error, unit-conversion error, conceptual misunderstanding)",
  },
  {
    domain: "Problem-solving strategies",
    what: "Coding whether a student used drawing, guess-and-check, algebraic manipulation, or a different strategy to solve each problem",
  },
  {
    domain: "Classroom discourse",
    what: "Marking segments of a transcript as productive struggle, unproductive struggle, teacher scaffolding, or peer explanation",
  },
  {
    domain: "Assessment item tagging",
    what: "Labeling test items by CCSS standard, cognitive demand level, or mathematical practice",
  },
];

export function SchemasMetadataAnnotationPage() {
  useDocumentTitle("Schemas, Metadata & Annotation");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Schemas, Metadata & Annotation" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Researchers"
          title="Schemas, Metadata & Annotation"
          subtitle="Three terms that education researchers use constantly — and often differently. This guide defines each one precisely, explains why the distinctions matter for cross-project work, and offers practical advice for making your data both human-readable and machine-ready."
        />
      </div>

      {/* Page outline navigation */}
      <nav className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          On this page
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

      {/* ── Section 1: What is a schema? ──────────────── */}
      <section id="what-is-a-schema" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="What is a schema?" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            A <strong className="text-slate-900">schema</strong> is the structure of your data: what
            fields exist, their types, and how they relate to each other. Think of it as a blueprint
            for a building versus the building itself — the schema defines the shape; the data fills
            it in.
          </p>
          <p>
            A schema answers: <em>What columns does this dataset have? What kind of value goes in each
            one? Are there relationships between tables?</em> It says nothing about the actual values —
            only about the containers those values live in.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Example: NAEP Math Scale Scores
          </h3>
          <p>
            The NAEP dataset on OMI has a simple, flat schema with five fields. Here is what the
            schema looks like:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Field</th>
                  <th className="py-3 pr-4">Type</th>
                  <th className="py-3 pr-4">Example</th>
                  <th className="py-3">Meaning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {NAEP_SCHEMA_FIELDS.map((f) => (
                  <tr key={f.field}>
                    <td className="py-3 pr-4 font-mono text-xs font-medium text-slate-900">{f.field}</td>
                    <td className="py-3 pr-4">
                      <Badge tone="slate">{f.type}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{f.example}</td>
                    <td className="py-3 text-slate-600">{f.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Why this matters for interoperability:</strong> If two projects both collect math
              assessment scores but one uses <code className="rounded bg-amber-100 px-1">score</code>,
              another uses <code className="rounded bg-amber-100 px-1">avg_scale_score</code>, and a
              third uses <code className="rounded bg-amber-100 px-1">mean_math</code>, merging those
              datasets requires manual mapping. A shared schema eliminates that friction.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: What is metadata? ──────────────── */}
      <section id="what-is-metadata" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 2" title="What is metadata?" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            <strong className="text-slate-900">Metadata</strong> is data about data. It tells you
            what a dataset contains, where it came from, and how you are allowed to use it — without
            requiring you to open the data itself.
          </p>
          <p>
            There are two levels of metadata that education researchers need to think about:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            {METADATA_LEVELS.map((m) => (
              <Card key={m.level}>
                <Badge tone={m.tone}>{m.level}</Badge>
                <p className="mt-3 text-sm font-medium text-slate-900">{m.description}</p>
                <p className="mt-2 text-sm text-slate-600">{m.examples}</p>
              </Card>
            ))}
          </div>

          <p>
            On OMI, every dataset's detail page includes both levels: a <strong>metadata card</strong> for
            dataset-level information and a <strong>data dictionary</strong> section that documents each
            variable. Together, these tell a new user everything they need to decide whether a dataset fits
            their research question — before downloading a single row.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Metadata vs schema: what is the difference?
          </h3>
          <p>
            The schema tells you the structure — "this dataset has a column called{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">grade</code> of type{" "}
            <code className="rounded bg-slate-100 px-1 text-xs">int</code>." The metadata tells you
            the context — "this dataset was collected by NCES in 2022, covers grades 4 and 8, and is
            licensed CC0-1.0." A schema is part of your metadata, but metadata is much broader.
          </p>
        </div>
      </section>

      {/* ── Section 3: What is annotation? ────────────── */}
      <section id="what-is-annotation" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 3" title="What is annotation?" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            <strong className="text-slate-900">Annotation</strong> is the act of applying labels to
            raw data — by a human coder, by a machine, or by some combination of both. The raw data
            is the student response, the transcript segment, or the test item; the annotation is the
            judgment layered on top of it.
          </p>
          <p>
            In education research, annotation shows up everywhere:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Domain</th>
                  <th className="py-3">What gets annotated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ANNOTATION_EXAMPLES.map((a) => (
                  <tr key={a.domain}>
                    <td className="py-3 pr-4 font-medium text-slate-900">{a.domain}</td>
                    <td className="py-3 text-slate-600">{a.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Annotation vs coding
          </h3>
          <p>
            In qualitative research, "coding" often means the same thing as annotation — applying
            categorical labels to segments of data. Some researchers reserve "coding" for qualitative
            work and "annotation" for computational contexts, but the underlying operation is the same:
            a human (or machine) reads a piece of data and assigns it a label from a defined set.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            The codebook problem
          </h3>
          <p>
            Every annotation scheme depends on a <strong>codebook</strong> — the document that defines
            what each label means, when to apply it, and how to handle edge cases. This is where
            research teams diverge most. Two teams studying "productive struggle" may define and
            operationalize the concept differently, use different granularity in their codes, and
            handle ambiguous cases with different decision rules. The annotations look comparable on
            the surface but encode different theoretical commitments underneath.
          </p>
        </div>
      </section>

      {/* ── Section 4: Why these distinctions matter ──── */}
      <section id="why-distinctions-matter" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 4"
          title="Why these distinctions matter for the CAMEL network"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The CAMEL network brings together multiple research teams working on math education data.
            When those teams try to share data, combine datasets, or build tools that work across
            projects, three problems surface repeatedly:
          </p>

          <div className="space-y-4">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                "Annotation" means different things to different teams
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Some teams use "annotation" to mean any human-applied label. Others mean specifically
                the process of a trained coder applying codes from a codebook. Still others use it
                interchangeably with "tagging" or "markup." When teams say they have "annotated data,"
                they may be describing very different things — different levels of rigor, different
                theoretical frameworks, different reliability guarantees.
              </p>
              <div className="mt-3">
                <Badge tone="amber">CAMEL Challenge #5</Badge>
              </div>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Without shared schemas, data cannot interoperate
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                If Project A stores student responses in a table with columns{" "}
                <code className="rounded bg-slate-100 px-1 text-xs">student_id, problem, response, score</code>{" "}
                and Project B uses{" "}
                <code className="rounded bg-slate-100 px-1 text-xs">learner, item_code, answer, correctness</code>,
                the data describes similar things but cannot be merged without a manual crosswalk. Common
                schemas — even partial ones — make it possible for tools, analyses, and models to work
                across datasets without custom glue code for each pair.
              </p>
              <div className="mt-3">
                <Badge tone="amber">CAMEL Challenges #12, #14</Badge>
              </div>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Data that is usable within one project may be opaque to outsiders
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                A dataset that makes perfect sense to the team that collected it can be unusable by
                anyone else if it lacks explicit metadata. Column names like{" "}
                <code className="rounded bg-slate-100 px-1 text-xs">Q3_cat2_rev</code> are meaningful
                to the original researcher and meaningless to everyone else. Making data understandable
                and usable across disciplines requires the metadata layer that most teams skip.
              </p>
              <div className="mt-3">
                <Badge tone="amber">CAMEL Challenge #59</Badge>
              </div>
            </Card>
          </div>

          <p>
            These are not hypothetical problems. They are the specific challenges that the CAMEL
            network has identified as blockers to cross-project collaboration.
          </p>
        </div>
      </section>

      {/* ── Section 5: AI-ready vs human-ready ────────── */}
      <section id="ai-ready-vs-human-ready" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 5"
          title={'Making data "AI-ready" vs "human-ready"'}
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            There is growing interest in making education data "AI-ready" — structured so that
            machine learning models can train on it or large language models can process it. But
            AI-readiness and human-readiness are not the same thing, and both matter.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <Badge tone="teal">What machines need</Badge>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Consistent, well-defined schemas (no ambiguous column names)</li>
                <li>Standardized annotation labels (no free-text codes that vary by coder)</li>
                <li>Machine-readable formats (CSV, JSON, Parquet — not PDF tables)</li>
                <li>Explicit missing-value coding (not blank cells that could mean anything)</li>
                <li>Structured metadata that software can parse programmatically</li>
              </ul>
            </Card>
            <Card>
              <Badge tone="primary">What humans need</Badge>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>Readable codebooks that explain what each code means and when to apply it</li>
                <li>Context about how data was collected and what population it represents</li>
                <li>Plain-language descriptions alongside technical field names</li>
                <li>Example rows that show what a "correct" data point looks like</li>
                <li>Decision logs that explain why edge cases were handled a particular way</li>
              </ul>
            </Card>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>The good news:</strong> These are not competing goals. Data that is well-documented
              for humans (clear codebooks, explicit metadata, worked examples) is also easier to make
              machine-readable. The work of making data AI-ready starts with the same discipline that
              makes data reusable by other researchers: document everything, be explicit about structure,
              and never assume that column names speak for themselves.
            </p>
            <p className="mt-2 text-sm text-amber-800">
              <Badge tone="amber">CAMEL Challenge #21</Badge>
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 6: Practical advice ───────────────── */}
      <section id="practical-advice" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 6" title="Practical advice" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Six concrete steps for making your education research data more shareable, interoperable,
            and durable:
          </p>

          <div className="space-y-4">
            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">1</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Document your schema explicitly</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Do not assume column names are self-explanatory. Write a data dictionary that states
                    the name, type, allowed values, and meaning of every field. If your schema changes
                    between data collection waves, document each version.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">2</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Separate your metadata from your data</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Dataset-level metadata (collection context, population, license) belongs in a
                    dedicated metadata file or header — not buried in a README that lives in a different
                    folder. Use a standard format like{" "}
                    <code className="rounded bg-slate-100 px-1 text-xs">datapackage.json</code> or at
                    minimum a structured YAML file that travels with the data.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">3</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Version your codebook alongside your annotations</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    If you add a new code, refine a definition, or merge two codes, the codebook version
                    must change — and your annotations must record which codebook version they were produced
                    under. Without this, you cannot distinguish between "these two coders disagreed" and
                    "these two coders used different codebook versions."
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">4</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Use consistent missing-value codes</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Decide upfront how you will represent missing data and document it in your schema.
                    A blank cell, the string "NA", the number -999, and a null JSON value all mean
                    "missing" — but they are not interchangeable, and mixing them within a dataset
                    creates silent analysis errors.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">5</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Record your annotation provenance</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    For each annotation, capture who (or what) produced it. Was it a trained human coder?
                    A crowdsourced worker? An LLM? What codebook version did they use? What was the
                    inter-rater reliability? This provenance is what lets a downstream user decide
                    whether your annotations are trustworthy for their purpose.
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">6</span>
                <div>
                  <h4 className="font-display font-bold text-slate-900">Test your data with a stranger</h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Give your dataset — with its schema, metadata, and codebook — to someone outside
                    your project. If they cannot load the data, understand what each field means, and
                    reproduce a basic analysis without asking you questions, your documentation is not
                    sufficient. This is the simplest and most reliable usability test.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 7: Further reading ────────────────── */}
      <section id="further-reading" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 7" title="Further reading" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Continue exploring these topics with related resources on OMI:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Researcher Guide</h4>
              <p className="mt-1 text-sm text-slate-600">
                The full guide to contributing data to OMI — including de-identification review,
                licensing decisions, repository selection, and metadata standards.
              </p>
              <ButtonLink to="/researcher-guide" variant="outline" size="sm" className="mt-3">
                Researcher Guide →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Getting Started with OMI</h4>
              <p className="mt-1 text-sm text-slate-600">
                New to OMI? Start with a guided tour of the Data Depot, metadata cards, licensing,
                and how to load data into a notebook.
              </p>
              <ButtonLink to="/learning-center/getting-started" variant="outline" size="sm" className="mt-3">
                Getting Started →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Data Depot</h4>
              <p className="mt-1 text-sm text-slate-600">
                Browse real examples of schemas and metadata in action — every dataset in the
                Data Depot includes a metadata card and data dictionary.
              </p>
              <ButtonLink to="/data-depot" variant="outline" size="sm" className="mt-3">
                Browse datasets →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Science of Learning for Math Data</h4>
              <p className="mt-1 text-sm text-slate-600">
                The cognitive frameworks — productive struggle, mathematical modeling, statistical
                reasoning — that determine what annotation codes capture and why.
              </p>
              <ButtonLink to="/learning-center/science-of-learning" variant="outline" size="sm" className="mt-3">
                Science of Learning →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Annotation Best Practices</h4>
              <p className="mt-1 text-sm text-slate-600">
                How to build codebooks that work, train coders, measure reliability, and use AI as
                a second coder — the methodology behind high-quality annotation.
              </p>
              <ButtonLink to="/learning-center/annotation-best-practices" variant="outline" size="sm" className="mt-3">
                Annotation Best Practices →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Learning Center</h4>
              <p className="mt-1 text-sm text-slate-600">
                Return to the full catalog of courses and tutorials for teachers, students,
                and researchers.
              </p>
              <ButtonLink to="/learning-center" variant="outline" size="sm" className="mt-3">
                All courses →
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Summary banner ────────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Key takeaway</h2>
        <p className="mt-2 text-teal-100">
          Schema, metadata, and annotation are not synonyms. Treating them as distinct layers —
          and documenting each one explicitly — is what makes education data reusable across teams,
          disciplines, and tools.
        </p>
      </div>
    </div>
  );
}
