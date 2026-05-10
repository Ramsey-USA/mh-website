/**
 * Forms manifest schema regression test
 *
 * Locks the structural shape of every fillable schema in
 * documents/forms/forms-manifest.json so accidental edits
 * (missing namespace, malformed section, dropped field) fail loudly.
 *
 * Also pins page counts (number of "first" + extra pages) and total
 * named-field counts per form so a regression in the renderer can be
 * detected without rebuilding PDFs.
 */

const fs = require("fs");
const path = require("path");

const manifestPath = path.resolve(
  __dirname,
  "..",
  "..",
  "forms",
  "forms-manifest.json",
);

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

// Locked baseline: { id: { pages, fields } }
// Update intentionally when adding/removing form fields.
// Counts are SCHEMA fields, not rendered AcroForm widgets (which include
// auto-injected page-N "Initial" boxes and other chrome).
const BASELINE = {
  "FORM 02-A": { pages: 2, fields: 12 },
  "FORM 02-B": { pages: 2, fields: 21 },
  "FORM 02-C": { pages: 3, fields: 42 },
  "FORM 02-D": { pages: 2, fields: 32 },
  "FORM 02-E": { pages: 2, fields: 28 },
  "FORM 02-F": { pages: 2, fields: 20 },
  "FORM 02-G": { pages: 1, fields: 28 },
  "FORM 02-H": { pages: 1, fields: 17 },
  "FORM 02-I": { pages: 2, fields: 20 },
  "FORM 02-J": { pages: 2, fields: 31 },
  "FORM 03-A": { pages: 1, fields: 21 },
  "FORM 03-C": { pages: 1, fields: 23 },
  "FORM 03-D": { pages: 1, fields: 30 },
  "FORM 04-A": { pages: 1, fields: 23 },
  "FORM 04-B": { pages: 1, fields: 36 },
  "FORM 04-C": { pages: 2, fields: 41 },
  "FORM 04-D": { pages: 2, fields: 30 },
  "FORM 05-A": { pages: 2, fields: 37 },
};

function countNamedFields(section) {
  if (!section || typeof section !== "object") return 0;
  let n = 0;
  if (Array.isArray(section.items)) {
    n += section.items.filter((i) => i && typeof i.name === "string").length;
  }
  if (Array.isArray(section.blocks)) {
    n += section.blocks.filter((b) => b && typeof b.name === "string").length;
  }
  if (typeof section.name === "string") n += 1;
  if (Array.isArray(section.rows) && Array.isArray(section.cols)) {
    n += section.rows.length * section.cols.length;
  }
  return n;
}

const VALID_SECTION_TYPES = new Set([
  "refNote",
  "checkGrid",
  "fieldGrid",
  "narrative",
  "dataTable",
  "regTable",
  "signatures",
]);

describe("forms-manifest fillable schemas", () => {
  const fillableEntries = manifest.forms.filter((f) => f.fillable);

  test("manifest is non-empty and well-formed", () => {
    expect(Array.isArray(manifest.forms)).toBe(true);
    expect(manifest.forms.length).toBeGreaterThan(0);
    expect(fillableEntries.length).toBeGreaterThan(0);
  });

  test.each(fillableEntries.map((f) => [f.id, f]))(
    "%s has required schema shape",
    (_id, entry) => {
      expect(typeof entry.slug).toBe("string");
      expect(entry.slug.length).toBeGreaterThan(0);
      expect(typeof entry.title).toBe("string");
      expect(typeof entry.fillable.namespace).toBe("string");
      expect(entry.fillable.namespace).toMatch(/^[a-z0-9]+$/i);
      expect(Array.isArray(entry.fillable.pages)).toBe(true);
      expect(entry.fillable.pages.length).toBeGreaterThan(0);

      // manualSection must be array (for QR rendering loop)
      if (entry.manualSection !== null && entry.manualSection !== undefined) {
        expect(Array.isArray(entry.manualSection)).toBe(true);
        entry.manualSection.forEach((s) => expect(typeof s).toBe("string"));
      }

      entry.fillable.pages.forEach((page, pi) => {
        expect(["first", "cont", "extra"]).toContain(page.kind);
        expect(Array.isArray(page.sections)).toBe(true);
        expect(page.sections.length).toBeGreaterThan(0);
        page.sections.forEach((sec, si) => {
          expect(VALID_SECTION_TYPES.has(sec.type)).toBe(true);
        });
      });
    },
  );

  test.each(Object.keys(BASELINE).map((id) => [id]))(
    "%s page + field counts match locked baseline",
    (id) => {
      const entry = manifest.forms.find((f) => f.id === id);
      expect(entry).toBeDefined();
      expect(entry.fillable).toBeDefined();

      const pages = entry.fillable.pages.length;
      const fields = entry.fillable.pages.reduce(
        (sum, page) =>
          sum + page.sections.reduce((s, sec) => s + countNamedFields(sec), 0),
        0,
      );

      const baseline = BASELINE[id];
      // Strict equality: regressions in the schema fail loudly.
      // Update BASELINE intentionally when adding/removing fields.
      expect(pages).toBe(baseline.pages);
      expect(fields).toBe(baseline.fields);
    },
  );
});
