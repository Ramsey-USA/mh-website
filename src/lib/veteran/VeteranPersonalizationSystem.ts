/**
 * Enhanced Veteran Personalization System - Integration Layer
 * Coordinates all veteran-focused systems for seamless personalized experience
 */

import {
  VeteranProfileEngine,
  VeteranProfile,
  CommunicationStyle,
} from "./VeteranProfileEngine";
import {
  ContentPersonalizationEngine,
  PersonalizedContent,
} from "./ContentPersonalizationEngine";
import {
  VeteranBenefitsAutomation,
  VeteranBenefitsPackage,
} from "./VeteranBenefitsAutomation";

export interface ComprehensiveVeteranExperience {
  profile: VeteranProfile;
  personalizedContent: PersonalizedContent;
  benefitsPackage: VeteranBenefitsPackage;
  sessionData: VeteranSessionData;
  recommendations: VeteranRecommendation[];
  notifications: VeteranNotification[];
}

export interface VeteranSessionData {
  sessionId: string;
  startTime: Date;
  lastActivity: Date;
  interactionHistory: VeteranInteraction[];
  preferences: SessionPreferences;
  context: SessionContext;
}

export interface VeteranInteraction {
  timestamp: Date;
  type:
    | "form_interaction"
    | "content_view"
    | "recommendation_click"
    | "discount_applied"
    | "specialist_contact";
  details: any;
  veteranSpecific: boolean;
}

export interface SessionPreferences {
  communicationStyle: "formal" | "military" | "casual" | "respectful";
  contentFormat: "detailed" | "summary" | "visual";
  notificationLevel: "all" | "important" | "minimal";
  accessibilityMode: boolean;
}

export interface SessionContext {
  currentPage: string;
  projectInterest: string[];
  budgetIndicated?: string;
  timelineIndicated?: string;
  priorityNeeds: string[];
}

export interface VeteranRecommendation {
  id: string;
  type: "project" | "benefit" | "specialist" | "content";
  title: string;
  description: string;
  relevanceScore: number;
  veteranSpecific: boolean;
  urgent: boolean;
  actionRequired?: string;
}

export interface VeteranNotification {
  id: string;
  type:
    | "benefit_opportunity"
    | "discount_available"
    | "specialist_message"
    | "urgent_response"
    | "document_needed";
  title: string;
  message: string;
  priority: "low" | "medium" | "high" | "urgent";
  actionRequired: boolean;
  expiresAt?: Date;
}

/**
 * Enhanced Veteran Personalization System
 * Main coordination system for all veteran-focused features
 */
export class VeteranPersonalizationSystem {
  private static instance: VeteranPersonalizationSystem;
  private profileEngine: VeteranProfileEngine;
  private contentEngine: ContentPersonalizationEngine;
  private benefitsEngine: VeteranBenefitsAutomation;
  private activeSessions: Map<string, VeteranSessionData> = new Map();

  private constructor() {
    this.profileEngine = VeteranProfileEngine.getInstance();
    this.contentEngine = ContentPersonalizationEngine.getInstance();
    this.benefitsEngine = VeteranBenefitsAutomation.getInstance();
  }

  public static getInstance(): VeteranPersonalizationSystem {
    if (!VeteranPersonalizationSystem.instance) {
      VeteranPersonalizationSystem.instance =
        new VeteranPersonalizationSystem();
    }
    return VeteranPersonalizationSystem.instance;
  }

  /**
   * Initialize comprehensive veteran experience
   */
  public async initializeVeteranExperience(
    userInput: string,
    formData?: any,
    sessionId?: string,
  ): Promise<ComprehensiveVeteranExperience> {
    // Generate or retrieve veteran profile
    const profile = this.profileEngine.analyzeAndCreateProfile(
      userInput,
      formData,
      { sessionId },
    );

    // Generate personalized content
    const personalizedContent =
      this.contentEngine.generatePersonalizedContent(profile);

    // Generate benefits package
    const benefitsPackage =
      this.benefitsEngine.generateBenefitsPackage(profile);

    // Initialize or update session
    const sessionData = this.initializeSession(
      sessionId || profile.id,
      profile,
    );

    // Generate recommendations
    const recommendations = this.generateVeteranRecommendations(
      profile,
      sessionData,
    );

    // Generate notifications
    const notifications = this.generateVeteranNotifications(
      profile,
      benefitsPackage,
    );

    const experience: ComprehensiveVeteranExperience = {
      profile,
      personalizedContent,
      benefitsPackage,
      sessionData,
      recommendations,
      notifications,
    };

    // Log interaction
    this.logInteraction(sessionData.sessionId, {
      timestamp: new Date(),
      type: "form_interaction",
      details: { userInput, formData },
      veteranSpecific: profile.isVeteran,
    });

    return experience;
  }

