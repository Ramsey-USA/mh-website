// Navigation item interface
export interface NavigationItem {
  href: string;
  label: string;
  mobileLabel?: string; // Shorter label for mobile screens
  icon: string;
}

const navigationLabelTranslations: Record<string, string> = {
  Active: "Activo",
  "Active Use": "Uso activo",
  Apply: "Aplicar",
  "Apply Now": "Aplicar ahora",
  Areas: "Areas",
  Awards: "Premios",
  "Awards & Recognition": "Premios y reconocimiento",
  Badges: "Insignias",
  "Become an Ally": "Hazte aliado",
  "Begin Partnership": "Iniciar alianza",
  Benefits: "Beneficios",
  Capabilities: "Capacidades",
  "Career Growth": "Crecimiento profesional",
  "Chain of Command": "Cadena de mando",
  "Client Partners": "Socios clientes",
  "Client Stories": "Historias de clientes",
  "Client Testimonials": "Testimonios de clientes",
  Commanders: "Comandantes",
  "Common Questions": "Preguntas comunes",
  "Communication & Support": "Comunicacion y soporte",
  "Company Culture": "Cultura de la empresa",
  "Company Evolution": "Evolucion de la empresa",
  Compliance: "Cumplimiento",
  Comply: "Cumplir",
  "Construction Expertise": "Experiencia en construccion",
  Contact: "Contacto",
  Core: "Base",
  "Core Services": "Servicios principales",
  "Core Values": "Valores centrales",
  Credentials: "Credenciales",
  Creds: "Creds",
  Culture: "Cultura",
  Discount: "Descuento",
  "Employee Stories": "Historias del equipo",
  Evolution: "Evolucion",
  Expertise: "Experiencia",
  FAQ: "FAQ",
  "Field Officers": "Oficiales de campo",
  "Field Ops": "Operaciones de campo",
  Foundation: "Fundamento",
  General: "General",
  "General Information": "Informacion general",
  "Get Started": "Comenzar",
  Gov: "Gob",
  "Government Projects": "Proyectos gubernamentales",
  Growth: "Crecimiento",
  "How to Apply": "Como aplicar",
  "Latest News": "Ultimas noticias",
  Leadership: "Liderazgo",
  "Leave a Review": "Dejar una resena",
  Location: "Ubicacion",
  Logistics: "Logistica",
  "Logistics Command": "Comando logistico",
  "MISH Program": "Programa MISH",
  "Mission Commanders": "Comandantes de mision",
  News: "Noticias",
  "Office Location": "Ubicacion de oficina",
  "Open Positions": "Puestos abiertos",
  Opportunities: "Oportunidades",
  Options: "Opciones",
  "Our Partners": "Nuestros socios",
  "Our Process": "Nuestro proceso",
  "Our Services": "Nuestros servicios",
  "Our Stats": "Nuestras estadisticas",
  Overview: "Resumen",
  Partner: "Socio",
  Partners: "Socios",
  "Partnership Options": "Opciones de alianza",
  "Partnership Paths": "Rutas de alianza",
  Paths: "Rutas",
  Philosophy: "Filosofia",
  Photos: "Fotos",
  Portfolio: "Portafolio",
  Positions: "Puestos",
  Pricing: "Precios",
  "Pricing & Payment": "Precios y pagos",
  Process: "Proceso",
  "Process & Partnership": "Proceso y alianza",
  Program: "Programa",
  "Quick Contact": "Contacto rapido",
  Record: "Registro",
  Review: "Resena",
  Reviews: "Resenas",
  Safety: "Seguridad",
  "Safety & Quality": "Seguridad y calidad",
  "Safety Excellence": "Excelencia en seguridad",
  "Safety Record": "Historial de seguridad",
  "Service Areas": "Areas de servicio",
  Services: "Servicios",
  Snapshots: "Instantaneas",
  "Spec Ops": "Ops especiales",
  "Special Operations": "Operaciones especiales",
  Specialty: "Especialidad",
  "Specialty Services": "Servicios especializados",
  Start: "Inicio",
  Stats: "Estadisticas",
  Stories: "Historias",
  "Strategic Partnerships": "Alianzas estrategicas",
  Support: "Soporte",
  Team: "Equipo",
  "Team Stories": "Historias del equipo",
  Technical: "Tecnico",
  "Technical & PM": "Tecnico y PM",
  Testimonials: "Testimonios",
  "The Upper Brass": "Alto mando",
  "Track Record": "Trayectoria",
  Trust: "Confianza",
  "Trust In Action": "Confianza en accion",
  Values: "Valores",
  "Verified Badges": "Insignias verificadas",
  Veteran: "Veterano",
  "Veteran Benefits": "Beneficios para veteranos",
  "Veteran Discount": "Descuento para veteranos",
  "Veteran Foundation": "Base veterana",
  "Veteran Support": "Apoyo a veteranos",
  "Veteran-Owned": "Empresa veterana",
  Veterans: "Veteranos",
  "Why Choose Us": "Por que elegirnos",
  "Why MHC": "Por que MHC",
  "Why Partner": "Por que asociarse",
  "Why Us": "Por que nosotros",
  "Why Values Matter": "Por que importan los valores",
  "Working Together": "Trabajando juntos",
};

function translateNavigationLabel(label: string, locale: "en" | "es"): string {
  if (locale !== "es") {
    return label;
  }

  return navigationLabelTranslations[label] ?? label;
}

