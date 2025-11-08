/**
 * Veteran Benefits Automation
 * Main orchestrator for veteran benefits, discounts, and services
 *
 * Refactored from monolithic 1,100-line file into modular components:
 * - types.ts: Type definitions
 * - DiscountCalculator.ts: Discount calculation logic
 * - VABenefitsCoordinator.ts: VA benefits coordination
 * - SpecialistManager.ts: Specialist assignment and management
 * - index.ts: Main orchestrator (this file)
 */

import type { VeteranProfile } from "../VeteranProfileEngine";
import { DiscountCalculator } from "./DiscountCalculator";
import { VABenefitsCoordinator } from "./VABenefitsCoordinator";
import { SpecialistManager } from "./SpecialistManager";
import type {
  VeteranBenefitsPackage,
  PriorityService,
  CommunicationProtocol,
  EscalationLevel,
  AutomatedTimeline,
  TimelineMilestone,
  EmergencyResponse,
  AutomatedDiscount,
} from "./types";

export class VeteranBenefitsAutomation {
  private static instance: VeteranBenefitsAutomation;
  private discountCalculator: DiscountCalculator;
  private vaBenefitsCoordinator: VABenefitsCoordinator;
  private specialistManager: SpecialistManager;

  private constructor() {
    this.discountCalculator = new DiscountCalculator();
    this.vaBenefitsCoordinator = new VABenefitsCoordinator();
    this.specialistManager = new SpecialistManager();
  }

  public static getInstance(): VeteranBenefitsAutomation {
    if (!VeteranBenefitsAutomation.instance) {
      VeteranBenefitsAutomation.instance = new VeteranBenefitsAutomation();
    }
    return VeteranBenefitsAutomation.instance;
  }

  /**
   * Generate comprehensive veteran benefits package
   */
  public generateBenefitsPackage(
    _profile: VeteranProfile,
  ): VeteranBenefitsPackage {
    return {
      discounts: this.discountCalculator.calculateDiscounts(profile),
      vaBenefits: this.vaBenefitsCoordinator.coordinateBenefits(profile),
      priorityServices: this.generatePriorityServices(profile),
      specialistAssignment: this.specialistManager.assignSpecialist(profile),
      communicationProtocol: this.generateCommunicationProtocol(profile),
      timeline: this.generateAutomatedTimeline(profile),
    };
  }

  /**
   * Apply automatic discounts to a total amount
   */
  public applyAutomaticDiscounts(
    totalAmount: number,
    _profile: VeteranProfile,
  ): {
    originalAmount: number;
    discountedAmount: number;
    totalSavings: number;
    appliedDiscounts: AutomatedDiscount[];
  } {
    const discounts = this.discountCalculator.calculateDiscounts(profile);
    return this.discountCalculator.applyDiscounts(totalAmount, discounts);
  }

  /**
   * Get specialist by ID
   */
  public getSpecialist(id: string) {
    return this.specialistManager.getSpecialist(id);
  }

  /**
   * Get all specialists
   */
  public getAllSpecialists() {
    return this.specialistManager.getAllSpecialists();
  }

  /**
   * Generate priority services based on veteran status
   */
  private generatePriorityServices(profile: VeteranProfile): PriorityService[] {
    const services: PriorityService[] = [];

    if (!profile.isVeteran) {
      services.push({
        type: "response",
        name: "Standard Response Time",
        description: "Professional response within 48 hours",
        timeline: "48 hours",
        automatic: true,
      });
      return services;
    }

    // Priority response based on veteran level
    if (profile.priorityLevel === "IMMEDIATE") {
      services.push({
        type: "response",
        name: "IMMEDIATE Priority Response",
        description:
          "Guaranteed response within 4 hours for disabled/combat veterans",
        timeline: "4 hours",
        automatic: true,
      });

      services.push({
        type: "emergency",
        name: "Emergency Construction Services",
        description: "24/7 emergency response for critical accessibility needs",
        timeline: "Within 24 hours",
        automatic: true,
      });
    } else if (profile.priorityLevel === "HIGH") {
      services.push({
        type: "response",
        name: "HIGH Priority Response",
        description: "Priority response within 24 hours for veterans",
        timeline: "24 hours",
        automatic: true,
      });
    }

    // Specialist assignment
    services.push({
      type: "specialist",
      name: "Veteran Specialist Assignment",
      description: "Dedicated veteran specialist for your project",
      timeline: "Immediate assignment",
      automatic: true,
    });

    // Priority scheduling
    services.push({
      type: "scheduling",
      name: "Priority Project Scheduling",
      description: "Veterans receive priority in project scheduling",
      timeline: "Next available slot",
      automatic: true,
    });

    // Accessibility services for disabled veterans
    if (profile.disabledVeteran) {
      services.push({
        type: "accessibility",
        name: "Accessibility Compliance Assessment",
        description: "Free comprehensive accessibility assessment",
        timeline: "Within 1 week",
        automatic: true,
      });

      services.push({
        type: "accessibility",
        name: "ADA Compliance Guarantee",
        description: "All work guaranteed to meet ADA compliance standards",
        timeline: "Throughout project",
        automatic: true,
      });
    }

    return services;
  }

