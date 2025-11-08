/**
 * FAQ Data Structure
 * Centralized FAQ data for reuse across multiple pages
 */

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  icon: string;
  iconColor: "primary" | "secondary" | "accent";
  tags?: string[];
  tip?: string;
}

/**
 * Services Page FAQs
 */
export const serviceFAQs: FAQ[] = [
  {
    id: "licensing",
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. MH Construction holds all required Washington State contractor licenses for general construction and specialized trades. We carry comprehensive general liability insurance ($2M policy), worker's compensation insurance, and additional coverage as required by project specifications.",
    icon: "verified",
    iconColor: "primary",
    tags: ["WA State Licensed", "$2M Liability", "Workers Comp"],
  },
  {
    id: "timeline",
    question: "How long do projects typically take?",
    answer:
      "Project timelines vary based on scope, complexity, and weather conditions. Small commercial tenant improvements: 2-4 weeks. Residential remodels: 4-8 weeks. New commercial builds: 3-6 months. Ground-up construction: 6-12 months. We provide detailed schedules during estimation and update you regularly throughout construction.",
    icon: "schedule",
    iconColor: "secondary",
    tip: "Pro tip: Add 10-15% buffer time for unforeseen conditions or permit delays.",
  },
  {
    id: "payment",
    question: "What are your payment terms?",
    answer:
      "We operate on a transparent progress payment schedule aligned with project milestones. Typical structure: deposit upon contract signing (10-20%), milestone payments at key completion stages (foundation, framing, rough-in, finishes), and final payment upon substantial completion and your approval. We accept checks, ACH transfers, and credit cards (fees apply).",
    icon: "payments",
    iconColor: "accent",
    tip: "No payment surprises—open-book pricing with detailed line items.",
  },
  {
    id: "warranty",
    question: "Do you offer warranties on your work?",
    answer:
      "Yes! We stand behind our craftsmanship with a 1-year workmanship warranty on all construction labor. Materials and equipment carry manufacturer warranties (typically 1-10 years depending on item). Structural work may include extended warranties. We address any warranty issues promptly and professionally.",
    icon: "security",
    iconColor: "primary",
    tags: ["1-Year Labor", "Mfg. Warranties", "Structural Coverage"],
  },
  {
    id: "emergency",
    question: "Do you offer emergency construction services?",
    answer:
      "Yes. We provide rapid-response emergency construction support for urgent situations like storm damage, equipment failure, or critical facility issues. Contact us immediately at (509) 308-6489 for emergency assistance. We can typically deploy crews within 24-48 hours for assessment and emergency repairs.",
    icon: "emergency",
    iconColor: "secondary",
    tags: ["24-48hr Response", "Storm Damage", "Rapid Deployment"],
  },
  {
    id: "service-areas",
    question: "What areas do you serve?",
    answer:
      "We primarily serve the Tri-Cities area (Richland, Kennewick, Pasco) and surrounding communities in southeastern Washington. We're licensed and actively work throughout Washington State, Oregon, and Idaho for larger commercial projects. Travel fees may apply for projects outside our primary service area—contact us to discuss your location.",
    icon: "location_on",
    iconColor: "accent",
    tags: ["Tri-Cities Primary", "WA, OR, ID Licensed", "Regional Projects"],
  },
  {
    id: "safety",
    question: "What is your safety record?",
    answer:
      "Safety is our top priority. We maintain an exceptional 0.6 EMR (Experience Modification Rate)—40% better than the industry average of 1.0. We've achieved 3+ years without a time-loss injury through rigorous safety training, daily toolbox talks, comprehensive job hazard analyses, and a culture where every team member is empowered to stop work if safety concerns arise.",
    icon: "verified_user",
    iconColor: "primary",
    tags: [".6 EMR", "3+ Years Safe", "OSHA Compliant"],
  },
  {
    id: "subcontractors",
    question: "Do you use subcontractors?",
    answer:
      "Yes, for specialized trades like electrical, plumbing, and HVAC, we partner with highly vetted subcontractors who meet our stringent standards for quality, safety, and reliability. All subcontractors are licensed, insured, and background-checked. We maintain direct oversight and accountability—you have one point of contact (us) for all aspects of your project.",
    icon: "groups",
    iconColor: "secondary",
    tip: "Our subcontractor network has worked with us for 10+ years on average.",
  },
];

/**
 * Helper functions
 */
export function getFAQById(
  id: string,
  faqs: FAQ[] = serviceFAQs,
): FAQ | undefined {
  return faqs.find((faq) => faq.id === id);
}

export function getFAQsByCategory(
  category:
    | "licensing"
    | "timeline"
    | "payment"
    | "warranty"
    | "emergency"
    | "service-areas"
    | "safety"
    | "subcontractors",
): FAQ[] {
  return serviceFAQs.filter((faq) => faq.id === category);
}
