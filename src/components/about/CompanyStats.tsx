/**
 * Company Stats Section for About Page
 * Displays key company statistics and achievements
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";

// Company Stats Data - Updated with Award-Winning Safety Record
export const companyStats = [
  { iconName: "calendar_today", value: "2010", label: "Company Founded" },
  {
    iconName: "groups",
    value: "150+",
    label: "Years Combined Team Experience",
  },
  {
    iconName: "emoji_events",
    value: ".6 EMR",
    label: "Award-Winning Safety Record",
  },
  {
    iconName: "diversity_3",
    value: "70%",
    label: "Referral & Repeat Business",
  },
];

export function CompanyStats() {
  return (
    <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-primary-dark dark:to-gray-800 py-20 lg:py-32 xl:py-40 text-white">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mb-16 lg:mb-24 text-center">
            <MaterialIcon
              icon="analytics"
              className="mb-6 text-brand-secondary text-6xl"
            />
            <h2 className="mb-8 pb-2 font-black text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-white/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                Our Track
              </span>
              <span className="block text-white font-black drop-shadow-lg">
                Record
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
              Proven results from a veteran-owned team committed to excellence
              across the Pacific Northwest
            </p>
          </div>
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-6xl">
            {companyStats.map((stat, index) => (
              <HoverScale key={index}>
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <MaterialIcon
                    icon={stat.iconName}
                    className="mb-4 text-brand-secondary text-5xl"
                  />
                  <div className="mb-2 font-black text-5xl sm:text-6xl text-white drop-shadow-lg">
                    {stat.value}
                  </div>
                  <div className="text-white/90 font-medium text-sm sm:text-base">
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
