# MH Construction — Documents & Forms Branding Standards

**Category:** Branding - Standards
**Version:** 1.0.0
**Last Updated:** April 18, 2026
**Status:** ✅ Official Standard
**Scope:** All print documents, downloadable PDFs, fillable forms, and printable web routes

> **Canonical Reference:** For exact brand values, see [Brand Constants](../brand-constants.md).
> For web component typography, see [Unified Component Standards](./unified-component-standards.md).
> For color tokens, see [Color System](./color-system.md).

---

## Quick Navigation

- [📌 Brand Constants](../brand-constants.md) — ⭐ Single Source of Truth
- [🎨 Color System](./color-system.md)
- [📝 Unified Component Standards](./unified-component-standards.md)
- [🗣 Messaging Guidelines](../strategy/messaging.md)
- [🔤 Terminology Guide](../strategy/universal-terminology-guide.md)

---

## 1. Scope & Surface Types

This standard applies to three surface types:

| Surface                        | Examples                                                         |
| ------------------------------ | ---------------------------------------------------------------- |
| **Print Documents**            | Safety manual, proposals, SOQ, cover letters, transmittal sheets |
| **Fillable / Printable Forms** | Employment application, safety intake, job hazard analysis forms |
| **Printable Web Routes**       | `/careers/print`, `/safety/print/[id]`, any `?print=true` route  |

Web app pages (marketing, service, project pages) are governed by [Unified Component Standards](./unified-component-standards.md). These standards apply only to the document/form surfaces listed above.

---

## 2. Identity Elements

### 2.1 Logo

- Use the **dark-background logo** (`/images/logo/mh-logo-dark-bg.webp`) on dark header bars.
- Use the **light-background logo** (`/images/logo/mh-logo-light-bg.webp`) on white/light document bodies.
- Minimum print size: **1 inch wide**. Never scale below this.
- Maintain clear space of at least **0.25 inch** on all sides.
- Do **not** stretch, recolor, or apply opacity to the logo.

### 2.2 Legal Company Name

Use `MH Construction, Inc.` on:

- Document headers and cover pages
- Signature blocks
- Legal/contractual form sections
- Footer contact lines

Use `MH Construction` (without "Inc.") on:

- Informal section labels
- Dual-label navigation elements
- Short taglines within body copy

### 2.3 Ownership Tagline

When ownership status is stated on a document, always use the full canonical form:

```
Founded 2010, Veteran-Owned Since January 2025
```

**Acceptable positions:** Cover pages, header credential bars, footer identity lines.
**Never** use bare `"Veteran-Owned"` without the dated qualifier on any document surface.

### 2.4 Slogan

The primary slogan must appear on every **cover page** and every **printable web route**:

```
Building projects for the Client, NOT the Dollar
```

Rules:

- "Client" is always capitalized.
- "NOT" is always all-caps.
- "Dollar" is always capitalized.
- Never rephrase or paraphrase this line in a document that also states the canonical version elsewhere.

The secondary slogan `THE ROI IS THE RELATIONSHIP` may appear as a supporting line beneath the primary slogan on cover pages. It is optional on interior document pages.

---

## 3. Typography

Document typography uses the CSS variables defined in `documents/styles/brand.css`. The following rules govern their application.

### 3.1 Type Scale Reference

| Element                    | CSS Variable                      | Approximate Size |
| -------------------------- | --------------------------------- | ---------------- |
| Cover page title           | `--type-print-form-title`         | 16pt             |
| Cover page title (compact) | `--type-print-form-title-compact` | 14pt             |
| Section heading            | `--type-print-field`              | 9.5pt, bold      |
| Body / field text          | `--type-print-field`              | 9.5pt            |
| Table body                 | `--type-print-table`              | 8.5pt            |
| Table header               | `--type-print-table-head`         | 8pt, bold        |
| Labels                     | `--type-print-label`              | 7.5pt            |
| Small labels               | `--type-print-label-small`        | 6.5pt            |
| Footer / running head      | `--type-print-footer`             | 7pt              |
| Running header             | `--type-print-running-head`       | 8pt              |
| Notes / callouts           | `--type-print-note`               | 7.5pt            |
| Signature lines            | `--type-print-signature`          | 7pt              |

### 3.2 Font Families

