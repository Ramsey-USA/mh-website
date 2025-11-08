# Slogan Implementation Guide

**Last Updated:** November 8, 2025 | **Version:** 1.0.0 | **Status:** Official Development Standard

---

## 🧭 Quick Navigation

- [📚 Slogan Assignment Guide](../../branding/strategy/slogan-rotation-guide.md)
- [🗂️ Development Reference Index](./reference-index.md)
- [🏠 Master Documentation Index](../../MasterIndex.md)

---

## 🎯 Purpose

This guide provides developers with complete instructions for implementing MH Construction's
dedicated slogan system across the website.

**Key Principles:**

- **Dedicated Assignments:** Each page has specific slogans that remain consistent
- **Tier 1 Flexibility:** Foundation slogans (Tier 1) CAN be reused across multiple pages
- **Tier 2-5 Dedication:** Specialized slogans are page-specific and unique
- **Type Safety:** Full TypeScript support for slogan data and components
- **Brand Consistency:** Pre-configured styling matches brand guidelines

---

## 📦 Implementation Files

### Core Files Created

1. **`/src/lib/data/slogans.ts`** - Complete slogan library with 17 slogans
   - Slogan definitions with tier classifications
   - Page-to-slogan mappings
   - Helper functions for slogan retrieval
   - TypeScript interfaces for type safety

2. **`/src/components/ui/Slogan.tsx`** - Reusable slogan components
   - `<Slogan>` - Base slogan component
   - `<SloganDisplay>` - Preset display configurations
   - `<HeroWithSlogan>` - Complete hero sections
   - `<SloganWithIcon>` - Slogans with Material Icons

---

## 🚀 Quick Start

### Basic Usage

```tsx
import { Slogan } from "@/components/ui/Slogan";

// Display hero slogan for homepage
export default function HomePage() {
  return (
    <section>
      <h1>Welcome to MH Construction</h1>
      <Slogan page="homepage" context="hero" variant="hero-subtitle" />
    </section>
  );
}
```

### With Preset Displays

```tsx
import { SloganDisplay } from "@/components/ui/Slogan";

export default function AboutPage() {
  return (
    <div>
      <SloganDisplay page="about" context="hero" location="page-hero" />
      {/* Content */}
    </div>
  );
}
```

### Complete Hero Section

```tsx
import { HeroWithSlogan } from "@/components/ui/Slogan";
import { Button } from "@/components/ui/Button";

export default function ServicesPage() {
  return (
    <HeroWithSlogan
      page="services"
      heading="Our Services"
      heroContext="hero"
      taglineContext="tagline"
      cta={<Button href="/booking">Schedule Consultation</Button>}
      backgroundImage="/images/services-hero.jpg"
    />
  );
}
```

---

## 📖 Component API Reference

### `<Slogan>` Component

Base component for displaying slogans.

#### Props

| Prop            | Type                   | Required | Default     | Description                                                  |
| --------------- | ---------------------- | -------- | ----------- | ------------------------------------------------------------ |
| `page`          | `string`               | ✅ Yes   | -           | Page identifier (e.g., 'homepage', 'about')                  |
| `context`       | `string`               | No       | `'hero'`    | Context within page ('hero', 'tagline', 'cta', section name) |
| `variant`       | `SloganVariant`        | No       | `'tagline'` | Display variant                                              |
| `customText`    | `string`               | No       | -           | Override with custom slogan (use sparingly)                  |
| `className`     | `string`               | No       | `''`        | Additional CSS classes                                       |
| `showTierBadge` | `boolean`              | No       | `false`     | Show tier badge (dev mode only)                              |
| `as`            | `'h1'｜'h2'｜'p'｜etc` | No       | `'p'`       | HTML element to render                                       |

#### Variants

| Variant           | Usage                  | Styling                                |
| ----------------- | ---------------------- | -------------------------------------- |
| `'hero'`          | Large hero text        | 4xl-6xl, bold, hunter green            |
| `'hero-subtitle'` | Hero subtitle          | 2xl-4xl, semibold, leather tan         |
| `'tagline'`       | Tagline under heading  | lg-xl, medium, italic, hunter green/80 |
| `'section'`       | Section heading accent | xl-2xl, semibold, left border          |
| `'footer'`        | Footer signature       | sm-base, medium, white/80, italic      |
| `'inline'`        | Inline within content  | base, medium, hunter green, italic     |

