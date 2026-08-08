# Document Build Architecture and Register Boundary

**Status:** Draft validation architecture  
**Owner:** Document Control  
**Technical support:** QR Generator, Web and Infrastructure  
**Final approval:** CEO

## Command Rule

The governed source taxonomy, enterprise document identity, build topology, publication storage, and QR resolver are separate control layers. A processing unit may be renamed, divided, consolidated, or reassigned without changing a Document ID, Enterprise UID, document family, baseline package, governed source path, filename, revision, or permanent resolver identity.

## Authoritative Boundaries

| Control subject | Authoritative record |
| ------------------------------ | --------------------------------------- |
| Current document control state | Enterprise Document Register |
| Governed editable content | Canonical governed source |
| Current build reference | Enterprise Document Register |
| Full execution history | Build Manifests and audit history |
| Approved generated artifact | Release manifest and immutable R2 object |
| Stable destination | Approved resolver registry |
| QR rendering and proof | Private Document Factory QA evidence |

The Enterprise Document Register records only the current or last verified build ID, build unit, build date, generator version, generated-artifact hash, Build Manifest reference, and QA status. Build Manifests define the processing units used for that execution and retain full build history.

## Schema Integration

Schema `2.2-development` adds topology-neutral `lastBuildUnit`, `buildId`, and `buildDate` fields while retaining `lastBuildBatch`, `lastBuildId`, and `lastBuildDate` as deprecated compatibility aliases. The schema does not enumerate a fixed batch count.

One canonical governed source may hold multiple approved package memberships without creating a second authoritative identity. Package membership is distribution metadata and does not relocate the governed source.

## Draft Intake State

The August 8, 2026 package contains 193 Rough Draft records. Sixty-four records have established Document IDs, 129 do not, no QR target is ready, no resolver is ready, and 159 records have a hard QR blocker.

The package remains `DRAFT | NOT CONTROLLED`. It regenerated no documents, changed no permanent IDs, changed no resolver routes, issued no documents, and superseded no documents.

## QR Gate

Decision `A-QR-001` recommends stable, document-specific, revision-independent, and build-independent MH-controlled resolver routes. That decision remains pending management approval and unimplemented.

Until approval closes:

- the website creates no document QR assets;
- the website deploys no document resolver route;
- Draft downloads remain blocked;
- missing identity, target, verification, resolver, or approval evidence fails closed;
- external SDS content receives an MH wrapper or index rather than an altered publisher document.

## Preserved Intake Defects

The sealed source package is stored byte-for-byte for traceability. Its Document Control Standard repeats section numbers 15 through 18 and one schema-lineage paragraph still names schema `2.1-development` although the sealed schema and QA report identify `2.2-development`.

Those issues are recorded in the integration manifest and require controlled editorial correction before the package can advance from Draft. The website does not silently modify the sealed intake or claim approval.

## CI Enforcement

The repository guard verifies package checksums, the 193-record inventory, topology-neutral schema controls, deprecated aliases, Draft lifecycle state, QR readiness counts, the pending management decision, and the absence of retired website QR generation routes. Any drift blocks the website pipeline.
