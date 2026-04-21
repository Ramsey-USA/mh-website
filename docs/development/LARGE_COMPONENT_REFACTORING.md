# Large Component Refactoring Guide

This guide provides step-by-step strategies for refactoring large components (1000+ lines) into smaller, more maintainable, and higher-performing sub-components.

---

## Problem: Large Monolithic Components

### Issues with Components >1000 Lines

1. **Performance**
   - All components re-render together
   - No code splitting per section
   - Larger bundle size for each page
   - Slower initial load

2. **Maintainability**
   - Difficult to navigate and modify
   - Hard to find specific features
   - Increased merge conflicts
   - Testing becomes complex

3. **Reusability**
   - Logic isolation is difficult
   - Hard to extract for use elsewhere
   - Duplicated code across pages

4. **Development Speed**
   - Takes longer to implement changes
   - More bugs from unintended side effects
   - Slower mental context loading

---

## Solution: Component Decomposition

### Refactoring Strategy

**Target Component:** `src/app/careers/page.tsx` (1,388 lines)

**Expected Result:**

- Main page component: ~400 lines
- 4-5 focused sub-components: 150-250 lines each
- ~40% total size reduction
- Better code splitting and lazy loading

---

## Step-by-Step Refactoring Process

### Phase 1: Data & State Analysis

**Task:** Extract data structures into separate files

#### Before:

```typescript
// In CareersPageClient.tsx (inline data - 200+ lines)
const positions = [
  { id: 1, title: "Construction Laborer", ... },
  { id: 2, title: "Skilled Tradesperson", ... },
  // ...
];

const positions_es = [
  { id: 1, title: "Obrero de construcción", ... },
  // ...
];

const applicationTimeline = [
  { step: 1, title: "Submit", ... },
  // ...
];
```

#### After - Create `src/app/careers/data/positions.ts`:

```typescript
/**
 * Career positions data
 * Separated from component for clarity and reusability
 */

export const POSITIONS_EN = [
  {
    id: "construction-laborer",
    title: "Construction Laborer",
    description: "Entry-level position for general construction work",
    requirements: ["High school diploma or GED", "Physical fitness"],
    icon: "construction",
  },
  {
    id: "skilled-trade",
    title: "Skilled Tradesperson",
    description: "Experienced tradesperson in carpentry or concrete",
    requirements: ["5+ years experience", "State certification"],
    icon: "build",
  },
  // ...
];

export const POSITIONS_ES = [
  {
    id: "construction-laborer",
    title: "Obrero de construcción",
    description:
      "Posición de nivel inicial para trabajo de construcción general",
    requirements: ["Diploma de preparatoria o GED", "Aptitud física"],
    icon: "construction",
  },
  // ...
];

export type Position = (typeof POSITIONS_EN)[number];
```

#### Then use in component:

```typescript
import { POSITIONS_EN, POSITIONS_ES } from "./data/positions";

export function CareersPageClient() {
  const positions = isEs ? POSITIONS_ES : POSITIONS_EN;
  // ...
}
```

**Benefits:**

- ✅ Reduces component file by 50+ lines
- ✅ Data is now reusable
- ✅ Easier to update/maintain
- ✅ Can be imported by other pages

---

### Phase 2: Extract Small Sections → Components

**Task:** Extract UI sections into focused sub-components

#### Example 1: Position Card Component

**Before** (inline in page):

```typescript
// 50+ lines of JSX in return statement
<div className="group relative bg-white...">
  <div className="p-6 sm:p-8...">
    <MaterialIcon icon={position.icon} />
    <h3>{position.title}</h3>
    <p>{position.description}</p>
    <ul>
      {position.requirements.map(req => (
        <li key={req}>{req}</li>
      ))}
    </ul>
    <Button onClick={() => handleApply(position)}>Apply Now</Button>
  </div>
</div>
```

**After** - Create `src/app/careers/components/PositionCard.tsx`:

