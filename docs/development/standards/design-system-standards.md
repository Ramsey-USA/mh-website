# Design System Standards

## Visual Consistency Guidelines

Last Updated: July 7, 2026

### Overview

This document outlines the design system standards for maintaining visual consistency across the MH Construction website. All components MUST use centralized design tokens to ensure brand cohesion and maintainability.

## Current Status

- The website design system is currently on the centralized token baseline for corner radii, hover motion, and transition timing.
- The latest brand and design validation on the active branch is green, with the primary website surfaces aligned to the approved MH visual language.
- Continue using the canonical token sources in `/apps/website/src/lib/styles/design-tokens.ts` when updating route-level or shared UI components.

---

## Corner Radius Standards

All border radius values are centralized in `/apps/website/src/lib/styles/design-tokens.ts`.

### Standard Values

| Token                  | Tailwind Class | Use Case                               | Example Components                                |
| ---------------------- | -------------- | -------------------------------------- | ------------------------------------------------- |
| `cornerRadius.card`    | `rounded-3xl`  | Main content cards, section containers | ServicesShowcase, CoreValuesSection, CompanyStats |
| `cornerRadius.icon`    | `rounded-2xl`  | Icons, feature boxes, sub-sections     | Service icons, value badges                       |
| `cornerRadius.element` | `rounded-xl`   | Buttons, smaller elements, badges      | CTA buttons, info badges                          |
| `cornerRadius.small`   | `rounded-lg`   | Input fields, small containers         | Form inputs, small chips                          |
| `cornerRadius.full`    | `rounded-full` | Avatars, circular icon buttons         | Close buttons, avatar images                      |

### Usage

```tsx
import { cornerRadius } from "@/lib/styles/design-tokens";

// Main card
<div className={`bg-white ${cornerRadius.card} shadow-lg`}>

// Icon container
<div className={`p-4 ${cornerRadius.icon} bg-brand-primary`}>

// Button
<button className={`px-6 py-3 ${cornerRadius.element}`}>
```

### ⛔ Never Do This

```tsx
// ❌ WRONG - Hard-coded rounded values
<div className="rounded-3xl bg-white">
<button className="rounded-xl px-6 py-3">

// ✅ CORRECT - Use design tokens
<div className={`${cornerRadius.card} bg-white`}>
<button className={`${cornerRadius.element} px-6 py-3`}>
```

---

## Hover Motion Standards

All hover effects are centralized to ensure consistent interaction patterns.

### Standard Effects

| Token                          | Effect                     | Duration | Use Case                           |
| ------------------------------ | -------------------------- | -------- | ---------------------------------- |
| `hoverMotion.iconPlayful`      | scale(1.1) + rotate(12deg) | 300ms    | Interactive icons with personality |
| `hoverMotion.iconSubtle`       | scale(1.1)                 | 300ms    | Professional icon interactions     |
| `hoverMotion.cardLift`         | scale(1.02)                | 300ms    | Main content card hover            |
| `hoverMotion.cardScale`        | scale(1.05)                | 300ms    | Moderate card emphasis             |
| `hoverMotion.button`           | scale(1.05)                | 300ms    | Button interactions                |
| `hoverMotion.imageZoom`        | scale(1.05)                | 500ms    | Image zoom on hover                |
| `hoverMotion.translateUp`      | translateY(-4px)           | 300ms    | Subtle lift effect                 |
| `hoverMotion.translateUpLarge` | translateY(-8px)           | 300ms    | Pronounced lift effect             |

### Usage

```tsx
import { hoverMotion } from "@/lib/styles/design-tokens";

// Icon with playful interaction
<MaterialIcon className={hoverMotion.iconPlayful} />

// Card with lift effect
<div className={`bg-white ${hoverMotion.cardLift}`}>

// Image with zoom
<Image className={hoverMotion.imageZoom} />
```

### ⛔ Never Do This

```tsx
// ❌ WRONG - Inline hover effects
<div className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">

// ✅ CORRECT - Use design tokens
<div className={hoverMotion.iconPlayful}>
```

---

## Transition Duration Standards

Standardized timing for all animations.

| Token                       | Value | Use Case                             |
| --------------------------- | ----- | ------------------------------------ |
| `transitionDuration.fast`   | 200ms | Quick feedback (button states)       |
| `transitionDuration.normal` | 300ms | Standard interactions (hover, focus) |
| `transitionDuration.slow`   | 500ms | Gradual transitions (image zoom)     |

---

## Interaction Contract (Standardized)

Use this contract for all primary route CTAs, card-heavy sections, and gallery controls.

