# Controlled Document Factory and Publication Architecture

**Status:** Rough Draft architecture control
**Owner:** CHENG
**Technical support:** CHNAV and IT Specialist
**Operational concurrence:** COO
**Final approval:** CEO

## Command Decision

The public website does not generate, merge, restyle, or automatically rebuild controlled PDFs. Native DOCX sources, brand assets, working renders, review evidence, and release work orders remain inside the private MH document factory on an authorized workstation and the in-house archive server.

The website performs only three document functions: resolve stable document IDs, enforce access classification, and serve approved immutable objects from Cloudflare R2. A website deployment cannot create a document revision or make a Rough Draft effective.

## Controlled Flow

1. A position owner opens one incremental work order for one or more controlled IDs.
2. The offline factory copies only the selected native sources into a private job workspace.
3. The factory applies the approved MH logo, green and heritage-tan palette, typography, control block, footer, and document-type treatment.
4. Forms remain cover-free and one to two pages. Guides and manuals receive the approved cover, contents, tab, and spine treatment.
5. LibreOffice exports selected DOCX files to PDF. The operator performs visual, metadata, page-count, hash, and pairing checks.
6. CHENG and the functional owner complete review. COO concurs. CEO grants final publication approval.
7. The factory writes a signed-off release manifest containing the controlled ID, revision, classification, SHA-256, immutable R2 key, stable redirect ID, and approval evidence.
8. The publisher uploads only approved changed outputs to an immutable R2 key such as `controlled-documents/<controlled-id>/<version>/<sha256>.pdf`.
9. A separate redirect registry changes the stable URL `/go/docs/<stable-id>` to the approved object. Existing QR codes never change.
10. The release manifest, native source, approved PDF, and evidence package return to the in-house archive server.

## Cross-Repository Control Plane

The website publishes `factory-sync-contract.json` and a deterministic `factory-intake-manifest.json`. The manifest identifies every governed repository source by controlled record ID, source path, version, lifecycle state, and SHA-256 without exposing document bytes through an automation payload.

On a governed `main` update, the website validates the tracked manifest and sends the private factory a `mh-ecosystem-source-updated` repository event when `MH_DOCUMENT_FACTORY_TOKEN` is configured. The factory then checks out the exact website commit, verifies every requested source hash, and stages only the controlled IDs listed in an operator-approved work order. A factory release sends `mh-document-release-updated` back to the website so redirect and release metadata drift is flagged for review.

Neither signal authorizes publication. Missing credentials leave the build in validation-only mode, source hash mismatches fail closed, and no workflow overwrites native sources or public redirects automatically.

## Fail-Safe Rules

- No public or CI command may invoke the retired website PDF generator.
- No push, pull request, schedule, or website build may perform a full document rebuild.
- A release work order must list changed controlled IDs. Wildcard and all-document scopes fail closed.
- Rough Draft, Review, rejected, superseded, and missing-approval records cannot publish.
- R2 keys are immutable and content-addressed. Publishing different bytes to an existing approved key is prohibited.
- Redirect changes are auditable configuration changes and require the same approval evidence as the published document.
- QR assets encode only stable `/go/docs/<stable-id>` URLs. QR PNG regeneration is not part of document publication.
- Public access and employee access remain separate. A redirect may target a restricted `/docs/**` route, but never bypass its authentication control.

## Offline Factory Location

The private factory is maintained in the restricted `Ramsey-USA/mh-document-factory` repository and installed on an authorized workstation. Native sources, work orders, intermediate renders, credentials, and approval evidence do not enter the public website repository. Released source packages and evidence are backed up to the in-house server under IT control.

## Cloudflare Publication Contract

Cloudflare R2 objects use explicit content type, content disposition, and cache-control metadata. Approved PDFs use immutable content-addressed keys with long-lived caching; stable redirect responses use short caching so an approved target change propagates without replacing the QR code. Production routing remains on the existing Workers/custom-domain path, consistent with Cloudflare's current R2 and Workers routing model.

## Transition Controls

The retired generator source may remain in Git history for audit purposes, but no package command, workflow, prebuild, deployment, or QR task may call it. The former `generate-pdfs.yml`, automatic `docs:all`, release chains that combine generation with upload, and QR PNG publication path are removed from active operation.

