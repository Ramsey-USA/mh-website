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
    <section id="values" className="bg-white dark:bg-gray-900 py-16 lg:py-24">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mb-16 text-center">
            <MaterialIcon
              icon="shield"
              className="mb-6 text-brand-primary text-6xl"
            />
            <h2 className="mb-6 font-black text-gray-900 dark:text-gray-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tighter">
              <span className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                Our 6 Core
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Values
              </span>
            </h2>
            <div className="mx-auto max-w-4xl">
              <p className="mb-4 font-light text-gray-600 dark:text-gray-300 text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide">
                Trust-Centered Philosophy: "Trust as our ultimate goal and
                measurable company foundation"
              </p>
              <div className="bg-brand-light dark:bg-gray-800 p-6 border-brand-primary border-l-4 rounded-xl">
                <p className="font-medium text-brand-primary dark:text-brand-primary-light text-lg md:text-xl">
                  "Trust isn't just another value—it's the result when all other
                  values are consistently demonstrated. It's our ultimate goal."
                </p>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        <StaggeredFadeIn
          className={gridPresets.cards3Alt("md", "mx-auto max-w-7xl")}
        >
          {coreValues.map((value, _index) => (
            <div
              key={_index}
              className="group perspective h-[400px] cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full transition-transform duration-700 preserve-3d group-hover:rotate-y-180">
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <Card className="bg-white dark:bg-gray-800 hover:shadow-xl dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 border-l-4 border-l-brand-primary h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center mb-4">
                        <MaterialIcon
                          icon={value.iconName}
                          className="mr-3 text-brand-primary text-4xl"
                        />
                        <span className="font-bold text-brand-primary text-lg">
                          {_index + 1}
                        </span>
                      </div>
                      <CardTitle className="mb-2 text-gray-900 dark:text-white text-lg sm:text-xl md:text-2xl">
                        {value.title}
                      </CardTitle>
                      <p className="font-semibold text-brand-secondary text-xs sm:text-sm md:text-base">
                        {value.subtitle}
                      </p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="mb-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                        {value.description}
                      </p>
                      <div className="flex items-center justify-center mt-8 text-brand-primary">
                        <MaterialIcon
                          icon="autorenew"
                          className="mr-2 text-xl sm:text-2xl animate-pulse"
                        />
                        <span className="font-medium text-xs sm:text-sm">
                          Hover to see practices
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Back of card */}
                <div
                  className="absolute inset-0 backface-hidden rotate-y-180"
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <Card className="bg-gradient-to-br from-brand-primary to-brand-primary-dark dark:from-brand-primary-dark dark:to-gray-900 border border-brand-primary dark:border-brand-primary/50 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-center mb-4">
                        <MaterialIcon
                          icon="checklist"
                          className="mr-2 text-brand-secondary text-2xl sm:text-3xl"
                        />
                        <p className="font-bold text-white text-base sm:text-lg md:text-xl">
                          In Practice:
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <ul className="space-y-3">
                        {value.practices.map((practice, pIndex) => (
                          <li key={pIndex} className="flex items-start">
                            <MaterialIcon
                              icon="check_circle"
                              className="flex-shrink-0 mt-0.5 mr-2 text-brand-secondary text-base sm:text-lg"
                            />
                            <span className="text-white leading-relaxed text-xs sm:text-sm md:text-base">
                              {practice}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center justify-center mt-6 text-brand-secondary">
                        <MaterialIcon
                          icon="autorenew"
                          className="mr-2 text-lg sm:text-xl"
                        />
                        <span className="font-medium text-xs">
                          Hover to return
                        </span>
                      </div>
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
