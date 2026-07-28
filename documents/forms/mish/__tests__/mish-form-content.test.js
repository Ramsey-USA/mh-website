const fs = require("node:fs");
const path = require("node:path");

function readJson(relativePath) {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8"),
  );
}

describe("MISH form chapter alignment", () => {
  it("keeps MISH 51 summaries tied to leading-indicator governance and field execution", () => {
    const form = readJson(
      "form-mish-51-leading-indicators-safety-performance-metrics-log.json",
    );
    const html =
      form.pages?.[0]?.sections?.find((section) => section.type === "htmlBlock")
        ?.html || "";

    expect(html).toContain("leading indicators");
    expect(html).toContain("Mission Brief");
    expect(html).toContain("near-miss");
    expect(html).toContain("Safety Dashboard");
  });

  it("keeps MISH 52 summaries tied to annual safety-culture assessment and improvement", () => {
    const form = readJson(
      "form-mish-52-safety-culture-assessment-continuous-improvement-record.json",
    );
    const html =
      form.pages?.[0]?.sections?.find((section) => section.type === "htmlBlock")
        ?.html || "";

    expect(html).toContain("safety culture");
    expect(html).toContain("Hudson");
    expect(html).toContain("anonymous");
    expect(html).toContain("12-month");
  });

  it("keeps MISH 59 summaries tied to good-faith Stop Work Authority execution", () => {
    const form = readJson(
      "form-mish-59-stop-work-authority-activation-report.json",
    );
    const html =
      form.pages?.[0]?.sections?.find((section) => section.type === "htmlBlock")
        ?.html || "";

    expect(html).toContain("Stop Work Authority");
    expect(html).toContain("imminent hazard");
    expect(html).toContain("Site Safety Commander");
    expect(html).toContain("good-faith");
  });
});
