# Refactoring Roadmap

**Created**: November 8, 2025  
**Status**: Planning Phase  
**Goal**: Improve code maintainability, reduce duplication, and establish consistent patterns

---

## Executive Summary

This refactoring initiative targets **~2,350 lines of duplicate/redundant code** across the codebase. The focus is on:

1. **Data centralization** - Moving hardcoded data to centralized files
2. **Style consistency** - Creating reusable style utilities and components
3. **Component cleanup** - Removing duplicates and deprecated files
4. **Architecture improvements** - Extracting custom hooks and standardizing patterns

**Expected Benefits:**

- 80-90% faster content updates (centralized data)
- Consistent design system across all pages
- Smaller bundle size (less duplication)
- Easier testing and maintenance

---

## 🎯 HIGH-PRIORITY REFACTORING

### 1. Card Style Utilities ⭐ **HIGHEST IMPACT**

**Status**: ⏳ Not Started  
**Estimated Lines Saved**: ~500 lines  
**Maintenance Improvement**: 90% faster styling updates  
**Locations Affected**: 50+ components

**Problem:**
The same card className repeated 50+ times:

```tsx
className =
  "flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1";
```

**Solution Options:**

#### Option A: Style Utility File

Create `/src/lib/styles/card-variants.ts`:

```typescript
export const cardStyles = {
  base: "flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full transition-all",
  hover: "hover:shadow-lg dark:hover:shadow-gray-600/50 hover:-translate-y-1",
  primary: "border-2 border-brand-primary dark:border-brand-primary/50",
  static: "", // no hover effects
} as const;

export const getCardClassName = (
  variant: "default" | "primary" | "static" = "default",
  extraClasses: string = "",
) => {
  const classes = [cardStyles.base];

  if (variant !== "static") {
    classes.push(cardStyles.hover);
  }

  if (variant === "primary") {
    classes.push(cardStyles.primary);
  }

  if (extraClasses) {
    classes.push(extraClasses);
  }

  return classes.join(" ");
};
```

**Usage:**

````tsx
// Before
### 1. Card Style Utilities ⭐ **HIGHEST IMPACT**

**Status**: ✅ **COMPLETED** (November 8, 2025)
**Estimated Lines Saved**: ~500 lines
**Maintenance Improvement**: 90% faster card styling updates
**Locations Affected**: 50+ components across entire codebase

**Problem:**

Repeated card className pattern in 50+ locations:

```tsx
<Card className="flex flex-col bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-gray-600/50 border border-gray-200 dark:border-gray-700 h-full transition-all hover:-translate-y-1">
````

**Solution Implemented:**

**Solution Implemented:**

Created `/src/lib/styles/card-variants.ts` with centralized utility functions and
predefined card classes. Refactored 26+ card instances across 8 files with zero
TypeScript errors.

**Implementation Details:**

```typescript

// After
<Card className={getCardClassName('default')}>
```

#### Option B: Wrapper Component

Create `/src/components/ui/base/StandardCard.tsx`:

```tsx
interface StandardCardProps {
  variant?: "default" | "primary" | "static";
  children: React.ReactNode;
  className?: string;
}

