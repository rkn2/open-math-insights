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
      "Courses and tutorials for teachers and students — from a five-minute tour of the Data Depot to a full data-analysis unit.",
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
      "Educators, researchers, and district data teams — trading datasets, tools, and ideas together on Slack.",
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

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <SectionHeading eyebrow="What's new" title="Latest from OMI" />
          <ul className="mt-8 rounded-2xl bg-white p-2 shadow-card sm:p-6">
            {NEWS.map((item) => (
              <NewsFeedItem key={item.title} {...item} />
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-slate-900 px-8 py-12 text-center sm:flex-row sm:text-left sm:px-12">
          <div>
            <h2 className="font-display text-2xl font-bold text-white">Have data to share?</h2>
            <p className="mt-2 max-w-md text-slate-300">
              Contribute anonymized, openly licensed math data to the Data Depot and help build a
              shared foundation for K-12 math research.
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
