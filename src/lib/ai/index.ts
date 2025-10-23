/**
 * MH Construction AI System
 * Main entry point for the modularized AI system
 */

// Core AI Engine
export { CoreAIEngine } from "./core/AIEngine";

// Estimator and Cost Analysis
export { CostAnalyzer } from "./estimator/CostAnalyzer";

// Veteran-Specific AI
export { VeteranAI } from "./veteran/VeteranAI";

// Type definitions
export type {
  ConstructionIntel,
  AIResponse,
  EnhancedFormResult,
  EstimateInput,
  LeadIntelligence,
  AIConfig,
  FormType,
  ProjectCategory,
  PriorityLevel,
  BudgetRange,
  TimelineCategory,
} from "./types";

// Main AI Class - Orchestrates all modules
import { CoreAIEngine } from "./core/AIEngine";
import { CostAnalyzer } from "./estimator/CostAnalyzer";
import { VeteranAI } from "./veteran/VeteranAI";
import type { EstimateInput, EnhancedFormResult, FormType } from "./types";
import {
  VeteranPersonalizationSystem,
  type VeteranProfile,
} from "@/lib/veteran";
import SmartRecommendationEngine from "@/lib/recommendations/SmartRecommendationEngine";
import {
  cacheAIResponse,
  getCachedAIResponse,
  generateCacheKey,
} from "@/lib/cache/AIResponseCache";

export class MilitaryConstructionAI {
  private coreEngine: CoreAIEngine;
  private costAnalyzer: CostAnalyzer;
  private veteranAI: VeteranAI;
  private recommendationEngine: SmartRecommendationEngine;
  private veteranSystem: VeteranPersonalizationSystem;

  constructor() {
    this.coreEngine = new CoreAIEngine();
    this.costAnalyzer = new CostAnalyzer();
    this.veteranAI = new VeteranAI();
    this.recommendationEngine = new SmartRecommendationEngine();
    this.veteranSystem = VeteranPersonalizationSystem.getInstance();
  }

  /**
   * Main response generation method
   */
  generateResponse(userInput: string, context?: any): string {
    // Check cache first
    const cacheKey = generateCacheKey(userInput, context);
    const cachedResponse = getCachedAIResponse(cacheKey);

    if (cachedResponse) {
      return cachedResponse;
    }

    let response: string;

    // Check if this is a veteran-specific query
    if (this.isVeteranQuery(userInput, context)) {
      const veteranProfile = context?.veteranProfile;
      response = this.veteranAI.generateVeteranResponse(
        userInput,
        veteranProfile,
        context
      );
    }
    // Check if this is an estimate request
    else if (this.isEstimateQuery(userInput)) {
      const estimateInput = this.parseEstimateInput(userInput, context);
      const isVeteran =
        context?.veteranProfile || this.detectVeteranStatus(userInput);
      response = this.costAnalyzer.processEstimate(estimateInput, isVeteran);
    }
    // Use core engine for general queries
    else {
      response = this.coreEngine.generateResponse(userInput, context);
    }

    // Cache the response
    cacheAIResponse(cacheKey, response);

    return response;
  }

  /**
   * Enhanced estimate processing with veteran support
   */
  async processEnhancedEstimate(
    projectType: string,
    formData: any,
    sessionId?: string
  ): Promise<{
    estimate: string;
    leadIntelligence: any;
    recommendations: any[];
    veteranBenefits?: any;
  }> {
    try {
      // Create estimate input
      const estimateInput: EstimateInput = {
        projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        location: formData.location,
        description: formData.message || formData.description,
      };

      // Check for veteran status
      const isVeteran = sessionId
        ? await this.checkVeteranStatus(sessionId)
        : this.detectVeteranStatus(JSON.stringify(formData));

      // Process estimate
      const estimate = this.costAnalyzer.processEstimate(
        estimateInput,
        isVeteran
      );

      // Generate lead intelligence
      const leadIntelligence = this.costAnalyzer.generateLeadIntelligence(
        `${projectType} ${formData.message || ""} ${formData.budget || ""}`,
        formData
      );

      // Get recommendations - simplified for now
      const recommendations: any[] = [];

      // Get veteran benefits if applicable
      let veteranBenefits = undefined;
      if (isVeteran && sessionId) {
        veteranBenefits = await this.veteranSystem.processVeteranFormSubmission(
          sessionId,
          "estimate",
          formData
        );
      }

      return {
        estimate,
        leadIntelligence,
        recommendations,
        veteranBenefits,
      };
    } catch (error) {
      console.error("Enhanced estimate processing error:", error);

      // Fallback to basic estimate
      const estimateInput: EstimateInput = {
        projectType,
        description: "Basic estimate request",
      };

      return {
        estimate: this.costAnalyzer.processEstimate(estimateInput),
        leadIntelligence: { projectType, priority: "standard" },
        recommendations: [],
      };
    }
  }

