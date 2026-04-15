# Page Compliance Checklist

**Purpose:** Systematic audit tool to verify page compliance with MH standards  
**Version:** 1.1.0  
**Last Updated:** April 15, 2026  
**Use Case:** Run this checklist on any page to ensure consistency

---

## 📋 How to Use This Checklist

1. Open the page file in your editor
2. Go through each section below
3. Check off ✅ items that pass
4. Fix ❌ items that fail
5. Document any exceptions in comments

---

## 🏗️ Page Structure

### Hero Section

- [ ] Hero section exists and is first visible element
- [ ] Full viewport height with `h-screen flex items-center justify-center`
- [ ] Uses one of three approved hero patterns (see unified-component-standards.md)
- [ ] Brand color emphasis on title (`text-brand-secondary` for hero titles)
- [ ] PageNavigation component at bottom (`absolute bottom-0 left-0 right-0`)
- [ ] Responsive padding: `pt-16 sm:pt-24 md:pt-32 lg:pt-40` and `pb-12 sm:pb-16 md:pb-20 lg:pb-28`

### Section Structure

- [ ] All sections have unique `id` attributes for anchor links
- [ ] Section IDs use kebab-case (e.g., `id="core-values"`)
- [ ] Sections use standard class: `relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden`
- [ ] Content wrapped in: `relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`

### Page Bottom

- [ ] NextStepsSection included as final section (before footer)
- [ ] NextStepsSection loaded via dynamic import with `ssr: true`

---

## 🎨 Background Patterns

### Required Elements (ALL Sections)

