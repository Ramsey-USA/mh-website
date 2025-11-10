# MH Construction – Modern Construction Platform

🎯 Production Ready | ✅ Cloudflare Optimized | 🇺🇸 Veteran-Owned (Since Jan 2025)

Modern Next.js platform for construction services:
AI cost estimation, veteran-focused consultation workflows,
interactive project showcase, and military-themed "General MH" chatbot.

---

## 🔎 Focus Areas (November 2025)

### Refactoring (✅ Nov 8, 2025)

Centralized patterns (cards, grids, sections, career data)
→ ~750 lines removed, 90+ instances standardized.
See: [Style Utilities Guide](./docs/development/style-utilities-guide.md)
· [Refactoring Roadmap](./docs/technical/refactoring-roadmap.md).

### Interactive Enhancements (Phase 5 ✅)

Delivered FormProgress, InteractiveTimeline, ActivityFeed, TeamMemberTag, BeforeAfterSlider.
Replaced simple calculators with AI-powered estimator system (`/estimator`).
Build 31.0s, Homepage bundle 217 kB, zero TS/ESLint errors.
Expected uplift: +35–60% engagement / +25–50% qualified leads.
Metrics: [Optimization Results](./docs/optimization-results.md).

### Score Progress

88 → 95–96 → 97–98 (Phases 3 → 4 → 5).
Faster maintenance (+80%).
Full metrics: [Optimization Results](./docs/optimization-results.md).

---

## 🎖️ Veteran-Owned Excellence

### Veteran Benefits

- 12% Combat Veteran Discount
- Priority Scheduling & VA coordination
- Service branch recognition in chatbot

---

## ⚡ Quick Start

```bash
npm install          # deps
npm run dev          # local dev
npm run build        # production build
npm run deploy:production  # Cloudflare deploy
```

