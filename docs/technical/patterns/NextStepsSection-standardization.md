# NextStepsSection Component Standardization

## Overview

The `NextStepsSection` component is the standardized final call-to-action (CTA)
section used across all major pages of the MH Website. It is the canonical
**Action phase** closer in the
[Universal Page Flow Standard](../../development/standards/universal-page-flow-standard.md)
(Discover → Trust → Proof → **Action**). Every lead-path page must end with this component
as the last section before the footer.

**Brand Congruency:** NextSteps implementations must preserve canonical MH typography, color usage, trust content visibility, and naming.

## Component Location

**File:** `/src/components/shared-sections/NextStepsSection.tsx` (241 lines)

## Purpose

- Standardized final CTA section for all main pages
- Provides multiple conversion paths: consultation, estimate request, contact
- Includes PitchDeckCTA integration
- PWA install prompt
- Responsive gradient backgrounds
- Consistent messaging across the site

## Features

- **Primary Heading:** "Ready to Start Your Project?" (customizable via props)
- **4-Card Grid Layout:**
  1. **PitchDeck CTA:** View company pitch deck
  2. **View Our Work:** Link to projects page
  3. **Get An Estimate:** Link to contact form
  4. **Contact Us:** Direct contact link
- **Icon:** Handshake icon representing partnership
- **Responsive Design:** Mobile-friendly card grid
- **Visual Elements:** Gradient backgrounds (optional)

## Component Props

```typescript
interface NextStepsSectionProps {
  title?: string; // Optional: Custom heading text
  subtitle?: string; // Optional: Custom subheading text
  className?: string; // Optional: Additional CSS classes
  noBackground?: boolean; // Optional: Disable gradient backgrounds
}
```

### Default Values

- **title:** "Ready to Start Your Project?"
- **subtitle:** "Let's discuss how we can bring your construction vision to life"

## Import Pattern

All pages should use **dynamic import with SSR enabled** for optimal SEO and performance:

```typescript
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);
```

### Why SSR Enabled?

- **SEO Benefits:** Final CTA is important for conversion signals
- **Core Conversion Point:** Critical content that should be in initial HTML
- **Performance:** Minimal impact since it's at page bottom

## Current Usage

The NextStepsSection is standardized across these pages:

### ✅ Fully Implemented

- **Homepage** (`/src/app/page.tsx`) - Dynamic import with SSR; used as final section before footer.
- **About Page** (`/src/app/about/page.tsx`) - Dynamic import with SSR; placed after mission, vision, values sections.
- **FAQ Page** (`/src/app/faq/page.tsx`) - Dynamic import with SSR; final section after FAQ content.
- **Veterans Page** (`/src/app/veterans/page.tsx`) - Dynamic import with SSR; concludes veteran-focused content.
- **Services Hub Section** (`/src/app/page.tsx`, `id="services"`) - Dynamic import with SSR; replaced legacy `ServicesCTA` path usage with home-hub discovery; legacy service routes redirect to `/#services`.
- **Projects Page** (`/src/app/projects/page.tsx`) - Dynamic import with SSR; replaced `ProjectsCTASection` component; concludes project portfolio.
- **Team Page** (`/src/app/team/page.tsx`) - Dynamic import with SSR; final section after team profiles.

## Usage Guidelines

### When to Use NextStepsSection

✅ **Use on these page types:**

- Main service/product pages
- Portfolio/work pages
- Team/about pages
- Information pages (FAQ, veterans, etc.)
- Any page where you want users to take next action

❌ **Don't use on:**

- Contact forms (already at conversion point)
- Legal pages (privacy, terms)
- Utility pages (404, offline)
- Dashboard/admin pages

### How to Implement

1. **Add the dynamic import** at the top of your page component file:

```typescript
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  { ssr: true },
);
```

1. **Place the component** at the end of your page content (before closing tags):

```typescript
return (
  <>
    {/* Your page content */}

    {/* Next Steps Section - Standardized Final CTA */}
    <NextStepsSection />
  </>
);
```

1. **Optional customization** with props:

```typescript
<NextStepsSection
  title="Ready to Build Something Amazing?"
  subtitle="Let's make it happen together"
  className="mt-24"
/>
```

## Migration Notes

### Replaced Components

The following custom CTA components have been replaced with NextStepsSection:

- ❌ `ServicesCTA` (from services hub section) - **Removed**
- ❌ `ProjectsCTASection` (from projects page) - **Removed**
- ❌ Custom team page CTA section - **Replaced**

### Benefits of Standardization

1. **Consistency:** Same UX across all pages
2. **Maintainability:** Single component to update
3. **A/B Testing:** Easier to test CTA variations
4. **Performance:** Optimized loading strategy
5. **SEO:** Consistent conversion signals

## Customization Options

### Custom Title & Subtitle

```typescript
<NextStepsSection
  title="Let's Work Together"
  subtitle="Your project deserves expert attention"
/>
```

### No Background Variant

```typescript
<NextStepsSection noBackground />
```

### Additional Styling

```typescript
<NextStepsSection className="mt-32 mb-16" />
```

## Future Enhancements

Potential improvements to consider:

- [ ] A/B testing variations for CTA copy
- [ ] Dynamic CTA based on user behavior/page context
- [ ] Analytics tracking for CTA interactions
- [ ] Animation variants for cards
- [ ] Location-specific CTAs (e.g., "Contact Our Kennewick Team")

## Related Documentation

- **Component Source:** `/src/components/shared-sections/NextStepsSection.tsx`
- **PitchDeckCTA:** Integrated component for pitch deck display
- **PWA Install:** Built-in PWA prompt functionality
- **Shared Sections:** Other reusable page sections

## Maintenance

### When Updating NextStepsSection

1. Make changes in `/src/components/shared-sections/NextStepsSection.tsx`
2. Test on all pages using the component (listed above)
3. Run build to verify: `pnpm run build`
4. Update this documentation if props or usage patterns change

### Adding to New Pages

1. Follow import pattern above
2. Place at end of page content
3. Add page to "Current Usage" section in this doc
4. Test build and visual appearance

---

**Last Updated:** December 2024  
**Component Version:** 1.0  
**Standardization Status:** Complete for main pages
