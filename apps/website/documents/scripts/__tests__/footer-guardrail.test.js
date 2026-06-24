/**
 * Footer guardrail for document/form templates.
 *
 * Canonical source:
 * documents/manuals/safety-manual-letterhead.html
 *
 * This test prevents footer drift in shared form/document templates by
 * requiring the canonical footer structure/tokens that include chambers,
 * trust labels, and contact/license rows.
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

const HTML_MARKUP_TARGETS = [
  path.resolve(__dirname, "..", "..", "manuals", "form-cover.html"),
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
];

const HTML_CSS_ONLY_TARGETS = [
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
    "form-fillable.html",
  ),
];

const RENDERER_TARGETS = [
  path.resolve(__dirname, "..", "generate.mjs"),
  path.resolve(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "documents",
    "scripts",
    "generate.mjs",
  ),
];

const REQUIRED_MARKUP_FRAGMENTS = [
  '<footer class="footer">',
  '<div class="label">Company Contact</div>',
  '<div class="label">Accreditation &amp; Trust</div>',
  '<div class="licenses">{{BRAND_LICENSES_INLINE}}</div>',
  '<div class="chambers" aria-label="Chamber of Commerce memberships">',
  '<div class="veteran-strip">',
  'Veteran-Owned <span class="sep">&#9733;</span> Mission-First',
  "Built on Honor, Integrity &amp; Trust",
  "{{BRAND_CHAMBER_PASCO}}",
  "{{BRAND_CHAMBER_KENNEWICK}}",
  "{{BRAND_CHAMBER_RICHLAND}}",
];

const REQUIRED_CSS_FRAGMENTS = [
  ".footer .contact .label",
  ".footer .trust .label",
  ".footer .chambers",
  ".footer .chambers img",
  ".veteran-strip",
  ".veteran-strip .sep",
];

const DISALLOWED_FOOTER_FRAGMENTS = [
  '<footer class="bottom">',
  '<div class="meta">Company Contact</div>',
  '<div class="meta">Accreditation and Trust</div>',
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

describe("document footer guardrail", () => {
  test("canonical template includes expected footer baseline", () => {
    const canonical = read(CANONICAL_TEMPLATE);

    REQUIRED_MARKUP_FRAGMENTS.forEach((frag) => {
      expect(canonical).toContain(frag);
    });
    REQUIRED_CSS_FRAGMENTS.forEach((frag) => {
      expect(canonical).toContain(frag);
    });
  });

  test.each(HTML_MARKUP_TARGETS)(
    "%s uses canonical footer markup + css",
    (target) => {
      const html = read(target);

      REQUIRED_MARKUP_FRAGMENTS.forEach((frag) => {
        expect(html).toContain(frag);
      });
      REQUIRED_CSS_FRAGMENTS.forEach((frag) => {
        expect(html).toContain(frag);
      });

      DISALLOWED_FOOTER_FRAGMENTS.forEach((frag) => {
        expect(html).not.toContain(frag);
      });
    },
  );

  test.each(HTML_CSS_ONLY_TARGETS)(
    "%s keeps canonical footer css contract",
    (target) => {
      const html = read(target);
      REQUIRED_CSS_FRAGMENTS.forEach((frag) => {
        expect(html).toContain(frag);
      });
    },
  );

  test.each(RENDERER_TARGETS)("%s emits canonical footer markup", (target) => {
    const source = read(target);
    REQUIRED_MARKUP_FRAGMENTS.forEach((frag) => {
      expect(source).toContain(frag);
    });
  });
});
