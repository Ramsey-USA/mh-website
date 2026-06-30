/**
 * Projects Page Data & Configuration
 * Static data and configuration for the projects page
 */

// Category definitions
export const categories = [
  { id: "all", label: "All Projects", icon: "grid_view" },
  { id: "commercial", label: "Commercial", icon: "business" },
  { id: "industrial", label: "Industrial", icon: "factory" },
  { id: "renovation", label: "Renovations", icon: "construction" },
];

// Project statistics - Updated with 6 Differences Key Metrics
export const projectStats = [
  {
    icon: "health_and_safety",
    value: 0.64,
    suffix: " EMR",
    decimals: 2,
    label: "Award-Winning Safety",
    animated: true,
  },
  {
    icon: "workspace_premium",
    value: 150,
    suffix: "+",
    label: "Years Combined Experience",
    animated: true,
  },
  {
    icon: "military_tech",
    value: 650,
    suffix: "+",
    label: "Successful Projects",
    animated: true,
  },
  {
    icon: "verified",
    value: 3,
    label: "States Licensed",
    animated: false,
  },
];

// Service capabilities
export const capabilities = [
  {
    icon: "church",
    title: "Religious Facilities",
    description:
      "We deliver churches, chapels, and community facilities with respectful planning, clear budgets, and practical execution for long-term use.",
  },
  {
    icon: "store",
    title: "Commercial Buildings",
    description:
      "We build and renovate offices, retail spaces, and civic facilities with durable materials, clear scope controls, and schedule discipline.",
  },
  {
    icon: "medical_services",
    title: "Medical Facilities",
    description:
      "We deliver clinics and healthcare spaces with compliance-ready planning, careful sequencing, and operational continuity.",
  },
  {
    icon: "wine_bar",
    title: "Wineries & Vineyards",
    description:
      "We deliver winery and vineyard facilities with production-first layouts, specialty coordination, and AG-focused execution controls.",
  },
  {
    icon: "precision_manufacturing",
    title: "Light Industrial Construction",
    description:
      "We deliver warehouses, processing plants, and light industrial facilities with safety-first controls and code-ready turnover.",
  },
  {
    icon: "domain",
    title: "Tenant Improvements",
    description:
      "We complete commercial TI scopes with phased execution, door and hardware coordination, and minimal disruption to active operations.",
  },
];

export type Category = (typeof categories)[number];
export type ProjectStat = (typeof projectStats)[number];
export type Capability = (typeof capabilities)[number];

// Why Choose MH reasons
export const whyChooseReasons = [
  {
    iconName: "health_and_safety",
    title: ".64 EMR - Award-Winning Safety",
    description:
      "AGC-WA recognized safety with a .64 EMR, about 40% better than industry baseline, supported by documented field controls and accountability.",
  },
  {
    iconName: "workspace_premium",
    title: "150+ Years of 'Combined' Experience",
    description:
      "Our team brings broad field and management experience across commercial, industrial, healthcare, and specialty facilities in the Pacific Northwest.",
  },
  {
    iconName: "fact_check",
    title: "Transparent Honesty",
    description:
      "Open-book pricing and direct updates keep scope, cost, and decisions visible throughout delivery.",
  },
  {
    iconName: "diversity_3",
    title: "Partnership-Driven Trust",
    description:
      "We build long-term partnerships through consistent delivery, direct accountability, and ongoing support after closeout.",
  },
  {
    iconName: "military_tech",
    title: "650+ Successful Projects - Reliability",
    description:
      "650+ completed projects reflect structured execution, calm planning under pressure, and reliable follow-through from kickoff to closeout.",
  },
  {
    iconName: "verified",
    title: "3 State - Licensed & Insured",
    description:
      "Fully licensed and insured across Washington, Oregon, and Idaho with continuously maintained compliance credentials.",
  },
];

// Partnership process steps
export const partnershipProcess = [
  {
    step: 1,
    title: "Pre-Construction Planning",
    description:
      "Align scope, site requirements, and schedule targets early to prevent late-stage changes and scope gaps.",
    icon: "gps_fixed",
  },
  {
    step: 2,
    title: "Budget Transparency",
    description:
      "Use open-book pricing with clear breakdowns so costs and decisions stay visible throughout execution.",
    icon: "calculate",
  },
  {
    step: 3,
    title: "Proactive Communication",
    description:
      "Maintain regular updates, field documentation, and immediate escalation when schedule, scope, or risk conditions change.",
    icon: "campaign",
  },
  {
    step: 4,
    title: "Quality Execution",
    description:
      "Run disciplined field execution with phase checkpoints to protect quality, safety, and long-term durability.",
    icon: "task_alt",
  },
  {
    step: 5,
    title: "Seamless Close-Out",
    description:
      "Complete turnover with clean closeout documentation, then stay available for post-closeout support and follow-up.",
    icon: "diversity_3",
  },
];

export type WhyChooseReason = (typeof whyChooseReasons)[number];
export type PartnershipStep = (typeof partnershipProcess)[number];
