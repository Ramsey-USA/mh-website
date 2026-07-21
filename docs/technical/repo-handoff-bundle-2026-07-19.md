# Repository Handoff Bundle

Generated: 2026-07-19
Repository: mh-website

## 1) Repository Structure

### Root (focused export)

```text
/workspaces/mh-website
├── apps/
│   ├── dashboard/
│   └── website/
├── packages/
├── docs/
├── documents/
├── messages/
├── scripts/
├── config/
├── migrations/
├── public/
├── package.json
├── pnpm-workspace.yaml
├── next.config.js
├── tailwind.config.ts
└── wrangler.toml
```

### Website app structure (focused export)

```text
apps/website
├── src/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── styles/
│   ├── content/
│   ├── hooks/
│   └── contexts/
├── public/
├── scripts/
├── package.json
├── next.config.js
├── open-next.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
└── wrangler.toml
```

### Where pages and components live

- Pages (App Router): [apps/website/src/app](../../apps/website/src/app)
- Components: [apps/website/src/components](../../apps/website/src/components)
- Shared package: [packages/shared](../../packages/shared)

Common page folders visible in current app tree:

```text
apps/website/src/app/
about, contact, projects, services, team, testimonials, safety, resources, api, layout.tsx, page.tsx, globals.css
```

Common component folders visible in current app tree:

```text
apps/website/src/components/
home, services, navigation, seo, shared-sections, ui, forms, templates, analytics
```

## 2) Tech Stack

Primary stack:

- Next.js 16 + React 19 (App Router)
- TypeScript
- Tailwind CSS 4
- next-intl for localization
- Jest + Testing Library
- ESLint + Prettier
- OpenNext adapter for Cloudflare Workers
- Wrangler for deployment

Evidence:

- [apps/website/package.json](../../apps/website/package.json)
- [apps/website/src/app/page.tsx](../../apps/website/src/app/page.tsx)
- [apps/website/open-next.config.ts](../../apps/website/open-next.config.ts)
- [apps/website/wrangler.toml](../../apps/website/wrangler.toml)

CMS/headless check:

- No clear external CMS integration was found in active dependencies (for example, no Sanity, Contentful, Strapi, or WordPress SDK packages).
- Content appears repository-managed through app code, localization files, docs, and document pipelines.

## 3) package.json and Build Tooling

Monorepo package:

- [package.json](../../package.json)

Website package:

- [apps/website/package.json](../../apps/website/package.json)

Dashboard package:

- [apps/dashboard/package.json](../../apps/dashboard/package.json)

Representative website scripts:

```text
dev: next dev --webpack
build: npm run build:standard
deploy: node ../../scripts/deploy-opennext.mjs
type-check: tsc -p tsconfig.json --noEmit
lint: eslint . --cache --cache-location .eslintcache
test: jest
```

Representative website dependencies:

```text
next, react, react-dom, next-intl, recharts, resend, toucan-js,
@radix-ui/*, tailwindcss, wrangler, @opennextjs/cloudflare
```

## 4) Sample Page Files

Homepage source:

- [apps/website/src/app/page.tsx](../../apps/website/src/app/page.tsx)

Service page source:

- [apps/website/src/app/services/page.tsx](../../apps/website/src/app/services/page.tsx)

Pattern notes from current pages:

- App Router page components exported as async server functions.
- Heavy section composition from feature components in services/home folders.
- Route metadata and SEO handled with structured imports and utilities.
- Tailwind utility classes used directly in JSX with shared design tokens.

## 5) CSS and Theme Files

Primary stylesheet:

- [apps/website/src/app/globals.css](../../apps/website/src/app/globals.css)

Tailwind theme config:

- [apps/website/tailwind.config.ts](../../apps/website/tailwind.config.ts)

PostCSS config:

- [apps/website/postcss.config.js](../../apps/website/postcss.config.js)

Styling approach summary:

- Tailwind CSS utilities plus custom theme extension for brand colors, typography, shadows, animations.
- Global CSS imports shared variables and defines font faces/utilities.
- App uses brand token classes and semantic color groupings.

## 6) Deployment Setup

Deployment target:

- Cloudflare Workers via OpenNext (not Cloudflare Pages)

Key files:

- [apps/website/wrangler.toml](../../apps/website/wrangler.toml)
- [apps/website/open-next.config.ts](../../apps/website/open-next.config.ts)
- [scripts/deploy-opennext.mjs](../../scripts/deploy-opennext.mjs)

CI/CD deployment workflow:

- [ci-cd.yml deploy job](../../.github/workflows/ci-cd.yml#L294)
- [Deploy to Cloudflare Workers step](../../.github/workflows/ci-cd.yml#L341)

Deployment behavior in pipeline:

```text
- Build website app
- Run npm run deploy in apps/website
- Deploy executed with Cloudflare token/account secrets
```

## 7) Existing Config Files

Core configuration used by website app:

- [apps/website/next.config.js](../../apps/website/next.config.js)
- [apps/website/open-next.config.ts](../../apps/website/open-next.config.ts)
- [apps/website/wrangler.toml](../../apps/website/wrangler.toml)
- [apps/website/tailwind.config.ts](../../apps/website/tailwind.config.ts)
- [apps/website/postcss.config.js](../../apps/website/postcss.config.js)
- [apps/website/tsconfig.json](../../apps/website/tsconfig.json)

Monorepo and root configs:

- [pnpm-workspace.yaml](../../pnpm-workspace.yaml)
- [package.json](../../package.json)
- [next.config.js](../../next.config.js)
- [tailwind.config.ts](../../tailwind.config.ts)
- [open-next.config.ts](../../open-next.config.ts)
- [wrangler.toml](../../wrangler.toml)

Environment templates:

- [.env.local.example](../../.env.local.example)
- [.env.r2.local.example](../../.env.r2.local.example)

## Quick Starter Context for Prompting

If you are writing implementation prompts against this repo, assume:

- Monorepo with apps under apps/website and apps/dashboard.
- Public site page routes under apps/website/src/app.
- Shared UI and route sections under apps/website/src/components.
- Tailwind + global CSS conventions already in place.
- Cloudflare Workers deployment via OpenNext and Wrangler.

## 8) July 19 Route Integrity and Sitemap Progress

Completed routing/SEO hardening implemented on 2026-07-19:

- Canonical route manifest added and used as sitemap source-of-truth:
  - [apps/website/src/lib/seo/route-manifest.ts](../../apps/website/src/lib/seo/route-manifest.ts)
  - [apps/website/src/app/sitemap.ts](../../apps/website/src/app/sitemap.ts)
- HTML sitemap utility route added at `/sitemap`:
  - [apps/website/src/app/sitemap/page.tsx](../../apps/website/src/app/sitemap/page.tsx)
- Robots output aligned to canonical sitemap endpoint:
  - [apps/website/src/app/robots.ts](../../apps/website/src/app/robots.ts)
  - [apps/website/public/robots.txt](../../apps/website/public/robots.txt)
- Deterministic repository-local route checker added:
  - [apps/website/scripts/verify-route-integrity.mjs](../../apps/website/scripts/verify-route-integrity.mjs)

Guardrail wiring:

- Website scripts:
  - [apps/website/package.json](../../apps/website/package.json)
  - `verify:route-integrity` runs before `build:standard`, `build:lowmem`, and `deploy`
- Monorepo wrapper:
  - [package.json](../../package.json)
- CI pipeline integration:
  - [.github/workflows/ci-cd.yml](../../.github/workflows/ci-cd.yml)

Verifier enforces:

- Static canonical routes map to App Router implementations.
- Dynamic sitemap routes map to published content records.
- No canonical route is also a redirect source.
- No redirect target is another redirect source.
- Navigation/footer hrefs do not point to missing routes.
- Sitemap excludes utility/API, redirect, `/en/*`, and non-public route classes.
- English/Spanish sitemap pairs remain reciprocal; unapproved Spanish routes are not advertised.

## 9) July 19 UI Primitive Standardization Progress

Completed reusable primitive consolidation for website UI foundations:

- Canonical primitive set created/standardized in `apps/website/src/components/ui/`:
  - `button.tsx`
  - `card.tsx`
  - `container.tsx`
  - `section-heading.tsx`
  - `badge.tsx`
  - `focus-ring.tsx`
- Typing and variants are unified with the existing CVA + `cn` utility pattern.
- Semantics preserved:
  - Buttons render as native `<button>` by default, with optional `asChild` link composition.
  - Section headings support explicit heading-level selection (`h1`-`h6`).
  - Badges remain non-interactive status tokens (`<span>`).
- State consistency standardized across primitives for focus, hover, active, and disabled behavior.

Compatibility and migration safety:

- Existing base entrypoints now remain thin re-export shims for stability:
  - `apps/website/src/components/ui/base/button.tsx`
  - `apps/website/src/components/ui/base/card.tsx`
  - `apps/website/src/components/ui/base/badge.tsx`
- Remaining modal consumers were migrated to top-level `@/components/ui` imports.

Validation evidence for this primitive pass:

- `lint` pass
- `type-check` pass
- `test:ci:fast` pass
- `build:next` pass
- OpenNext preview remains environment-limited (stalls at remote connection establishment in this workspace).

Final convergence follow-up:

- A direct-import sweep across `apps/website/src` found no remaining consumer imports referencing non-standard primitive module paths (`ui/base/*` or direct primitive file paths for button/card/badge/container/section-heading/focus-ring).
- Required canonical routes remain present: `/`, `/services`, `/projects`, `/about`, `/contact`.
- `/events` is required when event-hub publication is enabled.

Recent validation evidence:

- Passing check: `npm run verify:route-integrity`
- Failing check sample: `node scripts/verify-route-integrity.mjs --require /known-bad-route`
- Follow-on gates remained green: `type-check`, `lint`, `test:ci:fast`, and `build`.
