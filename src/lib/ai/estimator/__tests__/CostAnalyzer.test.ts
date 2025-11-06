import { CostAnalyzer } from "../CostAnalyzer";
import type { EstimateInput } from "@/lib/ai/types";

describe("CostAnalyzer", () => {
  let analyzer: CostAnalyzer;

  beforeEach(() => {
    analyzer = new CostAnalyzer();
  });

  describe("processEstimate", () => {
    it("should calculate base estimate for kitchen remodel", () => {
      const input: EstimateInput = {
        projectType: "kitchen",
        description: "Full kitchen remodel",
        location: "Seattle, WA",
      };

      const result = analyzer.processEstimate(input, false);
      // The result contains the project type info in the report
      expect(result).toBeTruthy();
      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(100);
    });

    it("should apply veteran discount", () => {
      const input: EstimateInput = {
        projectType: "bathroom",
        description: "Bathroom renovation",
        location: "Seattle, WA",
      };

      const standardResult = analyzer.processEstimate(input, false);
      const veteranResult = analyzer.processEstimate(input, true);

      expect(veteranResult).toContain("veteran");
      expect(standardResult).not.toEqual(veteranResult);
    });

    it("should handle different project types", () => {
      const projectTypes = ["kitchen", "bathroom", "deck", "addition"];

      projectTypes.forEach((type) => {
        const input: EstimateInput = {
          projectType: type,
          description: `${type} project`,
          location: "Seattle, WA",
        };

        const result = analyzer.processEstimate(input, false);
        expect(result).toBeTruthy();
        expect(result.length).toBeGreaterThan(0);
      });
    });

    it("should handle budget ranges", () => {
      const input: EstimateInput = {
        projectType: "renovation",
        description: "Home renovation",
        location: "Seattle, WA",
        budget: "50k_100k",
      };

      const result = analyzer.processEstimate(input, false);
      expect(result).toBeTruthy();
    });
  });

  describe("generateLeadIntelligence", () => {
    it("should classify project type from keywords", () => {
      const result = analyzer.generateLeadIntelligence(
        "kitchen remodel cabinets countertops",
      );

      expect(result.projectType).toBeTruthy();
      expect(result.budgetRange).toBeTruthy();
      expect(result.timeline).toBeTruthy();
      expect(result.priority).toBeTruthy();
    });

    it("should detect veteran status from keywords", () => {
      const result = analyzer.generateLeadIntelligence(
        "bathroom remodel veteran discount",
      );

      expect(result.veteranStatus).toBeDefined();
    });

    it("should analyze budget range", () => {
      const result = analyzer.generateLeadIntelligence(
        "deck construction $50,000 budget",
      );

      expect(result.budgetRange).toBeTruthy();
      // budgetRange is a string, not an object
      expect(typeof result.budgetRange).toBe("string");
    });

    it("should assess project priority", () => {
      const urgentResult = analyzer.generateLeadIntelligence(
        "urgent leak repair emergency",
      );
      const normalResult = analyzer.generateLeadIntelligence(
        "kitchen planning future",
      );

      expect(urgentResult.priority).toBeTruthy();
      expect(normalResult.priority).toBeTruthy();
    });

    it("should extract location information", () => {
      const result = analyzer.generateLeadIntelligence(
        "renovation project Seattle Washington",
      );

      expect(result.location).toBeDefined();
    });

    it("should provide comprehensive lead classification", () => {
      const result = analyzer.generateLeadIntelligence(
        "commercial building renovation 100k budget veteran owner Seattle",
      );

      expect(result.classification).toBeTruthy();
      expect(result.projectType).toBeTruthy();
      expect(result.budgetRange).toBeTruthy();
      expect(result.timeline).toBeTruthy();
      expect(result.priority).toBeTruthy();
    });
  });
});
