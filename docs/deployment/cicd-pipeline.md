# CI/CD Pipeline & Deployment Guide

This document outlines the complete build, test, and deployment pipeline for MH Construction website.

---

## Table of Contents

1. [Overview](#overview)
2. [GitHub Actions Workflow](#github-actions-workflow)
3. [Build Process](#build-process)
4. [Testing Pipeline](#testing-pipeline)
5. [Security Checks](#security-checks)
6. [Deployment](#deployment)
7. [Rollback Procedures](#rollback-procedures)
8. [Monitoring & Alerts](#monitoring--alerts)

---

## Overview

The mh-website uses a multi-stage CI/CD pipeline with:

**Brand Congruency:** CI/CD validation should preserve canonical MH naming, trust language, accessibility expectations, and approved visual standards.

- **Local Development:** Pre-commit hooks via Husky
- **Code Quality Gates:** Linting, type checking, formatting
- **Automated Testing:** Unit tests, integration tests with code coverage
- **Security Scanning:** Dependency audit, SAST, and vulnerability scanning
- **Build Optimization:** Low-memory builds for Cloudflare Workers
- **Deployment:** Automated deployment to Cloudflare Pages + Workers

### Technology Stack

- **CI/CD Platform:** GitHub Actions
- **Deployment Target:** Cloudflare Pages + Workers
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2
- **KV Storage:** Cloudflare Workers KV
- **Build Tool:** OpenNext.js (Next.js → Cloudflare adaptor)

---

## GitHub Actions Workflow

### Trigger Events

Pipelines automatically trigger on:

- `push` to `main` branch (production deployment)
- `pull_request` to `main` branch (quality gates)
- `schedule` - Nightly security audit (optional)
- Manual trigger via `workflow_dispatch`

### Workflow Files

```
.github/workflows/
├── ci-cd.yml            # Quality checks, security gate, build verification, deploy
├── dependency-review.yml # Pull request dependency risk gate
├── security-nightly.yml # Scheduled strict dependency audit
├── safety-smoke.yml     # Safety smoke checks (public/authenticated)
└── lighthouse-weekly.yml # Scheduled Lighthouse reporting
```

### Action Version Pinning Policy

To keep CI reproducible and aligned with security/congruency safeguards:

- Do not use floating refs such as `@master`, `@main`, or `@HEAD` for external actions.
- Use a pinned release tag (for example, `actions/checkout@v5`) or a full commit SHA.
- Enforced by the docs/contracts safeguard command: `npm run docs:guardrails:contracts`.

### Required Repository Secrets (Main Branch CI/Deploy)

Current `ci-cd.yml` runs on `main` require these GitHub repository secrets:

- `INDEXNOW_KEY`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`

---

## Build Process

### Step 1: Install Dependencies

```bash
pnpm install --frozen-lockfile --loglevel error
```

- Uses `pnpm` for faster, more reliable installations
- `--frozen-lockfile` ensures reproducible builds
- `--loglevel error` keeps CI logs focused on actionable failures
- Dependencies cached between runs for faster builds

### Step 2: Type Checking

```bash
pnpm run type-check
```

**Command:** `tsc --noEmit`

**Purpose:**

- Validates TypeScript strict mode
- Catches type errors before build
- Zero `@ts-ignore` directives allowed

**Exit on Failure:** Yes (blocks deployment)

### Step 3: Linting

```bash
pnpm run lint
```

**Command:** `eslint . --max-warnings 0`

**Rules Enforced:**

- No unused imports or variables
- No console statements in production code
- Proper React best practices
- Accessible JSX patterns
- TypeScript strict typing

**Exit on Failure:** Yes (blocks deployment)

### Step 4: Code Formatting

```bash
pnpm run format:check
```

**Command:** `prettier . --check`

**Purpose:** Ensures consistent code formatting

### Step 5: Build Compilation

```bash
pnpm --filter @mhc/website run build:lowmem
```

**Environment Variables:**

- `LOW_MEMORY_BUILD=true` - Reduces memory usage for CI
- `NODE_OPTIONS=--max-old-space-size=4096` - 4GB memory limit

**What happens:**

1. Next.js compiles all pages, components, and routes
2. Server components rendered to static HTML
3. Client components bundled with code splitting
4. Assets optimized (images, fonts, etc)
5. OpenNext adaptor prepares output for Cloudflare

**Output:** `.open-next/` directory with:

- `worker.js` - Cloudflare Worker handler
- Static assets for R2
- `cache/` - OpenNext build cache reused on rebuilds, not deployed
- KV namespace bindings

### Step 6: Artifact Staging

```bash
pnpm --filter @mhc/website run build:profile  # Optional: Profile bundle size
```

Uploads build artifacts to GitHub for analysis.

---

## Testing Pipeline

### Unit Tests

```bash
pnpm run test:ci
```

**Configuration:**

- **Test Runner:** Jest 30.4.2
- **Environment:** jsdom (browser simulation)
- **Watch Mode:** OFF in CI

**Coverage Requirements:**

- Statements: ≥95%
- Branches: ≥90%
- Functions: ≥95%
- Lines: ≥95%

**Test Organization:**

```
src/
├── __tests__/              # Root-level tests
│   ├── api/               # API route tests
│   ├── integration/       # End-to-end scenarios
│   └── asset-integrity.test.ts
├── app/
│   ├── __tests__/         # Page-level tests
│   └── [page]/__tests__/  # Specific page tests
└── components/
    └── __tests__/         # Component unit tests
```

### Test Types

1. **Unit Tests** - Individual functions, components
2. **Integration Tests** - API + database combinations
3. **Smoke Tests** - Page rendering without errors
4. **Accessibility Tests** - ARIA attributes, keyboard nav
5. **Performance Tests** - Build size, load times

### Failing Tests

If tests fail:

1. ❌ PR marked as failing
2. ❌ Deployment blocked
3. ✅ Developer must fix and push new commit
4. ✅ Tests automatically re-run

---

## Security Checks

### 1. Dependency Audit

```bash
pnpm run audit:ci
```

**Checks:**

- NPM package vulnerabilities (moderate+ level)
- Outdated dependencies
- Supply chain security

**Exit on Failure:** Yes (moderate or higher severity)

### 2. Type Safety Audit

```bash
pnpm run type-check
```

**Checks:**

- No `@ts-ignore` directives
- No `as any` type assertions
- Strict TypeScript mode enabled

### 3. Secret Scanning

GitHub's native secret scanning detects:

- AWS credentials
- API keys
- Private certificates
- Slack tokens
- GitHub tokens

**If detected:**

- ❌ Commit rejected
- 🔔 Alerts sent to admins
- 🔑 Secrets must be rotated

### 4. SAST (Static Application Security Testing)

CodeQL analysis is enabled through GitHub Advanced Security default setup.

Detects:

- SQL injection vulnerabilities
- XSS attacks
- CSRF vulnerabilities
- Hardcoded credentials

---

## Deployment

### Deployment Trigger

**Automatic deployment occurs when:**

1. ✅ All tests pass (100%)
2. ✅ Linting passes (0 violations)
3. ✅ Type checking passes
4. ✅ Pull request is merged to `main`

### Deployment Steps

#### 1. Build Optimization

```bash
pnpm --filter @mhc/website run build:lowmem
```

Generates optimized build for Cloudflare Workers.

#### 2. Deploy to Cloudflare

```bash
npx wrangler deploy
```

**Wrangler Configuration:** [wrangler.toml](../../wrangler.toml)

**What deploys:**

- Worker script (`.open-next/worker.js`)
- Static assets to R2 bucket
- Environment variables & secrets
- D1 database migrations (if any)

**Bindings deployed:**

- `DB` - Cloudflare D1 database
- `CACHE` - Workers KV (page cache)
- `ANALYTICS` - Workers KV (analytics)
- `FILE_ASSETS` - R2 bucket (forms, uploads)
- `SAFETY_INTAKE` - R2 bucket (safety docs)
- `RESUMES` - R2 bucket (job applications)

#### 3. Verify Deployment

```bash
wrangler deployments list
```

Shows:

- Deployment timestamp
- Version ID (for rollback)
- Status (active/inactive)

#### 4. Smoke Tests on Live

```bash
curl https://www.mhc-gc.com/api/health
```

Verifies:

- ✅ Worker is responding
- ✅ Database connection available
- ✅ KV namespaces accessible

---

## Rollback Procedures

### Automatic Rollback

Triggered if:

- 🔴 Critical error detected on live
- 🔴 Error rate spike (>5%)
- 🔴 Response time spike (>2x average)

**Via Cloudflare Dashboard:**

```bash
wrangler deployments list --limit 10
```

### Manual Rollback

If issues are discovered post-deployment:

```bash
# Get previous deployment ID
wrangler deployments list

# Rollback to specific version
wrangler deployments rollback <version-id>
```

### Verification After Rollback

```bash
# Verify live version
curl https://www.mhc-gc.com/api/health

# Check logs
wrangler tail --status ok --status error
```

---

## Monitoring & Alerts

### Real-time Monitoring

**Sources:**

- GitHub Actions workflow runs (`CI/CD Pipeline`, `Deploy Pipeline Alerts`)
- Cloudflare Analytics Engine
- Sentry error tracking
- Custom logging via audit-logger

**Guidance:**

- Use GitHub Actions as the primary monitor for build/deploy pipeline health.
- Use Cloudflare + Sentry for runtime availability, latency, and error trends.

### Key Metrics

| Metric          | Threshold     | Action           |
| --------------- | ------------- | ---------------- |
| Error Rate      | >1%           | Alert on Slack   |
| Response Time   | >1000ms (p95) | Investigate      |
| Worker Restarts | >10/hour      | Page on-call     |
| Database Errors | >0            | Critical alert   |
| 404 Errors      | >100/min      | Check DNS/routes |

### Alert Channels

1. **Slack** - Real-time notifications
2. **PagerDuty** - Critical incidents
3. **Email** - Summary reports
4. **GitHub** - Deployment status

### Viewing Logs

```bash
# Real-time logs
wrangler tail --status error

# Last 100 logs
wrangler tail --limit 100

# Filter by status
wrangler tail --status error --format pretty
```

---

## Local Development Workflow

### Pre-commit Hooks (Husky)

Automatically run before each commit:

```bash
# .husky/pre-commit
pnpm run format
pnpm run lint:fix
pnpm run type-check
```

Install hooks:

```bash
pnpm run prepare
```

### Development Build

```bash
pnpm run dev
```

Starts:

- Next.js dev server on `http://localhost:3000`
- Hot module reloading
- Source maps for debugging

### Production Build (Local)

```bash
pnpm run build
pnpm --filter @mhc/website run start  # Run production build locally
```

Useful for:

- Testing production builds locally
- Debugging build issues
- Performance profiling

### Lighthouse Testing

```bash
pnpm --filter @mhc/website run lighthouse:guide
```

Generates:

- Performance score
- Accessibility score
- Best practices score
- SEO score

Results saved to `./lighthouse-results/`

---

## Troubleshooting

### Build Fails with "Out of Memory"

**Solution:** Already configured in CI with `--max-old-space-size=4096`

If local build fails:

```bash
NODE_OPTIONS=--max-old-space-size=4096 pnpm run build
```

### Tests Fail in CI but Pass Locally

**Common causes:**

- Environment variables missing
- Different Node version
- File path case sensitivity (Windows vs. Unix)

**Debug:**

```bash
# Use same environment as CI
node --version   # Match GitHub Actions version
pnpm run test -- --verbose
```

### Deployment Hangs

**Check Cloudflare status:**

```bash
wrangler whoami
wrangler deployments list
```

If endpoint is unresponsive, check Cloudflare dashboard.

### High Memory Usage During Build

Reduce build scope:

```bash
# Build specific entrypoint only
pnpm --filter @mhc/website run build:next
```

---

## Performance Benchmarks

### Build Times

| Environment    | Time  | Notes      |
| -------------- | ----- | ---------- |
| Local (M1 Mac) | ~60s  | With cache |
| GitHub CI      | ~120s | Cold start |
| GitHub CI      | ~90s  | With cache |

### Bundle Size

```bash
pnpm --filter @mhc/website run bundle:size
```

Current breakdown:

- Runtime: ~100 KB
- Framework: ~50 KB
- Application: ~200 KB
- **Total:** ~350 KB (gzip)

---

## Security Best Practices

1. ✅ **Never commit `.env` files**
   - Use GitHub Secrets
   - Rotate keys regularly

2. ✅ **Review dependencies**
   - `pnpm run audit:ci` before merge
   - Pin versions in lock file

3. ✅ **Enforce branch protection**
   - Require PR reviews
   - Block merges with failing checks

4. ✅ **Sign commits**
   - GPG signing required
   - Verify maintainer identity

5. ✅ **Audit access**
   - Limit deployment permissions
   - Track who deployed what

---

## Related Documentation

- [README - Quick Start](../../README.md)
- [Testing Guide](../development/testing-coverage-next-steps.md)
- [Development Standards](../development/standards/index.md)
- [Security Standards](../technical/form-security-standards.md)

---

**Last Updated:** April 21, 2026  
**Maintained By:** MH Development Team  
**Questions?** Contact: <devops@mhc-gc.com>
