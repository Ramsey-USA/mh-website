# Test Coverage Audit — Next Steps

**Last updated:** March 28, 2026
**Session baseline:** 77 suites · 840 tests · 49.02% statements · 80.19% branches · 73.51% functions
**Current state:** 118 suites · 1225 tests · 82.87% statements · 84.50% branches · 86.78% functions

---

## Status summary

| Phase   | Scope                                                | Result      |
| ------- | ---------------------------------------------------- | ----------- |
| Phase 1 | Security, API, hooks, context                        | ✅ Complete |
| Phase 2 | Near-100% files with branch gaps                     | ✅ Complete |
| Phase 3 | Partially-covered component groups                   | ✅ Complete |
| Phase 4 | Zero-coverage component groups                       | ✅ Complete |
| Phase 5 | Page-level (`app/`) and layout stubs                 | ✅ Complete |
| Phase 6 | Zero-coverage UI, analytics, testimonials, home page | ✅ Complete |

---

## Phase 3 — Completed this session

All items below were completed March 28, 2026. New tests written per group:

| Group                 | Tests added | Notes                                                         |
| --------------------- | ----------- | ------------------------------------------------------------- |
| `components/chatbot`  | 3           | Shift+Enter, desktop X button, setTimeout cleanup             |
| `components/error`    | 1           | Dev-mode `<details>` block                                    |
| `components/layout`   | 17          | SectionContainer, FaviconLinks, UnderConstruction (new file)  |
| `components/team`     | 6           | Navy Veteran, Master's, AAS badges; no-avatar; 6 role icons   |
| `components/seo`      | 20          | Full SeoMeta.tsx coverage (new file)                          |
| `lib/analytics`       | 16          | kv-store.ts — all write/read ops, error paths (new file)      |
| `lib/email`           | 20          | email-service.ts — full coverage incl. Resend mock (new file) |
| `middleware/security` | 5           | cf-connecting-ip, x-forwarded-for, withSecurity branches      |
| `app/careers`         | 3           | handleCloseApplicationModal, URL cleanup, mailto button       |
| `app/contact`         | 4           | Server component render, StructuredData blocks (new file)     |

**Micro-gaps also closed:**

- `audit-logger.ts` — added `/* istanbul ignore next */` on unreachable guard
- `escape-html.ts` — sanitizeUrl catch branch covered

---

## Phase 4 — Completed this session

All items below were completed March 28, 2026. New tests written per group:

| Group                   | Tests added | Notes                                                                     |
| ----------------------- | ----------- | ------------------------------------------------------------------------- |
| `components/ui/base`    | 19          | card.tsx (9), badge.tsx (5), alert.tsx (7) — new files                    |
| `components/navigation` | 13          | Breadcrumb (7), PageNavigation (6) — new files                            |
| `components/icons`      | 7           | AmericanFlag — hover/animated/size/aria coverage (new file)               |
| `components/home`       | 16          | HeroSection (6), CoreValuesSection (4), WhyPartnerSection (6) — new files |
| `components/services`   | 13          | ServicesHero (6), SpecialtyServiceCard (7) — new files                    |
| `components/about`      | 6           | CompanyStats — default/custom props, animated vs static values (new file) |
| `components/pwa`        | 9           | ServiceWorkerRegistration (4), PWAInstallPrompt (5) — new files           |
| `lib/notifications`     | 22          | Full notification-service.ts coverage (new file)                          |

**Net result:** +15 suites · +105 tests · statements 51.5% → 67.79% · branches 81.5% → 83.70% · functions 75.9% → 81.81%

---

## Phase 5 — Page stubs and layout (`app/`) — Completed

Completed March 28, 2026. All `app/*/page.tsx` files now have smoke test coverage.

| Group                                             | Tests added | Notes                                                                                             |
| ------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `app/__tests__/pages-smoke.test.tsx`              | +6          | Added Testimonials, Public Sector, Privacy, Terms, Accessibility, Allies pages (total 11 in file) |
| `app/locations/__tests__/location-pages.test.tsx` | 11          | Parametrised test for all 11 location pages (file already existed)                                |
| `app/projects/__tests__/page.test.tsx`            | 4           | Client component with hooks mocked — hero/filter/grid renders (new file)                          |
| `app/dashboard/__tests__/page.test.tsx`           | 3           | Auth-gated client page — unauthenticated render, redirect, authenticated render (new file)        |

**Key patterns established:**

