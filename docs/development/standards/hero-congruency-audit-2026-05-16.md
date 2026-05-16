# Hero Congruency Audit

Date: May 16, 2026
Auditor: hero-congruency-officer baseline
Canonical baseline: apps/website/src/components/home/HeroSection.tsx

## Result

Hero Congruency Result: PASS

## Scope

Evaluated hero sections using the shared hero pattern:

- apps/website/src/components/home/HeroSection.tsx
- apps/website/src/components/about/AboutHero.tsx
- apps/website/src/components/services/ServicesHero.tsx
- apps/website/src/app/projects/components/ProjectsHero.tsx
- apps/website/src/app/contact/ContactPageClient.tsx
- apps/website/src/app/faq/page.tsx
- apps/website/src/app/veterans/page.tsx
- apps/website/src/app/safety/page.tsx
- apps/website/src/app/careers/CareersPageClient.tsx
- apps/website/src/app/team/page.tsx
- apps/website/src/app/allies/page.tsx
- apps/website/src/app/public-sector/PublicSectorFullPage.tsx

## Passes

- Root posture is present on all audited heroes with hero-section, bottom-right composition, white text, and overflow control.
- Header/nav framing spacing envelope is consistent on all audited heroes (`mb-32 sm:mb-36 md:mb-40 lg:mb-44`, right margin ladder, `ml-auto max-w-2xl pointer-events-none pb-2`).
- Hero heading typography envelope is consistent (`text-lg` through `xl:text-5xl`, `font-black`, right-aligned, `leading-tight tracking-tight`).
- Bottom-anchored page navigation is consistently used (`absolute bottom-0 left-0 right-0`).

## Findings

- None. All previously identified drift items were remediated.

## Remediations Applied

- Added Home-style single mission icon container to `apps/website/src/app/safety/page.tsx` hero.
- Normalized hero root class posture in `apps/website/src/app/allies/page.tsx` and moved gradient styling into internal background layers.
- Normalized hero root class posture in `apps/website/src/app/public-sector/PublicSectorFullPage.tsx` and moved base gradient styling into internal background layers.

## Risk Level

low

## Notes

- Hero surfaces evaluated in this scope now align with Home baseline posture, typography envelope, spacing envelope, icon strategy, and bottom navigation framing.
