# Website Guardrails Coverage Map

**Category:** Branding - Governance  
**Last Updated:** July 19, 2026  
**Status:** Active - Website-Wide Requirement

## Latest Progress Snapshot (July 19, 2026)

Status-state surfaces were standardized for branding congruency and accessibility:

- Route loading states now use a shared, layout-stable skeleton contract in
  `apps/website/src/components/ui/RouteLoadingState.tsx`.
- Existing route loading files (`/careers`, `/contact`, `/projects`, `/team`,
  `/testimonials`) were migrated to the shared loading shell.
- `error.tsx` and `global-error.tsx` remain narrow client boundaries while now
  using localized safe-action fallbacks and sanitized telemetry context.
- `not-found.tsx` remains a true 404 and now includes direct construction
  navigation CTAs for Services, Projects, Contact, and Home.

Validation evidence for this snapshot:

- `pnpm --filter @mhc/website lint`
- `pnpm --filter @mhc/website type-check`
- `pnpm test` (apps/website full suite)
- `pnpm --filter @mhc/website verify:route-integrity`
- `pnpm --filter @mhc/website build`

## Public Email Guardrail

Public-facing website surfaces must expose **only** `office@mhc-gc.com`.

Internal monitoring rule:

- Website-generated email notifications must still send to both `office@mhc-gc.com` and `matt@mhc-gc.com`.
- No other `@mhc-gc.com` address may appear in public UI, public content, public team data, or public mailto links.

Executable enforcement:

- Run `npm run public-email:guardrails:check` from `apps/website`.
- The website CI gate must keep this check enabled.

## Purpose

Define how MH Branding Guardrails must be applied across all website surfaces so enforcement is
explicit, complete, and repeatable.

This document operationalizes the guardrails from:

- `docs/branding/agent-branding-policy.md`
- `docs/branding/governance/brand-congruency-master-checklist.md`
- `.github/instructions/mh-branding-guardrails.instructions.md`

## Required Guardrail Dimensions

Every in-scope website change must preserve all dimensions below:

1. **Voice:** Relationship-first, factual, no hype language.
2. **Public contact routing:** Only `office@mhc-gc.com` appears on public website surfaces; internal email delivery still includes Matt for monitoring.
3. **Veteran framing:** Accurate veteran-owned wording and chronology.
4. **Trust continuity:** Accreditation, licenses, and credibility signals remain present where required.
5. **Terminology:** UI, metadata, schema, and docs use canonical naming.
6. **Accessibility:** Semantics, labels, contrast, keyboard flow remain compliant.
7. **SEO naming:** Plain-language naming and route/metadata consistency.
8. **Visual system:** Typography, color, spacing rhythm, and component behavior align with canonical standards.
9. **State parity:** Default, hover, focus-visible, active, disabled, loading/skeleton, success, and error states are visually and behaviorally consistent.
10. **Breakpoint parity:** Mobile, tablet, laptop, and desktop maintain hierarchy, spacing cadence, and CTA emphasis.
11. **Theme parity:** Light/dark and pre-hydration theme behavior preserve color intent, contrast, and trust-surface readability.
12. **Media parity:** Imagery, iconography, video treatments, and overlay gradients follow approved patterns and do not introduce off-brand styles.
13. **System-surface parity:** Shared app shell surfaces (header, navigation overlay, ribbon, footer, error, loading, offline, and not-found) remain congruent with routed pages.
14. **Background contract parity:** All non-hero surfaces use the global app-shell centered MH logo parallax watermark contract (single mark, no-repeat, centered, max-size with preserved aspect ratio), with route caveats enforced for veteran and government surfaces and motion safeguards (reduced-motion disable + bounded translation).

### Canonical Visual Enforcement Path (Buttons, Headings, Containers, Modals, Cards, Forms, Navigation, Footer Trust, and Hover Motion)

To avoid cross-doc conflicts, enforce this order for component and overlay behavior:

1. `docs/branding/standards/unified-component-standards.md`
2. `docs/development/standards/design-system-standards.md`
3. `docs/technical/design-system/buttons-ctas-complete-guide.md`
4. `docs/development/standards/page-compliance-checklist.md` (verification only)

Canonical anchor for button implementation: `#button-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for heading and subheading implementation:
`#heading-and-typography-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for container and modal implementation:
`#container-and-modal-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for card implementation:
`#card-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for form field and form shell implementation:
`#form-field-and-form-shell-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for navigation overlay and header action implementation:
`#navigation-overlay-and-header-action-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Canonical anchor for footer accreditation and trust continuity implementation:
`#footer-accreditation-and-trust-continuity-visual-contract-canonical` in
`docs/branding/standards/unified-component-standards.md`.

Rule: verification checklists must not introduce alternate implementation patterns that conflict
with canonical component and token standards.

## Canonical Contracts Matrix (Development Routing)

Use this table to route implementation and review decisions to the correct canonical source.

