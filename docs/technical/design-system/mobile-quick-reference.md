# MH Construction Mobile Standards - Quick Reference

This is a quick reference guide for developers implementing mobile-optimized components on the MH Construction website.

## 🎯 Essential Mobile Classes

### Typography Scaling

```tsx
// Headers: Much larger mobile sizes for better impact and readability
text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl

// Body text: Enhanced readability with larger mobile base sizes
text-base xs:text-lg sm:text-xl md:text-xl

// Large descriptions: More prominent and readable across all breakpoints
text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
```

### Spacing Progression

```tsx
// Padding: 12px → 16px → 24px → 32px
px-3 xs:px-4 sm:px-6 lg:px-8

// Margin/gaps: 8px → 12px → 16px → 24px
gap-2 xs:gap-3 sm:gap-4 lg:gap-6

// Vertical spacing: 24px → 32px → 40px → 64px
py-6 xs:py-8 sm:py-10 lg:py-16
```

### Touch Targets

```tsx
// Minimum touch target (44px)
p-2.5 xs:p-3 min-h-[44px] min-w-[44px] touch-manipulation

// Recommended touch target (48px) 
p-3 xs:p-3.5 min-h-[48px] min-w-[48px] touch-manipulation

// Form inputs
px-3 xs:px-4 py-2.5 xs:py-3 min-h-[44px] touch-manipulation
```

## 📱 Component Templates

### Button (Mobile-Optimized)

```tsx
<button className="px-4 xs:px-5 sm:px-6 py-2.5 xs:py-3 min-h-[44px] bg-brand-primary hover:bg-brand-accent text-white text-sm xs:text-base font-medium rounded-lg hover:scale-105 transition-all duration-300 touch-manipulation">
  {children}
</button>
```

### Card (Mobile-Optimized)

```tsx
<div className="bg-white p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation">
  <h3 className="text-lg xs:text-xl sm:text-xl md:text-2xl font-semibold mb-2">
    {title}
  </h3>
  <p className="text-sm xs:text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
    {description}
  </p>
  <button className="w-full px-4 py-2.5 xs:py-3 bg-brand-primary text-white text-sm xs:text-base rounded-lg touch-manipulation">
    Action
  </button>
</div>
```

### Section Header (Mobile-Optimized)

```tsx
<h2 className="mb-4 xs:mb-5 sm:mb-6 font-black text-gray-900 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
  <span className="block mb-2 xs:mb-3 font-semibold text-gray-700 text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight">
    {subtitle}
  </span>
  <span className="block bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent">
    {mainTitle}
  </span>
</h2>
```

### Grid Layout (Mobile-Optimized)

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6">
  {items.map(item => <Item key={item.id} {...item} />)}
</div>
```

## 🎨 Brand Classes

### Colors

```scss
// Primary brand colors
bg-brand-primary hover:bg-brand-accent
text-brand-primary
border-brand-primary

// Gradients for headers
bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent
```

### Shadows

```scss
// Brand shadows
shadow-brand hover:shadow-brand-lg
```

## 📐 Layout Standards

### Container

```tsx
<div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
  {content}
</div>
```

### Section

```tsx
<section className="relative py-6 xs:py-8 sm:py-10 lg:py-16 touch-manipulation">
  <div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
    {content}
  </div>
</section>
```

### Navigation Grid

```tsx
<div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-3 max-w-xs xs:max-w-sm sm:max-w-md">
  {navItems.map(item => <NavItem key={item.href} {...item} />)}
</div>
```

## ⚡ Performance Classes

### Required for all interactive elements

```scss
.touch-manipulation {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
```

### Animation performance

```scss
.gpu-acceleration {
  transform: translateZ(0);
  will-change: transform;
  backfaceVisibility: hidden;
}
```

## 🧪 Testing Checklist

### Quick Mobile Check

- [ ] Text readable at 320px width
- [ ] Touch targets minimum 44px
- [ ] No horizontal scroll
- [ ] Proper spacing between elements
- [ ] `touch-manipulation` on interactive elements

### Breakpoint Testing

- [ ] 320px (iPhone SE)
- [ ] 375px (iPhone 12/13/14)  
- [ ] 475px (Large phones)
- [ ] 640px (Small tablets)

---

**Quick Commands:**

```bash
# Test responsive design
npx playwright test --project=mobile

# Check mobile lighthouse score
npx lighthouse https://localhost:3000 --preset=mobile

# Verify touch targets
npm run test:accessibility
```

Save this reference for consistent mobile implementations across the MH Construction website!
