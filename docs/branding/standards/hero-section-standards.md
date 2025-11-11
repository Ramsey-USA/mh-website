# MH Construction Hero Section Standards

**Version:** 4.1.0
**Date:** November 11, 2025
**Status:** ✅ Official Standard
**Category:** Brand Standards - Hero Sections

---

## Quick Reference

This document defines the official MH Construction hero section standard implemented
across all website pages, including the November 2025 update for unique page-specific taglines.

## 🎯 Tagline Strategy Update (November 11, 2025)

### NEW: Page-Specific Taglines

Each hero section now features a **unique, page-specific tagline** instead of repeating
"THE ROI IS THE RELATIONSHIP" across all pages. This strategy:

- **Reduces tagline fatigue** - Avoids overuse of a single phrase
- **Reinforces page purpose** - Each tagline connects to the specific page context
- **Improves message retention** - Variety helps visitors remember key messages
- **Maintains brand consistency** - All taglines align with core values

### Implementation Guidelines

**DO:**

- Create taglines that reflect the specific page's purpose
- Keep taglines concise (3-7 words typically)
- Align with brand voice (professional, partnership-focused)
- Test for clarity and impact

**DON'T:**

- Reuse "THE ROI IS THE RELATIONSHIP" in hero descriptions
- Use generic taglines that could apply to any page
- Create taglines longer than one sentence
- Deviate from brand tone and values

### Current Page-Specific Taglines

| Page           | Unique Tagline                             | Purpose                  |
| -------------- | ------------------------------------------ | ------------------------ |
| Homepage       | "Where Vision Meets Execution"             | Partnership + delivery   |
| About          | "Excellence Through Experience"            | Veteran values + quality |
| Services       | "Your project deserves expert oversight"   | Service quality focus    |
| Projects       | "Proven Results, Trusted Partnerships"     | Track record emphasis    |
| Team           | "Experience You Can Trust"                 | Team expertise focus     |
| Careers        | "Your Future Starts Here"                  | Career growth focus      |
| Booking        | "Start Your Project With Confidence"       | Consultation confidence  |
| Urgent         | "When Time Is Critical, We Respond"        | Rapid response emphasis  |
| Government     | "Mission-Ready, Compliance-Driven"         | Federal expertise focus  |
| Trade Partners | "Building Success Together"                | B2B partnership focus    |
| Estimator      | "Smart Planning Starts Here"               | AI estimation focus      |
| 3D Explorer    | "Innovation Meets Construction Excellence" | Technology focus         |

**Note:** "THE ROI IS THE RELATIONSHIP" remains important in body content,
testimonials, and value propositions—just not repeated in every hero section.

---

## 🚨 Critical Rules

### ✅ MUST INCLUDE

1. **Full Viewport Height**: `h-screen flex items-center justify-center`
2. **Title**: Main page heading with `text-brand-secondary`
3. **Subtitle**: Brief tagline or description
4. **Description**: Detailed text including company tagline
5. **Navigation**: PageNavigation at bottom

### ❌ MUST NOT INCLUDE

1. **NO Badges**: Veteran badges, military_tech icons, decorative badges
2. **NO CTA Buttons**: Schedule Consultation, Get Estimate, Contact buttons
3. **NO Stats**: 30+ years, 100+ projects, satisfaction rate displays
4. **NO Trust Indicators**: Icons with project counts or ratings
5. **NO Contact Buttons**: Quick contact or phone buttons
6. **NO Additional Elements**: Keep it clean - title, subtitle, description only

---

## Standard Implementation

### Complete Hero Section Template

