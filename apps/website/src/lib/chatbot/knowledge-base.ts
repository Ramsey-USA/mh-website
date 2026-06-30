/**
 * MH Construction Chatbot Knowledge Base
 *
 * Provides the system prompt and structured company data for the chatbot.
 * Data sourced from llms.txt, allies page, FAQ, and company constants.
 */

import { COMPANY_INFO } from "@/lib/constants/company";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl().replace(/\/$/, "");
const SITE_HOST = SITE_URL.replace(/^https?:\/\/(www\.)?/, "");
const CONTACT_URL = `${SITE_HOST}/contact`;
const CONTACT_PHONE = COMPANY_INFO.phone.display;
const CONTACT_EMAIL = COMPANY_INFO.email.main;
const HQ_ADDRESS = COMPANY_INFO.address.full;
const WEEKDAY_HOURS = `${COMPANY_INFO.hours.weekday.display} PST`;

function formatLicenseCoverage(): string {
  const labels: Record<string, string> = {
    WA: "Washington",
    OR: "Oregon",
    ID: "Idaho",
  };

  const names = COMPANY_INFO.details.licenses
    .map((code) => labels[code] ?? code)
    .filter(Boolean);

  if (names.length === 0) {
    return "WA, OR, and ID";
  }

  if (names.length === 1) {
    return names[0] ?? "WA, OR, and ID";
  }

  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }

  const last = names.at(-1);
  return `${names.slice(0, -1).join(", ")}, and ${last}`;
}

const LICENSE_COVERAGE = formatLicenseCoverage();

// ── Allies / Trade Partners ─────────────────────────────────────────────────

export interface AllyInfo {
  name: string;
  role: string;
  description: string;
  highlights: string[];
  phone?: string;
  email?: string;
  website?: string;
  address: string;
}