// Helper function to get appropriate label based on screen size
export function getNavigationLabel(
  item: NavigationItem,
  isMobile = false,
  locale: "en" | "es" = "en",
): string {
  const baseLabel =
    isMobile && item.mobileLabel ? item.mobileLabel : item.label;
  return translateNavigationLabel(baseLabel, locale);
}

// Page-specific navigation configurations
export const navigationConfigs = {
  home: [
    {
      href: "#services",
      label: "Services",
      mobileLabel: "Services",
      icon: "build",
    },
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
      href: "#partnership-philosophy",
      label: "Philosophy",
      mobileLabel: "Philosophy",
      icon: "handshake",
    },
    {
      href: "#team",
      label: "Chain of Command",
      mobileLabel: "Team",
      icon: "military_tech",
    },
    {
      href: "#values",
      label: "Why Values Matter",
      mobileLabel: "Values",
      icon: "verified",
    },
    {
      href: "#company-evolution",
      label: "Company Evolution",
      mobileLabel: "Evolution",
      icon: "timeline",
    },
    {
      href: "#stats",
      label: "Track Record",
      mobileLabel: "Stats",
      icon: "analytics",
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
      href: "#testimonials",
      label: "Client Partners",
      mobileLabel: "Reviews",
      icon: "forum",
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
      href: "#expertise",
      label: "Construction Expertise",
      mobileLabel: "Expertise",
      icon: "engineering",
    },
    {
      href: "#testimonials",
      label: "Trust In Action",
      mobileLabel: "Trust",
      icon: "verified",
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
      href: "#service-areas",
      label: "Service Areas",
      mobileLabel: "Areas",
      icon: "map",
    },
    {
      href: "#testimonials-faq",
      label: "Common Questions",
      mobileLabel: "FAQ",
      icon: "help",
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
      href: "#communication",
      label: "Communication & Support",
      mobileLabel: "Support",
      icon: "campaign",
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
      href: "#portfolio",
      label: "Trust In Action",
      mobileLabel: "Portfolio",
      icon: "verified",
    },
    {
      href: "#capabilities",
      label: "Capabilities",
      mobileLabel: "Capabilities",
      icon: "engineering",
    },
    {
      href: "#Veteran-Owned",
      label: "Veteran-Owned",
      mobileLabel: "Veteran",
      icon: "military_tech",
    },
    {
      href: "#stats",
      label: "Our Stats",
      mobileLabel: "Stats",
      icon: "analytics",
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
      href: "#employee-testimonials",
      label: "Team Stories",
      mobileLabel: "Stories",
      icon: "star",
    },
    {
      href: "#field-officers",
      label: "Field Officers",
      mobileLabel: "Field Ops",
      icon: "construction",
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
      href: "#company-culture",
      label: "Company Culture",
      mobileLabel: "Culture",
      icon: "diversity_3",
    },
    {
      href: "#career-growth",
      label: "Career Growth",
      mobileLabel: "Growth",
      icon: "school",
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
      href: "#quick-contact",
      label: "Quick Contact",
      mobileLabel: "Contact",
      icon: "forum",
    },
    {
      href: "#partnership-pathways-heading",
      label: "Partnership Paths",
      mobileLabel: "Paths",
      icon: "handshake",
    },
    {
      href: "#office-location-heading",
      label: "Office Location",
      mobileLabel: "Location",
      icon: "location_on",
    },
    {
      href: "#partnership-options-heading",
      label: "Partnership Options",
      mobileLabel: "Options",
      icon: "handshake",
    },
    {
      href: "#service-areas",
      label: "Service Areas",
      mobileLabel: "Areas",
      icon: "map",
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

  allies: [
    {
      href: "#vendors",
      label: "Our Partners",
      mobileLabel: "Partners",
      icon: "star",
    },
    {
      href: "#partnership",
      label: "Why MHC",
      mobileLabel: "Why MHC",
      icon: "handshake",
    },
    {
      href: "#apply",
      label: "Become an Ally",
      mobileLabel: "Apply",
      icon: "diversity_3",
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

  veterans: [
    {
      href: "#veteran-leadership",
      label: "Veteran Foundation",
      mobileLabel: "Foundation",
      icon: "verified",
    },
    {
      href: "#combat-veteran-discount",
      label: "Veteran Discount",
      mobileLabel: "Discount",
      icon: "military_tech",
    },
    {
      href: "#year-round-support",
      label: "Veteran Support",
      mobileLabel: "Support",
      icon: "volunteer_activism",
    },
    {
      href: "#veteran-partnerships",
      label: "Strategic Partnerships",
      mobileLabel: "Partners",
      icon: "groups",
    },
  ],

  safety: [
    {
      href: "#credentials",
      label: "Credentials",
      mobileLabel: "Creds",
      icon: "workspace_premium",
    },
    {
      href: "#credential-badges",
      label: "Verified Badges",
      mobileLabel: "Badges",
      icon: "verified",
    },
    {
      href: "#program",
      label: "MISH Program",
      mobileLabel: "Program",
      icon: "menu_book",
    },
    {
      href: "#performance",
      label: "Safety Record",
      mobileLabel: "Record",
      icon: "shield",
    },
    {
      href: "#evidence",
      label: "Active Use",
      mobileLabel: "Active",
      icon: "fact_check",
    },
    {
      href: "#compliance",
      label: "Compliance",
      mobileLabel: "Comply",
      icon: "gpp_good",
    },
    {
      href: "#snapshots",
      label: "Snapshots",
      mobileLabel: "Photos",
      icon: "photo_camera",
    },
  ],
};

export type PageType = keyof typeof navigationConfigs;
