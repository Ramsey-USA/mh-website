# MH Construction Website - Development Standards

**Category:** Development - Code Standards  
**Last Updated:** December 14, 2025  
**Version:** 1.0.0  
**Status:** ✅ Active - Mandatory

## 🧭 Quick Navigation

- [🗂️ Development Index](./development-index.md)
- [🤖 AI Development Guidelines](./ai-development-guidelines.md)
- [📖 Consistency Guide](./consistency-guide.md)
- [🏠 Master Index](../master-index.md)

---

## 🎯 Purpose

This document establishes mandatory coding standards for the MH Construction website.  
These standards ensure consistency, maintainability, and prevent recurring bugs.

**⚠️ CRITICAL**: Violation of these standards will be caught by ESLint and blocked in CI/CD.

### 🔗 Related Brand Standards

**When implementing features, also consult our brand guidelines:**

- **[MH Branding Index](../../branding/branding-index.md)** - Modular brand docs,
  standards and visual identity
- **[Typography Standards](../../branding/standards/typography.md)** - Responsive
  typography patterns and hero section requirements
- **[Color System](../../branding/standards/color-system.md)** - Brand colors and usage
  guidelines
- **Icon Standards** - See below (Material Icons only, NO emojis in code)

**These branding standards are mandatory and enforced alongside technical standards.**

### 🤖 Chatbot-First User Engagement (November 2025)

**NEW STANDARD**: Replace static FAQ sections with interactive chatbot CTAs.

**Implementation Rules:**

- ✅ **USE**: `ChatbotCTASection` component for FAQ/Q&A sections
- ✅ **PREFER**: Interactive chatbot prompts over static text
- ✅ **REPURPOSE**: FAQ data for chatbot training, not static display
- ❌ **AVOID**: Creating new static FAQ accordion sections

**See**: [Chatbot-First User Engagement Guide](./consistency-guide.md#chatbot-first-user-engagement)

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

| Function              | Material Icon   | Usage Context                |
| --------------------- | --------------- | ---------------------------- |
| Construction Projects | `construction`  | Building, projects, work     |
| Veteran Recognition   | `military_tech` | Military service, awards     |
| Scheduling/Calendar   | `event`         | Appointments, dates          |
| Contact Information   | `phone`         | Phone numbers, calls         |
| Email Communication   | `email`         | Email addresses, messages    |
| Location/Address      | `place`         | Addresses, locations         |
| AI/Smart Features     | `smart_toy`     | Automated estimator, chatbot |
| Security Features     | `security`      | Protection, safety           |
| Success/Completion    | `check_circle`  | Success states               |
| Warnings/Alerts       | `warning`       | Caution, alerts              |

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

## 📦 Import Standards

### **MANDATORY: Use `@/` Absolute Imports**

**Rule**: All imports from `src/` must use the `@/` prefix.

#### ✅ CORRECT

`````tsx
import { Button, Card } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { useAnalytics } from "@/hooks/useAnalytics";
import { formatPhone } from "@/lib/utils";
import { User } from "@/types/user";
import { AuthContext } from "@/contexts/AuthContext";
```text

#### ❌ INCORRECT

```tsx
// Never use relative imports for src/ directories
import { Button } from "../../components/ui";
import { MaterialIcon } from "../../../components/icons/MaterialIcon";
import { useAnalytics } from "../hooks/useAnalytics";
```text

### **Why `@/` Imports?**

1. **Consistent** - Same path regardless of file depth
2. **Refactor-safe** - Moving files doesn't break imports
3. **Clear** - Instantly know it's from `src/`
4. **Standard** - Industry best practice for Next.js

### **ESLint Enforcement**

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
```text

**Error Message**: "Use @/components/\* instead of relative imports"

---

## 🎨 Animation Standards

### **MANDATORY: Use FramerMotionComponents Only**

**Rule**: All animations MUST import from `@/components/animations/FramerMotionComponents`.

#### ✅ CORRECT

```tsx
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
  ParallaxScroll,
} from "@/components/animations/FramerMotionComponents";
```text

#### ❌ INCORRECT - WILL FAIL BUILD

```tsx
// DynamicAnimations.tsx has been DELETED
import { FadeInWhenVisible } from "@/components/animations/DynamicAnimations";

