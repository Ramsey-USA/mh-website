# Cloudflare Verification Runbook

**Category:** Deployment - Cloudflare Verification  
**Last Updated:** July 16, 2026  
**Scope:** Confirm production Cloudflare connection and optimization status for `mhc-v2-website`

## Purpose

Use this runbook to verify whether the production Cloudflare setup is fully connected and optimized.
Each check is binary (`PASS` or `FAIL`) and includes evidence to capture.

## Current Snapshot (From Repo + Live Header Probe)

| Area                                       | Status | Evidence                                                                                                                                     |
| ------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Worker project configured                  | PASS   | `apps/website/wrangler.toml` contains `name = "mhc-v2-website"` and `main = "worker-entry.ts"`                                               |
| Domain routes configured                   | PASS   | `apps/website/wrangler.toml` contains `mhc-gc.com` and `www.mhc-gc.com` route blocks                                                         |
| CI deploy on main push                     | PASS   | `.github/workflows/ci-cd.yml` deploy job runs `npm run deploy` on `main` push                                                                |
| Latest verified production deployment      | PASS   | GitHub Actions run `29464674443` (commit `ef99737f8d5937eaf9416f6e10dd2a4a91fdbf15`) completed with `Deploy to Cloudflare Workers` = success |
| Core bindings configured (KV/R2/D1/AI)     | PASS   | `apps/website/wrangler.toml` includes `[[kv_namespaces]]`, `[[r2_buckets]]`, `[[d1_databases]]`, and `[ai]`                                  |
| Observability enabled                      | PASS   | `apps/website/wrangler.toml` has `[observability] enabled = true`                                                                            |
| Pro optimization checklist fully validated | FAIL   | Dashboard-only items remain checklist tasks in `config/cloudflare/edge-optimization.md`                                                      |

## Prerequisites

1. Cloudflare account access with permissions for Workers, Zone settings, and WAF.
2. Access to project `mhc-v2-website` in Workers & Pages.
3. Access to zone `mhc-gc.com`.

## Verification Steps

### 1) Confirm Traffic Is On Cloudflare Edge

Run:

```bash
curl -sSI https://www.mhc-gc.com | sed -n '1,40p'
```

Mark:

- `PASS` if response headers include `server: cloudflare` and `cf-ray`.
- `FAIL` if those headers are absent.

Notes:

- A Cloudflare challenge (`403` with `cf-mitigated: challenge`) still confirms edge connectivity.

### 2) Confirm Worker Routes and Custom Domains

Cloudflare dashboard path:

`Workers & Pages -> mhc-v2-website -> Settings -> Domains & Routes`

Mark:

- `PASS` if both `mhc-gc.com` and `www.mhc-gc.com` are attached to `mhc-v2-website`.
- `FAIL` if either route is missing or mapped to another Worker.

### 3) Confirm Runtime Bindings Are Present in Production

Cloudflare dashboard path:

`Workers & Pages -> mhc-v2-website -> Settings -> Bindings`

Required bindings:

- `AI`
- `CACHE`
- `NEXT_CACHE_WORKERS_KV`
- `ANALYTICS`
- `FILE_ASSETS`
- `SAFETY_INTAKE`
- `RESUMES`
- `DB`
- `ASSETS`

Mark:

- `PASS` if all required bindings are present.
- `FAIL` if any binding is missing or named differently.

### 4) Confirm Secrets and Vars

Cloudflare dashboard path:

`Workers & Pages -> mhc-v2-website -> Settings -> Variables & Secrets`

Minimum production secrets:

- `JWT_SECRET`
- `ADMIN_MATT_PASSWORD`
- `ADMIN_JEREMY_PASSWORD`
- `FIELD_STAFF_PASSWORD`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_FROM_NUMBER`
- `N8N_WEBHOOK_URL`
- `TURNSTILE_SECRET_KEY`
- `SENTRY_DSN`
- `NEXT_PUBLIC_SENTRY_DSN`

Mark:

- `PASS` if all listed values exist in production environment.
- `FAIL` if any are missing.

### 5) Confirm Cloudflare Pro Performance Settings

Cloudflare dashboard paths:

- `Speed -> Optimization`
- `Caching -> Tiered Cache`
- `Rules -> Redirect Rules`
- `Security -> WAF`

Required settings:

- `Early Hints = ON`
- `Auto Minify (HTML/JS/CSS) = OFF`
- `Rocket Loader = OFF`
- `HTTP/3 with QUIC = ON`
- `0-RTT Connection Resumption = ON`
- `Smart Tiered Cache = ON`
- `Polish = Lossy`
- `Mirage = ON`
- `Image Resizing = ON`
- Redirect rule `apex-to-www` enabled
- WAF rule `block-empty-ua` enabled

Mark:

- `PASS` only if every setting above is enabled as listed.
- `FAIL` if any setting is missing, disabled, or not matching.

### 6) Confirm Cache Policy Behavior

Run:

```bash
curl -sSI https://www.mhc-gc.com/ | grep -i 'cache-control\|cf-cache-status\|age'
curl -sSI https://www.mhc-gc.com/sw.js | grep -i 'cache-control'
```

Mark:

- `PASS` if homepage caching aligns with edge-cache strategy and `sw.js` is `no-cache/no-store`.
- `FAIL` if headers conflict with `apps/website/next.config.js` and `apps/website/public/_headers`.

### 7) Confirm Observability Capture

Cloudflare dashboard path:

`Workers & Pages -> mhc-v2-website -> Observability`

Mark:

- `PASS` if logs and traces are enabled and recent invocations are visible.
- `FAIL` if observability data is absent for fresh requests.

## Final Decision Rule

- **Fully connected:** Steps 1 through 4 are all `PASS`.
- **Fully optimized:** Steps 1 through 7 are all `PASS`.

If any step fails, status is **not fully optimized**.

## Re-Verification Triggers

Run this checklist again after any of the following:

1. Changes to `apps/website/wrangler.toml`.
2. Changes to deploy workflow in `.github/workflows/ci-cd.yml`.
3. Changes to caching in `apps/website/next.config.js` or `apps/website/public/_headers`.
4. Any Cloudflare plan or dashboard rule changes.
