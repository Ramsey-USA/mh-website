# Changelog

All notable changes to the MH Construction website are documented here.

---

## June 2026

- **Jul 20 (e):** Prompt 10.2 controlled public-claim register and fail-closed rendering integration — added shared claim contract and selectors in `apps/website/src/lib/content/claims.ts` (`ClaimRecord`, evidence references, context allow/prohibit rules, approval/review windows, and `getApprovedClaim` fail-closed behavior). Migrated repeated high-risk claims into controlled rendering paths across metadata and trust surfaces in `apps/website/src/app/layout.tsx`, `apps/website/src/components/seo/EnhancedSEO.tsx`, `apps/website/src/lib/seo/page-seo-utils.ts`, `apps/website/src/app/public-sector/PublicSectorFullPage.tsx`, `apps/website/src/app/safety/page.tsx`, `apps/website/src/components/shared-sections/AccreditationsLogoRow.tsx`, and `apps/website/src/components/resources/SafetyComplianceBadge.tsx`. Added focused guard coverage `apps/website/src/lib/content/__tests__/claims.test.ts` and script `claims:check` in `apps/website/package.json`. Added claim inventory/evidence map in `docs/branding/governance/public-claims-register-phase10-2.md` and indexed it in `docs/branding/governance/index.md`. Validation evidence: `type-check` PASS, `lint` PASS, `claims:check` PASS, `content:governance:check` PASS, `public-copy-phrasing-guard` PASS, `schemas` PASS, `sitemap` PASS, `robots` PASS, `brand:congruency:sync:check` PASS, `congruency:website:check` PASS, `check:translations` PASS, `congruency:locale:check` PASS, and `build:next` PASS.

- **Jul 20 (d):** Prompt 10.1 lifecycle and source governance baseline for repository-managed content — added a shared pure governance contract and helpers in `apps/website/src/lib/content/content-governance.ts` (lifecycle, approval, publish visibility, source references, and review-overdue checks), then wired governance metadata and public visibility enforcement into project, service, event, team, location, news-insights, and testimonial content selectors across `apps/website/src/lib/data/project-case-studies.ts`, `apps/website/src/lib/data/service-routes.ts`, `apps/website/src/lib/data/events.ts`, `apps/website/src/lib/data/vintage-team.ts`, `apps/website/src/app/team/page.tsx`, `apps/website/src/lib/data/locations.ts`, `apps/website/src/lib/data/news-insights.ts`, and `apps/website/src/lib/data/testimonials.ts`. Added focused executable validation suite `apps/website/src/lib/content/__tests__/content-governance-integrity.test.ts` plus package script `content:governance:check`. Validation evidence: `npm run --prefix apps/website type-check` PASS, `npm run --prefix apps/website content:governance:check` PASS, targeted selector contracts PASS (`project-case-studies`, `service-contract`, `locations`, and `schemas` suites), and `npm run --prefix apps/website check:asset-budgets` PASS (41.08 MB total under 75 MB budget).

- **Jul 20 (c):** Prompt 8.3 lifecycle-state localization continuation for events/locations/news/resources — completed route-surface localization hardening for remaining client-facing English pockets and lifecycle-adjacent CTA text across `apps/website/src/components/locations/LocationPageContent.tsx`, `apps/website/src/app/resources/page.tsx`, `apps/website/src/app/events/EventsLandingPageClient.tsx`, and `apps/website/src/app/news/page.tsx`. Added locale-aware headings, breadcrumb labels, trust/accreditation section copy, project/CTA language, status-supporting labels, and resource-card explanatory text while preserving controlled route names, factual records, and existing structured-data behavior. Validation evidence: `npm run --prefix apps/website check:translations` PASS, `npm run --prefix apps/website report:spanish:coverage` PASS (`LOCALIZED=33`, `INVARIANT-REVIEW=3`, `MISSING-SIGNAL=0`), `npm run --prefix apps/website congruency:locale:check` PASS, `npm run --prefix apps/website build:next` PASS, deterministic production sweep PASS via `BASE_URL=http://127.0.0.1:3100 npm run sweep:spanish:render` (`PASS=32`, `REVIEW=5`, `FAIL=0`), and focused redirect regression suite PASS after aligning `src/app/resources/safety-manual/__tests__/page.test.ts` with synchronous redirect throw behavior.

