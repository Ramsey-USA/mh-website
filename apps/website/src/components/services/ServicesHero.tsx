import { EnterpriseRouteHero } from "@/components/enterprise/EnterpriseRouteHero";
import type { SupportedLocale } from "@/lib/i18n/locale";
import { COMPANY_INFO } from "@/lib/constants/company";

export function ServicesHero({
  heroSlogan = COMPANY_INFO.slogan.tertiary,
  locale = "en",
}: Readonly<{ heroSlogan?: string; locale?: SupportedLocale }>) {
  const isEs = locale === "es";

  return (
    <EnterpriseRouteHero
      eyebrow={
        isEs
          ? "Capacidades | Planificacion a entrega"
          : "Capabilities | Planning through turnover"
      }
      title={
        isEs
          ? "Un sistema de entrega. Responsabilidad total."
          : "One delivery system. Full accountability."
      }
      intro={
        isEs
          ? "Preconstruccion, controles de proyecto, seguridad, calidad y ejecucion de campo conectados bajo una sola cadena de responsabilidad."
          : "Preconstruction, project controls, safety, quality, and field execution connected under one accountable delivery chain."
      }
      primarySlogan={COMPANY_INFO.slogan.primary}
      supportingSlogan={heroSlogan}
      primary={{
        href: "/contact",
        label: isEs ? "Iniciar sesion de alcance" : "Start a scope briefing",
      }}
      secondary={{
        href: "/projects",
        label: isEs ? "Revisar evidencia" : "Review project proof",
      }}
      proof={
        isEs
          ? [
              ["Precon", "Alcance, riesgo y constructabilidad"],
              ["Campo", "Produccion, seguridad y calidad"],
              ["Controles", "Costo, cronograma y cambios"],
              ["Cierre", "Entrega y archivo auditable"],
            ]
          : [
              ["Precon", "Scope, risk, and constructability"],
              ["Field", "Production, safety, and quality"],
              ["Controls", "Cost, schedule, and change"],
              ["Closeout", "Turnover and audit-ready record"],
            ]
      }
    />
  );
}
