import type { DatasetSummary } from "@/shared/types";
import { DatasetCard } from "@/components/datasets/DatasetCard";
import { EmptyState } from "@/components/ui/EmptyState";

export function DatasetGrid({ datasets }: { datasets: DatasetSummary[] }) {
  if (datasets.length === 0) {
    return (
      <EmptyState
        title="No datasets match your filters"
        description="Try clearing a filter or searching a different keyword — new datasets are added regularly."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {datasets.map((dataset) => (
        <DatasetCard key={dataset.id} dataset={dataset} />
      ))}
    </div>
  );
}
