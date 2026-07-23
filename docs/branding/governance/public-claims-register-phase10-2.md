# Public Claims Register (Phase 10.2)

**Category:** Branding - Governance  
**Last Updated:** July 23, 2026

## Purpose

This record inventories repeated high-risk public claims and ties each migrated claim
to a controlled source in [apps/website/src/lib/content/claims.ts](../../../apps/website/src/lib/content/claims.ts).

## Inventoried Claim Families

| Claim Family                                           | Repeated Surfaces                                         | Evidence In Repo | Controlled In Register | Notes                                                                  |
| ------------------------------------------------------ | --------------------------------------------------------- | ---------------- | ---------------------- | ---------------------------------------------------------------------- |
| Veteran ownership status/timeline                      | Metadata, schema, safety/public-sector trust copy, badges | Yes              | Yes                    | Canonical claim: `veteran_owned_since_2025`                            |
| Tri-state licensing statement                          | Metadata, schema, public-sector trust copy                | Yes              | Yes                    | Canonical claim: `tri_state_licensed_wa_or_id`                         |
| BBB accreditation A+ statement                         | Accreditation rows, badge labels, metadata                | Yes              | Yes                    | Canonical claim: `bbb_accredited_a_plus`                               |
| Company founding year                                  | Metadata/schema and trust text                            | Yes              | Yes                    | Canonical claim: `founded_2010`                                        |
| Safety performance metrics (.64 EMR, award year spans) | Safety and public-sector pages, safety schema             | Partial          | Not migrated in 10.2   | Keep in domain safety records until source package is normalized       |
| Bonding/insurance capacity ratings                     | Public-sector copy and trust rows                         | Partial          | Not migrated in 10.2   | Maintain neutral wording until documentary source mapping is finalized |
| Project totals and outcomes                            | Portfolio and route-specific copy                         | Partial          | Not migrated in 10.2   | Keep as project-domain facts, not shared claims                        |

## Migrated High-Risk Claims

- `claim:veteran_owned_since_2025`
- `claim:tri_state_licensed_wa_or_id`
- `claim:bbb_accredited_a_plus`
- `claim:richland_chamber_advocate_level_member`
- `claim:founded_2010`

Richland chamber claim scope: accreditation rows and schema membership descriptions.

## Controlled Rendering Rule

Use `getApprovedClaim` or `getApprovedClaimOrFallback` from
[apps/website/src/lib/content/claims.ts](../../../apps/website/src/lib/content/claims.ts).

A claim must fail closed when any of these checks fail:

- approval state is not approved
- context is not allowed or explicitly prohibited
- review window is expired
- withdrawal reason exists

## Evidence Gaps and Risks

- Safety performance/award composite claims still rely on route-level copy and schema text; evidence references are not yet normalized into one claims record.
- Bonding/insurance strength language remains qualitative and should be converted to controlled claims only after a documented evidence source map is approved.
- Project outcomes and testimonial statements remain in domain records by design and must not be mass-moved into the shared claim register.
