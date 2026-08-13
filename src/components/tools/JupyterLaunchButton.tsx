import { useState } from "react";
import type { JupyterLaunchResponse } from "@/shared/types";
import { api } from "@/lib/api";
import { JUPYTER_BRIDGE_URL } from "@/config";
import { Button } from "@/components/ui/Button";

type LaunchState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "live"; url: string }
  | { phase: "stub"; response: JupyterLaunchResponse };

const FALLBACK_RESPONSE: JupyterLaunchResponse = {
  status: "unavailable",
  sessionId: "local-demo",
  message:
    "This demo isn't wired to a live backend yet — in production, this button provisions a notebook environment via the Accessible Compute API.",
};

/**
 * Tries the local Jupyter bridge first (see local-jupyter/bridge-server.mjs and
 * README.md's "Run a real local Jupyter environment") — a real JupyterLab
 * process running on this machine. Only falls back to the AWS mock API's
 * canned stub response when the bridge isn't running/configured, so the
 * deployed-with-no-local-Jupyter demo path still works honestly.
 */
async function launchRealJupyter(): Promise<string | undefined> {
  if (!JUPYTER_BRIDGE_URL) return undefined;
  try {
    const res = await fetch(`${JUPYTER_BRIDGE_URL}/launch`, {
      method: "POST",
      signal: AbortSignal.timeout(30_000),
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { url?: string };
    return data.url;
  } catch {
    return undefined;
  }
}

export function JupyterLaunchButton() {
  const [state, setState] = useState<LaunchState>({ phase: "idle" });

  async function handleLaunch() {
    setState({ phase: "loading" });

    const liveUrl = await launchRealJupyter();
    if (liveUrl) {
      setState({ phase: "live", url: liveUrl });
      return;
    }

    try {
      const response = await api.post<JupyterLaunchResponse>("/jupyter/launch");
      setState({ phase: "stub", response });
    } catch {
      setState({ phase: "stub", response: FALLBACK_RESPONSE });
    }
  }

  if (state.phase === "live") {
    return (
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-t-xl bg-slate-900 px-4 py-2.5 text-sm text-slate-200">
          <span className="inline-flex items-center gap-2 font-semibold text-teal-300">
            <span className="h-2 w-2 rounded-full bg-teal-400" />
            Live — a real JupyterLab is running on your machine
          </span>
          <div className="flex items-center gap-3">
            <a
              href={state.url}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-primary-300 hover:text-primary-200"
            >
              Open in new tab ↗
            </a>
            <button
              type="button"
              onClick={() => setState({ phase: "idle" })}
              className="text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
        <iframe
          title="OMI Jupyter Sandbox"
          src={state.url}
          className="h-[720px] w-full rounded-b-xl border border-t-0 border-slate-800"
        />
      </div>
    );
  }

  if (state.phase === "stub") {
    return (
      <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800 ring-1 ring-inset ring-amber-200">
        <p className="font-semibold">
          {state.response.status === "pending" ? "Session pending" : "Not connected yet"}
        </p>
        <p className="mt-1">{state.response.message}</p>
        {!JUPYTER_BRIDGE_URL && (
          <p className="mt-2 text-xs text-amber-700">
            Running this locally? Start a real JupyterLab with <code>npm run bridge</code> — see
            README.md.
          </p>
        )}
      </div>
    );
  }

  return (
    <Button onClick={handleLaunch} disabled={state.phase === "loading"} size="lg">
      {state.phase === "loading" ? "Launching…" : "Launch OMI Jupyter Sandbox"}
    </Button>
  );
}
