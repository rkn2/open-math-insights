import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "what-is-sol", label: "1. What is the science of learning?" },
  { id: "modeling-cycle", label: "2. Mathematical modeling" },
  { id: "productive-struggle", label: "3. Productive struggle" },
  { id: "statistical-reasoning", label: "4. Statistical reasoning" },
  { id: "data-literacy", label: "5. Data literacy" },
  { id: "situated-cognition", label: "6. Situated cognition" },
  { id: "implications", label: "7. What this means for education data" },
  { id: "references", label: "8. Key references and further reading" },
];

export function ScienceOfLearningPage() {
  useDocumentTitle("The Science of Learning Behind Math Education Data");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Science of Learning" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Researchers & Educators"
          title="The Science of Learning Behind Math Education Data"
          subtitle="How cognitive science, educational psychology, and discipline-specific research shape what we measure, what we annotate, and what patterns we look for in student data. The theoretical foundations that connect learning theory to data practice."
        />
      </div>

      {/* Topic outline */}
      <nav className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Topics covered
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

      {/* ── Section 1: What is the science of learning? ── */}
      <section id="what-is-sol" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="What is the science of learning?" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The science of learning is the interdisciplinary study of how people learn, drawing on
            cognitive science, educational psychology, neuroscience, and discipline-specific
            education research. It's a broad field, but for math education data, three frameworks
            matter most.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Mathematical understanding
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                How students build conceptual knowledge of mathematics, moving from procedures to
                understanding why those procedures work.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Productive struggle</h4>
              <p className="mt-1 text-sm text-slate-600">
                What makes difficulty beneficial for learning versus what makes it frustrating and
                counterproductive.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Reasoning with data</h4>
              <p className="mt-1 text-sm text-slate-600">
                How students learn to collect, analyze, interpret, and question data, and the
                common misconceptions they hold along the way.
              </p>
            </Card>
          </div>

          <p>
            These aren't abstract theories. They determine what we measure, what we annotate, and
            what patterns we look for in student data. A tutoring system log that records "three
            incorrect attempts followed by a hint request" is a behavioral trace, but whether
            that trace represents productive struggle, a misconception, or simple disengagement
            depends on the learning theory you bring to the interpretation.
          </p>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>Why this page exists:</strong> Every dataset on OMI was shaped by theoretical
              choices: what to measure, how to categorize student responses, what counts as
              "proficiency." Understanding those choices helps you use the data responsibly and
              recognize what it can and cannot tell you.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Mathematical Modeling ──────────── */}
      <section id="modeling-cycle" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 2"
          title="Mathematical modeling: how students reason with real data"
          as="h2"
        />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The mathematical modeling cycle (Blum & Leiss, 2007; GAISE II, 2020) describes how
            students move between the real world and mathematics: understanding a situation,
            simplifying it, building a mathematical model, computing results, interpreting them
            back in context, and validating. Unlike textbook problems with one right answer,
            modeling with real data is nonlinear. Students cycle back and forth between phases.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <Badge tone="primary">Phase 1</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">
                Understand the situation
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Grasping the real-world context. What is happening? What do we want to find out?
                What information matters?
              </p>
            </Card>
            <Card>
              <Badge tone="primary">Phase 2</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Simplify and assume</h4>
              <p className="mt-1 text-sm text-slate-600">
                Stripping away complexity. What can we ignore? What assumptions make the problem
                tractable without losing the essential structure?
              </p>
            </Card>
            <Card>
              <Badge tone="primary">Phase 3</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Build a model</h4>
              <p className="mt-1 text-sm text-slate-600">
                Translating the simplified situation into mathematical language: equations, graphs,
                functions, or statistical representations.
              </p>
            </Card>
            <Card>
              <Badge tone="primary">Phase 4</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Compute</h4>
              <p className="mt-1 text-sm text-slate-600">
                Working within the mathematical model to produce results: solving equations,
                running calculations, fitting curves.
              </p>
            </Card>
            <Card>
              <Badge tone="primary">Phase 5</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Interpret</h4>
              <p className="mt-1 text-sm text-slate-600">
                Translating mathematical results back into the real-world context. What does this
                number actually mean for the original situation?
              </p>
            </Card>
            <Card>
              <Badge tone="primary">Phase 6</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Validate</h4>
              <p className="mt-1 text-sm text-slate-600">
                Checking whether the model's results make sense. Does the answer fit the real
                situation? Should we revise our assumptions and cycle back?
              </p>
            </Card>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Why this matters for data
          </h3>
          <p>
            When we annotate student work or build coding schemes for tutoring system logs, the
            modeling cycle tells us <em>what to look for</em>. Different errors at different phases
            mean different things. A student who can't understand the problem context is in a
            fundamentally different place than one who builds an inappropriate model or one who
            computes correctly but misinterprets the result.
          </p>
          <p>
            Datasets like ASSISTments capture some of these phases (problem attempts, hint usage,
            time-on-task) but not all. The log can tell you that a student spent three minutes on
            a problem and requested two hints, but it can't tell you whether the student was
            struggling with the real-world context or with the mathematical formulation. That
            distinction requires annotation, and the annotation scheme you choose reflects which
            phases of the modeling cycle you consider important.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Key insight:</strong> The modeling cycle is nonlinear. Students don't move
              through it in order. They loop back, skip phases, or get stuck cycling between two
              phases. Linear coding schemes that assume a fixed sequence will miss this behavior.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Productive Struggle ──────────── */}
      <section id="productive-struggle" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 3"
          title="Productive struggle: when difficulty helps learning"
          as="h2"
        />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Productive struggle (Hiebert & Grouws, 2007; Kapur, 2008, 2016; Warshauer, 2015) is
            the idea that certain kinds of difficulty actually improve learning. Not all struggle is
            equal. The research distinguishes{" "}
            <strong className="text-slate-900">productive struggle</strong> (leads to deeper
            understanding) from{" "}
            <strong className="text-slate-900">unproductive frustration</strong> (leads to
            disengagement).
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Four types of struggle in mathematics
          </h3>
          <p>
            Warshauer (2015) identified four types of struggle in math classrooms, each with
            distinct characteristics and implications for how we interpret student behavior:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <Badge tone="amber">Type 1</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Getting started</h4>
              <p className="mt-1 text-sm text-slate-600">
                The student doesn't know how to begin. They may stare at the problem, ask "what do
                I do first?", or attempt unrelated procedures. The entry point is the barrier.
              </p>
            </Card>
            <Card>
              <Badge tone="amber">Type 2</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">
                Carrying out a process
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                The student knows the general approach but gets stuck executing it. They may make
                computational errors, lose track of steps, or reach a dead end mid-procedure.
              </p>
            </Card>
            <Card>
              <Badge tone="amber">Type 3</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">
                Uncertainty in sense-making
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                The student has produced results but isn't sure what they mean. They may question
                whether their answer makes sense, struggle to connect the math back to the context,
                or express doubt about their interpretation.
              </p>
            </Card>
            <Card>
              <Badge tone="amber">Type 4</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">
                Expressing misconceptions
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                The student's reasoning reveals a misunderstanding, not just a procedural error but
                a conceptual one. They may apply a rule incorrectly because they misunderstand why
                it works.
              </p>
            </Card>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Why this matters for data
          </h3>
          <p>
            Tutoring system logs (like ASSISTments) capture behavioral signals of struggle:
            repeated incorrect attempts, hint requests, long pauses, problem abandonment. But the
            behavioral signal alone doesn't tell you what <em>type</em> of struggle is happening.
            A student who requests a hint after 30 seconds of inactivity might be experiencing
            Type 1 (can't get started), Type 3 (produced something but isn't sure it's right),
            or simple off-task behavior.
          </p>
          <p>
            That distinction requires annotation, and the annotation scheme you choose reflects
            your theoretical commitments about what kinds of struggle matter. A scheme that only
            codes "struggle" vs. "no struggle" collapses all four types into one category and
            loses the information that makes the concept useful.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Kapur (2016)</strong> showed that learning and performance are orthogonal. A
              student can perform well without learning deeply (unproductive success) or fail
              initially but learn more (productive failure). This is why test scores alone don't
              capture learning.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: Statistical Reasoning ──────────── */}
      <section id="statistical-reasoning" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 4"
          title="Statistical reasoning: how students think about data"
          as="h2"
        />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Students develop statistical reasoning through stages. Wild & Pfannkuch (1999) describe
            expert statistical thinking as having four dimensions: an investigative cycle (Problem{" "}
            {"→"} Plan {"→"} Data {"→"} Analysis {"→"} Conclusion), types of thinking
            (transnumeration, variation, modeling), an interrogative cycle of constantly questioning
            results, and dispositions like curiosity and skepticism.
          </p>
          <p>
            Most students are not expert statistical thinkers. They're developing along these
            dimensions. Understanding where students are in that development helps us interpret
            their performance on assessments and their behavior in data-rich learning environments.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Common misconceptions about data and statistics
          </h3>
          <p>
            Garfield (2002) identified misconceptions that students commonly hold about statistical
            concepts. These aren't random errors. They're systematic patterns of reasoning that
            show up reliably across populations:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <Badge tone="coral">Misconception</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Averages</h4>
              <p className="mt-1 text-sm text-slate-600">
                Believing the mean is always the "typical" value. Students may not recognize that
                the mean can be pulled by outliers and that the median sometimes better represents
                the center of a skewed distribution.
              </p>
            </Card>
            <Card>
              <Badge tone="coral">Misconception</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Sample size</h4>
              <p className="mt-1 text-sm text-slate-600">
                Not understanding that larger samples are more reliable. Students may believe that a
                poll of 10 people is just as trustworthy as one of 1,000, or that both are equally
                unreliable because "you can never be sure."
              </p>
            </Card>
            <Card>
              <Badge tone="coral">Misconception</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Representativeness</h4>
              <p className="mt-1 text-sm text-slate-600">
                Assuming small samples mirror the population. A student who flips 4 heads in 5
                coin tosses may conclude the coin is unfair, not recognizing that small samples
                naturally vary more.
              </p>
            </Card>
            <Card>
              <Badge tone="coral">Misconception</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Outcome orientation</h4>
              <p className="mt-1 text-sm text-slate-600">
                Focusing on individual outcomes rather than distributions. Instead of reasoning
                about what's likely across many trials, students predict what will happen in a
                single case, treating probability as certainty.
              </p>
            </Card>
          </div>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>Connection to assessment data:</strong> These misconceptions show up directly
              in assessment data. When NAEP reports that only 27% of 8th graders reach
              "proficient," part of what that reflects is how many students have developed beyond
              these common misconceptions about data and probability.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Data Literacy ──────────────────── */}
      <section id="data-literacy" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 5"
          title="Data literacy: reasoning about where data comes from"
          as="h2"
        />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Data literacy goes beyond statistical reasoning. It includes understanding where data
            came from, how it was collected, and what limitations that creates (Lehrer & Schauble,
            2000; Gould, 2017). Students developing data literacy learn to ask:{" "}
            <em>Who collected this? Why? What's missing? Can I trust it?</em>
          </p>
          <p>
            This matters for <strong className="text-slate-900">every dataset on OMI</strong>.
            Each one was collected under specific conditions, for specific purposes, with specific
            limitations:
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <Badge tone="primary">NAEP</Badge>
              <p className="mt-3 text-sm text-slate-600">
                NAEP data represents a <em>sample</em>, not a census. Understanding what that
                means, how the sample was drawn, and what population it represents IS data
                literacy. Not every student was tested, and the ones who were tested were chosen
                through a specific process.
              </p>
            </Card>
            <Card>
              <Badge tone="teal">PISA</Badge>
              <p className="mt-3 text-sm text-slate-600">
                PISA compares countries with fundamentally different education systems, and
                understanding the limits of that comparison IS data literacy. A higher score in
                Finland vs. the U.S. doesn't mean Finnish teaching methods would produce the same
                results here.
              </p>
            </Card>
            <Card>
              <Badge tone="amber">ASSISTments</Badge>
              <p className="mt-3 text-sm text-slate-600">
                ASSISTments logs capture what happened in the software (clicks, answers,
                timestamps) but not what the student was thinking. Understanding that gap between
                behavioral trace and cognitive process IS data literacy.
              </p>
            </Card>
          </div>

          <p>
            Data literacy is not a separate skill bolted onto statistics. It's the critical
            reasoning layer that makes statistical analysis meaningful. A student who can compute a
            confidence interval but doesn't question whether the sample is representative has only
            half the skill.
          </p>
        </div>
      </section>

      {/* ── Section 6: Situated Cognition ─────────────── */}
      <section id="situated-cognition" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 6"
          title="Situated cognition: why context matters"
          as="h2"
        />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Knowledge is tied to the activity and context where it's learned (Brown, Collins, &
            Duguid, 1989). Students who learn statistics on clean textbook datasets may struggle to
            apply those skills to real, messy data, a phenomenon called{" "}
            <strong className="text-slate-900">"inert knowledge."</strong> The procedures are
            stored in memory but don't activate when the context changes.
          </p>
          <p>
            This is why authentic data matters in math education, and it's the theoretical
            foundation for projects that bring real engineering, scientific, or assessment data into
            classrooms. If students only ever encounter pre-cleaned, perfectly structured datasets
            with obvious patterns, they won't develop the skills to handle the ambiguity and
            messiness of real data.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Why this matters:</strong> This framework explains why simply teaching
              statistical formulas doesn't produce students who can reason about real data. The
              context in which the skill is practiced shapes whether it transfers. A student who
              learned to calculate a mean on a textbook problem set may not recognize when a mean
              is the wrong summary statistic for a skewed real-world distribution.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 7: Implications ──────────────────── */}
      <section id="implications" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 7"
          title="What this means for working with education data"
          as="h2"
        />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            When you're building an annotation scheme, choosing what to measure in student data, or
            interpreting patterns in assessment results, these frameworks shape your decisions,
            whether you're aware of them or not. Making the theoretical commitments explicit helps
            you make better choices and communicate them to others.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What you annotate reflects theoretical commitments
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <Badge tone="amber">ASSISTments</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Tutoring logs</h4>
              <p className="mt-1 text-sm text-slate-600">
                Coding hint requests as "productive struggle" vs. "help-seeking" reflects whether
                you view difficulty as beneficial (Kapur) or as a signal the student needs
                scaffolding. The same behavioral data supports both interpretations.
              </p>
            </Card>
            <Card>
              <Badge tone="primary">NAEP</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">Assessment data</h4>
              <p className="mt-1 text-sm text-slate-600">
                NAEP's proficiency levels (Below Basic, Basic, Proficient, Advanced) embed
                theoretical assumptions about what students should know at each stage. A different
                theory of mathematical development might draw the boundaries differently.
              </p>
            </Card>
            <Card>
              <Badge tone="teal">Classroom</Badge>
              <h4 className="mt-3 font-display font-bold text-slate-900">
                Observation data
              </h4>
              <p className="mt-1 text-sm text-slate-600">
                Coding student discourse as "mathematical modeling" (Blum & Leiss) vs. "statistical
                reasoning" (Wild & Pfannkuch) vs. "data literacy" (Gould) highlights different
                aspects of the same conversation.
              </p>
            </Card>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            How you interpret patterns depends on your theory of learning
          </h3>
          <p>
            A pattern in tutoring log data, say a cluster of students who make many attempts,
            request few hints, and eventually get the right answer, could be interpreted as
            productive struggle (Kapur), as developing persistence (a disposition in Wild &
            Pfannkuch's framework), or as inefficient help-seeking behavior. The data doesn't tell
            you which interpretation is right. Your theory of learning does.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What you don't measure is as important as what you do
          </h3>
          <p>
            Every dataset has gaps that reflect theoretical choices. ASSISTments captures what
            students <em>do</em> but not what they <em>think</em>. NAEP captures what students
            know at a single point but not how they got there. Classroom observations capture
            teacher-student interactions but not the student's internal reasoning. Recognizing
            these gaps, and being explicit about them, is a mark of rigorous data practice.
          </p>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>The practical takeaway:</strong> When you work with any education dataset,
              ask: What theory of learning shaped the data collection? What did the designers
              choose to measure, and what did they leave out? How do those choices constrain
              the conclusions you can draw?
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 8: References ────────────────────── */}
      <section id="references" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 8" title="Key references and further reading" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <h3 className="mt-2 font-display text-base font-bold text-slate-900">
            Core references
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              Blum, W., & Leiss, D. (2007). How do students and teachers deal with modelling
              problems? In C. Haines et al. (Eds.),{" "}
              <em>Mathematical Modelling (ICTMA 12): Education, Engineering and Economics</em>.
              Horwood.
            </li>
            <li>
              Bargagliotti, A., Franklin, C., Arnold, P., Gould, R., Johnson, S., Perez, L., &
              Spangler, D. (2020).{" "}
              <em>
                Pre-K-12 Guidelines for Assessment and Instruction in Statistics Education II
                (GAISE II)
              </em>
              . American Statistical Association.
            </li>
            <li>
              Brown, J. S., Collins, A., & Duguid, P. (1989). Situated cognition and the culture
              of learning. <em>Educational Researcher</em>, 18(1), 32-42.
            </li>
            <li>
              Garfield, J. (2002). The challenge of developing statistical reasoning.{" "}
              <em>Journal of Statistics Education</em>, 10(3).
            </li>
            <li>
              Gould, R. (2017). Data literacy is statistical literacy.{" "}
              <em>Statistics Education Research Journal</em>, 16(1), 22-25.
            </li>
            <li>
              Hiebert, J., & Grouws, D. A. (2007). The effects of classroom mathematics teaching
              on students' learning. In F. K. Lester (Ed.),{" "}
              <em>Second Handbook of Research on Mathematics Teaching and Learning</em>. Information
              Age Publishing.
            </li>
            <li>
              Kapur, M. (2008). Productive failure.{" "}
              <em>Cognition and Instruction</em>, 26(3), 379-424.
            </li>
            <li>
              Kapur, M. (2016). Examining productive failure, productive success, unproductive
              failure, and unproductive success in learning.{" "}
              <em>Educational Psychologist</em>, 51(2), 289-299.
            </li>
            <li>
              Lehrer, R., & Schauble, L. (2000). Developing model-based reasoning in mathematics
              and science. <em>Journal of Applied Developmental Psychology</em>, 21(1), 39-48.
            </li>
            <li>
              Warshauer, H. K. (2015). Productive struggle in middle school mathematics
              classrooms. <em>Journal of Mathematics Teacher Education</em>, 18(4), 375-400.
            </li>
            <li>
              Wild, C. J., & Pfannkuch, M. (1999). Statistical thinking in empirical enquiry.{" "}
              <em>International Statistical Review</em>, 67(3), 223-248.
            </li>
          </ul>

          <h3 className="mt-8 font-display text-base font-bold text-slate-900">
            Related OMI pages
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Schemas, Metadata & Annotation
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                How the theoretical frameworks on this page connect to practical annotation work:
                building codebooks, defining categories, and ensuring reliability.
              </p>
              <ButtonLink
                to="/learning-center/schemas-metadata-annotation"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Schemas & Annotation {"→"}
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Statistical Foundations</h4>
              <p className="mt-2 text-sm text-slate-600">
                The quantitative tools for analyzing education data: descriptive statistics,
                confidence intervals, effect sizes, and inter-rater reliability.
              </p>
              <ButtonLink
                to="/learning-center/statistical-foundations"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Statistical Foundations {"→"}
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Codebooks</h4>
              <p className="mt-2 text-sm text-slate-600">
                How to build and use codebooks, the bridge between the theoretical constructs
                described here and the practical work of coding student data.
              </p>
              <ButtonLink
                to="/learning-center/codebooks"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Codebooks {"→"}
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Intro to ML</h4>
              <p className="mt-2 text-sm text-slate-600">
                Machine learning approaches to education data: how the features you choose
                (shaped by these theories) determine what patterns the models can find.
              </p>
              <ButtonLink
                to="/learning-center/intro-to-ml"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Intro to ML {"→"}
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Completion banner ─────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Theory shapes data practice</h2>
        <p className="mt-2 text-teal-100">
          Every dataset, annotation scheme, and assessment was shaped by a theory of how students
          learn. Now you know the frameworks, and you can read, use, and question education data
          with that understanding.
        </p>
      </div>
    </div>
  );
}
