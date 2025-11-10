/**
 * Centralized Testimonials Data
 * Single source of truth for all testimonials across the website
 * Categories: client, employee, veteran
 */

export interface Testimonial {
  id: string;
  name: string;
  role?: string; // For employees
  title?: string; // For employees
  location?: string; // For clients
  project?: string; // For clients
  company?: string; // For clients
  rating?: number; // 1-5 stars
  quote: string;
  image?: string;
  type: "client" | "employee" | "veteran";
  category?: string; // commercial, residential, healthcare, etc.
  featured?: boolean;
  date?: string; // When testimonial was given
  veteranStatus?: boolean; // For veteran-specific testimonials
}

// CLIENT TESTIMONIALS - Commercial and Residential Projects
export const clientTestimonials: Testimonial[] = [
  {
    id: "client-john-smith",
    name: "John Smith",
    location: "Tri-Cities, WA",
    project: "Baskin Robbins Store Build",
    rating: 5,
    quote:
      "Working with Todd and the MH Construction team on our Baskin Robbins build was exceptional. Todd's communication throughout the entire project kept us informed every step of the way, and the quality of workmanship exceeded our expectations.",
    image: "/images/testimonials/john-s.jpg",
    type: "client",
    category: "commercial",
    featured: true,
    date: "October 2024",
  },
  {
    id: "client-keith-bjella",
    name: "Keith Bjella",
    location: "Tri-Cities, WA",
    project: "Tenant Improvement Project",
    rating: 5,
    quote:
      "The tenant improvement process with MH Construction was outstanding from design through construction. Their ability to facilitate the entire process while managing multiple stakeholders and maintaining transparency throughout was truly impressive.",
    image: "/images/testimonials/keith-b.jpg",
    type: "client",
    category: "commercial",
    featured: true,
    date: "November 2024",
  },
  {
    id: "client-jennifer-mike-thompson",
    name: "Jennifer & Mike Thompson",
    location: "Pacific Northwest",
    project: "Custom Family Home",
    rating: 5,
    quote:
      "MH Construction exceeded our expectations in every way. Their military precision and attention to detail resulted in our dream home being completed ahead of schedule and within budget. The veteran-owned values really showed in their commitment to excellence.",
    image: "/images/testimonials/thompson.jpg",
    type: "client",
    category: "residential",
    featured: true,
  },
  {
    id: "client-robert-lisa-chen",
    name: "Robert & Lisa Chen",
    location: "Pacific Northwest",
    project: "Kitchen & Bath Remodel",
    rating: 5,
    quote:
      "Our kitchen and bathroom look absolutely amazing! The MH Construction team was professional, clean, and delivered exactly what they promised. Jim's custom cabinetry work is exceptional, and Sarah's design coordination made the whole process seamless.",
    image: "/images/testimonials/chen.jpg",
    type: "client",
    category: "residential",
    featured: true,
  },
  {
    id: "client-techflow-solutions",
    name: "TechFlow Solutions",
    location: "Pacific Northwest",
    project: "Office Space Renovation",
    company: "TechFlow Solutions",
    rating: 5,
    quote:
      "The team at MH Construction transformed our outdated office into a modern workspace that our employees love. The project was completed on time despite our tight timeline, and the quality exceeded our expectations.",
    image: "/images/testimonials/techflow.jpg",
    type: "client",
    category: "commercial",
    featured: true,
  },
  {
    id: "client-david-rodriguez",
    name: "David Rodriguez",
    location: "Pacific Northwest",
    project: "Storm Damage Repair",
    rating: 5,
    quote:
      "When a storm damaged our roof and siding, MH Construction responded immediately. They had a team out the same day for emergency repairs and completed the full restoration quickly and professionally. As a fellow veteran, I appreciated their prompt service and quality work during a stressful time.",
    image: "/images/testimonials/rodriguez.jpg",
    type: "client",
    category: "residential",
    featured: true,
    veteranStatus: true,
  },
];

// EMPLOYEE TESTIMONIALS - Team Member Experiences
export const employeeTestimonials: Testimonial[] = [
  {
    id: "employee-makayla",
    name: "Makayla Walters",
    role: "Administrative Manager",
    title: "Office Administration",
    quote:
      "I've been with MH Construction for over 2 years, and it's been an incredible journey. The family atmosphere and veteran-owned values create a workplace where everyone truly cares about each other's success. I've grown professionally in ways I never imagined.",
    type: "employee",
    featured: true,
  },
  {
    id: "employee-steve",
    name: "Steve Moritz",
    role: "Superintendent",
    title: "Field Operations",
    quote:
      "Working at MH Construction means being part of something bigger than just building structures. The military precision and attention to safety make every project a success. I'm proud to work with a team that values excellence and integrity.",
    type: "employee",
    featured: true,
  },
  {
    id: "employee-todd",
    name: "Todd Weber",
    role: "President & Project Manager",
    title: "Executive Leadership",
    quote:
      "Leading this team is an honor. Our veteran-owned foundation ensures we approach every project with discipline, clear communication, and an unwavering commitment to our clients. We're not just building projects—we're building lasting partnerships.",
    type: "employee",
    featured: true,
  },
  {
    id: "employee-ben-veteran",
    name: "Ben Snyder",
    role: "Project Coordinator",
    title: "Operations",
    quote:
      "As a veteran, finding a company that truly understands and values military service was important to me. MH Construction doesn't just hire veterans—they embrace our skills and provide opportunities for growth. The transition from military to construction has been seamless.",
    type: "veteran",
    veteranStatus: true,
    featured: true,
  },
  {
    id: "employee-arnold-veteran",
    name: "Arnold Witt",
    role: "Field Supervisor",
    title: "Site Operations",
    quote:
      "The camaraderie here reminds me of my military days. Everyone has your back, and the mission always comes first. MH Construction's commitment to safety and quality mirrors the standards I upheld in the service.",
    type: "veteran",
    veteranStatus: true,
    featured: true,
  },
  {
    id: "employee-career-growth",
    name: "Jessica Martinez",
    role: "Junior Project Manager",
    title: "Project Management",
    quote:
      "I started as an assistant and was promoted to Junior PM within 18 months. MH Construction invests in employee development with training, mentorship, and clear career paths. They truly practice what they preach about growth opportunities.",
    type: "employee",
  },
];

// CONVENIENCE FUNCTIONS - Filter testimonials by category
export function getClientTestimonials(featured?: boolean): Testimonial[] {
  return featured
    ? clientTestimonials.filter((t) => t.featured)
    : clientTestimonials;
}

export function getEmployeeTestimonials(featured?: boolean): Testimonial[] {
  return featured
    ? employeeTestimonials.filter((t) => t.featured)
    : employeeTestimonials;
}

export function getVeteranTestimonials(): Testimonial[] {
  return [
    ...employeeTestimonials.filter((t) => t.type === "veteran"),
    ...clientTestimonials.filter((t) => t.veteranStatus),
  ];
}

export function getTestimonialsByCategory(
  category: string,
): Testimonial[] | undefined {
  return clientTestimonials.filter((t) => t.category === category);
}

export function getAllTestimonials(): Testimonial[] {
  return [...clientTestimonials, ...employeeTestimonials];
}

export function getFeaturedTestimonials(): Testimonial[] {
  return [...clientTestimonials, ...employeeTestimonials].filter(
    (t) => t.featured,
  );
}
