const SAFETY_MANUAL_CLUSTERS = [
  { slug: "program-foundation", min: 1, max: 3 },
  { slug: "field-onboarding-and-communication", min: 4, max: 9 },
  { slug: "safety-oversight-and-industrial-hygiene", min: 10, max: 19 },
  { slug: "fall-and-access-safety", min: 20, max: 24 },
  {
    slug: "excavation-confined-spaces-and-energy-control",
    min: 25,
    max: 27,
  },
  { slug: "energy-and-fire-hazards", min: 28, max: 32 },
  { slug: "motor-vehicles-and-heavy-equipment", min: 33, max: 41 },
  { slug: "tools-and-materials", min: 42, max: 45 },
  { slug: "program-compliance-and-continuity", min: 46, max: 59 },
];

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeTocTitle(value) {
  const text = String(value || "").trim();
  if (!text) return text;

  const acronyms = new Set([
    "mh",
    "app",
    "bbb",
    "cfr",
    "coi",
    "ems",
    "epa",
    "jha",
    "jsa",
    "mish",
    "mvr",
    "osha",
    "ppe",
    "sds",
    "wac",
  ]);

  const lowerWords = new Set([
    "a",
    "an",
    "and",
    "as",
    "at",
    "by",
    "for",
    "from",
    "in",
    "of",
    "on",
    "or",
    "the",
    "to",
    "via",
    "with",
  ]);

  const words = text.toLowerCase().split(/\s+/);
  const normalized = words
    .map((word, index) => {
      if (acronyms.has(word)) return word.toUpperCase();
      if (index > 0 && lowerWords.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return normalized.replace(/\/([a-z])/g, (_, ch) => `/${ch.toUpperCase()}`);
}

function sectionToMishRef(sectionNumber) {
  const n = Number(sectionNumber);
  if (n === 0) return "0.0";
  if (n <= 3) return `1.${n}`;
  if (n <= 9) return `2.${n - 3}`;
  if (n <= 37) return `3.${n - 9}`;
  if (n <= 44) return `4.${n - 37}`;
  return `5.${n - 44}`;
}

export function sectionNavigationHref(sectionNumber, options = {}) {
  const numeric = Number(sectionNumber);
  if (!Number.isFinite(numeric) || numeric < 0) {
    return options.siteUrl
      ? `${options.siteUrl.replace(/\/$/, "")}/resources/safety-manual/contents`
      : "/resources/safety-manual/contents";
  }

  if (numeric === 0) {
    return options.siteUrl
      ? `${options.siteUrl.replace(/\/$/, "")}/resources/safety-manual/contents`
      : "/resources/safety-manual/contents";
  }

  const cluster = SAFETY_MANUAL_CLUSTERS.find(
    (entry) => numeric >= entry.min && numeric <= entry.max,
  );
  if (!cluster) {
    return options.siteUrl
      ? `${options.siteUrl.replace(/\/$/, "")}/resources/safety-manual/contents`
      : "/resources/safety-manual/contents";
  }

  const anchor = `mish-${String(numeric).padStart(2, "0")}`;
  const path = `/resources/safety-manual/${cluster.slug}#${anchor}`;
  return options.siteUrl
    ? `${options.siteUrl.replace(/\/$/, "")}${path}`
    : path;
}

export function resolveMishSectionTargets(manualSection, options = {}) {
  if (manualSection == null) return [];
  const raw = Array.isArray(manualSection) ? manualSection : [manualSection];
  const seen = new Set();
  const out = [];

  for (const entry of raw) {
    if (entry == null) continue;
    const text = String(entry).trim();
    if (!text || text === "—") continue;

    const mishMatch = /^mish\s*-?\s*(\d{1,2})$/i.exec(text);
    const numericOnlyMatch = /^(\d{1,2})$/.exec(text);
    const match = mishMatch || numericOnlyMatch;
    if (!match) continue;

    const numeric = Number(match[1]);
    if (!Number.isFinite(numeric) || numeric < 1 || numeric > 59) continue;
    if (seen.has(numeric)) continue;

    const url = sectionNavigationHref(numeric, options);
    if (!url) continue;

    seen.add(numeric);
    const nn = String(numeric).padStart(2, "0");
    out.push({ numeric, label: `MISH ${nn}`, url });
  }

  return out;
}

export function buildTocEntryHtml(num, title, options = {}) {
  const codePrefix = options.codePrefix || "MISH";
  const code = options.code || `${codePrefix} ${String(num).padStart(2, "0")}`;
  const displayTitle = options.displayTitle || normalizeTocTitle(title);
  const sectionHref =
    options.sectionHref || sectionNavigationHref(num, options);
  const calloutSet = options.calloutSet ?? new Set();
  const isCallout = calloutSet instanceof Set && calloutSet.has(num);
  const cls = isCallout ? "mish-entry callout" : "mish-entry";
  const mishRef = options.mishRef || sectionToMishRef(num);
  const tabLabel = options.tabLabel || "TAB —";
  const pageLabel = options.pageLabel || "Pages: TBD";
  const revisionLabel =
    options.revisionLabel || `REV ${options.revision || "3"}`;
  const docLevelLabel =
    codePrefix === "MISH" ? String(options.docLevelLabel || "").trim() : "";
  const metaParts = [tabLabel, pageLabel, revisionLabel];
  if (docLevelLabel) metaParts.push(docLevelLabel);
  const escapedTitle = escapeHtml(displayTitle);
  const escapedCode = escapeHtml(code);
  const escapedMeta = escapeHtml(metaParts.join(" · "));
  const escapedMishRef = escapeHtml(mishRef);
  const content = [
    `<span class="mish-code">${escapedCode}</span>`,
    `<span class="mish-wbs">MISH ${escapedMishRef}</span>`,
    `<span class="mish-title"><span class="mish-title-main">${escapedTitle}</span><span class="mish-meta">${escapedMeta}</span></span>`,
  ].join("");

  const inner = sectionHref
    ? `<a class="mish-link" href="${escapeHtml(sectionHref)}">${content}</a>`
    : content;

  return `<li class="${cls}">${inner}</li>`;
}
