# Page Update Checklist - Military-Construction Header Standard

**Date:** December 17, 2025  
**Purpose:** Track progress of standardizing all pages to use new military-construction header pattern  
**Status:** ✅ **ALL PAGES COMPLETE** - 40 sections across 12 pages

**⚠️ IMPORTANT**: The old `SectionHeader` component pattern has been replaced with the new
**military-construction header standard**. See
[Component Organization Guide](../../technical/design-system/component-organization-guide.md)
for complete pattern documentation.

---

## ✅ New Military-Construction Header Standard

### Pattern Components

1. **Icon with decorative lines** - Centered icon with horizontal gradient lines
2. **Two-line heading** - Subtitle (context) + gradient main title (impact)
3. **Colored keyword description** - Strategic bold colored spans for emphasis
4. **Consistent spacing** - `mb-16 sm:mb-20` for section spacing

### Complete Pattern

```tsx
<div className="mb-16 sm:mb-20 text-center">
  {/* Icon with decorative lines */}
  <div className="flex items-center justify-center mb-8 gap-4">
    <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full"></div>
      <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
        <MaterialIcon
          icon="shield"
          size="2xl"
          className="text-white drop-shadow-lg"
        />
      </div>
    </div>
    <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
  </div>

  {/* Two-line gradient heading */}
  <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
    <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
      {subtitle}
    </span>
    <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
      {mainTitle}
    </span>
  </h2>

  {/* Description with colored keywords */}
  <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
    Description with{" "}
    <span className="font-bold text-brand-primary dark:text-brand-primary-light">
      primary emphasis
    </span>{" "}
    and{" "}
    <span className="font-bold text-gray-900 dark:text-gray-100">
      strong emphasis
    </span>
    .
  </p>
</div>
```

---

## ✅ Homepage Complete (5/5 Sections)

### 1. CoreValuesSection (`/src/components/home/CoreValuesSection.tsx`)

- ✅ Military-construction header pattern implemented
- ✅ Icon: `shield` with primary gradient
- ✅ Subtitle: "Veteran-Owned Values"
- ✅ Title: "Built on Honesty & Integrity"
- ✅ Colored keywords in description

### 2. WhyPartnerSection (`/src/components/home/WhyPartnerSection.tsx`)

- ✅ Military-construction header pattern implemented
- ✅ Icon: `verified` with primary gradient
- ✅ Subtitle: "Veteran-Owned Excellence"
- ✅ Title: "Proven Performance & Earned Integrity"
- ✅ Colored keywords in description
- ✅ Core philosophy callout included

### 3. ServicesShowcase (`/src/components/home/ServicesShowcase.tsx`)

- ✅ Military-construction header pattern implemented
- ✅ Icon: `explore` with secondary/bronze gradient
- ✅ Subtitle: "Full-Spectrum Construction"
- ✅ Title: "Services Built on Trust"
- ✅ Colored keywords in description

### 4. Website Transparency Section (`/src/app/page.tsx`)

- ✅ Military-construction header pattern implemented
- ✅ Icon: `construction` with secondary/bronze gradient
- ✅ Subtitle: "Transparency & Honesty"
- ✅ Title: "Commitment to Excellence"
- ✅ Colored keywords in description

### 5. Our Process Section (`/src/app/page.tsx`)

- ✅ Military-construction header pattern implemented
- ✅ Icon: `timeline` with primary gradient
- ✅ Subtitle: "Simple & Transparent"
- ✅ Title: "Our Process"
- ✅ Colored keywords in description

---

## ✅ All Pages Updated - Complete

### Major Pages (All Complete)

- ✅ About Page (`/src/app/about/page.tsx`) - 2 sections
- ✅ Services Page (`/src/app/services/page.tsx`) - 3 sections
- ✅ Team Page (`/src/app/team/page.tsx`) - 3 sections
- ✅ Veterans Page (`/src/app/veterans/page.tsx`) - 5 sections
- ✅ Projects Page (`/src/app/projects/components/*.tsx`) - 4 components
- ✅ Careers Page (`/src/app/careers/page.tsx`) - 7 sections
- ✅ Public Sector Page (`/src/app/public-sector/page.tsx`) - 7 sections
- ✅ Allies Page (`/src/app/allies/page.tsx`) - 5 sections
- ✅ Urgent Page (`/src/app/urgent/page.tsx`) - 7 sections (orange emergency styling)
- ✅ FAQ Page (`/src/app/faq/page.tsx`) - 2 sections
- ✅ Home Page (`/src/app/page.tsx`) - Already compliant
- ✅ Contact Page (`/src/app/contact/page.tsx`) - Already compliant

