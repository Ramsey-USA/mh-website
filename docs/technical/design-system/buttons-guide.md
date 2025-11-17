# MH Construction Button System - Complete Guide

**Category:** UI Components - Button System
**Last Updated:** November 6, 2025
**Status:** ✅ Active - Consolidated Documentation

## 🧭 Quick Navigation

- [🔘 Button System Hub](./buttons-ctas-index.md) - Buttons & CTAs documentation hub
- [🎨 Section Enhancement Patterns](../../branding/implementation/section-enhancement-patterns.md) - **PRIMARY
  REFERENCE** for button implementation
- [🗂️ Master Documentation Index](../../master-index.md) - Central hub for all documentation
- [🎨 Branding Standards](../../branding/standards/cta-standardization-plan.md) - Brand CTA standards
- [💬 Partnership Messaging](../../partnerships/messaging/cta-button-guide.md) - CTA messaging guide

---

## 🎯 Mission Overview

This comprehensive guide establishes MH Construction's cohesive button system, ensuring:

- **Consistent naming conventions** across all button variants
- **Proper icon integration** with standardized sizing and positioning
- **Cohesive color schemes** for light/dark modes
- **Unified hover effects** with smooth transitions
- **Accessibility compliance** with proper focus states and ARIA labels
- **Responsive behavior** optimized for all devices

---

## 🔘 Button Variants

### Primary Buttons (Hunter Green)

**Purpose:** Complete technical implementation guide for MH Construction's button system with
accessibility, responsive design, and conversion optimization.

