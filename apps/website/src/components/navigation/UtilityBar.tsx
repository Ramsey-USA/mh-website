import { Link } from "@/i18n/navigation";
import { COMPANY_INFO } from "@/lib/constants/company";
import { ThemeToggle } from "@/components/ui/layout/ThemeToggle";
import { LocaleSwitcher } from "./LocaleSwitcher";

type UtilityBarProps = {
  labels: {
    utilityLabel: string;
    callLabel: string;
    locationLabel: string;
    contactLinkLabel: string;
    currentLanguageLabel: string;
    switcherLabel: string;
    english: string;
    spanish: string;
  };
};

export function UtilityBar({ labels }: Readonly<UtilityBarProps>) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-primary/15 pb-2">
      <nav aria-label={labels.utilityLabel} className="min-w-0">
        <ul className="flex flex-wrap items-center gap-3 text-xs">
          <li>
            <a
              href={`tel:${COMPANY_INFO.phone.tel}`}
              className="font-subheading text-gray-700 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-gray-200 dark:hover:text-brand-secondary-light dark:focus-visible:ring-offset-gray-950"
              aria-label={`${labels.callLabel} ${COMPANY_INFO.phone.display}`}
            >
              {labels.callLabel} {COMPANY_INFO.phone.display}
            </a>
          </li>
          <li className="font-subheading text-gray-500 dark:text-gray-400">
            {labels.locationLabel} {COMPANY_INFO.address.cityState}
          </li>
          <li>
            <Link
              href="/contact"
              className="font-subheading text-brand-primary transition-colors hover:text-brand-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-secondary/80 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-brand-secondary-light dark:hover:text-brand-secondary dark:focus-visible:ring-offset-gray-950"
            >
              {labels.contactLinkLabel}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-2">
        <LocaleSwitcher
          labels={{
            currentLanguageLabel: labels.currentLanguageLabel,
            switcherLabel: labels.switcherLabel,
            english: labels.english,
            spanish: labels.spanish,
          }}
        />
        <ThemeToggle compact size="sm" />
      </div>
    </div>
  );
}
