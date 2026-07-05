# MH Construction Website - Development Standards

**Category:** Development - Code Standards  
**Last Updated:** May 15, 2026  
**Version:** 1.2.0  
**Status:** ✅ Active - Mandatory

## 🧭 Quick Navigation

- [📚 Consistency Guide](./consistency-guide.md)
- [🧱 Universal Page Flow Standard](./universal-page-flow-standard.md)
- [🛡 Agent Prompt Runbook](./agent-prompt-runbook.md)
- [Main README](../../../README.md)

---

## 🎯 Purpose

This document establishes mandatory coding standards for the MH Construction website.  
These standards ensure consistency, maintainability, and prevent recurring bugs.

**⚠️ CRITICAL**: Violation of these standards will be caught by ESLint and blocked in CI/CD.

### 🔗 Related Brand Standards

**When implementing features, also consult our brand guidelines:**

- **[MH Branding](../../branding/)** - Modular brand docs,
  standards and visual identity
- **[Universal Page Flow Standard](./universal-page-flow-standard.md)** - Required body-content architecture and page-splitting rules
- **[Unified Component Standards](../../branding/standards/unified-component-standards.md)** - Responsive
  typography patterns and hero section requirements
- **[Color System](../../branding/standards/color-system.md)** - Brand colors and usage
  guidelines
- **Icon Standards** - See below (Material Icons only, NO emojis in code)

**These branding standards are mandatory and enforced alongside technical standards.**

---

## 🛡 Branding Congruency Standard (100% Required)

All implementation work must remain fully congruent with MH branding.
Any change that fails one of the checks below is non-compliant.

### Mandatory Checks

1. **Brand visual system preserved**: Use approved colors, typography, layout rhythm, and component standards. Do not introduce off-brand visual treatments without explicit approval.

1. **Voice and messaging preserved**: Use relationship-first, factual language. Preserve veteran-owned framing without hype or slogan-heavy language.

1. **Trust and accreditation content preserved**: Do not remove or downgrade certifications, trust indicators, compliance language, or credibility sections.

1. **Accessibility preserved**: Maintain semantic structure, keyboard access, labels, alt text, and contrast standards.

1. **SEO naming alignment preserved**: Keep page names, headings, slugs, metadata, and labels aligned with approved brand terminology. Avoid unapproved aliases, militarized names, or keyword stuffing.

1. **Approved exception scope preserved**: Patriotic red-to-blue border is allowed only in `WaVobBadge` and nowhere else.

### Required Validation for Branding-Sensitive Changes

- Verify congruency across affected pages, not only the edited file.
- Confirm CTA language and trust messaging match established cross-page terminology.
- Confirm no accreditation or trust component was removed during refactors.
- Confirm metadata naming remains aligned with page content and brand taxonomy.
- Confirm section rhythm uses one approved tier consistently across the page.
- Confirm CTA clusters follow primary-secondary-tertiary emphasis hierarchy.
- Confirm adjacent section headers maintain planned cadence (display vs section scale).
- Confirm deferred placeholders match final section shell styling.
- Run `pnpm font-system:check` after any typography, layout font-loading, document-template, or branding-doc change.
- Run `pnpm docs:sync` when canonical `docs/`, `messages/`, or `documents/` content changes so app mirrors stay aligned before validation.

### Congruency Guardrails for Tooling

Where feasible, enforce these patterns using lint rules or validation scripts:

1. Flag deprecated section spacing shells except allowlisted legacy surfaces.
2. Flag route CTA composition that wraps `Button` with `Link` instead of `Button asChild`.
3. Flag repeated ad-hoc motion transforms (`hover:scale-*`, `hover:-translate-*`, `group-hover:rotate-*`) outside approved component exceptions.
4. Flag utility-important class usage (`!`) in production page/component class strings.
5. Flag deferred placeholders that do not pass through final section className/variant props.

Exception handling:

1. Document scope, reason, and removal/refactor plan for each temporary exception.
2. Keep exceptions file-scoped and time-bounded.

## Website-Wide Visual Guardrails (All Surfaces)

Visual congruency is required for every user-visible surface, not only hero or body sections.

### Required Surface Coverage

For implementation and review, always include applicable checks for:

