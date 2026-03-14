import type { VeteranProfile } from "@/lib/veteran/types/veteran-types";
import type {
  CoordinationService,
  DocumentationAssistance,
  GrantProgram,
  LoanProgram,
  VABenefit,
  VABenefitCoordination,
} from "./types";

export class VABenefitsCoordinator {
  public coordinateBenefits(profile: VeteranProfile): VABenefitCoordination {
    if (!profile.isVeteran) {
      return {
        eligibleBenefits: [],
        grantPrograms: [],
        loanPrograms: [],
        coordinationServices: [],
        documentation: this.buildDocumentation(false),
      };
    }

    const eligibleBenefits: VABenefit[] = [
      {
        type: "VR&E",
        name: "Veteran Readiness and Employment",
        description:
          "Support for employment-focused accessibility improvements",
        eligibility: ["Verified veteran status"],
        maxBenefit: "Varies",
        applicationProcess: ["Eligibility review", "VA counselor intake"],
        estimatedTimeline: "2-6 weeks",
        coordinationOffered: true,
      },
    ];

    if (profile.disabledVeteran) {
      eligibleBenefits.push({
        type: "HISA",
        name: "Home Improvements and Structural Alterations",
        description: "Funding for medically necessary home modifications",
        eligibility: ["Service-connected disability"],
        maxBenefit: "Per VA policy",
        applicationProcess: ["Clinical recommendation", "VA submission"],
        estimatedTimeline: "2-8 weeks",
        coordinationOffered: true,
      });
    }

    const grantPrograms: GrantProgram[] = [
      {
        name: "State/Local Veteran Accessibility Grant",
        maxAmount: 10000,
        eligibility: ["Veteran household"],
        projectTypes: ["Accessibility", "Safety upgrades"],
        processingTime: "4-10 weeks",
      },
    ];

    const loanPrograms: LoanProgram[] = [
      {
        name: "VA Renovation Loan",
        type: "VA Renovation Loan",
        maxAmount: 150000,
        interestRate: "Market rate",
        terms: ["Qualified contractor", "Lender approval"],
        eligibility: ["VA loan eligibility"],
      },
    ];

    const coordinationServices: CoordinationService[] = [
      {
        service: "Benefits Intake Review",
        description: "Map project scope to applicable VA benefits",
        included: true,
        specialist: "Veteran Benefits Specialist",
        timeline: "Within 3 business days",
      },
      {
        service: "Documentation Packet Support",
        description: "Assist with collection and submission prep",
        included: true,
        specialist: "Veteran Benefits Specialist",
        timeline: "1-2 weeks",
      },
    ];

    return {
      eligibleBenefits,
      grantPrograms,
      loanPrograms,
      coordinationServices,
      documentation: this.buildDocumentation(true),
    };
  }

  private buildDocumentation(provided: boolean): DocumentationAssistance {
    return {
      provided,
      services: provided
        ? [
            "Benefit eligibility checklist",
            "Document collection guidance",
            "Submission sequencing support",
          ]
        : [],
      specialist: provided ? "Veteran Benefits Specialist" : "N/A",
      timeline: provided ? "1-2 weeks" : "N/A",
    };
  }
}
