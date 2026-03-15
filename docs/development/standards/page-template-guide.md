# Page Template Guide

**Purpose:** Copy-paste boilerplate for creating new MH-standard pages  
**Version:** 1.0.0  
**Last Updated:** March 15, 2026  
**Reference:** [Homepage](../../technical/homepage.md) - Your page must match this quality level  
**Quick Start:** Copy the template below and customize for your page

---

## 🎯 What "Cohesive with Homepage" Means

Your new page should be **indistinguishable in quality** from the homepage. A
visitor should not be able to tell which page was built first.

### Visual Indicators of Cohesiveness

**✅ COHESIVE (Matches Homepage):**

- Same depth: Diagonal stripes + large color blobs on every section
- Same rhythm: py-12 sm:py-16 lg:py-20 xl:py-24 spacing everywhere
- Same animations: FadeInWhenVisible wrapping all major content
- Same typography scale: text-4xl → text-5xl for headers, text-lg for body
- Same card style: Animated border glow + h-2 accent bars + nested icon blurs
- Same icon treatment: w-16 h-16 with double-blur layers (bg + gradient)

**❌ NOT COHESIVE (Feels Different):**

- Flat backgrounds without patterns/blobs
- Inconsistent spacing (py-8, py-16, py-32 mixed randomly)
- No animations or different animation timing
- Smaller/larger text than homepage (text-3xl, text-6xl for main headers)
- Plain cards without glows or different border styles
- Icons without blur effects or different sizes

**Example:** Compare two sections side-by-side with homepage - they should look
like siblings, not cousins.

---

## 🚀 Quick Start Workflow

1. **Copy the full template** from section below
2. **Replace placeholders** (search for `YOUR_PAGE_NAME`, `Your Page Title`, etc.)
3. **Customize hero section** (icon, title, description)
4. **Add content sections using BrandedContentSection** (eliminates 68 lines of
   boilerplate per section)
5. **Run compliance checklist** (see page-compliance-checklist.md)
6. **Test responsiveness** (mobile, tablet, desktop)

**Pro Tip:** Use BrandedContentSection component instead of manual section
markup - it automatically includes all required patterns
(DiagonalStripePattern, blobs, gradient headers) and reduces code by 82%.

**Non-coder explanation:** BrandedContentSection is the "fancy section with
gold/green gradient titles and background patterns" - it's pre-made so
developers don't code the same thing 26 times.

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
        <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
          {/* Background Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
            <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
              {/* Hero Icon (Optional) */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-secondary/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-brand-secondary p-6 rounded-2xl shadow-2xl">
                    <MaterialIcon
                      icon="engineering" // Change to your icon
                      size="3xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Title */}
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
                <span className="block text-brand-secondary font-black drop-shadow-lg">
                  Your Page Title Here
                </span>
              </h1>

              {/* Hero Subtitle */}
              <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
                Your compelling subtitle or tagline goes here
              </p>

              {/* Hero Description */}
              <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
                Detailed description about this page. Include the partnership
                tagline: &quot;Building projects for the client, NOT the
                dollar&quot; — Additional context about what users will find on
                this page.
              </p>
            </div>
          </div>

          {/* Page Navigation - REQUIRED at bottom */}
          <PageNavigation
            items={navigationConfigs.yourpage} // Add to navigationConfigs.ts
            className="absolute bottom-0 left-0 right-0"
          />
        </section>

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
          title="What Our Client Partners Say"
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

### 2. Navigation Config

**File:** `/components/navigation/navigationConfigs.ts`

```typescript
export const navigationConfigs = {
  // ... existing configs
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
    // Add more navigation items
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

### Variation 1: Gray Background Section

```tsx
<section
  id="section-id"
  className="relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
>
  {/* Same background patterns */}
  {/* Content */}
</section>
```

### Variation 2: With AlternatingShowcase

```tsx
import { AlternatingShowcase } from "@/components/ui";

<AlternatingShowcase
  items={[
    {
      image: "/images/feature-1.jpg",
      imageAlt: "Feature description",
      title: "Feature Title",
      description: "Feature description",
      icon: "verified",
    },
    // More items
  ]}
/>;
```

### Variation 3: With Timeline

```tsx
import { Timeline, type TimelineStep } from "@/components/ui/Timeline";

const steps: TimelineStep[] = [
  {
    num: 1,
    icon: "engineering",
    title: "Step Title",
    desc: "Step description",
    position: "left",
  },
  // More steps
];

<Timeline steps={steps} />;
```

---

## 📋 Pre-Launch Checklist

Before deploying your new page:

- [ ] Run through [Page Compliance Checklist](./page-compliance-checklist.md)
- [ ] Test on mobile device (actual device, not just DevTools)
- [ ] Test dark mode toggle
- [ ] Verify all links work
- [ ] Check PageNavigation anchors scroll to correct sections
- [ ] Verify SEO metadata appears correctly
- [ ] Test with screen reader
- [ ] Validate no TypeScript errors
- [ ] Validate no ESLint warnings
- [ ] Check Lighthouse score (aim for 90+ on all metrics)

---

## 🚫 Common Mistakes to Avoid

1. **Forgetting overflow-visible on gradient text** → Text gets clipped
2. **Missing top accent bar on cards** → Cards don't match standard
3. **Using emojis instead of Material Icons** → Violates policy
4. **Inconsistent section padding** → Page feels disjointed
5. **Not including NextStepsSection** → Missing conversion opportunity
6. **Missing section IDs** → PageNavigation doesn't work
7. **Forgetting DiagonalStripePattern** → Inconsistent backgrounds
8. **Using old Card component** → Outdated visual style
9. **Not lazy-loading below-fold** → Poor performance
10. **Missing breadcrumbs on non-homepage** → Poor SEO

---

## 🔗 Related Documentation

- [Component Cheatsheet](../../quick-reference/component-cheatsheet.md) - Quick patterns reference
- [Page Compliance Checklist](./page-compliance-checklist.md) - Audit tool
- [Unified Component Standards](../../../branding/standards/unified-component-standards.md) - Complete standard
- [Common Mistakes](./common-mistakes.md) - What to avoid

---

## 💡 Tips for Success

1. **Start with this template** - Don't code from scratch
2. **Follow the pattern** - Consistency is key
3. **Use the cheatsheet** - Quick reference for common components
4. **Run the checklist** - Catch issues before they become problems
5. **Test responsiveness** - Mobile-first approach
6. **Ask for review** - Get feedback from team before merging

---

**Last Updated:** March 15, 2026  
**Maintained by:** MH Construction Development Team  
**Questions?** Refer to component examples in existing pages (Home, About, Services)
