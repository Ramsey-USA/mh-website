import { EnterpriseRouteHero } from "@/components/enterprise/EnterpriseRouteHero";
import type { SupportedLocale } from "@/lib/i18n/locale";
import { COMPANY_INFO } from "@/lib/constants/company";

export function ProjectsHero({
  locale = "en",
}: Readonly<{ locale?: SupportedLocale }>) {
  const isEs = locale === "es";

  return (
    <EnterpriseRouteHero
      eyebrow={
        isEs
          ? "Prueba del proyecto | Washington, Oregon, Idaho"
          : "Project proof | Washington, Oregon, Idaho"
      }
      title={isEs ? "El trabajo lleva el registro." : "The work carries the record."}
      intro={
        isEs
          ? "Casos publicos organizados por condiciones, alcance, controles de entrega y resultados documentados."
          : "Public case files organized around project conditions, executed scope, delivery controls, and documented results."
      }
      primarySlogan={COMPANY_INFO.slogan.primary}
      supportingSlogan={COMPANY_INFO.slogan.tertiary}
      primary={{
        href: "#portfolio",
        label: isEs ? "Revisar casos" : "Review case files",
      }}
      secondary={{
        href: "/contact",
        label: isEs ? "Presentar un proyecto" : "Brief a project",
      }}
      proof={
        isEs
          ? [
              ["Alcance", "Trabajo ejecutado"],
              ["Control", "Decisiones trazables"],
              ["Seguridad", "Planificacion documentada"],
              ["Resultado", "Entrega verificable"],
            ]
          : [
              ["Scope", "Work actually executed"],
              ["Control", "Traceable decisions"],
              ["Safety", "Documented planning"],
              ["Outcome", "Verifiable delivery"],
            ]
      }
    />
  );
}
