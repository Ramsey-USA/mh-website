# Private SSSP Factory Handoff Contract

**Control date:** 2026-08-07  
**System owner:** Chief Engineer  
**Operational authority:** COO  
**Final release authority:** CEO  
**Lifecycle:** Operational Draft

## Purpose

This contract separates the protected Field Command Center control plane from the private MH Document Factory. The dashboard may create a generation work order, but it does not generate, approve, or publicly release a controlled SSSP.

## Required Configuration

The dashboard Worker must have all four values before generation is available:

- `SSSP_FACTORY_WEBHOOK_URL`: HTTPS intake endpoint controlled by the private factory
- `SSSP_FACTORY_DISPATCH_SECRET`: outbound bearer credential used only to authenticate work orders
- `SSSP_CALLBACK_SECRET`: inbound bearer credential used only to authenticate completed results
- `SSSP_CALLBACK_BASE_URL`: approved HTTPS dashboard origin, normally `https://www.mhc-gc.com`

Secrets belong in Cloudflare secret storage and the factory's local credential store. They must never appear in Git, build logs, work-order payload fields, source documents, QR codes, or R2 metadata.

## Work-Order Contract

The dashboard sends schema version 1, type `sssp-generate`, and a work order containing the SSSP ID, job ID and metadata, private R2 source object keys, initiating user, and absolute callback URL. The `Idempotency-Key` header equals the SSSP ID. The factory must treat repeat delivery of the same key as the same work order.

The factory must authenticate the dispatch bearer token, reject unknown schema versions, retrieve source files through least-privilege private R2 credentials, preserve source hashes, and produce a review candidate. GitHub Actions may validate code and contracts, but project files cannot transit through GitHub.

## Result Contract

The factory posts `{"ssspId":"...","content":"..."}` to the supplied callback URL using `Authorization: Bearer <SSSP_CALLBACK_SECRET>`. The dashboard validates the secret, job-to-SSSP relationship, and non-empty content before writing the review candidate to private R2 and D1.

Generation does not grant approval. Superintendent review, Project Manager approval, Safety approval, COO concurrence, and CEO-authorized release remain separate recorded gates.

## Failure and Recovery

Missing or invalid configuration returns HTTP 503 before database mutation. A rejected, timed-out, or failed factory dispatch restores the SSSP to `draft` and returns HTTP 503. Operators may retry after correcting the transport; the stable SSSP ID prevents duplicate work orders.

Approved publication uses immutable, hash-addressed R2 keys. Stable QR redirects point to approved records and never directly to mutable draft storage.
