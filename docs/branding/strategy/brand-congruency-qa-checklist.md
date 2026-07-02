# Brand Congruency QA Checklist

Last Updated: 2026-07-02
Status: Active

## Purpose

Use this checklist to verify that MH branding remains congruent across slogans, core values, and section-level messaging.

This checklist complements:

- Slogan Coverage Matrix
- Core Values Slogan Validator
- Primary/Supporting Slogan Validator
- Brand Congruency Sync Validator

## Core Value Slogan Pairs (Canonical)

| Core Value      | Primary Value Slogan               | Supporting Slogan                                |
| --------------- | ---------------------------------- | ------------------------------------------------ |
| Honesty         | Truth in every touchpoint.         | Clear facts. No spin. No surprises.              |
| Integrity       | Do right when no one is watching.  | Commitments kept under pressure.                 |
| Professionalism | Prepared, precise, and respectful. | Standards high on every site, every day.         |
| Thoroughness    | Every detail accounted for.        | Measure twice, document always, close out clean. |

## Placement Map (Current Website)

| Surface                       | File                                                   | Check                                                                 |
| ----------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------- |
| Core Values section rendering | apps/website/src/components/home/CoreValuesSection.tsx | Shows all 4 primary + all 4 supporting slogans                        |
| Core Values EN source         | messages/home/en.json                                  | Each value has valueSlogan and supportingSlogan                       |
| Core Values ES source         | messages/home/es.json                                  | Mirrors valueSlogan/supportingSlogan in bilingual format              |
| Shared brand constants        | packages/shared/src/lib/constants/company.ts           | Includes coreValues slogan pairs under COMPANY_INFO.slogan.coreValues |

## QA Workflow

Run from apps/website:

```bash
npm run slogan:coverage:check
npm run slogan:primary-support:check
npm run slogan:core-values:check
npm run brand:congruency:sync:check
```

Then run targeted tests:

```bash
npm run test -- --runInBand scripts/validation/__tests__/check-seo-route-indexing.test.js scripts/validation/__tests__/check-primary-slogan-support.test.js scripts/validation/__tests__/check-core-values-slogans.test.js src/components/home/__tests__/CoreValuesSection.test.tsx
```

## Release Checklist

- Confirm each page-level hero has a primary and supporting slogan.
- Confirm every primary slogan occurrence has at least one supporting slogan in the same surface/file context.
- Confirm all four core values have unique primary slogans.
- Confirm all four core values have unique supporting slogans.
- Confirm EN and ES core value slogan fields remain aligned.
- Confirm Spanish bilingual format preserves EN canonical lines plus ES translations in parentheses.
- Confirm validation scripts and tests pass before merge.

## Authoring Rules

When editing core value messaging:

1. Update messages/home/en.json fields first.
2. Mirror updates in messages/home/es.json using bilingual style.
3. Update COMPANY_INFO.slogan.coreValues when canonical wording changes.
4. Re-run the three slogan validators.
5. Re-run targeted validation tests.
