# Veterans Initiative

**Category**: Business
**Last Updated**: 2025-11-11
**Status**: ✅ Current

## Overview

MH Construction is a veteran-owned company committed to honoring service members and supporting
veterans in our communities. Our leadership includes Army veteran Jeremy Thamert and Navy veteran
Matt Ramsey. This document outlines our public-facing Veterans Initiative, annual event planning,
sponsorship opportunities, and developer notes for maintaining related website content.

## Our Commitment

- Veteran-owned business since January 2025.
- Priority hiring and apprenticeship programs for veterans and transitioning service members.
- Preferential bidding and support for veteran-owned trade partners.
- Year-round community engagement including education, scholarships, and events.

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
- No cost for veteran participants; fully sponsored by local partners and corporate sponsors.

## Sponsorship & In-Kind Support

Sponsorship makes the event possible. Typical sponsorship levels and benefits (mirrored on the public web page):

- Platinum Sponsor — $10,000+
  - Title sponsor recognition, logo on t-shirts and promotional materials, speaking opportunity,
    social promotion, 10 complimentary registrations.

- Gold Sponsor — $5,000+
  - Premier recognition, logo on t-shirts and banners, social promotion, 6 complimentary registrations.

- Silver Sponsor — $2,500+
  - Sponsor recognition in materials, logo on website, social mentions, 4 complimentary registrations.

- Bronze Sponsor — $1,000+
  - Name recognition in materials, social mentions, 2 complimentary registrations.

In-kind donations welcome:

- Boats & captains, food & beverage, fishing gear, prizes & giveaways, photography/video, professional services.

Contact for sponsorship inquiries:

- Email: <office@mhc-gc.com> (subject: "Veterans Event Sponsorship")

## Communications & Media

- Press releases and social media posts will announce registration and sponsorship opportunities.
- Sponsors will be acknowledged across on-site signage, social channels, and event materials.

## Developer & Content Notes

- Public page: `src/app/veterans/page.tsx` — primary public-facing page for this initiative. The
  page already contains hero, event, sponsorship tiers, schedule, and CTAs.
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
