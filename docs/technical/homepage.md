# Homepage Documentation

**Last Updated:** July 22, 2026  
**Version:** 3.0.0  
**Status:** Active  
**Source of Truth:** apps/website/src/app/page.tsx

> Canonical brand alignment references:
>
> - docs/branding/brand-constants.md
> - docs/branding/standards/hero-section-standards.md
> - docs/branding/standards/unified-component-standards.md

## Overview

The homepage is implemented as a server-first App Router page that combines:

- A poster-backed command-center hero.
- Public-proof summary cards sourced from current data.
- Service and project pathways for commercial delivery.
- Testimonials and a standardized next-step conversion section.

Primary brand line remains:

- Built on Quality, Backed by Trust.

## Current Stack Snapshot

Package snapshot from apps/website/package.json:

```json
{
  "next": "16.2.11",
  "react": "^19.2.8",
  "typescript": "^6.0.3"
}
```

## Current Homepage Structure

The current section order in apps/website/src/app/page.tsx is:

1. Hero section
2. Verified proof cards
3. Service overview cards and service-route chips
4. Featured public project case studies
5. Why MH planning/communication/execution points
6. Deferred testimonials section
7. Next steps section

Notes:

- Sections are composed with BrandedContentSection for visual consistency.
- Section spacing is standardized via HOME_SECTION_SPACING.
- Card styling is standardized via HOME_CARD_CLASS.

## Hero Baseline (Current)

Component:

- apps/website/src/components/home/HeroSection.tsx

Current behavior:

- Uses static poster image /images/home-hero-poster.webp.
- Uses a dark gradient atmosphere and readability overlay.
- Anchors content to lower-right envelope with safe header spacing.
- Renders dual-label command-center style copy:
  - Home -> Command Center
- Displays route slogan + primary MH mission line.
- Includes two in-hero CTAs:
  - Contact path
  - Projects proof path

## Data and Messaging Inputs

Locale and copy:

- Locale resolved server-side with getServerLocale.
- Hero and section copy sourced from:
  - messages/home/en.json
  - messages/home/es.json

Public proof and cards:

- Case studies sourced from lib/data/project-case-studies.
- Featured service chips resolved with getPublishedServiceDetailBySlug.
- Testimonials normalized from testimonialsData namespace.

CTA labels:

- Resolved via getUniversalCtaSet(locale).

## SEO, Analytics, and Runtime Gating

SEO:

- Metadata is provided by withGeoMetadata in apps/website/src/app/page.tsx.
- Structured data is injected through StructuredData from components/seo/SeoMeta.

Runtime gating:

- StructuredData only renders in production.
- PageTrackingClient and HomePageSentrySupport run only when:
  - NODE_ENV is production, and
  - request is not a Lighthouse audit user agent.

## Performance and Rendering Model

- Homepage remains server-first.
- Testimonials section uses deferred/lazy delivery via TestimonialsSectionDeferred.
- NextStepsSection is dynamically imported with SSR enabled.
- Home telemetry and Sentry support are conditionally mounted to avoid audit noise.

## Congruency Requirements for Docs

When editing homepage-related docs, keep these statements true to code:

1. Hero is poster-backed and lower-right anchored.
2. Hero contains two CTAs (contact + project proof).
3. Homepage section sequence matches Current Homepage Structure above.
4. Proof/service/project content is based on published data sources, not hard-coded claims.
5. Structured data and telemetry are production-gated as described.

If implementation changes, update this file in the same PR.

## Related Files

- apps/website/src/app/page.tsx
- apps/website/src/components/home/HeroSection.tsx
- apps/website/src/components/templates/BrandedContentSection.tsx
- apps/website/src/components/home/TestimonialsSectionDeferred.tsx
- apps/website/src/components/shared-sections/NextStepsSection.tsx
- apps/website/src/lib/seo/page-seo-utils.ts
- apps/website/src/lib/content/universal-ctas.ts
