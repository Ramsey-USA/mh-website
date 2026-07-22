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
- Hero backgrounds are the only page-level exemption from the MH logo paraplex background rule; heroes may continue using approved photo, video, or gradient treatments.

## Global Header Relationship

The hero section now operates with a unified global header system anchored in
`apps/website/src/components/navigation/SiteHeader.tsx`.

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

## Hero Messaging Contract (Current)

Hero copy must remain relationship-first, factual, and aligned with current
brand terminology.

Required alignment:

- Primary line stays: "Built on Quality, Backed by Trust."
- Route-specific supporting slogan is sourced from
  `apps/website/src/lib/content/hero-page-slogans.ts`.
- Home hero uses a dual-label command-center pattern:
  - "Home -> Command Center"
- Supporting lines must avoid unverifiable hard-claim inflation unless a source
  is already maintained in repository data.

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

1. **CTA Envelope Allowed**: Home baseline allows two hero CTAs (contact + project proof) rendered in the content card.
2. **No PageNavigation in Hero**: `PageNavigation` must never be placed inside a hero section. It belongs in the Page Heading immediately below the hero.
3. **Single Mission Icon Treatment**: Use one intentional icon container aligned with Home-style emphasis where icon treatment is used.

### ❌ MUST NOT INCLUDE

1. **NO Hero Clutter**: No decorative badge clusters, stat chips, or competing icon groups in the hero content area
2. **NO Conflicting CTA Clusters**: Do not add oversized CTA clusters that compete with hero hierarchy.
3. **NO Stats**: 30+ years, 100+ projects, satisfaction rate displays
4. **NO Trust Indicators**: Icons with project counts or ratings
5. **NO Contact Buttons**: Quick contact or phone buttons inside the hero; use the global header phone CTA instead
6. **NO Unscoped Additions**: Keep hero additions constrained to approved content card patterns.

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

  {/* Optional page navigation when route requires continuity nav — place in Page Heading BELOW hero, not here */}
</section>;

{
  /* Page Heading — navigation bar lives here, not in the hero */
}
<PageNavigation className="w-full" />;
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
- [ ] Home hero supports two CTA actions (primary + secondary)
- [ ] `PageNavigation` is placed in the Page Heading below the hero, **not** inside the hero section
- [ ] Breadcrumb appears after hero (never above hero)
- [ ] If semiquincentennial banner exists, breadcrumb appears before banner
- [ ] All navigable sections have unique `id` attributes
- [ ] **NO** decorative badge clusters or competing icon groups in hero
- [ ] **NO** oversized or conflicting CTA clusters in hero
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
  {/* No PageNavigation here — it lives in the Page Heading below */}
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
