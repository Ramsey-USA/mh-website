# Agent Prompt Runbook (Forms + Manual)

**Category:** Development - Workflow Standards  
**Last Updated:** April 20, 2026  
**Status:** ✅ Active

## Purpose

This runbook defines **which prompt to run, when to run it, and what blocks merge/release** for forms, printable docs, and manual structure changes.

Use this to keep layout consistency, trust markers, ownership wording, and WBS numbering compliant.

---

## Prompt Routing Matrix

| Change Scope                                                             | Prompt                           | Agent                      | Decision Type   |
| ------------------------------------------------------------------------ | -------------------------------- | -------------------------- | --------------- |
| Forms/templates/generator edits (no manual-wide structure changes)       | `/Forms Rapid Triage Brief`      | `forms-logistics-officer`  | PR go/no-go     |
| Manual print layout, numbering logic, section hierarchy, print CSS drift | `/Manual Structure Rapid Triage` | `manual-structure-officer` | PR go/no-go     |
| Full forms readiness before merge/release                                | `/Forms Readiness Brief`         | `forms-logistics-officer`  | Compliance gate |
| Full manual structure/WBS readiness before merge/release                 | `/Manual Structure Brief`        | `manual-structure-officer` | Compliance gate |

If scope is unclear, start with `master-at-arms`; it will route to the right specialist.

---

## PR Workflow (Fast Path)

1. Identify changed files.
2. If changed files touch forms/template/generator paths, run `/Forms Rapid Triage Brief`.
3. If changed files touch manual print structure or section numbering paths, run `/Manual Structure Rapid Triage`.
4. Treat `FAIL` as merge-blocking.
5. Treat `PASS-WITH-RISK` as allowed only with explicit reviewer acknowledgment and tracked follow-up.

---

## Merge/Release Workflow (Full Gate)

Run these before merging release-bound work:

1. `/Forms Readiness Brief`
2. `/Manual Structure Brief` (required when manual or print CSS/numbering is in scope)

Release is ready only when required checks return `PASS`, or approved exceptions are documented with owner and expiration.

---

## Blocking Criteria

Do not merge/release if any required check reports `FAIL` for:

- Ownership framing (missing canonical dated veteran-owned language)
- Trust/accreditation preservation (removed/downgraded trust signals)
- Token discipline (off-standard hardcoded visual drift)
- Generator integrity (missing/optionalized render paths or silent skips)
- Layout/typography consistency across manual surfaces
- WBS numbering integrity (missing/skipped/out-of-order hierarchy)

---

## Typical Scopes and Required Prompt

- `documents/scripts/generate.mjs`, `documents/forms/**`, `documents/templates/**`: Forms prompt first
- `documents/styles/print-base.css`, `documents/styles/components.css` (manual structure impact): Manual prompt required
- `documents/content/safety-manual.json` (section hierarchy/numbering): Manual prompt required
- `documents/manuals/**`, `documents/cover` with structural changes: Manual prompt required

---

## Output Records (What Reviewers Should Keep)

For each required prompt run, keep:

1. Prompt used
2. Agent used
3. Result (`PASS`, `PASS-WITH-RISK`, or `FAIL`)
4. File-specific remediations (if any)
5. Exception details if risk accepted

This can live in PR comments or release notes.
