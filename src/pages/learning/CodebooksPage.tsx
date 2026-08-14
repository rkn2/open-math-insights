import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "what-is-a-codebook", label: "1. What is a codebook?" },
  { id: "what-is-a-data-dictionary", label: "2. What is a data dictionary?" },
  { id: "codebook-vs-dictionary-vs-readme", label: "3. Codebook vs. dictionary vs. README" },
  { id: "how-to-build-one", label: "4. How to build one" },
  { id: "common-mistakes", label: "5. Common mistakes" },
  { id: "good-enough-to-share", label: "6. Good enough to share" },
  { id: "next-steps", label: "7. Next steps" },
];

const NAEP_DICTIONARY = [
  {
    column: "year",
    type: "integer",
    description: "Assessment year",
    validValues: "2003, 2005, 2007, 2009, 2011, 2013, 2015, 2017, 2019, 2022, 2024",
    example: "2024",
  },
  {
    column: "grade",
    type: "integer",
    description: "Grade level tested",
    validValues: "4, 8",
    example: "4",
  },
  {
    column: "jurisdiction",
    type: "string",
    description: "Two-letter jurisdiction code",
    validValues: "NP, CA, FL, MA, NY, TX",
    example: "NP",
  },
  {
    column: "jurisdiction_label",
    type: "string",
    description: "Human-readable name for the jurisdiction code",
    validValues: "National public, California, Florida, Massachusetts, New York, Texas",
    example: "National public",
  },
  {
    column: "avg_scale_score",
    type: "float",
    description: "Average NAEP mathematics scale score for this jurisdiction, grade, and year",
    validValues: "Observed range: 227.09 – 300.57",
    example: "233.95",
  },
];

