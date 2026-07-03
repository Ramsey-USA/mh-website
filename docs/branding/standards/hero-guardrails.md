# Hero Section Guardrails

**Status:** ✅ Active  
**Version:** 1.0.0  
**Last Updated:** July 3, 2026  
**Governance:** MH Branding Standards v7.2.0

---

## Overview

This document outlines the guardrails, validation systems, and enforcement mechanisms to ensure all website hero sections remain congruent with MH Branding standards. These guardrails operate across three levels:

1. **Compile-Time** - TypeScript type enforcement
2. **Runtime** - Component validation and hooks
3. **CI/CD Pipeline** - Automated compliance checks

---

## Table of Contents

- [Quick Start](#quick-start)
- [Guardrails Architecture](#guardrails-architecture)
- [Type Safety](#type-safety)
- [Component-Level Enforcement](#component-level-enforcement)
- [Validation Scripts](#validation-scripts)
- [CI/CD Integration](#cicd-integration)
- [Violations & Remediation](#violations--remediation)
- [FAQ](#faq)

---

## Quick Start

### For New Hero Components

```tsx
import { HeroSectionEnforcer } from "@/components/shared-sections";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

export function MyPageHero() {
  return (
    <HeroSectionEnforcer
      dualNaming="Operations → My Page"
      mantra="Your Page-Specific Message"
      navigation={navigationConfigs.myPage}
      serving="Optional: Serving area information"
    />
  );
}
```

### For Custom Hero Implementations

Use the validation types:

```tsx
import type { CompliantHeroProps } from "@/types/hero-guardrails";
import { validateHeroProps, useHeroValidation } from "@/types/hero-guardrails";

export function CustomHero(props: CompliantHeroProps) {
  // Validate at runtime
  validateHeroProps(props);

  // Or use hook for specific checks
  const { isValid, violations } = useHeroValidation({
    hasDualNaming: true,
    hasMantra: true,
    hasBottomRightPositioning: true,
    hasPageNavigation: true,
    hasCanonicalClass: true,
    hasProperHeight: true,
  });

  if (!isValid) {
    throw new Error(`Hero violations: ${violations.join(", ")}`);
  }

  // Your implementation
}
```

---

## Guardrails Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  GUARDRAILS SYSTEM                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  COMPILE-TIME ENFORCEMENT                        │  │
│  │  - TypeScript types (hero-guardrails.ts)         │  │
│  │  - CompliantHeroProps interface                  │  │
│  │  - Type checking during build                    │  │
│  └──────────────────────────────────────────────────┘  │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  RUNTIME VALIDATION                              │  │
│  │  - HeroSectionEnforcer component                 │  │
│  │  - validateHeroProps() function                  │  │
│  │  - useHeroValidation() hook                      │  │
│  └──────────────────────────────────────────────────┘  │
│                          ▼                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  CI/CD CHECKS                                    │  │
│  │  - check-hero-guardrails.js script               │  │
│  │  - npm run check:hero-guardrails                 │  │
│  │  - GitHub Actions workflow                       │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Type Safety

### CompliantHeroProps Interface

All hero components must satisfy `CompliantHeroProps`:

```typescript
export interface CompliantHeroProps {
  content: HeroContent; // Dual naming, mantra, slogan
  styling: HeroStyling; // Canonical CSS structure
  positioning: HeroTextPositioning; // Bottom-right alignment
  typography: HeroTypography; // Responsive font sizing
  navigation: HeroNavigation; // PageNavigation component
  backgroundMedia?: object; // Optional: image/video
}
```

### HeroContent Requirements

```typescript
interface HeroContent {
  /** Format: "Military → Civilian" (e.g., "Base HQ → Home") */
  dualNaming: string;

  /** Page-specific mantra (e.g., "Your Tri-State Command Center") */
  mantra: string;

  /** Optional: supporting description */
  description?: string;

  /** Optional: company slogan (defaults to canonical) */
  slogan?: string;

  /** Optional: serving area or sub-title */
  serving?: string;
}
```

### Creating Compliant Content

```typescript
import { createHeroContent } from "@/types/hero-guardrails";

const heroContent = createHeroContent(
  "Base HQ", // Military designation
  "Home", // Civilian label
  "Your Tri-State Command Center", // Mantra
  {
    description: "Mission-focused execution",
    slogan: "Built on Quality, Backed by Trust.",
    serving: "Serving WA, OR, ID",
  },
);
```

---

## Component-Level Enforcement

### HeroSectionEnforcer Component

The `HeroSectionEnforcer` component enforces all standards automatically:

```tsx
import { HeroSectionEnforcer } from "@/components/shared-sections";

export function TeamsHero() {
  return (
    <HeroSectionEnforcer
      dualNaming="Chain of Command → Our Team"
      mantra="150+ Years Combined Military-Grade Expertise"
      navigation={navigationConfigs.team}
      slogan="Built on Quality, Backed by Trust."
      serving="Supporting construction excellence across WA, OR, ID"
    />
  );
}
```

**Enforced Guarantees:**

- ✅ Canonical hero section class
- ✅ Correct height: `calc(100vh - var(--mh-nav-offset, 6.5rem))`
- ✅ Bottom-right text positioning with `ml-auto`
- ✅ PageNavigation at `absolute bottom-0 left-0 right-0`
- ✅ Dual naming format with `→`
- ✅ Proper background gradient and overlay
- ✅ Responsive typography scaling

### useHeroValidation Hook

For custom hero implementations, validate specific aspects:

```tsx
import { useHeroValidation } from "@/types/hero-guardrails";

export function CustomHero() {
  const { isValid, violations } = useHeroValidation({
    hasDualNaming: true,
    hasMantra: true,
    hasBottomRightPositioning: true,
    hasPageNavigation: true,
    hasCanonicalClass: true,
    hasProperHeight: true,
  });

  if (!isValid) {
    console.error("Hero violations:", violations);
    // Trigger remediation or fallback
  }

  return (/* your custom hero JSX */);
}
```

---

## Validation Scripts

### Run Guardrails Check

```bash
# Check all pages for hero section compliance
npm run check:hero-guardrails

# Or directly with Node
node apps/website/scripts/validation/check-hero-guardrails.js
```

### Script Output

```
╔════════════════════════════════════════════════════════════════╗
║           MH BRANDING HERO SECTION GUARDRAILS REPORT            ║
╚════════════════════════════════════════════════════════════════╝

📊 SUMMARY
   Total Pages: 16
   ✅ Compliant: 16
   ❌ Non-Compliant: 0
   ⚠️  Warnings: 0

✅ COMPLIANT PAGES (16):
   apps/website/src/app/page.tsx
   apps/website/src/app/about/page.tsx
   ...
```

### Exit Codes

- `0` - All pages compliant
- `1` - One or more critical errors found

---

## CI/CD Integration

### GitHub Actions Workflow

Add to `.github/workflows/ci-cd.yml`:

```yaml
- name: Check Hero Section Compliance
  run: npm run check:hero-guardrails --workspace=apps/website
  if: github.event_name == 'pull_request' || github.event_name == 'push'
```

### Pre-commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run check:hero-guardrails --workspace=apps/website || {
  echo "❌ Hero section guardrails failed. Please fix and try again."
  exit 1
}
```

### Package.json Scripts

```json
{
  "scripts": {
    "check:hero-guardrails": "node apps/website/scripts/validation/check-hero-guardrails.js",
    "ci:gate": "npm run check:hero-guardrails && npm run lint"
  }
}
```

---

## Violations & Remediation

### Common Violations

| Violation                    | Cause                 | Fix                                                                                                            |
| ---------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------- |
| Missing canonical hero class | Custom implementation | Use `HeroSectionEnforcer` or add `hero-section relative flex items-end justify-end text-white overflow-hidden` |
| Missing PageNavigation       | Forgot to add nav     | Add `<PageNavigation items={navigationConfigs.page} className="absolute bottom-0 left-0 right-0" />`           |
| Missing dual naming          | Incomplete content    | Add dual naming: `dualNaming="Military → Civilian"`                                                            |
| CTA buttons in hero          | Violates standards    | Move buttons outside hero section                                                                              |
| Top/center text alignment    | Wrong positioning     | Change to bottom-right with `ml-auto` and `text-right`                                                         |
| Incorrect height             | Custom sizing         | Use `height="calc(100vh - var(--mh-nav-offset, 6.5rem))"`                                                      |

### Remediation Process

1. **Run validation script** - identify violations

   ```bash
   npm run check:hero-guardrails
   ```

2. **Review error output** - understand what's missing

3. **Choose implementation path:**
   - **Option A (Recommended):** Use `HeroSectionEnforcer`
     ```tsx
     import { HeroSectionEnforcer } from "@/components/shared-sections";
     ```
   - **Option B:** Manually implement with validation
     ```tsx
     import { validateHeroProps } from "@/types/hero-guardrails";
     validateHeroProps(heroProps);
     ```

4. **Verify fix:**

   ```bash
   npm run check:hero-guardrails
   ```

5. **Commit and push** - CI will re-validate

---

## FAQ

### Q: Can I customize the hero section appearance?

**A:** Yes, but the **structure must remain canonical**. Use these extension points:

```tsx
<HeroSectionEnforcer
  dualNaming="Your → Naming"
  mantra="Your Mantra"
  backgroundElement={<CustomBackground />} // Custom background
  contentClassName="additional-classes" // Extra classes (non-breaking)
  slogan="Custom slogan" // Override slogan
  serving="Custom serving area" // Override serving
/>
```

### Q: What if my page needs a different hero layout?

**A:** Request a **documented exception** through the governance process:

1. File an issue explaining why the standard doesn't fit
2. Get approval from design/branding team
3. Document exception in `docs/branding/standards/exceptions.md`
4. Update `check-hero-guardrails.js` to recognize exception

### Q: How do I add a new page with a hero?

**A:** Follow this checklist:

- [ ] Import `HeroSectionEnforcer` or `CompliantHeroProps`
- [ ] Create dual naming (Military → Civilian)
- [ ] Create page-specific mantra
- [ ] Add to navigation configs (`navigationConfigs.myPage`)
- [ ] Implement hero component
- [ ] Run `npm run check:hero-guardrails`
- [ ] Verify in CI/CD pipeline
- [ ] Commit and push

### Q: Can multiple pages share a hero component?

**A:** Only if they have the **same structure and content**. Otherwise, create page-specific components:

```tsx
// ❌ Don't do this (content is page-specific)
<SharedHero />

// ✅ Do this (page-specific wrappers)
<ServicePageHero /> // services/page.tsx
<ProjectsPageHero /> // projects/page.tsx
```

### Q: What about hero sections in nested routes?

**A:** Same standards apply. All hero sections must:

- Have canonical structure
- Include dual naming
- Have PageNavigation

```tsx
// /locations/[city]/page.tsx
export function LocationHero({ city }) {
  return (
    <HeroSectionEnforcer
      dualNaming={`Office → ${city}`}
      mantra={`${city} Operations Center`}
      navigation={navigationConfigs.locations}
    />
  );
}
```

### Q: How do I ensure my custom hero passes validation?

**A:** Use `validateHeroProps()` with proper type checking:

```tsx
import type { CompliantHeroProps } from "@/types/hero-guardrails";
import { validateHeroProps } from "@/types/hero-guardrails";

export function MyHero(props: CompliantHeroProps) {
  // TypeScript enforces interface compliance
  // Runtime check validates specific requirements
  validateHeroProps(props);

  return (/* your implementation */);
}
```

---

## Related Resources

- [Hero Section Standards](./hero-section-standards.md) - Canonical design specs
- [MH Branding Guardrails](../../.github/instructions/mh-branding-guardrails.instructions.md) - Branding rules
- [Component Index](./component-index.md) - Hero component reference

---

## Support

For questions or issues with hero guardrails:

1. **Check this documentation** first
2. **Run validation script** to identify specific issues
3. **Review error output** - usually indicates exact fix needed
4. **File an issue** if you find a bug in guardrails
5. **Request exception** if standards don't fit your use case

---

**Last Updated:** July 3, 2026  
**Maintained By:** MH Branding Team  
**Version:** 1.0.0 (aligned with Hero Section Standards v7.2.0)
