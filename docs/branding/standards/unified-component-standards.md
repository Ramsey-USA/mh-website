# MH Construction Unified Component & Typography Standards

**Category:** Branding - Standards  
**Version:** 7.1.0  
**Last Updated:** April 19, 2026  
**Status:** ✅ Official Standard - Consolidated Documentation  
**Previous Versions:** Replaces typography.md v5.0.0 and component-standards.md v6.0.0

> **Canonical Reference:** For exact brand values, see [Brand Constants](../brand-constants.md).

> **Purpose:** Single source of truth for all component design, typography, and branding standards.
> This consolidates previous separate documents to eliminate conflicts and provide clear guidance.

---

## 📋 **Document History**

### **Version 7.0.0 (December 28, 2025)** - CONSOLIDATION

- **MERGED:** Typography standards and component standards into single document
- **RESOLVED:** Gradient text policy conflict (gradient text IS approved for section headers)
- **RESOLVED:** Hero section requirements conflict (modern components with CTAs are allowed)
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

---

## 📝 **Typography System**

### MH Brand Typefaces

**Heading / Subheading Font — Abolition:**

```css
font-family:
  "Abolition",
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  "Helvetica Neue",
  Arial,
  sans-serif;
```

- Display/condensed typeface — strong brand identity at large sizes
- Used for: H1–H6 headings, subheadings, section titles, badges, tab labels
- Tailwind utility: `font-heading`
- CSS variable: `--font-heading`

**Body Font — DIN 2014:**

```css
font-family:
  "DIN 2014",
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  "Helvetica Neue",
  Arial,
  "Noto Sans",
  sans-serif;
```

- Clean humanist sans-serif — high legibility at small and medium sizes
- Used for: Body copy, paragraphs, captions, form labels, navigation items
- Tailwind utility: `font-sans` / `font-body`
- CSS variable: `--font-body`

**Font Files (self-hosted in `/public/fonts/`):**

| File | Weight | Role |
| ---- | ------ | ---- |
| `Abolition-Regular.woff2` | 400 | Headings |
| `DIN2014-Light.woff2` | 300 | Light body |
| `DIN2014-Regular.woff2` | 400 | Body |
| `DIN2014-Demi.woff2` | 600 | Semi-bold body |
| `DIN2014-Bold.woff2` | 700 | Bold body |

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

### Line Length & Spacing

- **Optimal:** 45-75 characters per line
- **Maximum:** 90 characters per line
- **Between Paragraphs:** 1em bottom margin
- **After Headings:** 0.5em top margin
- **Before Headings:** 1.5em top margin

---

## 🏗️ **Section Component Standards**

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
- ✅ Modern components: CTAs, badges, and stats ARE allowed when appropriate
- ✅ Responsive padding: Top `pt-16` to `lg:pt-40`, Bottom `pb-12` to `lg:pb-28`

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
        "Building projects for the Client, NOT the Dollar" — Descriptive text
        about page content.
      </p>
    </div>
  </div>

  <PageNavigation
    items={navigationConfigs.pageName}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

---

## 🎴 **Card Component Standards**

### Modern Card Structure (v6.0.0)

**Current Standard:** Custom div structure with animated border glows, top accent bars, and enhanced icons.

```tsx
<div className="group relative flex h-full">
  {/* Animated Border Glow */}
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>

  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
    {/* Top Accent Bar */}
    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

    <div className="p-6 sm:p-8 flex flex-col flex-1">
      {/* Enhanced Icon with Nested Blur Layers */}
      <div className="relative inline-block mb-4 mx-auto">
        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-xl"></div>
        <div className="relative rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
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
</div>
```

### Card Animation Effects

- **Border glow:** `opacity-20` default, `opacity-100` on hover with `animate-pulse`
- **Card lift:** `group-hover:-translate-y-1` for subtle elevation
- **Border transition:** `border-gray-200` to `border-transparent` on hover
- **Shadow enhancement:** `shadow-lg` to `shadow-2xl` on hover
- **Icon scale:** `group-hover:scale-110` for icon emphasis

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

## 🔘 **Button Standards**

### Button Variants

**Primary (Green):**

```tsx
<Button
  variant="primary"
  size="default"
  className="group transition-all duration-300"
>
  <MaterialIcon icon="icon_name" className="mr-2 group-hover:scale-110" />
  Button Text
</Button>
```

**Secondary (Tan):**

```tsx
<Button
  variant="secondary"
  size="default"
  className="group transition-all duration-300"
>
  <MaterialIcon icon="icon_name" className="mr-2 group-hover:scale-110" />
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

- **Duration:** `duration-300` (consistent across all components)
- **Easing:** `ease-out` for natural feel
- **Hover Effects:** `hover:scale-105`, `hover:shadow-2xl`
- **Focus States:** `focus:ring-2 focus:ring-brand-primary`

### Group Interactions

```tsx
className = "group";
// Icon animations within groups
className = "group-hover:scale-110 transition-transform duration-300";
// Text animations within groups
className = "group-hover:text-brand-primary transition-colors duration-300";
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
