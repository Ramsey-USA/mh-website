# MH Website Page Branding Audit — Volume 2

Last Updated: April 18, 2026
Status: Complete

## Scope

This is the second audit pass, covering all public-facing pages not addressed in `page-branding-audit.md`.

Pages audited in Volume 1 (excluded here): /safety, /about, /services, /projects, /team, /careers, /contact, /faq, /trade-partners (route: /allies), /veterans

Pages in scope for this volume:

- / (Home)
- /testimonials
- /resources
- /locations/\* (all 11 city sub-pages)
- /public-sector
- /hub
- /privacy
- /terms
- /accessibility

Standards references:

- docs/branding/brand-constants.md
- docs/branding/standards/unified-component-standards.md
- docs/branding/strategy/messaging.md
- docs/branding/strategy/universal-terminology-guide.md

## Severity Scale

- High: Brand-critical wording/identity violations or strong trust risk
- Medium: Structural style or messaging drift from official standards
- Low: Minor consistency opportunities

---

## Page 1 Audit: / (Home)

Files:

- src/app/page.tsx
- src/components/home/HeroSection.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. Medium: Home hero H1 does not follow official responsive hero scale

- Location: src/components/home/HeroSection.tsx:38
- Current H1 uses `text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-relaxed` — one full size step below canonical at every breakpoint, wrong weight (`font-bold` vs `font-black`), wrong leading (`leading-relaxed` vs `leading-tight`), and missing `tracking-tight`.
- Source standard: docs/branding/standards/unified-component-standards.md

1. Medium: Home page CompanyStats description uses forbidden standalone "client" terminology

- Location: src/app/page.tsx:178
- Current description prop: `"...strong client relationships across the Pacific Northwest."`
- Brand terminology standard requires "Client Partner relationships" or "Client Partner" language.
- Source standard: docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Home page metadata (title, description, openGraph, twitter) already uses canonical "Veteran-Owned Since January 2025" phrasing throughout.
- Hero slogan is present in HeroSection.tsx with correct "NOT" emphasis token and capital "Dollar".
- AmericanFlag component used instead of emoji imagery — Material Icon policy compliant.
- CompanyStats, TestimonialsSection, and WhyPartnerSection use approved "Client Partners" language in their titles and rendered sections.

### Recommended Fix Order

1. Align home hero H1 to official responsive hero scale: `text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight`.
2. Replace "strong client relationships" in the CompanyStats `description` prop on the home page with "strong Client Partner relationships".

### Remediation Applied

- Updated the Home hero H1 in `src/components/home/HeroSection.tsx` to the canonical responsive scale with `font-black`, `leading-tight`, and `tracking-tight`.
- Updated Home CompanyStats body copy in `src/app/page.tsx` from "client relationships" to "Client Partner relationships".
- Verified no new diagnostics in edited Home files.

---

## Page 2 Audit: /testimonials

File: src/app/testimonials/page.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. Medium: Testimonials hero H1 does not follow official responsive hero scale

- Location: src/app/testimonials/page.tsx:159
- Current H1 uses `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-relaxed tracking-tighter` — greatly exceeds canonical maximum (xl:text-5xl), wrong leading, wrong tracking suffix (`-tighter` vs `-tight`).
- Source standard: docs/branding/standards/unified-component-standards.md

1. High: Key ownership trust-signal section heading and badge lack canonical dated ownership phrasing

- Location: src/app/testimonials/page.tsx:310, src/app/testimonials/page.tsx:1112, src/app/testimonials/page.tsx:1115
- The main gradient section heading renders "Veteran-Owned. Relationship-First." and the ownership badge area renders only "Veteran-Owned" / "SBA Certified Veteran-Owned Small Business" — none of these include the required date qualifier.
- Brand standard requires ownership-status claims to use "Veteran-Owned Since January 2025".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

1. Low: Structured data FAQ answer and visible copy use standalone "client feedback" phrase

