# MH Construction - Architecture Documentation

**Category:** Project - Architecture  
**Last Updated:** March 15, 2026  
**Version:** 1.0.0  
**Status:** ✅ Active

## 🎯 **CURRENT STATE: Complete Production Platform**

### **Live Production Pages**

- ✅ **Homepage** (`/src/app/page.tsx`) - Partnership-focused landing with core
  values, SEO optimized (95/100), performance optimized with lazy loading
  - Full documentation: [Homepage Documentation](../technical/homepage.md)
- ✅ **About Page** (`/src/app/about/page.tsx`) - Company story and 4-value foundation
- ✅ **Services Page** (`/src/app/services/page.tsx`) - Construction capabilities and expertise
- ✅ **Projects Page** (`/src/app/projects/page.tsx`) - Portfolio showcase with filtering
- ✅ **Team Page** (`/src/app/team/page.tsx`) - Leadership profiles and specializations
- ✅ **Contact Page** (`/src/app/contact/page.tsx`) - Multiple communication channels
- ✅ **Careers Page** (`/src/app/careers/page.tsx`) - Job listings and company benefits
- ✅ **Public Sector Page** (`/src/app/public-sector/page.tsx`) - Government & public sector project focus
- ✅ **Allies Page** (`/src/app/allies/page.tsx`) - Trade partner / subcontractor network

### **Advanced Platform Features**

- ✅ **SEO Optimization** - Complete sitemap, meta tags, and structured data
- ✅ **Navigation System** - Responsive navigation with adaptive grid layout
- ✅ **MaterialIcon System** - Universal icon system with Google Material Icons
- ✅ **Theme System** - Dark/Light mode support with seamless switching
- ✅ **Analytics Integration** - Enhanced tracking and performance monitoring

---

## 🏗️ **Complete Production Architecture**

### **Core Technologies**

- **Framework**: Next.js 15.5.12 (App Router)
- **Language**: TypeScript 5.9.2
- **Styling**: Tailwind CSS 3.4.19
- **Icons**: Google Material Icons (font-based)
- **Animations**: Framer Motion 12.35.2
- **Deployment**: Cloudflare Pages
- **Database**: Cloudflare D1 (SQLite)
- **Analytics**: Custom tracking system with admin dashboard (Matt & Jeremy only)
- **Theme**: Dark/Light mode support
- **PWA**: Service Worker v4.0.0, offline-ready, installable
- **Media Optimization**: Automatic WebP/WebM conversion via GitHub Actions
- **Performance**: 94+ Lighthouse score, 100% PWA test score

### **Complete Component Architecture**

```text
src/
├── app/
│   ├── page.tsx                    # Homepage (Complete)
│   ├── about/page.tsx              # About page (Complete)
│   ├── services/page.tsx           # Services page (Complete)
│   ├── projects/page.tsx           # Projects page (Complete)
│   ├── team/page.tsx               # Team page (Complete)
│   ├── contact/page.tsx            # Contact page (Complete)
│   ├── careers/page.tsx            # Careers page (Complete)
│   ├── dashboard/page.tsx          # Admin analytics dashboard (Matt & Jeremy only)
│   ├── api/
│   │   ├── auth/admin-login/       # Admin authentication endpoint
│   │   └── analytics/dashboard/    # Analytics data API
│   ├── layout.tsx                  # Root layout with providers
│   ├── sitemap.ts                  # SEO sitemap
│   └── robots.ts                   # SEO robots.txt
├── components/
│   ├── icons/
│   │   └── MaterialIcon.tsx        # Universal icon system
│   ├── layout/
│   │   ├── Navigation.tsx          # Responsive navigation
│   │   └── Footer.tsx              # Footer with hidden admin trigger
│   ├── ui/
│   │   └── modals/
│   │       └── AdminSignInModal.tsx # Admin authentication modal
│   ├── analytics/
│   │   └── TrackedComponents.tsx   # Tracked button/link/form components
│   ├── seo/                        # SEO components
│   └── shared-sections/            # Reusable sections
├── lib/
│   ├── analytics/
│   │   ├── index.ts                # Analytics module exports
│   │   ├── analytics-engine.ts     # Core analytics engine
│   │   ├── tracking.ts             # Tracking utility functions
│   │   ├── hooks.ts                # React hooks (usePageTracking, etc.)
│   │   ├── metadata.ts             # Enhanced metadata collection
│   │   └── types.ts                # Analytics type definitions
│   ├── auth/
│   │   ├── jwt.ts                  # JWT token generation
│   │   └── middleware.ts           # Role-based access control
│   ├── services/                   # API services
│   ├── utils/                      # Utility functions
│   └── types/                      # TypeScript types
└── hooks/                          # Custom React hooks
```

---

## ✨ **Advanced Features Implementation Status**

### 🎬 **Animation System** - ✅ COMPLETE

- **Framer Motion Integration**: Smooth, performant animations with spring physics
- **Interactive Components**: Hover effects, gesture support, and micro-interactions
- **Performance Optimized**: Transform-GPU acceleration and optimized re-renders
- **Reusable Animations**: Component library with FadeInWhenVisible, HoverScale, StaggeredFadeIn

### 📊 **Analytics & SEO** - ✅ COMPLETE

**Custom Analytics System:**

- **Admin Dashboard**: Hidden access via triple-click footer (Matt & Jeremy only)
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

- **Enhanced SEO Schema**: Organization, LocalBusiness, Service, Project markup
- **Dynamic Sitemap**: Auto-generated from active pages
- **Robots.txt**: Optimized for AI crawlers, excludes admin pages

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
- **PWA**: 100% test score (50/50), offline support, installable

### 📱 **Progressive Web App** - ✅ COMPLETE (Dec 2025)

- **Service Worker v4.0.0**: 5-layer caching strategy with navigation preload
- **Offline Support**: Cached pages, assets, and custom offline page
- **Installable**: Install button in footer, PWA manifest configured
- **Background Sync**: Automatic updates and cache management
- **Test Coverage**: 50 automated tests, 100% passing

### 🌙 **Theme System**

- **Smart Toggle**: Auto-detection with manual override capability
- **Persistent Preferences**: Local storage with system preference detection
- **Smooth Transitions**: Animated theme switching with proper contrast ratios
- **Accessible Design**: WCAG compliant color schemes and focus indicators

---

## 🔮 **Future Architecture Considerations**

### **Planned Enhancements**

- **Micro-Frontend Architecture**: Modular, independently deployable features
- **Enhanced Analytics**: Heat mapping, user journey tracking, A/B testing
- **AVIF Image Support**: Next-gen image format (20-30% smaller than WebP)
- **Video Streaming**: Adaptive bitrate streaming for large video content
- **Performance Monitoring**: Real User Monitoring (RUM) and synthetic testing

### **Scalability Preparations**

- **Component Library**: Reusable, documented components for rapid development
- **Design System**: Comprehensive style guide with Figma integration
- **Testing Strategy**: Lighthouse performance monitoring and code quality checks
- **CI/CD Pipeline**: Automated testing, building, and deployment workflows
