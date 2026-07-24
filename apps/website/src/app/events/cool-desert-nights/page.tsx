import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { Card } from "@/components/ui";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  getEventLifecycleLabel,
  getEventRecordBySlug,
  getLocalizedEventRecord,
} from "@/lib/data/events";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { createOgImageUrl } from "@/lib/seo/og-image";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const EVENT_URL = `${SITE_URL}/events/cool-desert-nights`;
const coolDesertNightsSeoTitle = buildDualSeoTitle(
  "events",
  "Cool Desert Nights 2026",
);

export const metadata: Metadata = withGeoMetadata({
  title: coolDesertNightsSeoTitle,
  description:
    "Archived event route for MH Construction's Cool Desert Nights 2026 record, including event status, archived outcomes, and future coordination pathways.",
  keywords: [
    "Cool Desert Nights 2026",
    "Smoke n Shine results",
    "Cool Desert Nights event status",
    "Cool Desert Nights archived record",
    "Cool Desert Nights archive route",
    "Tri-Cities event archive",
    "Richland community event record",
    "MH Construction event archive",
    "event recap and outcomes",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: EVENT_URL },
  openGraph: {
    title: coolDesertNightsSeoTitle,
    description:
      "Review the Cool Desert Nights 2026 archive with event status, recap outcomes, and coordination pathways for future community events.",
    url: EVENT_URL,
    type: "website",
    images: [
      {
        url: "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
        width: 1200,
        height: 630,
        alt: "Cool Desert Nights 2026 archive by MH Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: coolDesertNightsSeoTitle,
    description:
      "See the Cool Desert Nights 2026 archived event record from MH Construction with verified outcomes and future coordination context.",
    images: [createOgImageUrl("event", "cool-desert-nights")],
  },
});

export default async function CoolDesertNightsPage() {
  const locale = (await getServerLocale()) === "es" ? "es" : "en";
  const isEs = locale === "es";
  const eventRecord = getEventRecordBySlug("cool-desert-nights");
  const localizedEvent = eventRecord
    ? getLocalizedEventRecord(eventRecord, locale)
    : undefined;

  const lifecycleLabel = getEventLifecycleLabel("archived", locale);
  const eventWindow = isEs ? "Junio 2026" : "June 2026";

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${EVENT_URL}#webpage`,
    name: isEs ? "Cool Desert Nights 2026" : "Cool Desert Nights 2026",
    description: isEs
      ? "Ruta de archivo para Cool Desert Nights 2026 con estado del evento, resultados verificados y ruta de coordinacion para futuros eventos comunitarios."
      : "Archive route for Cool Desert Nights 2026 with event status, verified outcomes, and coordination pathways for future community events.",
    url: EVENT_URL,
    isPartOf: {
      "@id": `${SITE_URL}/events#collection`,
    },
    inLanguage: isEs ? "es-US" : "en-US",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp`,
    },
    about: [
      "Cool Desert Nights",
      isEs ? "Ruta de archivo" : "Archive route",
      "MH Construction",
    ],
  };

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: isEs ? "Inicio" : "Home", url: SITE_URL },
          { name: isEs ? "Eventos" : "Events", url: `${SITE_URL}/events` },
          {
            name: "Cool Desert Nights 2026",
            url: EVENT_URL,
          },
        ])}
      />
      <StructuredData data={pageSchema} />

      <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
        <section className="relative overflow-hidden bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 py-12 text-white sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-primary/35 via-gray-900/70 to-gray-900/85" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-secondary/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl space-y-4 sm:space-y-5">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary/90">
                {isEs ? "Ruta de archivo" : "Archive Route"}
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Cool Desert Nights 2026
              </h1>
              <p className="font-body max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                {isEs
                  ? "Esta ruta conserva el archivo oficial de Cool Desert Nights 2026, con estado del evento, resultados publicados y ruta de coordinacion para futuras alianzas comunitarias."
                  : "This route preserves the official Cool Desert Nights 2026 archive with event status, published outcomes, and coordination pathways for future community partnerships."}
              </p>
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                {isEs
                  ? "Built on Quality, Backed by Trust. (Construido sobre calidad, respaldado por confianza.) Standards high on every site, every day. (Estandares altos en cada obra, cada dia.)"
                  : "Built on Quality, Backed by Trust. Standards high on every site, every day."}
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
                    {isEs ? "Ventana del evento" : "Event window"}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white sm:text-base">
                    {eventWindow}
                  </p>
                </article>
                <article className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="font-subheading text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-secondary">
                    {isEs ? "Cobertura" : "Coverage"}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white sm:text-base">
                    Tri-Cities, WA
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
                  <MaterialIcon icon="groups" size="sm" />
                  {isEs ? "Solicitar coordinacion" : "Request Coordination"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: isEs ? "Inicio" : "Home", href: "/" },
                { label: isEs ? "Eventos" : "Events", href: "/events" },
                { label: "Cool Desert Nights 2026" },
              ]}
            />
          </div>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                {isEs ? "Resumen del archivo" : "Archive Recap"}
              </p>
              <h2 className="mt-2 text-xl font-black sm:text-2xl">
                {localizedEvent?.recapTitle ??
                  (isEs ? "Resumen del evento" : "Event Recap")}
              </h2>

              <div className="mt-5 grid gap-4 md:mt-6">
                <Image
                  src={
                    localizedEvent?.primaryImage ??
                    "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp"
                  }
                  alt={localizedEvent?.title ?? "Cool Desert Nights 2026"}
                  width={1280}
                  height={720}
                  className="w-full rounded-2xl object-cover shadow-lg"
                />

                <ul className="space-y-2.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
                  {(localizedEvent?.recapBullets ?? []).map((bullet) => (
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
                    {eventWindow}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {isEs ? "Ruta:" : "Route:"}
                    </span>{" "}
                    /events/cool-desert-nights
                  </p>
                </div>
              </Card>

              <Card className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900/40 sm:p-6">
                <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                  {isEs ? "Confianza de marca" : "Brand Trust"}
                </p>
                <h3 className="mt-2 text-xl font-black text-gray-900 dark:text-white">
                  {isEs
                    ? "Registro archivado con responsabilidad"
                    : "Archived record with accountability"}
                </h3>
                <p className="font-body mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {isEs
                    ? "Conservar este archivo garantiza transparencia para aliados, clientes y comunidad, con resultados verificables y continuidad en la coordinacion de futuros eventos."
                    : "Preserving this archive ensures transparency for partners, clients, and the community, with verifiable outcomes and continuity for future event coordination."}
                </p>
                <Link
                  href="/events"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                >
                  <MaterialIcon icon="event" size="sm" />
                  {isEs
                    ? "Ver otras rutas de eventos"
                    : "Explore other event routes"}
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
