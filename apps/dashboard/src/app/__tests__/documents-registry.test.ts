import { getDocumentById } from "@/lib/data/documents";

describe("dashboard document registry", () => {
  it("uses the published employee handbook TOC asset from the canonical content source", () => {
    const handbook = getDocumentById("employee-handbook");

    expect(handbook?.revisionNumber).toBe("4.0");
    expect(handbook?.pdfPath).toBe("/docs/employee/employee-handbook-toc.pdf");
    expect(handbook?.r2Key).toBe("docs/employee/employee-handbook-toc.pdf");
  });
});