1. **App shell**: Header, navigation overlay, leadership ribbon, footer trust/accreditation surfaces.
2. **Primary routes**: Marketing, services, projects, contact, careers, resources, and trust-focused pages.
3. **Dynamic templates**: Slug/city/category/detail route templates must preserve heading hierarchy, spacing cadence, CTA hierarchy, and trust blocks.
4. **Route states**: Loading, error, global error, not-found, and offline states must follow the same typography, color, and spacing system.
5. **Form lifecycle states**: Empty, validation error, pending submit, success/failure states must keep tokenized visual behavior and accessibility affordances.
6. **Legal/compliance surfaces**: Privacy, terms, accessibility, and public-sector compliance pages must preserve plain-language naming and trust continuity.
7. **Print/download surfaces**: Print-oriented pages and downloadable wrappers must preserve brand identity with readability-first spacing and contrast.

### Required Visual-State Parity

For each changed component or section family, verify:

1. Default, hover, focus-visible, active, and disabled states are token-driven and consistent.
2. Loading/skeleton states match final shell geometry and spacing rhythm.
3. Error and empty states use consistent heading/CTA hierarchy and trust-preserving language.
4. Mobile and desktop variants preserve section cadence and CTA emphasis.
5. Theme behavior (light/dark/pre-hydration) does not cause trust-surface or contrast regressions.

### Non-Hero Section Similarity Contract

All body sections (everything except hero sections) must look and feel like part of one system.

Required contract:

1. Header consistency: non-hero sections use the canonical section-header treatment and consistent heading cadence.
2. Body font consistency: non-hero body content uses approved body font stack and size tiers.
3. Icon consistency: non-hero icons use MaterialIcon and maintain consistent size/container style by section role.
4. Shell consistency: non-hero section wrappers preserve approved spacing tier, background system, and container width.
5. Drift control: any intentional visual divergence between non-hero neighboring sections must be documented as scope intent or exception.

### Hero Section Similarity Contract

Hero sections are evaluated as a separate visual system and should align with homepage hero characteristics.

1. Hero shell consistency: full-height layout, centered content stack, and bottom PageNavigation placement pattern.
2. Hero typography consistency: H1, subtitle, and supporting body copy hierarchy follow homepage baseline rhythm.
3. Hero interaction consistency: page-navigation row behavior and `More` overlay behavior remain aligned where this pattern is used.
4. Hero visual consistency: approved hero gradient atmosphere and title emphasis treatment are preserved.
5. Drift control: deviations from homepage hero baseline require documented route intent or approved exception.

### Required Review Evidence

Include the following in PR notes for branding-sensitive changes:

1. Before/after screenshots for mobile and desktop.
2. Keyboard-focus validation evidence for CTA and form clusters.
3. Confirmation for affected loading/error/offline/not-found state congruency.
4. PASS/FAIL output from `docs/branding/governance/brand-congruency-master-checklist.md`.
5. PASS/FAIL output from `docs/development/standards/branding-congruency-checklist.md` when implementation changes are included.

### Comprehensive Sweep Execution (Full-Site Audits)

When requested to run a full-site branding sweep, do not sample only core pages.

Required execution pattern:

1. Build a full route/state inventory from `apps/website/src/app`.
2. Build a section inventory from shared section/shell components and route files.
3. Build a button/action inventory for every actionable control class.
4. Build a background treatment inventory for section/shell layers.
5. Record gaps and remediation targets with file paths.

Minimum command set:

1. `rg --files apps/website/src/app | rg '(page|layout|loading|error|global-error|not-found)\\.(tsx|ts|jsx|js)$'`
2. `rg -n '<Button|<a |button\\s|type="submit"' apps/website/src --glob '!**/*.test.*'`
3. `rg -n 'SectionShell|SectionContainer|BrandedContentSection|NextStepsSection|HeroSection' apps/website/src --glob '!**/*.test.*'`
4. `rg -n 'DiagonalStripePattern|bg-linear|bg-gradient|radial-gradient|from-brand|to-brand' apps/website/src --glob '!**/*.test.*'`

Exception note:

1. Third-party platform colors and campaign-specific palettes are allowed only in documented scoped surfaces and must be treated as exceptions, not baseline style patterns.

---

## 🎨 Icon Usage Standards - Material Icons Only

**Effective Date:** December 14, 2025  
**Policy Version:** 1.0  
**Status:** ✅ Mandatory

### 🚨 EMOJI-FREE SOURCE CODE POLICY

**Core Policy:** MH Construction maintains a strict policy prohibiting emojis in all source code files
(.ts, .tsx, .js, .jsx, .vue, etc.)