- **Jul 20 (b):** Prompt 8.2 core/trust Spanish review governance — added `docs/branding/strategy/spanish-review-matrix-core-trust-phase8-2.md` as the repository translation-review artifact for core and trust surfaces (home, services, about/contact pathways, projects, testimonials, team, veterans/public-sector, safety/resources, and global header/footer namespaces). The matrix records namespace scope, source-key anchors, English source version reference, Spanish completion state, sensitivity class, reviewer placeholder, and `DRAFT-REVIEW` approval state pending named human approval; indexed from `docs/branding/strategy/index.md`.

- **Jul 20:** Locale parity coverage hardening (Phase 8.1 continuation) — updated `apps/website/scripts/validation/report-spanish-coverage.js` to classify approved redirect-only routes as `INVARIANT-REVIEW` (`/resources/safety-manual`, `/resources/safety-program`, `/safety/intake`) instead of false-positive missing-signal gaps, and added namespace parity metrics against canonical `messages/en.json` and `messages/es.json` (shared namespace count plus EN-only/ES-only reporting). Added `docs/technical/seo/locale-routing-exceptions-phase8-1.md` and indexed it in `docs/technical/seo/index.md` to document file ownership and update rules for invariant redirect routes.

- **Jul 19 (f):** Operational release-governance documentation hardening — extended `docs/deployment/cicd-pipeline.md` as the canonical indexed source for publishing workflow, rollback execution, monthly quality reviews, and exception handling controls; added role-based approval model (`content owner`, `claim approver`, `translation reviewer`, `media approver`, `technical reviewer`, `safety reviewer`, `release owner`), explicit release-gate command set aligned to current pnpm/Next.js/OpenNext/Cloudflare/CI implementation, and rollback triggers covering content, route, locale, accessibility, form, performance, media/RSS, security, and failed deployment scenarios. Added monthly operational checklist rows with owner role, evidence source, pass condition, action threshold, and evidence location, and updated `docs/deployment/index.md` to index each control surface directly.

- **Jul 19 (e):** App Router status-state branding congruency standardization - standardized website loading, error, global-error, and not-found surfaces for consistent premium-brand behavior and accessibility using shared status primitives and localized copy. Added reusable route loading shell `apps/website/src/components/ui/RouteLoadingState.tsx` and migrated all existing route-level loading files (`/careers`, `/contact`, `/projects`, `/team`, `/testimonials`) to layout-stable skeleton patterns (no oversized spinner-first fallback). Refactored `apps/website/src/app/error.tsx` and `apps/website/src/app/global-error.tsx` as narrow client boundaries with safe action hierarchy (Try Again, Home, Contact), localized messaging (provider-backed for route error, local fallback for global error), and sanitized technical telemetry through approved integrations (`logger`, `captureException`, `gtag`) without exposing raw stack/message content in UI or analytics payloads. Updated `apps/website/src/app/not-found.tsx` to preserve true 404 behavior while adding direct construction navigation (View Services, View Projects, Contact, Back to Home). Added/updated regression coverage for rendering, reset flow, navigation, semantic landmarks/headings, and loading landmark contracts (`aria-busy`, `aria-live`) across app and shared error boundary suites. Validation evidence: `lint`, `type-check`, full website tests (147 suites, 1507 tests), `verify:route-integrity`, and production OpenNext build all passing.

- **Jul 19 (c):** Reusable UI primitive standardization and compatibility-safe adoption — established a single typed primitive set for `Button`, `Card`, `Container`, `SectionHeading`, `Badge`, and `FocusRing` under `apps/website/src/components/ui/` with shared CVA-driven variants and consistent interaction states (focus, disabled, hover, active), including practical touch-target sizing and semantic element defaults (button/link via `asChild`, heading-level control, restrained badge taxonomy). Added primitive-focused regression coverage for semantic rendering and variant/state behavior in `apps/website/src/components/ui/__tests__/primitives.test.tsx`; preserved existing consumer stability via base-layer re-exports (`apps/website/src/components/ui/base/{button,card,badge}.tsx`) and completed remaining import-path cleanup for modal consumers to use top-level `@/components/ui` entrypoints.

- **Jul 19 (d):** Primitive import convergence follow-up — completed a repository sweep for direct/base primitive consumer imports under `apps/website/src` and confirmed no remaining non-standard consumer paths for `button`, `card`, `badge`, `container`, `section-heading`, or `focus-ring`; retained base primitive shim files as compatibility exports only and revalidated website lint/type-check green state.

