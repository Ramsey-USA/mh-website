# MH Construction Documentation

**Founded 2010, Veteran-Owned Since January 2025** | Streamlined to 40 Essential Files

**Your Tri-Cities Construction Command Center** — Building projects for the Client, NOT the Dollar

---

## 🎯 Quick Start by Role

### 👨‍💻 Developers

1. **[Development Standards](./development/standards/development-standards.md)** - Coding standards
2. **[Consistency Guide](./development/standards/consistency-guide.md)** - Code patterns
3. **[AI Development Guidelines](./development/standards/ai-development-guidelines.md)** - AI assistant guidelines

### 🎨 Designers & Branding

1. **[Color System](./branding/standards/color-system.md)** - Brand colors (Hunter Green, Leather Tan)
2. **[Typography](./branding/standards/typography.md)** - Fonts, sizes, scales
3. **[Hero Section Standards](./branding/standards/hero-section-standards.md)** - Page headers
4. **[Component Standards](./branding/standards/component-standards.md)** - UI patterns

### ✍️ Content & Messaging

1. **[Messaging Guide](./branding/strategy/messaging.md)** - Core messaging (v7.0.0)
2. **[Universal Terminology](./branding/strategy/universal-terminology-guide.md)** - Word choice
3. **[Page-Specific Messaging](./branding/strategy/page-specific-messaging-guide.md)** - Voice per page
4. **[Brand Overview](./branding/strategy/brand-overview.md)** - Identity overview

### 🔧 Technical Implementation