```typescript
/**
 * PositionCard Component
 *
 * Displays a single position with description and apply button
 * Used in the positions grid on the careers page
 */

interface PositionCardProps {
  position: Position;
  onApply: (position: Position) => void;
  isSpanish?: boolean;
}

export function PositionCard({
  position,
  onApply,
  isSpanish = false,
}: PositionCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300">
      <div className="h-1 bg-gradient-to-r from-brand-primary to-brand-secondary" />
      <div className="p-6 sm:p-8">
        <div className="mb-4">
          <MaterialIcon
            icon={position.icon}
            size="2xl"
            className="text-brand-primary"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {position.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {position.description}
        </p>
        <div className="border-t dark:border-gray-700 pt-4">
          <p className="text-xs font-semibold text-gray-900 dark:text-white mb-3">
            {isSpanish ? "Requisitos:" : "Requirements:"}
          </p>
          <ul className="space-y-2">
            {position.requirements.map((req) => (
              <li key={req} className="flex items-start text-xs">
                <MaterialIcon
                  icon="check_circle"
                  size="sm"
                  className="flex-shrink-0 mr-2 text-gray-500 dark:text-gray-400 mt-0.5"
                />
                <span className="text-gray-700 dark:text-gray-300">{req}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          onClick={() => onApply(position)}
          variant="primary"
          size="md"
          className="w-full mt-4"
        >
          {isSpanish ? "Solicitar Ahora" : "Apply Now"}
        </Button>
      </div>
    </div>
  );
}
```

**In main component:**

```typescript
import { PositionCard } from "./components/PositionCard";

export function CareersPageClient() {
  // ... state setup ...

  return (
    <>
      {/* Other sections ... */}
      <section id="positions">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => (
            <PositionCard
              key={position.id}
              position={position}
              onApply={handleApply}
              isSpanish={isEs}
            />
          ))}
        </div>
      </section>
    </>
  );
}
```

**Benefits:**

- ✅ Main component reduced
- ✅ PositionCard is testable independently
- ✅ Reusable in other contexts
- ✅ Easier to maintain styling

---

#### Example 2: Application Timeline Component

**Before** (large section in main component):

```typescript
// 100+ lines of timeline JSX...
<section>
  <h2>Application Process</h2>
  <div className="relative">
    <div className="hidden lg:block absolute..." /> {/* vertical line */}
    <div className="space-y-12 lg:space-y-20">
      {applicationTimeline.map(step => (
        <div key={step.step} className={...}>
          {/* Complex responsive layout */}
          <div className="flex lg:contents">
            <div className="relative flex-shrink-0 w-12 h-12 ...">
              <MaterialIcon icon={step.icon} />
            </div>
            <div className="flex-1 ...">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**After** - Create `src/app/careers/components/ApplicationTimeline.tsx`:

```typescript
/**
 * ApplicationTimeline Component
 *
 * Displays vertical timeline of application process
 * Responsive: alternates sides on desktop, stacks on mobile
 */

interface TimelineStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface ApplicationTimelineProps {
  steps: TimelineStep[];
  isSpanish?: boolean;
}

