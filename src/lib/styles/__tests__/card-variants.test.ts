/**
 * Tests for lib/styles/card-variants.ts
 * Covers: getCardClassName with all variant types and extra classes
 */

import { getCardClassName } from "../card-variants";

describe("getCardClassName()", () => {
  it("includes base card classes by default", () => {
    const cls = getCardClassName();
    expect(cls).toContain("flex");
    expect(cls).toContain("bg-white");
    expect(cls).toContain("border");
  });

  it("applies hover effects for the default (non-static) variant", () => {
    const cls = getCardClassName("default");
    expect(cls).toContain("hover:shadow-lg");
    expect(cls).toContain("hover:-translate-y-1");
  });

  it("omits hover effects for the static variant", () => {
    const cls = getCardClassName("static");
    expect(cls).not.toContain("hover:shadow-lg");
    expect(cls).not.toContain("hover:-translate-y-1");
  });

  it("adds primary border class for the primary variant", () => {
    const cls = getCardClassName("primary");
    expect(cls).toContain("border-brand-primary");
  });

  it("adds secondary border class for the secondary variant", () => {
    const cls = getCardClassName("secondary");
    expect(cls).toContain("border-brand-secondary");
  });

  it("adds secondary border class for the accent variant", () => {
    const cls = getCardClassName("accent");
    expect(cls).toContain("border-brand-secondary");
  });

  it("appends extra classes when provided", () => {
    const cls = getCardClassName("default", "mt-4 rounded-lg");
    expect(cls).toContain("mt-4 rounded-lg");
  });

  it("does not duplicate base class when extraClasses is empty", () => {
    const cls = getCardClassName("default", "");
    const parts = cls.split(" ");
    const baseParts = parts.filter((p) => p === "flex");
    expect(baseParts).toHaveLength(1);
  });
});
