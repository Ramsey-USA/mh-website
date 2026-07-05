# Dual Terminology Standard

**Last Updated:** July 3, 2026  
**Status:** Canonical Reference (website terminology)

## Purpose

Define one source of truth for dual terminology used across MH Construction website surfaces.

**Brand Congruency:** Dual terminology must never weaken trust content, factual veteran-owned framing, or accessibility clarity.

This standard governs:

- Navigation labels
- Breadcrumb labels
- Hero labels
- Browser tab titles (metadata)
- Structured data name fields
- CTA labels and chatbot page-reference labels

## Core Rule

Use surface-specific dual terminology to preserve both clarity and MH brand voice.

Canonical navigation pattern matrix:

1. PageNavigation top row: MH brand name only (`mhBrandName`) to keep labels concise in the 6-cell layout.
2. PageNavigation More overlay: MH brand name primary with plain-language SEO name as supporting description.
3. Hamburger menu: plain-language SEO name primary with MH brand name on the secondary line.
4. Footer navigation: plain-language SEO name primary with MH brand name as the supporting sublabel.
5. Metadata/SEO title fields: canonical dual title helper format remains `SEO Name (MH Brand Name)` where dual titles are required.

Browser tab implementation rule:

- Route metadata titles should use `buildDualSeoTitle(pageKey, descriptor)` in app-level `metadata` exports.
- For special route states (print, redirect, archive), keep the canonical page key and vary only the descriptor.
- Enforcement test: `apps/website/src/app/__tests__/tab-title-sitewide-contract.test.ts`.

Do not use slogan-heavy aliases as standalone page labels in SEO-facing surfaces.

For cross-page consistency, all shared labels must resolve through the terminology dictionary in `apps/website/src/lib/branding/page-names.ts`.

## Hero Slogan Alignment (Dual-Terminology)

Hero slogans are content signals, not navigation labels, and must remain congruent with dual-terminology intent.

1. Every page-level hero must use one unique page-specific slogan that portrays that page's purpose.
2. Hero slogans should naturally echo the page's SEO name or MH brand name when it improves clarity.
3. Do not reuse the same page-specific hero slogan across different hero surfaces.
4. Keep hero slogans factual, concise, and relationship-first; avoid hype or gimmick phrasing.
5. Keep SEO-facing labels plain-language even when hero slogans use MH brand voice.

Canonical runtime source for hero slogan uniqueness: `apps/website/src/content/hero-page-slogans.md`.
Strategy mirror for governance review: `docs/branding/strategy/page-specific-slogans.md`.

## Canonical Label Set

### Services

- PageNavigation top row: `Operations Brief`
- Hamburger/Footer primary: `Services`
- Hamburger/Footer secondary: `Operations Brief`
- Browser tab standard: `Services (Operations Brief) | Commercial and Industrial Construction Services | MH Construction`

### Projects

- PageNavigation top row: `Our Work`
- Hamburger/Footer primary: `Projects`
- Hamburger/Footer secondary: `Our Work`
- Browser tab standard: `Projects (Our Work) | Completed Commercial and Industrial Construction Projects | MH Construction`

### Contact

- PageNavigation top row: `Comms Desk`
- Hamburger/Footer primary: `Contact`
- Hamburger/Footer secondary: `Comms Desk`
- Browser tab standard: `Contact (Comms Desk) | Your Project. Honest Guidance. Let's Connect. | MH Construction`

### Team

- PageNavigation More overlay menuitem: `Command Staff`
- Overlay supporting description + Hamburger/Footer primary: `Our Team`
- Keep veteran-owned factual framing and leadership clarity.

### Additional Covered Labels

- Metadata dual form remains canonical, for example `Locations (Regional Coverage)`.
- UI surfaces should follow the surface matrix above rather than forced parenthetical rendering.

### Common Alias Coverage

The terminology dictionary also recognizes common page-label variants so shared UI and metadata stay congruent:

- `Contact Us` and `Get in Touch` -> Contact / Comms Desk terminology pair
- `Our Work` -> Projects terminology pair
- `Crew` and `Staff` -> Our Team terminology pair
- `FAQ`, `FAQs`, and `Questions & Answers` -> Help/FAQ terminology pair
- `Forms Index` and `Safety Forms Index` -> Safety Forms terminology pair

## SEO and Accessibility Guardrails

1. Primary terms must remain human-readable and search-friendly.
2. Labels must stay consistent with the surface matrix across nav, metadata, schema, and visible headings.
3. ARIA labels should prioritize plain-language clarity.
4. Spanish equivalents must match intent and avoid terminology drift.

## Public Copy Duplication Guardrail

1. Shared phrasing across different pages is allowed.
2. Duplicate guarded phrasing within the same page file is not allowed.
3. Repeated sentence-level boilerplate within the same page file is not allowed.
4. Enforcement test: `src/app/__tests__/public-copy-phrasing-guard.test.ts`.

## Trust and Compliance Guardrails

1. Never remove accreditation/trust surfaces while normalizing terminology.
2. Never alter WA/OR/ID license values or verification links during terminology-only changes.
3. Preserve factual ownership phrasing: `Founded 2010, Veteran-Owned Since January 2025`.

## Implementation References

- Terminology dictionary: `apps/website/src/lib/branding/page-names.ts`
- Metadata generators: `apps/website/src/lib/seo/page-seo-utils.ts`
- Global metadata baseline: `apps/website/src/app/layout.tsx`
- Shared SEO defaults: `apps/website/src/components/seo/EnhancedSEO.tsx`
- Navigation labels: `apps/website/src/components/layout/Navigation.tsx`
- Footer labels: `apps/website/src/components/layout/Footer.tsx`
- Page nav labels: `apps/website/src/components/navigation/PageNavigation.tsx`
- Chatbot page references: `apps/website/src/lib/chatbot/knowledge-base.ts`

## Change Control

If terminology changes are approved:

1. Update this file first.
2. Update `apps/website/src/lib/branding/page-names.ts` (keys + aliases) first, then apply synchronized updates across affected surfaces.
3. Run targeted tests for changed areas, including terminology and copy guard tests.
4. Record any temporary exceptions in project governance notes.
