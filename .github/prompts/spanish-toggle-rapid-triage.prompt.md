---
name: "Spanish Toggle Rapid Triage"
description: "Use when: running a fast Spanish localization and language-toggle triage on changed files for PR go/no-go decisions."
argument-hint: "Describe changed files and whether locale wiring, toggle behavior, or translation keys changed."
agent: "spanish-toggle-officer"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
---

Run a rapid Spanish toggle triage focused only on changed localization surfaces.

Triage workflow:

1. Identify changed localization files only (toggle UI, locale wiring, navigation labels, metadata labels, and message keys).
2. Verify locale wiring for en/es remains consistent where touched (cookie, request config, and client locale updates).
3. Verify changed UI surfaces render expected language when Spanish is active.
4. Verify touched trust/accreditation and veteran-owned content remains present and correctly localized.
5. Run translation coverage check when translation files changed: npm run check:translations.

Output exactly this format:

- Triage Result: PASS | PASS-WITH-RISK | FAIL
- Changed Surfaces Reviewed:
- Critical Risks:
- Medium Risks:
- Low Risks:
- Required Fixes Before Merge:
- Optional Follow-Ups:

Keep the report concise, evidence-based, and file-specific.
