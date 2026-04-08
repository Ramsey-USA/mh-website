"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/icons/MaterialIcon";
import type { DocumentSection, SectionCategory } from "@/lib/data/documents";

const ALL_CATEGORIES: SectionCategory[] = [
  "Personnel & Policy",
  "Planning & Administration",
  "Physical Hazards",
  "Equipment & Operations",
  "Health & Industrial Hygiene",
  "Site Control & Environment",
];

const CATEGORY_ICONS: Record<SectionCategory, string> = {
  "Personnel & Policy":          "badge",
  "Planning & Administration":   "event_note",
  "Physical Hazards":            "warning",
  "Equipment & Operations":      "precision_manufacturing",
  "Health & Industrial Hygiene": "medical_services",
  "Site Control & Environment":  "traffic",
};

interface Props {
  sections: DocumentSection[];
}

export function SectionBrowser({ sections }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<SectionCategory | null>(null);
  const [requiredOnly, setRequiredOnly] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sections.filter((s) => {
      if (requiredOnly && s.priority !== "required") return false;
      if (activeCategory && s.category !== activeCategory) return false;
      if (q && !s.title.toLowerCase().includes(q) && !s.summary.toLowerCase().includes(q) && !s.number.includes(q)) return false;
      return true;
    });
  }, [sections, query, activeCategory, requiredOnly]);

  // Group filtered sections by category
  const grouped = useMemo(() => {
    const map = new Map<SectionCategory, DocumentSection[]>();
    for (const s of filtered) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    return map;
  }, [filtered]);

  const categoriesToShow = activeCategory ? [activeCategory] : ALL_CATEGORIES;

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-6 space-y-4">
        {/* Text search */}
        <div className="relative">
          <MaterialIcon
            icon="search"
            size="sm"
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search sections by title, topic, or number…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <MaterialIcon icon="close" size="sm" />
            </button>
          )}
        </div>

        {/* Category chips + required toggle */}
        <div className="flex items-start gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              activeCategory === null
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-brand-primary hover:text-brand-primary"
            }`}
          >
            All
          </button>
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activeCategory === cat
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              <MaterialIcon icon={CATEGORY_ICONS[cat]} size="xs" className="shrink-0" />
              {cat}
            </button>
          ))}

          {/* Divider */}
          <span className="self-center text-gray-300 dark:text-gray-600 select-none">|</span>

          {/* Required toggle */}
          <button
            onClick={() => setRequiredOnly(!requiredOnly)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              requiredOnly
                ? "bg-red-600 text-white border-red-600"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:border-red-500 hover:text-red-600"
            }`}
          >
            <MaterialIcon icon="gpp_good" size="xs" className="shrink-0" />
            OSHA Required Only
          </button>
        </div>

        {/* Result count */}
        {(query || activeCategory || requiredOnly) && (
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {filtered.length} section{filtered.length !== 1 ? "s" : ""} match
            {filtered.length !== 1 ? "" : "es"}
          </p>
        )}
      </div>

      {/* Results grouped by category */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400 dark:text-gray-500">
          <MaterialIcon icon="search_off" size="xl" className="mb-2" />
          <p className="text-sm">No sections match your filters.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categoriesToShow.map((cat) => {
            const items = grouped.get(cat);
            if (!items || items.length === 0) return null;
            return (
              <div key={cat}>
                <div className="flex items-center gap-2 mb-3">
                  <MaterialIcon icon={CATEGORY_ICONS[cat]} size="sm" className="text-brand-primary" />
                  <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    {cat}
                  </h3>
                  <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {items.map((section) => (
                    <Link
                      key={section.slug}
                      href={`/resources/safety-manual/section/${section.slug}`}
                      className="group flex items-start gap-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3.5 hover:border-brand-primary dark:hover:border-brand-secondary hover:shadow-sm transition-all duration-200"
                    >
                      {/* Section number badge */}
                      <div className="flex-shrink-0 w-10 h-10 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-lg flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-200">
                        <span className="text-brand-primary group-hover:text-white font-black text-sm transition-colors duration-200">
                          {section.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors leading-snug">
                            {section.title}
                          </h4>
                          {section.priority === "required" && (
                            <span className="text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-full px-2 py-0.5 leading-none">
                              OSHA Required
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed line-clamp-2">
                          {section.summary}
                        </p>
                        {section.oshaRef && (
                          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1 font-mono">
                            {section.oshaRef}
                          </p>
                        )}
                      </div>

                      {/* Meta + download */}
                      <div className="flex-shrink-0 flex items-center gap-2">
                        {section.pages && (
                          <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-500">
                            {section.pages}p
                          </span>
                        )}
                        <a
                          href={`/docs/sections/${section.number}-${section.slug}.pdf`}
                          onClick={(e) => e.stopPropagation()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-brand-primary dark:text-brand-secondary hover:text-brand-primary-dark font-semibold transition-colors rounded-lg px-2.5 py-1.5 hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20"
                          title={`Download Section ${section.number} PDF`}
                        >
                          <MaterialIcon icon="download" size="sm" />
                          <span className="hidden sm:inline">PDF</span>
                        </a>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
