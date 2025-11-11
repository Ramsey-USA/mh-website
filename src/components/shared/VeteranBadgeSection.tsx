import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

/**
 * Veteran Badge Section Component
 * Displays prominent veteran-owned status badges
 * Can be used across multiple pages to highlight veteran leadership
 * All badges link to the veterans initiative page
 */
export function VeteranBadgeSection() {
  return (
    <section className="bg-gradient-to-r from-brand-primary/5 via-brand-secondary/5 to-brand-primary/5 py-8 border-y border-brand-primary/20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            {/* Army Veteran Badge */}
            <Link
              href="/veterans"
              className="group flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-center bg-brand-primary/10 p-3 rounded-lg">
                <MaterialIcon
                  icon="shield"
                  size="xl"
                  className="text-brand-primary group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-lg">
                  Army Veteran
                </div>
                <div className="text-brand-primary text-sm">
                  Owned & Operated
                </div>
              </div>
            </Link>

            {/* Navy Veteran Badge */}
            <Link
              href="/veterans"
              className="group flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-center bg-brand-secondary/10 p-3 rounded-lg">
                <MaterialIcon
                  icon="anchor"
                  size="xl"
                  className="text-brand-secondary group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-lg">
                  Navy Veteran
                </div>
                <div className="text-brand-secondary text-sm">Leadership</div>
              </div>
            </Link>

            {/* Military Precision Badge */}
            <Link
              href="/veterans"
              className="group flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center justify-center bg-brand-accent/10 p-3 rounded-lg">
                <MaterialIcon
                  icon="military_tech"
                  size="xl"
                  className="text-brand-accent group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <div className="font-bold text-gray-900 dark:text-white text-lg">
                  Military Precision
                </div>
                <div className="text-brand-accent text-sm">Every Project</div>
              </div>
            </Link>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
