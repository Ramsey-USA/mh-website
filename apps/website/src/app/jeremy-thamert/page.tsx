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
import { getServerLocale } from "@/lib/i18n/locale.server";

const canonicalUrl = "https://www.mhc-gc.com/jeremy-thamert";
const jeremyStamp = getIndividualBrandingStamp("jeremy-thamert");
const jeremySeoTitle = buildDualSeoTitle("team", "Jeremy Thamert Profile");
const jeremyPageSlogan = MH_SLOGANS.heroByRoute.team;
const jeremySeoDescription =
  "Jeremy Thamert is Owner & President of MH Construction in Pasco, WA. Learn how the Army veteran leads with clear communication, disciplined delivery, and relationship-first accountability across WA, OR, and ID.";

export const metadata: Metadata = withGeoMetadata({
  title: jeremySeoTitle,
  description: jeremySeoDescription,
  keywords: [
    "Jeremy Thamert",
    "Jeremy Thamert MH Construction",
    "Jeremy Thamert Owner and President",
    "Jeremy Thamert veteran construction leader",
    "MH Construction leadership",
    "MH Construction team",
    "veteran-owned construction leadership",
    "Pasco Washington construction leadership",
    "Owner and President of MH Construction",
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
  ],
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
      </main>
    </>
  );
}
