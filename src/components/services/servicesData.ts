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
    subtitle: "Streamline Your Project Success",
    description:
      "Planning a new commercial building demands intricate details and expert oversight. Put your project in the right hands with comprehensive Construction Management services throughout the Tri-Cities area. Our commitment to thorough communication and upfront planning prevents costly on-the-fly decisions later on.",
    features: [
      "Commercial Businesses (Retail, Offices)",
      "Medical Facilities",
      "Industrial Buildings",
      "Churches & Religious Facilities",
      "Wineries & Vineyards",
    ],
    benefits: [
      "Exceptional partnership experience from start to finish",
      "Streamlined process with upfront planning",
      "Expert oversight and intricate detail management",
    ],
    ctaText:
      "Call (509) 308-6489 today to take the first step toward your new building construction.",
  },
  {
    iconName: "architecture",
    title: "Master Planning",
    subtitle: "Pre-Construction Excellence",
    description:
      "We're passionate about transforming your vision into reality through detailed Master Planning. We strategize and coordinate every component of your building construction from concept through the finishing touches. Our team works closely with you to prevent last-minute changes and scope creep in later stages.",
    features: [
      "Building Location and Surrounding Infrastructure",
      "Local and State Building Codes (WA, OR, ID)",
      "Detailed Budget Constraints and Cost Control",
      "Project Timeline and Sequencing",
      "Owner Design Preferences",
    ],
    benefits: [
      "Zero gaps in scope coverage",
      "Comprehensive planning prevents changes",
      "Realistic timelines and expectations",
    ],
  },
  {
    iconName: "inventory",
    title: "Procurement & Vendor Management",
    subtitle: "Reliable Material Sourcing",
    description:
      "Navigating the logistics of construction requires extensive planning and coordination. We specialize in sourcing quality materials tailored to your project goals. Our reliable Master Planning gives vendors the advanced notice necessary to streamline procurement and proactively manage long lead item delays.",
    features: [
      "Material Sourcing and Vetting",
      "Supplier Management and Communication",
      "Budget Negotiation and Pricing",
      "Purchase Orders and Documentation",
      "Contract Management",
      "Coordination of Deliveries",
    ],
    benefits: [
      "Meticulous attention to detail",
      "Timely delivery and installation",
      "Proactive delay management",
    ],
    ctaLink: "/trade-partners",
    ctaLinkText: "Explore Our Trade Partners",
  },
  {
    iconName: "fact_check",
    title: "Constructability & Budget Control",
    subtitle: "Proactive Feasibility Analysis",
    description:
      "Is your project possible? And if so, how can it be cost-effective? We're committed to improving project planning and execution by conducting early-stage analysis of construction feasibility and cost considerations. We offer these critical services to partners throughout Washington, Oregon, and Idaho.",
    features: [
      "Most efficient construction sequence and assembly",
      "Logistics for specialty items (equipment and infrastructure)",
      "Precise parts ordering, timing, and cost control",
    ],
    benefits: [
      "Collaboration with key subcontractors",
      "Eliminates guesswork early",
      "Cost-effective project execution",
    ],
  },
  {
    iconName: "view_module",
    title: "Modularization",
    subtitle: "Advanced Subproject Management",
    description:
      "Project Modularization involves strategically dividing a project into smaller, more manageable subprojects. This process simplifies design, execution, and maintenance. We focus on Subproject Management to help partners complete large, complex projects more efficiently and consistently meet schedules.",
    features: [
      "Streamlined transitions between construction phases",
      "Improved resource allocation and communication efficiency",
      "Leverage expertise specifically at each stage",
    ],
    benefits: [
      "New era of project management",
      "Team of phase specialists vs. single PM",
      "Increased efficiency for complex builds",
    ],
  },
];