- Location: src/app/testimonials/page.tsx:80, src/app/testimonials/page.tsx:802, src/app/testimonials/page.tsx:959
- Copy uses "client feedback" where brand terminology prefers "Client Partner feedback".
- Source standard: docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Testimonials page metadata (title, description, openGraph) should be verified via page-seo-utils.ts (see Recommended Fix Order).
- Primary slogan phrasing "building for the Client, NOT the Dollar" is present in structured FAQ data (line 96) with correct capitalization.
- The two-line gradient pattern is used for major section sub-headers (e.g., "Why Client Feedback" section header at line 287 uses the two-line subtitle + gradient structure).
- Material Icon usage is compliant; no emoji found in testimonials source.
- "Client Partners" terminology is used correctly in the hero subtitle, TestimonialsSection props, and key partnership copy.

### Recommended Fix Order

1. Correct primary ownership trust-signal headings and badge to use "Veteran-Owned Since January 2025".
2. Align testimonials hero H1 to official responsive hero scale.
3. Replace visible "client feedback" phrasing with "Client Partner feedback".

### Remediation Applied

- Updated Testimonials hero H1 to the canonical responsive scale (`text-lg` through `xl:text-5xl`) with `leading-tight` and `tracking-tight`.
- Updated ownership trust-signal copy to canonical dated phrasing in section heading and badge content.
- Replaced "client feedback" with "Client Partner feedback" in FAQ structured-data text and visible page copy.
- Verified no new diagnostics in edited Testimonials source.

---

## Page 3 Audit: /resources

File: src/app/resources/page.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. High: Resources metadata contains no veteran ownership phrasing

- Location: src/app/resources/page.tsx:22–28 (inline metadata export)
- Current description: `"Download MH Construction's Safety Manual, toolbox talk forms, JHA templates, equipment checklists, and all field documentation. Consistent branding on and off the job site."` — no veteran-owned identifier, no company founding context.
- Brand standard requires canonical ownership-status phrasing in page metadata when describing company deliverables.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

1. Medium: Resources hero H1 does not follow official responsive hero scale

- Location: src/app/resources/page.tsx:70
- Current H1 uses `text-4xl sm:text-5xl font-black ... leading-tight` — starts at text-4xl (canonical starts at text-lg) and has no intermediate xs/md/lg/xl breakpoints, giving an abrupt jump rather than fluid progressive scale. Also missing `tracking-tight`.
- Source standard: docs/branding/standards/unified-component-standards.md

### Passed Checks

- Resources hero H1 uses `font-black` and `leading-tight` weight/leading — partial alignment.
- Material Icon usage is compliant; no emoji in resources source.
- No forbidden client/vendor standalone terminology found in reviewed Resources user-facing copy.
- SafetyComplianceBadge includes a "veteran" variant badge in the bonding agency CTA section.

### Recommended Fix Order

1. Update Resources metadata description to include "Founded 2010, Veteran-Owned Since January 2025" context.
2. Align Resources hero H1 to official responsive hero scale with all breakpoints and `tracking-tight`.

### Remediation Applied

- Updated Resources metadata and openGraph description in `src/app/resources/page.tsx` to include canonical veteran-ownership context.
- Updated Resources hero H1 to the official responsive scale with `tracking-tight`.
- Verified no new diagnostics in edited Resources source.

---

## Page 4 Audit: /locations/\* (All City Pages)

Files:

- src/components/locations/LocationPageContent.tsx (shared by all 11 city sub-pages)
- src/lib/data/locations.ts (location data including metadata descriptions)
- src/lib/seo/location-metadata.ts (metadata generator)

City sub-pages affected:
/locations/kennewick, /locations/pasco, /locations/richland, /locations/west-richland,
/locations/yakima, /locations/spokane, /locations/walla-walla, /locations/hermiston,
/locations/pendleton, /locations/coeur-d-alene, /locations/omak

Remediation Status: Completed on April 18, 2026

### Findings

1. High: Location metadata descriptions omit canonical dated veteran-owned phrasing