## Summary

Total: 40 sections across 12 pages - All standardized to military-construction pattern

---

## 📋 Icon Gradient Reference

**Primary (Green) - Trust, Values, Integrity:**

```tsx
from-brand-primary/30 to-brand-primary-dark/30 (blur)
from-brand-primary via-brand-primary-dark to-brand-primary-darker (icon)
```

**Secondary (Tan/Bronze) - Partnerships, Excellence:**

```tsx
from-brand-secondary/30 to-bronze-600/30 (blur)
from-brand-secondary via-bronze-700 to-bronze-800 (icon)
```

**Secondary (Bronze/Gold) - Awards, Premium:**

```tsx
from-brand-secondary/30 to-bronze-600/30 (blur)
from-brand-secondary via-bronze-700 to-bronze-800 (icon)
```

---

## 📊 Current Progress

- **Homepage Sections:** 5/5 (100%)
- **Total Pages:** 0/12 (0%)
- **Build Status:** ✅ Passing
- **Standard Established:** ✅ December 15, 2025

1. Search for manual h2 headers with icon patterns
2. Add `SectionHeader` import
3. Replace with component using appropriate variants

**Recommended Variants:**

- Open Positions: `iconVariant="multi"`
- Benefits: `iconVariant="bronze"`
- Culture: `iconVariant="secondary"`
- Growth Opportunities: `iconVariant="primary"`

---

### 8. Allies Page (`/src/app/allies/page.tsx`)

**Status:** Needs audit for manual headers

**Action Needed:**

1. Audit for manual section headers
2. Add `SectionHeader` import
3. Apply `iconVariant="secondary"` (partnership theme)

---

### 9. Public Sector Page (`/src/app/public-sector/page.tsx`)

**Status:** Currently shows `UnderConstruction` (flag is `true`)

**Action Needed:**

- When activated, audit for headers
- Use `iconVariant="primary"` (trust/compliance theme)

---

### 10. Contact Page (`/src/app/contact/page.tsx`)

**Status:** Needs audit

**Recommended Variant:**

- Use `iconVariant="secondary"` (relationship/communication)

---

### 11. FAQ Page (`/src/app/faq/page.tsx`)

**Status:** Needs audit

**Recommended Variant:**

- Use `iconVariant="secondary"` (helpful/support)

---

### 12. Projects Page (`/src/app/projects/page.tsx`)

**Status:** Uses layout `SectionHeader` in child components

**Components to Update:**

- `/src/app/projects/components/PartnershipProcessSection.tsx`
- `/src/app/projects/components/CapabilitiesSection.tsx`
- `/src/app/projects/components/WhyChooseSection.tsx`
- `/src/app/projects/components/TestimonialsSection.tsx`

**Action Needed:**

1. Update imports in each component
2. Add `iconVariant` prop
3. Use `iconVariant="bronze"` for excellence/results themes

---

### 13. Urgent Page (`/src/app/urgent/page.tsx`)

**Status:** Needs audit

**Recommended Variant:**

- Use `iconVariant="multi"` (featured/urgent response)

---

## 📋 Implementation Notes

### Key Patterns Applied

1. **Icon Gradients:**
   - Primary (green): Trust, values, integrity sections
   - Secondary (tan/bronze): Partnerships, excellence sections
   - Bronze/Gold: Awards, premium sections
   - Orange: Emergency/urgent sections (Urgent page only)

2. **Two-Line Headings:**
   - Subtitle line provides context
   - Main title line uses gradient for impact
   - Consistent typography: text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl

3. **Special Adaptations:**
   - Urgent page: Orange gradients (from-orange-600 via-orange-500 to-orange-600)
   - FAQ page: Inline gradient spans for category headers
   - All pages: Removed deprecated SectionHeader component imports

### Migration Results

- ✅ All deprecated SectionHeader component usage removed
- ✅ All manual h2 headers standardized
- ✅ Consistent spacing (mb-16 sm:mb-20) applied
- ✅ Typography with descender handling (py-2 pb-3 leading-normal)
- ✅ No TypeScript errors
- ✅ Build passing

---

## 🔗 Related Documentation

- [Section Visual Standards](./section-visual-standards.md)
- [Icon Variant Quick Reference](./icon-variant-quick-reference.md)
- [Cohesion Checklist](./cohesion-checklist.md)
- [SectionHeader Component Source](../../../src/components/ui/SectionHeader.tsx)
