# Private SSSP Factory Handoff Contract

**Control date:** 2026-08-07  
**System owner:** Chief Engineer  
**Operational authority:** COO  
**Final release authority:** CEO  
**Lifecycle:** Operational Draft

## Purpose

This contract separates the protected Field Command Center control plane from the private MH Document Factory. The dashboard may create a generation work order, but it does not generate, approve, or publicly release a controlled SSSP.

## Required Configuration

The dashboard Worker requires these controls:

- `SSSP_FACTORY_WORK_ORDERS`: native producer binding to `mhc-sssp-factory-work-orders`
- `SSSP_CALLBACK_SECRET`: inbound bearer credential used only to authenticate completed results
- `SSSP_CALLBACK_BASE_URL`: approved HTTPS dashboard origin, normally `https://www.mhc-gc.com`
- `SSSP_FACTORY_ACTIVATED`: explicit operational gate; it remains `false` until the complete project-profile intake and approval workflow passes acceptance testing

The offline factory uses a least-privilege Cloudflare API token with Queues Read and Write permission to lease and acknowledge messages through HTTP Pull. Secrets belong in Cloudflare secret storage and the factory's local credential store. They must never appear in Git, build logs, work-order payload fields, source documents, QR codes, or R2 metadata.

## Work-Order Contract

The dashboard sends schema version 1, type `sssp-generate`, and a work order containing the SSSP ID, job ID and metadata, private R2 source object keys, initiating user, and absolute callback URL. The message idempotency key equals the SSSP ID. The factory must treat repeat delivery of the same key as the same work order.

The factory must authenticate to Cloudflare's HTTP Pull API, reject unknown schema versions, retrieve source files through least-privilege private R2 credentials, preserve source hashes, and produce a review candidate. It acknowledges a queue lease only after the result callback succeeds; transient failures are explicitly retried. GitHub Actions may validate code and contracts, but project files cannot transit through GitHub.

## Result Contract

The factory posts `{"ssspId":"...","content":"..."}` to the supplied callback URL using `Authorization: Bearer <SSSP_CALLBACK_SECRET>`. The dashboard validates the secret, job-to-SSSP relationship, and non-empty content before writing the review candidate to private R2 and D1.

Generation does not grant approval. Superintendent review, Project Manager approval, Safety approval, COO concurrence, and CEO-authorized release remain separate recorded gates.

## Activation Gate

Queue infrastructure and credentials may be provisioned while `SSSP_FACTORY_ACTIVATED=false`. Production generation can change to `true` only after project-profile intake captures hazards, competent-person assignments, emergency and site controls, required attachments, and the approval chain, with a successful acceptance test recorded.

## Failure and Recovery

Missing, invalid, or inactive configuration returns HTTP 503 before database mutation. A failed queue write restores the SSSP to `draft` and returns HTTP 503. Operators may retry after correcting the transport; the stable SSSP ID prevents duplicate work orders.

Approved publication uses immutable, hash-addressed R2 keys. Stable QR redirects point to approved records and never directly to mutable draft storage.
