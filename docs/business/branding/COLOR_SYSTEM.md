# MH Construction Color System

**Date:** October 9, 2025  
**Status:** ✅ Current  
**Category:** Business - Brand Guidelines  
**Last Updated:** October 9, 2025  

## Quick Navigation

- [🏠 Brand Documentation](./BRANDING_INDEX.md)
- [📋 Brand Overview](./BRAND_OVERVIEW.md)
- [🔧 Icon Policy](./ICON_POLICY.md)
- [📝 Typography](./TYPOGRAPHY.md)

---

## Primary Brand Colors

### Primary Blue

**Hex:** `#1976D2`  
**RGB:** `rgb(25, 118, 210)`  
**HSL:** `hsl(207, 79%, 46%)`  
**Use Case:** Primary actions, headers, key elements  

### Secondary Blue

**Hex:** `#1E88E5`  
**RGB:** `rgb(30, 136, 229)`  
**HSL:** `hsl(208, 79%, 51%)`  
**Use Case:** Supporting elements, hover states  

### Accent Blue

**Hex:** `#42A5F5`  
**RGB:** `rgb(66, 165, 245)`  
**HSL:** `hsl(207, 89%, 61%)`  
**Use Case:** Highlights, interactive elements  

## Light Mode Color Palette

### Text Colors

#### Primary Text

- **Color:** `#212121` (Gray 900)
- **Usage:** Main content, headings
- **Contrast:** AAA compliant on white backgrounds

#### Secondary Text

- **Color:** `#757575` (Gray 600)
- **Usage:** Supporting text, descriptions
- **Contrast:** AA compliant on white backgrounds

#### Muted Text

- **Color:** `#9E9E9E` (Gray 500)
- **Usage:** Placeholder text, disabled states
- **Contrast:** Minimum AA compliance

### Background Colors

#### Primary Background

- **Color:** `#FFFFFF` (White)
- **Usage:** Main content areas, cards

#### Secondary Background

- **Color:** `#FAFAFA` (Gray 50)
- **Usage:** Page backgrounds, subtle sections

#### Surface Background

- **Color:** `#F5F5F5` (Gray 100)
- **Usage:** Elevated surfaces, input fields

### Border Colors

#### Primary Border

- **Color:** `#E0E0E0` (Gray 300)
- **Usage:** Main dividers, card outlines

#### Secondary Border

- **Color:** `#EEEEEE` (Gray 200)
- **Usage:** Subtle separators, table borders

## Dark Mode Color Palette

### Dark Mode Text Colors

#### Primary Text (Dark Mode)

- **Color:** `#FFFFFF` (White)
- **Usage:** Main content, headings
- **Contrast:** AAA compliant on dark backgrounds

#### Secondary Text (Dark Mode)

- **Color:** `#B0B0B0` (Gray 400)
- **Usage:** Supporting text, descriptions
- **Contrast:** AA compliant on dark backgrounds

#### Muted Text (Dark Mode)

- **Color:** `#757575` (Gray 600)
- **Usage:** Placeholder text, disabled states
- **Contrast:** Minimum AA compliance

### Dark Mode Background Colors

#### Primary Background (Dark Mode)

- **Color:** `#121212` (Dark Gray)
- **Usage:** Main content areas, cards

#### Secondary Background (Dark Mode)

- **Color:** `#1E1E1E` (Darker Gray)
- **Usage:** Page backgrounds, elevated surfaces

#### Surface Background (Dark Mode)

- **Color:** `#2D2D2D` (Medium Dark Gray)
- **Usage:** Input fields, interactive surfaces

### Dark Mode Border Colors

#### Primary Border (Dark Mode)

- **Color:** `#424242` (Gray 700)
- **Usage:** Main dividers, card outlines

#### Secondary Border (Dark Mode)

- **Color:** `#303030` (Gray 800)
- **Usage:** Subtle separators, table borders

## Semantic Colors

### Success Colors

**Light Mode:** `#4CAF50` (Green 500)  
**Dark Mode:** `#66BB6A` (Green 400)  
**Usage:** Success messages, completed states, positive indicators

### Warning Colors

**Light Mode:** `#FF9800` (Orange 500)  
**Dark Mode:** `#FFB74D` (Orange 300)  
**Usage:** Warning messages, caution states, attention indicators

### Error Colors

**Light Mode:** `#F44336` (Red 500)  
**Dark Mode:** `#EF5350` (Red 400)  
**Usage:** Error messages, failure states, destructive actions

### Info Colors

