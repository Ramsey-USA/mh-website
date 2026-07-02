/**
 * @jest-environment node
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

describe("Primary slogan support validator", () => {
  it("passes for current source and message files", () => {
    const appRoot = path.resolve(__dirname, "..", "..", "..");
    const scriptPath = path.join(
      appRoot,
      "scripts",
      "validation",
      "check-primary-slogan-support.js",
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(
      "PASS: Every primary slogan occurrence includes supporting slogan coverage.",
    );
    expect(result.stderr).toBe("");
  });
});
