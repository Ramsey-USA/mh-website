# Homepage Design Reference Guide

**Category:** Technical - Design System  
**Last Updated:** December 17, 2025  
**Status:** ✅ Active - Canonical Reference  
**Version:** 1.0.0

## 📋 Overview

This document serves as the **canonical reference** for the MH Construction website's look and feel. The homepage (`/`) exemplifies all design patterns, visual standards, and component implementations that should be replicated throughout the website.

**Purpose:**

- Document the homepage as the authoritative visual reference
- Provide detailed breakdowns of each section's design patterns
- Guide developers in maintaining visual consistency across all pages
- Capture the complete "look and feel" of the brand

---

## Quick Navigation

- [🏠 Design System Hub](./design-system-index.md) - Main design system navigation
- [🎨 Section Visual Standards](../../development/standards/section-visual-standards.md) - Implementation details
- [🎨 Color System](../../branding/standards/color-system.md) - Brand colors
- [📐 Layout Standards](./layout-guide.md) - Spacing and layout

---

## 🎯 Why the Homepage Matters

The homepage represents the **complete design system** in action:

1. **Visual Foundation** - Establishes color usage, spacing, typography
2. **Component Library** - Showcases all major component patterns
3. **Interaction Patterns** - Demonstrates hover states, animations, transitions
4. **Responsive Behavior** - Shows mobile-first responsive implementation
5. **Accessibility** - Models proper semantic HTML and ARIA usage

**Key Principle:** When in doubt about design decisions, reference the homepage.

---

## 🏗️ Homepage Section Breakdown

### 1. Hero Section

**File:** [`src/components/home/HeroSection.tsx`](../../../src/components/home/HeroSection.tsx)

**Design Elements:**

- Full-screen height (`h-screen`)
- Dark gradient background: `from-gray-900 via-brand-primary to-gray-900`
- Overlay for readability: `from-brand-primary/30 via-gray-900/60 to-gray-900/80`
- Content positioned bottom-right with careful spacing
- Large mission icon (flag) with veteran theme
- Three-line tagline with color coding:
  - Line 1 (Brand Secondary): "Veteran-Owned Since January 2025"
  - Line 2 (Brand Primary): "Proven Craftsmanship"
  - Line 3 (White/Bronze): "Building for the Client, NOT the Dollar"

**Key Patterns:**

```tsx
// Bottom-right positioning
className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl"

// Tagline structure
<h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
  <span className="block text-brand-secondary">Line 1</span>
  <span className="block text-brand-primary">Line 2</span>
  <span className="block text-white/90">
    Line 3 with <span className="font-black italic text-bronze-300">NOT</span>
  </span>
</h1>
```

**Responsive Behavior:**

- Text scales from `text-base` (mobile) to `xl:text-4xl` (desktop)
- Margins increase progressively at each breakpoint
- Right-aligned text maintains visual anchor

---

### 2. Core Values Section

**File:** [`src/components/home/CoreValuesSection.tsx`](../../../src/components/home/CoreValuesSection.tsx)

**Background Pattern (Signature):**

```tsx
// Diagonal stripe pattern - appears on multiple homepage sections
<div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `repeating-linear-gradient(
        45deg,
        #386851 0px,
        #386851 2px,
        transparent 2px,
        transparent 60px
      )`,
    }}
  ></div>
</div>

// Large brand color blobs - signature homepage pattern
<div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
<div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>
```

**Section Header Pattern:**

```tsx
<div className="mb-16 sm:mb-20 text-center">
  {/* Icon with decorative lines */}
  <div className="flex items-center justify-center mb-8 gap-4">
    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
    <div className="relative">
      {/* Two-layer glow and icon container */}
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
      <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
        <MaterialIcon
          icon="shield"
          size="2xl"
          className="text-white drop-shadow-lg"
        />
      </div>
    </div>
    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
  </div>

  {/* Two-line gradient heading */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
      Veteran-Owned Values
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      Built on Honesty & Integrity
    </span>
  </h2>

  {/* Description with inline color highlights */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Four foundational values guide every{" "}
    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
      project and partnership
    </span>
    —focused on building for the{" "}
    <span className="font-bold text-gray-900 dark:text-white">
      client, NOT the dollar
    </span>
    .
  </p>
</div>
```