  /**
   * Enhanced form processing with veteran personalization
   */
  async processEnhancedForm(
    formType: FormType,
    formData: any,
    sessionId?: string
  ): Promise<EnhancedFormResult> {
    try {
      // Process with veteran system if session exists
      if (sessionId) {
        const result = this.veteranSystem.processVeteranFormSubmission(
          sessionId,
          formType,
          formData
        );

        return {
          response: result.response,
          veteranHandling: result.priorityHandling,
          discounts: result.veteranBenefits,
          nextSteps: result.nextSteps,
        };
      }

      // Fallback to standard processing
      return {
        response: this.generateResponse(
          `${formData.name || ""} ${formData.message || ""} ${formData.projectType || ""}`,
          formData
        ),
        nextSteps: [
          "Our team will review your request and contact you within 24 hours",
          "Free consultation will be scheduled",
          "Detailed proposal will be provided",
        ],
      };
    } catch (error) {
      console.error("Enhanced form processing error:", error);

      // Fallback to standard processing
      return {
        response: this.generateResponse(
          `${formData.name || ""} ${formData.message || ""} ${formData.projectType || ""}`,
          formData
        ),
        nextSteps: [
          "Our team will review your request and contact you within 48 hours",
          "Free consultation will be scheduled",
          "Detailed proposal will be provided",
        ],
      };
    }
  }

  // Helper methods
  private isVeteranQuery(input: string, context?: any): boolean {
    const veteranKeywords = [
      "veteran",
      "military",
      "va",
      "disability",
      "ptsd",
      "accessibility",
    ];
    return (
      veteranKeywords.some((keyword) =>
        input.toLowerCase().includes(keyword)
      ) || Boolean(context?.veteranProfile)
    );
  }

  private isEstimateQuery(input: string): boolean {
    const estimateKeywords = ["estimate", "cost", "price", "budget", "quote"];
    return estimateKeywords.some((keyword) =>
      input.toLowerCase().includes(keyword)
    );
  }

  private parseEstimateInput(input: string, context?: any): EstimateInput {
    // Extract project type from input
    const projectTypes = [
      "kitchen",
      "bathroom",
      "deck",
      "addition",
      "renovation",
      "commercial",
    ];
    const detectedType =
      projectTypes.find((type) => input.toLowerCase().includes(type)) ||
      "general";

    return {
      projectType: detectedType,
      budget: context?.budget,
      timeline: context?.timeline,
      location: context?.location,
      description: input,
    };
  }

  private detectVeteranStatus(input: string): boolean {
    const veteranIndicators = [
      "veteran",
      "military",
      "army",
      "navy",
      "marines",
      "air force",
    ];
    return veteranIndicators.some((indicator) =>
      input.toLowerCase().includes(indicator)
    );
  }

  private async checkVeteranStatus(sessionId: string): Promise<boolean> {
    try {
      // Simplified check for now - would need to implement session data retrieval
      return false;
    } catch {
      return false;
    }
  }

  // Missing methods that are called by existing components
  getLeadQualificationGuidance(userMessage: string, pageContext?: any): string {
    return this.coreEngine.generateResponse(
      `Provide lead qualification guidance for: ${userMessage}`,
      pageContext || { type: "lead_qualification" }
    );
  }