| UI Surface                 | Canonical Anchor (Source of Truth)                                                                                           | Implementation Companion                                      | Verification Gate                                         |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| Headings/Subheadings       | `docs/branding/standards/unified-component-standards.md#heading-and-typography-visual-contract-canonical`                    | `docs/development/standards/design-system-standards.md`       | `docs/development/standards/page-compliance-checklist.md` |
| Buttons/CTAs               | `docs/branding/standards/unified-component-standards.md#button-visual-contract-canonical`                                    | `docs/technical/design-system/buttons-ctas-complete-guide.md` | `docs/development/standards/page-compliance-checklist.md` |
| Containers/Modals          | `docs/branding/standards/unified-component-standards.md#container-and-modal-visual-contract-canonical`                       | `docs/development/standards/design-system-standards.md`       | `docs/development/standards/page-compliance-checklist.md` |
| Cards                      | `docs/branding/standards/unified-component-standards.md#card-visual-contract-canonical`                                      | `docs/development/standards/design-system-standards.md`       | `docs/development/standards/page-compliance-checklist.md` |
| Form Fields/Shells         | `docs/branding/standards/unified-component-standards.md#form-field-and-form-shell-visual-contract-canonical`                 | `docs/technical/form-security-standards.md`                   | `docs/development/standards/page-compliance-checklist.md` |
| Navigation/Overlay         | `docs/branding/standards/unified-component-standards.md#navigation-overlay-and-header-action-visual-contract-canonical`      | `docs/technical/homepage.md`                                  | `docs/development/standards/page-compliance-checklist.md` |
| Footer/Accreditation Trust | `docs/branding/standards/unified-component-standards.md#footer-accreditation-and-trust-continuity-visual-contract-canonical` | `docs/branding/brand-constants.md`                            | `docs/development/standards/page-compliance-checklist.md` |

Enforcement rule: if a companion or verification file conflicts with a canonical anchor above,
the canonical anchor wins and downstream files must be updated.

## Website Surface Coverage Matrix

| Surface Class                       | Example Areas                                                                              | Required Guardrail Check                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| Marketing and conversion pages      | Home, About, Services hub/lane pages, Projects, Contact                                    | Master checklist + strategy companion when messaging changes                    |
| Trust and credential surfaces       | Footer, Contact trust strip, Allies, Public Sector, Veterans                               | Master checklist with trust continuity emphasis                                 |
| Public contact surfaces             | Footer email, Contact page, Team page, chat fallback copy, legal cards, and mailto CTAs    | Public email guardrail + trust continuity validation                            |
| SEO surfaces                        | Page titles, metadata utilities, schema, route indexing docs                               | Master checklist + SEO consistency validation                                   |
| UI implementation surfaces          | Shared components, section templates, tokens, theming context                              | Master checklist + development companion checklist                              |
| Safety and resource surfaces        | Safety pages, resources, manuals/forms entry points                                        | Master checklist + trust/accessibility validation                               |
| Operational and support surfaces    | FAQ, Careers, accessibility/privacy/terms, offline/PWA touchpoints                         | Master checklist with terminology and accessibility validation                  |
| App-shell surfaces                  | Header, global navigation, Jeremy leadership ribbon, footer                                | Master checklist + canonical contracts matrix + development companion checklist |
| Route-state surfaces                | `loading.tsx`, `error.tsx`, `global-error.tsx`, `not-found.tsx`, offline page              | Master checklist + accessibility/state parity checks                            |
| Dynamic-route templates             | Locations city pages, project detail pages, FAQ category pages, manual section routes      | Master checklist + template parity check (heading, CTA tier, trust cadence)     |
| Form lifecycle surfaces             | Empty, validation error, submit-pending, submit-success/failure, anti-bot trust indicators | Master checklist + form security + visual state parity check                    |
| Legal and compliance pages          | Terms, Privacy, Accessibility, Public Sector compliance narratives                         | Master checklist + terminology + trust continuity checks                        |
| Print/download surfaces             | Careers print, safety print outputs, downloadable form wrappers                            | Master checklist + documents/forms standards + accessibility readability        |
| Campaign and commemorative surfaces | Semiquincentennial banners, founder tributes, seasonal notices                             | Master checklist + documented exception scope + expiry tracking                 |
| Third-party color surfaces          | Social platform action clusters and external brand recognizers                             | Master checklist + third-party color exception guardrails                       |

## Current Route Manifest (Tracked Pages and States)

Use this manifest as the minimum route-surface inventory for branding audits.

### Public Page Routes

