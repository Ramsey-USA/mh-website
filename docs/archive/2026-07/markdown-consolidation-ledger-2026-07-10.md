# Markdown Consolidation Ledger (2026-07-10)

**Category:** Documentation - Archive Audit
**Status:** Completed
**Scope:** Repository-wide Markdown reduction, redirect pruning, index rewiring

## Objective

Reduce Markdown bloat by removing redundant redirect/status files while preserving:

- MH branding governance and standards paths
- Historical archive traceability
- Active operational documentation entry points

## Removed Files

### Root-level branding status stubs

- `BRANDING_TESTS_CONTINUATION_SUMMARY.md`
- `BRANDING_TESTS_FINAL_STATUS.md`
- `BRANDING_TESTS_OPTIMIZATION.md`
- `BRANDING_TESTS_OPTIMIZATION_SUMMARY.md`

### Root-level canonical redirect stubs

- `testing/mh-testing-guide.md`
- `scripts/mh-scripts-guide.md`
- `public/images/qr-codes/README.md`

### App-scoped canonical redirect stubs

- `apps/website/config/config-directory-guide.md`
- `apps/website/config/cloudflare/edge-optimization.md`
- `apps/website/config/monitoring/uptime-kuma-monitors.md`

### Docs redirect stubs

- `docs/home-page-optimization-progress.md`
- `docs/development/PERFORMANCE_OPTIMIZATION_STRATEGY.md`
- `docs/development/LARGE_COMPONENT_REFACTORING.md`
- `docs/development/codebase-analysis.md`

## Updated Files (Routing and Traceability)

- `BRANDING_OPTIMIZATION_MASTER_STATUS.md`
- `docs/development/index.md`
- `docs/performance/index.md`
- `docs/archive/2026-07/performance-optimization-strategy.md`
- `docs/archive/2026-07/large-component-refactoring.md`
- `docs/archive/2026-07/codebase-analysis.md`
- `docs/archive/2026-07/home-page-optimization-progress.md`
- `jest.config.js`
- `apps/website/jest.config.js`

## Validation Summary

- No diagnostics errors in edited retained docs/config files.
- No active Markdown links depend on removed redirect files.
- Branding governance remains anchored at:
  - `docs/branding/governance/brand-congruency-master-checklist.md`
  - `docs/branding/governance/website-guardrails-coverage.md`

## Net Result

- Markdown files reduced from initial scan baseline to current footprint.
- Redirect noise reduced in root, docs, and app config surfaces.
- Historical references retained via archive artifacts and index links.
