# Visual Testing Guide - Responsive Design Fixes

**Category:** Development - Testing & QA  
**Last Updated:** December 14, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Development Index](./development-index.md)
- [📱 Responsive Design Fixes 2025](./responsive-design-fixes-2025.md)
- [🧪 Testing Guide](../../testing/mh-testing-guide.md)
- [🏠 Master Index](../master-index.md)

---

## Quick Visual Testing Checklist

### Desktop (1920px)

```bash
# Test pages with card components
- [ ] Homepage (/)
  - [ ] Features Section cards
  - [ ] Core Values Section cards
  - [ ] Services Showcase cards
  - [ ] Why Partner Section cards

- [ ] Services Page (/services)
  - [ ] Service flip cards
  - [ ] Specialty service cards
  - [ ] Grant-funded cards

- [ ] All card text stays within boundaries
- [ ] Hover states work correctly
- [ ] Flip animations smooth
```

### Tablet (768px)

```bash
# Grid layouts adjust properly
- [ ] Cards display in 2-column grid where applicable
- [ ] Spacing reduces appropriately
- [ ] Text sizes scale down
- [ ] All content readable
- [ ] No horizontal scrolling
```

### Mobile (375px - iPhone 12/13/14)

```bash
# Critical mobile tests
- [ ] Single column card layout
- [ ] All text visible and readable
- [ ] No text overflow beyond card edges
- [ ] Long words wrap correctly
- [ ] Touch targets minimum 44px
- [ ] Flip cards work on tap
- [ ] Scrollable content on card backs works
- [ ] No horizontal scrolling on any page
- [ ] Proper spacing between cards
```

### Small Mobile (320px - iPhone SE)

```bash
# Extra small screen tests
- [ ] Content still fits
- [ ] Container padding adequate (1rem)
- [ ] Text remains readable
- [ ] No layout breaking
- [ ] Touch targets still accessible
```

## Device Testing Matrix

| Device                  | Width  | Test Priority | Status |
| ----------------------- | ------ | ------------- | ------ |
| iPhone SE               | 320px  | High          | ☐      |
| iPhone 12/13/14         | 390px  | Critical      | ☐      |
| iPhone 12/13/14 Pro Max | 428px  | High          | ☐      |
| iPad Mini               | 744px  | Medium        | ☐      |
| iPad Air/Pro            | 820px  | Medium        | ☐      |
| Desktop 1080p           | 1920px | Critical      | ☐      |
| Desktop 4K              | 2560px | Low           | ☐      |

## Component-Specific Tests

### ServiceCard Component

**Location:** Services page, main flip cards

**Tests:**

1. **Front Side:**
   - [ ] Icon displays correctly at all sizes
   - [ ] Title fits within card
   - [ ] Subtitle visible
   - [ ] Description doesn't overflow
   - [ ] "Hover to see details" visible

2. **Back Side:**
   - [ ] Title and icon visible
   - [ ] Features list readable
   - [ ] Benefits list readable
   - [ ] CTA section visible
   - [ ] Content scrollable if too long
   - [ ] Scrollbar styled correctly

### CoreValuesSection Cards

**Location:** Homepage, "Four Core Values"

**Tests:**

1. **Front Side:**
   - [ ] Large gradient icon displays
   - [ ] Value title fits
   - [ ] Description readable
   - [ ] Hover hint visible

2. **Back Side:**
   - [ ] Icon and title visible
   - [ ] Details text scrollable
   - [ ] Key metric box at bottom
   - [ ] All text fits or scrolls

### FeaturesSection Cards

**Note:** This section was removed from the homepage in December 2025. Tests below are retained for historical reference.

**Previous Location:** Homepage, "Modern Tools" section

**Historical Tests:**

1. **Front Side:**
   - [ ] Icon container proper size
   - [ ] Title readable
   - [ ] Description fits
   - [ ] CTA text visible

2. **Back Side:**
   - [ ] Feature list displays
   - [ ] All items with icons
   - [ ] Content scrollable
   - [ ] Key features box visible

## Common Issues to Watch For

### Text Overflow

- ✅ **Fixed:** Text wraps at word boundaries
- ✅ **Fixed:** Long URLs break properly
- ✅ **Fixed:** No text extending beyond card edges

### Spacing Issues

