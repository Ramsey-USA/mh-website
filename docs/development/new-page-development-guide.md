# New Page Development Guide

**Category:** Development - Page Creation  
**Last Updated:** December 13, 2025  
**Status:** ✅ Active

**⭐ UPDATE (Dec 2025)**: All new pages must emphasize veteran-owned excellence, honest communication,
and proven craftsmanship. See updated hero patterns below.

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../master-index.md)
- [🛠️ Technical Index](../technical/technical-index.md)
- [🧭 Navigation System](../technical/navigation/navigation-index.md)
- [🎨 Design System](../technical/design-system/design-system-index.md)

---

## 📋 Overview

This guide provides a standardized approach to creating new pages for the MH Construction website.
Following these conventions ensures consistency, maintainability, and optimal user experience across
the entire site.

**⭐ CRITICAL**: Before creating any new page, review the
**[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)** to understand
which of the 7 messaging groups your page belongs to. Each group has unique voice, tone, and messaging
requirements that must be followed for brand consistency.

---

## 🏗️ Standard Page Structure

Every page should follow this consistent structure:

### 1. Hero Section

**NOTE**: Two hero patterns exist based on page type:

- **Pattern A (Homepage/Primary)**: Bottom-right text allowing photos/videos to be focal point
- **Pattern B (Standard Pages)**: Centered text with gradient background

**See [Hero Section Standards](../branding/standards/hero-section-standards.md) for complete details.**

#### Standard Hero Pattern (Centered - Most Pages)

Full-height section with background gradient and centered content.

```tsx
<section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

  {/* Content - Centered for standard pages */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
        <span className="block text-brand-secondary font-black drop-shadow-lg">
          Your Page Title
        </span>
      </h1>
      <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
        Compelling subtitle emphasizing veteran values and honest communication
      </p>
    </div>
  </div>

  {/* Page Navigation at bottom of hero */}
  <PageNavigation
    items={navigationConfigs.yourPage}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

### 2. Breadcrumb Navigation

Hierarchical navigation showing the user's location in the site structure.

```tsx
<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Parent Category", href: "/parent" }, // Optional
    { label: "Current Page" }, // No href for current page
  ]}
