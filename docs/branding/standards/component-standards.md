# MH Construction Component Standards

**Version:** 6.0.0  
**Last Updated:** December 25, 2025  
**Status:** ✅ Active Standard - Modern Card System

> **Purpose:** Unified component design system ensuring visual consistency across all website elements using
> our brand guidelines. **NEW:** Modern card components with animated border glows, top accent bars, and
> enhanced icon system for a premium, cohesive user experience.

---

## 📋 **Recent Updates**

### **Version 6.0.0 (December 25, 2025)** - MAJOR CARD REDESIGN

- **BREAKING:** Replaced `<Card>` components with modern animated card structure
- **NEW:** Animated border glow effect with `blur-xl` and pulse animation on hover
- **NEW:** Top accent bars (2px gradient) for brand identity on all cards
- **NEW:** Enhanced icon system with nested blur glow layers and white text
- **NEW:** Unified hover effects: border transparency, shadow enhancement, card lift
- **NEW:** Theme-based color variants (primary green, secondary bronze, **emergency orange-red**, **government grayscale**)
- **NEW:** Emergency color scheme for `/urgent` page - orange-red gradients with trust balance
- **NEW:** Government grayscale scheme for `/public-sector` page - professional institutional authority
- **MIGRATION:** All 10+ pages updated to modern card pattern
- **DEPRECATED:** Old `<Card>`, `<CardHeader>`, `<CardContent>` pattern phased out

### **Version 5.0.0 (December 15, 2025)** - BREAKING CHANGES

- **NEW STANDARD:** Diagonal stripe background pattern for all sections
- **NEW STANDARD:** Large positioned color blobs (w-96 h-96) replace small animated blobs
- **REQUIRED:** Custom header pattern (icon with decorative lines + two-line gradient heading + description)
- **BREAKING:** Removed brand-accent color usage - use brand-primary or brand-secondary
- **BREAKING:** Simplified base backgrounds - no complex gradients
- **BREAKING:** Consistent padding standard: `py-12 sm:py-16 lg:py-20 xl:py-24`

### **Version 4.1.0 (December 14, 2025)**

- Added enhanced layered icon design standard
- Documented two-layer icon pattern with blur glow
- Specified color variations for bronze, green, and tan accents
- Provided usage guidelines for section headers vs. cards

---

## 🎨 **Core Component Principles**

### **Brand Color Integration - UPDATED**

**Official MH Brand Colors:**

- **Primary (Hunter Green):** `#386851` - Use for trust, integrity, primary actions, check marks
- **Secondary (Leather Tan):** `#BD9264` - Use for large text (18pt+), backgrounds, partnerships, highlights
- **Secondary Text (Accessible Tan):** `#8a6643` - WCAG AA compliant for normal text on white backgrounds
- **Supporting Colors:** Black, White, Gray scale only

**Accessibility Standards (Updated Dec 26, 2025):**

