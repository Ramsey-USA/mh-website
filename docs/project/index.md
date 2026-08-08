# Project Documentation

**Category:** Project - Overview  
**Last Updated:** August 7, 2026

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

## Numbered Ecosystem Source Lineage

Project documentation should align to the numbered intake families that govern enterprise risk, quality, project execution, safety integration, and controlled records:

- `documents/input/01-core-doctrine/mh-corporate-risk-management-playbook-v1-0-draft.docx`
- `documents/input/01-core-doctrine/mh-quality-management-plan-v1-0-draft.docx`
- `documents/input/03-project-delivery/mh-project-execution-playbook-v1-0-draft.docx`
- `documents/input/03-project-delivery/mh-estimating-bid-package-guide-v1-0-draft.docx`
- `documents/input/03-project-delivery/mh-financial-controls-guide-v1-0-draft.docx`

Use [Core Doctrine Canonical Map](../manuals/core-doctrine-canonical-map.md) and [Project Delivery Canonical Map](../manuals/project-delivery-canonical-map.md) to keep project governance, execution, and evidence language aligned with the source model.

## Available Resources

### Architecture

- **[Architecture Documentation](./architecture.md)** — System architecture, tech stack, and module
  boundaries.

### Operational Planning

- **[Operational Hub Congruent Plan](./operational-hub-congruent-plan.md)** — Source of truth for
  website ↔ PWA ↔ document alignment and roadmap sequencing.

### Controlled Operations Guidance

- **[Enterprise Risk Management Guide](./enterprise-risk-management-guide.md)** — Markdown-facing baseline for enterprise risk, escalation, and evidence controls.
- **[Quality Management Guide](./quality-management-guide.md)** — Markdown-facing baseline for quality planning, nonconformance, and turnover controls.

### Active Sitewide Phases

- **[Sitewide Accessibility Phase (August 2026)](./sitewide-accessibility-phase-2026-08.md)** — Shared-shell keyboard bypass control, route-wide coverage, and release gates.
- **[Ecosystem Sitewide Congruency Phase (August 2026)](./ecosystem-sitewide-congruency-phase-2026-08.md)** — Draft lifecycle enforcement, controlled public indexes, R2 authorization, and document-factory boundaries.

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
- [Core Doctrine Canonical Map](../manuals/core-doctrine-canonical-map.md)
