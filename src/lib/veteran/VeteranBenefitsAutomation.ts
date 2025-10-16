/**
 * Veteran Benefits Automation System - Phase 6.6
 * Automatic discount application, VA coordination, and specialized services
 */

import {
  VeteranProfile,
  VeteranPriority,
  ServiceBranch,
} from "./VeteranProfileEngine";

export interface VeteranBenefitsPackage {
  discounts: AutomatedDiscount[];
  vaBenefits: VABenefitCoordination;
  priorityServices: PriorityService[];
  specialistAssignment: SpecialistAssignment;
  communicationProtocol: CommunicationProtocol;
  timeline: AutomatedTimeline;
}

export interface AutomatedDiscount {
  id: string;
  type: "combat" | "disabled" | "branch" | "era" | "family" | "emergency";
  name: string;
  percentage: number;
  description: string;
  autoApplied: boolean;
  requirements: string[];
  verification: DiscountVerification;
  maxSavings?: number;
  stackable: boolean;
}

export interface DiscountVerification {
  required: boolean;
  documents: string[];
  verificationMethod: "manual" | "va_api" | "dd214" | "military_id";
  status: "pending" | "verified" | "rejected";
  verifiedDate?: Date;
}

export interface VABenefitCoordination {
  eligibleBenefits: VABenefit[];
  grantPrograms: GrantProgram[];
  loanPrograms: LoanProgram[];
  coordinationServices: CoordinationService[];
  documentation: DocumentationAssistance;
}

export interface VABenefit {
  type: "HISA" | "SAH" | "SHA" | "VRRAP" | "VR&E" | "Healthcare";
  name: string;
  description: string;
  eligibility: string[];
  maxBenefit: string;
  applicationProcess: string[];
  estimatedTimeline: string;
  coordinationOffered: boolean;
}

export interface GrantProgram {
  name: string;
  maxAmount: number;
  eligibility: string[];
  projectTypes: string[];
  applicationDeadline?: Date;
  processingTime: string;
}

export interface LoanProgram {
  name: string;
  type: "VA Home Loan" | "VA Renovation Loan" | "Energy Efficient Mortgage";
  maxAmount: number;
  interestRate: string;
  terms: string[];
  eligibility: string[];
}

export interface CoordinationService {
  service: string;
  description: string;
  included: boolean;
  specialist: string;
  timeline: string;
}

export interface DocumentationAssistance {
  provided: boolean;
  services: string[];
  specialist: string;
  timeline: string;
}

export interface PriorityService {
  type:
    | "scheduling"
    | "response"
    | "specialist"
    | "emergency"
    | "accessibility";
  name: string;
  description: string;
  timeline: string;
  automatic: boolean;
}

export interface SpecialistAssignment {
  assignedSpecialist: VeteranSpecialist;
  backupSpecialist?: VeteranSpecialist;
  contactInfo: ContactInfo;
  specializations: string[];
  availability: AvailabilityWindow[];
}

export interface VeteranSpecialist {
  id: string;
  name: string;
  title: string;
  branch: ServiceBranch;
  veteranStatus: boolean;
  combatVeteran: boolean;
  specializations: SpecializationType[];
  certifications: string[];
  languages: string[];
  photo?: string;
  bio: string;
}

export type SpecializationType =
  | "Accessibility Compliance"
  | "VA Benefits Coordination"
  | "Combat Veteran Services"
  | "Disabled Veteran Services"
  | "Emergency Response"
  | "Security Systems"
  | "Smart Technology"
  | "Energy Efficiency";

export interface ContactInfo {
  phone: string;
  email: string;
  directLine?: string;
  emergencyContact?: string;
  preferredMethod: "phone" | "email" | "text" | "in_person";
}

export interface AvailabilityWindow {
  day: string;
  startTime: string;
  endTime: string;
  timezone: string;
  emergencyAvailable: boolean;
}

export interface CommunicationProtocol {
  responseTime: string;
  escalationProcedure: EscalationLevel[];
  communicationStyle: "formal" | "military" | "casual" | "respectful";
  terminology: "military" | "civilian" | "mixed";
  specialInstructions: string[];
  priorityIndicators: string[];
}

export interface EscalationLevel {
  level: number;
  trigger: string;
  assignee: string;
  timeline: string;
  actions: string[];
}

export interface AutomatedTimeline {
  initialResponse: string;
  consultation: string;
  proposal: string;
  projectStart: string;
  milestones: TimelineMilestone[];
  emergency: EmergencyResponse;
}

export interface TimelineMilestone {
  phase: string;
  description: string;
  estimatedDuration: string;
  dependencies: string[];
  veteranSpecific: boolean;
}

