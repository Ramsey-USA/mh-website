/**
 * MH Construction AI System
 * Clean implementation (fixed corrupted previous version).
 */
import { logger } from "@/lib/utils/logger";
export { CoreAIEngine } from "./core/ai-engine";
export { VeteranAI } from "./veteran/veteran-ai";
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

import { CoreAIEngine } from "./core/ai-engine";
import { VeteranAI } from "./veteran/veteran-ai";
import type { EstimateInput, EnhancedFormResult, FormType } from "./types";
import type { VeteranProfile } from "@/lib/veteran/types/veteran-types";
import {
  cacheAIResponse,
  getCachedAIResponse,
  generateCacheKey,
} from "@/lib/cache/ai-response-cache";

interface VeteranSubmissionResult {
  response: string;
  priorityHandling: string;
  veteranBenefits: string[];
  nextSteps: string[];
}

class VeteranPersonalizationSystemCompat {
  static getInstance(): VeteranPersonalizationSystemCompat {
    return new VeteranPersonalizationSystemCompat();
  }

  processVeteranFormSubmission(
    _sessionId: string,
    formType: FormType | "estimate",
    formData: Record<string, unknown>,
  ): VeteranSubmissionResult {
    const projectLabel =
      typeof formData["projectType"] === "string"
        ? formData["projectType"]
        : "your project";

    return {
      response:
        formType === "estimate"
          ? `Veteran-priority estimate request received for ${projectLabel}. Our team will follow up directly to coordinate next steps and any eligible veteran support.`
          : `Veteran-priority ${formType} request received for ${projectLabel}. Our team will follow up directly with tailored support.`,
      priorityHandling: "veteran-priority",
      veteranBenefits: [
        "Priority scheduling review",
        "Veteran-aware consultation follow-up",
      ],
      nextSteps: [
        "Our team will review your request and contact you within 24 hours",
        "We will confirm any veteran-priority accommodations during follow-up",
        "A personalized consultation will be scheduled if needed",
      ],
    };
  }
}

export class MilitaryConstructionAI {
  private coreEngine = new CoreAIEngine();
  private veteranAI = new VeteranAI();
  private veteranSystem = VeteranPersonalizationSystemCompat.getInstance();

  /**
   * Generate AI response with caching + veteran detection
   */
  generateResponse(
    userInput: string,
    context?: Record<string, unknown>,
  ): string {
    const cacheKey = generateCacheKey(userInput, context || {});
    const cached = getCachedAIResponse(cacheKey);
    if (cached) return cached;

    let response: string;
    if (this.isVeteranQuery(userInput, context)) {
      const veteranProfile = context?.["veteranProfile"] as
        | VeteranProfile
        | undefined;
      response = this.veteranAI.generateVeteranResponse(
        userInput,
        veteranProfile,
        context,
      );
    } else if (this.isEstimateQuery(userInput)) {
      // Estimate queries now redirect to contact page
      response =
        "For detailed project estimates and consultations, please contact our team at (509) 308-6489 or visit our contact page. We provide personalized assessments based on your specific project needs.";
    } else {
      response = this.coreEngine.generateResponse(userInput, context);
    }

    cacheAIResponse(cacheKey, response);
    return response;
  }

  async processEnhancedEstimate(
    projectType: string,
    formData: Record<string, unknown>,
    sessionId?: string,
  ): Promise<{
    estimate: string;
    leadIntelligence: unknown;
    recommendations: unknown[];
    veteranBenefits?: unknown;
  }> {
    try {
      const estimateInput: EstimateInput = { projectType };
      const budget = formData["budget"] as string | undefined;
      const timeline = formData["timeline"] as string | undefined;
      const location = formData["location"] as string | undefined;
      const description =
        (formData["message"] as string) || (formData["description"] as string);
      if (budget) estimateInput.budget = budget;
      if (timeline) estimateInput.timeline = timeline;
      if (location) estimateInput.location = location;
      if (description) estimateInput.description = description;

      const isVeteran = sessionId
        ? await this.checkVeteranStatus(sessionId)
        : this.detectVeteranStatus(JSON.stringify(formData));

      // Direct users to contact for estimates
      const estimate = `Thank you for your interest in ${projectType}. For accurate project estimates, our team provides personalized consultations. Please contact us at (509) 308-6489 or visit our contact page.`;

      const leadIntelligence = {
        projectType,
        priority: "high",
        estimateRequested: true,
      };

      const recommendations: unknown[] = [];
      let veteranBenefits: unknown | undefined;
      if (isVeteran && sessionId) {
        veteranBenefits = await this.veteranSystem.processVeteranFormSubmission(
          sessionId,
          "estimate",
          formData,
        );
      }

      return { estimate, leadIntelligence, recommendations, veteranBenefits };
    } catch (_error) {
      logger.error("Enhanced estimate processing _error:", _error);
      const fallbackEstimate =
        "For project estimates, please contact our team at (509) 308-6489.";
      return {
        estimate: fallbackEstimate,
        leadIntelligence: { projectType, priority: "standard" },
        recommendations: [],
      };
    }
  }

