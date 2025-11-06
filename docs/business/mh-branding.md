# MH Construction Brand Guidelines & Design System

## Complete brand identity, design system, and implementation guidelines

## for MH Construction LLC

> **📅 Last Updated:** November 3, 2025
> **🎨 Brand Version:** 4.0.2
> **👥 Authority:** MH Construction Leadership Team
> **💻 Implementation:** Foundation-Only Architecture with Google Material Icons
> **🌙 Theme Support:** Complete light/dark mode with optimized theme toggle
> **🚀 Architecture:** Clean Slate Foundation, Google Material Icons, ready
> for creative expansion

## 📚 Documentation Structure

This comprehensive guide contains ALL MH Construction branding standards. For focused reading, see also our
**modular branding documentation**:

- **[Brand Documentation Index](../branding/branding-index.md)** - Navigation hub for all brand docs
- **[Brand Overview](../branding/strategy/brand-overview.md)** - Core identity, taglines, positioning
- **[Color System](../branding/standards/color-system.md)** - Complete color palette and usage
- **[Typography](../branding/standards/typography.md)** - Font system and hierarchy
- **[Messaging Guidelines](../branding/strategy/messaging.md)** - Voice, tone, and content standards
- **[Icon Policy](../branding/standards/icon-policy.md)** - Material Icons standards and enforcement
- **[Consistency Guide](../development/consistency-guide.md)** - Complete implementation standards

### 🔗 Development Standards Integration

**IMPORTANT:** When implementing these brand standards, also consult:

- **[Development Standards](../development/development-standards.md)** - Mandatory
  coding standards, import patterns, animation rules
- **[AI Development Guidelines](../development/ai-development-guidelines.md)** -
  Critical rules for AI assistants working on codebase
- **[Consistency Master Plan](../project/consistency-master-plan.md)** - Overall
  consistency strategy and enforcement

**Key Development Requirements:**

- All imports MUST use `@/` prefix (never relative imports)
- Animations MUST import from `@/components/animations/FramerMotionComponents`
- Critical content must NEVER be wrapped in animations
- All styling uses Tailwind utility classes (no custom CSS except for special cases)

---

## 🚨 **CRITICAL POLICY: EMOJI-FREE CODEBASE (v4.0.2)**

### **Icon Standards Enforcement**

**MH Construction maintains a strict EMOJI-FREE source code policy. All visual
indicators must use Google Material Icons exclusively.**

#### **✅ APPROVED: Material Icons Only**

````tsx
// ✅ Correct - Use MaterialIcon component
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="military_tech" size="md" />
<MaterialIcon icon="event" size="sm" />
```text

#### **❌ PROHIBITED: Emojis in Source Code**

```tsx
// ❌ Never use emojis in source code
<span>🏗️ Construction Project</span>
<button>📅 Schedule</button>
title: 'Update 🎯'
```text

#### **Policy Rationale**

- **Cross-platform consistency**: Material Icons render identically across all devices
- **Professional branding**: Maintains cohesive visual identity
- **Accessibility compliance**: Screen readers handle Material Icons properly
- **Performance optimization**: No emoji rendering dependencies
- **Maintainability**: Centralized icon system with semantic naming

#### **Exception: Documentation Files**

- **Markdown files**: Emojis acceptable for documentation clarity
- **README files**: Visual enhancement for developer experience
- **Project planning**: Emojis help organize and communicate project status

---

## Core Brand Taglines

### Primary Partnership Message

**"Building for the Owner, NOT the Dollar"**
*Veteran-owned excellence where your success comes first*

### Supporting Taglines

- "Your Partner in Building Tomorrow"
- "Working WITH you to serve our communities"
- "Where Military Precision Meets Construction Excellence"

---

## Current State & Navigation Standards

### **Full Website Architecture (v4.0.2)**

- **Complete Website**: All pages production-ready with full MaterialIcon integration
- **Navigation**: Fully functional navigation with all pages active
- **Footer**: Complete with all active page links
- **Build Status**: Zero errors, full website deployment ready

### **Navigation Labels (Current State)**

- **Home** - Active and functional
- **About** - Active and functional
- **Services** - Active and functional
- **Projects** - Active and functional
- **Team** - Active and functional
- **Government** - Active and functional
- **Trade Partners** - Active and functional
- **Careers** - Active and functional
- **Contact** - Active and functional
- **Booking** - Active and functional
- **Estimator** - Active and functional

---

## 🚨 **IMPLEMENTATION NOTICE: Full Website Complete (v4.0.2)**

### **Current Architecture (v4.0.2) - November 4, 2025**

**MH Construction now features a complete, fully-functional website with**
**Google Material Icons and comprehensive pages ready for production.**

####  **Foundation Standards Implementation:**

```tsx
// Modern Typography System with Responsive Scaling
<h1 className="mb-10 pb-4 font-black text-gray-900 dark:text-white
  text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
  leading-relaxed tracking-tighter">
  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
    Your Partnership in
  </span>
  <span className="block text-brand-primary dark:text-brand-primary font-black">
    Construction Excellence
  </span>
</h1>

// Standardized CTA Buttons (v4.0.2) - Content Section Implementation
<Button variant="secondary" size="lg" className="transition-all duration-300">
  <MaterialIcon icon="handshake" size="lg" className="mr-3" />
  <span className="font-medium">Start Your Project</span>
</Button>

<Button variant="outline" size="lg" className="transition-all duration-300">
  <MaterialIcon icon="visibility" size="lg" className="mr-3" />
  <span className="font-medium">View Our Work</span>
</Button>

// Consistent Section Spacing
<section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40 features-section">
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div className="mb-24 lg:mb-32 text-center scroll-reveal">
      // Section content with optimized spacing
    </div>
  </div>
</section>
```markdown

### **Latest Brand Improvements (v4.0.2):**

- ✅ **Enhanced Typography**: Responsive clamp() scaling from text-4xl to
  text-8xl
- ✅ **Unified Button Standards**: Outlined buttons with rounded-xl corners,
  MH brand colors, consistent sizing and icons
- ✅ **Consistent Rounded Corners**: All buttons use rounded-xl to match card
  styling
- ✅ **MaterialIcon Integration**: Exclusively Google Material Icons throughout
  entire website
- ✅ **Theme-Aware Design**: Proper light/dark mode support across all
  components
- ✅ **Professional Color Palette**: Hunter green, black, white, and grays with
  proper contrast
- ✅ **Accessibility Standards**: WCAG 2.1 compliance with comprehensive testing
  guidelines
- ✅ **Clean Interactions**: 300ms transitions with hover color changes

---

## 🚨 **UPDATED DESIGN ENFORCEMENT POLICIES - October 8, 2025**

### **CRITICAL UI COMPONENT STANDARDS**

#### 🚫 **NO SECTION BADGES POLICY**

**ENFORCED STANDARD:** MH Construction prohibits decorative section badges
(bubble/pill-shaped containers with icons) to maintain professional visual hierarchy.

**This policy applies to:**
- Section headings (h2, h3, etc.)
- Content area introductions
- Feature section headers
- All page sections

```tsx
// ❌ PROHIBITED - Bubble/pill-shaped badge decorations at section beginnings
<div className="inline-flex items-center bg-brand-primary/10 shadow-lg mb-8
  px-8 py-4 border border-brand-primary/20 rounded-full">
  <MaterialIcon icon="construction" size="md" />
  <span className="ml-4 font-black text-brand-primary text-sm uppercase tracking-wider">
    Section Label
  </span>
</div>

// ✅ REQUIRED - Clean, direct section headers (NO decorative badges)
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100
  text-2xl sm:text-3xl md:text-4xl lg:text-5xl
  leading-tight tracking-tighter">
  Section Title
