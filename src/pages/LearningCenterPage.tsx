import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseCard } from "@/components/learning/CourseCard";
import { TutorialListItem } from "@/components/learning/TutorialListItem";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const COURSES = [
  {
    title: "Getting Started with OMI Datasets",
    description: "A guided tour of the Data Depot, dataset metadata, and how licensing and citation work here.",
    level: "Beginner" as const,
    duration: "30 min",
  },
  {
    title: "Teaching Fractions with Open Data",
    description: "A teacher-focused course on bringing real fraction-response data into your classroom discussions.",
    level: "Intermediate" as const,
    duration: "1.5 hr",
  },
  {
    title: "Intro to Data Analysis in the Jupyter Sandbox",
    description: "Learn pandas and matplotlib basics using the OMI Jupyter Sandbox and a real Data Depot dataset.",
    level: "Intermediate" as const,
    duration: "2 hr",
  },
  {
    title: "Statistics for the Classroom: A Data-Driven Unit",
    description: "A full unit plan for teaching statistics and probability using open datasets from the Data Depot.",
    level: "Advanced" as const,
    duration: "4 hr",
  },
];

const TUTORIALS = [
  { title: "5-Minute Tour of the Data Depot", minutes: 5 },
  { title: "How to Cite an OMI Dataset", minutes: 4 },
  { title: "Reading a Dataset's Metadata Card", minutes: 6 },
  { title: "Your First Notebook in the OMI Sandbox", minutes: 10 },
];

export function LearningCenterPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Learning Center"
        title="Courses and tutorials for teachers and students"
        subtitle="Start with a 5-minute tour, or work through a full unit built around real, open math data."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {COURSES.map((course) => (
          <CourseCard key={course.title} {...course} />
        ))}
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <SectionHeading eyebrow="Quick tutorials" title="Short tutorials" />
          <ul className="mt-6 rounded-2xl border border-slate-100 bg-white px-6 shadow-card">
            {TUTORIALS.map((t) => (
              <TutorialListItem key={t.title} {...t} />
            ))}
          </ul>
        </div>

        <Card className="self-start bg-gradient-to-br from-amber-50 to-white">
          <h3 className="font-display text-lg font-bold text-slate-900">For educators</h3>
          <p className="mt-2 text-sm text-slate-600">
            Lesson-plan templates for bringing Data Depot datasets into your classroom — aligned
            to common standards and ready to adapt.
          </p>
          <Button size="sm" className="mt-4" disabled>
            Download templates — coming soon
          </Button>
        </Card>
      </div>
    </div>
  );
}
