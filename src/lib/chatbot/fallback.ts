import { ALLIES } from "@/lib/chatbot/knowledge-base";

const TRADE_MAP: Record<string, string> = {
  electric: "Diamond Electric LLC",
  electrical: "Diamond Electric LLC",
  sign: "Mustang Signs",
  signage: "Mustang Signs",
  landscape: "Bagley Landscape Construction, Inc.",
  landscaping: "Bagley Landscape Construction, Inc.",
  glass: "McKinney Glass",
  glazing: "McKinney Glass",
  window: "McKinney Glass",
  door: "Dupree Building Specialties",
  fence: "D-Fence Fencing Company",
  fencing: "D-Fence Fencing Company",
  insulation: "Intermountain West Insulation (IWI)",
  plumbing: "Viking Plumbing & Mechanical",
  plumber: "Viking Plumbing & Mechanical",
  cabinet: "Core Cabinet Production",
  cabinetry: "Core Cabinet Production",
};

const ENGLISH_INTENT_RESPONSES = [
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
    response:
      "You can reach MH Construction at (509) 308-6489 or office@mhc-gc.com. We offer face-to-face consultations, and you can also use mhc-gc.com/contact to get started.",
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
    response:
      "We do not quote pricing through chat because each project needs a real scope review. The best next step is a consultation at (509) 308-6489 or mhc-gc.com/contact.",
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
    response:
      "MH Construction is veteran-owned, led by Army veteran Jeremy Thamert. We support Build America, Buy America Act compliance, offer a Combat Veteran Discount, and can walk you through the right next step by phone at (509) 308-6489.",
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
    response:
      "MH Construction is BBB Accredited with an A+ rating, veteran-owned, and focused on relationship-first service. If you want to talk through your project directly, call (509) 308-6489.",
  },
  {
    keywords: ["safety", "emr", "osha", "incident rate"],
    response:
      "Safety is a core part of how we work. MH Construction maintains a 0.64 EMR, has earned multiple AGC-WA Top EMR Awards, and holds OSHA VPP Star recognition.",
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
    response:
      "MH Construction provides commercial construction, industrial work, healthcare and medical facilities, civic and nonprofit projects, public-sector construction, design-build support, tenant improvements, and pre-construction planning. You can see more at mhc-gc.com/services or call (509) 308-6489.",
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
    response:
      "MH Construction is based at 3111 N Capitol Ave, Pasco, WA 99301. We serve the Tri-Cities and broader Pacific Northwest, including work in Washington, Oregon, and Idaho.",
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
    response: `Our Trade Partners, also called Allies, include ${ALLIES.map((ally) => ally.name).join(", ")}. You can learn more at mhc-gc.com/allies.`,
  },
] as const;

const ENGLISH_DEFAULT_RESPONSE =
  "I can help with MH Construction services, Trade Partners, veteran-owned qualifications, safety information, and contact details. For project-specific questions, call (509) 308-6489 or visit mhc-gc.com/contact.";

const SPANISH_DEFAULT_RESPONSE =
  "Puedo ayudarle con los servicios de MH Construction, nuestros socios comerciales, información para veteranos y datos de contacto. Para preguntas específicas sobre un proyecto, llame al (509) 308-6489 o visite mhc-gc.com/contact.";

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
      "servicio",
      "servicios",
      "que hacen",
      "que construyen",
      "que ofrecen",
    ])
  ) {
    return "MH Construction ofrece construcción comercial, trabajo industrial, proyectos médicos y de salud, proyectos cívicos y sin fines de lucro, apoyo de diseño y construcción, mejoras para inquilinos y planificación previa a la construcción. Puede ver más en mhc-gc.com/services o llamar al (509) 308-6489.";
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
    return "Puede comunicarse con MH Construction al (509) 308-6489 o por correo a office@mhc-gc.com. También puede comenzar en mhc-gc.com/contact.";
  }

  if (includesAny(normalized, ["veterano", "militar", "babaa"])) {
    return "MH Construction es una empresa de propiedad de veteranos, dirigida por el veterano del Ejército Jeremy Thamert. También apoyamos el cumplimiento de Build America, Buy America Act y ofrecemos un Combat Veteran Discount. Llámenos al (509) 308-6489 para el siguiente paso adecuado.";
  }

  if (includesAny(normalized, ["aliado", "aliados", "socio", "socios"])) {
    return `Nuestros socios comerciales, también llamados Aliados, incluyen ${ALLIES.map((ally) => ally.name).join(", ")}. Puede conocer más en mhc-gc.com/allies.`;
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
