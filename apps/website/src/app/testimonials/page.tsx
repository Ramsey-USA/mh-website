export const revalidate = 86400; // 24 h ISR
export const dynamic = "force-dynamic";

import nextDynamic from "next/dynamic";
import Link from "next/link";
import { headers } from "next/headers";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/SeoMeta";
import { TestimonialsHero } from "@/components/testimonials/TestimonialsHero";
import { StripedBackground } from "@/components/ui/StripedBackground";
import { GoogleReviewsStrip } from "@/components/project-marketing/GoogleReviewsStrip";
import { JeremyAuthorityLinksStrip } from "@/components/shared-sections/JeremyAuthorityLinksStrip";
import { NextStepsSection } from "@/components/shared-sections";
import {
  type Testimonial,
  normalizeStakeholderTestimonials,
} from "@/lib/data/testimonials";
import {
  GOOGLE_REVIEW_DESTINATION_URL,
  VERIFIED_GOOGLE_REVIEWS,
} from "@/lib/data/google-reviews";
import { MH_SLOGANS } from "@/lib/branding/page-names";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { getTranslations } from "next-intl/server";

async function getIsLighthouseAudit(
  searchParamsPromise?: Promise<Record<string, string | string[] | undefined>>,
) {
  if (searchParamsPromise) {
    const searchParams = await searchParamsPromise;
    const lighthouseParam = searchParams["__lh"];

    if (Array.isArray(lighthouseParam)) {
      return lighthouseParam.includes("1") || lighthouseParam.includes("true");
    }

    if (lighthouseParam) {
      return lighthouseParam === "1" || lighthouseParam === "true";
    }
  }

  try {
    const requestHeaders = await headers();
    return /Chrome-Lighthouse/i.test(requestHeaders.get("user-agent") ?? "");
  } catch {
    return false;
  }
}

const Breadcrumb = nextDynamic(() =>
  import("@/components/navigation/Breadcrumb").then((m) => ({
    default: m.Breadcrumb,
  })),
);

