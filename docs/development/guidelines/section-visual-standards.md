# MH Construction Section Visual Standards

**Version:** 1.0.0  
**Date:** November 17, 2025  
**Status:** ✅ Official Standard  
**Category:** Development Guidelines - Visual Consistency

---

## Quick Reference

This document defines the official visual standards for sections across the MH Construction website, based on the
completed homepage and About page implementations. These standards ensure visual consistency and professional
appearance across all pages.

**Reference Pages:**

- Homepage: `/` - Exemplifies all section patterns
- About Page: `/about` - Demonstrates heritage messaging with same visual standards

---

## 🎨 Section Enhancement Patterns

### Core Visual Elements

Every section should include these visual enhancement elements for consistency:

#### 1. Gradient Backgrounds

```tsx
<section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
```

**Alternating Patterns:**

- **Pattern A**: `from-gray-50 via-white to-gray-50`
- **Pattern B**: `from-white via-gray-50 to-white`
- **Pattern C**: `from-gray-50 via-white to-gray-100` (for variety)

#### 2. Radial Gradient Overlays

Add depth with subtle radial gradients:

```tsx
{/* Background Effects */}
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
```

**Color Combinations:**

- Primary green: `rgba(56,104,81,0.08)` light / `0.15` dark
- Secondary orange: `rgba(189,146,100,0.06)` light / `0.12` dark
- Accent bronze: `rgba(189,146,100,0.08)` light / `0.12` dark

#### 3. Animated Blur Orbs

Three animated blur orbs with staggered delays:

```tsx
<div className="top-20 left-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
<div
  className="right-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
  style={{ animationDelay: "1s" }}
></div>
<div
  className="top-1/2 left-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
  style={{ animationDelay: "0.5s" }}
></div>
```

**Animation Delays:** 0s, 0.5s, 1s (staggered for visual interest)

---

## 🎯 Icon Headers with Glow Effect

### Standard Implementation

Every section header must include an icon with glow effect:

```tsx
<div className="flex justify-center items-center mb-6 sm:mb-8">
  <div className="relative">
    {/* Glow effect */}
    <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>

    {/* Icon container with gradient */}
    <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
      <MaterialIcon icon="shield" size="2xl" className="text-white" />
    </div>
  </div>
</div>
```

### Icon Color Patterns

Use different gradient combinations for variety:

**Primary Green (Default):**

```tsx
<div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
<div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
```

**Secondary Orange:**

```tsx
<div className="absolute inset-0 bg-brand-secondary/20 dark:bg-brand-secondary/30 blur-xl rounded-full"></div>
<div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
```

**Accent Bronze:**

```tsx
<div className="absolute inset-0 bg-brand-accent/20 dark:bg-brand-accent/30 blur-xl rounded-full"></div>
<div className="relative bg-gradient-to-br from-brand-accent to-bronze-600 p-4 rounded-2xl shadow-lg">
```

### Icon Selection Guide

Choose icons that relate to section content:

| Section Type | Recommended Icons                                |
| ------------ | ------------------------------------------------ |
| Core Values  | `shield`, `verified`, `stars`                    |
| Services     | `construction`, `engineering`, `handyman`        |
| Team         | `groups`, `people`, `diversity_3`                |
| Safety       | `security`, `verified_user`, `health_and_safety` |
| Awards       | `emoji_events`, `trophy`, `workspace_premium`    |
| News/Blog    | `article`, `newspaper`, `feed`                   |
| Comparison   | `compare`, `compare_arrows`, `analytics`         |
| Partnerships | `handshake`, `diversity_3`, `people`             |

---

## 📝 Typography Hierarchy

### Section Headers (Two-Line Pattern)

Standard pattern for all section headers:

```tsx
<h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
  {/* Subtitle Line */}
  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
    Your Section
  </span>
  {/* Main Title Line */}
  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
    Main Title
  </span>
</h2>
```

### Section Description

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
  Your section description with{" "}
  <span className="font-medium text-gray-800 dark:text-gray-200">
    emphasized words
  </span>{" "}
  for key concepts.