- [ ] DiagonalStripePattern included (45deg, hunter green #386851)
- [ ] Pattern opacity: `opacity-[0.03] dark:opacity-[0.05]`
- [ ] Large brand color blobs included (w-96 h-96)
- [ ] Top-right blob: `top-20 right-[15%]` with `from-brand-primary/10`
- [ ] Bottom-left blob: `bottom-20 left-[15%]` with `from-brand-secondary/10`
- [ ] Both blobs use `blur-3xl rounded-full`

### Deprecated Patterns (MUST NOT EXIST)

- [ ] ❌ No complex gradients on base background (e.g., `from-white via-gray-50 to-white`)
- [ ] ❌ No small animated blobs (w-32, w-40)
- [ ] ❌ No `animate-pulse` on background elements
- [ ] ❌ No radial gradient overlays

---

## 📝 Typography

### Section Headers

- [ ] Use two-line gradient pattern (subtitle + main title)
- [ ] Container has `overflow-visible` class
- [ ] Both spans (subtitle and title) have `overflow-visible`
- [ ] Main title uses gradient: `bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent`
- [ ] Subtitle uses solid color: `text-gray-700 dark:text-gray-200`
- [ ] Icon included with blur glow layer and decorative lines
- [ ] Responsive scaling: `text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl`

### Font Weights

- [ ] Hero titles use `font-black` (900)
- [ ] Section main titles use `font-black` (900)
- [ ] Section subtitles use `font-semibold` (600)
- [ ] Card titles use `font-bold` (700)
- [ ] Body text uses `font-normal` (400)
- [ ] Descriptions use `font-light` (300)

### Color Accessibility

- [ ] `text-brand-primary` used for all-size text (6.43:1 contrast)
- [ ] `text-brand-secondary` ONLY used for large text 18pt+ (2.82:1 contrast)
- [ ] `text-brand-secondary-text` or `text-secondary-700` used for body text
- [ ] ❌ No usage of deprecated `text-brand-accent`

---

## 🎴 Card Components

### Modern Card Structure

- [ ] Uses modern div structure (not old `<Card>` component)
- [ ] Animated border glow with `absolute -inset-2` and `blur-xl`
- [ ] Border glow uses `opacity-20` default, `opacity-100` on hover
- [ ] Group hover effects: `group-hover:animate-pulse`
- [ ] Card lift on hover: `group-hover:-translate-y-1`
- [ ] Shadow enhancement: `shadow-lg` to `shadow-2xl`
- [ ] Border transition: `border-gray-200` to `border-transparent`

### Top Accent Bar (REQUIRED)

- [ ] h-2 gradient bar at top of every card
- [ ] Uses appropriate color theme:
  - Green: `from-brand-primary via-brand-primary-dark to-brand-primary-darker`
  - Bronze: `from-brand-secondary via-bronze-700 to-brand-secondary`
  - Government: `from-slate-600 via-gray-700 to-slate-600` (public-sector only)

### Card Icons

- [ ] Icon has nested blur layers (outer blur + inner gradient container)
- [ ] Outer blur: `absolute -inset-2` with `blur-lg`
- [ ] Inner container: `rounded-xl bg-gradient-to-br` with shadow-xl
- [ ] Icon scales on hover: `group-hover:scale-110`
- [ ] Icon uses white text: `text-white drop-shadow-lg`

### Card Typography

- [ ] Titles: `text-lg sm:text-xl md:text-2xl font-bold`
- [ ] Body: `text-sm sm:text-base md:text-lg leading-relaxed`
- [ ] Proper color contrast for dark mode

---

## 🎯 Icons & Emojis

### Material Icons Policy

- [ ] All icons use MaterialIcon component
- [ ] Import from: `@/components/icons/MaterialIcon`
- [ ] Appropriate size prop used: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`
- [ ] Icons have proper className for colors

### Emoji-Free Policy (CRITICAL)

- [ ] ❌ ZERO emojis in .tsx/.jsx/.ts/.js files
- [ ] ❌ No emoji in JSX/TSX strings
- [ ] ❌ No emoji in code comments
- [ ] ✅ Emojis only permitted in .md documentation files

**Check these common violations:**

```tsx
// ❌ WRONG
<span>✅ Complete</span>
<span>🎯 Target</span>
// Comment: ✓ Done

// ✅ CORRECT
<MaterialIcon icon="check_circle" className="text-brand-primary" />
<MaterialIcon icon="target" className="text-brand-primary" />
// Comment: Complete
```

---

## 🔘 Buttons & CTAs

### Button Component

- [ ] Uses Button component from `@/components/ui`
- [ ] Appropriate variant: `primary`, `secondary`, `outline`, `neutral`, `default`, `destructive`, `ghost`, `link`
- [ ] Appropriate size: `sm`, `default`, `lg`, `xl`
- [ ] Group class for hover effects: `className="group"`
- [ ] Icons scale on hover: `group-hover:scale-110`
- [ ] Minimum height: 44px (WCAG compliant)

### Touch Accessibility

- [ ] All interactive elements have `touch-manipulation` class
- [ ] Buttons meet 44px minimum touch target
- [ ] Proper focus states: `focus:ring-2 focus:ring-brand-primary`

---

## 📱 Responsive Design

### Grid Layouts

- [ ] Uses mobile-first approach: `grid-cols-1` as base
- [ ] Standard 3-column: `sm:grid-cols-2 lg:grid-cols-3`
- [ ] Standard 4-column: `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- [ ] Consistent gap: `gap-6 lg:gap-8`

### Text Scaling

- [ ] All text uses responsive classes (base, sm, md, lg, xl)
- [ ] Hero titles scale: `text-lg` → `xl:text-5xl`
- [ ] Section headers scale: `text-3xl` → `lg:text-7xl`
- [ ] Body text scales: `text-sm` → `md:text-lg`

### Padding & Spacing

- [ ] Sections use: `py-12 sm:py-16 lg:py-20 xl:py-24`
- [ ] Section headers: `mb-16 sm:mb-20`
- [ ] Card padding: `p-6 sm:p-8`

---

## 🎭 Animations & Transitions

### Standard Animations

- [ ] All transitions use `duration-300`
- [ ] Hover effects use `transition-all duration-300`
- [ ] Cards lift on hover: `hover:-translate-y-1`
- [ ] Icons scale on hover: `hover:scale-110` or `group-hover:scale-110`
- [ ] Shadows enhance on hover: `hover:shadow-2xl`

### FadeInWhenVisible

- [ ] Used on appropriate sections (not overused)
- [ ] Import from: `@/components/animations/FramerMotionComponents`

---

## 🔍 SEO & Analytics

### Meta & Structured Data

- [ ] Page has StructuredData component
- [ ] SEO data imported from `@/lib/seo/page-seo-utils`
- [ ] Breadcrumb schema included (non-homepage pages)
- [ ] Organization schema included where appropriate

### Analytics Tracking

- [ ] `usePageTracking` hook called with page name
- [ ] Import from: `@/lib/analytics/hooks`
- [ ] Page name matches route (e.g., "About" for /about)

### Breadcrumbs (Non-Homepage)

- [ ] Breadcrumb component included
- [ ] Import from: `@/components/navigation/Breadcrumb`
- [ ] Proper breadcrumb trail configured
- [ ] Schema generated via `generateBreadcrumbSchema`

---

## 🔐 Form Security (Pages with Forms)

### Cloudflare Turnstile Integration

- [ ] Turnstile script loaded via `next/script`
- [ ] Turnstile widget rendered in form (`cf-turnstile` div)
- [ ] Token state managed via useState
- [ ] Token included in form submission data
- [ ] Token reset on submission error
- [ ] Widget re-renders on error for retry

### Trust Indicators

- [ ] Visible security badge in form (shield icon)
- [ ] Security text: "Protected by Cloudflare"
- [ ] Styled appropriately for brand (brand-primary icon color)
- [ ] Dark mode compatible

### Server-Side Verification

- [ ] API route imports `verifyTurnstileToken` from `@/lib/security`
- [ ] Token verified before processing form data
- [ ] Verification enforced in production (graceful skip in dev without secret)
- [ ] Error returned if verification fails

### Rate Limiting

- [ ] Rate limiter applied to form API endpoint
- [ ] Uses sliding window rate limiter from `@/lib/security/rate-limiter`
- [ ] Sensible limits set (e.g., 5 submissions per minute)
- [ ] 429 response returned when limit exceeded

### Testing Requirements

- [ ] Turnstile widget renders correctly
- [ ] Form submission includes token
- [ ] API rejects missing/invalid tokens
- [ ] Rate limiting prevents spam
- [ ] Error states show retry option

**Reference:** [Form Security Standards](../../technical/form-security-standards.md)

---

## ⚡ Performance

### Dynamic Imports

- [ ] Below-fold components use dynamic imports
- [ ] Above-fold critical content loaded immediately
- [ ] Appropriate `ssr` setting (true/false) on dynamic imports
- [ ] Loading skeletons provided for lazy components

### Image Optimization

- [ ] Images use Next.js Image component
- [ ] Proper width/height specified
- [ ] WebP format used where possible
- [ ] Lazy loading on below-fold images

---

## 🌙 Dark Mode Support

### Color Classes

- [ ] All text has dark mode variant: `text-gray-900 dark:text-gray-100`
- [ ] All backgrounds have dark mode: `bg-white dark:bg-gray-900`
- [ ] Borders have dark mode: `border-gray-200 dark:border-gray-700`
- [ ] Icons compatible with dark mode

### Testing

- [ ] Page manually tested in dark mode
- [ ] All text readable in dark mode
- [ ] All icons visible in dark mode
- [ ] Proper contrast maintained

---

## 📦 Component Reusability

### Shared Components

- [ ] Uses shared components where appropriate (TestimonialsSection, NextStepsSection)
- [ ] Doesn't duplicate code that exists in shared components
- [ ] Custom components created only when necessary

### Component Organization

- [ ] Page-specific components in appropriate folder (e.g., `/components/about/`)
- [ ] Shared components in `/components/shared-sections/`
- [ ] UI primitives in `/components/ui/`

---

## ✅ Final Verification

### Code Quality

- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] No unused imports
- [ ] Proper formatting (Prettier)

