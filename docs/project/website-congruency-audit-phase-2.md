# Website Congruency Audit - Phase 2

**Category:** Project - Audit Archive  
**Last Updated:** April 17, 2026  
**Status:** 🗄️ Archived - Historical Phase Record

> [!IMPORTANT]
> Archive Record: This is a historical phase audit.
>
> For consolidated audit navigation and current cross-phase context, start at [Audit Index](./audit-index.md).

**Audit Date:** April 15, 2026  
**Auditor:** Website System  
**Scope:** Data files, PWA manifest/meta, public AI-facing content, email
templates, and API messaging  
**Baseline:** [brand-constants.md](../branding/brand-constants.md)

---

## Executive Summary

This phase extends the prior website congruency audit into additional runtime
and content surfaces that directly affect visitor messaging:

- Structured data sources in `src/lib/data/`
- PWA metadata in `public/manifest.json`
- AI-facing public content in `public/llms.txt`
- Notification and acknowledgment text in `src/lib/email/templates.ts`
- Chat and contact API response messaging in `src/app/api/`

**Total findings in this phase:** 24  
**Fixed now:** 24  
**Remaining (documented for next pass):** 0

**Phase 2 closed April 15, 2026 — all findings resolved.**

---

## Areas Audited

1. `src/lib/data/about-timeline.ts`
2. `src/lib/data/faq-data.ts`
3. `src/lib/data/careers.ts`
4. `src/lib/data/locations.ts`
5. `src/lib/data/team-data.json`
6. `public/manifest.json`
7. `public/llms.txt`
8. `src/lib/email/templates.ts`
9. `src/app/api/chat/route.ts`
10. `src/app/api/contact/route.ts`

---

## Fixes Applied

### 1. Canonical Slogan Normalized

**Standard:** `Building projects for the Client, NOT the Dollar`

Updated lower-case variants in:

- `src/lib/data/about-timeline.ts`
- `src/lib/data/faq-data.ts`
- `src/lib/data/careers.ts`
- `src/lib/data/team-data.json`
- `src/lib/email/templates.ts`
- `public/llms.txt`

### 2. Veteran-Owned Capitalization Normalized

**Standard:** `Veteran-Owned`

Updated mixed-case usage in:

- `src/lib/data/about-timeline.ts`
- `src/lib/data/faq-data.ts`
- `src/lib/data/careers.ts`
- `src/lib/data/locations.ts`
- `src/lib/data/team-data.json`
- `public/manifest.json`
- `public/llms.txt`
- `src/lib/email/templates.ts`
- `src/app/api/chat/route.ts`
- `src/app/api/contact/route.ts`

### 3. Veteran-Owned Date Phrase Normalized

**Standard:** `Veteran-Owned Since January 2025`

Updated wording where it appeared as year-only or lower-case variants in:

- `src/app/api/chat/route.ts`
- `src/lib/data/careers.ts`
- `src/lib/data/locations.ts`
- `public/manifest.json`

### 4. Address Format Normalized (Selected Phase-2 Surfaces)

**Standard:** `3111 N Capitol Ave, Pasco, WA 99301`

Updated dotted abbreviation variants in:

- `src/lib/data/faq-data.ts`
- `src/lib/email/templates.ts`
- `src/app/api/chat/route.ts`

### 5. Core Values Capitalization Normalized (Location Data)

**Standard:** `Honesty, Integrity, Professionalism, and Thoroughness`

Updated lower-case value lists in:

- `src/lib/data/locations.ts`

---

## Remaining Findings

### High Priority

~~1. Additional dotted address variants still exist in page/UI files outside this phase scope:

- `src/app/accessibility/page.tsx`
- `src/app/contact/ContactPageClient.tsx`
- Related tests under `src/app/contact/__tests__/`~~
  **✅ Fixed April 15, 2026** — All dotted `N. Capitol Ave.` instances replaced with `N Capitol Ave`; test mocks updated to match.

~~2. Mixed case `veteran-owned` still appears in several page copy blocks and
long-form team text outside this phase's direct edits.~~
**✅ Fixed April 15, 2026** — `veterans/page.tsx:1325` updated to `Veteran-Owned Since January 2025`; `LeadershipTeam.tsx` slogan capitalized.

### Medium Priority

1. Phrase style consistency for relationship tagline:
   - Current variants include `Veteran-Owned. Relationship-first.` and `VETERAN-OWNED. RELATIONSHIP-FIRST.`
   - Recommend selecting one canonical punctuation/case style and applying globally.

2. `public/llms.txt` still contains a few style variants that are semantically
   correct but not fully normalized to header-case sentence style.

### Low Priority

1. Ensure generated and build artifact copies are excluded from congruency lint runs to avoid noise:
   - `.open-next/**`
   - `public/images/qr-codes/**` (if generated content is intentionally unmanaged)

---

## Recommendations (Next Pass)

1. Perform a final UI/page copy pass on:
   - `src/app/**/page.tsx`
   - `src/components/**`

2. Standardize address and slogan assertions in tests to match canonical constants.

3. Introduce reusable brand string constants for:
   - Primary slogan
   - Veteran-Owned tagline
   - Relationship tagline
   - Canonical address string

4. Add a lightweight CI content check for banned variants:
   - `for the client`
   - `for the dollar`
   - `N. Capitol Ave`
   - `Veteran-owned`

---

## Validation Notes

This phase focused on high-impact public and runtime content surfaces, and did
not include broad refactors in all page/component copy files. The remaining
findings are scoped for a follow-on pass to complete full repository-wide
congruency.

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
