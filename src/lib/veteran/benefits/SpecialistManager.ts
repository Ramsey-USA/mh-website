import type { VeteranProfile } from "@/lib/veteran/types/veteran-types";
import type {
  AvailabilityWindow,
  SpecialistAssignment,
  VeteranSpecialist,
} from "./types";

const DEFAULT_AVAILABILITY: AvailabilityWindow[] = [
  {
    day: "Monday-Friday",
    startTime: "08:00",
    endTime: "17:00",
    timezone: "PT",
    emergencyAvailable: true,
  },
];

const SPECIALISTS: VeteranSpecialist[] = [
  {
    id: "spec-vet-001",
    name: "Veteran Services Coordinator",
    title: "Veteran Benefits Specialist",
    branch: "Army",
    veteranStatus: true,
    combatVeteran: false,
    specializations: [
      "VA Benefits Coordination",
      "Accessibility Compliance",
      "Disabled Veteran Services",
    ],
    certifications: ["VA Process Familiarity", "ADA Compliance"],
    languages: ["English"],
    bio: "Coordinates veteran-first project planning and benefits alignment.",
  },
];

export class SpecialistManager {
  public assignSpecialist(profile: VeteranProfile): SpecialistAssignment {
    const assignedSpecialist = this.pickSpecialist(profile);

    return {
      assignedSpecialist,
      backupSpecialist: SPECIALISTS[0] ?? assignedSpecialist,
      contactInfo: {
        phone: "(509) 308-6489",
        email: "office@mhc-gc.com",
        preferredMethod: "phone",
      },
      specializations: assignedSpecialist.specializations,
      availability: DEFAULT_AVAILABILITY,
    };
  }

  public getSpecialist(id: string): VeteranSpecialist | undefined {
    return SPECIALISTS.find((specialist) => specialist.id === id);
  }

  public getAllSpecialists(): VeteranSpecialist[] {
    return [...SPECIALISTS];
  }

  private pickSpecialist(_profile: VeteranProfile): VeteranSpecialist {
    return SPECIALISTS[0]!;
  }
}
