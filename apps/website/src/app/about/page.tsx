import Link from "next/link";
import { PageTrackingClient } from "@/components/analytics";
import { useLocale, useTranslations } from "next-intl";
import { AboutHero } from "@/components/about";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import {
  generateBreadcrumbSchema,
  breadcrumbPatterns,
} from "@/lib/seo/breadcrumb-schema";
import {
  AccreditationsLogoRow,
  JeremyAuthorityLinksStrip,
  NextStepsSection,
} from "@/components/shared-sections";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { cornerRadius } from "@/lib/styles/design-tokens";
import { getJeremyThamertLeadershipSources } from "@/lib/data/vintage-team";

export default function AboutPage() {
  const commonT = useTranslations("common");
  const locale = useLocale();
  const jeremyLeadershipSources = getJeremyThamertLeadershipSources();
  const pageContent = {
    label: commonT("about.pageContent.label"),
    heading: commonT("about.pageContent.heading"),
    body: commonT("about.pageContent.body"),
    storyTitle: commonT("about.pageContent.storyTitle"),
    storyP1: commonT("about.pageContent.storyP1"),
    storyP2: commonT("about.pageContent.storyP2"),
    servesTitle: commonT("about.pageContent.servesTitle"),
    servesBody: commonT("about.pageContent.servesBody"),
    servesItems: commonT.raw("about.pageContent.servesItems") as string[],
    focusTitle: commonT("about.pageContent.focusTitle"),
    focusItems: commonT.raw("about.pageContent.focusItems") as string[],
    leadershipTitle: commonT("about.pageContent.leadershipTitle"),
    leadershipBody: commonT("about.pageContent.leadershipBody"),
    profileCta: commonT("about.pageContent.profileCta"),
    viewTeamCta: commonT("about.pageContent.viewTeamCta"),
    detailsCta: commonT("about.pageContent.detailsCta"),
    sourceMapTitle: commonT("about.pageContent.sourceMapTitle"),
    sourceMapBody: commonT("about.pageContent.sourceMapBody"),
    sourceHistory: commonT("about.pageContent.sourceHistory"),
    sourceLeadership: commonT("about.pageContent.sourceLeadership"),
    sourceTeam: commonT("about.pageContent.sourceTeam"),
    safetyTitle: commonT("about.pageContent.safetyTitle"),
    safetyBody: commonT("about.pageContent.safetyBody"),
    safetyCta: commonT("about.pageContent.safetyCta"),
    communityTitle: commonT("about.pageContent.communityTitle"),
    communityBody: commonT("about.pageContent.communityBody"),
    communityCta: commonT("about.pageContent.communityCta"),
    valuePills: {
      honesty: commonT("about.pageContent.valuePills.honesty"),
      integrity: commonT("about.pageContent.valuePills.integrity"),
      professionalism: commonT("about.pageContent.valuePills.professionalism"),
      thoroughness: commonT("about.pageContent.valuePills.thoroughness"),
    },
  };
  const leadershipSourcesCopy = {
    label: commonT("about.leadershipSources.label"),
    sourceIntro: commonT("about.leadershipSources.sourceIntro"),
    source1Label: commonT("about.leadershipSources.source1Label"),
    source2Label: commonT("about.leadershipSources.source2Label"),
  };
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

      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <AboutHero
          title={commonT("about.hero.sectionTitle")}
          subtitle={commonT("about.hero.sectionSubtitle")}
          description={commonT("about.hero.sectionDescription")}
        />

        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: commonT("about.hero.sectionTitle") },
          ]}
        />

        <section
          id="what-mh-does"
          className="py-10 sm:py-14 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p className="font-subheading text-sm font-semibold tracking-[0.16em] uppercase text-brand-secondary mb-3">
              {pageContent.label}
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-5 leading-tight">
              {pageContent.heading}
            </h2>
            <p className="font-body text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {pageContent.body}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              <span
                className={`font-heading ${cornerRadius.full} bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light px-3 py-1 text-xs sm:text-sm font-semibold`}
              >
                {pageContent.valuePills.honesty}
              </span>
              <span
                className={`font-heading ${cornerRadius.full} bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light px-3 py-1 text-xs sm:text-sm font-semibold`}
              >
                {pageContent.valuePills.integrity}
              </span>
              <span
                className={`font-heading ${cornerRadius.full} bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light px-3 py-1 text-xs sm:text-sm font-semibold`}
              >
                {pageContent.valuePills.professionalism}
              </span>
              <span
                className={`font-heading ${cornerRadius.full} bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-primary-light px-3 py-1 text-xs sm:text-sm font-semibold`}
              >
                {pageContent.valuePills.thoroughness}
              </span>
            </div>
          </div>
        </section>

        <section
          id="who-mh-serves"
          className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {pageContent.servesTitle}
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {pageContent.servesBody}
            </p>
            <ul className="font-body space-y-3 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {pageContent.servesItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <MaterialIcon
                    icon="groups"
                    size="md"
                    className="text-brand-primary mt-1 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="how-mh-works"
          className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5">
              {pageContent.focusTitle}
            </h2>
            <ul className="font-body space-y-3 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {pageContent.focusItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <MaterialIcon
                    icon="check_circle"
                    size="md"
                    className="text-brand-primary mt-1 shrink-0"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="company-history"
          className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {pageContent.storyTitle}
            </h2>
            <div className="font-body space-y-4 text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>{pageContent.storyP1}</p>
              <p>{pageContent.storyP2}</p>
            </div>
            <div className="mt-6">
              <Button variant="outline" size="lg" asChild>
                <Link href="/about/details">
                  <MaterialIcon icon="history" size="md" className="mr-2" />
                  {pageContent.detailsCta}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section
          id="leadership-accountability"
          className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {pageContent.leadershipTitle}
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {pageContent.leadershipBody}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/jeremy-thamert">
                  <MaterialIcon icon="person" size="md" className="mr-2" />
                  {pageContent.profileCta}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/team">
                  <MaterialIcon icon="groups" size="md" className="mr-2" />
                  {pageContent.viewTeamCta}
                </Link>
              </Button>
            </div>

            <div className="mt-6 rounded-xl border border-brand-primary/20 bg-gray-50 dark:bg-gray-800/60 p-4 sm:p-5">
              <p className="font-subheading text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase text-brand-primary mb-2">
                {leadershipSourcesCopy.label}
              </p>
              <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {leadershipSourcesCopy.sourceIntro}
              </p>
              <div className="mt-3 flex flex-col gap-2 text-sm sm:text-base font-semibold">
                <a
                  href={
                    jeremyLeadershipSources.credentialUrl ??
                    "https://secure.lni.wa.gov/verify/Detail.aspx?LIC=MHCONCI907R7"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-brand-primary hover:text-brand-primary-dark dark:text-brand-primary-light dark:hover:text-brand-primary"
                >
                  <MaterialIcon
                    icon="open_in_new"
                    size="sm"
                    className="mt-0.5"
                  />
                  <span>{leadershipSourcesCopy.source1Label}</span>
                </a>
                <a
                  href={
                    jeremyLeadershipSources.storyUrl ??
                    "https://bakercityherald.com/2010/08/18/a-soldiers-special-and-solemn-duty/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 text-brand-primary hover:text-brand-primary-dark dark:text-brand-primary-light dark:hover:text-brand-primary"
                >
                  <MaterialIcon
                    icon="open_in_new"
                    size="sm"
                    className="mt-0.5"
                  />
                  <span>{leadershipSourcesCopy.source2Label}</span>
                </a>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-white/90 p-4 sm:p-5 dark:border-gray-700 dark:bg-gray-800/70">
              <h3 className="font-heading text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
                {pageContent.sourceMapTitle}
              </h3>
              <p className="font-body text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                {pageContent.sourceMapBody}
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-brand-primary dark:text-brand-primary-light font-semibold">
                <li>
                  <Link href="/about/details" className="hover:underline">
                    {pageContent.sourceHistory}
                  </Link>
                </li>
                <li>
                  <Link href="/jeremy-thamert" className="hover:underline">
                    {pageContent.sourceLeadership}
                  </Link>
                </li>
                <li>
                  <Link href="/team" className="hover:underline">
                    {pageContent.sourceTeam}
                  </Link>
                </li>
              </ul>
            </div>

            <JeremyAuthorityLinksStrip
              className="mt-6"
              isEs={locale.startsWith("es")}
            />
          </div>
        </section>

        <section
          id="verified-safety-quality"
          className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-5">
              {pageContent.safetyTitle}
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {pageContent.safetyBody}
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/safety">
                <MaterialIcon
                  icon="workspace_premium"
                  size="md"
                  className="mr-2"
                />
                {pageContent.safetyCta}
              </Link>
            </Button>
          </div>
        </section>

        <section className="relative py-12 sm:py-14 bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-subheading text-sm font-semibold text-brand-primary dark:text-brand-primary-light tracking-widest uppercase mb-6">
              {commonT("about.accreditations.sectionTitle")}
            </p>
            <AccreditationsLogoRow />
          </div>
        </section>

        <section
          id="community-commitment"
          className="py-10 sm:py-12 border-b border-gray-200 dark:border-gray-800"
        >
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {pageContent.communityTitle}
            </h2>
            <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {pageContent.communityBody}
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/careers">
                <MaterialIcon icon="groups" size="md" className="mr-2" />
                {pageContent.communityCta}
              </Link>
            </Button>
          </div>
        </section>

        <NextStepsSection
          title={commonT("about.nextSteps.sectionTitle")}
          subtitle={commonT("about.nextSteps.sectionSubtitle")}
          description={commonT("about.nextSteps.sectionDescription")}
          locale={locale.startsWith("es") ? "es" : "en"}
        />
      </div>
    </>
  );
}
