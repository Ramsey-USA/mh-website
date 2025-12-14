# Reactivating Pages Guide

**Category:** Development - Page Management  
**Last Updated:** December 14, 2025  
**Status:** ✅ Active

## 🧭 Quick Navigation

- [🗂️ Development Index](./development-index.md)
- [📄 New Page Development Guide](./new-page-development-guide.md)
- [🏠 Master Index](../master-index.md)

---

## 🎯 Overview

**Purpose:** Instructions for removing "under construction" wrappers and reactivating full page content

All pages (except the homepage) are currently wrapped with "under construction" notices while
maintaining 100% of the original code. This allows us to restore full functionality simply by
changing a feature flag.

## Quick Reactivation Process

### Single Page Reactivation

To reactivate any individual page:

1. Open the page file (e.g., `/src/app/careers/page.tsx`)
2. Find the feature flag at the top of the component:

   ```typescript
   const SHOW_UNDER_CONSTRUCTION = true;
   ```

3. Change it to:

   ```typescript
   const SHOW_UNDER_CONSTRUCTION = false;
   ```

4. Save the file
5. Test the page in your browser

### Reactivate All Pages at Once

Use this bash command to reactivate all pages simultaneously:

```bash
cd /workspaces/mh-website

# Replace true with false in all page files
find src/app -name "page.tsx" -o -name "*PageClient.tsx" | xargs sed -i 's/const SHOW_UNDER_CONSTRUCTION = true;/const SHOW_UNDER_CONSTRUCTION = false;/g'
```

**Verify after running:**

```bash
# Check which pages are still under construction
grep -r "SHOW_UNDER_CONSTRUCTION = true" src/app/
```

## Pages with Under Construction Wrappers

### Client Components (Standard Pattern)

These pages use the standard feature flag pattern with hooks called before the conditional:

1. **Services** - `/src/app/services/page.tsx`
   - Description: Service offerings and capabilities
   - All service cards and details preserved

2. **Contact** - `/src/app/contact/ContactPageClient.tsx`
   - Description: Contact form and information
   - Form state management preserved

3. **Team** - `/src/app/team/page.tsx`
   - Description: Team member profiles
   - All team data and groupByDepartment logic preserved

4. **Careers** - `/src/app/careers/page.tsx`
   - Description: Job opportunities and benefits
   - Application modal and form preserved
   - **Note:** Hooks called BEFORE conditional return

5. **Projects** - `/src/app/projects/page.tsx`
   - Description: Portfolio showcase
   - Search, filtering, and grid sections preserved
   - **Note:** useProjectsSearch hook called BEFORE conditional return

6. **Booking** - `/src/app/booking/page.tsx`
   - Description: Consultation booking system
   - Multi-step workflow preserved
   - Calendar and form logic intact
   - **Note:** Multiple hooks called BEFORE conditional return

7. **Estimator** - `/src/app/estimator/page.tsx`
   - Description: AI budget estimation tool
   - Dynamic imports preserved

8. **Government** - `/src/app/government/page.tsx`
   - Description: Government contracting info
   - Grant support services preserved

9. **Trade Partners** - `/src/app/trade-partners/page.tsx`
   - Description: Partnership opportunities
   - Partner categories preserved
   - **Note:** Unused state variables prefixed with underscore

### Server Components (Metadata Pattern)

These pages have metadata exports and use server components:

1. **Veterans** - `/src/app/veterans/page.tsx`
   - Description: Veterans services
   - Metadata export preserved

2. **Urgent** - `/src/app/urgent/page.tsx`
   - Description: Emergency construction support
   - Metadata export preserved

3. **3D Explorer** - `/src/app/3d-explorer/page.tsx`
   - Description: Interactive 3D visualization
   - Original under development content preserved

### Partially Updated

1. **About** - `/src/app/about/page.tsx`
   - **Status:** Only partially updated
   - **Action Required:** Complete the under construction implementation
   - May need attention before reactivation

## File Structure Pattern

### Standard Client Component Pattern

```typescript
"use client";

// imports...
import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = true;

export default function PageName() {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const [state, setState] = useState(...);
  // ... other hooks

  // Show under construction notice while preserving all content below
  if (SHOW_UNDER_CONSTRUCTION) {
    return (
      <UnderConstruction
        pageName="Page Name"
        description="Description of why page is under construction"
        estimatedCompletion="December 2025"
      />
    );
  }

  // Original page content preserved below - will be shown when flag is set to false
  return (
    // ... full page JSX
  );
}
```

### Server Component Pattern (with Metadata)

```typescript
import { UnderConstruction } from "@/components/layout/UnderConstruction";

// Feature flag - set to false to show full page content
const SHOW_UNDER_CONSTRUCTION = true;

// Metadata export MUST stay at top level
export const metadata = {
  // ... metadata
};

export default function PageName() {
  if (SHOW_UNDER_CONSTRUCTION) {
    return <UnderConstruction ... />;
  }

  return (
    // ... full page JSX
  );
}
```

## Important React Hooks Rules

**CRITICAL:** React hooks MUST be called in the same order on every render. This means:

✅ **CORRECT:** Call all hooks BEFORE any conditional returns

```typescript
export default function MyPage() {
  const [state, setState] = useState(false);  // ✅ Called first
  const data = useCustomHook();               // ✅ Called second

  if (SHOW_UNDER_CONSTRUCTION) {
    return <UnderConstruction />;
  }

  return <div>...</div>;
}
```

❌ **INCORRECT:** Calling hooks AFTER conditional return

```typescript
export default function MyPage() {
  if (SHOW_UNDER_CONSTRUCTION) {
    return <UnderConstruction />;
  }

  const [state, setState] = useState(false);  // ❌ Never reached when flag is true
  return <div>...</div>;
}
```

