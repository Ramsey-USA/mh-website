import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";
import { cornerRadius, hoverMotion } from "@/lib/styles/design-tokens";

export interface StatItem {
  iconName: string;
  value: number;
  label: string;
  isPublic?: boolean;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  animated?: boolean;
}

export interface CompanyStatsProps {
  stats?: StatItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  headerIcon?: string;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  id?: string;
  animated?: boolean;
}

export const companyStats: StatItem[] = [
  {
    iconName: "health_and_safety",
    value: 0.64,
    label: "Award-Winning Safety EMR",
    prefix: "",
    suffix: "",
    decimals: 2,
    animated: true,
    isPublic: true,
  },
  {
    iconName: "workspace_premium",
    value: 150,
    label: "Years Combined Experience",
    suffix: "+",
    animated: true,
    isPublic: false,
  },
  {
    iconName: "military_tech",
    value: 650,
    label: "Successful Projects",
    suffix: "+",
    animated: true,
    isPublic: false,
  },
  {
    iconName: "verified",
    value: 3,
    label: "States Licensed & Insured",
    animated: false,
    isPublic: true,
  },
];

export function CompanyStats({
  stats = companyStats,
  title = "",
  subtitle = "",
  description = "",
  headerIcon = "analytics",
  className = "",
  id = "company-stats",
  animated = false,
}: CompanyStatsProps) {
  const publicStats = stats.filter((stat) => stat.isPublic !== false);

  const formatStatValue = (stat: StatItem) => {
    const decimals = stat.decimals ?? 0;
    const value =
      decimals > 0
        ? stat.value.toFixed(decimals)
        : Math.round(stat.value).toString();
    return `${stat.prefix || ""}${value}${stat.suffix || ""}`;
  };

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
      animated={animated}
      className={className}
    >
      <div className="gap-4 sm:gap-6 grid grid-cols-2 lg:grid-cols-4 mx-auto max-w-6xl">
        {publicStats.map((stat) => (
          <div
            key={stat.label}
            className={`h-full flex flex-col text-center p-6 sm:p-8 bg-white dark:bg-gray-800 ${cornerRadius.card} border border-gray-200 dark:border-gray-700 hover:shadow-2xl dark:hover:shadow-brand-primary/20 transition-all duration-300 group shadow-lg`}
          >
            <MaterialIcon
              icon={stat.iconName}
              className={`mb-4 text-brand-primary ${hoverMotion.iconSubtle}`}
              size="xl"
            />
            <div className="mb-2 font-black text-3xl sm:text-4xl text-brand-primary dark:text-brand-primary-light drop-shadow-sm">
              {formatStatValue(stat)}
            </div>
            <div className="text-gray-700 dark:text-gray-300 font-medium text-xs sm:text-sm leading-relaxed mt-auto">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </BrandedContentSection>
  );
}
