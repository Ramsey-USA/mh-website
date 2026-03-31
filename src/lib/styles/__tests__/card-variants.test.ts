import { getCardClassName } from "@/lib/styles/card-variants";

describe("getCardClassName", () => {
  const baseClasses =
    "flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full transition-all";
  const hoverClasses =
    "hover:shadow-lg dark:hover:shadow-gray-600/50 hover:-translate-y-1";

  describe("default variant", () => {
    it("returns base classes", () => {
      const result = getCardClassName("default");
      expect(result).toContain(baseClasses);
    });

    it("includes hover classes", () => {
      const result = getCardClassName("default");
      expect(result).toContain(hoverClasses);
    });

    it("does not include primary border class", () => {
      const result = getCardClassName("default");
      expect(result).not.toContain("border-brand-primary");
    });
  });

  describe("no args (default variant)", () => {
    it("returns default variant classes when called with no arguments", () => {
      const withNoArgs = getCardClassName();
      const withDefault = getCardClassName("default");
      expect(withNoArgs).toBe(withDefault);
    });
  });

  describe("primary variant", () => {
    it("includes base classes", () => {
      const result = getCardClassName("primary");
      expect(result).toContain(baseClasses);
    });

    it("includes hover classes", () => {
      const result = getCardClassName("primary");
      expect(result).toContain(hoverClasses);
    });

    it("includes primary border class", () => {
      const result = getCardClassName("primary");
      expect(result).toContain("border-brand-primary");
    });
  });

  describe("secondary variant", () => {
    it("includes base classes", () => {
      const result = getCardClassName("secondary");
      expect(result).toContain(baseClasses);
    });

    it("includes hover classes", () => {
      const result = getCardClassName("secondary");
      expect(result).toContain(hoverClasses);
    });

    it("includes secondary border class", () => {
      const result = getCardClassName("secondary");
      expect(result).toContain("border-brand-secondary");
    });
  });

  describe("accent variant", () => {
    it("includes base classes", () => {
      const result = getCardClassName("accent");
      expect(result).toContain(baseClasses);
    });

    it("includes hover classes", () => {
      const result = getCardClassName("accent");
      expect(result).toContain(hoverClasses);
    });

    it("includes secondary border class (same as secondary)", () => {
      const result = getCardClassName("accent");
      expect(result).toContain("border-brand-secondary");
    });
  });

  describe("static variant", () => {
    it("includes base classes", () => {
      const result = getCardClassName("static");
      expect(result).toContain(baseClasses);
    });

    it("does NOT include hover classes", () => {
      const result = getCardClassName("static");
      expect(result).not.toContain(hoverClasses);
      expect(result).not.toContain("hover:");
    });

    it("does not include primary border class", () => {
      const result = getCardClassName("static");
      expect(result).not.toContain("border-brand-primary");
    });

    it("does not include secondary border class", () => {
      const result = getCardClassName("static");
      expect(result).not.toContain("border-brand-secondary");
    });
  });

  describe("extra classes", () => {
    it("appends extra classes to default variant", () => {
      const result = getCardClassName("default", "rounded-lg shadow-md");
      expect(result).toContain("rounded-lg shadow-md");
    });

    it("appends extra classes to primary variant", () => {
      const result = getCardClassName("primary", "p-4");
      expect(result).toContain("p-4");
    });

    it("appends extra classes to static variant", () => {
      const result = getCardClassName("static", "opacity-50");
      expect(result).toContain("opacity-50");
    });

    it("does not append extra classes when empty string", () => {
      const withEmpty = getCardClassName("default", "");
      const withoutExtra = getCardClassName("default");
      expect(withEmpty).toBe(withoutExtra);
    });

    it("extra classes appear at the end of the string", () => {
      const result = getCardClassName("default", "my-custom-class");
      expect(result.endsWith("my-custom-class")).toBe(true);
    });
  });

  describe("return type", () => {
    it("returns a string", () => {
      expect(typeof getCardClassName()).toBe("string");
    });

    it("returned string uses spaces as separators", () => {
      const result = getCardClassName("primary", "extra");
      const parts = result.split(" ");
      expect(parts.length).toBeGreaterThan(1);
    });
  });
});
