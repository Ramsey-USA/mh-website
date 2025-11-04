# 🔌 VS Code Extensions Guide for MH Construction Website

**Purpose:** Optimize development workflow, catch performance issues early, and maintain code quality.

**Status:** ✅ Configured & Ready
**Last Updated:** October 2, 2025

---

## 📦 Quick Install

When you open this workspace in VS Code, you'll see a notification:

> **"This workspace has extension recommendations"**

Click **"Install All"** to get all recommended extensions at once.

Or install manually via:

1. Press `Ctrl+Shift+X` (or `Cmd+Shift+X` on Mac)
2. Search for extension name
3. Click "Install"

---

## 🎯 Critical Extensions (Install First!)

### **1. Import Cost** (`wix.vscode-import-cost`)

**Why:** See bundle size impact immediately

**What it does:**

- Shows package size inline next to imports
- Helps avoid bloated bundles
- Critical for Next.js performance

**Example:**

````tsx
import { motion } from 'framer-motion'  // 📦 79.8KB (gzipped: 25.3KB)
import { useState } from 'react'        // 📦 0KB (already in bundle)
```text

**Usage:**

- Automatically displays size after imports
- Look for red warnings on large packages
- Consider code splitting for packages > 50KB

**Benefits for our site:**

- Identify heavy Material Icons imports
- Monitor framer-motion bundle impact
- Keep bundle size under 200KB

---

### **2. Error Lens** (`usernamehw.errorlens`)

**Why:** See errors instantly without hovering

**What it does:**

- Displays TypeScript errors inline
- Shows ESLint warnings immediately
- Faster debugging workflow

**Example:**

```tsx
// Before: Have to hover to see error
const name: string = 123;

// After: Error shown inline ❌
const name: string = 123; // Type 'number' is not assignable to type 'string'
```text

**Usage:**

- Errors appear as you type
- No need to hover or check Problems panel
- Red = Error, Yellow = Warning, Blue = Info

**Benefits for our site:**

- Catch TypeScript issues faster
- See prop type mismatches immediately
- Fix errors before testing

---

### **3. Pretty TypeScript Errors** (`yoavbls.pretty-ts-errors`)

**Why:** Make complex TypeScript errors readable

**What it does:**

- Formats TypeScript errors with syntax highlighting
- Makes generic type errors understandable
- Essential for Next.js complex types

**Example:**

Before: Type 'Promise<{ name: string; age: number; }>' is not assignable to type 'string'...

After: Clear formatted breakdown with highlighting showing:
├─ Expected: string
└─ Received: Promise<{ name: string; age: number }>

**Usage:**

- Automatically formats errors in Problems panel
- Click error for detailed explanation
- Especially helpful with Next.js async components

**Benefits for our site:**

- Understand Firebase type errors
- Debug Next.js route params
- Handle async data fetching issues

---

## 🎨 Tailwind CSS Enhancement

### **4. Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`)

**Why:** Essential for Tailwind development

**What it does:**

- Autocomplete for all Tailwind classes
- Validates class names
- Shows color previews
- Hover for generated CSS

**Example:**

```tsx
<div className="bg-| ">  // Auto-suggests: bg-red-500, bg-blue-600, etc.
```text

**Usage:**

- Type class prefix → see suggestions
- Hover over class → see actual CSS
- Ctrl+Space for all available classes
- Validates against your `tailwind.config.ts`

**Configuration (Already Set):**

```json
{
  "tailwind-sorter.autoSort": true,
  "tailwind-sorter.sortOnSave": true
}
```text

**Benefits for our site:**

- Use responsive classes correctly: `sm:`, `md:`, `lg:`
- Verify custom colors from theme
- Auto-sort classes: `flex flex-col gap-4`

---

## ⚛️ React/Next.js Development

### **5. ES7+ React Snippets** (`dsznajder.es7-react-js-snippets`)

**Why:** Build components 10x faster

**What it does:**

- Quick component scaffolding
- Common React patterns
- TypeScript support

**Common Snippets:**

| Snippet | Result |
|---------|--------|
| `rafce` | Arrow function component with export |
| `rfc` | Function component |
| `rfce` | Function component with export |
| `useState` | useState hook |
| `useEffect` | useEffect hook |
| `imr` | Import React |
| `imn` | Import next package |

**Example:**
Type `rafce` + Tab:

```tsx
import React from 'react'

const ComponentName = () => {
  return (
    <div>ComponentName</div>
  )
}

export default ComponentName
```text

