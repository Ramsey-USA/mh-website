/**
 * @jest-environment node
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

describe("Brand congruency sync validator", () => {
  it("passes when constants, messages, component, and checklist are synchronized", () => {
    const appRoot = path.resolve(__dirname, "..", "..", "..");
    const scriptPath = path.join(
      appRoot,
      "scripts",
      "validation",
      "check-brand-congruency-sync.js",
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(
      "PASS: Brand congruency sources are synchronized",
    );
    expect(result.stderr).toBe("");
  });
});
