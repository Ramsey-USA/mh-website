# Markdown Sweep Log - 2026-07-02

**Category:** Branding - Governance  
**Status:** Completed  
**Owner:** Branding Documentation Governance

## Purpose

Record the repository-wide markdown sweep that consolidated branding checklist routing and reduced guidance ambiguity for future developers.

## Scope Covered

- Branding governance docs in `docs/branding/governance/`
- Branding and development indexes under `docs/`
- Strategy and standards checklist references under `docs/branding/strategy/` and `docs/development/standards/`
- Agent markdown specs under `.github/agents/*.agent.md`

## Canonical Checklist Routing (Enforced)

1. Primary merge gate: `docs/branding/governance/brand-congruency-master-checklist.md`
2. Strategy companion checks: `docs/branding/strategy/brand-congruency-qa-checklist.md`
3. Development companion checks: `docs/development/standards/branding-congruency-checklist.md`

## What Was Updated

- Added governance folder and canonical master checklist.
- Updated docs indexes to route contributors to governance first.
- Reframed strategy and development checklist files as companion checklists.
- Normalized checklist wording in agent markdown files so references point to the canonical master checklist path.
- Removed remaining ambiguous checklist naming in standards summary content.

## Verification Notes

- Markdown diagnostics were run on changed governance and docs files after edits.
- Post-sweep search confirmed canonical master checklist wording/path is consistently referenced for branding-sensitive gates.

## Future Maintenance Rule

When adding new branding-related markdown guidance:

1. Update canonical content first.
2. Link companion docs instead of duplicating gate criteria.
3. Update `docs/branding/governance/index.md` and `docs/index.md` when source-of-truth ownership changes.

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
