---
title: Forms Branding Guardrail
description: Ensures all safety forms use canonical border alignment and footer styling consistent with the letterhead template
applyTo: "**/documents/scripts/generate.mjs", "**/documents/forms/**/*.{html,mjs}"
---

# Forms Branding Guardrail

## Purpose

Enforce consistent border alignment, frame styling, and footer branding across all safety forms—whether generated from fillable schemas, DOCX imports, or custom templates.

## Canonical Standards

### Border Frame (Letterhead-Aligned)

All form body PDFs must include:

- **Outer border**: `1.2pt solid` primary color (`#386851`)
  - Position: `0.22in` from all edges
  - Z-index: behind ribbon, above content

- **Inner border**: `0.6pt solid` secondary color (`#BD9264`)
  - Position: `0.33in` from all edges
  - Z-index: behind outer border

- **Left ribbon**: Vertical gradient band
  - Position: `0.45in` from left edge, `0.28in` wide
  - Gradient: Hunter green (0%) → tan leather (100%)
  - Page-1 only; height: content full height minus margins

**CSS Pattern:**

```css
.page-frame::before {
  content: "";
  position: absolute;
  inset: 0.22in;
  border: 1.2pt solid var(--brand-primary);
  pointer-events: none;
}

.page-frame::after {
  content: "";
  position: absolute;
  inset: 0.33in;
  border: 0.6pt solid var(--brand-secondary);
  pointer-events: none;
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
```

### Footer (Letterhead-Aligned)

All form pages must include a footer with:

- **Position**: Absolute at bottom `0.62in` (page-1), repeated on subsequent pages
- **Top border**: `1.2pt solid` primary color with `0.6pt solid` secondary color separator line
- **Layout**: CSS Grid `1.45fr 1fr`
  - Left: Company contact block
  - Right: Accreditation & trust logos (AGC, BBB, VOB)

**Footer Content:**

**Left Column (Contact):**

- Label: "COMPANY CONTACT" (7pt, uppercase, secondary color)
- Name: Company legal name (8.2pt, bold, primary color)
- Address: Street, City, State ZIP (7.8pt, secondary-text color)
- Phone & Website (7.8pt, secondary-text color)
- Licenses inline (7.2pt, secondary color)

**Right Column (Trust):**

- Label: "ACCREDITATION AND TRUST" (7pt, uppercase, secondary color)
- Logos: AGC (0.36in H), BBB (0.39in H), VOB (0.5in H)
- All logos right-aligned, bottom-aligned

**CSS Pattern:**

```css
.page-footer {
  position: absolute;
  left: 0.92in;
  right: 0.9in;
  bottom: 0.62in;
  padding-top: 9pt;
  border-top: 1.2pt solid var(--brand-primary);
  display: grid;
  grid-template-columns: 1.45fr 1fr;
  gap: 0.25in;
  align-items: end;
}

.page-footer::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 2.5pt;
  height: 0.6pt;
  background: var(--brand-secondary);
}
```

### Page Margins & Spacing

- **Letter size**: 8.5in × 11in
- **Page margins**: `0.42in` top/bottom, `0.5in` left/right (Puppeteer units)
- **Content area**: Leaves `0.62in` at bottom for footer (page-1)
- **Break handling**: Content must not obscure footer; use `page-break-inside: avoid` on footer blocks

## Implementation Rules

### Rule 1: Form Wrapper Function

All DOCX-derived form bodies **must** be wrapped by `applyFormBrandingChrome()` before rendering to PDF.

**Function signature:**

```javascript
function applyFormBrandingChrome(bodyHtml, formEntry) {
  // Returns complete HTML with frames, ribbon, footer
  // Validates border metrics and footer presence
  // Logs validation results
}
```

**Validation checks:**

- Outer border inset: exactly `0.22in`
- Inner border inset: exactly `0.33in`
- Ribbon position: exactly `0.45in` left, `0.28in` width
- Footer position: exactly `0.62in` bottom
- Footer grid: exactly `1.45fr 1fr`
- Company contact block present
- At least one accreditation logo present (AGC recommended)

### Rule 2: No Hard-Coded Styling

