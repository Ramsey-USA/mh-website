# Template Components

**Purpose:** Reusable page section templates that enforce MH standards  
**Location:** `/src/components/templates/`  
**Version:** 2.0.0  
**Updated:** December 28, 2025

---

## Overview

Template components eliminate repetitive code by providing pre-built,
standard-compliant section structures that developers can customize with content
while maintaining visual consistency.

**Non-coder friendly explanation:** These are pre-made building blocks for pages.
Instead of manually coding the same fancy background and header pattern 26 times,
developers import one component and just fill in the content.

---

## BrandedContentSection Component

### Purpose

**Non-coder explanation:** "This is the fancy section with the gold/green
gradient title and the subtle background patterns (diagonal stripes + color
blobs)"

**Technical features:**

- DiagonalStripePattern background (#386851 at 45deg)
- Large brand color blobs (w-96 h-96 with blur-3xl)
- Two-line gradient header with Material icon
- Responsive padding and spacing
- Dark mode support
- Automatic fade-in animation

**Code reduction:** 82% less code (68 lines → 12 lines per section)

### Basic Usage

```tsx
import { BrandedContentSection } from "@/components/templates";

<BrandedContentSection
  id="our-values"
  header={{
    icon: "shield",
    iconVariant: "primary",
    subtitle: "Built on Trust",
    title: "Our Core Values",
    description: "The principles that guide everything we do.",
  }}
>
  {/* Your custom content here */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {/* Cards, text, whatever you need */}
  </div>
</BrandedContentSection>;
```

### Props

| Prop                 | Type                | Required | Default   | Description                  |
| -------------------- | ------------------- | -------- | --------- | ---------------------------- |
| `id`                 | `string`            | ✅ Yes   | -         | Unique ID for anchor links   |
| `header`             | `object`            | No       | -         | Section header configuration |
| `children`           | `ReactNode`         | ✅ Yes   | -         | Section content              |
| `variant`            | `"white" \| "gray"` | No       | `"white"` | Background color variant     |
| `animated`           | `boolean`           | No       | `true`    | Wrap in FadeInWhenVisible    |
| `className`          | `string`            | No       | `""`      | Additional section classes   |
| `containerClassName` | `string`            | No       | `""`      | Additional container classes |

### Header Object

| Property      | Type                                   | Required | Default     | Description              |
| ------------- | -------------------------------------- | -------- | ----------- | ------------------------ |
| `icon`        | `string`                               | ✅ Yes   | -           | Material icon name       |
| `iconVariant` | `"primary" \| "secondary" \| "bronze"` | No       | `"primary"` | Icon color theme         |
| `subtitle`    | `string`                               | ✅ Yes   | -           | First line (solid color) |
| `title`       | `string`                               | ✅ Yes   | -           | Second line (gradient)   |
| `description` | `string`                               | No       | -           | Paragraph below title    |

### Examples

#### Minimal Section (No Header)

```tsx
<BrandedContentSection id="content">
  <div className="prose dark:prose-invert max-w-none">
    <p>Your content here</p>
  </div>
</BrandedContentSection>
```

#### Full Featured Section

```tsx
<BrandedContentSection
  id="our-services"
  variant="gray"
  animated={true}
  header={{
    icon: "engineering",
    iconVariant: "primary",
    subtitle: "What We Offer",
    title: "Construction Services",
    description:
      "Comprehensive solutions for commercial and public sector projects.",
  }}
  containerClassName="space-y-12"
>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
    {services.map((service) => (
      <ServiceCard key={service.id} {...service} />
    ))}
  </div>
</BrandedContentSection>
```

#### Multiple Sections with Different Variants

```tsx
<>
  {/* White background section */}
  <BrandedContentSection
    id="about"
    variant="white"
    header={{
      icon: "groups",
      iconVariant: "primary",
      subtitle: "Who We Are",
      title: "About Our Team",
    }}
  >
    {/* Content */}
  </BrandedContentSection>

  {/* Gray background section */}
  <BrandedContentSection
    id="values"
    variant="gray"
    header={{
      icon: "shield",
      iconVariant: "bronze",
      subtitle: "What Drives Us",
      title: "Our Core Values",
    }}
  >
    {/* Content */}
  </BrandedContentSection>
</>
```

---

## Benefits

### Code Reduction

**Before (68 lines per section):**

```tsx
<section
  id="values"
  className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
>
  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(...)`,
      }}
    ></div>
  </div>
  <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10..."></div>
  <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10..."></div>

  <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <FadeInWhenVisible>
      <div className="mb-16 sm:mb-20 text-center">
        {/* 40+ lines of header code */}
      </div>
      {/* Your content */}
    </FadeInWhenVisible>
  </div>
