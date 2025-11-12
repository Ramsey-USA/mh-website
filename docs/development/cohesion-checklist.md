# Website Cohesion Checklist

**Purpose:** Comprehensive checklist to ensure consistency and cohesion across all pages  
**Last Updated:** November 8, 2025 | **Version:** 1.0.0 | **Status:** ✅ Official Standard

---

## 🧭 Quick Navigation

- [🗂️ Development Index](./development-index.md)
- [📖 Consistency Guide](./consistency-guide.md) - Complete implementation standards
- [🎨 Component Standards](../branding/standards/component-standards.md)
- [🏠 Master Index](../master-index.md)

---

## 🎯 Overview

This checklist consolidates all cohesion strategies to ensure new or edited pages maintain
consistency with the rest of the MH Construction website.

**Key Principle:** When in doubt, reference existing pages (Home, About, Services) for proven patterns.

---

## ✅ Brand & Visual Identity

### Colors

- [ ] **Primary:** Hunter Green (`#386851`) for headers, primary actions
- [ ] **Secondary:** Leather Tan (`#BD9264`) for accents, emphasis
- [ ] **Grays:** Proper gray scale for text and backgrounds
- [ ] **Dark Mode:** All colors have dark mode variants using `dark:` prefix
- [ ] **Semantic Colors:** Success (green), warning (yellow), error (red) when appropriate
- [ ] **No Custom Colors:** Only use brand palette from Tailwind config

**Reference:** [Color System](../branding/standards/color-system.md)

---

### Icons

- [ ] **Material Icons Only:** Use `<MaterialIcon>` component exclusively
- [ ] **No Emojis:** Never use emoji characters in source code (❌ 🚫 ⚠️)
- [ ] **Consistent Sizing:** `xs`, `sm`, `md`, `lg`, `xl`, `2xl`
- [ ] **Proper Colors:** `text-brand-primary`, `text-brand-secondary`, or semantic colors
- [ ] **Accessibility:** Include `aria-label` or text labels for icon-only buttons

**Reference:** [Icon System Quick Reference](../technical/design-system/icons/icon-system-quick-reference.md)

---

### Slogans & Messaging

- [ ] **Dedicated Assignments:** Each page uses its assigned slogan from guide
- [ ] **Slogan Component:** Use `<Slogan>` component, not hardcoded text
- [ ] **Tier 1 Flexibility:** Foundation slogans can be reused (ROI, Owner NOT Dollar, Build More)
- [ ] **Tier 2-5 Dedication:** Specialized slogans are page-specific
- [ ] **Proper Variants:** hero, hero-subtitle, tagline, section, footer, inline
- [ ] **Brand Voice:** Matches messaging guidelines (confident, owner-focused, veteran values)

**Reference:** [Slogan Implementation Guide](./reference/slogan-implementation-guide.md)

---

### Partnership Type Clarity

- [ ] **Client Partnerships:** Use handshake icon (🏠), hunter green, "Your Project Partner"
- [ ] **Trade Partnerships:** Use construction icon (🏗️), leather tan, "Building Professional Partnerships"
- [ ] **Proper Routes:** Client (`/services`, `/booking`) vs Trade (`/trade-partners`)
- [ ] **Correct CTAs:** "Schedule Consultation" (clients) vs "Join Our Network" (trades)
- [ ] **Visual Identity:** Consistent colors, icons, and messaging per partnership type

**Reference:** [Partnership Implementation Guide](./reference/partnership-implementation-guide.md)

---

## 📐 Layout & Structure

### Page Layout

- [ ] **Hero Section First:** Every page starts with hero section
- [ ] **Hero Height:** `min-h-[60vh]` or similar, not full viewport
- [ ] **Gradient Background:** `bg-gradient-to-br from-hunter-green to-hunter-green/80`
- [ ] **Container:** `container mx-auto px-4` for content width
- [ ] **Vertical Spacing:** `py-20` on sections, `mb-16` between major elements
- [ ] **No Badges on Pages:** Veteran badges only in modals, not hero sections

