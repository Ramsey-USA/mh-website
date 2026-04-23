import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { COMPANY_INFO } from "@/lib/constants/company";
import { manuals } from "@/lib/data/documents";

const siteUrl = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = {
  title: "Safety Manual — Table of Contents | MH Construction",
  description:
    "Browse all 50 sections of MH Construction's MISH Safety & Health Program. Veteran-Owned Since January 2025. Aligned with OSHA 29 CFR 1926 and AGC CSEA expectations. Full manual access requires login.",
  alternates: {
    canonical: `${siteUrl}/resources/safety-manual/contents`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Safety Manual — Table of Contents | MH Construction",
    description:
      "50-section MISH Safety & Health Program index. Veteran-Owned Since January 2025 Tri-State licensed general contractor. Full manual available to credentialed parties upon login.",
    type: "website",
    url: `${siteUrl}/resources/safety-manual/contents`,
  },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/resources" },
  { label: "Safety Manual", href: "/safety" },
  { label: "Table of Contents", href: "/resources/safety-manual/contents" },
];

// Cluster groupings mirroring TOC_CLUSTERS in generate.mjs
const CLUSTERS = [
  { name: "Program Foundation", min: 1, max: 3 },
  { name: "Field Onboarding & Communication", min: 4, max: 9 },
  { name: "Safety Oversight & Industrial Hygiene", min: 10, max: 19 },
  { name: "Fall & Access Safety", min: 20, max: 24 },
  { name: "Excavation, Confined Spaces & Energy Control", min: 25, max: 27 },
  { name: "Energy & Fire Hazards", min: 28, max: 32 },
  { name: "Motor Vehicles & Heavy Equipment", min: 33, max: 41 },
  { name: "Tools & Materials", min: 42, max: 45 },
  { name: "Program Compliance & Continuity", min: 46, max: 50 },
];

// Callout items (critical safety — mirroring TOC_CALLOUT_ITEMS in generate.mjs)
const CALLOUT_ITEMS = new Set([21, 48]);

export default function SafetyManualContentsPage() {
  const manual = manuals.find((m) => m.id === "safety-manual");
  const sections = manual?.sections ?? [];
  const revisionNumber = manual?.revisionNumber ?? "3";
  const revisionDate = manual?.revisionDate ?? "04/07/2026";

  const sectionMap = new Map(sections.map((s) => [Number(s.number), s]));

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema(
          breadcrumbs.map((item) => ({ name: item.label, url: item.href })),
        )}
      />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Breadcrumb items={breadcrumbs} className="mb-5 text-white/60" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
                <MaterialIcon
                  icon="menu_book"
                  size="sm"
                  className="text-brand-secondary"
                />
                Public Index
              </div>
              <h1 className="text-2xl font-black text-white sm:text-3xl md:text-4xl leading-tight">
                MISH Safety Manual{" "}
                <span className="block text-brand-secondary">
                  Table of Contents
                </span>
              </h1>
              <p className="mt-2 text-sm text-white/70">
                Revision {revisionNumber} &middot; Effective {revisionDate}
                &ensp;&bull;&ensp;
                <span className="text-brand-secondary font-semibold">
                  ★ Veteran Owned
                </span>
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href={
                  manual?.contentsPdfPath ??
                  "/docs/safety/safety-manual-contents.pdf"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-secondary px-4 py-2.5 text-sm font-bold text-white shadow hover:bg-brand-secondary/90 transition-colors"
              >
                <MaterialIcon
                  icon="download"
                  size="sm"
                  className="text-white"
                />
                Download TOC PDF
              </a>
              <Link
                href="/safety"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                <MaterialIcon icon="shield" size="sm" className="text-white" />
                Safety Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Auth notice ───────────────────────────────────────────── */}
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-900/20">
        <div className="mx-auto flex max-w-5xl items-center gap-3 text-sm text-amber-800 dark:text-amber-300">
          <MaterialIcon icon="lock" size="sm" className="flex-shrink-0" />
          <span>
            <strong>Full manual access is restricted.</strong> Credentialed
            parties (bonding agencies, insurers, AGC members) may request access
            via{" "}
            <Link
              href="/safety"
              className="underline hover:text-amber-900 dark:hover:text-amber-200"
            >
              the Safety Program page
            </Link>
            .
          </span>
        </div>
      </div>

      {/* ── Section clusters ──────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CLUSTERS.map((cluster) => {
            const nums: number[] = [];
            for (let n = cluster.min; n <= cluster.max; n++) {
              if (sectionMap.has(n) || n <= 50) nums.push(n);
            }
            return (
              <div
                key={cluster.name}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <h2 className="mb-3 border-b border-brand-primary/20 pb-2 text-xs font-bold uppercase tracking-wider text-brand-primary dark:text-brand-secondary">
                  {cluster.name}
                </h2>
                <ul className="space-y-1">
                  {nums.map((n) => {
                    const sec = sectionMap.get(n);
                    const isCallout = CALLOUT_ITEMS.has(n);
                    return (
                      <li
                        key={n}
                        className={`flex items-baseline gap-2 rounded px-1.5 py-0.5 text-sm ${
                          isCallout
                            ? "border-l-2 border-brand-secondary bg-brand-secondary/5 pl-2 font-semibold"
                            : ""
                        }`}
                      >
                        <span className="w-14 flex-shrink-0 font-mono text-xs font-bold text-brand-primary dark:text-brand-secondary">
                          MISH {String(n).padStart(2, "0")}
                        </span>
                        <span className="text-gray-700 dark:text-gray-300">
                          {sec?.title ?? `Section ${n}`}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* ── Full manual CTA ───────────────────────────────────── */}
        <div className="mt-12 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6 text-center dark:border-brand-primary/30 dark:bg-brand-primary/10">
          <MaterialIcon
            icon="lock"
            size="lg"
            className="mx-auto mb-3 text-brand-primary"
          />
          <h2 className="mb-2 text-lg font-bold text-brand-primary dark:text-white">
            Full Manual — Restricted Access
          </h2>
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            The complete {manual?.totalSections ?? 50}-section MISH Safety
            Manual is available to authorized personnel and credentialed
            parties. Sign in or request access below.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/hub"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-5 py-2.5 text-sm font-bold text-white shadow hover:bg-brand-primary-dark transition-colors"
            >
              <MaterialIcon icon="login" size="sm" className="text-white" />
              Sign In — Operations Hub
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-primary/30 bg-white px-5 py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-primary/5 transition-colors dark:bg-transparent dark:text-brand-secondary dark:border-brand-secondary/30"
            >
              <MaterialIcon icon="mail" size="sm" />
              Request Access
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
