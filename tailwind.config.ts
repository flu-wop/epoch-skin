import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Epoch Luxury Palette ──
        cream:   { DEFAULT: "#F8F5F0", dark: "#F0EBE3", deeper: "#E8E0D5" },
        gold:    { DEFAULT: "#C9A84C", light: "#D4AF77", muted: "#E8D5A3", deep: "#A8862E" },
        sage:    { DEFAULT: "#5C6B5A", light: "#7A8C78", dark: "#3D4A3B" },
        ink:     { DEFAULT: "#1A1A18", soft: "#2C2C2A" },
        warm:    { grey: "#8A8580", lt: "#C4BFB8" },

        // ── shadcn ──
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary:     { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:   { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        accent:      { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        muted:       { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        card:        { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover:     { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },

        // ── Legacy (keep for backward compat) ──
        sage_legacy: {
          50: "#f6f7f6", 100: "#e3e7e3", 200: "#c7cfc7", 300: "#a3afa3",
          400: "#7d8c7d", 500: "#5f6f5f", 600: "#4a574a", 700: "#3d473d",
          800: "#333a33", 900: "#2b312b",
        },
        sand: {
          50: "#faf9f7", 100: "#f5f2ed", 200: "#e8e3d9",
          300: "#d9d1c1", 400: "#c8bda8", 500: "#b5a68f",
        },
        clay: {
          50: "#faf6f5", 100: "#f4ebe8", 200: "#e8d5d0",
          300: "#d9b8ad", 400: "#c79685", 500: "#b87968",
          600: "#a65e4d", 700: "#8a4d40",
        },
      },
      fontFamily: {
        serif:    ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans:     ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display:  ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
      boxShadow: {
        gold:    "0 8px 40px rgba(201,168,76,0.12)",
        "gold-lg": "0 16px 60px rgba(201,168,76,0.18)",
        luxury:  "0 4px 24px rgba(26,26,24,0.08)",
        "luxury-lg": "0 12px 48px rgba(26,26,24,0.12)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1400px" },
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.7s ease-out forwards",
        "fade-in":        "fade-in 0.6s ease-out forwards",
        shimmer:          "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