</p>
```

### Responsive Typography Scale

| Element         | Responsive Classes                                         |
| --------------- | ---------------------------------------------------------- |
| **Main Title**  | `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl` |
| **Subtitle**    | `text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`  |
| **Description** | `text-base sm:text-lg md:text-xl lg:text-2xl`              |
| **Body Text**   | `text-sm sm:text-base md:text-lg`                          |

---

## 🃏 Card Standards

### Flip Card Dimensions

**Standard Heights (Homepage & About Page):**

```tsx
className = "h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px]";
```

**Previous Heights (Deprecated):**

```tsx
// ❌ OLD: h-[450px] sm:h-[480px] md:h-[500px] lg:h-[520px]
```

### Card Styling Standards

```tsx
<Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary w-full h-full flex flex-col overflow-hidden transition-all duration-300">
```

**Key Properties:**

- **Shadow**: `shadow-lg hover:shadow-2xl`
- **Dark Mode Shadow**: `dark:hover:shadow-brand-primary/20`
- **Border**: `border border-gray-200 dark:border-gray-700`
- **Accent Border**: `border-l-4 border-l-brand-primary`
- **Layout**: `flex flex-col` for proper content flow
- **Transition**: `transition-all duration-300`

### Card Content Layout

Ensure "Hover to learn more" stays at bottom:

```tsx
<CardContent className="pt-0 flex flex-col flex-grow px-4 sm:px-5">
  {/* Main content with flex-grow */}
  <p className="mb-4 text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed break-words flex-grow">
    {description}
  </p>

  {/* Bottom element with mt-auto */}
  <div className="flex-shrink-0 mt-auto pt-3 border-t border-gray-300 dark:border-gray-600">
    <div className="flex items-center justify-center gap-2 text-brand-primary dark:text-brand-primary-light">
      <MaterialIcon
        icon="autorenew"
        size="sm"
        className="animate-spin-slow group-hover:animate-spin"
      />
      <span className="font-semibold text-xs uppercase tracking-wider">
        <span className="hidden sm:inline">Hover to learn more</span>
        <span className="sm:hidden">Tap to learn more</span>
      </span>
    </div>
  </div>
</CardContent>
```

**Key Layout Classes:**

- **Container**: `flex flex-col flex-grow`
- **Content**: `flex-grow` (pushes bottom element down)
- **Bottom Element**: `flex-shrink-0 mt-auto`
- **Separator**: `border-t border-gray-300 dark:border-gray-600`

### Icon Sizing in Cards

**Always use `size` prop, never text classes:**

```tsx
// ✅ CORRECT
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />

// ❌ INCORRECT
<MaterialIcon icon="construction" className="text-4xl text-brand-primary" />
```

**Size Scale:**

- `sm` - Small icons (12-16px)
- `md` - Medium icons (20-24px)
- `lg` - Large icons (28-32px)
- `xl` - Extra large icons (36-40px)
- `2xl` - Icon headers (48-56px)

### Card Animations

```tsx
// Flip card rotation
className = "group-hover:rotate-y-180 transition-transform duration-700";

// Hover lift effect
className = "hover:-translate-y-2 transition-all duration-300";

// Icon spin on hover
className = "animate-spin-slow group-hover:animate-spin";

// Scale effect
className = "group-hover:scale-110 transition-transform duration-300";
```

---

## 🎨 CTA Section Standards

### Two CTA Sections

#### 1. NextStepsSection (Mid-Page)

**Background**: Dark gradient with colorful icon

```tsx
<section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
```

**Header Pattern**:

```tsx
<h2 className="mb-6 sm:mb-8 font-black text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
  <span className="block mb-3 sm:mb-4 font-semibold text-white/90 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight drop-shadow-sm">
    Let's Build Your
  </span>
  <span className="block text-brand-accent font-black drop-shadow-lg">
    Vision Together
  </span>
</h2>
```

**Icon**: Bronze/accent gradient

```tsx
<div className="absolute inset-0 bg-brand-accent/30 blur-xl rounded-full"></div>
<div className="relative bg-gradient-to-br from-brand-accent to-bronze-600 p-4 rounded-2xl shadow-lg">
```

**Emphasized Text**: Use brand-accent color

```tsx
<p>
  Where your word is your bond, and{" "}
  <span className="font-medium text-brand-accent">ours is too</span>.
</p>
```

#### 2. PartnershipCTA (Bottom of Page)

Same styling as NextStepsSection but with different content focus.

### CTA Card Layout

**Three-column grid with flex cards:**

```tsx
<div className="gap-8 grid grid-cols-1 md:grid-cols-3">
  <div className="group bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full">
    {/* Content with flex-grow */}
    <ul className="space-y-2 mb-6 text-gray-600 text-sm dark:text-gray-400 flex-grow">
      {/* List items */}
    </ul>

    {/* Button stays at bottom */}
    <Link href="/path">
      <Button variant="primary" size="lg" className="w-full">
        Button Text
      </Button>
    </Link>
  </div>
