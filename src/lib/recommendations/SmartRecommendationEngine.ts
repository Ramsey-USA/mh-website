/**
 * Smart Project Recommendations Engine
 * Phase 6.1: Advanced AI-powered project suggestions and intelligent recommendations
 * Phase 6.3: Enhanced with A/B testing framework and advanced analytics
 *
 * This engine provides intelligent project recommendations based on user behavior,
 * profile analysis, and veteran status for enhanced user experience and conversion.
 */

import { militaryConstructionAI, MilitaryConstructionAI } from "../ai";
import ABTestingFramework, {
  VariantConfiguration,
  ExperimentEvent,
  UserAssignment,
} from "./ABTestingFramework";

// Core interfaces for the recommendation system
export interface ProjectRecommendation {
  id: string;
  projectType: string;
  title: string;
  description: string;
  confidence: number; // 0-100 confidence score
  reasoning: string[];
  estimatedCost: {
    min: number;
    max: number;
    currency: string;
  };
  timeline: string;
  priority: "high" | "medium" | "low";
  veteranBenefits?: VeteranBenefit[];
  tags: string[];
  images?: string[];
}

export interface VeteranBenefit {
  type: "discount" | "priority" | "financing" | "specialist" | "liaison";
  title: string;
  description: string;
  value: string | number;
  icon: string;
  eligibility?: string[];
}

// Legacy interface for backward compatibility
export interface VeteranStatus {
  branch:
    | "Army"
    | "Navy"
    | "Marines"
    | "Air Force"
    | "Coast Guard"
    | "Space Force";
  serviceEra: string;
  combatVeteran: boolean;
  disabilityRating?: number;
  activeDuty: boolean;
  dischargeBBStatus: string;
}

export interface UserProfile {
  id: string;
  sessionId: string;
  isVeteran: boolean;
  veteranDetails?: VeteranProfile;
  preferences: UserPreferences;
  behaviorHistory: UserBehavior[];
  location?: string;
  previousProjects?: string[];
}

export interface VeteranProfile {
  serviceBranch: string;
  serviceEra: string;
  combatVeteran: boolean;
  disabilityRating?: number;
  specialPrograms: string[];
  preferredSpecialist?: string;
}

export interface UserPreferences {
  budgetRange: {
    min: number;
    max: number;
  };
  projectTypes: string[];
  timeframe: string;
  priorities: string[]; // e.g., ['energy_efficiency', 'accessibility', 'security']
  communicationStyle: "formal" | "casual" | "military";
}

export interface UserBehavior {
  timestamp: Date;
  action: string;
  page: string;
  data: any;
  sessionDuration?: number;
  conversionEvent?: boolean;
}

export interface RecommendationFeedback {
  recommendationId: string;
  userId: string;
  rating: number; // 1-5 stars
  clicked: boolean;
  converted: boolean;
  feedback?: string;
  timestamp: Date;
}

export interface RecommendationMetrics {
  totalRecommendations: number;
  clickThroughRate: number;
  conversionRate: number;
  averageRating: number;
  accuracyScore: number;
  veteranEngagementRate?: number;
  experimentMetrics?: {
    experimentId: string;
    variantId: string;
    isControl: boolean;
    performance: number;
  };
}

export interface RecommendationContext {
  sessionId: string;
  pageUrl?: string;
  userAgent?: string;
  experimentAssignment?: UserAssignment;
  variantConfig?: VariantConfiguration;
}

export class SmartRecommendationEngine {
  private aiEngine: MilitaryConstructionAI;
  private userProfiles: Map<string, UserProfile>;
  private recommendationHistory: Map<string, ProjectRecommendation[]>;
  private feedbackHistory: RecommendationFeedback[];
  private learningData: Map<string, any>;
  private abTestingFramework: ABTestingFramework;

