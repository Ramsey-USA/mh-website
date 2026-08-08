# MH Enterprise Document Control Standard

**Version:** 1.0  
**Control Status:** DRAFT | NOT CONTROLLED  
**Effective date:** Pending approval  
**Author and Chief Editor:** Matt Ramsey  
**Co-Editor:** Todd Shoeff  
**Final Approver:** Jeremy Thamert

## 1. Purpose

This standard establishes the command, editorial, revision, approval, system-boundary, archival, QR-control, publication, and lineage requirements for the MH Ecosystem. It does not issue documents, approve permanent resolver routes, or make Draft artifacts field-effective.

## 2. Authoritative governed source taxonomy

The permanent enterprise taxonomy remains: `01-core-doctrine`, `02-strategy-and-business-dev`, `03-project-delivery`, `04-safety-and-field-ops`, `05-it-and-infrastructure`, `06-tbt-library`, `07-sds-library`, `08-forms-ehb`, `09-forms-operations`, and `10-forms-mish`.

The source taxonomy controls organization, governance, lineage, ownership, classification, human navigation, and master-baseline membership. Source documents shall not be relocated or renamed to match a build process.

## 3. Distinct system layers

1. Governance establishes authority, ownership, approval, lifecycle, and change control.
2. Source taxonomy identifies the governed source and baseline package.
3. Controlled source contains the authoritative editable content for internally authored documents.
4. Controlled build architecture performs rendering, QR insertion, parallel processing, QA, and manifest production.
5. Publication architecture stores and exposes authorized generated artifacts.
6. QR resolver architecture connects a permanent document identity to its current control record.
7. The Enterprise Document Register remains the authoritative current-document control record.

The current eight build batches are replaceable operational metadata. Batch identifiers shall not become part of a Document ID, Enterprise UID, document family, baseline package, governed filename, source folder, or permanent resolver.

## 4. Document identity and canonical membership

One canonical governed document may belong to multiple baseline packages while retaining one Document ID and one permanent resolver. Multiple package memberships do not create separate identities unless management intentionally establishes and approves distinct governed documents.

## 5. QR governance purpose

QR codes are document verification and retrieval controls. A QR does not independently establish approval, issuance, revision, authority, effective date, currentness, or supersession status. The Enterprise Document Register and controlled publication system remain authoritative.

## 6. QR metadata

Every registered document supports structured `qrControl` and `buildMetadata` objects. Null values are mandatory when no evidence supports a production value. QR target status and QR verification status remain separate from document lifecycle and issuance.

Allowed target states are `NOT_ESTABLISHED`, `ESTABLISHED`, `INVALID`, and `WITHDRAWN`. Allowed verification states are `NOT_VERIFIED`, `VERIFIED`, and `FAILED`.

## 7. Permanent resolver policy

Decision `A-QR-001` recommends stable, document-specific, revision-independent, and build-independent MH-controlled resolver routes. The route shall not contain batch identity, temporary storage paths, expiring signatures, private tokens, local paths, or preview links. No production route is approved or deployed by this Draft governance update.

## 8. Resolver response

A future approved resolver shall be capable of presenting Document ID, title, current revision, lifecycle status, control status, effective date when applicable, current or superseded status, current authorized PDF when access permits, and last verification date. Where the scanned physical revision is identifiable, the resolver shall compare it with the current register revision.

## 9. Revision and printed-copy control

The permanent QR represents document identity and does not change solely because revision, filename, PDF hash, storage location, batch assignment, or rendering changes. Printed documents shall display their own revision near the QR with the restrained label `VERIFY CURRENT DOCUMENT` or `DOCUMENT CONTROL`.

Scanning a QR does not make the physical copy current. Historical printed QR payloads are not changed merely because a later revision is issued.

## 10. Blank templates and completed records

A blank controlled template may use a QR to reach the current template record. Once completed, the artifact becomes a historical record. It preserves the originating Document ID, template revision, completion date, project or job identifier where applicable, and record identifier where applicable. A later template revision does not automatically supersede the completed historical record.