- RSC pages: extend `pages-smoke.test.tsx` with `require()` inside `describe`, add needed breadcrumb keys to mock
- Location pages: parametrised `describe.each` with mocked `getLocationBySlug` + `LocationPageContent`
- Client pages with hooks: mock all hooks + dynamic imports, use `act(async () => render(...))` for async effects
- Auth pages: use stable router object in mock
  (`const router = { push: jest.fn() }; useRouter: () => router`) to avoid infinite re-render from `[router]` dependency

**Net result:** +2 new suites · +13 tests · statements 67.79% → 73.21% · branches 83.70% → 82.97% · functions 81.81% → 82.51%

---

## Phase 6 — Zero-coverage UI components, analytics, testimonials, home page — Completed

Completed March 28, 2026. Targeted all remaining zero-coverage and low-coverage files.

| Group                | File(s)                                                       | Tests added | Notes                                                                                                        |
| -------------------- | ------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| Loading skeletons    | `app/__tests__/loading-smoke.test.tsx`                        | 6           | Parametrised — careers/contact/dashboard/projects/team/testimonials                                          |
| Projects data        | `app/projects/__tests__/projectsData.test.ts`                 | 9           | Static data exports: categories, stats, capabilities, reasons, process                                       |
| Projects hook        | `app/projects/__tests__/useProjectsSearch.test.ts`            | 14          | URL params, filtering, debounced analytics, clearSearch                                                      |
| Services components  | `components/services/__tests__/services-sections.test.tsx`    | 14          | ConstructionProcess, GovernmentProjects, WhyChooseUs, ConstructionExpertise, ServiceAreas, SpecialtyServices |
| About components     | `components/about/__tests__/about-sections.test.tsx`          | 11          | AboutHero, Awards, PartnershipPhilosophy, Safety, Leadership, ValuesShowcase                                 |
| CTA components       | `components/ui/cta/__tests__/cta-components.test.tsx`         | 14          | StrategicCTABanner (4 variants), PitchDeckCTA (3 variants), NextStepsSection                                 |
| UI components        | `components/ui/__tests__/ui-components.test.tsx`              | 24          | AlternatingShowcase, ContentCard, Timeline, AnimatedCounter                                                  |
| Analytics components | `components/analytics/__tests__/TrackedContactLinks.test.tsx` | 14          | TrackedPhoneLink, TrackedEmailLink, TrackedLocationLink                                                      |
| Testimonials         | `components/testimonials/__tests__/testimonials.test.tsx`     | 19          | TestimonialCard (4 variants), TestimonialGrid, TestimonialsCarousel                                          |
| Home page            | `app/__tests__/pages-smoke.test.tsx`                          | +1          | Added home page smoke test                                                                                   |
| Newsletter API       | `src/__tests__/api/newsletter.test.ts`                        | +3          | Email failure paths, invalid JSON catch                                                                      |

**Net result:** +9 new suites · +129 tests · statements 73.21% → **82.87%** ·
branches 82.97% → **84.50%** · functions 82.51% → **86.78%**

---

## Remaining micro-gaps from Phase 2

| File                                        | Uncovered                            | Notes                                                                                                    |
| ------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `src/lib/auth/auth-context.tsx` line 86     | `setUserProfile(...)` success path   | Unreachable via public API; accept as uncoverable or add `initialProfile` prop                           |
| `src/lib/security/audit-logger.ts` line 587 | `if (!dateStr) return` guard         | Unreachable — `toISOString().split("T")[0]` always returns a string; marked `/* istanbul ignore next */` |
| `lib/utils/escape-html.ts` lines 32–33      | Edge-case catch branch               | Covered                                                                                                  |
| `components/ui/forms` 66.66% functions      | Ref-forwarding export in `Input.tsx` | Run focused coverage to identify the missing export                                                      |

---

## Coverage targets

| Metric     | Session start | Phase 3 end | Phase 4 end | Phase 5 end | Phase 6 end |
| ---------- | ------------- | ----------- | ----------- | ----------- | ----------- |
| Statements | 49.02%        | ~51.5%      | 67.79%      | 73.21%      | **82.87%**  |
| Branches   | 80.19%        | ~81.5%      | 83.70%      | 82.97%      | **84.50%**  |
| Functions  | 73.51%        | ~75.9%      | 81.81%      | 82.51%      | **86.78%**  |

---

## Useful commands

```bash
# Fast run — no coverage (use this while writing tests)
npx jest --forceExit

# Full run with coverage report
npx jest --coverage --forceExit

# Focused coverage for one directory
npx jest --coverage --forceExit --collectCoverageFrom='src/components/team/**' src/components/team

# Run a single test file quickly
npx jest --no-coverage src/path/to/file.test.ts
```
