# Hero Commercial Video Guardrails

**Category:** Development - Standards  
**Last Updated:** July 22, 2026

## Purpose

This standard defines the required build process and validation gates for all
hero commercial videos used across MH Construction website pages.

Current state: the production homepage now ships a manifest-driven company hero
commercial with poster fallback. The first active campaign is registered as
`mhc-command-the-horizon-2026q3-v01` and is rendered via the home hero runtime.

Inactive-mode behavior remains supported for clean rollback windows.
`check:hero-commercials` still passes in inactive mode only if both of these
are true:

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
- `seo`: Required metadata package for route-level SEO and VideoObject alignment

Required `seo` fields:

- `routePath`: Route owning this hero slot (for example `/`, `/services`, `/projects`)
- `title`: SEO title used for the route update tied to this hero update
- `description`: SEO description used for the route update tied to this hero update
- `videoObjectName`: Public-facing video name used in structured data
- `videoObjectDescription`: Structured data description
- `thumbnailPath`: Public asset path under `images/` or `videos/`
- `transcriptOrSummaryUrl`: Internal path or canonical absolute URL for transcript/summary
- `voiceoverTalent`: Must be `Jeremy Thamert`
- `presenterEntityName`: Must be `Jeremy Thamert`
- `appliesToRoutes`: Required when `campaignScope` is `company`; list of active routes using the shared company hero asset
- `radioPartners`: Exactly one attribution partner per video using approved names only:
  - `Stephens Media Group`
  - `Townsquare Media`

Route sync requirement:

- Every `seo.routePath` must map to an active `src/app/**/page.tsx` route.
- Route-group folders such as `(marketing)` are ignored during route matching.
- At least one SEO text field (`title`, `description`, `videoObjectName`, or `videoObjectDescription`) must include `Jeremy Thamert` for person-entity discoverability.

Example:

```json
[
  {
    "campaignScope": "company",
    "id": "mhc-command-the-horizon-2026q3-v01",
    "mp4": "videos/hero-commercials/mhc-hero-command-the-horizon-smg-2026q3-v01.mp4",
    "webm": "videos/hero-commercials/mhc-hero-command-the-horizon-smg-2026q3-v01.webm",
    "expectedDurationSec": 61.06,
    "audioRequired": true,
    "seo": {
      "routePath": "/",
      "title": "MH Construction Company Hero with Jeremy Thamert",
      "description": "Jeremy Thamert voices this MH Construction Company hero campaign with relationship-first construction leadership and field accountability.",
      "videoObjectName": "MH Construction Company Hero Commercial - Jeremy Thamert",
      "videoObjectDescription": "Hero commercial for / featuring Jeremy Thamert as voice and presenter for MH Construction campaign messaging.",
      "thumbnailPath": "videos/hero-commercials/poster-mhc-hero-command-the-horizon-smg-2026q3-v01.jpg",
      "transcriptOrSummaryUrl": "/",
      "voiceoverTalent": "Jeremy Thamert",
      "presenterEntityName": "Jeremy Thamert",
      "appliesToRoutes": ["/", "/services", "/about", "/contact"],
      "radioPartners": ["Stephens Media Group"]
    }
  }
]
```

## Build Standard For New Hero Ads

1. Start from mastered source (do not chain transcodes).
2. Encode MP4 (H.264 + AAC) with faststart.
3. Keep final MP4 below Cloudflare 25 MiB hard limit.
4. Keep filename lowercase kebab-case and use the canonical hero naming scheme.
5. Update `hero-commercials.json` with exact expected duration.
6. Add the required `seo` object for the route tied to that hero slot.
7. Set `seo.voiceoverTalent` and `seo.presenterEntityName` to `Jeremy Thamert`.
8. Include `Jeremy Thamert` in at least one SEO text field for entity relevance.
9. Confirm radio partner attribution names match approved values exactly.
10. If replacing an existing slot, use a new filename to avoid stale caches.

### Canonical Hero Filename Convention

Format:

- Company-wide campaign: `mhc-hero-{campaignKey}-{partnerCode}-{year}q{quarter}-v{revision}.{ext}`
- Route-specific campaign: `{routeKey}-hero-{campaignKey}-{partnerCode}-{year}q{quarter}-v{revision}.{ext}`

Where:

- `routeKey`: derived from `seo.routePath` (route-specific mode only)
  - `/` -> `home`
  - `/services` -> `services`
  - `/public-sector/tri-state-government-construction` -> `public-sector-tri-state-government-construction`