- **Jul 19:** Canonical sitemap architecture and deterministic route-integrity guardrail — introduced a typed canonical route manifest and rewired XML sitemap generation to use a single manifest source (`apps/website/src/lib/seo/route-manifest.ts` + `apps/website/src/app/sitemap.ts`), added an HTML sitemap utility page at `/sitemap` (`apps/website/src/app/sitemap/page.tsx`), updated robots generation to publish the canonical sitemap endpoint only (`apps/website/src/app/robots.ts` and `apps/website/public/robots.txt`), and removed the legacy `/sitemap` redirect to allow the page route. Added repository-local integrity validation (`apps/website/scripts/verify-route-integrity.mjs`) with path-level failures for canonical-route implementation coverage, dynamic content publication mapping, redirect chain prevention, nav/footer link integrity, sitemap exclusion policy, locale reciprocity, required-route presence, and conditional `/events` inclusion. Wired guard execution into website build/deploy chains and CI quality/build jobs (`apps/website/package.json`, root `package.json`, `.github/workflows/ci-cd.yml`). Validation evidence: route-integrity pass in current state, forced failure via `--require /known-bad-route`, plus green `type-check`, `lint`, `test:ci:fast`, and production build.

- **Jul 17 (b):** Global MH watermark parallax standardization — replaced section-level repeated MH logo watermark rendering with a single page-level app-shell parallax treatment for routed pages, added safeguards for accessibility/performance (automatic disable for reduced motion, requestAnimationFrame scroll throttling, bounded parallax offset), and enforced route-aware logo variants at shell level (veteran watermark on `/veterans*`, black/white government variants on `/public-sector*`); synchronized canonical docs/checklists to the new global contract in `docs/branding/standards/unified-component-standards.md`, `docs/development/standards/page-compliance-checklist.md`, and `docs/branding/governance/website-guardrails-coverage.md`.

- **Jul 17:** Safety/handbook PDF optimization and public asset cleanup — added `documents/scripts/optimize-pdfs.mjs` (Ghostscript post-process that downsamples the oversized embedded logo, recompresses images, and dedupes repeated image objects while preserving page count, text, fonts, and branded layout) and wired it into the release pipeline as `docs:optimize` (runs inside `docs:all` after section merges and before download bundling, so `docs:release` publishes optimized artifacts to R2 automatically); reduced `documents/generated-pdfs` from ~468 MB to ~88 MB (81% smaller, all 248 PDFs, page counts intact — e.g. `safety-manual-complete` 90→16 MB, `safety-manual-forms-package` 57→3.7 MB); removed the stale, gitignored `apps/website/public/docs/` form-PDF copies that were already served from `FILE_ASSETS` via the `/docs/**` route, dropping `public/` from ~121 MB to ~59 MB so `check:asset-budgets` passes. Note: to propagate the smaller PDFs to production, a maintainer runs `docs:publish:all` (or a full `docs:release`) with wrangler authenticated.

- **Jul 16:** CI/CD deployment unblock and Node runtime warning cleanup - registered the additional hero media artifact (`home-hero-optimized-audio.webm`) in `apps/website/config/hero-commercials.json` to satisfy `check:hero-commercials`, upgraded GitHub Actions cache usage from `actions/cache@v4` to `actions/cache@v5` in `.github/workflows/ci-cd.yml` and `.github/workflows/build-benchmark.yml` to remove Node 20 deprecation annotations, and verified successful production pipeline completion including `Deploy to Cloudflare Workers` on run `29464674443` (commit `ef99737f8d5937eaf9416f6e10dd2a4a91fdbf15`).

- **Jul 12:** Runtime cleanup and consolidation sweep — removed several legacy compatibility surfaces and repeated wrappers across the website/dashboard codepaths, including deprecated page-navigation props, legacy offline queue storage, redundant analytics/icon/CTA shims, and thin API/security compatibility layers; centralized shared test helpers for fetch/storage setup and updated the affected focused tests to match the canonical paths.

- **Jul 10:** CI install-log noise suppression (no dependency version churn) — updated GitHub Actions workflows to run dependency installs with `pnpm install --frozen-lockfile --loglevel error` (including filtered install variants) so transitive deprecation and peer warning noise no longer drowns test/build output; preserved existing glob/transitive version graph and error/failure behavior for quality gates.

- **Jul 10 (b):** Cross-app deduplication extraction milestone — completed shared-canon extraction for duplicated analytics runtime components (`packages/shared/src/lib/analytics/components/`), icon runtime (`packages/shared/src/lib/icons/AmericanFlag.tsx`), style sources (`packages/shared/src/styles/variables.css`, `packages/shared/src/styles/material-icons.css`), and final mirrored team data (`packages/shared/src/lib/data/team/` for GATOR + mike-holstein); converted app-local duplicates to thin wrappers/imports, introduced dedicated shared team-data alias namespace (`@/lib/shared-data/team/*`) to avoid collisions with local team imports, and de-scoped app mirror enforcement to zero configured entries while preserving guard script/CI wiring (`scripts/duplicates/sync-app-mirrors.sh`).

