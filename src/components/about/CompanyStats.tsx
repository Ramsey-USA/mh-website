/**
 * Company Stats Section for About Page
 * Displays key company statistics and achievements with animated counters
 * Reusable component that can be used on any page with custom data
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export interface StatItem {
  iconName: string;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  animated?: boolean;
}

export interface CompanyStatsProps {
  /**
   * Array of statistics to display
   */
  stats?: StatItem[];
  /**
   * Section title (main line)
   */
  title?: string;
  /**
   * Section subtitle (appears above title)
   */
  subtitle?: string;
  /**
   * Section description
   */
  description?: string;
  /**
   * Icon to display above the title
   */
  headerIcon?: string;
  /**
   * Background gradient variant
   */
  variant?: "primary" | "secondary" | "accent";
  /**
   * Additional CSS classes
   */
  className?: string;
}

// Company Stats Data - Updated with Award-Winning Safety Record
export const companyStats: StatItem[] = [
  {
    iconName: "calendar_today",
    value: 2010,
    label: "Company Founded",
    animated: false,
  },
  {
    iconName: "groups",
    value: 150,
    label: "Years Combined Team Experience",
    suffix: "+",
    animated: true,
  },
  {
    iconName: "emoji_events",
    value: 0.6,
    label: "Award-Winning Safety Record",
    prefix: "",
    suffix: " EMR",
    decimals: 1,
    animated: true,
  },
  {
    iconName: "diversity_3",
    value: 70,
    label: "Referral & Repeat Business",
    suffix: "%",
    animated: true,
  },
];

const gradientVariants = {
  primary:
    "bg-gradient-to-br from-brand-primary via-brand-accent to-brand-primary-dark dark:from-brand-primary-dark dark:via-gray-800 dark:to-gray-900",
  secondary:
    "bg-gradient-to-br from-brand-secondary via-brand-secondary/80 to-brand-primary dark:from-brand-secondary/80 dark:via-gray-800 dark:to-gray-900",
  accent:
    "bg-gradient-to-br from-brand-accent via-brand-primary to-brand-primary-dark dark:from-brand-accent/80 dark:via-gray-800 dark:to-gray-900",
};

export function CompanyStats({
  stats = companyStats,
  title = "Record",
  subtitle = "Our Track",
  description = "Proven results from a veteran-owned team committed to excellence across the Pacific Northwest",
  headerIcon = "analytics",
  variant = "primary",
  className = "",
}: CompanyStatsProps) {
  const gradientClass = gradientVariants[variant];

  return (
    <section
      className={`${gradientClass} py-20 lg:py-32 xl:py-40 text-white ${className}`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-16 lg:mb-24 text-center">
            {headerIcon && (
              <div className="flex justify-center mb-6">
                <MaterialIcon
                  icon={headerIcon}
                  className="text-brand-secondary text-5xl sm:text-6xl"
                />
              </div>
            )}
            <h2 className="mb-8 pb-2 font-black text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              {subtitle && (
                <span className="block mb-4 font-semibold text-white/90 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  {subtitle}
                </span>
              )}
              <span className="block text-brand-secondary font-black drop-shadow-lg">
                {title}
              </span>
            </h2>
            {description && (
              <p className="mx-auto max-w-5xl mb-8 font-light text-white/90 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
                {description}
              </p>
            )}
          </div>
          <div className="gap-6 lg:gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl">
            {stats.map((stat, _index) => (
              <HoverScale key={_index}>
                <div className="h-full flex flex-col text-center p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 hover:bg-white/20 hover:shadow-2xl transition-all duration-300">
                  <MaterialIcon
                    icon={stat.iconName}
                    className="mb-4 text-brand-secondary text-4xl sm:text-5xl"
                  />
                  <div className="mb-2 font-black text-4xl sm:text-5xl text-white drop-shadow-lg">
                    {stat.animated ? (
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix || ""}
                        prefix={stat.prefix || ""}
                        decimals={stat.decimals || 0}
                        duration={2000}
                      />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-white/90 font-medium text-sm sm:text-base leading-relaxed mt-auto">
                    {stat.label}
                  </div>
                </div>
              </HoverScale>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
