import { useEffect, useState } from "react";
import type { DatasetListResponse, DatasetSummary } from "@/shared/types";
import { api } from "@/lib/api";
import { mockDatasetSummaries } from "@/data/mockDatasets";

interface UseDatasetsResult {
  datasets: DatasetSummary[];
  loading: boolean;
  usingFallback: boolean;
}

export function useDatasets(): UseDatasetsResult {
  const [datasets, setDatasets] = useState<DatasetSummary[]>(mockDatasetSummaries);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get<DatasetListResponse>("/datasets")
      .then((res) => {
        if (cancelled) return;
        setDatasets(res.datasets);
        setUsingFallback(false);
      })
      .catch(() => {
        if (cancelled) return;
        setDatasets(mockDatasetSummaries);
        setUsingFallback(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { datasets, loading, usingFallback };
}
