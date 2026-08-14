import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { HeroSection } from "@/components/home/HeroSection";
import { ImpactStatsStrip } from "@/components/home/ImpactStatsStrip";
import { PillarCard } from "@/components/home/PillarCard";
import { NewsFeedItem } from "@/components/home/NewsFeedItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";

const ICON_PROPS = { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 } as const;

const PILLARS = [
  {
    to: "/data-depot",
    accent: "primary" as const,
    title: "Data Depot",
    description:
      "Browse, search, and cite openly licensed K-12 math datasets — every one tagged with grade band, topic, and a PII review status.",
    icon: (
      <svg className="h-6 w-6" {...ICON_PROPS}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6c0-1.1 3.58-2 8-2s8 .9 8 2-3.58 2-8 2-8-.9-8-2Zm0 0v12c0 1.1 3.58 2 8 2s8-.9 8-2V6M4 12c0 1.1 3.58 2 8 2s8-.9 8-2" />
      </svg>
    ),
  },
  {
    to: "/use-omi",
    accent: "teal" as const,
    title: "Use OMI",
    description:
      "Accessible compute — launch notebooks and lightweight tools to explore, visualize, and analyze open math data in your browser.",
    icon: (
      <svg className="h-6 w-6" {...ICON_PROPS}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A1.5 1.5 0 0 1 4.5 4h15A1.5 1.5 0 0 1 21 5.5v10A1.5 1.5 0 0 1 19.5 17h-15A1.5 1.5 0 0 1 3 15.5v-10ZM8 21h8M12 17v4M8 9l3 3 2-2 3 3" />
      </svg>
    ),
  },
  {
    to: "/learning-center",
    accent: "amber" as const,
    title: "Learning Center",
    description:
      "Courses and tutorials for teachers and researchers — from classroom data collection to annotation best practices and statistical foundations.",
    icon: (
      <svg className="h-6 w-6" {...ICON_PROPS}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.5C10.5 5 8 4.5 5 5v13c3 -0.5 5.5 0 7 1.5 1.5-1.5 4-2 7-1.5V5c-3-0.5-5.5 0-7 1.5Zm0 0V19" />
      </svg>
    ),
  },
  {
    to: "/community",
    accent: "coral" as const,
    title: "Community",
    description:
      "Educators, researchers, and CAMEL network teams — sharing datasets, tools, and ideas across projects.",
    icon: (
      <svg className="h-6 w-6" {...ICON_PROPS}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M13.5 3.4a4 4 0 0 1 0 7.2M21 19v-1a4 4 0 0 0-3-3.9M8.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      </svg>
    ),
  },
];

const NEWS = [
  { date: "Aug 2026", tag: "Data Depot", title: "Indexed NAEP math scale scores (2003–2024) from the Nation's Report Card API" },
  { date: "Aug 2026", tag: "Data Depot", title: "Indexed OECD PISA math scores (2009–2022) via Our World in Data" },
  { date: "Aug 2026", tag: "Data Depot", title: "Indexed ASSISTments 2009–2010 skill-builder dataset from figshare" },
];

export function HomePage() {
  useDocumentTitle("");
  return (
    <>
      <HeroSection />
      <ImpactStatsStrip />

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeading
          eyebrow="Four pillars"
          title="Standards, catalog, tools, and community — for K-12 math data that's open and trustworthy"
          subtitle="Modeled on the same open-cyberinfrastructure pattern that powers research data platforms — reimagined for K-12 math."
          align="center"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.title} {...p} featured={i === 0} className={i === 0 ? "sm:col-span-2 lg:col-span-3" : ""} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-b from-white to-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Two tracks"
            title="Whether you teach math or study how it's taught"
            subtitle="The Learning Center has a path built for you."
            align="center"
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="rounded-2xl border border-teal-200 bg-white p-8 shadow-sm">
              <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal-700">
                For teachers
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                Data literacy for your classroom
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                How to collect meaningful data in your own classroom, what standardized test scores
                actually tell you, and what to expect when researchers work in your school.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-500">
                <li>→ Collecting Data in Your Classroom</li>
                <li>→ Making Sense of Test Score Data</li>
                <li>→ When Researchers Visit</li>
              </ul>
              <ButtonLink to="/learning-center" variant="outline" size="sm" className="mt-6">
                Teacher track →
              </ButtonLink>
            </div>

            <div className="rounded-2xl border border-primary-200 bg-white p-8 shadow-sm">
              <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-700">
                For researchers
              </span>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">
                Data science foundations for education research
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Codebooks, schemas, annotation standards, intro to machine learning, and
                statistical foundations — grounded in real datasets and CAMEL network questions.
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-500">
                <li>→ Codebooks & Data Dictionaries</li>
                <li>→ Schemas, Metadata & Annotation</li>
                <li>→ Intro to ML · Statistical Foundations</li>
              </ul>
              <ButtonLink to="/learning-center" variant="outline" size="sm" className="mt-6">
                Researcher track →
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeading
            eyebrow="Platform at a glance"
            title="What's on OMI today"
            align="center"
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "3", label: "Indexed datasets", detail: "NAEP, PISA, ASSISTments" },
              { value: "526K+", label: "Data points", detail: "Across all indexed datasets" },
              { value: "8", label: "Learning resources", detail: "Teacher + researcher tracks" },
              { value: "2", label: "Colab notebooks", detail: "Runnable, no setup required" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white p-6 shadow-sm text-center">
                <p className="font-display text-3xl font-bold text-primary-600">{stat.value}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{stat.label}</p>
                <p className="mt-0.5 text-xs text-slate-500">{stat.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Searchable glossary", detail: "28 cross-referenced terms across 5 categories", to: "/glossary" },
              { label: "Use case workflows", detail: "End-to-end research examples: question → data → analysis → finding", to: "/use-cases" },
              { label: "Data contribution guide", detail: "4-phase process with interactive pre-submission checklist", to: "/contribute" },
              { label: "Researcher Guide", detail: "Repository comparison, de-identification checklist, FERPA reference", to: "/researcher-guide" },
              { label: "Dataset discovery chat (planned)", detail: "Guided decision tree to find the right dataset for your question", to: null },
              { label: "Standards Aligner", detail: "Match math problems to CCSS-style standards", to: "/use-omi" },
            ].map((feature) => (
              <div key={feature.label} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm">
                <span className="mt-0.5 text-primary-500">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  {feature.to ? (
                    <ButtonLink to={feature.to} variant="ghost" size="sm" className="!p-0 !text-sm !font-bold !text-slate-900">
                      {feature.label}
                    </ButtonLink>
                  ) : (
                    <p className="text-sm font-bold text-slate-900">{feature.label}</p>
                  )}
                  <p className="mt-0.5 text-xs text-slate-500">{feature.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading eyebrow="What's new" title="Latest from OMI" />
          <ul className="mt-8 rounded-2xl bg-slate-50 p-2 shadow-card sm:p-6">
            {NEWS.map((item) => (
              <NewsFeedItem key={item.title} {...item} />
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-slate-900 px-8 py-12 text-center sm:flex-row sm:text-left sm:px-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Want to contribute?</h2>
            <p className="mt-2 max-w-md text-slate-300">
              Researchers can share de-identified datasets. Teachers interested in data partnerships
              can connect with CAMEL network teams who help with study design and privacy compliance.
            </p>
          </div>
          <ButtonLink to="/about" size="lg">
            Learn more
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
