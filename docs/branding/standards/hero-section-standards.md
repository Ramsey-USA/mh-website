# MH Construction Hero Section Standards

**Version:** 5.0.0
**Date:** December 13, 2025
**Status:** ✅ Official Standard
**Category:** Brand Standards - Hero Sections

**⭐ UPDATE (Dec 2025)**: Hero sections use **bottom-right text positioning** to allow photos/videos
to be the primary visual focal point. Text complements imagery rather than competing with it.

---

## Quick Reference

This document defines the official MH Construction hero section standard implemented
across all website pages, with veteran-focused messaging and visual-first design philosophy.

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

| Page           | Unique Tagline                                                             | Purpose                    |
| -------------- | -------------------------------------------------------------------------- | -------------------------- |
| Homepage       | "Veteran-Owned Excellence \| Honest Communication \| Proven Craftsmanship" | Veteran values emphasis    |
| About          | "Excellence Through Experience"                                            | Veteran values + quality   |
| Services       | "Your project deserves expert oversight"                                   | Service quality focus      |
| Projects       | "Proven Results, Trusted Partnerships"                                     | Track record emphasis      |
| Team           | "Experience You Can Trust"                                                 | Team expertise focus       |
| Careers        | "Your Future Starts Here"                                                  | Career growth focus        |
| Booking        | "Start Your Project With Confidence"                                       | Consultation confidence    |
| Urgent         | "When Time Is Critical, We Respond"                                        | Rapid response emphasis    |
| Government     | "Mission-Ready, Compliance-Driven"                                         | Federal expertise focus    |
| Trade Partners | "Building Success Together"                                                | B2B partnership focus      |
| Estimator      | "Smart Planning Starts Here"                                               | Automated estimation focus |
| 3D Explorer    | "Innovation Meets Construction Excellence"                                 | Technology focus           |
| Veterans       | "Honoring Those Who Served"                                                | Veteran support            |

**Note:** "THE ROI IS THE RELATIONSHIP" remains important in body content,
testimonials, and value propositions—just not repeated in every hero section.

---

## 🚨 Critical Rules

### ✅ MUST INCLUDE

1. **Full Viewport Height**: `h-screen flex items-end justify-end` (bottom-right positioning)
2. **Visual-First Design**: Text positioned bottom-right to allow photos/videos to be focal point
3. **Multi-line Format**: Vertical text arrangement with separators for emphasis
4. **Veteran Messaging**: Emphasize veteran-owned, honest communication, proven craftsmanship
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

### Complete Hero Section Template (Bottom-Right Text Positioning)

**Design Philosophy**: Text in bottom-right allows background photos/videos to be the primary
visual element. This creates a more impactful first impression where imagery speaks first.

```tsx
<section className="relative h-screen flex items-end justify-end text-white overflow-hidden">
  {/* Background - Photo or Video Focal Point */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900">
    {/* Add background image or video here */}
    {/* <img src="/path/to/image.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" /> */}
    {/* <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" /> */}

    {/* Overlay for text readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
  </div>

  {/* Header Text - Bottom Right (Allows visual to dominate) */}
  <div className="relative z-30 mb-20 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
    <h1 className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed">
      <span className="block text-brand-secondary">
        Veteran-Owned Excellence
      </span>
      <span className="block">|</span>
      <span className="block text-white/95">Honest Communication</span>
      <span className="block">|</span>
      <span className="block text-brand-primary">Proven Craftsmanship</span>
      <span className="block">|</span>
      <span className="block text-white/90">
        Building Trust, Not Just Structures
      </span>
    </h1>
  </div>

  {/* Page-Specific Navigation Bar - ALWAYS AT BOTTOM */}
  <PageNavigation
    items={navigationConfigs.home}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

---

## Typography Scaling (Bottom-Right Text)

### Responsive Size Guide

| Element           | Mobile      | Tablet       | Desktop       |
| ----------------- | ----------- | ------------ | ------------- |
| **Multi-line H1** | `text-base` | `sm:text-xl` | `xl:text-4xl` |

### Full Responsive Classes (Right-Aligned)

```tsx
// Multi-line heading with vertical format
className="text-right text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-2xl leading-relaxed"

// Individual lines with different accent colors
<span className="block text-brand-secondary">Line 1</span>
<span className="block">|</span>  // Separator
<span className="block text-white/95">Line 2</span>
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
<p>"Building projects for the client, NOT the dollar" — Veteran-owned excellence...</p>
```

### Services Page

```tsx
<h1>Construction Excellence</h1>
<p>"Building projects for the client, NOT the dollar"</p>
<p>We Work WITH You Every Step. Military Precision. Advanced Technology...</p>
```

### Projects Page

```tsx
<h1>Partnership Success Stories</h1>
<p>"Building projects for the client, NOT the dollar"</p>
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
