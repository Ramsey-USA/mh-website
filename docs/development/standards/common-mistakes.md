# Common Development Mistakes & Solutions

**Purpose:** Learn from common errors to avoid repeated issues  
**Version:** 1.0.0  
**Last Updated:** March 15, 2026  
**Use Case:** Reference before starting work to avoid known pitfalls

---

## 🎯 Typography Mistakes

### ❌ Mistake #1: Missing overflow-visible on Gradient Text

**Problem:** Gradient text gets clipped at edges, especially on larger screens

**Wrong:**

```tsx
<h2 className="text-3xl sm:text-5xl lg:text-7xl">
  <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
    Title Text
  </span>
</h2>
```

**Correct:**

```tsx
<h2 className="text-3xl sm:text-5xl lg:text-7xl overflow-visible">
  <span className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent overflow-visible py-2 pb-3">
    Title Text
  </span>
</h2>
```

**Why:** Without `overflow-visible`, gradient rendering can be cut off. Add to container AND gradient span, plus padding.

---

### ❌ Mistake #2: Single-Line Section Headers

**Problem:** Not following the two-line gradient pattern

**Wrong:**

```tsx
<h2 className="text-4xl font-bold text-brand-primary">Section Title</h2>
```

**Correct:**

```tsx
<h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
    Subtitle Text
  </span>
  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
    Main Title Text
  </span>
</h2>
```

**Why:** Two-line pattern is the official standard for visual consistency.

---

### ❌ Mistake #3: Using text-brand-secondary for Body Text

**Problem:** Poor contrast on normal-sized text (fails WCAG AA)

**Wrong:**

```tsx
<p className="text-brand-secondary">
  This body text has poor contrast (2.82:1 ratio)
</p>
```

**Correct:**

```tsx
{
  /* For body text */
}
<p className="text-brand-secondary-text">
  This text has proper contrast (4.59:1 ratio)
</p>;

{
  /* For large headings (18pt+) - brand-secondary is OK */
}
<h1 className="text-4xl text-brand-secondary">Large Heading Text</h1>;
```

**Why:** `text-brand-secondary` (#BD9264) only has 2.82:1 contrast - safe ONLY for large text (18pt+).

---

### ❌ Mistake #4: Using Deprecated text-brand-accent

**Problem:** Using a color that was removed from the design system

**Wrong:**

```tsx
<span className="text-brand-accent">Highlighted text</span>
```

**Correct:**

```tsx
<span className="text-brand-primary">Highlighted text</span>;
{
  /* OR */
}
<span className="text-brand-secondary">Large highlighted text</span>;
```

**Why:** `brand-accent` was removed due to inconsistency. Use `brand-primary` or `brand-secondary`.

---

## 🎴 Card Component Mistakes

### ❌ Mistake #5: Using Old Card Component

**Problem:** Using deprecated `<Card>` component instead of modern structure

**Wrong:**

```tsx
<Card className="border-l-4 border-l-brand-primary">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

**Correct:**

```tsx
<div className="group relative flex h-full">
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>
    <div className="p-6 sm:p-8 flex flex-col flex-1">{/* Content */}</div>
  </div>
</div>
```

**Why:** Modern card structure provides animated glows, better hover effects, and consistent styling.

---

### ❌ Mistake #6: Missing Top Accent Bar on Cards

**Problem:** Cards don't have the required h-2 gradient strip

**Wrong:**

```tsx
<div className="bg-white rounded-xl p-6">
  <h3>Card Title</h3>
  <p>Content</p>
</div>
```

**Correct:**

```tsx
<div className="bg-white rounded-xl overflow-hidden">
  {/* Top Accent Bar - REQUIRED */}
  <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

  <div className="p-6">
    <h3>Card Title</h3>
    <p>Content</p>
  </div>
</div>
```

**Why:** Top accent bar is a defining feature of MH modern card design.

---

### ❌ Mistake #7: Forgetting Nested Icon Blur Layers

**Problem:** Icons don't have the enhanced glow effect

**Wrong:**

```tsx
<div className="bg-brand-primary rounded-xl p-3">
  <MaterialIcon icon="star" size="xl" className="text-white" />
</div>
```

**Correct:**

```tsx
<div className="relative inline-block mb-4 mx-auto">
  {/* Outer blur layer */}
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>

  {/* Inner icon container */}
  <div className="relative rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
    <MaterialIcon icon="star" size="xl" className="text-white drop-shadow-lg" />
  </div>
</div>
```

**Why:** Nested blur layers create the premium glow effect that defines MH card icons.

---

## 🎯 Icon & Emoji Mistakes

### ❌ Mistake #8: Using Emojis in TSX/JSX Files

**Problem:** Violates the strict emoji-free policy for source code

**Wrong:**

```tsx
<span>✅ Complete</span>
<h3>🎯 Our Goals</h3>
<p>Great work! 👍</p>
{/* Comment: ✓ Done */}
```

**Correct:**

```tsx
<MaterialIcon icon="check_circle" className="text-brand-primary" />
<h3><MaterialIcon icon="target" className="mr-2" />Our Goals</h3>
<p>Great work! <MaterialIcon icon="thumb_up" /></p>
{/* Comment: Complete */}
```

**Why:** Material Icons provide consistent, scalable, theme-aware iconography. Emojis are ONLY allowed in .md files.

---

### ❌ Mistake #9: Inconsistent Icon Sizes

**Problem:** Using random size values instead of standardized sizes

**Wrong:**

```tsx
<MaterialIcon icon="star" className="text-[42px]" />
<MaterialIcon icon="verified" style={{ fontSize: '2.5rem' }} />
```

**Correct:**

```tsx
<MaterialIcon icon="star" size="xl" />
<MaterialIcon icon="verified" size="2xl" />
```

**Standard Sizes:** `xs` (20px), `sm` (24px), `md` (30px), `lg` (36px), `xl` (48px), `2xl` (60px),
`3xl` (72px), `4xl` (96px), `5xl` (120px)

**Why:** Standardized sizes ensure consistency and proper scaling.

---

## 🎨 Background & Layout Mistakes

### ❌ Mistake #10: Inconsistent Section Padding

**Problem:** Using various padding values across different sections

**Wrong:**

```tsx
<section className="py-20">...</section>
<section className="py-16 lg:py-24">...</section>
<section className="py-12 lg:py-32">...</section>
```

**Correct:**

```tsx
<section className="py-12 sm:py-16 lg:py-20 xl:py-24">...</section>
<section className="py-12 sm:py-16 lg:py-20 xl:py-24">...</section>
<section className="py-12 sm:py-16 lg:py-20 xl:py-24">...</section>
```

**Why:** Consistent padding creates rhythm and professional spacing throughout the site.

---

### ❌ Mistake #11: Missing DiagonalStripePattern

**Problem:** Section doesn't include required background pattern

**Wrong:**

```tsx
<section className="bg-white py-20">
  <div className="container">{/* Content */}</div>
</section>
```

**Correct:**

```tsx
<section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
  {/* Diagonal Stripe Pattern - REQUIRED */}
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

  {/* Brand Blobs - REQUIRED */}
  <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
  <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

  <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Content */}
  </div>