- **Jul 7:** GitHub Advanced Security and dependency governance alignment — enabled repository-level security hardening with private vulnerability reporting policy (`SECURITY.md`), Dependabot version-update configuration (`.github/dependabot.yml`), pull-request dependency risk enforcement (`.github/workflows/dependency-review.yml`), and scheduled strict dependency audit automation (`.github/workflows/security-nightly.yml`); removed duplicate custom CodeQL workflow in favor of GitHub Advanced Security CodeQL default setup as the single code-scanning source.

- **Jul 7 (b):** Website design status sync — updated the design-system documentation and top-level project overview to reflect the current tokenized website design baseline and the latest green validation state across the main routes.

- **Jul 5:** CI/deployment security hardening and setup clarity pass — added an internal dependency vulnerability gate script (`scripts/validation/security-audit-gate.mjs`) with threshold-based commands (`security:check`, `security:check:prod`, `security:check:strict`); updated `ci-cd.yml` security audit gate to run the moderate-threshold check; upgraded workflow actions from `pnpm/action-setup@v4` and `actions/cache@v4` to Node-24-compatible `@v6`; improved IndexNow setup reliability by allowing `apps/website/scripts/verification/generate-indexnow-key-file.mjs` to load `INDEXNOW_KEY` from local env files and by masking key identifiers in logs; updated setup docs to clarify required GitHub repository secrets for main-branch CI/deploy flows (`INDEXNOW_KEY`, `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`).

- **Jul 3:** Services funnel documentation standardization — aligned technical, branding, standards, and root docs to the implemented home services hierarchy (`Delivery Path -> Project Focus -> Specific Service Card`) and removed stale references to legacy tabbed/category flow or standalone services-page sequencing where discovery now occurs in `/#services`.

- **Jul 2:** Services hub routing standardization — deprecated direct `/services` index navigation in favor of the home-page services hub anchor (`/#services`) across header, hamburger, footer, CTA links, chatbot references, and SEO breadcrumb helpers; retained dedicated delivery lane pages under `/services/[slug]`; updated sitemap behavior and aligned tests/docs for this canonical split (`/#services` for hub discovery, `/services/[slug]` for lane detail).

- **Jul 2 (handoff):** Services-on-home migration completion pack — finalized codebase congruency so service discovery is documented and validated as Home hub first (`/#services`) with dedicated detail under `/services/[slug]`; aligned route-indexing policy classes (`/services` redirect, `/about/details` noindex, `/events` noindex) and added explicit metadata on non-index/redirect routes to satisfy validator contracts; updated Lighthouse/SEO audit scripts to evaluate the services hub strategy instead of legacy `/services` index assumptions; standardized technical/branding/performance docs terminology from “Services Page” to “Services Hub Section” and added historical-baseline notes where older route-era metrics are retained for continuity.

- **Jun 30:** Website congruency and SEO de-duplication sweep (phase update) — reduced repeated slogan and credential stacks across high-traffic page copy, shared components, and centralized SEO metadata/schema utilities (`apps/website/src/lib/seo/page-seo-utils.ts`, testimonials/team/veterans/projects surfaces, and shared hero/banner copy paths); standardized language toward page-intent-specific messaging while preserving required trust and accreditation framing; completed targeted phrase audits and regression validation (`page-seo-utils`, page smoke, translation parity). Remaining intentional/queued exceptions are tracked for follow-up in non-core or policy-bound surfaces (for example canonical mission constants and designated legacy/job-print messaging paths).

- **Jun 30 (b):** Final congruency closure pass — removed remaining slogan-heavy defaults from Home hero copy, careers printable application messaging, job-application modal messaging, and public-sector SEO title; updated related UI test expectations and re-ran targeted regressions (UI extended, SEO utils, page smoke, translation parity). One intentional canonical exception remains in organization schema mission text (`Built on Quality, Backed by Trust.`) to preserve brand-constant source-of-truth usage.

- **Jun 26:** Cool Desert Nights booth-entry post-submit flow update — the Event Wizard now automatically redirects participants to the MH Construction Google Business Profile review form (`https://g.page/r/CVdv3YZLzJvdEAI/review`) after they complete and submit all voting steps, including locally cached/offline submissions once the completion state is reached; admin export mode remains exempt from this redirect so event operations workflows are not interrupted.

