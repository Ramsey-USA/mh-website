# MH Construction Website - Development Standards

**Last Updated**: October 14, 2025  
**Version**: 1.0.0  
**Status**: ✅ ACTIVE - All developers and AI assistants must follow these standards

---

## 🎯 Purpose

This document establishes mandatory coding standards for the MH Construction website.  
These standards ensure consistency, maintainability, and prevent recurring bugs.

**⚠️ CRITICAL**: Violation of these standards will be caught by ESLint and blocked in CI/CD.

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
<div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
</div>
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
- [ ] `npm run lint` passes with no errors
- [ ] `npm run type-check` passes
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Animations respect `prefers-reduced-motion`

---

## 🔗 Related Documentation

- [Consistency Master Plan](../project/consistency-master-plan.md) - Overall consistency strategy
- [AI Development Guidelines](./ai-development-guidelines.md) - Guidelines for AI assistants
- [Troubleshooting Guide](./TROUBLESHOOTING.md) - Common issues and solutions

---

## 📝 Changelog

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