  constructor(
    aiEngine?: MilitaryConstructionAI,
    enableABTesting: boolean = true,
  ) {
    this.aiEngine = aiEngine || ({} as MilitaryConstructionAI); // Will be injected later
    this.userProfiles = new Map();
    this.recommendationHistory = new Map();
    this.feedbackHistory = [];
    this.learningData = new Map();
    this.abTestingFramework = new ABTestingFramework(enableABTesting);
  }

  /**
   * Set the AI engine (used to break circular dependency)
   */
  setAIEngine(aiEngine: MilitaryConstructionAI): void {
    this.aiEngine = aiEngine;
  }

  /**
   * Generate personalized project recommendations for a user
   */
  async generateRecommendations(
    userProfile: UserProfile,
    context?: RecommendationContext,
  ): Promise<ProjectRecommendation[]> {
    try {
      // Get or assign user to experiment
      const experimentAssignment =
        this.abTestingFramework.assignUserToExperiment(
          userProfile.id,
          context?.sessionId || `session-${Date.now()}`,
          userProfile,
        );

      // Get variant configuration if in experiment
      const variantConfig = experimentAssignment
        ? this.abTestingFramework.getVariantConfiguration(userProfile.id)
        : null;

      // Update context with experiment info
      const enhancedContext: RecommendationContext = {
        sessionId: context?.sessionId || `session-${Date.now()}`,
        pageUrl: context?.pageUrl,
        userAgent: context?.userAgent,
        experimentAssignment: experimentAssignment || undefined,
        variantConfig: variantConfig || undefined,
      };

      // Analyze user profile and behavior
      const profileAnalysis = this.analyzeUserProfile(userProfile);

      // Generate base recommendations using variant configuration
      const baseRecommendations = this.generateBaseRecommendations(
        profileAnalysis,
        variantConfig,
      );

      // Apply veteran-specific enhancements
      const veteranEnhanced = userProfile.isVeteran
        ? this.enhanceForVeterans(
            baseRecommendations,
            userProfile.veteranDetails!,
            variantConfig,
          )
        : baseRecommendations;

      // Apply behavioral learning
      const behaviorEnhanced = this.applyBehavioralLearning(
        veteranEnhanced,
        userProfile,
      );

      // Score and rank recommendations using variant weights
      const scoredRecommendations = this.scoreRecommendations(
        behaviorEnhanced,
        userProfile,
        variantConfig,
      );

      // Determine recommendation count from variant or default
      const maxRecommendations = variantConfig?.recommendationCount || 6;

      // Sort by confidence and relevance
      const rankedRecommendations = scoredRecommendations
        .sort((a, b) => b.confidence - a.confidence)
        .slice(0, maxRecommendations);

      // Store for analytics
      this.storeRecommendations(
        userProfile.id,
        rankedRecommendations,
        enhancedContext,
      );

      // Track experiment event
      if (experimentAssignment) {
        this.abTestingFramework.trackEvent({
          experimentId: experimentAssignment.experimentId,
          variantId: experimentAssignment.variantId,
          userId: userProfile.id,
          eventType: "view",
          timestamp: new Date(),
          metadata: {
            pageUrl: context?.pageUrl,
            userAgent: context?.userAgent,
          },
        });
      }

      return rankedRecommendations;
    } catch (error) {
      console.error("Error generating recommendations:", error);
      return this.getFallbackRecommendations(userProfile);
    }
  }

  /**
   * Analyze user profile to understand preferences and needs
   */
  private analyzeUserProfile(userProfile: UserProfile): any {
    const analysis = {
      budgetCategory: this.categorizeBudget(
        userProfile.preferences.budgetRange,
      ),
      projectInterests: userProfile.preferences.projectTypes,
      urgencyLevel: this.analyzeUrgency(userProfile.preferences.timeframe),
      behaviorPatterns: this.analyzeBehaviorPatterns(
        userProfile.behaviorHistory,
      ),
      locationFactors: this.analyzeLocationFactors(userProfile.location),
      veteranPriorities: userProfile.isVeteran
        ? this.analyzeVeteranPriorities(userProfile.veteranDetails!)
        : null,
    };

    return analysis;
  }

