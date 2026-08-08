# Website and Document Factory Bridge

**Status:** Draft implementation control  
**Contract:** 2.0.0  
**Governance schema:** 2.3-development

## Command Boundary

The website is the governance-metadata and public-destination control plane. The private Document Factory owns native source custody, MH branding, PDF and QR generation, visual QA, approval evidence, and approved R2 uploads. A GitHub event is a notification, not a work order, approval, publication instruction, or redirect authorization.

## Website to Factory

1. A governed change reaches website `main`.
2. `document-factory-bridge.yml` runs the schema 2.3 governance guard and deterministic 354-record manifest check.
3. The website sends `mh-ecosystem-governance-updated` to `Ramsey-USA/mh-document-factory`.
4. The payload contains only the exact website commit, contract and schema versions, manifest path and hash, authority-register hash, candidate archive hash, record count, and the fail-closed publication flag.
5. The factory retrieves the manifest from the exact commit, verifies SHA-256 and lifecycle state, then writes a 90-day receipt marked `VALIDATED_NOT_AUTHORIZED_TO_BUILD`.

## Factory to Website

1. An approved incremental work order generates no more than 25 controlled records.
2. The factory validates Enterprise UIDs, source lineage, branding, PDF output, QR destination, visual QA, approval evidence, and immutable R2 keys.
3. After approved objects upload, the factory sends `mh-document-release-updated` to `Ramsey-USA/mh-website`.
4. The return payload contains only controlled identifiers, versions, classifications, hashes, R2 keys, the release-manifest hash, and the exact factory commit.
5. The website validates the receipt. It does not alter stable redirects until a separate approved resolver change closes.

## Required Repository Secrets

- Website repository: `MH_DOCUMENT_FACTORY_TOKEN`, restricted to `Ramsey-USA/mh-document-factory` with only the repository permission required to create repository dispatch events.
- Factory repository and authorized offline publisher: `MH_WEBSITE_TOKEN`, restricted to `Ramsey-USA/mh-website` with only the repository permission required to create repository dispatch events.

Never store either token in source, workflow YAML, release manifests, work orders, dispatch payloads, logs, R2 metadata, or generated PDFs. Rotate a token immediately if it appears in terminal output, an artifact, or repository history.

## Activation Sequence

1. Commit the factory bridge to the factory default branch first because GitHub processes `repository_dispatch` only when the receiving workflow exists on its default branch.
2. Configure and test `MH_WEBSITE_TOKEN` in the factory repository or authorized publisher.
3. Commit the website bridge and schema 2.3 governance package to website `main`.
4. Configure `MH_DOCUMENT_FACTORY_TOKEN` in the website repository.
5. Run the factory contract check, then manually dispatch the website bridge once.
6. Confirm the factory validation receipt references the exact website commit and 354 records.
7. Use a non-production test release to verify the return receipt while keeping redirects unchanged.

Missing secrets, mismatched hashes, unknown repositories, wrong schema versions, non-Draft intake, invalid release identity, mutable R2 keys, document-byte payloads, or more than 25 records fail closed.
