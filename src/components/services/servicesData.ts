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
    subtitle:
      "Streamline Your Project Success with Partnership-Focused CM Services",
    description:
      "Planning a new commercial building demands intricate details and expert partnership oversight. Put your project in the right hands with comprehensive Construction Management (CM) services throughout the Tri-Cities area. Our priority is delivering an exceptional partnership experience from concept through completion, built on trust and proven excellence. We believe meticulous Master Planning and thorough communication are critical to streamlining the process in later stages, which is why we minimize 'on-the-fly' decisions. Trust our experienced team to manage the intricate details, allowing you to focus on your vision's success.",
    features: [
      "Commercial Businesses (Retail Stores, Office Buildings)",
      "Medical Facilities & Healthcare Centers",
      "Industrial Buildings & Manufacturing Centers",
      "Churches & Religious Facilities",
      "Wineries, Vineyards & Specialty Agricultural",
      "Government & Public Buildings",
      "Educational Buildings (Schools, Training Centers)",
    ],
    benefits: [
      "Exceptional partnership experience from start to finish",
      "Thorough communication and upfront collaboration",
      "Streamlined process preventing costly on-the-fly decisions",
      "Expert oversight and intricate detail management",
      "Proven experience across all commercial sectors",
      "Military precision applied to civilian construction",
      "Building for the Client, NOT the Dollar",
    ],
    ctaText:
      "Ready to start your commercial construction project? Call (509) 308-6489 or schedule a free consultation to discuss your vision with our partnership-focused team.",
  },
  {
    iconName: "architecture",
    title: "Master Planning (Pre-Construction)",
    subtitle: "Unlock Your Building's Potential with Comprehensive Planning",
    description:
      "At MH Construction, we're passionate about transforming your vision into reality through detailed Master Planning. We strategize and coordinate every component of your building construction from concept through the finishing touches. Our skilled team works closely with you to create a comprehensive plan designed to prevent last-minute changes and scope creep in later construction stages. This partnership approach ensures zero gaps in scope coverage during your construction planning. We meticulously consider every detail—from building location and infrastructure to local codes and your design preferences—providing the solid foundation for project success.",
    features: [
      "Building Location and Surrounding Infrastructure Analysis",
      "Local and State Building Codes Compliance (WA, OR, ID)",
      "Detailed Budget Constraints and Cost Control",
      "Project Timeline and Precise Sequencing",
      "Owner Design Preferences and Vision Integration",
      "Site Analysis and Comprehensive Feasibility Studies",
      "Multiple Budget Scenarios When Applicable",
    ],
    benefits: [
      "Zero gaps in scope coverage during construction planning",
      "Comprehensive planning prevents costly changes",
      "Realistic timelines and achievable expectations",
      "Proactive problem identification and solutions",
      "Partnership-focused approach from day one",
      "Prevents last-minute scope creep",
      "Clear project scope definition and documentation",
    ],
  },
  {
    iconName: "inventory",
    title: "Procurement & Trade Partnership Management",
    subtitle: "Reliable Material Sourcing & Professional Vendor Coordination",
    description:
      "Navigating the logistics of construction requires extensive planning and coordination. At MH Construction, we offer comprehensive Trade Partnership Management services throughout the Tri-Cities, specializing in sourcing quality materials and coordinating with our network of approved vendors tailored to your project goals. Our reliable Master Planning gives our trade partners the advanced notice necessary to streamline procurement and proactively manage long lead item delays, ensuring timely delivery and installation. We handle all vendor coordination so you don't have to worry about managing multiple trade relationships—we work with our established network of quality professionals to deliver results.",
    features: [
      "Quality Material Sourcing and Professional Vetting",
      "Comprehensive Supplier Management and Communication",
      "Budget Negotiation and Competitive Pricing",
      "Complete Purchase Orders and Documentation",
      "Professional Contract Management and Coordination",
      "Strategic Delivery Scheduling and Logistics",
      "Curated Approved Vendor Network Management",
      "Long Lead Item Proactive Management",
    ],
    benefits: [
      "Meticulous attention to detail throughout procurement",
      "Timely delivery and professional installation",
      "Proactive management of long lead item delays",
      "Established network of quality trade professionals",
      "Eliminates client burden of vendor coordination",
      "Advanced notice enables streamlined operations",
      "Consistent project opportunities for trade partners",
    ],
    ctaLink: "/trade-partners",
    ctaLinkText: "Join Our Trade Partnership Network",
  },
  {
    iconName: "fact_check",
    title: "Constructability & Budget Control",
    subtitle: "Proactive Feasibility Review & Strategic Cost Optimization",
    description:
      "Is your project possible? And if so, how can it be cost-effective? MH Construction is committed to improving project planning and execution by conducting comprehensive early-stage analysis of construction feasibility and cost considerations. We offer critical Constructability and Budget Control Services to clients throughout Washington, Oregon, and Idaho. Our partnership-driven process involves working closely with our network of approved trade professionals. This collaborative relationship eliminates guesswork, allowing us to determine the most efficient construction sequence and assembly, coordinate logistics for specialty items, and ensure precise parts ordering, timing, and cost control.",
    features: [
      "Most efficient construction sequence and assembly planning",
      "Comprehensive logistics coordination for specialty items",
      "Precise parts ordering, timing, and cost control measures",
      "Early-stage trade collaboration for accurate estimating",
      "Strategic risk mitigation and contingency planning",
      "Value engineering opportunities identification",
      "Proactive budget control through expert consultation",
    ],
    benefits: [
      "Early collaboration with key trade partners eliminates surprises",
      "Eliminates guesswork through expert professional consultation",
      "Cost-effective project execution and strict budget adherence",
      "Proactive problem-solving before construction begins",
      "Realistic pricing based on actual trade expertise",
      "Project stays on schedule and within budget",
      "Confidence through constructability review process",
    ],
  },
  {
    iconName: "view_module",
    title: "Modularization & Subproject Management",
    subtitle: "Advanced Project Division for Complex Builds",
    description:
      "Project Modularization involves strategically dividing a project into smaller, more manageable subprojects. This advanced process simplifies design, execution, and maintenance by breaking complex builds into focused phases. MH Construction focuses on Subproject Management to help clients complete large, complex projects more efficiently and consistently meet schedules across the Tri-Cities and the Pacific Northwest. Ushering in a new era of project management—replacing a single project manager with a team of phase specialists is the smartest decision you can make. Our subproject management services help streamline the transitions between different construction phases, improve resource allocation and communication efficiency, and leverage our expertise specifically at each stage of the process.",
    features: [
      "Strategic division into manageable subprojects",
      "Streamlined transitions between construction phases",
      "Improved resource allocation and communication efficiency",
      "Phase-specific expertise at each construction stage",
      "Focused execution with specialized oversight",
      "Timeline consistency across complex projects",
      "Team of phase specialists approach",
    ],
    benefits: [
      "New era of project management for complex builds",
      "Team of phase specialists versus single PM approach",
      "Increased efficiency through focused execution",
      "Better resource allocation and scheduling",
      "Reduced risk through specialized management",
      "Improved quality control at each phase",
      "Leverages expertise specifically at each stage",
    ],
  },
];

