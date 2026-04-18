# MH Website Page Branding Audit

Last Updated: April 18, 2026  
Status: Complete

## Scope

This audit checks each public-facing page against the canonical MH branding standards:

- docs/branding/brand-constants.md
- docs/branding/standards/unified-component-standards.md
- docs/branding/strategy/messaging.md
- docs/branding/strategy/universal-terminology-guide.md

## Severity Scale

- High: Brand-critical wording/identity violations or strong trust risk
- Medium: Structural style or messaging drift from official standards
- Low: Minor consistency opportunities

## Page 1 Audit: /safety

File: src/app/safety/page.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. High: Veteran ownership phrasing is incomplete in metadata

- Location: src/app/safety/page.tsx:17
- Current copy includes "Veteran-Owned." without the required date qualifier.
- Standard requires "Veteran-Owned Since January 2025" when veteran ownership is stated.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

2. High: Veteran ownership phrasing is incomplete in social metadata

- Location: src/app/safety/page.tsx:56
- Current copy includes "Veteran-Owned zero-incident culture." without the required date qualifier.
- Standard requires the dated phrasing for consistency and trust signaling.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

3. Medium: Primary slogan is missing from page body

- Location: src/app/safety/page.tsx (rendered sections)
- Required primary slogan is not present in visible page content.
- Standard states the slogan should be prominently featured across the site:
  "Building projects for the Client, NOT the Dollar"
- Source standard: docs/branding/strategy/page-specific-messaging-guide.md

4. Medium: Hero typography does not follow official responsive hero scale

- Location: src/app/safety/page.tsx:185
- H1 uses text-5xl md:text-6xl rather than the documented mobile-first hero scale.
- Source standard: docs/branding/standards/unified-component-standards.md

5. Medium: Section headers are not using the official two-line gradient H2 pattern

- Location: src/app/safety/page.tsx:217, src/app/safety/page.tsx:261, src/app/safety/page.tsx:301, src/app/safety/page.tsx:330
- Current H2 styling is valid and readable but does not follow the standardized two-line gradient implementation used as the official pattern.
- Source standard: docs/branding/standards/unified-component-standards.md

### Passed Checks

- Material Icon usage is compliant (no emoji usage in TSX source).
- Core brand colors are present and used in meaningful UI regions.
- Safety voice aligns with veteran discipline and accountability themes.
- No forbidden partnership-language terms found (for example, "customers").

### Recommended Fix Order

1. Replace all Veteran-Owned mentions on this page metadata with Veteran-Owned Since January 2025.
2. Add the primary slogan in the Safety hero or an immediate follow-up section, styling NOT with contrast emphasis.
3. Align hero H1 with official responsive scale.
4. Convert major H2 section headers to the official two-line gradient pattern.

### Remediation Applied

- Updated metadata veteran ownership phrasing to "Veteran-Owned Since January 2025".
- Added the primary slogan to hero body copy with contrasting emphasis on "NOT".
- Aligned hero H1 to official mobile-first responsive hero scale.
- Converted major section H2 headings to the official two-line gradient pattern.
- Performed a supplemental verification pass on [src/app/safety/layout.tsx] and updated route-level metadata strings to the canonical dated ownership phrasing.

---

## Page 2 Audit: /about

Files:

- src/app/about/page.tsx
- src/app/about/layout.tsx
- src/lib/seo/page-seo-utils.ts (About metadata source)
- src/components/about/AboutHero.tsx
- src/components/about/LeadershipTeam.tsx
- src/components/about/CompanyStats.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. High: Veteran ownership badge uses incorrect date format

- Location: src/app/about/page.tsx:259
- Current copy is "Veteran-Owned Since 2025".
- Standard requires "Veteran-Owned Since January 2025".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

2. High: Primary slogan capitalization is incorrect in hero

- Location: src/components/about/AboutHero.tsx:40
- Current copy renders "Building projects for the Client, NOT the dollar".
- Standard requires exact capitalization: "Building projects for the Client, NOT the Dollar".
- Source standard: docs/branding/brand-constants.md

