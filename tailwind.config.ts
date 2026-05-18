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
        // ── Epoch brand ──
        cream:   { DEFAULT: "#F8F4EF", warm: "#F2ECE4", deep: "#EAE2D8", parchment: "#E5DCCF" },
        gold:    { DEFAULT: "#C9A96E", bright: "#D4AF77", muted: "#E8D5A8", deep: "#A8842E", pale: "#F5EDD8" },
        sage:    { DEFAULT: "#4A5E48", mid: "#6B7F69", light: "#8FA08D", pale: "#EBF0EA" },
        ink:     { DEFAULT: "#18181A", soft: "#2A2A2C" },
        warm:    { mid: "#6E6860", light: "#9A9088", pale: "#C8C0B8" },

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

        // ── Legacy (backward compat) ──
        sage_legacy: { 50:"#f6f7f6",100:"#e3e7e3",200:"#c7cfc7",300:"#a3afa3",400:"#7d8c7d",500:"#5f6f5f",600:"#4a574a",700:"#3d473d",800:"#333a33",900:"#2b312b" },
        sand:  { 50:"#faf9f7",100:"#f5f2ed",200:"#e8e3d9",300:"#d9d1c1",400:"#c8bda8",500:"#b5a68f" },
        clay:  { 50:"#faf6f5",100:"#f4ebe8",200:"#e8d5d0",300:"#d9b8ad",400:"#c79685",500:"#b87968",600:"#a65e4d",700:"#8a4d40" },
        neutral: { 50:"#fafaf9",100:"#f5f5f4",200:"#e7e5e4",300:"#d6d3d1",400:"#a8a29e",500:"#78716c",600:"#57534e",700:"#44403c",800:"#292524",900:"#1c1917" },
        success: "#4d7c5a",
      },
      fontFamily: {
        serif:   ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans:    ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Playfair Display", "serif"],
      },
      fontSize: {
        "2xs": "0.65rem",
      },
      letterSpacing: {
        widest2: "0.22em",
        widest3: "0.30em",
      },
      boxShadow: {
        gold:       "0 8px 40px rgba(201,169,110,0.14)",
        "gold-lg":  "0 20px 60px rgba(201,169,110,0.20)",
        luxury:     "0 4px 20px rgba(24,24,26,0.07)",
        "luxury-lg":"0 12px 44px rgba(24,24,26,0.12)",
        card:       "0 2px 12px rgba(24,24,26,0.05)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      container: {
        center: true,
        padding: "1.5rem",
        screens: { sm:"640px", md:"768px", lg:"1024px", xl:"1280px", "2xl":"1400px" },
      },
      keyframes: {
        "accordion-down": { from:{ height:"0" }, to:{ height:"var(--radix-accordion-content-height)" } },
        "accordion-up":   { from:{ height:"var(--radix-accordion-content-height)" }, to:{ height:"0" } },
        "fade-up": {
          "0%":   { opacity:"0", transform:"translateY(28px)" },
          "100%": { opacity:"1", transform:"translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity:"0" },
          "100%": { opacity:"1" },
        },
        "slide-right": {
          "0%":   { opacity:"0", transform:"translateX(-20px)" },
          "100%": { opacity:"1", transform:"translateX(0)" },
        },
        shimmer: {
          "0%":{ backgroundPosition:"-200% 0" },
          "100%":{ backgroundPosition:"200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "fade-up":        "fade-up 0.75s ease-out forwards",
        "fade-in":        "fade-in 0.6s ease-out forwards",
        "slide-right":    "slide-right 0.6s ease-out forwards",
        shimmer:          "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
