import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enables class-based dark mode for theme toggle control
  theme: {
    extend: {
      colors: {
        // MH Construction Brand Colors
        'brand': {
          'primary': '#386851',        // Hunter Green
          'primary-light': '#4a7a63',  // Lighter hunter green
          'primary-dark': '#2d5240',   // Darker hunter green
          'secondary': '#BD9264',      // Leather Tan
          'secondary-light': '#c9a176', // Lighter tan
          'secondary-dark': '#a67d52',  // Darker tan
          'accent': '#7c9885',         // Sage Green accent
          'accent-light': '#96ad9c',   // Lighter sage
          'accent-dark': '#5a7363',    // Darker sage
          'light': '#f7f9f7',          // Very light brand background
        },
        
        // MH Brand Colors - Short aliases for easier use
        'mh-primary': '#386851',       // Hunter Green
        'mh-secondary': '#BD9264',     // Leather Tan
        
        // Semantic Colors - Light/Dark Compatible
        'surface': {
          DEFAULT: '#f8fafc',  // Light mode
          'secondary': '#f1f5f9',
          'dark': '#1e293b',   // Dark mode
          'dark-secondary': '#334155',
        },
        
        'text': {
          'primary': '#1e293b',     // Light mode
          'secondary': '#64748b',
          'muted': '#94a3b8',
          'primary-dark': '#f8fafc', // Dark mode
          'secondary-dark': '#cbd5e1',
          'muted-dark': '#64748b',
        },
        
        'border': {
          DEFAULT: '#e2e8f0',      // Light mode
          'light': '#f1f5f9',
          'dark': '#334155',       // Dark mode
          'dark-light': '#475569',
        },
        
        // Status Colors
        'success': {
          DEFAULT: '#10b981',
          'light': '#d1fae5',
          'dark': '#064e3b',
        },
        'warning': {
          DEFAULT: '#f59e0b',
          'light': '#fef3c7',
          'dark': '#451a03',
        },
        'error': {
          DEFAULT: '#ef4444',
          'light': '#fee2e2',
          'dark': '#7f1d1d',
        },
        'info': {
          DEFAULT: '#3b82f6',
          'light': '#dbeafe',
          'dark': '#1e3a8a',
        },
        
        // Veteran Recognition Colors
        'veteran': {
          'red': '#dc2626',
          'blue': '#1d4ed8',
          'gold': '#ca8a04',
        },
      },
      fontFamily: {
        'tactic-bold': ['Tactic Sans Bold', 'Arial Black', 'sans-serif'],
        'tactic-medium': ['Tactic Sans Medium', 'Arial', 'sans-serif'],
        'garamond': ['Adobe Garamond Pro', 'Times New Roman', 'serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['clamp(0.75rem, 0.7rem + 0.2vw, 0.8rem)', { lineHeight: '1.25' }],
        'sm': ['clamp(0.875rem, 0.8rem + 0.3vw, 0.95rem)', { lineHeight: '1.25' }],
        'base': ['clamp(1rem, 0.9rem + 0.4vw, 1.1rem)', { lineHeight: '1.5' }],
        'lg': ['clamp(1.125rem, 1rem + 0.5vw, 1.25rem)', { lineHeight: '1.5' }],
        'xl': ['clamp(1.25rem, 1.1rem + 0.6vw, 1.4rem)', { lineHeight: '1.5' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem)', { lineHeight: '1.25' }],
        '3xl': ['clamp(1.875rem, 1.6rem + 1vw, 2.25rem)', { lineHeight: '1.25' }],
        '4xl': ['clamp(2.25rem, 1.9rem + 1.4vw, 3rem)', { lineHeight: '1.25' }],
      },
      spacing: {
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '3rem',     // 48px
        '3xl': '4rem',     // 64px
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config