# Page Layout Standards Documentation

**Date:** October 2, 2025  
**Status:** ✅ Complete  
**Impact:** High - Establishes consistency for all future pages

---

## Overview

Created comprehensive documentation extracting spacing, padding, typography, and layout patterns from the home page to ensure visual consistency across the entire MH Construction website.

## Documents Created

### 1. **PAGE_LAYOUT_STANDARDS.md** (Main Reference)

**Location:** `/docs/technical/PAGE_LAYOUT_STANDARDS.md`

**Contains:**

- ✅ Complete section layout structure
- ✅ Typography hierarchy (H1, H2, H3, body text)
- ✅ Responsive spacing system
- ✅ Background pattern standards
- ✅ Grid system breakpoints
- ✅ Card structure templates
- ✅ Button standards
- ✅ Animation & transition classes
- ✅ Complete section template
- ✅ New page checklist

**Key Patterns Documented:**

| Pattern | Standard |
|---------|----------|
| Section padding | `py-12 lg:py-16` |
| Container width | `max-w-7xl` |
| Horizontal padding | `px-4 sm:px-6 lg:px-8` |
| Section header margin | `mb-10 lg:mb-12` |
| Card padding | `p-8` |
| Card radius | `rounded-3xl` |
| Grid gap | `gap-6 lg:gap-8` |

### 2. **PAGE_LAYOUT_QUICK_START.md** (Developer Quick Reference)

**Location:** `/docs/technical/PAGE_LAYOUT_QUICK_START.md`

**Contains:**

- ✅ Copy-paste section template
- ✅ Copy-paste card template
- ✅ Cheat sheet tables for common classes
- ✅ Quick spacing reference
- ✅ Quick typography reference
- ✅ Color mappings (light/dark mode)
- ✅ Icon size guide
- ✅ Grid breakpoint patterns

**Purpose:** Fast reference for developers building new pages without reading full documentation.

### 3. **DESIGN_SYSTEM.md** (Updated)

**Location:** `/docs/technical/DESIGN_SYSTEM.md`

**Changes:**

- ✅ Added cross-reference to PAGE_LAYOUT_STANDARDS.md at top
- ✅ Integrated layout documentation into existing design system

---

## Standards Extracted from Home Page

### Section Structure

```tsx
<section className="relative bg-[COLOR] py-12 lg:py-16">
  <div className="absolute inset-0 bg-gradient-to-b..."></div>
  <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl..."></div>
  <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl..."></div>
  
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* Content */}
  </div>
</section>
```text

### Typography Hierarchy

**H1 (Hero):**

text-4xl sm:text-5xl md:text-6xl lg:text-7xl
font-black mb-6 leading-tight tracking-tight

**H2 (Sections):**

text-2xl sm:text-3xl md:text-4xl lg:text-5xl
font-black mb-6 leading-tight tracking-tighter

**H3 (Cards):**

text-2xl font-bold mb-4

**Body Large (Intros):**

text-lg md:text-xl lg:text-2xl
font-light leading-relaxed tracking-wide

### Card Standards

```tsx
<div className="group relative bg-white dark:bg-gray-800 
                shadow-lg hover:shadow-2xl p-8 
                border border-gray-200 dark:border-gray-700 
                rounded-3xl hover:scale-105 
                transition-all duration-300">
  
  <div className="relative flex flex-col h-full">
    {/* Icon */}
    <div className="w-16 h-16 mb-6">{/* Icon */}</div>
    
    {/* Title */}
    <h3 className="text-2xl font-bold mb-4">{/* Title */}</h3>
    
    {/* Description (flex-grow) */}
    <p className="flex-grow mb-6">{/* Text */}</p>
    
    {/* CTA (mt-auto = bottom aligned) */}
    <div className="mt-auto">{/* CTA */}</div>
  </div>
</div>
```text

### Grid Systems

**3-Column (Standard):**

grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8

**4-Column (Features):**

grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10

---

## Benefits

### For Developers

