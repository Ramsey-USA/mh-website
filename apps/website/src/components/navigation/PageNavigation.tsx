"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { type NavigationItem, getNavigationLabel } from "./navigationConfigs";
// import { useIsMobile } from "@/hooks/use-breakpoint";
import { useLocale } from "@/hooks/useLocale";

/**
 * Page-Specific Sectional Navigation Component
 *
 * Provides contextual navigation for specific sections within a page and related pages.
 * This component should be placed after the hero section on each page and configured
 * with page-specific navigation items.
 *
 * Features:
 * - Horizontal scrolling navigation bar
 * - Material Design icons with smooth hover effects
 * - Responsive design with touch-friendly targets
 * - Backdrop blur background with brand accent border
 * - Dark/light theme support
 */
interface PageNavigationProps {
  items: NavigationItem[];
  className?: string;
}

export function PageNavigation({ items, className = "" }: PageNavigationProps) {
  const pathname = usePathname();
  // const isMobile = useIsMobile();
  const locale = useLocale();

  const handleHashNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.includes("#")) return;

    const [path, hashPart] = href.split("#");
    const hash = hashPart?.trim();
    if (!hash) return;

    const isSamePageHash = path === "" || path === pathname;
    if (!isSamePageHash) return;

    event.preventDefault();

    const target = document.getElementById(hash);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    globalThis.history.pushState(null, "", `#${hash}`);
  };

  return (
    <nav
      className={`page-navigation flex overflow-x-auto backdrop-blur-md border-t border-brand-primary/30 ${className}`}
      aria-label="Page Navigation"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={(event) => handleHashNavigation(event, item.href)}
          className={`flex items-center px-4 py-2 text-sm sm:text-base font-medium transition-colors duration-200 ${
            pathname === item.href
              ? "text-brand-primary"
              : "text-gray-500 hover:text-brand-secondary"
          }`}
        >
          {item.icon && (
            <MaterialIcon
              icon={item.icon}
              className="mr-2 text-lg sm:text-xl"
              aria-hidden="true"
            />
          )}
          {getNavigationLabel(item, false, locale)}
        </Link>
      ))}
    </nav>
  );
}
