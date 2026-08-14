/**
 * Minimal dependency-free CSV parser — deliberately not a general-purpose CSV
 * library. Every real file this is used against (naep_math_scale_scores.csv,
 * pisa_math_scores.csv) is plain comma-separated with no quoted or
 * embedded-comma fields (verified when they were downloaded — see their
 * SOURCE.md files), so a straight split is correct and sufficient.
 */
export function parseCsv(text: string): Record<string, string>[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length === 0) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const cells = line.split(",");
    const row: Record<string, string> = {};
    headers.forEach((header, i) => {
      row[header] = (cells[i] ?? "").trim();
    });
    return row;
  });
}

/** A numeric column's summary — real, computed stats, never invented. */
export interface CsvNumericColumnStats {
  column: string;
  min: number;
  max: number;
  avg: number;
}

export interface CsvSummaryStats {
  rowCount: number;
  columns: string[];
  numericColumnStats: CsvNumericColumnStats[];
}

/**
 * Computes real summary stats from parsed CSV rows — used to ground the AI
 * insights chat in actual numbers instead of letting the model guess. A
 * column is treated as numeric only if EVERY row's value parses as a finite
 * number; otherwise it's left out of numericColumnStats entirely (e.g. a
 * jurisdiction code column like "CA"/"NY" is correctly excluded).
 */
export function summarizeCsvRows(rows: Record<string, string>[]): CsvSummaryStats {
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];
  const numericColumnStats: CsvNumericColumnStats[] = [];

  for (const column of columns) {
    const values: number[] = [];
    let allNumeric = rows.length > 0;
    for (const row of rows) {
      const n = Number(row[column]);
      if (row[column] === "" || !Number.isFinite(n)) {
        allNumeric = false;
        break;
      }
      values.push(n);
    }
    if (allNumeric && values.length > 0) {
      numericColumnStats.push({
        column,
        min: Math.min(...values),
        max: Math.max(...values),
        avg: values.reduce((a, b) => a + b, 0) / values.length,
      });
    }
  }

  return { rowCount: rows.length, columns, numericColumnStats };
}
