/**
 * Projects Page Data & Configuration
 * Static data and configuration for the projects page
 */

import { CONTENT_ICONS } from "@/lib/constants/navigation-icons";
import { PortfolioService } from "@/lib/services/portfolio-service";

const PROJECT_CATEGORY_META = {
  commercial: {
    label: "Commercial",
    icon: CONTENT_ICONS.business,
  },
  industrial: {
    label: "Industrial",
    icon: CONTENT_ICONS.factory,
  },
  renovation: {
    label: "Renovations",
    icon: CONTENT_ICONS.construction,
  },
  custom: {
    label: "Custom Builds",
    icon: CONTENT_ICONS.foundation,
  },
} as const;

// Category definitions
export const categories = [
  { id: "all", label: "All Projects", icon: CONTENT_ICONS.grid_view },
  ...PortfolioService.getProjectCategoryIds().map((categoryId) => ({
    id: categoryId,
    label: PROJECT_CATEGORY_META[categoryId].label,
    icon: PROJECT_CATEGORY_META[categoryId].icon,
  })),
];

// Project statistics - Updated with 6 Differences Key Metrics
export const projectStats = [
  {
    icon: CONTENT_ICONS.health_and_safety,
    value: 0.64,
    suffix: " EMR",
    decimals: 2,
    label: "Award-Winning Safety",
    animated: true,
  },
  {
    icon: CONTENT_ICONS.workspace_premium,
    value: 150,
    suffix: "+",
    label: "Years Combined Experience",
    animated: true,
  },
  {
    icon: CONTENT_ICONS.military_tech,
    value: 650,
    suffix: "+",
    label: "Successful Projects",
    animated: true,
  },
  {
    icon: CONTENT_ICONS.verified,
    value: 3,
    label: "States Licensed",
    animated: false,
  },
];

// Service capabilities
export const capabilities = [
  {
    icon: CONTENT_ICONS.church,
    title: "Religious Facilities",
    description:
      "We deliver churches, chapels, and community facilities with respectful planning, clear budgets, and practical execution for long-term use.",
  },
  {
    icon: CONTENT_ICONS.store,
    title: "Commercial Buildings",
    description:
      "We build and renovate offices, retail spaces, and civic facilities with durable materials, clear scope controls, and schedule discipline.",
  },
  {
    icon: CONTENT_ICONS.medical_services,
    title: "Medical Facilities",
    description:
      "We deliver clinics and healthcare spaces with compliance-ready planning, careful sequencing, and operational continuity.",
  },
  {
    icon: CONTENT_ICONS.wine_bar,
    title: "Wineries & Vineyards",
    description:
      "We deliver winery and vineyard facilities with production-first layouts, specialty coordination, and AG-focused execution controls.",
  },
  {
    icon: CONTENT_ICONS.precision_manufacturing,
    title: "Light Industrial Construction",
    description:
      "We deliver warehouses, processing plants, and light industrial facilities with safety-first controls and code-ready turnover.",
  },
  {
    icon: CONTENT_ICONS.domain,
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
    iconName: CONTENT_ICONS.health_and_safety,
    title: ".64 EMR - Award-Winning Safety",
    description:
      "AGC-WA recognized safety with a .64 EMR, about 40% better than industry baseline, supported by documented field controls and accountability.",
  },
  {
    iconName: CONTENT_ICONS.workspace_premium,
    title: "150+ Years of 'Combined' Experience",
    description:
      "Our team brings broad field and management experience across commercial, industrial, healthcare, and specialty facilities in the Pacific Northwest.",
  },
  {
    iconName: CONTENT_ICONS.fact_check,
    title: "Transparent Honesty",
    description:
      "Open-book pricing and direct updates keep scope, cost, and decisions visible throughout delivery.",
  },
  {
    iconName: CONTENT_ICONS.diversity_3,
    title: "Partnership-Driven Trust",
    description:
      "We build long-term partnerships through consistent delivery, direct accountability, and ongoing support after handoff.",
  },
  {
    iconName: CONTENT_ICONS.military_tech,
    title: "650+ Successful Projects - Reliability",
    description:
      "650+ completed projects reflect structured execution, calm planning under pressure, and reliable follow-through from kickoff to handoff.",
  },
  {
    iconName: CONTENT_ICONS.verified,
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
    icon: CONTENT_ICONS.gps_fixed,
  },
  {
    step: 2,
    title: "Budget Transparency",
    description:
      "Use open-book pricing with clear breakdowns so costs and decisions stay visible throughout execution.",
    icon: CONTENT_ICONS.calculate,
  },
  {
    step: 3,
    title: "Proactive Communication",
    description:
      "Maintain regular updates, field documentation, and immediate escalation when schedule, scope, or risk conditions change.",
    icon: CONTENT_ICONS.campaign,
  },
  {
    step: 4,
    title: "Quality Execution",
    description:
      "Run disciplined field execution with phase checkpoints to protect quality, safety, and long-term durability.",
    icon: CONTENT_ICONS.task_alt,
  },
  {
    step: 5,
    title: "Seamless Close-Out",
    description:
      "Complete turnover with clean handoff documentation, then stay available for post-handoff support and follow-up.",
    icon: CONTENT_ICONS.diversity_3,
  },
];

export type WhyChooseReason = (typeof whyChooseReasons)[number];
export type PartnershipStep = (typeof partnershipProcess)[number];
