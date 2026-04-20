---
name: "Spanish Toggle Readiness Brief"
description: "Use when: running a full English/Spanish localization readiness sweep before merge or release."
argument-hint: "Describe scope: locale wiring, toggle components, translated routes, metadata labels, and messages files."
agent: "spanish-toggle-officer"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
---

Run a full Spanish toggle readiness brief for the provided scope.

Required workflow:

1. Identify all localization surfaces in scope (locale utilities, request config, language toggle controls, translated labels, and messages files).
2. Verify locale wiring for en/es is correct end-to-end (cookie read/write, request resolution, and client refresh behavior).
3. Verify navigation, key CTA text, and trust/accreditation content present expected Spanish content when locale is es.
4. Verify factual veteran-owned framing remains consistent in both languages where ownership status is referenced.
5. Run npm run check:translations and report any missing or fallback keys as blocking findings.
6. Verify accessibility integrity for language controls and localized labels.

Output exactly this report format:

- Localization Result: PASS or FAIL
- In-Scope Surfaces:
- Locale Wiring Findings:
- Missing or Fallback Strings:
- Trust/Accreditation Language Risks:
- Accessibility Risks:
- Required Remediations:
- Risk Level: low | medium | high

Do not finish without a PASS or FAIL decision and file-specific remediation actions for each FAIL area.
