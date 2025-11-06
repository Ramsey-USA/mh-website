/**
 * Projects Page Data & Configuration
 * Static data and configuration for the projects page
 */

// Category definitions
export const categories = [
  { id: "all", label: "All Projects", icon: "grid_view" },
  { id: "residential", label: "Residential", icon: "home" },
  { id: "commercial", label: "Commercial", icon: "business" },
  { id: "industrial", label: "Industrial", icon: "factory" },
  { id: "renovation", label: "Renovations", icon: "construction" },
];

// Project statistics
export const projectStats = [
  { icon: "check_circle", value: "100+", label: "Partnership Projects" },
  { icon: "star", value: "98%", label: "Partnership Satisfaction" },
  { icon: "schedule", value: "30+", label: "Years Building Together" },
  { icon: "handshake", value: "70%", label: "Partnership Referrals" },
];

// Service capabilities
export const capabilities = [
  {
    icon: "church",
    title: "Religious Facilities",
    description:
      "Partnering with congregations to create churches and community centers with thoughtful design that serves your mission",
  },
  {
    icon: "business",
    title: "Commercial Buildings",
    description:
      "Collaborating on office buildings, retail centers, and government facilities that strengthen community infrastructure",
  },
  {
    icon: "local_hospital",
    title: "Medical Facilities",
    description:
      "Working with healthcare providers to build medical centers and clinics with specialized compliance and community focus",
  },
  {
    icon: "wine_bar",
    title: "Wineries & Vineyards",
    description:
      "Partnering with vintners to create processing facilities and tasting rooms that celebrate Pacific Northwest heritage",
  },
  {
    icon: "factory",
    title: "Light Industrial",
    description:
      "Collaborating on warehouses and processing plants that support regional economic growth",
  },
  {
    icon: "store",
    title: "Tenant Improvements",
    description:
      "Working with businesses to transform commercial spaces that serve community needs",
  },
];

export type Category = (typeof categories)[number];
export type ProjectStat = (typeof projectStats)[number];
export type Capability = (typeof capabilities)[number];

// Why Choose MH reasons
export const whyChooseReasons = [
  {
    iconName: "workspace_premium",
    title: "150+ Years Combined Experience",
    description:
      "Deep expertise across all construction disciplines, refined through decades of successful partnership projects.",
  },
  {
    iconName: "military_tech",
    title: "Veteran-Owned Excellence",
    description:
      "Military precision and discipline applied to construction, ensuring attention to detail and reliable execution.",
  },
  {
    iconName: "handshake",
    title: "Community Partnership",
    description:
      "We're community partners invested in Pacific Northwest success, not just contractors.",
  },
  {
    iconName: "verified",
    title: "Licensed & Insured",
    description:
      "Fully licensed across WA, OR, and ID with comprehensive insurance coverage for your protection.",
  },
  {
    iconName: "high_quality",
    title: "Quality Assurance",
    description:
      "Meticulous quality control at every project phase, ensuring work meets our high standards.",
  },
  {
    iconName: "engineering",
    title: "Urgent Construction Support",
    description:
      "Expert construction consultation and rapid resource deployment for time-critical project needs.",
  },
];

// Partnership process steps
export const partnershipProcess = [
  {
    step: 1,
    title: "Initial Consultation",
    description: "Understanding your vision and requirements together",
    icon: "chat",
  },
  {
    step: 2,
    title: "Site Assessment",
    description: "Collaborative evaluation of location and project feasibility",
    icon: "explore",
  },
  {
    step: 3,
    title: "Master Planning",
    description:
      "Working together on detailed planning and timeline development",
    icon: "event",
  },
  {
    step: 4,
    title: "Partnership Proposal",
    description:
      "Comprehensive project proposal with transparent pricing and collaboration framework",
    icon: "description",
  },
  {
    step: 5,
    title: "Build Together",
    description:
      "Collaborative execution with regular communication and partnership approach",
    icon: "handshake",
  },
];

export type WhyChooseReason = (typeof whyChooseReasons)[number];
export type PartnershipStep = (typeof partnershipProcess)[number];
