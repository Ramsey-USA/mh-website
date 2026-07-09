# MH Construction Unified Component & Typography Standards

**Category:** Branding - Standards  
**Version:** 7.2.0  
**Last Updated:** July 3, 2026  
**Status:** ✅ Official Standard - Consolidated Documentation  
**Previous Versions:** Replaces typography.md v5.0.0 and component-standards.md v6.0.0

> **Canonical Reference:** For exact brand values, see [Brand Constants](../brand-constants.md).

**Brand Congruency:** Component, typography, and layout decisions must remain aligned with approved MH voice, trust content, accessibility, and naming standards.

Color usage inside components must continue to pull from the approved MH color system so typography and palette stay visually congruent.

> **Purpose:** Single source of truth for all component design, typography, and branding standards.
> This consolidates previous separate documents to eliminate conflicts and provide clear guidance.

---

## 📋 **Document History**

### **Version 7.0.0 (December 28, 2025)** - CONSOLIDATION

- **MERGED:** Typography standards and component standards into single document
- **RESOLVED:** Gradient text policy conflict (gradient text IS approved for section headers)
- **RESOLVED:** Hero section requirements conflict by separating hero messaging from header-owned contact CTAs
- **CLARIFIED:** Emergency and government color schemes are contextual additions, not replacements
- **UNIFIED:** All spacing, sizing, and responsive standards in one place
- **DEPRECATED:** Separate typography.md and component-standards.md files

**Migration Note:** This document supersedes all previous typography and component standards.
The gradient text in section headers, as implemented across all pages, is the correct current standard.

---

## 🎨 **Core Brand Principles**

### Official MH Brand Colors

**Primary (Hunter Green):** `#386851` - Trust, integrity, primary actions, safety

- Use for: Main CTAs, trust signals, checkmarks, safety indicators
- Contrast: 6.43:1 on white (WCAG AA compliant for all text sizes)

**Secondary (Leather Tan):** `#BD9264` - Partnerships, warmth, veteran heritage

- Use for: Large text (18pt+), backgrounds, decorative elements
- Contrast: 2.82:1 on white (WCAG AA compliant for large text only)

**Secondary Text (Accessible Tan):** `#8A6B49` - Normal text variant

- Use for: Body text, buttons with white text, normal-sized text
- Contrast: 4.71:1 on white (WCAG AA compliant for all text sizes)

**Architectural Bronze (Accent):** `#A87948` - CTA borders, Featured Project labels

- Use for: Outline CTA borders, Featured Project badges, premium UI accents
- Contrast (Dark `#6B4E2E`): 7.32:1 on white (WCAG AAA compliant)

### Contextual Color Schemes

**Government/Public Sector (Grayscale):** Used ONLY on `/public-sector` page

