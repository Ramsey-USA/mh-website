"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { useLocale } from "@/hooks/useLocale";
import { getDualPageName } from "@/lib/branding/page-names";
import { COMPANY_INFO } from "@/lib/constants/company";
import { normalizeBreadcrumbTaxonomyLabel } from "@/lib/navigation/breadcrumb-taxonomy";

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

function toAbsoluteBreadcrumbUrl(href: string, siteUrl: string): string {
  if (/^https?:\/\//i.test(href)) return href;
  const normalizedHref = href.startsWith("/") ? href : `/${href}`;
  return `${siteUrl}${normalizedHref}`;
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
  const pathname = usePathname();
  const isEs = locale === "es";
  const siteUrl = COMPANY_INFO.urls.getSiteUrl().replace(/\/$/, "");

  return (
    <nav
      aria-label={isEs ? "Navegacion de ruta" : "Breadcrumb navigation"}
      data-mh-breadcrumb="true"
      data-mh-breadcrumb-source={source}
      className={`border-b border-brand-secondary/35 bg-linear-to-r from-brand-primary-darker via-brand-primary to-brand-primary-dark py-3 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol
          className="flex items-center space-x-2 text-sm overflow-x-auto scrollbar-hide"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const normalizedLabel = normalizeBreadcrumbTaxonomyLabel(
              item.label,
              item.href === undefined ? { index } : { href: item.href, index },
            );
            const semanticHref = item.href ?? (isLast ? pathname : undefined);
            const semanticItemUrl = semanticHref
              ? toAbsoluteBreadcrumbUrl(semanticHref, siteUrl)
              : undefined;

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
                    className="mx-1 text-brand-secondary-light/90"
                    aria-hidden="true"
                  />
                )}

                {isLast || !item.href ? (
                  // Current page - not clickable
                  <span
                    className="font-semibold text-brand-secondary-light"
                    aria-current="page"
                    itemProp="name"
                    title={getBreadcrumbDisplayLabel(normalizedLabel)}
                  >
                    {getBreadcrumbDisplayLabel(normalizedLabel)}
                  </span>
                ) : (
                  // Clickable parent page link
                  <Link
                    href={item.href}
                    itemProp="item"
                    className="rounded px-1 text-white/90 transition-colors duration-200 hover:text-brand-secondary-light focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 focus:ring-offset-brand-primary-dark"
                    title={getBreadcrumbDisplayLabel(normalizedLabel)}
                  >
                    <span itemProp="name">
                      {getBreadcrumbDisplayLabel(normalizedLabel)}
                    </span>
                  </Link>
                )}
                {semanticItemUrl ? (
                  <meta itemProp="item" content={semanticItemUrl} />
                ) : null}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
