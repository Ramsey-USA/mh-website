# MH Ecosystem Update Log - 2026-08-05

**Category:** Manuals - Update Log  
**Status:** Active  
**Scope:** Numbered intake model (`01` through `10`)

## Summary

This log records the documentation synchronization work completed for the numbered MH ecosystem source model.

Primary objective for this cycle: establish canonical routing artifacts so each intake family has explicit markdown and manifest destinations before deeper chapter-level rewrites.

## Changes By Intake Family

### 01 Core Doctrine

- Inventory parity updated in `docs/manuals/mh-ecosystem-source-index.md` (count corrected to 10 with Company Bible included).
- Canonical routing page added: `docs/manuals/core-doctrine-canonical-map.md`.
- Hub and top-level index links added for doctrine discoverability.
- Doctrine-derived markdown guides added for risk, quality, bonding, and workforce alignment.
- `docs/business/core-values.md` now includes Company Bible-derived enterprise operating commitments that connect values language to accountability, evidence, training, and document-control expectations.
- `docs/business/services.md` now includes Company Bible and bonding-doctrine source parity plus controlled service-delivery commitments for trust-safe public service language.
- Bonding and insurer-facing trust language was tightened in `docs/business/services.md` and `docs/business/bonding-surety-management-guide.md` to keep licensing, insurance, and bonding references factual and contract-aware.

### 02 Strategy and Business Development

- Source lineage expanded in `docs/marketing/marketing-strategy-guide.md`.
- Source lineage expanded in `docs/sales/sales-estimating-guide.md`.
- Canonical routing page added: `docs/manuals/strategy-branding-canonical-map.md`.
- `docs/marketing/index.md` and `docs/sales/index.md` now include explicit numbered-source lineage for 02/03 strategy, campaign, and handoff governance.
- `docs/marketing/parameters/index.md`, `docs/marketing/parameters/pursuit-and-handoff-parameters.md`, and `docs/marketing/parameters/proof-and-approval-parameters.md` now include numbered-source lineage and project-delivery evidence continuity language.

### 03 Project Delivery

- Canonical routing page added: `docs/manuals/project-delivery-canonical-map.md`.
- Companion source references added to strategy/sales guides where cross-functional language depends on delivery handoff controls.
- `docs/sales/sales-estimating-guide.md` now includes project-delivery commitments for go/no-go discipline, independent review, lifecycle-gate continuity, baseline preservation, and handoff evidence.
- `docs/marketing/marketing-strategy-guide.md` now includes project-delivery alignment commitments for gate-aware messaging, baseline coordination, approved handoff continuity, and closeout evidence discipline.
- `docs/project/index.md` now includes explicit numbered-source lineage for 01/03 project-governance and execution controls.

### 04 Safety and Field Operations

- Safety intake lineage clarified and expanded in `docs/technical/safety-program-guide.md` to include full 04 companion sources.
- Canonical routing page added: `docs/manuals/safety-field-ops-canonical-map.md`.
- `docs/technical/safety-program-guide.md` now includes 04-family control commitments covering emergency readiness, equipment authorization, fleet dispatch controls, warehouse custody, system-of-record discipline, and escalation expectations.
- `docs/technical/safety-program-guide.md` now maps those 04-family controls to concrete MISH and operations-form evidence for drills, inspections, maintenance, dispatch, custody, and chemical/spill workflows.

### 05 IT and Infrastructure

- Numbered intake lineage section added to `docs/technical/index.md`.
- Numbered intake parity guidance added to `docs/development/index.md`.
- Canonical routing page added: `docs/manuals/it-infrastructure-canonical-map.md`.
- `docs/technical/index.md`, `docs/development/index.md`, and `docs/technical/services-integration-guide.md` now include 05-family operating commitments for role-based access, MFA, quarterly recertification, restore testing, incident containment, and coordinated onboarding/offboarding evidence.
- `docs/technical/admin-password-security.md` now reflects the same 05-family access-governance baseline instead of treating password rotation as a standalone control.
- `docs/technical/secrets-management.md` now reflects the same 05-family access, resilience, restore-testing, and coordinated onboarding/offboarding doctrine.
- `docs/technical/form-security-standards.md` now reflects the same 05-family governed access, audit-evidence, and incident-preservation baseline behind public form protection.

### 06 TBT Library

- Reserved-library status maintained and explicitly referenced in safety authoring and source inventory docs.

### 07 SDS Library

- Reserved-library status maintained and explicitly referenced in safety authoring and source inventory docs.

### 08 Forms EHB

- Inventory parity updated in `docs/manuals/mh-ecosystem-source-index.md` (count corrected to 13 including handbook source docx).

### 09 Forms Operations

- Canonical routing page added: `docs/manuals/operations-forms-canonical-map.md`.
- Family-level destination matrix updated to include explicit 09 routing.

### 10 Forms MISH

- Intake lineage retained and reinforced in `docs/technical/safety-program-guide.md` as canonical MISH forms source set.

## Shared Governance Artifacts Added

- `docs/manuals/ecosystem-destination-matrix.md`
- `docs/manuals/core-doctrine-canonical-map.md`
- `docs/manuals/strategy-branding-canonical-map.md`
- `docs/manuals/project-delivery-canonical-map.md`
- `docs/manuals/safety-field-ops-canonical-map.md`
- `docs/manuals/it-infrastructure-canonical-map.md`
- `docs/manuals/operations-forms-canonical-map.md`

## Doctrine-Derived Guides Added

- `docs/project/enterprise-risk-management-guide.md`
- `docs/project/quality-management-guide.md`
- `docs/business/bonding-surety-management-guide.md`
- `docs/business/workforce-development-guide.md`
- `docs/manuals/enterprise-raci-guide.md`
- `docs/manuals/document-control-and-revision-guide.md`

## Validation Results

Completed:

- `npm run lint:markdown` -> PASS (0 issues)
- `npm run docs:stack:congruency:check` -> PASS
- `npm run terminology:guardrails:check` -> PASS
- `npm run docs:guardrails:check` -> PASS

Resolved issue:

- Restored missing template: `documents/manuals/operations-hub-dashboard-access-guide.html`
- Re-ran guardrails and confirmed PASS.

## Next Recommended Slice

1. Continue chapter-level content parity updates for doctrine topics (risk, quality, bonding, workforce) using the new canonical maps.
2. Add dedicated forms-family narrative indexes if deeper discoverability is needed for 08/09/10 operations.
3. Continue expanding chapter-level content parity now that 01, 02, 03, 04, 05, and 09 canonical maps are in place.

## Follow-Up Addendum - 2026-08-06

### Intake Filing Normalization

- Confirmed `mh-company-bible-v1-0-draft.docx` is physically filed in `documents/input/01-core-doctrine` and indexed in `docs/manuals/mh-ecosystem-source-index.md`.
- Removed duplicate `mish-manual-v3-0-draft.docx` placement from 09 operations forms so MISH manual ownership remains anchored to 04 safety and field operations.
- Updated `documents/input/README.md` so intake root guidance reflects numbered-family filing and no longer references a non-existent `all-states.pdf` source file.

### Source Index and Matrix Synchronization

- Updated `docs/manuals/mh-ecosystem-source-index.md` metadata date to August 6, 2026.
- Updated 08 Forms EHB entries to current uploaded filenames (`v1-0-draft` forms with handbook source at `v3-0-draft`).
- Updated 10 Forms MISH entries to current uploaded filenames (`v1-0-draft` forms with MISH manual source retained at `v3-0-draft`).
- Updated `docs/manuals/ecosystem-destination-matrix.md` metadata date to August 6, 2026 to keep ecosystem routing docs date-aligned.
