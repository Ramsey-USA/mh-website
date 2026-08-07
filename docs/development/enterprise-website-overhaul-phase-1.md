# Enterprise Website Overhaul: Phase 1 Control Plan

Status: Draft, Phase 2 in progress
Authority: MH Ecosystem  
Editorial control: Matt Ramsey, Chief Editor  
Final approval: Jeremy Thamert, Owner and CEO

## Baseline decision

Phase 1 restarts from remote `main` commit `35ef07dd8dd4bb5ea0f0087b1ab21b7cb42df5c3`. The prior Phase 1 branch remains a reference source only. Its MH Ecosystem authority assets were carried forward without replacing the repaired document, form, QR, safety, media, or CI work now present on `main`.

## Audit findings

| ID     | Condition                                                                                                                             | Operational risk                                                                       | Phase 1 response                                                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GOV-01 | Website content did not declare the MH Ecosystem as the highest content authority.                                                    | Public claims can drift from controlled doctrine.                                      | Added a machine-readable authority register, migration notice, and validation gate.                                                                                  |
| GOV-02 | Public and controlled information lacked one explicit boundary.                                                                       | Draft or internal procedures can be exposed as public policy.                          | Defined public, conditional, and internal publication classes.                                                                                                       |
| IA-01  | Seventy-one route and layout files compete for attention without a visible enterprise hierarchy.                                      | High-value buyers must infer capabilities from many campaign and resource routes.      | Establish five public lanes: Capabilities, Markets, Project Proof, Company, and Resources.                                                                           |
| UX-01  | The homepage accumulated campaign cards, proof counters, badges, event banners, video controls, chat, and multiple calls to action.   | The first viewport reads as a component stack instead of an enterprise contractor.     | Rebuilt the homepage around one delivery thesis, four delivery phases, four operating markets, project proof, and one project briefing action.                       |
| UX-02  | Military terminology appears as decorative copy in high-density areas.                                                                | The veteran-owned strategy can read as a theme instead of earned operating discipline. | Reserve military language for short navigation cues, leadership voice, and accountability concepts. Lead with conventional construction language.                    |
| CNT-01 | Public proof mixed controlled counts with unsupported promotional metrics.                                                            | Claims can become stale or create substantiation risk.                                 | Use approved status claims and named project records. Remove volatile homepage counters from the primary narrative.                                                  |
| SYS-01 | Legacy system names competed with the approved platform architecture.                                                                 | Buyers and staff receive conflicting product names.                                    | Use BidPilot, Field Command Center, Marketing Flight, and MH Ecosystem. Describe all as secure internal systems in public copy.                                      |
| VIS-01 | Existing brand colors and typography were present, but gradients, rounded cards, watermark layers, and mixed treatments diluted them. | The site lacks one recognizable enterprise visual system.                              | Introduced a construction-document visual language: square geometry, ruled grids, controlled tan/green contrast, large Mendl headings, and real project photography. |
| QA-01  | The fresh clone has no local package installation and the restricted network cannot restore the full dependency tree.                 | Full local lint, type, build, and visual regression gates cannot yet execute.          | Run dependency-free governance checks locally; require repository CI plus responsive browser validation before the draft PR is marked ready.                         |

## Public information architecture

1. Capabilities: preconstruction, general contracting, project controls, safety, quality, closeout.
2. Markets: commercial, public and municipal, agricultural and winery, light industrial.
3. Project Proof: case records, constraints, executed scope, delivery method, and outcomes.
4. Company: ownership, veteran status, leadership, team, careers, allies, and locations.
5. Resources: public safety material, approved forms, terminology, events, news, and policies.

Internal fleet, warehouse, IT, authority, financial control, personnel, and dashboard procedures remain outside public navigation.

## Phase sequence

### Phase 1: authority and public foundation

- Establish the MH Ecosystem content authority and publication boundary.
- Replace the homepage with the enterprise delivery narrative.
- Establish global visual primitives and a five-lane navigation model.
- Align approved system names and conventional public titles.
- Preserve all live route contracts and controlled document generation paths.

### Phase 2: revenue and proof routes

- Rebuild Services, Public Sector, Projects, project detail, About, Jeremy Thamert, Veterans, and Contact.
- Convert project pages into evidence-based case files with constraints, controls, delivery facts, and results.
- Add capability statements by market and procurement path.

Phase 2 controlled slice 1:

- Services, Projects, and Public Sector now use one enterprise route hero, proof strip, square geometry, ruled grid, and evidence-first action hierarchy.
- The shared treatment preserves the existing route, filtering, case-study, public-sector, analytics, and localization contracts.
- `enterprise:phase2:check` prevents these revenue-route entry points from drifting away from the shared controlled component.
- Remaining Phase 2 work: project-detail case-file parity, About, Jeremy Thamert, Veterans, Contact, and full below-the-fold visual consolidation.

Phase 2 controlled slice 2:

- Project detail routes now open as governed case files with location, completion year, evidence status, and controlled delivery proof before the gallery and technical record.
- About now uses the enterprise route system and removes the rounded promotional entry treatment while preserving its translated company narrative.
- Remaining Phase 2 work: Jeremy Thamert, Veterans, Contact, and full below-the-fold consolidation across inherited components.

### Phase 3: resource and community routes

- Rebuild Safety, Resources, Employee Handbook, terminology, events, careers, allies, news, testimonials, locations, and FAQ.
- Apply one controlled-document status pattern to every public download.
- Consolidate duplicate event and safety entry routes without breaking existing URLs.

### Phase 4: optimization and release

- Complete Spanish parity, structured data, accessibility, performance, analytics, redirects, and route-level conversion measurement.
- Run desktop and mobile visual regression, link integrity, security, type, lint, test, and production build gates.
- Promote only after CHENG review and COO/CEO approval under the MH Ecosystem governance path.

## Acceptance conditions

- No draft-controlled document is downloadable from a public route.
- No legacy dashboard or CRM name remains in approved public copy.
- Every material capability claim maps to an approved claim record or project case file.
- Every major route uses conventional construction terminology first and MH terminology second.
- Every page has one primary action and a route-specific Word From the General.
- Desktop, tablet, and mobile layouts pass keyboard, contrast, reduced-motion, and overflow checks.
- Repository CI passes before Phase 1 is called complete.
