/**
 * Partnership Process Section
 * Outlines the step-by-step collaboration process
 */

import { Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { partnershipProcess } from "./projectsData";

export function PartnershipProcessSection() {
  return (
    <section className="bg-white dark:bg-gray-900 py-20 lg:py-32 xl:py-40">
      <div className="mx-auto px-4 container">
        <FadeInWhenVisible>
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 lg:mb-24 text-center scroll-reveal">
              <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tighter">
                <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                  Our Partnership
                </span>
                <span className="block text-brand-primary dark:text-brand-primary font-black">
                  Process
                </span>
              </h2>

              <p className="mx-auto max-w-4xl font-light text-gray-600 dark:text-gray-300 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wide px-2">
                From initial consultation to project completion, we work WITH
                you every step of the way
              </p>
            </div>

            <div className="space-y-6">
              {partnershipProcess.map((process, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start min-h-[5rem]">
                      <div className="flex-shrink-0 mr-4">
                        <div className="flex justify-center items-center bg-brand-primary rounded-full w-12 h-12 font-bold text-white text-xl">
                          {process.step}
                        </div>
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div className="flex-grow pr-4">
                            <h3 className="mb-2 font-bold text-gray-900 dark:text-white text-xl leading-tight">
                              {process.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {process.description}
                            </p>
                          </div>
                          <MaterialIcon
                            icon={process.icon}
                            size="lg"
                            className="flex-shrink-0 ml-4 text-brand-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
