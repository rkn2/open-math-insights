import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

interface Step {
  label: string;
  detail: string;
}

interface UseCase {
  id: string;
  title: string;
  question: string;
  audience: "teacher" | "researcher";
  datasets: string[];
  tools: string[];
  steps: Step[];
  finding: string;
  caveat: string;
  notebookUrl?: string;
}

const USE_CASES: UseCase[] = [
  {
    id: "pandemic-recovery",
    title: "Investigating Post-Pandemic Score Recovery",
    question: "Did U.S. math scores recover between 2022 and 2024, and did the recovery look different across states?",
    audience: "researcher",
    datasets: ["NAEP Math Scale Scores (2003–2024)"],
    tools: ["Google Colab", "pandas", "matplotlib"],
    steps: [
      { label: "Frame the question", detail: "NAEP 2022 showed the largest single-cycle decline in math scores since the assessment began. The 2024 data is the first post-pandemic measurement. Did scores bounce back, and was recovery even across jurisdictions?" },
      { label: "Select data", detail: "Load the NAEP dataset from OMI's Data Depot. Filter to grade 4 and grade 8, national (NP) plus all five states. The key columns are year, grade, jurisdiction, and avg_scale_score." },
      { label: "Compute change scores", detail: "For each jurisdiction × grade combination, compute the 2019→2022 decline and the 2022→2024 change. A positive 2022→2024 change indicates recovery." },
      { label: "Visualize", detail: "Plot a grouped bar chart: 2019→2022 change (red) vs 2022→2024 change (green) for each jurisdiction. Add a horizontal line at zero. States above the line in 2022→2024 are recovering; below means continued decline." },
      { label: "Interpret", detail: "Compare the magnitude of recovery to the magnitude of decline. Did any state fully recover? Did grade 4 and grade 8 recover at different rates?" },
    ],
    finding: "Nationally, grade 4 showed a partial recovery (+2.4 points) after a −5.1 point decline, while grade 8's recovery was smaller. State-level patterns varied — Massachusetts recovered more strongly than the national average.",
    caveat: "NAEP is biennial and this dataset contains only aggregate scores. Individual student trajectories, the role of specific interventions, and within-district variation are not visible in this data.",
    notebookUrl: "https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/01_exploring_math_data.ipynb",
  },
  {
    id: "international-trends",
    title: "Are High-Performing Countries Declining?",
    question: "Are countries that scored well on PISA in the 2000s still scoring well, or is there convergence toward the mean?",
    audience: "researcher",
    datasets: ["PISA Math Scores (2003–2022)"],
    tools: ["Google Colab", "pandas", "scikit-learn"],
    steps: [
      { label: "Frame the question", detail: "Several high-performing PISA countries (Finland, Japan, Australia) have shown declining scores in recent cycles while some lower-scoring countries have improved. Is this a real trend toward convergence, or noise?" },
      { label: "Select data", detail: "Load the PISA dataset from OMI. Filter to countries with data in at least 4 PISA cycles to ensure enough data points for trend analysis." },
      { label: "Compute trajectories", detail: "For each country, compute the slope of a simple linear regression of score on year. Countries with negative slopes are declining; positive slopes are improving." },
      { label: "Cluster by trajectory", detail: "Use K-Means clustering (k=4) on the country × year pivot table to find natural groupings. Plot each cluster's mean trajectory with individual country lines faded behind." },
      { label: "Test for convergence", detail: "Compute the standard deviation of all country scores within each PISA cycle. If SD is shrinking over time, scores are converging. Plot SD by year." },
    ],
    finding: "The top-performing cluster (including Singapore, Japan, South Korea) shows a slight downward trajectory since 2012, while the bottom cluster shows modest improvement. Cross-country SD has narrowed slightly — suggestive of convergence, but the 2022 pandemic cycle makes the trend hard to disentangle from a global shock.",
    caveat: "PISA scores are country-level averages of 15-year-olds. They don't tell you about specific curricula, policies, or demographics driving the changes. The 2022 cycle was disrupted by COVID — interpretation of that data point requires extra caution.",
    notebookUrl: "https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/02_comparing_naep_and_pisa.ipynb",
  },
  {
    id: "classroom-data-literacy",
    title: "Teaching Data Literacy with Real Assessment Data",
    question: "How can a middle school teacher use NAEP state comparison data to teach students about averages, variation, and responsible data interpretation?",
    audience: "teacher",
    datasets: ["NAEP Math Scale Scores (2003–2024)"],
    tools: ["OMI Graphing Explorer", "printed charts"],
    steps: [
      { label: "Choose your angle", detail: "Use the NAEP dataset to compare your state to the national average over time. Students will see real data about students their age — that's more engaging than textbook examples." },
      { label: "Generate the chart", detail: "Use OMI's Graphing Explorer to plot your state vs. national for grade 8. Print or project the chart. Alternatively, have students open the Data Depot and look at the raw numbers." },
      { label: "Discuss 'average'", detail: "Ask: 'If Massachusetts averages 10 points above the national average, does that mean every student in MA scored higher?' This opens a conversation about distributions, variation, and what averages hide." },
      { label: "Look for the pandemic signal", detail: "Students will notice the 2022 dip. Ask them to generate hypotheses: 'Why might scores have dropped that year? What other data would you need to confirm your hypothesis?'" },
      { label: "Discuss responsible interpretation", detail: "Prompt: 'If a news article said your state is bad at math because of this data, would you agree? What's missing from the story?' This teaches critical evaluation of data claims." },
    ],
    finding: "Students engage more deeply with data about people like them. The pandemic dip is a natural hook for discussing confounding variables. The state-vs-national comparison teaches that 'above average' and 'below average' are relative, not absolute judgments.",
    caveat: "NAEP data is aggregate — it cannot identify individual students or schools. Remind students that these numbers represent thousands of peers, not a judgment on any one person or teacher.",
  },
];

