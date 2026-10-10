import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core cinematic dark palette (see src/data/profile.ts for semantic usage)
        ink: {
          DEFAULT: "#08090D", // almost-black charcoal background
          900: "#08090D",
          800: "#0B0D13",
          700: "#10121B", // deep midnight secondary background
          600: "#161925",
          500: "#1D2130",
        },
        cloud: {
          DEFAULT: "#F5F5F7", // warm white primary text
          muted: "#A2A5B3", // muted cool gray secondary text
          dim: "#6B6F80",
        },
        violet: {
          DEFAULT: "#8B5CF6", // primary accent - electric violet
          soft: "#A78BFA",
          deep: "#6D28D9",
        },
        sky: {
          DEFAULT: "#38BDF8", // secondary accent - vivid blue
          soft: "#7DD3FC",
          deep: "#0EA5E9",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Fluid editorial scale
        "fluid-sm": "clamp(0.875rem, 0.82rem + 0.3vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.95rem + 0.3vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.6vw, 1.375rem)",
        "fluid-xl": "clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)",
        "fluid-2xl": "clamp(2rem, 1.4rem + 2.8vw, 3.5rem)",
        "fluid-3xl": "clamp(2.5rem, 1.6rem + 5vw, 6rem)",
        "fluid-hero": "clamp(2.25rem, 1rem + 6.8vw, 7rem)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(139, 92, 246, 0.45)",
        "glow-sky": "0 0 80px -20px rgba(56, 189, 248, 0.4)",
        card: "0 24px 60px -30px rgba(0, 0, 0, 0.8)",
        "inner-hairline": "inset 0 0 0 1px rgba(255,255,255,0.06)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgba(8,9,13,0.9)), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        "violet-sky":
          "linear-gradient(135deg, #8B5CF6 0%, #38BDF8 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "drift-slow": {
          "0%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%, -3%, 0) scale(1.05)" },
          "100%": { transform: "translate3d(0,0,0) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "drift-slow": "drift-slow 18s ease-in-out infinite",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
