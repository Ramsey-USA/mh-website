# Branding Documentation

**Category:** Branding - Overview  
**Last Updated:** August 5, 2026

## Quick Summary

This section is the central hub for MH branding strategy, standards, governance, and implementation guidance.

Use it when you need the approved brand language, visual standards, terminology rules, or the right pre-merge checklist for a branding-sensitive change.

## Overview

This directory contains the MH branding system in a single, connected structure covering strategy, standards, governance, and implementation guidance.

Use the branding set as one system rather than as isolated documents. Enterprise dual terminology is governed across website, dashboard, MISH, handbook, and document assets, and the official structured term-library source for the current model is `documents/content/terminology-library.json` (Version 2.1, last updated 08/05/2026), synced from `documents/input/02-strategy-and-business-dev/mh-branding-terminology-library-v1-0-draft.docx`.
For numbered-intake routing and cross-family parity, use [Strategy and Branding Canonical Map](../manuals/strategy-branding-canonical-map.md).

## 📌 Single Source of Truth

- **[Brand Constants](./brand-constants.md)** - ⭐ **START HERE** - Canonical values for all brand elements
- **[MH Branding Quick Reference](./quick-reference.md)** - Condensed entry point for rapid review and shared understanding
- **[Page Slogans](./strategy/page-specific-slogans.md)** - Governance guide for runtime canonical page-level hero slogans
- **[Agent Branding Policy](./agent-branding-policy.md)** - Fast enforcement policy for AI agent decisions
- **[Dual Terminology Standard](./strategy/dual-terminology-standard.md)** - Canonical enterprise dual-label standard for website/dashboard/document surfaces
- **[Brand Congruency Master Checklist](./governance/brand-congruency-master-checklist.md)** - Canonical pre-merge branding gate
- **[Website Guardrails Coverage Map](./governance/website-guardrails-coverage.md)** - Required coverage map for all website surfaces

## Branding Congruency Requirement

All branding edits must stay congruent with the messaging, trust, accessibility, and SEO naming rules used across the site.
Typography and color decisions must also follow the canonical MH font system and color system so page layouts do not drift visually.
When a label spans public and internal assets, use the enterprise dual terminology standard before making page-specific edits.
For implementation work, pair this directory with [Development Standards](../development/standards/development-standards.md) and [AI Development Guidelines](../development/standards/ai-development-guidelines.md).

## How to Choose the Right Checklist

Use this order so every branding-sensitive change follows the same gate:

1. Start with **[Brand Congruency Master Checklist](./governance/brand-congruency-master-checklist.md)** for all branding-sensitive changes.
2. If your change is slogan, core-value, or bilingual messaging related, add **[Brand Congruency QA Checklist](./strategy/brand-congruency-qa-checklist.md)**.
3. If your change includes UI implementation or tokens, add **[Branding Congruency Checklist](../development/standards/branding-congruency-checklist.md)**.

Rule of thumb: Master checklist is always required; strategy and development checklists are companion checks based on scope.

## Agent Quick Start

For AI enforcement agents, read these first in order:

1. **[Agent Branding Policy](./agent-branding-policy.md)** - Primary decision policy and conflict handling.
2. **[Brand Constants](./brand-constants.md)** - Canonical values and non-negotiable brand references.
3. **[Unified Component Standards](./standards/unified-component-standards.md)** - Component and layout implementation standard.

Then read the remaining branding files for page-specific implementation details.

## Agent Routing Quick Map

Use this quick map to select the right agent without memorizing the full squad matrix:

| If You Are Doing This                                | Use This Agent                              |
| ---------------------------------------------------- | ------------------------------------------- |
| Brand/copy/design compliance across page work        | **Master at Arms**                          |
| Trust badges, accreditation, and credential surfaces | **Trust Sentinel**                          |
| Metadata/nav/schema naming consistency               | **SEO Signal Officer**                      |
| Accessibility checks and remediation                 | **Accessibility Watch Officer**             |
| Analytics coverage and event naming integrity        | **Telemetry Recon Officer** (on-demand)     |
| Speed, payload, and CWV regression checks            | **Performance Budget Officer** (on-demand)  |
| Docs and implementation drift reconciliation         | **Documentation Drift Officer** (on-demand) |
| Final pre-merge readiness gate                       | **Release Command**                         |

