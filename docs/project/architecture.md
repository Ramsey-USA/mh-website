# MH Construction - Architecture Documentation

**Category:** Project - Architecture  
**Last Updated:** April 15, 2026  
**Version:** 1.1.0  
**Status:** ✅ Active

> **Canonical Reference:** For exact brand values, see [Brand Constants](../branding/brand-constants.md).

## 🎯 **CURRENT STATE: Complete Production Platform**

### Live Production Pages

- ✅ **Homepage** (`/src/app/page.tsx`) - Partnership-focused landing with core
  values, SEO-focused metadata and structured data, performance optimized with lazy loading
  - Full documentation: [Homepage Documentation](../technical/homepage.md)
- ✅ **About Page** (`/src/app/about/page.tsx`) - Company story and 4-value foundation
- ✅ **Services Page** (`/src/app/services/page.tsx`) - Construction capabilities and expertise
- ✅ **Projects Page** (`/src/app/projects/page.tsx`) - Portfolio showcase with filtering
- ✅ **Team Page** (`/src/app/team/page.tsx`) - Leadership profiles and specializations
- ✅ **Contact Page** (`/src/app/contact/page.tsx`) - Multiple communication channels
- ✅ **Careers Page** (`/src/app/careers/page.tsx`) - Job listings and company benefits
- ✅ **Public Sector Page** (`/src/app/public-sector/page.tsx`) - Government & public sector project focus
- ✅ **Allies Page** (`/src/app/allies/page.tsx`) - Trade partner / subcontractor network
- ✅ **Veterans Page** (`/src/app/veterans/page.tsx`) - Veteran hiring and recognition
- ✅ **Testimonials Page** (`/src/app/testimonials/page.tsx`) - Client partner reviews
- ✅ **FAQ Page** (`/src/app/faq/page.tsx`) - Common questions and answers
- ✅ **Privacy Policy** (`/src/app/privacy/page.tsx`) - Privacy policy
- ✅ **Terms of Service** (`/src/app/terms/page.tsx`) - Terms of service
- ✅ **Accessibility Statement** (`/src/app/accessibility/page.tsx`) - WCAG accessibility info
- ✅ **Offline Page** (`/src/app/offline/page.tsx`) - PWA offline fallback
- ✅ **Resources Hub** (`/src/app/resources/page.tsx`) - Field resources and documentation index
- ✅ **Safety Manual** (`/src/app/resources/safety-manual/page.tsx`) - Interactive safety manual viewer
- ✅ **Safety Program** (`/src/app/resources/safety-program/page.tsx`) - Safety program documentation

### **Location Pages** (Service Area)

- ✅ **Pasco** (`/src/app/locations/pasco/page.tsx`) - Headquarters city
- ✅ **Kennewick** (`/src/app/locations/kennewick/page.tsx`)
- ✅ **Richland** (`/src/app/locations/richland/page.tsx`)
- ✅ **West Richland** (`/src/app/locations/west-richland/page.tsx`)
- ✅ **Yakima** (`/src/app/locations/yakima/page.tsx`)
- ✅ **Spokane** (`/src/app/locations/spokane/page.tsx`)
- ✅ **Walla Walla** (`/src/app/locations/walla-walla/page.tsx`)
- ✅ **Coeur d'Alene** (`/src/app/locations/coeur-d-alene/page.tsx`)
- ✅ **Hermiston** (`/src/app/locations/hermiston/page.tsx`)
- ✅ **Omak** (`/src/app/locations/omak/page.tsx`)
- ✅ **Pendleton** (`/src/app/locations/pendleton/page.tsx`)

### Advanced Platform Features

- ✅ **SEO Optimization** - Complete sitemap, meta tags, and structured data
- ✅ **Navigation System** - Responsive navigation with adaptive grid layout
- ✅ **MaterialIcon System** - Universal icon system with Google Material Icons
- ✅ **Theme System** - Dark/Light mode support with seamless switching
- ✅ **Analytics Integration** - Enhanced tracking and performance monitoring
- ✅ **Partnership Guide** - Cloudflare Workers AI chatbot (floating widget, all pages)

---

## 🏗️ **Complete Production Architecture**

### Core Technologies

