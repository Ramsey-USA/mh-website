"use client";
import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  type FocusEvent,
} from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/layout/ThemeToggle";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { COMPANY_INFO } from "@/lib/constants/company";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLocale } from "@/hooks/useLocale";
import { globalMenuItemsByLocale } from "@/components/layout/globalMenuItems";

/**
 * Global Hamburger Navigation Component
 *
 * Provides the main site navigation through a fixed-position hamburger menu.
 * This component handles page-to-page navigation and should appear on every page.
 *
 * Features:
 * - Fixed position hamburger menu button
 * - Full-screen overlay navigation when opened
 * - Centered logo with brand navigation
 * - Social media integration
 * - Theme toggle integration
 * - Responsive design with mobile-first approach
 * - Smooth animations and transitions
 * - Auto-close on navigation selection
 *
 * Navigation Structure:
 * - Primary pages: Home, About, Services, Projects, Team, Careers, Contact
 * - Special features: Government Services, Trade Partners
 * - Social links: Facebook, Instagram, LinkedIn, YouTube
 *
 * @component
 * @example
 * ```tsx
 * // Automatically included in layout.tsx - no manual implementation needed
 * import { Navigation } from "@/components/layout";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <Navigation />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 *
 * @see {@link /src/components/navigation/navigationConfigs.ts} - Navigation configurations
 * @see {@link /docs/project/architecture.md} - Project architecture documentation
 */
