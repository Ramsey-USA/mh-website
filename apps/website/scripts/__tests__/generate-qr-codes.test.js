const { normalizeManifestFormQrName } = require("../generate-qr-codes");

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
});
