# Homepage Documentation

**Last Updated:** April 15, 2026  
**Version:** 2.1.0  
**Status:** ✅ Active & Optimized  
**File:** `/src/app/page.tsx`

> **Canonical Reference:** For exact brand values, see [Brand Constants](../branding/brand-constants.md).

> **📐 DESIGN TEMPLATE:** This page serves as the visual and structural
> template for most site pages. Component patterns (timelines, section
> headers, cards, etc.) should look consistent across pages. Messaging is
> page-specific based on target audience groups.
>
> **⚠️ EXCEPTIONS:** Public Sector (`/public-sector`) and Veterans
> (`/veterans`) pages have completely unique structures and designs and do
> not follow this template.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Section Structure](#section-structure)
3. [Components](#components)
4. [Performance Optimizations](#performance-optimizations)
5. [SEO & Analytics](#seo--analytics)
6. [Technical Implementation](#technical-implementation)

---

## 🎯 Overview

The homepage is the primary landing page for MH Construction, serving as the
Base HQ → Home command center. It follows a partnership-focused approach with
veteran-owned values and transparent communication.

### Design Template Role

**What the homepage defines for other pages:**

- ✅ Visual style and component patterns (timelines, headers, cards)
- ✅ Section structure and layout patterns
- ✅ Performance optimization strategies (lazy loading, etc.)
- ✅ Technical implementation patterns
- ✅ MH branding guidelines (colors, typography, spacing)

**What is page-specific:**

- 📝 Messaging content (tailored to audience groups: Clients, Team, Partners, Government)
- 🎯 Hero sections (unique icons and headlines per page)
- 📊 Section ordering (optimized per page purpose)
- 🎨 Accent colors and thematic variations

**Completely unique pages (don't follow template):**

- Public Sector (`/public-sector`)
- Veterans (`/veterans`)

### Purpose

- Establish trust through core values presentation
- Showcase construction services and expertise
- Guide visitors through a clear conversion funnel
- Demonstrate company credibility through statistics and testimonials

### Key Features

- **Full-screen hero** with American Flag and dual-label navigation
- **Performance optimized** with lazy-loaded below-the-fold content
- **SEO Validation:** Use external audits and rich-result validators
- **PWA Support** with install banner and offline functionality
- **Analytics tracking** for user engagement and journey progression
- **Dark mode support** with seamless theme switching

---

## 📐 Section Structure

The homepage follows the **Universal Page Flow Standard**: **Discover → Trust → Proof → Action**.

> **📋 Structural Template:** All lead-path pages follow the Universal Page Flow Standard
> (Discover: Hero + primary content → Trust: values/benefits/capabilities → Proof: testimonials/stats/awards
> → Action: CTAs + Next Steps). Section _content_ is optimized per page purpose; the flow sequence
> is consistent. Timeline and component designs remain visually consistent.
>
> **Full Standard:** [Universal Page Flow Standard](../development/standards/universal-page-flow-standard.md)
>
> **Exception Pages:** Public Sector and Veterans pages have completely different structures.

### 1. Hero Section (0-10%)

- **Component:** `HeroSection` (homepage version)
- **Template Pattern:** Full-screen hero with icon, dual-label title, brand messaging, page navigation
- **Reused Across Pages:** Hero layout structure, navigation bar positioning
- **Page-Specific Content:** Icon choice, headlines, messaging
- **Homepage Specifics:**
  - American Flag icon with animation
  - "Base HQ → Home" dual-label
  - "Building projects for the Client, NOT the Dollar"

> **Implementation Note:** Other pages reuse the hero structure but with
> unique icons (Services = "engineering", About = "groups", Careers = "work",
> etc.) and audience-specific messaging.

### 2. PWA Install Banner (Conditional)

- **Component:** `PWAInstallCTA`
- **Template Pattern:** Consistent across all pages
- **Purpose:** Prompt users to install the Progressive Web App
  - Only shows when app is installable
  - Banner variant for non-intrusive presentation
  - Dismissible by user

### 3. Core Values Section (10-20%)

- **Component:** `CoreValuesSection`
- **Purpose:** Establish trust through four foundational principles
- **Values:**
  - **Honesty** - Clear Communication Every Time
  - **Integrity** - Doing What's Right
  - **Professionalism** - Excellence in Action
  - **Thoroughness** - No Detail Left Behind
- **Features:**
  - Alternating image/text layout
  - Material Icons for each value
  - Statistics and visual imagery

### 4. Why Partner With MH Construction Section (20-30%)

- **Component:** `WhyPartnerSection`
- **Purpose:** Partnership philosophy and differentiation
- **Key Points:**
  - .64 EMR - Industry-Leading Safety
  - 150+ Years of Combined Experience
  - Complete Transparency
  - Veteran-owned values and approach

### 5. Services Showcase Section (30-40%)

- **Component:** `ServicesShowcase`
- **Purpose:** Display primary service offerings
- **Services:**
  - Construction Management
  - Master Planning & Pre-Construction
  - General Contracting
  - Tenant Improvements
  - Light Industrial
  - Additional specialty services
- **Features:**
  - Interactive service cards
  - Tabbed interface for service categories
  - Analytics tracking for service interest
  - Link to full services page

### 6. Strategic CTA Banner (40-45%)

- **Component:** `StrategicCTABanner`
- **Variant:** "combo" (App + Pitch Deck + Contact)
- **Purpose:** Mid-page conversion opportunity
- **Actions:**
  - Install PWA app
  - Download pitch deck
  - Schedule consultation

### 7. Testimonials Section (45-55%)

- **Component:** `TestimonialsSection` (Lazy-loaded)
- **Purpose:** Social proof at optimal depth (25-30% in user scroll)
- **Features:**
  - Client partner testimonials
  - Trust-building credibility
  - Below-the-fold lazy loading for performance
  - SSR disabled with loading placeholder

### 8. Company Statistics Section (55-65%)

- **Component:** `CompanyStats` (Lazy-loaded)
- **Purpose:** Credibility through measurable results
- **Features:**
  - Battle-tested excellence messaging
  - Proven track record display
  - Visual statistics presentation
  - Lazy-loaded for performance optimization

### 9. Our Process Timeline Section (65-80%)

- **Component:** Inline section (not extracted component)
- **Template Pattern:** Timeline design pattern used across pages
- **Visual Consistency:** All page timelines use same layout, icons, and styling
- **Content Variation:** Step titles and descriptions are page-specific
- **Homepage Steps:**
  1. Pre-Construction Planning
  2. Budget Transparency
  3. Quality Execution
  4. Proactive Communication
  5. Seamless Close-Out
- **Design Features:**
  - Vertical alternating timeline layout (desktop)
  - Mobile-optimized vertical layout
  - Material Icons for each step
  - Animated hover effects
  - Gradient connecting line

> **Reuse Note:** The timeline visual design (alternating layout, icons,
> gradients) is consistent across pages. Only the step content changes per
> page context.
> page context.

### 10. Next Steps Section (80-100%)

- **Component:** `NextStepsSection` (Lazy-loaded)
- **Template Pattern:** Consistent across most pages
- **Purpose:** Final conversion guidance
- **Features:**
  - Clear action items for visitors
  - Multiple contact options
  - Conversion-focused messaging
  - Lazy-loaded for performance

---

## 🧩 Components

### Critical Components (Above-the-fold)

#### HeroSection

```tsx
import { HeroSection } from "@/components/home";
```

- **File:** `/src/components/home/HeroSection.tsx`
- **Loading:** Eager (critical above-fold content)
- **Features:**
  - American Flag icon with animation
  - Page navigation integration
  - Gradient background (ready for photo/video)
  - Responsive text sizing

#### CoreValuesSection

```tsx
import { CoreValuesSection } from "@/components/home";
```

- **File:** `/src/components/home/CoreValuesSection.tsx`
- **Loading:** Eager (critical for trust-building)
- **Data:** 4 core values with icons, images, and descriptions

#### ServicesShowcase

```tsx
import { ServicesShowcase } from "@/components/home";
```

- **File:** `/src/components/home/ServicesShowcase.tsx`
- **Loading:** Eager (primary service presentation)
- **Features:**
  - Interactive service cards
  - Analytics tracking integration
  - Tabbed interface for categories

#### WhyPartnerSection

```tsx
import { WhyPartnerSection } from "@/components/home";
```

- **File:** `/src/components/home/WhyPartnerSection.tsx`
- **Loading:** Eager (partnership differentiation)
- **Features:**
  - Partnership values with statistics
  - Material Icons for visual appeal
  - Diagonal stripe and blob backgrounds

### Lazy-Loaded Components (Below-the-fold)

#### TestimonialsSection

```tsx
const TestimonialsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.TestimonialsSection,
    })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  },
);
```

- **File:** `/src/components/shared-sections/TestimonialsSection.tsx`
- **Loading:** Lazy (SSR disabled)
- **Loading State:** Skeleton placeholder (96 height)

#### CompanyStats

```tsx
const CompanyStats = dynamic(
  () =>
    import("@/components/about/CompanyStats").then((mod) => ({
      default: mod.CompanyStats,
    })),
  {
    ssr: false,
    loading: () => <div className="h-96 animate-pulse bg-gray-100" />,
  },
);
```

- **File:** `/src/components/about/CompanyStats.tsx`
- **Loading:** Lazy (SSR disabled)
- **Loading State:** Skeleton placeholder (96 height)

#### NextStepsSection

```tsx
const NextStepsSection = dynamic(
  () =>
    import("@/components/shared-sections").then((mod) => ({
      default: mod.NextStepsSection,
    })),
  {
    ssr: false,
    loading: () => <div className="h-64 animate-pulse bg-gray-100" />,
  },
);
```

- **File:** `/src/components/shared-sections/NextStepsSection.tsx`
- **Loading:** Lazy (SSR disabled)
- **Loading State:** Skeleton placeholder (64 height)

### Supporting Components

#### PWAInstallCTA

```tsx
import { PWAInstallCTA } from "@/components/pwa";
```

- **File:** `/src/components/pwa/PWAInstallCTA.tsx`
- **Purpose:** Progressive Web App installation prompt
- **Variant:** "banner" (non-intrusive)

#### StrategicCTABanner

```tsx
import { StrategicCTABanner } from "@/components/ui/cta";
```

- **File:** `/src/components/ui/cta/StrategicCTABanner.tsx`
- **Purpose:** Mid-page conversion opportunity
- **Variant:** "combo" (multiple CTAs)

#### MaterialIcon

```tsx
import { MaterialIcon } from "@/components/icons/MaterialIcon";
```

- **File:** `/src/components/icons/MaterialIcon.tsx`
- **Purpose:** Universal icon system using Google Material Icons
- **Usage:** Throughout timeline section and other UI elements

#### Background Components

```tsx
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
```

- **Files:**
  - `/src/components/ui/backgrounds/DiagonalStripePattern.tsx`
  - `/src/components/ui/backgrounds/BrandColorBlobs.tsx`
- **Purpose:** Visual decoration for section backgrounds

---

## ⚡ Performance Optimizations

### Lazy Loading Strategy

**Above-the-fold (Eager Loading):**

- HeroSection
- CoreValuesSection
- ServicesShowcase
- WhyPartnerSection

**Below-the-fold (Lazy Loading with SSR disabled):**

- TestimonialsSection
- CompanyStats
- NextStepsSection

### Benefits

- **Reduced Initial Bundle Size:** Only critical components loaded initially
- **Faster Time to Interactive (TTI):** Users can interact with page sooner
- **Improved Lighthouse Process:** Validate using PageSpeed Insights or Chrome DevTools Lighthouse
- **Better Mobile Performance:** Optimized for 3G/4G connections

### Image Preloading

```tsx
const criticalImages = ["/images/placeholder.webp", "/images/logo/mh-logo.png"];
useImagePreloader(criticalImages);
```

Critical images are preloaded for better performance using custom hook.

### Loading States

All lazy-loaded components include skeleton loaders:

```tsx
loading: () => <div className="h-96 animate-pulse bg-gray-100" />;
```

This provides visual feedback during component loading.

---

## 🎯 SEO & Analytics

### SEO Configuration

**Title:**

```text
Base HQ → Home | Building Projects for the Client, NOT the Dollar | MH Construction
```

**SEO Status:** Metadata and schema implementation in place; validate with external audit tools

**Key SEO Features:**

- Structured data schemas (Organization, FAQ, LocalBusiness)
- Enhanced metadata with keywords
- Canonical URL configuration
- Optimized section ordering (testimonials at 25-30%)

**SEO Utility:**

```tsx
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";
const homepageSEO = getHomepageSEO();
```

**File:** `/src/lib/seo/page-seo-utils.ts` (lines 1-50)

### Structured Data Schemas

1. **Organization Schema:**
   - Company information
   - Contact details
   - Social media profiles

2. **FAQ Schema:**
   - Common construction questions
   - Service-related FAQs
   - Company differentiation

3. **LocalBusiness Schema:**

- Tri-Cities headquarters location data
- Service areas (WA, OR, ID)
- Business hours and contact

### Analytics Tracking

**Page Tracking:**

```tsx
usePageTracking("Home");
```

**Scroll Depth Tracking:**

```tsx
useScrollDepthTracking("homepage");
```

**Custom Hooks:**

- `/src/lib/analytics/hooks.ts` - `usePageTracking`
- `/src/hooks/useScrollDepthTracking.ts` - Scroll depth analytics

**Tracked Events:**

- Page views
- Scroll depth (25%, 50%, 75%, 100%)
- Service interest clicks
- CTA interactions
- Form submissions

---

## 🔧 Technical Implementation

### Component Architecture

```tsx
export default function Home() {
  // Analytics tracking
  usePageTracking("Home");

  // SEO data
  const homepageSEO = getHomepageSEO();

  // Performance optimizations
  const criticalImages = [
    "/images/placeholder.webp",
    "/images/logo/mh-logo.png",
  ];
  useImagePreloader(criticalImages);

  // Scroll tracking
  useScrollDepthTracking("homepage");

  return (
    <>
      {/* Structured data */}
      <StructuredData data={homepageSEO.schemas} />
      <StructuredData data={generateOrganizationStructuredData()} />

      {/* Critical above-fold sections */}
      <HeroSection />
      <PWAInstallCTA variant="banner" />
      <CoreValuesSection />
      <WhyPartnerSection />
      <ServicesShowcase />

      {/* Mid-page CTA */}
      <StrategicCTABanner variant="combo" />

      {/* Lazy-loaded below-fold sections */}
      <TestimonialsSection {...props} />
      <CompanyStats {...props} />

      {/* Timeline section (inline) */}
      <section id="our-process">{/* Timeline implementation */}</section>

      {/* Final conversion section */}
      <NextStepsSection />
    </>
  );
}
```

### Key Files

**Main Page:**

- `/src/app/page.tsx` (361 lines)

**Components:**

- `/src/components/home/HeroSection.tsx`
- `/src/components/home/CoreValuesSection.tsx`
- `/src/components/home/ServicesShowcase.tsx`
- `/src/components/home/WhyPartnerSection.tsx`
- `/src/components/home/index.ts` (exports)

**Shared Components:**

- `/src/components/shared-sections/TestimonialsSection.tsx`
- `/src/components/shared-sections/NextStepsSection.tsx`
- `/src/components/about/CompanyStats.tsx`

**SEO & Analytics:**

- `/src/lib/seo/page-seo-utils.ts`
- `/src/lib/analytics/hooks.ts`
- `/src/hooks/useScrollDepthTracking.ts`
- `/src/hooks/usePerformanceOptimization.ts`

**Supporting:**

- `/src/components/pwa/PWAInstallCTA.tsx`
- `/src/components/ui/cta/StrategicCTABanner.tsx`
- `/src/components/icons/MaterialIcon.tsx`
- `/src/components/ui/backgrounds/`

### Dependencies

```json
{
  "next": "^15.5.15",
  "react": "^19.0.0",
  "typescript": "^5.9.2"
}
```

### Navigation Integration

The homepage uses section-based navigation with the `PageNavigation` component:

- Configuration: `/src/components/navigation/navigationConfigs.ts`
- All sections have unique `id` attributes for anchor links
- Dual-label format: full label (desktop) + mobile label

### Dark Mode Support

All components support dark mode with Tailwind CSS classes:

```tsx
className = "bg-white dark:bg-gray-900 text-gray-900 dark:text-white";
```

### Responsive Design

- **Mobile-first approach:** Base styles optimized for mobile
- **Breakpoints:** xs, sm, md, lg, xl, 2xl
- **Touch-optimized:** Buttons and interactive elements sized appropriately
- **Adaptive layouts:** Timeline alternates on desktop, stacks on mobile

---

## 📊 Performance Metrics

### Current Scores

- **Lighthouse Performance:** Validate from external audit runs (PageSpeed/DevTools)
- **SEO Validation:** Run external audits to confirm current score
- **PWA Score:** Historical baseline 100%; verify current status via PageSpeed/DevTools and automated PWA tests
- **Accessibility:** High compliance

### Optimization Status

| Feature            | Status       | Notes                                |
| ------------------ | ------------ | ------------------------------------ |
| Lazy Loading       | ✅ Optimized | Below-fold sections lazy-loaded      |
| Image Optimization | ✅ Optimized | WebP format with preloading          |
| Code Splitting     | ✅ Optimized | Dynamic imports for heavy components |
| SEO Structure      | ✅ Optimized | Section ordering + schema            |
| Analytics          | ✅ Optimized | Custom tracking hooks implemented    |
| PWA Support        | ✅ Optimized | Service worker v4.0.0                |
| Dark Mode          | ✅ Optimized | Seamless theme switching             |

---

## 🚀 Future Enhancements

### Potential Improvements

1. **Hero Background:** Add photo or video background (placeholder ready)
2. **Animation Refinements:** Enhanced CSS/IntersectionObserver animations
3. **A/B Testing:** Test different CTA placements
4. **Personalization:** Smart content based on user behavior
5. **Interactive Elements:** More engaging user interactions

### Notes

- Hero section includes commented placeholders for background image/video
- Homepage sections are modular and can be reordered as needed
- Performance optimizations follow best practices
- SEO structure is implemented and should be validated in external audits
- **Visual/structural patterns established here are reused across pages** - only messaging differs per audience
- **Exception:** Public Sector and Veterans pages have unique structures

---

## 📝 Related Documentation

### Design & Messaging Guides

- **[Unified Component Standards](../branding/standards/unified-component-standards.md)** -
  Reusable component patterns (timelines, headers, cards)
- **[Hero Section Standards](../branding/standards/hero-section-standards.md)** -
  Hero design template with page-specific variations
- **[Page-Specific Messaging Guide](../branding/strategy/page-specific-messaging-guide.md)** -
  Unique messaging for each page type
- **[Universal Terminology](../branding/strategy/universal-terminology-guide.md)** -
  Consistent word choices across all pages

### General Technical Guides

- **[SEO Complete Guide](./seo/seo-complete-guide.md)** - SEO strategy & implementation
- **[Unified Component Standards](../branding/standards/unified-component-standards.md)** - UI component patterns
- **[Analytics Guide](../../analytics-guide-for-matt-and-jeremy.md)** - Marketing analytics
- **[PWA Quick Reference](./pwa-quick-reference.md)** - Progressive Web App details
- **[Architecture](../project/architecture.md)** - Overall platform architecture
- **[Lighthouse Results](../../lighthouse-results/summary.json)** - Local artifact (only trustworthy when all audits succeed)

---

**Built for the Client, NOT the Dollar.**  
**Founded 2010 | Veteran-Owned Since January 2025**
