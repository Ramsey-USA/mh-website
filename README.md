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

## Project Status (March 15, 2026)

### Production-Ready Platform

| Metric            | Status    | Details                                   |
| ----------------- | --------- | ----------------------------------------- |
| **Build**         | Passing   | ~33s compilation, zero errors             |
| **TypeScript**    | Strict    | Zero type errors                          |
| **ESLint**        | Clean     | Zero lint warnings                        |
| **Tests**         | Passing   | 95/95 passing                             |
| **SEO**           | 100/100   | Perfect scores across all pages           |
| **Lighthouse**    | 94+       | Performance optimized                     |
| **Bundle Size**   | 221 kB    | Production optimized                      |
| **Dark Mode**     | Complete  | Full theme support                        |
| **PWA**           | Ready     | Offline-ready, 5-layer caching            |
| **Analytics**     | Live      | 100% page coverage, dashboard active      |
| **Documentation** | Optimized | 63 docs + 13 supporting files, zero bloat |

### Recent Improvements (March 2026)

- **Mar 15:** Fourth optimization pass — deleted 7 dead `lib/performance/` modules (`caching`, `performance-manager`, `code-splitting`, `hooks`, `app-performance`, `lightweight-performance`, `index`, ~2,528 lines, only `mobile-optimizations` retained); deleted `IconLibrary.tsx` (628 lines) and its 40+ unused re-exports from the icons barrel; deleted `Slogan.tsx` and `slogans.ts` (~952 lines, never rendered); deleted standalone `csrf.ts` (194 lines, CSRF logic lives inside `security-manager`); converted 3 more pages from client to RSC (`team`, `public-sector`, `contact/ContactPageClient`) via `PageTrackingClient` island pattern — 4,302 lines of dead code removed, 95/95 tests still passing

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
  (`terms`, `privacy`, `testimonials`, `veterans`, `faq`, `urgent`, `allies`) by replacing inline `usePageTracking` hook
  with the existing `PageTrackingClient` island pattern; fixed dead `/book` → `/contact` redirect; pruned 3 unused
  entries from `optimizePackageImports` and removed empty `swcPlugins: []` from `next.config.js`; shared bundle
  reduced from 223 kB → 221 kB with per-page hydration costs significantly lower on converted RSC pages
- **Mar 11:** GEO-proof location content — `LocationProject` data model added; Kennewick (healthcare), Richland
  (automotive), Pasco (industrial), Yakima/Zillah (public-safety), and Walla Walla (regional)
  city pages now carry verified completed-project cards, `hasOfferCatalog` LocalBusiness schema,
  and a Yakima public-sector callout linking fire-station work to `/public-sector`
- **Mar 11:** API cache security hardened — POST/PUT/DELETE routes assert `Cache-Control: no-store`;
  21-test suite added (`src/__tests__/api-cache-security.test.ts`)
- **Mar 11:** Asset-integrity guard test added — middleware preload declarations are cross-checked
  against `/public` at test time; broken `/styles/critical.css` and `/images/logo.webp` preloads
  removed from `middleware.ts` (9-test suite in `src/__tests__/asset-integrity.test.ts`)
- **Mar 11:** Middleware SEO hygiene — matcher now explicitly excludes `sitemap-index.xml`,
  `_next`, and all static-asset extensions, eliminating unnecessary edge compute on crawl traffic
- **Mar 11:** Dependency security hardening - production audit at 0 vulnerabilities; dev-only count reduced 25→15
- **Mar 11:** Added `package.json` overrides for `tar@7.5.11` and `cookie@1.1.1` to patch high/low transitive CVEs
- **Mar 11:** Upgraded `markdownlint-cli2` to v0.21.0; pinned `vercel` to 32.3.0 for Cloudflare adapter stability
- **Mar 11:** Next.js updated to 15.5.12, React 18.3.1, Tailwind 3.4.19, TypeScript 5.9.2
- **Mar 11:** SEO/GEO hardening completed - canonical host standardized to
  `https://www.mhc-gc.com` across sitemap/robots/LLM discovery assets
- **Mar 11:** Location intelligence upgraded - city-priority service metadata,
  GEO-enriched schema, and visible city-specific service/CTA copy alignment
- **Mar 11:** Media discovery expanded - sitemap now includes all assets in
  `public/images` and `public/videos` with priority boost for key
  industrial/safety media
