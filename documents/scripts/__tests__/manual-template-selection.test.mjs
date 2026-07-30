import test from "node:test";
import assert from "node:assert/strict";

test("marketing and sales guides use the operations manual templates", async () => {
  const originalArgv = process.argv;
  process.argv = ["node", "generate.mjs", "--manual", "marketing"];
  try {
    const { resolveManualTemplateName } = await import(
      `../generate.mjs?test=${Date.now()}`
    );
    const templateName = resolveManualTemplateName("cover");
    assert.equal(templateName, "operations-manual-cover.html");
  } finally {
    process.argv = originalArgv;
  }
});
