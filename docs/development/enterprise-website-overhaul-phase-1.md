# Enterprise Website Overhaul: Phased Control Plan

Status: Draft  
Authority: MH Ecosystem  
Editorial control: Matt Ramsey, Chief Editor  
Final approval: Jeremy Thamert, Owner and CEO

Phase 0 status: Complete, August 6, 2026
Active gate: Phase 1, authority, pipeline, and public foundation

## Controlling baseline

The controlling content baseline is the governance-corrected MH Ecosystem rough draft dated August 6, 2026. Its sealed artifact is `mh-ecosystem-draft-native-rebuild-master-governance-corrected-2026-08-06.zip`, SHA-256 `f6b9a39d944ba12cdeed7146be4b412f04dd5010752b694f1294b680d84d89b1`.

The artifact contains 193 readable DOCX files, 193 paired PDFs, 1,008 rendered PDF pages, and ten valid numbered packages. The MH Company Bible remains separately controlled at the master-archive level, and the Employee Handbook remains in Package 08.

Remote `main` commit `35ef07dd8dd4bb5ea0f0087b1ab21b7cb42df5c3` is the code integration starting point, not the document authority. The repository contains 98 governed DOCX working copies in Packages 01-05 and 08-10; Phase 0 confirmed that all 98 differ from the sealed governance-corrected sources. Packages 06 and 07 now contain 93 exact sealed TBT/SDS DOCX/PDF pairs under the controlled ingestion rule. The two Package 09 distribution copies remain sealed-release records only. Package counts and repository intake counts must never be treated as interchangeable.

## Audit findings

| ID     | Condition                                                                                                                             | Operational risk                                                                       | Phase 1 response                                                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GOV-01 | Website content did not declare the MH Ecosystem as the highest content authority.                                                    | Public claims can drift from controlled doctrine.                                      | Added a machine-readable authority register, migration notice, and validation gate.                                                                                  |
| GOV-02 | Public and controlled information lacked one explicit boundary.                                                                       | Draft or internal procedures can be exposed as public policy.                          | Defined public, conditional, and internal publication classes.                                                                                                       |
| GOV-03 | The repository intake contains 98 DOCX sources while the sealed baseline contains 193 DOCX/PDF pairs.                                      | A partial mirror can be mistaken for a complete controlled release.                    | Add a one-to-one reconciliation gate for package membership, source ingestion, generated output, metadata, and publication eligibility.                               |
| GOV-04 | The rough draft remains in Draft status pending COO concurrence and CEO final approval.                                                       | Draft material can be represented as field-effective or publicly approved.             | Keep generation and publication separate; publish no controlled draft until its specific approval and public-classification gates close.                              |
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

### Phase 0: baseline reconciliation and release control

Status: Complete. See `documents/content/mh-ecosystem/phase-0-reconciliation.json` and `docs/manuals/ecosystem-phase-0-reconciliation-2026-08-06.md`.

- Verify the sealed artifact name, SHA-256, package count, 193 DOCX/PDF pairs, 1,008-page count, Company Bible separation, and Employee Handbook placement.
- Reconcile every package member to the enterprise master document index, controlled master register, repository intake, generated output, QR manifest, and publication classification.
- Record each missing repository source as planned ingestion, retained external library content, or internal-only material; do not silently classify an omission as complete.
- Enforce Draft status, version 1.0 or 3.0 as assigned, Matt Ramsey as Author and Chief Editor, Todd Shoeff as Co-Editor, and Jeremy Thamert as Final Approver.
- Keep generated release candidates non-public until document-specific approval, classification, and production-environment gates close.

### Phase 1: authority, pipeline, and public foundation

- Establish the MH Ecosystem as the website content authority and enforce the public, conditional, and internal boundary in code and CI.
- Harden the PDF and QR generators so controlled metadata, source hashes, release records, and stable route contracts remain reproducible.
- Replace the homepage with the enterprise delivery narrative and establish the five-lane navigation model.
- Align approved system names, position-first titles, brand primitives, and construction-first terminology.
- Preserve all live route contracts while removing unsupported claims and obsolete platform language.

### Phase 2: controlled document and resource integration

- Ingest approved source families in numbered order and close the package-to-repository reconciliation register.
- TBT/SDS source ingestion is complete: 82 TBT pairs and 11 SDS pairs are mapped by sealed SHA-256; public routing remains blocked while Draft.
- Rebuild Safety, Resources, Employee Handbook, terminology, public forms, Toolbox Talks, and SDS access routes from canonical sources.
- Apply one controlled-document status, metadata, download, QR, and supersession pattern to every eligible public artifact.
- Keep finance, IT, fleet, warehouse, WMS, authority, personnel, credentials, and dashboard standards internal.
- Consolidate duplicate safety and resource entry routes without breaking existing URLs.

### Phase 3: revenue, procurement, and project proof

- Rebuild Services, Public Sector, Projects, project detail, About, Jeremy Thamert, Veterans, and Contact.
- Convert project pages into evidence-based case files with constraints, controls, delivery facts, and results.
- Add approved capability statements by market, delivery method, licensing area, and procurement path.
- Represent BidPilot, Marketing Flight, and Field Command Center as in-development secure internal systems until operational approval is recorded.

### Phase 4: community, workforce, and trust routes

- Rebuild Events, Event and Community Outreach, Cool Desert Nights, careers, allies, news, testimonials, locations, and FAQ.
- Keep the approved Tri-Cities event schedule at two events per month, with a third only when the controlled program authorizes it and limited major regional exceptions.
- Install one route-specific Word From the General on each major page through the governed quote library.
- Preserve construction-first messaging while using veteran-owned language as substantiated trust context.

### Phase 5: verification and production promotion

- Complete Spanish parity, structured data, accessibility, performance, analytics, redirects, privacy, security, and route-level conversion measurement.
- Run package reconciliation, document authority, PDF workflow, QR integrity, link integrity, visual regression, type, lint, test, and production build gates.
- Obtain CHENG review, COO concurrence, and CEO final approval before production promotion.
- Release approved documents only through the protected `production-documents` environment, then archive the release record on the in-house server.

## Acceptance conditions

- No draft-controlled document is downloadable from a public route.
- The sealed-package register, repository intake, generated PDF set, QR manifest, and public-download catalog reconcile without unexplained omissions or duplicates.
- The repository reports its 98-source intake subset separately from the 193-pair sealed Ecosystem baseline until remaining sources are intentionally ingested.
- No legacy dashboard or CRM name remains in approved public copy.
- Every material capability claim maps to an approved claim record or project case file.
- Every major route uses conventional construction terminology first and MH terminology second.
- Every page has one primary action and a route-specific Word From the General.
- Desktop, tablet, and mobile layouts pass keyboard, contrast, reduced-motion, and overflow checks.
- Phase 0 reconciliation gates pass before Phase 1 is called complete.
- Repository CI passes before any phase is promoted.
- Draft remains the lifecycle status until COO concurrence and CEO final approval are recorded; approval does not change the assigned 1.0 or 3.0 version number.
