/**
 * Careers data contracts.
 *
 * Runtime values for these cards are now sourced from i18n messages under
 * careersPage.data.* to keep EN/ES parity for all data-driven sections.
 */

export interface CompanyBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface VeteranBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface CultureValue {
  icon: string;
  title: string;
  description: string;
  color: string;
}