  /**
   * Generate base project recommendations
   */
  private generateBaseRecommendations(
    analysis: any,
    variantConfig?: VariantConfiguration | null,
  ): ProjectRecommendation[] {
    const recommendations: ProjectRecommendation[] = [];

    // Apply algorithm type from variant configuration
    const algorithmType = variantConfig?.algorithmType || "standard";

    // Residential projects
    if (analysis.projectInterests.includes("residential")) {
      recommendations.push(
        ...this.generateResidentialRecommendations(analysis, algorithmType),
      );
    }

    // Commercial projects
    if (analysis.projectInterests.includes("commercial")) {
      recommendations.push(
        ...this.generateCommercialRecommendations(analysis, algorithmType),
      );
    }

    // Renovation projects
    if (analysis.projectInterests.includes("renovation")) {
      recommendations.push(
        ...this.generateRenovationRecommendations(analysis, algorithmType),
      );
    }

    // Addition projects
    if (analysis.projectInterests.includes("addition")) {
      recommendations.push(
        ...this.generateAdditionRecommendations(analysis, algorithmType),
      );
    }

    return recommendations;
  }

  /**
   * Generate residential project recommendations
   */
  private generateResidentialRecommendations(
    analysis: any,
    algorithmType: string = "standard",
  ): ProjectRecommendation[] {
    const recommendations: ProjectRecommendation[] = [];

    // Kitchen remodel - high ROI project
    recommendations.push({
      id: `kitchen-${Date.now()}`,
      projectType: "kitchen",
      title: "Kitchen Command Center Upgrade",
      description:
        "Transform your kitchen into a modern command center with tactical efficiency and premium finishes.",
      confidence: 85,
      reasoning: [
        "High ROI investment (75-85% return)",
        "Popular project type in Pacific Northwest",
        "Matches budget range and preferences",
        "Excellent for home value enhancement",
      ],
      estimatedCost: {
        min: 25000,
        max: 75000,
        currency: "USD",
      },
      timeline: "4-8 weeks",
      priority: "high",
      tags: ["high-roi", "popular", "value-add", "kitchen"],
      images: ["/images/projects/kitchen-modern.jpg"],
    });

    // Bathroom renovation
    recommendations.push({
      id: `bathroom-${Date.now()}`,
      projectType: "bathroom",
      title: "Bathroom Tactical Upgrade",
      description:
        "Modern bathroom renovation with accessibility features and energy-efficient fixtures.",
      confidence: 78,
      reasoning: [
        "Excellent ROI (60-70% return)",
        "Essential home improvement",
        "Accessibility considerations",
        "Energy efficiency benefits",
      ],
      estimatedCost: {
        min: 15000,
        max: 45000,
        currency: "USD",
      },
      timeline: "3-6 weeks",
      priority: "medium",
      tags: ["roi", "accessibility", "efficiency", "bathroom"],
      images: ["/images/projects/bathroom-modern.jpg"],
    });

    return recommendations;
  }

  /**
   * Generate commercial project recommendations
   */
  private generateCommercialRecommendations(
    analysis: any,
    algorithmType: string = "standard",
  ): ProjectRecommendation[] {
    const recommendations: ProjectRecommendation[] = [];

    // Office renovation
    recommendations.push({
      id: `office-${Date.now()}`,
      projectType: "commercial",
      title: "Office Command Post Design",
      description:
        "Professional office space renovation with modern efficiency and tactical organization.",
      confidence: 72,
      reasoning: [
        "Business productivity enhancement",
        "Professional image improvement",
        "Employee satisfaction impact",
        "Future-ready workspace design",
      ],
      estimatedCost: {
        min: 50000,
        max: 150000,
        currency: "USD",
      },
      timeline: "6-12 weeks",
      priority: "medium",
      tags: ["commercial", "productivity", "professional", "office"],
      images: ["/images/projects/office-modern.jpg"],
    });

    return recommendations;
  }

