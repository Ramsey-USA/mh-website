# MH Construction — Media Strategy & Photo/Video Roadmap

> **Purpose:** Step-by-step guide for systematically introducing photos,
> videos, and graphics across the site — with a folder structure, naming
> conventions, SEO rules, and a path toward automated testimonial
> distribution to social media and email.

---

## Table of Contents

1. [Folder Structure](#1-folder-structure)
2. [File Naming Conventions](#2-file-naming-conventions)
3. [Replacing Placeholders](#3-replacing-placeholders)
4. [Optimization Rules](#4-optimization-rules)
5. [SEO Requirements for Every Image](#5-seo-requirements-for-every-image)
6. [Testimonials — Photo + Distribution Workflow](#6-testimonials--photo--distribution-workflow)
7. [Social Media Auto-Post (n8n)](#7-social-media-auto-post-n8n)
8. [Email Blast Automation (n8n + Resend)](#8-email-blast-automation-n8n--resend)
9. [Open Graph Images per Page](#9-open-graph-images-per-page)
10. [Video Workflow](#10-video-workflow)
11. [Checklist — Adding New Media](#11-checklist--adding-new-media)
12. [Rollout Priority Order](#12-rollout-priority-order)

---

## 1. Folder Structure

Everything lives under `public/`. The reorganized layout below adds new
folders for testimonials, case-study photos, social graphics, and videos.
**Existing paths are preserved so no current code breaks.**

```
public/
├── images/
│   ├── blog/                  # Blog post hero/thumbnail images
│   ├── bbb/                   # BBB accreditation seals (keep)
│   ├── compliance/            # Prevailing-wage, bonding, safety, veteran (keep)
│   │   └── mvr-records/       # ← NEW: redacted annual driver qualification logs (MVR)
│   ├── credentials/           # Chamber & association logos (keep)
│   ├── culture/               # Job-site life / team culture shots (keep)
│   │
│   ├── logo/                  # Brand marks (keep)
│   │
│   ├── news/                  # News article thumbnails
│   ├── og/                    # Open-Graph images — one per page (rename from og-default.*)
│   │   ├── og-home.webp       # 1200 × 630
│   │   ├── og-testimonials.webp
│   │   ├── og-projects.webp
│   │   └── ...one per route
│   │
│   ├── patterns/              # SVG/CSS pattern overlays (keep)
│   ├── projects/              # Project portfolio photos (keep)
│   │   └── [slug]/            # ← NEW: one subfolder per project
│   │       ├── hero.webp      # 1200 × 684 — main card image
│   │       ├── before-01.webp # Before photos
│   │       ├── after-01.webp  # After photos
│   │       └── detail-01.webp # Close-up / finish detail
│   │
│   ├── qr-codes/              # QR codes (keep)
│   │
│   ├── safety/                # Safety program section images (keep)
│   │
│   ├── social/                # ← NEW: pre-sized graphics for social posts
│   │   ├── templates/         # Canva/Figma export base images
│   │   ├── testimonials/      # Auto-generated testimonial share cards
│   │   │   └── [id].webp      # e.g. client-001.webp  (1080 × 1080)
│   │   └── announcements/     # Project completion, milestone posts
│   │
│   ├── team/                  # Team headshots (keep)
│   │
│   ├── testimonials/          # ← NEW: client/site photos tied to reviews
│   │   ├── client-001.webp    # Photo at project site (matches testimonial id)
│   │   ├── client-002.webp
│   │   └── ...
│   │
│   ├── textures/              # Background textures (keep)
│   ├── values/                # Values section images (keep)
│   └── vendors/               # Vendor/ally partner logos (keep)
│
├── videos/
│   ├── testimonials/          # ← NEW: short client video testimonials
│   │   └── client-001.mp4     # matches testimonial id
│   ├── projects/              # ← NEW: project walkthrough / time-lapse
│   │   └── [slug].mp4
│   ├── culture/               # ← NEW: recruitment / culture reels
│   └── mh_veterans_day_vid.mp4  # existing (keep)
│
├── documents/
│   └── subcontractors/        # ← NEW: Subcontractor Matrix + verified COI/AIE templates
│       ├── subcontractor-matrix.xlsx   # Master list with insurance expiration dates
│       ├── coi-template.pdf            # Certificate of Insurance template
│       └── aie-template.pdf            # Additional Insured Endorsement template
│
└── fonts/                     # (keep)
```

### Key principles

- **One folder per context** — never mix testimonial photos with team
  headshots or project photos.
- **MVR records privacy** — files in `compliance/mvr-records/` must be redacted before storage (no SSNs, full DOBs, or license numbers visible). These are reference logs only; never serve them as public assets.
- **Subcontractor documents** — `documents/subcontractors/` is for internal operational use. Track COI expiration dates in the Subcontractor Matrix and keep AIE templates aligned with Washington State statute of repose requirements.
- **ID matching** — a testimonial with `id: "client-001"` has its photo at
  `/images/testimonials/client-001.webp` and its social card at
  `/images/social/testimonials/client-001.webp`.
- **Slug matching** — a project with `slug: "kennewick-office-renovation"`
  has photos under `/images/projects/kennewick-office-renovation/`.

---

## 2. File Naming Conventions

| Context           | Pattern                      | Example                                           |
| ----------------- | ---------------------------- | ------------------------------------------------- |
| Testimonial photo | `[id].webp`                  | `client-001.webp`                                 |
| Project hero      | `hero.webp`                  | `hero.webp` (inside slug folder)                  |
| Project gallery   | `[type]-[nn].webp`           | `after-01.webp`, `detail-03.webp`                 |
| Social card       | `[id].webp`                  | `client-001.webp` (inside `social/testimonials/`) |
| OG image          | `og-[page-slug].webp`        | `og-testimonials.webp`                            |
| Team headshot     | `[first-last].webp`          | `matt-ramsey.webp`                                |
| Video             | `[id-or-slug].mp4` + `.webm` | `client-001.mp4`                                  |

**Rules:**

- All lowercase, hyphens only — no spaces, no underscores, no camelCase in filenames.
- Always provide `.webp`; keep the original `.jpg`/`.png` only as a source archive.
- Videos: always provide both `.mp4` (H.264) and `.webm` (VP9) for browser compatibility.

---

## 3. Replacing Placeholders

The five placeholder images below are used site-wide as fallbacks when no
real photo exists. Replace them one category at a time.

| Placeholder file           | Used for                             | Replace with                           |
| -------------------------- | ------------------------------------ | -------------------------------------- |
| `placeholder.webp`         | Generic fallback in `OptimizedImage` | A branded MH Construction background   |
| `placeholder-project.webp` | Project cards with no photo          | Real project hero shot                 |
| `placeholder-team.webp`    | Team cards with no headshot          | A branded silhouette + MH logo overlay |
| `placeholder-blog.webp`    | Blog post with no hero               | Section-appropriate construction scene |
| `placeholder-news.webp`    | News item with no image              | Press/event photo or branded banner    |

**How to swap a placeholder:**

1. Drop the new `.webp` in the correct folder (see §1).
2. Run `npm run optimize:images` — it skips existing WebP; use `--force`
   only when replacing an existing WebP with a higher-quality source.
3. Reference the new path in the data file (e.g., `testimonials.ts`) or
   component prop.
4. Check `npm run check:image-sizes` — no file should exceed 1920 px wide
   (800 px for avatars/cards).

---

## 4. Optimization Rules

These apply to every image added to the project.

| Dimension context               | Max width                    | Quality |
| ------------------------------- | ---------------------------- | ------- |
| Full-width hero / background    | 1920 px                      | 85 WebP |
| Section image / content block   | 1200 px                      | 85 WebP |
| Card thumbnail / project card   | 800 px                       | 85 WebP |
| Team headshot / avatar          | 800 px                       | 85 WebP |
| Social share card (square)      | 1080 px                      | 90 WebP |
| OG / social preview (landscape) | 1200 px (1200 × 630)         | 90 WebP |
| QR codes                        | Original size (never resize) | —       |

**Always run before committing new images:**

```bash
npm run optimize:images       # converts JPG/PNG → WebP, resizes to category max
npm run check:image-sizes     # confirms no WebP exceeds 1920 px
npm run audit:images          # full report with format counts and large-file list
```

**`--force` flag** — use only when replacing an existing WebP from a better
source file:

```bash
npm run optimize:images -- --force
```

---

## 5. SEO Requirements for Every Image

### 5a. `alt` text

Every `<Image>` (Next.js) must have a descriptive `alt` attribute:

```tsx
// Bad
<Image src="..." alt="photo" />
<Image src="..." alt="" />

// Good
<Image
  src="/images/projects/kennewick-office-renovation/hero.webp"
  alt="Completed commercial office renovation in Kennewick WA — open floor plan with exposed concrete"
/>
```

**Formula:** `[what is shown] in [city, state] — [key detail]`

For testimonial photos: `[Client first name] at their [project type] completed by MH Construction in [city]`

### 5b. Structured data (Schema.org)

Testimonials already emit `Review` schema via `review-schema.ts`. When a
testimonial has a real photo, add `image` to the schema:

```ts
// src/lib/seo/review-schema.ts — add to generateReviewSchema()
image: testimonialPhotoUrl ?? undefined,
```

Projects should emit `ImageObject` schema for each gallery photo:

```ts
{
  "@type": "ImageObject",
  "url": "https://www.mhc-gc.com/images/projects/kennewick-office-renovation/hero.webp",
  "width": 1200,
  "height": 684,
  "name": "Kennewick Commercial Office Renovation — before & after",
  "description": "..."
}
```

### 5c. Open Graph images

Each page should have its own OG image (1200 × 630 px WebP) stored in
`public/images/og/`. The fallback `og-default.webp` is used today for all
pages — replace them progressively:

```ts
// src/lib/seo/page-seo-utils.ts — update per page
openGraph: {
  images: [{ url: "/images/og/og-testimonials.webp", width: 1200, height: 630 }],
}
```

### 5d. `sizes` attribute

Always set an accurate `sizes` prop on `<Image>` so the browser downloads
the smallest useful variant (Next.js generates srcsets):

```tsx
// Hero (full width)
sizes = "100vw";

// Two-column section
sizes = "(max-width: 768px) 100vw, 50vw";

// Three-column card grid
sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

// Testimonial avatar
sizes = "(max-width: 768px) 64px, 80px";
```

### 5e. `priority` prop

Use `priority` (preloads the image) on the **first visible image** on each
page (the LCP candidate):

```tsx
<HeroImage src="..." alt="..." priority />
```

Do **not** add `priority` to below-the-fold images — it wastes bandwidth.

---

## 6. Testimonials — Photo + Distribution Workflow

### 6a. Data model — add photo fields

Open `src/lib/data/testimonials.ts` and extend the `Testimonial` interface:

```ts
export interface Testimonial {
  // ... existing fields ...
  image?: string; // /images/testimonials/[id].webp
  projectPhoto?: string; // /images/projects/[slug]/hero.webp
  videoUrl?: string; // /videos/testimonials/[id].mp4
  socialCard?: string; // /images/social/testimonials/[id].webp
  publishedToSocial?: boolean;
  publishedAt?: string; // ISO date of social/email publish
  platforms?: ("facebook" | "instagram" | "linkedin" | "twitter")[];
}
```

### 6b. Adding a new testimonial — step by step

```
1. Get written consent from the client for using their name, photo, quote,
   and project location publicly.

2. Collect:
   ├── Client portrait or job-site photo (JPG/PNG, min 800×800 px)
   ├── Quote (verbatim, approved by client)
   └── Project photo (optional, from projects/ folder)

3. Drop source photos into:
   ├── public/images/testimonials/[id].jpg     ← client photo
   └── public/images/projects/[slug]/hero.jpg  ← project photo (if new)

4. Run: npm run optimize:images
   → Creates .webp counterparts at correct dimensions

5. Add the entry to src/lib/data/testimonials.ts:
   {
     id: "client-023",
     name: "First L.",
     location: "Richland, WA",
     project: "Custom Home Remodel",
     rating: 5,
     quote: "…",
     image: "/images/testimonials/client-023.webp",
     projectPhoto: "/images/projects/richland-remodel-2026/hero.webp",
     type: "client",
     category: "residential",
     featured: true,
     date: "2026-04",
   }

6. Create a social card (1080×1080 px):
   ├── Use the Canva template in /documents/brands/
   ├── Export as PNG → drop in public/images/social/testimonials/client-023.png
   └── Run: npm run optimize:images -- --force
       → Creates client-023.webp at 1080 px

7. Set socialCard: "/images/social/testimonials/client-023.webp" in the entry.

8. Trigger distribution (see §7 and §8).
```

### 6c. Operational Safety Wins

Capture and distribute "Safety Snapshots" — job-site images that visibly demonstrate MH Construction's safety culture as identified in the Travelers insurance audit.

**What qualifies as a Safety Snapshot:**

- 100% PPE compliance is visible for every worker in frame (hard hats, high-vis vests, safety glasses, gloves as appropriate)
- Organized tool storage — no tripping hazards, cords managed, equipment staged properly
- Site perimeter controls, signage, and barriers clearly visible where applicable

**Capture workflow:**

```
1. Superintendent identifies a compliant job-site moment worth documenting.

2. Superintendent provides written safety verification before the image is
   distributed. This must confirm:
   ├── All workers in frame gave verbal consent to be photographed
   ├── 100% PPE compliance verified at time of capture
   └── Site conditions meet OSHA and MH Construction safety standards

3. Drop source photo into:
   public/images/safety/snapshots/[YYYY-MM-DD]-[site-slug]-[nn].jpg
   └── Example: 2026-04-15-kennewick-office-01.jpg

4. Run: npm run optimize:images
   → Creates .webp at safety category dimensions (1200 px, 85 WebP)

5. Create a LinkedIn-optimized post card (1200 × 627 px) using the
   approved safety Canva template in /documents/brands/
   └── Export → public/images/social/safety/[same-filename].webp

6. Before posting to LinkedIn:
   ├── Attach the Superintendent's written safety verification to the
   │   internal record (store in documents/subcontractors/ or a team
   │   shared drive per operational procedure)
   └── Admin or marketing lead approves the caption for professional tone

7. Post to LinkedIn with caption format:
   "Safety first — always. [Brief description of work being performed]
    in [City, WA]. 100% PPE compliance, zero shortcuts.
    #MHConstruction #SafetyFirst #[TradeTag]"
```

**Folder for Safety Snapshots:**

```
public/images/safety/
└── snapshots/             # ← NEW: job-site safety compliance photos
    └── [YYYY-MM-DD]-[site-slug]-[nn].webp
```

---

## 7. Social Media Auto-Post (n8n)

The site already uses `n8n` (via `N8N_WEBHOOK_URL`) for form notifications.
Extend that workflow to auto-post testimonials to social media.

### 7a. New API endpoint

Create `src/app/api/testimonials/publish/route.ts`:

```ts
// POST /api/testimonials/publish
// Body: { testimonialId: string, platforms: string[] }
// Protected: admin session required
// Action: sends payload to N8N_TESTIMONIAL_WEBHOOK_URL
```

The endpoint validates the session, looks up the testimonial in
`testimonials.ts`, and fires a webhook to n8n with:

```json
{
  "type": "testimonial-publish",
  "data": {
    "id": "client-023",
    "quote": "…",
    "clientName": "First L.",
    "projectType": "Custom Home Remodel",
    "location": "Richland, WA",
    "rating": 5,
    "imageUrl": "https://www.mhc-gc.com/images/social/testimonials/client-023.webp",
    "pageUrl": "https://www.mhc-gc.com/testimonials",
    "platforms": ["facebook", "instagram", "linkedin"]
  }
}
```

### 7b. n8n workflow — "Testimonial Social Post"

Build this workflow in your n8n instance:

```
Webhook trigger (POST from site)
  │
  ├─► Facebook Page post (Graph API node)
  │     caption: "[quote]" — [clientName], [location] #MHConstruction #[ProjectType]
  │     image: imageUrl
  │
  ├─► Instagram Business post (HTTP Request node → Graph API)
  │     same caption + image
  │
  ├─► LinkedIn Company page post (LinkedIn node)
  │     formatted for professional tone
  │
  └─► Twitter/X post (Twitter node)
        shortened quote (≤ 280 chars) + link to /testimonials + imageUrl
```

**Credentials needed in n8n:**

- Facebook Page access token (long-lived)
- Instagram Business account linked via Facebook
- LinkedIn OAuth2 company page token
- Twitter API v2 bearer token

### 7c. Schedule vs. immediate

- **Featured testimonials** → post immediately when `featured: true` is set.
- **Non-featured** → queue with a delay (48 h gap between posts) to avoid
  overwhelming followers. Use n8n's scheduling node.

### 7d. Compliance Triggers

Two compliance-critical automation workflows identified in the Travelers insurance audit.

#### Annual MVR Review — 30-Day Advance Alert

```
Schedule trigger (runs daily at 08:00 PT)
  │
  ├─► Query Subcontractor Matrix or HR records
  │     SELECT employee_name, email, phone, mvr_review_due_date
  │     WHERE mvr_review_due_date = TODAY + 30 days
  │
  ├─► Send Email (Resend)
  │     to: employee email
  │     cc: safety@mhc-gc.com
  │     subject: "Action Required — Annual MVR Review Due in 30 Days"
  │     body: Name, due date, steps to complete MVR submission,
  │           link to mvr-records/ intake process
  │
  └─► Send SMS (Twilio or n8n SMS node)
        to: employee mobile
        message: "MVR review due [date]. Check your email for details.
                  Reply STOP to opt out of SMS reminders. — MH Construction"
```

**Environment variables required:**

- `N8N_MVR_ALERT_WEBHOOK_URL` — internal webhook for manual triggers
- `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_FROM_NUMBER`
- `RESEND_API_KEY` (already in use)

#### Subcontractor COI Expiration — 15-Day Flag

```
Schedule trigger (runs daily at 07:00 PT)
  │
  ├─► Read Subcontractor Matrix
  │     (HTTP Request → Google Sheets API or internal DB)
  │     Filter: coi_expiration_date BETWEEN TODAY AND TODAY + 15 days
  │
  ├─► For each flagged subcontractor:
  │   ├─► Update Matrix status column → "⚠ COI EXPIRING SOON"
  │   ├─► Send Email alert to operations@mhc-gc.com
  │   │     subject: "COI Expiring — [Subcontractor Name] ([days] days)"
  │   │     body: Subcontractor name, COI expiration date, contact info,
  │   │           reminder to obtain updated COI + AIE before expiry
  │   └─► If expiration_date < TODAY:
  │         Update status → "🔴 COI EXPIRED — DO NOT USE"
  │         Send urgent alert to operations@mhc-gc.com + safety@mhc-gc.com
  │
  └─► Log all flags to compliance audit trail
        (append to documents/subcontractors/coi-audit-log.csv)
```

**Key rule:** Do not assign work to any subcontractor whose COI or AIE is expired or flagged. Verify AIE language meets Washington State statute of repose before tagging subcontractors in project photos or marketing materials.

---

## 8. Email Blast Automation (n8n + Resend)

The newsletter subscriber list is stored in the D1 database
(`newsletter_subscribers` table). Use it for targeted email blasts when a
notable testimonial is published.

### 8a. Trigger

From the same `/api/testimonials/publish` endpoint, include:

```json
"emailBlast": true
```

### 8b. n8n workflow — "Testimonial Email Blast"

```
Webhook trigger
  │
  ├─► Query D1 (HTTP Request → Cloudflare D1 REST API)
  │     SELECT email, name FROM newsletter_subscribers WHERE unsubscribed = 0
  │
  ├─► Loop over subscribers (Split In Batches node, 50/batch)
  │
  └─► Resend — Send Email (HTTP node)
        to: subscriber.email
        from: hello@mhc-gc.com
        subject: "See What Our Clients Are Saying 🏗️"
        html: testimonial email template (see §8c)
```

### 8c. Email template structure

Create `src/lib/email/templates/testimonial-blast.tsx`:

```
┌─────────────────────────────────────────┐
│  [MH Construction logo]                 │
│                                         │
│  "This is the quote from the client…"  │
│  ★★★★★                                  │
│  — First L., Richland, WA               │
│    Custom Home Remodel                  │
│                                         │
│  [Project photo — 600 px wide]          │
│                                         │
│  Read more testimonials →               │
│  [CTA button → /testimonials]           │
│                                         │
│  [Unsubscribe link]                     │
└─────────────────────────────────────────┘
```

**Required fields from testimonial:**

- `quote`, `name`, `location`, `project`, `rating`
- `projectPhoto` or `socialCard` as the email image
- `pageUrl` for the CTA

### 8d. Unsubscribe handling

The newsletter unsubscribe route already exists. Ensure the email template
footer includes:

```
/api/newsletter/unsubscribe?token=[subscriber-token]
```

This is required by CAN-SPAM and CASL.

---

## 9. Open Graph Images per Page

Replace the single `og-default` used today with per-page OG images.
Priority order matches traffic volume from Lighthouse results:

| Priority | Page route      | OG image file                         | Status     |
| -------- | --------------- | ------------------------------------- | ---------- |
| 1        | `/` (home)      | `og/og-home.webp`                     | ☐ needed   |
| 2        | `/testimonials` | `og/og-testimonials.webp`             | ☐ needed   |
| 3        | `/projects`     | `og/og-projects.webp`                 | ☐ needed   |
| 4        | `/services`     | `og/og-services.webp`                 | ☐ needed   |
| 5        | `/veterans`     | `og/og-veterans.webp`                 | ☐ needed   |
| 6        | `/careers`      | `og/og-careers.webp`                  | ☐ needed   |
| 7        | `/contact`      | `og/og-contact.webp`                  | ☐ needed   |
| 8        | `/about`        | `og/og-about.webp`                    | ☐ needed   |
| …        | all others      | `og-default.webp` (existing fallback) | ✓ in place |

**OG image specs:** 1200 × 630 px · WebP · ≤ 200 KB · include company logo
in corner · overlaid page title text.

---

## 10. Video Workflow

### 10a. Format requirements

Every video must be provided in two formats:

| Format  | Codec       | Use                                         |
| ------- | ----------- | ------------------------------------------- |
| `.mp4`  | H.264 + AAC | Broadest compatibility (iOS, older Android) |
| `.webm` | VP9 + Opus  | Smaller file size on modern browsers        |

Poster image: a `.webp` frame capture at the same path replacing `.mp4`
with `-poster.webp`.

### 10b. Encoding settings (ffmpeg)

```bash
# MP4 (H.264)
ffmpeg -i source.mov \
  -vf "scale=1280:-2" \
  -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  output.mp4

# WebM (VP9)
ffmpeg -i source.mov \
  -vf "scale=1280:-2" \
  -c:v libvpx-vp9 -crf 33 -b:v 0 \
  -c:a libopus -b:a 96k \
  output.webm

# Poster frame (first frame)
ffmpeg -i output.mp4 -vframes 1 -q:v 2 output-poster.jpg
# Then convert poster to WebP via: npm run optimize:images -- --force
```

### 10c. Usage in components

```tsx
import { OptimizedVideo } from "@/components/ui/media";

<OptimizedVideo
  src="/videos/testimonials/client-001.mp4"
  poster="/videos/testimonials/client-001-poster.webp"
  alt="Client testimonial video — John D., Kennewick WA custom home"
  title="Client Testimonial — John D."
  autoPlay={false}
  controls
/>;
```

### 10d. Video SEO (VideoObject schema)

```ts
{
  "@type": "VideoObject",
  "name": "Client Testimonial — John D., Kennewick WA",
  "description": "John D. shares his experience with MH Construction after completing a custom home build in Kennewick, WA.",
  "thumbnailUrl": "https://www.mhc-gc.com/videos/testimonials/client-001-poster.webp",
  "uploadDate": "2026-04-15",
  "contentUrl": "https://www.mhc-gc.com/videos/testimonials/client-001.mp4",
  "embedUrl": "https://www.mhc-gc.com/testimonials#client-001"
}
```

---

## 11. Checklist — Adding New Media

Use this checklist every time photos or videos are added.

### Photos

- [ ] Source file is min 1200 px wide (min 1080 px for social cards)
- [ ] Dropped into correct folder per §1 with correct filename per §2
- [ ] `npm run optimize:images` run (or `--force` for replacement)
- [ ] `npm run check:image-sizes` — passes with no oversized WebP
- [ ] `alt` text written following the formula in §5a
- [ ] `sizes` attribute set correctly per §5d
- [ ] `priority` added if this is the LCP image for the page
- [ ] Data file updated (`testimonials.ts`, type definition in `types/index.ts`, etc.)
- [ ] Schema.org structured data updated if applicable (§5b)
- [ ] OG image updated for the affected page (§9)

### Videos

- [ ] `.mp4` and `.webm` versions encoded per §10b
- [ ] Poster `.webp` created and in correct folder
- [ ] `OptimizedVideo` component used (not raw `<video>`)
- [ ] `VideoObject` schema added to page (§10d)
- [ ] Video file size < 20 MB (compress more or use a CDN for larger files)

### Risk / Compliance

- [ ] Verify mobile device policy is visible in the background of all interior vehicle shots and videos (e.g., "No Cell Phone Use While Driving" signage or policy card on dashboard)
- [ ] Ensure subcontractor AIE/COI matches Washington State statute of repose requirements before tagging them in project photos or any published media
- [ ] Safety Snapshot: written Superintendent verification obtained before LinkedIn distribution (§6c)
- [ ] MVR records stored in `public/images/compliance/mvr-records/` are fully redacted — no SSNs, full DOBs, or license numbers visible
- [ ] Subcontractor Matrix updated with current COI expiration dates before any project photo publish that includes subcontractor personnel

### Testimonials (full publish flow)

- [ ] Written client consent obtained
- [ ] Testimonial entry added to `testimonials.ts` with all new fields
- [ ] Client photo in `public/images/testimonials/[id].webp`
- [ ] Social card in `public/images/social/testimonials/[id].webp`
- [ ] All checklist items above (Photos) completed
- [ ] `/api/testimonials/publish` endpoint called with desired platforms
- [ ] n8n "Testimonial Social Post" workflow triggered (§7)
- [ ] Email blast sent if `emailBlast: true` (§8)
- [ ] `publishedToSocial: true` and `publishedAt` set in data entry

---

## 12. Rollout Priority Order

Work through these phases in order. Each phase is independently deployable.

### Phase 1 — Foundation ✅ COMPLETE

1. ✅ Create the new folders: `public/images/testimonials/`, `public/images/social/testimonials/`, `public/images/og/`, `public/videos/testimonials/`, `public/videos/projects/`, `public/videos/culture/`
2. ✅ Extend the `Testimonial` interface in `testimonials.ts` with the new fields (`projectPhoto`, `videoUrl`, `socialCard`, `publishedToSocial`, `publishedAt`, `platforms`) (§6a)
3. ✅ `TestimonialCard` updated to render real photo when `image` is set (falls back to initials avatar)
4. ✅ `/api/testimonials/publish` API route built — admin-protected, fires n8n webhook (§7a)
5. ✅ `n8n-webhook.ts` extended with `"testimonial-publish"` form type
6. ✅ `review-schema.ts` extended with `image` field — testimonials page wires photo URL into schema
7. ✅ `optimize-images.js` updated with `testimonials`, `social`, and `og` category size limits
8. ☐ Replace `placeholder-team.webp` with a branded silhouette ← **next design task**
9. ☐ Replace `placeholder-project.webp` with a real project photo ← **next design task**

### Phase 1.5 — Risk Mitigation Anchor

Priority: complete before Phase 2. These tasks directly address findings from the Travelers insurance audit and establish safety credibility across all media channels.

1. ☐ **Replace all team placeholder images** — swap `placeholder-team.webp` and any team page placeholders with photos showing active PPE usage (hard hats, high-vis vests on site). No team photo without visible safety compliance should appear on the site.
2. ☐ **Launch "Safety & Credentials" landing page** — build or finalize the high-authority safety page with:
   - MISH (Motor Carrier Industry Safety Hub) QR code prominently integrated
   - Links to bonding, insurance, and licensing verification
   - Safety Snapshot gallery section (§6c) as a live social proof feed
   - Structured data (`LocalBusiness` + `ImageObject` schema) for each credential badge
3. ☐ Create `public/images/safety/snapshots/` folder and add first 3 Safety Snapshots with Superintendent verification on file
4. ☐ Add `public/documents/subcontractors/` folder with Subcontractor Matrix and COI/AIE templates
5. ☐ Activate n8n MVR Review alert workflow (§7d) and test with one employee record
6. ☐ Activate n8n COI Expiration flag workflow (§7d) and verify against current Subcontractor Matrix

### Phase 2 — Testimonial Photos

1. ☐ Collect photos + written consent for top 3 featured testimonials (`client-001`, `client-002`, `client-003`)
2. ☐ Drop source JPG/PNG into `public/images/testimonials/`; run `npm run optimize:images`
3. ☐ Update data entries in `testimonials.ts` with `image:` field
4. ☐ Verify testimonial cards display photos (run dev server, check `/testimonials`)

### Phase 3 — Project Gallery

1. ☐ For each project in `projects/`, create a slug subfolder
2. ☐ Add hero shot + 2–3 detail photos per project
3. ☐ Update `ProjectPortfolio.images[]` array in project data

### Phase 4 — OG Images

1. ☐ Design and export OG images for the 8 priority pages (§9) at 1200×630 px
2. ☐ Drop into `public/images/og/`; run `npm run optimize:images`
3. ☐ Update `page-seo-utils.ts` and relevant `layout.tsx` metadata per page

### Phase 5 — Social + Email Automation

1. ✅ `/api/testimonials/publish` route built
2. ☐ Configure `N8N_TESTIMONIAL_WEBHOOK_URL` environment variable in Cloudflare Workers secrets
3. ☐ Build n8n "Testimonial Social Post" workflow (§7b) — connect Facebook, Instagram, LinkedIn, Twitter nodes
4. ☐ Build n8n "Testimonial Email Blast" sub-workflow (§8b)
5. ☐ Create `testimonial-blast` email template at `src/lib/email/templates/testimonial-blast.tsx` (§8c)
6. ☐ Test with one platform + one subscriber before full launch

### Phase 6 — Video

1. ☐ Encode `mh_veterans_day_vid` poster image using ffmpeg (§10b), add as `/videos/mh_veterans_day_vid-poster.webp`
2. ☐ Add first client testimonial video (`client-001.mp4` + `client-001.webm`) in `public/videos/testimonials/`
3. ☐ Add project walkthrough video for highest-traffic project page

---

_Last updated: April 2026 (updated to incorporate Travelers insurance audit risk-mitigation requirements). Review and update this document when the testimonial data model, automation workflows, or compliance requirements change._
