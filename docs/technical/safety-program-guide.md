# MH Construction Safety Program Guide

**Path:** `docs/technical/safety-program-guide.md`
**Last Updated:** April 18, 2026
**Version:** 1.2.0
**Safety Program Revision:** Rev 3 — Effective 04/07/2026
**Status:** ✅ Active

---

## Overview

MH Construction's **Safety Program** is a comprehensive 50-section written safety
program (Section 00 = Table of Contents, Sections 01–49 = content) covering all
OSHA-required construction safety standards.

This guide documents:

- System architecture and file pipeline
- Step-by-step version update workflow
- Complete section inventory
- Website integration points
- Version history

**Current Version:** Revision 3 | **Effective Date:** April 7, 2026
**Total Sections:** 50 (00–49) | **Total Pages:** ~350 (formatted output)
**Source Files:** Word (.docx) source library (MISH sections)

### Canonical Naming

- **Canonical name:** MH Construction Safety Program
- **Descriptive phrase:** written safety program aligned with OSHA, AGC, and applicable state requirements
- **Legacy term:** Accident Prevention Program (APP) may still appear in
  historic source material and should only be referenced when clarifying
  continuity

### Standards Alignment

| Standard Layer | Scope                                                                               |
| -------------- | ----------------------------------------------------------------------------------- |
| OSHA           | Federal construction-safety baseline, primarily 29 CFR 1926                         |
| AGC CSEA       | Contractor Safety Evaluation alignment used for prequalification and bonding review |
| Washington     | WISHA and related Washington state construction-safety requirements                 |
| Oregon         | Oregon OSHA requirements applicable to project location and work type               |
| Idaho          | Idaho state and project-specific safety obligations applicable to the work          |

Claims of Washington, Oregon, and Idaho alignment should only be made after the current
revision has been reviewed against the applicable state rules.

---

## System Architecture

> Alignment note (April 18, 2026): follow `docs/project/operational-hub-congruent-plan.md` as source of truth for route/auth sequencing. `/hub` is canonical staff access; `/safety/hub` now serves as an active backward-compat redirect to `/hub`.

### Two Audiences, Three Entry Points

| Audience                                           | URL          | Access                        |
| -------------------------------------------------- | ------------ | ----------------------------- |
| Bonding agents, insurers, clients                  | `/safety`    | Public — no login required    |
| Staff (Admin, Superintendents, Workers, Travelers) | `/hub`       | Role-based auth (4-role gate) |
| Admins (Matt & Jeremy)                             | `/dashboard` | Email + password              |

### Document Pipeline

```text
documents/content/safety-manual-word/               ← Root folder for versioned Word source bundles
documents/content/safety-manual-word/<version-dir>/ ← Drop new .docx MISH sections here
           │
           ▼  npm run docs:extract-word
documents/content/safety-manual.json                ← Auto-generated manifest (50 sections)
           │
           ▼  npm run docs:generate + npm run docs:generate:forms
documents/output/sections/                          ← 50 generated PDFs served to field staff
documents/output/forms/                             ← Generated form PDFs
           │
           ▼  npm run docs:merge + R2 publish
documents/output/safety-manual-complete.pdf         ← Complete bonding-company manual
           │
           ▼  Manual update
src/lib/data/documents.ts                           ← Web registry (revisionDate, section list)
```

### Cloudflare Storage Model

Published Safety artifacts should be stored in Cloudflare R2 whenever possible.

- **Published assets:** `FILE_ASSETS` bucket via `/docs/**` delivery for section PDFs, forms, and the complete manual
- **Public intake:** dedicated `SAFETY_INTAKE` bucket for unreviewed uploads
- **Rule:** public intake files never publish directly to live Safety docs without admin review and revision processing

### Required Deliverables Per Revision

Every Safety revision must produce both of these outputs:

1. **QR-enabled section PDFs** for field use, with each section resolving back to its digital section route.
2. **Complete bonding manual PDF** for surety, insurer, and prequalification review.

---

## Directory Map

```text
documents/
├── assets/
│   ├── logo-color.png
│   ├── logo-dark-bg.png
│   ├── logo-white.png
│   ├── nwagc-logo.png
│   └── nwagc-logo-stacked.png
├── brands/
│   ├── mhc.json           ← MH Construction brand + revision metadata (UPDATE ON NEW VERSION)
│   └── hdd.json           ← High Desert Drywall (future use)
├── content/
│   ├── safety-manual.json                                ← DO NOT EDIT MANUALLY — auto-generated by extract scripts
│   └── safety-manual-word/
│       └── 2026-MHC-MISH-Safety-Program-v3-Word-Docs/   ← Current source Word docs (MISH naming)
├── forms/
│   ├── 2026-MHC-Company-Forms-Library/  ← Source form .docx libraries by category
│   └── *.html                           ← Optional standalone HTML form templates for PDF generation
├── manuals/
│   ├── safety-manual-cover.html     ← 3-ring binder cover template
│   ├── safety-manual-section.html   ← Individual section page template
│   ├── safety-manual-spine.html     ← Spine label template
│   └── safety-manual-tabs.html      ← Tab divider templates (50 tabs)
├── output/
│   ├── safety-manual-cover.pdf
│   ├── safety-manual-spine.pdf
│   ├── safety-manual-tabs.pdf
│   ├── sections/          ← Generated section PDFs (served to /hub field staff)
│   └── forms/             ← Generated form PDFs
├── scripts/
│   ├── extract.mjs        ← PDF text extraction → safety-manual.json
│   ├── extract-word.mjs   ← Word doc extraction → safety-manual.json (preferred — cleaner)
│   └── generate.mjs       ← HTML templates → branded PDFs via Puppeteer
└── styles/
    ├── brand.css           ← Brand colors and typography for print
    ├── print-base.css      ← Page/margin/running-header/footer rules
    └── components.css      ← Form component styles
```