All documents use the system font stack defined by `--font-body` and `--font-heading`:

```
"Helvetica Neue", Arial, "Liberation Sans", sans-serif
```

Monospace content (codes, license numbers, form IDs) uses `--font-mono`:

```
"Courier New", Courier, monospace
```

**Web/printable routes** inherit the site font stack (Inter) from the app. This is acceptable — the type scale rules above still apply for sizing.

---

## 4. Color System

All color usage must reference the tokens in `documents/styles/brand.css`. Do not hardcode hex values in document templates.

### 4.1 Core Palette for Documents

| Token                    | Value     | Approved Uses                                                     |
| ------------------------ | --------- | ----------------------------------------------------------------- |
| `--color-primary`        | `#386851` | Section rule lines, header bars, checkmark icons, CTA buttons     |
| `--color-primary-dark`   | `#1E392C` | Running header text, high-contrast section titles                 |
| `--color-primary-darker` | `#122318` | Cover page dark backgrounds                                       |
| `--color-secondary`      | `#BD9264` | Running header/footer border lines, large decorative text (18pt+) |
| `--color-secondary-text` | `#8A6B49` | Footer body text, credential sub-labels, meta text                |
| `--color-bronze`         | `#A87948` | Badge borders, credential accent lines                            |
| `--color-bronze-dark`    | `#6B4E2E` | High-contrast accent text (WCAG AAA)                              |

### 4.2 Text Contrast Rules

- Never use `--color-secondary` (`#BD9264`) for normal body text — it fails WCAG AA on white.
- Use `--color-secondary-text` (`#8A6B49`) for any body-sized credential or meta text.
- Black (`#000`) or `--color-primary-dark` for primary body copy.
- White text requires a minimum background darkness of `--color-primary` or darker.

### 4.3 Callout / Severity Blocks

Use the pre-defined callout tokens for safety and compliance callouts:

| Severity | Background Token     | Border Token             | Text Token             |
| -------- | -------------------- | ------------------------ | ---------------------- |
| Danger   | `--color-danger-bg`  | `--color-danger-border`  | `--color-danger-text`  |
| Warning  | `--color-warning-bg` | `--color-warning-border` | `--color-warning-text` |
| Caution  | `--color-caution-bg` | `--color-caution-border` | `--color-caution-text` |
| Note     | `--color-note-bg`    | `--color-note-border`    | `--color-note-text`    |

---

## 5. Page Layout & Structure

### 5.1 Running Headers (Print)

Every interior page (non-cover) must have a running header implemented via `@top-left` / `@top-right` in `print-base.css`:

- **Left:** Document title (e.g., "MH Construction — Employment Application")
- **Right:** Section or form title (e.g., "Personal Information")
- Border below using `--color-secondary` rule line at `0.5pt`

### 5.2 Running Footers (Print)

Every interior page must include the canonical footer line:

```
MH Construction, Inc.  |  (509) 308-6489  ·  3111 N. Capitol Ave., Pasco, WA 99301  ·  www.mhc-gc.com  |  WA: MHCONCI907R7  ·  OR: 194331  ·  ID: RCE-49250
```

Page number format: `Page X of Y`

### 5.3 Cover Pages

Cover pages must include, in order from top:

1. Logo (light or dark background variant as appropriate)
2. Document title (using `--type-print-form-title`)
3. Company name: `MH Construction, Inc.`
4. Ownership tagline: `Founded 2010, Veteran-Owned Since January 2025`
5. Primary slogan: `Building projects for the Client, NOT the Dollar`
6. Issued date and document version (if applicable)

Cover pages use `@page cover` (no running header/footer, no margin offset).

---

## 6. Forms — Field & Label Standards

### 6.1 Field Labeling

- All field labels use `--type-print-label` weight (7.5pt, uppercase tracking).
- Required fields are indicated by `*` with a foot-of-form legend: `* Required`.
- Labels are positioned **above** the field line, not inline, for print legibility.

### 6.2 Terminology in Forms

All form copy follows [Universal Terminology Guide](../strategy/universal-terminology-guide.md). Key rules:

| Do                                               | Do Not                                  |
| ------------------------------------------------ | --------------------------------------- |
| Client Partners                                  | clients, customers                      |
| Veteran-Owned Since January 2025                 | Veteran-Owned (bare)                    |
| Building projects for the Client, NOT the Dollar | paraphrases of the slogan               |
| Operations                                       | jobs (when using dual-label context)    |
| Mission                                          | project (when using dual-label context) |

