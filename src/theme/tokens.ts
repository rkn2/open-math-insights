/**
 * Plain-JS mirrors of the Tailwind color tokens (see tailwind.config.ts), for the
 * rare spot where we need a raw hex value in inline styles or an SVG rather than
 * a Tailwind class — e.g. gradient defs, chart colors down the line.
 */
export const colors = {
  primary: {
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    900: "#312e81",
  },
  teal: {
    500: "#14b8a6",
    600: "#0d9488",
  },
  amber: {
    400: "#fbbf24",
    500: "#f59e0b",
  },
  coral: {
    500: "#f97316",
  },
  slate: {
    50: "#f8fafc",
    600: "#475569",
    900: "#0f172a",
  },
} as const;

export const fonts = {
  display: "Sora, ui-sans-serif, system-ui, sans-serif",
  body: "Inter, ui-sans-serif, system-ui, sans-serif",
} as const;
