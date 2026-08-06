# MH Ecosystem Destination Matrix

**Category:** Manuals - Ecosystem Mapping  
**Last Updated:** August 6, 2026
**Status:** Governed working-copy routing

## Quick Summary

This matrix maps each numbered repository working-copy folder (`01` through `10`) to its markdown and manifest destinations. The sealed 193-record baseline remains the controlling document authority.

Use this before updating docs from source uploads so guide changes, manifest references, and pipeline language stay synchronized.

## Repository Working-Copy Families

- `documents/input/01-core-doctrine`
- `documents/input/02-strategy-and-business-dev`
- `documents/input/03-project-delivery`
- `documents/input/04-safety-and-field-ops`
- `documents/input/05-it-and-infrastructure`
- `documents/input/06-tbt-library`
- `documents/input/07-sds-library`
- `documents/input/08-forms-ehb`
- `documents/input/09-forms-operations`
- `documents/input/10-forms-mish`

## Folder-to-Destination Matrix

| Input Family                   | Source Count | Primary Markdown Destinations                                                                                                                      | Manifest and Pipeline Touchpoints                                                                                                                | Readiness |
| ------------------------------ | -----------: | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `01-core-doctrine`             |           10 | `docs/manuals/core-doctrine-canonical-map.md`, `docs/manuals/mh-ecosystem-source-index.md`, `docs/business/core-values.md`                         | `documents/content/operations-manual.json`, `documents/content/manuals-index.json`                                                               | High      |
| `02-strategy-and-business-dev` |            6 | `docs/marketing/marketing-strategy-guide.md`, `docs/sales/sales-estimating-guide.md`, `docs/branding/strategy/index.md`                            | `documents/content/marketing-strategy-guide.json`, `documents/content/sales-estimating-guide.json`, `documents/content/terminology-library.json` | High      |
| `03-project-delivery`          |            7 | `docs/sales/sales-estimating-guide.md`, `docs/marketing/parameters/pursuit-and-handoff-parameters.md`, `docs/manuals/mh-ecosystem-source-index.md` | `documents/content/operations-manual.json`                                                                                                       | Medium    |
| `04-safety-and-field-ops`      |            7 | `docs/technical/safety-program-guide.md`, `docs/technical/safety-terminology-glossary.md`                                                          | `documents/content/safety-manual-public.json`, `documents/content/manuals-index.json`                                                            | High      |
| `05-it-and-infrastructure`     |            4 | `docs/technical/index.md`, `docs/development/index.md`, `docs/technical/services-integration-guide.md`                                             | `documents/content/operations-manual.json`                                                                                                       | Medium    |
| `06-tbt-library`               |           82 | `docs/technical/safety-program-guide.md`, `docs/manuals/mh-ecosystem-source-index.md`                                                              | Controlled pairs ingested; PDF release candidates enabled; QR/public routing blocked while Draft                                                 | Medium    |
| `07-sds-library`               |           11 | `docs/technical/safety-program-guide.md`, `docs/manuals/mh-ecosystem-source-index.md`                                                              | Controlled pairs ingested; PDF release candidates enabled; SDS currency and QR/public routing blocked while Draft                                | Medium    |
| `08-forms-ehb`                 |           13 | `docs/manuals/mh-ecosystem-source-index.md`, `docs/technical/safety-program-guide.md`                                                              | `documents/content/employee-handbook.json`, `documents/content/manuals-index.json`                                                               | High      |
| `09-forms-operations`          |           26 | `docs/manuals/mh-ecosystem-source-index.md`, `docs/sales/sales-estimating-guide.md`                                                                | `documents/content/operations-manual.json`, `documents/content/manuals-index.json`                                                               | Medium    |
| `10-forms-mish`                |           25 | `docs/technical/safety-program-guide.md`, `docs/manuals/mh-ecosystem-source-index.md`                                                              | `documents/content/safety-manual-public.json`, `documents/content/manuals-index.json`                                                            | High      |

## Governance Rules

1. Update intake inventory first in `docs/manuals/mh-ecosystem-source-index.md` when source lists or counts change.
2. Update family-specific guide markdown second using this matrix as the routing baseline.
3. Update manifest and pipeline references third when doc changes affect generation boundaries.
4. Keep language construction-first and trust-safe per Brand Constants and dual-terminology governance.

## Related References

- [MH Ecosystem Documentation Hub](./index.md)
- [MH Ecosystem Source Index](./mh-ecosystem-source-index.md)
- [Core Doctrine Canonical Map](./core-doctrine-canonical-map.md)
- [Strategy and Branding Canonical Map](./strategy-branding-canonical-map.md)
- [Project Delivery Canonical Map](./project-delivery-canonical-map.md)
- [Safety and Field Operations Canonical Map](./safety-field-ops-canonical-map.md)
- [IT and Infrastructure Canonical Map](./it-infrastructure-canonical-map.md)
- [Operations Forms Canonical Map](./operations-forms-canonical-map.md)
- [Documentation Index](../index.md)
