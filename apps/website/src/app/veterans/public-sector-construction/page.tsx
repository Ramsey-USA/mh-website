import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/Breadcrumbs";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { TrackedBridgeButton, TrackedBridgeLink } from "@/components/analytics";
import { COMPANY_INFO } from "@/lib/constants/company";
import { getServerLocale } from "@/lib/i18n/locale.server";

const SITE_URL = COMPANY_INFO.urls.getSiteUrl();

export const metadata: Metadata = {
  title: "Veteran-Led Public Sector Construction | MH Construction",
  description:
    "Bridge veteran-focused values with public-sector project delivery. Learn how MH Construction aligns disciplined execution, transparency, and compliance for government work.",
  alternates: {
    canonical: `${SITE_URL}/veterans/public-sector-construction`,
  },
  robots: { index: true, follow: true },
};

export default async function VeteranPublicSectorConstructionPage() {
  const locale = await getServerLocale();
  const isEs = locale === "es";

  return (
    <main className="bg-white dark:bg-gray-950 min-h-screen">
      <section className="border-b border-gray-200 bg-linear-to-br from-gray-950 via-brand-primary to-gray-950 px-4 py-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: isEs ? "Inicio" : "Home", href: "/" },
              { label: isEs ? "Veteranos" : "Veterans", href: "/veterans" },
              {
                label: isEs
                  ? "Construcción del Sector Público"
                  : "Public Sector Construction",
              },
            ]}
            className="mb-6 text-white/70"
          />
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-brand-secondary">
            {isEs ? "Puente para Veteranos" : "Veteran Bridge"}
          </p>
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            {isEs
              ? "Ruta de Construcción del Sector Público Liderada por Veteranos"
              : "Veteran-Led Public Sector Construction Path"}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/85">
            {isEs
              ? "Esta página conecta valores centrados en veteranos con requisitos de proyectos gubernamentales para que agencias públicas y equipos orientados a la misión puedan avanzar de la intención a la ejecución con una planificación clara."
              : "This page connects veteran-centered values with government project requirements so public agencies and mission-driven teams can move from intent to execution with clear planning."}
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {[
            {
              icon: "account_balance",
              title: isEs
                ? "Entrega del Sector Público"
                : "Public Sector Delivery",
              text: isEs
                ? "Revisa cómo el flujo de entrega gubernamental se alinea con la ejecución de proyectos liderada por veteranos."
                : "Review how the government delivery workflow aligns with veteran-led project execution.",
              href: "/public-sector",
              cta: isEs
                ? "Explorar página del sector público"
                : "Explore public sector page",
            },
            {
              icon: "verified",
              title: isEs ? "Flujo de Cumplimiento" : "Compliance Workflow",
              text: isEs
                ? "Consulta una ruta práctica de cumplimiento para preconstrucción, documentación y preparación de adquisiciones."
                : "See a practical compliance pathway for preconstruction, documentation, and procurement readiness.",
              href: "/public-sector/veteran-led-compliance",
              cta: isEs
                ? "Revisar ruta de cumplimiento"
                : "Review compliance pathway",
            },
            {
              icon: "travel_explore",
              title: isEs
                ? "Cobertura de Mercado Triestatal"
                : "Tri-State Market Coverage",
              text: isEs
                ? "Relaciona oportunidades gubernamentales de Washington, Oregón e Idaho con la cobertura regional de servicios."
                : "Map Washington, Oregon, and Idaho government opportunities to regional service coverage.",
              href: "/public-sector/tri-state-government-construction",
              cta: isEs
                ? "Ver estrategia triestatal"
                : "View tri-state strategy",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <MaterialIcon
                icon={item.icon}
                size="lg"
                className="text-brand-primary"
              />
              <h2 className="mt-4 text-xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
                {item.text}
              </p>
              <TrackedBridgeLink
                href={item.href}
                trackId={`veteran-bridge-${item.href}`}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:underline dark:text-brand-primary-light"
              >
                {item.cta}
                <MaterialIcon icon="arrow_forward" size="sm" />
              </TrackedBridgeLink>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-brand-primary/20 bg-brand-primary/5 p-6 dark:border-brand-primary/30 dark:bg-brand-primary/10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isEs
              ? "¿Listo para definir el alcance de un proyecto gubernamental?"
              : "Ready to scope a government project?"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-gray-300">
            {isEs
              ? "Comienza con una conversación directa de planificación y alinea el alcance, la ruta de cumplimiento y la secuencia de entrega."
              : "Start with a direct planning conversation and align the scope, compliance path, and delivery sequence."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedBridgeButton
              href="/contact"
              trackId="veteran-bridge-contact"
            >
              {isEs ? "Contactar al equipo" : "Contact the team"}
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/services/municipal-government"
              trackId="veteran-bridge-municipal-service"
              variant="outline"
            >
              {isEs
                ? "Línea de servicio municipal y gubernamental"
                : "Municipal and government service line"}
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/locations/yakima"
              trackId="veteran-bridge-yakima"
              variant="outline"
            >
              {isEs
                ? "Mercado del sector público de Yakima"
                : "Yakima public-sector market"}
            </TrackedBridgeButton>
            <TrackedBridgeButton
              href="/locations/pendleton"
              trackId="veteran-bridge-pendleton"
              variant="outline"
            >
              {isEs
                ? "Mercado de ejecución gubernamental de Pendleton"
                : "Pendleton government delivery market"}
            </TrackedBridgeButton>
          </div>
        </div>
      </section>
    </main>
  );
}
