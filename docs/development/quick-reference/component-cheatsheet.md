# MH Construction Component Cheatsheet

**Category:** Development - Quick Reference  
**Version:** 1.0.0  
**Last Updated:** December 28, 2025  
**Status:** ✅ Active  
**Reference Standard:** [Homepage](../../technical/homepage.md) - Your page should match this level of polish  
**Related:** [Unified Component Standards](../../branding/standards/unified-component-standards.md)

---

## ⚠️ Critical: Cohesiveness Checklist

Before using any pattern below, verify your page matches homepage quality:

- [ ] **Visual Weight:** Does your page feel as substantial as the homepage? (Same backgrounds, spacing, depth)
- [ ] **Animation Consistency:** Do elements fade/slide in like the homepage? (Same timing, easing)
- [ ] **Typography Hierarchy:** Are text sizes proportional to homepage? (Same scale: text-sm → text-5xl)
- [ ] **Spacing Rhythm:** Does padding/margin match homepage? (py-12 sm:py-16 lg:py-20 xl:py-24)
- [ ] **Color Depth:** Do gradients/shadows match homepage intensity? (Same blur-xl, opacity values)
- [ ] **Icon Treatment:** Are icons same size/weight as homepage? (w-16 h-16, font-weight-500)
- [ ] **Card Style:** Do cards look identical to homepage cards? (Same border, shadow, hover states)

**If any checkmark is missing, your page will feel "off" compared to homepage. Use patterns below exactly as shown.**

---

## 🎯 Quick Decision Tree

**Need to display content?**

- Hero section → Use hero pattern (3 variants available)
- Section header → Two-line gradient with icon
- List of items → Modern card grid
- Sequential steps → Timeline component
- Image + text pairs → AlternatingShowcase
- Page bottom CTA → NextStepsSection (REQUIRED)

---

## 📐 Section Structure (COPY-PASTE READY)

### Standard Section Template

```tsx
<section
  id="section-id"
  className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
>
  {/* Diagonal Stripe Background Pattern - REQUIRED */}
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

  {/* Large Brand Color Blobs - REQUIRED */}
  <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
  <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

  <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Content here */}
  </div>
</section>
```

**Key Points:**

- ✅ ALWAYS include: `overflow-hidden` on section
- ✅ ALWAYS include: Diagonal stripes + brand blobs
- ✅ ALWAYS use: `py-12 sm:py-16 lg:py-20 xl:py-24` padding
- ❌ NEVER use: Complex gradients on base, small animated blobs

---

## 📝 Section Headers (Two-Line Gradient Pattern)

### Standard Header with Icon

```tsx
<div className="mb-16 sm:mb-20 text-center">
  {/* Icon with decorative lines */}
  <div className="flex items-center justify-center mb-8 gap-4">
    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
    <div className="relative">
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

  {/* Two-line gradient heading - CRITICAL: overflow-visible */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
      Subtitle Text
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      Main Title Text
    </span>
  </h2>

  {/* Description */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Description text here
  </p>
</div>
```

**Critical Requirements:**

- ✅ MUST include `overflow-visible` on h2 container and both spans
- ✅ MUST use two-line pattern: subtitle (solid) + title (gradient)
- ✅ MUST include icon with blur glow layer
- ❌ NEVER use solid color on main title
- ❌ NEVER omit overflow-visible (causes gradient clipping)

**Icon Color Variants:**

```tsx
// Green (primary) - Trust, values, safety
from-brand-primary via-brand-primary-dark to-brand-primary-darker

// Bronze - Awards, achievements, veteran content
from-brand-secondary via-bronze-700 to-bronze-800

// Tan - Partnerships, relationships
from-brand-secondary via-brand-secondary-dark to-bronze-700
```

---

## 🎴 Modern Card Structure

### Standard Card (Green Theme)

```tsx
<div className="group relative flex h-full">
  {/* Animated Border Glow */}
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
    {/* Top Accent Bar - REQUIRED */}
    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

    <div className="p-6 sm:p-8 flex flex-col flex-1">
      {/* Enhanced Icon with Nested Blur Layers */}
      <div className="relative inline-block mb-4 mx-auto">
        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
        <div className="relative rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
          <MaterialIcon
            icon="verified"
            size="xl"
            className="text-white drop-shadow-lg"
          />
        </div>
      </div>

      {/* Card Title */}
      <h3 className="mb-3 text-center font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
        Card Title
      </h3>

      {/* Card Content */}
      <p className="mb-4 text-center text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg leading-relaxed">
        Card description content
      </p>
    </div>
  </div>
</div>
```

