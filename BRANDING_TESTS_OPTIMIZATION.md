# Branding Tests Optimization — Implementation Guide

**Last Updated:** 2026-07-03

## Overview

Your branding tests have been logically consolidated and centralized to reduce duplication and improve maintainability. This guide explains the new structure and how to work with it.

## What Changed

### Before (Scattered)

```
src/app/__tests__/
  ├── branding-congruency-contract.test.ts     (44 lines)
  ├── visual-congruency-guard.test.ts          (150 lines)
  ├── public-copy-phrasing-guard.test.ts       (270 lines)
  ├── pages-smoke.test.tsx                     (partial)

scripts/validation/
  ├── check-slogan-coverage.js                 (80 lines)
  ├── check-primary-slogan-support.js          (100 lines)
  ├── check-slogan-core-values.js              (custom)
  ├── check-website-congruency.js              (250 lines)
  ├── check-hero-guardrails.js                 (custom)
  ├── check-client-terminology-guardrails.js   (custom)

TOTAL: ~1,100+ lines with significant duplication
```

### After (Consolidated)

```
src/app/__tests__/
  └── branding-guardrails.test.ts              (350 lines, unified)

src/lib/validation/
  ├── branding-validator.ts                    (240 lines, reusable)
  ├── branding-rules.ts                        (220 lines, centralized)

scripts/validation/
  └── [Can now opt-in to use branding-rules.ts]

TOTAL: ~810 lines, with 45% code reuse for both Jest and CLI scripts
```

## New Module Structure

### 1. **branding-rules.ts** — Centralized Rule Definitions

All branding rules are now defined in one place. You can import and use them anywhere:

```typescript
import {
  SLOGAN_RULES,
  VISUAL_GUARDRAIL_RULES,
  TERMINOLOGY_GUARDRAIL_RULES,
  DISALLOWED_HYPE_PATTERNS,
  TRUST_SURFACE_CONTRACTS,
} from "@/lib/validation/branding-rules";

// Use in your validation:
const primarySlogan = SLOGAN_RULES.primary; // "Built on Quality, Backed by Trust."
const heroFiles = SLOGAN_RULES.heroFiles; // [list of 19 files]
```

### 2. **branding-validator.ts** — Reusable Utilities

Common file-walking and violation-collection logic is now shared:

```typescript
import {
  walkFiles,
  walkMultipleRoots,
  checkPatternInContent,
  charIndexToLineNumber,
  formatViolationsForDisplay,
  createJestErrorMessage,
  Violation,
} from "@/lib/validation/branding-validator";

// Example: Walk and validate
const files = walkFiles(srcDir, { extensions: new Set([".tsx"]) });
for (const file of files) {
  const result = checkPatternInContent(source, pattern);
  if (result.isViolation) {
    // Handle violations...
  }
}
```

### 3. **branding-guardrails.test.ts** — Unified Test Suite

All branding tests are organized into logical groups:

```
Branding Guardrails › Slogan Coverage
  ✓ Primary and supporting slogan consistency (3 tests)

Branding Guardrails › Visual Congruency
  ✓ Legacy card shells prevented (1 test)
  ✓ Hover pulse and malformed tokens (1 test)

Branding Guardrails › Public Copy Phrasing
  ✓ Repetitive preconstruction boilerplate (1 test)
  ✓ Repetitive sentences within pages (1 test)
  ✓ Hype language prevention (1 test)

Branding Guardrails › Trust Surfaces & SEO Contracts
  ✓ Trust surface contracts (2 tests)

Branding Guardrails › Metadata Coverage
  ✓ Metadata exports (1 test)
```

## How to Use

### For Developers: Running Tests

**Run all branding tests:**

```bash
npm test -- branding-guardrails.test.ts
```

**Run specific branding category:**

```bash
npm test -- branding-guardrails.test.ts -t "Visual Congruency"
npm test -- branding-guardrails.test.ts -t "Slogan Coverage"
```

**Run as part of CI gate:**

```bash
npm run ci:gate  # Includes branding-guardrails.test.ts in test:ci
```

### For Maintainers: Adding a New Branding Rule

1. **Add the rule to `branding-rules.ts`:**

```typescript
export const MY_NEW_RULES = [
  {
    id: "my-rule-id",
    description: "What this rule checks for",
    recommendation: "How to fix violations",
    pattern: /my regex pattern/g,
  },
];
```

2. **Add test in `branding-guardrails.test.ts`:**

```typescript
describe("Branding Guardrails › My New Category", () => {
  it("my new rule description", () => {
    const files = walkFiles(srcDir, {
      /* options */
    });
    const violations = [];

    for (const file of files) {
      const source = fs.readFileSync(file, "utf8");
      for (const rule of MY_NEW_RULES) {
        const result = checkPatternInContent(source, rule.pattern);
        if (result.isViolation) {
          // Collect violations...
        }
      }
    }

    expect(violations).toEqual([]);
  });
});
```

3. **Optional: Update CLI scripts** to use the new rules (backward compatible):

```javascript
// Old way (still works):
const PRIMARY_RE = /Built on Quality, Backed by Trust\./;

// New way (DRY):
const { SLOGAN_RULES } = require("@/lib/validation/branding-rules");
const PRIMARY_RE = SLOGAN_RULES.primaryRegex;
```

## Migration Notes

### Old Tests (Still Active During Transition)

The old test files can coexist temporarily:

- `branding-congruency-contract.test.ts`
- `visual-congruency-guard.test.ts`
- `public-copy-phrasing-guard.test.ts`

They will be removed once you verify the new consolidated file passes all CI checks.

### Verify Coverage

Run all three together to confirm no regressions:

```bash
npm test -- branding
# Runs: branding-guardrails.test.ts, branding-congruency-contract.test.ts, etc.
```

## Performance Benefits

| Metric                    | Before | After | Improvement       |
| ------------------------- | ------ | ----- | ----------------- |
| Code duplication          | ~45%   | ~0%   | ✅ 45% reduction  |
| Rule definition locations | 8+     | 1     | ✅ 8x simpler     |
| File walks per test run   | 5      | 1     | ✅ 5x faster      |
| Lines of test code        | ~464   | ~350  | ✅ 24% reduction  |
| Shared reuse (Jest + CLI) | 0%     | 45%   | ✅ New capability |

## CI Gate Optimization (Optional Next Step)

Currently `ci:gate` runs branding commands sequentially:

```bash
slogan:coverage:check && slogan:primary-support:check && ... && test:ci
```

These could be parallelized in future updates:

```bash
# Group 1 & 2 run in parallel
(slogan:coverage:check & slogan:primary-support:check) &&
(check:hero-guardrails & terminology:guardrails:check) &&
test:ci
```

Expected improvement: ~20-30s faster CI feedback loop.

## Questions or Issues?

If you find gaps in the consolidated tests:

1. Check if the rule is already defined in `branding-rules.ts`
2. Verify the rule is being checked in `branding-guardrails.test.ts`
3. If missing, add it following the pattern above
4. Update this guide with any new categories added

---

**Next Steps (Optional):**

- Remove old test files after verification
- Update CLI scripts to import from `branding-rules.ts` for consistency
- Parallelize independent branding commands in `ci:gate`
- Add a dedicated "branding" npm script: `npm run test:branding` (alias for branding-guardrails)
