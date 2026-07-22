# Slogan Coverage Matrix

Last Updated: 2026-07-04
Status: Enforced

## Purpose

This matrix defines required slogan coverage for page-level hero surfaces.
Every listed hero surface must contain:

- one primary slogan signal
- one supporting slogan signal
- one unique page-specific slogan signal aligned to that page purpose

Primary slogan:

- Built on Quality, Backed by Trust.

Supporting slogan family:

- Squared away from start to finish.
- From Handshake to Handoff, we got your 'six.'
- Professional on the line. Thorough in the details.
- No gaps. No guesswork. Just accountable follow-through.
- Clear facts. No spin. No surprises.
- Commitments kept under pressure.
- Standards high on every site, every day.
- Measure twice, document always, close out clean.

## Enforcement

Run from apps/website:

```bash
npm run slogan:coverage:check
```

Validation script:

- apps/website/scripts/validation/check-slogan-coverage.js
- apps/website/scripts/validation/branding-rules.cjs
- apps/website/src/content/hero-page-slogans.md

Related checklist:

- docs/branding/governance/brand-congruency-master-checklist.md
- docs/branding/strategy/brand-congruency-qa-checklist.md
- docs/branding/strategy/page-specific-slogans.md

## Matrix

| Surface                 | File                                                                          | Primary Signal Required | Supporting Signal Required |
| ----------------------- | ----------------------------------------------------------------------------- | ----------------------- | -------------------------- |
| Home Hero               | apps/website/src/components/home/HeroSection.tsx                              | Yes                     | Yes                        |
| About Hero              | apps/website/src/components/about/AboutHero.tsx                               | Yes                     | Yes                        |
| Services Hero           | apps/website/src/components/services/ServicesHero.tsx                         | Yes                     | Yes                        |
| Location Detail Hero    | apps/website/src/components/locations/LocationPageContent.tsx                 | Yes                     | Yes                        |
| Projects Index Hero     | apps/website/src/app/projects/components/ProjectsHero.tsx                     | Yes                     | Yes                        |
| Team Hero               | apps/website/src/app/team/page.tsx                                            | Yes                     | Yes                        |
| Contact Hero            | apps/website/src/app/contact/ContactPageClient.tsx                            | Yes                     | Yes                        |
| Locations Index Hero    | apps/website/src/components/locations/LocationsHero.tsx                       | Yes                     | Yes                        |
| Project Detail Hero     | apps/website/src/app/projects/[slug]/page.tsx                                 | Yes                     | Yes                        |
| Testimonials Hero       | apps/website/src/components/testimonials/TestimonialsHero.tsx                 | Yes                     | Yes                        |
| FAQ Hero                | apps/website/src/app/faq/page.tsx                                             | Yes                     | Yes                        |
| FAQ Category Hero       | apps/website/src/app/faq/[category]/page.tsx                                  | Yes                     | Yes                        |
| Veterans Hero           | apps/website/src/app/veterans/page.tsx                                        | Yes                     | Yes                        |
| Safety Hero             | apps/website/src/app/safety/page.tsx                                          | Yes                     | Yes                        |
| Careers Hero            | apps/website/src/app/careers/CareersPageClient.tsx                            | Yes                     | Yes                        |
| Resources Hero          | apps/website/src/components/resources/ResourcesHero.tsx                       | Yes                     | Yes                        |
| Public Sector Hero      | apps/website/src/app/public-sector/PublicSectorFullPage.tsx                   | Yes                     | Yes                        |
| Veteran Compliance Hero | apps/website/src/app/public-sector/veteran-led-compliance/page.tsx            | Yes                     | Yes                        |
| Tri-State Gov Hero      | apps/website/src/app/public-sector/tri-state-government-construction/page.tsx | Yes                     | Yes                        |
| Allies Hero             | apps/website/src/app/allies/page.tsx                                          | Yes                     | Yes                        |

## Hero Implementation Links

Use these links when updating or reviewing hero copy and layout for each surfaced page.