  async processEnhancedForm(
    formType: FormType,
    formData: Record<string, unknown>,
    sessionId?: string,
  ): Promise<EnhancedFormResult> {
    try {
      if (sessionId) {
        const result = await this.veteranSystem.processVeteranFormSubmission(
          sessionId,
          formType,
          formData,
        );
        return {
          response: result.response,
          veteranHandling: result.priorityHandling,
          discounts: result.veteranBenefits,
          nextSteps: result.nextSteps,
        };
      }
      const response = this.generateResponse(
        `${(formData["name"] as string) || ""} ${(formData["message"] as string) || ""} ${(formData["projectType"] as string) || ""}`,
        formData,
      );
      return {
        response,
        nextSteps: [
          "Our team will review your request and contact you within 24 hours",
          "Free consultation will be scheduled",
          "Detailed proposal will be provided",
        ],
      };
    } catch (_error) {
      logger.error("Enhanced form processing _error:", _error);
      const response = this.generateResponse(
        `${(formData["name"] as string) || ""} ${(formData["message"] as string) || ""} ${(formData["projectType"] as string) || ""}`,
        formData,
      );
      return {
        response,
        nextSteps: [
          "Our team will review your request and contact you within 48 hours",
          "Free consultation will be scheduled",
          "Detailed proposal will be provided",
        ],
      };
    }
  }

  private isVeteranQuery(
    input: string,
    context?: Record<string, unknown>,
  ): boolean {
    const veteranKeywords = [
      "veteran",
      "military",
      "va",
      "disability",
      "ptsd",
      "accessibility",
    ];
    return (
      veteranKeywords.some((k) => input.toLowerCase().includes(k)) ||
      Boolean(context?.["veteranProfile"])
    );
  }

  private isEstimateQuery(input: string): boolean {
    const estimateKeywords = ["estimate", "cost", "price", "budget", "quote"];
    return estimateKeywords.some((k) => input.toLowerCase().includes(k));
  }

  private detectVeteranStatus(input: string): boolean {
    const indicators = [
      "veteran",
      "military",
      "army",
      "navy",
      "marines",
      "air force",
    ];
    return indicators.some((i) => input.toLowerCase().includes(i));
  }

  private checkVeteranStatus(_sessionId: string): boolean {
    return false; // placeholder
  }

  analyzeVeteranStatus(userMessage: string): {
    isVeteran: boolean;
    processingProtocol?: string;
    specialAssignment?: string;
    supportServices?: string[];
    expeditedTimeline?: boolean;
  } {
    const isVeteran = this.detectVeteranStatus(userMessage);
    const base = {
      isVeteran,
      processingProtocol: isVeteran ? "veteran_priority" : "standard",
      supportServices: isVeteran
        ? ["VA Benefits", "Military Discount", "Priority Scheduling"]
        : [],
      expeditedTimeline: isVeteran,
    } as {
      isVeteran: boolean;
      processingProtocol?: string;
      specialAssignment?: string;
      supportServices?: string[];
      expeditedTimeline?: boolean;
    };
    if (isVeteran) base.specialAssignment = "veteran_support";
    return base;
  }

  processVeteranPriority(
    _analysis: unknown,
    context: Record<string, unknown>,
  ): {
    processingProtocol: string;
    specialAssignment: string;
    supportServices: string[];
    expeditedTimeline: boolean;
  } {
    const message = (context["message"] as string) || "";
    const urgent = ["urgent", "asap", "emergency"].some((w) =>
      message.toLowerCase().includes(w),
    );
    return {
      processingProtocol: urgent ? "veteran_urgent" : "veteran_priority",
      specialAssignment: "veteran_support",
      supportServices: [
        "VA Benefits",
        "Military Discount",
        "Priority Scheduling",
      ],
      expeditedTimeline: true,
    };
  }

  generateSmartFormSuggestions(
    formData: Record<string, unknown>,
    field?: string,
    value?: unknown,
  ): {
    suggestions: string[];
    autoComplete: string;
    validation: { isValid: boolean; feedback: string };
    militaryContext: {
      isVeteran: boolean;
      suggestions: string[];
      discounts: string[];
    };
  } {
    const isVeteran = this.detectVeteranStatus(
      JSON.stringify(formData) + (value || ""),
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
      suggestions = ["Complete required fields", "Add helpful details"];
      autoComplete = "";
    }
    return {
      suggestions,
      autoComplete,
      validation: {
        isValid: true,
        feedback: isVeteran
          ? "Veteran benefits available"
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

  generatePredictiveCompletion(formData: Record<string, unknown>): {
    suggestions: { field: string; value: string; confidence: number }[];
    autoFillRecommendations: string[];
    nextStepGuidance: string;
  } {
    const projectType = (formData["projectType"] as string) || "residential";
    const budget = (formData["budget"] as string) || "moderate";
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

export const militaryConstructionAI = new MilitaryConstructionAI();
