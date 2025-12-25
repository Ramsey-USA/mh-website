# Dark Mode Implementation Guide

**Date:** December 25, 2025  
**Status:** ✅ Complete  
**Category:** Technical - Design System  
**Last Updated:** December 25, 2025  
**Version:** 1.0.0

## Quick Navigation

- [🎨 Color System](../branding/standards/color-system.md)
- [🏠 Brand Documentation](../branding/)
- [📋 Development Standards](../development/standards/)

---

## Overview

This guide provides comprehensive instructions for implementing and maintaining dark mode across the
MH Construction website. All implementation follows the branding guidelines specified in
[color-system.md](../branding/standards/color-system.md).

## Table of Contents

1. [Architecture](#architecture)
2. [Color System](#color-system)
3. [Implementation Patterns](#implementation-patterns)
4. [Component Guidelines](#component-guidelines)
5. [Testing & Validation](#testing--validation)
6. [Common Patterns](#common-patterns)

---

## Architecture

### Theme Provider

The website uses a custom ThemeProvider built on React Context:

**Location:** `src/contexts/ThemeContext.tsx`

**Features:**

- Three modes: `light`, `dark`, `system`
- Persists preference to localStorage
- Syncs with system preferences
- Updates root element with `.dark` class

**Usage:**

```tsx
import { useTheme } from "@/contexts/ThemeContext";

function MyComponent() {
  const { theme, setTheme, isDarkMode } = useTheme();

  // Access current theme: "light" | "dark" | "system"
  // Toggle theme: setTheme("dark")
  // Check dark mode state: isDarkMode
}
```

### Theme Toggle Component

**Location:** `src/components/ui/layout/ThemeToggle.tsx`

**Features:**

- Compact mode for mobile/header
- Full mode with all three options
- Smooth animations
- Accessible with ARIA labels

---

## Color System

### Tailwind Configuration

**Location:** `tailwind.config.ts`

#### Brand Colors

```typescript
colors: {
  brand: {
    primary: "#386851",        // Hunter Green
    "primary-light": "#4a7a63", // Light Hunter Green
    "primary-dark": "#2d5240",  // Dark Hunter Green
    secondary: "#BD9264",       // Leather Tan
    "secondary-light": "#c9a176",
    "secondary-dark": "#a67d52",
  }
}
```

#### Semantic Colors

All semantic colors support light/dark variants:

```typescript
success: {
  light: "#10b981",  // Tailwind Green-500
  dark: "#22c55e",   // Tailwind Green-400
  DEFAULT: "#10b981",
}
```

Similar structure for `warning`, `error`, and `info`.

#### Text Colors

```typescript
text: {
  primary: {
    light: "#212121",  // Gray 900
    dark: "#FFFFFF",
    DEFAULT: "#212121",
  },
  secondary: {
    light: "#757575",  // Gray 600
    dark: "#B0B0B0",   // Gray 400
    DEFAULT: "#757575",
  },
  muted: {
    light: "#9E9E9E",  // Gray 500
    dark: "#757575",   // Gray 600
    DEFAULT: "#9E9E9E",
  },
}
```

#### Background Colors

```typescript
bg: {
  primary: {
    light: "#FFFFFF",
    dark: "#121212",
    DEFAULT: "#FFFFFF",
  },
  secondary: {
    light: "#FAFAFA",  // Gray 50
    dark: "#1E1E1E",
    DEFAULT: "#FAFAFA",
  },
  surface: {
    light: "#F5F5F5",  // Gray 100
    dark: "#2D2D2D",
    DEFAULT: "#F5F5F5",
  },
}
```

#### Border Colors

```typescript
border: {
  primary: {
    light: "#E0E0E0",  // Gray 300
    dark: "#424242",   // Gray 700
    DEFAULT: "#E0E0E0",
  },
  secondary: {
    light: "#EEEEEE",  // Gray 200
    dark: "#303030",   // Gray 800
    DEFAULT: "#EEEEEE",
  },
}
```

### CSS Variables

**Location:** `src/styles/variables.css`

CSS custom properties automatically update based on theme:

```css
:root {
  --color-brand-primary: #386851;
  --color-success: #10b981;
  --color-text-primary: #212121;
  --color-bg-primary: #ffffff;
}

[data-theme="dark"] {
  --color-brand-primary: #4a7a63;
  --color-success: #22c55e;
  --color-text-primary: #f5f5f5;
  --color-bg-primary: #121212;
}
```

---

## Implementation Patterns

### Pattern 1: Standard Tailwind Dark Mode

#### Most Common - Recommended Approach

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 className="text-gray-800 dark:text-gray-100">Title</h1>
  <p className="text-gray-600 dark:text-gray-300">Content</p>
</div>
```

### Pattern 2: Utility Classes

#### For Reusable Components

```tsx
<div className="bg-primary text-primary border-primary">
  {/* Automatically applies dark mode variants */}
</div>
```

Available utility classes in `globals.css`:

- `.text-primary` → `text-gray-900 dark:text-white`
- `.text-secondary` → `text-gray-700 dark:text-gray-300`
- `.text-muted` → `text-gray-600 dark:text-gray-400`
- `.bg-primary` → `bg-white dark:bg-gray-900`
- `.bg-secondary` → `bg-gray-50 dark:bg-gray-800`
- `.bg-surface` → `bg-gray-100 dark:bg-gray-700`
- `.border-primary` → `border-gray-300 dark:border-gray-600`
- `.border-secondary` → `border-gray-200 dark:border-gray-700`

### Pattern 3: Gradient Utilities

#### Pre-configured gradient patterns

```tsx
<div className="gradient-hero-dark">{/* Auto-adjusts for dark mode */}</div>
```

Available gradient utilities:

- `.gradient-hero-dark` - Hero section gradients
- `.gradient-section-dark` - Section backgrounds
- `.gradient-text-three-color` - Brand three-color text gradient
- `.gradient-text-bronze` - Bronze accent text gradient
- `.pattern-opacity` - Background pattern opacity
- `.blob-opacity-primary` - Primary color blob opacity
- `.blob-opacity-secondary` - Secondary color blob opacity

### Pattern 4: Component-Based (CVA)

#### For Design System Components

Using class-variance-authority (CVA):

```tsx
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      primary:
        "border-brand-primary bg-white dark:bg-gray-900 text-brand-primary dark:text-bronze-400",
    },
  },
});
```

---

## Component Guidelines

### Buttons

**Base Components:**

- Use `Button` component from `@/components/ui/base/button`
- Variants: `primary`, `secondary`, `outline`, `neutral`, `ghost`, `link`
- All variants include dark mode support

```tsx
<Button variant="primary">Click Me</Button>
<Button variant="secondary">Secondary</Button>
```

### Cards

**Base Components:**

- Use `Card`, `CardHeader`, `CardTitle`, `CardContent` from `@/components/ui/base/card`
- Automatic dark mode with gray-800 background and white text

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Forms

**Input Components:**

- Use `Input` and `Textarea` from `@/components/ui/forms/Input`
- Full dark mode support with proper focus states

```tsx
<Input label="Name" error={errors.name} helperText="Enter your full name" />
```

### Navigation

**Theme Toggle:**

```tsx
import { ThemeToggle } from "@/components/ui/layout/ThemeToggle";

// Compact mode (mobile/header)
<ThemeToggle compact size="sm" />

// Full mode with all options
<ThemeToggle showLabel size="lg" />
```

---

## Testing & Validation

### Manual Testing Checklist

**Visual Testing:**

- [ ] Test all pages in light mode
- [ ] Test all pages in dark mode
- [ ] Verify smooth transitions between modes
- [ ] Check all interactive elements (buttons, forms, links)
- [ ] Validate gradients and overlays
- [ ] Ensure icons are visible in both modes

**Accessibility Testing:**

- [ ] Verify contrast ratios (WCAG AA minimum)
- [ ] Test focus indicators in both modes
- [ ] Check screen reader announcements
- [ ] Validate color-blind friendly palette

**Component Testing:**

- [ ] All button variants
- [ ] All card variations
- [ ] Form inputs and validation states
- [ ] Navigation elements
- [ ] Modal/dialog components
- [ ] Toast/alert notifications

### Contrast Ratios

Per WCAG 2.1 guidelines:

**Light Mode:**

- Text on white: Minimum 4.5:1 (AA)
- Large text: Minimum 3:1
- Primary button: 7:1 (AAA)

**Dark Mode:**

- Text on dark: Minimum 4.5:1 (AA)
- Avoid pure black (#000000)
- Use #121212 for backgrounds

### Browser Testing

Test in:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

---

## Common Patterns

### Hero Sections

```tsx
<section className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark">
  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/60 to-gray-900/80">
    {/* Readability overlay */}
  </div>
  <div className="relative z-10 text-white">{/* Content */}</div>
</section>
```

### Section Backgrounds

```tsx
{/* Alternating sections */}
<section className="bg-white dark:bg-gray-900 py-20">
  {/* Content */}
</section>

<section className="bg-gray-50 dark:bg-gray-800 py-20">
  {/* Content */}
</section>
```

### Text Gradients

```tsx
<h1 className="bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent">
  Three-Color Gradient
</h1>

<h1 className="bg-gradient-to-r from-brand-primary via-bronze-600 to-brand-secondary bg-clip-text text-transparent">
  Bronze Accent Gradient
</h1>
```

### Background Patterns

```tsx
<div className="relative">
  {/* Diagonal stripes */}
  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `repeating-linear-gradient(
          45deg,
          #386851 0px,
          #386851 2px,
          transparent 2px,
          transparent 60px
        )`,
      }}
    />
  </div>

  {/* Content */}