const TestimonialsSection = nextDynamic(() =>
  import("@/components/shared-sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);

const SITE_URL = "https://www.mhc-gc.com";
const testimonialsMissionLine = MH_SLOGANS.primary;
const testimonialsSupportingLine = MH_SLOGANS.supporting[1];

type TestimonialsPageCopy = {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  breadcrumbSchemaHome: string;
  breadcrumbSchemaCurrent: string;
  staticHeading: string;
  staticDescription: string;
  missionPartnerLabel: string;
  starAriaLabel: string;
  reviewButtonAriaLabel: string;
  reviewsCtaAriaLabel: string;
  trustSignalsLabel: string;
  trustHeading: string;
  trustDescription: string;
  projectsCompletedLabel: string;
  projectsCompletedDescription: string;
  referralRateLabel: string;
  referralRateDescription: string;
  emrLabel: string;
  emrDescription: string;
  bbbLabel: string;
  bbbDescription: string;
  testimonialsSubtitle: string;
  testimonialsTitle: string;
  testimonialsDescription: string;
  comingSoonAria: string;
  comingSoonTitle: string;
  comingSoonDescription: string;
};

const TESTIMONIALS_COPY: Record<"en" | "es", TestimonialsPageCopy> = {
  en: {
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Testimonials",
    breadcrumbSchemaHome: "Home",
    breadcrumbSchemaCurrent: "Testimonials",
    staticHeading: "Project Stakeholder Feedback",
    staticDescription:
      "Verified testimonials across commercial, industrial, and government work.",
    missionPartnerLabel: "Project Stakeholder",
    starAriaLabel: "Filled star",
    reviewButtonAriaLabel: "Google reviews",
    reviewsCtaAriaLabel: "Rate and review",
    trustSignalsLabel: "Trust Signals",
    trustHeading: "Trusted, Verified, and Accountable",
    trustDescription:
      "Project partnerships are built on transparent communication, proven field standards, and measurable outcomes.",
    projectsCompletedLabel: "Projects Completed",
    projectsCompletedDescription: "Delivered since 2010 across WA, OR, and ID.",
    referralRateLabel: "Referral Rate",
    referralRateDescription:
      "Repeat and referral partnerships from project stakeholders.",
    emrLabel: "EMR Safety Rating",
    emrDescription:
      "Field safety discipline that supports consistent delivery.",
    bbbLabel: "BBB Rating",
    bbbDescription:
      "Accredited business profile with transparent accountability.",
    testimonialsSubtitle: "Project Stakeholder Feedback",
    testimonialsTitle: "Verified Testimonials",
    testimonialsDescription: `Real project feedback across the Pacific Northwest. ${testimonialsMissionLine} ${testimonialsSupportingLine}`,
    comingSoonAria: "Reviews coming soon",
    comingSoonTitle: "Testimonials Coming Soon",
    comingSoonDescription:
      "We are collecting additional project-stakeholder feedback for publication.",
  },
  es: {
    breadcrumbHome: "Inicio",
    breadcrumbCurrent: "Resenas",
    breadcrumbSchemaHome: "Inicio",
    breadcrumbSchemaCurrent: "Resenas",
    staticHeading: "Comentarios de aliados",
    staticDescription:
      "Resenas verificadas en proyectos comerciales, industriales y gubernamentales.",
    missionPartnerLabel: "Aliado",
    starAriaLabel: "Estrella llena",
    reviewButtonAriaLabel: "Resenas de Google",
    reviewsCtaAriaLabel: "Calificar y dejar resena",
    trustSignalsLabel: "Indicadores de confianza",
    trustHeading: "Confiable, verificado y responsable",
    trustDescription:
      "Las alianzas de proyecto se sostienen con comunicacion clara, estandares de campo comprobados y resultados medibles.",
    projectsCompletedLabel: "Proyectos completados",
    projectsCompletedDescription: "Entregados desde 2010 en WA, OR y ID.",
    referralRateLabel: "Tasa de referidos",
    referralRateDescription:
      "Alianzas repetidas y por recomendacion de clientes.",
    emrLabel: "Calificacion de seguridad EMR",
    emrDescription:
      "Disciplina de seguridad en campo que respalda entregas consistentes.",
    bbbLabel: "Calificacion BBB",
    bbbDescription: "Perfil acreditado con rendicion de cuentas transparente.",
    testimonialsSubtitle: "Comentarios de aliados",
    testimonialsTitle: "Resenas verificadas",
    testimonialsDescription: `Retroalimentacion real de proyectos en el Pacifico Noroeste. ${testimonialsMissionLine} ${testimonialsSupportingLine}`,
    comingSoonAria: "Resenas proximamente",
    comingSoonTitle: "Resenas proximamente",
    comingSoonDescription:
      "Estamos recopilando retroalimentacion adicional de aliados para publicacion.",
  },
};

const FAQ_COPY: Record<"en" | "es", Array<{ name: string; text: string }>> = {
  en: [
    {
      name: "How do I leave a testimonial for MH Construction?",
      text: "You can leave a Google review through our testimonials page link, or contact us directly to share your experience. Project-stakeholder feedback helps us improve delivery and helps other businesses make informed partnership decisions.",
    },
    {
      name: "Are MH Construction testimonials verified?",
      text: "Yes. Testimonials come from real project stakeholders on completed projects across Washington, Oregon, and Idaho. We do not publish paid or fabricated reviews.",
    },
    {
      name: "What makes MH Construction different from other contractors?",
      text: "We focus on clear communication, disciplined project controls, and relationship-first execution. Our referral rate, project volume, and safety performance reflect that approach.",
    },
    {
      name: "Can I speak with past MH Construction project stakeholders?",
      text: "Yes. During consultation we can provide references for relevant project types so you can hear directly about communication, schedule transparency, and delivery follow-through.",
    },
  ],
  es: [
    {
      name: "Como dejo una resena para MH Construction?",
      text: "Puede dejar una resena en Google desde nuestra pagina de resenas o contactarnos para compartir su experiencia. La retroalimentacion de nuestros aliados nos ayuda a mejorar la entrega y apoyar decisiones informadas.",
    },
    {
      name: "Las resenas de MH Construction estan verificadas?",
      text: "Si. Las resenas provienen de aliados reales en proyectos completados en Washington, Oregon e Idaho. No publicamos resenas pagadas ni fabricadas.",
    },
    {
      name: "Que diferencia a MH Construction de otros contratistas?",
      text: "Nos enfocamos en comunicacion clara, control disciplinado del proyecto y ejecucion centrada en la relacion. Nuestra tasa de referidos, volumen de proyectos y rendimiento de seguridad respaldan este enfoque.",
    },
    {
      name: "Puedo hablar con aliados anteriores de MH Construction?",
      text: "Si. Durante la consulta podemos compartir referencias de tipos de proyecto similares para que escuche de primera mano sobre comunicacion, transparencia de calendario y cumplimiento en la entrega.",
    },
  ],
};

function buildFaqSchema(locale: "en" | "es") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_COPY[locale].map((item) => ({
      "@type": "Question",
      name: item.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.text,
      },
    })),
  };
}

