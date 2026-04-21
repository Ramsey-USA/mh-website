"use client";

import {
  useEffect,
  useState,
  useRef,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PNWStatesMap } from "@/components/icons/PNWStatesMap";
import { AdminSignInModal } from "@/components/ui/modals/AdminSignInModal";
import {
  TrackedPhoneLink,
  TrackedEmailLink,
  TrackedLocationLink,
} from "@/components/analytics/TrackedContactLinks";
import { COMPANY_INFO } from "@/lib/constants/company";
import { DASHBOARD_ACCESS_CODE } from "@/lib/constants/dashboard-access";
import { trackFormSubmit } from "@/lib/analytics/tracking";
import { useLocale } from "@/hooks/useLocale";

type FooterNavItem = {
  href: string;
  icon: string;
  label: string;
  sub: string;
};

type FooterUtilityLinkItem = {
  href: string;
  icon: string;
  label: string;
};

type SocialLinkItem = {
  href: string;
  icon: string;
  ariaLabel: string;
  title: string;
  hoverClassName: string;
  shadowClassName: string;
  iconGlowClassName: string;
};

type LicenseDetail = {
  state: string;
  label: string;
  number: string;
  verifyUrl?: string;
};

const navCol1Links: FooterNavItem[] = [
  { href: "/", icon: "home", label: "Home", sub: "Base HQ" },
  {
    href: "/contact",
    icon: "contact_phone",
    label: "Contact",
    sub: "Rally Point",
  },
  {
    href: "/services",
    icon: "build",
    label: "Services",
    sub: "Operations",
  },
  {
    href: "/projects",
    icon: "photo_library",
    label: "Projects",
    sub: "Missions",
  },
  {
    href: "/resources",
    icon: "folder_open",
    label: "Resources",
    sub: "Field Intel",
  },
  {
    href: "/safety",
    icon: "verified_user",
    label: "Safety",
    sub: "Force Protection",
  },
  { href: "/faq", icon: "help", label: "Help/FAQ", sub: "Intel Brief" },
];

const navCol2Links: FooterNavItem[] = [
  { href: "/about", icon: "military_tech", label: "About Us", sub: "Our Oath" },
  { href: "/team", icon: "groups", label: "Our Team", sub: "Chain of Command" },
  { href: "/allies", icon: "handshake", label: "Partners", sub: "Allies" },
  {
    href: "/public-sector",
    icon: "account_balance",
    label: "Government",
    sub: "Public Sector",
  },
  {
    href: "/veterans",
    icon: "workspace_premium",
    label: "Veterans",
    sub: "Service First",
  },
  { href: "/careers", icon: "work", label: "Careers", sub: "Enlist" },
  {
    href: "/testimonials",
    icon: "star",
    label: "Reviews",
    sub: "Commendations",
  },
];

const footerUtilityLinks: FooterUtilityLinkItem[] = [
  { href: "/privacy", icon: "shield", label: "Privacy" },
  { href: "/terms", icon: "gavel", label: "Terms" },
  { href: "/accessibility", icon: "accessibility", label: "Accessibility" },
  { href: "/sitemap.xml", icon: "account_tree", label: "Sitemap" },
];

const linkedCities = [
  { href: "/locations/pasco", name: "Pasco" },
  { href: "/locations/kennewick", name: "Kennewick" },
  { href: "/locations/richland", name: "Richland" },
  { href: "/locations/west-richland", name: "West Richland" },
  { href: "/locations/spokane", name: "Spokane" },
  { href: "/locations/yakima", name: "Yakima" },
  { href: "/locations/walla-walla", name: "Walla Walla" },
  { href: "/locations/hermiston", name: "Hermiston" },
  { href: "/locations/pendleton", name: "Pendleton" },
  { href: "/locations/coeur-d-alene", name: "Coeur d'Alene" },
  { href: "/locations/omak", name: "Omak" },
];

const serviceStates = [
  {
    code: "WA",
    nameEn: "Washington",
    nameEs: "Washington",
    noteEn: "Primary service footprint",
    noteEs: "Cobertura principal",
  },
  {
    code: "OR",
    nameEn: "Oregon",
    nameEs: "Oregon",
    noteEn: "Licensed operations",
    noteEs: "Operaciones con licencia",
  },
  {
    code: "ID",
    nameEn: "Idaho",
    nameEs: "Idaho",
    noteEn: "Licensed operations",
    noteEs: "Operaciones con licencia",
  },
] as const;

const socialLinkBaseClass =
  "group flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg border border-gray-600 bg-gradient-to-br from-gray-700 to-gray-800 p-2.5 shadow-md transition-all duration-300 touch-manipulation hover:scale-105 dark:border-gray-500 dark:from-gray-600 dark:to-gray-700";

const primaryActionCardClassName =
  "group flex items-center gap-3 rounded-lg border border-brand-primary/30 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-3 transition-all duration-300 hover:scale-105 hover:border-brand-primary hover:from-brand-primary/20 hover:to-brand-secondary/20 touch-manipulation";

