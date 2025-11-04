# Quick Start - Page Layout Guide

> **Quick reference for creating new pages with consistent spacing and typography**

## 🚀 TL;DR - Copy This Template

````tsx
export default function YourPage() {
  return (
    <>
      {/* Standard Section */}
      <section className="relative bg-white dark:bg-gray-900 py-12 lg:py-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50
          dark:from-gray-800/50 to-white dark:to-gray-900"></div>
        <div className="top-20 right-20 absolute bg-brand-primary/5 blur-3xl
          rounded-full w-32 h-32"></div>
        <div className="bottom-20 left-20 absolute bg-brand-secondary/5 blur-3xl
          rounded-full w-40 h-40"></div>

        {/* Content */}
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

          {/* Header */}
          <div className="mb-10 lg:mb-12 text-center">
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100
              text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight
              tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700
                dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl
                tracking-tight">
                Context Line
              </span>
              <span className="block bg-clip-text bg-gradient-to-r
                from-brand-primary to-brand-secondary drop-shadow-sm
                text-transparent">
                Main Title
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600
              dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed
              tracking-wide">
              Introduction paragraph
            </p>
          </div>

          {/* Card Grid */}
          <div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Your cards */}
          </div>
        </div>
      </section>
    </>
  )
}
```text

## 📦 Standard Card Template

```tsx
<div className="group relative bg-white dark:bg-gray-800 shadow-lg
  hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl
  hover:scale-105 transition-all duration-300">
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5
    to-brand-secondary/5 opacity-0 group-hover:opacity-100 rounded-3xl
    transition-opacity duration-300"></div>

  <div className="relative flex flex-col h-full">
    {/* Icon */}
    <div className="flex justify-center items-center bg-brand-primary/10 mb-6 p-2 rounded-2xl w-16 h-16">
      <MaterialIcon icon="your_icon" size="xl" className="text-brand-primary" />
    </div>

    {/* Title */}
    <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-2xl">
      Card Title
    </h3>

    {/* Description */}
    <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
      Description content
    </p>

    {/* CTA */}
    <div className="flex items-center font-semibold text-brand-primary mt-auto">
      <span className="mr-2">Learn More</span>
      <MaterialIcon icon="arrow_forward" size="lg" />
    </div>
  </div>
</div>
```text

## 🎯 Common Classes - Cheat Sheet

### Spacing

| Use Case | Classes |
|----------|---------|
| Section vertical | `py-12 lg:py-16` |
| Section horizontal | `px-4 sm:px-6 lg:px-8` |
| Max width | `max-w-7xl` |
| Section header margin | `mb-10 lg:mb-12` |
| Heading margin | `mb-6` |
| Text margin | `mb-4` or `mb-6` |

### Typography

| Element | Classes |
|---------|---------|
| H2 Main | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black` |
| H2 Context | `text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold` |
| H3 Card | `text-2xl font-bold` |
| Body Large | `text-lg md:text-xl lg:text-2xl font-light` |
| Body Standard | `text-base leading-relaxed` |

### Colors

| Purpose | Light Mode | Dark Mode |
|---------|-----------|-----------|
| Background | `bg-white` | `dark:bg-gray-900` |
| Card BG | `bg-white` | `dark:bg-gray-800` |
| Text Primary | `text-gray-900` | `dark:text-gray-100` |
| Text Secondary | `text-gray-600` | `dark:text-gray-300` |
| Border | `border-gray-200` | `dark:border-gray-700` |

### Cards

| Property | Classes |
|----------|---------|
| Base | `relative group p-8 rounded-3xl` |
| Shadow | `shadow-lg hover:shadow-2xl` |
| Border | `border border-gray-200 dark:border-gray-700` |
| Hover | `hover:scale-105 transition-all duration-300` |
| Layout | `flex flex-col h-full` |

## 🔄 Alternating Section Colors

```tsx
{/* Section 1 - White */}
<section className="bg-white dark:bg-gray-900">

{/* Section 2 - Gray gradient */}
<section className="bg-gradient-to-b from-gray-50 dark:from-gray-800 to-white dark:to-gray-900">

{/* Section 3 - White */}
<section className="bg-white dark:bg-gray-900">

{/* Section 4 - Gradient */}
<section className="bg-gradient-to-br from-brand-primary via-brand-primary-dark to-gray-900">
```text

## 📐 Grid Breakpoints

```tsx
{/* 3 columns (most common) */}
<div className="gap-6 lg:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

{/* 4 columns (feature cards) */}
<div className="gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

{/* 2 columns */}
<div className="gap-6 grid grid-cols-1 md:grid-cols-2">
```text

## 🎨 Gradient Text Effect

```tsx
<span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
  Gradient Text
</span>
```text

## ✨ Icon Sizes

| Size | Class | Pixels | Use Case |
|------|-------|--------|----------|
| Small | `size="sm"` | 24px | Inline icons |
| Medium | `size="md"` | 30px | Small cards |
| Large | `size="lg"` | 36px | Buttons, links |
| XL | `size="xl"` | 48px | Service cards |
| 2XL | `size="2xl"` | 60px | Feature cards |
| 3XL | `size="3xl"` | 72px | Value cards |

## � Responsive Design Quick Tips

### Breakpoint Classes (Mobile-First)

| Device | Breakpoint | Prefix | Example |
|--------|------------|--------|---------|
| Mobile | Default | - | `text-base` |
| Small | ≥ 640px | `sm:` | `sm:text-lg` |
| Tablet | ≥ 768px | `md:` | `md:text-xl` |
| Desktop | ≥ 1024px | `lg:` | `lg:text-2xl` |

### Common Responsive Patterns

```tsx
{/* Padding - adapts to screen size */}
px-4 sm:px-6 lg:px-8

{/* Typography - scales from mobile to desktop */}
text-2xl sm:text-3xl md:text-4xl lg:text-5xl

{/* Grid - 1 column mobile, 2 tablet, 3 desktop */}
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3

{/* Flexbox - stack mobile, row desktop */}
flex flex-col sm:flex-row

{/* Spacing - smaller mobile, larger desktop */}
py-12 lg:py-16
gap-6 lg:gap-8
```text

### Touch-Friendly Standards

✅ **Minimum button height:** `h-12` (48px)
✅ **Minimum touch target:** `w-12 h-12`
✅ **Mobile-first approach:** Start with mobile, add larger breakpoints
✅ **Test on real devices:** iPhone, iPad, Android

### Quick Test Checklist

- [ ] Works on iPhone SE (375px) - smallest mobile
- [ ] Works on iPad (768px) - tablet
- [ ] Works on desktop (1024px+)
- [ ] No horizontal scrolling on any device
- [ ] Touch targets are 48px minimum
- [ ] Text is readable at all sizes

## 🔗 Full Documentation

For complete details, see:

- **[page-layout-standards.md](./page-layout-standards.md)** - Complete
  reference with full responsive guide
- **[design-system.md](./design-system/design-system.md)** - Brand guidelines
- **Home Page Source:** `src/app/page.tsx` - Live examples

---

**Pro Tip:** Copy the home page section structure and modify the content rather
than building from scratch! All templates are already mobile-responsive.
````
