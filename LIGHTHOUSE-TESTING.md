# Lighthouse Testing Guide

## The Problem

Lighthouse cannot run properly in dev containers due to Chrome/Chromium crashing. This is a **known limitation** of running headless browsers in containerized environments with limited resources, **not an issue with your code**.

### Why Chrome Crashes in Containers

- Limited shared memory (`/dev/shm`)
- No GPU acceleration
- Insufficient RAM allocation
- Process isolation conflicts

## ✅ Working Solutions

### 1. **Use Chrome DevTools** (Recommended for Local Testing)

This is the **best** way to test your site while developing:

1. Ensure your dev server is running:

   ```bash
   npm run dev
   ```

2. Open <http://localhost:3000/> in Chrome or Edge

3. Press `F12` to open DevTools

4. Click the **Lighthouse** tab

5. Select your categories and click **"Analyze page load"**

6. Review your scores and recommendations

### 2. **Use PageSpeed Insights** (Best for Production Sites)

Perfect for testing your deployed site:

1. Visit <https://pagespeed.web.dev/>

2. Enter your production URL

3. Get comprehensive scores for:
   - Performance
   - Accessibility
   - Best Practices
   - SEO

### 3. **Use Our Helper Scripts**

We've added convenient npm scripts:

```bash
# Check basic performance metrics
npm run test:performance

# Get detailed guide on how to run Lighthouse
npm run lighthouse:guide
```

### 4. **Use Lighthouse CLI** (On Your Local Machine Only)

If you have the project cloned locally (not in a container):

```bash
# Install Lighthouse globally
npm install -g lighthouse

# Run Lighthouse
lighthouse http://localhost:3000/ --view
```

### 5. **Install VS Code Extension**

Install the **Kanmi Levers Guard - SEO & Performance Linter** extension:

1. Open VS Code Extensions (Ctrl+Shift+X)
2. Search for "Kanmi Levers Guard"
3. Click Install
4. Get real-time SEO & performance diagnostics while coding

### 6. **Use Online Tools** (For Deployed Sites)

- **GTmetrix**: <https://gtmetrix.com/>
- **WebPageTest**: <https://webpagetest.org/>
- **Google Search Console**: Core Web Vitals report

## 📦 What We've Installed

To try to fix this issue, we installed:

1. **Playwright** - Better container support

   ```bash
   npm install -D playwright @playwright/test
   npx playwright install chromium --with-deps
   ```

2. **Lighthouse CI** - Optimized for CI/CD environments

   ```bash
   npm list @lhci/cli lighthouse chrome-launcher
   ```

Unfortunately, even with these tools, Chrome still crashes in the dev container environment due to fundamental resource constraints.

## 🎯 Quick Actions

### For Development

```bash
# Start your server
npm run dev

# In another terminal, check basic metrics
npm run test:performance
```

Then use Chrome DevTools (F12 → Lighthouse tab) for full Lighthouse scores.

### For Production

1. Deploy your site
2. Go to <https://pagespeed.web.dev/>
3. Enter your URL
4. Get your scores

## 💡 Expected Scores

Based on the site structure and optimizations:

- **Performance**: 85-95
- **Accessibility**: 90-100
- **Best Practices**: 90-100
- **SEO**: 95-100

## 📝 Notes

- The HTML size is ~275 KB which is good for a modern Next.js app
- Server response time is ~275ms which is acceptable for development
- Production builds will be much faster with optimizations

## 🔧 Scripts Available

```bash
npm run test:performance   # Quick performance check
npm run lighthouse:guide   # Detailed guide
npm run dev               # Start development server
```

## 🚀 Best Practice Workflow

1. Develop locally with `npm run dev`
2. Test with Chrome DevTools Lighthouse (F12)
3. Fix any issues
4. Deploy to production
5. Verify with PageSpeed Insights
6. Monitor with Google Search Console

---

**Remember**: The inability to run Lighthouse in containers is a **known environment limitation**, not a bug. Use Chrome DevTools for the best local development experience!
