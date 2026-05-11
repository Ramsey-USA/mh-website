/**
 * @jest-environment node
 */

const path = require("node:path");
const fs = require("node:fs");
const { spawnSync } = require("node:child_process");

const appRoot = path.resolve(__dirname, "..", "..", "..");
const policyPath = path.join(
  appRoot,
  "config",
  "seo",
  "route-indexing-policy.json",
);
const syncScript = path.join(
  appRoot,
  "scripts",
  "validation",
  "sync-seo-route-indexing-policy.js",
);
const checkScript = path.join(
  appRoot,
  "scripts",
  "validation",
  "check-seo-route-indexing.js",
);

describe("SEO route policy sync", () => {
  let originalPolicy;

  beforeEach(() => {
    originalPolicy = fs.readFileSync(policyPath, "utf8");
  });

  afterEach(() => {
    fs.writeFileSync(policyPath, originalPolicy);
  });

  it("passes sync check for current repository state", () => {
    const result = spawnSync(process.execPath, [syncScript, "--check"], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain("SEO route policy sync");
  });

  it("fails route checker when pending classifications exist", () => {
    const parsed = JSON.parse(originalPolicy);
    parsed.pendingClassification = ["/about"];
    fs.writeFileSync(policyPath, `${JSON.stringify(parsed, null, 2)}\n`);

    const result = spawnSync(process.execPath, [checkScript], {
      cwd: appRoot,
      encoding: "utf8",
    });

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "Pending route classifications must be resolved",
    );
  });
});
