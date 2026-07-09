# MH Construction Brand Constants

**Category:** Branding - Single Source of Truth  
**Last Updated:** April 30, 2026  
**Version:** 1.4.0  
**Status:** ✅ Official Reference

> **Purpose:** This file is the canonical reference for all brand constants, including
> company identity, messaging, contact details, contractor licensing, and verification
> links. When updating any documentation, refer to these exact values. All other
> documents should link here rather than redefining these values.

---

## Company Identity

### Legal Names

| Context             | Name                  | Usage                                                 |
| ------------------- | --------------------- | ----------------------------------------------------- |
| **Legal/Formal**    | MH Construction, Inc. | Contracts, legal pages, official filings, BBB profile |
| **Marketing/Brand** | MH Construction       | Website, marketing materials, casual references       |

### Company History

| Milestone               | Value                         |
| ----------------------- | ----------------------------- |
| **Founded**             | 2010                          |
| **Original Founder**    | Mike Holstein                 |
| **Current Owner**       | Jeremy Thamert (Army veteran) |
| **Veteran-Owned Since** | January 2025                  |
| **BBB Accreditation**   | A+ Rating since April 7, 2026 |

### Standard Tagline

```text
Founded 2010, Veteran-Owned Since January 2025
```

**Variations (all acceptable):**

- "Founded 2010 | Veteran-Owned Since January 2025" (with pipe)
- "Founded 2010, Veteran-Owned Since January 2025" (with comma)
- "MH Construction – Founded 2010, Veteran-Owned Since January 2025"

**Avoid:**

<!-- LINT-EXEMPT: showing incorrect usage for documentation -->

- ❌ "Veteran-Owned Since 2025" (missing month) <!-- LINT-EXEMPT -->
- ❌ "veteran-owned since January 2025" (incorrect capitalization) <!-- LINT-EXEMPT -->

<!-- END-LINT-EXEMPT -->

---

## Contact Information

| Type        | Value                               | Format Note                             |
| ----------- | ----------------------------------- | --------------------------------------- |
| **Phone**   | (509) 308-6489                      | Always use parentheses around area code |
| **Email**   | <office@mhc-gc.com>                 | All lowercase                           |
| **Website** | <https://www.mhc-gc.com>            | Include www for canonical               |
| **Address** | 3111 N Capitol Ave, Pasco, WA 99301 | No periods in abbreviations             |

### Link Formats

```markdown
Phone: [(509) 308-6489](tel:+15093086489)
Email: [office@mhc-gc.com](mailto:office@mhc-gc.com)
Website: [www.mhc-gc.com](https://www.mhc-gc.com)
```

---

## Brand Messaging

### Primary Strategy Line (Mission)

```text
Built on Quality, Backed by Trust.
```

**CRITICAL:** Keep punctuation and capitalization exactly as shown.

**Correct:**

- ✅ "Built on Quality, Backed by Trust."

**Incorrect:**

- ❌ "clear planning. accountable delivery."
- ❌ "Clear planning, accountable delivery"
- ❌ "Clear planning and accountable delivery"

### Secondary Strategy Line (Partnership)

```text
Built on communication and follow-through
```

**Usage:** Supporting line for partnership-focused messaging.

### Supporting Operations Line

```text
Squared away from start to finish.
```

**Usage:** Use when describing preconstruction, execution discipline, and day-to-day delivery standards with client and trade partner audiences.

### Supporting Relationship Line

```text
From Handshake to Handoff, we got your 'six.'
```

**Usage:** Use in partnership-focused messaging that emphasizes continuity, accountability, and end-to-end support for client and trade partner teams.

### Supporting Execution Lines

```text
Professional on the line. Thorough in the details.
No gaps. No guesswork. Just accountable follow-through.
```

**Usage:** Use in service-process, safety, and preconstruction messaging where execution discipline and handoff quality are emphasized.

### Vision Statement

```text
To be the Pacific Northwest's most trusted veteran-led construction partner — renowned for craftsmanship and character.
```

---

## Core Values

The four-value foundation system, in hierarchical order:

| Order | Value               | Key Phrase                              |
| ----- | ------------------- | --------------------------------------- |
| 1     | **Honesty**         | Transparent Communication Always        |
| 2     | **Integrity**       | Doing What's Right, Every Time          |
| 3     | **Professionalism** | Excellence in Every Interaction         |
| 4     | **Thoroughness**    | Attention to Detail in Everything We Do |

**Ultimate Goal:** **Trust** — Built through consistent demonstration of all four values.

---

## Brand Typography

**Brand Congruency:** Typography and color choices must stay paired with the approved MH brand system; do not introduce alternate font stacks or palettes outside documented exceptions.

### Font System

Web brand fonts use a self-hosted Mendl family model: Mendl Sans Dusk for heading/display roles and Mendl Sans Dawn for body/running text, loaded from `/public/fonts/Mendl Fonts/`.

- **Heading / Subheading**: Mendl Sans Dusk (fallback `Mendl Sans Dawn, Roboto, sans-serif`)
- **Body**: Mendl Sans Dawn (fallback `Mendl Sans Dusk, Roboto, sans-serif`)

### Usage Rules

- **Mendl Sans Dusk** — used for all H1–H6 headings, subheadings, section titles, badge labels, and tab divider titles
- **Mendl Sans Dawn** — used for all body copy, paragraphs, captions, form labels, navigation text, and document body content
- Semantic `<h1>`–`<h6>` elements automatically receive the heading face via global CSS; for non-semantic title elements (eyebrows, kickers, badge labels) explicitly add the `font-heading` Tailwind utility
- Fallbacks activate automatically if brand fonts are not yet loaded

### CSS Variables

```css
--font-heading:
  "mendl-sans-dusk", "Mendl Sans Dusk", "mendl-sans-dawn", "Mendl Sans Dawn",
  Roboto, sans-serif;
--font-body:
  "mendl-sans-dawn", "Mendl Sans Dawn", "mendl-sans-dusk", "Mendl Sans Dusk",
  Roboto, sans-serif;
```

### Tailwind Utilities

```html
font-heading → Mendl Sans Dusk + fallbacks (headings) font-body / font-sans →
Mendl Sans Dawn + fallbacks (body)
```

---

## Brand Colors

**Brand Congruency:** Use these colors consistently across pages, components, and print outputs so typography, contrast, and visual tone remain aligned.

| Name                        | Hex     | RGB                | Usage                           |
| --------------------------- | ------- | ------------------ | ------------------------------- |
| **Hunter Green (Primary)**  | #386851 | rgb(56, 104, 81)   | Primary CTAs, trust signals     |
| **Leather Tan (Secondary)** | #BD9264 | rgb(189, 146, 100) | Large text, backgrounds         |
| **Secondary Text**          | #8A6B49 | rgb(138, 107, 73)  | WCAG AA compliant for body text |
| **Architectural Bronze**    | #A87948 | rgb(168, 121, 72)  | CTA borders, accents            |

---

## Service Area

### Primary Markets

- **Headquarters:** Pasco, WA
- **Tri-Cities Headquarters:** Pasco, Richland, Kennewick

### Extended Markets

- Yakima, WA
- Spokane, WA
- Walla Walla, WA

### Licensed States

- Washington (WA)
- Oregon (OR)
- Idaho (ID)

### Canonical License Numbers

- WA: MHCONCI907R7
- OR: 194331
- ID: RCE-49250

### License Verification References

