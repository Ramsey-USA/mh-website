# MH Construction - Partnership-Driven Foundation Platform

> **Foundation-Only Architecture**: Clean slate approach with homepage and core components optimized for creative expansion.

**Where veteran excellence meets community partnership in the Pacific Northwest.**

## 🏗️ Project Overview

MH Construction's website represents more than just a digital presence - it's a foundation for community partnership and veteran-owned excellence in the Pacific Northwest. Built with **clean slate architecture**, this platform focuses on what matters most: authentic relationships, transparent communication, and community impact.

## ✨ Current Foundation Status

**Google Material Icons Migration**: ✅ **COMPLETE**  
**Clean Slate Migration**: ✅ **COMPLETE**  
**Foundation Optimization**: ✅ **COMPLETE**  
**Documentation**: ✅ **OPTIMIZED**

### Build Status

```bash
✅ Build: SUCCESS
✅ TypeScript: No errors  
✅ Linting: Clean
✅ Performance: Optimized
✅ Icons: Google Material Icons unified
✅ Foundation: Ready for creative expansion
```

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18.0.0
npm >= 8.0.0
Git
Firebase CLI (optional)
```

### Setup

```bash
# Clone and install
git clone https://github.com/Ramsey-USA/mh-website.git
cd mh-website
npm install

# Environment setup
cp .env.example .env.local
# Edit .env.local with Firebase configuration

# Start development
npm run dev            # http://localhost:3000 (Homepage only)
npm run build          # Production build - CONFIRMED WORKING
npm run lint           # Code quality check
```

## 🏗️ Foundation Architecture

### Core Technologies

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 3.4.0
- **Icons**: Google Material Icons (font-based)
- **Theme**: Dark/Light mode support

### Foundation Components

```text
src/
├── app/
│   ├── page.tsx              # Homepage (Production Ready)
│   ├── layout.tsx            # Root layout with providers
│   └── globals.css           # Global styles
├── components/
│   ├── icons/
│   │   └── MaterialIcon.tsx  # Universal icon system
│   ├── layout/
│   │   ├── Navigation.tsx    # Header with "Coming Soon" states
│   │   └── Footer.tsx        # Footer optimized for current state
│   └── ui/
│       └── ThemeToggle.tsx   # Dark/light mode switching
└── lib/                      # Utilities and services
```

## 📚 Documentation

For detailed information, see our modular documentation:

### Business Information

- **[Core Values](./docs/business/CORE_VALUES.md)** - 6-value professional foundation system and trust-centered philosophy
- **[Services & Capabilities](./docs/business/SERVICES.md)** - Construction services, specialties, and detailed expertise
- **[Team Roster](./docs/business/TEAM_ROSTER.md)** - Leadership and team member details with specializations
- **[Company Profile](./docs/project/COMPANY_PROFILE.md)** - Business information and organizational overview

### Technical Information

- **[Platform Features](./docs/technical/FEATURES.md)** - Platform capabilities, PWA features, and technical highlights
- **[Design System](./docs/technical/DESIGN_SYSTEM.md)** - Brand colors, typography, and component standards
- **[Technical Architecture](./docs/project/ARCHITECTURE.md)** - System architecture and technical details

### Development Information

- **[Contributing Guidelines](./CONTRIBUTING.md)** - Developer guidelines, code standards, and contribution workflow
- **[Setup Guide](./docs/development/SETUP_GUIDE.md)** - Detailed development environment setup instructions

### Project Information

- **[Project Changelog](./docs/project/CHANGELOG.md)** - Version history and updates archive

## 🤝 Partnership Philosophy

### "We Work With You" - Our Foundation

At MH Construction, we don't just build structures - we build relationships. Our veteran-owned company operates on a simple but powerful principle: **every client is a partner, every project serves the community**.

#### Partnership Principles

- **Transparent Communication**: Open dialogue from day one
- **Collaborative Planning**: Your vision + our expertise
- **Honest Pricing**: No surprises, no hidden costs
- **Shared Success**: Your satisfaction is our success
- **Long-term Relationship**: Partners beyond project completion

#### Community Impact

**MH Construction exists to strengthen Pacific Northwest communities.** Every project we complete, every partnership we build, and every team member we support contributes to a stronger, more connected region.

## 🏢 Company Information

| Information | Details |
|-------------|---------|
| **Business Name** | MH Construction LLC (Veteran-Owned) |
| **Partnership Philosophy** | "We Work With You" - Collaborative Construction Partners |
| **Community Focus** | Serving Pacific Northwest Communities Since 1995 |
| **Phone** | (509) 308-6489 |
| **Address** | 3111 N. Capital Ave., Pasco, WA 99301 |
| **Service Area** | Pacific Northwest (WA, OR, ID) |
| **Email** | <info@mhconstruction.com> |
| **Website** | [mhconstruction.com](https://mhconstruction.com) |

### Our Partnership Approach

**MH Construction is more than a contractor - we're your construction partner.** Our veteran-owned company believes in working **with you**, not just **for you**. Every project is a collaboration where your vision, our expertise, and community values come together to create something exceptional.

## 💻 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run start           # Start production server

# Code Quality
npm run lint            # ESLint check
npm run lint:fix        # Fix ESLint issues
npm run type-check      # TypeScript validation

# Firebase
npm run firebase:deploy # Deploy to Firebase
npm run firebase:emulate # Local Firebase emulators
```