**Usage:**

1. Create new `.tsx` file
2. Type `rafce`
3. Press `Tab`
4. Name gets auto-filled from filename
5. Start coding!

**Benefits for our site:**

- Quickly create new pages in `src/app/`
- Build components faster
- Consistent component structure

---

## 📊 Performance & Testing

### **6. Lighthouse** (`GoogleChrome.lighthouse`)

**Why:** Test performance directly in VS Code

**What it does:**

- Runs Lighthouse audits from editor
- Checks performance, accessibility, SEO
- No need to switch to browser

**Usage:**

1. Right-click any HTML/page file
2. Select "Lighthouse: Generate Report"
3. View results in VS Code
4. Get actionable recommendations

**Configuration:**

```json
// .vscode/settings.json (add this)
{
  "lighthouse.url": "http://localhost:3000"
}
```text

**Targets for our site:**

- ✅ Performance: > 90
- ✅ Accessibility: > 95
- ✅ Best Practices: > 95
- ✅ SEO: > 95

**Benefits:**

- Test before deploying
- Verify responsive design standards
- Check Core Web Vitals
- Validate accessibility (48px touch targets)

---

## 🔥 Firebase Development

### **7. Firebase Explorer** (`jsayol.firebase-explorer`)

**Why:** Manage Firebase without leaving VS Code

**What it does:**

- Browse Firestore collections
- View/edit documents
- Check Firebase rules
- Monitor authentication

**Setup:**

1. Install extension
2. Click Firebase icon in sidebar
3. Sign in with Google
4. Select your project

**Features:**

- 📂 Browse Firestore collections
- ✏️ Edit documents inline
- 🔐 View security rules
- 👥 Check authenticated users
- 📊 See database usage

**Usage for our site:**

- Check project submissions
- View contact form entries
- Verify testimonials data
- Debug Firebase queries
- Test security rules

**Benefits:**

- No need to open Firebase Console
- Faster debugging
- Test queries directly
- View real-time updates

---

## 🖼️ Image Optimization

### **8. Image Optimizer** (`LaurentTreguier.vscode-image-optimizer`)

**Why:** Critical for web performance

**What it does:**

- Compresses PNG, JPG, GIF, SVG
- Reduces file size up to 70%
- Maintains visual quality
- One-click optimization

**Usage:**

1. Right-click any image in Explorer
2. Select "Optimize Image"
3. Image is compressed in-place
4. Check file size reduction

**Before using, check:**

- Original size
- Image dimensions
- Current format

**Recommended sizes for our site:**

| Image Type | Max Width | Max Size | Format |
|------------|-----------|----------|--------|
| Hero images | 1920px | 200KB | WebP/JPG |
| Blog thumbnails | 800px | 100KB | WebP/JPG |
| Team photos | 600px | 80KB | WebP/JPG |
| Icons | 512px | 20KB | PNG/SVG |
| Project images | 1200px | 150KB | WebP/JPG |

**Benefits for our site:**

- Faster mobile loading
- Lower bandwidth usage
- Better Lighthouse scores
- Improved Core Web Vitals

**Best Practice:**
Always use Next.js `<Image>` component:

```tsx
import Image from 'next/image'

<Image
  src="/images/hero.jpg"
  width={1920}
  height={1080}
  alt="Hero image"
  priority
/>
```text

---

## ♿ Accessibility

### **9. axe Accessibility Linter** (`deque-systems.vscode-axe-linter`)

**Why:** Catch a11y issues before deployment

**What it does:**

- Scans HTML/JSX for accessibility issues
- Checks ARIA attributes
- Validates semantic HTML
- Tests color contrast

**Common Issues Detected:**

- ❌ Missing alt text on images
- ❌ Buttons without accessible labels
- ❌ Insufficient color contrast
- ❌ Missing form labels
- ❌ Incorrect heading hierarchy

**Example:**

```tsx
// ❌ Error: Button has no accessible name
<button onClick={handleClick}>
  <span className="icon-only"></span>
</button>

// ✅ Fixed
<button onClick={handleClick} aria-label="Submit form">
  <span className="icon-only"></span>
</button>
```text

**Critical for our site:**

- Verify 48px touch targets (responsive standards)
- Check color contrast in dark mode
- Validate form accessibility
- Test screen reader support

**Usage:**

- Errors show in Problems panel
- Inline warnings in code
- Hover for fix suggestions
- Auto-fix available for some issues

