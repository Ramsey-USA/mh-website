import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { StructuredData } from "@/components/seo/SeoMeta";
import { COMPANY_INFO } from "@/lib/constants/company";
import { forms } from "@/lib/data/documents";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = {
  title: "Safety Manual — Forms Index | MH Construction",
  description:
    "Index of MH Construction's MISH safety forms. Veteran-Owned Since January 2025. Aligned with OSHA 29 CFR 1926 and AGC CSEA expectations. Authorized personnel may download blank forms; completed forms are restricted.",
  alternates: { canonical: `${SITE_URL}/resources/safety-manual/forms` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Safety Manual — Forms Index | MH Construction",
    description:
      "Index of MISH safety forms. Veteran-Owned Since January 2025 Tri-State licensed general contractor. Authorized parties only.",
    type: "website",
    url: `${SITE_URL}/resources/safety-manual/forms`,
  },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/resources" },
  { label: "Safety Manual", href: "/safety" },
  { label: "Table of Contents", href: "/resources/safety-manual/contents" },
  { label: "Forms", href: "/resources/safety-manual/forms" },
];

/** Strip the `safety-form-` id prefix to get a stable QR anchor id. */
function formAnchor(documentId: string): string {
  return `form-${documentId.replace(/^safety-form-/, "")}`;
}

export default function SafetyManualFormsPage() {
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
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
            <MaterialIcon
              icon="description"
              size="sm"
              className="text-brand-secondary"
            />
            Forms Index
          </div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-brand-secondary/80">
            Field Forms <span aria-hidden>→</span> Safety Forms
          </p>
          <h1 className="text-2xl font-black text-white sm:text-3xl md:text-4xl leading-tight">
            MISH Safety Forms
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-white/80 sm:text-base">
            Field-ready safety forms for MH Construction crews and Trade
            Partners. Each form aligns with a MISH section and is part of our
            written Safety &amp; Health Program.
          </p>
          <p className="mt-3 text-xs font-semibold text-brand-secondary">
            Founded 2010, Veteran-Owned Since January 2025
          </p>
        </div>
      </section>

      {/* ── Confidentiality ribbon ────────────────────────────────── */}
      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-900/20">
        <div className="mx-auto flex max-w-5xl items-start gap-3 text-sm text-amber-800 dark:text-amber-300">
          <MaterialIcon icon="lock" size="sm" className="mt-0.5 shrink-0" />
          <span>
            <strong>Blank templates only.</strong> Completed forms,
            project-specific JHAs, and incident records are restricted —{" "}
            <Link
              href="/hub"
              className="underline hover:text-amber-900 dark:hover:text-amber-200"
            >
              sign in
            </Link>{" "}
            for authorized access.
          </span>
        </div>
      </div>

      {/* ── Form cards ────────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2">
          {forms.map((form) => (
            <article
              key={form.id}
              id={formAnchor(form.id)}
              className="scroll-mt-24 rounded-2xl border-2 border-brand-primary/20 bg-white p-5 shadow-md transition-colors hover:border-brand-primary/40 dark:border-brand-primary/30 dark:bg-gray-800"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 dark:text-brand-secondary">
                  <MaterialIcon icon={form.icon} size="md" />
                </span>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                    {form.title}
                  </h2>
                  {form.subtitle && (
                    <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400">
                      {form.subtitle}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                    {form.description}
                  </p>
                </div>
              </div>
              <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-brand-primary/10 pt-3">
                <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                  <MaterialIcon icon="lock" size="sm" />
                  Blank template
                </p>
                <div className="flex flex-wrap gap-2">
                  {form.pdfPath ? (
                    <a
                      href={form.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-secondary px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-brand-secondary/90 transition-colors"
                    >
                      <MaterialIcon
                        icon="download"
                        size="sm"
                        className="text-white"
                      />
                      Download PDF
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400"
                      title="Fillable PDF in production — available soon"
                    >
                      <MaterialIcon icon="hourglass_empty" size="sm" />
                      Coming soon
                    </span>
                  )}
                  <Link
                    href="/hub"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand-primary/30 bg-white px-3 py-1.5 text-xs font-semibold text-brand-primary hover:bg-brand-primary/5 transition-colors dark:bg-transparent dark:text-brand-secondary dark:border-brand-secondary/30"
                  >
                    <MaterialIcon icon="login" size="sm" />
                    Sign In
                  </Link>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
