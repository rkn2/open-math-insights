import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "why-open-data", label: "1. Why open data matters for teachers" },
  { id: "naep-national-trends", label: "2. What NAEP scores tell you" },
  { id: "classroom-activities", label: "3. Classroom activity ideas" },
  { id: "grade-appropriate", label: "4. Grade-appropriate suggestions" },
  { id: "what-to-watch", label: "5. What to watch out for" },
  { id: "resources", label: "6. Data Depot & notebook links" },
];

const ACTIVITY_IDEAS = [
  {
    title: "Country Comparison Challenge",
    description:
      "Have students pick three countries from the PISA dataset and compare their math scores over time. Ask: Which country improved the most? Which declined? What might explain the differences?",
    grades: "Grades 6–12",
  },
  {
    title: "What Does \"Average\" Really Mean?",
    description:
      "Use NAEP state-level data to discuss what an average score represents. If a state’s average went up by 5 points, does that mean every student improved? What information is hidden behind the average?",
    grades: "Grades 5–12",
  },
  {
    title: "Trend Detectives",
    description:
      "Show students a line chart of NAEP scores from 2003 to 2024. Ask them to identify the overall trend, find the year scores dropped the most, and hypothesize why. Then look up what happened that year.",
    grades: "Grades 4–12",
  },
  {
    title: "Build Your Own Bar Chart",
    description:
      "Give elementary students a printed table of NAEP scores for five states. Have them draw a bar chart by hand, then discuss: Which state scored highest? Is the difference large or small? What questions would you ask next?",
    grades: "Grades 3–5",
  },
];

