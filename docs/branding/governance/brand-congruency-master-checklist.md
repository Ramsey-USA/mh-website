# Brand Congruency Master Checklist

**Category:** Branding - Governance  
**Last Updated:** July 11, 2026  
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
1. **Dual terminology:** Cross-asset naming follows `docs/branding/strategy/dual-terminology-standard.md` for website, dashboard, MISH, handbook, and document surfaces.
1. **Construction glossary:** PMBOK 6 alignment and military-themed construction terms follow `docs/branding/strategy/construction-terminology-glossary.md`.
1. **Accessibility:** Semantic headings, labels, contrast, and keyboard flow remain valid.
1. **SEO naming:** Labels and titles stay plain-language and canonical.
1. **Document chip parity:** For print/document artifacts, program/chapter/form identifier pillboxes use the canonical `1.5pt` corner radius consistently across safety-manual and employee-handbook templates.
1. **TOC association parity:** Print TOCs preserve chapter-to-form pairing (chapter left, associated forms right), continuation pages keep page-1 spacing, TOC row spacing remains locked at `0.1in`, safety/handbook footer structures match (no legacy footer labels), and handbook TOC does not render empty continuation pages.
1. **Spine metadata parity:** Safety and handbook spines keep identical metadata-stack structure and spacing with `.spine-logo-wrap { gap: 0; }` and `.spine-meta { padding-top: 0.1in; gap: 0.1in; }`.
1. **Tabs geometry and signature parity:** Safety and handbook tabs keep matched frame/ribbon/footer/veteran-strip geometry and canonical two-part approval-signature contracts: handbook (`Jeremy Thamert` + `Kimberly Thamert`) and safety (`Jeremy Thamert` + `Matt Ramsey`) with per-signer signature/date lane ratio `1.5fr 0.85fr`, tuned lane/role spacing (`10pt`/`6pt` rhythm), and no cross-manual language leakage.
1. **Exceptions:** Approved design/color exceptions remain scoped to documented components only.
1. **Duplicate phrasing policy:** Public-facing copy does not repeat guarded phrasing or sentence-level boilerplate within the same page file.
1. **Dictionary parity:** New public page labels are added to `src/lib/branding/page-names.ts` aliases before rollout.
1. **Visual evidence:** Branding-sensitive changes include required cross-surface visual evidence in PR notes.

## Required Review Order

1. `docs/branding/agent-branding-policy.md`
2. `docs/branding/brand-constants.md`
3. `docs/branding/governance/website-guardrails-coverage.md`
4. Relevant standards or strategy files for the surface being changed
5. Companion checklist for your change type (if needed)

For terminology and dual-label changes, pair this checklist with `docs/branding/strategy/dual-terminology-standard.md` and `docs/branding/strategy/universal-terminology-guide.md`.

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

## Required Evidence for Branding-Sensitive Changes

Record this evidence in the PR description or review notes:

1. Mobile and desktop before/after screenshots for each affected route family.
2. At least one focus-visible keyboard pass for changed interactive clusters.
3. Confirmation of loading/error/offline/not-found state congruency where affected.
4. Confirmation that trust/accreditation surfaces remain present and legible.
5. PASS/FAIL result for this master checklist.
6. PASS/FAIL result for the development companion checklist when implementation changes are included.

## Required Validation for Terminology/Copy Changes

Run these targeted tests when copy, terminology labels, breadcrumbs, or metadata naming changes:

- `npm test -- src/lib/branding/__tests__/page-names.test.ts`
- `npm test -- src/app/__tests__/public-copy-phrasing-guard.test.ts`

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
