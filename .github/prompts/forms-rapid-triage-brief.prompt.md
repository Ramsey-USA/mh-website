---
name: "Forms Rapid Triage Brief"
description: "Use when: running a fast forms compliance triage for PR review comments or quick go/no-go checks."
argument-hint: "Describe changed files and whether ownership wording, trust markers, or generator behavior changed."
agent: "forms-logistics-officer"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
---

Run a rapid MH Forms Triage Brief focused only on changed surfaces.

If changed scope is primarily manual section layout or WBS numbering, use `manual-structure-officer` for triage.

Triage workflow:

1. Identify changed forms-related files only (templates, styles, generation scripts, form routes, docs tied to those changes).
2. Check canonical veteran-owned factual framing only where touched.
3. Check trust/accreditation presence and visibility on touched trust surfaces.
4. Check for token/style drift and highlight hardcoded values introduced in the change.
5. Check for generator integrity regressions introduced in the change (missing templates, silent skips, optionalized trust assets).
6. Check accessibility and forms SEO naming only for touched labels/routes/headings.

Output exactly this format:

- Triage Result: PASS | PASS-WITH-RISK | FAIL
- Changed Surfaces Reviewed:
- Critical Risks:
- Medium Risks:
- Low Risks:
- Required Fixes Before Merge:
- Optional Follow-Ups:

Keep the report concise and evidence-based, with file-specific remediation items.
