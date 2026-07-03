# Hero Congruency Rollout Plan (2026-05-16)

**Category:** Development - Standards Archive Snapshot  
**Status:** Archived Snapshot  
**Archived On:** July 3, 2026  
**Original Location:** [docs/development/standards/hero-congruency-rollout-plan-2026-05-16.md](../../development/standards/hero-congruency-rollout-plan-2026-05-16.md)  
**Active Replacement Source:** [docs/development/standards/index.md](../../development/standards/index.md)

## Objective

Ship hero-section congruency across all website routes so every page has a hero and follows the Home baseline for typography, spacing, icon treatment, and top/bottom framing.

## Baseline

- Canonical source: apps/website/src/components/home/HeroSection.tsx
- Policy agent: .github/agents/hero-congruency-officer.agent.md
- Current inventory: docs/development/standards/hero-presence-inventory-2026-05-16.md

## Current Gap

- Total routes: 39
- Hero present: 12
- Hero missing: 27
- Current status: FAIL

## Implementation Strategy

1. Reuse one congruent hero pattern for all missing routes.
2. Prefer route-local hero component files for readability on complex pages.
3. Use page-level hero heading hierarchy that mirrors Home baseline classes.
4. Keep one mission icon treatment per hero.
5. Add bottom-framed navigation only when route has meaningful in-page sections.
6. Re-run inventory after each phase.

## Phase 1: Highest Business Visibility

Goal: close gaps on routes with direct acquisition, conversion, or trust impact.

- apps/website/src/app/testimonials/page.tsx
- apps/website/src/app/events/page.tsx
- apps/website/src/app/locations/page.tsx
- apps/website/src/app/locations/[city]/page.tsx
- apps/website/src/app/projects/[slug]/page.tsx
- apps/website/src/app/services/[slug]/page.tsx
- apps/website/src/app/public-sector/tri-state-government-construction/page.tsx
- apps/website/src/app/public-sector/veteran-led-compliance/page.tsx
- apps/website/src/app/veterans/public-sector-construction/page.tsx

Exit criteria:

- All Phase 1 routes have hero presence.
- No hero-style regressions on existing routes.
- Inventory refreshed and committed.

## Phase 2: Resource and Program Surfaces

Goal: enforce congruent first impression across document and program discovery surfaces.

- apps/website/src/app/resources/page.tsx
- apps/website/src/app/resources/safety-program/page.tsx
- apps/website/src/app/resources/safety-manual/page.tsx
- apps/website/src/app/resources/safety-manual/[cluster]/page.tsx
- apps/website/src/app/resources/safety-manual/contents/page.tsx
- apps/website/src/app/resources/safety-manual/forms/page.tsx
- apps/website/src/app/resources/safety-manual/section/[slug]/page.tsx
- apps/website/src/app/safety/incident-report/page.tsx
- apps/website/src/app/safety/intake/page.tsx

Exit criteria:

- All Phase 2 routes have hero presence.
- Hero text remains accessibility-compliant and readable over backgrounds.
- Inventory refreshed and committed.

## Phase 3: Utility, Policy, and System Routes

Goal: complete all-page coverage including utility and governance pages.

- apps/website/src/app/accessibility/page.tsx
- apps/website/src/app/privacy/page.tsx
- apps/website/src/app/terms/page.tsx
- apps/website/src/app/employee-handbook/page.tsx
- apps/website/src/app/cool-desert-nights/page.tsx
- apps/website/src/app/offline/page.tsx
- apps/website/src/app/careers/print/page.tsx
- apps/website/src/app/safety/print/[id]/page.tsx
- apps/website/src/app/faq/[category]/page.tsx

Exit criteria:

- All Phase 3 routes have hero presence.
- Print and offline experiences still function correctly after hero integration.
- Inventory refreshed and committed.

## QA Gate Per Phase

1. Hero presence inventory regenerated.
2. Hero congruency checks pass for modified routes.
3. Type and lint checks pass for modified files.
4. Manual visual spot-check at desktop and mobile widths.

## Final Completion Gate

- Hero presence inventory reaches:
  - Hero present: 39
  - Hero missing: 0
  - Status: PASS
- Hero congruency audit remains PASS.

## Ownership and Tracking

- Tracking doc: this file
- Evidence artifact: docs/development/standards/hero-presence-inventory-2026-05-16.md
- Policy authority: .github/agents/hero-congruency-officer.agent.md