</h2>
```text

#### 🎴 **MANDATORY CARD FLIPPING INTERACTION**

**ENFORCED STANDARD:** All informational cards must use 3D flip animations for detailed descriptions.

```tsx
// ✅ REQUIRED - Standard card flip implementation
<div className="group perspective-1000 cursor-pointer">
  <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
    {/* Front: Overview */}
    <div className="absolute inset-0 w-full h-full backface-hidden">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-gray-600">{overview}</p>
        <span className="text-brand-primary text-sm">Click for details</span>
      </div>
    </div>

    {/* Back: Detailed Information */}
    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
      <div className="bg-gradient-to-br from-brand-primary to-brand-secondary
        rounded-xl p-6 shadow-lg text-white">
        <h3 className="font-bold text-xl mb-4">{title}</h3>
        <p>{detailedDescription}</p>
        <ul className="mt-4 space-y-2">
          {features.map(feature => (
            <li className="flex items-center">
              <MaterialIcon icon="check_circle" size="sm" className="mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>
```text

#### 🦸 **HERO SECTION CONSISTENCY REQUIREMENT**

**UPDATED:** November 4, 2025 - v4.0.2 Hero Section Standards Finalized

**MANDATORY STANDARD:** ALL pages must implement the standardized hero section format documented in [Typography Standards](../branding/standards/typography.md#-hero-section-typography-standards).

**Key Requirements:**

- ✅ **Full Viewport Height**: `h-screen flex items-center justify-center`
- ✅ **NO Badges**: No veteran badges, military_tech icons, or decorative badges
- ✅ **NO CTA Buttons**: No Schedule, Get Estimate, Contact buttons
- ✅ **NO Stats/Cards**: No 30+ years, 100+ projects displays
- ✅ **NO Trust Indicators**: No satisfaction rates or project counts
- ✅ **Content ONLY**: Title, subtitle, and description text
- ✅ **Navigation at Bottom**: PageNavigation at `absolute bottom-0 left-0 right-0`
- ✅ **Responsive Typography**: Proper scaling from mobile to desktop
- ✅ **Consistent Structure**: All pages follow identical hero implementation

**What Hero Sections Should Contain:**

1. **Title** - Large, responsive heading with brand color (`text-brand-secondary`)
2. **Subtitle** - Brief tagline or page description
3. **Description** - Longer text including company tagline "Building for the Owner, NOT the Dollar"
4. **Navigation** - PageNavigation component at the bottom

**Implementation Details:** See comprehensive hero section standards in Typography documentation.

**Benefits:**

- ✅ **Clean First Impression**: Hero section loads immediately without clutter
- ✅ **Better Performance**: Reduced elements = faster load times
- ✅ **Mobile Optimized**: Content fits perfectly on all screen sizes
- ✅ **Navigation Visible**: Users see section links immediately
- ✅ **Brand Consistency**: Every page has identical hero structure

**Essential CSS Classes for Card Flipping:**

```css
.perspective-1000 { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }
.rotate-y-180 { transform: rotateY(180deg); }
```text

**Benefits of These Standards:**

- **Professional Consistency**: Uniform experience across all pages
- **Brand Recognition**: Immediate visual consistency strengthens brand identity
- **User Experience**: Familiar interaction patterns improve usability
- **Maintenance Efficiency**: Standardized components reduce development overhead
- **Performance**: Consistent animations and loading patterns

**Reference Documentation:** See `development-guidelines.md` for complete implementation details.

---

## 🏢 Brand Identity

### Company Information

**MH Construction LLC** - *Veteran-Owned Construction Company*

| Element | Details |
|---------|---------|
| **Full Business Name** | MH Construction LLC |
| **Tagline** | "Your Partnership in Construction Excellence" |
| **Secondary Tagline** | "We Work With You Every Step. Military Precision. Advanced Technology." |
| **Industry** | Construction & Renovation |
| **Founded** | 2010 - Veteran-owned and operated |
| **Service Philosophy** | Military precision, veteran values, cutting-edge technology |

### Core Values (Updated v4.0.2 - November 2025)

#### **6-Value Professional Foundation**

*Evolution from simplified 4-value system to comprehensive professional*
*methodology with trust as the ultimate goal.*

| Value | Core Principle | Brand Expression |
|-------|----------------|------------------|
| **Honesty & Transparency** | Full-disclosure transparency | Open-dialogue meetings, info sharing |
| **Integrity** | Unwavering commitment to our word | Business conduct reflects character |
| **Precision & Experience** | 150+ years combined expertise | Engineer-driven packages, foresight |
| **Client-First Ethics** | Small-town client-focused values | Acting in client's best interest |
| **Professionalism & Control** | Confident project navigation | Levelheaded, harmonious workflow |
| **Trust (The Culmination)** | Result of all other values | Foundation of MH Construction |

#### **Value Messaging Framework**

**Trust as Foundation**: "Earning your trust is not a starting point; it is
the culmination of our consistent performance in all other core values."

**Client Control**: "We manage the project; you control it."

**Professional Approach**: "We are a 'client' focused company, not just a 'project' focused one."

---

## 🎨 Visual Identity System

### Primary Brand Colors (Tailwind Configuration)

```typescript
// tailwind.config.ts - Official MH Construction Color Palette
export default {
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary': '#386851',        // Hunter Green
          'primary-light': '#4a7a63',  // Lighter hunter green
          'primary-dark': '#2d5240',   // Darker hunter green
          'secondary': '#BD9264',      // Leather Tan
          'secondary-light': '#c9a176', // Lighter tan
          'secondary-dark': '#a67d52',  // Darker tan
          'accent': '#757575',         // Medium Gray accent
          'accent-light': '#9E9E9E',   // Lighter gray
          'accent-dark': '#424242',    // Darker gray
          'light': '#f7f9f7',          // Very light brand background
        },

        // Quick access aliases
        'mh-primary': '#386851',       // Hunter Green
        'mh-secondary': '#BD9264',     // Leather Tan

        // Semantic theme colors
        'surface': {
          DEFAULT: '#f8fafc',          // Light mode surface
          'secondary': '#f1f5f9',      // Light mode secondary surface
          'dark': '#1e293b',           // Dark mode surface
          'dark-secondary': '#334155', // Dark mode secondary surface
        },

        'text': {
          'primary': '#1e293b',        // Light mode primary text
          'secondary': '#64748b',      // Light mode secondary text
          'muted': '#94a3b8',          // Light mode muted text
          'primary-dark': '#f8fafc',   // Dark mode primary text
          'secondary-dark': '#cbd5e1', // Dark mode secondary text
          'muted-dark': '#64748b',     // Dark mode muted text
        },

        'border': {
          DEFAULT: '#e2e8f0',          // Light mode borders
          'light': '#f1f5f9',          // Light mode subtle borders
          'dark': '#334155',           // Dark mode borders
          'dark-light': '#475569',     // Dark mode subtle borders
        },

        // Professional supporting colors
        'supporting': {
          'success': '#386851',        // Use Hunter Green for success states
          'warning': '#BD9264',        // Use Leather Tan for warning states
          'error': '#424242',          // Use Dark Gray for error states
        },
      }
    }
  }
}
```text

### Color Usage Guidelines (Professional Implementation)

#### Hunter Green (`bg-brand-primary`, `text-brand-primary`) - Primary

- **Primary CTAs**: `<Button variant="primary">` components with `.btn-primary` enhancements
- **Header navigation**: `bg-brand-primary` backgrounds with custom nav classes
- **Active states**: `bg-brand-primary-dark` for pressed states
- **Logo applications**: `text-brand-primary` for brand elements with enhanced animations
- **Success states**: Also used for positive feedback and completed actions

#### Leather Tan (`bg-brand-secondary`, `text-brand-secondary`) - Secondary

- **Secondary CTAs**: `<Button variant="secondary">` components with `.btn-secondary` styling
- **Accent elements**: `bg-brand-secondary` backgrounds with custom enhancements
- **Complementary design**: `border-brand-secondary` borders with hover animations
- **Warm accent applications**: `text-brand-secondary` text with theme support
- **Warning states**: Also used for caution and attention indicators

#### Gray Palette (Professional Supporting Colors)

- **Medium Gray** (`#757575`): General accents, neutral elements, information states
- **Dark Gray** (`#424242`): Error states, high contrast text, disabled elements
- **Light Gray** (`#9E9E9E`): Subtle accents, placeholder text, muted elements

#### Usage Examples with Professional Approach

```tsx
// Primary button with brand colors and enhancements
<Button
  variant="primary"
  className="btn-primary bg-brand-primary hover:bg-brand-primary-dark focus:ring-brand-primary/50"
>
  Get Quote
</Button>

// Card with theme-aware styling and custom enhancements
<div
  className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark
    rounded-xl p-6 card-primary"
>
  <h3 className="text-brand-primary dark:text-brand-primary-light">Project Title</h3>
  <p className="text-text-secondary dark:text-text-secondary-dark">Description</p>
</div>

// Navigation with enhanced styling
<nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark nav-primary">
  Navigation with MH brand enhancements
</nav>

// Professional brand element with custom styling
<div className="bg-brand-primary text-white px-4 py-2 rounded-full">
  Veteran Owned & Operated
</div>
```text

---

## 🌙 Pure Tailwind Light/Dark Theme System

### Tailwind Theme Configuration

Our design system uses Tailwind's built-in dark mode with custom brand colors that automatically adapt.

---

## 🌙 Enhanced Tailwind Light/Dark Theme System

### Tailwind Theme Configuration with MH Brand Enhancement

Our design system uses Tailwind's built-in dark mode with custom brand colors and enhanced
CSS classes that automatically adapt.

```typescript
// tailwind.config.ts - Dark mode configuration
export default {
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      // MH brand colors integrated with Tailwind
    }
  }
}
```text

### Theme Implementation with Hybrid Approach

#### Light Mode (Default with Custom Enhancements)

```tsx
// Components use Tailwind utilities + custom MH classes
<div className="bg-surface text-text-primary border border-border card-primary">
  <h2 className="text-brand-primary">Light Mode Content</h2>
  <p className="text-text-secondary">Enhanced with MH brand styling</p>
</div>
```text

#### Dark Mode (`.dark` class with Enhanced Styling)

```tsx
// Same component automatically adapts with MH enhancements
<div
  className="bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark
    border border-border dark:border-border-dark card-primary"
>
  <h2 className="text-brand-primary dark:text-brand-primary-light">Dark Mode Content</h2>
  <p className="text-text-secondary dark:text-text-secondary-dark">
    Enhanced MH styling in dark mode
  </p>
</div>
```text

### Theme-Aware Component Patterns

#### Navigation with MH Enhancement

```tsx
<nav
  className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b
    border-border dark:border-border-dark backdrop-blur-sm nav-primary"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Link
      href="/"
      className="flex items-center transition-all duration-300 hover:scale-105 relative
        overflow-hidden group mh-logo-enhanced"
    >
      MH Logo with enhanced effects
    </Link>
  </div>
</nav>
```text

#### Button Component (Hybrid Approach)

