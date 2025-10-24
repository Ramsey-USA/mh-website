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
  isMobile: boolean = false
): string {
  return isMobile && item.mobileLabel ? item.mobileLabel : item.label;
}

// Page-specific navigation configurations
export const navigationConfigs = {
  home: [
    {
      href: "/#feature-ai-estimator",
      label: "AI Estimator",
      mobileLabel: "AI Est.",
      icon: "smart_toy",
    },
    {
      href: "/#feature-3d-explorer",
      label: "3D Explorer",
      mobileLabel: "3D View",
      icon: "visibility",
    },
    {
      href: "/#core-values",
      label: "Our Values",
      mobileLabel: "Values",
      icon: "shield",
    },
    {
      href: "/#ai-features-cta",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "handshake",
    },
    {
      href: "/estimator",
      label: "Try Estimator",
      mobileLabel: "Estimate",
      icon: "calculate",
    },
    {
      href: "/#partnership-cta",
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
      href: "/contact#contact-form",
      label: "Contact Form",
      mobileLabel: "Form",
      icon: "edit",
    },
    {
      href: "/estimator",
      label: "Get Estimate",
      mobileLabel: "Estimate",
      icon: "calculate",
    },
    {
      href: "/booking",
      label: "Quick Booking",
      mobileLabel: "Book",
      icon: "calendar_today",
    },
    {
      href: "/contact#urgent-support",
      label: "Urgent Support",
      mobileLabel: "Urgent",
      icon: "engineering",
    },
    {
      href: "/about#team",
      label: "Our Team",
      mobileLabel: "Team",
      icon: "people",
    },
    {
      href: "/projects#portfolio",
      label: "Our Work",
      mobileLabel: "Work",
      icon: "photo_library",
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
      href: "/booking#consultation",
      label: "Consultation",
      mobileLabel: "Consult",
      icon: "event",
    },
    {
      href: "/booking#project-types",
      label: "Project Types",
      mobileLabel: "Types",
      icon: "build",
    },
    {
      href: "/estimator",
      label: "Get Estimate",
      mobileLabel: "Estimate",
      icon: "calculate",
    },
    {
      href: "/services#core-services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build_circle",
    },
    {
      href: "/about#team",
      label: "Meet Team",
      mobileLabel: "Team",
      icon: "people",
    },
    {
      href: "/contact",
      label: "Contact Us",
      mobileLabel: "Contact",
      icon: "contact_phone",
    },
  ],

  testimonials: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/testimonials#client-reviews",
      label: "Client Reviews",
      mobileLabel: "Reviews",
      icon: "star",
    },
    {
      href: "/projects#portfolio",
      label: "Our Work",
      mobileLabel: "Work",
      icon: "photo_library",
    },
    {
      href: "/about#team",
      label: "Meet Team",
      mobileLabel: "Team",
      icon: "people",
    },
    {
      href: "/services#core-services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "/estimator",
      label: "Get Estimate",
      mobileLabel: "Estimate",
      icon: "calculate",
    },
    {
      href: "/contact",
      label: "Share Experience",
      mobileLabel: "Share",
      icon: "contact_phone",
    },
  ],
};

export type PageType = keyof typeof navigationConfigs;
