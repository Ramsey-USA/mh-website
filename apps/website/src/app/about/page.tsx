import dynamic from "next/dynamic";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
// FadeInWhenVisible is a client animation component. Dynamic import keeps its
// JS out of the critical bundle; its single use in this page is below fold.
const FadeInWhenVisible = dynamic(
  () =>
    import("@/components/animations/FramerMotionComponents").then((m) => ({
      default: m.FadeInWhenVisible,
    })),
  { ssr: true },
);
// Above-fold: static
import {
  AboutHero,
  PartnershipPhilosophy,
  AwardsSection,
} from "@/components/about";
import { useTranslations } from "next-intl";
import type { Testimonial } from "@/lib/data/testimonials";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { aboutTimelineSteps } from "@/lib/data/about-timeline";
import { gridPresets } from "@/lib/styles/layout-variants";
import { AccreditationsLogoRow } from "@/components/shared-sections";
// Below-fold: lazy-loaded to reduce initial JS
const CompanyStats = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.CompanyStats })),
);
const ValuesShowcase = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.ValuesShowcase })),
);
const LeadershipTeam = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.LeadershipTeam })),
);
const SafetySection = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.SafetySection })),
);
const Timeline = dynamic(() =>
  import("@/components/ui/Timeline").then((m) => ({ default: m.Timeline })),
);
const ContentCard = dynamic(() =>
  import("@/components/ui/ContentCard").then((m) => ({
    default: m.ContentCard,
  })),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/shared-sections").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const NextStepsSection = dynamic(() =>
  import("@/components/shared-sections").then((m) => ({
    default: m.NextStepsSection,
  })),
);

