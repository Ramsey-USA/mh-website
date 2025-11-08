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
  isMobile: boolean = false,
): string {
  return isMobile && item.mobileLabel ? item.mobileLabel : item.label;
}

// Page-specific navigation configurations
export const navigationConfigs = {
  home: [
    {
      href: "/estimator",
      label: "AI Estimator",
      mobileLabel: "Estimator",
      icon: "calculate",
    },
    {
      href: "/3d-explorer",
      label: "3D Explorer",
      mobileLabel: "3D View",
      icon: "visibility",
    },
    {
      href: "/booking",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "event",
    },
    {
      href: "/trade-partners",
      label: "Start Partnership",
      mobileLabel: "Partner",
      icon: "launch",
    },
    { href: "/contact", label: "Contact", icon: "contact_phone" },
  ],

  about: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/about#partnership-philosophy",
      label: "Our Philosophy",
      mobileLabel: "Philosophy",
      icon: "handshake",
    },
    {
      href: "/about#values",
      label: "Core Values",
      mobileLabel: "Values",
      icon: "shield",
    },
    {
      href: "/about#team",
      label: "Leadership Team",
      mobileLabel: "Team",
      icon: "people",
    },
    {
      href: "/about#testimonials",
      label: "Client Reviews",
      mobileLabel: "Reviews",
      icon: "star",
    },
    {
      href: "/about#safety",
      label: "Safety & Compliance",
      mobileLabel: "Safety",
      icon: "security",
    },
    {
      href: "/about#awards",
      label: "Awards & Recognition",
      mobileLabel: "Awards",
      icon: "emoji_events",
    },
    {
      href: "/contact",
      label: "Partner With Us",
      mobileLabel: "Partner",
      icon: "contact_phone",
    },
  ],

  services: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services#core-services",
      label: "Core Services",
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
      label: "Client Reviews",
      mobileLabel: "Reviews",
      icon: "star",
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
      href: "/estimator",
      label: "Get Estimate",
      mobileLabel: "Estimate",
      icon: "calculate",
    },
    {
      href: "/contact",
      label: "Start Project",
      mobileLabel: "Start",
      icon: "contact_phone",
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
    { href: "/projects#portfolio", label: "Portfolio", icon: "photo_library" },
    {
      href: "/projects#veteran-owned",
      label: "Veteran-Owned",
      mobileLabel: "Veteran",
      icon: "military_tech",
    },
    {
      href: "/estimator",
      label: "Get Estimate",
      mobileLabel: "Estimate",
      icon: "calculate",
    },
    {
      href: "/contact",
      label: "Start Project",
      mobileLabel: "Start",
      icon: "contact_phone",
    },
  ],

  team: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/about#values",
      label: "Our Values",
      mobileLabel: "Values",
      icon: "shield",
    },
    {
      href: "/about#team",
      label: "Leadership Team",
      mobileLabel: "Leaders",
      icon: "people",
    },
    {
      href: "/team#company-culture",
      label: "Company Culture",
      mobileLabel: "Culture",
      icon: "groups",
    },
    {
      href: "/team#career-growth",
      label: "Career Growth",
      mobileLabel: "Growth",
      icon: "trending_up",
    },
    {
      href: "/team#employee-testimonials",
      label: "Team Stories",
      mobileLabel: "Stories",
      icon: "star",
    },
    {
      href: "/about#safety",
      label: "Safety & Compliance",
      mobileLabel: "Safety",
      icon: "security",
    },
    {
      href: "/services#core-services",
      label: "What We Do",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/careers",
      label: "Join Team",
      mobileLabel: "Join",
      icon: "badge",
    },
    {
      href: "/contact",
      label: "Meet Us",
      mobileLabel: "Meet",
      icon: "contact_phone",
    },
  ],

  careers: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/careers#employee-stories",
      label: "Employee Stories",
      mobileLabel: "Stories",
      icon: "star",
    },
    {
      href: "/careers#application-process",
      label: "How to Apply",
      mobileLabel: "Apply",
      icon: "timeline",
    },
    {
      href: "/careers#positions",
      label: "Open Positions",
      mobileLabel: "Positions",
      icon: "work",
    },
    {
      href: "/careers#veteran-benefits",
      label: "Veteran Benefits",
      mobileLabel: "Veterans",
      icon: "military_tech",
    },
    {
      href: "/team",
      label: "Meet Team",
      mobileLabel: "Team",
      icon: "people",
    },
    {
      href: "/about#values",
      label: "Our Values",
      mobileLabel: "Values",
      icon: "shield",
    },
    {
      href: "/about#safety",
      label: "Safety & Compliance",
      mobileLabel: "Safety",
      icon: "security",
    },
    {
      href: "/services#core-services",
      label: "What We Do",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/projects#portfolio",
      label: "Our Work",
      mobileLabel: "Work",
      icon: "photo_library",
    },
    {
      href: "/contact",
      label: "Apply Now",
      mobileLabel: "Apply",
      icon: "contact_phone",
    },
  ],

  contact: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/estimator",
      label: "Get Estimate",
      mobileLabel: "Estimate",
      icon: "calculate",
    },
    {
      href: "/booking",
      label: "Book Consultation",
      mobileLabel: "Book",
      icon: "calendar_month",
    },
    {
      href: "/services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "construction",
    },
    {
      href: "/projects",
      label: "Our Projects",
      mobileLabel: "Projects",
      icon: "photo_library",
    },
    {
      href: "/team",
      label: "Meet Team",
      mobileLabel: "Team",
      icon: "groups",
    },
    {
      href: "/careers",
      label: "Join Team",
      mobileLabel: "Careers",
      icon: "work",
    },
  ],

  estimator: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services#core-services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/services#maintenance",
      label: "Maintenance & Repairs",
      mobileLabel: "Repairs",
      icon: "build_circle",
    },
    {
      href: "/contact",
      label: "Talk to Expert",
      mobileLabel: "Expert",
      icon: "contact_phone",
    },
    {
      href: "/projects#portfolio",
      label: "Past Projects",
      mobileLabel: "Projects",
      icon: "photo_library",
    },
    {
      href: "/booking",
      label: "Schedule Call",
      mobileLabel: "Schedule",
      icon: "calendar_today",
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
      href: "/estimator",
      label: "Cost Estimator",
      mobileLabel: "Estimate",
      icon: "calculate",
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
      label: "Client Reviews",
      mobileLabel: "Reviews",
      icon: "star",
    },
    {
      href: "/careers",
      label: "Join Network",
      mobileLabel: "Join",
      icon: "badge",
    },
    {
      href: "/projects#portfolio",
      label: "Partnerships",
      mobileLabel: "Partners",
      icon: "photo_library",
    },
    {
      href: "/contact",
      label: "Partner With Us",
      mobileLabel: "Partner",
      icon: "handshake",
    },
  ],

  booking: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/booking#what-to-expect",
      label: "What to Expect",
      mobileLabel: "Expect",
      icon: "info",
    },
    {
      href: "/services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/estimator",
      label: "Quick Estimate",
      mobileLabel: "Estimate",
      icon: "calculate",
    },
    {
      href: "/contact",
      label: "Contact Us",
      mobileLabel: "Contact",
      icon: "contact_phone",
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
};

export type PageType = keyof typeof navigationConfigs;
