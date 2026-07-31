# MH Page Slogans

**Category:** Branding - Strategy
**Last Updated:** July 24, 2026
**Status:** Official Reference

> **Purpose:** Runtime source-of-truth for unique page-level hero slogans is [apps/website/src/content/hero-page-slogans.md](../../../apps/website/src/content/hero-page-slogans.md).
> This document is the governance companion for how to author, review, and validate that runtime matrix.
> The primary slogan remains [Brand Constants](../brand-constants.md) and every page in scope should have one page-specific slogan in addition to the canonical primary line.

**Brand Congruency:** Page slogans should stay factual, relationship-first, and aligned with the canonical MH slogan family and construction-first page naming.

---

## Usage Rules

1. Use one page-specific slogan per page key as the default for that page.
2. Page-level hero slogans must be unique across hero surfaces (no cross-page reuse).
3. Keep the wording plain, factual, and aligned with MH brand voice.
4. When adding a new page, add its slogan in [apps/website/src/content/hero-page-slogans.md](../../../apps/website/src/content/hero-page-slogans.md) and treat that runtime file as the canonical matrix.
5. Prefer wording that naturally echoes the page's SEO name or MH brand name when that improves dual-terminology alignment.
6. If a route intentionally has no hero section, document that exception in the slogan coverage matrix and keep runtime source comments aligned.

## Canonical Matrix

Use the runtime matrix directly:

- [apps/website/src/content/hero-page-slogans.md](../../../apps/website/src/content/hero-page-slogans.md)

The strategy layer should not duplicate the full matrix table to avoid drift.

## Review Checklist

Use this checklist during slogan additions and edits:

1. Confirm the page key exists in [apps/website/src/content/hero-page-slogans.md](../../../apps/website/src/content/hero-page-slogans.md).
2. Confirm the slogan is unique compared to all other page keys.
3. Confirm wording remains factual and relationship-first.
4. Confirm terminology aligns with [Dual Terminology Standard](./dual-terminology-standard.md).
5. Run the coverage gate from `apps/website`:

```bash
npm run slogan:coverage:check
```

## Example Entries

Representative examples from the canonical runtime matrix:

- home: Home - Straight answers from the Command Center, built with American grit.
- services: Services - Services with operations-brief discipline, done right for every American jobsite.
- projects: Projects - Projects with SITREP accountability and craftsmanship that honors the work.
- safety: Safety - Safety under Safety Command standards to protect every crew and family.
- resources: Resources - Resources in a Field Resources library built for real-world readiness.

## Reference Note

The page slogans are intentionally distinct from the supporting slogan family in [Brand Constants](../brand-constants.md) and from the hero-surface coverage map in [Slogan Coverage Matrix](./slogan-coverage-matrix.md).
Use the runtime matrix for page-level slogan values and use this strategy page for governance and review.
When a slogan can naturally include the page's MH brand name, prefer that form over generic wording.