export default function AboutPage() {
  const t = useTranslations();
  const commonT = useTranslations("common");
  const clientTestimonials = (
    t.raw("testimonialsData.clientTestimonials") as Array<{
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
    }>
  ).map(
    (testimonial) =>
      ({
        ...testimonial,
        type: "client",
      }) as Testimonial,
  );

  return (
    <>
      <PageTrackingClient pageName="About" />

      {/* SEO Meta Tags */}
      {/* Structured Data is injected via layout.tsx to avoid duplication */}

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema(breadcrumbPatterns.about),
          ),
        }}
      />

      <div className="bg-linear-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section - Keyword-rich introduction */}
        <AboutHero
          title={commonT("about.hero.sectionTitle")}
          subtitle={commonT("about.hero.sectionSubtitle")}
          description={commonT("about.hero.sectionDescription")}
        />

        {/* Breadcrumb Navigation - Schema markup for SEO */}
        <Breadcrumb
          items={[
            { label: commonT("back"), href: "/" },
            { label: commonT("about.hero.sectionTitle") },
          ]}
        />

        {/* Partnership Philosophy Section - Story and positioning first */}
        <PartnershipPhilosophy />

        {/* Leadership Team Section - Faces and structure build trust early */}
        <LeadershipTeam
          title={commonT("about.leadershipTeam.sectionTitle")}
          subtitle={commonT("about.leadershipTeam.sectionSubtitle")}
          description={commonT("about.leadershipTeam.sectionDescription")}
        />

        {/* Why Values Matter Section - Trust framework before proof */}
        <ValuesShowcase
          title={commonT("about.valuesShowcase.sectionTitle")}
          subtitle={commonT("about.valuesShowcase.sectionSubtitle")}
          description={commonT("about.valuesShowcase.sectionDescription")}
        />

        {/* Company Evolution Timeline Section - Story continuity before proof cluster */}
        <Timeline
          id="company-evolution"
          icon="history"
          iconBg="bronze"
          subtitle={commonT("about.timeline.sectionSubtitle")}
          title={commonT("about.timeline.sectionTitle")}
          description={commonT("about.timeline.sectionDescription")}
          steps={aboutTimelineSteps}
        />

        {/* Company Stats - Proof after story and leadership */}
        <CompanyStats
          id="stats"
          subtitle={commonT("about.companyStats.sectionSubtitle")}
          title={commonT("about.companyStats.sectionTitle")}
          description={commonT("about.companyStats.sectionDescription")}
          variant="primary"
        />

        {/* Awards & Recognition Section - External proof signals */}
        <AwardsSection />

        {/* Accreditations & Certifications - Credential logos */}
        <section className="relative py-12 sm:py-14 bg-gray-50 dark:bg-gray-800/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-6">
              {commonT("about.accreditations.sectionTitle")}
            </p>
            <AccreditationsLogoRow />
          </div>
        </section>

        {/* Safety & Compliance Section - Verified operational proof */}
        <SafetySection
          title={commonT("about.safety.sectionTitle")}
          subtitle={commonT("about.safety.sectionSubtitle")}
          description={commonT("about.safety.sectionDescription")}
        />

        {/* Client Reviews Section - Social proof after credibility cluster */}
        <TestimonialsSection
          id="testimonials"
          subtitle={commonT("about.testimonials.sectionSubtitle")}
          title={commonT("about.testimonials.sectionTitle")}
          description={commonT("about.testimonials.sectionDescription")}
          testimonials={clientTestimonials}
        />

        {/* News & Achievements Section */}
        <section
          id="news"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="mb-16 sm:mb-20 text-center">
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="campaign"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  {commonT("about.news.sectionSubtitle")}
                </span>
                <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  {commonT("about.news.sectionTitle")}
                </span>
              </h2>

              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                {commonT("about.news.sectionDescription")}
              </p>
            </div>

            <div className={gridPresets.cards3("md", "mx-auto max-w-7xl")}>
              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="precision_manufacturing"
                  category={commonT("about.news.cards.crm.category")}
                  categoryColor="secondary"
                  title={commonT("about.news.cards.crm.title")}
                  description={commonT("about.news.cards.crm.description")}
                  date={commonT("about.news.cards.crm.date")}
                  href="/contact"
                  linkText={commonT("about.news.cards.crm.linkText")}
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="handshake"
                  category={commonT("about.news.cards.trade.category")}
                  categoryColor="secondary"
                  title={commonT("about.news.cards.trade.title")}
                  description={commonT("about.news.cards.trade.description")}
                  date={commonT("about.news.cards.trade.date")}
                  href="/allies"
                  linkText={commonT("about.news.cards.trade.linkText")}
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="workspace_premium"
                  category={commonT("about.news.cards.safety.category")}
                  categoryColor="secondary"
                  title={commonT("about.news.cards.safety.title")}
                  description={commonT("about.news.cards.safety.description")}
                  date={commonT("about.news.cards.safety.date")}
                  href="/about#safety"
                  linkText={commonT("about.news.cards.safety.linkText")}
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="lightbulb"
                  category={commonT("about.news.cards.insight.category")}
                  categoryColor="primary"
                  title={commonT("about.news.cards.insight.title")}
                  description={commonT("about.news.cards.insight.description")}
                  date={commonT("about.news.cards.insight.date")}
                  href="/services"
                  linkText={commonT("about.news.cards.insight.linkText")}
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="military_tech"
                  category={commonT("about.news.cards.veteran.category")}
                  categoryColor="bronze"
                  title={commonT("about.news.cards.veteran.title")}
                  description={commonT("about.news.cards.veteran.description")}
                  date={commonT("about.news.cards.veteran.date")}
                  href="/about"
                  linkText={commonT("about.news.cards.veteran.linkText")}
                  accentGradient="bg-linear-to-r from-bronze-600 via-bronze-700 to-bronze-800"
                  glowGradient="bg-linear-to-br from-bronze-700/40 to-bronze-800/40"
                  enhancedIcon
                />
              </div>
            </div>

            <FadeInWhenVisible className="mt-12 text-center">
              <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl inline-block">
                <div className="flex items-center gap-3">
                  <MaterialIcon
                    icon="info"
                    size="md"
                    className="text-brand-primary"
                  />
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    {commonT("about.news.footerNote")}
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Next Steps Section - Final conversion action */}
        <NextStepsSection
          title={commonT("about.nextSteps.sectionTitle")}
          subtitle={commonT("about.nextSteps.sectionSubtitle")}
          description={commonT("about.nextSteps.sectionDescription")}
        />
      </div>
    </>
  );
}
