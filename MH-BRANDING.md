# MH Construction Brand Guidelines & Design System

**Complete brand identity, design system, and implementation guidelines for MH Construction LLC**

> **📅 Last Updated:** September 22, 2025  
> **🎨 Brand Version:** 2.5.0  
> **👥 Authority:** MH Construction Leadership Team  
> **💻 Implementation:** See `globals.css` for complete CSS implementation  
> **🌙 Theme Support:** Complete light/dark mode system

---

## 🏢 Brand Identity

### Company Information
**MH Construction LLC** - *Veteran-Owned Construction Company*

| Element | Details |
|---------|---------|
| **Full Business Name** | MH Construction LLC |
| **Tagline** | "Building Tomorrow with Today's Technology" |
| **Secondary Tagline** | "Where Military Precision Meets Construction Excellence" |
| **Industry** | Construction & Renovation |
| **Founded** | Veteran-owned and operated |
| **Service Philosophy** | Military precision, veteran values, cutting-edge technology |

### Core Values
| Value | Description | Brand Expression |
|-------|-------------|------------------|
| **Ethics** | Transparent pricing, honest timelines | Clear cost breakdowns, realistic schedules |
| **Experience** | 150+ years combined team expertise | Proven track record showcasing |
| **Integrity** | Consistent performance, reliable delivery | Promise keeping, quality assurance |
| **Honesty** | Open communication, no hidden costs | Transparent processes, upfront pricing |
| **Trust** | Proven results, client testimonials | Social proof, referral programs |
| **Professionalism** | Military-grade precision | Attention to detail, systematic approach |

---

## 🎨 Visual Identity System

### Primary Brand Colors
```css
/* Official MH Construction Color Palette - Implemented in globals.css */
--brand-primary: #386851;           /* Hunter Green - Primary brand color */
--brand-primary-light: #4a7a63;     /* Hover states, lighter applications */
--brand-primary-dark: #2d5240;      /* Active states, emphasis */

--brand-secondary: #BD9264;         /* Leather Tan - Secondary brand color */
--brand-secondary-light: #c9a176;   /* Hover states, lighter applications */
--brand-secondary-dark: #a67d52;    /* Active states, emphasis */

--veteran-red: #dc2626;             /* Red for veteran badges and honors */
--veteran-blue: #1d4ed8;            /* Blue for veteran service elements */
--veteran-gold: #ca8a04;            /* Gold for veteran achievements */
```

### Color Usage Guidelines

#### Hunter Green (#386851) - Primary
- **Primary CTAs** (Get Quote, Contact Us, Book Consultation)
- **Header navigation** and primary branding elements
- **Active states** and selected items
- **Logo applications** and brand marks

#### Leather Tan (#BD9264) - Secondary  
- **Secondary CTAs** (Learn More, View Portfolio)
- **Accent elements** and highlighting
- **Complementary design** elements
- **Warm accent** applications

