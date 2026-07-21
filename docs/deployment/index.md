# Deployment Documentation

**Category:** Deployment - Overview  
**Last Updated:** July 19, 2026

## Overview

Operational guides for deploying the MH Construction website to Cloudflare Workers and
maintaining safety-critical CI gates.

**Brand Congruency:** Deployment and release procedures must not introduce drift in canonical MH typography, color usage, trust content, or naming.

## Available Resources

### Cloudflare

- **[Cloudflare Workers Deployment Guide](./cloudflare-guide.md)** — End-to-end deployment
  procedure for the production worker.
- **[Cloudflare Compatibility Assessment](./cloudflare-compatibility.md)** — Dependency upgrade
  compatibility matrix for the Workers runtime.
- **[Cloudflare Verification Runbook](./cloudflare-verification-runbook.md)** — Step-by-step
  pass/fail validation for connection, bindings, security, and optimization settings.
- **[Cloudflare Security Hardening Runbook](./cloudflare-security-hardening-runbook.md)** —
  Prioritized remediation for WAF, account hardening, DNS proxy posture, bot controls, and
  email authentication records.
- **[Cloudflare Dashboard Fast Path](./cloudflare-dashboard-fast-path.md)** — Search-term-driven
  checklist for completing hardening when dashboard navigation changes.

### CI/CD

- **[CI/CD Pipeline & Deployment Guide](./cicd-pipeline.md)** — Pipeline structure, required
  checks, and release flow.
- **[Publishing Workflow (CI/CD Guide)](./cicd-pipeline.md#publishing-workflow)** — Request to
  release workflow with role-based approvals and evidence checkpoints.
- **[Rollback Procedures (CI/CD Guide)](./cicd-pipeline.md#rollback-procedures)** — Trigger
  matrix and Cloudflare/OpenNext rollback execution path.
- **[Monthly Quality Review Checklist (CI/CD Guide)](./cicd-pipeline.md#monthly-quality-review-checklist)** — Monthly control checklist with owner role, evidence source, pass criteria, and response thresholds.
- **[Exception Handling and Review Triggers (CI/CD Guide)](./cicd-pipeline.md#exception-handling-and-review-triggers)** — Exception record requirements with event-driven and quarterly review triggers.

### Safety Gates

- **[Safety CI Gate Policy](./safety-ci-gate-policy.md)** — Mandatory checks that block merges
  affecting safety surfaces.
- **[Safety Smoke Setup Guide](./safety-smoke-setup.md)** — Local and CI smoke configuration for
  safety forms and the safety hub.

### Database

- **[Database Migrations Guide](./database-migrations-guide.md)** — Workflow for authoring,
  applying, and reviewing D1 migrations under `migrations/`.

## Quick Links

- [← Documentation Index](../index.md)
- [← Back to Main README](../../README.md)
- [Project Architecture](../project/architecture.md)
- [Operational Hub Congruent Plan](../project/operational-hub-congruent-plan.md)

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
