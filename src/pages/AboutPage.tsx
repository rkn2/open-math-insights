import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";

const PRINCIPLES = [
  {
    title: "No PII, Ever",
    icon: "🔒",
    description:
      "OMI never collects or publishes student-identifying data. Every dataset goes through a de-identification review before it's published, and that review status is shown right on the dataset page.",
  },
  {
    title: "Cost-Conscious & Sustainable",
    icon: "💸",
    description:
      "The site is statically hosted and the tools are designed to run only when needed — nothing runs, and nothing costs money, when nobody's using it.",
  },
  {
    title: "Built for Collaboration",
    icon: "🤝",
    description:
      "Datasets are openly licensed and citable, tools are free to use, and the community lives in the open on Slack — collaboration is the point, not an afterthought.",
  },
];

export function AboutPage() {
  useDocumentTitle("About");
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <SectionHeading eyebrow="About" title="Open Math Insights (OMI)" />
      <p className="mt-6 max-w-3xl text-lg text-slate-600">
        OMI is an open, accessible, and authentic data infrastructure for K-12 math — a Data
        Depot, a set of accessible compute tools, a Learning Center, and a community, tied
        together on one platform. It's modeled on the same open-cyberinfrastructure ideas that
        power research data platforms, reimagined for math classrooms: open licensing, clear
        metadata, and a community built to share rather than gatekeep.
      </p>

      <div id="principles" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Our principles" title="What we won't compromise on" />
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {PRINCIPLES.map((p) => (
            <Card key={p.title}>
              <span className="text-2xl" aria-hidden>
                {p.icon}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{p.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <div id="data-policy" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Data policy" title="Licensing & de-identification standard" />
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600">
          Every dataset published to the Data Depot is reviewed against a de-identification
          checklist before it's tagged "Reviewed — No PII," and is published under one of three
          open licenses (CC-BY-4.0, CC0-1.0, or Public Domain) so it can be freely reused, cited,
          and built upon.
        </p>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Partners & supporters" title="Ecosystem" />
        <p className="mt-3 max-w-2xl text-sm text-slate-500">
          Partners will be listed here as the collaboratory grows.
        </p>
      </div>

      <div className="mt-16 rounded-3xl bg-slate-900 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Questions or feedback?</h2>
        <p className="mt-2 text-slate-300">
          Open Math Insights is part of the CAMEL NSF collaboratory. Reach out through the CAMEL network to get in touch with the team.
        </p>
      </div>
    </div>
  );
}
