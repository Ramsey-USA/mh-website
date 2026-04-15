# Safety Smoke Setup Guide

Last Updated: April 8, 2026
Owner: Engineering

## Purpose

This guide explains how to configure and verify authenticated Safety smoke checks
in GitHub Actions.

## Prerequisites

1. You can access GitHub repository settings.

2. You have valid current credentials for:

- `FIELD_STAFF_PASSWORD` (for superintendent login)
- one admin account (`matt@mhc-gc.com` or `jeremy@mhc-gc.com`)

## Configure GitHub Secrets

In GitHub:

1. Open the repository.
2. Go to Settings.
3. Go to Secrets and variables.
4. Open Actions.
5. Add repository secrets:

- `SAFETY_SMOKE_FIELD_PASSCODE`
- `SAFETY_SMOKE_ADMIN_EMAIL`
- `SAFETY_SMOKE_ADMIN_PASSWORD`

Optional fallback secrets (only if required):

1. `SAFETY_SMOKE_USER_BEARER_TOKEN`
2. `SAFETY_SMOKE_ADMIN_BEARER_TOKEN`
3. `SAFETY_SMOKE_JWT_SECRET`

## Run First Authenticated Smoke Test

1. Open Actions.
2. Select Safety Smoke Tests.
3. Click Run workflow.
4. Set inputs:

- `run_authenticated_checks`: `true`
- `strict_public_200`: `false` (until CI traffic is edge-allowlisted)
- `base_url`: keep default unless testing non-production target

1. Start run.

Note:

- On main-branch `workflow_run` executions, authenticated smoke checks run
  automatically and are required.
- On manual dispatch, set `run_authenticated_checks=true` to enable them.

## Verify Success Criteria

In workflow logs, confirm:

1. `Authenticated smoke checks enabled.` is printed.

1. Superintendent auth probes pass:

- forms and jobs GET checks
- role guard check returns expected deny result for job creation

1. Admin auth probes pass:

- downloads GET check
- jobs POST validation-layer check

1. Summary ends with `0 failed`.

## Troubleshooting

1. `Authenticated checks were required but no auth source was available.`

- One or more required secrets were missing.
- On automatic `workflow_run` runs, add the recommended login secrets in
  GitHub Actions secrets so authenticated checks can execute.

1. `Field login failed with status 401`

- `SAFETY_SMOKE_FIELD_PASSCODE` does not match runtime field passcode.

1. `Admin login failed with status 401`

- `SAFETY_SMOKE_ADMIN_EMAIL` or `SAFETY_SMOKE_ADMIN_PASSWORD` is incorrect.

1. Readiness timeout before tests start

- Deployment not live yet or edge protection blocked expected readiness statuses.

1. Public pages fail in strict mode

- Keep `strict_public_200=false` until CI source is allowlisted at edge.

## Rotation Guidance

1. Rotate smoke secrets whenever admin or field passwords are rotated.
2. Re-run Safety Smoke Tests immediately after rotation.
3. Do not store passwords in source control or documentation files.

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