- Grayscale Primary: `slate-600` (#475569)
- Grayscale Accent: `gray-700` (#374151)
- Professional Balance: Always include veteran credentials (green/bronze)

**Key Rule:** Emergency and government schemes are additions for specific contexts, not replacements for core brand colors.

### Material Icons Only

- **STRICT POLICY:** NO EMOJIS in source code (.tsx, .jsx, .ts, .js files)
- **Approved:** Material Icons exclusively
- **Permitted:** Emojis only in Markdown documentation files (.md)
- **Standard Sizes:** `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`

### Global Brand Non-Negotiables (NEW - Apr 19, 2026)

#### 1) Military-Themed Sections Are Required Site-Wide

- All major pages must use military-themed section framing through the dual-label pattern.
- Use clear primary labels for accessibility, plus military-themed secondary labels for brand identity.
- Applies to section navigation, major section headers, and footer navigation group labels.
- New or refactored pages without military-themed section framing are non-compliant unless explicitly exempted in a documented audit.

#### 2) Accreditation Presence Is Required

- Every production page must render the global footer accreditation row.
- Accreditation row must include official partner/credential logos (for example: AGC, BBB, insurance, chamber memberships, and WA VOB) with valid outbound destinations.
- Do not remove or hide accreditations in redesigns, experiments, or A/B variants without stakeholder approval.
- Accreditation visibility is a trust requirement and part of brand consistency.
- **WA Veteran Owned Business badge:** Use the `WaVobBadge` component (`src/components/ui/WaVobBadge.tsx`) in every accreditation/affiliations section. Its red-to-blue gradient border is an **approved color exception** for Veteran Owned certification materials. See [Color System §Veteran Owned Badge Exception](./color-system.md#veteran-owned-badge-exception).

#### 3) Unified Header Hierarchy Is Required

- The global header must remain logo-first, with the MH logo visually dominant over
  adjacent controls on mobile and desktop.
- The header control set is: logo, language toggle, phone CTA, compact theme toggle,
  and hamburger menu.
- Contact actions should be consolidated into the global header phone CTA rather than
  duplicated inside hero content areas.
- Tooltip copy and bilingual control labels are part of the global header system and should
  not be removed during refinements unless replaced by an approved accessible equivalent.

#### 4) Breadcrumb Ordering Is Required

- Breadcrumbs must render in the post-hero flow, not above hero sections.
- Required order for shell-managed fallback breadcrumbs:
  hero -> breadcrumb -> semiquincentennial banner -> main body content.
- On routes where the semiquincentennial banner is intentionally suppressed,
  breadcrumbs still render directly after hero.
- Any layout update that reintroduces pre-hero fallback breadcrumbs is non-compliant.

---

## 📝 **Typography System**

### MH Brand Typefaces

Web brand fonts use a self-hosted Mendl Sans Dusk model for both heading/display and body/running text, loaded from `/public/fonts/Mendl Fonts/`.

**Heading / Subheading Font — Mendl Sans Dusk:**

```css
font-family: "mendl-sans-dusk", "Mendl Sans Dusk", Roboto, sans-serif;
```

- Display sans-serif — strong brand identity at large sizes
- Used for: H1–H6 headings, subheadings, section titles, badges, tab labels
- Tailwind utility: `font-heading`
- CSS variable: `--font-heading`
- Semantic `<h1>`–`<h6>` elements receive this face automatically via global CSS in `src/app/globals.css`

**MH Header Utilities (required for branded display styling):**

- `.mh-heading-display` - primary display heading treatment with tighter tracking, stronger weight, and capital-spacing features.
- `.mh-heading-display-tight` - optional tighter variant for short single-line hero headings.
- `.mh-subheading-display` - uppercase subheader treatment with expanded tracking and Mendl-like rhythm.

```tsx
<h2 className="mh-heading-display text-4xl md:text-6xl">NORTHWEST SAFETY LEADERSHIP</h2>
<p className="mh-subheading-display text-sm md:text-base">CERTIFIED FIELD OPERATIONS</p>
```

These utilities enable OpenType capital spacing and stylistic sets where available, helping distinctive capitals (including the "N") read more like the Mendl display personality.

**Body Font — Mendl Sans Dusk:**

```css
font-family: "mendl-sans-dusk", "Mendl Sans Dusk", Roboto, sans-serif;
```

- Clean grotesk/humanist sans-serif — high legibility at small and medium sizes
- Used for: Body copy, paragraphs, captions, form labels, navigation items
- Tailwind utility: `font-sans` / `font-body`
- CSS variable: `--font-body`

**Font Delivery (web):** Mendl Sans Dusk is self-hosted from `/public/fonts/Mendl Fonts/` and bound through global `@font-face` rules. The print/PDF pipeline uses the same family via `documents/scripts/generate.mjs` and shared tokens in `documents/styles/brand.css`.

### Font Weights

- **Light (300):** Subtle headings, decorative text, section descriptions
- **Regular (400):** Body text, default weight
- **Medium (500):** Emphasized text, subheadings, button text
- **Semi-Bold (600):** Strong emphasis, H2-H3 headings
- **Bold (700):** H1 headings, card titles, call-to-action text
- **Black (900):** Hero titles, maximum impact headlines

### Responsive Typography Scale

#### H1 - Hero Section Headlines (Photo/Video Backgrounds)

**Mobile-First Responsive Scaling:**

- Base: `text-lg` (18px)
- xs: `text-xl` (20px)
- sm: `text-2xl` (24px)
- md: `text-3xl` (30px)
- lg: `text-4xl` (36px)
- xl: `text-5xl` (48px)

**Usage:** Hero page titles with photo/video backgrounds
**Weight:** Black (900)
**Color:** `text-brand-secondary` (Leather Tan) for hero impact
**Line Height:** Tight (`leading-tight`)

```tsx
<h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
  <span className="block text-brand-secondary font-black drop-shadow-lg">
    Page Title Content
  </span>
</h1>
```

#### H2 - Section Headers (Two-Line Gradient Pattern)

**OFFICIAL STANDARD:** Section headers use gradient text for visual impact.

**Mobile-First Responsive Scaling:**

- Base: `text-3xl` (30px)
- xs: `text-4xl` (36px)
- sm: `text-5xl` (48px)
- md: `text-6xl` (60px)
- lg: `text-7xl` (72px)

**Usage:** Major section headings throughout the site
**Weight:** Black (900) for main title, Semi-Bold (600) for subtitle
**Pattern:** Two lines - subtitle (solid color) + main title (gradient)

**Critical Implementation Details:**

```tsx
{
  /* Container - MUST include overflow-visible */
}
<h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
  {/* First Line - Subtitle - Solid Color */}
  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
    Subtitle Text
  </span>

  {/* Second Line - Main Title - Gradient */}
  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
    Main Title Text
  </span>
</h2>;
```

**Why `overflow-visible` is Critical:**

- **Without it:** Gradient text gets clipped at edges on larger screens
- **Container:** Add to parent `<h2>` element
- **Both spans:** Add to both subtitle and gradient spans
- **Result:** Ensures gradient renders completely without clipping

**Padding Details:**

- **Subtitle:** `py-1` - Minimal padding for tight spacing
- **Main Title:** `py-2 pb-3` - Top padding for breathing room, extra bottom for gradient visibility

**Line Height Differences:**

- **Container:** `leading-relaxed` - Base comfortable spacing
- **Main Title:** `leading-normal` - Override to tighter spacing for gradient impact

#### H3 - Subsection Headers

**Mobile-First Responsive Scaling:**

- Base: `text-lg` (18px)
- sm: `text-xl` (20px)
- md: `text-2xl` (24px)
- lg: `text-3xl` (30px)
- xl: `text-4xl` (36px)

**Weight:** Semi-Bold (600)
**Usage:** Subsection headings, important content blocks

```tsx
<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold leading-snug text-gray-900 dark:text-gray-100">
  Subsection Title
</h3>
```

#### H4 - Card Titles

**Mobile-First Responsive Scaling:**

- Base: `text-lg` (18px)
- sm: `text-xl` (20px)
- md: `text-2xl` (24px)

**Weight:** Bold (700) or Semi-Bold (600)
**Usage:** Card titles, minor headings, component headers

```tsx
<h4 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug text-gray-900 dark:text-gray-100">
  Card Title
</h4>
```

### Body Text Styles

#### Body Large (Section Introductions)

**Mobile-First Responsive Scaling:**

- Base: `text-lg` (18px)
- md: `text-xl` (20px)
- lg: `text-2xl` (24px)

**Weight:** Light (300)
**Usage:** Section introduction paragraphs, important body text

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
  Section introduction text
</p>
```

#### Body Default (Cards, Lists, Paragraphs)

**Mobile-First Responsive Scaling:**

- Base: `text-sm` (14px)
- sm: `text-base` (16px)
- md: `text-lg` (18px)

**Weight:** Regular (400)
**Usage:** Card descriptions, list items, standard paragraph content

```tsx
<p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
  Standard body content
</p>
```

#### Body Small (Fine Print, Secondary Content)

**Mobile-First Responsive Scaling:**

- Base: `text-xs` (12px)
- sm: `text-sm` (14px)
- md: `text-base` (16px)

**Weight:** Regular (400)
**Usage:** Supporting text, metadata, flip card back content

```tsx
<span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
  Secondary content
</span>
```

### Heading Best Practices

- Use semantic heading order (H1 → H2 → H3)
- Don't skip heading levels
- Only one H1 per page
- Maximum lengths: H1 (60 chars), H2 (50 chars), H3 (40 chars)

## Heading and Typography Visual Contract (Canonical)

This section is the canonical visual contract for hero headings, section headers,
subheaders, and card-title typography across the website.

### Contract Rules

1. Use semantic hierarchy in order: one H1 per page, then H2, H3, H4 as needed.
1. Use approved heading roles and scales from this file: H1 hero headline scale, H2 two-line section header pattern (subtitle + gradient main title), H3 subsection heading scale, H4 card-title heading scale.
1. Section header gradient pattern must preserve `overflow-visible` on container and both spans.
1. Heading weights must stay role-aligned: H1/H2 main title `font-black`, subtitle `font-semibold`, H3 `font-semibold`, H4 `font-bold`.
1. Keep typography token alignment with `font-heading`/`font-body` and approved responsive classes.
1. Do not introduce alternate ad-hoc heading styles that bypass this contract.

### Canonical References

- [Page Compliance Checklist](../../development/standards/page-compliance-checklist.md)
- [Homepage Documentation](../../technical/homepage.md)
- [Design System Standards](../../development/standards/design-system-standards.md)

## Container and Modal Visual Contract (Canonical)

This section is the canonical visual contract for section containers, overlay backdrops,
and modal/dialog presentation patterns.

### Contract Rules

1. Section wrappers must use the approved content container pattern: `relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`.
2. Do not use the `.container` utility class in section wrappers.
3. Standard section shells must preserve approved spacing and background structure from this file.
4. Full-screen overlay modals must include a backdrop layer, centered modal panel, and visible close control.
5. Modal close behaviors must include Escape key and explicit close button; backdrop click close is required where pattern allows.
6. Body scroll must lock while full-screen overlays are open and restore on close.
7. Modal/dialog visuals must stay brand-congruent in color, typography, border radius, and focus states.
8. Modal/dialog accessibility must include semantic dialog roles and keyboard-reachable controls.

### Canonical References

- [Page Compliance Checklist](../../development/standards/page-compliance-checklist.md)
- [Consistency Guide](../../development/standards/consistency-guide.md)
- [Homepage Documentation](../../technical/homepage.md)

### Line Length & Spacing

- **Optimal:** 45-75 characters per line
- **Maximum:** 90 characters per line
- **Between Paragraphs:** 1em bottom margin
- **After Headings:** 0.5em top margin
- **Before Headings:** 1.5em top margin

---

## 🏗️ **Section Component Standards**

## Section Rhythm and Transition Contract (Canonical)

This section defines the approved section-to-section rhythm so pages feel cohesive without visual jumps.

### Rhythm Tiers

Use one of the two approved vertical rhythm tiers per page and avoid ad-hoc spacing drift.

- Standard tier: `py-12 sm:py-16 lg:py-20 xl:py-24`
- Compact tier: `py-10 sm:py-12 lg:py-16`

Rules:

1. Select a dominant tier for the page and reuse it for most body sections.
2. Use a tighter top handoff for transitional sections when needed (for example, FAQ to final CTA) instead of changing both top and bottom spacing.
3. Keep background alternation intentional (`white` -> `gray` -> `white`) and avoid accidental repeated transitions that flatten hierarchy.

### Heading Cadence Between Adjacent Sections

Large display headers should not repeat at full intensity in consecutive sections unless a deliberate hero-level break is intended.

1. Use display-scale headers for anchor sections.
2. Use section-scale headers for supporting sections that follow immediately after another headline-heavy block.
3. Keep subtitle-to-title hierarchy consistent across the page.

### Non-Hero Section Uniformity Contract (Canonical)

To preserve full-site congruency, non-hero sections must use a shared visual language.

1. Non-hero section headers must follow canonical heading patterns from this document.
2. Non-hero body copy must use approved body typography (Mendl Sans Dusk / `font-body` / `font-sans`) and approved size tiers.
3. Non-hero icon usage must use MaterialIcon and consistent section-role sizing and container treatment.
4. Non-hero section shells must preserve approved spacing rhythm, container width, and background system.
5. Visual divergence between adjacent non-hero sections requires documented intent or approved exception scope.

### Deferred/Loading Visual Parity

Deferred section placeholders must match the final rendered section shell.

1. Placeholder wrappers must inherit the same section className/variant.
2. Placeholder background and spacing must not flash between unrelated styles.
3. Skeleton card density should roughly match final content density.

### Shared Section Shell Priority

When a page uses standard MH section chrome, prefer shared section-shell components over hand-authored duplicated shells.

1. Use `BrandedContentSection` when the section follows canonical MH icon + two-line header + pattern background structure.
2. Use shared wrappers for deferred sections and pass shell className through so loading and final states match.
3. Only use manual section markup when a documented exception requires it.

### Section Background Pattern (REQUIRED)

All page sections MUST follow this standardized background:

```tsx
<section
  id="section-id"
  className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
>
  {/* Diagonal Stripe Background Pattern - REQUIRED */}
  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(
        45deg,
        #386851 0px,
        #386851 2px,
        transparent 2px,
        transparent 60px
      )`,
      }}
    ></div>
  </div>

  {/* Large Brand Color Blobs - REQUIRED */}
  <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
  <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

  <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Content goes here */}
  </div>
</section>
```

**Key Requirements:**

- ✅ Base: `bg-white dark:bg-gray-900` (solid, no gradients)
- ✅ Padding: `py-12 sm:py-16 lg:py-20 xl:py-24`
- ✅ Diagonal stripes: Hunter Green (#386851), 45deg angle
- ✅ Large blobs: `w-96 h-96` positioned at top-right and bottom-left
- ✅ Overflow hidden: Always include

❌ **DEPRECATED - DO NOT USE:**

- Complex gradients on base background
- Small animated blobs with pulse
- Inconsistent padding values

### Section Header Pattern (Custom)

**OFFICIAL STANDARD:** Custom header with icon, decorative lines, two-line gradient heading:

```tsx
<div className="mb-16 sm:mb-20 text-center">
  {/* Icon with decorative lines */}
  <div className="flex items-center justify-center mb-8 gap-4">
    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
      <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
        <MaterialIcon
          icon="shield"
          size="2xl"
          className="text-white drop-shadow-lg"
        />
      </div>
    </div>
    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
  </div>

  {/* Two-line gradient heading */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
      Subtitle Text
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      Main Title Text
    </span>
  </h2>

  {/* Description */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Description text
  </p>
</div>
```

**Icon Color Variations:**

- **Green theme:** `from-brand-primary via-brand-primary-dark to-brand-primary-darker`
- **Bronze theme:** `from-brand-secondary via-bronze-700 to-bronze-800`
- **Tan theme:** `from-brand-secondary via-brand-secondary-dark to-bronze-700`

### Hero Section Standards

**Modern Requirements:**

- ✅ Full viewport height: `h-screen flex items-center justify-center`
- ✅ Clean typography: Title, subtitle, description
- ✅ Brand color emphasis: `text-brand-secondary` on hero titles
- ✅ PageNavigation at bottom: `absolute bottom-0 left-0 right-0`
- ✅ Homepage PageNavigation row uses a 6-cell grid (Home, Services, Projects, About, Contact, More)
- ✅ `More` opens a modal overlay pattern (backdrop + centered panel), not an inline dropdown
- ✅ `More` uses the same padding/typography/border attributes as the other 5 nav cells
- ✅ Modern components: CTAs, badges, and stats ARE allowed when appropriate
- ✅ Responsive padding: Top `pt-16` to `lg:pt-40`, Bottom `pb-12` to `lg:pb-28`

### Hero Similarity Contract (Homepage Baseline)

Hero sections share their own visual contract and must align to homepage hero characteristics.

1. Hero layout baseline matches homepage structure: full-height shell, centered content stack, and bottom PageNavigation placement.
2. Hero typography baseline matches homepage hierarchy: strong H1 emphasis, concise subtitle, and supporting body copy.
3. Hero navigation baseline matches homepage behavior: six-cell row and `More` overlay interaction pattern where required.
4. Hero color baseline preserves approved dark gradient atmosphere and brand-emphasis title treatment.
5. Any route-specific hero divergence must be documented as intent or approved exception before merge.

```tsx
<section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
        <span className="block text-brand-secondary font-black drop-shadow-lg">
          Page Title Content
        </span>
      </h1>

      <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
        Compelling subtitle or tagline
      </p>

      <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
        "Built on Quality, Backed by Trust." — Descriptive text about page
        content.
      </p>
    </div>
  </div>

  <PageNavigation
    items={navigationConfigs.pageName}
    showRemainingPagesOverlay
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

### PageNavigation Overlay Pattern (Homepage)

- Grid container must render six equal columns for the top row.
- The first five cells are primary destinations; the sixth cell is `More`.
- `More` must use a full-screen overlay pattern with:
  - Backdrop click-to-close behavior
  - Escape key close behavior
  - Body scroll lock while open
  - Centered modal panel with brand-congruent colors and typography
- Overlay menu items list remaining site pages as direct links.
- Keep interactive elements keyboard reachable with visible focus rings.

## Navigation Overlay and Header Action Visual Contract (Canonical)

This section is the canonical visual contract for global header controls,
page-navigation overlays, and navigation action presentation.

### Contract Rules

1. Global header control set must remain: logo, language toggle, phone CTA, compact theme toggle, and hamburger menu.
2. Header remains logo-first and the MH logo stays visually dominant at mobile and desktop breakpoints.
3. Hero surfaces must not duplicate global-header contact actions owned by the phone CTA.
4. Page navigation row must preserve the six-cell top-row pattern (Home, Services, Projects, About, Contact, More) where this pattern is required.
5. `More` interactions must use the full-screen overlay pattern (backdrop + centered panel), not inline dropdown behavior.
6. Overlay close behaviors must include Escape key, close button, and backdrop click where applicable.
7. Body scroll must lock while navigation overlays are open and restore on close.
8. Navigation controls and overlay links must remain keyboard reachable with visible focus states.
9. Terminology by navigation surface must follow the dual-terminology matrix:

- PageNavigation top row uses MH brand labels (`mhBrandName`) for compact clarity.
- PageNavigation More overlay keeps MH brand labels with plain-language SEO descriptions.
- Hamburger and Footer navigation keep plain-language SEO labels on the primary line and MH brand labels on the secondary line.

1. Do not collapse the above surface-specific pattern into a single global parenthetical format for all UI elements.

### Canonical References

- [Page Compliance Checklist](../../development/standards/page-compliance-checklist.md)
- [Homepage Documentation](../../technical/homepage.md)
- [Consistency Guide](../../development/standards/consistency-guide.md)

## Footer Accreditation and Trust Continuity Visual Contract (Canonical)

This section is the canonical visual contract for footer trust presentation,
accreditation visibility, and credential continuity.

### Contract Rules

1. Every production page must render the global footer accreditation row.
2. Accreditation row visibility must be preserved at all breakpoints.
3. Accreditation row must include required trust credentials with valid outbound destinations (for example: AGC, BBB, insurance, chamber memberships, WA VOB).
4. Trust and credential blocks must not be removed or hidden without approved exception handling.
5. WA Veteran Owned Business badge usage must remain scoped to the approved `WaVobBadge` component and documented color exception.
6. Footer trust copy must remain factual, relationship-first, and consistent with canonical terminology.

### Canonical References

- [Brand Congruency Master Checklist](../../branding/governance/brand-congruency-master-checklist.md)
- [Page Compliance Checklist](../../development/standards/page-compliance-checklist.md)
- [Brand Constants](../../branding/brand-constants.md)

---

## 🎴 **Card Component Standards**

### Modern Card Structure (v6.0.0)

**Current Standard:** Custom div structure with animated border glows, top accent bars, and enhanced icons.

```tsx
import { designTokens, hoverMotion } from "@/lib/styles/design-tokens";

<div className="group relative flex h-full">
  {/* Animated Border Glow */}
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>

  <div
    className={`relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col w-full ${designTokens.cardInteractive}`}
  >
    {/* Top Accent Bar */}
    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

    <div className="p-6 sm:p-8 flex flex-col flex-1">
      {/* Enhanced Icon with Nested Blur Layers */}
      <div className="relative inline-block mb-4 mx-auto">
        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
        <div
          className={`relative rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-xl ${hoverMotion.iconSubtle}`}
        >
          <MaterialIcon
            icon="icon_name"
            size="xl"
            className="text-white drop-shadow-lg"
          />
        </div>
      </div>

      {/* Card Title */}
      <h3 className="mb-3 text-center font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
        Card Title
      </h3>

      {/* Card Content */}
      <p className="mb-4 text-center text-gray-600 dark:text-gray-300 flex-grow text-sm sm:text-base md:text-lg leading-relaxed">
        Card description content
      </p>

      {/* Optional Link/Action */}
      <Link
        href="/link"
        className="inline-flex items-center justify-center text-brand-primary hover:text-brand-secondary transition-colors mt-auto"
      >
        <span className="font-medium text-xs sm:text-sm">Action Text</span>
        <MaterialIcon icon="arrow_forward" size="sm" className="ml-1" />
      </Link>
    </div>
  </div>
</div>;
```

### Card Animation Effects

- **Border glow:** `opacity-20` default, `opacity-100` on hover
- **Card lift:** Use `hoverMotion.cardLift` or `designTokens.cardInteractive`
- **Border transition:** `border-gray-200` to `border-transparent` on hover
- **Shadow enhancement:** `shadow-lg` to `shadow-2xl` on hover
- **Icon scale:** Use `hoverMotion.iconSubtle` for icon emphasis

### Card Color Themes

**Primary (Green) Cards:**

```tsx
<div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 ..."></div>
<div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>
```

**Secondary (Bronze/Tan) Cards:**

```tsx
<div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 ..."></div>
<div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-brand-secondary"></div>
```

**Government (Grayscale) Cards - /public-sector page ONLY:**

```tsx
<div className="absolute -inset-2 bg-gradient-to-r from-slate-600/40 to-gray-700/40 ..."></div>
<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600"></div>
```

### Card Grid Layout Standards

- **Large Screens (lg):** 3 cards per row optimal
- **Extra Large (xl):** Use `xl:grid-cols-4` for 6+ card sets
- **Tablet (md):** 2 cards per row
- **Mobile:** 1 card per row (stack vertically)
- **Spacing:** `gap-6 lg:gap-8`

**Examples:**

- 6 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3`
- 4 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4`
- 3 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

**Philosophy:** Prefer 3-4 columns on large screens for better visual balance.

## Card Visual Contract (Canonical)

This section is the canonical visual contract for card shells, accent bars, icon containers,
and card typography across website surfaces.

### Contract Rules

1. Card structures must use approved modern card patterns from this file.
2. Border glow, elevation, and border transition behavior must stay role-consistent across card sets.
3. Icon containers in cards must preserve nested blur-layer structure.
4. Card hover and icon motion must use centralized motion tokens (`hoverMotion.*`) instead of ad-hoc inline transform patterns.
5. Top accent bars are required where the card pattern calls for accent-led visual hierarchy.
6. Card typography must use approved responsive scales and weights.
7. Public-sector grayscale card styling is contextual and must remain scoped to approved surfaces.

### Elevation Tiers (Required)

Use two card elevation tiers to prevent random shadow intensity drift across adjacent sections.

1. Tier 1 (standard): subtle card surfaces for dense informational sections.
2. Tier 2 (emphasis): stronger surfaces for featured proof or CTA cards.
3. Do not place Tier 2 blocks back-to-back across neighboring sections unless intentional for a hero-like break.

### Motion Exception Governance

Motion outside tokenized patterns must be documented as an exception.

1. Default card and CTA motion must use centralized tokens (`hoverMotion.*`, `designTokens.*`, `transitionDuration.*`).
2. If inline transform classes are required for a one-off interaction, record the reason and component scope in the associated PR/audit note.
3. Repeated one-off motion patterns must be converted into shared tokens/components.

### Canonical References

- [Page Compliance Checklist](../../development/standards/page-compliance-checklist.md)
- [Design System Standards](../../development/standards/design-system-standards.md)
- [Consistency Guide](../../development/standards/consistency-guide.md)

### Team Profile Section Color Roles (Source of Truth)

For the team profile surface, section-level color roles are centralized as tokenized class strings in:

- `src/components/team/TeamProfileSection.tsx` → `TEAM_PROFILE_SECTION_THEME`

Use this token map to maintain consistent MH role coloring across profile sections:

- Trust/operations sections: green-forward (`brand-primary`)
- Credentials/legacy sections: tan/bronze-forward (`brand-secondary`, `bronze-*`)
- Recognition sections: bronze-neutral premium surfaces

Implementation rule:

- Prefer updating the role token map over editing individual section class strings inline.
- Keep text contrast compliant by using `brand-secondary-text` / `brand-secondary-dark` for normal-size tan text.

---

## Button Visual Contract (Canonical)

This section is the canonical visual contract for all website buttons and CTAs.

### Contract Rules

1. Use the shared `Button` component from `@/components/ui` for production CTAs.
2. Use approved variants only: `primary`, `secondary`, `outline`, `neutral`, `default`, `destructive`, `ghost`, `link`.
3. Keep motion tokenized via `@/lib/styles/design-tokens` (`hoverMotion.*`, `transitionDuration.*`).
4. Do not introduce ad-hoc inline hover transform classes (`hover:scale-*`, `group-hover:scale-*`, `group-hover:rotate-*`).
5. Minimum touch target height is 44px.
6. Public-sector grayscale styling is contextual and must still use `Button` as the base component.
7. For route navigation CTAs, use `Button asChild` with `Link` rather than wrapping `Button` in `Link`.

### CTA Priority Ladder (Required)

Use a consistent CTA hierarchy inside each section:

1. Primary CTA: filled high-emphasis action (single dominant next step).
2. Secondary CTA: outlined or tinted support action.
3. Tertiary CTA: text-link action for low-emphasis navigation.

Rules:

1. Do not render multiple primary CTAs with equal weight in the same CTA cluster.
2. If a section has 2-3 CTAs, only the first/highest-priority action is primary.
3. FAQ and utility sections should default to secondary or tertiary CTA emphasis.

### CTA Composition Pattern (Required)

```tsx
// ✅ CORRECT
<Button asChild variant="primary" size="lg">
  <Link href="/contact">Contact Our Team</Link>
</Button>

// ❌ AVOID
<Link href="/contact">
  <Button variant="primary" size="lg">Contact Our Team</Button>
</Link>
```

### Button Variants

**Primary (Green):**

```tsx
<Button
  variant="primary"
  size="default"
  className="transition-all duration-300"
>
  <MaterialIcon icon="icon_name" className="mr-2" />
  Button Text
</Button>
```

**Secondary (Tan):**

```tsx
<Button
  variant="secondary"
  size="default"
  className="transition-all duration-300"
>
  <MaterialIcon icon="icon_name" className="mr-2" />
  Button Text
</Button>
```

**Outline:**

```tsx
<Button variant="outline" size="default">
  Button Text
</Button>
```

### Touch Accessibility

- **Minimum Height:** 44px (WCAG compliant)
- **Interactive States:** hover, focus, active
- **Disabled States:** 50% opacity, no hover effects
- **Icon Spacing:** `mr-2` (small), `mr-3` (medium), `mr-4` (large)

### Canonical References

- [Design System Standards](../../development/standards/design-system-standards.md)
- [Buttons & CTAs Guide](../../technical/design-system/buttons-ctas-complete-guide.md)

---

## 📝 **Form Component Standards**

### Input Field Pattern

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Field Label
  </label>
  <input
    type="text"
    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
      rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 
      transition-all duration-300 touch-manipulation min-h-[44px]"
    placeholder="Enter information"
  />
</div>
```

## Form Field and Form Shell Visual Contract (Canonical)

This section is the canonical visual contract for form fields, form shell presentation,
and trust/security indicator styling on website forms.

### Contract Rules

1. Form fields must preserve accessible sizing and interaction baselines (minimum 44px touch targets for interactive controls).
2. Form shell and field styling must remain brand-congruent in color, typography, spacing, and focus treatment.
3. Focus/validation behavior must remain accessible and visually consistent across forms.
4. Trust indicators (for example security badges) must remain visible and styled within approved brand constraints.
5. Form security UX requirements must align with Turnstile and server verification guidance.
6. Do not introduce alternate ad-hoc field or shell patterns that bypass this contract.

### Canonical References

- [Page Compliance Checklist](../../development/standards/page-compliance-checklist.md)
- [Form Security Standards](../../technical/form-security-standards.md)
- [Design System Standards](../../development/standards/design-system-standards.md)

---

## ♿ **Accessibility Standards**

### WCAG Compliance

#### Text Contrast Requirements

- **Normal Text:** Minimum 4.5:1 contrast ratio
- **Large Text:** Minimum 3:1 contrast ratio (18pt+ or 14pt+ bold)
- **Enhanced:** Target 7:1 for important content

#### MH Brand Color Compliance

| Color Combination | Ratio  | WCAG AA                       | Use Case              |
| ----------------- | ------ | ----------------------------- | --------------------- |
| #BD9264 on white  | 2.82:1 | ❌ Normal<br>✅ Large (18pt+) | Headlines, decorative |
| #8A6B49 on white  | 4.71:1 | ✅ All sizes                  | Body copy, buttons    |
| White on #8A6B49  | 4.71:1 | ✅ All sizes                  | Buttons, badges       |
| #386851 on white  | 6.43:1 | ✅ All sizes                  | Primary elements      |
| #6B4E2E on white  | 7.32:1 | ✅ AAA — all sizes            | Bronze text, labels   |

#### Font Size Requirements

- **Minimum Body Size:** 16px (never smaller)
- **Scalability:** Support up to 200% zoom
- **Relative Units:** Use rem/em for scalable text

### Required Attributes

- **ARIA Labels:** Descriptive labels for screen readers
- **Focus Management:** Visible focus indicators
- **Keyboard Navigation:** Tab order and Enter/Space activation
- **Semantic HTML:** Use proper heading hierarchy

### Implementation Example

```tsx
<Button
  variant="primary"
  aria-label="Schedule a free consultation with MH Construction"
  className="focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
>
  <MaterialIcon icon="event" className="mr-2" />
  Schedule Consultation
</Button>
```

---

## 🚀 **Animation & Interaction Standards**

### Standard Transitions

- **Duration:** `transitionDuration.normal` (300ms)
- **Easing:** `ease-out` for natural feel
- **Hover Effects:** Use `hoverMotion.*` token classes
- **Focus States:** `focus:ring-2 focus:ring-brand-primary`

### Group Interactions

```tsx
import { hoverMotion } from "@/lib/styles/design-tokens";

className = hoverMotion.iconSubtle;
```

---

## 📱 **Responsive Standards**

### Mobile-First Breakpoints

- **Base:** Mobile (320px+)
- **sm:** Small screens (640px+)
- **md:** Tablets (768px+)
- **lg:** Desktop (1024px+)
- **xl:** Large desktop (1280px+)

### Touch Optimization

- **Minimum Touch Targets:** 44px height
- **Touch Class:** `touch-manipulation` on all interactive elements
- **Tap Feedback:** Visual feedback on touch interactions

### Grid Responsiveness

```tsx
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8";
```

---

## 🔍 **Quality Checklist**

### Component Review Criteria

- [ ] Uses approved brand colors only (Hunter Green, Leather Tan, grays)
- [ ] Material Icons instead of emojis
- [ ] Consistent spacing and padding
- [ ] Proper responsive breakpoints
- [ ] Accessibility attributes included
- [ ] Dark mode support implemented
- [ ] Standard animation timings (300ms)
- [ ] Touch-friendly sizing (min 44px)
- [ ] Hover and focus states defined
- [ ] Semantic HTML structure
- [ ] Section headers use two-line gradient pattern with `overflow-visible`
- [ ] Cards use modern structure with animated border glows
- [ ] Backgrounds use diagonal stripe pattern with large blobs
- [ ] Page uses one approved section rhythm tier consistently (standard or compact)
- [ ] CTA clusters follow required primary-secondary-tertiary ladder
- [ ] Adjacent section headers follow a deliberate cadence (display vs section scale)
- [ ] Deferred placeholders visually match final section shell (spacing/background parity)

---

## 📚 **Related Documentation**

- **[MH Branding](../)** - Hub for all brand documentation
- **[Color System](./color-system.md)** - Brand color definitions
- **[Buttons & CTAs Guide](../../technical/design-system/buttons-ctas-complete-guide.md)** - Complete button implementation

---

## 🔄 **Migration from Previous Standards**

### From typography.md v5.0.0

**RESOLVED CONFLICTS:**

❌ **Old Policy (DEPRECATED):** "NO SECTION BADGES - No bg-clip-text with gradients"

✅ **Current Standard:** Gradient text IS approved for section headers using two-line pattern with `overflow-visible`

**What Changed:**

- Gradient text in section headers is now the official standard
- Two-line pattern (subtitle + gradient title) is required
- `overflow-visible` is critical to prevent gradient clipping
- Hero sections can include modern components (CTAs, badges, stats) when appropriate

### From component-standards.md v6.0.0

**What Stays:**

- Modern card structure with animated border glows ✅
- Top accent bars (h-2) on all cards ✅
- Enhanced icon system with nested blur layers ✅
- Government color scheme for public-sector page ✅
- Diagonal stripe backgrounds with large blobs ✅

**What's Clarified:**

- All typography standards now integrated
- Hero section requirements updated to allow modern components
- Gradient text policy definitively resolved

---

**Maintained by:** MH Construction Development Team  
**Last Reviewed:** December 28, 2025  
**Next Review:** Quarterly brand compliance assessment

---

**Questions?** Refer to:

- Component examples in `src/components/ui/` directory
- Page implementations in `src/app/` directory
- This document is the single source of truth - when in doubt, follow these standards
