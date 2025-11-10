/**
 * Awards & Recognition Section Component
 * Displays MH Construction's industry awards, safety recognition, and certifications
 * Reusable across About, Team, and other credibility-building pages
 */

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { getCardClassName } from "@/lib/styles/card-variants";

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
    achievement: ".6 EMR - 'As Low as You Can Go'",
    details:
      "40% better than industry average with 7-year average EMR of .65 and 3+ consecutive years claims-free",
    icon: "shield",
  },
  {
    year: "2020",
    title: "Top EMR Award",
    achievement: ".6 EMR - 'As Low as You Can Go'",
    details: "6-year average EMR of .66 with 3+ years claims-free",
    icon: "shield",
  },
  {
    year: "2019",
    title: "Top EMR Award",
    achievement: ".6 EMR - 'As Low as You Can Go'",
    details: "5-year average EMR of .68 with 3+ years claims-free",
    icon: "shield",
  },
];

export function AwardsSection() {
  return (
    <section id="awards" className="bg-gray-50 dark:bg-gray-800 py-20 lg:py-32">
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl text-center mb-16 lg:mb-24">
            <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Awards &
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Recognition
              </span>
            </h2>
            <p className="mx-auto max-w-5xl mb-8 font-light text-gray-600 dark:text-gray-300 text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide px-2">
              Our commitment to excellence has been recognized by industry
              leaders and the communities we serve throughout the Pacific
              Northwest.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Industry Recognition Cards - 4 Key Awards */}
        <FadeInWhenVisible>
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
                    className="mx-auto mb-3 text-brand-accent"
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
        </FadeInWhenVisible>

        {/* AGC Safety Awards Timeline */}
        <FadeInWhenVisible>
          <div>
            <h3 className="mb-8 font-bold text-center text-gray-900 dark:text-white text-2xl sm:text-3xl md:text-4xl">
              AGC Washington - Safety Awards Timeline
            </h3>
            <div className="relative mx-auto max-w-5xl">
              {/* Timeline vertical line */}
              <div className="top-0 bottom-0 left-8 md:left-1/2 absolute bg-brand-primary dark:bg-brand-primary-light w-1 transform md:-translate-x-1/2"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {emrTimeline.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Year badge - centered on timeline */}
                    <div className="left-8 md:left-1/2 absolute flex justify-center items-center bg-brand-primary dark:bg-brand-primary-dark shadow-lg rounded-full w-16 h-16 transform md:-translate-x-1/2 z-10">
                      <MaterialIcon
                        icon={item.icon}
                        size="lg"
                        className="text-white"
                      />
                    </div>

                    {/* Content card */}
                    <div
                      className={`ml-28 md:ml-0 w-full md:w-[calc(50%-4rem)] ${
                        index % 2 === 0 ? "md:pr-16" : "md:pl-16"
                      }`}
                    >
                      <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border-l-4 border-l-brand-primary dark:border-l-brand-primary-light transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-black text-brand-primary text-3xl">
                              {item.year}
                            </span>
                            <span className="bg-brand-primary/10 dark:bg-brand-primary/20 px-3 py-1 rounded-full font-semibold text-brand-primary text-xs">
                              AGC Award
                            </span>
                          </div>
                          <CardTitle className="text-gray-900 dark:text-white text-lg sm:text-xl">
                            {item.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-2 font-semibold text-brand-secondary text-sm sm:text-base">
                            {item.achievement}
                          </p>
                          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                            {item.details}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
