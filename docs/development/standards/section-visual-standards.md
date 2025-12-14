# MH Construction Section Visual Standards

**Version:** 1.1.0  
**Date:** December 14, 2025  
**Status:** ✅ Official Standard  
**Category:** Development Guidelines - Visual Consistency

---

## 📋 **Recent Updates**

### **Version 1.1.0 (December 14, 2025)**

- Enhanced layered icon design with stronger visual impact
- Added two-layer blur glow pattern
- Documented decorative side lines for premium sections
- Specified multi-color gradient backgrounds for icons

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

---

## **Complete Section Header Pattern (v1.1.0 - December 2024)**

### **Overview**

The enhanced section header is a comprehensive design pattern that provides visual hierarchy,
brand color integration, and responsive typography for important sections across the site.

### **Structure**

**Hierarchy:**

1. Decorative lines with enhanced icon (top)
2. Context line with gradient text (subtitle)
3. Main title with gradient text
4. Description paragraph with colored inline highlights
5. Optional callout box with animated border (quote/tagline)

### **Implementation Example**

```tsx
<div className="mb-16 sm:mb-20 lg:mb-24 text-center">
  {/* Icon with decorative gradient lines */}
  <div className="flex items-center justify-center mb-8 gap-4">
    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-brand-primary rounded-full"></div>

    {/* Enhanced layered icon (see icon pattern section) */}
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/30 dark:to-brand-secondary/30 blur-2xl rounded-full"></div>
      <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-brand-primary dark:to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
        <MaterialIcon
          icon="icon_name"
          size="2xl"
          className="text-white drop-shadow-lg"
        />
      </div>
    </div>

    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-brand-secondary rounded-full"></div>
  </div>

  {/* Two-line gradient heading */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
    <span className="block mb-3 sm:mb-4 font-semibold bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
      Context or Subtitle
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-bronze-600 to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-lg">
      Main Title
    </span>
  </h2>

  {/* Description with colored keyword highlighting */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Your description text with{" "}
    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
      green terms
    </span>
    ,{" "}
    <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
      tan terms
    </span>
    , and{" "}
    <span className="font-bold text-bronze-600 dark:text-bronze-400">
      bronze terms
    </span>{" "}
    for visual variety.
  </p>

  {/* Optional: Animated callout box */}
  <div className="mt-10 sm:mt-12 inline-block">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative bg-white dark:bg-gray-800 px-8 py-6 rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 shadow-xl">
        <p className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
          "Your tagline or quote with{" "}
          <span className="font-black italic text-bronze-700 dark:text-bronze-400 text-xl sm:text-2xl md:text-3xl">
            EMPHASIS
          </span>{" "}
          text"
        </p>
      </div>
    </div>
  </div>
</div>
```

### **Typography Scale**

**Context Line (Subtitle):**

- Breakpoint progression: xl → 2xl → 3xl → 4xl → 5xl
- Classes: `text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- Weight: `font-semibold` (600)
- Gradient: Three-color horizontal (`from-brand-primary via-brand-secondary to-brand-primary`)

**Main Title:**

- Breakpoint progression: 3xl → 4xl → 5xl → 6xl → 7xl
- Classes: `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Weight: `font-black` (900)
- Gradient: Three-color horizontal with bronze center (`from-brand-primary via-bronze-600 to-brand-secondary`)

**Description:**

- Breakpoint progression: base → lg → xl → 2xl
- Classes: `text-base sm:text-lg md:text-xl lg:text-2xl`
- Weight: `font-light` (300)
- Max width: `max-w-5xl` for readability

**Callout Box Text:**

- Breakpoint progression: lg → xl → 2xl
- Classes: `text-lg sm:text-xl md:text-2xl`
- Weight: `font-bold` (700)
- Emphasis text: Larger scale `text-xl sm:text-2xl md:text-3xl` with `font-black italic`

### **Color System**

**Gradient Text Patterns:**

1. **Primary gradient:** `from-brand-primary via-brand-secondary to-brand-primary`
   - Use for: Context/subtitle lines

