# MHC Operations Manual

Purpose: canonical intake and assembly workspace for a future operations manual
that stitches safety, handbook, terminology governance, and field execution
standards into one enterprise reference manual.

Naming source: aligned to MH branding and terminology standards under
docs/branding/strategy/dual-terminology-standard.md.

## Folder map

- 00-intake: raw uploads and intake bundles (unprocessed)
- 01-source-docx: canonical source DOCX files for authored sections
- 02-section-drafts: working chapter drafts and conversion-ready source text
- 03-forms-appendices: form references, appendix artifacts, and supporting attachments
- 04-review-approvals: review packets, redlines, and approval snapshots
- 05-publish-ready: final, locked source set approved for generation/publishing
- ../MHC-MSDS: source Material Safety Data Sheet (MSDS/SDS) library used to
  extract hazard controls, handling requirements, and compliance references for
  operations-manual daily execution sections.
- ../MHC-Tool-Box-Talks: source daily Toolbox Talk library used to extract
  topic rotations, OSHA hazard-season cadence, and anti-staleness scheduling
  controls for day-to-day operations content.

## Working rules

- Keep source-first workflow: edit source docs here, then generate outputs from approved sources.
- Do not place final generated PDFs in this folder tree.
- Promote files forward by stage only after review (intake -> source -> drafts -> approvals -> publish-ready).
- Treat MSDS/SDS and Toolbox Talk folders as canonical upstream references for
  day-to-day operations procedures, not as generated-output destinations.
- Operations procedures must state that Safety Data Sheets (SDS/MSDS) are
  available in the Staff Portal - (Field Operations) and in physical field
  copies kept in trucks and Mobile Command Center's (office trailers).

## PDF output

Generate rough-draft PDF:

- Command: npm run docs:generate:operations-manual (from apps/website)
- Script: documents/scripts/build-operations-manual-pdf.mjs
- HTML output: documents/output/operations-manual/operations-manual-rough-draft.html
- PDF output: documents/generated-pdfs/operations-manual-rough-draft.pdf

## Implementation status

Initial implementation artifacts created:

- 02-section-drafts/01-command-doctrine-and-authority.md
- 02-section-drafts/02-operations-manual-blueprint.md
- 02-section-drafts/03-estimator-command-and-preconstruction-controls.md
- 02-section-drafts/04-procore-governance-sop.md
- 02-section-drafts/05-change-orders-and-financial-controls-sop.md
- 02-section-drafts/06-project-execution-and-closeout-sop.md
- 02-section-drafts/07-sage100-operations-sop.md
- 02-section-drafts/08-internal-server-operations-sop.md
- 02-section-drafts/09-outlook-and-communications-sop.md
- 02-section-drafts/10-hh2-timekeeping-sop.md
- 02-section-drafts/11-safety-and-compliance-governance.md
- 02-section-drafts/12-kpi-and-reporting-cadence.md
- 02-section-drafts/13-records-retention-and-document-control.md
- 02-section-drafts/14-organization-and-raci-narrative.md
- 03-forms-appendices/appendix-a-raci-matrix-initial.md
- 03-forms-appendices/appendix-b-controls-and-retention-baseline.md
- 03-forms-appendices/appendix-c-weekly-ops-meeting-template.md
- 03-forms-appendices/appendix-d-approval-authority-matrix.md
- 03-forms-appendices/appendix-e-kpi-dictionary.md
- 03-forms-appendices/appendix-f-retention-and-disposal-templates.md
- 04-review-approvals/review-packet-checklist.md
- 04-review-approvals/review-kickoff-memo-cheng-hr.md
- 04-review-approvals/v0.2-integration-log.md
- 04-review-approvals/rough-draft-congruence-crosswalk.md
- 04-review-approvals/rough-draft-readiness-checklist.md
- 04-review-approvals/packet-0001-procore-change-controls/00-packet-index.md
- 04-review-approvals/packet-0001-procore-change-controls/01-cover-memo.md
- 04-review-approvals/packet-0001-procore-change-controls/02-change-summary.md
- 04-review-approvals/packet-0001-procore-change-controls/03-open-risks-and-decisions.md
- 04-review-approvals/packet-0001-procore-change-controls/04-kpi-control-impact.md
- 04-review-approvals/packet-0001-procore-change-controls/05-evidence-sample-references.md
- 04-review-approvals/packet-0001-procore-change-controls/06-review-outcome-log.md
- 04-review-approvals/packet-0001-procore-change-controls/07-routing-status.md
- 04-review-approvals/packet-0001-procore-change-controls/08-cheng-review-sheet.md
- 04-review-approvals/packet-0001-procore-change-controls/09-hr-review-sheet.md
- 04-review-approvals/packet-0002-closeout-sage100-server/00-packet-index.md
- 04-review-approvals/packet-0002-closeout-sage100-server/01-cover-memo.md
- 04-review-approvals/packet-0002-closeout-sage100-server/02-change-summary.md
- 04-review-approvals/packet-0002-closeout-sage100-server/03-open-risks-and-decisions.md
- 04-review-approvals/packet-0002-closeout-sage100-server/04-kpi-control-impact.md
- 04-review-approvals/packet-0002-closeout-sage100-server/05-evidence-sample-references.md
- 04-review-approvals/packet-0002-closeout-sage100-server/06-review-outcome-log.md
- 04-review-approvals/packet-0002-closeout-sage100-server/07-routing-status.md
- 04-review-approvals/packet-0002-closeout-sage100-server/08-cheng-review-sheet.md
- 04-review-approvals/packet-0002-closeout-sage100-server/09-hr-review-sheet.md
- 05-publish-ready/promotion-checklist.md
- 05-publish-ready/rough-draft-bundle-manifest.md

Recommended next drafting order:

1. Complete CHENG and HR outcomes for Packet 0001 and Packet 0002
2. Resolve decisions D-0001 through D-0003 and D-0101 through D-0103
3. Execute v0.2 integration for chapters 04-08 using v0.2-integration-log.md
4. Run rough-draft congruence check against Employee Handbook and MISH using rough-draft-congruence-crosswalk.md
5. Mark rough-draft bundle ready for team review using rough-draft-readiness-checklist.md