### Action Controls (Buttons and Links)

- Minimum touch target: `min-h-11` (44px) for text actions
- Icon-only controls: `min-h-11 min-w-11`
- Hover posture: subtle lift with `hover:-translate-y-0.5`
- Focus visibility: always include `focus-visible:outline-2 focus-visible:outline-offset-4` plus a brand outline color

Canonical examples:

```tsx
// Primary action
className =
  "inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary";

// Secondary/inverted action
className =
  "inline-flex min-h-11 items-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary";
```

### Interactive Cards

- Keep card interaction subtle and readable: lift + shadow on hover
- Add keyboard affordance for nested links/buttons using `focus-within:ring-*`
- Avoid aggressive transforms (`scale-*`) for dense text cards

Canonical example:

```tsx
className =
  "rounded-xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-within:ring-2 focus-within:ring-brand-primary/25";
```

### Gallery and Carousel Controls

- Prev/next controls must be at least `44x44` (`min-h-11 min-w-11`)
- Thumbnail buttons require keyboard-visible outlines
- Use consistent outline colors (`outline-brand-primary` unless intentionally overridden)

---

## Pre-Composed Design Tokens

For common component patterns, use pre-composed tokens:

```tsx
import { designTokens } from "@/lib/styles/design-tokens";

// Standard interactive card
<div className={`bg-white ${designTokens.cardInteractive}`}>

// Icon with playful hover
<div className={`p-4 ${designTokens.iconPlayful}`}>

// Button with standard interaction
<button className={designTokens.button}>
```

---

## Migration Checklist

When updating existing components:

- [ ] Remove all hard-coded `rounded-*` classes
- [ ] Remove all inline `group-hover:scale-*` and `hover:scale-*`
- [ ] Remove all inline `group-hover:rotate-*` patterns
- [ ] Import design tokens: `import { cornerRadius, hoverMotion } from "@/lib/styles/design-tokens"`
- [ ] Replace with appropriate design token values
- [ ] Ensure CTA/link controls meet 44px minimum target (`min-h-11`)
- [ ] Add `focus-visible:outline-*` treatment on all keyboard-focusable action controls
- [ ] Add subtle lift (`hover:-translate-y-0.5`) for primary and secondary actions where appropriate
- [ ] Add `focus-within:ring-*` affordance to interactive cards containing links/buttons
- [ ] Test hover interactions in both light and dark modes
- [ ] Verify accessibility (focus states, keyboard navigation)

---

## Component Examples

### Service Card (Complete Example)

```tsx
import { cornerRadius, hoverMotion } from "@/lib/styles/design-tokens";

function ServiceCard({ service }) {
  return (
    <div
      className={`bg-white ${cornerRadius.card} ${hoverMotion.cardLift} p-6 shadow-lg`}
    >
      <div
        className={`${cornerRadius.icon} ${hoverMotion.iconSubtle} p-4 bg-brand-primary`}
      >
        <MaterialIcon icon={service.icon} />
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
}
```

---

## Enforcement

These standards are:

1. **Required** for all new components
2. **Should be applied** when modifying existing components
3. **Enforced** during code review
4. **Aligned** with MH branding guidelines

See also:

- [MH Branding Guardrails](/.github/instructions/mh-branding-guardrails.instructions.md)
- [Brand Congruency Master Checklist](/docs/branding/governance/brand-congruency-master-checklist.md)
- [Branding Congruency Checklist](/docs/development/standards/branding-congruency-checklist.md)
- [Container and Modal Visual Contract](/docs/branding/standards/unified-component-standards.md#container-and-modal-visual-contract-canonical)
- [Card Visual Contract](/docs/branding/standards/unified-component-standards.md#card-visual-contract-canonical)
- [Form Field and Form Shell Visual Contract](/docs/branding/standards/unified-component-standards.md#form-field-and-form-shell-visual-contract-canonical)
- [Navigation Overlay and Header Action Visual Contract](/docs/branding/standards/unified-component-standards.md#navigation-overlay-and-header-action-visual-contract-canonical)
- [Footer Accreditation and Trust Continuity Visual Contract](/docs/branding/standards/unified-component-standards.md#footer-accreditation-and-trust-continuity-visual-contract-canonical)

---

## Future Improvements

Potential enhancements to consider:

1. **Animation tokens** - Standardize complex animations (fade-in, slide-in)
2. **Shadow tokens** - Centralize elevation/shadow values
3. **Spacing tokens** - Standardize padding/margin patterns
4. **Typography tokens** - Centralize text sizing patterns