**Light Mode:** `#2196F3` (Blue 500)  
**Dark Mode:** `#42A5F5` (Blue 400)  
**Usage:** Information messages, neutral notifications

## Color Usage Guidelines

### Primary Color Applications

#### Headers and Navigation

- Use Primary Blue (`#1976D2`) for main navigation
- Use Secondary Blue (`#1E88E5`) for sub-navigation
- Maintain consistent blue hierarchy throughout

#### Call-to-Action Elements

- Primary buttons use Primary Blue background
- Hover states use Secondary Blue
- Active states use Accent Blue

#### Links and Interactive Elements

- Text links use Primary Blue
- Hover states use Secondary Blue
- Visited links maintain Primary Blue (no color change)

### Background Color Strategy

#### Light Mode Hierarchy

1. **Page Background:** Gray 50 (`#FAFAFA`)
2. **Content Background:** White (`#FFFFFF`)
3. **Elevated Surfaces:** Gray 100 (`#F5F5F5`)

#### Dark Mode Hierarchy

1. **Page Background:** Dark Gray (`#121212`)
2. **Content Background:** Darker Gray (`#1E1E1E`)
3. **Elevated Surfaces:** Medium Dark Gray (`#2D2D2D`)

### Text Color Accessibility

**Minimum Contrast Requirements:**

- **Normal Text:** 4.5:1 contrast ratio (AA)
- **Large Text:** 3:1 contrast ratio (AA)
- **Enhanced:** 7:1 contrast ratio (AAA)

**Implementation:**

- All body text meets AA standards
- Headings and important text meet AAA standards
- Disabled text maintains minimum readability

## Color Implementation

### CSS Custom Properties

```css
:root {
  /* Primary Colors */
  --color-primary: #1976D2;
  --color-secondary: #1E88E5;
  --color-accent: #42A5F5;
  
  /* Light Mode */
  --color-text-primary: #212121;
  --color-text-secondary: #757575;
  --color-background: #FFFFFF;
  --color-surface: #F5F5F5;
  --color-border: #E0E0E0;
  
  /* Semantic Colors */
  --color-success: #4CAF50;
  --color-warning: #FF9800;
  --color-error: #F44336;
  --color-info: #2196F3;
}

[data-theme="dark"] {
  /* Dark Mode Overrides */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #B0B0B0;
  --color-background: #121212;
  --color-surface: #1E1E1E;
  --color-border: #424242;
  
  /* Dark Mode Semantic */
  --color-success: #66BB6A;
  --color-warning: #FFB74D;
  --color-error: #EF5350;
  --color-info: #42A5F5;
}
```text

### Tailwind Configuration

```javascript
module.exports = {
  theme: {
    colors: {
      primary: {
        DEFAULT: '#1976D2',
        light: '#1E88E5',
        lighter: '#42A5F5'
      },
      gray: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#424242',
        800: '#303030',
        900: '#212121'
      },
      semantic: {
        success: '#4CAF50',
        warning: '#FF9800',
        error: '#F44336',
        info: '#2196F3'
      }
    }
  }
}
```text

## Brand Color Consistency

### Logo Applications

- **Primary Logo:** Uses Primary Blue (`#1976D2`)
- **Monochrome Logo:** Adapts to context (white on dark, dark on light)
- **Minimum Contrast:** Maintains 3:1 ratio with background

### Marketing Material Colors

- **Business Cards:** Primary Blue with white/gray text
- **Signage:** High contrast Primary Blue on white
- **Digital Assets:** Consistent with web color palette

### Quality Assurance

**Color Contrast Testing:**

- Use WebAIM contrast checker for all color combinations
- Verify AA compliance for normal text
- Ensure AAA compliance for important content

**Browser Testing:**

- Test color rendering across Chrome, Firefox, Safari, Edge
- Verify dark mode transitions work smoothly
- Check color accuracy on different screen types

**Print Color Matching:**

- Convert RGB to CMYK for print materials
- Test print samples for color accuracy
- Maintain brand consistency across digital and print

## Related Documentation

- [**Brand Overview**](./BRAND_OVERVIEW.md) - Complete brand identity guide
- [**Icon Policy**](./ICON_POLICY.md) - Material Icons standards
- [**Typography**](./TYPOGRAPHY.md) - Font system and text guidelines
- [**Implementation Guide**](./IMPLEMENTATION_GUIDE.md) - Technical implementation

---

**Color Authority**: MH Construction Design Team  
**Last Color Update**: October 8, 2025 (v3.7.2)  
**Next Review**: Quarterly brand compliance assessment
