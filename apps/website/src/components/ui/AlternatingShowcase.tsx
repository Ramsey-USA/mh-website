import { MaterialIcon } from "@/components/icons/MaterialIcon";
import Image from "next/image";
import Link from "next/link";
import { type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { BrandedContentSection } from "@/components/templates/BrandedContentSection";

/**
 * AlternatingShowcase - Reusable alternating image/text layout component
 *
 * Mimics the homepage CoreValuesSection format with alternating image and content sides.
 * Features decorative header, gradient styling, and responsive image/text layouts.
 *
 * Use this for sections that need:
 * - Visual storytelling with images
 * - Alternating left/right layouts for visual interest
 * - Consistent branding with icons and stats
 * - Professional showcase format
 *
 * Examples: Process steps, service features, team capabilities, methodology details
 */

export interface AlternatingShowcaseItem {
  /** Unique identifier */
  id: string;
  /** Main title */
  title: string;
  /** Material icon name */
  icon: string;
  /** Subtitle/tagline */
  tagline: string;
  /** Main description text */
  description: string;
  /** Path to showcase image */
  image: string;
  /** Icon background color class (e.g., "bg-brand-primary") */
  iconBg: string;
  /** Optional stat or metric to display */
  stats?: string;
  /** Optional stat label (defaults to "Key Metric") */
  statsLabel?: string;
  /** Optional CTA link rendered below the description */
  link?: { href: string; text: string };
}

interface AlternatingShowcaseProps {
  /** Array of items to display in alternating layout */
  items: AlternatingShowcaseItem[];

  /** Section heading (displayed on second line) */
  title: string;

  /** Section subtitle (displayed on first line) */
  subtitle: string;

  /** Main section icon */
  icon: string;

  /** Description paragraph with optional JSX highlighting */
  description: ReactNode;

  /** Optional section ID for anchor links */
  sectionId?: string;

  /** Optional background gradient for header icon - defaults to "primary" */
  iconVariant?: "primary" | "secondary" | "bronze";
}

export function AlternatingShowcase({
  items,
  title,
  subtitle,
  icon,
  description,
  sectionId,
  iconVariant = "primary",
}: AlternatingShowcaseProps) {
  return (
    <BrandedContentSection
      id={sectionId || "showcase"}
      header={{
        icon,
        iconVariant,
        subtitle,
        title,
        description,
      }}
    >
      {/* Stacked Cards with Alternating Image/Text Layout */}
      <div className="space-y-12 lg:space-y-16">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={item.id}
              className="scroll-reveal group"
              style={{ "--delay": `${index * 0.1}s` } as CSSProperties}
            >
              <div className="flex flex-col lg:grid lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300">
                {/* Image Side */}
                <div
                  className={cn(
                    "relative h-64 sm:h-80 lg:h-full lg:min-h-[500px] overflow-hidden",
                    isEven ? "lg:order-1" : "lg:order-2",
                  )}
                >
                  <Image
                    src={item.image}
                    alt={`${item.title} - ${item.tagline}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading="lazy"
                    quality={75}
                    priority={false}
                  />
                  {/* Overlay gradient for better icon visibility */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-black/60 lg:via-black/20 lg:to-transparent"
                    aria-hidden="true"
                  ></div>

                  {/* Icon Badge on Image */}
                  <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                    <div className="relative inline-block">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 blur-xl rounded-2xl"
                        aria-hidden="true"
                      ></div>
                      <div
                        className={cn(
                          "relative w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center shadow-xl",
                          item.iconBg,
                        )}
                      >
                        <MaterialIcon
                          icon={item.icon}
                          size="xl"
                          className="text-white"
                          interactive
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={cn(
                    "p-8 sm:p-10 lg:p-12 flex flex-col justify-center",
                    isEven ? "lg:order-2" : "lg:order-1",
                  )}
                >
                  <div className="space-y-4 lg:space-y-5">
                    <div>
                      <h3 className="font-black text-gray-900 dark:text-gray-100 text-2xl sm:text-3xl lg:text-3xl leading-tight tracking-tight mb-2">
                        {item.title}
                      </h3>
                      <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-base sm:text-lg lg:text-xl">
                        {item.tagline}
                      </p>
                    </div>

                    <p className="font-normal text-gray-700 dark:text-gray-300 text-sm sm:text-base lg:text-base leading-relaxed">
                      {item.description}
                    </p>

                    {/* Optional CTA Link */}
                    {item.link && (
                      <Link
                        href={item.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary dark:text-brand-primary-light hover:underline"
                      >
                        {item.link.text}
                      </Link>
                    )}

                    {/* Optional Stats/Metric Display */}
                    {item.stats && (
                      <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-center w-12 h-12 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-xl flex-shrink-0">
                          <MaterialIcon
                            icon="analytics"
                            size="md"
                            className="text-brand-primary dark:text-brand-primary-light"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                            {item.statsLabel || "Key Metric"}
                          </p>
                          <p className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 dark:text-gray-100">
                            {item.stats}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </BrandedContentSection>
  );
}
