# Military-Themed Page Rebrand

**Date:** December 13, 2025  
**Status:** ✅ Implemented  
**Category:** Branding - Messaging Strategy  
**Version:** 1.0.0

## Overview

MH Construction has rebranded all major pages with military-inspired names to emphasize the company's
veteran-owned identity and values. This strategic rebrand maintains SEO-friendly URLs while creating a
distinctive, memorable brand voice that resonates with our military heritage.

## Core Principle

**Display names are military-themed, URLs remain unchanged for SEO.**

This approach provides:

- ✅ Strong brand differentiation
- ✅ Memorable page names aligned with veteran identity
- ✅ SEO continuity (no URL changes required)
- ✅ Consistent messaging across all touchpoints

---

## Military-Themed Page Names

### Primary Pages

| Military Name              | Original Name | URL         | Purpose                                 |
| -------------------------- | ------------- | ----------- | --------------------------------------- |
| **Our Oath**               | About         | `/about`    | Company foundation, values, and mission |
| **The Battle Plan**        | Services      | `/services` | Construction services and capabilities  |
| **Victories**              | Projects      | `/projects` | Completed projects showcase             |
| **Team Six**               | Team          | `/team`     | Leadership and team members             |
| **Occupation Specialties** | Careers       | `/careers`  | Career opportunities                    |
| **Introductions**          | Contact       | `/contact`  | Contact information and forms           |

### Supporting Pages

| Military Name                   | Original Name  | URL               | Purpose                         |
| ------------------------------- | -------------- | ----------------- | ------------------------------- |
| **Allies in Force**             | Trade Partners | `/trade-partners` | Trade partner program           |
| **Combat Proven**               | Veterans       | `/veterans`       | Veterans initiative             |
| **PRT - Project Response Team** | Urgent Support | `/urgent`         | Emergency construction services |

---

## Implementation Details

### Navigation Updates

All navigation elements have been updated with military-themed names:

**Main Navigation Menu:**

```tsx
- Our Oath (/about)
- The Battle Plan (/services)
- Victories (/projects)
- Team Six (/team)
- Occupation Specialties (/careers)
- Introductions (/contact)
```

**Footer Navigation:**

```tsx
- Our Oath (/about)
- Team Six (/team)
- Allies in Force (/trade-partners)
- Combat Proven (/veterans)
- Occupation Specialties (/careers)
```

### Breadcrumbs

All breadcrumb trails display military-themed names:

```tsx
Home > Our Oath
Home > The Battle Plan
Home > Victories
Home > Victories > Case Study
```

### SEO Metadata

Page titles include military-themed names with context:

```tsx
"Our Oath - MH Construction Foundation & Values";
"The Battle Plan - Construction Services | MH Construction";
"Victories - Completed Projects | MH Construction";
"Team Six - Leadership Team | MH Construction";
```

---

## Removed Features

As part of this rebrand, the following pages were removed to simplify the user journey:

### ❌ Booking Page (`/booking`)

- **Reason:** Simplified to direct contact approach
- **Replacement:** All CTAs redirect to `/contact` (Introductions)
- **User Flow:** Users contact directly via phone, email, or contact form

### ❌ AI Estimator (`/estimator`)

- **Reason:** Focus on personal consultation over automated tools
- **Replacement:** CTAs redirect to `/contact` or `/projects`
- **User Flow:** Users view completed work or contact for consultation

### ❌ 3D Explorer (`/3d-explorer`)

- **Reason:** Feature consolidation
- **Replacement:** Removed from navigation and footer
- **User Flow:** Redirect to `/projects` for project visualization

---

## Messaging Guidelines

### Voice & Tone

**Military-Inspired But Accessible:**

- Use military terminology that's broadly understood
- Avoid jargon that requires explanation
- Balance strength with approachability
- Maintain professional construction industry standards

**Examples of Good Military Terminology:**

- ✅ "Our Oath" - Clear, meaningful, resonates with military and civilian audiences
- ✅ "The Battle Plan" - Strategic, organized, actionable
- ✅ "Victories" - Positive, achievement-focused
- ✅ "Team Six" - Elite, specialized, recognizable reference
- ✅ "Combat Proven" - Tested, reliable, veteran-specific

