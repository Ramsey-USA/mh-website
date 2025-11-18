# SEO & Accessibility Documentation Index

**Category:** Technical - Search & Accessibility  
**Last Updated:** November 7, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../../master-index.md) - Central hub for all documentation
- [🛠️ Technical Index](../technical-index.md) - Technical documentation hub
- [⚡ Performance](../performance/performance-index.md) - Performance optimization
- [📱 Mobile Optimization](../design-system/mobile-optimization-guide.md) - Mobile SEO

---

## 📋 Overview

SEO and accessibility documentation covering search optimization, accessibility standards, and inclusive design
practices for the MH Construction website.

**⭐ IMPORTANT UPDATE (Nov 2025)**: All SEO implementations must align with the 7-group
page-specific messaging strategy documented in
**[Page-Specific Messaging Guide](../../branding/strategy/page-specific-messaging-guide.md)**. Each page
group has unique keyword priorities, tone, and messaging requirements that impact SEO metadata.

**Key Recent Updates:**

- **[Homepage Optimization](../../branding/strategy/homepage-optimization-complete.md)** - Trust-first,
  tech-later approach with section reordering
- **[SEO Optimization Complete](../../branding/strategy/seo-optimization.md)** -
  Complete audit of all 15 pages with before/after SEO changes

---

## 📚 Documentation Files

### Complete SEO & Search Optimization Guide ⭐

**[seo-complete-guide.md](./seo-complete-guide.md)** - Complete SEO, search, and accessibility optimization ⭐ **CONSOLIDATED!**

**Version 3.0.0** - Comprehensive guide consolidating 5 previous SEO documents into a single source of truth.

**This guide replaces:**

- `ultimate-seo-guide.md` (456 lines)
- `advanced-seo-optimization.md` (2,267 lines)
- `seo-enhancement-guide.md` (232 lines)
- `search-accessibility-guide.md` (208 lines)
- `seo-section-order-optimization.md` (319 lines)

**Complete Topics Covered:**

- **Auto-Adaptive SEO System** - Sitemap automation, smart scoring, automated auditing
- **Content Structure** - Section ordering principles, 15-25% ranking improvement strategies
- **Page-Specific Optimization** - Homepage, Services, About, Careers page ordering
- **Technical Implementation** - Page type detection, sitemap configuration, metadata
- **Search & Accessibility** - WCAG 2.1 compliance, keyboard navigation, screen readers
- **Schema Markup** - Organization, Service, FAQ, LocalBusiness structured data
- **Advanced Optimization** - Rich snippets, local SEO, voice search, link building
- **Monitoring & Auditing** - NPM scripts, performance tracking, troubleshooting

**When to Use:**

- **Setting up new pages** - Quick start guide with 3-step process
- **SEO audits** - Run `npm run seo:audit` and interpret results
- **Content optimization** - Section ordering for 15-25% ranking boost
- **Accessibility compliance** - WCAG 2.1 Level AA implementation
- **Schema implementation** - Complete structured data examples
- **Troubleshooting** - Common issues and solutions
- **Monthly maintenance** - Automated reporting and reviews

**Key Features:**

✅ Single source of truth for all SEO documentation  
✅ Zero content duplication  
✅ Complete quick-reference guide  
✅ Comprehensive troubleshooting section  
✅ Accessibility and SEO fully integrated  
✅ Real-world examples and code snippets

---

### SEO Compliance Status (Historical)

**Archived:** [seo-compliance-status.md](../../project/history/seo-compliance-status.md)

Historical SEO compliance tracking document moved to project history. For current SEO status, see the
[Complete SEO Guide](./seo-complete-guide.md) monitoring section.

**Use the Complete SEO Guide for:**

- Current page inventory and status
- Running SEO audits with `npm run seo:audit`
- Tracking compliance over time

---

## 🎯 Quick Reference Guide

**All SEO, search, and accessibility topics are now in one place:**