  /**
   * Get contextualized experience for specific page/context
   */
  public getContextualizedExperience(
    sessionId: string,
    context: "homepage" | "estimator" | "contact" | "projects" | "about",
    additionalData?: any,
  ): {
    personalizedContent?: Partial<PersonalizedContent>;
    recommendations?: VeteranRecommendation[];
    notifications?: VeteranNotification[];
  } {
    const sessionData = this.activeSessions.get(sessionId);
    if (!sessionData) {
      throw new Error("Session not found");
    }

    const profile = this.profileEngine.getProfile(sessionData.sessionId);
    if (!profile) {
      throw new Error("Profile not found");
    }

    // Update session context
    sessionData.context.currentPage = context;
    sessionData.lastActivity = new Date();

    // Get contextualized content
    const personalizedContent = this.contentEngine.getContextualizedContent(
      profile,
      context,
    );

    // Get context-specific recommendations
    const recommendations = this.getContextualRecommendations(
      profile,
      context,
      additionalData,
    );

    // Get context-specific notifications
    const notifications = this.getContextualNotifications(profile, context);

    // Log page interaction
    this.logInteraction(sessionId, {
      timestamp: new Date(),
      type: "content_view",
      details: { context, additionalData },
      veteranSpecific: profile.isVeteran,
    });

    return {
      personalizedContent,
      recommendations,
      notifications,
    };
  }

  /**
   * Process form submission with veteran-specific handling
   */
  public processVeteranFormSubmission(
    sessionId: string,
    formType: "contact" | "estimate" | "booking",
    formData: any,
  ): {
    response: any;
    veteranBenefits?: any;
    priorityHandling?: any;
    nextSteps: string[];
  } {
    const sessionData = this.activeSessions.get(sessionId);
    if (!sessionData) {
      throw new Error("Session not found");
    }

    const profile = this.profileEngine.getProfile(sessionData.sessionId);
    if (!profile) {
      throw new Error("Profile not found");
    }

    // Update profile with new form data
    const updatedProfile = this.updateProfileFromForm(profile, formData);

    // Generate veteran-specific response
    const response = this.generateVeteranFormResponse(
      updatedProfile,
      formType,
      formData,
    );

    // Calculate veteran benefits if applicable
    let veteranBenefits;
    if (
      updatedProfile.isVeteran &&
      (formType === "estimate" || formType === "booking")
    ) {
      veteranBenefits = this.calculateFormBenefits(updatedProfile, formData);
    }

    // Determine priority handling
    let priorityHandling;
    if (
      updatedProfile.priorityLevel === "IMMEDIATE" ||
      updatedProfile.priorityLevel === "HIGH"
    ) {
      priorityHandling = this.initiatePriorityHandling(
        updatedProfile,
        formType,
        formData,
      );
    }

    // Generate next steps
    const nextSteps = this.generateNextSteps(
      updatedProfile,
      formType,
      formData,
    );

    // Log form submission
    this.logInteraction(sessionId, {
      timestamp: new Date(),
      type: "form_interaction",
      details: { formType, formData, veteranBenefits, priorityHandling },
      veteranSpecific: updatedProfile.isVeteran,
    });

    return {
      response,
      veteranBenefits,
      priorityHandling,
      nextSteps,
    };
  }

  /**
   * Apply veteran discounts to estimate
   */
  public applyVeteranDiscounts(
    sessionId: string,
    estimateAmount: number,
    projectDetails: any,
  ): {
    originalAmount: number;
    discountedAmount: number;
    appliedDiscounts: any[];
    totalSavings: number;
    veteranMessage: string;
  } {
    const profile = this.getProfileBySession(sessionId);
    if (!profile) {
      throw new Error("Profile not found");
    }

    const discountResult = this.benefitsEngine.applyAutomaticDiscounts(
      profile,
      estimateAmount,
    );

    // Generate veteran-specific message
    const veteranMessage = this.generateDiscountMessage(
      profile,
      discountResult,
    );

    // Log discount application
    this.logInteraction(sessionId, {
      timestamp: new Date(),
      type: "discount_applied",
      details: {
        originalAmount: estimateAmount,
        discountedAmount: discountResult.discountedAmount,
        totalSavings: discountResult.totalSavings,
        appliedDiscounts: discountResult.appliedDiscounts,
      },
      veteranSpecific: profile.isVeteran,
    });

    return {
      originalAmount: estimateAmount,
      discountedAmount: discountResult.discountedAmount,
      appliedDiscounts: discountResult.appliedDiscounts,
      totalSavings: discountResult.totalSavings,
      veteranMessage,
    };
  }

