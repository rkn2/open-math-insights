import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { SlackCTA } from "@/components/community/SlackCTA";
import { ContributorSpotlightCard } from "@/components/community/ContributorSpotlightCard";
import { EventCard } from "@/components/community/EventCard";

const SPOTLIGHTS = [
  {
    name: "Lincoln Middle School Math Dept",
    role: "Featured Contributor",
    initials: "LM",
    quote: "We shared 3 datasets this quarter — seeing other teachers build on our data has been the best part.",
  },
  {
    name: "Dr. Priya Nandan",
    role: "Researcher Spotlight · Open Assessment Lab",
    initials: "PN",
    quote: "OMI made it possible to publish our proof dataset without a single privacy conversation — it's just not collected in the first place.",
  },
  {
    name: "Ms. Alvarez",
    role: "Community Spotlight · Algebra Readiness Study",
    initials: "MA",
    quote: "The Learning Center course got my whole department comfortable with the Jupyter Sandbox in an afternoon.",
  },
];

const EVENTS = [
  { date: "Sep 2", title: "OMI Community Call", description: "Monthly community call — updates, demos, and open Q&A.", kind: "Recurring" as const },
  { date: "Sep 15", title: "Fall Data Contribution Sprint", description: "A guided sprint for districts preparing their first dataset submission.", kind: "Sprint" as const },
  { date: "Oct 8", title: "K-12 Open Data in Math Ed", description: "Webinar series kickoff on open data practices in math education.", kind: "Webinar" as const },
];

const STEPS = [
  { title: "Prepare data", description: "De-identify and review your data — no student, teacher, or school identifiers." },
  { title: "Tag metadata", description: "Add grade band, topic/standard, and license tags using the Standards Aligner." },
  { title: "Submit", description: "Upload via the Data Depot's contribution tool and it's reviewed before publishing." },
];

export function CommunityPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Community"
        title="Educators and researchers, building this together"
        subtitle="OMI only works because people share data, tools, and feedback in the open."
      />

      <div className="mt-10">
        <SlackCTA />
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Spotlights" title="From the community" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SPOTLIGHTS.map((s) => (
            <ContributorSpotlightCard key={s.name} {...s} />
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Upcoming" title="Events & training" />
        <div className="mt-8 grid gap-4">
          {EVENTS.map((e) => (
            <EventCard key={e.title} {...e} />
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-3xl bg-slate-50 p-10">
        <SectionHeading eyebrow="How to contribute" title="Sharing data in three steps" align="center" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-teal-600 font-display font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 font-display font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <ButtonLink to="/contribute">Start contributing →</ButtonLink>
        </div>
      </div>
    </div>
  );
}
