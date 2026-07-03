"use client";

import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useLocale } from "@/hooks/useLocale";
import { getDualPageName } from "@/lib/branding/page-names";

export interface BreadcrumbItem {
  label: string;
  href?: string; // Optional - last item typically has no link
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  source?: "page" | "fallback";
}

function getBreadcrumbDisplayLabel(label: string): string {
  return getDualPageName(label);
}

/**
 * Breadcrumb Navigation Component
 *
 * Provides hierarchical navigation showing user's location in site structure.
 * Improves UX by allowing quick navigation to parent pages.
 *
 * Features:
 * - Accessible with ARIA labels and semantic nav element
 * - Keyboard navigable with proper focus states
 * - Theme-aware styling
 * - Responsive design with mobile optimization
 * - Material Design chevron separators
 * - Last item not clickable (current page)
 *
 * Usage:
 * ```tsx
 * <Breadcrumb items={[
 *   { label: "Home", href: "/" },
 *   { label: "Projects", href: "/projects" },
 *   { label: "Current Project" } // No href for current page
 * ]} />
 * ```
 *
 * @component
 * @param {BreadcrumbProps} props - Component props
 * @param {BreadcrumbItem[]} props.items - Breadcrumb trail items
 * @param {string} [props.className] - Additional CSS classes
 */
export function Breadcrumb({
  items,
  className = "",
  source = "page",
}: BreadcrumbProps) {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <nav
      aria-label={isEs ? "Navegacion de ruta" : "Breadcrumb navigation"}
      data-mh-breadcrumb="true"
      data-mh-breadcrumb-source={source}
      className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol
          className="flex items-center space-x-2 text-sm overflow-x-auto scrollbar-hide"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li
                key={item.href || `breadcrumb-${index}`}
                className="flex items-center shrink-0"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <MaterialIcon
                    icon="chevron_right"
                    size="sm"
                    className="text-gray-600 dark:text-gray-500 mx-1"
                    aria-hidden="true"
                  />
                )}

                {isLast || !item.href ? (
                  // Current page - not clickable
                  <span
                    className="text-gray-900 dark:text-white font-medium"
                    aria-current="page"
                    itemProp="name"
                  >
                    {getBreadcrumbDisplayLabel(item.label)}
                  </span>
                ) : (
                  // Clickable parent page link
                  <Link
                    href={item.href}
                    itemProp="item"
                    className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-1"
                  >
                    <span itemProp="name">
                      {getBreadcrumbDisplayLabel(item.label)}
                    </span>
                  </Link>
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
