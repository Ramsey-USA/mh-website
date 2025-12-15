/**
 * Company Stats Section for About Page
 * Displays key company statistics and achievements with animated counters
 * Reusable component that can be used on any page with custom data
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { HoverScale } from "@/components/animations/FramerMotionComponents";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeader } from "@/components/ui/SectionHeader";

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
  /**
   * Optional section ID for anchor links
   */
  id?: string;
}

// Company Stats Data - Updated with 6 Differences Key Metrics
export const companyStats: StatItem[] = [
  {
    iconName: "health_and_safety",
    value: 0.64,
    label: "Award-Winning Safety EMR",
    prefix: "",
    suffix: "",
    decimals: 2,
    animated: true,
  },
  {
    iconName: "workspace_premium",
    value: 150,
    label: "Years Combined Experience",
    suffix: "+",
    animated: true,
  },
  {
    iconName: "military_tech",
    value: 650,
    label: "Successful Projects",
    suffix: "+",
    animated: true,
  },
  {
    iconName: "verified",
    value: 3,
    label: "States Licensed & Insured",
    animated: false,
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
  title = "Mission Track Record",
  subtitle = "Battle-Tested",
  description = "Proven results from a veteran-owned team committed to mission excellence across the Pacific Northwest—from deployment to development, we deliver.",
  headerIcon = "analytics",
  variant = "primary",
  className = "",
  id,
}: CompanyStatsProps) {
  const gradientClass = gradientVariants[variant];

  return (
    <section
      id={id}
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
        <SectionHeader
          icon={headerIcon}
          subtitle={subtitle}
          title={title}
          description={description}
          iconGradient="from-brand-secondary via-brand-secondary-dark to-bronze-700"
          darkVariant={true}
        />
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
      </div>
    </section>
  );
}
