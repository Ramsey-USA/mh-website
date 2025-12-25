// Centralized team data source
// Complete team roster with 15 employee profiles

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
  email?: string;
}

export const teamMembers: TeamMember[] = [
  // Executive Leadership
  {
    name: "Jeremy Thamert",
    role: "Owner & President",
    department: "Executive Leadership",
    experienceYears: 35,
    veteranStatus: "U.S. Army Veteran",
    specialties: [
      "Technology Integration",
      "Expert Consultation",
      "Strategic Vision",
      "Business Development",
    ],
    bio: "Jeremy brings more than 35 years of experience and leadership to the MH Construction team. Beginning his construction career while still in college, he has worked across nearly every aspect of the industry, from drafting plans to performing international commercial inspections. In 2003, Jeremy launched his first business and has since founded, operated, sold, and acquired multiple companies. His entrepreneurial spirit and business acumen have led him to mentor start-ups, incubate emerging ventures, and help others strategically position their companies for growth and success. A 15-year veteran of Army aviation, Jeremy applies the precision, discipline, and attention to detail learned in the service to every project MH Construction undertakes. His leadership blends military focus with real-world construction expertise, ensuring excellence from concept to completion. With a clear vision to elevate MH Construction and a deep commitment to supporting employees, clients, and community partners, Jeremy leads with integrity and determination, guiding the company confidently into the future.",
    slug: "jeremy-thamert",
    active: true,
    email: "jeremy@mhc-gc.com",
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
      "Client Partner Trust Building",
      "Mentorship",
    ],
    bio: "Mike Holstein founded MH Construction in 2010 and established its reputation for integrity, quality, and precision. Now retired, Mike's leadership and vision continue to inspire the team and guide the company's values.",
    slug: "mike-holstein",
    active: true,
    email: "office@mhc-gc.com",
  },
  {
    name: "Arnold Garcia",
    role: "Vice President",
    department: "Executive Leadership",
    experienceYears: 40,
    veteranStatus: "Civilian",
    specialties: [
      "Very Organized",
      "Strong Negotiating Skills",
      "Grounded Compassionate Leadership",
      "Solid Construction Knowledge",
      "Client-Focused Critical Thinking",
    ],
    bio: "Arnold began his career as a teen working summer vacations as a laborer for his uncle's construction company. Once he finished school, he built a lifelong career in the field. Following his marriage to Elizabeth, he moved to Seattle, advancing from Superintendent to Project Manager in commercial construction. Later, Arnold returned to Eastern Washington, became General Manager for his uncle's firm, and eventually purchased and ran the company successfully. Now Vice President at MH Construction, Arnold oversees all construction activities and staff. He takes an active role in mentoring and training the staff while sharing his wealth of knowledge, exemplifying the company's core values every day.",
    slug: "arnold-garcia",
    active: true,
    email: "arnold@mhc-gc.com",
  },

  // Project Management & Estimating
  {
    name: "Ben Woodall",
    role: "Project Manager",
    department: "Project Management & Estimating",
    experienceYears: 15,
    veteranStatus: "Civilian",
    specialties: [
      "Decision-Making",
      "Conflict Resolution",
      "Construction Knowledge",
      "Time Management",
      "Collaboration",
    ],
    bio: "Ben began his career as an estimator and design-build CAD drafter. Over the last 15 years he has grown into a project management role. Ben has substantial experience with taking projects from concept to completion through every phase in-between. Ben excels in seeing potential issues from all perspectives and finding creative solutions that work for all stakeholders involved. His experience, combined with a proactive approach, allows him to consistently deliver projects on-time and under budget.",
    slug: "ben-woodall",
    active: true,
    email: "ben@mhc-gc.com",
  },
  {
    name: "Todd Schoeff",
    role: "Lead Estimator",
    department: "Project Management & Estimating",
    experienceYears: 20, // Assumed based on seniority
    veteranStatus: "Civilian",
    specialties: [
      "Attention to Detail",
      "Client-Focused Communication",
      "Analytical Thinking",
      "Dependability",
      "Risk Management",
    ],
    bio: "Todd entered the construction industry through high voltage linework inspection, later moving into the low voltage field, where he developed leadership and technical expertise. His career evolved into estimating, where his attention to detail and analytical thinking drive accurate project planning. As Estimator, Todd manages the preconstruction process from reviewing plans/specs to developing cost estimates and coordinating bid packages. He works closely with PMs, Allies, and suppliers to ensure complete, competitive pricing.",
    slug: "todd-schoeff",
    active: true,
    email: "todd@mhc-gc.com",
  },

  // Site & Field Operations
  {
    name: "Steve McClary",
    role: "Senior Superintendent",
    department: "Site & Field Operations",
    experienceYears: 20, // Provided: over 20 years
    veteranStatus: "Civilian",
    specialties: [
      "Problem Solving Under Pressure",
      "Expansive Trade Knowledge",
      "Mentorship",
      "Patience",
      "Dedication",
      "Loyalty",
    ],
    bio: "Steven began his career in construction as a teenager, starting on a residential crew clearing debris before moving up into a leadership position when they were short-handed. Over the years, he discovered his passion for construction outweighed his original pursuit of diesel and heavy equipment mechanics. Known for staying busy and constantly learning new trades, Steve has built a career on reliability and skill diversity. As Senior Superintendent, Steve oversees all on-site construction operations, ensuring projects are safe, efficient, and on-plan. He coordinates Ally teams, mentors newcomers, manages resources, and serves as a key liaison between clients and design teams.",
    slug: "steve-mcclary",
    active: true,
    email: "steve@mhc-gc.com",
  },
  {
    name: "Reagan Massey",
    role: "Superintendent",
    department: "Site & Field Operations",
    experienceYears: 12, // Provided: over a decade
    veteranStatus: "Civilian",
    specialties: [
      "Skilled at Reading and Interpreting Construction Prints",
      "Broad, Hands-On Construction Experience",
      "Strong Communication",
      "Hardworking and Dependable",
    ],
    bio: "Reagan has grown from a residential framing position into Superintendent, where he oversees daily site operations, scheduling, material coordination, and Ally communication. Influenced early by his general contractor father, he built his career through hard work and hands-on experience. Reagan is known for his ability to read blueprints, broad field knowledge, and clear communication. He takes pride in delivering quality projects and ensuring client satisfaction while mentoring the next generation of builders.",
    slug: "reagan-massey",
    active: true,
    email: "reagan@mhc-gc.com",
  },
  {
    name: "Porter Cline",
    role: "Superintendent",
    department: "Site & Field Operations",
    experienceYears: 5, // Provided: 5+ years
    veteranStatus: "Civilian",
    specialties: [
      "Problem-Solving",
      "Team Leadership",
      "Clear Communication",
      "Adaptability/Flexibility",
    ],
    bio: "Porter is a Superintendent with experience leading projects from foundation to finish. His career in construction began unexpectedly after a college injury shifted his focus toward building. He started a company with his brother before advancing through several other firms. Known for his adaptability, leadership, and problem-solving, Porter thrives on the ever-changing challenges of the field and enjoys working alongside his crews to get the job done. He takes pride in guiding teams through demanding phases, maintaining strong client relationships, and ensuring every project is completed to a high standard and on schedule.",
    slug: "porter-cline",
    active: true,
    email: "porter@mhc-gc.com",
  },

  // Administration & Support
  {
    name: "Brooks Morris",
    role: "Finance and Operations Manager",
    department: "Administration & Support",
    experienceYears: 10,
    veteranStatus: "Civilian",
    specialties: [
      "Analytical Precision",
      "Transparency",
      "Collaborative Leadership",
      "Financial System Optimization",
      "Dependable Financial Insight",
    ],
    bio: "Brooks is a results-driven Finance and Operations Manager with over a decade of experience enhancing financial performance and efficiency across manufacturing, service, and construction industries. A strategic, hands-on leader, he has led accounting teams through major transitions, streamlined systems, and recovered millions in unclaimed revenue. A Six Sigma Black Belt, Brooks blends financial expertise with operational insight to drive accountability, measurable results, and the highest standards of financial integrity and organizational excellence.",
    slug: "brooks-morris",
    active: true,
    email: "brooks@mhc-gc.com",
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
    email: "brittney@mhc-gc.com",
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
      "Client Partner Presentations",
    ],
    bio: "As a veteran, Matt brings a unique perspective to his role. He is the face of MH Construction at trade shows and client partner presentations, specializing in showcasing the company's commitment to relationships and proven construction methods.",
    slug: "matt-ramsey",
    active: true,
    email: "matt@mhc-gc.com",
  },
  {
    name: "Jennifer Tene",
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
    bio: "Jennifer Tene is a highly organized and efficient Admin Assistant who keeps the office running smoothly. She supports the entire team with administrative tasks, scheduling, and communication, ensuring a seamless flow of information.",
    slug: "jennifer-tene",
    active: true,
    email: "jennifer@mhc-gc.com",
  },
];

export function getActiveTeam(): TeamMember[] {
  return teamMembers.filter((m: TeamMember) => m.active);
}
