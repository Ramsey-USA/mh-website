# Technical Documentation

**Category:** Technical - Overview  
**Last Updated:** December 27, 2025

## Overview

Technical implementation guides, design system documentation, analytics tracking, and SEO
guidelines for the MH Construction website.

## Directory Structure

### Analytics System ⭐ COMPLETE (Dec 27, 2025)

**Status:** ✅ FULLY OPERATIONAL - 100% page coverage, comprehensive marketing intelligence

Complete analytics tracking system with geographic tracking, CTA effectiveness, journey stages,
lead scoring, and military-themed dashboard.

- **[Owner's Guide](../../analytics-guide-for-matt-and-jeremy.md)** - Complete guide for Matt & Jeremy ⭐ **NEW**
- **[Admin Analytics System](./admin-analytics-system.md)** - Admin dashboard, authentication, features
- **[Analytics Tracking Guide](./analytics-tracking-guide.md)** - Complete implementation guide
- **[Analytics Quick Reference](./analytics-quick-reference.md)** - Quick setup reference

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

### Development Resources

See main [README.md](../../README.md#quick-start-by-role) for complete development guide including:

- Component Cheatsheet - Copy-paste patterns
- Page Compliance Checklist - Systematic audit tool
- Page Template Guide - New page boilerplate
- StandardSection Template - 82% code reduction

1. Customize with your content
2. Use Component Cheatsheet for patterns
3. Run Page Compliance Checklist
4. Check Common Mistakes list
5. Test and deploy

**Key Benefits:**

- **82% Code Reduction:** StandardSection template eliminates boilerplate
- **Consistency Guarantee:** Checklists catch deviations before deployment
- **Faster Development:** Copy-paste ready code snippets
- **Quality Assurance:** 150+ item compliance checklist
- **Error Prevention:** Common mistakes guide with 22 examples

### Component Pattern Architecture (Dec 28, 2025)

**Status:** ✅ Strategic framework for cohesive page design

Comprehensive pattern strategy for building consistent, engaging pages using reusable showcase components.

- **[Component Pattern Strategy](./component-pattern-strategy.md)** - Overall architecture philosophy
- **[AlternatingShowcase Pattern](./AlternatingShowcase-pattern.md)** - Image/text alternating layout guide
- **[NextStepsSection Standardization](./NextStepsSection-standardization.md)** - Unified final CTA across pages
- **[Homepage Documentation](./homepage.md)** - Reference implementation example

**Key Principles:**

- **"One of Each" Philosophy:** Use 1-2 showcase patterns per page for cohesion
- **Five Core Patterns:** AlternatingShowcase, ValuesShowcase, ContentCard Grid, Timeline, NextStepsSection
- **Pattern Selection Decision Trees:** Choose the right pattern for your content
- **Page-by-Page Recommendations:** Services, About, Team, Projects, Careers guidance
- **Performance Budgets:** Max 2 showcase patterns per page (<300KB budget)
- **Content Planning Worksheets:** Pre-implementation planning tools

**Available Patterns:**

1. **AlternatingShowcase** - Image/text alternating (Homepage Core Values, About Safety)
2. **ValuesShowcase** - Interactive modal exploration (About Values)
3. **ContentCard Grid** - 6+ items in card format (About News)
4. **Timeline** - Sequential steps (Homepage Process, About History)
5. **NextStepsSection** - Final CTA on every major page (7 pages)

### Design System

Component implementation and technical design documentation.

- **[Buttons & CTAs Guide](./design-system/buttons-ctas-complete-guide.md)** - Button patterns and implementation
- **[Icon System](./design-system/icon-system-complete.md)** - Material Icons implementation
- **[Dark Mode Guide](./dark-mode-implementation-guide.md)** - Complete dark mode implementation
- **[Dark Mode Quick Reference](./dark-mode-quick-reference.md)** - Quick cheatsheet
- **[PWA Documentation](./pwa-documentation.md)** - Progressive Web App implementation guide
- **[PWA Quick Reference](./pwa-quick-reference.md)** - PWA setup cheatsheet
- **[Secrets Management](./secrets-management.md)** - Environment variables and secrets guide
- **[Admin Password Security](./admin-password-security.md)** - Admin authentication security
- **[Automatic Media Optimization](./automatic-media-optimization.md)** - Image and video optimization pipeline
- **[FFmpeg Setup](./ffmpeg-setup.md)** - Video processing setup guide

### SEO & Browser Titles ⭐ UPDATED (Dec 27, 2025)

Search engine optimization guidelines, dual-label military/construction messaging.

- **[SEO Complete Guide](./seo/seo-complete-guide.md)** - Keywords, meta tags, structured data
- **[Browser Titles Inventory](./browser-tab-titles-inventory.md)** - Complete dual-label title system ⭐ **NEW**

## Tech Stack

- **Framework:** Next.js 15.5.12 with App Router
- **Language:** TypeScript 5.9.2 (strict mode)
- **Styling:** Tailwind CSS 3.4.19
- **Icons:** Google Material Icons (font-based)
- **Deployment:** Cloudflare Pages
- **Email:** Resend API
- **Analytics:** Custom tracking system with admin dashboard ⭐ NEW

## Quick Links

- [← Back to Main README](../../README.md)
- [Development Standards](../development/standards/)
- [Branding Documentation](../branding/)

---

**MH Construction** - Founded 2010, Veteran-Owned Since 2025
