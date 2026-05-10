import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pageBackground: "#E6E8EA",
        surfaceLight: "#F4F5F5",
        surfaceWhite: "#FFFFFF",
        primaryBlack: "#0A0A0A",
        textSecondary: "#6A6D70",
        borderSoft: "#D7DADD"
      },
      fontFamily: {
        display: ["Space Grotesk", "Inter", "sans-serif"],
        body: ["Inter", "Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "IBM Plex Mono", "monospace"]
      }
    }
  },
  plugins: []
} satisfies Config;
