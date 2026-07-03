import {
  getJeremyRibbon,
  getJeremyRibbonForPath,
} from "@/lib/content/jeremy-ribbons";

describe("jeremy-ribbons", () => {
  it("returns a configured ribbon for known static routes", () => {
    const ribbon = getJeremyRibbon("about");

    expect(ribbon.eyebrow).toBeTruthy();
    expect(ribbon.quote).toContain("About page");
    expect(ribbon.attribution).toContain("Jeremy Thamert");
  });

  it("returns a configured ribbon for dynamic route keys", () => {
    const ribbon = getJeremyRibbon("services/[slug]");

    expect(ribbon.eyebrow).toContain("Admission");
    expect(ribbon.quote).toContain("service page");
  });

  it("maps root path to the home ribbon", () => {
    const ribbon = getJeremyRibbonForPath("/");

    expect(ribbon.quote).toContain("home page");
  });

  it("falls back to default ribbon for unknown routes", () => {
    const ribbon = getJeremyRibbon("unknown-route");

    expect(ribbon.eyebrow).toBe("Words from the General");
    expect(ribbon.quote).toContain("every page");
  });
});
