import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import {
  DiagonalStripePattern,
  BrandColorBlobs,
} from "@/components/ui/backgrounds";
import { COMPANY_INFO } from "@/lib/constants/company";
import {
  cornerRadius,
  hoverMotion,
  transitionDuration,
} from "@/lib/styles/design-tokens";
import { useTranslations } from "next-intl";

export function PartnershipTypesSection() {
  const t = useTranslations("home");
  const clientItems =
    (t.raw("services.partnership.clientCard.items") as string[]).slice(0, 3) ??
    [];
  const tradeItems =
    (t.raw("services.partnership.tradeCard.items") as string[]).slice(0, 3) ??
    [];

  return (
    <section className="relative bg-white dark:bg-gray-900 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden">
      <DiagonalStripePattern />
      <BrandColorBlobs />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mb-16 sm:mb-20 text-center">
          <div className="flex items-center justify-center mb-8 gap-4">
            <div
              className={`h-1 w-16 bg-linear-to-r from-transparent to-gray-300 dark:to-gray-600 ${cornerRadius.full}`}
            ></div>
            <div className="relative">
              <div
                className={`absolute -inset-4 bg-linear-to-br from-brand-secondary/30 to-bronze-700/30 blur-2xl ${cornerRadius.full}`}
              ></div>
              <div
                className={`relative bg-linear-to-br from-brand-secondary via-bronze-700 to-bronze-800 p-5 ${cornerRadius.icon} shadow-2xl border-2 border-white/50 dark:border-gray-600`}
              >
                <MaterialIcon
                  icon="diversity_3"
                  size="2xl"
                  className="text-white drop-shadow-lg"
                />
              </div>
            </div>
            <div
              className={`h-1 w-16 bg-linear-to-l from-transparent to-gray-300 dark:to-gray-600 ${cornerRadius.full}`}
            ></div>
          </div>

          <h2 className="mb-6 sm:mb-8 font-black text-gray-900 dark:text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-relaxed tracking-tighter overflow-visible">
            <span className="block mb-3 sm:mb-4 font-semibold text-gray-700 dark:text-gray-200 text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight overflow-visible py-1">
              {t("services.partnership.sectionSubtitle")}
            </span>
            <span className="block bg-linear-to-r from-brand-primary via-brand-secondary to-brand-primary bg-clip-text text-transparent font-black drop-shadow-sm overflow-visible py-2 pb-3 leading-normal">
              {t("services.partnership.sectionTitle")}
            </span>
          </h2>

          <p className="font-body mx-auto max-w-5xl font-light text-gray-700 dark:text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed tracking-wide px-2">
            {t("services.partnership.sectionDescription")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          <div className="group relative flex h-full">
            <div
              className={`absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 ${cornerRadius.icon} opacity-20 group-hover:opacity-100 blur-xl transition-all ${transitionDuration.slow}`}
            ></div>

            <Card
              className={`relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all ${transitionDuration.normal} group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800`}
            >
              <div className="h-2 bg-linear-to-r from-brand-primary via-brand-primary-dark to-brand-primary-darker"></div>

              <div className="relative p-8 lg:p-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative shrink-0">
                    <div
                      className={`absolute -inset-2 bg-linear-to-br from-brand-primary/40 to-brand-primary-dark/40 opacity-30 blur-lg ${cornerRadius.icon}`}
                    ></div>
                    <div
                      className={`relative w-16 h-16 lg:w-18 lg:h-18 bg-linear-to-br from-brand-primary to-brand-primary-dark ${cornerRadius.icon} flex items-center justify-center shadow-xl ${hoverMotion.iconPlayful}`}
                    >
                      <MaterialIcon
                        icon="handshake"
                        size="xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight">
                      {t("services.partnership.clientCard.title")}
                    </h3>
                    <p className="text-brand-primary dark:text-brand-primary-light font-semibold text-lg">
                      {t("services.partnership.clientCard.subtitle")}
                    </p>
                  </div>
                </div>

                <p className="font-body text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {t("services.partnership.clientCard.description")}
                </p>

                <div className="mb-6 grow">
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
                    {t("services.partnership.clientCard.listTitle")}
                  </h4>
                  <ul className="space-y-3">
                    {clientItems.map((item) => (
                      <li
                        key={`client-item-${item}`}
                        className={`flex items-start gap-3 ${hoverMotion.translateUpLarge}`}
                      >
                        <div
                          className={`w-6 h-6 bg-brand-primary/10 dark:bg-brand-primary/20 ${cornerRadius.small} flex items-center justify-center mt-1 shrink-0`}
                        >
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-primary"
                          />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 mt-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className={`w-full ${hoverMotion.button} group`}
                    asChild
                  >
                    <Link href="/projects" className="block">
                      <MaterialIcon
                        icon="photo_library"
                        size="md"
                        className={`mr-2 ${hoverMotion.iconSubtle}`}
                      />
                      {t("services.partnership.clientCard.buttons.viewWork")}
                    </Link>
                  </Button>
                  <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                    <MaterialIcon
                      icon="phone"
                      size="sm"
                      className="inline mr-1"
                    />
                    {t("services.partnership.callLabel")}{" "}
                    {COMPANY_INFO.phone.display}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="group relative flex h-full">
            <div
              className={`absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 ${cornerRadius.icon} opacity-20 group-hover:opacity-100 blur-xl transition-all ${transitionDuration.slow}`}
            ></div>

            <Card
              className={`relative flex w-full flex-col overflow-hidden border-2 border-gray-200 bg-white shadow-lg transition-all ${transitionDuration.normal} group-hover:border-transparent group-hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800`}
            >
              <div className="h-2 bg-linear-to-r from-brand-secondary via-bronze-700 to-bronze-800"></div>

              <div className="relative p-8 lg:p-10 flex flex-col flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative shrink-0">
                    <div
                      className={`absolute -inset-2 bg-linear-to-br from-brand-secondary/40 to-bronze-700/40 opacity-30 blur-lg ${cornerRadius.icon}`}
                    ></div>
                    <div
                      className={`relative w-16 h-16 lg:w-18 lg:h-18 bg-linear-to-br from-brand-secondary to-bronze-700 ${cornerRadius.icon} flex items-center justify-center shadow-xl ${hoverMotion.iconPlayful}`}
                    >
                      <MaterialIcon
                        icon="construction"
                        size="xl"
                        className="text-white drop-shadow-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 dark:text-white text-2xl sm:text-3xl leading-tight">
                      {t("services.partnership.tradeCard.title")}
                    </h3>
                    <p className="text-brand-secondary dark:text-brand-secondary-light font-semibold text-lg">
                      {t("services.partnership.tradeCard.subtitle")}
                    </p>
                  </div>
                </div>

                <p className="font-body text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                  {t("services.partnership.tradeCard.description")}
                </p>

                <div className="mb-6 grow">
                  <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
                    {t("services.partnership.tradeCard.listTitle")}
                  </h4>
                  <ul className="space-y-3">
                    {tradeItems.map((item) => (
                      <li
                        key={`trade-item-${item}`}
                        className={`flex items-start gap-3 ${hoverMotion.translateUpLarge}`}
                      >
                        <div
                          className={`w-6 h-6 bg-brand-secondary/10 dark:bg-brand-secondary/20 ${cornerRadius.small} flex items-center justify-center mt-1 shrink-0`}
                        >
                          <MaterialIcon
                            icon="check_circle"
                            size="sm"
                            className="text-brand-secondary"
                          />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 mt-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    className={`w-full ${hoverMotion.button} group`}
                    asChild
                  >
                    <Link href="/allies" className="block">
                      <MaterialIcon
                        icon="construction"
                        size="md"
                        className={`mr-2 ${hoverMotion.iconSubtle}`}
                      />
                      {t("services.partnership.tradeCard.buttons.joinNetwork")}
                    </Link>
                  </Button>
                  <p className="text-center text-gray-600 dark:text-gray-300 text-sm">
                    <MaterialIcon
                      icon="phone"
                      size="sm"
                      className="inline mr-1"
                    />
                    {t("services.partnership.callLabel")}{" "}
                    {COMPANY_INFO.phone.display}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 mx-auto max-w-4xl">
          <Card className="relative overflow-hidden border-2 border-brand-primary/30 bg-white p-6 shadow-xl dark:bg-gray-900 lg:p-8">
            <div
              className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 ${cornerRadius.full} bg-brand-primary/10 blur-3xl`}
            ></div>
            <div className="relative flex items-start gap-4">
              <div
                className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center ${cornerRadius.element} bg-brand-primary/10 dark:bg-brand-primary/20`}
              >
                <MaterialIcon
                  icon="info"
                  size="md"
                  className="text-brand-primary"
                />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white leading-tight">
                  {t("services.partnership.bottomNote.title")}
                </p>
                <p className="font-body mt-2 text-base sm:text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                  {t("services.partnership.bottomNote.description")}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
