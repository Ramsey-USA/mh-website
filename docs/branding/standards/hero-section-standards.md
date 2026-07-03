# MH Construction Hero Section Standards

**Category:** Branding - Standards  
**Last Updated:** June 20, 2026  
**Version:** 7.2.0  
**Status:** ✅ Active

> **Canonical Reference:** For exact brand values, see [Brand Constants](../brand-constants.md).

**Brand Congruency:** Hero layouts and taglines must stay aligned with approved MH terminology, trust content, accessibility, and SEO naming.

---

## Quick Reference

This document defines the official MH Construction hero section standard implemented
across all website pages, with veteran-focused messaging, military operations terminology,
and visual-first design philosophy.

**Canonical Baseline Source:** `apps/website/src/components/home/HeroSection.tsx`

If this document conflicts with implemented Home Hero behavior, the Home Hero source
is the tie-breaker until this document is updated.

## Hero Presence Requirement

All website pages must include a hero section.

- A page is non-compliant if it omits a hero entirely.
- Preferred implementation is a root `hero-section` that follows Home baseline posture.
- Shared hero wrappers are allowed only when they preserve Home baseline typography,
  spacing envelope, icon strategy, and bottom-navigation framing behavior.
- Any missing hero page is a release-blocking FAIL for hero congruency checks.

## Global Header Relationship

The hero section now operates with a unified global header system anchored in
`apps/website/src/components/layout/Navigation.tsx`.

- Contact actions belong in the global header, not inside the hero content area.
- The global header owns the MH logo, language toggle, phone CTA, compact theme toggle,
  and hamburger menu.
- On phone screens, the MH logo must remain the dominant header element even when
  the phone CTA text stays visible.
- Hero spacing must continue to clear the fixed visual envelope created by the
  global header above and the page navigation bar below.

## Breadcrumb Placement Standard (Sitewide)

Breadcrumbs are part of the post-hero content frame, not pre-hero chrome.

- Render breadcrumbs immediately **after** the hero section.
- When the semiquincentennial campaign banner is enabled, breadcrumb order is:
  hero -> breadcrumb -> semiquincentennial banner -> body sections.
- On routes where the semiquincentennial banner is intentionally suppressed
  (`/events`, `/cool-desert-nights`), breadcrumbs still render directly after hero.
- Do not render fallback breadcrumbs before hero content in shell/layout wrappers.

## 🎯 Tagline Strategy Update (December 14, 2025)

### Military/Construction Terminology Integration

Each hero section now features a **unique, page-specific tagline WITH military-construction
terminology blend** (December 2025 major update). This strategy:

- **Honors All Service Branches** - Army, Navy, Air Force, Marines, Coast Guard, Space Force
- **Blends Military Operations Terminology** - Mission brief, SITREP, recon, deployment, tactical operations
- **Maintains Construction Expertise** - Technical capability, project delivery, quality craftsmanship
- **Reduces Generic Repetition** - Avoids overuse of single phrases
- **Reinforces Mission-First Philosophy** - "Built on Quality, Backed by Trust."
- **Improves Message Retention** - Variety helps visitors remember key messages
- **Appeals to Veteran Clients** - Military-affiliated clients recognize authentic service language

### Implementation Guidelines (Updated December 2025)

**DO:**

- **Include dual naming format** - "Military Designation → Civilian Label" at top of each hero
- Blend military operations terminology with construction expertise naturally
- Honor all service branches (not just Army)
- Reflect the specific page's purpose with tactical clarity
- Keep taglines concise (5-12 words typically)
- Align with values-driven brand values (honesty, integrity, professionalism, thoroughness)
- Maintain core mission: "Built on Quality, Backed by Trust."
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
military-construction terminology and values-driven values.

**Dual Naming Format:** Each page includes "Military Designation → Civilian Label" for veteran
recognition and accessibility.

