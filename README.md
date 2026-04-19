# MH Construction – Founded 2010, Veteran-Owned Since January 2025

**START HERE** - This is your single source of truth for the entire project.

**Building projects for the Client, NOT the Dollar** — Founded by Mike Holstein in 2010,
purchased by Army veteran Jeremy Thamert in 2025. Veteran-owned, relationship-first,
honest communication, and proven craftsmanship.

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
6. **Build your page** using BrandedContentSection/template component patterns and cheatsheet references to match homepage cohesiveness
7. **Audit with [Page Compliance Checklist](docs/development/standards/page-compliance-checklist.md)** -
   150+ items to verify homepage-level quality
8. **Verify cross-platform language/identity alignment** with [Operational Hub Congruent Plan](docs/project/operational-hub-congruent-plan.md)
9. **Deploy** following standards

**Key Principle:** Your page should feel like it belongs on the same site as the
homepage - same visual weight, spacing, animations, and polish.

**Daily Reference:**

- [Common Mistakes Guide](docs/development/standards/common-mistakes.md) - 22 errors to avoid
- [Development Standards](docs/development/standards/development-standards.md) - Code patterns
- [Consistency Guide](docs/development/standards/consistency-guide.md) - **MANDATORY** reading
- [Operational Hub Congruent Plan](docs/project/operational-hub-congruent-plan.md) - Website + PWA + document congruency rules

**When You Need Specific Features:**

- **Working on the Partnership Guide chatbot?** →
  [src/components/chatbot/](src/components/chatbot/) · [src/lib/chatbot/](src/lib/chatbot/) ·
  [src/app/api/chat/route.ts](src/app/api/chat/route.ts)
