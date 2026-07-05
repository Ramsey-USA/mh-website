/**
 * Construction Process Overview Section
 * Shows the 6-step construction process
 */

import Link from "next/link";
import {
  FadeInWhenVisible,
  StaggeredFadeIn,
} from "@/components/animations/FramerMotionComponents";
import { Card, CardContent, Button, IconContainer } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";
import {
  cornerRadius,
  hoverMotion,
  transitionDuration,
} from "@/lib/styles/design-tokens";

interface ProcessStep {
  title: string;
  description: string;
  tags: string[];
}

interface ProcessCta {
  title: string;
  description: string;
  contactButton: string;
  projectsButton: string;
}

export function ConstructionProcessSection({
  title,
  subtitle,
  description,
  steps,
  cta,
  showTags = true,
  compactCta = false,
}: Readonly<{
  title: string;
  subtitle: string;
  description: string;
  steps: ProcessStep[];
  cta: ProcessCta;
  showTags?: boolean;
  compactCta?: boolean;
}>) {
  const stepIconByIndex = [
    "contact_phone",
    "calculate",
    "description",
    "construction",
    "fact_check",
    "check_circle",
  ] as const;

  const stepGradientByIndex = [
    "mixed",
    "secondary",
    "forest",
    "mixed",
    "secondary",
    "forest",
  ] as const;

  const stepAccentByIndex = [
    "primary",
    "secondary",
    "secondary",
    "primary",
    "secondary",
    "secondary",
  ] as const;

  return (
    <BrandedContentSection
      id="process"
      header={{
        icon: "timeline",
        iconVariant: "secondary",
        subtitle,
        title,
        description,
      }}
    >
      <div className="mx-auto max-w-6xl relative">
        {/* Vertical connecting line */}
        <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-linear-to-b from-brand-primary via-brand-secondary to-bronze-700 dark:from-brand-primary-dark dark:via-brand-secondary-dark dark:to-bronze-700 hidden sm:block"></div>

        <StaggeredFadeIn className="space-y-8 lg:space-y-12">
          {steps.map((step, index) => {
            const accent = stepAccentByIndex[index] ?? "primary";
            const gradient = stepGradientByIndex[index] ?? "mixed";
            const icon = stepIconByIndex[index] ?? "check_circle";
            const accentClass =
              accent === "secondary"
                ? "border-brand-secondary bg-linear-to-br from-white to-brand-secondary/5 dark:from-gray-900 dark:to-gray-800 dark:hover:shadow-brand-secondary/10"
                : "border-brand-primary bg-linear-to-br from-white to-brand-primary/5 dark:from-gray-900 dark:to-gray-800 dark:hover:shadow-brand-primary/10";
            const badgeClass =
              accent === "secondary"
                ? "bg-brand-secondary/10 text-brand-secondary"
                : "bg-brand-primary/10 text-brand-primary";

            return (
              <div
                key={`services-process-step-${index + 1}`}
                className="relative flex items-start gap-6 sm:flex-row flex-col"
              >
                <IconContainer
                  size="md"
                  gradient={gradient}
                  className="shrink-0 z-10 ring-4 ring-white dark:ring-gray-800"
                >
                  <span
                    className={`font-black text-2xl text-white drop-shadow-lg ${hoverMotion.iconSubtle}`}
                  >
                    {index + 1}
                  </span>
                  <div
                    className={`absolute inset-0 ${cornerRadius.full} bg-brand-primary/50 animate-ping opacity-20`}
                  ></div>
                </IconContainer>

                <Card
                  className={`group flex-1 border-l-4 hover:shadow-2xl transition-all ${transitionDuration.normal} ${hoverMotion.translateUpLarge} ${accentClass}`}
                >
                  <CardContent className="p-6 sm:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${cornerRadius.element} flex items-center justify-center ${hoverMotion.iconSubtle} ${badgeClass}`}
                      >
                        <MaterialIcon
                          icon={icon}
                          size="lg"
                          className={
                            accent === "secondary"
                              ? "text-brand-secondary"
                              : "text-brand-primary"
                          }
                        />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-xl sm:text-2xl">
                        {step.title}
                      </h3>
                    </div>

                    <p className="font-body mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>

                    {showTags && (
                      <div className="flex flex-wrap gap-2">
                        {step.tags.map((tag) => (
                          <span
                            key={`${step.title}-${tag}`}
                            className={`${cornerRadius.full} px-3 py-1.5 text-sm font-medium transition-colors ${transitionDuration.fast} ${badgeClass}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </StaggeredFadeIn>

        {/* CTA Section */}
        <FadeInWhenVisible>
          <div
            className={`bg-linear-to-br from-brand-primary/10 to-brand-secondary/10 dark:from-brand-primary/20 dark:to-brand-secondary/20 shadow-xl mx-auto border-2 border-brand-primary dark:border-brand-primary/50 ${cornerRadius.icon} max-w-4xl text-center ${
              compactCta ? "mt-10 p-6 lg:p-8" : "mt-16 p-8 lg:p-12"
            }`}
          >
            <MaterialIcon
              icon="handshake"
              size={compactCta ? "3xl" : "4xl"}
              className={
                compactCta
                  ? "mb-4 text-brand-primary"
                  : "mb-6 text-brand-primary"
              }
            />
            <h3
              className={`font-black text-gray-900 dark:text-white ${
                compactCta
                  ? "mb-3 text-xl sm:text-2xl"
                  : "mb-4 text-2xl sm:text-3xl"
              }`}
            >
              {cta.title}
            </h3>
            <p
              className={`font-body text-gray-700 dark:text-gray-300 leading-relaxed ${
                compactCta ? "mb-5 text-base" : "mb-8 text-lg"
              }`}
            >
              {cta.description}
            </p>
            <div className="flex justify-center">
              <Button
                variant="secondary"
                size="lg"
                className={`transition-all ${transitionDuration.normal} min-w-65 ${hoverMotion.button}`}
                asChild
              >
                <Link href="/projects">
                  <MaterialIcon
                    icon="photo_library"
                    size="lg"
                    className="mr-3"
                  />
                  <span className="font-medium">{cta.projectsButton}</span>
                </Link>
              </Button>
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </BrandedContentSection>
  );
}
