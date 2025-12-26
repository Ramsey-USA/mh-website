# Technical Documentation

**Category:** Technical - Overview  
**Last Updated:** December 26, 2025

## Overview

Technical implementation guides, design system documentation, analytics tracking, and SEO guidelines for the MH Construction website.

## Directory Structure

### Analytics System ⭐ NEW

Complete analytics tracking system with admin dashboard.

- **[Admin Analytics System](./admin-analytics-system.md)** - Admin dashboard, authentication, features
- **[Analytics Tracking Guide](./analytics-tracking-guide.md)** - Complete implementation guide
- **[Analytics Quick Reference](./analytics-quick-reference.md)** - Quick setup reference
- **[Analytics Data Collection Spec](./analytics-data-collection-spec.md)** - What we track and why
- **[Implementation Complete](./ANALYTICS-IMPLEMENTATION-COMPLETE.md)** - System overview

**Key Features:**

- Automatic page tracking (views, duration, scroll depth)
- User behavior analytics (clicks, forms, CTAs)
- **Enhanced metadata collection:**
  - Device/browser/OS information
  - Geographic data (timezone, language)
  - Network connection metrics
  - Traffic source analysis (referrer, UTM, organic/social)
  - Session intelligence (new/returning, session count)
- Admin dashboard with hidden access
- Easy extensibility for new pages
- Privacy-respectful (no PII, localStorage only)

### Design System

Component implementation and technical design documentation.

- **[Buttons & CTAs Guide](./design-system/buttons-ctas-complete-guide.md)** - Button patterns and implementation
- **[Icon System](./design-system/icon-system-complete.md)** - Material Icons implementation
- **[Dark Mode Guide](./dark-mode-implementation-guide.md)** - Complete dark mode implementation
- **[Dark Mode Quick Reference](./dark-mode-quick-reference.md)** - Quick cheatsheet

### SEO

Search engine optimization guidelines and best practices.

- **[SEO Complete Guide](./seo/seo-complete-guide.md)** - Keywords, meta tags, structured data

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

**MH Construction** - Veteran-Owned Excellence Since 2010
