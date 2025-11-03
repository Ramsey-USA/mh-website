# Typography Examples

This document provides concrete examples of the MH Construction typography
standards in action.

## ✅ Correct Typography Patterns

### Example 1: Standard Section Header

```tsx
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

### Example 2: Card Component Typography

```tsx
<div className="group relative bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl p-8 border border-gray-200 dark:border-gray-700 rounded-3xl hover:scale-105 transition-all duration-300">
  <h3 className="mb-4 font-bold text-gray-900 dark:text-gray-100 group-hover:text-brand-primary text-xl md:text-2xl transition-colors">
    Construction Management
  </h3>
  <p className="flex-grow mb-6 text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed">
    Full Construction Management (CM) services throughout the
    Tri-Cities. We minimize "on-the-fly" decisions through
    meticulous planning.
  </p>
</div>
```text

### Example 3: Flip Card Typography

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
      Your vision combined with our veteran-led expertise
      creates extraordinary results.
    </p>
  </div>
</div>
```text

## ❌ Incorrect Typography Patterns

### Example 1: Inconsistent Header Sizing

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

- Missing responsive sizing for largest breakpoint
- Inconsistent margin values
- Missing gradient styling on emphasis text
- Missing proper tracking classes

### Example 2: Inconsistent Description Text

```tsx
<!-- DON'T DO THIS -->
<p className="mx-auto max-w-2xl font-light text-white/90 text-base md:text-lg">
  Experience the collaborative approach where veteran values and
  genuine partnership create extraordinary results.
</p>
```text

**Problems:**

- Wrong max-width (should be `max-w-5xl`)
- Missing largest responsive text size
- Missing `tracking-wide` class
- No branded emphasis spans

### Example 3: Card Typography Issues

```tsx
<!-- DON'T DO THIS -->
<h3 className="font-black text-white text-base lg:text-lg">
  We Work With You
</h3>
<p className="text-white/90 text-xs leading-relaxed">
  More than contractors - we're your construction partners.
</p>
```text

**Problems:**

- Text too small for proper hierarchy
- Missing responsive breakpoints
- Missing `tracking-tight` for headers

## 🔧 Migration Checklist

When updating existing components to follow the new standards:

1. **Header Structure**
   - [ ] Use two-line pattern with subtitle and main title
   - [ ] Apply full responsive sizing scale
   - [ ] Add gradient text to main title
   - [ ] Include proper tracking and leading classes

2. **Description Text**
   - [ ] Use `max-w-5xl` for content width
   - [ ] Apply `text-lg md:text-xl lg:text-2xl` sizing
   - [ ] Add branded emphasis spans where appropriate
   - [ ] Include `leading-relaxed tracking-wide`

3. **Component Typography**
   - [ ] Update card titles to `text-xl md:text-2xl`
   - [ ] Update card text to `text-sm md:text-base`
   - [ ] Ensure proper margin and spacing values
   - [ ] Add hover state typography changes

4. **Accessibility**
   - [ ] Maintain proper heading hierarchy
   - [ ] Ensure adequate color contrast
   - [ ] Include dark mode styles
   - [ ] Test with screen readers

## 📱 Responsive Behavior

### Mobile (< 640px)

- Main titles: `text-2xl`
- Subtitles: `text-xl`
- Body text: `text-lg`
- Card titles: `text-xl`

### Tablet (640px - 1024px)

- Main titles: `text-3xl`
- Subtitles: `text-2xl`
- Body text: `text-xl`
- Card titles: `text-xl`

### Desktop (1024px+)

- Main titles: `text-4xl lg:text-5xl`
- Subtitles: `text-3xl lg:text-4xl`
- Body text: `text-xl lg:text-2xl`
- Card titles: `text-2xl`

## 🎨 Brand Integration

### When to Use Gradient Text

Use the brand gradient pattern for:

- Main section titles (second line)
- Key branded phrases in descriptions
- Important call-to-action text
- Emphasis on company values

### Color Combinations

```tsx
{/* Light mode */}
<span className="font-medium text-gray-800 dark:text-gray-200">
  {mediumEmphasis}
</span>

{/* Brand gradient */}
<span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-semibold text-transparent">
  {brandedEmphasis}
</span>

{/* Subtitle text */}
<span className="font-semibold text-gray-700 dark:text-gray-300">
  {subtitleText}
</span>
```text
