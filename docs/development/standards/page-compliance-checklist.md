# Page Compliance Checklist

**Purpose:** Systematic audit tool to verify page compliance with MH standards  
**Version:** 1.4.0  
**Last Updated:** July 3, 2026  
**Use Case:** Run this checklist on any page to ensure consistency

**Brand Congruency:** This checklist is a required gate for typography, color, voice, trust content, accessibility, and naming alignment.

**Copy Congruency Rule:** Shared phrasing across pages is acceptable; duplicated phrasing within the same page is not.

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

- [ ] Conforms to [Navigation Overlay and Header Action Visual Contract](../../branding/standards/unified-component-standards.md#navigation-overlay-and-header-action-visual-contract-canonical)
- [ ] Hero section exists and is first visible element
- [ ] Full viewport height with `h-screen flex items-center justify-center`
- [ ] Uses one of three approved hero patterns (see unified-component-standards.md)
- [ ] Brand color emphasis on title (`text-brand-secondary` for hero titles)
- [ ] Hero does not duplicate global-header contact actions or phone CTA controls
- [ ] PageNavigation component at bottom (`absolute bottom-0 left-0 right-0`)
- [ ] PageNavigation enables `showRemainingPagesOverlay` on hero bar
- [ ] Hero nav row renders 6 cells (Home, Services, Projects, About, Contact, More)
- [ ] `More` opens centered modal overlay with backdrop and close controls
- [ ] Responsive padding: `pt-16 sm:pt-24 md:pt-32 lg:pt-40` and `pb-12 sm:pb-16 md:pb-20 lg:pb-28`

### Global Header

- [ ] Conforms to [Navigation Overlay and Header Action Visual Contract](../../branding/standards/unified-component-standards.md#navigation-overlay-and-header-action-visual-contract-canonical)
- [ ] Global header remains logo-first at all breakpoints
- [ ] MH logo is visually dominant over adjacent header controls on phone widths
- [ ] Phone CTA lives in the global header and exposes the business number
- [ ] Header renders language toggle, compact theme toggle, and hamburger menu together
- [ ] Header tooltip or accessible helper copy remains available for key controls

### Section Structure

- [ ] Conforms to [Container and Modal Visual Contract](../../branding/standards/unified-component-standards.md#container-and-modal-visual-contract-canonical)
- [ ] Section IDs are present when referenced by internal jump links/deep links
- [ ] Section IDs use kebab-case when present (e.g., `id="core-values"`)
- [ ] Sections use standard class: `relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden`
- [ ] Content wrapped in: `relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl`
- [ ] Section wrappers do not use `.container` class
- [ ] Major section framing uses dual-label military pattern (clear primary label + military-themed secondary sublabel)
- [ ] Section/navigation labels include military-themed language consistent with brand messaging standards

### Universal Page Flow

- [ ] Body sections follow `Discover -> Trust -> Proof -> Action`
- [ ] First body section clearly explains what the page is about
- [ ] Trust and Proof sections are not stacked redundantly without distinct jobs
- [ ] Primary CTA appears after enough Trust and Proof to justify action
- [ ] If the page serves multiple audiences, it either branches clearly or should be split into smaller intent-based pages
- [ ] Partner-intent pathways route to `/allies` where appropriate

### Page Bottom

- [ ] Conforms to [Footer Accreditation and Trust Continuity Visual Contract](../../branding/standards/unified-component-standards.md#footer-accreditation-and-trust-continuity-visual-contract-canonical)
- [ ] NextStepsSection included as final section (before footer)
- [ ] NextStepsSection loaded via dynamic import with `ssr: true`
- [ ] Global footer includes accreditation row and it is visible at all breakpoints
- [ ] Accreditation row includes required trust credentials and valid outbound links (for example: AGC, BBB, insurance, chamber memberships)

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

- [ ] Conforms to [Heading and Typography Visual Contract](../../branding/standards/unified-component-standards.md#heading-and-typography-visual-contract-canonical)
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

- [ ] Conforms to [Card Visual Contract](../../branding/standards/unified-component-standards.md#card-visual-contract-canonical)
- [ ] Uses modern div structure (not old `<Card>` component)
- [ ] Animated border glow with `absolute -inset-2` and `blur-xl`
- [ ] Border glow uses `opacity-20` default, `opacity-100` on hover
- [ ] Hover interactions use centralized `hoverMotion.*` tokens (no inline `group-hover:*` patterns)
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
- [ ] Icon hover behavior uses centralized `hoverMotion.*` token utilities
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

## ✍️ Copy and Terminology Quality

- [ ] Public-facing copy avoids repeated sentence-level boilerplate within the same page file
- [ ] Guarded phrasing patterns do not appear more than once in the same page file
- [ ] Page/breadcrumb labels resolve through the dual terminology dictionary when applicable
- [ ] Copy retains factual veteran-owned framing and relationship-first tone without hype
- [ ] For terminology/copy edits, run: `npm test -- src/app/__tests__/public-copy-phrasing-guard.test.ts src/lib/branding/__tests__/page-names.test.ts`

---

## 🔘 Buttons & CTAs

### Button Component

- [ ] Uses Button component from `@/components/ui`
- [ ] Conforms to [Button Visual Contract](../../branding/standards/unified-component-standards.md#button-visual-contract-canonical)
- [ ] Appropriate variant: `primary`, `secondary`, `outline`, `neutral`, `default`, `destructive`, `ghost`, `link`
- [ ] Appropriate size: `sm`, `default`, `lg`, `xl`
- [ ] Button hover and icon motion use centralized tokens from `@/lib/styles/design-tokens`
- [ ] No ad-hoc inline hover transform classes (`hover:scale-*`, `group-hover:scale-*`, `group-hover:rotate-*`)
- [ ] Minimum height: 44px (WCAG compliant)

### Touch Accessibility

- [ ] All interactive elements have `touch-manipulation` class
- [ ] Buttons meet 44px minimum touch target
- [ ] Proper focus states: `focus:ring-2 focus:ring-brand-primary`

---

## 🪟 Containers & Modals

### Modal Overlay Behavior

- [ ] Modal overlays include backdrop + centered panel + visible close button
- [ ] Escape key closes modal/dialog where applicable
- [ ] Backdrop click closes modal/dialog where applicable
- [ ] Body scroll locks while modal overlay is open and restores on close
- [ ] Dialog content is keyboard reachable with visible focus states

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

- [ ] Transitions use standardized timing tokens (`transitionDuration.*`)
- [ ] Hover effects use centralized motion tokens (`hoverMotion.*`)
- [ ] Cards and icons use tokenized hover motion (`hoverMotion.*`) instead of inline transform classes
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

- [ ] Conforms to [Form Field and Form Shell Visual Contract](../../branding/standards/unified-component-standards.md#form-field-and-form-shell-visual-contract-canonical)

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

- **[Universal Page Flow Standard](./universal-page-flow-standard.md)** - Required body architecture

- [Component Cheatsheet](../quick-reference/component-cheatsheet.md) - Quick reference
- [Unified Component Standards](../../branding/standards/unified-component-standards.md) - Complete standard
- [Page Template Guide](./page-template-guide.md) - New page boilerplate
- [Common Mistakes](./common-mistakes.md) - What to avoid