</section>
```

**Why:** DiagonalStripePattern + BrandColorBlobs are the standard background for all sections.

---

### ❌ Mistake #12: Using Small Animated Blobs

**Problem:** Using deprecated small blobs with pulse animation

**Wrong:**

```tsx
<div className="absolute top-20 right-20 bg-brand-primary/5 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
```

**Correct:**

```tsx
<div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
```

**Why:** Large static blobs (w-96 h-96) replaced small animated ones in the new standard.

---

## 🔗 Navigation & Structure Mistakes

### ❌ Mistake #13: Missing Section IDs

**Problem:** PageNavigation can't scroll to sections

**Wrong:**

```tsx
<section className="py-20">
  <h2>Our Services</h2>
  {/* Content */}
</section>
```

**Correct:**

```tsx
<section
  id="services"
  className="relative bg-white py-12 sm:py-16 lg:py-20 xl:py-24"
>
  <h2>Our Services</h2>
  {/* Content */}
</section>
```

**Why:** PageNavigation uses `href="#section-id"` - sections MUST have IDs.

---

### ❌ Mistake #14: Not Including NextStepsSection

**Problem:** Missing the required conversion CTA at page bottom

**Wrong:**

```tsx
export default function MyPage() {
  return (
    <>
      {/* Hero */}
      {/* Content sections */}
      {/* Missing NextStepsSection */}
    </>
  );
}
```

**Correct:**

```tsx
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

export default function MyPage() {
  return (
    <>
      {/* Hero */}
      {/* Content sections */}

      {/* Next Steps Section - REQUIRED */}
      <NextStepsSection />
    </>
  );
}
```

**Why:** NextStepsSection is the unified conversion point that should appear on ALL major pages.

---

### ❌ Mistake #15: Missing Breadcrumbs on Non-Homepage

**Problem:** SEO and navigation suffer without breadcrumbs

**Wrong:**

```tsx
export default function AboutPage() {
  return (
    <>
      <AboutHero />
      {/* Missing breadcrumbs */}
      {/* Content */}
    </>
  );
}
```

**Correct:**

```tsx
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";

export default function AboutPage() {
  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.about),
          ),
        }}
      />

      <AboutHero />

      {/* Breadcrumb Navigation */}
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

      {/* Content */}
    </>
  );
}
```

**Why:** Breadcrumbs improve SEO and user navigation (except on homepage).

---

## ⚡ Performance Mistakes

### ❌ Mistake #16: Not Lazy-Loading Below-Fold Components

**Problem:** Loading all components immediately hurts performance

**Wrong:**

```tsx
import { TestimonialsSection } from "@/components/shared-sections";
import { NextStepsSection } from "@/components/shared-sections";

