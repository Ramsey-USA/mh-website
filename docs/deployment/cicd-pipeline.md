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
- **Deployment:** Automated deployment to Cloudflare Workers (OpenNext)

## Operational Control Map

This runbook is the indexed source for release operations control subjects required by
current repository standards.

| Subject                | Canonical Section                                                                 |
| ---------------------- | --------------------------------------------------------------------------------- |
| Publishing workflow    | [Publishing Workflow](#publishing-workflow)                                       |
| Rollback               | [Rollback Procedures](#rollback-procedures)                                       |
| Monthly quality review | [Monthly Quality Review Checklist](#monthly-quality-review-checklist)             |
| Exception handling     | [Exception Handling And Review Triggers](#exception-handling-and-review-triggers) |

Supporting references used by this workflow:

- `docs/deployment/cloudflare-verification-runbook.md`
- `docs/deployment/safety-ci-gate-policy.md`
- `docs/development/standards/accessibility-regression-checklist.md`
- `docs/performance/monitoring-budgets-phase7-5.md`

### Technology Stack

- **CI/CD Platform:** GitHub Actions
- **Deployment Target:** Cloudflare Workers (OpenNext)
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2
- **KV Storage:** Cloudflare Workers KV
- **Build Tool:** OpenNext (`@opennextjs/cloudflare` 1.20.1) (Next.js -> Cloudflare adapter)

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

### Recent CI Operational Update (Jul 16, 2026)

- Upgraded cache actions from `actions/cache@v4` to `actions/cache@v5` in active workflows to remove GitHub-hosted runner Node 20 deprecation annotations.
- Confirmed successful end-to-end production run after the update: `CI/CD Pipeline` run `29464674443` completed with `Deploy to Cloudflare Workers` = success.

### Action Version Pinning Policy

To keep CI reproducible and aligned with security/congruency safeguards:

- Do not use floating refs such as `@master`, `@main`, or `@HEAD` for external actions.
- Use a pinned release tag (for example, `actions/checkout@v5`) or a full commit SHA.
- Enforced by the docs/contracts safeguard command: `npm run docs:guardrails:contracts`.

### Required Repository Secrets (Main Branch CI/Deploy)

Current `ci-cd.yml` runs on `main` require these GitHub repository secrets:

- `INDEXNOW_KEY` - IndexNow key for SEO search engine notification
- `CLOUDFLARE_ACCOUNT_ID` - Cloudflare account ID for deployment
- `CLOUDFLARE_API_TOKEN` - Cloudflare API token for Workers and cache purge
- `CLOUDFLARE_ZONE_ID` - Cloudflare Zone ID for cache purge (find in dashboard: Overview → Zone ID)

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

Canonical policy and recent remediation references:

- [Repository Security Policy](../../SECURITY.md#dependency-override-hygiene)
- [Security Remediation Changelog Record](../../CHANGELOG.md)

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

## Publishing Workflow

Follow this path for any publishable change request, from intake through closure.

1. Open issue or request with affected routes, content source, and owner role.
2. Collect source evidence (contracts, certifications, project approvals, media rights,
   consent records) and attach evidence location in the issue.
3. Perform claim check with a claim approver before editing public copy.
4. Implement content/code changes in a branch and run focused tests.
5. Run Spanish review for affected locale keys and route rendering behavior.
6. Validate asset rights and optimization for any new media.
7. Open pull request with required approvals by role.
8. Pass release gates before merge to `main`.
9. Allow protected `main` CI deployment to run; do not deploy manually unless incident
   process requires emergency action.
10. Run smoke verification and monitoring checks.
11. Close issue with evidence links, gate outputs, and any follow-up tasks.

### Operating Roles

Use these role labels unless a document names a specific accountable person.

| Role                 | Responsibility                                                   |
| -------------------- | ---------------------------------------------------------------- |
| Content owner        | Own request scope, business intent, and source artifacts         |
| Claim approver       | Confirms public claims, certifications, and trust statements     |
| Translation reviewer | Confirms Spanish parity and language-quality acceptance          |
| Media approver       | Confirms rights, attribution, and optimization for assets        |
| Technical reviewer   | Confirms implementation quality and validation outputs           |
| Safety reviewer      | Required when safety docs/forms/safety routes are affected       |
| Release owner        | Confirms gates, merge readiness, smoke checks, and closure notes |

### Required Approval Matrix

| Change type                               | Required roles                                                    |
| ----------------------------------------- | ----------------------------------------------------------------- |
| Public copy, SEO metadata, or claims      | Content owner, claim approver, technical reviewer                 |
| Spanish locale changes                    | Content owner, translation reviewer, technical reviewer           |
| Media/video/image updates                 | Content owner, media approver, technical reviewer                 |
| Safety routes, forms, or manuals          | Content owner, safety reviewer, technical reviewer, release owner |
| Infrastructure, CI, or deployment scripts | Technical reviewer, release owner                                 |

### Release Gate Commands

Run from repository root before approving merge to `main`.

```bash
pnpm run format:check
pnpm run lint
pnpm run type-check
pnpm run lint:markdown
pnpm run docs:sync:check
pnpm run docs:stack:congruency:check
pnpm run scripts:sync:check
pnpm run app:mirrors:sync:check
pnpm run migrations:sync:check
pnpm --filter @mhc/website run verify:route-integrity
pnpm --filter @mhc/website run seo:routes:check
pnpm --filter @mhc/website run congruency:website:check
pnpm --filter @mhc/website run build
```

Release owner records pass/fail evidence in the pull request.

### Post-Deploy Verification

After `main` deploy completes in CI:

1. Verify workflow success in `.github/workflows/ci-cd.yml`.
2. Run targeted smoke tests for changed routes/APIs.
3. Verify analytics/web-vitals ingestion is still active for changed routes.
4. Review Sentry and Cloudflare observability for immediate regressions.
5. Record verification summary in the issue or release note.

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

#### 4. Purge Edge Cache

After deployment, Cloudflare cache is automatically purged for affected paths:

```bash
# Smart detection: purges only changed page routes
# Core components? Purges all paths
# Single page changed? Purges just that route + home
```

**How it works:**

1. Compares commits to detect changed source files
2. Maps source paths to URL routes:
   - `src/app/about/*` → `/about` + `/`
   - `src/app/services/*` → `/services`, `/services/*` + `/`
   - `src/app/projects/*` → `/projects`, `/projects/*` + `/`
   - `src/components/*` → purge all (`/*`)
   - `public/robots.txt`, `public/sitemap*` → specific files
3. Sends purge request to Cloudflare API
4. Always purges: `/`, `/sitemap.xml`, `/robots.txt`, `/api/*`

**Benefits:**

- ✅ Fresh content immediately available
- ✅ Static assets remain cached (performance)
- ✅ Minimal API overhead
- ✅ Graceful failure (doesn't block deployment)

**Requires GitHub secret:**

- `CLOUDFLARE_ZONE_ID` - Your Cloudflare Zone ID

#### 5. Smoke Tests on Live

```bash
curl https://www.mhc-gc.com/api/health
```

Verifies:

- ✅ Worker is responding
- ✅ Database connection available
- ✅ KV namespaces accessible

---

### Rollback Procedures

No automatic rollback is configured in this repository. Rollback is an explicit release-owner
decision based on production evidence.

**Note:** Cache purge is automated after every deployment. If you rollback, you may need to
manually purge cache for critical routes to ensure old content isn't served.

### Rollback Triggers

Use rollback when one or more of these are confirmed:

- Content error: incorrect client-facing facts or expired claims published.
- Broken route: user-facing 404/500 on canonical routes.
- Wrong locale: English/Spanish route renders incorrect or mixed-language content.
- False claim: certification/trust statement published without valid evidence.
- Accessibility regression: keyboard/focus interaction fails on affected flows.
- Form failure: submission path fails or returns invalid response behavior.
- Performance regression: measured route exceeds accepted budget baseline.
- Media or RSS failure: required assets/feeds fail to render or serve.
- Security defect: sensitive exposure or access-control regression.
- Failed deployment: CI deploy completes with degraded runtime behavior.

### Rollback Steps

1. Capture evidence first: workflow run link, route URLs, logs, and timestamp.
2. Open incident/follow-up issue and mark severity.
3. Prefer `git revert <commit>` for content/code defects, then merge through required checks.
4. For urgent production rollback, identify prior healthy deployment:

```bash
wrangler deployments list --limit 10
```

1. Roll back explicitly to last known healthy deployment:

```bash
wrangler deployments rollback <version-id>
```

1. Verify runtime after rollback:

```bash
curl -sSI https://www.mhc-gc.com | sed -n '1,40p'
curl -sS https://www.mhc-gc.com/api/health
wrangler tail --status error --format pretty
```

1. Address cache implications:

- Validate critical routes and key static assets after rollback.
- If stale content persists, coordinate dashboard cache purge with release owner.

1. Communicate rollback status in the issue/PR and assign corrective owner.
1. Create follow-up implementation issue with prevention checks.

### Verification After Rollback

Mark rollback complete only when:

1. Impacted routes and APIs return expected status and content.
2. Accessibility and form behavior regression checks pass.
3. Analytics and error monitoring return to expected baseline.
4. Incident issue contains evidence and remediation owner.

## Exception Handling And Review Triggers

Use exceptions only when a required gate cannot pass before a high-priority release decision.
No exception allows direct secret exposure, credential changes, or bypassing protected branch
rules.

### Exception Record Requirements

Every exception must include:

1. Owner role and reviewer role.
2. Scope and impacted routes/components/docs.
3. Why the standard path could not be completed.
4. Risk level and user/business impact.
5. Expiration date and follow-up task.
6. Evidence location for temporary acceptance.

### Event-Driven Review Triggers

Run an exception/risk review when any of these occur:

- Major brand direction change.
- New market or new service lane launch.
- New certification or public-sector claim introduction.
- Safety document policy change.
- New external integration.
- Framework or OpenNext upgrade.
- Material incident or production defect.

### Quarterly Review Guidance

Quarterly review is required only if event-driven triggers did not occur in the quarter.
The review verifies open exceptions, aging risks, and stale controls.

## Monthly Quality Review Checklist

Run this checklist monthly and store evidence links in the monthly operations issue.

| Check item                                   | Owner role           | Source or report                           | Pass condition                                                | Action threshold                                            | Evidence location                  |
| -------------------------------------------- | -------------------- | ------------------------------------------ | ------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------- |
| Public content freshness and lifecycle dates | Content owner        | Page inventory and dated content surfaces  | No expired lifecycle dates on public pages                    | Any expired date or stale campaign state                    | Monthly operations issue checklist |
| Claim and certification validity             | Claim approver       | Brand constants and verification links     | All public claims match active evidence                       | Any mismatch, expired cert, or unverifiable claim           | Monthly operations issue checklist |
| Project, testimonial, and team consent state | Content owner        | Consent records and profile sources        | All showcased entities have current consent                   | Missing or expired consent                                  | Monthly operations issue checklist |
| Event state accuracy                         | Content owner        | Events index and event detail pages        | Past/upcoming states are correct                              | Any outdated event status or CTA mismatch                   | Monthly operations issue checklist |
| Location evidence integrity                  | Claim approver       | Location evidence matrix and route content | Office/service-area assertions match evidence policy          | Any unsupported location assertion                          | Monthly operations issue checklist |
| News and podcast cadence                     | Content owner        | News/podcast publish logs                  | Cadence meets current plan                                    | Missed cadence window in current month                      | Monthly operations issue checklist |
| Spanish coverage and review                  | Translation reviewer | Locale parity checks and route review      | Changed English content has reviewed Spanish parity           | Missing translations or fallback leakage                    | Monthly operations issue checklist |
| Broken links and navigation                  | Technical reviewer   | Route integrity and smoke checks           | No broken internal links on key routes                        | Any broken route/link in canonical nav flows                | Monthly operations issue checklist |
| Sitemap, robots, and canonical integrity     | Technical reviewer   | SEO route checks and sitemap outputs       | Canonical endpoints and indexing policy are valid             | Policy drift or invalid route indexing                      | Monthly operations issue checklist |
| Accessibility regression status              | Technical reviewer   | Accessibility checklist + focused tests    | Release-critical interactions pass keyboard/focus/aria checks | Any WCAG regression on key flows                            | Monthly operations issue checklist |
| Core Web Vitals and asset budgets            | Technical reviewer   | Web vitals logs and budget scripts         | Metrics remain within documented budgets                      | Budget breach or sustained vitals regression                | Monthly operations issue checklist |
| Form success and error behavior              | Safety reviewer      | Form tests, logs, and smoke checks         | Required forms submit and fail gracefully                     | Elevated form failures or validation defects                | Monthly operations issue checklist |
| Analytics integrity                          | Technical reviewer   | Analytics debug events and route templates | Events include expected route templates and no duplicates     | Missing route template, duplicate vital IDs, or silent drop | Monthly operations issue checklist |
| Sentry incident review                       | Technical reviewer   | Sentry issue stream and release data       | No unresolved high-impact errors without owner                | Unowned or repeated production error spikes                 | Monthly operations issue checklist |
| Dependency and security posture              | Technical reviewer   | Security audit workflows and reports       | No unresolved blocking vulnerabilities                        | Moderate+ production vulnerability unresolved               | Monthly operations issue checklist |
| Documentation drift                          | Release owner        | Docs sync checks and standards indexes     | Docs and implementation remain congruent                      | Failed docs sync or stale canonical references              | Monthly operations issue checklist |

---

## Monitoring & Alerts

### Real-time Monitoring

**Sources:**

- GitHub Actions workflow runs (`CI/CD Pipeline`, `Deploy Pipeline Alerts`)
- Cloudflare Analytics and Observability
- Sentry error tracking
- Application telemetry and server logs

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

1. **GitHub Issues/Workflow Alerts** - Deployment status and pipeline failures
2. **Cloudflare Observability** - Runtime faults and edge anomalies
3. **Sentry Issues** - Client/runtime exception tracking

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
