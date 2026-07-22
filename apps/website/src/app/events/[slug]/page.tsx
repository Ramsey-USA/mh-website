import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { Button, Card } from "@/components/ui";
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

  return {
    title,
    description,
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
        <section className="relative overflow-hidden bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 py-16 text-white sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-primary/35 via-gray-900/70 to-gray-900/85" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-5">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary/90">
                {isEs ? "Detalle del evento" : "Event Detail"}
              </p>
              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {localizedEvent.title}
              </h1>
              <p className="font-body max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                {localizedEvent.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="secondary" size="lg">
                  <Link href={localizedEvent.partnerUrl}>
                    <MaterialIcon icon="article" size="md" className="mr-2" />
                    {localizedEvent.partnerLabel}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">
                    <MaterialIcon icon="handshake" size="md" className="mr-2" />
                    {isEs ? "Solicitar alianza" : "Request Partnership"}
                  </Link>
                </Button>
                <Button asChild variant="primary" size="lg">
                  <Link href="/events">
                    <MaterialIcon
                      icon="arrow_back"
                      size="md"
                      className="mr-2"
                    />
                    {isEs
                      ? "Volver al centro de eventos"
                      : "Back to Events Hub"}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: isEs ? "Inicio" : "Home", href: "/" },
              { label: isEs ? "Eventos" : "Events", href: "/events" },
              { label: localizedEvent.title },
            ]}
            className="mb-8"
          />

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="overflow-hidden border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                  {isEs ? "Resumen del evento" : "Event Recap"}
                </p>
                <h2 className="mt-1 text-2xl font-black">
                  {localizedEvent.recapTitle}
                </h2>
              </div>
              <div className="grid gap-4 p-6">
                <Image
                  src={localizedEvent.primaryImage}
                  alt={localizedEvent.title}
                  width={1280}
                  height={720}
                  className="w-full rounded-2xl object-cover shadow-lg"
                />
                <ul className="space-y-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
                  {localizedEvent.recapBullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="mt-0.5 shrink-0 text-brand-primary"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            <div className="space-y-6">
              <Card className="border border-gray-200 bg-gray-50 p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                  {isEs ? "Registro del evento" : "Event Record"}
                </p>
                <div className="mt-3 grid gap-3 text-sm text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Estado:" : "Status:"}
                    </span>{" "}
                    {getEventLifecycleLabel(
                      localizedEvent.lifecycleStatus,
                      locale,
                    )}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Calendario:" : "Schedule:"}
                    </span>{" "}
                    {localizedEvent.schedule}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Ubicacion:" : "Location:"}
                    </span>{" "}
                    {localizedEvent.location}
                  </p>
                </div>
              </Card>

              <Card className="overflow-hidden border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                    {isEs ? "Solicitud de alianza" : "Partnership Request"}
                  </p>
                  <h2 className="mt-1 text-2xl font-black">
                    {localizedEvent.requestTitle}
                  </h2>
                </div>
                <div className="space-y-4 p-6 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
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
                  <Button asChild variant="primary" size="lg">
                    <Link href="/contact">
                      <MaterialIcon icon="mail" size="md" className="mr-2" />
                      {isEs
                        ? "Iniciar una solicitud de alianza"
                        : "Start a Partnership Request"}
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
