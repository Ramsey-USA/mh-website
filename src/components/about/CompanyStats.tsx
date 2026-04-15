/**
 * Company Stats Section for About Page
 * Displays key company statistics and achievements with animated counters
 * Reusable component that can be used on any page with custom data
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { HoverScale } from "@/components/animations/FramerMotionComponents";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BrandedContentSection } from "@/components/templates";

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
  subtitle = "Disciplined Results",
  description = "Proven results from a Veteran-Owned team committed to clear communication, disciplined execution, and lasting client relationships across the Pacific Northwest.",
  headerIcon = "analytics",
  className = "",
  id = "company-stats",
}: CompanyStatsProps) {
  return (
    <BrandedContentSection
      id={id}
      header={{
        icon: headerIcon,
        iconVariant: "primary",
        subtitle: subtitle,
        title: title,
        description: description,
      }}
      className={className}
    >
      <div className="gap-4 sm:gap-6 grid grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl">
        {stats.map((stat) => (
          <HoverScale key={stat.label}>
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
    </BrandedContentSection>
  );
}
