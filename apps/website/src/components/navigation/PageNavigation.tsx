"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "@/hooks/useLocale";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { PAGE_TERMINOLOGY } from "@/lib/branding/page-names";
import type { NavigationItem } from "./navigationConfigs";

interface PageNavigationProps {
  items: NavigationItem[];
  className?: string;
  showRemainingPagesOverlay?: boolean;
  /** @deprecated Use showRemainingPagesOverlay instead. */
  showRemainingPagesDropdown?: boolean;
}

export const TOP_PAGES_EN = [
  { href: "/", label: PAGE_TERMINOLOGY.home.seoName },
  { href: "/services", label: PAGE_TERMINOLOGY.services.seoName },
  { href: "/projects", label: PAGE_TERMINOLOGY.projects.seoName },
  { href: "/about", label: PAGE_TERMINOLOGY.about.seoName },
  { href: "/contact", label: PAGE_TERMINOLOGY.contact.seoName },
] as const;

export const TOP_PAGES_ES = [
  { href: "/", label: "Inicio" },
  { href: "/services", label: "Servicios" },
  { href: "/projects", label: "Proyectos" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
] as const;

export const ALL_SITE_PAGES_EN = [
  {
    href: "/",
    label: PAGE_TERMINOLOGY.home.seoName,
    description: PAGE_TERMINOLOGY.home.mhBrandName,
  },
  {
    href: "/about",
    label: PAGE_TERMINOLOGY.about.seoName,
    description: PAGE_TERMINOLOGY.about.mhBrandName,
  },
  {
    href: "/services",
    label: PAGE_TERMINOLOGY.services.seoName,
    description: PAGE_TERMINOLOGY.services.mhBrandName,
  },
  {
    href: "/projects",
    label: PAGE_TERMINOLOGY.projects.seoName,
    description: PAGE_TERMINOLOGY.projects.mhBrandName,
  },
  {
    href: "/contact",
    label: PAGE_TERMINOLOGY.contact.seoName,
    description: PAGE_TERMINOLOGY.contact.mhBrandName,
  },
  {
    href: "/events",
    label: PAGE_TERMINOLOGY.events.seoName,
    description: PAGE_TERMINOLOGY.events.mhBrandName,
  },
  {
    href: "/testimonials",
    label: PAGE_TERMINOLOGY.testimonials.seoName,
    description: PAGE_TERMINOLOGY.testimonials.mhBrandName,
  },
  {
    href: "/team",
    label: PAGE_TERMINOLOGY.team.seoName,
    description: PAGE_TERMINOLOGY.team.mhBrandName,
  },
  {
    href: "/careers",
    label: PAGE_TERMINOLOGY.careers.seoName,
    description: PAGE_TERMINOLOGY.careers.mhBrandName,
  },
  {
    href: "/veterans",
    label: PAGE_TERMINOLOGY.veterans.seoName,
    description: PAGE_TERMINOLOGY.veterans.mhBrandName,
  },
  {
    href: "/allies",
    label: PAGE_TERMINOLOGY.allies.seoName,
    description: PAGE_TERMINOLOGY.allies.mhBrandName,
  },
  {
    href: "/public-sector",
    label: PAGE_TERMINOLOGY.publicSector.seoName,
    description: PAGE_TERMINOLOGY.publicSector.mhBrandName,
  },
  {
    href: "/safety",
    label: PAGE_TERMINOLOGY.safety.seoName,
    description: PAGE_TERMINOLOGY.safety.mhBrandName,
  },
  {
    href: "/resources",
    label: PAGE_TERMINOLOGY.resources.seoName,
    description: PAGE_TERMINOLOGY.resources.mhBrandName,
  },
  {
    href: "/faq",
    label: PAGE_TERMINOLOGY.faq.seoName,
    description: PAGE_TERMINOLOGY.faq.mhBrandName,
  },
  {
    href: "/hub",
    label: PAGE_TERMINOLOGY.hub.seoName,
    description: PAGE_TERMINOLOGY.hub.mhBrandName,
  },
] as const;

export const ALL_SITE_PAGES_ES = [
  { href: "/", label: "Inicio", description: "Base central" },
  { href: "/about", label: "Nosotros", description: "Nuestro compromiso" },
  {
    href: "/services",
    label: "Servicios",
    description: "Rutas",
  },
  { href: "/projects", label: "Proyectos", description: "Portafolio" },
  { href: "/contact", label: "Contacto", description: "Contacto" },
  { href: "/events", label: "Eventos", description: "Proximos eventos" },
  { href: "/testimonials", label: "Reseñas", description: "Reconocimientos" },
  {
    href: "/team",
    label: "Nuestro equipo",
    description: "Cadena de mando",
  },
  { href: "/careers", label: "Carreras", description: "Únete" },
  { href: "/veterans", label: "Veteranos", description: "Veteranos" },
  { href: "/allies", label: "Aliados", description: "Socios" },
  {
    href: "/public-sector",
    label: "Gobierno",
    description: "Sector público",
  },
  {
    href: "/safety",
    label: "Seguridad",
    description: "Seguridad",
  },
  { href: "/resources", label: "Recursos", description: "Recursos" },
  {
    href: "/faq",
    label: "Ayuda/Preguntas",
    description: "Informe rápido",
  },
  {
    href: "/hub",
    label: "Hub del equipo",
    description: "Portal del personal",
  },
] as const;

export function PageNavigation({
  items: _items,
  className = "",
  showRemainingPagesOverlay,
  showRemainingPagesDropdown = false,
}: PageNavigationProps) {
  const pathname = usePathname();
  const locale = useLocale();
  const navRef = useRef<HTMLElement>(null);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const pages = locale === "es" ? TOP_PAGES_ES : TOP_PAGES_EN;
  const allPages = locale === "es" ? ALL_SITE_PAGES_ES : ALL_SITE_PAGES_EN;

  const remainingPages = useMemo(
    () =>
      allPages.filter((page) => !pages.some((top) => top.href === page.href)),
    [allPages, pages],
  );

  const isActivePath = (href: string) =>
    href.startsWith("/#")
      ? pathname === "/"
      : href === "/"
        ? pathname === "/"
        : pathname === href || pathname.startsWith(`${href}/`);

  const isRemainingPageActive = remainingPages.some((page) =>
    isActivePath(page.href),
  );

  const isRemainingPagesMenuEnabled =
    showRemainingPagesOverlay ?? showRemainingPagesDropdown;

  const moreLabel = locale === "es" ? "Más" : "More";
  const morePagesLabel = locale === "es" ? "Más páginas" : "More pages";
  const overlayEyebrow = locale === "es" ? "Acceso rápido" : "Quick Access";
  const overlayTitle =
    locale === "es" ? "Navegación del sitio" : "Site Navigation";
  const closeMenuLabel = locale === "es" ? "Cerrar menú" : "Close menu";
  const navItemBaseClass =
    "w-full border-b-2 px-3 py-2 text-center text-xs font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-secondary/70 sm:px-4 sm:py-3 sm:text-base";
  const getNavItemStateClass = (isActive: boolean) =>
    isActive
      ? "border-brand-secondary bg-gray-800/70 text-white"
      : "border-transparent text-gray-300 hover:bg-gray-800/60 hover:text-white";

  useEffect(() => {
    const root = document.documentElement;
    const updateNavHeight = () => {
      if (!navRef.current) {
        return;
      }

      root.style.setProperty(
        "--mh-page-nav-height",
        `${Math.ceil(navRef.current.getBoundingClientRect().height)}px`,
      );
    };

    updateNavHeight();

    const ResizeObserverImpl = globalThis.ResizeObserver;
    if (!ResizeObserverImpl || !navRef.current) {
      return () => {
        root.style.removeProperty("--mh-page-nav-height");
      };
    }

    const observer = new ResizeObserverImpl(updateNavHeight);
    observer.observe(navRef.current);

    return () => {
      observer.disconnect();
      root.style.removeProperty("--mh-page-nav-height");
    };
  }, []);

  useEffect(() => {
    if (!isMoreMenuOpen) {
      return;
    }

    lastFocusedElementRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMoreMenuOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialogElement = dialogRef.current;
      if (!dialogElement) {
        return;
      }

      const focusableElements = Array.from(
        dialogElement.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = focusableElements[0]!;
      const lastElement = focusableElements[focusableElements.length - 1]!;
      const activeElement =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      if (event.shiftKey) {
        if (
          !activeElement ||
          activeElement === firstElement ||
          !dialogElement.contains(activeElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
        return;
      }

      if (
        !activeElement ||
        activeElement === lastElement ||
        !dialogElement.contains(activeElement)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    (closeButtonRef.current ?? dialogRef.current)?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onEscape);
      lastFocusedElementRef.current?.focus();
    };
  }, [isMoreMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={`page-navigation border-y border-gray-700 bg-gray-900/95 shadow-sm ${className}`}
      aria-label="Page navigation"
    >
      <div className="w-full">
        <div className="grid grid-cols-6 items-stretch divide-x divide-gray-200 dark:divide-gray-700">
          {pages.map((page) => {
            const isActive = isActivePath(page.href);
            return (
              <Link
                key={page.href}
                href={page.href}
                aria-current={isActive ? "page" : undefined}
                className={`${navItemBaseClass} ${getNavItemStateClass(isActive)}`}
              >
                {page.label}
              </Link>
            );
          })}

          {isRemainingPagesMenuEnabled && remainingPages.length > 0 ? (
            <button
              type="button"
              ref={moreButtonRef}
              aria-haspopup="menu"
              aria-expanded={isMoreMenuOpen}
              aria-controls="page-nav-more-menu"
              onClick={() => setIsMoreMenuOpen((open) => !open)}
              className={`${navItemBaseClass} ${getNavItemStateClass(
                isMoreMenuOpen || isRemainingPageActive,
              )}`}
            >
              {moreLabel}
            </button>
          ) : null}
        </div>
      </div>

      {isRemainingPagesMenuEnabled &&
      remainingPages.length > 0 &&
      isMoreMenuOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-90 bg-linear-to-br from-brand-primary/25 via-gray-900/70 to-black/70 backdrop-blur-sm"
            onClick={() => setIsMoreMenuOpen(false)}
            aria-label={closeMenuLabel}
          />
          <div className="fixed inset-0 z-95 flex items-center justify-center p-4 sm:p-6">
            <div
              role="dialog"
              aria-modal="true"
              aria-label={morePagesLabel}
              ref={dialogRef}
              tabIndex={-1}
              className="flex max-h-[min(78vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-brand-secondary/40 bg-linear-to-b from-white/98 via-white to-brand-primary/5 p-2 shadow-2xl dark:border-brand-secondary/35 dark:from-gray-900/98 dark:via-gray-900 dark:to-brand-primary/18"
            >
              <div className="h-1 rounded-full bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary" />
              <div className="mb-1 flex items-center justify-between border-b border-brand-secondary/30 px-2 py-2 dark:border-brand-secondary/35">
                <div>
                  <p className="font-heading text-[11px] font-semibold tracking-[0.12em] text-brand-secondary-text uppercase dark:text-brand-secondary-light">
                    {overlayEyebrow} - {morePagesLabel}
                  </p>
                  <h3 className="font-heading text-sm font-bold tracking-wide text-brand-primary dark:text-brand-secondary-light sm:text-base">
                    {overlayTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  ref={closeButtonRef}
                  className="rounded-md border border-brand-secondary/35 bg-white/80 p-1.5 text-brand-primary transition-colors hover:bg-brand-primary/10 hover:text-brand-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 dark:border-brand-secondary/45 dark:bg-gray-900/80 dark:text-brand-secondary-light dark:hover:bg-brand-secondary/15"
                  aria-label={closeMenuLabel}
                  onClick={() => setIsMoreMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="close"
                    size="sm"
                    className="leading-none"
                  />
                </button>
              </div>

              <div
                id="page-nav-more-menu"
                role="menu"
                aria-label={morePagesLabel}
                className="min-h-0 flex-1 overflow-y-auto px-1 pb-1"
              >
                {remainingPages.map((page) => {
                  const isActive = isActivePath(page.href);
                  return (
                    <Link
                      key={page.href}
                      href={page.href}
                      role="menuitem"
                      aria-label={page.label}
                      aria-current={isActive ? "page" : undefined}
                      className={`block rounded-md px-3 py-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/70 ${
                        isActive
                          ? "bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20"
                          : "text-gray-700 hover:bg-gray-100 hover:text-brand-secondary dark:text-gray-200 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <span className="block text-sm font-semibold">
                        {page.label}
                      </span>
                      <span className="block text-xs text-gray-600 dark:text-gray-400">
                        {page.description}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </nav>
  );
}