2. **Bronze-accented gradient:** `from-brand-primary via-bronze-600 to-brand-secondary`
   - Use for: Main title lines

**Inline Highlights (for description text):**

- **Green:** `text-brand-primary dark:text-brand-primary-light` - Technical excellence, quality
- **Tan:** `text-brand-secondary dark:text-brand-secondary-light` - Partnership, relationships
- **Bronze:** `text-bronze-600 dark:text-bronze-400` - Expertise, craftsmanship

**Callout Box Colors:**

- Background: `bg-white dark:bg-gray-800`
- Border: `border-brand-primary/20 dark:border-brand-primary/30`
- Animated glow: `bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-600`
- Emphasis text: `text-bronze-700 dark:text-bronze-400`

### **Spacing Standards**

**Vertical spacing:**

- Header section margin: `mb-16 sm:mb-20 lg:mb-24` (64px → 80px → 96px)
- Icon to heading: `mb-8` (32px)
- Context to main title: `mb-3 sm:mb-4` (12px → 16px)
- Heading to description: `mb-6 sm:mb-8` (24px → 32px)
- Description to callout: `mt-10 sm:mt-12` (40px → 48px)

**Horizontal spacing:**

- Icon line gap: `gap-4` (16px between lines and icon)
- Decorative line width: `w-16` (64px)

**Content constraints:**

- Description max width: `max-w-5xl` (56rem / 896px)
- Horizontal padding: `px-2` on description for mobile spacing

### **Decorative Elements**

**Gradient Lines:**

- Height: `h-1` (4px)
- Width: `w-16` (64px)
- Shape: `rounded-full`
- Left line: `bg-gradient-to-r from-transparent to-brand-primary`
- Right line: `bg-gradient-to-l from-transparent to-brand-secondary`

**Callout Box Animation:**

- Base glow: `opacity-75`
- Hover glow: `group-hover:opacity-100`
- Transition: `transition duration-500`
- Blur: `blur-sm` on glow layer
- Positioning: `absolute -inset-1` for glow layer

### **Responsive Behavior**

**Mobile (< 640px):**

- Smallest text sizes (base, xl, 3xl)
- Reduced spacing (mb-16, mb-6, mt-10)
- Full width with px-2 padding

**Tablet (640px - 1024px):**

- Medium text sizes (lg, 2xl, 5xl)
- Increased spacing (mb-20, mb-8, mt-12)

**Desktop (> 1024px):**

- Largest text sizes (2xl, 5xl, 7xl)
- Maximum spacing (mb-24)
- Max-width constraint on description for optimal readability

### **Usage Guidelines**

**When to use this pattern:**

- Major sections with 6+ content items (Why Partner, Services, etc.)
- Landing pages for core service areas
- High-priority content that deserves emphasis

**When to simplify:**

- Minor sections with 2-3 items may omit the callout box
- Sidebar content should use smaller text scales
- Footer sections use condensed spacing

**Component integration:**

- Always wrap in `<div className="mb-16 sm:mb-20 lg:mb-24 text-center">`
- Use `MaterialIcon` for icons (never emojis)
- Apply `FadeInWhenVisible` wrapper for entrance animation
- Ensure dark mode variants on all color classes

**Content guidelines:**

- Context line: 2-5 words (e.g., "Why Choose MH")
- Main title: 3-8 words (e.g., "Excellence in Every Detail")
- Description: 30-60 words maximum
- Use inline color highlights on 3-6 key terms
- Callout box: Optional, 10-20 words maximum

---

### **Enhanced Layered Icon Standard (v1.1.0 - December 2024)**

**NEW STANDARD:** All section header icons now use an enhanced two-layer design with stronger visual impact.

#### **Implementation Pattern**

```tsx
<div className="flex justify-center items-center mb-6 sm:mb-8">
  <div className="relative">
    {/* Enhanced blur glow layer - extends further with blur-2xl */}
    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/30 dark:to-brand-secondary/30 blur-2xl rounded-full"></div>

    {/* Icon container with multi-color gradient and border */}
    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-brand-primary dark:to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
      <MaterialIcon
        icon="verified"
        size="2xl"
        className="text-white drop-shadow-lg"
      />
    </div>
  </div>
</div>
```

