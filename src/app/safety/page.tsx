import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { PageTrackingClient } from "@/components/analytics";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";
import { PWAInstallCTA } from "@/components/pwa";

const SITE_URL = "https://www.mhc-gc.com";

export const metadata: Metadata = withGeoMetadata({
  title: "Safety Culture | Zero-Incident Culture | MH Construction",
  description:
    "At MH Construction, safety is a core value — not a compliance checkbox. Our zero-incident culture is built on personal accountability, daily habits, and service-earned discipline. Veteran-Owned. 0.64 EMR rating. AGC-WA Top EMR Award.",
  keywords: [
    "MH Construction safety culture",
    "zero incident culture construction",
    "construction safety values",
    "veteran-owned contractor safety",
    "safety accountability construction",
    "EMR 0.64 construction",
    "AGC safety award winner",
    "construction safety Tri-Cities WA",
    "field team safety habits",
    "safety first contractor",
  ],
  alternates: {
    canonical: `${SITE_URL}/safety`,
  },
  openGraph: {
    title: "Safety Culture | Zero-Incident Culture | MH Construction",
    description:
      "Safety is a value, not a rule. Our zero-incident culture — 0.64 EMR, AGC-WA Top EMR Award — is built on personal accountability and service-earned discipline.",
    url: `${SITE_URL}/safety`,
    siteName: "MH Construction",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/safety/safety-culture.webp`,
        width: 1200,
        height: 630,
        alt: "MH Construction — Safety Briefing on the Job Site",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mhc_gc",
    creator: "@mhc_gc",
    title: "Safety Culture | MH Construction",
    description:
      "Safety is a value, not a rule. 0.64 EMR. AGC-WA Top EMR Award. Veteran-Owned zero-incident culture.",
    images: [`${SITE_URL}/images/safety/safety-culture.webp`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
});

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://www.mhc-gc.com" },
  { name: "Safety Culture", url: "https://www.mhc-gc.com/safety" },
]);

const safetySchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "MH Construction Safety Culture Program",
  description:
    "Zero-incident safety culture built on personal accountability, daily habits, and service-earned discipline. 0.64 EMR rating, AGC-WA Top EMR Award.",
  provider: {
    "@type": "Organization",
    name: "MH Construction",
    url: SITE_URL,
  },
  serviceType: "Construction Safety Management",
  award: ["AGC-WA Top EMR Award", "0.64 Experience Modification Rate"],
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const COMMITMENTS = [
  {
    icon: "shield",
    title: "Every Worker Goes Home Safe",
    body: "No project, deadline, or dollar amount is worth a preventable injury. Every decision on every job site is made with that standard first.",
  },
  {
    icon: "groups",
    title: "Personal Accountability",
    body: "Safety isn't enforced top-down. Every team member — superintendent to laborer — owns their environment and looks out for the person next to them.",
  },
  {
    icon: "military_tech",
    title: "Service-Earned Discipline",
    body: "Our veteran leadership brought a simple truth from the military: consistent habits, not sporadic rules, are what keep people alive. That discipline lives on every job site.",
  },
  {
    icon: "visibility",
    title: "Speak Up, Every Time",
    body: "A culture where unsafe conditions are reported — not ignored — is a culture that improves. We have zero tolerance for silence on safety concerns.",
  },
] as const;

const HABITS = [
  { icon: "checklist", label: "Daily toolbox talks before every shift" },
  { icon: "search", label: "Job Hazard Analysis on every new scope" },
  { icon: "healing", label: "Incident reporting — every event, every time" },
  { icon: "build", label: "Equipment inspections before every use" },
  { icon: "record_voice_over", label: "Weekly superintendent safety reviews" },
  { icon: "emoji_events", label: "Peer recognition for safe behavior" },
] as const;

const STATS = [
  {
    value: "0.64",
    label: "EMR Rating",
    sub: "40% below industry average",
    icon: "trending_down",
  },
  {
    value: "AGC-WA",
    label: "Top EMR Award",
    sub: "Associated General Contractors",
    icon: "workspace_premium",
  },
  {
    value: "15+",
    label: "Years",
    sub: "Building a safety-first culture",
    icon: "history",
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SafetyPage() {
  return (
    <>
      <PageTrackingClient pageName="Safety Culture" />
      <StructuredData data={[breadcrumbSchema, safetySchema]} />

      {/* Breadcrumb */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Safety Culture" }]}
          />
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/safety/safety-culture.webp"
            alt="MH Construction safety briefing on the job site"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 text-center">
          {/* Badge */}
          <span className="inline-flex items-center gap-2 bg-brand-primary/20 border border-brand-primary/40 text-brand-accent px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest mb-8">
            <MaterialIcon icon="shield" size="sm" />
            Zero-Incident Culture
          </span>

          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6">
            Safety Is a Value,
            <br />
            <span className="text-brand-accent">Not a Rule</span>
          </h1>

          <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-12">
            At MH Construction, safety isn&apos;t something we do because OSHA
            requires it. It&apos;s who we are — a standard set long before we
            arrived on the job site, and one we carry home with us.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-black text-brand-accent">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Commitments ── */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Our Commitment on Every Site
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Four principles that shape every interaction, every day, on every
              job.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {COMMITMENTS.map((item) => (
              <div
                key={item.title}
                className="flex gap-5 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <MaterialIcon
                    icon={item.icon}
                    size="md"
                    className="text-brand-primary"
                  />
                </div>
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Daily Habits ── */}
      <section className="bg-slate-50 dark:bg-gray-950 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Culture Is Built in Daily Habits
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Not in posters. Not in policy manuals. In what we actually do,
              every single shift.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HABITS.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-4"
              >
                <MaterialIcon
                  icon={h.icon}
                  size="sm"
                  className="text-brand-primary shrink-0"
                />
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team Accountability ── */}
      <section className="bg-brand-primary text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MaterialIcon
            icon="military_tech"
            size="xl"
            className="mx-auto mb-6 text-brand-accent"
          />
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            Accountability Runs Both Ways
          </h2>
          <p className="text-xl text-white/85 leading-relaxed max-w-2xl mx-auto mb-8">
            Our leadership holds itself to the same standard we hold the team.
            When something goes wrong, we fix the system — not just the person.
            When something goes right, we recognize it publicly and immediately.
          </p>
          <p className="text-white/70 text-base leading-relaxed max-w-xl mx-auto">
            That&apos;s the chain of command principle applied to safety: clear
            ownership, honest communication, and no one left behind.
          </p>
        </div>
      </section>

      {/* ── App CTA ── */}
      <section className="bg-white dark:bg-gray-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-3xl bg-slate-900 text-white p-10 md:p-14 text-center relative overflow-hidden">
            {/* Background glow */}
            <div
              className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 via-transparent to-brand-accent/10 pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MaterialIcon
                  icon="smartphone"
                  size="xl"
                  className="text-brand-accent"
                />
              </div>

              <h2 className="text-3xl md:text-4xl font-black mb-4">
                Safety Documentation Lives in the App
              </h2>

              <p className="text-slate-300 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                The MH Construction app is our staff portal — safety manual,
                field forms, toolbox talks, incident reports, and employee
                handbook. Free to install. Role-gated for team members.
              </p>

              <div className="flex flex-col items-center gap-4">
                <PWAInstallCTA className="w-full max-w-sm" variant="button" />

                <Link
                  href="/hub"
                  className="text-sm text-slate-400 hover:text-white transition-colors"
                >
                  Already a team member?{" "}
                  <span className="underline underline-offset-2">
                    Open the Hub →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