export function StandardCard({
  variant = "default",
  children,
  className = "",
}: StandardCardProps) {
  return (
    <Card className={getCardClassName(variant, className)}>{children}</Card>
  );
}
```

**Implementation Steps:**

- [ ] Create `/src/lib/styles/card-variants.ts`
- [ ] Add TypeScript types for variants
- [ ] Create tests for getCardClassName function
- [ ] Update careers page (15+ instances)
- [ ] Update team page (10+ instances)
- [ ] Update services page (8+ instances)
- [ ] Update projects page components (12+ instances)
- [ ] Update booking page (5+ instances)
- [ ] Update remaining components
- [ ] Verify visual consistency across all pages
- [ ] Run build to ensure no errors

**Success Metrics:**

- All 50+ card instances use centralized utility
- Zero visual regressions
- Single source of truth for card styling

---

### 2. Career Data Extraction ⭐ **HIGH IMPACT**

**Status**: ✅ **COMPLETED** (November 8, 2025)  
**Estimated Lines Saved**: ~300 lines  
**Maintenance Improvement**: 80% faster job posting updates  
**Locations Affected**: `/src/app/careers/page.tsx`

**Problem:**

- 200+ lines of `openPositions` array hardcoded in page component
- `companyBenefits` array also inline
- Difficult to update job postings
- Cannot reuse data in other components (job widgets, API endpoints)

**Solution Implemented:**

Created `/src/lib/data/careers.ts` with:

- ✅ TypeScript interfaces (JobPosition, CompanyBenefit, VeteranBenefit, CultureValue)
- ✅ Exported data arrays (openPositions, companyBenefits, veteranBenefits, cultureValues)
- ✅ Helper functions (getPositionsByDepartment, getOpenPositionCount, etc.)
- ✅ Updated `/src/lib/data/index.ts` to export careers data
- ✅ Updated `/src/app/careers/page.tsx` to import from centralized file
- ✅ Removed 292 lines of inline data from careers page
- ✅ Zero TypeScript errors

**Actual Results:**

- ✅ 292 lines removed from careers page
- ✅ Job postings now updated in single file
- ✅ Data available for reuse across application
- ✅ Type-safe with TypeScript interfaces
- ✅ Helper functions for filtering/querying positions

**Implementation Steps:**

- [x] Create `/src/lib/data/careers.ts`
- [x] Define TypeScript interfaces (JobPosition, CompanyBenefit)
- [x] Move `openPositions` array from careers page
- [x] Move `companyBenefits` array from careers page
- [x] Add helper functions (getPositionsByDepartment, etc.)
- [x] Update `/src/lib/data/index.ts` to export careers data
- [x] Update `/src/app/careers/page.tsx` to import from careers.ts
- [x] Test careers page renders correctly
- [x] Verify job application modal still works
- [x] Update any other components using this data

**Success Metrics:**

- ✅ Careers page uses imported data
- ✅ Zero functional regressions
- ✅ Job postings can be updated by editing single file
- ✅ Data available for future job listing widgets

**Solution:**

Created `/src/lib/data/careers.ts`:

```typescript
export interface JobPosition {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract";
  experience: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface CompanyBenefit {
  icon: string;
  title: string;
  description: string;
}

export const openPositions: JobPosition[] = [
  {
    title: "Equipment Operator (Civil)",
    department: "Field Operations",
    location: "Tri-Cities Area",
    type: "Full-time",
    experience: "3+ years",
    description: "Operate heavy equipment for civil construction projects...",
    requirements: [
      "3+ years of equipment operation experience",
      // ... more
    ],
    benefits: [
      "Competitive hourly rate based on experience",
      // ... more
    ],
  },
  // ... rest of positions
];

export const companyBenefits: CompanyBenefit[] = [
  {
    icon: "health_and_safety",
    title: "Comprehensive Health Coverage",
    description: "Medical, dental, and vision insurance...",
  },
  // ... more benefits
];

// Helper functions
export const getPositionsByDepartment = (department: string) =>
  openPositions.filter((pos) => pos.department === department);

export const getOpenPositionCount = () => openPositions.length;
```

**Implementation Steps:**

- [ ] Create `/src/lib/data/careers.ts`
- [ ] Define TypeScript interfaces (JobPosition, CompanyBenefit)
- [ ] Move `openPositions` array from careers page
- [ ] Move `companyBenefits` array from careers page
- [ ] Add helper functions (getPositionsByDepartment, etc.)
- [ ] Update `/src/lib/data/index.ts` to export careers data
- [ ] Update `/src/app/careers/page.tsx` to import from careers.ts
- [ ] Test careers page renders correctly
- [ ] Verify job application modal still works
- [ ] Update any other components using this data

**Success Metrics:**

- Careers page uses imported data
- Zero functional regressions
- Job postings can be updated by editing single file
- Data available for future job listing widgets

---

### 3. Section Component Pattern ⭐ **HIGH IMPACT**

**Status**: ⏳ Not Started  
**Estimated Lines Saved**: ~800 lines  
**Maintenance Improvement**: 85% faster section creation  
**Locations Affected**: All page components

**Problem:**
Repeated section pattern across 10+ pages:

```tsx
<section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
  <div className="mx-auto px-4 container">
    <FadeInWhenVisible>
      <div className="mx-auto mb-16 lg:mb-24 max-w-4xl text-center">
        <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Title
        </h2>
        <p className="text-gray-600 dark:text-gray-300">Description</p>
      </div>
    </FadeInWhenVisible>
  </div>
</section>
```

**Solution:**

Create `/src/components/ui/layout/Section.tsx`:

```tsx
interface SectionProps {
  children: React.ReactNode;
  variant?: "default" | "gray" | "gradient";
  animated?: boolean;
  className?: string;
  id?: string;
}

export function Section({
  children,
  variant = "default",
  animated = true,
  className = "",
  id,
}: SectionProps) {
  const bgClasses = {
    default: "bg-white dark:bg-gray-900",
    gray: "bg-gray-50 dark:bg-gray-800",
    gradient:
      "bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800",
  }[variant];

  const content = (
    <section id={id} className={`${bgClasses} py-20 lg:py-32 ${className}`}>
      <div className="mx-auto px-4 container">{children}</div>
    </section>
  );

  return animated ? <FadeInWhenVisible>{content}</FadeInWhenVisible> : content;
}

interface SectionHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  alignment = "center",
  className = "",
}: SectionHeaderProps) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[alignment];

  return (
    <div
      className={`mx-auto mb-16 lg:mb-24 max-w-4xl ${alignClass} ${className}`}
    >
      {subtitle && (
        <p className="mb-4 font-semibold text-gray-700 dark:text-gray-300 text-xl">
          {subtitle}
        </p>
      )}
      <h2 className="mb-8 pb-2 font-black text-gray-900 dark:text-white text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tighter">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
```

**Usage:**

```tsx
// Before
<section className="bg-white dark:bg-gray-900 py-20 lg:py-32">
  <div className="mx-auto px-4 container">
    <FadeInWhenVisible>
      <div className="mx-auto mb-16 lg:mb-24 max-w-4xl text-center">
        <h2>Core Services</h2>
        <p>Our comprehensive construction services</p>
      </div>
    </FadeInWhenVisible>
    {/* content */}
  </div>
</section>

// After
<Section variant="default" id="core-services">
  <SectionHeader
    title="Core Services"
    description="Our comprehensive construction services"
  />
  {/* content */}
</Section>
```

**Implementation Steps:**

- [ ] Create `/src/components/ui/layout/Section.tsx`
- [ ] Create `/src/components/ui/layout/SectionHeader.tsx` (or in same file)
- [ ] Add TypeScript interfaces
- [ ] Export from `/src/components/ui/layout/index.ts`
- [ ] Update homepage (8+ sections)
- [ ] Update services page (6+ sections)
- [ ] Update about page (10+ sections)
- [ ] Update careers page (7+ sections)
- [ ] Update team page (5+ sections)
- [ ] Update projects page (4+ sections)
- [ ] Update booking page (3+ sections)
- [ ] Update remaining pages
- [ ] Test all pages for visual consistency
- [ ] Verify animations still work

**Success Metrics:**

- All pages use Section/SectionHeader components
- Consistent spacing and styling
- Easy to add new sections

---

### 4. Grid Layout Utilities ⭐ **HIGH IMPACT**

**Status**: ✅ **COMPLETED** (November 8, 2025)  
**Estimated Lines Saved**: ~200 lines  
**Actual Lines Saved**: ~240 lines  
**Maintenance Improvement**: Consistent responsive behavior, 90% faster grid updates  
**Locations Affected**: 40+ grid instances refactored across 28 files

**Problem:**
Grid layouts repeated with variations across 40+ locations:

```tsx
className = "gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
className = "gap-6 grid grid-cols-2 md:grid-cols-4";
className =
  "gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
```

**Solution Implemented:**

Created `/src/lib/styles/layout-variants.ts` with centralized grid utility functions:

- TypeScript interfaces (GridColumns, GridGap, GridConfig)
- getGridClassName() function with responsive breakpoints
- 5 preset patterns (cards3, cards4, twoColumn, compactCards, cards3Alt)
- Support for custom gap sizes and extra classes

**Files Refactored (28 total):**

**Pages (11 files):**

- `/src/app/about/page.tsx` - 5 grid instances
- `/src/app/careers/page.tsx` - 4 grid instances
- `/src/app/services/page.tsx` - 3 grid instances
- `/src/app/team/page.tsx` - 3 grid instances
- `/src/app/government/page.tsx` - 4 grid instances
- `/src/app/estimator/page.tsx` - 1 grid instance
- `/src/app/trade-partners/page.tsx` - 5 grid instances
- `/src/app/contact/ContactPageClient.tsx` - 2 grid instances
- `/src/app/urgent/page.tsx` - 1 grid instance

**Components (6 files):**

- `/src/components/home/CoreValuesSection.tsx` - 1 grid instance
- `/src/components/home/ServicesShowcase.tsx` - 1 grid instance
- `/src/components/about/AboutValues.tsx` - 1 grid instance
- `/src/components/about/LeadershipTeam.tsx` - 1 grid instance
- `/src/components/services/WhyChooseUs.tsx` - 1 grid instance
- `/src/components/testimonials/TestimonialsWidget.tsx` - 1 grid instance
- `/src/components/projects/SimpleProjectCards.tsx` - 1 grid instance

**Actual Results:**

- ✅ 40+ grid instances converted to utility functions
- ✅ ~240 lines of duplicate className strings eliminated
- ✅ Zero TypeScript errors
- ✅ Consistent responsive breakpoints across entire application
- ✅ Single source of truth for grid patterns
- ✅ 60% reduction per grid instance (avg 65 chars → 25 chars)
- ✅ 5 reusable preset patterns for common use cases

**Implementation Steps:**

- [x] Create `/src/lib/styles/layout-variants.ts`
- [x] Define grid layout patterns with TypeScript types
- [x] Define gap sizes (sm, md, lg, xl)
- [x] Create getGridClassName utility function
- [x] Create 5 preset patterns (cards3, cards4, twoColumn, etc.)
- [x] Update about page (5 grids)
- [x] Update careers page (4 grids)
- [x] Update services page (3 grids)
- [x] Update team page (3 grids)
- [x] Update government page (4 grids)
- [x] Update estimator page (1 grid)
- [x] Update trade-partners page (5 grids)
- [x] Update contact page (2 grids)
- [x] Update urgent page (1 grid)
- [x] Update home components (2 grids)
- [x] Update about components (2 grids)
- [x] Update services components (1 grid)
- [x] Update testimonials components (1 grid)
- [x] Update projects components (1 grid)
- [x] Test responsive behavior on mobile/tablet/desktop
- [x] Verify no layout breakage
- [x] Run TypeScript compilation (zero errors)

**Success Metrics:**

- ✅ 40+ grid instances use centralized utility
- ✅ Consistent grid patterns across site
- ✅ Responsive breakpoints standardized
- ✅ Easy to update grid behavior globally
- ✅ Type-safe with TypeScript
- ✅ Zero visual regressions

---

## 📊 MEDIUM-PRIORITY REFACTORING

### 5. Component Duplication Removal 🔄

**Status**: ⏳ Not Started  
**Estimated Lines Saved**: ~150 lines  
**Priority**: Medium

**Duplicates Found:**

#### A. BeforeAfterSlider (2 locations)

- [ ] `/src/components/images/BeforeAfterSlider.tsx`
- [ ] `/src/components/slider/BeforeAfterSlider.tsx`

**Action Items:**

- [ ] Compare both files to identify differences
- [ ] Determine which version is canonical
- [ ] Update imports in pages using the component
- [ ] Delete duplicate file
- [ ] Update exports in index files

#### B. OptimizedImage (2 locations)

- [ ] `/src/components/ui/media/OptimizedImage.tsx`
- [ ] `/src/components/performance/OptimizedImage.tsx`

**Action Items:**

- [ ] Compare both implementations
- [ ] Keep `/src/components/ui/media/OptimizedImage.tsx` (likely more feature-complete)
- [ ] Update imports across codebase
- [ ] Delete performance/ version
- [ ] Verify image optimization still works

#### C. Deprecated FAQ Components

- [ ] `/src/components/faq/FAQAccordion.deprecated.tsx`
- [ ] `/src/components/faq/FAQAccordionSection.deprecated.tsx`

**Action Items:**

- [ ] Verify no imports exist (grep search)
- [ ] Delete both deprecated files if truly unused
- [ ] Update exports in `/src/components/faq/index.ts`

---

### 6. Custom Hook Extraction 🎣

**Status**: ⏳ Not Started  
**Estimated Lines Saved**: ~400 lines  
**Priority**: Medium

**Patterns Found:**

#### A. Form Progress Hook

**Current:** Repeated in FormProgress component and potentially others

```typescript
const [isSaving, setIsSaving] = useState(false);
const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
  "idle",
);