**Reference:** [Consistency Guide - Page Layout](./consistency-guide.md#page-layout-standards)

---

### Section Standards

- [ ] **Section Padding:** `py-12 lg:py-16` or `py-16 lg:py-24` for major sections
- [ ] **Background Alternation:** White/gray alternating sections for visual rhythm
- [ ] **Max Width:** Content containers use `max-w-7xl` or `max-w-5xl` for readability
- [ ] **Spacing Consistency:** Use standard spacing scale (4, 6, 8, 12, 16, 20, 24)
- [ ] **Section Headers:** Follow standard header pattern with proper sizing

**Reference:** [Consistency Guide - Section Standards](./consistency-guide.md#section-standards)

---

## 🎨 Typography

### Hero Typography

- [ ] **Main Title:** `text-5xl md:text-6xl lg:text-7xl font-bold`
- [ ] **Hero Slogan:** Use `<Slogan variant="hero-subtitle">` component
- [ ] **Hero Tagline:** Use `<Slogan variant="tagline">` component
- [ ] **Responsive Sizing:** Proper breakpoints for mobile, tablet, desktop
- [ ] **Proper Tracking:** `tracking-tight` for large text
- [ ] **Line Height:** `leading-tight` or `leading-snug` for headlines

---

### Section Headers

- [ ] **Standard Header Pattern:**

  ```tsx
  <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
    Section Title
  </h2>
  <p className="text-base lg:text-lg text-center mb-12 text-gray-600 dark:text-gray-300 max-w-5xl mx-auto">
    Section description
  </p>
  ```

- [ ] **Consistent Sizing:** h2 = 3xl/4xl, h3 = xl/2xl, h4 = lg/xl
- [ ] **Center Alignment:** Section headers typically centered
- [ ] **Description Max Width:** `max-w-5xl mx-auto` for readability
- [ ] **Bottom Margin:** `mb-12` or `mb-16` before section content

**Reference:** [Typography Examples](../technical/design-system/typography-examples-clean.md)

---

### Body Text

- [ ] **Base Size:** `text-sm sm:text-base` for paragraphs
- [ ] **Leading:** `leading-relaxed` for comfortable reading
- [ ] **Colors:** `text-gray-700 dark:text-gray-300` for body text
- [ ] **Max Width:** Long-form text uses `max-w-3xl` or `max-w-4xl`
- [ ] **Link Styling:** `text-brand-primary hover:text-brand-primary/80 underline`

---

## 🧩 Components

### Button Usage

- [ ] **Import:** `import { Button } from '@/components/ui'`
- [ ] **Variants:** `primary`, `secondary`, `outline`, `ghost`, `destructive`, `link`
- [ ] **Sizes:** `sm`, `default`, `lg`, `xl`, `icon`, `icon-sm`, `icon-lg`
- [ ] **Touch Targets:** All buttons automatically 44px minimum height
- [ ] **Icons with Buttons:** Use MaterialIcon inside button for consistency
- [ ] **Proper CTAs:** "Schedule Consultation", "Get Quote", "Contact Us", "View Portfolio"

**Example:**

```tsx
<Button variant="primary" size="xl">
  <MaterialIcon icon="calendar_month" size="sm" className="mr-2" />
  Schedule Consultation
</Button>
```

**Reference:** [Consistency Guide - Button Component](./consistency-guide.md#button-component)

---

### Card Component

- [ ] **Import:** `import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui'`
- [ ] **Border Radius:** `rounded-3xl` (already in base Card)
- [ ] **Padding:** `p-8` for standard cards, `p-6` for compact
- [ ] **Border:** `border border-gray-200 dark:border-gray-700`
- [ ] **Hover Effects:** `hover:shadow-xl hover:-translate-y-2 transition-all duration-300`
- [ ] **Icon Placement:** MaterialIcon at top, centered, 5xl size
- [ ] **Card Grid:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`

**Example:**

```tsx
<Card className="hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
  <CardHeader className="text-center">
    <MaterialIcon
      icon="construction"
      className="mb-4 text-brand-primary text-5xl"
    />
    <CardTitle className="text-xl sm:text-2xl">Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
      Card content
    </p>
  </CardContent>
</Card>
```

**Reference:** [Component Standards - Card Component](../branding/standards/component-standards.md#card-component-standards)

---

### Form Components

- [ ] **Input Height:** `min-h-[44px]` for touch targets
- [ ] **Touch Class:** `touch-manipulation` on all inputs and buttons
- [ ] **Label Pattern:** Block label above input with proper spacing
- [ ] **Focus States:** `focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20`
- [ ] **Error States:** Red border and error message below field
- [ ] **Dark Mode:** All form elements have dark variants
- [ ] **Placeholder Text:** Use sparingly, prefer labels

**Example:**

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
    Name
  </label>
  <input
    type="text"
    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 
      rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
      focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 
      transition-all duration-300 touch-manipulation min-h-[44px]"
  />
</div>
```

**Reference:** [Component Standards - Form Components](../branding/standards/component-standards.md#form-component-standards)

---

### Slogan Component

- [ ] **Import:** `import { Slogan, HeroWithSlogan, SloganDisplay } from '@/components/ui/Slogan'`
- [ ] **Page Assignment:** Use correct page identifier (`page="homepage"`, `page="about"`, etc.)
- [ ] **Context:** Specify context (`context="hero"`, `context="tagline"`, etc.)
- [ ] **Variant:** Choose appropriate variant (hero, hero-subtitle, tagline, section, footer)
- [ ] **No Hardcoding:** Never hardcode slogan text, use component
- [ ] **Tier Awareness:** Know which slogans are reusable vs dedicated

**Example:**

```tsx
<Slogan page="services" context="hero" variant="hero-subtitle" />
```

**Reference:** [Slogan Implementation Guide](./reference/slogan-implementation-guide.md)

---

## 📱 Responsive & Mobile

### Mobile-First Approach

- [ ] **Base Styles:** Start with mobile styles (no breakpoint prefix)
- [ ] **Progressive Enhancement:** Add `sm:`, `md:`, `lg:`, `xl:` for larger screens
- [ ] **Touch Targets:** Minimum 44x44px for all interactive elements
- [ ] **Touch Class:** `touch-manipulation` on buttons, links, inputs
- [ ] **Font Scaling:** Responsive text sizing with proper breakpoints
- [ ] **Image Optimization:** Proper sizing and lazy loading

---

### Grid Responsiveness

- [ ] **Standard Grid Pattern:** `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`
- [ ] **Card Grids:** 1 column mobile, 2 tablet, 3 desktop (standard), 4 for large sets
- [ ] **Spacing:** `gap-6 lg:gap-8` for consistent spacing
- [ ] **Full Width Mobile:** Cards stack vertically on mobile
- [ ] **Breakpoint Logic:** sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px

---

### Mobile Testing

- [ ] **Test All Breakpoints:** xs (320px), sm (640px), md (768px), lg (1024px), xl (1280px)
- [ ] **Touch Testing:** All interactive elements work on touch devices
- [ ] **Scroll Performance:** Smooth scrolling without jank
- [ ] **Navigation:** Mobile menu works correctly
- [ ] **Images:** Load and display correctly at all sizes

**Reference:** [Mobile Quick Reference](../technical/design-system/mobile-quick-reference.md)

---

## ♿ Accessibility

### Semantic HTML

- [ ] **Proper Headings:** h1 → h2 → h3 hierarchy (no skipping levels)
- [ ] **Section Elements:** `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`
- [ ] **Form Labels:** Every input has associated `<label>` element
- [ ] **Button vs Link:** Use `<button>` for actions, `<a>` for navigation
- [ ] **ARIA Labels:** Icon-only elements have `aria-label` or `aria-labelledby`

---

### Color Contrast

- [ ] **WCAG AA:** 4.5:1 for normal text, 3:1 for large text and UI components
- [ ] **Hunter Green on White:** ✅ Passes (sufficient contrast)
- [ ] **Text on Backgrounds:** Always test contrast, especially with images
- [ ] **Dark Mode Contrast:** Verify contrast in both light and dark themes
- [ ] **Link Contrast:** Links distinguishable from surrounding text

---

### Keyboard Navigation

- [ ] **Tab Order:** Logical tab order through page
- [ ] **Focus Indicators:** Visible focus states on all interactive elements
- [ ] **Skip Links:** Consider skip-to-content link for long pages
- [ ] **Keyboard Shortcuts:** Don't override browser defaults
- [ ] **Form Navigation:** Tab moves between fields, Enter submits

**Reference:** [Component Standards - Accessibility](../branding/standards/component-standards.md#accessibility-standards)

---

## 🎭 Dark Mode

### Dark Mode Support

- [ ] **All Elements:** Every component has dark mode variants
- [ ] **Proper Classes:** `dark:bg-gray-800`, `dark:text-gray-100`, etc.
- [ ] **Border Colors:** `dark:border-gray-700` instead of `dark:border-gray-200`
- [ ] **Shadow Colors:** `dark:shadow-gray-600/50` for proper dark shadows
- [ ] **Icon Colors:** Icons work in both themes
- [ ] **Image Handling:** Images visible and appropriate in both themes

---

## 🔧 Code Standards

### Import Standards

- [ ] **Absolute Imports:** Always use `@/` prefix (`import { X } from '@/components/ui'`)
- [ ] **No Relative Imports:** Never use `../` or `./` for imports
- [ ] **Consistent Grouping:** External imports → Internal imports → Types → Styles
- [ ] **Named Exports:** Prefer named exports over default exports
- [ ] **No Unused Imports:** Remove unused imports before committing

**Reference:** [Development Standards - Import Standards](./development-standards.md#import-standards)

---

### TypeScript

- [ ] **Proper Types:** All props and functions properly typed
- [ ] **No `any`:** Use specific types or `unknown` if type is truly unknown
- [ ] **Interface vs Type:** Use `interface` for component props, `type` for unions/intersections
- [ ] **Export Types:** Export all public types and interfaces
- [ ] **Type Imports:** Use `import type` for type-only imports when possible

---

### Component Structure

- [ ] **Single Responsibility:** Each component does one thing well
- [ ] **Reusability:** Components generic enough for reuse
- [ ] **Props Documentation:** JSDoc comments on all component props
- [ ] **Default Props:** Sensible defaults for optional props
- [ ] **Error Handling:** Graceful handling of missing or invalid props

---

## 🎬 Animations & Interactions

### Animation Standards

- [ ] **Duration:** 300ms for most transitions (`duration-300`)
- [ ] **Easing:** Default Tailwind easing or `ease-in-out`
- [ ] **Transform:** Use `transform` utilities for GPU acceleration
- [ ] **Hover States:** `-translate-y-2` for card lifts, `scale-105` for gentle scale
- [ ] **Transition Class:** `transition-all` or specific properties like `transition-transform`
- [ ] **Reduced Motion:** Respect `prefers-reduced-motion` for accessibility

**Example:**

```tsx
<Card className="hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
```

---

### Interaction Patterns

- [ ] **Hover Effects:** Consistent across similar elements
- [ ] **Active States:** Button press states visible
- [ ] **Loading States:** Spinners or skeletons during async operations
- [ ] **Disabled States:** Visually distinct disabled elements
- [ ] **Success/Error Feedback:** Clear feedback for user actions

**Reference:** [Component Standards - Animation Standards](../branding/standards/component-standards.md#animation--interaction-standards)

---

## 📊 Performance

### Performance Best Practices

- [ ] **Image Optimization:** Use Next.js `<Image>` component
- [ ] **Lazy Loading:** Images and heavy components lazy loaded
- [ ] **Code Splitting:** Route-based code splitting
- [ ] **Bundle Size:** Keep bundle size reasonable, check imports
- [ ] **No Heavy Libraries:** Avoid adding large dependencies without review
- [ ] **CSS-in-JS Minimal:** Prefer Tailwind over styled-components

---

## 📝 Content Standards

### Content Consistency

- [ ] **Voice & Tone:** Professional yet approachable, veteran values emphasized
- [ ] **CTA Language:** Consistent action verbs ("Schedule", "Get", "View", "Contact")
- [ ] **Punctuation:** Consistent use of periods in headings (generally no periods)
- [ ] **Capitalization:** Title case for headings, sentence case for body
- [ ] **Brand Terms:** "MH Construction" (not "MH construction"), "Pacific Northwest"

---

### Partnership Messaging

- [ ] **Client Focus:** "Your Vision, Our Precision", "Your Project Partner"
- [ ] **Trade Focus:** "Building Professional Partnerships", "Join Our Network"
- [ ] **Veteran Heritage:** Emphasize veteran ownership and values appropriately
- [ ] **ROI Definition:** "THE ROI IS THE RELATIONSHIP" as core message
- [ ] **Client-First:** "Building for the Client, NOT the Dollar"

**Reference:** [Messaging Guidelines](../branding/strategy/messaging.md)

---

## ✅ Pre-Deployment Checklist

### Visual Validation

- [ ] Page matches design system standards
- [ ] Colors match brand palette exactly
- [ ] Typography follows responsive patterns
- [ ] Spacing is consistent with other pages
- [ ] Icons are Material Icons (no emojis)
- [ ] Images are optimized and properly sized

---

### Functional Testing

- [ ] All links work correctly
- [ ] Forms submit properly
- [ ] CTAs navigate to correct pages
- [ ] Mobile navigation works
- [ ] Dark mode toggle functions
- [ ] No console errors or warnings

---

### Responsive Testing

- [ ] Tested on mobile (320px-767px)
- [ ] Tested on tablet (768px-1023px)
- [ ] Tested on desktop (1024px+)
- [ ] Touch targets work on mobile
- [ ] Text is readable at all sizes
- [ ] Images scale appropriately

---

### Accessibility Testing

- [ ] Passes WAVE or axe accessibility check
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Forms have proper labels
- [ ] Images have alt text

---

### Code Quality

- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Imports use `@/` prefix
- [ ] Components properly typed
- [ ] Code formatted (Prettier)
- [ ] No unused variables or imports

---

### Documentation

- [ ] Page documented if needed
- [ ] New components documented
- [ ] Props commented with JSDoc
- [ ] Complex logic explained
- [ ] Related docs updated

---

## 📚 Essential Documentation References

### Must-Read Guides

1. **[Consistency Guide](./consistency-guide.md)** ⭐ PRIMARY REFERENCE
   - Complete standards for pages, sections, components, mobile

2. **[Slogan Implementation Guide](./reference/slogan-implementation-guide.md)** ⭐ NEW
   - How to use slogan components across pages

3. **[Partnership Implementation Guide](./reference/partnership-implementation-guide.md)**
   - Client vs Trade partnership distinctions

4. **[Component Standards](../branding/standards/component-standards.md)**
   - Detailed component specifications

5. **[Icon System Quick Reference](../technical/design-system/icons/icon-system-quick-reference.md)**
   - Icon usage patterns and standards

6. **[Mobile Quick Reference](../technical/design-system/mobile-quick-reference.md)**
   - Mobile-first patterns and testing

7. **[Typography Examples](../technical/design-system/typography-examples-clean.md)**
   - Standard typography patterns

8. **[Color System](../branding/standards/color-system.md)**
   - Brand color palette and usage

---

### Quick Reference Pages

Refer to these existing pages as examples of proper implementation:

- **Homepage** - Hero sections, CTAs, full page structure
- **About Page** - Standard sections, team displays, company info
- **Services Page** - Service cards, feature lists, process sections
- **Contact Page** - Forms, location info, CTAs
- **Trade Partners Page** - B2B messaging, partnership focus

---

## 🎯 Key Takeaways

### The 7 Pillars of Cohesion

1. **Brand Consistency** - Colors, icons, messaging match across all pages
2. **Component Reuse** - Use existing components, don't create duplicates
3. **Layout Patterns** - Follow established page and section structures
4. **Typography Standards** - Consistent heading sizes and responsive patterns
5. **Mobile-First Design** - All pages work perfectly on all devices
6. **Accessibility First** - Every page is keyboard and screen reader friendly
7. **Code Quality** - Clean, typed, well-documented code with `@/` imports

---

### When Creating New Pages

**Process:**

1. ✅ Review this checklist before starting
2. ✅ Check similar existing pages for patterns
3. ✅ Use established components (Button, Card, Slogan, etc.)
4. ✅ Follow typography and layout standards
5. ✅ Test responsive behavior early
6. ✅ Validate accessibility as you build
7. ✅ Review checklist before committing

**Remember:** Consistency is MORE important than creativity. Match existing patterns first.

---

### When Editing Existing Pages

**Process:**

1. ✅ Understand the existing pattern before changing
2. ✅ If changing one page, consider if others need the same change
3. ✅ Maintain established component usage
4. ✅ Don't break responsive behavior
5. ✅ Test dark mode after changes
6. ✅ Verify accessibility hasn't regressed

**Remember:** Changes should improve consistency, not introduce new patterns.

---

## 🚀 Quick Win Strategies

### Fast Cohesion Improvements

**Typography Consistency:**

- Search for inconsistent heading patterns
- Replace with standard section header pattern
- Use `<Slogan>` component instead of hardcoded taglines

**Component Usage:**

- Replace custom buttons with `<Button>` component
- Standardize card layouts using `<Card>` components
- Use `<MaterialIcon>` instead of emoji or custom icons

**Spacing Standardization:**

- Apply consistent section padding (`py-16 lg:py-24`)
- Use standard gap values (`gap-6 lg:gap-8`)
- Ensure `max-w-7xl` or `max-w-5xl` on containers

**Dark Mode Fixes:**

- Add `dark:` variants to any missing elements
- Update shadow colors for dark mode
- Test border visibility in dark theme

**Mobile Optimization:**

- Add responsive text sizing to fixed-size headings
- Ensure touch targets are 44px minimum
- Test grid layouts collapse properly

---

## 🔍 Finding Inconsistencies

### How to Audit Pages

**Visual Audit:**

1. Compare with homepage and key pages side-by-side
2. Check color usage matches brand palette
3. Verify icon consistency (all Material Icons?)
4. Review spacing feels consistent
5. Test dark mode appearance

**Code Audit:**

```bash
# Search for potential issues
grep -r "emoji" src/  # Should return nothing
grep -r "../" src/app/  # Check for relative imports
grep -r "px-" src/app/ | grep -v "px-4\|px-6\|px-8"  # Non-standard padding
```

**Component Audit:**

- Are custom button styles being used instead of `<Button>`?
- Are slogans hardcoded instead of using `<Slogan>`?
- Are there duplicate components that could use shared ones?
- Are Material Icons consistently used?

---

## 📞 Getting Help

### When You're Unsure

**Check These First:**

1. [Consistency Guide](./consistency-guide.md) - Most questions answered here
2. Similar existing pages - See how others solved it
3. Component documentation - Check component props and examples
4. This cohesion checklist - Review relevant sections

**Still Stuck?**

- Review related documentation links
- Check the component implementation
- Look for examples in existing pages
- Document your question for team discussion

---

## 🎉 Success Indicators

### Your Page/Edit is Cohesive When

✅ It looks like it belongs with other MH Construction pages  
✅ Colors, typography, and spacing match the design system  
✅ Components are reused from the shared component library  
✅ It works perfectly on mobile, tablet, and desktop  
✅ Dark mode looks as good as light mode  
✅ Accessibility tools report no major issues  
✅ Code follows import and TypeScript standards  
✅ Similar elements behave consistently  
✅ A new user wouldn't notice it's a different page

---

**Version:** 1.0.0  
**Last Updated:** November 8, 2025  
**Maintained by:** MH Construction Development Team  
**Status:** ✅ Active - Official Standard

---

**Remember:** "Consistency is the foundation of great user experience."