```tsx
<section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

  {/* Content - CLEAN AND SIMPLE */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
      {/* Main Title */}
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
        <span className="block text-brand-secondary font-black drop-shadow-lg">
          Your Page Title
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
        Your compelling subtitle or tagline
      </p>

      {/* Description */}
      <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
        "Building for the Owner, NOT the Dollar" — Your page description text
        here.
      </p>
    </div>
  </div>

  {/* Navigation Bar - ALWAYS AT BOTTOM */}
  <PageNavigation
    items={navigationConfigs.pageName}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

---

## Typography Scaling

### Responsive Size Guide

| Element         | Mobile    | Tablet         | Desktop       |
| --------------- | --------- | -------------- | ------------- |
| **Title**       | `text-lg` | `sm:text-2xl`  | `xl:text-5xl` |
| **Subtitle**    | `text-xs` | `sm:text-base` | `lg:text-xl`  |
| **Description** | `text-xs` | `sm:text-sm`   | `lg:text-lg`  |

### Full Responsive Classes

```tsx
// Title
className =
  "text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl";

// Subtitle
className = "text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl";

// Description
className = "text-xs sm:text-sm md:text-base lg:text-lg";
```

---

## Implementation Checklist

Use this checklist when creating or reviewing any page's hero section:

- [ ] Full viewport height (`h-screen flex items-center justify-center`)
- [ ] Background gradient with overlay
- [ ] Content wrapper with responsive padding
- [ ] Spacing container (`space-y-2` to `lg:space-y-6`)
- [ ] Title with proper responsive classes
- [ ] Title uses `text-brand-secondary` color
- [ ] Subtitle with proper responsive classes
- [ ] Description includes company tagline
- [ ] PageNavigation at `absolute bottom-0 left-0 right-0`
- [ ] **NO** veteran badges or decorative badges
- [ ] **NO** CTA buttons in hero
- [ ] **NO** stats cards or displays
- [ ] **NO** trust indicators
- [ ] **NO** quick contact buttons
- [ ] Overflow hidden (`overflow-hidden`)

---

## Examples by Page

### Home Page

```tsx
<h1>Commercial Construction Excellence</h1>
<p>Your trusted construction partner in Pasco, Kennewick, and Richland.</p>
<p>"Building for the Owner, NOT the Dollar" — Veteran-owned excellence...</p>
```

### Services Page

```tsx
<h1>Construction Excellence</h1>
<p>"Building for the Owner, NOT the Dollar"</p>
<p>We Work WITH You Every Step. Military Precision. Advanced Technology...</p>
```

### Projects Page

```tsx
<h1>Partnership Success Stories</h1>
<p>"Building for the Owner, NOT the Dollar"</p>
<p>Building Excellence Together Across the Pacific Northwest...</p>
```

---

## Why These Standards?

### Benefits

1. **Consistent User Experience**: Same structure on every page
2. **Faster Load Times**: Fewer elements = better performance
3. **Mobile Optimized**: Clean layout fits all screen sizes
4. **Navigation Visible**: Users see section links immediately
5. **Brand Recognition**: Predictable, professional appearance
6. **Easier Maintenance**: One standard to follow

### Before vs After

**BEFORE (Old Standard):**

- Veteran badges cluttering the hero
- Multiple CTA buttons competing for attention
- Stats cards taking up space
- Trust indicators creating visual noise
- Navigation buried or inconsistent

**AFTER (New Standard):**

- Clean, focused hero section
- Title, subtitle, description only
- Navigation consistently at bottom
- Professional, uncluttered appearance
- Better performance and UX

---

## Related Documentation

- [Typography Standards](./typography.md) - Full typography system
- [Component Standards](./component-standards.md) - All component guidelines
- [Branding Implementation Guide](../../development/branding/branding-implementation-guide.md) - Implementation details
- [MH Branding Index](../branding-index.md) - Hub for all brand documentation

---

## Questions or Issues?

If you need clarification on hero section standards:

1. Review the complete example in this document
2. Check existing page implementations (home, services, projects, etc.)
3. Refer to [Typography Standards](./typography.md#-hero-section-typography-standards)
4. Consult the implementation checklist above

---

**Last Updated:** November 4, 2025  
**Next Review:** As needed based on brand evolution
