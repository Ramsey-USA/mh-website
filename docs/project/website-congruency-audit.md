# Website Congruency Audit Report

**Audit Date:** April 15, 2026  
**Auditor:** Website System  
**Scope:** Source code (`src/`) - Visual & Verbal Consistency  
**Baseline:** [brand-constants.md](../branding/brand-constants.md)

---

## Executive Summary

This audit identifies visual and verbal inconsistencies in the website source code that impact brand congruency. Issues are prioritized by impact and include specific file locations for remediation.

**Total Issues Found:** 38  
**Critical:** 6 | **High:** 12 | **Medium:** 14 | **Low:** 6

---

## 🔴 Critical Issues (Immediate Action Required)

### 1. Address Format Inconsistency in Constants

**Issue:** The `COMPANY_INFO` constants file uses periods in address abbreviations, conflicting with brand standard.

**Location:** [src/lib/constants/company.ts](../../src/lib/constants/company.ts#L34-L41)

**Current:**

```typescript
street: "3111 N. Capitol Ave.",
full: "3111 N. Capitol Ave., Pasco, WA 99301",
```

**Brand Standard:**

```typescript
street: "3111 N Capitol Ave",
full: "3111 N Capitol Ave, Pasco, WA 99301",
```

**Impact:** This constant propagates to entire website — emails, SEO, footer, contact pages.

**Affected Files (22+):**

| File                                             | Line |
| ------------------------------------------------ | ---- |
| src/lib/constants/company.ts                     | 34   |
| src/components/analytics/TrackedContactLinks.tsx | 112  |
| src/lib/email/templates.ts                       | 409  |
| src/lib/chatbot/knowledge-base.ts                | 194  |
| src/lib/data/faq-data.ts                         | 36   |
| src/app/contact/ContactPageClient.tsx            | 673  |
| src/app/accessibility/page.tsx                   | 112  |
| src/app/api/chat/route.ts                        | 195  |

---

### 2. Veteran-Owned Phrasing Missing January

**Issue:** Multiple files say "Veteran-Owned Since 2025" without specifying January.

**Brand Standard:** `Veteran-Owned Since January 2025`

**Affected Files:**

| File                                | Line | Current Text                             |
| ----------------------------------- | ---- | ---------------------------------------- |
| src/components/home/HeroSection.tsx | 35   | "Founded 2010, Veteran-Owned Since 2025" |
| src/app/page.tsx                    | 50   | "Veteran-owned since 2025"               |
| src/app/page.tsx                    | 80   | "Veteran-owned since 2025"               |
| src/app/page.tsx                    | 101  | "Veteran-owned since 2025"               |
| src/app/layout.tsx                  | 35   | "veteran-owned since 2025"               |
| src/app/layout.tsx                  | 98   | "veteran-owned since 2025"               |
| src/app/layout.tsx                  | 115  | "veteran-owned since 2025"               |
| src/app/veterans/page.tsx           | 1325 | "Veteran-Owned Since 2025"               |
| src/lib/seo/page-seo-utils.ts       | 1110 | "Veteran-owned since 2025"               |

**Remediation:** Update all instances to include "January":

```text
✅ "Founded 2010, Veteran-Owned Since January 2025"
❌ "Veteran-Owned Since 2025"
❌ "veteran-owned since 2025"
```

---

### 3. Tagline Capitalization Inconsistency ("Client")

**Issue:** The slogan uses both "Client" (correct) and "client" (incorrect) across the codebase.

**Brand Standard:** Always capitalize "Client" — it emphasizes client-centricity.

**Correct Usage (✅):**

```text
"Building projects for the Client, NOT the Dollar"
```

**Incorrect Usage Found (❌):**

| File                                                 | Line | Issue                           |
| ---------------------------------------------------- | ---- | ------------------------------- |
| src/app/contact/page.tsx                             | 41   | lowercase "client"              |
| src/app/layout.tsx                                   | 96   | lowercase "client" and "dollar" |
| src/app/layout.tsx                                   | 113  | lowercase "client" and "dollar" |
| src/lib/chatbot/knowledge-base.ts                    | 198  | lowercase "client" and "dollar" |
| src/lib/seo/page-seo-utils.ts                        | 162  | lowercase "client" and "dollar" |
| src/app/careers/print/PrintableApplicationClient.tsx | 18   | lowercase "client" and "dollar" |
| src/components/locations/LocationPageContent.tsx     | 154  | lowercase "client" and "dollar" |
| src/lib/data/faq-data.ts                             | 31   | lowercase "client"              |
| src/lib/data/faq-data.ts                             | 189  | lowercase "client"              |
| src/lib/data/about-timeline.ts                       | 110  | lowercase "client"              |
| src/lib/data/careers.ts                              | 106  | lowercase "client"              |
| src/app/projects/components/projectsData.ts          | 115  | lowercase "client"              |

**Remediation:** Standardize all instances to capital "C" in "Client":

```typescript
// ✅ Correct
slogan: "Building projects for the Client, NOT the Dollar";

// ❌ Incorrect
slogan: "Building projects for the client, NOT the dollar";
```

---

### 4. Veteran-Owned Capitalization Inconsistency

**Issue:** Some files use lowercase "veteran-owned" instead of proper "Veteran-Owned".

**Brand Standard:** Always capitalize "Veteran-Owned" as a proper descriptor.

**Incorrect Usage Found:**

| File                      | Line | Current                                        |
| ------------------------- | ---- | ---------------------------------------------- |
| src/app/api/chat/route.ts | 154  | "veteran-owned since January"                  |
| src/app/api/chat/route.ts | 216  | "veteran-owned since January"                  |
| src/lib/data/locations.ts | 86   | "veteran-owned since January"                  |
| src/app/page.tsx          | 50   | "Veteran-owned since" (capital V, lowercase o) |

**Standard Format:**

```text
✅ "Veteran-Owned Since January 2025"
❌ "veteran-owned since January 2025"
❌ "Veteran-owned since January 2025"
```

---

### 5. "Dollar" Capitalization

**Issue:** Similar to "Client", "Dollar" should be capitalized in the primary slogan.

**Brand Standard:**

```text
"Building projects for the Client, NOT the Dollar"
```

**Files Using Lowercase "dollar":**

| File                                                 | Line |
| ---------------------------------------------------- | ---- |
| src/app/contact/page.tsx                             | 41   |
| src/app/layout.tsx                                   | 96   |
| src/app/layout.tsx                                   | 113  |
| src/lib/chatbot/knowledge-base.ts                    | 198  |
| src/lib/seo/page-seo-utils.ts                        | 162  |
| src/app/careers/print/PrintableApplicationClient.tsx | 18   |
| src/components/locations/LocationPageContent.tsx     | 154  |

---

### 6. Constants File Missing Brand Slogan

**Issue:** The `COMPANY_INFO` constants file doesn't include the brand slogan, causing each file to define it separately with variations.

**Current:** No slogan constant exists.

**Recommendation:** Add to [src/lib/constants/company.ts](../../src/lib/constants/company.ts):

```typescript
// Brand Messaging
slogan: {
  primary: "Building projects for the Client, NOT the Dollar",
  secondary: "THE ROI IS THE RELATIONSHIP",
},
```

---

## 🟠 High Priority Issues

### 7. Core Values Capitalization in Location Data

**Issue:** Core values are lowercase in location descriptions.

**Location:** [src/lib/data/locations.ts](../../src/lib/data/locations.ts)

**Current (lines 86, 244, 321, 391, 453, 507, 577, 631, 689, 743):**

```text
"...with honesty, integrity, professionalism, and thoroughness."
```

**Brand Standard:**

```text
"...with Honesty, Integrity, Professionalism, and Thoroughness."
```

---

### 8. HeroSection Missing January in Tagline

**Issue:** Home page hero shows "Veteran-Owned Since 2025" without month.

**Location:** [src/components/home/HeroSection.tsx#L35](../../src/components/home/HeroSection.tsx#L35)

**Current:**

```tsx
<span className="block text-brand-secondary">
  Founded 2010, Veteran-Owned Since 2025
</span>
```

**Should Be:**

```tsx
<span className="block text-brand-secondary">
  Founded 2010, Veteran-Owned Since January 2025
</span>
```

---

### 9. Legal Name Format Inconsistency

**Issue:** `COMPANY_INFO.legalName` uses different format than legal standard.

**Location:** [src/lib/constants/company.ts#L15](../../src/lib/constants/company.ts#L15)

**Current:**

```typescript
legalName: "MH Construction Incorporated - Veteran-Owned",
```

**Brand Standard:**

```typescript
legalName: "MH Construction, Inc.",
```

---

### 10. Inconsistent Date Storage Format

**Issue:** BBB accreditation date stored in ISO format but displayed differently.

**Location:** [src/lib/constants/company.ts#L79-L80](../../src/lib/constants/company.ts#L79-L80)

**Current:**

```typescript
bbbAccreditedSince: "2026-04-07", // ISO format
```

**Display in bbb object (line 107):**

```typescript
accreditedSince: "April 7, 2026", // Human-readable
```

**Recommendation:** Consolidate to single source with formatting function.

---

### 11. Veteran-Owned Year Only (No Month) in Details

**Issue:** `veteranOwnedSince` stores only year, not month.

**Location:** [src/lib/constants/company.ts#L77](../../src/lib/constants/company.ts#L77)

**Current:**

```typescript
veteranOwnedSince: 2025, // January 2025
```

**Recommendation:**

```typescript
veteranOwnedSince: "January 2025", // or "2025-01" for ISO
veteranOwnedSinceYear: 2025,
veteranOwnedSinceMonth: "January",
```

---

### 12. Missing Brand Constants Import Pattern

**Issue:** Many files hardcode brand values instead of importing from constants.

**Files hardcoding slogans instead of using constants:**

- src/app/contact/page.tsx
- src/app/projects/components/projectsData.ts
- src/lib/chatbot/knowledge-base.ts
- src/lib/data/faq-data.ts
- src/lib/data/careers.ts
- src/components/locations/LocationPageContent.tsx

**Recommendation:** Create `src/lib/constants/brand.ts` with all messaging constants.

---

## 🟡 Medium Priority Issues

### 13. Phone Format Validation

**Issue:** Phone constant uses dash format in raw, but standard uses parentheses.

**Location:** [src/lib/constants/company.ts#L22-L24](../../src/lib/constants/company.ts#L22-L24)

**Current:**

```typescript
phone: {
  display: "(509) 308-6489",  // ✅ Correct
  tel: "+15093086489",        // ✅ Correct
  raw: "5093086489",          // No formatting (OK for analytics)
}
```

✅ **Status:** Correctly implemented - no action needed.

---

### 14. SEO Title Consistency

**Issue:** Some pages use "Base HQ → Home" prefix, others don't.

**Files with prefix:**

- src/app/page.tsx
- src/app/layout.tsx
- src/lib/seo/page-seo-utils.ts

**Recommendation:** Document standard and apply consistently.

---

### 15. BBB Badge Alt Text

**Issue:** BBB image alt text uses "MH Construction, Inc." correctly.

**Location:** [src/app/testimonials/page.tsx#L1196](../../src/app/testimonials/page.tsx#L1196)

```tsx
alt = "MH Construction, Inc. BBB Business Review";
```

✅ **Status:** Correctly uses legal name - no action needed.

---

### 16. Color Hardcoding in Email Templates

**Issue:** Email templates hardcode hex colors instead of using CSS variables.

**Location:** [src/lib/email/templates.ts](../../src/lib/email/templates.ts)

**Current:**

```typescript
<h2 style="color: #386851;">
```

**Recommendation:** This is acceptable for email compatibility (CSS variables don't work in email), but document this exception.

---

### 17. Global Error Page Hardcoded Colors

**Issue:** Error pages hardcode brand colors inline.

**Location:** [src/app/global-error.tsx#L96-L138](../../src/app/global-error.tsx#L96-L138)

**Current:**

```typescript
backgroundColor: "#386851",
color: "#386851",
border: "2px solid #386851",
```

**Recommendation:** Acceptable for error boundary (needs to work without CSS), but document.

---

### 18. Chart Colors Hardcoded

**Issue:** Dashboard charts hardcode brand colors.

**Location:** [src/app/dashboard/SafetyTab.tsx#L90](../../src/app/dashboard/SafetyTab.tsx#L90)

```tsx
<Bar dataKey="count" fill="#386851" radius={[4, 4, 0, 0]} />
```

**Recommendation:** Consider extracting to constants for reuse.

---

## 🟢 Low Priority Issues

### 19. Terminology Consistency ✅

**Issue:** Website consistently uses "Client Partners" and "Trade Partners".

✅ **Status:** Properly implemented throughout codebase.

---

### 20. Service Area Consistency ✅

**Issue:** Service area regions are consistent across pages.

✅ **Status:** Properly implemented.

---

### 21. Hours Format Consistency ✅

**Issue:** Hours display format is consistent.

**Location:** [src/lib/constants/company.ts#L52-L60](../../src/lib/constants/company.ts#L52-L60)

✅ **Status:** Properly structured with display format.

---

### 22. Social Links Centralized ✅

**Issue:** Social media links centralized in constants.

✅ **Status:** Properly implemented in COMPANY_INFO.social.

---

## Recommendations Summary

### Immediate Actions (This Week)

1. **Fix COMPANY_INFO address format** - remove periods from abbreviations
2. **Add slogan and brand messaging constants** - create `src/lib/constants/brand.ts`
3. **Fix HeroSection** - add January to veteran-owned tagline
4. **Fix tagline capitalization** - update all "client" to "Client" and "dollar" to "Dollar"
5. **Fix veteran-owned capitalization** - standardize to "Veteran-Owned Since January 2025"
6. **Update COMPANY_INFO.legalName** - change to "MH Construction, Inc."

### Short-Term (This Month)

1. Create brand messaging constants file with:
   - Primary slogan
   - Secondary slogan
   - Vision statement
   - Core values as array

2. Refactor files to import from constants instead of hardcoding

3. Update location data core values capitalization

### Long-Term (Ongoing)

1. Add ESLint rule to flag brand term variations
2. Create brand consistency testing in CI/CD
3. Document exception patterns (email templates, error boundaries)

---

## Visual Consistency Checks

### Colors ✅

**Status:** Tailwind config properly defines brand colors matching brand-constants.md:

| Color Name           | Hex Value | Status |
| -------------------- | --------- | ------ |
| Hunter Green         | #386851   | ✅     |
| Leather Tan          | #BD9264   | ✅     |
| Architectural Bronze | #A87948   | ✅     |
| Secondary Text       | #8A6B49   | ✅     |

### Typography ✅

**Status:** Using system font stack as intended.

### Spacing ✅

**Status:** Using Tailwind default spacing scale.

---

## Appendix: Regex Patterns for Finding Issues

```bash
# Find tagline with lowercase "client"
grep -rn "for the client" src/

# Find veteran-owned without January
grep -rn "since 2025" src/ | grep -i veteran

# Find address with periods
grep -rn "N\. Capitol" src/

# Find lowercase veteran-owned
grep -rn "veteran-owned" src/ | grep -v "Veteran-Owned"
```

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md) | [← View Brand Constants](../branding/brand-constants.md)
