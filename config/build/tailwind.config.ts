import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Brand Colors - MH Construction Theme
      colors: {
        brand: {
          primary: "#386851", // Deep forest green
          secondary: "#BD9264", // Warm bronze/tan
          accent: "#2D5443", // Darker green for accents
          light: "#E8F5F0", // Light mint green
          dark: "#1A332A", // Very dark green
        },
        // Enhanced color palette for better design flexibility
        forest: {
          50: "#f0f9f5",
          100: "#dcf2e6",
          200: "#bce5d2",
          300: "#90d1b6",
          400: "#5fb596",
          500: "#386851",
          600: "#2d5443",
          700: "#254237",
          800: "#1f362e",
          900: "#1a2c26",
          950: "#0f1a15",
        },
        bronze: {
          50: "#faf8f5",
          100: "#f4f0e7",
          200: "#e8ddc9",
          300: "#dcc5a3",
          400: "#cdaa7d",
          500: "#bd9264",
          600: "#a67d52",
          700: "#8a6844",
          800: "#70543a",
          900: "#5c4530",
          950: "#312318",
        },
        // Semantic colors
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
      },

      // Typography
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "monospace"],
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

      // Spacing system
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },

      // Animation and transitions
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        "bounce-slow": "bounce 2s infinite",
        "pulse-slow": "pulse 3s infinite",
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "card-flip": "cardFlip 0.6s ease-in-out",
        glow: "glow 2s ease-in-out infinite alternate",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        cardFlip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(56, 104, 81, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(56, 104, 81, 0.8)" },
        },
      },

      // Enhanced transitions
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      // Box shadows for depth
      boxShadow: {
        brand: "0 4px 14px 0 rgba(56, 104, 81, 0.39)",
        "brand-lg": "0 10px 25px -3px rgba(56, 104, 81, 0.3)",
        bronze: "0 4px 14px 0 rgba(189, 146, 100, 0.39)",
        "bronze-lg": "0 10px 25px -3px rgba(189, 146, 100, 0.3)",
        "inner-brand": "inset 0 2px 4px 0 rgba(56, 104, 81, 0.06)",
        "glow-brand": "0 0 20px rgba(56, 104, 81, 0.3)",
        "glow-bronze": "0 0 20px rgba(189, 146, 100, 0.3)",
      },

      // Border radius for consistent design
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      // Backdrop blur for modern effects
      backdropBlur: {
        xs: "2px",
      },

      // Screen sizes for responsive design
      screens: {
        xs: "475px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1600px",
        // Mobile-first breakpoints
        "mobile-sm": { max: "374px" }, // Very small phones
        mobile: { max: "639px" }, // All mobile devices
        tablet: { min: "640px", max: "1023px" }, // Tablets only
      },

      // Z-index scale for layering
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },

      // Aspect ratios
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16",
      },

      // Content utilities
      content: {
        empty: '""',
      },
    },
  },
  plugins: [
    // Custom plugin for additional utilities
    function ({ addUtilities, addComponents, theme }: any) {
      // Custom utilities for 3D effects and performance
      addUtilities({
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".preserve-3d": {
          transformStyle: "preserve-3d",
        },
        ".backface-hidden": {
          backfaceVisibility: "hidden",
        },
        ".rotate-y-180": {
          transform: "rotateY(180deg)",
        },
        ".gpu-acceleration": {
          transform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        },
        ".text-shadow": {
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        },
        ".text-shadow-lg": {
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)",
        },
      });

      // Custom components for common patterns
      addComponents({
        ".btn-primary": {
          "@apply inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-brand-primary hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-200 transform hover:scale-105":
            {},
        },
        ".btn-secondary": {
          "@apply inline-flex items-center justify-center px-6 py-3 border border-brand-primary text-base font-medium rounded-lg text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all duration-200":
            {},
        },
        ".card": {
          "@apply bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden":
            {},
        },
        ".card-hover": {
          "@apply transition-all duration-300 hover:shadow-xl hover:-translate-y-1":
            {},
        },
        ".input-field": {
          "@apply block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary":
            {},
        },
      });
    },
  ],

  // Performance optimizations
  corePlugins: {
    // Disable unused features for better performance
    preflight: true,
  },

  // Safelist important classes that might be generated dynamically
  safelist: [
    "animate-pulse",
    "animate-spin",
    "animate-bounce",
    {
      pattern:
        /bg-(brand|forest|bronze)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /text-(brand|forest|bronze)-(50|100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern:
        /border-(brand|forest|bronze)-(50|100|200|300|400|500|600|700|800|900)/,
    },
  ],
};

export default config;
