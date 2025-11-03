# AI Development Guidelines for MH Construction Website

**Last Updated**: October 14, 2025  
**Version**: 1.0.0  
**Audience**: AI Assistants (GitHub Copilot, Claude, ChatGPT, etc.)

---

## 🎯 Purpose

This document provides **mandatory guidelines** for AI assistants working on the
MH Construction website codebase. Following these guidelines prevents the
introduction of inconsistencies and bugs that have historically plagued this project.

---

## 🚨 Critical Rules - NEVER VIOLATE

### ✅ ALWAYS DO

#### 1. Use `@/` Absolute Imports

```tsx
// ✅ CORRECT
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { formatDate } from "@/lib/utils";
```text

```tsx
// ❌ NEVER DO THIS
import { Button } from "../../components/ui";
import { useAuth } from "../hooks/useAuth";
```text

#### 2. Import Animations from FramerMotionComponents ONLY

```tsx
// ✅ CORRECT
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
```text

```tsx
// ❌ NEVER DO THIS - FILE WAS DELETED
import { FadeInWhenVisible } from "@/components/animations/DynamicAnimations";

// ❌ NEVER CREATE NEW ANIMATION WRAPPERS
const FadeIn = dynamic(() => import("./animations"), { ssr: false });
```text

#### 3. Protect Critical Content from Animation Failures

```tsx
// ✅ CORRECT - Critical content always visible
export default function Page() {
  return (
    <div>
      <h1>Page Title</h1> {/* Critical - always visible */}
      <FadeInWhenVisible>
        <div>Optional enhanced content</div>
      </FadeInWhenVisible>
    </div>
  );
}
```text

```tsx
// ❌ NEVER DO THIS - Title could disappear
export default function Page() {
  return (
    <FadeInWhenVisible>
      <h1>Page Title</h1> {/* DANGER: Could fail to render */}
    </FadeInWhenVisible>
  );
}
```text

#### 4. Check Existing Patterns Before Adding Code

**MANDATORY PROCESS**:

1. Search for similar components/functions in the codebase
2. Copy existing patterns rather than creating new ones
3. If no pattern exists, establish one that follows these guidelines

```bash
# Before creating a new component, search for similar ones
# Example: Creating a card component
grep -r "Card" src/components/
```text

#### 5. Test After Every Change

**After making changes**:

```bash
npm run type-check  # Verify TypeScript
npm run lint        # Verify ESLint rules
npm run dev         # Test in browser
```text

### ❌ NEVER DO

#### 1. Never Create or Reference DynamicAnimations

```tsx
// ❌ FORBIDDEN - This file was deleted for causing bugs
import anything from "@/components/animations/DynamicAnimations";
```text

**Why**: This file used `ssr: false` and `loading: () => null` which caused
content to disappear. It was deleted as part of consistency cleanup.

#### 2. Never Use Relative Imports for src/ Directories

```tsx
// ❌ FORBIDDEN
import { Component } from "../../components/Component";
import { helper } from "../../../lib/helper";
```text

**Why**: Creates inconsistency and makes refactoring difficult. ESLint will block this.

#### 3. Never Wrap Entire Pages in FadeInWhenVisible

```tsx
// ❌ FORBIDDEN - Entire page could fail to render
export default function Page() {
  return <FadeInWhenVisible>{/* Entire page content */}</FadeInWhenVisible>;
}
```text

**Why**: If the animation component fails to load or execute, the entire page
becomes blank. This has happened multiple times in production.

#### 4. Never Mix Animation Systems

```tsx
// ❌ FORBIDDEN - Don't create alternative animation systems
// We have ONE animation system: FramerMotionComponents

// Don't do:
const AnimatedDiv = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion.div),
);

// Don't do:
import { motion } from "framer-motion";
```text

**Why**: Multiple animation systems create maintenance burden and inconsistency.

#### 5. Never Introduce New Import Patterns

```tsx
// ❌ FORBIDDEN - Don't create new import aliases
// Don't add to tsconfig:
// "@components/*": ["src/components/*"]  // We use @/ only
// "~/*": ["src/*"]                       // We use @/ only
```text

