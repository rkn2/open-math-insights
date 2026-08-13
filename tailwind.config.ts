import type { Config } from "tailwindcss";

/**
 * OMI visual system: a "modern & bold" data-product look — deliberately not the
 * dense, dated government-research aesthetic of the site this is modeled after.
 * Indigo primary + teal secondary + amber accent, on warm slate neutrals.
 */
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        amber: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
        },
        coral: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        soft: "0 8px 30px -8px rgba(49, 46, 129, 0.18)",
        card: "0 2px 8px -2px rgba(30, 27, 75, 0.10), 0 1px 2px rgba(30, 27, 75, 0.06)",
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(at 15% 20%, rgba(99, 102, 241, 0.35) 0px, transparent 55%), radial-gradient(at 85% 15%, rgba(20, 184, 166, 0.30) 0px, transparent 55%), radial-gradient(at 70% 80%, rgba(249, 115, 22, 0.20) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(99, 102, 241, 0.18) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