Visit [http://localhost:3000](http://localhost:3000) after starting dev server.

---

## 🏗️ Project Overview

Serving Pacific Northwest (WA/OR/ID). Veteran-led team; AI-assisted estimation & consultation.

### Core Features

- 12 primary pages + interactive components
- **AI Chatbot "General MH"** (context-aware, lead capture, intelligent routing)
- **AI Estimator** (`/estimator`) - Instant automated cost estimates 24/7
- **Expert Consultation Booking** (`/booking`) - In-person detailed project analysis
- Booking & consultation prioritization for veterans
- Responsive, dark/light, accessibility focused
- Resend email integration (`office@mhc-gc.com`)

### Estimation System Architecture

**Two Distinct Paths:**

1. **AI Estimator** (`/estimator`):
   - Automated, instant preliminary pricing
   - Available 24/7, under 5 minutes
   - Based on 500+ completed projects
   - Pacific Northwest market data
   - AI-powered cost analysis

2. **Expert Consultation** (`/booking`):
   - In-person human expert assessment
   - Detailed customized analysis
   - On-site evaluation
   - Open-book transparent pricing
   - Scheduled appointments

**Chatbot Integration**: "General MH" intelligently routes users to the appropriate path based on their needs.

### Tech Stack

- Next.js 15.5.2 (App Router) · React 18.3.1
- TypeScript 5.9 (strict) · Tailwind 3.4
- Testing: Jest + RTL
- Animations: Framer Motion
- Deploy: Cloudflare Pages (Edge Runtime)
- Data: Cloudflare D1 / KV
- Email: Resend API

Config system: [Configuration Guide](./docs/technical/configuration-guide.md) · [`config/config-directory-guide.md`](./config/config-directory-guide.md)

---

## 📁 Project Structure (Condensed)

```text
mh-website/
├── config/        # Deployment + monitoring
├── src/           # App router, components, lib, styles
├── docs/          # Centralized documentation (see MasterIndex)
├── scripts/       # Automation
├── migrations/    # SQL schema
├── public/        # Static assets
└── README.md
```

Full navigation: [MasterIndex](./docs/MasterIndex.md)

---

## 📄 Building Pages (Essentials)

Create `src/app/route/page.tsx`, add to sitemap, run SEO audit.

### Hero Pattern (Excerpt)

```tsx
<section className="bg-gradient-to-br from-brand-primary via-brand-accent to-gray-900 pt-20 pb-12 text-white">
  <h1
    className="text-center font-bold mb-6 text-brand-secondary"
    style={{ fontSize: "clamp(2rem,8vw,6rem)" }}
  >
    Page Title
  </h1>
</section>
```

Use `Section` + `SectionHeader` components for content sections.

---

## 🎨 Brand Essentials

Core slogan: **"Building for the Owner, NOT the Dollar"**
Additional slogans & rotation:
[Slogan Guide](./docs/branding/strategy/slogan-rotation-guide.md)

Values: Integrity · Transparency · Relationship ROI · Veteran Reliability ·
Lasting Craftsmanship · Precision & Experience.

Colors: Hunter Green `#386851`, Leather Tan `#BD9264`, Bronze `#CD7F32`.
Typography: Responsive sizing via `clamp()` utilities.
Icons: Material Icons via `<MaterialIcon />` component.

---

## 🤖 Onboarding Snapshot

Start at [MasterIndex](./docs/MasterIndex.md).
Use utilities (`cardStyles`, `gridLayouts`, `Section`).
All MD docs reside under `/docs/` and must be indexed.

Verification quick checks:

```bash
find docs -name '*.md' | wc -l   # count
npm run seo:audit                 # SEO health
npm run type-check && npm run lint
```

---

## ✅ Pre-Deployment Checklist

```bash
npm run type-check
npm run lint
npm run build
npm run seo:audit
```

Critical files: `src/app/layout.tsx`, navigation config, `tailwind.config.ts`, `next.config.js`.

---

## 🔧 Workflow (Condensed)

Refactor repeated inline styles → move into utilities.
Add pages with proper metadata.
Maintain zero TypeScript & ESLint issues.
Use grep for pattern discovery.

---

## 📚 Documentation Navigation

Primary hub: [MasterIndex](./docs/MasterIndex.md)

Key docs:

- Consistency Standards: [Consistency Guide](./docs/development/consistency-guide.md)
- Utilities API: [Style Utilities](./docs/development/style-utilities-guide.md)
- SEO System: [Ultimate SEO Guide](./docs/technical/seo/ultimate-seo-guide.md)
- Advanced SEO Roadmap: [Advanced SEO Optimization](./docs/technical/seo/advanced-seo-optimization.md)
- Branding: [Branding Index](./docs/branding/branding-index.md)
- Components: [Components Index](./docs/components/components-index.md)

---

## 🚀 Deployment

Cloudflare Pages (Edge).

```bash
npm run deploy:production
```

Detailed: [Cloudflare Complete Guide](./docs/deployment/cloudflare-complete-guide.md)

---

## 📊 Status Snapshot

```bash
Build: 31.0s | TypeScript: Clean | ESLint: Clean
SEO: 100/100 (13 audited pages) | Lighthouse: 94+ | Bundle (Homepage): 225 kB
Quality Score: 97–98/100 | Interactive Systems: 6 | Reusable Systems: 10+
```

### Key Metrics

| Metric                       | Value   |
| ---------------------------- | ------- |
| Build Time                   | 31.0s   |
| Shared JS                    | 102 kB  |
| Homepage Bundle              | 225 kB  |
| Pages Audited (SEO)          | 13      |
| Static Pages Generated       | 21      |
| Components                   | 100+    |
| Engagement Uplift (Expected) | +35–60% |

---

## 🤝 Partnership Distinctions

| Type      | Audience               | Primary CTA       | Color        | Icon         | Routes             |
| --------- | ---------------------- | ----------------- | ------------ | ------------ | ------------------ |
| Client 🏠 | Project owners         | Get Free Estimate | Hunter Green | handshake    | /services /booking |
| Trade 🏗️  | Subcontractors/vendors | Apply to Network  | Leather Tan  | construction | /trade-partners    |

Full doc: [Partnership Type Definitions](./docs/partnerships/partnership-type-definitions.md)

---

## 📞 Contact & Support

Phone: (509) 308-6489 (ext. 100 clients / ext. 150 trade)  
Email: [office@mhc-gc.com](mailto:office@mhc-gc.com)  
Address: 3111 N. Capital Ave., Pasco, WA 99301

---

## 🤝 Contributing

See [contributing.md](./contributing.md).

---

## 🏆 Recent Achievements (Condensed)

- Perfect 100/100 SEO across all pages (Nov 7, 2025)
- Phase 5 interactive deployment complete (Nov 8, 2025)
- Code & docs optimization (reductions + centralized utilities)

SEO audit commands:

```bash
npm run seo:audit
npm run seo:check
```

---

## 📈 Advanced SEO Roadmap (Pointer)

Full phased strategy:
[Advanced SEO Optimization](./docs/technical/seo/advanced-seo-optimization.md).
Current phase: 0 (content structure audit).

---

**Last Updated**: November 9, 2025  
**Version**: 4.0.0  
**Status**: Production Ready | Phase 5 Complete | 100/100 SEO

_Building partnerships, serving communities, creating lasting value in the Pacific Northwest._

<!-- Legacy Detailed README (Deprecated) removed: avoids second H1 -->

> The detailed legacy README content has been archived in docs and replaced by this condensed version.
> See [MasterIndex](./docs/MasterIndex.md) and
> [Optimization Results](./docs/optimization-results.md) for full historical detail.

<!-- Removed verbose legacy content to reduce duplication. -->
