import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageTrackingClient } from "@/components/analytics";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { IndividualBrandingStamp } from "@/components/shared-sections";
import { getIndividualBrandingStamp } from "@/lib/content/individual-branding-stamps";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { buildDualSeoTitle, MH_SLOGANS } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import jeremyProfile from "@/lib/data/team/jeremy-thamert.json";
import { getTranslations } from "next-intl/server";
import { getServerLocale } from "@/lib/i18n/locale.server";

const canonicalUrl = "https://www.mhc-gc.com/jeremy-thamert";
const jeremyStamp = getIndividualBrandingStamp("jeremy-thamert");
const jeremySeoTitle = buildDualSeoTitle("team", "Jeremy Thamert Profile");
const jeremyPageSlogan = MH_SLOGANS.heroByRoute.team;
const jeremySeoDescription =
  "Jeremy Thamert is Owner & President of MH Construction in Pasco, WA. Learn how the Army veteran leads with clear communication, disciplined delivery, and relationship-first accountability across WA, OR, and ID, with verified public records, credential references, and independent stories.";

type ReferenceLink = {
  label: string;
  url: string;
};

const credentialLinks: ReferenceLink[] = jeremyProfile.credentialLinks ?? [];
const storyLinks: ReferenceLink[] = jeremyProfile.storyLinks ?? [];
const membershipLinks: ReferenceLink[] = jeremyProfile.membershipLinks ?? [];
const sameAsLinks = Array.from(
  new Set([...membershipLinks, ...credentialLinks].map((link) => link.url)),
);

function findReferenceLink(
  links: ReferenceLink[],
  query: string,
): ReferenceLink | null {
  const normalizedQuery = query.toLowerCase();
  return (
    links.find((link) => link.label.toLowerCase().includes(normalizedQuery)) ??
    null
  );
}

