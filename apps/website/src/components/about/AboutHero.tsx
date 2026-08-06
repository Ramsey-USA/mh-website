import { COMPANY_INFO } from "@/lib/constants/company";
import { getHeroPageSlogan } from "@/lib/content/hero-page-slogans";
import { EnterpriseRouteHero } from "@/components/enterprise/EnterpriseRouteHero";

export function AboutHero({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) {
  const isEs = title.toLowerCase().includes("sobre");

  return (
    <EnterpriseRouteHero
      eyebrow={`${subtitle} | ${isEs ? "Empresa" : "Company"}`}
      title={title}
      intro={description}
      primary={{ href: "/projects", label: isEs ? "Ver proyectos" : "Review project proof" }}
      secondary={{ href: "/contact", label: isEs ? "Hablar con MH" : "Brief the MH team" }}
      proof={[
        ["2011", isEs ? "Fundacion de la empresa" : "Company founded"],
        ["2025", isEs ? "Propiedad de veterano" : "Veteran-owned transition"],
        ["WA, OR, ID", isEs ? "Territorio autorizado" : "Licensed territory"],
        [COMPANY_INFO.slogan.primary, getHeroPageSlogan("about").slogan],
      ]}
    />
  );
}
