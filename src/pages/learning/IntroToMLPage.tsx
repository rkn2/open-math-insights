import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";

const SECTIONS = [
  { id: "what-is-ml", label: "1. What is machine learning?" },
  { id: "supervised-unsupervised", label: "2. Supervised vs. unsupervised" },
  { id: "cluster-analysis", label: "3. Cluster analysis (K-Means)" },
  { id: "classification", label: "4. Classification" },
  { id: "feature-importance", label: "5. Feature importance" },
  { id: "can-and-cant", label: "6. What ML can & can't do" },
  { id: "when-not-to-use", label: "7. When NOT to use ML" },
  { id: "next-steps", label: "8. Try it yourself" },
];

export function IntroToMLPage() {
  useDocumentTitle("Intro to Machine Learning for Education Data");

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Learning Center", to: "/learning-center" },
          { label: "Intro to Machine Learning" },
        ]}
      />

      <div className="mt-6">
        <SectionHeading
          eyebrow="For Researchers"
          title="Intro to Machine Learning for Education Data"
          subtitle="A conceptual introduction to ML techniques that are relevant to education research. It covers what they do, when they are useful, and what they cannot tell you. No coding required; links to hands-on notebooks at the end."
        />
      </div>

      {/* Course outline navigation */}
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

      {/* ── Section 1: What is ML? ─────────────────────── */}
      <section id="what-is-ml" className="mt-16 scroll-mt-24">
        <SectionHeading eyebrow="Section 1" title="What is machine learning?" as="h2" />
        <div className="mt-4 max-w-none space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Machine learning is a family of techniques for{" "}
            <strong className="text-slate-900">
              finding patterns in data that are too complex for a human to specify as explicit rules
            </strong>
            . Instead of writing a rule like "if the student got fewer than 60% correct, flag them
            as struggling," you give the algorithm many examples and let it learn what combinations
            of variables predict the outcome.
          </p>
          <p>
            It is not magic, and it is not sentient. At its core, ML is{" "}
            <strong className="text-slate-900">pattern matching at scale</strong>, the same kind of
            pattern recognition you do when you read student work, but applied to thousands or
            millions of data points at once.
          </p>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-display text-sm font-bold text-slate-900">
              A useful analogy for education researchers
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              Think of how an experienced teacher develops intuitions about which students need
              intervention. They notice patterns across many students over many years. ML does
              something similar, but with explicit data instead of tacit knowledge, and at a
              scale no single teacher could match. The tradeoff is that ML sees the numbers but not the
              context. A teacher sees both.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 2: Supervised vs. unsupervised ─────── */}
      <section id="supervised-unsupervised" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 2"
          title="Supervised vs. unsupervised learning"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Most ML techniques fall into one of two families, defined by whether or not you give the
            algorithm labeled examples to learn from.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Supervised learning</h4>
              <p className="mt-2 text-sm text-slate-600">
                You provide the algorithm with <strong>labeled examples</strong>, data where you
                already know the answer. For instance: "this student response is{" "}
                <em>productive struggle</em>, this one is <em>unproductive</em>." The algorithm
                learns to predict the label for new, unseen data.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Examples: classification, regression, prediction.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Unsupervised learning</h4>
              <p className="mt-2 text-sm text-slate-600">
                You give the algorithm data with <strong>no labels</strong>, no "right answers,"
                and it finds natural groupings or structure on its own. You don't tell it what to
                look for; it discovers patterns in how the data points relate to each other.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Examples: clustering, dimensionality reduction, topic modeling.
              </p>
            </Card>
          </div>
          <p>
            Education research uses both. Supervised learning is common when you have coded data
            (human-labeled rubric scores, correct/incorrect flags). Unsupervised learning is
            useful when you want to explore, to ask "what groups naturally exist in this data?"
            before imposing your own categories.
          </p>
        </div>
      </section>

      {/* ── Section 3: Cluster analysis ────────────────── */}
      <section id="cluster-analysis" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 3" title="Cluster analysis (K-Means)" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Cluster analysis is an unsupervised technique that{" "}
            <strong className="text-slate-900">
              groups data points based on similarity
            </strong>
            . K-Means, the most common variant, works by choosing <em>k</em> center points and
            assigning each data point to its nearest center, then iterating until the groups
            stabilize.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What it's useful for in education
          </h3>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong className="text-slate-900">Finding groups of countries with similar
              assessment trajectories</strong>, e.g., which countries show similar patterns of
              change in PISA math scores over time?
            </li>
            <li>
              <strong className="text-slate-900">Identifying student learning profiles</strong>,{" "}
              grouping students by combinations of behavior (time on task, hint usage, accuracy)
              rather than by a single measure.
            </li>
            <li>
              <strong className="text-slate-900">Exploratory analysis before hypothesis
              testing</strong>, discovering structure in data before committing to a specific
              research question.
            </li>
          </ul>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            What it can't tell you
          </h3>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <ul className="ml-5 list-disc space-y-2 text-sm text-amber-800">
              <li>
                <strong>Why the clusters exist.</strong> K-Means finds groups; it does not explain
                them. Interpretation is your job as the researcher.
              </li>
              <li>
                <strong>Whether the grouping is meaningful.</strong> K-Means will always produce
                <em> k</em> clusters, even if the data has no natural grouping. You need to
                evaluate whether the clusters make substantive sense.
              </li>
              <li>
                <strong>The "right" number of clusters.</strong> Choosing <em>k</em> requires
                judgment. Techniques like the elbow method or silhouette scores can help, but
                they don't replace domain expertise.
              </li>
            </ul>
          </div>

          <p>
            The{" "}
            <a
              href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/01_exploring_math_data.ipynb"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-600 hover:text-primary-800 hover:underline"
            >
              Exploring Math Assessment Data notebook
            </a>{" "}
            on OMI includes a worked clustering example using PISA data, a good place to see
            K-Means applied to real education data.
          </p>
        </div>
      </section>

      {/* ── Section 4: Classification ──────────────────── */}
      <section id="classification" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 4" title="Classification" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Classification is a supervised technique:{" "}
            <strong className="text-slate-900">
              given labeled training data, predict which category a new observation belongs to
            </strong>
            . In education research, common classification tasks include predicting whether a
            student response shows productive vs. unproductive struggle, whether an answer is
            correct vs. incorrect, or whether a student is at risk of dropping a course.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Common algorithms
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h4 className="font-display font-bold text-slate-900">Decision trees</h4>
              <p className="mt-2 text-sm text-slate-600">
                A series of yes/no questions about the data, organized as a tree. Easy to
                interpret (you can read the decision rules directly) but a single tree is
                often too simple to capture complex patterns.
              </p>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-slate-900">Random forests</h4>
              <p className="mt-2 text-sm text-slate-600">
                Many decision trees trained on random subsets of the data, whose predictions are
                combined by majority vote. More accurate than a single tree, and resistant to
                overfitting, but harder to interpret because you're reading an ensemble, not a
                single tree.
              </p>
            </Card>
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h4 className="font-display text-sm font-bold text-slate-900">
              In practice: the CAMEL project's proof-of-concept classifier
            </h4>
            <p className="mt-2 text-sm text-slate-600">
              The CAMEL project (Collaborative Annotation for Math Education Learning) built a
              proof-of-concept classifier as part of its deliverable D8 that does exactly this:
              given features of student interactions with a math tutoring system (correctness
              history, hint usage, time spent), it predicts productive vs. unproductive struggle.
              This is a concrete example of classification applied to a real education research
              question.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 5: Feature importance ──────────────── */}
      <section id="feature-importance" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 5" title="Feature importance" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Feature importance techniques measure how much each input variable
            contributes to the model's accuracy.
          </p>

          <h3 className="mt-6 font-display text-base font-bold text-slate-900">
            Why this matters for education research
          </h3>
          <p>
            Suppose you're predicting math mastery from tutoring log data. Feature importance
            can tell you whether <strong className="text-slate-900">prior correctness</strong>,{" "}
            <strong className="text-slate-900">time spent per problem</strong>, or{" "}
            <strong className="text-slate-900">hint usage</strong> is the strongest predictor.
            This doesn't establish causation, but it tells you where to look, and it can
            challenge assumptions about what drives learning outcomes.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Technique</th>
                  <th className="py-3 pr-4">How it works</th>
                  <th className="py-3">Tradeoffs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    Gini importance
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    Measures how much each feature reduces impurity (mixing of classes) across all
                    splits in a tree or forest.
                  </td>
                  <td className="py-3 text-slate-600">
                    Fast, built into most tree-based models. Can be biased toward high-cardinality
                    features.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    Permutation importance
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    Randomly shuffles one feature at a time and measures how much accuracy drops.
                    If shuffling a feature hurts accuracy a lot, it was important.
                  </td>
                  <td className="py-3 text-slate-600">
                    Model-agnostic. Works with any algorithm. Slower, and can underestimate
                    importance of correlated features.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    SHAP values
                  </td>
                  <td className="py-3 pr-4 text-slate-600">
                    Computes the marginal contribution of each feature for each individual
                    prediction, grounded in game theory.
                  </td>
                  <td className="py-3 text-slate-600">
                    Most informative. Explains individual predictions, not just global trends.
                    Computationally expensive for large datasets.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-sm text-amber-800">
              <strong>A critical caveat:</strong> Feature importance tells you what predicts an
              outcome, not what causes it. A feature can be highly important for prediction
              because it's a proxy for something else entirely. Always pair importance results
              with domain knowledge and, where possible, causal research designs.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 6: What ML can & can't do ──────────── */}
      <section id="can-and-cant" className="mt-20 scroll-mt-24">
        <SectionHeading
          eyebrow="Section 6"
          title="What ML can and can't do in education research"
          as="h2"
        />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <h4 className="font-display font-bold text-teal-700">What ML can do</h4>
              <ul className="mt-3 ml-5 list-disc space-y-2 text-sm text-slate-600">
                <li>
                  <strong className="text-slate-900">Find patterns humans miss.</strong>{" "}
                  Interactions between variables, nonlinear relationships, subtle subgroups. ML
                  can surface structure in data that would be invisible in summary statistics.
                </li>
                <li>
                  <strong className="text-slate-900">Process scale humans can't.</strong>{" "}
                  Analyzing hundreds of thousands of student interactions, classifying millions
                  of text responses, scanning national assessment trends across decades.
                </li>
                <li>
                  <strong className="text-slate-900">Generate hypotheses.</strong> Exploratory ML
                  (e.g., clustering) can reveal groupings you didn't know to look for, guiding
                  your next study design.
                </li>
              </ul>
            </Card>
            <Card>
              <h4 className="font-display font-bold text-red-700">What ML can't do</h4>
              <ul className="mt-3 ml-5 list-disc space-y-2 text-sm text-slate-600">
                <li>
                  <strong className="text-slate-900">Establish causation.</strong> ML finds
                  correlations and predictive relationships. It cannot tell you whether X causes
                  Y. That requires experimental or quasi-experimental designs.
                </li>
                <li>
                  <strong className="text-slate-900">Be better than its training data.</strong>{" "}
                  A model trained on biased data will reproduce those biases. A model trained on
                  data from one population may not generalize to another.
                </li>
                <li>
                  <strong className="text-slate-900">Encode bias it doesn't have.</strong>{" "}
                  Conversely, ML can <em>amplify</em> existing biases in historical data.
                  Patterns of inequity become patterns of prediction.
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Section 7: When NOT to use ML ──────────────── */}
      <section id="when-not-to-use" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 7" title="When NOT to use ML" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            ML is not always the right tool. Here are situations where simpler methods are
            better:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="py-3 pr-4">Situation</th>
                  <th className="py-3">Why ML is overkill (or worse)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">Small datasets</td>
                  <td className="py-3 text-slate-600">
                    ML algorithms need enough data to learn patterns reliably. With 30 students
                    or 50 observations, a t-test or ANOVA will give you more trustworthy results
                    than a random forest.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    A simple average answers the question
                  </td>
                  <td className="py-3 text-slate-600">
                    If you want to know "did scores go up?", compute the mean difference.
                    Deploying a model to answer a question that descriptive statistics handle
                    adds complexity without adding insight.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    Stakes require interpretability
                  </td>
                  <td className="py-3 text-slate-600">
                    If the result will influence student placement, resource allocation, or policy,
                    stakeholders need to understand <em>why</em> a prediction was made. A
                    logistic regression with three clear predictors may be preferable to a more
                    accurate but opaque neural network.
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-3 pr-4 font-medium text-slate-900">
                    You need causal claims
                  </td>
                  <td className="py-3 text-slate-600">
                    If the research question is "does this intervention cause better outcomes?",
                    ML prediction is the wrong tool. You need an experimental design, not a
                    pattern-matching algorithm.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The best use of ML in education research is often{" "}
            <strong className="text-slate-900">complementary</strong>. Use ML to find patterns
            and generate hypotheses, then use traditional statistical methods or experimental
            designs to test them.
          </p>
        </div>
      </section>

      {/* ── Section 8: Try it yourself ─────────────────── */}
      <section id="next-steps" className="mt-20 scroll-mt-24">
        <SectionHeading eyebrow="Section 8" title="Try it yourself" as="h2" />
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            The best way to build intuition for these techniques is to see them applied to real
            data. Here's where to start:
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Card hover>
              <h4 className="font-display font-bold text-slate-900">
                Notebook: Exploring Math Data
              </h4>
              <p className="mt-2 text-sm text-slate-600">
                Descriptive statistics, trend plotting, and a K-Means clustering analysis using
                PISA data, a hands-on introduction to the techniques covered in Sections 1-3.
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
              <h4 className="font-display font-bold text-slate-900">Browse the Data Depot</h4>
              <p className="mt-2 text-sm text-slate-600">
                Explore the datasets available on OMI, including the ASSISTments tutoring data,
                which is the kind of student-level interaction data used in classification and
                feature importance work.
              </p>
              <ButtonLink to="/data-depot" variant="outline" size="sm" className="mt-4">
                Open Data Depot
              </ButtonLink>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Summary banner ─────────────────────────────── */}
      <div className="mt-16 rounded-3xl bg-gradient-to-br from-teal-600 to-primary-700 px-8 py-10 text-center text-white">
        <h2 className="font-display text-2xl font-bold">Key takeaway</h2>
        <p className="mt-2 text-teal-100">
          Machine learning finds patterns at scale. It complements, but does not replace,
          domain expertise, causal inference, and careful research design.
        </p>
      </div>
    </div>
  );
}