3. Medium: Forbidden standalone "clients" terminology appears in user-facing About content

- Location: src/components/about/LeadershipTeam.tsx:85
- Current copy uses "our clients".
- Brand terminology standard requires "Client Partner" / "Client Partners".
- Source standard: docs/branding/strategy/universal-terminology-guide.md

4. Medium: Forbidden standalone "client" terminology appears in About section description

- Location: src/components/about/CompanyStats.tsx:94
- Current copy uses "lasting client relationships".
- Brand terminology standard requires explicit "Client Partner" wording.
- Source standard: docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- About metadata includes the correct standard phrase "Veteran-Owned Since January 2025" in centralized SEO source.
- Primary slogan is present in About hero content (with only capitalization correction needed for "Dollar").
- Material Icon usage is compliant in About route/component files reviewed.
- Major heading system in reviewed About sections generally follows approved brand patterns.

### Recommended Fix Order

1. Correct About badge phrase to "Veteran-Owned Since January 2025".
2. Fix slogan capitalization in About hero to exact canonical text.
3. Replace standalone "client/clients" phrasing with "Client Partner/Client Partners" in About components.

### Remediation Applied

- Updated the About badge to "Veteran-Owned Since January 2025".
- Corrected the hero slogan to the exact canonical capitalization: "Building projects for the Client, NOT the Dollar".
- Replaced standalone client terminology with "Client Partners" in reviewed About components.
- Replaced a residual standalone "clients" reference in the Trade Partner network card with "Client Partners" during the final coverage verification pass.
- Validated edited About files with targeted diagnostics; no errors found.

---

## Page 3 Audit: /services

Files:

- src/app/services/page.tsx
- src/app/services/layout.tsx
- src/lib/seo/page-seo-utils.ts (Services metadata source)
- src/components/services/ServicesHero.tsx
- src/components/services/servicesData.ts

Remediation Status: Pending
Remediation Status: Completed on April 18, 2026
Remediation Status: Completed on April 18, 2026

### Findings

1. High: Services metadata uses non-canonical veteran-owned phrasing

- Location: src/lib/seo/page-seo-utils.ts:385
- Current copy uses "Veteran-owned, Tri-Cities WA".
- Brand standard requires canonical capitalization, and when veteran ownership status is stated the approved phrasing is "Veteran-Owned Since January 2025".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

2. High: Primary slogan capitalization is incorrect in Services hero

- Location: src/components/services/ServicesHero.tsx:34
- Current copy renders "Building projects for the Client, NOT the dollar".
- Standard requires exact capitalization: "Building projects for the Client, NOT the Dollar".
- Source standard: docs/branding/brand-constants.md

3. Medium: Services hero H1 does not follow official responsive hero scale

- Location: src/components/services/ServicesHero.tsx:25
- Current H1 uses a custom smaller scale rather than the documented hero pattern.
- Source standard: docs/branding/standards/unified-component-standards.md

4. Medium: Forbidden vendor terminology appears in user-facing Services content

- Location: src/app/services/page.tsx:353, src/app/services/page.tsx:402
- Current UI uses "Vendor Network" and "Download Vendor Package".
- Brand terminology standards prefer "Trade Partner(s)" and explicitly ban "vendors".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

5. Medium: Forbidden vendor terminology appears in Services data copy

- Location: src/components/services/servicesData.ts:104, src/components/services/servicesData.ts:112
- Current copy includes "approved vendors", "vendor coordination", and "Approved Vendor Network Management".
- Brand terminology standards require Trade Partner language instead.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Services page shell already uses Client Partner terminology in major user-facing sections.
- Primary slogan is present in visible hero content.
- Major section H2 styling reviewed in Services page shell follows the approved two-line gradient pattern.
- Material Icon usage is compliant in reviewed Services files.

### Recommended Fix Order

1. Correct Services metadata to canonical veteran-owned phrasing.
2. Fix hero slogan capitalization and align Services hero H1 to official responsive scale.
3. Replace all vendor-network wording with Trade Partner terminology in visible Services UI and data-driven copy.