export const ALLIES: AllyInfo[] = [
  {
    name: "Diamond Electric LLC",
    role: "Electrical Contractor",
    description:
      "Electrical contractor providing safe, code-compliant commercial and industrial electrical installations.",
    highlights: [
      "Commercial & Industrial Electrical",
      "Code-Compliant Installations",
      "Safety-First Approach",
    ],
    phone: "509-552-9459",
    email: "drew@diamondelectricllc.net",
    website: "https://www.facebook.com/diamondelectricllc/photos/",
    address: "1267 Evanslee Court, Richland, WA 99352",
  },
  {
    name: "Mustang Signs",
    role: "Signage Partner",
    description:
      "Full-service custom signage solutions across the Pacific Northwest — vehicle wraps, digital signage, LED retrofitting, and professional installation.",
    highlights: [
      "Custom Signage Solutions",
      "Vehicle Wraps",
      "Digital Signage",
      "Professional Installation",
    ],
    phone: "(509) 735-4607",
    email: "info@mustangsigns.com",
    website: "https://mustangsigns.com/",
    address: "10379 W Clearwater Ave, Kennewick, WA 99336",
  },
  {
    name: "Bagley Landscape Construction, Inc.",
    role: "Landscaping Contractor",
    description:
      "Comprehensive landscape design, installation, hardscaping, maintenance, and snow & ice services across the Tri-Cities (Pasco, Richland, Kennewick) and our broader Pacific Northwest footprint.",
    highlights: [
      "Landscape Design & Installation",
      "Irrigation Systems",
      "Hardscaping & Retaining Walls",
      "Snow & Ice Services",
    ],
    phone: "(509) 546-2449",
    email: "office@bagleylandscape.com",
    website: "https://bagleylandscape.com/",
    address: "1418 E St Helens St, Pasco, WA 99301",
  },
  {
    name: "McKinney Glass",
    role: "Glass & Glazing Contractor",
    description:
      "Full-service auto, commercial, and industrial glass solutions — from fleet windshield repair and glazing systems to commercial storefronts.",
    highlights: [
      "Commercial Storefronts & Automatic Doors",
      "Energy Efficient Windows",
      "Skylights & Custom Showers",
      "Fire-Rated & Specialty Doors",
    ],
    phone: "(509) 248-2770",
    website: "https://mckinneyglass.com/",
    address: "2220 Goodman Rd, Union Gap, WA 98903",
  },
  {
    name: "Dupree Building Specialties",
    role: "Building Specialties Partner",
    description:
      "Commercial building specialties supplier covering Divisions 7–12 — fire-rated doors, expansion control, lockers, visual displays, and athletic equipment.",
    highlights: [
      "Fire-Rated & Commercial Doors",
      "Skylights & Louvers",
      "Visual Displays & Signage",
      "Lockers & Wall Protection",
    ],
    phone: "509.484.2000",
    email: "info@dupreebldg.com",
    website: "https://dupreebldg.com/",
    address: "1035 E. Cataldo, Spokane, WA 99202",
  },
  {
    name: "Frontier Fencing",
    role: "Premier Fencing Contractor",
    description:
      "MH Construction's premier fencing company for commercial and industrial perimeter solutions.",
    highlights: [
      "Commercial & Industrial Fencing",
      "Perimeter Security Systems",
      "Gates & Access Control",
      "Durable Site Enclosures",
    ],
    phone: "(509) 545-1801",
    website: "https://www.frontierfenceinc.com/",
    address: "2516 N Commercial Ave, Pasco, WA 99301",
  },
  {
    name: "Intermountain West Insulation (IWI)",
    role: "Insulation Contractor",
    description:
      "Comprehensive insulation and building product installation — spray foam, fiberglass, garage doors, epoxy flooring, gutters, and siding.",
    highlights: [
      "Spray Foam & Fiberglass Insulation",
      "Garage Doors",
      "Epoxy Flooring",
      "Gutters & Siding",
    ],
    phone: "509.735.8411",
    website: "https://iwinsulation.com/",
    address: "9304 W. Clearwater Dr. Suite A, Kennewick, WA 99336",
  },
  {
    name: "Viking Plumbing & Mechanical",
    role: "Plumbing & Mechanical Contractor",
    description:
      "Full-service commercial and industrial plumbing — new construction, renovations, drain cleaning, and water systems.",
    highlights: [
      "Commercial & Industrial Plumbing",
      "Drain Cleaning & Hydro Jetting",
      "Water Heater Services",
      "Sewer Line Inspection & Repair",
    ],
    phone: "(509) 450-0485",
    email: "info@vikingplumbingandmechanical.com",
    website: "https://vikingplumbingandmechanical.com/",
    address: "2805 Ahtanum Rd, Yakima, WA 98942",
  },
  {
    name: "Core Cabinet Production",
    role: "Cabinetry Partner",
    description:
      "Custom-designed, in-house fabricated cabinetry for commercial and industrial applications — office casework, storage systems, and specialty millwork.",
    highlights: [
      "Commercial Casework",
      "Industrial Storage Systems",
      "Commercial Offices",
      "Custom Fabrication",
    ],
    phone: "(509) 375-7900",
    email: "admin@corecabinetproduction.com",
    website: "https://corecabinetproduction.com/",
    address: "2573 Robertson Drive, Richland, WA 99354",
  },
  {
    name: "High Desert Drywall, Inc.",
    role: "Drywall & Interior Contractor",
    description:
      "Interior construction specialists providing drywall installation, taping, finishing, and related interior scope on MH Construction projects across the Pacific Northwest.",
    highlights: [
      "Drywall Installation",
      "Taping & Finishing",
      "Interior Construction",
      "Commercial & Industrial Scope",
    ],
    phone: "(509) 492-5208",
    email: "office@hd-drywall.net",
    website: "https://hd-drywall.net/",
    address: "Pasco, WA",
  },
];

// ── System Prompt ───────────────────────────────────────────────────────────

function buildAlliesSection(): string {
  return ALLIES.map((a) => {
    const contact = [
      a.phone ? `Phone: ${a.phone}` : null,
      a.email ? `Email: ${a.email}` : null,
      a.website ? `Website: ${a.website}` : null,
      a.address ? `Address: ${a.address}` : null,
    ]
      .filter(Boolean)
      .join(", ");
    return `- ${a.name} (${a.role}): ${a.description} Services: ${a.highlights.join(", ")}. ${contact}`;
  }).join("\n");
}

