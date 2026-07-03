// Services Page Data
// Extracted from src/app/services/page.tsx for better maintainability

export interface CoreService {
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: string[];
  ctaText?: string;
  ctaLink?: string;
  ctaLinkText?: string;
}

export interface SpecialtyService {
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  markets?: string[];
  capabilities?: string[];
  buildTypes?: string[];
  features?: string[];
  note?: string;
  ctaText?: string;
}

export interface ServiceArea {
  iconName: string;
  title: string;
  areas: string[];
  links?: (string | null)[];
}

export interface WhyChooseUsItem {
  iconName: string;
  title: string;
  description: string;
  ctaLink?: string;
  ctaLinkText?: string;
}

// Core Services Data
export const coreServices: CoreService[] = [
  {
    iconName: "engineering",
    title: "Commercial Construction Management",
    subtitle: "Project Management Leadership Powered by Procore",
    description:
      "We manage agricultural and winery projects, commercial tenant improvements, and municipal builds with Procore-led controls, clear accountability, and disciplined field execution across Washington, Oregon, and Idaho.",
    features: [
      "Procore project controls and documentation",
      "RFI, submittal, and change workflows",
      "Retail and office facilities",
      "Medical and healthcare facilities",
      "Industrial and manufacturing facilities",
      "Church and religious facilities",
      "Winery, vineyard, and agricultural facilities",
      "Municipal and public buildings",
      "Commercial tenant improvements and occupied renovations",
      "Door and hardware packages",
      "Pole building and post-frame scopes",
      "Schools and training facilities",
    ],
    benefits: [
      "One source of truth through Procore for team and Client Partner visibility",
      "Clear communication and documented decisions",
      "Reduced rework through upfront planning",
      "Disciplined execution across commercial sectors",
      "Direct accountability from kickoff through closeout",
    ],
    ctaText:
      "Ready to start? Call (509) 308-6489 or schedule a consultation to review scope, schedule, and delivery strategy.",
  },
  {
    iconName: "gps_fixed",
    title: "Master Planning (Pre-Construction)",
    subtitle: "Unlock Your Building's Potential with Comprehensive Planning",
    description:
      'We lock scope architecture, budget logic, permitting strategy, and trade sequence before mobilization. "Creating Value, from Proven Results." reflects this front-end discipline and helps prevent scope drift, change pressure, and avoidable delays.',
    features: [
      "Site and infrastructure analysis",
      "Washington, Oregon, and Idaho code compliance planning",
      "Budget constraints and cost controls",
      "Schedule and sequencing planning",
      "Client Partner design intent integration",
      "Feasibility and risk analysis",
      "Multi-scenario budgeting when needed",
    ],
    benefits: [
      "Clear scope ownership before procurement",
      "Fewer late-stage changes",
      "Realistic schedule and budget expectations",
      "Early risk identification and mitigation",
      "Documented planning decisions for team alignment",
    ],
  },
  {
    iconName: "local_shipping",
    title: "Procurement & Trade Partnership Management",
    subtitle:
      "Reliable Material Sourcing & Professional Trade Partner Coordination",
    description:
      "We handle material sourcing, long-lead tracking, and trade partner coordination so scopes arrive on time and install in sequence. Planning and procurement stay aligned with field reality.",
    features: [
      "Material sourcing and vetting",
      "Supplier coordination and communication",
      "Budget negotiation and pricing support",
      "Purchase orders and documentation",
      "Trade contract coordination",
      "Delivery scheduling and logistics",
      "Approved trade partner management",
      "Long-lead item planning",
    ],
    benefits: [
      "Earlier visibility on long-lead risk",
      "Tighter material and schedule coordination",
      "Reduced Client Partner burden for trade management",
      "Consistent quality through vetted partners",
      "Better field readiness at install milestones",
    ],
    ctaLink: "/allies",
    ctaLinkText: "Join Our Trade Partnership Network",
  },
  {
    iconName: "assessment",
    title: "Constructability & Budget Control",
    subtitle: "Proactive Feasibility Review & Strategic Cost Optimization",
    description:
      "We test constructability early, pressure-check budgets with trade input, and build a realistic execution plan. The result is fewer surprises and cleaner cost control during delivery.",
    features: [
      "Construction sequence optimization",
      "Specialty item logistics planning",
      "Parts timing and cost controls",
      "Early trade collaboration for estimating",
      "Risk and contingency planning",
      "Value engineering identification",
      "Proactive budget controls",
    ],
    benefits: [
      "Trade-informed pricing and sequencing",
      "Fewer constructability conflicts in the field",
      "Stronger budget adherence",
      "Earlier decision confidence for Client Partners and teams",
      "Improved schedule predictability",
    ],
  },
  {
    iconName: "grid_view",
    title: "Modularization & Subproject Management",
    subtitle: "Advanced Project Division for Complex Builds",
    description:
      "For complex programs, we divide work into controlled subprojects with phase-specific ownership. This keeps handoffs cleaner, resources focused, and schedules more stable.",
    features: [
      "Strategic subproject structuring",
      "Cleaner phase transitions",
      "Resource and communication efficiency",
      "Phase-specific technical oversight",
      "Focused execution by scope",
      "Schedule stability on complex projects",
      "Multi-specialist delivery model",
    ],
    benefits: [
      "Clear accountability by phase",
      "More efficient resource allocation",
      "Reduced transition risk between scopes",
      "Improved quality control by stage",
      "Stronger schedule performance on complex work",
    ],
  },
];

