# Phase 7.3 Media Audit

**Category:** Media Audit  
**Last Updated:** July 22, 2026

## Active First-View Media

- Homepage hero commercial (MP4)
  - Source path: approved commercial master
  - Derivative path: `/public/videos/hero-commercials/mhc-hero-command-the-horizon-smg-2026q3-v01.mp4`
  - Format and size: MP4, `22,696,650` bytes
  - Loading priority: metadata preload
  - Alt text: `MH Construction homepage hero video highlighting project delivery leadership by Jeremy Thamert`
  - Rights/status: approved repository asset currently in production
  - Rendering component: [apps/website/src/components/home/HeroSectionClient.tsx](/workspaces/mh-website/apps/website/src/components/home/HeroSectionClient.tsx)

- Homepage hero commercial (WebM)
  - Source path: approved commercial master
  - Derivative path: `/public/videos/hero-commercials/mhc-hero-command-the-horizon-smg-2026q3-v01.webm`
  - Format and size: WebM, `4.4 MB`
  - Loading priority: metadata preload
  - Alt text: `MH Construction homepage hero video highlighting project delivery leadership by Jeremy Thamert`
  - Rights/status: approved repository asset currently in production
  - Rendering component: [apps/website/src/components/home/HeroSectionClient.tsx](/workspaces/mh-website/apps/website/src/components/home/HeroSectionClient.tsx)

- Homepage hero poster (video fallback frame)
  - Derivative path: `/public/videos/hero-commercials/poster-mhc-hero-command-the-horizon-smg-2026q3-v01.jpg`
  - Format and size: JPG, generated frame
  - Loading priority: poster fallback
  - Rights/status: derived repository asset currently in production
  - Rendering component: [apps/website/src/components/home/HeroSectionClient.tsx](/workspaces/mh-website/apps/website/src/components/home/HeroSectionClient.tsx)

- Homepage static fallback poster
  - Derivative path: `/public/images/home-hero-poster.webp`
  - Format and size: WebP, `48,094` bytes
  - Loading priority: fallback only
  - Alt text: `MH Construction project leadership and team collaboration`
  - Rights/status: approved repository asset currently in production
  - Rendering component: [apps/website/src/components/home/HeroSection.tsx](/workspaces/mh-website/apps/website/src/components/home/HeroSection.tsx)

## Pipeline Status

- Surface: Hero commercial video pipeline
  - Status: Active
  - Reason: `config/hero-commercials.json` is present and registered media is available in `public/videos/hero-commercials/`.
  - Current fallback: poster fallback remains available in [apps/website/src/components/home/HeroSection.tsx](/workspaces/mh-website/apps/website/src/components/home/HeroSection.tsx).

## Notes

- Command the Horizon (`mhc-command-the-horizon-2026q3-v01`) is the active company-wide home hero campaign.
- The `check:hero-commercials` validator enforces registration, naming, single-partner attribution, and SEO metadata for active hero media.
- External map embed behavior remains facade-gated and user-activated in [apps/website/src/app/contact/MapFacade.tsx](/workspaces/mh-website/apps/website/src/app/contact/MapFacade.tsx).
