# MH Construction Brand Guidelines & Design System

**Complete brand identity, design system, and implementation guidelines for MH Construction LLC**

> **📅 Last Updated:** September 23, 2025  
> **🎨 Brand Version:** 2.5.1  
> **👥 Authority:** MH Construction Leadership Team  
> **💻 Implementation:** Tailwind CSS v4 with enhanced MH brand system  
> **🌙 Theme Support:** Complete light/dark mode system with custom CSS enhancements  
> **🚀 Architecture:** Hybrid approach - Tailwind utilities + custom MH brand classes for enhanced effects

---

## 🚨 **IMPLEMENTATION NOTICE: Enhanced MH Brand System**

### **Current Architecture (v2.5.1)**
**MH Construction uses a hybrid approach combining Tailwind CSS utilities with custom MH brand classes for enhanced visual effects.**

#### **Tailwind + Custom Classes Approach:**
```tsx
<Button variant="primary" className="btn-primary">Get Quote</Button>
<div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl">Content</div>
<nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark nav-primary">Navigation</nav>
```

### **Benefits of Hybrid Approach:**
- ✅ **Enhanced Visual Effects**: Custom classes provide glimmer animations and advanced hover states
- ✅ **Brand Consistency**: Specialized MH Construction styling beyond standard Tailwind
- ✅ **Performance**: Tailwind utilities for layout, custom classes for brand-specific enhancements
- ✅ **Maintainability**: Clear separation between utility styling and brand effects
- ✅ **Theme Support**: Complete dark/light mode with enhanced brand theming
- ✅ **Future Evolution**: Flexible foundation for advancing toward pure Tailwind when ready

---

## 🏢 Brand Identity

### Company Information
**MH Construction LLC** - *Veteran-Owned Construction Company*

| Element | Details |
|---------|---------|
| **Full Business Name** | MH Construction LLC |
| **Tagline** | "Building Tomorrow with Today's Technology" |
| **Secondary Tagline** | "Where Military Precision Meets Construction Excellence" |
| **Industry** | Construction & Renovation |
| **Founded** | Veteran-owned and operated |
| **Service Philosophy** | Military precision, veteran values, cutting-edge technology |

### Core Values
| Value | Description | Brand Expression |
|-------|-------------|------------------|
| **Ethics** | Transparent pricing, honest timelines | Clear cost breakdowns, realistic schedules |
| **Experience** | 150+ years combined team expertise | Proven track record showcasing |
| **Integrity** | Consistent performance, reliable delivery | Promise keeping, quality assurance |
| **Honesty** | Open communication, no hidden costs | Transparent processes, upfront pricing |
| **Trust** | Proven results, client testimonials | Social proof, referral programs |
| **Professionalism** | Military-grade precision | Attention to detail, systematic approach |

---

## 🎨 Visual Identity System

### Primary Brand Colors (Tailwind Configuration)
```typescript
// tailwind.config.ts - Official MH Construction Color Palette
export default {
  theme: {
    extend: {
      colors: {
        'brand': {
          'primary': '#386851',        // Hunter Green
          'primary-light': '#4a7a63',  // Lighter hunter green
          'primary-dark': '#2d5240',   // Darker hunter green
          'secondary': '#BD9264',      // Leather Tan
          'secondary-light': '#c9a176', // Lighter tan
          'secondary-dark': '#a67d52',  // Darker tan
          'accent': '#7c9885',         // Sage Green accent
          'accent-light': '#96ad9c',   // Lighter sage
          'accent-dark': '#5a7363',    // Darker sage
          'light': '#f7f9f7',          // Very light brand background
        },
        
        // Quick access aliases
        'mh-primary': '#386851',       // Hunter Green
        'mh-secondary': '#BD9264',     // Leather Tan
        
        // Semantic theme colors
        'surface': {
          DEFAULT: '#f8fafc',          // Light mode surface
          'secondary': '#f1f5f9',      // Light mode secondary surface
          'dark': '#1e293b',           // Dark mode surface
          'dark-secondary': '#334155', // Dark mode secondary surface
        },
        
        'text': {
          'primary': '#1e293b',        // Light mode primary text
          'secondary': '#64748b',      // Light mode secondary text
          'muted': '#94a3b8',          // Light mode muted text
          'primary-dark': '#f8fafc',   // Dark mode primary text
          'secondary-dark': '#cbd5e1', // Dark mode secondary text
          'muted-dark': '#64748b',     // Dark mode muted text
        },
        
        'border': {
          DEFAULT: '#e2e8f0',          // Light mode borders
          'light': '#f1f5f9',          // Light mode subtle borders
          'dark': '#334155',           // Dark mode borders
          'dark-light': '#475569',     // Dark mode subtle borders
        },
        
        // Veteran recognition colors
        'veteran': {
          'red': '#dc2626',
          'blue': '#1d4ed8',
          'gold': '#ca8a04',
        },
      }
    }
  }
}
```

