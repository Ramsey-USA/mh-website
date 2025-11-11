/**
 * Example Case Study: Tri-Cities Medical Center Expansion
 * Demonstrates the CaseStudyTemplate component with realistic data
 */

import {
  CaseStudyTemplate,
  type CaseStudyData,
} from "@/components/projects/CaseStudyTemplate";
import { PageNavigation } from "@/components/navigation/PageNavigation";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { navigationConfigs } from "@/components/navigation/navigationConfigs";

// Example case study data
const triCitiesMedicalCenterData: CaseStudyData = {
  id: "tri-cities-medical-center-expansion",
  title: "Tri-Cities Medical Center Expansion",
  subtitle: "20,000 sq ft emergency department and surgical wing addition",
  client: "Tri-Cities Medical Center",
  location: "Kennewick, WA",
  completionDate: "November 2024",
  projectValue: "$8.5M",
  duration: "14 months",
  category: "Healthcare Construction",

  heroImage: "/images/projects/medical-center/hero.jpg",
  heroImageAlt: "Tri-Cities Medical Center Expansion Exterior View",

  challenge: {
    title: "The Challenge",
    description:
      "The Tri-Cities Medical Center needed to expand its emergency department and add a new surgical wing while maintaining full operational capacity during construction. The project required strict adherence to healthcare construction standards, infection control protocols, and zero disruption to patient care.",
    keyPoints: [
      "Maintain 24/7 hospital operations during construction with zero service interruptions",
      "Meet stringent OSHA and healthcare infection control protocols (ICRA Level 4)",
      "Coordinate with 15+ medical departments and maintain emergency access routes",
      "Complete project within aggressive 14-month timeline to meet state funding deadlines",
      "Navigate complex utility tie-ins with existing hospital systems without downtime",
      "Ensure complete acoustic isolation to prevent construction noise from affecting patient areas",
    ],
  },

  solution: {
    title: "Our Solution",
    description:
      "MH Construction implemented a phased construction approach with military precision, leveraging our veteran-owned team's expertise in mission-critical operations. We established dedicated infection control barriers, coordinated closely with hospital staff, and executed night shifts for high-impact work to minimize disruption.",
    keyPoints: [
      "Implemented ICRA Level 4 infection control barriers and negative air pressure systems",
      "Established dedicated construction corridors with HEPA filtration to protect patients",
      "Created real-time coordination system with hospital operations for seamless integration",
      "Deployed acoustic barriers and scheduled high-noise work during off-peak hours",
      "Built temporary emergency access routes with full code compliance",
      "Conducted daily safety briefings with hospital staff and construction teams",
    ],
    approach: [
      "Pre-construction planning with 3D BIM modeling to identify conflicts before breaking ground",
      "Phased construction approach allowing hospital operations to continue uninterrupted",
      "Dedicated infection control team monitoring air quality and barrier integrity 24/7",
      "Night shift execution for critical utility tie-ins with zero patient impact",
      "Weekly coordination meetings with medical staff to adjust schedules proactively",
      "Final commissioning and systems integration testing completed over 3-day weekend",
    ],
  },

  results: {
    title: "Outstanding Results",
    description:
      "The project was completed 2 weeks ahead of schedule with zero safety incidents, zero patient care disruptions, and full compliance with all healthcare construction standards. The medical center now serves 30% more emergency patients with state-of-the-art facilities.",
    metrics: [
      {
        icon: "schedule",
        value: "2 Weeks",
        label: "Ahead of Schedule",
      },
      {
        icon: "health_and_safety",
        value: "Zero",
        label: "Safety Incidents",
      },
      {
        icon: "verified",
        value: "100%",
        label: "Code Compliance",
      },
      {
        icon: "trending_up",
        value: "+30%",
        label: "Patient Capacity",
      },
    ],
    outcomes: [
      "Zero disruptions to patient care or emergency services during entire 14-month construction",
      "100% compliance with ICRA Level 4 infection control protocols and OSHA healthcare standards",
      "Added 6 new operating rooms with cutting-edge medical technology integration",
      "Expanded emergency department capacity from 12 to 20 treatment rooms",
      "Achieved LEED Silver certification for sustainable healthcare design",
      "Project featured in AGC-WA Healthcare Construction Excellence Awards",
      "Hospital reported 98% staff satisfaction with construction coordination process",
      "Completed all systems integration testing with zero punch list items",
    ],
  },

  clientQuote: {
    quote:
      "MH Construction's military precision and dedication to safety made this complex project seamless. They coordinated flawlessly with our medical staff, maintained infection control standards beyond our expectations, and delivered a world-class facility ahead of schedule. Their veteran-owned values of discipline and excellence were evident every single day.",
    author: "Dr. Sarah Mitchell",
    role: "Chief Medical Officer",
    company: "Tri-Cities Medical Center",
  },

  specifications: [
    {
      label: "Square Footage",
      value: "20,000 SF",
      icon: "square_foot",
    },
    {
      label: "Project Value",
      value: "$8.5M",
      icon: "attach_money",
    },
    {
      label: "Duration",
      value: "14 Months",
      icon: "schedule",
    },
    {
      label: "Operating Rooms",
      value: "6 New",
      icon: "medical_services",
    },
    {
      label: "ER Treatment Rooms",
      value: "20 Total",
      icon: "emergency",
    },
    {
      label: "LEED Rating",
      value: "Silver",
      icon: "eco",
    },
  ],

  // Before/After Photos (optional)
  beforeAfterPhotos: [
    {
      before: "/images/logo/mh-logo.png",
      after: "/images/logo/mh-logo.png",
      caption:
        "Emergency Department Expansion - Placeholder images (Real photos coming soon)",
    },
    {
      before: "/images/logo/mh-logo.png",
      after: "/images/logo/mh-logo.png",
      caption:
        "Surgical Wing Addition - Placeholder images (Real photos coming soon)",
    },
  ],

  // Gallery Photos
  galleryPhotos: [
    {
      src: "/images/projects/medical-center/exterior-complete.jpg",
      alt: "Completed medical center expansion exterior",
      caption: "Completed expansion with modern architectural design",
    },
    {
      src: "/images/projects/medical-center/operating-room.jpg",
      alt: "State-of-the-art operating room",
      caption:
        "One of six new operating rooms with advanced medical technology",
    },
    {
      src: "/images/projects/medical-center/emergency-department.jpg",
      alt: "Expanded emergency department",
      caption: "Expanded emergency department with 20 treatment rooms",
    },
    {
      src: "/images/projects/medical-center/construction-barriers.jpg",
      alt: "ICRA infection control barriers during construction",
      caption:
        "ICRA Level 4 infection control barriers protecting patient areas",
    },
    {
      src: "/images/projects/medical-center/surgical-wing-hallway.jpg",
      alt: "Surgical wing hallway with natural lighting",
      caption: "Surgical wing corridor with healing-centered design",
    },
    {
      src: "/images/projects/medical-center/nurses-station.jpg",
      alt: "Modern nurses station",
      caption: "Centralized nurses station with ergonomic workflow design",
    },
  ],

  team: [
    {
      name: "Mike Hardy",
      role: "Commercial General Manager",
      slug: "mike-hardy",
      department: "Leadership",
    },
    {
      name: "Jeremy Thamert",
      role: "President & Project Oversight",
      slug: "jeremy-thamert",
      department: "Executive",
    },
    {
      name: "Todd Weber",
      role: "Project Manager",
      slug: "todd-weber",
      department: "Project Management",
    },
    {
      name: "Steve Moritz",
      role: "Senior Superintendent",
      slug: "steve-moritz",
      department: "Field Operations",
    },
  ],

  tags: [
    "Healthcare",
    "Emergency Services",
    "LEED Silver",
    "Mission Critical",
    "ICRA Level 4",
  ],
};

export default function TriCitiesMedicalCenterCaseStudy() {
  return (
    <>
      <PageNavigation items={navigationConfigs.projects} />

      {/* Breadcrumb Navigation */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Projects", href: "/projects" },
          { label: "Tri-Cities Medical Center" },
        ]}
      />

      <CaseStudyTemplate data={triCitiesMedicalCenterData} />
    </>
  );
}
