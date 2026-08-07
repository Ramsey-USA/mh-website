# Cloudflare Dashboard and SSSP Production Control

**Control date:** 2026-08-07  
**Owner:** Chief Engineer  
**Final approval:** CEO  
**Lifecycle:** Operational Draft

## Production Topology

The public website remains on the `mhc-v2-website` Worker. Protected dashboard APIs run on the separate `mhc-v2-dashboard` Worker through specific `www.mhc-gc.com/api/*` routes, which take precedence over the public website route.

The SSSP control plane uses three private R2 buckets:

- `mh-construction-safety-intake` for existing safety intake records
- `mh-construction-sssp-plans` for project source files
- `mh-construction-sssp-output` for generated review candidates and approved outputs

The private `Ramsey-USA/mh-document-factory` repository remains the governed offline document authority. GitHub workflows validate source and deployment controls, but they do not receive project documents, approve releases, or publish Rough Draft records.

## Deployment Controls

Both Workers disable public `workers.dev` and preview URLs. GitHub Actions builds the website and dashboard independently, deploys each Worker only after quality and security gates pass on `main`, and rejects a dashboard deployment when the protected SSSP route returns `404` or a server error.

Cloudflare bindings are declared in the applicable Wrangler file. Dashboard deployment includes D1, shared KV namespaces, `SAFETY_INTAKE`, `SSSP_PLANS`, `SSSP_OUTPUT`, static assets, production routes, and observability. Route-free deployments preserve the manually controlled production route inventory.

## Activation Record

Production activation completed on 2026-08-07.

- Website integration merged through PR 168 at commit `2095bff32d1d2765972cec0ec9776fab2580129d`.
- Deployment and governance repairs merged through PR 169 at commit `d765ef55b737777cc1dca6e59807c27658d133ac`.
- GitHub Actions run `31206159108` passed quality, security, website build, dashboard build, website deployment, dashboard deployment, and protected-route verification.
- Cloudflare Worker `mhc-v2-dashboard` has Assets, D1 `DB`, three KV bindings, and the three controlled R2 bindings.
- Nine specific dashboard API routes are attached to `www.mhc-gc.com`; the broad public website route remains owned by `mhc-v2-website`.
- The live SSSP probe returns `401 Authentication required`, proving protected Worker ownership without exposing data.
- D1 tables `sssp` and `sssp_source_files`, plus their controlled indexes, are active.

## Fail-Safe Boundary

An SSSP remains a review candidate until the required project profile, hazard controls, competent-person assignments, attachments, Superintendent review, Project Manager approval, Safety approval, and CEO-authorized release gates are complete. Generated content cannot change controlled MISH doctrine, create an approval, or overwrite an immutable R2 object.

Project files and approved PDFs remain private unless a separately approved stable redirect explicitly authorizes public access. QR codes resolve through controlled redirects and never point directly to mutable storage keys.

The dashboard-to-factory handoff now fails closed under the [Private SSSP Factory Handoff Contract](./private-sssp-factory-contract.md). Missing transport configuration stops the request before database mutation, and a rejected dispatch restores the record to `draft`; activation still requires Cloudflare and local-factory secret provisioning. The “Words from the General” publication gate also remains closed until Owner approval is recorded; neither hold affects the protected dashboard route, storage, or schema activation completed above.