### Color Usage Guidelines (Hybrid Implementation)

#### Hunter Green (`bg-brand-primary`, `text-brand-primary`) - Primary
- **Primary CTAs**: `<Button variant="primary">` components with `.btn-primary` enhancements
- **Header navigation**: `bg-brand-primary` backgrounds with custom nav classes
- **Active states**: `bg-brand-primary-dark` for pressed states plus glimmer effects
- **Logo applications**: `text-brand-primary` for brand elements with enhanced animations

#### Leather Tan (`bg-brand-secondary`, `text-brand-secondary`) - Secondary  
- **Secondary CTAs**: `<Button variant="secondary">` components with `.btn-secondary` styling
- **Accent elements**: `bg-brand-secondary` backgrounds with custom enhancements
- **Complementary design**: `border-brand-secondary` borders with hover animations
- **Warm accent applications**: `text-brand-secondary` text with theme support

#### Veteran Colors (Enhanced Classes)
- **Red**: `bg-veteran-red` + `.btn-veteran` for veteran badges with animations
- **Blue**: `bg-veteran-blue` + `.btn-dashboard` for program elements with effects  
- **Gold**: `bg-veteran-gold` + `.veteran-badge` for achievements with glimmer

#### Usage Examples with Hybrid Approach:
```tsx
// Primary button with brand colors and enhancements
<Button 
  variant="primary" 
  className="btn-primary bg-brand-primary hover:bg-brand-primary-dark focus:ring-brand-primary/50"
>
  Get Quote
</Button>

// Card with theme-aware styling and custom enhancements
<div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6 card-primary">
  <h3 className="text-brand-primary dark:text-brand-primary-light">Project Title</h3>
  <p className="text-text-secondary dark:text-text-secondary-dark">Description</p>
</div>

// Navigation with enhanced styling
<nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark nav-primary">
  Navigation with MH brand enhancements
</nav>

// Veteran recognition element with custom styling
<div className="bg-veteran-red text-white px-4 py-2 rounded-full btn-veteran">
  Veteran Owned
</div>
```

---

## 🌙 Pure Tailwind Light/Dark Theme System

### Tailwind Theme Configuration
Our design system uses Tailwind's built-in dark mode with custom brand colors that automatically adapt.

```typescript
## 🌙 Enhanced Tailwind Light/Dark Theme System

### Tailwind Theme Configuration with MH Brand Enhancement
Our design system uses Tailwind's built-in dark mode with custom brand colors and enhanced CSS classes that automatically adapt.

```typescript
// tailwind.config.ts - Dark mode configuration
export default {
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      // MH brand colors integrated with Tailwind
    }
  }
}
```

### Theme Implementation with Hybrid Approach

#### Light Mode (Default with Custom Enhancements)
```tsx
// Components use Tailwind utilities + custom MH classes
<div className="bg-surface text-text-primary border border-border card-primary">
  <h2 className="text-brand-primary">Light Mode Content</h2>
  <p className="text-text-secondary">Enhanced with MH brand styling</p>
</div>
```

#### Dark Mode (`.dark` class with Enhanced Styling)
```tsx
// Same component automatically adapts with MH enhancements
<div className="bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark border border-border dark:border-border-dark card-primary">
  <h2 className="text-brand-primary dark:text-brand-primary-light">Dark Mode Content</h2>
  <p className="text-text-secondary dark:text-text-secondary-dark">Enhanced MH styling in dark mode</p>
</div>
```

### Theme-Aware Component Patterns

#### Navigation with MH Enhancement:
```tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark backdrop-blur-sm nav-primary">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Link 
      href="/" 
      className="flex items-center transition-all duration-300 hover:scale-105 relative overflow-hidden group mh-logo-enhanced"
    >
      MH Logo with enhanced effects
    </Link>
  </div>