- `campaignKey`: short descriptor of the campaign theme (for example `quality-safety`, `civil-infrastructure`, `commercial-remodel`)
- `partnerCode`: one of `smg`, `tsm`
  - `smg` = Stephens Media Group
  - `tsm` = Townsquare Media
- `year` and `quarter`: campaign period token such as `2026q3`
- `revision`: two-digit revision token (`v01`, `v02`, ...)
- `ext`: `mp4` or `webm`

Examples:

- `mhc-hero-quality-safety-smg-2026q3-v01.mp4`
- `home-hero-quality-safety-tsm-2026q3-v01.mp4`
- `services-hero-commercial-remodel-smg-2026q3-v02.webm`
- `public-sector-tri-state-government-construction-hero-infrastructure-tsm-2026q4-v01.mp4`

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
- Canonical filename structure for scope, route/prefix, partner code, period, and revision
- Single-partner enforcement (Stephens OR Townsquare per video)
- Workers size limit compliance (25 MiB max)
- MP4 contains video stream
- MP4 contains audio stream when `audioRequired` is true
- MP4 duration matches `expectedDurationSec` within tolerance
- Required SEO payload per hero entry (`seo` object)
- Route-path ownership and metadata presence for SEO updates
- Route synchronization check between `seo.routePath` and real app routes
- VideoObject schema-ready fields for each hero video
- Jeremy-led voice authority fields and person-entity SEO signal
- Approved radio partner attribution naming for overlayed radio-ad videos

## Pipeline Enforcement

Guardrails run in both:

- CI quality checks (`.github/workflows/ci-cd.yml`)
- Deploy preflight (`scripts/deploy-opennext.mjs`)

A failing guardrail blocks deploy.

## Auto Manifest Entry Generator

Use the generator to create a compliant entry with naming, SEO metadata,
Jeremy voice authority fields, and approved radio partner mapping:

```bash
pnpm --filter @mhc/website run hero-commercials:entry -- \
  --campaignScope company \
  --routePath / \
  --appliesToRoutes /,/services,/about,/contact \
  --campaignKey brand-awareness \
  --partnerCode smg \
  --year 2026 \
  --quarter 3 \
  --revision 1 \
  --durationSec 61.03
```

Command behavior:

- Prints a generated JSON manifest entry by default.
- Appends entry to `apps/website/config/hero-commercials.json` when `--write` is provided.
- Rejects unknown routes, invalid partner code, and malformed period/revision input.
- Supports `campaignScope` values:
  - `company`: uses `mhc-hero-...` filenames and requires `seo.appliesToRoutes`
  - `route`: uses `{routeKey}-hero-...` filenames for slot-specific variants
- Auto-fills:
  - `voiceoverTalent: "Jeremy Thamert"`
  - `presenterEntityName: "Jeremy Thamert"`
  - Canonical media filenames and poster path

## Rollout Checklist For Each New Hero Video

1. Place encoded files in `public/videos/hero-commercials/`.
2. Add or update entry in `apps/website/config/hero-commercials.json`.
3. Add per-route `seo` metadata and approved radio partner attribution.
4. Set Jeremy voice authority fields in `seo`.
5. Point page hero component to the new filename.
6. Run:

```bash
pnpm --filter @mhc/website run check:hero-commercials
pnpm run build
```

1. Verify in browser:

- Video appears quickly on first load
- Audio plays after user interaction
- Full runtime plays to final frame

1. Verify SEO release data:

- Route metadata reflects current hero campaign wording
- Structured data (VideoObject) fields match manifest values
- Jeremy Thamert appears in required voice/presenter fields and at least one SEO text field
- Transcript or summary URL resolves for user and crawler access
- Partner attributions in supporting copy use approved names

## Related Docs

- `docs/branding/standards/hero-section-standards.md`
- `docs/media/media-strategy.md`
- `docs/deployment/cloudflare-guide.md`

## Homepage Radio Ad Attribution (Current)

Current active campaign (company-wide homepage hero):

- Campaign ID: `mhc-command-the-horizon-2026q3-v01`
- Campaign title: `Command the Horizon`
- Presenter and voiceover: Jeremy Thamert
- Production partner: Stephens Media Group
- Partner reference:
  [Stephens Media Group Facebook](https://www.facebook.com/pages/Stephens%20Media%20Group/546164552551953/#)

When this campaign is replaced, update manifest fields, media filenames, and
structured data in one coordinated change so the home hero, SEO metadata, and
attribution remain synchronized.