## Testing After Reactivation

### 1. Individual Page Testing Checklist

- [ ] Page renders without errors
- [ ] All sections display correctly
- [ ] Interactive elements work (buttons, forms, modals)
- [ ] Navigation works properly
- [ ] Responsive design works on mobile
- [ ] No console errors
- [ ] Data loads correctly
- [ ] Forms submit successfully

### 2. Build Testing

After reactivating pages, always run a build test:

```bash
npm run build
```

This will catch:

- TypeScript errors
- React hooks violations
- Import issues
- Linting problems

### 3. Browser Testing

Start development server:

```bash
npm run dev
```

Visit: <http://localhost:3000>

Test each reactivated page thoroughly.

## Troubleshooting Common Issues

### Issue: "React Hook is called conditionally"

**Cause:** Hooks are being called after an early return

**Fix:** Move ALL hook calls (useState, useEffect, custom hooks) to the top of the component,
before the `if (SHOW_UNDER_CONSTRUCTION)` check.

**Example Fix:**

```typescript
// BEFORE (broken):
export default function MyPage() {
  if (SHOW_UNDER_CONSTRUCTION) return <UnderConstruction />;
  const [state, setState] = useState(false);  // ❌ Conditional hook call
}

// AFTER (fixed):
export default function MyPage() {
  const [state, setState] = useState(false);  // ✅ Always called
  if (SHOW_UNDER_CONSTRUCTION) return <UnderConstruction />;
}
```

### Issue: "Module not found" errors

**Cause:** Import paths may have changed or components moved

**Fix:**

1. Verify the import path is correct
2. Check if the component file exists
3. Update imports if files were restructured

### Issue: Build warnings about unused variables

**Cause:** Variables are declared but only used in the hidden code section

**Fix:** Prefix unused variables with underscore:

```typescript
const [_expandedCategory, _setExpandedCategory] = useState(null);
```

### Issue: Page shows blank or partially rendered

**Cause:** Component may have errors in preserved code

**Fix:**

1. Check browser console for errors
2. Review the component's JSX structure
3. Verify all required props are passed
4. Check for missing dependencies

## Homepage Special Case

**The homepage is NOT under construction.**

The homepage (`/src/app/page.tsx`) has been updated with:

- Video removed from hero section
- Transparency & Excellence section added
- Message about website optimization included

**Do not** change the homepage unless specifically requested.

## Component Reference

### UnderConstruction Component

Located: `/src/components/layout/UnderConstruction.tsx`

**Props:**

```typescript
interface UnderConstructionProps {
  pageName: string; // Required: Display name of the page
  description?: string; // Optional: Why page is under construction
  showContactCTA?: boolean; // Optional: Show contact buttons (default: true)
  estimatedCompletion?: string; // Optional: When page will be ready
}
```

**Usage:**

```typescript
<UnderConstruction
  pageName="Services"
  description="We're enhancing our service information for complete accuracy."
  estimatedCompletion="December 2025"
/>
```

## Git Workflow for Reactivation

### Reactivating a Single Page

```bash
# Create a feature branch
git checkout -b reactivate-careers-page

# Make the change (set flag to false)
# Edit src/app/careers/page.tsx

# Test locally
npm run build
npm run dev

# Commit the change
git add src/app/careers/page.tsx
git commit -m "Reactivate careers page - ready for production"

# Push and create PR
git push origin reactivate-careers-page
```

### Reactivating All Pages

```bash
# Create a feature branch
git checkout -b reactivate-all-pages

# Run the bulk update command
find src/app -name "page.tsx" -o -name "*PageClient.tsx" | xargs sed -i 's/const SHOW_UNDER_CONSTRUCTION = true;/const SHOW_UNDER_CONSTRUCTION = false;/g'

# Test thoroughly
npm run build
npm run dev

# Review all changes
git diff

# Commit all changes
git add src/app/
git commit -m "Reactivate all pages - site ready for full launch"

# Push and create PR
git push origin reactivate-all-pages
```

## Pre-Launch Checklist

Before reactivating pages for production:

- [ ] All content verified for 100% accuracy (Jeremy's requirement)
- [ ] Photos are authentic and properly attributed
- [ ] Client testimonials are verified and approved
- [ ] Team information is current and correct
- [ ] Service descriptions are accurate
- [ ] Pricing/estimates are up to date
- [ ] Contact information is correct
- [ ] All links work properly
- [ ] Mobile responsive design tested
- [ ] Build passes without errors
- [ ] No console errors in browser
- [ ] SEO metadata is complete
- [ ] Accessibility tested
- [ ] Performance optimized

## Support Resources

### Documentation

- Main Index: `/docs/master-index.md`
- Component Docs: `/docs/components/`
- Development Guide: `/docs/development/`

### Key Files

- Under Construction Component: `/src/components/layout/UnderConstruction.tsx`
- Homepage: `/src/app/page.tsx`
- Navigation Config: `/src/components/navigation/navigationConfigs.ts`

### Build Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run linting
npm test            # Run tests
```

## Notes

- **Original code is 100% preserved** - Nothing was deleted, only wrapped
- **Feature flag approach** - Easy toggle between under construction and live
- **React Hooks compliance** - All hooks called before conditionals
- **Maintains build compatibility** - Site builds successfully with all pages wrapped
- **Transparency messaging** - Follows Group 1 brand guidelines
- **Jeremy's requirement met** - Can perfect each page individually before reactivating

---

**Last Updated:** December 14, 2025  
**Maintained By:** Development Team  
**Status:** All pages wrapped and ready for individual reactivation
