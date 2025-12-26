# MH Construction Color System

**Date:** December 25, 2025  
**Status:** ✅ Current  
**Category:** Business - Brand Guidelines  
**Last Updated:** December 25, 2025  
**Version:** 5.1.0 - Emergency Color Scheme Added

## Quick Navigation

- [🏠 Brand Documentation](../)
- [📋 Brand Overview](../strategy/brand-overview.md)
- [🔧 Icon Policy](../../technical/design-system/icon-policy.md)
- [📝 Typography](./typography.md)
- [🎯 Hero Section Standards](./hero-section-standards.md) ⭐ **UPDATED Dec 14, 2025**

---

## Primary Brand Colors

### Primary Color - Hunter Green

**Hex:** `#386851`
**RGB:** `rgb(56, 104, 81)`
**HSL:** `hsl(153, 30%, 31%)`
**Use Case:** Primary buttons, main CTAs, brand identity, primary actions

**Color Variants:**

- **Primary Light:** `#4a7a63` - Lighter hunter green for hover states
- **Primary Dark:** `#2d5240` - Darker hunter green for active states

### Secondary Color - Leather Tan

**Hex:** `#BD9264`
**RGB:** `rgb(189, 146, 100)`
**HSL:** `hsl(31, 42%, 57%)`
**Use Case:** Large text (18pt+), backgrounds, decorative elements, supporting actions

**Color Variants:**

- **Secondary Light:** `#c9a176` - Lighter tan for hover states, light text on dark backgrounds
- **Secondary Text:** `#8a6643` - **WCAG AA compliant** for all text sizes (4.59:1 contrast on white)
- **Secondary Dark:** `#a67d52` - Darker tan for active states

#### Accessibility Standards (WCAG AA Compliance)

**Added:** December 26, 2025  
**Version:** 5.2.0 - Accessibility Color Variants