## 11. External documents and SDS

MH QR codes shall not be inserted into third-party SDS or externally controlled publisher content unless specifically permitted. MH shall prefer a control wrapper or index record that links to an MH external-document control record and then to the current verified external source. The wrapper shall not imply MH authorship, revision authority, or approval authority over third-party content.

## 12. Responsibility separation

- Document Control owns identity, control metadata, approval status, current revision, and publication authority.
- The QR Generator owns rendering, target encoding, decode verification, and print/scannability QA.
- Web and Infrastructure own resolver availability, routing, redirect behavior, reliability, and regression evidence.
- The Document Owner owns substantive accuracy.
- The QR Generator shall never become governance authority.

Positions, not employee names, control field authority and operational responsibility.

## 13. Fail-closed production

Required QR control is `ENFORCED_FAIL_CLOSED`. A required artifact is not publication eligible when the target is missing or invalid, identity mismatches, decoding fails, the resolver is unavailable during required validation, a route collision exists, or required metadata is unavailable. Required controls shall not silently downgrade.

## 14. Exceptions

Approved exceptions may address external control, physical-size limits, security restrictions, contractual restrictions, lack of operational value, or a verified technical limitation. Every required omission needs a controlled exception record, scope, rationale, owner position, approving authority, expiration or review date, and compensating control.

## 15. Hash lineage

Historical baseline hashes are immutable. The lineage model distinguishes `baselineHash`, `sourceHash`, `generatedPdfHash`, `buildArtifactHash`, and `buildManifestHash`. A QR-enabled PDF is a generated publication artifact and receives new evidence hashes without overwriting source or baseline hashes.

## 16. Change control

Changing a resolver assigned to an existing Document ID requires Document Control review, infrastructure review, regression validation, and publication verification. No two distinct canonical Document IDs may unintentionally share one resolver. Route collisions shall fail QA and shall not merge document identities.

## 17. Lifecycle gate

This update remains `Rough Draft | Governance Development`. It creates no issued document, superseded document, permanent production route, implemented management decision, or field-effective publication. CEO approval remains the final enterprise gate.

## 18. Required QA

QA shall prove taxonomy preservation, identity preservation, batch independence, lifecycle/QR-state separation, immutable historical hashes, separate generated hashes, external-document authorship protection, completed-record distinction, resolver uniqueness, explicit readiness for every QR-required document, and the ability to change batch architecture without changing identity.


## 15. Enterprise Register preservation and schema lineage

Schema 2.1-development is an additive, backward-compatible integration over schema 2.0-development. It retains relationships, applicability, publication locations, external requirements, retention, approval evidence, ownership and control metadata, package memberships, risk and assessment structures, and adds buildMetadata, qrControl, and expanded hash lineage. Document ID remains nullable during inventory staging; it becomes mandatory only when lifecycle status is APPROVED or ISSUED. Enterprise UID remains optional pending management authorization.

## 16. Separate control dimensions

Lifecycle, supersession, operational validity, archive state, and QR control are independent. No QR value approves, issues, withdraws, supersedes, validates, or archives a document. Named authors, editors, and approvers belong in metadata, revision history, and approval evidence, not on the primary cover.


## 17. Build topology independence

The Enterprise Document Register records the current or last verified build reference: build ID, build unit, build date, generator version, generated-artifact hash, Build Manifest reference, and QA status. The applicable Build Manifest defines valid processing units and retains full execution history. Build-unit reassignment is production metadata, not a document revision, and cannot change Document ID, Enterprise UID, document family, baseline package, governed source path, filename, revision, or permanent QR identity.

## 18. Accessible output governance

Approved generated PDFs shall support tagged structure, logical reading order, document language, accessible tables and links, and a non-visual method for QR destination access when the approved production toolchain can prove those controls through Generator QA. A toolchain limitation does not establish compliance; it requires the existing controlled-exception process with scope, rationale, compensating control, approval, and review date.
