import { useEffect, useState } from "react";
import type { StatsResponse } from "@/shared/types";
import { api } from "@/lib/api";
import { mockStats } from "@/data/mockDatasets";

export function useStats(): { stats: StatsResponse; loading: boolean } {
  const [stats, setStats] = useState<StatsResponse>(mockStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    api
      .get<StatsResponse>("/stats")
      .then((res) => {
        if (!cancelled) setStats(res);
      })
      .catch(() => {
        if (!cancelled) setStats(mockStats);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { stats, loading };
}
