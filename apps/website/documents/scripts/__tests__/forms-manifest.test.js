/**
 * DOCX-backed forms manifest regression test
 *
 * Locks the structural shape of the MISH form manifest so accidental
 * edits to ids, manual section mappings, or source DOCX paths fail loudly.
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
const sourceDir = path.resolve(
  __dirname,
  "..",
  "..",
  "forms",
  "MHC-MISH-47-Forms",
);

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const sourceDocxFiles = fs
  .readdirSync(sourceDir)
  .filter((name) => name.toLowerCase().endsWith(".docx"))
  .sort((a, b) => a.localeCompare(b));

describe("forms-manifest DOCX sources", () => {
  const forms = Array.isArray(manifest.forms) ? manifest.forms : [];

  test("manifest is non-empty and well-formed", () => {
    expect(Array.isArray(manifest.forms)).toBe(true);
    expect(forms.length).toBeGreaterThan(0);
    expect(forms.length).toBe(sourceDocxFiles.length);
  });

  test.each(forms.map((entry) => [entry.id, entry]))(
    "%s has required DOCX-backed shape",
    (_id, entry) => {
      expect(typeof entry.id).toBe("string");
      expect(entry.id).toMatch(/^MISH\s\d{2}$/);
      expect(typeof entry.slug).toBe("string");
      expect(entry.slug).toMatch(/^form-mish-\d{2}-/);
      expect(typeof entry.title).toBe("string");
      expect(entry.title.length).toBeGreaterThan(0);
      expect(entry.category).toBe("MHC-cat2-safety");
      expect(entry.categoryLabel).toBe("Safety Forms");
      expect(entry.categoryIcon).toBe("🛡");
      expect(Array.isArray(entry.manualSection)).toBe(true);
      expect(entry.manualSection).toEqual([entry.id]);
      expect(typeof entry.docxPath).toBe("string");
      expect(entry.docxPath).toMatch(/^MHC-MISH-47-Forms\/FORM-MISH-/);
      expect(entry.fillable).toBeUndefined();
      expect(entry.revision).toBe("1.0");
      expect(entry.effectiveDate).toBe("June 2026");
      expect(entry.owner).toBe("Safety Officer (Matt Ramsey)");
    },
  );

  test("manifest ids match the uploaded DOCX set", () => {
    const manifestDocxFiles = forms
      .map((entry) => path.basename(entry.docxPath || ""))
      .sort((a, b) => a.localeCompare(b));

    expect(manifestDocxFiles).toEqual(sourceDocxFiles);
  });

  test("forms are ordered by MISH number", () => {
    const ids = forms.map((entry) => entry.id);
    expect(ids).toEqual([
      "MISH 01",
      "MISH 02",
      "MISH 03",
      "MISH 04",
      "MISH 05",
      "MISH 06",
      "MISH 08",
      "MISH 09",
      "MISH 10",
      "MISH 11",
      "MISH 12",
      "MISH 13",
      "MISH 14",
      "MISH 15",
      "MISH 16",
      "MISH 17",
      "MISH 18",
      "MISH 19",
      "MISH 20",
      "MISH 21",
      "MISH 22",
      "MISH 23",
      "MISH 24",
      "MISH 25",
      "MISH 26",
      "MISH 27",
      "MISH 28",
      "MISH 29",
      "MISH 30",
      "MISH 32",
      "MISH 33",
      "MISH 34",
      "MISH 35",
      "MISH 36",
      "MISH 37",
      "MISH 38",
      "MISH 39",
      "MISH 40",
      "MISH 41",
      "MISH 42",
      "MISH 43",
      "MISH 44",
      "MISH 46",
      "MISH 47",
      "MISH 48",
      "MISH 49",
      "MISH 50",
    ]);
  });

  test("no legacy fillable schemas remain", () => {
    expect(forms.some((entry) => entry.fillable)).toBe(false);
  });
});
