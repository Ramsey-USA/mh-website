const BREADCRUMB_LABEL_ALIASES: Record<string, string> = {
  back: "Home",
  "go back": "Home",
  return: "Home",
  regresar: "Home",
  volver: "Home",
  retour: "Home",
  "our team": "Team",
  government: "Government",
  "government projects": "Government",
  "public sector": "Government",
  "public sector projects": "Government",
  "safety hub": "Safety Program",
};

/**
 * Normalizes breadcrumb labels into canonical MH taxonomy terms.
 * This keeps UX wording and SEO breadcrumbs consistent across all routes.
 */
export function normalizeBreadcrumbTaxonomyLabel(
  label: string,
  opts?: {
    href?: string;
    index?: number;
  },
): string {
  const normalized = label.trim();
  const normalizedKey = normalized.toLowerCase();

  if (
    opts?.index === 0 &&
    opts?.href === "/" &&
    (normalizedKey === "back" ||
      normalizedKey === "go back" ||
      normalizedKey === "return" ||
      normalizedKey === "regresar" ||
      normalizedKey === "volver" ||
      normalizedKey === "retour")
  ) {
    return "Home";
  }

  return BREADCRUMB_LABEL_ALIASES[normalizedKey] ?? normalized;
}
