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
import { JeremyAuthorityLinksStrip } from "@/components/shared-sections/JeremyAuthorityLinksStrip";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { MH_SLOGANS } from "@/lib/branding/page-names";

const processSteps = [
  {
    title: "Mission Discovery and Scope Validation",
    description:
      "Align mission goals, success criteria, budget boundaries, and operating constraints before design and procurement commitments.",
    tags: ["Scope", "Budget", "Risk"],
  },
  {
    title: "Pre-Deployment Planning",
    description:
      "Lock sequence logic, constructability assumptions, permit path, and procurement readiness for cleaner field starts.",
    tags: ["Planning", "Precon", "Controls"],
  },
  {
    title: "Execution and Coordination",
    description:
      "Drive field production with superintendent oversight and PM command loops to keep schedule, communication, and quality aligned.",
    tags: ["Execution", "Scheduling", "Coordination"],
  },
  {
    title: "Quality and Safety Verification",
    description:
      "Apply continuous QA checks and safety enforcement with documented escalations when issues require leadership decisions.",
    tags: ["QA", "Safety", "Compliance"],
  },
  {
    title: "Closeout and Handoff",
    description:
      "Complete punch, handoff packages, and handoff-ready documentation so mission handoff is orderly and audit-ready.",
    tags: ["Closeout", "Documentation", "Turnover"],
  },
  {
    title: "Post-Closeout Support",
    description:
      "Sustain continuity after handoff through warranty coordination, follow-up support, and structured communication.",
    tags: ["Support", "Warranty", "Continuity"],
  },
] as const;

export default async function ServicesPage() {
  const isEs = (await getServerLocale()) === "es";

  return (
    <>
      <ServicesHero heroSlogan={getHeroPageSlogan("services").slogan} />

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6 lg:px-8">
        <JeremyAuthorityLinksStrip isEs={isEs} />
      </div>

      <ConstructionExpertiseSection
        subtitle={
          isEs ? "Entrega Lista para la Misión" : "Mission-Ready Delivery"
        }
        title={
          isEs
            ? "Servicios para Misiones Comerciales, Industriales y Públicas"
            : "Services Built for Commercial, Industrial, and Public Missions"
        }
        description={
          isEs
            ? "Nuestra entrega principal es construcción comercial. También apoyamos comunidades agrícolas y bodegas, acondicionamientos en espacios ocupados, obra municipal y algunos proyectos residenciales selectivos cuando el alcance está alineado."
            : `Our core delivery is mission-ready construction. We support agricultural and winery communities, occupied fit-outs, municipal work, and select custom home builds when scope and delivery conditions align. ${MH_SLOGANS.supporting[1]}`
        }
      />

      <CoreServicesSection
        services={coreServices}
        subtitle="Core Services"
        title="Execution Controls That Keep Missions Moving"
        description="From predeployment through handoff, these services keep scope, schedule, and accountability clear for owners, architects, bonding banks, insurers, and project teams."
      />

      <SpecialtyServicesSection
        services={specialtyServices}
        subtitle="Specialty Services"
        title="Specialized Scopes Across Washington, Oregon, and Idaho"
        description="Specialty capabilities for sector-specific constraints, occupied facilities, and technical delivery requirements."
      />

      <GovernmentProjectsSection
        subtitle="Public-Sector Delivery"
        title="Government and Grant-Funded Mission Support"
        description={`Compliance-forward planning and documentation support for municipal and public-sector delivery pathways. ${MH_SLOGANS.supporting[2]}`}
      />

      <ServiceAreasSection
        serviceAreas={serviceAreas}
        subtitle="Service Areas"
        title="Regional Coverage with Local Mission Accountability"
        description="Tri-Cities headquartered with field-ready delivery support for owners, architects, and project teams across the region."
        maxLocationsPerArea={8}
        showAllLocationsCta
      />

      <WhyChooseUs
        subtitle="Trust Signals"
        title="Why Mission Partners Choose MH Mission Teams"
        description={`Documented safety performance, transparent communication, and reliable follow-through from planning through handoff. ${MH_SLOGANS.supporting[3]}`}
      />

      <ConstructionProcessSection
        subtitle="Delivery Process"
        title="Six-Phase Operating Process"
        description="A clear operating model that keeps planning, field execution, and handoff controls visible at every stage."
        steps={processSteps.map((step) => ({ ...step, tags: [...step.tags] }))}
        cta={{
          title: "Evaluate Mission Fit",
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