  analyzeVeteranStatus(userMessage: string): {
    isVeteran: boolean;
    processingProtocol?: string;
    specialAssignment?: string;
    supportServices?: string[];
    expeditedTimeline?: boolean;
  } {
    const isVeteran = this.detectVeteranStatus(userMessage);
    return {
      isVeteran,
      processingProtocol: isVeteran ? "veteran_priority" : "standard",
      specialAssignment: isVeteran ? "veteran_support" : undefined,
      supportServices: isVeteran
        ? ["VA Benefits", "Military Discount", "Priority Scheduling"]
        : [],
      expeditedTimeline: isVeteran,
    };
  }

  processVeteranPriority(
    veteranAnalysis: any,
    context: any
  ): {
    processingProtocol: string;
    specialAssignment: string;
    supportServices: string[];
    expeditedTimeline: boolean;
  } {
    const message = context.message || "";

    // Check for priority indicators
    const isUrgent =
      message.toLowerCase().includes("urgent") ||
      message.toLowerCase().includes("asap") ||
      message.toLowerCase().includes("emergency");

    return {
      processingProtocol: isUrgent ? "veteran_urgent" : "veteran_priority",
      specialAssignment: "veteran_support",
      supportServices: [
        "VA Benefits",
        "Military Discount",
        "Priority Scheduling",
      ],
      expeditedTimeline: true,
    };
  }

  getContactFormAssistance(userMessage: string, pageContext?: any): string {
    return this.coreEngine.generateResponse(
      `Provide contact form assistance for: ${userMessage}`,
      pageContext || { type: "form_assistance" }
    );
  }

  getBookingFormAssistance(userMessage: string, pageContext?: any): string {
    return this.coreEngine.generateResponse(
      `Provide booking form assistance for: ${userMessage}`,
      pageContext || { type: "booking_assistance" }
    );
  }

  generateSmartFormSuggestions(
    formData: any,
    field?: string,
    value?: any
  ): {
    suggestions: string[];
    autoComplete: string;
    validation: {
      isValid: boolean;
      feedback: string;
    };
    militaryContext: {
      isVeteran: boolean;
      suggestions: string[];
      discounts: string[];
    };
  } {
    const isVeteran = this.detectVeteranStatus(
      JSON.stringify(formData) + (value || "")
    );

    let suggestions: string[] = [];
    let autoComplete = "";

    if (field === "projectType") {
      suggestions = ["Residential", "Commercial", "Renovation", "Addition"];
      autoComplete = "Residential";
    } else if (field === "budget") {
      suggestions = ["Under $50k", "$50k-$100k", "$100k-$200k", "Over $200k"];
      autoComplete = "$50k-$100k";
    } else {
      suggestions = [
        "Complete all required fields",
        "Add additional details if helpful",
      ];
      autoComplete = "";
    }

    return {
      suggestions,
      autoComplete,
      validation: {
        isValid: true,
        feedback: isVeteran
          ? "Veteran benefits available for this project"
          : "Standard processing",
      },
      militaryContext: {
        isVeteran,
        suggestions: isVeteran
          ? ["Veteran discount available", "Priority scheduling offered"]
          : [],
        discounts: isVeteran
          ? ["10% Military Discount", "VA Loan Assistance"]
          : [],
      },
    };
  }

  generatePredictiveCompletion(formData: any): {
    suggestions: { field: string; value: string; confidence: number }[];
    autoFillRecommendations: string[];
    nextStepGuidance: string;
  } {
    const projectType = formData.projectType || "residential";
    const budget = formData.budget || "moderate";

    return {
      suggestions: [
        { field: "timeline", value: "3-6 months", confidence: 0.8 },
        { field: "priority", value: "energy efficiency", confidence: 0.7 },
        { field: "materials", value: "standard grade", confidence: 0.9 },
      ],
      autoFillRecommendations: [
        "Energy efficiency upgrades",
        "Timeline flexibility options",
        "Material preference selection",
      ],
      nextStepGuidance: `Based on your ${projectType} project with ${budget} budget, consider scheduling a consultation to discuss energy efficiency upgrades and timeline options.`,
    };
  }
}

// Export singleton instance
export const militaryConstructionAI = new MilitaryConstructionAI();
