import { useState } from "react";
import { alignToStandards, type StandardMatch } from "@/lib/standardsAligner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const SAMPLE_TEXT =
  "A recipe calls for 2 1/2 cups of flour to make 3 dozen cookies. What is the unit rate of flour per dozen, and how many cups are needed for 5 dozen cookies?";

function MatchRow({ match }: { match: StandardMatch }) {
  const pct = Math.round(match.score * 100);
  return (
    <li className="py-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <span className="font-mono text-sm font-bold text-primary-700">{match.standard.code}</span>{" "}
          <span className="text-sm text-slate-700">{match.standard.title}</span>
        </div>
        <Badge tone="teal">{match.standard.domain}</Badge>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="h-1.5 flex-1 rounded-full bg-slate-100">
          <div className="h-1.5 rounded-full bg-primary-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="w-10 text-right text-xs font-semibold text-slate-500">{pct}%</span>
      </div>
      <p className="mt-1.5 text-xs text-slate-500">
        Matched: {match.matchedKeywords.map((k) => `"${k}"`).join(", ")}
      </p>
    </li>
  );
}

export function StandardsAlignerTool() {
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<StandardMatch[] | null>(null);

  function handleAlign(input: string) {
    setText(input);
    setMatches(alignToStandards(input));
  }

  return (
    <div>
      <p className="text-sm text-slate-600">
        Paste a math problem or item's text below. This runs entirely in your browser — a real
        keyword-overlap match against a Common-Core-style standards dictionary, not a network
        call.
      </p>
      <textarea
        value={text}
        onChange={(e) => handleAlign(e.target.value)}
        rows={4}
        placeholder="Paste problem text here…"
        className="mt-3 w-full rounded-xl border border-slate-200 p-3 text-sm text-slate-800 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100"
      />
      <div className="mt-2 flex items-center gap-3">
        <Button size="sm" variant="outline" onClick={() => handleAlign(SAMPLE_TEXT)}>
          Try a sample problem
        </Button>
        {text && (
          <button
            type="button"
            onClick={() => handleAlign("")}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {matches && (
        <div className="mt-5">
          {matches.length === 0 ? (
            <p className="text-sm text-slate-500">
              No standard matched — try including more specific math vocabulary (e.g. "fraction",
              "unit rate", "slope", "probability").
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {matches.map((m) => (
                <MatchRow key={m.standard.code} match={m} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
