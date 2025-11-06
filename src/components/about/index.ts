export { AboutHero } from "./AboutHero";
export { AboutValues, type CoreValue } from "./AboutValues";
export { PartnershipPhilosophy } from "./PartnershipPhilosophy";
export { CompanyStats, companyStats } from "./CompanyStats";
export { LeadershipTeam, leadershipTeam } from "./LeadershipTeam";
import type { CoreValue } from "./AboutValues";

// Core Values Data
export const coreValues: CoreValue[] = [
  {
    iconName: "balance",
    title: "Integrity First",
    subtitle: "Doing What's Right, Every Time",
    description:
      "Ethical business practices, quality workmanship, and promise keeping. Making the right decision even when it costs us more, because our reputation is built on unwavering commitment to ethical practices.",
    practices: [
      "Recommending solutions that benefit you, not just our profit margin",
      "Using specified materials and methods, never substituting without approval",
      "Standing behind our work with comprehensive warranties",
      "Treating your property with the same care we'd want for our own",
    ],
  },
  {
    iconName: "visibility",
    title: "Owner-Focused Transparency",
    subtitle: "No Surprises",
    description:
      "Open communication, detailed breakdowns, and honest assessments mean you're never left wondering what's happening with your project.",
    practices: [
      "Pre-construction meetings with complete cost breakdowns",
      "Regular project updates with photo documentation",
      "Open-book approach to material costs and labor",
      "Immediate notification of any project changes or delays",
    ],
  },
  {
    iconName: "handshake",
    title: "Relationship ROI",
    subtitle: "We Build Trust, Not Just Structures",
    description:
      "THE ROI IS THE RELATIONSHIP - investing in long-term partnerships that last well beyond project completion. We build trust, not just structures.",
    practices: [
      "Following up after project completion to ensure satisfaction",
      "Being available for questions and support long after final payment",
      "Building referral networks based on mutual trust",
      "Treating every interaction as an investment in long-term partnership",
    ],
  },
  {
    iconName: "military_tech",
    title: "Veteran-Fueled Reliability",
    subtitle: "Calm and Precise Under Pressure",
    description:
      "Military-trained discipline meets construction expertise to deliver reliable results no matter the challenges. Staying calm when challenges arise.",
    practices: [
      "Systematic approach to problem-solving under pressure",
      "Clear communication chains and decision-making processes",
      "Adapting quickly to changing conditions without losing focus",
      "Following through on commitments no matter the obstacles",
    ],
  },
  {
    iconName: "construction",
    title: "Craftsmanship that Lasts",
    subtitle: "Built for the Long Run",
    description:
      "Quality over speed, attention to every detail, selecting materials that stand the test of time. Building structures that serve communities for generations.",
    practices: [
      "Using proven construction methods refined over decades",
      "Selecting materials based on longevity, not just cost",
      "Quality control checkpoints at every project phase",
      "Building structures that serve communities for generations",
    ],
  },
  {
    iconName: "precision_manufacturing",
    title: "Precision & Experience",
    subtitle: "150+ Years Combined Team Expertise",
    description:
      "Deep knowledge across all construction disciplines with time-tested approaches refined through decades of experience. Expert guidance that helps you avoid costly mistakes.",
    practices: [
      "Detailed project planning with multiple contingency scenarios",
      "Precise measurements, calculations, and material estimates",
      "Leveraging 150+ years of combined team experience",
      "Expert guidance that helps you avoid costly mistakes",
    ],
  },
];
