# Project Documentation

**Category:** Project - Overview  
**Last Updated:** July 31, 2026

## Quick Summary

High-level project architecture, audit history, and the cross-surface congruency plan that aligns the website, PWA, and operational documents.

Use this section when you need the current implementation landscape, roadmap context, or cross-surface governance notes for MH projects.

## Overview

High-level project architecture, audit history, and the cross-surface congruency plan that aligns
the website, PWA, and operational documents.

All project documentation should preserve the same brand voice, trust framing, and SEO naming used in the canonical branding and development standards.

## Current Snapshot

- Platform remains production-live on Cloudflare Workers with OpenNext deployment flow.
- Current app stack in repo: Next.js 16.2.11, React 19.2.8, Tailwind CSS 4.3.2, TypeScript 6.0.3.
- Runtime and adapter baseline: Node.js 22+, `@opennextjs/cloudflare` 1.20.1, Wrangler 4.110.0.
- Latest structural release update: June 21, 2026 hero-to-navigation spacing standardization (see changelog).
- Latest congruency update: June 30, 2026 core-page and SEO metadata/schema de-dup sweep closure, with one intentional canonical mission-text exception retained for brand-source alignment.

**Brand Congruency:** Project planning and architecture updates must also keep typography and color guidance aligned with canonical MH standards.

## Available Resources

### Architecture

- **[Architecture Documentation](./architecture.md)** — System architecture, tech stack, and module
  boundaries.

### Operational Planning

- **[Operational Hub Congruent Plan](./operational-hub-congruent-plan.md)** — Source of truth for
  website ↔ PWA ↔ document alignment and roadmap sequencing.

### Audits

- **[Audit Index](./audit-index.md)** — Master index of project audits and their outcomes.

### Status Snapshots

- **[Repository Status Report (Phase 2 Complete)](../archive/2026-08/repo-status-phase2-complete.md)** — Archived repository inventory and status snapshot retained for reference.
- **[Markdown Housekeeping Priority Report (2026-07-29)](../archive/2026-08/markdown-housekeeping-priority-2026-07-29.md)** — Archived prioritization report for the documentation cleanup and indexing follow-up work.

## Related References

Use these references when project planning or governance work needs to connect back to the broader docs system, deployment guidance, or technical implementation standards.

- [Documentation Index](../index.md)
- [Main README](../../README.md)
- [Deployment Documentation](../deployment/index.md)
- [Technical Documentation](../technical/index.md)
