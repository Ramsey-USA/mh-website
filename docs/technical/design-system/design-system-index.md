# Design System Documentation Hub

**Category:** Technical - Design System & UI Standards  
**Last Updated:** December 17, 2025  
**Status:** ✅ Active - Complete Navigation Hub

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../../master-index.md) - Central hub for all documentation
- [🛠️ Technical Index](../technical-index.md) - Technical documentation hub
- [🎨 Branding Standards](../../branding/standards/standards-index.md) - Brand visual standards
- [💼 Development Guidelines](../../development/consistency-guide.md) - Implementation patterns
- [🏠 Homepage Reference](./homepage-reference-guide.md) - ⭐ **Canonical design reference**

---

## 📋 Overview

The MH Construction Design System provides comprehensive standards for creating consistent, accessible, and
brand-aligned user interfaces. This hub connects all design system documentation including buttons, CTAs, icons,
layout, typography, and mobile optimization.

**🏠 HOMEPAGE AS CANONICAL REFERENCE:**  
The [Homepage Reference Guide](./homepage-reference-guide.md) documents the complete look and feel of the website. **When in doubt about design decisions, reference the homepage** - it exemplifies all patterns in this design system.

**What's Here:**

- Complete design system standards and specifications
- Component libraries and patterns
- Layout and spacing guidelines
- Typography and color systems
- Icon and button documentation
- Mobile and responsive design guides
- Accessibility requirements

---

## 🏠 Homepage Reference (NEW)

### **Complete Homepage Design Patterns**

**[homepage-reference-guide.md](./homepage-reference-guide.md)** - ⭐ **CANONICAL DESIGN REFERENCE**

Comprehensive breakdown of every homepage section documenting the complete "look and feel" of the MH Construction website. This guide serves as the authoritative reference for visual consistency.

**Complete Coverage:**

- Hero Section with positioning and color strategy
- Core Values Section with diagonal stripes and brand blobs
- Why Partner Section with stat cards
- Services Showcase with interactive modals
- Our Process Timeline with alternating layout
- All background patterns, animations, and responsive behaviors

**Use Cases:**

- Understanding the complete design language
- Starting any new page or section
- Ensuring visual consistency
- Resolving design questions
- Onboarding new developers

**Key Principle:** The homepage exemplifies all design system patterns. When unsure about spacing, colors, typography, or any visual element, check the homepage first.

---

## 🎨 Core Design System

### Design System Standards

**[design-system.md](./design-system.md)** - Complete design system documentation

Comprehensive guide covering brand identity, typography system, component standards, layout patterns, and accessibility requirements.

**Topics Covered:**

- Brand colors and CSS variables
- Typography scale and patterns
- Section header standards
- Component spacing and layout
- Interactive element specifications
- Gradient and emphasis patterns
- Dark mode implementation
- Responsive design principles

**Use Cases:**

- Understanding overall design system architecture
- Reference for component development
- Maintaining brand consistency
- Implementing new features

---

## 🔘 Buttons & CTAs

### Complete Button & CTA Documentation

**[buttons-and-ctas/](./buttons-and-ctas/)** - Unified button and CTA hub

Complete documentation for all button variants, CTA patterns, link validation, and navigation rules.

**Documentation Structure:**

- **[Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md)** - Complete button system documentation
- **[Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md)** - All button & CTA specifications
- **[Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md)** - Consolidated CTA patterns and validation

**Quick Reference:**

