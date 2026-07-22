# Page Template Guide

**Category:** Development - Page Scaffolding  
**Last Updated:** June 20, 2026  
**Status:** ✅ Active
**Canonical Sources:**

- [../components/template-components.md](../components/template-components.md)
- [./page-compliance-checklist.md](./page-compliance-checklist.md)
- [./universal-page-flow-standard.md](./universal-page-flow-standard.md)
  **Consolidation Rule:** Keep this file focused on end-to-end page scaffolding; keep reusable section APIs in template-components docs.

**Purpose:** Copy-paste boilerplate for creating new MH-standard pages  
**Version:** 1.1.0  
**Reference:** [Homepage](../../technical/homepage.md) - Your page must match this quality level  
**Quick Start:** Copy the template below and customize for your page

**Brand Congruency:** New page scaffolds must keep typography, color usage, trust content, and naming aligned with canonical MH standards.

---

## 🎯 What "Cohesive with Homepage" Means

Your new page should be **indistinguishable in quality** from the homepage. A
visitor should not be able to tell which page was built first.

### Visual Indicators of Cohesiveness

**✅ COHESIVE (Matches Homepage):**

- Same depth: one centered MH logo watermark background on every non-hero section
- Same rhythm: py-12 sm:py-16 lg:py-20 xl:py-24 spacing everywhere
- Same animations: FadeInWhenVisible wrapping all major content
- Same typography scale: text-4xl → text-5xl for headers, text-lg for body
- Same card style: Animated border glow + h-2 accent bars + nested icon blurs
- Same icon treatment: w-16 h-16 with double-blur layers (bg + gradient)

**❌ NOT COHESIVE (Feels Different):**

- Flat non-hero backgrounds without the MH logo paraplex layer
- Repeated/tiled logo marks instead of one centered watermark
- Inconsistent spacing (py-8, py-16, py-32 mixed randomly)
- No animations or different animation timing
- Smaller/larger text than homepage (text-3xl, text-6xl for main headers)
- Plain cards without glows or different border styles
- Icons without blur effects or different sizes

**Example:** Compare two sections side-by-side with homepage - they should look
like siblings, not cousins.

---

## 🚀 Quick Start Workflow

1. **Identify page intent** using the universal flow standard
2. **Copy the full template** from section below
3. **Replace placeholders** (search for `YOUR_PAGE_NAME`, `Your Page Title`, etc.)
4. **Customize hero section** (icon, title, description)
5. **Map body sections to Discover -> Trust -> Proof -> Action**
6. **Add content sections using BrandedContentSection** (eliminates 68 lines of
   boilerplate per section)
7. **Decide whether the page should stay focused or split into smaller pages**
8. **Run compliance checklist** (see page-compliance-checklist.md)
9. **Test responsiveness** (mobile, tablet, desktop)

**Pro Tip:** Use BrandedContentSection component instead of manual section
markup - it automatically includes all required patterns
(DiagonalStripePattern single-logo watermark, gradient headers) and reduces code by 82%.

**Non-coder explanation:** BrandedContentSection is the "fancy section with
gold/green gradient titles and background patterns" - it's pre-made so
developers don't code the same thing 26 times.

### Shared Shell First Rule

When scaffolding new pages:

1. Start with shared section shells (`BrandedContentSection`, `NextStepsSection`, other shared wrappers).
2. Use manual section markup only when the shared shell cannot represent the required layout.
3. If using deferred sections, ensure loading placeholders inherit final section className/variant.

### CTA Composition Rule

Use `Button asChild` with `Link` for route CTAs in templates.

```tsx
// ✅ Preferred
<Button asChild variant="primary" size="lg">
  <Link href="/contact">Contact Our Team</Link>
</Button>
```

---

## Mandatory Page Architecture

## Global Header Rule

All new pages inherit the unified global header from `Navigation.tsx`.

- Do not add phone/contact CTA buttons to hero content areas unless a documented exception is approved.
- Keep hero layouts visually compatible with the logo-first global header experience on phones.
- Assume the MH logo must remain the dominant header element at narrow widths.
- Use hero content for orientation and value proposition, not redundant header controls.

Every page body must follow the MH universal page flow standard:

```text
Discover -> Trust -> Proof -> Action
```

Use that sequence before choosing individual section types.

### What each stage means

1. **Discover**: Show what the page is about and who it is for.
2. **Trust**: Explain why MH is credible in this context.
3. **Proof**: Validate the claims with evidence.
4. **Action**: Present the clearest next step.

### Page planning rules

1. The first body section must orient the visitor.
2. Do not stack multiple sections with the same narrative job unless each one adds new decision value.
3. If the page contains multiple audiences or multiple CTA paths, split it into smaller intent-based pages instead of adding more sections.
4. Keep `NextStepsSection` as the final major section, but add a stronger primary CTA earlier when needed.
5. Route partner-intent visitors to `/allies` after enough context has been established.

---

## 📄 Full Page Template (Copy-Paste Ready)