</div>
```

---

## 📋 Complete Section Template

### Full Implementation Example

```tsx
<section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
  {/* Enhanced Background Effects */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>

  {/* Animated Blur Orbs */}
  <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
  <div
    className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
    style={{ animationDelay: "1s" }}
  ></div>
  <div
    className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
    style={{ animationDelay: "0.5s" }}
  ></div>

  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <FadeInWhenVisible>
      <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
        {/* Icon Header with Glow Effect */}
        <div className="flex justify-center items-center mb-6 sm:mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
            <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
              <MaterialIcon icon="shield" size="2xl" className="text-white" />
            </div>
          </div>
        </div>

        {/* Two-Line Header */}
        <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
          <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
            Section Subtitle
          </span>
          <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
            Main Title
          </span>
        </h2>

        {/* Description */}
        <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
          Your description with{" "}
          <span className="font-medium text-gray-800 dark:text-gray-200">
            emphasized keywords
          </span>{" "}
          for impact.
        </p>
      </div>
    </FadeInWhenVisible>

    {/* Content Grid */}
    <StaggeredFadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Cards or content */}
    </StaggeredFadeIn>
  </div>
</section>
```

---

## ✅ Implementation Checklist

### Before Creating a New Section

- [ ] Include gradient background with appropriate pattern
- [ ] Add two radial gradient overlays for depth
- [ ] Add three animated blur orbs with staggered delays (0s, 0.5s, 1s)
- [ ] Include icon header with glow effect
- [ ] Choose appropriate icon color (primary, secondary, or accent)
- [ ] Use two-line header pattern (subtitle + main title)
- [ ] Main title uses brand color with drop-shadow-sm
- [ ] Include descriptive text with emphasized keywords
- [ ] Wrap header in FadeInWhenVisible
- [ ] Wrap content grid in StaggeredFadeIn
- [ ] Use relative positioning on section
- [ ] Use standard padding: `py-12 sm:py-16 lg:py-24 xl:py-32`
- [ ] Include overflow-hidden for contained effects

### Card Implementation Checklist

- [ ] Use standard heights: `h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px]`
- [ ] Include shadow effects: `shadow-lg hover:shadow-2xl`
- [ ] Add dark mode shadow: `dark:hover:shadow-brand-primary/20`
- [ ] Include border with accent: `border-l-4 border-l-brand-primary`
- [ ] Use flex-col layout: `flex flex-col`
- [ ] Content uses flex-grow to fill space
- [ ] Bottom elements use mt-auto for positioning
- [ ] Include border-top separator before bottom content
- [ ] Use MaterialIcon with size prop (not text classes)
- [ ] Include hover animations and transitions

### CTA Section Checklist

- [ ] Use dark gradient background
- [ ] Include colorful icon header (bronze/accent recommended)
- [ ] Split title with colored emphasis word
- [ ] White text with brand-accent highlights
- [ ] Three-column grid layout (stacks on mobile)
- [ ] Cards use flex flex-col h-full
- [ ] List items use flex-grow
- [ ] Buttons anchored at bottom
- [ ] Hover effects on cards

---

## 🎯 Color Distribution Guide

Vary icon header colors across sections for visual interest:

### Recommended Pattern

1. **Section 1**: Primary green
2. **Section 2**: Secondary orange
3. **Section 3**: Accent bronze
4. **Section 4**: Primary green
5. **Section 5**: Secondary orange
6. **Section 6**: Accent bronze
7. **CTA 1**: Accent bronze
8. **CTA 2**: Accent bronze

**Example (About Page):**

- Partnership Philosophy: Primary green
- Core Values: Primary green
- Testimonials: Secondary orange
- Leadership Team: Primary green
- Awards: Secondary orange
- Why Values Matter: Accent bronze
- News & Achievements: Secondary orange
- NextSteps CTA: Accent bronze
- Partnership CTA: Accent bronze

---

## 📚 Related Documentation

- **[Consistency Guide](../consistency-guide.md)** - Overall consistency standards
- **[Hero Section Standards](../../branding/standards/hero-section-standards.md)** - Hero section patterns
- **[Component Standards](../../technical/design-system/)** - Component library
- **[Typography Standards](../../branding/standards/typography.md)** - Typography system

---

## 🎓 Learning from Examples

**Study These Pages:**

- **Homepage** (`/`) - Perfect example of all patterns
- **About Page** (`/about`) - Heritage messaging with same visual standards

**Key Takeaways:**

1. Every section has icon header with glow
2. Consistent card heights across all flip cards
3. Color variety through different icon gradients
4. Bottom-anchored elements use mt-auto with flex layout
5. CTA sections use bronze/accent for warmth

---

**Version History**:

- **1.0.0** (Nov 17, 2025): Initial section visual standards based on homepage/about implementation

---

**Questions?** Reference the homepage and About page as the gold standard for all section implementations.
