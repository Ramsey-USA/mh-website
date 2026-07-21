# Client Boundary Audit (Phase 7.4)

**Category:** Performance - Client Boundary Audit  
**Last Updated:** July 19, 2026

## Scope

Phase 7.4 reviewed the current client-component set with emphasis on the surfaces named in the prompt: project filters, event filters, testimonial carousel, home hero client code, chat, PWA prompts, maps, charts, and News/Event rendering.

## Boundary Inventory

| Surface                        | File                                                                                                                                                          | Browser-only requirement                                                                                 | Status                                                                                            |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| News card renderer             | [apps/website/src/components/ui/ContentCard.tsx](/workspaces/mh-website/apps/website/src/components/ui/ContentCard.tsx)                                       | None. Static card markup, link rendering, and icon composition only.                                     | Converted to Server Component in Phase 7.4                                                        |
| Project landing page shell     | [apps/website/src/app/projects/ProjectsPageClient.tsx](/workspaces/mh-website/apps/website/src/app/projects/ProjectsPageClient.tsx)                           | Analytics hook plus deferred interactive sections via `dynamic()` imports.                               | Remains client for analytics/deferred behavior                                                    |
| Events landing carousel        | [apps/website/src/app/events/EventsLandingPageClient.tsx](/workspaces/mh-website/apps/website/src/app/events/EventsLandingPageClient.tsx)                     | `useState` for active slide and click-driven slide navigation.                                           | Remains client                                                                                    |
| Testimonials carousel          | [apps/website/src/components/testimonials/TestimonialsCarousel.tsx](/workspaces/mh-website/apps/website/src/components/testimonials/TestimonialsCarousel.tsx) | `useState`, `useEffect`, autoplay timer, and manual carousel controls.                                   | Remains client                                                                                    |
| Chat lazy loader               | [apps/website/src/components/chatbot/ChatWidgetLazy.tsx](/workspaces/mh-website/apps/website/src/components/chatbot/ChatWidgetLazy.tsx)                       | `window` event listeners, idle callback scheduling, and pathname-aware deferred hydration.               | Remains client                                                                                    |
| PWA manager                    | [apps/website/src/components/pwa/PWAManager.tsx](/workspaces/mh-website/apps/website/src/components/pwa/PWAManager.tsx)                                       | Service worker registration state and install/update lifecycle effects.                                  | Remains client                                                                                    |
| Contact map facade             | [apps/website/src/app/contact/MapFacade.tsx](/workspaces/mh-website/apps/website/src/app/contact/MapFacade.tsx)                                               | Click-to-activate third-party iframe facade via local state.                                             | Remains client                                                                                    |
| Skills radar chart             | [apps/website/src/components/team/SkillsRadarChart.tsx](/workspaces/mh-website/apps/website/src/components/team/SkillsRadarChart.tsx)                         | `recharts` runtime, `IntersectionObserver`, and chart mount visibility state.                            | Remains client                                                                                    |
| Legacy video hero controller   | [apps/website/src/components/home/HeroSectionClient.tsx](/workspaces/mh-website/apps/website/src/components/home/HeroSectionClient.tsx)                       | Media element refs, `matchMedia`, `navigator.connection`, `IntersectionObserver`, and playback controls. | Legacy client path remains documented; current production hero uses server-rendered static poster |
| Contact page interactive shell | [apps/website/src/app/contact/ContactPageClient.tsx](/workspaces/mh-website/apps/website/src/app/contact/ContactPageClient.tsx)                               | Form state, submit locking, offline detection, analytics, and deferred map activation.                   | Remains client                                                                                    |

## Change Applied

- Removed the unnecessary client boundary from [apps/website/src/components/ui/ContentCard.tsx](/workspaces/mh-website/apps/website/src/components/ui/ContentCard.tsx).
- Verified server-rendered usage continues to work in [apps/website/src/app/news/page.tsx](/workspaces/mh-website/apps/website/src/app/news/page.tsx) and [apps/website/src/app/about/details/page.tsx](/workspaces/mh-website/apps/website/src/app/about/details/page.tsx).

## Measurement

### Baseline bundle snapshot

Command: `npm run bundle:report`

Largest chunks before the change:

- `560K  .next/static/chunks/1vfwpdyjsfl8u.js`
- `452K  .next/static/chunks/1ndv5fcqm46zl.js`
- `228K  .next/static/chunks/2qtt0728slkhp.js`
- `144K  .next/static/chunks/33fcxsqeao9jd.js`
- `112K  .next/static/chunks/0cz1d0mv5g_q7.js`
- `76K   .next/static/chunks/0yu1g96-31-73.js`
- `72K   .next/static/chunks/3mj6ky0roxd-e.js`
- `72K   .next/static/chunks/24ts_93ahom57.js`
- `64K   .next/static/chunks/0q7cvdis4c1m6.js`
- `60K   .next/static/chunks/30gdsbm4lhi_r.js`

### After conversion

Commands:

- `npm run build:next`
- `npm run bundle:report`

Largest chunks after the change:

- `560K  .next/static/chunks/1vfwpdyjsfl8u.js`
- `452K  .next/static/chunks/1ndv5fcqm46zl.js`
- `228K  .next/static/chunks/2qtt0728slkhp.js`
- `144K  .next/static/chunks/33fcxsqeao9jd.js`
- `112K  .next/static/chunks/0cz1d0mv5g_q7.js`
- `72K   .next/static/chunks/3mj6ky0roxd-e.js`
- `72K   .next/static/chunks/24ts_93ahom57.js`
- `72K   .next/static/chunks/1b3ztde72kwxp.js`
- `64K   .next/static/chunks/0q7cvdis4c1m6.js`
- `60K   .next/static/chunks/30gdsbm4lhi_r.js`

### Measurement note

- The `ContentCard` boundary removal was valid and preserved server rendering, but it did not materially change the top-10 chunk summary at this reporting granularity.
- This still improves boundary correctness by preventing a static card primitive from requiring client hydration on server routes.