// Don't create new dynamic wrappers
const FadeIn = dynamic(() => import("./FadeInWhenVisible"), { ssr: false });
```text

### **Critical Content Visibility Rule**

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
```text

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
```text

### **Animation Best Practices**

1. **Progressive Enhancement** - Page works without animations
2. **Performance** - Use `HoverScale` for interactive elements only
3. **Accessibility** - Respect `prefers-reduced-motion`
4. **Testing** - Always test with animations disabled

---

## 🔧 Component Export Standards

### **Next.js Pages & Special Files**

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
```text

### **Regular Components**

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
```text

#### ⚠️ ACCEPTABLE (Existing Code)

```tsx
// Default export (legacy, okay for existing components)
export default function Button({ children, ...props }: ButtonProps) {
  return <button {...props}>{children}</button>;
}
```text

**Note**: New components should prefer named exports. Existing components can remain with default exports but should
be gradually migrated during refactoring.

---

## 🎨 Styling Standards

### **Primary: Tailwind Utility Classes**

**Rule**: Use Tailwind for all styling.

```tsx
## 🎨 Styling Standards

### **MANDATORY: Use Centralized Style Utilities**

**Rule**: Use style utilities from `/src/lib/styles/` instead of repeating className strings.

**See**: [Style Utilities Guide](./style-utilities-guide.md) for complete documentation.

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
```

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

### **Available Style Utilities**

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

**Full Documentation**: [Style Utilities Guide](./style-utilities-guide.md)

### **Primary: Tailwind Utility Classes**

**Rule**: Use Tailwind for custom styling not covered by utilities.

```tsx
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>
```

### **Responsive Design**

Use Tailwind's responsive prefixes:

```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text size
</div>
```

### **Avoid**

- ❌ Inline styles (`style={{}}`) - Use only for dynamic values
- ❌ CSS Modules - Not used in this project
- ❌ styled-components - Not used in this project
- ❌ Repeated className strings - Use style utilities instead
```text

### **Responsive Design**

Use Tailwind's responsive prefixes:

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```text

### **Avoid**

- ❌ Inline styles (`style={{}}`) - Use only for dynamic values
- ❌ CSS Modules - Not used in this project
- ❌ styled-components - Not used in this project

---

## 📝 TypeScript Standards

### **Type Imports**

```tsx
import type { User, UserProfile } from "@/types/user";
```text

### **Props Interfaces**

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
```text

### **Avoid `any`**

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
```text

---

## 🗂️ File Organization

### **Directory Structure**

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
```text

### **File Naming**

- **Components**: `PascalCase.tsx` - `Button.tsx`, `PageHero.tsx`
- **Utilities**: `camelCase.ts` - `formatDate.ts`, `apiClient.ts`
- **Types**: `camelCase.ts` or `PascalCase.ts` - `user.ts`, `ApiResponse.ts`
- **Hooks**: `camelCase.ts` - `useAuth.ts`, `useAnalytics.ts`

---

## 🧪 Testing Standards

### **Component Tests**

```tsx
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
});
```text

---

## 🚀 Performance Standards

### **Image Optimization**

```tsx
import { OptimizedImage } from "@/components/ui/OptimizedImage";

<OptimizedImage
  src="/images/hero.jpg"
  alt="Construction site"
  width={1200}
  height={600}
  priority={true} // Above the fold
/>;
```text

### **Code Splitting**

```tsx
// For heavy components not needed immediately
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/charts/HeavyChart"), {
  loading: () => <div>Loading chart...</div>,
  ssr: false, // Only if needed
});
```text

---

## 📚 Documentation Standards

### **Component Documentation**

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
`````

### **Complex Logic Documentation**

````tsx
// WHY: Firebase requires initialization before use to prevent race conditions
// HOW: Lazy initialization on first access
// WHEN: 2025-10-14 - Fix for intermittent Firebase errors
function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
  }
  return firebaseApp;
}
```text

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
- [ ] `npm run lint` passes with no errors
- [ ] `npm run type-check` passes
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Dark mode tested and working

---

## 🔗 Related Documentation

- [Style Utilities Guide](./style-utilities-guide.md) - **NEW** - Centralized style utilities
- [Consistency Master Plan](../project/consistency-master-plan.md) - Overall consistency strategy
- [AI Development Guidelines](./ai-development-guidelines.md) - Guidelines for AI assistants
- [Troubleshooting Guide](./TROUBLESHOOTING.md) - Common issues and solutions
- [Refactoring Roadmap](../technical/refactoring-roadmap.md) - Refactoring history and standards

---

## 📝 Changelog

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
````
