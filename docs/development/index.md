# Development Documentation

**Category:** Development - Overview  
**Last Updated:** July 3, 2026

## Overview

Engineering standards, quick references, refactoring playbooks, and component templates for
building MH Construction website features at homepage-level quality.

**Brand Congruency:** Development work must preserve canonical MH typography, color usage, terminology, trust visibility, and accessibility expectations.

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
- **[Performance Optimization Strategy](./PERFORMANCE_OPTIMIZATION_STRATEGY.md)** — Page-level
  performance playbook
- **[Hero Commercial Video Guardrails](./standards/hero-commercial-video-guardrails.md)** — Canonical build and validation rules for hero videos
- **[Large Component Refactoring](./LARGE_COMPONENT_REFACTORING.md)** — Decomposition guide
- **[Codebase Analysis](./codebase-analysis.md)** — Comprehensive structural analysis
- **[Test Coverage — Next Steps](./testing-coverage-next-steps.md)** — Coverage audit roadmap

## Forward Plan Requirement

- **Global Jeremy ribbon standard (required):** Every public page must display the shared Jeremy leadership ribbon directly above the footer with identical behavior across routes. Route-specific ribbon copy is maintained in `apps/website/src/content/jeremy-page-ribbons.md`, and routing behavior is enforced through shared shell logic.
- **Jeremy SEO guardrails (required):** CI must enforce both `seo:jeremy:signals:check` and `seo:jeremy:metadata:check` so indexable routes keep Jeremy name/entity associations in ribbon content, structured data, and high-impact metadata builders.
- **Future page SEO requirement (required):** When adding a new indexable route, add a matching key in `apps/website/src/content/jeremy-page-ribbons.md` and wire route-aware keyword generation in `apps/website/src/lib/seo/page-seo-utils.ts` so Jeremy quote signals flow into metadata for that page.

## Quick Links

- [← Documentation Index](../index.md)
- [← Back to Main README](../../README.md)
- [Branding Documentation](../branding/index.md)
- [Technical Documentation](../technical/index.md)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
