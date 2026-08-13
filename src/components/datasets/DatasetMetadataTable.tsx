import type { ReactNode } from "react";
import type { Dataset } from "@/shared/types";
import { Badge } from "@/components/ui/Badge";

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-slate-100 py-3 sm:grid-cols-3 sm:gap-4">
      <div className="text-sm font-semibold text-slate-500">{label}</div>
      <div className="col-span-2 text-sm text-slate-800">{children}</div>
    </div>
  );
}

export function DatasetMetadataTable({ dataset }: { dataset: Dataset }) {
  return (
    <div>
      <Row label="Grade bands">
        <div className="flex flex-wrap gap-1.5">
          {dataset.gradeBands.map((gb) => (
            <Badge key={gb} tone="primary">
              Grades {gb}
            </Badge>
          ))}
        </div>
      </Row>
      <Row label="Topics / standards">
        <div className="flex flex-wrap gap-1.5">
          {dataset.topics.map((topic) => (
            <Badge key={topic} tone="teal">
              {topic}
            </Badge>
          ))}
        </div>
      </Row>
      <Row label="License">
        <Badge tone="amber">{dataset.license}</Badge>
      </Row>
      <Row label="PII review status">
        {dataset.piiReviewStatus === "reviewed-no-pii" ? (
          <span className="inline-flex items-center gap-1.5 font-semibold text-teal-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Reviewed — No PII
          </span>
        ) : (
          <span className="font-semibold text-amber-600">Pending review</span>
        )}
      </Row>
      <Row label="Contributor">{dataset.contributor}</Row>
      <Row label="Published">
        {new Date(dataset.publishedDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Row>
      <Row label="DOI">
        <code className="rounded bg-slate-50 px-2 py-0.5 text-xs">{dataset.doi}</code>
      </Row>
      {dataset.sourceType === "public-external" && dataset.sourceUrl && (
        <Row label="Original source">
          <a
            href={dataset.sourceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 font-semibold text-primary-600 hover:underline"
          >
            View the real, publicly hosted dataset ↗
          </a>
        </Row>
      )}
    </div>
  );
}
