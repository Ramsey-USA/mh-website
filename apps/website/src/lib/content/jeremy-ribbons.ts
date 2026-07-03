import { readFileSync } from "node:fs";
import { join } from "node:path";
import { resolveJeremyRibbonKey } from "@/lib/content/jeremy-ribbon-routing";

export interface JeremyRibbon {
  eyebrow: string;
  quote: string;
  attribution: string;
}

const DEFAULT_RIBBON: JeremyRibbon = {
  eyebrow: "Words from the General",
  quote:
    "My commitment on every page is the same: clear planning, accountable execution, and communication that earns trust before, during, and after closeout.",
  attribution: "Jeremy Thamert, Owner & President",
};

let cachedRibbons: Record<string, JeremyRibbon> | null = null;

function parseSection(sectionBody: string): JeremyRibbon | null {
  const eyebrowMatch = sectionBody.match(/^eyebrow:\s*(.+)$/m);
  const quoteMatch = sectionBody.match(/^quote:\s*(.+)$/m);
  const attributionMatch = sectionBody.match(/^attribution:\s*(.+)$/m);

  if (!eyebrowMatch || !quoteMatch || !attributionMatch) {
    return null;
  }

  const eyebrow = eyebrowMatch[1]?.trim();
  const quote = quoteMatch[1]?.trim();
  const attribution = attributionMatch[1]?.trim();
  if (!eyebrow || !quote || !attribution) {
    return null;
  }

  return {
    eyebrow,
    quote,
    attribution,
  };
}

function parseRibbons(markdown: string): Record<string, JeremyRibbon> {
  const sections = markdown.split(/^##\s+/m).slice(1);
  const parsed: Record<string, JeremyRibbon> = {};

  for (const section of sections) {
    const [rawTitle = "", ...rest] = section.split("\n");
    const key = rawTitle.trim().toLowerCase();
    if (!key) continue;

    const content = rest.join("\n").trim();
    const ribbon = parseSection(content);

    if (ribbon) {
      parsed[key] = ribbon;
    }
  }

  return parsed;
}

function loadRibbons(): Record<string, JeremyRibbon> {
  try {
    const filePath = join(process.cwd(), "src/content/jeremy-page-ribbons.md");
    const markdown = readFileSync(filePath, "utf8");
    const parsed = parseRibbons(markdown);
    return Object.keys(parsed).length > 0
      ? parsed
      : { default: DEFAULT_RIBBON };
  } catch {
    return { default: DEFAULT_RIBBON };
  }
}

export function getJeremyRibbon(key: string): JeremyRibbon {
  cachedRibbons ??= loadRibbons();
  return (
    cachedRibbons[key.toLowerCase()] ??
    cachedRibbons["default"] ??
    DEFAULT_RIBBON
  );
}

export function getJeremyRibbonForPath(pathname: string): JeremyRibbon {
  cachedRibbons ??= loadRibbons();
  const key = resolveJeremyRibbonKey(pathname, Object.keys(cachedRibbons));
  return key ? getJeremyRibbon(key) : getJeremyRibbon("default");
}

export function getAllJeremyRibbons(): Record<string, JeremyRibbon> {
  cachedRibbons ??= loadRibbons();
  return cachedRibbons;
}
