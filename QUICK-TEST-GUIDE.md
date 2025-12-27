# Quick Testing Guide - Mobile Performance

## Test the Optimizations

### 1. Build & Start Production Server

```bash
cd /workspaces/mh-website
npm run build
npm run start
```

### 2. Run Lighthouse Mobile Audit

**Option A: Chrome DevTools**

1. Open <http://localhost:3000> in Chrome
2. Open DevTools (F12)
3. Click "Lighthouse" tab
4. Select:
   - ✅ Performance
   - Device: Mobile
   - Throttling: Applied (Simulated throttling)
5. Click "Analyze page load"

**Option B: CLI (if available)**

```bash
lighthouse http://localhost:3000 --only-categories=performance --form-factor=mobile --throttling-method=simulate --output=html --output-path=./lighthouse-mobile-report.html
```

### 3. Check Performance Metrics in Console

Open browser console and look for:

```
[Performance] Device Info: {
  mobile: true,
  slowConnection: false,
  screenWidth: 375,
  devicePixelRatio: 2
}
[Mobile LCP] 1847 ms  ← Should be < 2500ms
[Mobile FID] 43 ms    ← Should be < 100ms
[Mobile CLS] 0.067    ← Should be < 0.1
```

## Expected Results

### Performance Score Target: 75-85

**Core Web Vitals:**

- ✅ LCP < 2.5s (Largest Contentful Paint)
- ✅ FID < 100ms (First Input Delay)
- ✅ CLS < 0.1 (Cumulative Layout Shift)

**Bundle Size:**

- Initial JS: ~261KB (down from ~450KB)
- Lazy-loaded sections reduce initial payload

## What Changed?

### You'll Notice

1. **Faster initial page load** - Less JavaScript to parse
2. **Sections load progressively** - Below-fold content loads after scroll
3. **Smoother animations on mobile** - Reduced duration, adaptive
4. **No layout shifts** - Proper spacing reserved for dynamic content

### Look For

- ✅ Hero section loads immediately
- ✅ Core values visible quickly
- ✅ Testimonials/stats load when scrolled into view
- ✅ Loading skeletons during lazy load (gray pulse animation)
- ✅ Performance console logs (if in dev mode)

## Troubleshooting

### If Performance Score Still Low

**LCP Issues (> 2.5s)?**

- Check network tab for large images
- Verify hero image is preloaded
- Consider smaller hero image file size

**High Total Blocking Time (> 300ms)?**

- Check for long JavaScript tasks in Performance tab
- May need to lazy-load more components
- Consider removing heavy dependencies

**Layout Shift (CLS > 0.1)?**

- Add explicit dimensions to all images
- Check for dynamic content insertion
- Verify loading skeletons match final content size

### Compare Before/After

Run Lighthouse on both localhost:3000 (with changes) and production (without changes) to see improvement.

## Need More Optimization?

See detailed guide:

- `/workspaces/mh-website/docs/performance/MOBILE-PERFORMANCE-IMPROVEMENTS.md`
- `/workspaces/mh-website/MOBILE-OPTIMIZATION-SUMMARY.md`

## Quick Rollback

If issues arise:

```bash
git log --oneline | head -5  # Find commit hash
git revert <commit-hash>
```

---

**Ready to test!** Start the server and run Lighthouse. 🚀