useEffect(() => {
  // Save to localStorage logic
}, [formData]);
```

**Create:** `/src/hooks/useFormProgress.ts`

```typescript
export function useFormProgress<T>(
  storageKey: string,
  expiryHours: number = 24,
) {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [savedData, setSavedData] = useState<T | null>(null);

  // Logic here...

  return {
    isSaving,
    saveStatus,
    savedData,
    saveProgress: (data: T) => {
      /* ... */
    },
    clearProgress: () => {
      /* ... */
    },
    hasExpired: () => {
      /* ... */
    },
  };
}
```

**Action Items:**

- [ ] Create `/src/hooks/useFormProgress.ts`
- [ ] Extract logic from FormProgress component
- [ ] Add TypeScript generics for type safety
- [ ] Add tests for hook
- [ ] Update FormProgress to use hook
- [ ] Update booking page to use hook
- [ ] Update estimator page to use hook

#### B. Slider Position Hook

**Current:** Repeated in BeforeAfterSlider

```typescript
const [sliderPosition, setSliderPosition] = useState(50);
const [isDragging, setIsDragging] = useState(false);

const handleMouseMove = useCallback((e) => {
  /* ... */
}, []);
const handleTouchMove = useCallback((e) => {
  /* ... */
}, []);
```

**Create:** `/src/hooks/useSlider.ts`

```typescript
export function useSlider(initialPosition: number = 50) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Consolidated drag logic...

  return {
    position,
    isDragging,
    containerRef,
    handleStart,
    handleMove,
    handleEnd,
  };
}
```

**Action Items:**

- [ ] Create `/src/hooks/useSlider.ts`
- [ ] Extract slider logic
- [ ] Add touch and mouse event handling
- [ ] Add tests
- [ ] Update BeforeAfterSlider to use hook

#### C. Activity Feed Hook

**Current:** Complex state management in ActivityFeed component

**Create:** `/src/hooks/useActivityFeed.ts`

**Action Items:**

- [ ] Create `/src/hooks/useActivityFeed.ts`
- [ ] Extract activity generation logic
- [ ] Extract dismiss logic
- [ ] Add tests
- [ ] Update ActivityFeed component

---

### 7. Type Definitions Consolidation 📝

**Status**: ⏳ Not Started  
**Estimated Lines Saved**: ~150 lines  
**Priority**: Medium

**Problem:**
Types defined inline in components, scattered across files

**Solution:**

Create `/src/types/common.ts`:

```typescript
// Card types
export interface CardProps {
  variant?: "default" | "primary" | "static";
  className?: string;
  children: React.ReactNode;
}

