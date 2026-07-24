/**
 * @jest-environment node
 */

const {
  escapeMarkdownTableCell,
  markdownTable,
} = require("../export-cast-recover-print-sheets");

describe("export-cast-recover-print-sheets markdown sanitization", () => {
  it("escapes HTML and markdown control characters in table cells", () => {
    const cell = escapeMarkdownTableCell(
      "<script>alert(1)</script> [click](javascript:alert(1)) | line\nnext",
    );

    expect(cell).toContain("&lt;script&gt;alert\\(1\\)&lt;/script&gt;");
    expect(cell).toContain("\\[click\\]\\(javascript:alert\\(1\\)\\)");
    expect(cell).toContain("\\|");
    expect(cell).not.toContain("<script>");
    expect(cell).not.toContain("[click](javascript:alert(1))");
    expect(cell).not.toContain("\n");
  });

  it("renders sanitized values into markdown tables", () => {
    const table = markdownTable(
      [
        {
          full_name: "<img src=x onerror=alert(1)>",
          email: "[mail](javascript:alert(1))",
        },
      ],
      ["full_name", "email"],
      ["#", "Name", "Email"],
    );

    expect(table).toContain("&lt;img src=x onerror=alert\\(1\\)&gt;");
    expect(table).toContain("\\[mail\\]\\(javascript:alert\\(1\\)\\)");
    expect(table).not.toContain("<img src=x onerror=alert(1)>");
  });
});
