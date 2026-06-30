export type GlobalMenuItem = {
  href: string;
  icon: string;
  label: string;
  subLabel: string;
};

export const globalMenuItemsByLocale: Record<"en" | "es", GlobalMenuItem[]> = {
  en: [
    { href: "/", label: "Home", subLabel: "Base HQ", icon: "home" },
    {
      href: "/about",
      label: "About Us",
      subLabel: "Our Oath",
      icon: "military_tech",
    },
    {
      href: "/services",
      label: "Services",
      subLabel: "Operations",
      icon: "build",
    },
    {
      href: "/projects",
      label: "Projects",
      subLabel: "Portfolio",
      icon: "photo_library",
    },
    {
      href: "/events",
      label: "Events",
      subLabel: "Community Events",
      icon: "event",
    },
    {
      href: "/team",
      label: "Our Team",
      subLabel: "Chain of Command",
      icon: "groups",
    },
    {
      href: "/testimonials",
      label: "Reviews",
      subLabel: "Commendations",
      icon: "star",
    },
    {
      href: "/careers",
      label: "Careers",
      subLabel: "Enlist",
      icon: "work",
    },
    {
      href: "/contact",
      label: "Contact",
      subLabel: "Contact",
      icon: "contact_phone",
    },
    {
      href: "/public-sector",
      label: "Government",
      subLabel: "Public Sector",
      icon: "account_balance",
    },
    {
      href: "/allies",
      label: "Partners",
      subLabel: "Allies",
      icon: "handshake",
    },
    {
      href: "/veterans",
      label: "Veterans",
      subLabel: "Service First",
      icon: "workspace_premium",
    },
    {
      href: "/resources",
      label: "Resources",
      subLabel: "Field Intel",
      icon: "folder_open",
    },
    {
      href: "/faq",
      label: "Help/FAQ",
      subLabel: "Intel Brief",
      icon: "help",
    },
    {
      href: "/safety",
      label: "Safety",
      subLabel: "Force Protection",
      icon: "verified_user",
    },
    {
      href: "/hub",
      label: "Team Hub",
      subLabel: "Operations Hub",
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
      subLabel: "Operaciones",
      icon: "build",
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
      subLabel: "Servicio primero",
      icon: "workspace_premium",
    },
    {
      href: "/resources",
      label: "Recursos",
      subLabel: "Inteligencia de campo",
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
      subLabel: "Proteccion operativa",
      icon: "verified_user",
    },
    {
      href: "/hub",
      label: "Hub del equipo",
      subLabel: "Centro de operaciones",
      icon: "dashboard",
    },
  ],
};
