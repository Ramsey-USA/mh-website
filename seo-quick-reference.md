# SEO Quick Reference Card

**Current implementation:** Full GEO optimization — dual-label titles, city-priority service
targeting, canonical host standardization, media sitemap discovery, and named project content
embedded in location data, metadata keywords, and `LocalBusiness` schema.

**Related Documentation:**

- [Browser Titles Inventory](./docs/technical/browser-tab-titles-inventory.md) - Complete title system

---

## 🤖 AI Search Optimization (Updated - Mar 11, 2026)

**Files:**

- `public/robots.txt` - Allows AI crawlers and advertises canonical `https://www.mhc-gc.com` sitemap endpoints
- `public/llms.txt` - LLM-optimized content with city-priority service targeting context
- `src/app/sitemap.ts` - Includes page URLs plus all supported media assets from `public/images` and `public/videos`

**Supported AI Systems:**

- ChatGPT (OpenAI)
- Perplexity AI
- Claude (Anthropic)
- Google AI
- You.com

**Result:** When users ask AI assistants about MH Construction, they get accurate, up-to-date information.

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

Update `src/lib/data/locations.ts` with up to four fields per city:

- `servicePriorities` - top services to push in SEO + on-page content
- `nearbyAreas` - nearby locality cues for GEO and internal market expansion
- `recentProjects` - verified completed projects; each entry has `name`, `year?`, `category`,
  `description?`, and `coreValue?` (`Honesty | Integrity | Professionalism | Thoroughness`)
- `publicSectorHighlight` - set `true` to render a dedicated public-sector callout with a
  hard link to `/public-sector` (use for cities with verified government/public-safety work)

These values automatically propagate into:

- location metadata keywords (project name + category × city)
- location JSON-LD (`serviceType`, `knowsAbout`, **`hasOfferCatalog`**)
- location page hero/service CTA copy
- **"Recent Projects in [City]"** card section on every location page

**Project card format:** `Category badge · Year badge · Project name · Description · Core value badge`

**Adding a project:**

```typescript
// src/lib/data/locations.ts  →  kennewick.recentProjects
{
  name: "Tri-Cities Cancer Center Expansion",
  category: "Healthcare",
  description: "Specialized medical facility expansion...",
  coreValue: "Thoroughness",
}
```

---

### Check SEO Status

```bash
# Quick audit of all pages
node scripts/seo-audit.js

# Before deploying
npm run build && node scripts/seo-audit.js
```

---

## 📊 SEO Scoring

| Score  | Status       | What to Do               |
| ------ | ------------ | ------------------------ |
| 90-100 | 🟢 Excellent | Nothing! Keep it up      |
| 80-89  | 🟡 Good      | Minor tweaks recommended |
| 70-79  | 🟠 Fair      | Improvements needed      |
| 0-69   | 🔴 Poor      | Fix immediately          |

---

## ✅ SEO Best Practices (Auto-Enforced)

### Titles

- ✅ 50 characters (optimal)
- ⚠️ 30-60 range
- Format: `[Page Name] | MH Construction`

### Descriptions

- ✅ 150 characters (optimal)
- ⚠️ 120-160 range
- Include: keyword, location, CTA

### Keywords

- ✅ 7 keywords (optimal)
- ⚠️ 3-15 range
- Always include: location, veteran-owned, service

---

## 🎯 Page Categories (Auto-Detected)

| Type         | Priority | Examples                    |
| ------------ | -------- | --------------------------- |
| Homepage     | 1.0      | `/`                         |
| Services     | 0.9      | `/services`                 |
| Contact      | 0.9      | `/contact`                  |
| Projects     | 0.8      | `/projects`                 |
| Partnerships | 0.75     | `/public-sector`, `/allies` |
| Team/About   | 0.7      | `/team`, `/about`           |
| Careers      | 0.7      | `/careers`                  |

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

## 📈 Current Status

✅ **13 pages** - All active  
✅ **90-100 scores** - All pages optimized  
✅ **Auto-sitemap** - Updates automatically  
✅ **Smart defaults** - Page types detected  
✅ **Best practices** - Auto-enforced  
✅ **Media discovery** - Images/videos auto-added to sitemap  
✅ **GEO targeting** - City-priority service signals live
✅ **GEO-proof projects** - Verified completed-project data in schema + on-page cards

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

## 📚 Documentation

**Main Guide:** [`docs/technical/seo/seo-complete-guide.md`](./docs/technical/seo/seo-complete-guide.md)

**Quick Links:**

- [SEO Complete Guide](./docs/technical/seo/seo-complete-guide.md)

---

## 🎉 What This Gives You

✨ **Zero-maintenance sitemap** - Just add pages, system updates  
✨ **Automatic scoring** - Know your SEO health instantly  
✨ **Built-in validation** - Catch issues before deployment  
✨ **Smart defaults** - Best practices automatically applied  
✨ **Scale friendly** - Works with 10 pages or 1000

---

**💡 Remember:** The system works FOR you. Add pages naturally, audit regularly, deploy confidently!

**Last Updated:** March 11, 2026  
**System Version:** 2.1.0