- **Jun 21:** Hero-to-navigation spacing standardization — normalized hero spacing across shared hero components and route-level hero banners so heading copy, breadcrumbs, and CTAs consistently clear the global navigation header and any pinned page-navigation rail on Home, Contact, Team, FAQ, Veterans, Safety, Careers, Projects, Public Sector, Allies, Testimonials, Cool Desert Nights, Locations, service detail, project case study, FAQ category, and public-sector subpages; added dynamic CSS variables for measured header and page-nav height, plus reusable `hero-safe-top`, `hero-safe-top-lg`, and `hero-safe-bottom` utilities in `apps/website/src/app/globals.css`.

## January 2025

- **Jan:** Navigation icon standardization — created centralized `/src/lib/constants/navigation-icons.ts`
  with `PAGE_ICONS` and `SEMANTIC_ICONS` maps for consistent icon usage across all page links;
  standardized Footer.tsx and Navigation.tsx to use matching icons for same pages (e.g., `contact_phone`
  for Contact, `build` for Services, `military_tech` for About); fixed Allies page icon divergence
  (Navigation used `handshake`, Footer used `construction` → both now use `group` for page links);
  updated `docs/technical/design-system/icon-system-complete.md` with new "Standardized Page Icons"
  table, source-of-truth reference, and usage examples

---

## May 2026

- **May 21:** Safety document branding and release workflow alignment — standardized manual and form print templates to the current MH primary green and primary tan pattern across all active manual chrome templates (`safety-manual-cover`, `spine`, `letterhead`, `toc`, `tabs`, `section`) and form templates (`form-cover`, `form-fillable`); rebuilt safety artifacts (50 section PDFs, merged manual outputs, and 18 form packages) and published them to `FILE_ASSETS` under `docs/safety/**` including `docs/safety/forms/form-02-b-job-hazard-analysis.pdf`; updated release scripts so `docs:generate:forms` now builds package outputs (`--template form-packages`), forms publishing targets `documents/output/form-packages` → `docs/safety/forms/`, and safety publishing no longer emits a legacy `documents/output/forms` warning; hardened extraction continuity by allowing `docs:extract` to fall back to Word-source extraction when legacy PDF source directories are absent.

## April 2026

- **Apr 30 (b):** 4-Tier Veteran Owned Business certification framework documentation — added
  `COMPANY_INFO.veteranCertifications` block to `src/lib/constants/company.ts` documenting all 4
  tiers with statuses: WA DVA VOB ✅ Certified (Tier 1 / State), SBA VetCert 🔄 (Tier 2 / Federal),
  NaVOBA 🔄 (Tier 3 / Private-Corporate), NVBDC 🔄 (Tier 4 / Private-Corporate); updated
  `docs/branding/brand-constants.md` (v1.4.0) with 4-tier framework table and individual credential
  entries for each in-pursuit certification including program URLs, significance, and on-certification
  guidance; updated `docs/branding/strategy/brand-overview.md` (v7.1.0) Key Differentiators section
  with 4-tier VOB program description and cross-reference; in-pursuit certifications are documented
  only — no UI badges displayed until official confirmation received

- **Apr 30 (a):** Washington State Veteran Owned Business (WA DVA) certification badge — added
  `WaVobBadge` component (`src/components/ui/WaVobBadge.tsx`) with an approved patriotic
  red-to-blue gradient border container to display the non-transparent WA DVA logo; registered
  `waVob` entry in `COMPANY_INFO`; badge deployed to all 8 accreditation/affiliations surfaces
  (About, Veterans, Services, Allies, Public Sector, Locations, Careers, Footer); updated
  `docs/branding/brand-constants.md` (v1.3.0) with WA VOB credential entry, `docs/branding/standards/color-system.md`
  (v7.1.0) with Veteran Owned Badge Exception section, `docs/branding/standards/unified-component-standards.md`
  with WaVobBadge accreditation rule, `docs/branding/agent-branding-policy.md` (v1.1.0) with
  approved color exception table, `.github/branding-exceptions.json` with formal exception record,
  and `.github/instructions/mh-branding-guardrails.instructions.md` with scoped exception guidance

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
  future upgrade potentials documented: Cloudflare Images (on-demand AVIF/WebP, ~~$5/mo),
  Email Routing (replace Resend for simple form emails, ~$100/yr savings), Bot Management
  (~~$20/mo), Analytics Engine binding

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