const secondaryActionCardClassName =
  "group flex items-center gap-3 rounded-lg border border-brand-secondary/40 bg-gradient-to-r from-brand-secondary/15 to-brand-primary/15 p-3 transition-all duration-300 hover:scale-105 hover:border-brand-secondary hover:from-brand-secondary/25 hover:to-brand-primary/25 touch-manipulation";

const serviceAreasTriggerClassName =
  "group flex items-center gap-2 rounded-lg border border-brand-secondary/30 bg-gradient-to-r from-brand-primary to-brand-primary-dark px-4 py-2 text-sm font-bold text-brand-secondary shadow-md transition-all duration-300 touch-manipulation hover:scale-105 hover:from-brand-primary-dark hover:to-brand-primary hover:border-brand-secondary hover:text-brand-secondary-light hover:shadow-lg hover:shadow-brand-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

const serviceAreaCityChipClassName =
  "rounded-full border border-brand-primary/25 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 px-2.5 py-1 text-xs font-semibold text-gray-200 transition-all duration-300 hover:scale-105 hover:border-brand-secondary/40 hover:from-brand-primary/20 hover:to-brand-secondary/20 hover:text-brand-secondary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

const socialLinks: SocialLinkItem[] = [
  {
    href: COMPANY_INFO.social.facebook,
    icon: "thumb_up",
    ariaLabel:
      "Follow MH Construction on Facebook for project updates and partnership stories",
    title: "Follow our partnership stories on Facebook",
    hoverClassName:
      "hover:border-[#1877F2] hover:from-[#1877F2] hover:via-[#42A5F5] hover:to-[#1565C0]",
    shadowClassName: "hover:shadow-[#1877F2]/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.8)]",
  },
  {
    href: COMPANY_INFO.social.instagram,
    icon: "photo_camera",
    ariaLabel: "View MH Construction project photos and reels on Instagram",
    title: "See partnership projects on Instagram",
    hoverClassName:
      "hover:border-[#E4405F] hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]",
    shadowClassName: "hover:shadow-[#E4405F]/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.8)]",
  },
  {
    href: COMPANY_INFO.social.twitter,
    icon: "alternate_email",
    ariaLabel:
      "Follow MH Construction on X (formerly Twitter) for construction industry updates",
    title: "Follow partnership updates on X (Twitter)",
    hoverClassName:
      "hover:border-[#1D9BF0] hover:from-[#000000] hover:via-[#1D9BF0] hover:to-[#000000]",
    shadowClassName: "hover:shadow-black/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(29,155,240,0.8)]",
  },
  {
    href: COMPANY_INFO.social.youtube,
    icon: "smart_display",
    ariaLabel:
      "Watch MH Construction project videos and success stories on YouTube",
    title: "Watch partnership success stories on YouTube",
    hoverClassName:
      "hover:border-[#FF0000] hover:from-[#FF0000] hover:via-[#FF4444] hover:to-[#CC0000]",
    shadowClassName: "hover:shadow-[#FF0000]/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]",
  },
  {
    href: COMPANY_INFO.social.linkedin,
    icon: "business_center",
    ariaLabel:
      "Connect with MH Construction on LinkedIn for professional networking and industry insights",
    title: "Connect with our partnership team on LinkedIn",
    hoverClassName:
      "hover:border-[#0A66C2] hover:from-[#0A66C2] hover:via-[#0E76A8] hover:to-[#004182]",
    shadowClassName: "hover:shadow-[#0A66C2]/40",
    iconGlowClassName: "group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)]",
  },
];

const licenseDetails: LicenseDetail[] = [
  {
    state: "WA",
    label: "Washington License",
    number: "MHCONCI907R7",
    verifyUrl:
      "https://secure.lni.wa.gov/verify/Detail.aspx?UBI=603069508&LIC=MHCONCI907R7&SAW=false",
  },
  {
    state: "OR",
    label: "Oregon License",
    number: "765043-99",
    verifyUrl:
      "https://egov.sos.state.or.us/br/pkg_web_name_srch_inq.show_detl?p_be_rsn=1514612&p_srce=BR_INQ&p_print=FALSE",
  },
  {
    state: "ID",
    label: "Idaho License",
    number: "RCE-49250",
    verifyUrl: "https://www.labor.idaho.gov/",
  },
];

function FooterNavLink({
  href,
  icon,
  label,
  sub,
}: {
  href: string;
  icon: string;
  label: string;
  sub: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center space-x-2 text-base xs:text-lg text-gray-300 hover:text-brand-primary dark:text-gray-200 transition-all hover:translate-x-1 duration-300 touch-manipulation"
    >
      <MaterialIcon
        icon={icon}
        size="sm"
        className="text-gray-600 dark:text-gray-300 group-hover:text-brand-primary transition-colors"
      />
      <span className="flex flex-col">
        <span>{label}</span>
        <span className="text-[10px] xs:text-xs text-brand-secondary opacity-75">
          {sub}
        </span>
      </span>
      <MaterialIcon
        icon="arrow_forward"
        size="sm"
        className="opacity-0 group-hover:opacity-100 text-brand-primary transition-opacity"
      />
    </Link>
  );
}

