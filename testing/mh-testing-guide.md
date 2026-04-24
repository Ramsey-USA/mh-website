# MH Website Testing Suite

**Last Updated:** April 15, 2026  
**Status:** ✅ Active

Automated testing for the MH Construction website quality assurance.

## Jest Test Suite (1734 tests)

The primary test suite uses Jest 30 with Testing Library for React component and integration tests.

### Running Tests

```bash
npm run test             # Run all 1734 tests
npm run test:watch       # Run in watch mode (re-runs on file changes)
npm run test:coverage    # Run with coverage report
npm run test:ci          # CI mode (coverage + limited workers)
```

### Test File Locations

```text
src/
├── __tests__/                                    # Shared/cross-cutting tests
│   ├── api-cache-security.test.ts                # API cache + security headers
│   ├── asset-integrity.test.ts                   # Asset integrity checks
│   ├── form-validation.test.ts                   # Form validation logic
│   ├── api/                                      # API route tests (16 files)
│   │   ├── analytics-collect.test.ts
│   │   ├── analytics-dashboard.test.ts
│   │   ├── analytics-geolocation.test.ts
│   │   ├── auth-admin-login.test.ts
│   │   ├── auth-logout-refresh.test.ts
│   │   ├── chat.test.ts
│   │   ├── consultations-id.test.ts
│   │   ├── consultations.test.ts
│   │   ├── contact.test.ts
│   │   ├── form-callbacks.test.ts
│   │   ├── functions.test.ts
│   │   ├── job-applications.test.ts
│   │   ├── newsletter.test.ts
│   │   ├── security.test.ts
│   │   ├── track-phone-call.test.ts
│   │   └── upload-resume.test.ts
│   └── integration/
│       ├── authentication.test.ts                # Admin auth flow
│       └── contact-form.test.ts                  # Contact form submission
├── app/                                          # Page-level tests (20 files)
│   ├── __tests__/                                # error, global-error, handlers, loading,
│   │   │                                         # not-found, pages-smoke, robots, sitemap
│   ├── api/security/__tests__/                   # events-extended, status-extended
│   ├── careers/__tests__/
│   ├── contact/__tests__/                        # ContactPageClient, page
│   ├── dashboard/__tests__/
│   ├── locations/__tests__/
│   ├── offline/__tests__/
│   ├── privacy/__tests__/
│   ├── projects/__tests__/                       # page, projectsData, useProjectsSearch
│   ├── projects/components/__tests__/
│   ├── public-sector/__tests__/
│   ├── terms/__tests__/
│   └── testimonials/__tests__/
├── components/                                   # Component tests (47 files)
│   ├── about/__tests__/                          # CompanyStats, ValuesShowcase, about-sections
│   ├── analytics/__tests__/                      # TrackedContactLinks, analytics
│   ├── animations/__tests__/
│   ├── chatbot/__tests__/ChatWidget.test.tsx
│   ├── error/__tests__/ErrorBoundary.test.tsx
│   ├── home/__tests__/                           # CoreValues, Hero, ServicesShowcase, WhyPartner
│   ├── icons/__tests__/                          # AmericanFlag, MaterialIcon
│   ├── layout/__tests__/                         # Footer, LayoutComponents, Navigation
│   ├── navigation/__tests__/                     # Breadcrumb, PageNavigation
│   ├── performance/__tests__/
│   ├── pwa/__tests__/                            # PWAInstallPrompt (retained), ServiceWorkerRegistration (x2), pwa-manager
│   ├── seo/__tests__/                            # EnhancedSEO, SeoMeta
│   ├── services/__tests__/                       # CoreServices, ServiceCard, ServicesHero, SpecialtyServiceCard, services-sections
│   ├── team/__tests__/TeamProfileSection.test.tsx
│   ├── templates/__tests__/BrandedContentSection.test.tsx
│   ├── testimonials/__tests__/                   # carousel-interactions, testimonials
│   └── ui/                                       # image, skeleton, ui-components, ui-extended,
│       │                                         # base (alert, badge, card), cta, forms, modals
├── contexts/__tests__/theme-context.test.tsx
├── hooks/__tests__/use-breakpoint.test.ts
├── lib/                                          # Library tests (38 files)
│   ├── analytics/__tests__/                      # engine, beacon, data-collector, geolocation,
│   │                                             # hooks, kv-store, marketing-tracking, metadata,
│   │                                             # metrics-calculator, tracking
│   ├── api/__tests__/                            # form-handler, responses
│   ├── auth/__tests__/                           # auth-context, jwt, middleware
│   ├── chatbot/__tests__/knowledge-base.test.ts
│   ├── cloudflare/__tests__/r2.test.ts
│   ├── constants/__tests__/timing.test.ts
│   ├── data/__tests__/                           # data-exports, locations
│   ├── db/__tests__/                             # client, env
│   ├── email/__tests__/                          # email-service, templates
│   ├── notifications/__tests__/notification-service.test.ts
│   ├── performance/__tests__/mobile-optimizations.test.ts
│   ├── security/__tests__/                       # audit-logger, rate-limiter (x3), security-manager
│   ├── security/scanner/__tests__/               # header-scanner, vulnerability-scanner, xss-sql-scanner
│   ├── seo/__tests__/                            # page-seo-utils, schemas
│   ├── services/__tests__/portfolio-service.test.ts
│   ├── styles/__tests__/                         # card-variants, layout-variants
│   └── utils/__tests__/                          # logger, utils
└── middleware/__tests__/security.test.ts
```

