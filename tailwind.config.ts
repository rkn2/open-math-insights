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
          50: "#eff5ff",
          100: "#dbe8fe",
          200: "#bfd4fe",
          300: "#93b4fd",
          400: "#6090fa",
          500: "#3b6cf6",
          600: "#1e4eeb",
          700: "#1a3fd8",
          800: "#1c34af",
          900: "#1c318a",
          950: "#152154",
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
        soft: "0 8px 30px -8px rgba(28, 49, 138, 0.18)",
        card: "0 2px 8px -2px rgba(21, 33, 84, 0.10), 0 1px 2px rgba(21, 33, 84, 0.06)",
      },
      backgroundImage: {
        "mesh-hero":
          "radial-gradient(at 15% 20%, rgba(59, 108, 246, 0.35) 0px, transparent 55%), radial-gradient(at 85% 15%, rgba(20, 184, 166, 0.30) 0px, transparent 55%), radial-gradient(at 70% 80%, rgba(249, 115, 22, 0.20) 0px, transparent 50%), radial-gradient(at 10% 90%, rgba(30, 78, 235, 0.18) 0px, transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