### ✅ APPROVED PRACTICES

**Material Icons Component Usage:**

```tsx
import { MaterialIcon } from '@/components/icons/MaterialIcon'

// ✅ Correct implementations
<MaterialIcon icon="construction" size="lg" className="text-brand-primary" />
<MaterialIcon icon="military_tech" size="md" />
<MaterialIcon icon="event" size="sm" />
<MaterialIcon icon="phone" size="xl" className="text-blue-600" />
```

**Semantic Icon Mapping:**

| Function              | Material Icon   | Usage Context             |
| --------------------- | --------------- | ------------------------- |
| Construction Projects | `construction`  | Building, projects, work  |
| Veteran Recognition   | `military_tech` | Military service, awards  |
| Scheduling/Calendar   | `event`         | Appointments, dates       |
| Contact Information   | `phone`         | Phone numbers, calls      |
| Email Communication   | `email`         | Email addresses, messages |
| Location/Address      | `place`         | Addresses, locations      |
| Security Features     | `security`      | Protection, safety        |
| Success/Completion    | `check_circle`  | Success states            |
| Warnings/Alerts       | `warning`       | Caution, alerts           |

### ❌ PROHIBITED PRACTICES

**Never Use Emojis in Source Code:**

```tsx
// ❌ NEVER do this in source code
<span>🏗️ Construction Project</span>
<button>📅 Schedule Meeting</button>
title: 'Project Update 🎯'
console.log('🔧 Debug message')
```

### 📋 ACCEPTABLE EMOJI USAGE

**Documentation Files Only:**

- ✅ Markdown files (.md): Emojis enhance readability
- ✅ README files: Visual indicators improve developer experience
- ✅ Project planning: Status indicators and visual hierarchy
- ✅ Commit messages: Brief visual context (optional)

---

## 📊 Analytics Tracking Standards

**Effective Date:** December 26, 2025  
**Status:** ✅ Active

### Core Principles

1. **Easy Integration**: Add `usePageTracking('Page Name')` to track any page
2. **Privacy First**: No PII collection, localStorage only, user-deletable
3. **Comprehensive**: Automatic device, location, traffic source, and session tracking
4. **Admin Only**: Dashboard access restricted to Matt and Jeremy

### Implementation Guide

**Quick Setup:**

```tsx
import { usePageTracking } from "@/lib/analytics/hooks";

export default function MyPage() {
  usePageTracking("Page Name");
  return <div>Content</div>;
}
```

**Tracked Contact Links:**

```tsx
import { TrackedPhoneLink, TrackedEmailLink } from '@/components/analytics/TrackedContactLinks';

<TrackedPhoneLink />
<TrackedEmailLink />
```

**Manual Tracking:**

```tsx
import { trackClick, trackFormSubmit } from "@/lib/analytics/tracking";

<button onClick={() => trackClick("contact-us")}>Contact</button>;
```

### Documentation

- **[Analytics Tracking Guide](../../technical/analytics-tracking-guide.md)** - Complete implementation
- **[Analytics Tracking Guide](../../technical/analytics-tracking-guide.md)** -
  Implementation guide, quick reference cheatsheet, and dashboard access

### Best Practices

✅ **DO:**

- Add tracking to all new pages
- Use descriptive track IDs (e.g., `hero-cta-get-started`)
- Include context in properties (e.g., `{ section: 'footer', variant: 'primary' }`)
- Test tracking in dashboard before deploying

❌ **DON'T:**

- Track sensitive form field values
- Log error messages with user input
- Add tracking to admin-only pages
- Over-track decorative elements

---

## � Form Security Standards

**Effective Date:** April 14, 2026  
**Status:** ✅ Mandatory

### Core Requirement

**All public-facing forms MUST implement Cloudflare Turnstile bot protection.**

This includes:

- Job applications
- Contact forms
- Newsletter signups
- Consultation requests
- Any form submitting user data to an API

### Implementation Requirements

| Requirement        | Client-Side | Server-Side |
| ------------------ | ----------- | ----------- |
| Turnstile Widget   | ✅ Required | —           |
| Trust Indicator    | ✅ Required | —           |
| Token Submission   | ✅ Required | —           |
| Token Verification | —           | ✅ Required |
| Rate Limiting      | —           | ✅ Required |

### Quick Implementation

**Client-side**: Include Turnstile widget + trust indicator in form  
**Server-side**: Verify token with `verifyTurnstileToken()` before processing

