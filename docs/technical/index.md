# Technical Documentation

**Category:** Technical - Overview  
**Last Updated:** December 27, 2025

## Overview

Technical implementation guides, design system documentation, analytics tracking, and SEO guidelines for the MH Construction website.

## Directory Structure

### Analytics System ⭐ COMPLETE (Dec 27, 2025)

**Status:** ✅ FULLY OPERATIONAL - 100% page coverage, comprehensive marketing intelligence

Complete analytics tracking system with geographic tracking, CTA effectiveness, journey stages, lead scoring, and military-themed dashboard.

- **[Complete System Reference](./ANALYTICS-COMPLETE-SYSTEM-REFERENCE.md)** - Everything in one place ⭐ **NEW**
- **[Owner's Guide](../ANALYTICS-GUIDE-FOR-MATT-AND-JEREMY.md)** - Complete guide for Matt & Jeremy ⭐ **NEW**
- **[Admin Analytics System](./admin-analytics-system.md)** - Admin dashboard, authentication, features
- **[Analytics Tracking Guide](./analytics-tracking-guide.md)** - Complete implementation guide
- **[Analytics Quick Reference](./analytics-quick-reference.md)** - Quick setup reference
- **[Analytics Enhancement Dec 2025](./ANALYTICS-ENHANCEMENT-DEC-2025.md)** - Latest enhancements
- **[Analytics Data Collection Checklist](./ANALYTICS-DATA-COLLECTION-CHECKLIST.md)** - 100+ data points
- **[Analytics Data Collection Spec](./analytics-data-collection-spec.md)** - What we track and why
- **[Implementation Complete](./ANALYTICS-IMPLEMENTATION-COMPLETE.md)** - System overview

**Key Features:**

- **100% Page Coverage:** All 27 pages tracked with usePageTracking hook
- **Geographic Intelligence:** 3-tier fallback (Cloudflare → IP API → Timezone)
- **CTA Effectiveness:** Phone/email/address click tracking with location data
- **Journey Tracking:** Automatic stage detection (awareness → decision)
- **Service Interest:** Track which services attract views/clicks/learn-more
- **Project Interest:** Monitor project card clicks and engagement
- **Lead Scoring:** Automatic 0-100 quality calculation based on behavior
- **Military Dashboard:** Access at /dashboard (triple-click footer copyright)
- **Privacy-First:** No external services, localStorage only, GDPR compliant

**Test Suite:** `test-analytics.html` - Comprehensive system verification

### Design System

Component implementation and technical design documentation.

- **[Buttons & CTAs Guide](./design-system/buttons-ctas-complete-guide.md)** - Button patterns and implementation
- **[Icon System](./design-system/icon-system-complete.md)** - Material Icons implementation
- **[Dark Mode Guide](./dark-mode-implementation-guide.md)** - Complete dark mode implementation
- **[Dark Mode Quick Reference](./dark-mode-quick-reference.md)** - Quick cheatsheet

### SEO & Browser Titles ⭐ UPDATED (Dec 27, 2025)

Search engine optimization guidelines, dual-label military/construction messaging.

- **[SEO Complete Guide](./seo/seo-complete-guide.md)** - Keywords, meta tags, structured data
- **[Browser Titles Inventory](./BROWSER-TAB-TITLES-INVENTORY.md)** - Complete dual-label title system ⭐ **NEW**

## Tech Stack

- **Framework:** Next.js 15.5.2 with App Router
- **Language:** TypeScript 5.9.3 (strict mode)
- **Styling:** Tailwind CSS 3.4.18
- **Icons:** Google Material Icons (font-based)
- **Deployment:** Cloudflare Pages
- **Email:** Resend API
- **Analytics:** Custom tracking system with admin dashboard ⭐ NEW

## Quick Links

- [← Back to Documentation Home](../START-HERE.md)
- [Development Standards](../development/standards/)
- [Branding Documentation](../branding/)
- [Project Architecture](../project/architecture.md)

---

**MH Construction** - Founded 2010, Veteran-Owned Since 2025