- **Mar 11:** Metadata consistency cleanup - resolved duplicate Contact route
  metadata source to prevent title/canonical drift

### Previous Improvements (Dec 2025)

- **Dec 28:** Documentation consolidation - Single README entry point, removed 5 bloat files (summaries/reports)
- **Dec 28:** Development tooling - Component cheatsheet, compliance checklist, StandardSection template (82% code reduction)
- **Dec 27:** Documentation optimized - 79→68 files, 0 broken links, kebab-case naming
- **Dec 27:** Analytics system complete - geographic tracking, lead scoring, military dashboard
- **Dec 27:** SEO dual-label titles - military/construction terminology
- **Dec 26:** Media optimization - WebP images (42% smaller), WebM/MP4 videos
- **Dec 26:** PWA implementation - offline support, installable, service worker v4.0.0
- **Dec 25:** Dark mode optimization - WCAG 2.1 AA compliant

---

## About MH Construction

**Veteran-Owned General Contractor** serving the Pacific Northwest since 2010.

### Core Identity

- **Mission:** Building projects for the Client, NOT the Dollar
- **Values:** Honesty, Integrity, Professionalism, Thoroughness
- **Approach:** Face-to-face consultation, transparent pricing, veteran priority scheduling
- **Service Area:** Tri-Cities WA (Richland, Kennewick, Pasco), Yakima, Spokane, Walla Walla
- **Specialties:** Commercial construction, residential, public sector, master planning

### Business Philosophy

- **No Gimmicks:** Direct human contact only - removed AI estimators/booking tools
- **Contact-First:** All paths lead to phone (509) 308-6489 or personal consultation
- **Honest Messaging:** Authentic communication, no marketing buzzwords
- **Veteran Excellence:** Service recognizes service - priority scheduling across all branches

---

## Quick Start by Role

### Developers (Start Here)

**Follow the 7-step workflow above** for complete guidance from setup to deployment.

#### Designers & Branding

- [Unified Component Standards](docs/branding/standards/unified-component-standards.md) - Complete design system v7.0.0
- [Color System](docs/branding/standards/color-system.md) - Brand colors (Hunter Green, Leather Tan)
- [Brand Overview](docs/branding/strategy/brand-overview.md) - Brand identity & values
- [Messaging Guide](docs/branding/strategy/messaging.md) - Core messaging v7.0.0

#### Marketing (Matt & Jeremy)

- **[Analytics Guide for Matt & Jeremy](analytics-guide-for-matt-and-jeremy.md)** - PRIMARY guide for all marketing intelligence
- [SEO Quick Reference](seo-quick-reference.md) - SEO optimization actions
- [GBP Post Templates](docs/marketing/gbp-post-templates.md) - Google Business Profile posts

#### Content Writers

- [Messaging Guide](docs/branding/strategy/messaging.md) - Core brand messaging v7.0.0
- [Universal Terminology](docs/branding/strategy/universal-terminology-guide.md) - Approved word choices
- [Page-Specific Messaging](docs/branding/strategy/page-specific-messaging-guide.md) - Voice per page

---

## Tech Stack

### Core Framework

- **Next.js** 15.5.12 (App Router)
- **React** 18.3.1 (with React 19 type definitions)
- **TypeScript** 5.9.2 (strict mode)
- **Tailwind CSS** 3.4.19
- **Node.js** 18+ LTS

### Deployment & Infrastructure

- **Hosting:** Cloudflare Pages (Edge network)
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
Node.js 18+ LTS
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
npm run build            # Production build
npm run start            # Start production server
npm run type-check       # TypeScript validation
npm run lint             # ESLint check
npm run lint:fix         # Fix linting issues
```

### Testing

```bash
npm run test             # Run test suite
npm run test:pwa         # PWA functionality tests (50 tests)
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

- Production dependencies are currently clean: `npm audit --omit=dev` reports 0 vulnerabilities.
- `build:cloudflare` intentionally sets `NPM_CONFIG_LEGACY_PEER_DEPS=true`
  because `@cloudflare/next-on-pages` peer ranges can lag patched Next.js
  releases.
- API route handlers under `src/app/api/*` are pinned to `runtime = "nodejs"`
  to avoid Next.js Edge-runtime static-generation warnings during `npm run build`.
