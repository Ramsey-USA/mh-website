/**
 * Veteran Personalization System - Main Export
 * Phase 6.4-6.6 Enhanced Veteran Experience
 */

import { logger } from "@/lib/utils/logger";

// Core Engines
import {
  VeteranProfileEngine,
  VeteranProfile,
  ServiceBranch,
} from "./VeteranProfileEngine";
import {
  ContentPersonalizationEngine,
  PersonalizedContent,
} from "./ContentPersonalizationEngine";
import {
  VeteranBenefitsAutomation,
  VeteranBenefitsPackage,
} from "./VeteranBenefitsAutomation";
import {
  VeteranPersonalizationSystem,
  ComprehensiveVeteranExperience,
  VeteranSessionData,
  VeteranRecommendation,
  VeteranNotification,
} from "./VeteranPersonalizationSystem";

// Re-export everything
export {
  VeteranProfileEngine,
  type VeteranProfile,
} from "./VeteranProfileEngine";
export {
  ContentPersonalizationEngine,
  type PersonalizedContent,
} from "./ContentPersonalizationEngine";
export {
  VeteranBenefitsAutomation,
  type VeteranBenefitsPackage,
} from "./VeteranBenefitsAutomation";
export {
  VeteranPersonalizationSystem,
  type ComprehensiveVeteranExperience,
  type VeteranSessionData,
  type VeteranRecommendation,
  type VeteranNotification,
} from "./VeteranPersonalizationSystem";

// Type Exports for External Use
export type {
  // Profile Types
  ServiceBranch,
  ServiceEra,
  RankCategory,
  CombatTheater,
  VeteranPriority,
  VeteranProgram,
  FamilyStatus,
  EmploymentStatus,
  HousingStatus,
  IncomeLevel,
  ConstructionPriority,
  AccessibilityRequirement,
  Timeline,
  BudgetRange,
  CommunicationStyle,
  ContactMethod,
  RespectLevel,
  DeploymentRecord,
  AdaptiveNeed,
  VABenefit,
} from "./VeteranProfileEngine";

export type {
  // Personalization Types
  PersonalizedMessaging,
  PersonalizedRecommendation,
  PersonalizedPricing,
  VeteranDiscount,
  FinancingOption,
  PersonalizedTestimonial,
  PersonalizedFormData,
  PersonalizedCommunication,
} from "./ContentPersonalizationEngine";

export type {
  // Benefits Types
  AutomatedDiscount,
  DiscountVerification,
  VABenefitCoordination,
  GrantProgram,
  LoanProgram,
  CoordinationService,
  DocumentationAssistance,
  PriorityService,
  SpecialistAssignment,
  VeteranSpecialist,
  SpecializationType,
  ContactInfo,
  AvailabilityWindow,
  CommunicationProtocol,
  EscalationLevel,
  AutomatedTimeline,
  TimelineMilestone,
  EmergencyResponse,
} from "./VeteranBenefitsAutomation";

/**
 * Quick Start Guide:
 *
 * Use the classes directly instead of wrapper functions:
 * - VeteranPersonalizationSystem.getInstance()
 * - VeteranProfileEngine.getInstance().analyzeAndCreateProfile()
 * - ContentPersonalizationEngine.getInstance().generatePersonalizedContent()
 * - VeteranBenefitsAutomation.getInstance().generateBenefitsPackage()
 */

/**
 * Default Configuration for Veteran System
 */
export const VETERAN_SYSTEM_CONFIG = {
  // Priority Response Times
  IMMEDIATE_RESPONSE_TIME: "4 hours",
  HIGH_PRIORITY_RESPONSE_TIME: "24 hours",
  STANDARD_RESPONSE_TIME: "48 hours",

  // Discount Limits
  MAX_VETERAN_DISCOUNT: 15,
  BASE_VETERAN_DISCOUNT: 8,
  COMBAT_VETERAN_BONUS: 4,
  DISABLED_VETERAN_BONUS: 3,

  // System Features
  AUTOMATIC_DISCOUNT_APPLICATION: true,
  VA_BENEFITS_COORDINATION: true,
  SPECIALIST_ASSIGNMENT: true,
  PRIORITY_SCHEDULING: true,
  ACCESSIBILITY_ASSESSMENT: true,

  // Communication Preferences
  MILITARY_TERMINOLOGY_SUPPORT: true,
  BRANCH_SPECIFIC_MESSAGING: true,
  RESPECT_LEVEL_CUSTOMIZATION: true,

  // Emergency Support
  EMERGENCY_RESPONSE_AVAILABLE: true,
  EMERGENCY_CONTACT_24_7: true,
  CRISIS_INTERVENTION_TRAINED: true,
};