#### Veteran Colors
- **Red (#dc2626)**: Veteran badges, military service indicators
- **Blue (#1d4ed8)**: Veteran program elements, service highlights  
- **Gold (#ca8a04)**: Achievement badges, honor indicators

---

## 🌙 Comprehensive Light/Dark Theme System

### Complete Theme Architecture
Our design system supports comprehensive light and dark modes across all components with intelligent color adaptation.

#### Light Mode Color System
```css
/* Light Mode Theme Variables - Complete Implementation */
:root {
  /* Main Layout Colors */
  --color-background: #ffffff;           /* Main site background */
  --color-surface: #f8fafc;              /* Card and section backgrounds */
  --color-surface-secondary: #f1f5f9;    /* Alternate backgrounds */
  --color-surface-elevated: #ffffff;     /* Elevated components */
  --color-surface-hover: #f1f5f9;        /* Hover state backgrounds */
  
  /* Text Colors */
  --color-text-primary: #1e293b;         /* Primary text (headings, body) */
  --color-text-secondary: #64748b;       /* Secondary text (descriptions) */
  --color-text-muted: #94a3b8;           /* Muted text (placeholders, meta) */
  --color-text-inverse: #ffffff;         /* Text on dark backgrounds */
  --color-text-accent: var(--brand-primary); /* Accent text color */
  
  /* Border Colors */
  --color-border: #e2e8f0;               /* Standard borders */
  --color-border-light: #f1f5f9;         /* Light borders (subtle dividers) */
  --color-border-strong: #cbd5e1;        /* Strong borders (emphasis) */
  --color-border-hover: var(--brand-primary); /* Interactive border states */
  
  /* Interactive States */
  --color-interactive-default: var(--brand-primary);    /* Default interactive */
  --color-interactive-hover: var(--brand-primary-light); /* Hover states */
  --color-interactive-active: var(--brand-primary-dark); /* Active states */
  --color-interactive-disabled: #94a3b8; /* Disabled states */
  
  /* Component Specific Colors */
  --color-nav-background: rgba(255, 255, 255, 0.95);
  --color-nav-text: var(--color-text-primary);
  --color-nav-border: rgba(0, 0, 0, 0.1);
  --color-nav-hover: var(--color-surface-hover);
  
  --color-card-background: var(--color-surface);
  --color-card-border: var(--color-border);
  --color-card-shadow: rgba(0, 0, 0, 0.1);
  --color-card-hover-shadow: rgba(0, 0, 0, 0.15);
  
  --color-input-background: #ffffff;
  --color-input-border: var(--color-border);
  --color-input-focus: var(--brand-primary);
  --color-input-text: var(--color-text-primary);
  --color-input-placeholder: var(--color-text-muted);
}
```

#### Dark Mode Color System
```css
/* Dark Mode Theme Variables - Complete Implementation */
@media (prefers-color-scheme: dark) {
  :root {
    /* Main Layout Colors */
    --color-background: #0f172a;           /* slate-900 - Main site background */
    --color-surface: #1e293b;              /* slate-800 - Card backgrounds */
    --color-surface-secondary: #334155;    /* slate-700 - Alternate backgrounds */
    --color-surface-elevated: #1e293b;     /* slate-800 - Elevated components */
    --color-surface-hover: #334155;        /* slate-700 - Hover backgrounds */
    
    /* Text Colors */
    --color-text-primary: #f8fafc;         /* slate-50 - Primary text */
    --color-text-secondary: #cbd5e1;       /* slate-300 - Secondary text */
    --color-text-muted: #64748b;           /* slate-500 - Muted text */
    --color-text-inverse: #1e293b;         /* slate-800 - Text on light backgrounds */
    --color-text-accent: var(--brand-primary-light); /* Lighter accent for dark mode */
    
    /* Border Colors */
    --color-border: #334155;               /* slate-700 - Standard borders */
    --color-border-light: #475569;         /* slate-600 - Light borders */
    --color-border-strong: #64748b;        /* slate-500 - Strong borders */
    --color-border-hover: var(--brand-primary-light); /* Interactive borders */
    
    /* Interactive States */
    --color-interactive-default: var(--brand-primary-light);
    --color-interactive-hover: #4a7a63;    /* Slightly lighter hover */
    --color-interactive-active: var(--brand-primary);
    --color-interactive-disabled: #64748b; /* slate-500 */
    
    /* Component Specific Colors */
    --color-nav-background: rgba(15, 23, 42, 0.95);
    --color-nav-text: var(--color-text-primary);
    --color-nav-border: rgba(255, 255, 255, 0.1);
    --color-nav-hover: var(--color-surface-hover);
    
    --color-card-background: var(--color-surface);
    --color-card-border: var(--color-border);
    --color-card-shadow: rgba(0, 0, 0, 0.3);
    --color-card-hover-shadow: rgba(0, 0, 0, 0.4);
    
    --color-input-background: var(--color-surface);
    --color-input-border: var(--color-border);
    --color-input-focus: var(--brand-primary-light);
    --color-input-text: var(--color-text-primary);
    --color-input-placeholder: var(--color-text-muted);
  }
}
```

#### Manual Theme Toggle Support
```css
/* Manual Dark Mode Class - Overrides system preference */
.dark {
  /* Identical color definitions to @media (prefers-color-scheme: dark) */
  /* Full implementation in globals.css ensures manual toggle works */
}
```

### Theme Implementation Standards

#### Component Theme Guidelines
1. **Always use CSS custom properties** for colors
2. **Never use hardcoded color values** in components
3. **Test in both light and dark modes** before deployment
4. **Ensure proper contrast ratios** in both themes
5. **Respect user motion preferences** with animations

#### Theme-Aware Component Examples
```tsx
// Button with automatic theme adaptation
<button className="btn-primary">
  Get Quote
</button>

// Card with theme-aware styling
<div className="card-primary">
  <h3 className="text-brand-primary">Project Title</h3>
  <p className="text-secondary">Project description</p>
</div>

// Form input with proper theme support
<input 
  type="email" 
  className="form-input" 
  placeholder="Enter email"
/>
```

### Typography System
```css
/* MH Construction Font Hierarchy - Theme Independent */
--font-heading: 'Tactic Sans Bold', 'Arial Black', sans-serif;
--font-subheading: 'Tactic Sans Medium', 'Arial', sans-serif;
--font-body: 'Adobe Garamond Pro', 'Times New Roman', serif;
--font-mono: 'JetBrains Mono', 'Consolas', monospace;

/* Fluid Typography Scale - Works in all themes */
--text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.8rem);
--text-sm: clamp(0.875rem, 0.8rem + 0.3vw, 0.95rem);
--text-base: clamp(1rem, 0.9rem + 0.4vw, 1.1rem);
--text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);
--text-xl: clamp(1.25rem, 1.1rem + 0.6vw, 1.4rem);
--text-2xl: clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem);
--text-3xl: clamp(1.875rem, 1.6rem + 1vw, 2.25rem);
--text-4xl: clamp(2.25rem, 1.9rem + 1.4vw, 3rem);
```

---

## 🏆 Enhanced Logo System with Theme-Aware Glimmer Effects

### Logo Implementation Classes
```css
/* CSS Classes - Full implementation in globals.css with theme support */
.mh-logo-enhanced          /* Base logo with adaptive glimmer effects */
.header-logo-enhanced      /* Header-specific styling with theme awareness */
.footer-logo-enhanced      /* Footer-specific styling with theme adaptation */
```

### Theme-Aware Logo Effects
```css
/* Header logo adapts glimmer color based on theme */
.header-logo-enhanced::before {
  background: linear-gradient(90deg, transparent, rgba(56, 104, 81, 0.3), transparent);
}

.dark .header-logo-enhanced::before {
  background: linear-gradient(90deg, transparent, rgba(74, 122, 99, 0.4), transparent);
}
```

---

## 🔲 MH Brand Standard Button System with Complete Theme Support

### Button Classification System
All buttons automatically adapt to light/dark themes while maintaining brand consistency.

#### Primary Button Types with Theme Adaptation
```css
/* CSS Classes - Full implementation in globals.css with theme support */
.btn-primary              /* Hunter Green - Adapts to theme */
.btn-secondary           /* Leather Tan - Theme aware */
.btn-outline             /* Transparent with adaptive outline */
.btn-veteran             /* Red theme for veteran services */
.btn-dashboard           /* Blue theme for team/admin */
```

#### Enhanced Theme-Aware Button Examples
```css
/* Primary button automatically uses theme-appropriate colors */
.btn-primary {
  background: var(--color-interactive-default);
  color: white;
  border: 2px solid var(--color-interactive-default);
}

.btn-primary:hover {
  background: var(--color-interactive-hover);
}

/* Dark mode automatically gets enhanced shadows */
.dark .btn-primary {
  box-shadow: 0 4px 16px rgba(74, 122, 99, 0.3);
}

/* Outline button adapts border and text color */
.btn-outline {
  color: var(--color-interactive-default);
  border-color: var(--color-interactive-default);
}

.dark .btn-outline {
  color: var(--brand-primary-light);
  border-color: var(--brand-primary-light);
}
```

---

## 🎯 Component Standards with Complete Theme Support

### Navigation System
```css
/* Navigation automatically adapts to theme */
.nav-primary {
  background: var(--color-nav-background);
  color: var(--color-nav-text);
  border-bottom: 1px solid var(--color-nav-border);
}

.nav-link:hover {
  background: var(--color-nav-hover);
  color: var(--color-interactive-default);
}
```

### Card System  
```css
/* Cards use theme-aware variables */
.card-primary {
  background: var(--color-card-background);
  border: 1px solid var(--color-card-border);
  box-shadow: 0 1px 3px var(--color-card-shadow);
  color: var(--color-text-primary);
}

.card-primary:hover {
  box-shadow: 0 12px 30px var(--color-card-hover-shadow);
}
```

### Form Elements
```css
/* Forms adapt automatically to theme */
.form-input {
  background: var(--color-input-background);
  border: 2px solid var(--color-input-border);
  color: var(--color-input-text);
}

.form-input::placeholder {
  color: var(--color-input-placeholder);
}

.form-input:focus {
  border-color: var(--color-input-focus);
}
```

---

## ♿ Accessibility & Theme Standards

### Contrast Compliance
- **Light Mode**: All color combinations meet WCAG AA standards (4.5:1 ratio)
- **Dark Mode**: Enhanced contrast ratios for improved readability
- **High Contrast**: Special support for `prefers-contrast: high`

### Motion Sensitivity
```css
/* Respects user motion preferences in all themes */
@media (prefers-reduced-motion: reduce) {
  .mh-logo-enhanced,
  .btn-primary,
  .card-primary,
  .nav-link {
    transition: none;
  }
  
  .mh-logo-enhanced::before,
  .btn-primary::before {
    display: none;
  }
}
```

### Focus States
```css
/* Theme-aware focus indicators */
.btn-primary:focus,
.form-input:focus,
.nav-link:focus {
  outline: 2px solid var(--color-interactive-default);
  outline-offset: 2px;
}

/* Dark mode gets enhanced focus visibility */
.dark .btn-primary:focus,
.dark .form-input:focus,
.dark .nav-link:focus {
  outline-color: var(--brand-primary-light);
}
```

---

## 🏗️ Implementation Guidelines

### CSS Implementation Reference
> **All theme standards are implemented in `/src/app/globals.css`**
> - Comprehensive light/dark mode support
> - Automatic theme adaptation for all components
> - Accessibility-compliant color systems
> - Brand consistency across all themes

### Component Usage with Theme Support
```tsx
// Automatic theme adaptation - no additional classes needed
<div className="card-primary">
  <h3 className="text-brand-primary">Automatically themed</h3>
  <button className="btn-primary">Theme-aware button</button>
</div>

// Manual theme toggle support
<button onClick={toggleTheme}>
  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
</button>
```

### Brand Compliance Checklist with Theme Support
- [ ] Uses official MH brand colors with theme variants
- [ ] Implements theme-aware interactive effects
- [ ] Supports both automatic and manual theme switching
- [ ] Maintains proper contrast ratios in all themes
- [ ] Includes accessibility features for all themes
- [ ] Respects user motion and contrast preferences
- [ ] Tests properly in both light and dark modes

---

## 📞 Brand Governance

### Authority & Updates
- **Final Approval**: MH Construction Leadership Team
- **Implementation**: Development Team via `globals.css`
- **Guidelines**: This document + complete CSS implementation
- **Theme Testing**: Both light and dark modes must be tested

### Contact Information
- **Brand Guidelines**: developers@mhconstruction.com
- **Theme Implementation**: See `globals.css` for complete system
- **Technical Support**: Full theme support documentation available

---

**This comprehensive brand system ensures consistent, professional, and veteran-proud representation across all digital touchpoints with complete light/dark theme support and enhanced accessibility.** 🏗️

*"Building Tomorrow with Today's Technology - Where Military Precision Meets Construction Excellence"*

---

*Brand Guidelines v2.5.0 | September 22, 2025 | MH Construction LLC*
