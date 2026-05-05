# Performance Optimization Strategy

Target: Performance Score 78 → 90+ (12+ point improvement)

---

## Current State Analysis

### Lighthouse Performance Baseline

```
Current Page Performance:
- Careers page: 78/100 (Yellow zone)
- Contact page: 76/100
- Services page: 74/100
- Public Sector page: 82/100 (Green zone)

Core Web Vitals:
- Largest Contentful Paint (LCP): 2.8s (target: <2.5s)
- First Input Delay (FID): 45ms (target: <100ms) ✓
- Cumulative Layout Shift (CLS): 0.08 (target: <0.1) ✓
```

### Key Performance Bottlenecks

| Issue                                         | Impact     | Priority |
| --------------------------------------------- | ---------- | -------- |
| Large component bundles (careers 1,388 lines) | +400ms FCP | P0       |
| Unoptimized images (WebP not used everywhere) | +200ms LCP | P0       |
| Unnecessary re-renders in forms               | +150ms TTI | P1       |
| Missing lazy loading on below-fold sections   | +100ms LCP | P1       |
| Uncompressed JSON data imports                | +50ms TTI  | P2       |

---

## Implementation Plan

### Phase 1: Component Size Reduction (P0 - Immediate)

**Goal:** Break large components → faster initial load

#### 1.1 Careers Page Refactoring

**Current State:** `src/app/careers/page.tsx` is 1,388 lines  
**Target:** Reduce to 400-500 lines via component extraction

**Expected Impact:**

- Initial bundle: -8-12%
- FCP: -200-300ms
- TTI: -150-200ms

**Action Items:**

```typescript
// Create these sub-components:
1. PositionCard.tsx (150 lines)
2. ApplicationTimeline.tsx (100 lines)
3. PositionGrid.tsx (80 lines)
4. Testimonials.tsx (120 lines)
5. ApplicationModal.tsx (200 lines)

// Extract to hooks:
1. useApplicationForm.ts (100 lines)
2. usePositionFilter.ts (60 lines)
3. useLanguage.ts (already exists, keep)

// Extract to data files:
1. data/positions.ts (150 lines)
2. data/timeline.ts (80 lines)
3. data/testimonials.ts (100 lines)
```

**Verification Command:**

```bash
# Before refactoring
wc -l src/app/careers/CareersPageClient.tsx  # Expected: ~1,388 lines

# After refactoring
wc -l src/app/careers/CareersPageClient.tsx  # Expected: ~400 lines
wc -l src/app/careers/components/*.tsx       # Should distribute lines
```

---

#### 1.2 Contact Page Similar Refactoring

**Current:** Forms and sections inline  
**Target:** Extract FormWrapper components

**Expected Impact:**

- Bundle: -5-8%
- LCP: -100-150ms

**Action Items:**

```typescript
// Lazy load map section
const GoogleMap = dynamic(() => import('./components/GoogleMap'), {
  loading: () => <div className="skeleton h-96" />
});

// Extract form into FormWrapper
// Lazy load form if below fold
```

---

### Phase 2: Image Optimization (P0 - High Impact)

**Goal:** Optimize images for LCP improvement

#### 2.1 Image Format Upgrade (WebP)

**Current State:**

```bash
# Check image formats
find public -type f \( -name "*.jpg" -o -name "*.png" \) | wc -l
# Expected: 50-100 non-WebP images

# Check sizes
du -sh public/images/
# Current size (estimate): 2-3MB
```

**Implementation:**

```typescript
// Update Image components to use priority + WebP

import Image from 'next/image';

// Before:
<img src="/images/hero.jpg" alt="Hero" />

// After:
<Image
  src="/images/hero.webp"
  alt="Hero"
  width={1200}
  height={600}
  priority
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/webp;base64,..."
/>
```

**Image Conversion:**

```bash
# Convert all JPG to WebP (install: apt install webp)
for file in public/**/*.jpg; do
  cwebp -q 80 "$file" -o "${file%.jpg}.webp"
done

# Convert all PNG to WebP
for file in public/**/*.png; do
  cwebp -q 80 "$file" -o "${file%.png}.webp"
done

# Verify compression ratio
du -sh public/images/  # Should be 30-40% smaller
```

**Expected Impact:**

- LCP: -200-300ms (25-40% improvement)
- Total image size: -60-70%
- Network transfer time: -40-50%

---

#### 2.2 Image Lazy Loading

