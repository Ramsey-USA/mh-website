# MH Construction Hero Section Standards

**Category:** Brand Standards - Hero Sections  
**Last Updated:** December 14, 2025  
**Version:** 6.0.0  
**Status:** ✅ Official Standard  
**Methodology:** Military/Construction Terminology Blend

---

## Quick Reference

This document defines the official MH Construction hero section standard implemented
across all website pages, with veteran-focused messaging, military operations terminology,
and visual-first design philosophy.

## 🎯 Tagline Strategy Update (December 14, 2025)

### Military/Construction Terminology Integration

Each hero section now features a **unique, page-specific tagline WITH military-construction
terminology blend** (December 2025 major update). This strategy:

- **Honors All Service Branches** - Army, Navy, Air Force, Marines, Coast Guard, Space Force
- **Blends Military Operations Terminology** - Mission brief, SITREP, recon, deployment, tactical operations
- **Maintains Construction Expertise** - Technical capability, project delivery, quality craftsmanship
- **Reduces Generic Repetition** - Avoids overuse of single phrases
- **Reinforces Mission-First Philosophy** - "Building projects for the client, NOT the dollar"
- **Improves Message Retention** - Variety helps visitors remember key messages
- **Appeals to Veteran Clients** - Military-affiliated clients recognize authentic service language

### Implementation Guidelines (Updated December 2025)

**DO:**

- **Include dual naming format** - "Military Designation → Civilian Label" at top of each hero
- Blend military operations terminology with construction expertise naturally
- Honor all service branches (not just Army)
- Reflect the specific page's purpose with tactical clarity
- Keep taglines concise (5-12 words typically)
- Align with service-earned brand values (honesty, integrity, professionalism, thoroughness)
- Maintain core mission: "Building projects for the client, NOT the dollar"
- **Include unique page-specific mantra** for enhanced messaging and SEO

**DON'T:**

- Over-militarize at expense of construction expertise
- Favor one service branch over others
- Use military jargon without construction context
- Create generic taglines that could apply to any page
- Deviate from mission-first brand tone
- **Omit dual naming from hero sections** - it's now a required component

### Current Page-Specific Taglines (December 2025)

**Strategic Focus:** Award-winning website that attracts professional veterans through authentic
military-construction terminology and service-earned values.

**Dual Naming Format:** Each page includes "Military Designation → Civilian Label" for veteran
recognition and accessibility.

| Page           | Dual Naming                 | Military/Construction Blend Tagline                                             | Mantra                                                                                                                                                                                  |
| -------------- | --------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage       | Base HQ → Home              | "Mission-Focused Execution \| Building Projects for the Client, NOT the Dollar" | Your Tri-Cities Construction Command Center                                                                                                                                             |
| About          | Our Oath → About Us         | "Battle-Tested Excellence Through Service-Earned Experience"                    | Service-Earned Values, Construction Excellence                                                                                                                                          |
| Services       | Operations → Services       | "Your Construction Mission Deserves Veteran-Led Expert Oversight"               | The Battle Plan - Strategic Construction Excellence                                                                                                                                     |
| Projects       | Missions → Projects         | "650+ Construction Missions Completed - Proven Results"                         | Mission Success: 650+ Projects, Countless Relationships                                                                                                                                 |
| Team           | Chain of Command → Our Team | "All-Branch Veteran Leadership You Can Trust"                                   | 150+ Years Combined Military-Grade Expertise at Your Service                                                                                                                            |
| Careers        | Enlist → Careers            | "Join the Mission - Your Construction Career Starts Here"                       | Build More Than Projects - Build Your Future                                                                                                                                            |
| Contact        | Rally Point → Contact       | "Schedule Your Free Mission Brief - Start With SITREP-Level Clarity"            | Your Project. Our Expertise. Let's Connect.                                                                                                                                             |
| Government     | Public Sector → Government  | "Mission-Ready Construction Operations - Federal Compliance-Driven"             | Veteran-Owned Excellence for Government Construction Missions                                                                                                                           |
| Trade Partners | Allies → Partners           | "Vetted Vendor Partnerships - Building Success Through Trusted Alliances"       | Strategic Partnerships Built on Trust, Performance, and Mutual Success                                                                                                                  |
| Veterans       | Service First → Veterans    | "Honoring Those Who Served - All Branches, All Values"                          | Supporting Those Who Served - One Community, One Mission (Updated Dec 2025: Comprehensive foundation with combat veteran discount, year-round support programs, strategic partnerships) |
| Testimonials   | Commendations → Reviews     | "After-Action Reports from Real Client Missions"                                | Verified Success Stories from Completed Missions                                                                                                                                        |
| FAQ            | Intel Brief → FAQ           | "Mission Intelligence - Your Construction Questions Answered"                   | Direct Answers. Clear Guidance. Mission-Ready Information.                                                                                                                              |
| Safety         | Safety HQ → Safety Program  | "Zero-Incident Operations \| Mission-Critical Safety Culture"                   | Award-Winning Safety: 0.64 EMR, Zero Compromises                                                                                                                                        |

---

## 🚨 Critical Rules

### ✅ MUST INCLUDE

1. **Full Viewport Height**: `h-screen flex items-end justify-end` (bottom-right positioning)
2. **Visual-First Design**: Text positioned bottom-right to allow photos/videos to be focal point
3. **Multi-line Format**: Vertical text arrangement with separators for emphasis
4. **Veteran Messaging**: Emphasize veteran-owned, honest communication, proven craftsmanship
5. **PageNavigation at Bottom**: Section-based navigation using `#section-id` anchors (Dec 2025 standard)

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
      {/* DUAL NAMING - Military → Civilian (Required) */}
      <span className="block text-brand-secondary/80 text-sm sm:text-base md:text-lg lg:text-xl font-normal mb-2">
        Base HQ → Home
      </span>
      {/* PAGE-SPECIFIC MANTRA */}
      <span className="block text-brand-secondary text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4">
        Your Tri-Cities Construction Command Center
      </span>
      {/* TAGLINE WITH SEPARATORS */}
      <span className="block text-brand-secondary">
        Veteran-Owned Excellence
      </span>
      <span className="block">|</span>
      <span className="block text-white/95">Mission-Focused Execution</span>
      <span className="block">|</span>
      <span className="block text-brand-primary">Proven Craftsmanship</span>
      <span className="block">|</span>
      <span className="block text-white/90">
        Building Projects for the Client, NOT the Dollar
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
- [ ] **Dual naming format at top** (e.g., "Base HQ → Home")
- [ ] **Page-specific mantra** included for SEO and engagement
- [ ] Title with proper responsive classes
- [ ] Title uses `text-brand-secondary` color
- [ ] Subtitle with proper responsive classes
- [ ] Description includes company tagline
- [ ] PageNavigation at `absolute bottom-0 left-0 right-0` with section anchors only
- [ ] Navigation config uses `#section-id` format (no cross-page links)
- [ ] All navigable sections have unique `id` attributes
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

- [Unified Component Standards](./unified-component-standards.md) - Complete design system (typography, components)
- [MH Branding](../) - Hub for all brand documentation

---

## Questions or Issues?

If you need clarification on hero section standards:

1. Review the complete example in this document
2. Check existing page implementations (home, services, projects, etc.)
3. Refer to [Unified Component Standards](./unified-component-standards.md#-typography-system)
4. Consult the implementation checklist above

---

**Last Updated:** December 14, 2025  
**Next Review:** As needed based on brand evolution
