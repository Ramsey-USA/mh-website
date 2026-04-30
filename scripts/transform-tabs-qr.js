#!/usr/bin/env node
/**
 * Transform safety-manual-tabs.html:
 * - Move QR codes from footer to header
 * - Wrap hero content for consistent layout
 */

const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../documents/manuals/safety-manual-tabs.html",
);
let html = fs.readFileSync(filePath, "utf-8");

// Pattern: each tab page structure
// Match: <div class="tab-hero"> ... </div> (containing logo, rule, number, label, title)
// Transform: Insert QR at top, wrap content

// Find all tab pages and transform them
const tabPageRegex =
  /(<div class="tab-page">[\s\S]*?<div class="tab-accent"><\/div>)([\s\S]*?)(<div class="tab-footer">)/g;

html = html.replace(
  tabPageRegex,
  (match, openingTag, heroContent, footerStart) => {
    // Extract the hero div opening
    const heroOpenRegex =
      /(<div class="tab-hero">)([\s\S]*?)(<div class="tab-logo-wrap">)/;

    // Inject QR header and wrap content
    const heroWithQr = heroContent.replace(
      heroOpenRegex,
      `$1
        <div class="tab-hero-qr">
          <img src="{{BRAND_QR_DASHBOARD}}" alt="Safety Dashboard QR" />
        </div>
        <div class="tab-hero-content">
        $3`,
    );

    // Close the hero-content wrapper before closing tab-hero
    const closedHero = heroWithQr.replace(
      /(<\/div>)\s*(<div class="tab-footer">)/,
      `$1
      </div>
    </div>
    $2`,
    );

    // Remove QR from footer
    const footerWithoutQr = footerStart.replace(
      /<img\s+class="tab-footer-qr"[\s\S]*?\/>/,
      "",
    );

    return (
      openingTag +
      closedHero.replace(/<div class="tab-footer">/, footerWithoutQr)
    );
  },
);

fs.writeFileSync(filePath, html, "utf-8");
console.log("✓ Transformed tab QR layout");
