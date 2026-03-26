/**
 * Careers Data
 * Centralized data for job positions, company benefits, and culture values
 * Used primarily on /careers page
 */

export interface CompanyBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface VeteranBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface CultureValue {
  icon: string;
  title: string;
  description: string;
  color: string;
}

// Company Benefits
export const companyBenefits: CompanyBenefit[] = [
  {
    icon: "health_and_safety",
    title: "Comprehensive Health Coverage",
    description:
      "Medical, dental, and vision insurance with competitive premiums and low deductibles. Supporting your health and your family's well-being.",
  },
  {
    icon: "savings",
    title: "Retirement Planning",
    description:
      "401(k) plan with generous company matching to help secure your financial future. We invest in your long-term success.",
  },
  {
    icon: "military_tech",
    title: "Professional Development & Continuous Learning",
    description:
      "Continuing education, certifications, and training opportunities to advance your career. Regular training on new techniques, safety standards (OSHA 30, VPP Star standards), and technology plus leadership development, structured mentorship programs, cross-training across multiple specialties, and active industry involvement.",
  },
  {
    icon: "schedule",
    title: "Work-Life Balance",
    description:
      "Flexible scheduling and time off policies that respect your personal life and family commitments. We understand construction demands—and believe in supporting your well-being.",
  },
  {
    icon: "verified_user",
    title: "Award-Winning Safety First Culture",
    description:
      "Industry-leading .64 EMR safety record (40% better than industry average), multiple AGC-WA Top EMR Awards (2019-2021, 2025 Most Improved), OSHA VPP Star designation, and 3+ consecutive years without time-loss injuries. Presidential leadership focused on safety management, organizational standards, proactive hazard identification, regular training, and high-quality equipment. Everyone goes home safe, every single day—no timeline or budget overrides safety.",
  },
];

// Veteran-Specific Benefits
export const veteranBenefits: VeteranBenefit[] = [
  {
    icon: "military_tech",
    title: "Veteran Hiring Priority",
    description:
      "Active veteran hiring initiative with priority consideration for qualified military veterans. We understand the value of military experience and actively recruit those who served.",
  },
  {
    icon: "diversity_3",
    title: "Military Skills Transfer",
    description:
      "Structured transition program helping veterans leverage military skills—equipment operation, team coordination, mission planning—directly into construction careers.",
  },
  {
    icon: "military_tech",
    title: "GI Bill & Training Support",
    description:
      "Full support for veterans using GI Bill benefits for apprenticeships and continuing education. We'll work with your VA benefits to maximize your training opportunities.",
  },
  {
    icon: "diversity_3",
    title: "Veteran Mentorship Program",
    description:
      "Connect with veteran leaders in our organization who understand the military-to-civilian transition. Army veteran leadership provides guidance and support.",
  },
  {
    icon: "workspace_premium",
    title: "Service Recognition",
    description:
      "We honor your service with recognition, respect, and understanding of military values—discipline, precision, mission focus, and service above self.",
  },
  {
    icon: "volunteer_activism",
    title: "Transition Assistance",
    description:
      "Comprehensive onboarding specifically designed for veterans, including military-to-construction terminology, civilian workplace culture, and career path planning.",
  },
];

// Company Culture Values
export const cultureValues: CultureValue[] = [
  {
    icon: "handshake",
    title: "Integrity & Trust",
    description:
      "We build relationships based on honesty, transparency, and mutual respect. 'Building projects for the client, NOT the dollar' means transparent communication, open-book pricing, and collaborative problem-solving define every interaction—from apprentice to owner. 70% of our business comes from referrals and repeat client partners.",
    color: "from-brand-primary to-brand-primary-dark",
  },
  {
    icon: "diversity_3",
    title: "Team Unity & Disciplined Execution",
    description:
      "Founded in 2010, veteran-owned since January 2025 when Army veteran Jeremy Thamert purchased the company. From veterans to civilians, office to field-we're one team with shared values. Military discipline and structured processes meet proven craftsmanship, combining unwavering attention to detail with reliable execution and dependable follow-through.",
    color: "from-brand-secondary to-brand-secondary-dark",
  },
  {
    icon: "trending_up",
    title: "Excellence & Continuous Growth",
    description:
      "We pursue continuous improvement in everything we do, personally and professionally. 150+ years combined experience refined through mentorship programs, cross-training across multiple specialties, regular training on new techniques, safety standards, technology, and industry involvement. Your growth is our growth.",
    color: "from-brand-secondary to-bronze-700",
  },
  {
    icon: "volunteer_activism",
    title: "Community Impact & Safety First",
    description:
      "Building stronger communities, one project and one relationship at a time. Award-winning safety (.64 EMR—40% better than industry, multiple AGC-WA Top EMR Awards, OSHA VPP Star) ensures everyone goes home safe. Understanding that every project serves the broader community through quality craftsmanship and lasting relationships.",
    color: "from-brand-primary-light to-brand-primary",
  },
];
