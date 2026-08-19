import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          dark: "#090a0f",
          light: "#f8fafc",
        },
        surface: {
          dark: {
            50: "#1e2230",
            100: "#141722",
            200: "#0f111a",
            300: "#090a0f",
          },
          light: {
            50: "#ffffff",
            100: "#f8fafc",
            200: "#f1f5f9",
            300: "#e2e8f0",
          },
        },
        brand: {
          green: "#16a34a",
          greenHover: "#15803d",
          greenLight: "#22c55e",
          orange: "#f97316",
          orangeHover: "#ea580c",
          orangeLight: "#ffedd5",
        },
      },
      fontFamily: {
        sans: ["var(--font-ubuntu)", "sans-serif"],
        display: ["var(--font-ubuntu)", "sans-serif"],
        spray: ["var(--font-rubik-spray)", "cursive"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        "glow-green": "0 0 25px rgba(34, 197, 94, 0.25)",
        "glow-orange": "0 0 25px rgba(249, 115, 22, 0.25)",
        "card-light": "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        "card-dark": "0 10px 30px -5px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
