# Buttons & CTAs Documentation Hub

**Category:** UI Components - Buttons and Call-to-Actions
**Last Updated:** November 6, 2025
**Status:** ✅ Active - Consolidated Documentation Structure

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../../MasterIndex.md) - Central hub for all documentation
- [🛠️ Technical Index](../../technical/technical-index.md) - Technical documentation hub
- [🎨 Design System](../design-system.md) - Complete design system
- [🎨 Branding Standards](../../branding/standards/standards-index.md) - Brand visual standards

---

## 📋 Overview

Complete documentation for MH Construction's button system and call-to-action (CTA) components. This hub provides
unified access to button implementations, CTA strategies, and partnership-specific messaging patterns.

**What's Here:**

- Button system specifications and implementation
- CTA standards and best practices
- Partnership messaging for CTAs
- Navigation and link validation rules

---

## 📚 Documentation Structure

### 🔘 Button System

**[buttons-complete-guide.md](./buttons-complete-guide.md)** - Comprehensive button documentation

Complete guide covering button variants, sizing, states, accessibility, and implementation examples. Consolidates
all button-related specifications into one authoritative resource.

**Topics Covered:**

- Button variants (primary, secondary, outline, neutral)
- Sizing and spacing standards
- Icon integration patterns
- Hover and focus states
- Accessibility requirements
- Implementation examples for all use cases

**Quick Reference:**

