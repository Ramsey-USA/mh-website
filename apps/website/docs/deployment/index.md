# Deployment Documentation

**Category:** Deployment - Overview  
**Last Updated:** May 4, 2026

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

### CI/CD

- **[CI/CD Pipeline & Deployment Guide](./cicd-pipeline.md)** — Pipeline structure, required
  checks, and release flow.

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
