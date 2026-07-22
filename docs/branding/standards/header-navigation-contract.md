# Header Navigation Contract

**Category:** Branding - Standards  
**Last Updated:** July 22, 2026  
**Status:** Canonical

## Purpose

Lock the MH website header structure so desktop navigation order and CTA placement do not drift across redesigns, refactors, or content updates.

## Non-Negotiable Desktop Header Layout

At desktop breakpoint and above, the header row must remain:

1. Left side: MH logo linking to home (`/`).
2. Right side order: `Services` -> `Projects` -> `Public Sector` -> `About MH` -> `Contact` -> `More` -> `Discuss Your Project`.

Desktop CTA contract:

1. Label: `Discuss Your Project`.
2. Href: `/contact?intent=project-discussion`.
3. Position: always after `More` in the same row.

## Responsive Behavior Contract

For smaller screens, the desktop row is intentionally replaced by a `Menu` trigger.

1. Small-screen trigger label remains `Menu`.
2. Opening the modal reveals the same destination set plus the home link.
3. Keyboard and accessibility behavior must remain intact (Escape close, focus containment, focus return).

## Implementation Source of Truth

Primary implementation files:

- `apps/website/src/components/navigation/SiteHeader.tsx`
- `apps/website/src/components/navigation/DesktopNavigation.tsx`
- `apps/website/src/components/navigation/MobileNavigation.tsx`
- `apps/website/src/components/navigation/navigation-data.ts`

Primary regression test:

- `apps/website/src/components/layout/__tests__/Navigation.test.tsx`

## Change Control

Any change to header order, labels, or CTA placement requires all of the following in the same pull request:

1. Update this contract file.
2. Update implementation files.
3. Update or add regression tests.
4. Confirm docs synchronization checks pass.

---

**MH Construction** - Founded 2010, Veteran-Owned Since January 2025
