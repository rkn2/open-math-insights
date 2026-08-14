import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CourseCard } from "@/components/learning/CourseCard";
import { Badge } from "@/components/ui/Badge";

const GENERAL = [
  {
    title: "Getting Started with OMI Datasets",
    description: "A guided tour of the Data Depot, dataset metadata, and how licensing and citation work here.",
    level: "Beginner" as const,
    duration: "30 min",
    href: "/learning-center/getting-started",
  },
];

const TEACHER_TRACK = [
  {
    title: "Using Open Data in Your Classroom",
    description: "Practical activities with real NAEP and PISA data — grade-appropriate ideas for bringing open data into math lessons.",
    level: "Beginner" as const,
    duration: "25 min",
    href: "/learning-center/using-data-in-classroom",
  },
  {
    title: "Making Sense of Test Score Data",
    description: "What test scores actually measure, what they miss, how to interpret them responsibly, and how to talk to students about data.",
    level: "Beginner" as const,
    duration: "25 min",
    href: "/learning-center/understanding-student-data",
  },
  {
    title: "Collecting Data in Your Classroom",
    description: "What to measure, how to design good questions, how much data is enough, and when to bring in a researcher — a practical guide to classroom inquiry.",
    level: "Beginner" as const,
    duration: "25 min",
    href: "/learning-center/collecting-classroom-data",
  },
  {
    title: "When Researchers Visit Your Classroom",
    description: "What education research looks like in practice, your rights, how student privacy is protected, and what you get out of participating.",
    level: "Beginner" as const,
    duration: "20 min",
    href: "/learning-center/researchers-in-classroom",
  },
];

const RESEARCHER_TRACK = [
  {
    title: "Codebooks & Data Dictionaries",
    description: "What they are, how to build one, and concrete examples from the NAEP and PISA datasets on this site.",
    level: "Beginner" as const,
    duration: "25 min",
    href: "/learning-center/codebooks",
  },
  {
    title: "Schemas, Metadata & Annotation",
    description: "The three layers of data documentation — what each means, why they matter for interoperability, and where CAMEL network teams diverge.",
    level: "Intermediate" as const,
    duration: "30 min",
    href: "/learning-center/schemas-metadata-annotation",
  },
  {
    title: "Science of Learning for Math Data",
    description: "The cognitive frameworks behind math education data — mathematical modeling, productive struggle, statistical reasoning, and why they shape what we measure.",
    level: "Intermediate" as const,
    duration: "30 min",
    href: "/learning-center/science-of-learning",
  },
  {
    title: "Annotation Best Practices",
    description: "How to build reliable annotation schemes — codebook design, coder training, inter-rater reliability, AI-assisted annotation, and iterative refinement.",
    level: "Intermediate" as const,
    duration: "30 min",
    href: "/learning-center/annotation-best-practices",
  },
  {
    title: "Intro to Machine Learning for Education Data",
    description: "Clustering, classification, and feature importance — what they do, when to use them, and when not to. Includes a runnable Colab notebook.",
    level: "Intermediate" as const,
    duration: "35 min",
    href: "/learning-center/intro-to-ml",
  },
  {
    title: "Statistical Foundations",
    description: "Confidence intervals, effect sizes, inter-rater reliability, and other concepts you'll encounter in education data research.",
    level: "Intermediate" as const,
    duration: "30 min",
    href: "/learning-center/statistical-foundations",
  },
];

export function LearningCenterPage() {
  useDocumentTitle("Learning Center");
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Learning Center"
        title="Resources for teachers and researchers"
        subtitle="Whether you teach math or study how it's taught — start here. Two tracks, one goal: making open education data accessible and useful."
      />

      {/* ── Start here ────────────────────────────────── */}
      <div className="mt-10">
        <SectionHeading eyebrow="Start here" title="For everyone" as="h2" />
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {GENERAL.map(({ href, ...course }) => (
            <CourseCard key={course.title} {...course} href={href} />
          ))}
        </div>
      </div>

      {/* ── Teacher track ─────────────────────────────── */}
      <div className="mt-16">
        <div className="flex items-center gap-3">
          <SectionHeading eyebrow="Teacher track" title="For classroom teachers" as="h2" />
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          How to collect meaningful data in your own classroom, what standardized test scores
          actually tell you, and what to expect when researchers work in your school.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEACHER_TRACK.map(({ href, ...course }) => (
            <CourseCard key={course.title} {...course} href={href} />
          ))}
        </div>
      </div>

      {/* ── Researcher track ──────────────────────────── */}
      <div className="mt-16">
        <div className="flex items-center gap-3">
          <SectionHeading eyebrow="Researcher track" title="For education researchers" as="h2" />
        </div>
        <p className="mt-2 max-w-3xl text-sm text-slate-500">
          Data science foundations for education researchers — from codebooks and annotation standards
          to machine learning and statistical inference, grounded in real datasets and the questions
          the CAMEL network is working on.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {RESEARCHER_TRACK.map(({ href, ...course }) => (
            <CourseCard key={course.title} {...course} href={href} />
          ))}
        </div>
      </div>

      {/* ── CTA ───────────────────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-slate-50 p-10 text-center">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Not sure where to start?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          The <Badge tone="teal">Getting Started</Badge> course covers everything you need for your
          first session with OMI — metadata, licensing, citation, and loading data into a notebook.
        </p>
      </div>
    </div>
  );
}
