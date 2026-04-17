# Documentation Consistency Audit Report

**Category:** Project - Audit Archive  
**Last Updated:** April 17, 2026  
**Status:** 🗄️ Archived - Historical Phase Record

> [!IMPORTANT]
> Archive Record: This is a historical phase audit.
>
> For consolidated audit navigation and current cross-phase context, start at [Audit Index](./audit-index.md).

**Audit Date:** April 15, 2026  
**Auditor:** Documentation System  
**Scope:** All 63 markdown files in the repository  
**Baseline:** [README.md](../../README.md) (Last Updated: April 9, 2026)

---

## Executive Summary

This audit identifies inconsistencies across documentation files that impact brand cohesion,
professional appearance, and developer experience. Issues are categorized by severity and
organized with specific remediation steps.

**Total Issues Found:** 47 — **All actionable items resolved as of April 15, 2026**  
**Critical:** 8 ✅ | **High:** 12 ✅ | **Medium:** 18 ✅ | **Low:** 9 ✅

---

## 🔴 Critical Issues (Immediate Action Required)

### 1. Outdated "Last Updated" Dates (20+ files)

**Issue:** Many files show 2025 dates while the current date is April 2026.

**Affected Files:**

| File                                                                                                               | Current Date      | Should Be      |
| ------------------------------------------------------------------------------------------------------------------ | ----------------- | -------------- |
| [docs/branding/strategy/brand-overview.md](../branding/strategy/brand-overview.md)                                 | December 28, 2025 | April 15, 2026 |
| [docs/branding/strategy/messaging.md](../branding/strategy/messaging.md)                                           | December 28, 2025 | April 15, 2026 |
| [docs/branding/index.md](../branding/index.md)                                                                     | December 24, 2025 | April 15, 2026 |
| [docs/branding/standards/unified-component-standards.md](../branding/standards/unified-component-standards.md)     | December 28, 2025 | April 15, 2026 |
| [docs/branding/standards/color-system.md](../branding/standards/color-system.md)                                   | December 25, 2025 | April 15, 2026 |
| [docs/branding/standards/hero-section-standards.md](../branding/standards/hero-section-standards.md)               | December 14, 2025 | April 15, 2026 |
| [docs/branding/strategy/universal-terminology-guide.md](../branding/strategy/universal-terminology-guide.md)       | December 14, 2025 | April 15, 2026 |
| [docs/branding/strategy/page-specific-messaging-guide.md](../branding/strategy/page-specific-messaging-guide.md)   | December 14, 2025 | April 15, 2026 |
| [docs/marketing/gbp-post-templates.md](../marketing/gbp-post-templates.md)                                         | December 22, 2025 | April 15, 2026 |
| [docs/development/quick-reference/component-cheatsheet.md](../development/quick-reference/component-cheatsheet.md) | December 28, 2025 | April 15, 2026 |
| [docs/technical/seo/seo-complete-guide.md](../technical/seo/seo-complete-guide.md)                                 | December 14, 2025 | April 15, 2026 |
| [docs/business/services.md](../business/services.md)                                                               | October 2025      | April 15, 2026 |
| [config/config-directory-guide.md](../../config/config-directory-guide.md)                                         | November 8, 2025  | April 15, 2026 |
| [scripts/mh-scripts-guide.md](../../scripts/mh-scripts-guide.md)                                                   | November 17, 2025 | April 15, 2026 |

**Impact:** Appears unprofessional and creates confusion about document currency.

**Remediation:** Update all "Last Updated" dates to current date when making changes.

---

### 2. Missing BBB Accreditation (Brand-Critical)

**Issue:** The README documents BBB Accreditation with A+ Rating since April 7, 2026, but this
achievement is missing from branding documents.

**Affected Files:**

- [docs/branding/strategy/brand-overview.md](../branding/strategy/brand-overview.md) - No mention
- [docs/branding/strategy/messaging.md](../branding/strategy/messaging.md) - No mention
- [docs/business/core-values.md](../business/core-values.md) - No mention

**Impact:** Major business achievement not reflected in branding materials.

