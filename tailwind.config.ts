// tailwind.config.ts
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
      // ── Colors ───────────────────────────────────────────────
      colors: {
        // Epoch palette
        parchment: { 50:"#FDFBF8", 100:"#FAF7F2", 200:"#F5F0E8", 300:"#EDE6D8", 400:"#E5DCCF" },
        gold:  { 50:"#FDF9EF", 100:"#F9EDCF", 200:"#F0D898", 300:"#E5BF62", 400:"#D4AF88", 500:"#C9A96E", 600:"#B8924A", 700:"#96762E" },
        sage:  { 50:"#F3F5F2", 100:"#E4E9E2", 200:"#C8D3C5", 300:"#A3B39F", 400:"#7A9174", 500:"#5F6F5A", 600:"#4A5745", 700:"#3B4537" },
        ink:   { DEFAULT:"#1C1C1A", soft:"#2E2E2C", mid:"#5A5550", muted:"#8C8680", pale:"#C0BAB4" },

        // ── Legacy compat — keeps old pages from throwing errors ──
        clay:    { 50:"#faf6f5",100:"#f4ebe8",200:"#e8d5d0",300:"#d9b8ad",400:"#c79685",500:"#b87968",600:"#a65e4d",700:"#8a4d40" },
        sand:    { 50:"#faf9f7",100:"#f5f2ed",200:"#e8e3d9",300:"#d9d1c1",400:"#c8bda8",500:"#b5a68f" },
        neutral: { 50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917" },
        sage_legacy: { 50:"#f6f7f6",100:"#e3e7e3",200:"#c7cfc7",300:"#a3afa3",400:"#7d8c7d",500:"#5f6f5f",600:"#4a574a",700:"#3d473d",800:"#333a33",900:"#2b312b" },

        // shadcn
        border:      "hsl(var(--border))",
        input:       "hsl(var(--input))",
        ring:        "hsl(var(--ring))",
        background:  "hsl(var(--background))",
        foreground:  "hsl(var(--foreground))",
        primary:     { DEFAULT:"hsl(var(--primary))", foreground:"hsl(var(--primary-foreground))" },
        secondary:   { DEFAULT:"hsl(var(--secondary))", foreground:"hsl(var(--secondary-foreground))" },
        accent:      { DEFAULT:"hsl(var(--accent))", foreground:"hsl(var(--accent-foreground))" },
        muted:       { DEFAULT:"hsl(var(--muted))", foreground:"hsl(var(--muted-foreground))" },
        destructive: { DEFAULT:"hsl(var(--destructive))", foreground:"hsl(var(--destructive-foreground))" },
        card:        { DEFAULT:"hsl(var(--card))", foreground:"hsl(var(--card-foreground))" },
        popover:     { DEFAULT:"hsl(var(--popover))", foreground:"hsl(var(--popover-foreground))" },
      },

      // ── Typography ───────────────────────────────────────────
      fontFamily: {
        serif:   ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
      },

      // ── Shadows ──────────────────────────────────────────────
      boxShadow: {
        gold:       "0 4px 24px rgba(201,169,110,0.18)",
        "gold-lg":  "0 12px 48px rgba(201,169,110,0.24)",
        card:       "0 2px 16px rgba(28,28,26,0.06)",
        "card-lg":  "0 8px 40px rgba(28,28,26,0.10)",
        luxury:     "0 1px 3px rgba(28,28,26,0.04), 0 8px 32px rgba(28,28,26,0.08)",
      },

      // ── Max widths ───────────────────────────────────────────
      maxWidth: {
        site:  "1320px",
        prose: "68ch",
      },

      // ── Transitions ──────────────────────────────────────────
      transitionDuration: { "400": "400ms" },

      // ── Border radius ────────────────────────────────────────
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ── Container ────────────────────────────────────────────
      container: {
        center: true,
        padding: "1.5rem",
        screens: { sm:"640px", md:"768px", lg:"1024px", xl:"1280px", "2xl":"1400px" },
      },

      // ── Animations ───────────────────────────────────────────
      keyframes: {
        "accordion-down": { from:{height:"0"}, to:{height:"var(--radix-accordion-content-height)"} },
        "accordion-up":   { from:{height:"var(--radix-accordion-content-height)"}, to:{height:"0"} },
        "fade-up":        { "0%":{opacity:"0",transform:"translateY(20px)"}, "100%":{opacity:"1",transform:"translateY(0)"} },
      },
      animation: {
        "accordion-down": "accordion-down 0.22s ease-out",
        "accordion-up":   "accordion-up 0.22s ease-out",
        "fade-up":        "fade-up 0.65s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
