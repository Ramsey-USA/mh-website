import { ALLIES } from "@/lib/chatbot/knowledge-base";
import { COMPANY_INFO } from "@/lib/constants/company";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl().replace(/\/$/, "");
const SITE_HOST = SITE_URL.replace(/^https?:\/\/(www\.)?/, "");
const CONTACT_URL = `${SITE_HOST}/contact`;
const CONTACT_PHONE = COMPANY_INFO.phone.display;
const CONTACT_EMAIL = COMPANY_INFO.email.main;
const HQ_ADDRESS = COMPANY_INFO.address.full;
const WEEKDAY_HOURS = COMPANY_INFO.hours.weekday.display;

function getLicenseCoverageText(): string {
  const labels: Record<string, string> = {
    WA: "Washington",
    OR: "Oregon",
    ID: "Idaho",
  };

  const names = COMPANY_INFO.details.licenses
    .map((code) => labels[code] ?? code)
    .filter(Boolean);

  if (names.length === 0) {
    return "the Pacific Northwest";
  }

  if (names.length === 1) {
    return names[0] ?? "the Pacific Northwest";
  }

  if (names.length === 2) {
    return `${names[0]} and ${names[1]}`;
  }

  const last = names.at(-1);
  return `${names.slice(0, -1).join(", ")}, and ${last}`;
}

const LICENSE_COVERAGE_TEXT = getLicenseCoverageText();

const TRADE_MAP: Record<string, string> = {
  electric: "Diamond Electric LLC",
  electrical: "Diamond Electric LLC",
  wiring: "Diamond Electric LLC",
  panel: "Diamond Electric LLC",
  panels: "Diamond Electric LLC",
  sign: "Mustang Signs",
  signs: "Mustang Signs",
  signage: "Mustang Signs",
  wrap: "Mustang Signs",
  wraps: "Mustang Signs",
  led: "Mustang Signs",
  landscape: "Bagley Landscape Construction, Inc.",
  landscaping: "Bagley Landscape Construction, Inc.",
  irrigation: "Bagley Landscape Construction, Inc.",
  sprinkler: "Bagley Landscape Construction, Inc.",
  sprinklers: "Bagley Landscape Construction, Inc.",
  hardscaping: "Bagley Landscape Construction, Inc.",
  glass: "McKinney Glass",
  glazing: "McKinney Glass",
  window: "McKinney Glass",
  windows: "McKinney Glass",
  storefront: "McKinney Glass",
  door: "Dupree Building Specialties",
  doors: "Dupree Building Specialties",
  locker: "Dupree Building Specialties",
  fence: "Frontier Fencing",
  fencing: "Frontier Fencing",
  gate: "Frontier Fencing",
  gates: "Frontier Fencing",
  insulation: "Intermountain West Insulation (IWI)",
  spray: "Intermountain West Insulation (IWI)",
  plumbing: "Viking Plumbing & Mechanical",
  plumber: "Viking Plumbing & Mechanical",
  drain: "Viking Plumbing & Mechanical",
  sewer: "Viking Plumbing & Mechanical",
  mechanical: "Viking Plumbing & Mechanical",
  cabinet: "Core Cabinet Production",
  cabinetry: "Core Cabinet Production",
  millwork: "Core Cabinet Production",
  drywall: "High Desert Drywall, Inc.",
  sheetrock: "High Desert Drywall, Inc.",
  gypsum: "High Desert Drywall, Inc.",
  taping: "High Desert Drywall, Inc.",
  finishing: "High Desert Drywall, Inc.",
};

const UNMAPPED_TRADE_KEYWORDS = [
  "concrete",
  "roof",
  "roofing",
  "hvac",
  "heating",
  "cooling",
  "air conditioning",
  "painting",
  "paint",
  "flooring",
  "tile",
  "carpet",
  "framing",
  "asphalt",
  "paving",
  "excavation",
  "demolition",
] as const;

