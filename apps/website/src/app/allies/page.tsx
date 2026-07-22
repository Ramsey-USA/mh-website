import { PageTrackingClient } from "@/components/analytics";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { type VendorPlatform } from "@/components/allies/VendorPlatformLink";
import { Button, Card } from "@/components/ui";

// TradeGroupCarousel is a 347-line interactive client component used deep
// below the fold (line ~800). Dynamic import keeps it out of the critical path.
const TradeGroupCarousel = dynamic(
  () =>
    import("@/components/allies/TradeGroupCarousel").then((m) => ({
      default: m.TradeGroupCarousel,
    })),
  { ssr: true },
);
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
// StaggeredFadeIn is a client animation component. Dynamic import keeps its
// JS out of the critical bundle; its use in this page is below the fold (~line 625).
const StaggeredFadeIn = dynamic(
  () =>
    import("@/components/animations/FramerMotionComponents").then((m) => ({
      default: m.StaggeredFadeIn,
    })),
  { ssr: true },
);
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { AccreditationsLogoRow } from "@/components/shared-sections";
import { getTranslations } from "next-intl/server";

const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbPatterns.allies);

// ── Vendor Data ─────────────────────────────────────────────────────────────
type VendorLink = { label: string; href: string; platform: VendorPlatform };
type VendorBrandColors = { primary: string; secondary?: string };

type Vendor = {
  name: string;
  /** Trade category used to group this partner in the directory.
   * Must match a key defined in TRADE_ICONS (e.g. "Electrical", "Signage").
   */
  trade: string;
  role: string;
  icon: string;
  accentColor: string;
  description: string;
  highlights: string[];
  /**
   * Real deliverables completed together — the "digital handshake".
   * Each item shown under "Our Work Together" on the vendor card.
   */
  portfolio: string[];
  /**
   * Path relative to /public once logo is uploaded.
   * e.g. "/images/vendors/mustang_signs.svg"
   */
  logo: string;
  brandColors: VendorBrandColors | null;
  address: string;
  phone?: string;
  email?: string;
  links: VendorLink[];
};