export default function MyPage() {
  return (
    <>
      <Hero />
      <TestimonialsSection />
      <NextStepsSection />
    </>
  );
}
```

**Correct:**

```tsx
import dynamic from "next/dynamic";

// Lazy load below-fold components
const TestimonialsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  { ssr: false },
);

const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

export default function MyPage() {
  return (
    <>
      <Hero />
      <TestimonialsSection />
      <NextStepsSection />
    </>
  );
}
```

**Why:** Below-fold content should be lazy-loaded to improve initial page load time.

---

### ❌ Mistake #17: Missing Loading Skeletons

**Problem:** Lazy-loaded components show nothing while loading

**Wrong:**

```tsx
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  ssr: false,
});
```

**Correct:**

```tsx
const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-800" />
  ),
});
```

**Why:** Loading skeletons provide visual feedback and improve perceived performance.

---

## 🌙 Dark Mode Mistakes

### ❌ Mistake #18: Missing Dark Mode Variants

**Problem:** Text/backgrounds don't adapt to dark mode

**Wrong:**

```tsx
<div className="bg-white">
  <h2 className="text-gray-900">Title</h2>
  <p className="text-gray-700">Content</p>
</div>
```

**Correct:**

```tsx
<div className="bg-white dark:bg-gray-900">
  <h2 className="text-gray-900 dark:text-gray-100">Title</h2>
  <p className="text-gray-700 dark:text-gray-300">Content</p>
</div>
```

**Why:** All color classes need dark mode variants for proper theme support.

---

## 📱 Responsive Design Mistakes

### ❌ Mistake #19: Fixed Text Sizes

**Problem:** Text doesn't scale responsively

**Wrong:**

```tsx
<h2 className="text-4xl">Section Title</h2>
<p className="text-base">Body text</p>
```

**Correct:**

```tsx
<h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
  Section Title
</h2>
<p className="text-sm sm:text-base md:text-lg">
  Body text
</p>
```

**Why:** Mobile-first responsive scaling ensures readability on all devices.

---

### ❌ Mistake #20: Forgetting overflow-hidden on Sections

**Problem:** Background effects cause horizontal scroll

**Wrong:**

```tsx
<section className="relative py-20">
  {/* Large blobs that extend beyond viewport */}
</section>
```

**Correct:**

```tsx
<section className="relative py-20 overflow-hidden">
  {/* Large blobs contained properly */}
</section>
```

**Why:** `overflow-hidden` prevents background effects from causing unwanted scrolling.

---

## 🎯 SEO & Analytics Mistakes

### ❌ Mistake #21: Missing Page Tracking

**Problem:** Analytics don't record page views

**Wrong:**

```tsx
export default function MyPage() {
  return <>{/* Content */}</>;
}
```

**Correct:**

```tsx
import { usePageTracking } from "@/lib/analytics/hooks";

export default function MyPage() {
  usePageTracking("MyPage"); // Track page view

  return <>{/* Content */}</>;
}
```

**Why:** Page tracking is essential for understanding user behavior.

---

### ❌ Mistake #22: Missing Structured Data

**Problem:** Search engines can't properly index page

**Wrong:**

```tsx
export default function MyPage() {
  return <>{/* Content */}</>;
}
```

**Correct:**

```tsx
import { StructuredData } from "@/components/seo/seo-meta";
import { getMyPageSEO } from "@/lib/seo/page-seo-utils";

export default function MyPage() {
  const pageSEO = getMyPageSEO();

  return (
    <>
      {pageSEO.schemas && <StructuredData data={pageSEO.schemas} />}
      {/* Content */}
    </>
  );
}
```

**Why:** Structured data improves SEO and search result appearance.

---

## 🔗 Quick Reference

**Most Common Mistakes (Fix These First):**

1. Missing `overflow-visible` on gradient text
2. Using emojis in TSX files
3. Old Card component instead of modern structure
4. Missing top accent bar on cards
5. Inconsistent section padding
6. Missing DiagonalStripePattern background
7. Not including NextStepsSection
8. Missing section IDs
9. Text-brand-secondary on body text
10. Missing dark mode variants

---

## 📚 Related Documentation

- [Component Cheatsheet](../../quick-reference/component-cheatsheet.md) - Correct patterns
- [Page Compliance Checklist](./page-compliance-checklist.md) - Systematic audit
- [Page Template Guide](./page-template-guide.md) - Correct boilerplate
- [Unified Component Standards](../../../branding/standards/unified-component-standards.md) - Official standard

---

**Last Updated:** March 15, 2026  
**Maintained by:** MH Construction Development Team  
**Have a mistake to add?** Submit a PR or notify the team
