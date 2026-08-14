import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "what-research-looks-like", label: "1. What classroom research looks like" },
  { id: "what-camel-does", label: "2. What the CAMEL project does" },
  { id: "your-rights", label: "3. Your rights as a teacher" },
  { id: "student-privacy", label: "4. How student privacy is protected" },
  { id: "what-you-get", label: "5. What you get out of it" },
  { id: "what-leaves-what-stays", label: "6. What leaves your classroom vs. what stays" },
  { id: "questions-to-ask", label: "7. Questions to ask before agreeing" },
];

const DATA_FLOW = [
  {
    category: "Stays protected (never published as-is)",
    items: [
      "Raw student work and notebook files",
      "Names, student IDs, and any other identifiers",
      "Classroom video or audio recordings (if any)",
      "Individual survey responses tied to a student",
    ],
  },
  {
    category: "May be shared (always de-identified and aggregated)",
    items: [
      "Anonymized patterns in how students approach problems",
      "Aggregate trends across classrooms or grade levels",
      "Summary statistics (e.g., how often students revised an answer)",
      "Coded reasoning categories with all identifiers removed",
    ],
  },
];

const QUESTIONS_TO_ASK = [
  {
    question: "Who has IRB approval for this study, and can I see the approval letter?",
    why: "Every university research project involving human subjects must be reviewed by an Institutional Review Board. The researchers should be able to show you their approval documentation.",
  },
  {
    question: "What exactly is being collected from my students?",
    why: "You should receive a clear, specific list -- not vague descriptions. If they say 'interaction data,' ask what that means concretely.",
  },
  {
    question: "How long will data be retained, and what happens to it after the study ends?",
    why: "Data retention policies vary by institution and funder. You deserve a straight answer about timelines and what 'deletion' actually means.",
  },
  {
    question: "Will students or families be identifiable in anything that gets published?",
    why: "The answer should be an unequivocal no. Ask specifically about de-identification procedures.",
  },
  {
    question: "Can I see the results when the study is done?",
    why: "Good research partnerships share findings back with participating teachers. This is reasonable to expect and worth asking for up front.",
  },
  {
    question: "What does the consent process look like for families?",
    why: "Families should receive clear, accessible information about the study and have a genuine choice to opt out without consequences for their child.",
  },
  {
    question: "What happens if I change my mind partway through?",
    why: "You should be able to withdraw your classroom at any time. Ask what withdrawal looks like practically -- what happens to data already collected.",
  },
];

