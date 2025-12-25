# Dark Mode Quick Reference

## Quick guide for implementing dark mode in MH Construction website

## 🎨 Color Classes

### Text Colors

```tsx
// Primary text (headings, main content)
className = "text-gray-900 dark:text-white";

// Secondary text (subheadings, descriptions)
className = "text-gray-700 dark:text-gray-300";

// Muted text (captions, metadata)
className = "text-gray-600 dark:text-gray-400";

// Or use utility classes:
className = "text-primary"; // text-gray-900 dark:text-white
className = "text-secondary"; // text-gray-700 dark:text-gray-300
className = "text-muted"; // text-gray-600 dark:text-gray-400
```

### Background Colors

```tsx
// Primary background (main content areas)
className = "bg-white dark:bg-gray-900";

// Secondary background (alternating sections)
className = "bg-gray-50 dark:bg-gray-800";

// Surface background (cards, elevated elements)
className = "bg-gray-100 dark:bg-gray-700";

// Or use utility classes:
className = "bg-primary"; // bg-white dark:bg-gray-900
className = "bg-secondary"; // bg-gray-50 dark:bg-gray-800
className = "bg-surface"; // bg-gray-100 dark:bg-gray-700
```

### Border Colors

```tsx
// Primary borders (main dividers)
className = "border-gray-300 dark:border-gray-600";

// Secondary borders (subtle separators)
className = "border-gray-200 dark:border-gray-700";

// Or use utility classes:
className = "border-primary"; // border-gray-300 dark:border-gray-600
className = "border-secondary"; // border-gray-200 dark:border-gray-700
```

### Brand Colors

```tsx
// Hunter Green (Primary)
className = "text-brand-primary dark:text-brand-primary-light";
className = "bg-brand-primary dark:bg-brand-primary-light";

// Leather Tan (Secondary)
className = "text-brand-secondary dark:text-brand-secondary-light";
className = "bg-brand-secondary dark:bg-brand-secondary-light";

// Bronze (Veteran badges)
className = "text-bronze-600 dark:text-bronze-400";
className = "bg-bronze-600 dark:bg-bronze-400";
```

## 🎯 Common Patterns

### Section Container

```tsx
<section className="bg-white dark:bg-gray-900 py-20">{/* Content */}</section>
```

### Card Component

```tsx
<Card className="dark:bg-gray-800 dark:hover:shadow-gray-600/50">
  <CardTitle className="dark:text-white">Title</CardTitle>
  <CardContent>
    <p className="text-gray-700 dark:text-gray-300">Content</p>
  </CardContent>
</Card>
```

### Button (Primary)

```tsx
<Button variant="primary">{/* Automatically handles dark mode */}</Button>
```

### Input Field

```tsx
<Input
  className="dark:bg-gray-800 dark:border-gray-600 dark:text-white"
  label="Name"
/>
```

### Icon Container

```tsx
<div className="flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-full w-16 h-16">
  <MaterialIcon icon="check" className="text-gray-700 dark:text-gray-300" />
</div>
```

## 📐 Gradients

### Text Gradients

```tsx
// Three-color brand gradient (most common)
className =
  "bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent";

// Bronze accent gradient (premium feel)
className =
  "bg-gradient-to-r from-brand-primary via-bronze-600 to-brand-secondary bg-clip-text text-transparent";

// Or use utilities:
className = "gradient-text-three-color";
className = "gradient-text-bronze";
```

### Background Gradients

```tsx
// Hero section
className =
  "bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary dark:from-brand-primary-dark dark:via-gray-900 dark:to-brand-secondary-dark";

// Section background
className =
  "bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800";

// Or use utilities:
className = "gradient-hero-dark";
className = "gradient-section-dark";
```

## 🌟 Special Effects

### Background Blobs

```tsx
<div className="absolute w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full" />;

// Or use utility:
className = "blob-opacity-primary";
className = "blob-opacity-secondary";
```

### Background Patterns

```tsx
<div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `repeating-linear-gradient(45deg, #386851 0px, #386851 2px, transparent 2px, transparent 60px)`,
    }}
  />
</div>;

// Or use utility:
className = "pattern-opacity";
```

### Hover Effects

```tsx
// Card hover
className = "hover:shadow-2xl dark:hover:shadow-gray-600/50";

// Border hover
className = "hover:border-brand-primary dark:hover:border-brand-primary-light";

// Background hover
className = "hover:bg-gray-100 dark:hover:bg-gray-800";
```

## 🔧 Semantic Colors

### Success

```tsx
className = "text-green-500 dark:text-green-400";
className = "bg-green-500 dark:bg-green-400";
```

### Warning

```tsx
className = "text-amber-500 dark:text-amber-400";
className = "bg-amber-500 dark:bg-amber-400";
```

### Error

```tsx
className = "text-red-500 dark:text-red-400";
className = "bg-red-500 dark:bg-red-400";
```

### Info

```tsx
className = "text-blue-500 dark:text-blue-400";
className = "bg-blue-500 dark:bg-blue-400";
```

## 💡 Tips

1. **Always provide dark mode variants** when using colors
2. **Test both modes** during development
3. **Use utility classes** for consistency
4. **Check contrast ratios** for accessibility
5. **Avoid pure black** - use gray-900 (#121212) instead
6. **Remember opacity adjustments** for overlays and patterns

## 📦 Pre-built Components

All components in `src/components/ui/base/` have dark mode:

- `Button` - All variants
- `Card` - Full family
- `Alert` - Default and destructive
- `Input` / `Textarea` - Form fields
- `Badge` - All variants
- `Tabs` - Full component

## 🎛️ Theme Toggle

```tsx
import { ThemeToggle } from "@/components/ui/layout/ThemeToggle";

// Compact (mobile/header)
<ThemeToggle compact size="sm" />

// Full (settings page)
<ThemeToggle showLabel size="lg" />
```

## 📚 Full Documentation

See [Dark Mode Implementation Guide](./dark-mode-implementation-guide.md) for complete details.

---

**MH Construction** - Veteran-Owned Excellence Since 2010
