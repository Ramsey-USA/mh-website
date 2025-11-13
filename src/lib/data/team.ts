// Centralized team data source
// TODO: Replace placeholder entries with authoritative team roster.
// Provide: name, role, experienceYears (number), veteranStatus, specialties (string[]), bio, slug

export interface TeamMember {
  name: string;
  role: string;
  department: string;
  experienceYears: number | string;
  veteranStatus?: string;
  specialties?: string[];
  bio?: string;
  slug: string;
  active?: boolean;
  avatar?: string;
}

export const teamMembers: TeamMember[] = [
  // Executive Leadership
  {
    name: "Jeremy Thamert",
    role: "Owner & President",
    department: "Executive Leadership",
    experienceYears: 2,
    veteranStatus: "U.S. Army Veteran",
    specialties: [
      "Technology Integration",
      "AI-Powered Estimating",
      "Strategic Vision",
      "Business Development",
    ],
    bio: "Jeremy Thamert, a U.S. military veteran, became owner of MH Construction in January 2025 after serving as General Manager for 2 years. He is the visionary behind MH Construction's pioneering approach, with extensive experience and a commitment to integrating cutting-edge technology, like AI-powered tools. Jeremy brings veteran-owned values of discipline, integrity, and excellence to every project, continuing the company's tradition of military precision while building the future of construction today.",
    slug: "jeremy-thamert",
    active: true,
  },
  {
    name: "Mike Holstein",
    role: "Founder (Retired)",
    department: "Executive Leadership",
    experienceYears: 15,
    veteranStatus: "Retired Leadership",
    specialties: [
      "Company Foundation",
      "Quality Standards",
      "Client Trust Building",
      "Mentorship",
    ],
    bio: "Mike Holstein founded MH Construction in 2010 and established its reputation for integrity, quality, and precision. Now retired, Mike's leadership and vision continue to inspire the team and guide the company's values.",
    slug: "mike-holstein",
    active: true,
  },
  {
    name: "Mike Holstein",
    role: "Founder (Retired)",
    department: "Executive Leadership",
    experienceYears: 30, // Assumed long tenure founding & growing company
    veteranStatus: "Retired Leadership",
    specialties: [
      "Company Foundations",
      "Quality Standards",
      "Leadership",
      "Client Trust",
    ],
    bio: "Mike Holstein founded MH Construction in 2010 and established its reputation for integrity, quality, and precision. Now retired, Mike's leadership and vision continue to inspire the team and guide the company's values.",
    slug: "mike-holstein",
    active: true,
  },
  {
    name: "Arnold Garcia",
    role: "Vice President",
    department: "Executive Leadership",
    experienceYears: 15, // Assumed
    veteranStatus: "Civilian",
    specialties: [
      "Client Relationships",
      "Strategic Operations",
      "Service Excellence",
      "Project Oversight",
    ],
    bio: "As Vice President, Arnold is the key to client relationships and strategic operations. He specializes in high-level relationship building and ensures that every project runs smoothly from start to finish. His focus is on personalized service and exceptional quality, guaranteeing client satisfaction.",
    slug: "arnold-garcia",
    active: true,
  },

  // Project Management & Estimating
  {
    name: "Makayla Holstein",
    role: "Project Manager",
    department: "Project Management & Estimating",
    experienceYears: 8, // Assumed
    veteranStatus: "Civilian",
    specialties: [
      "Project Coordination",
      "Timeline Management",
      "Client Communication",
      "Risk Mitigation",
    ],
    bio: "Makayla grew up immersed in construction, learning from her father and working hands-on in framing, roofing, and site problem-solving. Project management was a natural fit for her organizational and communication skills. As Project Manager, she oversees projects from estimating to close-out - managing contracts, budgets, submittals, RFIs, change orders, and field coordination.",
    slug: "makayla-holstein",
    active: true,
  },
  {
    name: "Ben Woodall",
    role: "Project Manager",
    department: "Project Management & Estimating",
    experienceYears: 10, // Assumed
    veteranStatus: "Civilian",
    specialties: [
      "Project Efficiency",
      "Budget Management",
      "Resource Planning",
      "Client Alignment",
    ],
    bio: "Ben is a dedicated Project Manager with a focus on project efficiency and budget management. He is an expert in overseeing all aspects of a build, from initial planning to final close-out, ensuring every detail aligns with the client's vision and project goals.",
    slug: "ben-woodall",
    active: true,
  },
  {
    name: "Todd Schoeff",
    role: "Lead Estimator",
    department: "Project Management & Estimating",
    experienceYears: 20, // Assumed based on seniority
    veteranStatus: "Civilian",
    specialties: [
      "Cost Estimation",
      "Commercial Projects",
      "Medical Facilities",
      "Specialty Projects",
    ],
    bio: "Todd Schoeff serves as an Estimator for MH Construction, bringing over a decade of technical and field experience across commercial, government, and specialized infrastructure projects. With a background as a project foreman and lead technician, Todd has managed structured cabling, fiber optics, and access control installations within highly regulated environments, including nuclear and federal facilities. His depth of technical expertise and field coordination experience gives him a unique ability to accurately assess project scope, identify cost efficiencies, and ensure constructability from the earliest estimating stages. Todd's hands-on understanding of low-voltage systems, network infrastructure, and project team dynamics strengthens MH Construction's ability to deliver reliable, precise, and compliant results across diverse project types.",
    slug: "todd-schoeff",
    active: true,
  },

  // Site & Field Operations
  {
    name: "Steve McClary",
    role: "Senior Superintendent",
    department: "Site & Field Operations",
    experienceYears: 20, // Provided: over 20 years
    veteranStatus: "Civilian",
    specialties: [
      "Field Leadership",
      "Multi-Phase Oversight",
      "Safety Management",
      "Quality Assurance",
    ],
    bio: "Steven began his career in construction as a teenager, starting on a residential crew clearing debris before swapping into a leadership position when they were short handed. Over the years he discovered his passion for construction outweighed his original pursuit of diesel and heavy equipment machines. Known for staying busy and constantly learning new trades, Steve has built a career on reliability and skill diversity. As Senior Superintendent, Steve oversees all on-site construction operations - ensuring projects are safe, efficient, and on-plan. He coordinates subcontractor teams, mentors newcomers, manages resources, and serves as a key liaison between clients and design teams.",
    slug: "steve-mcclary",
    active: true,
  },
  {
    name: "Reagan Massey",
    role: "Superintendent",
    department: "Site & Field Operations",
    experienceYears: 12, // Provided: over a decade
    veteranStatus: "Civilian",
    specialties: [
      "On-Site Operations",
      "Crew Management",
      "Quality Control",
      "Daily Coordination",
    ],
    bio: "Reagan Massey is a seasoned Superintendent with over a decade of experience in all types of builds. He is responsible for daily on-site operations, managing crews, and ensuring that every project is completed to the highest standards.",
    slug: "reagan-massey",
    active: true,
  },
  {
    name: "Porter Cline",
    role: "Superintendent",
    department: "Site & Field Operations",
    experienceYears: 5, // Provided: 5+ years
    veteranStatus: "Civilian",
    specialties: [
      "Industrial Projects",
      "Field Coordination",
      "Complex Logistics",
      "Heavy Systems",
    ],
    bio: "Porter specializes in industrial builds. His 5+ years of experience in this niche field make him an expert in managing the unique challenges and requirements of large-scale industrial projects.",
    slug: "porter-cline",
    active: true,
  },

  // Administration & Support
  {
    name: "Brooks Morris",
    role: "Senior Accountant",
    department: "Administration & Support",
    experienceYears: 10, // Assumed
    veteranStatus: "Civilian",
    specialties: [
      "Financial Reporting",
      "Budget Management",
      "Payroll",
      "Cost Controls",
    ],
    bio: "Brooks Morris manages all financial aspects of MH Construction. With a keen eye for detail, Brooks handles everything from project budgets and financial reporting to invoicing and payroll, ensuring the company's fiscal health.",
    slug: "brooks-morris",
    active: true,
  },
  {
    name: "Brittney Holstein",
    role: "HR Manager",
    department: "Administration & Support",
    experienceYears: 8, // Assumed
    veteranStatus: "Civilian",
    specialties: [
      "Recruitment",
      "Employee Relations",
      "Team Development",
      "HR Compliance",
    ],
    bio: "Brittney Holstein, daughter of MH Construction founder Mike Holstein, is the backbone of the company's human resources department. She is dedicated to building a strong, supportive, and skilled team by managing recruitment, employee relations, and professional development.",
    slug: "brittney-holstein",
    active: true,
  },
  {
    name: "Matt Ramsey",
    role: "Project & Marketing Coordinator",
    department: "Administration & Support",
    experienceYears: 7, // Assumed
    veteranStatus: "Veteran",
    specialties: [
      "Marketing Coordination",
      "Technology Advocacy",
      "Client Presentations",
      "AI Estimator Promotion",
    ],
    bio: "As a veteran, Matt brings a unique perspective to his role. He is the face of MH Construction at trade shows and client presentations, specializing in showcasing the company's advanced technology and AI estimator.",
    slug: "matt-ramsey",
    active: true,
  },
  {
    name: "Jennifer Tenehuerta",
    role: "Administrative Assistant",
    department: "Administration & Support",
    experienceYears: 5, // Assumed
    veteranStatus: "Civilian",
    specialties: [
      "Office Administration",
      "Scheduling",
      "Team Support",
      "Information Flow",
    ],
    bio: "Jennifer Tenehuerta is a highly organized and efficient Admin Assistant who keeps the office running smoothly. She supports the entire team with administrative tasks, scheduling, and communication, ensuring a seamless flow of information.",
    slug: "jennifer-tenehuerta",
    active: true,
  },
];

export function getActiveTeam(): TeamMember[] {
  return teamMembers.filter((m: any) => m.active);
}
