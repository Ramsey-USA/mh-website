# Changelog

All notable changes to the MH Construction website are documented here.

---

## January 2025

- **Jan:** Navigation icon standardization — created centralized `/src/lib/constants/navigation-icons.ts`
  with `PAGE_ICONS` and `SEMANTIC_ICONS` maps for consistent icon usage across all page links;
  standardized Footer.tsx and Navigation.tsx to use matching icons for same pages (e.g., `contact_phone`
  for Contact, `build` for Services, `military_tech` for About); fixed Allies page icon divergence
  (Navigation used `handshake`, Footer used `construction` → both now use `group` for page links);
  updated `docs/technical/design-system/icon-system-complete.md` with new "Standardized Page Icons"
  table, source-of-truth reference, and usage examples

---

## April 2026

- **Apr 29:** Dependency upgrades to v7.1.0 — updated 22 packages across all risk tiers;
  safe minor/patch updates: `@react-email/render` 2.0.7→2.0.8, `@sentry/browser` 10.49.0→10.50.0,
  `next-intl` 4.9.1→4.11.0, `markdownlint-cli2` 0.21.0→0.22.1, `wrangler` 4.83.0→4.86.0,
  `puppeteer` 24.41.0→24.42.0, `@commitlint/cli` 20.5.0→20.5.2, `@napi-rs/canvas` 0.1.99→0.1.100,
  `@opennextjs/cloudflare` 1.19.1→1.19.4, `resend` 6.12.0→6.12.2, `pdfjs-dist` 5.6.205→5.7.284;
  major upgrades: Next.js 15.5.15→16.2.4, TypeScript 5.9.3→6.0.3, Tailwind CSS 3.4.19→4.2.4,
  ESLint 9.39.4→10.2.1, jose 5.10.0→6.2.3, cross-env 7.0.3→10.1.0; all tests pass, MH branding
  standards maintained, security audit clean; baseline captured in
  `docs/project/dependency-baseline-20260429.txt`, updated snapshot in
  `docs/project/dependency-updated-20260429.txt`

- **Apr 24:** Licensing alignment and regression coverage hardening — standardized Oregon
  license references to `194331` across canonical source/docs/templates; preserved existing
  Washington (`MHCONCI907R7`) and Idaho (`RCE-49250`) values; added focused footer link
  integrity tests for WA/OR/ID verification URLs and security attributes (`target`/`rel`);
  updated Jest image mocks to avoid forwarding Next.js-only props (`fill`, `priority`) onto
  native `<img>` elements to remove non-boolean DOM warnings during tests

- **Apr 22:** Safety PDF governance and artifact congruence hardening — created dedicated
  safety PDF editing agent (`.github/agents/safety-pdf-editor.agent.md`) for source-first PDF
  changes (templates/scripts only), regeneration, metadata validation, and congruence checks;
  updated Manual Structure Officer (`.github/agents/manual-structure-officer.agent.md`) to
  require generated-PDF QA (page box, typography, WBS sequence, and artifact metadata checks)
  and to report explicit PASS/FAIL findings for regenerated artifacts; synchronized
  `safety-manual-cover.pdf`, `safety-manual-spine.pdf`, and `safety-manual-digital.pdf`
  from the same generation pass; standardized Safety Manual title metadata conventions to
  `MH Construction Safety Manual — Cover|Spine|Digital`; aligned PDF author/creator metadata
  in generation + merge pipeline to `Author: Matt Ramsey, Editor-in-Chief` and
  `Creator: MH Construction Document Pipeline`; added direct quick-access support for
  `safety-manual-contents.pdf` and `safety-manual-reference.pdf` in resource metadata/UI.

- **Apr 17:** First successful Lighthouse CI run — 19/22 pages audited at `https://www.mhc-gc.com`
  using `scripts/test-lighthouse.js`; average scores across successful pages: **Performance 95 ·
  Accessibility 96 · Best Practices 78 · SEO 100** (overall avg 92); 3 failures: `/team`
  (PROTOCOL_TIMEOUT — retest needed), `/contact` (503 intermittent under load), `/allies` (300s
  timeout — render-blocking path to investigate); `/careers` performance flagged at **70** —
  post-fix regression may be transient, retest recommended; Best Practices stuck at **77** on
  most pages due to missing CSP (enforcement mode), HSTS, and COOP headers (`informative` audits in
  Lighthouse 13 — does not block binary pass/fail); `/faq` standout at **96** Best Practices;
  scores and open items recorded in `docs/performance/page-performance-audit.md` and
  `lighthouse-results/manual-baseline/summary.json`

