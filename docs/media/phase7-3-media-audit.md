# Phase 7.3 Media Audit

**Category:** Media Audit  
**Last Updated:** July 19, 2026

## Active First-View Media

| Surface              | Source path                      | Derivative path                        | Dimensions | Format | File size      | Loading priority         | Alt text                                                    | Caption/Credit | Rights/Source status                              | Rendering component                                                                                                                          |
| -------------------- | -------------------------------- | -------------------------------------- | ---------- | ------ | -------------- | ------------------------ | ----------------------------------------------------------- | -------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage hero poster | repository-managed poster master | `/public/images/home-hero-poster.webp` | `1280x720` | WebP   | `48,094` bytes | `priority` on first view | `MH Construction project leadership and team collaboration` | None           | Approved repository asset currently in production | [apps/website/src/components/home/HeroSection.tsx](/workspaces/mh-website/apps/website/src/components/home/HeroSection.tsx) via `next/image` |

## Withheld Media

| Surface                        | Status              | Reason                                                                                                                                                                             | Current fallback                                                                                                                                  |
| ------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero commercial video pipeline | Withheld / inactive | `config/hero-commercials.json` is intentionally absent and `public/videos/hero-commercials/` is empty; no approved commercial-video asset is currently checked into the repository | Static hero poster in [apps/website/src/components/home/HeroSection.tsx](/workspaces/mh-website/apps/website/src/components/home/HeroSection.tsx) |

## Notes

- No new media assets were added, republished, or externally uploaded during Phase 7.3.
- The `check:hero-commercials` validator now treats the hero-commercial pipeline as inactive only when both the manifest and hero-commercial media files are absent.
- External map embed behavior remains facade-gated and user-activated in [apps/website/src/app/contact/MapFacade.tsx](/workspaces/mh-website/apps/website/src/app/contact/MapFacade.tsx).