**Content Cards:**

- Alternating image/text layout (even index left, odd index right)
- Full-height responsive images with gradient overlays
- Icon badges positioned on images
- Detailed descriptions with feature lists

**Key Measurements:**

- Section padding: `py-12 sm:py-16 lg:py-20 xl:py-24`
- Header margin bottom: `mb-16 sm:mb-20`
- Card spacing: `space-y-12 lg:space-y-16`
- Image heights: `h-64 sm:h-80 lg:h-full lg:min-h-[500px]`

---

### 3. Why Partner Section

**File:** [`src/components/home/WhyPartnerSection.tsx`](../../../src/components/home/WhyPartnerSection.tsx)

**Uses identical background pattern** as Core Values (diagonal stripes + brand blobs)

**Content Structure:**

- 6 partnership value cards in 2-column grid
- Each card features:
  - Icon with gradient background
  - Title and subtitle
  - Description paragraph
  - 4 highlight bullets
  - Stat display with label

**Card Pattern:**

```tsx
<div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
  {/* Icon header with glow */}
  <div className="relative mb-6">
    <div className="absolute inset-0 bg-gradient-to-br from-bronze-600/20 to-bronze-800/20 blur-xl rounded-full"></div>
    <div className="relative w-16 h-16 bg-gradient-to-br from-bronze-600 to-bronze-800 rounded-xl flex items-center justify-center shadow-lg">
      <MaterialIcon icon="health_and_safety" size="xl" className="text-white" />
    </div>
  </div>

  {/* Title and subtitle */}
  <h3 className="font-black text-gray-900 dark:text-white text-xl sm:text-2xl mb-2">
    .64 EMR - Industry-Leading Safety
  </h3>
  <p className="font-semibold text-bronze-600 dark:text-bronze-400 text-sm sm:text-base mb-4">
    Every Team Member Returns Home Safe
  </p>

  {/* Description */}
  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6">
    Description text
  </p>

  {/* Highlight bullets */}
  <ul className="space-y-2 mb-6">
    {highlights.map((highlight) => (
      <li className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
        <MaterialIcon
          icon="check_circle"
          size="sm"
          className="text-bronze-600 flex-shrink-0 mt-0.5"
        />
        <span>{highlight}</span>
      </li>
    ))}
  </ul>

  {/* Stat display */}
  <div className="pt-4 border-t border-gray-300 dark:border-gray-600">
    <div className="text-center">
      <div className="text-3xl font-black text-bronze-600 dark:text-bronze-400">
        .64 EMR
      </div>
      <div className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wider">
        Safety Rating
      </div>
    </div>
  </div>
</div>
```

**Grid Layout:**

- Desktop: `grid-cols-1 md:grid-cols-2`
- Gap: `gap-6 lg:gap-8`
- Each card has hover lift effect: `hover:-translate-y-1`

---

### 4. Services Showcase Section

**File:** [`src/components/home/ServicesShowcase.tsx`](../../../src/components/home/ServicesShowcase.tsx)

**Same background patterns** (diagonal stripes + brand blobs)

**Section Header:** Uses bronze gradient variant

```tsx
<div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
  <MaterialIcon
    icon="explore"
    size="2xl"
    className="text-white drop-shadow-lg"
  />
</div>
```

**Service Cards:**

- 3-column grid on desktop: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Interactive cards with modal details
- Icon gradient varies per service
- Each card features:
  - Large icon with custom gradient
  - Title and subtitle
  - Description
  - Feature list
  - CTA button

**Unique Feature:** Modal system for expanded details

- Keyboard navigation (Escape to close)
- Body scroll lock when open
- Backdrop click to close
- Smooth transitions

---

### 5. Our Process Timeline Section

**Unique pattern** - only on homepage

**Structure:**

