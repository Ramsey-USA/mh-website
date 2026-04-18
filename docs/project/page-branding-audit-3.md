# MH Website Page Branding Audit — Volume 3

Last Updated: April 18, 2026
Status: Complete

## Scope

This audit extends branding congruency checks beyond Volumes 1 and 2 by covering:

- Remaining user-facing utility/app pages not previously audited in detail
- App-level shell metadata and error/fallback UX
- Regression checks on already-audited pages that changed after completion

Previous audit files:

- docs/project/page-branding-audit.md
- docs/project/page-branding-audit-2.md

Standards references:

- docs/branding/brand-constants.md
- docs/branding/standards/unified-component-standards.md
- docs/branding/strategy/messaging.md
- docs/branding/strategy/universal-terminology-guide.md

## Severity Scale

- High: Brand-critical wording/identity violations or trust-risk regressions
- Medium: Clear drift from canonical phrasing/heading system/terminology
- Low: Minor consistency opportunities and utility-page polish

---

## Page 1 Audit: App Shell Metadata

File: src/app/layout.tsx

Remediation Status: Complete

### Findings

1. High: Root metadata keywords/authors include veteran-owned phrasing without canonical dated ownership format

- Location: src/app/layout.tsx:38, src/app/layout.tsx:76, src/app/layout.tsx:82
- Current copy includes "Veteran-Owned contractor", "Army Veteran-Owned construction", and author label "Veteran-Owned Partnership-Driven Team" without "Since January 2025".
- Canonical ownership references should use "Veteran-Owned Since January 2025" when status is stated.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Root title/description/openGraph/twitter strings already include "Founded 2010, Veteran-Owned Since January 2025" in primary snippets.
- Primary slogan appears in root title.

### Recommended Fix Order

1. Normalize veteran-owned references in keywords/authors to include canonical dated phrasing where ownership is explicitly stated.

---

## Page 2 Audit: /careers/print

Files:

- src/app/careers/print/page.tsx
- src/app/careers/print/PrintableApplicationClient.tsx

Remediation Status: Complete

### Findings

1. Medium: Printable application tagline uses non-canonical veteran-owned phrasing

- Location: src/app/careers/print/PrintableApplicationClient.tsx:19
- Current copy: "Veteran-Owned General Contractor".
- Canonical ownership phrase should include date qualifier when ownership status is stated.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

1. Low: Spanish slogan variant uses non-canonical emphasis token and capitalization relative to established English canonical line

- Location: src/app/careers/print/PrintableApplicationClient.tsx:126
- Current copy: "Construyendo proyectos para el cliente, NO por el dinero".
- This may be intentional localization, but it diverges from the canonical emphasis pattern used across bilingual pages.
- Source standard: docs/branding/brand-constants.md

### Passed Checks

- English slogan line remains correct in print app: "Building projects for the Client, NOT the Dollar".
- Print route metadata is clear and purpose-specific.

### Recommended Fix Order

1. Update print-page ownership tagline to include "Since January 2025".
2. Decide and document canonical Spanish slogan policy (keep current or align with bilingual standard used on Contact page).

---

## Page 3 Audit: /resources/safety-program

File: src/app/resources/safety-program/page.tsx

Remediation Status: Complete

### Findings

1. Medium: Keyword and credential badge variants use non-canonical veteran wording

- Location: src/app/resources/safety-program/page.tsx:60, src/app/resources/safety-program/page.tsx:217
- Current strings include "Veteran-Owned contractor safety" and badge label "Veteran Owned" (missing hyphen and missing date qualifier).
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Core metadata and content are strong and already aligned with safety/compliance brand voice.
- Page structure follows the approved section-header pattern.

### Recommended Fix Order

1. Normalize veteran keyword and badge wording to canonical ownership format.

---

## Page 4 Audit: /resources/safety-manual/section/[slug]

File: src/app/resources/safety-manual/section/[slug]/page.tsx

Remediation Status: Exempt — document-section routes are governed by Documents & Forms Standards (docs/branding/standards/documents-and-forms-standards.md). Hero typography standard does not apply.

### Findings

1. Low: Section page H1 uses utility scale and does not follow canonical hero H1 system

- Location: src/app/resources/safety-manual/section/[slug]/page.tsx:119
- Current H1: `text-3xl sm:text-4xl font-black ...`.
- This may be acceptable for document-section UX, but it is a visual departure from standardized hero treatment.
- Source standard: docs/branding/standards/unified-component-standards.md

### Passed Checks

- Good breadcrumb wiring and structured data.
- Page purpose (document section reading/downloading) is clear and operationally consistent.

### Recommended Fix Order

1. Optional: decide whether document-section routes should be exempt from hero typography standard; if not exempt, define a compact canonical variant and apply consistently.

---

## Page 5 Audit: /safety/intake

File: src/app/safety/intake/page.tsx

Remediation Status: Complete

### Findings

1. Medium: Intake hero H1 scale diverges from canonical hero scale

- Location: src/app/safety/intake/page.tsx:195
- Current H1: `text-3xl xs:text-4xl sm:text-5xl ... lg:text-5xl`.
- Canonical hero H1 scale standard is `text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight`.
- Source standard: docs/branding/standards/unified-component-standards.md

### Passed Checks

- Dual naming format used correctly: "Logistics → Document Intake".
- Mission-oriented copy and safety voice are consistent.

### Recommended Fix Order

1. Align intake hero H1 to canonical responsive hero scale.

---

## Page 6 Audit: /offline

File: src/app/offline/page.tsx