Forms must **not** define:

- Custom borders outside the canonical frame
- Custom ribbons or decoration bands
- Custom footers that override the letterhead pattern
- Margin adjustments that would push content below the footer area

Violations detected by guardrail during generation → **WARN + log details**.

### Rule 3: Fillable Form Template Compliance

The `form-fillable.html` template **must include**:

- `.page-frame::before` and `::after` pseudo-elements (matching letterhead)
- `.left-ribbon` element or CSS
- `.page-footer` footer container with correct grid layout
- All three trust logos (AGC, BBB, VOB) present

### Rule 4: DOCX Form Body Wrapper

When `generateDocxFormBody()` is called:

1. Extract DOCX → clean HTML
2. **Wrap** result with `applyFormBrandingChrome(cleanedHtml, formEntry)`
3. Render to PDF with margins: `0, 0, 0, 0` (chrome owns all spacing)
4. Validate footer + borders in output PDF

### Rule 5: Regression Tests

All form generation tests must verify:

- ✅ Outer + inner border insets are canonical
- ✅ Ribbon is present and positioned correctly
- ✅ Footer is present at correct bottom position
- ✅ Footer includes both contact and trust sections
- ✅ No hard-coded borders in form body HTML

## Enforcement

### At Build Time

- `generate.mjs` logs **WARN** if guardrail violation detected
- `applyFormBrandingChrome()` fails with error if critical metrics missing
- CI test suite includes border/footer validation

### At Review Time

- Forms PR checklist includes: "Borders match letterhead?" and "Footer includes logos?"
- Design review gates forms that deviate from canonical standards

### Recovery Path

If a form deviates:

1. Identify violation: `node documents/scripts/generate.mjs --validate-forms`
2. Update form HTML or use `applyFormBrandingChrome()` wrapper
3. Regenerate: `npm run docs:generate:forms-all`
4. Verify: `npm run test:forms-branding`

## Examples

### ✅ Correct Form Structure

```html
<!doctype html>
<html lang="en">
  <head>
    <style>
      :root {
        --brand-primary: #386851;
        --brand-secondary: #bd9264;
        /* ... */
      }

      @page {
        size: letter portrait;
        margin: 0;
      }

      .page-frame {
        position: relative;
        width: 8.5in;
        min-height: 11in;
      }

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

      .page-footer {
        position: absolute;
        left: 0.92in;
        right: 0.9in;
        bottom: 0.62in;
        border-top: 1.2pt solid var(--brand-primary);
        display: grid;
        grid-template-columns: 1.45fr 1fr;
        gap: 0.25in;
        align-items: end;
      }
    </style>
  </head>
  <body>
    <div class="page-frame">
      <div class="left-ribbon"></div>
      <div class="page-content">
        <!-- Form body content -->
      </div>
      <footer class="page-footer">
        <!-- Contact + trust logos -->
      </footer>
    </div>
  </body>
</html>
```

### ❌ Violations to Avoid

- **Hard-coded custom borders**: `border: 2pt solid blue;` (outside canonical frame)
- **Misaligned ribbon**: `left: 0.5in;` instead of `0.45in`
- **Missing footer**: No `.page-footer` element
- **Oversized margins**: `margin: 1in;` that obscures canonical frame
- **Custom footer grid**: Grid columns other than `1.45fr 1fr`

## Related Files

- [`generate.mjs`](../../apps/website/documents/scripts/generate.mjs) — Core implementation of `applyFormBrandingChrome()`
- [`safety-manual-letterhead.html`](../../apps/website/documents/manuals/safety-manual-letterhead.html) — Canonical reference (master of truth for all border/footer styling)
- [`form-fillable.html`](../../apps/website/documents/manuals/form-fillable.html) — Fillable form template (must comply)
- [`forms-manifest.json`](../../apps/website/documents/forms/forms-manifest.json) — Form metadata
- [`forms-branding.test.js`](../../apps/website/documents/scripts/__tests__/forms-branding.test.js) — Regression tests

---

**Last Updated:** 2026-06-24  
**Enforced By:** `applyFormBrandingChrome()` + Jest regression suite