**Key Points:**

- ✅ MUST include: Animated border glow with blur-xl
- ✅ MUST include: h-2 top accent bar
- ✅ MUST include: Nested blur layers on icon
- ✅ MUST use: group hover effects (scale-110, border-transparent, shadow-2xl)
- ❌ NEVER use: Old `<Card>` component
- ❌ NEVER omit: Top accent bar

**Color Theme Variants:**

```tsx
// Bronze/Tan Theme
from-brand-secondary/40 to-bronze-700/40  // Border glow
from-brand-secondary via-bronze-700 to-brand-secondary  // Top accent

// Emergency/Urgent (ONLY on /urgent page)
from-orange-500/40 to-orange-600/40  // Border glow
from-orange-500 via-orange-600 to-orange-700  // Top accent

// Government (ONLY on /public-sector page)
from-slate-600/40 to-gray-700/40  // Border glow
from-slate-600 via-gray-700 to-slate-600  // Top accent
```

---

## 🎯 Material Icons Usage

### Import & Basic Usage

```tsx
import { MaterialIcon } from "@/components/icons/MaterialIcon";

<MaterialIcon icon="verified" size="xl" className="text-brand-primary" />;
```

**Standard Sizes:**

- `sm` - Small (16px) - Inline with text
- `md` - Medium (24px) - Default size
- `lg` - Large (32px) - Card icons
- `xl` - Extra Large (48px) - Feature icons
- `2xl` - 2X Large (64px) - Section header icons
- `3xl` - 3X Large (96px) - Hero icons

**Common Icons:**

```tsx
// Trust & Safety
<MaterialIcon icon="verified" />
<MaterialIcon icon="shield" />
<MaterialIcon icon="health_and_safety" />

// Military/Veteran
<MaterialIcon icon="military_tech" />
<MaterialIcon icon="flag" />

// Actions
<MaterialIcon icon="phone" />
<MaterialIcon icon="email" />
<MaterialIcon icon="event" />
<MaterialIcon icon="arrow_forward" />

// Status
<MaterialIcon icon="check_circle" />
<MaterialIcon icon="task_alt" />
```

**CRITICAL POLICY:**

- ✅ USE: Material Icons in all .tsx/.jsx/.ts/.js files
- ❌ NEVER USE: Emojis in source code files
- ✅ ALLOWED: Emojis only in .md documentation files

---

## 🔘 Button Standards

### Standard Button Usage

```tsx
import { Button } from "@/components/ui";

<Button
  variant="primary"
  size="default"
  className="group transition-all duration-300"
>
  <MaterialIcon icon="phone" className="mr-2 group-hover:scale-110" />
  Button Text
</Button>;
```

**Variants:**

- `primary` - Green, main actions
- `secondary` - Tan, secondary actions
- `outline` - Bordered, tertiary actions
- `neutral` - Gray, cancel actions

**Sizes:**

- `sm` - Small buttons
- `default` - Standard size
- `lg` - Large buttons
- `xl` - Extra large CTAs

---

## 📱 Responsive Typography Scale

### Quick Reference

```tsx
// Hero Titles (H1)
className =
  "text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl";

// Section Headers (H2 main title)
className = "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl";

// Section Headers (H2 subtitle)
className = "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl";

// Subsection Headers (H3)
className = "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl";

// Card Titles (H4)
className = "text-lg sm:text-xl md:text-2xl";

// Body Large (Section descriptions)
className = "text-base sm:text-lg md:text-xl lg:text-2xl";

// Body Default (Card content)
className = "text-sm sm:text-base md:text-lg";

// Body Small (Fine print)
className = "text-xs sm:text-sm md:text-base";
```

**Font Weights:**

- Hero titles: `font-black` (900)
- Section main titles: `font-black` (900)
- Section subtitles: `font-semibold` (600)
- Card titles: `font-bold` (700)
- Body text: `font-normal` (400)
- Descriptions: `font-light` (300)

---

## 🎨 Color Usage Quick Reference

### Brand Colors

