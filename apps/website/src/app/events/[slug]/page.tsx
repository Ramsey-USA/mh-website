import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { Card } from "@/components/ui";
import { COMPANY_INFO } from "@/lib/constants/company";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import {
  eventRecords,
  getEventLifecycleLabel,
  getEventRecordBySlug,
  getLocalizedEventRecord,
} from "@/lib/data/events";
import { createOgImageUrl } from "@/lib/seo/og-image";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { generateEventDetailSchema } from "@/lib/seo/page-type-schema";
import { getServerLocale } from "@/lib/i18n/locale.server";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

const EVENT_SEO_KEYWORDS: Record<string, string[]> = {
  "cool-desert-nights": [
    "Cool Desert Nights 2026",
    "Smoke n Shine results",
    "Tri-Cities event archive",
    "Richland community event",
    "MH Construction event recap",
    "community partnership event record",
  ],
};

export function generateStaticParams(): Array<{ slug: string }> {
  return eventRecords.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventRecordBySlug(slug);

  if (!event) {
    return {
      title: buildDualSeoTitle("events", "Event Detail"),
      robots: { index: false, follow: false },
    };
  }

  const title = `${event.title} | MH Construction`;
  const description = event.summary;
  const ogImageUrl = createOgImageUrl("event", event.slug);
  const keywords = EVENT_SEO_KEYWORDS[event.slug] ?? [
    `${event.title} event`,
    "MH Construction community events",
    "Tri-Cities event partnerships",
    "event recap and outcomes",
  ];

  return {
    title,
    description,
    keywords,
    category: "community events",
    alternates: {
      canonical: `${SITE_URL}/events/${event.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/events/${event.slug}`,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          alt: `${event.title} event recap`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function EventDetailPage({
  params,
}: Readonly<{ params: Promise<{ slug: string }> }>) {
  const locale = (await getServerLocale()) === "es" ? "es" : "en";
  const isEs = locale === "es";
  const { slug } = await params;
  const event = getEventRecordBySlug(slug);

  if (!event) {
    notFound();
  }

  const localizedEvent = getLocalizedEventRecord(event, locale);
  const lifecycleLabel = getEventLifecycleLabel(
    localizedEvent.lifecycleStatus,
    locale,
  );

  const eventSchema = generateEventDetailSchema(localizedEvent, SITE_URL);

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: isEs ? "Inicio" : "Home", url: SITE_URL },
          { name: isEs ? "Eventos" : "Events", url: `${SITE_URL}/events` },
          {
            name: localizedEvent.title,
            url: `${SITE_URL}/events/${localizedEvent.slug}`,
          },
        ])}
      />
      <StructuredData data={eventSchema} />

      <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <section className="relative overflow-hidden bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 py-12 text-white sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-primary/35 via-gray-900/70 to-gray-900/85" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-secondary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-4 sm:space-y-5">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary/90">
                {isEs ? "Detalle del evento" : "Event Detail"}
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {localizedEvent.title}
              </h1>
              <p className="font-body max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                {localizedEvent.summary}
              </p>
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                {isEs
                  ? "Built on Quality, Backed by Trust. (Construido sobre calidad, respaldado por confianza.)"
                  : "Built on Quality, Backed by Trust."}
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                    {isEs ? "Estado del evento" : "Status"}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white sm:text-base">
                    {lifecycleLabel}
                  </p>
                </article>
                <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                    {isEs ? "Calendario" : "Schedule"}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white sm:text-base">
                    {localizedEvent.schedule}
                  </p>
                </article>
                <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                    {isEs ? "Cobertura" : "Coverage"}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white sm:text-base">
                    {localizedEvent.location}
                  </p>
                </article>
              </div>
              <div className="grid gap-3 sm:flex sm:flex-wrap">
                <Link
                  href="/events"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:bg-brand-secondary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary sm:w-auto"
                >
                  <MaterialIcon icon="arrow_back" size="sm" />
                  {isEs ? "Volver al centro de eventos" : "Back to Events Hub"}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary sm:w-auto"
                >
                  <MaterialIcon icon="handshake" size="sm" />
                  {isEs ? "Solicitar alianza" : "Request Partnership"}
                </Link>
                <Link
                  href={localizedEvent.partnerUrl}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary sm:w-auto"
                >
                  <MaterialIcon icon="article" size="sm" />
                  {localizedEvent.partnerLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: isEs ? "Inicio" : "Home", href: "/" },
                { label: isEs ? "Eventos" : "Events", href: "/events" },
                { label: localizedEvent.title },
              ]}
            />
          </div>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <div>
                <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                  {isEs ? "Resumen del evento" : "Event Recap"}
                </p>
                <h2 className="mt-2 text-xl font-black sm:text-2xl">
                  {localizedEvent.recapTitle}
                </h2>
              </div>
              <div className="mt-5 grid gap-4 md:mt-6">
                <Image
                  src={localizedEvent.primaryImage}
                  alt={localizedEvent.title}
                  width={1280}
                  height={720}
                  className="w-full rounded-2xl object-cover shadow-lg"
                />
                <ul className="space-y-2.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
                  {localizedEvent.recapBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="mt-0.5 text-brand-primary"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="rounded-2xl border border-gray-200 bg-white p-5 shadow-lg dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                  {isEs ? "Panel rapido" : "Quick Panel"}
                </p>
                <div className="mt-3 grid gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Estado:" : "Status:"}
                    </span>{" "}
                    {lifecycleLabel}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Ventana:" : "Window:"}
                    </span>{" "}
                    {localizedEvent.schedule}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Ubicacion:" : "Location:"}
                    </span>{" "}
                    {localizedEvent.location}
                  </p>
                  {localizedEvent.projectSlug && (
                    <Link
                      href={`/projects/${localizedEvent.projectSlug}`}
                      className="inline-flex items-center gap-2 font-semibold text-brand-primary hover:text-brand-primary-dark dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                    >
                      <MaterialIcon icon="link" size="sm" />
                      <span>
                        {isEs ? "Proyecto relacionado" : "Related project"}
                      </span>
                    </Link>
                  )}
                </div>
              </Card>

              <Card className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900/40 sm:p-6">
                <div>
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                    {isEs ? "Confianza de marca" : "Brand Trust"}
                  </p>
                  <h3 className="mt-2 text-xl font-black text-gray-900 dark:text-white">
                    {isEs
                      ? "Registro y coordinacion con responsabilidad"
                      : "Accountable record and coordination"}
                  </h3>
                </div>
                <div className="space-y-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
                  <p>{localizedEvent.requestBody}</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Image
                      src={localizedEvent.secondaryImage}
                      alt={`${localizedEvent.title} recap image`}
                      width={800}
                      height={600}
                      className="rounded-2xl object-cover shadow-md"
                    />
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {isEs ? "Use este flujo para:" : "Use this flow for:"}
                      </p>
                      <ul className="mt-3 space-y-2">
                        <li>
                          {isEs
                            ? "Eventos comunitarios patrocinados"
                            : "Sponsored community events"}
                        </li>
                        <li>
                          {isEs
                            ? "Participaciones organizadas con aliados"
                            : "Hosted partner placements"}
                        </li>
                        <li>
                          {isEs
                            ? "Solicitudes futuras listas para archivo"
                            : "Future archive-ready event requests"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:bg-brand-secondary dark:text-gray-900 dark:hover:bg-brand-secondary-light"
                  >
                    <MaterialIcon icon="mail" size="sm" />
                    {isEs
                      ? "Iniciar una solicitud de alianza"
                      : "Start a Partnership Request"}
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
