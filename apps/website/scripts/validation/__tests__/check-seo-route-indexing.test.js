/**
 * @jest-environment node
 */

const path = require("node:path");
const { spawnSync } = require("node:child_process");

describe("SEO route indexing validator", () => {
  it("passes for the current route policy and sitemap state", () => {
    const appRoot = path.resolve(__dirname, "..", "..", "..");
    const scriptPath = path.join(
      appRoot,
      "scripts",
      "validation",
      "check-seo-route-indexing.js",
    );

    const result = spawnSync(process.execPath, [scriptPath], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("SEO route indexing policy check passed");
    expect(result.stderr).toBe("");
  });
});
