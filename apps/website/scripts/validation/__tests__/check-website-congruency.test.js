/**
 * @jest-environment node
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

describe("Website congruency validator", () => {
  it("passes for current route, terminology, trust, and visual contracts", () => {
    const appRoot = path.resolve(__dirname, "..", "..", "..");
    const scriptPath = path.join(
      appRoot,
      "scripts",
      "validation",
      "check-website-congruency.js",
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("PASS: Website congruency check passed");
    expect(result.stdout).toContain("services-consolidation=ok");
    expect(result.stderr).toBe("");
  });
});
