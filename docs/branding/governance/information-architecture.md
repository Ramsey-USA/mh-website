# Brand Documentation Information Architecture

**Category:** Branding - Governance  
**Last Updated:** July 2, 2026  
**Status:** Active

## Goal

Keep branding markdown organized around clear ownership so future developers can find, update,
and enforce MH branding standards without duplicating guidance.

## Folder Ownership Model

- `docs/branding/brand-constants.md`: Canonical factual constants (identity, messaging lines, licenses, contact values).
- `docs/branding/agent-branding-policy.md`: Fast policy for decision-making and conflict handling.
- `docs/branding/standards/*`: Visual and component standards.
- `docs/branding/strategy/*`: Messaging strategy, terminology, and slogan coverage content.
- `docs/branding/governance/*`: Documentation process rules, checklist ownership, and consolidation guidance.

## Canonical Checklist Ownership

- Primary checklist (all branding-sensitive merges):
  `docs/branding/governance/brand-congruency-master-checklist.md`
- Strategy-only QA extension (slogans, values, bilingual alignment):
  `docs/branding/strategy/brand-congruency-qa-checklist.md`
- Development implementation extension (tokens, component behavior):
  `docs/development/standards/branding-congruency-checklist.md`

Do not create additional top-level "branding checklist" files unless a new governance owner is approved.

## Consolidation Rules

1. If content repeats canonical values, move it to `brand-constants.md` and replace duplicates with links.
2. If content repeats global pass/fail gates, move it to the master checklist and keep only local extensions.
3. If content is page or feature specific, place it under Strategy or Standards, not Governance.
4. Keep one topic per file; avoid mixed files that combine policy, constants, and implementation snippets.

## Naming Rules

- Prefer explicit names: `*-standards.md`, `*-guide.md`, `*-checklist.md`, `*-policy.md`.
- Avoid ambiguous names like `notes.md`, `updates.md`, or `new-branding.md`.
- Use lowercase kebab-case for all markdown files.

## Required Link Maintenance

When adding or moving branding docs, update:

1. `docs/branding/index.md`
2. `docs/index.md` (if the file is a single source of truth)
3. Any category index that references the moved or consolidated file

## PR Definition of Done (Branding Docs)

- New content follows folder ownership model.
- No duplicate canonical values across files.
- Checklist references point to the master checklist first.
- Affected indexes are updated.

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