- **Framework**: Next.js 15.5.14 (App Router)
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 3.4.19
- **Icons**: Google Material Icons (font-based)
- **Animations**: Framer Motion 12.35.2
- **Theme**: Dark/Light mode support
- **PWA**: Service Worker v4.0.0, offline-ready, installable
- **Media Optimization**: Automatic WebP/WebM conversion via GitHub Actions
- **Performance**: Optimized build/caching strategy; validate Lighthouse via PageSpeed or browser DevTools

### External Services

- **Hosting**: Cloudflare Workers — `mhc-v2-website` (via OpenNext adapter)
- **Domain**: Hostinger (registrar) → Cloudflare (DNS/CDN)
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (FILE_ASSETS, SAFETY_INTAKE, RESUMES buckets)
- **Cache**: Cloudflare KV (CACHE, ANALYTICS namespaces)
- **AI**: Cloudflare Workers AI — `@cf/meta/llama-3.1-8b-instruct` (Partnership Guide chatbot)
- **Email**: Resend API (transactional emails, form notifications)
- **SMS**: Twilio (admin alerts — optional, degrades gracefully)
- **Bot Protection**: Cloudflare Turnstile (form verification)
- **Analytics**: Custom system — localStorage client-side + Cloudflare KV server-side pipeline
- **CI/CD**: GitHub Actions

See [Services Integration Guide](../technical/services-integration-guide.md) for full configuration.

### Complete Component Architecture

