import test from "node:test";
import assert from "node:assert/strict";

test("operations extractor prefers the numbered ecosystem DOCX", async () => {
  const { resolveOperationsManualSourcePath } =
    await import("../extract-operations-manual.mjs");
  const sourcePath = resolveOperationsManualSourcePath();

  assert.match(
    sourcePath.replaceAll("\\", "/"),
    /documents\/input\/01-core-doctrine\/mh-operations-manual-v1-0-draft\.docx$/,
  );
});

test("operations extractor preserves body text and the manual preamble", async () => {
  const { splitDocxSections } =
    await import("../extract-operations-manual.mjs");
  const sections = splitDocxSections(`Control block\nEnterprise preamble\nOPS-01 | AUTHORITY\nPurpose text\nOPS-01.1 COMMAND OWNER\nOwner text`);

  assert.equal(sections.length, 2);
  assert.match(sections[0].markdown, /Control block/);
  assert.match(sections[0].markdown, /Purpose text/);
  assert.match(sections[1].markdown, /Owner text/);
});
