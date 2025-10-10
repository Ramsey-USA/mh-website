# MH Construction Design System

## Table of Contents

- [Brand Guidelines & Component Standards](#brand-guidelines--component-standards)
- [🎨 Brand Identity](#-brand-identity)
  - [Primary Brand Colors](#primary-brand-colors)
  - [Neutral Colors - Light/Dark Mode Compatible](#neutral-colors---lightdark-mode-compatible)
  - [Status & Accent Colors](#status--accent-colors)
- [📝 Typography System](#-typography-system)
  - [Font Families](#font-families)
  - [Responsive Typography Scale](#responsive-typography-scale)
  - [Line Heights & Spacing](#line-heights--spacing)
- [🔲 Component Standards](#-component-standards)

## Brand Guidelines & Component Standards

**Foundation-Only Architecture**: Clean design system optimized for scalable expansion  
and consistent user experience.

> **📐 For Page Layout Templates:** See [PAGE_LAYOUT_STANDARDS.md](./PAGE_LAYOUT_STANDARDS.md)  
> for complete spacing, padding, and typography standards extracted from the home page.

---

## 🎨 Brand Identity

### **Primary Brand Colors**

 `` `css
/*MH Construction Brand Palette */
:root {
  /* Primary Brand Colors */
  --brand-primary: #386851;           /* Hunter Green - Primary actions, headers */
  --brand-primary-light: #4a7a63;     /* Lighter hunter green for hover states */
  --brand-primary-dark: #2d5240;      /* Darker hunter green for active states*/

  --brand-secondary: #BD9264;         /*Leather Tan - Secondary actions, accents */
  --brand-secondary-light: #c9a176;   /* Lighter tan for hover states */
  --brand-secondary-dark: #a67d52;    /* Darker tan for active states*/
}
 `` `text

### **Neutral Colors - Light/Dark Mode Compatible**

 `` `css
/*Light Mode */
:root {
  --color-background: #ffffff;        /* Main background */
  --color-surface: #f8fafc;          /* Card backgrounds */
  --color-surface-secondary: #f1f5f9; /* Alternate backgrounds*/

  --color-text-primary: #1e293b;     /*Primary text */
  --color-text-secondary: #64748b;   /* Secondary text */
  --color-text-muted: #94a3b8;       /* Muted text*/

  --color-border: #e2e8f0;           /*Borders and dividers */
  --color-border-light: #f1f5f9;     /* Light borders*/
}

/*Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;      /* Main background */
    --color-surface: #1e293b;         /* Card backgrounds */
    --color-surface-secondary: #334155; /* Alternate backgrounds*/

    --color-text-primary: #f8fafc;    /* Primary text */
    --color-text-secondary: #cbd5e1;  /* Secondary text */
    --color-text-muted: #64748b;      /* Muted text */

    --color-border: #334155;          /* Borders and dividers */
    --color-border-light: #475569;    /* Light borders */
  }
}
 `` `text

### **Status & Accent Colors**

 `` `css
/*Status Colors */
--color-success: #10b981;          /* Success states */
--color-success-light: #d1fae5;    /* Success backgrounds*/

--color-warning: #f59e0b;          /*Warning states */
--color-warning-light: #fef3c7;    /* Warning backgrounds*/

--color-error: #ef4444;            /*Error states */
--color-error-light: #fee2e2;      /* Error backgrounds*/

--color-info: #3b82f6;             /*Info states */
--color-info-light: #dbeafe;       /* Info backgrounds*/

/*Veteran Recognition Colors */
--veteran-red: #dc2626;            /* Red for veteran badges */
--veteran-blue: #1d4ed8;           /* Blue for veteran elements */
--veteran-gold: #ca8a04;           /* Gold for veteran honors*/
 `` `text

---

## 📝 Typography System

### **Font Families**

 `` `css
/* Font Stack */
--font-heading: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Monaco, 'Cascadia Code', monospace;
 `` `text

### **Responsive Typography Scale**

 `` `css
/* Desktop-Optimized Typography */
--text-xs: clamp(0.75rem, 0.7rem + 0.2vw, 0.8rem);     /* 12px-13px */
--text-sm: clamp(0.875rem, 0.8rem + 0.3vw, 0.95rem);   /* 14px-15px */
--text-base: clamp(1rem, 0.9rem + 0.4vw, 1.1rem);      /* 16px-18px */
--text-lg: clamp(1.125rem, 1rem + 0.5vw, 1.25rem);     /* 18px-20px */
--text-xl: clamp(1.25rem, 1.1rem + 0.6vw, 1.4rem);     /* 20px-22px */
--text-2xl: clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem);    /* 24px-28px */
--text-3xl: clamp(1.875rem, 1.6rem + 1vw, 2.25rem);    /* 30px-36px */
--text-4xl: clamp(2.25rem, 1.9rem + 1.2vw, 2.75rem);   /* 36px-44px */
--text-5xl: clamp(2.5rem, 2.1rem + 1.4vw, 3.25rem);    /* 40px-52px */
--text-6xl: clamp(3rem, 2.4rem + 1.6vw, 3.75rem);      /* 48px-60px - Maximum */
 `` `text

### **Line Heights & Spacing**

 `` `css
/*Line Heights*/
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/*Letter Spacing*/
--tracking-tight: -0.025em;
--tracking-normal: 0em;
--tracking-wide: 0.025em;

/*Text Weights*/
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-black: 900;
 `` `text

---

## 🔲 Component Standards

### **Button System**

#### **Primary Button (Hunter Green)**

 `` `css
.btn-primary {
  background: var(--brand-primary);
  color: white;
  border: 2px solid var(--brand-primary);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(56, 104, 81, 0.2);
}

.btn-primary:hover {
  background: var(--brand-primary-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(56, 104, 81, 0.35);
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(56, 104, 81, 0.3);
}
 `` `text

#### **Secondary Button (Leather Tan)**

 `` `css
.btn-secondary {
  background: var(--brand-secondary);
  color: white;
  border: 2px solid var(--brand-secondary);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 16px rgba(189, 146, 100, 0.2);
}

.btn-secondary:hover {
  background: var(--brand-secondary-light);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(189, 146, 100, 0.35);
}
 `` `text

#### **Outline Buttons**

 `` `css
.btn-outline {
  background: transparent;
  color: var(--brand-primary);
  border: 2px solid var(--brand-primary);
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-outline:hover {
  background: var(--brand-primary);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(56, 104, 81, 0.2);
}
 `` `text

#### **Button Sizes**

 `` `css
.btn-sm { padding: 0.5rem 1rem; font-size: 0.875rem; }
.btn-md { padding: 0.75rem 1.5rem; font-size: 1rem; }     /* Default */
.btn-lg { padding: 1rem 2rem; font-size: 1.125rem; }
.btn-xl { padding: 1.25rem 2.5rem; font-size: 1.25rem; }
 `` `text

### **Card Components**

 `` `css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.card-header {
  border-bottom: 1px solid var(--color-border-light);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--color-text-primary);
  margin: 0;
}
 `` `text

### **Form Elements**

 `` `css
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--color-border);
  border-radius: 0.5rem;
  font-size: var(--text-base);
  transition: all 0.3s ease;
  background: var(--color-background);
  color: var(--color-text-primary);
}

.form-input:focus {
  outline: none;
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px rgba(56, 104, 81, 0.1);
}

.form-label {
  display: block;
  font-weight: var(--font-medium);
  color: var(--color-text-primary);
  margin-bottom: 0.5rem;
}

.form-error {
  color: var(--color-error);
  font-size: var(--text-sm);
  margin-top: 0.25rem;
}
 `` `text

---

## 🌟 Icon System

### **Google Material Icons Integration**

 `` `tsx
// Universal MaterialIcon Component
interface MaterialIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const MaterialIcon: React.FC<MaterialIconProps> = ({
  name,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-sm',      // 14px
    md: 'text-base',    // 16px
    lg: 'text-lg',      // 18px
    xl: 'text-xl',      // 20px
    '2xl': 'text-2xl'   // 24px
  };

  return (
    <span
      className={ `material-icons ${sizeClasses[size]} ${className}` }
      aria-hidden="true"
    >
      {name}
    </span>
  );
};
 `` `text

### **Icon Usage Examples**

 `` `tsx
// Navigation
<MaterialIcon name="menu" size="lg" />
<MaterialIcon name="close" size="lg" />

// Actions
<MaterialIcon name="phone" size="md" />
<MaterialIcon name="email" size="md" />
<MaterialIcon name="location_on" size="md" />

// Status
<MaterialIcon name="check_circle" size="sm" className="text-green-500" />
<MaterialIcon name="error" size="sm" className="text-red-500" />
<MaterialIcon name="info" size="sm" className="text-blue-500" />
 `` `text

---

## 📐 Layout & Spacing

### **Spacing Scale**

 `` `css
/* Spacing System */
--space-px: 1px;
--space-0: 0;
--space-0-5: 0.125rem;    /* 2px */
--space-1: 0.25rem;       /* 4px */
--space-1-5: 0.375rem;    /* 6px */
--space-2: 0.5rem;        /* 8px */
--space-2-5: 0.625rem;    /* 10px */
--space-3: 0.75rem;       /* 12px */
--space-3-5: 0.875rem;    /* 14px */
--space-4: 1rem;          /* 16px */
--space-5: 1.25rem;       /* 20px */
--space-6: 1.5rem;        /* 24px */
--space-7: 1.75rem;       /* 28px */
--space-8: 2rem;          /* 32px */
--space-10: 2.5rem;       /* 40px */
--space-12: 3rem;         /* 48px */
--space-16: 4rem;         /* 64px */
--space-20: 5rem;         /* 80px */
--space-24: 6rem;         /* 96px */
--space-32: 8rem;         /* 128px */
 `` `text

### **Responsive Container System**

 `` `css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

/*Breakpoint Containers*/
@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}

@media (min-width: 1536px) {
  .container { max-width: 1536px; }
}
 `` `text

### **Section Layouts**

 `` `css
/*Standard Section Spacing */
.section {
  padding-top: 4rem;    /* py-16*/
  padding-bottom: 4rem;
}

@media (min-width: 1024px) {
  .section {
    padding-top: 6rem;    /*lg:py-24*/
    padding-bottom: 6rem;
  }
}

/*Compact Section (Desktop Optimized) */
.section-compact {
  padding-top: 3rem;    /* py-12*/
  padding-bottom: 3rem;
}

@media (min-width: 1024px) {
  .section-compact {
    padding-top: 4rem;    /*lg:py-16*/
    padding-bottom: 4rem;
  }
}
 `` `text

---

## 🎭 Animation Standards

### **Transition System**

 `` `css
/*Standard Transitions*/
.transition-base {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-fast {
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-slow {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/*Easing Functions*/
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
 `` `text

### **Hover Effects**

 `` `css
/*Standard Hover Lift - Simplified for crisp rendering*/
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
}

/*Scale Effect - Use sparingly to avoid fuzziness*/
.hover-scale:hover {
  transform: scale(1.02);
}

/*Subtle Glow*/
.hover-glow:hover {
  box-shadow: 0 0 20px rgba(56, 104, 81, 0.3);
}
 `` `text

---

## 🎨 Theme System

### **Dark Mode Implementation**

 `` `css
/*Theme Toggle*/
.theme-toggle {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.theme-toggle:hover {
  background: var(--brand-primary);
  color: white;
  transform: scale(1.1);
}

/*Theme-aware Components*/
.card-dark {
  background: var(--color-surface);
  border-color: var(--color-border);
  color: var(--color-text-primary);
}

.button-dark {
  background: var(--color-surface);
  color: var(--color-text-primary);
  border-color: var(--color-border);
}
 `` `text

---

## ♿ Accessibility Standards

### **Focus Management**

 `` `css
/*Focus Visible*/
.focus-visible:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 2px;
}

/*Skip Links*/
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--brand-primary);
  color: white;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
 `` `text

### **Color Contrast Requirements**

- **Normal Text**: Minimum 4.5:1 ratio
- **Large Text**: Minimum 3:1 ratio
- **Interactive Elements**: Minimum 3:1 ratio for focus indicators
- **Brand Colors**: All combinations tested for WCAG AA compliance

### **Screen Reader Support**

 `` `html
<!-- Semantic HTML Structure -->
<main role="main">
  <section aria-labelledby="services-heading">
    <h2 id="services-heading">Our Services</h2>
    <!-- Content -->
  </section>
</main>

<!-- ARIA Labels -->
<button aria-label="Open navigation menu" aria-expanded="false">
  <MaterialIcon name="menu" />
</button>

<!-- Live Regions -->
<div aria-live="polite" id="status-message"></div>
 `` `text

---

## 📱 Responsive Design Standards

### **Breakpoint System**

 `` `css
/*Mobile First Breakpoints */
/* xs: 0px - 640px (default) */
/* sm: 640px and up */
@media (min-width: 640px) { /* Small tablets*/ }

/*md: 768px and up */
@media (min-width: 768px) { /* Tablets*/ }

/*lg: 1024px and up */
@media (min-width: 1024px) { /* Small desktops*/ }

/*xl: 1280px and up */
@media (min-width: 1280px) { /* Large desktops*/ }

/*2xl: 1536px and up */
@media (min-width: 1536px) { /* Extra large screens*/ }
 `` `text

### **Mobile Optimization**

 `` `css
/*Touch Targets */
.touch-target {
  min-height: 44px;    /* iOS guideline*/
  min-width: 44px;
  padding: 0.75rem;
}

/*Mobile Navigation*/
.mobile-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: var(--color-background);
  border-bottom: 1px solid var(--color-border);
  z-index: 50;
}

/*Responsive Images*/
.responsive-image {
  width: 100%;
  height: auto;
  max-width: 100%;
}
 `` `text

---

## 🚀 Performance Standards

### **CSS Optimization**

 `` `css
/*Critical CSS - Above the fold */
.critical {
  /* Inline critical styles for fast initial render*/
}

/*Non-critical CSS - Lazy loaded */
@media print {
  /* Print styles separated*/
}

/*Reduce Paint Complexity */
.optimized-animation {
  will-change: transform;
  transform: translateZ(0); /* Force hardware acceleration*/
}
 `` `text

### **Loading States**

 `` `css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
 `` `text

---

## 🃏 Vintage Baseball Card Component

### **Purpose & Usage**

The `VintageBaseballCard` component creates engaging, interactive team member profiles with a  
professional vintage baseball card aesthetic. Used primarily on the team page to showcase MH  
Construction staff in a memorable, branded format with authentic vintage card styling.

### **Design Specifications**

    /* Vintage Card Dimensions */
    .vintage-card-container {
      width: 280px;         /* Standard vintage proportions */
      height: 392px;        /* 5:7 aspect ratio */
      perspective: 1000px;  /* 3D perspective for flip effect */
    }

    /* Vintage Card States */
    .vintage-card-face {
      border-radius: 8px;   /* Vintage rounded corners */
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);  /* Vintage elevation */
      transition: all 0.3s ease;     /* Smooth interactions */
    }

    .vintage-card-container:hover {
      transform: scale(1.02);         /*Subtle hover growth*/
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }

### **Color Variants**

#### **Standard Team Members**

 `` `css
.baseball-card.standard {
  /*Header gradient using brand primary*/
  background: linear-gradient(to right, var(--brand-primary), var(--brand-primary-dark));

  /*Photo ring with brand colors*/
  .photo-ring {
    background: linear-gradient(45deg, var(--brand-primary-20), var(--brand-secondary-20));
  }

  /*Role text in brand secondary*/
  .role-text { color: var(--brand-secondary); }

  /*Specialty tags*/
  .specialty-tag {
    background-color: var(--brand-primary-10);
    color: var(--brand-primary);
  }
}
 `` `text

#### **Mascot Variant (Trigger)**

 `` `css
.baseball-card.mascot {
  /*Special amber/orange theme for company mascot*/
  background: linear-gradient(to right, #f59e0b, #ea580c);

  /*Warm photo ring*/
  .photo-ring {
    background: linear-gradient(45deg, rgba(252, 211, 77, 0.2), rgba(251, 146, 60, 0.2));
  }

  /*Orange role text*/
  .role-text { color: #ea580c; }

  /*Amber specialty tags*/
  .specialty-tag {
    background-color: #fde68a;
    color: #92400e;
  }
}
 `` `text

### **Interactive Behaviors**

#### **3D Flip Animation**

 `` `css
/*Flip container with 3D transforms*/
.flip-container {
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.flip-container.flipped {
  transform: rotateY(180deg);
}

/*Card faces positioned absolutely*/
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.card-back {
  transform: rotateY(180deg);
}
 `` `text

#### **Accessibility Features**

 `` `css
/*Focus management for keyboard users*/
.baseball-card:focus-visible {
  outline: 2px solid var(--brand-primary);
  outline-offset: 4px;
}

/*Reduced motion support*/
@media (prefers-reduced-motion: reduce) {
  .flip-container {
    transition: none;
  }

  .baseball-card:hover {
    transform: none;
  }
}
 `` `text

### **Typography Hierarchy**

 `` `css
/*Team member name - Primary focus */
.member-name {
  font-size: 1.25rem;      /* text-xl */
  font-weight: 900;        /* font-black */
  letter-spacing: -0.025em; /* tracking-tight*/
  line-height: 1.2;
}

/*Role title - Secondary prominence */
.member-role {
  font-size: 0.875rem;     /* text-sm */
  font-weight: 700;        /* font-bold */
  text-transform: uppercase;
  letter-spacing: 0.05em;  /* tracking-wide*/
}

/*Bio text - Readable body */
.member-bio {
  font-size: 0.875rem;     /* text-sm */
  line-height: 1.625;      /* leading-relaxed*/
  text-align: center;
}

/*Specialty tags - Compact labels */
.specialty-tag {
  font-size: 0.75rem;      /* text-xs */
  font-weight: 500;        /* font-medium */
  padding: 0.25rem 0.75rem; /* px-3 py-1*/
}

/*Stats numbers - Prominent display */
.stat-number {
  font-size: 1.5rem;       /* text-2xl */
  font-weight: 700;        /* font-bold*/
  color: var(--brand-primary);
}
 `` `text

### **Component Integration**

#### **Usage Example**

    import { VintageBaseballCard } from '@/components/ui/VintageBaseballCard'
    import type { VintageTeamMember } from '@/lib/data/vintage-team'

    // Standard team member
    <VintageBaseballCard member={teamMember} />

    // Mascot (automatically detects card number 99)
    <VintageBaseballCard member={triggerMascot} />

#### **Grid Layout**

 `` `css
/*Responsive team grid */
.team-grid {
  display: grid;
  gap: 2.5rem;              /* gap-10*/
  justify-items: center;

  /*Responsive columns */
  grid-template-columns: 1fr;                    /* Mobile: 1 column*/
}

@media (min-width: 768px) {
  .team-grid { grid-template-columns: repeat(2, 1fr); } /*Tablet: 2 columns*/
}

@media (min-width: 1024px) {
  .team-grid { grid-template-columns: repeat(3, 1fr); } /*Desktop: 3 columns*/
}

@media (min-width: 1280px) {
  .team-grid { grid-template-columns: repeat(4, 1fr); } /*Large: 4 columns*/
}
 `` `text

### **Performance Considerations**

    /* Simple hardware acceleration for smooth vintage card animations */
    .vintage-card-container {
      transform: translateZ(0);
      transition: all 0.3s ease;
    }

    /* Clean image rendering without filters for crisp display */
    .vintage-player-image {
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      object-fit: cover;
    }

### **Design Tokens Used**

- **Colors**:  `--brand-primary` ,  `--brand-secondary` ,  `--brand-primary-dark`
- **Spacing**: Standard scale ( `0.25rem` ,  `0.5rem` ,  `1rem` ,  `1.5rem` ,  `2rem` )
- **Typography**: Font weight scale ( `400` ,  `500` ,  `700` ,  `900` )
- **Border Radius**:  `1rem`  for cards,  `9999px`  for circular elements
- **Shadows**: Tailwind elevation scale
- **Transitions**: Standard  `0.3s`  and  `0.7s`  durations

---

## 📋 Component Usage Guidelines

### **Do's**

- ✅ Use semantic HTML elements
- ✅ Follow consistent spacing patterns
- ✅ Implement proper focus management
- ✅ Test color contrast ratios
- ✅ Use design tokens for consistency
- ✅ Follow mobile-first responsive approach

### **Don'ts**

- ❌ Override CSS custom properties directly
- ❌ Use fixed pixel values instead of relative units
- ❌ Skip focus states for interactive elements
- ❌ Use color alone to convey information
- ❌ Implement complex animations without user preference checks

---

**Design System Status**: Foundation-ready with scalable architecture
**Last Updated**: October 2025
**Maintained By**: MH Construction Development Team

---

*This design system serves as the foundation for consistent, accessible, and  
maintainable UI components across the MH Construction platform.*
