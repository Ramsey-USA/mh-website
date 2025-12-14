/**
 * Centralized Knowledge Base for MH Construction Chatbot
 * Single source of truth for company information, services, and capabilities
 *
 * @author MH Construction Development Team
 * @date November 12, 2025
 */

export interface CompanyContact {
  phone: string;
  email: string;
  hours: string;
  hoursDetails: string[];
  address: string;
  city: string;
  state: string;
  zip: string;
  mapsLink: string;
  responseTimes: {
    standard: string;
    veterans: string;
    emergency: string;
  };
}

export interface CompanyServices {
  residential: string[];
  commercial: string[];
  specialty: string[];
  government: string[];
}

export interface CompanyStats {
  founded: string;
  experience: string;
  projects: string;
  emr: string;
  licensed: string[];
  certifications: string[];
  insurance: string[];
}

export interface CompanyLeadership {
  president: {
    name: string;
    title: string;
    background: string;
  };
  vp: {
    name: string;
    title: string;
    background: string;
  };
  founder: {
    name: string;
    title: string;
    status: string;
  };
}

export interface CompanyKnowledge {
  contact: CompanyContact;
  services: CompanyServices;
  stats: CompanyStats;
  leadership: CompanyLeadership;
}

/**
 * Centralized company knowledge base
 * Update this when company information changes
 */
export const companyKnowledge: CompanyKnowledge = {
  contact: {
    phone: "(509) 308-6489",
    email: "office@mhc-gc.com",
    hours: "Monday-Friday, 7:00 AM - 4:00 PM PST",
    hoursDetails: [
      "Monday-Friday: 7:00 AM - 4:00 PM PST",
      "Saturday: By appointment only",
      "Sunday: Closed",
      "Emergency services: Available 24/7 for urgent issues",
    ],
    address: "3111 N. Capitol Ave.",
    city: "Pasco",
    state: "WA",
    zip: "99301",
    mapsLink: "https://maps.google.com/?q=3111+N+Capitol+Ave+Pasco+WA+99301",
    responseTimes: {
      standard: "Within 24 hours",
      veterans: "Within 12 hours (priority service)",
      emergency: "Same day response",
    },
  },

  services: {
    residential: [
      "Custom home construction",
      "Kitchen remodels and renovations",
      "Bathroom renovations",
      "Home additions and expansions",
      "Deck and patio construction",
      "Garage construction and conversions",
      "Basement finishing",
      "Whole home renovations",
      "Energy efficiency upgrades",
      "Accessibility modifications",
    ],
    commercial: [
      "Office buildings",
      "Retail spaces",
      "Restaurant construction",
      "Warehouse facilities",
      "Medical offices",
      "Multi-unit housing",
      "Commercial renovations",
      "Tenant improvements",
    ],
    specialty: [
      "Government projects and grants",
      "Veteran services (Combat Veteran Discount at the Ready)",
      "Historic preservation",
      "Green building and LEED certification",
      "ADA compliance modifications",
      "Disaster recovery and restoration",
    ],
    government: [
      "Federal grant projects",
      "State and local government contracts",
      "Public facility construction",
      "Municipal infrastructure",
      "Veteran housing programs",
      "Community development projects",
    ],
  },

  stats: {
    founded: "2010",
    experience: "150+ years combined team experience",
    projects: "650+ successfully completed projects",
    emr: "0.64 EMR (40% better than industry average) - Award-Winning Safety",
    licensed: ["Washington", "Oregon", "Idaho"],
    certifications: [
      "Licensed General Contractor",
      "OSHA VPP Star Designation",
      "AGC-WA Top EMR Award Winner (Multiple Years)",
      "Lead-Safe Certified",
      "Energy Star Partner",
      "EPA Certified",
    ],
    insurance: [
      "Full general liability insurance",
      "Workers compensation insurance",
      "Bonded and insured across 3 states",
      "Builder's risk insurance available",
    ],
  },

  leadership: {
    president: {
      name: "Jeremy Thamert",
      title: "Owner & President",
      background:
        "Combat veteran and experienced construction leader with 20+ years in the industry. " +
        "Jeremy oversees all company operations and ensures every project meets MH Construction's " +
        "high standards of quality and integrity.",
    },
    vp: {
      name: "Arnold Garcia",
      title: "Vice President",
      background:
        "Seasoned construction professional specializing in project management and client relations. " +
        "Arnold ensures seamless communication and execution on all MH Construction projects.",
    },
    founder: {
      name: "Mike Holstein",
      title: "Founder",
      status: "Retired",
    },
  },
};

/**
 * Helper function to get formatted contact information
 */
export function getContactInfo(): string {
  const { contact } = companyKnowledge;
  return (
    `**Phone:** ${contact.phone}\n\n` +
    `**Email:** ${contact.email}\n\n` +
    `**Hours:** ${contact.hours}\n\n` +
    `**Office:** ${contact.address}, ${contact.city}, ${contact.state} ${contact.zip}\n` +
    `[Get Directions →](${contact.mapsLink})`
  );
}

/**
 * Helper function to get service list by category
 */
export function getServices(category?: keyof CompanyServices): string[] {
  const { services } = companyKnowledge;
  if (category) {
    return services[category];
  }
  return [
    ...services.residential,
    ...services.commercial,
    ...services.specialty,
    ...services.government,
  ];
}

/**
 * Helper function to get company statistics
 */
export function getStats(): CompanyStats {
  return companyKnowledge.stats;
}

/**
 * Helper function to get leadership information
 */
export function getLeadership(
  role?: "president" | "vp" | "founder",
):
  | CompanyLeadership
  | CompanyLeadership["president"]
  | CompanyLeadership["vp"]
  | CompanyLeadership["founder"] {
  const { leadership } = companyKnowledge;
  if (role) {
    return leadership[role];
  }
  return leadership;
}