### 6.3 Signature Blocks

Signature blocks must include:

- Applicant/signer name line
- Date line
- Printed name line
- Title/role line (where applicable)

Font: `--font-body` at `--type-print-signature` (7pt).

---

## 7. Web Printable Routes

Web routes that render as printable documents (e.g., `/careers/print`, `/safety/print/[id]`) must follow these additional rules on top of the print standards above:

### 7.1 Required Identity Elements

| Element                               | Required |
| ------------------------------------- | -------- |
| Logo                                  | ✅       |
| `MH Construction, Inc.` legal name    | ✅       |
| Ownership tagline with date qualifier | ✅       |
| Primary slogan                        | ✅       |
| Contact line (phone + email)          | ✅       |

### 7.2 Typography

Use Tailwind equivalents to the print CSS token scale:

| Print Token                      | Tailwind Approximate                              |
| -------------------------------- | ------------------------------------------------- |
| `--type-print-form-title` (16pt) | `text-2xl font-black`                             |
| Section heading (9.5pt bold)     | `text-sm font-bold uppercase tracking-wide`       |
| Body/field (9.5pt)               | `text-sm`                                         |
| Label (7.5pt)                    | `text-xs font-semibold uppercase tracking-widest` |
| Footer meta (7pt)                | `text-xs text-gray-500`                           |

### 7.3 Color

Use the Tailwind brand color classes. Do not use arbitrary gray or slate values that fall outside the brand palette on printable routes:

```
brand-primary        → #386851
brand-primary-dark   → #1E392C
brand-secondary      → #BD9264   (large text / decorative only)
brand-secondary-text → #8A6B49   (body text)
```

---

## 8. Branding Anti-Patterns

The following are prohibited on all document and form surfaces:

- ❌ Bare `"Veteran-Owned"` without `"Since January 2025"` when ownership status is being stated
- ❌ `"clients"` or `"customers"` — use `"Client Partners"`
- ❌ Emoji in document source (✓ checkmarks in HTML/CSS are acceptable; emoji characters are not)
- ❌ Hardcoded hex colors that bypass `brand.css` / Tailwind tokens
- ❌ Paraphrasing the primary slogan within the same document that states the canonical version
- ❌ Logo below minimum print size (1 inch width)
- ❌ Cover pages without the ownership tagline
- ❌ Spanish-language documents using emphasis patterns inconsistent with the English canonical line (see note below)

### Spanish Translation Note

The canonical Spanish slogan used across bilingual document/form surfaces is:

```
Construyendo proyectos para el Cliente, NO por el dinero
```

Rules:

- "Cliente" is capitalized (mirrors English "Client").
- "NO" is all-caps (mirrors English "NOT").
- The Spanish ownership tagline: `Fundada en 2010, de Propiedad Veterana desde Enero 2025`
- The Spanish tagline for General Contractor role: `Contratista General de Propiedad de Veteranos Desde Enero 2025`

---

## 9. Document Version & Revision Tracking

All official documents must include a version block on the cover page or in a document-info section:

| Field          | Example                                |
| -------------- | -------------------------------------- |
| Document Title | MH Construction Employment Application |
| Issued By      | MH Construction, Inc.                  |
| Issue Date     | April 18, 2026                         |
| Version        | 1.0.0                                  |
| Review Cycle   | Annual or upon branding update         |

When branding constants change (e.g., new ownership qualifier, updated contact info), all documents must be re-issued and re-versioned within 30 days.

---

## 10. Related Standards

- [Brand Constants](../brand-constants.md) — canonical values for names, slogans, taglines, contact info
- [Color System](./color-system.md) — full color token reference and WCAG compliance guide
- [Unified Component Standards](./unified-component-standards.md) — web page component rules
- [Messaging Guidelines](../strategy/messaging.md) — brand voice and tone
- [Universal Terminology Guide](../strategy/universal-terminology-guide.md) — approved vocabulary
- `documents/styles/brand.css` — CSS token implementation
- `documents/styles/print-base.css` — print layout base styles
- `documents/styles/components.css` — reusable document component styles