- Vertical timeline with center line on desktop
- Alternating left/right card layout
- 5 process steps
- Mobile: vertical flow with numbers on left

**Desktop Layout (3-column):**

```tsx
<div className="hidden lg:flex items-center gap-8">
  {/* Left: Content card OR Empty */}
  <div className="flex-1">{/* Card content */}</div>

  {/* Center: Numbered circle */}
  <div className="flex-shrink-0 relative z-10">
    <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900">
      1
    </div>
  </div>

  {/* Right: Content card OR Empty */}
  <div className="flex-1">{/* Card content */}</div>
</div>
```

**Step Card Pattern:**

```tsx
<div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-primary dark:group-hover:border-brand-primary-light">
  <div className="flex items-center justify-end gap-4 mb-4">
    <div>
      <h3 className="font-black text-gray-900 dark:text-white text-2xl mb-1">
        Pre-Construction Planning
      </h3>
    </div>
    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
      <MaterialIcon icon="engineering" size="xl" className="text-white" />
    </div>
  </div>
  <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
    Comprehensive site assessment, detailed scope development...
  </p>
</div>
```

**Color Alternation:**

- Steps 1, 3, 5: Primary green gradient
- Steps 2, 4: Secondary tan gradient

**Mobile Pattern:**

- Number badges on left
- Connecting gradient line between steps
- Cards on right in single column
- Simpler hover effects

---

### 6. Testimonials Section

**File:** [`src/components/shared-sections`](../../../src/components/shared-sections) (imported dynamically)

**Standard section pattern** with testimonial cards

- Uses consistent header with icon
- Quote cards with client information
- Star ratings
- Company/project details

---

### 7. Company Stats Section

**File:** [`src/components/about/CompanyStats.tsx`](../../../src/components/about/CompanyStats.tsx)

**Props used on homepage:**

```tsx
<CompanyStats
  id="stats"
  subtitle="Battle-Tested Excellence"
  title="Proven Track Record"
  description="Measurable results from a veteran-owned team..."
  variant="primary"
/>
```

**Stat Cards:**

- 4-column grid on desktop
- Icon with gradient background
- Large number display
- Label text
- Hover effects

---

### 8. Next Steps Section

**File:** [`src/components/shared-sections`](../../../src/components/shared-sections)

**Dark gradient background CTA:**

```tsx
<section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
```

**3 CTA Cards:**

- IRL Consultation (Primary)
- Automated Estimator (Secondary)
- General Inquiry (Neutral)

**Card Pattern:**

```tsx
<div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
  {/* Icon header */}
  {/* Title and description */}
  {/* Feature list with flex-grow */}
  {/* Button at bottom */}
</div>
```

---

## 🎨 Color Usage Patterns

### Primary Green (#386851)

**Where it appears:**

- Core Values icon header
- Step 1, 3, 5 in timeline
- Primary buttons
- Inline text highlights for "quality" and "expertise" themes

### Secondary Tan (#BD9264)

**Where it appears:**

- Hero tagline (line 1)
- Services icon header (via bronze gradient)
- Step 2, 4 in timeline
- Inline text highlights for "partnership" themes
- Secondary buttons

### Bronze (#CD7F32)

**Where it appears:**

- Hero "NOT" emphasis
- Why Partner icon headers
- Stats section accents
- Premium/achievement contexts

### Gradients

**Three-color gradients** (signature of homepage):

```tsx
// Header text gradients
from-brand-primary via-brand-secondary to-brand-primary

// Icon gradients
from-brand-primary via-brand-primary-dark to-brand-primary-darker
from-brand-secondary via-bronze-700 to-bronze-800

// Background gradients
from-brand-primary via-brand-primary-dark to-brand-secondary
```

---

## 📐 Spacing System

### Section Padding (Vertical)

```tsx
py-12 sm:py-16 lg:py-20 xl:py-24
// 48px → 64px → 80px → 96px
```

### Header Margins

```tsx
mb-16 sm:mb-20
// 64px → 80px (spacing after section header)
```

