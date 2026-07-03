# Brand Congruency Master Checklist

**Category:** Branding - Governance  
**Last Updated:** July 3, 2026  
**Status:** Active - Canonical

## Purpose

This is the canonical branding gate for all branding-sensitive changes.
Use this checklist before merge for page copy, UI components, metadata, schema labels,
or documentation that can affect MH brand consistency.

## Global Pass Criteria

1. **Constants:** Company facts, slogans, and contact/license values match `brand-constants.md`.
1. **Voice:** Copy remains relationship-first, factual, and non-hype.
1. **Veteran framing:** Veteran-owned wording is accurate and factual.
1. **Trust continuity:** Accreditation and trust signals are preserved where present.
1. **Terminology:** Naming remains consistent across UI copy, metadata, schema, and docs.
1. **Accessibility:** Semantic headings, labels, contrast, and keyboard flow remain valid.
1. **SEO naming:** Labels and titles stay plain-language and canonical.
1. **Exceptions:** Approved design/color exceptions remain scoped to documented components only.
1. **Duplicate phrasing policy:** Public-facing copy does not repeat guarded phrasing or sentence-level boilerplate within the same page file.
1. **Dictionary parity:** New public page labels are added to `src/lib/branding/page-names.ts` aliases before rollout.

## Required Review Order

1. `docs/branding/agent-branding-policy.md`
2. `docs/branding/brand-constants.md`
3. `docs/branding/governance/website-guardrails-coverage.md`
4. Relevant standards or strategy files for the surface being changed
5. Companion checklist for your change type (if needed)

For visual implementation changes, include applicable canonical visual contracts in
`docs/branding/standards/unified-component-standards.md` during review.

## Companion Checklists

- Strategy-specific QA (slogans/core values):
  `docs/branding/strategy/brand-congruency-qa-checklist.md`
- Development implementation QA (tokens/components):
  `docs/development/standards/branding-congruency-checklist.md`

## Merge Gate Result

Record one result in the PR description or review notes:

- `PASS`: All checklist items satisfied.
- `FAIL`: Include concrete remediation steps and file targets.

## Required Validation for Terminology/Copy Changes

Run these targeted tests when copy, terminology labels, breadcrumbs, or metadata naming changes:

- `npm test -- src/lib/branding/__tests__/page-names.test.ts`
- `npm test -- src/app/__tests__/public-copy-phrasing-guard.test.ts`

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