---

## Program Section Inventory (Authoritative Source)

The current MISH inventory is **50 sections (00-49)** for Revision 3.

To avoid documentation drift, the authoritative section catalog lives in code and generated manifests:

- `src/lib/data/documents.ts` (`manuals` -> `safety-manual` -> `sections`)
- `documents/content/safety-manual.json` (generated extraction output)

Use those sources for current section titles, priorities, and OSHA references rather than maintaining a duplicated static table in this guide.

**Priority Legend:**

- **Required** — Mandatory for all projects; field staff must be familiar with these sections
- **Field** — Required on applicable projects and tasks
- **Reference** — Administrative reference; superintendent awareness only

---

## Version Update Workflow

When new program Word source files are delivered, follow this checklist **in order**:

### Step 1 — Drop new source files

Create or update a version folder inside `documents/content/safety-manual-word/`:

```bash
documents/content/safety-manual-word/<version-dir>/  # Place MISH .docx section files here
```

### Step 2 — Update brand metadata

Edit **`documents/brands/mhc.json`**:

```json
{
  "revisionYear": "YYYY",
  "revisionNumber": "3",
  "revisionDate": "MM/DD/YYYY"
}
```

### Step 3 — Re-extract document content

```bash
npm run docs:extract-word
```

This reads the `.docx` files and regenerates `documents/content/safety-manual.json` with
updated section text, summaries, word counts, and metadata.

By default, the extractor targets:

```bash
documents/content/safety-manual-word/2026-MHC-MISH-Safety-Program-v3-Word-Docs
```

To run against a different version directory:

```bash
node documents/scripts/extract-word.mjs --input documents/content/safety-manual-word/<version-dir>
```

### Step 4 — Regenerate all print PDFs

```bash
npm run docs:generate
npm run docs:generate:forms
```

This rebuilds all manual PDFs (cover, spine, tabs, sections) plus form PDFs into
`documents/output/`.

For a single-command full rebuild, use:

```bash
npm run docs:all
```

Each section PDF is expected to include QR access back to its digital route for field use.

To regenerate a **single section** (faster, e.g., after a section-level edit):

```bash
node documents/scripts/generate.mjs --template section --section 11 \
  --rev-date "MM/DD/YYYY" --rev-number "3"
```

To regenerate the **cover and spine only**:

```bash
node documents/scripts/generate.mjs --template cover --rev-date "MM/DD/YYYY" --rev-number "3"
node documents/scripts/generate.mjs --template spine --rev-date "MM/DD/YYYY" --rev-number "3"
```

### Step 4b — Rebuild the complete bonding manual

```bash
npm run docs:merge
```

This assembles the complete manual PDF used for bonding-company and insurer review.

### Step 4c — Publish approved artifacts to Cloudflare R2

Publish approved section PDFs, forms, and the complete manual to the `FILE_ASSETS`
bucket so they can be served through the `/docs/**` route. Keep unreviewed public
uploads in `SAFETY_INTAKE` until admin review is complete.

### Step 5 — Update the web registry

Edit **`src/lib/data/documents.ts`** — update the `safety-manual` entry:

```ts
{
  id: "safety-manual",
  revisionYear: YYYY,
  revisionNumber: "3",     // ← increment
  revisionDate: "MM/DD/YYYY",
  totalPages: NNN,         // ← update if page count changed
  // ...
}
```

If sections were **added, removed, or renamed**, also update the `sections: [...]` array.

### Step 6 — Update form components if fields changed

If any form's content changed (new checklist items, renamed fields, changed inputs), update:

| Component                                            | Form                   |
| ---------------------------------------------------- | ---------------------- |
| `src/components/safety/forms/ToolboxTalkForm.tsx`    | Toolbox Talk           |
| `src/components/safety/forms/JHAForm.tsx`            | Job Hazard Analysis    |
| `src/components/safety/forms/SiteInspectionForm.tsx` | Site Safety Inspection |
| `src/components/safety/forms/IncidentReportForm.tsx` | Incident Report        |

### Step 7 — Log the version update

