import { useEffect, useState } from "react";
import type { Dataset } from "@/shared/types";
import { api } from "@/lib/api";
import { mockDatasets } from "@/data/mockDatasets";

interface UseDatasetResult {
  dataset: Dataset | undefined;
  loading: boolean;
  notFound: boolean;
}

export function useDataset(datasetId: string): UseDatasetResult {
  const [dataset, setDataset] = useState<Dataset | undefined>(
    () => mockDatasets.find((d) => d.id === datasetId),
  );
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);
    api
      .get<Dataset>(`/datasets/${encodeURIComponent(datasetId)}`)
      .then((res) => {
        if (cancelled) return;
        setDataset(res);
      })
      .catch(() => {
        if (cancelled) return;
        const fallback = mockDatasets.find((d) => d.id === datasetId);
        setDataset(fallback);
        setNotFound(!fallback);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [datasetId]);

  return { dataset, loading, notFound };
}
