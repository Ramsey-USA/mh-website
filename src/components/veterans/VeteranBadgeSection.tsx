import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";

/**
 * Veteran-Owned Badge Section
 *
 * Prominent callout highlighting MH Construction's veteran-owned status.
 * Can be used on homepage, about, services, and other key pages.
 *
 * @param variant - Display style: "full" (with description) or "compact" (badge only)
 * @param showCTA - Whether to show "Learn More" CTA button
 */

interface VeteranBadgeSectionProps {
  variant?: "full" | "compact";
  showCTA?: boolean;
  className?: string;
}

export function VeteranBadgeSection({
  variant = "full",
  showCTA = true,
  className = "",
}: VeteranBadgeSectionProps) {
  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 border-2 border-brand-primary/30 rounded-full ${className}`}
      >
        <MaterialIcon
          icon="military_tech"
          size="lg"
          className="text-brand-primary"
        />
        <span className="font-bold text-gray-900 dark:text-white text-sm sm:text-base uppercase tracking-wider">
          Veteran-Owned Business
        </span>
      </div>
    );
  }

  return (
    <section
      className={`relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 py-12 lg:py-16 border-y border-brand-primary/20 ${className}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Badge and Text */}
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              {/* Military Badge Icon */}
              <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-brand-primary to-brand-secondary rounded-full shadow-lg">
                <MaterialIcon
                  icon="military_tech"
                  className="text-white text-5xl sm:text-6xl"
                />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="mb-2 font-black text-gray-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl">
                  Proudly Veteran-Owned
                </h3>
                <p className="max-w-2xl text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                  Led by Army veteran Jeremy Thamert and Navy veteran Matt
                  Ramsey, we bring military precision, discipline, and integrity
                  to every project since January 2025.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            {showCTA && (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/veterans"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary hover:bg-brand-secondary text-white transition-all duration-300 rounded-lg font-bold text-base shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  <MaterialIcon icon="phishing" size="md" />
                  <span>Veterans Initiative</span>
                </Link>
                <Link
                  href="/about#team"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-brand-primary dark:text-brand-primary transition-all duration-300 rounded-lg font-bold text-base border-2 border-brand-primary shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  <MaterialIcon icon="people" size="md" />
                  <span>Meet Our Team</span>
                </Link>
              </div>
            )}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
