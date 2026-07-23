# Accessibility Regression Checklist

**Category:** Development - Standards  
**Last Updated:** July 19, 2026

## Purpose

Manual accessibility verification companion for automated Jest and Lighthouse checks.
Use this checklist when shipping changes that affect public routes, layout, forms,
navigation, dialogs, media controls, or localization behavior.

## Representative Route Matrix

Verify each route class below using keyboard-only flow and a screen reader smoke pass.

- Homepage: `/`
- Services hub: `/services`
- Projects hub: `/projects`
- Project detail: `/projects/[slug]`
- About: `/about`
- Contact: `/contact`
- Public Sector: `/public-sector`
- Events hub: `/events`
- Event detail: `/events/[slug]`
- Event detail (registration route): `/events/operation-cast-recover`
- Locations hub: `/locations`
- Location city: `/locations/[city]`
- News hub: `/news`
- Team: `/team`
- Testimonials: `/testimonials`
- Veterans: `/veterans`
- Safety: `/safety`
- Resources: `/resources`
- State routes: loading, error, global-error, not-found (where route tests exist)

## Manual Checks (WCAG 2.2 AA Target)

- One H1 per page and logical heading order.
- Landmark structure is valid (`header`, `main`, `footer`) and skip link lands in `main`.
- All interactive controls have one clear accessible name.
- Keyboard flow works without pointer dependency; visible focus is preserved.
- Forms expose explicit labels, error text, and recovery path after invalid submit.
- Dialogs/menus support escape, focus trap, and focus return.
- Live region announcements are present where dynamic results update.
- Images include useful alternative text or are intentionally decorative.
- Zoom/reflow at 200% retains usability and does not hide content/actions.
- Reduced-motion preference is respected for non-essential animation.
- Touch targets are usable on small viewports and do not overlap.

## Known Scope Notes

- Services detail URL is intentionally consolidated into the Services hub route by policy.
- News detail article route is not currently published; evaluate when that route is introduced.

## Required Validation Commands

- `npm run format:check`
- `npm run lint`
- `npm run type-check`
- Focused Jest accessibility and smoke suites
- Lighthouse command from package scripts (`lighthouse:home` or `lighthouse:home:local`)
- `npm run check:translations`
- `npm run brand:congruency:sync:check`
- `npm run congruency:website:check`
- `npm run verify:route-integrity`
- `npm run seo:routes:check`
- `npm run build:next`
