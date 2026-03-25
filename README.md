# MH Construction – Founded 2010, Veteran-Owned Since January 2025

**START HERE** - This is your single source of truth for the entire project.

**Building projects for the Client, NOT the Dollar** — Founded by Mike Holstein in 2010,
purchased by Army veteran Jeremy Thamert in 2025. Veteran excellence, honest communication,
and proven craftsmanship.

**(509) 308-6489** | **<office@mhc-gc.com>** | **mhc-gc.com**

---

## For Developers: Complete Workflow

**New to this project?** Follow this exact path:

1. **Read this README** (you're here) - Project overview, tech stack, setup
2. **Study the [Homepage](src/app/page.tsx)** as your reference standard - See
   [Homepage Documentation](docs/technical/homepage.md) for complete breakdown
3. **Review [Unified Component Standards](docs/branding/standards/unified-component-standards.md)
   v7.0.0** - Complete design system (colors, typography, components)
4. **Study [Component Cheatsheet](docs/development/quick-reference/component-cheatsheet.md)** -
   Copy-paste patterns matching homepage style
5. **Use [Page Template Guide](docs/development/standards/page-template-guide.md)** - Complete boilerplate for new pages
6. **Build your page** using StandardSection template and cheatsheet patterns to match homepage cohesiveness
7. **Audit with [Page Compliance Checklist](docs/development/standards/page-compliance-checklist.md)** -
   150+ items to verify homepage-level quality
8. **Deploy** following standards

**Key Principle:** Your page should feel like it belongs on the same site as the
homepage - same visual weight, spacing, animations, and polish.

**Daily Reference:**

- [Common Mistakes Guide](docs/development/standards/common-mistakes.md) - 22 errors to avoid
- [Development Standards](docs/development/standards/development-standards.md) - Code patterns
- [Consistency Guide](docs/development/standards/consistency-guide.md) - **MANDATORY** reading

**When You Need Specific Features:**

- **Adding analytics tracking?** → [Analytics Tracking Guide](docs/technical/analytics-tracking-guide.md)
- **Implementing dark mode?** → [Dark Mode Quick Reference](docs/technical/dark-mode-quick-reference.md)
- **Styling buttons/CTAs?** → [Buttons & CTAs Complete Guide](docs/technical/design-system/buttons-ctas-complete-guide.md)
- **Adding icons?** → [Icon System Complete](docs/technical/design-system/icon-system-complete.md)
- **Optimizing images/videos?** → [Automatic Media Optimization](docs/technical/automatic-media-optimization.md)
- **Adding SEO metadata?** → [SEO Complete Guide](docs/technical/seo/seo-complete-guide.md) + [SEO Quick Reference](seo-quick-reference.md)
- **Making page installable (PWA)?** → [PWA Quick Reference](docs/technical/pwa-quick-reference.md)
- **Using reusable components?** → [StandardSection Template](docs/development/components/template-components.md)
- **Deploying to Cloudflare?** → [Cloudflare Deployment Guide](docs/deployment/cloudflare-guide.md)
- **Understanding project structure?** → [Project Architecture](docs/project/architecture.md)

That's it. Everything else is organized in `/docs/` by category (branding, technical, business, etc.).

---

## Project Status (March 25, 2026)

### Production-Ready Platform

| Metric            | Status    | Details                                   |
| ----------------- | --------- | ----------------------------------------- |
| **Build**         | Passing   | ~29s compilation, zero errors             |
| **Deployed**      | Live      | Cloudflare Pages — mhc-gc.com             |
| **TypeScript**    | Strict    | Zero type errors                          |
| **ESLint**        | Clean     | Zero lint warnings, zero errors           |
| **Tests**         | Passing   | 54/54 passing                             |
| **SEO**           | 100/100   | Perfect scores across all pages           |
| **Lighthouse**    | 94+       | Performance optimized                     |
| **Bundle Size**   | 210 kB    | Production optimized                      |
| **Dark Mode**     | Complete  | Full theme support                        |
| **PWA**           | Ready     | Offline-ready, 5-layer caching            |
| **Analytics**     | Live      | 100% page coverage, dashboard active      |
| **Documentation** | Optimized | 62 docs + 12 supporting files, zero bloat |

### Recent Improvements (March 2026)

- **Mar 25:** Dependency audit — `npm audit` now reports 4 vulnerabilities (0 critical, 2 high,
  2 moderate): `fast-xml-parser` entity expansion bypass (via `wrangler` devDep); `flatted`
  prototype pollution (partial override applied — awaiting upstream 3.4.2+ release); Next.js
  2× moderate (HTTP request smuggling in rewrites, unbounded `next/image` disk cache — fix
  requires Next.js >15.5.13 when available); `vercel` devDep fully removed; overrides updated
  (`cookie@0.7.2`, `glob@>=11.0.0`, `flatted@>=3.4.0`, `undici@>=7.24.0`, `yauzl@>=3.2.1`)

- **Mar 25:** Build type errors resolved — fixed 5 categories of pre-existing type errors exposed
  by TypeScript strict mode: (1) `rateLimit` is a middleware factory (`rateLimit(config)(handler)`) —
  4 API routes (`geolocation`, `consultations`, `job-applications`, `functions/[functionName]`) were
  incorrectly calling it as `await rateLimit(request, config)`; (2) `newsletter/route.ts` —
  `DbClient.query<T>()` returns `T[]` directly, not `{ results: T[] }`; (3) `PageNavigation.tsx` —
  `useIsMobile()` returns `boolean | null` (SSR-safe), coerced to `boolean | undefined` with `?? undefined`
  for `getNavigationLabel`; (4) `middleware/security.ts` — `getRouteConfig` fallback replaced
  indexing into `Record<string,…>` (possibly `undefined`) with an explicit `{ logAll: false }` object;
  build now clean: ~28s, 37 static pages, 211 kB shared bundle, zero type errors

- **Mar 25:** Codebase audit and hardening — fixed CORS origins in `security-manager.ts`
  (was pointing to stale `mh-construction.com` domain); fixed SW precache paths for location
  pages (`/pasco` etc. → `/locations/pasco`); fixed geolocation API to read from Workers `cf`
  object instead of non-existent CF headers (only `CF-IPCountry` is a real header); fixed
  `X-Frame-Options` in `public/_headers` from `SAMEORIGIN` to `DENY` (consistent with
  security-manager); fixed CI Node version `20` → `22` (matches `engines` in package.json);
  fixed CI `NEXT_PUBLIC_SITE_URL` missing `www` prefix; added `JWT_SECRET`,
  `ADMIN_MATT_PASSWORD`, `ADMIN_JEREMY_PASSWORD`, `EMAIL_FROM`, R2 bucket bindings, KV
  bindings, Cloudflare dashboard safety settings (Rocket Loader OFF, HTML minify OFF, SSL
  Full strict, Always HTTPS) to deployment checklist; flagged placeholder Google Maps embed
  URL on contact page (requires real Place ID + Maps Embed API key)

- **Mar 25:** Fixed Cloudflare Pages deployment regression introduced by Workers-style wrangler config —
  reverted `wrangler.toml` from Workers-style (`main` + `[assets]`) back to Pages-required
  `pages_build_output_dir = ".open-next/assets"`; deleted `wrangler.jsonc` (file was truncated,
  causing a `PropertyNameExpected` JSONC parse error that CF Pages' wrangler-v3 picked up before
  `wrangler.toml`, silently skipping all config); changed `build` script back to
  `opennextjs-cloudflare build` (which runs `next build` internally AND creates `.open-next/`) —
  `next build` alone does not produce `.open-next/`, so CF Pages could not find the output directory;
  updated `deploy` script to `opennextjs-cloudflare build && wrangler pages deploy --project-name=mh-construction`;
  note: `main` + `[assets]` + `nodejs_compat` is the Cloudflare Workers deployment model (not Pages) —
  switching to Workers requires a separate project in the CF dashboard

- **Mar 16:** Cloudflare Pages build failure diagnosed and resolved — root cause: build command
  (`npm run build`) was not set in the Cloudflare Pages dashboard, causing CF to skip the build
  step and fail with "Output directory `.open-next/assets` not found"; fix is dashboard-only
  (Settings → Builds & deployments → Build command = `npm run build`); also requires `CI=true`
  env var to prevent husky `prepare` script from failing in the CF build environment; updated
  [Cloudflare Deployment Guide](docs/deployment/cloudflare-guide.md) to v2.0.0 — rewrote
  entirely to reflect current OpenNext adapter setup, accurate build command, dashboard
  requirements, and troubleshooting for the "no build command" failure mode

- **Mar 16:** Build pipeline optimizations — moved `outputFileTracingExcludes` to top-level key in
  `next.config.js` (promoted out of `experimental` in Next.js 15; was emitting a config warning); excludes
  build-tool packages (`@swc`, `webpack`, `typescript`, `eslint`, `tailwindcss`, `postcss`, etc.) from the
  Next.js trace step; disabled Next.js telemetry unconditionally via `NEXT_TELEMETRY_DISABLED=1` at
  config load time; made `prepare` script CI-aware so husky is skipped in Cloudflare Pages builds
  (`node -e "if (process.env.CI) process.exit(0)" && husky`); updated `compatibility_date` in
  `wrangler.toml` to `2026-03-15`; deleted dead `/api/auth/login` and `/api/auth/refresh` routes (both
  always returned 401 — `getUserById` / `verifyCredentials` were stubs; superseded by
  `/api/auth/admin-login`); removed deleted routes from `MUTATION_ROUTES` in `api-cache-security.test.ts`;
  fixed `module.context` null-safety in webpack chunk naming (webpack 5 can pass `null` context);
  build: zero warnings, zero errors, 37/37 static pages, 210 kB shared bundle; test count: 56 → 54;
  remaining dashboard-only items: enable `.next/cache` build cache path in CF Pages dashboard,
  add `HUSKY=0` env var

- **Mar 15:** Removed redundant `export const runtime = "edge"` declarations from 18 API route files —
  Cloudflare Workers is inherently an edge runtime so the declarations are no-ops, but OpenNext was
  treating them as signals to bundle those routes into a separate edge function which it cannot reconcile
  with the single-Worker output model; build now completes cleanly end-to-end

- **Mar 15:** Fixed Cloudflare Pages CI — dashboard build command updated from
  `npm run build && npx @cloudflare/next-on-pages` to `npm run build`; deprecated
  `@cloudflare/next-on-pages` was running as a second step after OpenNext and failing because it
  requires `export const runtime = 'edge'` on all dynamic routes — the two adapters are mutually
  exclusive; note: `[build]` in `wrangler.toml` is not valid for Pages projects (Workers-only field);
  fix must be applied in the dashboard; deployment confirmed: 318 assets uploaded, site live

- **Mar 15:** Comprehensive build audit — production build: 32.6s, 39/39 static pages generated, zero errors;
  fixed 3 pre-existing lint issues (`OptimizedImage.tsx` — 2× missing `alt` on spread `<Image>` calls,
  `PitchDeckCTA.tsx` — `role="none"` on hover-shim div); TypeScript strict: zero errors; ESLint: zero
  warnings/errors; 56/56 tests passing; shared bundle reduced 221 kB → 211 kB

- **Mar 15:** Eighth optimization pass — deleted 2 dead `lib/utils/` modules (`keyword-matcher.ts` — written
  for removed AI/veteran systems, 14 tests; `date-utils.ts` — written for removed components, 9 tests);
  fixed pre-existing missing `JWTPayload` import in `lib/auth/jwt.ts`; 56/56 tests passing, zero TS errors,
  zero lint warnings

- **Mar 15:** Seventh optimization pass — deleted `components/veterans/` directory (`VeteranBadgeSection.tsx`,
  `index.ts`) — component never imported anywhere in the codebase (the previously deleted
  `shared/VeteranBadgeSection.tsx` was a compat-wrapper; this was the original source that also had no
  consumers); 79/79 tests still passing, zero TS errors, zero lint warnings

- **Mar 15:** Sixth optimization pass — deleted 3 dead component directories (`components/slider/` —
  `BeforeAfterSlider` + `BeforeAfterGallery`, `components/ratings/` — `AggregateRating`, `components/map/`
  — `InteractiveMap` + `ServiceAreaOverview`), 7 dead files (`components/home/VideoHeroSection.tsx` &
  `PartnershipCTA.tsx`, `components/testimonials/TestimonialsWidget.tsx` & `TestimonialsSection.tsx`,
  `lib/analytics/marketing-analytics.ts`, `lib/auth/protected-route.tsx`, `lib/types/testimonials.ts`);
  cleaned 2 barrel files (`home/index.ts`, `testimonials/index.ts`); 79/79 tests still passing, zero TS
  errors, zero lint warnings

- **Mar 15:** Fifth optimization pass — deleted 11 dead files: `components/shared/` compat-wrapper directory
  (`VeteranBadgeSection.tsx`, `index.ts`), `shared-sections/AIEstimatorCTA.tsx` (AI estimator removed per business
  policy; component orphaned), `lib/seo/seo-content-fragments.ts` (never imported), `lib/utils/dynamic-imports.tsx`
  (utility only referenced in its own doc comment), `hooks/use-performance.ts` & `use-performance-optimization.ts`
  (mock implementations, hooks never called in any component), `hooks/use-scroll-animation.ts` &
  `use-scroll-depth-tracking.ts` (never imported), `hooks/use-phone-tracking.ts` (phone tracking handled via
  `EnhancedAnalytics` directly), `components/team/TeamMemberTag.tsx` (never rendered),
  `components/analytics/TrackedComponents.tsx` (`TrackedButton`/`TrackedLink`/`TrackedForm` never used — tracking goes
  through `EnhancedAnalytics` and `TrackedContactLinks`); cleaned 4 barrel files; 79/79 tests still passing, zero TS
  errors, zero lint warnings

- **Mar 15:** Integration test cleanup — deleted orphaned `booking-flow.test.ts` (multi-step booking UI was removed;
  no corresponding component exists); rewrote `authentication.test.ts` to reflect real admin auth flow
  (Matt & Jeremy via `AdminSignInModal` → `/api/auth/admin-login`) replacing unimplemented general user login tests;
  test count 95 → 79 (16 obsolete tests removed), all 79 passing

- **Mar 15:** Fourth optimization pass — deleted 7 dead `lib/performance/` modules (`caching`, `performance-manager`,
  `code-splitting`, `hooks`, `app-performance`, `lightweight-performance`, `index`, ~2,528 lines, only
  `mobile-optimizations` retained); deleted `IconLibrary.tsx` (628 lines) and its 40+ unused re-exports from the icons
  barrel; deleted `Slogan.tsx` and `slogans.ts` (~952 lines, never rendered); deleted standalone
  `csrf.ts` (194 lines, CSRF logic lives inside `security-manager`); converted 3 more pages from client to RSC
  (`team`, `public-sector`, `contact/ContactPageClient`) via `PageTrackingClient` island pattern — 4,302 lines of dead
  code removed, 95/95 tests still passing; removed Urgent page (`/urgent`) and all associated navigation links,
  sitemap entries, SEO metadata, and breadcrumb schema — page count 23 → 22; deleted stale
  `docs/examples/performance-examples.tsx` (dead usage example for the removed performance modules)

- **Mar 14:** Third optimization pass — deleted 5 dead `lib/` directories (`ai`, `cache`, `content`, `storage`, `branding`,
  ~1,600 lines); removed `components/images` compat shim directory, `QuickBookingModal`, `PerformanceDashboard`,
  and `components/activity` empty barrel; deleted dev-demo `/tracking-example` route; removed 3 unused production type
  packages (`@types/hast`, `@types/mdast`, `@types/unist`), removed unused `@playwright/test` dev dep; added missing
  `cross-env` dev dep required by `build:profile` script; cleaned `robots.txt` stale disallow entry; 95/95 tests still passing
- **Mar 14:** Second optimization pass — converted `/accessibility` to RSC (223 kB → 221 kB); deleted 5 more dead
  code files (`BlogNewsSection`, `CaseStudyTemplate`, `bundle-optimization`, `SmartFormAssistant`,
  `use-smart-form-assistant`); removed unused `@react-email/render` production dependency; cleaned up
  `CaseStudyTemplate` stale barrel export from `src/components/projects/index.ts`
- **Mar 14:** Codebase optimization pass — deleted 2 exact-duplicate page files (`CareersPageClient`, `ProjectsPageClient`),
  219 `.bak` backup artifacts, dead `FeaturesSection` and `ActivityFeed` components, entire unused chatbot component tree
  (`GlobalChatbot`, `FloatingChatbotButton`, `GlobalChatbotProvider`, `InteractiveTimeline`, chatbot lib), and removed
  `GlobalChatbotProvider` wrapper from root layout — 7 pages converted from client components to React Server Components
  (`terms`, `privacy`, `testimonials`, `veterans`, `faq`, `allies`) by replacing inline `usePageTracking` hook
  with the existing `PageTrackingClient` island pattern; fixed dead `/book` → `/contact` redirect; pruned 3 unused
  entries from `optimizePackageImports` and removed empty `swcPlugins: []` from `next.config.js`; shared bundle
  reduced from 223 kB → 221 kB with per-page hydration costs significantly lower on converted RSC pages
- **Mar 11:** GEO-proof location content — city pages (Kennewick, Richland, Pasco, Yakima/Zillah,
  Walla Walla) carry verified project cards, `hasOfferCatalog` LocalBusiness schema, and
  public-sector callout linking fire-station work to `/public-sector`
- **Mar 11:** Security hardening — API cache `Cache-Control: no-store` on mutating routes (21 tests);
  asset-integrity guard tests added; middleware SEO matcher excludes static assets; production
  audit at 0 vulnerabilities (dev-only: 15); `tar@7.5.11` and `cookie@1.1.1` CVE overrides added
- **Mar 11:** Dependency upgrades — Next.js 15.5.12, React 19.0.0, Tailwind 3.4.19,
  TypeScript 5.9.2, `markdownlint-cli2` v0.21.0, `vercel` pinned to 32.3.0
- **Mar 11:** SEO/GEO hardening — canonical host standardized to `https://www.mhc-gc.com`;
  city-priority service metadata; media sitemap expanded; Contact metadata deduped

---

## About MH Construction

**Veteran-Owned General Contractor** serving the Pacific Northwest since 2010.

### Core Identity

- **Mission:** Building projects for the Client, NOT the Dollar
- **Values:** Honesty, Integrity, Professionalism, Thoroughness
- **Approach:** Face-to-face consultation, transparent pricing, veteran priority scheduling
- **Service Area:** Tri-Cities WA (Richland, Kennewick, Pasco, West Richland), Yakima, Spokane, Walla Walla
- **Specialties:** Commercial construction, residential, public sector, master planning

### Business Philosophy

- **No Gimmicks:** Direct human contact only - removed AI estimators/booking tools
- **Contact-First:** All paths lead to phone (509) 308-6489 or personal consultation
- **Honest Messaging:** Authentic communication, no marketing buzzwords
- **Veteran Excellence:** Service recognizes service - priority scheduling across all branches

---

## Quick Start by Role

### Designers & Branding

- [Unified Component Standards](docs/branding/standards/unified-component-standards.md) - Complete design system v7.0.0
- [Color System](docs/branding/standards/color-system.md) - Brand colors (Hunter Green, Leather Tan)
- [Brand Overview](docs/branding/strategy/brand-overview.md) - Brand identity & values
- [Messaging Guide](docs/branding/strategy/messaging.md) - Core messaging v7.0.0

### Marketing (Matt & Jeremy)

- **[Analytics Guide for Matt & Jeremy](analytics-guide-for-matt-and-jeremy.md)** - PRIMARY guide for all marketing intelligence
- [SEO Quick Reference](seo-quick-reference.md) - SEO optimization actions
- [GBP Post Templates](docs/marketing/gbp-post-templates.md) - Google Business Profile posts

### Content Writers

- [Messaging Guide](docs/branding/strategy/messaging.md) - Core brand messaging v7.0.0
- [Universal Terminology](docs/branding/strategy/universal-terminology-guide.md) - Approved word choices
- [Page-Specific Messaging](docs/branding/strategy/page-specific-messaging-guide.md) - Voice per page

---

## Tech Stack

### Core Framework

- **Next.js** 15.5.12 (App Router)
- **React** 19.x (^19.0.0)
- **TypeScript** 5.9.2 (strict mode)
- **Tailwind CSS** 3.4.19
- **Node.js** 22+

### Deployment & Infrastructure

- **Hosting:** Cloudflare Pages (via OpenNext adapter)
- **Database:** Cloudflare D1 (SQLite)
- **Email:** Resend API
- **Analytics:** Custom localStorage-based system
- **CI/CD:** GitHub Actions

### Quality Control

- **Pre-commit hooks:** Auto-run type-check and quality scans before each commit
- **CI/CD pipeline:** Automated TypeScript, ESLint 9, tests, and build verification
- **AI workflow:** Ask AI: _"Run quality check and fix issues"_ → instant fixes
- **Manual commands:** `npm run type-check`, `npm run lint`, `npm run quality:check`

### Features & Capabilities

- **PWA:** Service Worker v4.0.0, offline support, installable
- **Dark Mode:** Full theme system with persistence
- **SEO:** Dual-label titles, structured data, 100/100 scores
- **Analytics:** Geographic tracking, CTA effectiveness, lead scoring (0-100)
- **Media:** Auto-optimization to WebP/WebM via GitHub Actions
- **Icons:** Google Material Icons (font-based, 400/500/600 weights)
- **Forms:** Contact, consultations, job applications with email notifications

---

## Quick Start

### Prerequisites

```bash
# Required
Node.js 22+
npm 9+
Git

# For Deployment
Cloudflare account
Resend API key
```

### Local Development

```bash
# Clone repository
git clone https://github.com/Ramsey-USA/mh-website.git
cd mh-website

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local with your keys

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Environment Variables

Create `.env.local`:

```bash
# Required
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxx

# Optional (Cloudflare deployment)
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_D1_DATABASE_ID=your_d1_id

# Optional (Google Analytics)
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Available Scripts

### Development

```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # OpenNext build → creates .open-next/ and .next/
npm run deploy           # OpenNext build + deploy to Cloudflare Pages
npm run start            # Start production server
npm run type-check       # TypeScript validation
npm run lint             # ESLint check
npm run lint:fix         # Fix linting issues
```

### Testing

```bash
npm run test             # Run test suite
npm run test:pwa         # PWA functionality tests
```

### Media Optimization

```bash
npm run optimize:images  # Convert images to WebP
npm run optimize:videos  # Convert videos to WebM/MP4
npm run audit:images     # Analyze optimization opportunities
```

### Utilities

```bash
npm run clean            # Clean build artifacts
```

---

## Dependency Maintenance Notes (March 2026)

- Production audit: `npm audit --omit=dev` reports 1 moderate vulnerability — Next.js
  (HTTP request smuggling in rewrites, unbounded `next/image` disk cache growth; fix requires
  upgrading Next.js beyond 15.5.13 when a patched release is available).
- Deployment uses `@opennextjs/cloudflare` (OpenNext Workers adapter). The legacy
  `@cloudflare/next-on-pages` adapter has been fully removed — it is mutually exclusive
  with OpenNext and required `export const runtime = 'edge'` on every dynamic route.
- `package.json` includes `overrides` to force patched versions of transitive dependencies:
  - `tar@7.5.11` (fixes high CVEs in `@mapbox/node-pre-gyp` transitive chain)
  - `cookie@0.7.2` (fixes low CVE in transitive chain)
  - `flatted@>=3.4.0` (prototype pollution fix — needs `>=3.4.2` once released)
  - `undici@>=7.24.0` (security fix in HTTP client)
  - `yauzl@>=3.2.1` (zip parsing security fix)
  - `glob@>=11.0.0` (transitive glob update)
- Full `npm audit` reports 4 vulnerabilities in the toolchain:
  - `fast-xml-parser` high (entity expansion bypass via `@aws-sdk/xml-builder` via `wrangler`)
  - `flatted` high (prototype pollution — override partially effective; awaiting 3.4.2+)
  - `next` 2× moderate (HTTP smuggling + disk cache; production dep, fix pending upstream)
- Current full-audit status: 4 vulnerabilities (0 critical, 2 high, 2 moderate, 0 low).

---

## Documentation Structure

All documentation is organized in `/docs/` by category:

```text
docs/
├── branding/                     # Brand guidelines
│   ├── standards/               # unified-component-standards.md (v7.0.0), color-system.md, etc.
│   └── strategy/                # messaging.md, brand-overview.md, terminology
├── business/                     # Business documentation
│   ├── services.md, core-values.md
│   └── team/profiles/           # 14 team member profiles
├── development/                  # Development guides
│   ├── quick-reference/         # component-cheatsheet.md
│   ├── standards/               # page-compliance-checklist.md, page-template-guide.md, common-mistakes.md
│   └── components/              # template-components.md (StandardSection docs)
├── technical/                    # Technical implementation
│   ├── design-system/           # buttons-ctas-complete-guide.md, icon-system-complete.md
│   ├── seo/                     # seo-complete-guide.md
│   ├── analytics-quick-reference.md
│   ├── dark-mode-quick-reference.md
│   └── pwa-quick-reference.md
├── marketing/                    # Marketing resources
│   └── gbp-post-templates.md
├── deployment/                   # Deployment guides
│   └── cloudflare-guide.md
└── project/                      # Project documentation
    └── architecture.md

# Root-level guides
analytics-guide-for-matt-and-jeremy.md  # PRIMARY marketing intelligence guide
seo-quick-reference.md                  # Quick SEO actions
contributing.md                         # Contribution guidelines

# Config guides
config/config-directory-guide.md        # Config directory overview
config/cloudflare/edge-optimization.md  # Cloudflare edge optimization reference
```

**Key Documentation:**

- **Development:**
  [Component Cheatsheet](docs/development/quick-reference/component-cheatsheet.md) |
  [Compliance Checklist](docs/development/standards/page-compliance-checklist.md) |
  [StandardSection Template](docs/development/components/template-components.md)
- **Design System:**
  [Unified Component Standards](docs/branding/standards/unified-component-standards.md) v7.0.0
  (consolidated typography & components)
- **Marketing:** [Analytics Guide for Matt & Jeremy](analytics-guide-for-matt-and-jeremy.md) | [SEO Quick Reference](seo-quick-reference.md)

---

## Project Architecture

```text
mh-website/
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── about/ allies/ careers/ contact/  # 15 public pages (flat route directories)
│   │   ├── locations/           # 11 city pages (kennewick, pasco, richland, spokane, yakima,
│   │   │                        #  walla-walla, west-richland, coeur-d-alene, hermiston, omak, pendleton)
│   │   ├── api/                 # API routes (analytics, contact, etc.)
│   │   ├── dashboard/           # Analytics dashboard
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/               # React components
│   │   ├── about/               # About page components
│   │   ├── allies/              # Allies page components
│   │   ├── analytics/           # Tracking components
│   │   ├── animations/          # Animation utilities
│   │   ├── error/               # Error boundary components
│   │   ├── forms/               # Form components
│   │   ├── home/                # Homepage sections
│   │   ├── icons/               # Icon components
│   │   ├── layout/              # Layout components
│   │   ├── locations/           # Location page components
│   │   ├── navigation/          # Nav components
│   │   ├── performance/         # Performance utilities
│   │   ├── pwa/                 # PWA install prompt
│   │   ├── seo/                 # SEO components
│   │   ├── services/            # Services components
│   │   ├── shared-sections/     # Reusable sections (TestimonialsSection, NextStepsSection)
│   │   ├── team/                # Team components
│   │   ├── templates/           # Page templates
│   │   ├── testimonials/        # Testimonials components
│   │   └── ui/                  # Base UI components
│   ├── lib/                      # Core libraries
│   │   ├── analytics/           # Analytics system
│   │   ├── api/                 # API helpers
│   │   ├── auth/                # Authentication utilities
│   │   ├── cloudflare/          # Cloudflare-specific helpers
│   │   ├── constants/           # App-wide constants
│   │   ├── data/                # Static data helpers
│   │   ├── db/                  # Database (D1) access layer
│   │   ├── email/               # Email (Resend) helpers
│   │   ├── notifications/       # Notification utilities
│   │   ├── performance/         # mobile-optimizations.ts only
│   │   ├── security/            # Security utilities (CSRF, etc.)
│   │   ├── seo/                 # SEO utilities
│   │   ├── services/            # Business-logic services
│   │   ├── styles/              # Shared style utilities
│   │   ├── types/               # Library-scoped types
│   │   └── utils/               # General helper functions
│   ├── contexts/                 # React contexts (Theme, etc.)
│   ├── hooks/                    # Custom React hooks (use-breakpoint.ts)
│   └── types/                    # TypeScript definitions
├── public/                       # Static assets
│   ├── icons/                   # PWA icons
│   ├── images/                  # Optimized images (WebP)
│   │   └── qr-codes/            # QR codes + guide
│   ├── videos/                  # Optimized videos (WebM/MP4)
│   ├── robots.txt               # AI crawler permissions
│   ├── llms.txt                 # LLM-optimized content
│   ├── sitemap-index.xml        # SEO sitemap
│   ├── manifest.json            # PWA manifest
│   └── sw.js                    # Service Worker v4.0.0
├── docs/                         # Documentation (62 files)
├── migrations/                   # D1 database migrations
├── scripts/                      # Utility scripts
├── config/                       # Configuration files
└── testing/                      # Test utilities
```

---

## Design System

### Brand Colors

Three-tiered palette using `--color-brand-[name]-[shade]` CSS variables.

**Hunter Green (Primary):**

| Shade  | Hex       | CSS Variable                        | Tailwind Class              |
| ------ | --------- | ----------------------------------- | --------------------------- |
| Core   | `#386851` | `--color-brand-hunter-green`        | `text-brand-primary`        |
| Light  | `#628F79` | `--color-brand-hunter-green-light`  | `text-brand-primary-light`  |
| Dark   | `#1E392C` | `--color-brand-hunter-green-dark`   | `text-brand-primary-dark`   |
| Deeper | `#12231b` | `--color-brand-hunter-green-darker` | `text-brand-primary-darker` |

> **Deeper** is the gradient terminus used in 22+ component files.
> Example: `from-brand-primary via-brand-primary-dark to-brand-primary-darker`

**Leather Tan (Secondary):**

| Shade | Hex       | CSS Variable                      | Tailwind Class               |
| ----- | --------- | --------------------------------- | ---------------------------- |
| Core  | `#BD9264` | `--color-brand-leather-tan`       | `text-brand-secondary`       |
| Light | `#D9BD93` | `--color-brand-leather-tan-light` | `text-brand-secondary-light` |
| Dark  | `#8A6B49` | `--color-brand-leather-tan-dark`  | `text-brand-secondary-dark`  |

**Architectural Bronze (Accent — CTA borders & Featured labels):**

| Shade | Hex       | CSS Variable                 | Tailwind Class            |
| ----- | --------- | ---------------------------- | ------------------------- |
| Core  | `#A87948` | `--color-brand-bronze`       | `text-brand-bronze`       |
| Light | `#CD9B6D` | `--color-brand-bronze-light` | `text-brand-bronze-light` |
| Dark  | `#6B4E2E` | `--color-brand-bronze-dark`  | `text-brand-bronze-dark`  |

> **Bronze usage:** Applied to CTA borders and Featured Project labels for a premium feel.
> For accessible body text, always use the Dark shade (contrast ≥ 7:1 on white).
> Note: `brand-bronze-light` is defined but currently unused in components — bronze gradients
> use the numeric scale (`bronze-600`, `bronze-700`, `bronze-800`) directly.

**Neutrals:**

- Light mode: White, Gray 50-900
- Dark mode: Gray 900-50 (inverted)

**Usage:**

```tsx
// Tailwind classes — primary (Hunter Green)
bg - brand - primary; // Hunter Green core
text - brand - primary - light; // Lighter tint (dark mode surfaces)
text - brand - primary - dark; // Deep shade (headings, high contrast)
text - brand - primary - darker; // Gradient terminus (to-brand-primary-darker)

// Secondary (Leather Tan)
bg - brand - secondary; // Leather Tan core (backgrounds, large text only)
text - brand - secondary - dark; // AA-compliant for body text (4.71:1)

// Accent (Architectural Bronze — CTA borders & featured labels)
border - brand - bronze; // CTA outline borders
bg - brand - bronze - dark; // Featured label backgrounds (7:1 on white)
text - brand - bronze - dark; // Accessible bronze text

// Dark mode variants
dark: bg - brand - primary - light;
dark: text - brand - secondary - light;
```

### Typography

**Font Stack:**

- **Headings:** system-ui, -apple-system, sans-serif
- **Body:** system-ui, -apple-system, sans-serif
- **Weights:** 400 (normal), 600 (semibold), 700 (bold)

**Scale:**

- xs: 0.75rem / sm: 0.875rem / base: 1rem
- lg: 1.125rem / xl: 1.25rem / 2xl: 1.5rem
- 3xl: 1.875rem / 4xl: 2.25rem / 5xl: 3rem

### Icons

**Google Material Icons** (font-based)

- Weights: 400 (regular), 500 (medium), 600 (semibold)
- Usage: `<span className="material-icons">check_circle</span>`
- Reference: [Icon System Complete](docs/technical/design-system/icon-system-complete.md)

---

## Deployment

### Cloudflare Pages

**Production Deployment:**

```bash
# Build command (set in Cloudflare Pages dashboard)
npm run build

# Build output directory (set via wrangler.toml: pages_build_output_dir)
.open-next/assets

# Environment variables
# Set in Cloudflare Dashboard → Settings → Environment Variables
```

**Branch Deployments:**

- `main` branch → Production (mhc-gc.com)
- Other branches → Preview URLs

**Build Configuration:**

- Framework: Next.js (via OpenNext for Cloudflare)
- Build command: `npm run build` ← set in Pages dashboard, not wrangler.toml
- Output: `.open-next/assets` ← set via `pages_build_output_dir` in wrangler.toml
- Node version: 22

See [Cloudflare Deployment Guide](docs/deployment/cloudflare-guide.md) for details.

---

## Analytics System

### Overview

Custom analytics system with **100% page coverage** tracking visitor behavior, geographic data, and conversion metrics.

### Key Features

- **Geographic Tracking:** City, state, country (3-tier fallback)
- **CTA Effectiveness:** Phone, email, address click tracking
- **Journey Stages:** Awareness → Consideration → Decision → Engaged
- **Lead Scoring:** 0-100 quality score based on behavior
- **Service Interest:** Track which services attract attention
- **Project Interest:** Monitor portfolio engagement
- **Device Intelligence:** Mobile vs desktop behavior

### Dashboard Access

1. Visit any page on the website
2. Scroll to footer
3. **Triple-click** the copyright text
4. Dashboard opens at `/dashboard`

**Military-themed interface** with real-time data visualization.

### Analytics Testing

```bash
# Visit localhost:3000 and access dashboard via footer triple-click
```

### Documentation

- **[Analytics Guide for Matt & Jeremy](analytics-guide-for-matt-and-jeremy.md)** - Complete guide
- **[Analytics Quick Reference](docs/technical/analytics-quick-reference.md)** - Developer guide
- **[Admin Analytics System](docs/technical/admin-analytics-system.md)** - Dashboard docs

---

## SEO Optimization

### Dual-Label System

Military/construction terminology across all pages for veteran branding + accessibility:

| Page         | Primary Label | Military Label   |
| ------------ | ------------- | ---------------- |
| Home         | Home          | Base HQ          |
| About        | About Us      | Our Oath         |
| Services     | Services      | Operations       |
| Projects     | Projects      | Missions         |
| Team         | Our Team      | Chain of Command |
| Testimonials | Reviews       | Commendations    |
| Careers      | Careers       | Enlist           |
| Contact      | Contact       | Rally Point      |

### SEO Scores

- **All pages:** 100/100
- **Structured data:** Organization, Service, Breadcrumb schemas
- **Sitemap:** Auto-generated pages + media discovery (`public/images`, `public/videos`)
- **Robots.txt:** AI crawler permissions (ChatGPT, Claude, Perplexity)
- **llms.txt:** LLM-optimized content for accurate AI responses

### GEO Enhancements (March 2026)

- City-priority service targeting now applied to location metadata, schema, and visible page content
- Nearby market expansion cues included where applicable (for example: Yakima/Zillah, Walla Walla/Dayton)
- Internal location page linking strengthened for service discovery and consultation flow
- Canonical host standardized for crawler consistency: `https://www.mhc-gc.com`

### SEO Documentation

- **[SEO Quick Reference](seo-quick-reference.md)** - Quick actions
- **[SEO Complete Guide](docs/technical/seo/seo-complete-guide.md)** - Full implementation
- **[Browser Tab Titles](docs/technical/browser-tab-titles-inventory.md)** - Title inventory

---

## Accessibility

### WCAG 2.1 AA Compliance

- ✅ Contrast ratios meet standards (light and dark modes)
- ✅ Semantic HTML throughout
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ Focus indicators visible
- ✅ Alt text on all images

### Dark Mode

- Three modes: light, dark, system preference
- Automatic detection and persistence
- Smooth transitions (no flash)
- All components optimized

---

## Security

### Implemented Measures

- **Environment Variables:** Secrets in `.env.local` (not committed)
- **API Routes:** Server-side only, no client exposure
- **Email Validation:** Server-side validation
- **Rate Limiting:** Cloudflare protection
- **HTTPS Only:** Enforced in production
- **No Sensitive Logging:** PII excluded from logs

### Admin Dashboard

Triple-click authentication (footer copyright) - simple but effective for internal analytics access.

### Security Documentation

- [Admin Password Security](docs/technical/admin-password-security.md)
- [Secrets Management](docs/technical/secrets-management.md)

---

## Testing

### Test Suites

```bash
# PWA tests
npm run test:pwa

# Dark mode visual test
open testing/dark-mode-visual-test.html

# Type checking
npm run type-check

# Linting
npm run lint
```

### Testing Documentation

- [Testing Guide](testing/mh-testing-guide.md)
- [PWA Quick Reference](docs/technical/pwa-quick-reference.md)

---

## Contributing

### Getting Started

1. Review this README for comprehensive project overview
2. Check [Development Standards](docs/development/standards/development-standards.md)
3. Read [Consistency Guide](docs/development/standards/consistency-guide.md) MANDATORY
4. Follow coding patterns and conventions

### Pull Request Guidelines

- Run `npm run type-check` (must pass)
- Run `npm run lint` (must pass)
- Test locally with `npm run build`
- Update documentation if needed
- Follow commit message conventions

### Documentation Updates

- All markdown files use **kebab-case** naming
- Internal links must be relative
- Archive completed work to `docs/archive/` (if needed)

---

## Contact & Support

### MH Construction

- **Phone:** (509) 308-6489
- **Email:** <office@mhc-gc.com>
- **Website:** <https://mhc-gc.com>
- **Address:** 3111 N Capitol Ave, Pasco, WA 99301

### Repository

- **GitHub:** <https://github.com/Ramsey-USA/mh-website>
- **Issues:** Use GitHub Issues for bug reports
- **Discussions:** Use GitHub Discussions for questions

---

## License & Copyright

**Copyright © 2026 MH Construction**  
**Founded 2010 | Veteran-Owned Since January 2025**

All rights reserved. This software and associated documentation files are proprietary.

---

## About the Veteran Transition

**January 2025** - MH Construction transitioned from founder Mike Holstein to Army veteran
Jeremy Thamert, continuing 15 years of construction excellence with renewed veteran commitment.

**Core Values Unchanged:**

- Honesty in every interaction
- Integrity in every decision
- Professionalism in every project
- Thoroughness in every detail

**Building projects for the client, NOT the dollar.**

---

**Last Updated:** March 25, 2026  
**Documentation Version:** 3.2 (Single Entry Point - Zero Bloat)