- **Apr 14:** Cloudflare Pro plan activated — upgraded from Free tier to Pro for enhanced
  performance, security features, and increased limits

- **Apr 9:** Safety Program system implementation — canonical naming: renamed from "MISH/AISH"
  to **"MH Construction Safety Program"** across all public pages, download keys, and docs; added
  dedicated **`SAFETY_INTAKE` Cloudflare R2 bucket** (`mh-construction-safety-intake`) declared
  in `wrangler.toml`; extended `getR2Bucket()` type union; new reusable **Cloudflare Turnstile
  verifier** (`src/lib/security/turnstile.ts`) with development-safe skip; new public **Safety
  intake API** (`POST /api/safety/intake`) — Turnstile-gated, rate-limited (3 req/60s),
  multipart upload to `SAFETY_INTAKE` R2, D1 metadata write; new **admin review endpoints**
  (`GET/PATCH /api/safety/intake/[id]` + `GET /api/safety/intake/[id]/file`) — all
  `requireRole(["admin"])` gated, file proxy streams from R2 without exposing raw object URLs;
  new public **Safety intake UI page** (`/safety/intake`) with Turnstile widget, file upload,
  category select, and success state; D1 migration `0012_create_safety_intake_submissions.sql`;
  `MAX_SAFETY_INTAKE_SIZE` constant (25 MB); new `docs:publish:safety` npm script and
  `scripts/r2-publish-safety-pdfs.sh` to upload generated PDFs to `FILE_ASSETS` R2 under
  `docs/safety/`; new combined `docs:release` npm script (`docs:all` + `docs:publish:safety`);
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` added to `.env.local.example`;
  `docs/technical/safety-program-guide.md` expanded with canonical naming, standards alignment
  table, Cloudflare storage model, and required deliverables; `docs/deployment/cloudflare-guide.md`
  updated with Turnstile secret entry and `SAFETY_INTAKE` bucket checklist item; fixed preexisting
  `isJobApplication` unused-variable error in `src/app/api/contact/route.ts`; fixed preexisting
  duplicate `fs` import in `documents/scripts/generate.mjs`; fixed preexisting `curly` lint
  error in `src/components/safety/SectionBrowser.tsx`; type-check and lint now clean (0 errors)

- **Apr 8:** Performance evidence hardening and documentation normalization — hardened
  `scripts/test-lighthouse.js` and `scripts/test-lighthouse-quick.js` to treat runtime errors
  and missing category scores as failed audits, emit non-zero exit codes on failed pages, and
  write structured summary metadata (`generatedAt`, `successfulAudits`, `failedAudits`) to
  `lighthouse-results/summary.json`; updated `scripts/lighthouse-guide.js` to remove stale VS
  Code extension guidance and direct teams to authoritative audits via PageSpeed Insights /
  Chrome DevTools; normalized first-party docs (README, project/technical/branding/pwa/seo
  guides, scripts guide, Cloudflare edge optimization docs, and SEO quick reference) to replace
  hardcoded Lighthouse/SEO score claims with external-validation wording and explicit
  historical/baseline labels where numeric values are retained

- **Apr 8:** Documentation audit — corrected `docs/technical/dark-mode-implementation-guide.md`
  file path (`ThemeContext.tsx` → `theme-context.tsx`); updated
  `docs/technical/admin-password-security.md` to reflect demo account removed, production auth
  uses `ADMIN_EMAILS` dict with constant-time HMAC comparison, and priority changed from CRITICAL
  to informational; added `/resources`, `/resources/safety-manual`, and `/resources/safety-program`
  pages to `docs/project/architecture.md` and `docs/technical/browser-tab-titles-inventory.md`;
  updated stale `Last Updated` headers in `docs/technical/analytics-tracking-guide.md`; fixed
  failing sitemap test (`getMediaPriority returns 0.7 for all known important keywords`) — inlined
  the keyword array in the jest mock factory to eliminate a closure/hoisting ambiguity; bumped
  Next.js version reference in README (15.5.12 → 15.5.14); updated README project status date to
  April 8, 2026

---

## March 2026

- **Mar 28:** Test coverage campaign (phase 2) — added 26 new tests across 4 new/updated suites,
  bringing totals to **77 suites / 840 tests** (was 75/820); branch coverage improved from 79.07%
  → **80.19%**; new suites: `src/components/ui/forms/__tests__/Input.test.tsx` (7 tests — covers
  `error`/`helperText` branch pairs for both `Input` and `Textarea`),
  `src/components/icons/__tests__/MaterialIcon.test.tsx` (4 tests — covers `primaryColor`
  `colorStyle` truthy/falsy branches including `hasColorClass` and non-default theme paths);
  updated `AdminSignInModal.test.tsx` (+3 tests — covers `response.ok=false` else branch,
  `data.error || "Invalid credentials"` fallback, and fetch `catch` block);
  updated `audit-logger.test.ts` (+6 tests — covers `&&` spread conditional branches for
  `userAgent`/`sessionId`/`resource`/`action`, the `outcome || "success"` default, and
  `logAuthEvent`/`logSecurityViolation` optional-arg presence/absence paths); zero failures

- **Mar 26:** Build hygiene — removed stray `ReactDOM.preload()` call from `veterans/page.tsx`
  (preloading `mh-veteran-bg.webp` at the RSC layer caused the browser to inject a `<link