</div>
```

### Brand Color Blobs

```tsx
<div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full" />

<div className="absolute bottom-20 left-[10%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full" />
```

### Icon Containers

```tsx
{
  /* Primary variant */
}
<div className="relative p-4 rounded-2xl">
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl" />
  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker rounded-xl p-4">
    <MaterialIcon icon="check" className="text-white" />
  </div>
</div>;

{
  /* Secondary/Bronze variant */
}
<div className="relative p-4 rounded-2xl">
  <div className="absolute -inset-2 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl" />
  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 rounded-xl p-4">
    <MaterialIcon icon="star" className="text-white" />
  </div>
</div>;
```

### Cards with Hover Effects

```tsx
<Card className="group transition-all duration-300 hover:shadow-2xl dark:hover:shadow-gray-600/50 hover:-translate-y-2">
  <CardHeader>
    <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 mx-auto mb-6 rounded-full w-20 h-20">
      <MaterialIcon
        icon="build"
        size="xl"
        className="text-gray-700 dark:text-gray-300"
      />
    </div>
    <CardTitle className="dark:text-white">Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-gray-600 dark:text-gray-300">Content</p>
  </CardContent>
</Card>
```

---

## Best Practices

### DO ✅

1. **Always provide dark mode variants**

   ```tsx
   <div className="bg-white dark:bg-gray-900">
   ```

2. **Use semantic color tokens**

   ```tsx
   <div className="text-primary bg-secondary border-primary">
   ```

3. **Test in both modes during development**

4. **Use utility classes for consistency**

   ```tsx
   <p className="text-secondary">
   ```

5. **Leverage gradient utilities**

   ```tsx
   <div className="gradient-hero-dark">
   ```

6. **Maintain WCAG AA contrast ratios**

7. **Use CSS variables when appropriate**

   ```css
   color: var(--color-text-primary);
   ```

### DON'T ❌

1. **Don't use hardcoded colors without dark variants**

   ```tsx
   {/* Bad */}
   <div className="bg-white text-gray-900">

   {/* Good */}
   <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
   ```

2. **Don't forget focus states**

   ```tsx
   {/* Bad */}
   <button className="bg-brand-primary">

   {/* Good */}
   <button className="bg-brand-primary focus:ring-2 focus:ring-brand-primary">
   ```

3. **Don't use pure black (#000000) in dark mode**

   ```tsx
   {/* Bad */}
   <div className="dark:bg-black">

   {/* Good */}
   <div className="dark:bg-gray-900">
   ```

4. **Don't skip opacity adjustments for overlays**

   ```tsx
   {/* Bad */}
   <div className="opacity-[0.03]">

   {/* Good */}
   <div className="opacity-[0.03] dark:opacity-[0.05]">
   ```

5. **Don't ignore gradient dark mode variants**

   ```tsx
   {/* Bad */}
   <div className="bg-gradient-to-br from-brand-primary to-brand-secondary">

   {/* Good */}
   <div className="bg-gradient-to-br from-brand-primary to-brand-secondary dark:from-brand-primary-dark dark:to-brand-secondary-dark">
   ```

---

## Troubleshooting

### Issue: Theme not persisting

**Solution:** Check localStorage key in ThemeProvider

```tsx
<ThemeProvider storageKey="mh-construction-theme">
```

### Issue: Flashing on page load

**Solution:** Ensure ThemeProvider wraps entire app in layout.tsx

```tsx
<body>
  <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
</body>
```

### Issue: Components not updating

**Solution:** Verify `.dark` class is on root element

```tsx
// In ThemeContext.tsx
useEffect(() => {
  const root = window.document.documentElement;
  root.classList.remove("dark");
  if (theme === "dark") {
    root.classList.add("dark");
  }
}, [theme]);
```

### Issue: Poor contrast in dark mode

**Solution:** Use proper gray scale

- Backgrounds: `gray-900` (#121212) not `black`
- Text: `white` (#FFFFFF) not `gray-100`
- Secondary text: `gray-300` not `gray-500`

---

## Resources

### Internal Documentation

- [Color System](../branding/standards/color-system.md)
- [Typography](../branding/standards/typography.md)
- [Component Standards](../branding/standards/component-standards.md)
- [Brand Overview](../branding/strategy/brand-overview.md)

### External Resources

- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design Dark Theme](https://material.io/design/color/dark-theme.html)

---

## Version History

### v1.0.0 - December 25, 2025

- Initial dark mode implementation
- Added semantic color tokens
- Enhanced Tailwind configuration
- Created utility classes
- Updated all base components
- Added gradient utilities
- Comprehensive documentation

---

**MH Construction** - Veteran-Owned Excellence Since 2010
