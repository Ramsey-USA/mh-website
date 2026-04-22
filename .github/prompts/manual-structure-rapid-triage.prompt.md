---
name: "Manual Structure Rapid Triage"
description: "Use when: running a fast manual structure/WBS compliance triage on changed files for PR go/no-go decisions, including border-safe-area clearance checks for manual headers/footers/logos."
argument-hint: "Describe changed files and whether margins, spacing, typography, page breaks, numbering, or generator logic changed."
agent: "manual-structure-officer"
model: ["GPT-5 (copilot)", "Claude Sonnet 4.5 (copilot)"]
---

Run a rapid MH Manual Structure Triage focused only on changed manual surfaces.

Triage workflow:

1. Identify changed manual-structure files only (print CSS, manual templates, generator paths, numbering manifests).
2. Check page box drift (margins, page size, running headers/footers, break behavior) only where touched.
3. Check spacing/typography drift and flag hardcoded values introduced in touched files.
4. Check border-safe-area clearance so header/footer/logo/content regions do not overlap decorative border frames where present.
5. Check WBS numbering integrity where numbering logic/content changed.
6. Check generator consistency regressions introduced in touched render paths.

Output exactly this format:

- Triage Result: PASS | PASS-WITH-RISK | FAIL
- Changed Surfaces Reviewed:
- Critical Risks:
- Medium Risks:
- Low Risks:
- Required Fixes Before Merge:
- Optional Follow-Ups:

Keep the report concise, evidence-based, and file-specific.
