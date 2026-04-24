---
name: "License Readiness Brief"
description: "Use when: running a full licensing compliance sweep before merge or release to validate WA/OR/ID values, links, docs/templates alignment, and regression coverage."
argument-hint: "Describe scope across code, docs, templates/generators, and tests where licensing references may appear."
agent: "license-compliance-officer"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
---

Run a full MH Licensing Readiness Brief for the provided scope.

Required workflow:

1. Identify all licensing surfaces in scope (code, docs, templates, generation inputs, tests).
2. Verify canonical WA/OR/ID values and ordering consistency across in-scope files.
3. Verify state verification links are correct and mapped to the correct state labels.
4. Verify legacy license values are removed from maintained source files.
5. Verify source-of-truth alignment with branding constants and canonical footer/license artifacts.
6. Verify regression coverage for WA/OR/ID link integrity where user-facing license links are rendered.

Output exactly this report format:

- Licensing Compliance Result: PASS or FAIL
- In-Scope Surfaces:
- Canonical Value Findings:
- Verification Link Findings:
- Source-of-Truth Alignment Findings:
- Test Coverage Findings:
- Required Remediations:
- Risk Level: low | medium | high

Do not finish without a PASS or FAIL decision and file-specific remediation actions for each FAIL area.