const AUDIENCE_BADGE: Record<UseCase["audience"], { tone: "teal" | "primary"; label: string }> = {
  teacher: { tone: "teal", label: "For Teachers" },
  researcher: { tone: "primary", label: "For Researchers" },
};

export function UseCasesPage() {
  useDocumentTitle("Use Cases");
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Use Cases"
        title="Research question to finding, step by step"
        subtitle="Complete workflows showing how to use OMI datasets to answer real questions — from framing a question through data selection, analysis, and interpretation."
      />

      <div className="mt-12 space-y-16">
        {USE_CASES.map((uc, i) => (
          <article key={uc.id} id={uc.id} className="scroll-mt-24">
            <div className="flex flex-wrap items-start gap-3">
              <Badge tone={AUDIENCE_BADGE[uc.audience].tone}>
                {AUDIENCE_BADGE[uc.audience].label}
              </Badge>
              <span className="text-xs font-medium text-slate-400">Use Case {i + 1}</span>
            </div>
            <h2 className="mt-3 font-display text-xl font-bold text-slate-900">{uc.title}</h2>
            <p className="mt-2 text-sm font-medium italic text-slate-600">
              &ldquo;{uc.question}&rdquo;
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
              <span><strong className="text-slate-700">Data:</strong> {uc.datasets.join(", ")}</span>
              <span><strong className="text-slate-700">Tools:</strong> {uc.tools.join(", ")}</span>
            </div>

            <div className="mt-6 space-y-4">
              {uc.steps.map((step, j) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-700">
                    {j + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{step.label}</h4>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="mt-6 border-l-4 border-l-teal-500">
              <h4 className="text-sm font-bold text-slate-900">Finding</h4>
              <p className="mt-1 text-sm text-slate-600">{uc.finding}</p>
            </Card>

            <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700">Caveat</h4>
              <p className="mt-1 text-sm text-amber-800">{uc.caveat}</p>
            </div>

            {uc.notebookUrl && (
              <div className="mt-4">
                <a
                  href={uc.notebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Open related notebook in Colab →
                </a>
              </div>
            )}

            {i < USE_CASES.length - 1 && <hr className="mt-12 border-slate-100" />}
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-slate-50 p-10 text-center">
        <h2 className="font-display text-xl font-bold text-slate-900">Have a use case to share?</h2>
        <p className="mt-2 text-sm text-slate-600">
          If you've used OMI data for a research project or classroom activity, we'd love to feature
          your workflow here. Reach out through the Community page.
        </p>
        <ButtonLink to="/community" variant="outline" size="sm" className="mt-4">
          Community →
        </ButtonLink>
      </div>
    </div>
  );
}
