export { AboutHero } from "./AboutHero";
export { AboutValues, type CoreValue } from "./AboutValues";
export { PartnershipPhilosophy } from "./PartnershipPhilosophy";
export {
  CompanyStats,
  companyStats,
  type CompanyStatsProps,
  type StatItem,
} from "./CompanyStats";
export { LeadershipTeam, leadershipTeam } from "./LeadershipTeam";
export { SafetySection } from "./SafetySection";
export { AwardsSection } from "./AwardsSection";
import type { CoreValue } from "./AboutValues";

// Core Values Data - Heritage Storytelling (About Page)
// Uses past-tense language to emphasize proven track record and history
export const coreValues: CoreValue[] = [
  {
    iconName: "verified",
    title: "Honesty",
    subtitle: "Transparent Communication Always",
    description:
      "We built our reputation on truthful assessments and transparent pricing. We eliminated hidden costs, provided realistic timelines, and gave honest recommendations even when it meant losing a project—earning trust through candid communication.",
    practices: [
      "Discussed project challenges and potential issues upfront",
      "Immediately notified clients of any timeline or budget changes",
      "Provided honest assessments even when projects weren't the right fit",
      "Explained all costs clearly before work began—no surprises",
      "Told clients what they needed to know, not just what they wanted to hear",
    ],
  },
  {
    iconName: "balance",
    title: "Integrity",
    subtitle: "Doing What's Right, Every Time",
    description:
      "Since 2010, we chose ethical decisions over easy profits. We kept our promises, stood behind our work with comprehensive warranties, and earned a reputation where our word became our bond across 650+ projects.",
    practices: [
      "Used specified materials without unauthorized substitutions",
      "Stood behind every project with comprehensive warranties",
      "Made decisions benefiting clients, not just our bottom line",
      "Followed through on commitments even when circumstances changed",
      "Never cut corners, even when no one was watching",
    ],
  },
  {
    iconName: "business_center",
    title: "Professionalism",
    subtitle: "Excellence in Every Interaction",
    description:
      "Since 2010, we've conducted business with expert knowledge, respectful communication, and industry-leading standards. Our professional approach earned trust through organized processes, timely responses, and courteous behavior on every project.",
    practices: [
      "Arrived on time, prepared, and ready to work on every job site",
      "Maintained clear, professional communication in all interactions",
      "Managed job sites with organized, respectful work areas",
      "Treated client properties and neighbors with utmost respect",
      "Maintained industry-leading credentials, licensing, and training",
    ],
  },
  {
    iconName: "task_alt",
    title: "Thoroughness",
    subtitle: "Attention to Detail in Everything",
    description:
      "We established comprehensive planning and meticulous execution as our standard. Through detailed site analysis, precise measurements, and systematic quality control, we ensured nothing was overlooked on 650+ successful projects.",
    practices: [
      "Conducted detailed pre-construction site analysis and planning",
      "Performed precise measurements and calculations for all estimates",
      "Implemented systematic quality control at every project phase",
      "Maintained complete documentation with comprehensive photo records",
      "Completed thorough final walkthroughs with detailed punch lists",
    ],
  },
];