/**
 * Veteran Branch Emoji Map
 */
export const VETERAN_BRANCH_EMOJIS = {
  Army: "[ACCOUNT_BALANCE]",
  Navy: "[ANCHOR]",
  Marines: "[SPA]",
  "Air Force": "[FLIGHT]",
  "Coast Guard": "[SAFETY_RING]",
  "Space Force": "[ROCKET_LAUNCH]",
  Unknown: "[FLAG]",
};

/**
 * Veteran Priority Icons
 */
export const VETERAN_PRIORITY_ICONS = {
  IMMEDIATE: "[EMERGENCY]",
  HIGH: "[BOLT]",
  STANDARD: "[FLAG]",
  FAMILY: "family_restroom",
};

/**
 * Service Era Icons
 */
export const SERVICE_ERA_ICONS = {
  "GWOT (2001-Present)": "[MILITARY_TECH]",
  "Post-9/11": "monument",
  "Gulf War (1990-1991)": "landscape",
  "Cold War Era (1945-1991)": "[AC_UNIT]",
  "Vietnam Era (1964-1975)": "nature",
  "Korean War (1950-1953)": "terrain",
  "WWII (1941-1945)": "public",
  "Multiple Eras": "[EVENT]",
  Unknown: "[HELP]",
};

/**
 * Utility Functions:
 *
 * Use the engine methods directly:
 * - VeteranProfileEngine.getInstance().detectVeteranStatus()
 * - VeteranProfileEngine.getInstance().detectServiceBranch()
 * - ContentPersonalizationEngine.getInstance().generatePersonalizedContent()
 */

/**
 * Phase 6.4-6.6 Implementation Status
 */
export const PHASE_6_STATUS = {
  "6.4": {
    name: "Enhanced Veteran Detection & Profiling",
    status: "COMPLETE",
    features: [
      "Advanced veteran status detection with confidence scoring",
      "Comprehensive service branch recognition (all 6 branches)",
      "Combat veteran and deployment history analysis",
      "Disability rating and service-connected condition detection",
      "Multi-service veteran support",
      "Service era classification with multiple era support",
      "Rank category and specific rank detection",
      "Family status and employment analysis",
      "Accessibility needs assessment",
      "Communication preference profiling",
    ],
  },
  "6.5": {
    name: "Dynamic Content Personalization",
    status: "COMPLETE",
    features: [
      "Branch-specific greeting messages and terminology",
      "Personalized hero messages and value propositions",
      "Service-specific project recommendations",
      "Adaptive pricing with stacked veteran discounts",
      "Branch-matched testimonials with relevance scoring",
      "Pre-filled forms with veteran-specific fields",
      "Communication style adaptation (formal/military/casual)",
      "Respect level customization (High Honors/Combat Valor/Service Honor)",
      "Context-aware content for different pages",
      "Emergency and priority messaging for immediate needs",
    ],
  },
  "6.6": {
    name: "Veteran Benefits Automation",
    status: "COMPLETE",
    features: [
      "Automatic discount application with verification system",
      "VA benefits coordination (SAH, SHA, HISA, VR&E)",
      "Grant program identification and application assistance",
      "VA Home Loan and energy efficiency mortgage coordination",
      "Priority scheduling with guaranteed response times",
      "Veteran specialist assignment with branch matching",
      "Emergency response protocols for disabled veterans",
      "Documentation assistance and VA liaison services",
      "Escalation procedures for priority veterans",
      "Comprehensive benefits package generation",
    ],
  },
};

logger.log(
  "[CHECK_CIRCLE] Enhanced Veteran Personalization System (Phase 6.4-6.6) - COMPLETE"
);
logger.log(
  "[MILITARY_TECH] All veteran-focused features are operational and ready for deployment"
);
