---
title: Controlled Forms Delivery Guardrail
description: Prevents website code and CI from becoming a PDF-authoring pipeline
applyTo: "apps/website/src/app/go/docs/**,apps/website/src/lib/data/controlled-document-redirects.json,apps/website/package.json,.github/workflows/**"
---

## Controlled Forms Delivery Guardrail

The private `Ramsey-USA/mh-document-factory` repository owns native forms, MH brand templates, PDF export, visual verification, approval manifests, hashes, and R2 publication.

Website changes must follow these rules:

1. Do not add PDF generation, merging, restyling, QR image generation, or automatic full rebuild commands.
2. Use permanent `/go/docs/<stable-id>` destinations for controlled-document QR codes.
3. Advance a redirect only after the approved immutable R2 object exists and its SHA-256 matches the release manifest.
4. Preserve access classifications and the existing `/docs/**` authorization boundary.
5. Run `node apps/website/scripts/validation/check-controlled-document-architecture.mjs` before review.

Any request to change form layout, branding, fields, pagination, covers, or print behavior must be transferred to the private factory.
