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

// Project statistics - Updated with award-winning metrics
export const projectStats = [
  {
    icon: "check_circle",
    value: 50,
    suffix: "+",
    label: "Partnership Projects",
    animated: true,
  },
  {
    icon: "emoji_events",
    value: 0.6,
    suffix: " EMR",
    decimals: 1,
    label: "Award-Winning Safety",
    animated: true,
  },
  {
    icon: "calendar_today",
    value: 2010,
    label: "Building Since",
    animated: false,
  },
  {
    icon: "handshake",
    value: 70,
    suffix: "%",
    label: "Referral & Repeat Business",
    animated: true,
  },
];

// Service capabilities - Enhanced with detailed descriptions
export const capabilities = [
  {
    icon: "church",
    title: "Religious Facilities",
    description:
      "Partnering with congregations to create churches, chapels, and community centers with thoughtful design, careful budgeting, and deep respect for the community they serve. We understand that these sacred spaces require reverence and attention—managing every detail to ensure your facility serves your congregation for generations to come.",
  },
  {
    icon: "business",
    title: "Commercial Buildings",
    description:
      "Collaborating on office buildings, retail centers, and government facilities that strengthen community infrastructure. From boutique shops to large automotive dealerships, we construct spaces where your business can thrive using top-grade materials and partnering with the best architects in the Pacific Northwest.",
  },
  {
    icon: "local_hospital",
    title: "Medical Facilities",
    description:
      "Working with healthcare providers to build medical centers, clinics, and healthcare facilities with specialized compliance expertise. We understand the critical nature of healthcare construction, precision planning for healthcare environments, and the importance of creating spaces that support community wellness.",
  },
  {
    icon: "wine_bar",
    title: "Wineries & Vineyards",
    description:
      "Partnering with vintners to create specialized processing facilities, tasting rooms, and production spaces that celebrate Pacific Northwest wine heritage. With expert craftsmanship and agricultural facility knowledge, we build structures that honor the winemaking tradition while supporting modern production needs.",
  },
  {
    icon: "factory",
    title: "Light Industrial Construction",
    description:
      "Collaborating on warehouses, processing plants, and manufacturing facilities that support regional economic growth. With 13+ years of proven experience, we create safe, functional, and code-compliant buildings built to your precise specifications with durability, accessibility, and reliability as top priorities.",
  },
  {
    icon: "store",
    title: "Tenant Improvements",
    description:
      "Working with businesses to transform commercial spaces through professional renovation and build-out services. With decades of experience helping property owners across WA, OR, and ID, we create functional, modern workspaces quickly and efficiently with expert craftsmanship and minimal disruption to your operations.",
  },
];

export type Category = (typeof categories)[number];
export type ProjectStat = (typeof projectStats)[number];
export type Capability = (typeof capabilities)[number];

// Why Choose MH reasons - Enhanced with award-winning achievements
export const whyChooseReasons = [
  {
    iconName: "workspace_premium",
    title: "150+ Years Combined Team Experience",
    description:
      "Our team brings deep expertise across all construction disciplines—from foundation to finish. This experience has been refined through decades of successful projects across commercial, industrial, medical, and specialty facilities throughout the Pacific Northwest. We leverage proven methods refined through generations of construction excellence.",
  },
  {
    iconName: "military_tech",
    title: "Veteran-Owned Excellence Since January 2025",
    description:
      "Veteran-owned under Army veteran leadership. We apply military precision, discipline, and unwavering attention to detail to every construction project, ensuring reliable execution and mission-focused results. Our veteran-fueled reliability means staying calm and precise under pressure—delivering results when it matters most.",
  },
  {
    iconName: "emoji_events",
    title: "Award-Winning Safety Record",
    description:
      "Multiple AGC-WA Top EMR Awards (2019-2021, 2025 Most Improved). Our Experience Modification Rate of .6 is 40% better than industry average, demonstrating our unwavering commitment to worker safety and zero-incident workplace culture. Over 3 consecutive years without time-loss injuries and OSHA VPP Star designation.",
  },
  {
    iconName: "handshake",
    title: "Trust Built, Project by Project",
    description:
      "We're not just contractors—we're community partners invested in the long-term success of the Pacific Northwest region. Excellence through experience—we build lasting partnerships that extend well beyond project completion. Building for the Client, NOT the Dollar is more than a slogan—it's our proven commitment to you.",
  },
  {
    iconName: "verified",
    title: "Licensed & Insured Across Three States",
    description:
      "Fully licensed for commercial construction across Washington, Oregon, and Idaho with comprehensive insurance coverage for your complete protection. Our multi-state licensing demonstrates our commitment to professional standards and our ability to serve Client Partners throughout the entire Pacific Northwest region.",
  },
  {
    iconName: "high_quality",
    title: "Craftsmanship that Lasts",
    description:
      "Quality control processes at every project phase ensure work consistently meets our high standards and your expectations. We don't cut corners—we build it right the first time with materials that last. Pride in workmanship drives everything we do, building structures that serve communities for generations with unwavering attention to detail.",
  },
];

// Partnership process steps - Enhanced with detailed descriptions
export const partnershipProcess = [
  {
    step: 1,
    title: "Pre-Construction Planning",
    description:
      "Comprehensive planning to understand your vision, site requirements, and project goals. We work WITH you to establish clear objectives and realistic timelines from day one. Master planning prevents last-minute changes and ensures zero gaps in scope coverage.",
    icon: "chat",
  },
  {
    step: 2,
    title: "Budget Transparency",
    description:
      "Detailed, open-book pricing with no surprises or hidden costs. Honest assessments and complete cost breakdowns mean you're never left wondering about project finances. You control it, we manage it—full visibility into every decision.",
    icon: "calculate",
  },
  {
    step: 3,
    title: "Proactive Communication",
    description:
      "Regular updates with photo documentation and immediate notification of any project changes or delays. Transparent communication keeps you informed every step of the way. Multiple communication channels ensure you always know your project status.",
    icon: "forum",
  },
  {
    step: 4,
    title: "Quality Execution",
    description:
      "Military precision combined with experienced craftsmen ensures exceptional workmanship. Quality control checkpoints at every phase deliver structures built to last for generations. We use proven methods refined over decades and select materials based on longevity.",
    icon: "verified",
  },
  {
    step: 5,
    title: "Seamless Close-Out",
    description:
      "Comprehensive completion with ongoing support and availability for questions long after final payment. We're your partners beyond project completion. Following up to ensure satisfaction and being available creates lasting relationships built on proven excellence and decades of trust.",
    icon: "handshake",
  },
];

export type WhyChooseReason = (typeof whyChooseReasons)[number];
export type PartnershipStep = (typeof partnershipProcess)[number];
