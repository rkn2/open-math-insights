import { lazy, Suspense, useState } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ToolCard } from "@/components/tools/ToolCard";
import { JupyterLaunchButton } from "@/components/tools/JupyterLaunchButton";
import { NotebookPreviewGallery } from "@/components/tools/NotebookPreviewGallery";
import { StandardsAlignerTool } from "@/components/tools/StandardsAlignerTool";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button, ButtonLink } from "@/components/ui/Button";

// recharts (pulled in by GraphingExplorer) is the single biggest dependency in
// this app — lazy-load it so its ~180KB+ doesn't sit in the main bundle for
// every visitor who never opens this tool.
const GraphingExplorer = lazy(() =>
  import("@/components/tools/GraphingExplorer").then((m) => ({ default: m.GraphingExplorer })),
);

const ICON_PROPS = { fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 } as const;

type OpenTool = "graphing-explorer" | "standards-aligner" | null;

const TOOLS: {
  key: OpenTool;
  name: string;
  description: string;
  status: "available" | "coming-soon";
  icon: React.ReactNode;
  /** For cards that link to a full page rather than expanding inline. */
  href?: string;
}[] = [
  {
    key: "graphing-explorer",
    name: "Graphing Explorer",
    description: "A real, in-browser plotting tool over live NAEP & PISA data — no install, no backend.",
    status: "available",
    icon: (
      <svg className="h-6 w-6" {...ICON_PROPS}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 19l5-9 4 5 4-8 3 5M4 19h16" />
      </svg>
    ),
  },
  {
    key: "standards-aligner",
    name: "Standards Aligner",
    description: "Paste a problem or item's text and get back ranked CCSS-style standard matches.",
    status: "available",
    icon: (
      <svg className="h-6 w-6" {...ICON_PROPS}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0 1.946-.806 3.42 3.42 0 0 1 4.438 0 3.42 3.42 0 0 0 1.946.806 3.42 3.42 0 0 1 3.138 3.138 3.42 3.42 0 0 0 .806 1.946 3.42 3.42 0 0 1 0 4.438 3.42 3.42 0 0 0-.806 1.946 3.42 3.42 0 0 1-3.138 3.138 3.42 3.42 0 0 0-1.946.806 3.42 3.42 0 0 1-4.438 0 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1 0-4.438 3.42 3.42 0 0 0 .806-1.946 3.42 3.42 0 0 1 3.138-3.138Z" />
      </svg>
    ),
  },
  {
    key: null,
    name: "Classroom Data Uploader",
    description: "A teacher-facing tool for contributing anonymized classroom data — real metadata, PII, and standards checks, reviewed by a human before anything is published.",
    status: "available",
    href: "/about",
    icon: (
      <svg className="h-6 w-6" {...ICON_PROPS}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
    ),
  },
];

const TOOL_TITLES: Record<Exclude<OpenTool, null>, string> = {
  "graphing-explorer": "Graphing Explorer",
  "standards-aligner": "Standards Aligner",
};

const STEPS = [
  { title: "Launch", description: "Open a notebook or tool directly in your browser — no local setup." },
  { title: "Explore", description: "Work with real, openly licensed math data using familiar tools like pandas and matplotlib." },
  { title: "Stay safe", description: "No data leaves the platform, and nothing you touch here was ever tied to a real student." },
];

export function UseOmiPage() {
  useDocumentTitle("Use OMI");
  const [openTool, setOpenTool] = useState<OpenTool>(null);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Use OMI · Accessible Compute"
        title="Tools to explore, analyze, and learn from open math data"
        subtitle="No installs required — everything here runs in your browser, backed by lightweight, cost-conscious infrastructure."
      />

      <div className="mt-10 rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 to-teal-50 p-8 sm:p-10">
        <div>
          <Badge tone="primary">Featured</Badge>
          <h2 className="mt-3 font-display text-2xl font-bold text-slate-900">
            OMI Jupyter Sandbox
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            pandas, numpy, and matplotlib preloaded, with starter notebooks built around real,
            downloaded Data Depot datasets (NAEP, PISA, and ASSISTments). Running this locally
            with <code className="rounded bg-white/60 px-1">npm run bridge</code> launches an
            actual JupyterLab process on your machine — otherwise you'll see an honest "not
            connected" stub, since there's no live provisioning backend deployed yet.
          </p>
        </div>
        <div className="mt-6">
          <JupyterLaunchButton />
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-teal-100 bg-gradient-to-br from-teal-50 to-amber-50 p-8 sm:p-10">
        <div>
          <Badge tone="teal">Works everywhere — no setup</Badge>
          <h2 className="mt-3 font-display text-2xl font-bold text-slate-900">
            Runnable notebooks on Google Colab
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Starter notebooks that load real Data Depot datasets and walk through exploratory
            analysis, trend visualization, and cross-dataset comparison — running on Google
            Colab with pandas, matplotlib, and scikit-learn pre-installed. No local setup required.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/01_exploring_math_data.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
          >
            Exploring Math Data →
          </a>
          <a
            href="https://colab.research.google.com/github/rkn2/open-math-insights/blob/main/notebooks/02_comparing_naep_and_pisa.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
          >
            Comparing NAEP & PISA →
          </a>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          eyebrow="No compute needed"
          title="Static notebook previews"
          subtitle="Real charts from real data, pre-rendered — viewable even with no Jupyter running at all, on this site or the deployed one."
        />
        <div className="mt-8">
          <NotebookPreviewGallery />
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading eyebrow="More tools" title="Tools & apps" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.name}
              icon={tool.icon}
              name={tool.name}
              description={tool.description}
              status={tool.status}
              footer={
                tool.href ? (
                  <ButtonLink to={tool.href} size="sm" variant="outline">
                    Go to tool →
                  </ButtonLink>
                ) : (
                  tool.key && (
                    <Button
                      size="sm"
                      variant={openTool === tool.key ? "secondary" : "outline"}
                      onClick={() => setOpenTool(openTool === tool.key ? null : tool.key)}
                    >
                      {openTool === tool.key ? "Hide tool" : "Try it →"}
                    </Button>
                  )
                )
              }
            />
          ))}
        </div>

        {openTool && (
          <Card className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-slate-900">
                {TOOL_TITLES[openTool]}
              </h3>
              <button
                type="button"
                onClick={() => setOpenTool(null)}
                className="text-sm font-semibold text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>
            {openTool === "graphing-explorer" && (
              <Suspense fallback={<p className="text-sm text-slate-400">Loading chart tool…</p>}>
                <GraphingExplorer />
              </Suspense>
            )}
            {openTool === "standards-aligner" && <StandardsAlignerTool />}
          </Card>
        )}
      </div>

      <div className="mt-20 rounded-3xl bg-slate-50 p-10">
        <SectionHeading eyebrow="How compute works here" title="Accessible by design" align="center" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-8 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary-600 font-display font-bold text-white">
                {i + 1}
              </div>
              <h3 className="mt-4 font-display font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
