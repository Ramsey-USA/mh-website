/**
 * @jest-environment jsdom
 */

import { downloadCsv, escapeCsvCell, toCsv } from "../csv";

describe("escapeCsvCell", () => {
  it("returns empty string for null/undefined", () => {
    expect(escapeCsvCell(null)).toBe("");
    expect(escapeCsvCell(undefined)).toBe("");
  });
  it("passes simple strings/numbers through", () => {
    expect(escapeCsvCell("hello")).toBe("hello");
    expect(escapeCsvCell(42)).toBe("42");
  });
  it("quotes and escapes commas, quotes, and newlines", () => {
    expect(escapeCsvCell("a,b")).toBe('"a,b"');
    expect(escapeCsvCell('she said "hi"')).toBe('"she said ""hi"""');
    expect(escapeCsvCell("line1\nline2")).toBe('"line1\nline2"');
  });
});

describe("toCsv", () => {
  it("renders headers and rows with CRLF line endings", () => {
    const csv = toCsv(
      ["Name", "City", "Hits"],
      [
        ["Alice", "Seattle, WA", 5],
        ["Bob", 'has "quotes"', 0],
      ],
    );
    expect(csv).toBe(
      [
        "Name,City,Hits",
        'Alice,"Seattle, WA",5',
        'Bob,"has ""quotes""",0',
      ].join("\r\n"),
    );
  });
  it("renders only the header row when no data", () => {
    expect(toCsv(["A", "B"], [])).toBe("A,B");
  });
});

describe("downloadCsv (jsdom)", () => {
  it("creates an anchor element with a blob URL and clicks it", () => {
    const createObjectURL = jest.fn().mockReturnValue("blob:mock");
    const revokeObjectURL = jest.fn();
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      writable: true,
      value: createObjectURL,
    });
    Object.defineProperty(URL, "revokeObjectURL", {
      configurable: true,
      writable: true,
      value: revokeObjectURL,
    });
    const clickSpy = jest.spyOn(HTMLAnchorElement.prototype, "click");

    downloadCsv("test.csv", "a,b\n1,2");

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:mock");
    clickSpy.mockRestore();
  });
});