### Documentation

- **[Form Security Standards](../../technical/form-security-standards.md)** - Complete implementation guide
- **[Secrets Management](../../technical/secrets-management.md)** - Environment variable handling

### Environment Variables Required

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_site_key  # Client-side
TURNSTILE_SECRET_KEY=your_secret_key          # Server-side
```

### Best Practices

✅ **DO:**

- Add Turnstile to all public forms
- Display visible trust indicators
- Reset token on submission errors
- Test both success and failure paths

❌ **DON'T:**

- Skip Turnstile for "simple" forms
- Store tokens in localStorage
- Expose secret keys in client code
- Bypass verification in production

---

## �📦 Import Standards

### MANDATORY: Use `@/` Absolute Imports

**Rule**: All imports from `src/` must use the `@/` prefix.

#### ✅ CORRECT

```tsx
import { Button, Card } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { useAnalytics } from "@/hooks/useAnalytics";
import { formatPhone } from "@/lib/utils";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/AuthContext";
```

#### ❌ INCORRECT

```tsx
// Never use relative imports for src/ directories
import { Button } from "../../components/ui";
import { MaterialIcon } from "../../../components/icons/MaterialIcon";
import { useAnalytics } from "../hooks/useAnalytics";
```

### Why `@/` Imports?

1. **Consistent** - Same path regardless of file depth
2. **Refactor-safe** - Moving files doesn't break imports
3. **Clear** - Instantly know it's from `src/`
4. **Standard** - Industry best practice for Next.js

### ESLint Enforcement

```json
{
  "no-restricted-imports": [
    "error",
    {
      "patterns": [
        "../**/components/*",
        "../../**/components/*",
        "../**/hooks/*",
        "../**/lib/*"
      ]
    }
  ]
}
```

**Error Message**: "Use @/components/\* instead of relative imports"

---

## 🎨 Animation Standards

### MANDATORY: Use FramerMotionComponents Only

**Rule**: All animations MUST import from `@/components/animations/FramerMotionComponents`.

#### ✅ CORRECT

```tsx
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
  ParallaxScroll,
} from "@/components/animations/FramerMotionComponents";
```

#### ❌ INCORRECT - WILL FAIL BUILD

```tsx
// DynamicAnimations.tsx has been DELETED
import { FadeInWhenVisible } from "@/components/animations/DynamicAnimations";

// Don't create new dynamic wrappers
const FadeIn = dynamic(() => import("./FadeInWhenVisible"), { ssr: false });
```

### Critical Content Visibility Rule

**Rule**: Never wrap critical page content in animations that could cause it to disappear.

#### ✅ CORRECT - Critical Content Always Visible

```tsx
export default function Page() {
  return (
    <>
      {/* Critical content - ALWAYS visible */}
      <h1>Welcome to MH Construction</h1>
      <p className="lead">Professional construction services</p>

      {/* Decorative/supporting content - CAN animate */}
      <FadeInWhenVisible>
        <div className="features-grid">{/* Feature cards */}</div>
      </FadeInWhenVisible>
    </>
  );
}
```

#### ❌ INCORRECT - Critical Content Can Disappear

```tsx
export default function Page() {
  return (
    <FadeInWhenVisible>
      {/* DON'T DO THIS - heading could fail to appear! */}
      <h1>Welcome to MH Construction</h1>
      <p className="lead">Professional construction services</p>
    </FadeInWhenVisible>
  );
}
```

### Animation Best Practices

1. **Progressive Enhancement** - Page works without animations
2. **Performance** - Use `HoverScale` for interactive elements only
3. **Accessibility** - Respect `prefers-reduced-motion`
4. **Testing** - Always test with animations disabled

---

## 🔧 Component Export Standards

### Next.js Pages & Special Files

**Rule**: Must use default exports (Next.js requirement).

```tsx
// page.tsx, layout.tsx, loading.tsx, error.tsx, not-found.tsx
export default function PageName() {
  return <div>...</div>;
}

// robots.ts, sitemap.ts, manifest.ts
export default function sitemap() {
  return [...];
}
```

### Regular Components

**Preferred**: Named exports for better IDE support and tree-shaking.

#### ✅ PREFERRED

```tsx
// Named export
export function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

// Or with separate export
function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}