- Location: src/lib/data/locations.ts:96, src/lib/data/locations.ts:175 (and equivalent entries for all 11 cities)
- Current metaDescriptions use "Veteran-Owned GC serving [City] WA" without the "Since January 2025" date qualifier.
- Brand standard requires the dated form in ownership-status references.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

1. Medium: Location hero H1 exceeds canonical responsive hero scale and uses wrong tracking suffix

- Location: src/components/locations/LocationPageContent.tsx:212
- Current H1: `font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter`
- Scale is significantly oversize — canonical maximum is `xl:text-5xl`. Uses `tracking-tighter` (non-canonical) instead of `tracking-tight`.
- Source standard: docs/branding/standards/unified-component-standards.md

1. Medium: Shared location component uses veteran-owned claims without date qualifier in body copy

- Location: src/components/locations/LocationPageContent.tsx:42, src/components/locations/LocationPageContent.tsx:85, src/components/locations/LocationPageContent.tsx:107
- Trust-signal badge renders plain `"Veteran-Owned"` label; public-sector description references "Veteran-Owned business advantages"; structured location description uses `"Veteran-Owned general contractor serving [city]..."` — none include "Since January 2025".
- Source standard: docs/branding/brand-constants.md

### Passed Checks

- Richland (home base) location data includes the correct full ownership phrase in the hero description: "Founded 2010, Veteran-Owned Since January 2025" (src/lib/data/locations.ts:86).
- Location H1 uses `font-black` weight and `leading-tight` — partial canonical alignment.
- Material Icon usage is compliant in LocationPageContent.tsx.
- No forbidden standalone vendor/customer terminology found in reviewed LocationPageContent.tsx.

### Recommended Fix Order

1. Update all 11 city `metaDescription` entries in src/lib/data/locations.ts to include "Veteran-Owned Since January 2025".
2. Update trusted-badge label, public-sector description, and structured description template in LocationPageContent.tsx to include the dated ownership qualifier.
3. Normalize LocationPageContent H1 scale to canonical (`text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl`) and change `tracking-tighter` to `tracking-tight`.

### Remediation Applied

- Updated all city `metaDescription` entries in `src/lib/data/locations.ts` to include canonical dated veteran-ownership phrasing.
- Updated shared location content in `src/components/locations/LocationPageContent.tsx` trust-indicator label to "Veteran-Owned Since January 2025".
- Updated shared location content in `src/components/locations/LocationPageContent.tsx` public-sector fallback description to dated ownership phrasing.
- Updated shared location content in `src/components/locations/LocationPageContent.tsx` LocalBusiness schema description to canonical dated phrasing.
- Updated location hero H1 scale in `src/components/locations/LocationPageContent.tsx` to canonical classes and normalized tracking to `tracking-tight`.
- Verified no new diagnostics in edited location files.

---

## Page 5 Audit: /public-sector

File: src/app/public-sector/page.tsx

Remediation Status: Deferred — Under Construction

### Findings

None actionable at this time. The route renders an `UnderConstruction` placeholder with no brand-critical copy (controlled by `SHOW_UNDER_CONSTRUCTION = true` flag). The real page content (`PublicSectorFullPage.tsx`) is conditionally loaded and should be audited when enabled.

### Recommended Fix Order

1. When `SHOW_UNDER_CONSTRUCTION` is toggled to `false`, re-run a full branding audit on `src/app/public-sector/PublicSectorFullPage.tsx` before launch.

---

## Page 6 Audit: /hub

File: src/app/hub/HubClient.tsx

Remediation Status: Not Required — Internal Authenticated Page

### Findings

None. The /hub route is an authenticated employee/subcontractor resource portal (role-gated via `RoleGate`). It is not a public-facing brand page and is excluded from public branding requirements.

---

## Page 7 Audit: /privacy

File: src/app/privacy/page.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. Low: Privacy page H1 uses `font-bold` instead of `font-black` and does not include `tracking-tight`

