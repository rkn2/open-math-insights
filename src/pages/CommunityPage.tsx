import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SlackCTA } from "@/components/community/SlackCTA";
import { ContributorSpotlightCard } from "@/components/community/ContributorSpotlightCard";
import { EventCard } from "@/components/community/EventCard";

const SPOTLIGHTS: { name: string; role: string; initials: string; quote: string }[] = [];

const EVENTS: { date: string; title: string; description: string; kind: "Recurring" | "Sprint" | "Webinar" }[] = [];

const STEPS = [
  { title: "Prepare data", description: "De-identify and review your data — no student, teacher, or school identifiers." },
  { title: "Tag metadata", description: "Add grade band, topic/standard, and license tags using the Standards Aligner." },
  { title: "Submit", description: "Upload via the Data Depot's contribution tool and it's reviewed before publishing." },
];

export function CommunityPage() {
  useDocumentTitle("Community");
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
        {SPOTLIGHTS.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SPOTLIGHTS.map((s) => (
              <ContributorSpotlightCard key={s.name} {...s} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-slate-500">
            Community spotlights coming soon. As educators and researchers begin contributing data and tools, their stories will be featured here.
          </p>
        )}
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="Upcoming" title="Events & training" />
        {EVENTS.length > 0 ? (
          <div className="mt-8 grid gap-4">
            {EVENTS.map((e) => (
              <EventCard key={e.title} {...e} />
            ))}
          </div>
        ) : (
          <p className="mt-8 text-sm text-slate-500">
            No upcoming events scheduled yet. Check back as the collaboratory develops.
          </p>
        )}
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
      </div>
    </div>
  );
}