| Page           | Dual Naming                 | Military/Construction Blend Tagline                                       | Mantra                                                                                                                                                                                  |
| -------------- | --------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage       | Base HQ → Home              | "Mission-Focused Execution \| Built on Quality, Backed by Trust."         | Your Tri-State Construction Command Center                                                                                                                                              |
| About          | Our Oath → About Us         | "Battle-Tested Excellence Through Service-Earned Experience"              | Service-Earned Values, Construction Excellence                                                                                                                                          |
| Services       | Operations → Services       | "Your Construction Mission Deserves Veteran-Led Expert Oversight"         | The Battle Plan - Strategic Construction Excellence                                                                                                                                     |
| Projects       | Missions → Projects         | "650+ Construction Missions Completed - Proven Results"                   | Mission Success: 650+ Projects, Countless Relationships                                                                                                                                 |
| Team           | Chain of Command → Our Team | "All-Branch Veteran Leadership You Can Trust"                             | 150+ Years Combined Military-Grade Expertise at Your Service                                                                                                                            |
| Careers        | Enlist → Careers            | "Join the Mission - Your Construction Career Starts Here"                 | Build More Than Projects - Build Your Future                                                                                                                                            |
| Contact        | Rally Point → Contact       | "Schedule Your Free Mission Brief - Start With SITREP-Level Clarity"      | Your Project. Our Expertise. Let's Connect.                                                                                                                                             |
| Government     | Public Sector → Government  | "Mission-Ready Construction Operations - Federal Compliance-Driven"       | Veteran-Owned Excellence for Government Construction Missions                                                                                                                           |
| Trade Partners | Allies → Partners           | "Vetted Vendor Partnerships - Building Success Through Trusted Alliances" | Strategic Partnerships Built on Trust, Performance, and Mutual Success                                                                                                                  |
| Veterans       | Service First → Veterans    | "Honoring Those Who Served - All Branches, All Values"                    | Supporting Those Who Served - One Community, One Mission (Updated Dec 2025: Comprehensive foundation with combat veteran discount, year-round support programs, strategic partnerships) |
| Testimonials   | Commendations → Reviews     | "After-Action Reports from Real Client Missions"                          | Verified Success Stories from Completed Missions                                                                                                                                        |
| FAQ            | Intel Brief → FAQ           | "Mission Intelligence - Your Construction Questions Answered"             | Direct Answers. Clear Guidance. Mission-Ready Information.                                                                                                                              |
| Safety         | Safety HQ → Safety Program  | "Zero-Incident Operations \| Mission-Critical Safety Culture"             | Award-Winning Safety: 0.64 EMR, Zero Compromises                                                                                                                                        |

---

## 🚨 Critical Rules

### ✅ MUST INCLUDE

1. **Hero Presence on Every Page**: Every website page includes a hero section.
2. **Home-Class Hero Root Posture**: `hero-section relative flex items-end justify-end text-white overflow-hidden`
3. **Visual-First Design**: Text positioned bottom-right to allow photos/videos to be focal point
4. **Multi-line Format**: Vertical text arrangement with separators for emphasis
5. **Veteran Messaging**: Emphasize veteran-owned, honest communication, proven craftsmanship
6. **Header/Nav Framing Envelope**: Hero content wrapper preserves spacing that clears header above and nav below:

- `mb-32 sm:mb-36 md:mb-40 lg:mb-44`
- `mr-4 sm:mr-6 lg:mr-8 xl:mr-12`
- `ml-auto max-w-2xl pointer-events-none pb-2`

1. **PageNavigation at Bottom**: Keep navigation pinned to `absolute bottom-0 left-0 right-0`.
2. **Six-Cell Home Nav Pattern**: Home hero navigation row must render six equal cells (Home, Services, Projects, About, Contact, More).
3. **More Overlay Pattern**: `More` opens a full-screen overlay (backdrop + centered panel), not an inline dropdown.
4. **Single Mission Icon Treatment**: Use one intentional icon container aligned with Home-style emphasis.

### ❌ MUST NOT INCLUDE

1. **NO Hero Clutter**: No decorative badge clusters, stat chips, or competing icon groups in the hero content area
2. **NO CTA Buttons**: Schedule Consultation, Get Estimate, Contact buttons
3. **NO Stats**: 30+ years, 100+ projects, satisfaction rate displays
4. **NO Trust Indicators**: Icons with project counts or ratings
5. **NO Contact Buttons**: Quick contact or phone buttons inside the hero; use the global header phone CTA instead
6. **NO Additional Elements**: Keep it clean - title, subtitle, description only

---

## Standard Implementation

### Complete Hero Section Template (Bottom-Right Text Positioning)

**Design Philosophy**: Text in bottom-right allows background photos/videos to be the primary
visual element. This creates a more impactful first impression where imagery speaks first.