export function Navigation() {
  type HeaderTooltipId = "logo" | "language" | "phone" | "theme" | "menu";

  const locale = useLocale();
  const isEs = locale === "es";
  const menuItems = globalMenuItemsByLocale[isEs ? "es" : "en"];
  const prioritizedMenuItems = useMemo(() => {
    const primaryPathOrder = ["/services", "/projects", "/contact"];

    const primaryPathItems = primaryPathOrder.flatMap((href) =>
      menuItems.filter((item) => item.href === href),
    );
    const secondaryItems = menuItems.filter(
      (item) => !primaryPathOrder.includes(item.href),
    );

    return [...primaryPathItems, ...secondaryItems];
  }, [menuItems]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<HeaderTooltipId | null>(
    null,
  );
  const headerRef = useRef<HTMLElement>(null);
  const [menuTopOffset, setMenuTopOffset] = useState(0);

  const getTooltipHandlers = (tooltipId: HeaderTooltipId) => ({
    onMouseEnter: () => setActiveTooltip(tooltipId),
    onMouseLeave: () => {
      setActiveTooltip((currentTooltip) =>
        currentTooltip === tooltipId ? null : currentTooltip,
      );
    },
    onFocus: () => setActiveTooltip(tooltipId),
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
        return;
      }

      setActiveTooltip((currentTooltip) =>
        currentTooltip === tooltipId ? null : currentTooltip,
      );
    },
  });

  const getTooltipClassName = (
    tooltipId: HeaderTooltipId,
    widthClassName: string,
  ) =>
    `absolute top-full mt-2 z-50 transition-all duration-300 ${widthClassName} ${
      activeTooltip === tooltipId
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"
    } max-[768px]:hidden`;

  useLayoutEffect(() => {
    const root = document.documentElement;

    const updateOffset = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setMenuTopOffset(rect.bottom);
        root.style.setProperty(
          "--mh-nav-offset",
          `${Math.ceil(rect.bottom)}px`,
        );
      }
    };
    updateOffset();
    const ResizeObserverImpl = globalThis.ResizeObserver;
    if (!ResizeObserverImpl || !headerRef.current) {
      return;
    }

    const observer = new ResizeObserverImpl(updateOffset);
    observer.observe(headerRef.current);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--mh-nav-offset");
    };
  }, []);

  const navText = isEs
    ? {
        closeMenuLabel: "Cerrar menu",
        openMenuLabel: "Abrir menu",
        connectLabel: "Conéctate con nosotros",
        facebookLabel: "Sigue a MH Construction en Facebook",
        instagramLabel: "Ver MH Construction en Instagram",
        twitterLabel: "Sigue a MH Construction en X (Twitter)",
        youtubeLabel: "Ver MH Construction en YouTube",
        linkedinLabel: "Conecta con MH Construction en LinkedIn",
        privacyLabel: "Privacidad",
        termsLabel: "Terminos",
        accessibilityLabel: "Accesibilidad",
        veteranBadge: "Empresa veterana • Licencia WA OR ID",
        startHereLabel: "Empiece aqui",
        startHereHint: "Elija su siguiente paso mas rapido",
        startServicesLabel: "Servicios",
        startProjectsLabel: "Proyectos",
        startContactLabel: "Contacto",
      }
    : {
        closeMenuLabel: "Close menu",
        openMenuLabel: "Open menu",
        connectLabel: "Connect With Us",
        facebookLabel: "Follow MH Construction on Facebook",
        instagramLabel: "View MH Construction on Instagram",
        twitterLabel: "Follow MH Construction on X (Twitter)",
        youtubeLabel: "Watch MH Construction on YouTube",
        linkedinLabel: "Connect with MH Construction on LinkedIn",
        privacyLabel: "Privacy",
        termsLabel: "Terms",
        accessibilityLabel: "Accessibility",
        veteranBadge: "Veteran-Owned • Licensed WA OR ID",
        startHereLabel: "Start Here",
        startHereHint: "Choose the fastest next step",
        startServicesLabel: "Services",
        startProjectsLabel: "Projects",
        startContactLabel: "Contact",
      };
  const menuToggleAriaLabel = isMenuOpen
    ? navText.closeMenuLabel
    : navText.openMenuLabel;
  const controlButtonClassName =
    "relative bg-brand-primary hover:bg-brand-primary-dark shadow-lg hover:shadow-xl p-1.5 max-[360px]:p-1.5 xs:p-2 sm:p-2.5 rounded-lg sm:rounded-xl transition-all duration-300 touch-manipulation border-2 border-brand-secondary hover:border-brand-secondary-light outline outline-2 outline-offset-1 outline-brand-secondary/50 hover:outline-brand-secondary min-w-9 min-h-9 max-[360px]:min-w-[34px] max-[360px]:min-h-[34px] xs:min-w-11 xs:min-h-11 sm:min-w-12 sm:min-h-12 flex items-center justify-center";

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    globalThis.addEventListener("keydown", handleEscape);
    return () => {
      globalThis.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      {isMenuOpen && (
        <button
          type="button"
          className="z-60 fixed inset-x-0 bottom-0 bg-black/20 backdrop-blur-sm transition-all duration-300 cursor-pointer"
          style={{ top: menuTopOffset }}
          onClick={() => setIsMenuOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setIsMenuOpen(false)}
          aria-label={navText.closeMenuLabel}
        />
      )}

      {/* Main Header - Unified controls and logo layout */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-70 bg-linear-to-br from-gray-900/92 via-brand-primary/88 to-gray-900/92 backdrop-blur-md pointer-events-none"
      >
        <div className="w-full px-1.5 xs:px-2.5 sm:px-3 lg:px-4 xl:px-5 py-2 xs:py-3 sm:py-4">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-1.5 max-[768px]:grid-cols-1 max-[360px]:gap-1 xs:gap-2 sm:gap-2.5">
            <div className="flex items-center min-w-0 max-[768px]:justify-start">
              {/* Logo - anchored at the left edge */}
              <div
                className="shrink-0 pointer-events-auto relative"
                {...getTooltipHandlers("logo")}
              >
                <Link
                  href="/"
                  className="flex items-center justify-center h-14 max-[360px]:h-14 xs:h-16 sm:h-18 lg:h-20 min-h-14 xs:min-h-16 sm:min-h-18 lg:min-h-20 min-w-24 xs:min-w-28 sm:min-w-28 lg:min-w-32 px-3 max-[360px]:px-2.5 xs:px-3.5 sm:px-4 lg:px-4.5 py-1.5 max-[360px]:py-1.5 xs:py-2 sm:py-2 transition-all duration-300 bg-slate-900 shadow-lg hover:shadow-xl rounded-lg sm:rounded-xl border-2 border-brand-secondary hover:border-brand-secondary-light outline-2 outline-offset-2 outline-brand-secondary/50 hover:outline-brand-secondary"
                >
                  <div
                    className="relative h-full shrink-0"
                    style={{ aspectRatio: "247 / 141" }}
                  >
                    <Image
                      src="/images/logo/mh-logo.webp"
                      alt="MH Construction"
                      fill
                      sizes="(max-width: 360px) 108px, (max-width: 475px) 124px, (max-width: 640px) 132px, (max-width: 1024px) 132px, 152px"
                      quality={85}
                      className="drop-shadow-lg object-contain object-center"
                    />
                  </div>
                </Link>

                {/* Hover Tooltip - Logo */}
                <div
                  className={getTooltipClassName(
                    "logo",
                    "left-0 w-[min(92vw,14rem)] max-w-[calc(100vw-1rem)]",
                  )}
                >
                  <div className="relative">
                    <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary blur-md opacity-35" />
                    <div className="px-6 py-4 bg-linear-to-br from-brand-primary/95 via-gray-900/95 to-brand-primary/95 dark:from-gray-900/98 dark:via-gray-800/98 dark:to-gray-900/98 border-2 border-brand-secondary rounded-xl shadow-2xl backdrop-blur-sm">
                      <p className="text-center text-base sm:text-lg font-bold text-white drop-shadow-lg">
                        MH Construction
                      </p>
                      <p className="font-body text-center text-xs sm:text-sm text-brand-secondary/90 mt-2 font-medium leading-relaxed">
                        {isEs ? "Volver al inicio" : "Return to homepage"}
                      </p>
                    </div>
                    <div className="absolute -top-1.5 left-6 w-3 h-3 bg-linear-to-br from-brand-primary/95 to-brand-primary/95 dark:from-gray-900/98 dark:to-gray-900/98 border border-brand-secondary rotate-45" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right-side controls */}
            <div className="pointer-events-auto justify-self-end flex items-center gap-2 max-[360px]:gap-1.5 xs:gap-2 sm:gap-3 shrink-0 max-[768px]:grid max-[768px]:grid-cols-[minmax(0,1fr)_auto_auto_auto] max-[768px]:items-center max-[768px]:justify-self-stretch max-[768px]:gap-2.5 max-[768px]:pt-1">
              <div
                className="order-4 relative max-[768px]:justify-self-end"
                {...getTooltipHandlers("language")}
              >
                <LanguageToggle className="order-4" />

                {/* Hover Tooltip - Language Toggle */}
                <div
                  className={getTooltipClassName(
                    "language",
                    "right-0 w-[min(92vw,14rem)] max-w-[calc(100vw-1rem)]",
                  )}
                >
                  <div className="relative">
                    <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary blur-md opacity-35" />
                    <div className="px-6 py-4 bg-linear-to-br from-brand-primary/95 via-gray-900/95 to-brand-primary/95 dark:from-gray-900/98 dark:via-gray-800/98 dark:to-gray-900/98 border-2 border-brand-secondary rounded-xl shadow-2xl backdrop-blur-sm">
                      <p className="text-center text-base sm:text-lg font-bold text-white drop-shadow-lg">
                        {isEs ? "Idioma" : "Language"}
                      </p>
                      <p className="font-body text-center text-xs sm:text-sm text-brand-secondary/90 mt-2 font-medium leading-relaxed">
                        {isEs
                          ? "Cambiar entre español e inglés"
                          : "Switch between Spanish and English"}
                      </p>
                    </div>
                    <div className="absolute -top-1.5 right-6 w-3 h-3 bg-linear-to-br from-brand-primary/95 to-brand-primary/95 dark:from-gray-900/98 dark:to-gray-900/98 border border-brand-secondary rotate-45" />
                  </div>
                </div>
              </div>

              <div
                className="order-1 flex relative max-[768px]:justify-self-stretch"
                {...getTooltipHandlers("phone")}
              >
                <a
                  href={`tel:${COMPANY_INFO.phone.tel}`}
                  className={`${controlButtonClassName} gap-1.5 max-[768px]:w-full max-[768px]:justify-center`}
                  aria-label={
                    isEs ? "Llamar a MH Construction" : "Call MH Construction"
                  }
                >
                  <MaterialIcon
                    icon="phone"
                    size="sm"
                    className="text-brand-secondary max-[360px]:hidden"
                  />
                  <span className="text-[10px] xs:text-xs sm:text-sm font-semibold text-brand-secondary whitespace-nowrap">
                    {COMPANY_INFO.phone.display}
                  </span>
                </a>

                {/* Hover Tooltip - Phone Number Showcase */}
                <div
                  className={getTooltipClassName(
                    "phone",
                    "right-0 w-[min(92vw,16rem)] max-w-[calc(100vw-1rem)]",
                  )}
                >
                  {/* Animated Phone Number Display */}
                  <div className="relative">
                    {/* Background glow effect */}
                    <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary blur-md opacity-35" />

                    {/* Main tooltip card */}
                    <div className="px-6 py-4 bg-linear-to-br from-brand-primary/95 via-gray-900/95 to-brand-primary/95 dark:from-gray-900/98 dark:via-gray-800/98 dark:to-gray-900/98 border-2 border-brand-secondary rounded-xl shadow-2xl backdrop-blur-sm">
                      <p className="text-center text-base sm:text-lg font-bold text-white drop-shadow-lg whitespace-nowrap">
                        {COMPANY_INFO.phone.display}
                      </p>
                      <p className="font-body text-center text-xs sm:text-sm text-brand-secondary/90 mt-2 font-medium leading-relaxed">
                        {isEs
                          ? "Toca para llamar al equipo"
                          : "Tap to call our team"}
                      </p>
                    </div>

                    {/* Arrow pointer */}
                    <div className="absolute -top-1.5 right-6 w-3 h-3 bg-linear-to-br from-brand-primary/95 to-brand-primary/95 dark:from-gray-900/98 dark:to-gray-900/98 border border-brand-secondary rotate-45" />
                  </div>
                </div>
              </div>

              <div
                className="order-3 relative max-[768px]:justify-self-center"
                {...getTooltipHandlers("theme")}
              >
                <ThemeToggle
                  compact
                  size="sm"
                  className={controlButtonClassName}
                />

                {/* Hover Tooltip - Theme Toggle */}
                <div
                  className={getTooltipClassName(
                    "theme",
                    "right-0 w-[min(92vw,14rem)] max-w-[calc(100vw-1rem)]",
                  )}
                >
                  <div className="relative">
                    <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary blur-md opacity-35" />
                    <div className="px-6 py-4 bg-linear-to-br from-brand-primary/95 via-gray-900/95 to-brand-primary/95 dark:from-gray-900/98 dark:via-gray-800/98 dark:to-gray-900/98 border-2 border-brand-secondary rounded-xl shadow-2xl backdrop-blur-sm">
                      <p className="text-center text-base sm:text-lg font-bold text-white drop-shadow-lg">
                        {isEs ? "Tema" : "Theme"}
                      </p>
                      <p className="font-body text-center text-xs sm:text-sm text-brand-secondary/90 mt-2 font-medium leading-relaxed">
                        {isEs
                          ? "Alterna entre tema claro y oscuro"
                          : "Toggle between light and dark theme"}
                      </p>
                    </div>
                    <div className="absolute -top-1.5 right-6 w-3 h-3 bg-linear-to-br from-brand-primary/95 to-brand-primary/95 dark:from-gray-900/98 dark:to-gray-900/98 border border-brand-secondary rotate-45" />
                  </div>
                </div>
              </div>

              <div
                className="order-2 relative max-[768px]:justify-self-center"
                {...getTooltipHandlers("menu")}
              >
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className={`${controlButtonClassName}`}
                  aria-label={menuToggleAriaLabel}
                >
                  <div className="flex flex-col justify-center space-y-0.5 xs:space-y-1 w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6">
                    <span
                      className={`w-full h-0.5 bg-brand-secondary transition-all duration-300 transform ${
                        isMenuOpen
                          ? "rotate-45 translate-y-[0.4rem] xs:translate-y-2"
                          : ""
                      }`}
                    />
                    <span
                      className={`w-full h-0.5 bg-brand-secondary transition-all duration-300 ${
                        isMenuOpen ? "opacity-0" : "opacity-100"
                      }
              `}
                    />
                    <span
                      className={`w-full h-0.5 bg-brand-secondary transition-all duration-300 transform ${
                        isMenuOpen
                          ? "-rotate-45 translate-y-[-0.4rem] xs:-translate-y-2"
                          : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Hover Tooltip - Menu Toggle */}
                <div
                  className={getTooltipClassName(
                    "menu",
                    "right-0 w-[min(92vw,14rem)] max-w-[calc(100vw-1rem)]",
                  )}
                >
                  <div className="relative">
                    <div className="absolute inset-0 -z-10 rounded-xl bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary blur-md opacity-35" />
                    <div className="px-6 py-4 bg-linear-to-br from-brand-primary/95 via-gray-900/95 to-brand-primary/95 dark:from-gray-900/98 dark:via-gray-800/98 dark:to-gray-900/98 border-2 border-brand-secondary rounded-xl shadow-2xl backdrop-blur-sm">
                      <p className="text-center text-base sm:text-lg font-bold text-white drop-shadow-lg">
                        {isEs ? "Menu" : "Menu"}
                      </p>
                      <p className="font-body text-center text-xs sm:text-sm text-brand-secondary/90 mt-2 font-medium leading-relaxed">
                        {isMenuOpen
                          ? isEs
                            ? "Cerrar navegacion"
                            : "Close navigation"
                          : isEs
                            ? "Abrir navegacion"
                            : "Open navigation"}
                      </p>
                    </div>
                    <div className="absolute -top-1.5 right-6 w-3 h-3 bg-linear-to-br from-brand-primary/95 to-brand-primary/95 dark:from-gray-900/98 dark:to-gray-900/98 border border-brand-secondary rotate-45" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed left-0 right-0 bottom-0 z-65 transition-all duration-300 ease-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-3 pointer-events-none"
        }`}
        style={{ top: menuTopOffset }}
      >
        <div className="relative bg-linear-to-br from-white dark:from-gray-900 via-gray-50 dark:via-gray-800 to-white dark:to-gray-900 shadow-inner backdrop-blur-lg border-gray-200 dark:border-gray-700 border-b h-full">
          {/* Logo Background Watermark */}
          <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src="/images/logo/mh-logo.webp"
                alt=""
                fill
                sizes="100vw"
                quality={20}
                priority={false}
                style={{ objectFit: "contain", objectPosition: "center" }}
                className="opacity-5 dark:opacity-10 grayscale filter"
              />
            </div>
          </div>

          {/* Menu Content - fills viewport, no scroll */}
          <div className="z-10 relative flex h-full flex-col overflow-hidden px-3 py-3 sm:px-4 sm:py-4">
            <div className="mb-2 rounded-lg border border-brand-primary/20 bg-white/80 p-2 dark:border-brand-secondary/30 dark:bg-gray-900/80 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.09em] text-brand-primary dark:text-brand-secondary">
                  {navText.startHereLabel}
                </p>
                <p className="text-[9px] text-gray-500 dark:text-gray-400">
                  {navText.startHereHint}
                </p>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                <Link
                  href="/services?utm_source=nav&utm_medium=menu&utm_campaign=primary-paths&utm_content=start-here-services"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-md border border-brand-primary/25 bg-brand-primary/8 px-2 py-1.5 text-[10px] font-semibold text-brand-primary hover:bg-brand-primary/15 dark:border-brand-secondary/35 dark:bg-brand-secondary/12 dark:text-brand-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navText.startServicesLabel}
                </Link>
                <Link
                  href="/projects?utm_source=nav&utm_medium=menu&utm_campaign=primary-paths&utm_content=start-here-projects"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-md border border-brand-primary/25 bg-brand-primary/8 px-2 py-1.5 text-[10px] font-semibold text-brand-primary hover:bg-brand-primary/15 dark:border-brand-secondary/35 dark:bg-brand-secondary/12 dark:text-brand-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navText.startProjectsLabel}
                </Link>
                <Link
                  href="/contact?utm_source=nav&utm_medium=menu&utm_campaign=primary-paths&utm_content=start-here-contact"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-md border border-brand-primary/25 bg-brand-primary/8 px-2 py-1.5 text-[10px] font-semibold text-brand-primary hover:bg-brand-primary/15 dark:border-brand-secondary/35 dark:bg-brand-secondary/12 dark:text-brand-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {navText.startContactLabel}
                </Link>
              </div>
            </div>

            {/* Main Navigation Links - rows fill available height */}
            <div className="min-h-0 flex-1 overflow-y-auto overflow-x-visible pr-0.5">
              <div className="h-full grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-x-1.5 sm:gap-x-2 gap-y-1.5 sm:gap-y-2 auto-rows-fr">
                {prioritizedMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    aria-label={item.label}
                    className="group flex flex-col items-center justify-center gap-0.5 hover:bg-brand-primary/8 dark:hover:bg-brand-primary/15 px-1 rounded-lg border border-transparent hover:border-brand-primary/20 text-center transition-all duration-200 touch-manipulation overflow-hidden"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MaterialIcon
                      icon={item.icon}
                      size="md"
                      className="text-brand-primary/70 group-hover:text-brand-primary dark:text-brand-secondary/70 dark:group-hover:text-brand-secondary transition-all duration-200 shrink-0"
                      style={{ fontSize: "clamp(18px, 3.5vw, 26px)" }}
                    />
                    <span
                      className="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-brand-primary dark:group-hover:text-brand-secondary leading-tight w-full"
                      style={{ fontSize: "clamp(9px, 2vw, 13px)" }}
                    >
                      {item.label}
                    </span>
                    <span
                      className="text-gray-400 dark:text-gray-500 group-hover:text-brand-primary/60 dark:group-hover:text-brand-secondary/60 leading-none w-full"
                      style={{ fontSize: "clamp(7px, 1.5vw, 10px)" }}
                    >
                      {item.subLabel}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Social Media Links - Compact footer */}
            <div className="shrink-0 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="mb-2 sm:mb-3 text-center">
                <h4 className="font-bold text-brand-secondary text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.14em]">
                  {navText.connectLabel}
                </h4>
              </div>
              <div className="flex justify-center gap-2 sm:gap-2.5">
                <a
                  href={COMPANY_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex justify-center items-center bg-linear-to-br from-gray-700 to-gray-800 hover:from-[#1877F2] hover:via-[#42A5F5] hover:to-[#1565C0] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#1877F2] rounded-lg transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#1877F2]/40 overflow-visible"
                  aria-label={navText.facebookLabel}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900/95 px-2 py-1 text-[16px] font-semibold text-white shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100">
                    {navText.facebookLabel}
                  </span>
                  <MaterialIcon
                    icon="thumb_up"
                    size="md"
                    className="text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.8)]"
                  />
                </a>
                <a
                  href={COMPANY_INFO.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex justify-center items-center bg-linear-to-br from-gray-700 to-gray-800 hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#E4405F] rounded-lg transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#E4405F]/40 overflow-visible"
                  aria-label={navText.instagramLabel}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900/95 px-2 py-1 text-[16px] font-semibold text-white shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100">
                    {navText.instagramLabel}
                  </span>
                  <MaterialIcon
                    icon="photo_camera"
                    size="md"
                    className="text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.8)]"
                  />
                </a>
                <a
                  href={COMPANY_INFO.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex justify-center items-center bg-linear-to-br from-gray-700 to-gray-800 hover:from-[#000000] hover:via-[#1D9BF0] hover:to-[#000000] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#1D9BF0] rounded-lg transition-all duration-300 touch-manipulation shadow-md hover:shadow-black/40 overflow-visible"
                  aria-label={navText.twitterLabel}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900/95 px-2 py-1 text-[16px] font-semibold text-white shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100">
                    {navText.twitterLabel}
                  </span>
                  <MaterialIcon
                    icon="alternate_email"
                    size="md"
                    className="text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(29,155,240,0.8)]"
                  />
                </a>
                <a
                  href={COMPANY_INFO.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex justify-center items-center bg-linear-to-br from-gray-700 to-gray-800 hover:from-[#FF0000] hover:via-[#FF4444] hover:to-[#CC0000] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#FF0000] rounded-lg transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#FF0000]/40 overflow-visible"
                  aria-label={navText.youtubeLabel}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900/95 px-2 py-1 text-[16px] font-semibold text-white shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100">
                    {navText.youtubeLabel}
                  </span>
                  <MaterialIcon
                    icon="smart_display"
                    size="md"
                    className="text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
                  />
                </a>
                <a
                  href={COMPANY_INFO.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex justify-center items-center bg-linear-to-br from-gray-700 to-gray-800 hover:from-[#0A66C2] hover:via-[#0E76A8] hover:to-[#004182] p-2 sm:p-2.5 border-2 border-gray-600 hover:border-[#0A66C2] rounded-lg transition-all duration-300 touch-manipulation shadow-md hover:shadow-[#0A66C2]/40 overflow-visible"
                  aria-label={navText.linkedinLabel}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-gray-900/95 px-2 py-1 text-[16px] font-semibold text-white shadow-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100">
                    {navText.linkedinLabel}
                  </span>
                  <MaterialIcon
                    icon="business_center"
                    size="md"
                    className="text-gray-600 dark:text-gray-300 group-hover:text-white transition-colors drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.8)]"
                  />
                </a>
              </div>

              {/* Legal Links Row */}
              <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/privacy"
                  prefetch={false}
                  className="group flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-linear-to-r from-gray-100 dark:from-gray-800 to-gray-50 dark:to-gray-700 hover:from-brand-primary/10 hover:to-brand-secondary/10 hover:border-brand-primary/40 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="shield"
                    size="sm"
                    className="text-gray-400 group-hover:text-brand-secondary transition-colors"
                    style={{ fontSize: "12px" }}
                  />
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white transition-colors tracking-[0.01em]">
                    {navText.privacyLabel}
                  </span>
                </Link>
                <Link
                  href="/terms"
                  prefetch={false}
                  className="group flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-linear-to-r from-gray-100 dark:from-gray-800 to-gray-50 dark:to-gray-700 hover:from-brand-primary/10 hover:to-brand-secondary/10 hover:border-brand-primary/40 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="gavel"
                    size="sm"
                    className="text-gray-400 group-hover:text-brand-secondary transition-colors"
                    style={{ fontSize: "12px" }}
                  />
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white transition-colors tracking-[0.01em]">
                    {navText.termsLabel}
                  </span>
                </Link>
                <Link
                  href="/accessibility"
                  className="group flex items-center gap-1 px-2 py-1 rounded-full border border-gray-300 dark:border-gray-600 bg-linear-to-r from-gray-100 dark:from-gray-800 to-gray-50 dark:to-gray-700 hover:from-brand-primary/10 hover:to-brand-secondary/10 hover:border-brand-primary/40 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MaterialIcon
                    icon="accessibility"
                    size="sm"
                    className="text-gray-400 group-hover:text-brand-secondary transition-colors"
                    style={{ fontSize: "12px" }}
                  />
                  <span className="text-[11px] sm:text-xs font-semibold text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-white transition-colors tracking-[0.01em]">
                    {navText.accessibilityLabel}
                  </span>
                </Link>
              </div>

              {/* Veteran-Owned Badge */}
              <div className="flex justify-center items-center gap-2 mt-3 text-gray-400 dark:text-gray-500">
                <MaterialIcon
                  icon="military_tech"
                  size="sm"
                  className="text-brand-secondary/60"
                  style={{ fontSize: "14px" }}
                />
                <span className="text-[11px] sm:text-xs md:text-sm font-medium tracking-[0.01em] leading-tight text-center">
                  {navText.veteranBadge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
