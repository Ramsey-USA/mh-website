import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageTrackingClient } from "@/components/analytics";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Button } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { IndividualBrandingStamp } from "@/components/shared-sections";
import { EnterpriseRouteHero } from "@/components/enterprise/EnterpriseRouteHero";
import { getIndividualBrandingStamp } from "@/lib/content/individual-branding-stamps";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { buildDualSeoTitle, MH_SLOGANS } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import jeremyProfile from "@/lib/data/team/jeremy-thamert.json";
import { getTranslations } from "next-intl/server";
import { getServerLocale } from "@/lib/i18n/locale.server";

const canonicalUrl = "https://www.mhc-gc.com/jeremy-thamert";
const jeremyStamp = getIndividualBrandingStamp("jeremy-thamert");
const jeremySeoName = "Jeremy Gale Thamert";
const jeremyAltNames = ["Jeremy G. Thamert", "Jeremy Thamert"];
const jeremyNameVariants = [jeremySeoName, ...jeremyAltNames];
const jeremySeoTitle = buildDualSeoTitle("team", `${jeremySeoName} Profile`);
const jeremyPageSlogan = MH_SLOGANS.heroByRoute.team;
const jeremySeoDescription = `${jeremySeoName} is Owner & President of MH Construction in Pasco, WA, leading commercial and industrial construction delivery across the Inland Northwest. Learn how independent reporting and public records support his background in Army flight-engineer service, renewable-energy entrepreneurship, and code-compliance credential identifiers.`;

type ReferenceLink = {
  label: string;
  url: string;
};

type NumberedReferenceLink = ReferenceLink & {
  id: number;
};

const credentialLinks: ReferenceLink[] = jeremyProfile.credentialLinks ?? [];
const storyLinks: ReferenceLink[] = jeremyProfile.storyLinks ?? [];
const membershipLinks: ReferenceLink[] = jeremyProfile.membershipLinks ?? [];
const referenceLinks: NumberedReferenceLink[] =
  jeremyProfile.referenceLinks ?? [];
const subjectOfReferences =
  referenceLinks.length > 0
    ? referenceLinks.map((link) => ({
        "@type": "CreativeWork",
        name: link.label,
        url: link.url,
        identifier: `Reference [${link.id}]`,
      }))
    : storyLinks.map((link) => ({
        "@type": "CreativeWork",
        name: link.label,
        url: link.url,
      }));
