"use client";

import Link from "next/link";

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";
import { Card } from "@/components/ui";
import { trackClick } from "@/lib/analytics/tracking";
import {
  eventPartnerUrls,
  getEventLifecycleLabel,
  upcomingEvents,
} from "@/lib/data/events";

type IronmanVolunteerPageClientProps = {
  isEs: boolean;
};

const IRONMAN_VOLUNTEER_URL =
  "https://www.ironman.com/races/im703-washington-tri-cities/volunteer";

export function IronmanVolunteerPageClient({
  isEs,
}: IronmanVolunteerPageClientProps) {
  const locale = isEs ? "es" : "en";
  const ironmanEvent = upcomingEvents.find(
    (event) => event.id === "ironman-volunteer-2026",
  );
  const lifecycleLabel = getEventLifecycleLabel(
    ironmanEvent?.lifecycleStatus ?? "confirmed",
    locale,
  );
  const eventWindow = isEs
    ? (ironmanEvent?.windowEs ?? "20 de septiembre de 2026")
    : (ironmanEvent?.window ?? "September 20, 2026");

  const trackIronmanVolunteerCta = () => {
    trackClick("events-ironman-volunteer-official-signup", {
      event_category: "events",
      section: "hero",
      action: "open_official_signup",
    });
  };

  const trackChamberDirectoryCta = () => {
    trackClick("events-ironman-volunteer-chamber-directory", {
      event_category: "events",
      section: "partnerships",
      action: "open_chamber_directory",
    });
  };

  return (
    <main className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <section className="relative overflow-hidden bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 py-12 text-white sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-primary/35 via-gray-900/70 to-gray-900/85" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-secondary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-4 sm:space-y-5">
            <p className="font-subheading text-xs font-semibold uppercase tracking-[0.18em] text-brand-secondary/90">
              {isEs
                ? "Proceso anual de voluntariado"
                : "Yearly Volunteer Process"}
            </p>
            <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Cuisine Solutions IRONMAN 70.3 Washington Tri-Cities
            </h1>
            <p className="font-body max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
              {isEs
                ? "Esta ruta organiza la informacion del proceso anual de voluntariado para IRONMAN 70.3 Tri-Cities, con estado del evento, ruta de registro y participacion, y coordinacion con MH Construction y aliados locales."
                : "This route organizes the annual IRONMAN 70.3 Tri-Cities volunteer process, including event status, participation paths, and MH Construction community coordination."}
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
                  {isEs ? "Fecha del evento" : "Event date"}
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
              <a
                href={IRONMAN_VOLUNTEER_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackIronmanVolunteerCta}
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary px-5 py-3 text-sm font-semibold text-gray-900 transition hover:-translate-y-0.5 hover:bg-brand-secondary-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary sm:w-auto"
              >
                <MaterialIcon icon="open_in_new" size="sm" />
                {isEs ? "Registrarse en IRONMAN" : "Volunteer on IRONMAN"}
              </a>
              <Link
                href="/events"
                className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border-2 border-white/35 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary sm:w-auto"
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
              {
                label: isEs
                  ? "Voluntariado IRONMAN 70.3"
                  : "IRONMAN 70.3 Volunteer Process",
              },
            ]}
          />
        </div>

        <div className="grid gap-5 sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <Card className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800 sm:p-8">
            <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
              {isEs ? "Experiencia del voluntariado" : "Volunteer Experience"}
            </p>
            <h2 className="mt-2 text-xl font-black sm:text-2xl">
              {isEs
                ? "Una ruta clara para voluntarios y aliados"
                : "A clear route for volunteers and partners"}
            </h2>
            <p className="font-body mt-3 max-w-3xl text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base">
              {isEs
                ? "Esta pagina centraliza el proceso oficial de voluntariado IRONMAN, con estado del evento, fecha confirmada y ruta de registro y participacion junto con coordinacion con MH Construction."
                : "This page centralizes the official IRONMAN volunteer process with event status, confirmed timing, and MH Construction coordination options for participation and community support."}
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
                        ? "Acceso directo al registro oficial de IRONMAN"
                        : "Direct access to official IRONMAN volunteer signup"}
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
                        ? "Fecha y estado confirmados en una sola ruta"
                        : "Confirmed schedule and status in one route"}
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
                        ? "Canales de coordinacion para aliados locales"
                        : "Coordination channels for local partners"}
                    </span>
                  </li>
                </ul>
              </article>

              <article className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900/50">
                <p className="font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-brand-secondary">
                  {isEs ? "Enfoque de ejecucion" : "Execution Focus"}
                </p>
                <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <MaterialIcon
                      icon="construction"
                      size="sm"
                      className="mt-0.5 text-brand-primary"
                    />
                    <span>
                      {isEs
                        ? "Logistica y comunicacion con disciplina operativa"
                        : "Logistics and communication with operational discipline"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon
                      icon="groups"
                      size="sm"
                      className="mt-0.5 text-brand-primary"
                    />
                    <span>
                      {isEs
                        ? "Colaboracion con camaras y comunidad empresarial"
                        : "Collaboration with chambers and business community"}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <MaterialIcon
                      icon="military_tech"
                      size="sm"
                      className="mt-0.5 text-brand-primary"
                    />
                    <span>
                      {isEs
                        ? "Liderazgo veterano aplicado al servicio comunitario"
                        : "Veteran-led leadership applied to community service"}
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
                    {isEs ? "Fecha:" : "Date:"}
                  </span>{" "}
                  {eventWindow}
                </p>
                <p>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {isEs ? "Portal oficial:" : "Official portal:"}
                  </span>{" "}
                  IRONMAN 70.3
                </p>
              </div>

              <div className="mt-4 grid gap-3">
                <a
                  href={IRONMAN_VOLUNTEER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackIronmanVolunteerCta}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-brand-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary"
                >
                  <MaterialIcon icon="open_in_new" size="sm" />
                  {isEs
                    ? "Voluntariado oficial en IRONMAN"
                    : "Official IRONMAN Volunteer Signup"}
                </a>
                <a
                  href={eventPartnerUrls.chamberSchedule}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={trackChamberDirectoryCta}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border-2 border-brand-primary/35 bg-white px-5 py-3 text-sm font-semibold text-brand-primary transition hover:-translate-y-0.5 hover:bg-brand-primary/6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary dark:border-brand-secondary/45 dark:bg-gray-900 dark:text-brand-secondary"
                >
                  <MaterialIcon icon="storefront" size="sm" />
                  {isEs
                    ? "Directorio de camara local"
                    : "Local Chamber Directory"}
                </a>
              </div>
            </Card>

            <Card className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-lg dark:border-gray-700 dark:bg-gray-900/40 sm:p-6">
              <p className="font-subheading text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary">
                {isEs ? "Confianza de marca" : "Brand Trust"}
              </p>
              <h3 className="mt-2 text-xl font-black text-gray-900 dark:text-white">
                {isEs
                  ? "Liderazgo veterano, servicio confiable"
                  : "Veteran-led leadership, reliable service"}
              </h3>
              <p className="font-body mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {isEs
                  ? "Nuestro equipo aplica el mismo estandar de construccion y cumplimiento que usamos en obra: preparacion clara, seguimiento responsable y respeto por cada voluntario y aliado comunitario."
                  : "Our team applies the same construction and compliance standard used on active projects: clear preparation, accountable follow-through, and respect for every volunteer and community partner."}
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
  );
}