The original Leather Tan (#BD9264) has 2.82:1 contrast on white, which fails WCAG AA for normal text.
Use these guidelines to maintain brand identity while ensuring accessibility:

**Tailwind CSS Classes:**

```tsx
// ✅ CORRECT - Large text (18pt+) uses original color
<h1 className="text-4xl text-brand-secondary">Large Heading</h1>

// ✅ CORRECT - Normal text uses accessible variant
<p className="text-brand-secondary-text">Body text</p>
<p className="text-secondary-700">Alternative approach</p>

// ✅ CORRECT - White text on dark background
<button className="bg-secondary-700 text-white">Submit</button>

// ✅ CORRECT - Hunter Green (always accessible)
<p className="text-brand-primary">Green text (6.43:1 contrast)</p>

// ✅ CORRECT - Backgrounds and decorative elements
<div className="bg-brand-secondary border-brand-secondary">
  <span className="text-white">Content</span>
</div>

// ❌ INCORRECT - Normal text with poor contrast
<p className="text-brand-secondary">Small text fails WCAG AA</p>

// ❌ INCORRECT - White text on light background
<button className="bg-brand-secondary text-white">Poor contrast</button>

// ❌ DEPRECATED - DO NOT USE
text-brand-accent      // Removed - inconsistent
bg-brand-accent        // Use bg-brand-secondary instead
from-brand-accent      // Use from-brand-secondary in gradients
```

**Contrast Requirements:**

| Color Combination | Ratio  | WCAG AA                                 | Use Case              |
| ----------------- | ------ | --------------------------------------- | --------------------- |
| #BD9264 on white  | 2.82:1 | ❌ Normal text<br>✅ Large text (18pt+) | Headlines, decorative |
| #8a6643 on white  | 4.59:1 | ✅ All text sizes                       | Body copy, buttons    |
| White on #8a6643  | 5.17:1 | ✅ All text sizes                       | Buttons, badges       |
| #386851 on white  | 6.43:1 | ✅ All text sizes                       | Primary elements      |

**Key Rules:**

- ✅ NO Gradients in UI elements (buttons, cards) - Solid colors only
- ✅ Check marks use `text-brand-primary`
- ✅ Large headings (18pt+) can use `text-brand-secondary`
- ✅ Body text and normal size use `text-brand-secondary-text` or `text-secondary-700`
- ✅ Buttons with white text use `bg-secondary-700` or darker
- ✅ Partnership/veteran highlights use accessible variants
- ❌ NEVER use brand-accent - causes visual inconsistency
- ❌ NEVER use `text-brand-secondary` for normal-sized text on white

See [Color System](./color-system.md) for complete accessibility guidelines.

### **Emergency/Urgent Color Scheme - NEW**

**Context:** The `/urgent` emergency response page uses a specialized color palette
to convey urgency while maintaining brand trust.

**Emergency Colors:**

```tsx
// Emergency Primary - Orange
text - orange - 600; // #ea580c
bg - orange - 600; // Used in gradients and accents
border - orange - 600; // Card accents, borders

// Emergency Accent - Red
text - red - 600; // #dc2626
bg - red - 600; // Gradient transitions
border - red - 600; // Critical emphasis

// Emergency Highlight - Yellow
text - yellow - 300; // #fde047
bg - yellow - 300; // Timeframe indicators
```

**Emergency CTA Buttons:**

```tsx
// Primary emergency action
className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600
  hover:from-orange-700 hover:via-red-700 hover:to-orange-800
  text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl
  transition-all duration-300"
```

**Emergency Card Accent Bars:**

```tsx
// Top accent bar for emergency-themed cards
className="absolute top-0 left-0 right-0 h-0.5
  bg-gradient-to-r from-orange-600 via-red-600 to-orange-600"
```

**Emergency Icon Containers:**

```tsx
// Glow layer
className="absolute -inset-4
  bg-gradient-to-br from-orange-600/30 to-red-600/30 blur-2xl"

// Container
className="relative bg-gradient-to-br from-orange-600 via-red-600 to-orange-700
  p-4 rounded-2xl"
```

**Trust Balance Philosophy:**

- ✅ **Use emergency colors** for: CTAs, response timeline badges, urgent actions, section headers on emergency content
- ✅ **Use brand green** for: Trust signals, certifications, safety records, credentials, licensing info
- ❌ **Never use** emergency colors on: Standard service pages, general contact forms, non-emergency content

**Required Trust Signal Integration:**

When using emergency colors, MUST include nearby brand green trust elements:

```tsx
{
  /* Emergency CTA */
}
<button className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 ...">
  Call Emergency Line Now
</button>;

{
  /* Trust Signal - Brand Green */
}
<div className="mt-6 flex items-center gap-4">
  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker">
    <MaterialIcon icon="verified_user" className="text-white" />
  </div>
  <span>Licensed WA, OR, ID</span>
</div>;
```

**Usage Rules:**

- ✅ ONLY on `/urgent` emergency response page
- ✅ Contractor-focused rapid deployment context
- ✅ Always pair with response timeframes
- ✅ Include trust signals using brand green
- ❌ NOT for general emergencies or consumer panic
- ❌ NOT on standard service/contact pages

### **Government/Public Sector Grayscale Scheme - NEW**

**Context:** The `/public-sector` government contracting page uses a professional grayscale
palette to convey authority, compliance, and institutional reliability.

**Grayscale Colors:**

```tsx
// Grayscale Primary - Slate Gray
text - slate - 600; // #475569
bg - slate - 600; // Used in gradients
border - slate - 600; // Card accents

// Grayscale Accent - Cool Gray
text - gray - 700; // #374151
bg - gray - 700; // Gradient transitions

// Grayscale Dark - Charcoal
text - gray - 800; // #1f2937
bg - gray - 800; // Dark sections
```

**Government CTA Buttons:**

```tsx
// Primary government action
className="bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600
  hover:from-slate-700 hover:via-gray-800 hover:to-slate-700
  text-white font-medium px-6 py-3 rounded-lg shadow-lg hover:shadow-xl
  transition-all duration-300"
```

**Government Card Accent Bars:**

```tsx
// Top accent bar for government-themed cards
className="absolute top-0 left-0 right-0 h-0.5
  bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600"
```

**Government Icon Containers:**

```tsx
// Glow layer
className="absolute -inset-4
  bg-gradient-to-br from-slate-600/30 to-gray-700/30 blur-2xl"

// Container
className="relative bg-gradient-to-br from-slate-600 via-gray-700 to-gray-800
  p-4 rounded-2xl"
```

**Professional Balance Philosophy:**

- ✅ **Use grayscale** for: CTAs, institutional headers, compliance sections, federal authority
- ✅ **Use brand green** for: Veteran credentials, safety records, trust signals
- ✅ **Use bronze** for: Military heritage, veteran designation, service recognition
- ❌ **Never use** grayscale on: Commercial pages, residential services, general contact forms

**Required Veteran Signal Integration:**

When using grayscale, MUST include nearby brand green/bronze veteran elements:

```tsx
{
  /* Government CTA */
}
<button className="bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600 ...">
  Request Grant Support
</button>;

{
  /* Veteran Trust Signals - Brand Green & Bronze */
}
<div className="mt-6 grid grid-cols-2 gap-6">
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
      <MaterialIcon icon="military_tech" className="text-white" />
    </div>
    <div>
      <p className="text-sm font-bold">Veteran-Owned</p>
      <p className="text-xs text-gray-600">Army Leadership</p>
    </div>
  </div>
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker flex items-center justify-center">
      <MaterialIcon icon="health_and_safety" className="text-white" />
    </div>
    <div>
      <p className="text-sm font-bold">.64 EMR Safety</p>
      <p className="text-xs text-gray-600">40% Better</p>
    </div>
  </div>
</div>;
```

**Usage Rules:**

- ✅ ONLY on `/public-sector` government contracting page
- ✅ Federal compliance and DOE/Hanford contexts
- ✅ Always pair with veteran credentials (green/bronze)
- ✅ Include safety and licensing trust signals
- ❌ NOT for commercial construction or emergency services
- ❌ NOT on residential or general service pages

### **Material Icons Only**

- **NO EMOJIS:** Use Material Icons exclusively
- **Standard Sizes:** `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`
- **Consistent Spacing:** `mr-2`, `mr-3`, `mr-4` for icon-text combinations

### **Card Grid Layout Standards**

- **Large Screens (lg):** 3 cards per row optimal (standard sections)
- **Extra Large (xl):** Use `xl:grid-cols-4` for 6+ card sets
- **Tablet (md):** 2 cards per row
- **Mobile:** 1 card per row (stack vertically)
- **Spacing:** `gap-6 lg:gap-8` for consistent card spacing

**Examples:**

- 6 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3` (prefer 3-wide)
- 4 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4`
- 3 cards: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`

**LAYOUT PHILOSOPHY:** Prefer 3-4 columns on large screens rather than multiple rows for better visual
balance and cleaner layout.

---

## � **Section Background Standards - NEW REQUIREMENT**

**CRITICAL:** All page sections MUST follow this standardized background pattern established by the home page.

### **Required Section Structure**

```tsx
<section
  id=\"section-id\"
  className=\"relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden\"
>
  {/* Diagonal Stripe Background Pattern - REQUIRED */}
  <div className=\"absolute inset-0 opacity-[0.03] dark:opacity-[0.05]\">
    <div
      className=\"absolute inset-0\"
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
  <div className=\"absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full\"></div>
  <div className=\"absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full\"></div>

  <div className=\"relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl\">
    {/* Content goes here */}
  </div>
</section>
```

### **Background Pattern Rules**

**✅ REQUIRED:**

- Base: `bg-white dark:bg-gray-900` (solid, no gradients)
- Padding: `py-12 sm:py-16 lg:py-20 xl:py-24` (consistent responsive)
- Diagonal stripes: Hunter Green (#386851), 45deg angle
- Large blobs: `w-96 h-96` at `top-20 right-[15%]` and `bottom-20 left-[15%]`
- Overflow hidden: Always include for background effects

**❌ DEPRECATED - DO NOT USE:**

- Complex gradients: `from-white via-gray-50 to-white`
- Radial gradient overlays
- Small animated blobs (`w-32`, `w-40` with `animate-pulse`)
- Inconsistent padding: `py-20 lg:py-32`

---

## 📝 **Section Header Standards - HOME PAGE PATTERN**

**OFFICIAL STANDARD:** Home page sections use a consistent custom header pattern
with icon, decorative lines, two-line gradient heading, and description.

### **Standard Custom Header Pattern**

````tsx
{
  /* Section Header - Military Construction Standard */
}
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
</div>;

### **Two-Line Heading Implementation Details**

**Critical Requirements for Gradient Text:**

```tsx
{/* Container - MUST include overflow-visible */}
<h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">

  {/* First Line - Subtitle - Solid Color */}
  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
    Subtitle Text
  </span>

  {/* Second Line - Main Title - Gradient */}
  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
    Main Title Text
  </span>
</h2>
````

**Why `overflow-visible` is Critical:**

- **Without it:** Gradient text gets clipped at edges, especially on larger screens
- **Container:** Add to parent `<h2>` element
- **Both Lines:** Add to both `<span>` elements
- **Result:** Ensures gradient renders completely without clipping

**Padding Values Explained:**

- **Subtitle:** `py-1` - Minimal padding, keeps tight spacing
- **Main Title:** `py-2 pb-3` - Top padding `py-2` for breathing room, extra bottom padding `pb-3` for gradient visibility
- **Purpose:** Creates proper visual separation while preventing gradient clipping

**Line Height Differences:**

- **Container:** `leading-relaxed` - Base comfortable line height
- **Subtitle:** Uses container's `leading-relaxed` (inherited)
- **Main Title:** `leading-normal` - Override to tighter spacing for gradient impact
- **Why Different:** Gradient text needs tighter leading to appear more cohesive

**Typography Scaling:**

- **Container:** `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- **Subtitle:** `text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl` (one size smaller)
- **Ratio:** Subtitle is approximately 70% the size of the main title
- **Maintains proportion** across all breakpoints

### **Key Elements**

- ✅ Decorative horizontal lines flanking the icon
- ✅ Icon with glow effect and gradient background
- ✅ Two-line heading: subtitle (gray) + gradient title
- ✅ Description with optional keyword highlighting
- ✅ Fully responsive typography scaling

### **Icon Color Variations**

- **Green theme:** `from-brand-primary via-brand-primary-dark to-brand-primary-darker`
- **Bronze theme:** `from-brand-secondary via-bronze-700 to-bronze-800`
- **Tan theme:** `from-brand-secondary via-brand-secondary-dark to-bronze-700`

### **Standard Usage**

<SectionHeader
icon=\"icon_name\"
iconVariant=\"primary\" // primary | secondary | bronze
subtitle=\"Section Subtitle\"
title=\"Section Title\"
description=\"Optional description text\"
/>

````tsx

### **Icon Variant Guidelines**

- **`primary`** (Green): Trust, values, integrity, safety, compliance
- **`secondary`** (Tan): Partnerships, relationships, community
- **`bronze`** (Gold): Awards, excellence, premium features, achievements

### **Benefits**

- ✅ Consistent styling, animations, and responsive design
- ✅ Standardized icon glow effects and typography
- ✅ Automatic dark mode support
- ✅ Proper spacing and alignment


---

## �🔘 **Button Component Standards**

### **Required Pattern**

```tsx
<Button
  variant="primary|secondary|outline|neutral"
  size="sm|default|lg|xl"
  className="group transition-all duration-300"
>
  <MaterialIcon icon="icon_name" className="mr-2 group-hover:scale-110" />
  Button Text
</Button>
````

### **Touch Accessibility**

- **Minimum Height:** 44px (WCAG compliant)
- **Interactive States:** hover, focus, active
- **Disabled States:** 50% opacity, no hover effects

### **Spacing Standards**

- **Icon Spacing:** `mr-2` (small), `mr-3` (medium), `mr-4` (large)
- **Button Gaps:** `gap-3` between multiple buttons
- **Container Margins:** `mb-6` for button groups

---

## 🎴 **Card Component Standards**

### **Modern Card Structure - CURRENT STANDARD (December 2025)**

**BREAKING CHANGE:** Replaced `<Card>` components with custom div structure for enhanced visual control and animated effects.

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

### **Card Component Requirements**

**Structure:**

- **Outer wrapper:** `group relative flex h-full` - enables group hover and flexible height
- **Animated glow:** Absolute positioned `blur-xl` gradient layer that pulses on hover
- **Inner card:** Relative positioned with rounded corners, borders, and shadow effects
- **Top accent bar:** 2px height gradient strip for brand identity
- **Content padding:** `p-6 sm:p-8` responsive padding
- **Flex layout:** `flex flex-col flex-1` for proper content distribution

**Animation Effects:**

- **Border glow:** `opacity-20` default, `opacity-100` on hover with `animate-pulse`
- **Card lift:** `group-hover:-translate-y-1` for subtle elevation effect
- **Border transition:** `border-gray-200` to `border-transparent` on hover
- **Shadow enhancement:** `shadow-lg` to `shadow-2xl` on hover
- **Icon scale:** `group-hover:scale-110` for icon emphasis

**Typography Standards:**

- **Titles:** `text-lg sm:text-xl md:text-2xl font-bold`
- **Body text:** `text-sm sm:text-base md:text-lg` with `leading-relaxed`
- **Links:** `text-xs sm:text-sm font-medium`

**Color Theming:**

- **Primary theme:** `from-brand-primary/40 to-brand-primary-dark/40` for main features
- **Secondary theme:** `from-brand-secondary/40 to-bronze-700/40` for partnerships/veteran content
- **Bronze theme:** `from-bronze-700/40 to-bronze-800/40` for veteran initiatives
- **Orange theme:** `from-orange-500/40 to-orange-700/40` for urgent/emergency content

### **Card Variants by Theme**

**Primary (Green) Cards:**

```tsx
{
  /* Animated Border Glow */
}
<div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>;

{
  /* Top Accent Bar */
}
<div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>;

{
  /* Icon Background */
}
<div className="relative rounded-xl bg-gradient-to-br from-brand-primary to-brand-primary-dark p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
  <MaterialIcon
    icon="icon_name"
    size="xl"
    className="text-white drop-shadow-lg"
  />
</div>;
```

**Secondary (Bronze/Tan) Cards:**

```tsx
{
  /* Animated Border Glow */
}
<div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/40 to-bronze-700/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse"></div>;

{
  /* Top Accent Bar */
}
<div className="h-2 bg-gradient-to-r from-brand-secondary via-bronze-700 to-brand-secondary"></div>;

{
  /* Icon Background */
}
<div className="relative rounded-xl bg-gradient-to-br from-brand-secondary to-bronze-700 p-3 shadow-xl group-hover:scale-110 transition-all duration-300">
  <MaterialIcon
    icon="icon_name"
    size="xl"
    className="text-white drop-shadow-lg"
  />
</div>;
```

**Emergency/Urgent Theme Cards (Orange Accents) - URGENT PAGE ONLY:**

```tsx
{
  /* Animated Border Glow - Orange Accent Colors */
}
<div className="absolute -inset-2 bg-gradient-to-r from-orange-500/40 to-orange-600/40 rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-300"></div>;

{
  /* Top Accent Bar - Orange Gradient */
}
<div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-t-2xl"></div>;

{
  /* Icon Container - Orange Gradient */
}
<div className="mb-4 relative inline-block">
  <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-orange-600/30 blur-2xl rounded-full"></div>
  <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary w-16 h-16 rounded-2xl flex items-center justify-center">
    <MaterialIcon
      icon="bolt"
      size="2xl"
      className="text-white drop-shadow-lg"
      aria-label="Emergency response"
    />
  </div>
</div>;
```

**Context:** Emergency/urgent page uses standard MH backgrounds (white/gray) with orange accent colors and alternating orange/red diagonal stripe patterns to convey urgency while maintaining brand consistency.

**Usage Rules:**

- ✅ ONLY use on `/urgent` emergency response page
- ✅ For rapid deployment, 24/7 response, emergency capabilities cards
- ✅ Standard white/gray MH backgrounds with orange/red stripe patterns
- ✅ Orange gradients for icons and positive capability indicators
- ✅ Red accents ONLY for "What We Don't Provide" exclusion indicators
- ✅ Pair with response timeframe indicators (orange-600 badges)
- ✅ Include nearby trust signal cards using standard brand theme
- ❌ NOT for standard service pages
- ❌ NOT for general contact or about pages
- ❌ NO red backgrounds (use standard MH backgrounds)

**Trust Balance Example:**

```tsx
{
  /* Emergency capability cards - Orange accent theme on standard backgrounds */
}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
  {urgentCapabilities.map((capability) => (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6">
      {/* Orange border glow */}
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 
        rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-300"
      ></div>
      {/* Orange top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700"></div>
      {/* Content with orange icon */}
      <div className="relative">
        <div className="mb-4 relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-br from-orange-500/30 to-orange-600/30 blur-2xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-brand-primary w-16 h-16 rounded-2xl flex items-center justify-center">
            <MaterialIcon
              icon={capability.icon}
              size="2xl"
              className="text-white"
              aria-label={capability.ariaLabel}
            />
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {capability.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {capability.description}
        </p>
      </div>
    </div>
  ))}
</div>;

{
  /* Trust signal cards - Brand Green theme */
}
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {trustSignals.map((signal) => (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6">
      {/* Brand green border glow */}
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary 
        rounded-2xl opacity-20 group-hover:opacity-60 blur-xl transition-all duration-300"
      ></div>
      {/* Brand green top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary"></div>
      {/* Content with brand green icon */}
      <div className="relative text-center">
        <div className="mb-3 mx-auto relative inline-block">
          <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker w-16 h-16 rounded-2xl flex items-center justify-center">
            <MaterialIcon
              icon={signal.icon}
              size="2xl"
              className="text-white"
              aria-label={signal.ariaLabel}
            />
          </div>
        </div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1">
          {signal.title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400">
          {signal.description}
        </p>
      </div>
    </div>
  ))}
</div>;
```

### **DEPRECATED: Old Card Pattern**

**DO NOT USE:** The following pattern is deprecated and being phased out:

```tsx
// ❌ DEPRECATED - Do not use
<Card className="border-l-4 border-l-brand-primary">
  <CardContent className="pt-6">{/* content */}</CardContent>
</Card>
```

**Migration Note:** All pages have been updated to use the modern card structure with animated border
glows, top accent bars, and enhanced icons.

### **Card Flip Implementation (3D Transform)**

**CRITICAL:** Card flips should NOT use internal scrolling. All content must fit within the card height
for clean UX with single main page scroll.

```tsx
<div
  className="group perspective h-[400px] cursor-pointer"
  style={{ perspective: "1000px" }}
>
  <div
    className="relative w-full h-full transition-transform duration-700 preserve-3d 
    group-hover:rotate-y-180"
  >
    {/* Front of card */}
    <div className="absolute inset-0 backface-hidden">
      <Card
        className="bg-white dark:bg-gray-800 border border-gray-200 
        dark:border-gray-700 h-full"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center mb-4">
            <MaterialIcon
              icon="icon_name"
              className="mr-3 text-brand-primary text-4xl"
            />
          </div>
          <CardTitle className="mb-2 text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl">
            Card Title
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p
            className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg 
            leading-relaxed mb-6"
          >
            Front card description
          </p>
          <div className="flex items-center justify-center mt-8 text-brand-primary">
            <MaterialIcon
              icon="autorenew"
              className="mr-2 text-xl sm:text-2xl animate-pulse"
            />
            <span className="font-medium text-xs sm:text-sm">
              Hover to see more
            </span>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Back of card */}
    <div
      className="absolute inset-0 backface-hidden rotate-y-180"
      style={{ transform: "rotateY(180deg)" }}
    >
      <Card
        className="bg-gradient-to-br from-brand-primary to-brand-primary-dark 
        dark:from-brand-primary-dark dark:to-gray-900 border border-brand-primary 
        dark:border-brand-primary/50 h-full"
      >
        <CardHeader className="pb-4">
          <div className="flex items-center mb-4">
            <MaterialIcon
              icon="checklist"
              className="mr-2 text-brand-secondary text-2xl sm:text-3xl"
            />
            <p className="font-bold text-white text-base sm:text-lg md:text-xl">
              Details:
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3">
            <li className="flex items-start">
              <MaterialIcon
                icon="check_circle"
                className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary text-base sm:text-lg"
              />
              <span className="text-white leading-relaxed text-xs sm:text-sm md:text-base">
                Detail item
              </span>
            </li>
          </ul>
          <div className="flex items-center justify-center mt-6 text-brand-secondary">
            <MaterialIcon
              icon="autorenew"
              className="mr-2 text-lg sm:text-xl"
            />
            <span className="font-medium text-xs">Hover to return</span>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</div>
```

#### Card Flip Requirements

- **Fixed Height:** Use `h-[400px]` or `h-[450px]` for consistent card dimensions
- **NO Internal Scroll:** ❌ Never use `overflow-y-auto` or `max-h-[]` on card content
- **Content Fitting:** All content must fit within fixed height naturally
- **Responsive Text:** Use `text-xs sm:text-sm md:text-base` for back content to fit better
- **Single Main Scroll:** Only the page scrolls, not individual cards
- **3D Transform:** Required classes: `perspective`, `preserve-3d`, `backface-hidden`, `rotate-y-180`
- **Smooth Animation:** Use `duration-700` for comfortable flip timing

### **Card Typography Standards**

```tsx
{/* Card Titles - Responsive */}
<CardTitle className="text-lg sm:text-xl md:text-2xl">

{/* Card Body Text - Standard */}
<p className="text-sm sm:text-base md:text-lg">

{/* Card Fine Print - Flip Backs */}
<span className="text-xs sm:text-sm md:text-base">
```

### **Card Variants**

- **Standard Cards:** `p-8`, `rounded-3xl`
- **Compact Cards:** `p-6`, `rounded-2xl`
- **Feature Cards:** `p-10`, `rounded-3xl`

---

## 📝 **Form Component Standards**

### **Input Field Pattern**

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

### **Form Submission Standards**

```tsx
<div className="flex gap-3 justify-end">
  <Button variant="outline" size="default">
    Cancel
  </Button>
  <Button variant="primary" size="default" type="submit">
    <MaterialIcon icon="check" className="mr-2" />
    Submit Form
  </Button>
</div>
```

---

## 🚀 **Animation & Interaction Standards**

### **Standard Transitions**

- **Duration:** `duration-300` (consistent across all components)
- **Easing:** `ease-out` for natural feel
- **Hover Effects:** `hover:scale-105`, `hover:shadow-2xl`
- **Focus States:** `focus:ring-2 focus:ring-brand-primary`

### **Group Interactions**

```tsx
className = "group";
// Icon animations within groups
className = "group-hover:scale-110 transition-transform duration-300";
// Text animations within groups
className = "group-hover:text-brand-primary transition-colors duration-300";
```

---

## 📱 **Responsive Component Standards**

### **Mobile-First Approach**

- **Base:** Mobile (320px+)
- **sm:** Small screens (640px+)
- **md:** Tablets (768px+)
- **lg:** Desktop (1024px+)

### **Touch Optimization**

- **Minimum Touch Targets:** 44px height
- **Touch Class:** `touch-manipulation` on all interactive elements
- **Tap Feedback:** Visual feedback on touch interactions

### **Grid Responsiveness**

```tsx
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8";
```

---

## 🎯 **Section Component Standards**

### **Enhanced Icon Standard (v4.1.0 - December 2025)**

**NEW STANDARD:** All section header icons should use this enhanced layered design for visual
consistency and professional appearance.

#### **Header Icon Pattern**

```tsx
{
  /* Enhanced Section Icon with Layered Design */
}
<div className="relative">
  {/* Blur glow layer behind icon */}
  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 dark:from-brand-primary/30 dark:to-brand-secondary/30 blur-2xl rounded-full"></div>

  {/* Icon container with gradient background */}
  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-brand-primary dark:to-bronze-700 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50">
    <MaterialIcon
      icon="verified"
      size="2xl"
      className="text-white drop-shadow-lg"
    />
  </div>
</div>;
```

#### **Card Icon Pattern (Smaller)**

```tsx
{
  /* Enhanced Card Icon with Layered Design */
}
<div className="relative">
  {/* Blur glow layer behind icon */}
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary to-brand-primary-dark opacity-30 blur-lg rounded-2xl"></div>

  {/* Icon container */}
  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-700/50 group-hover:scale-110 transition-all duration-300">
    <MaterialIcon
      icon="emoji_events"
      size="xl"
      className="text-white drop-shadow-lg"
    />
  </div>
</div>;
```

#### **Key Features**

- **Two-layer design:** Blur glow behind + solid icon container
- **Gradient backgrounds:** Uses brand colors (primary, secondary, bronze)
- **Border definition:** `border-2 border-white/50 dark:border-gray-700/50`
- **Enhanced shadows:** `shadow-2xl` for depth
- **Drop shadow on icon:** `drop-shadow-lg` on the icon itself
- **Rounded corners:** `rounded-2xl` for modern appearance
- **Responsive sizing:** Header icons larger (`p-5 size="2xl"`), card icons smaller (`w-16 h-16 size="xl"`)

#### **Color Variations**

**Bronze Accent:**

```tsx
bg-gradient-to-br from-bronze-600 to-bronze-700
blur layer: from-bronze-600 to-bronze-700 opacity-30
```

**Green Accent:**

```tsx
bg-gradient-to-br from-brand-primary to-brand-primary-dark
blur layer: from-brand-primary to-brand-primary-dark opacity-30
```

**Tan Accent:**

```tsx
bg-gradient-to-br from-brand-secondary to-brand-secondary-dark
blur layer: from-brand-secondary to-brand-secondary-dark opacity-30
```

#### **Usage Guidelines**

- **Section Headers:** Use larger icon with decorative lines
- **Cards:** Use smaller icon without decorative lines
- **Always include:** Both blur layer and icon container
- **Hover effects:** Add `group-hover:scale-110 transition-all duration-300` for cards
- **Dark mode:** Adjust blur opacity for visibility

---

### **Enhanced Section Header Standard (v4.1.0 - December 2025)**

**Complete header pattern with enhanced visual hierarchy and brand color integration.**

#### **Full Header Implementation**

```tsx
<div className="mb-16 sm:mb-20 lg:mb-24 text-center">
  {/* Icon with decorative lines */}
  <div className="flex items-center justify-center mb-8 gap-4">
    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-brand-primary rounded-full"></div>
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
    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-brand-secondary rounded-full"></div>
  </div>

  {/* Heading with gradient text */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
    <span className="block mb-3 sm:mb-4 font-semibold bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
      Section Context
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-bronze-600 to-brand-secondary bg-clip-text text-transparent font-black drop-shadow-lg">
      Main Title
    </span>
  </h2>

  {/* Description with colored inline spans */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Description text with{" "}
    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
      green highlighted terms
    </span>
    ,{" "}
    <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
      tan highlighted terms
    </span>
    , and{" "}
    <span className="font-bold text-bronze-600 dark:text-bronze-400">
      bronze highlighted terms
    </span>{" "}
    for emphasis.
  </p>

  {/* Optional: Callout box for taglines/quotes */}
  <div className="mt-10 sm:mt-12 inline-block">
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-600 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative bg-white dark:bg-gray-800 px-8 py-6 rounded-xl border-2 border-brand-primary/20 dark:border-brand-primary/30 shadow-xl">
        <p className="font-bold text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl text-center leading-relaxed">
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

#### **Typography Specifications**

**Main Heading:**

- Font weight: `font-black` (900)
- Responsive sizes: `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Line height: `leading-tight`
- Tracking: `tracking-tighter`

**Context Line (Subtitle):**

- Font weight: `font-semibold` (600)
- Responsive sizes: `text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- Tracking: `tracking-tight`
- Gradient text: `bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent`

**Main Title Line:**

- Font weight: `font-black` (900)
- Gradient: `bg-gradient-to-r from-brand-primary via-bronze-600 to-brand-secondary bg-clip-text text-transparent`
- Drop shadow: `drop-shadow-lg`

**Description:**

- Font weight: `font-light` (300)
- Max width: `max-w-5xl`
- Responsive sizes: `text-base sm:text-lg md:text-xl lg:text-2xl`
- Line height: `leading-relaxed`
- Tracking: `tracking-wide`

#### **Color Specifications**

**Gradient Text Colors:**

- Three-color gradient: `from-brand-primary via-brand-secondary to-brand-primary`
- Alternative: `from-brand-primary via-bronze-600 to-brand-secondary`

**Inline Highlight Colors:**

- Green: `text-brand-primary dark:text-brand-primary-light`
- Tan: `text-brand-secondary dark:text-brand-secondary-light`
- Bronze: `text-bronze-600 dark:text-bronze-400`

**Callout Box:**

- Background: `bg-white dark:bg-gray-800`
- Border: `border-2 border-brand-primary/20 dark:border-brand-primary/30`
- Glow: `bg-gradient-to-r from-brand-primary via-brand-secondary to-bronze-600 rounded-2xl blur-sm opacity-75`

#### **Spacing Standards**

- Header margin bottom: `mb-16 sm:mb-20 lg:mb-24`
- Icon to heading: `mb-8`
- Heading to description: `mb-6 sm:mb-8`
- Description to callout: `mt-10 sm:mt-12`
- Inline span spacing: Use `{" "}` for proper word spacing around spans

#### **Usage Guidelines**

- **Always include:** Icon with decorative lines, gradient headings, and description
- **Optional:** Callout box for important taglines or quotes
- **Gradient text:** Must be used on both context and main title lines
- **Inline highlights:** Use all three brand colors for visual variety
- **Responsive:** All text sizes must scale across breakpoints
- **Dark mode:** Ensure all colors have dark mode variants

---

### **Hero Section Structure (For Photo/Video Backgrounds)**

**UPDATED:** November 4, 2025 - v4.0.2 Hero Standards

**CRITICAL REQUIREMENTS:**

- ✅ **NO badges** or bubble containers (veteran badges, decorative badges)
- ✅ **NO CTA buttons** (Schedule, Get Estimate, Contact buttons)
- ✅ **NO stats/cards** (30+ years, 100+ projects displays)
- ✅ **NO trust indicators** (satisfaction rates, project counts)
- ✅ **Content ONLY**: Title, subtitle, description text
- ✅ **Navigation at bottom**: PageNavigation at `absolute bottom-0` with section anchors only (Dec 2025)
- ✅ **Section IDs required**: All navigable sections must have unique `id` attributes
- ✅ **No cross-page links**: PageNavigation only links to `#section-id` within same page
- ✅ **Full viewport height**: `h-screen flex items-center justify-center`

```tsx
<section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

  {/* Content - CLEAN AND SIMPLE */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">
      {/* Main Title - USE BRAND COLOR */}
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
        <span className="block text-brand-secondary font-black drop-shadow-lg">
          Page Title Content
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
        Tagline or key message
      </p>

      {/* Description */}
      <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
        "Building projects for the client, NOT the dollar" — Supporting
        description with partnership language
      </p>
    </div>
  </div>

  {/* Page Navigation - ALWAYS AT BOTTOM - Section Anchors Only (Dec 2025) */}
  <PageNavigation
    items={navigationConfigs.pageName}  {/* Config must use #section-id format */}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

### **Standard Section Structure**

```tsx
<section className="relative py-12 lg:py-16 bg-white dark:bg-gray-900">
  {/* Background decorative elements */}
  <div
    className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white 
    dark:from-gray-800 dark:to-gray-900"
  ></div>
  <div
    className="absolute top-20 right-20 bg-brand-primary/5 blur-3xl 
    rounded-full w-32 h-32"
  ></div>

  {/* Content container */}
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Section Header */}
    <div className="mb-10 lg:mb-12 text-center">
      <h2
        className="mb-6 font-black text-gray-900 dark:text-gray-100 
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter"
      >
        <span
          className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 
          text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight"
        >
          Section Context
        </span>
        <span className="block text-brand-primary">Section Title</span>
      </h2>
      <p
        className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 
        text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide"
      >
        Section description
      </p>
    </div>

    {/* Section Content */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {/* Cards or content - Use 3-4 cards per row on large screens */}
    </div>
  </div>
</section>
```

---

## ♿ **Accessibility Standards**

### **Required Attributes**

- **ARIA Labels:** Descriptive labels for screen readers
- **Focus Management:** Visible focus indicators
- **Keyboard Navigation:** Tab order and Enter/Space activation
- **Color Contrast:** WCAG AA compliance with brand colors

### **Implementation Example**

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

## 🔍 **Quality Checklist**

### **Component Review Criteria**

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

---

## 📚 **Related Documentation**

- **[MH Branding](../)** - Hub for all brand documentation
- **[Typography Standards](./typography.md)** - Text and heading standards
- **[Color System](./color-system.md)** - Brand color definitions
- **[Icon Policy](./icon-policy.md)** - Material Icons standards
- **[Page Layout Standards](../../technical/design-system/layout-guide.md)** - Layout specifications

---

**Maintained by:** MH Construction Development Team  
**Questions?** Refer to component examples in `src/components/ui/` directory
