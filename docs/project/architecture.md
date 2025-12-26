# MH Construction - Architecture Documentation

**Category:** Project - Architecture
**Last Updated:** December 23, 2025
**Status:** ✅ Active

## 🎯 **CURRENT STATE: Complete Production Platform**

### **Live Production Pages**

- ✅ **Homepage** (`/src/app/page.tsx`) - Partnership-focused landing with core values
- ✅ **About Page** (`/src/app/about/page.tsx`) - Company story and 4-value foundation
- ✅ **Services Page** (`/src/app/services/page.tsx`) - Construction capabilities and expertise
- ✅ **Projects Page** (`/src/app/projects/page.tsx`) - Portfolio showcase with filtering
- ✅ **Team Page** (`/src/app/team/page.tsx`) - Leadership profiles and specializations
- ✅ **Contact Page** (`/src/app/contact/page.tsx`) - Multiple communication channels
- ✅ **Careers Page** (`/src/app/careers/page.tsx`) - Job listings and company benefits
- ✅ **Government Page** (`/src/app/government/page.tsx`) - Public sector project focus
- ✅ **Trade Partners Page** (`/src/app/trade-partners/page.tsx`) - Subcontractor network

### **Advanced Platform Features**

- ✅ **SEO Optimization** - Complete sitemap, meta tags, and structured data
- ✅ **Navigation System** - Responsive navigation with adaptive grid layout
- ✅ **MaterialIcon System** - Universal icon system with Google Material Icons
- ✅ **Theme System** - Dark/Light mode support with seamless switching
- ✅ **Analytics Integration** - Enhanced tracking and performance monitoring

---

## 🏗️ **Complete Production Architecture**

### **Core Technologies**

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 3.4.18
- **Icons**: Google Material Icons (font-based)
- **Animations**: Framer Motion 12.23.24
- **Deployment**: Cloudflare Pages
- **Database**: Cloudflare D1 (SQLite)
- **Analytics**: Custom tracking system with admin dashboard (Matt & Jeremy only)
- **Theme**: Dark/Light mode support
- **Performance**: 94+ Lighthouse score

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
│   ├── tracking-example/page.tsx   # Analytics demo page
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
- **Dynamic Content**: Project galleries, blog posts (via BlogSection component), testimonials (via TestimonialsSection component)
- **Image Management**: ✅ Optimized storage and delivery via Cloudflare R2 (ACTIVE)
- **API Routes**: ✅ Secure Edge Functions and API endpoints (ACTIVE)
- **Data Storage**: ✅ Cloudflare D1 SQL database for structured data (ACTIVE)

### 🔧 **Performance Optimization** - ✅ COMPLETE

- **Code Splitting**: Automatic route and component-based splitting
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Lazy Loading**: Intersection Observer for below-the-fold content
- **Caching Strategy**: Comprehensive caching with SWR and service workers

### 📱 **Progressive Web App**

- **Service Worker**: Background sync, push notifications, offline functionality
- **App Shell**: Fast, reliable core experience with dynamic content
- **Installation Prompts**: Smart PWA install suggestions for engaged users
- **Offline Experience**: Cached pages and meaningful offline messaging

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
- **AI Integration**: ChatGPT integration for customer support and project estimation
- **Advanced PWA**: Background processing, file system access, payment integration
- **Performance Monitoring**: Real User Monitoring (RUM) and synthetic testing

### **Scalability Preparations**

- **Component Library**: Reusable, documented components for rapid development
- **Design System**: Comprehensive style guide with Figma integration
- **Testing Strategy**: Lighthouse performance monitoring and code quality checks
- **CI/CD Pipeline**: Automated testing, building, and deployment workflows

```

```