**Colors:** Hunter Green (#386851) with white text on hover

**Usage:** "Schedule Free Consultation", "Request Project Review", "Contact Client Services"

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

- Main conversion CTAs
- Primary user actions
- Schedule/booking buttons
- Client contact actions

---

### Secondary Buttons (Leather Tan)

**Purpose:** Secondary actions, complementary options

**Colors:** Leather Tan (#BD9264) with white text on hover

**Usage:** "Learn More", "View Portfolio", "Try Automated Estimator"

`````tsx
<Button variant="secondary" size="lg" className="group/btn">
  <MaterialIcon
    icon="smart_toy"
    size="lg"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Try AI Estimator
</Button>
```text

**When to Use:**

- Alternative pathways
- AI Estimator actions
- Vendor contact actions
- Complementary services

---

### Outline Buttons

**Purpose:** Subtle actions, alternative options

**Colors:** Hunter Green border with transparent background

**Usage:** "Cancel", "Back", "Skip", "Filter"

```tsx
<Button variant="outline" size="default" className="group/btn">
  <MaterialIcon
    icon="arrow_back"
    size="md"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Go Back
</Button>
```text

**When to Use:**

- Cancel/dismiss actions
- Navigation (back/next)
- Secondary UI actions
- Filter/sort controls

---

### Neutral Buttons

**Purpose:** Theme-aware, system-level actions

**Colors:** Adaptive gray colors that follow theme

**Usage:** Settings, toggles, utility functions

```tsx
<Button variant="neutral" size="default" className="group/btn">
  <MaterialIcon
    icon="settings"
    size="md"
    className="mr-2 group-hover/btn:scale-110 transition-transform"
  />
  Account Settings
</Button>
```text

**When to Use:**

- Settings and preferences
- System-level actions
- Admin/utility functions
- Theme-neutral operations

---

## 🎨 Color Standards

### Light Mode

- **Primary:** White background → Hunter Green (#386851) on hover
- **Secondary:** White background → Leather Tan (#BD9264) on hover
- **Outline:** Transparent → Hunter Green tint on hover
- **Neutral:** White → Dark gray on hover

### Dark Mode

- **Primary:** Dark gray background → Hunter Green on hover
- **Secondary:** Dark gray background → Leather Tan on hover
- **Outline:** Transparent → Hunter Green tint on hover
- **Neutral:** Dark gray → Light gray on hover

**Color Compliance:**

- All colors meet WCAG AA contrast requirements
- Hover states provide clear visual feedback
- Focus indicators use brand colors with high visibility

---

## 📐 Size Standards

### Size Variants

| Size | Height | Usage | Touch Target |
|------|--------|-------|--------------|
| `sm` | 32px | Compact spaces, inline actions | Mobile: Add padding |
| `default` | 40px | Standard form elements | ✅ Adequate |
| `lg` | 48px | Primary CTAs, hero sections | ✅ Optimal |
| `xl` | 56px | Major actions, hero buttons | ✅ Optimal |

### Icon Sizes by Button Size

| Button Size | Icon Size | Tailwind Classes |
|-------------|-----------|------------------|
| `sm` | 16px | `w-4 h-4` |
| `default` | 20px | `w-5 h-5` |
| `lg` | 24px | `w-6 h-6` |
| `xl` | 28px | `w-7 h-7` |

### Icon Spacing

- **Left icons:** `mr-2` (8px) for default, `mr-3` (12px) for lg/xl
- **Right icons:** `ml-2` (8px) for default, `ml-3` (12px) for lg/xl
- **Icon-only buttons:** Use `icon`, `icon-sm`, or `icon-lg` size variants

````tsx
// Proper icon sizing examples
<Button variant="primary" size="sm">
  <MaterialIcon icon="phone" className="mr-2 w-4 h-4" />
  Call
</Button>

<Button variant="primary" size="lg">
  <MaterialIcon icon="event" className="mr-3 w-6 h-6" />
  Schedule Consultation
</Button>
```text

---

## 🚀 Hover Effects & Transitions

### Standardized Transitions

All buttons use: `transition-all duration-300`

### Movement Effects

- **Lift:** `hover:-translate-y-0.5` (subtle upward movement)
- **Active:** `active:translate-y-0` (click feedback)
- **Scale:** Slight scale on some variants for emphasis

### Shadow Effects

- **Primary:** Enhanced green shadows on hover
- **Secondary:** Enhanced tan shadows on hover
- **Outline:** Subtle shadow appearance on hover
- **Neutral:** Minimal shadow changes

---

## 📱 Responsive Considerations

### Mobile Optimizations (< 768px)

- **Minimum touch target:** 44px (use `size="lg"` on mobile)
- **Button spacing:** 16px gap between buttons
- **Full-width option:** Add `className="w-full"` for mobile CTAs
- **Simplified text:** Consider shorter labels on mobile

```tsx
// Responsive button with adaptive text
<Button variant="primary" size="lg" className="w-full sm:w-auto">
  <MaterialIcon icon="phone" className="mr-2 sm:mr-3 w-5 sm:w-6 h-5 sm:h-6" />
  <span className="hidden sm:inline">Schedule Consultation</span>
  <span className="sm:hidden">Call Us</span>
</Button>
```text

### Desktop Enhancements (≥ 768px)

- Hover states are more pronounced
- Tooltip support for icon-only buttons
- Keyboard navigation with visible focus rings
- Multi-button layouts (horizontal rows)

---

## ♿ Accessibility Standards

### Focus States

All buttons include prominent focus indicators:

- `focus-visible:ring-2` with brand colors
- `focus-visible:ring-offset-2` for visibility
- High contrast in both light and dark modes

### ARIA Labels

**Icon-only buttons MUST include ARIA labels:**

```tsx
// Icon-only button (REQUIRED aria-label)
<Button variant="primary" size="icon" aria-label="Schedule consultation">
  <MaterialIcon icon="calendar_today" className="w-5 h-5" />
</Button>

// Descriptive button with help text
<Button variant="outline" aria-describedby="help-text">
  <MaterialIcon icon="help" className="mr-2 w-5 h-5" />
  Need Help?
</Button>
<span id="help-text" className="sr-only">
  Click for live chat support
</span>
```text

### Keyboard Navigation

- All buttons are keyboard accessible (Tab, Enter, Space)
- Focus order follows logical page flow
- Escape key should dismiss modals triggered by buttons
- Arrow keys for button groups (optional enhancement)

---

## 🏗️ Implementation Examples

### Homepage Hero Section

```tsx
// Hero CTA buttons with proper icon integration
<div className="flex flex-col sm:flex-row gap-4 justify-center">
  <Button variant="primary" size="xl">
    <MaterialIcon icon="build" className="mr-3 w-7 h-7" />
    Start Your Project
  </Button>
  <Button variant="outline" size="xl">
    <MaterialIcon icon="visibility" className="mr-3 w-7 h-7" />
    View Our Work
  </Button>
</div>
```text

---

### Contact Buttons (Client vs Vendor)

```tsx
// Contact buttons with client/vendor distinction
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* Client Contact - Primary (Hunter Green) */}
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="phone" className="mr-3 w-6 h-6" />
    <span className="text-center">
      Client Contact<br />
      <span className="text-sm opacity-90">(509) 308-6489</span>
    </span>
  </Button>

  {/* Vendor Contact - Secondary (Leather Tan) */}
  <Button variant="secondary" size="lg" className="w-full">
    <MaterialIcon icon="phone" className="mr-3 w-6 h-6" />
    <span className="text-center">
      Vendor Contact<br />
      <span className="text-sm opacity-90">(509) 308-6489</span>
    </span>
  </Button>
</div>

{/* Email Action - Outline */}
<Button variant="outline" size="lg">
  <MaterialIcon icon="email" className="mr-2 w-6 h-6" />
  office@mhc-gc.com
</Button>
```text

---

### Booking/Scheduling (IRL vs AI)

```tsx
// Scheduling flow buttons - IRL consultation vs automated estimator
<div className="space-y-4">
  {/* Primary: IRL Consultation */}
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="event" className="mr-3 w-6 h-6" />
    Schedule Free Consultation
  </Button>

  {/* Secondary: AI Estimator */}
  <Button variant="secondary" size="lg" className="w-full">
    <MaterialIcon icon="smart_toy" className="mr-3 w-6 h-6" />
    Try AI Estimator
  </Button>
</div>
```text

---

### Service Cards

```tsx
// Service card actions
<div className="flex gap-3 mt-6">
  <Button variant="primary" size="default" className="flex-1">
    <MaterialIcon icon="info" className="mr-2 w-5 h-5" />
    Learn More
  </Button>
  <Button variant="outline" size="icon" aria-label="Save to favorites">
    <MaterialIcon icon="favorite_border" className="w-5 h-5" />
  </Button>
  <Button variant="outline" size="icon" aria-label="Share service">
    <MaterialIcon icon="share" className="w-5 h-5" />
  </Button>
</div>
```text

---

### Form Actions

```tsx
// Form submission buttons
<div className="flex flex-col sm:flex-row gap-3 justify-end">
  <Button variant="outline" size="default">
    <MaterialIcon icon="close" className="mr-2 w-5 h-5" />
    Cancel
  </Button>
  <Button variant="neutral" size="default">
    <MaterialIcon icon="save" className="mr-2 w-5 h-5" />
    Save Draft
  </Button>
  <Button variant="primary" size="default" type="submit">
    <MaterialIcon icon="send" className="mr-2 w-5 h-5" />
    Submit
  </Button>
</div>
```text

---

### Project Estimation Flow

```tsx
// Estimator navigation buttons
<div className="space-y-4">
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="calculate" className="mr-3 w-6 h-6" />
    Calculate Estimate
  </Button>

  <div className="flex gap-3">
    <Button variant="outline" size="default" className="flex-1">
      <MaterialIcon icon="arrow_back" className="mr-2 w-5 h-5" />
      Previous
    </Button>
    <Button variant="primary" size="default" className="flex-1">
      Next
      <MaterialIcon icon="arrow_forward" className="ml-2 w-5 h-5" />
    </Button>
  </div>
</div>
```text

---

### Mobile Navigation Menu

```tsx
// Mobile-optimized button stack
<div className="flex flex-col gap-3 p-4">
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="construction" className="mr-3 w-6 h-6" />
    Our Services
  </Button>

  <Button variant="secondary" size="lg" className="w-full">
    <MaterialIcon icon="photo_library" className="mr-3 w-6 h-6" />
    Portfolio
  </Button>

  <Button variant="outline" size="lg" className="w-full">
    <MaterialIcon icon="group" className="mr-3 w-6 h-6" />
    About Us
  </Button>
</div>
```text

---

### Team Member Cards

```tsx
// Team profile actions
<div className="text-center space-y-4">
  <Button variant="secondary" size="default">
    <MaterialIcon icon="person" className="mr-2 w-5 h-5" />
    View Profile
  </Button>

  <div className="flex gap-2 justify-center">
    <Button variant="outline" size="icon-sm" aria-label="LinkedIn profile">
      <MaterialIcon icon="business" className="w-4 h-4" />
    </Button>
    <Button variant="outline" size="icon-sm" aria-label="Email contact">
      <MaterialIcon icon="email" className="w-4 h-4" />
    </Button>
  </div>
</div>
```text

---

### Government/Commercial Services

```tsx
// Service type distinction
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Button variant="primary" size="lg" className="w-full">
    <MaterialIcon icon="account_balance" className="mr-3 w-6 h-6" />
    Government Projects
  </Button>

  <Button variant="secondary" size="lg" className="w-full">
    <MaterialIcon icon="business" className="mr-3 w-6 h-6" />
    Commercial Services
  </Button>
</div>
```text

---

### Portfolio/Gallery Controls

```tsx
// Gallery navigation and filtering
<div className="flex flex-wrap gap-3 justify-center">
  <Button variant="outline" size="default">
    <MaterialIcon icon="filter_list" className="mr-2 w-5 h-5" />
    Filter Projects
  </Button>

  <Button variant="outline" size="default">
    <MaterialIcon icon="view_module" className="mr-2 w-5 h-5" />
    Grid View
  </Button>

  <Button variant="primary" size="default">
    <MaterialIcon icon="add" className="mr-2 w-5 h-5" />
    View All Projects
  </Button>
</div>
```text

---

### Settings/Admin Interface

```tsx
// Administrative button menu
<div className="space-y-3">
  <Button variant="neutral" size="default" className="w-full justify-start">
    <MaterialIcon icon="settings" className="mr-3 w-5 h-5" />
    Account Settings
  </Button>

  <Button variant="neutral" size="default" className="w-full justify-start">
    <MaterialIcon icon="security" className="mr-3 w-5 h-5" />
    Security
  </Button>

  <Button variant="destructive" size="default" className="w-full justify-start">
    <MaterialIcon icon="logout" className="mr-3 w-5 h-5" />
    Sign Out
  </Button>
</div>
```text

---

## ✅ Implementation Checklist

### Before Implementation

- [ ] Button has appropriate variant for its purpose
- [ ] Size is appropriate for context and touch targets
- [ ] Icon size matches button size standards
- [ ] Icon positioning follows spacing guidelines (mr-2, mr-3)
- [ ] Colors work in both light and dark modes
- [ ] Hover effects are smooth and appropriate
- [ ] Focus states are clearly visible
- [ ] ARIA labels present for icon-only buttons
- [ ] Responsive behavior tested on mobile

### Testing Requirements

- [ ] Test all hover states in light/dark modes
- [ ] Verify keyboard navigation works properly
- [ ] Check mobile touch targets meet 44px minimum
- [ ] Ensure text contrast meets WCAG AA standards
- [ ] Validate smooth transitions and animations
- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Verify focus indicators are visible
- [ ] Check responsive breakpoints

---

## 🎯 Brand Compliance

This button system ensures:

- ✅ **Visual Consistency**: All buttons follow MH Construction's brand guidelines
- ✅ **User Experience**: Predictable interactions across the entire site
- ✅ **Accessibility**: WCAG 2.1 AA compliance for all users
- ✅ **Performance**: Optimized CSS with smooth, performant animations
- ✅ **Maintainability**: Clear naming conventions and comprehensive documentation
- ✅ **Responsiveness**: Mobile-first design with desktop enhancements

---

## 🔗 Related Documentation

### Button & CTA System

- [Buttons & CTAs Hub](./buttons-ctas-index.md) - Central navigation for button/CTA docs
- [CTAs Complete Guide](./ctas-complete-guide.md) - CTA best practices and patterns
- [Partnership CTA Messaging](../../partnerships/messaging/cta-button-guide.md) - Messaging standards

### Brand Standards

- [CTA Standardization](../../branding/standards/cta-standardization-plan.md) - Brand CTA standards
- [Component Standards](../../branding/standards/component-standards.md) - UI component specs
- [Color System](../../branding/standards/color-system.md) - Brand colors and usage

### Development

- [Consistency Guide](../../development/consistency-guide.md) - Implementation standards
- [Development Standards](../../development/development-standards.md) - Coding conventions
- [Design System](../design-system.md) - Complete design system

---

## 🆘 Troubleshooting

### Button Not Showing Correct Colors

1. **Check variant prop:** Ensure `variant="primary"`, `"secondary"`, `"outline"`, or `"neutral"`
2. **Verify Tailwind:** Check that Tailwind classes aren't being overridden
3. **Test themes:** Switch between light and dark modes
4. **Check imports:** Verify Button component is imported correctly

### Icons Not Sizing Correctly

1. **Match icon to button size:** Use size guide above (sm=w-4, default=w-5, lg=w-6, xl=w-7)
2. **Check spacing:** Ensure mr-2 or mr-3 depending on button size
3. **Verify MaterialIcon:** Confirm MaterialIcon component is being used

### Accessibility Issues

1. **Run audit:** Use Lighthouse or axe DevTools
2. **Check contrast:** Verify WCAG AA compliance (4.5:1 minimum)
3. **Test keyboard:** Tab through all buttons
4. **Add ARIA:** Ensure icon-only buttons have aria-label

### Mobile Touch Targets Too Small

1. **Use lg size minimum:** Mobile buttons should be at least `size="lg"` (48px)
2. **Add full-width:** Consider `className="w-full"` on mobile
3. **Increase gap:** Ensure at least 8px spacing between buttons

---

**Last Updated:** November 6, 2025
**System Version:** 3.0 (Consolidated Documentation)
**Maintained by:** MH Construction Documentation Team
`````
