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
    {
      href: "#stats",
      label: "Track Record",
      mobileLabel: "Stats",
      icon: "analytics",
    },
    {
      href: "#testimonials",
      label: "Client Partners",
      mobileLabel: "Reviews",
      icon: "verified",
    },
    {
      href: "#partnership-philosophy",
      label: "Partnership Philosophy",
      mobileLabel: "Philosophy",
      icon: "handshake",
    },
    {
      href: "#evolution",
      label: "Company Evolution",
      mobileLabel: "Evolution",
      icon: "timeline",
    },
    {
      href: "#leadership",
      label: "Chain of Command",
      mobileLabel: "Team",
      icon: "military_tech",
    },
    {
      href: "#awards",
      label: "Awards & Recognition",
      mobileLabel: "Awards",
      icon: "emoji_events",
    },
    {
      href: "#safety",
      label: "Safety Excellence",
      mobileLabel: "Safety",
      icon: "shield",
    },
    {
      href: "#news",
      label: "Latest News",
      mobileLabel: "News",
      icon: "newspaper",
    },
  ],

  services: [
    {
      href: "#expertise",
      label: "Construction Expertise",
      mobileLabel: "Expertise",
      icon: "engineering",
    },
    {
      href: "#core-services",
      label: "Core Services",
      mobileLabel: "Core",
      icon: "build",
    },
    {
      href: "#specialty",
      label: "Specialty Services",
      mobileLabel: "Specialty",
      icon: "construction",
    },
    {
      href: "#testimonials",
      label: "Trust In Action",
      mobileLabel: "Trust",
      icon: "verified",
    },
    {
      href: "#government",
      label: "Government Projects",
      mobileLabel: "Gov",
      icon: "account_balance",
    },
    {
      href: "#service-areas",
      label: "Service Areas",
      mobileLabel: "Areas",
      icon: "map",
    },
    {
      href: "#process",
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

  testimonials: [
    {
      href: "#client-testimonials",
      label: "Client Testimonials",
      mobileLabel: "Reviews",
      icon: "verified",
    },
    {
      href: "#why-choose",
      label: "Why Choose Us",
      mobileLabel: "Why Us",
      icon: "star",
    },
    {
      href: "#leave-review",
      label: "Leave a Review",
      mobileLabel: "Review",
      icon: "rate_review",
    },
  ],

  faq: [
    {
      href: "#general",
      label: "General Information",
      mobileLabel: "General",
      icon: "info",
    },
    {
      href: "#process",
      label: "Process & Partnership",
      mobileLabel: "Process",
      icon: "timeline",
    },
    {
      href: "#safety",
      label: "Safety & Quality",
      mobileLabel: "Safety",
      icon: "shield",
    },
    {
      href: "#technology",
      label: "Communication & Tech",
      mobileLabel: "Tech",
      icon: "devices",
    },
    {
      href: "#veterans",
      label: "Veteran Benefits",
      mobileLabel: "Veterans",
      icon: "military_tech",
    },
    {
      href: "#technical",
      label: "Technical & PM",
      mobileLabel: "Technical",
      icon: "engineering",
    },
    {
      href: "#partnership",
      label: "Working Together",
      mobileLabel: "Partners",
      icon: "handshake",
    },
    {
      href: "#financial",
      label: "Pricing & Payment",
      mobileLabel: "Pricing",
      icon: "payments",
    },
  ],

  projects: [
    {
      href: "#stats",
      label: "Our Stats",
      mobileLabel: "Stats",
      icon: "analytics",
    },
    {
      href: "#portfolio",
      label: "Trust In Action",
      mobileLabel: "Portfolio",
      icon: "verified",
    },
    {
      href: "#veteran-owned",
      label: "Veteran-Owned",
      mobileLabel: "Veteran",
      icon: "military_tech",
    },
    {
      href: "#capabilities",
      label: "Capabilities",
      mobileLabel: "Capabilities",
      icon: "engineering",
    },
    {
      href: "#testimonials",
      label: "Client Stories",
      mobileLabel: "Stories",
      icon: "star",
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
    {
      href: "#contact-form",
      label: "Contact Form",
      mobileLabel: "Form",
      icon: "contact_mail",
    },
    {
      href: "#location",
      label: "Location & Hours",
      mobileLabel: "Location",
      icon: "location_on",
    },
    {
      href: "#urgent",
      label: "Urgent Support",
      mobileLabel: "Urgent",
      icon: "bolt",
    },
  ],

  publicSector: [
    {
      href: "#overview",
      label: "Overview",
      mobileLabel: "Overview",
      icon: "info",
    },
    {
      href: "#services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "#compliance",
      label: "Compliance",
      mobileLabel: "Compliance",
      icon: "fact_check",
    },
    {
      href: "#contact",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "contact_phone",
    },
  ],

  government: [
    {
      href: "#overview",
      label: "Overview",
      mobileLabel: "Overview",
      icon: "info",
    },
    {
      href: "#services",
      label: "Our Services",
      mobileLabel: "Services",
      icon: "build",
    },
    {
      href: "#compliance",
      label: "Compliance",
      mobileLabel: "Compliance",
      icon: "fact_check",
    },
    {
      href: "#contact",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "contact_phone",
    },
  ],

  allies: [
    {
      href: "#overview",
      label: "Overview",
      mobileLabel: "Overview",
      icon: "info",
    },
    {
      href: "#benefits",
      label: "Benefits",
      mobileLabel: "Benefits",
      icon: "verified",
    },
    {
      href: "#partnership",
      label: "Partnership",
      mobileLabel: "Partner",
      icon: "handshake",
    },
    {
      href: "#contact",
      label: "Get Started",
      mobileLabel: "Start",
      icon: "contact_phone",
    },
  ],

  tradePartners: [
    {
      href: "#overview",
      label: "Overview",
      mobileLabel: "Overview",
      icon: "info",
    },
    {
      href: "#benefits",
      label: "Benefits",
      mobileLabel: "Benefits",
      icon: "verified",
    },
    {
      href: "#opportunities",
      label: "Opportunities",
      mobileLabel: "Opportunities",
      icon: "handshake",
    },
    {
      href: "#contact",
      label: "Begin Partnership",
      mobileLabel: "Partner",
      icon: "diversity_3",
    },
  ],

  urgent: [
    {
      href: "#contact",
      label: "Emergency Contact",
      mobileLabel: "Contact",
      icon: "phone",
    },
    {
      href: "#focus",
      label: "Our Focus",
      mobileLabel: "Focus",
      icon: "target",
    },
    {
      href: "#capabilities",
      label: "Our Capabilities",
      mobileLabel: "Capabilities",
      icon: "engineering",
    },
    {
      href: "#equipment",
      label: "Equipment & Operators",
      mobileLabel: "Equipment",
      icon: "precision_manufacturing",
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