### Remediation Applied

- Updated Services metadata to the canonical veteran-owned phrasing: "Founded 2010, Veteran-Owned Since January 2025".
- Corrected the hero slogan to the exact canonical capitalization and aligned the hero H1 to the official responsive scale.
- Replaced vendor terminology with Trade Partner terminology in visible Services UI and data-driven Services copy.
- Validated edited Services files with targeted diagnostics; no errors found.

---

## Page 4 Audit: /projects

Files:

- src/app/projects/page.tsx
- src/app/projects/layout.tsx
- src/lib/seo/page-seo-utils.ts (Projects metadata source)
- src/app/projects/components/ProjectsHero.tsx
- src/app/projects/components/ProjectsFilterSection.tsx
- src/app/projects/components/ProjectsGridSection.tsx

Remediation Status: Pending

### Findings

1. Medium: Projects hero H1 does not follow official responsive hero scale

- Location: src/app/projects/components/ProjectsHero.tsx:32
- Current H1 uses a smaller custom scale and relaxed leading instead of the documented hero pattern.
- Source standard: docs/branding/standards/unified-component-standards.md

2. Medium: Filter section heading uses a custom large-heading treatment instead of the official section-heading pattern

- Location: src/app/projects/components/ProjectsFilterSection.tsx:25
- This is a major section entry point, but it uses a custom solid-color heading rather than the approved two-line gradient section header implementation.
- Source standard: docs/branding/standards/unified-component-standards.md

3. Medium: Projects grid section heading uses a custom large-heading treatment instead of the official section-heading pattern

- Location: src/app/projects/components/ProjectsGridSection.tsx:35
- The portfolio/story section is a primary page section, but it does not use the standardized two-line gradient H2 pattern.
- Source standard: docs/branding/standards/unified-component-standards.md

### Passed Checks

- Projects metadata already uses the correct veteran-owned date phrasing: "Veteran-Owned Since January 2025".
- The primary slogan is present in the Projects hero and uses the correct canonical capitalization.
- Client Partner terminology is used correctly in reviewed Projects components.
- Material Icon usage is compliant in reviewed Projects files.

### Recommended Fix Order

1. Align the Projects hero H1 to the official responsive hero scale.
2. Convert the filter section heading to the official section-heading pattern.
3. Convert the projects grid section heading to the official section-heading pattern.

### Remediation Applied

- Aligned the Projects hero H1 to the official responsive hero scale.
- Converted the filter section heading to the official two-line gradient section-heading pattern.
- Converted the projects grid heading to the official two-line gradient section-heading pattern.
- Validated edited Projects files with targeted diagnostics; no errors found.

---

## Page 5 Audit: /team

Files:

- src/app/team/page.tsx

Remediation Status: Completed on April 18, 2026

### Findings

1. High: Team FAQ structured data used non-canonical veteran-owned phrasing

- Location: src/app/team/page.tsx:121
- FAQ answer copy used a veteran-owned claim that did not use the canonical dated phrasing.
- Brand standard requires ownership-status references to use "Veteran-Owned Since January 2025".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- The primary slogan is present in the Team hero and uses the correct canonical capitalization.
- Team hero H1 follows the official responsive hero scale.
- Department section headings use the official two-line gradient pattern.
- Material Icon usage is compliant in reviewed Team files.
- Team culture copy uses Client Partner terminology in user-facing sections reviewed.
- Veteran-focused voice and all-branch leadership framing align with the Team page’s intended messaging.

### Recommended Fix Order

1. Correct Team metadata to canonical veteran-owned phrasing.

### Remediation Applied

- Updated Team FAQ structured-data wording to the canonical dated ownership phrasing in page source.
- Validated edited Team files with targeted diagnostics; no new errors introduced by this change.

---

## Page 6 Audit: /careers

Files:

- src/app/careers/CareersPageClient.tsx
- src/lib/seo/page-seo-utils.ts (Careers metadata source)

Remediation Status: Completed on April 18, 2026

