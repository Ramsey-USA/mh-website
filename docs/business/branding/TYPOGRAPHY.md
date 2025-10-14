# MH Construction Typography System

**Date:** October 9, 2025
**Status:** ✅ Current
**Category:** Business - Brand Guidelines
**Last Updated:** October 9, 2025

## Quick Navigation

- [🏠 Brand Documentation](./BRANDING_INDEX.md)
- [📋 Brand Overview](./BRAND_OVERVIEW.md)
- [🎨 Color System](./COLOR_SYSTEM.md)
- [🔧 Icon Policy](./ICON_POLICY.md)

---

## Font System Overview

### Primary Typeface: Inter

**Inter** is the primary typeface for all MH Construction digital communications,
chosen for its excellent readability, modern appearance, and professional character
that aligns with our military precision values.

#### Font Family Stack

```css
font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
```text

#### Key Characteristics

- **High Legibility**: Optimized for screen reading at all sizes
- **Professional Appearance**: Clean, modern aesthetic
- **Variable Font Support**: Smooth weight transitions
- **Excellent Accessibility**: Clear character differentiation
- **Wide Language Support**: Comprehensive character set

### Font Weights

#### Available Weights

- **Light (300)**: Subtle headings, decorative text
- **Regular (400)**: Body text, default weight
- **Medium (500)**: Emphasized text, subheadings
- **Semi-Bold (600)**: Strong emphasis, important information
- **Bold (700)**: Primary headings, call-to-action text

#### Weight Usage Guidelines

```css
/* Headings */
h1 { font-weight: 700; }
h2 { font-weight: 600; }
h3 { font-weight: 600; }
h4 { font-weight: 500; }
h5 { font-weight: 500; }
h6 { font-weight: 500; }

/* Body Text */
body { font-weight: 400; }
strong { font-weight: 600; }
.emphasis { font-weight: 500; }
```text

## Typography Scale

### Heading Hierarchy

#### H1 - Primary Headlines

- **Size**: 48px (3rem)
- **Weight**: Bold (700)
- **Line Height**: 1.2
- **Usage**: Page titles, primary headlines

```css
h1 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
}
```text

#### H2 - Section Headlines

- **Size**: 36px (2.25rem)
- **Weight**: Semi-Bold (600)
- **Line Height**: 1.3
- **Usage**: Major section headings

```css
h2 {
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: -0.025em;
}
```text

#### H3 - Subsection Headlines

- **Size**: 30px (1.875rem)
- **Weight**: Semi-Bold (600)
- **Line Height**: 1.4
- **Usage**: Subsection headings, important content blocks

```css
h3 {
  font-size: 1.875rem;
  font-weight: 600;
  line-height: 1.4;
}
```text

#### H4 - Minor Headlines

- **Size**: 24px (1.5rem)
- **Weight**: Medium (500)
- **Line Height**: 1.5
- **Usage**: Minor headings, card titles

```css
h4 {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.5;
}
```text

#### H5 - Supporting Headlines

- **Size**: 20px (1.25rem)
- **Weight**: Medium (500)
- **Line Height**: 1.6
- **Usage**: Supporting headings, list item titles

```css
h5 {
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.6;
}
```text

#### H6 - Caption Headlines

- **Size**: 16px (1rem)
- **Weight**: Medium (500)
- **Line Height**: 1.6
- **Usage**: Caption headings, small section titles

```css
h6 {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.6;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```text

### Body Text Styles

#### Body Large

- **Size**: 18px (1.125rem)
- **Weight**: Regular (400)
- **Line Height**: 1.7
- **Usage**: Introduction paragraphs, important body text

```css
.text-large {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.7;
}
```text

#### Body Default

- **Size**: 16px (1rem)
- **Weight**: Regular (400)
- **Line Height**: 1.6
- **Usage**: Standard body text, paragraph content

```css
body, p {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}
```text

#### Body Small

- **Size**: 14px (0.875rem)
- **Weight**: Regular (400)
- **Line Height**: 1.5
- **Usage**: Supporting text, captions, metadata

```css
.text-small {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}
```text

#### Caption Text

- **Size**: 12px (0.75rem)
- **Weight**: Regular (400)
- **Line Height**: 1.4
- **Usage**: Image captions, footnotes, copyright text

```css
.text-caption {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--color-text-secondary);
}
```text

## Special Typography Elements

### Button Text

#### Primary Buttons

- **Size**: 16px (1rem)
- **Weight**: Medium (500)
- **Transform**: None
- **Letter Spacing**: 0.025em

```css
.btn-primary {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}
```text

#### Secondary Buttons

- **Size**: 14px (0.875rem)
- **Weight**: Medium (500)
- **Transform**: None
- **Letter Spacing**: 0.025em

```css
.btn-secondary {
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}
```text

### Navigation Text

#### Main Navigation

- **Size**: 16px (1rem)
- **Weight**: Medium (500)
- **Transform**: None
- **Letter Spacing**: 0

```css
.nav-main {
  font-size: 1rem;
  font-weight: 500;
}
```text

