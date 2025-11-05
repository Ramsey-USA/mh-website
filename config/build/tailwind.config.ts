import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      xs: "475px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        brand: {
          // PRIMARY BRAND COLOR: Hunter Green
          primary: "#386851", // Hunter Green - Main brand color
          "primary-light": "#4a7a63", // Lighter hunter green
          "primary-dark": "#2d5240", // Darker hunter green

          // SECONDARY BRAND COLOR: Leather Tan
          secondary: "#BD9264", // Leather Tan - Secondary brand color
          "secondary-light": "#c9a176", // Lighter tan
          "secondary-dark": "#a67d52", // Darker tan

          // GRAYSCALE ACCENTS (approved for use)
          accent: "#757575", // Medium Gray accent
          "accent-light": "#9E9E9E", // Lighter gray
          "accent-dark": "#424242", // Darker gray
          light: "#f7f9f7", // Very light brand background
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
        "6xl": ["3.75rem", { lineHeight: "1" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "1" }],
        "9xl": ["8rem", { lineHeight: "1" }],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        112: "28rem",
        128: "32rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        // PRIMARY BRAND SHADOWS (Hunter Green)
        brand:
          "0 10px 25px -5px rgba(56, 104, 81, 0.2), 0 10px 10px -5px rgba(56, 104, 81, 0.04)",
        "brand-lg":
          "0 20px 25px -5px rgba(56, 104, 81, 0.2), 0 10px 10px -5px rgba(56, 104, 81, 0.04)",
        // SECONDARY BRAND SHADOWS (Leather Tan)
        "brand-secondary":
          "0 10px 25px -5px rgba(189, 146, 100, 0.2), 0 10px 10px -5px rgba(189, 146, 100, 0.04)",
        "brand-secondary-lg":
          "0 20px 25px -5px rgba(189, 146, 100, 0.2), 0 10px 10px -5px rgba(189, 146, 100, 0.04)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "pulse-glow": "pulseGlow 2s infinite",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(56, 104, 81, 0.4)" },
          "50%": { boxShadow: "0 0 0 20px rgba(56, 104, 81, 0)" },
        },
      },
      transitionDuration: {
        "0": "0ms",
        "200": "200ms",
        "300": "300ms",
        "400": "400ms",
        "500": "500ms",
        "600": "600ms",
        "700": "700ms",
        "800": "800ms",
        "900": "900ms",
        "1000": "1000ms",
      },
      transitionTimingFunction: {
        bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
    },
  },
  plugins: [],
};

export default config;