  /**
   * Generate renovation project recommendations
   */
  private generateRenovationRecommendations(
    analysis: any,
    algorithmType: string = "standard",
  ): ProjectRecommendation[] {
    const recommendations: ProjectRecommendation[] = [];

    // Whole home renovation
    recommendations.push({
      id: `whole-home-${Date.now()}`,
      projectType: "renovation",
      title: "Complete Home Base Renovation",
      description:
        "Comprehensive home renovation with modern systems, energy efficiency, and enhanced functionality.",
      confidence: 80,
      reasoning: [
        "Maximum home value enhancement",
        "Comprehensive solution approach",
        "Long-term investment value",
        "Modern systems upgrade",
      ],
      estimatedCost: {
        min: 100000,
        max: 300000,
        currency: "USD",
      },
      timeline: "12-24 weeks",
      priority: "high",
      tags: ["comprehensive", "value", "systems", "renovation"],
      images: ["/images/projects/whole-home.jpg"],
    });

    return recommendations;
  }

  /**
   * Generate addition project recommendations
   */
  private generateAdditionRecommendations(
    analysis: any,
    algorithmType: string = "standard",
  ): ProjectRecommendation[] {
    const recommendations: ProjectRecommendation[] = [];

    // Room addition
    recommendations.push({
      id: `addition-${Date.now()}`,
      projectType: "addition",
      title: "Strategic Space Expansion",
      description:
        "Thoughtfully designed room addition to expand living space and enhance home functionality.",
      confidence: 75,
      reasoning: [
        "Increased living space",
        "Home value enhancement",
        "Family growth accommodation",
        "Functional improvement",
      ],
      estimatedCost: {
        min: 75000,
        max: 200000,
        currency: "USD",
      },
      timeline: "8-16 weeks",
      priority: "medium",
      tags: ["expansion", "space", "value", "addition"],
      images: ["/images/projects/room-addition.jpg"],
    });

    return recommendations;
  }

  /**
   * Enhance recommendations for veteran users
   */
  private enhanceForVeterans(
    recommendations: ProjectRecommendation[],
    veteranProfile: VeteranProfile,
    variantConfig?: VariantConfiguration | null,
  ): ProjectRecommendation[] {
    return recommendations.map((rec) => {
      const veteranBenefits = this.generateVeteranBenefits(veteranProfile, rec);

      return {
        ...rec,
        confidence: rec.confidence + 5, // Boost confidence for veteran-enhanced projects
        veteranBenefits,
        reasoning: [
          ...rec.reasoning,
          "Enhanced with veteran-specific benefits and priority service",
        ],
      };
    });
  }

  /**
   * Generate veteran-specific benefits for a project
   */
  private generateVeteranBenefits(
    veteranProfile: VeteranProfile,
    recommendation: ProjectRecommendation,
  ): VeteranBenefit[] {
    const benefits: VeteranBenefit[] = [];

    // Standard veteran discount
    benefits.push({
      type: "discount",
      title: "Veteran Appreciation Discount",
      description: "Automatic discount for military service members",
      value: "10% off total project cost",
      icon: "military_tech",
    });

    // Combat veteran additional discount
    if (veteranProfile.combatVeteran) {
      benefits.push({
        type: "discount",
        title: "Combat Veteran Honor Discount",
        description: "Additional discount for combat veterans",
        value: "Additional 2% off (12% total)",
        icon: "shield",
      });
    }

    // Priority service
    benefits.push({
      type: "priority",
      title: "Veteran Priority Service",
      description: "Expedited scheduling and dedicated project management",
      value: "Priority scheduling and response",
      icon: "priority_high",
    });

    // Veteran specialist
    if (veteranProfile.serviceBranch) {
      benefits.push({
        type: "specialist",
        title: `${veteranProfile.serviceBranch} Veteran Specialist`,
        description:
          "Work with a veteran team member who understands military standards",
        value: "Dedicated veteran project specialist",
        icon: "person",
      });
    }

    // Accessibility features for disabled veterans
    if (
      veteranProfile.disabilityRating &&
      veteranProfile.disabilityRating > 0
    ) {
      benefits.push({
        type: "financing",
        title: "Accessibility Enhancement Program",
        description:
          "Special financing and grants for accessibility improvements",
        value: "VA benefit coordination and special financing",
        icon: "accessible",
      });
    }

    return benefits;
  }