### Content Spacing

```tsx
space-y-12 lg:space-y-16
// 48px → 64px (between major content blocks)
```

### Grid Gaps

```tsx
gap-6 lg:gap-8
// 24px → 32px (between grid items)
```

---

## 🎭 Animation Patterns

### Scroll Reveal

```tsx
className="scroll-reveal"
style={{ animationDelay: `${index * 0.1}s` }}
```

### Hover Effects

**Card lift:**

```tsx
hover:-translate-y-1
hover:-translate-y-2
transition-all duration-300
```

**Icon rotation:**

```tsx
group-hover:rotate-6
group-hover:scale-110
transition-transform duration-300
```

**Shadow expansion:**

```tsx
shadow-lg hover:shadow-2xl
dark:hover:shadow-brand-primary/20
```

**Border color change:**

```tsx
border-gray-200 dark:border-gray-700
group-hover:border-brand-primary dark:group-hover:border-brand-primary-light
```

---

## 📱 Responsive Patterns

### Typography Scaling

```tsx
// Main titles
text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl

// Subtitles
text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl

// Body text
text-base sm:text-lg md:text-xl lg:text-2xl
```

### Layout Shifts

**Grid columns:**

```tsx
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

**Flex direction:**

```tsx
flex-col lg:flex-row
```

**Hidden/shown:**

```tsx
hidden lg:block  // Desktop only
lg:hidden        // Mobile only
```

### Spacing Progression

Spacing increases at each breakpoint:

- Mobile: Smallest values
- Tablet (sm): +25-33%
- Desktop (lg): +50%
- Large (xl): +100% in some cases

---

## 🎯 Implementation Checklist

### For New Pages

- [ ] Use homepage background patterns (diagonal stripes OR gradient)
- [ ] Include brand color blobs for depth
- [ ] Apply consistent section headers with icons
- [ ] Use two-line gradient headings
- [ ] Add inline color highlights in descriptions
- [ ] Maintain responsive typography scale
- [ ] Include hover effects on interactive elements
- [ ] Apply consistent spacing (py-12 sm:py-16 lg:py-20 xl:py-24)
- [ ] Test in both light and dark modes
- [ ] Verify mobile responsiveness

### For Components

- [ ] Match icon sizing from homepage
- [ ] Use MaterialIcon with size prop (not text classes)
- [ ] Apply gradient patterns for visual interest
- [ ] Include shadow/glow layers
- [ ] Add smooth transitions
- [ ] Implement hover states
- [ ] Test accessibility (keyboard nav, screen readers)

---

## 🔗 Related Documentation

- [Section Visual Standards](../../development/standards/section-visual-standards.md) - Detailed implementation
- [Color System](../../branding/standards/color-system.md) - Complete color reference
- [Icon System](./icon-system-complete.md) - Icon usage guidelines
- [Layout Guide](./layout-guide.md) - Spacing and containers
- [Typography Examples](./typography-examples-clean.md) - Text patterns
- [Button & CTA Guide](./buttons-ctas-complete-guide.md) - Interactive elements

---

## ❓ FAQs

**Q: Can I modify these patterns?**
A: Minor adjustments for specific content needs are fine, but major deviations should be discussed. The homepage patterns ensure consistency.

**Q: What if my section doesn't fit any homepage pattern?**
A: Reference the closest matching section and adapt. Document new patterns for future reference.

**Q: Do I need to use all background effects?**
A: Diagonal stripes + brand blobs is the homepage standard, but simpler pages can use just gradients. Stay consistent within a page.

**Q: How do I choose between primary, secondary, and bronze?**
A: Follow semantic meaning: Primary (trust/quality), Secondary (partnership), Bronze (excellence/achievement). See color usage section above.

---

**Version History:**

- **1.0.0** (December 17, 2025): Initial comprehensive homepage reference guide

---

**Maintained by:** Development Team  
**Questions?** Review the homepage source code in [src/app/page.tsx](../../../src/app/page.tsx) and component files in [src/components/home/](../../../src/components/home/)
