# Agent Compliance Report - 2026-07-11

## Scope

This report verifies agent compliance using:

1. Runtime smoke tests for each currently registered runtime agent.
2. Static compliance checks for all custom agent specs in `.github/agents/*.agent.md`.

## Runtime Agent Invocation Results

The current runtime registry includes 3 invocable agents. Each was run individually.

1. `manual-development-standards-officer` -> PASS (after targeted corrections)
2. `safety-pdf-editor` -> PASS (after targeted corrections)
3. `Explore` -> PASS

## Static Compliance Results (.github/agents)

Total agent spec files checked: 25

Result: PASS

Strict checks performed:

1. Required frontmatter keys present:
   - `name`
   - `description`
   - `tools`
   - `model`
   - `argument-hint`
   - `user-invocable`
   - `disable-model-invocation`
2. Known stale path patterns absent:
   - `apps/website/docs/`
   - `src/data/team-data.json`
   - `documents/output/`
3. npm/pnpm script references in agent docs resolve to existing scripts in root or `apps/website` package manifests.

## Adjustments Applied During Hardening

1. Updated docs mirror path guidance to `apps/website/public/docs/`.
2. Corrected MDS function name references from `renderSections()` to `generateSections()`.
3. Corrected MDS source-reference line anchor to `buildSectionHeaderHtml()` near `~L1470`.
4. Corrected MDS canonical logo style values to `height:40pt;max-width:114pt`.
5. Corrected MDS form-cover function reference from `renderFormCovers()` to `generateFormCovers()`.
6. Corrected stale MDS section cross-references (§ numbering) in guardrails/workflow notes.
7. Removed stale TOC manual copy instruction; clarified publish-time alias handling for `safety-manual-contents.pdf`.
8. Refined safety/handbook artifact hint text so handbook outputs are listed accurately.
9. Expanded manual-related scope text to explicitly include employee handbook coverage where needed.
10. Normalized monorepo path references (`apps/website/...`) in media/team/QR/performance agent guidance.

## Files Updated

1. `.github/agents/documentation-drift-officer.agent.md`
2. `.github/agents/form-development-officer.agent.md`
3. `.github/agents/forms-logistics-officer.agent.md`
4. `.github/agents/manual-development-standards-officer.agent.md`
5. `.github/agents/manual-structure-officer.agent.md`
6. `.github/agents/master-at-arms.agent.md`
7. `.github/agents/performance-budget-officer.agent.md`
8. `.github/agents/qr-code-officer.agent.md`
9. `.github/agents/safety-pdf-editor.agent.md`
10. `.github/agents/team-roster-officer.agent.md`
11. `.github/agents/video-upload-officer.agent.md`

## Outstanding Notes

1. `manual-development-standards-officer` references `/memories/repo/pdf-print-gotchas.md` as a capture path for future gotchas. This is acceptable even if the file does not yet exist.
2. No blocking compliance findings remain.
