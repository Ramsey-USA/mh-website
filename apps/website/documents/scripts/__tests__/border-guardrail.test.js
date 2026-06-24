/**
 * Border/chrome guardrail for document/form templates.
 *
 * Canonical source:
 * documents/manuals/safety-manual-letterhead.html
 *
 * This test prevents frame/ribbon drift by enforcing the canonical
 * border geometry and ribbon gradient tokens in shared form templates.
 */

const fs = require("fs");
const path = require("path");

const CANONICAL_TEMPLATE = path.resolve(
  __dirname,
  "..",
  "..",
  "manuals",
  "safety-manual-letterhead.html",
);

const BORDER_TARGETS = [
  path.resolve(__dirname, "..", "..", "manuals", "form-cover.html"),
  path.resolve(__dirname, "..", "..", "manuals", "form-fillable.html"),
  path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "documents",
    "manuals",
    "form-cover.html",
  ),
  path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "documents",
    "manuals",
    "form-fillable.html",
  ),
];

const REQUIRED_BORDER_FRAGMENTS = [
  "0.22in",
  "0.33in",
  "border: 1.2pt solid var(--brand-primary)",
  "border: 0.6pt solid var(--brand-secondary)",
  "top: 0.45in",
  "left: 0.45in",
  "width: 0.28in",
  "var(--brand-primary) 68%",
  "var(--brand-secondary) 100%",
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

describe("document border guardrail", () => {
  test("canonical template includes expected border baseline", () => {
    const canonical = read(CANONICAL_TEMPLATE);
    REQUIRED_BORDER_FRAGMENTS.forEach((frag) => {
      expect(canonical).toContain(frag);
    });
  });

  test.each(BORDER_TARGETS)(
    "%s keeps canonical frame and ribbon dimensions",
    (target) => {
      const html = read(target);
      REQUIRED_BORDER_FRAGMENTS.forEach((frag) => {
        expect(html).toContain(frag);
      });
    },
  );
});
