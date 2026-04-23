export interface CertificationShowcaseItem {
  label: string;
  inferred: boolean;
}

interface CertificationParameter {
  key: string;
  label: string;
  includes?: string[];
  patterns: RegExp[];
}

const SAFETY_CERT_PARAMETERS: CertificationParameter[] = [
  {
    key: "CERT_A",
    label: "Cert A",
    patterns: [
      /\b(cert|certification|level|class)\s*[-:]?\s*a\b/i,
      /\ba\s*cert\b/i,
    ],
  },
  {
    key: "CERT_B",
    label: "Cert B",
    includes: ["CERT_A"],
    patterns: [
      /\b(cert|certification|level|class)\s*[-:]?\s*b\b/i,
      /\bb\s*cert\b/i,
    ],
  },
  {
    key: "CERT_C",
    label: "Cert C",
    includes: ["CERT_A", "CERT_B"],
    patterns: [
      /\b(cert|certification|level|class)\s*[-:]?\s*c\b/i,
      /\bc\s*cert\b/i,
    ],
  },
  {
    key: "CERT_D",
    label: "Cert D",
    includes: ["CERT_A", "CERT_B", "CERT_C"],
    patterns: [
      /\b(cert|certification|level|class)\s*[-:]?\s*d\b/i,
      /\bd\s*cert\b/i,
    ],
  },
  {
    key: "CERT_E",
    label: "Cert E",
    includes: ["CERT_A", "CERT_B", "CERT_C", "CERT_D"],
    patterns: [
      /\b(cert|certification|level|class)\s*[-:]?\s*e\b/i,
      /\be\s*cert\b/i,
    ],
  },
  {
    key: "OSHA_10",
    label: "OSHA 10",
    patterns: [/\bosha\s*10\b/i],
  },
  {
    key: "OSHA_30",
    label: "OSHA 30",
    includes: ["OSHA_10"],
    patterns: [/\bosha\s*30\b/i, /\bosha\s*30-?hour\b/i],
  },
  {
    key: "LEADERSHIP_DEVELOPMENT",
    label: "Leadership Development",
    patterns: [/\bleadership\s*development\b/i],
  },
  {
    key: "SAFETY_MANAGEMENT",
    label: "Safety Management",
    patterns: [/\bsafety\s*management\b/i],
  },
  {
    key: "CCM",
    label: "CCM",
    patterns: [/\bccm\b/i],
  },
  {
    key: "CPM",
    label: "CPM",
    patterns: [/\bcpm\b/i],
  },
  {
    key: "CDL",
    label: "CDL",
    patterns: [/\bcdl\b/i],
  },
  {
    key: "SPANISH_INTERPRETER",
    label: "Spanish/English Interpreter",
    patterns: [
      /\bspanish\s*\/?\s*english\s*interpreter\b/i,
      /\bstate\s*certified\s*spanish\s*\/?\s*english\s*interpreter\b/i,
    ],
  },
  {
    key: "FORKLIFT_CERT",
    label: "Forklift Certified",
    patterns: [/\bforklift(s|\s*operation|\s*operator)?\b/i],
  },
  {
    key: "AERIAL_LIFT_CERT",
    label: "Aerial Lift Certified",
    patterns: [
      /\baerial\s*platforms?\b/i,
      /\baerial\s*\/?\s*scissor\s*lift\s*operation\b/i,
      /\baerial\s*\/?\s*scissor\s*lifts?\b/i,
    ],
  },
  {
    key: "SCISSOR_LIFT_CERT",
    label: "Scissor Lift Certified",
    includes: ["AERIAL_LIFT_CERT"],
    patterns: [/\bscissor\s*lift(s|\s*operation|\s*operator)?\b/i],
  },
  {
    key: "SNAKE_LIFT_CERT",
    label: "Snake Lift Certified",
    includes: ["AERIAL_LIFT_CERT"],
    patterns: [/\bsnake\s*lift(s|\s*operation|\s*operator)?\b/i],
  },
  {
    key: "CPR_CERT",
    label: "CPR Certified",
    patterns: [/\bcpr\b/i],
  },
  {
    key: "FIRST_AID_CERT",
    label: "First Aid Certified",
    patterns: [/\bfirst\s*aid\b/i],
  },
  {
    key: "POWDER_ACTUATED_TOOLS",
    label: "Powder Actuated Tools Certified",
    patterns: [/\bpowder\s*actuated\s*tools?\b/i],
  },
  {
    key: "ADDA_DRAFTER",
    label: "ADDA Certified Drafter",
    patterns: [/\badda\b/i, /\bmechanical\s*and\s*architectural\s*drafter\b/i],
  },
  {
    key: "CCE",
    label: "CCE",
    patterns: [/\bcce\b/i],
  },
  {
    key: "ASPE",
    label: "ASPE",
    patterns: [/\baspe\b/i],
  },
  {
    key: "LOCKSMITH_CERT",
    label: "Certified Locksmith",
    patterns: [/\bcertified\s*locksmith\b/i],
  },
  {
    key: "SIGMA_WHITE",
    label: "Six Sigma White Belt",
    patterns: [/\bsix\s*sigma\s*white\s*belt\b/i],
  },
  {
    key: "SIGMA_YELLOW",
    label: "Six Sigma Yellow Belt",
    includes: ["SIGMA_WHITE"],
    patterns: [/\bsix\s*sigma\s*yellow\s*belt\b/i],
  },
  {
    key: "SIGMA_GREEN",
    label: "Six Sigma Green Belt",
    includes: ["SIGMA_WHITE", "SIGMA_YELLOW"],
    patterns: [/\bsix\s*sigma\s*green\s*belt\b/i],
  },
  {
    key: "SIGMA_BLACK",
    label: "Six Sigma Black Belt",
    includes: ["SIGMA_WHITE", "SIGMA_YELLOW", "SIGMA_GREEN"],
    patterns: [
      /\bsix\s*sigma\s*black\s*belt\b/i,
      /\bsigma\s*6\s*black\s*belt\b/i,
    ],
  },
  {
    key: "SIGMA_MASTER_BLACK",
    label: "Six Sigma Master Black Belt",
    includes: ["SIGMA_WHITE", "SIGMA_YELLOW", "SIGMA_GREEN", "SIGMA_BLACK"],
    patterns: [
      /\bsix\s*sigma\s*master\s*black\s*belt\b/i,
      /\bmaster\s*six\s*sigma\s*black\s*belt\b/i,
      /\bmaster\s*sigma\s*6\b/i,
    ],
  },
  {
    key: "GLOBAL_ACCELERATOR_WEB_AI",
    label: "Global Accelerator Web Development & AI Design",
    patterns: [
      /\bglobal\s*accelerator\s*web\s*development\s*&\s*ai\s*design\b/i,
    ],
  },
  {
    key: "GOOGLE_ADS",
    label: "Google Ads",
    patterns: [/\bgoogle\s*ads\b/i],
  },
  {
    key: "HUBSPOT",
    label: "HubSpot",
    patterns: [/\bhubspot\b/i],
  },
  {
    key: "MICROSOFT_OFFICE_SPECIALIST",
    label: "Microsoft Office Specialist",
    patterns: [/\bmicrosoft\s*office\s*specialist\b/i],
  },
  {
    key: "CUSTOMER_SERVICE_EXCELLENCE",
    label: "Customer Service Excellence",
    patterns: [/\bcustomer\s*service\s*excellence\b/i],
  },
  {
    key: "PROCORE_CERTIFIED",
    label: "Procore Certified",
    patterns: [
      /\bprocore\s*certified\b(?!\s*(admin|associate|project\s*manager)\b)/i,
    ],
  },
  {
    key: "PROCORE_ASSOCIATE",
    label: "Procore Certified Associate",
    includes: ["PROCORE_CERTIFIED"],
    patterns: [/\bprocore\s*certified\s*associate\b/i],
  },
  {
    key: "PROCORE_PM",
    label: "Procore Certified Project Manager",
    includes: ["PROCORE_CERTIFIED", "PROCORE_ASSOCIATE"],
    patterns: [/\bprocore\s*certified\s*project\s*manager\b/i],
  },
  {
    key: "PROCORE_ADMIN",
    label: "Procore Certified Admin",
    includes: ["PROCORE_CERTIFIED", "PROCORE_ASSOCIATE", "PROCORE_PM"],
    patterns: [/\bprocore\s*certified\s*admin\b/i],
  },
];

