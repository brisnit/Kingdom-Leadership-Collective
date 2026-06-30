import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    // Monochrome palette with a single restrained accent: the crest's gold.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#0A0A0A",
      white: "#FFFFFF",
      // A few near-monochrome tones for thin rules and subtle surfaces.
      ink: {
        DEFAULT: "#0A0A0A",
        soft: "#171717",
        muted: "#3F3F3F",
      },
      paper: {
        DEFAULT: "#FFFFFF",
        soft: "#F5F4F1",
        muted: "#EAE8E3",
      },
      line: {
        light: "#E4E2DD",
        dark: "#2A2A2A",
      },
      // Sampled from the KLC crest trim. Used only as a thin, deliberate
      // accent — never as a fill.
      gold: {
        DEFAULT: "#B89A5E",
        deep: "#977C46",
        soft: "#CDB88A",
      },
    },
    extend: {
      // Global border radius set to 0 — sharp corners everywhere.
      borderRadius: {
        none: "0",
        sm: "0",
        DEFAULT: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        micro: "0.28em",
        wider2: "0.18em",
      },
      maxWidth: {
        editorial: "76rem",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
