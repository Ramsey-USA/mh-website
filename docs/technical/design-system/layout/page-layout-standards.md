# MH Construction - Page Layout Standards

**Version:** 1.0
**Last Updated:** October 2, 2025
**Status:** ✅ Active Standard

> **Purpose:** This document defines the spacing, padding, typography, and layout
> standards extracted from the home page to ensure visual consistency across all
> website pages.

---

## 📐 Section Layout Standards

### **Section Container Structure**

Every major section should follow this structure:

````tsx
<section className="relative bg-[BACKGROUND] py-12 lg:py-16 [section-name]">
  {/* Background decorative elements */}
  <div className="absolute inset-0 bg-[GRADIENT]"></div>
  <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
  <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

  {/* Content container */}
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Section content */}
  </div>
</section>
```text

### **Key Layout Classes**

| Purpose | Classes | Notes |
|---------|---------|-------|
| **Section Padding** | `py-12 lg:py-16` | Standard vertical spacing |
| **Hero Section** | `py-16 lg:py-24` | Larger spacing for hero sections |
| **Container Width** | `max-w-7xl` | Maximum content width |
| **Container Padding** | `px-4 sm:px-6 lg:px-8` | Responsive horizontal padding |
| **Container Centering** | `mx-auto` | Centers the content container |

---

## 📝 Typography Hierarchy

### **Page Headings (H1) - Hero Sections**

```tsx
<h1 className="mb-6 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
  <span className="block mb-2 font-semibold text-white/90 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    Subtitle or Context
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white drop-shadow-lg">
    Main Headline
  </span>
</h1>
```text

**Breakdown:**

- Main heading: `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Subtitle/context: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- Margin bottom: `mb-6`
- Font weight: `font-black` (900)
- Line height: `leading-tight`
- Tracking: `tracking-tight`

### **Section Headings (H2)**

```tsx
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl
  sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300
    text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
    Section Context
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary
    to-brand-secondary drop-shadow-sm text-transparent">
    Section Title
  </span>
</h2>
```text

**Breakdown:**

- Main heading: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- Context line: `text-xl sm:text-2xl md:text-3xl lg:text-4xl`
- Margin bottom: `mb-6`
- Context spacing: `mb-3`
- Font weight: `font-black` (900) for main, `font-semibold` (600) for context
- Line height: `leading-tight`
- Tracking: `tracking-tighter`

### **Card Titles (H3)**

```tsx
<h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl transition-colors">
  Card Title
</h3>
```text

**Breakdown:**

- Size: `text-2xl` (fixed, no responsive scaling for cards)
- Margin bottom: `mb-4`
- Font weight: `font-bold` (700)

### **Body Text - Large (Section Introductions)**

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300
  text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
  Introduction text with <span className="font-medium text-gray-800
    dark:text-gray-200">emphasized words</span>
  {' '}and <span className="bg-clip-text bg-gradient-to-r from-brand-primary
    to-brand-secondary font-semibold text-transparent">
    gradient highlights
  </span>.
</p>
```text

**Breakdown:**

- Size: `text-lg md:text-xl lg:text-2xl`
- Max width: `max-w-5xl` (narrower than section for readability)
- Font weight: `font-light` (300)
- Line height: `leading-relaxed`
- Tracking: `tracking-wide`
- Centering: `mx-auto`

### **Body Text - Standard (Card Descriptions)**

```tsx
<p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
  Standard body text for card content.
</p>
```text

**Breakdown:**

- Size: Default `text-base` (16px)
- Margin bottom: `mb-6`
- Line height: `leading-relaxed`

### **Small Text (Labels, Metadata)**

```tsx
<div className="font-semibold text-brand-primary text-xs uppercase tracking-wider">
  Label or Category
</div>
```text

**Breakdown:**

- Size: `text-xs`
- Font weight: `font-semibold` (600)
- Transform: `uppercase`
- Tracking: `tracking-wider`

---

## 🎯 Spacing System

### **Section Title Blocks**

```tsx
<div className="mb-10 lg:mb-12 text-center">
  <h2>{/* Section heading */}</h2>
  <p>{/* Section description */}</p>