</nav>
```

#### Button Component (Hybrid Approach):
```tsx
export function Button({ variant, children, ...props }) {
  const variants = {
    primary: `
      bg-brand-primary hover:bg-brand-primary-dark text-white 
      btn-primary // Custom MH class for glimmer effects
      px-6 py-3 rounded-full font-bold transition-all duration-300
      focus:outline-none focus:ring-2 focus:ring-brand-primary/50
    `
  }
  
  return (
    <button 
      className={`btn-base ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
```

#### Card Component (Enhanced with MH Styling):
```tsx
<div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300 p-6 card-primary">
  <h3 className="text-brand-primary dark:text-brand-primary-light text-xl font-bold mb-4">
    Project Title
  </h3>
  <p className="text-text-secondary dark:text-text-secondary-dark mb-4">
    Project description with automatic theme adaptation and MH enhancements
  </p>
  <Button variant="primary" className="btn-primary">Learn More</Button>
</div>
```
```

### Theme Implementation with Pure Tailwind

#### Light Mode (Default)
```tsx
// Components automatically use light mode classes
<div className="bg-surface text-text-primary border border-border">
  <h2 className="text-brand-primary">Light Mode Content</h2>
  <p className="text-text-secondary">Automatically styled for light theme</p>
</div>
```

#### Dark Mode (`.dark` class applied to `<html>`)
```tsx
// Same component automatically adapts to dark mode
<div className="bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark border border-border dark:border-border-dark">
  <h2 className="text-brand-primary dark:text-brand-primary-light">Dark Mode Content</h2>
  <p className="text-text-secondary dark:text-text-secondary-dark">Automatically styled for dark theme</p>
</div>
```

### Theme-Aware Component Patterns

#### Navigation with Pure Tailwind:
```tsx
<nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Link 
      href="/" 
      className="text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors"
    >
      Home
    </Link>
  </div>
</nav>
```

#### Button Component (Pure Tailwind):
```tsx
export function Button({ variant, children, ...props }) {
  const variants = {
    primary: `
      bg-brand-primary border-2 border-brand-primary text-white
      hover:bg-brand-primary-dark hover:-translate-y-1
      focus:ring-2 focus:ring-brand-primary/50
      dark:shadow-[0_4px_16px_rgba(74,122,99,0.3)]
    `,
    secondary: `
      bg-brand-secondary border-2 border-brand-secondary text-white
      hover:bg-brand-secondary-dark hover:-translate-y-1
      focus:ring-2 focus:ring-brand-secondary/50
    `,
    outline: `
      bg-transparent border-2 border-brand-primary text-brand-primary
      hover:bg-brand-primary/5 dark:hover:bg-brand-primary-light/10
      dark:border-brand-primary-light dark:text-brand-primary-light
      focus:ring-2 focus:ring-brand-primary/50
    `
  }
  
  return (
    <button 
      className={`${variants[variant]} px-6 py-3 rounded-full font-bold transition-all duration-300`}
      {...props}
    >
      {children}
    </button>
  )
}
```

#### Card Component (Pure Tailwind):
```tsx
<div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300 p-6">
  <h3 className="text-brand-primary dark:text-brand-primary-light text-xl font-bold mb-4">
    Project Title
  </h3>
  <p className="text-text-secondary dark:text-text-secondary-dark mb-4">
    Project description with automatic theme adaptation
  </p>
  <Button variant="primary">Learn More</Button>
</div>
```

### Typography System (Tailwind Configuration)
```typescript
// tailwind.config.ts - MH Construction Font System
export default {
  theme: {
    extend: {
      fontFamily: {
        'tactic-bold': ['Tactic Sans Bold', 'Arial Black', 'sans-serif'],
        'tactic-medium': ['Tactic Sans Medium', 'Arial', 'sans-serif'],
        'garamond': ['Adobe Garamond Pro', 'Times New Roman', 'serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        'xs': ['clamp(0.75rem, 0.7rem + 0.2vw, 0.8rem)', { lineHeight: '1.25' }],
        'sm': ['clamp(0.875rem, 0.8rem + 0.3vw, 0.95rem)', { lineHeight: '1.25' }],
        'base': ['clamp(1rem, 0.9rem + 0.4vw, 1.1rem)', { lineHeight: '1.5' }],
        'lg': ['clamp(1.125rem, 1rem + 0.5vw, 1.25rem)', { lineHeight: '1.5' }],
        'xl': ['clamp(1.25rem, 1.1rem + 0.6vw, 1.4rem)', { lineHeight: '1.5' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 0.8vw, 1.75rem)', { lineHeight: '1.25' }],
        '3xl': ['clamp(1.875rem, 1.6rem + 1vw, 2.25rem)', { lineHeight: '1.25' }],
        '4xl': ['clamp(2.25rem, 1.9rem + 1.4vw, 3rem)', { lineHeight: '1.25' }],
      }
    }
  }
}
```

#### Typography Usage with Pure Tailwind:
```tsx
// Headings with brand fonts
<h1 className="font-tactic-bold text-4xl text-brand-primary dark:text-brand-primary-light">
  MH Construction
</h1>

<h2 className="font-tactic-medium text-2xl text-text-primary dark:text-text-primary-dark">
  Professional Services
</h2>

// Body text with theme awareness
<p className="font-garamond text-base text-text-secondary dark:text-text-secondary-dark leading-relaxed">
  Professional construction services with fluid typography that adapts to all screen sizes.
</p>

// Code/technical content
<code className="font-mono text-sm bg-surface dark:bg-surface-dark p-2 rounded">
  Technical specifications
</code>
```

---

## 🏆 Enhanced Logo System (Pure Tailwind Implementation)

### Logo Implementation with Tailwind
```tsx
// Logo with hover effects using pure Tailwind
<Link 
  href="/" 
  className="flex items-center transition-opacity hover:opacity-80 relative overflow-hidden group"
>
  <img 
    src="/images/logo/mh-logo.png" 
    alt="MH Construction" 
    className="h-20 w-auto relative z-10"
  />
  {/* Hover shine effect with Tailwind */}
  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
</Link>
```

### Header Logo (Pure Tailwind):
```tsx
<div className="flex-shrink-0 py-3">
  <Link 
    href="/" 
    className="flex items-center transition-all duration-300 hover:scale-105 relative overflow-hidden group"
  >
    <img 
      src="/images/logo/mh-logo.png" 
      alt="MH Construction" 
      className="h-20 w-auto filter drop-shadow-lg relative z-10"
    />
    {/* Brand-colored shine effect */}
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  </Link>
</div>
```

### Footer Logo (Pure Tailwind):
```tsx
<div className="mb-6">
  <Link 
    href="/" 
    className="inline-block transition-all duration-300 hover:scale-105 relative overflow-hidden group"
  >
    <img 
      src="/images/logo/mh-logo.png" 
      alt="MH Construction" 
      className="h-16 w-auto brightness-0 invert dark:brightness-100 dark:invert-0 relative z-10"
    />
    {/* Enhanced shine for footer */}
    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 dark:via-brand-primary-light/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
  </Link>
</div>
```

---

## 🔲 MH Brand Button System (Pure Tailwind Implementation)

### Button Component Architecture
All buttons use the reusable `Button` component with pure Tailwind styling that automatically adapts to themes.

#### Button Component Implementation:
```tsx
// /src/components/ui/Button.tsx
export function Button({ 
  variant = 'primary', 
  size = 'md', 
  withRing = true,
  children, 
  className = '', 
  ...props 
}) {
  const baseClasses = 'font-bold rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 relative overflow-hidden group'
  
  const variantClasses = {
    primary: `
      bg-brand-primary border-2 border-brand-primary text-white
      shadow-[0_4px_16px_rgba(56,104,81,0.2)] dark:shadow-[0_4px_16px_rgba(74,122,99,0.3)]
      hover:bg-brand-primary-dark hover:-translate-y-1 
      hover:shadow-[0_0_0_3px_rgba(56,104,81,0.3),0_8px_25px_rgba(56,104,81,0.35)]
      focus:ring-2 focus:ring-brand-primary/50
      before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full
      before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent
      before:transition-all before:duration-500 before:z-10
      hover:before:left-full
    `,
    secondary: `
      bg-brand-secondary border-2 border-brand-secondary text-white
      shadow-[0_4px_16px_rgba(189,146,100,0.2)]
      hover:bg-brand-secondary-light hover:-translate-y-1
      hover:shadow-[0_0_0_3px_rgba(189,146,100,0.3),0_8px_25px_rgba(189,146,100,0.35)]
      focus:ring-2 focus:ring-brand-secondary/50
    `,
    outline: `
      bg-transparent border-2 border-brand-primary text-brand-primary
      hover:bg-brand-primary/5 dark:hover:bg-brand-primary-light/10
      dark:border-brand-primary-light dark:text-brand-primary-light
      hover:-translate-y-0.5 focus:ring-2 focus:ring-brand-primary/50
    `
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
    xl: 'px-8 py-4 text-xl min-h-[60px]'
  }
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </button>
  )
}
```

#### Button Usage Examples:
```tsx
// Primary CTA buttons
<Button variant="primary" size="xl">
  Schedule Free Consultation
</Button>

// Secondary actions
<Button variant="secondary" size="lg">
  View Portfolio
</Button>

// Outline buttons for secondary CTAs
<Button variant="outline" size="md">
  Learn More
</Button>

// Custom styling with Tailwind classes
<Button 
  variant="primary" 
  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-primary"
>
  Custom Styled Button
</Button>
```

#### Special Purpose Buttons:
```tsx
// Veteran program button
<Button 
  variant="primary"
  className="bg-veteran-red border-veteran-red hover:bg-red-700"
>
  Wounded Warrior Program
</Button>

// Dashboard access button
<Button 
  variant="primary"
  className="bg-veteran-blue border-veteran-blue hover:bg-blue-700"
>
  Team Access
</Button>
```

---

## 🎯 Component Standards (Pure Tailwind Implementation)

### Navigation System (Pure Tailwind)
```tsx
// Navigation with complete Tailwind implementation
<nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark backdrop-blur-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-24 py-2">
      {/* Logo */}
      <div className="flex-shrink-0 py-3">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <img 
            src="/images/logo/mh-logo.png" 
            alt="MH Construction" 
            className="h-20 w-auto"
          />
        </Link>
      </div>
      
      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link 
          href="/about" 
          className="text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors"
        >
          About
        </Link>
        <Link 
          href="/services" 
          className="text-text-primary dark:text-text-primary-dark hover:text-brand-primary transition-colors"
        >
          Services
        </Link>
      </div>
      
      {/* CTA Buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="outline">Get Quote</Button>
        <Button variant="primary">Contact Us</Button>
      </div>
    </div>
  </div>
</nav>
```

### Card System (Pure Tailwind)
```tsx
// Card component with full theme support
<div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/10 p-6">
  <div className="mb-4">
    <h3 className="text-brand-primary dark:text-brand-primary-light text-xl font-bold mb-2">
      Project Title
    </h3>
    <p className="text-text-secondary dark:text-text-secondary-dark">
      Detailed project description with automatic theme adaptation
    </p>
  </div>
  
  <div className="flex items-center justify-between">
    <span className="text-text-muted dark:text-text-muted-dark text-sm">
      Completed 2024
    </span>
    <Button variant="outline" size="sm">
      View Details
    </Button>
  </div>
</div>
```

### Form Elements (Pure Tailwind)
```tsx
// Form inputs with complete theme support
<div className="space-y-4">
  <div>
    <label 
      htmlFor="email" 
      className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
    >
      Email Address
    </label>
    <input
      type="email"
      id="email"
      className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark placeholder-text-muted dark:placeholder-text-muted-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
      placeholder="Enter your email"
    />
  </div>
  
  <div>
    <label 
      htmlFor="message" 
      className="block text-sm font-medium text-text-primary dark:text-text-primary-dark mb-2"
    >
      Message
    </label>
    <textarea
      id="message"
      rows={4}
      className="w-full px-4 py-3 border border-border dark:border-border-dark rounded-lg bg-surface dark:bg-surface-dark text-text-primary dark:text-text-primary-dark placeholder-text-muted dark:placeholder-text-muted-dark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary resize-vertical"
      placeholder="Tell us about your project"
    />
  </div>
  
  <Button variant="primary" className="w-full">
    Send Message
  </Button>
</div>
```

### Status Indicators (Pure Tailwind)
```tsx
// Status badges with theme-aware colors
<div className="flex flex-wrap gap-2">
  <span className="px-3 py-1 bg-success-light text-success-dark border border-success rounded-full text-sm font-medium">
    ✅ Completed
  </span>
  <span className="px-3 py-1 bg-warning-light text-warning-dark border border-warning rounded-full text-sm font-medium">
    ⚠️ In Progress
  </span>
  <span className="px-3 py-1 bg-error-light text-error-dark border border-error rounded-full text-sm font-medium">
    ❌ On Hold
  </span>
  <span className="px-3 py-1 bg-info-light text-info-dark border border-info rounded-full text-sm font-medium">
    ℹ️ Planning
  </span>
</div>
```

---

## ♿ Accessibility & Pure Tailwind Standards

### Contrast Compliance (Tailwind Implementation)
- **Light Mode**: All color combinations meet WCAG AA standards using Tailwind's semantic colors
- **Dark Mode**: Enhanced contrast ratios with `dark:` variants for improved readability
- **High Contrast**: Tailwind's contrast utilities support `prefers-contrast: high`

```tsx
// High contrast button for accessibility
<Button 
  variant="primary"
  className="contrast-more:bg-black contrast-more:border-black contrast-more:text-white"
>
  High Contrast Button
</Button>
```

### Motion Sensitivity (Tailwind Implementation)
```tsx
// Respect user motion preferences with Tailwind
<div className="transition-all duration-300 motion-reduce:transition-none">
  <Button 
    variant="primary"
    className="hover:scale-105 motion-reduce:hover:scale-100 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
  >
    Motion-Aware Button
  </Button>
</div>

// Logo with respectful animations
<img 
  className="transition-transform duration-500 hover:scale-105 motion-reduce:transition-none motion-reduce:hover:scale-100"
  src="/images/logo/mh-logo.png"
  alt="MH Construction"
/>
```

### Focus States (Pure Tailwind)
```tsx
// Theme-aware focus indicators using Tailwind
<Button 
  variant="primary"
  className="focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface-dark"
>
  Accessible Button
</Button>

// Form inputs with proper focus styling
<input
  type="email"
  className="focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary dark:focus:ring-brand-primary-light"
  placeholder="Email address"
/>

// Navigation links with focus support
<Link 
  href="/about"
  className="focus:outline-none focus:ring-2 focus:ring-brand-primary rounded-md px-2 py-1"
>
  About Us
</Link>
```

### Screen Reader Support
```tsx
// Proper ARIA labels and semantic HTML
<Button 
  variant="primary"
  aria-label="Schedule a free consultation with MH Construction"
  className="focus:ring-2 focus:ring-brand-primary"
>
  <CalendarIcon className="w-5 h-5 mr-2" aria-hidden="true" />
  Schedule Consultation
</Button>

// Theme toggle with accessibility
<button
  onClick={toggleTheme}
  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
  className="p-2 rounded-lg border border-border dark:border-border-dark hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
>
  {theme === 'dark' ? '☀️' : '🌙'}
</button>
```

---

## 🏗️ Implementation Guidelines (Pure Tailwind v4)

### Project Architecture
> **MH Construction uses pure Tailwind CSS v4.1.13 with zero custom CSS classes**
> - Complete theme support with Tailwind's dark mode
> - Brand colors configured in `tailwind.config.ts`
> - Component-based architecture with reusable Button component
> - Accessibility-first design with Tailwind utilities

### Tailwind Configuration Reference
```typescript
// tailwind.config.ts - Complete MH Construction configuration
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        // MH Construction Brand Colors
        'brand': { /* Brand color configuration */ },
        'surface': { /* Surface color system */ },
        'text': { /* Text color system */ },
        'border': { /* Border color system */ },
        'veteran': { /* Veteran recognition colors */ },
        // Status Colors
        'success': { /* Success color variants */ },
        'warning': { /* Warning color variants */ },
        'error': { /* Error color variants */ },
        'info': { /* Info color variants */ },
      },
      fontFamily: { /* Typography system */ },
      fontSize: { /* Fluid typography scale */ },
      // ... complete configuration
    },
  },
  plugins: [],
}