| Button Variant | Color                  | Use Case                                |
| -------------- | ---------------------- | --------------------------------------- |
| Primary        | Hunter Green (#386851) | Main actions, IRL consultations         |
| Secondary      | Leather Tan (#BD9264)  | Automated Estimator, supporting actions |
| Outline        | Transparent border     | Subtle actions, navigation              |
| Neutral        | Theme-aware gray       | System actions, UI controls             |

**When to Use:**

- Implementing interactive buttons
- Creating call-to-action elements
- Navigation link patterns
- Form submissions and actions
- Partnership messaging CTAs

---

## 🎭 Icons

### Complete Icon System Documentation

**[icons/](./icons/)** - Unified icon system hub

Complete documentation for Material Icons implementation, emoji-free policy, usage inventory, and specialized guides.

**Documentation Structure:**

- **[Icons Index](./icons-index.md)** - Navigation hub
- **[Icon Policy Complete](./icon-policy.md)** - Emoji-free policy & standards
- **[Icon Usage Inventory](./icons/icon-usage-inventory.md)** - Site-wide icon tracking
- **[Icon System Quick Reference](./icon-system-guide.md)** - Dev quick reference
- **[Icon Hover Effects Guide](./icon-hover-effects.md)** - Interaction patterns
- **[Icon Size Troubleshooting](./icon-troubleshooting.md)** - Size issue resolution

**Critical Policy:**

- ✅ **REQUIRED:** Material Icons only in source code (.ts, .tsx, .js, .jsx)
- ✅ **PERMITTED:** Emojis in documentation (.md, .mdx, README)
- ❌ **PROHIBITED:** Emojis in any application source code

**When to Use:**

- Implementing any visual indicators
- Navigation and action icons
- Status and feedback indicators
- Contact and social media icons
- Understanding icon policy compliance

---

## 📐 Layout & Spacing

### Layout Standards & Quick Start

**[layout/](./layout/)** - Page layout documentation

Complete standards for page layout, spacing, containers, and grid systems.

**Documentation Files:**

- **[Page Layout Standards](./layout-guide.md)** - Comprehensive layout guide
- **[Page Layout Quick Start](./layout-quick-start.md)** - Fast implementation reference

**Topics Covered:**

- Container widths and max-widths
- Section padding and spacing
- Grid layouts and breakpoints
- Responsive design patterns
- Content width standards
- Component spacing rules

**Common Patterns:**

```tsx
// Section container
<section className="py-12 lg:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>

// Content width constraint
<div className="max-w-5xl mx-auto">
  {/* Text content */}
</div>

// Grid layout
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Grid items */}
</div>
```

**When to Use:**

- Creating new page layouts
- Implementing consistent spacing
- Building responsive grids
- Structuring content sections

---

## 📱 Mobile & Responsive

### Mobile Optimization & Quick Reference

**Mobile Documentation:**

- **[Mobile Optimization Guide](./mobile-optimization-guide.md)** - Comprehensive mobile guide
- **[Mobile Optimization Guide](./mobile-optimization-guide.md)** - Complete mobile implementation guide
  (includes quick reference cheat sheet)

**Topics Covered:**

- Mobile-first design approach
- Touch target sizing (44x44px minimum)
- Responsive breakpoints
- Mobile navigation patterns
- Performance optimization for mobile
- Testing on mobile devices
- Viewport configuration

**Breakpoint Standards:**

| Breakpoint | Min Width | Tailwind Class | Use Case      |
| ---------- | --------- | -------------- | ------------- |
| xs         | 475px     | `xs:`          | Small phones  |
| sm         | 640px     | `sm:`          | Large phones  |
| md         | 768px     | `md:`          | Tablets       |
| lg         | 1024px    | `lg:`          | Small laptops |
| xl         | 1280px    | `xl:`          | Desktops      |
| 2xl        | 1536px    | `2xl:`         | Large screens |

**When to Use:**

- Implementing responsive designs
- Optimizing for mobile performance
- Creating touch-friendly interfaces
- Testing mobile compatibility

---

## ✍️ Typography

### Typography Examples & Patterns

**[typography-examples-clean.md](./typography-examples-clean.md)** - Typography implementation examples

Comprehensive examples of correct and incorrect typography patterns, migration checklists, and responsive scale implementations.

**Topics Covered:**

- Section header patterns
- Typography scale responsive sizing
- Correct vs incorrect implementations
- Brand integration with typography
- Migration from old patterns
- Accessibility considerations

**Standard Header Pattern:**

```tsx
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    {subtitle}
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
    {mainTitle}
  </span>
</h2>
```

**When to Use:**

- Implementing section headers
- Creating consistent typography
- Migrating old code to new standards
- Understanding typography patterns

---

## 🦶 Footer

### Footer Enhancement Standards

**[footer-enhancements.md](./footer-enhancements.md)** - Footer design and implementation

Standards for footer layout, navigation, contact information, and social media integration.

**Topics Covered:**

- Footer structure and sections
- Navigation link organization
- Contact information display
- Social media icon placement
- Copyright and credentials
- Responsive footer design
- Dark mode footer styling

**When to Use:**

- Implementing footer components
- Updating footer navigation
- Adding footer content
- Maintaining footer consistency

---

## 🎯 What to Use When

### Decision Matrix for Common Tasks

| Task                      | Primary Documentation                                              | Secondary Reference                                                                |
| ------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **Implementing a button** | [Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md)  | [Design System](./design-system.md)                                                |
| **Creating a CTA**        | [Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md)  | [Partnership Type Definitions](../../partnerships/partnership-type-definitions.md) |
| **Adding an icon**        | [Icons Index](./icons-index.md)                                    | [Icon Usage Inventory](./icons/icon-usage-inventory.md)                            |
| **Page layout**           | [Page Layout Standards](./layout-guide.md)                         | [Page Layout Quick Start](./layout-quick-start.md)                                 |
| **Mobile optimization**   | [Mobile Optimization Guide](./mobile-optimization-guide.md)        | Includes quick reference cheat sheet                                               |
| **Typography**            | [Typography Examples](./typography-examples-clean.md)              | [Design System](./design-system.md)                                                |
| **Section header**        | [Design System - Typography](./design-system.md#typography-system) | [Typography Examples](./typography-examples-clean.md)                              |
| **Responsive design**     | [Mobile Optimization Guide](./mobile-optimization-guide.md)        | [Page Layout Standards](./layout-guide.md)                                         |
| **Icon policy check**     | [Icon Policy Complete](./icon-policy.md)                           | [Icons Index](./icons-index.md)                                                    |
| **Footer updates**        | [Footer Enhancements](./footer-enhancements.md)                    | [Design System](./design-system.md)                                                |

---

## 🚀 Quick Start Guides

### For Developers

**Setting Up a New Component:**

1. Review [Design System](./design-system.md) for standards
2. Check [Page Layout Standards](./layout-guide.md) for structure
3. Use [Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md) for interactive elements
4. Reference [Icons Index](./icons-index.md) for visual indicators
5. Test with [Mobile Optimization Guide](./mobile-optimization-guide.md)

**Implementing a New Page:**

1. Start with [Page Layout Quick Start](./layout-quick-start.md)
2. Apply [Typography patterns](./typography-examples-clean.md)
3. Add [Buttons and CTAs](./buttons-ctas-complete-guide.md)
4. Integrate [Icons](./icons-index.md)
5. Verify [Mobile responsiveness](./mobile-optimization-guide.md)

---

### For Designers

**Creating Designs:**

1. Use [Design System](./design-system.md) for color palette and typography
2. Reference [Page Layout Standards](./layout-guide.md) for spacing
3. Follow [Button variants](./buttons-ctas-complete-guide.md) for CTAs
4. Choose icons from [Icon Usage Inventory](./icons/icon-usage-inventory.md)
5. Design for mobile using [Mobile Optimization Guide](./mobile-optimization-guide.md)

**Design Handoff:**

- Annotate with Tailwind class references
- Specify button variants (primary/secondary/outline/neutral)
- List icon names from Material Icons library
- Include responsive breakpoint notes
- Document hover and interaction states

---

## 🎨 Brand Integration

### Connecting Brand to Design System

The design system implements brand standards from multiple sources:

**Brand Standards:**

- [Brand Overview](../../branding/strategy/brand-overview.md) - Core brand identity
- [Color System](../../branding/standards/color-system.md) - Complete color palette
- [Typography](../../branding/standards/typography.md) - Font system
- [Component Standards](../../branding/standards/component-standards.md) - UI component specs

**Implementation Guides:**

- [Consistency Guide](../../development/consistency-guide.md) - Code patterns
- [Development Standards](../../development/development-standards.md) - Coding conventions
- [Partnership Messaging](../../partnerships/messaging/messaging-index.md) - Content guidance

---

## ✅ Quality Checklist

### Before Deploying New Design Components

**Visual Consistency:**

- [ ] Colors match brand palette (Hunter Green, Leather Tan)
- [ ] Typography follows responsive scale
- [ ] Spacing uses standard patterns (py-12 lg:py-16, etc.)
- [ ] Icons are Material Icons (no emojis in source code)
- [ ] Buttons use correct variants

**Responsive Design:**

- [ ] Mobile-first approach implemented
- [ ] Tested on all breakpoints (xs, sm, md, lg, xl, 2xl)
- [ ] Touch targets minimum 44x44px
- [ ] Content readable on small screens
- [ ] Navigation works on mobile

**Accessibility:**

- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] All interactive elements keyboard accessible
- [ ] Icons have text labels or aria-labels
- [ ] Focus indicators visible
- [ ] Semantic HTML used

**Dark Mode:**

- [ ] All colors have dark mode variants
- [ ] Text contrast maintained in dark mode
- [ ] Images/icons visible in dark mode
- [ ] Transitions smooth between modes

**Performance:**

- [ ] No layout shifts during load
- [ ] Icons load efficiently
- [ ] Images optimized
- [ ] Mobile performance acceptable

---

## 🔗 Related Documentation

### Technical Documentation

- [Technical Index](../technical-index.md) - All technical documentation
- [Development Standards](../../development/development-standards.md) - Coding conventions
- [Consistency Guide](../../development/consistency-guide.md) - Implementation patterns
- [Component Standards](../../branding/standards/component-standards.md) - Component design standards

### Branding Documentation

- [Branding Index](../../branding/branding-index.md) - All branding documentation
- [Brand Standards](../../branding/standards/standards-index.md) - Visual standards
- [MH Branding Index](../../branding/branding-index.md) - Modular brand docs

### Partnership Documentation

- [Partnership Messaging](../../partnerships/messaging/messaging-index.md) - Messaging hub
- [Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md) - Partnership CTAs
- [Partnership Messaging Complete Guide](../../partnerships/messaging/partnership-messaging-complete-guide.md) -
  Messaging standards

---

## 🆘 Troubleshooting

### Common Issues

#### Issue: Inconsistent Colors

- **Solution:** Use CSS variables (`var(--brand-primary)`) or Tailwind classes (`text-brand-primary`)
- **Reference:** [Design System - Brand Colors](./design-system.md#brand-identity)

#### Issue: Typography Not Responsive

- **Solution:** Use responsive classes with xs/sm/md/lg/xl prefixes
- **Reference:** [Typography Examples](./typography-examples-clean.md)

#### Issue: Button Not Matching Design

- **Solution:** Check variant prop and review button guide
- **Reference:** [Buttons & CTAs Complete Guide](./buttons-ctas-complete-guide.md)

#### Issue: Icon Not Displaying

- **Solution:** Verify icon name exists in Material Icons library
- **Reference:** [Icons Troubleshooting](./icons-index.md#troubleshooting)

#### Issue: Mobile Layout Broken

- **Solution:** Review mobile-first approach and breakpoints
- **Reference:** [Mobile Optimization Guide](./mobile-optimization-guide.md)

#### Issue: Dark Mode Colors Wrong

- **Solution:** Ensure dark: prefix classes included for all colors
- **Reference:** [Design System - Dark Mode](./design-system.md)

---

## 📊 Design System Statistics

**Current Documentation:**

- **Core Files:** 8 documentation files
- **Button/CTA Docs:** 3 files (1 index + 2 guides)
- **Icon Docs:** 6 files (1 index + 5 guides)
- **Layout Docs:** 2 files
- **Mobile Docs:** 2 files
- **Total Pages:** 20+ comprehensive guides

**Coverage:**

- ✅ Complete button system documentation
- ✅ Complete icon system documentation
- ✅ Layout and spacing standards
- ✅ Typography patterns
- ✅ Mobile optimization guides
- ✅ Accessibility requirements
- ✅ Dark mode implementation

**Compliance:**

- 100% Material Icons policy enforcement
- WCAG AA accessibility standards
- Mobile-first responsive design
- Consistent brand identity

---

## 📝 Version History

- **1.0.0** (Nov 6, 2025): Initial design system index created
  - Established comprehensive navigation structure
  - Integrated all design system documentation
  - Created decision matrix and quick start guides
  - Added quality checklist and troubleshooting

---

## 📞 Support & Questions

For questions about the design system or implementation:

- **Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Phone:** (509) 308-6489
- **Documentation Issues:** Submit to project repository

---

**Questions?** Use the navigation above to find specific documentation or contact the development team.

**Last Updated:** December 14, 2025  
**Maintained by:** MH Construction Documentation Team  
**Status:** ✅ Active - Complete Design System Navigation Hub

## MH Construction Design System

This document defines the design system standards for the MH Construction
website, ensuring consistent branding and user experience across all pages
and components.

## 🎨 Brand Identity

### Brand Colors

- **Primary**: `#386851` (Hunter Green) - `brand-primary`
- **Secondary**: `#BD9264` (Leather Tan) - `brand-secondary`
- **Bronze Variants**: `bronze-600`, `bronze-700`, `bronze-800` - For accents and details

### CSS Variables Usage

````css
/* Use these CSS variables throughout the codebase */
var(--brand-primary)
var(--brand-secondary)
```text

## 📝 Typography System

### Section Header Standard - Military-Construction Pattern

**Status**: ✅ Official Standard (December 2025)

All major sections must use the military-construction header pattern with icon, decorative lines, two-line heading, and colored keyword highlighting.

#### Complete Header Pattern

```tsx
{/* Section Header - Military Construction Standard */}
<div className="mb-16 sm:mb-20 text-center">
  {/* Icon with decorative lines */}
  <div className="flex items-center justify-center mb-8 gap-4">
    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
      <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
        <MaterialIcon icon="shield" size="2xl" className="text-white drop-shadow-lg" />
      </div>
    </div>
    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
  </div>

  {/* Two-line gradient heading */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
      {subtitle}
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      {mainTitle}
    </span>
  </h2>

  {/* Description with colored keyword highlighting */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    {description with} <span className="font-bold text-brand-primary dark:text-brand-primary-light">colored keyword</span> emphasis
  </p>
</div>
```

#### Header Typography Specs

**Subtitle (Context Line):**
- Size: `text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl`
- Weight: `font-semibold`
- Color: `text-gray-700 dark:text-gray-200`
- Spacing: `mb-3 sm:mb-4`

**Main Title (Impact Line):**
- Size: `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl`
- Weight: `font-black`
- Gradient: `from-brand-primary via-brand-secondary to-brand-primary`
- Padding: `py-2 pb-3` (prevents descender clipping)
- Line Height: `leading-normal` (prevents text cutoff)

**Description:**
- Size: `text-base sm:text-lg md:text-xl lg:text-2xl`
- Weight: `font-light`
- Color: `text-gray-700 dark:text-gray-300`
- Max Width: `max-w-5xl`

#### Section Description Text with Colored Keywords

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
  Base text with{" "}
  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
    primary emphasis
  </span>
  {" "}and{" "}
  <span className="font-bold text-gray-900 dark:text-white">
    strong emphasis
  </span>
  .
</p>
```text

#### Section Description Text

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
  {description with branded emphasis spans}
</p>
```text

#### Typography Scale

| Element | Classes | Usage |
|---------|---------|-------|
| **Main Title** | `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl` | Primary section headers |
| **Subtitle** | `text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl` | Section subtitles |
| **Body Large** | `text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl` | Section descriptions |
| **Card Title** | `text-xl xs:text-2xl sm:text-3xl md:text-4xl` | Component titles |
| **Card Subtitle** | `text-lg xs:text-xl sm:text-2xl md:text-3xl` | Component subtitles |
| **Body Text** | `text-base xs:text-lg sm:text-xl md:text-xl` | Standard body content |

### Typography Rules

1. **Consistency**: All sections must follow the established header pattern
2. **Responsive**: Use responsive text sizing with mobile-first approach
3. **Contrast**: Maintain proper contrast ratios for accessibility
4. **Gradient Text**: Use brand gradient for emphasis on main titles
5. **Tracking**: Use `tracking-tighter` for headers, `tracking-wide` for body text
6. **Leading**: Use `leading-tight` for headers, `leading-relaxed` for body text

### Emphasis Patterns

#### Branded Emphasis Spans

```tsx
{/* Medium emphasis */}
<span className="font-medium text-gray-800 dark:text-gray-200">
  {emphasizedText}
</span>

{/* Strong brand emphasis */}
<span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
  {brandedText}
</span>
```text

## 🎯 Component Standards

### Spacing & Layout

- **Section Padding**: `py-12 lg:py-16`
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Content Width**: `max-w-5xl` for text content
- **Grid Gaps**: `gap-6 lg:gap-8` for component grids

### Interactive Elements

#### Buttons

Follow the established button component with proper variants:

- `variant="primary"` - Brand primary background
- `variant="secondary"` - Brand secondary background
- `variant="outline"` - Transparent with brand border

#### Cards

- Use `rounded-3xl` for consistent corner radius
- Include hover states with `hover:shadow-2xl`
- Implement proper animation transitions

## � Mobile Optimization Standards

### Responsive Breakpoint System

MH Construction uses a mobile-first approach with standardized breakpoints:

| Breakpoint | Min Width | Max Width | Usage |
|------------|-----------|-----------|-------|
| **xs** | 475px | - | Large phones |
| **mobile-sm** | - | 374px | Very small phones |
| **mobile** | - | 639px | All mobile devices |
| **sm** | 640px | - | Small tablets+ |
| **md** | 768px | - | Tablets+ |
| **lg** | 1024px | - | Laptops+ |
| **xl** | 1280px | - | Desktops+ |
| **2xl** | 1536px | - | Large screens+ |

### Mobile Typography Standards

#### Responsive Font Scaling

All text must follow this progressive scaling pattern:

```tsx
// Main Section Headers
className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl"

// Section Subtitles
className="text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl"

// Large Body Text
className="text-lg xs:text-lg md:text-xl lg:text-2xl"

// Card Titles
className="text-lg xs:text-xl sm:text-xl md:text-2xl"

// Standard Body Text
className="text-sm xs:text-sm sm:text-base md:text-base"

// Small Text
className="text-xs xs:text-xs sm:text-sm"
```text

#### Typography Rules for Mobile

1. **Minimum Sizes**: Never go below `text-xs` (12px) for readability
2. **Progressive Scaling**: Use `xs:` breakpoint for 475px+ devices
3. **Line Height**: Use `leading-tight` for headers, `leading-relaxed` for body
4. **Text Overflow**: Use `break-all` for email addresses, `break-words` for long text

### Touch Optimization Standards

#### Touch Target Requirements

- **Minimum Size**: 44px × 44px for all interactive elements
- **Recommended Size**: 48px × 48px for primary actions
- **Spacing**: Minimum 8px between touch targets

```tsx
// Button Touch Targets
className="p-2.5 xs:p-3 sm:p-3 min-h-[44px] min-w-[44px] touch-manipulation"

// Link Touch Targets
className="px-3 xs:px-4 py-2.5 xs:py-3 touch-manipulation"

// Icon Button Touch Targets
className="p-2 xs:p-2.5 sm:p-3 touch-manipulation"
```text

#### Touch Manipulation Class

All interactive elements must include `touch-manipulation` for better responsiveness:

```tsx
className="transition-all duration-300 hover:scale-105 touch-manipulation"
```text

### Mobile Layout Standards

#### Responsive Spacing

```tsx
// Section Padding
className="pt-6 xs:pt-8 sm:pt-10 pb-4 xs:pb-5 sm:pb-6"

// Container Padding
className="px-3 xs:px-4 sm:px-6 lg:px-8"

// Element Spacing
className="space-y-2 xs:space-y-3 sm:space-y-4"

// Grid Gaps
className="gap-2 xs:gap-3 sm:gap-4 lg:gap-6"
```text

#### Grid Responsive Patterns

```tsx
// Navigation Grids
className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-3"

// Card Grids
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6"

// Footer Columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6"
```text

### Component Mobile Standards

#### Header/Navigation

```tsx
// Header Height Scaling
className="h-16 xs:h-18 sm:h-20 md:h-24"

// Logo Responsive Sizing
className="h-[48px] xs:h-[56px] sm:h-[70px] md:h-[88px] w-auto"

// Menu Button
className="p-2 xs:p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 touch-manipulation"
```text

#### Cards & Content

```tsx
// Card Padding
className="p-4 xs:p-5 sm:p-6"

// Card Border Radius
className="rounded-lg xs:rounded-xl sm:rounded-xl"

// Image Responsive
className="w-full h-auto rounded-lg xs:rounded-xl"
```text

#### Forms & Inputs

```tsx
// Input Fields
className="px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base rounded-lg touch-manipulation"

// Buttons
className="px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 text-sm xs:text-base touch-manipulation"
```text

### Mobile Performance Standards

#### CSS Classes for Mobile Performance

```css
/* Add to globals.css */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.gpu-acceleration {
  transform: translateZ(0);
  will-change: transform;
  backfaceVisibility: hidden;
}

.scroll-smooth {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
```text

#### Image Optimization

- Use `next/image` with responsive sizing
- Implement `priority` for above-fold images
- Use `loading="lazy"` for below-fold images
- Define explicit `width` and `height` attributes

```tsx
<Image
  src="/images/example.jpg"
  alt="Description"
  width={400}
  height={300}
  className="w-full h-auto rounded-lg xs:rounded-xl"
  priority={isAboveFold}
  loading={isAboveFold ? "eager" : "lazy"}
/>
```text

### Mobile Testing Requirements

#### Device Testing Matrix

| Device Category | Screen Sizes | Testing Requirements |
|----------------|--------------|---------------------|
| **Small Phones** | 320px - 374px | Touch targets, text readability |
| **Large Phones** | 375px - 474px | Layout optimization, navigation |
| **Small Tablets** | 475px - 639px | Content flow, touch optimization |
| **Tablets** | 640px - 1023px | Grid layouts, spacing |

#### Quality Checklist for Mobile

- [ ] All text is readable at minimum sizes (12px+)
- [ ] Touch targets meet 44px minimum requirement
- [ ] Content flows properly without horizontal scroll
- [ ] Images scale responsively without distortion
- [ ] Forms are usable with touch keyboards
- [ ] Navigation is accessible on small screens
- [ ] Loading states work on slow connections
- [ ] Animations perform smoothly on mobile devices

## �🔍 Implementation Guidelines

### 1. Section Structure Template

```tsx
<section className="relative bg-{background} py-6 xs:py-8 sm:py-10 lg:py-16 touch-manipulation">
  <div className="relative mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
    <FadeInWhenVisible className="mb-6 xs:mb-8 sm:mb-10 lg:mb-12 text-center">
      {/* Standard Header Pattern - Mobile Optimized */}
      <h2 className="mb-4 xs:mb-5 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
        <span className="block mb-2 xs:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
          {subtitle}
        </span>
        <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
          {mainTitle}
        </span>
      </h2>

      {/* Standard Description Pattern - Mobile Optimized */}
      <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
        {description}
      </p>
    </FadeInWhenVisible>

    {/* Section Content */}
  </div>
</section>
```text

### 2. Quality Checklist

When implementing new sections or components:

- [ ] Typography follows the established responsive scale
- [ ] Headers use the two-line pattern with gradient
- [ ] Text content uses proper mobile-first responsive sizing
- [ ] Emphasis spans follow brand patterns
- [ ] Spacing matches mobile-responsive section standards
- [ ] Touch targets meet 44px minimum requirement
- [ ] `touch-manipulation` class is applied to interactive elements
- [ ] Content flows properly on 320px+ screens
- [ ] Dark mode styles are included
- [ ] Accessibility attributes are present
- [ ] Images use responsive sizing with proper aspect ratios

## 📚 Related Documentation

- [Mobile Optimization Guide](./mobile-optimization-guide.md) - Comprehensive mobile standards
- [Mobile Optimization Guide](./mobile-optimization-guide.md) - Complete guide with quick reference cheat sheet
- [Typography Examples](./typography-examples-clean.md)
- [Component Library](../../components/ui/mh-ui-guide.md)
- [Consistency Guide](../../development/consistency-guide.md) - Complete implementation standards
- [Brand Guidelines](../../branding/branding-index.md) - Modular brand docs
- [Branding Documentation](../../branding/branding-index.md) - Modular brand docs

## 🔄 Updates & Maintenance

This design system should be updated when:

- New typography patterns are established
- Brand colors or fonts change
- Component standards evolve
- Accessibility requirements update

**Last Updated: December 14, 2025
**Version**: 1.0.0
````
