# Cloudflare Workers Deployment Guide

**Category:** Deployment - Cloudflare
**Last Updated:** April 14, 2026
**Version:** 3.2.1
**Status:** ✅ Active - Production Deployed at `https://www.mhc-gc.com`
**Plan:** Cloudflare Pro (activated April 14, 2026)

> **Adapter:** `@opennextjs/cloudflare` (OpenNext) — **NOT** `@cloudflare/next-on-pages`.
> These two adapters are mutually exclusive. Only OpenNext is used in this project.
>
> **Platform:** Cloudflare **Workers** (`mhc-v2-website`) — **NOT** Cloudflare Pages.
> Workers URL: `mhc-v2-website.twelthmann.workers.dev`
> Preview URLs: `*-mhc-v2-website.twelthmann.workers.dev`
>
> **Related:** For external service configuration (Hostinger, Resend, Twilio), see
> [Services Integration Guide](../technical/services-integration-guide.md).

---

## Table of Contents

- [How It Works](#how-it-works)
- [Cloudflare Dashboard Setup — REQUIRED](#cloudflare-dashboard-setup--required)
- [Environment Variables](#environment-variables)
- [Security Notes](#security-notes)
- [Local Development & Manual Deploy](#local-development--manual-deploy)
- [Build Output Explained](#build-output-explained)
- [Custom Domain & DNS](#custom-domain--dns)
- [Cloudflare Dashboard Performance Settings](#cloudflare-dashboard-performance-settings)
- [Troubleshooting](#troubleshooting)
- [Deployment Checklist](#deployment-checklist)

---

## How It Works

```text
git push → Cloudflare Workers CI picks up the commit
         → Runs build command:   npm run build
         → Runs deploy command:  npx wrangler deploy
         → Output: .open-next/worker.js + .open-next/assets deployed as a Worker
```

The `opennextjs-cloudflare build` command (invoked by `npm run build`):

1. Runs `next build` internally
2. Packages the Next.js App Router output into a Cloudflare Worker + static assets
3. Writes everything to `.open-next/`

`wrangler.toml` tells `wrangler deploy` where the Worker entry point and assets are:

```toml
name = "mhc-v2-website"
main = ".open-next/worker.js"

[assets]
directory = ".open-next/assets"
binding = "ASSETS"
```

> **Important:** This is the Workers model — `main` + `[assets]` + `nodejs_compat`.
> It is different from the Pages model (`pages_build_output_dir`).
> Do NOT use `wrangler pages deploy` — that is for Pages projects and will fail with
> this `wrangler.toml` configuration.

---

## Cloudflare Dashboard Build Config

### Workers & Pages → mhc-v2-website → Settings → Builds → Edit

| Field               | Value                          | Notes                                      |
| ------------------- | ------------------------------ | ------------------------------------------ |
| **Build command**   | `npm run build`                | Runs `opennextjs-cloudflare build`         |
| **Deploy command**  | `npx wrangler deploy`          | Deploys Worker; reads `wrangler.toml` auto |
| **Version command** | `npx wrangler versions upload` | Optional — for gradual/versioned rollouts  |
| **Root directory**  | `/`                            | Repo root                                  |

> ⚠️ **`npx wrangler pages deploy .open-next/assets` is WRONG here.** That is the
> Cloudflare Pages command and will not work with the Workers `wrangler.toml` config.
> The correct deploy command is `npx wrangler deploy`.

---

## Cloudflare Dashboard Variables & Secrets

**Cloudflare Dashboard → Workers & Pages → `mhc-v2-website` → Settings → Variables & Secrets**

### Currently Set ✅

| Variable                | Type      | Value                    | Notes                                 |
| ----------------------- | --------- | ------------------------ | ------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`  | Plaintext | `https://www.mhc-gc.com` | Canonical URL                         |
| `CI`                    | Plaintext | `true`                   | Skips husky hooks during builds       |
| `RESEND_API_KEY`        | Secret    | `re_xxxxx`               | Email notifications (contact forms)   |
| `EMAIL_FROM`            | Secret    | `noreply@mhc-gc.com`     | Resend sender address                 |
| `JWT_SECRET`            | Secret    | 48-byte hex string       | Signs admin JWTs                      |
| `ADMIN_MATT_PASSWORD`   | Secret    | strong password          | Admin dashboard login for Matt        |
| `ADMIN_JEREMY_PASSWORD` | Secret    | strong password          | Admin dashboard login for Jeremy      |
| `FIELD_STAFF_PASSWORD`  | Secret    | strong passcode          | Safety Hub superintendent login       |
| `TURNSTILE_SECRET_KEY`  | Secret    | Cloudflare Turnstile key | Verifies public Safety intake uploads |

| `TWILIO_ACCOUNT_SID` | Secret | `AC75affdd6...` | Twilio account SID for SMS notifications |
| `TWILIO_AUTH_TOKEN` | Secret | token string | Twilio auth token for SMS notifications |
| `TWILIO_FROM_NUMBER` | Secret | `+18556839792` | Twilio sender phone number |

> **Resend domain verification:** `mhc-gc.com` must be a verified sender domain in the
> Resend dashboard (SPF + DKIM DNS records required). Without this all contact form emails
> are silently dropped.

### Optional Environment Variables

| Variable                        | Value             | Notes                       |
| ------------------------------- | ----------------- | --------------------------- |
| `CLOUDFLARE_ACCOUNT_ID`         | `your_account_id` | For manual Wrangler deploys |
| `CLOUDFLARE_API_TOKEN`          | `your_api_token`  | For manual Wrangler deploys |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX`    | Google Analytics (optional) |

> **Note:** D1, KV, and R2 resource IDs are configured as bindings in
> `wrangler.toml`, not as dashboard environment variables. Do not add
> `CLOUDFLARE_D1_DATABASE_ID`, `MH_CONSTRUCTION_ANALYTICS`, or
> `MH_CONSTRUCTION_CACHE` here — they have no effect at runtime.

---

## Security Notes

Safety smoke checks run in GitHub Actions and require GitHub repository
secrets, not Cloudflare dashboard secrets.

- Cloudflare secrets secure runtime behavior for the live Worker.
- GitHub secrets secure CI automation that validates production.

For Safety smoke setup and policy details, see:

- [docs/deployment/safety-ci-gate-policy.md](docs/deployment/safety-ci-gate-policy.md)
- [docs/deployment/safety-smoke-setup.md](docs/deployment/safety-smoke-setup.md)

Recommended authenticated smoke strategy is login-based credentials in GitHub:

- `SAFETY_SMOKE_FIELD_PASSCODE`
- `SAFETY_SMOKE_ADMIN_EMAIL`
- `SAFETY_SMOKE_ADMIN_PASSWORD`

Use bearer-token or JWT-signing-secret options only as fallback.

Published Safety PDFs should be delivered through the existing `FILE_ASSETS` R2
binding and `/docs/**` proxy path. Public Safety uploads should use a dedicated
`SAFETY_INTAKE` bucket so unreviewed files stay isolated from published assets.

---

## Environment Variables

### `.env.local` (Local Development)

```bash
cp .env.local.example .env.local
```

Minimum required for local dev:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxx
```

---

## Local Development & Manual Deploy

### Development Server

```bash
npm run dev          # http://localhost:3000
npm run dev:turbo    # Turbopack mode (faster, experimental)
```

### Production Build (Local Test)

```bash
npm run build
# Runs: opennextjs-cloudflare build
# Output: .open-next/assets
```

### Manual Deploy via Wrangler

```bash
# One-time: login to Cloudflare
npx wrangler login

# Build + deploy to Workers
npm run deploy
# Equivalent to: opennextjs-cloudflare build && wrangler deploy
```

---

## Build Output Explained

After `npm run build`, the output structure is:

```text
.open-next/
├── worker.js             ← Cloudflare Worker entry point (deployed via wrangler)
├── assets/               ← Static files served via Workers Assets binding
│   ├── _next/static/     ← CSS, JS, fonts, images
│   └── ...               ← Other static assets
└── cache/                ← Build cache (not deployed)
```

---

## Custom Domain & DNS

Production lives at `https://www.mhc-gc.com` (canonical — with `www`).

- `mhc-gc.com` → 301 redirect to `www.mhc-gc.com` (Cloudflare Page Rule)
- `www.mhc-gc.com` → Cloudflare Workers project (`mhc-v2-website`)

### SSL/TLS

- Mode: **Full (strict)**
- Certificate: Cloudflare-managed, auto-renewed
- HSTS: Enforced via `public/_headers`

---

## Cloudflare Dashboard Performance Settings

These settings are configured in the Cloudflare Dashboard (not in code) and provide
significant free performance gains. All are in the `mhc-gc.com` zone.

### Speed → Optimization → Content Optimization

| Setting          | Value   | Reason                                                    |
| ---------------- | ------- | --------------------------------------------------------- |
| **Early Hints**  | **ON**  | Sends 103 response with Link preload headers (`_headers`) |
| Auto Minify HTML | **OFF** | Next.js already minifies; double-minify can break CSP     |
| Auto Minify JS   | **OFF** | Next.js already minifies                                  |
| Auto Minify CSS  | **OFF** | Next.js already minifies                                  |
| Rocket Loader    | **OFF** | Breaks Next.js hydration                                  |

> **Early Hints** is the highest-impact free setting. When enabled, Cloudflare caches
> the `Link: rel=preload` headers from `public/_headers` and sends them as a 103
> Early Hints response on subsequent requests. This starts font and hero image
> downloads during TLS negotiation — before the HTML arrives.

### Speed → Optimization → Protocol Optimization

| Setting                         | Value  | Reason                                      |
| ------------------------------- | ------ | ------------------------------------------- |
| HTTP/2                          | **ON** | Default for proxied zones                   |
| **HTTP/3 with QUIC**            | **ON** | Better mobile performance on lossy networks |
| **0-RTT Connection Resumption** | **ON** | Returning visitors skip TLS round-trip      |

### Caching → Tiered Cache

| Setting                | Value  | Reason                                                    |
| ---------------------- | ------ | --------------------------------------------------------- |
| **Smart Tiered Cache** | **ON** | Free — reduces origin hits via regional upper-tier caches |

### Rules → Redirect Rules (Future Optimization)

The apex → www redirect (`mhc-gc.com` → `www.mhc-gc.com`) currently runs in
`middleware.ts`. Moving it to a Cloudflare Redirect Rule resolves it at the CDN edge
before the Worker starts, saving ~10-20 ms of Worker CPU per redirect.

To create: Rules → Redirect Rules → Create Rule → Name: `apex-to-www` →
When hostname = `mhc-gc.com` → Redirect to `https://www.mhc-gc.com` + concat path →
Status 301. After verifying the rule works, remove the redirect block from `middleware.ts`.

---

## Cloudflare Pro Configuration (Activated April 14, 2026)

The Pro plan ($20/month) unlocks significant performance and security features beyond
the free tier. All settings below are configured in the Cloudflare Dashboard for the
`mhc-gc.com` zone.

### Speed → Optimization → Image Optimization (Pro)

| Setting    | Value     | Impact                                                   |
| ---------- | --------- | -------------------------------------------------------- |
| **Polish** | **Lossy** | Auto-compress JPG/PNG/GIF at edge; 30-50% file reduction |
| **Mirage** | **ON**    | Lazy-load images + serve responsive sizes on mobile/slow |

> **Polish modes:**
>
> - `Lossless`: Strips metadata, no quality loss
> - `Lossy`: Additional compression with imperceptible quality loss (recommended)
> - `WebP`: Convert supported images to WebP format (best compression)
>
> For a construction company with hero photos and project galleries, **Lossy** provides
> the best balance of quality and performance.

**How Mirage works:**

1. Detects visitor's network speed and screen size
2. Lazy-loads below-the-fold images
3. Serves appropriately-sized images to mobile devices
4. Streams placeholder → full image for perceived performance

### Speed → Optimization → Image Resizing (Pro)

| Setting            | Value  | Impact                                 |
| ------------------ | ------ | -------------------------------------- |
| **Image Resizing** | **ON** | Enables on-demand image transformation |

Once enabled, use the `cdn-cgi/image/` URL format for responsive images:

```text
https://www.mhc-gc.com/cdn-cgi/image/width=800,quality=85,format=auto/images/hero.jpg
```

**Recommended parameters:**

- `width=800` — resize to 800px wide
- `quality=85` — balance compression and quality
- `format=auto` — serve WebP/AVIF when browser supports it
- `fit=cover` — maintain aspect ratio, crop if needed

### Rules → Redirect Rules (Pro: 50 vs Free: 3)

Create these redirect rules to move logic from Workers to the edge:

| Priority | Rule Name     | When                         | Then                                                                  | Status |
| -------- | ------------- | ---------------------------- | --------------------------------------------------------------------- | ------ |
| 1        | `apex-to-www` | hostname equals `mhc-gc.com` | Redirect to `concat("https://www.mhc-gc.com", http.request.uri.path)` | 301    |

**To create the apex-to-www rule:**

1. Dashboard → Rules → Redirect Rules → Create Rule
2. Rule name: `apex-to-www`
3. Field: `Hostname`, Operator: `equals`, Value: `mhc-gc.com`
4. Type: `Dynamic`, Expression: `concat("https://www.mhc-gc.com", http.request.uri.path)`
5. Status code: `301`
6. Deploy and verify `curl -I http://mhc-gc.com` returns 301
7. Remove redirect block from `middleware.ts` (see code change below)

### Security → WAF → Custom Rules (Pro: 5 rules)

| Rule Name          | Expression                                                                                                                                   | Action             |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `block-empty-ua`   | `(http.request.uri.path contains "/api/") and (len(http.user_agent) eq 0)`                                                                   | Block              |
| `rate-limit-forms` | `(http.request.method eq "POST") and (http.request.uri.path contains "/api/contact" or http.request.uri.path contains "/api/consultations")` | Rate limit: 10/min |
| `block-bad-bots`   | `(cf.client.bot) and not (cf.bot_management.verified_bot)`                                                                                   | Managed Challenge  |

**To create the block-empty-ua rule:**

1. Dashboard → Security → WAF → Custom rules → Create rule
2. Rule name: `block-empty-ua`
3. Expression: `(http.request.uri.path contains "/api/") and (len(http.user_agent) eq 0)`
4. Action: Block
5. Deploy

### Caching → Cache Analytics (Pro)

Pro unlocks detailed cache analytics:

- **Cache hit ratio** — target >90% for static assets
- **Bandwidth savings** — measure CDN offload
- **Request breakdown** — by cache status (HIT/MISS/EXPIRED/DYNAMIC)
- **Top cached URLs** — identify optimization opportunities

Monitor weekly in Dashboard → Analytics → Cache.

### Speed → Optimization → Mobile Redirect (Pro)

| Setting             | Value   | Reason                                        |
| ------------------- | ------- | --------------------------------------------- |
| **Mobile Redirect** | **OFF** | Site uses responsive design; no separate `m.` |

### Pro Plan — Feature Summary

| Feature                    | Free Tier      | Pro Tier                | Status    |
| -------------------------- | -------------- | ----------------------- | --------- |
| Polish (image compression) | ❌             | ✅ Lossless/Lossy/WebP  | Configure |
| Mirage (mobile images)     | ❌             | ✅                      | Configure |
| Image Resizing             | ❌             | ✅ cdn-cgi/image URLs   | Configure |
| Redirect Rules             | 3 rules        | 50 rules                | Configure |
| WAF Custom Rules           | 1 rule         | 5 rules                 | Configure |
| Cache Analytics            | Basic          | Advanced                | Available |
| Always Online              | 5% of requests | Unlimited               | Default   |
| Argo Smart Routing         | ❌             | Add-on ($5/mo + per-GB) | Optional  |

### Pro Activation Checklist

- [ ] **Polish:** Speed → Optimization → Image Optimization → Polish = Lossy
- [ ] **Mirage:** Speed → Optimization → Image Optimization → Mirage = ON
- [ ] **Image Resizing:** Speed → Optimization → Image Resizing = ON
- [ ] **Redirect Rule:** Rules → Redirect Rules → Create `apex-to-www`
- [ ] **WAF Rule 1:** Security → WAF → Create `block-empty-ua`
- [ ] **WAF Rule 2:** Security → WAF → Create `rate-limit-forms` (optional)
- [ ] **Remove middleware redirect:** Update `middleware.ts` after redirect rule works
- [ ] **Verify Cache Analytics:** Analytics → Cache shows data

---

## Troubleshooting

### ❌ "No build command specified. Skipping build step." / "Output directory not found"

**Cause:** Running `wrangler deploy` without building first.

**Fix:** Always use `npm run deploy` (which runs `opennextjs-cloudflare build && wrangler deploy`),
or run `npm run build` before `npx wrangler deploy` manually.

---

### ❌ Husky / prepare script fails during build

**Cause:** `npm install` triggers the `prepare` script which tries to run husky hooks.

**Fix:** Add `CI=true` (or `HUSKY=0`) to Environment Variables in the Cloudflare dashboard.

---

### ❌ Build fails with `@cloudflare/next-on-pages` errors

**Cause:** Two conflicting adapters running. `@cloudflare/next-on-pages` requires
`export const runtime = "edge"` on all dynamic routes and conflicts with OpenNext.

**Fix:** Build command must be `npm run build` only — do **not** append
`npx @cloudflare/next-on-pages` as a second step.

---

### ❌ API routes return 500 / Worker errors

1. Cloudflare Dashboard → Workers & Pages → `mhc-v2-website` → Logs
2. Check for missing environment variables or D1 binding issues

---

### ❌ D1 database queries fail

Verify `wrangler.toml` has the correct binding:

```toml
[[d1_databases]]
binding = "DB"
database_name = "mh-construction-db"
database_id = "98ad144a-cfe2-4f19-a55c-c43140279840"
```

Local dev with D1:

```bash
npx wrangler d1 execute mh-construction-db --local --file=migrations/0001_create_consultations.sql
```

---

## Deployment Checklist

### First-Time Setup

- [ ] Create Workers project `mhc-v2-website` in the Cloudflare Dashboard (Workers & Pages → Create)
- [ ] Run `npx wrangler login` and verify account access
- [ ] Add `JWT_SECRET` (generate: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`)
- [ ] Add `ADMIN_MATT_PASSWORD` and `ADMIN_JEREMY_PASSWORD` via `wrangler secret put` or dashboard
- [ ] Add `RESEND_API_KEY`, `EMAIL_FROM=noreply@mhc-gc.com`
- [ ] Set `NEXT_PUBLIC_SITE_URL=https://www.mhc-gc.com` and `NEXT_TELEMETRY_DISABLED=1` in dashboard
- [ ] Bind D1 database (`DB` → `mh-construction-db`) in dashboard
- [ ] Create R2 buckets: `mh-construction-assets`, `mh-construction-safety-intake`, and `mh-construction-resumes`
- [ ] Bind R2 buckets (`FILE_ASSETS` → `mh-construction-assets`, `SAFETY_INTAKE` → `mh-construction-safety-intake`, `RESUMES` → `mh-construction-resumes`) in dashboard
- [ ] Bind KV namespaces: `CACHE` (rate limiting), `ANALYTICS` (server-side analytics), `NEXT_CACHE_WORKERS_KV` (ISR caching)
- [ ] Connect custom domain `www.mhc-gc.com` under Workers & Pages → mhc-v2-website → Custom Domains
- [ ] Verify SSL certificate is active (**Full strict** — not Flexible)
- [ ] Enable **Always Use HTTPS** (Security → Settings)
- [ ] Add Cloudflare Redirect Rule: hostname = `mhc-gc.com` → 301 to `https://www.mhc-gc.com` + concat path
- [ ] **Disable Rocket Loader** (Speed → Optimization → Rocket Loader = OFF) — breaks Next.js hydration
- [ ] **Disable HTML Minify** (Speed → Optimization → Auto Minify → HTML = OFF) — can break CSP
- [ ] **Enable Early Hints** (Speed → Optimization → Content Optimization → Early Hints = ON)
- [ ] **Enable HTTP/3 with QUIC** (Speed → Optimization → Protocol Optimization → HTTP/3 = ON)
- [ ] **Enable 0-RTT** (Speed → Optimization → Protocol Optimization → 0-RTT = ON)
- [ ] **Enable Smart Tiered Cache** (Caching → Tiered Cache → Smart Tiered Cache = ON)
- [ ] Verify no Cloudflare Cache Rules are caching HTML pages (HTML must not be CDN-cached)
- [ ] Apply D1 migrations (see D1 Migrations section below)
- [ ] Verify Resend domain: add SPF + DKIM DNS records for `mhc-gc.com` in Resend dashboard

> **Note:** Deployment is handled entirely by Cloudflare Workers auto-deploy.
> GitHub Actions (`.github/workflows/ci-cd.yml`) runs quality checks, tests, and
> a build verification as a safety gate — it does **not** run `wrangler pages deploy`.
> No `CLOUDFLARE_API_TOKEN` or `CLOUDFLARE_ACCOUNT_ID` GitHub secrets are required
> unless you need manual `wrangler` deploys from a local machine.

### Every Deploy (Automatic via Git Push)

- [ ] Push to `main` branch
- [ ] GitHub Actions CI gate runs: type-check, lint, format, **76 tests**, build
- [ ] Cloudflare Workers auto-deploys from `main` (independently of CI)
- [ ] Monitor build in Cloudflare Dashboard → Deployments
- [ ] Build should complete in ~30–45 seconds
- [ ] Verify `https://www.mhc-gc.com` is live

### Before Pushing

```bash
npm run type-check   # zero type errors
npm run lint         # zero lint warnings/errors
npm test             # all tests passing
npm run build        # local build succeeds
```

---

## See Also

- [Services Integration Guide](../technical/services-integration-guide.md) — Cloudflare, Hostinger, Resend, Twilio configuration
- [Secrets Management](../technical/secrets-management.md) — API key rotation and security policies
- [Edge Optimization](../../config/cloudflare/edge-optimization.md) — Cache rules and performance settings
