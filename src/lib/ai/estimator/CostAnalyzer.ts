/**
 * Cost Analyzer - Estimate processing and budget intelligence
 */

import type {
  EstimateInput,
  LeadIntelligence,
  BudgetRange,
  TimelineCategory,
} from "@/lib/ai/types";

export class CostAnalyzer {
  private pacificNorthwestMultiplier = 1.15; // 15% higher costs due to location
  private veteranDiscount = 0.12; // 12% veteran discount

  processEstimate(input: EstimateInput, isVeteran = false): string {
    const baseEstimate = this.calculateBaseEstimate(input);
    const adjustedEstimate = this.applyLocationAdjustments(baseEstimate);
    const finalEstimate = isVeteran
      ? this.applyVeteranDiscount(adjustedEstimate)
      : adjustedEstimate;

    return this.generateEstimateReport(input, finalEstimate, isVeteran);
  }

  generateLeadIntelligence(keywords: string, context?: any): LeadIntelligence {
    const projectType = this.classifyProjectType(keywords);
    const budgetRange = this.analyzeBudgetRange(keywords, context);
    const timeline = this.analyzeTimeline(keywords);
    const priority = this.assessPriority(keywords, context);

    return {
      projectType,
      budgetRange,
      timeline,
      priority,
      classification: this.generateAdvancedLeadClassification(
        keywords,
        context,
        projectType,
        budgetRange,
      ),
      location: this.extractLocation(keywords, context),
      veteranStatus: this.detectVeteranStatus(keywords, context),
    };
  }

  private calculateBaseEstimate(input: EstimateInput): number {
    const projectTypeMultipliers: Record<string, number> = {
      kitchen: 25000,
      bathroom: 15000,
      deck: 8000,
      addition: 50000,
      renovation: 30000,
      commercial: 100000,
      residential: 40000,
    };

    const baseAmount =
      projectTypeMultipliers[input.projectType.toLowerCase()] || 25000;

    // Apply budget range adjustments if provided
    if (input.budget) {
      const budgetMultiplier = this.getBudgetMultiplier(input.budget);
      return baseAmount * budgetMultiplier;
    }

    return baseAmount;
  }

  private getBudgetMultiplier(budgetRange: string): number {
    const multipliers: Record<string, number> = {
      under_10k: 0.3,
      "10k_25k": 0.6,
      "25k_50k": 1.0,
      "50k_100k": 1.8,
      "100k_plus": 3.0,
    };

    // Try to match budget ranges from user input
    if (budgetRange.includes("10") && budgetRange.includes("k")) return 0.6;
    if (budgetRange.includes("25") && budgetRange.includes("k")) return 0.8;
    if (budgetRange.includes("50") && budgetRange.includes("k")) return 1.0;
    if (budgetRange.includes("100") && budgetRange.includes("k")) return 1.8;

    return 1.0; // Default multiplier
  }

  private applyLocationAdjustments(baseEstimate: number): number {
    return baseEstimate * this.pacificNorthwestMultiplier;
  }

  private applyVeteranDiscount(estimate: number): number {
    return estimate * (1 - this.veteranDiscount);
  }