1. `/`
2. `/about`
3. `/about/details`
4. `/accessibility`
5. `/allies`
6. `/careers`
7. `/careers/print`
8. `/contact`
9. `/cool-desert-nights`
10. `/employee-handbook`
11. `/events`
12. `/events/operation-cast-recover`
13. `/faq`
14. `/faq/[category]`
15. `/jeremy-thamert`
16. `/locations`
17. `/locations/[city]`
18. `/offline`
19. `/privacy`
20. `/projects`
21. `/projects/[slug]`
22. `/public-sector`
23. `/public-sector/tri-state-government-construction`
24. `/public-sector/veteran-led-compliance`
25. `/qr-codes`
26. `/resources`
27. `/resources/safety-program`
28. `/resources/safety-manual`
29. `/resources/safety-manual/contents`
30. `/resources/safety-manual/forms`
31. `/resources/safety-manual/[cluster]`
32. `/resources/safety-manual/section/[slug]`
33. `/safety`
34. `/safety/incident-report`
35. `/safety/intake`
36. `/safety/print/[id]`
37. `/services`
38. `/team`
39. `/terms`
40. `/testimonials`
41. `/veterans`
42. `/veterans/public-sector-construction`

### Shared State Surfaces

1. Root error surface (`error.tsx`)
2. Root global error surface (`global-error.tsx`)
3. Root not-found surface (`not-found.tsx`)
4. Route loading surfaces (where `loading.tsx` exists)

### Layout Shell Surfaces

Track layout wrappers because they can alter global spacing, breadcrumbs, banners, and trust rhythm across multiple child pages.

1. `/about`
2. `/accessibility`
3. `/allies`
4. `/careers`
5. `/contact`
6. `/faq`
7. `/locations`
8. `/offline`
9. `/privacy`
10. `/projects`
11. `/public-sector`
12. `/safety`
13. `/safety/hub`
14. `/safety/incident-report`
15. `/services`
16. `/team`
17. `/terms`
18. `/testimonials`
19. `/veterans`

### Manifest Maintenance Rule

When a route is added, removed, or renamed, update this manifest in the same PR and include updated evidence in the branding gate results.

## Comprehensive Sweep Protocol (Every Page, Section, Button, and Background)

For comprehensive branding sweeps, produce all inventories below.

### Required Inventories

1. **Route inventory**: Every current page route and shared state surface.
2. **Section inventory**: Every section shell and major section block on affected routes.
3. **Button/action inventory**: Every primary, secondary, tertiary action control (Button, link-styled action, raw button/input submit).
4. **Background inventory**: Every section and shell background treatment (logo paraplex layers, gradients, overlays) with explicit hero-vs-non-hero scoping.

### Recommended Sweep Commands

1. `rg --files apps/website/src/app | rg '(page|layout|loading|error|global-error|not-found)\\.(tsx|ts|jsx|js)$'`
2. `rg -n '<Button|<a |button\\s|type="submit"' apps/website/src --glob '!**/*.test.*'`
3. `rg -n 'DiagonalStripePattern|lightLogoSrc|darkLogoSrc|mh-logo-light-bg|mh-logo-dark-bg|mh-logo-black|mh-logo-white|mh-veteran-bg|repeating-linear-gradient|BrandColorBlobs|bg-linear|bg-gradient|radial-gradient|backgroundRepeat:\s*"repeat"' apps/website/src --glob '!**/*.test.*'`
4. `rg -n 'SectionShell|SectionContainer|BrandedContentSection|NextStepsSection|HeroSection' apps/website/src --glob '!**/*.test.*'`
5. `npm run public-email:guardrails:check`

### Audit Output Requirement

Record PASS/FAIL plus top remediations for each inventory in PR notes for branding-sensitive sweeps.

## Visual Coverage Acceptance Criteria (Required Evidence)

For branding-sensitive pull requests, include evidence that visual guardrails were checked across the modified surface and adjacent shared surfaces.

Minimum evidence package:

1. Before/after screenshots for mobile and desktop for each changed route family.
2. At least one keyboard-focus pass capture for CTA clusters and form controls.
3. Confirmation that loading/error/offline/not-found states remain visually congruent where affected.
4. Confirmation that trust/accreditation blocks are preserved in both normal and constrained viewport layouts.
5. Confirmation that metadata, breadcrumb labels, and visible headings remain terminology-aligned.
6. PASS/FAIL result from the master checklist plus any required companion checklist.

## Minimum Review Workflow (Per Change)

1. Run `docs/branding/governance/brand-congruency-master-checklist.md`.
2. Add strategy companion checks for slogan/core-value/messaging changes.
3. Add development companion checks for component/token/implementation changes.
4. Record PASS/FAIL in PR notes for branding-sensitive changes.

## Conflict Resolution Protocol (Required)

When documentation or implementation guidance conflicts:

1. Resolve source-of-truth using the Canonical Contracts Matrix in this file.
2. Treat canonical anchors in `docs/branding/standards/unified-component-standards.md` as authoritative.
3. Update downstream companion and verification docs in the same PR.
4. Run `pnpm docs:guardrails:contracts` before merge.
5. Record conflict, resolution, and updated files in PR notes.

Escalation rule: if conflict cannot be resolved without a standard change, update the canonical
anchor first, then propagate to companions and verification docs.

## Definition of Complete Coverage

Coverage is complete only when:

- Entry-point docs link to this file and the master checklist.
- Branding, development, and technical indexes route contributors to canonical guardrails.
- No parallel checklist is treated as a standalone gate ahead of the master checklist.

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
