import { gridPresets } from "@/lib/styles/layout-variants";
import type {
  GridConfig,
  GridColumns,
  GridGap,
} from "@/lib/styles/layout-variants";

describe("gridPresets", () => {
  describe("cards3", () => {
    it("returns a string starting with 'grid'", () => {
      expect(gridPresets.cards3()).toMatch(/^grid\b/);
    });

    it("includes base grid-cols-1", () => {
      expect(gridPresets.cards3()).toContain("grid-cols-1");
    });

    it("includes sm:grid-cols-2 breakpoint", () => {
      expect(gridPresets.cards3()).toContain("sm:grid-cols-2");
    });

    it("includes lg:grid-cols-3 breakpoint", () => {
      expect(gridPresets.cards3()).toContain("lg:grid-cols-3");
    });

    it("defaults to md gap (gap-6)", () => {
      expect(gridPresets.cards3()).toContain("gap-6");
    });

    it("uses responsive gap (lg:gap-8 for md gap)", () => {
      expect(gridPresets.cards3()).toContain("lg:gap-8");
    });

    it("accepts a custom gap", () => {
      expect(gridPresets.cards3("sm")).toContain("gap-4");
      expect(gridPresets.cards3("lg")).toContain("gap-8");
      expect(gridPresets.cards3("xl")).toContain("gap-12");
    });

    it("appends extra classes", () => {
      const result = gridPresets.cards3("md", "mt-8");
      expect(result).toContain("mt-8");
    });
  });

  describe("cards4", () => {
    it("returns a string starting with 'grid'", () => {
      expect(gridPresets.cards4()).toMatch(/^grid\b/);
    });

    it("includes grid-cols-1 base", () => {
      expect(gridPresets.cards4()).toContain("grid-cols-1");
    });

    it("includes sm:grid-cols-2 breakpoint", () => {
      expect(gridPresets.cards4()).toContain("sm:grid-cols-2");
    });

    it("includes lg:grid-cols-3 breakpoint", () => {
      expect(gridPresets.cards4()).toContain("lg:grid-cols-3");
    });

    it("includes xl:grid-cols-4 breakpoint", () => {
      expect(gridPresets.cards4()).toContain("xl:grid-cols-4");
    });

    it("defaults to md gap (gap-6)", () => {
      expect(gridPresets.cards4()).toContain("gap-6");
    });

    it("does NOT add responsive lg:gap-* (useResponsiveGap is false)", () => {
      // cards4 uses useResponsiveGap=false
      const result = gridPresets.cards4("md");
      expect(result).not.toContain("lg:gap-");
    });

    it("appends extra classes", () => {
      const result = gridPresets.cards4("md", "pb-4");
      expect(result).toContain("pb-4");
    });
  });

  describe("twoColumn", () => {
    it("returns a string starting with 'grid'", () => {
      expect(gridPresets.twoColumn()).toMatch(/^grid\b/);
    });

    it("includes grid-cols-1 base", () => {
      expect(gridPresets.twoColumn()).toContain("grid-cols-1");
    });

    it("includes lg:grid-cols-2 breakpoint", () => {
      expect(gridPresets.twoColumn()).toContain("lg:grid-cols-2");
    });

    it("does not include sm breakpoint", () => {
      expect(gridPresets.twoColumn()).not.toContain("sm:grid-cols-");
    });

    it("defaults to lg gap (gap-8)", () => {
      expect(gridPresets.twoColumn()).toContain("gap-8");
    });

    it("accepts custom gap", () => {
      expect(gridPresets.twoColumn("sm")).toContain("gap-4");
    });

    it("appends extra classes", () => {
      const result = gridPresets.twoColumn("lg", "items-center");
      expect(result).toContain("items-center");
    });
  });

  describe("compactCards", () => {
    it("returns a string starting with 'grid'", () => {
      expect(gridPresets.compactCards()).toMatch(/^grid\b/);
    });

    it("includes grid-cols-1 base", () => {
      expect(gridPresets.compactCards()).toContain("grid-cols-1");
    });

    it("includes md:grid-cols-2 breakpoint", () => {
      expect(gridPresets.compactCards()).toContain("md:grid-cols-2");
    });

    it("includes lg:grid-cols-4 breakpoint", () => {
      expect(gridPresets.compactCards()).toContain("lg:grid-cols-4");
    });

    it("defaults to lg gap (gap-8)", () => {
      expect(gridPresets.compactCards()).toContain("gap-8");
    });

    it("appends extra classes", () => {
      const result = gridPresets.compactCards("md", "border");
      expect(result).toContain("border");
    });
  });

  describe("responsive gap behavior", () => {
    it("cards3 adds lg:gap-8 for md gap (useResponsiveGap=true)", () => {
      expect(gridPresets.cards3("md")).toContain("lg:gap-8");
    });

    it("cards3 adds sm:gap-4 for sm gap (useResponsiveGap=true)", () => {
      expect(gridPresets.cards3("sm")).toContain("sm:gap-4");
    });

    it("cards3 adds lg:gap-10 for lg gap (useResponsiveGap=true)", () => {
      expect(gridPresets.cards3("lg")).toContain("lg:gap-10");
    });

    it("cards3 adds lg:gap-12 for xl gap (useResponsiveGap=true)", () => {
      expect(gridPresets.cards3("xl")).toContain("lg:gap-12");
    });
  });
});

describe("GridConfig type export", () => {
  it("GridConfig type can describe a valid config object", () => {
    const config: GridConfig = { base: 1, sm: 2, lg: 3 };
    expect(config.base).toBe(1);
    expect(config.sm).toBe(2);
    expect(config.lg).toBe(3);
  });

  it("GridConfig allows partial specification", () => {
    const config: GridConfig = { lg: 2 };
    expect(config.lg).toBe(2);
    expect(config.base).toBeUndefined();
  });
});

describe("GridColumns type", () => {
  it("accepts valid column values 1-6", () => {
    const values: GridColumns[] = [1, 2, 3, 4, 5, 6];
    values.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(1);
      expect(v).toBeLessThanOrEqual(6);
    });
  });
});

describe("GridGap type", () => {
  it("accepts valid gap values", () => {
    const gaps: GridGap[] = ["sm", "md", "lg", "xl"];
    expect(gaps).toHaveLength(4);
  });
});

describe("gridPresets exports", () => {
  it("exports cards3 as a function", () => {
    expect(typeof gridPresets.cards3).toBe("function");
  });

  it("exports cards4 as a function", () => {
    expect(typeof gridPresets.cards4).toBe("function");
  });

  it("exports twoColumn as a function", () => {
    expect(typeof gridPresets.twoColumn).toBe("function");
  });

  it("exports compactCards as a function", () => {
    expect(typeof gridPresets.compactCards).toBe("function");
  });
});
