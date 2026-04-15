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
- **Using reusable components?** → [StandardSection Template](docs/development/components/template-components.md)
- **Deploying to Cloudflare?** → [Cloudflare Deployment Guide](docs/deployment/cloudflare-guide.md)
- **Understanding project structure?** → [Project Architecture](docs/project/architecture.md)

That's it. Everything else is organized in `/docs/` by category (branding, technical, business, etc.).

---

## Project Status (April 15, 2026)

### Production-Ready Platform

| Metric            | Status    | Details                                    |
| ----------------- | --------- | ------------------------------------------ |
| **Build**         | Passing   | ~33s compilation, zero errors              |
| **Deployed**      | Live      | Cloudflare Workers — mhc-gc.com            |
| **TypeScript**    | Strict    | Zero type errors                           |
| **ESLint**        | Clean     | Zero lint warnings, zero errors            |
| **Tests**         | Passing   | 1734/1734 passing, 138 suites              |
| **Coverage**      | Strong    | 97.32% stmts, 91.23% branches, 99.03% fns  |
| **SEO**           | External  | Audit via external tools                   |
| **Lighthouse**    | External  | Audit via PageSpeed/DevTools               |
| **Bundle Size**   | 240 kB    | Production optimized                       |
| **Dark Mode**     | Complete  | Full theme support                         |
| **PWA**           | Ready     | Offline-ready, 5-layer caching             |
| **Analytics**     | Live      | 100% page coverage, dashboard active       |
| **Documentation** | Optimized | 60 docs + 10 supporting guides, zero bloat |

### Recent Changes

See [CHANGELOG.md](CHANGELOG.md) for the full history of changes.

**Apr 15 highlights:** Infrastructure buildout — Cloudflare Workers CI/CD wired to
GitHub (auto-deploy on push); all bindings live (KV ×3, D1, R2 ×3, AI, Assets);
Twilio SMS configured and env var mismatch fixed; Uptime Kuma expanded to 7
monitors (Health API, Twilio, Resend, Cloudflare Status); D1 preview database
routing bug fixed; tj-actions CVE remediated (v44 → v46.0.1); observability
(logs + traces, 100% sampling) enabled. Documentation audit (earlier): brand
consistency fixes across all markdown files.

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
- **Service Area:** Tri-Cities WA (Richland, Kennewick, Pasco, West Richland), Yakima, Spokane, Walla Walla
- **Specialties:** Commercial construction, residential, public sector, master planning

### Business Philosophy

- **Contact-First:** All paths lead to phone (509) 308-6489 or personal consultation
- **Honest Messaging:** Authentic communication, no marketing buzzwords
- **Veteran-Owned Perspective:** Service-earned discipline, clear communication, and priority scheduling across all branches
- **No AI Gimmicks:** Removed AI estimators, booking bots, and automated closers — replaced by
  the Partnership Guide, which answers questions honestly and routes every visitor to a real
  human conversation

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

All documentation is organized in `/docs/` by category:

```text
docs/
├── branding/                     # Brand guidelines
│   ├── standards/               # unified-component-standards.md (v7.0.0), color-system.md, +3 more
│   └── strategy/                # messaging.md, brand-overview.md, terminology, page-specific messaging
├── business/                     # Business documentation
│   ├── services.md, core-values.md, project-specializations.md, testimonials.md
│   └── team/profiles/           # 14 team member profiles
├── development/                  # Development guides
│   ├── quick-reference/         # component-cheatsheet.md
│   ├── standards/               # development-standards.md, consistency-guide.md, common-mistakes.md,
│   │                            # page-compliance-checklist.md, page-template-guide.md, ai-development-guidelines.md
│   └── components/              # template-components.md (StandardSection docs)
├── technical/                    # Technical implementation (14 files + 3 subdirs)
│   ├── design-system/           # buttons-ctas-complete-guide.md, icon-system-complete.md
│   ├── seo/                     # seo-complete-guide.md
│   ├── patterns/                # component-pattern-strategy.md, +2 component patterns
│   ├── analytics-tracking-guide.md, homepage.md, secrets-management.md
│   ├── dark-mode-quick-reference.md, admin-password-security.md
│   └── pwa-quick-reference.md, automatic-media-optimization.md, +3 more
├── marketing/                    # Marketing resources
│   ├── gbp-post-templates.md
│   └── google-business-profile-guide.md
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
# Equivalent to: opennextjs-cloudflare build && wrangler deploy

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

**Last Updated:** April 15, 2026  
**Documentation Version:** 4.0 (README + CHANGELOG split)
