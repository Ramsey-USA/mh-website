export { AboutHero } from "./AboutHero";
export { AboutValues, type CoreValue } from "./AboutValues";
export { PartnershipPhilosophy } from "./PartnershipPhilosophy";
export { CompanyStats, companyStats } from "./CompanyStats";
export { LeadershipTeam, leadershipTeam } from "./LeadershipTeam";
export { SafetySection } from "./SafetySection";
export { AwardsSection } from "./AwardsSection";
import type { CoreValue } from "./AboutValues";

// Core Values Data - 6-Value Professional Foundation System
export const coreValues: CoreValue[] = [
  {
    iconName: "balance",
    title: "Integrity First",
    subtitle: "Doing What's Right, Every Time",
    description:
      "Ethical business practices, quality workmanship, and promise keeping define everything we do. Making the right decision even when it costs us more, because our reputation is built on unwavering commitment to ethical practices. We never cut corners—even when no one is watching—and we stand behind our work with comprehensive warranties.",
    practices: [
      "Recommending solutions that benefit you, not just our profit margin",
      "Using specified materials and methods, never substituting without approval",
      "Standing behind our work with comprehensive warranties",
      "Treating your property with the same care we'd want for our own",
      "Making the right decision even when it costs us more",
    ],
  },
  {
    iconName: "visibility",
    title: "Owner-Focused Transparency",
    subtitle: "No Surprises",
    description:
      "Open communication, transparent pricing, and honest assessments mean you're never left wondering what's happening with your project. No hidden costs, surprise changes, or unclear timelines. You control it, we manage it—full visibility into every decision with detailed breakdowns of every cost component.",
    practices: [
      "Pre-construction meetings with complete cost breakdowns",
      "Regular project updates with photo documentation",
      "Open-book approach to material costs and labor",
      "Immediate notification of any project changes or delays",
      "All agreements, changes, and decisions in writing",
    ],
  },
  {
    iconName: "handshake",
    title: "Relationship ROI",
    subtitle: "We Build Trust, Not Just Structures",
    description:
      "THE ROI IS THE RELATIONSHIP - investing in long-term partnerships that last well beyond project completion. We measure success by relationships built, not just profit margins. Your success is our return on investment. Treating every interaction as an investment in lasting community partnerships.",
    practices: [
      "Following up after project completion to ensure satisfaction",
      "Being available for questions and support long after final payment",
      "Building referral networks based on mutual trust",
      "Treating every interaction as an investment in long-term partnership",
      "Prioritizing relationship value over short-term gains",
    ],
  },
  {
    iconName: "military_tech",
    title: "Veteran-Fueled Reliability",
    subtitle: "Calm and Precise Under Pressure",
    description:
      "Military-trained discipline and attention to detail honed through service meet construction expertise to deliver reliable results no matter the challenges. Staying unshakably calm when challenges arise, with clear objectives and disciplined execution. Following through on commitments no matter the obstacles.",
    practices: [
      "Systematic approach to problem-solving under pressure",
      "Clear communication chains and decision-making processes",
      "Adapting quickly to changing conditions without losing focus",
      "Following through on commitments no matter the obstacles",
      "Leading with confidence earned through military experience",
    ],
  },
  {
    iconName: "construction",
    title: "Craftsmanship that Lasts",
    subtitle: "Built for the Long Run",
    description:
      "Quality over speed, meticulous attention to every detail, and selecting durable materials that stand the test of time. Taking time to do it right with pride in workmanship—building as if it's for our own families. Creating structures that serve communities for generations with proven construction methods.",
    practices: [
      "Using proven construction methods refined over decades",
      "Selecting materials based on longevity, not just cost",
      "Quality control checkpoints at every project phase",
      "Building structures that serve communities for generations",
      "Taking pride in work—building as if for our own families",
    ],
  },
  {
    iconName: "precision_manufacturing",
    title: "Precision & Experience",
    subtitle: "150+ Years Combined Team Expertise",
    description:
      "Deep technical mastery across all construction disciplines with time-tested approaches refined through decades of successful projects. Leveraging 150+ years of combined team experience to provide expert problem-solving and guidance. Bringing calm, experienced leadership to even the most complex projects.",
    practices: [
      "Detailed project planning with multiple contingency scenarios",
      "Precise measurements, calculations, and material estimates",
      "Leveraging 150+ years of combined team experience",
      "Expert guidance that helps you avoid costly mistakes",
      "Continuous learning—staying current with industry innovations",
    ],
  },
];
