/**
 * forms-branding.test.js
 *
 * Regression tests for forms branding guardrail.
 * Ensures all forms use canonical border alignment and footer styling.
 */

import { describe, it, expect } from "@jest/globals";
import { applyFormBrandingChrome } from "../forms-branding-guardrail.mjs";

describe("Forms Branding Guardrail", () => {
  const mockFormEntry = {
    id: "MISH 01",
    title: "Injury Free Workplace Plan Acknowledgment",
    revision: "1",
    effectiveDate: "04/07/2026",
  };

  const mockBrandConfig = {
    colors: {
      primary: "#386851",
      primaryDark: "#2d5142",
      secondary: "#BD9264",
      secondaryText: "#6b6b67",
    },
    company: {
      companyName: "MH Construction, Inc.",
      addressStreet: "1234 West Street",
      addressCityStateZip: "Seattle, WA 98101",
      phone: "(206) 555-0123",
      website: "www.mhc-gc.com",
      licenses: "Licensed • Bonded • Insured",
    },
    logos: {
      agcLogo: "data:image/png;base64,iVBORw0KGgoAAAANS...",
      bbbLogo: "data:image/png;base64,iVBORw0KGgoAAAANS...",
      vobLogo: "data:image/png;base64,iVBORw0KGgoAAAANS...",
    },
  };

  it("should wrap form body with canonical outer border inset 0.22in", () => {
    const bodyHtml = `<p>Form content here</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("inset: 0.22in");
    expect(result).toContain("border: 1.2pt solid");
  });

  it("should wrap form body with canonical inner border inset 0.33in", () => {
    const bodyHtml = `<p>Form content here</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("inset: 0.33in");
    expect(result).toContain("border: 0.6pt solid");
  });

  it("should include left ribbon at correct position (0.45in left, 0.28in wide)", () => {
    const bodyHtml = `<p>Form content here</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("left: 0.45in");
    expect(result).toContain("width: 0.28in");
    expect(result).toContain("linear-gradient");
  });

  it("should include footer at canonical position (0.62in bottom)", () => {
    const bodyHtml = `<p>Form content here</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("bottom: 0.62in");
    expect(result).toContain("page-footer");
  });

  it("should include company contact information in footer", () => {
    const bodyHtml = `<p>Form content here</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("Company Contact");
    expect(result).toContain(mockBrandConfig.company.companyName);
    expect(result).toContain(mockBrandConfig.company.addressStreet);
    expect(result).toContain(mockBrandConfig.company.phone);
  });

  it("should include accreditation and trust logos in footer", () => {
    const bodyHtml = `<p>Form content here</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("Accreditation and Trust");
    expect(result).toContain("AGC membership");
    expect(result).toContain("BBB accredited");
    expect(result).toContain("Veteran owned");
  });

  it("should use correct footer grid layout (1.45fr 1fr)", () => {
    const bodyHtml = `<p>Form content here</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("grid-template-columns: 1.45fr 1fr");
  });

  it("should apply brand colors correctly", () => {
    const bodyHtml = `<p>Form content here</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("#386851"); // primary
    expect(result).toContain("#BD9264"); // secondary
  });

  it("should warn if body contains hard-coded borders", () => {
    const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
    const bodyHtml = `<div style="border: 2pt solid red;">Content</div>`;

    applyFormBrandingChrome(bodyHtml, mockFormEntry, mockBrandConfig);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Body contains hard-coded borders"),
    );

    consoleSpy.mockRestore();
  });

  it("should create valid HTML structure with page frame", () => {
    const bodyHtml = `<p>Form content</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("<!doctype html>");
    expect(result).toContain("<html");
    expect(result).toContain("</html>");
    expect(result).toContain(".page-frame");
    expect(result).toContain(".left-ribbon");
    expect(result).toContain(".page-content");
  });

  it("should set correct page size and margins", () => {
    const bodyHtml = `<p>Form content</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      mockBrandConfig,
    );

    expect(result).toContain("size: letter portrait");
    expect(result).toContain("margin: 0");
    expect(result).toContain("width: 8.5in");
  });

  it("should escape HTML in company name to prevent injection", () => {
    const maliciousBrandConfig = {
      ...mockBrandConfig,
      company: {
        ...mockBrandConfig.company,
        companyName: 'MH Construction</div><script>alert("xss")</script>',
      },
    };

    const bodyHtml = `<p>Form content</p>`;
    const result = applyFormBrandingChrome(
      bodyHtml,
      mockFormEntry,
      maliciousBrandConfig,
    );

    expect(result).toContain("&lt;/div&gt;");
    expect(result).toContain("&lt;script&gt;");
    expect(result).not.toContain("<script>");
  });
});
