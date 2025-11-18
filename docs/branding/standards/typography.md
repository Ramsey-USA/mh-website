# MH Construction Typography System

**Date:** November 4, 2025
**Status:** ✅ Current
**Category:** Business - Brand Standards
**Version:** 4.0.2
**Last Updated:** November 4, 2025

## Quick Navigation

- [🏠 Brand Documentation](./branding-index.md)
- [📋 Brand Overview](./brand-overview.md)
- [🎨 Color System](./color-system.md)
- [🔧 Icon Policy](./icon-policy.md)

---

## 🚨 CRITICAL POLICY: NO SECTION BADGES

### Professional Typography Standards

**MH Construction maintains a strict NO SECTION BADGES policy. Section beginnings must not have
decorative rounded badges/pills with icons. All text headings must use solid colors with
professional presentation.**

#### ❌ PROHIBITED: Decorative Section Badges & Gradient Text

- **No decorative section badges** (rounded-full containers with icons at section beginnings)
- **No `bg-clip-text`** in combination with gradients
- **No `bg-gradient-to-r`** for text styling
- **No `text-transparent`** gradient effects
- **No bubble/pill decorations** for section headers

#### ✅ APPROVED: Professional Text Styling

- **Solid colors only**: `text-brand-primary`, `text-gray-900`, etc.
- **Professional emphasis**: Font weights and sizes only
- **Theme-aware colors**: Proper light/dark mode support
- **High contrast**: Accessibility-compliant color combinations

---

## Font System Overview

### Primary Typeface: Inter

**Inter** is the primary typeface for all MH Construction digital communications,
chosen for its excellent readability, modern appearance, and professional character
that aligns with our military precision values.

#### Font Family Stack

````css
font-family: "Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
```text

#### Key Characteristics

- **High Legibility**: Optimized for screen reading at all sizes
- **Professional Appearance**: Clean, modern aesthetic
- **Variable Font Support**: Smooth weight transitions
- **Excellent Accessibility**: Clear character differentiation
- **Wide Language Support**: Comprehensive character set

### Font Weights

#### Available Weights

- **Light (300)**: Subtle headings, decorative text
- **Regular (400)**: Body text, default weight
- **Medium (500)**: Emphasized text, subheadings
- **Semi-Bold (600)**: Strong emphasis, important information
- **Bold (700)**: Primary headings, call-to-action text

#### Weight Usage Guidelines

```css
/* Headings */
h1 {
  font-weight: 700;
}
h2 {
  font-weight: 600;
}
h3 {
  font-weight: 600;
}
h4 {
  font-weight: 500;
}
h5 {
  font-weight: 500;
}
h6 {
  font-weight: 500;
}

/* Body Text */
body {
  font-weight: 400;
}
strong {
  font-weight: 600;
}
.emphasis {
  font-weight: 500;
}
````

## Responsive Typography Scale

### Mobile-First Responsive Heading Hierarchy

All typography uses responsive scaling that adapts to screen sizes, ensuring
optimal readability and professional appearance across all devices.

#### H1 - Hero Section Headlines (For Photo/Video Backgrounds)

**CRITICAL:** Hero sections must use single-line titles with brand color (NO BADGES).

**Mobile-First Responsive Scaling:**

- **Mobile (base)**: `text-lg` (18px)
- **Extra Small**: `xs:text-xl` (20px)
- **Small**: `sm:text-2xl` (24px)
- **Medium**: `md:text-3xl` (30px)
- **Large**: `lg:text-4xl` (36px)
- **Extra Large**: `xl:text-5xl` (48px)

**Weight**: Black (900)  
**Color**: `text-brand-secondary` (Leather Tan) for hero impact
**Line Height**: Tight leading for impact  
**Usage**: Hero page titles with photo/video backgrounds

```tsx
// ✅ CORRECT: Hero section title
<h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
  <span className="block text-brand-secondary font-black drop-shadow-lg">
    Page Title Content
  </span>
</h1>
```

