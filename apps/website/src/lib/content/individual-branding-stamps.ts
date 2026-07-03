import { readFileSync } from "node:fs";
import { join } from "node:path";

export type BrandingStampIcon = "star" | "anchor";

export interface IndividualBrandingStamp {
  key: string;
  icon: BrandingStampIcon;
  stars: number;
  label: string;
  ariaLabel: string;
}

const DEFAULT_JEREMY_STAMP: IndividualBrandingStamp = {
  key: "jeremy-thamert",
  icon: "star",
  stars: 4,
  label: "Four-Star Command Stamp",
  ariaLabel: "Jeremy Thamert individual branding stamp",
};

let cachedStamps: Record<string, IndividualBrandingStamp> | null = null;

function parseSection(
  key: string,
  sectionBody: string,
): IndividualBrandingStamp | null {
  const iconMatch = sectionBody.match(/^icon:\s*(.+)$/m);
  const starsMatch = sectionBody.match(/^stars:\s*(\d+)$/m);
  const labelMatch = sectionBody.match(/^label:\s*(.+)$/m);
  const ariaLabelMatch = sectionBody.match(/^ariaLabel:\s*(.+)$/m);

  if (!iconMatch || !starsMatch || !labelMatch || !ariaLabelMatch) {
    return null;
  }

  const icon = iconMatch[1]?.trim().toLowerCase();
  if (!icon || (icon !== "star" && icon !== "anchor")) {
    return null;
  }

  const starsValue = starsMatch[1];
  if (!starsValue) {
    return null;
  }

  const stars = Number.parseInt(starsValue, 10);
  if (Number.isNaN(stars) || stars < 1 || stars > 5) {
    return null;
  }

  const label = labelMatch[1]?.trim();
  const ariaLabel = ariaLabelMatch[1]?.trim();
  if (!label || !ariaLabel) {
    return null;
  }

  return {
    key,
    icon,
    stars,
    label,
    ariaLabel,
  };
}

function parseStamps(
  markdown: string,
): Record<string, IndividualBrandingStamp> {
  const sections = markdown.split(/^##\s+/m).slice(1);
  const parsed: Record<string, IndividualBrandingStamp> = {};

  for (const section of sections) {
    const [rawTitle = "", ...rest] = section.split("\n");
    const key = rawTitle.trim().toLowerCase();
    if (!key) continue;

    const content = rest.join("\n").trim();
    const stamp = parseSection(key, content);

    if (stamp) {
      parsed[key] = stamp;
    }
  }

  return parsed;
}

function loadStamps(): Record<string, IndividualBrandingStamp> {
  try {
    const filePath = join(
      process.cwd(),
      "src/content/individual-branding-stamps.md",
    );
    const markdown = readFileSync(filePath, "utf8");
    const parsed = parseStamps(markdown);

    if (!parsed[DEFAULT_JEREMY_STAMP.key]) {
      parsed[DEFAULT_JEREMY_STAMP.key] = DEFAULT_JEREMY_STAMP;
    }

    return parsed;
  } catch {
    return { [DEFAULT_JEREMY_STAMP.key]: DEFAULT_JEREMY_STAMP };
  }
}

export function getIndividualBrandingStamp(
  key: string,
): IndividualBrandingStamp | null {
  cachedStamps ??= loadStamps();
  return cachedStamps[key.toLowerCase()] ?? null;
}

export function getAllIndividualBrandingStamps(): Record<
  string,
  IndividualBrandingStamp
> {
  cachedStamps ??= loadStamps();
  return cachedStamps;
}
