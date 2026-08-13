import { useEffect, useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { parseCsv } from "@/lib/csv";
import { CATEGORICAL_PALETTE, CHART_INK } from "@/theme/vizPalette";

type Mode = "naep" | "pisa";

interface NaepRow {
  year: number;
  grade: number;
  jurisdiction: string;
  jurisdiction_label: string;
  avg_scale_score: number;
}

interface PisaRow {
  entity: string;
  year: number;
  pisa_math_all_average: number;
}

// Fixed color per jurisdiction — a small, stable entity set, so identity never
// repaints when the selection changes (see theme/vizPalette.ts).
const JURISDICTION_COLOR: Record<string, string> = {
  NP: CATEGORICAL_PALETTE[0],
  CA: CATEGORICAL_PALETTE[1],
  TX: CATEGORICAL_PALETTE[2],
  NY: CATEGORICAL_PALETTE[3],
  MA: CATEGORICAL_PALETTE[4],
  FL: CATEGORICAL_PALETTE[5],
};
const JURISDICTIONS = ["NP", "CA", "TX", "NY", "MA", "FL"];

const DEFAULT_COUNTRIES = ["United States", "Finland", "Singapore", "South Korea", "Canada", "Japan"];

function useCsvData<T>(path: string, mapRow: (row: Record<string, string>) => T): T[] {
  const [data, setData] = useState<T[]>([]);
  useEffect(() => {
    let cancelled = false;
    fetch(path)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        setData(parseCsv(text).map(mapRow));
      })
      .catch(() => setData([]));
    return () => {
      cancelled = true;
    };
    // mapRow is stable per-call-site (defined inline at each usage below).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  return data;
}

function Checkbox({
  checked,
  onChange,
  label,
  color,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  color?: string;
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-1.5 text-sm text-slate-700">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span
        className="flex h-4 w-4 items-center justify-center rounded border-2"
        style={{
          borderColor: color ?? "#94a3b8",
          backgroundColor: checked ? (color ?? "#94a3b8") : "transparent",
        }}
      >
        {checked && (
          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {label}
    </label>
  );
}

export function GraphingExplorer() {
  const [mode, setMode] = useState<Mode>("naep");
  const [showTable, setShowTable] = useState(false);

  const naepRows = useCsvData<NaepRow>(`${import.meta.env.BASE_URL}data/naep_math_scale_scores.csv`, (r) => ({
    year: Number(r.year),
    grade: Number(r.grade),
    jurisdiction: r.jurisdiction,
    jurisdiction_label: r.jurisdiction_label,
    avg_scale_score: Number(r.avg_scale_score),
  }));
  const pisaRows = useCsvData<PisaRow>(`${import.meta.env.BASE_URL}data/pisa_math_scores.csv`, (r) => ({
    entity: r.entity,
    year: Number(r.year),
    pisa_math_all_average: Number(r.pisa_math_all_average),
  }));

  const [grade, setGrade] = useState<4 | 8>(8);
  const [selectedJurisdictions, setSelectedJurisdictions] = useState<string[]>(JURISDICTIONS);

  const availableCountries = useMemo(
    () => Array.from(new Set(pisaRows.map((r) => r.entity))).sort(),
    [pisaRows],
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>(DEFAULT_COUNTRIES);
  const countryColorRef = useRef<Map<string, string>>(new Map());

  function colorForCountry(country: string): string {
    const cache = countryColorRef.current;
    const existing = cache.get(country);
    if (existing) return existing;
    const used = new Set(cache.values());
    const next = CATEGORICAL_PALETTE.find((c) => !used.has(c)) ?? CATEGORICAL_PALETTE[cache.size % CATEGORICAL_PALETTE.length];
    cache.set(country, next);
    return next;
  }

  const naepChartData = useMemo(() => {
    const years = Array.from(new Set(naepRows.filter((r) => r.grade === grade).map((r) => r.year))).sort();
    return years.map((year) => {
      const point: Record<string, number> = { year };
      for (const juris of selectedJurisdictions) {
        const row = naepRows.find((r) => r.grade === grade && r.year === year && r.jurisdiction === juris);
        if (row) point[juris] = row.avg_scale_score;
      }
      return point;
    });
  }, [naepRows, grade, selectedJurisdictions]);

  const pisaChartData = useMemo(() => {
    const years = Array.from(new Set(pisaRows.map((r) => r.year))).sort();
    return years.map((year) => {
      const point: Record<string, number> = { year };
      for (const country of selectedCountries) {
        const row = pisaRows.find((r) => r.year === year && r.entity === country);
        if (row) point[country] = row.pisa_math_all_average;
      }
      return point;
    });
  }, [pisaRows, selectedCountries]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {(["naep", "pisa"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              mode === m ? "bg-primary-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {m === "naep" ? "NAEP (U.S.)" : "PISA (International)"}
          </button>
        ))}
      </div>

      {mode === "naep" ? (
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            {[4, 8].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGrade(g as 4 | 8)}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                  grade === g ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                Grade {g}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {JURISDICTIONS.map((juris) => (
              <Checkbox
                key={juris}
                label={juris}
                color={JURISDICTION_COLOR[juris]}
                checked={selectedJurisdictions.includes(juris)}
                onChange={() =>
                  setSelectedJurisdictions((prev) =>
                    prev.includes(juris) ? prev.filter((j) => j !== juris) : [...prev, juris],
                  )
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {availableCountries.length === 0 ? (
            <span className="text-sm text-slate-400">Loading countries…</span>
          ) : (
            DEFAULT_COUNTRIES.concat(availableCountries.filter((c) => !DEFAULT_COUNTRIES.includes(c)).slice(0, 6)).map(
              (country) => (
                <Checkbox
                  key={country}
                  label={country}
                  color={colorForCountry(country)}
                  checked={selectedCountries.includes(country)}
                  onChange={() =>
                    setSelectedCountries((prev) =>
                      prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country],
                    )
                  }
                />
              ),
            )
          )}
        </div>
      )}

      <div className="mt-6 h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mode === "naep" ? naepChartData : pisaChartData} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid stroke={CHART_INK.gridline} strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="year"
              tick={{ fill: CHART_INK.muted, fontSize: 12 }}
              axisLine={{ stroke: CHART_INK.gridline }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: CHART_INK.muted, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={mode === "naep" ? ["auto", "auto"] : [300, 600]}
              label={{
                value: mode === "naep" ? "Avg. scale score" : "Avg. PISA math score",
                angle: -90,
                position: "insideLeft",
                style: { fill: CHART_INK.secondary, fontSize: 12 },
              }}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, borderColor: CHART_INK.gridline, fontSize: 13 }}
              labelStyle={{ color: CHART_INK.primary, fontWeight: 600 }}
            />
            <Legend wrapperStyle={{ fontSize: 13 }} />
            {mode === "naep"
              ? selectedJurisdictions.map((juris) => (
                  <Line
                    key={juris}
                    type="monotone"
                    dataKey={juris}
                    name={juris}
                    stroke={JURISDICTION_COLOR[juris]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    connectNulls
                  />
                ))
              : selectedCountries.map((country) => (
                  <Line
                    key={country}
                    type="monotone"
                    dataKey={country}
                    name={country}
                    stroke={colorForCountry(country)}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    connectNulls
                  />
                ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button
        type="button"
        onClick={() => setShowTable((v) => !v)}
        className="mt-2 text-xs font-semibold text-primary-600 hover:underline"
      >
        {showTable ? "Hide data table" : "View as table"}
      </button>

      {showTable && (
        <div className="mt-3 max-h-64 overflow-auto rounded-xl border border-slate-100">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-3 py-2">Year</th>
                {(mode === "naep" ? selectedJurisdictions : selectedCountries).map((key) => (
                  <th key={key} className="px-3 py-2">
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(mode === "naep" ? naepChartData : pisaChartData).map((row) => (
                <tr key={row.year}>
                  <td className="px-3 py-1.5 font-medium text-slate-700">{row.year}</td>
                  {(mode === "naep" ? selectedJurisdictions : selectedCountries).map((key) => (
                    <td key={key} className="px-3 py-1.5 text-slate-600">
                      {row[key] !== undefined ? row[key].toFixed(1) : "—"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
