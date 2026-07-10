# Documentation Archive

**Category:** Documentation - Archive  
**Last Updated:** July 10, 2026

## Purpose

Historical documentation snapshots that are no longer active standards, kept for traceability.

## Available Archive Sets

- [2026-07 Archive Set](./2026-07/index.md)

## Rule

Archived docs are reference-only unless explicitly promoted back into an active docs category.

## Archive Metadata Contract

Each archived file should include:

1. Category
2. Status (`Archived Snapshot` or `Archived Redirect`)
3. Archived On date
4. Original Location
5. Active Replacement Source (or sources)

## Retention and Pruning Policy

Safe archive bloat reduction follows a path-stable model:

1. Preserve file paths for any archive file referenced by active docs, stubs, or indexes.
2. Prefer in-place compaction to `Archived Summary` over deleting files with inbound links.
3. Keep date-set index files and top-level archive index files at all times.
4. Before deleting any archive file, remove or update all inbound references first.
5. After archive edits, run docs sync and markdown lint with guardrails before merge.

Recommended compact summary sections:

1. Snapshot Context
2. Key Findings or Outcomes Preserved
3. Decisions Carried Forward
4. Active Replacement Source(s)

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
