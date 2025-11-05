"use client";

import Link from "next/link";
import { MaterialIcon } from "../icons/MaterialIcon";
import { NavigationItem, getNavigationLabel } from "./navigationConfigs";
import { useIsMobile } from "../../hooks/useBreakpoint";

/**
 * Props interface for PageNavigation component
 * @interface PageNavigationProps
 * @property {NavigationItem[]} items - Array of navigation items to display
 * @property {string} [className] - Optional additional CSS classes
 */
interface PageNavigationProps {
  items: NavigationItem[];
  className?: string;
}

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
 * - Configurable per-page navigation items
 *
 * Usage Patterns:
 * - Section anchors within current page (e.g., "/services#section")
 * - Related contextual pages (e.g., "/estimator", "/contact")
 * - Strategic calls-to-action placement
 * - User journey optimization
 *
 * @component
 * @param {PageNavigationProps} props - Component props
 * @param {NavigationItem[]} props.items - Navigation items from navigationConfigs
 * @param {string} [props.className] - Additional CSS classes
 *
 * @see /docs/technical/NAVIGATION_ARCHITECTURE.md - Complete navigation system documentation
 * @see /docs/technical/NAVIGATION_TECHNICAL_GUIDE.md - Implementation guide
 * @see /src/components/navigation/navigationConfigs.ts - Navigation configurations
 */
export function PageNavigation({ items, className = "" }: PageNavigationProps) {
  const isMobile = useIsMobile();

  return (
    <nav
      className={`bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t-4 border-brand-primary ${className}`}
    >
      <div className="max-w-7xl mx-auto px-2 mobile-sm:px-1 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center py-3 mobile-sm:py-2 xs:py-4">
          <div className="flex space-x-0.5 mobile-sm:space-x-0 xs:space-x-1 overflow-x-auto">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col items-center hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 px-2 mobile-sm:px-1.5 xs:px-4 py-3 mobile-sm:py-2.5 xs:py-4 min-w-[60px] mobile-sm:min-w-[56px] xs:min-w-[80px] transition-colors duration-200 rounded-lg"
              >
                <MaterialIcon
                  icon={item.icon}
                  size="sm"
                  className="mb-0.5 mobile-sm:mb-0 xs:mb-1 text-gray-600 dark:text-gray-400 group-hover:text-brand-primary transition-colors duration-200 mobile-sm:w-4 mobile-sm:h-4"
                />
                <span className="text-[10px] mobile-sm:text-[9px] xs:text-xs text-gray-700 dark:text-gray-300 group-hover:text-brand-primary font-medium transition-colors duration-200 text-center leading-tight mobile-sm:leading-none">
                  {getNavigationLabel(item, isMobile)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
