# SEO Quick Reference Card

**🚀 Your website now has ULTIMATE SEO optimization + AI Search (GEO)!**

**⭐ NEW (Dec 27, 2025):** Dual-label military/construction titles across all pages!

**Related Documentation:**

- [Browser Titles Inventory](./docs/technical/browser-tab-titles-inventory.md) - Complete title system

---

## 🤖 AI Search Optimization (NEW - Nov 20, 2025)

**Files:**

- `public/robots.txt` - Allows AI crawlers (GPTBot, OAI-SearchBot, CCBot, Google-Extended)
- `public/llms.txt` - LLM-optimized content for accurate AI responses

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

---

### Check SEO Status

```bash
# Quick audit of all pages
npm run seo:audit

# Generate detailed report
npm run seo:report

# Before deploying
npm run build && npm run seo:audit
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
| Contact      | 0.9      | `/contact`, `/booking`      |
| Tools        | 0.85     | `/estimator`                |
| Emergency    | 0.85     | `/urgent`                   |
| Projects     | 0.8      | `/projects`                 |
| Partnerships | 0.75     | `/public-sector`, `/allies` |
| Team/About   | 0.7      | `/team`, `/about`           |
| Careers      | 0.7      | `/careers`                  |

---

## 🛠️ Commands Reference

```bash
# SEO Commands
npm run seo:audit          # Run full audit
npm run seo:check          # Quick check
npm run seo:report         # Generate report

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

---

## 🚨 Quick Troubleshooting

**Low SEO score?**
→ Check title length (30-60 chars)
→ Check description length (120-160 chars)
→ Run `npm run seo:audit` for details

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

**Last Updated:** December 26, 2025  
**System Version:** 2.0.0