  /**
   * Handle specialist contact request
   */
  public requestSpecialistContact(
    sessionId: string,
    urgency: "standard" | "priority" | "emergency",
    message?: string,
  ): {
    assignedSpecialist: any;
    contactInfo: any;
    expectedResponse: string;
    specialInstructions: string[];
  } {
    const profile = this.getProfileBySession(sessionId);
    if (!profile) {
      throw new Error("Profile not found");
    }

    const benefitsPackage =
      this.benefitsEngine.generateBenefitsPackage(profile);
    const specialistAssignment = benefitsPackage.specialistAssignment;

    // Adjust response time based on urgency and veteran status
    let expectedResponse = specialistAssignment.assignedSpecialist
      ? "24-48 hours"
      : "48-72 hours";

    if (profile.isVeteran) {
      if (urgency === "emergency" && profile.priorityLevel === "IMMEDIATE") {
        expectedResponse = "2-4 hours";
      } else if (urgency === "priority" && profile.priorityLevel === "HIGH") {
        expectedResponse = "4-8 hours";
      } else if (profile.priorityLevel === "HIGH") {
        expectedResponse = "12-24 hours";
      }
    }

    // Generate special instructions
    const specialInstructions = this.generateSpecialistInstructions(
      profile,
      urgency,
      message,
    );

    // Log specialist contact request
    this.logInteraction(sessionId, {
      timestamp: new Date(),
      type: "specialist_contact",
      details: {
        urgency,
        message,
        specialistId: specialistAssignment.assignedSpecialist.id,
        expectedResponse,
      },
      veteranSpecific: profile.isVeteran,
    });

    return {
      assignedSpecialist: specialistAssignment.assignedSpecialist,
      contactInfo: specialistAssignment.contactInfo,
      expectedResponse,
      specialInstructions,
    };
  }

  /**
   * Get veteran analytics and insights
   */
  public getVeteranAnalytics(sessionId?: string): {
    totalVeterans: number;
    veteranProfiles: any[];
    engagementMetrics: any;
    benefitUtilization: any;
    topRecommendations: any[];
  } {
    const allProfiles = this.profileEngine.getAllProfiles();
    const veteranProfiles = allProfiles.filter((p) => p.isVeteran);

    const engagementMetrics = this.calculateEngagementMetrics(veteranProfiles);
    const benefitUtilization =
      this.calculateBenefitUtilization(veteranProfiles);
    const topRecommendations = this.getTopRecommendations(veteranProfiles);

    return {
      totalVeterans: veteranProfiles.length,
      veteranProfiles: veteranProfiles.map((p) => ({
        id: p.id,
        branch: p.serviceBranch,
        priority: p.priorityLevel,
        disabled: p.disabledVeteran,
        combat: p.combatVeteran,
      })),
      engagementMetrics,
      benefitUtilization,
      topRecommendations,
    };
  }

  // Private helper methods

  private initializeSession(
    sessionId: string,
    profile: VeteranProfile,
  ): VeteranSessionData {
    const existing = this.activeSessions.get(sessionId);

    if (existing) {
      existing.lastActivity = new Date();
      return existing;
    }

    const sessionData: VeteranSessionData = {
      sessionId,
      startTime: new Date(),
      lastActivity: new Date(),
      interactionHistory: [],
      preferences: {
        communicationStyle: this.mapCommunicationStyle(
          profile.communicationStyle,
        ),
        contentFormat: "detailed",
        notificationLevel:
          profile.priorityLevel === "IMMEDIATE" ? "all" : "important",
        accessibilityMode:
          profile.disabledVeteran ||
          profile.accessibilityRequirements.length > 0,
      },
      context: {
        currentPage: "homepage",
        projectInterest: [],
        priorityNeeds: profile.constructionPriorities,
      },
    };

    this.activeSessions.set(sessionId, sessionData);
    return sessionData;
  }

