// Navigation item interface
export interface NavigationItem {
  href: string;
  label: string;
  mobileLabel?: string; // Shorter label for mobile screens
  icon: string;
}

// Helper function to get appropriate label based on screen size
export function getNavigationLabel(
  item: NavigationItem,
  isMobile = false,
): string {
  return isMobile && item.mobileLabel ? item.mobileLabel : item.label;
}

// Page-specific navigation configurations
export const navigationConfigs = {
  home: [
    {
      href: "#core-values",
      label: "Core Values",
      mobileLabel: "Values",
      icon: "shield",
    },
    {
      href: "#why-partner",
      label: "Why Partner",
      mobileLabel: "Why Us",
      icon: "handshake",
    },
    {
      href: "#services",
      label: "Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "#testimonials",
      label: "Testimonials",
      mobileLabel: "Reviews",
      icon: "verified",
    },
    {
      href: "#stats",
      label: "Track Record",
      mobileLabel: "Stats",
      icon: "analytics",
    },
    {
      href: "#our-process",
      label: "Our Process",
      mobileLabel: "Process",
      icon: "timeline",
    },
    {
      href: "#next-steps",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "rocket_launch",
    },
  ],

  about: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/about#stats",
      label: "Track Record",
      mobileLabel: "Stats",
      icon: "analytics",
    },
    {
      href: "/about#testimonials",
      label: "Client Partners",
      mobileLabel: "Reviews",
      icon: "verified",
    },
    {
      href: "/about#partnership-philosophy",
      label: "Partnership Philosophy",
      mobileLabel: "Philosophy",
      icon: "handshake",
    },
    {
      href: "/about#evolution",
      label: "Company Evolution",
      mobileLabel: "Evolution",
      icon: "timeline",
    },
    {
      href: "/about#awards",
      label: "Awards & Recognition",
      mobileLabel: "Awards",
      icon: "emoji_events",
    },
    {
      href: "/about#safety",
      label: "Safety Excellence",
      mobileLabel: "Safety",
      icon: "shield",
    },
    {
      href: "/about#team",
      label: "Chain of Command",
      mobileLabel: "Team",
      icon: "military_tech",
    },
    {
      href: "/contact",
      label: "Start Your Project",
      mobileLabel: "Contact",
      icon: "rocket_launch",
    },
  ],

  services: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services#core-services",
      label: "Values-Driven Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/services#process",
      label: "Our Process",
      mobileLabel: "Process",
      icon: "timeline",
    },
    {
      href: "/services#testimonials",
      label: "Trust In Action",
      mobileLabel: "Trust",
      icon: "verified",
    },
    {
      href: "/services#faq",
      label: "FAQ",
      mobileLabel: "FAQ",
      icon: "help",
    },
    {
      href: "/services#inspections",
      label: "Quality Inspections",
      mobileLabel: "Inspections",
      icon: "fact_check",
    },
    {
      href: "/services#maintenance",
      label: "Maintenance & Repairs",
      mobileLabel: "Repairs",
      icon: "build_circle",
    },
    {
      href: "/contact",
      label: "Begin Project",
      mobileLabel: "Start",
      icon: "handshake",
    },
  ],

  projects: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/projects#project-stats",
      label: "Our Stats",
      mobileLabel: "Stats",
      icon: "analytics",
    },
    {
      href: "/projects#portfolio",
      label: "Trust In Action",
      mobileLabel: "Portfolio",
      icon: "verified",
    },
    {
      href: "/projects#veteran-owned",
      label: "Veteran-Owned",
      mobileLabel: "Veteran",
      icon: "military_tech",
    },
    {
      href: "/contact",
      label: "Begin Project",
      mobileLabel: "Start",
      icon: "handshake",
    },
  ],

  team: [
    {
      href: "#upper-brass",
      label: "The Upper Brass",
      mobileLabel: "Leadership",
      icon: "workspace_premium",
    },
    {
      href: "#mission-commanders",
      label: "Mission Commanders",
      mobileLabel: "Commanders",
      icon: "engineering",
    },
    {
      href: "#special-operations",
      label: "Special Operations",
      mobileLabel: "Spec Ops",
      icon: "military_tech",
    },
    {
      href: "#logistics-command",
      label: "Logistics Command",
      mobileLabel: "Logistics",
      icon: "support_agent",
    },
    {
      href: "#field-officers",
      label: "Field Officers",
      mobileLabel: "Field Ops",
      icon: "construction",
    },
    {
      href: "#company-culture",
      label: "Company Culture",
      mobileLabel: "Culture",
      icon: "diversity_3",
    },
    {
      href: "#employee-testimonials",
      label: "Team Stories",
      mobileLabel: "Stories",
      icon: "star",
    },
  ],

  careers: [
    {
      href: "#positions",
      label: "Open Positions",
      mobileLabel: "Positions",
      icon: "work",
    },
    {
      href: "#application-process",
      label: "How to Apply",
      mobileLabel: "Apply",
      icon: "timeline",
    },
    {
      href: "#testimonials",
      label: "Employee Stories",
      mobileLabel: "Stories",
      icon: "verified",
    },
    {
      href: "#general-application",
      label: "Apply Now",
      mobileLabel: "Apply",
      icon: "handshake",
    },
  ],

  contact: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/projects",
      label: "Trust In Action",
      mobileLabel: "Projects",
      icon: "verified",
    },
    {
      href: "/about",
      label: "Our Foundation",
      mobileLabel: "About",
      icon: "foundation",
    },
    {
      href: "/careers",
      label: "Build With Us",
      mobileLabel: "Careers",
      icon: "handshake",
    },
  ],

  publicSector: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services#core-services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/services#inspections",
      label: "Quality Inspections",
      mobileLabel: "Inspections",
      icon: "fact_check",
    },
    {
      href: "/about#team",
      label: "Veteran Team",
      mobileLabel: "Veterans",
      icon: "people",
    },
    {
      href: "/contact",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "contact_phone",
    },
  ],

  government: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services#core-services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/services#inspections",
      label: "Quality Inspections",
      mobileLabel: "Inspections",
      icon: "fact_check",
    },
    {
      href: "/about#team",
      label: "Veteran Team",
      mobileLabel: "Veterans",
      icon: "people",
    },
    {
      href: "/contact",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "contact_phone",
    },
  ],

  allies: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services#core-services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/about#testimonials",
      label: "Trust In Action",
      mobileLabel: "Trust",
      icon: "verified",
    },
    {
      href: "/contact",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "contact_phone",
    },
  ],

  tradePartners: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services#core-services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/about#testimonials",
      label: "Trust In Action",
      mobileLabel: "Trust",
      icon: "verified",
    },
    {
      href: "/careers",
      label: "Build With Us",
      mobileLabel: "Join",
      icon: "handshake",
    },
    {
      href: "/projects#portfolio",
      label: "Our Partnerships",
      mobileLabel: "Partners",
      icon: "photo_library",
    },
    {
      href: "/contact",
      label: "Begin Partnership",
      mobileLabel: "Partner",
      icon: "diversity_3",
    },
  ],

  urgent: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/urgent#capabilities",
      label: "Our Capabilities",
      mobileLabel: "Capabilities",
      icon: "engineering",
    },
    {
      href: "/urgent#equipment",
      label: "Equipment & Operators",
      mobileLabel: "Equipment",
      icon: "precision_manufacturing",
    },
    {
      href: "/services#core-services",
      label: "All Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/contact",
      label: "Contact Now",
      mobileLabel: "Contact",
      icon: "phone",
    },
  ],

  veterans: [
    {
      href: "#fishing-event",
      label: "Fishing Event",
      mobileLabel: "Event",
      icon: "phishing",
    },
    {
      href: "#sponsorship",
      label: "Become a Sponsor",
      mobileLabel: "Sponsor",
      icon: "handshake",
    },
  ],
};

export type PageType = keyof typeof navigationConfigs;