#### **Key Enhancements**

- **Extended blur:** Changed from `inset-0` to `-inset-4` with `blur-2xl` for more prominent glow
- **Multi-color gradient:** Icon container uses 3-color gradient for depth
- **Border definition:** Added `border-2 border-white/50 dark:border-gray-700/50`
- **Stronger shadow:** Upgraded from `shadow-lg` to `shadow-2xl`
- **Icon drop shadow:** Added `drop-shadow-lg` to the icon itself

#### **With Decorative Side Lines (Premium Style)**

For important sections, add decorative gradient lines:

```tsx
<div className="flex items-center justify-center mb-8 gap-4">
  {/* Left decorative line */}
  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-brand-primary rounded-full"></div>

  {/* Enhanced icon (pattern above) */}
  <div className="relative">
    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/30 dark:to-brand-secondary/30 blur-2xl rounded-full"></div>
    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-brand-primary dark:to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
      <MaterialIcon
        icon="verified"
        size="2xl"
        className="text-white drop-shadow-lg"
      />
    </div>
  </div>

  {/* Right decorative line */}
  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-brand-secondary rounded-full"></div>
</div>
```

### Official Icon Color Standards (v1.1.0)

**4 Standard Variants** - Use these for all section headers to maintain consistency:

---

#### **Variant 1: Primary Green (Trust & Values)**

**Use for**: Core values, trust-building sections, foundational content, integrity themes

**Light Mode**: Hunter green tones with professional authority  
**Dark Mode**: Lighter green with enhanced glow for visibility

```tsx
{
  /* Blur glow layer */
}
<div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-primary-dark/20 dark:from-brand-primary/30 dark:to-brand-primary-light/30 blur-2xl rounded-full"></div>;

{
  /* Icon container */
}
<div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker dark:from-brand-primary-light dark:via-brand-primary dark:to-brand-primary-dark p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
  <MaterialIcon
    icon="shield"
    size="2xl"
    className="text-white drop-shadow-lg"
  />
</div>;
```

**SectionHeader Component Usage**:

```tsx
<SectionHeader
  iconVariant="primary"
  icon="shield"
  // ... other props
/>
```

---

#### **Variant 2: Secondary Tan/Orange (Partnership & Relationships)**

**Use for**: Partnership sections, relationship content, community themes, collaboration

**Light Mode**: Warm tan/orange for approachability  
**Dark Mode**: Bronze tones with soft glow

```tsx
{
  /* Blur glow layer */
}
<div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/20 to-bronze-600/20 dark:from-brand-secondary/30 dark:to-bronze-400/30 blur-2xl rounded-full"></div>;

{
  /* Icon container */
}
<div className="relative bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-bronze-700 dark:from-brand-secondary-light dark:via-brand-secondary dark:to-bronze-600 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
  <MaterialIcon
    icon="handshake"
    size="2xl"
    className="text-white drop-shadow-lg"
  />
</div>;
```

**SectionHeader Component Usage**:

```tsx
<SectionHeader
  iconVariant="secondary"
  icon="handshake"
  // ... other props
/>
```

---

#### **Variant 3: Bronze Premium (Excellence & Craftsmanship)**

**Use for**: Awards, achievements, premium services, excellence themes, testimonials

**Light Mode**: Rich bronze/gold for prestige  
**Dark Mode**: Warm bronze with golden highlights

```tsx
{
  /* Blur glow layer */
}
<div className="absolute -inset-4 bg-gradient-to-br from-brand-accent/25 to-bronze-500/25 dark:from-brand-accent/35 dark:to-bronze-400/35 blur-2xl rounded-full"></div>;

{
  /* Icon container */
}
<div className="relative bg-gradient-to-br from-brand-accent via-bronze-700 to-bronze-800 dark:from-bronze-400 dark:via-brand-accent dark:to-bronze-600 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
  <MaterialIcon
    icon="emoji_events"
    size="2xl"
    className="text-white drop-shadow-lg"
  />
</div>;
```

