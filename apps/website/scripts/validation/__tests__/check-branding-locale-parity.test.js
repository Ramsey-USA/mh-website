const path = require("node:path");
const { spawnSync } = require("node:child_process");

describe("check-branding-locale-parity.js", () => {
  it("passes locale branding parity validation", () => {
    const scriptPath = path.resolve(
      __dirname,
      "..",
      "check-branding-locale-parity.js",
    );

    const result = spawnSync("node", [scriptPath], {
      cwd: path.resolve(__dirname, "..", "..", ".."),
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain(
      "PASS: Branding locale parity is synchronized",
    );
  });
});