```tsx
"use client";

import dynamic from "next/dynamic";
import { usePageTracking } from "@/lib/analytics/hooks";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { BrandedContentSection } from "@/components/templates"; // ⭐ RECOMMENDED: Eliminates 68 lines of boilerplate
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { getYourPageSEO } from "@/lib/seo/page-seo-utils"; // Create this function

// Lazy load below-fold components for performance
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);

// Add other lazy-loaded components as needed
const TestimonialsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  { ssr: false },
);

export default function YourPageName() {
  // Analytics tracking
  usePageTracking("YourPageName"); // e.g., "About", "Services", "Contact"

  // Get SEO data for this page
  const pageSEO = getYourPageSEO(); // Implement in /lib/seo/page-seo-utils.ts

  return (
    <>
      {/* SEO Structured Data */}
      {pageSEO.schemas && pageSEO.schemas.length > 0 && (
        <StructuredData data={pageSEO.schemas} />
      )}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.yourpage), // Add to breadcrumbPatterns
          ),
        }}
      />

      {/* Page Container */}
      <div className="relative bg-white dark:bg-gray-900 w-full min-h-screen overflow-x-hidden">
        {/* Hero Section */}
        <section className="hero-section relative flex items-end justify-end overflow-hidden bg-gray-950 text-white">
          {/* Background treatment */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/15 via-gray-900/35 to-gray-900/50"></div>

          {/* Hero Content */}
          <div className="hero-safe-top hero-safe-bottom relative z-10 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none sm:w-[min(88vw,44rem)] sm:max-w-176">
            <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
              <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                <span className="mb-1 block text-brand-secondary">Your Page -> Command Center</span>
                <span className="mb-1 block text-brand-secondary/90">Your page-specific supporting slogan</span>
                <span className="block text-white">Built on Quality, Backed by Trust.</span>
              </h1>

              <div className="pointer-events-auto mt-4 flex flex-wrap justify-end gap-2 sm:gap-3">
                <a className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-4 py-2 text-xs sm:text-sm font-bold text-gray-900">
                  Primary action
                </a>
                <a className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-4 py-2 text-xs sm:text-sm font-bold text-white">
                  Secondary proof path
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Page Heading — navigation and breadcrumb live here, never inside the hero */}
        {/* PageNavigation provides in-page wayfinding (optional, route-specific) */}
        <PageNavigation
          items={navigationConfigs.yourpage}
          showRemainingPagesOverlay
        />

        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Your Page Title" }]}
          className="bg-gray-50 dark:bg-gray-800"
        />

        {/* Main Content Sections */}

        {/* Section 1: Using BrandedContentSection (RECOMMENDED) */}
        <BrandedContentSection
          id="first-section"
          header={{
            icon: "verified", // Change to section-appropriate icon
            iconVariant: "primary",
            subtitle: "Section Subtitle",
            title: "Main Section Title",
            description:
              "Section description explaining what this content is about and why it matters to users.",
          }}
        >
          {/* Your custom content here - Cards Example */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 - Use this pattern from Component Cheatsheet */}
            <div className="group relative flex h-full">
              <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

              <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <div className="relative inline-block mb-4 mx-auto">
                    <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
                    <div className="relative rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
                      <MaterialIcon
                        icon="star"
                        size="xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>

                  <h3 className="mb-3 text-center font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
                    Card Title
                  </h3>

                  <p className="mb-4 text-center text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg leading-relaxed">
                    Card description explaining this feature or benefit.
                  </p>
                </div>
              </div>
            </div>

            {/* Duplicate Card 1 structure for Card 2, Card 3, etc. */}
          </div>
        </BrandedContentSection>

        {/* Section 2: Another BrandedContentSection (gray background variant) */}
        <BrandedContentSection
          id="second-section"
          variant="gray"
          header={{
            icon: "groups",
            iconVariant: "secondary",
            subtitle: "Another Section",
            title: "More Great Content",
          }}
        >
          {/* Your custom content here */}
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            Your section content goes here. Can be text, images, grids, whatever
            you need.
          </p>
        </BrandedContentSection>

        {/*
          ⚠️ ALTERNATIVE: Manual Section (NOT RECOMMENDED - 68 extra lines)
          Only use this if BrandedContentSection doesn't fit your needs.
          See Component Cheatsheet for full manual pattern.
        */}

        {/* Testimonials Section (Optional) */}
        <TestimonialsSection
          id="testimonials"
          title="What Our Project Stakeholders Say"
          subtitle="Trusted By"
          description="Hear from valued partners who've experienced our commitment firsthand."
        />

        {/* Next Steps Section - REQUIRED */}
        <NextStepsSection />
      </div>
    </>
  );
}
```

---

## 🎯 Customization Points

### 1. Page Metadata

**File:** `/lib/seo/page-seo-utils.ts`

For every new indexable page route:

1. Add a matching route key and quote in `src/content/jeremy-page-ribbons.md`.
2. Ensure the SEO builder for that route includes route-aware Jeremy quote signals (use the shared keyword helper pattern in `page-seo-utils.ts`).
3. Add or update SEO tests so keyword arrays include the route-specific Jeremy quote markers.

