# SEO Messaging Strategy & Systematic Implementation

**Date:** December 2, 2025  
**Status:** ✅ Active  
**Category:** Technical SEO  
**Version:** 1.0.0

## Overview

This guide establishes a systematic approach to applying SEO-optimized messaging across the entire MH Construction
website. By using centralized content fragments and consistent patterns, we ensure local SEO keywords are properly
distributed while maintaining brand voice and quality.

## Quick Navigation

- [Core SEO Library](#core-seo-library)
- [Implementation Patterns](#implementation-patterns)
- [Page-by-Page Strategy](#page-by-page-strategy)
- [Content Guidelines](#content-guidelines)
- [Validation Checklist](#validation-checklist)

---

## Core SEO Library

### Location: `src/lib/seo/seo-content-fragments.ts`

This centralized library provides reusable, SEO-optimized content snippets that ensure:

- ✅ Consistent location mentions (Tri-Cities, Richland, Pasco, Kennewick, counties)
- ✅ "General contractor" + location keyword patterns
- ✅ Service area coverage (primary + extended)
- ✅ Veteran-owned messaging integration
- ✅ Brand values consistency

### Key Exports

```typescript
import SEOFragments from "@/lib/seo/seo-content-fragments";

// Location fragments
SEOFragments.location.triCitiesShort; // "Tri-Cities (Richland, Pasco, Kennewick)"
SEOFragments.location.fullServiceArea; // Complete service area text
SEOFragments.location.servingPhrase; // "serving the Tri-Cities..."

// Contractor keywords
SEOFragments.contractor.triCitiesVariations; // Array of GC + city combinations
SEOFragments.contractor.countyVariations; // County-specific keywords

// Service descriptions
SEOFragments.service.commercialConstruction.withLocation;
SEOFragments.service.governmentProjects.hanfordSpecific;

// Builder functions
SEOFragments.builders.locationDescription(serviceType, emphasis);
SEOFragments.builders.locationKeywords(baseKeywords, includeExtended);
SEOFragments.builders.seoTitle(pageTitle, includeLocation);
```

---

## Implementation Patterns

### Pattern 1: Page Metadata with Local Keywords

**Location:** `src/app/[page]/metadata.ts`

```typescript
import { SEOFragments } from "@/lib/seo/seo-content-fragments";

export const metadata: Metadata = {
  title: SEOFragments.builders.seoTitle("Services", true),
  description: SEOFragments.builders.locationDescription(
    "Expert construction services",
    "full",
  ),
  keywords: SEOFragments.builders.locationKeywords(
    [
      "construction services",
      "commercial construction",
      "construction management",
    ],
    true,
  ),
};
```

**Benefits:**

- Automatic inclusion of all location variations
- Consistent title formatting
- Comprehensive keyword coverage

### Pattern 2: Page Content with Location Context

**Location:** Page component files

```typescript
import { SEOFragments } from '@/lib/seo/seo-content-fragments';

export default function ServicesPage() {
  return (
    <Section>
      <h1>Construction Services</h1>
      <p>
        {SEOFragments.templates.serviceIntro("Commercial construction")}
      </p>

      {/* Later in footer or contact section */}
      <p className="text-sm text-gray-600">
        {SEOFragments.templates.footerServiceArea}
      </p>
    </Section>
  );
}
```

**Benefits:**

- Natural language location mentions
- SEO keywords in readable content
- Consistent service area descriptions

### Pattern 3: Enhanced SEO Utils Integration

**Location:** `src/lib/seo/page-seo-utils.ts`

```typescript
import { SEOFragments } from "./seo-content-fragments";
import { generateEnhancedMetadata } from "@/components/seo/enhanced-seo";

export function getServicesSEO(): Metadata & { schemas: object[] } {
  return generateEnhancedMetadata({
    title: SEOFragments.builders.seoTitle(
      "Construction Services",
      true,
      "Tri-Cities WA",
    ),
    description: SEOFragments.builders.serviceDescription(
      "Expert construction management",
      "constructionManagement",
      true, // include veteran messaging
    ),
    keywords: SEOFragments.builders.locationKeywords([
      "construction services",
      "commercial construction",
      ...SEOFragments.service.industries,
    ]),
    canonicalUrl: `${enhancedSEO.siteUrl}/services`,
    schemas: [
      /* ... */
    ],
  });
}
```

**Benefits:**

- Centralized SEO function management
- Automatic location keyword injection
- Schema.org integration support

### Pattern 4: Structured Data with Service Area

**Location:** Schema.org LocalBusiness implementations

```typescript
import { SEOFragments } from "@/lib/seo/seo-content-fragments";

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["GeneralContractor", "LocalBusiness"],
    name: "MH Construction, Inc.",
    description: SEOFragments.builders.serviceDescription(
      "Veteran-owned general contractor",
      "commercialConstruction",
      true,
    ),
    areaServed: SEOFragments.schema.areaServed(),
    // ... rest of schema
  };
}
```

**Benefits:**

- Structured data optimized for local search
- Complete service area coverage
- Search engine friendly format

---

## Page-by-Page Strategy

### Homepage (`/`)

**SEO Focus:** Primary "general contractor" + location keywords

**Implementation:**

```typescript
// Hero section
<h1>
  {SEOFragments.veteran.veteranOwnedContractor} {SEOFragments.location.servingPhrase}
</h1>

// Description
<p>
  {SEOFragments.brand.mainSlogan}. {SEOFragments.builders.locationDescription(
    "Expert construction services",
    "primary"
  )}
</p>
```

**Keywords to Include:**

- All `SEOFragments.contractor.triCitiesVariations`
- All `SEOFragments.contractor.countyVariations`
- Core services with location context

### Services Page (`/services`)

**SEO Focus:** Service-specific + location combinations

**Implementation:**

```typescript
// Each service section
<ServiceCard
  title="Commercial Construction"
  description={SEOFragments.service.commercialConstruction.longForm}
  location={SEOFragments.location.triCitiesLong}
/>

// Footer
<p>{SEOFragments.templates.searchPatternNote}</p>
```

**Keywords to Include:**

- Service type + city (e.g., "commercial construction Richland")
- Service type + county
- Industry-specific terms with locations

### Contact Page (`/contact`)

**SEO Focus:** Local business presence, address prominence

**Implementation:**

```typescript
<address>
  {SEOFragments.location.headquartersLong}
</address>

<p>{SEOFragments.templates.contactLocation}</p>

// Schema.org integration
<StructuredData data={{
  "@type": "LocalBusiness",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "3111 N. Capitol Ave.",
    "addressLocality": "Pasco",
    "addressRegion": "WA",
    "postalCode": "99301",
  },
  "areaServed": SEOFragments.schema.areaServed(),
}} />
```

### About Page (`/about`)

**SEO Focus:** Company history + local presence

**Implementation:**

```typescript
<p>{SEOFragments.templates.aboutLocation}</p>

<p>
  Since 2010, {SEOFragments.veteran.ownershipLong}, serving
  {SEOFragments.location.triCitiesLong} and beyond.
</p>
```

### Careers Page (`/careers`)

**SEO Focus:** Job titles + locations

**Implementation:**

```typescript
// Use job-specific fragments
const jobKeywords = [
  "Project Manager",
  "Superintendent",
  "Carpenter",
  "Project Engineer",
  "Admin Assistant",
]
  .map((job) => [
    `${job} ${SEOFragments.location.triCitiesShort}`,
    `${job} Richland`,
    `${job} Pasco`,
    `${job} Kennewick`,
  ])
  .flat();

keywords: [...jobKeywords, ...SEOFragments.contractor.triCitiesVariations];
```

### Government Page (`/government`)

**SEO Focus:** Hanford-specific, government contractor terms

**Implementation:**

```typescript
<p>
  {SEOFragments.service.governmentProjects.hanfordSpecific}
</p>

// Keywords
keywords: [
  "Hanford contractor",
  "DOE contractor Tri-Cities",
  "federal contractor Richland",
  ...SEOFragments.contractor.triCitiesVariations,
]
```

---

## Content Guidelines

### Location Mention Frequency

**Optimal Distribution:**

- **Hero Section**: 1-2 location mentions (city or region)
- **Introduction**: 1 comprehensive location mention
- **Service Sections**: Location context per major service
- **Footer/Contact**: Complete service area statement
- **Metadata**: All relevant location keywords

**Example Distribution:**

```text
Hero: "Tri-Cities general contractor"
Intro: "serving Richland, Pasco, Kennewick"
Service 1: "commercial construction in Benton County"
Service 2: "construction management throughout the Pacific Northwest"
Footer: Full service area with all cities
```

### Keyword Density Best Practices

**Target Ratios:**

- Primary keyword ("general contractor"): 1-2% of content
- Location terms: 2-3% of content
- Service terms: 3-4% of content
- Brand values: Natural integration, not forced

**Avoid:**

- ❌ Keyword stuffing (repetitive, unnatural mentions)
- ❌ Hidden text or keyword lists
- ❌ Identical descriptions across multiple pages
- ❌ Over-optimization (reads like a keyword list)

**Do:**

- ✅ Natural language with location context
- ✅ Varied phrasing for locations and services
- ✅ User-focused content that happens to include keywords
- ✅ Unique descriptions for each page/service

### Natural Language Integration

**Poor Example (Over-optimized):**

> "General contractor Richland. General contractor Pasco. General contractor Kennewick. We are a Tri-Cities general contractor."

**Good Example (Natural):**

> "As a veteran-owned general contractor serving the Tri-Cities area (Richland, Pasco, Kennewick), we bring military
> precision to every commercial construction project."

---

## Validation Checklist

### Page-Level SEO Audit

Use this checklist for every page:

- [ ] **Title includes location** (primary area or specific city)
- [ ] **Description mentions service area** (Tri-Cities and/or Pacific Northwest)
- [ ] **Keywords include contractor + location variations** (minimum 5-7 combinations)
- [ ] **H1 tag includes primary keyword + location**
- [ ] **Hero section mentions location naturally**
- [ ] **At least 2 location mentions in main content**
- [ ] **Footer includes complete service area**
- [ ] **Schema.org includes areaServed**
- [ ] **Contact information includes address with city**

### Metadata Validation

```bash
# Run SEO audit
npm run seo:audit

# Check specific page
node scripts/seo-audit.js /services
```

**Expected Results:**

- Title: 30-60 characters ✅
- Description: 120-160 characters ✅
- Keywords: 7-15 relevant terms ✅
- Score: 90-100/100 ✅

### Content Quality Check

- [ ] **Reads naturally** (not keyword-stuffed)
- [ ] **Provides value** (informative, helpful)
- [ ] **Unique content** (not duplicated from other pages)
- [ ] **Location context adds value** (not just for SEO)
- [ ] **Brand voice consistent** (matches messaging guidelines)
- [ ] **Call-to-action clear** (user knows next steps)

---

## Systematic Application Process

### Step 1: Update Existing Pages

**Priority Order:**

1. Homepage (highest traffic, most important)
2. Services (primary conversion page)
3. Contact (local business signals)
4. About (company credibility)
5. Careers (job-specific keywords)
6. All other pages

**Process:**

```bash
# For each page:
1. Import SEOFragments
2. Update metadata using builders
3. Add location context to hero section
4. Update footer service area
5. Run validation checklist
6. Test locally
7. Commit changes
```

### Step 2: Create New Pages with SEO Framework

**Template:**

```typescript
// app/new-page/page.tsx
import { SEOFragments } from '@/lib/seo/seo-content-fragments';

export const metadata = {
  title: SEOFragments.builders.seoTitle("Page Title", true),
  description: SEOFragments.builders.locationDescription(
    "Service description",
    "primary"
  ),
  keywords: SEOFragments.builders.locationKeywords([
    "base keyword 1",
    "base keyword 2",
  ]),
};

export default function NewPage() {
  return (
    <>
      <Hero>
        <h1>Page Title in {SEOFragments.location.triCitiesShort}</h1>
      </Hero>

      <Section>
        {/* Content with natural location mentions */}
      </Section>

      <Footer>
        <p>{SEOFragments.templates.footerServiceArea}</p>
      </Footer>
    </>
  );
}
```

### Step 3: Monitor and Optimize

**Weekly:**

- Run `npm run seo:audit` to verify all pages
- Check Google Search Console for ranking changes
- Monitor location-based search performance

**Monthly:**

- Review and update SEOFragments if needed
- Add new service/location combinations
- Update descriptions based on performance

**Quarterly:**

- Comprehensive SEO audit
- Competitor analysis for location keywords
- Content refresh for underperforming pages

---

## Integration with Existing Systems

### Branding Messaging Integration

**Location:** `docs/branding/strategy/messaging.md`

The SEO fragments complement (not replace) brand messaging:

- Brand messaging defines _what_ we say
- SEO fragments define _how_ we say it for search optimization
- Both work together for consistent, optimized content

**Example Integration:**

```typescript
// Brand message from messaging.md
const brandMessage = "Building for the Client, NOT the Dollar";

// SEO-optimized location context
const seoContext = SEOFragments.location.servingPhrase;

// Combined
const heroMessage = `${brandMessage}. ${veteranFragments.veteranOwnedLocal} ${seoContext}.`;
```

### Page-Specific Messaging Strategy

**Location:** `docs/branding/strategy/page-specific-messaging-guide.md`

Each of the 7 page groups has unique SEO needs:

| Group                   | SEO Focus                     | Fragment Priority            |
| ----------------------- | ----------------------------- | ---------------------------- |
| Traditional Business    | General contractor + location | High location density        |
| Heritage & Track Record | Historical presence + area    | Local expertise emphasis     |
| Future Vision           | Services + region             | Service-location combos      |
| Professional Patriotic  | Veteran + government          | Hanford-specific terms       |
| Recruitment             | Jobs + cities                 | Job title + location         |
| Tech Innovation         | Modern tools + accessibility  | Balanced, not location-heavy |
| Partnership & ROI       | Urgent + regional             | Extended service area        |

---

## Troubleshooting

### Issue: Keyword Stuffing Detection

**Symptoms:**

- Content reads unnaturally
- Repetitive location mentions
- Poor user experience

**Solution:**

```typescript
// Bad: Over-optimized
"General contractor Richland, general contractor Pasco, general contractor Kennewick";

// Good: Natural integration
SEOFragments.builders.locationDescription(
  "Expert construction services",
  "primary",
);
// Results in: "Expert construction services serving the Tri-Cities..."
```

### Issue: Metadata Too Long

**Symptoms:**

- Title > 60 characters
- Description > 160 characters
- Search results truncated

**Solution:**

```typescript
// Use short form for metadata
title: SEOFragments.builders.seoTitle("Services", true, "Tri-Cities");
// Instead of full location text
```

### Issue: Duplicate Content Warnings

**Symptoms:**

- Similar descriptions across pages
- Boilerplate text detected

**Solution:**

```typescript
// Customize descriptions per page
const baseDesc = SEOFragments.builders.locationDescription(
  "Commercial construction", // page-specific service
  "primary",
);

// Add unique value proposition
const fullDesc = `${baseDesc} Specializing in medical facilities and tenant improvements.`;
```

---

## Related Documentation

- **[Core SEO Guide](./seo-complete-guide.md)** - Complete SEO implementation
- **[Brand Messaging](../../branding/strategy/messaging.md)** - Brand voice guidelines
- **[Page-Specific Messaging](../../branding/strategy/page-specific-messaging-guide.md)** - 7-group strategy
- **[SEO Content Fragments](../../../src/lib/seo/seo-content-fragments.ts)** - Source code
- **[Services Documentation](../../business/services.md)** - Service definitions

---

## Version History

- **v1.0.0** (Dec 2, 2025): Initial SEO messaging strategy document
  - Created centralized SEO content fragments library
  - Established systematic application patterns
  - Defined page-by-page implementation strategy
  - Integrated with existing brand messaging framework

---

**Last Updated:** December 2, 2025  
**Maintained By:** MH Construction Development Team  
**Review Schedule:** Monthly optimization, quarterly comprehensive review