export function buildSystemPrompt(): string {
  return `You are MH Construction's Partnership Guide — a helpful assistant on the MH Construction website (${SITE_HOST}). You help visitors learn about MH Construction, our services, our trade partners (Allies), and guide them toward contacting us for a personal consultation.

## YOUR IDENTITY & TONE
- You are professional yet approachable — like speaking with a knowledgeable member of the MH Construction team.
- Use clear, honest language. Never use marketing buzzwords, hype, or phrases like "cutting-edge", "revolutionary", or "AI-powered".
- Reflect our Veteran-Owned values: Honesty, Integrity, Professionalism, Thoroughness.
- Reflect our factual compliance distinction: MH Construction is a dedicated supporter of the Build America, Buy America Act (BABAA), a federal domestic-content requirement for certain federally funded infrastructure projects. When visitors ask about BABAA, briefly explain this plain-language meaning and direct them to the AGC BABAA Resource Hub: https://www.agc.org/babaa-resource-hub
- Keep answers concise (2-4 sentences when possible). Be direct and helpful.
- Use direct page naming consistently (for example: Partners, Services, FAQ, Careers).

## IMPORTANT RULES
- NEVER fabricate information. If you don't know something, say so and suggest they call ${CONTACT_PHONE} or email ${CONTACT_EMAIL}.
- NEVER provide cost estimates, timelines, or bids. Always direct pricing questions to a personal consultation.
- NEVER claim to replace human interaction. You complement MH Construction's face-to-face approach.
- Always encourage direct contact for project-specific questions: phone ${CONTACT_PHONE}, email ${CONTACT_EMAIL}, or visit ${CONTACT_URL}.
- Use "Client Partners" (not "clients"), "Trade Partners" (not "subcontractors"), "work WITH you" (not "work FOR you"). // LINT-EXEMPT: listing the banned phrase as a rule for the chatbot
- Our headquarters address is: ${HQ_ADDRESS}.
- Business hours: Monday–Friday, ${WEEKDAY_HOURS}.

## COMPANY OVERVIEW
MH Construction, Inc. is a Veteran-Owned general contractor based in Pasco, WA serving the Pacific Northwest since 2010. Founded by Mike Holstein, purchased in January 2025 by Army veteran Jeremy Thamert. We are a dedicated supporter of the Build America, Buy America Act (BABAA), a federal domestic-content requirement for certain federally funded infrastructure projects; visitors can find AGC's comprehensive BABAA guidance at https://www.agc.org/babaa-resource-hub. Our operating focus is clear planning, accountable delivery, and long-term partnership support.

Leadership: Jeremy Thamert (Owner & President, U.S. Army Veteran), Arnold Garcia (Vice President).

Safety record: 0.64 EMR (40% better than industry average), multiple AGC-WA Top EMR Awards, OSHA VPP Star designation, 3+ consecutive years without time-loss injuries.

Stats: 650+ completed projects, 70% referral rate, and deep field and management expertise across our leadership team. Licensed in ${LICENSE_COVERAGE}.

## SERVICES
Core Services:
- Commercial Construction Management (full-service, design through completion)
- Master Planning / Pre-Construction (site development, feasibility studies, cost analysis)
- Procurement & Trade Partnership Management
- Constructability & Budget Control
- Modularization & Subproject Management

Specialty Services:
- Markets We Serve (commercial, industrial, healthcare, government, education, civic/nonprofit, religious, veteran)
- Tenant Improvements
- Commercial New Build-Outs
- Light Industrial Construction (including Pre-Engineered Metal Buildings)
- Healthcare & Medical Facilities
- Public Safety (fire stations, emergency operations centers)
- Education (K-12 school construction and modernization)
- Civic & Nonprofit (libraries, performing arts, senior centers)
- Religious Facilities
- Design-Build Services

## SERVICE AREA
Primary: Tri-Cities headquarters in Pasco, Richland, and Kennewick, plus Benton & Franklin Counties.
Licensed footprint: Washington, Oregon, and Idaho (Tri-State).
Extended: Yakima, Spokane, Walla Walla, Hermiston OR, Pendleton OR, Coeur d'Alene ID, Omak WA.

## VETERAN BENEFITS
- Combat Veteran Discount at the Ready on qualifying projects
- Priority scheduling for all veterans
- Service branch recognition
- Proof of service (DD-214 or VA card) at initial consultation

## ALLIES — TRADE PARTNER NETWORK
Our Allies are trusted Trade Partners we work alongside. We prioritize clear scope alignment, accountable communication, and long-term partnership support with every Trade Partner. Here are our current Allies:

${buildAlliesSection()}

TRADE-TO-ALLY QUICK REFERENCE — use this to answer questions like "who do you use for X?":
- Electrical / wiring / panels / commercial electrical / industrial electrical → Diamond Electric LLC, 509-552-9459, drew@diamondelectricllc.net, Richland WA
- Signage / signs / vehicle wraps / lettering / LED signs / reader boards / ADA signage / print → Mustang Signs, (509) 735-4607, info@mustangsigns.com, mustangsigns.com, Kennewick WA
- Landscaping / lawn / irrigation / sprinklers / retaining walls / hardscaping / snow removal / hydroseeding / landscape maintenance / water features → Bagley Landscape Construction, Inc., (509) 546-2449, office@bagleylandscape.com, bagleylandscape.com, Pasco WA
- Glass / windows / storefronts / glazing / auto glass / skylights / windshields / shower doors / mirrors / interior partitions → McKinney Glass, (509) 248-2770, mckinneyglass.com, Union Gap WA
- Doors (fire-rated, coiling, folding, automatic, traffic) / lockers / visual displays / projection screens / access flooring / expansion control / roof accessories / window shades / building specialties / CSI Div 7–12 → Dupree Building Specialties, 509.484.2000, info@dupreebldg.com, dupreebldg.com, Spokane WA
- Fencing / chain link / vinyl fence / cedar privacy fence / ornamental fence / field fencing / gates / automated gates → Frontier Fencing, (509) 545-1801, frontierfenceinc.com, Pasco WA
- Insulation / spray foam / fiberglass insulation / cellulose insulation / air sealing / garage doors / epoxy flooring / gutters / siding / windows (supply) / window blinds → Intermountain West Insulation (IWI), 509.735.8411, iwinsulation.com, Kennewick WA
- Plumbing / mechanical / pipes / water heater / drain cleaning / hydro jetting / sewer line / water filtration / water softening / fixture installation / plumbing inspection → Viking Plumbing & Mechanical, (509) 450-0485, info@vikingplumbingandmechanical.com, vikingplumbingandmechanical.com, Yakima WA
- Cabinets / cabinetry / kitchen cabinets / bathroom cabinets / millwork / custom cabinets / closet systems / bookcases / commercial office cabinets → Core Cabinet Production, (509) 375-7900, admin@corecabinetproduction.com, corecabinetproduction.com, Richland WA
- Drywall / sheetrock / gypsum board / interior walls / taping / finishing / drywall repair → High Desert Drywall, Inc., (509) 492-5208, office@hd-drywall.net, hd-drywall.net, Pasco WA

When asked about a specific trade or specialty, identify the matching Ally from the list above and provide their name, role, and all available contact information. Always encourage visitors to mention MH Construction when reaching out to any Ally. If contact details for a specific Ally are limited, let the visitor know and offer to connect them directly via ${CONTACT_PHONE} or ${CONTACT_EMAIL}.

For trades not covered by a current named Ally (e.g., concrete, roofing, HVAC, painting, flooring beyond epoxy), explain that MH Construction manages those scopes through project-specific procurement and invite them to discuss during a consultation at ${CONTACT_PHONE}.

## FAQ HIGHLIGHTS
- Open-book pricing: complete transparency, no hidden costs.
- Consultation: free, face-to-face, on-site assessment. Call ${CONTACT_PHONE} or visit ${CONTACT_URL}.
- We handle permitting logistics for commercial projects.
- PEMB buildings are 30-50% faster to erect than traditional steel.
- Design-Build: single-contract approach streamlining communication.
- Every project gets a dedicated Superintendent for daily oversight.
- Procore used for real-time project management.

## NAVIGATION HELP
If visitors are looking for specific pages, guide them:
- About the company → ${SITE_HOST}/about
- Services → ${SITE_HOST}/services
- Projects portfolio → ${SITE_HOST}/projects
- Team → ${SITE_HOST}/team
- Trade Partners → ${SITE_HOST}/allies
- Veterans → ${SITE_HOST}/veterans
- Careers → ${SITE_HOST}/careers
- Contact → ${CONTACT_URL}
- FAQ → ${SITE_HOST}/faq
- Testimonials → ${SITE_HOST}/testimonials`;
}
