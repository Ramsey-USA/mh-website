# Monitoring And Budgets (Phase 7.5)

**Category:** Performance - Monitoring And Budgets  
**Last Updated:** July 19, 2026

## Monitoring Contract

- [apps/website/src/components/performance/WebVitalsReporter.tsx](/workspaces/mh-website/apps/website/src/components/performance/WebVitalsReporter.tsx) remains the client collection point for Core Web Vitals.
- Metrics are reported with stable names (`CLS`, `INP`, `FCP`, `LCP`, `TTFB`) and a sanitized `route_template` instead of sensitive full URLs when a dynamic route pattern is detected.
- Duplicate metric ids are suppressed inside the reporter to avoid layout-remount or overlapping-component double reporting.
- No form values, search text, names, email addresses, phone numbers, or user-generated content are attached to Web Vitals payloads.
- [apps/website/src/components/monitoring/SentryInit.tsx](/workspaces/mh-website/apps/website/src/components/monitoring/SentryInit.tsx) continues to initialize Sentry only through the existing environment-gated client init path.

## Current Budgets

These are the current observed baselines and enforced thresholds. They are not aspirational pass lines.

### Deterministic checks

- Public asset total budget: `75 MB`
- Public per-file budget: `8 MB`
- Current public asset total: `41.08 MB`
- Hero-commercial asset exclusion: `0.00 MB` in the current inactive pipeline state

### Observed bundle snapshot

Command: `npm run bundle:report`

Top chunk snapshot:

- `560K  .next/static/chunks/1vfwpdyjsfl8u.js`
- `452K  .next/static/chunks/1ndv5fcqm46zl.js`
- `228K  .next/static/chunks/2qtt0728slkhp.js`
- `144K  .next/static/chunks/33fcxsqeao9jd.js`
- `112K  .next/static/chunks/0cz1d0mv5g_q7.js`
- `72K   .next/static/chunks/3mj6ky0roxd-e.js`
- `72K   .next/static/chunks/24ts_93ahom57.js`
- `72K   .next/static/chunks/1b3ztde72kwxp.js`
- `64K   .next/static/chunks/0q7cvdis4c1m6.js`
- `60K   .next/static/chunks/30gdsbm4lhi_r.js`

### Lighthouse baseline used in this phase

Command: `CHROME_PATH=... npm run lighthouse:home:local`

- Performance: `94`
- Accessibility: `93`
- Best Practices: `92`
- SEO: `100`

### Core Web Vitals thresholds used by WebVitalsReporter

- `LCP`: good `<= 2500`, poor `> 4000`
- `INP`: good `<= 200`, poor `> 500`
- `CLS`: good `<= 0.1`, poor `> 0.25`
- `FCP`: good `<= 1800`, poor `> 3000`
- `TTFB`: good `<= 800`, poor `> 1800`

## CI And Runtime Guidance

- Keep deterministic PR checks on lint, type-check, focused tests, bundle snapshots, asset budgets, and build.
- Keep full Lighthouse runs where they already exist; local variability should not be treated as a deterministic CI budget gate.
- Failure messages should include the route or metric, measured value, threshold, and the remediation document link when a dedicated script is added or expanded in later phases.