```typescript
export function getYourPageSEO() {
  return {
    title: "Your Page Title | MH Construction",
    description: "Your page description for SEO",
    keywords: ["keyword1", "keyword2", "keyword3"],
    openGraph: {
      title: "Your Page Title",
      description: "Social media description",
      images: [
        {
          url: "/images/og-your-page.jpg",
          width: 1200,
          height: 630,
          alt: "Your page image description",
        },
      ],
    },
    schemas: [
      // Add structured data schemas
    ],
  };
}
```

### 2. Global + Page Heading Navigation Model

**Files:**

- `/src/components/navigation/SiteHeader.tsx`
- `/src/components/navigation/navigation-data.ts`

Current standard:

- Primary/secondary header routes are centrally owned by `buildSiteNavigationModel`.
- `PageNavigation` provides in-page wayfinding for routes that need it. It lives in the **Page Heading** — the area immediately below the hero — never inside the hero section itself.
- New page routes should be added to route ownership + route manifest sources first, then reflected in nav data labels.
- Keep both surfaces congruent: global header for site navigation, Page Heading `PageNavigation` for page-level wayfinding.
- **`PageNavigation` must never be placed inside the hero section.** It must be placed in the Page Heading below the hero.

Page Heading navigation config example:

```typescript
export const navigationConfigs = {
  yourpage: [
    {
      href: "#first-section",
      label: "First Section",
      mobileLabel: "First",
      icon: "verified",
    },
    {
      href: "#second-section",
      label: "Second Section",
      mobileLabel: "Second",
      icon: "engineering",
    },
  ],
};
```

### 3. Breadcrumb Pattern

**File:** `/lib/seo/breadcrumb-schema.ts`

```typescript
export const breadcrumbPatterns = {
  // ... existing patterns
  yourpage: [
    { name: "Home", path: "/" },
    { name: "Your Page Title", path: "/your-page-route" },
  ],
};
```

---

## 🎨 Section Variations

Use canonical pattern references for section variants instead of duplicating examples here:

- [Component Cheatsheet](../quick-reference/component-cheatsheet.md)
- [Template Components](../components/template-components.md)
- [Unified Component Standards](../../branding/standards/unified-component-standards.md)

---

## 📋 Pre-Launch Checklist

Before deploying your new page:

- [ ] Validate section order against [Universal Page Flow Standard](./universal-page-flow-standard.md)
- [ ] Run through [Page Compliance Checklist](./page-compliance-checklist.md)
- [ ] Test on mobile device (actual device, not just DevTools)
- [ ] Test dark mode toggle
- [ ] Verify all links work
- [ ] Verify page inherits the global header (`SiteHeader`) without duplicating route controls inside the hero
- [ ] Verify desktop `More` dropdown and mobile menu dialog still include the new route where applicable
- [ ] `PageNavigation` (if used) is placed in the Page Heading below the hero, **not** inside the hero `<section>`
- [ ] If `More` is present in page navigation, verify overlay behaviors (backdrop, Escape, close control) remain intact
- [ ] Verify SEO metadata appears correctly
- [ ] Verify route-specific Jeremy quote key exists in `src/content/jeremy-page-ribbons.md`
- [ ] Verify page SEO keywords include route-aware Jeremy quote signals
- [ ] Test with screen reader
- [ ] Validate no TypeScript errors
- [ ] Validate no ESLint warnings
- [ ] Check Lighthouse score (aim for 90+ on all metrics)

---

## 🚫 Common Mistakes to Avoid

Use the canonical mistakes catalog with wrong/correct examples:

- [Common Mistakes](./common-mistakes.md)

Template-specific checks:

1. First body section must serve the Discover stage.
1. Keep section IDs in kebab-case for internal jump links and deep-link targets.
1. Keep `NextStepsSection` as the final major section.
1. Keep below-fold sections dynamically imported where appropriate.
1. Split oversized pages when they serve multiple audiences or multiple action paths.
1. Validate with [Page Compliance Checklist](./page-compliance-checklist.md) before merge.

---

## 🔗 Related Documentation

- [Component Cheatsheet](../quick-reference/component-cheatsheet.md) - Quick patterns reference
- [Page Compliance Checklist](./page-compliance-checklist.md) - Audit tool
- [Universal Page Flow Standard](./universal-page-flow-standard.md) - Required page architecture
- [Unified Component Standards](../../branding/standards/unified-component-standards.md) - Complete standard
- [Common Mistakes](./common-mistakes.md) - What to avoid

---

## 💡 Tips for Success

1. **Start with this template** - Don't code from scratch
2. **Follow the pattern** - Consistency is key
3. **Use the cheatsheet** - Quick reference for common components
4. **Run the checklist** - Catch issues before they become problems
5. **Test responsiveness** - Mobile-first approach
6. **Ask for review** - Get feedback from team before merging
