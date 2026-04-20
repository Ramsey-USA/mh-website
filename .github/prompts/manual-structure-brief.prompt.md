---
name: "Manual Structure Brief"
description: "Use when: running a full printable manual structure compliance sweep for uniform layout and mandatory WBS numbering before merge or release."
argument-hint: "Describe manual templates, print CSS, generator files, and section-content manifests in scope."
agent: "manual-structure-officer"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
---

Run a full MH Manual Structure Brief for the provided scope.

Required workflow:

1. Identify all manual structure surfaces in scope (print CSS, templates, generator code, section content manifests).
2. Verify page box consistency (size, margins, running header/footer offsets, page-break behavior).
3. Verify spacing consistency (section block spacing, field spacing, table cell spacing, callout spacing).
4. Verify typography consistency (font family, semantic role sizing, heading hierarchy, weight rules).
5. Verify WBS numbering consistency (hierarchy format, sequence continuity, no missing/skipped sections where required).
6. Verify generator consistency (render path preserves layout and WBS rules without silent divergence).

Output exactly this report format:

- Manual Structure Result: PASS or FAIL
- In-Scope Surfaces:
- Layout Drift Findings:
- Typography Drift Findings:
- WBS Numbering Findings:
- Generator Consistency Findings:
- Required Remediations:
- Risk Level: low | medium | high

Do not finish without a PASS or FAIL decision and file-specific remediation actions for each FAIL area.