### Findings

1. High: Careers metadata used non-canonical veteran-owned phrasing

- Location: src/lib/seo/page-seo-utils.ts:1009, src/lib/seo/page-seo-utils.ts:1026
- Current metadata/structured WebPage descriptions used lowercase "veteran-owned" and omitted the canonical dated ownership phrase.
- Brand standard requires ownership-status references to use "Veteran-Owned Since January 2025".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

2. Medium: Careers hero H1 did not follow official responsive hero scale

- Location: src/app/careers/CareersPageClient.tsx:160
- Hero H1 used a smaller custom scale and relaxed leading rather than the official mobile-first hero pattern.
- Source standard: docs/branding/standards/unified-component-standards.md

3. Low: Veteran ownership badge/messaging lacked canonical dated phrasing

- Location: src/app/careers/CareersPageClient.tsx:517, src/app/careers/CareersPageClient.tsx:1469
- User-facing ownership callouts referenced veteran ownership without the canonical dated format.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Primary slogan appears in Careers hero and uses canonical capitalization.
- Major Careers section headers reviewed use the official two-line gradient pattern.
- No forbidden standalone client/customer/vendor terminology found in reviewed Careers user-facing copy.
- Material Icon usage is compliant in reviewed Careers files.

### Recommended Fix Order

1. Correct Careers metadata ownership phrasing to canonical dated format.
2. Align Careers hero H1 to official responsive hero scale.
3. Normalize visible veteran-ownership callouts to canonical dated phrasing.

### Remediation Applied

- Updated Careers metadata and WebPage schema descriptions to include "Founded 2010, Veteran-Owned Since January 2025".
- Aligned Careers hero H1 to the official responsive hero typography scale and weight.
- Updated key Careers veteran-ownership callouts to canonical dated phrasing.
- Validated edited Careers and SEO files with targeted diagnostics; no new errors found in edited SEO source.

---

## Page 7 Audit: /contact

Files:

- src/app/contact/ContactPageClient.tsx
- src/lib/seo/page-seo-utils.ts (Contact metadata source)

Remediation Status: Completed on April 18, 2026

### Findings

1. High: Contact metadata used non-canonical veteran-owned phrasing

- Location: src/lib/seo/page-seo-utils.ts:1252, src/lib/seo/page-seo-utils.ts:1270
- Contact metadata and ContactPage schema description used lowercase "veteran-owned" and omitted the canonical dated ownership phrasing.
- Brand standard requires ownership-status references to use "Veteran-Owned Since January 2025".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

2. Medium: Contact hero H1 did not follow official responsive hero scale

- Location: src/app/contact/ContactPageClient.tsx:139
- Hero H1 used a smaller custom scale and relaxed leading instead of the documented mobile-first hero pattern.
- Source standard: docs/branding/standards/unified-component-standards.md

3. Medium: Forbidden standalone client/vendor terminology appeared in user-facing Contact pathways

- Location: src/app/contact/ContactPageClient.tsx:506, src/app/contact/ContactPageClient.tsx:525, src/app/contact/ContactPageClient.tsx:550, src/app/contact/ContactPageClient.tsx:731, src/app/contact/ContactPageClient.tsx:747
- User-facing English copy used standalone "client" and "vendor" wording where standards require Client Partner / Trade Partner terminology.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

4. Low: Hero slogan emphasis token was not canonical in English copy

- Location: src/app/contact/ContactPageClient.tsx:161
- English hero slogan used "NO" for emphasis, while canonical line requires "NOT".
- Source standard: docs/branding/brand-constants.md

### Passed Checks

- Contact page major section headers reviewed generally follow the approved two-line gradient pattern.
- Material Icon usage is compliant in reviewed Contact files.
- Primary slogan is present in Contact hero content.

### Recommended Fix Order

1. Correct Contact metadata ownership phrasing to canonical dated format.
2. Align Contact hero H1 to official responsive hero scale.
3. Replace standalone client/vendor wording with Client Partner/Trade Partner language.
4. Correct English slogan emphasis token to canonical form.