/>
```

### 3. Page Navigation (Optional Alternative Placement)

If not placed at the bottom of the hero, place after breadcrumb:

```tsx
<PageNavigation items={navigationConfigs.yourPage} />
```

### 4. Main Content

Organized sections with consistent spacing and styling.

#### Section Headers - Military-Construction Standard

**⭐ NEW STANDARD (December 2025)**: All sections must use the military-construction header pattern.

**Complete Pattern:**

```tsx
{
  /* Section Header - Military Construction Standard */
}
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

  {/* Two-line gradient heading */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
      Subtitle/Context Line
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      Main Title Impact Line
    </span>
  </h2>

  {/* Description with colored keyword highlighting */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Description text with{" "}
    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
      primary emphasis keywords
    </span>{" "}
    and{" "}
    <span className="font-bold text-gray-900 dark:text-white">
      strong emphasis keywords
    </span>
    .
  </p>
</div>;
```

**Icon Gradient Variants:**

- **Primary (Green)**: Trust, values, integrity sections

  ```tsx
  from-brand-primary/30 to-brand-primary-dark/30 (blur)
  from-brand-primary via-brand-primary-dark to-brand-primary-darker (icon bg)
  ```

- **Secondary (Tan/Bronze)**: Partnerships, excellence sections

  ```tsx
  from-brand-secondary/30 to-bronze-600/30 (blur)
  from-brand-secondary via-bronze-700 to-bronze-800 (icon bg)
  ```

- **Secondary (Bronze/Gold)**: Awards, premium sections

  ```tsx
  from-brand-secondary/30 to-bronze-600/30 (blur)
  from-brand-secondary via-bronze-700 to-bronze-800 (icon bg)
  ```

**Key Requirements:**

- ✅ Icon size must be `2xl` (60px)
- ✅ Main title gradient: `from-brand-primary via-brand-secondary to-brand-primary`
- ✅ Main title padding: `py-2 pb-3 leading-normal` (prevents descender clipping)
- ✅ Use colored keyword spans strategically in description

**See:**
[Component Organization Guide](../technical/design-system/component-organization-guide.md#section-header-standard---military-construction-pattern)
for complete documentation.

#### Content Sections

```tsx
<div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl">
  {/* Section 1 */}
  <section className="mb-20 lg:mb-32">
    {/* Use military-construction header pattern - see above for complete code */}
    <div className="mb-16 sm:mb-20 text-center">
      {/* Icon with decorative lines */}
      {/* Two-line gradient heading */}
      {/* Description with colored keywords */}
    </div>
    {/* Section content */}
  </section>

  {/* Additional sections */}
</div>
```

---

## 📦 Required Imports

### Basic Page Setup

```typescript
"use client";

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
```

### Common Additional Imports

```typescript
// Animation components
import { FadeInWhenVisible, StaggeredFadeIn } from "@/components/animations";

// Testimonials
import { TestimonialGrid } from "@/components/testimonials/TestimonialGrid";

// SEO
import { StructuredData } from "@/components/seo/StructuredData";
```

**Note:** The old `SectionHeader` component has been deprecated. Use the military-construction header pattern shown above instead.

---

## ⚙️ Configuration Steps

### 1. Create Navigation Configuration

Add to `src/components/navigation/navigationConfigs.ts`:

```typescript
export const navigationConfigs = {
  // ... existing configs

  yourPage: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/yourpage#section-1", label: "Section 1", icon: "visibility" },
    { href: "/yourpage#section-2", label: "Section 2", icon: "architecture" },
    { href: "/related-page", label: "Related Page", icon: "arrow_forward" },
    { href: "/contact", label: "Contact", icon: "contact_phone" },
  ],
};
```

### 2. Configure Breadcrumb Schema

Add to `src/lib/seo/breadcrumb-schema.ts`:

```typescript
export const breadcrumbPatterns = {
  // ... existing patterns

  yourPage: [
    { name: "Home", url: "https://www.mhc-gc.com" },
    { name: "Parent Category", url: "https://www.mhc-gc.com/parent" }, // Optional
    { name: "Your Page", url: "https://www.mhc-gc.com/yourpage" },
  ],
};
```

### 3. Create Page Metadata

**Important**: Page metadata (title, description, keywords) must align with the appropriate messaging
group from the **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)**.
Review your page's group for proper keyword prioritization and tone.

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | MH Construction - Tagline",
  description: "Compelling page description for SEO (150-160 characters)",
  keywords: ["keyword 1", "keyword 2", "keyword 3"],
  openGraph: {
    title: "Page Title | MH Construction",
    description: "Social media description",
    type: "website",
    locale: "en_US",
  },
};
```

**SEO Best Practices**:

- Follow the trust-first, tech-later approach documented in
  **[Homepage Optimization Guide](../branding/strategy/homepage-optimization-complete.md)**
- Review **[SEO Optimization Complete](../branding/strategy/seo-optimization.md)**
  for examples of optimized metadata across all 15 pages
- Ensure keywords are ordered according to messaging group priorities

---

## 🎨 Styling Standards

### Container Widths

```tsx
// Standard container
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Narrow container (forms, articles)
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

// Wide container (galleries, grids)
<div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
```

### Section Spacing

```tsx
// Standard section spacing
<section className="py-16 sm:py-20 lg:py-24">

// Large section spacing (major sections)
<section className="py-20 lg:py-32 xl:py-40">

// Compact section spacing
<section className="py-12 sm:py-16">
```

### Background Patterns

```tsx
// White background
<section className="bg-white dark:bg-gray-900">

// Light gray background
<section className="bg-gray-50 dark:bg-gray-800">

// Brand gradient background
<section className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 dark:from-brand-primary/10 dark:to-brand-secondary/10">
```

---

## ✅ Pre-Launch Checklist

### Navigation

- [ ] Navigation config added to `navigationConfigs.ts`
- [ ] Breadcrumb component implemented
- [ ] PageNavigation component placed correctly
- [ ] All navigation links tested and working
- [ ] Mobile navigation tested
- [ ] Keyboard navigation verified

### SEO & Metadata

- [ ] Page metadata configured
- [ ] Breadcrumb schema added
- [ ] StructuredData component included (if applicable)
- [ ] Meta description is 150-160 characters
- [ ] OpenGraph tags configured
- [ ] Keywords relevant and appropriate

### Accessibility

- [ ] All images have alt text
- [ ] ARIA labels on interactive elements
- [ ] Keyboard navigation works properly
- [ ] Focus indicators visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Screen reader tested

### Responsive Design

- [ ] Tested on mobile (< 640px)
- [ ] Tested on tablet (768px - 1024px)
- [ ] Tested on desktop (> 1024px)
- [ ] Tested on large screens (> 1920px)
- [ ] Touch targets minimum 44x44px
- [ ] No horizontal scrolling issues

### Performance

- [ ] Images optimized (Next.js Image component)
- [ ] Heavy components lazy loaded
- [ ] No console errors or warnings
- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 95 (Accessibility)
- [ ] Lighthouse score > 95 (Best Practices)
- [ ] Lighthouse score > 95 (SEO)

### Content

- [ ] Spelling and grammar checked
- [ ] Brand voice consistent with appropriate messaging group
      (see [Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md))
- [ ] CTAs clear and actionable
- [ ] Contact information accurate
- [ ] Links open appropriately (internal vs external)
- [ ] All content factually accurate
- [ ] Messaging aligns with one of the 7 page groups (Traditional Business, Heritage, Future Vision,
      Professional Patriotic, Recruitment, Tech Innovation, or Partnership/Urgency)

### Testing

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Dark mode works correctly
- [ ] Light mode works correctly
- [ ] All animations smooth and performant

---

## 📝 Complete Page Template

```tsx
"use client";

import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible, StaggeredFadeIn } from "@/components/animations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Title | MH Construction - Tagline",
  description: "Page description for SEO",
  keywords: ["keyword1", "keyword2", "keyword3"],
};

export default function YourPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
          <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                Your Page Title
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2 font-medium">
              Compelling subtitle emphasizing veteran values and honest
              communication
            </p>
          </div>
        </div>

        {/* Page Navigation */}
        <PageNavigation
          items={navigationConfigs.yourPage}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Your Page" }]}
      />

      {/* Main Content */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl">
        {/* Section 1 */}
        <section className="mb-20 lg:mb-32">
          <FadeInWhenVisible>
            {/* Military-construction header pattern - see above for complete code */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                {/* See pattern above */}
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Subtitle/Context Line
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Main Title Impact Line
                </span>
              </h2>

              {/* Description with colored keywords */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Description text...
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Section content */}
        </section>

        {/* Additional sections */}
      </div>
    </div>
  );
}
```

**Note:** The old `SectionHeader` component has been deprecated in favor of the inline military-construction header pattern.

---

## 🔗 Related Documentation

- [**Page-Specific Messaging Guide**](../branding/strategy/page-specific-messaging-guide.md) - ⭐
  **CRITICAL** - 7 page groups with unique messaging strategies
- [**Homepage Optimization Guide**](../branding/strategy/homepage-optimization-complete.md) -
  Trust-first optimization approach
- [**SEO Optimization Complete**](../branding/strategy/seo-optimization.md) - Complete
  SEO audit with examples
- [Navigation System](../technical/navigation/navigation-index.md) - Complete navigation documentation
- [Design System](../technical/design-system/design-system-index.md) - Component and styling standards
- [Consistency Guide](./consistency-guide.md) - Development patterns and best practices
- [Component Standards](../branding/standards/component-standards.md) - Component design standards

---

## 📞 Support

For questions about page development:

- **Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Documentation Issues:** Submit to project repository
- **Technical Questions:** Refer to specific documentation sections

---

**Last Updated:** December 17, 2025  
**Status:** ✅ Active  
**Maintained By:** MH Construction Development Team
