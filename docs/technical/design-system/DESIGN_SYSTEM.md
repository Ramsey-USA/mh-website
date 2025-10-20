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

```css
/* Use these CSS variables throughout the codebase */
var(--brand-primary)
var(--brand-secondary)
var(--brand-accent)
```

## 📝 Typography System

### Section Header Standard

All major sections should follow this consistent typography pattern:

#### Main Section Headers

```tsx
<h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
  <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
    {subtitle}
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
    {mainTitle}
  </span>
</h2>
```

#### Section Description Text

```tsx
<p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
  {description with branded emphasis spans}
</p>
```

#### Typography Scale

| Element | Classes | Usage |
|---------|---------|-------|
| **Main Title** | `text-2xl sm:text-3xl md:text-4xl lg:text-5xl` | Primary section headers |
| **Subtitle** | `text-xl sm:text-2xl md:text-3xl lg:text-4xl` | Section subtitles |
| **Body Large** | `text-lg md:text-xl lg:text-2xl` | Section descriptions |
| **Card Title** | `text-xl md:text-2xl` | Component titles |
| **Card Subtitle** | `text-lg md:text-xl` | Component subtitles |
| **Body Text** | `text-sm md:text-base` | Standard body content |

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
```

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

## 🔍 Implementation Guidelines

### 1. Section Structure Template

```tsx
<section className="relative bg-{background} py-12 lg:py-16">
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <FadeInWhenVisible className="mb-10 lg:mb-12 text-center">
      {/* Standard Header Pattern */}
      <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tighter">
        <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight">
          {subtitle}
        </span>
        <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary drop-shadow-sm text-transparent">
          {mainTitle}
        </span>
      </h2>
      
      {/* Standard Description Pattern */}
      <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide">
        {description}
      </p>
    </FadeInWhenVisible>
    
    {/* Section Content */}
  </div>
</section>
```

### 2. Quality Checklist

When implementing new sections or components:

- [ ] Typography follows the established scale
- [ ] Headers use the two-line pattern with gradient
- [ ] Text content uses proper responsive sizing
- [ ] Emphasis spans follow brand patterns
- [ ] Spacing matches section standards
- [ ] Dark mode styles are included
- [ ] Accessibility attributes are present

## 📚 Related Documentation

- [Typography Examples](/docs/technical/design-system/typography-examples-clean.md)
- [Component Library](/src/components/ui/mh-ui-guide.md)
- [Brand Guidelines](/docs/business/brand-guidelines.md)

## 🔄 Updates & Maintenance

This design system should be updated when:

- New typography patterns are established
- Brand colors or fonts change
- Component standards evolve
- Accessibility requirements update

**Last Updated**: October 20, 2025
**Version**: 1.0.0
