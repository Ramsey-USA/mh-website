export type GlobalMenuItem = {
  href: string;
  icon: string;
  label: string;
  subLabel: string;
};

import { PAGE_TERMINOLOGY } from "@/lib/branding/page-names";

export const globalMenuItemsByLocale: Record<"en" | "es", GlobalMenuItem[]> = {
  en: [
    {
      href: "/",
      label: PAGE_TERMINOLOGY.home.seoName,
      subLabel: PAGE_TERMINOLOGY.home.mhBrandName,
      icon: "home",
    },
    {
      href: "/about",
      label: PAGE_TERMINOLOGY.about.seoName,
      subLabel: PAGE_TERMINOLOGY.about.mhBrandName,
      icon: "military_tech",
    },
    {
      href: "/services",
      label: PAGE_TERMINOLOGY.services.seoName,
      subLabel: PAGE_TERMINOLOGY.services.mhBrandName,
      icon: "map",
    },
    {
      href: "/projects",
      label: PAGE_TERMINOLOGY.projects.seoName,
      subLabel: PAGE_TERMINOLOGY.projects.mhBrandName,
      icon: "photo_library",
    },
    {
      href: "/events",
      label: PAGE_TERMINOLOGY.events.seoName,
      subLabel: PAGE_TERMINOLOGY.events.mhBrandName,
      icon: "event",
    },
    {
      href: "/team",
      label: PAGE_TERMINOLOGY.team.seoName,
      subLabel: PAGE_TERMINOLOGY.team.mhBrandName,
      icon: "groups",
    },
    {
      href: "/jeremy-thamert",
      label: "Jeremy Thamert",
      subLabel: "Owner & President",
      icon: "person",
    },
    {
      href: "/testimonials",
      label: PAGE_TERMINOLOGY.testimonials.seoName,
      subLabel: PAGE_TERMINOLOGY.testimonials.mhBrandName,
      icon: "star",
    },
    {
      href: "/careers",
      label: PAGE_TERMINOLOGY.careers.seoName,
      subLabel: PAGE_TERMINOLOGY.careers.mhBrandName,
      icon: "work",
    },
    {
      href: "/contact",
      label: PAGE_TERMINOLOGY.contact.seoName,
      subLabel: PAGE_TERMINOLOGY.contact.mhBrandName,
      icon: "contact_phone",
    },
    {
      href: "/public-sector",
      label: PAGE_TERMINOLOGY.publicSector.seoName,
      subLabel: PAGE_TERMINOLOGY.publicSector.mhBrandName,
      icon: "account_balance",
    },
    {
      href: "/allies",
      label: PAGE_TERMINOLOGY.allies.seoName,
      subLabel: PAGE_TERMINOLOGY.allies.mhBrandName,
      icon: "handshake",
    },
    {
      href: "/veterans",
      label: PAGE_TERMINOLOGY.veterans.seoName,
      subLabel: PAGE_TERMINOLOGY.veterans.mhBrandName,
      icon: "workspace_premium",
    },
    {
      href: "/resources",
      label: PAGE_TERMINOLOGY.resources.seoName,
      subLabel: PAGE_TERMINOLOGY.resources.mhBrandName,
      icon: "folder_open",
    },
    {
      href: "/faq",
      label: PAGE_TERMINOLOGY.faq.seoName,
      subLabel: PAGE_TERMINOLOGY.faq.mhBrandName,
      icon: "help",
    },
    {
      href: "/safety",
      label: PAGE_TERMINOLOGY.safety.seoName,
      subLabel: PAGE_TERMINOLOGY.safety.mhBrandName,
      icon: "verified_user",
    },
    {
      href: "/hub",
      label: PAGE_TERMINOLOGY.hub.seoName,
      subLabel: PAGE_TERMINOLOGY.hub.mhBrandName,
      icon: "dashboard",
    },
  ],
  es: [
    { href: "/", label: "Inicio", subLabel: "Base central", icon: "home" },
    {
      href: "/about",
      label: "Nosotros",
      subLabel: "Nuestro compromiso",
      icon: "military_tech",
    },
    {
      href: "/services",
      label: "Servicios",
      subLabel: "Rutas",
      icon: "map",
    },
    {
      href: "/projects",
      label: "Proyectos",
      subLabel: "Portafolio",
      icon: "photo_library",
    },
    {
      href: "/events",
      label: "Eventos",
      subLabel: "Eventos comunitarios",
      icon: "event",
    },
    {
      href: "/team",
      label: "Nuestro equipo",
      subLabel: "Cadena de mando",
      icon: "groups",
    },
    {
      href: "/jeremy-thamert",
      label: "Jeremy Thamert",
      subLabel: "Propietario y Presidente",
      icon: "person",
    },
    {
      href: "/testimonials",
      label: "Reseñas",
      subLabel: "Reconocimientos",
      icon: "star",
    },
    {
      href: "/careers",
      label: "Carreras",
      subLabel: "Únete",
      icon: "work",
    },
    {
      href: "/contact",
      label: "Contacto",
      subLabel: "Contacto",
      icon: "contact_phone",
    },
    {
      href: "/public-sector",
      label: "Gobierno",
      subLabel: "Sector público",
      icon: "account_balance",
    },
    {
      href: "/allies",
      label: "Aliados",
      subLabel: "Socios",
      icon: "handshake",
    },
    {
      href: "/veterans",
      label: "Veteranos",
      subLabel: "Veteranos",
      icon: "workspace_premium",
    },
    {
      href: "/resources",
      label: "Recursos",
      subLabel: "Recursos",
      icon: "folder_open",
    },
    {
      href: "/faq",
      label: "Ayuda/Preguntas",
      subLabel: "Informe rápido",
      icon: "help",
    },
    {
      href: "/safety",
      label: "Seguridad",
      subLabel: "Seguridad",
      icon: "verified_user",
    },
    {
      href: "/hub",
      label: "Hub del equipo",
      subLabel: "Portal del personal",
      icon: "dashboard",
    },
  ],
};
