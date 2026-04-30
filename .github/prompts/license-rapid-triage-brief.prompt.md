---
name: "License Rapid Triage Brief"
description: "Use when: running a fast licensing compliance triage for PR review comments or quick go/no-go checks on WA/OR/ID references and verification links."
argument-hint: "Describe changed files and whether license numbers, verification URLs, footer badges, docs, templates, or tests changed."
agent: "license-compliance-officer"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
---

Run a rapid MH Licensing Triage focused only on changed licensing surfaces.

Triage workflow:

1. Identify changed licensing files only (footer/license UI, docs, templates, generation inputs, tests).
2. Check canonical WA/OR/ID values and ordering consistency where touched.
3. Check verification-link integrity and state-to-link mapping where touched.
4. Check for stale legacy values introduced or left in maintained source files.
5. Check license test coverage impact for changed surfaces.

Output exactly this format:

- Triage Result: PASS | PASS-WITH-RISK | FAIL
- Changed Surfaces Reviewed:
- Critical Risks:
- Medium Risks:
- Low Risks:
- Required Fixes Before Merge:
- Optional Follow-Ups:

Keep the report concise, evidence-based, and file-specific.