</div>
```text

**Spacing:**

- Title block margin: `mb-10 lg:mb-12`
- Heading to description: `mb-6` (built into h2)

### **Card Container Margins**

```tsx
<div className="mb-16 lg:mb-20">
  {/* Card grid */}
</div>
```text

**Spacing:**

- Standard: `mb-16`
- Hero/feature sections: `mb-16 lg:mb-20`

### **Icon Containers**

```tsx
{/* Feature cards (80px × 80px) */}
<div className="w-20 h-20 mb-6 p-2">
  <MaterialIcon size="xl" />  {/* 48px icon */}
</div>

{/* Value cards (96px × 96px) */}
<div className="w-24 h-24 mb-6 p-3">
  <MaterialIcon size="3xl" />  {/* 72px icon */}
</div>

{/* Service cards (64px × 64px) */}
<div className="w-16 h-16 mb-6 p-2">
  <MaterialIcon size="xl" />  {/* 48px icon */}
</div>
```text

**Spacing:**

- Margin below icon: `mb-6`
- Padding varies: `p-2` or `p-3` depending on size

---

## 🎨 Background Patterns

### **Gradient Backgrounds**

```tsx
{/* Light to dark gradient */}
<section className="bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900">

{/* Alternating section (solid color) */}
<section className="bg-white dark:bg-gray-900">

{/* Radial overlay for depth */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,
  rgba(56,104,81,0.05)_0%,transparent_50%)] opacity-60"></div>
```text

### **Decorative Blur Elements**

```tsx
{/* Top right blur */}
<div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>

{/* Bottom left blur */}
<div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>
```text

**Pattern:**

- Position: `top-20` or `bottom-20`, `left-20` or `right-20`
- Size: `w-32 h-32` or `w-40 h-40`
- Color: `bg-brand-primary/5` or `bg-brand-secondary/5`
- Effect: `blur-3xl rounded-full`

---

## 📱 Grid Systems

### **Standard Card Grid (3-Column Standard)**

```tsx
<div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Cards */}
</div>
```text

**Breakpoints:**

- Mobile: 1 column (`grid-cols-1`)
- Tablet: 2 columns (`md:grid-cols-2`)
- Desktop: 3 columns (`lg:grid-cols-3`)
- Gap: `gap-6 lg:gap-8`

**Usage:** Standard sections with 3, 6, 9, or 12 items

### **Feature Card Grid (4-Column Extended)**

```tsx
<div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Feature cards */}
</div>
```text

**Breakpoints:**

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns (`lg:grid-cols-3`)
- Extra Large: 4 columns (`xl:grid-cols-4`)
- Gap: `gap-6 lg:gap-8`

**Usage:** Larger collections (6-12 items) that benefit from 4-wide display on very large screens

**LAYOUT PHILOSOPHY:**

- **Prefer 3-4 columns** on large screens rather than multiple rows
- Creates cleaner, more balanced visual layout
- Easier to scan horizontally than vertically
- Better whitespace distribution
- More professional appearance

### **Two-Column Grid (Balanced)**

```tsx
<div className="gap-8 grid grid-cols-1 md:grid-cols-2">
  {/* Large content cards */}
</div>
```text

**Usage:** Feature comparisons, large content blocks, detailed cards requiring more space

---

## 📜 Scroll Behavior Standards

### **Single Main Scroll Philosophy**

**CRITICAL:** Pages must maintain a single, unified scrolling experience. Internal component scrolling
creates UX confusion and should be avoided.

#### ✅ APPROVED Patterns

- **Page-level scroll:** Only the main page body scrolls
- **Natural content flow:** Cards and sections stack naturally
- **Responsive height:** Content adapts to screen size without scrolling
- **Fixed heights:** Cards use fixed heights (e.g., `h-[400px]`) with content that fits

#### ❌ PROHIBITED Patterns

- **Internal card scrolling:** No `overflow-y-auto` on card content
- **Maximum height constraints:** No `max-h-[]` on card bodies that cause scrolling
- **Nested scroll areas:** No scrollable areas within scrollable areas
- **Hidden content:** All card content must be visible or accessible via card flip/interaction

### **Card Content Sizing**

```tsx
{/* ✅ CORRECT: Fixed height with fitting content */}
<div className="h-[400px]">
  <Card className="h-full">
    <CardContent>
      <p className="text-xs sm:text-sm md:text-base">
        Content sized to fit naturally
      </p>
    </CardContent>
  </Card>
