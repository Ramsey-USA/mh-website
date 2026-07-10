# MH Construction Safety Program Guide

**Path:** `docs/technical/safety-program-guide.md`
**Last Updated:** June 24, 2026
**Version:** 1.4.0
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
**Author of Record:** Matt Ramsey (Safety Officer) | **Authorized By:** Jeremy Thamert (Owner)
**Total Sections:** 50 (00–49) | **Total Pages:** ~350 (formatted output)
**Source Files:** Word (.docx) source library (MISH sections)

**Brand Congruency:** Safety program templates, generated PDFs, and print routes must keep typography and color usage aligned with the canonical MH font and palette standards.

### PDF Governance Update (April 22, 2026)

- Safety PDF workflow is now governed by dedicated agents:
  - `.github/agents/safety-pdf-editor.agent.md`
  - `.github/agents/manual-structure-officer.agent.md`
- Completion requires source-first edits, regeneration, and explicit PASS/FAIL checks for
  structure, typography, and generated PDF artifact metadata.
- Standardized author/creator metadata target:
  - `Author: Matt Ramsey, Safety Officer`
  - `Creator: MH Construction Document Pipeline`
- Standardized Safety Manual PDF title naming:
  - `MH Construction Safety Manual — Cover|Spine|Digital`

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
documents/content/MHC-MISH-APP-50-Sections/         ← Canonical Word source bundle (.docx MISH sections)
           │
           ▼  pnpm --filter @mhc/website run docs:extract-word
documents/content/safety-manual.json                ← Auto-generated manifest (50 sections)
           │
           ▼  pnpm --filter @mhc/website run docs:generate + pnpm --filter @mhc/website run docs:generate:forms
documents/output/sections/                          ← 50 generated PDFs served to field staff
documents/output/form-packages/                     ← Generated form package PDFs (cover + fillable)
documents/output/safety-manual-toc.pdf              ← Standalone table-of-contents PDF (generator canonical name)
documents/output/safety-manual-reference.pdf        ← Standalone section reference guide PDF
           │
           ▼  pnpm --filter @mhc/website run docs:merge + R2 publish
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
1. **Complete bonding manual PDF** for surety, insurer, and prequalification review.
1. **Standalone table-of-contents PDF** for quick field access. Generator output file is `safety-manual-toc.pdf`; published delivery key is `/docs/safety/safety-manual-contents.pdf` (compatibility alias).
1. **Standalone reference guide PDF** (`safety-manual-reference.pdf`) for section lookup and compliance cross-reference.

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
│   ├── employee-handbook.json                            ← Employee Handbook manifest (chapter-based section metadata)
│   ├── manuals-index.json                                ← Dual-manual registry & shared forms contract
│   ├── MHC-MISH-APP-50-Sections/                         ← Current source Word docs (MISH naming)
│   └── mhc-employee-handbook-2026/                       ← Canonical Employee Handbook chapter PDFs
├── forms/
│   ├── MHC-MISH-47-Forms/               ← Canonical source form .docx files (shared between manuals)
│   ├── forms-manifest.json              ← Form registry (shared by MISH + Handbook)
│   └── *.html                           ← Optional standalone HTML form templates for PDF generation
├── manuals/
│   ├── safety-manual-cover.html     ← MISH 3-ring binder cover template
│   ├── safety-manual-section.html   ← MISH individual section page template
│   ├── safety-manual-spine.html     ← MISH spine label template
│   ├── safety-manual-tabs.html      ← MISH tab divider templates (50 tabs)
│   ├── employee-handbook-cover.html ← Handbook cover template
│   ├── employee-handbook-spine.html ← Handbook spine template
│   ├── employee-handbook-tabs.html  ← Handbook tab dividers
│   └── employee-handbook-letterhead.html ← Handbook letterhead
├── output/
│   ├── safety-manual-cover.pdf
│   ├── safety-manual-spine.pdf
│   ├── safety-manual-tabs.pdf
│   ├── safety-manual-toc.pdf
│   ├── safety-manual-reference.pdf
│   ├── sections/          ← Generated section PDFs (served to /hub field staff)
│   └── form-packages/     ← Generated form package PDFs
├── scripts/
│   ├── extract.mjs                    ← PDF text extraction → safety-manual.json
│   ├── extract-word.mjs               ← Word doc extraction → safety-manual.json (preferred — cleaner)
│   ├── generate.mjs                   ← HTML templates → branded PDFs via Puppeteer (supports --manual flag for handbook)
│   └── merge.mjs                      ← Assembles complete manual PDFs (cover + sections + forms)
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
- `documents/content/manuals-index.json` (manual boundary + shared forms contract)