- Location: src/app/privacy/page.tsx:33
- Current H1: `text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4`
- Legal document pages are not subject to the full hero scale requirement, but the brand weight standard prefers `font-black` for all primary headings.
- Source standard: docs/branding/standards/unified-component-standards.md

### Passed Checks

- Privacy page is a legal utility page — hero slogan, veteran-ownership dating, and gradient H2 pattern are not required here.
- Material Icon usage is compliant.
- No forbidden brand terminology violations found in policy text.

### Recommended Fix Order

1. Optionally update H1 `font-bold` to `font-black` for brand-weight consistency.

### Remediation Applied

- Updated Privacy page H1 in `src/app/privacy/page.tsx` from `font-bold` to `font-black` for brand-weight consistency.
- Verified no new diagnostics in edited Privacy source.

---

## Page 8 Audit: /terms

File: src/app/terms/page.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. Low: Terms page H1 uses `font-bold` instead of `font-black` and does not include `tracking-tight`

- Location: src/app/terms/page.tsx:33
- Current H1: `text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4`
- Same as Privacy — legal document pages carry lower requirements but brand weight standard prefers `font-black`.
- Source standard: docs/branding/standards/unified-component-standards.md

### Passed Checks

- Terms page is a legal utility page — hero slogan, veteran-ownership dating, and gradient H2 pattern are not required here.
- Material Icon usage is compliant.
- No forbidden brand terminology violations in policy text.

### Recommended Fix Order

1. Optionally update H1 `font-bold` to `font-black` for brand-weight consistency.

### Remediation Applied

- Updated Terms page H1 in `src/app/terms/page.tsx` from `font-bold` to `font-black` for brand-weight consistency.
- Verified no new diagnostics in edited Terms source.

---

## Page 9 Audit: /accessibility

File: src/app/accessibility/page.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. Low: Accessibility page H1 uses `font-bold` instead of `font-black`

- Location: src/app/accessibility/page.tsx:33
- Current H1: `text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4`
- Same pattern as Privacy and Terms — lower intent page with a minor weight deviation.
- Source standard: docs/branding/standards/unified-component-standards.md

### Passed Checks

- Accessibility page is a policy/statement page — hero slogan, veteran-ownership dating, and gradient section headers are not required here.
- Material Icon usage is compliant.
- No forbidden brand terminology violations in policy text.

### Recommended Fix Order

1. Optionally update H1 `font-bold` to `font-black` for brand-weight consistency.

### Remediation Applied

- Updated Accessibility page H1 in `src/app/accessibility/page.tsx` from `font-bold` to `font-black` for brand-weight consistency.
- Verified no new diagnostics in edited Accessibility source.

---

## Summary

| Page           | High                             | Medium                           | Low                      | Status       |
| -------------- | -------------------------------- | -------------------------------- | ------------------------ | ------------ |
| / (Home)       | —                                | 2 (H1 scale, client terminology) | —                        | Completed    |
| /testimonials  | 1 (ownership badge phrasing)     | 1 (H1 scale)                     | 1 (client feedback term) | Completed    |
| /resources     | 1 (metadata no veteran phrasing) | 1 (H1 scale)                     | —                        | Completed    |
| /locations/\*  | 1 (metadata phrasing ×11)        | 2 (H1 scale, body copy dating)   | —                        | Completed    |
| /public-sector | —                                | —                                | —                        | Deferred     |
| /hub           | —                                | —                                | —                        | Not Required |
| /privacy       | —                                | —                                | 1 (H1 weight)            | Completed    |
| /terms         | —                                | —                                | 1 (H1 weight)            | Completed    |
| /accessibility | —                                | —                                | 1 (H1 weight)            | Completed    |

## Audit Complete

All actionable pages in Volume 2 have been remediated.

Remaining non-action states:

- /public-sector: Deferred (under construction route gating)
- /hub: Not Required (internal authenticated portal)

Last Updated: April 18, 2026
Status: Complete
