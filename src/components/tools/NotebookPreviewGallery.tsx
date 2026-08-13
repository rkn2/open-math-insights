import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface PreviewEntry {
  file: string;
  title: string;
  description: string;
}

const PREVIEWS: PreviewEntry[] = [
  {
    file: "00_getting_started.html",
    title: "Getting Started",
    description: "Orientation: what's on disk, and a first look at real data.",
  },
  {
    file: "01_naep_and_pisa_trends.html",
    title: "NAEP & PISA Trends",
    description: "U.S. national/state and international math score trends.",
  },
  {
    file: "02_assistments_knowledge_tracing.html",
    title: "ASSISTments Knowledge Tracing",
    description: "Correctness by skill and hint-usage over 525k real tutoring rows.",
  },
  {
    file: "03_naep_state_comparison.html",
    title: "NAEP State Comparison",
    description: "Which states are above/below the national average, and by how much.",
  },
  {
    file: "04_assistments_learning_curves.html",
    title: "Learning Curves",
    description: "Does correctness improve with practice? A classic EDM analysis.",
  },
];

/**
 * Static, pre-rendered notebook output (see local-jupyter/render-previews.mjs) —
 * real charts from real data, viewable with zero compute: no Jupyter bridge,
 * no JupyterLite, nothing running. Works identically on the deployed
 * CloudFront site.
 */
export function NotebookPreviewGallery() {
  const [active, setActive] = useState<PreviewEntry | null>(null);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PREVIEWS.map((preview) => (
          <Card key={preview.file} hover className="flex flex-col">
            <Badge tone="teal">Static preview</Badge>
            <h3 className="mt-3 font-display text-base font-bold text-slate-900">
              {preview.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-600">{preview.description}</p>
            <button
              type="button"
              onClick={() => setActive(preview)}
              className="mt-4 self-start text-sm font-semibold text-primary-600 hover:underline"
            >
              Open preview →
            </button>
          </Card>
        ))}
      </div>

      {active && (
        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-xl bg-slate-900 px-4 py-2.5 text-sm text-slate-200">
            <span className="font-semibold">{active.title} — static preview</span>
            <div className="flex items-center gap-3">
              <a
                href={`/notebook-previews/${active.file}`}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-primary-300 hover:text-primary-200"
              >
                Open in new tab ↗
              </a>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="text-slate-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
          <iframe
            title={active.title}
            src={`/notebook-previews/${active.file}`}
            className="h-[720px] w-full rounded-b-xl border border-t-0 border-slate-800 bg-white"
          />
        </div>
      )}
    </div>
  );
}