rel="preload">` into every page that prefetched `/veterans` via `<Link>`, resulting in
  repeated "preloaded but not used" console warnings on the home page); added `remote = true`
  to `[ai]` binding in `wrangler.toml` (suppresses wrangler dev charge warning); bumped
  `wrangler` devDep `^4.73.0 → ^4.77.0`; added `picomatch>=4.0.4` and `yaml>=2.8.3` overrides
  to fix 3 newly-released CVEs; bumped `flatted` override to `>=3.4.2` (3.4.2 now released —
  prototype pollution fix fully effective); audit now reports 3 vulnerabilities (0 critical,
  2 high devDep-only, 1 moderate production)

- **Mar 26:** Partnership Guide chatbot — brand-compliant AI assistant powered by Cloudflare
  Workers AI (`@cf/meta/llama-3.1-8b-instruct`) added to all pages via `ChatWidget` in root
  layout; system prompt (`src/lib/chatbot/knowledge-base.ts`) encodes all 9 Allies with full
  contact details, services overview, veteran benefits, FAQ highlights, and MH brand language
  rules (forbidden phrases, approved terminology, no fabrication, no cost estimates);
  `POST /api/chat` endpoint — input sanitized, rate-limited to 10 req/min/IP, gracefully falls
  back to keyword-based responses when Workers AI binding is absent (local dev / quota); widget
  is fully responsive — floating button on desktop, fullscreen drawer on mobile with iOS
  safe-area padding; SEO/GEO integration: `contactPoint` for the AI assistant added to
  Organization schema in root layout, chatbot Q&A added to FAQ page structured data,
  `public/llms.txt` updated to describe the Partnership Guide, `public/robots.txt` disallows
  `/api/chat` to scrapers; 19 new tests added (10 UI, 9 knowledge-base); all quality checks
  pass: 95/95 tests, zero TypeScript errors, zero ESLint warnings

- **Mar 26:** Cloudflare edge optimizations — added Early Hints `Link: rel=preload` headers
  to `public/_headers` for Material Icons font and hero image (Cloudflare sends these as 103
  responses before HTML, starting downloads during TLS negotiation); added HSTS header
  (`max-age=63072000; includeSubDomains; preload`) to `_headers` for defence-in-depth alongside
  `security-manager.ts`; cleaned up `middleware.ts` — removed dead response headers (`X-Real-IP`,
  `X-Forwarded-Country`, `Accept-CH`, `X-CSP-Nonce`) and unused nonce generator that added CPU
  overhead to every request without being consumed; documented Cloudflare Dashboard performance
  settings in `wrangler.toml` and deployment guide v3.1.0 (Early Hints ON, HTTP/3 with QUIC ON,
  0-RTT Connection Resumption ON, Smart Tiered Cache ON); added Redirect Rule upgrade path for
  apex→www redirect (currently in middleware, can move to CDN-level rule for ~10-20 ms savings);
  future upgrade potentials documented: Cloudflare Images (on-demand AVIF/WebP, ~$5/mo),
  Email Routing (replace Resend for simple form emails, ~$100/yr savings), Bot Management
  (~$20/mo), Analytics Engine binding

- **Mar 26:** Analytics Cloudflare KV pipeline — analytics events now flow from client to server
  via a beacon system (`navigator.sendBeacon` with `fetch(keepalive)` fallback) → `POST /api/analytics/collect`
  → Cloudflare KV aggregation; previously the admin dashboard only showed the admin's own
  browser data from localStorage; now it reads cross-visitor metrics from KV (`kv-store.ts` →
  `getDashboardSnapshot()`); dashboard API uses Workers Cache API (30s TTL); beacon client
  (`beacon.ts`) batches events in memory and flushes every 10s or on `visibilitychange`/`beforeunload`;
  collect endpoint rate-limited (60 req/min/IP) with input validation (max 25 events, 256-char strings);
  `trackFormSubmit()` wired into JobApplicationModal and Footer newsletter; double-counting fix
  in `data-collector.ts`; session key collision fix in `marketing-tracking.ts`; `wrangler.toml`
  ANALYTICS KV namespace enabled (requires `wrangler kv namespace create ANALYTICS` to
  provision real ID); analytics docs updated to remove references to deleted TrackedComponents.tsx
  and reflect actual APIs

- **Mar 26:** Footer refactor and accessibility cleanup — consolidated repeated footer UI into
  shared data-driven blocks for social links, action cards, and status badges; kept footer social
  icons in a single row across screen sizes; replaced the newsletter form's direct DOM mutation
  logic with React state and live status messaging; made WA/OR/ID license numbers directly visible
  instead of hover-only; removed duplicate client-side organization schema from the footer in favor
  of the canonical layout SEO source; moved admin access off the visible footer copyright control to
  a private `Ctrl/Cmd + Shift + A` shortcut; added focused regression tests for newsletter feedback,
  visible license details, and admin shortcut access

- **Mar 26:** Careers/application UX and brand-language alignment — streamlined the job
  application flow to reduce friction, carried CTA context into the application modal,
  standardized shared dialog behavior across careers/admin/service/value modals
  (scroll lock, escape close, focus trap, initial focus), added targeted regression coverage
  for the modal/application paths, and removed legacy slogan-heavy phrasing from user-facing
  copy plus shared SEO/location metadata so previews match the current relationship-first tone

- **Mar 25:** Cloudflare performance optimizations — Worker Cache API added to `/api/analytics/geolocation`
  (per-country, 5-min TTL) and `/api/analytics/dashboard` (fixed cache key, 30-s TTL); `export const