Manual boundary rule:

- `safety-manual` (MISH) and `employee-handbook` are separate manuals.
- Both manuals share one forms source: `documents/forms/forms-manifest.json`.

Use those sources for current section titles, priorities, and OSHA references rather than maintaining a duplicated static table in this guide.

**Priority Legend:**

- **Required** — Mandatory for all projects; field staff must be familiar with these sections
- **Field** — Required on applicable projects and tasks
- **Reference** — Administrative reference; superintendent awareness only

---

## Version Update Workflow

When new program Word source files are delivered, follow this checklist **in order**:

### Step 1 — Drop new source files

Create or update the canonical source folder inside `documents/content/`:

```bash
documents/content/MHC-MISH-APP-50-Sections/  # Place MISH .docx section files here
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
pnpm --filter @mhc/website run docs:extract-word
```

This reads the `.docx` files and regenerates `documents/content/safety-manual.json` with
updated section text, summaries, word counts, and metadata.

By default, the extractor targets:

```bash
documents/content/MHC-MISH-APP-50-Sections
```

To run against a different version directory:

```bash
node documents/scripts/extract-word.mjs --input documents/content/MHC-MISH-APP-50-Sections
```

### Step 4 — Regenerate all print PDFs

```bash
pnpm --filter @mhc/website run docs:preflight:pdf-output
pnpm --filter @mhc/website run docs:generate
pnpm --filter @mhc/website run docs:generate:forms
```

This rebuilds all manual PDFs (cover, spine, tabs, sections) plus form package PDFs into
`documents/output/`.

If preflight reports stale legacy output, clean it with:

```bash
pnpm run docs:clean:legacy-output
```

For a single-command full rebuild, use:

```bash
pnpm --filter @mhc/website run docs:all
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
pnpm --filter @mhc/website run docs:merge
```

This assembles the complete manual PDF used for bonding-company and insurer review.

### Step 4c — Publish approved artifacts to Cloudflare R2

Publish approved section PDFs, forms, and the complete manual to the `FILE_ASSETS`
bucket so they can be served through the `/docs/**` route. Keep unreviewed public
uploads in `SAFETY_INTAKE` until admin review is complete.

```bash
pnpm --filter @mhc/website run docs:publish:safety
pnpm --filter @mhc/website run docs:publish:forms
pnpm --filter @mhc/website run docs:publish:employee-handbook
```

