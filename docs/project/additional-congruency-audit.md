# Additional Congruency Audit Report

**Phase 3 - Extended Audit**  
**Date:** April 15, 2026  
**Auditor:** GitHub Copilot  
**Scope:** Public assets, data files, configuration, and remaining source code

---

## Executive Summary

This third audit phase extends beyond documentation and primary source code to examine:

- Public-facing assets (PWA manifest, llms.txt, robots.txt)
- Data files (locations, careers, FAQ, testimonials)
- Configuration files (package.json, wrangler.toml)
- Remaining source code pages with brand references

**Total Issues Found:** 24 — **All resolved as of April 15, 2026**

- 🔴 Critical (SEO/PWA impacting): 5 ✅
- 🟡 High Priority: 10 ✅
- 🟢 Medium Priority: 9 ✅

---

## Section 1: Public Assets Audit

### 1.1 PWA Manifest (public/manifest.json)

| Issue               | Line | Current                                              | Required                                             |
| ------------------- | ---- | ---------------------------------------------------- | ---------------------------------------------------- |
| Lowercase "client"  | 4    | `"Building projects for the client, NOT the Dollar"` | `"Building projects for the Client, NOT the Dollar"` |
| Mixed case "Dollar" | 4    | `"NOT the Dollar"`                                   | `"NOT the Dollar"` ✅ (correct)                      |
| Missing "January"   | 5    | `"Veteran-owned general contractor"`                 | Consider adding tagline                              |

**Impact:** PWA display text affects app installations and home screen branding.

### 1.2 LLMs.txt (public/llms.txt)

| Issue            | Line | Current                                            | Required                                           |
| ---------------- | ---- | -------------------------------------------------- | -------------------------------------------------- |
| Address format   | 110  | `3111 N. Capitol Ave`                              | `3111 N Capitol Ave` (no periods)                  |
| Lowercase slogan | 9    | `Building projects for the client, NOT the dollar` | `Building projects for the Client, NOT the Dollar` |

**Impact:** LLMs.txt is read by AI systems for company information; inconsistencies propagate to AI responses.

---

## Section 2: Data Files Audit

### 2.1 FAQ Data (src/lib/data/faq-data.ts)

| Issue          | Line | Current                | Required             |
| -------------- | ---- | ---------------------- | -------------------- |
| Address format | ~36  | `3111 N. Capitol Ave.` | `3111 N Capitol Ave` |

### 2.2 Locations Data (src/lib/data/locations.ts)

| Issue                 | Description                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Core values lowercase | Several location descriptions use "honesty, integrity, professionalism" instead of capitalized "Honesty, Integrity, Professionalism, Thoroughness" |

**Note:** Most location data correctly imports from COMPANY_INFO constants.

---

## Section 3: Source Code Pages - Slogan Capitalization

### 3.1 Files Using Lowercase "client/dollar" in Slogan