**Why**: One import pattern (@/) is sufficient and prevents confusion.

---

## 🔍 Before Making Changes - Required Reading

### Step 1: Read These Documents

1. **This file** (ai-development-guidelines.md)
2. [consistency-master-plan.md](../project/consistency-master-plan.md)
3. [development-standards.md](./development-standards.md)

### Step 2: Understand the Problem

**Ask yourself**:

- What is the root cause of the issue?
- Has this been solved elsewhere in the codebase?
- Am I about to introduce a new pattern that creates inconsistency?

### Step 3: Search Existing Code

```bash
# Find similar components
grep -r "component-name" src/

# Find usage examples
grep -r "import.*ComponentName" src/

# Check import patterns
grep -r "from.*components" src/
```text

### Step 4: Plan the Fix

- Use existing patterns whenever possible
- Don't introduce new libraries unless absolutely necessary
- Don't create wrapper components that duplicate existing functionality

---

## 🧠 Common Anti-Patterns to Avoid

### Anti-Pattern 1: "Optimization" Without Profiling

```tsx
// ❌ DON'T: Add dynamic imports "for optimization" without measuring
const Component = dynamic(() => import("./Component"), {
  loading: () => null, // This causes content to disappear!
  ssr: false, // This breaks SEO!
});
```text

**DO**: Only optimize when there's a proven performance issue.

### Anti-Pattern 2: Creating "Improved" Versions

```tsx
// ❌ DON'T: Create "better" versions of existing components
// Old: FadeInWhenVisible in FramerMotionComponents
// New: ImprovedFadeInWhenVisible in ImprovedAnimations

// This creates:
// - Two animation systems
// - Confusion about which to use
// - Maintenance burden
```text

**DO**: Improve the existing component in place.

### Anti-Pattern 3: Copy-Paste from External Sources

```tsx
// ❌ DON'T: Copy random code from Stack Overflow that uses different patterns
// Example: Code that uses relative imports when our standard is @/

// ❌ DON'T: Copy entire component libraries that duplicate existing components
```text

**DO**: Adapt external code to match our existing patterns.

### Anti-Pattern 4: Mixing Conventions

```tsx
// ❌ DON'T: Mix import styles
import { Button } from "@/components/ui"; // Good
import { Card } from "../../components/ui"; // Bad - inconsistent!

// ❌ DON'T: Mix quote styles inconsistently
import { A } from "@/components/a"; // Double quotes
import { B } from "@/components/b"; // Single quotes - inconsistent!
```text

**DO**: Follow the existing convention consistently.

---

## 📋 Code Review Checklist for AI

Before presenting code to the user, verify:

### Imports

- [ ] All imports use `@/` prefix (no `../`)
- [ ] Animations import from `FramerMotionComponents`
- [ ] No imports from `DynamicAnimations`

### Component Structure

- [ ] Critical content not wrapped in animations
- [ ] TypeScript types properly defined
- [ ] Props destructured in function signature

### Styling

- [ ] Using Tailwind utility classes
- [ ] Responsive classes included (sm:, md:, lg:)
- [ ] No inline styles except for dynamic values

### Performance

- [ ] No unnecessary dynamic imports
- [ ] Images use `OptimizedImage` component
- [ ] Large libraries only imported where needed

### Code Quality

- [ ] No `any` types (use `unknown` or proper types)
- [ ] Error handling included
- [ ] Comments explain "why", not "what"

---

## 🐛 Recognizing and Preventing Historical Bugs

### Bug Pattern 1: Content Disappearing

**Symptoms**:

- Page loads but content is blank
- Content appears briefly then vanishes
- Content only appears on second visit

**Root Cause**:

```tsx
// This causes it:
<FadeInWhenVisible>
  <h1>Important Content</h1> // Can fail to appear!
</FadeInWhenVisible>
```text

**Prevention**:

- Don't wrap critical content in animations
- Always test with slow 3G network throttling
- Check browser console for errors

### Bug Pattern 2: Import Errors After Refactoring

**Symptoms**:

- Module not found errors
- Imports work in some files but not others

**Root Cause**:

