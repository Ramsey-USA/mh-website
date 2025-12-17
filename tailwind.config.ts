import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#386851",
          "primary-light": "#4a7a63",
          "primary-dark": "#2d5240",
          secondary: "#BD9264",
          "secondary-light": "#c9a176",
          "secondary-dark": "#a67d52",
          accent: "#BD9264",
          "accent-light": "#c9a176",
          "accent-dark": "#a67d52",
        },
        bronze: {
          50: "#faf8f5",
          100: "#f5f1e8",
          200: "#ebe3d1",
          300: "#dccfb3",
          400: "#cdb995",
          500: "#BD9264",
          600: "#a67d52",
          700: "#8a6643",
          800: "#6f5236",
          900: "#5a422c",
        },
        primary: {
          50: "#f0f7f4",
          100: "#d9ebe2",
          200: "#b3d7c5",
          300: "#8cc3a8",
          400: "#66af8b",
          500: "#386851",
          600: "#2d5240",
          700: "#264737",
          800: "#1d362a",
          900: "#14251d",
        },
        secondary: {
          50: "#faf8f5",
          100: "#f5f1e8",
          200: "#ebe3d1",
          300: "#dccfb3",
          400: "#cdb995",
          500: "#BD9264",
          600: "#a67d52",
          700: "#8a6643",
          800: "#6f5236",
          900: "#5a422c",
        },
        accent: {
          50: "#faf8f5",
          100: "#f5f1e8",
          200: "#ebe3d1",
          300: "#dccfb3",
          400: "#cdb995",
          500: "#BD9264",
          600: "#a67d52",
          700: "#8a6643",
          800: "#6f5236",
          900: "#5a422c",
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
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.4s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "scale-up": "scaleUp 0.3s ease-out",
        bounce: "bounce 1s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wave: "wave 1.5s ease-in-out infinite",
        twinkle: "twinkle 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInRight: {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        scaleUp: {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        wave: {
          "0%, 100%": {
            transform: "perspective(400px) rotateY(0deg)",
          },
          "50%": {
            transform: "perspective(400px) rotateY(10deg)",
          },
        },
        twinkle: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.6",
          },
        },
      },
      boxShadow: {
        brand:
          "0 10px 25px -5px rgba(56, 104, 81, 0.4), 0 10px 10px -5px rgba(56, 104, 81, 0.04)",
        "brand-secondary":
          "0 10px 25px -5px rgba(189, 146, 100, 0.4), 0 10px 10px -5px rgba(189, 146, 100, 0.04)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#1f2937",
            a: {
              color: "#386851",
              "&:hover": {
                color: "#2d5240",
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
};

export default config;