#### Examples

```tsx
// Hero slogan
<Slogan page="homepage" context="hero" variant="hero" as="h1" />

// Section-specific slogan
<Slogan page="team" context="expertise" variant="section" as="h3" />

// Footer signature
<Slogan page="homepage" context="tagline" variant="footer" />

// Custom slogan (rare cases only)
<Slogan
  page="special-event"
  customText="Building Together for 25 Years"
  variant="hero-subtitle"
/>

// With tier badge (development)
<Slogan
  page="services"
  context="hero"
  variant="tagline"
  showTierBadge={true}
/>
```

---

### `<SloganDisplay>` Component

Pre-configured slogan displays for common page locations.

#### Props

| Prop       | Type     | Required | Default  | Description             |
| ---------- | -------- | -------- | -------- | ----------------------- |
| `page`     | `string` | ✅ Yes   | -        | Page identifier         |
| `context`  | `string` | No       | `'hero'` | Context within page     |
| `location` | Preset   | ✅ Yes   | -        | Display location preset |

#### Locations

| Location             | Variant         | Element | Usage              |
| -------------------- | --------------- | ------- | ------------------ |
| `'page-hero'`        | `hero`          | `<h1>`  | Main page hero     |
| `'page-subtitle'`    | `hero-subtitle` | `<p>`   | Below hero heading |
| `'section-header'`   | `section`       | `<h2>`  | Section headers    |
| `'footer-signature'` | `footer`        | `<p>`   | Footer signature   |

#### Examples

```tsx
// Page hero
<SloganDisplay
  page="homepage"
  context="hero"
  location="page-hero"
/>

// Page subtitle
<SloganDisplay
  page="about"
  context="tagline"
  location="page-subtitle"
/>

// Section header
<SloganDisplay
  page="services"
  context="quality"
  location="section-header"
/>
```

---

### `<HeroWithSlogan>` Component

Complete hero section with integrated slogan support.

#### Props

| Prop              | Type        | Required | Default     | Description            |
| ----------------- | ----------- | -------- | ----------- | ---------------------- |
| `page`            | `string`    | ✅ Yes   | -           | Page identifier        |
| `heading`         | `string`    | ✅ Yes   | -           | Main hero heading      |
| `heroContext`     | `string`    | No       | `'hero'`    | Hero slogan context    |
| `taglineContext`  | `string`    | No       | `'tagline'` | Tagline slogan context |
| `cta`             | `ReactNode` | No       | -           | Optional CTA button    |
| `backgroundImage` | `string`    | No       | -           | Background image URL   |
| `className`       | `string`    | No       | `''`        | Additional CSS classes |

#### Examples

```tsx
// Basic hero
<HeroWithSlogan
  page="homepage"
  heading="Welcome to MH Construction"
/>

// With CTA
<HeroWithSlogan
  page="services"
  heading="Our Services"
  cta={<Button href="/booking">Get Started</Button>}
/>

// With background
<HeroWithSlogan
  page="projects"
  heading="Our Work"
  backgroundImage="/images/projects-hero.jpg"
/>

// Full configuration
<HeroWithSlogan
  page="about"
  heading="About MH Construction"
  heroContext="hero"
  taglineContext="tagline"
  cta={<Button>Learn More</Button>}
  backgroundImage="/images/about-bg.jpg"
  className="min-h-[80vh]"
/>
```

---

### `<SloganWithIcon>` Component

Slogan with Material Icon decoration.

#### Props

All `<Slogan>` props plus:

| Prop           | Type              | Required | Default  | Description        |
| -------------- | ----------------- | -------- | -------- | ------------------ |
| `icon`         | `string`          | No       | -        | Material Icon name |
| `iconPosition` | `'left'｜'right'` | No       | `'left'` | Icon position      |

#### Examples