const vendors: Vendor[] = [
  {
    name: "Bagley Landscape Construction, Inc.",
    trade: "Landscaping",
    role: "Landscaping Contractor",
    icon: "yard",
    accentColor: "from-brand-primary to-brand-primary-dark",
    description:
      "Bagley Landscape Construction, Inc. delivers comprehensive landscape design, installation, hardscaping, maintenance, and snow & ice services across the Tri-Cities (Pasco, Richland, Kennewick) and our broader Pacific Northwest project footprint. Their local expertise and full-service capabilities support MH Construction projects from groundbreaking to year-round upkeep.",
    highlights: [
      "Commercial & Industrial Landscape Design & Installation",
      "Irrigation Systems & Hydroseeding",
      "Landscape Lighting",
      "Retaining Walls — Block, Boulder & Rock",
      "Pavers, Flagstone & Concrete Curbing",
      "Ponds & Water Features",
      "Landscape Maintenance — Mowing, Edging & Clean Up",
      "Spraying — Fertilization, Weed & Spider Control",
      "Snow & Ice — Plowing, Sidewalk Removal & De-icing",
    ],
    portfolio: [],
    logo: "/images/vendors/bagley_landscape.webp",
    brandColors: { primary: "#409416", secondary: "#262626" },
    address: "1418 E St Helens St, Pasco, WA 99301",
    phone: "(509) 546-2449",
    email: "office@bagleylandscape.com",
    links: [
      {
        label: "Website",
        href: "https://bagleylandscape.com/",
        platform: "website",
      },
    ],
  },
  {
    name: "Core Cabinet Production",
    trade: "Cabinetry & Millwork",
    role: "Cabinetry Partner",
    icon: "kitchen",
    accentColor: "from-orange-500 to-orange-700",
    description:
      "Core Cabinet Production specializes in custom-designed, in-house fabricated cabinetry and millwork for commercial and industrial applications on MH Construction projects. From office casework to specialty storage systems, Core Cabinet delivers precision craftsmanship.",
    highlights: [
      "Commercial Casework",
      "Industrial Storage Systems",
      "Office Millwork",
      "Specialty Cabinets",
      "Storage & Bookcases",
      "Commercial Offices",
    ],
    portfolio: [],
    logo: "/images/vendors/core_cabinet.webp",
    brandColors: { primary: "#E35724", secondary: "#444444" },
    address: "2573 Robertson Drive, Richland, WA 99354",
    phone: "(509) 375-7900",
    email: "admin@corecabinetproduction.com",
    links: [
      {
        label: "Website",
        href: "https://corecabinetproduction.com/",
        platform: "website",
      },
    ],
  },
  {
    name: "Diamond Electric LLC",
    trade: "Electrical",
    role: "Electrical Contractor",
    icon: "electrical_services",
    accentColor: "from-brand-primary to-brand-primary-dark",
    description:
      "Diamond Electric LLC provides safe, code-compliant commercial and industrial electrical installations on MH Construction projects. Their expertise and commitment to safety align with our award-winning safety culture.",
    highlights: [
      "Commercial & Industrial Electrical",
      "Code-Compliant Installations",
      "Safety-First Approach",
    ],
    portfolio: [],
    logo: "",
    brandColors: { primary: "#5C2D91", secondary: "#C9A227" },
    address: "1267 Evanslee Court, Richland, WA 99352",
    phone: "509-552-9459",
    email: "drew@diamondelectricllc.net",
    links: [
      {
        label: "Facebook",
        href: "https://www.facebook.com/diamondelectricllc/photos/",
        platform: "facebook",
      },
    ],
  },
  {
    name: "Dupree Building Specialties",
    trade: "Building Specialties",
    role: "Building Specialties Partner",
    icon: "door_front",
    accentColor: "from-amber-600 to-amber-800",
    description:
      "Dupree Building Specialties supplies and installs specialty construction products across Divisions 7–12 on MH Construction projects. From fire-rated doors and expansion control to lockers, visual displays, and athletic equipment, Dupree delivers the finish-trade components that complete every interior build.",
    highlights: [
      "Div 7 — Roof Accessories & Expansion Control",
      "Div 8 — Access, Fire, Coiling, Folding & Traffic Doors",
      "Div 8 — Skylights & Louvers",
      "Div 9 — Access Flooring",
      "Div 10 — Visual Displays, Signage & Partitions",
      "Div 10 — Lockers, Wall Protection & Postal Specialties",
      "Div 11 — Projection Screens & Athletic Equipment",
      "Div 12 — Floor Mats & Window Shades",
    ],
    portfolio: [],
    logo: "/images/vendors/dupree_building.webp",
    brandColors: { primary: "#384884", secondary: "#384884" },
    address: "1035 E. Cataldo, Spokane, WA 99202",
    phone: "509.484.2000",
    email: "info@dupreebldg.com",
    links: [
      {
        label: "Website",
        href: "https://dupreebldg.com/",
        platform: "website",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/people/Dupree-Building-Specialties/61554190085687/",
        platform: "facebook",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/dupree-building-specialties",
        platform: "linkedin",
      },
    ],
  },
  {
    name: "Frontier Fencing",
    trade: "Fencing",
    role: "Premier Fencing Contractor",
    icon: "fence",
    accentColor: "from-red-700 to-stone-800",
    description:
      "Frontier Fencing is MH Construction's premier fencing company, providing commercial and industrial perimeter solutions across our project footprint.",
    highlights: [
      "Commercial & Industrial Fencing",
      "Perimeter Security Systems",
      "Gates & Access Control Integration",
      "Durable Site Enclosures",
    ],
    portfolio: [],
    logo: "/images/vendors/frontier-fencing-logo.avif",
    brandColors: { primary: "#8B1E1E", secondary: "#2D2D2D" },
    address: "2516 N Commercial Ave, Pasco, WA 99301",
    phone: "(509) 545-1801",
    links: [
      {
        label: "Website",
        href: "https://www.frontierfenceinc.com/",
        platform: "website",
      },
    ],
  },
  {
    name: "High Desert Drywall, Inc.",
    trade: "Drywall & Interior",
    role: "Drywall & Interior Contractor",
    icon: "construction",
    accentColor: "from-sky-700 to-sky-900",
    description:
      "High Desert Drywall, Inc. delivers expert drywall installation, taping, and finishing on MH Construction projects. Their commitment to quality and precision makes them a valued partner for commercial and industrial interior builds across the Pacific Northwest.",
    highlights: [
      "Drywall Installation",
      "Taping & Finishing",
      "Commercial & Industrial Interior Scope",
      "Interior Construction Specialists",
    ],
    portfolio: [],
    logo: "",
    brandColors: { primary: "#1a3a5c", secondary: "#c8a04a" },
    address: "Pasco, WA",
    phone: "(509) 492-5208",
    email: "office@hd-drywall.net",
    links: [
      {
        label: "Website",
        href: "https://hd-drywall.net/",
        platform: "website",
      },
    ],
  },
  {
    name: "Intermountain West Insulation (IWI)",
    trade: "Insulation & Building Products",
    role: "Insulation Contractor",
    icon: "home_work",
    accentColor: "from-red-600 to-red-800",
    description:
      "Intermountain West Insulation (IWI) delivers a comprehensive range of insulation and building product installation services across the Pacific Northwest on MH Construction projects. From spray foam and fiberglass to garage doors and epoxy flooring, IWI brings versatility and quality to every build.",
    highlights: [
      "Fiberglass, Spray Foam & Cellulose Insulation",
      "Air Sealing",
      "Garage Doors — Sales, Installation & Service",
      "Epoxy Flooring",
      "Gutters, Siding & Windows",
      "Window Blinds & Paint",
    ],
    portfolio: [],
    logo: "/images/vendors/iwi_insulation.webp",
    brandColors: { primary: "#CE2027", secondary: "#262626" },
    address: "9304 W. Clearwater Dr. Suite A, Kennewick, WA 99336",
    phone: "509.735.8411",
    links: [
      {
        label: "Website",
        href: "https://iwinsulation.com/",
        platform: "website",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/p/Intermountain-West-Insulation-100063735342877/",
        platform: "facebook",
      },
    ],
  },
  {
    name: "McKinney Glass",
    trade: "Glass & Glazing",
    role: "Glass & Glazing Contractor",
    icon: "window",
    accentColor: "from-sky-500 to-sky-700",
    description:
      "McKinney Glass provides full-service auto, commercial, and industrial glass solutions for MH Construction projects. Based in the Yakima Valley, their expertise spans fleet windshield repair, glazing systems, commercial storefronts, and fire-rated specialty doors.",
    highlights: [
      "Auto Glass — Windshield Repair/Replacement & Rock Chip Repair",
      "RV, Bus & Heavy Equipment Glass",
      "Energy Efficient Windows & Sliding Glass Doors",
      "Skylights, Custom Showers & Mirrors",
      "Commercial Storefronts & Automatic Doors",
      "Fire-Rated & Specialty Doors",
      "Interior Partitions",
    ],
    portfolio: [],
    logo: "/images/vendors/mckinney-glass-logo.jpg",
    brandColors: null,
    address: "2220 Goodman Rd, Union Gap, WA 98903",
    phone: "(509) 248-2770",
    links: [
      {
        label: "Website",
        href: "https://mckinneyglass.com/",
        platform: "website",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/McKinneyglassyakima",
        platform: "facebook",
      },
    ],
  },
  {
    name: "Mustang Signs",
    trade: "Signage",
    role: "Signage Partner",
    icon: "signpost",
    accentColor: "from-brand-secondary to-brand-secondary-dark",
    description:
      "Mustang Signs delivers full-service custom signage solutions across the Pacific Northwest. From vehicle wraps and digital signage to LED retrofitting and professional installation, their craftsmanship and reliability make them a valued part of MH Construction projects.",
    highlights: [
      "Custom Signage Solutions",
      "Vehicle Wraps",
      "Exterior & Interior Signage",
      "Digital Signage",
      "Print Solutions",
      "Design & Consultation",
      "Professional Installation",
      "Retrofitting & LED Retrofitting",
      "Maintenance, Cleaning & Repairs",
    ],
    portfolio: [
      "ADA-compliant interior signage",
      "Commercial lettering for storefronts",
      "LED exterior reader boards",
      "Exterior and interior clocks",
      "Vinyl storefront lettering & designs",
      "Fleet vehicle wraps",
      "MH Construction office front signage",
      "MH Construction job site signage",
    ],
    logo: "/images/vendors/mustang_signs.webp",
    brandColors: { primary: "#0089CF", secondary: "#F68E2D" },
    address: "10379 W Clearwater Ave, Kennewick, WA 99336",
    phone: "(509) 735-4607",
    email: "info@mustangsigns.com",
    links: [
      {
        label: "Website",
        href: "https://mustangsigns.com/",
        platform: "website",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/mustangsigns/",
        platform: "facebook",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/mustangsigns/",
        platform: "instagram",
      },
    ],
  },
  {
    name: "Hilti",
    trade: "Event Allies",
    role: "Event Sponsor & Tools Partner",
    icon: "construction",
    accentColor: "from-red-600 to-red-800",
    description:
      "Hilti supports MH Construction with event-day engagement and brand partnership during Cool Desert Nights community activities.",
    highlights: [
      "Event Sponsorship Support",
      "Community Engagement Collaboration",
      "Field Tools Brand Presence",
    ],
    portfolio: [
      "Cool Desert Nights fastener jar challenge support",
      "Event-day ally visibility with MH Construction",
    ],
    logo: "/images/vendors/hilti-logo-red-text.webp",
    brandColors: { primary: "#C8102E", secondary: "#1A1A1A" },
    address: "Tri-Cities, WA",
    links: [],
  },
  {
    name: "Sunshine Cleaning Services",
    trade: "Event Allies",
    role: "Event Sponsor & Cleaning Services Partner",
    icon: "cleaning_services",
    accentColor: "from-amber-500 to-amber-700",
    description:
      "Sunshine Cleaning Services supports MH Construction during Cool Desert Nights with event partnership and on-site community support.",
    highlights: [
      "Event Sponsorship Support",
      "Community Event Partnership",
      "Cleaning Services Brand Presence",
    ],
    portfolio: [
      "Cool Desert Nights event ally support",
      "Community-focused event collaboration with MH Construction",
    ],
    logo: "/images/vendors/sunshine-cleaners-logo.webp",
    brandColors: { primary: "#F59E0B", secondary: "#1F2937" },
    address: "8514 W Gage Blvd Ste. A15, Kennewick, WA 99336",
    phone: "(509) 792-2292",
    links: [],
  },
  {
    name: "Viking Plumbing & Mechanical",
    trade: "Plumbing & Mechanical",
    role: "Plumbing & Mechanical Contractor",
    icon: "plumbing",
    accentColor: "from-yellow-500 to-yellow-700",
    description:
      "Viking Plumbing & Mechanical delivers full-service commercial and industrial plumbing across the Pacific Northwest on MH Construction projects. From new construction to complex renovations, Viking brings the expertise and reliability our projects demand.",
    highlights: [
      "Commercial & Industrial New Construction Plumbing",
      "Commercial Renovation & Tenant Improvements",
      "Drain Cleaning & Hydro Jetting",
      "Water Heater Services",
      "Sewer Line Inspection, Repair & Replacement",
      "Water Filtration & Softening Systems",
      "Fixture Installation, Repair & Replacement",
      "Plumbing System Maintenance & Inspections",
    ],
    portfolio: [],
    logo: "/images/vendors/viking_plumbing_logo.webp",
    brandColors: { primary: "#F5C645", secondary: "#2F2E2E" },
    address: "2805 Ahtanum Rd, Yakima, WA 98942",
    phone: "(509) 450-0485",
    email: "info@vikingplumbingandmechanical.com",
    links: [
      {
        label: "Website",
        href: "https://vikingplumbingandmechanical.com/",
        platform: "website",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61552033463552",
        platform: "facebook",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/vikingplumbingandmechanical/",
        platform: "instagram",
      },
    ],
  },
];