const CERT_PARAMETER_MAP = new Map(
  SAFETY_CERT_PARAMETERS.map((parameter) => [parameter.key, parameter]),
);

function expandInheritedParameters(startingKeys: Set<string>): Set<string> {
  const expanded = new Set(startingKeys);
  const queue = [...startingKeys];

  while (queue.length > 0) {
    const key = queue.shift();
    if (!key) {
      continue;
    }

    const parameter = CERT_PARAMETER_MAP.get(key);
    if (!parameter?.includes?.length) {
      continue;
    }

    for (const inheritedKey of parameter.includes) {
      if (!expanded.has(inheritedKey)) {
        expanded.add(inheritedKey);
        queue.push(inheritedKey);
      }
    }
  }

  return expanded;
}

export function buildCertificationShowcase(
  certificationText?: string,
): CertificationShowcaseItem[] {
  if (!certificationText?.trim()) {
    return [];
  }

  const rawItems = certificationText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const explicitKnownKeys = new Set<string>();
  const explicitKnownOrder: string[] = [];
  const customItems: string[] = [];

  for (const rawItem of rawItems) {
    const matched = SAFETY_CERT_PARAMETERS.filter((parameter) =>
      parameter.patterns.some((pattern) => pattern.test(rawItem)),
    );

    if (matched.length === 0) {
      customItems.push(rawItem);
      continue;
    }

    for (const parameter of matched) {
      if (!explicitKnownKeys.has(parameter.key)) {
        explicitKnownKeys.add(parameter.key);
        explicitKnownOrder.push(parameter.key);
      }
    }
  }

  const expandedKeys = expandInheritedParameters(explicitKnownKeys);

  const inferredKnownOrder = SAFETY_CERT_PARAMETERS.map(
    (parameter) => parameter.key,
  ).filter((key) => expandedKeys.has(key) && !explicitKnownKeys.has(key));

  const knownItems: CertificationShowcaseItem[] = [
    ...explicitKnownOrder.map((key) => ({
      label: CERT_PARAMETER_MAP.get(key)?.label ?? key,
      inferred: false,
    })),
    ...inferredKnownOrder.map((key) => ({
      label: CERT_PARAMETER_MAP.get(key)?.label ?? key,
      inferred: true,
    })),
  ];

  const customShowcaseItems = customItems.map((label) => ({
    label,
    inferred: false,
  }));

  return [...knownItems, ...customShowcaseItems];
}