```typescript
// Careers page example
import Image from 'next/image';

<section>
  {testimonials.map(testimonial => (
    <div key={testimonial.id}>
      <Image
        src={testimonial.photo}
        alt={testimonial.name}
        width={150}
        height={150}
        loading="lazy"  // Critical for below-fold images
        quality={80}
      />
    </div>
  ))}
</section>
```

**Expected Impact:**

- Initial load: -5-10%
- FCP: -50-100ms

---

### Phase 3: Dynamic Imports (P1 - High Impact)

**Goal:** Lazy load non-critical sections

#### 3.1 Lazy Load Below-Fold Content

```typescript
import dynamic from 'next/dynamic';

// In careers page
const Testimonials = dynamic(
  () => import('./components/Testimonials').then(m => m.Testimonials),
  {
    loading: () => <div className="h-96 bg-gray-100 animate-pulse" />,
    ssr: true
  }
);

const ApplicationProcess = dynamic(
  () => import('./components/ApplicationTimeline'),
  {
    loading: () => <div className="h-screen bg-gray-100" />,
    ssr: true
  }
);

export function CareersPageClient() {
  return (
    <>
      <Hero />
      <PositionGrid />

      {/* These load after interactive */}
      <Testimonials />
      <ApplicationProcess />
    </>
  );
}
```

**Expected Impact:**

- TTI: -100-200ms
- FCP: -50-100ms
- Initial bundle: -10-15%

---

#### 3.2 Lazy Load Modals

```typescript
const ApplicationModal = dynamic(
  () => import('./components/ApplicationModal'),
  {
    loading: () => null, // Don't show placeholder for modals
    ssr: false          // Modals don't need SSR
  }
);

export function CareersPageClient() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <ApplicationModal onClose={() => setShowModal(false)} />}
    </>
  );
}
```

**Expected Impact:**

- Initial load: -3-5%
- TTI: -50-100ms

---

### Phase 4: Render Optimization (P1 - Medium Impact)

**Goal:** Prevent unnecessary re-renders

#### 4.1 Memoize Components

```typescript
import { memo } from 'react';

// Before: Entire grid re-renders when parent state changes
export function PositionGrid({ positions, onApply }) {
  return (
    <div className="grid">
      {positions.map(p => (
        <PositionCard key={p.id} position={p} onApply={onApply} />
      ))}
    </div>
  );
}

// After: Grid only re-renders if positions/onApply change
export const PositionGrid = memo(function PositionGrid({ positions, onApply }) {
  return (
    <div className="grid">
      {positions.map(p => (
        <PositionCard key={p.id} position={p} onApply={onApply} />
      ))}
    </div>
  );
});

// Even better: Memoize the card
export const PositionCard = memo(function PositionCard({ position, onApply }) {
  return (
    <div onClick={() => onApply(position)}>
      {/* ... */}
    </div>
  );
});
```

**Expected Impact:**

- TTI: -50-100ms
- Consecutive interactions: -20-30% faster

---

#### 4.2 useCallback for Event Handlers

```typescript
import { useCallback } from 'react';

// Before: New function created on every render
function CareersPageClient() {
  const handleApply = (position) => {
    setSelectedPosition(position);
    setShowModal(true);
  };

  return <PositionGrid onApply={handleApply} />;
}

// After: Function only recreated if dependencies change
function CareersPageClient() {
  const handleApply = useCallback((position) => {
    setSelectedPosition(position);
    setShowModal(true);
  }, []); // Dependencies

  return <PositionGrid onApply={handleApply} />;
}
```

**Expected Impact:**

- Component re-render prevention: -10-20%
- TTI: -20-50ms

---

### Phase 5: Code Splitting (P1 - Targeted Impact)

**Goal:** Split large bundles by route

#### 5.1 Route-Based Code Splitting

```typescript
// next.config.js
export default {
  experimental: {
    isrMemoryCacheSize: 50 * 1024 * 1024, // 50MB cache
  },
  onDemandEntries: {
    maxInactiveAge: 60000, // Keep idle pages 60s
    pagesBufferLength: 5, // Pre-build next 5 pages
  },
};
```

**Expected Impact:**

- Per-page bundle: -8-12%
- Route transition: -50-100ms

---

### Phase 6: Data Optimization (P2 - Incremental Impact)

**Goal:** Reduce JSON data payload

#### 6.1 Compress Data Files

