# MH Construction – Founded 2010, Veteran-Owned Since January 2025

🎯 Production Ready | ✓ Cloudflare Optimized | 🇺🇸 Your Tri-Cities Construction Command Center

**Building projects for the Client, NOT the Dollar** — Founded by Mike Holstein in 2010, purchased by Army veteran Jeremy Thamert in 2025. Veteran excellence, honest communication, and proven craftsmanship.

📞 **(509) 308-6489** | 📧 **<office@mhc-gc.com>** | 🌐 **mhc-gc.com**

---

## 🚀 Project Status (December 27, 2025)

### Production-Ready Platform ✅

| Metric            | Status         | Details                                     |
| ----------------- | -------------- | ------------------------------------------- |
| **Build**         | ✅ Passing     | ~42s compilation, zero errors               |
| **TypeScript**    | ✅ Strict      | Zero type errors                            |
| **ESLint**        | ✅ Clean       | Zero lint warnings                          |
| **Tests**         | ✅ Passing     | PWA: 50/50, Analytics: verified             |
| **SEO**           | ✅ 100/100     | Perfect scores across all pages             |
| **Lighthouse**    | ✅ 94+         | Performance optimized                       |
| **Bundle Size**   | ✅ 225 kB      | Production optimized                        |
| **Dark Mode**     | ✅ Complete    | Full theme support                          |
| **PWA**           | ✅ Installable | Offline-ready, 5-layer caching              |
| **Analytics**     | ✅ Live        | 100% page coverage, dashboard active        |
| **Documentation** | ✅ Optimized   | 57 active files, 0 broken links, kebab-case |

### Recent Improvements (Dec 2025)

- ✅ **Dec 27:** Documentation optimized - 79→57 files, archive deleted, 0 broken links, kebab-case naming
- ✅ **Dec 27:** Analytics system complete - geographic tracking, lead scoring, military dashboard
- ✅ **Dec 27:** SEO dual-label titles - military/construction terminology
- ✅ **Dec 26:** Media optimization - WebP images (42% smaller), WebM/MP4 videos
- ✅ **Dec 26:** PWA implementation - offline support, installable, service worker v4.0.0
- ✅ **Dec 25:** Dark mode optimization - WCAG 2.1 AA compliant

---

## 🏗️ About MH Construction

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

## 🛠️ Tech Stack

### Core Framework

- **Next.js** 15.5.2 (App Router, React 19)
- **TypeScript** 5.9.3 (strict mode)
- **Tailwind CSS** 3.4.18
- **Node.js** 18+ LTS

### Deployment & Infrastructure

- **Hosting:** Cloudflare Pages (Edge network)
- **Database:** Cloudflare D1 (SQLite)
- **Email:** Resend API
- **Analytics:** Custom localStorage-based system
- **CI/CD:** GitHub Actions

### Features & Capabilities

- **PWA:** Service Worker v4.0.0, offline support, installable
- **Dark Mode:** Full theme system with persistence
- **SEO:** Dual-label titles, structured data, 100/100 scores
- **Analytics:** Geographic tracking, CTA effectiveness, lead scoring (0-100)
- **Media:** Auto-optimization to WebP/WebM via GitHub Actions
- **Icons:** Google Material Icons (font-based, 400/500/600 weights)
- **Forms:** Contact, consultations, job applications with email notifications

---

## ⚡ Quick Start

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

## 📦 Available Scripts

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
open test-analytics.html # Analytics test suite in browser
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

### Analytics Dashboard Access

```bash
# Visit any page, then:
# 1. Scroll to footer
# 2. Triple-click the copyright text
# 3. Dashboard opens at /dashboard
```

---

## 📚 Documentation

### 📖 Start Here

| Resource                                                                             | Purpose                      | Audience             |
| ------------------------------------------------------------------------------------ | ---------------------------- | -------------------- |
| **[docs/index.md](docs/index.md)**                                                   | Complete documentation index | Everyone             |
| **[docs/start-here.md](docs/start-here.md)**                                         | Role-based quick navigation  | New contributors     |
| **[analytics-guide-for-matt-and-jeremy.md](analytics-guide-for-matt-and-jeremy.md)** | Marketing intelligence guide | Matt & Jeremy        |
| **[seo-quick-reference.md](seo-quick-reference.md)**                                 | SEO optimization             | Marketing/Developers |

### 📂 Documentation Structure

```
docs/
├── index.md                      # Main documentation index
├── start-here.md                 # Role-based quick start
├── branding/                     # Brand guidelines (11 files)
│   ├── standards/               # Color, typography, components
│   └── strategy/                # Messaging, terminology
├── business/                     # Business documentation (18 files)
│   ├── services.md              # Service offerings
│   ├── core-values.md           # Company values
│   └── team/profiles/           # 15 team member profiles
├── development/                  # Development guides (3 files)
│   └── standards/               # Coding standards, consistency
├── technical/                    # Technical implementation (20 files)
│   ├── design-system/           # Buttons, icons, components
│   ├── seo/                     # SEO implementation
│   ├── analytics-quick-reference.md
│   ├── dark-mode-quick-reference.md
│   └── pwa-quick-reference.md
├── marketing/                    # Marketing resources (2 files)
│   ├── gbp-post-templates.md    # Google Business Profile
│   └── google-business-profile-guide.md
├── deployment/                   # Deployment guides (1 file)
│   └── cloudflare-guide.md      # Cloudflare Pages deployment
└── project/                      # Project documentation (1 file)
    └── architecture.md          # System architecture
```

