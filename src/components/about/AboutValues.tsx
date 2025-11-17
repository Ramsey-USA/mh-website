"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { gridPresets } from "@/lib/styles/layout-variants";

export interface CoreValue {
  iconName: string;
  title: string;
  subtitle: string;
  description: string;
  practices: string[];
}

interface AboutValuesProps {
  coreValues: CoreValue[];
}

export function AboutValues({ coreValues }: AboutValuesProps) {
  return (
    <section
      id="values"
      className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 py-12 sm:py-16 lg:py-24 xl:py-32 overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.08)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(189,146,100,0.15)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.06)_0%,transparent_50%)] dark:bg-[radial-gradient(circle_at_bottom_right,rgba(56,104,81,0.12)_0%,transparent_50%)]"></div>
      <div className="top-20 left-10 absolute bg-brand-secondary/10 dark:bg-brand-secondary/20 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
      <div
        className="right-10 bottom-20 absolute bg-brand-primary/10 dark:bg-brand-primary/20 blur-3xl rounded-full w-40 h-40 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="top-1/2 right-1/4 absolute bg-brand-primary/5 dark:bg-brand-primary/10 blur-3xl rounded-full w-24 h-24 animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <FadeInWhenVisible>
          <div className="mb-12 sm:mb-16 lg:mb-20 text-center">
            {/* Icon Header with Glow Effect */}
            <div className="flex justify-center items-center mb-6 sm:mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-primary/20 dark:bg-brand-primary/30 blur-xl rounded-full"></div>
                <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark p-4 rounded-2xl shadow-lg">
                  <MaterialIcon
                    icon="shield"
                    size="2xl"
                    className="text-white"
                  />
                </div>
              </div>
            </div>
            <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-gray-100 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tighter">
              <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Our 6 Core
              </span>
              <span className="block text-brand-primary dark:text-brand-primary-light font-black drop-shadow-sm">
                Values
              </span>
            </h2>
            <p className="mx-auto max-w-5xl font-light text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-4 break-words mb-8">
              Trust-Centered Philosophy: "Trust as our ultimate goal and
              measurable company foundation"
            </p>
            <div className="mx-auto max-w-4xl bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl">
              <p className="font-medium text-brand-primary dark:text-brand-primary-light text-base sm:text-lg md:text-xl">
                "Trust isn't just another value—it's the result when all other
                values are consistently demonstrated. It's our ultimate goal."
              </p>
            </div>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn
          className={gridPresets.cards3Alt("md", "mx-auto max-w-7xl")}
        >
          {coreValues.map((value, _index) => (
            <div
              key={_index}
              className="group h-[400px] sm:h-[420px] md:h-[440px] lg:h-[460px]"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl dark:hover:shadow-brand-primary/20 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary w-full h-full flex flex-col overflow-hidden transition-all duration-300">
                    <CardHeader className="pb-3 flex-shrink-0 px-4 sm:px-5">
                      <div className="flex items-center mb-3">
                        <MaterialIcon
                          icon={value.iconName}
                          size="lg"
                          className="mr-2 text-brand-primary"
                        />
                        <span className="font-bold text-brand-primary text-base">
                          {_index + 1}
                        </span>
                      </div>
                      <CardTitle className="mb-2 text-gray-900 dark:text-white text-base sm:text-lg md:text-xl">
                        {value.title}
                      </CardTitle>
                      <p className="font-semibold text-brand-secondary text-xs sm:text-sm">
                        {value.subtitle}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0 flex flex-col flex-grow px-4 sm:px-5">
                      <p className="mb-4 text-gray-700 dark:text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed break-words flex-grow">
                        {value.description}
                      </p>
                      <div className="flex-shrink-0 mt-auto pt-3 border-t border-gray-300 dark:border-gray-600">
                        <div className="flex items-center justify-center gap-2 text-brand-primary dark:text-brand-primary-light">
                          <MaterialIcon
                            icon="autorenew"
                            size="sm"
                            className="animate-spin-slow group-hover:animate-spin"
                          />
                          <span className="font-semibold text-xs uppercase tracking-wider">
                            <span className="hidden sm:inline">
                              Hover to learn more
                            </span>
                            <span className="sm:hidden">Tap to learn more</span>
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <Card className="bg-gradient-to-br from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-gray-900 shadow-2xl dark:shadow-brand-primary/30 border border-brand-primary dark:border-brand-primary/50 w-full h-full flex flex-col overflow-hidden transition-all duration-300">
                    <CardHeader className="pb-3 flex-shrink-0 px-4 sm:px-5">
                      <div className="flex items-center mb-3">
                        <MaterialIcon
                          icon="checklist"
                          size="md"
                          className="mr-2 text-brand-secondary"
                        />
                        <p className="font-bold text-white text-sm sm:text-base md:text-lg">
                          In Practice:
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-grow px-4 sm:px-5 overflow-y-auto">
                      <ul className="space-y-2">
                        {value.practices.map((practice, pIndex) => (
                          <li key={pIndex} className="flex items-start">
                            <MaterialIcon
                              icon="check_circle"
                              size="sm"
                              className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary"
                            />
                            <span className="text-white leading-relaxed text-xs sm:text-sm break-words">
                              {practice}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ))}
        </StaggeredFadeIn>
      </div>
    </section>
  );
}
