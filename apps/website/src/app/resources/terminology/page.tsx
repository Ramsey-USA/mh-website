import type { Metadata } from "next";
import Link from "next/link";
import { buildDualSeoTitle } from "@/lib/branding/page-names";

export const metadata: Metadata = {
  title: buildDualSeoTitle("resources", "Construction Terminology Resources"),
  description:
    "Construction terminology references and brand language resources for project stakeholders, teams, and partners.",
};

export default function TerminologyResourcesPage() {
  return (
    <main className="bg-brand-white text-brand-charcoal">
      <section className="mx-auto max-w-4xl px-6 py-20">
        <p className="font-heading text-xs uppercase tracking-widest text-brand-hunter">
          Field Resources
        </p>
        <h1 className="mt-4 font-heading text-4xl font-black tracking-tight text-brand-forest sm:text-5xl">
          Terminology References
        </h1>
        <p className="mt-6 max-w-3xl font-body text-base leading-relaxed text-brand-charcoal/85">
          Use the official MH terminology references for construction-first
          language with mission-style clarifiers where appropriate.
        </p>
        <div className="mt-8">
          <Link
            href="/resources"
            className="inline-flex items-center rounded-md bg-brand-hunter px-5 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-hunter-dark"
          >
            Back to Resources
          </Link>
        </div>
      </section>
    </main>
  );
}
