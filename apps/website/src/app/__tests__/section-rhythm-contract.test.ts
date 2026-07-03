import fs from "node:fs";
import path from "node:path";

describe("Section rhythm contracts", () => {
  const srcRoot = path.join(process.cwd(), "src");

  it("keeps shared Section padding tiers aligned to approved cadence", () => {
    const sectionFile = path.join(srcRoot, "components/ui/layout/Section.tsx");
    const source = fs.readFileSync(sectionFile, "utf8");

    expect(source.includes("py-12 sm:py-16 lg:py-20 xl:py-24")).toBe(true);
    expect(source.includes("py-16 sm:py-20 lg:py-24 xl:py-28")).toBe(true);
    expect(source.includes("py-10 sm:py-12")).toBe(true);

    expect(source.includes("py-20 lg:py-32 xl:py-40")).toBe(false);
  });

  it("keeps ServicesShowcase deferred loading and fallback spacing in sync", () => {
    const deferredFile = path.join(
      srcRoot,
      "components/home/ServicesShowcaseDeferred.tsx",
    );
    const source = fs.readFileSync(deferredFile, "utf8");

    const expectedSectionClass =
      'className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24 dark:bg-gray-900"';

    const occurrences = source.split(expectedSectionClass).length - 1;

    expect(occurrences).toBe(2);
    expect(source.includes("py-20 lg:py-32 xl:py-40")).toBe(false);
  });
});
