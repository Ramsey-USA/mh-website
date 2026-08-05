# Project Delivery Canonical Map

**Category:** Manuals - Project Delivery Mapping  
**Last Updated:** August 5, 2026  
**Status:** Active

## Quick Summary

This page maps the 03 Project Delivery intake files to canonical markdown and manifest destinations.

Use this map before updating delivery-focused documentation so pursuit language, execution controls, and downstream manifest references stay aligned.

## Canonical Intake Root

- `documents/input/03-project-delivery`

## Source-to-Destination Map

| 03 Project Delivery Source                                 | Primary Canonical Destination                | Secondary Destination or Companion                            | Notes                                                                                         |
| ---------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `mh-estimating-bid-package-guide-v1-0-draft.docx`          | `docs/sales/sales-estimating-guide.md`       | `docs/marketing/parameters/pursuit-and-handoff-parameters.md` | Scope and estimate framing should remain congruent between pursuit and handoff language.      |
| `mh-financial-controls-guide-v1-0-draft.docx`              | `docs/sales/sales-estimating-guide.md`       | `documents/content/operations-manual.json`                    | Financial authority references must stay consistent with operations-manual control language.  |
| `mh-pep-ccp-and-warranty-addendum-v1-0-draft.docx`         | `docs/sales/sales-estimating-guide.md`       | `documents/content/operations-manual.json`                    | Closeout and warranty language should align with execution and archive workflows.             |
| `mh-project-execution-playbook-v1-0-draft.docx`            | `docs/marketing/marketing-strategy-guide.md` | `docs/sales/sales-estimating-guide.md`                        | Delivery lifecycle language should stay synchronized across marketing and pursuit narratives. |
| `mh-sssp-preconstruction-handoff-addendum-v1-0-draft.docx` | `docs/technical/safety-program-guide.md`     | `docs/sales/sales-estimating-guide.md`                        | Safety handoff language must preserve MISH and SSSP governance boundaries.                    |
| `mh-subcontractor-management-manual-v1-0-draft.docx`       | `docs/sales/sales-estimating-guide.md`       | `docs/marketing/parameters/pursuit-and-handoff-parameters.md` | Trade partner governance should remain factual, relationship-first, and execution-ready.      |
| `pep-f-01-5-sales-to-ops-handoff-v1-0-draft.docx`          | `docs/sales/sales-estimating-guide.md`       | `docs/marketing/marketing-strategy-guide.md`                  | Handoff continuity language is shared across sales, marketing, and operations alignment.      |

## Implementation Rules

1. Treat 03 Project Delivery as a controlled bridge between strategy (02) and execution/safety families (04, 09, 10).
2. Update cross-functional guides in one change when handoff, approval, or lifecycle language shifts.
3. Verify related manifest references when delivery changes affect operations structure (`documents/content/operations-manual.json`).
4. Keep naming construction-first and trust-safe under Brand Constants and dual-terminology governance.

## Related References

- [MH Ecosystem Documentation Hub](./index.md)
- [MH Ecosystem Source Index](./mh-ecosystem-source-index.md)
- [Ecosystem Destination Matrix](./ecosystem-destination-matrix.md)
- [Sales and Estimating Guide](../sales/sales-estimating-guide.md)
- [Marketing Strategy Guide](../marketing/marketing-strategy-guide.md)