- Primary buttons: Hunter Green (#386851) - Main CTAs and actions
- Secondary buttons: Leather Tan (#BD9264) - Complementary actions
- Outline buttons: Transparent with border - Subtle actions
- Neutral buttons: Theme-aware grays - System actions

---

### 📢 CTA (Call-to-Action) System

**[ctas-complete-guide.md](./ctas-complete-guide.md)** - Comprehensive CTA documentation

Complete guide covering CTA best practices, link validation, navigation rules, and implementation patterns.
Consolidates all CTA-related technical specifications.

**Topics Covered:**

- CTA best practices and patterns
- Link validation and testing
- Navigation rules and routing
- Button vs link usage guidelines
- Conversion optimization techniques
- Implementation examples

**Quick Reference:**

- Use buttons for actions (submit, toggle, trigger)
- Use links for navigation (pages, sections, external sites)
- Always validate CTA links before deployment
- Follow partnership messaging standards

---

### 💬 Partnership Messaging for CTAs

**[../../partnerships/messaging/cta-button-guide.md](../../partnerships/messaging/cta-button-guide.md)** -
Messaging perspective

Partnership-specific CTA messaging and language standards. Covers how to phrase CTAs for different audiences
(clients vs vendors) and contexts (AI estimator vs consultation).

**Topics Covered:**

- Client-focused CTA language
- Vendor-focused CTA language
- AI Estimator vs Consultation distinctions
- Partnership-centered phrasing
- Service-specific CTA patterns

**Related:** [Partnership Messaging Guide](../../partnerships/messaging/partnership-messaging-guide.md)

---

### 📐 Brand Standards

**[../../branding/standards/cta-standardization-plan.md](../../branding/standards/cta-standardization-plan.md)** -
Brand standards

Brand-level CTA standardization requirements and visual standards. Defines CTA design patterns that align with
MH Construction brand identity.

**Topics Covered:**

- CTA visual standards
- Brand color usage in CTAs
- Typography for CTAs
- Spacing and layout standards
- Brand compliance requirements

**Related:** [Component Standards](../../branding/standards/component-standards.md)

---

## 🎯 Quick Start Guide

### For Developers

**Implementing a Button:**

1. Review [buttons-complete-guide.md](./buttons-complete-guide.md) for button variants
2. Choose appropriate variant (primary/secondary/outline/neutral)
3. Check [Consistency Guide](../../development/consistency-guide.md) for code patterns
4. Verify accessibility requirements
5. Test across themes (light/dark mode)

**Implementing a CTA:**

1. Review [ctas-complete-guide.md](./ctas-complete-guide.md) for CTA patterns
2. Check [Partnership Messaging](../../partnerships/messaging/cta-button-guide.md) for proper language
3. Validate links and navigation behavior
4. Ensure brand compliance per [CTA Standards](../../branding/standards/cta-standardization-plan.md)
5. Test conversion tracking (if applicable)

### For Designers

**Designing Buttons:**

1. Start with [Brand Standards](../../branding/standards/cta-standardization-plan.md)
2. Use approved color palette (Hunter Green, Leather Tan)
3. Follow spacing and sizing guidelines in [buttons-complete-guide.md](./buttons-complete-guide.md)
4. Ensure WCAG AA accessibility compliance
5. Test in light and dark modes

### For Content Writers

**Writing CTA Copy:**

1. Read [Partnership Messaging Guide](../../partnerships/messaging/cta-button-guide.md)
2. Use partnership-centered language ("Start Partnership" not "Get Quote")
3. Distinguish between client and vendor audiences
4. Follow AI Estimator vs Consultation distinctions
5. Keep CTA text concise and action-oriented

---

## 🔄 Common Use Cases

### Primary Actions

```tsx
// Main conversion CTAs
<Button variant="primary" size="lg">
  <MaterialIcon icon="event" className="mr-2" />
  Schedule Free Consultation
</Button>
```

**When to Use:** Main conversion points, primary user actions, key partnerships CTAs

**Documentation:** [buttons-complete-guide.md](./buttons-complete-guide.md) - Primary Buttons section

---

### Secondary Actions

```tsx
// Supporting actions
<Button variant="secondary" size="lg">
  <MaterialIcon icon="smart_toy" className="mr-2" />
  Try AI Estimator
</Button>
```

**When to Use:** Alternative pathways, complementary options, secondary conversion paths

**Documentation:** [buttons-complete-guide.md](./buttons-complete-guide.md) - Secondary Buttons section

---

### Navigation Links

```tsx
// Internal navigation
<Link href="/services">
  <MaterialIcon icon="arrow_forward" className="ml-2" />
  Learn More About Services
</Link>
```

**When to Use:** Page navigation, section links, content exploration

**Documentation:** [ctas-complete-guide.md](./ctas-complete-guide.md) - Navigation Rules section

---

## 📊 Button vs CTA Decision Matrix

| Scenario          | Use                          | Documentation                                            |
| ----------------- | ---------------------------- | -------------------------------------------------------- |
| Submit form       | Button (`variant="primary"`) | [buttons-complete-guide.md](./buttons-complete-guide.md) |
| Navigate to page  | Link component               | [ctas-complete-guide.md](./ctas-complete-guide.md)       |
| Open modal        | Button (`variant="outline"`) | [buttons-complete-guide.md](./buttons-complete-guide.md) |
| External link     | Link with icon               | [ctas-complete-guide.md](./ctas-complete-guide.md)       |
| Toggle setting    | Button (`variant="neutral"`) | [buttons-complete-guide.md](./buttons-complete-guide.md) |
| Scroll to section | Link with smooth scroll      | [ctas-complete-guide.md](./ctas-complete-guide.md)       |

---

## 🎨 Color & Accessibility

### Button Colors

- **Hunter Green (#386851)**: Primary buttons - main actions
- **Leather Tan (#BD9264)**: Secondary buttons - alternative actions
- **Transparent + Border**: Outline buttons - subtle actions
- **Theme-aware Gray**: Neutral buttons - system actions

### Accessibility Requirements

- ✅ Minimum 4.5:1 contrast ratio (WCAG AA)
- ✅ Visible focus indicators
- ✅ Keyboard navigation support
- ✅ Screen reader friendly labels
- ✅ Touch target minimum 44x44px

**Full Guidelines:** [buttons-complete-guide.md](./buttons-complete-guide.md) - Accessibility section

---

## 🔗 Related Documentation

### Design System

- [Design System](../design-system.md) - Complete design system overview
- [Component Standards](../../branding/standards/component-standards.md) - UI component specifications
- [Mobile Optimization](../mobile-optimization-guide.md) - Mobile button patterns

### Development

- [Consistency Guide](../../development/consistency-guide.md) - Implementation standards
- [Development Standards](../../development/development-standards.md) - Coding conventions
- [Component Standards](../../branding/standards/component-standards.md) - Component design standards

### Branding

- [Brand Standards](../../branding/standards/standards-index.md) - Visual standards hub
- [Color System](../../branding/standards/color-system.md) - Brand colors
- [Typography](../../branding/standards/typography.md) - Font system

### Partnership

- [Partnership Messaging](../../partnerships/messaging/messaging-index.md) - Messaging hub
- [CTA Button Guide](../../partnerships/messaging/cta-button-guide.md) - Partnership CTAs
- [Partnership Guide](../../partnerships/messaging/partnership-messaging-guide.md) - Complete messaging

---

## 🆘 Troubleshooting

### Button Not Showing Correct Colors

1. Check variant prop is correct (`primary`, `secondary`, `outline`, `neutral`)
2. Verify Tailwind classes are not being overridden
3. Test in both light and dark modes
4. Check [buttons-complete-guide.md](./buttons-complete-guide.md) for correct implementation

### CTA Link Not Working

1. Verify link path is correct (use absolute paths for external, relative for internal)
2. Check [ctas-complete-guide.md](./ctas-complete-guide.md) navigation rules
3. Test link validation
4. Verify Next.js Link component usage

### Accessibility Issues

1. Run accessibility audit (Lighthouse, axe DevTools)
2. Check contrast ratios meet WCAG AA minimum
3. Test keyboard navigation
4. Verify screen reader labels
5. See [buttons-complete-guide.md](./buttons-complete-guide.md) accessibility section

---

## 📝 Version History

- **1.0.0** (Nov 6, 2025): Initial consolidated documentation hub created
  - Combined button and CTA documentation
  - Established clear navigation structure
  - Integrated messaging and brand standards

---

**Questions?** Refer to specific guides above or contact the development team

**Last Updated:** November 6, 2025
**Maintained by:** MH Construction Documentation Team
