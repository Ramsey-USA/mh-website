import Link from "next/link";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { BrandedContentSection } from "@/components/templates";
import { NextStepsSection } from "@/components/shared-sections";
import type { ServiceRecord } from "@/lib/data/service-routes";

type RelatedServiceLink = {
  slug: string;
  title: string;
};

function toProjectHref(reference: string): string | null {
  if (!reference.startsWith("projects/")) {
    return null;
  }

  const slug = reference.replace("projects/", "").trim();
  if (!slug) {
    return null;
  }

  return `/projects/${slug}`;
}

export function ServiceDetailPageContent({
  service,
  relatedServices,
}: Readonly<{
  service: ServiceRecord;
  relatedServices: RelatedServiceLink[];
}>) {
  const proofProjectLinks = service.proofReferences
    .map((reference) => toProjectHref(reference))
    .filter((href): href is string => Boolean(href));
  const showPublicSectorLink =
    service.ctaHref === "/public-sector" ||
    service.slug === "municipal-public-work";

  return (
    <main className="bg-white dark:bg-gray-900">
      <section className="hero-safe-top bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 px-4 pb-14 pt-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
            Services -&gt; Detail
          </p>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            {service.title}
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-white/90 sm:text-lg">
            {service.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-xl bg-brand-secondary px-5 py-3 text-sm font-bold text-gray-900 shadow hover:bg-brand-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
            >
              Back to Services Hub
            </Link>
            <Link
              href={service.ctaHref}
              className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              {service.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.title },
        ]}
      />

      <BrandedContentSection
        id="service-overview"
        header={{
          icon: "description",
          iconVariant: "primary",
          subtitle: service.category,
          title: "Service Overview",
          description: service.overview,
        }}
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-gray-200/90 bg-white/95 p-5 shadow-md dark:border-gray-700 dark:bg-gray-800/95">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Suitable Project Types
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {service.supportedProjectTypes.map((projectType) => (
                <li key={projectType}>- {projectType}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-gray-200/90 bg-white/95 p-5 shadow-md dark:border-gray-700 dark:bg-gray-800/95">
            <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
              Capability and Process
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {service.processStatements.map((statement) => (
                <li key={statement}>- {statement}</li>
              ))}
            </ul>
          </article>
        </div>
      </BrandedContentSection>

      <BrandedContentSection
        id="service-proof"
        variant="gray"
        header={{
          icon: "verified",
          iconVariant: "secondary",
          subtitle: "Verified Proof",
          title: "Related Public Proof",
          description:
            "These links are derived from approved proof references in the canonical service record.",
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {proofProjectLinks.length > 0 ? (
            proofProjectLinks.map((href) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-gray-200/90 bg-white/95 p-4 text-sm font-semibold text-brand-primary shadow-sm hover:underline dark:border-gray-700 dark:bg-gray-800/95 dark:text-brand-primary-light"
              >
                Review related project case study
              </Link>
            ))
          ) : (
            <p className="rounded-2xl border border-gray-200/90 bg-white/95 p-4 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-800/95 dark:text-gray-300">
              Additional proof references are maintained in controlled records.
            </p>
          )}
        </div>
      </BrandedContentSection>

      <BrandedContentSection
        id="service-area-context"
        header={{
          icon: "map",
          iconVariant: "primary",
          subtitle: "Service Area Context",
          title: "Where This Service Is Delivered",
          description:
            "MH Construction delivers this service through Tri-Cities-led operations across Washington, Oregon, and Idaho.",
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Link
            href="/locations"
            className="rounded-2xl border border-gray-200/90 bg-white/95 p-4 text-sm font-semibold text-brand-primary shadow-sm hover:underline dark:border-gray-700 dark:bg-gray-800/95 dark:text-brand-primary-light"
          >
            View all service locations
          </Link>
          <Link
            href="/contact"
            className="rounded-2xl border border-gray-200/90 bg-white/95 p-4 text-sm font-semibold text-brand-primary shadow-sm hover:underline dark:border-gray-700 dark:bg-gray-800/95 dark:text-brand-primary-light"
          >
            Start a project conversation
          </Link>
          {showPublicSectorLink ? (
            <Link
              href="/public-sector"
              className="rounded-2xl border border-gray-200/90 bg-white/95 p-4 text-sm font-semibold text-brand-primary shadow-sm hover:underline dark:border-gray-700 dark:bg-gray-800/95 dark:text-brand-primary-light"
            >
              Explore Public Sector delivery
            </Link>
          ) : null}
        </div>
      </BrandedContentSection>

      <BrandedContentSection
        id="related-services"
        variant="gray"
        header={{
          icon: "hub",
          iconVariant: "secondary",
          subtitle: "Related Services",
          title: "Compare Adjacent Service Paths",
          description:
            "Use related services to compare scope fit before selecting your project delivery path.",
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {relatedServices.map((relatedService) => (
            <Link
              key={relatedService.slug}
              href={`/services/${relatedService.slug}`}
              className="rounded-2xl border border-gray-200/90 bg-white/95 p-4 text-sm font-semibold text-brand-primary shadow-sm hover:underline dark:border-gray-700 dark:bg-gray-800/95 dark:text-brand-primary-light"
            >
              {relatedService.title}
            </Link>
          ))}
        </div>
      </BrandedContentSection>

      <NextStepsSection
        className="py-10 sm:py-12 lg:py-16"
        includePublicSectorLink
      />
    </main>
  );
}