  /**
   * Apply behavioral learning to enhance recommendations
   */
  private applyBehavioralLearning(
    recommendations: ProjectRecommendation[],
    userProfile: UserProfile,
  ): ProjectRecommendation[] {
    // Analyze user behavior patterns
    const behaviorScore = this.calculateBehaviorScore(
      userProfile.behaviorHistory,
    );

    return recommendations.map((rec) => {
      // Boost confidence based on similar user behaviors
      let confidenceBoost = 0;

      // If user has viewed similar projects, boost confidence
      const viewedSimilar = userProfile.behaviorHistory.filter(
        (behavior) =>
          behavior.action === "view" &&
          behavior.data?.projectType === rec.projectType,
      ).length;

      confidenceBoost += Math.min(viewedSimilar * 2, 10);

      // If user has used estimator for similar projects
      const estimatedSimilar = userProfile.behaviorHistory.filter(
        (behavior) =>
          behavior.action === "estimate" &&
          behavior.data?.projectType === rec.projectType,
      ).length;

      confidenceBoost += estimatedSimilar * 5;

      return {
        ...rec,
        confidence: Math.min(rec.confidence + confidenceBoost, 100),
      };
    });
  }

  /**
   * Score and rank recommendations based on multiple factors
   */
  private scoreRecommendations(
    recommendations: ProjectRecommendation[],
    userProfile: UserProfile,
    variantConfig?: VariantConfiguration | null,
  ): ProjectRecommendation[] {
    // Get scoring weights from variant config or use defaults
    const weights = variantConfig?.scoringWeights || {
      budgetMatch: 30,
      behaviorHistory: 25,
      veteranStatus: 20,
      projectSimilarity: 15,
      timelineMatch: 10,
    };

    return recommendations.map((rec) => {
      let score = rec.confidence;

      // Budget alignment score
      const budgetScore = this.calculateBudgetScore(
        rec.estimatedCost,
        userProfile.preferences.budgetRange,
      );
      score = (score + budgetScore) / 2;

      // Timeline preference score
      const timelineScore = this.calculateTimelineScore(
        rec.timeline,
        userProfile.preferences.timeframe,
      );
      score = (score + timelineScore) / 2;

      // Priority project boost
      if (rec.priority === "high") score += 5;
      if (rec.priority === "medium") score += 2;

      // Veteran boost
      if (userProfile.isVeteran && rec.veteranBenefits) score += 3;

      return {
        ...rec,
        confidence: Math.round(score),
      };
    });
  }