#### Breadcrumbs

- **Size**: 14px (0.875rem)
- **Weight**: Regular (400)
- **Transform**: None
- **Letter Spacing**: 0

```css
.breadcrumb {
  font-size: 0.875rem;
  font-weight: 400;
}
```text

### Form Elements

#### Input Labels

- **Size**: 14px (0.875rem)
- **Weight**: Medium (500)
- **Transform**: None
- **Letter Spacing**: 0

```css
label {
  font-size: 0.875rem;
  font-weight: 500;
}
```text

#### Input Text

- **Size**: 16px (1rem)
- **Weight**: Regular (400)
- **Line Height**: 1.5

```css
input, textarea {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}
```text

#### Placeholder Text

- **Size**: 16px (1rem)
- **Weight**: Regular (400)
- **Color**: Secondary text color

```css
::placeholder {
  font-size: 1rem;
  font-weight: 400;
  color: var(--color-text-secondary);
}
```text

## Typography Implementation

### CSS Custom Properties

```css
:root {
  /* Font Family */
  --font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;

  /* Font Sizes */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */

  /* Font Weights */
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line Heights */
  --leading-tight: 1.2;
  --leading-snug: 1.3;
  --leading-normal: 1.4;
  --leading-relaxed: 1.5;
  --leading-loose: 1.6;
  --leading-extra-loose: 1.7;
}
```text

### Tailwind Typography Configuration

```javascript
module.exports = {
  theme: {
    fontFamily: {
      sans: ['Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif']
    },
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1.4' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.6' }],
      lg: ['1.125rem', { lineHeight: '1.7' }],
      xl: ['1.25rem', { lineHeight: '1.6' }],
      '2xl': ['1.5rem', { lineHeight: '1.5' }],
      '3xl': ['1.875rem', { lineHeight: '1.4' }],
      '4xl': ['2.25rem', { lineHeight: '1.3' }],
      '5xl': ['3rem', { lineHeight: '1.2' }]
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    }
  }
}
```text

## Typography Usage Guidelines

### Heading Best Practices

#### Hierarchy Consistency

- Use semantic heading order (H1 → H2 → H3)
- Don't skip heading levels for visual purposes
- Only one H1 per page
- Use CSS classes for visual styling variations

#### Heading Length Guidelines

- **H1**: Maximum 60 characters
- **H2**: Maximum 50 characters
- **H3**: Maximum 40 characters
- **H4-H6**: Maximum 30 characters

### Body Text Guidelines

#### Line Length (Measure)

- **Optimal**: 45-75 characters per line
- **Maximum**: 90 characters per line
- Use container widths to control reading comfort

#### Paragraph Spacing

- **Between Paragraphs**: 1em bottom margin
- **After Headings**: 0.5em top margin
- **Before Headings**: 1.5em top margin

### Responsive Typography

#### Mobile Optimizations

```css
@media (max-width: 768px) {
  h1 { font-size: 2.25rem; }  /* 36px */
  h2 { font-size: 1.875rem; } /* 30px */
  h3 { font-size: 1.5rem; }   /* 24px */

  body { font-size: 1rem; }   /* 16px - maintain for readability */
}
```text

#### Large Screen Enhancements

```css
@media (min-width: 1200px) {
  h1 { font-size: 3.5rem; }   /* 56px */
  h2 { font-size: 2.5rem; }   /* 40px */

  .text-large { font-size: 1.25rem; } /* 20px */
}
```text

## Accessibility Guidelines

### WCAG Compliance

#### Text Contrast Requirements

- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Enhanced**: Target 7:1 contrast ratio for important content

#### Font Size Requirements

- **Minimum Body Size**: 16px (never smaller)
- **Scalability**: Support up to 200% zoom
- **Relative Units**: Use rem/em for scalable text

### Screen Reader Considerations

- Use semantic heading structure
- Provide text alternatives for visual typography
- Maintain logical reading order
- Test with screen readers regularly

## Brand Voice in Typography

### Professional Precision

- Clean, consistent spacing
- Appropriate weight hierarchy
- Military-inspired orderliness
- No decorative fonts

### Partnership-Focused Readability

- Excellent legibility at all sizes
- Comfortable reading experience
- Clear information hierarchy
- Accessible to all users

### Quality Assurance

#### Typography Checklist

- [ ] Consistent font weights across similar elements
- [ ] Proper heading hierarchy maintained
- [ ] Adequate contrast ratios met
- [ ] Responsive scaling tested
- [ ] Cross-browser font rendering verified

## Related Documentation

- [**Brand Overview**](./BRAND_OVERVIEW.md) - Complete brand identity guide
- [**Color System**](./COLOR_SYSTEM.md) - Color palette and usage
- [**Icon Policy**](./ICON_POLICY.md) - Material Icons standards
- [**Implementation Guide**](./IMPLEMENTATION_GUIDE.md) - Technical implementation

---

**Typography Authority**: MH Construction Design Team
**Last Update**: October 8, 2025 (v3.7.2)
**Next Review**: Quarterly brand compliance assessment
