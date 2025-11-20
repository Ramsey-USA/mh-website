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
   * Section description - emphasizes measurable trust through proven performance
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
    iconName: "check_circle",
    value: 650,
    label: "Successful Projects",
    suffix: "+",
    animated: true,
  },
];

const gradientVariants = {
  primary:
    "bg-gradient-to-br from-brand-primary via-brand-primary-dark to-gray-900 dark:from-brand-primary-dark dark:via-gray-900 dark:to-gray-950",
  secondary:
    "bg-gradient-to-br from-brand-secondary via-brand-secondary-dark to-brand-primary dark:from-brand-secondary/80 dark:via-gray-800 dark:to-gray-900",
  accent:
    "bg-gradient-to-br from-brand-primary-dark via-brand-primary to-brand-secondary dark:from-brand-accent/80 dark:via-gray-800 dark:to-gray-900",
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
      className={`relative ${gradientClass} py-12 sm:py-16 lg:py-24 xl:py-32 text-white overflow-hidden ${className}`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(189,146,100,0.1)_0%,transparent_50%)]"></div>
      <div className="top-20 right-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="left-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 left-1/4 absolute bg-brand-secondary/5 dark:bg-brand-secondary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
            {headerIcon && (
              <div className="flex justify-center items-center mb-6 sm:mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-secondary/30 blur-xl rounded-full"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-dark p-4 rounded-2xl shadow-lg">
                    <MaterialIcon
                      icon={headerIcon}
                      size="2xl"
                      className="text-white"
                    />
                  </div>
                </div>
              </div>
            )}
            <h2 className="mb-6 sm:mb-8 font-black text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              {subtitle && (
                <span className="block mb-3 sm:mb-4 font-semibold text-white/80 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                  {subtitle}
                </span>
              )}
              <span className="block text-brand-secondary font-black drop-shadow-sm">
                {title}
              </span>
            </h2>
            {description && (
              <p className="mx-auto max-w-5xl font-light text-white/90 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words">
                {description}
              </p>
            )}
          </div>
          <div className="gap-4 sm:gap-6 grid grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl">
            {stats.map((stat, _index) => (
              <HoverScale key={_index}>
                <div className="h-full flex flex-col text-center p-5 sm:p-6 lg:p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/30 hover:bg-white/20 hover:shadow-2xl hover:border-white/40 transition-all duration-300 group">
                  <MaterialIcon
                    icon={stat.iconName}
                    className="mb-4 text-brand-secondary group-hover:animate-spin"
                    size="xl"
                  />
                  <div className="mb-2 font-black text-3xl sm:text-4xl lg:text-5xl text-white drop-shadow-lg">
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
                  <div className="text-white/90 font-medium text-xs sm:text-sm lg:text-base leading-relaxed mt-auto">
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