// Specialty Services & Markets
export const specialtyServices: SpecialtyService[] = [
  {
    iconName: "business",
    title: "Markets",
    subtitle: "Diverse Business Solutions",
    description:
      "We complete projects for a wide range of businesses throughout the Tri-Cities (Kennewick, Richland, Pasco) and the wider region. With over 150 years of construction experience, trust us to bring your unique vision to life—from specialty religious facilities to complex industrial centers.",
    markets: [
      "Religious Facilities (Churches, Centers)",
      "Commercial Buildings (Retail, Offices)",
      "Government Buildings and Grant Projects",
      "Educational Buildings (Schools, Training Centers)",
      "Medical Centers and Clinics",
      "Wineries and Vineyards",
    ],
  },
  {
    iconName: "store",
    title: "Tenant Improvements",
    subtitle: "Commercial Space Transformation",
    description:
      "If you've recently purchased a commercial building in the Tri-Cities, we can help you transform it. We have decades of experience providing Tenant Improvement (TI) Services and are licensed to complete commercial renovation projects throughout Washington, Oregon, and Idaho.",
    capabilities: [
      "Recent purchase building conversion",
      "Quick and efficient execution",
      "Vision brought to life",
      "Fast turnaround times",
    ],
    ctaText: "Call us right away to schedule tenant improvement services.",
  },
  {
    iconName: "apartment",
    title: "Commercial New Build-Outs",
    subtitle: "Build Your Business Right",
    description:
      "Looking for a committed, quality construction partner? We offer comprehensive Commercial Construction Services to business owners throughout Kennewick, WA and the entire Tri-Cities area. Whether you need a small office or a large dealership, we construct a space where your business can thrive.",
    buildTypes: [
      "Retail Construction",
      "Medical Office Construction",
      "Winery Construction",
      "Car Dealership Construction",
      "Boutique & Specialty Spaces",
    ],
    note: "Using top-grade materials and partnering with the best architects.",
  },
  {
    iconName: "factory",
    title: "Light Industrial",
    subtitle: "Functional & Safe Industrial Facilities",
    description:
      "When choosing a contractor for light industrial facilities, experience is the most important factor. We have been providing Light Industrial Construction Services for over 13 years to business owners in the Tri-Cities and surrounding states. Count on us to create a safe and functional building.",
    features: [
      "Fire Protection Systems",
      "Commercial Doors and Windows",
      "Locker Rooms and Offices",
      "Structural Metal Studs and Sheetrock",
      "Safety Hand Railings",
    ],
    note: "From warehouses to processing plants—all built to your precise specifications.",
  },
  {
    iconName: "church",
    title: "Religious Facilities",
    subtitle: "Specialized Construction for Sacred Spaces",
    description:
      "We provide dedicated commercial construction services for Churches, Community Centers, and Religious Facilities across Washington, Oregon, and Idaho. We understand that these spaces require thoughtful design, careful budgeting, and a deep respect for the community they serve.",
    capabilities: [
      "Thoughtful design",
      "Careful budgeting",
      "Community respect",
      "Renovation or new construction",
    ],
    note: "Trust our experienced team to manage every detail of your project.",
  },
];

// Service Areas
export const serviceAreas: ServiceArea[] = [
  {
    iconName: "location_city",
    title: "Tri-Cities Primary",
    areas: [
      "Pasco, WA",
      "Kennewick, WA",
      "Richland, WA",
      "Benton County",
      "Franklin County",
    ],
  },
  {
    iconName: "map",
    title: "Extended Coverage",
    areas: [
      "Washington State",
      "Oregon (Licensed)",
      "Idaho (Licensed)",
      "Pacific Northwest Region",
    ],
  },
];

// Why Choose Us
export const whyChooseUs: WhyChooseUsItem[] = [
  {
    iconName: "workspace_premium",
    title: "150+ Years Combined Experience",
    description:
      "Deep expertise across all construction disciplines, refined through decades of successful projects.",
  },
  {
    iconName: "military_tech",
    title: "Veteran-Owned Excellence",
    description:
      "Veteran-owned since January 2025 under Army veteran leadership. Military precision and discipline applied to construction, ensuring attention to detail and reliable execution.",
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
    ctaLink: "/contact#urgent-support",
    ctaLinkText: "Get Urgent Support",
  },
];