**WCAG Compliance:**

- Level A: Must have
- Level AA: Should have (our target)
- Level AAA: Nice to have

---

## 🔧 Code Quality (Already Configured)

### **10. Prettier** (`esbenp.prettier-vscode`)

✅ **Status:** Already configured in `.vscode/settings.json`

**What it does:**

- Auto-formats code on save
- Consistent code style
- Works with TypeScript, CSS, Markdown

**Current Config:**

```json
{
  "editor.formatOnSave": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```text

---

### **11. ESLint** (`dbaeumer.vscode-eslint`)

✅ **Status:** Already configured

**What it does:**

- Lints JavaScript/TypeScript
- Auto-fixes common issues
- Enforces Next.js best practices

**Current Config:**

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```text

---

### **12. Markdown Linter** (`DavidAnson.vscode-markdownlint`)

✅ **Status:** Already configured

**What it does:**

- Validates Markdown syntax
- Ensures consistent documentation
- Auto-fixes formatting

**Current Config:**

```json
{
  "[markdown]": {
    "editor.defaultFormatter": "DavidAnson.vscode-markdownlint"
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.markdownlint": "explicit"
  }
}
```text

---

## 🌳 Git Enhancement

### **13. GitLens** (`eamodio.gitlens`)

**Why:** Supercharge Git workflow

**What it does:**

- Shows who changed each line
- View commit history inline
- Compare branches
- Search commits
- Blame annotations

**Key Features:**

**1. Line Blame:**

```tsx
const HomePage = () => {  // John Doe, 2 days ago: Added responsive layout
```text

**2. File History:**

- Right-click file → "Open File History"
- See all changes to this file
- Compare any two versions

**3. Commit Search:**

- Search by author, message, or date
- Find when feature was added
- Track bug introduction

**Usage for our site:**

- See who updated responsive standards
- Track service card changes
- Find when Firebase was configured
- Review documentation updates

**Benefits:**

- Faster code review
- Understand code history
- Find bug origins
- Team collaboration

---

## 🎯 Alternative: Tailwind Class Sorting

### **14. Headwind** (`heybourn.headwind`)

**Why:** Alternative to tailwind-sorter

**What it does:**

- Sorts Tailwind classes
- Customizable order
- Works with Prettier

**Current Setup:**
You already have `tailwind-sorter` configured. Choose ONE:

#### Option A: Keep tailwind-sorter (Current)

```json
{
  "tailwind-sorter.autoSort": true,
  "tailwind-sorter.sortOnSave": true
}

```json
{
  "headwind.runOnSave": true
}
```text

**Recommendation:** Keep current `tailwind-sorter` unless you have issues.

---

## 📋 Installation Checklist

Use this checklist to verify all extensions are installed:

### **Critical (Install First)**

- [ ] Import Cost - See bundle sizes
- [ ] Error Lens - Inline error display
- [ ] Pretty TypeScript Errors - Readable errors
- [ ] Tailwind CSS IntelliSense - Class autocomplete
- [ ] ES7+ React Snippets - Fast component creation

### **Performance & Testing**

- [ ] Lighthouse - Performance audits
- [ ] Image Optimizer - Compress images

### **Development Tools**

- [ ] Firebase Explorer - Manage Firestore
- [ ] axe Accessibility Linter - A11y checking
- [ ] GitLens - Git enhancement

### **Already Configured**

- [x] Prettier - Code formatting
- [x] ESLint - Code linting
- [x] Markdown Linter - Doc formatting

---

## ⚙️ Post-Installation Configuration

### **1. Import Cost Settings**

Add to `.vscode/settings.json`:

```json
{
  "importCost.largePackageSize": 50,
  "importCost.mediumPackageSize": 20,
  "importCost.smallPackageSize": 10,
  "importCost.showCalculatingDecoration": true
}
```text

### **2. Error Lens Settings**

Add to `.vscode/settings.json`:

```json
{
  "errorLens.enabledDiagnosticLevels": [
    "error",
    "warning"
  ],
  "errorLens.excludeBySource": [
    "cSpell"
  ]
}
```text

### **3. Lighthouse Settings**

Add to `.vscode/settings.json`:

```json
{
  "lighthouse.url": "http://localhost:3000",
  "lighthouse.categories": [
    "performance",
    "accessibility",
    "best-practices",
    "seo"
  ]
}
```text

### **4. GitLens Settings**

GitLens works great out-of-the-box, but you can customize:

```json
{
  "gitlens.currentLine.enabled": true,
  "gitlens.hovers.currentLine.over": "line",
  "gitlens.codeLens.enabled": true
}
```text

---

## 🚀 Quick Start Workflow

### **New Component Development**

1. **Create file:** `src/components/NewComponent.tsx`
2. **Scaffold:** Type `rafce` + Tab
3. **Code:** IntelliSense suggests Tailwind classes
4. **Import:** Import Cost shows bundle impact
5. **Check:** Error Lens shows issues inline
6. **Format:** Prettier formats on save
7. **Test:** Lighthouse checks performance

### **Responsive Design Development**

1. **Use templates** from `page-layout-quick-start.md`
2. **Tailwind IntelliSense** suggests responsive classes
3. **Copy patterns:** `px-4 sm:px-6 lg:px-8`
4. **Test breakpoints:** Use Chrome DevTools
5. **Verify accessibility:** axe Linter checks touch targets
6. **Optimize images:** Right-click → Optimize Image

### **Firebase Development**

1. **Open Firebase Explorer** in sidebar
2. **Browse collections:** View data structure
3. **Test queries:** Debug in VS Code
4. **Edit documents:** Make quick changes
5. **Check rules:** Verify security
6. **Deploy:** Use terminal commands

---

## 📊 Performance Targets

With these extensions, maintain:

| Metric | Target | Tool |
|--------|--------|------|
| **Bundle Size** | < 200KB | Import Cost |
| **Lighthouse Performance** | > 90 | Lighthouse |
| **Lighthouse Accessibility** | > 95 | Lighthouse + axe |
| **TypeScript Errors** | 0 | Error Lens |
| **ESLint Warnings** | 0 | ESLint |
| **Image Sizes** | < 150KB | Image Optimizer |
| **Touch Targets** | ≥ 48px | axe Linter |

---

## 🔄 Extension Updates

Keep extensions updated for best performance:

1. Press `Ctrl+Shift+X` (Extensions)
2. Click "Update" icon (top right)
3. Update all outdated extensions
4. Reload VS Code if prompted

**Auto-update:** Enable in Settings

```json
{
  "extensions.autoUpdate": true
}
```text

---

## ❓ Troubleshooting

### **Issue: Import Cost not showing**

**Fix:**

1. Reload VS Code
2. Check Output → Import Cost
3. Ensure TypeScript server is running

### **Issue: Tailwind IntelliSense not working**

**Fix:**

1. Verify `tailwind.config.ts` exists
2. Check workspace has `tailwindcss` installed
3. Reload VS Code
4. Run: `npm install`

### **Issue: ESLint errors not showing**

**Fix:**

1. Check `.eslintrc` exists
2. Run: `npm install`
3. Open Command Palette → "ESLint: Restart ESLint Server"

### **Issue: Lighthouse not running**

**Fix:**

1. Start dev server: `npm run dev`
2. Check port 3000 is open
3. Update `lighthouse.url` in settings

---

## 🎯 Key Benefits Summary

| Extension | Primary Benefit | Time Saved |
|-----------|----------------|------------|
| **Import Cost** | Avoid bundle bloat | 30 min/week |
| **Error Lens** | Faster debugging | 1 hr/week |
| **Pretty TS Errors** | Understand errors | 30 min/week |
| **Tailwind IntelliSense** | Faster styling | 2 hr/week |
| **React Snippets** | Quick components | 1 hr/week |
| **Lighthouse** | Catch performance issues | 1 hr/week |
| **Firebase Explorer** | Debug Firebase | 30 min/week |
| **Image Optimizer** | Optimize images | 15 min/week |
| **axe Linter** | Fix accessibility | 30 min/week |
| **GitLens** | Understand changes | 30 min/week |

**Total Time Saved:** ~7.5 hours per week! 🎉

---

## 🔗 Related Documentation

- [Page Layout Standards](../technical/design-system/layout/page-layout-standards.md)
- [Design System](../technical/design-system/design-system.md)
- [Firebase Setup](../development/firebase-setup.md)

---

## 📞 Support

**Extension Issues:**

- Check extension documentation
- GitHub issues for each extension
- VS Code marketplace reviews

**Development Team:**

- Check project documentation
- Ask in team chat
- Review related guides

---

**Version:** 1.0
**Last Updated:** October 2, 2025
**Maintained By:** MH Construction Development Team
**Status:** ✅ Active & Recommended
````
