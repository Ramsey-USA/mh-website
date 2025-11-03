# Typography Examples

This document provides concrete examples of the MH Construction typography
standards in action.

For complete typography standards, see the
[Design System Documentation](./design-system.md).

## ✅ Standard Section Header Pattern

All sections should follow this consistent pattern:

```tsx
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
    {subtitle}
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
    {mainTitle}
  </span>
</h2>

<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
  {descriptionWithBrandedEmphasis}
</p>
```

## ✅ Card Component Typography

```tsx
<h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-xl md:text-2xl">
  {cardTitle}
</h3>
<p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
  {cardDescription}
</p>
```

## ✅ Branded Emphasis Spans

```tsx
{/* Medium emphasis */}
<span className="font-medium text-gray-800 dark:text-gray-200">
  {emphasizedText}
</span>

{/* Strong brand emphasis */}
<span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
  {brandedText}
</span>
```

## 📱 Responsive Typography Scale

| Breakpoint | Main Title | Subtitle | Body Text | Card Title |
|------------|------------|----------|-----------|------------|
| Mobile | `text-2xl` | `text-xl` | `text-lg` | `text-xl` |
| Tablet | `text-3xl` | `text-2xl` | `text-xl` | `text-xl` |
| Desktop | `text-4xl lg:text-5xl` | `text-3xl lg:text-4xl` | `text-xl lg:text-2xl` | `text-2xl` |

## 🔧 Migration Guidelines

When updating existing components:

1. Replace inconsistent header sizing with the standard pattern
2. Update description text to use `max-w-5xl` and proper responsive sizing
3. Add branded emphasis spans where appropriate
4. Ensure proper tracking and leading classes are applied
5. Test responsive behavior across all breakpoints

## 📚 Related Resources

- [Complete Design System](./design-system.md)
- [Component Library](/src/components/ui/mh-ui-guide.md)
- [Contributing Guidelines](/contributing.md)
