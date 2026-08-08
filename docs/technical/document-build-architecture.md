# Document Build Architecture and Register Boundary

**Status:** Draft validation architecture  
**Owner:** Document Control  
**Technical support:** QR Generator, Web and Infrastructure  
**Final approval:** CEO

## Command Rule

The governed source taxonomy, enterprise document identity, build topology, publication storage, and QR resolver are separate control layers. A processing unit may be renamed, divided, consolidated, or reassigned without changing a Document ID, Enterprise UID, document family, baseline package, governed source path, filename, revision, or permanent resolver identity.

## Authoritative Boundaries

| Control subject                | Authoritative record                     |
| ------------------------------ | ---------------------------------------- |
| Current document control state | Enterprise Document Register             |
| Governed editable content      | Canonical governed source                |
| Current build reference        | Enterprise Document Register             |
| Full execution history         | Build Manifests and audit history        |
| Approved generated artifact    | Release manifest and immutable R2 object |
| Stable destination             | Approved resolver registry               |
| QR rendering and proof         | Private Document Factory QA evidence     |

The Enterprise Document Register records only the current or last verified build ID, build unit, build date, generator version, generated-artifact hash, Build Manifest reference, and QA status. Build Manifests define the processing units used for that execution and retain full build history.

## Schema Integration

Schema `2.3-development` is the current Phase 1 candidate schema. It retains the topology-neutral build fields and deprecated compatibility aliases established under schema 2.2, assigns immutable Enterprise UIDs, separates risk classification from approval routing, and adds controlled metadata for ownership, custody, evidence, publication, data classification, and QR access. Schema 2.2 remains historical lineage.

One canonical governed source may hold multiple approved package memberships without creating a second authoritative identity. Package membership is distribution metadata and does not relocate the governed source.

## Draft Intake State

The August 8, 2026 Phase 1 candidate contains 354 Draft records and 354 unique Enterprise UIDs. Seventy-three records have established Document IDs, 141 require management review, and 140 remain not established. All evidence states remain pending, 353 records are not released, and one record is on hold.

The package remains `DRAFT | NOT CONTROLLED`. It changed no permanent IDs, deployed no resolver routes, activated no documents, issued no documents, and superseded no documents.

## QR Gate

Decision `A-QR-001` recommends stable, document-specific, revision-independent, and build-independent MH-controlled resolver routes. That decision remains pending management approval and unimplemented.

Until approval closes:

- the website creates no document QR assets;
- the website deploys no document resolver route;
- Draft downloads remain blocked;
- missing identity, target, verification, resolver, or approval evidence fails closed;
- external SDS content receives an MH wrapper or index rather than an altered publisher document.

## Historical Intake Defects

The schema 2.2 source package remains stored byte-for-byte for traceability. Its Document Control Standard repeats section numbers 15 through 18 and one schema-lineage paragraph names schema `2.1-development` although the sealed schema and QA report identify `2.2-development`.

The Phase 1 candidate resolves the governing schema conflict through schema 2.3 and five controlled Core Doctrine revisions. Historical evidence remains unchanged, and the website does not claim approval or field effectiveness.

## CI Enforcement

The repository guard verifies both layers: the immutable schema 2.2 historical intake and the current schema 2.3 candidate. It enforces the 354-record inventory, unique Enterprise UIDs, exact lifecycle and operational states, 361 binder entries, seven external SDS records, 90 decisions, private binary custody, and the absence of retired website QR generation routes. Any drift blocks the website pipeline.
