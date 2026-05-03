import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/SeoMeta";
import { COMPANY_INFO } from "@/lib/constants/company";
import { manuals } from "@/lib/data/documents";
import {
  ALL_CLUSTER_SLUGS,
  SAFETY_MANUAL_CLUSTERS,
  getClusterBySlug,
  sectionsForCluster,
} from "@/lib/data/safety-manual-clusters";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

const safetyManualEntry = manuals.find((m) => m.id === "safety-manual");
const REVISION_NUMBER = safetyManualEntry?.revisionNumber ?? "3";
const REVISION_DATE = safetyManualEntry?.revisionDate ?? "04/07/2026";

export function generateStaticParams() {
  return ALL_CLUSTER_SLUGS.map((cluster) => ({ cluster }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cluster: string }>;
}): Promise<Metadata> {
  const { cluster: clusterSlug } = await params;
  const cluster = getClusterBySlug(clusterSlug);
  if (!cluster) {
    return {
      title: "Safety Manual | MH Construction",
      robots: { index: false, follow: false },
    };
  }
  const url = `${SITE_URL}/resources/safety-manual/${cluster.slug}`;
  const range = `MISH ${String(cluster.min).padStart(2, "0")}–${String(
    cluster.max,
  ).padStart(2, "0")}`;
  const title = `${cluster.name} (${range}) — MISH Safety Manual | MH Construction`;
  const description = `${cluster.description} Veteran-Owned Since January 2025. Aligned with OSHA 29 CFR 1926 and AGC CSEA expectations. Full section detail available to credentialed parties upon login.`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "website",
      url,
    },
  };
}