function SocialLink({
  href,
  icon,
  ariaLabel,
  title,
  hoverClassName,
  shadowClassName,
  iconGlowClassName,
}: SocialLinkItem) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${socialLinkBaseClass} ${hoverClassName} ${shadowClassName}`}
      aria-label={ariaLabel}
      title={title}
      itemProp="sameAs"
    >
      <MaterialIcon
        icon={icon}
        size="md"
        className={`text-gray-600 transition-colors drop-shadow-lg group-hover:text-white dark:text-gray-300 ${iconGlowClassName}`}
      />
    </a>
  );
}

function FooterActionCardContent({
  icon,
  eyebrow,
  body,
  accent = "primary",
}: {
  icon: string;
  eyebrow: string;
  body: ReactNode;
  accent?: "primary" | "secondary";
}) {
  const accentClasses =
    accent === "secondary"
      ? {
          iconWrapper: "bg-brand-secondary text-gray-900 group-hover:scale-110",
          eyebrow: "text-brand-secondary",
          arrow: "text-brand-secondary",
        }
      : {
          iconWrapper: "bg-brand-primary text-white group-hover:scale-110",
          eyebrow: "text-brand-secondary",
          arrow: "text-brand-primary",
        };

  return (
    <>
      <div
        className={`flex flex-shrink-0 items-center justify-center rounded-lg p-2 transition-transform ${accentClasses.iconWrapper}`}
      >
        <MaterialIcon icon={icon} size="md" />
      </div>
      <div className="min-w-0 flex-grow">
        <div
          className={`${accentClasses.eyebrow} mb-0.5 text-xs font-bold uppercase tracking-wide`}
        >
          {eyebrow}
        </div>
        {body}
      </div>
      <MaterialIcon
        icon="arrow_forward"
        size="sm"
        className={`${accentClasses.arrow} flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100`}
      />
    </>
  );
}

function LicenseBadge() {
  return (
    <div className="rounded-lg border border-brand-primary/20 bg-brand-primary/5 px-3 py-2 text-sm transition-all duration-300 hover:border-brand-primary/40 hover:bg-brand-primary/15 dark:border-brand-primary/30 dark:bg-brand-primary/10 dark:hover:border-brand-primary/50 dark:hover:bg-brand-primary/20">
      <div className="mb-1.5 flex items-center justify-center gap-1.5">
        <MaterialIcon
          icon="verified"
          size="sm"
          className="text-brand-secondary dark:text-brand-secondary-light"
        />
        <span className="font-semibold text-gray-300 dark:text-gray-200">
          Licensed
        </span>
      </div>
      <dl className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm">
        {licenseDetails.map((license) => (
          <div key={license.state} className="flex items-center gap-1">
            <dt className="font-bold text-brand-secondary dark:text-brand-secondary-light">
              {license.state}
            </dt>
            <dd className="text-gray-300 dark:text-gray-200">
              <span className="sr-only">{license.label}: </span>
              {license.verifyUrl ? (
                <a
                  href={license.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-brand-secondary/70 underline-offset-2 transition-colors hover:text-brand-secondary"
                  aria-label={`${license.label} ${license.number} verification`}
                  title={`Verify ${license.label}`}
                >
                  {license.number}
                </a>
              ) : (
                license.number
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ServiceAreasDropdown({
  isOpen,
  onToggle,
  isEs,
}: {
  isOpen: boolean;
  onToggle: () => void;
  isEs: boolean;
}) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={onToggle}
        className={serviceAreasTriggerClassName}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <MaterialIcon
          icon="map"
          size="sm"
          className="text-brand-secondary transition-colors group-hover:text-brand-secondary-light"
        />
        <span className="text-brand-secondary transition-colors group-hover:text-brand-secondary-light">
          {isEs ? "Areas atendidas" : "Areas Served"}
        </span>
        <MaterialIcon
          icon={isOpen ? "expand_less" : "expand_more"}
          size="sm"
          className="text-brand-secondary transition-all group-hover:text-brand-secondary-light"
        />
      </button>
      {isOpen && (
        <div
          className="absolute bottom-full left-0 z-50 mb-2 w-72 rounded-xl border border-brand-primary/40 bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-xl shadow-brand-primary/20"
          role="listbox"
          aria-label={isEs ? "Areas de servicio" : "Service areas"}
        >
          <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-primary">
            <MaterialIcon
              icon="location_on"
              size="sm"
              className="text-brand-secondary"
            />
            <span>{isEs ? "Pacífico Noroeste" : "Pacific Northwest"}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {linkedCities.map((city) => (
              <Link
                key={city.href}
                href={city.href}
                className={serviceAreaCityChipClassName}
                itemProp="areaServed"
                itemScope
                itemType="https://schema.org/City"
              >
                <span itemProp="name">{city.name}</span>
              </Link>
            ))}
          </div>
          <div className="mt-3 border-t border-gray-700/70 pt-2.5">
            <div className="grid gap-1.5">
              {serviceStates.map((state) => (
                <span
                  key={state.code}
                  className="flex items-center justify-between rounded-lg border border-brand-primary/20 bg-gray-700/40 px-2.5 py-1.5 text-xs"
                  itemProp="areaServed"
                  itemScope
                  itemType="https://schema.org/State"
                >
                  <span className="font-bold text-brand-secondary">
                    {state.code}
                  </span>
                  <span itemProp="name" className="text-gray-200">
                    {isEs ? state.nameEs : state.nameEn}
                  </span>
                  <span className="text-[10px] text-gray-300">
                    {isEs ? state.noteEs : state.noteEn}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Footer() {
  const locale = useLocale();
  const isEs = locale === "es";
  const localizedNavCol1Links = navCol1Links.map((link) => {
    if (!isEs) return link;

    const translations: Record<string, { label: string; sub: string }> = {
      "/": { label: "Inicio", sub: "Base central" },
      "/contact": { label: "Contacto", sub: "Punto de encuentro" },
      "/services": { label: "Servicios", sub: "Operaciones" },
      "/projects": { label: "Proyectos", sub: "Misiones" },
      "/resources": { label: "Recursos", sub: "Inteligencia de campo" },
      "/safety": { label: "Seguridad", sub: "Proteccion operativa" },
      "/faq": { label: "Ayuda/Preguntas", sub: "Informe rapido" },
    };

    const translation = translations[link.href];
    return {
      ...link,
      label: translation?.label ?? link.label,
      sub: translation?.sub ?? link.sub,
    };
  });

  const localizedNavCol2Links = navCol2Links.map((link) => {
    if (!isEs) return link;

    const translations: Record<string, { label: string; sub: string }> = {
      "/about": { label: "Nosotros", sub: "Nuestro compromiso" },
      "/team": { label: "Nuestro equipo", sub: "Cadena de mando" },
      "/allies": { label: "Aliados", sub: "Socios" },
      "/public-sector": { label: "Gobierno", sub: "Sector publico" },
      "/veterans": { label: "Veteranos", sub: "Servicio primero" },
      "/careers": { label: "Carreras", sub: "Unete" },
      "/testimonials": { label: "Resenas", sub: "Reconocimientos" },
    };

    const translation = translations[link.href];
    return {
      ...link,
      label: translation?.label ?? link.label,
      sub: translation?.sub ?? link.sub,
    };
  });

  const localizedFooterUtilityLinks = footerUtilityLinks.map((link) => {
    if (!isEs) return link;

    const translations: Record<string, string> = {
      "/privacy": "Privacidad",
      "/terms": "Terminos",
      "/accessibility": "Accesibilidad",
      "/sitemap.xml": "Mapa del sitio",
    };

    return {
      ...link,
      label: translations[link.href] ?? link.label,
    };
  });
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessCodeError, setAccessCodeError] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);

  useEffect(() => {
    const handleAdminShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key.toLowerCase() === "a"
      ) {
        event.preventDefault();
        setShowAdminModal(true);
      }
    };

    window.addEventListener("keydown", handleAdminShortcut);

    return () => {
      window.removeEventListener("keydown", handleAdminShortcut);
    };
  }, []);

  useEffect(() => {
    if (newsletterStatus !== "success" && newsletterStatus !== "error") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setNewsletterStatus("idle");
      setNewsletterMessage("");
    }, 5000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [newsletterStatus]);

  const handleAccessCodeSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      accessCode.trim().toUpperCase() === DASHBOARD_ACCESS_CODE.toUpperCase()
    ) {
      setAccessCode("");
      setAccessCodeError("");
      setShowAdminModal(true);
    } else {
      setAccessCodeError(
        isEs ? "Código de acceso inválido" : "Invalid access code",
      );
      setAccessCode("");
    }
  };

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = newsletterEmail.trim();
    if (!normalizedEmail) {
      return;
    }

    setNewsletterStatus("submitting");
    setNewsletterMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });

      if (response.ok) {
        setNewsletterEmail("");
        setNewsletterStatus("success");
        setNewsletterMessage(isEs ? "¡Suscrito!" : "Subscribed!");
        try {
          trackFormSubmit("newsletter");
        } catch {
          /* analytics failure is non-blocking */
        }
        return;
      }

      setNewsletterStatus("error");
      setNewsletterMessage(isEs ? "Intente de nuevo" : "Try again");
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage(isEs ? "Error" : "Error");
    }
  };

  return (
    <>
      <AdminSignInModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
      />
      <footer
        className="bg-gradient-to-br from-gray-800 dark:from-black via-gray-900 dark:via-gray-900 to-black dark:to-black pt-6 xs:pt-8 sm:pt-10 pb-4 border-t border-brand-primary/20 text-gray-300 touch-manipulation"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Main Footer Content */}
          <div className="gap-4 xs:gap-5 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch pb-3">
            {/* Column 1: Company Info */}
            <div className="h-full space-y-3 xs:space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex h-full flex-col text-center sm:text-left lg:text-left">
                <div className="mb-4">
                  <Link
                    href="/"
                    className="inline-block"
                    aria-label="MH Construction Home"
                  >
                    <Image
                      src="/images/logo/mh-logo-dark-bg.webp"
                      alt="MH Construction Inc - Veteran-Owned General Contractor serving Pacific Northwest"
                      width={264}
                      height={132}
                      loading="lazy"
                      itemProp="logo"
                      className="mx-auto sm:mx-0 lg:mx-0 w-[240px] xs:w-[270px] sm:w-[300px] h-auto drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 cursor-pointer"
                    />
                  </Link>
                </div>

                {/* Social Media Links */}
                <nav
                  aria-label={
                    isEs ? "Enlaces de redes sociales" : "Social media links"
                  }
                  className="mx-auto flex w-[240px] max-w-full flex-nowrap items-center justify-between pb-1 xs:w-[270px] sm:mx-0 sm:w-[300px]"
                >
                  {socialLinks.map((link) => (
                    <SocialLink key={link.href} {...link} />
                  ))}
                </nav>

                {/* Google Review Card */}
                <a
                  href="https://g.page/r/CVdv3YZLzJvdEBM/review"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${primaryActionCardClassName} mt-4`}
                  aria-label={
                    isEs
                      ? "Deje una resena de 5 estrellas en Google para MH Construction"
                      : "Leave a 5-star Google review for MH Construction"
                  }
                  itemProp="review"
                >
                  <FooterActionCardContent
                    icon="rate_review"
                    eyebrow={isEs ? "Calificanos" : "Rate Us"}
                    body={
                      <>
                        <div className="mb-1 text-sm font-bold text-gray-300 transition-colors group-hover:text-brand-primary xs:text-base">
                          {isEs
                            ? "Deja una resena en Google"
                            : "Leave a Google Review"}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <MaterialIcon icon="star" size="sm" />
                          <MaterialIcon icon="star" size="sm" />
                          <MaterialIcon icon="star" size="sm" />
                          <MaterialIcon icon="star" size="sm" />
                          <MaterialIcon icon="star" size="sm" />
                        </div>
                      </>
                    }
                  />
                </a>

                {/* Service Area Map */}
                <div className="mt-4 flex flex-1 items-end justify-center sm:justify-start">
                  <div className="w-full max-w-[340px] rounded-lg border border-brand-primary/20 bg-brand-primary/5 p-4 transition-all duration-300 hover:border-brand-primary/40 hover:bg-brand-primary/15 dark:border-brand-primary/30 dark:bg-brand-primary/10">
                    <PNWStatesMap
                      width={220}
                      height={154}
                      className="mx-auto drop-shadow-md"
                    />
                    <div className="mt-3 text-center text-sm font-semibold text-brand-secondary dark:text-brand-secondary-light">
                      {isEs
                        ? "Sirviendo al Pacifico Noroeste"
                        : "Serving the Pacific Northwest"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Core Navigation */}
            <nav
              className="h-full space-y-3 xs:space-y-4"
              aria-label={isEs ? "Navegacion principal" : "Main navigation"}
            >
              <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
                <MaterialIcon
                  icon="explore"
                  size="sm"
                  className="text-brand-primary"
                />
                <div className="flex flex-col leading-tight">
                  <h3 className="font-semibold text-brand-primary text-sm uppercase tracking-wide">
                    {isEs ? "Servicios" : "Services"}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wide text-brand-secondary/80">
                    {isEs ? "Ejecucion de mision" : "Mission Execution"}
                  </span>
                </div>
              </div>
              <div className="flex h-[calc(100%-2.75rem)] flex-col justify-evenly">
                {localizedNavCol1Links.map((link) => (
                  <FooterNavLink key={`${link.href}-${link.label}`} {...link} />
                ))}
              </div>
            </nav>

            {/* Column 3: Company & Partnerships */}
            <nav
              className="h-full space-y-3 xs:space-y-4"
              aria-label={
                isEs ? "Informacion de la compania" : "Company information"
              }
            >
              <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
                <MaterialIcon
                  icon="groups"
                  size="sm"
                  className="text-brand-primary"
                />
                <div className="flex flex-col leading-tight">
                  <h3 className="font-semibold text-brand-primary text-sm uppercase tracking-wide">
                    {isEs ? "Compania" : "Company"}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wide text-brand-secondary/80">
                    {isEs ? "Nuestras fuerzas" : "Our Forces"}
                  </span>
                </div>
              </div>
              <div className="flex h-[calc(100%-2.75rem)] flex-col justify-evenly">
                {localizedNavCol2Links.map((link) => (
                  <FooterNavLink key={`${link.href}-${link.label}`} {...link} />
                ))}
              </div>
            </nav>

            {/* Column 4: Social Media & Resources */}
            <section
              className="space-y-3 xs:space-y-4"
              aria-labelledby="contact-heading"
            >
              <div className="flex items-center space-x-2 pb-2 border-b border-brand-primary/30">
                <MaterialIcon
                  icon="share"
                  size="sm"
                  className="text-brand-primary"
                />
                <div className="flex flex-col leading-tight">
                  <h3
                    id="contact-heading"
                    className="font-medium text-brand-primary text-xs uppercase tracking-wide"
                  >
                    {isEs ? "Contacto" : "Contact"}
                  </h3>
                  <span className="text-[9px] uppercase tracking-wide text-brand-secondary/80">
                    {isEs ? "Centro de mando" : "Command Center"}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div
                className="space-y-2 xs:space-y-3"
                itemProp="contactPoint"
                itemScope
                itemType="https://schema.org/ContactPoint"
              >
                <Link
                  href="/careers?apply=true&entryPoint=Footer%20Application"
                  className={secondaryActionCardClassName}
                  aria-label={
                    isEs
                      ? "Inicie una solicitud de empleo con MH Construction"
                      : "Start a job application with MH Construction"
                  }
                >
                  <FooterActionCardContent
                    icon="badge"
                    eyebrow={isEs ? "Unete al equipo" : "Join the Team"}
                    accent="secondary"
                    body={
                      <div className="text-sm font-bold text-gray-300 transition-colors group-hover:text-brand-secondary xs:text-base">
                        {isEs ? "Solicitud rapida" : "Quick Application"}
                      </div>
                    }
                  />
                </Link>

                <TrackedPhoneLink
                  trackId="footer-phone-cta"
                  trackProperties={{
                    location: "footer-prominent-cta",
                    style: "button",
                  }}
                  className={primaryActionCardClassName}
                  aria-label={`${
                    isEs
                      ? "Llame a MH Construction al"
                      : "Call MH Construction at"
                  } ${COMPANY_INFO.phone.display}`}
                >
                  <FooterActionCardContent
                    icon="call"
                    eyebrow={isEs ? "Llamenos" : "Call Us"}
                    body={
                      <div className="text-sm font-bold text-gray-300 transition-colors group-hover:text-brand-primary xs:text-base">
                        {COMPANY_INFO.phone.display}
                      </div>
                    }
                  />
                </TrackedPhoneLink>

                <TrackedEmailLink
                  trackId="footer-email-cta"
                  trackProperties={{
                    location: "footer-prominent-cta",
                    style: "button",
                  }}
                  className={primaryActionCardClassName}
                  aria-label={`${
                    isEs
                      ? "Envie un correo a MH Construction a"
                      : "Email MH Construction at"
                  } ${COMPANY_INFO.email.main}`}
                >
                  <FooterActionCardContent
                    icon="mail"
                    eyebrow={isEs ? "Escríbanos" : "Email Us"}
                    body={
                      <div className="truncate text-xs font-bold text-gray-300 transition-colors group-hover:text-brand-primary xs:text-sm">
                        {COMPANY_INFO.email.main}
                      </div>
                    }
                  />
                </TrackedEmailLink>

                <TrackedLocationLink
                  trackId="footer-address-cta"
                  trackProperties={{
                    location: "footer-prominent-cta",
                    style: "button",
                  }}
                  className={primaryActionCardClassName}
                >
                  <FooterActionCardContent
                    icon="place"
                    eyebrow={isEs ? "Visítenos" : "Visit Us"}
                    body={
                      <div className="text-xs font-bold text-gray-300 transition-colors group-hover:text-brand-primary xs:text-sm">
                        <span itemProp="streetAddress">
                          {COMPANY_INFO.address.street}
                        </span>
                        <br />
                        <span itemProp="addressLocality">
                          {COMPANY_INFO.address.city}
                        </span>
                        ,{" "}
                        <span itemProp="addressRegion">
                          {COMPANY_INFO.address.state}
                        </span>{" "}
                        <span itemProp="postalCode">
                          {COMPANY_INFO.address.zip}
                        </span>
                      </div>
                    }
                  />
                </TrackedLocationLink>
              </div>

              {/* Newsletter Signup */}
              <div className="group bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 hover:from-brand-primary/20 hover:to-brand-secondary/20 p-3 rounded-lg border border-brand-primary/30 hover:border-brand-primary transition-all duration-300 hover:scale-105 touch-manipulation">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-shrink-0 flex justify-center items-center bg-brand-primary p-2 rounded-lg group-hover:scale-110 transition-transform">
                    <MaterialIcon
                      icon="notifications_active"
                      size="md"
                      className="text-white"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="text-brand-secondary text-xs font-bold uppercase tracking-wide mb-0.5">
                      {isEs ? "Manténgase al día" : "Stay Updated"}
                    </div>
                    <div className="text-gray-300 font-bold text-sm xs:text-base group-hover:text-brand-primary transition-colors">
                      {isEs ? "Únase a nuestro boletín" : "Join Our Newsletter"}
                    </div>
                  </div>
                </div>
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    {isEs ? "Correo electrónico" : "Email address"}
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder={
                      isEs ? "Ingrese su correo" : "Enter your email"
                    }
                    required
                    value={newsletterEmail}
                    onChange={(event) => setNewsletterEmail(event.target.value)}
                    aria-describedby="footer-newsletter-feedback"
                    className="w-full px-3 py-2 bg-gray-900/50 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={newsletterStatus === "submitting"}
                    className="w-full px-4 py-2 bg-brand-primary hover:bg-brand-primary-dark text-brand-secondary-light hover:text-white text-sm font-bold rounded-lg transition-all duration-300 border-2 border-brand-secondary/50 hover:border-brand-secondary shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {newsletterStatus === "submitting"
                      ? isEs
                        ? "Suscribiendo..."
                        : "Subscribing..."
                      : isEs
                        ? "Suscribirse"
                        : "Subscribe"}
                    <MaterialIcon icon="arrow_forward" size="sm" />
                  </button>
                  <div
                    id="footer-newsletter-feedback"
                    role={newsletterStatus === "error" ? "alert" : "status"}
                    aria-live="polite"
                    className={`text-xs ${
                      newsletterStatus === "success"
                        ? "text-green-400"
                        : newsletterStatus === "error"
                          ? "text-red-400"
                          : "text-gray-400"
                    }`}
                  >
                    {newsletterMessage}
                  </div>
                </form>
              </div>
            </section>
          </div>

          {/* Accreditations Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 pb-2 border-t border-gray-700/50">
            {/* AGC Washington */}
            <a
              href="https://www.agcwa.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="AGC of Washington Member"
              className="group flex items-center justify-center rounded-lg border border-brand-secondary/40 bg-white/90 dark:bg-gray-800/90 p-3 transition-all duration-300 touch-manipulation hover:scale-105 hover:border-brand-secondary hover:shadow-lg"
            >
              <Image
                src="/images/logo/nwagc-logo.webp"
                alt="AGC Northwest Washington Member"
                width={795}
                height={291}
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* BBB */}
            <a
              href={COMPANY_INFO.bbb.sealClickUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="BBB Accredited Business - A+ Rating"
              className="group flex items-center justify-center rounded-lg border border-brand-secondary/40 bg-white/90 dark:bg-gray-800/90 p-3 transition-all duration-300 touch-manipulation hover:scale-105 hover:border-brand-secondary hover:shadow-lg"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.bbb.sealHorizontal}
                alt="MH Construction, Inc. BBB Business Review"
                width={220}
                height={50}
                className="h-12 w-auto object-contain dark:hidden"
                loading="lazy"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={COMPANY_INFO.bbb.sealHorizontalWhite}
                alt="MH Construction, Inc. BBB Business Review"
                width={220}
                height={50}
                className="h-12 w-auto object-contain hidden dark:block"
                loading="lazy"
              />
            </a>

            {/* Travelers */}
            <a
              href={COMPANY_INFO.travelers.website}
              target="_blank"
              rel="noopener noreferrer"
              title="Travelers Insurance Partner - Auto & Bonding"
              className="group flex items-center justify-center rounded-lg border border-brand-secondary/40 bg-white/90 dark:bg-gray-800/90 p-3 transition-all duration-300 touch-manipulation hover:scale-105 hover:border-brand-secondary hover:shadow-lg"
            >
              <Image
                src={COMPANY_INFO.travelers.logo}
                alt="Travelers Insurance - Auto & Bonding Partner"
                width={200}
                height={56}
                className="h-12 w-auto object-contain dark:hidden"
                loading="lazy"
              />
              <Image
                src={COMPANY_INFO.travelers.logoWhite}
                alt="Travelers Insurance - Auto & Bonding Partner"
                width={200}
                height={56}
                className="h-12 w-auto object-contain hidden dark:block"
                loading="lazy"
              />
            </a>

            {/* Pasco Chamber of Commerce */}
            <a
              href={COMPANY_INFO.chambers.pasco.memberDirectoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Pasco Chamber of Commerce Member"
              className="group flex items-center justify-center rounded-lg border border-brand-secondary/40 bg-white/90 dark:bg-gray-800/90 p-3 transition-all duration-300 touch-manipulation hover:scale-105 hover:border-brand-secondary hover:shadow-lg"
            >
              <Image
                src={COMPANY_INFO.chambers.pasco.logo}
                alt="Pasco Chamber of Commerce Member"
                width={200}
                height={56}
                className="h-12 w-auto object-contain dark:hidden"
                loading="lazy"
              />
              <Image
                src={COMPANY_INFO.chambers.pasco.logoWhite}
                alt="Pasco Chamber of Commerce Member"
                width={200}
                height={56}
                className="h-12 w-auto object-contain hidden dark:block"
                loading="lazy"
              />
            </a>

            {/* Richland Chamber of Commerce */}
            <a
              href={COMPANY_INFO.chambers.richland.memberDirectoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Richland Chamber of Commerce Member"
              className="group flex items-center justify-center rounded-lg border border-brand-secondary/40 bg-white/90 dark:bg-gray-800/90 p-3 transition-all duration-300 touch-manipulation hover:scale-105 hover:border-brand-secondary hover:shadow-lg"
            >
              <Image
                src={COMPANY_INFO.chambers.richland.logo}
                alt="Richland Chamber of Commerce Member"
                width={200}
                height={56}
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </a>

            {/* Tri-City Regional Chamber of Commerce */}
            <a
              href={COMPANY_INFO.chambers.triCityRegional.memberDirectoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Tri-City Regional Chamber of Commerce Member"
              className="group flex items-center justify-center rounded-lg border border-brand-secondary/40 bg-white/90 dark:bg-gray-800/90 p-3 transition-all duration-300 touch-manipulation hover:scale-105 hover:border-brand-secondary hover:shadow-lg"
            >
              <Image
                src={COMPANY_INFO.chambers.triCityRegional.logo}
                alt="Tri-City Regional Chamber of Commerce Member"
                width={200}
                height={56}
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            </a>
          </div>

          {/* Bottom Bar - Enhanced Design */}
          <div className="pt-8 pb-6 border-t border-gray-700/50 dark:border-gray-600/50">
            {/* Primary Row: Legal Links as Icon Pills */}
            <nav
              className="flex flex-wrap justify-center items-center gap-2 xs:gap-3 mb-6"
              aria-label={
                isEs
                  ? "Enlaces legales y utilitarios"
                  : "Legal and utility links"
              }
            >
              {localizedFooterUtilityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand-primary/20 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 hover:from-brand-primary/15 hover:to-brand-secondary/15 hover:border-brand-primary/40 transition-all duration-300 hover:scale-105"
                >
                  <MaterialIcon
                    icon={link.icon}
                    size="sm"
                    className="text-brand-secondary/70 group-hover:text-brand-secondary transition-colors"
                  />
                  <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Secondary Row: Company Info & Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 xs:gap-4 pb-4 mb-4 border-b border-gray-700/30">
              {/* Areas Served */}
              <ServiceAreasDropdown
                isOpen={areasDropdownOpen}
                onToggle={() => setAreasDropdownOpen(!areasDropdownOpen)}
                isEs={isEs}
              />

              {/* Licensed */}
              <LicenseBadge />

              {/* Back to Top Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-primary-dark hover:from-brand-primary-dark hover:to-brand-primary text-brand-secondary-light px-4 py-2 rounded-lg shadow-md hover:shadow-lg hover:shadow-brand-primary/20 transition-all duration-300 hover:scale-105 touch-manipulation border border-brand-secondary/30 hover:border-brand-secondary"
                aria-label={isEs ? "Volver arriba" : "Back to top"}
              >
                <MaterialIcon
                  icon="arrow_upward"
                  size="sm"
                  className="text-brand-secondary group-hover:text-brand-secondary-light group-hover:-translate-y-0.5 transition-all duration-300"
                />
                <span className="font-bold text-sm text-brand-secondary group-hover:text-brand-secondary-light transition-colors duration-300">
                  {isEs ? "Arriba" : "Top"}
                </span>
              </button>
            </div>

            {/* Final Row: Copyright & Staff Portal */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Copyright */}
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                <MaterialIcon
                  icon="copyright"
                  size="sm"
                  className="text-brand-secondary/50"
                />
                <span className="text-sm font-medium">
                  2026 {COMPANY_INFO.name}, Inc.
                </span>
                <span className="text-brand-secondary/50">•</span>
                <span className="text-xs">Veteran-Owned</span>
              </div>

              {/* Staff Portal - Subtle */}
              <div className="flex items-center">
                <form
                  onSubmit={handleAccessCodeSubmit}
                  className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity duration-300"
                  aria-label={
                    isEs
                      ? "Acceso al portal de personal"
                      : "Staff portal access"
                  }
                >
                  <MaterialIcon
                    icon="lock"
                    size="sm"
                    className="text-gray-500 dark:text-gray-600"
                  />
                  <label htmlFor="footer-access-code" className="sr-only">
                    {isEs ? "Código de acceso" : "Access code"}
                  </label>
                  <input
                    id="footer-access-code"
                    type="password"
                    placeholder={isEs ? "Personal" : "Staff"}
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    autoComplete="off"
                    className="w-14 rounded bg-gray-800/50 border border-gray-700/50 px-2 py-0.5 text-[10px] text-gray-400 placeholder-gray-600 focus:outline-none focus:border-brand-primary/50 focus:bg-gray-800 transition-all"
                  />
                  <button
                    type="submit"
                    aria-label={
                      isEs ? "Enviar código de acceso" : "Submit access code"
                    }
                    className="flex items-center justify-center rounded bg-gray-700/50 hover:bg-brand-primary/50 p-1 transition-colors touch-manipulation"
                  >
                    <MaterialIcon
                      icon="arrow_forward"
                      size="sm"
                      className="text-gray-500 hover:text-brand-secondary text-xs"
                    />
                  </button>
                </form>
                {accessCodeError && (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className="ml-2 text-[10px] text-red-400"
                  >
                    {accessCodeError}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
