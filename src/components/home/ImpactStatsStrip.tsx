import { useStats } from "@/hooks/useStats";
import { StatTile } from "@/components/ui/StatTile";

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function ImpactStatsStrip() {
  const { stats, loading } = useStats();

  return (
    <section className="bg-gradient-to-r from-primary-700 to-teal-700">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatTile value={`${formatNumber(stats.datasetCount)}+`} label="Open datasets" loading={loading} />
          <StatTile value={`${formatNumber(stats.recordCount)}+`} label="Problem & response records" loading={loading} />
          <StatTile value={stats.dataStored} label="Data stored" loading={loading} />
          <StatTile value={`${stats.contributingDistricts}`} label="Contributing districts" loading={loading} />
        </div>
      </div>
    </section>
  );
}
