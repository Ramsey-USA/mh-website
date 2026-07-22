"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useClickTracking } from "@/lib/analytics/hooks";
import { useDialogBehavior } from "@/hooks/useDialogBehavior";
import type { NavItem } from "./navigation-data";

type MobileNavigationProps = {
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
  labels: {
    navLabel: string;
    moreLabel: string;
    homeLabel: string;
    mobileMenuLabel: string;
    openMenuLabel: string;
    closeMenuLabel: string;
    ctaLabel: string;
  };
  ctaHref: string;
};

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigation({
  primaryItems,
  secondaryItems,
  labels,
  ctaHref,
}: Readonly<MobileNavigationProps>) {
  const [open, setOpen] = useState(false);
  const [rendered, setRendered] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelId = useId();
  const pathname = usePathname();
  const trackClick = useClickTracking();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousPathnameRef = useRef(pathname);

  const openMenu = useCallback(() => {
    setRendered(true);
    setOpen(true);
    window.requestAnimationFrame(() => {
      setVisible(true);
    });
  }, []);

  const closeMenu = useCallback(() => {
    setVisible(false);
    setOpen(false);
  }, []);

  useDialogBehavior({
    isOpen: open,
    onClose: closeMenu,
    dialogRef: panelRef,
  });

  useEffect(() => {
    if (open && previousPathnameRef.current !== pathname) {
      closeMenu();
    }

    previousPathnameRef.current = pathname;
  }, [pathname, open, closeMenu]);

  useEffect(() => {
    if (open) {
      setRendered(true);
      return;
    }

    if (!rendered) {
      return;
    }

    const closeDelay = window.setTimeout(() => {
      setRendered(false);
    }, 180);

    return () => {
      window.clearTimeout(closeDelay);
    };
  }, [open, rendered]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const onViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        closeMenu();
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", onViewportChange);
    } else {
      mediaQuery.addListener(onViewportChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", onViewportChange);
      } else {
        mediaQuery.removeListener(onViewportChange);
      }
    };
  }, [closeMenu]);

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-end">
        <button
          type="button"
          aria-label={open ? labels.closeMenuLabel : labels.openMenuLabel}
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-controls={panelId}
          className="font-subheading min-h-11 rounded-md border border-brand-primary/35 px-4 py-2 text-xs uppercase tracking-[0.12em] text-brand-primary transition-colors hover:bg-brand-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-brand-secondary-light dark:hover:bg-brand-secondary/20 dark:focus-visible:ring-offset-gray-950"
          onClick={() => {
            const nextOpen = !open;
            if (nextOpen) {
              openMenu();
            } else {
              closeMenu();
            }

            trackClick("header-mobile-toggle", {
              action: nextOpen ? "open" : "close",
            });
          }}
        >
          {labels.mobileMenuLabel}
        </button>
      </div>

      {rendered ? (
        <>
          <button
            type="button"
            className={`fixed inset-0 z-80 bg-black/35 backdrop-blur-[1px] transition-opacity duration-200 ease-out motion-reduce:transition-none ${
              visible ? "opacity-100" : "opacity-0"
            }`}
            aria-label={labels.closeMenuLabel}
            aria-hidden={!open}
            onClick={closeMenu}
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={labels.navLabel}
            aria-hidden={!open}
            className={`fixed inset-x-3 z-90 max-h-[calc(100dvh-var(--mh-nav-offset,6.5rem)-1rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 shadow-2xl transition-all duration-200 ease-out motion-reduce:transition-none dark:border-gray-700 dark:bg-gray-900 ${
              visible
                ? "translate-y-0 scale-100 opacity-100"
                : "pointer-events-none -translate-y-2 scale-[0.985] opacity-0"
            }`}
            style={{ top: "calc(var(--mh-nav-offset, 6.5rem) + 0.5rem)" }}
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-subheading text-xs uppercase tracking-[0.16em] text-brand-secondary">
                {labels.navLabel}
              </p>
              <button
                type="button"
                className="font-subheading rounded-md border border-gray-300 px-2 py-1 text-[0.7rem] uppercase tracking-widest text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:focus-visible:ring-offset-gray-950"
                aria-label={labels.closeMenuLabel}
                onClick={closeMenu}
              >
                {labels.closeMenuLabel}
              </button>
            </div>

            <nav aria-label={labels.navLabel}>
              <ul className="grid gap-1">
                <li>
                  <Link
                    href="/"
                    aria-current={pathname === "/" ? "page" : undefined}
                    className={`font-subheading block rounded-md px-3 py-2 text-[0.95rem] tracking-[0.03em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                      pathname === "/"
                        ? "bg-brand-primary/14 text-brand-primary dark:bg-brand-secondary/20 dark:text-brand-secondary-light"
                        : "text-gray-800 hover:bg-gray-100 hover:text-brand-primary dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-brand-secondary-light"
                    }`}
                    onClick={() => {
                      closeMenu();
                      trackClick("header-mobile-nav", {
                        routeKey: "home",
                        href: "/",
                      });
                    }}
                  >
                    {labels.homeLabel}
                  </Link>
                </li>

                {primaryItems.map((item) => {
                  const isActive = isActivePath(pathname, item.href);

                  return (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`font-subheading block rounded-md px-3 py-2 text-[0.95rem] tracking-[0.03em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                          isActive
                            ? "bg-brand-primary/14 text-brand-primary dark:bg-brand-secondary/20 dark:text-brand-secondary-light"
                            : "text-gray-800 hover:bg-gray-100 hover:text-brand-primary dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-brand-secondary-light"
                        }`}
                        onClick={() => {
                          closeMenu();
                          trackClick("header-mobile-nav", {
                            routeKey: item.key,
                            href: item.href,
                          });
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {secondaryItems.length > 0 ? (
                <>
                  <p className="mt-4 px-1 font-subheading text-[0.7rem] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
                    {labels.moreLabel}
                  </p>
                  <ul className="mt-1 grid gap-1">
                    {secondaryItems.map((item) => {
                      const isActive = isActivePath(pathname, item.href);

                      return (
                        <li key={item.key}>
                          <Link
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            className={`font-subheading block rounded-md px-3 py-2 text-[0.95rem] tracking-[0.03em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                              isActive
                                ? "bg-brand-primary/14 text-brand-primary dark:bg-brand-secondary/20 dark:text-brand-secondary-light"
                                : "text-gray-800 hover:bg-gray-100 hover:text-brand-primary dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-brand-secondary-light"
                            }`}
                            onClick={() => {
                              closeMenu();
                              trackClick("header-mobile-nav", {
                                routeKey: item.key,
                                href: item.href,
                              });
                            }}
                          >
                            {item.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : null}
            </nav>

            <Link
              href={ctaHref}
              className="font-subheading mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-brand-primary bg-brand-primary px-4 py-2 text-xs uppercase tracking-[0.09em] text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              onClick={() => {
                closeMenu();
                trackClick("header-mobile-cta", { href: ctaHref });
              }}
            >
              {labels.ctaLabel}
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
