# MH Construction Typography Standardization Guide

## Standard Typography Patterns

### Hero Section Typography (H1)

```tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight">
  <span className="block bg-clip-text bg-gradient-to-r from-brand-secondary via-white to-brand-primary text-transparent drop-shadow-lg">
    Main Hero Title
  </span>
</h1>
```

### Section Headers (H2)

```tsx
<h2 className="mb-6 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
  <span className="text-gray-700 dark:text-gray-300">
    Section
  </span>{" "}
  <span className="bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
    Title
  </span>
</h2>
```

### Subsection Headers (H3)

```tsx
<h3 className="mb-4 font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-900 dark:text-white">
  Subsection Title
</h3>
```

### Body Text Patterns

```tsx
<!-- Primary body text -->
<p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed">
  Standard body text content
</p>

<!-- Large body text (hero descriptions) -->
<p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed">
  Hero section description
</p>

<!-- Small body text -->
<p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
  Smaller content text
</p>
```

## Spacing Standards

### Section Spacing

```tsx
<!-- Section wrapper -->
<section className="bg-white dark:bg-gray-900 py-16 lg:py-24">
  
  <!-- Section header spacing -->
  <div className="mb-12 lg:mb-16 text-center">
    
  <!-- Content spacing -->
  <div className="space-y-6 sm:space-y-8">
```

### Container Patterns

```tsx
<!-- Standard container -->
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<!-- Narrow content container -->
<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

<!-- Text-focused container -->
<div className="max-w-3xl mx-auto">
```

## Brand Gradient Patterns

### Primary Gradient (Titles)

```tsx
bg-gradient-to-r from-brand-primary to-brand-secondary
```

### Secondary Gradient (Hero backgrounds)

```tsx
bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900
```

### Accent Gradients

```tsx
<!-- Light accent -->
bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5

<!-- Background overlay -->
bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20
```

## Implementation Checklist

### Per Page Requirements

- [ ] Hero H1 uses standard scaling: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`
- [ ] Section H2s use: `text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl`
- [ ] Body text uses responsive scaling
- [ ] Consistent spacing patterns applied
- [ ] Brand gradients used consistently
- [ ] Proper color contrast maintained

### Typography Hierarchy

1. **H1**: Hero titles only - largest scale
2. **H2**: Section headers - secondary scale
3. **H3**: Subsection headers - tertiary scale
4. **H4**: Card titles, smaller headers
5. **p**: Body text with responsive scaling

### Color Standards

- **Primary Text**: `text-gray-900 dark:text-white`
- **Secondary Text**: `text-gray-700 dark:text-gray-300`
- **Body Text**: `text-gray-600 dark:text-gray-300`
- **Muted Text**: `text-gray-500 dark:text-gray-400`
- **Brand Gradients**: Use `bg-clip-text` with `text-transparent`

## Pages Requiring Standardization

### High Priority

1. **Services Page** - Multiple inconsistent headers
2. **Contact Page** - Non-standard typography patterns
3. **Projects Page** - Inconsistent section headers
4. **About Page** - Needs typography review

### Medium Priority

1. **Government Page** - Review section headers
2. **Careers Page** - Verify consistency
3. **Trade Partners Page** - Check patterns
4. **Team Page** - Typography audit

### Low Priority

1. **Testimonials Page** - Minor adjustments
2. **Estimator Page** - Review headers
3. **Booking Page** - Verify patterns

## Validation Commands

```bash
# Check typography standardization
./scripts/validation/check-typography-standardization.sh

# Check specific patterns
grep -r "text-.*xl.*font-bold" src/app/
grep -r "bg-gradient-to-r.*from-brand" src/app/
```

## Implementation Order

1. **Fix Hero Sections**: Ensure all H1s use standard scaling
2. **Standardize Section Headers**: Apply consistent H2 patterns
3. **Normalize Body Text**: Implement responsive text scaling
4. **Unify Gradients**: Ensure brand gradients used consistently
5. **Validate Spacing**: Check and fix spacing patterns
6. **Test Responsiveness**: Verify all breakpoints work correctly

## Common Issues to Fix

### Typography Problems

- `font-black` instead of `font-bold` for sections
- Missing responsive scaling (`sm:text-*`, `md:text-*`)
- Inconsistent gradient implementations
- Non-standard color applications

### Layout Issues

- Inconsistent spacing patterns
- Non-standard container usage
- Missing responsive breakpoints
- Poor mobile scaling

### Brand Compliance

- Using gray gradients instead of brand colors
- Missing `text-transparent` with gradients
- Inconsistent color naming
- Wrong brand color applications