- Home Hero: [apps/website/src/components/home/HeroSection.tsx](../../../apps/website/src/components/home/HeroSection.tsx)
- About Hero: [apps/website/src/components/about/AboutHero.tsx](../../../apps/website/src/components/about/AboutHero.tsx)
- Services Hero: [apps/website/src/components/services/ServicesHero.tsx](../../../apps/website/src/components/services/ServicesHero.tsx)
- Location Detail Hero: [apps/website/src/components/locations/LocationPageContent.tsx](../../../apps/website/src/components/locations/LocationPageContent.tsx)
- Projects Index Hero: [apps/website/src/app/projects/components/ProjectsHero.tsx](../../../apps/website/src/app/projects/components/ProjectsHero.tsx)
- Team Hero: [apps/website/src/app/team/page.tsx](../../../apps/website/src/app/team/page.tsx)
- Contact Hero: [apps/website/src/app/contact/ContactPageClient.tsx](../../../apps/website/src/app/contact/ContactPageClient.tsx)
- Locations Index Hero: [apps/website/src/components/locations/LocationsHero.tsx](../../../apps/website/src/components/locations/LocationsHero.tsx)
- Project Detail Hero: [apps/website/src/app/projects/[slug]/page.tsx](../../../apps/website/src/app/projects/%5Bslug%5D/page.tsx)
- Testimonials Hero: [apps/website/src/components/testimonials/TestimonialsHero.tsx](../../../apps/website/src/components/testimonials/TestimonialsHero.tsx)
- FAQ Hero: [apps/website/src/app/faq/page.tsx](../../../apps/website/src/app/faq/page.tsx)
- FAQ Category Hero: [apps/website/src/app/faq/[category]/page.tsx](../../../apps/website/src/app/faq/%5Bcategory%5D/page.tsx)
- Veterans Hero: [apps/website/src/app/veterans/page.tsx](../../../apps/website/src/app/veterans/page.tsx)
- Safety Hero: [apps/website/src/app/safety/page.tsx](../../../apps/website/src/app/safety/page.tsx)
- Careers Hero: [apps/website/src/app/careers/CareersPageClient.tsx](../../../apps/website/src/app/careers/CareersPageClient.tsx)
- Resources Hero: [apps/website/src/components/resources/ResourcesHero.tsx](../../../apps/website/src/components/resources/ResourcesHero.tsx)
- Public Sector Hero: [apps/website/src/app/public-sector/PublicSectorFullPage.tsx](../../../apps/website/src/app/public-sector/PublicSectorFullPage.tsx)
- Veteran Compliance Hero: [apps/website/src/app/public-sector/veteran-led-compliance/page.tsx](../../../apps/website/src/app/public-sector/veteran-led-compliance/page.tsx)
- Tri-State Gov Hero: [apps/website/src/app/public-sector/tri-state-government-construction/page.tsx](../../../apps/website/src/app/public-sector/tri-state-government-construction/page.tsx)
- Allies Hero: [apps/website/src/app/allies/page.tsx](../../../apps/website/src/app/allies/page.tsx)
- Public Sector Projects Surface: [apps/website/src/app/public-sector/PublicSectorFullPage.tsx](../../../apps/website/src/app/public-sector/PublicSectorFullPage.tsx)
- Team Hub: [apps/dashboard/src/app/hub/page.tsx](../../../apps/dashboard/src/app/hub/page.tsx)
- Safety Manual: [apps/website/src/app/resources/safety-manual/page.tsx](../../../apps/website/src/app/resources/safety-manual/page.tsx)
- Safety Forms: [apps/website/src/app/resources/safety-manual/forms/page.tsx](../../../apps/website/src/app/resources/safety-manual/forms/page.tsx)
- Safety Contents: [apps/website/src/app/resources/safety-manual/contents/page.tsx](../../../apps/website/src/app/resources/safety-manual/contents/page.tsx)
- Employee Handbook: [apps/website/src/app/employee-handbook/page.tsx](../../../apps/website/src/app/employee-handbook/page.tsx)
- Accessibility: [apps/website/src/app/accessibility/page.tsx](../../../apps/website/src/app/accessibility/page.tsx)
- Privacy: [apps/website/src/app/privacy/page.tsx](../../../apps/website/src/app/privacy/page.tsx)
- Terms: [apps/website/src/app/terms/page.tsx](../../../apps/website/src/app/terms/page.tsx)
- Offline: [apps/website/src/app/offline/page.tsx](../../../apps/website/src/app/offline/page.tsx)
- QR Codes: [apps/website/src/app/qr-codes/page.tsx](../../../apps/website/src/app/qr-codes/page.tsx)
- Events: [apps/website/src/app/events/page.tsx](../../../apps/website/src/app/events/page.tsx)
- Cool Desert Nights: [apps/website/src/app/cool-desert-nights/page.tsx](../../../apps/website/src/app/cool-desert-nights/page.tsx)
- Incident Report: [apps/website/src/app/safety/incident-report/page.tsx](../../../apps/website/src/app/safety/incident-report/page.tsx)

## Authoring Rule

When adding a new page-level hero surface:

1. Add one primary slogan line.
2. Add one supporting slogan line.
3. Add one unique page-specific slogan to `apps/website/src/content/hero-page-slogans.md`, then run the review checklist in `docs/branding/strategy/page-specific-slogans.md`.
4. Add/update the mapping in `apps/website/scripts/validation/branding-rules.cjs` (and `apps/website/src/lib/validation/branding-rules.ts` when needed).
5. Add the row to this matrix.
