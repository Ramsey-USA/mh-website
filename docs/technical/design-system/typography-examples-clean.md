# Typography Examples

This document provides concrete examples of the MH Construction typography
standards in action.

For complete typography standards, see the
[Design System Documentation](./design-system.md).

## ✅ Standard Section Header Pattern

All sections should follow this consistent pattern:

``````markdown
# Typography Examples

This document provides concrete examples of the MH Construction typography standards in action.

For complete typography standards, see the [Design System Documentation](./design-system.md).

---

## ✅ Correct Typography Patterns

### Standard Section Header Pattern

All sections should follow this consistent pattern:

````tsx
<section className="relative bg-white dark:bg-gray-900 py-12 lg:py-16">
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <FadeInWhenVisible className="mb-10 lg:mb-12 text-center">
      <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
        <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
          Revolutionary Features of
        </span>
        <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
          Construction Management
        </span>
      </h2>

      <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
        Where{" "}
        <span className="font-medium text-gray-800 dark:text-gray-200">
          collaborative partnership meets cutting-edge AI
        </span>
        . Our veteran-led team works with you to combine decades of
        service experience with revolutionary technology that{" "}
        <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
          serves your vision
        </span>
        .
      </p>
    </FadeInWhenVisible>
  </div>
</section>
```text

### Card Component Typography

```tsx
<div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
  <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-xl md:text-2xl transition-colors">
    Construction Management
  </h3>
  <p className="flex-grow mb-6 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
    Full Construction Management (CM) services throughout the Tri-Cities.
    We minimize "on-the-fly" decisions through meticulous planning.
  </p>
</div>
```text

### Flip Card Typography

```tsx
{/* Front of Card */}
<div className="absolute inset-0 backface-hidden">
  <div className="flex flex-col justify-center items-center bg-white/10 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
    <h3 className="font-black text-white text-xl md:text-2xl tracking-tight">
      We Work With You
    </h3>
    <p className="mt-1 text-white/70 text-sm">
      Hover to learn more
    </p>
  </div>
</div>

{/* Back of Card */}
<div className="absolute inset-0 rotate-y-180 backface-hidden">
  <div className="flex flex-col justify-center bg-brand-primary/90 backdrop-blur-sm p-4 border border-white/20 rounded-xl h-full text-center">
    <h3 className="mb-3 font-black text-white text-lg md:text-xl">
      True Collaboration
    </h3>
    <p className="text-white/90 text-sm md:text-base leading-relaxed">
      More than contractors - we're your construction partners.
      Your vision combined with our veteran-led expertise creates extraordinary results.
    </p>
  </div>
</div>
```text

### Branded Emphasis Spans

```tsx
{/* Medium emphasis */}
<span className="font-medium text-gray-800 dark:text-gray-200">
  {emphasizedText}
</span>

{/* Strong brand emphasis with gradient */}
<span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
  {brandedText}
</span>

{/* Subtitle text */}
<span className="font-semibold text-gray-700 dark:text-gray-300">
  {subtitleText}
</span>
```text

---

## ❌ Incorrect Typography Patterns

### Inconsistent Header Sizing

```tsx
<!-- DON'T DO THIS -->
<h2 className="mb-4 font-black text-white text-2xl sm:text-3xl md:text-4xl">
  <span className="block mb-2 font-semibold text-white/80 text-lg sm:text-xl md:text-2xl">
    The MH Partnership
  </span>
  <span className="block text-transparent">
    Difference
  </span>
</h2>
```text

**Problems:**

- Missing responsive sizing for largest breakpoint (`lg:text-5xl`)
- Inconsistent margin values (should be `mb-6` for heading, `mb-3` for span)
- Missing gradient styling on emphasis text
- Missing proper tracking classes (`tracking-tighter`, `tracking-tight`)

### Inconsistent Description Text

```tsx
<!-- DON'T DO THIS -->
<p className="mx-auto max-w-2xl font-light text-white/90 text-base md:text-lg">
  Experience the collaborative approach where veteran values create extraordinary results.
</p>
```text

**Problems:**

- Wrong max-width (should be `max-w-5xl` for proper readability)
- Missing largest responsive text size (`lg:text-2xl`)
- Missing `tracking-wide` and `leading-relaxed` classes
- No branded emphasis spans for key phrases

---

## 📱 Responsive Typography Scale

| Breakpoint | Main Title | Subtitle | Body Text | Card Title | Card Text |
|------------|------------|----------|-----------|------------|-----------|
| Mobile (< 640px) | `text-2xl` | `text-xl` | `text-lg` | `text-xl` | `text-sm` |
| Tablet (640-1024px) | `text-3xl` | `text-2xl` | `text-xl` | `text-xl` | `text-sm` |
| Desktop (1024px+) | `text-4xl lg:text-5xl` | `text-3xl lg:text-4xl` | `text-xl lg:text-2xl` | `text-2xl` | `text-base` |

---

## 🔧 Migration Checklist

When updating existing components to follow typography standards:

### Header Structure

- [ ] Use two-line pattern with subtitle and main title
- [ ] Apply full responsive sizing scale (`text-2xl sm:text-3xl md:text-4xl lg:text-5xl`)
- [ ] Add gradient text to main title (`bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary`)
- [ ] Include proper tracking (`tracking-tighter` for headers, `tracking-tight` for subtitles)

### Description Text

- [ ] Use `max-w-5xl` for optimal content width
- [ ] Apply full responsive sizing (`text-lg md:text-xl lg:text-2xl`)
- [ ] Add branded emphasis spans for key phrases
- [ ] Include `leading-relaxed tracking-wide` for readability

### Component Typography

- [ ] Update card titles to `text-xl md:text-2xl`
- [ ] Update card text to `text-sm md:text-base`
- [ ] Ensure proper margin and spacing values
- [ ] Add hover state typography changes where appropriate

### Accessibility

- [ ] Maintain proper heading hierarchy (h1 → h2 → h3)
- [ ] Ensure adequate color contrast (WCAG AA minimum)
- [ ] Include dark mode styles for all text
- [ ] Test with screen readers

---

## 🎨 Brand Integration Guidelines

### When to Use Gradient Text

Apply the brand gradient pattern for:

- Main section titles (second line of two-line headers)
- Key branded phrases within descriptions
- Important call-to-action text
- Emphasis on company values and differentiators

### Color Combinations Reference

```tsx
{/* Light mode emphasis */}
<span className="font-medium text-gray-800 dark:text-gray-200">
  {mediumEmphasis}
</span>

{/* Brand gradient emphasis */}
<span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
  {brandedEmphasis}
</span>

{/* Subtitle styling */}
<span className="font-semibold text-gray-700 dark:text-gray-300">
  {subtitleText}
</span>
```text

---

## Related Documentation

- [Component Library](../../components/ui/mh-ui-guide.md) - UI component examples
- [Design System](./design-system.md) - Complete design system reference

---

**Last Updated:** November 8, 2025
**Status:** ✅ Current

- [Component Library](../../components/ui/mh-ui-guide.md)
- [Design System Hub](./design-system-index.md)
````

`````text

## ✅ Card Component Typography

```tsx
<h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 text-xl md:text-2xl">
  {cardTitle}
</h3>
<p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
  {cardDescription}
</p>
```text

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
```text

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
````
`````
``````