| Task                     | Section in Complete Guide              | Why                            |
| ------------------------ | -------------------------------------- | ------------------------------ |
| **Basic page SEO**       | Quick Start & Technical Implementation | Fundamentals and setup         |
| **WCAG compliance**      | Search & Accessibility                 | Complete WCAG 2.1 AA standards |
| **Advanced SEO**         | Advanced Optimization                  | Rich snippets, local SEO       |
| **Section ordering**     | Content Structure & Section Ordering   | 15-25% ranking improvement     |
| **Structured data**      | Schema Markup & Structured Data        | All schema types               |
| **Screen readers**       | Search & Accessibility                 | ARIA and keyboard navigation   |
| **Monitoring**           | Monitoring & Auditing                  | NPM scripts and tracking       |
| **Troubleshooting**      | Troubleshooting                        | Common issues and solutions    |
| **Page-specific guides** | Page-Specific Section Ordering         | Homepage, Services, About, etc |

**One guide, complete coverage: [seo-complete-guide.md](./seo-complete-guide.md)**

---

## 🚀 Quick Implementation Examples

### 1. Page Metadata (Next.js 15)

```tsx
// app/services/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Construction Services | MH Construction",
  description:
    "Expert construction services including residential, commercial, and government projects in Massachusetts.",
  keywords: [
    "construction",
    "Massachusetts",
    "contractor",
    "building services",
  ],
  openGraph: {
    title: "Construction Services | MH Construction",
    description: "Expert construction services...",
    url: "https://www.mhc-gc.com/services",
    images: ["/images/services-og.jpg"],
  },
};
```

### 2. Structured Data (JSON-LD)

```tsx
// app/components/StructuredData.tsx
export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "GeneralContractor",
          name: "MH Construction & General Contracting Corp",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Winthrop",
            addressRegion: "MA",
            postalCode: "02152",
          },
          telephone: "+1-617-599-1059",
          email: "office@mhc-gc.com",
        }),
      }}
    />
  );
}
```

### 3. Accessible Button

```tsx
// Accessible button with ARIA
<button
  type="button"
  aria-label="Open navigation menu"
  aria-expanded={isOpen}
  aria-controls="main-navigation"
  onClick={handleToggle}
>
  <span aria-hidden="true">☰</span>
</button>
```

### 4. Skip to Content Link

```tsx
// app/layout.tsx - Keyboard navigation
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white"
>
  Skip to main content
</a>

<main id="main-content">
  {children}
</main>
```

---

## 📊 SEO & Accessibility Metrics

### SEO Performance Targets

| Metric                   | Target         | Tool               |
| ------------------------ | -------------- | ------------------ |
| **Lighthouse SEO Score** | > 95           | Lighthouse         |
| **Core Web Vitals**      | All green      | PageSpeed Insights |
| **Mobile Usability**     | No issues      | Search Console     |
| **Indexability**         | 100% key pages | Search Console     |
| **Structured Data**      | No errors      | Rich Results Test  |
| **Page Speed (Mobile)**  | > 85           | PageSpeed Insights |

### Accessibility Compliance

| Standard                     | Target          | Tool              |
| ---------------------------- | --------------- | ----------------- |
| **WCAG 2.1 Level AA**        | 100% compliance | axe DevTools      |
| **Lighthouse Accessibility** | > 95            | Lighthouse        |
| **Color Contrast**           | ≥ 4.5:1 (text)  | Contrast checker  |
| **Keyboard Navigation**      | Full support    | Manual testing    |
| **Screen Reader**            | Compatible      | NVDA/JAWS         |
| **Focus Indicators**         | Always visible  | Visual inspection |

---

## 🔗 Related Documentation

### Technical

- [Technical Index](../technical-index.md) - All technical documentation
- [Performance Index](../performance/performance-index.md) - Performance optimization
- [Features](../features.md) - Platform features

### Design System

- [Design System Hub](../design-system/design-system-index.md) - Design system
- [Mobile Optimization](../design-system/mobile-optimization-guide.md) - Mobile experience
- [Navigation](../navigation/navigation-index.md) - Navigation system

### Business

- [Services](../../business/services.md) - Business services
- [Government Projects](../../business/government-grant-projects.md) - Government work

---

## ✅ SEO & Accessibility Checklist

### Every Page Must Have