- ✅ **Fixed:** Consistent padding across breakpoints
- ✅ **Fixed:** Proper gap between cards
- ✅ **Fixed:** Icon spacing responsive

### Height Issues

- ✅ **Fixed:** Cards have proper min-height
- ✅ **Fixed:** Overflow content scrollable
- ✅ **Fixed:** Fixed elements don't collapse

### Interaction Issues

- ✅ **Fixed:** Touch targets adequate size
- ✅ **Fixed:** Hover states on desktop
- ✅ **Fixed:** Tap to flip on mobile
- ✅ **Fixed:** Scroll works in content areas

## Browser Testing

### Chrome DevTools Testing

```bash
1. Open Chrome DevTools (F12)
2. Click Toggle Device Toolbar (Cmd+Shift+M / Ctrl+Shift+M)
3. Test these presets:
   - iPhone SE (375x667)
   - iPhone 12 Pro (390x844)
   - iPad Air (820x1180)
   - iPad Pro (1024x1366)
   - Custom (320x568) for extreme test
```

### Firefox Responsive Design Mode

```bash
1. Open Developer Tools (F12)
2. Click Responsive Design Mode (Cmd+Opt+M / Ctrl+Shift+M)
3. Test same devices as Chrome
4. Check Firefox-specific rendering
```

### Safari (iOS Simulator)

```bash
# If on Mac, test with iOS Simulator
1. Open Xcode
2. Open Simulator
3. Choose iPhone models
4. Test in Safari
5. Check for iOS-specific issues
```

## Automated Testing Commands

### Run Responsive Validation

```bash
./scripts/validation/test-responsive-fixes.sh
```

### Build and Test

```bash
npm run build
npm run start
# Then manually test in browser
```

### Lighthouse Mobile Score

```bash
npm run lighthouse:mobile
# Check performance, accessibility scores
```

## Visual Regression Testing

### Screenshots to Take

1. **Homepage - Mobile (375px)**
   - Full page scroll
   - Features section
   - Core values section
   - Services showcase

2. **Services Page - Mobile (375px)**
   - Hero section
   - Service cards (front)
   - Service cards (back/flipped)
   - Specialty cards

3. **Homepage - Tablet (768px)**
   - Same sections as mobile
   - Check 2-column layouts

4. **Homepage - Desktop (1920px)**
   - Same sections as mobile
   - Check 3-column layouts

## Performance Checks

### Core Web Vitals

- [ ] **LCP** < 2.5s (Largest Contentful Paint)
- [ ] **FID** < 100ms (First Input Delay)
- [ ] **CLS** < 0.1 (Cumulative Layout Shift)

### Mobile Performance

- [ ] Page load time < 3s on 3G
- [ ] Interactive time < 5s
- [ ] No layout shifts during load

## Reporting Issues

### Issue Template

```markdown
**Component:** [ComponentName]
**Breakpoint:** [320px/375px/768px/1024px]
**Browser:** [Chrome/Firefox/Safari/Edge]
**Issue:** [Description]
**Expected:** [What should happen]
**Actual:** [What actually happens]
**Screenshot:** [Attach if possible]
```

## Sign-Off Checklist

Before marking responsive design as complete:

- [ ] All validation tests pass
- [ ] Manual testing completed on 3+ devices
- [ ] No console errors on any breakpoint
- [ ] Documentation updated
- [ ] Screenshots archived
- [ ] Performance metrics acceptable
- [ ] Accessibility tested
- [ ] Dark mode tested
- [ ] All PRs merged
- [ ] Stakeholder approval

## Quick Fix Reference

### Text Overflowing?

```tsx
// Add break-words
className = "break-words";
```

### Card Content Too Long?

```tsx
// Add scrollable area
className = "overflow-y-auto scrollbar-thin";
```

### Fixed Element Collapsing?

```tsx
// Add flex-shrink-0
className = "flex-shrink-0";
```

### Spacing Too Large on Mobile?

```tsx
// Use responsive spacing
className = "p-4 sm:p-6 lg:p-8";
```

### Text Too Small on Mobile?

```tsx
// Use responsive text
className = "text-xs sm:text-sm md:text-base";
```

---

**Testing Frequency:** Before each deployment  
**Last Updated:** December 14, 2025  
**Version:** 1.0