```typescript
// Before: Full position objects in JavaScript
export const POSITIONS_EN = [
  {
    id: "construction-laborer",
    title: "Construction Laborer",
    description: "Entry-level position for general construction work",
    requirements: ["High school diploma or GED", "Physical fitness", "Valid driver's license", "Clean background check"],
    salary: "$45,000 - $55,000",
    location: "Tri-State Service Area",
    icon: "construction",
    // ... 20+ more fields
  },
  // ... 50+ more positions
];

// After: Minified structured data
const POSITIONS_EN = [
  // Shortened keys, shared strings externalized
  { id: 1, t: "Construction Laborer", d: 1, r: [1, 2], s: 1, l: 1, i: "construction" },
  // ...
];

const DESCRIPTIONS = { 1: "Entry-level construction work", ... };
const REQUIREMENTS = { 1: "High school diploma", 2: "Physical fitness", ... };
```

**Expected Impact:**

- Data payload: -20-30%
- Parse time: -10-15ms

---

## Measurement & Validation

### 6.1 Before & After Script

```bash
#!/bin/bash
# performance-check.sh

echo "=== PERFORMANCE OPTIMIZATION TRACKING ==="

# Baseline metrics
BEFORE_SIZE=$(wc -c < .next/static/**/*.js | head -1)
echo "Before: $BEFORE_SIZE bytes"

# After optimization
npm run build
AFTER_SIZE=$(wc -c < .next/static/**/*.js | head -1)
echo "After: $AFTER_SIZE bytes"

# Calculate improvement
IMPROVEMENT=$(( (BEFORE_SIZE - AFTER_SIZE) * 100 / BEFORE_SIZE ))
echo "Improvement: $IMPROVEMENT%"

# Run Lighthouse
npm run lighthouse:guide
```

### 6.2 Target Metrics

| Metric                         | Current | Target | Method       |
| ------------------------------ | ------- | ------ | ------------ |
| Lighthouse Performance         | 78      | 90+    | Phase 1-5    |
| LCP (Largest Contentful Paint) | 2.8s    | <2.5s  | Phase 2-3    |
| FCP (First Contentful Paint)   | 1.2s    | 1.0s   | Phase 1-3    |
| TTI (Time to Interactive)      | 3.5s    | 3.0s   | Phase 1,4    |
| CLS (Cumulative Layout Shift)  | 0.08    | <0.1   | Already good |
| Bundle Size (JS)               | 450KB   | 390KB  | Phase 1,5    |
| Image Size                     | 2.5MB   | 750KB  | Phase 2      |

---

## Implementation Priority

### Week 1: Phase 1 + Phase 2 (Highest Impact)

- [ ] Refactor careers page (Component extraction)
- [ ] Convert images to WebP format
- [ ] Add lazy loading to images

**Expected Improvement:** +8-10 Lighthouse points

### Week 2: Phase 3 + Phase 4 (Medium Impact)

- [ ] Implement dynamic imports
- [ ] Add memo() to components
- [ ] Optimize event handlers with useCallback

**Expected Improvement:** +2-4 Lighthouse points

### Week 3: Phase 5 + Phase 6 (Polishing)

- [ ] Configure code splitting
- [ ] Optimize data structures

**Expected Improvement:** +1-2 Lighthouse points

---

## Validation Checklist

### Before Deployment

- [ ] Run full test suite: `npm run test:ci`
- [ ] Check bundle size locally: `npm run build:analyze`
- [ ] Profile with DevTools Lighthouse
- [ ] Test on 4G network throttling
- [ ] Test on slow mobile device
- [ ] Verify SEO metadata preserved
- [ ] Check accessibility (a11y) not degraded

### After Deployment

- [ ] Monitor Real User Monitoring (RUM) data
- [ ] Check Lighthouse CI results
- [ ] Compare before/after Core Web Vitals
- [ ] Verify no new error logs
- [ ] Monitor bundle size in production

---

## Monitoring & Maintenance

### Monthly Performance Review

```bash
npm run lighthouse:guide
npm run check-bundle-size
npm run profile-slow-operations
```

### Set up Continuous Monitoring

```javascript
// Performance observer in production
if ("web-vital" in window) {
  const vitals = require("web-vitals");
  vitals.getCLS(console.log);
  vitals.getFID(console.log);
  vitals.getFCP(console.log);
  vitals.getLCP(console.log);
  vitals.getTTFB(console.log);
}
```

---

## Related Documentation

- [Large Component Refactoring Guide](./LARGE_COMPONENT_REFACTORING.md)
- [Image Optimization Best Practices](./images-optimization.md)
- [Bundle Analysis & Optimization](./bundle-analysis.md)
- [Testing Performance Benchmarks](./performance-testing.md)

---

**Last Updated:** April 21, 2026  
**Performance Target:** 90+ Lighthouse Score  
**Effort Estimate:** 3-4 weeks for full implementation
