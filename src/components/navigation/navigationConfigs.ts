// Page-specific navigation configurations
export const navigationConfigs = {
  home: [
    {
      href: "/#feature-ai-estimator",
      label: "AI Estimator",
      icon: "smart_toy",
    },
    {
      href: "/#feature-3d-explorer",
      label: "3D Explorer",
      icon: "visibility",
    },
    {
      href: "/#core-values",
      label: "Our Values",
      icon: "shield",
    },
    {
      href: "/#ai-features-cta",
      label: "Get Started",
      icon: "handshake",
    },
    {
      href: "/estimator",
      label: "Try Estimator",
      icon: "calculate",
    },
    {
      href: "/#partnership-cta",
      label: "Start Partnership",
      icon: "launch",
    },
    { href: "/contact", label: "Contact", icon: "contact_phone" },
  ],

  about: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/about#partnership-philosophy",
      label: "Our Philosophy",
      icon: "handshake",
    },
    { href: "/about#values", label: "Core Values", icon: "shield" },
    { href: "/about#team", label: "Leadership Team", icon: "people" },
    { href: "/about#testimonials", label: "Client Reviews", icon: "star" },
    { href: "/about#safety", label: "Safety & Compliance", icon: "security" },
    { href: "/about#awards", label: "Awards & Recognition", icon: "emoji_events" },
    { href: "/contact", label: "Partner With Us", icon: "contact_phone" },
  ],

  services: [
    { href: "/", label: "Home", icon: "home" },
    {
      href: "/services#core-services",
      label: "Core Services",
      icon: "build",
    },
    { href: "/services#inspections", label: "Quality Inspections", icon: "fact_check" },
    { href: "/services#maintenance", label: "Maintenance & Repairs", icon: "build_circle" },
    { href: "/estimator", label: "Get Estimate", icon: "calculate" },
    { href: "/contact", label: "Start Project", icon: "contact_phone" },
  ],

  projects: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/projects#project-stats", label: "Our Stats", icon: "analytics" },
    { href: "/projects#portfolio", label: "Portfolio", icon: "photo_library" },
    {
      href: "/projects#veteran-owned",
      label: "Veteran-Owned",
      icon: "military_tech",
    },
    { href: "/estimator", label: "Get Estimate", icon: "calculate" },
    { href: "/contact", label: "Start Project", icon: "contact_phone" },
  ],

  team: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/about#values", label: "Our Values", icon: "shield" },
    { href: "/about#team", label: "Leadership Team", icon: "people" },
    { href: "/about#safety", label: "Safety & Compliance", icon: "security" },
    { href: "/services#core-services", label: "What We Do", icon: "build" },
    { href: "/careers", label: "Join Team", icon: "badge" },
    { href: "/contact", label: "Meet Us", icon: "contact_phone" },
  ],

  careers: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/team", label: "Meet Team", icon: "people" },
    { href: "/about#values", label: "Our Values", icon: "shield" },
    { href: "/about#safety", label: "Safety & Compliance", icon: "security" },
    { href: "/services#core-services", label: "What We Do", icon: "build" },
    { href: "/projects#portfolio", label: "Our Work", icon: "photo_library" },
    { href: "/contact", label: "Apply Now", icon: "contact_phone" },
  ],

  contact: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/contact#contact-form", label: "Contact Form", icon: "edit" },
    { href: "/estimator", label: "Get Estimate", icon: "calculate" },
    { href: "/booking", label: "Quick Booking", icon: "calendar_today" },
    {
      href: "/contact#urgent-support",
      label: "Urgent Support",
      icon: "engineering",
    },
    { href: "/about#team", label: "Our Team", icon: "people" },
    { href: "/projects#portfolio", label: "Our Work", icon: "photo_library" },
  ],

  estimator: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/services#core-services", label: "Our Services", icon: "build" },
    { href: "/services#maintenance", label: "Maintenance & Repairs", icon: "build_circle" },
    { href: "/contact", label: "Talk to Expert", icon: "contact_phone" },
    {
      href: "/projects#portfolio",
      label: "Past Projects",
      icon: "photo_library",
    },
    { href: "/booking", label: "Schedule Call", icon: "calendar_today" },
  ],

  government: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/services#core-services", label: "Our Services", icon: "build" },
    { href: "/services#inspections", label: "Quality Inspections", icon: "fact_check" },
    { href: "/estimator", label: "Cost Estimator", icon: "calculate" },
    { href: "/about#team", label: "Veteran Team", icon: "people" },
    { href: "/contact", label: "Get Started", icon: "contact_phone" },
  ],

  tradePartners: [
    { href: "/", label: "Home", icon: "home" },
    { href: "/services#core-services", label: "Our Services", icon: "build" },
    { href: "/about#testimonials", label: "Client Reviews", icon: "star" },
    { href: "/careers", label: "Join Network", icon: "badge" },
    {
      href: "/projects#portfolio",
      label: "Partnerships",
      icon: "photo_library",
    },
    { href: "/contact", label: "Partner With Us", icon: "handshake" },
  ],
};

export type PageType = keyof typeof navigationConfigs;