### Configuration

- **Config:** `jest.config.js` (Next.js + jsdom environment)
- **Setup:** `jest.setup.js` (Testing Library matchers)
- **Path alias:** `@/` maps to `src/`

## PWA Tests

```bash
npm run test:pwa         # PWA functionality tests (scripts/test-pwa.js)
```

Tests service worker registration, caching layers, offline support, and installability.

## Additional Quality Tools

```bash
npm run type-check       # TypeScript strict validation (zero errors)
npm run lint             # ESLint 9 (zero warnings, zero errors)
npm run quality:check    # Full quality scan
```

## Visual Testing

- **`testing/dark-mode-visual-test.html`** — Open in browser for manual dark mode visual verification

## Test Coverage

Coverage: **97.32% statements, 91.23% branches, 99.03% functions**

- **Pages:** Home, careers, contact, dashboard, locations, offline, privacy, projects, public-sector, terms, testimonials, error, not-found, loading states
- **Components:** Layout (Footer, Navigation), home sections (Hero, CoreValues, ServicesShowcase, WhyPartner), about (CompanyStats, ValuesShowcase), services (CoreServices, ServicesHero, SpecialtyServiceCard), chatbot, modals (Admin, Job Application, generic), UI (alerts, badges, cards, CTAs, inputs, images, skeletons), icons (AmericanFlag, MaterialIcon), team profiles, testimonials carousel, breadcrumbs, page navigation, animations, performance, PWA (install prompt, service worker), SEO (EnhancedSEO, SeoMeta), analytics (TrackedContactLinks), error boundary, branded content section
- **API Routes:** Analytics (collect, dashboard, geolocation), auth (admin login, logout/refresh), chat, consultations, contact, form callbacks, functions, job applications, newsletter, security, phone call tracking, resume upload
- **Libraries:** Analytics (engine, beacon, data-collector, geolocation, hooks, KV store, marketing tracking, metadata, metrics calculator, tracking), API (form handler, responses), auth (context, JWT, middleware), chatbot knowledge base, Cloudflare R2, constants, data (exports, locations), DB (client, env), email (service, templates), notifications, performance (mobile optimizations), security (audit logger, rate limiters, security manager, scanners), SEO (page utils, schemas), portfolio service, styles (card/layout variants), utils (logger, utils)
- **Integration:** Authentication flow, contact form submission
- **Middleware:** Security middleware
- **Contexts:** Theme context
- **Hooks:** useBreakpoint
- **Total:** 1734 tests across 138 test files, all passing
