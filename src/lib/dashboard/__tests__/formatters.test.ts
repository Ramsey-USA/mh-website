import {
  formatDuration,
  formatNumber,
  formatPercent,
  formatTimestamp,
} from "../formatters";

describe("formatDuration", () => {
  it("formats whole minutes and seconds", () => {
    expect(formatDuration(125)).toBe("2m 5s");
  });
  it("rounds fractional seconds", () => {
    expect(formatDuration(60.6)).toBe("1m 1s");
  });
  it("returns 0m 0s for zero, negative, or non-finite input", () => {
    expect(formatDuration(0)).toBe("0m 0s");
    expect(formatDuration(-30)).toBe("0m 0s");
    expect(formatDuration(Number.NaN)).toBe("0m 0s");
    expect(formatDuration(Number.POSITIVE_INFINITY)).toBe("0m 0s");
  });
});

describe("formatNumber", () => {
  it("formats with thousands separators", () => {
    expect(formatNumber(1234567)).toBe((1234567).toLocaleString());
  });
  it("returns 0 for null, undefined, or non-finite values", () => {
    expect(formatNumber(null)).toBe("0");
    expect(formatNumber(undefined)).toBe("0");
    expect(formatNumber(Number.NaN)).toBe("0");
  });
});

describe("formatPercent", () => {
  it("returns 0% when denominator is 0", () => {
    expect(formatPercent(5, 0)).toBe("0%");
  });
  it("returns rounded percentage", () => {
    expect(formatPercent(1, 4)).toBe("25%");
    expect(formatPercent(1, 3, 1)).toBe("33.3%");
  });
});

describe("formatTimestamp", () => {
  it("returns em dash for missing input", () => {
    expect(formatTimestamp(undefined)).toBe("—");
    expect(formatTimestamp("")).toBe("—");
  });
  it("returns the original string when not parseable", () => {
    expect(formatTimestamp("not a date")).toBe("not a date");
  });
  it("renders a localized formatted date for valid ISO input", () => {
    const out = formatTimestamp("2026-05-03T15:30:00Z");
    expect(out).not.toBe("—");
    expect(out).not.toBe("2026-05-03T15:30:00Z");
  });
});
