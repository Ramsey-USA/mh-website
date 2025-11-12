import { type Metadata } from "next";

/**
 * Centralized SEO Metadata Configuration
 * Each page's metadata optimized for 100% SEO score
 */

const baseUrl = process.env["NEXT_PUBLIC_BASE_URL"] || "https://www.mhc-gc.com";

export const pageMetadata: Record<string, Metadata> = {
  "/": {
    title:
      "MH Construction | AI-Powered Veteran-Owned General Contractor - Pasco, WA",
    description:
      "Revolutionary AI-powered construction intelligence with General MH military assistant. Veteran-owned general contractor serving Tri-Cities, WA since 2010. Expert concrete, carpentry, and construction management with cutting-edge technology and military precision.",
    keywords: [
      "AI construction assistant",
      "veteran-owned contractor Pasco",
      "Tri-Cities general contractor",
      "military precision construction",
      "AI cost estimator",
      "construction intelligence Washington",
      "Pasco WA contractor",
      "veteran benefits construction",
      "General MH military AI",
    ],
    openGraph: {
      title: "MH Construction | AI-Powered Veteran-Owned Excellence",
      description:
        "Revolutionary construction services with AI-powered estimating and military precision. Serving the Pacific Northwest since 2010.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/`,
    },
    twitter: {
      card: "summary_large_image",
      title: "MH Construction | AI-Powered Construction",
      description:
        "Veteran-owned general contractor with cutting-edge AI technology. Building partnerships, not just projects.",
    },
    alternates: {
      canonical: "/",
    },
  },
  "/about": {
    title:
      "About MH Construction | Veteran-Owned Partnership-Driven Excellence - Pasco, WA",
    description:
      "Founded in 2010, veteran-owned since January 2025 under Army veteran leadership. MH Construction brings military precision, authentic partnerships, and cutting-edge technology to commercial construction in the Tri-Cities area. Meet our leadership team committed to Building for the Client, NOT the Dollar.",
    keywords: [
      "veteran-owned construction company",
      "military precision construction",
      "Pasco WA contractor history",
      "construction company values",
      "partnership-driven contractor",
      "Tri-Cities construction team",
      "Army veteran contractor",
      "transparent construction practices",
      "MH Construction history",
    ],
    openGraph: {
      title: "About MH Construction | Veteran-Owned Since 2025",
      description:
        "Military precision meets construction excellence. Founded 2010, veteran-owned 2025. Meet the partnership team transforming the Pacific Northwest construction industry.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/about`,
    },
    twitter: {
      card: "summary_large_image",
      title: "About MH Construction",
      description:
        "Veteran-owned construction company with military values and partnership focus.",
    },
    alternates: {
      canonical: "/about",
    },
  },
  "/services": {
    title:
      "Construction Services | Concrete, Carpentry & General Contracting - MH Construction",
    description:
      "Comprehensive construction management services in Pasco, WA and Tri-Cities area. Expert concrete work, carpentry, commercial projects, tenant improvements, and site development. Partnership-focused approach with AI-powered cost estimating and military precision execution.",
    keywords: [
      "construction services Pasco WA",
      "commercial construction Tri-Cities",
      "concrete services Washington",
      "carpentry contractor Pasco",
      "tenant improvements",
      "site development services",
      "construction management",
      "general contractor services",
      "commercial building Tri-Cities",
    ],
    openGraph: {
      title: "Construction Services | MH Construction",
      description:
        "Expert concrete, carpentry, and construction management services with AI-powered estimating and veteran-owned excellence.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/services`,
    },
    twitter: {
      card: "summary_large_image",
      title: "MH Construction Services",
      description:
        "Comprehensive construction services with partnership focus and military precision.",
    },
    alternates: {
      canonical: "/services",
    },
  },
  "/projects": {
    title:
      "Construction Projects Portfolio | Commercial & Residential - MH Construction",
    description:
      "Explore MH Construction's portfolio of successful commercial and residential projects across the Pacific Northwest. From concrete foundations to complete building construction, see our military-precision craftsmanship and partnership results in action throughout the Tri-Cities area.",
    keywords: [
      "construction projects Pasco",
      "commercial construction portfolio",
      "Tri-Cities construction projects",
      "completed construction projects",
      "construction case studies",
      "building projects Washington",
      "construction gallery",
      "project portfolio",
    ],
    openGraph: {
      title: "Construction Projects | MH Construction Portfolio",
      description:
        "Successful construction projects showcasing veteran-owned excellence and partnership-driven results.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/projects`,
    },
    twitter: {
      card: "summary_large_image",
      title: "MH Construction Projects",
      description:
        "Portfolio of commercial and residential construction projects.",
    },
    alternates: {
      canonical: "/projects",
    },
  },
  "/team": {
    title:
      "Our Team | Expert Construction Professionals - MH Construction Pasco, WA",
    description:
      "Meet the veteran-owned leadership team and skilled construction professionals at MH Construction. Army veteran Todd Hallenberg leads our partnership-focused team of expert builders, project managers, and craftsmen serving the Tri-Cities area with military precision and authentic partnerships.",
    keywords: [
      "construction team Pasco WA",
      "veteran construction leadership",
      "construction professionals Tri-Cities",
      "general contractor team",
      "Todd Hallenberg MH Construction",
      "construction project managers",
      "skilled construction workers",
      "veteran-owned team",
    ],
    openGraph: {
      title: "Meet Our Team | MH Construction",
      description:
        "Veteran-owned leadership team and skilled professionals delivering construction excellence.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/team`,
    },
    twitter: {
      card: "summary_large_image",
      title: "MH Construction Team",
      description: "Meet our veteran-owned construction leadership team.",
    },
    alternates: {
      canonical: "/team",
    },
  },
  "/booking": {
    title:
      "Book Consultation | Schedule Construction Estimate - MH Construction",
    description:
      "Schedule your free construction consultation with MH Construction. Get AI-powered project estimates, discuss your construction needs, and partner with veteran-owned excellence. Serving Pasco, Kennewick, Richland, and the greater Tri-Cities area. Easy online booking available now.",
    keywords: [
      "book construction consultation",
      "schedule construction estimate",
      "free construction consultation Pasco",
      "construction appointment booking",
      "project estimate scheduling",
      "contractor consultation Tri-Cities",
      "construction meeting request",
    ],
    openGraph: {
      title: "Book Consultation | MH Construction",
      description:
        "Schedule your free consultation and get AI-powered project estimates from veteran-owned professionals.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/booking`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Book Consultation | MH Construction",
      description:
        "Schedule your free construction consultation and project estimate.",
    },
    alternates: {
      canonical: "/booking",
    },
  },
  "/careers": {
    title:
      "Careers at MH Construction | Join Our Veteran-Owned Construction Team",
    description:
      "Join the MH Construction team in Pasco, WA. We're hiring skilled construction professionals, project managers, and craftsmen who value partnerships, quality, and military-precision excellence. Competitive pay, veteran-friendly workplace, and opportunities for growth in the Pacific Northwest construction industry.",
    keywords: [
      "construction jobs Pasco WA",
      "hiring construction workers Tri-Cities",
      "construction careers Washington",
      "veteran-friendly jobs",
      "construction employment",
      "project manager jobs",
      "carpenter jobs Pasco",
      "general contractor careers",
    ],
    openGraph: {
      title: "Careers | Join MH Construction Team",
      description:
        "Join our veteran-owned construction team. Competitive careers in the Pacific Northwest.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/careers`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Careers at MH Construction",
      description:
        "Join our veteran-owned construction team in the Tri-Cities area.",
    },
    alternates: {
      canonical: "/careers",
    },
  },
  "/government": {
    title:
      "Government Construction Projects | Veteran-Owned Contractor - MH Construction",
    description:
      "MH Construction serves government agencies across Washington, Oregon, and Idaho with veteran-owned construction excellence. Experienced in government contracts, compliance, and public project management. Military precision meets partnership-driven government construction services in the Pacific Northwest.",
    keywords: [
      "government construction contractor",
      "veteran-owned government contractor",
      "government projects Washington",
      "public construction services",
      "government contract construction",
      "veteran contractor government",
      "federal construction projects",
      "municipal construction services",
    ],
    openGraph: {
      title: "Government Construction | MH Construction",
      description:
        "Veteran-owned contractor specializing in government construction projects with compliance expertise.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/government`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Government Construction | MH Construction",
      description:
        "Veteran-owned government construction contractor in the Pacific Northwest.",
    },
    alternates: {
      canonical: "/government",
    },
  },
  "/trade-partners": {
    title:
      "Trade Partners Program | Subcontractor Partnerships - MH Construction",
    description:
      "Join MH Construction's trade partners network. We build lasting partnerships with skilled subcontractors, suppliers, and trade professionals across the Pacific Northwest. Partnership-driven approach, fair payment terms, and veteran-owned values. Opportunities for concrete, carpentry, electrical, plumbing, and more.",
    keywords: [
      "trade partners construction",
      "subcontractor opportunities Tri-Cities",
      "construction partnerships Washington",
      "trade contractor network",
      "subcontractor program",
      "construction supplier partnerships",
      "trade professional opportunities",
    ],
    openGraph: {
      title: "Trade Partners | MH Construction",
      description:
        "Join our trade partners network for lasting subcontractor partnerships with veteran-owned excellence.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/trade-partners`,
    },
    twitter: {
      card: "summary_large_image",
      title: "Trade Partners | MH Construction",
      description:
        "Partnership opportunities for skilled trade professionals and subcontractors.",
    },
    alternates: {
      canonical: "/trade-partners",
    },
  },
  "/estimator": {
    title:
      "AI Construction Estimator | Instant Project Cost Estimates - MH Construction",
    description:
      "Revolutionary AI-powered construction estimator by MH Construction. Get instant, accurate project cost estimates for commercial and residential construction in the Tri-Cities area. General MH AI assistant provides real-time cost analysis, material estimates, and project timelines. Free online construction estimating tool.",
    keywords: [
      "AI construction estimator",
      "construction cost calculator",
      "project estimate tool",
      "instant construction estimate",
      "AI cost estimator",
      "construction pricing tool",
      "project cost analysis",
      "General MH AI estimator",
    ],
    openGraph: {
      title: "AI Construction Estimator | MH Construction",
      description:
        "Revolutionary AI-powered estimator for instant, accurate construction project cost estimates.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/estimator`,
    },
    twitter: {
      card: "summary_large_image",
      title: "AI Construction Estimator",
      description:
        "Get instant project estimates with our AI-powered construction estimator.",
    },
    alternates: {
      canonical: "/estimator",
    },
  },
  "/3d-explorer": {
    title:
      "3D Project Explorer | Interactive Construction Visualization - MH Construction",
    description:
      "Explore construction projects in immersive 3D with MH Construction's interactive visualization tool. View completed projects, explore building designs, and experience our construction work in virtual reality. Cutting-edge technology meets construction excellence in the Pacific Northwest.",
    keywords: [
      "3D construction visualization",
      "interactive project explorer",
      "construction 3D viewer",
      "virtual construction tour",
      "3D building visualization",
      "construction VR experience",
      "interactive project gallery",
    ],
    openGraph: {
      title: "3D Project Explorer | MH Construction",
      description:
        "Explore construction projects in immersive 3D with our interactive visualization tool.",
      type: "website",
      locale: "en_US",
      url: `${baseUrl}/3d-explorer`,
    },
    twitter: {
      card: "summary_large_image",
      title: "3D Project Explorer",
      description: "Interactive 3D visualization of MH Construction projects.",
    },
    alternates: {
      canonical: "/3d-explorer",
    },
  },
};

/**
 * Get metadata for a specific page
 */
export function getPageMetadata(pathname: string): Metadata {
  return (
    pageMetadata[pathname] || {
      title: "MH Construction - Veteran-Owned Construction Excellence",
      description:
        "Revolutionary construction services in the Pacific Northwest. Veteran-owned general contractor serving the Tri-Cities area with military precision and partnership focus.",
    }
  );
}