// Specialty Services & Markets
export const specialtyServices: SpecialtyService[] = [
  {
    iconName: "store",
    title: "Markets We Serve",
    subtitle: "Diverse Business Solutions Across Washington, Oregon, and Idaho",
    description:
      "We focus on agricultural and winery communities, commercial tenant improvements, and municipal organizations across the region. Specialty scopes include pole buildings, door and hardware installation, and winery pond liner delivery for wastewater and sludge control.",
    markets: [
      "Religious and community facilities",
      "Retail and office commercial buildings",
      "Municipal and grant-funded projects",
      "Schools and training facilities",
      "Medical and healthcare facilities",
      "Wineries, vineyards, and specialty agriculture",
      "Agricultural operations and support facilities",
      "Pole buildings and post-frame structures",
      "Door and Hardware Installation",
      "Winery pond liner installation",
      "Industrial and manufacturing facilities",
    ],
  },
  {
    iconName: "domain",
    title: "Tenant Improvements",
    subtitle: "Transform Your Commercial Space Across the Tri-State Region",
    description:
      "We deliver tenant improvement scopes from full build-outs to focused renovations, including door and hardware packages for occupied facilities. Procore workflows keep RFIs, submittals, and schedule impacts visible.",
    capabilities: [
      "Complete build-out and renovation delivery",
      "Licensed across Washington, Oregon, and Idaho",
      "Fast-turn sequencing for operations",
      "Field guidance from planning to closeout",
      "Door and hardware installation for occupied facilities",
      "Existing building conversion expertise",
      "Proven tenant improvement delivery discipline",
    ],
    ctaText:
      "Ready for tenant improvements? Call (509) 308-6489 to schedule a consultation or on-site scope assessment.",
  },
  {
    iconName: "location_city",
    title: "Commercial New Build-Outs",
    subtitle: "Ground-Up Commercial Builds Done Right",
    description:
      "We deliver ground-up commercial facilities with early constructability mapping, disciplined field sequence control, and direct Client Partner communication from site readiness through turnover.",
    buildTypes: [
      "Retail stores and shopping centers",
      "Medical offices and clinics",
      "Wineries and production facilities",
      "Pole buildings and utility structures",
      "Ground-up office and shell buildings",
      "Automotive dealerships",
      "Professional Office Buildings",
      "Boutique & Specialty Retail Spaces",
      "Restaurant and hospitality facilities",
    ],
    note: "From concept through closeout, we focus on durability, constructability, and turnover readiness.",
  },
  {
    iconName: "precision_manufacturing",
    title: "Light Industrial Construction",
    subtitle: "Functional & Safe Industrial Facilities",
    description:
      "We deliver light industrial facilities with safety-first execution, code compliance, and practical layouts for warehousing, production support, and operations continuity.",
    features: [
      "Fire protection systems",
      "Commercial-grade doors and windows",
      "Locker rooms and support offices",
      "Structural studs and drywall systems",
      "OSHA-compliant handrail systems",
      "Industrial electrical and mechanical systems",
      "Loading docks and handling zones",
      "Climate control and ventilation",
    ],
    note: "From warehouses to processing plants, we prioritize durability, accessibility, and reliable operations.",
  },
  {
    iconName: "church",
    title: "Religious Facilities",
    subtitle: "Specialized Construction for Sacred Spaces",
    description:
      "We build and renovate churches, community centers, and religious facilities with respectful planning, clear budgets, and practical execution for long-term community use.",
    capabilities: [
      "Design aligned to sacred use and traditions",
      "Transparent budgeting for congregations",
      "Community-centered planning",
      "Renovation and new construction delivery",
      "Acoustics and worship lighting integration",
      "Accessibility and inclusive design",
      "Multi-use worship and event spaces",
    ],
    note: "We align design intent, budget reality, and construction sequencing to protect your facility mission.",
  },
  {
    iconName: "design_services",
    title: "Design-Build Services",
    subtitle: "Integrated Design & Construction Excellence",
    description:
      "Our design-build model unifies design and construction under one accountable team. Early collaboration reduces handoff friction, shortens delivery time, and improves cost control.",
    capabilities: [
      "Unified design and construction contract",
      "Single accountable delivery team",
      "Parallel workflows for faster delivery",
      "Cost control with fewer change orders",
      "Designer-builder collaboration",
      "Integrated value engineering",
      "Streamlined decisions and communication",
    ],
    note: "One integrated team means clearer decisions, faster issue resolution, and tighter execution from concept through closeout.",
  },
];

