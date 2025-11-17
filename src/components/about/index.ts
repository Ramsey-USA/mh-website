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
    iconName: "balance",
    title: "Integrity First",
    subtitle: "Founded on Ethical Excellence",
    description:
      "Since 2010, we built our reputation on ethical practices and quality workmanship. We chose integrity over profit, stood behind every project with warranties, and earned trust through 650+ successful partnerships.",
    practices: [
      "Recommended solutions that benefited clients, even when it reduced our margins",
      "Never substituted materials without approval—maintained specifications religiously",
      "Stood behind every project with ironclad warranties",
      "Treated client properties with the same care as our own homes",
      "Built a reputation where our word became our bond",
    ],
  },
  {
    iconName: "visibility",
    title: "Owner-Focused Transparency",
    subtitle: "No Surprises—Ever",
    description:
      "We established open communication and transparent pricing as our standard. We eliminated hidden costs, provided detailed breakdowns, and kept clients informed at every stage through 650+ successful projects.",
    practices: [
      "Conducted pre-construction meetings with complete cost breakdowns",
      "Provided regular updates with detailed photo documentation",
      "Maintained open-book approach to all material costs and labor",
      "Immediately notified clients of any changes or delays—no surprises",
      "Documented all agreements, changes, and decisions in writing",
    ],
  },
  {
    iconName: "handshake",
    title: "Partnership Excellence",
    subtitle: "Relationships That Outlasted Buildings",
    description:
      "We built lasting partnerships extending decades beyond projects. Our 70% referral rate proved we invested in people, not just projects—following up years later and building a community network based on proven excellence.",
    practices: [
      "Followed up months and years after completion to ensure satisfaction",
      "Remained available for questions and support long after final payments",
      "Built a referral network where 70% of business came from past clients",
      "Treated every interaction as an investment in lasting partnership",
      "Prioritized relationship value over short-term gains consistently",
    ],
  },
  {
    iconName: "military_tech",
    title: "Veteran-Fueled Reliability",
    subtitle: "Military Precision Proven on Every Project",
    description:
      "Military discipline translated directly to construction excellence. When challenges arose, we stayed calm. When conditions changed, we adapted without losing focus. This veteran-led reliability earned trust across 650+ projects.",
    practices: [
      "Applied systematic problem-solving under pressure on every project",
      "Maintained clear communication chains and decision-making processes",
      "Adapted quickly to changing conditions without compromising quality",
      "Followed through on every commitment—no obstacles stopped us",
      "Led teams with confidence earned through military service and proven results",
    ],
  },
  {
    iconName: "construction",
    title: "Craftsmanship that Lasts",
    subtitle: "Built for Generations",
    description:
      "We chose quality over speed on every project. We selected materials for longevity, applied methods refined over 150+ years of team experience, and created structures that served communities for decades.",
    practices: [
      "Used proven construction methods refined over 150+ years of experience",
      "Selected materials based on durability and longevity, not lowest cost",
      "Implemented quality control checkpoints at every project phase",
      "Built structures that served Pacific Northwest communities for generations",
      "Took pride in every detail—built as if for our own families",
    ],
  },
  {
    iconName: "precision_manufacturing",
    title: "Precision & Experience",
    subtitle: "150+ Years of Proven Expertise",
    description:
      "We brought deep technical mastery earned through decades of projects. Our 150+ years of combined experience provided expert problem-solving, detailed planning, and calm leadership even on complex projects.",
    practices: [
      "Created detailed project plans with multiple contingency scenarios",
      "Maintained precision in measurements, calculations, and material estimates",
      "Leveraged 150+ years of combined team experience on every decision",
      "Provided expert guidance that saved clients from expensive errors",
      "Stayed current with industry innovations through continuous learning",
    ],
  },
];
