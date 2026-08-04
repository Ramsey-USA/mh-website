# SEO Quick Reference Card

**Category:** Technical - SEO Quick Reference  
**Last Updated:** July 31, 2026  
**Status:** ✅ Active - Quick Action Card
**Canonical Source:** [docs/technical/seo/seo-complete-guide.md](../technical/seo/seo-complete-guide.md)
**Consolidation Rule:** Keep this file as a short action card; place deep implementation details in the complete guide.

**Current implementation:** GEO optimization is active across titles, location data, schema, and sitemap media discovery.

**Brand Congruency:** SEO naming, titles, descriptions, schema text, and route labels must stay construction-first, relationship-first, factual, and aligned with approved MH trust language.

**Related Documentation:**

- [Browser Titles Inventory](../archive/2026-08/browser-tab-titles-inventory.md) - Archived title system reference
- [Marketing Strategy Guide](./marketing-strategy-guide.md) - broader marketing operating model and channel alignment
- [Brand Constants](../branding/brand-constants.md) - canonical slogan, trust language, and company facts

---

## Purpose

Use this card for fast SEO checks when adding or updating a page. It is the short operational layer for the deeper standards in the complete SEO guide.

## ⚡ Quick Actions

### Adding a New Page?

1. **Create your page file:**

   ```bash
   mkdir -p src/app/new-page
   # Create your page.tsx
   ```

2. **Add ONE line to sitemap:**

   ```typescript
   // src/app/sitemap.ts - Add to ACTIVE_PAGES array
   { path: "/new-page", priority: 0.8, changeFreq: "monthly" as const },
   ```

3. **Done!** The system handles the rest of the baseline SEO wiring automatically.

### GEO Updates by City

Update `src/lib/data/locations.ts` and use these fields:

- `servicePriorities`
- `nearbyAreas`
- `recentProjects`
- `publicSectorHighlight`

For field definitions and full examples, use the canonical guide:
[docs/technical/seo/seo-complete-guide.md](../technical/seo/seo-complete-guide.md).

### Updating Titles or Meta?

1. Lead with clear construction terminology first.
2. Keep veteran-owned language secondary and factual.
3. Route all consultation CTAs to `/contact`.
4. Recheck title, description, and schema language against MH naming rules.

### Check SEO Status

```bash
# Quick audit of all pages
node scripts/seo-audit.js

# Before deploying
pnpm run build && node scripts/seo-audit.js
```

---

## ✅ SEO Best Practices (Auto-Enforced)

- Title: keep 30-60 chars, format `[Page Name] | MH Construction`
- Description: keep 120-160 chars with keyword + location + clear next step
- Keywords: target 3-15 relevant terms
- Trust/credential references: keep licensing and accreditation claims factual, plain-language, and aligned with the canonical values in `docs/branding/brand-constants.md`
- Keep sitemap entries aligned with active routes
- Re-run `node scripts/seo-audit.js` after SEO-related changes
- Keep CTAs human and direct: prefer `/contact`, not booking or automation language

## Branding Congruency

- Use relationship-first, factual language in all titles, descriptions, and schema fields.
- Lead with professional construction terminology first.
- Keep veteran-owned references accurate and consistent with the brand constants.
- Avoid slogan-heavy phrasing, militarized aliases, or unapproved naming variants.
- Preserve trust and accreditation language instead of compressing it into vague marketing copy.
- Prefer clear scope, accountable delivery, dependable follow-through, and trusted handoff language where supporting copy is needed.

## Fast SEO Review

Before shipping a page, confirm:

1. The title uses the right page name and stays within the preferred length.
2. The description is factual, local when relevant, and directs the reader to the right next step.
3. The page language matches MH brand and route naming conventions.
4. Sitemap, schema, and location data are updated if the route or city coverage changed.
5. `node scripts/seo-audit.js` passes cleanly enough for the touched page set.

---

## 🛠️ Commands Reference

```bash
# SEO Commands
node scripts/seo-audit.js     # Run full audit + generate report

# Build & Test
pnpm run build                # Production build
pnpm run dev                  # Development mode

# Quality Checks
pnpm run lint                 # Lint code
pnpm run type-check           # TypeScript check
```

---

## 🚨 Quick Troubleshooting

**Low SEO score?**
→ Check title length (30-60 chars)
→ Check description length and clarity (120-160 chars)
→ Confirm the copy is construction-first and not hypey
→ Run `node scripts/seo-audit.js` for details

**Page not in sitemap?**
→ Add to ACTIVE_PAGES in `src/app/sitemap.ts`
→ One line is all you need!

**Metadata feels off-brand?**
→ Compare against `docs/branding/brand-constants.md`
→ Check terminology order in `docs/branding/strategy/messaging.md`
→ Keep CTA language pointed at `/contact`

**Build failing?**
→ Run `pnpm run type-check`
→ Fix any TypeScript errors

---

## 📚 Canonical Docs

- [SEO Complete Guide](../technical/seo/seo-complete-guide.md)
- [Browser Titles Inventory](../archive/2026-08/browser-tab-titles-inventory.md)
- [Brand Constants](../branding/brand-constants.md)
- [Marketing Strategy Guide](./marketing-strategy-guide.md)
