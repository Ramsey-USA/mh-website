import type { Metadata } from "next";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PageTrackingClient } from "@/components/analytics";

export const metadata: Metadata = {
  title: "Employee Handbook | MH Construction",
  description:
    "Employee handbook placeholder page prepared for upcoming Word upload and PDF publishing workflow.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmployeeHandbookPage() {
  return (
    <>
      <PageTrackingClient pageName="employee-handbook-placeholder" />

      <section className="bg-gradient-to-br from-brand-primary-darker via-brand-primary-dark to-brand-primary px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-4xl text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-brand-secondary">
            <MaterialIcon
              icon="menu_book"
              size="sm"
              className="text-brand-secondary"
            />
            Operations Resource
          </div>

          <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
            Employee Handbook Placeholder
          </h1>
          <p className="mt-4 text-base text-slate-100 sm:text-lg">
            This section is live and ready for your handbook upload workflow.
            Once the Word source is provided, we can route it through the PDF
            generator and publish the final handbook package here.
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-10 dark:bg-gray-950 sm:px-6 sm:py-12">
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Current Status
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              No handbook file has been uploaded yet. This placeholder preserves
              the Operations Hub navigation and keeps the destination stable for
              future publishing.
            </p>
          </article>

          <article className="rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/40 dark:bg-brand-primary/10">
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Next Step
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-200">
              Upload the Word handbook source and we will connect it to the
              existing document generation process to publish a versioned PDF.
            </p>
          </article>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl flex-wrap gap-3">
          <Link
            href="/hub"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-primary-dark"
          >
            <MaterialIcon icon="dashboard" size="sm" className="text-white" />
            Back to Operations Hub
          </Link>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 rounded-xl border border-brand-primary px-5 py-3 text-sm font-bold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
          >
            <MaterialIcon icon="folder_open" size="sm" />
            View Field Resources
          </Link>
        </div>
      </section>
    </>
  );
}