```tsx
<section className="hero-section relative flex items-end justify-end text-white overflow-hidden">
  {/* Background - Photo or Video Focal Point */}
  <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900">
    {/* Add background image or video here */}
    {/* <img src="/path/to/image.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" /> */}
    {/* <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" /> */}

    {/* Overlay for text readability */}
    <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80"></div>
  </div>

  {/* Header Text - Bottom Right (Allows visual to dominate) */}
  <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
    {/* Mission Icon - Single container only */}
    <div className="flex justify-end mb-4">
      <div className="relative p-4 bg-linear-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
        <AmericanFlag size="4xl" animated={true} />
      </div>
    </div>

    <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
      {/* DUAL NAMING - Military → Civilian (Required) */}
      <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
        Base HQ → Home
      </span>
      {/* PAGE-SPECIFIC MANTRA */}
      <span className="block text-brand-secondary">
        Your Tri-State Construction Command Center
      </span>
      <span className="block text-brand-primary">
        Mission-Focused Execution
      </span>
      <span className="block text-white/90">
        Built on Quality, Backed by Trust.
      </span>
      <span className="block text-brand-secondary/90 text-xs xs:text-sm sm:text-base mt-2">
        Serving Pasco, Kennewick, Richland, and the Pacific Northwest
      </span>
    </h1>
  </div>

  {/* Page-Specific Navigation Bar - ALWAYS AT BOTTOM */}
  <PageNavigation
    items={navigationConfigs.home}
    showRemainingPagesOverlay
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

---

## Typography Scaling (Bottom-Right Text)

### Responsive Size Guide

| Element           | Mobile    | Tablet        | Desktop       |
| ----------------- | --------- | ------------- | ------------- |
| **Multi-line H1** | `text-lg` | `sm:text-2xl` | `xl:text-5xl` |

### Full Responsive Classes (Right-Aligned)

```tsx
// Multi-line heading with vertical format
className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight"

// Individual lines with different accent colors
<span className="block text-brand-secondary">Line 1</span>
<span className="block text-brand-primary">Line 2</span>
```

---

## Implementation Checklist

Use this checklist when creating or reviewing any page's hero section:

- [ ] Every website page in scope includes a hero section (missing hero is automatic FAIL)
- [ ] Hero root posture matches Home baseline (`hero-section relative flex items-end justify-end text-white overflow-hidden`)
- [ ] Background gradient with overlay
- [ ] Content wrapper uses Home spacing envelope (`mb-32 sm:mb-36 md:mb-40 lg:mb-44`, `mr-4 sm:mr-6 lg:mr-8 xl:mr-12`, `ml-auto max-w-2xl pointer-events-none pb-2`)
- [ ] Single mission icon container above H1 (Home-style glass/outline treatment)
- [ ] **Dual naming format at top** (e.g., "Base HQ → Home")
- [ ] **Page-specific mantra** included for SEO and engagement
- [ ] Title with Home-parity responsive classes (`text-lg` through `xl:text-5xl`, `font-black`, right-aligned)
- [ ] Title uses `text-brand-secondary` color
- [ ] Subtitle with proper responsive classes
- [ ] Description includes company tagline
- [ ] PageNavigation at `absolute bottom-0 left-0 right-0`
- [ ] Breadcrumb appears after hero (never above hero)
- [ ] If semiquincentennial banner exists, breadcrumb appears before banner
- [ ] Home nav row renders six equal cells including `More`
- [ ] `More` opens centered modal overlay with backdrop, Escape close, and body scroll lock
- [ ] All navigable sections have unique `id` attributes
- [ ] **NO** decorative badge clusters or competing icon groups in hero
- [ ] **NO** CTA buttons in hero
- [ ] **NO** stats cards or displays
- [ ] **NO** trust indicators
- [ ] **NO** quick contact buttons
- [ ] Overflow hidden (`overflow-hidden`)

---

## Examples by Page

### Home Page (Canonical)

```tsx
<section className="hero-section relative flex items-end justify-end text-white overflow-hidden">
  {/* baseline spacing and single mission icon */}
  <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
    <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
      ...
    </h1>
  </div>
  <PageNavigation
    showRemainingPagesOverlay
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

### Services Hub Section (Parity Target)

```tsx
<h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black ...">
  ...
</h1>
```

### Projects Page (Parity Target)

```tsx
<h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black ...">
  ...
</h1>
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
