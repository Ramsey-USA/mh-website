import test from "node:test";
import assert from "node:assert/strict";

test("marketing extractor prefers the numbered ecosystem DOCX", async () => {
  const { resolveGuideSourcePath } =
    await import("../extract-marketing-strategy-guide.mjs");
  const sourcePath = resolveGuideSourcePath();

  assert.match(
    sourcePath,
    /documents\/input\/02-strategy-and-business-dev\/mh-marketing-strategy-guide-v1-0-draft\.docx$/,
  );
});

test("sales extractor prefers the numbered ecosystem DOCX", async () => {
  const { resolveGuideSourcePath } =
    await import("../extract-sales-estimating-guide.mjs");
  const sourcePath = resolveGuideSourcePath();

  assert.match(
    sourcePath,
    /documents\/input\/02-strategy-and-business-dev\/mh-sales-estimating-guide-v1-0-draft\.docx$/,
  );
});
