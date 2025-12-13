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
      href: "/trade-partners",
      label: "Build Partnership",
      mobileLabel: "Partner",
      icon: "diversity_3",
    },
    { href: "/contact", label: "Contact", icon: "contact_phone" },
  ],

  about: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/about#partnership-philosophy",
      label: "Our Values",
      mobileLabel: "Values",
      icon: "foundation",
    },
    {
      href: "/about#values",
      label: "Four Core Values",
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
      label: "Trust In Action",
      mobileLabel: "Trust",
      icon: "verified",
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
      label: "Begin Your Project",
      mobileLabel: "Start",
      icon: "handshake",
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
      icon: "verified",
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
      label: "Our Foundation",
      mobileLabel: "Values",
      icon: "foundation",
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
      label: "Build With Us",
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
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/veterans#fishing-event",
      label: "Fishing Event",
      mobileLabel: "Event",
      icon: "phishing",
    },
    {
      href: "/veterans#sponsorship",
      label: "Become a Sponsor",
      mobileLabel: "Sponsor",
      icon: "handshake",
    },
    {
      href: "/about#team",
      label: "Veteran Leadership",
      mobileLabel: "Leadership",
      icon: "military_tech",
    },
    {
      href: "/careers#veteran-benefits",
      label: "Veteran Careers",
      mobileLabel: "Careers",
      icon: "work",
    },
    {
      href: "/trade-partners",
      label: "Veteran Trade Partners",
      mobileLabel: "Partners",
      icon: "business",
    },
    {
      href: "/contact",
      label: "Get Involved",
      mobileLabel: "Involve",
      icon: "contact_phone",
    },
  ],
};

export type PageType = keyof typeof navigationConfigs;
