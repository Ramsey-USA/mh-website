import test from "node:test";
import assert from "node:assert/strict";
import {
  parseArgs,
  resolveDocumentPublishTarget,
} from "../publish-document-family.mjs";

test("resolves standard document families to the right publish settings", () => {
  assert.deepEqual(resolveDocumentPublishTarget("operations-manual"), {
    family: "manual",
    slug: "operations-manual",
    manualArg: "operations-manual",
    r2Prefix: "docs/operations",
    label: "Operations Manual",
    publishScript: "apps/website/scripts/r2-publish-manual-family.sh",
  });

  assert.deepEqual(resolveDocumentPublishTarget("employee-handbook"), {
    family: "manual",
    slug: "employee-handbook",
    manualArg: "employee-handbook",
    r2Prefix: "docs/employee",
    label: "Employee Handbook",
    publishScript: "apps/website/scripts/r2-publish-employee-handbook.sh",
  });

  assert.deepEqual(resolveDocumentPublishTarget("safety-manual"), {
    family: "manual",
    slug: "safety-manual",
    manualArg: "safety",
    r2Prefix: "docs/safety",
    label: "MISH",
    publishScript: "apps/website/scripts/r2-publish-safety-pdfs.sh",
  });
});

test("parses a dry-run flag and target argument", () => {
  assert.deepEqual(parseArgs(["--dry-run", "operations-manual"]), {
    targetInput: "operations-manual",
    dryRun: true,
    help: false,
  });

  assert.deepEqual(parseArgs(["--help"]), {
    targetInput: null,
    dryRun: false,
    help: true,
  });
});
