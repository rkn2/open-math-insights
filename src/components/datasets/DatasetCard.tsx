import { Link } from "react-router-dom";
import type { DatasetSummary } from "@/shared/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function DatasetCard({ dataset }: { dataset: DatasetSummary }) {
  return (
    <Link to={`/data-depot/${dataset.id}`} className="block h-full">
      <Card hover className="flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-primary-500">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6c0-1.1 3.58-2 8-2s8 .9 8 2-3.58 2-8 2-8-.9-8-2Zm0 0v12c0 1.1 3.58 2 8 2s8-.9 8-2V6M4 12c0 1.1 3.58 2 8 2s8-.9 8-2" />
            </svg>
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Dataset
            </span>
          </div>
          {dataset.sourceType === "public-external" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-teal-700 ring-1 ring-inset ring-teal-200">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Verified public dataset
            </span>
          )}
          {dataset.sourceType === "community-contributed" && (
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[11px] font-semibold text-coral-600 ring-1 ring-inset ring-orange-200">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 0 0-3-3.87M9 20H4v-1a4 4 0 0 1 3-3.87m5-4.13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 4c-3.31 0-6 1.34-6 3v1h12v-1c0-1.66-2.69-3-6-3Z" />
              </svg>
              Community contributed
            </span>
          )}
        </div>

        <h3 className="font-display text-lg font-bold leading-snug text-slate-900">
          {dataset.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-slate-600">{dataset.summary}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {dataset.gradeBands.map((gb) => (
            <Badge key={gb} tone="primary">
              Grades {gb}
            </Badge>
          ))}
          {dataset.topics.map((topic) => (
            <Badge key={topic} tone="teal">
              {topic}
            </Badge>
          ))}
          <Badge tone="amber">{dataset.license}</Badge>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-400">
          <span>
            {dataset.fileCount} file{dataset.fileCount === 1 ? "" : "s"} · {dataset.totalSize}
          </span>
          <span className="font-semibold text-primary-600">View dataset →</span>
        </div>
      </Card>
    </Link>
  );
}
