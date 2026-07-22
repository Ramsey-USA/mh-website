"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useClickTracking } from "@/lib/analytics/hooks";
import type { NavItem } from "./navigation-data";

type MobileNavigationProps = {
  primaryItems: NavItem[];
  secondaryItems: NavItem[];
  labels: {
    navLabel: string;
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
  const panelId = useId();
  const pathname = usePathname();
  const trackClick = useClickTracking();

  const items = useMemo(
    () => [...primaryItems, ...secondaryItems],
    [primaryItems, secondaryItems],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-end">
        <button
          type="button"
          aria-label={open ? labels.closeMenuLabel : labels.openMenuLabel}
          aria-expanded={open}
          aria-controls={panelId}
          className="font-subheading min-h-11 rounded-md border border-brand-primary/35 px-4 py-2 text-xs uppercase tracking-[0.12em] text-brand-primary transition-colors hover:bg-brand-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-brand-secondary-light dark:hover:bg-brand-secondary/20 dark:focus-visible:ring-offset-gray-950"
          onClick={() => {
            const nextOpen = !open;
            setOpen(nextOpen);

            trackClick("header-mobile-toggle", {
              action: nextOpen ? "open" : "close",
            });
          }}
        >
          {labels.mobileMenuLabel}
        </button>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-80 bg-black/30"
            aria-label={labels.closeMenuLabel}
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={labels.navLabel}
            className="fixed inset-x-3 z-90 rounded-xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-700 dark:bg-gray-900"
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
                onClick={() => setOpen(false)}
              >
                {labels.closeMenuLabel}
              </button>
            </div>

            <nav aria-label={labels.navLabel}>
              <ul className="grid gap-1">
                {items.map((item) => {
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
                          setOpen(false);
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
            </nav>

            <Link
              href={ctaHref}
              className="font-subheading mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-md border border-brand-primary bg-brand-primary px-4 py-2 text-xs uppercase tracking-[0.09em] text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              onClick={() => {
                setOpen(false);
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