  /**
   * Store recommendations for analytics and tracking
   */
  private storeRecommendations(
    userId: string,
    recommendations: ProjectRecommendation[],
    context?: RecommendationContext,
  ): void {
    this.recommendationHistory.set(userId, recommendations);

    // Track in analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "recommendations_generated", {
        user_id: userId,
        recommendations_count: recommendations.length,
        top_recommendation: recommendations[0]?.projectType,
        experiment_id: context?.experimentAssignment?.experimentId,
        variant_id: context?.experimentAssignment?.variantId,
      });
    }
  }

  /**
   * Record user feedback on recommendations
   */
  recordFeedback(feedback: RecommendationFeedback): void {
    this.feedbackHistory.push(feedback);

    // Update learning data
    this.updateLearningData(feedback);

    // Track experiment event if user is in experiment
    const userAssignment = this.abTestingFramework.assignUserToExperiment(
      feedback.userId,
      `session-${Date.now()}`,
    );
    if (userAssignment) {
      this.abTestingFramework.trackEvent({
        experimentId: userAssignment.experimentId,
        variantId: userAssignment.variantId,
        userId: feedback.userId,
        eventType: "feedback",
        timestamp: feedback.timestamp,
        metadata: {
          recommendationId: feedback.recommendationId,
          rating: feedback.rating,
        },
      });
    }

    // Track in analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "recommendation_feedback", {
        recommendation_id: feedback.recommendationId,
        rating: feedback.rating,
        clicked: feedback.clicked,
        converted: feedback.converted,
        experiment_id: userAssignment?.experimentId,
        variant_id: userAssignment?.variantId,
      });
    }
  }

  /**
   * Get recommendation performance metrics
   */
  getMetrics(): RecommendationMetrics {
    const totalRecs = this.feedbackHistory.length;
    const clicks = this.feedbackHistory.filter((f) => f.clicked).length;
    const conversions = this.feedbackHistory.filter((f) => f.converted).length;
    const ratings = this.feedbackHistory.filter((f) => f.rating > 0);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum, f) => sum + f.rating, 0) / ratings.length
        : 0;

    return {
      totalRecommendations: totalRecs,
      clickThroughRate: totalRecs > 0 ? (clicks / totalRecs) * 100 : 0,
      conversionRate: totalRecs > 0 ? (conversions / totalRecs) * 100 : 0,
      averageRating: avgRating,
      accuracyScore: this.calculateAccuracyScore(),
    };
  }

  /**
   * A/B Testing Framework Access Methods
   */

  /**
   * Create a new A/B test experiment
   */
  createExperiment(experiment: any): any {
    return this.abTestingFramework.createExperiment(experiment);
  }

  /**
   * Get user's experiment assignment
   */
  getUserExperimentAssignment(userId: string): UserAssignment | null {
    return this.abTestingFramework.assignUserToExperiment(
      userId,
      `session-${Date.now()}`,
    );
  }

  /**
   * Track experiment event
   */
  trackExperimentEvent(event: Omit<ExperimentEvent, "id">): void {
    this.abTestingFramework.trackEvent(event);
  }

  /**
   * Get experiment results
   */
  getExperimentResults(experimentId: string): any {
    return this.abTestingFramework.getExperimentResults(experimentId);
  }

  /**
   * Get active experiments
   */
  getActiveExperiments(): any[] {
    return this.abTestingFramework.getActiveExperiments();
  }

  /**
   * Conclude experiment and get results
   */
  concludeExperiment(experimentId: string, winningVariantId?: string): any {
    return this.abTestingFramework.concludeExperiment(
      experimentId,
      winningVariantId,
    );
  }

  /**
   * Track user behavior for learning
   */
  trackUserBehavior(userId: string, behavior: UserBehavior): void {
    const profile = this.userProfiles.get(userId);
    if (profile) {
      profile.behaviorHistory.push(behavior);
      this.userProfiles.set(userId, profile);
    }
  }

  /**
   * Helper methods for analysis and calculations
   */
  private categorizeBudget(budgetRange: { min: number; max: number }): string {
    const avgBudget = (budgetRange.min + budgetRange.max) / 2;

    if (avgBudget < 25000) return "budget";
    if (avgBudget < 75000) return "moderate";
    if (avgBudget < 150000) return "premium";
    return "luxury";
  }

  private analyzeUrgency(timeframe: string): "immediate" | "soon" | "planned" {
    if (timeframe.includes("immediately") || timeframe.includes("asap"))
      return "immediate";
    if (timeframe.includes("month") || timeframe.includes("soon"))
      return "soon";
    return "planned";
  }

  private analyzeBehaviorPatterns(behaviors: UserBehavior[]): any {
    return {
      totalActions: behaviors.length,
      estimatorUsage: behaviors.filter((b) => b.action === "estimate").length,
      pageViews: behaviors.filter((b) => b.action === "view").length,
      contactAttempts: behaviors.filter((b) => b.action === "contact").length,
    };
  }

  private analyzeLocationFactors(location?: string): any {
    if (!location) return null;

    // Pacific Northwest specific factors
    return {
      region: "pacific_northwest",
      weatherConsiderations: true,
      seismicRequirements: true,
      energyEfficiencyPriority: true,
    };
  }

  private analyzeVeteranPriorities(veteranProfile: VeteranProfile): any {
    return {
      accessibilityNeeds:
        veteranProfile.disabilityRating && veteranProfile.disabilityRating > 0,
      securityFocus: veteranProfile.combatVeteran,
      energyEfficiency: true,
      qualityStandards: "military_grade",
    };
  }

  private calculateBehaviorScore(behaviors: UserBehavior[]): number {
    // Simple scoring based on behavior engagement
    let score = 0;
    behaviors.forEach((behavior) => {
      switch (behavior.action) {
        case "view":
          score += 1;
          break;
        case "estimate":
          score += 3;
          break;
        case "contact":
          score += 5;
          break;
        case "convert":
          score += 10;
          break;
      }
    });
    return Math.min(score, 50); // Cap at 50 points
  }

  private calculateBudgetScore(
    projectCost: { min: number; max: number },
    userBudget: { min: number; max: number },
  ): number {
    // Calculate overlap between project cost and user budget
    const projectAvg = (projectCost.min + projectCost.max) / 2;
    const userAvg = (userBudget.min + userBudget.max) / 2;

    if (projectAvg >= userBudget.min && projectAvg <= userBudget.max) {
      return 100; // Perfect match
    }

    // Calculate distance from ideal range
    const distance = Math.abs(projectAvg - userAvg) / userAvg;
    return Math.max(0, 100 - distance * 50);
  }

  private calculateTimelineScore(
    projectTimeline: string,
    userTimeframe: string,
  ): number {
    // Simplified timeline scoring
    // Would need more sophisticated parsing in production
    if (userTimeframe.includes("immediate") && projectTimeline.includes("week"))
      return 90;
    if (userTimeframe.includes("month") && projectTimeline.includes("week"))
      return 100;
    return 75; // Default moderate score
  }

  private updateLearningData(feedback: RecommendationFeedback): void {
    // Store feedback for machine learning improvements
    const key = `recommendation_${feedback.recommendationId}`;
    this.learningData.set(key, feedback);
  }

  private calculateAccuracyScore(): number {
    // Calculate recommendation accuracy based on feedback
    const validFeedback = this.feedbackHistory.filter((f) => f.rating > 0);
    if (validFeedback.length === 0) return 0;

    const averageRating =
      validFeedback.reduce((sum, f) => sum + f.rating, 0) /
      validFeedback.length;
    return (averageRating / 5) * 100; // Convert to percentage
  }

  private getFallbackRecommendations(
    userProfile: UserProfile,
  ): ProjectRecommendation[] {
    // Provide basic fallback recommendations if main engine fails
    return [
      {
        id: "fallback-kitchen",
        projectType: "kitchen",
        title: "Kitchen Upgrade",
        description:
          "Transform your kitchen with modern appliances and finishes.",
        confidence: 70,
        reasoning: [
          "Popular project type",
          "Good ROI",
          "Essential home improvement",
        ],
        estimatedCost: { min: 25000, max: 60000, currency: "USD" },
        timeline: "4-8 weeks",
        priority: "medium",
        tags: ["fallback", "kitchen", "popular"],
        veteranBenefits: userProfile.isVeteran
          ? [
              {
                type: "discount",
                title: "Veteran Discount",
                description: "10% off for veterans",
                value: "10% discount",
                icon: "military_tech",
              },
            ]
          : undefined,
      },
    ];
  }
}

export default SmartRecommendationEngine;