```css
/* Hero H1 Styles */
.hero h1 {
  @apply text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl;
  @apply font-black leading-tight tracking-tight;
  @apply text-brand-secondary drop-shadow-lg;
}
```

#### H1 - Primary Headlines (Standard Sections - Responsive)

**Mobile-First Responsive Scaling:**

- **Mobile (base)**: `text-2xl` (24px)
- **Small**: `sm:text-3xl` (30px)
- **Medium**: `md:text-4xl` (36px)
- **Large**: `lg:text-5xl` (48px)
- **Extra Large**: `xl:text-6xl` (60px)

**Weight**: Bold (700)  
**Line Height**: Tight leading for impact  
**Usage**: Page titles, primary headlines (non-hero sections)

```css
h1 {
  @apply text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl;
  @apply font-bold leading-tight tracking-tight;
  @apply text-gray-900 dark:text-gray-100;
}
```

#### H2 - Section Headlines (Responsive)

**Mobile-First Responsive Scaling:**

- **Mobile (base)**: `text-xl` (20px)
- **Small**: `sm:text-2xl` (24px)
- **Medium**: `md:text-3xl` (30px)
- **Large**: `lg:text-4xl` (36px)
- **Extra Large**: `xl:text-5xl` (48px)

**Weight**: Semi-Bold (600)  
**Line Height**: Comfortable for readability  
**Usage**: Major section headings

```css
h2 {
  @apply text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl;
  @apply font-semibold leading-tight tracking-tight;
  @apply text-gray-900 dark:text-gray-100;
}
```

#### H3 - Subsection Headlines (Responsive)

**Mobile-First Responsive Scaling:**

- **Mobile (base)**: `text-lg` (18px)
- **Small**: `sm:text-xl` (20px)
- **Medium**: `md:text-2xl` (24px)
- **Large**: `lg:text-3xl` (30px)
- **Extra Large**: `xl:text-4xl` (36px)

**Weight**: Semi-Bold (600)  
**Line Height**: Comfortable readability  
**Usage**: Subsection headings, important content blocks

```css
h3 {
  @apply text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl;
  @apply font-semibold leading-snug;
  @apply text-gray-900 dark:text-gray-100;
}
```

---

## 🏠 Hero Section Typography Standards

### MH Branding Standard for Hero Sections (v4.0.2)

**UPDATED:** November 4, 2025

**ALL PAGES must implement the standardized hero section format. This ensures consistent user experience, proper
navigation visibility, and optimal typography scaling across the entire website.**

#### 🚨 CRITICAL HERO SECTION REQUIREMENTS

**The following elements are MANDATORY for all hero sections:**

1. **Full Viewport Height**: Must use `h-screen flex items-center justify-center`
2. **NO Badges**: Remove all veteran badges, decorative badges, or bubble containers
3. **NO CTA Buttons**: Remove all call-to-action buttons, "Schedule Consultation", "Get Estimate", etc.
4. **NO Stats/Indicators**: Remove quick stats, trust indicators, or stat cards
5. **Clean Content Only**: Title, subtitle, and description text ONLY
6. **Navigation at Bottom**: PageNavigation component positioned at `absolute bottom-0 left-0 right-0`

#### Hero Section Structure (REQUIRED)