const ENGLISH_INTENT_RESPONSES = [
  {
    keywords: [
      "jeremy",
      "thamert",
      "jeremy thamert",
      "owner",
      "president",
      "leadership profile",
    ],
    response: `Jeremy Thamert is Owner and President of MH Construction, based in Pasco, WA and focused on relationship-first delivery. You can review his leadership profile at ${SITE_HOST}/jeremy-thamert, verified sources at ${SITE_HOST}/jeremy-thamert#verified-sources, and FAQ details at ${SITE_HOST}/jeremy-thamert#jeremy-faq.`,
  },
  {
    keywords: [
      "contact",
      "phone",
      "call",
      "email",
      "consult",
      "consultation",
      "reach you",
      "get in touch",
      "talk to someone",
    ],
    response: `You can reach MH Construction at ${CONTACT_PHONE} or ${CONTACT_EMAIL}. We offer face-to-face consultations, and you can also use ${CONTACT_URL} to get started.`,
  },
  {
    keywords: [
      "price",
      "cost",
      "estimate",
      "bid",
      "quote",
      "budget",
      "pricing",
    ],
    response: `We do not quote pricing through chat because each project needs a real scope review. The best next step is a consultation at ${CONTACT_PHONE} or ${CONTACT_URL}.`,
  },
  {
    keywords: [
      "veteran",
      "military",
      "va",
      "dd 214",
      "babaa",
      "build america",
      "buy america",
      "army",
    ],
    response: `MH Construction is veteran-owned, led by Army veteran Jeremy Thamert. We support Build America, Buy America Act compliance, offer a Combat Veteran Discount, and can walk you through the right next step by phone at ${CONTACT_PHONE}.`,
  },
  {
    keywords: [
      "bbb",
      "better business",
      "accredit",
      "trust",
      "rating",
      "ratings",
      "review",
      "reviews",
      "reputation",
      "credible",
    ],
    response: `MH Construction is BBB Accredited with an A+ rating, veteran-owned, and focused on relationship-first service. If you want to talk through your project directly, call ${CONTACT_PHONE}.`,
  },
  {
    keywords: ["safety", "emr", "osha", "incident rate"],
    response:
      "Safety is a core part of how we work. MH Construction maintains a 0.64 EMR, has earned multiple AGC-WA Top EMR Awards, and holds OSHA VPP Star recognition.",
  },
  {
    keywords: [
      "hours",
      "open",
      "closing",
      "business hours",
      "when are you open",
      "when do you open",
      "when do you close",
    ],
    response: `Our business hours are Monday through Friday, ${WEEKDAY_HOURS} PST. For project-specific coordination, call ${CONTACT_PHONE} or visit ${CONTACT_URL}.`,
  },
  {
    keywords: [
      "service",
      "services",
      "what do you do",
      "what can you do",
      "what can you build",
      "what type",
      "what do you provide",
      "what do you offer",
      "build",
      "construction",
    ],
    response: `MH Construction provides mission-ready construction, industrial work, healthcare and medical facilities, civic and nonprofit projects, public-sector construction, design-build support, fit-outs, and predeployment planning. You can see more at ${SITE_HOST}/services or call ${CONTACT_PHONE}.`,
  },
  {
    keywords: [
      "where",
      "location",
      "area",
      "tri cities",
      "pasco",
      "kennewick",
      "richland",
      "located",
      "service area",
    ],
    response: `MH Construction is based at ${HQ_ADDRESS}. We serve the Tri-Cities and broader Pacific Northwest, including work in ${LICENSE_COVERAGE_TEXT}.`,
  },
  {
    keywords: [
      "ally",
      "allies",
      "partner",
      "partners",
      "trade partner",
      "trade partners",
      "trade",
      "subcontractor",
      "subcontractors",
    ],
    response: `Our Trade Partners, also called Allies, include ${ALLIES.map((ally) => ally.name).join(", ")}. You can learn more at ${SITE_HOST}/allies.`,
  },
] as const;

const ENGLISH_DEFAULT_RESPONSE = `I can help with MH Construction services, Trade Partners, veteran-owned qualifications, safety information, and contact details. For project-specific questions, call ${CONTACT_PHONE} or visit ${CONTACT_URL}.`;

const SPANISH_DEFAULT_RESPONSE = `Puedo ayudarle con los servicios de MH Construction, nuestros socios comerciales, información para veteranos y datos de contacto. Para preguntas específicas sobre un proyecto, llame al ${CONTACT_PHONE} o visite ${CONTACT_URL}.`;

function normalizeMessage(message: string): string {
  return ` ${message
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, " ")
    .trim()} `;
}

function includesAny(haystack: string, needles: string[]): boolean {
  return needles.some((needle) => haystack.includes(` ${needle} `));
}

function buildAllyContact(ally: (typeof ALLIES)[number]): string {
  return [
    ally.phone ? `phone: ${ally.phone}` : null,
    ally.email ? `email: ${ally.email}` : null,
    ally.website ? ally.website : null,
  ]
    .filter(Boolean)
    .join(", ");
}

function getGreetingReply(normalized: string): string | null {
  if (
    !includesAny(normalized, [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "help",
    ])
  ) {
    return null;
  }

  return "Hello. I can help with MH Construction services, Trade Partners, veteran-owned qualifications, safety information, and contact details. What would you like to know?";
}

function getIdentityReply(normalized: string): string | null {
  if (
    !includesAny(normalized, [
      "who are you",
      "what is mh construction",
      "tell me about mh construction",
      "about mh construction",
      "what kind of company are you",
    ])
  ) {
    return null;
  }

  return "MH Construction is a veteran-owned commercial contractor based in Pasco, Washington. We focus on relationship-first service, practical planning, and connecting clients with the right next step for their project.";
}

function getAllyReply(normalized: string): string | null {
  for (const ally of ALLIES) {
    const nameWords = ally.name.toLowerCase().split(/\s+/);
    if (
      !nameWords.some(
        (word) => word.length > 3 && normalized.includes(` ${word} `),
      )
    ) {
      continue;
    }

    const contact = buildAllyContact(ally);
    return `${ally.name} is one of our Trade Partners. ${ally.description} You can reach them at ${contact}. Please mention MH Construction when you contact them.`;
  }

  return null;
}