```text
src/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── about/page.tsx              # About page
│   ├── services/page.tsx           # Services page
│   ├── projects/page.tsx           # Projects / portfolio page
│   ├── team/page.tsx               # Team page
│   ├── contact/page.tsx            # Contact page
│   ├── careers/page.tsx            # Careers page
│   ├── public-sector/page.tsx      # Government & public sector page
│   ├── allies/page.tsx             # Trade partners / subcontractors page
│   ├── veterans/page.tsx           # Veterans page
│   ├── testimonials/page.tsx       # Client testimonials page
│   ├── faq/page.tsx                # FAQ page
│   ├── privacy/page.tsx            # Privacy policy
│   ├── terms/page.tsx              # Terms of service
│   ├── accessibility/page.tsx      # Accessibility statement
│   ├── offline/page.tsx            # PWA offline fallback
│   ├── dashboard/page.tsx          # Admin analytics dashboard (Matt & Jeremy only)
│   ├── locations/
│   │   ├── pasco/page.tsx          # Location: Pasco (HQ)
│   │   ├── kennewick/page.tsx      # Location: Kennewick
│   │   ├── richland/page.tsx       # Location: Richland
│   │   ├── west-richland/page.tsx  # Location: West Richland
│   │   ├── yakima/page.tsx         # Location: Yakima
│   │   ├── spokane/page.tsx        # Location: Spokane
│   │   ├── walla-walla/page.tsx    # Location: Walla Walla
│   │   ├── coeur-d-alene/page.tsx  # Location: Coeur d'Alene
│   │   ├── hermiston/page.tsx      # Location: Hermiston
│   │   ├── omak/page.tsx           # Location: Omak
│   │   └── pendleton/page.tsx      # Location: Pendleton
│   ├── api/
│   │   ├── auth/                   # Admin authentication endpoints
│   │   ├── analytics/              # Analytics data API
│   │   ├── chat/                   # Partnership Guide chatbot (Cloudflare Workers AI)
│   │   ├── consultations/          # Consultation form submissions
│   │   ├── contact/                # Contact form submissions
│   │   ├── job-applications/       # Career application submissions
│   │   ├── newsletter/             # Newsletter signup
│   │   ├── security/               # Security/rate-limiting endpoints
│   │   ├── track-phone-call/       # Phone call analytics tracking
│   │   ├── upload/                 # File upload handling
│   │   └── functions/              # Edge function utilities
│   ├── layout.tsx                  # Root layout with providers
│   ├── error.tsx                   # Error boundary
│   ├── global-error.tsx            # Global error boundary
│   ├── not-found.tsx               # 404 page
│   ├── sitemap.ts                  # SEO sitemap
│   └── robots.ts                   # SEO robots.txt
├── components/
│   ├── about/                      # About page components
│   ├── analytics/
│   │   ├── EnhancedAnalytics.tsx    # Enhanced analytics wrapper
│   │   ├── GoogleAnalytics.tsx      # Google Analytics integration
│   │   ├── PageTrackingClient.tsx   # Client-side page tracking
│   │   ├── TrackedContactLinks.tsx  # Analytics-tracked contact links
│   │   └── index.ts                # Barrel export
│   ├── animations/                 # Framer Motion animation components
│   ├── chatbot/
│   │   ├── ChatWidget.tsx          # Floating Partnership Guide widget (all pages)
│   │   └── index.ts                # Barrel export
│   ├── contact/                    # Contact form & info components
│   ├── error/                      # Error display components
│   ├── forms/                      # Reusable form primitives
│   ├── home/                       # Homepage-specific components
│   ├── icons/
│   │   └── MaterialIcon.tsx        # Universal icon system
│   ├── layout/
│   │   ├── Navigation.tsx          # Responsive navigation
│   │   └── Footer.tsx              # Footer UI, analytics links, and private admin shortcut listener
│   ├── locations/                  # Location page components
│   ├── navigation/                 # Navigation config & utilities
│   ├── performance/                # Performance optimization components
│   ├── projects/                   # Projects/portfolio components
│   ├── pwa/                        # PWA install prompt components
│   ├── ratings/                    # Review/rating display components
│   ├── seo/                        # SEO meta & structured data components
│   ├── services/                   # Services page components
│   ├── shared/                     # Miscellaneous shared components
│   ├── shared-sections/            # Reusable full-page sections
│   ├── team/                       # Team page components
│   ├── templates/                  # BrandedContentSection & page templates
│   ├── testimonials/               # Testimonials section components
│   ├── ui/                         # Base UI primitives (Button, Card, etc.)
│   └── veterans/                   # Veterans page components
├── lib/
│   ├── analytics/                  # Analytics engine, hooks, tracking
│   ├── api/                        # API client utilities
│   ├── auth/
│   │   ├── jwt.ts                  # JWT token generation
│   │   └── middleware.ts           # Role-based access control
│   ├── chatbot/
│   │   └── knowledge-base.ts       # System prompt, Allies data, fallback responses
│   ├── cloudflare/                 # Cloudflare D1/R2/KV integrations
│   ├── constants/                  # App-wide constants
│   ├── data/                       # Static data files (team, portfolio, etc.)
│   ├── db/                         # Database query helpers
│   ├── email/                      # Email sending utilities
│   ├── notifications/              # Notification system
│   ├── performance/                # Performance monitoring utilities
│   ├── security/                   # Input sanitization, rate limiting
│   ├── seo/                        # SEO utilities, breadcrumb schemas
│   ├── services/                   # Business logic services
│   ├── styles/                     # Centralized style utilities
│   ├── types/                      # TypeScript type definitions
│   └── utils/                      # General utility functions
└── hooks/                          # Custom React hooks
```

---

## ✨ **Advanced Features Implementation Status**

### 🤖 **Partnership Guide (AI Chatbot)** - ✅ COMPLETE (March 26, 2026)

- **Cloudflare Workers AI**: `@cf/meta/llama-3.1-8b-instruct` via `[ai]` binding in
  `wrangler.toml` (no provisioning needed)
- **Graceful Fallback**: Keyword-based responses when AI binding is absent (local dev, quota exhaustion)
- **Knowledge Base**: All 9 Allies with contact info, full services list, FAQ, veteran benefits, navigation help
- **Brand-Safe System Prompt**: Forbids fabrication, cost estimates; enforces MH terminology
  (Client Partners, Trade Partners, Veteran-Owned)
- **Responsive Widget**: Floating button on desktop → fullscreen drawer on mobile with iOS safe-area padding
- **Security**: Input sanitized (max 500 chars), rate-limited to 60 req/min/IP (API preset), history capped at 10 turns
- **SEO/GEO**: `contactPoint` in Organization schema, FAQ structured data, `public/llms.txt` updated
- **Test Coverage**: 19 tests (10 UI assertions, 9 knowledge-base assertions)

### 🎬 **Animation System** - ✅ COMPLETE

