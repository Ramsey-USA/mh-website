# SEO Quick Reference Card

**Category:** Technical - SEO Quick Reference  
**Last Updated:** April 17, 2026  
**Status:** ✅ Active - Quick Action Card
**Canonical Source:** [docs/technical/seo/seo-complete-guide.md](./docs/technical/seo/seo-complete-guide.md)
**Consolidation Rule:** Keep this file as a short action card; place deep implementation details in the complete guide.

**Current implementation:** GEO optimization is active across titles, location data, schema, and sitemap media discovery.

**Related Documentation:**

- [Browser Titles Inventory](./docs/technical/browser-tab-titles-inventory.md) - Complete title system

---

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

3. **Done!** The system handles everything else automatically.

### GEO Updates by City

Update `src/lib/data/locations.ts` and use these fields:

- `servicePriorities`
- `nearbyAreas`
- `recentProjects`
- `publicSectorHighlight`

For field definitions and full examples, use the canonical guide:
[docs/technical/seo/seo-complete-guide.md](./docs/technical/seo/seo-complete-guide.md).

---

### Check SEO Status

```bash
# Quick audit of all pages
node scripts/seo-audit.js

# Before deploying
npm run build && node scripts/seo-audit.js
```

---

## ✅ SEO Best Practices (Auto-Enforced)

- Title: keep 30-60 chars, format `[Page Name] | MH Construction`
- Description: keep 120-160 chars with keyword + location + CTA
- Keywords: target 3-15 relevant terms
- Keep sitemap entries aligned with active routes
- Re-run `node scripts/seo-audit.js` after SEO-related changes

---

## 🛠️ Commands Reference

```bash
# SEO Commands
node scripts/seo-audit.js     # Run full audit + generate report

# Build & Test
npm run build              # Production build
npm run dev                # Development mode

# Quality Checks
npm run lint               # Lint code
npm run type-check         # TypeScript check
```

---

## 🚨 Quick Troubleshooting

**Low SEO score?**
→ Check title length (30-60 chars)
→ Check description length (120-160 chars)
→ Run `node scripts/seo-audit.js` for details

**Page not in sitemap?**
→ Add to ACTIVE_PAGES in `src/app/sitemap.ts`
→ One line is all you need!

**Build failing?**
→ Run `npm run type-check`
→ Fix any TypeScript errors

---

## 📚 Canonical Docs

- [SEO Complete Guide](./docs/technical/seo/seo-complete-guide.md)
- [Browser Titles Inventory](./docs/technical/browser-tab-titles-inventory.md)
