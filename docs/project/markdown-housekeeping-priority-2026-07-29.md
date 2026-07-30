# Markdown Housekeeping Priority Report (2026-07-29)

**Category:** Project - Housekeeping
**Last Updated:** July 29, 2026

## Snapshot

- Total markdown files scanned: 302
- Orphan files (not cataloged and not utilized): 0
- Under-cataloged but utilized files (not in index or README catalogs): 103

## Source-Of-Truth Guardrail Updates

- Deprecated app mirror trees confirmed absent: `apps/website/docs`, `apps/website/messages`, `apps/website/documents`.
- Business docs team-data source reference was corrected to monorepo surface-specific paths:
  - `apps/website/src/lib/data/team-profiles.ts`
  - `apps/dashboard/src/lib/data/team-profiles.ts`
- Business specializations location-data reference was corrected to `apps/website/src/lib/data/locations.ts`.

## Priority Model

### Priority 1 - Temporary and Generated Working Outputs

These files should stay out of canonical indexes and be treated as ephemeral output:

- [apps/website/tmp/spanish-coverage-report.md](../../apps/website/tmp/spanish-coverage-report.md)
- [tmp/review-outreach/review-weekly-summary.md](../../tmp/review-outreach/review-weekly-summary.md)
- [tmp/review-outreach/review-monthly-leaderboard.md](../../tmp/review-outreach/review-monthly-leaderboard.md)
- [tmp/review-outreach/sample-regression/review-weekly-summary.md](../../tmp/review-outreach/sample-regression/review-weekly-summary.md)
- [tmp/review-outreach/sample-regression/review-monthly-leaderboard.md](../../tmp/review-outreach/sample-regression/review-monthly-leaderboard.md)

Action: keep excluded from canonical index pages and continue generating from source runbooks.

### Priority 2 - Operations Manual Draft Packet Files

Most under-cataloged files live under the operations manual draft workspace and are already grouped by [Operations Manual Draft Workspace](../../documents/content/mhc-operations-manual-drafts/README.md).

High-impact packet areas:

- [documents/content/mhc-operations-manual-drafts/02-section-drafts](../../documents/content/mhc-operations-manual-drafts/02-section-drafts)
- [documents/content/mhc-operations-manual-drafts/03-forms-appendices](../../documents/content/mhc-operations-manual-drafts/03-forms-appendices)
- [documents/content/mhc-operations-manual-drafts/04-review-approvals](../../documents/content/mhc-operations-manual-drafts/04-review-approvals)
- [documents/content/mhc-operations-manual-drafts/05-publish-ready](../../documents/content/mhc-operations-manual-drafts/05-publish-ready)

Action: preserve current folder-level indexing unless governance requires per-file discoverability.

### Priority 3 - Form Developing Specs

The form developing-spec markdown files are operationally utilized and grouped by family readmes:

- [documents/forms/README.md](../../documents/forms/README.md)
- [documents/forms/handbook/README.md](../../documents/forms/handbook/README.md)
- [documents/forms/mish/README.md](../../documents/forms/mish/README.md)

Action: keep family-level cataloging unless a requirement is introduced for per-form link tables in readmes.

## Recommended Next Actions

1. Keep current indexing policy (folder and family catalogs) as the default to avoid index bloat.
2. Add per-file link tables only for directories promoted to external contributor workflows.
3. Keep temporary output trees under tmp and app tmp excluded from canonical docs indexes.

## Strict Consolidation Map

### Current Distribution (Under-Cataloged But Utilized: 103)

- `documents/forms/mish/*`: 47 files
- `documents/forms/handbook/*`: 8 files
- `documents/content/mhc-operations-manual-drafts/02-section-drafts/*`: 14 files
- `documents/content/mhc-operations-manual-drafts/03-forms-appendices/*`: 6 files
- `documents/content/mhc-operations-manual-drafts/04-review-approvals/*`: 25 files (packet folders + review docs)
- `documents/content/mhc-operations-manual-drafts/05-publish-ready/*`: 2 files
- `apps/website/tmp/*`: 1 file

### Consolidation Decisions

1. **Canonical, do not duplicate**

- `docs/*` category indexes and standards/governance docs
- `documents/forms/forms-manifest.json` as form package wiring source
- `documents/content/mhc-operations-manual-drafts/README.md` as operations-manual draft workspace hub

1. **Family-indexed, keep as-is (intentional)**

- `documents/forms/mish/*` developing specs are owned through `documents/forms/mish/README.md`
- `documents/forms/handbook/*` developing specs are owned through `documents/forms/handbook/README.md`
- Rationale: per-file indexing for all forms would add heavy index bloat without governance benefit.

1. **Workspace-indexed, keep as-is (intentional)**

- `documents/content/mhc-operations-manual-drafts/*` section, appendices, and review packet files are intentionally grouped by one workspace README hub.
- Rationale: these are pipeline-stage artifacts; the README is the single routing surface for draft promotion flow.

1. **Non-canonical outputs, exclude from docs indexes**

- `apps/website/tmp/spanish-coverage-report.md`
- `tmp/review-outreach/*`
- Rationale: generated or transient artifacts; canonical definitions already live in source runbooks and sample templates.

1. **Promotion candidates (only when externally consumed)**

- Promote individual draft packet files to docs indexes only if they become reviewer-facing artifacts outside the current document pipeline.
- Promotion trigger: recurring cross-team use, compliance requirement, or onboarding dependency.

### Duplicate Source-Of-Truth Risk Controls

- Keep mirror-tree prohibition enforced: no `apps/website/docs`, `apps/website/messages`, `apps/website/documents`.
- Treat website and dashboard team datasets as intentionally distinct runtime surfaces:
  - `apps/website/src/lib/data/team-profiles.ts`
  - `apps/dashboard/src/lib/data/team-profiles.ts`
- Keep business documentation references aligned to these explicit monorepo paths.

## Related Indexes Updated In This Pass

- [docs/manuals/index.md](../manuals/index.md)
- [docs/marketing/index.md](../marketing/index.md)

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
