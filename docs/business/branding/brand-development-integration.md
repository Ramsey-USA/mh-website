# MH Construction Brand-Development Integration Guide

**Version:** 4.0.2  
**Last Updated:** December 2024  
**Status:** ✅ Active Standard

> **Purpose:** Bridge between brand guidelines and development implementation to ensure seamless  
> integration of brand standards into code and technical execution.

---

## 🔗 **Brand-to-Code Mapping**

### **Color Implementation**

```typescript
// tailwind.config.ts - Brand colors integration
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary brand colors (v4.0.2)
        "brand-primary": "#386851", // Hunter Green
        "brand-secondary": "#BD9264", // Leather Tan

        // Supporting colors only
        "brand-accent": "#4A7C5E", // Hunter Green variant

        // NO unauthorized colors (removed)
        // 'veteran-blue': REMOVED
        // 'material-colors': REMOVED
      },
    },
  },
};
```

### **Typography Implementation**

```typescript
// Font system integration
export const brandTypography = {
  fontFamily: {
    brand: ["Inter", "system-ui", "sans-serif"],
  },

  // NO SECTION BADGES (v4.0.2)
  headings: {
    h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 dark:text-gray-100",
    h2: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 dark:text-gray-100",
    h3: "text-2xl font-bold text-gray-900 dark:text-gray-100",
  },
};
```

---

## 🏗️ **Component Integration Standards**

### **Button Component Compliance**

```tsx
// src/components/ui/Button.tsx - Brand compliant implementation
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function Button({ variant, children, icon, ...props }) {
  return (
    <button
      className={`
        group transition-all duration-300 
        ${variant === "primary" ? "bg-brand-primary text-white" : ""}
        ${variant === "secondary" ? "bg-brand-secondary text-white" : ""}
        hover:scale-105 focus:ring-2 focus:ring-brand-primary
      `}
      {...props}
    >
      {icon && (
        <MaterialIcon
          icon={icon}
          className="mr-2 group-hover:scale-110 transition-transform"
        />
      )}
      {children}
    </button>
  );
}
```

### **Section Header Implementation**

```tsx
// Standard brand-compliant section header
export function SectionHeader({ context, title, description }) {
  return (
    <div className="mb-10 lg:mb-12 text-center">
      <h2
        className="mb-6 font-black text-gray-900 dark:text-gray-100 
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter"
      >
        <span
          className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 
          text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight"
        >
          {context}
        </span>
        <span className="block text-brand-primary">{title}</span>
      </h2>
      <p
        className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 
        text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide"
      >
        {description}
      </p>
    </div>
  );
}
```

---

## 📱 **Responsive Brand Implementation**

### **Hero Section Standard**

```tsx
// Brand-compliant hero section template
export function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
}) {
  return (
    <section className="relative py-16 lg:py-24 bg-white dark:bg-gray-900">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
        <h1 className="mb-6 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
          <span
            className="block mb-2 font-semibold text-gray-700 dark:text-gray-300 
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
          >
            {subtitle}
          </span>
          <span className="block text-brand-primary">{title}</span>
        </h1>

        <p
          className="mx-auto mb-8 max-w-4xl font-light text-gray-600 dark:text-gray-300 
          text-lg md:text-xl lg:text-2xl leading-relaxed"
        >
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="primary" size="xl">
            <MaterialIcon icon="event" className="mr-3" />
            {primaryCTA}
          </Button>
          <Button variant="outline" size="xl">
            <MaterialIcon icon="visibility" className="mr-3" />
            {secondaryCTA}
          </Button>
        </div>
      </div>
    </section>
  );
}
```

---

## 🔍 **Development Quality Checklist**

### **Pre-Commit Brand Compliance**

- [ ] Only Hunter Green (#386851) and Leather Tan (#BD9264) brand colors used
- [ ] Material Icons implemented instead of emojis
- [ ] NO section badges (decorative rounded badge containers)
- [ ] Consistent animation duration (300ms)
- [ ] Proper responsive breakpoints (sm, md, lg)
- [ ] Dark mode support included
- [ ] Touch-friendly sizing (min 44px height)
- [ ] Accessibility attributes included
- [ ] Semantic HTML structure
- [ ] Brand typography hierarchy followed

### **Component Review Process**

```bash
# Development validation commands
npm run lint:brand        # Check brand compliance
npm run test:components   # Component functionality
npm run build:check       # Build validation
npm run a11y:audit        # Accessibility compliance
```

---

## 📦 **Import Standards for Brand Components**

### **Required Import Patterns**

```typescript
// Brand-compliant imports (MANDATORY)
import { Button } from "@/components/ui/Button";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";

// Brand color utilities
import { brandColors } from "@/lib/brand-utils";
import { cn } from "@/lib/utils";
```

### **Forbidden Imports**

```typescript
// ❌ NEVER import these (v4.0.2)
import Emoji from "react-emoji"; // Emoji policy violation
import GradientText from "gradient-text"; // Bubble heading violation
import RandomColors from "color-library"; // Unauthorized colors
```

---

## 🎨 **CSS Custom Properties**

### **Brand CSS Variables**

```css
/* globals.css - Brand variable integration */
:root {
  /* Brand Colors v4.0.2 */
  --brand-primary: #386851; /* Hunter Green */
  --brand-secondary: #bd9264; /* Leather Tan */
  --brand-accent: #4a7c5e; /* Hunter Green variant */

  /* Typography */
  --font-brand: "Inter", system-ui, sans-serif;

  /* Animations */
  --transition-brand: all 0.3s ease-out;

  /* NO unauthorized colors */
  /* --veteran-blue: REMOVED */
  /* --material-teal: REMOVED */
}
```

---

## 🚀 **Performance & Brand Integration**

### **Optimized Brand Asset Loading**

```typescript
// Efficient brand asset implementation
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brand'
});

export function BrandProvider({ children }) {
  return (
    <div className={`${inter.variable} font-brand`}>
      {children}
    </div>
  );
}
```

### **Brand Icon Optimization**

```typescript
// Material Icons tree-shaking for performance
import {
  Event, // Schedule/consultation icons
  Construction, // Service icons
  Phone, // Contact icons
  Visibility, // Portfolio icons
} from "@mui/icons-material";

// NO emoji imports for production
```

---

## 📋 **Development Workflow Integration**

### **Git Pre-Commit Hooks**

```json
// package.json - Brand compliance automation
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint:brand && npm run test:components"
    }
  },
  "scripts": {
    "lint:brand": "eslint --config .eslintrc.brand.js src/",
    "test:components": "jest --testMatch='**/*.(test|spec).brand.(js|ts|tsx)'"
  }
}
```

### **VS Code Settings for Brand Compliance**

```json
// .vscode/settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  // Brand color highlighting
  "colorHighlight.markerType": "dot-before",
  "colorHighlight.matchWords": true
}
```

---

## 📚 **Related Documentation**

- **[Component Standards](./component-standards.md)** - UI component guidelines
- **[MH Branding Guidelines](../mh-branding.md)** - Complete brand system
- **[Development Standards](../../development/development-standards.md)** - Code standards
- **[Page Layout Standards](../../technical/design-system/layout/page-layout-standards.md)** - Layout specs

---

**Maintained by:** MH Construction Development Team  
**Questions?** Review brand guidelines first, then contact the development team