```tsx
// Primary (Hunter Green) - Trust, integrity, safety
text - brand - primary; // 6.43:1 contrast - Use for all text sizes
bg - brand - primary;

// Secondary (Leather Tan) - Large text only (18pt+)
text - brand - secondary; // 2.82:1 contrast - ONLY for headings 18pt+
bg - brand - secondary;

// Secondary Text (Accessible Tan) - Normal text
text - brand - secondary - text; // 4.59:1 - Use for body text
text - secondary - 700; // Alternative
```

**Accessibility Rules:**

- ✅ `text-brand-primary` - Safe for all text sizes
- ✅ `text-brand-secondary` - Only for text 18pt+ or headings
- ✅ `text-brand-secondary-text` - Safe for body text
- ❌ `text-brand-accent` - DEPRECATED, do not use

### Context-Specific Colors

```tsx
// Emergency/Urgent (/urgent page ONLY)
(text - orange - 600, bg - orange - 600);
(text - red - 600, bg - red - 600);

// Government (/public-sector page ONLY)
(text - slate - 600, bg - slate - 600);
(text - gray - 700, bg - gray - 700);
```

---

## ⚡ Required Imports for New Pages

### Standard Page Imports

```tsx
"use client";

import dynamic from "next/dynamic";
import { usePageTracking } from "@/lib/analytics/hooks";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/seo-meta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

// Lazy load below-fold components
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);
```

---

## 🚀 NextStepsSection (REQUIRED)

Every major page MUST end with NextStepsSection:

```tsx
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

export default function YourPage() {
  return (
    <>
      {/* Your page content */}

      {/* NextStepsSection - REQUIRED at bottom */}
      <NextStepsSection />
    </>
  );
}
```

**Why Required:**

- Unified conversion point across all pages
- 4-card grid: PitchDeck, View Work, Get Estimate, Contact
- Consistent user experience
- Appears on: Home, About, Services, Projects, Team, FAQ, Veterans, etc.

---

## 📊 Grid Layout Presets

```tsx
// 3-column grid (most common)
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8";

// 4-column grid (for 6+ items)
className =
  "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8";

// 2-column grid
className = "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8";
```

**Philosophy:** Prefer 3-4 columns on large screens for better visual balance.

---

## 🎭 Animation Standards

```tsx
// Section fade-in
<FadeInWhenVisible>
  {/* Content */}
</FadeInWhenVisible>

// Hover effects
className="transition-all duration-300 hover:scale-105 hover:shadow-2xl"

// Group interactions
<div className="group">
  <MaterialIcon className="group-hover:scale-110 transition-transform duration-300" />
</div>
```

**Standard Duration:** `duration-300` for all transitions

---

## ❌ Common Mistakes (AVOID)

```tsx
// ❌ WRONG: Missing overflow-visible on gradient text
<span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">

// ✅ CORRECT: Include overflow-visible
<span className="bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent overflow-visible py-2">

// ❌ WRONG: Using emojis in TSX
<span>✅ Complete</span>

// ✅ CORRECT: Use Material Icons
<MaterialIcon icon="check_circle" className="text-brand-primary" />

// ❌ WRONG: Old card component
<Card><CardContent>...</CardContent></Card>

// ✅ CORRECT: Modern card structure
<div className="group relative flex h-full">
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40...">

// ❌ WRONG: Inconsistent padding
className="py-20 lg:py-32"

// ✅ CORRECT: Standard padding
className="py-12 sm:py-16 lg:py-20 xl:py-24"

// ❌ WRONG: Missing top accent bar on card
<div className="bg-white rounded-xl">

// ✅ CORRECT: Include h-2 accent bar
<div className="bg-white rounded-xl">
  <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

// ❌ WRONG: Using text-brand-accent
className="text-brand-accent"

// ✅ CORRECT: Use brand-primary or brand-secondary
className="text-brand-primary"
```

---

## 🔗 Related Documentation

- [Unified Component Standards](../../branding/standards/unified-component-standards.md) - Complete standard
- [Page Compliance Checklist](../standards/page-compliance-checklist.md) - Audit tool
- [Page Template Guide](../standards/page-template-guide.md) - New page boilerplate
- [Common Mistakes](../standards/common-mistakes.md) - What to avoid

---

**Last Updated:** December 28, 2025  
**Maintained by:** MH Construction Development Team
