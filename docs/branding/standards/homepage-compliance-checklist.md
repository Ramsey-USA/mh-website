# Homepage Compliance Checklist

**Version:** 1.0.0  
**Date:** November 18, 2025  
**Status:** ✅ Active Standard  
**Purpose:** Ensure all new pages match homepage implementation

---

## 🎯 Purpose

This checklist ensures that all new pages and edits follow the exact same patterns, attributes, and standards as
the homepage implementation (the source of truth for MH Construction branding).

---

## ✅ Typography Standards

### H2 Section Titles (Main Sections)

```tsx
<h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
```

**CRITICAL:**

- ✅ Use `dark:text-gray-100` (softer, more readable in dark mode)
- ❌ **NEVER** use `dark:text-white` (too harsh)

### H3 Card Titles & Subsection Headings

```tsx
<h3 className="mb-2 sm:mb-3 font-black text-gray-900 dark:text-gray-100 text-lg sm:text-xl md:text-2xl lg:text-2xl leading-tight tracking-tight">
```

**CRITICAL:**

- ✅ Use `dark:text-gray-100` consistently
- ❌ **NEVER** use `dark:text-white`

### H4 Supporting Headings

```tsx
<h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
```

**CRITICAL:**

- ✅ Use `dark:text-gray-100` consistently
- ❌ **NEVER** use `dark:text-white`

---

## 🎨 Section Enhancement Pattern

All major content sections must follow this exact structure from the homepage:

### Required Elements (ALL sections)

#### 1. Background Gradient with Radial Overlays

```tsx
<section className="relative bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden">
```

#### 2. Radial Gradient Overlays (BOTH required)

```tsx
<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(56,104,81,0.15)_0%,transparent_50%)]"></div>
<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.12)_0%,transparent_50%)]"></div>
```

#### 3. Three Animated Blur Orbs (ALL 3 required with staggered delays)

```tsx
<div className="top-20 left-10 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
<div className="right-10 bottom-20 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-40 h-40 animate-pulse" style={{ animationDelay: "1s" }}></div>
<div className="top-1/2 left-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
```

#### 4. Icon Header with Glow Effect

```tsx
<div className="flex justify-center items-center mb-6 sm:mb-8">
  <div className="relative">
    <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
    <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
      <MaterialIcon icon="icon_name" size="2xl" className="text-white" />
    </div>
  </div>
</div>
```

#### 5. Two-Line Header with Subtitle and Title

```tsx
<h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
    Section Subtitle
  </span>
  <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
    Section Title
  </span>
</h2>
```

#### 6. Description Paragraph

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
  Section description with{" "}
  <span className="font-medium text-gray-800 dark:text-gray-200">emphasis</span>
  .
</p>
```

---

## 🚫 Common Mistakes to Avoid

### ❌ NEVER Do These

1. **Using `dark:text-white` for headings**
   - Always use `dark:text-gray-100` instead

2. **Missing blur orbs**
   - MUST have all 3 blur orbs with staggered animation delays

3. **Missing radial gradients**
   - MUST have both top-right and bottom-left radial gradients

4. **Wrong spacing values**
   - Follow exact spacing: `py-12 sm:py-16 lg:py-24 xl:py-32`
   - Header margin: `mb-12 sm:mb-16` for sections

5. **Inconsistent icon sizes**
   - Section headers: `size="2xl"`
   - Cards: `size="xl"` or `size="lg"`
   - Buttons: `size="lg"`

6. **Missing FadeInWhenVisible wrapper**
   - Wrap section headers for entrance animations

---

## 📋 Quick Validation Checklist

When creating or editing a page section, verify:

- [ ] h2 titles use `dark:text-gray-100` (NOT `dark:text-white`)
- [ ] h3 titles use `dark:text-gray-100` (NOT `dark:text-white`)
- [ ] h4 titles use `dark:text-gray-100` (NOT `dark:text-white`)
- [ ] Section has both radial gradient overlays
- [ ] Section has all 3 animated blur orbs with delays (0s, 0.5s, 1s)
- [ ] Icon header with glow effect present
- [ ] Two-line header structure (subtitle + title)
- [ ] Description paragraph with proper sizing
- [ ] Proper section padding: `py-12 sm:py-16 lg:py-24 xl:py-32`
- [ ] FadeInWhenVisible wrapper on header
- [ ] StaggeredFadeIn on card grids (if applicable)

---

## 🔍 Finding Violations

Use these commands to check for violations:

```bash
# Find any dark:text-white in heading elements
grep -rn "h[234] className.*dark:text-white" src/

# Find sections missing blur orbs (should have 3 per section)
grep -c "animate-pulse" src/app/yourpage/page.tsx

# Find sections missing radial gradients (should have 2 per section)
grep -c "radial-gradient" src/app/yourpage/page.tsx
```

---

## 🎯 Why These Standards Matter

1. **Visual Consistency**: Users experience the same professional design across all pages
2. **Accessibility**: `dark:text-gray-100` provides better readability than harsh white
3. **Brand Identity**: Consistent blur orbs and gradients create MH Construction's signature look
4. **Performance**: Following the same patterns ensures optimized rendering
5. **Maintainability**: One standard to follow makes updates easier

---

## 📚 Related Documentation

- [Section Enhancement Patterns](../implementation/section-enhancement-patterns.md) - Complete patterns guide
- [Typography Standards](./typography.md) - Full typography system
- [Component Standards](./component-standards.md) - Component guidelines
- [Hero Section Standards](./hero-section-standards.md) - Hero section requirements

---

**Source of Truth:** `/src/app/page.tsx` (Homepage)  
**Last Updated:** November 18, 2025  
**Maintained By:** MH Construction Development Team