Remediation Status: Complete — brand voice, dual-label section header, slogan, and brand color scheme applied. See docs/branding/standards/documents-and-forms-standards.md for offline/utility surface policy.

### Findings

1. Low: Offline page lacks canonical slogan/identity line used across primary routes

- Location: src/app/offline/page.tsx (page body)
- The route is operationally clear but omits the standard identity anchor used throughout branded pages.
- Source standard: docs/branding/strategy/messaging.md

1. Low: Utility copy uses generic app language instead of branded terminology system

- Location: src/app/offline/page.tsx:54, src/app/offline/page.tsx:115
- Current labels such as "Available offline" and "MH Construction App · Offline Mode Active" are functionally fine but could be brought into dual-label system.
- Source standard: docs/branding/strategy/messaging.md

### Passed Checks

- Visual design is coherent and accessible for offline state.
- Clear CTA recovery actions are provided.

### Recommended Fix Order

1. Add compact brand line (slogan or short canonical identity statement).
2. Optionally update utility labels to dual-label style.

---

## Page 7 Audit: 404 and Error UX

Files:

- src/app/not-found.tsx
- src/app/error.tsx
- src/app/global-error.tsx

Remediation Status: Complete (emoji replaced with SVG icon; optional copy pass deferred)

### Findings

1. High: Global error page uses emoji icon, violating no-emoji source standard

- Location: src/app/global-error.tsx:61
- Current symbol: "⚠" rendered directly in source.
- Standards require Material Icon/component usage and avoid emoji in app source.
- Source standard: docs/branding/standards/unified-component-standards.md

1. Medium: Global error page visual language diverges from app brand system

- Location: src/app/global-error.tsx (inline style-only layout)
- Current implementation bypasses established component styling and typography patterns used by not-found and route error pages.
- Source standard: docs/branding/standards/unified-component-standards.md

1. Low: 404 and route error pages use generic messaging and could be upgraded to canonical brand voice

- Location: src/app/not-found.tsx:40, src/app/error.tsx:56
- Current strings are functional but less aligned with dual-label and service-earned brand voice.
- Source standard: docs/branding/strategy/messaging.md

### Passed Checks

- Not-found and route error pages use MH branding assets and clear recovery CTAs.
- Error handling paths are implemented and navigable.

### Recommended Fix Order

1. Replace global-error emoji warning with MaterialIcon-based implementation.
2. Refactor global-error styling toward shared app design tokens/components.
3. Optional copy pass for not-found/error to align with brand voice.

---

## Regression Check: /testimonials (Post-Audit Drift)

File: src/app/testimonials/page.tsx

Remediation Status: Complete

### Findings

1. High: Multiple testimonial ownership references reverted to non-canonical phrasing

- Location: src/app/testimonials/page.tsx:96, src/app/testimonials/page.tsx:167, src/app/testimonials/page.tsx:812, src/app/testimonials/page.tsx:937, src/app/testimonials/page.tsx:1009, src/app/testimonials/page.tsx:1317
- Several strings still use "Veteran-Owned" / "Veteran-Owned business" / "Veteran-Owned team" without dated qualifier.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

1. Medium: FAQ question text includes forbidden standalone "clients" term

- Location: src/app/testimonials/page.tsx:1031
- Current string: "Can I speak with past clients?"
- Preferred terminology: Client Partners.
- Source standard: docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Hero H1 scale remains canonical.
- Most Client Partner terminology updates remain in place.

### Recommended Fix Order

1. Normalize all ownership-status references in testimonials to canonical dated phrasing.
2. Replace "past clients" with "past Client Partners" in FAQ display text.

### Remediation Applied

- Updated the FAQ structured-data question from "past MH Construction clients" to "past MH Construction Client Partners".
- Normalized remaining testimonial copy to the canonical dated ownership phrasing in the Pacific Northwest service area section and the testimonials empty state.
- Completed the regression cleanup items originally queued in this volume.

---

## Out-of-Scope or Non-Actionable Wrappers

Routes/components reviewed but not requiring branding remediation now:

- src/app/safety/hub/page.tsx (redirect wrapper to /hub)
- src/app/resources/safety-manual/page.tsx (redirect wrapper)
- src/app/safety/print/[id]/page.tsx (metadata wrapper only)
- src/app/dashboard/page.tsx (authenticated admin/internal route; separate product-surface standards recommended)
- src/app/public-sector/page.tsx (still route-gated under under-construction flag)

---

## Summary

| Surface                                 | High | Medium | Low | Status                               |
| --------------------------------------- | ---- | ------ | --- | ------------------------------------ |
| App shell metadata                      | 1    | —      | —   | Complete                             |
| /careers/print                          | —    | 1      | 1   | Complete                             |
| /resources/safety-program               | —    | 1      | —   | Complete                             |
| /resources/safety-manual/section/[slug] | —    | —      | 1   | Exempt — Documents & Forms Standards |
| /safety/intake                          | —    | 1      | —   | Complete                             |
| /offline                                | —    | —      | 2   | Complete                             |
| 404 + error UX                          | 1    | 1      | 1   | Complete                             |
| Regression: /testimonials               | 1    | 1      | —   | Complete                             |

## Coverage Verification

This volume's queued items have been completed or formally exempted. A final verification pass also confirmed:

1. `/testimonials` regression items are now resolved in both rendered UI and structured data.
2. `/offline` is now aligned to brand voice and color standards.
3. `/resources/safety-manual/section/[slug]` is governed by the Documents & Forms Standards exemption.
4. Redirect wrappers reviewed in this volume remain non-actionable.

Last Updated: April 18, 2026
Status: Complete