</div>

{/* ❌ INCORRECT: Creates internal scroll */}
<Card className="overflow-y-auto max-h-[280px]">
  <CardContent>
    <p>Too much content causes phantom scroll</p>
  </CardContent>
</Card>
```

### **Flip Card Back Content**

```tsx
{/* ✅ CORRECT: Smaller responsive text fits naturally */}
<CardContent className="pt-0">
  <ul className="space-y-3">
    <li className="flex items-start">
      <MaterialIcon icon="check_circle" className="flex-shrink-0 mt-0.5 mr-2" />
      <span className="text-white leading-relaxed text-xs sm:text-sm md:text-base">
        Detail item
      </span>
    </li>
  </ul>
</CardContent>

{/* ❌ INCORRECT: Overflow creates phantom scroll */}
<CardContent className="overflow-y-auto max-h-[260px]">
  <ul>
    {/* Too many items or large text */}
  </ul>
</CardContent>
```

### **Content Fitting Strategies**

1. **Reduce Text Size:** Use `text-xs sm:text-sm md:text-base` for flip card backs
2. **Limit List Items:** Maximum 4-6 items per flip card back
3. **Adjust Card Height:** Use `h-[450px]` for content-heavy cards
4. **Concise Copy:** Write shorter, punchier descriptions
5. **Icon Size:** Use smaller icons on flip backs (`text-base` or `text-lg`)

---

## 🎴 Card Standards

### **Standard Card Structure**

```tsx
<div className="group relative bg-white dark:bg-gray-800 shadow-lg
  hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl
  hover:scale-105 transition-all duration-300">
  {/* Hover gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5
    to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl
    transition-opacity duration-300"></div>

  {/* Card content with flex layout for bottom-aligned CTA */}
  <div className="relative flex flex-col h-full">
    {/* Icon */}
    <div className="flex justify-center items-center bg-brand-primary/10 mb-6 p-2 rounded-2xl w-16 h-16">
      <MaterialIcon icon="icon_name" size="xl" className="text-brand-primary" />
    </div>

    {/* Title */}
    <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl transition-colors">
      Card Title
    </h3>

    {/* Description (flex-grow pushes CTA to bottom) */}
    <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
      Card description content.
    </p>

    {/* CTA (mt-auto keeps at bottom) */}
    <div className="flex items-center font-semibold text-brand-primary mt-auto">
      <span className="mr-2">Learn More</span>
      <MaterialIcon icon="arrow_forward" size="lg" />
    </div>
  </div>
</div>
```text

**Key Classes:**

- **Card container:** `relative`, `group`, `p-8`, `rounded-3xl`
- **Shadow:** `shadow-lg hover:shadow-2xl`
- **Border:** `border border-gray-200 dark:border-gray-700`
- **Hover scale:** `hover:scale-105`
- **Transitions:** `transition-all duration-300`
- **Content layout:** `flex flex-col h-full`
- **Bottom alignment:** `flex-grow` on description, `mt-auto` on CTA

---

## 🔘 Button Standards

### **Primary CTA Button**

```tsx
<Button
  variant="primary"
  size="xl"
  className="group shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 ease-out transform"
>
  <MaterialIcon icon="icon_name" size="2xl" className="mr-4 group-hover:scale-110" />
  <span className="font-semibold">Button Text</span>
</Button>
```text

### **Secondary/Outline Button**

```tsx
<Button
  variant="outline"
  size="xl"
  className="group shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
>
  <MaterialIcon icon="icon_name" size="2xl" className="mr-4 group-hover:scale-110" />
  <span className="font-semibold">Button Text</span>
</Button>
```text

**Standard Icon Spacing:** `mr-2` (small), `mr-4` (large)

---

## 🎭 Animation & Transitions

### **Standard Transition Classes**

```tsx
{/* General transitions */}
transition-all duration-300

{/* Smooth easing */}
ease-out

{/* Transform GPU acceleration */}
transform

{/* Color transitions */}
transition-colors

{/* Opacity transitions */}
transition-opacity duration-300