`docs:publish:safety` uploads manual artifacts and `docs/safety/sections/*.pdf`.
`docs:publish:forms` uploads package PDFs from `documents/output/form-packages/`
to both `docs/safety/forms/*.pdf` and `docs/employee/forms/*.pdf`, including the
consolidated handbook company letterhead.
`docs:publish:employee-handbook` uploads the Employee Handbook PDF to
`docs/employee/employee-handbook-2026.pdf`.

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
pnpm run type-check && pnpm run lint && pnpm run build
```

---

## Available npm Commands

### Safety Manual (MISH) Commands

- `pnpm run docs:extract`: Extract PDF text to `safety-manual.json` (falls back to Word source if PDF source path is missing)
- `pnpm --filter @mhc/website run docs:extract-word`: Extract Word docs to `safety-manual.json` (preferred)
- `pnpm --filter @mhc/website run docs:preflight:pdf-output`: Fail fast if stale mirror output exists in `apps/website/documents/output/`
- `pnpm --filter @mhc/website run docs:generate`: Generate MISH manual PDFs (cover, spine, tabs, all sections)
- `pnpm --filter @mhc/website run docs:generate:forms`: Generate form package PDFs in `documents/output/form-packages/` from manifest fillable forms
- `pnpm --filter @mhc/website run docs:all`: Generate MISH manual PDFs + form packages, then merge complete manuals
- `pnpm --filter @mhc/website run docs:generate:cover`: Generate MISH cover PDF
- `pnpm --filter @mhc/website run docs:generate:spine`: Generate MISH spine PDF
- `pnpm --filter @mhc/website run docs:generate:tabs`: Generate MISH tab dividers
- `pnpm --filter @mhc/website run docs:generate:sections`: Generate all 50 MISH section PDFs
- `pnpm --filter @mhc/website run docs:merge`: Assemble complete MISH manual PDF
- `pnpm --filter @mhc/website run docs:merge:digital`: Assemble digital MISH manual (no tabs)
- `pnpm --filter @mhc/website run docs:publish:safety`: Publish MISH PDFs to R2 FILE_ASSETS bucket

### Employee Handbook Commands

- `pnpm --filter @mhc/website run docs:generate:handbook`: Generate all handbook artifacts (cover, spine, tabs)
- `pnpm --filter @mhc/website run docs:generate:handbook:cover`: Generate handbook cover PDF
- `pnpm --filter @mhc/website run docs:generate:handbook:spine`: Generate handbook spine PDF
- `pnpm --filter @mhc/website run docs:generate:handbook:tabs`: Generate handbook tab dividers
- `pnpm --filter @mhc/website run docs:publish:employee-handbook`: Publish handbook PDF to R2 FILE_ASSETS bucket

### General Commands

- `node documents/scripts/generate.mjs --manual employee-handbook --template cover`: Generate handbook cover (explicit manual flag)
- `node documents/scripts/generate.mjs --template form-package --form "FORM 02-B"`: Generate form package PDF for a specific form ID/slug

---

---

## Employee Handbook Generation (Parallel Architecture)

The Employee Handbook is maintained as a **separate-but-parallel manual** alongside MISH:

- **Shared source:** Both manuals reference the same `documents/forms/forms-manifest.json`
- **Separate manifests:** `documents/content/safety-manual.json` vs `documents/content/employee-handbook.json`
- **Unified registry:** `documents/content/manuals-index.json` declares boundaries and forms contract

### Handbook Content Source Workflow

The Employee Handbook sections are sourced directly from canonical chapter PDFs:

1. **Update chapter source files in place:**

```bash
documents/content/mhc-employee-handbook-2026/
```

Required chapter files:

- chapter-1-introduction.pdf
- chapter-2-company-policies.pdf
- chapter-3-employment-basics.pdf
- chapter-4-compensation.pdf
- chapter-5-employee-benefits.pdf
- chapter-6-miscellaneous.pdf

2. **Generate handbook print artifacts:**
   ```bash
   pnpm --filter @mhc/website run docs:generate:handbook:cover
   pnpm --filter @mhc/website run docs:generate:handbook:spine
   pnpm --filter @mhc/website run docs:generate:handbook:tabs
   ```

pnpm --filter @mhc/website run docs:generate -- --template sections --manual handbook

````

### Handbook Generation Flow

```text
documents/content/mhc-employee-handbook-2026/
     │
     ▼  documents/content/employee-handbook.json (manifest)
     │
     ▼  handbook section generation (chapter PDFs)
       documents/output/sections/01-*.pdf ... 06-*.pdf
     │
     ▼  handbook shell artifacts
        ├─► pnpm --filter @mhc/website run docs:generate:handbook:cover
        ├─► pnpm --filter @mhc/website run docs:generate:handbook:spine
        └─► pnpm --filter @mhc/website run docs:generate:handbook:tabs
        │
        ▼  documents/output/
            employee-handbook-cover.pdf
            employee-handbook-spine.pdf
            employee-handbook-tabs.pdf
        │
        ▼  pnpm --filter @mhc/website run docs:publish:employee-handbook
        (R2 FILE_ASSETS bucket)
        https://www.mhc-gc.com/docs/employee/employee-handbook-2026.pdf
````

### Handbook vs MISH Architecture Differences

| Aspect           | MISH (safety-manual)       | Handbook (employee-handbook)      |
| ---------------- | -------------------------- | --------------------------------- |
| Sections         | 50 (00–49) with QR codes   | 6 (01–06) no section QR           |
| Digital routes   | `/resources/safety-manual` | Static PDF `/docs/employee/`      |
| Tab QR codes     | Per-section links          | Single handbook cover link        |
| Forms included   | Yes (47 safety forms)      | Yes (handbook forms + letterhead) |
| Merge complexity | Full 350+ page assembly    | Single handbook PDF               |

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

Program source files should be stored in the canonical MISH app folder:

```
documents/content/MHC-MISH-APP-50-Sections/  ← Current
```

Do **not** split active source files across multiple folders.

---

## Version History

| Revision | Effective Date | Sections   | Description                                                                                                                                                      | Author                       | Authorized By          |
| -------- | -------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ---------------------- |
| Rev 3.0  | 04/07/2026     | 50 (00–49) | Current digital program baseline; 50 sections extracted into the digital manifest with field hub workflows, expanded forms library, and download/access tracking | Matt Ramsey (Safety Officer) | Jeremy Thamert (Owner) |

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
