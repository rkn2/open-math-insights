// Moved to shared/src/csv.ts so the postInsightsChat Lambda can parse the
// exact same NAEP/PISA CSVs with the exact same logic (see its doc comment).
// Re-exported here so existing frontend imports (@/lib/csv) don't need to change.
export { parseCsv } from "@/shared/csv";
