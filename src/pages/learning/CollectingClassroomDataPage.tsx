import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "you-already-collect-data", label: "1. You already collect data every day" },
  { id: "what-could-you-measure", label: "2. What could you measure?" },
  { id: "designing-good-questions", label: "3. Designing good questions" },
  { id: "how-much-data", label: "4. How much data is enough?" },
  { id: "garbage-in-garbage-out", label: "5. Garbage in, garbage out" },
  { id: "protecting-privacy", label: "6. Protecting student privacy" },
  { id: "when-to-bring-in-researcher", label: "7. When to bring in a researcher" },
  { id: "getting-started", label: "8. Getting started: your first week" },
];

export function CollectingClassroomDataPage() {
  useDocumentTitle("Collecting Data in Your Classroom");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Collecting Classroom Data" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Teachers · Practical Guide"
          title="Collecting Data in Your Classroom"
          subtitle="You don't need a research degree to collect meaningful data about your students' learning. This guide shows you how to add structure to what you already notice. The goal is to help you make data-informed decisions in your own space."
          as="h1"
        />
      </div>

      {/* Page outline navigation */}
      <nav className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          In this guide
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
      <section id="you-already-collect-data" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="You already collect data every day" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Every time you give a quiz, watch students work through a problem, or notice who asks
            for help and who doesn't, you are collecting data. The difference between informal
            observation and systematic data collection is structure: deciding in advance what you'll
            look for, how you'll record it, and how much is enough to draw a conclusion.
          </p>
          <p>
            You already have instincts about what's working and what isn't. You notice when a
            lesson lands and when it doesn't, when a student is struggling and when they're
            coasting. That's valuable, but it's not systematic yet. Systematic doesn't mean
            complicated. It means consistent: the same question, asked the same way, at the same
            point in the lesson, recorded somewhere you can look at later.
          </p>
          <p>
            This guide walks you through how to add that structure without adding a second job.
            The goal is to give you tools for turning what you already notice into evidence you
            can act on, and when the time is right, share with others.
          </p>
        </div>
      </section>

      {/* ── Section 2 ──────────────────────────────────── */}
      <section id="what-could-you-measure" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 2" title="What could you measure?" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            There are four broad categories of classroom data that teachers can realistically
            collect without special tools or training. Each captures something different about
            student learning.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Student work products</h4>
              <p className="mt-1 text-sm text-slate-600">
                Written solutions, notebook entries, problem-solving explanations. What strategies
                did students use? Where did they get stuck? What errors show up repeatedly? Work
                products capture the end result of thinking, and when you collect them
                systematically, patterns emerge that are invisible on any single day.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Process observations</h4>
              <p className="mt-1 text-sm text-slate-600">
                How students approach problems before they arrive at an answer. Time on task,
                whether they try multiple strategies, whether they ask peers vs. teacher vs. give
                up. These are the behaviors that standardized tests miss entirely, and they often
                tell you more about learning than the final answer does.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Quick assessments</h4>
              <p className="mt-1 text-sm text-slate-600">
                Exit tickets, warm-up problems, periodic check-ins. Short, focused, designed to
                answer one question: "Did students understand X after today's lesson?" The power of
                quick assessments is frequency. Three exit tickets in a week tells you more than
                one test at the end of the month.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Student self-reports</h4>
              <p className="mt-1 text-sm text-slate-600">
                Brief surveys about confidence, confusion, interest. "Rate how well you understood
                today's lesson 1-5" captures something no test score can. Students often know when
                they're lost before their quiz scores show it, if you give them a way to tell you.
              </p>
            </Card>
          </div>
          <p>
            You don't need to collect all four types at once. Start with one. The category you
            choose should match the question you're trying to answer.
          </p>
        </div>
      </section>

      {/* ── Section 3 ──────────────────────────────────── */}
      <section id="designing-good-questions" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 3" title="Designing good questions" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The quality of your data depends on the quality of your questions. A well-designed
            question gives you information you can act on. A poorly designed one gives you noise
            that feels like information.
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                Ask one thing at a time
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                "Did you understand the lesson and did you find it interesting?" is two questions
                masquerading as one. If a student says "no," you don't know which part they're
                responding to. Split it: one question about understanding, another about interest.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                Be specific
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                "How was class today?" gives you nothing actionable. "Could you explain to a friend
                how to find the mean of a dataset?" gives you something you can act on. The more
                specific the question, the more useful the answer.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                Match the question to what you'll do with the answer
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                If you want to know whether to reteach fractions, ask about fractions, not "math
                in general." If you want to know whether students are ready to move on, ask them to
                demonstrate the specific skill you're assessing. Every question should connect to a
                decision you might make.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                Decide your response format in advance
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Yes/no, 1-5 scale, short answer, or multiple choice? Each gives you different data.
                Scales are easy to aggregate across students; short answers are richer but harder to
                analyze across 25 responses. Pick the format before you give the question, not
                after.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>The biggest mistake in classroom data collection</strong> is asking a vague
              question and then trying to interpret vague answers. "What did you learn today?"
              produces data that is hard to use. "Write one thing you can do now that you couldn't
              do yesterday" produces data you can act on.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4 ──────────────────────────────────── */}
      <section id="how-much-data" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 4" title="How much data is enough?" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            This is the question teachers ask most often, and the answer is more intuitive than
            you might expect. You don't need a statistics course to think clearly about sample size.
          </p>

          <div className="space-y-4">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                If you have 25 students, that IS your population
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                You are not sampling. You are measuring everyone. You don't need statistical
                significance to say "18 out of 25 students got this wrong." That's a fact about
                your class, not an estimate. For decisions about your own classroom, this is the
                most important thing to understand: you already have complete data.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                If you're comparing across classes or years, now sample size matters
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Two classes of 25 is a small sample for drawing general conclusions. Differences you
                see might be real, or they might be noise. Different students, different day,
                different energy in the room. The smaller the groups, the larger the difference
                needs to be before you can trust it.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                The magic question: "Would I see the same pattern if I measured again tomorrow?"
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                If yes, you probably have enough data. If you're not sure, you probably don't. This
                is the practical version of statistical reliability, and it's a surprisingly good
                gut check for whether your data is telling you something real.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Statistical power in one sentence
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                It's the likelihood that your measurement will detect a real difference if one
                exists. With small groups, only large differences are detectable. A 2-point
                difference on a quiz between two classes of 20 students? You can't tell if that's
                real. A 15-point difference? That's probably real.
              </p>
            </Card>
          </div>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>For most classroom decisions, you don't need formal statistical
              tests.</strong> You need enough data to be confident you're seeing a pattern, not a
              fluke. If 22 out of 25 students missed the same problem, you don't need a p-value
              to know you should reteach it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5 ──────────────────────────────────── */}
      <section id="garbage-in-garbage-out" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 5" title="Garbage in, garbage out" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            This is the most important principle in data, and it applies just as much to a
            classroom exit ticket as it does to a national assessment. The quality of your
            conclusions can never exceed the quality of your measurements.
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                If your quiz question is confusing, the scores reflect the confusion
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Not students' understanding. A question that's ambiguous, poorly worded, or tests
                reading comprehension instead of math will give you data about the wrong thing. Test
                your questions on a colleague first. If they have to ask what you mean, your
                students will too.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                If you only collect data on good days, your data won't represent reality
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                It's tempting to skip the exit ticket on the day everything went sideways. But those
                days are part of the picture too. Consistency matters more than perfection. Three
                data points that include a bad day are more honest than three data points from your
                best lessons.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                If students know the data is being used to judge them, they'll perform differently
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                A confidence survey where students think low ratings mean they'll get extra homework
                will produce inflated confidence scores. Design your collection so students can be
                honest. Make it clear that this data is for understanding, not grading.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                If you change what you're measuring midway through, you can't compare before and
                after
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                It's fine to improve your questions over time, but if you change the exit ticket
                format halfway through the unit, you have two different measurements, not a trend.
                Decide your measures at the beginning and stick with them for the duration.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm text-rose-800">
              <strong>Data can make you feel confident about a wrong conclusion.</strong> A
              perfectly administered quiz still tells you nothing if the questions don't measure
              what you think they measure. Always ask: "Does this measurement actually capture
              what I care about?"
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 6 ──────────────────────────────────── */}
      <section id="protecting-privacy" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 6" title="Protecting student privacy" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Collecting data about your students comes with a responsibility to protect it. Most
            classroom data collection is part of normal teaching practice and doesn't require formal
            research approval, but privacy still matters, especially if you ever want to share
            what you find.
          </p>

          <div className="space-y-4">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                De-identify before analyzing or sharing
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Remove names and use student numbers or codes when you're looking at patterns across
                your class. This is especially important if you're discussing results with
                colleagues, presenting at a department meeting, or sharing with anyone outside your
                classroom.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Never share individual student data outside your classroom without proper consent
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                This applies to conversations with other teachers, presentations, blog posts, and
                social media. Even well-intentioned sharing ("Look at this great student work!") can
                create problems if the student is identifiable.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Aggregate results are safer than individual records
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Class averages, distributions, and summary patterns are almost always safe to
                discuss. "72% of my students got question 3 wrong" is fine. "Jordan got question 3
                wrong" is not something to share beyond the normal scope of your teaching practice.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                If you want to share with researchers, work with someone who knows the rules
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                FERPA and IRB requirements exist for good reasons, but they're complex. If you're
                interested in contributing your classroom data to a research study, don't try to
                navigate the legal and ethical landscape alone. Partner with a researcher who does
                this regularly.
              </p>
            </Card>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>If you're excited about what your classroom data shows and want to share it
              more broadly, that's great.</strong> But please don't try to de-identify and
              publish student data on your own. Reach out to a CAMEL network researcher who can
              help you do it safely. Contact:{" "}
              <a
                href="mailto:nap@psu.edu"
                className="font-medium text-amber-900 underline hover:text-amber-950"
              >
                nap@psu.edu
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 7 ──────────────────────────────────── */}
      <section id="when-to-bring-in-researcher" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 7" title="When to bring in a researcher" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Classroom-scale data collection is powerful for your own teaching decisions. But there
            are moments when you have reached the limits of what one classroom can tell you, and
            that is when partnerships with education researchers add real value.
          </p>
          <p>
            You have likely reached that point when the following apply.
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                You want to compare your results to other classrooms or schools
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Your classroom data tells you about your students. To know if a pattern is specific
                to your class or shows up more broadly, you need data from other contexts, and
                that requires a study design that accounts for differences between settings.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                You want to know if an intervention "worked" in a statistically rigorous sense
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Trying a new approach and seeing improvement is encouraging, but it's not proof.
                Was it the new approach, or was it the extra attention, or was it that students were
                more motivated that week? A researcher can help you design a comparison that
                controls for these factors.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                You have questions about student cognition that observation alone can't answer
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Why do students make a particular error? What's happening in their reasoning that
                leads to a specific misconception? These questions require tools and frameworks from
                cognitive science and education research that go beyond what classroom observation
                can provide.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                You've collected interesting data and want to know if it's publishable
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                If you've noticed something genuinely surprising or useful in your classroom data, a
                researcher can help you determine whether it's a finding that would interest the
                broader field, and help you navigate the process of turning classroom observations
                into a published contribution.
              </p>
            </div>
          </div>

          <p>
            The CAMEL network connects teachers with
            researchers who study math learning. You bring the classroom expertise and the data;
            they bring the statistical tools and study design. It's a partnership, not a handoff.
          </p>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>Want to know what that partnership looks like?</strong> The{" "}
              <ButtonLink
                to="/learning-center/researchers-in-classroom"
                variant="ghost"
                size="sm"
              >
                When Researchers Visit Your Classroom
              </ButtonLink>{" "}
              page walks through what happens, what's protected, and what questions to ask before
              agreeing to participate.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 8 ──────────────────────────────────── */}
      <section id="getting-started" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 8" title="Getting started: your first week" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            You don't need to overhaul your practice to start collecting useful data. Here is a
            concrete, minimal plan for your first week.
          </p>

          <div className="space-y-4">
            <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                1
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900">
                  Pick ONE question you want to answer about your students' learning this week
                </h4>
                <p className="mt-1 text-sm text-slate-600">
                  Not three questions, not a broad topic. One specific question. "Do my students
                  understand how to set up a proportion?" or "Are students more confused by the
                  concept or the procedure?"
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                2
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900">
                  Design a 3-question exit ticket that targets that question
                </h4>
                <p className="mt-1 text-sm text-slate-600">
                  Keep it short. Three questions, each one addressing your focus question from a
                  slightly different angle. Decide the format (scale, short answer, multiple choice)
                  before you write the questions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                3
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900">
                  Give it three days in a row
                </h4>
                <p className="mt-1 text-sm text-slate-600">
                  Same format, same time of class, same conditions. Consistency is what turns three
                  individual snapshots into a trend you can read.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                4
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900">
                  At the end of the week, look at the results
                </h4>
                <p className="mt-1 text-sm text-slate-600">
                  What pattern do you see? Did understanding improve across the three days? Did the
                  same students struggle each time? Would you see the same pattern if you measured
                  again next week?
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-700">
                5
              </div>
              <div>
                <h4 className="font-display font-bold text-slate-900">
                  That's data collection. You just did it.
                </h4>
                <p className="mt-1 text-sm text-slate-600">
                  No software required. No statistical training. One question, one instrument,
                  three data points. You now know something about your students' learning that you
                  didn't know on Monday, and you have evidence to back it up.
                </p>
              </div>
            </div>
          </div>

          <h3 className="mt-8 font-display text-base font-bold text-slate-900">
            Continue learning
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Understanding Test Score Data
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Learn what large-scale assessment data (like NAEP) can tell you about trends in math
                learning, and what it can't.
              </p>
              <ButtonLink
                to="/learning-center/understanding-student-data"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                View guide
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                When Researchers Visit
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                What to expect when education researchers want to work with your classroom, your
                rights, what's protected, and what questions to ask.
              </p>
              <ButtonLink
                to="/learning-center/researchers-in-classroom"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                View guide
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Statistical Foundations
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                A plain-language introduction to the stats concepts behind education data,
                including
                confidence intervals, effect sizes, and sample size.
              </p>
              <ButtonLink
                to="/learning-center/statistical-foundations"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                View guide
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Closing banner ─────────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">
          You have everything you need to start
        </h2>
        <p className="mt-2 text-teal-100">
          One question, one exit ticket, one week. Once you see what the data tells you, you
          will want to collect more.
        </p>
      </div>
    </div>
  );
}