```tsx
// With construction icon (trade partners)
<SloganWithIcon
  page="trade-partners"
  context="hero"
  variant="section"
  icon="construction"
  iconPosition="left"
/>

// With handshake icon (client partnerships)
<SloganWithIcon
  page="booking"
  context="relationship"
  variant="tagline"
  icon="handshake"
  iconPosition="left"
/>
```

---

## 🎨 Page-Specific Implementation

### Homepage (`page="homepage"`)

```tsx
import { Slogan, HeroWithSlogan } from "@/components/ui/Slogan";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroWithSlogan
        page="homepage"
        heading="Welcome to MH Construction"
        heroContext="hero" // "THE ROI IS THE RELATIONSHIP"
        taglineContext="tagline" // "Building for the Owner, NOT the Dollar"
        cta={<Button href="/booking">Schedule Consultation</Button>}
        backgroundImage="/images/homepage-hero.jpg"
      />

      {/* CTA Section */}
      <section>
        <Slogan
          page="homepage"
          context="cta" // "Let's Build More than Just Structures"
          variant="hero-subtitle"
          className="text-center"
        />
      </section>
    </>
  );
}
```

**Assigned Slogans:**

- Hero: "THE ROI IS THE RELATIONSHIP" _(Tier 1 - Reusable)_
- Tagline: "Building for the Owner, NOT the Dollar" _(Tier 1 - Reusable)_
- CTA: "Let's Build More than Just Structures" _(Tier 1 - Reusable)_

---

### About Page (`page="about"`)

```tsx
import { Slogan, SloganDisplay } from "@/components/ui/Slogan";

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <SloganDisplay
        page="about"
        context="hero" // "Where Precision Meets Partnership"
        location="page-hero"
      />

      {/* History Section */}
      <section>
        <Slogan
          page="about"
          context="history" // "Trust Built, Project by Project"
          variant="section"
          as="h2"
        />
      </section>

      {/* Positioning Section */}
      <section>
        <Slogan
          page="about"
          context="positioning" // "Big Enough to Scale, Small Enough to Stay Personal"
          variant="tagline"
        />
      </section>
    </>
  );
}
```

**Assigned Slogans:**

- Hero: "Where Precision Meets Partnership" _(Tier 2 - Dedicated)_
- History: "Trust Built, Project by Project" _(Tier 2 - Dedicated)_
- Positioning: "Big Enough to Scale, Small Enough to Stay Personal" _(Tier 4 - Dedicated)_

---

### Services Page (`page="services"`)

```tsx
import { Slogan, HeroWithSlogan } from "@/components/ui/Slogan";

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <HeroWithSlogan
        page="services"
        heading="Our Services"
        heroContext="hero" // "Your Vision, Our Precision"
      />

      {/* Quality Section */}
      <section>
        <Slogan
          page="services"
          context="quality" // "Excellence in Every Detail"
          variant="section"
          as="h2"
        />
      </section>

      {/* Process Section */}
      <section>
        <Slogan
          page="services"
          context="process" // "Building Trust Through Transparency"
          variant="section"
          as="h2"
        />
      </section>
    </>
  );
}
```

**Assigned Slogans:**

- Hero: "Your Vision, Our Precision" _(Tier 2 - Dedicated)_
- Quality: "Excellence in Every Detail" _(Tier 2 - Dedicated)_
- Process: "Building Trust Through Transparency" _(Tier 3 - Dedicated)_

---

### Team Page (`page="team"`)

```tsx
import { Slogan } from "@/components/ui/Slogan";

export default function TeamPage() {
  return (
    <>
      {/* Hero */}
      <Slogan
        page="team"
        context="hero" // "THE ROI IS THE RELATIONSHIP"
        variant="hero"
        as="h1"
      />

      {/* Expertise Section */}
      <section>
        <Slogan
          page="team"
          context="expertise" // "150+ Years of Combined Excellence"
          variant="section"
          as="h2"
        />
      </section>

      {/* Culture Section */}
      <section>
        <Slogan
          page="team"
          context="culture" // "Veteran Values, Community-Focused Results"
          variant="tagline"
        />
      </section>
    </>
  );
}
```

**Assigned Slogans:**