export function ResearchersInClassroomPage() {
  useDocumentTitle("When Researchers Visit Your Classroom");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "When Researchers Visit" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Teachers"
          title="When Researchers Visit Your Classroom"
          subtitle="A practical guide to understanding education research in your classroom -- what happens, what's protected, and what questions to ask."
          as="h1"
        />
      </div>

      {/* Section outline navigation */}
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
      <section id="what-research-looks-like" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="What classroom research actually looks like" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            If a researcher has asked to work with your classroom, you might be imagining lab
            coats, clipboards, and a disrupted schedule. The reality is usually much quieter than
            that. Most education research is designed to fit into your existing routines, not
            replace them.
          </p>
          <p>
            Here is what classroom-based education research commonly involves:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Classroom observations</h4>
              <p className="mt-1 text-sm text-slate-600">
                A researcher sits in during a lesson and takes notes on how the class unfolds --
                what questions students ask, how they work together, how they respond to different
                types of problems. They are observing the learning environment, not evaluating you.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Student work collection</h4>
              <p className="mt-1 text-sm text-slate-600">
                With permission, researchers may collect copies of student work -- problem sets,
                written explanations, scratch work -- to study how students think through math
                concepts. The originals stay with you and your students.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Screen recordings of problem-solving</h4>
              <p className="mt-1 text-sm text-slate-600">
                When students work on computers or tablets, researchers may record their screens
                (not their faces) to see the steps they take, where they pause, and how they
                revise their thinking. This captures process, not just final answers.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Surveys</h4>
              <p className="mt-1 text-sm text-slate-600">
                Short questionnaires about students' attitudes toward math, their confidence, or
                how they feel about a particular topic. These are age-appropriate and reviewed by
                an ethics board before use.
              </p>
            </Card>
          </div>
          <p>
            None of these methods should feel invasive. Good researchers will explain exactly
            what they plan to do, answer your questions, and adjust if something does not work
            for your classroom.
          </p>
        </div>
      </section>

      {/* ── Section 2 ──────────────────────────────────── */}
      <section id="what-camel-does" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 2" title="What the CAMEL project does" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            <strong className="text-slate-900">CAMEL</strong> is an NSF-funded research project
            focused on capturing how students reason through math problems. The goal is to
            understand not just whether a student got the right answer, but how they got there --
            what strategies they tried, where they got stuck, and how they worked through
            confusion.
          </p>
          <p>
            Specifically, CAMEL captures student reasoning through:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Notebook telemetry</h4>
              <p className="mt-1 text-sm text-slate-600">
                When students work on math problems in a digital notebook, the system records
                their interactions -- things like which steps they took, how they moved between
                parts of a problem, and when they revised their work. Think of it as a record of
                their problem-solving journey, not a test score.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Annotation of reasoning</h4>
              <p className="mt-1 text-sm text-slate-600">
                Trained researchers review student work and annotate the reasoning strategies
                students used. This creates structured data about how students think, which can
                reveal patterns across many classrooms that no single teacher could see alone.
              </p>
            </Card>
          </div>
          <p>
            CAMEL is part of a broader network of research teams working on math education.
            Open Math Insights is the open-data arm of the project -- the datasets, tools, and
            resources on this site are built to serve the mission of improving how we understand
            and support student reasoning in K-12 math.
          </p>
        </div>
      </section>

      {/* ── Section 3 ──────────────────────────────────── */}
      <section id="your-rights" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 3" title="Your rights as a teacher" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Participating in education research is always voluntary. Here is what that means
            in practice:
          </p>
          <div className="space-y-4">
            <Card>
              <h4 className="font-display font-bold text-slate-900">You can say no</h4>
              <p className="mt-1 text-sm text-slate-600">
                You are never obligated to participate, regardless of whether your administration
                has agreed to a broader partnership. Your classroom is your professional space,
                and you have the right to decline.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">You can set boundaries</h4>
              <p className="mt-1 text-sm text-slate-600">
                Maybe you are comfortable with student work collection but not screen recordings.
                Maybe certain weeks are off-limits because of testing or special events.
                Researchers should work around your constraints, not the other way around.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">You should know exactly what is collected</h4>
              <p className="mt-1 text-sm text-slate-600">
                Before you agree, researchers should provide a clear, specific description of
                every type of data they plan to collect. If something is unclear, ask. If the
                answer is vague, that is a reason to push back.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">You can change your mind</h4>
              <p className="mt-1 text-sm text-slate-600">
                Consent is ongoing. If you agree to participate and later decide it is not
                working, you can withdraw. Ask what withdrawal looks like before you start, so
                you know the process.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 4 ──────────────────────────────────── */}
      <section id="student-privacy" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 4" title="How student privacy is protected" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Student privacy is not just a value -- it is backed by federal law, institutional
            oversight, and specific technical procedures. Here is how the system works:
          </p>
          <div className="space-y-4">
            <Card>
              <h4 className="font-display font-bold text-slate-900">IRB review</h4>
              <p className="mt-1 text-sm text-slate-600">
                Before any data collection begins, the research plan must be reviewed and
                approved by an Institutional Review Board (IRB) -- an independent committee at
                the researcher's university that evaluates whether the study adequately protects
                participants. This is a legal requirement, not optional.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Parental consent</h4>
              <p className="mt-1 text-sm text-slate-600">
                Families must give informed consent before their child's data can be used in
                research. Consent forms explain what is collected, how it will be used, and how
                to opt out. Students whose families do not consent still participate in classroom
                activities normally -- their data simply is not included in the research.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">De-identification before publication</h4>
              <p className="mt-1 text-sm text-slate-600">
                Before any data is shared publicly or published in a paper, all identifying
                information is removed -- names, student IDs, school names, and anything else
                that could connect data back to a specific student. Published findings describe
                patterns across groups, not individual children.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">FERPA compliance</h4>
              <p className="mt-1 text-sm text-slate-600">
                The Family Educational Rights and Privacy Act (FERPA) is a federal law that
                protects student education records. Researchers working with school data must
                comply with FERPA, which governs who can access records and under what conditions.
              </p>
            </Card>
          </div>
          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>Want the technical details?</strong> The{" "}
              <ButtonLink to="/researcher-guide#deidentification" variant="ghost" size="sm">
                De-identification section of the Researcher Guide
              </ButtonLink>{" "}
              walks through the specific steps researchers follow to remove identifying
              information from datasets before publication.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5 ──────────────────────────────────── */}
      <section id="what-you-get" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 5" title="What you get out of it" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Research partnerships are not one-directional. When a study is well run, teachers
            gain real value from the experience:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                See your students' thinking in new ways
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Research tools can surface reasoning patterns you might not catch in the flow of
                a lesson -- how students approach a problem before arriving at an answer, where
                common misconceptions appear, and which strategies different students use for the
                same problem.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Professional development
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Working alongside researchers exposes you to current findings in math education,
                new frameworks for understanding student reasoning, and evidence-based approaches
                you can apply in your own practice.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Contribute to better math teaching
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                The research that comes from classroom partnerships directly informs curriculum
                design, teaching materials, and education policy. Your participation helps build
                the evidence base that improves math instruction for students everywhere.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 6 ──────────────────────────────────── */}
      <section id="what-leaves-what-stays" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 6" title="What leaves your classroom vs. what stays" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            One of the most important things to understand is the boundary between what
            researchers keep internally and what eventually becomes public. Here is how that
            typically breaks down:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DATA_FLOW.map((row) => (
                  <tr key={row.category} className="align-top">
                    <td className="py-3 pr-4 font-medium text-slate-900">{row.category}</td>
                    <td className="py-3 text-slate-600">
                      <ul className="list-disc space-y-1 pl-4">
                        {row.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            The key principle is straightforward: <strong className="text-slate-900">raw
            student work stays protected, and anything that gets published is always
            de-identified and aggregated</strong>. No individual student should ever be
            recognizable in published research.
          </p>
        </div>
      </section>

      {/* ── Section 7 ──────────────────────────────────── */}
      <section id="questions-to-ask" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 7" title="Questions to ask before agreeing" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Before you say yes to a research partnership, you have every right to ask detailed
            questions. Good researchers will welcome them. Here are the ones that matter most:
          </p>
          <div className="space-y-4">
            {QUESTIONS_TO_ASK.map((q) => (
              <Card key={q.question}>
                <h4 className="font-display font-bold text-slate-900">
                  "{q.question}"
                </h4>
                <p className="mt-2 text-sm text-slate-600">{q.why}</p>
              </Card>
            ))}
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>A good sign:</strong> Researchers who answer these questions clearly and
              without defensiveness are showing you that they take your role seriously.
              If someone is evasive or dismissive about privacy and consent, that tells you
              something important.
            </p>
          </div>
        </div>
      </section>

      {/* ── Closing banner ─────────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Your classroom, your call</h2>
        <p className="mt-2 text-teal-100">
          Research partnerships work best when teachers feel informed and empowered.
          Now you know what to expect -- and what to ask.
        </p>
      </div>
    </div>
  );
}
