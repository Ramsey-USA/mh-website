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