  private generateEstimateReport(
    input: EstimateInput,
    finalEstimate: number,
    isVeteran: boolean,
  ): string {
    const formattedEstimate = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(finalEstimate);

    const estimateRange = {
      low: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(finalEstimate * 0.85),
      high: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(finalEstimate * 1.15),
    };

    return `**TACTICAL COST INTELLIGENCE** [CALCULATE]

[MILITARY_TECH] **PROJECT: ${input.projectType.toUpperCase()} OPERATION**

**PRELIMINARY BUDGET ANALYSIS:**
• **Estimated Range:** ${estimateRange.low} - ${estimateRange.high}
• **Target Budget:** ${formattedEstimate}
${isVeteran ? `• **Veteran Discount Applied:** 12% service appreciation` : ""}

**COST BREAKDOWN INTELLIGENCE:**
• **Pacific Northwest Market Adjustment:** 15% regional premium
• **Material Costs:** Premium-grade tactical specifications
• **Labor Deployment:** Skilled veteran-led construction crews
• **Quality Assurance:** Military-standard inspection protocols

${
  isVeteran
    ? `
[SHIELD] **VETERAN TACTICAL ADVANTAGE**
• **Service Discount:** ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(finalEstimate * this.veteranDiscount)} savings applied
• **Priority Processing:** Fast-track project scheduling
• **VA Benefit Coordination:** Expert assistance available
`
    : `
[INFO] **VETERAN STATUS INQUIRY**
Are you a veteran or active service member? Qualify for 12% service discount!
`
}

**NEXT TACTICAL OPERATIONS:**
1. **Free Consultation** - Detailed mission briefing and site assessment
2. **Precise Quote** - Comprehensive cost breakdown and timeline
3. **Mission Planning** - Project scheduling and resource allocation

**INTELLIGENCE DISCLAIMER:** Preliminary estimate based on standard operational parameters. Final costs determined after tactical site assessment.

**READY TO DEPLOY?** Request your free consultation for mission-specific cost analysis.`;
  }

  private classifyProjectType(keywords: string): string {
    const projectTypes = [
      {
        type: "Kitchen Remodel",
        keywords: ["kitchen", "cook", "cabinet", "countertop"],
      },
      {
        type: "Bathroom Renovation",
        keywords: ["bathroom", "bath", "shower", "toilet"],
      },
      {
        type: "Deck Construction",
        keywords: ["deck", "patio", "outdoor", "porch"],
      },
      {
        type: "Home Addition",
        keywords: ["addition", "expand", "room", "extension"],
      },
      {
        type: "Full Renovation",
        keywords: ["renovation", "remodel", "update", "modernize"],
      },
      {
        type: "Commercial Construction",
        keywords: ["commercial", "business", "office", "retail"],
      },
      {
        type: "Residential Construction",
        keywords: ["residential", "house", "home", "custom"],
      },
    ];

    for (const project of projectTypes) {
      if (
        project.keywords.some((keyword) =>
          keywords.toLowerCase().includes(keyword),
        )
      ) {
        return project.type;
      }
    }

    return "General Construction";
  }

  private analyzeBudgetRange(keywords: string, context?: any): string {
    const budgetIndicators = [
      {
        range: "Under $10K",
        keywords: ["small", "minor", "under 10", "less than 10"],
      },
      {
        range: "$10K - $25K",
        keywords: ["10k", "15k", "20k", "25k", "moderate"],
      },
      {
        range: "$25K - $50K",
        keywords: ["25k", "30k", "40k", "50k", "substantial"],
      },
      { range: "$50K - $100K", keywords: ["50k", "75k", "100k", "major"] },
      { range: "$100K+", keywords: ["100k", "large", "extensive", "luxury"] },
    ];

    for (const budget of budgetIndicators) {
      if (
        budget.keywords.some((keyword) =>
          keywords.toLowerCase().includes(keyword),
        )
      ) {
        return budget.range;
      }
    }

    return "Budget Assessment Required";
  }

  private analyzeTimeline(keywords: string): string {
    const timelineIndicators = [
      {
        timeline: "Immediate",
        keywords: ["emergency", "urgent", "asap", "immediately"],
      },
      { timeline: "1-3 Months", keywords: ["soon", "quick", "fast", "month"] },
      { timeline: "3-6 Months", keywords: ["standard", "normal", "planning"] },
      {
        timeline: "6+ Months",
        keywords: ["future", "long", "extended", "complex"],
      },
    ];

    for (const timeline of timelineIndicators) {
      if (
        timeline.keywords.some((keyword) =>
          keywords.toLowerCase().includes(keyword),
        )
      ) {
        return timeline.timeline;
      }
    }

    return "Timeline Planning Required";
  }

  private assessPriority(keywords: string, context?: any): string {
    if (keywords.includes("emergency") || keywords.includes("urgent")) {
      return "high";
    }
    if (keywords.includes("veteran") || keywords.includes("military")) {
      return "medium";
    }
    return "standard";
  }

  private extractLocation(keywords: string, context?: any): string | undefined {
    const locations = ["seattle", "tacoma", "bellevue", "spokane", "olympia"];
    for (const location of locations) {
      if (keywords.toLowerCase().includes(location)) {
        return location.charAt(0).toUpperCase() + location.slice(1);
      }
    }
    return context?.location;
  }

  private detectVeteranStatus(keywords: string, context?: any): boolean {
    const veteranKeywords = [
      "veteran",
      "military",
      "army",
      "navy",
      "marines",
      "air force",
      "service",
    ];
    return veteranKeywords.some((keyword) =>
      keywords.toLowerCase().includes(keyword),
    );
  }

  private generateAdvancedLeadClassification(
    keywords: string,
    context?: any,
    projectType?: string,
    budgetRange?: string,
  ): string {
    const urgencyIndicators = ["emergency", "urgent", "asap"];
    const highValueIndicators = ["100k", "luxury", "custom", "extensive"];
    const veteranIndicators = ["veteran", "military", "service"];

    let classification = "Standard Lead";

    if (urgencyIndicators.some((indicator) => keywords.includes(indicator))) {
      classification = "Priority Lead - Urgent Timeline";
    } else if (
      highValueIndicators.some((indicator) => keywords.includes(indicator))
    ) {
      classification = "Premium Lead - High Value Project";
    } else if (
      veteranIndicators.some((indicator) => keywords.includes(indicator))
    ) {
      classification = "Veteran Lead - Service Member Priority";
    }

    return classification;
  }
}