- **Adding analytics tracking?** → [Analytics Tracking Guide](docs/technical/analytics-tracking-guide.md)
- **Implementing dark mode?** → [Dark Mode Quick Reference](docs/technical/dark-mode-quick-reference.md)
- **Styling buttons/CTAs?** → [Buttons & CTAs Complete Guide](docs/technical/design-system/buttons-ctas-complete-guide.md)
- **Adding icons?** → [Icon System Complete](docs/technical/design-system/icon-system-complete.md)
- **Optimizing images/videos?** → [Automatic Media Optimization](docs/technical/automatic-media-optimization.md)
- **Adding SEO metadata?** → [SEO Complete Guide](docs/technical/seo/seo-complete-guide.md) + [SEO Quick Reference](seo-quick-reference.md)
- **Making page installable (PWA)?** → [PWA Quick Reference](docs/technical/pwa-quick-reference.md)
- **Adding PWA-only sections/tabs?** → [`usePWA` hook](src/hooks/usePWA.ts) · [`PWAOnly` component](src/components/pwa/PWAOnly.tsx) · [PWA Quick Reference — PWA-First Development](docs/technical/pwa-quick-reference.md#pwa-first-development)
- **Using reusable components?** → [BrandedContentSection Template](docs/development/components/template-components.md)
- **Deploying to Cloudflare?** → [Cloudflare Deployment Guide](docs/deployment/cloudflare-guide.md)
- **Understanding project structure?** → [Project Architecture](docs/project/architecture.md)

That's it. Everything else is organized in `/docs/` by category (branding, technical, business, etc.).

---

## Project Status (April 18, 2026)

### Production-Ready Platform

| Metric            | Status    | Details                                                                    |
| ----------------- | --------- | -------------------------------------------------------------------------- |
| **Build**         | Passing   | ~33s compilation, zero errors                                              |
| **Deployed**      | Live      | Cloudflare Workers — mhc-gc.com                                            |
| **TypeScript**    | Strict    | Zero type errors                                                           |
| **ESLint**        | Clean     | Zero lint warnings, zero errors                                            |
| **Tests**         | Passing   | CI and focused safety/hub suites green                                     |
| **Coverage**      | Strong    | Maintained via `npm run test:coverage`                                     |
| **SEO**           | External  | Audit via external tools                                                   |
| **Lighthouse**    | External  | Audit via PageSpeed/DevTools                                               |
| **Bundle Size**   | 240 kB    | Production optimized                                                       |
| **Dark Mode**     | Complete  | Full theme support                                                         |
| **PWA**           | PWA-first | Offline-ready, 5-layer caching, PWA-only sections via `usePWA` + `PWAOnly` |
| **Analytics**     | Live      | 100% page coverage, dashboard active                                       |
| **Documentation** | Optimized | 60 docs + 10 supporting guides, zero bloat                                 |

### Recent Changes

See [CHANGELOG.md](CHANGELOG.md) for the full history of changes.

Operational planning source of truth: [Operational Hub Congruent Plan](docs/project/operational-hub-congruent-plan.md) (use this to resolve roadmap/build-plan sequencing conflicts).

**Apr 15 highlights:** Infrastructure buildout — Cloudflare Workers CI/CD wired to
GitHub (auto-deploy on push); all bindings live (KV ×3, D1, R2 ×3, AI, Assets);
Twilio SMS configured and env var mismatch fixed; Uptime Kuma expanded to 7
monitors (Health API, Twilio, Resend, Cloudflare Status); D1 preview database
routing bug fixed; tj-actions CVE remediated (v44 → v46.0.1); observability
(logs + traces, 100% sampling) enabled. Documentation audit (earlier): brand
consistency fixes across all markdown files.

**Apr 18 highlights:** Safety and Operational Hub congruency normalization complete
around canonical `/hub` routing (with active backward-compat redirect from
`/safety/hub`), centralized safety form registry adoption across public + staff
surfaces, docs alignment to current MISH revision/section model, and targeted
branding/accessibility refinements for safety/hub UI (including improved small-text
contrast rules and updated smoke-test handling for async server page rendering).

**Apr 8 highlights:** Documentation audit — corrected stale file paths, resolved
demo-account security status, added /resources pages to architecture inventory,
fixed failing sitemap test (mock closure issue).

**Mar 26 highlights:** Build hygiene (`veterans/page.tsx` preload fix),
Partnership Guide chatbot (Cloudflare Workers AI), Cloudflare edge
optimizations (Early Hints, HSTS, middleware cleanup), Analytics KV pipeline
(cross-visitor metrics), Footer accessibility refactor, Careers UX
improvements.

---

## About MH Construction

**Veteran-Owned General Contractor** serving the Pacific Northwest since 2010.

### Core Identity

- **Mission:** Building projects for the Client, NOT the Dollar
- **Values:** Honesty, Integrity, Professionalism, Thoroughness
- **Approach:** Face-to-face consultation, transparent pricing, veteran priority scheduling
- **Service Area:** Tri-Cities HQ (Pasco, Richland, Kennewick) with Tri-State licensed coverage (WA, OR, ID), including Yakima, Spokane, and Walla Walla
- **Specialties:** Commercial construction, residential, public sector, master planning

### Business Philosophy

- **Contact-First:** All paths lead to phone (509) 308-6489 or personal consultation
- **Honest Messaging:** Authentic communication, no marketing buzzwords
- **Veteran-Owned Perspective:** Service-earned discipline, clear communication, and priority scheduling across all branches
- **No AI Gimmicks:** Removed AI estimators, booking bots, and automated closers — replaced by
  the Partnership Guide, which answers questions honestly and routes every visitor to a real
  human conversation

---

## Credentials & Certifications

All credential data is centralized in `src/lib/constants/company.ts` under `COMPANY_INFO`. Logos
are stored in `public/images/credentials/` as WebP files. Credentials are displayed in the Footer
(all pages), Contact page, Allies page, and Public-Sector page.

| Credential                       | Data Key                                 | Logo Path                                                                             | Link                                                                                  |
| -------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **BBB Accredited A+**            | `COMPANY_INFO.bbb`                       | External BBB seal URLs (horizontal + vertical, light/dark variants)                   | `COMPANY_INFO.bbb.sealClickUrl`                                                       |
| **AGC of Washington**            | Hardcoded `/images/logo/agc-member.webp` | `/images/logo/agc-member.webp`, `/images/logo/nwagc-logo.webp`                        | `https://www.agcwa.com/`                                                              |
| **Travelers Insurance**          | `COMPANY_INFO.travelers`                 | `/images/logo/travelers-logo.png` (light), `travelers-logo-white.png` (dark)          | `COMPANY_INFO.travelers.website`                                                      |
| **Pasco Chamber of Commerce**    | `COMPANY_INFO.chambers.pasco`            | `Pasco-Chamber-logo-color-transparent.webp` (light), `...-white-fullsize.webp` (dark) | `https://pascochamber.org/construction-equipment-contractors/`                        |
| **Richland Chamber of Commerce** | `COMPANY_INFO.chambers.richland`         | `Richland-Chamber-logo-full-color.webp`                                               | `https://www.richlandchamber.org/member-directory`                                    |
| **Tri-City Regional Chamber**    | `COMPANY_INFO.chambers.triCityRegional`  | `Kennewick-TriCity-Regional-Chamber-logo-horizontal.webp`                             | `https://web.tricityregionalchamber.com/Contractor-General/MH-Construction,-Inc-6318` |

**Where credentials appear:**

- **Footer** (`src/components/layout/Footer.tsx`) — All pages, Accreditations Row
- **About page** (`src/app/about/page.tsx`) — Credential bar between Awards and Safety sections
- **Contact page** (`src/app/contact/ContactPageClient.tsx`) — Trust Credentials strip
- **Allies page** (`src/app/allies/page.tsx`) — Accredited & Certified section
- **Public-Sector page** (`src/app/public-sector/page.tsx`) — Mission-Ready Credentials section
- **Veterans page** (`src/app/veterans/page.tsx`) — Accredited & Certified section
- **SEO structured data** (`src/components/seo/EnhancedSEO.tsx`) — `sameAs`, `memberOf`, `hasCredential` in Organization schema
- **SEO structured data** (`src/components/seo/SeoMeta.tsx`) — `sameAs` in Organization schema

> **Adding a new credential?** Update `COMPANY_INFO` in `src/lib/constants/company.ts`, add the
> logo to `public/images/credentials/`, then add the display block to all four locations above.
> Also update the smoke test mock in `src/app/__tests__/pages-smoke.test.tsx` and the contact
> test mock in `src/app/contact/__tests__/ContactPageClient.test.tsx`.

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

- **Next.js** 15.5.15 (App Router)
- **React** 19.x (^19.0.0)
- **TypeScript** 5.9.2 (strict mode)
- **Tailwind CSS** 3.4.19
- **Node.js** 22+

### Deployment & Infrastructure

- **Hosting:** Cloudflare Workers — `mhc-v2-website` (via OpenNext adapter)
- **Database:** Cloudflare D1 (SQLite) + KV (cache, ISR, analytics) + R2 (files, resumes, safety intake)
- **Email:** Resend API
- **SMS:** Twilio (admin alerts for urgent form submissions)
- **Analytics:** Custom system — localStorage client-side + Cloudflare KV server-side pipeline
- **Monitoring:** Uptime Kuma (self-hosted) — website, n8n, Portainer, Twilio, Resend, Cloudflare
- **CI/CD:** GitHub Actions + Cloudflare Workers CI (auto-deploy on push to main)

### Quality Control

- **Pre-commit hooks:** Auto-run type-check and quality scans before each commit
- **CI/CD pipeline:** Automated TypeScript, ESLint 9, tests, and build verification
- **AI workflow:** Ask AI: _"Run quality check and fix issues"_ → instant fixes
- **Manual commands:** `npm run type-check`, `npm run lint`, `npm run quality:check`

### Features & Capabilities

- **PWA:** Service Worker v4.0.0, offline support, installable
- **Dark Mode:** Full theme system with persistence
- **SEO:** Dual-label titles, structured data, and external audit validation workflow
- **Analytics:** Geographic tracking, CTA effectiveness, lead scoring (0-100)
- **Media:** Auto-optimization to WebP/WebM via GitHub Actions
- **Icons:** Google Material Icons (font-based, 400/500/600 weights)
- **Forms:** Contact, consultations, and a streamlined job application flow with email notifications
- **Partnership Guide:** Cloudflare Workers AI chatbot — answers questions about services,
  Allies, and veteran benefits; guides all visitors toward direct human contact

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
D1_DATABASE_ID=your_d1_id

# Optional (Google Analytics)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Available Scripts

### Development

```bash
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # OpenNext build → creates .open-next/ and .next/
npm run deploy           # OpenNext build + deploy to Cloudflare Workers
npm run start            # Start production server
npm run type-check       # TypeScript validation
npm run lint             # ESLint check
npm run lint:fix         # Fix linting issues
npm run format           # Prettier format all files
```

### Testing

```bash
npm run test             # Run test suite
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage report
npm run test:pwa         # PWA functionality tests
```

### Quality & Maintenance

```bash
npm run quality:check    # Run full quality scan
npm run lint:markdown    # Lint markdown files
npm run optimize:images  # Convert images to WebP
npm run optimize:videos  # Convert videos to WebM/MP4
npm run audit:images     # Analyze optimization opportunities
npm run clean            # Clean build artifacts
```

---

## Dependency Maintenance

See [CHANGELOG.md](CHANGELOG.md#dependency-overrides-march-2026) for current `npm audit` status and package override rationale.

## Documentation Structure

Documentation is organized by domain. The list below is intentionally high-level so it stays accurate as files are added, consolidated, or archived.

```text
docs/
├── branding/       # Brand constants, standards, and messaging strategy
├── business/       # Core values, services, and project specialization references
├── development/    # Standards, quick references, templates, and testing notes
├── deployment/     # Cloudflare deployment and safety release workflow docs
├── marketing/      # GBP and marketing operations docs
├── media/          # Media workflow and content strategy
├── performance/    # Performance audits and optimization references
├── project/        # Architecture, audits, and roadmap/planning docs
└── technical/      # Technical implementation guides, SEO, patterns, integrations

# Root-level guides
analytics-guide-for-matt-and-jeremy.md  # PRIMARY marketing intelligence guide
seo-quick-reference.md                  # Quick SEO actions
contributing.md                         # Contribution guidelines
testing/mh-testing-guide.md             # Testing overview and commands

# Config guides
config/config-directory-guide.md        # Config directory overview
config/cloudflare/edge-optimization.md  # Cloudflare edge optimization reference
scripts/mh-scripts-guide.md             # Scripts overview and direct-run helpers
```

**Key Documentation:**

- **Development:**
  [Component Cheatsheet](docs/development/quick-reference/component-cheatsheet.md) |
  [Compliance Checklist](docs/development/standards/page-compliance-checklist.md) |
  [BrandedContentSection Template](docs/development/components/template-components.md)
- **Design System:**
  [Unified Component Standards](docs/branding/standards/unified-component-standards.md) v7.0.0
  (consolidated typography & components)
- **Marketing:** [Analytics Guide for Matt & Jeremy](analytics-guide-for-matt-and-jeremy.md) | [SEO Quick Reference](seo-quick-reference.md)

---

## Project Architecture

See [docs/project/architecture.md](docs/project/architecture.md) for the full
directory tree, page inventory, and component map.

## Design System

Colors, typography, icons, and component patterns are fully documented in
[Unified Component Standards](docs/branding/standards/unified-component-standards.md)
v7.0.0.

## Deployment

### Cloudflare Workers

**Production Deployment:**

```bash
# Build + deploy
npm run deploy
# Equivalent to: WRANGLER_SEND_METRICS=false opennextjs-cloudflare build && WRANGLER_SEND_METRICS=false npx wrangler deploy

# Secrets — set via wrangler or dashboard
# Workers & Pages → mhc-v2-website → Settings → Variables & Secrets
```

**URLs:**

- Workers URL: `mhc-v2-website.twelthmann.workers.dev`
- Preview URLs: `*-mhc-v2-website.twelthmann.workers.dev`
- Production: `www.mhc-gc.com` (custom domain)

**Build Configuration:**

- Framework: Next.js (via OpenNext for Cloudflare)
- Worker entry: `.open-next/worker.js` ← `main` in wrangler.toml
- Assets: `.open-next/assets` ← `[assets]` binding in wrangler.toml
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
2. Press **Ctrl + Shift + A** on Windows/Linux or **Cmd + Shift + A** on macOS
3. Dashboard opens at `/dashboard`

This keeps the admin entry point off the visible footer UI while preserving quick internal access.

### Analytics Testing

```bash
# Visit localhost:3000 and use Ctrl/Cmd + Shift + A to open the admin sign-in modal
```

### Documentation

- **[Analytics Guide for Matt & Jeremy](analytics-guide-for-matt-and-jeremy.md)** - Complete guide
- **[Analytics Tracking Guide](docs/technical/analytics-tracking-guide.md)** -
  Developer guide, quick reference cheatsheet, and dashboard access

---

## SEO Optimization

### Labeling Guidance

Use clear, human-readable page labels across navigation, metadata, and structured data.
Lead with plain-language terms like `Home`, `About`, `Services`, `Projects`, `Team`,
`Testimonials`, `Careers`, and `Contact`.

Use veteran identity where it is factual and differentiating, but avoid militarized aliases or
slogan-heavy phrasing in titles, labels, and SEO copy. Current brand direction favors
relationship-first language, disciplined execution, and direct communication.

### SEO Validation

- **All pages:** Validate with external audits (PageSpeed Insights, Search Console, and rich result tools)
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

Private keyboard shortcut authentication (`Ctrl/Cmd + Shift + A`) keeps internal analytics access
available without exposing an obvious public footer trigger.

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
- **Website:** <https://www.mhc-gc.com>
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
Jeremy Thamert, continuing 16 years of construction excellence with renewed veteran commitment.

**Core Values Unchanged:**

- Honesty in every interaction
- Integrity in every decision
- Professionalism in every project
- Thoroughness in every detail

**Building projects for the Client, NOT the Dollar.**

---

**Last Updated:** April 17, 2026  
**Documentation Version:** 4.0 (README + CHANGELOG split)
