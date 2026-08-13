import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDataset } from "@/hooks/useDataset";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Tabs } from "@/components/ui/Tabs";
import { EmptyState } from "@/components/ui/EmptyState";
import { DatasetMetadataTable } from "@/components/datasets/DatasetMetadataTable";
import { mockDatasets } from "@/data/mockDatasets";

function citationFor(dataset: {
  contributor: string;
  publishedDate: string;
  title: string;
  doi: string;
  citationText?: string;
}) {
  // Public-external datasets carry their real citation verbatim (from SOURCE.md) —
  // only the illustrative omi-consortium fixtures use this generated form, since
  // those really are (fictionally) published by Open Math Insights.
  if (dataset.citationText) return dataset.citationText;
  const year = new Date(dataset.publishedDate).getFullYear();
  return `${dataset.contributor} (${year}). "${dataset.title}." Open Math Insights [publisher], Dataset, doi:${dataset.doi}`;
}

function CopyCitation({ citation }: { citation: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">{citation}</p>
      <Button
        size="sm"
        variant="outline"
        className="mt-3"
        onClick={() => {
          navigator.clipboard?.writeText(citation).catch(() => undefined);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        {copied ? "Copied!" : "Copy citation"}
      </Button>
    </div>
  );
}

export function DatasetDetailPage() {
  const { datasetId = "" } = useParams<{ datasetId: string }>();
  const { dataset, loading, notFound } = useDataset(datasetId);

  if (!loading && (notFound || !dataset)) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
        <EmptyState
          title="Dataset not found"
          description="This dataset may have been renamed, unpublished, or the link is out of date."
          action={
            <Link to="/data-depot" className="font-semibold text-primary-600">
              Back to Data Depot →
            </Link>
          }
        />
      </div>
    );
  }

  if (!dataset) {
    return <div className="mx-auto max-w-7xl px-6 py-24 text-slate-400 lg:px-8">Loading dataset…</div>;
  }

  const related = mockDatasets.filter((d) => dataset.relatedDatasetIds.includes(d.id));

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      content: <p className="max-w-2xl text-sm leading-relaxed text-slate-700">{dataset.description}</p>,
    },
    {
      id: "files",
      label: "Files",
      content: (
        <div className="overflow-hidden rounded-xl border border-slate-100">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dataset.files.map((file) => (
                <tr key={file.name}>
                  <td className="px-4 py-3 font-medium text-slate-800">{file.name}</td>
                  <td className="px-4 py-3 text-slate-500">{file.type}</td>
                  <td className="px-4 py-3 text-slate-500">{file.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="border-t border-slate-100 bg-slate-50 px-4 py-2.5 text-xs text-slate-400">
            Downloads are disabled in this demo — this table mirrors the real Data Depot's file
            listing UI.
          </p>
        </div>
      ),
    },
    {
      id: "metadata",
      label: "Metadata",
      content: <DatasetMetadataTable dataset={dataset} />,
    },
    {
      id: "citation",
      label: "Citation",
      content: <CopyCitation citation={citationFor(dataset)} />,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Data Depot", to: "/data-depot" },
          { label: dataset.title },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          {dataset.sourceType === "public-external" && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700 ring-1 ring-inset ring-teal-200">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Verified public dataset — downloaded from a real external source
            </div>
          )}
          {dataset.sourceType === "community-contributed" && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-coral-600 ring-1 ring-inset ring-orange-200">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-1a4 4 0 0 0-3-3.87M9 20H4v-1a4 4 0 0 1 3-3.87m5-4.13a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0 4c-3.31 0-6 1.34-6 3v1h12v-1c0-1.66-2.69-3-6-3Z" />
              </svg>
              Community contributed — submitted and reviewed through the OMI contribution workflow
            </div>
          )}
          <div className="flex flex-wrap gap-1.5">
            {dataset.gradeBands.map((gb) => (
              <Badge key={gb} tone="primary">
                Grades {gb}
              </Badge>
            ))}
            {dataset.topics.map((t) => (
              <Badge key={t} tone="teal">
                {t}
              </Badge>
            ))}
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 sm:text-4xl">
            {dataset.title}
          </h1>
          <p className="mt-3 text-lg text-slate-600">{dataset.summary}</p>

          <div className="mt-8">
            <Tabs items={tabs} />
          </div>
        </div>

        <aside className="space-y-6">
          <Card>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">License</p>
            <div className="mt-2">
              <Badge tone="amber">{dataset.license}</Badge>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Files
            </p>
            <p className="mt-1 text-sm text-slate-700">
              {dataset.fileCount} files · {dataset.totalSize}
            </p>
          </Card>

          {related.length > 0 && (
            <Card>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Related datasets
              </p>
              <ul className="mt-3 space-y-2.5">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      to={`/data-depot/${r.id}`}
                      className="text-sm font-semibold text-primary-700 hover:underline"
                    >
                      {r.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
