# Agent Compliance Hardening Summary (2026-07-11)

## Summary

Completed a full agent-compliance hardening pass for custom agents under .github/agents.

- Ran individual runtime smoke tests for registered runtime agents.
- Ran strict static compliance checks across all 25 custom agent specs.
- Corrected stale paths, stale workflow guidance, and handbook-scope gaps.
- Added a full audit artifact and this PR-ready summary.

## What Changed

1. Normalized stale path references to current monorepo structure:
   - Replaced legacy docs mirror path usage with apps/website/public/docs where applicable.
   - Removed legacy team-data file references and aligned to per-member team JSON model.
   - Removed legacy documents/output references and aligned to documents/generated-pdfs.

2. Expanded manual pipeline scope to include Employee Handbook explicitly:
   - Updated manual standards and PDF editor agent scope language.
   - Updated argument hints to distinguish safety-manual artifact set vs employee-handbook artifact set.

3. Fixed stale print-pipeline guidance:
   - Updated margin guidance to match current template and generator behavior.
   - Updated function-name references to current implementation names.
   - Removed stale TOC copy instruction and documented publish-time alias handling.

4. Corrected internal reference drift in MDS guidance:
   - Fixed section-number cross-references in guardrails and workflow steps.
   - Corrected canonical header-logo values and line-anchor references.

## Verification

- Runtime smoke tests:
  - manual-development-standards-officer: PASS
  - safety-pdf-editor: PASS
  - Explore: PASS

- Static compliance checks across 25 specs:
  - Required frontmatter keys: PASS
  - Known stale patterns scan: PASS
  - Script reference validation: PASS
  - Final strict scan result: 0 issues

## Files Updated

- .github/agents/documentation-drift-officer.agent.md
- .github/agents/form-development-officer.agent.md
- .github/agents/forms-logistics-officer.agent.md
- .github/agents/manual-development-standards-officer.agent.md
- .github/agents/manual-structure-officer.agent.md
- .github/agents/master-at-arms.agent.md
- .github/agents/performance-budget-officer.agent.md
- .github/agents/qr-code-officer.agent.md
- .github/agents/safety-pdf-editor.agent.md
- .github/agents/team-roster-officer.agent.md
- .github/agents/video-upload-officer.agent.md

## Report Artifacts

- .github/agents/AGENT_COMPLIANCE_REPORT_2026-07-11.md
- .github/agents/AGENT_COMPLIANCE_PR_SUMMARY_2026-07-11.md
