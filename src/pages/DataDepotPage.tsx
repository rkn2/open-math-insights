import { useMemo, useCallback } from "react";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { useSearchParams } from "react-router-dom";
import type { GradeBand, DatasetLicense } from "@/shared/types";
import { useDatasets } from "@/hooks/useDatasets";
import { DatasetFilterBar } from "@/components/datasets/DatasetFilterBar";
import { DatasetGrid } from "@/components/datasets/DatasetGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function DataDepotPage() {
  useDocumentTitle("Data Depot");
  const { datasets, loading } = useDatasets();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q") ?? "";
  const gradeBand = (searchParams.get("grade") as GradeBand | null) ?? "all";
  const topic = searchParams.get("topic") ?? "all";
  const license = (searchParams.get("license") as DatasetLicense | null) ?? "all";

  /** Update one param while preserving the others; delete param when value is falsy or "all". */
  const setParam = useCallback(
    (key: string, value: string) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (!value || value === "all") {
          next.delete(key);
        } else {
          next.set(key, value);
        }
        return next;
      });
    },
    [setSearchParams],
  );

  const availableTopics = useMemo(
    () => Array.from(new Set(datasets.flatMap((d) => d.topics))).sort(),
    [datasets],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return datasets.filter((d) => {
      if (q && !d.title.toLowerCase().includes(q) && !d.summary.toLowerCase().includes(q)) {
        return false;
      }
      if (gradeBand !== "all" && !d.gradeBands.includes(gradeBand)) return false;
      if (topic !== "all" && !d.topics.includes(topic)) return false;
      if (license !== "all" && d.license !== license) return false;
      return true;
    });
  }, [datasets, search, gradeBand, topic, license]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeading
        eyebrow="Data Depot"
        title="Open K-12 math datasets, ready to use"
        subtitle="Every dataset here is openly licensed, tagged with grade band and topic metadata, and reviewed for PII before it's published. See our data policy on the About page."
      />

      <div className="mt-8">
        <DatasetFilterBar
          search={search}
          onSearchChange={(v) => setParam("q", v)}
          gradeBand={gradeBand}
          onGradeBandChange={(v) => setParam("grade", v)}
          topic={topic}
          onTopicChange={(v) => setParam("topic", v)}
          license={license}
          onLicenseChange={(v) => setParam("license", v)}
          availableTopics={availableTopics}
        />
      </div>

      <p className="mt-6 text-sm text-slate-500">
        {loading ? "Loading datasets…" : `${filtered.length} of ${datasets.length} datasets`}
      </p>

      <div className="mt-4">
        <DatasetGrid datasets={filtered} />
      </div>
    </div>
  );
}
