# Troubleshooting Guide - MH Construction Website

**Last Updated**: November 10, 2025  
**Version**: 1.1.0  
**Purpose**: Quick fixes for common issues

---

## 🚨 Critical Issues

### Sections Capturing Scroll (Internal Scroll Containers)

**Symptoms**:

- While scrolling the main page, individual sections "capture" the scroll wheel
- Sections create their own internal scrollbars
- User must scroll out of a section before scrolling the rest of the page
- Home page works fine, but About/Services pages have this issue

**Root Cause**:

The `.container` class has `overflow-x: hidden` which creates a new stacking context and scroll
container, causing sections to capture scroll events.

**Solution**:

```tsx
// ❌ PROBLEM: Using .container class in section wrapper
<section id="values" className="bg-white dark:bg-gray-900 py-16 lg:py-24">
  <div className="mx-auto px-4 container">
    {/* content */}
  </div>
</section>

// ✅ FIX: Use max-w-7xl instead (matches home page pattern)
<section id="values" className="bg-white dark:bg-gray-900 py-16 lg:py-24">
  <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
    {/* content */}
  </div>
</section>
```

**Why This Works**:

- `max-w-7xl` constrains width without creating overflow context
- `relative` positioning allows absolute children to position correctly
- Responsive padding (`sm:px-6 lg:px-8`) ensures proper spacing at all breakpoints
- No `overflow-x: hidden` means no scroll container is created

**When to Apply**:

- ✅ All page sections (About, Services, Team, etc.)
- ✅ Any wrapper that contains multiple subsections
- ❌ Do NOT use in Hero sections (they need different treatment)
- ❌ Do NOT use in modals or fixed-position overlays

**Reference**: Home page components (CoreValuesSection, ServicesShowcase) use this pattern correctly.

---

### Content Not Appearing on Page

**Symptoms**:

- Page loads but content is blank/white
- Content appears briefly then disappears
- Content only shows on second page visit

**Diagnosis**:

````bash
# Check browser console for errors
# Look for: "Cannot read property 'FadeInWhenVisible' of undefined"
# Or: Animation/motion related errors
```text

**Solution 1: Animation Wrapper Issue**

```tsx
// ❌ PROBLEM: Critical content wrapped in animation
<FadeInWhenVisible>
  <h1>Page Title</h1>
  <p>Important content</p>
</FadeInWhenVisible>

// ✅ FIX: Remove animation from critical content
<div>
  <h1>Page Title</h1>
  <p>Important content</p>
</div>

// Optional: Add animation to supporting content only
<FadeInWhenVisible>
  <div className="features">...</div>
</FadeInWhenVisible>
```text

**Solution 2: Wrong Animation Import**

```tsx
// ❌ PROBLEM: Importing from deleted file
import { FadeInWhenVisible } from "@/components/animations/DynamicAnimations";

// ✅ FIX: Import from correct file
import { FadeInWhenVisible } from "@/components/animations/FramerMotionComponents";
```text

**Verification**:

```bash
npm run type-check  # Should pass
npm run dev         # Test in browser
```text

---

### Module Not Found Errors

**Symptoms**:

```text
Error: Cannot find module '@/components/animations/DynamicAnimations'
Error: Cannot find module '../../components/ui'
```text

**Solution 1: Update Import Path**

```tsx
// ❌ PROBLEM: Relative import
import { Button } from "../../components/ui";

// ✅ FIX: Absolute @/ import
import { Button } from "@/components/ui";
```text

**Solution 2: Deleted Module Reference**

```bash
# Find all references to deleted DynamicAnimations
grep -r "DynamicAnimations" src/

# Replace with FramerMotionComponents
find src/ -type f -name "*.tsx" -o -name "*.ts" | \
  xargs sed -i 's|DynamicAnimations|FramerMotionComponents|g'
```text

**Verification**:

```bash
npm run type-check  # Should show no module errors
```text

---

### ESLint Errors After Changes

**Symptom**:

```text
Error: '../../../components/ui' import is restricted
```text

**Solution**: Convert to `@/` imports

```bash
# Run the standardization script
python3 scripts/standardize-imports.py

# Or manually fix:
# Replace: from '../../../components/ui'
# With:    from '@/components/ui'
```text

**Verification**:

```bash
npm run lint  # Should pass with ✔ No ESLint warnings or errors
```text

---

## ⚠️ Build & Deployment Issues

### TypeScript Compilation Errors

**Symptoms**:

```text
error TS2307: Cannot find module '@/components/SomeComponent'
error TS2345: Type 'X' is not assignable to type 'Y'
```text

**Solution**: Check import paths and types

```bash
# Run type checking
npm run type-check

# Fix import paths
# Ensure @/ paths match actual file locations
```text

**Common Causes**:

1. File moved but imports not updated
1. Component renamed but exports not updated
1. Type definition mismatch

---

### Build Succeeds Locally But Fails in CI/CD

**Common Causes**:

1. **Case-sensitive imports** (macOS is case-insensitive, Linux is not)

   ```tsx
   // ❌ PROBLEM: Wrong case
   import { Button } from "@/components/UI/button";

   // ✅ FIX: Correct case
   import { Button } from "@/components/ui/button";
