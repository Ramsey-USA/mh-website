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

test("guide section QR codes resolve to their own guide paths", async () => {
  const originalArgv = process.argv;
  process.argv = ["node", "generate.mjs", "--manual", "marketing"];
  try {
    const { buildSectionQrTargetUrl } = await import(
      `../generate.mjs?test=${Date.now() + 1}`
    );
    assert.equal(
      buildSectionQrTargetUrl({ number: 1, slug: "core-doctrine" }),
      "https://www.mhc-gc.com/docs/marketing/sections/01-core-doctrine.pdf",
    );
  } finally {
    process.argv = originalArgv;
  }

  process.argv = ["node", "generate.mjs", "--manual", "sales"];
  try {
    const { buildSectionQrTargetUrl } = await import(
      `../generate.mjs?test=${Date.now() + 2}`
    );
    assert.equal(
      buildSectionQrTargetUrl({ number: 1, slug: "core-doctrine" }),
      "https://www.mhc-gc.com/docs/sales/sections/01-core-doctrine.pdf",
    );
  } finally {
    process.argv = originalArgv;
  }
});