```tsx
// Mixed import patterns cause this:
// File A:
import { Button } from "@/components/ui";

// File B:
import { Button } from "../../components/ui";

// After moving Button.tsx, File B breaks!
```text

**Prevention**:

- Use `@/` imports everywhere
- Run `npm run type-check` after refactoring

### Bug Pattern 3: Hydration Mismatches

**Symptoms**:

- Console warnings about hydration
- Content differs between server and client

**Root Cause**:

```tsx
// This causes it:
const Component = dynamic(() => import("./Component"), {
  ssr: false, // Server renders nothing, client renders component
});
```text

**Prevention**:

- Avoid `ssr: false` unless absolutely necessary
- Use `'use client'` directive appropriately
- Match server and client rendering

---

## 🎓 Learning from Past Mistakes

### Case Study 1: The DynamicAnimations Incident

**What Happened**:

1. Session A created `FramerMotionComponents.tsx` with direct imports ✅
2. Session B created `DynamicAnimations.tsx` as a "lazy-loaded wrapper" ❌
3. Session C used the wrapper for "optimization" ❌
4. Content started disappearing on production ❌
5. Hours spent debugging ❌

**Lesson**: Don't create wrapper components without understanding the full impact.

### Case Study 2: The Import Path Migration

**What Happened**:

1. Project started with relative imports
2. Some files converted to `@/` imports
3. Mixed patterns caused confusion
4. Refactoring broke imports inconsistently
5. Need systematic fix across entire codebase

**Lesson**: When establishing a pattern, apply it consistently across ALL files.

### Case Study 3: The Animation Wrapper Proliferation

**What Happened**:

1. `FadeInWhenVisible` worked well
2. "Improved" version created with different API
3. "Optimized" version created with lazy loading
4. Three versions existed with different bugs
5. Developers confused about which to use

**Lesson**: Improve existing components rather than creating alternatives.

---

## 📚 Quick Reference

### Import Cheat Sheet

```tsx
// Components
import { Button, Card } from "@/components/ui";
import { PageHero } from "@/components/ui/PageHero";
import { Navigation } from "@/components/layout/Navigation";

// Animations - ONLY from FramerMotionComponents
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";

// Hooks
import { useAuth } from "@/hooks/useAuth";
import { useAnalytics } from "@/hooks/useAnalytics";

// Utilities
import { formatDate, formatPhone } from "@/lib/utils";
import { apiClient } from "@/lib/api/client";

// Types
import type { User, UserProfile } from "@/types/user";

// Contexts
import { AuthContext } from "@/contexts/AuthContext";
```text

### Component Template

```tsx
"use client"; // If using hooks/interactivity

import type { ReactNode } from "react";
import { useState } from "react";
import { Button } from "@/components/ui";
import { HoverScale } from "@/components/animations/FramerMotionComponents";

interface ComponentNameProps {
  title: string;
  children: ReactNode;
  onAction?: () => void;
}

export function ComponentName({
  title,
  children,
  onAction,
}: ComponentNameProps) {
  const [state, setState] = useState(false);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      {/* Critical content first - no animations */}

      <HoverScale>
        {/* Interactive/decorative content - animations OK */}
        <Button onClick={onAction}>Action</Button>
      </HoverScale>

      {children}
    </div>
  );
}
```text

---

## 🆘 When in Doubt

1. **Search the codebase** for similar implementations
2. **Follow existing patterns** even if you think you have a "better" way
3. **Ask before creating** new patterns or abstractions
4. **Test thoroughly** especially content visibility
5. **Check ESLint** - it will catch many issues

---

## 📞 Getting Help

If you encounter situations not covered by these guidelines:

1. Check [development-standards.md](./development-standards.md)
2. Check [consistency-master-plan.md](../project/consistency-master-plan.md)
3. Search existing code for similar patterns
4. When creating something new, document the pattern for future reference

---

## 📝 Changelog

### 2025-10-14 - v1.0.0

- Initial AI development guidelines
- Critical rules for imports and animations
- Historical bug patterns and prevention
- Code review checklist
- Quick reference templates

---

**Remember**: Consistency is more valuable than individual "optimizations".
Following these guidelines prevents bugs and saves debugging time.