### Remediation Applied

- Updated Contact metadata and ContactPage schema descriptions to: "founded 2010, Veteran-Owned Since January 2025".
- Aligned Contact hero H1 to the official responsive hero typography scale and weight.
- Replaced user-facing English standalone "client/vendor" terminology with Client Partner/Trade Partner terminology.
- Updated hero slogan emphasis token to "NOT" for English and retained "NO" for Spanish.
- Performed targeted diagnostics; no new errors in edited SEO source.

---

## Page 8 Audit: /faq

Files:

- src/app/faq/page.tsx
- src/app/faq/layout.tsx
- src/lib/seo/page-seo-utils.ts (FAQ metadata source)

Remediation Status: Completed on April 18, 2026

### Findings

1. High: FAQ metadata used non-canonical veteran-owned phrasing

- Location: src/lib/seo/page-seo-utils.ts:1302, src/lib/seo/page-seo-utils.ts:1320
- FAQ metadata and WebPage schema description used lowercase "Veteran-owned" wording and omitted the canonical dated ownership phrase.
- Brand standard requires ownership-status references to use "Veteran-Owned Since January 2025".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

2. Medium: FAQ hero H1 did not follow official responsive hero scale

- Location: src/app/faq/page.tsx:151
- Hero H1 used a smaller custom scale and relaxed leading instead of the documented mobile-first hero pattern.
- Source standard: docs/branding/standards/unified-component-standards.md

3. Medium: FAQ category heading used a single-line gradient treatment instead of the official two-line pattern

- Location: src/app/faq/page.tsx:277
- Category section heading used only a single gradient line and did not follow the two-line subtitle + gradient-title standard.
- Source standard: docs/branding/standards/unified-component-standards.md

4. Low: Structured HowTo text used standalone client terminology

- Location: src/app/faq/page.tsx:47
- HowTo step text referenced "client walkthroughs" instead of Client Partner terminology.
- Source standard: docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Primary slogan is present in FAQ hero and uses canonical capitalization.
- Material Icon usage is compliant in reviewed FAQ files.
- FAQ route layout wiring and structured-data rendering remain intact.

### Recommended Fix Order

1. Correct FAQ metadata ownership phrasing to canonical dated format.
2. Align FAQ hero H1 to official responsive hero scale.
3. Convert category heading to official two-line gradient pattern.
4. Normalize structured HowTo terminology to Client Partner language.

### Remediation Applied

- Updated FAQ metadata and WebPage schema descriptions to include "Founded 2010, Veteran-Owned Since January 2025".
- Aligned FAQ hero H1 to the official responsive hero typography scale and weight.
- Updated FAQ category heading to a two-line pattern with subtitle + gradient title.
- Replaced HowTo structured-data term "client walkthroughs" with "Client Partner walkthroughs".
- Addressed local FAQ diagnostics in edited file (readonly props + stable question keys).

---

## Page 9 Audit: /trade-partners

Route Implemented: /allies

Files:

- src/app/allies/page.tsx
- src/lib/seo/page-seo-utils.ts (Trade Partners metadata source)

Remediation Status: Completed on April 18, 2026

### Findings

1. High: Trade Partners metadata used forbidden vendor terminology and non-canonical veteran-owned phrasing

- Location: src/lib/seo/page-seo-utils.ts:637, src/lib/seo/page-seo-utils.ts:874, src/lib/seo/page-seo-utils.ts:876
- Metadata copy used vendor-network terminology and non-canonical veteran-owned phrasing in core description/title content.
- Standards require Trade Partner language and canonical ownership phrasing when ownership status is stated.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

2. Medium: Trade Partners hero H1 did not follow official responsive hero scale

- Location: src/app/allies/page.tsx:464
- Hero H1 used a smaller custom scale and relaxed leading instead of the documented mobile-first hero pattern.
- Source standard: docs/branding/standards/unified-component-standards.md

3. Medium: User-facing Trade Partners content used forbidden vendor/clients terminology

