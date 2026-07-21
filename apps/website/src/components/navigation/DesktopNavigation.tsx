"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Link, usePathname } from "@/i18n/navigation";
import { useClickTracking } from "@/lib/analytics/hooks";
import type { NavItem } from "./navigation-data";

type DesktopNavigationProps = {
  items: NavItem[];
  secondaryItems: NavItem[];
  labels: {
    navLabel: string;
    moreLabel: string;
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

export function DesktopNavigation({
  items,
  secondaryItems,
  labels,
  ctaHref,
}: Readonly<DesktopNavigationProps>) {
  const pathname = usePathname();
  const trackClick = useClickTracking();

  return (
    <NavigationMenu.Root className="hidden min-w-0 grow items-center justify-end gap-6 lg:flex">
      <nav aria-label={labels.navLabel} className="min-w-0">
        <NavigationMenu.List className="flex items-center gap-2">
          {items.map((item) => {
            const isActive = isActivePath(pathname, item.href);

            return (
              <NavigationMenu.Item key={item.key}>
                <NavigationMenu.Link asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() =>
                      trackClick("header-primary-nav", {
                        location: "desktop",
                        routeKey: item.key,
                        href: item.href,
                      })
                    }
                    className={`font-subheading rounded-md px-3 py-2 text-[0.95rem] tracking-[0.04em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                      isActive
                        ? "bg-brand-primary/14 text-brand-primary dark:bg-brand-secondary/20 dark:text-brand-secondary-light"
                        : "text-gray-800 hover:bg-gray-100 hover:text-brand-primary dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-brand-secondary-light"
                    }`}
                  >
                    {item.label}
                  </Link>
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            );
          })}

          {secondaryItems.length > 0 ? (
            <NavigationMenu.Item>
              <NavigationMenu.Trigger className="font-subheading inline-flex items-center rounded-md px-3 py-2 text-[0.95rem] tracking-[0.04em] text-gray-700 transition-colors hover:bg-gray-100 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-brand-secondary-light dark:focus-visible:ring-offset-gray-950">
                {labels.moreLabel}
              </NavigationMenu.Trigger>
              <NavigationMenu.Content className="z-90 rounded-lg border border-gray-200 bg-white p-3 shadow-xl dark:border-gray-700 dark:bg-gray-900">
                <ul className="grid min-w-[16rem] gap-1">
                  {secondaryItems.map((item) => {
                    const isActive = isActivePath(pathname, item.href);

                    return (
                      <li key={item.key}>
                        <NavigationMenu.Link asChild>
                          <Link
                            href={item.href}
                            aria-current={isActive ? "page" : undefined}
                            onClick={() =>
                              trackClick("header-secondary-nav", {
                                location: "desktop",
                                routeKey: item.key,
                                href: item.href,
                              })
                            }
                            className={`font-subheading block rounded-md px-3 py-2 text-[0.95rem] tracking-[0.03em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950 ${
                              isActive
                                ? "bg-brand-primary/14 text-brand-primary dark:bg-brand-secondary/20 dark:text-brand-secondary-light"
                                : "text-gray-700 hover:bg-gray-100 hover:text-brand-primary dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-brand-secondary-light"
                            }`}
                          >
                            {item.label}
                          </Link>
                        </NavigationMenu.Link>
                      </li>
                    );
                  })}
                </ul>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          ) : null}

          <NavigationMenu.Item>
            <NavigationMenu.Link asChild>
              <Link
                href={ctaHref}
                onClick={() =>
                  trackClick("header-primary-cta", {
                    location: "desktop",
                    href: ctaHref,
                  })
                }
                className="font-heading rounded-md border border-brand-primary bg-brand-primary px-4 py-2 text-xs uppercase tracking-[0.08em] text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/90 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-950"
              >
                {labels.ctaLabel}
              </Link>
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </nav>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}
