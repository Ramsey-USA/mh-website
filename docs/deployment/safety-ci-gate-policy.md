# Safety CI Gate Policy

Last Updated: April 8, 2026
Owner: Engineering
Applies To: all pull requests into main and all pushes to main/develop

## Purpose

This policy ensures that Safety System code cannot reach production unless it
passes strict quality, security, and build verification gates.

## Required Gate Order

1. TypeScript validation
2. ESLint validation
3. Prettier format check
4. Test suite with CI settings
5. Security audit (fail on high/critical vulnerabilities)
6. Production build verification

## Required Commands

Run locally before creating a PR:

```bash
npm ci
npm run ci:gate
```

Equivalent command-by-command gate run:

```bash
npm run type-check
npm run lint
npm run format:check
npm run test:ci
npm run audit:ci
npm run build
```

## Security Rules

- Security audit command must be `npm audit --omit=dev --audit-level=high`.
- Any high or critical vulnerability blocks merge.
- If `npm audit fix` cannot remediate a vulnerability, add a documented override or dependency upgrade in the same PR.

## Safety System Minimum Verification Checklist

Use this checklist for Safety feature changes before merge and after deployment.

1. Confirm the following routes build successfully and are present in build output:

- `/safety`
- `/safety/hub`
- `/resources/safety-manual`
- `/resources/safety-manual/section/[slug]`
- `/api/safety/forms`
- `/api/safety/forms/[id]`
- `/api/safety/jobs`
- `/api/safety/jobs/[id]`
- `/api/safety/downloads`

1. Confirm auth behavior for Safety APIs:

- Unauthorized requests are rejected (401/403 where applicable).
- Authorized requests are accepted.
- Object-level access checks are enforced for `[id]` endpoints.

1. Confirm data and file safety controls:

- Request payload validation is active.
- Request size limits are enforced.
- File/document downloads are logged.

1. Confirm observability:

- Audit events are written for safety form/job create and update operations.
- Error logs include endpoint, status code, and request context without leaking
  secrets.

1. Confirm deployment health:

- Build has no unresolved warnings related to required runtime env vars.
- Cloudflare deploy completes with expected bindings for DB, KV, and R2.

## CI Workflow Mapping

This repository enforces gates through:

- `.github/workflows/ci-cd.yml`
- `.github/workflows/code-quality.yml`
- `.github/workflows/safety-smoke.yml`

Both workflows must keep high-severity audit failures as blocking errors.

Post-deploy smoke checks run automatically against production after successful
main-branch CI and can be run manually with workflow dispatch.

Automatic `workflow_run` execution now includes:

- baseline smoke checks (public and protected-edge status expectations)
- authenticated smoke checks (required when auth secrets are configured)

Setup and first-run instructions are in:

- `docs/deployment/safety-smoke-setup.md`

Local smoke run command:

```bash
npm run smoke:safety
```

Optional strict public-page mode (for environments where CI is allowlisted at
the edge and public pages should return 200/3xx):

```bash
SAFETY_SMOKE_STRICT_PUBLIC_200=true npm run smoke:safety
```

Optional authenticated API checks can be enabled with one of the following,
listed in preferred order:

1. Login credentials (recommended, no JWT signing secret in GitHub):

- `SAFETY_SMOKE_FIELD_PASSCODE`
- `SAFETY_SMOKE_ADMIN_EMAIL`
- `SAFETY_SMOKE_ADMIN_PASSWORD`

1. Pre-minted bearer tokens:

- `SAFETY_SMOKE_USER_BEARER_TOKEN`
- `SAFETY_SMOKE_ADMIN_BEARER_TOKEN`

1. JWT signing secret fallback (least preferred):

- `SAFETY_SMOKE_JWT_SECRET`

Example local run (recommended approach):

```bash
SAFETY_SMOKE_FIELD_PASSCODE=your_field_passcode \
SAFETY_SMOKE_ADMIN_EMAIL=your_admin_email \
SAFETY_SMOKE_ADMIN_PASSWORD=your_admin_password \
npm run smoke:safety
```

Fallback local run:

```bash
SAFETY_SMOKE_JWT_SECRET=your_jwt_secret npm run smoke:safety
```

## Escalation Path

If a gate fails in CI:

1. Stop deployment.
2. Fix root cause in branch.
3. Re-run full gate (`npm run ci:gate`).
4. Merge only after all gates pass.

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
