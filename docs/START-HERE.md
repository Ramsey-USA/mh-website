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

1. **[Buttons & CTAs](./technical/design-system/buttons-ctas-complete-guide.md)** - Button patterns
2. **[Icon System](./technical/design-system/icon-system-complete.md)** - Material Icons
3. **[Dark Mode Guide](./technical/dark-mode-implementation-guide.md)** - Complete dark mode implementation
4. **[Dark Mode Quick Reference](./technical/dark-mode-quick-reference.md)** - Quick cheatsheet
5. **[Analytics System](./technical/admin-analytics-system.md)** - Admin dashboard & tracking
6. **[Analytics Tracking Guide](./technical/analytics-tracking-guide.md)** - Implementation guide
7. **[Analytics Quick Reference](./technical/analytics-quick-reference.md)** - Quick tracking reference
8. **[Analytics Enhancement](./technical/ANALYTICS-ENHANCEMENT-DEC-2025.md)** - Dec 2025 enhancements (100+ data points) ⭐ **NEW**
9. **[Analytics Data Collection](./technical/ANALYTICS-DATA-COLLECTION-CHECKLIST.md)** - Complete data inventory ⭐ **NEW**
10. **[Marketing Analytics Guide](../ANALYTICS-GUIDE-FOR-MATT-AND-JEREMY.md)** - Complete guide for Matt & Jeremy with geographic tracking, CTA effectiveness, journey stages, lead scoring ⭐ **NEW (Dec 27)**
11. **[Browser Titles Inventory](./technical/BROWSER-TAB-TITLES-INVENTORY.md)** - Dual-label SEO titles ⭐ **NEW**
12. **[PWA Documentation](./technical/pwa-documentation.md)** - Progressive Web App implementation
13. **[PWA Quick Reference](./technical/pwa-quick-reference.md)** - PWA cheatsheet ⭐ **NEW**
14. **[Media Optimization](./technical/automatic-media-optimization.md)** - Automatic image/video optimization ⭐ **NEW**
15. **[Image Optimization Guide](./technical/image-optimization-guide.md)** - Implementation details ⭐ **NEW**
16. **[SEO Guide](./technical/seo/seo-complete-guide.md)** - Keywords, meta tags
17. **[Navigation System](#-navigation-pattern-dec-2025)** - Section-based navigation (Dec 2025)

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
- Guide: `ANALYTICS-GUIDE-FOR-MATT-AND-JEREMY.md`

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
├── START-HERE.md (you are here)
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
│   ├── GBP-POST-TEMPLATES.md
│   └── GOOGLE-BUSINESS-PROFILE-GUIDE.md
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