**SectionHeader Component Usage**:

```tsx
<SectionHeader
  iconVariant="bronze"
  icon="emoji_events"
  // ... other props
/>
```

---

#### **Variant 4: Multi-Color Gradient (Featured/Hero Sections)**

**Use for**: Major featured sections, hero content, homepage highlights, signature sections

**Light Mode**: All three brand colors for maximum impact  
**Dark Mode**: Balanced gradient with enhanced visibility

```tsx
{
  /* Blur glow layer */
}
<div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 via-brand-secondary/20 to-bronze-600/20 dark:from-brand-primary/30 dark:via-brand-secondary/30 dark:to-bronze-400/30 blur-2xl rounded-full"></div>;

{
  /* Icon container */
}
<div className="relative bg-gradient-to-br from-brand-primary via-brand-secondary to-bronze-700 dark:from-brand-primary-light dark:via-brand-secondary dark:to-bronze-500 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
  <MaterialIcon icon="stars" size="2xl" className="text-white drop-shadow-lg" />
</div>;
```

**SectionHeader Component Usage**:

```tsx
<SectionHeader
  iconVariant="multi"
  icon="stars"
  // ... other props
/>
```

---

### Choosing the Right Variant

| Content Theme                 | Recommended Variant  | Example Icons                               |
| ----------------------------- | -------------------- | ------------------------------------------- |
| Core values, trust, integrity | **Primary (Green)**  | `shield`, `verified`, `security`            |
| Partnerships, relationships   | **Secondary (Tan)**  | `handshake`, `people`, `diversity_3`        |
| Excellence, awards, quality   | **Bronze Premium**   | `emoji_events`, `workspace_premium`, `star` |
| Featured sections, homepage   | **Multi-Color**      | `construction`, `explore`, `home`           |
| Services, capabilities        | **Primary or Multi** | `engineering`, `build`, `architecture`      |
| Team, community               | **Secondary**        | `groups`, `people`, `volunteer_activism`    |
| Testimonials, reviews         | **Bronze Premium**   | `forum`, `chat`, `reviews`                  |
| Safety, compliance            | **Primary (Green)**  | `health_and_safety`, `verified_user`        |

### Usage Guidelines for Icon Variants

**Best Practices**:

1. **Consistency within page**: Use the same variant for similar-level sections
2. **Hierarchy through color**: Primary for main sections, Bronze for premium/special sections
3. **Multi-color sparingly**: Reserve for 1-2 hero/featured sections per page
4. **Dark mode testing**: Always verify variants work well in both modes
5. **Icon pairing**: Choose icons that match the section theme (see table above)

**Common Patterns**:

- **Homepage**: Multi-color for hero sections, Primary for values, Secondary for services
- **About Page**: Primary for values/mission, Bronze for awards/achievements
- **Services Page**: Primary for service categories, Secondary for partner benefits
- **Contact Page**: Secondary for relationship-building sections

**⚠️ Avoid**:

- Mixing all 4 variants randomly on one page (creates visual chaos)
- Using Multi-color for every section (loses impact)
- Ignoring the semantic meaning of colors (e.g., Bronze for basic content)

---

### Icon Selection Guide

Choose icons that relate to section content:

| Section Type  | Recommended Icons                                | Recommended Variant |
| ------------- | ------------------------------------------------ | ------------------- |
| Core Values   | `shield`, `verified`, `stars`                    | Primary             |
| Services      | `construction`, `engineering`, `handyman`        | Primary or Multi    |
| Team          | `groups`, `people`, `diversity_3`                | Secondary           |
| Safety        | `security`, `verified_user`, `health_and_safety` | Primary             |
| Awards        | `emoji_events`, `trophy`, `workspace_premium`    | Bronze              |
| Testimonials  | `forum`, `chat`, `reviews`                       | Bronze              |
| News/Blog     | `article`, `newspaper`, `feed`                   | Secondary           |
| Partnerships  | `handshake`, `diversity_3`, `people`             | Secondary           |
| Featured/Hero | `home`, `explore`, `stars`                       | Multi               |

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
