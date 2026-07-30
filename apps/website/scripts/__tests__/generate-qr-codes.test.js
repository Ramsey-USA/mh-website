const {
  buildFinalQRCodeList,
  getFolderForQR,
  normalizeManifestFormQrName,
} = require("../generate-qr-codes");
const fs = require("node:fs");
const path = require("node:path");

function loadActiveTeamMembersForQrGuardrail() {
  const teamDir = path.join(__dirname, "../../src/lib/data/team");
  return fs
    .readdirSync(teamDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) =>
      JSON.parse(fs.readFileSync(path.join(teamDir, file), "utf8")),
    )
    .filter((member) => member?.active && member?.slug)
    .filter((member) => String(member.slug) !== "mike-holstein");
}

describe("generate-qr-codes form QR naming", () => {
  it("normalizes handbook form slugs to the document guardrail naming pattern", () => {
    expect(
      normalizeManifestFormQrName(
        { slug: "form-handbook-cv-company-vehicle-acknowledgement" },
        "handbook-form",
      ),
    ).toBe("handbook-form-handbook-cv-company-vehicle-acknowledgement");
  });

  it("normalizes safety form slugs to the document guardrail naming pattern", () => {
    expect(
      normalizeManifestFormQrName(
        { slug: "form-mish-01-injury-free-workplace-plan-acknowledgment" },
        "safety-form",
      ),
    ).toBe("safety-form-mish-01-injury-free-workplace-plan-acknowledgment");
  });

  it("includes guide QR codes that point at the published TOC PDFs", () => {
    const qrCodes = buildFinalQRCodeList();

    expect(qrCodes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "operations-manual",
          url: "https://www.mhc-gc.com/docs/operations/operations-manual-toc.pdf",
          folder: "manuals",
        }),
        expect.objectContaining({
          name: "marketing-strategy-guide",
          url: "https://www.mhc-gc.com/docs/marketing/marketing-strategy-guide-toc.pdf",
          folder: "manuals",
        }),
        expect.objectContaining({
          name: "sales-estimating-guide",
          url: "https://www.mhc-gc.com/docs/sales/sales-estimating-guide-toc.pdf",
          folder: "manuals",
        }),
      ]),
    );
  });

  it("routes guide QR assets into the manuals folder", () => {
    expect(getFolderForQR("operations-manual")).toBe("manuals");
    expect(getFolderForQR("marketing-strategy-guide")).toBe("manuals");
    expect(getFolderForQR("sales-estimating-guide")).toBe("manuals");
  });

  it("enforces dedicated Team section QR targets for every active team member", () => {
    const qrCodes = buildFinalQRCodeList();
    const activeMembers = loadActiveTeamMembersForQrGuardrail();

    for (const member of activeMembers) {
      expect(qrCodes).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `team-${member.slug}`,
            url: `https://www.mhc-gc.com/team#${member.slug}`,
            folder: "team",
          }),
        ]),
      );
    }
  });
});
