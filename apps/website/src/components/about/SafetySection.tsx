/**
 * Safety & Compliance Section Component
 * Displays MH Construction's safety culture using AlternatingShowcase format
 * Mimics homepage core values alternating image/text layout
 */

import {
  AlternatingShowcase,
  type AlternatingShowcaseItem,
} from "@/components/ui/AlternatingShowcase";

const safetyFeatures: AlternatingShowcaseItem[] = [
  {
    id: "safety-culture",
    title: "Zero-Incident Culture",
    icon: "shield",
    tagline: "Safety First, Always",
    description:
      "Every team member has stop-work authority. Safety is never compromised for schedule or budget. Comprehensive daily briefings, hazard analysis on all sites, and continuous safety training create a culture where incidents are prevented, not managed. Our OSHA VPP Star designation represents the highest level of workplace safety achievement—earned through unwavering commitment to bringing everyone home safely.",
    image: "/images/safety/safety-culture.webp",
    iconBg: "bg-brand-primary",
    stats: "OSHA VPP Star Certified",
    statsLabel: "Elite Safety Recognition",
  },
  {
    id: "emr-record",
    title: "Award-Winning EMR",
    icon: "workspace_premium",
    tagline: "40% Better Than Industry",
    description:
      "Multiple consecutive AGC-WA Top EMR Awards with .64 EMR—40% better than industry average of 1.0. This exceptional safety record directly translates to lower workers' compensation rates, project insurance savings, and most importantly: safer jobsites. Numbers don't lie—our safety performance demonstrates consistent excellence year after year, backed by verifiable metrics and third-party recognition.",
    image: "/images/safety/emr-awards.webp",
    iconBg: "bg-brand-secondary",
    stats: ".64 EMR Rating",
    statsLabel: "Industry-Leading Performance",
  },
  {
    id: "compliance",
    title: "Regulatory Excellence",
    icon: "verified",
    tagline: "100% Compliant Operations",
    description:
      "Full compliance with OSHA, L&I, EPA, and all regulatory requirements. Comprehensive documentation, regular audits, and systematic compliance verification ensure we meet—and exceed—every standard. Prevailing wage compliance, certified payroll processes, and complete regulatory adherence provide peace of mind on public sector projects. Our commitment to compliance protects your project from violations, fines, and work stoppages.",
    image: "/images/safety/compliance.webp",
    iconBg: "bg-brand-primary-dark",
    stats: "100% Compliant",
    statsLabel: "All Regulatory Standards",
  },
  {
    id: "quality-assurance",
    title: "Quality Control Systems",
    icon: "task_alt",
    tagline: "Proven Quality Standards",
    description:
      "Multi-point inspection processes at every construction phase ensure first-time-right execution. Detailed quality checklists built around disciplined execution, material verification and testing, third-party inspections for critical systems, and comprehensive photo documentation. Our systematic approach to quality prevents costly rework, maintains project schedules, and delivers construction that stands the test of time.",
    image: "/images/safety/quality-control.webp",
    iconBg: "bg-bronze-700",
    stats: "Multi-Point Inspections",
    statsLabel: "Every Construction Phase",
  },
];

export function SafetySection() {
  return (
    <AlternatingShowcase
      items={safetyFeatures}
      title="Zero-Incident Commitment"
      subtitle="Mission-First Safety Culture"
      icon="shield"
      description={
        <>
          Safety is never compromised at MH Construction. Our{" "}
          <span className="font-bold text-brand-primary dark:text-brand-primary-light">
            award-winning comprehensive safety programs
          </span>{" "}
          and regulatory compliance ensure every construction operation meets
          the highest standards. With multiple{" "}
          <span className="font-bold text-brand-secondary dark:text-brand-secondary-light">
            AGC-WA Top EMR Awards
          </span>{" "}
          and a .64 EMR (40% better than industry average), we demonstrate
          unwavering commitment to{" "}
          <span className="font-bold text-brand-primary dark:text-brand-primary-light">
            zero-incident mission culture
          </span>{" "}
          with military-grade safety discipline.
        </>
      }
      sectionId="safety"
      iconVariant="primary"
    />
  );
}