**Avoid:**

- ❌ Overly technical military acronyms (MOS, SITREP, etc.)
- ❌ Combat-focused language that might alienate civilians
- ❌ Rank structure references in team descriptions
- ❌ Military time or measurement units in general communications

### Content Integration

**Page Heroes:**
All page heroes use military-themed H1 titles with supporting subtitles:

```tsx
<h1>Our Oath</h1>
<subtitle>Trust Built, Project by Project</subtitle>

<h1>The Battle Plan</h1>
<subtitle>Your Vision, Our Precision</subtitle>

<h1>Victories</h1>
<subtitle>650+ Completed Projects</subtitle>
```

**Internal Links:**
When referencing other pages internally, use military-themed names:

```markdown
Learn more about [Our Oath](/about)
Explore [The Battle Plan](/services)
View our [Victories](/projects)
Meet [Team Six](/team)
```

---

## CTA Strategy

### Primary CTAs

All major CTAs now direct to direct contact or project showcase:

**Contact-Focused:**

```tsx
<Button variant="primary" href="/contact">
  <Icon name="phone" />
  Contact Us Today
</Button>
```

**Work Showcase:**

```tsx
<Button variant="secondary" href="/projects">
  <Icon name="photo_library" />
  View Our Victories
</Button>
```

### Secondary CTAs

```tsx
<Button variant="outline" href="/services">
  <Icon name="construction" />
  Explore The Battle Plan
</Button>

<Button variant="outline" href="/about">
  <Icon name="foundation" />
  Read Our Oath
</Button>
```

---

## Technical Implementation

### File Changes

**Updated Files (46 total):**

- Navigation components (Navigation.tsx, Footer.tsx)
- All page heroes (AboutHero, ServicesHero, ProjectsHero, etc.)
- Breadcrumb components across all pages
- SEO metadata utilities (page-seo-utils.ts)
- Contact page quick action cards
- Shared CTA components (NextStepsSection, AIEstimatorCTA, etc.)

**Deleted Files (15 total):**

- `/app/booking/` directory and all components
- `/app/estimator/` directory and metadata
- `/app/3d-explorer/` directory
- Service worker booking/estimator references

### Service Worker Updates

```javascript
// Removed from CRITICAL_PAGES
- "/booking"
- "/estimator"

// Removed from CRITICAL_API_ENDPOINTS
- "/api/booking"
- "/api/estimator"

// Updated notification handlers
appointment notifications → redirect to /contact
```

---

## SEO Considerations

### URL Stability ✅

**No URLs were changed.** This preserves:

- Existing search engine rankings
- Inbound link equity
- Social media share links
- QR code destinations
- Email signature links

### Metadata Updates

All page titles updated to include military-themed names with descriptive context:

```typescript
"Our Oath - MH Construction | Veteran-Owned Since 2025";
"The Battle Plan - Construction Services | Tri-Cities WA";
"Victories - 650+ Completed Projects | MH Construction";
```

### Schema Markup

Organization and service schema remain unchanged. Military-themed names appear in:

- Page titles
- Breadcrumb structured data
- Internal linking anchor text

---

## Future Considerations

### Potential Additions

1. **Mission Briefing** - Newsletter or updates page
2. **Arsenal** - Tools and resources section
3. **Intel** - Blog or industry insights
4. **Deployment Zones** - Service area map

### Brand Evolution

Monitor user feedback on military terminology:

- Track bounce rates on renamed pages
- Survey client response to new names
- A/B test CTAs with military vs. traditional language
- Assess competitor differentiation impact

---

## Related Documentation

- [Messaging Guidelines](./messaging.md) - Overall brand voice
- [Core Values](../../business/core-values.md) - Foundation values
- [SEO Strategy](../../technical/seo/seo-messaging-strategy.md) - Search optimization
- [Navigation Components](../../components/navigation/) - Technical implementation

---

**Document Owner:** MH Construction Marketing Team  
**Last Review:** December 13, 2025  
**Next Review:** March 2026
