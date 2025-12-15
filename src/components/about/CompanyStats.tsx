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

export function CompanyStats({
  stats = companyStats,
  title = "Mission Track Record",
  subtitle = "Battle-Tested",
  description = "Proven results from a veteran-owned team committed to mission excellence across the Pacific Northwest—from deployment to development, we deliver.",
  headerIcon = "analytics",
  className = "",
  id,
}: CompanyStatsProps) {
  return (
    <section
      id={id}
      className={`relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden ${className}`}
    >
      {/* Unique Diagonal Stripe Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #386851 0px,
              #386851 2px,
              transparent 2px,
              transparent 60px
            )`,
          }}
        ></div>
      </div>

      {/* Large Brand Color Blobs */}
      <div className="absolute top-20 right-[15%] w-96 h-96 bg-gradient-to-br from-brand-primary/10 to-transparent dark:from-brand-primary/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-20 left-[15%] w-96 h-96 bg-gradient-to-tr from-brand-secondary/10 to-transparent dark:from-brand-secondary/20 blur-3xl rounded-full"></div>

      <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <SectionHeader
          icon={headerIcon}
          subtitle={subtitle}
          title={title}
          description={description}
          iconGradient="from-brand-secondary via-brand-secondary-dark to-bronze-700"
        />
        <div className="gap-4 sm:gap-6 grid grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl">
          {stats.map((stat, _index) => (
            <HoverScale key={_index}>
              <div className="h-full flex flex-col text-center p-5 sm:p-6 lg:p-8 bg-white dark:bg-gray-800 rounded-3xl border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-brand-primary/20 transition-all duration-300 group shadow-lg">
                <MaterialIcon
                  icon={stat.iconName}
                  className="mb-4 text-brand-primary group-hover:scale-110 transition-transform"
                  size="xl"
                />
                <div className="mb-2 font-black text-3xl sm:text-4xl lg:text-5xl text-brand-primary dark:text-brand-primary-light drop-shadow-sm">
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
                <div className="text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm lg:text-base leading-relaxed mt-auto">
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