export function ApplicationTimeline({
  steps,
  isSpanish = false,
}: ApplicationTimelineProps) {
  return (
    <section className="relative max-w-6xl mx-auto">
      {/* Vertical connecting line */}
      <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-primary/30 via-brand-secondary to-brand-primary/30" />

      {/* Timeline steps */}
      <div className="space-y-12 lg:space-y-20">
        {steps.map((step, index) => (
          <div
            key={step.step}
            className={`flex lg:contents ${index % 2 === 0 ? "flex-row-reverse" : ""}`}
          >
            {/* Step number circle */}
            <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center lg:col-span-1">
              <div className="absolute w-full h-full bg-white dark:bg-gray-900 rounded-full border-4 border-brand-primary" />
              <span className="relative text-sm font-bold text-brand-primary">
                {step.step}
              </span>
            </div>

            {/* Content */}
            <div className={`flex-1 py-4 px-6 lg:px-0 ${index % 2 === 0 ? "lg:text-right lg:pr-12" : "lg:pl-12"}`}>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Benefits:**

- ✅ Responsible for one specific feature
- ✅ Can be tested independently
- ✅ Easier to modify timeline styling
- ✅ Reusable in other processes

---

### Phase 3: Extract State Management

**Task:** Isolate complex state into custom hooks

#### Before:

```typescript
export function CareersPageClient() {
  const [isEs, setIsEs] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState({ ... });
  const [formErrors, setFormErrors] = useState({ ... });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // ... 50+ more lines of state ...

  const handleApply = (position: Position) => {
    setSelectedPosition(position);
    setShowApplicationModal(true);
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    // ...
  };

  const handleSubmit = async () => {
    // ... 50+ lines of submission logic ...
  };

  return (
    // ... JSX ...
  );
}
```

#### After - Create `src/app/careers/hooks/useApplicationForm.ts`:

```typescript
/**
 * useApplicationForm Hook
 *
 * Manages application form state, validation, and submission
 * Encapsulates all form logic for cleaner component code
 */

interface UseApplicationFormOptions {
  position?: Position;
  onSuccess?: () => void;
}

export function useApplicationForm(options?: UseApplicationFormOptions) {
  const [formData, setFormData] = useState({ ... });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name: string, value: string) => {
    // Validation logic here
    return errorMessage || null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error || undefined,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        options?.onSuccess?.();
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit,
  };
}
```

**In component:**

```typescript
export function CareersPageClient() {
  const {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleSubmit,
  } = useApplicationForm({
    onSuccess: () => handleCloseModal(),
  });

  // Much cleaner!
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        errorMessage={errors.firstName}
      />
      {/* ... */}
    </form>
  );
}
```

**Benefits:**

- ✅ Form logic is reusable
- ✅ Can be unit tested independently
- ✅ Easier to understand component intent
- ✅ Reduces component file size

---

### Phase 4: Lazy Load Heavy Sections

**Task** Use dynamic imports for sections that aren't immediately visible

#### Example: Modal Lazy Loading

```typescript
import dynamic from "next/dynamic";

// Lazy load modals that may not be shown
const ApplicationModal = dynamic(
  () => import("./components/ApplicationModal"),
  { loading: () => <div>Loading...</div> }
);

const SuccessMessage = dynamic(
  () => import("./components/SuccessMessage"),
  { loading: () => null }
);

export function CareersPageClient() {
  // ModalsOnly load when needed
  return (
    <>
      {/* Above fold content */}
      <Hero />
      <Positions />

      {/* Lazy loaded - only loads when modal opens */}
      {showApplicationModal && (
        <ApplicationModal
          position={selectedPosition}
          onClose={handleCloseModal}
        />
      )}

      {/* Lazy loaded - only loads when success state is true */}
      {submitSuccess && <SuccessMessage />}
    </>
  );
}
```

**Benefits:**

- ✅ Initial page size reduced
- ✅ Faster initial load
- ✅ Lazy load only when needed
- ✅ Better performance metrics

---

## Refactoring Checklist

### Before You Start

- [ ] Document current component structure
- [ ] Run test coverage report
- [ ] Deploy current version to staging
- [ ] Run Lighthouse audit (baseline)

### During Refactoring

- [ ] Extract data into separate files
- [ ] Create one sub-component at a time
- [ ] Export sub-components for reusability
- [ ] Update imports in main component
- [ ] Test each change individually
- [ ] Maintain git history with clear commits

### After Refactoring

- [ ] All tests pass (should be 100%)
- [ ] Lighthouse score maintained or improved
- [ ] Component size verified reduced
- [ ] Bundle size checked
- [ ] Visual regression testing on staging
- [ ] Documentation updated
- [ ] Code review completed

---

## Measuring Success

### Bundle Size Impact

```bash
npm run bundle:size
```

**Target:**

- Careers page: 1,388 lines → ~800 lines (42% reduction)
- Total bundle: ~5% smaller
- Initial HTML: ~3% smaller

### Performance Impact

```bash
npm run build:profile
npm run lighthouse:guide
```

**Expected Improvements:**

- First Contentful Paint (FCP): +5-10%
- Largest Contentful Paint (LCP): 0-5%
- Time to Interactive (TTI): +3-8%
- Cumulative Layout Shift (CLS): No change

### Maintainability Metrics

```bash
npm run complexity-check  # if configured
```

**Expected:**

- Cyclomatic complexity per function: <10
- One component per file
- File size: <250 lines average

---

## File Structure After Refactoring

```
src/app/careers/
├── page.tsx                      # Main page (entry point)
├── CareersPageClient.tsx         # Client component (~400 lines)
├── layout.tsx                    # Metadata
├── data/
│   ├── positions.ts             # Position data
│   ├── timeline.ts              # Application timeline
│   └── testimonials.ts          # Employee testimonials
├── components/
│   ├── PositionCard.tsx         # Position display
│   ├── ApplicationTimeline.tsx  # Timeline component
│   ├── PositionGrid.tsx         # Grid layout
│   ├── ApplicationModal.tsx     # Application form modal
│   ├── SuccessMessage.tsx       # Submission success
│   └── __tests__/               # Component tests
├── hooks/
│   ├── useApplicationForm.ts    # Form state management
│   ├── usePositionFilter.ts     # Filtering logic
│   └── __tests__/
└── __tests__/
    ├── page.test.tsx            # Page smoke tests
    ├── integration.test.ts       # Integration tests
    └── performance.test.ts       # Performance benchmarks
```

---

## Related Documentation

- [Performance Optimization](./performance-optimization.md)
- [Component Patterns](./patterns/component-pattern-strategy.md)
- [Testing Guide](./testing-coverage-next-steps.md)
- [Code Organization](./code-organization.md)

---

**Last Updated:** April 21, 2026  
**Maintained By:** MH Development Team