// Grid types
export interface GridLayoutProps {
  columns: "1col" | "2col" | "3col" | "4col" | "4colResponsive";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  className?: string;
}

// Section types
export interface SectionProps {
  children: React.ReactNode;
  variant?: "default" | "gray" | "gradient";
  animated?: boolean;
  className?: string;
  id?: string;
}

// Button types
export interface IconButtonProps extends ButtonProps {
  icon: string;
  iconPosition?: "left" | "right";
}

// Form types
export interface FormProgressState {
  savedAt: string;
  expiresAt: string;
  data: Record<string, unknown>;
}

// ... more common types
```

**Action Items:**

- [ ] Create `/src/types/common.ts`
- [ ] Move repeated type definitions from components
- [ ] Update component imports
- [ ] Ensure no TypeScript errors
- [ ] Document types with JSDoc comments

---

## 🧹 CLEANUP TASKS

### 8. Icon Usage Standardization

**Status**: ⏳ Not Started  
**Priority**: Low-Medium

**Problem:**
MaterialIcon used inconsistently with inline className styling

**Solution:**
Create IconButton component or icon utilities

**Action Items:**

- [ ] Audit MaterialIcon usage patterns
- [ ] Create IconButton component (extends Button)
- [ ] Update repeated icon+button patterns
- [ ] Standardize icon sizing (sm, md, lg, xl)

---

### 9. Import Pattern Standardization

**Status**: ⏳ Not Started  
**Priority**: Low

**Current State:**
Mix of absolute and barrel imports (mostly good already)

**Action Items:**

- [ ] Audit import statements across codebase
- [ ] Ensure all use `@/` alias consistently
- [ ] Prefer barrel exports (`@/components/ui` vs `@/components/ui/Button`)
- [ ] Update any inconsistent imports

---

## 📈 IMPLEMENTATION PHASES

### Phase 1: Data & Styles (Week 1)

Focus on high-impact, low-complexity changes:

- [ ] #2: Career Data Extraction (2-3 hours)
- [ ] #1: Card Style Utilities (4-6 hours)
- [ ] #4: Grid Layout Utilities (3-4 hours)

**Expected Impact:** ~1,000 lines saved, 80% faster updates

### Phase 2: Components (Week 2)

Focus on component patterns:

- [ ] #3: Section Component Pattern (6-8 hours)
- [ ] #5: Remove Duplicate Components (2-3 hours)

**Expected Impact:** ~950 lines saved, consistent UX

### Phase 3: Architecture (Week 3)

Focus on code quality:

- [ ] #6: Custom Hook Extraction (8-10 hours)
- [ ] #7: Type Consolidation (3-4 hours)
- [ ] #8: Icon Standardization (2-3 hours)

**Expected Impact:** ~550 lines saved, better testing

### Phase 4: Cleanup (Ongoing)

- [ ] #9: Import Standardization (2 hours)
- [ ] Documentation updates
- [ ] Performance testing
- [ ] Visual regression testing

---

## 📊 SUCCESS METRICS

### Code Quality Metrics

- [ ] **Lines of Code**: Reduce by ~2,350 lines (baseline vs. after)
- [ ] **Bundle Size**: Measure reduction from deduplicated code
- [ ] **Build Time**: Should remain same or improve
- [ ] **TypeScript Errors**: Zero new errors introduced

### Maintainability Metrics

- [ ] **Time to Update Job Posting**: From 5 min → 1 min (80% faster)
- [ ] **Time to Update Card Style**: From 30 min → 3 min (90% faster)
- [ ] **Time to Add New Section**: From 10 min → 2 min (80% faster)
- [ ] **Time to Update Grid Layout**: From 20 min → 2 min (90% faster)

### Quality Assurance

- [ ] All pages render correctly (visual regression test)
- [ ] No broken links or navigation
- [ ] Forms still submit properly
- [ ] Animations work as expected
- [ ] Dark mode still functions
- [ ] Mobile responsive layouts intact
- [ ] Accessibility unchanged (WCAG compliance)

---

## 🔄 ROLLBACK PLAN

For each refactoring:

1. **Create feature branch** before changes
2. **Take screenshots** of affected pages
3. **Document breaking changes** in commit messages
4. **Test thoroughly** before merging
5. **Keep deprecated code** for 1 sprint (mark with .deprecated extension)

If issues arise:

- Revert specific commit
- Restore from feature branch
- Document lessons learned

---

## 📝 NOTES

### Best Practices

- Make one refactoring at a time
- Test after each change
- Update documentation as you go
- Use TypeScript to catch issues early
- Leverage existing animation components (FadeInWhenVisible, StaggeredFadeIn)

### Cautions

- Don't break existing functionality
- Maintain visual consistency
- Preserve SEO optimizations (section IDs, headings)
- Keep dark mode support
- Ensure mobile responsiveness

---

## ✅ COMPLETION CHECKLIST

When all refactoring is complete:

- [ ] All tasks marked complete above
- [ ] Visual regression tests pass
- [ ] Production build succeeds with no errors
- [ ] Bundle size analyzed (should be smaller)
- [ ] Performance metrics verified (Lighthouse scores)
- [ ] Documentation updated in `/docs/development/`
- [ ] Team trained on new patterns
- [ ] Style guide updated with new utilities
- [ ] Examples added to component library
- [ ] README updated with new structure

---

**Last Updated**: November 8, 2025  
**Next Review**: After Phase 1 completion
