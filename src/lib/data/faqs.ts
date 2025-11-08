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

/**
 * Careers Page FAQs
 */
export const careersFAQs: FAQ[] = [
  {
    id: "hiring-process",
    question: "What is your hiring process?",
    answer:
      "Our hiring process typically takes 1-3 weeks: (1) Submit application online or via email. (2) Phone screening within 3-5 days (15-20 minutes). (3) In-person interview with team leads (45-60 minutes). (4) Skills assessment or site visit for trade positions (1-2 hours). (5) Background check and reference verification. (6) Job offer and onboarding. We keep you updated at every step.",
    icon: "how_to_reg",
    iconColor: "primary",
    tags: ["1-3 Weeks", "5 Steps", "Fast Track Available"],
  },
  {
    id: "experience-required",
    question: "What level of experience do you require?",
    answer:
      "It depends on the role! Entry-level laborers: No experience required, we provide on-the-job training. Apprentice tradespeople: 1-2 years preferred. Journeyman tradespeople: 4+ years and state certification. Project managers: 5+ years construction management. Superintendents: 7+ years field supervision. We value attitude and work ethic as much as experience—veterans and career-changers are encouraged to apply.",
    icon: "school",
    iconColor: "secondary",
    tags: ["Entry to Expert", "Veterans Welcome", "On-Job Training"],
  },
  {
    id: "veteran-benefits",
    question: "What special benefits do you offer veterans?",
    answer:
      "As a veteran-owned company, we're committed to hiring and supporting veterans. Benefits include: Veteran hiring preference, military skills translation assistance, flexible scheduling for VA appointments and continued service, peer support network, and recognition of military training/certifications. We understand the transition from military to civilian work and provide mentorship throughout.",
    icon: "military_tech",
    iconColor: "accent",
    tags: ["Hiring Preference", "Skills Transfer", "Flexible Scheduling"],
  },
  {
    id: "pay-benefits",
    question: "What are the pay and benefits?",
    answer:
      "We offer competitive, market-rate compensation based on role and experience. Entry-level laborers start at $18-22/hr. Skilled tradespeople earn $25-40+/hr. Project managers/superintendents earn $70K-120K+ annually. Benefits include: health/dental/vision insurance (company contributes 75%), 401(k) with company match, paid time off (2-3 weeks), paid holidays, continuing education/training, tool allowances for trades, and performance bonuses.",
    icon: "attach_money",
    iconColor: "primary",
    tags: ["Market Rates", "Health Insurance", "401(k) Match", "PTO"],
  },
  {
    id: "career-growth",
    question: "What are the opportunities for advancement?",
    answer:
      "We promote from within whenever possible. Typical career path: Laborer → Skilled Tradesperson → Lead/Foreman → Superintendent → Project Manager. We invest in professional development through: paid training and certifications (OSHA, First Aid, trade licenses), mentorship programs pairing you with senior team members, leadership development for those interested in management, and tuition reimbursement for construction-related courses. Many of our current leaders started as entry-level employees.",
    icon: "trending_up",
    iconColor: "secondary",
    tags: ["Promote from Within", "Paid Training", "Leadership Development"],
  },
  {
    id: "work-schedule",
    question: "What are typical work hours and schedules?",
    answer:
      "Standard schedule is Monday-Friday, 7:00 AM - 3:30 PM (40 hours/week). Some projects may require earlier starts (6:00 AM) or weekend work, which is voluntary and paid at overtime rates (1.5x). We respect work-life balance and avoid excessive overtime. Office staff typically work 8:00 AM - 5:00 PM. Flexibility available for VA appointments, family emergencies, and military service obligations for guard/reserve members.",
    icon: "schedule",
    iconColor: "accent",
    tags: ["M-F 7-3:30", "OT Available", "Work-Life Balance"],
  },
];

/**
 * Booking/Consultation Page FAQs
 */
export const bookingFAQs: FAQ[] = [
  {
    id: "consultation-cost",
    question: "Is the consultation really free?",
    answer:
      "Yes, absolutely free with zero obligation. Our initial consultation is a no-pressure conversation to understand your project, answer your questions, and provide expert guidance. We'll discuss scope, timeline, budget considerations, and potential challenges—all at no cost. You're under no obligation to hire us, and we won't pressure you for a decision during or after the consultation.",
    icon: "check_circle",
    iconColor: "primary",
    tags: ["100% Free", "No Obligation", "No Pressure"],
  },
  {
    id: "consultation-length",
    question: "How long does a consultation take?",
    answer:
      "Most consultations last 45-60 minutes, but we'll take as much time as needed to thoroughly understand your project and answer all your questions. For complex projects, we may schedule a follow-up consultation or site visit. We keep the conversation focused and efficient—respecting your time while ensuring we gather all necessary information to provide accurate guidance.",
    icon: "timer",
    iconColor: "secondary",
    tags: ["45-60 Minutes", "No Rush", "Follow-up Available"],
  },
  {
    id: "consultation-format",
    question: "Can consultations be done virtually or on-site?",
    answer:
      "Yes! We offer three formats: (1) Phone consultation: Perfect for initial discussions and simple projects. (2) Video call (Zoom, Teams): Great for reviewing plans/photos and detailed discussions. (3) On-site visit: Recommended for remodels, repairs, or complex projects where we need to see the space. You choose what works best for your schedule and project type. Site visits can be scheduled as a follow-up to phone/video consultations.",
    icon: "videocam",
    iconColor: "accent",
    tags: ["Phone", "Video", "On-Site"],
  },
  {
    id: "preparation",
    question: "How should I prepare for the consultation?",
    answer:
      "Bring or have ready: (1) Photos of the project area (if remodel/repair). (2) Any existing plans, drawings, or sketches. (3) Budget range or financing information. (4) Timeline expectations or deadline constraints. (5) List of questions or concerns. (6) Property deed or HOA documents if applicable. Don't worry if you don't have everything—we can work with what you have and help fill in the gaps.",
    icon: "checklist",
    iconColor: "primary",
    tags: ["Photos", "Plans", "Budget Info", "Questions"],
  },
  {
    id: "after-consultation",
    question: "What happens after the consultation?",
    answer:
      "Within 3-5 business days, you'll receive: (1) Detailed written proposal with scope, timeline, and cost estimate. (2) Preliminary project plan and approach. (3) List of any additional information needed. (4) Next steps if you decide to move forward. (5) Our contact information for any follow-up questions. Take your time reviewing everything—there's no pressure to make an immediate decision. We're here to answer questions whenever you're ready.",
    icon: "assignment",
    iconColor: "secondary",
    tags: ["3-5 Days", "Written Proposal", "No Pressure"],
  },
  {
    id: "cancellation",
    question: "Can I cancel or reschedule my consultation?",
    answer:
      "Absolutely! Life happens, and we understand. You can cancel or reschedule anytime via phone, email, or our online booking system—no penalties or fees. We just ask for 24 hours notice when possible so we can offer the time slot to another client. If you need to reschedule the same day, just give us a call at (509) 308-6489 and we'll do our best to accommodate.",
    icon: "event_available",
    iconColor: "accent",
    tags: ["Free Cancellation", "Easy Reschedule", "24hr Notice Preferred"],
  },
];
