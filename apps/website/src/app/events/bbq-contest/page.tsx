import type { Metadata } from "next";
import Link from "next/link";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { StructuredData } from "@/components/seo/SeoMeta";
import { Card } from "@/components/ui";
import { buildDualSeoTitle } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getEventLifecycleLabel, upcomingEvents } from "@/lib/data/events";
import { getServerLocale } from "@/lib/i18n/locale.server";
import { generateBreadcrumbSchema } from "@/lib/seo/breadcrumb-schema";
import { withGeoMetadata } from "@/lib/seo/geo-metadata";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();
const EVENT_URL = `${SITE_URL}/events/bbq-contest`;
const bbqContestSeoTitle = buildDualSeoTitle(
  "events",
  "Pacific Northwest Annual BBQ Competition",
);

export const metadata: Metadata = withGeoMetadata({
  title: bbqContestSeoTitle,
  description:
    "Dedicated event page for MH Construction's Pacific Northwest Annual BBQ Competition, including partner coordination updates, schedule planning, and participation details.",
  keywords: [
    "Pacific Northwest Annual BBQ Competition",
    "MH Construction BBQ competition",
    "BBQ event status",
    "BBQ target window",
    "BBQ registration and participation path",
    "Tri-Cities BBQ event",
    "community BBQ competition",
    "Richland BBQ event",
    "Kennewick Pasco community event",
    "construction community events",
    "annual BBQ competition",
    "event planning updates",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: EVENT_URL },
  openGraph: {
    title: bbqContestSeoTitle,
    description:
      "Follow MH Construction updates for the Pacific Northwest Annual BBQ Competition, including partner coordination, timeline milestones, and participation details.",
    url: EVENT_URL,
    type: "website",
    images: [
      {
        url: "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
        width: 1200,
        height: 630,
        alt: "Pacific Northwest Annual BBQ Competition event page by MH Construction",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: bbqContestSeoTitle,
    description:
      "MH Construction Pacific Northwest Annual BBQ Competition updates with timeline milestones and participation information.",
    images: [
      "/images/events/cool-desert-nights/smoke-n-shine-showdown-graphic.webp",
    ],
  },
});

export default async function BbqContestPage() {
  const locale = (await getServerLocale()) === "es" ? "es" : "en";
  const isEs = locale === "es";
  const bbqEvent = upcomingEvents.find(
    (event) => event.id === "bbq-contest-2026",
  );

  const lifecycleLabel = getEventLifecycleLabel(
    bbqEvent?.lifecycleStatus ?? "under-review",
    locale,
  );

  const eventWindow = isEs
    ? (bbqEvent?.windowEs ?? "Otono 2026")
    : (bbqEvent?.window ?? "Fall 2026");

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${EVENT_URL}#webpage`,
    name: isEs
      ? "Competencia Anual BBQ del Pacific Northwest"
      : "Pacific Northwest Annual BBQ Competition",
    description: isEs
      ? "Pagina dedicada para la Competencia Anual BBQ del Pacific Northwest de MH Construction."
      : "Dedicated event page for MH Construction's Pacific Northwest Annual BBQ Competition.",
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
      isEs ? "Evento comunitario" : "Community event",
      "MH Construction",
      isEs ? "Concurso BBQ" : "BBQ contest",
    ],
  };

  return (
    <>
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: isEs ? "Inicio" : "Home", url: SITE_URL },
          { name: isEs ? "Eventos" : "Events", url: `${SITE_URL}/events` },
          {
            name: isEs
              ? "Competencia Anual BBQ del Pacific Northwest"
              : "Pacific Northwest Annual BBQ Competition",
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
                {isEs ? "Pagina dedicada" : "Dedicated Event Page"}
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                {isEs
                  ? "Competencia Anual BBQ del Pacific Northwest"
                  : "Pacific Northwest Annual BBQ Competition"}
              </h1>
              <p className="font-body max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                {isEs
                  ? "Esta ruta se publica desde el centro de eventos de MH Construction para la Competencia Anual BBQ del Pacific Northwest, con estado del evento, calendario y ruta de registro y participacion."
                  : "This route is published from the MH Construction Events hub for the Pacific Northwest Annual BBQ Competition, with partner coordination, schedule milestones, and participation details."}
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
                    {isEs ? "Ventana objetivo" : "Target window"}
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
                    {isEs ? "Tri-Cities, WA" : "Tri-Cities, WA"}
                  </p>
                </article>
              </div>
              <div className="grid gap-3 sm:flex sm:flex-wrap">
                <Link
                  href="/events"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-semibold text-gray-900 transition hover:bg-brand-secondary-light sm:w-auto"
                >
                  <MaterialIcon icon="arrow_back" size="sm" />
                  {isEs ? "Volver al centro de eventos" : "Back to Events Hub"}
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20 sm:w-auto"
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
                {
                  label: isEs
                    ? "Competencia Anual BBQ del Pacific Northwest"
                    : "Pacific Northwest Annual BBQ Competition",
                },
              ]}
            />
          </div>

          <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-8">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                {isEs ? "Experiencia del evento" : "Event Experience"}
              </p>
              <h2 className="mt-2 text-xl font-black sm:text-2xl">
                {isEs
                  ? "Una ruta clara para participantes y aliados"
                  : "A clear route for participants and partners"}
              </h2>
              <p className="font-body mt-3 max-w-3xl text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
                {isEs
                  ? "Esta pagina mantiene el nombre oficial aprobado y organiza la informacion esencial para una experiencia simple: estado del evento, ventana prevista y ruta de registro y participacion."
                  : "This page keeps the approved public event name and organizes the essential information for a simpler experience: event status, target window, and contact paths for sponsorship or participation."}
              </p>

              <div className="mt-5 grid gap-4 md:mt-6 md:grid-cols-2">
                <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                    {isEs ? "Lo que puede esperar" : "What to expect"}
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="mt-0.5 text-brand-primary"
                      />
                      <span>
                        {isEs
                          ? "Actualizaciones de calendario y estado en una sola pagina"
                          : "Schedule and status updates in one place"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="mt-0.5 text-brand-primary"
                      />
                      <span>
                        {isEs
                          ? "Coordinacion directa con el equipo de MH Construction"
                          : "Direct coordination with the MH Construction team"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MaterialIcon
                        icon="check_circle"
                        size="sm"
                        className="mt-0.5 text-brand-primary"
                      />
                      <span>
                        {isEs
                          ? "Publicacion estable para compartir la ruta con aliados"
                          : "Stable publishing path to share with partners"}
                      </span>
                    </li>
                  </ul>
                </article>

                <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                  <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                    {isEs ? "Como participar" : "How to participate"}
                  </p>
                  <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <MaterialIcon
                        icon="groups"
                        size="sm"
                        className="mt-0.5 text-brand-primary"
                      />
                      <span>
                        {isEs
                          ? "Aliados comunitarios: coordinar apoyo de evento"
                          : "Community partners: coordinate event support"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MaterialIcon
                        icon="restaurant"
                        size="sm"
                        className="mt-0.5 text-brand-primary"
                      />
                      <span>
                        {isEs
                          ? "Equipos BBQ: registrar interes y disponibilidad"
                          : "BBQ teams: register interest and availability"}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <MaterialIcon
                        icon="campaign"
                        size="sm"
                        className="mt-0.5 text-brand-primary"
                      />
                      <span>
                        {isEs
                          ? "Patrocinadores: iniciar plan de colaboracion"
                          : "Sponsors: start a collaboration plan"}
                      </span>
                    </li>
                  </ul>
                </article>
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
                    /events/bbq-contest
                  </p>
                </div>
              </Card>

              <Card className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900/40 sm:p-6">
                <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                  {isEs ? "Confianza de marca" : "Brand Trust"}
                </p>
                <h3 className="mt-2 text-xl font-black text-gray-900 dark:text-white">
                  {isEs
                    ? "Liderazgo veterano, enfoque en servicio"
                    : "Veteran-led leadership, service-first planning"}
                </h3>
                <p className="font-body mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {isEs
                    ? "La coordinacion del evento sigue el mismo estandar operativo que aplicamos en nuestros proyectos de construccion: comunicacion clara, seguimiento responsable y respeto por cada aliado comunitario."
                    : "Event coordination follows the same operational standard we apply to construction delivery: clear communication, accountable follow-through, and respect for every community partner."}
                </p>
                <Link
                  href="/veterans"
                  className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-4 transition-colors hover:text-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:text-brand-secondary dark:hover:text-brand-secondary-light"
                >
                  <MaterialIcon icon="military_tech" size="sm" />
                  {isEs
                    ? "Conocer nuestro compromiso con veteranos"
                    : "Learn about our veteran commitment"}
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
