import { useState } from "react";
import { Button } from "@/components/ui/Button";

const JUPYTERLITE_URL = "/jupyterlite/lab/index.html?path=01_naep_and_pisa_trends.ipynb";

/**
 * A real Python kernel running entirely in the browser via Pyodide/WebAssembly
 * (JupyterLite — see local-jupyter/jupyterlite/ and `npm run build:jupyterlite`).
 * No server, no bridge, works identically on the deployed CloudFront site —
 * this is the one "Use OMI" tool that doesn't depend on anything local.
 */
export function JupyterLiteEmbed() {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-xl bg-slate-900 px-4 py-2.5 text-sm text-slate-200">
          <span className="inline-flex items-center gap-2 font-semibold text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            Real Python, running in this tab (first load can take a few seconds)
          </span>
          <button type="button" onClick={() => setOpen(false)} className="text-slate-400 hover:text-white">
            Close
          </button>
        </div>
        <iframe
          title="OMI in-browser Python (JupyterLite)"
          src={JUPYTERLITE_URL}
          className="h-[720px] w-full rounded-b-xl border border-t-0 border-slate-800"
        />
      </div>
    );
  }

  return (
    <Button onClick={() => setOpen(true)} size="lg">
      Launch in-browser Python
    </Button>
  );
}
