/**
 * Tests for projects page static data exports.
 * Importing the module drives full statement coverage.
 */

import {
  categories,
  projectStats,
  capabilities,
  whyChooseReasons,
  partnershipProcess,
} from "../components/projectsData";

describe("projectsData", () => {
  describe("categories", () => {
    it("contains an 'all' category as first item", () => {
      expect(categories[0]?.id).toBe("all");
    });

    it("all categories have id, label, and icon", () => {
      for (const cat of categories) {
        expect(cat).toHaveProperty("id");
        expect(cat).toHaveProperty("label");
        expect(cat).toHaveProperty("icon");
      }
    });
  });

  describe("projectStats", () => {
    it("has at least 3 stats", () => {
      expect(projectStats.length).toBeGreaterThanOrEqual(3);
    });

    it("all stats have icon, value, and label", () => {
      for (const stat of projectStats) {
        expect(stat).toHaveProperty("icon");
        expect(stat).toHaveProperty("value");
        expect(stat).toHaveProperty("label");
      }
    });

    it("includes both animated and non-animated stats", () => {
      const animated = projectStats.filter((s) => s.animated === true);
      const notAnimated = projectStats.filter((s) => s.animated === false);
      expect(animated.length).toBeGreaterThan(0);
      expect(notAnimated.length).toBeGreaterThan(0);
    });
  });

  describe("capabilities", () => {
    it("has at least 3 capability items", () => {
      expect(capabilities.length).toBeGreaterThanOrEqual(3);
    });

    it("all capabilities have icon, title, and description", () => {
      for (const cap of capabilities) {
        expect(cap).toHaveProperty("icon");
        expect(cap).toHaveProperty("title");
        expect(cap).toHaveProperty("description");
      }
    });
  });

  describe("whyChooseReasons", () => {
    it("has at least one reason", () => {
      expect(whyChooseReasons.length).toBeGreaterThan(0);
    });

    it("reasons have expected shape", () => {
      for (const reason of whyChooseReasons) {
        expect(reason).toHaveProperty("title");
        // icon may be stored as "icon" or "iconName"
        const hasIcon = "icon" in reason || "iconName" in reason;
        expect(hasIcon).toBe(true);
      }
    });
  });

  describe("partnershipProcess", () => {
    it("has at least one step", () => {
      expect(partnershipProcess.length).toBeGreaterThan(0);
    });

    it("steps have expected shape", () => {
      for (const step of partnershipProcess) {
        expect(step).toHaveProperty("title");
      }
    });
  });
});
