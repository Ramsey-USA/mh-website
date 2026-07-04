import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageTrackingClient } from "@/components/analytics";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { Button } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  formatDualPageName,
  PAGE_TERMINOLOGY,
} from "@/lib/branding/page-names";
import { getDocumentById, handbookForms } from "@/lib/data/documents";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";

export const metadata: Metadata = {
  title: `${formatDualPageName(PAGE_TERMINOLOGY.employeeHandbook.seoName, PAGE_TERMINOLOGY.employeeHandbook.mhBrandName)} | MH Construction`,
  description:
    "Public index of MH Construction's Employee Handbook sections and handbook-owned forms. Download the published handbook PDF and review the current policy and acknowledgment inventory.",
  alternates: {
    canonical: "https://www.mhc-gc.com/employee-handbook",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: `${formatDualPageName(PAGE_TERMINOLOGY.employeeHandbook.seoName, PAGE_TERMINOLOGY.employeeHandbook.mhBrandName)} | MH Construction`,
    description:
      "Browse handbook chapters, review policy form inventory, and access the published Employee Handbook PDF.",
    type: "website",
    url: "https://www.mhc-gc.com/employee-handbook",
  },
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Resources", href: "/resources" },
  { label: "Employee Handbook", href: "/employee-handbook" },
];

function formAnchor(documentId: string): string {
  return `form-${documentId.replace(/^handbook-form-/, "")}`;
}

export default function EmployeeHandbookPage() {
  const manual = getDocumentById("employee-handbook");
  const sections = manual?.sections ?? [];
  const revisionNumber = manual?.revisionNumber ?? "1.0";
  const revisionDate = manual?.revisionDate ?? "05/01/2026";
  const totalPages = manual?.totalPages ?? 37;
  const siteUrl = COMPANY_INFO.urls.getSiteUrl();

  return (
    <>
      <PageTrackingClient pageName="employee-handbook" />
      <StructuredData
        data={generateBreadcrumbSchema(
          breadcrumbs.map((item) => ({
            name: item.label,
            url: `${siteUrl}${item.href}`,
          })),
        )}
      />

      <section className="bg-linear-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-5xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
            <MaterialIcon
              icon="menu_book"
              size="sm"
              className="text-brand-secondary"
            />
            Public Handbook Index
          </div>

          <h1 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
            Employee Handbook
          </h1>
          <p className="mt-2 text-sm text-white/70">
            Revision {revisionNumber} &middot; Effective {revisionDate}
          </p>
          <p className="mt-4 max-w-3xl text-base text-slate-100 sm:text-lg">
            Public index of MH Construction's employee handbook chapters and
            handbook-owned policy forms. Use this page to verify the current
            chapter structure, then open the published handbook PDF or sign in
            for internal workflows.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {manual?.pdfPath && (
              <Button asChild variant="secondary" size="lg">
                <a
                  href={manual.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MaterialIcon
                    icon="download"
                    size="sm"
                    className="text-white"
                  />
                  Download Handbook PDF
                </a>
              </Button>
            )}
            <Button asChild variant="outline" size="lg">
              <Link href="/resources">
                <MaterialIcon
                  icon="folder_open"
                  size="sm"
                  className="text-white"
                />
                Back to Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Breadcrumb items={breadcrumbs} />

      <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 dark:border-amber-800/40 dark:bg-amber-900/20">
        <div className="mx-auto flex max-w-5xl items-start gap-3 text-sm text-amber-800 dark:text-amber-300">
          <MaterialIcon icon="lock" size="sm" className="mt-0.5 shrink-0" />
          <span>
            <strong>Blank templates only.</strong> Completed acknowledgments,
            personnel records, and handbook workflow documents remain restricted
            to authorized personnel.
          </span>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3 mb-10">
          <div className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-primary">
              Handbook Sections
            </p>
            <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
              {sections.length}
            </p>
          </div>
          <div className="rounded-2xl border border-brand-secondary/20 bg-brand-secondary/5 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Handbook Forms
            </p>
            <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
              {handbookForms.length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Published PDF
            </p>
            <p className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
              {totalPages}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">pages</p>
          </div>
        </div>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
              <MaterialIcon icon="list_alt" size="sm" className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Handbook Sections
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {sections.map((section) => (
              <article
                key={section.number}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex min-w-14 items-center justify-center rounded-md bg-brand-primary px-2.5 py-1 font-mono text-xs font-bold text-white">
                    CH {section.number}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {section.summary}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-brand-secondary rounded-lg flex items-center justify-center">
              <MaterialIcon
                icon="description"
                size="sm"
                className="text-white"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Handbook Forms
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {handbookForms.map((form) => (
              <article
                key={form.id}
                id={formAnchor(form.id)}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-secondary/10 text-brand-secondary">
                    <MaterialIcon icon={form.icon} size="md" />
                  </span>
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                      {form.title}
                    </h3>
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
                <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-brand-secondary/10 pt-3">
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
                    <MaterialIcon icon="lock" size="sm" />
                    Blank template
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {form.pdfPath ? (
                      <Button asChild variant="secondary" size="sm">
                        <a
                          href={form.pdfPath}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MaterialIcon
                            icon="download"
                            size="sm"
                            className="text-white"
                          />
                          Download PDF
                        </a>
                      </Button>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-500 dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-400">
                        <MaterialIcon icon="hourglass_empty" size="sm" />
                        Coming soon
                      </span>
                    )}
                    <Button asChild variant="outline" size="sm">
                      <Link href="/hub">
                        <MaterialIcon icon="login" size="sm" />
                        Sign In
                      </Link>
                    </Button>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