- [ ] Unique, descriptive title (50-60 characters)
- [ ] Meta description (150-160 characters)
- [ ] Semantic HTML (h1, nav, main, footer)
- [ ] Alt text for all images
- [ ] Proper heading hierarchy (h1 → h6)
- [ ] Mobile-responsive design
- [ ] Fast page load (< 3s)
- [ ] Valid HTML
- [ ] HTTPS enabled
- [ ] Canonical URL

### Accessibility Requirements

- [ ] Color contrast ≥ 4.5:1
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels where needed
- [ ] Skip to content link
- [ ] Form labels properly associated
- [ ] Error messages descriptive
- [ ] No keyboard traps
- [ ] Screen reader tested
- [ ] Lighthouse accessibility > 95

### SEO Enhancements

- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Structured data (JSON-LD)
- [ ] XML sitemap included
- [ ] Robots.txt configured
- [ ] Internal linking strategy
- [ ] Image optimization
- [ ] Local business schema
- [ ] Mobile-first indexing ready
- [ ] Core Web Vitals passing

---

## 🆘 Troubleshooting

### Low Lighthouse SEO Score

**Common Issues:**

1. Missing or duplicate meta descriptions
2. Images without alt text
3. Invalid structured data
4. Missing canonical tags
5. Slow page load times

**Solutions:**

- Audit all pages for meta tags
- Add descriptive alt text to images
- Validate structured data with Rich Results Test
- Implement canonical URLs
- Optimize performance (see [Performance Index](../performance/performance-index.md))

**Reference:** Both guides

---

### Accessibility Violations

**Common Issues:**

1. Low color contrast
2. Missing ARIA labels
3. Keyboard navigation broken
4. Focus not visible
5. Images missing alt text

**Solutions:**

- Use contrast checker tools (4.5:1 minimum)
- Add aria-label to icon buttons
- Test with keyboard only (no mouse)
- Style :focus states clearly
- Provide meaningful alt text

**Reference:** [search-accessibility-guide.md](./search-accessibility-guide.md)

---

### Poor Search Rankings

**Common Issues:**

1. Thin content
2. Slow page speed
3. Poor mobile experience
4. Missing structured data
5. Weak internal linking

**Solutions:**

- Add valuable, unique content (300+ words)
- Optimize performance (see [Performance](../performance/performance-index.md))
- Ensure mobile-responsive design
- Implement local business schema
- Create internal link strategy

**Reference:** [seo-enhancement-guide.md](./seo-enhancement-guide.md)

---

## 🛠️ SEO & Accessibility Tools

### SEO Tools

- **Google Search Console** - Index status and issues
- **PageSpeed Insights** - Performance and Core Web Vitals
- **Rich Results Test** - Structured data validation
- **Google Analytics** - Traffic and behavior
- **Screaming Frog** - Site crawling and audit

### Accessibility Tools

- **axe DevTools** - Automated accessibility testing
- **Lighthouse** - Accessibility audit
- **NVDA/JAWS** - Screen reader testing
- **Contrast Checker** - Color contrast validation
- **WAVE** - Web accessibility evaluation

### Combined Tools

- **Lighthouse** - SEO + Accessibility + Performance
- **Chrome DevTools** - Inspection and debugging
- **Browser extensions** - axe, WAVE, Lighthouse

---

## 📈 Success Metrics

### SEO Goals

- **Organic Traffic:** Increase by 50% year-over-year
- **Search Rankings:** Top 3 for key local terms
- **Click-Through Rate:** > 5% average
- **Indexed Pages:** 100% of key content
- **Bounce Rate:** < 40%

### Accessibility Goals

- **WCAG 2.1 AA:** 100% compliance
- **Lighthouse Score:** > 95
- **Zero Critical Issues:** axe DevTools
- **User Feedback:** Positive from assistive technology users
- **Legal Compliance:** ADA compliant

---

## 📞 Support

For questions about SEO and accessibility:

- **Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Documentation Issues:** Submit to project repository
- **SEO Strategy:** Contact web development team
- **Accessibility Concerns:** Priority support available

---

**Last Updated:** November 6, 2025  
**Status:** ✅ Active  
**Files:** 2 (Search & Accessibility Guide, SEO Enhancement Guide)