- Hero: "THE ROI IS THE RELATIONSHIP" _(Tier 1 - Reusable)_
- Expertise: "150+ Years of Combined Excellence" _(Tier 4 - Dedicated)_
- Culture: "Veteran Values, Community-Focused Results" _(Tier 2 - Dedicated)_

---

### Trade Partners Page (`page="trade-partners"`)

```tsx
import { SloganWithIcon, Slogan } from "@/components/ui/Slogan";

export default function TradePartnersPage() {
  return (
    <>
      {/* Hero with icon */}
      <SloganWithIcon
        page="trade-partners"
        context="hero" // "Building Professional Partnerships"
        variant="hero"
        icon="construction"
        as="h1"
      />

      {/* Relationship emphasis */}
      <Slogan
        page="trade-partners"
        context="tagline" // "THE ROI IS THE RELATIONSHIP"
        variant="hero-subtitle"
      />

      {/* Network Section */}
      <section>
        <Slogan
          page="trade-partners"
          context="network" // "Pacific Northwest Roots, Regional Reach"
          variant="section"
          as="h2"
        />
      </section>
    </>
  );
}
```

**Assigned Slogans:**

- Hero: "Building Professional Partnerships" _(Tier 5 - Dedicated)_
- Tagline: "THE ROI IS THE RELATIONSHIP" _(Tier 1 - Reusable)_
- Network: "Pacific Northwest Roots, Regional Reach" _(Tier 4 - Dedicated)_

---

## 🧪 Testing Guidelines

### Component Testing

```tsx
import { render, screen } from "@testing-library/react";
import { Slogan } from "@/components/ui/Slogan";

describe("Slogan Component", () => {
  it("renders homepage hero slogan", () => {
    render(<Slogan page="homepage" context="hero" />);
    expect(screen.getByText("THE ROI IS THE RELATIONSHIP")).toBeInTheDocument();
  });

  it("renders correct variant classes", () => {
    const { container } = render(
      <Slogan page="services" context="hero" variant="hero" />,
    );
    expect(container.firstChild).toHaveClass(
      "text-4xl",
      "font-bold",
      "text-hunter-green",
    );
  });

  it("handles missing slogan gracefully", () => {
    const { container } = render(<Slogan page="nonexistent" context="hero" />);
    expect(container.firstChild).toBeNull();
  });

  it("allows custom slogan text", () => {
    render(
      <Slogan page="custom" customText="Custom Slogan" variant="tagline" />,
    );
    expect(screen.getByText("Custom Slogan")).toBeInTheDocument();
  });
});
```

### Visual Regression Testing

```tsx
// Test slogan variants render correctly
const sloganVariants = [
  "hero",
  "hero-subtitle",
  "tagline",
  "section",
  "footer",
  "inline",
];

sloganVariants.forEach((variant) => {
  it(`renders ${variant} variant correctly`, () => {
    const { container } = render(
      <Slogan
        page="homepage"
        context="hero"
        variant={variant as SloganVariant}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
```

### Accessibility Testing

```tsx
it("uses semantic HTML elements", () => {
  render(<Slogan page="homepage" context="hero" as="h1" />);
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});

it("provides proper text contrast", () => {
  const { container } = render(
    <Slogan page="homepage" context="hero" variant="hero" />,
  );
  // Test that hunter green (#386851) on white background meets WCAG AA
});
```

---

## ✅ Validation Checklist

### Before Deployment

