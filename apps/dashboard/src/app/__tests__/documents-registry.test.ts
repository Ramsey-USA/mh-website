import { getDocumentById } from "@/lib/data/documents";

describe("dashboard document registry", () => {
  it("uses the published employee handbook TOC asset from the canonical content source", () => {
    const handbook = getDocumentById("employee-handbook");

    expect(handbook?.revisionNumber).toBe("4.0");
    expect(handbook?.pdfPath).toBe("/docs/employee/employee-handbook-toc.pdf");
    expect(handbook?.r2Key).toBe("docs/employee/employee-handbook-toc.pdf");
  });

  it("includes operations and strategy guide manual families", () => {
    const operations = getDocumentById("operations-manual");
    const marketing = getDocumentById("marketing-strategy-guide");
    const sales = getDocumentById("sales-estimating-guide");

    expect(operations?.pdfPath).toBe(
      "/docs/operations/operations-manual-toc.pdf",
    );
    expect(operations?.r2Key).toBe("docs/operations/operations-manual-toc.pdf");

    expect(marketing?.pdfPath).toBe(
      "/docs/marketing/marketing-strategy-guide-toc.pdf",
    );
    expect(marketing?.r2Key).toBe(
      "docs/marketing/marketing-strategy-guide-toc.pdf",
    );

    expect(sales?.pdfPath).toBe("/docs/sales/sales-estimating-guide-toc.pdf");
    expect(sales?.r2Key).toBe("docs/sales/sales-estimating-guide-toc.pdf");
  });
});
