/**
 * Careers Data
 * Centralized data for job positions, company benefits, and culture values
 * Used primarily on /careers page
 */

export interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

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

// Available Job Positions
export const openPositions: JobPosition[] = [
  {
    title: "Equipment Operator (Civil)",
    department: "Field Operations",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "3+ years",
    description:
      "Operate heavy equipment for civil construction projects including excavators, loaders, dozers, and graders. Safety-focused operation in compliance with all regulations.",
    requirements: [
      "3+ years of equipment operation experience",
      "Valid commercial driver's license (CDL) preferred",
      "Experience with excavators, loaders, dozers, and graders",
      "Strong understanding of civil construction practices",
      "OSHA safety certification",
      "Ability to read grade stakes and construction plans",
    ],
    benefits: [
      "Competitive hourly rate based on experience",
      "Equipment maintenance training provided",
      "Health, dental, and vision insurance",
      "Safety incentive programs",
      "Veteran preference for military equipment operators",
    ],
  },
  {
    title: "Lead Carpenter",
    department: "Construction",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Lead carpentry teams on commercial and residential projects, ensuring quality craftsmanship and project timelines. Mentor junior carpenters and coordinate with project management.",
    requirements: [
      "5+ years of professional carpentry experience",
      "Proven leadership and team management skills",
      "Expertise in framing, finish work, and trim carpentry",
      "Ability to read blueprints and technical drawings",
      "Own professional carpentry tools",
      "Valid driver's license and reliable transportation",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Tool allowance and replacement program",
      "Company vehicle for site travel",
      "Health insurance package",
      "Leadership development opportunities",
    ],
  },
  {
    title: "Shop Manager (Small Engines)",
    department: "Equipment Management",
    location: "Pasco, WA",
    type: "Full-time",
    experience: "4+ years",
    description:
      "Manage equipment shop operations, maintain small engines and power tools, coordinate maintenance schedules, and ensure all equipment is field-ready. Oversee inventory and ordering.",
    requirements: [
      "4+ years of small engine repair experience",
      "Knowledge of 2-stroke and 4-stroke engines",
      "Experience with power tools, generators, and compressors",
      "Strong organizational and inventory management skills",
      "Ability to diagnose and repair equipment efficiently",
      "Parts ordering and vendor relationship management",
    ],
    benefits: [
      "Competitive salary based on experience",
      "Climate-controlled shop facility",
      "Tool and equipment budget",
      "Health and dental insurance",
      "Professional certifications supported",
    ],
  },
  {
    title: "Drywaller/Taper",
    department: "Construction",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "2+ years",
    description:
      "Install, finish, and texture drywall for commercial and residential projects. Ensure smooth, professional finishes that meet quality standards and project specifications.",
    requirements: [
      "2+ years of drywall installation and finishing experience",
      "Expertise in taping, mudding, and texturing",
      "Knowledge of various finish levels and techniques",
      "Ability to work efficiently on scaffolding and lifts",
      "Own basic drywall tools",
      "Attention to detail and quality craftsmanship",
    ],
    benefits: [
      "Competitive hourly rate with overtime opportunities",
      "Tool replacement program",
      "Health insurance after probation period",
      "Material handling equipment provided",
      "Steady work year-round",
    ],
  },
  {
    title: "Project Manager",
    department: "Construction Management",
    location: "Pasco, WA",
    type: "Full-time",
    experience: "3-5 years",
    description:
      "Lead construction projects from inception to completion, managing timelines, budgets, and partner relationships. Work WITH project owners to deliver exceptional results.",
    requirements: [
      "Bachelor's degree in Construction Management or related field",
      "3+ years of project management experience",
      "Strong communication and leadership skills",
      "Knowledge of construction codes and regulations",
      "PMP certification preferred",
    ],
    benefits: [
      "Competitive salary with performance bonuses",
      "Health, dental, and vision insurance",
      "Retirement plan with company matching",
      "Professional development opportunities",
    ],
  },
  {
    title: "Site Supervisor",
    department: "Field Operations",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "5+ years",
    description:
      "Oversee daily construction activities, ensure safety compliance, and coordinate with subcontractors. Lead field teams with integrity and excellence.",
    requirements: [
      "5+ years of construction supervision experience",
      "OSHA 30 certification required",
      "Strong problem-solving abilities",
      "Experience with commercial construction",
      "Valid driver's license and reliable transportation",
    ],
    benefits: [
      "Competitive hourly rate with overtime opportunities",
      "Company vehicle and equipment provided",
      "Health insurance package",
      "Safety incentive programs",
    ],
  },
  {
    title: "Estimator",
    department: "Pre-Construction",
    location: "Pasco, WA (Remote flexibility)",
    type: "Full-time",
    experience: "2-4 years",
    description:
      "Prepare accurate cost estimates for commercial and residential projects using industry software. Partner with client partners to understand project scope and deliver competitive bids.",
    requirements: [
      "Experience with estimating software (ProEst, PlanSwift, etc.)",
      "2+ years of construction estimating experience",
      "Strong analytical and mathematical skills",
      "Attention to detail and accuracy",
      "Understanding of construction methods and materials",
    ],
    benefits: [
      "Competitive salary based on experience",
      "Remote work flexibility",
      "Professional software and training provided",
      "Career advancement opportunities",
    ],
  },
  {
    title: "Administrative Assistant",
    department: "Office Administration",
    location: "Pasco, WA",
    type: "Full-time",
    experience: "Entry Level Welcome",
    description:
      "Support daily operations with scheduling, documentation, and client partner communication. Be the welcoming face of our veteran-owned company.",
    requirements: [
      "High school diploma or equivalent",
      "Excellent communication skills",
      "Proficiency in Microsoft Office Suite",
      "Strong organizational abilities",
      "Client Partner service orientation",
    ],
    benefits: [
      "Competitive starting salary",
      "Comprehensive training program",
      "Health and dental insurance",
      "Growth opportunities within the company",
    ],
  },
];

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
    title: "Team Unity & Military Precision",
    description:
      "Founded in 2010, veteran-owned since January 2025 when Army veteran Jeremy Thamert purchased the company. From veterans to civilians, office to field—we're one team with shared values. Military discipline and structured processes meet proven craftsmanship, combining unwavering attention to detail with reliable execution and mission-focused excellence.",
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

// Helper Functions

/**
 * Get positions by department
 */
export const getPositionsByDepartment = (department: string): JobPosition[] =>
  openPositions.filter((pos) => pos.department === department);

/**
 * Get total count of open positions
 */
export const getOpenPositionCount = (): number => openPositions.length;

/**
 * Get positions by experience level
 */
export const getPositionsByExperience = (
  experienceLevel: string,
): JobPosition[] =>
  openPositions.filter((pos) => pos.experience.includes(experienceLevel));

/**
 * Get all department names (unique)
 */
export const getDepartments = (): string[] =>
  Array.from(new Set(openPositions.map((pos) => pos.department)));

/**
 * Check if entry-level positions are available
 */
export const hasEntryLevelPositions = (): boolean =>
  openPositions.some(
    (pos) =>
      pos.experience.toLowerCase().includes("entry") ||
      pos.experience.toLowerCase().includes("0-2"),
  );
