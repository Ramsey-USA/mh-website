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
      "Planning a new commercial building demands intricate details and expert oversight. Put your project in the right hands with comprehensive Construction Management (CM) services throughout the Tri-Cities area. Our priority is delivering an exceptional partnership experience from concept through completion. Trust our experienced team to manage the intricate details, allowing you to focus on your vision's success.",
    features: [
      "Commercial Businesses (Retail, Offices)",
      "Medical Facilities & Healthcare Centers",
      "Industrial Buildings & Manufacturing",
      "Churches & Religious Facilities",
      "Wineries & Vineyards",
      "Government & Public Buildings",
    ],
    benefits: [
      "Exceptional partnership experience from start to finish",
      "Thorough communication and upfront collaboration",
      "Streamlined process preventing costly on-the-fly decisions",
      "Expert oversight and intricate detail management",
      "Proven experience across all commercial sectors",
    ],
    ctaText:
      "Ready to start your commercial construction project? Call (509) 308-6489 ext. 100 or schedule a free consultation to discuss your vision.",
  },
  {
    iconName: "architecture",
    title: "Master Planning",
    subtitle: "Unlock Your Building's Potential",
    description:
      "We're passionate about transforming your vision into reality through comprehensive Master Planning. We strategize and coordinate every component of your building construction from concept through the finishing touches. Our skilled team works closely with you to create a plan designed to prevent last-minute changes and scope creep in later construction stages. Meticulous planning is critical to streamlining the process and minimizing costly adjustments.",
    features: [
      "Building Location and Surrounding Infrastructure Analysis",
      "Local and State Building Codes Compliance (WA, OR, ID)",
      "Detailed Budget Development and Cost Control",
      "Project Timeline and Construction Sequencing",
      "Owner Design Preferences and Vision Integration",
      "Site Analysis and Feasibility Studies",
    ],
    benefits: [
      "Zero gaps in scope coverage during construction planning",
      "Comprehensive planning prevents costly changes",
      "Realistic timelines and achievable expectations",
      "Proactive problem identification and solutions",
      "Partnership-focused approach from day one",
    ],
  },
  {
    iconName: "inventory",
    title: "Procurement & Trade Partnership Management",
    subtitle: "Reliable Material Sourcing & Vendor Coordination",
    description:
      "Navigating the logistics of construction requires extensive planning and coordination. We offer comprehensive Trade Partnership Management services throughout the Tri-Cities, specializing in sourcing quality materials and coordinating with our network of approved vendors tailored to your project goals. Our reliable Master Planning gives our trade partners the advanced notice necessary to streamline procurement and proactively manage long lead item delays, ensuring timely delivery and installation.",
    features: [
      "Quality Material Sourcing and Vetting",
      "Supplier Management and Communication",
      "Budget Negotiation and Competitive Pricing",
      "Purchase Orders and Documentation",
      "Contract Management and Coordination",
      "Delivery Scheduling and Logistics",
      "Approved Vendor Network Management",
    ],
    benefits: [
      "Meticulous attention to detail throughout procurement",
      "Timely delivery and professional installation",
      "Proactive management of long lead item delays",
      "Established network of quality trade professionals",
      "Eliminates client burden of vendor coordination",
    ],
    ctaLink: "/trade-partners",
    ctaLinkText: "Explore Our Trade Partnership Network",
  },
  {
    iconName: "fact_check",
    title: "Constructability & Budget Control",
    subtitle: "Proactive Feasibility Analysis & Cost Optimization",
    description:
      "Is your project possible? And if so, how can it be cost-effective? MH Construction is committed to improving project planning and execution by conducting early-stage analysis of construction feasibility and cost considerations. Our proactive approach involves partnering closely with our network of approved trade professionals throughout Washington, Oregon, and Idaho. This collaborative relationship eliminates guesswork and ensures realistic budgets and timelines.",
    features: [
      "Most efficient construction sequence and assembly planning",
      "Logistics coordination for specialty items (equipment, infrastructure)",
      "Precise parts ordering, timing, and cost control measures",
      "Trade collaboration for accurate estimating",
      "Risk mitigation and contingency planning",
      "Value engineering opportunities identification",
    ],
    benefits: [
      "Early collaboration with key trade partners eliminates surprises",
      "Eliminates guesswork through expert consultation",
      "Cost-effective project execution and budget adherence",
      "Proactive problem-solving before construction begins",
      "Realistic pricing based on actual trade expertise",
    ],
  },
  {
    iconName: "view_module",
    title: "Modularization",
    subtitle: "Strategic Project Division for Complex Builds",
    description:
      "Project Modularization involves strategically dividing a project into smaller, more manageable subprojects. This advanced process simplifies design, execution, and maintenance by breaking complex builds into focused phases. MH Construction specializes in Subproject Management to help partners complete large, complex projects more efficiently and consistently meet schedules across the Tri-Cities and Pacific Northwest. Replacing a single project manager with a team of phase specialists is the smartest decision you can make.",
    features: [
      "Strategic division into manageable subprojects",
      "Streamlined transitions between construction phases",
      "Improved resource allocation and communication efficiency",
      "Phase-specific expertise at each construction stage",
      "Focused execution with specialized oversight",
      "Timeline consistency across complex projects",
    ],
    benefits: [
      "New era of project management for complex builds",
      "Team of phase specialists versus single PM approach",
      "Increased efficiency through focused execution",
      "Better resource allocation and scheduling",
      "Reduced risk through specialized management",
      "Improved quality control at each phase",
    ],
  },
];

