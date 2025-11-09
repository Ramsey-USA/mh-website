/**
 * Partnership Process Section
 * Outlines the step-by-step collaboration process
 */

import { Card, CardContent } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Section, SectionHeader } from "@/components/ui/layout";
import { getCardClassName } from "@/lib/styles/card-variants";
import { partnershipProcess } from "./projectsData";

export function PartnershipProcessSection() {
  return (
    <Section variant="default" padding="large">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          title={
            <>
              <span className="block mb-4 font-semibold text-gray-700 dark:text-gray-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                Our Partnership
              </span>
              <span className="block text-brand-primary dark:text-brand-primary font-black">
                Process
              </span>
            </>
          }
          description="From initial consultation to project completion, we work WITH you every step of the way"
        />

        <div className="space-y-6">
          {partnershipProcess.map((process, _index) => (
            <Card key={_index} className={getCardClassName("static")}>
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
    </Section>
  );
}