```tsx
<section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

  {/* Content - Clean and Simple */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
      {/* Main Title - REQUIRED RESPONSIVE SCALING */}
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
        <span className="block text-brand-secondary font-black drop-shadow-lg">
          {/* Page-specific title content */}
          Your Page Title Here
        </span>
      </h1>

      {/* Subtitle - REQUIRED */}
      <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
        {/* Page-specific subtitle */}
        Your compelling subtitle or tagline
      </p>

      {/* Description - REQUIRED */}
      <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
        {/* Page-specific description - Include tagline here */}
        "Building for the Client, NOT the Dollar" — Your descriptive text about
        the page content.
      </p>
    </div>
  </div>

  {/* Page Navigation - ALWAYS REQUIRED AT BOTTOM */}
  <PageNavigation
    items={navigationConfigs.pageName}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

#### Hero Section Requirements Checklist

**CRITICAL REQUIREMENTS - ALL PAGES:**

- ✅ **Exact viewport height**: `h-screen flex items-center justify-center`
- ✅ **NO badges**: No veteran badges, military_tech icons, or decorative badges
- ✅ **NO CTA buttons**: No Schedule Consultation, Get Estimate, or any action buttons
- ✅ **NO stats/indicators**: No quick stats cards, trust indicators, or stat displays
- ✅ **NO contact buttons**: No quick contact buttons or action links
- ✅ **Content ONLY**: Title, subtitle, description text only
- ✅ **Responsive padding**: Top `pt-16` to `lg:pt-40`, Bottom `pb-12` to `lg:pb-28`
- ✅ **Responsive typography**: `text-lg` to `xl:text-5xl` for main titles
- ✅ **Tight spacing**: `space-y-2` to `lg:space-y-6` prevents mobile overlap
- ✅ **PageNavigation at bottom**: Always at `absolute bottom-0 left-0 right-0`
- ✅ **Overflow hidden**: Prevents horizontal scrolling issues

#### Hero Typography Scaling (MANDATORY)

| Element         | Mobile (base)    | Small                 | Medium                | Large                | Extra Large          |
| --------------- | ---------------- | --------------------- | --------------------- | -------------------- | -------------------- |
| **Main Title**  | `text-lg` (18px) | `sm:text-2xl` (24px)  | `md:text-3xl` (30px)  | `lg:text-4xl` (36px) | `xl:text-5xl` (48px) |
| **Subtitle**    | `text-xs` (12px) | `sm:text-base` (16px) | `md:text-lg` (18px)   | `lg:text-xl` (20px)  | -                    |
| **Description** | `text-xs` (12px) | `sm:text-sm` (14px)   | `md:text-base` (16px) | `lg:text-lg` (18px)  | -                    |

#### ❌ PROHIBITED in Hero Sections

**The following elements are STRICTLY FORBIDDEN in hero sections:**

```tsx
// ❌ DO NOT INCLUDE:

// 1. Veteran Badges or any decorative badges
<div className="flex justify-center items-center gap-2 mb-4 sm:mb-6">
  <MaterialIcon icon="military_tech" size="lg" className="text-bronze-300" />
  <span>Veteran-Owned Excellence</span>
</div>

// 2. CTA Buttons (Schedule, Get Estimate, Contact, etc.)
<Link href="/booking">
  <Button variant="secondary" size="xl">
    <MaterialIcon icon="event" size="lg" />
    Schedule Free Consultation
  </Button>
</Link>

// 3. Quick Stats or Stat Cards
<div className="gap-3 sm:gap-6 lg:gap-8 grid grid-cols-2 sm:grid-cols-4">
  <div className="bg-white/10 backdrop-blur-sm p-3 sm:p-4 lg:p-6">
    <div className="font-black text-2xl text-bronze-300">30+</div>
    <div className="text-white/90">Years Experience</div>
  </div>
</div>

// 4. Trust Indicators
<div className="flex flex-wrap justify-center items-center gap-4">
  <div className="flex items-center">
    <MaterialIcon icon="workspace_premium" size="sm" />
    <span>100+ Projects</span>
  </div>
</div>

// 5. Quick Contact Buttons
<a href="tel:+15093086489" className="inline-flex items-center">
  <MaterialIcon icon="phone" size="md" />
  <span>Call Now</span>
</a>

// 6. Partnership Tagline as separate large element
<p className="font-bold text-2xl">
  "Building for the Client, NOT the Dollar"
</p>
```

#### ✅ CORRECT Hero Section Example

```tsx
// ✅ CORRECT: Clean hero with title, subtitle, description only
<section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
        <span className="block text-brand-secondary font-black drop-shadow-lg">
          Commercial Construction Excellence
        </span>
      </h1>

      <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
        Your trusted construction partner in Pasco, Kennewick, and Richland.
      </p>

      <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
        "Building for the Client, NOT the Dollar" — Veteran-owned excellence
        serving the Pacific Northwest with authentic partnerships and
        cutting-edge technology.
      </p>
    </div>
  </div>

  <PageNavigation
    items={navigationConfigs.home}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