```tsx
export function Button({ variant, children, ...props }) {
  const variants = {
    primary: `
      bg-brand-primary hover:bg-brand-primary-dark text-white
      btn-primary // Custom MH class for enhanced styling
      px-6 py-3 rounded-full font-bold transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-brand-primary/50
    `
  }

  return (
    <button
      className={`btn-base ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```text

#### Card Component (Enhanced with MH Styling)

```tsx
<div className="bg-surface dark:bg-surface-dark
  border border-border dark:border-border-dark rounded-xl shadow-sm
  hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/10
  transition-all duration-300 p-6 card-primary">
  <h3 className="text-brand-primary dark:text-brand-primary-light
    text-xl font-bold mb-4">
    Project Title
  </h3>
  <p className="text-text-secondary dark:text-text-secondary-dark mb-4">
    Project description with automatic theme adaptation and MH enhancements
  </p>
  <Button variant="primary" className="btn-primary">Learn More</Button>
</div>
```text

### Theme Migration Notes

MH Construction migrated from a hybrid custom CSS + Tailwind approach to a pure
Tailwind CSS v4 implementation in v2.6.0. All previous custom CSS classes
(e.g., `.btn-primary`, `.card-primary`, `.nav-primary`) have been replaced with
Tailwind utility classes and reusable components.

#### Key Migration Steps

- **Remove custom CSS files**: Delete legacy `.css` files and references.
- **Refactor components**: Update all components to use Tailwind utility classes only.
- **Update Button usage**: Replace `<button className="btn-primary">` with `<Button variant="primary">`.
- **Ensure theme support**: Add `dark:` variants for all color and background utilities.
- **Test accessibility**: Verify focus states, contrast, and motion preferences with Tailwind utilities.
- **Validate responsive design**: Use Tailwind breakpoints for all layouts and typography.

#### Example Migration

**Before (Custom CSS):**

```tsx
<button className="btn-primary btn-xl">Get Quote</button>
```text

**After (Pure Tailwind):**

```tsx
<Button variant="primary" size="xl">Get Quote</Button>
```text

### Theme Implementation with Pure Tailwind

#### Light Mode (Default)

```tsx
// Components automatically use light mode classes
<div className="bg-surface text-text-primary border border-border">
  <h2 className="text-brand-primary">Light Mode Content</h2>
  <p className="text-text-secondary">Automatically styled for light theme</p>
</div>
```text

#### Dark Mode (`.dark` class applied to `<html>`)

```tsx
// Same component automatically adapts to dark mode
<div className="bg-surface dark:bg-surface-dark
  text-text-primary dark:text-text-primary-dark
  border border-border dark:border-border-dark">
  <h2 className="text-brand-primary dark:text-brand-primary-light">
    Dark Mode Content
  </h2>
  <p className="text-text-secondary dark:text-text-secondary-dark">
    Automatically styled for dark theme
  </p>
</div>
````

### Pure Tailwind Component Patterns

#### Navigation with Pure Tailwind

````tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark
  border-b border-border dark:border-border-dark backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Link
      href="/"
      className="text-text-primary dark:text-text-primary-dark
        hover:text-brand-primary transition-colors"
    >
      Home
    </Link>
  </div>
</nav>
```text

#### Button Component (Pure Tailwind)

```tsx
export function Button({ variant, children, ...props }) {
  const variants = {
    primary: `
      bg-brand-primary border-2 border-brand-primary text-white
      hover:bg-brand-primary-dark hover:-translate-y-1
      focus:ring-2 focus:ring-brand-primary/50
      dark:shadow-[0_4px_16px_rgba(74,122,99,0.3)]
    `,
    secondary: `
      bg-brand-secondary border-2 border-brand-secondary text-white
      hover:bg-brand-secondary-dark hover:-translate-y-1
      focus:ring-2 focus:ring-brand-secondary/50
    `,
    outline: `
      bg-transparent border-2 border-brand-primary text-brand-primary
      hover:bg-brand-primary/5 dark:hover:bg-brand-primary-light/10
      dark:border-brand-primary-light dark:text-brand-primary-light
      focus:ring-2 focus:ring-brand-primary/50
    `
  }

  return (
    <button
      className={`${variants[variant]} px-6 py-3 rounded-full font-bold transition-all duration-300`}
      {...props}
    >
      {children}
    </button>
  )
}
```text

#### Card Component (Pure Tailwind)

```tsx
<div className="bg-surface dark:bg-surface-dark
  border border-border dark:border-border-dark rounded-xl shadow-sm
  hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/10
  transition-all duration-300 p-6">
  <h3 className="text-brand-primary dark:text-brand-primary-light
    text-xl font-bold mb-4">
    Project Title
  </h3>
  <p className="text-text-secondary dark:text-text-secondary-dark mb-4">
    Project description with automatic theme adaptation
  </p>
  <Button variant="primary">Learn More</Button>
</div>
```text

---

## 🔘 MH Construction Button Standards & Implementation Guide

### **Unified Button Design System**

MH Construction uses a standardized button system with consistent MH branding,
focusing on outlined buttons with rounded corners that match our card styling.
All buttons maintain accessibility, proper contrast, and responsive behavior
across the platform.

#### **Core Design Principles**

- **No Hero Section Buttons**: Hero sections contain only navigation elements, no CTA buttons
- **Consistent Rounded Corners**: `rounded-xl` to match card styling throughout the site
- **Outlined Design**: All buttons use outline styling for professional, clean appearance
- **MH Brand Colors**: Hunter green (#386851), black, white, and appropriate grays
- **Icon Integration**: Every button includes a relevant MaterialIcon
- **Size Consistency**: Uniform sizing within each section
- **Hover Color Changes**: All buttons change background and border colors on hover
- **Theme Awareness**: Proper light/dark mode support

#### **Button Variants & Usage Guidelines**

| Variant | Usage Context | Color Scheme | When to Use |
|---------|---------------|--------------|-------------|
| `primary` | Main CTAs | Hunter green outline | Primary conversions |
| `secondary` | Supporting | Gray outline | Secondary navigation |
| `neutral` | Defaults | Black/white (theme) | Standard interactions |

#### **Button Sizes & Section Standards**

| Size | Height | Padding | Icon Size | Usage Context |
|------|--------|---------|-----------|---------------|
| `lg` | 48px | 24px horizontal | `lg` (24px) | Hero sections, main CTAs |
| `md` | 40px | 16px horizontal | `md` (20px) | Content sections, cards |
| `sm` | 32px | 12px horizontal | `sm` (18px) | Compact areas, inline actions |

### **Implementation Examples**

#### **Primary Actions (Main CTAs)**

```tsx
// Content section primary action with hover color change
<Button
  variant="primary"
  size="lg"
  className="transition-all duration-300"
>
  <MaterialIcon icon="event" size="lg" className="mr-3" />
  Schedule Free Consultation
</Button>

// Standard primary button with hover effects
<Button
  variant="primary"
  size="default"
  className="transition-all duration-300"
>
  <MaterialIcon icon="smart_toy" size="md" className="mr-2" />
  Get AI Estimate
</Button>
```text

#### **Secondary Actions**

```tsx
// Supporting navigation actions with hover color change
<Button
  variant="secondary"
  size="lg"
  className="transition-all duration-300"
>
  <MaterialIcon icon="visibility" size="lg" className="mr-3" />
  View Portfolio
</Button>

// Alternative content actions
<Button
  variant="secondary"
  size="default"
  className="transition-all duration-300"
>
  <MaterialIcon icon="arrow_forward" size="md" className="mr-2" />
  Learn More
</Button>
```text

#### **Contact & Communication Actions**

```tsx
// Phone/contact buttons with hover effects
<Button
  variant="primary"
  size="lg"
  className="w-full transition-all duration-300"
>
  <MaterialIcon icon="phone" size="lg" className="mr-3" />
  <span className="text-center">
    Call Now<br />
    (509) 308-6489
  </span>
