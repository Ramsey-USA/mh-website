import type { TimelineStep } from "@/components/ui/Timeline";

/**
 * About Page Timeline Data
 * Company evolution from founding to present day
 *
 * Organized chronologically, showcasing:
 * - 2010-2015: Foundation phase (family values, first successes)
 * - 2016-2020: Growth phase (expansion, safety awards, 100+ projects)
 * - 2021-2024: Excellence phase (OSHA VPP Star, 650+ projects)
 * - 2025-Future: Veteran ownership phase (new leadership, continued excellence)
 */

export const aboutTimelineSteps: TimelineStep[] = [
  {
    num: 1,
    icon: "foundation",
    title: "Foundation: Partnership Philosophy",
    desc: 'Mike Holstein founds MH Construction on the principle: "We Work WITH You, Not FOR You"—building trust through honest communication and transparent practices. (2010)',
    position: "left",
  },
  {
    num: 2,
    icon: "business",
    title: "First Major Commercial Success",
    desc: "Completed first significant commercial project, establishing reputation for quality craftsmanship and reliable execution in the Tri-Cities region. (2012)",
    position: "right",
  },
  {
    num: 3,
    icon: "family_restroom",
    title: "Family Legacy Strengthens",
    desc: "Mike's daughters join the company, reinforcing family-centered values and commitment to treating clients like extended family members. (2015)",
    position: "left",
  },
  {
    num: 4,
    icon: "hub",
    title: "Arnold Garcia Joins as VP",
    desc: "Arnold brings strategic leadership and client relationship expertise, establishing partnerships that outlast projects—building the 70% referral rate foundation. (2016)",
    position: "right",
  },
  {
    num: 5,
    icon: "public",
    title: "3-State Licensing Achieved",
    desc: "Expanded licensing across Washington, Oregon, and Idaho—bringing proven excellence to the entire Pacific Northwest region with complete compliance. (2017)",
    position: "left",
  },
  {
    num: 6,
    icon: "shield",
    title: "First Top EMR Award",
    desc: "AGC-WA recognizes .64 EMR achievement ('As Low as You Can Go')—40% better than industry average, establishing safety-first culture that protects every team member. (2019)",
    position: "right",
  },
  {
    num: 7,
    icon: "celebration",
    title: "100+ Projects Milestone",
    desc: "Reached 100 successfully completed projects across commercial, industrial, and public sectors—proving consistent excellence regardless of project complexity. (2020)",
    position: "left",
  },
  {
    num: 8,
    icon: "workspace_premium",
    title: "Consecutive Top EMR Recognition",
    desc: "Second AGC-WA Top EMR Award validates sustained commitment to zero-incident culture—3+ years without time-loss injury demonstrates unwavering safety discipline. (2021)",
    position: "right",
  },
  {
    num: 9,
    icon: "verified",
    title: "OSHA VPP Star Designation",
    desc: "Achieved OSHA Voluntary Protection Program Star status alongside 500+ project milestone—highest recognition of workplace safety and health management excellence. (2022)",
    position: "left",
  },
  {
    num: 10,
    icon: "trending_up",
    title: "650+ Projects Completed",
    desc: "Surpassed 650 successful projects while maintaining perfect safety record—demonstrating scalable excellence that never compromises quality or safety for growth. (2023)",
    position: "right",
  },
  {
    num: 11,
    icon: "history",
    title: "15th Anniversary & Sale Preparation",
    desc: "Mike Holstein prepares to sell MH Construction to Jeremy Thamert, ensuring continuity of partnership philosophy while preparing for next chapter—15 years of trust-building leadership. (2024)",
    position: "left",
  },
  {
    num: 12,
    icon: "military_tech",
    title: "Veteran Ownership Transition",
    desc: "Army veteran Jeremy Thamert purchases MH Construction, bringing the company to veteran-owned status. Operational discipline and mission-focused execution enhance established excellence. (Jan 2025)",
    position: "right",
  },
  {
    num: 13,
    icon: "rocket_launch",
    title: "Integrated CRM Platform",
    desc: "Implementing High-Level CRM for seamless communication and real-time project updates—leveraging technology to enhance the personal service that defines MH partnerships. (2025)",
    position: "left",
  },
  {
    num: 14,
    icon: "explore",
    title: "Continued Mission Excellence",
    desc: "Building projects for the client, NOT the dollar—where founding father's partnership philosophy meets veteran operational discipline, creating unmatched construction excellence. (Future)",
    position: "right",
  },
];