function getTradeContact(ally: (typeof ALLIES)[number]): string {
  if (ally.phone) {
    return `at ${ally.phone}`;
  }

  if (ally.website) {
    return `at ${ally.website}`;
  }

  return "through our office";
}

function getTradeReply(normalized: string): string | null {
  for (const [keyword, allyName] of Object.entries(TRADE_MAP)) {
    if (!normalized.includes(` ${keyword} `)) {
      continue;
    }

    const ally = ALLIES.find((item) => item.name === allyName);
    if (!ally) {
      continue;
    }

    const contact = getTradeContact(ally);
    return `For ${keyword} work, we often coordinate with ${ally.name}, one of our Trade Partners. ${ally.description} You can reach them ${contact}.`;
  }

  return null;
}

function getUnmappedTradeReply(normalized: string): string | null {
  if (!includesAny(normalized, [...UNMAPPED_TRADE_KEYWORDS])) {
    return null;
  }

  return `We handle that scope through project-specific procurement and Trade Partner coordination. The best next step is a consultation so we can align the right team for your project: ${CONTACT_PHONE} or ${CONTACT_URL}.`;
}

function getIntentReply(normalized: string): string | null {
  const match = ENGLISH_INTENT_RESPONSES.find(({ keywords }) =>
    includesAny(normalized, [...keywords]),
  );

  return match?.response ?? null;
}

function getEnglishFallbackResponse(message: string): string {
  const normalized = normalizeMessage(message);

  return (
    getGreetingReply(normalized) ??
    getIdentityReply(normalized) ??
    getAllyReply(normalized) ??
    getTradeReply(normalized) ??
    getUnmappedTradeReply(normalized) ??
    getIntentReply(normalized) ??
    ENGLISH_DEFAULT_RESPONSE
  );
}

function getSpanishFallbackResponse(message: string): string {
  const normalized = normalizeMessage(message);

  if (
    includesAny(normalized, ["hola", "buenos dias", "buenas tardes", "ayuda"])
  ) {
    return "Hola. Puedo ayudarle con los servicios de MH Construction, nuestros socios comerciales, información para veteranos y datos de contacto. ¿Qué le gustaría saber?";
  }

  if (
    includesAny(normalized, [
      "jeremy",
      "thamert",
      "jeremy thamert",
      "dueno",
      "presidente",
      "liderazgo",
      "perfil",
    ])
  ) {
    return `Jeremy Thamert es Owner and President de MH Construction con base en Pasco, WA y enfoque relationship-first. Puede revisar su perfil en ${SITE_HOST}/jeremy-thamert, fuentes verificadas en ${SITE_HOST}/jeremy-thamert#verified-sources y FAQ en ${SITE_HOST}/jeremy-thamert#jeremy-faq.`;
  }

  if (
    includesAny(normalized, [
      "servicio",
      "servicios",
      "que hacen",
      "que construyen",
      "que ofrecen",
    ])
  ) {
    return `MH Construction ofrece construcción comercial, trabajo industrial, proyectos médicos y de salud, proyectos cívicos y sin fines de lucro, apoyo de diseño y construcción, mejoras para inquilinos y planificación previa a la construcción. Puede ver más en ${SITE_HOST}/services o llamar al ${CONTACT_PHONE}.`;
  }

  if (
    includesAny(normalized, [
      "contacto",
      "telefono",
      "llamar",
      "correo",
      "email",
    ])
  ) {
    return `Puede comunicarse con MH Construction al ${CONTACT_PHONE} o por correo a ${CONTACT_EMAIL}. También puede comenzar en ${CONTACT_URL}.`;
  }

  if (includesAny(normalized, ["veterano", "militar", "babaa"])) {
    return `MH Construction es una empresa de propiedad de veteranos, dirigida por el veterano del Ejército Jeremy Thamert. También apoyamos el cumplimiento de Build America, Buy America Act y ofrecemos un Combat Veteran Discount. Llámenos al ${CONTACT_PHONE} para el siguiente paso adecuado.`;
  }

  if (
    includesAny(normalized, [
      "horario",
      "horarios",
      "abren",
      "abierto",
      "cierran",
    ])
  ) {
    return `Nuestro horario es de lunes a viernes, ${WEEKDAY_HOURS} PST. Para coordinar su proyecto, llámenos al ${CONTACT_PHONE} o visite ${CONTACT_URL}.`;
  }

  if (includesAny(normalized, ["aliado", "aliados", "socio", "socios"])) {
    return `Nuestros socios comerciales, también llamados Aliados, incluyen ${ALLIES.map((ally) => ally.name).join(", ")}. Puede conocer más en ${SITE_HOST}/allies.`;
  }

  return SPANISH_DEFAULT_RESPONSE;
}

export function getChatFallbackResponse(
  message: string,
  locale: "en" | "es" = "en",
): string {
  if (locale === "es") {
    return getSpanishFallbackResponse(message);
  }

  return getEnglishFallbackResponse(message);
}