- `vercel` is pinned to `32.3.0` to stay within
  `@cloudflare/next-on-pages@1.13.16` peer constraints and reduce inherited
  tooling vulnerabilities.
- `package.json` includes `overrides` to force patched versions of transitive
  dev toolchain dependencies:
  - `glob -> minimatch@9.0.7` (production transitive minimatch)
  - `tar@7.5.11` (fixes high CVEs in `@mapbox/node-pre-gyp` chain via `vercel`)
  - `cookie@1.1.1` (fixes low CVE in `@cloudflare/next-on-pages` chain)
- Full `npm audit` still reports dev-only advisories in tooling (all in
  Cloudflare/Vercel adapter transitive chains; no override path available).
- Current full-audit status after this pass: 15 dev-only vulnerabilities
  (0 critical, 6 high, 9 moderate, 0 low).

### Analytics Dashboard Access

```bash
# Visit any page, then:
# 1. Scroll to footer
# 2. Triple-click the copyright text
# 3. Dashboard opens at /dashboard
```

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
    └── team/profiles/           # 14 team member profiles
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
master-index.md                        # Central markdown index
analytics-guide-for-matt-and-jeremy.md  # PRIMARY marketing intelligence guide
seo-quick-reference.md                  # Quick SEO actions
contributing.md                         # Contribution guidelines
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
│   │   ├── (pages)/             # 26 public pages
│   │   ├── api/                 # API routes (analytics, contact, etc.)
│   │   ├── dashboard/           # Analytics dashboard
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/               # React components
│   │   ├── analytics/           # Tracking components
│   │   ├── animations/          # Animation utilities
│   │   ├── forms/               # Form components
│   │   ├── home/                # Homepage sections
│   │   ├── layout/              # Layout components
│   │   ├── locations/           # Location page components
│   │   ├── navigation/          # Nav components
│   │   ├── projects/            # Project components
│   │   ├── pwa/                 # PWA install prompt
│   │   ├── seo/                 # SEO components
│   │   ├── shared/              # Shared utilities
│   │   ├── shared-sections/     # Reusable sections
│   │   ├── team/                # Team components
│   │   ├── ui/                  # Base UI components
│   │   └── (+ about, contact, icons, images, map, services, testimonials, veterans, ...)
│   ├── lib/                      # Core libraries
│   │   ├── analytics/           # Analytics system
│   │   ├── seo/                 # SEO utilities
│   │   └── utils/               # Helper functions
│   ├── contexts/                 # React contexts (Theme, etc.)
│   ├── hooks/                    # Custom React hooks
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
├── docs/                         # Documentation (63 files)
├── migrations/                   # D1 database migrations
├── scripts/                      # Utility scripts
├── config/                       # Configuration files
└── testing/                      # Test utilities
```

---

## Design System

### Brand Colors

**Primary Colors:**

- **Hunter Green:** `#2C5530` (light), `#1a3d1f` (dark)
- **Leather Tan:** `#D4A574` (light), `#c89a63` (dark)
- **Bronze:** `#CD7F32` (veteran badges)

**Neutrals:**

- Light mode: White, Gray 50-900
- Dark mode: Gray 900-50 (inverted)

**Usage:**

```tsx
// Tailwind classes
bg - brand - primary; // Hunter Green
text - brand - secondary; // Leather Tan
bg - bronze - 600; // Bronze accent

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
# Build command
npm run build

# Output directory
.next

# Environment variables
# Set in Cloudflare Dashboard → Settings → Environment Variables
```

**Branch Deployments:**

- `main` branch → Production (mhc-gc.com)
- Other branches → Preview URLs

**Build Configuration:**

- Framework: Next.js
- Build command: `npm run build`
- Output: `.next`
- Node version: 18

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
# PWA Tests (50 tests)
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
- Archive completed work to [docs/archive/](docs/archive/) (if needed)

---

## Contact & Support

### MH Construction

- **Phone:** (509) 308-6489
- **Email:** <office@mhc-gc.com>
- **Website:** <https://mhc-gc.com>
- **Address:** 2839 W 19th Ave, Kennewick, WA 99337

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

**Building projects for the Client, NOT the Dollar.**

---

**Last Updated:** March 15, 2026  
**Documentation Version:** 3.2 (Single Entry Point - Zero Bloat)
