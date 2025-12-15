/**
 * Awards & Recognition Section Component
 * Displays MH Construction's industry awards, safety recognition, and certifications
 * Reusable across About, Team, and other credibility-building pages
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { getCardClassName } from "@/lib/styles/card-variants";
import { SectionHeader } from "@/components/ui/SectionHeader";

const emrTimeline = [
  {
    year: "2025",
    title: "Most Improved EMR",
    achievement: "25% EMR reduction from 2024",
    details:
      "3+ years without time loss or impairment injury. L&I Claims Free Discount Program participation.",
    icon: "emoji_events",
  },
  {
    year: "2021",
    title: "Top EMR Award",
    achievement: ".64 EMR - 'As Low as You Can Go'",
    details:
      "40% better than industry average with 7-year average EMR of .65 and 3+ consecutive years claims-free",
    icon: "shield",
  },
  {
    year: "2020",
    title: "Top EMR Award",
    achievement: ".64 EMR - 'As Low as You Can Go'",
    details: "6-year average EMR of .66 with 3+ years claims-free",
    icon: "shield",
  },
  {
    year: "2019",
    title: "Top EMR Award",
    achievement: ".64 EMR - 'As Low as You Can Go'",
    details: "5-year average EMR of .68 with 3+ years claims-free",
    icon: "shield",
  },
];

export function AwardsSection() {
  return (
    <section
      id="awards"
      className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
    >
      {/* Diagonal Stripe Background Pattern */}
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
          icon="workspace_premium"
          iconVariant="bronze"
          subtitle="Awards &"
          title="Recognition"
          description="Our commitment to excellence has been recognized by industry leaders and the communities we serve throughout the Pacific Northwest."
        />

        {/* Industry Recognition Cards - 4 Key Awards */}
        <div className="mb-20">
          <h3 className="mb-8 font-bold text-center text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
            Industry Recognition
          </h3>
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mx-auto max-w-7xl">
            <Card
              className={getCardClassName(
                "primary",
                "h-full duration-300 hover:scale-105",
              )}
            >
              <CardHeader className="text-center">
                <MaterialIcon
                  icon="military_tech"
                  size="xl"
                  className="mx-auto mb-3 text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                  Veteran Business Enterprise
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                  Certified VOSB
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Department of Veterans Affairs certification
                </p>
              </CardContent>
            </Card>

            <Card
              className={getCardClassName(
                "secondary",
                "h-full duration-300 hover:scale-105",
              )}
            >
              <CardHeader className="text-center">
                <MaterialIcon
                  icon="workspace_premium"
                  size="xl"
                  className="mx-auto mb-3 text-brand-secondary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                  Excellence in Construction
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                  AGC Washington
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Outstanding Commercial Project Award
                </p>
              </CardContent>
            </Card>

            <Card
              className={getCardClassName(
                "accent",
                "h-full duration-300 hover:scale-105",
              )}
            >
              <CardHeader className="text-center">
                <MaterialIcon
                  icon="eco"
                  size="xl"
                  className="mx-auto mb-3 text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                  Sustainable Building Leader
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                  WA Green Building Council
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  LEED compliance & sustainable practices
                </p>
              </CardContent>
            </Card>

            <Card
              className={getCardClassName(
                "primary",
                "h-full duration-300 hover:scale-105",
              )}
            >
              <CardHeader className="text-center">
                <MaterialIcon
                  icon="verified_user"
                  size="xl"
                  className="mx-auto mb-3 text-brand-primary"
                />
                <CardTitle className="text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                  Safety Excellence
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 dark:text-gray-300 mb-2 text-xs sm:text-sm">
                  OSHA VPP Star
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  Exemplary workplace safety programs
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AGC Safety Awards Timeline */}
        <div>
          <h3 className="mb-8 sm:mb-12 lg:mb-16 font-bold text-center text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
            AGC Washington - Safety Awards Timeline
          </h3>

          {/* Timeline - Vertical Alternating Layout */}
          <div className="relative max-w-6xl mx-auto">
            {/* Vertical Connecting Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-primary/30 via-brand-secondary to-brand-primary/30"></div>

            {/* Timeline Items - Desktop Alternating */}
            <div className="space-y-12 lg:space-y-20">
              {emrTimeline.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className="relative group scroll-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Desktop Layout */}
                    <div className="hidden lg:flex items-center gap-8">
                      {isEven ? (
                        <>
                          {/* Content Left */}
                          <div className="flex-1 text-right">
                            <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-primary dark:group-hover:border-brand-primary-light">
                              <div className="flex items-center justify-end gap-4 mb-4">
                                <div>
                                  <div className="flex items-center justify-end gap-2 mb-2">
                                    <span className="font-black text-brand-primary text-3xl">
                                      {item.year}
                                    </span>
                                    <span className="bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1 rounded-full font-semibold text-brand-primary text-xs">
                                      AGC Award
                                    </span>
                                  </div>
                                  <h4 className="font-black text-gray-900 dark:text-white text-xl sm:text-2xl mb-1">
                                    {item.title}
                                  </h4>
                                  <p className="font-semibold text-brand-secondary dark:text-brand-secondary-light text-base">
                                    {item.achievement}
                                  </p>
                                </div>
                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                                  <MaterialIcon
                                    icon={item.icon}
                                    size="xl"
                                    className="text-white"
                                  />
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {item.details}
                              </p>
                            </div>
                          </div>

                          {/* Center Circle */}
                          <div className="flex-shrink-0 relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300">
                              {index + 1}
                            </div>
                          </div>

                          {/* Empty Right */}
                          <div className="flex-1"></div>
                        </>
                      ) : (
                        <>
                          {/* Empty Left */}
                          <div className="flex-1"></div>

                          {/* Center Circle */}
                          <div className="flex-shrink-0 relative z-10">
                            <div className="w-20 h-20 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-full flex items-center justify-center text-white font-black text-2xl shadow-2xl border-4 border-white dark:border-gray-900 group-hover:scale-110 transition-transform duration-300">
                              {index + 1}
                            </div>
                          </div>

                          {/* Content Right */}
                          <div className="flex-1 text-left">
                            <div className="inline-block bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group-hover:border-brand-secondary dark:group-hover:border-brand-secondary-light">
                              <div className="flex items-center gap-4 mb-4">
                                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                                  <MaterialIcon
                                    icon={item.icon}
                                    size="xl"
                                    className="text-white"
                                  />
                                </div>
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-black text-brand-secondary text-3xl">
                                      {item.year}
                                    </span>
                                    <span className="bg-brand-secondary/10 dark:bg-brand-secondary/20 px-3 py-1 rounded-full font-semibold text-brand-secondary text-xs">
                                      AGC Award
                                    </span>
                                  </div>
                                  <h4 className="font-black text-gray-900 dark:text-white text-xl sm:text-2xl mb-1">
                                    {item.title}
                                  </h4>
                                  <p className="font-semibold text-brand-primary dark:text-brand-primary-light text-base">
                                    {item.achievement}
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {item.details}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden flex gap-4">
                      {/* Left Side - Number and Line */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div
                          className={`w-16 h-16 ${
                            index % 2 === 0
                              ? "bg-gradient-to-br from-brand-primary to-brand-primary-dark"
                              : "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark"
                          } rounded-full flex items-center justify-center text-white font-black text-2xl shadow-xl border-4 border-white dark:border-gray-900 relative z-10`}
                        >
                          {index + 1}
                        </div>
                        {index < emrTimeline.length - 1 && (
                          <div className="w-1 flex-1 bg-gradient-to-b from-brand-primary to-brand-secondary mt-2 min-h-[60px]"></div>
                        )}
                      </div>

                      {/* Right Side - Card */}
                      <div className="flex-1 pb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-brand-primary dark:hover:border-brand-primary-light">
                          <div className="flex items-center gap-3 mb-4">
                            <div
                              className={`flex-shrink-0 w-14 h-14 ${
                                index % 2 === 0
                                  ? "bg-gradient-to-br from-brand-primary to-brand-primary-dark"
                                  : "bg-gradient-to-br from-brand-secondary to-brand-secondary-dark"
                              } rounded-xl flex items-center justify-center shadow-lg`}
                            >
                              <MaterialIcon
                                icon={item.icon}
                                size="lg"
                                className="text-white"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-black text-brand-primary text-2xl">
                                  {item.year}
                                </span>
                                <span className="bg-brand-primary/10 dark:bg-brand-primary/20 px-2 py-0.5 rounded-full font-semibold text-brand-primary text-xs">
                                  AGC Award
                                </span>
                              </div>
                              <h4 className="font-black text-gray-900 dark:text-white text-lg mb-1">
                                {item.title}
                              </h4>
                              <p className="font-semibold text-brand-secondary text-sm">
                                {item.achievement}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {item.details}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