The original Leather Tan (#BD9264) provides insufficient contrast for WCAG AA compliance on white backgrounds (2.82:1 ratio). To maintain brand identity while ensuring accessibility:

**✅ APPROVED USES for #BD9264:**

- Large text (18pt / 24px or larger) on white/light backgrounds
- Background colors (with appropriate text colors)
- Decorative elements, borders, and non-text UI
- Hover states and transitions

**⚠️ REQUIRES DARKER VARIANT (#8a6643) for:**

- Normal text (under 18pt) on white/light backgrounds
- Small buttons and badges with white text
- Body copy and descriptions
- Any text requiring 4.5:1 contrast ratio

**Contrast Ratios:**

```
Original (#BD9264) on white: 2.82:1 ❌ Fails WCAG AA
Secondary-Text (#8a6643) on white: 4.59:1 ✅ Passes WCAG AA
White on Secondary-700 (#8a6643): 5.17:1 ✅ Passes WCAG AA
Secondary-Light (#c9a176) on Primary (#386851): 2.71:1 ✅ Passes for large text
```

**Implementation Guide:**

```tsx
// ✅ CORRECT - Large text can use original color
<h1 className="text-4xl text-brand-secondary">Large Heading</h1>

// ✅ CORRECT - Normal text uses darker variant
<p className="text-brand-secondary-text">Body paragraph text</p>
<p className="text-secondary-700">Alternative approach</p>

// ✅ CORRECT - White text on dark background
<button className="bg-secondary-700 text-white">Submit</button>

// ✅ CORRECT - Background with proper text color
<div className="bg-brand-secondary text-white">Badge</div>

// ❌ INCORRECT - Normal text with insufficient contrast
<p className="text-brand-secondary">This fails accessibility</p>

// ❌ INCORRECT - White text on light background
<button className="bg-brand-secondary text-white">Poor Contrast</button>
```

**Tailwind Configuration:**

```javascript
colors: {
  brand: {
    secondary: '#BD9264',      // Original - large text only
    'secondary-text': '#8a6643', // WCAG AA compliant for all text
    'secondary-light': '#c9a176',
    'secondary-dark': '#a67d52',
  },
  secondary: {
    500: '#BD9264',  // Original brand color
    600: '#a67d52',  // Darker variant
    700: '#8a6643',  // WCAG AA compliant
    800: '#6f5236',  // Very dark
    900: '#5a422c',  // Darkest
  }
}
```

**Color Variants:**

- **Secondary Light:** `#c9a176` - Lighter tan for hover states
- **Secondary Dark:** `#a67d52` - Darker tan for active states

### Accent Colors

**Black:** `#000000` - High contrast text, borders, emphasis
**White:** `#FFFFFF` - Light backgrounds, inverted text
**Gray Palette:** Professional neutral tones for text and backgrounds

### Emergency/Urgent Color Scheme

**Context:** The `/urgent` emergency response page uses a distinct color palette to convey
urgency and immediate action while maintaining brand trust.

#### Emergency Primary - Orange

**Hex:** `#ea580c` (Tailwind Orange-600)
**RGB:** `rgb(234, 88, 12)`
**Use Case:** Emergency CTAs, urgent action buttons, critical alerts
**Psychology:** Creates sense of urgency without triggering alarm

#### Emergency Accent - Red

**Hex:** `#dc2626` (Tailwind Red-600)
**RGB:** `rgb(220, 38, 38)`
**Use Case:** Emergency gradient transitions, critical emphasis
**Psychology:** Amplifies urgency in gradients and accents

#### Emergency Highlight - Yellow

**Hex:** `#fde047` (Tailwind Yellow-300)
**RGB:** `rgb(253, 224, 71)`
**Use Case:** Response time indicators, timeframe badges
**Psychology:** Attention-grabbing without being alarming

#### Emergency Color Philosophy

**When to Use:**

- Emergency/urgent response pages only
- 24/7 rapid response messaging
- Critical timeline indicators
- Contractor-focused emergency services

**Trust Balance:**

- Use brand green (Hunter Green) for trust elements (certifications, credentials)
- Emergency colors for action and urgency
- Maintains professional credibility while emphasizing speed

**DO NOT Use:**

- On standard service pages (use Hunter Green)
- For non-emergency content
- Without corresponding trust signals nearby

### Government/Public Sector Grayscale Scheme

**Context:** The `/public-sector` government contracting page uses a professional
grayscale palette to convey authority, compliance, and institutional reliability.

#### Grayscale Primary - Slate Gray

**Hex:** `#475569` (Tailwind Slate-600)
**RGB:** `rgb(71, 85, 105)`
**Use Case:** Primary government CTAs, section headers, institutional authority
**Psychology:** Professional, trustworthy, government-standard neutrality

#### Grayscale Accent - Cool Gray

**Hex:** `#6b7280` (Tailwind Gray-500)
**RGB:** `rgb(107, 114, 128)`
**Use Case:** Gradient transitions, supporting elements
**Psychology:** Balanced neutrality, regulatory compliance

#### Grayscale Dark - Charcoal

**Hex:** `#1f2937` (Tailwind Gray-800)
**RGB:** `rgb(31, 41, 55)`
**Use Case:** Hero backgrounds, dark institutional sections
**Psychology:** Authority, federal standard, professional gravitas

#### Grayscale Color Philosophy

**When to Use:**

- Government/public sector contracting pages only
- Federal compliance and regulatory content
- Institutional authority messaging
- Military/DOE/Hanford project contexts

**Professional Balance:**

- Use grayscale for institutional authority and compliance
- Use brand green for trust elements (veteran-owned, safety records)
- Use bronze for military veteran heritage
- Maintains credibility while emphasizing federal standards

**DO NOT Use:**

- On commercial construction pages (use brand green/tan)
- For emergency services (use orange-red scheme)
- Without veteran-owned trust indicators nearby

### Badge Colors

#### Bronze - Veteran Designation

**Hex:** `#CD7F32`
**RGB:** `rgb(205, 127, 50)`
**HSL:** `hsl(30, 61%, 50%)`
**Use Case:** Military veteran badges, service designation indicators
**Tailwind Class:** `bronze-badge` (with scale 50-900)

**Design Notes:**

- Use sparingly - reserved exclusively for veteran/military service recognition
- Pairs well with dark backgrounds for maximum visibility
- Available in full Tailwind scale: `bronze-badge-50` through `bronze-badge-900`
- Default shade (`bronze-badge`) is the primary bronze (#CD7F32)

**Accessibility:**

- Ensure sufficient contrast when placing text over bronze backgrounds
- Use `text-white` or `text-gray-900` for optimal readability depending on shade
- Bronze badges should include descriptive `aria-label` attributes for screen readers

**Example Usage:**

```tsx
// Veteran badge component
<span className="bg-bronze-badge text-white px-3 py-1 rounded-full text-sm font-semibold">
  Veteran Owned
</span>

// Light bronze background variant
<div className="bg-bronze-badge-50 border-bronze-badge-200 border">
  <span className="text-bronze-badge-900">Military Veteran</span>
</div>
```

### Government/Public Sector Color Palette

**Context:** The `/public-sector` government contracting page uses a professional
grayscale palette to convey authority, compliance, and institutional reliability.

#### Grayscale Primary - Slate Gray

**Hex:** `#475569` (Tailwind Slate-600)
**RGB:** `rgb(71, 85, 105)`
**Use Case:** Primary government CTAs, section headers, institutional authority
**Psychology:** Professional, trustworthy, government-standard neutrality

#### Grayscale Accent - Cool Gray

**Hex:** `#6b7280` (Tailwind Gray-500)
**RGB:** `rgb(107, 114, 128)`
**Use Case:** Gradient transitions, supporting elements
**Psychology:** Balanced neutrality, regulatory compliance

#### Grayscale Dark - Charcoal

**Hex:** `#1f2937` (Tailwind Gray-800)
**RGB:** `rgb(31, 41, 55)`
**Use Case:** Hero backgrounds, dark institutional sections
**Psychology:** Authority, federal standard, professional gravitas

#### Grayscale Color Philosophy

**When to Use:**

- Government/public sector contracting pages only
- Federal compliance and regulatory content
- Institutional authority messaging
- Military/DOE/Hanford project contexts

**Professional Balance:**

- Use grayscale for institutional authority and compliance
- Use brand green for trust elements (veteran-owned, safety records)
- Use bronze for military veteran heritage
- Maintains credibility while emphasizing federal standards

**DO NOT Use:**

- On commercial construction pages (use brand green/tan)
- For emergency services (use orange-red scheme)
- Without veteran-owned trust indicators nearby

## Light Mode Color Palette

### Text Colors

#### Primary Text

- **Color:** `#212121` (Gray 900)
- **Usage:** Main content, headings
- **Contrast:** AAA compliant on white backgrounds

#### Secondary Text

- **Color:** `#757575` (Gray 600)
- **Usage:** Supporting text, descriptions
- **Contrast:** AA compliant on white backgrounds

#### Muted Text

- **Color:** `#9E9E9E` (Gray 500)
- **Usage:** Placeholder text, disabled states
- **Contrast:** Minimum AA compliance

### Background Colors

#### Primary Background

- **Color:** `#FFFFFF` (White)
- **Usage:** Main content areas, cards

#### Secondary Background

- **Color:** `#FAFAFA` (Gray 50)
- **Usage:** Page backgrounds, subtle sections

#### Surface Background

- **Color:** `#F5F5F5` (Gray 100)
- **Usage:** Elevated surfaces, input fields

### Border Colors

#### Primary Border

- **Color:** `#E0E0E0` (Gray 300)
- **Usage:** Main dividers, card outlines

#### Secondary Border

- **Color:** `#EEEEEE` (Gray 200)
- **Usage:** Subtle separators, table borders

## Dark Mode Color Palette

### Dark Mode Text Colors

#### Primary Text (Dark Mode)

- **Color:** `#FFFFFF` (White)
- **Usage:** Main content, headings
- **Contrast:** AAA compliant on dark backgrounds

#### Secondary Text (Dark Mode)

- **Color:** `#B0B0B0` (Gray 400)
- **Usage:** Supporting text, descriptions
- **Contrast:** AA compliant on dark backgrounds

#### Muted Text (Dark Mode)

- **Color:** `#757575` (Gray 600)
- **Usage:** Placeholder text, disabled states
- **Contrast:** Minimum AA compliance

### Dark Mode Background Colors

#### Primary Background (Dark Mode)

- **Color:** `#121212` (Dark Gray)
- **Usage:** Main content areas, cards

#### Secondary Background (Dark Mode)

- **Color:** `#1E1E1E` (Darker Gray)
- **Usage:** Page backgrounds, elevated surfaces

#### Surface Background (Dark Mode)

- **Color:** `#2D2D2D` (Medium Dark Gray)
- **Usage:** Input fields, interactive surfaces

### Dark Mode Border Colors

#### Primary Border (Dark Mode)

- **Color:** `#424242` (Gray 700)
- **Usage:** Main dividers, card outlines

#### Secondary Border (Dark Mode)

- **Color:** `#303030` (Gray 800)
- **Usage:** Subtle separators, table borders

## Semantic Colors

### Success Colors

**Light Mode:** `#10b981` (Tailwind Green-500) - Standard success green
**Dark Mode:** `#22c55e` (Tailwind Green-400) - Lighter variant for dark backgrounds
**Usage:** Success messages, completed states, positive indicators

### Warning Colors

**Light Mode:** `#f59e0b` (Tailwind Amber-500) - Standard warning amber
**Dark Mode:** `#fbbf24` (Tailwind Amber-400) - Lighter variant for dark backgrounds
**Usage:** Warning messages, caution states, attention indicators

### Error Colors

**Light Mode:** `#ef4444` (Tailwind Red-500) - Standard error red
**Dark Mode:** `#f87171` (Tailwind Red-400) - Lighter variant for dark backgrounds
**Usage:** Error messages, failure states, destructive actions

### Info Colors

**Light Mode:** `#3b82f6` (Tailwind Blue-500) - Standard info blue
**Dark Mode:** `#60a5fa` (Tailwind Blue-400) - Lighter variant for dark backgrounds
**Usage:** Information messages, neutral notifications

---

## Gradient Patterns (Homepage Reference)

### Three-Color Brand Gradients

The homepage establishes signature three-color gradients that should be used throughout the site for consistency.

#### Header Text Gradients

**Primary Three-Color (Most Common):**

```tsx
className =
  "bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent";
```

- **Use for:** Subtitle lines, secondary headers
- **Colors:** Green → Tan → Green
- **Effect:** Creates warm, balanced brand statement

**Bronze-Accented Three-Color (Premium):**

```tsx
className =
  "bg-gradient-to-r from-brand-primary via-bronze-600 to-brand-secondary bg-clip-text text-transparent";
```

- **Use for:** Main title lines, featured headers
- **Colors:** Green → Bronze → Tan
- **Effect:** Adds premium feel with bronze center

#### Icon Container Gradients

**Primary Green Variant:**

```tsx
// Glow layer
className =
  "bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl";

// Container
className =
  "bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker";
```

- **Use for:** Core values, trust, integrity sections
- **Effect:** Professional, authoritative

**Secondary Tan/Bronze Variant:**

```tsx
// Glow layer
className =
  "bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl";

// Container
className =
  "bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800";
```

- **Use for:** Services, partnerships, community sections
- **Effect:** Warm, approachable

**Multi-Color Featured Variant:**

```tsx
// Glow layer
className =
  "bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 blur-2xl";

// Container
className =
  "bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary";
```

- **Use for:** Hero sections, featured content
- **Effect:** Maximum brand impact

#### Emergency CTA Gradients (Urgent Page Only)

**Emergency Button Primary:**

```tsx
className = "bg-gradient-to-r from-orange-600 via-red-600 to-orange-600";
```

- **Use for:** Primary CTAs on emergency/urgent page
- **Colors:** Orange → Red → Orange
- **Effect:** Conveys urgency and immediate action
- **Context:** Emergency response contact buttons

**Emergency Button Hover:**

```tsx
className = "hover:from-orange-700 hover:via-red-700 hover:to-orange-800";
```

- **Intensifies on hover** for clear interactive feedback
- **Maintains gradient pattern** with darker shades

**Emergency Icon Container:**

```tsx
// Glow layer
className = "bg-gradient-to-br from-orange-600/30 to-red-600/30 blur-2xl";

// Container
className = "bg-gradient-to-br from-orange-600 via-red-600 to-orange-700";
```

- **Use for:** Icons on emergency page sections
- **Effect:** Creates urgent, attention-grabbing glow
- **Trust Balance:** Use standard brand green icons for credentials/trust sections

**Emergency Hero Background:**

```tsx
className = "bg-gradient-to-br from-gray-900 via-orange-950/40 to-gray-900";
```

- **Use for:** Emergency page hero sections
- **Subtle orange tint** maintains urgency without overwhelming
- **Dark base** ensures text readability

#### Government/Public Sector Grayscale Gradients

**Government Button Primary:**

```tsx
className = "bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600";
```

- **Use for:** Primary CTAs on government/public sector page
- **Colors:** Slate-600 → Gray-700 → Slate-600
- **Effect:** Professional institutional authority
- **Context:** Federal contracting, compliance, regulatory actions

**Government Button Hover:**

```tsx
className = "hover:from-slate-700 hover:via-gray-800 hover:to-slate-700";
```

- **Darkens on hover** for clear interactive feedback
- **Maintains grayscale professionalism**

**Government Icon Container:**

```tsx
// Glow layer
className = "bg-gradient-to-br from-slate-600/30 to-gray-700/30 blur-2xl";

// Container
className = "bg-gradient-to-br from-slate-600 via-gray-700 to-gray-800";
```

- **Use for:** Icons on government/public sector sections
- **Effect:** Creates professional, authoritative presence
- **Trust Balance:** Use brand green/bronze icons for veteran credentials

**Government Hero Background:**

```tsx
className = "bg-gradient-to-br from-gray-900 via-slate-800/60 to-gray-900";
```

- **Use for:** Government page hero sections
- **Subtle slate tint** maintains institutional feel
- **Dark base** ensures text readability

#### Background Gradients

**Hero/CTA Dark Gradient:**

```tsx
className =
  "bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark";
```

- **Use for:** Hero sections, CTA sections
- **Effect:** Rich, immersive dark background

**Subtle Section Gradient:**

```tsx
className =
  "bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800";
```

- **Use for:** Alternating sections for visual rhythm
- **Effect:** Subtle depth without overwhelming content

---

## Opacity Values for Overlays

### Background Pattern Overlays

**Diagonal Stripes:**

- Light mode: `opacity-[0.03]` (3%)
- Dark mode: `opacity-[0.05]` (5%)
- Purpose: Subtle texture without competing with content

**Radial Gradient Overlays:**

```tsx
// Top right overlay
className =
  "bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]";

// Bottom left overlay
className =
  "bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]";
```

- Light mode: Primary 8%, Secondary 6%
- Dark mode: Primary 15%, Secondary 12%
- Purpose: Subtle brand color hints at edges

### Brand Color Blobs (Homepage)

**Large Blur Orbs:**

```tsx
// Primary green blob
className =
  "bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20";

// Secondary tan blob
className =
  "bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20";
```

- Light mode: 10% opacity
- Dark mode: 20% opacity
- Size: w-96 h-96 (384px)
- Blur: blur-3xl

### Hero Section Overlays

**Readability Overlay:**

```tsx
className =
  "bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80";
```

- Primary: 30% opacity
- Mid-gray: 60% opacity
- Dark gray: 80% opacity
- Purpose: Ensures white text readability over any background

### Card Hover Shadows

**Light Mode:**

```tsx
className = "shadow-lg hover:shadow-2xl";
```

- Default: Tailwind shadow-lg
- Hover: Tailwind shadow-2xl

**Dark Mode (with brand glow):**

```tsx
className = "dark:hover:shadow-brand-primary/20";
```

- Hover adds green glow at 20% opacity
- Creates premium, branded feel

---

## Inline Text Highlighting (Homepage Pattern)

Homepage descriptions use colored text highlights for visual interest and emphasis.

### Keyword Highlighting Pattern

```tsx
<p className="text-gray-700 dark:text-gray-300">
  Regular description text with{" "}
  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
    green keywords
  </span>
  ,{" "}
  <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
    tan keywords
  </span>
  , and{" "}
  <span className="font-bold text-bronze-600 dark:text-bronze-400">
    bronze keywords
  </span>{" "}
  for emphasis.
</p>
```

### Semantic Color Usage

**Green Highlights:** Technical excellence, quality, expertise

- Examples: "project excellence", "proven methods", "quality assurance"

**Tan Highlights:** Partnership, relationships, community

- Examples: "client partners", "lasting relationships", "collaboration"

**Bronze Highlights:** Premium services, achievements, craftsmanship

- Examples: "expert craftsmanship", "award-winning", "premium service"

**White/Gray Highlights:** Universal emphasis

- Examples: "NOT the dollar", "zero compromises", "guaranteed"

### Implementation Guidelines

1. **Frequency:** Highlight 3-6 key terms per paragraph
2. **Distribution:** Vary colors across a section for visual interest
3. **Weight:** Always pair with `font-bold` for proper emphasis
4. **Dark Mode:** Use lighter variants (`-light`, `400`) for contrast
5. **Avoid:** Don't highlight every other word - be selective

### **Special Emphasis Patterns - NEW**

**Version:** 5.1.0 | **Date:** December 24, 2025

#### **"NOT" Emphasis Pattern**

Used to strongly emphasize negation or contrast in key messaging:

```tsx
<p className="text-gray-700 dark:text-gray-300">
  Building projects for the{" "}
  <span className="font-bold text-gray-900 dark:text-white">client</span>,{" "}
  <span className="font-black italic text-bronze-600 dark:text-bronze-400">
    NOT
  </span>{" "}
  <span className="font-bold text-gray-900 dark:text-white">the dollar</span>.
</p>
```

**Styling Rules:**

- Use `font-black italic` (not just bold)
- Color: `text-bronze-600 dark:text-bronze-400` (bronze for emphasis)
- Apply to words like: NOT, NEVER, ZERO, NO
- Creates maximum visual impact for key negations

#### **Dynamic Subtitle Rendering**

For dynamically styling specific words within strings:

```tsx
// Helper function
function renderSubtitle(subtitle: string) {
  if (subtitle.includes("NOT")) {
    const parts = subtitle.split("NOT");
    return (
      <>
        {parts[0]}
        <span className="font-black italic text-bronze-600 dark:text-bronze-400">
          NOT
        </span>
        {parts[1]}
      </>
    );
  }
  return subtitle;
}

// Usage in component
<h3 className="text-xl text-gray-700 dark:text-gray-300">
  {renderSubtitle("Built projects for the Client, NOT the Dollar")}
</h3>;
```

**Use Cases:**

- Service descriptions with strong contrasts
- Taglines with key differentiators
- Headlines emphasizing what you don't do
- Core value statements

#### **Semantic Color Mixing in Descriptions**

Combine multiple highlight colors within a single paragraph for visual richness:

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
  Four foundational values guide every{" "}
  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
    project and partnership
  </span>
  —focused on building projects for the{" "}
  <span className="font-bold text-gray-900 dark:text-white">client</span>,{" "}
  <span className="font-black italic text-bronze-600 dark:text-bronze-400">
    NOT
  </span>{" "}
  <span className="font-bold text-gray-900 dark:text-white">the dollar</span>.
</p>
```

**Color Mixing Guidelines:**

- **Green** (`text-brand-primary`): Technical terms, expertise, quality
- **Tan** (`text-brand-secondary`): Partnerships, relationships, community
- **Bronze** (`text-bronze-600`): Premium services, awards, emphasis
- **White/Gray** (`text-gray-900`): Universal emphasis, key nouns
- **Bronze Italic Black** (`font-black italic text-bronze-600`): Strong negations (NOT, NEVER, ZERO)

**Pattern Distribution:**

1. Start with context (regular text)
2. Highlight first key concept (green or tan)
3. Continue narrative (regular text)
4. Emphasize contrasting concept (white/gray)
5. Strong negation if needed (bronze italic black)
6. Close with emphasized outcome (any color)

**Example in Context:**

```tsx
<p className="text-gray-700 dark:text-gray-300">
  We deliver {/* regular context */}
  <span className="font-bold text-brand-primary">
    expert construction management
  </span>
  {/* green: expertise */}
  with {/* regular connector */}
  <span className="font-bold text-brand-secondary">lasting partnerships</span>
  {/* tan: relationships */}
  at the core. Every project is built for the {/* regular narrative */}
  <span className="font-bold text-gray-900">client</span>
  {/* emphasis */},{" "}
  <span className="font-black italic text-bronze-600">NOT</span>
  {/* strong negation */} the {/* regular text */}
  <span className="font-bold text-gray-900">dollar</span>
  {/* emphasis */}.
</p>
```

**Benefits:**

- Creates visual interest through color variety
- Reinforces semantic meaning through color choice
- Guides reader's eye to key concepts
- Maintains readability while adding emphasis
- Works beautifully in both light and dark modes

---

## Button Color Implementation

### Primary Buttons (Hunter Green)

**Default State:**

- Background: `transparent` or `white`
- Border: `2px solid #386851`
- Text: `#386851`

**Hover State:**

- Background: `#386851`
- Border: `2px solid #386851`
- Text: `white`
- Transform: `translateY(-2px)` (subtle lift effect)

**Active/Pressed State:**

- Background: `#2d5240` (darker hunter green)
- Border: `2px solid #2d5240`
- Text: `white`

**Usage:** Primary CTAs, IRL Consultations, main actions, client partnerships

### Secondary Buttons (Leather Tan)

**Default State:**

- Background: `transparent` or `white`
- Border: `2px solid #BD9264`
- Text: `#BD9264`

**Hover State:**

- Background: `#BD9264`
- Border: `2px solid #BD9264`
- Text: `white`
- Transform: `translateY(-2px)` (subtle lift effect)

**Active/Pressed State:**

- Background: `#a67d52` (darker tan)
- Border: `2px solid #a67d52`
- Text: `white`

**Usage:** Automated Estimator, secondary actions, supporting CTAs, trade partnerships

### Outline Buttons

**Default State:**

- Background: `transparent`
- Border: `2px solid #386851`
- Text: `#386851`

**Hover State:**

- Background: `rgba(56, 104, 81, 0.1)` (subtle hunter green tint)
- Border: `2px solid #386851`
- Text: `#386851`

**Usage:** Tertiary actions, cancel buttons, alternative options

### Neutral Buttons

**Light Mode:**

- Background: `white`
- Border: `2px solid #E0E0E0`
- Text: `#212121`
- Hover: Background becomes `#F5F5F5`

**Dark Mode:**

- Background: `#2D2D2D`
- Border: `2px solid #424242`
- Text: `#FFFFFF`
- Hover: Background becomes `#404040`

**Usage:** Theme-aware system buttons, settings, utilities

---

## Color Usage Guidelines (Continued)

### Primary Color Applications

#### Headers and Navigation

- Use Hunter Green (`#386851`) for main navigation elements
- Primary color provides professional, trustworthy appearance
- Maintain consistent brand identity throughout site

#### Call-to-Action Elements

- Primary buttons use Hunter Green outline with white background
- Hover states: Solid Hunter Green background with white text
- Active states: Darker hunter green (`#2d5240`) with white text

#### Links and Interactive Elements

- Text links use Hunter Green for brand consistency
- Hover states: Slightly lighter hunter green (`#4a7a63`)
- Focus states: Include visible outline for accessibility

### Secondary Color Applications

#### Supporting Actions

- Secondary buttons use Leather Tan outline
- Complementary to primary actions (e.g., Automated Estimator vs IRL Consultation)
- Hover states: Solid Leather Tan background with white text

#### Accent and Decorative Elements

- Use Leather Tan for subtle emphasis and warmth
- Complements Hunter Green without overwhelming primary brand color
- Appropriate for badges, tags, and secondary highlights

### Background Color Strategy

#### Light Mode Hierarchy

1. **Page Background:** Gray 50 (`#FAFAFA`)
2. **Content Background:** White (`#FFFFFF`)
3. **Elevated Surfaces:** Gray 100 (`#F5F5F5`)

#### Dark Mode Hierarchy

1. **Page Background:** Dark Gray (`#121212`)
2. **Content Background:** Darker Gray (`#1E1E1E`)
3. **Elevated Surfaces:** Medium Dark Gray (`#2D2D2D`)

### Text Color Accessibility

**Minimum Contrast Requirements:**

- **Normal Text:** 4.5:1 contrast ratio (AA)
- **Large Text:** 3:1 contrast ratio (AA)
- **Enhanced:** 7:1 contrast ratio (AAA)

**Implementation:**

- All body text meets AA standards
- Headings and important text meet AAA standards
- Disabled text maintains minimum readability

## Color Implementation

### CSS Custom Properties

````css
:root {
  /* Brand Colors */
  --color-brand-primary: #386851;        /* Hunter Green */
  --color-brand-primary-light: #4a7a63;  /* Lighter Hunter Green */
  --color-brand-primary-dark: #2d5240;   /* Darker Hunter Green */
  --color-brand-secondary: #BD9264;      /* Leather Tan */
  --color-brand-secondary-light: #c9a176; /* Lighter Tan */
  --color-brand-secondary-dark: #a67d52;  /* Darker Tan */

  /* Light Mode */
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-border: #E0E0E0;

  /* Semantic Colors */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --color-info: #3b82f6;
}

[data-theme="dark"] {
  /* Dark Mode Overrides */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B0B0B0;
  --color-background: #121212;
  --color-surface: #1E1E1E;
  --color-border: #424242;

  /* Dark Mode Semantic */
  --color-success: #22c55e;
  --color-warning: #fbbf24;
  --color-error: #f87171;
  --color-info: #60a5fa;
}
```text

### Tailwind Configuration

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#386851',         // Hunter Green
          'primary-light': '#4a7a63', // Lighter Hunter Green
          'primary-dark': '#2d5240',  // Darker Hunter Green
          secondary: '#BD9264',       // Leather Tan
          'secondary-light': '#c9a176', // Lighter Tan
          'secondary-dark': '#a67d52'   // Darker Tan
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#424242',
          800: '#303030',
          900: '#212121'
        },
        semantic: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6'
        }
      }
    }
  }
}
```text

## Brand Color Consistency

### Logo Applications

- **Primary Logo:** Uses Hunter Green (`#386851`) for brand identity
- **Monochrome Logo:** Adapts to context (white on dark, dark on light)
- **Minimum Contrast:** Maintains 3:1 ratio with background

### Marketing Material Colors

- **Business Cards:** Hunter Green with white/gray text, Leather Tan accents
- **Signage:** High contrast Hunter Green on white background
- **Digital Assets:** Consistent with web color palette (Hunter Green/Leather Tan)

### Button Usage by Context

**Client Partnership Actions (Primary - Hunter Green):**

- "Schedule Free Consultation" (icon: `event`)
- "Begin Partnership" (icon: `handshake`)
- "Get Professional Estimate" (icon: `engineering`)
- "Book Site Visit" (icon: `place`)

**Automated Estimator Actions (Secondary - Leather Tan):**

- "Get Instant AI Estimate" (icon: `smart_toy`)
- "Try AI Cost Calculator" (icon: `smart_toy`)
- "Calculate Project Cost" (icon: `calculate`)

**Trade Partnership Actions (Secondary - Leather Tan):**

- "Join Our Trade Partnership Network" (icon: `construction`)
- "Apply to be Approved Vendor" (icon: `check_circle`)
- "Submit Vendor Application" (icon: `contact_mail`)

**Emergency/Urgent Response Actions (Orange-Red Gradient):**

- "Call Emergency Line Now" (icon: `phone`, `call`)
- "Email Emergency Response" (icon: `email`, `emergency`)
- "24/7 Rapid Response" (icon: `bolt`, `schedule`)
- "Immediate Project Support" (icon: `engineering`, `military_tech`)

**Context:** Used exclusively on `/urgent` emergency response page for contractor-focused rapid deployment services. Creates urgency while maintaining professional credibility through accompanying trust signals.

### Color Accessibility in Context

**Hunter Green on White:** 7.2:1 contrast ratio (AAA compliant)
**Leather Tan on White:** 3.8:1 contrast ratio (AA compliant for large text)
**White on Hunter Green:** 7.2:1 contrast ratio (AAA compliant)
**White on Leather Tan:** 3.8:1 contrast ratio (AA compliant)

### Quality Assurance

**Color Contrast Testing:**

- Use WebAIM contrast checker for all color combinations
- Verify AA compliance for normal text
- Ensure AAA compliance for important content

**Browser Testing:**

- Test color rendering across Chrome, Firefox, Safari, Edge
- Verify dark mode transitions work smoothly
- Check color accuracy on different screen types

**Print Color Matching:**

- Convert RGB to CMYK for print materials
- Test print samples for color accuracy
- Maintain brand consistency across digital and print

## Related Documentation

- [**Brand Overview**](./brand-overview.md) - Complete brand identity guide
- [**Icon Policy**](./icon-policy.md) - Material Icons standards
- [**Typography**](./typography.md) - Font system and text guidelines
- [**Implementation Guide**](./implementation-guide.md) - Technical implementation
- [**Branding**](../) - Hub for all brand documentation

---

**Color Authority**: MH Construction Design Team
**Last Color Update**: November 4, 2025 (v4.0.2)
**Color Scheme**: Hunter Green (#386851) + Leather Tan (#BD9264)
**Next Review**: Quarterly brand compliance assessment

---

## Quick Reference Card

### Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| **Hunter Green** | `#386851` | Primary buttons, main CTAs, IRL consultations |
| **Hunter Green Light** | `#4a7a63` | Hover states, lighter accents |
| **Hunter Green Dark** | `#2d5240` | Active states, pressed buttons |
| **Leather Tan** | `#BD9264` | Secondary buttons, Automated Estimator, trade partnerships |
| **Leather Tan Light** | `#c9a176` | Hover states, lighter accents |
| **Leather Tan Dark** | `#a67d52` | Active states, pressed buttons |

### Service/Partnership Color Associations

| Service/Partnership | Button Color | Icon | Example CTA |
|---------------------|--------------|------|-------------|
| **IRL Consultation** | Hunter Green (Primary) | `event` | "Schedule Free Consultation" |
| **Client Partnership** | Hunter Green (Primary) | `handshake` | "Begin Partnership" |
| **Automated Estimator** | Leather Tan (Secondary) | `smart_toy` | "Get Instant Automated Estimate" |
| **Trade Partnership** | Leather Tan (Secondary) | `construction` | "Join Trade Network" |
| **Emergency Response** | Orange-Red Gradient | `bolt` | "Call Emergency Line Now" |
| **Government/Federal** | Grayscale Gradient | `account_balance` | "Request Grant Support" |

### Contact Information Color Coding

- **Client Partnerships:** Hunter Green theme (, office@mhc-gc.com)
- **Trade Partnerships:** Leather Tan theme (, office@mhc-gc.com)

---

## Implementation Examples

### Primary Button (Hunter Green)

```tsx
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" size="lg" className="mr-3" />
  <span className="font-medium">Schedule Free Consultation</span>
</Button>
````

### Secondary Button (Leather Tan)

````tsx
<Button variant="secondary" size="lg">
  <MaterialIcon icon="smart_toy" size="lg" className="mr-3" />
  <span className="font-medium">Get Instant AI Estimate</span>
</Button>
```

### Government/Federal Button (Grayscale Gradient)

```tsx
<button className="inline-flex items-center px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-slate-600 via-gray-700 to-slate-600 hover:from-slate-700 hover:via-gray-800 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl">
  <MaterialIcon icon="account_balance" size="lg" className="mr-3" />
  <span className="font-medium">Request Grant Support</span>
</button>
```

### Using Brand Colors Directly

```tsx
// Hunter Green text
<span className="text-brand-primary">Primary Action</span>

// Leather Tan background
<div className="bg-brand-secondary text-white p-4">
  Secondary Content
</div>

// Hunter Green hover effect
<button className="text-brand-primary hover:bg-brand-primary hover:text-white">
  Interactive Element
</button>
```text
````