</section>
```

**After (12 lines):**

```tsx
<BrandedContentSection
  id="values"
  header={{
    icon: "shield",
    subtitle: "Built on Trust",
    title: "Our Core Values",
  }}
>
  {/* Your content */}
</BrandedContentSection>
```

**Reduction:** 82% less code

### Consistency Guarantee

- ✅ DiagonalStripePattern automatically included
- ✅ Brand blobs positioned correctly
- ✅ Padding uses standard responsive scale
- ✅ Header follows two-line gradient pattern
- ✅ overflow-visible included on gradient text
- ✅ Dark mode variants applied correctly
- ✅ Icon variants properly styled

### Maintenance Benefits

- Update once, apply everywhere
- No risk of forgetting required elements
- Enforces standards automatically
- Reduces code review burden

---

## When to Use

### ✅ Use BrandedContentSection When

- Building a new page section
- Section needs standard MH background (stripes + blobs)
- Section has a header following the two-line gradient pattern
- Want to ensure consistency automatically
- Reduce boilerplate code

### ❌ Don't Use BrandedContentSection When

- Building hero sections (use HeroSection pattern)
- Section needs highly custom layout
- Using specialized components (Timeline, ProcessTimeline)
- Section is the NextStepsSection or other shared component

---

## Migration Guide

### Converting Existing Sections

**Step 1:** Identify section boundaries

```tsx
// Find sections like this
<section id="values" className="relative bg-white...">
  {/* 68 lines of boilerplate */}
  <div>{/* Your actual content */}</div>
</section>
```

**Step 2:** Extract header info

```tsx
// Extract these values:
- id: "values"
- icon: "shield"
- subtitle: "Built on Trust"
- title: "Our Core Values"
- description: "The principles..."
```

**Step 3:** Replace with BrandedContentSection

```tsx
<BrandedContentSection
  id="values"
  header={{
    icon: "shield",
    subtitle: "Built on Trust",
    title: "Our Core Values",
    description: "The principles...",
  }}
>
  {/* Move your actual content here */}
</BrandedContentSection>
```

### Bulk Migration Pattern

Search for this regex in your codebase:

```regex
<section\s+id="([^"]+)"\s+className="relative\s+bg-white
```

Replace each match with BrandedContentSection template.

---

## Future Enhancements

Potential additions to template library:

1. **StandardHeroSection** - Hero pattern template
2. **StandardCardGrid** - Pre-configured card grid layout
3. **StandardTwoColumn** - Text + image two-column layout
4. **StandardTestimonials** - Testimonial section template

---

## Related Documentation

- [Component Cheatsheet](../../../docs/development/quick-reference/component-cheatsheet.md) - Quick reference
- [Page Template Guide](../../../docs/development/standards/page-template-guide.md) - New page boilerplate
- [Unified Component Standards](../../../docs/branding/standards/unified-component-standards.md) - Complete standard

---

## Examples in Codebase

**Current Usage:** None yet (newly created)

**Recommended for migration:**

- About page sections
- Services page sections
- Team page sections
- Any page with multiple standard sections

---

**Created:** December 28, 2025  
**Maintained by:** MH Construction Development Team  
**Questions?** See examples above or ask the team