export default config
```

### Component Usage with Pure Tailwind
```tsx
// Modern component with pure Tailwind - NO custom CSS classes
import { Button } from '@/components/ui/Button'

export function ProjectCard({ project }) {
  return (
    <div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/10 transition-all duration-300 p-6">
      
      {/* Header with theme-aware text */}
      <div className="mb-4">
        <h3 className="text-brand-primary dark:text-brand-primary-light text-xl font-tactic-bold mb-2">
          {project.title}
        </h3>
        <p className="text-text-secondary dark:text-text-secondary-dark font-garamond">
          {project.description}
        </p>
      </div>
      
      {/* Status badge */}
      <div className="mb-4">
        <span className="px-3 py-1 bg-success-light text-success-dark border border-success rounded-full text-sm font-medium">
          ✅ {project.status}
        </span>
      </div>
      
      {/* Action buttons */}
      <div className="flex items-center justify-between">
        <span className="text-text-muted dark:text-text-muted-dark text-sm">
          Completed {project.year}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Details
          </Button>
          <Button variant="primary" size="sm">
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  )
}
```

### Theme Implementation
```tsx
// Theme toggle with pure Tailwind
import { useTheme } from '@/contexts/ThemeContext'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-border dark:border-border-dark bg-surface hover:bg-surface-secondary dark:bg-surface-dark dark:hover:bg-surface-dark-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

