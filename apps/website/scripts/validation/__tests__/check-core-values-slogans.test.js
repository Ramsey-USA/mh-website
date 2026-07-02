/**
 * @jest-environment node
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

describe("Core value slogan validator", () => {
  it("passes for current core value slogan pairs", () => {
    const appRoot = path.resolve(__dirname, "..", "..", "..");
    const scriptPath = path.join(
      appRoot,
      "scripts",
      "validation",
      "check-core-values-slogans.js",
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain(
      "PASS: Core value slogan pairs are complete, unique, and synchronized for EN/ES.",
    );
    expect(result.stderr).toBe("");
  });
});
