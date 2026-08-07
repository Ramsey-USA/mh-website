import {
  ConstructionExpertiseSection,
  ConstructionProcessSection,
  CoreServicesSection,
  GovernmentProjectsSection,
  ServiceAreasSection,
  ServicesHero,
  SpecialtyServicesSection,
  WhyChooseUs,
  coreServices,
  serviceAreas,
  specialtyServices,
} from "@/components/services";
import { JeremyAuthorityLinksStrip } from "@/components/shared-sections/JeremyAuthorityLinksStrip";
import { NextStepsSection } from "@/components/shared-sections";
import { BrandedContentSection } from "@/components/templates";
import { getUniversalCtaSet } from "@/lib/content/universal-ctas";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { MH_SLOGANS } from "@/lib/branding/page-names";
import { projectCaseStudies } from "@/lib/data/project-case-studies";
import Link from "next/link";

const processSteps = [
  {
    title: "Project Discovery and Scope Validation",
    description:
      "Align project goals, success criteria, budget boundaries, and operating constraints before design and procurement commitments, with approval gates, risk review, and sales-and-estimating guidance shaping the initial scope narrative.",
    tags: ["Scope", "Budget", "Risk"],
  },
  {
    title: "Pre-Deployment Planning",
    description:
      "Lock sequence logic, constructability assumptions, permit path, and procurement readiness for cleaner field starts, backed by command-level controls, approval discipline, and a marketing-and-sales framework for handoff-ready messaging.",
    tags: ["Planning", "Precon", "Controls"],
  },
  {
    title: "Execution and Coordination",
    description:
      "Drive field production with superintendent oversight and PM command loops to keep schedule, communication, and quality aligned through documented escalation paths, approval visibility, and disciplined handoff governance.",
    tags: ["Execution", "Scheduling", "Coordination"],
  },
  {
    title: "Quality and Safety Verification",
    description:
      "Apply continuous QA checks and safety enforcement with documented escalations, evidence retention, and leadership-level review when issues require command decisions.",
    tags: ["QA", "Safety", "Compliance"],
  },
  {
    title: "Closeout and Handoff",
    description:
      "Complete punch, handoff packages, and handoff-ready documentation so project turnover is orderly and audit-ready, with approval records, retained evidence, and approved proof assets prepared for post-launch communication.",
    tags: ["Closeout", "Documentation", "Turnover"],
  },
  {
    title: "Post-Closeout Support",
    description:
      "Sustain continuity after handoff through warranty coordination, follow-up support, and structured communication, including baseline social updates across LinkedIn and Facebook, secondary repurposing to X, YouTube, and Instagram, and a post-completion podcast post-interview with Jeremy when approvals are in place.",
    tags: ["Support", "Marketing", "Jeremy Interview"],
  },
  {
    title: "Marketing Strategy Phase I: Preconstruction",
    description:
      "Set the project marketing baseline before mobilization with messaging guardrails, channel planning, content-angle assignments, and evidence standards for what can be published as part of the marketing strategy playbook.",
    tags: ["Preconstruction", "Messaging", "Planning"],
  },
  {
    title: "Marketing Strategy Phase II: Active Project",
    description:
      "Run weekly cadence (1-2 posts) with documented field proof, rotating macro, technical, logistics, safety-team, and spec-vs-reality content across LinkedIn and Facebook, aligned with the sales and estimating strategy for continuity from proposal to delivery.",
    tags: ["Active", "Cadence", "Content Rotation"],
  },
  {
    title: "Marketing Strategy Phase III: Closing and Handover",
    description:
      "Publish closeout-ready milestones, owner-approved recap content, and proof-led summaries that connect delivered scope to quality, safety, and turnover outcomes under the marketing strategy and sales guidance framework.",
    tags: ["Closing", "Milestones", "Proof"],
  },
  {
    title: "Marketing Strategy Phase IV: Post-Launch",
    description:
      "Convert final assets into case-study and reputation content, including post-launch social proof packaging and the post-completion podcast post-interview with Jeremy when approvals are in place, reinforcing the sales and marketing strategy after handoff.",
    tags: ["Post-Launch", "Case Study", "Podcast"],
  },
] as const;