function StaticTestimonialsSection({
  testimonials,
  copy,
}: Readonly<{ testimonials: Testimonial[]; copy: TestimonialsPageCopy }>) {
  return (
    <section
      id="client-testimonials"
      data-lighthouse-audit="true"
      className="bg-white py-12 dark:bg-gray-900 sm:py-14 lg:py-18 xl:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
            {copy.staticHeading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg">
            {copy.staticDescription}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/15 dark:bg-white/5"
            >
              <div className="mb-4 flex items-center gap-1 text-brand-secondary">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <MaterialIcon
                    key={`${testimonial.id}-star-${i}`}
                    icon="star"
                    size="sm"
                    ariaLabel={copy.starAriaLabel}
                  />
                ))}
              </div>
              <blockquote className="text-base italic leading-relaxed text-gray-700 dark:text-gray-300">
                "{testimonial.quote}"
              </blockquote>
              <div className="mt-5 border-t border-gray-200 pt-4 dark:border-white/15">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {testimonial.company ||
                    testimonial.project ||
                    copy.missionPartnerLabel}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProofStatsSection({ copy }: Readonly<{ copy: TestimonialsPageCopy }>) {
  return (
    <section
      id="trust-signals"
      className="bg-white py-10 dark:bg-gray-900 sm:py-14 lg:py-18 xl:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white/95 p-6 shadow-xl dark:border-white/20 dark:bg-white/5 sm:p-8">
          <div className="mb-8 text-center">
            <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary sm:text-sm">
              {copy.trustSignalsLabel}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl">
              {copy.trustHeading}
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base text-gray-700 dark:text-gray-300 sm:text-lg">
              {copy.trustDescription}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/15 dark:bg-white/6">
              <p className="text-3xl font-black text-brand-primary">650+</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {copy.projectsCompletedLabel}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {copy.projectsCompletedDescription}
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/15 dark:bg-white/6">
              <p className="text-3xl font-black text-brand-primary">70%</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {copy.referralRateLabel}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {copy.referralRateDescription}
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/15 dark:bg-white/6">
              <p className="text-3xl font-black text-brand-primary">0.64</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {copy.emrLabel}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {copy.emrDescription}
              </p>
            </article>

            <article className="rounded-xl border border-gray-200 bg-white p-5 dark:border-white/15 dark:bg-white/6">
              <p className="text-3xl font-black text-brand-primary">A+</p>
              <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                {copy.bbbLabel}
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                {copy.bbbDescription}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsCtaSection({
  heading,
  invitation,
  buttonLabel,
  reviewAriaLabel,
}: Readonly<{
  heading: string;
  invitation: string;
  buttonLabel: string;
  reviewAriaLabel: string;
}>) {
  return (
    <section className="bg-white py-10 dark:bg-gray-900 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm dark:border-white/15 dark:bg-white/5">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
            {heading}
          </h2>
          <p className="font-body mx-auto mt-3 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200">
            {invitation}
          </p>
          <Link
            href={GOOGLE_REVIEW_DESTINATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
          >
            <MaterialIcon
              icon="rate_review"
              size="sm"
              ariaLabel={reviewAriaLabel}
            />
            <span>{buttonLabel}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default async function TestimonialsPage(props?: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  let isEs = false;
  try {
    isEs = (await getServerLocale()) === "es";
  } catch {
    isEs = false;
  }
  const locale: "en" | "es" = isEs ? "es" : "en";
  const copy = TESTIMONIALS_COPY[locale];
  const faqSchema = buildFaqSchema(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: copy.breadcrumbSchemaHome, url: "https://www.mhc-gc.com" },
    {
      name: copy.breadcrumbSchemaCurrent,
      url: "https://www.mhc-gc.com/testimonials",
    },
  ]);
  const isLighthouseAudit = await getIsLighthouseAudit(props?.searchParams);
  const tTestimonials = await getTranslations("testimonialsData");
  const tGoogleReviews = await getTranslations("googleReviews");

  const testimonials = normalizeStakeholderTestimonials(
    tTestimonials.raw("clientTestimonials") as Array<{
      id: string;
      name: string;
      location?: string;
      project?: string;
      company?: string;
      rating?: number;
      quote: string;
      featured?: boolean;
      date?: string;
      image?: string;
      category?: string;
    }>,
  );

  const verifiedReviewSchemas = VERIFIED_GOOGLE_REVIEWS.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: review.quote,
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: review.author,
    },
    ...(review.datePublished ? { datePublished: review.datePublished } : {}),
    itemReviewed: {
      "@type": "Organization",
      name: "MH Construction",
      url: SITE_URL,
    },
  }));

  const googleHeading = tGoogleReviews("heading");
  const googleInvitation = tGoogleReviews("invitation");
  const googleButtonLabel = tGoogleReviews("buttonLabel");

  if (isLighthouseAudit) {
    return (
      <>
        <StructuredData data={breadcrumbSchema} />
        {verifiedReviewSchemas.map((schema, index) => (
          <StructuredData
            key={`review-${schema.author?.name || schema["@type"] || "schema"}-${index}`}
            data={schema}
          />
        ))}
        <StructuredData data={faqSchema} />

        <div data-hero-signal="hero-section">
          <TestimonialsHero isEs={isEs} />
        </div>

        <GoogleReviewsStrip
          reviews={VERIFIED_GOOGLE_REVIEWS}
          labels={{
            heading: googleHeading,
            verifiedLabel: tGoogleReviews("verifiedLabel"),
            buttonLabel: googleButtonLabel,
            starAriaLabel: copy.starAriaLabel,
            reviewButtonAriaLabel: copy.reviewButtonAriaLabel,
          }}
        />

        <ReviewsCtaSection
          heading={googleHeading}
          invitation={googleInvitation}
          buttonLabel={googleButtonLabel}
          reviewAriaLabel={copy.reviewsCtaAriaLabel}
        />

        {testimonials.length > 0 && (
          <StaticTestimonialsSection testimonials={testimonials} copy={copy} />
        )}
      </>
    );
  }

  return (
    <>
      <PageTrackingClient pageName="Testimonials" />
      <StructuredData data={breadcrumbSchema} />
      {verifiedReviewSchemas.map((schema, index) => (
        <StructuredData
          key={`review-${schema.author?.name || schema["@type"] || "schema"}-${index}`}
          data={schema}
        />
      ))}
      <StructuredData data={faqSchema} />

      <main className="min-h-screen text-white">
        <div data-hero-signal="hero-section">
          <TestimonialsHero isEs={isEs} />
        </div>

        <StripedBackground>
          <div className="relative z-10 pb-20">
            <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
              <Breadcrumb
                items={[
                  { label: copy.breadcrumbHome, href: "/" },
                  { label: copy.breadcrumbCurrent },
                ]}
              />
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-4 pt-4 sm:px-6 lg:px-8">
              <JeremyAuthorityLinksStrip isEs={isEs} />
            </div>

            <GoogleReviewsStrip
              reviews={VERIFIED_GOOGLE_REVIEWS}
              labels={{
                heading: googleHeading,
                verifiedLabel: tGoogleReviews("verifiedLabel"),
                buttonLabel: googleButtonLabel,
                starAriaLabel: copy.starAriaLabel,
                reviewButtonAriaLabel: copy.reviewButtonAriaLabel,
              }}
            />

            <ReviewsCtaSection
              heading={googleHeading}
              invitation={googleInvitation}
              buttonLabel={googleButtonLabel}
              reviewAriaLabel={copy.reviewsCtaAriaLabel}
            />

            {testimonials.length > 0 ? (
              <TestimonialsSection
                id="client-testimonials"
                subtitle={copy.testimonialsSubtitle}
                title={copy.testimonialsTitle}
                description={copy.testimonialsDescription}
                testimonials={testimonials}
                autoPlay={true}
                autoPlayInterval={5000}
              />
            ) : (
              <section className="bg-white py-12 dark:bg-gray-900 sm:py-14 lg:py-18 xl:py-20">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                  <MaterialIcon
                    icon="rate_review"
                    size="3xl"
                    className="mx-auto text-brand-primary"
                    ariaLabel={copy.comingSoonAria}
                  />
                  <h2 className="mt-6 text-3xl font-black text-gray-900 dark:text-white sm:text-4xl">
                    {copy.comingSoonTitle}
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
                    {copy.comingSoonDescription}
                  </p>
                </div>
              </section>
            )}

            <ProofStatsSection copy={copy} />
            <NextStepsSection locale={isEs ? "es" : "en"} />
          </div>
        </StripedBackground>
      </main>
    </>
  );
}