const sameAsLinks = Array.from(
  new Set(
    [...membershipLinks, ...credentialLinks]
      .map((link) => link.url)
      .concat(jeremyProfile.linkedinUrl ? [jeremyProfile.linkedinUrl] : []),
  ),
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
    ...jeremyNameVariants,
    ...jeremyNameVariants.map((name) => `${name} MH Construction`),
    ...jeremyNameVariants.map((name) => `${name} Owner and President`),
    ...jeremyNameVariants.map((name) => `${name} veteran construction leader`),
    ...jeremyNameVariants.map((name) => `${name} verified leadership profile`),
    ...jeremyNameVariants.map(
      (name) => `${name} Washington L&I contractor record`,
    ),
    "Jeremy Gale Thamert leadership profile",
    "Jeremy G Thamert leadership profile",
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
    description: `${jeremyPageSlogan} ${jeremySeoName} leads MH Construction with disciplined planning, direct communication, and accountable delivery from Pasco, WA.`,
    url: canonicalUrl,
    images: [
      {
        url: jeremyProfile.avatar,
        width: 1200,
        height: 630,
        alt: `${jeremySeoName}, Owner and President at MH Construction`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: jeremySeoTitle,
    description: `${jeremyPageSlogan} Army veteran ${jeremySeoName} leads MH Construction with relationship-first standards in WA, OR, and ID.`,
    images: [jeremyProfile.avatar],
  },
});

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${canonicalUrl}#person`,
  name: jeremySeoName,
  alternateName: jeremyNameVariants,
  identifier: [
    {
      "@type": "PropertyValue",
      propertyID: "full-name",
      value: jeremySeoName,
    },
    {
      "@type": "PropertyValue",
      propertyID: "name-variant",
      value: "Jeremy G Thamert",
    },
  ],
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
    "Commercial and Industrial Construction Delivery",
    "Construction Operations",
    "Project Delivery",
    "Safety Culture",
    "Relationship-First Client Service",
    "Veteran-Owned Business Leadership",
    "Military Aviation Operations",
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
  subjectOf: subjectOfReferences,
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${canonicalUrl}#profile`,
  url: canonicalUrl,
  name: `${jeremySeoName} | Owner & President | MH Construction`,
  description: `Leadership profile for ${jeremySeoName}, Owner & President of MH Construction.`,
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
      name: jeremySeoName,
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
        pageName={isEs ? "Perfil Jeremy Gale Thamert" : jeremySeoName}
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

      <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <EnterpriseRouteHero
          eyebrow={isEs ? "Perfil de liderazgo" : "Leadership Profile"}
          title={jeremySeoName}
          intro={jeremyProfile.bio}
          primarySlogan={COMPANY_INFO.slogan.primary}
          supportingSlogan={jeremyPageSlogan}
          primary={{
            href: "/contact#project-inquiry-form",
            label: isEs
              ? "Contactar al equipo de Jeremy"
              : "Contact Jeremy's Team",
          }}
          secondary={{
            href: "#verified-sources",
            label: verifiedSourceCopy.heroButton,
          }}
          proof={[
            ["51%", isEs ? "Propiedad veterana" : "Veteran ownership"],
            ["U.S. Army", isEs ? "Liderazgo veterano" : "Veteran leadership"],
            ["WA · OR · ID", isEs ? "Región de entrega" : "Delivery region"],
          ]}
        />

        <section
          className="border-b border-brand-primary/20 bg-white py-10 dark:bg-gray-950 sm:py-14"
          aria-labelledby="leadership-record-heading"
        >
          <div className="enterprise-shell grid items-start gap-8 lg:grid-cols-[22rem_1fr] lg:gap-12">
            <div className="border border-brand-secondary/50 bg-gray-100 dark:bg-gray-900">
              <Image
                src={jeremyProfile.avatar}
                alt={`${jeremySeoName}, Owner and President at MH Construction`}
                width={800}
                height={1000}
                className="h-auto w-full object-cover"
                priority
              />
            </div>
            <div className="border-l-4 border-brand-secondary pl-6">
              <p className="enterprise-kicker">
                {isEs ? "Registro ejecutivo" : "Executive Record"}
              </p>
              <h2
                id="leadership-record-heading"
                className="mt-3 text-3xl font-black text-gray-900 dark:text-white"
              >
                {isEs
                  ? "Responsabilidad visible. Ejecución disciplinada."
                  : "Visible Accountability. Disciplined Execution."}
              </h2>
              <p className="mt-3 text-lg font-semibold text-brand-primary">
                {isEs
                  ? "Propietario y Presidente, MH Construction"
                  : "Owner & President, MH Construction"}
              </p>
              {jeremyStamp ? (
                <div className="mt-5">
                  <IndividualBrandingStamp stamp={jeremyStamp} />
                </div>
              ) : null}
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-200">
                Veteran-owned since {COMPANY_INFO.details.veteranOwnedSince} in
                Pasco, Washington, this record documents {jeremySeoName}
                &apos;s responsibility for clear communication, controlled
                execution, and durable client trust across Washington, Oregon,
                and Idaho.
              </p>
              <dl className="mt-6 grid gap-4 border-t border-gray-200 pt-6 sm:grid-cols-3 dark:border-gray-800">
                <div>
                  <dt className="text-xs font-bold tracking-widest text-brand-primary uppercase">
                    {isEs ? "Servicio" : "Service"}
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900 dark:text-white">
                    {jeremyProfile.veteranStatus}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold tracking-widest text-brand-primary uppercase">
                    {isEs ? "Base" : "Home Base"}
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900 dark:text-white">
                    {jeremyProfile.hometown}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold tracking-widest text-brand-primary uppercase">
                    {isEs ? "Formación" : "Education"}
                  </dt>
                  <dd className="mt-1 font-semibold text-gray-900 dark:text-white">
                    {jeremyProfile.education}
                  </dd>
                </div>
              </dl>
              <div className="mt-7">
                <Button asChild variant="outline" size="lg">
                  <Link href="/team">
                    <MaterialIcon icon="groups" size="sm" className="mr-2" />
                    {isEs
                      ? "Ver el equipo de liderazgo"
                      : "View Full Leadership Team"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Team", href: "/team" },
            { label: jeremySeoName },
          ]}
        />

        <section className="py-12 sm:py-16">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
            <div className="rounded-none border border-brand-primary/15 bg-white p-6 shadow-sm dark:bg-gray-900">
              <p className="font-subheading text-sm font-semibold tracking-wide text-brand-primary uppercase">
                Years Experience
              </p>
              <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                {jeremyProfile.careerStats.yearsExperience}+
              </p>
            </div>
            <div className="rounded-none border border-brand-primary/15 bg-white p-6 shadow-sm dark:bg-gray-900">
              <p className="font-subheading text-sm font-semibold tracking-wide text-brand-primary uppercase">
                Total Projects
              </p>
              <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                {jeremyProfile.careerStats.totalProjects}+
              </p>
            </div>
            <div className="rounded-none border border-brand-primary/15 bg-white p-6 shadow-sm dark:bg-gray-900">
              <p className="font-subheading text-sm font-semibold tracking-wide text-brand-primary uppercase">
                Client Satisfaction
              </p>
              <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
                {jeremyProfile.currentYearStats.clientSatisfaction}%
              </p>
            </div>
            <div className="rounded-none border border-brand-primary/15 bg-white p-6 shadow-sm dark:bg-gray-900">
              <p className="font-subheading text-sm font-semibold tracking-wide text-brand-primary uppercase">
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
              <article className="rounded-none border border-brand-primary/15 bg-white p-7 shadow-sm dark:bg-gray-900 sm:p-9">
                <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                  Leadership Focus
                </h2>
                <p className="font-body mt-4 text-base leading-relaxed text-gray-700 dark:text-gray-200">
                  {jeremySeoName} leads MH Construction with a
                  relationship-first model that keeps project teams aligned from
                  kickoff through closeout. His role is to maintain clear owner
                  communication, enforce safety and quality standards, and keep
                  commitments measurable throughout delivery.
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

              <aside className="rounded-none border border-brand-secondary/20 bg-brand-secondary/10 p-7 shadow-sm dark:bg-gray-900 sm:p-9">
                <h2 className="text-xl font-black text-gray-900 dark:text-white sm:text-2xl">
                  Related MH Construction Resources
                </h2>
                <div className="mt-5 space-y-3">
                  <Link
                    className="block rounded-none border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                    href="/about"
                  >
                    About MH Construction
                  </Link>
                  <Link
                    className="block rounded-none border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                    href="/veterans"
                  >
                    Veteran-Owned Commitment
                  </Link>
                  <Link
                    className="block rounded-none border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
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
            <div className="rounded-none border border-brand-primary/20 bg-white p-7 shadow-sm dark:bg-gray-900 sm:p-9">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {timelineCopy.sectionTitle}
              </h2>
              <p className="font-body mt-4 max-w-4xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                {timelineCopy.sectionBody}
              </p>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                <article className="rounded-none border border-brand-primary/15 bg-brand-primary/5 p-5 dark:bg-brand-primary/10">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white sm:text-lg">
                    {timelineCopy.serviceTitle}
                  </h3>
                  <p className="font-body mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {timelineCopy.serviceBody}
                  </p>
                  <div className="mt-4 space-y-2">
                    {lniRecordLink ? (
                      <a
                        href={lniRecordLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-none border border-brand-primary/20 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-primary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
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
                        className="inline-flex w-full items-center justify-between gap-2 rounded-none border border-brand-primary/20 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-primary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
                      >
                        <span>{armyStoryLink.label}</span>
                        <MaterialIcon icon="open_in_new" size="sm" />
                      </a>
                    ) : null}
                  </div>
                </article>

                <article className="rounded-none border border-brand-secondary/20 bg-brand-secondary/5 p-5 dark:bg-brand-secondary/10">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white sm:text-lg">
                    {timelineCopy.businessTitle}
                  </h3>
                  <p className="font-body mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {timelineCopy.businessBody}
                  </p>
                  <div className="mt-4 space-y-2">
                    {renewableStoryLink ? (
                      <a
                        href={renewableStoryLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-none border border-brand-secondary/25 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-secondary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
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
                        className="inline-flex w-full items-center justify-between gap-2 rounded-none border border-brand-secondary/25 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-secondary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
                      >
                        <span>{communityEventLink.label}</span>
                        <MaterialIcon icon="open_in_new" size="sm" />
                      </a>
                    ) : null}
                  </div>
                </article>

                <article className="rounded-none border border-brand-primary/15 bg-gray-50 p-5 dark:bg-gray-800/60">
                  <h3 className="text-base font-extrabold text-gray-900 dark:text-white sm:text-lg">
                    {timelineCopy.membershipTitle}
                  </h3>
                  <p className="font-body mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
                    {timelineCopy.membershipBody}
                  </p>
                  <div className="mt-4 space-y-2">
                    {chamberMembershipLink ? (
                      <a
                        href={chamberMembershipLink.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-between gap-2 rounded-none border border-brand-primary/20 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-primary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
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
                        className="inline-flex w-full items-center justify-between gap-2 rounded-none border border-brand-primary/20 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-brand-primary/10 dark:bg-gray-900 dark:text-gray-100 sm:text-sm"
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
            <div className="rounded-none border border-brand-secondary/20 bg-gray-50 p-7 shadow-sm dark:bg-gray-900 sm:p-9">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white sm:text-3xl">
                {internalLinksCopy.sectionTitle}
              </h2>
              <p className="font-body mt-4 max-w-4xl text-sm leading-relaxed text-gray-700 dark:text-gray-200 sm:text-base">
                {internalLinksCopy.sectionBody}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Link
                  href="/services"
                  className="flex items-center justify-between rounded-none border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                >
                  <span>{internalLinksCopy.services}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center justify-between rounded-none border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                >
                  <span>{internalLinksCopy.projects}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href="/veterans"
                  className="flex items-center justify-between rounded-none border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                >
                  <span>{internalLinksCopy.veterans}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href="/about"
                  className="flex items-center justify-between rounded-none border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100"
                >
                  <span>{internalLinksCopy.about}</span>
                  <MaterialIcon icon="arrow_forward" size="sm" />
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center justify-between rounded-none border border-brand-primary/20 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100 sm:col-span-2 lg:col-span-1"
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
            <div className="rounded-none border border-brand-primary/20 bg-white p-7 shadow-sm dark:bg-gray-900 sm:p-9">
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
                    className="rounded-none border border-brand-primary/15 bg-gray-50 p-4 dark:bg-gray-800/60"
                  >
                    <h3 className="text-sm font-extrabold text-gray-900 dark:text-white sm:text-base">
                      {entry.question}
                    </h3>
                    <p className="font-body mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-200">
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
            <div className="rounded-none border border-brand-primary/20 bg-white p-7 shadow-sm dark:bg-gray-900 sm:p-9">
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
                          className="flex items-start justify-between gap-3 rounded-none border border-brand-primary/15 bg-brand-primary/5 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/10 dark:bg-brand-primary/10 dark:text-gray-100 dark:hover:bg-brand-primary/20"
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
                          className="flex items-start justify-between gap-3 rounded-none border border-brand-secondary/20 bg-brand-secondary/5 px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-secondary/10 dark:bg-brand-secondary/10 dark:text-gray-100 dark:hover:bg-brand-secondary/20"
                        >
                          <span>{link.label}</span>
                          <MaterialIcon icon="open_in_new" size="sm" />
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-none border border-brand-primary/20 bg-gray-50 p-4 dark:bg-gray-800/50">
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

              {referenceLinks.length > 0 ? (
                <article className="mt-8 rounded-none border border-brand-primary/20 bg-gray-50 p-5 dark:bg-gray-800/50 sm:p-6">
                  <h3 className="text-lg font-extrabold text-gray-900 dark:text-white sm:text-xl">
                    {isEs
                      ? "Mapa de Referencias (DOCX)"
                      : "Biography Reference Map (DOCX)"}
                  </h3>
                  <p className="font-body mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                    {isEs
                      ? "Las referencias numeradas se muestran en el mismo orden del paquete de biografia fuente."
                      : "Numbered references are listed in the same order as the source biography package."}
                  </p>
                  <ol className="mt-4 space-y-3">
                    {referenceLinks.map((link) => (
                      <li key={`${link.id}-${link.url}`}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start justify-between gap-3 rounded-none border border-brand-primary/15 bg-white px-4 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-brand-primary/5 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-brand-primary/15"
                        >
                          <span className="flex min-w-0 items-start gap-2">
                            <span className="mt-0.5 shrink-0 font-black text-brand-primary">
                              [{link.id}]
                            </span>
                            <span>{link.label}</span>
                          </span>
                          <MaterialIcon icon="open_in_new" size="sm" />
                        </a>
                      </li>
                    ))}
                  </ol>
                </article>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