export { Button };
```

#### ⚠️ ACCEPTABLE (Existing Code)

```tsx
// Default export (legacy, okay for existing components)
export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
```

**Note**: New components should prefer named exports. Existing components can remain with default exports but should
be gradually migrated during refactoring.

---

## 🎨 Styling Standards

### Primary: Tailwind Utility Classes

**Rule**: Use Tailwind for all styling.

````tsx
## 🎨 Styling Standards

### MANDATORY: Use Centralized Style Utilities
**Rule**: Use style utilities from `/src/lib/styles/` instead of repeating className strings.

**See**: Centralized style utilities for complete documentation.

#### ✅ CORRECT - Use Style Utilities

```tsx
import { getCardClassName } from "@/lib/styles/card-variants";
import { gridPresets } from "@/lib/styles/layout-variants";
import { SectionHeader } from "@/components/ui/SectionHeader";

// Card styling
<Card className={getCardClassName('default')}>
  <CardContent>Content here</CardContent>
</Card>

// Grid layouts
<div className={gridPresets.cards3("md", "mx-auto max-w-7xl")}>
  {items.map(item => <Card key={item.id}>{item.content}</Card>)}
</div>

// Section header component
<section className="relative bg-white dark:bg-gray-900 py-16 lg:py-24">
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    <SectionHeader
      icon="shield"
      subtitle="Section Category"
      title="Section Title"
      description="Section description text here"
    />
    {/* content */}
  </div>
</section>
````

#### ❌ INCORRECT - Don't Repeat className Strings

```tsx
// DON'T DO THIS - repeated card styling
<Card className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1">

// DON'T DO THIS - repeated grid pattern
<div className="gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">

// ❌ CRITICAL: DON'T USE .container CLASS IN SECTION WRAPPERS
// This creates scroll capture issues (sections create internal scrollbars)
<section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
  <div className="mx-auto px-4 container">  {/* ❌ WRONG - causes scroll issues */}
    <FadeInWhenVisible>
      <div className="mx-auto mb-16 lg:mb-24 max-w-4xl text-center">
        <h2>...</h2>
      </div>
    </FadeInWhenVisible>
  </div>
</section>

// ✅ CORRECT: Use max-w-7xl instead (matches home page pattern)
<section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">  {/* ✅ CORRECT */}
    <FadeInWhenVisible>
      <div className="mx-auto mb-16 lg:mb-24 max-w-4xl text-center">
        <h2>...</h2>
      </div>
    </FadeInWhenVisible>
  </div>
</section>
```

**Why**: The `.container` class has `overflow-x: hidden` which creates a scroll container,
causing sections to capture scroll events. Use `max-w-7xl` for proper page-level scrolling.

### Available Style Utilities

1. **Card Variants** (`@/lib/styles/card-variants`)
   - 5 predefined card styles (default, primary, secondary, accent, static)
   - Consistent hover states and dark mode support
   - 70% less code per card instance

2. **Grid Layout Variants** (`@/lib/styles/layout-variants`)
   - 5 responsive grid presets (cards3, cards4, twoColumn, compactCards, cards3Alt)
   - Custom grid configuration support
   - 60% less code per grid instance

3. **Section Components** (`@/components/ui/layout`)
   - Section wrapper with variants (default, gray, gradient)
   - SectionHeader with flexible options
   - 58% less code per section

**Full Documentation**: See consistency guide for style standards

### Primary Styling: Tailwind Utility Classes

**Rule**: Use Tailwind for custom styling not covered by utilities.

```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>
```

### Responsive Design

Use Tailwind's responsive prefixes:

```tsx
<div className="text-base md:text-lg lg:text-xl">Responsive text size</div>
```

### Avoid

- ❌ Inline styles (`style={{}}`) - Use only for dynamic values
- ❌ CSS Modules - Not used in this project
- ❌ styled-components - Not used in this project
- ❌ Repeated className strings - Use style utilities instead

````text

### Responsive Design
Use Tailwind's responsive prefixes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
````

### Additional Styling Patterns to Avoid

- ❌ Inline styles (`style={{}}`) - Use only for dynamic values
- ❌ CSS Modules - Not used in this project
- ❌ styled-components - Not used in this project

---

## 📝 TypeScript Standards

### Type Imports

```tsx
import type { User, UserProfile } from "@/types/user";
```

### Props Interfaces

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
}

export function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  // ...
}
```

### Avoid `any`

```tsx
// ❌ AVOID
function process(data: any) {}

// ✅ CORRECT
function process(data: unknown) {
  // Type guard here
}

