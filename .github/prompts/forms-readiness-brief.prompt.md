---
name: "Forms Readiness Brief"
description: "Use when: running a full forms branding and generator compliance sweep before merge or release."
argument-hint: "Describe scope: templates, generator files, trust surfaces, and target routes."
agent: "forms-logistics-officer"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
---

Run a full MH Forms Readiness Brief for the provided scope.

If scope includes full manual layout uniformity or WBS numbering validation, use `manual-structure-officer` instead of this prompt.

Required workflow:

1. Identify all form surfaces in scope, including templates, styles, generation scripts, and output routes.
2. Apply MH branding guardrails and documents-and-forms standards.
3. Verify canonical veteran-owned factual framing is used where ownership status appears.
4. Verify trust/accreditation signals are preserved and not silently downgraded.
5. Verify token discipline and flag hardcoded form color/style drift.
6. Verify generation integrity (no silent no-op paths, missing template blind spots, or fallback risks).
7. Verify accessibility and forms SEO naming alignment.

Output exactly this report format:

- Forms Compliance Result: PASS or FAIL
- In-Scope Surfaces:
- Ownership Framing Risks:
- Trust/Accreditation Risks:
- Token/Styling Risks:
- Generator/Output Risks:
- Accessibility/SEO Risks:
- Required Remediations:
- Risk Level: low | medium | high

Do not finish without a PASS or FAIL decision and concrete remediation actions for each FAIL area.