✅ **Faster Development** - Copy-paste templates instead of starting from scratch  
✅ **Consistency** - All pages follow same spacing/typography patterns  
✅ **Less Decision Making** - Standards already defined  
✅ **Quick Reference** - Cheat sheets available

### For Design

✅ **Visual Consistency** - Professional, cohesive look across site  
✅ **Brand Integrity** - Standards enforce brand guidelines  
✅ **Scalability** - New pages automatically match existing design  
✅ **Maintenance** - Easy to update standards in one place

### For Users

✅ **Familiarity** - Consistent UX across all pages  
✅ **Readability** - Optimized typography hierarchy  
✅ **Professional Appearance** - Polished, cohesive design  
✅ **Accessibility** - Responsive, well-spaced layouts

---

## Usage Examples

### Creating a New Services Page

```tsx
import { MaterialIcon } from '@/components/icons/MaterialIcon'

export default function ServicesPage() {
  return (
    <section className="relative bg-white dark:bg-gray-900 py-12 lg:py-16">
      {/* Copy background effects from template */}
      
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Copy header from template */}
        <div className="mb-10 lg:mb-12 text-center">
          <h2 className="mb-6 font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl...">
            {/* Your content */}
          </h2>
        </div>
        
        {/* Copy grid from template */}
        <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Your cards */}
        </div>
      </div>
    </section>
  )
}
```text

### Creating a New Card

```tsx
// Just copy the card template from PAGE_LAYOUT_QUICK_START.md
// Replace icon, title, description, and CTA text
// Everything else stays the same!
```text

---

## Documentation Structure

docs/
├── technical/
│   ├── PAGE_LAYOUT_STANDARDS.md     ⭐ Complete reference
│   ├── PAGE_LAYOUT_QUICK_START.md   ⭐ Quick copy-paste guide
│   ├── DESIGN_SYSTEM.md             ⭐ Updated with link
│   ├── ICON-SYSTEM-QUICK-REFERENCE.md
│   └── FEATURES.md
├── business/
│   ├── MH-BRANDING.md
│   └── SERVICES.md
└── project/
    └── archive/
        └── PAGE_LAYOUT_STANDARDS_SUMMARY.md  ⭐ This file

---

## Quick Links

### For Developers Building New Pages

👉 Start here: [PAGE_LAYOUT_QUICK_START.md](../technical/PAGE_LAYOUT_QUICK_START.md)

### For Complete Reference

👉 See: [PAGE_LAYOUT_STANDARDS.md](../technical/PAGE_LAYOUT_STANDARDS.md)

### For Brand Guidelines

👉 See: [DESIGN_SYSTEM.md](../technical/DESIGN_SYSTEM.md)

### For Live Examples

👉 See: `src/app/page.tsx` (home page source code)

---

## Maintenance

### Updating Standards

If layout patterns on the home page change:

1. Update `src/app/page.tsx` (source of truth)
2. Update `PAGE_LAYOUT_STANDARDS.md` to match
3. Update `PAGE_LAYOUT_QUICK_START.md` templates
4. Notify team of changes

### Consistency Checks

When reviewing PRs for new pages, verify:

- [ ] Section padding matches standards (`py-12 lg:py-16`)
- [ ] Typography hierarchy is correct
- [ ] Card structure follows template
- [ ] Grid gaps are consistent
- [ ] Dark mode classes included
- [ ] Responsive breakpoints used

---

## Next Steps

### Immediate

✅ Documentation created  
✅ Standards extracted  
✅ Templates provided  

### Future

- [ ] Create page component templates in code
- [ ] Add TypeScript types for layout props
- [ ] Create Storybook examples
- [ ] Add automated linting for layout standards

---

## Related Updates

- **Service Cards Layout Fix** - Bottom-aligned CTAs (October 2, 2025)
- **Icon System Optimization** - Standardized sizing (October 2, 2025)
- **Design System v3.7** - Foundation complete (Current)

---

**Questions?**  
Refer to [PAGE_LAYOUT_STANDARDS.md](../technical/PAGE_LAYOUT_STANDARDS.md) or review `src/app/page.tsx` for live examples.

**Contributors:** MH Construction Development Team  
**Version:** 1.0
