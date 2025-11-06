/**
 * VA Benefits Coordinator
 * Coordinates VA benefits, grants, and loan programs for veterans
 */

import type { VeteranProfile } from "../VeteranProfileEngine";
import type {
  VABenefitCoordination,
  VABenefit,
  GrantProgram,
  LoanProgram,
  CoordinationService,
} from "./types";

export class VABenefitsCoordinator {
  /**
   * Generate VA benefits coordination services
   */
  public coordinateBenefits(profile: VeteranProfile): VABenefitCoordination {
    if (!profile.isVeteran) {
      return this.createEmptyCoordination();
    }

    const eligibleBenefits = this.determineEligibleBenefits(profile);
    const grantPrograms = this.determineGrantPrograms(profile);
    const loanPrograms = this.determineLoanPrograms(profile);
    const coordinationServices = this.createCoordinationServices(profile);

    return {
      eligibleBenefits,
      grantPrograms,
      loanPrograms,
      coordinationServices,
      documentation: {
        provided: true,
        services: [
          "Document collection assistance",
          "Form completion help",
          "Medical records coordination",
          "VA communication liaison",
        ],
        specialist: "VA Benefits Coordinator",
        timeline: "1-2 weeks",
      },
    };
  }

  /**
   * Create empty coordination for non-veterans
   */
  private createEmptyCoordination(): VABenefitCoordination {
    return {
      eligibleBenefits: [],
      grantPrograms: [],
      loanPrograms: [],
      coordinationServices: [],
      documentation: {
        provided: false,
        services: [],
        specialist: "",
        timeline: "",
      },
    };
  }

  /**
   * Determine eligible VA benefits
   */
  private determineEligibleBenefits(profile: VeteranProfile): VABenefit[] {
    const benefits: VABenefit[] = [];

    // Standard VA healthcare for all veterans
    benefits.push({
      type: "Healthcare",
      name: "VA Healthcare Benefits",
      description: "Comprehensive healthcare services through VA system",
      eligibility: ["Veteran status", "Eligible discharge"],
      maxBenefit: "Full healthcare coverage",
      applicationProcess: [
        "VA Form 10-10EZ",
        "Medical evaluation",
        "Enrollment",
      ],
      estimatedTimeline: "30-60 days",
      coordinationOffered: true,
    });

    // Disabled veteran specific benefits
    if (profile.disabledVeteran) {
      benefits.push({
        type: "SAH",
        name: "Specially Adapted Housing (SAH)",
        description:
          "Grant for home modifications for severely disabled veterans",
        eligibility: [
          "50% or higher disability rating",
          "Specific qualifying disabilities",
        ],
        maxBenefit: "$101,754 (2024)",
        applicationProcess: [
          "VA Form 26-4555",
          "Medical evaluation",
          "Home assessment",
        ],
        estimatedTimeline: "60-120 days",
        coordinationOffered: true,
      });

      benefits.push({
        type: "SHA",
        name: "Special Housing Adaptation (SHA)",
        description: "Grant for accessibility modifications",
        eligibility: ["Qualifying disabilities", "Home ownership or rental"],
        maxBenefit: "$20,387 (2024)",
        applicationProcess: [
          "VA Form 26-4555",
          "Contractor estimates",
          "VA approval",
        ],
        estimatedTimeline: "45-90 days",
        coordinationOffered: true,
      });
    }

    // Vocational Rehabilitation for eligible veterans
    if (profile.disabledVeteran || profile.combatVeteran) {
      benefits.push({
        type: "VR&E",
        name: "Vocational Rehabilitation & Employment",
        description:
          "Education and training benefits for employment preparation",
        eligibility: ["Service-connected disability", "Employment handicap"],
        maxBenefit: "Full tuition + living allowance",
        applicationProcess: [
          "VA Form 28-1900",
          "Vocational assessment",
          "Plan development",
        ],
        estimatedTimeline: "60-90 days",
        coordinationOffered: true,
      });
    }

    return benefits;
  }

  /**
   * Determine eligible grant programs
   */
  private determineGrantPrograms(profile: VeteranProfile): GrantProgram[] {
    const grants: GrantProgram[] = [];

    if (profile.disabledVeteran) {
      grants.push({
        name: "Home Improvements and Structural Alterations (HISA)",
        maxAmount: 6800,
        eligibility: ["Service-connected disability", "Medical necessity"],
        projectTypes: [
          "Accessibility ramps",
          "Bathroom modifications",
          "Door widening",
        ],
        processingTime: "30-60 days",
      });
    }

    return grants;
  }

  /**
   * Determine eligible loan programs
   */
  private determineLoanPrograms(profile: VeteranProfile): LoanProgram[] {
    const loans: LoanProgram[] = [];

    // VA Home Loan Program
    loans.push({
      name: "VA Home Loan",
      type: "VA Home Loan",
      maxAmount: 1000000, // Varies by location
      interestRate: "Competitive VA rates",
      terms: ["No down payment", "No PMI", "Competitive rates"],
      eligibility: [
        "90+ days active duty",
        "Eligible discharge",
        "Credit requirements",
      ],
    });

    loans.push({
      name: "VA Energy Efficient Mortgage",
      type: "Energy Efficient Mortgage",
      maxAmount: 6000,
      interestRate: "Standard VA rates",
      terms: ["Energy improvements funding", "Rolled into mortgage"],
      eligibility: ["VA loan eligibility", "Energy efficiency improvements"],
    });

    return loans;
  }

  /**
   * Create coordination services
   */
  private createCoordinationServices(
    profile: VeteranProfile,
  ): CoordinationService[] {
    return [
      {
        service: "Benefits Application Assistance",
        description: "Help with VA benefits applications and documentation",
        included: true,
        specialist: "Certified VA Benefits Coordinator",
        timeline: "Throughout project",
      },
      {
        service: "Medical Documentation Coordination",
        description: "Assistance obtaining required medical documentation",
        included: profile.disabledVeteran,
        specialist: "Medical Liaison Specialist",
        timeline: "1-2 weeks",
      },
      {
        service: "Grant Application Support",
        description: "Complete grant application process management",
        included: profile.disabledVeteran,
        specialist: "Grant Specialist",
        timeline: "2-4 weeks",
      },
      {
        service: "VA Inspector Coordination",
        description: "Scheduling and coordination with VA inspectors",
        included: true,
        specialist: "Project Coordinator",
        timeline: "As needed",
      },
    ];
  }
}
