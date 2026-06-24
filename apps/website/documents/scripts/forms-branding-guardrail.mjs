/**
 * forms-branding-guardrail.mjs
 *
 * Enforces canonical border alignment, ribbon styling, and footer branding
 * across all generated form PDFs—matching the safety-manual-letterhead.html.
 *
 * Usage:
 *   import { applyFormBrandingChrome } from './forms-branding-guardrail.mjs';
 *   const html = applyFormBrandingChrome(bodyHtml, formEntry, brandConfig);
 */

/**
 * Apply letterhead-aligned branding chrome to form body HTML.
 *
 * Wraps unwrapped form content with:
 *   - Outer border: 1.2pt solid primary, inset 0.22in
 *   - Inner border: 0.6pt solid secondary, inset 0.33in
 *   - Left ribbon: 0.28in wide, gradient primary→secondary
 *   - Footer: Company contact + trust logos, positioned at 0.62in bottom
 *
 * @param {string} bodyContent - The unwrapped form body HTML
 * @param {Object} formEntry - Form metadata {id, title, revision, effectiveDate}
 * @param {Object} brandConfig - Brand colors and info {colors, company, logos}
 * @returns {string} Complete HTML with frames, ribbon, footer
 */
export function applyFormBrandingChrome(bodyContent, formEntry, brandConfig) {
  const {
    primary = "#386851",
    primaryDark = "#2d5142",
    secondary = "#BD9264",
    secondaryText = "#6b6b67",
  } = brandConfig.colors || {};

  const {
    companyName = "",
    addressStreet = "",
    addressCityStateZip = "",
    phone = "",
    website = "",
    licenses = "",
  } = brandConfig.company || {};

  const { agcLogo = "", bbbLogo = "", vobLogo = "" } = brandConfig.logos || {};

  // Validate canonical metrics
  const outerInset = "0.22in";
  const innerInset = "0.33in";
  const ribbonLeft = "0.45in";
  const ribbonWidth = "0.28in";
  const footerBottom = "0.62in";

  // Warn if body contains hard-coded borders
  if (
    bodyContent.includes("border:") ||
    bodyContent.includes("border-top:") ||
    bodyContent.includes("border-left:")
  ) {
    console.warn(
      `  ⚠  ${formEntry.id}: Body contains hard-coded borders—guardrail may conflict`,
    );
  }

  const font = "'DIN 2014','Helvetica Neue',Arial,sans-serif";

  // Build footer HTML
  const footerHtml = `
    <footer class="page-footer" style="
      position: absolute;
      left: 0.92in;
      right: 0.9in;
      bottom: ${footerBottom};
      padding-top: 9pt;
      border-top: 1.2pt solid ${primary};
      display: grid;
      grid-template-columns: 1.45fr 1fr;
      gap: 0.25in;
      align-items: end;
      font-family: ${font};
      font-size: 7.8pt;
      color: ${primaryDark};
      z-index: 2;
      box-sizing: border-box;
    ">
      <style>
        .page-footer::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 2.5pt;
          height: 0.6pt;
          background: ${secondary};
        }
      </style>

      <!-- Left: Company Contact -->
      <div style="
        min-width: 0;
        line-height: 1.45;
      ">
        <div style="
          font-size: 7pt;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 800;
          color: ${secondaryText};
          margin-bottom: 4pt;
        ">Company Contact</div>
        <div style="
          font-weight: 800;
          color: ${primary};
          font-size: 8.2pt;
          white-space: nowrap;
        ">${escapeHtml(companyName)}</div>
        <div style="
          font-size: 7pt;
          color: ${secondaryText};
          white-space: nowrap;
        ">${escapeHtml(addressStreet)}</div>
        <div style="
          font-size: 7pt;
          color: ${secondaryText};
          white-space: nowrap;
        ">${escapeHtml(addressCityStateZip)}</div>
        <div style="
          font-size: 7pt;
          color: ${secondaryText};
          white-space: nowrap;
        ">${escapeHtml(phone)} · ${escapeHtml(website)}</div>
        <div style="
          margin-top: 4pt;
          font-size: 7.2pt;
          color: ${secondaryText};
          font-weight: 700;
        ">${licenses}</div>
      </div>

      <!-- Right: Accreditation & Trust -->
      <div style="
        text-align: right;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 5pt;
      ">
        <div style="
          font-size: 7pt;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          font-weight: 800;
          color: ${secondaryText};
          white-space: nowrap;
        ">Accreditation and Trust</div>
        <div style="
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          gap: 9pt;
        ">
          ${agcLogo ? `<img src="${agcLogo}" alt="AGC membership" style="height: 0.36in; width: auto;" />` : ""}
          ${bbbLogo ? `<img src="${bbbLogo}" alt="BBB accredited" style="height: 0.39in; width: auto;" />` : ""}
          ${vobLogo ? `<img src="${vobLogo}" alt="Veteran owned" style="height: 0.5in; width: auto;" />` : ""}
        </div>
      </div>
    </footer>
  `;

  // Build complete HTML
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(formEntry.title || formEntry.id || "Form")}</title>
    <style>
      :root {
        --brand-primary: ${primary};
        --brand-primary-dark: ${primaryDark};
        --brand-secondary: ${secondary};
        --brand-secondary-text: ${secondaryText};
        --ink: #12231b;
        --paper: #ffffff;
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      @page {
        size: letter portrait;
        margin: 0;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        width: 8.5in;
        font-family: ${font};
        background: var(--paper);
        color: var(--ink);
      }

      .page-frame {
        position: relative;
        width: 8.5in;
        min-height: 11in;
        background: var(--paper);
      }

      .page-frame::before {
        content: "";
        position: absolute;
        inset: ${outerInset};
        border: 1.2pt solid var(--brand-primary);
        pointer-events: none;
        z-index: 1;
      }

      .page-frame::after {
        content: "";
        position: absolute;
        inset: ${innerInset};
        border: 0.6pt solid var(--brand-secondary);
        pointer-events: none;
        z-index: 1;
      }

      .left-ribbon {
        position: absolute;
        top: 0.45in;
        left: ${ribbonLeft};
        width: ${ribbonWidth};
        height: 10.10in;
        background: linear-gradient(
          180deg,
          var(--brand-primary) 0%,
          var(--brand-primary) 68%,
          var(--brand-secondary) 100%
        );
        z-index: 1;
      }

      .page-content {
        position: relative;
        top: 0.92in;
        left: 0.92in;
        right: 0.9in;
        z-index: 0;
      }
    </style>
  </head>
  <body>
    <div class="page-frame">
      <div class="left-ribbon" aria-hidden="true"></div>
      <div class="page-content">
        ${bodyContent || "<p><em>No content extracted.</em></p>"}
      </div>
      ${footerHtml}
    </div>
  </body>
</html>`;
}

/**
 * Escape HTML special characters to prevent injection.
 */
function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