- Location: src/app/allies/page.tsx:415, src/app/allies/page.tsx:611
- Visible copy used "clients" and "Vendor Partners" rather than required Client Partner / Trade Partner terminology.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

4. Low: Hero slogan capitalization and ownership badge phrasing needed canonical alignment

- Location: src/app/allies/page.tsx:475, src/app/allies/page.tsx:1196
- Hero rendered "the dollar" instead of "the Dollar" and veteran-owned badge lacked the canonical dated phrasing.
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Primary slogan is present in the Trade Partners hero.
- Major section headers reviewed follow the approved two-line gradient pattern.
- Material Icon usage is compliant in reviewed Trade Partners files.

### Recommended Fix Order

1. Correct metadata terminology and ownership phrasing in trade-partners SEO source.
2. Align Trade Partners hero H1 to official responsive hero scale.
3. Replace user-facing vendor/client terminology with Trade Partner/Client Partner language.
4. Correct hero slogan capitalization and ownership badge phrasing.

### Remediation Applied

- Updated Trade Partners metadata/title/description strings to Trade Partner language and canonical ownership phrasing.
- Updated SEO partner descriptions from vendor to Trade Partner wording where applicable.
- Aligned Allies hero H1 to official responsive hero scale and corrected slogan capitalization to "the Dollar".
- Replaced user-facing terminology in key Trade Partners copy to Client Partner/Trade Partner language.
- Updated visible veteran ownership copy to "Veteran-Owned Since January 2025".
- Standardized a residual ownership callout to use "Since January 2025" capitalization during the final coverage verification pass.
- Validated edited files with targeted diagnostics; no errors found in edited files.

---

## Page 10 Audit: /veterans

Files:

- src/app/veterans/page.tsx
- src/lib/seo/page-seo-utils.ts (Veterans metadata source)

Remediation Status: Completed on April 18, 2026

### Findings

1. Low: Year-round support section used lowercase "since" in canonical ownership callout

- Location: src/app/veterans/page.tsx:825
- Body copy rendered "Veteran-Owned company since January 2025" with lowercase "s" on "since".
- Standard requires the consistent capitalisation form "Veteran-Owned Since January 2025".
- Source standard: docs/branding/brand-constants.md and docs/branding/strategy/universal-terminology-guide.md

### Passed Checks

- Veterans metadata (WebPage schema and Metadata description) already carries canonical "Veteran-Owned Since January 2025" phrasing.
- Hero H1 already follows the official responsive hero typography scale.
- Primary slogan present in hero with canonical capitalisation including "NOT" emphasis and "Dollar".
- All section headings reviewed use the official two-line gradient H2 pattern.
- No forbidden standalone client/vendor/customers terminology found in reviewed Veterans copy.
- Material Icon usage is compliant; AmericanFlag component used instead of emoji for patriotic imagery.
- Veteran-ownership badge at page footer already reads "Veteran-Owned Since January 2025".

### Recommended Fix Order

1. Correct lowercase "since" to "Since" in year-round support section callout.

### Remediation Applied

- Updated "since January 2025" capitalisation to "Since January 2025" in the year-round support section body copy.
- Validated edited Veterans file with targeted diagnostics; no new errors introduced.

---

## Coverage Verification Complete

A final route inventory pass was run against all public-facing `src/app/**/page.tsx` entries plus public metadata/error surfaces.

Verified as audited or explicitly exempt/out-of-scope:

- All public route pages in Volumes 1, 2, and 3
- `src/app/layout.tsx`
- `src/app/safety/layout.tsx`
- `src/app/not-found.tsx`
- `src/app/error.tsx`
- `src/app/global-error.tsx`
- Printable/document surfaces and redirect wrappers reviewed in Volume 3

Remaining intentional exception:

- `src/app/public-sector/PublicSectorFullPage.tsx` remains deferred until the under-construction flag is removed

## Audit Complete

All currently exposed public-facing website surfaces have been audited and remediated, with the deferred public-sector full page noted above.

Last Updated: April 18, 2026  
Status: Complete