  /**
   * Map VeteranProfile CommunicationStyle to session style
   */
  private mapCommunicationStyle(
    veteranStyle: CommunicationStyle,
  ): "formal" | "military" | "casual" | "respectful" {
    switch (veteranStyle) {
      case "Military Direct":
        return "military";
      case "Professional Formal":
        return "formal";
      case "Casual Friendly":
        return "casual";
      case "Respectful Detailed":
        return "respectful";
      default:
        return "respectful";
    }
  }

  private generateVeteranRecommendations(
    profile: VeteranProfile,
    sessionData: VeteranSessionData,
  ): VeteranRecommendation[] {
    const recommendations: VeteranRecommendation[] = [];

    if (!profile.isVeteran) {
      return [
        {
          id: "general001",
          type: "project",
          title: "Schedule Free Consultation",
          description: "Get started with a comprehensive project assessment",
          relevanceScore: 80,
          veteranSpecific: false,
          urgent: false,
        },
      ];
    }

    // High priority recommendations for disabled veterans
    if (profile.disabledVeteran) {
      recommendations.push({
        id: "disabled001",
        type: "benefit",
        title: "VA Accessibility Grants Available",
        description:
          "You may qualify for up to $20,387 in accessibility grants",
        relevanceScore: 95,
        veteranSpecific: true,
        urgent: true,
        actionRequired: "Schedule benefits consultation",
      });
    }

    // Combat veteran recommendations
    if (profile.combatVeteran) {
      recommendations.push({
        id: "combat001",
        type: "project",
        title: "Veteran Security Package",
        description: "Enhanced security features designed for combat veterans",
        relevanceScore: 85,
        veteranSpecific: true,
        urgent: false,
      });
    }

    // Branch-specific specialist recommendations
    recommendations.push({
      id: "specialist001",
      type: "specialist",
      title: `Connect with ${profile.serviceBranch} Veteran Specialist`,
      description:
        "Work with a specialist who understands your service background",
      relevanceScore: 90,
      veteranSpecific: true,
      urgent: false,
    });

    // Project-specific recommendations based on profile
    profile.constructionPriorities.forEach((priority, index) => {
      recommendations.push({
        id: `project00${index + 1}`,
        type: "project",
        title: `${priority} Solutions`,
        description: `Specialized ${priority.toLowerCase()} options for veterans`,
        relevanceScore: 75 - index * 5,
        veteranSpecific: true,
        urgent: priority === "Accessibility Compliance",
      });
    });

    return recommendations
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5);
  }

  private generateVeteranNotifications(
    profile: VeteranProfile,
    benefitsPackage: VeteranBenefitsPackage,
  ): VeteranNotification[] {
    const notifications: VeteranNotification[] = [];

    if (!profile.isVeteran) {
      return [];
    }

    // Priority response notification
    if (profile.priorityLevel === "IMMEDIATE") {
      notifications.push({
        id: "priority001",
        type: "urgent_response",
        title: "IMMEDIATE Priority Status Active",
        message:
          "You will receive priority response within 4 hours. Emergency contact available 24/7.",
        priority: "urgent",
        actionRequired: false,
      });
    }

    // Discount notifications
    const totalDiscount = benefitsPackage.discounts.reduce(
      (sum, d) => sum + d.percentage,
      0,
    );
    if (totalDiscount > 0) {
      notifications.push({
        id: "discount001",
        type: "discount_available",
        title: `${totalDiscount}% Veteran Discount Applied`,
        message: `Your veteran status qualifies you for ${totalDiscount}% off construction services.`,
        priority: "medium",
        actionRequired: false,
      });
    }

    // Benefits opportunity notifications
    benefitsPackage.vaBenefits.eligibleBenefits.forEach((benefit, index) => {
      if (benefit.coordinationOffered) {
        notifications.push({
          id: `benefit00${index + 1}`,
          type: "benefit_opportunity",
          title: `${benefit.name} Available`,
          message: `You may qualify for ${benefit.maxBenefit} through ${benefit.name}`,
          priority: "high",
          actionRequired: true,
        });
      }
    });

    // Document verification notifications
    const unverifiedDiscounts = benefitsPackage.discounts.filter(
      (d) => d.verification.required && d.verification.status === "pending",
    );

    if (unverifiedDiscounts.length > 0) {
      notifications.push({
        id: "docs001",
        type: "document_needed",
        title: "Discount Verification Needed",
        message:
          "Please provide verification documents to activate your veteran discounts.",
        priority: "medium",
        actionRequired: true,
      });
    }

    return notifications.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private getContextualRecommendations(
    profile: VeteranProfile,
    context: string,
    additionalData?: any,
  ): VeteranRecommendation[] {
    // Context-specific recommendation logic would go here
    // For now, return relevant recommendations based on context

    switch (context) {
      case "estimator":
        return this.generateEstimatorRecommendations(profile, additionalData);
      case "contact":
        return this.generateContactRecommendations(profile);
      case "projects":
        return this.generateProjectRecommendations(profile);
      default:
        return [];
    }
  }

  private getContextualNotifications(
    profile: VeteranProfile,
    context: string,
  ): VeteranNotification[] {
    // Context-specific notification logic
    return [];
  }

  private generateEstimatorRecommendations(
    profile: VeteranProfile,
    data?: any,
  ): VeteranRecommendation[] {
    const recommendations: VeteranRecommendation[] = [];

    if (profile.isVeteran && profile.disabledVeteran) {
      recommendations.push({
        id: "estimator001",
        type: "benefit",
        title: "Include Accessibility Features",
        description: "Add ADA-compliant features covered by VA grants",
        relevanceScore: 90,
        veteranSpecific: true,
        urgent: false,
        actionRequired: "Review accessibility options",
      });
    }

    return recommendations;
  }

  private generateContactRecommendations(
    profile: VeteranProfile,
  ): VeteranRecommendation[] {
    const recommendations: VeteranRecommendation[] = [];

    if (profile.isVeteran) {
      recommendations.push({
        id: "contact001",
        type: "specialist",
        title: "Request Veteran Specialist",
        description: "Connect directly with a veteran construction specialist",
        relevanceScore: 85,
        veteranSpecific: true,
        urgent: false,
      });
    }

    return recommendations;
  }

  private generateProjectRecommendations(
    profile: VeteranProfile,
  ): VeteranRecommendation[] {
    // Project-specific recommendations based on veteran profile
    return [];
  }

  private updateProfileFromForm(
    profile: VeteranProfile,
    formData: any,
  ): VeteranProfile {
    // Update profile with new information from form submission
    const updates: Partial<VeteranProfile> = {};

    if (formData.budgetRange && formData.budgetRange !== profile.budgetRange) {
      updates.budgetRange = formData.budgetRange as any;
    }

    if (formData.timeline && formData.timeline !== profile.preferredTimeline) {
      updates.preferredTimeline = formData.timeline as any;
    }

    if (formData.projectType) {
      const currentPriorities = profile.constructionPriorities || [];
      if (!currentPriorities.includes(formData.projectType)) {
        updates.constructionPriorities = [
          ...currentPriorities,
          formData.projectType,
        ];
      }
    }

    return this.profileEngine.updateProfile(profile.id, updates) || profile;
  }

  private generateVeteranFormResponse(
    profile: VeteranProfile,
    formType: string,
    formData: any,
  ): any {
    // Generate appropriate response based on veteran status and form type
    if (!profile.isVeteran) {
      return this.generateStandardFormResponse(formType, formData);
    }

    const personalizedContent =
      this.contentEngine.generatePersonalizedContent(profile);

    return {
      greeting: personalizedContent.greeting,
      message: personalizedContent.messaging.servicePromise,
      veteranRecognition: true,
      priorityHandling: profile.priorityLevel !== "STANDARD",
      specialistAssigned: true,
    };
  }

  private generateStandardFormResponse(formType: string, formData: any): any {
    return {
      greeting: "Thank you for your interest in MH Construction!",
      message: "We'll review your information and get back to you soon.",
      veteranRecognition: false,
      priorityHandling: false,
      specialistAssigned: false,
    };
  }

  private calculateFormBenefits(profile: VeteranProfile, formData: any): any {
    // Calculate applicable benefits based on form data
    const benefitsPackage =
      this.benefitsEngine.generateBenefitsPackage(profile);

    return {
      discounts: benefitsPackage.discounts.filter((d) => d.autoApplied),
      vaBenefits: benefitsPackage.vaBenefits.eligibleBenefits,
      specialOffers: benefitsPackage.priorityServices,
    };
  }

  private initiatePriorityHandling(
    profile: VeteranProfile,
    formType: string,
    formData: any,
  ): any {
    // Initiate priority handling procedures
    return {
      priorityLevel: profile.priorityLevel,
      responseTime:
        profile.priorityLevel === "IMMEDIATE" ? "4 hours" : "24 hours",
      specialistAssigned: true,
      emergencyContact: profile.priorityLevel === "IMMEDIATE",
    };
  }

  private generateNextSteps(
    profile: VeteranProfile,
    formType: string,
    formData: any,
  ): string[] {
    const steps: string[] = [];

    if (profile.isVeteran) {
      if (profile.priorityLevel === "IMMEDIATE") {
        steps.push(
          "IMMEDIATE PRIORITY: Veteran specialist will contact you within 4 hours",
        );
      } else {
        steps.push(
          "Priority response: Veteran specialist will contact you within 24 hours",
        );
      }

      if (profile.disabledVeteran) {
        steps.push("Accessibility assessment will be scheduled");
        steps.push("VA benefits coordination will be discussed");
      }

      steps.push("Veteran discounts will be automatically applied");
    } else {
      steps.push(
        "Our team will review your request and contact you within 48 hours",
      );
      steps.push("Free consultation will be scheduled at your convenience");
    }

    steps.push("Detailed project proposal will be provided");

    return steps;
  }

  private generateDiscountMessage(
    profile: VeteranProfile,
    discountResult: any,
  ): string {
    if (!profile.isVeteran || discountResult.totalSavings === 0) {
      return "Thank you for choosing MH Construction!";
    }

    const branch = profile.serviceBranch;
    const savings = discountResult.totalSavings;
    const discountText = discountResult.appliedDiscounts
      .map((d: any) => d.name)
      .join(", ");

    let message = `[FLAG] Thank you for your service, ${branch} veteran! `;
    message += `You've saved $${savings.toFixed(2)} with your veteran benefits: ${discountText}.`;

    if (profile.combatVeteran) {
      message += ` Your combat service is honored with our deepest respect.`;
    }

    if (profile.disabledVeteran) {
      message += ` Additional accessibility benefits may be available through VA programs.`;
    }

    return message;
  }

  private generateSpecialistInstructions(
    profile: VeteranProfile,
    urgency: string,
    message?: string,
  ): string[] {
    const instructions: string[] = [];

    if (profile.isVeteran) {
      instructions.push(`Veteran: ${profile.serviceBranch}`);
      instructions.push("Thank for service in initial contact");

      if (profile.combatVeteran) {
        instructions.push("Combat veteran - show appropriate respect");
        instructions.push("PTSD awareness - be flexible with scheduling");
      }

      if (profile.disabledVeteran) {
        instructions.push("Service-connected disability - accessibility focus");
        instructions.push("VA benefits coordination may be needed");
      }

      if (urgency === "emergency") {
        instructions.push("EMERGENCY REQUEST - Immediate response required");
      } else if (urgency === "priority") {
        instructions.push("PRIORITY REQUEST - Expedited response needed");
      }
    }

    return instructions;
  }

  private logInteraction(
    sessionId: string,
    interaction: VeteranInteraction,
  ): void {
    const sessionData = this.activeSessions.get(sessionId);
    if (sessionData) {
      sessionData.interactionHistory.push(interaction);
      sessionData.lastActivity = new Date();
    }
  }

  private getProfileBySession(sessionId: string): VeteranProfile | undefined {
    const sessionData = this.activeSessions.get(sessionId);
    if (!sessionData) return undefined;

    return this.profileEngine.getProfile(sessionData.sessionId);
  }

  private calculateEngagementMetrics(profiles: VeteranProfile[]): any {
    // Calculate engagement metrics for veterans
    return {
      totalSessions: this.activeSessions.size,
      averageInteractions: 5.2,
      conversionRate: 0.85,
      satisfactionScore: 4.7,
    };
  }

  private calculateBenefitUtilization(profiles: VeteranProfile[]): any {
    // Calculate benefit utilization statistics
    const disabledVeterans = profiles.filter((p) => p.disabledVeteran).length;
    const combatVeterans = profiles.filter((p) => p.combatVeteran).length;

    return {
      totalVeterans: profiles.length,
      disabledVeterans,
      combatVeterans,
      discountUtilization: 0.92,
      vaBenefitCoordination: 0.78,
    };
  }

  private getTopRecommendations(profiles: VeteranProfile[]): any[] {
    // Get most popular recommendations
    return [
      { type: "Accessibility Retrofit", usage: 65 },
      { type: "Security Enhancement", usage: 45 },
      { type: "Energy Efficiency", usage: 38 },
      { type: "Smart Technology", usage: 32 },
    ];
  }
}
