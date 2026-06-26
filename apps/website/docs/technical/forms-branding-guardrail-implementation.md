---
title: Forms Branding Guardrail — Implementation Guide
description: Complete guide to enforcing letterhead-aligned branding across all form PDFs
---

## Forms Branding Guardrail — Implementation Guide

## Overview

A forms branding guardrail system has been created to ensure **all safety forms** use identical border alignment, ribbon styling, and footer branding as the `safety-manual-letterhead.html` template.

This guardrail enforces:

- ✅ Canonical border frames (outer + inner, letterhead-aligned)
- ✅ Left ribbon gradient (Hunter green → tan leather)
- ✅ Company contact footer information
- ✅ Trust logos (AGC, BBB, Washington VOB)
- ✅ Prevention of hard-coded border conflicts
- ✅ HTML escaping for security

## Files Created

### 1. Guardrail Implementation Module

**File:** [`documents/scripts/forms-branding-guardrail.mjs`](../scripts/forms-branding-guardrail.mjs)

Provides the `applyFormBrandingChrome()` function that wraps any form body content with:

- Complete HTML structure with DOCTYPE, head, body
- CSS variables for brand colors (inlined to avoid @import issues)
- Canonical page layout and margin rules
- Outer border frame (1.2pt primary, inset 0.22in)
- Inner border frame (0.6pt secondary, inset 0.33in)
- Left ribbon (0.28in wide, gradient)
- Letterhead-aligned footer with company contact + trust logos
- XSS protection via `escapeHtml()`

**Export:**

```javascript
export function applyFormBrandingChrome(bodyContent, formEntry, brandConfig)
  → {string} Complete HTML with frames, ribbon, footer
```

### 2. Regression Test Suite

**File:** [`documents/scripts/__tests__/forms-branding.test.js`](../../__tests__/forms-branding.test.js)

12 automated tests verify:

- ✓ Outer border inset exactly 0.22in
- ✓ Inner border inset exactly 0.33in
- ✓ Ribbon positioned at 0.45in left, 0.28in wide
- ✓ Footer at exact 0.62in bottom position
- ✓ Footer grid layout 1.45fr 1fr
- ✓ Company contact section present and complete
- ✓ Accreditation logos (AGC, BBB, VOB) present
- ✓ Correct brand colors applied throughout
- ✓ Warnings logged for hard-coded border conflicts
- ✓ Valid HTML5 structure generated
- ✓ XSS prevention (HTML escaping works)

**Run tests:**

```bash
npm test -- documents/scripts/__tests__/forms-branding.test.js
```

### 3. Guardrail Instruction File

**File:** [`.github/instructions/forms-branding-guardrail.instructions.md`](../../.github/instructions/forms-branding-guardrail.instructions.md)

Comprehensive documentation of:

- Canonical branding standards (measurements, colors, positions)
- CSS patterns for borders, ribbon, footer
- Implementation rules and patterns
- Fillable form template requirements
- DOCX form body wrapper instructions
- Regression test requirements
- Enforcement strategy (build-time, review-time, recovery)

## How to Use

### A. For DOCX-Backed Form Generation

When generating PDFs from Word documents (via mammoth.js or similar):

```javascript
import { applyFormBrandingChrome } from "./forms-branding-guardrail.mjs";

// Step 1: Extract DOCX to HTML (using mammoth or other library)
const bodyHtml = await extractDocxToHtml(docxPath);

// Step 2: Wrap with guardrail
const formEntry = {
  id: "MISH 01",
  title: "Injury Free Workplace Plan Acknowledgment",
  revision: "1",
  effectiveDate: "04/07/2026",
};

const brandConfig = {
  colors: {
    primary: "#386851",
    primaryDark: "#2d5142",
    secondary: "#BD9264",
    secondaryText: "#6b6b67",
  },
  company: {
    companyName: "MH Construction, Inc.",
    addressStreet: "1234 West Street",
    addressCityStateZip: "Seattle, WA 98101",
    phone: "(206) 555-0123",
    website: "www.mhc-gc.com",
    licenses: "Licensed • Bonded • Insured",
  },
  logos: {
    agcLogo: BRAND_TOKENS["{{BRAND_AGC_HORIZONTAL}}"],
    bbbLogo: BRAND_TOKENS["{{BRAND_BBB_SEAL}}"],
    vobLogo: BRAND_TOKENS["{{BRAND_WA_VOB_LOGO}}"],
  },
};

// Step 3: Apply guardrail chrome
const htmlWithChrome = applyFormBrandingChrome(
  bodyHtml,
  formEntry,
  brandConfig,
);

// Step 4: Render to PDF with 0 margins (chrome owns all spacing)
await renderHtmlToPdf(htmlWithChrome, pdfPath, {
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
```

### B. For Fillable Form Templates

When using the `form-fillable.html` template:

1. **Ensure template includes canonical frames:**

   ```html
   <style>
     .page-frame::before {
       content: "";
       position: absolute;
       inset: 0.22in;
       border: 1.2pt solid var(--brand-primary);
     }

     .page-frame::after {
       content: "";
       position: absolute;
       inset: 0.33in;
       border: 0.6pt solid var(--brand-secondary);
     }

     .left-ribbon {
       position: absolute;
       top: 0.45in;
       left: 0.45in;
       width: 0.28in;
       background: linear-gradient(
         180deg,
         var(--brand-primary) 0%,
         var(--brand-primary) 68%,
         var(--brand-secondary) 100%
       );
     }
   </style>
   ```

2. **Include footer section with correct grid:**
   ```html
   <footer
     class="page-footer"
     style="
     position: absolute;
     left: 0.92in;
     right: 0.9in;
     bottom: 0.62in;
     display: grid;
     grid-template-columns: 1.45fr 1fr;
     ...
   "
   >
     <!-- Company Contact (left) -->
     <!-- Trust Logos (right) -->
   </footer>
   ```