// Specialty Services & Markets
export const specialtyServices: SpecialtyService[] = [
  {
    iconName: "business",
    title: "Markets We Serve",
    subtitle: "Diverse Business Solutions Across WA, OR, ID",
    description:
      "At MH Construction, we complete projects for a wide range of businesses throughout the Tri-Cities (Kennewick, Richland, Pasco) and the wider Pacific Northwest region. With over 150 years of combined construction experience, you can trust us to bring your unique vision to life—from specialty religious facilities to complex industrial centers, from boutique wineries to large-scale medical facilities. We serve diverse markets across Washington, Idaho, and Oregon with the same commitment to quality and partnership excellence.",
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
    subtitle: "Transform Your Commercial Space in the Tri-Cities",
    description:
      "If you've recently purchased a commercial building in the Tri-Cities area (Kennewick, Richland, Pasco, WA), MH Construction can help you transform it into your vision. We have decades of experience providing professional Tenant Improvement (TI) Services and are fully licensed to complete commercial renovation projects throughout Washington, Oregon, and Idaho. Whether you need a complete build-out or focused renovations, we'll help you bring your vision to life quickly and efficiently with expert craftsmanship. Our team understands the urgency of getting your business operational—we work diligently to minimize downtime while delivering exceptional results.",
    capabilities: [
      "Complete commercial space transformation and renovation",
      "Licensed throughout Washington, Oregon, and Idaho",
      "Quick and efficient project execution for fast turnaround",
      "Vision brought to life with expert guidance and craftsmanship",
      "Fast turnaround times for business operational needs",
      "Existing building conversion and renovation expertise",
      "Decades of proven TI experience",
    ],
    ctaText:
      "Ready for your tenant improvements? Call (509) 308-6489 to schedule a free consultation or book an on-site assessment to discuss your commercial space transformation.",
  },
  {
    iconName: "apartment",
    title: "Commercial New Build-Outs",
    subtitle: "Build Your Business Right from the Ground Up",
    description:
      "Looking for a committed, quality construction partner for your new commercial building? We offer comprehensive Commercial Construction Services to business owners throughout Kennewick, WA and the entire Tri-Cities area. Whether you need a small professional office or a large automotive dealership, we construct functional spaces where your business can thrive. With over 150 years of combined experience, our crew uses top-grade materials and partners with the best architects in the Pacific Northwest to ensure your building meets your exact specifications and supports your business success. Every project is built with craftsmanship that lasts—quality construction that serves your business for generations.",
    buildTypes: [
      "Retail Construction (Stores, Shopping Centers)",
      "Medical Office Construction (Clinics, Healthcare)",
      "Winery Construction (Tasting Rooms, Production Facilities)",
      "Automotive Dealership Construction",
      "Professional Office Buildings",
      "Boutique & Specialty Retail Spaces",
      "Restaurant and Hospitality Construction",
    ],
    note: "Every project built using top-grade materials and partnering with the best architects in the Pacific Northwest. From concept to completion, we're committed to creating spaces where your business can thrive.",
  },
  {
    iconName: "factory",
    title: "Light Industrial Construction",
    subtitle: "Functional & Safe Industrial Facilities",
    description:
      "When choosing a contractor for light industrial facilities, experience is the most critical factor. MH Construction has been providing professional Light Industrial Construction Services for over 13 years to business owners in the Tri-Cities (Kennewick, WA) and surrounding states including Oregon and Idaho. Count on us to create a safe, functional, and code-compliant building—from warehouses to processing plants—all built to your precise specifications with industry-leading materials and expert craftsmanship. Light industrial facilities demand durability, accessibility, and reliability—we deliver on all three fronts with meticulous attention to safety and functionality.",
    features: [
      "Advanced Fire Protection Systems",
      "Commercial-Grade Doors and Windows",
      "Professional Locker Rooms and Offices",
      "Structural Metal Studs and Sheetrock",
      "OSHA-Compliant Safety Hand Railings",
      "Industrial Electrical and Mechanical Systems",
      "Loading Docks and Material Handling Areas",
      "Climate Control and Ventilation Systems",
    ],
    note: "From warehouses to processing plants—all facilities built to your precise specifications with durability, accessibility, and reliability as top priorities. Over 13 years of proven light industrial construction expertise.",
  },
  {
    iconName: "church",
    title: "Religious Facilities",
    subtitle: "Specialized Construction for Sacred Spaces",
    description:
      "MH Construction provides dedicated commercial construction services for Churches, Community Centers, and Religious Facilities across Washington, Oregon, and Idaho. We deeply understand that these sacred spaces require thoughtful design, careful budgeting, and a profound respect for the community they serve. Trust our experienced team to manage every detail of your renovation or new construction project with the reverence and attention it deserves. We partner with religious communities to create spaces that inspire worship, foster fellowship, and serve congregations for generations to come. Our approach balances architectural beauty with practical functionality, ensuring your facility meets both spiritual and operational needs.",
    capabilities: [
      "Thoughtful design respecting sacred purposes and traditions",
      "Careful budgeting and transparent pricing for congregations",
      "Deep respect for community values and traditions",
      "Complete renovation or new construction services",
      "Specialized acoustics and lighting design for worship",
      "Accessibility compliance and inclusive design",
      "Multi-purpose spaces for worship and community events",
    ],
    note: "Trust our experienced team to manage every detail of your project with reverence, ensuring your facility serves your community and congregation for generations to come. We understand the unique needs of religious spaces.",
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
    title: "Partnership-Driven: Where Handshakes Still Matter",
    description:
      "We believe in old school business values—where your word is your bond and trust is earned face-to-face. We build lasting partnerships through genuine commitment, not just contracts. Building for the Client, NOT the Dollar is our promise to you, because real partnerships are built person-to-person and last well beyond project completion through proven excellence.",
  },
  {
    iconName: "verified",
    title: "Licensed & Insured Across Three States",
    description:
      "Fully licensed for commercial construction across Washington, Oregon, and Idaho with comprehensive insurance coverage for your complete protection. Our multi-state licensing demonstrates our commitment to professional standards and our ability to serve clients throughout the entire Pacific Northwest region.",
  },
  {
    iconName: "high_quality",
    title: "Craftsmanship Built to Last Generations",
    description:
      "We build it right the first time with quality that endures. No shortcuts, no compromises—just honest craftsmanship where pride in workmanship drives everything we do. Our commitment is to build structures that serve communities for generations, with attention to detail earned through years of experience and maintained through personal integrity.",
  },
  {
    iconName: "visibility",
    title: "Complete Transparency: No Surprises, Ever",
    description:
      "Open-book pricing where you see everything—detailed cost breakdowns, regular updates, and honest assessments. We believe in doing business the right way: total transparency, clear communication, and keeping our promises. You control it, we manage it—full visibility into every decision. Your trust is earned through action, not just words.",
  },
  {
    iconName: "engineering",
    title: "Urgent Construction Support",
    description:
      "Specialized expertise, manpower, and equipment available for companies facing critical construction challenges. We partner with businesses to provide urgent structural consultation and repairs—fixing the source of problems like damaged foundations, roofing systems, and structural issues causing leaks or failures. Expert response when you need it most.",
    ctaLink: "/urgent",
    ctaLinkText: "Get Urgent Support",
  },
];
