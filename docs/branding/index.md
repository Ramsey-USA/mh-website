# Branding Documentation

**Category:** Branding - Overview  
**Last Updated:** July 3, 2026

## Overview

This directory contains all branding documentation for MH Construction, including design standards, strategic messaging,
and brand identity guidelines.

## 📌 Single Source of Truth

- **[Brand Constants](./brand-constants.md)** - ⭐ **START HERE** - Canonical values for all brand elements
- **[Page Slogans](./strategy/page-specific-slogans.md)** - Governance guide for runtime canonical page-level hero slogans
- **[Agent Branding Policy](./agent-branding-policy.md)** - Fast enforcement policy for AI agent decisions
- **[Brand Congruency Master Checklist](./governance/brand-congruency-master-checklist.md)** - Canonical pre-merge branding gate
- **[Website Guardrails Coverage Map](./governance/website-guardrails-coverage.md)** - Required coverage map for all website surfaces

## Branding Congruency Requirement

All branding edits must stay congruent with the messaging, trust, accessibility, and SEO naming rules used across the site.
Typography and color decisions must also follow the canonical MH font system and color system so page layouts do not drift visually.
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

- **[Color System](./standards/color-system.md)** - Brand colors (Hunter Green #386851, Leather Tan #BD9264)
- **[Hero Section Standards](./standards/hero-section-standards.md)** - Page header guidelines
- **[Unified Component Standards](./standards/unified-component-standards.md)** - UI component patterns (v7.1.0)
- **[Documents & Forms Branding Standards](./standards/documents-and-forms-standards.md)** - Print/download/manual/form identity standards
- **[Team Badge System](./standards/team-badge-system.md)** - Veteran and role badge guidelines
- **[Team Profile Radar Chart](./standards/team-profile-radar-chart.md)** - Skill visualization standards

### Strategy

Messaging, voice, and brand positioning guidelines.

- **[Brand Overview](./strategy/brand-overview.md)** - Core brand identity
- **[Messaging Guide](./strategy/messaging.md)** - Core messaging framework (v7.0.0)
- **[Page Slogans](./strategy/page-specific-slogans.md)** - Governance guide for runtime canonical slogan matrix for page-level surfaces
- **[Dual Terminology Standard](./strategy/dual-terminology-standard.md)** - Canonical dual-label and arrow-format naming rules
- **[Universal Terminology](./strategy/universal-terminology-guide.md)** - Consistent word choices
- **[Page-Specific Messaging](./strategy/page-specific-messaging-guide.md)** - Voice by page type

### Governance

Documentation ownership and consolidation rules to prevent duplicate branding guidance.

- **[Governance Index](./governance/index.md)** - Governance entry point
- **[Information Architecture](./governance/information-architecture.md)** - Folder placement and consolidation rules
- **[Brand Congruency Master Checklist](./governance/brand-congruency-master-checklist.md)** - Canonical branding merge checklist
- **[Website Guardrails Coverage Map](./governance/website-guardrails-coverage.md)** - Website-wide coverage rules and surface matrix

### Section Types

- **[Section Types Guide](./section-types-guide.md)** - Available section patterns and usage

### Page Structure & Flow

- **[Universal Page Flow Standard](../development/standards/universal-page-flow-standard.md)** - Required body-content sequence for all MH pages
- **[Page Template Guide](../development/standards/page-template-guide.md)** - Implementation guide for new or refactored pages
- **[Operational Hub Congruent Plan](../project/operational-hub-congruent-plan.md)** - Website vs PWA role alignment and markdown governance workflow

## Quick Links

- [← Back to Main README](../../README.md)
- [Technical Documentation](../technical/)
- [Development Standards](../development/standards/)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