// Specialty Services & Markets
export const specialtyServices: SpecialtyService[] = [
  {
    iconName: "business",
    title: "Markets We Serve",
    subtitle: "Diverse Business Solutions Across the Pacific Northwest",
    description:
      "We complete projects for a wide range of businesses throughout the Tri-Cities (Kennewick, Richland, Pasco) and the wider Pacific Northwest region. With over 150 years of combined construction experience, you can trust us to bring your unique vision to life—from specialty religious facilities to complex industrial centers, from boutique wineries to large-scale medical facilities.",
    markets: [
      "Religious Facilities (Churches, Community Centers)",
      "Commercial Buildings (Retail Stores, Office Buildings)",
      "Government Buildings and Grant-Funded Projects",
      "Educational Buildings (Schools, Training Centers)",
      "Medical Centers, Clinics, and Healthcare Facilities",
      "Wineries, Vineyards, and Specialty Agricultural",
      "Industrial Facilities and Manufacturing Centers",
    ],
  },
  {
    iconName: "store",
    title: "Tenant Improvements",
    subtitle: "Transform Your Commercial Space",
    description:
      "If you've recently purchased a commercial building in the Tri-Cities area, MH Construction can help you transform it into your vision. We have decades of experience providing professional Tenant Improvement (TI) Services and are fully licensed to complete commercial renovation projects throughout Washington, Oregon, and Idaho. Whether you need a complete build-out or focused renovations, we'll help you bring your vision to life quickly and efficiently with expert craftsmanship.",
    capabilities: [
      "Complete commercial space transformation",
      "Licensed throughout WA, OR, and ID",
      "Quick and efficient project execution",
      "Vision brought to life with expert guidance",
      "Fast turnaround times for business needs",
      "Existing building conversion and renovation",
    ],
    ctaText:
      "Ready for your tenant improvements? Call (509) 308-6489 ext. 100 to schedule a free consultation or book an on-site visit.",
  },
  {
    iconName: "apartment",
    title: "Commercial New Build-Outs",
    subtitle: "Build Your Business Right from the Ground Up",
    description:
      "Looking for a committed, quality construction partner for your new commercial building? We offer comprehensive Commercial Construction Services to business owners throughout Kennewick, WA and the entire Tri-Cities area. Whether you need a small professional office or a large automotive dealership, we construct functional spaces where your business can thrive. Our team uses top-grade materials and partners with the best architects to ensure your building meets your exact specifications and supports your business success.",
    buildTypes: [
      "Retail Construction (Stores, Shopping Centers)",
      "Medical Office Construction (Clinics, Healthcare)",
      "Winery Construction (Tasting Rooms, Production)",
      "Automotive Dealership Construction",
      "Professional Office Buildings",
      "Boutique & Specialty Retail Spaces",
    ],
    note: "Every project built using top-grade materials and partnering with the best architects in the Pacific Northwest.",
  },
  {
    iconName: "factory",
    title: "Light Industrial Construction",
    subtitle: "Functional & Safe Industrial Facilities",
    description:
      "When choosing a contractor for light industrial facilities, experience is the most critical factor. MH Construction has been providing professional Light Industrial Construction Services for over 13 years to business owners in the Tri-Cities (Kennewick, WA) and surrounding states including Oregon and Idaho. Count on us to create a safe, functional, and code-compliant building—from warehouses to processing plants—all built to your precise specifications with industry-leading materials and expert craftsmanship.",
    features: [
      "Advanced Fire Protection Systems",
      "Commercial-Grade Doors and Windows",
      "Professional Locker Rooms and Offices",
      "Structural Metal Studs and Sheetrock",
      "OSHA-Compliant Safety Hand Railings",
      "Industrial Electrical and Mechanical Systems",
    ],
    note: "From warehouses to processing plants—all facilities built to your precise specifications with durability, accessibility, and reliability as top priorities.",
  },
  {
    iconName: "church",
    title: "Religious Facilities",
    subtitle: "Specialized Construction for Sacred Spaces",
    description:
      "MH Construction provides dedicated commercial construction services for Churches, Community Centers, and Religious Facilities across Washington, Oregon, and Idaho. We deeply understand that these sacred spaces require thoughtful design, careful budgeting, and a profound respect for the community they serve. Trust our experienced team to manage every detail of your renovation or new construction project with the reverence and attention it deserves. We partner with religious communities to create spaces that inspire and serve for generations.",
    capabilities: [
      "Thoughtful design respecting sacred purposes",
      "Careful budgeting and transparent pricing",
      "Deep respect for community values and traditions",
      "Complete renovation or new construction services",
      "Acoustics and specialized lighting design",
      "Accessibility compliance and inclusive design",
    ],
    note: "Trust our experienced team to manage every detail of your project with reverence, ensuring your facility serves your community for generations to come.",
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
      "Fully licensed for commercial construction across Washington, Oregon, and Idaho with comprehensive insurance coverage for your complete protection. Our multi-state licensing demonstrates our commitment to professional standards.",
  },
  {
    iconName: "high_quality",
    title: "Meticulous Quality Assurance",
    description:
      "Quality control processes at every project phase ensure work consistently meets our high standards and your expectations. We don't cut corners—we build it right the first time with materials that last.",
  },
  {
    iconName: "engineering",
    title: "Urgent Construction Support",
    description:
      "Specialized expertise, manpower, and equipment available for companies facing critical construction challenges. We partner with businesses to provide urgent structural consultation and repairs—fixing the source, not just symptoms.",
    ctaLink: "/contact#urgent-support",
    ctaLinkText: "Get Urgent Support",
  },
];
