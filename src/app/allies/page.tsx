import { PageTrackingClient } from "@/components/analytics";
import Image from "next/image";
import Link from "next/link";
import { type VendorPlatform } from "@/components/allies/VendorPlatformLink";
import { TradeGroupCarousel } from "@/components/allies/TradeGroupCarousel";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StaggeredFadeIn } from "@/components/animations/FramerMotionComponents";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";
import { StructuredData } from "@/components/seo/SeoMeta";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";

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
      "Commercial & Residential Landscape Design & Installation",
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
      "Core Cabinet Production specializes in custom-designed, in-house fabricated cabinets for residential and commercial applications on MH Construction projects. From kitchen and bathroom cabinets to full commercial office builds, Core Cabinet delivers precision craftsmanship.",
    highlights: [
      "Kitchen Cabinets",
      "Bathroom Cabinets",
      "Home Offices",
      "Closets",
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
    name: "D-Fence Fencing Company",
    trade: "Fencing",
    role: "Fencing Contractor",
    icon: "fence",
    accentColor: "from-red-600 to-red-800",
    description:
      "D-Fence Fencing Company delivers residential and commercial fencing solutions across Eastern Washington on MH Construction projects. From galvanized chain link to ornamental and cedar privacy fencing, D-Fence brings craftsmanship and reliability to every project.",
    highlights: [
      "Galvanized & Black Chain Link",
      "Vinyl Fencing",
      "Cedar Privacy Fencing",
      "Ornamental Fencing",
      "Field Fencing",
      "Gates & Automated Gates",
    ],
    portfolio: [],
    logo: "/images/vendors/d_fence_fencing.webp",
    brandColors: { primary: "#CC2020", secondary: "#333333" },
    address: "P.O. Box 881, Selah, WA 98942",
    phone: "(509) 731-8836",
    links: [
      {
        label: "Website",
        href: "https://dfencefencing.com/",
        platform: "website",
      },
      {
        label: "Facebook",
        href: "https://www.facebook.com/EasternWAFENCING/",
        platform: "facebook",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/dfencefencing2014/",
        platform: "instagram",
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
    name: "High Desert Drywall, Inc.",
    trade: "Drywall & Interior",
    role: "Drywall & Interior Contractor",
    icon: "construction",
    accentColor: "from-sky-700 to-sky-900",
    description:
      "High Desert Drywall, Inc. delivers expert drywall installation, taping, and finishing on MH Construction projects. Their commitment to quality and precision makes them a valued partner for interior builds across the Pacific Northwest.",
    highlights: [
      "Drywall Installation",
      "Taping & Finishing",
      "Commercial & Residential Interior Scope",
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
      "McKinney Glass provides full-service auto, residential, and commercial glass solutions for MH Construction projects. Based in the Yakima Valley, their expertise spans windshield repair, energy-efficient windows, commercial storefronts, and fire-rated specialty doors.",
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
    logo: "/images/vendors/mckinney_glass.webp",
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
    name: "Viking Plumbing & Mechanical",
    trade: "Plumbing & Mechanical",
    role: "Plumbing & Mechanical Contractor",
    icon: "plumbing",
    accentColor: "from-yellow-500 to-yellow-700",
    description:
      "Viking Plumbing & Mechanical delivers full-service commercial, industrial, and residential plumbing across the Pacific Northwest on MH Construction projects. From new construction to complex renovations, Viking brings the expertise and reliability our projects demand.",
    highlights: [
      "Commercial & Industrial New Construction Plumbing",
      "Residential New Construction & Remodeling",
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
const tradeGroups: TradeGroup[] = Object.entries(
  vendors.reduce<Record<string, Vendor[]>>((acc, v) => {
    (acc[v.trade] ??= []).push(v);
    return acc;
  }, {}),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([trade, tradeVendors]) => {
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
    icon: "handshake",
    title: "Where Handshakes Still Matter",
    description:
      "Your word is your bond. We treat our Trade Partners with the same integrity and respect we give our Client Partners — face-to-face trust, mutual respect, and a shared commitment to doing what's right.",
    color: "from-brand-primary to-brand-primary-dark",
  },
  {
    icon: "campaign",
    title: "Reliable Scheduling & Open Communication",
    description:
      "Transparent, open-book communication and dependable project timelines help our trade partners plan confidently and manage their resources effectively. You control it, we manage it — together.",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    icon: "account_balance",
    title: "Fair & Prompt Payment",
    description:
      "Competitive compensation and reliable payment schedules support the financial health and growth of every trade partner. Building for the Client, NOT the Dollar, means treating partners with the same fairness.",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    icon: "health_and_safety",
    title: "Award-Winning Safety Culture",
    description:
      "Our .64 EMR safety record is 40% better than the industry average. Everyone goes home safe, every single day. Partners on our sites operate within a culture of accountability and excellence.",
    color: "from-brand-primary-light to-brand-primary",
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AlliesPage() {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <PageTrackingClient pageName="Allies" />
      <StructuredData data={breadcrumbSchema} />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="hero-section relative bg-gradient-to-br from-gray-900 via-brand-primary to-gray-900 flex items-end justify-end text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 via-gray-900/80 to-brand-secondary/20" />

        {/* Content — bottom right */}
        <div className="relative z-30 mb-32 sm:mb-36 md:mb-40 lg:mb-44 mr-4 sm:mr-6 lg:mr-8 xl:mr-12 ml-auto max-w-2xl pointer-events-none pb-2">
          <div className="flex justify-end mb-4">
            <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border-2 border-white/30 shadow-2xl">
              <MaterialIcon
                icon="diversity_3"
                size="4xl"
                className="text-white drop-shadow-lg"
                ariaLabel="Strategic Partnership Network"
              />
            </div>
          </div>
          <h1 className="text-right text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white drop-shadow-2xl leading-tight tracking-tight">
            <span className="block text-brand-secondary text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-1">
              Allies → Partners
            </span>
            <span className="block text-brand-secondary">
              Allies in Force: Strategic Partnership Network
            </span>
            <span className="block text-brand-primary">
              THE ROI IS THE RELATIONSHIP
            </span>
            <span className="block text-white/90">
              Building projects for the Client,{" "}
              <span className="font-black italic text-bronze-300">NOT</span> the
              Dollar
            </span>
          </h1>
        </div>

        <PageNavigation
          items={navigationConfigs.allies}
          className="absolute bottom-0 left-0 right-0"
        />
      </section>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Allies in Force" }]}
      />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 xl:py-40 max-w-7xl flex flex-col">
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
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full" />
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="handshake"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Why partner with MHC"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
              </div>

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Why Build With
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  MH Construction
                </span>
              </h2>

              <p className="mx-auto max-w-4xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  &ldquo;THE ROI IS THE RELATIONSHIP — and we prove it.&rdquo;
                </span>{" "}
                Since 2010, MH Construction has built a reputation for honest
                communication, prompt payment, and a safety culture second to
                none{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  (.64 EMR — 40% safer than industry average)
                </span>
                {". "}Veteran-Owned Since January 2025 leadership means our
                partners get the same code of conduct that defines military
                service: honor, accountability, and follow-through on every
                commitment.
              </p>
              <cite className="block mt-4 font-semibold text-brand-secondary-text text-lg dark:text-brand-secondary-light not-italic">
                — MH Construction Leadership Team
              </cite>
            </div>

            <StaggeredFadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {partnershipValues.map((value) => (
                <div key={value.title} className="group relative flex h-full">
                  <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 rounded-2xl opacity-20 group-hover:opacity-100 blur-xl transition-all duration-500 group-hover:animate-pulse" />
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 group-hover:border-transparent shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 overflow-hidden flex flex-col w-full">
                    <div className="h-2 bg-gradient-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker" />
                    <div className="p-6 flex flex-col flex-1 text-center">
                      <div className="relative inline-block mx-auto mb-4">
                        <div className="absolute -inset-2 bg-gradient-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg rounded-full" />
                        <div
                          className={`relative flex justify-center items-center bg-gradient-to-r ${value.color} rounded-full w-16 h-16 shadow-xl group-hover:scale-110 transition-all duration-300`}
                        >
                          <MaterialIcon
                            icon={value.icon}
                            size="lg"
                            className="text-white drop-shadow-lg"
                            ariaLabel={value.title}
                          />
                        </div>
                      </div>
                      <h3 className="mb-3 font-bold text-gray-900 dark:text-white text-lg">
                        {value.title}
                      </h3>
                      <p className="flex-grow text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
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
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-2xl rounded-full" />
                  <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-secondary p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="groups"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                      ariaLabel="Trade Partner Network"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
              </div>

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Our
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Trade Partner Network
                </span>
              </h2>

              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Vetted companies grouped by trade and listed{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  alphabetically within each category
                </span>
                {". "}Partners are selected based on licensing, safety
                alignment, performance history, and shared values —{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  reviewed quarterly to ensure fair and current representation
                </span>
                {"."}
              </p>

              {/* Listing Criteria */}
              <div className="mx-auto max-w-4xl mt-8 mb-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-6 py-4 text-left">
                <div className="flex items-center gap-2 mb-3">
                  <MaterialIcon
                    icon="checklist"
                    size="sm"
                    className="text-brand-primary dark:text-brand-primary-light flex-shrink-0"
                    ariaLabel="Listing criteria"
                  />
                  <span className="text-xs font-bold uppercase tracking-widest text-brand-primary dark:text-brand-primary-light">
                    Listing Criteria
                  </span>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {[
                    "Licensed & insured",
                    "Safety-culture aligned",
                    "Active project footprint",
                    "Demonstrated performance history",
                    "Honest communication standard",
                    "Reviewed quarterly",
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
                  className="group flex items-center justify-center rounded-xl border-2 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex-shrink-0">
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
                  <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-primary-dark/30 blur-2xl rounded-full" />
                    <div className="relative bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                      <MaterialIcon
                        icon="diversity_3"
                        size="2xl"
                        className="text-white drop-shadow-lg"
                        ariaLabel="Become an ally"
                      />
                    </div>
                  </div>
                  <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full" />
                </div>

                <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                  <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                    Become an
                  </span>
                  <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                    Ally in Force
                  </span>
                </h2>

                <p className="mx-auto mb-8 max-w-4xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                  Ready to grow your business with a{" "}
                  <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                    Veteran-Owned Since January 2025 construction leader
                  </span>
                  ? We&apos;re actively seeking reliable, skilled trade partners
                  who value quality workmanship, honest communication, and{" "}
                  <span className="font-bold text-gray-900 dark:text-white">
                    sustainable business relationships built on mutual success
                  </span>
                  {"."}
                </p>
              </div>

              <div className="flex sm:flex-row flex-col justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <MaterialIcon icon="handshake" ariaLabel="Apply" />
                  Begin Partnership Discussion
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-secondary hover:bg-brand-secondary-dark text-black font-bold rounded-xl shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
                >
                  <MaterialIcon
                    icon="emoji_events"
                    size="sm"
                    ariaLabel="Portfolio"
                  />
                  View Our Portfolio
                </Link>
              </div>

              <p className="mt-8 text-gray-500 dark:text-gray-300 text-sm">
                <MaterialIcon
                  icon="call"
                  size="sm"
                  ariaLabel="Phone"
                  className="inline mr-2"
                />
                Trade Partnership Inquiries:{" "}
                <a
                  href={`tel:${COMPANY_INFO.phone.tel}`}
                  className="font-semibold hover:text-brand-primary transition-colors"
                >
                  {COMPANY_INFO.phone.display}
                </a>{" "}
                | 7:00 AM – 4:00 PM PST
              </p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">
                <MaterialIcon
                  icon="mark_email_read"
                  size="sm"
                  ariaLabel="Email"
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
              Accredited & Certified
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Partner with a Trusted General Contractor
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Our accreditations reflect our commitment to quality, ethics, and
              safety
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {/* BBB Accredited A+ */}
              {}
              <a
                href={COMPANY_INFO.bbb.sealClickUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="BBB Accredited Business - A+ Rating"
              >
                {}
                <img
                  src={COMPANY_INFO.bbb.sealHorizontal}
                  alt="BBB Accredited Business A+ Rating"
                  className="h-10 sm:h-12 w-auto dark:hidden"
                  loading="lazy"
                />
                {}
                <img
                  src={COMPANY_INFO.bbb.sealHorizontalWhite}
                  alt="BBB Accredited Business A+ Rating"
                  className="h-10 sm:h-12 w-auto hidden dark:block"
                  loading="lazy"
                />
              </a>

              {/* AGC Member */}
              <a
                href="https://www.agcwa.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="AGC of Washington Member"
              >
                {}
                <img
                  src="/images/logo/agc-member.webp"
                  alt="AGC of Washington Member"
                  className="h-10 sm:h-12 w-auto"
                  loading="lazy"
                />
              </a>

              {/* Travelers Insurance Partner */}
              <a
                href={COMPANY_INFO.travelers.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Travelers Insurance - Auto & Bonding Partner"
              >
                {}
                <img
                  src={COMPANY_INFO.travelers.logo}
                  alt="Travelers Insurance - Auto & Bonding Partner"
                  className="h-10 sm:h-12 w-auto dark:hidden"
                  loading="lazy"
                />
                {}
                <img
                  src={COMPANY_INFO.travelers.logoWhite}
                  alt="Travelers Insurance - Auto & Bonding Partner"
                  className="h-10 sm:h-12 w-auto hidden dark:block"
                  loading="lazy"
                />
              </a>

              {/* Pasco Chamber of Commerce */}
              <a
                href={COMPANY_INFO.chambers.pasco.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Pasco Chamber of Commerce Member"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.pasco.logo}
                  alt="Pasco Chamber of Commerce Member"
                  className="h-10 sm:h-12 w-auto dark:hidden"
                  loading="lazy"
                />
                {}
                <img
                  src={COMPANY_INFO.chambers.pasco.logoWhite}
                  alt="Pasco Chamber of Commerce Member"
                  className="h-10 sm:h-12 w-auto hidden dark:block"
                  loading="lazy"
                />
              </a>

              {/* Richland Chamber of Commerce */}
              <a
                href={COMPANY_INFO.chambers.richland.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Richland Chamber of Commerce Member"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.richland.logo}
                  alt="Richland Chamber of Commerce Member"
                  className="h-10 sm:h-12 w-auto"
                  loading="lazy"
                />
              </a>

              {/* Tri-City Regional Chamber of Commerce */}
              <a
                href={COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
                title="Tri-City Regional Chamber of Commerce Member"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.triCityRegional.logo}
                  alt="Tri-City Regional Chamber of Commerce Member"
                  className="h-10 sm:h-12 w-auto"
                  loading="lazy"
                />
              </a>

              {/* Veteran-Owned Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20">
                <MaterialIcon
                  icon="military_tech"
                  size="lg"
                  className="text-brand-primary dark:text-brand-primary-light"
                  ariaLabel="Veteran-Owned"
                />
                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                  Veteran-Owned Since January 2025
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
