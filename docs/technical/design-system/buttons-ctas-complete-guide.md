# Buttons & CTAs - Complete Implementation Guide

**Category:** UI Components - Buttons & Call-to-Actions  
**Last Updated:** November 20, 2025  
**Status:** ✅ Active - Four-Value Foundation Aligned  
**Version:** 3.0.0 (Trust-Centered Messaging)

**⚠️ CONSOLIDATED DOCUMENT:** This guide consolidates and supersedes:

- `buttons-guide.md` (technical implementation)
- `ctas-guide.md` (CTA patterns & standards)
- `cta-standardization-plan.md` (branding standards)
- `cta-button-guide.md` (messaging & service distinctions)

---

## 📋 Table of Contents

1. [Quick Reference](#quick-reference)
2. [Button Variants](#button-variants)
3. [Service Type CTAs](#service-type-ctas)
4. [Partnership Type CTAs](#partnership-type-ctas)
5. [Implementation Standards](#implementation-standards)
6. [Messaging Guidelines](#messaging-guidelines)
7. [Accessibility & Compliance](#accessibility--compliance)
8. [Examples & Patterns](#examples--patterns)
9. [Validation & Testing](#validation--testing)

---

## 🎯 Quick Reference

### Button Variant Matrix

| Variant       | Color                  | Use Case                         | Icon Examples                 | Text Examples                 |
| ------------- | ---------------------- | -------------------------------- | ----------------------------- | ----------------------------- |
| **Primary**   | Hunter Green (#386851) | Main CTAs, IRL consultations     | `event`, `handshake`          | "Schedule Free Consultation"  |
| **Secondary** | Leather Tan (#BD9264)  | AI Estimator, supporting actions | `smart_toy`, `calculate`      | "Get Instant AI Estimate"     |
| **Outline**   | Transparent border     | Subtle actions, navigation       | `arrow_forward`, `visibility` | "Learn More", "View Our Work" |
| **Neutral**   | Theme-aware            | System actions, UI controls      | `close`, `arrow_back`         | "Back", "Cancel"              |

### Service Type Distinctions

| Service Type            | Icon                     | Color        | Button Variant | Example Text                 |
| ----------------------- | ------------------------ | ------------ | -------------- | ---------------------------- |
| **Automated Estimator** | `smart_toy`, `calculate` | Leather Tan  | `secondary`    | "Get Instant AI Estimate"    |
| **IRL Consultation**    | `event`, `handshake`     | Hunter Green | `primary`      | "Schedule Free Consultation" |
| **Client Partnership**  | `handshake`              | Hunter Green | `primary`      | "Begin Our Partnership"      |
| **Trade Partnership**   | `construction`           | Leather Tan  | `secondary`    | "Apply as Vendor"            |

---

## 🔘 Button Variants

### 1. Primary Buttons (Hunter Green)

**Purpose:** Main conversion CTAs, primary user actions, in-person consultations

**Colors:** Hunter Green (#386851), white text on hover

**Technical Implementation:**

```tsx
<Button variant="primary" size="lg" className="group/btn">
  <MaterialIcon
    icon="event"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Schedule Free Consultation
</Button>
```

**When to Use:**

- Schedule/booking actions
- Client contact forms
- Primary conversion goals
- In-person consultation requests
- Partnership initiation

**Approved Text Patterns:**

- "Begin Your Project"
- "Schedule Consultation"
- "Book Site Visit"
- "Start Your Partnership"
- "Discuss Your Vision"
- "Build With Us"
- "Contact Client Services"
- "Experience Our Values"

---

### 2. Secondary Buttons (Leather Tan)

**Purpose:** Automated tools, supporting actions, complementary options

**Colors:** Leather Tan (#BD9264), white text on hover

**Technical Implementation:**

```tsx
<Button variant="secondary" size="lg" className="group/btn">
  <MaterialIcon
    icon="smart_toy"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Get Instant AI Estimate
</Button>
```

**When to Use:**

- Automated Estimator/Calculator
- Secondary information requests
- Portfolio viewing
- Resource downloads
- Trade partner applications

**Approved Text Patterns:**

- "Budget Planning Tool"
- "Get Project Estimate"
- "Try Planning Tool"
- "Trust In Action" (for portfolio/testimonials)
- "Our Values-Driven Services"
- "Our Foundation" (for about/values)
- "Apply as Vendor"
- "Download Resources"

---

### 3. Outline Buttons (Transparent)

**Purpose:** Subtle actions, secondary navigation, less emphasis

**Colors:** Transparent with border, theme-aware

**Technical Implementation:**

```tsx
<Button variant="outline" size="md" className="group/btn">
  <MaterialIcon
    icon="arrow_forward"
    size="md"
    className="ml-2 group-hover/btn:translate-x-1 transition-transform"
  />
  Learn More
</Button>
```

**When to Use:**

- Secondary navigation
- "Learn More" links
- Supporting actions
- Less critical CTAs

**Approved Text Patterns:**

- "Learn More"
- "View Details"
- "Explore Options"
- "See More Projects"

---

### 4. Neutral Buttons (Theme-Aware)

**Purpose:** System actions, UI controls, cancel actions

**Colors:** Neutral gray, theme-aware

**Technical Implementation:**

```tsx
<Button variant="neutral" size="md">
  <MaterialIcon icon="close" size="sm" className="mr-2" />
  Cancel
</Button>
```

**When to Use:**

- Cancel/close actions
- Back navigation
- Form resets
- System controls

---

## 🎯 Service Type CTAs

### 🤖 Automated Estimator CTAs

**Service:** Automated self-service cost estimation  
**Icon:** `smart_toy` or `calculate`  
**Color:** Leather Tan (#BD9264)  
**Variant:** `secondary`  
**Style:** Modern, digital, instant-action focused

**Implementation:**

```tsx
<Link href="/estimator">
  <Button variant="secondary" size="lg" className="group/btn min-h-[48px]">
    <MaterialIcon
      icon="smart_toy"
      size="lg"
      className="mr-2 sm:mr-3 group-hover/btn:scale-110 transition-transform"
    />
    <span className="font-medium text-sm sm:text-base">
      Get Instant AI Estimate
    </span>
  </Button>
</Link>
```

**Approved Button Text:**

- "Get Instant AI Estimate" (primary)
- "Try Automated Estimator"
- "Start AI Estimate"
- "Calculate Project Cost"
- "Get Preliminary Pricing"
- "Use Smart Estimator"

**Messaging Guidelines:**

- Emphasize speed & convenience ("instant", "in minutes")
- Highlight 24/7 availability
- Note it's preliminary/optional
- Always offer human consultation alternative

**Example Context:**

```tsx
<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
  Get a preliminary estimate in under 5 minutes using our AI-powered tool.
  Available 24/7, no appointment needed.
</p>
<Button variant="secondary">Get Instant AI Estimate</Button>
<p className="text-xs text-gray-500 mt-2">
  Prefer human expertise? <Link href="/booking">Schedule a consultation</Link>
</p>
```

---

### 🤝 In-Person Consultation CTAs

**Service:** In-person professional sales consultation  
**Icon:** `event` or `handshake`  
**Color:** Hunter Green (#386851)  
**Variant:** `primary`  
**Style:** Personal, professional, relationship-focused

**Implementation:**

```tsx
<Link href="/booking">
  <Button variant="primary" size="lg" className="group/btn min-h-[48px]">
    <MaterialIcon
      icon="event"
      size="lg"
      className="mr-2 sm:mr-3 group-hover/btn:scale-110 transition-transform"
    />
    <span className="font-medium text-sm sm:text-base">
      Schedule Free Consultation
    </span>
  </Button>
</Link>
```

**Approved Button Text:**

- "Schedule Free Consultation" (primary)
- "Book Site Visit"
- "Request Project Review"
- "Meet with Expert"
- "Discuss Your Vision"
- "Begin Our Partnership"

**Messaging Guidelines:**

- Emphasize personal attention & expertise
- Highlight "free" when applicable
- Note face-to-face value proposition
- Stress collaborative approach

**Example Context:**

```tsx
<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
  Work directly with our expert team. We'll visit your site, discuss your
  vision, and provide transparent open-book pricing.
</p>
<Button variant="primary">Schedule Free Consultation</Button>
<p className="text-xs text-gray-500 mt-2">
  Response within 24 hours. Licensed WA, OR, ID.
</p>
```

---

## 🤝 Partnership Type CTAs

### Client Partnership CTAs

**Audience:** Homeowners, businesses hiring MH for projects  
**Icon:** `handshake`  
**Color:** Hunter Green (#386851)  
**Variant:** `primary`  
**Routes:** `/services`, `/booking`, `/contact`

**Implementation:**

```tsx
<Button variant="primary" size="lg" className="group/btn">
  <MaterialIcon
    icon="handshake"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Begin Our Partnership
</Button>
```

**Approved Button Text:**

- "Begin Our Partnership"
- "Start Your Project"
- "Partner With Us"
- "Let's Build Together"

**Messaging Focus:**

- Collaborative relationship
- Long-term trust
- "Client Partner" terminology (not "customer")
- Partnership-first philosophy

---

### Trade Partnership CTAs

**Audience:** Subcontractors, suppliers, vendors  
**Icon:** `construction`  
**Color:** Leather Tan (#BD9264)  
**Variant:** `secondary`  
**Routes:** `/trade-partners`, `/vendor-application`

**Implementation:**

```tsx
<Button variant="secondary" size="lg" className="group/btn">
  <MaterialIcon
    icon="construction"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Apply as Approved Vendor
</Button>
```

**Approved Button Text:**

- "Apply as Approved Vendor"
- "Join Trade Network"
- "Become Trade Partner"
- "Download Vendor Package"
- "Submit Vendor Application"

**Messaging Focus:**

- Professional business relationship
- Mutual benefit & growth
- "Trade Partner" or "Vendor" terminology
- Quality standards & approval process

---

## 📐 Implementation Standards

### Critical Requirements ✅

**All buttons MUST include:**

1. **Button Component:** Import from `@/components/ui`

```tsx
import { Button } from "@/components/ui/button";
```

1. **Proper Variant:** `primary`, `secondary`, `outline`, or `neutral`

```tsx
<Button variant="primary">...</Button>
```

1. **MaterialIcon Integration:** Use `icon=` prop with proper size

```tsx
<MaterialIcon icon="event" size="lg" />
```

1. **Hover Animation:** Icon scale on hover

```tsx
className = "group-hover/btn:scale-110 transition-transform";
```

1. **Responsive Text:** Scale across breakpoints

```tsx
className = "text-sm sm:text-base";
```

1. **Accessibility Height:** Minimum 48px touch target

```tsx
className = "min-h-[48px]";
```

1. **Semantic HTML:** Wrap in `<Link>` for navigation

```tsx
<Link href="/booking">
  <Button>...</Button>
</Link>
```

---

### Icon Sizing Standards

| Button Size     | Icon Size | Icon Class  | Spacing        |
| --------------- | --------- | ----------- | -------------- |
| `lg` (CTAs)     | `lg`      | `size="lg"` | `mr-2 sm:mr-3` |
| `md` (Standard) | `md`      | `size="md"` | `mr-2`         |
| `sm` (Compact)  | `sm`      | `size="sm"` | `mr-1.5`       |

---

### Responsive Typography

```tsx
// Large CTAs (hero sections, primary conversions)
className = "text-sm sm:text-base md:text-lg";

// Standard CTAs (section buttons)
className = "text-sm sm:text-base";

// Compact CTAs (cards, inline)
className = "text-xs sm:text-sm";
```

---

### Color Specifications

**Primary (Hunter Green):**

```css
/* Tailwind classes */
bg-brand-primary hover:bg-brand-primary/90 text-white

/* CSS variables */
background: var(--brand-primary);  /* #386851 */
color: white;
```

**Secondary (Leather Tan):**

```css
/* Tailwind classes */
bg-brand-secondary hover:bg-brand-secondary/90 text-white

/* CSS variables */
background: var(--brand-secondary);  /* #BD9264 */
color: white;
```

---

## 💬 Messaging Guidelines

### Standardized CTA Text Library

#### ✅ APPROVED: Consultations & Meetings

- "Schedule Free Consultation" (primary, most common)
- "Book Site Visit"
- "Request Project Review"
- "Meet with Expert"
- "Discuss Your Vision"

#### ✅ APPROVED: AI/Automated Tools

- "Get Instant AI Estimate" (primary for estimator)
- "Try Automated Estimator"
- "Calculate Project Cost"
- "Start AI Estimate"

#### ✅ APPROVED: Portfolio & Projects

- "View Our Work" (primary, standardized)
- "See Project Gallery"
- "Browse Portfolio"

#### ✅ APPROVED: Partnerships

- "Begin Our Partnership" (client, primary)
- "Apply as Approved Vendor" (trade, primary)
- "Join Trade Network"

#### ✅ APPROVED: Information

- "Explore Our Solutions"
- "Learn More"
- "View Details"

#### ❌ NON-COMPLIANT: Avoid These

- "Contact Us" (too generic, use specific action)
- "Click Here" (not descriptive)
- "Submit" (not action-oriented)
- "View Portfolio" (use "View Our Work")
- "Get In Touch" (use specific action)

---

### Messaging Principles

1. **Action-Oriented:** Start with strong verbs
   - ✅ "Schedule", "Book", "Begin", "Request"
   - ❌ "Click", "Submit", "Send"

2. **Benefit-Clear:** Communicate value
   - ✅ "Free Consultation"
   - ❌ "Consultation"

3. **Context-Specific:** Match service type
   - AI Tools: "Instant", "Automated", "Calculate"
   - Human Services: "Schedule", "Meet", "Discuss"

4. **Partnership Language:** Emphasize collaboration
   - ✅ "Begin Our Partnership"
   - ❌ "Hire Us"

5. **Concise:** 2-4 words typically
   - ✅ "Schedule Free Consultation" (3 words)
   - ❌ "Click Here to Schedule a Free Consultation with Our Team" (too long)

---

## ♿ Accessibility & Compliance

### WCAG AA Requirements

**Color Contrast:**

- ✅ Hunter Green on white: 4.75:1 (AA compliant)
- ✅ Leather Tan on white: 3.65:1 (AA large text)
- ✅ All button text uses sufficient contrast

**Touch Targets:**

- ✅ Minimum 48px height (`min-h-[48px]`)
- ✅ Adequate spacing between buttons (16px minimum)
- ✅ Responsive sizing maintains targets on mobile

**Focus States:**

- ✅ Visible focus rings on all buttons
- ✅ Keyboard navigation supported
- ✅ Focus order follows visual layout

---

### ARIA Labels & Screen Readers

**Basic Implementation:**

```tsx
<Button
  variant="primary"
  aria-label="Schedule a free consultation with our team"
>
  <MaterialIcon icon="event" size="lg" aria-hidden="true" />
  Schedule Free Consultation
</Button>
```

**Icon-Only Buttons:**

```tsx
<Button variant="outline" size="md" aria-label="Close dialog">
  <MaterialIcon icon="close" size="sm" />
</Button>
```

**Loading States:**

```tsx
<Button
  variant="primary"
  disabled={isLoading}
  aria-busy={isLoading}
  aria-label={isLoading ? "Submitting form..." : "Submit form"}
>
  {isLoading ? "Submitting..." : "Submit"}
</Button>
```

---

### Keyboard Navigation

**Required Keyboard Support:**

- `Tab` - Focus next button
- `Shift + Tab` - Focus previous button
- `Enter` or `Space` - Activate button
- `Esc` - Close modal/dialog (if applicable)

**Implementation:**

```tsx
<Button
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleAction();
    }
  }}
>
  Button Text
</Button>
```

---

## 💡 Examples & Patterns

### Complete CTA Section Pattern

```tsx
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Choose the path that works best for you
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Primary CTA - Human Consultation */}
          <Link href="/booking">
            <Button
              variant="primary"
              size="lg"
              className="group/btn min-h-[48px]"
            >
              <MaterialIcon
                icon="event"
                size="lg"
                className="mr-2 sm:mr-3 group-hover/btn:scale-110 transition-transform"
              />
              <span className="font-medium text-sm sm:text-base">
                Schedule Free Consultation
              </span>
            </Button>
          </Link>

          {/* Secondary CTA - AI Estimator */}
          <Link href="/estimator">
            <Button
              variant="secondary"
              size="lg"
              className="group/btn min-h-[48px]"
            >
              <MaterialIcon
                icon="smart_toy"
                size="lg"
                className="mr-2 sm:mr-3 group-hover/btn:scale-110 transition-transform"
              />
              <span className="font-medium text-sm sm:text-base">
                Get Instant AI Estimate
              </span>
            </Button>
          </Link>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Both paths lead to the same expert team and quality results
        </p>
      </div>
    </section>
  );
}
```

---

### Next Steps Section Pattern (3 Options)

```tsx
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";
import Link from "next/link";

export function NextStepsSection() {
  const options = [
    {
      icon: "event",
      title: "Schedule Consultation",
      description: "Meet with our expert team for personalized guidance",
      href: "/booking",
      variant: "primary" as const,
      buttonText: "Book Free Consultation",
    },
    {
      icon: "smart_toy",
      title: "Try AI Estimator",
      description: "Get instant preliminary pricing in under 5 minutes",
      href: "/estimator",
      variant: "secondary" as const,
      buttonText: "Get Instant Estimate",
    },
    {
      icon: "phone",
      title: "Call Directly",
      description: "Speak with our team now",
      href: "tel:+15099432427",
      variant: "outline" as const,
      buttonText: "Call (509) 943-2427",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Next Step
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option) => (
            <div
              key={option.href}
              className="flex flex-col items-center text-center p-6 border rounded-lg"
            >
              <MaterialIcon
                icon={option.icon}
                size="2xl"
                className="text-brand-primary mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                {option.description}
              </p>
              <Link href={option.href} className="w-full">
                <Button
                  variant={option.variant}
                  size="lg"
                  className="w-full group/btn"
                >
                  <MaterialIcon
                    icon={option.icon}
                    size="md"
                    className="mr-2 group-hover/btn:scale-110 transition-transform"
                  />
                  {option.buttonText}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Mobile-Optimized CTA Pattern

```tsx
export function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t p-4 md:hidden z-50">
      <div className="flex gap-2">
        <Link href="/booking" className="flex-1">
          <Button variant="primary" size="lg" className="w-full">
            <MaterialIcon icon="event" size="md" className="mr-1.5" />
            <span className="text-xs sm:text-sm">Book Now</span>
          </Button>
        </Link>
        <Link href="tel:+15099432427">
          <Button variant="outline" size="lg" className="aspect-square">
            <MaterialIcon icon="phone" size="md" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
```

---

## ✅ Validation & Testing

### Pre-Launch Checklist

**Visual Inspection:**

- [ ] All buttons use correct variant (primary/secondary/outline)
- [ ] Icons are properly sized and positioned
- [ ] Hover animations work smoothly
- [ ] Text is readable on all backgrounds
- [ ] Mobile sizing is appropriate
- [ ] Spacing is consistent

**Technical Validation:**

- [ ] Buttons import from `@/components/ui/button`
- [ ] MaterialIcon imported and configured correctly
- [ ] `Link` wraps navigational buttons
- [ ] `min-h-[48px]` applied to all CTAs
- [ ] Proper `variant` specified
- [ ] Group hover classes present

**Accessibility Testing:**

- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Focus states are visible
- [ ] ARIA labels present where needed
- [ ] Screen reader announces correctly
- [ ] Color contrast meets WCAG AA
- [ ] Touch targets ≥48px

**Content Review:**

- [ ] CTA text matches approved patterns
- [ ] Service type distinctions clear (AI vs IRL)
- [ ] Partnership type appropriate (Client vs Trade)
- [ ] Action verbs are strong and clear
- [ ] No generic text ("Click Here", "Submit")

---

### Common Mistakes & Fixes

#### ❌ Mistake #1: Generic CTA Text

```tsx
// WRONG
<Button variant="primary">Contact Us</Button>

// RIGHT
<Button variant="primary">Schedule Free Consultation</Button>
```

#### ❌ Mistake #2: Missing Icon Animation

```tsx
// WRONG
<MaterialIcon icon="event" size="lg" className="mr-2" />

// RIGHT
<MaterialIcon
  icon="event"
  size="lg"
  className="mr-2 group-hover/btn:scale-110 transition-transform"
/>
```

#### ❌ Mistake #3: Wrong Variant for Service Type

```tsx
// WRONG - AI Estimator with primary (should be secondary)
<Button variant="primary">Get AI Estimate</Button>

// RIGHT
<Button variant="secondary">Get AI Estimate</Button>
```

#### ❌ Mistake #4: Missing Link Wrapper

```tsx
// WRONG - Button without Link
<Button variant="primary" onClick={() => router.push('/booking')}>
  Schedule Consultation
</Button>

// RIGHT - Wrapped in Link
<Link href="/booking">
  <Button variant="primary">Schedule Consultation</Button>
</Link>
```

---

## 📚 Related Documentation

### Essential References

- **[Button System Hub](./buttons-ctas-index.md)** - Navigation hub for all button/CTA docs
- **[Section Enhancement Patterns](../../branding/implementation/section-enhancement-patterns.md)** - Technical patterns
- **[Partnership Type Definitions](../../partnerships/partnership-type-definitions.md)** - Client vs Trade
- **[Messaging Guidelines](../../branding/strategy/messaging.md)** - Voice & tone
- **[Color System](../../branding/standards/color-system.md)** - Brand colors

### Design System

- **[Design System Index](./design-system-index.md)** - Complete design system
- **[Icon System](./icons-index.md)** - Material Icon standards
- **[Typography](../../branding/standards/typography.md)** - Text styling

### Development

- **[Consistency Guide](../../development/consistency-guide.md)** - Implementation standards
- **[Development Standards](../../development/development-standards.md)** - Coding conventions
- **[Master Index](../../master-index.md)** - Central documentation hub

---

## 🎯 Summary & Key Takeaways

### Remember These Core Principles

1. **Service Type Matters**
   - AI/Automated = Secondary (Leather Tan)
   - Human/IRL = Primary (Hunter Green)

2. **Partnership Type Matters**
   - Client Projects = Primary with `handshake`
   - Trade Partners = Secondary with `construction`

3. **Be Specific**
   - ✅ "Schedule Free Consultation"
   - ❌ "Contact Us"

4. **Always Accessible**
   - 48px minimum height
   - Keyboard navigation
   - Proper ARIA labels

5. **Consistent Implementation**
   - Use Button component
   - Include MaterialIcon
   - Add hover animations
   - Wrap in Link for navigation

---

**Document Maintained By:** MH Construction Development Team  
**Last Major Update:** November 17, 2025 (Consolidation)  
**Next Review Date:** December 17, 2025  
**Version:** 2.0.0 (Consolidated from 4 source files)

---

**Questions or Issues?**

- [Button System Hub](./buttons-ctas-index.md) - Navigation and quick links
- [Master Index](../../master-index.md) - Central documentation hub
- [Consistency Guide](../../development/consistency-guide.md) - General implementation standards