- [ ] All page assignments implemented from `/docs/branding/strategy/slogan-rotation-guide.md`
- [ ] Slogan components render correctly on all pages
- [ ] Typography and spacing match brand guidelines
- [ ] Colors match hunter green (#386851) and leather tan (#BD9264)
- [ ] Tier 1 slogans reused appropriately across pages
- [ ] Tier 2-5 slogans unique to their assigned pages
- [ ] No "rotation" logic present (dedicated assignments only)
- [ ] Component tests passing
- [ ] Accessibility requirements met (WCAG AA)
- [ ] Responsive design tested on mobile, tablet, desktop
- [ ] Footer signatures implemented correctly
- [ ] Email signature templates use correct slogans
- [ ] Print material slogans match assignments
- [ ] Social media schedule uses consistent weekly themes

### Code Review

- [ ] TypeScript types used correctly
- [ ] No hardcoded slogan text (use slogan data)
- [ ] Component props documented
- [ ] Examples provided in documentation
- [ ] Error handling for missing slogans
- [ ] Development warnings implemented
- [ ] No console errors in production build

---

## 🔍 Common Patterns

### Footer Implementation

```tsx
import { Slogan } from "@/components/ui/Slogan";

export function Footer() {
  return (
    <footer className="bg-hunter-green py-12 text-white">
      <div className="container mx-auto px-4">
        {/* Footer content */}

        {/* Footer signature */}
        <Slogan
          page="homepage"
          context="tagline"
          variant="footer"
          className="mt-8 border-t border-white/20 pt-4"
        />
      </div>
    </footer>
  );
}
```

### Section Headers

```tsx
import { Slogan } from "@/components/ui/Slogan";

export function QualitySection() {
  return (
    <section className="py-16">
      <Slogan
        page="services"
        context="quality"
        variant="section"
        as="h2"
        className="mb-8"
      />

      {/* Section content */}
    </section>
  );
}
```

### CTA Sections

```tsx
import { Slogan } from "@/components/ui/Slogan";
import { Button } from "@/components/ui/Button";

export function CTASection() {
  return (
    <section className="bg-leather-tan/10 py-16 text-center">
      <Slogan
        page="contact"
        context="hero"
        variant="hero-subtitle"
        className="mb-6"
      />

      <Slogan page="contact" context="cta" variant="tagline" className="mb-8" />

      <Button variant="primary" size="large">
        Get Started
      </Button>
    </section>
  );
}
```

---

## 🐛 Troubleshooting

### Slogan Not Displaying

**Problem:** Component renders but no slogan appears

**Solution:**

1. Check console for warnings in development mode
2. Verify page identifier matches `PAGE_SLOGANS` keys in `/src/lib/data/slogans.ts`
3. Confirm context exists for that page
4. Check that slogan text is not empty string

```tsx
// Debug mode
<Slogan
  page="your-page"
  context="hero"
  showTierBadge={true} // Shows tier in development
/>
```

### Wrong Slogan Showing

**Problem:** Different slogan than expected displays

**Solution:**

1. Review `PAGE_SLOGANS` mapping in `/src/lib/data/slogans.ts`
2. Verify context prop matches section key
3. Check for custom text override

### Styling Issues

**Problem:** Slogan styling doesn't match brand

**Solution:**

1. Verify Tailwind config includes hunter green and leather tan colors
2. Check variant prop is correct for usage
3. Review className overrides not conflicting with variant styles
4. Ensure font-display is configured in Tailwind

### TypeScript Errors

**Problem:** Type errors with slogan props

**Solution:**

1. Import types from `@/components/ui/Slogan`
2. Use `SloganVariant` type for variant prop
3. Check page and context are strings
4. Verify `as` prop uses valid HTML elements

---

## 📚 Additional Resources

- [Complete Slogan Guide](../../branding/strategy/slogan-rotation-guide.md) - Full brand strategy
- [Partnership Distinctions](../../partnerships/partnership-type-definitions.md) - Client vs Trade
- [Brand Colors](../../branding/standards/color-palette.md) - Hunter green & leather tan
- [Typography](../../branding/standards/typography.md) - Font specifications
- [Component Library](../component-library.md) - Other UI components

---

## 🚀 Next Steps

1. Implement slogans on all pages per assignment guide
2. Test components across all breakpoints
3. Validate accessibility requirements
4. Update email templates with correct signatures
5. Create print material templates with assigned slogans
6. Set up social media posting schedule
7. Train team on slogan usage guidelines

---

**Questions?** Contact the marketing team or refer to the [Slogan Assignment Guide](../../branding/strategy/slogan-rotation-guide.md).

---

**Last Updated:** November 8, 2025 | **Version:** 1.0.0  
**Maintained by:** MH Construction Development & Marketing Teams  
**Status:** ✅ Active - Ready for Implementation

---

**Signature:** "THE ROI IS THE RELATIONSHIP" - Building for the Owner, NOT the Dollar
