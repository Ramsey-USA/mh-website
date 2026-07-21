export type NewsInsightsLocale = "en" | "es";

import {
  type ContentGovernanceRecord,
  isPubliclyVisibleContent,
} from "@/lib/content/content-governance";

export type NewsInsightsCard = {
  icon: string;
  category: string;
  title: string;
  date: string;
  description: string;
  href: string;
  linkText: string;
  categoryColor: "secondary" | "primary" | "bronze";
  accentGradient?: string;
  glowGradient?: string;
  enhancedIcon?: boolean;
};

export type NewsInsightsContent = {
  breadcrumbCurrent: string;
  subtitle: string;
  title: string;
  description: string;
  footerNote: string;
  cards: NewsInsightsCard[];
  governance?: ContentGovernanceRecord;
};

const NEWS_INSIGHTS_GOVERNANCE: ContentGovernanceRecord = {
  stableId: "news-insights:global",
  ownerRole: "marketing-manager",
  lifecycle: "published",
  approvalState: "approved",
  publishState: "public",
  approvalReference: "News insights editorial approval",
  nextReviewAt: "2027-06-30",
  sourceReferences: [
    {
      sourceType: "route",
      reference: "/news",
    },
    {
      sourceType: "route",
      reference: "/about/details",
    },
  ],
};

const CONTENT_BY_LOCALE: Record<NewsInsightsLocale, NewsInsightsContent> = {
  en: {
    breadcrumbCurrent: "News and Insights",
    subtitle: "Operational proof",
    title: "Specialties by mission lane",
    description:
      "Repository-managed updates that show how MH Construction applies Procore, safety planning, trade coordination, and veteran-led accountability across real mission lanes.",
    footerNote:
      "If you need execution detail for your site, we can walk through approach, risks, and next steps in the first conversation.",
    cards: [
      {
        icon: "precision_manufacturing",
        category: "Mission Management",
        title: "CRM and Field Coordination",
        date: "2026-06-30",
        description:
          "We coordinate scope, RFIs, submittals, and field sequences in Procore to reduce rework and keep execution aligned with operating goals.",
        href: "/contact",
        linkText: "Start a coordination conversation",
        categoryColor: "secondary",
        enhancedIcon: true,
      },
      {
        icon: "handshake",
        category: "Trade Delivery",
        title: "Door and Hardware Installation",
        date: "2026-06-30",
        description:
          "We lead door and hardware installation with opening control, compliance alignment, and coordinated handoff for new facilities and active fit-outs.",
        href: "/allies",
        linkText: "Review trade partner pathways",
        categoryColor: "secondary",
        enhancedIcon: true,
      },
      {
        icon: "workspace_premium",
        category: "Safety and Quality",
        title: "Municipal and Occupied-Site Delivery",
        date: "2026-06-30",
        description:
          "Municipal and occupied-site delivery requires documented safety, control plans, and field traceability to maintain compliance and continuity.",
        href: "/about#safety",
        linkText: "Review the safety framework",
        categoryColor: "secondary",
        enhancedIcon: true,
      },
      {
        icon: "lightbulb",
        category: "Field Planning",
        title: "AG and Winery Sequencing",
        date: "2026-06-30",
        description:
          "For AG and winery work, we plan mission sequencing around equipment, production schedules, and harvest windows to limit disruption.",
        href: "/services",
        linkText: "Explore delivery planning",
        categoryColor: "primary",
        enhancedIcon: true,
      },
      {
        icon: "military_tech",
        category: "Leadership",
        title: "Veteran-Owned Accountability",
        date: "2026-06-30",
        description:
          "Veteran-owned leadership drives accountability, schedule discipline, and direct communication with owners, operators, and design teams.",
        href: "/about",
        linkText: "Read leadership context",
        categoryColor: "bronze",
        accentGradient:
          "bg-linear-to-r from-bronze-600 via-bronze-700 to-bronze-800",
        glowGradient: "bg-linear-to-br from-bronze-700/40 to-bronze-800/40",
        enhancedIcon: true,
      },
    ],
  },
  es: {
    breadcrumbCurrent: "Noticias e ideas",
    subtitle: "Prueba operativa",
    title: "Especialidades por ruta de misión",
    description:
      "Actualizaciones administradas en el repositorio que muestran cómo MH Construction aplica Procore, planificación de seguridad, coordinación de oficios y responsabilidad liderada por veteranos en rutas de misión reales.",
    footerNote:
      "Si necesita detalle de ejecución para su sitio, podemos revisar el enfoque, los riesgos y los siguientes pasos en la primera conversación.",
    cards: [
      {
        icon: "precision_manufacturing",
        category: "Gestión de misión",
        title: "CRM y coordinación de campo",
        date: "2026-06-30",
        description:
          "Coordinamos alcance, RFIs, submittals y secuencias de campo en Procore para reducir retrabajo y sostener la ejecución alineada con los objetivos operativos.",
        href: "/contact",
        linkText: "Iniciar una conversación de coordinación",
        categoryColor: "secondary",
        enhancedIcon: true,
      },
      {
        icon: "handshake",
        category: "Entrega de oficios",
        title: "Instalación de puertas y herrajes",
        date: "2026-06-30",
        description:
          "Lideramos la instalación de puertas y herrajes con control de aperturas, alineación de cumplimiento y entrega coordinada para instalaciones nuevas y acondicionamientos activos.",
        href: "/allies",
        linkText: "Revisar rutas para aliados de oficio",
        categoryColor: "secondary",
        enhancedIcon: true,
      },
      {
        icon: "workspace_premium",
        category: "Seguridad y calidad",
        title: "Entrega en sitios municipales y ocupados",
        date: "2026-06-30",
        description:
          "La entrega en sitios municipales y ocupados exige seguridad documentada, planes de control y trazabilidad en campo para sostener cumplimiento y continuidad.",
        href: "/about#safety",
        linkText: "Revisar el marco de seguridad",
        categoryColor: "secondary",
        enhancedIcon: true,
      },
      {
        icon: "lightbulb",
        category: "Planificación en campo",
        title: "Secuenciación para AG y bodegas",
        date: "2026-06-30",
        description:
          "En trabajos agrícolas y de bodega, planeamos secuencias de obra alrededor de equipos, producción y ventanas de cosecha para reducir interrupciones.",
        href: "/services",
        linkText: "Explorar planificación de entrega",
        categoryColor: "primary",
        enhancedIcon: true,
      },
      {
        icon: "military_tech",
        category: "Liderazgo",
        title: "Responsabilidad veterana",
        date: "2026-06-30",
        description:
          "El liderazgo veterano sostiene responsabilidad, disciplina de agenda y comunicación directa con dueños, operadores y equipos de diseño.",
        href: "/about",
        linkText: "Leer contexto de liderazgo",
        categoryColor: "bronze",
        accentGradient:
          "bg-linear-to-r from-bronze-600 via-bronze-700 to-bronze-800",
        glowGradient: "bg-linear-to-br from-bronze-700/40 to-bronze-800/40",
        enhancedIcon: true,
      },
    ],
  },
};

export function getNewsInsightsContent(
  locale: NewsInsightsLocale,
): NewsInsightsContent {
  const content = CONTENT_BY_LOCALE[locale];

  if (!isPubliclyVisibleContent(NEWS_INSIGHTS_GOVERNANCE)) {
    return {
      ...CONTENT_BY_LOCALE.en,
      governance: NEWS_INSIGHTS_GOVERNANCE,
    };
  }

  return {
    ...content,
    governance: NEWS_INSIGHTS_GOVERNANCE,
  };
}