revalidate = 86400` added to all 11 location pages, team, and testimonials (24-h ISR via OpenNext
  stale-while-revalidate); R2 public URL hostname warning added to `r2.ts`; `wrangler.toml` CACHE KV
  block updated with step-by-step provisioning commands

- **Mar 25:** Cloudflare deployment fixes & DB index audit — `wrangler.toml` `compatibility_date`
  corrected from stale `2024-11-18` to `2026-03-25`; apex→www 301 redirect added to `middleware.ts`;
  `SeoMeta.tsx` `generateEnhancedOrganizationSchema` fixed to avoid duplicate `"@type"` key in esbuild
  output; `migrations/0007_add_created_at_indexes.sql` added — `created_at` indexes on
  `contact_submissions`, `consultations`, `job_applications`

- **Mar 25:** Dependency audit — `npm audit` now reports 4 vulnerabilities (0 critical, 2 high, 2 moderate):
  `fast-xml-parser` entity expansion bypass (via `wrangler` devDep); `flatted` prototype pollution;
  Next.js 2× moderate (HTTP request smuggling in rewrites, unbounded `next/image` disk cache growth);
  `vercel` devDep fully removed; overrides updated

- **Mar 25:** Build type errors resolved — fixed 5 categories of pre-existing type errors exposed
  by TypeScript strict mode: (1) `rateLimit` middleware factory misuse in 4 API routes; (2)
  `newsletter/route.ts` `DbClient.query<T>()` return type; (3) `PageNavigation.tsx` `useIsMobile()`
  null coercion; (4) `middleware/security.ts` `getRouteConfig` fallback; build now clean: ~33s, 35
  static pages, 211 kB shared bundle, zero type errors

- **Mar 25:** Codebase audit and hardening — fixed CORS origins in `security-manager.ts`; fixed SW
  precache paths for location pages; fixed geolocation API to read from Workers `cf` object; fixed
  `X-Frame-Options` in `public/_headers` to `DENY`; fixed CI Node version `20` → `22`; added
  `JWT_SECRET`, `ADMIN_MATT_PASSWORD`, `ADMIN_JEREMY_PASSWORD`, and Cloudflare binding details to
  deployment checklist

- **Mar 25:** Migrated deployment from Cloudflare Pages (`mhc-gc-website`) to Cloudflare Workers
  (`mhc-v2-website.twelthmann.workers.dev`) — `wrangler.toml` updated to Workers model; `deploy`
  script changed to `wrangler deploy`; cloudflare-guide.md updated to v3.0.0

- **Mar 16:** Cloudflare Pages build failure diagnosed and resolved — root cause: build command not
  set in the Cloudflare Pages dashboard; updated
  [Cloudflare Deployment Guide](docs/deployment/cloudflare-guide.md) to v2.0.0

- **Mar 16:** Build pipeline optimizations — moved `outputFileTracingExcludes` to top-level key in
  `next.config.js`; disabled Next.js telemetry; made `prepare` script CI-aware; updated
  `compatibility_date` in `wrangler.toml` to `2026-03-15`; deleted dead `/api/auth/login` and
  `/api/auth/refresh` routes; zero build warnings, zero errors, 37/37 static pages, 210 kB shared
  bundle

- **Mar 15:** Removed redundant `export const runtime = "edge"` declarations from 18 API route files

- **Mar 15:** Fixed Cloudflare Pages CI — build command updated; deprecated `@cloudflare/next-on-pages`
  fully removed

- **Mar 15:** Comprehensive build audit — 32.6s, 39/39 static pages, zero errors; shared bundle
  reduced 221 kB → 211 kB

- **Mar 15:** Eighth optimization pass — deleted 2 dead `lib/utils/` modules (`keyword-matcher.ts`,
  `date-utils.ts`); 56/56 tests passing

- **Mar 15:** Seventh optimization pass — deleted `components/veterans/` directory; 79/79 tests
  passing

- **Mar 15:** Sixth optimization pass — deleted 3 dead component directories (`slider/`, `ratings/`,
  `map/`) and 7 dead files; 79/79 tests passing

- **Mar 15:** Fifth optimization pass — deleted 11 dead files including `TrackedComponents.tsx`,
  unused hooks, and compat-wrapper directories; 79/79 tests passing

- **Mar 15:** Integration test cleanup — deleted orphaned `booking-flow.test.ts`; rewrote
  `authentication.test.ts` to reflect real admin auth flow; test count 95 → 79

- **Mar 15:** Fourth optimization pass — deleted 7 dead `lib/performance/` modules; deleted
  `IconLibrary.tsx`, `Slogan.tsx`, `slogans.ts`, standalone `csrf.ts`; converted 3 pages to RSC;
  removed Urgent page; 4,302 lines of dead code removed

- **Mar 14:** Third optimization pass — deleted 5 dead `lib/` directories (~1,600 lines); removed
  `QuickBookingModal`, `PerformanceDashboard`; removed 3 unused production type packages; 95/95 tests
  passing

- **Mar 14:** Second optimization pass — converted `/accessibility` to RSC; deleted 5 more dead
  files; removed unused `@react-email/render` production dependency

- **Mar 14:** Codebase optimization pass — deleted 2 exact-duplicate page files, 219 `.bak` backup
  artifacts, dead components, entire unused chatbot component tree; 7 pages converted to RSC; shared
  bundle reduced from 223 kB → 221 kB

- **Mar 11:** GEO-proof location content — city pages carry verified project cards,
  `hasOfferCatalog` LocalBusiness schema, and public-sector callout

- **Mar 11:** Security hardening — API cache `Cache-Control: no-store` on mutating routes; CORS
  audit; `tar@7.5.11` and `cookie@1.1.1` CVE overrides added

- **Mar 11:** Dependency upgrades — Next.js 15.5.12, React 19.0.0, Tailwind 3.4.19,
  TypeScript 5.9.2

- **Mar 11:** SEO/GEO hardening — canonical host standardized to `https://www.mhc-gc.com`;
  city-priority service metadata; media sitemap expanded

---

## Dependency Overrides (March 2026)

`package.json` includes `overrides` to force patched versions of transitive dependencies:

| Package     | Version    | Reason                                               |
| ----------- | ---------- | ---------------------------------------------------- |
| `tar`       | `7.5.11`   | High CVEs in `@mapbox/node-pre-gyp` transitive chain |
| `cookie`    | `0.7.2`    | Low CVE in transitive chain                          |
| `flatted`   | `>=3.4.2`  | Prototype pollution fix (3.4.2 released)             |
| `undici`    | `>=7.24.0` | Security fix in HTTP client                          |
| `yauzl`     | `>=3.2.1`  | Zip parsing security fix                             |
| `glob`      | `>=11.0.0` | Transitive glob update                               |
| `picomatch` | `>=4.0.4`  | ReDoS + method injection fixes                       |
| `yaml`      | `>=2.8.3`  | Stack overflow fix for deeply nested YAML            |

**Current full-audit status:** 3 vulnerabilities (0 critical, 2 high devDep-only, 1 moderate production)

- `fast-xml-parser` high × 2 (entity expansion bypass via `wrangler` devDep)
- `next` moderate (HTTP smuggling + disk cache; fix requires Next.js >15.5.13 when released)
