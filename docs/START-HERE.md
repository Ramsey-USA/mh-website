# MH Construction Documentation

**Veteran-Owned Excellence Since 2010** | Streamlined to 40 Essential Files

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
8. **[PWA Documentation](./technical/pwa-documentation.md)** - Progressive Web App implementation ⭐ **NEW**
9. **[PWA Quick Reference](./technical/pwa-quick-reference.md)** - PWA cheatsheet ⭐ **NEW**
10. **[Media Optimization](./technical/automatic-media-optimization.md)** - Automatic image/video optimization ⭐ **NEW**
11. **[Image Optimization Guide](./technical/image-optimization-guide.md)** - Implementation details ⭐ **NEW**
12. **[SEO Guide](./technical/seo/seo-complete-guide.md)** - Keywords, meta tags
13. **[Navigation System](#navigation-pattern)** - Section-based navigation (Dec 2025)

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

Building projects for the client, NOT the dollar

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

**Last Updated:** December 26, 2025 | MH Construction, Inc. | Veteran-Owned