1. **[Component Pattern Strategy](./technical/component-pattern-strategy.md)** - Pattern architecture & "one of each" philosophy ⭐ **NEW (Dec 28)**
2. **[AlternatingShowcase Pattern](./technical/AlternatingShowcase-pattern.md)** - Image/text alternating layout guide ⭐ **NEW (Dec 28)**
3. **[NextStepsSection Standardization](./technical/NextStepsSection-standardization.md)** - Unified final CTA ⭐ **NEW (Dec 28)**
4. **[Homepage Documentation](./technical/homepage.md)** - Complete homepage structure & implementation ⭐ **UPDATED (Dec 28)**
5. **[Buttons & CTAs](./technical/design-system/buttons-ctas-complete-guide.md)** - Button patterns
6. **[Icon System](./technical/design-system/icon-system-complete.md)** - Material Icons
7. **[Dark Mode Guide](./technical/dark-mode-implementation-guide.md)** - Complete dark mode implementation
8. **[Dark Mode Quick Reference](./technical/dark-mode-quick-reference.md)** - Quick cheatsheet
9. **[Analytics System](./technical/admin-analytics-system.md)** - Admin dashboard & tracking
10. **[Analytics Tracking Guide](./technical/analytics-tracking-guide.md)** - Implementation guide
11. **[Analytics Quick Reference](./technical/analytics-quick-reference.md)** - Quick tracking reference
12. **[Marketing Analytics Guide](../analytics-guide-for-matt-and-jeremy.md)** - Complete guide for Matt & Jeremy with geographic tracking, CTA effectiveness, journey stages, lead scoring ⭐ **NEW (Dec 27)**
13. **[Browser Titles Inventory](./technical/browser-tab-titles-inventory.md)** - Dual-label SEO titles ⭐ **NEW**
14. **[PWA Documentation](./technical/pwa-documentation.md)** - Progressive Web App implementation
15. **[PWA Quick Reference](./technical/pwa-quick-reference.md)** - PWA cheatsheet ⭐ **NEW**
16. **[Media Optimization](./technical/automatic-media-optimization.md)** - Automatic image/video optimization ⭐ **NEW**
17. **[Image Optimization Guide](./technical/image-optimization-guide.md)** - Implementation details ⭐ **NEW**
18. **[SEO Guide](./technical/seo/seo-complete-guide.md)** - Keywords, meta tags
19. **[Navigation System](#-navigation-pattern-dec-2025)** - Section-based navigation (Dec 2025)

### 🎨 Component Pattern Architecture (Dec 28, 2025)

**"One of Each" Philosophy:** Use 1-2 showcase patterns per page for cohesive design

**Five Core Patterns:**

1. **AlternatingShowcase** - Image/text alternating (Homepage Core Values, About Safety)
2. **ValuesShowcase** - Interactive modal exploration (About Values)
3. **ContentCard Grid** - 6+ items in cards (About News)
4. **Timeline** - Sequential steps (Homepage Process, About History)
5. **NextStepsSection** - Final CTA on every major page (7 pages)

**Quick Pattern Selection:**

- **3-6 features with images?** → AlternatingShowcase
- **Deep concepts needing exploration?** → ValuesShowcase
- **6+ list items?** → ContentCard Grid
- **Process/history steps?** → Timeline
- **Page ending?** → NextStepsSection (always)

**Key Principles:**

- Max 2 showcase patterns per page
- Performance budget: < 300KB per page
- NextStepsSection on all major pages
- Choose patterns based on content type
- Quality over quantity

**Files:**

- Strategy: `docs/technical/component-pattern-strategy.md`
- AlternatingShowcase: `src/components/ui/AlternatingShowcase.tsx`
- ValuesShowcase: `src/components/about/ValuesShowcase.tsx`
- NextStepsSection: `src/components/shared-sections/NextStepsSection.tsx`

### 🧭 Navigation Pattern (Dec 2025)

**Section-Based Navigation:** All pages use in-page anchor navigation

- PageNavigation component links to `#section-id` within same page
- Hamburger menu handles cross-page navigation
- Every navigable section requires unique `id` attribute
- Dual-label format: full label (desktop) + mobile label
- Material Icons for all navigation items

**Files:**

- Config: `src/components/navigation/navigationConfigs.ts`
- Component: `src/components/navigation/PageNavigation.tsx`
- Report: `NAVIGATION-UPDATE-COMPLETE-REPORT.md`

### 📊 Analytics System (Dec 27, 2025)

**Complete Marketing Intelligence Platform:** 100% page coverage with comprehensive tracking

**Core Features:**

- **Geographic Tracking:** 3-tier fallback (Cloudflare headers → ipapi.co → timezone inference)
- **CTA Effectiveness:** Phone, email, address click tracking with location data
- **Journey Tracking:** Automatic stage detection (awareness → consideration → decision → engaged)
- **Service Interest:** Track which services attract clicks and engagement
- **Project Interest:** Monitor project card clicks and interest patterns
- **Lead Scoring:** Automatic 0-100 quality calculation based on behavior
- **Military Dashboard:** Access at `/dashboard` (triple-click footer copyright)

**Implementation:**

- All 27 pages tracked with `usePageTracking` hook
- TrackedPhoneLink, TrackedEmailLink, TrackedLocationLink components in footer
- Service/project cards automatically track interest
- Form submissions tracked with full context
- Real-time data visualization with military terminology

**Testing:**

- Test suite: `test-analytics.html` (comprehensive system verification)
- Dashboard: `/dashboard` (live data visualization)
- Guide: `analytics-guide-for-matt-and-jeremy.md`

**Key Files:**

- Core: `src/lib/analytics/geolocation.ts`, `src/lib/analytics/marketing-analytics.ts`
- API: `src/app/api/analytics/geolocation/route.ts`
- Components: `src/components/analytics/TrackedContactLinks.tsx`
- Dashboard: `src/app/dashboard/page.tsx`

### 💼 Business Information

1. **[Core Values](./business/core-values.md)** - Four values (Honesty, Integrity, etc.)
2. **[Services](./business/services.md)** - What we offer
3. **[Team Profiles](./business/team/profiles/)** - 14 employee bios
4. **[Testimonials](./business/testimonials.md)** - Client feedback

---

## 📁 Documentation Structure (40 Files)

```text
docs/
├── start-here.md (you are here)
├── branding/
│   ├── index.md
│   ├── standards/ (4 files)
│   │   ├── color-system.md
│   │   ├── component-standards.md
│   │   ├── hero-section-standards.md
│   │   └── typography.md
│   └── strategy/ (4 files)
│       ├── brand-overview.md
│       ├── messaging.md
│       ├── page-specific-messaging-guide.md
│       └── universal-terminology-guide.md
├── business/
│   ├── index.md
│   ├── core-values.md
│   ├── services.md
│   ├── testimonials.md
│   └── team/
│       ├── index.md
│       └── profiles/ (14 employee profiles)
├── development/standards/
│   ├── ai-development-guidelines.md
│   ├── consistency-guide.md
│   └── development-standards.md
├── technical/
│   ├── index.md
│   ├── component-pattern-strategy.md ⭐ NEW (Dec 28)
│   ├── AlternatingShowcase-pattern.md ⭐ NEW (Dec 28)
│   ├── NextStepsSection-standardization.md ⭐ NEW (Dec 28)
│   ├── homepage.md ⭐ UPDATED (Dec 28)
│   ├── dark-mode-implementation-guide.md ⭐ NEW
│   ├── dark-mode-quick-reference.md ⭐ NEW
│   ├── design-system/
│   │   ├── buttons-ctas-complete-guide.md
│   │   └── icon-system-complete.md
│   └── seo/
│       └── seo-complete-guide.md
├── deployment/
│   └── cloudflare-guide.md
├── marketing/
│   ├── gbp-post-templates.md
│   └── google-business-profile-guide.md
└── project/
    └── architecture.md
```

---

## 🎖️ Core Values

### Our Foundation

Building projects for the Client, NOT the Dollar

1. **Honesty** - Transparent pricing, open communication
2. **Integrity** - Your word is your bond, so is ours
3. **Professionalism** - Military precision in every detail
4. **Thoroughness** - No shortcuts, no detail overlooked

- 🎯 **SITREP-Level Transparency** in all communications
- 🛡️ **Mission-First Ethics** in every decision
- 🎖️ **Military Bearing** in professional standards
- 📊 **Tactical Planning** with deployment precision

---

## Last Updated

**Last Updated:** December 27, 2025 | MH Construction, Inc. | Founded 2010, Veteran-Owned Since 2025