export function CodebooksPage() {
  useDocumentTitle("Codebooks & Data Dictionaries");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Codebooks & Data Dictionaries" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Researchers · Reference · 20 min"
          title="Codebooks & Data Dictionaries"
          subtitle="The documentation that turns a CSV file into something another researcher can actually use. What codebooks and data dictionaries are, how they differ, and how to build one that meets OMI's publication bar."
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

      {/* ── Section 1 ──────────────────────────────────── */}
      <section id="what-is-a-codebook" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="What is a codebook?" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            A <strong className="text-slate-900">codebook</strong> is the document that tells
            another person what every variable in your dataset means. It is not the data itself.
            It is the key to reading it.
          </p>
          <p>
            Think of a codebook like the legend on a map. Without it, a reader staring at your
            CSV sees column headers like <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">jurisdiction</code> or{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">avg_scale_score</code>{" "}
            and has to guess what they contain. With a codebook, the reader knows that{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">jurisdiction</code>{" "}
            is a two-letter code where "NP" stands for "National public," and that{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">avg_scale_score</code>{" "}
            is the average NAEP mathematics scale score for that jurisdiction, grade, and year.
          </p>
          <p>
            A good codebook answers three questions for every variable.
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li><strong className="text-slate-900">What does this variable represent?</strong> A plain-language description.</li>
            <li><strong className="text-slate-900">What values can it take?</strong> The set of valid values or range.</li>
            <li><strong className="text-slate-900">What do coded values mean?</strong> Decode tables for any abbreviations or numeric codes.</li>
          </ul>
          <p>
            Codebooks are written for human readers. They prioritize clarity, context, and
            narrative explanation over rigid formatting. In education research, codebooks
            typically accompany survey instruments, assessment datasets, and administrative
            records.
          </p>
        </div>
      </section>

      {/* ── Section 2 ──────────────────────────────────── */}
      <section id="what-is-a-data-dictionary" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 2" title="What is a data dictionary?" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            A <strong className="text-slate-900">data dictionary</strong> is a more structured,
            technical companion to a codebook. Where a codebook explains variables in prose, a
            data dictionary specifies them in a table: column name, data type, valid values,
            units, and constraints. It is the document a developer or data engineer reads when
            writing code to load or validate the data.
          </p>
          <p>
            Here is a concrete example: the data dictionary for the{" "}
            <ButtonLink to="/data-depot/naep-math-scale-scores-2003-2024" variant="ghost" size="sm">
              NAEP Math Scale Scores
            </ButtonLink>{" "}
            dataset on OMI:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Column</th>
                  <th className="py-3 pr-4">Type</th>
                  <th className="py-3 pr-4">Description</th>
                  <th className="py-3 pr-4">Valid values</th>
                  <th className="py-3">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {NAEP_DICTIONARY.map((row) => (
                  <tr key={row.column} className="align-top">
                    <td className="py-3 pr-4 font-mono text-xs font-medium text-slate-900">
                      {row.column}
                    </td>
                    <td className="py-3 pr-4 text-slate-600">{row.type}</td>
                    <td className="py-3 pr-4 text-slate-600">{row.description}</td>
                    <td className="py-3 pr-4 text-slate-600">{row.validValues}</td>
                    <td className="py-3 font-mono text-xs text-slate-600">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Notice what the table gives you that a column header alone does not.{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">jurisdiction</code>{" "}
            could be a full state name, a FIPS code, or an abbreviation. The data dictionary
            resolves that ambiguity. It also tells you that{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">avg_scale_score</code>{" "}
            is a float (two decimal places in this dataset), not an integer, and that no rows
            are missing a score.
          </p>
          <p>
            Contrast this with the{" "}
            <ButtonLink to="/data-depot/pisa-math-scores-owid-2009-2022" variant="ghost" size="sm">
              PISA Math Scores
            </ButtonLink>{" "}
            dataset, which stores the same concept, a country-level average math score, under
            the column name{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">pisa_math_all_average</code>{" "}
            (a float with five decimal places, observed range 317.96 {"–"} 574.66). Without a
            data dictionary for each, a researcher trying to compare the two would have to guess
            whether these columns are even measuring the same thing.
          </p>
        </div>
      </section>

      {/* ── Section 3 ──────────────────────────────────── */}
      <section id="codebook-vs-dictionary-vs-readme" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 3"
          title="Codebook vs. data dictionary vs. README"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            These three documents overlap, but they serve different audiences and purposes.
            Most shared datasets benefit from having all three.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Codebook</h4>
              <p className="mt-2 text-sm font-medium text-teal-700">For human understanding</p>
              <p className="mt-2 text-sm text-slate-600">
                Explains what each variable means in plain language. Includes context about how
                data was collected, what codes mean, and how to interpret edge cases. Written
                for a researcher who will analyze the data.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Data dictionary</h4>
              <p className="mt-2 text-sm font-medium text-teal-700">For machine interoperability</p>
              <p className="mt-2 text-sm text-slate-600">
                A structured table of column names, types, constraints, and valid values.
                Written so software can validate data or a new team can build a schema.
                The reason you know{" "}
                <code className="rounded bg-slate-100 px-1 text-xs">jurisdiction</code>{" "}
                in NAEP and{" "}
                <code className="rounded bg-slate-100 px-1 text-xs">entity</code>{" "}
                in PISA both mean "geographic unit."
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">README</h4>
              <p className="mt-2 text-sm font-medium text-teal-700">For context and provenance</p>
              <p className="mt-2 text-sm text-slate-600">
                Answers: where did this data come from? Who collected it? When was it last
                updated? What license applies? How should it be cited? The first file a new
                user reads. It points them to the codebook and dictionary.
              </p>
            </Card>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>A practical rule of thumb:</strong> If a colleague could misinterpret a
              column, you need a codebook entry. If a script could load a column with the wrong
              type, you need a data dictionary entry. If someone could confuse your dataset with
              a different version, you need a README.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4 ──────────────────────────────────── */}
      <section id="how-to-build-one" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 4" title="How to build one" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            You do not need special software. A codebook can be a Markdown file, a sheet in a
            spreadsheet, or a section of a PDF. What matters is completeness and clarity. Here
            is a step-by-step process.
          </p>
          <ol className="ml-4 list-decimal space-y-3">
            <li>
              <strong className="text-slate-900">Start from your column headers.</strong>{" "}
              Open the CSV and list every column. This is your table of contents. If you have
              five columns (like the NAEP dataset), you need five entries. No exceptions.
            </li>
            <li>
              <strong className="text-slate-900">Document every variable.</strong>{" "}
              For each column, write a plain-language description. Do not assume the column name
              is self-explanatory. A column called{" "}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">grade</code>{" "}
              could mean grade level (4, 8), letter grade (A, B, C), or quality grade. Say which one.
            </li>
            <li>
              <strong className="text-slate-900">Include valid values or ranges.</strong>{" "}
              For categorical columns, list every possible value. For numeric columns, state
              the observed range. The observed NAEP scale scores in the OMI file fall between
              227.09 and 300.57. If the instrument's documentation declares a wider valid range,
              cite that too, distinguishing "what the data contains" from "what the scale
              allows" is itself useful information for a reader.
            </li>
            <li>
              <strong className="text-slate-900">Decode all abbreviations and codes.</strong>{" "}
              If "NP" means "National public," say so explicitly. If grade 4 means "fourth grade
              students," write it out. Build a lookup table for any coded values.
            </li>
            <li>
              <strong className="text-slate-900">Note your missingness conventions.</strong>{" "}
              How are missing values represented? Empty cell, "NA", -999, "."; different tools
              interpret these differently. If the dataset has no missing values (as in the current
              NAEP file), say that too.
            </li>
            <li>
              <strong className="text-slate-900">Specify units and precision.</strong>{" "}
              Is the score in points? Percentiles? Standard deviations? The NAEP file uses two
              decimal places (233.95); the PISA file uses five (377.46106). A researcher merging
              the two needs to know this before rounding.
            </li>
            <li>
              <strong className="text-slate-900">Version it alongside the data.</strong>{" "}
              When the data changes, the codebook must change with it. Store them together: same
              folder, same repository, same release. A codebook for last year's data is worse
              than no codebook at all, because it is actively misleading.
            </li>
          </ol>
        </div>
      </section>

      {/* ── Section 5 ──────────────────────────────────── */}
      <section id="common-mistakes" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 5" title="Common mistakes" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            These are the documentation gaps we see most often in submitted datasets. Each one
            has caused real confusion for at least one researcher trying to reuse the data.
          </p>
          <div className="space-y-4">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Undocumented codes</h4>
              <p className="mt-1 text-sm text-slate-600">
                What does jurisdiction "NP" mean? Without a decode table, a researcher might
                assume it is Nepal (the ISO country code), a typo, or a null marker. In the
                NAEP dataset, it means "National public," but that is obvious only if you
                already know NAEP conventions, which your reader may not.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Ambiguous units and precision</h4>
              <p className="mt-1 text-sm text-slate-600">
                The NAEP file stores scores to two decimal places; the PISA file stores them
                to five. Are these rounding choices meaningful, or artifacts of data processing?
                A codebook should say. Similarly,{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">avg_scale_score</code>{" "}
                and{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">pisa_math_all_average</code>{" "}
                both mean "average math score," but nothing in the column names tells you that.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Assuming column names are self-explanatory</h4>
              <p className="mt-1 text-sm text-slate-600">
                A column named{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">code</code>{" "}
                in the PISA dataset is usually a three-letter ISO country code (like "ALB" for
                Albania), but not always. Kosovo appears as "OWID_KOS" (a non-ISO code from the
                Our World in Data source), and aggregate rows like "OECD average" have a blank
                code entirely. Without a data dictionary, a reader filtering on three-letter codes
                silently drops those rows. Column names are mnemonics, not documentation.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Not versioning the codebook</h4>
              <p className="mt-1 text-sm text-slate-600">
                Datasets evolve. Columns get added, codes get redefined, years get appended. If
                the codebook describes last year's file but the data is this year's, a reader
                following the codebook will encounter columns that do not exist or values that
                the codebook says are invalid. Version the codebook with the data: same commit,
                same release, same update date.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Silent missingness</h4>
              <p className="mt-1 text-sm text-slate-600">
                If missing values are represented as empty strings, some tools will read them as
                empty strings rather than null. If they are represented as -999, someone will
                compute a mean that includes -999. State the convention, or state that there are
                no missing values. Silence is not a convention.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 6 ──────────────────────────────────── */}
      <section id="good-enough-to-share" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 6"
          title={`What makes a codebook "good enough to share"`}
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            For publication on OMI, a dataset's documentation must clear a specific bar. This
            is not about format. Markdown, PDF, and spreadsheets are all fine. It is about
            completeness.
          </p>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              OMI publication checklist
            </h4>
            <ul className="mt-3 space-y-2">
              {[
                "Every column in the dataset has a corresponding entry in the codebook or data dictionary",
                "Every coded or abbreviated value has an explicit decode (no undocumented codes)",
                "Data types are specified for each column (integer, float, string, date)",
                "Valid value ranges or value sets are documented",
                "Missingness conventions are stated, even if there are no missing values",
                "Units and precision are specified for all numeric columns",
                "The codebook version matches the dataset version (same release date)",
                "A README provides provenance: source, collection method, license, citation",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="mt-0.5 text-teal-500">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p>
            The test is simple: could a researcher who has never seen this data before load it,
            understand every column, and use it correctly, without emailing you to ask what
            something means? If yes, it is ready to share.
          </p>
        </div>
      </section>

      {/* ── Section 7 ──────────────────────────────────── */}
      <section id="next-steps" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 7" title="Next steps" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Now that you understand what codebooks and data dictionaries look like, explore
            the real examples and tools available on OMI:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Researcher Guide</h4>
              <p className="mt-1 text-sm text-slate-600">
                The full guide to preparing education data for open publication, including
                de-identification, repository comparison, and licensing.
              </p>
              <ButtonLink to="/researcher-guide" variant="outline" size="sm" className="mt-3">
                Researcher Guide →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Data Depot</h4>
              <p className="mt-1 text-sm text-slate-600">
                Browse OMI's dataset catalog to see codebooks and data dictionaries in
                practice. Each dataset page includes metadata, column documentation, and
                citation info.
              </p>
              <ButtonLink to="/data-depot" variant="outline" size="sm" className="mt-3">
                Browse datasets →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">NAEP Math Scale Scores</h4>
              <p className="mt-1 text-sm text-slate-600">
                The five-column dataset used as the running example in this guide. See its
                full metadata and data dictionary on the detail page.
              </p>
              <ButtonLink
                to="/data-depot/naep-math-scale-scores-2003-2024"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                View dataset →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Getting Started Course</h4>
              <p className="mt-1 text-sm text-slate-600">
                New to OMI? Start here for a guided tour of the Data Depot, metadata, licensing,
                and loading data into a notebook.
              </p>
              <ButtonLink to="/learning-center/getting-started" variant="outline" size="sm" className="mt-3">
                Getting Started →
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Completion banner ─────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Ready to document your data</h2>
        <p className="mt-2 text-teal-100">
          A dataset without a codebook is a dataset only you can use. Write the documentation,
          and let others build on your work.
        </p>
      </div>
    </div>
  );
}