  /**
   * Generate communication protocol
   */
  private generateCommunicationProtocol(
    _profile: VeteranProfile,
  ): CommunicationProtocol {
    const escalationProcedure: EscalationLevel[] = [];
    const specialInstructions: string[] = [];
    const priorityIndicators: string[] = [];

    let responseTime = "48 hours";
    let communicationStyle: CommunicationProtocol["communicationStyle"] =
      "casual";
    let terminology: CommunicationProtocol["terminology"] = "civilian";

    if (profile.isVeteran) {
      // Set veteran-specific communication preferences
      if (profile.rankCategory === "Officer") {
        communicationStyle = "formal";
        terminology = "military";
      } else if (profile.militaryTerminology) {
        communicationStyle = "military";
        terminology = "mixed";
      } else {
        communicationStyle = "respectful";
        terminology = "civilian";
      }

      // Priority response times
      if (profile.priorityLevel === "IMMEDIATE") {
        responseTime = "4 hours";
        priorityIndicators.push("[EMERGENCY] IMMEDIATE PRIORITY");
        priorityIndicators.push("Disabled/Combat Veteran");

        escalationProcedure.push({
          level: 1,
          trigger: "No response within 2 hours",
          assignee: "Duty Officer",
          timeline: "30 minutes",
          actions: ["Direct specialist contact", "Manager notification"],
        });
      } else if (profile.priorityLevel === "HIGH") {
        responseTime = "24 hours";
        priorityIndicators.push("[BOLT] HIGH PRIORITY");
        priorityIndicators.push("Veteran Status");
      }

      // Special instructions
      specialInstructions.push(`Veteran: ${profile.serviceBranch}`);

      if (profile.combatVeteran) {
        specialInstructions.push("Combat Veteran - PTSD awareness");
        specialInstructions.push("Flexible scheduling if needed");
      }

      if (profile.disabledVeteran) {
        specialInstructions.push("Service-connected disability");
        specialInstructions.push("Accessibility assessment required");
      }

      specialInstructions.push("Thank for service in initial contact");
      specialInstructions.push("Military appreciation and respect");
    }

    return {
      responseTime,
      escalationProcedure,
      communicationStyle,
      terminology,
      specialInstructions,
      priorityIndicators,
    };
  }

  /**
   * Generate automated timeline based on priority
   */
  private generateAutomatedTimeline(
    _profile: VeteranProfile,
  ): AutomatedTimeline {
    let initialResponse = "48 hours";
    let consultation = "1 week";
    let proposal = "3-5 business days";
    let projectStart = "2-4 weeks";

    const milestones: TimelineMilestone[] = [
      {
        phase: "Initial Consultation",
        description: "Project assessment and requirement gathering",
        estimatedDuration: "2-3 hours",
        dependencies: [],
        veteranSpecific: false,
      },
      {
        phase: "Proposal Development",
        description: "Detailed project proposal and cost estimation",
        estimatedDuration: "3-5 days",
        dependencies: ["Initial Consultation"],
        veteranSpecific: false,
      },
      {
        phase: "Permits and Planning",
        description: "Permit acquisition and detailed project planning",
        estimatedDuration: "1-2 weeks",
        dependencies: ["Proposal Approval"],
        veteranSpecific: false,
      },
    ];

    if (profile.isVeteran) {
      if (profile.priorityLevel === "IMMEDIATE") {
        initialResponse = "4 hours";
        consultation = "2-3 days";
        proposal = "24-48 hours";
        projectStart = "1-2 weeks";

        milestones.unshift({
          phase: "Emergency Assessment",
          description: "Immediate assessment for urgent veteran needs",
          estimatedDuration: "2-4 hours",
          dependencies: [],
          veteranSpecific: true,
        });
      } else if (profile.priorityLevel === "HIGH") {
        initialResponse = "24 hours";
        consultation = "3-5 days";
        proposal = "2-3 business days";
        projectStart = "1-3 weeks";
      }

      // Add veteran-specific milestones
      if (profile.disabledVeteran) {
        milestones.splice(1, 0, {
          phase: "Accessibility Assessment",
          description: "Comprehensive accessibility needs evaluation",
          estimatedDuration: "1-2 days",
          dependencies: ["Initial Consultation"],
          veteranSpecific: true,
        });

        milestones.push({
          phase: "VA Benefits Coordination",
          description: "Coordination with VA benefits and documentation",
          estimatedDuration: "1-3 weeks",
          dependencies: ["Accessibility Assessment"],
          veteranSpecific: true,
        });
      }
    }

    const emergency: EmergencyResponse = {
      available: profile.priorityLevel === "IMMEDIATE",
      responseTime: "2 hours",
      criteria: ["Medical emergency", "Safety hazard", "Accessibility crisis"],
      specialist: "Emergency Response Specialist",
      procedures: [
        "Immediate specialist contact",
        "Emergency assessment within 4 hours",
        "Temporary solutions if needed",
        "Expedited project timeline",
      ],
    };

    return {
      initialResponse,
      consultation,
      proposal,
      projectStart,
      milestones,
      emergency,
    };
  }
}

// Re-export all types
export * from "./types";
