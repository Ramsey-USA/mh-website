import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx}",
    "./src/providers/**/*.{js,ts,jsx,tsx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // MH Construction Brand Colors
        brand: {
          primary: "#386851", // Hunter Green
          "primary-light": "#4a8166",
          "primary-dark": "#2a5240",
          secondary: "#BD9264", // Leather Tan
          "secondary-light": "#d4a876",
          "secondary-dark": "#a57d52",
          accent: "#D4AF37", // Gold accent
          "accent-light": "#e0c050",
          "accent-dark": "#b89825",
        },
        // Semantic color tokens
        primary: {
          DEFAULT: "#386851",
          50: "#f0f7f3",
          100: "#d9ebe2",
          200: "#b3d7c5",
          300: "#8cc3a8",
          400: "#66af8b",
          500: "#386851",
          600: "#2d5341",
          700: "#233e31",
          800: "#182921",
          900: "#0e1410",
        },
        secondary: {
          DEFAULT: "#BD9264",
          50: "#faf6f0",
          100: "#f3eadc",
          200: "#e7d5b9",
          300: "#dbc096",
          400: "#cfab73",
          500: "#BD9264",
          600: "#9a754f",
          700: "#77583c",
          800: "#543b29",
          900: "#311e16",
        },
        // Extended color palette
        forest: {
          50: "#f3f7f5",
          100: "#e0ebe5",
          200: "#c1d7cb",
          300: "#a2c3b1",
          400: "#83af97",
          500: "#649b7d",
          600: "#4f7c64",
          700: "#3a5d4b",
          800: "#253e32",
          900: "#101f19",
        },
        bronze: {
          50: "#faf7f3",
          100: "#f3ebe0",
          200: "#e7d7c1",
          300: "#dbc3a2",
          400: "#cfaf83",
          500: "#c39b64",
          600: "#9c7c50",
          700: "#755d3c",
          800: "#4e3e28",
          900: "#271f14",
        },
        // Veteran badge bronze
        "bronze-badge": {
          DEFAULT: "#CD7F32",
          50: "#fef5ee",
          100: "#fde8d5",
          200: "#fbcfaa",
          300: "#f8af74",
          400: "#f5863c",
          500: "#f26916",
          600: "#e3500c",
          700: "#CD7F32",
          800: "#9d5215",
          900: "#7e4314",
        },
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          "Arial",
          '"Noto Sans"',
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      screens: {
        xs: "475px",
        "3xl": "1920px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        brand:
          "0 10px 15px -3px rgba(56, 104, 81, 0.1), 0 4px 6px -2px rgba(56, 104, 81, 0.05)",
        "brand-lg":
          "0 20px 25px -5px rgba(56, 104, 81, 0.1), 0 10px 10px -5px rgba(56, 104, 81, 0.04)",
        "brand-secondary":
          "0 10px 15px -3px rgba(189, 146, 100, 0.1), 0 4px 6px -2px rgba(189, 146, 100, 0.05)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