const processStepsEs = [
  {
    title: "Descubrimiento del Proyecto y Validación de Alcance",
    description:
      "Alineamos objetivos, criterios de exito, limites de presupuesto y restricciones operativas antes de compromisos de diseno y compras, con puertas de aprobación, revisión de riesgos y guía de ventas y estimación para la narrativa inicial del alcance.",
    tags: ["Alcance", "Presupuesto", "Riesgo"],
  },
  {
    title: "Planificación de Preconstrucción",
    description:
      "Definimos logica de secuencia, supuestos de constructabilidad, ruta de permisos y preparacion de compras para iniciar obra con mayor control, respaldados por controles de mando, disciplina de aprobación y un marco de marketing y ventas para mensajes listos para entrega.",
    tags: ["Planificacion", "Preconstruccion", "Controles"],
  },
  {
    title: "Ejecucion y Coordinacion",
    description:
      "Conducimos produccion en campo con supervision de obra y bucles de gestion para mantener cronograma, comunicacion y calidad alineados mediante rutas de escalamiento documentadas, visibilidad de aprobación y gobernanza disciplinada de handoff.",
    tags: ["Ejecucion", "Cronograma", "Coordinacion"],
  },
  {
    title: "Verificacion de Calidad y Seguridad",
    description:
      "Aplicamos controles continuos de calidad y estandares de seguridad con escalamiento documentado, retención de evidencia y revisión de liderazgo cuando las decisiones requieren mando.",
    tags: ["Calidad", "Seguridad", "Cumplimiento"],
  },
  {
    title: "Cierre y Entrega",
    description:
      "Completamos pendientes, paquetes de entrega y documentacion lista para auditoria para un handoff ordenado y verificable, con registros de aprobación, evidencia retenida y activos de prueba preparados para la comunicación de post-lanzamiento.",
    tags: ["Cierre", "Documentacion", "Entrega"],
  },
  {
    title: "Soporte Post-Cierre",
    description:
      "Sostenemos continuidad despues de la entrega mediante garantias, seguimiento y comunicacion estructurada con socios del proyecto.",
    tags: ["Soporte", "Garantia", "Seguimiento"],
  },
  {
    title: "Estrategia de Marketing Fase I: Preconstruccion",
    description:
      "Definimos la base de comunicacion antes de movilizar con lineamientos de mensaje, plan de canales y estandares de evidencia publicable como parte de la estrategia de marketing.",
    tags: ["Preconstruccion", "Mensaje", "Planificacion"],
  },
  {
    title: "Estrategia de Marketing Fase II: Proyecto Activo",
    description:
      "Ejecutamos cadencia semanal con evidencia de campo y rotacion de contenido tecnico, logistico y de seguridad en canales aprobados, alineada con la estrategia de ventas y estimacion para mantener continuidad desde la propuesta hasta la entrega.",
    tags: ["Activo", "Cadencia", "Contenido"],
  },
  {
    title: "Estrategia de Marketing Fase III: Cierre y Traspaso",
    description:
      "Publicamos hitos de cierre y resumenes con evidencia que conectan alcance entregado con resultados de calidad y seguridad dentro del marco de la estrategia de marketing y ventas.",
    tags: ["Cierre", "Hitos", "Prueba"],
  },
  {
    title: "Estrategia de Marketing Fase IV: Post-Lanzamiento",
    description:
      "Convertimos activos finales en contenido de casos y reputacion, con empaquetado de prueba social segun aprobaciones, reforzando la estrategia de ventas y marketing despues del handoff.",
    tags: ["Post-Lanzamiento", "Caso", "Reputacion"],
  },
] as const;