````

1. **Uncommitted files**

   ```bash
   # Check git status
   git status

   # Stage missing files
   git add src/components/NewComponent.tsx
   ```

1. **Missing dependencies**

   ```bash
   # Ensure package.json is committed
   git add package.json package-lock.json
   ```

---

## 🎨 Styling Issues

### Tailwind Classes Not Applied

**Symptoms**:

- Component appears unstyled
- Classes work in some files but not others

#### Solution 1: Check Class Names

```tsx
// ❌ PROBLEM: Typo in class name
<div className="flx items-center">  // 'flx' should be 'flex'

// ✅ FIX: Correct spelling
<div className="flex items-center">
```

#### Solution 2: Dynamic Classes

````tsx
// ❌ PROBLEM: Dynamic classes not in safelist
<div className={`text-${color}-500`}>  // Won't work!

// ✅ FIX: Use full class names
<div className={color === 'blue' ? 'text-blue-500' : 'text-gray-500'}>
```text

---

### Responsive Design Not Working

**Solution**: Add breakpoint prefixes

```tsx
// ❌ PROBLEM: No responsive classes
<div className="grid grid-cols-3 gap-4">

// ✅ FIX: Add responsive breakpoints
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```text

---

## 🔧 Development Environment Issues

### Hot Reload Not Working

**Solutions**:

```bash
# 1. Restart dev server
# Press Ctrl+C, then:
npm run dev

# 2. Clear Next.js cache
rm -rf .next
npm run dev

# 3. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```text

---

### TypeScript Errors in IDE But Build Succeeds

**Solution**: Restart TypeScript server

**VS Code**:

1. Cmd/Ctrl + Shift + P
1. Type "TypeScript: Restart TS Server"
1. Press Enter

**Or restart IDE entirely**

---

## 📦 Dependency Issues

### npm install Fails

**Solutions**:

```bash
# 1. Clear npm cache
npm cache clean --force

# 2. Remove lock file and node_modules
rm -rf node_modules package-lock.json

# 3. Fresh install
npm install

# 4. If still failing, check Node version
node --version  # Should be 18.x or higher
nvm install 18
nvm use 18
```text

---

### Peer Dependency Warnings

**Usually safe to ignore** unless breaking functionality.

```bash
# If causing issues, check package.json for version conflicts
# Update conflicting packages:
npm update package-name
```text

---

## 🐛 Runtime Errors

### Hydration Mismatch Warnings

**Symptoms**:

```text
Warning: Text content did not match. Server: "X" Client: "Y"
Warning: Expected server HTML to contain a matching <div>
```text

**Common Causes & Fixes**:

```tsx
// ❌ PROBLEM: Using Date.now() or Math.random()
<div>{Date.now()}</div>; // Different on server vs client

// ✅ FIX: Use useEffect for client-only rendering
const [timestamp, setTimestamp] = useState<number | null>(null);

useEffect(() => {
  setTimestamp(Date.now());
}, []);

return <div>{timestamp || "Loading..."}</div>;
```text

---

### Firebase/Auth Errors

**Symptom**:

```text
Error: Firebase app not initialized
Error: Auth requires a valid API key
```text

**Solution**: Check environment variables

```bash
# Verify .env.local exists and contains:
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
# etc.

# Restart dev server after adding .env.local
```text

---

## 🔍 Debugging Strategies

### Enable Verbose Logging

```tsx
// Add to component
useEffect(() => {
  console.log("Component mounted", { props, state });
  return () => console.log("Component unmounted");
}, []);
```text

### Check Network Requests

1. Open browser DevTools (F12)
1. Go to Network tab
1. Reload page
1. Check for failed requests (red)
1. Click failed request to see details

### React DevTools

1. Install React Developer Tools extension
1. Open browser DevTools
1. Check "Components" tab
1. Inspect component props and state

---

## 📋 Quick Command Reference

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Development server
npm run dev

# Production build
npm run build

# Production server
npm run start

# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run dev

# Check for outdated packages
npm outdated

# Update all packages
npm update
```text

---

## 🆘 When Nothing Else Works

### Nuclear Option: Complete Reset

```bash
# 1. Commit or stash your changes
git stash

# 2. Clean everything
rm -rf .next node_modules package-lock.json

# 3. Fresh install
npm install

# 4. Rebuild
npm run build

# 5. If build succeeds, restore your changes
git stash pop
```text

### Check for Known Issues

```bash
# Search for similar issues in the codebase
grep -r "error message" docs/

# Check git history for related fixes
git log --grep="related keyword"
```text

---

## 📚 Related Resources

- [Development Standards](./development-standards.md)
- [AI Development Guidelines](./ai-development-guidelines.md)
- [Consistency Master Plan](../project/consistency-master-plan.md)

---

## 📝 Changelog

### 2025-10-14 - v1.0.0

- Initial troubleshooting guide
- Common content visibility issues
- Import and build problems
- Development environment fixes

---

**Can't Find Your Issue?**
Document it here after solving it to help future developers!
````