export default async function SafetyManualClusterPage({
  params,
}: {
  params: Promise<{ cluster: string }>;
}) {
  const { cluster: clusterSlug } = await params;
  const cluster = getClusterBySlug(clusterSlug);
  if (!cluster) notFound();

  const sections = sectionsForCluster(cluster.slug);

  const websiteSections = safetyManualEntry?.sections ?? [];
  const websiteByNumber = new Map(
    websiteSections.map((s) => [Number(s.number), s]),
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Resources", href: "/resources" },
    { label: "Safety Manual", href: "/safety" },
    {
      label: "Table of Contents",
      href: "/resources/safety-manual/contents",
    },
    {
      label: cluster.name,
      href: `/resources/safety-manual/${cluster.slug}`,
    },
  ];

  const range = `MISH ${String(cluster.min).padStart(2, "0")}–${String(
    cluster.max,
  ).padStart(2, "0")}`;

  // Prev / next cluster
  const idx = SAFETY_MANUAL_CLUSTERS.findIndex((c) => c.slug === cluster.slug);
  const prev = idx > 0 ? SAFETY_MANUAL_CLUSTERS[idx - 1] : null;
  const next =
    idx >= 0 && idx < SAFETY_MANUAL_CLUSTERS.length - 1
      ? SAFETY_MANUAL_CLUSTERS[idx + 1]
      : null;

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(
          breadcrumbs.map((item) => ({ name: item.label, url: item.href })),
        )}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-linear-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb items={breadcrumbs} className="mb-5 text-white/60" />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
                <MaterialIcon
                  icon="shield"
                  size="sm"
                  className="text-brand-secondary"
                />
                {range}
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-secondary/80">
                Field Manual <span aria-hidden>→</span> Safety Manual
              </p>
              <h1 className="text-2xl font-black text-white sm:text-3xl md:text-4xl leading-tight">
                {cluster.name}
              </h1>
              <p className="mt-3 max-w-3xl text-sm text-white/80 sm:text-base">
                {cluster.description}
              </p>
              <p className="mt-3 text-xs font-semibold text-brand-secondary">
                Founded 2010, Veteran-Owned Since January 2025
              </p>
              <p className="mt-1 text-xs text-white/60">
                Revision {REVISION_NUMBER} · Effective {REVISION_DATE} · Aligned
                with OSHA 29 CFR 1926 and AGC CSEA expectations.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/resources/safety-manual/contents"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <MaterialIcon
                  icon="menu_book"
                  size="sm"
                  className="text-white"
                />
                Full Table of Contents
              </Link>
              <Link
                href="/safety"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-secondary px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-brand-secondary/90 transition-colors"
              >
                <MaterialIcon icon="shield" size="sm" className="text-white" />
                Safety Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Confidentiality ribbon ────────────────────────────────── */}
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-900/20">
        <div className="mx-auto flex max-w-5xl items-start gap-3 text-sm text-amber-800 dark:text-amber-300">
          <MaterialIcon icon="lock" size="sm" className="mt-0.5 shrink-0" />
          <span>
            <strong>Public preview only.</strong> This page shows the public
            <em> Purpose</em>, <em>Scope</em>, and reference resources for each
            section. Full procedures, forms, and proprietary controls are
            restricted —{" "}
            <Link
              href="/hub"
              className="underline hover:text-amber-900 dark:hover:text-amber-200"
            >
              sign in
            </Link>{" "}
            or{" "}
            <Link
              href="/contact?topic=safety-manual"
              className="underline hover:text-amber-900 dark:hover:text-amber-200"
            >
              request access
            </Link>
            .
          </span>
        </div>
      </div>

      {/* ── Body: in-page nav + cards ─────────────────────────────── */}
      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[14rem_1fr]">
        {/* Sticky in-page jump nav */}
        <nav
          aria-label={`Sections in ${cluster.name}`}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-secondary">
              Jump to section
            </p>
            <ul className="space-y-1">
              {sections.map((s) => (
                <li key={s.number}>
                  <a
                    href={`#mish-${s.numberStr}`}
                    className="block rounded px-2 py-1 text-sm text-gray-700 hover:bg-brand-primary/10 hover:text-brand-primary dark:text-gray-300 dark:hover:text-brand-secondary"
                  >
                    <span className="mr-2 font-mono text-xs font-bold text-brand-primary dark:text-brand-secondary">
                      {s.numberStr}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Section cards */}
        <div className="space-y-8">
          {sections.map((s) => {
            const previewHtml = s.previewHtml;
            const meta = websiteByNumber.get(s.number);
            const oshaRef = meta?.oshaRef;
            return (
              <article
                key={s.number}
                id={`mish-${s.numberStr}`}
                className="scroll-mt-24 rounded-2xl border-2 border-brand-primary/20 bg-white p-6 shadow-md transition-colors hover:border-brand-primary/40 dark:border-brand-primary/30 dark:bg-gray-800"
              >
                <header className="mb-4 flex flex-wrap items-baseline justify-between gap-3 border-b border-brand-primary/15 pb-3">
                  <div>
                    <span className="inline-flex items-center rounded-md bg-brand-primary px-2.5 py-1 font-mono text-xs font-bold text-white">
                      MISH {s.numberStr}
                    </span>
                    <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">
                      {s.title}
                    </h2>
                  </div>
                  <dl className="text-right text-xs text-gray-600 dark:text-gray-400">
                    {oshaRef && (
                      <div>
                        <dt className="inline font-semibold">OSHA: </dt>
                        <dd className="inline">{oshaRef}</dd>
                      </div>
                    )}
                    <div>
                      <dt className="inline font-semibold">Rev: </dt>
                      <dd className="inline">
                        {REVISION_NUMBER} · {REVISION_DATE}
                      </dd>
                    </div>
                  </dl>
                </header>

                {previewHtml ? (
                  <div
                    className="safety-manual-preview prose prose-sm max-w-none text-gray-700 dark:prose-invert dark:text-gray-300"
                    // Allowlisted server-extracted HTML — see
                    // src/lib/data/safety-manual-preview.ts for the strict
                    // heading allowlist + attribute stripping.
                    dangerouslySetInnerHTML={{ __html: previewHtml }}
                  />
                ) : (
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">
                    Public preview unavailable for this section. Sign in or
                    request access for the full text.
                  </p>
                )}

                {/* Confidentiality + CTAs */}
                <footer className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-brand-primary/10 pt-4">
                  <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    <MaterialIcon icon="lock" size="sm" />
                    Proprietary — public preview only
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/hub"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-primary px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-brand-primary-dark transition-colors"
                    >
                      <MaterialIcon
                        icon="login"
                        size="sm"
                        className="text-white"
                      />
                      Sign In
                    </Link>
                    <Link
                      href={`/contact?topic=safety-manual&section=MISH-${s.numberStr}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary/30 bg-white px-3.5 py-2 text-xs font-semibold text-brand-primary hover:bg-brand-primary/5 transition-colors dark:bg-transparent dark:text-brand-secondary dark:border-brand-secondary/30"
                    >
                      <MaterialIcon icon="mail" size="sm" />
                      Request Full Section
                    </Link>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </main>

      {/* ── Prev / next cluster ───────────────────────────────────── */}
      <nav
        aria-label="Cluster navigation"
        className="mx-auto mb-12 mt-4 flex max-w-6xl flex-wrap justify-between gap-3 px-4 sm:px-6"
      >
        {prev ? (
          <Link
            href={`/resources/safety-manual/${prev.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/30 bg-white px-4 py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-primary/5 transition-colors dark:bg-transparent dark:text-brand-secondary dark:border-brand-secondary/30"
          >
            <MaterialIcon icon="arrow_back" size="sm" />
            <span>
              <span className="block text-xs font-normal opacity-70">
                Previous
              </span>
              {prev.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/resources/safety-manual/${next.slug}`}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/30 bg-white px-4 py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-primary/5 transition-colors dark:bg-transparent dark:text-brand-secondary dark:border-brand-secondary/30"
          >
            <span className="text-right">
              <span className="block text-xs font-normal opacity-70">Next</span>
              {next.name}
            </span>
            <MaterialIcon icon="arrow_forward" size="sm" />
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}