export function UsingDataInClassroomPage() {
  useDocumentTitle("Using Open Data in Your Classroom");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Using Data in Your Classroom" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Teachers · Resource Guide"
          title="Using Open Data in Your Classroom"
          subtitle="Real datasets can make math more concrete, relevant, and interesting for students. This guide shows you how to bring openly available math data into your teaching — no coding experience required."
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
      <section id="why-open-data" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="Why open data matters for teachers" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            When people talk about "open data" in education, it can sound like something meant for
            researchers and policy analysts. But openly available math data is genuinely useful for
            classroom teachers too — and you don't need a statistics degree to use it.
          </p>
          <p>
            Here's why it matters:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Real context for math skills</h4>
              <p className="mt-1 text-sm text-slate-600">
                Students engage more when data comes from the real world. Comparing math scores
                across countries or tracking trends over twenty years gives "mean," "range," and
                "percent change" a purpose beyond the textbook.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Data literacy is a life skill</h4>
              <p className="mt-1 text-sm text-slate-600">
                Students will encounter charts and statistics constantly — in news, in jobs, in
                daily decisions. Working with real data teaches them to ask "Where did this come
                from?" and "What does this actually show?"
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">No cost, no permissions needed</h4>
              <p className="mt-1 text-sm text-slate-600">
                Open data is free to use and share. You don't need a subscription, a district
                license, or IRB approval. The datasets on OMI are pre-cleaned, de-identified, and
                ready to go.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">It connects to what you teach</h4>
              <p className="mt-1 text-sm text-slate-600">
                NAEP and PISA data map directly onto Common Core math standards — interpreting
                data, understanding variability, making comparisons, and constructing arguments
                with evidence.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 2 ──────────────────────────────────── */}
      <section id="naep-national-trends" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 2"
          title="What NAEP scores tell you (and what they don't)"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The <strong className="text-slate-900">National Assessment of Educational Progress
            (NAEP)</strong> is the largest nationally representative math assessment in the U.S.
            It tests students in grades 4 and 8 every two years and reports average scale scores
            by state, demographics, and over time. It's sometimes called "The Nation's Report Card."
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What NAEP is good for
          </h3>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Spotting national and state trends.</strong> You can see how your state's
              4th-grade math scores have changed over the past two decades, and how they compare
              to the national average.
            </li>
            <li>
              <strong>Understanding big-picture shifts.</strong> The pandemic's impact on math
              achievement shows up clearly in NAEP data — scores dropped significantly between
              2019 and 2022 across nearly every state.
            </li>
            <li>
              <strong>Starting classroom conversations.</strong> Showing students that "math
              scores went down nationwide" invites real questions: Why? For whom? Is it
              recovering?
            </li>
          </ul>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What NAEP doesn't tell you
          </h3>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>NAEP scores are not a report card for your classroom.</strong> They describe
              large populations, not individual students or teachers. A state's average score
              reflects decades of policy, funding, demographics, and systemic factors — not
              whether any particular teacher is doing a good or bad job. Use NAEP to spark
              questions, not to draw conclusions about your own students' abilities.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3 ──────────────────────────────────── */}
      <section id="classroom-activities" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 3" title="Classroom activity ideas" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            You don't need to write code to use real data in class. Here are four activities
            you can adapt to your grade level. Each one uses datasets available on OMI.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {ACTIVITY_IDEAS.map((activity) => (
              <Card key={activity.title} hover>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">
                  {activity.grades}
                </p>
                <h4 className="mt-1 font-display font-bold text-slate-900">{activity.title}</h4>
                <p className="mt-2 text-sm text-slate-600">{activity.description}</p>
              </Card>
            ))}
          </div>
          <p>
            For all of these activities, you can project data tables or charts from the{" "}
            <ButtonLink to="/data-depot" variant="ghost" size="sm">Data Depot</ButtonLink>{" "}
            onto a screen, print them out, or have students explore the dataset pages
            themselves on a computer or tablet.
          </p>
        </div>
      </section>

      {/* ── Section 4 ──────────────────────────────────── */}
      <section id="grade-appropriate" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 4" title="Grade-appropriate suggestions" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Not every dataset or tool is right for every grade. Here's a practical breakdown
            of what works well at different levels:
          </p>

          <div className="space-y-4">
            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Elementary (grades 3–5)
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Focus on <strong>reading and drawing simple charts</strong>. The NAEP dataset
                works well here — it's small, it's organized by state, and you can pull out
                a handful of rows for students to work with on paper. Have them build bar charts
                by hand comparing five or six states, practice reading values from a chart, or
                sort states from highest to lowest score. Keep it concrete: printed tables, hand-drawn
                graphs, and questions they can answer by counting or comparing.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                Middle school (grades 6–8)
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Students at this level can handle <strong>multi-variable comparisons and basic
                trend analysis</strong>. The PISA dataset is a natural fit — students can compare
                countries, calculate changes over time, and discuss what makes a fair comparison.
                They can also start using the{" "}
                <ButtonLink to="/data-depot" variant="ghost" size="sm">Data Depot</ButtonLink>{" "}
                directly on a computer to browse datasets and read metadata. If your school has
                Chromebooks, students can view (though not run) the Colab notebooks to see how
                researchers actually work with data.
              </p>
            </Card>

            <Card>
              <h4 className="font-display font-bold text-slate-900">
                High school (grades 9–12)
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                High school students, especially in statistics, AP, or data science courses, can{" "}
                <strong>work directly with the Colab notebooks</strong>. They can run the code cells
                to generate charts, modify parameters to explore different subsets, and write up
                their observations. This is also the right level for discussing data limitations:
                sampling bias, confounding variables, and what "statistically significant" actually
                means. The ASSISTments tutoring dataset adds another dimension — over 500,000 rows
                of real student interaction data that connects to their own experience with math
                practice.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 5 ──────────────────────────────────── */}
      <section id="what-to-watch" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 5" title="What to watch out for" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Using real data in the classroom is powerful, but it comes with responsibilities.
            Here are the most important things to keep in mind:
          </p>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                Data doesn't capture everything
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                A math score is one measurement taken on one day. It doesn't capture a student's
                creativity, persistence, growth over the semester, or ability to apply math in
                real situations. When discussing scores with students, make this explicit: data
                tells part of the story, never the whole thing.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                Scores reflect systems, not just teaching
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                When one state scores higher than another, that difference reflects funding
                levels, poverty rates, class sizes, access to resources, historical policy
                decisions, and dozens of other factors. Be careful not to frame score differences
                as "State A is better at teaching math than State B." Help students understand
                that these numbers come from complex systems.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                Small samples can mislead
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                If students look at a subset of the data — say, three countries over two years —
                the patterns they see may not hold up in the full dataset. This is actually a
                great teaching moment: it's a concrete way to introduce why sample size matters
                and why we should be cautious about drawing big conclusions from small slices of
                data.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <h4 className="font-display font-bold text-slate-900">
                Comparisons need context
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                NAEP and PISA use different scales, test different age groups, and sample
                differently. You can look at trends <em>within</em> each system (NAEP over time,
                PISA over time), but directly comparing a NAEP score to a PISA score doesn't
                work. Our{" "}
                <a
                  href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/02_comparing_naep_and_pisa.ipynb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-600 hover:text-primary-800 hover:underline"
                >
                  Comparing NAEP and PISA notebook
                </a>{" "}
                goes deeper into what's comparable and what isn't.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6 ──────────────────────────────────── */}
      <section id="resources" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 6" title="Data Depot & notebook links" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Everything mentioned in this guide is freely available. Here are direct links
            to get started:
          </p>

          <h3 className="mt-4 font-display text-base font-bold text-slate-900">Datasets</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">NAEP Math Scores</h4>
              <p className="mt-1 text-sm text-slate-600">
                National and state-level average math scores for grades 4 and 8, 2003–2024.
              </p>
              <ButtonLink
                to="/data-depot/naep-math-scale-scores-2003-2024"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                View dataset
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">PISA Math Scores</h4>
              <p className="mt-1 text-sm text-slate-600">
                International math scores for 15-year-olds across 80+ countries, 2003–2022.
              </p>
              <ButtonLink
                to="/data-depot/pisa-math-scores-owid-2009-2022"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                View dataset
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">ASSISTments Data</h4>
              <p className="mt-1 text-sm text-slate-600">
                525K+ rows of student tutoring logs with skill-level correctness and hint usage.
              </p>
              <ButtonLink
                to="/data-depot/assistments-2009-2010-skill-builder"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                View dataset
              </ButtonLink>
            </Card>
          </div>

          <h3 className="mt-8 font-display text-base font-bold text-slate-900">
            Colab notebooks
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Exploring Math Assessment Data
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Descriptive stats, trend plots, and a clustering analysis. A good first notebook
                for students who have never used Colab before.
              </p>
              <a
                href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/01_exploring_math_data.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
              >
                Open in Colab
              </a>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Comparing NAEP and PISA
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                What's comparable and what isn't. Useful for teaching students about the limits
                of cross-system comparisons.
              </p>
              <a
                href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/02_comparing_naep_and_pisa.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
              >
                Open in Colab
              </a>
            </Card>
          </div>

          <h3 className="mt-8 font-display text-base font-bold text-slate-900">
            More on OMI
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Browse the Data Depot</h4>
              <p className="mt-1 text-sm text-slate-600">
                Search and filter all available datasets by grade band, topic, or license.
              </p>
              <ButtonLink to="/data-depot" variant="outline" size="sm" className="mt-3">
                Open Data Depot
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Getting Started Course</h4>
              <p className="mt-1 text-sm text-slate-600">
                A 30-minute guided tour of OMI: datasets, metadata, licensing, and loading data
                into notebooks.
              </p>
              <ButtonLink
                to="/learning-center/getting-started"
                variant="outline"
                size="sm"
                className="mt-3"
              >
                Take the course
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Closing banner ─────────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">
          Your students can handle real data
        </h2>
        <p className="mt-2 text-teal-100">
          Start small. Pick one dataset, one chart, one question. Let the data do what
          textbook problems can't — connect math to the world your students already live in.
        </p>
      </div>
    </div>
  );
}