// ── Trade Group Directory ────────────────────────────────────────────────────
// Maps each trade category name to its representative icon.
const TRADE_ICONS: Record<string, string> = {
  "Building Specialties": "door_front",
  "Cabinetry & Millwork": "kitchen",
  "Drywall & Interior": "construction",
  Electrical: "electrical_services",
  "Event Allies": "groups",
  Fencing: "fence",
  "Glass & Glazing": "window",
  "Insulation & Building Products": "home_work",
  Landscaping: "yard",
  "Plumbing & Mechanical": "plumbing",
  Signage: "signpost",
};

type TradeGroup = { trade: string; icon: string; vendors: Vendor[] };

// Build alphabetically-ordered trade groups.
// Within each group, partners are also sorted alphabetically by name.
// Quarterly governance: adds, removals, and reclassifications require
// a documented reason and owner approval before merging.
const tradeGroups: TradeGroup[] = Array.from(
  new Set(vendors.map((vendor) => vendor.trade)),
)
  .sort((a, b) => a.localeCompare(b))
  .map((trade) => {
    const tradeVendors = vendors.filter((vendor) => vendor.trade === trade);

    if (!(trade in TRADE_ICONS)) {
      // Guard against unmapped trade categories: errors surface in server logs
      // so the missing icon is caught before it reaches users.
      console.error(
        `[Trade Partners] Unknown trade category "${trade}" — add it to TRADE_ICONS`,
      );
    }
    return {
      trade,
      icon: TRADE_ICONS[trade] ?? tradeVendors[0]?.icon ?? "business",
      vendors: [...tradeVendors].sort((a, b) => a.name.localeCompare(b.name)),
    };
  });

