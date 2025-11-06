/**
 * Veteran Benefits Types
 * Shared type definitions for the veteran benefits automation system
 */

import type { ServiceBranch } from "../VeteranProfileEngine";

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