#### Hero Section Benefits

- 🎯 **Consistent Cross-Page**: All pages follow identical hero structure
- 📱 **Perfect Mobile Scaling**: Content fits all screen sizes without overflow
- 🧭 **Navigation Visible**: Section links immediately accessible to users
- ♿ **Accessibility Compliant**: High contrast, readable text at all sizes
- 🚀 **Performance Optimized**: Uses `h-screen` for SSR compatibility

---

- **Weight**: Bold (700)
- **Line Height**: 1.2
- **Usage**: Page titles, primary headlines

`````css
h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}
```text

#### H2 - Section Headlines

- **Size**: 36px (2.25rem)
- **Weight**: Semi-Bold (600)
- **Line Height**: 1.3
- **Usage**: Major section headings

```css
h2 {
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.025em;
}
```text

#### H3 - Subsection Headlines

- **Size**: 30px (1.875rem)
- **Weight**: Semi-Bold (600)
- **Line Height**: 1.4
- **Usage**: Subsection headings, important content blocks

```css
h3 {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.4;
}
```text

#### H4 - Card Titles (Responsive)

**Mobile-First Responsive Scaling:**

- **Mobile (base)**: `text-lg` (18px)
- **Small**: `sm:text-xl` (20px)
- **Medium**: `md:text-2xl` (24px)

**Weight**: Bold (700) or Semi-Bold (600)
**Line Height**: Comfortable readability
**Usage**: Card titles, minor headings, component headers

```tsx
<CardTitle className="text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
  Card Title Content
</CardTitle>
```

```css
h4,
.card-title {
  @apply text-lg sm:text-xl md:text-2xl;
  @apply font-bold leading-snug;
  @apply text-gray-900 dark:text-gray-100;
}
```

#### H5 - Supporting Headlines

- **Size**: 20px (1.25rem)
- **Weight**: Medium (500)
- **Line Height**: 1.6
- **Usage**: Supporting headings, list item titles

