/**
 * Awards & Recognition Section Component
 * Keeps public display limited to source-backed recognition records.
 */

import { MaterialIcon } from "@/components/icons/MaterialIcon";
import { Card } from "@/components/ui";
import { BrandedContentSection } from "@/components/templates";

type RecognitionCard = {
  title: string;
  badge: string;
  detail: string;
  icon: string;
  isPublic: boolean;
};

const recognitionCards: RecognitionCard[] = [
  {
    title: "Veteran Business Enterprise",
    badge: "Certified VOSB",
    detail: "Department of Veterans Affairs certification",
    icon: "military_tech",
    isPublic: true,
  },
  {
    title: "Excellence in Construction",
    badge: "AGC Washington",
    detail: "Outstanding Commercial Project Award",
    icon: "workspace_premium",
    isPublic: false,
  },
  {
    title: "Sustainable Building Leader",
    badge: "WA Green Building Council",
    detail: "LEED compliance & sustainable practices",
    icon: "eco",
    isPublic: false,
  },
  {
    title: "Safety Excellence",
    badge: "OSHA VPP Star",
    detail: "Exemplary workplace safety programs",
    icon: "verified_user",
    isPublic: false,
  },
  {
    title: "BBB Accredited Business",
    badge: "A+ Rating",
    detail: "Better Business Bureau since April 2026",
    icon: "verified",
    isPublic: false,
  },
];

export function AwardsSection() {
  const publicRecognitionCards = recognitionCards.filter(
    (card) => card.isPublic,
  );

  return (
    <BrandedContentSection
      id="awards"
      header={{
        icon: "workspace_premium",
        iconVariant: "bronze",
        subtitle: "Proven Excellence",
        title: "Industry Recognition",
        description:
          "Public recognition shown here is limited to source-backed records in repository-managed references.",
      }}
    >
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl">
        {publicRecognitionCards.map((card) => (
          <Card
            key={card.title}
            className="border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="mx-auto mb-3 inline-flex rounded-xl bg-brand-primary p-3 text-white">
              <MaterialIcon icon={card.icon} size="lg" className="text-white" />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">
              {card.title}
            </h3>
            <p className="mt-2 text-sm font-semibold text-brand-primary dark:text-brand-primary-light">
              {card.badge}
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {card.detail}
            </p>
          </Card>
        ))}
      </div>

      <Card className="mx-auto mt-8 max-w-5xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Additional award timelines and historic recognition records remain
          withheld until source-backed approval is complete.
        </p>
      </Card>
    </BrandedContentSection>
  );
}