### Brand Compliance Checklist (Pure Tailwind v4)
- [ ] ✅ Uses official MH brand colors via Tailwind configuration
- [ ] ✅ Implements pure Tailwind classes (NO custom CSS classes)
- [ ] ✅ Uses Button component for all interactive elements
- [ ] ✅ Supports both automatic (`prefers-color-scheme`) and manual theme switching
- [ ] ✅ Maintains proper contrast ratios with Tailwind semantic colors
- [ ] ✅ Includes accessibility features using Tailwind utilities
- [ ] ✅ Respects user motion and contrast preferences
- [ ] ✅ Tests properly in both light and dark modes
- [ ] ✅ Uses semantic HTML with proper ARIA labels
- [ ] ✅ Implements responsive design with Tailwind breakpoints

### Migration from Custom CSS (v2.5.0 → v2.6.0)
```tsx
// OLD APPROACH (v2.5.0) - Custom CSS classes
<button className="btn-primary btn-xl">Get Quote</button>
<div className="card-primary">Content</div>
<nav className="nav-primary">Navigation</nav>

// NEW APPROACH (v2.6.0+) - Pure Tailwind
<Button variant="primary" size="xl">Get Quote</Button>
<div className="bg-surface dark:bg-surface-dark border border-border dark:border-border-dark rounded-xl p-6">Content</div>
<nav className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dark border-b border-border dark:border-border-dark">Navigation</nav>
```

