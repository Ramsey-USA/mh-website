# MH Construction Mobile Optimization Guide

## Mobile-First Design Implementation

### Hero Section Mobile Optimization

#### Dynamic Viewport Height (DVH)

- **Implementation**: `min-h-[100dvh] sm:min-h-screen`
- **Reason**: Solves mobile browser address bar issues
- **Benefit**: Prevents content being cut off on mobile devices

#### Responsive Typography Scale

```css
/* Mobile-First Typography Pattern */
text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
text-base sm:text-lg md:text-xl
text-lg sm:text-xl md:text-2xl lg:text-3xl
```

#### Mobile Spacing Adjustments

- **Container Padding**: `py-20 sm:py-0` (adds vertical padding on mobile)
- **Element Spacing**: `space-y-6 sm:space-y-8` (tighter spacing on mobile)
- **Tagline Padding**: `px-4 py-2 sm:px-6 sm:py-3` (smaller on mobile)

### Touch Target Optimization

#### Minimum Touch Targets

- **Standard**: 44px minimum (iOS guidelines)
- **Preferred**: 48px minimum (Android guidelines)
- **Implementation**: Use `p-3` (12px) or larger for clickable elements

#### Navigation Improvements

- **Horizontal Scrolling**: `overflow-x-auto` for mobile navigation
- **Touch-Friendly Icons**: Minimum `size="md"` for MaterialIcon
- **Adequate Spacing**: `min-w-[80px]` for navigation items

### Form Optimization

#### Mobile-Friendly Inputs

```tsx
<input 
  className="w-full px-4 py-3 text-base border-2 rounded-lg focus:ring-2"
  inputMode="email" // Mobile keyboard optimization
  autoComplete="email"
/>
```

#### Button Sizing

```tsx
<Button className="w-full sm:w-auto min-h-[44px] px-6 py-3 text-base">
  Submit
</Button>
```

### Layout Patterns

#### Grid Responsiveness

```css
/* Mobile-first grid pattern */
grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
```

#### Flex Layout Mobile

```css
/* Stack on mobile, row on desktop */
flex-col sm:flex-row
```

#### Container Strategy

```css
/* Progressive container sizing */
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Performance Considerations

#### Image Optimization

- **Responsive Images**: Always use `w-full` and `max-w-*` classes
- **Aspect Ratios**: Use `aspect-video`, `aspect-square` for consistency
- **Loading**: Implement `loading="lazy"` for below-fold images

#### Critical CSS

- **Above-fold**: Ensure hero section styles are inline or critical
- **Font Loading**: Use `font-display: swap` for web fonts

### Testing Checklist

#### Device Testing

- [ ] iPhone SE (375px width)
- [ ] iPhone 12/13/14 (390px width)
- [ ] Samsung Galaxy (360px width)
- [ ] iPad Mini (768px width)
- [ ] iPad Pro (1024px width)

#### Interaction Testing

- [ ] Touch targets are minimum 44px
- [ ] Forms are easy to fill on mobile
- [ ] Navigation works with touch
- [ ] Horizontal scrolling works smoothly
- [ ] No horizontal overflow

#### Visual Testing

- [ ] Text is readable without zooming
- [ ] Hero sections fit in viewport
- [ ] Images scale properly
- [ ] No content cut off
- [ ] Proper spacing on small screens

### Common Mobile Issues

#### Viewport Height Problems

- **Issue**: `100vh` doesn't account for mobile browser UI
- **Solution**: Use `100dvh` for modern browsers, fallback to calculated heights

#### Text Size Issues

- **Issue**: Text too small on mobile devices
- **Solution**: Minimum `text-base` (16px) for body text

#### Touch Target Problems

- **Issue**: Buttons/links too small for fingers
- **Solution**: Minimum 44px touch targets with adequate spacing

#### Horizontal Overflow

- **Issue**: Content extends beyond viewport width
- **Solution**: Use `overflow-x-hidden` on containers, proper max-widths

### Implementation Priority

1. **Critical**: Hero section viewport fixes
2. **High**: Touch target optimization
3. **Medium**: Typography scaling improvements
4. **Low**: Advanced interaction enhancements

### Validation Commands

```bash
# Run mobile responsiveness check
./scripts/validation/check-mobile-responsiveness.sh

# Test specific page on mobile simulator
npx playwright test --project=mobile

# Lighthouse mobile audit
lighthouse --preset=mobile --output=html --output-path=mobile-audit.html
```

## Next Steps

1. Apply mobile optimizations to remaining pages
2. Test on actual mobile devices
3. Run Lighthouse mobile audits
4. Monitor Core Web Vitals on mobile
5. Gather user feedback on mobile experience