// Service Areas
export const serviceAreas: ServiceArea[] = [
  {
    iconName: "place",
    title: "Tri-Cities Headquarters",
    areas: [
      "Pasco, WA",
      "Kennewick, WA",
      "Richland, WA",
      "West Richland, WA",
      "Benton County",
      "Franklin County",
    ],
    links: [
      "/locations/pasco",
      "/locations/kennewick",
      "/locations/richland",
      "/locations/west-richland",
      null,
      null,
    ],
  },
  {
    iconName: "travel_explore",
    title: "Extended Coverage",
    areas: [
      "Spokane, WA",
      "Yakima, WA",
      "Tacoma, WA",
      "Walla Walla, WA",
      "Omak, WA",
      "Hermiston, OR",
      "Pendleton, OR",
      "Coeur d'Alene, ID",
    ],
    links: [
      "/locations/spokane",
      "/locations/yakima",
      "/locations/tacoma",
      "/locations/walla-walla",
      "/locations/omak",
      "/locations/hermiston",
      "/locations/pendleton",
      "/locations/coeur-d-alene",
    ],
  },
];

// Why Choose Us
export const whyChooseUs: WhyChooseUsItem[] = [
  {
    iconName: "health_and_safety",
    title: ".64 EMR Safety Performance",
    description:
      "AGC-WA recognized performance with a .64 EMR, about 40% better than typical baseline. Safety planning and field controls are enforced in every phase.",
  },
  {
    iconName: "workspace_premium",
    title: "Cross-Discipline Field Experience",
    description:
      "Our team combines field and management experience across commercial, industrial, civic, and specialty projects throughout the Pacific Northwest.",
  },
  {
    iconName: "fact_check",
    title: "Open-Book Transparency",
    description:
      "Open-book pricing, direct assessments, and clear updates give you visibility into scope, cost, and key decisions from kickoff through closeout.",
  },
  {
    iconName: "diversity_3",
    title: "Partnership-Driven Trust",
    description:
      "We build long-term partnerships through reliable commitments, face-to-face accountability, and consistent follow-through before, during, and after turnover.",
  },
  {
    iconName: "military_tech",
    title: "650+ Completed Projects",
    description:
      "650+ projects delivered since 2010 with structured planning, field accountability, and steady follow-through under pressure.",
  },
  {
    iconName: "verified",
    title: "3-State Licensed and Insured",
    description:
      "Fully licensed and insured for commercial construction across Washington, Oregon, and Idaho.",
  },
];