### Development Best Practices
1. **Always use the Button component** for interactive elements
2. **Never create custom CSS classes** - use Tailwind utilities
3. **Test in both themes** during development
4. **Use semantic color names** (`bg-surface` not `bg-gray-100`)
5. **Include dark mode variants** for all colored elements
6. **Respect accessibility preferences** with motion and contrast utilities
7. **Use TypeScript** for component props and configuration

---

## 📞 Brand Governance

### Authority & Updates
- **Final Approval**: MH Construction Leadership Team
- **Implementation**: Pure Tailwind CSS v4 with zero custom classes
- **Guidelines**: This document + `tailwind.config.ts` configuration
- **Component Library**: `/src/components/ui/` for reusable components

### Technical Contact Information
- **Brand Guidelines**: developers@mhconstruction.com
- **Tailwind Implementation**: See `tailwind.config.ts` and Button component
- **Theme Support**: Complete Tailwind dark mode implementation
- **Technical Support**: Pure Tailwind architecture documentation

### Version History
- **v2.6.0** (September 22, 2025): Complete migration to pure Tailwind CSS v4
- **v2.5.0** (Previous): Custom CSS classes with theme support
- **Migration**: All custom classes replaced with Tailwind utilities and components

---

**This comprehensive brand system ensures consistent, professional, and veteran-proud representation across all digital touchpoints using pure Tailwind CSS v4 with complete accessibility and theme support.** 🏗️

*"Building Tomorrow with Today's Technology - Where Military Precision Meets Construction Excellence"*

### 🚀 **Pure Tailwind Benefits Achieved:**
- ✅ **Zero Custom CSS**: All styling uses Tailwind utilities
- ✅ **Improved Performance**: Smaller bundle size, better caching
- ✅ **Enhanced Maintainability**: Single source of truth for styling
- ✅ **Better Developer Experience**: IntelliSense, autocomplete, tooling support
- ✅ **Future-Proof**: Compatible with Tailwind CSS v4 and beyond
- ✅ **Consistent Design System**: Component-based architecture
- ✅ **Accessibility First**: Built-in Tailwind accessibility utilities

---

*Brand Guidelines v2.6.0 | September 22, 2025 | MH Construction LLC | Pure Tailwind CSS v4 Implementation*
