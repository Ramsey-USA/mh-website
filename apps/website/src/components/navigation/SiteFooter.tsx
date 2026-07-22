import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WaVobBadge } from "@/components/ui/WaVobBadge";
import { COMPANY_INFO } from "@/lib/constants/company";
import { buildSiteFooterModel } from "./footer-data";

type FooterGroupHeadingKey =
  "servicesMarkets" | "companyProof" | "resourcesCommunity";

export function SiteFooter() {
  const locale = useLocale() === "es" ? "es" : "en";
  const t = useTranslations("siteFooter");
  const model = buildSiteFooterModel(locale);
  const currentYear = new Date().getFullYear();

  const groupHeadings: Record<FooterGroupHeadingKey, string> = {
    servicesMarkets: t("servicesMarketsHeading"),
    companyProof: t("companyProofHeading"),
    resourcesCommunity: t("resourcesCommunityHeading"),
  };

  return (
    <footer className="border-t border-brand-primary/20 bg-gray-950 text-gray-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_repeat(3,minmax(0,0.8fr))_1fr] lg:px-8">
        <section className="space-y-5" aria-labelledby="footer-brand-heading">
          <div className="space-y-4">
            <Link
              href="/"
              aria-label={t("homeAriaLabel")}
              className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
            >
              <Image
                src="/images/logo/mh-logo-dark-bg.webp"
                alt="MH Construction"
                width={180}
                height={72}
                className="h-auto w-40 object-contain sm:w-44"
                sizes="(max-width: 640px) 160px, 176px"
              />
            </Link>

            <div className="space-y-2">
              <h2
                id="footer-brand-heading"
                className="font-heading text-lg text-white"
              >
                {COMPANY_INFO.legalName}
              </h2>
              <p className="font-body max-w-sm text-sm leading-6 text-gray-300">
                {t("brandDescriptor")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <WaVobBadge size="sm" className="shrink-0" />
            <p className="font-subheading text-sm text-gray-200">
              {t("veteranOwnedLabel")}
            </p>
          </div>

          <Link
            href={model.primaryActionHref}
            className="font-subheading inline-flex min-h-11 items-center justify-center rounded-md border border-brand-secondary/60 bg-brand-primary px-4 py-2 text-sm tracking-[0.06em] text-white transition-colors hover:bg-brand-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
          >
            {t("ctaLabel")}
          </Link>
        </section>

        {model.navGroups.map((group) => (
          <nav
            key={group.key}
            aria-label={groupHeadings[group.key as FooterGroupHeadingKey]}
            className="space-y-3"
          >
            <h2 className="font-subheading text-sm uppercase tracking-[0.16em] text-brand-secondary">
              {groupHeadings[group.key as FooterGroupHeadingKey]}
            </h2>
            <ul className="space-y-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-subheading text-sm text-gray-200 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <section aria-labelledby="footer-contact-heading" className="space-y-3">
          <h2
            id="footer-contact-heading"
            className="font-subheading text-sm uppercase tracking-[0.16em] text-brand-secondary"
          >
            {t("contactHeading")}
          </h2>

          <p className="font-body text-sm leading-6 text-gray-300">
            {t("contactDescriptor")}
          </p>

          <address className="space-y-3 not-italic text-sm text-gray-200">
            <div>
              <p className="font-subheading text-xs uppercase tracking-[0.14em] text-gray-400">
                {t("phoneLabel")}
              </p>
              <a
                href={model.contact.phoneHref}
                className="font-subheading transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                {model.contact.phoneDisplay}
              </a>
            </div>

            <div>
              <p className="font-subheading text-xs uppercase tracking-[0.14em] text-gray-400">
                {t("emailLabel")}
              </p>
              <a
                href={model.contact.emailHref}
                className="font-subheading break-all transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                {model.contact.emailDisplay}
              </a>
            </div>

            <div>
              <p className="font-subheading text-xs uppercase tracking-[0.14em] text-gray-400">
                {t("addressLabel")}
              </p>
              <p>{model.contact.addressLines[0]}</p>
              <p>{model.contact.addressLines[1]}</p>
            </div>
          </address>

          <dl className="grid gap-2 text-sm text-gray-300">
            <div>
              <dt className="font-subheading text-xs uppercase tracking-[0.14em] text-gray-400">
                {t("serviceAreaLabel")}
              </dt>
              <dd>{model.contact.serviceArea}</dd>
            </div>
            <div>
              <dt className="font-subheading text-xs uppercase tracking-[0.14em] text-gray-400">
                {t("primaryRegionLabel")}
              </dt>
              <dd>{model.contact.primaryRegion}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-gray-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p className="font-body">
            {`© ${currentYear} ${COMPANY_INFO.legalName}. ${t("copyrightLabel")}`}
          </p>

          <nav
            aria-label={t("legalNavLabel")}
            className="flex flex-wrap items-center gap-x-4 gap-y-2"
          >
            {model.legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-subheading text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                {item.label}
              </Link>
            ))}
            {model.showHtmlSitemap ? (
              <Link
                href="/sitemap"
                className="font-subheading text-sm transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                {t("htmlSitemapLabel")}
              </Link>
            ) : null}
          </nav>
        </div>
      </div>
    </footer>
  );
}
