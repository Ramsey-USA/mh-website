import test from "node:test";
import assert from "node:assert/strict";

import { renderHtmlDocument } from "../build-operations-manual-pdf.mjs";

const brand = {
  companyName: "MH Construction, Inc.",
  phone: "(509) 308-6489",
  website: "www.mhc-gc.com",
  colors: {
    primary: "#386851",
    primaryDark: "#1E392C",
    secondary: "#BD9264",
    secondaryLight: "#D9BD93",
    secondaryText: "#8A6B49",
  },
  licenses: {
    WA: "MHCONCI907R7",
  },
};

test("operations manual markup uses handbook-style frame and footer chrome", () => {
  const html = renderHtmlDocument(
    [
      {
        fileName: "01-example.md",
        title: "Example Section",
        sectionId: "example-section",
        markdown: "# Example Section\n\nBody copy.",
      },
    ],
    [],
    brand,
  );

  assert.match(html, /class="page-frame"/);
  assert.match(html, /class="left-ribbon"/);
  assert.match(html, /class="page-footer"/);
  assert.match(html, /class="cover-chip"/);
  assert.match(html, /class="cover-identity"/);
  assert.match(html, /class="cover-logo"/);
  assert.match(html, /class="cover-summary-card"/);
  assert.match(html, /class="cover-qr-card"/);
  assert.match(html, /class="cover-veteran-strip"/);
  assert.match(html, /class="toc-header"/);
  assert.match(html, /class="section-header-row"/);
  assert.match(html, /class="manual-section-title"/);
  assert.match(html, /Built on Quality, Backed by Trust\./);
  assert.match(html, /class="contact"/);
  assert.match(html, /class="trust"/);
  assert.match(html, /class="logos"/);
  assert.doesNotMatch(html, /class="label"/);
  assert.doesNotMatch(html, /Company Contact/);
  assert.doesNotMatch(html, /Accreditation and Trust/);
  assert.doesNotMatch(html, /class="chambers"/);
  assert.match(
    html,
    /\.cover-hero\s*\{[^}]*top:\s*1\.35in;[^}]*left:\s*1\.02in;[^}]*right:\s*1\.02in;/s,
  );
  assert.match(
    html,
    /\.cover-identity\s*\{[^}]*top:\s*0\.62in;[^}]*left:\s*0\.92in;[^}]*right:\s*0\.9in;/s,
  );
  assert.match(
    html,
    /\.cover-title\s*\{[^}]*font-size:\s*48pt;[^}]*line-height:\s*0\.9;/s,
  );
  assert.match(
    html,
    /\.cover-subtitle\s*\{[^}]*margin:\s*0\.16in\s+0\s+0;[^}]*font-size:\s*10pt;/s,
  );
});
