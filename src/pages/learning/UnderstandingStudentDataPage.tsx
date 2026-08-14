import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

const SECTIONS = [
  { id: "what-scores-measure", label: "1. What test scores actually measure" },
  { id: "score-types", label: "2. Scale scores, proficiency levels & percentiles" },
  { id: "what-average-means", label: "3. What \"average\" means in context" },
  { id: "common-misinterpretations", label: "4. Common misinterpretations" },
  { id: "data-privacy", label: "5. Data privacy & FERPA" },
  { id: "what-to-watch-for", label: "6. What to be wary of" },
  { id: "talking-to-students", label: "7. Talking to students about data" },
];

export function UnderstandingStudentDataPage() {
  useDocumentTitle("Understanding Your Students' Data");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Understanding Your Students' Data" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Teachers · Guide · 25 min"
          title="Understanding Your Students' Data"
          subtitle="A plain-language guide to what standardized math scores mean, what they miss, how to avoid common misreadings, and how to talk to your students about data."
        />
      </div>

      {/* Course outline sidebar-style navigation */}
      <nav className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Guide outline
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
      <section id="what-scores-measure" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="What test scores actually measure" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Standardized math tests are good at measuring certain things: whether a student can
            solve a particular type of problem under timed conditions, recall specific procedures,
            and apply skills that the test designers chose to assess. That information is real and
            useful.
          </p>
          <p>
            But a test score is a <strong className="text-slate-900">sample, not a census</strong>.
            It captures a slice of what a student knows on one day, under one set of conditions.
            Here is what most standardized math tests do not measure:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Creative problem-solving",
                desc: "Can a student approach an unfamiliar problem from a novel angle? Most standardized tests use fixed formats that reward recognition over invention.",
              },
              {
                title: "Persistence and productive struggle",
                desc: "Does the student stick with a hard problem, try multiple strategies, and learn from dead ends? Timed tests penalize this kind of thinking.",
              },
              {
                title: "Collaborative reasoning",
                desc: "Can the student explain their thinking to a peer, build on someone else's idea, or spot a flaw in a group argument? Tests are individual by design.",
              },
              {
                title: "Mathematical identity",
                desc: "Does the student see themselves as someone who can do math? A score says nothing about confidence, curiosity, or sense of belonging.",
              },
            ].map((item) => (
              <Card key={item.title}>
                <h4 className="font-display font-bold text-slate-900">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
              </Card>
            ))}
          </div>
          <p>
            None of this means test scores are useless. It means they answer a narrow question.
            When you look at your students' data, keep asking:{" "}
            <strong className="text-slate-900">what is this score telling me, and what is it
            silent about?</strong>
          </p>
        </div>
      </section>

      {/* ── Section 2 ──────────────────────────────────── */}
      <section id="score-types" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 2"
          title="Scale scores, proficiency levels & percentiles"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Reports from different tests use different numbers, and they do not mean the same
            thing. Here is a quick guide to the three most common types:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Type</th>
                  <th className="py-3 pr-4">What it is</th>
                  <th className="py-3">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">Scale score</td>
                  <td className="py-3 pr-4 text-slate-600">
                    A number on a continuous scale designed so that the same score means the same
                    level of performance from year to year. Useful for tracking growth over time.
                  </td>
                  <td className="py-3 text-slate-600">
                    NAEP uses a 0-500 scale. A grade 8 student scoring 282 in 2022 can be compared
                    to a 282 in 2019.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">Proficiency level</td>
                  <td className="py-3 pr-4 text-slate-600">
                    A category label (like "Basic," "Proficient," or "Advanced") created by drawing
                    cut lines through the scale scores. The cut lines are set by committees and
                    involve judgment calls.
                  </td>
                  <td className="py-3 text-slate-600">
                    On NAEP grade 8 math, "Proficient" starts at 299. A student at 298 is labeled
                    "Basic" even though they are one point away.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">Percentile</td>
                  <td className="py-3 pr-4 text-slate-600">
                    A ranking that tells you what percentage of test-takers scored at or below a
                    given score. It says nothing about what a student actually knows — only where
                    they fall relative to others.
                  </td>
                  <td className="py-3 text-slate-600">
                    A student at the 60th percentile scored higher than 60% of the comparison
                    group. If everyone improves, a student can learn more and still drop in
                    percentile.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Key takeaway:</strong> Scale scores are the most useful for tracking whether
              students are growing. Proficiency levels can be misleading because they collapse a
              continuous range into a handful of buckets. Percentiles tell you about rank, not
              knowledge.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3 ──────────────────────────────────── */}
      <section id="what-average-means" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 3"
          title={'What "average" means in context'}
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            When you see a headline like "math scores dropped 8 points," it is natural to wonder
            whether that is a lot. The answer depends entirely on the scale.
          </p>
          <p>
            <strong className="text-slate-900">NAEP's 0-500 scale</strong> is the most commonly
            cited national benchmark. Here is how to put changes in perspective:
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="text-2xl font-bold text-slate-900">~4 pts</p>
              <p className="mt-1 text-sm text-slate-600">
                A typical year-to-year fluctuation that may or may not reflect a real change.
                Within the margin of error for many state-level samples.
              </p>
            </Card>
            <Card>
              <p className="text-2xl font-bold text-slate-900">~8-10 pts</p>
              <p className="mt-1 text-sm text-slate-600">
                A meaningful shift. The 2020-2022 decline in grade 8 NAEP math was about 8 points
                — widely described as historically large.
              </p>
            </Card>
            <Card>
              <p className="text-2xl font-bold text-slate-900">~20-30 pts</p>
              <p className="mt-1 text-sm text-slate-600">
                Roughly the gap between adjacent proficiency levels. A change this large would
                represent a dramatic shift across an entire population.
              </p>
            </Card>
          </div>
          <p>
            The national average NAEP grade 8 math score in 2022 was 274 (out of 500). That
            number sits in the "Basic" range — below the "Proficient" cut of 299. But "Basic"
            does not mean students know nothing. It means they demonstrated partial mastery of
            the skills NAEP tests at that grade level.
          </p>
          <p>
            When your district gives you an average score, ask:{" "}
            <strong className="text-slate-900">average of what group, on what scale, compared
            to what?</strong> A classroom average, a school average, and a state average answer
            very different questions.
          </p>
        </div>
      </section>

      {/* ── Section 4 ──────────────────────────────────── */}
      <section id="common-misinterpretations" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 4" title="Common misinterpretations" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Even well-intentioned data use can go sideways. Here are four of the most common
            mistakes teachers encounter when interpreting math assessment data:
          </p>

          <div className="space-y-6">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Comparing scores across different tests
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                NAEP, PISA, and your state test all use different scales, test different content,
                and sample different populations. A student who scores "Proficient" on your state
                test might not score "Proficient" on NAEP — not because they got worse, but
                because the tests measure different things at different difficulty levels. You
                cannot compare a NAEP score of 282 to a PISA score of 478. They are not on the
                same ruler.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Ignoring confidence intervals
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Every reported score has a margin of error. When NAEP reports that a state average
                dropped from 285 to 282, that 3-point change may be within the confidence interval
                — meaning we cannot be sure it is a real decline rather than normal sampling
                variation. Always look for the error bars or the footnote that says "not
                significantly different." If a report does not mention confidence intervals, treat
                small changes with extra caution.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Treating one year's dip as a trend
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Scores bounce around. A single year's decline does not mean things are getting
                worse any more than a single year's increase means a program is working. A trend
                requires at least three data points, and ideally more. Before concluding that
                scores are "falling," look at the five- or ten-year trajectory.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Confusing group averages with individual students
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                A school average tells you about the school, not about any particular student.
                Knowing that your school's average dropped 5 points does not tell you which
                students struggled or why. Averages can also mask divergent trends — the top
                quartile might be improving while the bottom quartile is declining, producing a
                flat average that hides both stories.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 5 ──────────────────────────────────── */}
      <section id="data-privacy" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 5" title="Data privacy & FERPA" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            As a teacher, you handle student data every day. Understanding the basics of data
            privacy is not just a legal obligation — it is part of the trust your students and
            their families place in you.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What FERPA means for you
          </h3>
          <p>
            The <strong className="text-slate-900">Family Educational Rights and Privacy Act
            (FERPA)</strong> is a federal law that protects student education records. In
            practical terms, it means:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              You can access student records that you need for your job (a "legitimate educational
              interest"), but you cannot share them with people who do not have that same need.
            </li>
            <li>
              Parents (or eligible students age 18+) have the right to see their records and
              request corrections.
            </li>
            <li>
              Posting grades publicly — even by student ID number — can violate FERPA if students
              can be identified.
            </li>
          </ul>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What your district shares — and with whom
          </h3>
          <p>
            Your district likely shares student data with state education agencies (required for
            federal reporting), assessment vendors (to administer and score tests), and sometimes
            with researchers under data-sharing agreements. You may not always know the full list.
            It is worth asking your administrator:{" "}
            <strong className="text-slate-900">who has access to our students' individual-level
            test data?</strong>
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            De-identified vs. identifiable data
          </h3>
          <p>
            <strong className="text-slate-900">De-identified data</strong> has had names, IDs,
            and other identifying information removed so that no individual student can be
            recognized. The NAEP and PISA data on OMI are de-identified — they report group
            averages, not individual scores.
          </p>
          <p>
            <strong className="text-slate-900">Identifiable data</strong> includes anything that
            could be linked back to a specific student: names, student ID numbers, dates of
            birth, or even combinations of demographic details that narrow down to one person.
          </p>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Rule of thumb:</strong> If you are sharing student data outside your
              classroom — in a presentation, a blog post, a department meeting, or with a
              colleague — ask yourself whether any individual student could be identified from
              what you are showing. If yes, you need consent or you need to aggregate further.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 6 ──────────────────────────────────── */}
      <section id="what-to-watch-for" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 6" title="What to be wary of" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Data can be a powerful tool for understanding your students. It can also be misused —
            sometimes with good intentions. Here are patterns to watch for:
          </p>

          <div className="space-y-6">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Data used to rank and punish rather than inform
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                When test scores are used primarily to rank teachers, close schools, or allocate
                punishment, the data stops serving its educational purpose. Scores become something
                to fear rather than something to learn from. If your school treats data as a weapon,
                that is a systemic problem — not a reason to distrust data itself.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Disaggregated data on small groups
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Breaking data down by race, disability status, English learner status, or other
                categories is important for equity. But when the group is very small — say, 5
                students — reporting their average score can effectively identify individuals. Most
                reporting standards suppress groups smaller than 10, but not all do. Be cautious
                about sharing disaggregated data when your subgroups are small enough that people
                in the building could figure out who is who.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                "Data-driven" does not mean the data is right
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                The phrase "data-driven" implies objectivity, but the data itself reflects choices:
                who wrote the test questions, what content was included, how the test was
                administered, and how scores were calculated. A test with few geometry items will
                undercount geometry skills. A test given in English will undercount the math
                knowledge of students still learning English. Data is made by people, and it
                carries their assumptions.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Scores as the whole story
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                You know things about your students that no dataset captures: who had a
                breakthrough moment last Tuesday, who mentors younger students during group work,
                who came in over lunch to retry a problem they got wrong. Data should complement
                your professional judgment, not replace it.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 7 ──────────────────────────────────── */}
      <section id="talking-to-students" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 7"
          title="Talking to students about data"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Your students are going to encounter data about themselves — test scores, report
            cards, percentile rankings — for the rest of their lives. Math class is a natural
            place to help them understand what data means and what it does not.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Frame data as information, not judgment
          </h3>
          <p>
            When students hear "your score is 245," many hear "you are a 245." Help them
            separate the measurement from their identity. A score tells you how you did on
            these particular questions on this particular day. It does not tell you how smart
            you are or what you are capable of.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Teach the vocabulary
          </h3>
          <p>
            Students can handle terms like "scale score," "percentile," and "margin of error"
            if you explain them in plain language. This is math class — these are mathematical
            concepts. Teaching students to read a score report critically is a real-world data
            literacy skill.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Use classroom data as a teaching tool
          </h3>
          <p>
            Consider sharing aggregate (never individual) class data with your students and
            analyzing it together. What does the distribution look like? What might explain it?
            What questions would you want to ask before drawing conclusions? This turns data
            from something that happens <em>to</em> students into something they practice
            reasoning <em>with</em>.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Model healthy skepticism
          </h3>
          <p>
            Show students that even teachers ask questions about data: Where did this come from?
            Who was tested? What was not measured? Teaching students to interrogate data — rather
            than accept or reject it wholesale — is one of the most transferable skills math
            class can offer.
          </p>

          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Try this:</strong> Next time your class gets test scores back, spend 10
              minutes on a "what does this number actually tell us?" discussion. Use the
              vocabulary from Section 2. Ask students what they think the test measured — and
              what it did not. You may be surprised how much they already sense about the
              limitations.
            </p>
          </div>
        </div>
      </section>

      {/* ── Completion banner ─────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">You made it through the guide</h2>
        <p className="mt-2 text-teal-100">
          You now have a foundation for reading student data critically, protecting student
          privacy, and helping your students build their own data literacy. The numbers are a
          starting point — your professional knowledge fills in the rest.
        </p>
      </div>
    </div>
  );
}
