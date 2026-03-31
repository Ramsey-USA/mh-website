/**
 * Tests for lib/styles/layout-variants.ts
 *
 * Covers gridPresets.cards3, cards4, twoColumn, compactCards
 * (and the underlying getGridClassName via those presets)
 */

import { gridPresets } from "../layout-variants";

describe("gridPresets.cards3()", () => {
  it("returns a 3-column grid class string with responsive columns", () => {
    const cls = gridPresets.cards3();
    expect(cls).toContain("grid");
    expect(cls).toContain("grid-cols-1");
    expect(cls).toContain("sm:grid-cols-2");
    expect(cls).toContain("lg:grid-cols-3");
  });

  it("applies the default md gap", () => {
    const cls = gridPresets.cards3();
    expect(cls).toContain("gap-6"); // md → gap-6
  });

  it("accepts a custom gap size", () => {
    const cls = gridPresets.cards3("lg");
    expect(cls).toContain("gap-8"); // lg → gap-8
  });

  it("appends extra classes when provided", () => {
    const cls = gridPresets.cards3("md", "mt-8 px-4");
    expect(cls).toContain("mt-8 px-4");
  });

  it("enables responsive gap override (useResponsiveGap=true)", () => {
    const cls = gridPresets.cards3("md");
    // cards3 uses useResponsiveGap=true → should include lg:gap-8
    expect(cls).toContain("lg:gap-8");
  });
});

describe("gridPresets.cards4()", () => {
  it("returns a 4-column grid with xl breakpoint", () => {
    const cls = gridPresets.cards4();
    expect(cls).toContain("xl:grid-cols-4");
    expect(cls).toContain("lg:grid-cols-3");
    expect(cls).toContain("sm:grid-cols-2");
  });

  it("does NOT include responsive gap override", () => {
    const cls = gridPresets.cards4("md");
    // cards4 uses useResponsiveGap=false
    expect(cls).not.toContain("lg:gap-");
  });

  it("accepts extra classes", () => {
    const cls = gridPresets.cards4("sm", "overflow-hidden");
    expect(cls).toContain("overflow-hidden");
  });
});

describe("gridPresets.twoColumn()", () => {
  it("returns a 2-column grid with lg breakpoint only", () => {
    const cls = gridPresets.twoColumn();
    expect(cls).toContain("grid-cols-1");
    expect(cls).toContain("lg:grid-cols-2");
    expect(cls).not.toContain("sm:grid-cols");
  });

  it("uses lg gap by default", () => {
    const cls = gridPresets.twoColumn();
    expect(cls).toContain("gap-8"); // lg → gap-8
  });

  it("accepts custom gap and extra classes", () => {
    const cls = gridPresets.twoColumn("xl", "items-start");
    expect(cls).toContain("gap-12"); // xl → gap-12
    expect(cls).toContain("items-start");
  });
});

describe("gridPresets.compactCards()", () => {
  it("returns a 4-column grid skipping sm, starts at md:2", () => {
    const cls = gridPresets.compactCards();
    expect(cls).toContain("md:grid-cols-2");
    expect(cls).toContain("lg:grid-cols-4");
    expect(cls).not.toContain("sm:grid-cols");
  });

  it("uses lg gap by default", () => {
    const cls = gridPresets.compactCards();
    expect(cls).toContain("gap-8");
  });

  it("accepts extra classes", () => {
    const cls = gridPresets.compactCards("md", "rounded");
    expect(cls).toContain("rounded");
  });
});
