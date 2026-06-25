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
  .filter(
    (name) =>
      name.toLowerCase().endsWith(".docx") &&
      name !== "FORM-MISH-51-Purchase-Approval-General-Expense.docx",
  )
  .sort((a, b) => a.localeCompare(b));

describe("forms-manifest DOCX sources", () => {
  const forms = Array.isArray(manifest.forms) ? manifest.forms : [];
  const mishForms = forms.filter((entry) => /^MISH\s\d{2}$/.test(entry.id));
  const handbookForm08 = forms.find((entry) => entry.id === "HANDBOOK-FORM-08");

  test("manifest is non-empty and well-formed", () => {
    expect(Array.isArray(manifest.forms)).toBe(true);
    expect(forms.length).toBeGreaterThan(0);
    expect(mishForms.length).toBe(sourceDocxFiles.length);
    expect(handbookForm08).toBeDefined();
  });

  test("reclassified purchase approval form is handbook-owned", () => {
    expect(handbookForm08).toBeDefined();
    expect(handbookForm08.slug).toBe(
      "form-handbook-08-purchase-approval-general-expense",
    );
    expect(handbookForm08.category).toBe("MHC-cat3-employee");
    expect(handbookForm08.manualSection).toEqual(["HANDBOOK 08"]);
    expect(handbookForm08.docxPath).toBe(
      "MHC-HANDBOOK-FORMS/HANDBOOK-FORM-08_purchase-approval-general-expense.docx",
    );
    expect(handbookForm08.owner).toBe("Human Resources");
  });

  test.each(mishForms.map((entry) => [entry.id, entry]))(
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
    const manifestDocxFiles = mishForms
      .map((entry) => path.basename(entry.docxPath || ""))
      .sort((a, b) => a.localeCompare(b));

    expect(manifestDocxFiles).toEqual(sourceDocxFiles);
  });

  test("forms are ordered by MISH number", () => {
    const ids = mishForms.map((entry) => entry.id);
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