export interface EmergencyResponse {
  available: boolean;
  responseTime: string;
  criteria: string[];
  specialist: string;
  procedures: string[];
}

/**
 * Veteran Benefits Automation Engine
 */
export class VeteranBenefitsAutomation {
  private static instance: VeteranBenefitsAutomation;

  // Veteran specialists database
  private specialists: VeteranSpecialist[] = [
    {
      id: "spec001",
      name: 'James "Doc" Martinez',
      title: "Senior Veteran Project Specialist",
      branch: "Army",
      veteranStatus: true,
      combatVeteran: true,
      specializations: [
        "Combat Veteran Services",
        "Accessibility Compliance",
        "VA Benefits Coordination",
      ],
      certifications: [
        "ADA Compliance Certified",
        "VA Benefits Coordinator",
        "PTSD Awareness Trained",
      ],
      languages: ["English", "Spanish"],
      bio: "Combat veteran with 12 years of service, specializing in helping fellow veterans navigate construction projects and benefits coordination.",
    },
    {
      id: "spec002",
      name: 'Sarah "Chief" Thompson',
      title: "Disabled Veteran Services Coordinator",
      branch: "Navy",
      veteranStatus: true,
      combatVeteran: false,
      specializations: [
        "Disabled Veteran Services",
        "Accessibility Compliance",
        "Smart Technology",
      ],
      certifications: [
        "Certified Rehabilitation Counselor",
        "Universal Design Specialist",
        "Smart Home Integration",
      ],
      languages: ["English"],
      bio: "Navy veteran and certified rehabilitation counselor, dedicated to creating accessible living spaces for disabled veterans.",
    },
    {
      id: "spec003",
      name: 'Michael "Gunny" Rodriguez',
      title: "Combat Veteran Liaison",
      branch: "Marines",
      veteranStatus: true,
      combatVeteran: true,
      specializations: [
        "Combat Veteran Services",
        "Security Systems",
        "Emergency Response",
      ],
      certifications: [
        "Security Systems Professional",
        "Combat Stress Awareness",
        "Crisis Intervention",
      ],
      languages: ["English", "Spanish"],
      bio: "Marine Corps veteran with three combat deployments, now helping fellow warriors secure and fortify their homes.",
    },
    {
      id: "spec004",
      name: 'Lisa "Captain" Johnson',
      title: "Air Force Technology Specialist",
      branch: "Air Force",
      veteranStatus: true,
      combatVeteran: false,
      specializations: [
        "Smart Technology",
        "Energy Efficiency",
        "VA Benefits Coordination",
      ],
      certifications: [
        "Smart Home Technology Certified",
        "Energy Audit Professional",
        "Project Management Professional",
      ],
      languages: ["English"],
      bio: "Air Force veteran with expertise in cutting-edge technology integration and energy-efficient construction solutions.",
    },
  ];

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
    profile: VeteranProfile
  ): VeteranBenefitsPackage {
    return {
      discounts: this.generateAutomatedDiscounts(profile),
      vaBenefits: this.generateVABenefitCoordination(profile),
      priorityServices: this.generatePriorityServices(profile),
      specialistAssignment: this.assignVeteranSpecialist(profile),
      communicationProtocol: this.generateCommunicationProtocol(profile),
      timeline: this.generateAutomatedTimeline(profile),
    };
  }

  /**
   * Generate automated discounts with verification
   */
  private generateAutomatedDiscounts(
    profile: VeteranProfile
  ): AutomatedDiscount[] {
    const discounts: AutomatedDiscount[] = [];

    if (!profile.isVeteran) {
      // Military family discount
      if (profile.familyStatus === "Military Family") {
        discounts.push({
          id: "military_family",
          type: "family",
          name: "Military Family Appreciation",
          percentage: 5,
          description: "Supporting military families with dedicated pricing",
          autoApplied: true,
          requirements: ["Military family member verification"],
          verification: {
            required: true,
            documents: ["Military spouse ID", "Dependent ID"],
            verificationMethod: "military_id",
            status: "pending",
          },
          stackable: false,
        });
      }
      return discounts;
    }

    // Base veteran discount
    discounts.push({
      id: "veteran_base",
      type: "branch",
      name: `${profile.serviceBranch} Veteran Discount`,
      percentage: 8,
      description: `Honoring ${profile.serviceBranch} veterans with dedicated pricing`,
      autoApplied: true,
      requirements: ["Veteran status verification"],
      verification: {
        required: true,
        documents: ["DD-214", "Military ID", "Veteran ID card"],
        verificationMethod: "dd214",
        status: "pending",
      },
      stackable: true,
    });

    // Combat veteran additional discount
    if (profile.combatVeteran) {
      discounts.push({
        id: "combat_veteran",
        type: "combat",
        name: "Combat Veteran Honor Discount",
        percentage: 4,
        description:
          "Additional savings for veterans who served in combat zones",
        autoApplied: true,
        requirements: ["Combat deployment verification"],
        verification: {
          required: true,
          documents: ["DD-214 with combat designations", "Combat medals"],
          verificationMethod: "dd214",
          status: "pending",
        },
        stackable: true,
      });
    }

    // Disabled veteran discount
    if (profile.disabledVeteran) {
      const disabilityPercentage = profile.disabilityRating || 30;
      let discountPercentage = 3;

      if (disabilityPercentage >= 70) {
        discountPercentage = 5;
      } else if (disabilityPercentage >= 50) {
        discountPercentage = 4;
      }

      discounts.push({
        id: "disabled_veteran",
        type: "disabled",
        name: "Disabled Veteran Service Discount",
        percentage: discountPercentage,
        description: `Additional ${discountPercentage}% for veterans with service-connected disabilities`,
        autoApplied: true,
        requirements: ["VA disability rating verification"],
        verification: {
          required: true,
          documents: ["VA disability letter", "VA ID card"],
          verificationMethod: "va_api",
          status: "pending",
        },
        stackable: true,
      });
    }

    // Era-specific discounts
    if (
      profile.serviceEra === "GWOT (2001-Present)" ||
      profile.serviceEra === "Post-9/11"
    ) {
      discounts.push({
        id: "post_911",
        type: "era",
        name: "Post-9/11 Veteran Recognition",
        percentage: 2,
        description: "Recognizing Post-9/11 veterans with additional savings",
        autoApplied: true,
        requirements: ["Post-9/11 service verification"],
        verification: {
          required: false,
          documents: ["DD-214 with service dates"],
          verificationMethod: "dd214",
          status: "verified",
        },
        stackable: true,
      });
    }

    // Emergency/immediate need discount
    if (
      profile.priorityLevel === "IMMEDIATE" &&
      (profile.adaptiveNeeds.length > 0 ||
        profile.accessibilityRequirements.length > 0)
    ) {
      discounts.push({
        id: "emergency_accessibility",
        type: "emergency",
        name: "Emergency Accessibility Discount",
        percentage: 10,
        description:
          "Emergency accessibility modifications for immediate needs",
        autoApplied: true,
        requirements: ["Medical necessity documentation"],
        verification: {
          required: true,
          documents: ["VA medical recommendation", "Doctor prescription"],
          verificationMethod: "manual",
          status: "pending",
        },
        maxSavings: 5000,
        stackable: false,
      });
    }

    return discounts;
  }

  /**
   * Generate VA benefits coordination services
   */
  private generateVABenefitCoordination(
    profile: VeteranProfile
  ): VABenefitCoordination {
    const eligibleBenefits: VABenefit[] = [];
    const grantPrograms: GrantProgram[] = [];
    const loanPrograms: LoanProgram[] = [];

    if (!profile.isVeteran) {
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

    // Standard VA benefits for all veterans
    eligibleBenefits.push({
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
      eligibleBenefits.push({
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

      eligibleBenefits.push({
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

      grantPrograms.push({
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

    // Vocational Rehabilitation for eligible veterans
    if (profile.disabledVeteran || profile.combatVeteran) {
      eligibleBenefits.push({
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

    // VA Home Loan Program
    loanPrograms.push({
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

    loanPrograms.push({
      name: "VA Energy Efficient Mortgage",
      type: "Energy Efficient Mortgage",
      maxAmount: 6000,
      interestRate: "Standard VA rates",
      terms: ["Energy improvements funding", "Rolled into mortgage"],
      eligibility: ["VA loan eligibility", "Energy efficiency improvements"],
    });

    const coordinationServices: CoordinationService[] = [
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
   * Assign appropriate veteran specialist
   */
  private assignVeteranSpecialist(
    profile: VeteranProfile
  ): SpecialistAssignment {
    // Default assignment for non-veterans
    if (!profile.isVeteran) {
      return {
        assignedSpecialist: {
          id: "general001",
          name: "Mike Thompson",
          title: "Senior Project Coordinator",
          branch: "Unknown",
          veteranStatus: false,
          combatVeteran: false,
          specializations: ["Energy Efficiency"],
          certifications: ["Project Management Professional"],
          languages: ["English"],
          bio: "Experienced project coordinator committed to delivering quality construction services.",
        },
        contactInfo: {
          phone: "(555) 123-4567",
          email: "office@mhc-gc.com",
          preferredMethod: "phone",
        },
        specializations: ["General Construction"],
        availability: this.generateStandardAvailability(),
      };
    }

    let assignedSpecialist: VeteranSpecialist;

    // Find best matching specialist
    if (profile.disabledVeteran && profile.adaptiveNeeds.length > 0) {
      // Assign disabled veteran specialist
      assignedSpecialist =
        this.specialists.find((s) =>
          s.specializations.includes("Disabled Veteran Services")
        ) || this.specialists[0];
    } else if (profile.combatVeteran) {
      // Assign combat veteran specialist
      assignedSpecialist =
        this.specialists.find(
          (s) =>
            s.combatVeteran &&
            s.specializations.includes("Combat Veteran Services")
        ) || this.specialists[0];
    } else {
      // Try to match by branch first
      assignedSpecialist =
        this.specialists.find((s) => s.branch === profile.serviceBranch) ||
        this.specialists[0];
    }

    // Assign backup specialist (different from primary)
    const backupSpecialist = this.specialists.find(
      (s) =>
        s.id !== assignedSpecialist.id &&
        s.specializations.some((spec) =>
          assignedSpecialist.specializations.includes(spec)
        )
    );

    const contactInfo: ContactInfo = {
      phone: this.generatePhoneNumber(),
      email: this.generateEmail(assignedSpecialist.name),
      directLine: this.generateDirectLine(),
      emergencyContact:
        profile.priorityLevel === "IMMEDIATE"
          ? this.generateEmergencyContact()
          : undefined,
      preferredMethod: profile.preferredContactMethod as any,
    };

    return {
      assignedSpecialist,
      backupSpecialist,
      contactInfo,
      specializations: assignedSpecialist.specializations,
      availability: this.generateSpecialistAvailability(profile.priorityLevel),
    };
  }

  /**
   * Generate communication protocol
   */
  private generateCommunicationProtocol(
    profile: VeteranProfile
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
    profile: VeteranProfile
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

  // Helper methods for generating contact information
  private generatePhoneNumber(): string {
    return "(555) 123-4567"; // In production, would use actual phone numbers
  }

  private generateEmail(name: string): string {
    // All communications go through office@mhc-gc.com
    return "office@mhc-gc.com";
  }

  private generateDirectLine(): string {
    return "(555) 123-4567 ext. 1001";
  }

  private generateEmergencyContact(): string {
    return "(555) 911-HELP";
  }

  private generateStandardAvailability(): AvailabilityWindow[] {
    return [
      {
        day: "Monday-Friday",
        startTime: "8:00 AM",
        endTime: "6:00 PM",
        timezone: "CST",
        emergencyAvailable: false,
      },
    ];
  }

  private generateSpecialistAvailability(
    priority: VeteranPriority
  ): AvailabilityWindow[] {
    const baseAvailability = this.generateStandardAvailability();

    if (priority === "IMMEDIATE") {
      baseAvailability.push({
        day: "Saturday-Sunday",
        startTime: "9:00 AM",
        endTime: "5:00 PM",
        timezone: "CST",
        emergencyAvailable: true,
      });

      baseAvailability[0].emergencyAvailable = true;
    }

    return baseAvailability;
  }

  /**
   * Apply discounts automatically to a project estimate
   */
  public applyAutomaticDiscounts(
    profile: VeteranProfile,
    baseAmount: number
  ): {
    discountedAmount: number;
    appliedDiscounts: AutomatedDiscount[];
    totalSavings: number;
  } {
    const discounts = this.generateAutomatedDiscounts(profile);
    const appliedDiscounts: AutomatedDiscount[] = [];
    let totalDiscountPercentage = 0;
    let totalFixedDiscount = 0;

    for (const discount of discounts) {
      if (discount.autoApplied) {
        appliedDiscounts.push(discount);

        if (discount.maxSavings) {
          // Fixed discount with maximum
          const discountAmount = Math.min(
            baseAmount * (discount.percentage / 100),
            discount.maxSavings
          );
          totalFixedDiscount += discountAmount;
        } else if (discount.stackable) {
          // Stackable percentage discount
          totalDiscountPercentage += discount.percentage;
        } else {
          // Non-stackable - take highest
          totalDiscountPercentage = Math.max(
            totalDiscountPercentage,
            discount.percentage
          );
        }
      }
    }

    // Apply percentage discounts
    const percentageDiscount = baseAmount * (totalDiscountPercentage / 100);
    const totalSavings = percentageDiscount + totalFixedDiscount;
    const discountedAmount = baseAmount - totalSavings;

    return {
      discountedAmount: Math.max(discountedAmount, 0),
      appliedDiscounts,
      totalSavings,
    };
  }

  /**
   * Get veteran specialist by ID
   */
  public getSpecialist(id: string): VeteranSpecialist | undefined {
    return this.specialists.find((s) => s.id === id);
  }

  /**
   * Get all specialists
   */
  public getAllSpecialists(): VeteranSpecialist[] {
    return this.specialists;
  }
}
