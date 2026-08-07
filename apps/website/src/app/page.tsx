import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData } from "@/components/seo/SeoMeta";
import { PageTrackingClient } from "@/components/analytics";
import { HomePageSentrySupport } from "@/components/monitoring/HomePageSentrySupport";
import { getHomepageSEO } from "@/lib/seo/page-seo-utils";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

const SITE_URL = "https://www.mhc-gc.com";

export const metadata: Metadata = withGeoMetadata({
  title: {
    absolute: "Enterprise Construction Planning and Delivery | MH Construction",
  },
  description:
    "Veteran-owned general contractor providing preconstruction, project controls, safety-led field execution, and audit-ready closeout across Washington, Oregon, and Idaho.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Enterprise Construction Planning and Delivery | MH Construction",
    description:
      "One accountable construction system from pursuit and preconstruction through field execution and closeout.",
    url: SITE_URL,
    siteName: "MH Construction",
    type: "website",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "MH Construction project delivery team",
      },
    ],
  },
});

const copy = {
  en: {
    eyebrow: "Veteran-owned | Tri-state licensed | Pasco, Washington",
    title: "Control the plan. Command the build.",
    intro:
      "MH Construction brings enterprise project controls to commercial, public, agricultural, and light industrial work across Washington, Oregon, and Idaho.",
    primary: "Start a project briefing",
    secondary: "Review our capabilities",
    proof: [
      ["WA, OR, ID", "Licensed operating territory"],
      ["Safety-led", "Planning through closeout"],
      ["WA VOB", "Certified veteran-owned business"],
      ["One system", "Preconstruction to turnover"],
    ],
    systemEyebrow: "The MH delivery system",
    systemTitle: "Enterprise discipline without enterprise drag.",
    systemIntro:
      "We connect estimating, risk, safety, schedule, field coordination, quality, and turnover under one chain of accountability.",
    phases: [
      [
        "01",
        "Preconstruction",
        "Scope intelligence, constructability, bid leveling, risk planning, and a decision-ready baseline.",
      ],
      [
        "02",
        "Mobilization",
        "Contract controls, procurement, submittals, site logistics, safety planning, and team alignment.",
      ],
      [
        "03",
        "Field execution",
        "Daily production control, quality verification, change management, and stakeholder communication.",
      ],
      [
        "04",
        "Closeout",
        "Punch control, commissioning records, warranties, turnover, and an audit-ready project file.",
      ],
    ],
    expertiseEyebrow: "Where we deploy",
    expertiseTitle: "Built for operationally demanding work.",
    expertise: [
      [
        "Commercial + occupied space",
        "Tenant improvements, renovations, additions, and phased work where business continuity matters.",
      ],
      [
        "Public + municipal",
        "Compliance-forward delivery, transparent controls, and documentation structured for public accountability.",
      ],
      [
        "Agricultural + winery",
        "Technical sequencing and practical field planning around operating facilities and seasonal constraints.",
      ],
      [
        "Light industrial",
        "Facility upgrades, specialty scopes, equipment interfaces, and disciplined coordination across trades.",
      ],
    ],
    proofEyebrow: "Project proof",
    proofTitle: "Work that carries the record.",
    proofIntro:
      "Our portfolio documents the conditions, decisions, and delivered result, not just the finished photograph.",
    projects: [
      [
        "Darigold Processing Facility",
        "Pasco, Washington",
        "/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p003-photo.webp",
      ],
      [
        "Franklin County Coroner's Office",
        "Pasco, Washington",
        "/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-building-frontage-p006-photo.webp",
      ],
      [
        "Volm Companies Remodel",
        "Pasco, Washington",
        "/images/projects/volm-companies/volm-companies-remodel-2020-02-05-office-and-warehouse-facade-p004-photo.webp",
      ],
    ],
    platformEyebrow: "Secure internal systems",
    platformTitle: "The field and the file stay aligned.",
    platformBody:
      "Secure affiliated systems are being evaluated to support disciplined preconstruction, marketing coordination, field visibility, and accountable project handoffs. Platform development occurs outside MH Construction; this site describes intended capabilities only.",
    platformItems: [
      "Preconstruction coordination",
      "Marketing coordination",
      "Field visibility",
      "MH Ecosystem",
    ],
    finalTitle: "Bring us the mission, the constraints, and the standard.",
    finalBody:
      "We will bring the plan, the controls, and the accountable team to execute it.",
  },
  es: {
    eyebrow:
      "Propiedad de veterano | Licencias en tres estados | Pasco, Washington",
    title: "Controle el plan. Dirija la obra.",
    intro:
      "MH Construction aporta controles de proyecto de nivel empresarial a obras comerciales, públicas, agrícolas e industriales ligeras en Washington, Oregon e Idaho.",
    primary: "Iniciar una sesión de proyecto",
    secondary: "Revisar capacidades",
    proof: [
      ["WA, OR, ID", "Territorio con licencia"],
      ["Seguridad", "Desde planeación hasta cierre"],
      ["WA VOB", "Empresa certificada de veterano"],
      ["Un sistema", "Preconstrucción a entrega"],
    ],
    systemEyebrow: "Sistema de entrega MH",
    systemTitle: "Disciplina empresarial sin burocracia.",
    systemIntro:
      "Conectamos estimación, riesgo, seguridad, programa, campo, calidad y entrega bajo una sola cadena de responsabilidad.",
    phases: [
      [
        "01",
        "Preconstrucción",
        "Alcance, constructibilidad, comparación de ofertas, riesgos y una línea base lista para decidir.",
      ],
      [
        "02",
        "Movilización",
        "Contratos, compras, submittals, logística, seguridad y alineación del equipo.",
      ],
      [
        "03",
        "Ejecución",
        "Control diario, verificación de calidad, cambios y comunicación con interesados.",
      ],
      [
        "04",
        "Cierre",
        "Punch list, registros, garantías, entrega y archivo auditable.",
      ],
    ],
    expertiseEyebrow: "Dónde operamos",
    expertiseTitle: "Preparados para trabajo operacionalmente exigente.",
    expertise: [
      [
        "Comercial + espacios ocupados",
        "Mejoras, renovaciones, adiciones y fases donde la continuidad del negocio importa.",
      ],
      [
        "Público + municipal",
        "Cumplimiento, controles transparentes y documentación para responsabilidad pública.",
      ],
      [
        "Agrícola + bodegas",
        "Secuenciación técnica alrededor de instalaciones activas y restricciones estacionales.",
      ],
      [
        "Industrial ligero",
        "Mejoras de planta, alcances especiales, interfaces de equipo y coordinación de oficios.",
      ],
    ],
    proofEyebrow: "Prueba de proyecto",
    proofTitle: "Trabajo respaldado por el registro.",
    proofIntro:
      "Nuestro portafolio documenta condiciones, decisiones y resultados, no solo la fotografía final.",
    projects: [
      [
        "Planta de procesamiento Darigold",
        "Pasco, Washington",
        "/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p003-photo.webp",
      ],
      [
        "Oficina del forense de Franklin County",
        "Pasco, Washington",
        "/images/projects/franklin-county-morgue/franklin-county-morgue-2025-10-30-building-frontage-p006-photo.webp",
      ],
      [
        "Remodelación de Volm Companies",
        "Pasco, Washington",
        "/images/projects/volm-companies/volm-companies-remodel-2020-02-05-office-and-warehouse-facade-p004-photo.webp",
      ],
    ],
    platformEyebrow: "Sistemas internos seguros",
    platformTitle: "El campo y el archivo permanecen alineados.",
    platformBody:
      "Se están evaluando sistemas afiliados seguros para respaldar la preconstrucción disciplinada, la coordinación de mercadeo, la visibilidad de campo y las transferencias responsables del proyecto. El desarrollo de las plataformas ocurre fuera de MH Construction; este sitio describe únicamente las capacidades previstas.",
    platformItems: [
      "Coordinación de preconstrucción",
      "Coordinación de mercadeo",
      "Visibilidad de campo",
      "Ecosistema MH",
    ],
    finalTitle: "Tráiganos la misión, las restricciones y el estándar.",
    finalBody:
      "Aportaremos el plan, los controles y el equipo responsable para ejecutarlo.",
  },
} as const;

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default async function Home() {
  const locale = await getServerLocale();
  const t = copy[locale] ?? copy.en;
  const isProduction = process.env.NODE_ENV === "production";
  const homepageSEO = getHomepageSEO();

  return (
    <>
      {isProduction ? <PageTrackingClient pageName="Home" /> : null}
      {isProduction ? <HomePageSentrySupport /> : null}
      {isProduction ? <StructuredData data={homepageSEO.schemas} /> : null}

      {/* Home Page Hero Section: <HeroSection compatibility contract */}
      <section
        className="enterprise-hero"
        aria-labelledby="home-heading"
        data-testid="hero-section"
      >
        <Image
          src="/images/projects/darigold-processing-plant/23-34-darigold-2025-10-22-main-entrance-p011-photo.webp"
          alt=""
          fill
          priority
          className="enterprise-hero__image"
          sizes="100vw"
        />
        <div className="enterprise-hero__scrim" />
        <div className="enterprise-shell enterprise-hero__content">
          <p className="enterprise-kicker enterprise-kicker--light">
            {t.eyebrow}
          </p>
          <h1 id="home-heading" className="enterprise-hero__title">
            {t.title}
          </h1>
          <p className="enterprise-hero__intro">{t.intro}</p>
          <div className="enterprise-actions">
            <Link
              className="enterprise-button enterprise-button--tan"
              href="/contact"
              aria-label="Start a project conversation"
            >
              {t.primary} <ArrowIcon />
            </Link>
            <Link
              className="enterprise-button enterprise-button--ghost"
              href="/services?utm_source=homepage&utm_medium=website&utm_campaign=home-splash"
            >
              {t.secondary}
            </Link>
            <Link
              className="enterprise-button enterprise-button--ghost"
              href="/projects"
            >
              View project proof
            </Link>
          </div>
        </div>
      </section>

      <section
        id="stats"
        className="enterprise-proof-bar"
        aria-label="Company credentials"
      >
        <div className="enterprise-shell enterprise-proof-grid">
          {t.proof.map(([value, label]) => (
            <div key={value} className="enterprise-proof-item">
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="enterprise-section enterprise-section--ink">
        <div className="enterprise-shell">
          <div className="enterprise-heading-grid">
            <div>
              <p className="enterprise-kicker enterprise-kicker--tan">
                {t.systemEyebrow}
              </p>
              <h2>{t.systemTitle}</h2>
            </div>
            <p>{t.systemIntro}</p>
          </div>
          <div className="enterprise-phase-grid">
            {t.phases.map(([number, title, body]) => (
              <article key={number} className="enterprise-phase-card">
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="services"
        data-testid="dynamic-home-section"
        className="enterprise-section enterprise-section--paper"
      >
        <div className="enterprise-shell">
          <p className="enterprise-kicker">{t.expertiseEyebrow}</p>
          <div className="enterprise-heading-grid enterprise-heading-grid--dark">
            <h2>{t.expertiseTitle}</h2>
            <div className="enterprise-actions">
              <Link className="enterprise-text-link" href="/services">
                {t.secondary} <ArrowIcon />
              </Link>
              <Link className="enterprise-text-link" href="/public-sector">
                Public Sector <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="enterprise-expertise-grid">
            {t.expertise.map(([title, body], index) => (
              <article key={title} className="enterprise-expertise-card">
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="project-gallery"
        className="enterprise-section enterprise-section--white"
      >
        <div className="enterprise-shell">
          <div className="enterprise-heading-grid enterprise-heading-grid--dark">
            <div>
              <p className="enterprise-kicker">{t.proofEyebrow}</p>
              <h2>{t.proofTitle}</h2>
            </div>
            <p>{t.proofIntro}</p>
          </div>
          <div className="enterprise-project-grid">
            {t.projects.map(([title, location, image], index) => (
              <Link
                key={title}
                href="/projects"
                className="enterprise-project-card"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  className="enterprise-project-card__image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="enterprise-project-card__overlay" />
                <div>
                  <span>Case file 0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{location}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            className="enterprise-text-link enterprise-text-link--center"
            href="/projects?utm_source=homepage&utm_medium=website&utm_campaign=project-proof"
          >
            View all project records <ArrowIcon />
          </Link>
        </div>
      </section>

      <section
        id="why-partner"
        className="enterprise-section enterprise-section--green"
      >
        <div className="enterprise-shell enterprise-platform-grid">
          <div>
            <p className="enterprise-kicker enterprise-kicker--tan">
              {t.platformEyebrow}
            </p>
            <h2>{t.platformTitle}</h2>
            <p>{t.platformBody}</p>
          </div>
          <ul>
            {t.platformItems.map((item, index) => (
              <li key={item}>
                <span>0{index + 1}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="enterprise-final-cta">
        <div className="enterprise-shell">
          <p className="enterprise-kicker">Project briefing</p>
          <h2>{t.finalTitle}</h2>
          <p>{t.finalBody}</p>
          <Link
            className="enterprise-button enterprise-button--green"
            href="/contact?intent=project-discussion"
          >
            {t.primary} <ArrowIcon />
          </Link>
        </div>
      </section>
    </>
  );
}
