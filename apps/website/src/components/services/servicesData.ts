// Services Hub view-model adapter.
// Canonical public service records live in src/lib/data/service-routes.ts.
// This module maps canonical records into section-specific UI models so legacy
// sections can render without duplicating source-of-truth facts.

import {
  getPublishedServiceRoutes,
  isServiceDetailReady,
  type ServiceRecord,
} from "@/lib/data/service-routes";

export interface CoreService {
  slug: string;
  detailHref?: string;
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
  slug: string;
  detailHref?: string;
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
  links?: (string | null)[];
}

export interface WhyChooseUsItem {
  iconName: string;
  title: string;
  description: string;
  ctaLink?: string;
  ctaLinkText?: string;
}

const publishedServiceRecords = getPublishedServiceRoutes();

const coreServiceSlugs = [
  "commercial-construction",
  "commercial-tenant-improvements",
  "municipal-public-work",
  "preconstruction-planning",
  "procurement-trade-partnerships",
] as const;

const specialtyServiceSlugs = [
  "agricultural-winery-construction",
  "light-industrial-construction",
] as const;

const iconBySlug: Record<string, string> = {
  "commercial-construction": "engineering",
  "commercial-tenant-improvements": "domain",
  "municipal-public-work": "account_balance",
  "preconstruction-planning": "gps_fixed",
  "procurement-trade-partnerships": "local_shipping",
  "agricultural-winery-construction": "store",
  "light-industrial-construction": "precision_manufacturing",
};

function getServiceRecordBySlug(slug: string): ServiceRecord {
  const record = publishedServiceRecords.find(
    (service) => service.slug === slug,
  );
  if (!record) {
    throw new Error(`Missing published service record for slug: ${slug}`);
  }
  return record;
}

function toCoreService(record: ServiceRecord): CoreService {
  const features = record.focusAreas.slice(0, 7);
  const benefits = record.processStatements.slice(0, 5);
  const detailHref = isServiceDetailReady(record)
    ? `/services/${record.slug}`
    : undefined;
  const ctaLinkText = detailHref ? "View service page" : record.ctaLabel;

  return {
    slug: record.slug,
    ...(detailHref ? { detailHref } : {}),
    iconName: iconBySlug[record.slug] ?? "construction",
    title: record.title,
    subtitle: record.summary,
    description: record.overview,
    features,
    benefits,
    ...(detailHref ? { ctaLink: detailHref } : {}),
    ctaLinkText,
  };
}

function toSpecialtyService(record: ServiceRecord): SpecialtyService {
  const detailHref = isServiceDetailReady(record)
    ? `/services/${record.slug}`
    : undefined;

  return {
    slug: record.slug,
    ...(detailHref ? { detailHref } : {}),
    iconName: iconBySlug[record.slug] ?? "hub",
    title: record.title,
    subtitle: record.summary,
    description: record.overview,
    markets: record.supportedProjectTypes,
    capabilities: record.processStatements,
    features: record.focusAreas,
    note: `Proof references: ${record.proofReferences.join(", ")}`,
    ctaText: record.ctaLabel,
  };
}

export const coreServices: CoreService[] = coreServiceSlugs.map((slug) =>
  toCoreService(getServiceRecordBySlug(slug)),
);

export const specialtyServices: SpecialtyService[] = specialtyServiceSlugs.map(
  (slug) => toSpecialtyService(getServiceRecordBySlug(slug)),
);

// Service Areas
export const serviceAreas: ServiceArea[] = [
  {
    iconName: "place",
    title: "Tri-Cities Headquarters",
    areas: [
      "Pasco, WA",
      "Kennewick, WA",
      "Richland, WA",
      "West Richland, WA",
      "Benton County",
      "Franklin County",
    ],
    links: [
      "/locations/pasco",
      "/locations/kennewick",
      "/locations/richland",
      "/locations/west-richland",
      null,
      null,
    ],
  },
  {
    iconName: "travel_explore",
    title: "Extended Coverage",
    areas: [
      "Spokane, WA",
      "Yakima, WA",
      "Tacoma, WA",
      "Walla Walla, WA",
      "Omak, WA",
      "Hermiston, OR",
      "Pendleton, OR",
      "Coeur d'Alene, ID",
    ],
    links: [
      "/locations/spokane",
      "/locations/yakima",
      "/locations/tacoma",
      "/locations/walla-walla",
      "/locations/omak",
      "/locations/hermiston",
      "/locations/pendleton",
      "/locations/coeur-d-alene",
    ],
  },
];

// Why Choose Us
export const whyChooseUs: WhyChooseUsItem[] = [
  {
    iconName: "health_and_safety",
    title: ".64 EMR Safety Performance",
    description:
      "AGC-WA recognized performance with a .64 EMR, about 40% better than typical baseline. Safety planning and field controls are enforced in every phase.",
  },
  {
    iconName: "workspace_premium",
    title: "Cross-Discipline Field Experience",
    description:
      "Our team combines field and management experience across commercial, industrial, civic, and specialty projects throughout the Pacific Northwest.",
  },
  {
    iconName: "fact_check",
    title: "Open-Book Transparency",
    description:
      "Open-book pricing, direct assessments, and clear updates give you visibility into scope, cost, and key decisions from kickoff through closeout.",
  },
  {
    iconName: "diversity_3",
    title: "Partnership-Driven Trust",
    description:
      "We build long-term partnerships through reliable commitments, face-to-face accountability, and consistent follow-through before, during, and after turnover.",
  },
  {
    iconName: "military_tech",
    title: "650+ Completed Projects",
    description:
      "650+ projects delivered since 2010 with structured planning, field accountability, and steady follow-through under pressure.",
  },
  {
    iconName: "verified",
    title: "3-State Licensed and Insured",
    description:
      "Fully licensed and insured for commercial construction across Washington, Oregon, and Idaho.",
  },
];
