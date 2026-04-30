import dynamic from "next/dynamic";
import { PageTrackingClient } from "@/components/analytics";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
// Above-fold: static
import { AboutHero } from "@/components/about";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import { aboutTimelineSteps } from "@/lib/data/about-timeline";
import { gridPresets } from "@/lib/styles/layout-variants";
import { COMPANY_INFO } from "@/lib/constants/company";
import { WaVobBadge } from "@/components/ui/WaVobBadge";
// Below-fold: lazy-loaded to reduce initial JS
const PartnershipPhilosophy = dynamic(() =>
  import("@/components/about").then((m) => ({
    default: m.PartnershipPhilosophy,
  })),
);
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
const AwardsSection = dynamic(() =>
  import("@/components/about").then((m) => ({ default: m.AwardsSection })),
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

      <div className="bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 min-h-screen">
        {/* Hero Section - Keyword-rich introduction */}
        <AboutHero />

        {/* Breadcrumb Navigation - Schema markup for SEO */}
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Our Oath" }]}
        />

        {/* Partnership Philosophy Section - Story and positioning first */}
        <PartnershipPhilosophy />

        {/* Leadership Team Section - Faces and structure build trust early */}
        <LeadershipTeam />

        {/* Why Values Matter Section - Trust framework before proof */}
        <ValuesShowcase />

        {/* Company Evolution Timeline Section - Story continuity before proof cluster */}
        <Timeline
          id="company-evolution"
          icon="history"
          iconBg="bronze"
          subtitle="16+ Years of Excellence"
          title="Our Journey"
          description={
            <>
              From founding father's vision to{" "}
              <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                Veteran-Owned, relationship-first leadership
              </span>{" "}
              —sixteen years of partnership philosophy, safety leadership, and{" "}
              <span className="font-bold text-gray-900 dark:text-white">
                650+ successfully completed projects.
              </span>
            </>
          }
          steps={aboutTimelineSteps}
        />

        {/* Company Stats - Proof after story and leadership */}
        <CompanyStats
          id="stats"
          subtitle=""
          title="Trusted by the Community"
          description=""
          variant="primary"
        />

        {/* Awards & Recognition Section - External proof signals */}
        <AwardsSection />

        {/* Accreditations & Certifications - Credential logos */}
        <section className="relative py-12 sm:py-14 bg-gray-50 dark:bg-gray-800/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-6">
              Accredited & Certified
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {/* BBB */}
              <a
                href={COMPANY_INFO.bbb.sealClickUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="BBB Accredited Business - A+ Rating"
                className="hover:opacity-80 transition-opacity"
              >
                {}
                <img
                  src={COMPANY_INFO.bbb.sealHorizontal}
                  alt="BBB Accredited Business A+ Rating"
                  className="h-10 sm:h-12 w-auto dark:hidden"
                  loading="lazy"
                />
                {}
                <img
                  src={COMPANY_INFO.bbb.sealHorizontalWhite}
                  alt="BBB Accredited Business A+ Rating"
                  className="h-10 sm:h-12 w-auto hidden dark:block"
                  loading="lazy"
                />
              </a>

              {/* AGC Member */}
              <a
                href="https://www.agcwa.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="AGC of Washington Member"
                className="hover:opacity-80 transition-opacity"
              >
                {}
                <img
                  src="/images/logo/agc-member.webp"
                  alt="AGC of Washington Member"
                  className="h-10 sm:h-12 w-auto"
                  loading="lazy"
                />
              </a>

              {/* Travelers Insurance */}
              <a
                href={COMPANY_INFO.travelers.website}
                target="_blank"
                rel="noopener noreferrer"
                title="Travelers Insurance - Auto & Bonding Partner"
                className="hover:opacity-80 transition-opacity"
              >
                {}
                <img
                  src={COMPANY_INFO.travelers.logo}
                  alt="Travelers Insurance - Auto & Bonding Partner"
                  className="h-10 sm:h-12 w-auto dark:hidden"
                  loading="lazy"
                />
                {}
                <img
                  src={COMPANY_INFO.travelers.logoWhite}
                  alt="Travelers Insurance - Auto & Bonding Partner"
                  className="h-10 sm:h-12 w-auto hidden dark:block"
                  loading="lazy"
                />
              </a>

              {/* Pasco Chamber of Commerce */}
              <a
                href={COMPANY_INFO.chambers.pasco.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Pasco Chamber of Commerce Member"
                className="hover:opacity-80 transition-opacity"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.pasco.logo}
                  alt="Pasco Chamber of Commerce Member"
                  className="h-10 sm:h-12 w-auto dark:hidden"
                  loading="lazy"
                />
                {}
                <img
                  src={COMPANY_INFO.chambers.pasco.logoWhite}
                  alt="Pasco Chamber of Commerce Member"
                  className="h-10 sm:h-12 w-auto hidden dark:block"
                  loading="lazy"
                />
              </a>

              {/* Richland Chamber of Commerce */}
              <a
                href={COMPANY_INFO.chambers.richland.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Richland Chamber of Commerce Member"
                className="hover:opacity-80 transition-opacity"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.richland.logo}
                  alt="Richland Chamber of Commerce Member"
                  className="h-10 sm:h-12 w-auto"
                  loading="lazy"
                />
              </a>

              {/* Tri-City Regional Chamber of Commerce */}
              <a
                href={COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="Tri-City Regional Chamber of Commerce Member"
                className="hover:opacity-80 transition-opacity"
              >
                {}
                <img
                  src={COMPANY_INFO.chambers.triCityRegional.logo}
                  alt="Tri-City Regional Chamber of Commerce Member"
                  className="h-10 sm:h-12 w-auto"
                  loading="lazy"
                />
              </a>

              {/* Washington State Veteran Owned Business */}
              <WaVobBadge />
            </div>
          </div>
        </section>

        {/* Safety & Compliance Section - Verified operational proof */}
        <SafetySection />

        {/* Client Reviews Section - Social proof after credibility cluster */}
        <TestimonialsSection
          id="testimonials"
          subtitle="Client Partner"
          title="Testimonials"
          description="Hear directly from our partners about their experience working with MH Construction on their most important projects—where trust is earned, not claimed."
        />

        {/* News & Achievements Section - MERGED from Company Blog + Latest News */}
        <section
          id="news"
          className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
        >
          <DiagonalStripePattern />
          <BrandColorBlobs />

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Section Header - Military Construction Standard */}
            <div className="mb-16 sm:mb-20 text-center">
              {/* Icon with decorative lines */}
              <div className="flex items-center justify-center mb-8 gap-4">
                <div className="h-1 w-16 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-secondary/30 to-bronze-600/30 blur-2xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 rounded-2xl shadow-2xl border-2 border-white/50 dark:border-gray-600">
                    <MaterialIcon
                      icon="campaign"
                      size="2xl"
                      className="text-white drop-shadow-lg"
                    />
                  </div>
                </div>
                <div className="h-1 w-16 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600 rounded-full"></div>
              </div>

              {/* Two-line gradient heading */}
              <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
                <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
                  Mission Updates
                </span>
                <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
                  Latest News & Achievements
                </span>
              </h2>

              {/* Description with colored keyword highlighting */}
              <p className="mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
                Stay updated with our latest{" "}
                <span className="font-bold text-brand-primary dark:text-brand-primary-light">
                  projects, partnerships, and industry insights
                </span>{" "}
                —milestones from our{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  Veteran-Owned team
                </span>{" "}
                where every achievement reflects our commitment to excellence.
              </p>
            </div>

            {/* Combined grid with best content from both sections - 6 items total */}
            <div className={gridPresets.cards3("md", "mx-auto max-w-7xl")}>
              {/* Company Milestone */}
              <div className="scroll-reveal">
                <ContentCard
                  variant="news"
                  icon="celebration"
                  category="Company Milestone"
                  categoryColor="primary"
                  title="650+ Successful Projects in Pacific Northwest"
                  description="We're proud to announce over 650 completed construction projects across Washington, Oregon, and Idaho. Thank you to all our client partners for your continued trust in MH Construction."
                  date="Nov 2025"
                  href="/projects"
                  linkText="View Our Work"
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="news"
                  icon="verified"
                  category="Accreditation"
                  categoryColor="primary"
                  title="BBB Accredited with A+ Rating"
                  description="MH Construction has earned Better Business Bureau accreditation with an A+ rating — recognizing our commitment to trust, transparency, and ethical business practices in every client partnership."
                  date="Apr 2026"
                  href="https://www.bbb.org/us/wa/pasco/profile/construction/mh-construction-inc-1296-1000191036"
                  linkText="View BBB Profile"
                  external
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="rocket_launch"
                  category="New Technology"
                  categoryColor="secondary"
                  title="Integrated CRM & Project Management Platform"
                  description="High-Level CRM implementation underway — providing seamless communication, real-time project updates, and an enhanced client experience from first contact to project close-out."
                  date="Mar 2026"
                  href="/contact"
                  linkText="Learn More"
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="handshake"
                  category="Partnership"
                  categoryColor="secondary"
                  title="Expanding Trade Partner Network"
                  description="We're actively growing our network of skilled trade professionals to better serve Client Partners across the Pacific Northwest. Join our Veteran-Owned partnership program."
                  date="Oct 2025"
                  href="/allies"
                  linkText="Become a Partner"
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="workspace_premium"
                  category="Recognition"
                  categoryColor="secondary"
                  title="Award-Winning Safety Record"
                  description="Our commitment to safety excellence has been recognized by industry organizations. Zero accidents, 100% compliance - that's the Veteran-Owned difference."
                  date="Sep 2025"
                  href="/about#safety"
                  linkText="Safety Standards"
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="lightbulb"
                  category="Industry Insight"
                  categoryColor="primary"
                  title="Best Practices for Commercial Construction Projects"
                  description="Drawing from our years of experience, we share key insights for successful commercial builds: planning, communication, and partnership-focused collaboration."
                  date="Aug 2025"
                  href="/services"
                  linkText="Our Services"
                  enhancedIcon
                />
              </div>

              <div className="scroll-reveal">
                <ContentCard
                  variant="feature"
                  icon="military_tech"
                  category="Veteran Initiative"
                  categoryColor="bronze"
                  title="Supporting Veteran-Owned Businesses"
                  description="As a Veteran-Owned company, we prioritize partnerships with fellow veteran businesses and support programs that help veterans transition to civilian careers."
                  date="Jul 2025"
                  href="/about"
                  linkText="Our Values"
                  accentGradient="bg-gradient-to-r from-bronze-600 via-bronze-700 to-bronze-800"
                  glowGradient="bg-gradient-to-br from-bronze-700/40 to-bronze-800/40"
                  enhancedIcon
                />
              </div>
            </div>

            {/* Footer note about future blog */}
            <FadeInWhenVisible className="mt-12 text-center">
              <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl inline-block">
                <div className="flex items-center gap-3">
                  <MaterialIcon
                    icon="info"
                    size="md"
                    className="text-brand-primary"
                  />
                  <p className="font-medium text-gray-700 dark:text-gray-300">
                    Full blog integration with High-Level CRM platform — in
                    progress
                  </p>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Next Steps Section - Final conversion action */}
        <NextStepsSection />
      </div>
    </>
  );
}
