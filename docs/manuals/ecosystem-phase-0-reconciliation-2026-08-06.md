# MH Ecosystem Phase 0 Reconciliation

**Date:** August 6, 2026
**Lifecycle:** Rough Draft
**Status:** Complete
**Authority:** Matt Ramsey, Author and Chief Editor
**Final approval:** Jeremy Thamert, Owner and CEO

## Objective

Establish a one-to-one controlled disposition for every record in the governance-corrected MH Ecosystem before the enterprise website overhaul is committed.

## Sealed Baseline Verified

- Artifact: `mh-ecosystem-draft-native-rebuild-master-governance-corrected-2026-08-06.zip`
- SHA-256: `f6b9a39d944ba12cdeed7146be4b412f04dd5010752b694f1294b680d84d89b1`
- Numbered packages: 10
- Controlled DOCX records: 193
- Paired PDFs: 193
- Rendered PDF pages: 1,008
- Company Bible: separately controlled at the master-archive level
- Employee Handbook: Package 08

## Reconciliation Result

| Disposition                                           | Records | Control decision                                                                                |
| ----------------------------------------------------- | ------: | ----------------------------------------------------------------------------------------------- |
| Repository working copy diverged from sealed baseline |      98 | May inform website development; cannot supersede controlled source or supply document metadata. |
| Repository exact sealed TBT/SDS source                |      93 | Controlled pairs ingested; retain Draft publication block until Phase 2 release controls close. |
| Sealed authorized distribution copy                   |       2 | Retain in Package 09; governing records remain in Packages 01 and 04.                           |
| Unexplained omission                                  |       0 | Phase 0 gate passes.                                                                            |
| Unmatched repository DOCX                             |       0 | Phase 0 gate passes.                                                                            |

All 193 records remain `not-public-draft` and are not field-effective. Generation, validation, approval, and production publication remain separate gates.

## Physical Binder and Notebook Treatment

The controlled PDF pipeline now carries all 193 verified PDFs. It builds ten package binders and one master notebook containing 191 unique records; the two authorized Package 09 distribution copies remain in that package binder but are excluded from the master to prevent duplicate governing manuals.

- Master notebook: branded cover, enterprise table of contents, Company Bible first, eleven section dividers, and printable spine.
- Package binders: branded cover, package table of contents, divider tab, controlled source PDFs, and printable spine.
- Manuals, guides, programs, and governing publications: retain their branded individual cover and internal TOC treatment where applicable.
- Forms: source control covers remain archived, while print-ready output removes them and is limited to one or two application pages. All 64 controlled forms currently pass the two-page limit.
- Toolbox Talks: print-ready field-brief treatment removes the source control cover while preserving the controlled source PDF.
- SDS records: print-ready chemical-reference treatment removes the source control cover while preserving the controlled source PDF.
- QR records: all 193 targets are registered in the pipeline, but Draft targets remain queued and generate no public QR asset until document-level publication approval.

The master notebook contains 708 print-selected source pages plus generated cover, TOC, and divider pages. Current rendered output is 726 pages. The full 1,008-page sealed PDF set remains intact and hash-verifiable in repository source storage.

## Root Cause and Repair

The repository inventory previously described its 98 DOCX files as canonical sources. Hash reconciliation proved that every preexisting repository DOCX differs from the sealed governance-corrected source, including version-label corrections applied to net-new Employee Handbook and MISH forms. The repository inventory is now classified as a governed working-copy intake, and the sealed release remains the controlling document authority. The authorized library ingestion added 82 TBT and 11 SDS DOCX/PDF pairs as byte-identical sealed-source copies.

The machine-readable register at `documents/content/mh-ecosystem/phase-0-reconciliation.json` records package, record identity, version, lifecycle, DOCX/PDF hashes, page count, repository path, repository hash, disposition, and publication classification for every controlled record.

## Phase Promotion

Phase 0 is complete. Phase 1 may proceed under these controls:

1. No repository working copy may overwrite or redefine sealed controlled metadata.
2. No Rough Draft document may become a public download.
3. TBT and SDS pairs are ingested, but remain blocked from public release until controlled Phase 2 routing, currency, and approval gates close.
4. CI must pass the authority, Phase 0 reconciliation, and controlled PDF workflow gates.
5. COO concurrence and CEO final approval remain required before production promotion.
