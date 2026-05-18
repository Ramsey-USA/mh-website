# SEO Route Indexing Policy Checklist

**Category:** Technical - SEO  
**Last Updated:** May 11, 2026  
**Status:** Active

## Purpose

This checklist is the operational standard for deciding whether a route should be indexed,
listed in sitemap, or blocked from indexing.

**Brand Congruency:** Route indexing and canonicalization decisions must preserve approved page names, trust surfaces, and SEO-safe terminology.

Use this when:

- adding a new route under `src/app`
- changing route behavior from page to redirect
- introducing print, internal, auth-gated, or legacy routes
- reviewing SEO regressions before release

Automatic drift handling:

- Route removals are pruned from policy by `seo:routes:sync`.
- Newly introduced routes are automatically added to `pendingClassification`
  by `seo:routes:sync` and must be explicitly classified before CI passes.

## Route Classes

Classify every route into exactly one class.

### Class A: Public Indexable Route

Requirements:

- `robots.index = true`
- canonical points to the route URL
- route is present in `src/app/sitemap.ts` (static registry or generated set)

Examples:

- `/`, `/services`, `/projects`, `/contact`
- `/resources`
- `/resources/safety-manual/contents`
- `/resources/safety-manual/forms`
- `/resources/safety-manual/{cluster}`

### Class B: Public But Not Indexable (Utility/Internal)

Requirements:

- `robots.index = false`
- canonical points to best public destination (or self when needed)
- route is not listed in sitemap

Examples:

- `/offline`
- `/careers/print`
- `/employee-handbook`
- `/safety/incident-report`
- `/safety/hub`
- `/safety/print/[id]`

### Class C: Redirect Route (Legacy/Intermediary)

Requirements:

- route performs `redirect` or `permanentRedirect`
- `robots.index = false`
- canonical points to the destination route
- route is not listed in sitemap

Examples:

- `/resources/safety-manual` -> `/resources/safety-manual/contents`
- `/resources/safety-program` -> `/safety`
- `/safety/intake` -> `/safety`
- `/resources/safety-manual/section/[slug]` -> cluster destination

## Current Sitemap Source of Truth

File: `apps/website/src/app/sitemap.ts`

Public indexable pages come from:

- `ACTIVE_PAGES` (manual priority registry)
- `SAFETY_CLUSTER_PAGES` (derived from `ALL_CLUSTER_SLUGS`)

`SAFETY_CLUSTER_PAGES` uses:

- `ALL_CLUSTER_SLUGS` from `apps/website/src/lib/data/safety-manual-clusters.ts`

This keeps safety cluster listings synchronized with the cluster data model.

## Canonical + Robots Checklist (Per Route)

For every new `page.tsx` or route `layout.tsx` metadata block:

1. Set title and description.
2. Set `alternates.canonical`.
3. Set `robots.index` and `robots.follow` explicitly.
4. If indexable, confirm route is in sitemap.
5. If redirect/internal/print/auth-gated, confirm route is not in sitemap.

CI enforcement note:

- Routes classed as `noindex` or `redirect` must export explicit metadata in
  route `page.tsx` or same-segment `layout.tsx`.

## Implementation Patterns

### Pattern 1: Indexable route metadata

```ts
export const metadata: Metadata = {
  title: "Page Title | MH Construction",
  description: "...",
  alternates: {
    canonical: "https://www.mhc-gc.com/your-route",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### Pattern 2: Noindex route metadata

```ts
export const metadata: Metadata = {
  title: "Utility Page | MH Construction",
  description: "...",
  alternates: {
    canonical: "https://www.mhc-gc.com/preferred-destination",
  },
  robots: {
    index: false,
    follow: false,
  },
};
```

### Pattern 3: Redirect route metadata

```ts
export const metadata: Metadata = {
  title: "Legacy Route Redirect | MH Construction",
  description: "...",
  alternates: {
    canonical: "https://www.mhc-gc.com/destination",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LegacyRoutePage() {
  redirect("/destination");
}
```

## Release Verification Steps

Run from `apps/website`:

```bash
npm run seo:routes:sync
npm run seo:routes:check
npm test -- src/app/__tests__/sitemap.test.ts
```

CI also runs:

```bash
npm run seo:routes:sync:check
```

If it fails, run `seo:routes:sync`, classify any pending routes in
`config/seo/route-indexing-policy.json`, then rerun checks.

Quick route coverage diff check:

```bash
rg --files src/app | rg '/page\.tsx$' | sed 's#^src/app##; s#/page\.tsx$##' | sort > /tmp/app_routes.txt
rg 'path:\s*"[^"]+"' src/app/sitemap.ts -o | sed -E 's/.*"([^"]+)".*/\1/' | sort > /tmp/sitemap_static.txt
comm -23 /tmp/app_routes.txt /tmp/sitemap_static.txt
```

Review output and confirm every non-listed route is intentionally noindex or redirect.

## Ownership

- Primary owner: Website engineering
- Review trigger: Any new route, redirect change, or metadata refactor

## Related Docs

- `docs/technical/seo/seo-complete-guide.md`
- `docs/marketing/seo-quick-reference.md`
- `apps/website/src/app/sitemap.ts`

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
