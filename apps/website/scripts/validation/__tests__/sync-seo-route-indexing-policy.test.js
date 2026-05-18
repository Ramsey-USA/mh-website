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

function runNodeScript(scriptPath, args = []) {
  const result = spawnSync(process.execPath, [scriptPath, ...args], {
    cwd: appRoot,
    encoding: "utf8",
  });

  if (result.error) {
    throw result.error;
  }

  return result;
}

function assertSuccess(result, context) {
  if (result.status !== 0) {
    throw new Error(
      [
        `${context} exited with status ${String(result.status)}.`,
        `stdout:\n${result.stdout || "<empty>"}`,
        `stderr:\n${result.stderr || "<empty>"}`,
      ].join("\n\n"),
    );
  }
}

describe("SEO route policy sync", () => {
  let originalPolicy;

  beforeEach(() => {
    originalPolicy = fs.readFileSync(policyPath, "utf8");
  });

  afterEach(() => {
    fs.writeFileSync(policyPath, originalPolicy);
  });

  it("passes sync check for current repository state", () => {
    const syncResult = runNodeScript(syncScript, ["--write"]);
    assertSuccess(syncResult, "sync-seo-route-indexing-policy --write");

    const result = runNodeScript(syncScript, ["--check"]);
    assertSuccess(result, "sync-seo-route-indexing-policy --check");
    expect(result.stdout).toContain("SEO route policy sync");
  });

  it("fails route checker when pending classifications exist", () => {
    const parsed = JSON.parse(originalPolicy);
    parsed.pendingClassification = ["/about"];
    fs.writeFileSync(policyPath, `${JSON.stringify(parsed, null, 2)}\n`);

    const result = runNodeScript(checkScript);

    expect(result.status).toBe(1);
    expect(result.stderr).toContain(
      "Pending route classifications must be resolved",
    );
  });
});