export const metadata: Metadata = withGeoMetadata({
  title: jeremySeoTitle,
  description: jeremySeoDescription,
  keywords: [
    "Jeremy Thamert",
    "Jeremy Gale Thamert",
    "Jeremy Thamert MH Construction",
    "Jeremy Thamert Owner and President",
    "Jeremy Thamert veteran construction leader",
    "Jeremy Thamert verified leadership profile",
    "Jeremy Thamert Washington L&I contractor record",
    "MH Construction leadership",
    "MH Construction team",
    "veteran-owned construction leadership",
    "Pasco Washington construction leadership",
    "Owner and President of MH Construction",
    "Washington L&I contractor record MH Construction",
    "Oregon inspector certification records",
    "Tri-City Regional Chamber MH Construction",
    "Our Team leadership profile",
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: jeremySeoTitle,
    description: `${jeremyPageSlogan} Jeremy Thamert leads MH Construction with disciplined planning, direct communication, and accountable delivery from Pasco, WA.`,
    url: canonicalUrl,
    images: [
      {
        url: jeremyProfile.avatar,
        width: 1200,
        height: 630,
        alt: "Jeremy Thamert, Owner and President at MH Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: jeremySeoTitle,
    description: `${jeremyPageSlogan} Army veteran Jeremy Thamert leads MH Construction with relationship-first standards in WA, OR, and ID.`,
    images: [jeremyProfile.avatar],
  },
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${canonicalUrl}#person`,
  name: "Jeremy Thamert",
  alternateName: "Jeremy Gale Thamert",
  jobTitle: "Owner & President",
  description: jeremyProfile.bio,
  image: `https://www.mhc-gc.com${jeremyProfile.avatar}`,
  url: canonicalUrl,
  email: jeremyProfile.email,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": canonicalUrl,
  },
  worksFor: {
    "@type": "Organization",
    "@id": "https://www.mhc-gc.com/#organization",
    name: "MH Construction",
  },
  alumniOf: {
    "@type": "Organization",
    name: "U.S. Army Aviation",
  },
  knowsAbout: [
    "Construction Operations",
    "Project Delivery",
    "Safety Culture",
    "Relationship-First Client Service",
    "Veteran-Owned Business Leadership",
    "Code Compliance",
    "Plans Examination",
    "Renewable Energy Coordination",
  ],
  sameAs: sameAsLinks,
  hasCredential: credentialLinks.map((link) => ({
    "@type": "EducationalOccupationalCredential",
    name: link.label,
    url: link.url,
  })),
  memberOf: membershipLinks.map((link) => ({
    "@type": "Organization",
    name: link.label,
    url: link.url,
  })),
  subjectOf: storyLinks.map((link) => ({
    "@type": "CreativeWork",
    name: link.label,
    url: link.url,
  })),
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${canonicalUrl}#profile`,
  url: canonicalUrl,
  name: "Jeremy Thamert | Owner & President | MH Construction",
  description:
    "Leadership profile for Jeremy Thamert, Owner & President of MH Construction.",
  mainEntity: {
    "@id": `${canonicalUrl}#person`,
  },
  isPartOf: {
    "@id": "https://www.mhc-gc.com/#website",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.mhc-gc.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Team",
      item: "https://www.mhc-gc.com/team",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Jeremy Thamert",
      item: canonicalUrl,
    },
  ],
};

export default async function JeremyThamertPage() {
  const isEs = (await getServerLocale()) === "es";
  const t = await getTranslations("jeremyProfile.verifiedSources");
  const tTimeline = await getTranslations("jeremyProfile.timeline");
  const tInternalLinks = await getTranslations("jeremyProfile.internalLinks");
  const tFaq = await getTranslations("jeremyProfile.faq");
  const verifiedSourceCopy = {
    heroButton: t("heroButton"),
    sectionTitle: t("sectionTitle"),
    sectionBody: t("sectionBody"),
    credentialsHeading: t("credentialsHeading"),
    storiesHeading: t("storiesHeading"),
    connectBody: t("connectBody"),
    connectCta: t("connectCta"),
  };
  const timelineCopy = {
    sectionTitle: tTimeline("sectionTitle"),
    sectionBody: tTimeline("sectionBody"),
    serviceTitle: tTimeline("serviceTitle"),
    serviceBody: tTimeline("serviceBody"),
    businessTitle: tTimeline("businessTitle"),
    businessBody: tTimeline("businessBody"),
    membershipTitle: tTimeline("membershipTitle"),
    membershipBody: tTimeline("membershipBody"),
  };
  const internalLinksCopy = {
    sectionTitle: tInternalLinks("sectionTitle"),
    sectionBody: tInternalLinks("sectionBody"),
    services: tInternalLinks("services"),
    projects: tInternalLinks("projects"),
    veterans: tInternalLinks("veterans"),
    about: tInternalLinks("about"),
    contact: tInternalLinks("contact"),
  };
  const faqCopy = {
    sectionTitle: tFaq("sectionTitle"),
    sectionBody: tFaq("sectionBody"),
  };
  const faqEntries = [
    { question: tFaq("q1"), answer: tFaq("a1") },
    { question: tFaq("q2"), answer: tFaq("a2") },
    { question: tFaq("q3"), answer: tFaq("a3") },
    { question: tFaq("q4"), answer: tFaq("a4") },
    { question: tFaq("q5"), answer: tFaq("a5") },
    { question: tFaq("q6"), answer: tFaq("a6") },
    { question: tFaq("q7"), answer: tFaq("a7") },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${canonicalUrl}#faq`,
    mainEntity: faqEntries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };

  const lniRecordLink =
    findReferenceLink(credentialLinks, "l&i") ?? credentialLinks[0] ?? null;
  const armyStoryLink =
    findReferenceLink(storyLinks, "soldier") ?? storyLinks[0] ?? null;
  const renewableStoryLink =
    findReferenceLink(storyLinks, "windy") ?? storyLinks[1] ?? null;
  const chamberMembershipLink =
    findReferenceLink(membershipLinks, "chamber") ?? membershipLinks[0] ?? null;
  const agcMembershipLink =
    findReferenceLink(membershipLinks, "agc") ?? membershipLinks[1] ?? null;
  const communityEventLink =
    findReferenceLink(storyLinks, "cool desert") ?? storyLinks[2] ?? null;

  return (
    <>
      <PageTrackingClient
        pageName={isEs ? "Perfil Jeremy Thamert" : "Jeremy Thamert"}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            personSchema,
            profilePageSchema,
            breadcrumbSchema,
            faqSchema,
          ]),
        }}
      />

      <main className="min-h-screen bg-linear-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <section className="relative overflow-hidden border-b border-brand-primary/15 bg-linear-to-br from-brand-primary/10 via-white to-brand-secondary/10 py-12 sm:py-16 dark:from-brand-primary/20 dark:via-gray-900 dark:to-brand-secondary/20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:px-8">
            <div>
              <p className="font-heading mb-3 text-sm font-semibold tracking-[0.2em] text-brand-primary uppercase">
                {isEs ? "Perfil de Liderazgo" : "Leadership Profile"}
              </p>
              <h1 className="text-3xl font-black leading-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
                Jeremy Thamert
              </h1>
              {jeremyStamp ? (
                <div className="mt-3">
                  <IndividualBrandingStamp stamp={jeremyStamp} />
                </div>
              ) : null}
              <p className="mt-2 text-lg font-semibold text-brand-secondary sm:text-xl">
                {isEs
                  ? "Propietario y Presidente, MH Construction"
                  : "Owner & President, MH Construction"}
              </p>
              <p className="font-heading mt-4 max-w-3xl text-sm font-semibold tracking-wide text-brand-primary uppercase sm:text-base">
                {COMPANY_INFO.slogan.primary}
              </p>
              <p className="font-heading mt-2 max-w-3xl text-sm font-semibold tracking-wide text-brand-secondary uppercase sm:text-base">
                {jeremyPageSlogan}
              </p>
              <p className="font-body mt-5 max-w-3xl text-base leading-relaxed text-gray-700 sm:text-lg dark:text-gray-200">
                {jeremyProfile.bio}
              </p>
              <p className="font-body mt-5 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Veteran-owned since {COMPANY_INFO.details.veteranOwnedSince} in
                Pasco, WA, this leadership profile documents Jeremy&apos;s role
                in maintaining clear communication, disciplined execution, and
                long-term client trust across Washington, Oregon, and Idaho.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="secondary" size="lg">
                  <Link href="/contact">
                    <MaterialIcon icon="phone" size="sm" className="mr-2" />
                    {isEs
                      ? "Contactar al Equipo de Jeremy"
                      : "Contact Jeremy&apos;s Team"}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/team">
                    <MaterialIcon icon="groups" size="sm" className="mr-2" />
                    View Full Leadership Team
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#verified-sources">
                    <MaterialIcon icon="verified" size="sm" className="mr-2" />
                    {verifiedSourceCopy.heroButton}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#jeremy-faq">
                    <MaterialIcon icon="quiz" size="sm" className="mr-2" />
                    {isEs ? "FAQ de Jeremy" : "Jeremy FAQ"}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="overflow-hidden rounded-2xl border border-brand-secondary/40 bg-white shadow-2xl dark:bg-gray-900">
                <Image
                  src={jeremyProfile.avatar}
                  alt="Jeremy Thamert, Owner and President at MH Construction"
                  width={800}
                  height={1000}
                  className="h-auto w-full object-cover"
                  priority
                />
                <div className="space-y-2 p-5">
                  <p className="font-heading text-sm font-semibold tracking-widest text-brand-primary uppercase">
                    {jeremyProfile.veteranStatus}
                  </p>
                  <p className="text-base font-semibold text-gray-800 dark:text-gray-100">
                    {jeremyProfile.hometown}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {jeremyProfile.education}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Team", href: "/team" },
            { label: "Jeremy Thamert" },
          ]}
        />

        <section className="py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-brand-primary/15 bg-white p-6 shadow-sm dark:bg-gray-900">
              <p className="font-heading text-sm font-semibold tracking-wide text-brand-primary uppercase">
                Years Experience
              </p>
              <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                {jeremyProfile.careerStats.yearsExperience}+
              </p>
            </div>
            <div className="rounded-xl border border-brand-primary/15 bg-white p-6 shadow-sm dark:bg-gray-900">
              <p className="font-heading text-sm font-semibold tracking-wide text-brand-primary uppercase">
                Total Projects
              </p>
              <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                {jeremyProfile.careerStats.totalProjects}+
              </p>
            </div>
            <div className="rounded-xl border border-brand-primary/15 bg-white p-6 shadow-sm dark:bg-gray-900">
              <p className="font-heading text-sm font-semibold tracking-wide text-brand-primary uppercase">
                Client Satisfaction
              </p>
              <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                {jeremyProfile.currentYearStats.clientSatisfaction}%
              </p>
            </div>
            <div className="rounded-xl border border-brand-primary/15 bg-white p-6 shadow-sm dark:bg-gray-900">
              <p className="font-heading text-sm font-semibold tracking-wide text-brand-primary uppercase">
                Safety Record
              </p>
              <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                {jeremyProfile.currentYearStats.safetyRecord}
              </p>
            </div>
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              <article className="rounded-2xl border border-brand-primary/15 bg-white p-7 shadow-sm dark:bg-gray-900 sm:p-9">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                  Leadership Focus
                </h2>
                <p className="font-body mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-200">
                  Jeremy Thamert leads MH Construction with a relationship-first
                  model that keeps project teams aligned from kickoff through
                  closeout. His role is to maintain clear owner communication,
                  enforce safety and quality standards, and keep commitments
                  measurable throughout delivery.
                </p>
                <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-200">
                  {jeremyProfile.careerHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="mt-1 text-brand-primary"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <aside className="rounded-2xl border border-brand-secondary/20 bg-linear-to-br from-brand-secondary/10 to-white p-7 shadow-sm dark:from-brand-secondary/20 dark:to-gray-900 sm:p-9">
                <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                  Related MH Construction Resources
                </h2>
                <div className="mt-5 space-y-3">
                  <Link
                    className="block rounded-lg border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                    href="/about"
                  >
                    About MH Construction
                  </Link>
                  <Link
                    className="block rounded-lg border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                    href="/veterans"
                  >
                    Veteran-Owned Commitment
                  </Link>
                  <Link
                    className="block rounded-lg border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                    href="/public-sector"
                  >
                    Public-Sector Delivery
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-brand-primary/20 bg-white p-7 shadow-sm dark:bg-gray-900 sm:p-9">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {timelineCopy.sectionTitle}
              </h2>
              <p className="font-body mt-4 max-w-4xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                {timelineCopy.sectionBody}
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <article className="rounded-xl border border-brand-primary/15 bg-brand-primary/5 p-5 dark:bg-brand-primary/10">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white sm:text-lg">
                    {timelineCopy.serviceTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {timelineCopy.serviceBody}
                  </p>
                  <div className="mt-4 space-y-2">
                    {lniRecordLink ? (
                      <a
                        href={lniRecordLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-brand-primary/20 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-primary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
                      >
                        <span>{lniRecordLink.label}</span>
                        <MaterialIcon icon="open_in_new" size="sm" />
                      </a>
                    ) : null}
                    {armyStoryLink ? (
                      <a
                        href={armyStoryLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-brand-primary/20 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-primary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
                      >
                        <span>{armyStoryLink.label}</span>
                        <MaterialIcon icon="open_in_new" size="sm" />
                      </a>
                    ) : null}
                  </div>
                </article>

                <article className="rounded-xl border border-brand-secondary/20 bg-brand-secondary/5 p-5 dark:bg-brand-secondary/10">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white sm:text-lg">
                    {timelineCopy.businessTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {timelineCopy.businessBody}
                  </p>
                  <div className="mt-4 space-y-2">
                    {renewableStoryLink ? (
                      <a
                        href={renewableStoryLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-brand-secondary/25 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-secondary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
                      >
                        <span>{renewableStoryLink.label}</span>
                        <MaterialIcon icon="open_in_new" size="sm" />
                      </a>
                    ) : null}
                    {communityEventLink ? (
                      <a
                        href={communityEventLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-brand-secondary/25 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-secondary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
                      >
                        <span>{communityEventLink.label}</span>
                        <MaterialIcon icon="open_in_new" size="sm" />
                      </a>
                    ) : null}
                  </div>
                </article>

                <article className="rounded-xl border border-brand-primary/15 bg-gray-50 p-5 dark:bg-gray-800/60">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white sm:text-lg">
                    {timelineCopy.membershipTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {timelineCopy.membershipBody}
                  </p>
                  <div className="mt-4 space-y-2">
                    {chamberMembershipLink ? (
                      <a
                        href={chamberMembershipLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-brand-primary/20 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-primary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
                      >
                        <span>{chamberMembershipLink.label}</span>
                        <MaterialIcon icon="open_in_new" size="sm" />
                      </a>
                    ) : null}
                    {agcMembershipLink ? (
                      <a
                        href={agcMembershipLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-lg border border-brand-primary/20 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-primary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
                      >
                        <span>{agcMembershipLink.label}</span>
                        <MaterialIcon icon="open_in_new" size="sm" />
                      </a>
                    ) : null}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-14 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-brand-secondary/20 bg-linear-to-r from-brand-secondary/8 to-brand-primary/8 p-7 shadow-sm dark:from-brand-secondary/15 dark:to-brand-primary/15 sm:p-9">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {internalLinksCopy.sectionTitle}
              </h2>
              <p className="font-body mt-4 max-w-4xl text-sm leading-relaxed text-gray-700 dark:text-gray-200 sm:text-base">
                {internalLinksCopy.sectionBody}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/services"
                  className="flex items-center justify-between rounded-lg border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                >
                  <span>{internalLinksCopy.services}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center justify-between rounded-lg border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                >
                  <span>{internalLinksCopy.projects}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href="/veterans"
                  className="flex items-center justify-between rounded-lg border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                >
                  <span>{internalLinksCopy.veterans}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-between rounded-lg border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                >
                  <span>{internalLinksCopy.about}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between rounded-lg border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100 sm:col-span-2 lg:col-span-1"
                >
                  <span>{internalLinksCopy.contact}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="jeremy-faq" className="pb-14 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-brand-primary/20 bg-white p-7 shadow-sm dark:bg-gray-900 sm:p-9">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {faqCopy.sectionTitle}
              </h2>
              <p className="font-body mt-4 max-w-4xl text-sm leading-relaxed text-gray-700 dark:text-gray-200 sm:text-base">
                {faqCopy.sectionBody}
              </p>

              <div className="mt-6 space-y-3">
                {faqEntries.map((entry) => (
                  <article
                    key={entry.question}
                    className="rounded-lg border border-brand-primary/15 bg-gray-50 p-4 dark:bg-gray-800/60"
                  >
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white sm:text-base">
                      {entry.question}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                      {entry.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="verified-sources" className="pb-16 sm:pb-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-brand-primary/20 bg-white p-7 shadow-sm dark:bg-gray-900 sm:p-9">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {verifiedSourceCopy.sectionTitle}
              </h2>
              <p className="font-body mt-4 max-w-4xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                {verifiedSourceCopy.sectionBody}
              </p>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <article>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {verifiedSourceCopy.credentialsHeading}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {[...credentialLinks, ...membershipLinks].map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start justify-between gap-3 rounded-lg border border-brand-primary/15 bg-brand-primary/5 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/10 dark:bg-brand-primary/10 dark:text-gray-100 dark:hover:bg-brand-primary/20"
                        >
                          <span>{link.label}</span>
                          <MaterialIcon icon="open_in_new" size="sm" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </article>

                <article>
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
                    {verifiedSourceCopy.storiesHeading}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {storyLinks.map((link) => (
                      <li key={link.url}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start justify-between gap-3 rounded-lg border border-brand-secondary/20 bg-brand-secondary/5 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-secondary/10 dark:bg-brand-secondary/10 dark:text-gray-100 dark:hover:bg-brand-secondary/20"
                        >
                          <span>{link.label}</span>
                          <MaterialIcon icon="open_in_new" size="sm" />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl border border-brand-primary/20 bg-gray-50 p-4 dark:bg-gray-800/50">
                    <p className="text-sm text-gray-700 dark:text-gray-200">
                      {verifiedSourceCopy.connectBody}
                    </p>
                    <div className="mt-4">
                      <Button asChild variant="secondary" size="lg">
                        <Link href="/contact">
                          <MaterialIcon
                            icon="support_agent"
                            size="sm"
                            className="mr-2"
                          />
                          {verifiedSourceCopy.connectCta}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