export default async function ServicesPage() {
  const isEs = (await getServerLocale()) === "es";
  const locale = isEs ? "es" : "en";
  const universalCtas = getUniversalCtaSet(locale);
  const publishedCaseStudies = projectCaseStudies.filter(
    (project) => project.isPublished !== false,
  );
  const featuredProofProjects = publishedCaseStudies.slice(0, 3);
  const localizedProcessSteps = isEs ? processStepsEs : processSteps;

  return (
    <div className="enterprise-controlled-surface">
      <ServicesHero
        heroSlogan={getHeroPageSlogan("services").slogan}
        locale={locale}
      />

      <div className="mx-auto max-w-7xl px-4 pb-4 pt-6 sm:px-6 lg:px-8">
        <JeremyAuthorityLinksStrip isEs={isEs} />
      </div>

      <section className="enterprise-route-intro">
        <div className="enterprise-shell enterprise-route-intro__layout">
          <div className="contents">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand-primary dark:text-brand-primary-light">
                {isEs ? "Ruta de servicio y prueba" : "Service path and proof"}
              </p>
              <h2 className="mt-3 text-2xl font-black tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                {isEs
                  ? "Cada servicio está unido a un enfoque de entrega verificable"
                  : "Each service is tied to a verifiable delivery approach"}
              </h2>
              <p className="mt-4 text-base leading-7 text-gray-700 dark:text-gray-300">
                {isEs
                  ? "Use esta página para comparar alcances, revisar la evidencia de obra reciente y pasar directamente a la siguiente conversación para el proyecto correcto."
                  : "Use this page to compare scopes, review recent project evidence, and move directly to the next conversation for the right project fit."}
              </p>
            </div>
            <div className="enterprise-actions lg:justify-end">
              <Link
                href="/projects"
                className="enterprise-button enterprise-button--green"
              >
                {isEs ? "Ver proyectos" : "View projects"}
              </Link>
              <Link
                href="/contact"
                className="enterprise-button enterprise-button--green"
              >
                {isEs ? "Solicitar consulta" : "Request a consult"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ConstructionExpertiseSection
        subtitle={
          isEs
            ? "Entrega Lista para la Construcción"
            : "Construction-Ready Delivery"
        }
        title={
          isEs
            ? "Servicios para Proyectos Comerciales, Industriales y Públicos"
            : "Services Built for Commercial, Industrial, and Public Projects"
        }
        description={
          isEs
            ? "Nuestra entrega principal es construcción comercial. También apoyamos comunidades agrícolas y bodegas, acondicionamientos en espacios ocupados, obra municipal y algunos proyectos residenciales selectivos cuando el alcance está alineado. El trabajo se estructura con claridad, coordinación y seguimiento responsable desde la primera reunión hasta la entrega."
            : `Our core delivery is new construction and major renovation. We support agricultural and winery communities, occupied tenant improvements, municipal work, and select custom home builds when scope and delivery conditions align. We structure each engagement around clear scope, accountable delivery, and practical follow-through from planning through handoff.`
        }
      />

      <CoreServicesSection
        services={coreServices}
        locale={locale}
        subtitle={isEs ? "Servicios Principales" : "Core Services"}
        title={
          isEs
            ? "Controles de Ejecución que Mantienen el Proyecto en Marcha"
            : "Execution Controls That Keep Projects Moving"
        }
        description={
          isEs
            ? "Desde la planificacion previa hasta la entrega, estos servicios mantienen alcance, cronograma y responsabilidad claros para propietarios, arquitectos, bancos de fianza, aseguradoras y equipos de proyecto. La intención es reducir ambigüedad y mantener decisiones trazables a lo largo del proyecto."
            : "From preconstruction through handoff, these services keep scope, schedule, and accountability clear for owners, architects, bonding banks, insurers, and project teams. The goal is to reduce ambiguity and keep decisions traceable through delivery."
        }
      />

      <SpecialtyServicesSection
        services={specialtyServices}
        locale={locale}
        subtitle={isEs ? "Servicios Especializados" : "Specialty Services"}
        title={
          isEs
            ? "Alcances Especializados en Washington, Oregon e Idaho"
            : "Specialized Scopes Across Washington, Oregon, and Idaho"
        }
        description={
          isEs
            ? "Capacidades especializadas para restricciones por sector, instalaciones ocupadas y requisitos técnicos de entrega, con una postura de coordinación y cumplimiento que respalda al equipo del proyecto y mantiene decisiones claras desde la primera fase."
            : "Specialty capabilities for sector-specific constraints, occupied facilities, and technical delivery requirements, with a coordination-first approach that supports the wider project team and keeps decisions clear from the first phase."
        }
      />

      <ConstructionProcessSection
        subtitle={isEs ? "Proceso de Entrega" : "Delivery Process"}
        title={
          isEs
            ? "Proceso de Entrega y Fases de Marketing"
            : "Delivery and Marketing Phase Process"
        }
        description={
          isEs
            ? "Un modelo operativo unificado que conecta la entrega de construcción, la estrategia de marketing y la estrategia de ventas y estimación para mantener visibles la evidencia de campo, el seguimiento por fases y la continuidad desde preconstrucción hasta post-lanzamiento."
            : "A unified operating model that connects construction delivery, the marketing strategy, and the sales and estimating strategy to keep field proof, phase-based follow-through, and continuity visible from preconstruction through post-launch."
        }
        steps={localizedProcessSteps.map((step) => ({
          ...step,
          tags: [...step.tags],
        }))}
        cta={{
          title: isEs ? "Evaluar Ajuste del Proyecto" : "Evaluate Project Fit",
          description: isEs
            ? "Revise trabajo reciente y patrones de entrega antes de programar la conversacion sobre su alcance."
            : "Review recent work and delivery patterns before scheduling your scope conversation.",
          contactButton: universalCtas.services.label,
          projectsButton: universalCtas.portfolio.label,
        }}
      />

      <WhyChooseUs
        locale={locale}
        subtitle={isEs ? "Senales de Confianza" : "Trust Signals"}
        title={
          isEs
            ? "Por Que los Socios de Proyecto Eligen a MH"
            : "Why Project Stakeholders Choose MH Teams"
        }
        description={
          isEs
            ? `Desempeño de seguridad documentado, comunicación transparente y seguimiento confiable desde la planificación hasta la entrega, con evidencia por fases y estándares de recapitulación de liderazgo post-completación. ${MH_SLOGANS.supporting[3]} La prioridad sigue siendo mantener a los project stakeholders informados y confiados en cada etapa.`
            : `Documented safety performance, transparent communication, and reliable follow-through from planning through handoff, with phase-based proof and post-completion leadership recap standards. ${MH_SLOGANS.supporting[3]} The priority remains keeping project stakeholders informed and confident at every stage.`
        }
      />

      <GovernmentProjectsSection
        locale={locale}
        subtitle={
          isEs ? "Entrega del Sector Publico" : "Public-Sector Delivery"
        }
        title={
          isEs
            ? "Soporte para Proyectos Gubernamentales y con Fondos"
            : "Government and Grant-Funded Project Support"
        }
        description={
          isEs
            ? `Planificacion orientada al cumplimiento, control documental y comunicacion por niveles de seguridad para rutas de entrega municipal y del sector publico, incluyendo manejo de sensibilidad confidencial y top-secret. ${MH_SLOGANS.supporting[2]}`
            : `Compliance-forward planning, documentation control, and security-tiered marketing communication for municipal and public-sector delivery pathways, including confidential and top-secret sensitivity handling. ${MH_SLOGANS.supporting[2]}`
        }
      />

      <BrandedContentSection
        id="service-proof"
        variant="gray"
        headerSize="section"
        header={{
          icon: "verified",
          iconVariant: "secondary",
          subtitle: isEs ? "Prueba Verificada" : "Verified Proof",
          title: isEs
            ? "Casos Públicos de Proyectos"
            : "Public Project Case Studies",
          description: isEs
            ? "Casos publicados que muestran ubicación, tipo de proyecto y resultados documentados desde el repositorio actual."
            : "Published case studies showing location, project type, and documented outcomes from the current repository.",
        }}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {featuredProofProjects.map((caseStudy) => (
            <article
              key={caseStudy.slug}
              className="rounded-2xl border border-gray-200/90 dark:border-gray-700 bg-white/95 dark:bg-gray-800/95 p-5 sm:p-6 shadow-md"
            >
              <p className="font-subheading text-xs font-semibold uppercase tracking-wide text-brand-primary dark:text-brand-primary-light">
                {caseStudy.category}
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-gray-900 dark:text-white">
                {caseStudy.title}
              </h3>
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                {caseStudy.location.city}, {caseStudy.location.state} ·{" "}
                {caseStudy.yearCompleted}
              </p>
              <p className="font-body mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {caseStudy.description}
              </p>
              <Link
                href={`/projects/${caseStudy.slug}`}
                className="mt-4 inline-flex items-center text-sm font-semibold text-brand-primary hover:underline dark:text-brand-primary-light"
              >
                {isEs ? "Ver estudio de caso" : "View case study"}
              </Link>
            </article>
          ))}
        </div>
      </BrandedContentSection>

      <ServiceAreasSection
        serviceAreas={serviceAreas}
        locale={locale}
        subtitle={isEs ? "Areas de Servicio" : "Service Areas"}
        title={
          isEs
            ? "Cobertura Regional con Responsabilidad Local"
            : "Regional Coverage with Local Project Accountability"
        }
        description={
          isEs
            ? "Con sede en Tri-Cities y soporte operativo listo para campo para propietarios, arquitectos y equipos de proyecto en toda la region."
            : "Tri-Cities headquartered with field-ready delivery support for owners, architects, and project teams across the region."
        }
        maxLocationsPerArea={8}
        showAllLocationsCta
      />

      <NextStepsSection locale={locale} includePublicSectorLink />
    </div>
  );
}
