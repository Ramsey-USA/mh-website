# MH Construction Design System

This document defines the design system standards for the MH Construction
website, ensuring consistent branding and user experience across all pages
and components.

## 🎨 Brand Identity

### Brand Colors

- **Primary**: `#386851` (Hunter Green) - `brand-primary`
- **Secondary**: `#BD9264` (Leather Tan) - `brand-secondary`
- **Accent**: `#2F5D45` (Forest Green) - `brand-accent`

### CSS Variables Usage

````css
/* Use these CSS variables throughout the codebase */
var(--brand-primary)
var(--brand-secondary)
var(--brand-accent)
```text

## 📝 Typography System

### Section Header Standard

All major sections should follow this consistent typography pattern:

#### Main Section Headers

```tsx
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
    {subtitle}
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
    {mainTitle}
  </span>
</h2>
```text

#### Section Description Text

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
  {description with branded emphasis spans}
</p>
```text

#### Typography Scale

| Element | Classes | Usage |
|---------|---------|-------|
| **Main Title** | `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl` | Primary section headers |
| **Subtitle** | `text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl` | Section subtitles |
| **Body Large** | `text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl` | Section descriptions |
| **Card Title** | `text-xl xs:text-2xl sm:text-3xl md:text-4xl` | Component titles |
| **Card Subtitle** | `text-lg xs:text-xl sm:text-2xl md:text-3xl` | Component subtitles |
| **Body Text** | `text-base xs:text-lg sm:text-xl md:text-xl` | Standard body content |

### Typography Rules

1. **Consistency**: All sections must follow the established header pattern
2. **Responsive**: Use responsive text sizing with mobile-first approach
3. **Contrast**: Maintain proper contrast ratios for accessibility
4. **Gradient Text**: Use brand gradient for emphasis on main titles
5. **Tracking**: Use `tracking-tighter` for headers, `tracking-wide` for body text
6. **Leading**: Use `leading-tight` for headers, `leading-relaxed` for body text

### Emphasis Patterns

#### Branded Emphasis Spans

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

## 🎯 Component Standards

### Spacing & Layout

- **Section Padding**: `py-12 lg:py-16`
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Content Width**: `max-w-5xl` for text content
- **Grid Gaps**: `gap-6 lg:gap-8` for component grids

### Interactive Elements

#### Buttons

Follow the established button component with proper variants:

- `variant="primary"` - Brand primary background
- `variant="secondary"` - Brand secondary background
- `variant="outline"` - Transparent with brand border

#### Cards

- Use `rounded-3xl` for consistent corner radius
- Include hover states with `hover:shadow-2xl`
- Implement proper animation transitions

## � Mobile Optimization Standards

### Responsive Breakpoint System

MH Construction uses a mobile-first approach with standardized breakpoints:

| Breakpoint | Min Width | Max Width | Usage |
|------------|-----------|-----------|-------|
| **xs** | 475px | - | Large phones |
| **mobile-sm** | - | 374px | Very small phones |
| **mobile** | - | 639px | All mobile devices |
| **sm** | 640px | - | Small tablets+ |
| **md** | 768px | - | Tablets+ |
| **lg** | 1024px | - | Laptops+ |
| **xl** | 1280px | - | Desktops+ |
| **2xl** | 1536px | - | Large screens+ |

### Mobile Typography Standards

#### Responsive Font Scaling

All text must follow this progressive scaling pattern:

```tsx
// Main Section Headers
className="text-2xl xs:text-3xl sm:text-3xl md:text-4xl lg:text-5xl"

// Section Subtitles
className="text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl"

// Large Body Text
className="text-lg xs:text-lg md:text-xl lg:text-2xl"

// Card Titles
className="text-lg xs:text-xl sm:text-xl md:text-2xl"

// Standard Body Text
className="text-sm xs:text-sm sm:text-base md:text-base"

// Small Text
className="text-xs xs:text-xs sm:text-sm"
```text

#### Typography Rules for Mobile

1. **Minimum Sizes**: Never go below `text-xs` (12px) for readability
2. **Progressive Scaling**: Use `xs:` breakpoint for 475px+ devices
3. **Line Height**: Use `leading-tight` for headers, `leading-relaxed` for body
4. **Text Overflow**: Use `break-all` for email addresses, `break-words` for long text

### Touch Optimization Standards

#### Touch Target Requirements

- **Minimum Size**: 44px × 44px for all interactive elements
- **Recommended Size**: 48px × 48px for primary actions
- **Spacing**: Minimum 8px between touch targets

```tsx
// Button Touch Targets
className="p-2.5 xs:p-3 sm:p-3 min-h-[44px] min-w-[44px] touch-manipulation"

// Link Touch Targets
className="px-3 xs:px-4 py-2.5 xs:py-3 touch-manipulation"

// Icon Button Touch Targets
className="p-2 xs:p-2.5 sm:p-3 touch-manipulation"
```text

#### Touch Manipulation Class

All interactive elements must include `touch-manipulation` for better responsiveness:

```tsx
className="transition-all duration-300 hover:scale-105 touch-manipulation"
```text

### Mobile Layout Standards

#### Responsive Spacing

