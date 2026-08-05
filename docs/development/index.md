# Development Documentation

**Category:** Development - Overview  
**Last Updated:** August 5, 2026

## Quick Summary

This section is the main entry point for implementation work, standards, component patterns, and developer guidance across the MH website.

Use it when you need to find the right standards document, quick-reference pattern, or approval checkpoint before changing a route, component, or content surface.

## Overview

Use this section when you are implementing, refactoring, or validating website features. Start with the standards index, then use the quick-reference guides for common patterns and reusable components.

**Brand Congruency:** Development work must preserve canonical MH typography, color usage, terminology, trust visibility, and accessibility expectations.

### Start Here

- [Standards Index](./standards/index.md) — the main entry point for implementation rules
- [Quick Reference Index](./quick-reference/index.md) — compact references for common implementation work
- [Component Templates Index](./components/index.md) — reusable section templates and implementation notes
- [Markdown Document Template](./quick-reference/markdown-doc-template.md) — shared structure for new docs and reference pages
- [Brand Congruency Master Checklist](../branding/governance/brand-congruency-master-checklist.md) — required gate for branding-sensitive changes
- [Ecosystem Destination Matrix](../manuals/ecosystem-destination-matrix.md) — canonical folder-to-destination routing for numbered intake families

## Standards (Required Reading)

See **[Standards Index](./standards/index.md)** for the full standards library, including:

- **[Canonical Contracts Matrix](../branding/governance/website-guardrails-coverage.md#canonical-contracts-matrix-development-routing)** — Single routing table for component-level brand enforcement

- **[Development Standards](./standards/development-standards.md)** — Core code patterns
- **[Consistency Guide](./standards/consistency-guide.md)** — **MANDATORY** consistency rules
- **[Common Mistakes](./standards/common-mistakes.md)** — 22 errors to avoid
- **[Page Template Guide](./standards/page-template-guide.md)** — Boilerplate for new pages
- **[Page Compliance Checklist](./standards/page-compliance-checklist.md)** — 150+ verification items
- **[Universal Page Flow Standard](./standards/universal-page-flow-standard.md)** — Required body sequence
- **[Brand Congruency Master Checklist](../branding/governance/brand-congruency-master-checklist.md)** — Canonical branding merge gate
- **[AI Development Guidelines](./standards/ai-development-guidelines.md)** — AI agent rules
- **[Agent Prompt Runbook](./standards/agent-prompt-runbook.md)** — Forms + manual prompts

## Quick Reference

- **[Component Cheatsheet](./quick-reference/component-cheatsheet.md)** — Copy-paste patterns
  matching homepage style

## Components

- **[Template Components](./components/template-components.md)** — `BrandedContentSection` and
  related reusable templates

## Engineering Practices

- **[JSDoc Standards](./JSDOC_STANDARDS.md)** — Component documentation conventions
- **[Performance Documentation](../performance/index.md)** — Page-level performance
  standards and audit references
- **[Hero Commercial Video Guardrails](./standards/hero-commercial-video-guardrails.md)** — Canonical build and validation rules for hero videos
- **[Development Standards](./standards/development-standards.md)** — Current refactor and decomposition guidance
- **[Project Architecture](../project/architecture.md)** — Current structural analysis reference
- **[Test Coverage — Next Steps](../archive/2026-08/testing-coverage-next-steps.md)** — Archived coverage audit roadmap

## Numbered Intake Parity

- Treat `documents/input/01-*` through `documents/input/10-*` as the canonical source intake model for documentation parity.
- Use [MH Ecosystem Source Index](../manuals/mh-ecosystem-source-index.md) as the source inventory authority before updating guide copy or pipeline notes.
- Use [Ecosystem Destination Matrix](../manuals/ecosystem-destination-matrix.md) to route each family update to the correct markdown and manifest destinations.
- Use [IT and Infrastructure Canonical Map](../manuals/it-infrastructure-canonical-map.md) when system or onboarding changes originate from the 05 numbered intake family.

## IT and Onboarding Development Commitments

The current 05-family source set adds a controlled operating expectation to development-facing work:

- system access should be provisioned through an approved access workflow, not ad hoc sharing
- onboarding should complete employment, handbook, safety, and access steps before independent assignment
- 30/60/90-day integration and competency confirmation should be treated as part of the governed onboarding lifecycle
- offboarding should revoke access and recover property through a coordinated process rather than isolated ticket closure

When implementation work touches authentication, permissions, onboarding, or admin workflows, keep those expectations aligned with the active 05 doctrine sources.

## App Operations References

- **[Website Scripts Guide](../../apps/website/scripts/mh-scripts-guide.md)** — App package script catalog and operational command routing.
- **[Website Testing Guide](../../apps/website/testing/mh-testing-guide.md)** — Testing workflows, command patterns, and expected coverage behavior.

## Data Module Naming Policy

- Team profile runtime imports must use `team-profiles` as the canonical module name.
- Legacy `vintage-team` modules are compatibility bridges only and must not be used in new imports.
- Canonical surface paths:
  - `apps/website/src/lib/data/team-profiles.ts`
  - `apps/dashboard/src/lib/data/team-profiles.ts`

## Forward Plan Requirement

- **Global Jeremy ribbon standard (required):** Every public page must display the shared Jeremy leadership ribbon directly above the footer with identical behavior across routes. Route-specific ribbon copy is maintained in `apps/website/src/content/jeremy-page-ribbons.md`, and routing behavior is enforced through shared shell logic.
- **Jeremy SEO guardrails (required):** CI must enforce both `seo:jeremy:signals:check` and `seo:jeremy:metadata:check` so indexable routes keep the approved Jeremy name trio, `Jeremy Gale Thamert`, `Jeremy G. Thamert`, and `Jeremy Thamert`, aligned across ribbon content, structured data, and high-impact metadata builders.
- **Jeremy route parity safeguard (required):** CI must enforce `seo:jeremy:route-parity:check` so route keys remain synchronized between `apps/website/src/lib/seo/jeremy-seo-route-keys.ts`, `apps/website/src/lib/seo/page-seo-utils.ts`, and `apps/website/src/content/jeremy-page-ribbons.md`.
- **Future page SEO requirement (required):** When adding a new indexable route, add a matching key in `apps/website/src/content/jeremy-page-ribbons.md` and wire route-aware keyword generation in `apps/website/src/lib/seo/page-seo-utils.ts` so Jeremy quote signals flow into metadata for that page.

## Quick Links

- [← Documentation Index](../index.md)
- [← Back to Main README](../../README.md)
- [Branding Documentation](../branding/index.md)
- [Technical Documentation](../technical/index.md)
- [Markdown Document Template](./quick-reference/markdown-doc-template.md)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