{/* Shadow transitions */}
transition-shadow duration-300
```text

### **Hover Effects**

```tsx
{/* Scale up */}
hover:scale-105

{/* Scale down slightly */}
hover:scale-95

{/* Icon scale in group */}
group-hover:scale-110

{/* Translate (arrows, etc.) */}
group-hover:translate-x-2
```text

---

## 📋 Complete Section Template

```tsx
{/* [SECTION NAME] Section */}
<section className="relative bg-white dark:bg-gray-900 py-12 lg:py-16 [section-slug]-section">
  {/* Background Effects */}
  <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 dark:from-gray-800/50 to-white dark:to-gray-900"></div>
  <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl rounded-full w-32 h-32"></div>
  <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl rounded-full w-40 h-40"></div>

  {/* Content Container */}
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

    {/* Section Header */}
    <div className="mb-10 lg:mb-12 text-center">
      <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl
        sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
        <span className="block mb-3 font-semibold text-gray-700
          dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl
          tracking-tight">
          Section Context
        </span>
        <span className="block bg-clip-text bg-gradient-to-r from-brand-primary
          to-brand-secondary drop-shadow-sm text-transparent">
          Section Title
        </span>
      </h2>
      <p className="mx-auto max-w-5xl font-light text-gray-600
        dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed
        tracking-wide">
        Section introduction text with{' '}
        <span className="font-medium text-gray-800 dark:text-gray-200">
          key emphasis
        </span>{' '}
        and{' '}
        <span className="bg-clip-text bg-gradient-to-r from-brand-primary
          to-brand-secondary font-semibold text-transparent">
          gradient highlights
        </span>.
      </p>
    </div>

    {/* Content Grid */}
    <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Cards or content items */}
    </div>
  </div>
</section>
```text

---

## 📱 Responsive Design Standards

### **Mobile-First Approach**

All layouts use Tailwind's mobile-first breakpoint system:

| Breakpoint | Screen Size | Prefix | Example |
|------------|-------------|--------|---------|
| **Default** | < 640px (Mobile) | (none) | `text-base` |
| **Small** | ≥ 640px | `sm:` | `sm:text-lg` |
| **Medium** | ≥ 768px (Tablet) | `md:` | `md:text-xl` |
| **Large** | ≥ 1024px (Desktop) | `lg:` | `lg:text-2xl` |
| **XL** | ≥ 1280px | `xl:` | `xl:text-3xl` |
| **2XL** | ≥ 1536px | `2xl:` | `2xl:text-4xl` |

### **Responsive Patterns**

#### **Container Padding (All Devices)**

```tsx
px-4 sm:px-6 lg:px-8
```text

- Mobile (< 640px): `1rem` (16px) padding
- Tablet (≥ 640px): `1.5rem` (24px) padding
- Desktop (≥ 1024px): `2rem` (32px) padding

#### **Section Spacing (All Devices)**

```tsx
py-12 lg:py-16
```text

- Mobile/Tablet: `3rem` (48px) vertical padding
- Desktop: `4rem` (64px) vertical padding

#### **Typography Scaling (All Devices)**

```tsx
{/* H1 - Scales from mobile to desktop */}
text-4xl sm:text-5xl md:text-6xl lg:text-7xl

{/* H2 - Scales from mobile to desktop */}
text-2xl sm:text-3xl md:text-4xl lg:text-5xl

{/* Body - Scales from mobile to desktop */}
text-lg md:text-xl lg:text-2xl
```text

#### **Grid Layouts (All Devices)**

```tsx
{/* 3-column responsive grid */}
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

{/* 4-column responsive grid */}
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```text

- Mobile: Single column (stacked)
- Tablet: 2 columns
- Desktop: 3 or 4 columns

#### **Flexbox Layouts (All Devices)**

```tsx
{/* Stack on mobile, row on desktop */}
flex flex-col sm:flex-row

{/* Center on mobile, justify on desktop */}
flex justify-center items-center sm:justify-between
```text

### **Touch-Friendly Standards**

#### **Minimum Touch Targets**

- Buttons: Minimum `h-12` (48px) for touch accessibility
- Interactive icons: Minimum `w-12 h-12` tap area
- Links: Adequate padding for easy tapping

#### **Button Sizes**

```tsx
{/* Small - Mobile compact */}
size="sm"  // 40px height

