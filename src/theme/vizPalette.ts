/**
 * Categorical chart palette for OMI's data-viz tools (Graphing Explorer, etc.).
 *
 * Derived from the site's brand hues (indigo, teal, amber) plus additional
 * hues to reach 8 categorical slots, validated with the dataviz skill's
 * `validate_palette.js` against a white chart surface:
 *
 *   node scripts/validate_palette.js \
 *     "#4f46e5,#0d9488,#d97706,#e11d48,#7c3aed,#16a34a,#0284c7,#ea580c" \
 *     --mode light --surface "#ffffff"
 *   → ALL CHECKS PASS (lightness band, chroma floor, CVD ΔE min 31.3, contrast)
 *
 * Fixed order — never cycle or reassign a slot based on selection order for a
 * small, stable entity set (see GraphingExplorer's NAEP jurisdiction mapping).
 * For a large, dynamically-selected entity set (e.g. PISA's ~90 countries),
 * slots are assigned on first selection and cached so a series keeps its
 * color even if other series are added/removed around it.
 */
export const CATEGORICAL_PALETTE = [
  "#4f46e5", // 1 indigo — brand primary
  "#0d9488", // 2 teal — brand secondary
  "#d97706", // 3 amber — brand accent
  "#e11d48", // 4 rose
  "#7c3aed", // 5 violet
  "#16a34a", // 6 green
  "#0284c7", // 7 sky
  "#ea580c", // 8 orange
] as const;

export const CHART_INK = {
  primary: "#0f172a", // slate-900
  secondary: "#475569", // slate-600
  muted: "#94a3b8", // slate-400
  gridline: "#e2e8f0", // slate-200
} as const;
