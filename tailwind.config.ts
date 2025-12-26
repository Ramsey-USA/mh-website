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
          secondary: "#BD9264", // Original brand color (use for large text 18pt+, backgrounds)
          "secondary-text": "#8a6643", // WCAG AA compliant for normal text (4.59:1)
          "secondary-light": "#c9a176",
          "secondary-dark": "#a67d52",
          accent: "#BD9264",
          "accent-text": "#8a6643", // WCAG AA compliant for normal text
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
          500: "#BD9264", // Original brand color
          600: "#a67d52", // Good for small text
          700: "#8a6643", // WCAG AA compliant (4.59:1)
          800: "#6f5236",
          900: "#5a422c",
        },
        accent: {
          50: "#faf8f5",
          100: "#f5f1e8",
          200: "#ebe3d1",
          300: "#dccfb3",
          400: "#cdb995",
          500: "#BD9264", // Original brand color
          600: "#a67d52", // Good for small text
          700: "#8a6643", // WCAG AA compliant (4.59:1)
          800: "#6f5236",
          900: "#5a422c",
        },
        // Semantic colors per branding guidelines
        success: {
          light: "#10b981",
          dark: "#22c55e",
          DEFAULT: "#10b981",
        },
        warning: {
          light: "#f59e0b",
          dark: "#fbbf24",
          DEFAULT: "#f59e0b",
        },
        error: {
          light: "#ef4444",
          dark: "#f87171",
          DEFAULT: "#ef4444",
        },
        info: {
          light: "#3b82f6",
          dark: "#60a5fa",
          DEFAULT: "#3b82f6",
        },
        // Semantic text colors per branding guidelines
        text: {
          primary: {
            light: "#212121", // Gray 900
            dark: "#FFFFFF",
            DEFAULT: "#212121",
          },
          secondary: {
            light: "#757575", // Gray 600
            dark: "#B0B0B0", // Gray 400
            DEFAULT: "#757575",
          },
          muted: {
            light: "#9E9E9E", // Gray 500
            dark: "#757575", // Gray 600
            DEFAULT: "#9E9E9E",
          },
        },
        // Semantic background colors per branding guidelines
        bg: {
          primary: {
            light: "#FFFFFF",
            dark: "#121212",
            DEFAULT: "#FFFFFF",
          },
          secondary: {
            light: "#FAFAFA", // Gray 50
            dark: "#1E1E1E",
            DEFAULT: "#FAFAFA",
          },
          surface: {
            light: "#F5F5F5", // Gray 100
            dark: "#2D2D2D",
            DEFAULT: "#F5F5F5",
          },
        },
        // Semantic border colors per branding guidelines
        border: {
          primary: {
            light: "#E0E0E0", // Gray 300
            dark: "#424242", // Gray 700
            DEFAULT: "#E0E0E0",
          },
          secondary: {
            light: "#EEEEEE", // Gray 200
            dark: "#303030", // Gray 800
            DEFAULT: "#EEEEEE",
          },
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
        // Award-winning elevation system
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
        glow: "0 0 20px rgba(56, 104, 81, 0.5)",
        "glow-lg": "0 0 40px rgba(56, 104, 81, 0.6)",
        "glow-secondary": "0 0 20px rgba(189, 146, 100, 0.5)",
      },
      fontSize: {
        // Fluid typography - responsive text sizes
        "fluid-xs": "clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)",
        "fluid-sm": "clamp(0.875rem, 0.8rem + 0.375vw, 1rem)",
        "fluid-base": "clamp(1rem, 0.9rem + 0.5vw, 1.125rem)",
        "fluid-lg": "clamp(1.125rem, 1rem + 0.625vw, 1.25rem)",
        "fluid-xl": "clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)",
        "fluid-2xl": "clamp(1.5rem, 1.3rem + 1vw, 2rem)",
        "fluid-3xl": "clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)",
        "fluid-4xl": "clamp(2.25rem, 1.75rem + 2.5vw, 3rem)",
        "fluid-5xl": "clamp(3rem, 2rem + 5vw, 4rem)",
      },
      lineHeight: {
        tight: "1.2",
        snug: "1.4",
        normal: "1.6",
        relaxed: "1.75",
      },
      letterSpacing: {
        tight: "-0.02em",
        normal: "0",
        wide: "0.02em",
        wider: "0.05em",
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
        dark: {
          css: {
            color: "#FFFFFF",
            a: {
              color: "#4a7a63",
              "&:hover": {
                color: "#5c9378",
              },
            },
            h1: {
              color: "#FFFFFF",
            },
            h2: {
              color: "#FFFFFF",
            },
            h3: {
              color: "#FFFFFF",
            },
            h4: {
              color: "#FFFFFF",
            },
            strong: {
              color: "#FFFFFF",
            },
            code: {
              color: "#FFFFFF",
            },
            figcaption: {
              color: "#B0B0B0",
            },
            blockquote: {
              color: "#B0B0B0",
              borderLeftColor: "#4a7a63",
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
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".perspective-1000": {
          perspective: "1000px",
        },
        ".perspective-2000": {
          perspective: "2000px",
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
        ".rotate-y-0": {
          transform: "rotateY(0deg)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};

export default config;
