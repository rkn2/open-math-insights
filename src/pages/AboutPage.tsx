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
      "Datasets are openly licensed and citable, tools are free to use, and the community lives in the open on Slack. Collaboration is central to the project.",
  },
];

export function AboutPage() {
  useDocumentTitle("About");
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <SectionHeading eyebrow="About" title="Open Math Insights (OMI)" />
      <p className="mt-6 max-w-3xl text-lg text-slate-600">
        OMI is an open, accessible, and authentic data infrastructure for K-12 math education.
        It includes a Data Depot, a set of accessible compute tools, a Learning Center, and
        a community, tied together on one platform. It's modeled on the open-cyberinfrastructure
        ideas that power research data platforms, adapted for math classrooms with open licensing,
        clear metadata, and a community built to share rather than gatekeep.
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
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "NSF CAMEL Network",
              role: "Funding and collaboration",
              description: "OMI serves all five Phase I CAMEL collaboratory projects and is being developed as shared infrastructure for Phase II.",
            },
            {
              name: "Vanderbilt University",
              role: "Infrastructure workstream lead",
              description: "Allen leads the OMI infrastructure workstream, managing site architecture, hosting, and technical coordination across the collaboratory.",
            },
            {
              name: "Penn State University",
              role: "Collaboratory member",
              description: "Rebecca Napolitano and the Modeling the Messy team contribute telemetry, annotation, and data translation frameworks.",
            },
            {
              name: "University of Utah",
              role: "Collaboratory member",
              description: "Chenglu and the ALTA-CN team contribute learning analytics and AI methods for math education data.",
            },
            {
              name: "University of Miami",
              role: "Collaboratory member",
              description: "Rui and the ALTA-CN team contribute learning analytics research across the CAMEL network.",
            },
            {
              name: "SERP Institute",
              role: "Collaboratory member",
              description: "Allie and the From Errors to Outcomes team contribute research on student mathematical errors and problem-solving strategies.",
            },
            {
              name: "Florida State University",
              role: "Collaboratory member",
              description: "The IDEAL-Math team contributes six existing K-5 datasets covering 90,000+ students and 3,000 teachers, along with training materials and data curation.",
            },
            {
              name: "NCES / Nation's Report Card",
              role: "Public data source",
              description: "NAEP math achievement data covering national and state-level trends, publicly available and updated biennially.",
            },
            {
              name: "OECD / PISA",
              role: "Public data source",
              description: "International math scores for 15-year-olds across 80+ countries, published via Our World in Data under CC-BY.",
            },
            {
              name: "ASSISTments / WPI",
              role: "Public data source",
              description: "Student-level tutoring system data from Worcester Polytechnic Institute, openly shared on Figshare.",
            },
          ].map((partner) => (
            <Card key={partner.name}>
              <h3 className="font-display font-bold text-slate-900">{partner.name}</h3>
              <p className="mt-0.5 text-xs font-medium text-primary-600">{partner.role}</p>
              <p className="mt-2 text-sm text-slate-600">{partner.description}</p>
            </Card>
          ))}
        </div>
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