```tsx
// Section Padding
className="pt-6 xs:pt-8 sm:pt-10 pb-4 xs:pb-5 sm:pb-6"

// Container Padding
className="px-3 xs:px-4 sm:px-6 lg:px-8"

// Element Spacing
className="space-y-2 xs:space-y-3 sm:space-y-4"

// Grid Gaps
className="gap-2 xs:gap-3 sm:gap-4 lg:gap-6"
```text

#### Grid Responsive Patterns

```tsx
// Navigation Grids
className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-3"

// Card Grids
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6"

// Footer Columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6"
```text

### Component Mobile Standards

#### Header/Navigation

```tsx
// Header Height Scaling
className="h-16 xs:h-18 sm:h-20 md:h-24"

// Logo Responsive Sizing
className="h-[48px] xs:h-[56px] sm:h-[70px] md:h-[88px] w-auto"

// Menu Button
className="p-2 xs:p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 touch-manipulation"
```text

#### Cards & Content

```tsx
// Card Padding
className="p-4 xs:p-5 sm:p-6"

// Card Border Radius
className="rounded-lg xs:rounded-xl sm:rounded-xl"

// Image Responsive
className="w-full h-auto rounded-lg xs:rounded-xl"
```text

#### Forms & Inputs

```tsx
// Input Fields
className="px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base rounded-lg touch-manipulation"

// Buttons
className="px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 text-sm xs:text-base touch-manipulation"
```text

### Mobile Performance Standards

#### CSS Classes for Mobile Performance

```css
/* Add to globals.css */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.gpu-acceleration {
  transform: translateZ(0);
  will-change: transform;
  backfaceVisibility: hidden;
}

.scroll-smooth {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
```text

#### Image Optimization

- Use `next/image` with responsive sizing
- Implement `priority` for above-fold images
- Use `loading="lazy"` for below-fold images
- Define explicit `width` and `height` attributes

```tsx
<Image
  src="/images/example.jpg"
  alt="Description"
  width={400}
  height={300}
  className="w-full h-auto rounded-lg xs:rounded-xl"
  priority={isAboveFold}
  loading={isAboveFold ? "eager" : "lazy"}
/>
```text

### Mobile Testing Requirements

#### Device Testing Matrix

| Device Category | Screen Sizes | Testing Requirements |
|----------------|--------------|---------------------|
| **Small Phones** | 320px - 374px | Touch targets, text readability |
| **Large Phones** | 375px - 474px | Layout optimization, navigation |
| **Small Tablets** | 475px - 639px | Content flow, touch optimization |
| **Tablets** | 640px - 1023px | Grid layouts, spacing |

#### Quality Checklist for Mobile

- [ ] All text is readable at minimum sizes (12px+)
- [ ] Touch targets meet 44px minimum requirement
- [ ] Content flows properly without horizontal scroll
- [ ] Images scale responsively without distortion
- [ ] Forms are usable with touch keyboards
- [ ] Navigation is accessible on small screens
- [ ] Loading states work on slow connections
- [ ] Animations perform smoothly on mobile devices

## �🔍 Implementation Guidelines

### 1. Section Structure Template

```tsx
<section className="relative bg-{background} py-6 xs:py-8 sm:py-10 lg:py-16 touch-manipulation">
  <div className="relative mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
    <FadeInWhenVisible className="mb-6 xs:mb-8 sm:mb-10 lg:mb-12 text-center">
      {/* Standard Header Pattern - Mobile Optimized */}
      <h2 className="mb-4 xs:mb-5 sm:mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
        <span className="block mb-2 xs:mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
          {subtitle}
        </span>
        <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
          {mainTitle}
        </span>
      </h2>

      {/* Standard Description Pattern - Mobile Optimized */}
      <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base xs:text-lg sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
        {description}
      </p>
    </FadeInWhenVisible>

    {/* Section Content */}
  </div>
</section>
```text

### 2. Quality Checklist

When implementing new sections or components:

- [ ] Typography follows the established responsive scale
- [ ] Headers use the two-line pattern with gradient
- [ ] Text content uses proper mobile-first responsive sizing
- [ ] Emphasis spans follow brand patterns
- [ ] Spacing matches mobile-responsive section standards
- [ ] Touch targets meet 44px minimum requirement
- [ ] `touch-manipulation` class is applied to interactive elements
- [ ] Content flows properly on 320px+ screens
- [ ] Dark mode styles are included
- [ ] Accessibility attributes are present
- [ ] Images use responsive sizing with proper aspect ratios

## 📚 Related Documentation

- [Mobile Optimization Guide](./mobile-optimization-guide.md) - Comprehensive mobile standards
- [Mobile Quick Reference](./mobile-quick-reference.md) - Developer quick reference
- [Typography Examples](./typography-examples-clean.md)
- [Component Library](../../components/ui/mh-ui-guide.md)
- [Consistency Guide](../../development/consistency-guide.md) - Complete implementation standards
- [Brand Guidelines](../../branding/branding-index.md) - Modular brand docs
- [Branding Documentation](../../branding/branding-index.md) - Modular brand docs

## 🔄 Updates & Maintenance

This design system should be updated when:

- New typography patterns are established
- Brand colors or fonts change
- Component standards evolve
- Accessibility requirements update

**Last Updated**: October 20, 2025
**Version**: 1.0.0
````
