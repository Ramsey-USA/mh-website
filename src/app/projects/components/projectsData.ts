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
      "Partnering with congregations to create churches, chapels, and community centers with thoughtful design, careful budgeting, and deep respect for the community they serve. We manage every detail with reverence for sacred spaces.",
  },
  {
    icon: "business",
    title: "Commercial Buildings",
    description:
      "Collaborating on office buildings, retail centers, and government facilities that strengthen community infrastructure. From boutique shops to large dealerships, we construct spaces where your business can thrive.",
  },
  {
    icon: "local_hospital",
    title: "Medical Facilities",
    description:
      "Working with healthcare providers to build medical centers, clinics, and healthcare facilities with specialized compliance expertise. We understand the critical nature of healthcare construction and community wellness.",
  },
  {
    icon: "wine_bar",
    title: "Wineries & Vineyards",
    description:
      "Partnering with vintners to create specialized processing facilities, tasting rooms, and production spaces that celebrate Pacific Northwest wine heritage with expert craftsmanship and agricultural facility knowledge.",
  },
  {
    icon: "factory",
    title: "Light Industrial Construction",
    description:
      "Collaborating on warehouses, processing plants, and manufacturing facilities that support regional economic growth. Built with durability, accessibility, and safety as top priorities for 13+ years.",
  },
  {
    icon: "store",
    title: "Tenant Improvements",
    description:
      "Working with businesses to transform commercial spaces through professional renovation and build-out services. Decades of experience helping property owners across WA, OR, and ID create functional, modern workspaces.",
  },
];

export type Category = (typeof categories)[number];
export type ProjectStat = (typeof projectStats)[number];
export type Capability = (typeof capabilities)[number];

// Why Choose MH reasons
export const whyChooseReasons = [
  {
    iconName: "workspace_premium",
    title: "150+ Years Combined Team Experience",
    description:
      "Our team brings deep expertise across all construction disciplines—from foundation to finish. This experience has been refined through decades of successful projects across commercial, industrial, medical, and specialty facilities throughout the Pacific Northwest.",
  },
  {
    iconName: "military_tech",
    title: "Veteran-Owned Excellence",
    description:
      "Veteran-owned since January 2025 under Army veteran leadership. We apply military precision, discipline, and unwavering attention to detail to every construction project, ensuring reliable execution and mission-focused results.",
  },
  {
    iconName: "handshake",
    title: "Partnership-Driven Approach",
    description:
      "We're not just contractors—we're community partners invested in the long-term success of the Pacific Northwest region. 'THE ROI IS THE RELATIONSHIP'—we build lasting partnerships that extend well beyond project completion.",
  },
  {
    iconName: "verified",
    title: "Licensed & Insured Across Three States",
    description:
      "Fully licensed for commercial construction across Washington, Oregon, and Idaho with comprehensive insurance coverage for your complete protection. Our multi-state licensing demonstrates our commitment to professional standards and regional expertise.",
  },
  {
    iconName: "high_quality",
    title: "Meticulous Quality Assurance",
    description:
      "Quality control processes at every project phase ensure work consistently meets our high standards and your expectations. We don't cut corners—we build it right the first time with materials and craftsmanship that last for generations.",
  },
  {
    iconName: "engineering",
    title: "Urgent Construction Support",
    description:
      "Specialized expertise, manpower, and equipment available for companies facing critical construction challenges. We partner with businesses to provide urgent structural consultation and repairs—fixing the source of problems, not just symptoms.",
  },
];

// Partnership process steps
export const partnershipProcess = [
  {
    step: 1,
    title: "Pre-Construction Planning",
    description:
      "Comprehensive planning to understand your vision, site requirements, and project goals. We work WITH you to establish clear objectives and timelines from day one.",
    icon: "chat",
  },
  {
    step: 2,
    title: "Budget Transparency",
    description:
      "Detailed, open-book pricing with no surprises or hidden costs. Honest assessments and complete cost breakdowns mean you're never left wondering about project finances.",
    icon: "calculate",
  },
  {
    step: 3,
    title: "Proactive Communication",
    description:
      "Regular updates with photo documentation and immediate notification of any project changes or delays. Transparent communication keeps you informed every step of the way.",
    icon: "forum",
  },
  {
    step: 4,
    title: "Quality Execution",
    description:
      "Military precision combined with experienced craftsmen ensures exceptional workmanship. Quality control checkpoints at every phase deliver structures built to last.",
    icon: "verified",
  },
  {
    step: 5,
    title: "Seamless Close-Out",
    description:
      "Comprehensive completion with ongoing support and availability for questions long after final payment. We're your partners beyond project completion.",
    icon: "handshake",
  },
];

export type WhyChooseReason = (typeof whyChooseReasons)[number];
export type PartnershipStep = (typeof partnershipProcess)[number];
