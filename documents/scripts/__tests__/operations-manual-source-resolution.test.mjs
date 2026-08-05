import test from "node:test";
import assert from "node:assert/strict";

test("operations extractor prefers the numbered ecosystem DOCX", async () => {
  const { resolveOperationsManualSourcePath } =
    await import("../extract-operations-manual.mjs");
  const sourcePath = resolveOperationsManualSourcePath();

  assert.match(
    sourcePath,
    /documents\/input\/01-core-doctrine\/mh-operations-manual-v1-0-draft\.docx$/,
  );
});