````css
h5 {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
}
```text

#### H6 - Caption Headlines

- **Size**: 16px (1rem)
- **Weight**: Medium (500)
- **Line Height**: 1.6
- **Usage**: Caption headings, small section titles

```css
h6 {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```text

### Body Text Styles

#### Body Large (Section Introductions)

**Mobile-First Responsive Scaling:**

- **Mobile (base)**: `text-lg` (18px)
- **Medium**: `md:text-xl` (20px)
- **Large**: `lg:text-2xl` (24px)

**Weight**: Light (300)
**Line Height**: Relaxed
**Usage**: Section introduction paragraphs, important body text

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300
  text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
  Section introduction text
</p>
`````

#### Body Default - Responsive (Card Content, Lists)

**Mobile-First Responsive Scaling:**

- **Mobile (base)**: `text-sm` (14px)
- **Small**: `sm:text-base` (16px)
- **Medium**: `md:text-lg` (18px)

**Weight**: Regular (400)  
**Line Height**: Relaxed  
**Usage**: Card descriptions, list items, standard paragraph content

```tsx
<p
  className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg 
  leading-relaxed"
>
  Standard body content
</p>
```

#### Body Small - Responsive (Fine Print, Secondary Content)

**Mobile-First Responsive Scaling:**

- **Mobile (base)**: `text-xs` (12px)
- **Small**: `sm:text-sm` (14px)
- **Medium**: `md:text-base` (16px)

**Weight**: Regular (400)  
**Line Height**: Relaxed  
**Usage**: Supporting text, metadata, flip card back content, smaller descriptions

```tsx
<span className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base">
  Secondary content
</span>
```

#### Caption Text (Static)

- **Size**: 12px (0.75rem)
- **Weight**: Regular (400)
- **Line Height**: 1.4
- **Usage**: Image captions, footnotes, copyright text (non-responsive)

````css
.text-caption {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-text-secondary);
}
```text

## Special Typography Elements

### Button Text

#### Primary Buttons

- **Size**: 16px (1rem)
- **Weight**: Medium (500)
- **Transform**: None
- **Letter Spacing**: 0.025em

```css
.btn-primary {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}
```text

#### Secondary Buttons

- **Size**: 14px (0.875rem)
- **Weight**: Medium (500)
- **Transform**: None
- **Letter Spacing**: 0.025em

```css
.btn-secondary {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}
```text

### Navigation Text

#### Main Navigation

- **Size**: 16px (1rem)
- **Weight**: Medium (500)
- **Transform**: None
- **Letter Spacing**: 0

```css
.nav-main {
  font-size: 1rem;
  font-weight: 500;
}
```text

#### Breadcrumbs

- **Size**: 14px (0.875rem)
- **Weight**: Regular (400)
- **Transform**: None
- **Letter Spacing**: 0

```css
.breadcrumb {
  font-size: 0.875rem;
  font-weight: 400;
}
```text

### Form Elements

#### Input Labels

- **Size**: 14px (0.875rem)
- **Weight**: Medium (500)
- **Transform**: None
- **Letter Spacing**: 0

```css
label {
  font-size: 0.875rem;
  font-weight: 500;
}
```text

#### Input Text

- **Size**: 16px (1rem)
- **Weight**: Regular (400)
- **Line Height**: 1.5

```css
input, textarea {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}
```text

#### Placeholder Text

- **Size**: 16px (1rem)
- **Weight**: Regular (400)
- **Color**: Secondary text color

```css
::placeholder {
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text-secondary);
}
```text

## Typography Implementation

### CSS Custom Properties

```css
:root {
  /* Font Family */
  --font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;

  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.2;
  --leading-snug: 1.3;
  --leading-normal: 1.4;
  --leading-relaxed: 1.5;
  --leading-loose: 1.6;
  --leading-extra-loose: 1.7;
}
```text

### Tailwind Typography Configuration

```javascript
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.4' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.6' }],
      lg: ['1.125rem', { lineHeight: '1.7' }],
      xl: ['1.25rem', { lineHeight: '1.6' }],
      '2xl': ['1.5rem', { lineHeight: '1.5' }],
      '3xl': ['1.875rem', { lineHeight: '1.4' }],
      '4xl': ['2.25rem', { lineHeight: '1.3' }],
      '5xl': ['3rem', { lineHeight: '1.2' }]
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  }
}
```text

---

## 🎯 Section Icon Standards

### Icon Placement & Navigation Consistency

**CRITICAL:** All section icons must match the corresponding navigation bar icons for consistency and user orientation.

#### Icon Sizing Standards

**Direct Placement (Main Sections):**

```tsx
{/* Top-level section icons - use text-6xl for large, prominent display */}
<MaterialIcon
  icon="icon_name"
  className="mb-6 text-brand-primary text-6xl"
/>
````

**Wrapped Background (Supporting Sections):**

```tsx
{
  /* Wrapped icons with background - use size="xl" for proper scaling */
}
<div className="flex justify-center items-center mb-6">
  <div className="bg-brand-primary/10 p-4 rounded-2xl">
    <MaterialIcon icon="icon_name" size="xl" className="text-brand-primary" />
  </div>
</div>;
```

#### Icon-to-Navigation Mapping

Always reference `/src/components/navigation/navigationConfigs.ts` to ensure section icons match navigation:

| Section                | Navigation Icon | Implementation      |
| ---------------------- | --------------- | ------------------- |
| Partnership Philosophy | `handshake`     | `text-6xl` direct   |
| Core Values            | `shield`        | `text-6xl` direct   |
| Leadership Team        | `people`        | `text-6xl` direct   |
| Testimonials           | `star`          | `size="xl"` wrapped |
| Safety & Compliance    | `security`      | `size="xl"` wrapped |
| Awards & Recognition   | `emoji_events`  | `size="xl"` wrapped |

#### Icon Size Reference