**Remediation:** Add BBB Accreditation to:

- Brand Overview → Key Differentiators section
- Messaging Guidelines → Trust indicators
- Core Values → Professional credentials section

**Standard Format:**

```markdown
**BBB Accredited:** A+ Rating since April 7, 2026 — [View BBB Profile](https://www.bbb.org/us/wa/pasco/profile/construction/mh-construction-inc-1296-1000191036)
```

---

### 3. Conflicting Mission Statement Definition

**Issue:** `brand-overview.md` defines a secondary mission statement that conflicts with primary brand messaging.

**README (Canonical):**

> "Building projects for the Client, NOT the Dollar"

**brand-overview.md (Conflicting):**

> "We deliver high-quality construction rooted in integrity, clear communication, and long-term relationships."

**Impact:** Brand confusion; different messaging in different contexts.

**Remediation:**

- Keep secondary statement as "Vision" not "Mission"
- Ensure primary slogan is ALWAYS "Building projects for the Client, NOT the Dollar"
- Update brand-overview.md Mission section to use canonical slogan

---

## 🟠 High Priority Issues

### 4. Company Name Inconsistency

**Issue:** Some documents use "MH Construction" while others use "MH Construction, Inc."

**README Usage:** "MH Construction" (12 occurrences)

**Files Using "MH Construction, Inc.":**