### C. For Custom Form HTML

Wrap any custom form body with the guardrail:

```javascript
// Your custom form body
const customFormBody = `
  <div class="form-section">
    <h1>Custom Form Title</h1>
    <form>
      <!-- form fields -->
    </form>
  </div>
`;

// Apply guardrail
const htmlWithChrome = applyFormBrandingChrome(
  customFormBody,
  formEntry,
  brandConfig,
);

// Render to PDF
await renderHtmlToPdf(htmlWithChrome, pdfPath, {
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
```

## Canonical Measurements Reference

| Element                  | Measurement              | Details                                   |
| ------------------------ | ------------------------ | ----------------------------------------- |
| **Outer Border**         | Inset 0.22in             | 1.2pt solid primary color (#386851)       |
| **Inner Border**         | Inset 0.33in             | 0.6pt solid secondary color (#BD9264)     |
| **Left Ribbon**          | Left 0.45in, 0.28in wide | Gradient 0-68% primary, 68-100% secondary |
| **Footer Position**      | Bottom 0.62in            | Absolute positioning, page-1 only         |
| **Footer Grid**          | 1.45fr 1fr               | Left column: contact; Right column: logos |
| **Company Contact Area** | Left column              | Font 7.8pt, line-height 1.45              |
| **Trust Logos Area**     | Right column             | Right-aligned, bottom-aligned, gaps 9pt   |
| **Page Size**            | Letter portrait          | 8.5in × 11in                              |
| **Page Margins**         | 0 (Chrome owns spacing)  | All spacing via CSS positioning           |

## Validation Checklist

When implementing form branding:

- [ ] Form has outer border: 1.2pt primary, inset 0.22in
- [ ] Form has inner border: 0.6pt secondary, inset 0.33in
- [ ] Form has left ribbon: 0.28in wide at 0.45in left
- [ ] Ribbon has gradient: primary → secondary
- [ ] Footer is at 0.62in from bottom
- [ ] Footer includes "Company Contact" label
- [ ] Footer includes company name, address, phone, website
- [ ] Footer includes company licenses inline
- [ ] Footer has "Accreditation and Trust" label
- [ ] Footer includes AGC logo (0.36in height)
- [ ] Footer includes BBB logo (0.39in height)
- [ ] Footer includes VOB logo (0.5in height)
- [ ] Footer grid is 1.45fr 1fr
- [ ] No hard-coded borders in form body
- [ ] HTML is valid (DOCTYPE, head, body)
- [ ] All brand colors use CSS variables
- [ ] XSS-vulnerable text is escaped

## Common Issues & Fixes

### Issue: Form borders don't match letterhead

**Solution:** Check `inset:` values. Must be exactly `0.22in` (outer) and `0.33in` (inner).

### Issue: Footer is cut off

**Solution:** Ensure page margins are `0` in Puppeteer options:

```javascript
{ margin: { top: 0, right: 0, bottom: 0, left: 0 } }
```

### Issue: Ribbon appears broken or offset

**Solution:** Verify ribbon CSS:

```css
left: 0.45in;
width: 0.28in;
height: 10.1in; /* Must stretch nearly full page */
```

### Issue: Company contact shows in wrong place

**Solution:** Footer must use `position: absolute; bottom: 0.62in;`

### Issue: Logos not displaying

**Solution:** Use base64 data URLs from BRAND_TOKENS instead of file paths (Puppeteer's isolated footer context cannot load local files).

## Integration Points

### In `generate.mjs`

Import the guardrail:

```javascript
import { applyFormBrandingChrome } from "./forms-branding-guardrail.mjs";
```

Use in any form generation function:

```javascript
const htmlWithChrome = applyFormBrandingChrome(
  formBody,
  formEntry,
  brandConfig,
);
await renderHtmlToPdf(htmlWithChrome, pdfPath, {
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
});
```

### In CI/CD Pipeline

Run regression tests before merge:

```bash
npm test -- documents/scripts/__tests__/forms-branding.test.js
```

Fail the build if any test fails (guardrail validates canonical standards).

## Enforcing the Guardrail

### Build Time

- ✅ Guardrail function validates metrics and logs warnings
- ✅ Jest regression tests verify all canonical measurements
- ✅ CI pipeline runs tests before merging

### Review Time

- ✅ PR checklist includes "Branding guardrail applied?"
- ✅ Design review verifies borders, ribbon, footer in PDF output
- ✅ Compare form PDF to letterhead reference PDF side-by-side

### Recovery Path

If a form deviates:

1. Identify violation:

   ```bash
   node documents/scripts/generate.mjs --validate-forms
   ```

2. Update form HTML or wrapper function

3. Regenerate affected forms

4. Run tests:

   ```bash
   npm test -- forms-branding.test.js
   ```

5. Verify output PDF against reference

## Testing

### Run all branding tests

```bash
npm test -- forms-branding.test.js
```

### Test specific measurement

```bash
npm test -- forms-branding.test.js -t "outer border inset"
```

### Check test coverage

```bash
npm test -- forms-branding.test.js --coverage
```

## Related Documentation

- [Safety Manual Letterhead Template](../manuals/safety-manual-letterhead.html) — Master of truth for border/footer styling
- [Forms Branding Guardrail Instruction](../../.github/instructions/forms-branding-guardrail.instructions.md) — Authoritative requirements
- [Form Development Officer Agent](../../.github/agents/form-development-officer.agent.md) — Form-specific development standards

---

**Status:** ✅ Complete  
**Tests:** 12/12 passing  
**Last Updated:** 2026-06-24  
**Maintained By:** Document Generation Pipeline
