/**
 * Company Stats Section for About Page
 * Displays key company statistics and achievements
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  HoverScale,
} from "@/components/animations/FramerMotionComponents";

// Company Stats Data
export const companyStats = [
  { iconName: "calendar_today", value: "2010", label: "Company Founded" },
  { iconName: "groups", value: "150+", label: "Years Combined Experience" },
  { iconName: "star", value: "98%", label: "Client Satisfaction" },
  { iconName: "diversity_3", value: "70%", label: "Referral Rate" },
];

export function CompanyStats() {
  return (
    <section className="bg-gradient-to-r from-brand-primary dark:from-brand-primary-dark to-brand-primary-dark dark:to-gray-800 py-16 text-white">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mb-16 text-center">
            <MaterialIcon
              icon="analytics"
              className="mb-6 text-brand-secondary text-6xl"
            />
            <h2 className="mb-6 font-black text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-white/80 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Our Track
              </span>
              <span className="block text-white font-black drop-shadow-lg">
                Record
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-white/90 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
              Proven results from a veteran-owned team committed to excellence
            </p>
          </div>
          <div className="gap-8 grid grid-cols-2 md:grid-cols-4 mx-auto max-w-5xl">
            {companyStats.map((stat, index) => (
              <HoverScale key={index}>
                <div className="text-center">
                  <MaterialIcon
                    icon={stat.iconName}
                    className="mb-4 text-brand-secondary text-5xl"
                  />
                  <div className="mb-2 font-bold text-4xl">{stat.value}</div>
                  <div className="text-white/90">{stat.label}</div>
                </div>
              </HoverScale>
            ))}
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