### Development Workflow

1. Create feature branch: `git checkout -b feature/name`
2. Make changes and test: `npm run dev`
3. Quality checks: `npm run lint && npm run type-check`
4. Build test: `npm run build`
5. Commit and push for PR

## 🚀 Deployment

### Firebase Deployment

```bash
npm run build
firebase deploy

# Specific targets
firebase deploy --only hosting
firebase deploy --only firestore:rules
```

## ⚙️ Configuration

### Environment Variables (.env.local)

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_ga_id
```

## 📈 Recent Foundation Milestones

### Foundation Optimization (v4.0.0)

- **Google Material Icons Migration**: Complete migration from complex icon systems
- **Clean Slate Architecture**: Removed all non-homepage pages and problematic components
- **Foundation Components**: Optimized Navigation and Footer for future expansion
- **Documentation Restructure**: Modular documentation for better organization
- **Performance Optimization**: Zero TypeScript errors, optimized build

### Core Values System (v3.6.0)

- **6-Value Professional Foundation**: Trust-centered approach with construction methodology
- **Enhanced Icon System**: Professional construction industry iconography
- **Homepage Implementation**: Complete redesign with partnership messaging

### Header Cleanup (v3.4.0)

- **Removed 20+ Decorative Elements**: Eliminated pill-shaped header badges across all pages
- **Cleaner Visual Design**: Streamlined section headers for better focus and readability
- **Professional Appearance**: More minimalist and modern aesthetic throughout the site

## 🎯 Future Development Roadmap

### Next Phase - Creative Expansion

With the foundation complete and optimized, the platform is ready for:

- **Page Development**: Services, Portfolio, Contact, and About pages
- **Feature Expansion**: Booking system, project gallery, team profiles
- **Performance Optimization**: Advanced caching, image optimization, SEO enhancement
- **Community Features**: Client portal, testimonials, project showcases

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| **Page Load Speed** | <3 seconds | ✅ 2.1s |
| **Lighthouse Performance** | 90+ | ✅ 94 |
| **TypeScript Errors** | 0 | ✅ 0 |
| **Build Success** | 100% | ✅ 100% |

## 📞 Contact Information

- **Phone**: [(509) 308-6489](tel:+15093086489)
- **Email**: [info@mhconstruction.com](mailto:info@mhconstruction.com)
- **Website**: [mhconstruction.com](https://mhconstruction.com)

---

**Building partnerships, serving communities, creating lasting value in the Pacific Northwest.**

---

Last updated: January 2025 | Version 4.0.0 | MH Construction Development Team
