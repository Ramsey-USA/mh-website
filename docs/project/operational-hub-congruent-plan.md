# Operational Hub Congruent Plan

**Category:** Project - Platform Governance  
**Last Updated:** June 30, 2026  
**Version:** 1.2.0  
**Status:** ✅ Active - Canonical Cross-Platform Standard

> **Canonical Reference:** For exact brand values, see [Brand Constants](../branding/brand-constants.md).

---

## Purpose

This plan keeps all MD documentation aligned so MH Construction presents one consistent identity across:

- the public website (digital billboard)
- the PWA/hub (operational workspace)
- all manuals, forms, and printable documents

When language or documents change over time, this file defines how updates stay congruent with MH branding standards.

Brand congruency means the website, hub, and document surfaces must keep the same factual veteran-owned framing, relationship-first voice, trust content, accessibility, and SEO naming.

## Current Implementation Status (June 30, 2026)

- Core public-page copy and centralized SEO metadata/schema congruency sweeps are complete.
- Documentation and changelog tracking for these sweeps are current in `CHANGELOG.md` and `docs/project/audit-index.md`.
- One intentional canonical exception remains in organization schema mission text to preserve Brand Constants source-of-truth alignment.

---

## Platform Role Model (Non-Negotiable)

### Website: Digital Billboard

The website is the public-facing trust and conversion surface. It must consistently communicate:

- veteran-owned identity
- partnership-first mission
- clear service capabilities
- direct contact paths

### PWA/Hub: Operational Workspace

The PWA (`/hub`) is the operational center for:

- Admin
- Superintendents
- Field Staff
- Insurance Companies
- Government Officials

The PWA is where these users read, download, and print manuals, forms, and operational documents.

---

## Documentation Hierarchy (Brains of the Project)

All markdown standards must follow this priority order:

1. [Brand Constants](../branding/brand-constants.md) (canonical names, slogans, values, contact formats)
2. [Messaging Guide](../branding/strategy/messaging.md) and [Universal Terminology Guide](../branding/strategy/universal-terminology-guide.md)
3. [Unified Component Standards](../branding/standards/unified-component-standards.md) and [Color System](../branding/standards/color-system.md)
4. [Documents & Forms Branding Standards](../branding/standards/documents-and-forms-standards.md)
5. [PWA Quick Reference](../technical/pwa-quick-reference.md)
6. This plan for cross-platform governance and sequencing

If two documents conflict, follow the higher-priority item first and then update lower-priority docs immediately.

---

## Required Consistency Rules

1. **Identity consistency:** Use canonical company naming rules from Brand Constants.
2. **Mission consistency:** Keep the primary slogan exact: `Built on Quality, Backed by Trust.`.
3. **Terminology consistency:** Use approved terms (Client Partners, Trade Partners, etc.).
4. **Surface consistency:** Website, PWA, and printable docs must reference the same core values and ownership language.
5. **Routing consistency:** `/hub` is canonical staff access; `/safety/hub` remains backward-compat redirect only.
6. **Document standards consistency:** Printable and downloadable materials follow [Documents & Forms Branding Standards](../branding/standards/documents-and-forms-standards.md).

7. **Branding congruency consistency:** Do not introduce unapproved names, slogans, visual patterns, or trust-content reductions on any surface.

---

## Change Workflow for MD Files

When copy, forms, manuals, or platform behavior changes:

1. Update canonical source(s) first (Brand Constants and any affected standards).
2. Update platform-specific docs (website, PWA, deployment/operations references).
3. Update index/overview docs so discoverability stays coherent.
4. Fix or remove stale links and stale path references.
5. Run markdown quality checks before merge.

Recommended checks:

- `pnpm run lint:markdown`
- `pnpm run lint:brand`

---

## Coverage Checklist for Future Updates

- [ ] Website messaging still reflects MH mission, values, and terminology standards
- [ ] PWA/hub documentation still reflects operational audience and tasks
- [ ] Manuals/forms documentation still matches current print/download workflows
- [ ] Canonical references point to active files only
- [ ] Cross-links between branding, technical, and project docs are valid
- [ ] Brand voice, trust content, accessibility, and SEO naming remain congruent across surfaces

---

## Related Documentation

- [Branding Index](../branding/index.md)
- [Project Architecture](./architecture.md)
- [Main README](../../README.md)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
