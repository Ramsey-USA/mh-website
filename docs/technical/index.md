# Technical Documentation

**Category:** Technical - Overview  
**Last Updated:** August 5, 2026

## Quick Summary

This section covers implementation guidance for the MH Construction website, including homepage standards, design system patterns, SEO, PWA, analytics, security, and integrations.

Use it when you need technical implementation guidance that must stay aligned with branding, accessibility, and documentation standards.

## Overview

Use this section for implementation guidance across the MH Construction website, including the homepage reference, design system, SEO, PWA, analytics, security, and integration patterns.

These guides should be used alongside the branding and development standards so implementation stays congruent with approved voice, trust content, accessibility, and SEO naming.

**Brand Congruency:** Technical implementations must keep typography and color usage aligned with the canonical MH font and palette system.

### Start Here

- [Homepage Documentation](./homepage.md) — the visual and content reference for page quality
- [Website Guardrails Coverage Map](../branding/governance/website-guardrails-coverage.md) — required coverage check for branding-sensitive changes
- [SEO Index](./seo/index.md) — implementation entry point for SEO guidance

## Reference Standard

- **[Homepage Documentation](../archive/2026-08/homepage.md)** — Archived reference page for the legacy homepage implementation notes.

## Numbered Ecosystem Source Lineage

Technical implementation updates that intersect operations systems should align to the canonical `05-it-and-infrastructure` intake family:

- `documents/input/05-it-and-infrastructure/mh-field-command-center-system-standard-v1-0-draft.docx`
- `documents/input/05-it-and-infrastructure/mh-it-data-governance-addendum-v1-0-draft.docx`
- `documents/input/05-it-and-infrastructure/mh-it-digital-infrastructure-guide-v1-0-draft.docx`
- `documents/input/05-it-and-infrastructure/mh-new-employee-orientation-guide-v1-0-draft.docx`

Use [Ecosystem Destination Matrix](../manuals/ecosystem-destination-matrix.md) and [MH Ecosystem Source Index](../manuals/mh-ecosystem-source-index.md) to keep source-routing and guide parity synchronized.
For file-level 04 and 05 routing, use [Safety and Field Operations Canonical Map](../manuals/safety-field-ops-canonical-map.md) and [IT and Infrastructure Canonical Map](../manuals/it-infrastructure-canonical-map.md).

## IT and Infrastructure Control Commitments

The current 05-family source set frames technical operations as controlled resilience and access-governance work, not only implementation convenience.

- **Access by role and business need**: provisioning should follow approved role, least-privilege, and MFA requirements before access is granted.
- **Quarterly access recertification**: user and privileged access should be reviewed on a recurring cadence rather than left permanent by default.
- **Restore testing, not backup optimism**: backup success alone is insufficient; recovery and restore evidence are part of the expected control set.
- **Immediate incident containment**: suspected security incidents should be reported, preserved, and contained without waiting for downstream confirmation.
- **Coordinated onboarding and offboarding**: system access, handbook/onboarding steps, and property or credential recovery should move together as one governed workflow.

These commitments are the operating layer beneath the technical implementation references in this category.

Brand-facing content in this section should stay aligned with the canonical terminology and messaging guides, with veteran-owned framing used as supporting credibility rather than the primary label.

## Design System

See **[Design System Index](./design-system/index.md)** for the full library, including:

- **[Buttons & CTAs Complete Guide](./design-system/buttons-ctas-complete-guide.md)**
- **[Icon System Complete](./design-system/icon-system-complete.md)**

## Component Patterns

See **[Patterns Index](./patterns/index.md)** for reusable section patterns, including:

- **[AlternatingShowcase Pattern](./patterns/AlternatingShowcase-pattern.md)**
- **[NextStepsSection Standardization](./patterns/NextStepsSection-standardization.md)**
- **[Component Pattern Strategy](./patterns/component-pattern-strategy.md)**
- **[CTA Page Allocation](../archive/2026-08/cta-page-allocation.md)** — _Archived reference for the distinction and usage policy between `NextStepsSection` and `StrategicCTABanner`._

## SEO

- **[SEO Index](./seo/index.md)** — SEO guide set entry point for implementation and policy.
- **[Route Indexing Policy Checklist](./seo/route-indexing-policy-checklist.md)** — Required
  process for classifying routes as indexable, noindex, or redirect and keeping sitemap coverage aligned.

## PWA & Media

- **[PWA Quick Reference Guide](./pwa-quick-reference.md)** — PWA-first development, `usePWA`,
  `PWAOnly`, and offline behavior.
- **[Automatic Media Optimization](./automatic-media-optimization.md)** — Image and video
  optimization pipeline.

## Analytics

- **[Analytics Tracking Implementation Guide](../archive/2026-08/analytics-tracking-guide.md)** — Archived event taxonomy and 100% page coverage notes.

## Theming

- **[Dark Mode Quick Reference](./dark-mode-quick-reference.md)** — Dark theme implementation
  guide.

## Safety

- **[MH Construction Safety Program Guide](./safety-program-guide.md)** — Safety program
  reference and integration with the Safety Hub.
- **[Safety Terminology Glossary](./safety-terminology-glossary.md)** — Canonical definitions for MISH, APP, SSSP, MSDS/SDS, and daily Toolbox Talk freshness standards.
- **[Forms Branding Guardrail Implementation](./forms-branding-guardrail-implementation.md)** — Implementation details for canonical safety-form border alignment and footer styling guardrails.

## Security

- **[Admin Password Security Guide](./admin-password-security.md)**
- **[Form Security Standards](./form-security-standards.md)**
- **[Secrets Management Guide](./secrets-management.md)**

## Integrations

- **[External Services Integration Guide](./services-integration-guide.md)** — Twilio, Resend,
  Cloudflare bindings, and other external service wiring.
- **[Services Integration Roadmap](../archive/2026-08/services-integration-roadmap.md)** — Archived priority rollout, ownership checklist, and maturity planning notes.

## Reference

- **[API Routes Reference](./API_ROUTES_INDEX.md)** — Index of all `src/app/api` routes.
- **[Browser Tab Titles Inventory](../archive/2026-08/browser-tab-titles-inventory.md)** — Archived dual military/construction messaging inventory across routes.
- **[Repository Handoff Bundle (2026-07-19)](../archive/2026-08/repo-handoff-bundle-2026-07-19.md)** — Archived repository structure and tooling export for handoff context.
- **[QR Codes Guide](../archive/2026-08/qr-codes-guide.md)** — Archived reference for QR code assets under
  `public/images/qr-codes/`.

## Quick Links

- [← Documentation Index](../index.md)
- [← Back to Main README](../../README.md)
- [Branding Documentation](../branding/index.md)
- [Development Standards](../development/standards/index.md)
- [Markdown Document Template](../development/quick-reference/markdown-doc-template.md)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