- WA verify: [secure.lni.wa.gov](https://secure.lni.wa.gov/verify/Detail.aspx?UBI=603069508&LIC=MHCONCI907R7&SAW=false)
- OR verify: [egov.sos.state.or.us](https://egov.sos.state.or.us/br/pkg_web_name_srch_inq.show_detl?p_be_rsn=1514612&p_srce=BR_INQ&p_print=FALSE)
- ID verify: [labor.idaho.gov](https://www.labor.idaho.gov/)

### Licensing Source of Truth

Use this section as the canonical licensing reference for docs and agent workflows.

- Canonical docs reference: docs/branding/brand-constants.md (this section)
- Canonical footer implementation: src/components/layout/Footer.tsx
- Canonical public PWA install entry: src/components/layout/Footer.tsx (footer only; no install popups/banners)
- Canonical document-brand payload: documents/brands/mhc.json
- Canonical footer regression tests: `src/components/layout/__tests__/Footer.test.tsx`

---

## Terminology Standards

### Partnership Language

| Term                | Usage                                           |
| ------------------- | ----------------------------------------------- |
| **Client Partners** | Businesses/individuals who hire MH Construction |
| **Trade Partners**  | Subcontractors, vendors, suppliers              |
| **Allies**          | Trade partner network members                   |

### Avoid These Terms

| Avoid                        | Use Instead                     |
| ---------------------------- | ------------------------------- |
| ❌ "retail-buyer labels"     | ✅ "Client Partners"            |
| ❌ "clients" (alone)         | ✅ "Client Partners"            |
| ❌ "subcontractor shorthand" | ✅ "Trade Partners"             |
| ❌ "vendors"                 | ✅ "Trade Partners" or "Allies" |

---

## Associations & Affiliations

### Associated General Contractors (AGC)

| Affiliation       | Details                                                           |
| ----------------- | ----------------------------------------------------------------- |
| **Membership**    | AGC Member                                                        |
| **BABAA Support** | Dedicated supporter of the Build America, Buy America Act (BABAA) |
| **Resource**      | [AGC BABAA Resource Hub](https://www.agc.org/babaa-resource-hub)  |

**Standard Language:**

> "MH Construction is a dedicated supporter of the Build America, Buy America Act (BABAA), a federal
> domestic-content requirement for certain federally funded infrastructure projects. As an AGC member,
> we stay current on BABAA guidance and compliance-forward practices for government projects."

**Usage:** Reference when discussing government or public sector work, federal project compliance, or
veteran-owned distinctions on procurement-sensitive surfaces. Keep mentions factual and
compliance-oriented — avoid hype language.

---

## Credentials

### 4-Tier Veteran Owned Business Certification Program

MH Construction is pursuing all four tiers of veteran-owned business certification to achieve
maximum credibility and procurement access across state, federal, and private/corporate channels.
When fully certified, this 4-tier stack creates an exceptionally powerful competitive position
in the construction market.

| Tier | Level               | Certification | Certifying Body                               | Status               |
| ---- | ------------------- | ------------- | --------------------------------------------- | -------------------- |
| 1    | State               | WA DVA VOB    | Washington State Dept. of Veterans Affairs    | ✅ Certified (2026)  |
| 2    | Federal             | SBA VetCert   | U.S. Small Business Administration            | 🔄 Actively Pursuing |
| 3    | Private / Corporate | NaVOBA        | National Veteran-Owned Business Association   | 🔄 Actively Pursuing |
| 4    | Private / Corporate | NVBDC         | National Veteran Business Development Council | 🔄 Actively Pursuing |

> **Canonical implementation reference:** `COMPANY_INFO.veteranCertifications` in
> `src/lib/constants/company.ts`. When a tier reaches "certified" status, add its
> logo path there and create a badge component following the `WaVobBadge` pattern.

---

### Washington State Veteran Owned Business (WA DVA) — Tier 1 ✅ Certified

```markdown
**WA VOB Certified:** Awarded 2026 — [Washington DVA Veteran Owned Business Program](https://dva.wa.gov/veterans-service-members-and-their-families/veteran-owned-businesses)
```

- **Certification Body:** Washington State Department of Veterans Affairs (DVA)
- **Program:** Veteran Owned Business certification
- **Badge Asset:** `/public/images/logo/veteran-owned-business.jpg`
- **Display Rule:** The badge logo does not have a transparent background.
  Always render it inside the `WaVobBadge` component (`src/components/ui/WaVobBadge.tsx`),
  which wraps the image in a patriotic red-to-blue gradient border container.
  This is an **approved color exception** — see [Color System §Veteran Owned Badge Exception](./standards/color-system.md).

---

### SBA Veteran Small Business Certification (SBA VetCert) — Tier 2 🔄 In Pursuit

```markdown
**SBA VetCert:** Actively Pursuing — [SBA VetCert Program](https://veterans.certify.sba.gov/)
```

- **Certification Body:** U.S. Small Business Administration (SBA)
- **Program:** Veteran Small Business Certification (covers VOSB and SDVOSB designations)
- **Significance:** The federal government's official veteran-owned certification — required for VA
  and SBA procurement set-asides and federal contract preference programs
- **Status:** Actively pursuing — do not display as certified until official confirmation received
- **On Certification:** Add logo asset and create badge component following `WaVobBadge` pattern;
  update `COMPANY_INFO.veteranCertifications.sbaVetCert.status` to `"certified"`

---

### NaVOBA Veteran Owned Business Certification — Tier 3 🔄 In Pursuit

```markdown
**NaVOBA:** Actively Pursuing — [NaVOBA Certification Program](https://www.navoba.com/)
```

- **Certification Body:** National Veteran-Owned Business Association (NaVOBA)
- **Program:** Private/corporate veteran-owned business certification
- **Significance:** Opens corporate supplier diversity pipelines and demonstrates commitment
  to veteran business recognition with Fortune 1000 procurement teams
- **Status:** Actively pursuing — do not display as certified until official confirmation received
- **On Certification:** Add logo asset and create badge component following `WaVobBadge` pattern;
  update `COMPANY_INFO.veteranCertifications.navoba.status` to `"certified"`

---

### NVBDC Veteran Owned Business Certification — Tier 4 🔄 In Pursuit

```markdown
**NVBDC:** Actively Pursuing — [NVBDC Certification Program](https://nvbdc.org/)
```

- **Certification Body:** National Veteran Business Development Council (NVBDC)
- **Program:** Private/corporate veteran-owned business certification
- **Significance:** The nation's largest third-party VOB certifier — provides access to major
  corporate supplier diversity programs and Fortune 500/1000 procurement networks
- **Status:** Actively pursuing — do not display as certified until official confirmation received
- **On Certification:** Add logo asset and create badge component following `WaVobBadge` pattern;
  update `COMPANY_INFO.veteranCertifications.nvbdc.status` to `"certified"`

---

### BBB Profile

```markdown
**BBB Accredited:** A+ Rating since April 7, 2026 — [View BBB Profile](https://www.bbb.org/us/wa/pasco/profile/construction/mh-construction-inc-1296-1000191036)
```

### Safety Record

- **EMR Rating:** 0.64 (40% better than industry average)
- **Claim:** "Award-Winning Safety"

### Experience

- **Combined Team Experience:** 150+ years
- **Completed Projects:** 650+
- **Referral Business:** 70%

---

## Document Standards

### Header Format

```markdown
# Document Title

**Category:** [Category] - [Subcategory]  
**Last Updated:** July 3, 2026  
**Version:** [X.Y.Z]  
**Status:** ✅ Active
```

### Footer Format

```markdown
---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
```

### Status Indicators

| Status     | Format          |
| ---------- | --------------- |
| Active     | `✅ Active`     |
| Draft      | `📝 Draft`      |
| Deprecated | `⚠️ Deprecated` |
| Archived   | `📦 Archived`   |

---

## Version History

- **1.4.0** — April 30, 2026: Added 4-tier Veteran Owned Business certification framework table; documented SBA VetCert (Tier 2), NaVOBA (Tier 3), and NVBDC (Tier 4) as in-pursuit credentials with program URLs and certification guidance
- **1.3.0** — April 30, 2026: Added WA Veteran Owned Business (WA DVA) certification to Credentials section; documented `WaVobBadge` display rule and approved color exception
- **1.2.0** — April 24, 2026: Added canonical license values, verification references, and licensing source-of-truth guidance
- **1.1.0** — April 21, 2026: Added Associations & Affiliations / BABAA section
- **1.0.0** — April 15, 2026: Initial brand constants document

---

**MH Construction** — Founded 2010, Veteran-Owned Since January 2025  
[← Back to README](../../README.md)
