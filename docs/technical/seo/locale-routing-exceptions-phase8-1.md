# Locale Routing Exceptions (Phase 8.1)

**Category:** Technical - SEO
**Last Updated:** July 20, 2026

## Purpose

Record approved language-invariant route exceptions for Spanish coverage checks
when a route is intentionally redirect-only and has no user-facing localized
content surface.

## Approved Invariant Redirect Routes

| Route                       | Owning file                                              | Behavior                                         | Rationale                                                                                 |
| :-------------------------- | :------------------------------------------------------- | :----------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `/resources/safety-manual`  | `apps/website/src/app/resources/safety-manual/page.tsx`  | Redirects to `/resources/safety-manual/contents` | Redirect-only entry route; canonical destination owns localized content.                  |
| `/resources/safety-program` | `apps/website/src/app/resources/safety-program/page.tsx` | Redirects to `/safety`                           | Legacy alias route; destination page owns localized content.                              |
| `/safety/intake`            | `apps/website/src/app/safety/intake/page.tsx`            | Redirects to `/safety`                           | Entry redirect route retained for compatibility; destination page owns localized content. |

## Enforcement Contract

The Spanish coverage report script classifies these routes as
`INVARIANT-REVIEW` and does not require locale-signal wiring in the redirect
file itself.

Relevant script:

- `apps/website/scripts/validation/report-spanish-coverage.js`

## Change Policy

When converting an approved invariant route into a rendered content page:

1. Remove the route from the invariant map in the coverage script.
2. Add locale-signal wiring and translation keys to the page implementation.
3. Re-run `pnpm --filter @mhc/website run report:spanish:coverage`.
4. Update this document and the SEO index if ownership changes.
