# Hero Commercial Video Guardrails

**Category:** Development - Standards  
**Last Updated:** July 17, 2026

## Purpose

This standard defines the required build process and validation gates for all
hero commercial videos used across MH Construction website pages.

Current state: the production homepage currently ships a static poster image,
not a checked-in hero commercial video. The hero-commercial pipeline is
therefore inactive until approved video assets are restored. When inactive,
`check:hero-commercials` passes only if both of these are true:

- `apps/website/config/hero-commercials.json` is absent
- `apps/website/public/videos/hero-commercials/` contains no registered media

Use this whenever adding or replacing videos under:

- `public/videos/hero-commercials/`

## Why This Exists

Recent production issues exposed recurring failure modes:

- Silent exports (no audio stream)
- Truncated encodes (end of ad cut off)
- Files that exceed Cloudflare Workers asset limits
- Cache collisions after replacing media at the same URL

These guardrails make future hero video uploads predictable and safe.

## Required Source Of Truth

When the hero-commercial pipeline is active, all hero commercials must be
registered in:

- `apps/website/config/hero-commercials.json`

Each entry requires:

- `id`: Stable identifier for page/slot
- `mp4`: Public MP4 path
- `webm`: Public WebM path (optional but recommended)
- `expectedDurationSec`: Expected full runtime in seconds
- `audioRequired`: `true` for spoken/commercial ads

Example:

```json
[
  {
    "id": "home",
    "mp4": "videos/hero-commercials/home-hero-optimized-audio.mp4",
    "webm": "videos/hero-commercials/home-hero-optimized-audio.webm",
    "expectedDurationSec": 61.03,
    "audioRequired": true
  }
]
```

## Build Standard For New Hero Ads

1. Start from mastered source (do not chain transcodes).
2. Encode MP4 (H.264 + AAC) with faststart.
3. Keep final MP4 below Cloudflare 25 MiB hard limit.
4. Keep filename lowercase kebab-case.
5. Update `hero-commercials.json` with exact expected duration.
6. If replacing an existing slot, use a new filename to avoid stale caches.

Suggested MP4 command:

```bash
ffmpeg -hide_banner -loglevel error -nostats -y \
  -i input-master.mp4 \
  -map 0:v:0 -map 0:a:0 \
  -c:v libx264 -preset medium -crf 26 \
  -maxrate 2200k -bufsize 4400k \
  -pix_fmt yuv420p \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  output-hero.mp4
```

## Automated Guardrails

The following validator is now mandatory:

- `pnpm --filter @mhc/website run check:hero-commercials`

Validator path:

- `apps/website/scripts/validation/check-hero-commercial-guardrails.js`

It enforces:

- Inactive-pipeline pass when no manifest and no hero-commercial assets exist
- Manifest integrity (`hero-commercials.json`)
- Registration of all files in `public/videos/hero-commercials/`
- File naming pattern (lowercase kebab-case)
- Workers size limit compliance (25 MiB max)
- MP4 contains video stream
- MP4 contains audio stream when `audioRequired` is true
- MP4 duration matches `expectedDurationSec` within tolerance

## Pipeline Enforcement

Guardrails run in both:

- CI quality checks (`.github/workflows/ci-cd.yml`)
- Deploy preflight (`scripts/deploy-opennext.mjs`)

A failing guardrail blocks deploy.

## Rollout Checklist For Each New Hero Video

1. Place encoded files in `public/videos/hero-commercials/`.
2. Add or update entry in `apps/website/config/hero-commercials.json`.
3. Point page hero component to the new filename.
4. Run:

```bash
pnpm --filter @mhc/website run check:hero-commercials
pnpm run build
```

1. Verify in browser:

- Video appears quickly on first load
- Audio plays after user interaction
- Full runtime plays to final frame

## Related Docs

- `docs/branding/standards/hero-section-standards.md`
- `docs/media/media-strategy.md`
- `docs/deployment/cloudflare-guide.md`

## Homepage Radio Ad Attribution (Current)

Archive these details only if an approved home hero commercial asset is
restored. They are not active runtime requirements for the current static hero
poster experience:

- Presenter and voiceover: Jeremy Thamert
- Production partner: Stephens Media Group
- Partner reference:
  [Stephens Media Group Facebook](https://www.facebook.com/pages/Stephens%20Media%20Group/546164552551953/#)
- Broadcast placements: [94.9 The WOLF](https://949thewolf.com/) and local ESPN channel

When updating the asset, ensure structured data and page metadata continue to
reflect the active presenter, production partner, and station placement facts.
