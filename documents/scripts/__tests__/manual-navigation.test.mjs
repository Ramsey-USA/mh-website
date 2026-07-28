import test from "node:test";
import assert from "node:assert/strict";

import {
  buildTocEntryHtml,
  resolveMishSectionTargets,
  sectionNavigationHref,
} from "../manual-navigation.mjs";

test("sectionNavigationHref uses the cluster anchor for each chapter", () => {
  assert.equal(
    sectionNavigationHref(21),
    "/resources/safety-manual/fall-and-access-safety#mish-21",
  );
  assert.equal(
    sectionNavigationHref(59),
    "/resources/safety-manual/program-compliance-and-continuity#mish-59",
  );
  assert.equal(sectionNavigationHref(0), "/resources/safety-manual/contents");
});

test("TOC chapter rows link to the canonical section route", () => {
  const html = buildTocEntryHtml(21, "Fall Protection", {
    sectionHref: sectionNavigationHref(21),
  });

  assert.match(
    html,
    /href="\/resources\/safety-manual\/fall-and-access-safety#mish-21"/,
  );
  assert.match(html, />Fall Protection</);
});

test("resolveMishSectionTargets builds canonical QR links for MISH sections", () => {
  const targets = resolveMishSectionTargets(["MISH 21", "MISH 59", "MISH 60"]);

  assert.deepEqual(
    targets.map((entry) => entry.label),
    ["MISH 21", "MISH 59"],
  );
  assert.equal(
    targets[0].url,
    "/resources/safety-manual/fall-and-access-safety#mish-21",
  );
  assert.equal(
    targets[1].url,
    "/resources/safety-manual/program-compliance-and-continuity#mish-59",
  );

  const absoluteTargets = resolveMishSectionTargets(["MISH 15"], {
    siteUrl: "https://example.com",
  });
  assert.equal(
    absoluteTargets[0].url,
    "https://example.com/resources/safety-manual/safety-oversight-and-industrial-hygiene#mish-15",
  );
});