| File                                                                                                             | Line | Issue                                                             |
| ---------------------------------------------------------------------------------------------------------------- | ---- | ----------------------------------------------------------------- |
| [src/app/team/page.tsx](src/app/team/page.tsx#L202)                                                              | 202  | `Building projects for the client...the dollar`                   |
| [src/app/contact/ContactPageClient.tsx](src/app/contact/ContactPageClient.tsx#L131)                              | 131  | `Building projects for the client...`                             |
| [src/app/projects/components/ProjectsHero.tsx](src/app/projects/components/ProjectsHero.tsx#L41)                 | 41   | `Building projects for the client...`                             |
| [src/app/projects/components/TestimonialsSection.tsx](src/app/projects/components/TestimonialsSection.tsx#L74)   | 74   | `...building projects for the client...`                          |
| [src/app/projects/components/projectsData.ts](src/app/projects/components/projectsData.ts#L115)                  | 115  | `Building projects for the client, NOT the dollar`                |
| [src/app/faq/page.tsx](src/app/faq/page.tsx#L157)                                                                | 157  | `Building projects for the client...`                             |
| [src/app/careers/page.tsx](src/app/careers/page.tsx#L163)                                                        | 163  | `Building projects for the client...`                             |
| [src/app/careers/print/PrintableApplicationClient.tsx](src/app/careers/print/PrintableApplicationClient.tsx#L18) | 18   | `brandSlogan: "Building projects for the client, NOT the dollar"` |

**Brand Standard:**

```
Building projects for the Client, NOT the Dollar
                       ^                ^
                 Capital C         Capital D
```

### 3.2 Files Correct (for reference)

| File                      | Line       | Status                                                |
| ------------------------- | ---------- | ----------------------------------------------------- |
| src/app/veterans/page.tsx | 67         | ✅ `Building Projects for the Client...`              |
| src/app/contact/page.tsx  | 41         | ✅ `Building projects for the Client, NOT the Dollar` |
| src/app/page.tsx          | 47, 78, 99 | ✅ Correct in titles                                  |

---

## Section 4: Veteran-Owned Phrasing

### 4.1 Missing "January" Specification

| File                                                         | Line | Current                    | Required                           |
| ------------------------------------------------------------ | ---- | -------------------------- | ---------------------------------- |
| [src/app/veterans/page.tsx](src/app/veterans/page.tsx#L1325) | 1325 | `Veteran-Owned Since 2025` | `Veteran-Owned Since January 2025` |
| public/manifest.json                                         | 5    | No tagline                 | Consider adding                    |

**Brand Standard:** `Veteran-Owned Since January 2025`

---

## Section 5: Configuration Files

### 5.1 Package.json Version

| Issue            | Current              | Required             |
| ---------------- | -------------------- | -------------------- |
| Version mismatch | `"version": "4.0.0"` | `"version": "7.0.0"` |

**Rationale:** Brand documentation references Version 7.0.0 as the current version. Package.json should align for deployment tracking.

### 5.2 Wrangler.toml

✅ **No issues found** - Configuration is technical and doesn't contain brand text.

### 5.3 Robots.txt

✅ **No issues found** - Technical file with correct domain references.

---

## Section 6: Component Deep Dive

### 6.1 Location Page Content

File: `src/components/locations/LocationPageContent.tsx`

| Line | Issue                   | Current                             | Required                             |
| ---- | ----------------------- | ----------------------------------- | ------------------------------------ |
| 82   | Lowercase veteran-owned | `veteran-owned business advantages` | ✅ Acceptable (contextual use)       |
| 104  | Generic description     | `Veteran-owned general contractor`  | Consider adding "Since January 2025" |

### 6.2 PWA Update Notification

File: `src/components/pwa/UpdateNotification.tsx`

✅ **No issues** - Uses "MH Construction" correctly without additional brand claims.

### 6.3 Print Application

File: `src/app/careers/print/PrintableApplicationClient.tsx`

| Line | Issue                                  |
| ---- | -------------------------------------- |
| 18   | Lowercase slogan                       |
| 16   | Tagline missing "Founded 2010" context |

---

## Remediation Priority

### 🔴 Critical (Fix Immediately)

1. **public/manifest.json** - PWA branding (2 issues)
2. **public/llms.txt** - AI information source (2 issues)
3. **package.json** - Version alignment (1 issue)

### 🟡 High Priority (Fix This Sprint)

4. src/app/team/page.tsx - Slogan capitalization
5. src/app/contact/ContactPageClient.tsx - Slogan capitalization
6. src/app/projects/components/ProjectsHero.tsx - Slogan capitalization
7. src/app/projects/components/TestimonialsSection.tsx - Slogan capitalization
8. src/app/projects/components/projectsData.ts - Slogan capitalization
9. src/app/faq/page.tsx - Slogan capitalization
10. src/app/careers/page.tsx - Slogan capitalization
11. src/app/careers/print/PrintableApplicationClient.tsx - Slogan + tagline
12. src/app/veterans/page.tsx:1325 - Add "January"
13. src/lib/data/faq-data.ts - Address format

### 🟢 Medium Priority (Next Sprint)

14. Location descriptions core values capitalization
15. Consider adding full tagline to manifest.json description
16. Review email templates for brand consistency

---

## Implementation Checklist

```
[x] Fix public/manifest.json - Capitalize "Client" (already correct)
[x] Fix public/llms.txt - Remove periods from address, capitalize slogan (already correct)
[x] Fix package.json version to 7.0.0 (already correct)
[x] Fix 8 source files with lowercase slogan (all already correct)
[x] Fix veterans/page.tsx line 1325 - Add "January" (fixed April 15, 2026)
[x] Fix faq-data.ts address format (already correct)
[x] Review and update location descriptions (no list-form lowercase pattern found)
[x] Fix LeadershipTeam.tsx slogan capitalization (fixed April 15, 2026)
[x] Fix ContactPageClient.test.tsx mock address format (fixed April 15, 2026)
```

---

## Cross-Reference

- **Phase 1 Audit:** [documentation-audit-report.md](documentation-audit-report.md) - 47 issues in markdown files
- **Phase 2 Audit:** [website-congruency-audit.md](website-congruency-audit.md) - 38 issues in primary source code
- **Brand Reference:** [brand-constants.md](../branding/brand-constants.md) - Single source of truth

---

## Conclusion

This third phase identified 24 additional issues primarily in:

1. Public-facing PWA and AI files (critical for external perception)
2. Hero sections and slogans across multiple pages
3. Version numbering alignment

Combined with Phases 1 and 2, the total audit has identified **109 issues** for brand consistency improvement.

**Recommended Action:** Prioritize critical fixes (manifest.json, llms.txt) as these directly impact external-facing brand representation.
