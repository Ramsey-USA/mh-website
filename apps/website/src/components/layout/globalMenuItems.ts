export type GlobalMenuItem = {
  href: string;
  icon: string;
  label: string;
  subLabel: string;
};

import { PAGE_TERMINOLOGY } from "@/lib/branding/page-names";
import { PAGE_ICONS, SEMANTIC_ICONS } from "@/lib/constants/navigation-icons";

export const globalMenuItemsByLocale: Record<"en" | "es", GlobalMenuItem[]> = {
  en: [
    {
      href: "/",
      label: PAGE_TERMINOLOGY.home.seoName,
      subLabel: PAGE_TERMINOLOGY.home.mhBrandName,
      icon: PAGE_ICONS.home,
    },
    {
      href: "/about",
      label: PAGE_TERMINOLOGY.about.seoName,
      subLabel: PAGE_TERMINOLOGY.about.mhBrandName,
      icon: PAGE_ICONS.about,
    },
    {
      href: "/services",
      label: PAGE_TERMINOLOGY.services.seoName,
      subLabel: PAGE_TERMINOLOGY.services.mhBrandName,
      icon: SEMANTIC_ICONS.map,
    },
    {
      href: "/projects",
      label: PAGE_TERMINOLOGY.projects.seoName,
      subLabel: PAGE_TERMINOLOGY.projects.mhBrandName,
      icon: PAGE_ICONS.projects,
    },
    {
      href: "/events",
      label: PAGE_TERMINOLOGY.events.seoName,
      subLabel: PAGE_TERMINOLOGY.events.mhBrandName,
      icon: PAGE_ICONS.events,
    },
    {
      href: "/team",
      label: PAGE_TERMINOLOGY.team.seoName,
      subLabel: PAGE_TERMINOLOGY.team.mhBrandName,
      icon: PAGE_ICONS.team,
    },
    {
      href: "/jeremy-thamert",
      label: "Jeremy Thamert",
      subLabel: "Owner & President",
      icon: PAGE_ICONS.jeremyThamert,
    },
    {
      href: "/testimonials",
      label: PAGE_TERMINOLOGY.testimonials.seoName,
      subLabel: PAGE_TERMINOLOGY.testimonials.mhBrandName,
      icon: PAGE_ICONS.testimonials,
    },
    {
      href: "/careers",
      label: PAGE_TERMINOLOGY.careers.seoName,
      subLabel: PAGE_TERMINOLOGY.careers.mhBrandName,
      icon: PAGE_ICONS.careers,
    },
    {
      href: "/contact",
      label: PAGE_TERMINOLOGY.contact.seoName,
      subLabel: PAGE_TERMINOLOGY.contact.mhBrandName,
      icon: PAGE_ICONS.contact,
    },
    {
      href: "/public-sector",
      label: PAGE_TERMINOLOGY.publicSector.seoName,
      subLabel: PAGE_TERMINOLOGY.publicSector.mhBrandName,
      icon: PAGE_ICONS.publicSector,
    },
    {
      href: "/allies",
      label: PAGE_TERMINOLOGY.allies.seoName,
      subLabel: PAGE_TERMINOLOGY.allies.mhBrandName,
      icon: PAGE_ICONS.allies,
    },
    {
      href: "/veterans",
      label: PAGE_TERMINOLOGY.veterans.seoName,
      subLabel: PAGE_TERMINOLOGY.veterans.mhBrandName,
      icon: PAGE_ICONS.veterans,
    },
    {
      href: "/resources",
      label: PAGE_TERMINOLOGY.resources.seoName,
      subLabel: PAGE_TERMINOLOGY.resources.mhBrandName,
      icon: PAGE_ICONS.resources,
    },
    {
      href: "/faq",
      label: PAGE_TERMINOLOGY.faq.seoName,
      subLabel: PAGE_TERMINOLOGY.faq.mhBrandName,
      icon: PAGE_ICONS.faq,
    },
    {
      href: "/safety",
      label: PAGE_TERMINOLOGY.safety.seoName,
      subLabel: PAGE_TERMINOLOGY.safety.mhBrandName,
      icon: PAGE_ICONS.safety,
    },
    {
      href: "/hub",
      label: PAGE_TERMINOLOGY.hub.seoName,
      subLabel: PAGE_TERMINOLOGY.hub.mhBrandName,
      icon: PAGE_ICONS.hub,
    },
  ],
  es: [
    {
      href: "/",
      label: "Inicio",
      subLabel: "Base central",
      icon: PAGE_ICONS.home,
    },
    {
      href: "/about",
      label: "Nosotros",
      subLabel: "Nuestro compromiso",
      icon: PAGE_ICONS.about,
    },
    {
      href: "/services",
      label: "Servicios",
      subLabel: "Rutas",
      icon: SEMANTIC_ICONS.map,
    },
    {
      href: "/projects",
      label: "Proyectos",
      subLabel: "Portafolio",
      icon: PAGE_ICONS.projects,
    },
    {
      href: "/events",
      label: "Eventos",
      subLabel: "Eventos comunitarios",
      icon: PAGE_ICONS.events,
    },
    {
      href: "/team",
      label: "Nuestro equipo",
      subLabel: "Cadena de mando",
      icon: PAGE_ICONS.team,
    },
    {
      href: "/jeremy-thamert",
      label: "Jeremy Thamert",
      subLabel: "Propietario y Presidente",
      icon: PAGE_ICONS.jeremyThamert,
    },
    {
      href: "/testimonials",
      label: "Reseñas",
      subLabel: "Reconocimientos",
      icon: PAGE_ICONS.testimonials,
    },
    {
      href: "/careers",
      label: "Carreras",
      subLabel: "Únete",
      icon: PAGE_ICONS.careers,
    },
    {
      href: "/contact",
      label: "Contacto",
      subLabel: "Contacto",
      icon: PAGE_ICONS.contact,
    },
    {
      href: "/public-sector",
      label: "Gobierno",
      subLabel: "Sector público",
      icon: PAGE_ICONS.publicSector,
    },
    {
      href: "/allies",
      label: "Aliados",
      subLabel: "Socios",
      icon: PAGE_ICONS.allies,
    },
    {
      href: "/veterans",
      label: "Veteranos",
      subLabel: "Veteranos",
      icon: PAGE_ICONS.veterans,
    },
    {
      href: "/resources",
      label: "Recursos",
      subLabel: "Recursos",
      icon: PAGE_ICONS.resources,
    },
    {
      href: "/faq",
      label: "Ayuda/Preguntas",
      subLabel: "Informe rápido",
      icon: PAGE_ICONS.faq,
    },
    {
      href: "/safety",
      label: "Seguridad",
      subLabel: "Seguridad",
      icon: PAGE_ICONS.safety,
    },
    {
      href: "/hub",
      label: "Hub del equipo",
      subLabel: "Portal del personal",
      icon: PAGE_ICONS.hub,
    },
  ],
};