// ✅ BETTER
interface ProcessData {
  id: string;
  name: string;
}

function process(data: ProcessData) {}
```

---

## 🗂️ File Organization

### Directory Structure

```text
src/
├── app/                 # Next.js app directory (pages)
├── components/          # React components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   ├── animations/     # Animation components
│   └── ...
├── lib/                # Utilities, services, helpers
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── contexts/           # React contexts
├── middleware/         # Next.js middleware
└── styles/             # Global styles
```

### File Naming

- **Components**: `PascalCase.tsx` - `Button.tsx`, `PageHero.tsx`
- **Utilities**: `camelCase.ts` - `formatDate.ts`, `apiClient.ts`
- **Types**: `camelCase.ts` or `PascalCase.ts` - `user.ts`, `ApiResponse.ts`
- **Hooks**: `camelCase.ts` - `useAuth.ts`, `useAnalytics.ts`

---

## 🧪 Testing Standards

### Component Tests

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```

---

## 🚀 Performance Standards

### Image Optimization

```tsx
import { OptimizedImage } from "@/components/ui/OptimizedImage";

<OptimizedImage
  src="/images/hero.jpg"
  alt="Construction site"
  width={1200}
  height={600}
  priority={true} // Above the fold
/>;
```

### Code Splitting

```tsx
// For heavy components not needed immediately
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/charts/HeavyChart"), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Only if needed
});
```

---

## 📚 Documentation Standards

### Component Documentation

````tsx
/**
 * Button component for user interactions
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Submit
 * </Button>
 * ```
 */
export function Button({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) {
  // ...
}
````

### Complex Logic Documentation

```tsx
// WHY: Cache phone tracking to prevent duplicate analytics events
// HOW: Store timestamp in localStorage, check on subsequent calls
// WHEN: 2025-12-15 - Fix for duplicate tracking issue
function trackPhoneClick(source: string): void {
  const lastTracked = localStorage.getItem("phone_track_" + source);
  const now = Date.now();

  if (!lastTracked || now - parseInt(lastTracked) > 3600000) {
    analytics.track("phone_click", { source });
    localStorage.setItem("phone_track_" + source, now.toString());
  }
}
```

---

## ✅ Pre-Commit Checklist

Before committing code, ensure:

- [ ] All imports use `@/` prefix (no relative imports)
- [ ] Animations import from `FramerMotionComponents`
- [ ] Critical content is not wrapped in animations
- [ ] Style utilities used instead of repeated className strings
  - [ ] Cards use `getCardClassName()` from `@/lib/styles/card-variants`
  - [ ] Grids use `gridPresets` from `@/lib/styles/layout-variants`
  - [ ] Sections use `Section` and `SectionHeader` components
- [ ] `pnpm run lint` passes with no errors
- [ ] `pnpm run type-check` passes
- [ ] Added or renamed image files use lowercase kebab-case filenames (pre-commit enforced)
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Dark mode tested and working
- [ ] Relationship-first, factual brand voice maintained
- [ ] Trust/accreditation content preserved on all impacted pages
- [ ] No off-brand visual additions or unapproved naming aliases
- [ ] Accessibility parity maintained after design/content edits
- [ ] SEO naming and metadata labels remain brand-aligned
- [ ] Veteran badge exception limited to `WaVobBadge`

---

## 🔗 Related Documentation

- [Consistency Guide](./consistency-guide.md) - Component and layout standards
- [AI Development Guidelines](./ai-development-guidelines.md) - Guidelines for AI assistants

---

## 📝 Changelog

### 2026-05-15 - v1.2.0

- **ADDED**: Branding Congruency Standard with mandatory validation checks
- **UPDATED**: Pre-commit checklist with explicit branding, trust, accessibility, and SEO alignment gates
- **UPDATED**: Metadata date and version for branding governance parity

### 2025-11-08 - v1.1.0

- **ADDED**: Style utilities standards (card variants, grid layouts, sections)
- **ADDED**: Reference to Style Utilities Guide
- **UPDATED**: Pre-commit checklist with style utility requirements
- **UPDATED**: Styling standards section with mandatory utilities

### 2025-10-14 - v1.0.0

- Initial documentation
- Import standards with `@/` prefix
- Animation standards with FramerMotionComponents
- Component export guidelines
- TypeScript and styling standards

---

**Questions or Suggestions?**
Update this document via pull request or discuss with the team.

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../../README.md)
