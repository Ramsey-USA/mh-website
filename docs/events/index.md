# Events Documentation

**Category:** Events - Overview  
**Last Updated:** July 24, 2026

## Overview

This directory is the dedicated record for events MH Construction sponsors or hosts.

Use this section to track finalized event outcomes, participation totals, sponsorship impact, and post-event reference data in a consistent format.

Events docs should stay congruent with canonical MH voice, trust language, factual veteran-owned framing, and approved naming rules.

## Event Records

- **[Operation: Cast & Recover 2026 - Registration and Sponsorship](./operation-cast-recover-2026-registration-and-sponsorship.md)** - Active hosted event record for registration, sponsorship, Challenge Coin spotlighting, route ownership, and indexing references
- **[Cool Desert Nights 2026 Smoke n Shine Placements Archive](./cool-desert-nights-2026-public-choice-results.md)** - Event archive record with final placements and historical totals
- **[Pacific Northwest Annual BBQ Competition Record](./bbq-contest-planning-record.md)** - Dedicated route record for sponsor coordination, schedule publishing, and participation planning
- **[IRONMAN 70.3 Volunteer and Community Involvement Record](./ironman-volunteer-community-involvement.md)** - Dedicated route record for community involvement, chamber collaboration, and official IRONMAN volunteer routing

## Operations Runbooks

- **[Operation: Cast & Recover Signup Retrieval Runbook](./operation-cast-recover-signups-retrieval-runbook.md)** - Canonical codebase procedure for pulling signup sheets and roster views from D1

## Progress Snapshot - Four Dedicated Event Pages

- `/events/operation-cast-recover` - Active registration route (veteran and captain intake)
- `/events/cool-desert-nights` - Event archive detail route
- `/events/bbq-contest` - Pacific Northwest Annual BBQ Competition route
- `/events/ironman-volunteer` - Community involvement route with official external volunteer signup

## Frontend Implementation Contract (Route UX)

The events routes now follow one consistent UX contract to avoid drift between dedicated pages and dynamic templates.

- Hero must include a route-status trio: status, window/schedule, and coverage/location.
- Hero CTAs must use the standardized interaction contract (`min-h-11`, `hover:-translate-y-0.5`, and `focus-visible:outline-*`).
- Page body must expose a recap section, a quick panel, and a trust-oriented continuity section.
- Dedicated archive routes (for example `/events/cool-desert-nights`) should explicitly frame archive intent in hero and metadata copy.
- Dynamic event routes (`/events/[slug]`) must keep the same shell and interaction cadence as dedicated event pages unless an approved exception is logged.

Reference implementation owners:

- `apps/website/src/app/events/[slug]/page.tsx`
- `apps/website/src/app/events/cool-desert-nights/page.tsx`

## Logical Gap Log

- **Closed (July 24, 2026) - Legacy and dedicated route overlap:** Canonical ownership is now consolidated to `/events/cool-desert-nights`. The legacy `/cool-desert-nights` path is retained as a permanent redirect for continuity.
- **Closed (July 24, 2026) - BBQ naming transition:** Approved public name is now Pacific Northwest Annual BBQ Competition, and the canonical route remains `/events/bbq-contest` for continuity.
- **Closed (July 24, 2026) - External conversion visibility baseline:** First-party outbound CTA analytics is now implemented for official IRONMAN volunteer signup and chamber-directory engagement. Final volunteer completion remains external to MH systems.

## Gap Resolution Plan

### 1) Cool Desert Nights Canonical Consolidation

- **Owner:** Website/SEO
- **Target Date:** Closed July 24, 2026
- **Action:** Completed. Canonical target is `/events/cool-desert-nights` with legacy path redirect continuity.
- **Verification:**
  - Canonical metadata now points to `/events/cool-desert-nights`.
  - Legacy `/cool-desert-nights` is configured as a permanent redirect.
  - Canonical route manifest excludes the legacy route as an indexable endpoint.

### 2) BBQ Naming and Slug Transition

- **Owner:** Events Content + Website
- **Target Date:** Closed July 24, 2026
- **Action:** Completed. Approved public event name is Pacific Northwest Annual BBQ Competition; route retained at `/events/bbq-contest` for continuity.
- **Verification:**
  - Event page title, description, OpenGraph/Twitter, and schema use the approved naming.
  - Route manifest label is updated to the approved naming.
  - Historical route references remain valid under the existing slug.

### 3) IRONMAN External Signup Analytics Visibility

- **Owner:** Marketing Ops + Website Analytics
- **Target Date:** Closed July 24, 2026
- **Action:** Completed. First-party outbound-click measurement is now captured for the official IRONMAN volunteer CTA and local chamber directory CTA.
- **Verification:**
  - Outbound CTA click events are emitted for IRONMAN signup and chamber-directory links.
  - Documentation states that final signup completion remains external.
  - Messaging remains aligned to official volunteer routing without internal intake duplication.

## Record Standards

- Use one Markdown file per event.
- Include event metadata: name, status, and update date.
- Include ranked outcomes when applicable.
- Include event totals and a short verification note.

## Required Drift Gates

Run these after event-page UI/content updates:

- `npm run test:events:drift`

- `npm run test -- apps/website/src/app/events/__tests__/event-route-content-contract.test.ts`
- `npm run test -- apps/website/src/app/__tests__/tab-title-sitewide-contract.test.ts`
- `npm run test -- apps/website/src/app/__tests__/pages-smoke.test.tsx`
- `npm run build`

## Quick Links

- [← Back to Docs Index](../index.md)
- [Business Documentation](../business/index.md)
- [Marketing Documentation](../marketing/index.md)

---

**Built on Quality, Backed by Trust.**  
**MH Construction** — Founded 2010, Veteran-Owned Since January 2025
