import {
  ConstructionExpertiseSection,
  ConstructionProcessSection,
  CoreServicesSection,
  GovernmentProjectsSection,
  PartnershipTypesSection,
  ServiceAreasSection,
  ServicesHero,
  SpecialtyServicesSection,
  WhyChooseUs,
  coreServices,
  serviceAreas,
  specialtyServices,
} from "@/components/services";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";

const processSteps = [
  {
    title: "Discovery and Scope Validation",
    description:
      "Align project goals, success criteria, budget boundaries, and operating constraints before design and procurement commitments.",
    tags: ["Scope", "Budget", "Risk"],
  },
  {
    title: "Preconstruction Planning",
    description:
      "Lock sequence logic, constructability assumptions, permit path, and procurement readiness for cleaner field starts.",
    tags: ["Planning", "Precon", "Controls"],
  },
  {
    title: "Execution and Coordination",
    description:
      "Drive field production with superintendent oversight and PM control loops to keep schedule, communication, and quality aligned.",
    tags: ["Execution", "Scheduling", "Coordination"],
  },
  {
    title: "Quality and Safety Verification",
    description:
      "Apply continuous QA checks and safety enforcement with documented escalations when issues require leadership decisions.",
    tags: ["QA", "Safety", "Compliance"],
  },
  {
    title: "Closeout and Turnover",
    description:
      "Complete punch, turnover packages, and handoff-ready documentation so project closeout is orderly and audit-ready.",
    tags: ["Closeout", "Documentation", "Turnover"],
  },
  {
    title: "Post-Closeout Support",
    description:
      "Sustain continuity after turnover through warranty coordination, follow-up support, and structured communication.",
    tags: ["Support", "Warranty", "Continuity"],
  },
] as const;

export default function ServicesPage() {
  return (
    <>
      <ServicesHero heroSlogan={getHeroPageSlogan("services").slogan} />

      <ConstructionExpertiseSection
        subtitle="Commercial-First Delivery"
        title="Services Built for Commercial, Industrial, and Public Projects"
        description="Our core delivery is commercial construction. We support agricultural and winery communities, occupied tenant improvements, municipal work, and select custom home builds when scope and delivery conditions align."
      />

      <CoreServicesSection
        services={coreServices}
        subtitle="Core Services"
        title="Execution Controls That Keep Projects Moving"
        description="From preconstruction through closeout, these services keep scope, schedule, and accountability clear for Client Partners, teams, and stakeholders."
      />

      <SpecialtyServicesSection
        services={specialtyServices}
        subtitle="Specialty Services"
        title="Specialized Scopes Across Washington, Oregon, and Idaho"
        description="Specialty capabilities for sector-specific constraints, occupied facilities, and technical delivery requirements."
      />

      <GovernmentProjectsSection
        subtitle="Public-Sector Delivery"
        title="Government and Grant-Funded Project Support"
        description="Compliance-forward planning and documentation support for municipal and public-sector delivery pathways."
      />

      <ServiceAreasSection
        serviceAreas={serviceAreas}
        subtitle="Service Areas"
        title="Regional Coverage with Local Delivery Accountability"
        description="Tri-Cities headquartered with field-ready delivery support for Client Partners and project teams across the region."
        maxLocationsPerArea={8}
        showAllLocationsCta
      />

      <WhyChooseUs
        subtitle="Trust Signals"
        title="Why Client Partners Choose MH Construction"
        description="Documented safety performance, transparent communication, and reliable follow-through from planning through turnover."
      />

      <ConstructionProcessSection
        subtitle="Delivery Process"
        title="Six-Stage Operating Process"
        description="A clear operating model that keeps planning, field execution, and closeout controls visible at every stage."
        steps={processSteps.map((step) => ({ ...step, tags: [...step.tags] }))}
        cta={{
          title: "Evaluate Project Fit",
          description:
            "Review recent work and delivery patterns before scheduling your scope conversation.",
          contactButton: "Contact Us",
          projectsButton: "View Projects",
        }}
      />

      <PartnershipTypesSection />
    </>
  );
}