### Test Coverage

- [ ] `npm test` passes (all tests green)
- [ ] Smoke tests updated if using new `COMPANY_INFO` properties
- [ ] Test mocks in these files match actual module exports:
  - `src/app/__tests__/pages-smoke.test.tsx`
  - `src/app/careers/__tests__/page.test.tsx`
  - `src/app/contact/__tests__/ContactPageClient.test.tsx`
  - `src/lib/email/__tests__/email-service.test.ts`

### Browser Testing

- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Mobile responsive (tested on actual device or DevTools)

### Accessibility

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels on interactive elements
- [ ] Semantic HTML structure

---

## 📊 Compliance Score

**Total Items:** 150+  
**Required for Pass:** 95% compliance minimum

**Score Calculation:**

```text
(Checked Items / Total Items) × 100 = Compliance %
```

**Action Required:**

- **95-100%:** ✅ Page compliant, ready for production
- **85-94%:** ⚠️ Minor issues, fix before deployment
- **Below 85%:** ❌ Major issues, requires significant updates

---

## 🔗 Related Documentation

- [Component Cheatsheet](../quick-reference/component-cheatsheet.md) - Quick reference
- [Unified Component Standards](../../branding/standards/unified-component-standards.md) - Complete standard
- [Page Template Guide](./page-template-guide.md) - New page boilerplate
- [Common Mistakes](./common-mistakes.md) - What to avoid

---

**Last Updated:** April 15, 2026  
**Maintained by:** MH Construction Development Team