1. Add a row to the [Version History](#version-history) table below
2. Add an entry to the root `CHANGELOG.md`

### Step 8 — Verify the build

```bash
npm run type-check && npm run lint && npm run build
```

---

## Available npm Commands

| Command                                                              | Description                                                               |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `npm run docs:extract`                                               | Extract PDF text → `safety-manual.json` (PDF source)                      |
| `npm run docs:extract-word`                                          | Extract Word docs → `safety-manual.json` (**preferred** — cleaner output) |
| `npm run docs:generate`                                              | Generate manual PDFs (cover, spine, tabs, all sections)                   |
| `npm run docs:generate:forms`                                        | Generate all discovered form PDFs from `documents/forms/`                 |
| `npm run docs:all`                                                   | Generate manual PDFs + form PDFs, then merge complete manuals             |
| `node documents/scripts/generate.mjs --template cover`               | Cover page only                                                           |
| `node documents/scripts/generate.mjs --template spine`               | Spine label only                                                          |
| `node documents/scripts/generate.mjs --template tabs`                | All 50 tab dividers                                                       |
| `node documents/scripts/generate.mjs --template sections`            | All 44 section PDFs                                                       |
| `node documents/scripts/generate.mjs --template section --section N` | Single section N                                                          |
| `node documents/scripts/generate.mjs --template toolbox-talk`        | Toolbox talk form PDF (if `documents/forms/toolbox-talk.html` exists)     |

---

## Website Integration

### URL Structure

```text
/safety              ← Public showcase (bonding agents, insurers, clients) — SEO indexed
/hub                 ← Unified staff dashboard (4-role auth) — noindex
/safety/hub          ← Backward-compat redirect to `/hub` — noindex
/safety/print/[id]   ← Print/PDF view for submitted forms — noindex
/api/safety/intake   ← Public upload intake (Turnstile + rate limiting + review queue)
/dashboard           ← Admin management (email + password) — noindex
```

### Key Source Files

| File                                       | Purpose                                                             |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `src/app/safety/page.tsx`                  | Public safety showcase page                                         |
| `src/app/safety/layout.tsx`                | Public SEO metadata (indexed)                                       |
| `src/app/hub/page.tsx`                     | Unified hub server entry                                            |
| `src/app/safety/hub/page.tsx`              | Backward-compat redirect to `/hub`                                  |
| `src/app/safety/hub/layout.tsx`            | Legacy hub metadata retained for redirect-path compatibility        |
| `src/app/hub/HubClient.tsx`                | Unified hub UI (role-gated: admin/superintendent/worker/traveler)   |
| `src/app/safety/print/[id]/page.tsx`       | Print view entry                                                    |
| `src/app/dashboard/SafetyTab.tsx`          | Admin safety management tab                                         |
| `src/lib/data/documents.ts`                | Web document registry — update `revisionDate`/`revisionNumber` here |
| `src/components/safety/SectionBrowser.tsx` | Section browser used in field hub                                   |
| `src/components/safety/forms/`             | Digital form components                                             |
| `src/app/api/safety/forms/route.ts`        | Form submission API                                                 |
| `src/app/api/safety/jobs/route.ts`         | Jobs API                                                            |
| `src/app/api/safety/downloads/route.ts`    | PDF download tracking API                                           |
| `src/app/api/safety/access-log/route.ts`   | Hub access activity API (log + admin reporting)                     |

All authenticated hub roles can write download-log entries, while access-log `GET` remains restricted to admin reporting.

### Database Tables

| Table                     | Purpose                                          |
| ------------------------- | ------------------------------------------------ |
| `jobs`                    | Active/closed/archived construction jobs         |
| `safety_form_submissions` | Digital form submissions per job                 |
| `safety_download_log`     | PDF section download tracking per superintendent |
| `safety_access_log`       | Authenticated hub access and audit activity log  |

### Auth Architecture

| Role             | Login Method                                                        | Access                          |
| ---------------- | ------------------------------------------------------------------- | ------------------------------- |
| `admin`          | Email + password via `POST /api/auth/admin-login`                   | Full dashboard, all API routes  |
| `superintendent` | Shared passcode via `POST /api/auth/field-login`                    | Field hub, own submissions only |
| `worker`         | Shared passcode via `POST /api/auth/hub-login` (`role: "worker"`)   | Hub access with role limits     |
| `traveler`       | Shared passcode via `POST /api/auth/hub-login` (`role: "traveler"`) | Hub read/audit scope only       |
| Anonymous        | N/A                                                                 | Public `/safety` page only      |

Successful authenticated login flows now emit server-side `login` audit events through the shared access-log pipeline.

---

## Folder Naming Convention

New program versions should be stored in a versioned subfolder under `safety-manual-word`:

```
documents/content/safety-manual-word/2026-MHC-MISH-Safety-Program-v3-Word-Docs/  ← Current
documents/content/safety-manual-word/<next-version-dir>/                           ← Next version
```

Do **not** reuse folder names. Keep old version directories as historical archives.

---

## Version History

| Revision | Effective Date | Sections   | Description                                                                                                                                                      | Updated By |
| -------- | -------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| Rev 3    | 04/07/2026     | 50 (00–49) | Current digital program baseline; 50 sections extracted into the digital manifest with field hub workflows, expanded forms library, and download/access tracking | Jeremy     |

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
