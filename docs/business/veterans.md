# Veterans Initiative

**Category**: Business
**Last Updated**: 2025-11-11
**Status**: ✅ Current

## Overview

MH Construction is a veteran-owned company committed to honoring service members and supporting
veterans in our communities. The company is owned and led by Army veteran Jeremy Thamert, with
Navy veteran Matt Ramsey serving as Digital Marketing Manager. This document outlines our public-facing
Veterans Initiative, annual event planning, organizational partnership opportunities, and developer notes
for maintaining related website content.

**IMPORTANT**: MH Construction does not collect donations. We seek organizational partnerships where
partner organizations contribute resources, services, or expertise while MH Construction provides
event management, construction industry platform, and logistics coordination.

## Our Commitment

- Veteran-owned business since January 2025.
- Priority hiring for veterans (active now).
- Apprenticeship programs and veteran trade partner networks in development.
- Building long-term partnerships with veteran organizations as we establish company longevity.
- Year-round community engagement including events and growing veteran support initiatives.

## Annual Veterans Fishing Classic — Spring 2026 (Inaugural)

Overview:

- A benefit event honoring veterans and their families.
- Expected participation: 100–150 veterans and family members.
- Community boats: 40+ volunteer boats and experienced captains from the local boating community.
- Event location: Pacific Northwest waters (marina TBD).
- Event format: Guided fishing experiences, food, awards, and entertainment.

Event day highlights:

- Morning: Registration, breakfast, safety briefing, boat assignments (6:00 AM - 7:00 AM).
- On-water activities: 7:00 AM - 5:00 PM (guided fishing, instruction, camaraderie).
- Evening: Return, fish cleaning, BBQ, awards, live entertainment (5:00 PM - 8:00 PM).

Registration:

- Veteran registration opens January 2026. Limited spaces; first come, first served.
- No cost for veteran participants; event made possible through organizational partnerships.

## Organizational Partnership Model

MH Construction partners with organizations to co-host veteran events. This is NOT a donation/sponsorship model.
Partner organizations contribute resources aligned with their mission, while MH Construction provides event
management, logistics, and construction industry connections.

### Partnership Tiers

- **Title Event Partner**
  - For: Major corporations, national non-profits, veteran service organizations (VFW, American Legion, WWP, etc.)
  - Organization Provides: Event funding/resources, volunteer networks, specialized services
  - MH Construction Provides: Event management, construction platform, co-branded marketing, activation space

- **Co-Host Event Partner**
  - For: Regional businesses, community foundations, veteran advocacy groups
  - Organization Provides: Partial event resources, member network access, organizational expertise
  - MH Construction Provides: Event infrastructure, collaborative branding, attendee engagement space

- **Supporting Event Partner**
  - For: Local non-profits, veteran chapters, community organizations
  - Organization Provides: In-kind services, volunteer assistance, specialized expertise
  - MH Construction Provides: Partner recognition, website listing, veteran attendee connections

- **Resource Contributor Partner**
  - For: Businesses providing specific resources (boats, catering, equipment, services)
  - Organization Provides: Equipment, supplies, or professional services
  - MH Construction Provides: Resource partner recognition, social media appreciation

### Example Partner Contributions

Organizations contribute what aligns with their capabilities:

- Boats & captains, food & catering, fishing gear, prizes & awards, media services,
  volunteer networks, veteran services outreach, event entertainment

Contact for partnership inquiries:

- Email: <office@mhc-gc.com> (subject: "Veterans Event Partnership")

## Communications & Media

- Press releases and social media posts will announce registration and partnership opportunities.
- Partner organizations will be acknowledged across on-site signage, social channels, and event materials.

## Developer & Content Notes

- Public page: `src/app/veterans/page.tsx` — primary public-facing page for this initiative. The
  page contains hero, event details, partnership tiers, schedule, and CTAs.
- Partnership Model: The page clearly communicates that MH Construction seeks organizational
  co-hosts, NOT donations. Partnership tiers show what each organization provides vs what MHC provides.
- Navigation: Global `Navigation` includes a link to `/veterans`; `Footer` has a Veterans link and
  a Veteran-Owned badge.
- SEO: `src/app/veterans/page.tsx` includes `metadata` and `openGraph` fields — update them when
  event details change.
- If you want the public page to render from markdown, consider adding an MDX pipeline (`next-mdx`
  or similar) and moving content to `docs/business/veterans.md` as source of truth.

## Next Steps (for the team)

- Finalize marina and exact event date for Spring 2026.
- Confirm sponsor outreach list and start sponsor invitations Q1 2026.
- Create registration form (veteran sign-up) and sponsor intake form (could be simple
  `/contact?sponsor=veterans` link or a dedicated form endpoint).
- Consider adding an events archive page after the first event with photos and outcomes.

---

Maintained by: MH Construction Partnerships & Communications
Document path: `docs/business/veterans.md`
