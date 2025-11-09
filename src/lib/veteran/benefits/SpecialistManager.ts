/**
 * Specialist Manager
 * Manages veteran specialist database and assignment logic
 */

import type { VeteranProfile, VeteranPriority } from "../VeteranProfileEngine";
import type {
  SpecialistAssignment,
  VeteranSpecialist,
  ContactInfo,
  AvailabilityWindow,
} from "./types";

export class SpecialistManager {
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

  /**
   * Assign veteran specialist based on profile
   */
  public assignSpecialist(profile: VeteranProfile): SpecialistAssignment {
    // Default assignment for non-veterans
    if (!profile.isVeteran) {
      return this.createGeneralAssignment(profile);
    }

    const assignedSpecialist = this.findBestMatch(profile);
    const backupSpecialist = this.findBackupSpecialist(assignedSpecialist);
    const contactInfo = this.createContactInfo(assignedSpecialist, profile);

    return {
      assignedSpecialist,
      backupSpecialist: backupSpecialist || assignedSpecialist,
      contactInfo,
      specializations: assignedSpecialist.specializations,
      availability: this.generateSpecialistAvailability(profile.priorityLevel),
    };
  }

  /**
   * Get specialist by ID
   */
  public getSpecialist(id: string): VeteranSpecialist | undefined {
    return this.specialists.find((s) => s.id === id);
  }

  /**
   * Get all specialists
   */
  public getAllSpecialists(): VeteranSpecialist[] {
    return [...this.specialists];
  }

  /**
   * Find best matching specialist for profile
   */
  private findBestMatch(profile: VeteranProfile): VeteranSpecialist {
    // Priority 1: Disabled veteran specialist for adaptive needs
    if (profile.disabledVeteran && profile.adaptiveNeeds.length > 0) {
      const specialist = this.specialists.find((s) =>
        s.specializations.includes("Disabled Veteran Services"),
      );
      if (specialist) return specialist;
    }

    // Priority 2: Combat veteran specialist for combat vets
    if (profile.combatVeteran) {
      const specialist = this.specialists.find(
        (s) =>
          s.combatVeteran &&
          s.specializations.includes("Combat Veteran Services"),
      );
      if (specialist) return specialist;
    }

    // Priority 3: Match by service branch
    const specialist = this.specialists.find(
      (s) => s.branch === profile.serviceBranch,
    );
    if (specialist) return specialist;

    // Default: First specialist
    const firstSpecialist = this.specialists[0];
    if (!firstSpecialist) {
      throw new Error("No specialists available");
    }
    return firstSpecialist;
  }

  /**
   * Find backup specialist
   */
  private findBackupSpecialist(
    primary: VeteranSpecialist,
  ): VeteranSpecialist | undefined {
    return this.specialists.find(
      (s) =>
        s.id !== primary.id &&
        s.specializations.some((spec) =>
          primary.specializations.includes(spec),
        ),
    );
  }

  /**
   * Create general assignment for non-veterans
   */
  private createGeneralAssignment(
    _profile: VeteranProfile,
  ): SpecialistAssignment {
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
        phone: "(509) 308-6489",
        email: "office@mhc-gc.com",
        preferredMethod: "phone",
      },
      specializations: ["General Construction"],
      availability: this.generateStandardAvailability(),
    };
  }

  /**
   * Create contact information
   */
  private createContactInfo(
    specialist: VeteranSpecialist,
    profile: VeteranProfile,
  ): ContactInfo {
    const emergencyContact =
      profile.priorityLevel === "IMMEDIATE"
        ? this.generateEmergencyContact()
        : "";

    return {
      phone: this.generatePhoneNumber(),
      email: this.generateEmail(specialist.name),
      directLine: this.generateDirectLine(),
      emergencyContact: emergencyContact,
      preferredMethod: (profile.preferredContactMethod ||
        "phone") as ContactInfo["preferredMethod"],
    };
  }

  /**
   * Generate phone number
   */
  private generatePhoneNumber(): string {
    return "(509) 308-6489";
  }

  /**
   * Generate email
   */
  private generateEmail(_name: string): string {
    return "office@mhc-gc.com";
  }

  /**
   * Generate direct line
   */
  private generateDirectLine(): string {
    return "(509) 308-6489 ext. 100";
  }

  /**
   * Generate emergency contact
   */
  private generateEmergencyContact(): string {
    return "(509) 308-6489";
  }

  /**
   * Generate standard availability
   */
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

  /**
   * Generate specialist availability based on priority
   */
  private generateSpecialistAvailability(
    priority: VeteranPriority,
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

      const firstAvailability = baseAvailability[0];
      if (firstAvailability) {
        firstAvailability.emergencyAvailable = true;
      }
    }

    return baseAvailability;
  }
}
