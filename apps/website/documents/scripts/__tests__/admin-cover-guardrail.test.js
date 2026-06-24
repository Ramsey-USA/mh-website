/**
 * Administration form cover guardrail.
 *
 * Enforces the required owner and retention language contract for
 * project administration cover pages.
 */

const fs = require("fs");
const path = require("path");

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

const REQUIRED_ADMIN_FRAGMENTS = [
  'category === "mhc-cat6-project-admin"',
  '"Owner (Jeremy Thamert)"',
  '"Forward original to Project Engineer; retain a controlled copy in the project office file."',
  '"{{FORM_OWNER}}": escapeHtml(ownerLabel)',
];

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

describe("administration form cover guardrail", () => {
  test.each(RENDERER_TARGETS)(
    "%s keeps required admin owner and retention wording",
    (target) => {
      const source = read(target);
      REQUIRED_ADMIN_FRAGMENTS.forEach((frag) => {
        expect(source).toContain(frag);
      });
    },
  );
});
