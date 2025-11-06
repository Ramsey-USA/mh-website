# Layout Documentation Index

**Category:** Design System - Layout & Spacing  
**Last Updated:** November 6, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Master Documentation Index](../../../MasterIndex.md) - Central hub for all documentation
- [🎨 Design System Hub](../design-system-index.md) - Complete design system navigation
- [🛠️ Technical Index](../../technical-index.md) - Technical documentation hub
- [📱 Mobile Optimization](../mobile-optimization-guide.md) - Mobile design standards

---

## 📋 Overview

Layout documentation for MH Construction website covering page structure, spacing standards, container widths, and responsive grid systems.

---

## 📚 Documentation Files

### Page Layout Standards

**[page-layout-standards.md](./page-layout-standards.md)** - Comprehensive layout reference

Complete guide to page layout standards including spacing, padding, container widths, grid systems, and component arrangement patterns.

**Topics Covered:**

- Section spacing standards (py-12 lg:py-16)
- Container widths (max-w-7xl, max-w-5xl)
- Grid layouts and breakpoints
- Component spacing rules
- Typography integration
- Responsive patterns
- Margin and padding standards

**When to Use:**

- Reference for consistent spacing
- Planning new page layouts
- Understanding layout conventions
- Troubleshooting spacing issues
- Maintaining visual consistency

---

### Page Layout Quick Start

**[page-layout-quick-start.md](./page-layout-quick-start.md)** - Fast implementation guide

Quick reference with copy-paste templates for common layout patterns. Perfect for rapid development and consistent implementation.

**Topics Covered:**

- Copy-paste section templates
- Hero section patterns
- Content section layouts
- Grid component arrangements
- Common layout combinations
- Quick troubleshooting

**When to Use:**

- Building new pages quickly
- Need copy-paste templates
- Implementing standard sections
- Quick layout reference during development

---

## 🎯 When to Use Each Guide

| Task                            | Use This Guide                                          | Why                                        |
| ------------------------------- | ------------------------------------------------------- | ------------------------------------------ |
| **Understanding layout system** | [Page Layout Standards](./page-layout-standards.md)     | Comprehensive reference with all standards |
| **Building new page quickly**   | [Page Layout Quick Start](./page-layout-quick-start.md) | Copy-paste templates save time             |
| **Troubleshooting spacing**     | [Page Layout Standards](./page-layout-standards.md)     | Detailed spacing rules and patterns        |
| **Mobile responsive layout**    | Both + [Mobile Guide](../mobile-optimization-guide.md)  | Complete responsive implementation         |
| **Component arrangement**       | [Page Layout Standards](./page-layout-standards.md)     | Grid and spacing conventions               |

---

## 🚀 Quick Start

### Standard Section Pattern

```tsx
<section className="py-12 lg:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section content */}
  </div>
</section>
```

### Content Width Constraint

```tsx
<div className="max-w-5xl mx-auto">
  {/* Text content - optimal reading width */}
</div>
```

### Grid Layout

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Grid items */}
</div>
```

---

## 📊 Layout Standards Summary

### Section Spacing

- **Vertical Padding:** `py-12 lg:py-16`
- **Small Sections:** `py-8 lg:py-12`
- **Large Sections:** `py-16 lg:py-24`

### Container Widths

- **Full Width:** `max-w-7xl` (1280px)
- **Content Width:** `max-w-5xl` (1024px)
- **Narrow Content:** `max-w-3xl` (768px)

### Grid Gaps

- **Standard:** `gap-6 lg:gap-8`
- **Tight:** `gap-4 lg:gap-6`
- **Loose:** `gap-8 lg:gap-12`

### Responsive Breakpoints

- **Mobile:** `< 640px` (default, no prefix)
- **Tablet:** `md:` (768px+)
- **Desktop:** `lg:` (1024px+)
- **Large:** `xl:` (1280px+)

---

## 🔗 Related Documentation

### Design System

- [Design System Hub](../design-system-index.md) - Complete design system
- [Design System Standards](../design-system.md) - Core standards
- [Mobile Optimization](../mobile-optimization-guide.md) - Mobile patterns
- [Typography Examples](../typography-examples-clean.md) - Typography patterns

### Components

- [Buttons & CTAs](../buttons-and-ctas/buttons-ctas-index.md) - Button layouts
- [Icons](../icons/icons-index.md) - Icon integration

### Development

- [Consistency Guide](../../../development/consistency-guide.md) - Implementation patterns
- [Development Standards](../../../development/development-standards.md) - Coding conventions

---

## ✅ Layout Checklist

When implementing a new layout:

- [ ] Use standard section padding (py-12 lg:py-16)
- [ ] Apply appropriate container width (max-w-7xl or max-w-5xl)
- [ ] Include responsive horizontal padding (px-4 sm:px-6 lg:px-8)
- [ ] Use standard grid gaps (gap-6 lg:gap-8)
- [ ] Test on all breakpoints (mobile, tablet, desktop)
- [ ] Verify content doesn't touch edges on mobile
- [ ] Check vertical rhythm and spacing consistency
- [ ] Ensure accessibility (touch targets, focus indicators)

---

## 🆘 Troubleshooting

### Content Touching Edges

**Solution:** Add horizontal padding: `px-4 sm:px-6 lg:px-8`

### Inconsistent Spacing

**Solution:** Use standard patterns from [Page Layout Standards](./page-layout-standards.md)

### Grid Not Responsive

**Solution:** Include responsive grid classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Content Too Wide

**Solution:** Apply max-width constraint: `max-w-5xl mx-auto`

---

## 📞 Support

For questions about layout standards:

- **Email:** [office@mhc-gc.com](mailto:office@mhc-gc.com)
- **Documentation Issues:** Submit to project repository

---

**Last Updated:** November 6, 2025  
**Status:** ✅ Active  
**Files:** 2 (Standards + Quick Start)