### 🎯 Key Documentation by Role

**👨‍💻 Developers:**

- [Development Standards](docs/development/standards/development-standards.md)
- [Consistency Guide](docs/development/standards/consistency-guide.md)
- [Analytics Quick Reference](docs/technical/analytics-quick-reference.md)
- [Dark Mode Quick Reference](docs/technical/dark-mode-quick-reference.md)
- [PWA Quick Reference](docs/technical/pwa-quick-reference.md)

**🎨 Designers:**

- [Color System](docs/branding/standards/color-system.md)
- [Typography](docs/branding/standards/typography.md)
- [Component Standards](docs/branding/standards/component-standards.md)
- [Brand Overview](docs/branding/strategy/brand-overview.md)

**📊 Marketing (Matt & Jeremy):**

- [Analytics Guide](analytics-guide-for-matt-and-jeremy.md) ⭐ PRIMARY
- [SEO Quick Reference](seo-quick-reference.md)
- [GBP Post Templates](docs/marketing/gbp-post-templates.md)

**✍️ Content Writers:**

- [Messaging Guide](docs/branding/strategy/messaging.md)
- [Universal Terminology](docs/branding/strategy/universal-terminology-guide.md)
- [Page-Specific Messaging](docs/branding/strategy/page-specific-messaging-guide.md)

---

## 🏗️ Project Architecture

```
mh-website/
├── src/
│   ├── app/                      # Next.js 15 App Router
│   │   ├── (pages)/             # 27 public pages
│   │   ├── api/                 # API routes (analytics, contact, etc.)
│   │   ├── dashboard/           # Analytics dashboard
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Homepage
│   ├── components/               # React components
│   │   ├── analytics/           # Tracking components
│   │   ├── forms/               # Form components
│   │   ├── home/                # Homepage sections
│   │   ├── navigation/          # Nav components
│   │   ├── pwa/                 # PWA install prompt
│   │   ├── seo/                 # SEO components
│   │   ├── shared-sections/     # Reusable sections
│   │   └── ui/                  # Base UI components
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
├── docs/                         # Documentation (67 files)
├── migrations/                   # D1 database migrations
├── scripts/                      # Utility scripts
├── config/                       # Configuration files
└── testing/                      # Test utilities
```

---

## 🎨 Design System

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

## 🚀 Deployment

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

## 📊 Analytics System

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
# Open comprehensive test suite
open test-analytics.html

# Or visit localhost:3000 and access dashboard
```

### Documentation

- **[Analytics Guide for Matt & Jeremy](analytics-guide-for-matt-and-jeremy.md)** - Complete guide
- **[Analytics Quick Reference](docs/technical/analytics-quick-reference.md)** - Developer guide
- **[Admin Analytics System](docs/technical/admin-analytics-system.md)** - Dashboard docs

---

## 🎯 SEO Optimization

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
- **Sitemap:** Auto-generated, 27 pages
- **Robots.txt:** AI crawler permissions (ChatGPT, Claude, Perplexity)
- **llms.txt:** LLM-optimized content for accurate AI responses

### SEO Documentation

- **[SEO Quick Reference](seo-quick-reference.md)** - Quick actions
- **[SEO Complete Guide](docs/technical/seo/seo-complete-guide.md)** - Full implementation
- **[Browser Tab Titles](docs/technical/browser-tab-titles-inventory.md)** - Title inventory

---

## ♿ Accessibility

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

## 🔒 Security

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

## 🧪 Testing

### Test Suites

```bash
# PWA Tests (50 tests)
npm run test:pwa

# Analytics Tests (browser-based)
open test-analytics.html

# Type checking
npm run type-check

# Linting
npm run lint
```

### Testing Documentation

- [Testing Guide](testing/mh-testing-guide.md)
- [PWA Quick Reference](docs/technical/pwa-quick-reference.md)

---

## 🤝 Contributing

### Getting Started

1. Read [docs/start-here.md](docs/start-here.md) for role-based navigation
2. Review [Development Standards](docs/development/standards/development-standards.md)
3. Check [Consistency Guide](docs/development/standards/consistency-guide.md) ⭐ MANDATORY
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
- Update [docs/index.md](docs/index.md) for new files
- Archive completed work to [docs/archive/](docs/archive/)

---

## 📞 Contact & Support

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

## 📜 License & Copyright

**Copyright © 2025 MH Construction**  
**Founded 2010 | Veteran-Owned Since January 2025**

All rights reserved. This software and associated documentation files are proprietary.

---

## 🎖️ About the Veteran Transition

**January 2025** - MH Construction transitioned from founder Mike Holstein to Army veteran Jeremy Thamert, continuing 15 years of construction excellence with renewed veteran commitment.

**Core Values Unchanged:**

- Honesty in every interaction
- Integrity in every decision
- Professionalism in every project
- Thoroughness in every detail

**Building projects for the Client, NOT the Dollar.**

---

**Last Updated:** December 27, 2025  
**Documentation Version:** 2.0 (Optimized & Streamlined)
