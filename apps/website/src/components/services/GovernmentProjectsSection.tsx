/**
 * Government & Grant-Funded Projects Section
 * Streamlined summary block that routes users to the dedicated public-sector pages
 */

import Link from "next/link";
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { BrandedContentSection } from "@/components/templates";
import { Card, CardContent, Button } from "@/components/ui";
import { getUniversalCtaSet } from "@/lib/content/universal-ctas";
import { cornerRadius } from "@/lib/styles/design-tokens";

export function GovernmentProjectsSection({
  title,
  subtitle,
  description,
}: {
  title: string;
  subtitle: string;
  description: string;
}) {
  const universalCtas = getUniversalCtaSet("en");

  return (
    <BrandedContentSection
      id="government"
      header={{
        icon: "account_balance",
        iconVariant: "bronze",
        subtitle,
        title,
        description,
      }}
    >
      <FadeInWhenVisible>
        <div className="mx-auto max-w-4xl">
          <Card className="relative bg-linear-to-br from-white via-white to-brand-primary/5 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 border-2 border-brand-primary shadow-xl overflow-hidden">
            <CardContent className="relative p-6 sm:p-8 lg:p-10">
              <div className="mb-5 flex items-center gap-3">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center ${cornerRadius.element} bg-linear-to-br from-brand-primary to-brand-secondary shadow-lg`}
                >
                  <MaterialIcon
                    icon="account_balance"
                    size="lg"
                    className="text-white"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                  Public and Government Projects
                </h3>
              </div>

              <p className="font-body text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We support government and grant-funded projects with disciplined
                planning, documentation control, and compliance-focused
                delivery. For complete capability details, procurement pathways,
                and public-sector workflow guidance, use our dedicated Public
                Sector pages.
              </p>

              <div className="mt-6">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link
                    href={universalCtas.publicSectorOverview.href}
                    className="inline-flex w-full sm:w-auto"
                  >
                    <MaterialIcon
                      icon="account_balance"
                      size="md"
                      className="mr-2"
                    />
                    {universalCtas.publicSectorOverview.label}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeInWhenVisible>
    </BrandedContentSection>
  );
}
