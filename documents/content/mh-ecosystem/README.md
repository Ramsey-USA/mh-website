# MH Ecosystem Website Authority

**Status:** Draft source authority

**Baseline:** August 6, 2026 governance-corrected native rebuild

**Website integration:** Phase 0 complete; Phase 1 active

**Author and Chief Editor:** Matt Ramsey

**Co-Editor:** Todd Shoeff

**Final Approver:** Jeremy Thamert

## Purpose

The MH Ecosystem is the controlling informational source for website language, document generation, operating-system terminology, and public descriptions of MH Construction's enterprise capabilities. The August 5, 2026 native rebuild contains 193 controlled DOCX/PDF pairs across ten numbered ZIP packages, including the separately controlled MH Company Bible at the master-archive level.

The controlled release artifact is `mh-ecosystem-draft-native-rebuild-master-governance-corrected-2026-08-06.zip`, SHA-256 `f6b9a39d944ba12cdeed7146be4b412f04dd5010752b694f1294b680d84d89b1`. Independent reconciliation confirms 193 readable DOCX files, 193 paired PDFs, 1,008 native PDF pages, ten valid ZIP packages, and the Employee Handbook in Package 08. The earlier native-render failure report is retained only as superseded corrective-action evidence.

The sealed source package remains outside the public web delivery surface because it includes internal operating controls. Repository source paths and generated binder artifacts are build-time controls and must not be copied into public static output unless a document-specific classification and approval gate authorizes release.

The repository contains 191 controlled DOCX intake files. Packages 01-05 and 08-10 contain 98 governed working copies that are not byte-identical to the governance-corrected baseline and therefore cannot supersede it. Packages 06 and 07 contain 82 exact sealed TBT pairs and 11 exact sealed SDS pairs. The remaining two controlled records are authorized distribution copies retained only in the sealed release.

The one-to-one disposition of all 193 records is recorded in `phase-0-reconciliation.json`. CI rejects unexplained omissions, unmatched repository files, TBT/SDS hash drift, public Draft classifications, or any change to the sealed counts and control boundary.

The PDF pipeline verifies all 193 sealed PDFs, builds ten package binders with covers, TOCs, tabs, and spines, and builds one 191-record master notebook with the Company Bible first. Sixty-four forms remain cover-free and limited to one or two printable pages. The QR pipeline registers every controlled record but emits no Draft document QR code until document-level publication approval.

## Precedence

When website content conflicts, apply this order:

1. Approved legal, regulatory, licensing, and certification facts
2. MH Ecosystem controlled baseline
3. Brand constants and terminology library
4. Route-specific content and localization messages
5. Archived documentation

Archived files preserve history and never control active website copy.

## Public Information Boundary

Public release candidates include the Employee Handbook public edition, MISH public edition, blank public forms, Toolbox Talks, SDS references, terminology library, and approved marketing guides. Draft files inform website content but do not become public downloads until the required review and approval gates close.

Internal-only material includes financial controls, IT controls, fleet and warehouse records, WMS controls, authority matrices, internal forms, system configuration, credentials, and dashboard operating standards.

## Enterprise Position

Public messaging leads with five capabilities:

1. Safety and compliance command
2. Disciplined preconstruction and project controls
3. Audit-ready handoff and closeout
4. Multi-state execution across Washington, Oregon, and Idaho
5. Veteran-led accountability and stakeholder trust

## Systems Language

- **BidPilot:** Sales, Estimating, and Preconstruction system of action
- **Marketing Flight:** Marketing planning, campaigns, and relationship-building system
- **Field Command Center:** Field, fleet, equipment, warehouse, and WMS system under development
- **Secure Internal Systems:** Public description for internal platforms until Field Command Center is operational
- **Procore:** Project execution and construction-record system
- **Sage 100:** Financial system of record
- **In-house server:** Approved digital archive

Field Command Center is being developed through the CHENG, CHNAV, and IT Specialist. The website must not represent an in-development platform as operational.

## Position-First Rule

Public language uses conventional titles first and may follow with the approved abbreviation. Responsibilities belong to positions, not incumbents. Matt Ramsey and Todd Shoeff may be named on editorial records; Jeremy Thamert may be named as owner, author of approved public quotes, and final approver.

## Document Generator Rule

The website PDF generator is the production mechanism for applying the approved MH brand system across public Ecosystem documents. Canonical content remains separate from generated PDF output. Generated files must carry source version, lifecycle status, author, editor, approver, public/internal classification, and a reproducible release record.

Generation and publication are separate control gates. Pull requests and document changes may generate a retained release candidate, but only a manually dispatched job using the protected `production-documents` environment may publish validated PDFs. Git commit counts and commit dates never establish a controlled-document revision or effective date.