For full invocation examples, see the Agent Routing Matrix in the main README.

### Specialist Report Contracts

On-demand specialist agents use explicit PASS/FAIL report contracts:

- **Telemetry Recon Officer**: `Coverage Result`, `Missing Events`, `Naming Conflicts`, `Dashboard Impact`, `Required Remediations`
- **Performance Budget Officer**: `Performance Result`, `Payload/Bundles at Risk`, `CWV Risk`, `Top Regressions`, `Prioritized Fixes`
- **Documentation Drift Officer**: `Drift Result`, `Broken/Stale References`, `Workflow Mismatches`, `Canonical Source`, `Required Doc Updates`

## Directory Structure

### Standards

Design and visual standards for consistent brand implementation.

- **[Standards Index](./standards/index.md)** - Entry point for all branding standards
- **[Color System](./standards/color-system.md)** - Brand colors and token guidance
- **[Color Quick Reference](./standards/color-quick-reference.md)** - Compact implementation reference
- **[Header Navigation Contract](./standards/header-navigation-contract.md)** - Canonical desktop header order and menu behavior
- **[Hero Section Standards](./standards/hero-section-standards.md)** - Page header and hero composition guidance
- **[Unified Component Standards](./standards/unified-component-standards.md)** - UI component patterns and layout rules
- **[Documents & Forms Branding Standards](./standards/documents-and-forms-standards.md)** - Print/download/manual/form identity standards
- **[Team Badge System](./standards/team-badge-system.md)** - Veteran and role badge guidelines
- **[Team Profile Radar Chart](./standards/team-profile-radar-chart.md)** - Skill visualization standards

### Strategy

Messaging, voice, and brand positioning guidance.

- **[Strategy Index](./strategy/index.md)** - Entry point for messaging and terminology strategy docs
- **[Brand Overview](./strategy/brand-overview.md)** - Core brand identity
- **[Messaging Guide](./strategy/messaging.md)** - Core messaging framework
- **[Page Slogans](./strategy/page-specific-slogans.md)** - Governance guide for runtime canonical slogan matrix
- **[Dual Terminology Standard](./strategy/dual-terminology-standard.md)** - Canonical dual-label and naming rules
- **[Universal Terminology](./strategy/universal-terminology-guide.md)** - Preferred terminology and word choices
- **[Page-Specific Messaging](./strategy/page-specific-messaging-guide.md)** - Voice guidance by page type

### Governance

Documentation ownership and consolidation rules to prevent duplicate branding guidance.

- **[Governance Index](./governance/index.md)** - Governance entry point
- **[Information Architecture](./governance/information-architecture.md)** - Folder placement and consolidation rules
- **[Brand Congruency Master Checklist](./governance/brand-congruency-master-checklist.md)** - Canonical branding merge checklist
- **[Website Guardrails Coverage Map](./governance/website-guardrails-coverage.md)** - Website-wide coverage rules and surface matrix

### Section Types

- **[Section Types Guide](./section-types-guide.md)** - Available section patterns and usage

### Runtime Branding Content Sources

- **[Hero Page Slogans Source](../../apps/website/src/content/hero-page-slogans.md)** - Canonical route-level hero slogan source consumed by website rendering and SEO checks.
- **[Jeremy Page Ribbons Source](../../apps/website/src/content/jeremy-page-ribbons.md)** - Route-keyed Jeremy leadership ribbon copy source used by shared above-footer ribbon logic.
- **[Individual Branding Stamps Source](../../apps/website/src/content/individual-branding-stamps.md)** - Team-member branding stamp definitions used by website runtime loaders.

### Page Structure & Flow

- **[Universal Page Flow Standard](../development/standards/universal-page-flow-standard.md)** - Required body-content sequence for all MH pages
- **[Page Template Guide](../development/standards/page-template-guide.md)** - Implementation guide for new or refactored pages
- **[Operational Hub Congruent Plan](../project/operational-hub-congruent-plan.md)** - Website vs PWA role alignment and markdown governance workflow

## Quick Links

- [← Back to Main README](../../README.md)
- [Technical Documentation](../technical/)
- [Development Standards](../development/standards/)
- [Documentation Index](../index.md)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