{/* Large - Standard mobile/desktop */}
size="lg"  // 52px height

{/* XL - Hero CTAs */}
size="xl"  // 60px height
```text

### **Device-Specific Optimizations**

#### **Mobile (< 768px)**

- Single column layouts
- Larger touch targets (min 48px)
- Reduced padding for screen space
- Simplified navigation
- Bottom-aligned CTAs in cards
- Stack flex layouts vertically

#### **Tablet (768px - 1024px)**

- 2-column grids
- Medium padding
- Hybrid layouts (some stacked, some grid)
- Touch-friendly but more content density
- Hover states still work

#### **Desktop (≥ 1024px)**

- Full multi-column grids
- Maximum padding and spacing
- Hover effects and animations
- Mouse-optimized interactions
- Full decorative elements visible

### **Testing Checklist**

Test all new pages on:

- [ ] **iPhone SE (375px)** - Smallest mobile
- [ ] **iPhone 12/13/14 (390px)** - Standard mobile
- [ ] **iPad Mini (768px)** - Small tablet
- [ ] **iPad Pro (1024px)** - Large tablet
- [ ] **Desktop 1366px** - Standard laptop
- [ ] **Desktop 1920px** - Full HD desktop
- [ ] **Chrome DevTools** - All breakpoints
- [ ] **Landscape orientation** - Mobile/tablet
- [ ] **Touch interactions** - Real device testing

### **Common Responsive Issues & Solutions**

| Issue | Solution |
|-------|----------|
| Text too small on mobile | Use responsive text classes: `text-base md:text-lg lg:text-xl` |
| Buttons not clickable on mobile | Ensure minimum `h-12` and adequate padding |
| Grid breaks on tablet | Use proper breakpoints: `md:grid-cols-2 lg:grid-cols-3` |
| Content overflow | Use `max-w-7xl` container and `px-4 sm:px-6 lg:px-8` |
| Images too large | Use responsive sizes: `w-full md:w-1/2 lg:w-1/3` |
| Navigation cramped | Stack on mobile: `flex flex-col sm:flex-row` |

---

## ✅ Checklist for New Pages

When creating a new page, ensure:

### Layout & Spacing

- [ ] Sections use `py-12 lg:py-16` spacing
- [ ] Content containers have `max-w-7xl` width
- [ ] Responsive padding: `px-4 sm:px-6 lg:px-8`
- [ ] Grid gaps are `gap-6 lg:gap-8` or `gap-10`

### Typography

- [ ] Section headers follow H2 typography pattern
- [ ] Body text uses appropriate responsive scaling
- [ ] Text readable on all screen sizes (minimum 16px base)

### Components

- [ ] Cards have `p-8` internal padding
- [ ] Cards use `rounded-3xl` border radius
- [ ] Hover states include `transition-all duration-300`
- [ ] Icons use standardized sizes (xl, 2xl, 3xl)
- [ ] CTA buttons follow standard icon + text pattern

### Responsive Design

- [ ] Mobile-first approach used (default → sm: → md: → lg:)
- [ ] Grid collapses to single column on mobile
- [ ] Typography scales appropriately across devices
- [ ] Touch targets minimum 48px height
- [ ] Tested on mobile, tablet, and desktop
- [ ] Works in portrait and landscape orientations

### Cross-Device Compatibility

- [ ] Dark mode classes included (`dark:`)
- [ ] Decorative blur elements positioned consistently
- [ ] Images responsive with proper sizing
- [ ] Navigation adapts to screen size
- [ ] No horizontal scrolling on any device

---

## 📚 Related Documentation

- **[design-system.md](./design-system/design-system.md)** - Complete design system
- **[icon-system-quick-reference.md](./icon-system-quick-reference.md)** - Icon usage
- **[consistency-guide.md](../../../development/consistency-guide.md)** - Implementation standards
- **[branding-index.md](../../../branding/branding-index.md)** - Modular brand docs
- **[features.md](./features.md)** - Feature documentation

---

**Maintained by:** MH Construction Development Team
**Questions?** Refer to home page (`src/app/page.tsx`) for live examples
````
