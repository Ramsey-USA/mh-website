# MH Construction Mobile Optimization Guide

**Last Updated:** December 14, 2025  
**Status:** ✅ Active Standard

> 💡 **Quick Reference:** Jump to [Mobile Cheat Sheet](#-mobile-quick-reference-cheat-sheet) for copy-paste classes

This comprehensive guide establishes the mobile optimization standards for the MH Construction website, ensuring
consistent performance and user experience across all mobile devices.

## 📱 Mobile-First Philosophy

MH Construction follows a **mobile-first design approach** where:

1. **Design starts with mobile** (320px minimum width)
2. **Progressive enhancement** for larger screens
3. **Touch-first interactions** with keyboard/mouse as secondary
4. **Performance optimization** for mobile networks and devices

## 🎯 Core Mobile Standards

### Device Support Matrix

| Category          | Screen Width   | Devices                          | Priority | Standards                            |
| ----------------- | -------------- | -------------------------------- | -------- | ------------------------------------ |
| **Small Phones**  | 320px - 374px  | iPhone SE, small Android         | High     | Core functionality, readable text    |
| **Large Phones**  | 375px - 474px  | iPhone 12/13/14, Galaxy S series | Critical | Full feature access, optimized UX    |
| **Small Tablets** | 475px - 639px  | iPad Mini, small tablets         | High     | Enhanced layouts, touch optimization |
| **Tablets**       | 640px - 1023px | iPad, Android tablets            | Medium   | Desktop-like features, multi-column  |

### Responsive Breakpoint Implementation

````typescript
// Tailwind Config Breakpoints (mobile-first)
screens: {
  xs: "475px",      // Large phones+
  sm: "640px",      // Small tablets+
  md: "768px",      // Tablets+
  lg: "1024px",     // Laptops+
  xl: "1280px",     // Desktops+
  "2xl": "1536px",  // Large screens+

  // Max-width breakpoints for mobile-specific styles
  "mobile-sm": { max: "374px" },  // Very small phones only
  "mobile": { max: "639px" },     // All mobile devices only
  "tablet": { min: "640px", max: "1023px" }, // Tablets only
}
```text

## 📝 Mobile Typography System

### Font Size Progression

Follow this exact progression for consistent mobile readability:

```scss
// Main Section Headers (Much larger mobile sizes for better prominence)
.header-main {
  @apply text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl;
  // 30px → 36px → 48px → 60px → 72px
}

// Section Subtitles (Larger mobile sizes)
.header-subtitle {
  @apply text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl;
  // 24px → 30px → 36px → 48px → 60px
}

// Large Body Text (descriptions - Enhanced readability)
.body-large {
  @apply text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl;
  // 18px → 20px → 24px → 30px → 36px
}

// Card/Component Titles (Larger mobile sizes)
.card-title {
  @apply text-xl xs:text-2xl sm:text-3xl md:text-4xl;
  // 20px → 24px → 30px → 36px
}

// Standard Body Text (Better mobile readability)
.body-standard {
  @apply text-base xs:text-lg sm:text-xl md:text-xl;
  // 16px → 18px → 20px → 20px
}

// Small Text (labels, captions)
.text-small {
  @apply text-sm xs:text-base sm:text-lg;
  // 14px → 16px → 18px
}
```text

### Typography Rules

1. **Minimum Size**: Never below 12px (`text-xs`) for accessibility
2. **Reading Width**: Max 65-75 characters per line for readability
3. **Line Height**: Use `leading-tight` (1.25) for headers, `leading-relaxed` (1.625) for body
4. **Letter Spacing**: `tracking-tighter` for large text, `tracking-wide` for small text

## 👆 Touch Optimization Standards

### Touch Target Requirements

```scss
// Minimum Touch Targets (WCAG AA compliance)
.touch-min {
  min-height: 44px;
  min-width: 44px;
}

// Recommended Touch Targets
.touch-recommended {
  min-height: 48px;
  min-width: 48px;
}

// Touch Target Spacing
.touch-spacing {
  margin: 8px; // Minimum 8px between touch targets
}
```text

### Touch-Optimized Components

#### Buttons

```tsx
// Primary Action Button
<button className="px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 sm:py-3 min-h-[44px] bg-brand-primary hover:bg-brand-accent text-white text-sm xs:text-base font-medium rounded-lg hover:scale-105 transition-all duration-300 touch-manipulation">
  {children}
</button>

// Icon Button
<button className="p-2 xs:p-2.5 sm:p-3 min-h-[44px] min-w-[44px] bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-300 touch-manipulation">
  <Icon size="sm" />
</button>
```text

#### Navigation Links

```tsx
<Link
  href="/page"
  className="flex items-center px-3 xs:px-4 py-2.5 xs:py-3 min-h-[44px] text-sm xs:text-base font-medium text-gray-700 hover:text-brand-primary hover:bg-gray-50 rounded-lg transition-all duration-300 touch-manipulation"
>
  {children}
</Link>
```text

#### Form Inputs

```tsx
<input
  type="text"
  className="w-full px-3 xs:px-4 py-2.5 xs:py-3 min-h-[44px] text-sm xs:text-base border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-lg transition-all duration-300 touch-manipulation"
/>
```text

## 📐 Mobile Layout Standards

### Spacing System

```scss
// Section Padding (vertical)
.section-padding {
  @apply py-6 xs:py-8 sm:py-10 lg:py-16;
  // 24px → 32px → 40px → 64px
}

// Container Padding (horizontal)
.container-padding {
  @apply px-3 xs:px-4 sm:px-6 lg:px-8;
  // 12px → 16px → 24px → 32px
}

// Content Spacing
.content-spacing {
  @apply space-y-3 xs:space-y-4 sm:space-y-5 lg:space-y-6;
  // 12px → 16px → 20px → 24px
}

// Grid Gaps
.grid-gaps {
  @apply gap-2 xs:gap-3 sm:gap-4 lg:gap-6;
  // 8px → 12px → 16px → 24px
}
```text

### Grid Systems

#### Navigation Grid

```tsx
// Mobile menu grid (2 columns)
<div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-3 max-w-xs xs:max-w-sm sm:max-w-md">
  {menuItems.map(item => (
    <NavigationItem key={item.href} {...item} />
  ))}
</div>
```text

#### Content Grids

```tsx
// Responsive card grid
<div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xs:gap-5 sm:gap-6">
  {cards.map(card => (
    <Card key={card.id} {...card} />
  ))}
</div>
```text

#### Footer Columns

```tsx
// Footer responsive columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
  <FooterColumn />
  <FooterColumn />
  <FooterColumn className="sm:col-span-2 lg:col-span-1" />
</div>
```text

## 🎨 Component Mobile Standards

### Header/Navigation

```tsx
// Responsive header
<header className="sticky top-0 z-50 h-16 xs:h-18 sm:h-20 md:h-24 bg-white/95 backdrop-blur-sm border-b border-gray-200">
  <div className="h-full mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
    <div className="flex justify-between items-center h-full">
      {/* Logo with responsive sizing */}
      <Image
        src="/logo.png"
        alt="MH Construction"
        width={132}
        height={66}
        className="h-[48px] xs:h-[56px] sm:h-[70px] md:h-[88px] w-auto"
      />

      {/* Mobile menu button */}
      <button className="p-2 xs:p-2.5 sm:p-3 rounded-lg hover:bg-gray-100 touch-manipulation lg:hidden">
        <MenuIcon size="sm" />
      </button>
    </div>
  </div>
</header>
```text

### Cards

```tsx
// Mobile-optimized card
<div className="bg-white p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation">
  <div className="mb-3 xs:mb-4">
    <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">
      {title}
    </h3>
    <p className="text-sm xs:text-sm sm:text-base text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>

  <button className="w-full px-4 py-2.5 xs:py-3 bg-brand-primary text-white text-sm xs:text-base font-medium rounded-lg hover:bg-brand-accent transition-all duration-300 touch-manipulation">
    {actionText}
  </button>
</div>
```text

### Forms

```tsx
// Mobile-friendly form
<form className="space-y-4 xs:space-y-5">
  <div>
    <label className="block text-sm xs:text-base font-medium text-gray-700 mb-2">
      {label}
    </label>
    <input
      type="text"
      className="w-full px-3 xs:px-4 py-2.5 xs:py-3 text-sm xs:text-base border border-gray-300 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 rounded-lg transition-all duration-300 touch-manipulation"
      placeholder={placeholder}
    />
  </div>

  <button
    type="submit"
    className="w-full px-6 py-3 xs:py-3.5 bg-brand-primary text-white text-sm xs:text-base font-medium rounded-lg hover:bg-brand-accent transition-all duration-300 touch-manipulation"
  >
    Submit
  </button>
</form>
```text

## ⚡ Performance Optimization

### CSS Performance Classes

Add these to your `globals.css`:

```css
/* Touch optimization */
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

/* GPU acceleration for smooth animations */
.gpu-acceleration {
  transform: translateZ(0);
  will-change: transform;
  backfaceVisibility: hidden;
}

/* Smooth scrolling for mobile */
.scroll-smooth {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

/* Prevent zoom on input focus (iOS) */
.input-no-zoom {
  font-size: 16px; /* Prevents zoom on iOS */
}

/* Safe area insets for newer phones */
.safe-area-padding {
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}
```text

### Image Optimization

```tsx
// Responsive image with proper optimization
<Image
  src="/images/example.jpg"
  alt="Description"
  width={800}
  height={600}
  className="w-full h-auto rounded-lg xs:rounded-xl"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  priority={isAboveFold}
  loading={isAboveFold ? "eager" : "lazy"}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```text

## 🧪 Testing Standards

### Mobile Testing Checklist

#### Visual Testing

- [ ] All text is readable at minimum size (12px+)
- [ ] Touch targets meet 44px minimum
- [ ] No horizontal scrolling on any screen size
- [ ] Images scale properly without distortion
- [ ] Layout doesn't break on 320px width
- [ ] Proper spacing between interactive elements

#### Interaction Testing

- [ ] All buttons/links are easily tappable
- [ ] Forms work with touch keyboards
- [ ] Navigation is accessible without precision pointing
- [ ] Scroll behavior is smooth and natural
- [ ] Animations perform smoothly (60fps)
- [ ] No accidental clicks on nearby elements

#### Performance Testing

- [ ] Page loads within 3 seconds on 3G
- [ ] Images load progressively
- [ ] No layout shift during loading
- [ ] Touch interactions respond within 100ms
- [ ] Memory usage stays reasonable during navigation

### Testing Tools

```bash
# Lighthouse mobile audit
npx lighthouse https://your-site.com --preset=mobile

# Test on multiple viewports
npx playwright test --project=mobile

# Performance monitoring
npm run test:performance
```text

## 📋 Implementation Template

### Complete Mobile-Optimized Section

```tsx
import { FadeInWhenVisible } from '@/components/animations/FadeInWhenVisible';
import { MaterialIcon } from '@/components/icons/MaterialIcon';
import Image from 'next/image';

export function MobileOptimizedSection() {
  return (
    <section className="relative bg-white py-6 xs:py-8 sm:py-10 lg:py-16 touch-manipulation">
      <div className="relative mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Mobile-optimized header */}
        <FadeInWhenVisible className="mb-6 xs:mb-8 sm:mb-10 text-center">
          <h2 className="mb-4 xs:mb-5 sm:mb-6 font-black text-gray-900 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
            <span className="block mb-2 xs:mb-3 font-semibold text-gray-700 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
              Subtitle Text
            </span>
            <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
              Main Title
            </span>
          </h2>

          <p className="mx-auto max-w-5xl font-light text-gray-600 text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed">
            Description text with proper mobile scaling and readability.
          </p>
        </FadeInWhenVisible>

        {/* Mobile-optimized content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation"
            >
              <div className="mb-3 xs:mb-4">
                <MaterialIcon
                  icon={item.icon}
                  size="md"
                  className="mb-3 text-brand-primary"
                />
                <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm xs:text-sm sm:text-base text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <button className="w-full px-4 py-2.5 xs:py-3 bg-brand-primary text-white text-sm xs:text-base font-medium rounded-lg hover:bg-brand-accent transition-all duration-300 touch-manipulation">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```text

## 📚 Related Documentation

- [Main Design System](./design-system.md)
- [Component Library](../../components/ui/mh-ui-guide.md)

---

**Last Updated: December 14, 2025
**Version**: 1.0.0
**Author**: MH Construction Development Team

This guide ensures all mobile implementations follow consistent, high-quality standards across the MH Construction website.
````

---

## 📱 Mobile Quick Reference Cheat Sheet

> **Essential mobile classes for rapid development**

### 🎯 Typography Scaling

```tsx
// Page Titles
className = "text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl";

// Section Headings
className = "text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl";

// Subsection Headings
className = "text-base xs:text-lg sm:text-xl md:text-2xl";

// Body Text
className = "text-sm sm:text-base md:text-lg";

// Small Text
className = "text-xs sm:text-sm md:text-base";
```

### 📏 Spacing Progression

```tsx
// Section Padding
className = "py-8 sm:py-12 md:py-16 lg:py-20";

// Element Gaps
className = "gap-4 sm:gap-6 md:gap-8 lg:gap-10";

// Grid Gaps
className = "gap-6 sm:gap-8 md:gap-10 lg:gap-12";
```

### 📐 Grid Layouts

```tsx
// 2-Column Responsive
className = "grid grid-cols-1 sm:grid-cols-2 gap-6";

// 3-Column Responsive
className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";

// 4-Column Responsive
className =
  "grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4";
```

### 🔘 Touch Targets

```tsx
// Buttons (min 44px height)
className = "py-3 px-6 sm:py-4 sm:px-8";

// Icon Buttons
className = "w-12 h-12 sm:w-14 sm:h-14";

// Links
className = "py-2 px-4 inline-block";
```

### 🖼️ Container Widths

```tsx
// Full Width Container
className = "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";

// Content Container
className = "max-w-4xl mx-auto px-4 sm:px-6";

// Narrow Container
className = "max-w-2xl mx-auto px-4";
```

---

**For complete mobile standards, see sections above.**