// Flat globally-alphabetical list used for the logo parade.
// This is distinct from the trade-grouped order: here all vendors sort by
// company name across all trades; in tradeGroups they sort by trade first.
const sortedVendors = [...vendors].sort((a, b) => a.name.localeCompare(b.name));

/** Derives a stable HTML id for a trade group, e.g. "electrical" or "glass-glazing". */
function tradeId(trade: string): string {
  return trade.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

// ── Partnership Values ───────────────────────────────────────────────────────
const partnershipValues = [
  {
    key: "handshakes",
    icon: "handshake",
    color: "from-brand-primary to-brand-primary-dark",
  },
  {
    key: "scheduling",
    icon: "campaign",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    key: "payment",
    icon: "account_balance",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    key: "safety",
    icon: "health_and_safety",
    color: "from-brand-primary-light to-brand-primary",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function AlliesPage() {
  const locale = await getServerLocale();
  const t = await getTranslations({ locale });

  return (
    <div className="relative min-h-screen bg-linear-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <PageTrackingClient pageName="Allies" />
      <StructuredData data={breadcrumbSchema} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="hero-section relative flex items-end justify-end text-white overflow-hidden"
        style={{ height: "calc(100vh - var(--mh-nav-offset, 6.5rem))" }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-brand-primary to-gray-900" />
        <div className="absolute inset-0 bg-linear-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20" />

        {/* Content — bottom right */}
        <div className="hero-safe-top hero-safe-bottom relative z-30 mx-3 sm:ml-auto sm:mr-5 lg:mr-7 xl:mr-10 mb-4 pointer-events-none transition-opacity duration-300 sm:w-[min(88vw,44rem)] sm:max-w-176">
          <div className="rounded-2xl border border-white/15 bg-gray-900/60 px-4 py-3 shadow-2xl backdrop-blur-md sm:px-6 sm:py-4 lg:px-8 lg:py-5">
            <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
              <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
                {t("allies.hero.kicker")} → Partners
              </span>
              <span className="block text-brand-secondary">
                {t("allies.hero.titleLine1")}
              </span>
              <span className="block text-brand-primary">
                {t("allies.hero.titleLine2")}
              </span>
              <span className="block text-white/90">
                {COMPANY_INFO.slogan.primary}
              </span>
              <span className="block text-brand-secondary/90 text-sm xs:text-base sm:text-lg md:text-xl mt-2">
                {getHeroPageSlogan("allies").slogan}
              </span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <Breadcrumb
        items={[
          { label: t("allies.hero.breadcrumbHome"), href: "/" },
          { label: t("allies.hero.breadcrumbCurrent") },
        ]}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24 max-w-7xl flex flex-col">
        {/* ── SECTION 1: WHY PARTNER WITH MHC ──────────────────────────── */}
        <section
          id="partnership"
          className="order-2 relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32 rounded-2xl"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 px-6 sm:px-10 lg:px-14">
            <div className="mb-16 sm:mb-20 text-center">
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full" />
                  <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="handshake"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel={t("allies.partnership.iconAria")}
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
              </div>

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("allies.partnership.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("allies.partnership.title")}
                </span>
              </h2>

              <p className="font-body mx-auto max-w-4xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  {t("allies.partnership.quote")}
                </span>{" "}
                {t("allies.partnership.descriptionPrefix")}{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  {t("allies.partnership.metric")}
                </span>{" "}
                {t("allies.partnership.descriptionSuffix")}
              </p>
              <cite className="block mt-4 font-semibold text-brand-secondary-text text-lg dark:text-brand-secondary-light not-italic">
                {t("allies.partnership.cite")}
              </cite>
            </div>

            <StaggeredFadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipValues.map((value) => (
                <div key={value.key} className="group relative flex h-full">
                  <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500" />
                  <Card className="relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all duration-300 group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
                    <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker" />
                    <div className="p-6 flex flex-col flex-1 text-center">
                      <div className="relative inline-block mx-auto mb-4">
                        <div className="absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-full" />
                        <div
                          className={`relative flex justify-center items-center bg-linear-to-r ${value.color} rounded-full w-16 h-16 shadow-xl transition-all duration-300`}
                        >
                          <MaterialIcon
                            icon={value.icon}
                            size="lg"
                            className="text-white drop-shadow-lg"
                            ariaLabel={t(
                              `allies.partnership.values.${value.key}.title`,
                            )}
                          />
                        </div>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                        {t(`allies.partnership.values.${value.key}.title`)}
                      </h3>
                      <p className="font-body grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {t(
                          `allies.partnership.values.${value.key}.description`,
                        )}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </StaggeredFadeIn>
          </div>
        </section>

        {/* ── SECTION 2: TRADE PARTNER SHOWCASE ─────────────────────────── */}
        <section
          id="vendors"
          className="order-1 relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden mb-20 lg:mb-32"
        >
          <div className="relative z-10">
            <div className="mb-16 sm:mb-20 text-center">
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-secondary/30 blur-2xl rounded-full" />
                  <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-secondary p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="groups"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel={t("allies.network.iconAria")}
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
              </div>

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {t("allies.network.subtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {t("allies.network.title")}
                </span>
              </h2>

              <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {t("allies.network.singleLocalizedDescription")}
              </p>

              {/* Listing Criteria */}
              <div className="mx-auto max-w-4xl mt-8 mb-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-6 py-4 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <MaterialIcon
                    icon="checklist"
                    size="sm"
                    className="text-brand-primary dark:text-brand-primary-light shrink-0"
                    ariaLabel={t("allies.network.criteria.aria")}
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-primary-light">
                    {t("allies.network.criteria.label")}
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {[
                    t("allies.network.criteria.item1"),
                    t("allies.network.criteria.item2"),
                    t("allies.network.criteria.item3"),
                    t("allies.network.criteria.item4"),
                    t("allies.network.criteria.item5"),
                    t("allies.network.criteria.item6"),
                  ].map((criterion) => (
                    <li
                      key={criterion}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-xs font-medium text-gray-700 dark:text-gray-300"
                    >
                      <MaterialIcon
                        icon="check"
                        size="sm"
                        ariaLabel=""
                        className="text-brand-primary dark:text-brand-primary-light"
                      />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Logo Parade */}
            <div className="mb-14 flex flex-wrap items-center justify-center gap-4">
              {sortedVendors.map((vendor) => (
                <div
                  key={vendor.name}
                  className="group flex items-center justify-center rounded-xl border-2 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-black/30"
                  style={{
                    borderColor: vendor.brandColors
                      ? `${vendor.brandColors.primary}60`
                      : "#e5e7eb",
                    width: 120,
                    height: 72,
                  }}
                  title={vendor.name}
                >
                  {vendor.logo ? (
                    <Image
                      src={vendor.logo}
                      alt={`${vendor.name} logo`}
                      width={100}
                      height={52}
                      className="object-contain max-h-12 w-auto px-2"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center rounded-xl"
                      style={
                        vendor.brandColors
                          ? { background: vendor.brandColors.primary }
                          : { background: "#374151" }
                      }
                    >
                      <MaterialIcon
                        icon={vendor.icon}
                        size="lg"
                        className="text-white"
                        ariaLabel={vendor.name}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-16">
              {tradeGroups.map((group, groupIndex) => (
                <div key={group.trade} id={`trade-${tradeId(group.trade)}`}>
                  {/* Deep-link anchor: /allies#trade-electrical etc.
 The top-level #vendors nav item covers keyboard access. */}
                  {/* Trade group header */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 shrink-0">
                      <MaterialIcon
                        icon={group.icon}
                        size="sm"
                        className="text-brand-primary dark:text-brand-primary-light"
                        ariaLabel={group.trade}
                      />
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg tracking-tight">
                      {group.trade}
                    </h3>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  </div>

                  {/* Carousel: logo alternates left/right per trade group */}
                  <TradeGroupCarousel
                    vendors={group.vendors}
                    logoSide={groupIndex % 2 === 0 ? "left" : "right"}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: CTA ────────────────────────────────────────────── */}
        <section
          id="apply"
          className="order-4 relative bg-gray-50 dark:bg-gray-800 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden rounded-2xl"
        >
          <div
            id="vendor-application"
            className="absolute -top-24"
            aria-hidden="true"
          />
          <div className="relative z-10 px-8 lg:px-16 xl:px-20">
            <div className="text-center">
              <div className="mb-16 sm:mb-20">
                <div className="flex items-center justify-center mb-8 gap-4">
                  <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
                  <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full" />
                    <div className="relative bg-linear-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="diversity_3"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel={t("allies.cta.iconAria")}
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
                </div>

                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    {t("allies.cta.subtitle")}
                  </span>
                  <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    {t("allies.cta.title")}
                  </span>
                </h2>

                <p className="font-body mx-auto mb-8 max-w-4xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  {t("allies.cta.singleLocalizedDescription")}
                </p>
              </div>

              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Button asChild variant="primary" size="lg">
                  <Link href="/contact">
                    <MaterialIcon
                      icon="handshake"
                      ariaLabel={t("allies.cta.buttonPrimaryAria")}
                    />
                    {t("allies.cta.buttonPrimary")}
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/projects">
                    <MaterialIcon
                      icon="emoji_events"
                      size="sm"
                      ariaLabel={t("allies.cta.buttonSecondaryAria")}
                    />
                    {t("allies.cta.buttonSecondary")}
                  </Link>
                </Button>
              </div>

              <p className="mt-8 text-gray-500 dark:text-gray-300 text-sm">
                <MaterialIcon
                  icon="call"
                  size="sm"
                  ariaLabel={t("allies.cta.phoneAria")}
                  className="inline mr-2"
                />
                {t("allies.cta.phoneLabel")}{" "}
                <a
                  href={`tel:${COMPANY_INFO.phone.tel}`}
                  className="font-semibold hover:text-brand-primary transition-colors"
                >
                  {COMPANY_INFO.phone.display}
                </a>{" "}
                | {t("allies.cta.hours")}
              </p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                <MaterialIcon
                  icon="mark_email_read"
                  size="sm"
                  ariaLabel={t("allies.cta.emailAria")}
                  className="inline mr-2"
                />
                <a
                  href={`mailto:${COMPANY_INFO.email.main}`}
                  className="font-semibold hover:text-brand-primary transition-colors"
                >
                  {COMPANY_INFO.email.main}
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Accreditations & Certifications */}
        <section className="order-3 relative py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-4">
              {t("allies.accreditations.kicker")}
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("allies.accreditations.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              {t("allies.accreditations.description")}
            </p>
            <AccreditationsLogoRow />
          </div>
        </section>
      </div>
    </div>
  );
}