| Usage               | Class/Size                 | Pixel Size | Context            |
| ------------------- | -------------------------- | ---------- | ------------------ |
| **Hero Icons**      | `text-8xl`                 | 96px       | Largest impact     |
| **Section Headers** | `text-6xl`                 | 64px       | Main sections      |
| **Wrapped Icons**   | `size="xl"`                | 48px       | Contained sections |
| **Card Icons**      | `text-4xl` or `size="lg"`  | 36px       | Individual cards   |
| **List Icons**      | `text-base` or `size="sm"` | 16px       | Inline with text   |

#### Icon Color Standards

```tsx
{
  /* Primary brand color */
}
className = "text-brand-primary";

{
  /* Secondary brand color */
}
className = "text-brand-secondary";

{
  /* Accent color for checkmarks */
}
className = "text-brand-accent";

{
  /* Context colors */
}
className = "text-gray-900 dark:text-white";
```

---

## Typography Usage Guidelines

### Heading Best Practices

#### Hierarchy Consistency

- Use semantic heading order (H1 → H2 → H3)
- Don't skip heading levels for visual purposes
- Only one H1 per page
- Use CSS classes for visual styling variations

#### Heading Length Guidelines

- **H1**: Maximum 60 characters
- **H2**: Maximum 50 characters
- **H3**: Maximum 40 characters
- **H4-H6**: Maximum 30 characters

### Body Text Guidelines

#### Line Length (Measure)

- **Optimal**: 45-75 characters per line
- **Maximum**: 90 characters per line
- Use container widths to control reading comfort

#### Paragraph Spacing

- **Between Paragraphs**: 1em bottom margin
- **After Headings**: 0.5em top margin
- **Before Headings**: 1.5em top margin

### Responsive Typography

#### Mobile Optimizations

````css
@media (max-width: 768px) {
  h1 { font-size: 2.25rem; }  /* 36px */
  h2 { font-size: 1.875rem; } /* 30px */
  h3 { font-size: 1.5rem; }   /* 24px */

  body { font-size: 1rem; }   /* 16px - maintain for readability */
}
```text

#### Large Screen Enhancements

```css
@media (min-width: 1200px) {
  h1 { font-size: 3.5rem; }   /* 56px */
  h2 { font-size: 2.5rem; }   /* 40px */

  .text-large { font-size: 1.25rem; } /* 20px */
}
```text

## Accessibility Guidelines

### WCAG Compliance

#### Text Contrast Requirements

- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Enhanced**: Target 7:1 contrast ratio for important content

#### Font Size Requirements

- **Minimum Body Size**: 16px (never smaller)
- **Scalability**: Support up to 200% zoom
- **Relative Units**: Use rem/em for scalable text

### Screen Reader Considerations

- Use semantic heading structure
- Provide text alternatives for visual typography
- Maintain logical reading order
- Test with screen readers regularly

## Brand Voice in Typography

### Professional Precision

- Clean, consistent spacing
- Appropriate weight hierarchy
- Military-inspired orderliness
- No decorative fonts

### Partnership-Focused Readability

- Excellent legibility at all sizes
- Comfortable reading experience
- Clear information hierarchy
- Accessible to all users

### Quality Assurance

#### Typography Checklist

- [ ] Consistent font weights across similar elements
- [ ] Proper heading hierarchy maintained
- [ ] Adequate contrast ratios met
- [ ] Responsive scaling tested
- [ ] Cross-browser font rendering verified

## Related Documentation

- [**Brand Overview**](./brand-overview.md) - Complete brand identity guide
- [**Color System**](./color-system.md) - Color palette and usage
- [**Icon Policy**](./icon-policy.md) - Material Icons standards
- [**Implementation Guide**](./implementation-guide.md) - Technical implementation
- [**Branding Index**](../branding-index.md) - Hub for all brand documentation

---

**Typography Authority**: MH Construction Design Team
**Last Update**: November 4, 2025 (v4.0.2)
**Next Review**: Quarterly brand compliance assessment
````