</Button>
```text

### **Standardized Button Styling**

#### **Base Button Classes**

```scss
// Core button styling - applies to all variants
.mh-button-base {
  @apply inline-flex items-center justify-center;
  @apply rounded-xl border-2;
  @apply font-medium transition-all duration-300;
  @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

// Primary variant (Hunter Green) with hover color changes
.mh-button-primary {
  @apply border-brand-primary bg-white text-brand-primary;
  @apply hover:bg-brand-primary hover:text-white hover:border-brand-primary-dark;
  @apply dark:bg-gray-900 dark:text-brand-primary-light;
  @apply focus:ring-brand-primary;
}

// Secondary variant (Gray) with hover color changes
.mh-button-secondary {
  @apply border-gray-300 bg-white text-gray-700;
  @apply hover:bg-gray-100 hover:border-gray-400;
  @apply dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300;
  @apply dark:hover:bg-gray-800 dark:hover:border-gray-500;
  @apply focus:ring-gray-500;
}

// Neutral variant (Theme-based) with hover color changes
.mh-button-neutral {
  @apply border-gray-800 bg-white text-gray-800;
  @apply hover:bg-gray-800 hover:text-white hover:border-gray-900;
  @apply dark:border-gray-200 dark:bg-gray-900 dark:text-gray-200;
  @apply dark:hover:bg-gray-200 dark:hover:text-gray-900 dark:hover:border-gray-100;
  @apply focus:ring-gray-500;
}
```text

#### **Size Specifications**

```scss
// Large buttons (Hero sections)
.mh-button-lg {
  @apply h-12 px-6 text-base;
}

// Medium buttons (Content sections)
.mh-button-md {
  @apply h-10 px-4 text-sm;
}

// Small buttons (Compact areas)
.mh-button-sm {
  @apply h-8 px-3 text-xs;
}
```text

### **Section-Specific Implementation Standards**

#### **Content Section Buttons**

- **Size**: `lg` (48px height) for main CTAs, `default` (40px height) for secondary actions
- **Layout**: Responsive grid with consistent spacing
- **Variants**: Primary for main actions, secondary for supporting actions
- **Icons**: `lg` size (24px) for large buttons, `md` size (20px) for default buttons
- **Hover Effects**: Background and border color changes with smooth transitions

```tsx
<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
  <Button variant="primary" size="lg" className="transition-all duration-300">
    <MaterialIcon icon="event" size="lg" className="mr-3" />
    Schedule Consultation
  </Button>
  <Button variant="secondary" size="lg" className="transition-all duration-300">
    <MaterialIcon icon="smart_toy" size="lg" className="mr-3" />
    Get AI Estimate
  </Button>
</div>
```text

#### **Navigation Section Buttons**

- **Size**: `default` (40px height)
- **Layout**: Responsive grid with consistent spacing
- **Variants**: Secondary for most navigation actions
- **Icons**: `md` size (20px)
- **Hover Effects**: Subtle background color changes

#### **Contact Section Buttons**

- **Size**: `lg` (48px height)
- **Layout**: 4-column grid on desktop, stacked on mobile
- **Variants**: Alternating primary/secondary for visual balance
- **Icons**: `lg` size (24px)
- **Special Styling**: Custom height (`h-16`) for contact grid buttons

### **Accessibility Standards**

#### **Required Attributes**

```tsx
<Button
  variant="primary"
  size="md"
  aria-label="Schedule a free consultation with MH Construction"
  role="button"
  tabIndex={0}
  className="mh-button-primary mh-button-md focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
>
  <MaterialIcon icon="event" size="md" className="mr-2" />
  Schedule Consultation
</Button>
```text

#### **Keyboard Navigation**

- **Tab Order**: Logical sequence through page content
- **Enter/Space**: Activates button action
- **Focus Indicators**: Visible ring with brand colors
- **Screen Reader**: Descriptive aria-labels

#### **Touch Targets**

- **Minimum Size**: 44px × 44px (WCAG guidelines)
- **Mobile Spacing**: 8px minimum between interactive elements
- **Full-Width Mobile**: Buttons expand to full width on small screens

### **Responsive Behavior**

#### **Mobile-First Implementation**

```tsx
<Button
  variant="primary"
  size="md"
  className="
    w-full sm:w-auto
    mh-button-primary mh-button-md
    mb-4 sm:mb-0
  "
>
  <MaterialIcon icon="phone" size="md" className="mr-2" />
  Contact Us
</Button>
```text

#### **Breakpoint Adjustments**

- **Mobile (< 640px)**: Full-width buttons, stacked layout
- **Tablet (640px - 1024px)**: 2-column grid for button groups
- **Desktop (> 1024px)**: Multi-column layouts with proper spacing

### **Dark Mode Standards**

#### **Color Adaptations with Hover Effects**

- **Backgrounds**: White → Gray-100 on hover (light mode), Gray-900 → Gray-800 on hover (dark mode)
- **Borders**: Subtle color intensification on hover for better visual feedback
- **Text**: Maintains readability with appropriate contrast during color transitions
- **Hunter Green**: Primary buttons invert colors on hover (green background, white text)

#### **Implementation Example**

```tsx
<Button className="
  border-2 border-brand-primary
  bg-white dark:bg-gray-900
  text-brand-primary dark:text-brand-primary-light
  hover:bg-brand-primary hover:text-white hover:border-brand-primary-dark
  transition-all duration-300
">
  Dark Mode Compatible Button with Hover Effects
</Button>
```text

---

## Icon System (Google Material Icons v4.0.2)

### **Complete Migration to Google Material Icons**

**MH Construction uses exclusively Google Material Icons throughout the entire**
**website for consistency, maintainability, and universal recognition.**

#### **MaterialIcon Component Implementation**

```tsx
// Single unified icon component used everywhere
import { MaterialIcon } from '@/components/icons/MaterialIcon';

// Usage examples
<MaterialIcon icon="smart_toy" size="xl" className="text-brand-secondary" />
<MaterialIcon icon="event" size="lg" className="text-brand-primary" />
<MaterialIcon icon="construction" size="2xl" className="text-brand-primary" />
```text

#### **Consistent Icon Standards**

**✅ DO:**

- Use `MaterialIcon` component for all icons
- Choose semantic icon names that match functionality
- Use consistent sizing within sections
- Apply proper theme-aware styling

**❌ DON'T:**

- Mix different icon libraries (lucide-react, react-icons, etc.)
- Use custom SVG icons unless absolutely necessary
- Inconsistent sizing within the same section
- Hard-coded colors that don't support dark mode

#### **Standard Icon Mappings**

| Function | Material Icon | Usage Context |
|----------|---------------|---------------|
| Calendar/Events | `event` | Scheduling, appointments |
| Time/Duration | `schedule` | Time slots, duration |
| Location | `place` | Addresses, locations |
| Phone | `phone` | Contact numbers |
| Email | `email` | Email addresses |
| AI/Smart Features | `smart_toy` | AI estimator, chatbot |
| Projects/Portfolio | `visibility` | View projects, gallery |
| Awards/Recognition | `workspace_premium` | Awards, achievements |
| Security | `security` | Security features |
| Success/Completion | `check_circle` | Success states |
| Construction | `construction` | Building, projects |
| Menu/Navigation | `menu` | Mobile menu, navigation |
| Search | `search` | Search functionality |
| Settings | `settings` | Configuration |
| Home | `home` | Home page navigation |
| Info | `info` | Information, about |
| Work | `work` | Projects, portfolio |
| Team | `group` | Team, people |
| Government | `account_balance` | Government services |
| Partnerships | `handshake` | Partners, relationships |
| Careers | `work_outline` | Job opportunities |
| Contact | `contact_mail` | Contact forms |

#### **Size System**

| Size | Tailwind Class | Pixel Size | Usage Context |
|------|----------------|------------|---------------|
| `sm` | `text-lg` | 18px | Inline text icons, small buttons |
| `md` | `text-xl` | 20px | Standard button icons, content |
| `lg` | `text-2xl` | 24px | Large buttons, card headers |
| `xl` | `text-3xl` | 30px | Section headers, feature highlights |
| `2xl` | `text-4xl` | 36px | Hero sections, major features |
| `3xl` | `text-5xl` | 48px | Large displays, special emphasis |
| `4xl` | `text-6xl` | 60px | Extra large displays, success states |

#### **Primary Action Examples**

```tsx
// Button with icon (standard pattern)
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" size="lg" className="mr-3" />
  Schedule Consultation
</Button>

// Section header with icon
<h2 className="flex items-center gap-3">
  <MaterialIcon icon="workspace_premium" size="xl" className="text-brand-primary" />
  Popular Projects
</h2>

// Success state with large icon
<div className="text-center">
  <MaterialIcon icon="check_circle" size="4xl" className="text-green-600 mb-4" />
  <h3>Success!</h3>
</div>

// Navigation item with icon
<a href="/contact" className="flex items-center gap-2">
  <MaterialIcon icon="contact_mail" size="md" />
  Contact Us
</a>
```text

#### **Theme Support**

```tsx
// Theme-aware icon styling
<MaterialIcon
  icon="construction"
  size="lg"
  className="text-brand-primary dark:text-brand-primary-light"
/>

// Conditional icon colors
<MaterialIcon
  icon="security"
  size="md"
  className="text-green-600 dark:text-green-400"
/>
```text

#### **Migration from Other Icon Libraries**

**Before (Lucide React):**

```tsx
import { Award, Calendar, Clock } from 'lucide-react'

<Award size={24} className="text-brand-primary" />
<Calendar size={18} />
<Clock size={16} />
```text

**After (Material Icons):**

```tsx
import { MaterialIcon } from '@/components/icons/MaterialIcon'

<MaterialIcon icon="workspace_premium" size="lg" className="text-brand-primary" />
<MaterialIcon icon="event" size="md" />
<MaterialIcon icon="schedule" size="sm" />
```text

#### **Icon Library Standards**

- **Primary Library**: Google Material Icons only
- **Fallback**: None - all icons must use MaterialIcon component
- **Custom Icons**: Only for brand-specific elements (logo, etc.)
- **Consistency**: Same icon for same function across entire site

---

### **📋 Comprehensive Icon Migration Guide**

**The following table provides exact MaterialIcon replacements for all**
**lucide-react icons currently used in the MH Construction codebase:**

| Lucide Icon | MaterialIcon Replacement | Usage Context |
|-------------|-------------------------|---------------|
| `Award` | `workspace_premium` | Awards, achievements, recognition |
| `ArrowRight` | `arrow_forward` | Next, continue, forward navigation |
| `ArrowLeft` | `arrow_back` | Previous, back navigation |
| `Calendar` | `event` | Dates, scheduling, appointments |
| `Clock` | `schedule` | Time, duration, timing |
| `Check` | `check` | Confirmation, success, completion |
| `CheckCircle` | `check_circle` | Success states, completion |
| `ChevronLeft` | `chevron_left` | Previous navigation, back |
| `ChevronRight` | `chevron_right` | Next navigation, forward |
| `Download` | `download` | Download actions, file downloads |
| `Edit` | `edit` | Edit actions, modify content |
| `ExternalLink` | `open_in_new` | External links, new window |
| `Filter` | `filter_list` | Filtering, sorting options |
| `Grid` | `grid_view` | Grid layout, gallery view |
| `List` | `list` | List view, linear layout |
| `Mail` | `email` | Email, contact, messages |
| `MapPin` | `place` | Location, address, map markers |
| `Monitor` | `computer` | Desktop, computer, device |
| `Phone` | `phone` | Phone numbers, calls |
| `Plus` | `add` | Add, create, new items |
| `Quote` | `format_quote` | Quotes, testimonials |
| `RefreshCw` | `refresh` | Refresh, reload, update |
| `Save` | `save` | Save actions, store data |
| `Search` | `search` | Search functionality |
| `Settings` | `settings` | Configuration, preferences |
| `Shield` | `security` | Security, protection |
| `Smartphone` | `phone_android` | Mobile devices, phones |
| `Star` | `star` | Ratings, favorites, reviews |
| `Target` | `center_focus_strong` | Goals, targeting, focus |
| `Trash2` | `delete` | Delete, remove, trash |
| `User` | `person` | Users, accounts, profiles |
| `Users` | `group` | Multiple users, teams |
| `Wifi` | `wifi` | Network, connectivity |
| `X` | `close` | Close, cancel, dismiss |
| `Zap` | `bolt` | Power, energy, fast actions |

#### **Priority Component Updates Required**

**High Priority (Used on main pages):**

1. ✅ **TestimonialsWidget** - Homepage testimonials section *(COMPLETED)*
2. ✅ **DynamicSearch** - Search and filtering features *(COMPLETED)*
3. **PWA Components** - App installation features *(2/6 completed)*

**Medium Priority (Feature components):**

1. ✅ **InteractiveGallery** - Portfolio and project galleries *(COMPLETED)*
2. ✅ **VeteranBenefitsCard** - Veteran services features *(COMPLETED)*
3. **AdminDashboard** - Administrative interfaces

#### **Recently Completed Components**

**✅ PWA Components (2/6 completed):**

- ✅ **PWAUpdate.tsx** *(COMPLETED)* - App update notifications
- ✅ **PWAInstall.tsx** *(COMPLETED)* - App installation prompts

**✅ Page Components:**

- ✅ **security/page.tsx** *(COMPLETED)* - Security dashboard page

#### **Remaining Components Requiring Updates**

**PWA Components (4 files remaining):**

- PushNotifications.tsx
- PWAInstallPrompt.tsx
- PWAUpdatePrompt.tsx
- BackgroundSyncStatus.tsx

**Dashboard Components (3 files):**

- AdminDashboard.tsx
- AnalyticsDashboard.tsx
- ContentManagementSimple.tsx

**Other Components (3 files):**

- JobApplicationModal.tsx
- TestimonialsDashboard.tsx
- SecurityDashboard.tsx

#### **Implementation Commands**

```tsx
// Before (Lucide React)
import { Award, Calendar, Search } from 'lucide-react'
<Award className="w-6 h-6 text-brand-primary" />
<Calendar size={18} />
<Search className="w-4 h-4 text-gray-400" />

// After (MaterialIcon)
import { MaterialIcon } from '@/components/icons/MaterialIcon'
<MaterialIcon icon="workspace_premium" size="lg" className="text-brand-primary" />
<MaterialIcon icon="event" size="sm" />
<MaterialIcon icon="search" size="sm" className="text-gray-400" />
```text

---
| `2xl` | `text-4xl` | 36px | Section headers |
| `3xl` | `text-5xl` | 48px | Hero sections |
| `4xl` | `text-6xl` | 60px | Large displays |

#### **Semantic Icon Mapping (Construction Industry Standard)**

| **Function** | **Material Icon** | **Semantic Rationale** |
|--------------|-------------------|------------------------|
| **AI Estimator** | `smart_toy` (🤖) | Modern AI representation |
| **Scheduling** | `event` (📅) | Universal calendar symbol |
| **Phone/Contact** | `phone` (📞) | Direct communication |
| **Construction** | `construction` (🏗️) | Industry helmet standard |
| **Trust/Security** | `security` (🛡️) | Protection and reliability |
| **Engineering** | `engineering` (⚙️) | Technical expertise |
| **Quality** | `star` (⭐) | Excellence measurement |
| **Verification** | `check_circle` (✅) | Completion and approval |
| **Navigation** | `arrow_forward` (➡️) | Clear directional flow |
| **Project Viewing** | `visibility` (👁️) | Exploration and transparency |

#### **Brand Values Icon Mapping**

```tsx
// Core company values with semantic accuracy
<MaterialIcon name="visibility" size="3xl" style="text-brand-primary" />        // Transparency
<MaterialIcon name="balance" size="3xl" style="text-brand-primary" />           // Integrity
<MaterialIcon name="precision_manufacturing" size="3xl" style="text-brand-primary" /> // Precision
<MaterialIcon name="favorite" size="3xl" style="text-brand-primary" />          // Client-First
<MaterialIcon name="engineering" size="3xl" style="text-brand-primary" />       // Professionalism
<MaterialIcon name="security" size="3xl" style="text-brand-primary" />          // Trust
```text

#### **Implementation Benefits**

- **Zero Dependencies**: Uses existing Google Material Icons font link
- **Universal Recognition**: Industry-standard symbols users instantly understand
- **Consistent Styling**: Unified size and color system across all components
- **Performance Optimized**: Font-based rendering with no JavaScript bundle impact
- **Maintainable**: Single component vs. 40+ custom icon imports
- **Accessible**: Built-in screen reader support and semantic meaning

---

### Typography System (Enhanced MH Construction Standards)

Our typography system now uses responsive scaling with clamp() functions and
modern font weights for optimal display across all devices.

```typescript
// tailwind.config.ts - Enhanced MH Construction Typography System
export default {
  theme: {
    extend: {
      fontFamily: {
        'tactic-bold': ['Tactic Sans Bold', 'Arial Black', 'sans-serif'],
        'tactic-medium': ['Tactic Sans Medium', 'Arial', 'sans-serif'],
        'garamond': ['Adobe Garamond Pro', 'Times New Roman', 'serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['clamp(0.75rem, 0.7rem + 0.2vw, 0.8rem)', { lineHeight: '1.25' }],
        'sm': ['clamp(0.875rem, 0.8rem + 0.3vw, 0.95rem)', { lineHeight: '1.25' }],
        'base': ['clamp(1rem, 0.9rem + 0.4vw, 1.1rem)', { lineHeight: '1.5' }],
        'lg': ['clamp(1.125rem, 1rem + 0.5vw, 1.25rem)', { lineHeight: '1.5' }],
        'xl': ['clamp(1.25rem, 1.1rem + 0.6vw, 1.4rem)', { lineHeight: '1.5' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem)', { lineHeight: '1.25' }],
        '3xl': ['clamp(1.875rem, 1.6rem + 1vw, 2.25rem)', { lineHeight: '1.25' }],
        '4xl': ['clamp(2.25rem, 1.9rem + 1.4vw, 3rem)', { lineHeight: '1.25' }],
        '5xl': ['clamp(3rem, 2.5rem + 2vw, 4rem)', { lineHeight: '1.2' }],
        '6xl': ['clamp(3.75rem, 3rem + 2.5vw, 5rem)', { lineHeight: '1.2' }],
        '7xl': ['clamp(4.5rem, 3.5rem + 3vw, 6rem)', { lineHeight: '1.2' }],
        '8xl': ['clamp(6rem, 4.5rem + 4vw, 8rem)', { lineHeight: '1.2' }],
      }
    }
  }
}
```text

#### Typography Implementation Standards

##### Responsive Header System

```tsx
// Large Section Headers (Hero, Main CTAs)
<h1 className="mb-10 pb-4 font-black text-gray-900 dark:text-white
  text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
  leading-relaxed tracking-tighter">
  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
    Building Tomorrow with
  </span>
  <span className="block text-brand-primary dark:text-brand-primary font-black">
    Today's Technology
  </span>
</h1>

// Section Headers (Features, Values, Testimonials)
<h2 className="mb-10 font-black text-gray-900 dark:text-gray-100
  text-5xl sm:text-6xl md:text-7xl lg:text-8xl
  leading-tight tracking-tighter">
  <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
    Section Introduction
  </span>
  <span className="block text-brand-primary dark:text-brand-primary font-black">
    Main Headline
  </span>
</h2>

// Body Text (Descriptions, Paragraphs)
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300
  text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
  Large descriptive text with proper dark mode support and responsive scaling.
</p>

// Card and Component Headers
<h3 className="mb-4 font-black text-gray-900 dark:text-gray-100 text-lg md:text-xl lg:text-2xl tracking-tight">
  Component Title
</h3>
```text

#### Font Weight Guidelines

- **font-black**: Main headlines, primary emphasis
- **font-semibold**: Secondary text, subheadings
- **font-light**: Body text, descriptions
- **font-medium**: Buttons, labels, navigation

#### Typography Usage with Pure Tailwind

```tsx
// Headings with brand fonts
<h1 className="font-tactic-bold text-4xl text-brand-primary dark:text-brand-primary-light">
  MH Construction
</h1>

<h2 className="font-tactic-medium text-2xl text-text-primary dark:text-text-primary-dark">
  Professional Services
</h2>

// Body text with theme awareness
<p className="font-garamond text-base text-text-secondary dark:text-text-secondary-dark leading-relaxed">
  Professional construction services with fluid typography that adapts to all screen sizes.
</p>

// Code/technical content
<code className="font-mono text-sm bg-surface dark:bg-surface-dark p-2 rounded">
  Technical specifications
</code>
```text

---

## 🏆 Enhanced Logo System (Pure Tailwind Implementation)

### Logo Implementation with Tailwind

```tsx
// Logo with hover effects using pure Tailwind
<Link
  href="/"
  className="flex items-center transition-opacity hover:opacity-80"
>
  <img
    src="/images/logo/mh-logo.png"
    alt="MH Construction"
    className="h-20 w-auto"
  />
</Link>
```text

### Header Logo (Pure Tailwind)

```tsx
<div className="flex-shrink-0 py-3">
  <Link
    href="/"
    className="flex items-center transition-all duration-300 hover:scale-105"
  >
    <img
      src="/images/logo/mh-logo.png"
      alt="MH Construction"
      className="h-20 w-auto filter drop-shadow-lg"
    />
  </Link>
</div>
```text

### Footer Logo (Pure Tailwind)

```tsx
<div className="text-center lg:text-left">
  <Image
    src="/images/logo/mh-logo.png"
    alt="MH Construction LLC - Veteran-Owned Excellence"
    width={280}
    height={140}
    className="cursor-pointer filter drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300"
    priority
  />
</div>
```text

---

## 🔲 MH Brand Button System (Pure Tailwind Implementation)

### Button Component Architecture

All buttons use the reusable `Button` component with pure Tailwind styling that
automatically adapts to themes.

**IMPORTANT**: No custom CSS classes are used. All styling is done with Tailwind
utility classes directly in the component code.

#### Button Component Implementation

```tsx
// /src/components/ui/Button.tsx
export function Button({
  variant = 'primary',
  size = 'md',
  withRing = true,
  children,
  className = '',
  ...props
}) {
  const baseClasses = 'font-bold rounded-full transition-all duration-300 focus:outline-none '
    + 'disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center '
    + 'gap-2 relative group'

  const variantClasses = {
    primary: `
      bg-brand-primary border-2 border-brand-primary text-white
      shadow-[0_4px_16px_rgba(56,104,81,0.2)] dark:shadow-[0_4px_16px_rgba(74,122,99,0.3)]
      hover:bg-brand-primary-dark hover:-translate-y-1
      hover:shadow-[0_0_0_3px_rgba(56,104,81,0.3),0_8px_25px_rgba(56,104,81,0.35)]
      focus:ring-2 focus:ring-brand-primary/50
    `,
    secondary: `
      bg-brand-secondary border-2 border-brand-secondary text-white
      shadow-[0_4px_16px_rgba(189,146,100,0.2)]
      hover:bg-brand-secondary-light hover:-translate-y-1
      hover:shadow-[0_0_0_3px_rgba(189,146,100,0.3),0_8px_25px_rgba(189,146,100,0.35)]
      focus:ring-2 focus:ring-brand-secondary/50
    `,
    outline: `
      bg-transparent border-2 border-brand-primary text-brand-primary
      hover:bg-brand-primary/5 dark:hover:bg-brand-primary-light/10
      dark:border-brand-primary-light dark:text-brand-primary-light
      hover:-translate-y-0.5 focus:ring-2 focus:ring-brand-primary/50
    `
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
    xl: 'px-8 py-4 text-xl min-h-[60px]'
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
        .replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </button>
  )
}
```text

#### Button Usage Examples

```tsx
// Primary CTA buttons
<Button variant="primary" size="xl">
  Schedule Free Consultation
</Button>

// Secondary actions
<Button variant="secondary" size="lg">
  View Portfolio
</Button>

// Outline buttons for secondary CTAs
<Button variant="outline" size="md">
  Learn More
</Button>

// Custom styling with Tailwind classes
<Button
  variant="primary"
  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-primary"
>
  Custom Styled Button
</Button>
```text

#### Special Purpose Buttons

```tsx
// Veteran services button (uses brand colors)
<Button
  variant="primary"
  size="lg"
>
  <MaterialIcon icon="military_tech" size="lg" className="mr-3" />
  Veteran Services
</Button>

// Dashboard access button (uses brand colors)
<Button
  variant="primary"
  size="lg"
>
  <MaterialIcon icon="admin_panel_settings" size="lg" className="mr-3" />
  Team Access
</Button>
```text

---

## 🎯 Standardized CTA & Spacing System (v2.6.1)

### Call-to-Action Button Standards

Our CTA system ensures consistency across all pages and proper dark/light mode support
without custom overrides.

#### Primary CTA Patterns

```tsx
// Hero Section CTAs
<div className="flex sm:flex-row flex-col justify-center items-center gap-8 mb-16">
  <Link href="/booking">
    <Button variant="primary" size="xl" className="shadow-xl">
      <CalendarIcon size="sm" primaryColor="currentColor" className="mr-3" />
      <span className="z-10 relative tracking-wide">Schedule Free Consultation</span>
    </Button>
  </Link>
  <Link href="/estimator">
    <Button variant="outline" size="xl" className="shadow-xl">
      <BoltIcon size="sm" primaryColor="currentColor" className="mr-3" />
      <span className="z-10 relative tracking-wide">Get AI Estimate</span>
    </Button>
  </Link>
</div>

// Section CTAs (Testimonials, Projects)
<Button variant="outline" size="xl" className="shadow-xl">
  <span className="z-10 relative">View All Testimonials</span>
</Button>

// Special Background CTAs (CTA Section on Brand Background)
<Button
  variant="outline"
  size="xl"
  className="shadow-xl bg-transparent border-white text-white hover:bg-white
    hover:text-brand-primary"
>
  <BoltIcon size="md" primaryColor="currentColor" className="mr-3" />
  <span className="z-10 relative tracking-wide">Get Free Estimate</span>
</Button>
```text

#### CTA Consistency Rules

- **Always use Button component**: Never create custom button styling
- **Standard variants**: Use `primary`, `secondary`, or `outline` variants only
- **Size consistency**: Use `xl` for main CTAs, `lg` for secondary actions
- **Shadow effects**: Add `shadow-xl` for elevation consistency
- **Icon spacing**: Use `mr-3` for icon-text spacing
- **No custom overrides**: Let Button component handle dark mode automatically
- **Special cases only**: Override colors only for special backgrounds (like brand gradients)

### Section Spacing Standards

#### Responsive Section Padding

```tsx
// Standard section spacing (most sections)
<section
  className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40
    [section-name]-section"
>

// Hero section (full viewport height with perfect centering)
<section className="relative bg-white dark:bg-gray-900 h-screen hero-section">
  <div
    className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full flex
      items-center justify-center pt-32 pb-8"
  >
    <FadeInWhenVisible className="text-center w-full">
      {/* Hero content here */}
    </FadeInWhenVisible>
  </div>
</section>

// Compact sections (stats, smaller content)
<section className="relative bg-white dark:bg-gray-900 py-20 lg:py-32 stats-section">
```text

#### Header Spacing Within Sections

```tsx
// Section headers with responsive margin
<div className="mb-24 lg:mb-32 text-center scroll-reveal">
  <div
    className="inline-flex items-center bg-brand-primary/10 shadow-lg mb-10 px-8 py-4
      border border-brand-primary/20 rounded-full"
  >
    // Section badge
  </div>
  <h2>Section Title</h2>
  <p>Section description</p>
</div>
```text

#### Grid and Card Spacing

```tsx
// Consistent card heights
<div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <Card className="h-full">Card content</Card>
</div>

// Enhanced grid layouts for capabilities
<div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
  // Responsive grid with better balance
</div>
```text

### Spacing Hierarchy

| Element | Spacing Classes | Usage |
|---------|----------------|-------|
| **Sections** | `py-20 lg:py-32 xl:py-40` | Standard section padding |
| **Hero Section** | `h-screen` with `pt-32 pb-8` | Full viewport height with nav offset |
| **Section Headers** | `mb-24 lg:mb-32` | Header to content spacing |
| **Header Elements** | `mb-10` | Title to description |
| **CTAs** | `gap-8 mb-8` | Between CTAs and spacing below |
| **Cards** | `gap-8` | Between grid items |
| **Container** | `px-4 sm:px-6 lg:px-8` | Horizontal container padding |

---

### 🏠 Hero Section Standards (v4.0.2)

#### Comprehensive Documentation Reference

**For complete hero section implementation details, see [Typography Standards - Hero Section](../branding/standards/typography.md#-hero-section-typography-standards).**

#### Full Viewport Hero Implementation

**Updated November 4, 2025** - All pages must implement the standardized hero section format for consistent user experience, proper navigation visibility, and optimal typography scaling.

```tsx
// Enhanced Hero Section - Current Standard (v4.0.2)
// NO BADGES, NO CTA BUTTONS - Content Only
<section className="relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 h-screen flex items-center justify-center text-white overflow-hidden">
  {/* Background Elements */}
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20"></div>

  {/* Main Content Container - Positioned below header, above navigation bar */}
  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-28">
    <div className="space-y-2 sm:space-y-3 md:space-y-4 lg:space-y-6">

      {/* Main Title - Responsive scaling */}
      <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black leading-tight tracking-tight">
        <span className="block text-brand-secondary font-black drop-shadow-lg">
          Your Partnership in Construction Excellence
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-3xl mx-auto text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug px-2">
        We Work With You Every Step. Military Precision. Advanced Technology.
      </p>

      {/* Description */}
      <p className="max-w-4xl mx-auto text-xs sm:text-sm md:text-base lg:text-lg text-white/80 leading-relaxed px-4">
        "Building for the Owner, NOT the Dollar" — Partnering with Tri-Cities communities since 2010 - where veteran values meet collaborative construction management for extraordinary results.
      </p>
    </div>
  </div>

  {/* Page-Specific Navigation Bar - Always visible at bottom */}
  <PageNavigation
    items={navigationConfigs.pageName}
    className="absolute bottom-0 left-0 right-0"
  />
</section>
```

#### Key Hero Section Features (v4.0.2)

- **Exact Viewport Height**: `h-screen` ensures hero fills complete viewport (no gap to next section)
- **NO BADGES**: All decorative badges removed (veteran badges, military_tech icons, etc.)
- **NO CTA BUTTONS**: Removed all Call-to-Action buttons from hero sections for cleaner design
- **Content ONLY**: Title, subtitle, and description text only
- **Heading Below Logo**: Top padding (`pt-16` to `pt-40`) positions content below header logo
- **Responsive Typography**: Aggressive scaling from `text-lg` (mobile) to `xl:text-5xl` (desktop)
- **Tight Spacing**: Reduced gaps (`space-y-2` to `space-y-6`) prevent overlap on small screens
- **Navigation Bar Visible**: Bottom padding ensures PageNavigation is always visible on page load
- **No Hydration Errors**: Uses `h-screen` instead of `h-[100dvh]` for SSR compatibility
- **Overflow Hidden**: Prevents horizontal scrolling and content overflow

#### Responsive Padding Standards

| Element | Mobile (base) | Tablet (sm/md) | Desktop (lg/xl) |
|---------|---------------|----------------|-----------------|
| Top Padding | `pt-16` | `pt-24`/`pt-32` | `pt-40` |
| Bottom Padding | `pb-12` | `pb-16`/`pb-20` | `pb-28` |
| Vertical Spacing | `space-y-2` | `space-y-3`/`space-y-4` | `space-y-6` |

#### Typography Scaling

| Element | Mobile | Tablet | Desktop | Large Desktop |
|---------|--------|--------|---------|---------------|
| Main Title | `text-lg` | `sm:text-2xl` | `lg:text-4xl` | `xl:text-5xl` |
| Subtitle | `text-xs` | `sm:text-base` | `lg:text-xl` | - |
| Description | `text-xs` | `sm:text-sm` | `lg:text-lg` | - |

#### Hero Section Benefits

- ✅ **Consistent Cross-Page**: All pages follow identical hero structure
- ✅ **Perfect Viewport Fit**: Content visible without scrolling on all devices
- ✅ **No Overlap**: Text properly spaced from header and navigation bar
- ✅ **Mobile Optimized**: Aggressive scaling prevents content overflow on small screens
- ✅ **Navigation Visible**: Section links immediately accessible to users
- ✅ **Clean Design**: No CTA buttons in hero creates focused, professional appearance
- ✅ **Performance**: No hydration errors, optimal rendering

---

## 🎯 Component Standards (Pure Tailwind Implementation)

### Navigation System (Pure Tailwind)

```tsx
// Navigation with complete Tailwind implementation
<nav
  className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b
    border-border dark:border-border-dark backdrop-blur-sm"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-24 py-2">
      {/* Logo */}
      <div className="flex-shrink-0 py-3">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <img
            src="/images/logo/mh-logo.png"
            alt="MH Construction"
            className="h-20 w-auto"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="/about"
          className="text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors"
        >
          About
        </Link>
        <Link
          href="/services"
          className="text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors"
        >
          Services
        </Link>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="outline">Get Quote</Button>
        <Button variant="primary">Contact Us</Button>
      </div>
    </div>
  </div>
</nav>
```text

### Card System (Pure Tailwind)

```tsx
// Card component with full theme support
<div
  className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark
    rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
    hover:shadow-brand-primary/10 p-6"
>
  <div className="mb-4">
    <h3 className="text-brand-primary dark:text-brand-primary-light text-xl font-bold mb-2">
      Project Title
    </h3>
    <p className="text-text-secondary dark:text-text-secondary-dark">
      Detailed project description with automatic theme adaptation
    </p>
  </div>

  <div className="flex items-center justify-between">
    <span className="text-text-muted dark:text-text-muted-dark text-sm">
      Completed 2024
    </span>
    <Button variant="outline" size="sm">
      View Details
    </Button>
  </div>
</div>
```text

### Form Elements (Pure Tailwind)

```tsx
// Form inputs with complete theme support
<div className="space-y-4">
  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
    >
      Email Address
    </label>
    <input
      type="email"
      id="email"
      className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg
        bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark
        placeholder-text-muted dark:placeholder-text-muted-dark transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
      placeholder="Enter your email"
    />
  </div>

  <div>
    <label
      htmlFor="message"
      className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
    >
      Message
    </label>
    <textarea
      id="message"
      rows={4}
      className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg
        bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark
        placeholder-text-muted dark:placeholder-text-muted-dark transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary
        resize-vertical"
      placeholder="Tell us about your project"
    />
  </div>

  <Button variant="primary" className="w-full">
    Send Message
  </Button>
</div>
```text

### Enhanced Footer System (Pure Tailwind Implementation)

**Recent Enhancements (October 24, 2025)**: Streamlined design with interactive features following
MH branding standards for clean, professional user experience.

The footer system showcases comprehensive MH branding with sharp-edged logo, organized
navigation, veteran recognition elements, and interactive features.

#### Current Footer Implementation Features

**🎨 Streamlined Bottom Bar Design**
- **Clean Layout**: Consolidated two cluttered rows into single, professional bottom section
- **Visual Hierarchy**: Clear separation between copyright/credentials and company branding
- **Brand Compliance**: Follows "streamlined without duplicate links" directive
- **Professional Polish**: Eliminates redundancy while maintaining essential information

**⚡ Interactive Elements**
- **Credential Badges**: Hover effects on licensing badges with brand color transitions
- **Back-to-Top Button**: Positioned on left side with smooth scroll behavior
- **Clickable Logo**: Links to homepage with enhanced hover effects
- **Animated Tagline**: Interactive company motto with subtle animations

**🌐 Brand-Specific Social Media Gradients**
- **Facebook**: Official blue gradient (`#1877F2` → `#42A5F5` → `#1565C0`)
- **Instagram**: Signature gradient (`#833AB4` → `#FD1D1D` → `#F77737`)
- **X (Twitter)**: Modern design (`#000000` → `#1D9BF0` → `#000000`)
- **YouTube**: Red gradient (`#FF0000` → `#FF4444` → `#CC0000`)
- **LinkedIn**: Professional blue (`#0A66C2` → `#0E76A8` → `#004182`)

**📋 State License Information**
- **Interactive Tooltips**: Hover over state abbreviations to view license numbers
- **WA License**: MHCONCI907R7
- **OR License**: 765043-99
- **ID License**: RCE-49250
- **Professional Display**: Dark tooltips with proper positioning and animations

**🎯 Technical Standards**
- **300ms Transitions**: All animations follow MH branding interaction guidelines
- **Accessibility**: Proper tooltips, aria-labels, and keyboard navigation
- **Mobile Optimization**: Touch-friendly interactions and responsive design
- **Brand Colors**: Uses official Hunter Green and Leather Tan palette

#### Footer Structure

```tsx
// Clean Footer with MH Branding
<footer
  className="bg-gradient-to-br from-gray-800 via-gray-900 to-black dark:from-black
    dark:via-gray-900 dark:to-black pt-16 pb-6 text-gray-300 border-t
    border-brand-primary/20"
>

  {/* Four-Column Layout */}
  <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

    {/* Column 1: Sharp-Edged Logo & Contact with Icons */}
    <div className="space-y-6">
      <Image
        src="/images/logo/mh-logo.png"
        alt="MH Construction LLC - Veteran-Owned Excellence"
        width={280}
        height={140}
        className="cursor-pointer filter drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300"
        priority
      />
      {/* Contact info with brand icons (PhoneIcon, EmailIcon, LocationIcon) */}
    </div>

    {/* Column 2: Main Navigation (No Icons) */}
    {/* Clean text-only navigation links */}

    {/* Column 3: Resources & Programs (No Icons) */}
    {/* Clean text-only resource links */}

    {/* Column 4: Enhanced Social Media */}
    {/* Single row of icon-only social media links (Facebook, Instagram, LinkedIn, X, YouTube) */}
  </div>

  {/* Clean Bottom Bar */}
  <div className="pt-8 pb-6 border-t border-brand-primary/30">
    {/* Copyright, legal links, veteran badge - no team portal duplication */}
    <div className="text-center mt-6 pt-4 border-t border-gray-700/50">
      <p className="text-brand-primary dark:text-brand-primary-light font-semibold text-sm italic">
        "Building Tomorrow with Today's Technology - Where Military Precision Meets Construction Excellence"
      </p>
    </div>
  </div>
</footer>
```text

#### Key Footer Features

- **Sharp-Edged Logo**: Clickable logo linking to homepage with enhanced hover effects
- **Complete Page Navigation**: All available routes organized by category
- **Selective Icon Usage**: Icons only in contact section for clarity
- **Interactive Social Media**: Brand-specific gradient hover effects for each platform
  - Facebook: Official blue gradient
  - Instagram: Signature purple-to-orange gradient
  - X: Modern black with blue accent
  - YouTube: Red gradient variations
  - LinkedIn: Professional blue gradient
- **Veteran Recognition**: Prominent veteran-owned badges and military values
- **Brand Typography**: Gradient text headers using MH brand colors
- **Streamlined Bottom Bar**: Single clean section with interactive credential badges
- **State License Tooltips**: Hover-accessible license numbers for WA, OR, and ID
- **Interactive Elements**: Back-to-top button, animated tagline, and credential hover effects
- **Professional Polish**: 300ms transitions following MH interaction standards

### Status Indicators (Pure Tailwind)

```tsx
// Status badges with theme-aware colors
<div className="flex flex-wrap gap-2">
  <span
    className="px-3 py-1 bg-success-light text-success-dark border border-success
      rounded-full text-sm font-medium"
  >
    ✅ Completed
  </span>
  <span
    className="px-3 py-1 bg-warning-light text-warning-dark border border-warning
      rounded-full text-sm font-medium"
  >
    ⚠️ In Progress
  </span>
  <span
    className="px-3 py-1 bg-error-light text-error-dark border border-error rounded-full
      text-sm font-medium"
  >
    ❌ On Hold
  </span>
  <span className="px-3 py-1 bg-info-light text-info-dark border border-info rounded-full text-sm font-medium">
    ℹ️ Planning
  </span>
</div>
```text

---

## ♿ Accessibility & Pure Tailwind Standards

### Contrast Compliance (Tailwind Implementation)

- **Light Mode**: All color combinations meet WCAG AA standards using Tailwind's semantic colors
- **Dark Mode**: Enhanced contrast ratios with `dark:` variants for improved readability
- **High Contrast**: Tailwind's contrast utilities support `prefers-contrast: high`

```tsx
// High contrast button for accessibility
<Button
  variant="primary"
  className="contrast-more:bg-black contrast-more:border-black contrast-more:text-white"
>
  High Contrast Button
</Button>
```text

### Motion Sensitivity (Tailwind Implementation)

```tsx
// Respect user motion preferences with Tailwind
<div className="transition-all duration-300 motion-reduce:transition-none">
  <Button
    variant="primary"
    className="hover:scale-105 motion-reduce:hover:scale-100 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
  >
    Motion-Aware Button
  </Button>
</div>

// Logo with respectful animations
<img
  className="transition-transform duration-500 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
  src="/images/logo/mh-logo.png"
  alt="MH Construction"
/>
```text

### Focus States (Pure Tailwind)

```tsx
// Theme-aware focus indicators using Tailwind
<Button
  variant="primary"
  className="focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2
    focus:ring-offset-white dark:focus:ring-offset-surface-dark"
>
  Accessible Button
</Button>

// Form inputs with proper focus styling
<input
  type="email"
  className="focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary dark:focus:ring-brand-primary-light"
  placeholder="Email address"
/>

// Navigation links with focus support
<Link
  href="/about"
  className="focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-md px-2 py-1"
>
  About Us
</Link>
```text

### Screen Reader Support

```tsx
// Proper ARIA labels and semantic HTML
<Button
  variant="primary"
  aria-label="Schedule a free consultation with MH Construction"
  className="focus:ring-2 focus:ring-brand-primary"
>
  <CalendarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
  Schedule Consultation
</Button>

// Theme toggle with accessibility
<button
  onClick={toggleTheme}
  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
  className="p-2 rounded-lg border border-border dark:border-border-dark
    hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary transition-colors
    focus:outline-none focus:ring-2 focus:ring-brand-primary"
>
  {theme === 'dark' ? '☀️' : '🌙'}
</button>
```text

---

## 🏗️ Implementation Guidelines (Pure Tailwind v4)

### Project Architecture
>
> **MH Construction uses pure Tailwind CSS v4.1.13 with zero custom CSS classes**
>
> - Complete theme support with Tailwind's dark mode
> - Brand colors configured in `tailwind.config.ts`
> - Component-based architecture with reusable Button component
> - Accessibility-first design with Tailwind utilities

### Tailwind Configuration Reference

```typescript
// tailwind.config.ts - Complete MH Construction configuration
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // MH Construction Brand Colors
        'brand': { /* Brand color configuration */ },
        'surface': { /* Surface color system */ },
        'text': { /* Text color system */ },
        'border': { /* Border color system */ },
        'veteran': { /* Veteran recognition colors */ },
        // Status Colors
        'success': { /* Success color variants */ },
        'warning': { /* Warning color variants */ },
        'error': { /* Error color variants */ },
        'info': { /* Info color variants */ },
      },
      fontFamily: { /* Typography system */ },
      fontSize: { /* Fluid typography scale */ },
      // ... complete configuration
    },
  },
  plugins: [],
}

export default config
```text

### Component Usage with Pure Tailwind

```tsx
// Modern component with pure Tailwind - NO custom CSS classes
import { Button } from '@/components/ui/Button'

export function ProjectCard({ project }) {
  return (
    <div
      className="bg-surface dark:bg-surface-dark border border-border
        dark:border-border-dark rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg
        hover:shadow-brand-primary/10 transition-all duration-300 p-6"
    >

      {/* Header with theme-aware text */}
      <div className="mb-4">
        <h3
          className="text-brand-primary dark:text-brand-primary-light text-xl
            font-tactic-bold mb-2"
        >
          {project.title}
        </h3>
        <p className="text-text-secondary dark:text-text-secondary-dark font-garamond">
          {project.description}
        </p>
      </div>

      {/* Status badge */}
      <div className="mb-4">
        <span
          className="px-3 py-1 bg-success-light text-success-dark border border-success
            rounded-full text-sm font-medium"
        >
          ✅ {project.status}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <span className="text-text-muted dark:text-text-muted-dark text-sm">
          Completed {project.year}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <Button variant="primary" size="sm">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  )
}
```text

### Theme Implementation

```tsx
// Theme toggle with pure Tailwind
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border dark:border-border-dark bg-surface
        hover:bg-surface-secondary dark:bg-surface-dark
        dark:hover:bg-surface-dark-secondary transition-colors focus:outline-none
        focus:ring-2 focus:ring-brand-primary"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```text

### Brand Compliance Checklist (Pure Tailwind v4)

- [ ] ✅ Uses official MH brand colors via Tailwind configuration
- [ ] ✅ Implements pure Tailwind classes (NO custom CSS classes)
- [ ] ✅ Uses Button component for all interactive elements
- [ ] ✅ Supports both automatic (`prefers-color-scheme`) and manual theme switching
- [ ] ✅ Maintains proper contrast ratios with Tailwind semantic colors
- [ ] ✅ Includes accessibility features using Tailwind utilities
- [ ] ✅ Respects user motion and contrast preferences
- [ ] ✅ Tests properly in both light and dark modes
- [ ] ✅ Uses semantic HTML with proper ARIA labels
- [ ] ✅ Implements responsive design with Tailwind breakpoints

### Migration from Custom CSS (v2.5.0 → v2.6.0)

```tsx
// OLD APPROACH (v2.5.0) - Custom CSS classes
<button className="btn-primary btn-xl">Get Quote</button>
<div className="card-primary">Content</div>
<nav className="nav-primary">Navigation</nav>

// NEW APPROACH (v2.6.0+) - Pure Tailwind
<Button variant="primary" size="xl">Get Quote</Button>
<div
  className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark
    rounded-xl p-6"
>
  Content
</div>
<nav
  className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b
    border-border dark:border-border-dark"
>
  Navigation
</nav>
```text

### Development Best Practices

1. **Always use the Button component** for interactive elements
2. **Never create custom CSS classes** - use Tailwind utilities
3. **Test in both themes** during development
4. **Use semantic color names** (`bg-surface` not `bg-gray-100`)
5. **Include dark mode variants** for all colored elements
6. **Respect accessibility preferences** with motion and contrast utilities
7. **Use TypeScript** for component props and configuration

---

## 📞 Brand Governance

### Authority & Updates

- **Final Approval**: MH Construction Leadership Team
- **Implementation**: Pure Tailwind CSS v4 with zero custom classes
- **Guidelines**: This document + `tailwind.config.ts` configuration
- **Component Library**: `/src/components/ui/` for reusable components

### Technical Contact Information

- **Brand Guidelines**: <office@mhc-gc.com>
- **Tailwind Implementation**: See `tailwind.config.ts` and Button component
- **Theme Support**: Complete Tailwind dark mode implementation
- **Technical Support**: Pure Tailwind architecture documentation

### Version History

- **v2.6.0** (September 22, 2025): Complete migration to pure Tailwind CSS v4
- **v2.5.0** (Previous): Custom CSS classes with theme support
- **Migration**: All custom classes replaced with Tailwind utilities and components

---

**This comprehensive brand system ensures consistent, professional, and veteran-proud
representation across all digital touchpoints using pure Tailwind CSS v4 with complete
accessibility and theme support.** 🏗️

> "Your Partnership in Construction Excellence - Where Military Precision Meets
> Collaborative Construction Management"

### 🚀 **Pure Tailwind Benefits Achieved:**

- ✅ **Zero Custom CSS**: All styling uses Tailwind utilities
- ✅ **Improved Performance**: Smaller bundle size, better caching
- ✅ **Enhanced Maintainability**: Single source of truth for styling
- ✅ **Better Developer Experience**: IntelliSense, autocomplete, tooling support
- ✅ **Future-Proof**: Compatible with Tailwind CSS v4 and beyond
- ✅ **Consistent Design System**: Component-based architecture
- ✅ **Accessibility First**: Built-in Tailwind accessibility utilities

---

Brand Guidelines v2.6.1 | September 23, 2025 | MH Construction LLC | Pure Tailwind CSS v4 Implementation
````