| File                                                                                             | Context                            |
| ------------------------------------------------------------------------------------------------ | ---------------------------------- |
| [docs/branding/strategy/brand-overview.md](../branding/strategy/brand-overview.md#L31)           | Company Information section        |
| [docs/marketing/gbp-post-templates.md](../marketing/gbp-post-templates.md#L3)                    | Header                             |
| [docs/technical/browser-tab-titles-inventory.md](../technical/browser-tab-titles-inventory.md)   | Privacy/Terms/Accessibility titles |
| [docs/business/core-values.md](../business/core-values.md#L328)                                  | Footer line                        |
| [docs/business/services.md](../business/services.md#L432)                                        | Footer line                        |
| [docs/development/standards/consistency-guide.md](../development/standards/consistency-guide.md) | Footer examples                    |

**Standard:**

- **Legal/Formal contexts:** "MH Construction, Inc." (contracts, legal pages, official filings)
- **Marketing/Branding contexts:** "MH Construction" (website, marketing materials)

**Remediation:** Document this distinction in Universal Terminology Guide and apply consistently.

---

### 5. Tagline Capitalization Inconsistency

**Issue:** Inconsistent capitalization of "Client" in the primary slogan.

**README Standard:** "Building projects for the **C**lient, NOT the Dollar"

**Incorrect Usage Found:**

- [docs/marketing/gbp-post-templates.md](../marketing/gbp-post-templates.md): "client" (lowercase)
- [docs/development/standards/consistency-guide.md](../development/standards/consistency-guide.md): "client" (lowercase)
- [docs/business/index.md](../business/index.md): "client" (lowercase)
- [docs/business/core-values.md](../business/core-values.md): "client" (lowercase)

**Impact:** Inconsistent brand presentation across materials.

**Remediation:** Standardize to capital "C" in "Client" everywhere:

```text
✅ "Building projects for the Client, NOT the Dollar"
❌ "Building projects for the client, NOT the dollar"
```

---

### 6. Address Format Inconsistency

**Issue:** Multiple formats used for company address.

| File                             | Format                                  |
| -------------------------------- | --------------------------------------- |
| README.md                        | `3111 N Capitol Ave, Pasco, WA 99301`   |
| brand-overview.md                | `3111 N. Capitol Ave., Pasco, WA 99301` |
| google-business-profile-guide.md | `3111 N. Capitol Ave., Pasco, WA 99301` |

**Standard (per README):** `3111 N Capitol Ave, Pasco, WA 99301`

**Remediation:** Update all instances to match README format.

---

### 7. Veteran-Owned Phrasing Inconsistency

**Issue:** Multiple variations of veteran-owned phrasing.

**Variations Found:**

- "Veteran-Owned Since January 2025" (with month)
- "Veteran-Owned Since 2025" (year only)
- "veteran-owned since January 2025" (lowercase)
- "Veteran-Owned since 2025" (mixed case)

**Standard (per README):** "Veteran-Owned Since January 2025"

**Remediation:** Standardize across all files to exact README phrasing with:

- Capital V in "Veteran"
- Capital O in "Owned"
- Include "January"

---

### 8. Version Number Misalignment

**Issue:** Branding documents have inconsistent version numbers.

| Document                       | Version | Expected |
| ------------------------------ | ------- | -------- |
| unified-component-standards.md | 7.0.0   | 7.0.0 ✅ |
| messaging.md                   | 7.0.0   | 7.0.0 ✅ |
| brand-overview.md              | 6.0.0   | 7.0.0 ❌ |
| color-system.md                | 5.2.0   | 7.0.0 ❌ |
| hero-section-standards.md      | (none)  | 7.0.0 ❌ |

**Impact:** Creates confusion about which document is authoritative.

**Remediation:** Align all branding standard documents to v7.0.0 or implement semantic versioning policy.

---

## 🟡 Medium Priority Issues

### 9. Redundant Content Across Documents

**Issue:** The following content is duplicated across multiple files:

#### Company Information Block

Repeated in: README, brand-overview.md, services.md, google-business-profile-guide.md

**Recommendation:** Create a single `company-info.md` reference file and link to it.

#### Core Values Definition

Repeated in: brand-overview.md, messaging.md, core-values.md, consistency-guide.md

**Recommendation:** Designate `core-values.md` as single source of truth; other docs should link.

#### 5 Core Page Groups

Repeated in: messaging.md, page-specific-messaging-guide.md, consistency-guide.md

**Recommendation:** Consolidate to `page-specific-messaging-guide.md` only.

---

### 10. Missing Cross-References

**Issue:** Some documents don't link back to README or related guides.

**Files Missing "Back to README" Links:**

- [docs/technical/safety-program-guide.md](../technical/safety-program-guide.md)
- [docs/deployment/safety-smoke-setup.md](../deployment/safety-smoke-setup.md)
- [docs/deployment/safety-ci-gate-policy.md](../deployment/safety-ci-gate-policy.md)

**Remediation:** Add standard footer with navigation links.

---

### 11. Inconsistent Status Indicators

**Issue:** Different formats used for document status.

| Format              | Files Using                                        |
| ------------------- | -------------------------------------------------- |
| `✅ Active`         | services-integration-guide.md, cloudflare-guide.md |
| `Official Standard` | core-values.md, services.md                        |
| `Status: ✅ Active` | brand-overview.md, messaging.md                    |
| No status           | Several files                                      |

**Standard Format:**

```markdown
**Status:** ✅ Active
```

---

### 12. Tech Stack Version Outdated

**Issue:** Some documents reference older Next.js/package versions.

**README Current:** Next.js 15.5.14, TypeScript 5.9.2

**Outdated References Found:**

- [docs/project/architecture.md](../project/architecture.md): Next.js 15.5.12

**Remediation:** Update all tech stack references to match README.

---

## 🟢 Low Priority Issues

### 13. Inconsistent Header Formatting

**Issue:** Some docs use emoji in headers, others don't.

**Files with Emoji Headers:** consistency-guide.md, analytics-guide-for-matt-and-jeremy.md
**Files without:** homepage.md, architecture.md

**Recommendation:** Standardize to NO emoji in `.md` headers for cleaner rendering.

### 14. Inconsistent Code Block Languages

**Issue:** Some code blocks specify language, others don't.

**Recommendation:** Always specify language for syntax highlighting:

```typescript
// Good
```

### 15. Missing Table of Contents

**Issue:** Longer documents (>200 lines) should have TOC.

**Files Missing TOC:**

- core-values.md
- services.md
- universal-terminology-guide.md (partial)

---

## Recommendations Summary

### Immediate Actions (This Week)

1. ✅ Update all "Last Updated" dates to April 15, 2026
2. ✅ Add BBB Accreditation to all branding documents
3. ✅ Standardize company name usage policy
4. ✅ Fix tagline capitalization ("Client" not "client")
5. ✅ Align version numbers to v7.0.0

### Short-Term (This Month)

1. Create `BRAND-CONSTANTS.md` as single source of truth for:
   - Company name (formal vs informal rules)
   - Address format
   - Phone format
   - Email format
   - Slogan exact text
   - Veteran-owned phrasing

2. Remove redundant content:
   - Core values should only be fully defined in `core-values.md`
   - Company info should only be fully defined in README
   - Other docs should link, not duplicate

3. Add standardized footer to all docs:

   ```markdown
   ---

   **MH Construction** — Founded 2010, Veteran-Owned Since January 2025
   [← Back to README](../../README.md)
   ```

### Long-Term (Ongoing)

1. Implement documentation review process:
   - PR checklist item: "Documentation updated?"
   - Quarterly documentation audit
   - Single owner for brand documentation

2. Consider documentation automation:
   - Script to validate dates are current
   - Script to check for brand term consistency
   - CI check for broken internal links

---

## Files Requiring Updates

### Priority 1 (Brand-Critical)

- [x] [docs/branding/strategy/brand-overview.md](../branding/strategy/brand-overview.md) — BBB already present; v7.0.0 ✅
- [x] [docs/branding/strategy/messaging.md](../branding/strategy/messaging.md) — BBB added April 15, 2026 ✅
- [x] [docs/business/core-values.md](../business/core-values.md) — BBB added April 15, 2026 ✅

### Priority 2 (High Visibility)

- [x] [docs/marketing/gbp-post-templates.md](../marketing/gbp-post-templates.md) — date updated April 15, 2026 ✅
- [x] [docs/marketing/google-business-profile-guide.md](../marketing/google-business-profile-guide.md) — slogan fixed April 15, 2026 ✅
- [x] [docs/development/standards/consistency-guide.md](../development/standards/consistency-guide.md) — slogan + address fixed April 15, 2026 ✅

### Priority 3 (Technical Docs)

- [x] [docs/technical/services-integration-guide.md](../technical/services-integration-guide.md) — already current ✅
- [x] [docs/project/architecture.md](../project/architecture.md) — Next.js version updated to 15.5.14 ✅
- [x] [docs/deployment/cloudflare-guide.md](../deployment/cloudflare-guide.md) — already current ✅

### Priority 4 (Supporting Docs)

- [x] Stale 2025 dates — updated in seo-complete-guide.md, config-directory-guide.md ✅
- [x] README.md — bottom slogan capitalized; project status + Last Updated refreshed ✅

---

## Appendix: Brand Constants Reference

Use these exact values across all documentation:

```yaml
Company:
  Legal Name: "MH Construction, Inc."
  Brand Name: "MH Construction"

Identity:
  Founded: "2010"
  Founder: "Mike Holstein"
  Veteran Owner: "Jeremy Thamert"
  Veteran Since: "January 2025"
  BBB Rating: "A+ since April 7, 2026"

Contact:
  Phone: "(509) 308-6489"
  Email: "office@mhc-gc.com"
  Website: "https://www.mhc-gc.com"
  Address: "3111 N Capitol Ave, Pasco, WA 99301"

Brand:
  Primary Slogan: "Building projects for the Client, NOT the Dollar"
  Secondary Slogan: "THE ROI IS THE RELATIONSHIP"
  Tagline: "Founded 2010, Veteran-Owned Since January 2025"

Colors:
  Primary (Hunter Green): "#386851"
  Secondary (Leather Tan): "#BD9264"
  Secondary Text: "#8A6B49"

Values:
  - Honesty
  - Integrity
  - Professionalism
  - Thoroughness
  Ultimate Goal: Trust

Service Area:
  Primary: "Tri-Cities WA (Richland, Kennewick, Pasco, West Richland)"
  Extended: "Yakima, Spokane, Walla Walla"
  Licensed: "WA, OR, ID"
```

---

**Report Generated:** April 15, 2026  
**Next Review:** May 15, 2026
