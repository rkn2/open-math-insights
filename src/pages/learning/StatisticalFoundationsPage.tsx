import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "descriptive-statistics", label: "1. Descriptive statistics" },
  { id: "confidence-intervals", label: "2. Confidence intervals" },
  { id: "statistical-vs-practical", label: "3. Statistical vs. practical significance" },
  { id: "correlation-vs-causation", label: "4. Correlation vs. causation" },
  { id: "sample-size", label: "5. Sample size and why it matters" },
  { id: "inter-rater-reliability", label: "6. Inter-rater reliability (kappa)" },
  { id: "reading-research", label: "7. Reading published research" },
  { id: "next-steps", label: "8. Where to go next" },
];

export function StatisticalFoundationsPage() {
  useDocumentTitle("Statistical Foundations for Education Research");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Statistical Foundations" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Researchers"
          title="Statistical Foundations for Education Research"
          subtitle="A plain-language introduction to the quantitative concepts you'll encounter when working with education data. Topics include descriptive statistics, confidence intervals, effect sizes, reliability, and more. No formulas required."
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

      {/* ── Section 1: Descriptive Statistics ──────────── */}
      <section id="descriptive-statistics" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="Descriptive statistics" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Before you can analyze education data, you need to describe it. Three numbers do most
            of the heavy lifting. These are the <strong className="text-slate-900">mean</strong>,
            the <strong className="text-slate-900">median</strong>, and the{" "}
            <strong className="text-slate-900">standard deviation</strong>.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Mean</h4>
              <p className="mt-1 text-sm text-slate-600">
                The arithmetic average. Add all the values, divide by how many there are. Sensitive
                to extreme values. A few very high or very low scores will pull it up or down.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Median</h4>
              <p className="mt-1 text-sm text-slate-600">
                The middle value when scores are sorted. Less affected by outliers than the mean.
                If the mean and median are far apart, the data is probably skewed.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Standard deviation</h4>
              <p className="mt-1 text-sm text-slate-600">
                How spread out the scores are around the mean. A small SD means scores cluster
                tightly; a large SD means they're widely dispersed.
              </p>
            </Card>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            A concrete example: NAEP grade 4 math
          </h3>
          <p>
            The 2024 NAEP reports a national average scale score of about{" "}
            <strong className="text-slate-900">237</strong> for grade 4 math. That single number
            tells you where the center of the distribution sits, but it doesn't tell you how
            much variation there is across students.
          </p>
          <p>
            That's where the standard deviation comes in. NAEP scale scores typically have an SD
            around 28-30 points. This means that roughly two-thirds of grade 4 students scored
            between about 207 and 267, a 60-point range. The remaining third scored outside
            that range, some much higher, some much lower.
          </p>
          <p>
            When you see a state with an average of 245 and another at 230, the 15-point gap is
            real, but remember that within each state, individual students are spread across a
            wide range. A state average doesn't describe any single student.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Key takeaway:</strong> Always look at both the center (mean or median) and
              the spread (standard deviation) together. An average without a spread is only half
              the story.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Confidence Intervals ──────────── */}
      <section id="confidence-intervals" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 2" title="Confidence intervals" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Most education statistics come from <em>samples</em>, representative groups of
            students, not every student in the population. Because of this, any estimate
            (a mean score, a percentage, a difference) carries some uncertainty. A{" "}
            <strong className="text-slate-900">confidence interval</strong> quantifies that
            uncertainty.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What a 95% confidence interval actually means
          </h3>
          <p>
            If we repeated the same sampling process 100 times, drawing a new random sample from
            the same population each time and computing the interval each time, about 95 of those
            100 intervals would contain the true population value. It's a statement about the{" "}
            <em>procedure</em>, not about any single interval.
          </p>

          <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <p className="text-sm text-rose-800">
              <strong>Common misinterpretation:</strong> "There's a 95% chance the true value is
              in this interval." That sounds right, but it's subtly wrong. Once you've computed a
              specific interval, the true value is either in it or not. There's no probability
              about it. The 95% refers to how often the method succeeds across many repetitions,
              not to any single result.
            </p>
          </div>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Why this matters for NAEP and PISA
          </h3>
          <p>
            Suppose a new NAEP report shows that grade 8 math scores dropped by 3 points from the
            previous assessment. Is that a real decline? It depends on the confidence interval. If
            the margin of error is ±5 points, the true change could be anywhere from an 8-point
            drop to a 2-point gain. The 3-point decline, while the best estimate, is not
            distinguishable from no change at all.
          </p>
          <p>
            NAEP and PISA reports always include confidence intervals (sometimes written as
            "standard errors"; the interval is roughly the estimate ± 2 standard errors). When
            you see a score change or a gap between groups, check whether the confidence intervals
            overlap before drawing conclusions.
          </p>
        </div>
      </section>

      {/* ── Section 3: Statistical vs Practical Significance ── */}
      <section id="statistical-vs-practical" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 3"
          title="Statistical significance vs. practical significance"
          as="h2"
        />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            A finding is <strong className="text-slate-900">statistically significant</strong>{" "}
            when the data provides enough evidence that the observed difference (or relationship)
            is unlikely to be due to chance alone. Most studies use a threshold of{" "}
            <em>p &lt; .05</em>, meaning there's less than a 5% probability of seeing a result
            this extreme if there were actually no difference.
          </p>
          <p>
            But statistical significance does not tell you whether the difference is{" "}
            <strong className="text-slate-900">big enough to matter</strong>. With a large
            enough sample (and NAEP samples hundreds of thousands of students), even a tiny
            difference can be statistically significant. A 1-point difference on a 500-point
            scale might clear the significance threshold but make no practical difference in a
            classroom.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Effect sizes: Cohen's d
          </h3>
          <p>
            <strong className="text-slate-900">Effect size</strong> is the tool for measuring
            practical significance. The most common measure is{" "}
            <strong className="text-slate-900">Cohen's d</strong>, which expresses a difference
            in terms of standard deviations:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Cohen's d</th>
                  <th className="py-3 pr-4">Interpretation</th>
                  <th className="py-3">In plain terms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">~0.2</td>
                  <td className="py-3 pr-4 text-slate-600">Small</td>
                  <td className="py-3 text-slate-600">
                    Detectable with careful measurement, but hard to notice in practice.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">~0.5</td>
                  <td className="py-3 pr-4 text-slate-600">Medium</td>
                  <td className="py-3 text-slate-600">
                    A difference a teacher or student would likely notice.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">~0.8+</td>
                  <td className="py-3 pr-4 text-slate-600">Large</td>
                  <td className="py-3 text-slate-600">
                    A substantial, clearly visible difference.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            In education research, effect sizes of 0.3 to 0.5 are often considered meaningful for
            an intervention. If a study reports <em>p &lt; .001</em> but <em>d = 0.08</em>, the
            result is statistically significant but practically negligible. The intervention
            "worked" in a technical sense, but it didn't move the needle.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>Rule of thumb:</strong> Always look for both the p-value{" "}
              <em>and</em> the effect size. A significant p-value tells you the effect is real;
              the effect size tells you whether it's worth caring about.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 4: Correlation vs Causation ──────── */}
      <section id="correlation-vs-causation" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 4" title="Correlation vs. causation" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            This one sounds obvious in the abstract. Everyone has heard "correlation doesn't
            imply causation." But in practice, it's remarkably easy to slip into causal language
            when the data only shows an association.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            An example from PISA
          </h3>
          <p>
            Countries with higher education spending per student tend to have higher PISA math
            scores. That's a real correlation. But it doesn't mean that increasing spending will
            automatically raise scores. Why not?
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Confounding variables</h4>
              <p className="mt-1 text-sm text-slate-600">
                Wealthier countries tend to spend more on education <em>and</em> have other
                advantages: better teacher training, more stable institutions, lower child
                poverty. It could be those other factors driving the scores, not the spending
                itself.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Reverse causation</h4>
              <p className="mt-1 text-sm text-slate-600">
                Maybe countries that value education highly both spend more <em>and</em> produce
                higher-scoring students. The cultural value causes both, and neither one causes
                the other.
              </p>
            </Card>
          </div>

          <p>
            To establish causation, you generally need a controlled experiment or a strong
            quasi-experimental design (e.g., a natural experiment, regression discontinuity, or
            difference-in-differences). Observational data, which is what most large-scale
            assessment data is, can show patterns and generate hypotheses, but it can rarely
            prove that X causes Y.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>When reading research:</strong> Watch for language. "Is associated with,"
              "predicts," and "correlates with" describe relationships.
              "Causes," "leads to," and "results in" make causal claims that require much stronger
              evidence. If a study uses causal language with observational data, that's a red flag.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Sample Size ──────────────────── */}
      <section id="sample-size" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 5" title="Sample size and why it matters" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Larger samples produce more precise estimates. That's the fundamental principle.
            But in education data, sample size also determines what you're{" "}
            <em>allowed to report</em> and what level of detail is possible.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Why NAEP reports by state but not by school
          </h3>
          <p>
            NAEP is designed to produce reliable estimates at the national and state levels. The
            sampling plan ensures enough students are tested in each state to keep the margin of
            error manageable. But zoom in to a single school, and you might have only 20-30
            students in the sample, far too few for a stable estimate. The resulting confidence
            intervals would be so wide that the estimates would be essentially meaningless.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Small-cell suppression
          </h3>
          <p>
            When you work with education data broken down by demographics (race/ethnicity, disability
            status, English learner status, etc.), you'll encounter cells where the count drops below
            a threshold, typically fewer than 5 students. These cells are{" "}
            <strong className="text-slate-900">suppressed</strong>: the data is replaced with a
            symbol or removed entirely. This happens for two reasons:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <Badge tone="teal">Privacy</Badge>
              <p className="mt-3 text-sm text-slate-600">
                With only 3 or 4 students in a cell, it may be possible to identify individual
                students, especially in combination with other publicly available information.
                Suppression protects student privacy.
              </p>
            </Card>
            <Card>
              <Badge tone="primary">Reliability</Badge>
              <p className="mt-3 text-sm text-slate-600">
                An average of 3 scores is wildly unstable. Add or remove one student and the
                average changes dramatically. Estimates from cells this small are unreliable and
                shouldn't be interpreted.
              </p>
            </Card>
          </div>
          <p>
            When you encounter suppressed cells in a dataset, don't treat them as missing data to
            be filled in. They're suppressed because they <em>can't</em> be reported responsibly.
          </p>
        </div>
      </section>

      {/* ── Section 6: Inter-Rater Reliability ───────── */}
      <section id="inter-rater-reliability" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 6" title="Inter-rater reliability (kappa)" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Much of education research involves human judgment: coding student responses,
            categorizing teaching practices, scoring open-ended work. Whenever two people
            independently code the same material, you need to ask:{" "}
            <strong className="text-slate-900">how much do they agree?</strong>
          </p>
          <p>
            Simple percent agreement isn't enough because two coders will agree some percentage
            of the time by pure chance, especially if one category is much more common than
            others. <strong className="text-slate-900">Cohen's kappa (</strong>
            <span className="font-medium text-slate-900">{"κ"}</span>
            <strong className="text-slate-900">)</strong> corrects for this by measuring
            agreement <em>above and beyond</em> what chance alone would predict.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Kappa value</th>
                  <th className="py-3">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">&lt; 0.40</td>
                  <td className="py-3 text-slate-600">
                    Poor to fair agreement. The coding scheme may need revision.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">0.40 - 0.59</td>
                  <td className="py-3 text-slate-600">
                    Moderate. Some consistency, but too much disagreement for most purposes.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">0.60 - 0.69</td>
                  <td className="py-3 text-slate-600">
                    Substantial. Approaching acceptable, but may need further training or codebook
                    refinement.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">{"≥"} 0.70</td>
                  <td className="py-3 text-slate-600">
                    Good to excellent. Generally considered the minimum threshold for reliable
                    coding in education research.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-slate-900">{"≥"} 0.80</td>
                  <td className="py-3 text-slate-600">
                    Strong agreement. High confidence in the consistency of the coding.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            The <strong className="text-slate-900">{"κ ≥"} 0.70 threshold</strong> is
            widely used in education and social science research as the minimum standard. Below
            that, the disagreements between coders are large enough that the coded data may not
            be trustworthy. Different coders would produce different conclusions from the same
            material.
          </p>

          <div className="rounded-xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>Why this matters for OMI:</strong> The CAMEL project's annotation work
              (Deliverable D6) involves human coders categorizing mathematical problem-solving
              strategies. Establishing kappa {"≥"} 0.70 between coders is a required
              milestone. It ensures the resulting dataset is reliable enough for other
              researchers to use.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 7: Reading Published Research ───── */}
      <section id="reading-research" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 7"
          title="What these concepts mean for reading research"
          as="h2"
        />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            When you pick up a published paper, you'll encounter shorthand for these ideas. Here's
            a quick reference for the most common statistical claims and what questions to ask
            when you see them:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">When a paper says...</th>
                  <th className="py-3 pr-4">It means...</th>
                  <th className="py-3">Ask yourself...</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    <em>p &lt; .05</em>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    The result is statistically significant, unlikely to be due to chance alone.
                  </td>
                  <td className="py-3 text-slate-600">
                    But is the effect size large enough to matter? How big was the sample?
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    <em>{"κ"} = 0.72</em>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    Two coders agreed at an acceptable level beyond chance (above the 0.70
                    threshold).
                  </td>
                  <td className="py-3 text-slate-600">
                    How many items were coded? Were disagreements resolved or left as-is? Was
                    kappa computed per category or overall?
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    <em>d = 0.3</em>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    The difference between groups is about 0.3 standard deviations, a small to
                    medium effect.
                  </td>
                  <td className="py-3 text-slate-600">
                    Is this difference meaningful in context? For a low-cost intervention, d = 0.3
                    might be worth it; for an expensive one, maybe not.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    <em>r = 0.65</em>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    A moderately strong positive correlation between two variables.
                  </td>
                  <td className="py-3 text-slate-600">
                    Does the study claim causation? If so, is it an experiment or just
                    observational? What confounders might explain the relationship?
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    <em>95% CI [2.1, 4.8]</em>
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    The estimated value is somewhere between 2.1 and 4.8, with the method being
                    correct 95% of the time.
                  </td>
                  <td className="py-3 text-slate-600">
                    Is the interval narrow enough to be useful? Does it include zero (which would
                    mean no effect)?
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            You don't need to compute these yourself to benefit from understanding them. The goal
            is to be a critical reader: to know what questions a statistic answers and what
            questions it leaves open.
          </p>
        </div>
      </section>

      {/* ── Section 8: Next Steps ───────────────────── */}
      <section id="next-steps" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 8" title="Where to go next" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Now that you have the conceptual vocabulary, try applying it to real data:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Exploring Math Assessment Data
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                A Colab notebook that walks through descriptive statistics, trend plots, and
                clustering with the NAEP and PISA datasets. See the concepts from this page in
                action.
              </p>
              <a
                href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/01_exploring_math_data.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
              >
                Open in Colab →
              </a>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Comparing NAEP and PISA
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                What's comparable and what isn't across assessment systems: within-system trends,
                cross-system indexing, and a reference table of valid vs. invalid comparisons.
              </p>
              <a
                href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/02_comparing_naep_and_pisa.ipynb"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
              >
                Open in Colab →
              </a>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Researcher Guide</h4>
              <p className="mt-2 text-sm text-slate-600">
                The full guide to working with OMI data, including de-identification, data preparation,
                licensing, and contributing your own datasets.
              </p>
              <ButtonLink to="/researcher-guide" variant="outline" size="sm" className="mt-3">
                Researcher Guide →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Data Depot</h4>
              <p className="mt-2 text-sm text-slate-600">
                Browse the full catalog of openly licensed education datasets. Try computing
                descriptive statistics on a dataset that interests you.
              </p>
              <ButtonLink to="/data-depot" variant="outline" size="sm" className="mt-3">
                Open Data Depot →
              </ButtonLink>
            </Card>
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">Science of Learning for Math Data</h4>
              <p className="mt-2 text-sm text-slate-600">
                The cognitive theories that determine what we measure in student data, from
                productive struggle to the mathematical modeling cycle.
              </p>
              <ButtonLink to="/learning-center/science-of-learning" variant="outline" size="sm" className="mt-3">
                Science of Learning →
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Completion banner ─────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">You've got the foundations</h2>
        <p className="mt-2 text-teal-100">
          You can now read education research with a critical eye. You know what the numbers mean,
          what questions to ask, and when a finding is worth acting on.
        </p>
      </div>
    </div>
  );
}