- **Framer Motion Integration**: Smooth, performant animations with spring physics
- **Interactive Components**: Hover effects, gesture support, and micro-interactions
- **Performance Optimized**: Transform-GPU acceleration and optimized re-renders
- **Reusable Animations**: Component library with FadeInWhenVisible, HoverScale, StaggeredFadeIn

### 📊 **Analytics & SEO** - ✅ COMPLETE

**Custom Analytics System:**

- **Admin Dashboard**: Private keyboard shortcut access for Matt & Jeremy only (`Ctrl/Cmd + Shift + A`)
- **Comprehensive Tracking**: Page views, clicks, forms, scrolls, time-on-page
- **Enhanced Metadata**: Device, browser, OS, screen resolution, viewport
- **Geographic Data**: Timezone, language, country/region inference
- **Network Metrics**: Connection type, speed, latency, data saver mode
- **Traffic Analysis**: Source, medium, campaign, referrer tracking
- **Session Intelligence**: New/returning visitors, session count
- **Privacy-First**: localStorage only, no PII, user-deletable
- **Easy Integration**: `usePageTracking('Page Name')` - one line setup
- **Tracked Components**: Drop-in replacements for buttons, links, forms

**SEO:**

- **Enhanced SEO Schema**: Organization (with AI assistant `contactPoint`), LocalBusiness, Service, Project markup
- **Dynamic Sitemap**: Auto-generated from active pages
- **Robots.txt**: Optimized for AI crawlers, excludes all `/api/`, `/admin/`, `/dashboard/`, and internal paths
- **llms.txt**: Machine-readable company overview including Partnership Guide description

### 🎛️ **Content Management System** - ✅ COMPLETE

- **Cloudflare Integration**: ✅ Edge runtime with D1 database (ACTIVE)
- **Dynamic Content**: Project galleries and testimonials (via TestimonialsSection component)
- **Image Management**: ✅ Optimized storage and delivery via Cloudflare R2 (ACTIVE)
- **API Routes**: ✅ Secure Edge Functions and API endpoints (ACTIVE)
- **Data Storage**: ✅ Cloudflare D1 SQL database for structured data (ACTIVE)

### 🔧 **Performance Optimization** - ✅ COMPLETE

- **Code Splitting**: Automatic route and component-based splitting
- **Image Optimization**: Automatic WebP conversion (42% size reduction via GitHub Actions)
- **Video Optimization**: Automatic WebM/MP4 conversion with poster generation
- **Lazy Loading**: Intersection Observer for below-the-fold content
- **Caching Strategy**: 5-layer service worker caching (static, dynamic, images, API, CDN)
- **PWA**: Historical baseline: 100% test score (50/50) in Dec 2025; offline support and installability remain active

### 📱 **Progressive Web App** - ✅ COMPLETE (Dec 2025)

- **Service Worker v4.0.0**: 5-layer caching strategy with navigation preload
- **Offline Support**: Cached pages, assets, and custom offline page
- **Installable**: Install button in footer, PWA manifest configured
- **Background Sync**: Automatic updates and cache management
- **Test Coverage**: Historical baseline: 50 automated tests, 100% passing (Dec 2025 run)

### 🌙 **Theme System**

- **Smart Toggle**: Auto-detection with manual override capability
- **Persistent Preferences**: Local storage with system preference detection
- **Smooth Transitions**: Animated theme switching with proper contrast ratios
- **Accessible Design**: WCAG compliant color schemes and focus indicators

---

## 🔮 **Future Architecture Considerations**

### Planned Enhancements

- **Micro-Frontend Architecture**: Modular, independently deployable features
- **Enhanced Analytics**: Heat mapping, user journey tracking, A/B testing
- **AVIF Image Support**: Next-gen image format (20-30% smaller than WebP)
- **Video Streaming**: Adaptive bitrate streaming for large video content
- **Performance Monitoring**: Real User Monitoring (RUM) and synthetic testing

### Scalability Preparations

- **Component Library**: Reusable, documented components for rapid development
- **Design System**: Comprehensive style guide with Figma integration
- **Testing Strategy**: Lighthouse performance monitoring and code quality checks
- **CI/CD Pipeline**: Automated testing, building, and deployment workflows
