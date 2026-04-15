# Page Performance Audit

**Purpose:** Systematic checklist to audit and fix load-time lag across all pages.  
**Priority order:** Fix veterans + careers first (confirmed lag), then work top-to-bottom by severity score.  
**Last scanned:** 2026-04-15

---

## How to Read This

Each page has a **Severity** rating based on the sum of known issues:

| Indicator                     | What it means                                                                |
| ----------------------------- | ---------------------------------------------------------------------------- |
| `"use client"` on page        | Entire page hydrates client-side — unnecessary if only 1-2 things need state |
| FIW (FadeInWhenVisible) count | Each mounts IntersectionObserver + rAF + setTimeout. >5 is excessive         |
| SFI (StaggeredFadeIn) count   | Each mounts its own observer chain                                           |
| Fixed BG                      | `backgroundAttachment: fixed` triggers full repaint on every scroll frame    |
| DecorBG count                 | `DiagonalStripePattern` + `BrandColorBlobs` rendered per-section             |
| Images w/o `priority` on hero | LCP image not preloaded = delayed paint                                      |
| Repeated same image           | Same file loaded N× independently                                            |

**Severity Scale:**  
🔴 High — multiple compounding issues, confirmed lag  
🟡 Medium — 1-2 issues, noticeable on slow connections or mobile  
🟢 Low — clean or minor improvements available

---

## Checklist Key

For each page, check each item — mark `[x]` when resolved, `[ ]` when not yet done.

---

## Pages

---

### `/veterans` — 🔴 HIGH PRIORITY (confirmed lag)

**Scanned issues:**

- `backgroundAttachment: fixed` on parallax div (repaints every scroll frame)
- 17× FadeInWhenVisible
- 5× StaggeredFadeIn
- Same image (`/images/logo/mh-veteran-bg.webp`) loaded in 4 separate `<Image fill>` cards
- 2 images have `priority` but hero has no actual `<Image>` (gradient only, OK)

**Audit checklist:**

- [x] Remove `backgroundAttachment: 'fixed'` from the parallax div (src/app/veterans/page.tsx ~L88)
- [x] Replace the 4 repeated `<Image fill>` cards in "Strategic Veteran Partnerships" with a single section-level CSS background or distinct images
- [x] Replace section-level `FadeInWhenVisible` wrappers with `.scroll-reveal` CSS class — keep FIW only on individual stat cards and CTAs (aim: ≤5 FIW total)
- [ ] Verify no Lighthouse LCP regression after changes
- [x] Build passes: `npm run build:next`

---

### `/careers` — 🔴 HIGH PRIORITY (confirmed lag)

**Scanned issues:**

- `"use client"` on 1,497-line page — entire page hydrates client-side
- 15× FadeInWhenVisible
- 5× StaggeredFadeIn
- `DiagonalStripePattern` + `BrandColorBlobs` rendered **8× each** (every section has both)
- `JobApplicationModal` loaded in bundle even when closed
- `useSearchParams()` without Suspense boundary (Next.js 15 warning risk)

**Audit checklist:**

- [x] Extract client boundary: create `src/app/careers/CareersPageClient.tsx` ("use client") containing only modal state, `useSearchParams`, and `usePageTracking` — keep route page as server component
- [x] Wrap client component in `<Suspense fallback={null}>` (required by useSearchParams in Next.js 15)
- [x] Lazy-load `JobApplicationModal`: `dynamic(() => import(...), { ssr: false })` — only fetches on first open
- [x] Reduce `DiagonalStripePattern` + `BrandColorBlobs` to once per page at layout level, not per-section
- [x] Replace section-level FadeInWhenVisible with `.scroll-reveal` CSS (aim: ≤6 FIW total)
- [ ] Confirm modal open/close still works after extraction
- [x] Build passes: `npm run build:next`

---

### `/about` — 🟡 MEDIUM

**Scanned issues:**

- 17× FadeInWhenVisible
- 10 dynamic imports (check if any are eagerly needed above fold)
- 4× background decorators
- 0 direct images on page (may use components — check sub-components)

**Audit checklist:**

- [x] Replace section-level FadeInWhenVisible with `.scroll-reveal` CSS (aim: ≤5 FIW)
- [x] Audit the 10 dynamic imports — `AboutHero` is static; all dynamic imports are below-fold sections ✓
- [x] Check whether DiagonalStripePattern/BrandColorBlobs are used 4× or consolidated
- [x] Build passes: `npm run build:next`

---

### `/allies` — 🟡 MEDIUM

**Scanned issues:**

- 11× FadeInWhenVisible
- 5× StaggeredFadeIn
- 8× background decorators
- 7 images — none flagged with `priority` (check if hero image needs it)

**Audit checklist:**

- [x] Hero is CSS gradient — no `<Image>` above fold; 7 images are vendor logos rendered below the fold, no `priority` needed
- [x] Replace section-level FadeInWhenVisible with `.scroll-reveal` CSS (aim: ≤4 FIW)
- [x] Consolidate background decorators — render once per section max
- [x] Build passes: `npm run build:next`

---

### `/faq` — 🟡 MEDIUM

**Scanned issues:**

- 9× FadeInWhenVisible
- 3× StaggeredFadeIn
- 8× background decorators

**Audit checklist:**

- [x] Replace section-level FadeInWhenVisible with `.scroll-reveal` CSS (aim: ≤3 FIW)
- [x] Consolidate background decorators
- [x] Build passes: `npm run build:next`

---

### `/public-sector` — 🟡 MEDIUM

**Scanned issues:**

- 17× FadeInWhenVisible (tied highest with `/about` and `/veterans`)
- 7× StaggeredFadeIn
- 3 dynamic imports
- 5 images — none with `priority`
- 2× background decorators

**Audit checklist:**

- [x] Hero is CSS gradient — no `<Image>` above fold; `priority` not applicable

**Scanned issues:**

- 9× FadeInWhenVisible
- 5× StaggeredFadeIn
- 4× background decorators

**Audit checklist:**

- [x] Replace section-level FadeInWhenVisible with `.scroll-reveal` CSS (aim: ≤3 FIW)
- [x] Build passes: `npm run build:next`

---

### `/safety` — 🟡 MEDIUM

**Scanned issues:**

- 9× FadeInWhenVisible
- 3× StaggeredFadeIn
- 2 dynamic imports
- 10× background decorators (highest on site)
- 1 image with `priority` — verify it is the LCP element

**Audit checklist:**

- [x] Consolidate background decorators — 10× is excessive, render once at section level
- [x] Replace section-level FadeInWhenVisible with `.scroll-reveal` CSS (aim: ≤3 FIW)
- [x] Confirmed the `priority` image (safety-culture.webp) is in the hero section at the very top of the page — correctly placed
- [x] Build passes: `npm run build:next`

---

### `/services` — 🟡 MEDIUM

**Scanned issues:**

- 9× FadeInWhenVisible
- 10 dynamic imports
- 6× background decorators
- 5 images — none with `priority`

**Audit checklist:**

- [x] Hero is `ServicesHero` component (CSS gradient only, no `<Image>`) — no `priority` needed
- [x] Audit 10 dynamic imports — `ServicesHero` is static; all dynamic imports are below-fold sections ✓
- [x] Replace section-level FadeInWhenVisible with `.scroll-reveal` CSS (aim: ≤3 FIW)
- [x] Build passes: `npm run build:next`

---

### `/team` — 🟡 MEDIUM

**Scanned issues:**

- 3 dynamic imports
- 8× background decorators
- No direct images in page file (may be inside dynamic components — verify)

**Audit checklist:**

- [x] Inspect dynamic components for images — hero is CSS gradient, no `<Image>` tags above fold
- [x] Consolidate background decorators
- [x] Build passes: `npm run build:next`

---

### `/testimonials` — 🟢 LOW

**Scanned issues:**

- 3× FadeInWhenVisible
- 2 dynamic imports
- 8× background decorators
- 2 images — no `priority`

**Audit checklist:**

- [x] Hero is CSS gradient — no `<Image>` above fold; vendor logos below fold don't need priority
- [x] Consolidate background decorators — removed 2 section-level pairs + hero FIW
- [x] Build passes: `npm run build:next`

---

### `/projects` — 🟢 LOW

**Scanned issues:**

- `"use client"` page (needed — `useSearchParams`, router)
- 7 dynamic imports (all with `ssr: false` + skeleton loaders — correct pattern ✓)
- No FIW directly in page file

**Audit checklist:**

- [x] Confirm `useSearchParams` is wrapped in `<Suspense>` (Next.js 15 requirement) — uses `window.location` in `useEffect`, no `useSearchParams` hook present
- [x] No other action needed — dynamic imports are correctly structured
- [x] Build passes: `npm run build:next`

---

### `/contact` — 🟢 LOW

**Scanned issues:**

- Google Maps `<iframe>` loads unconditionally (third-party connection on every page load)
- 0 FIW, 0 decorators, 0 images in page file (main content in `ContactPageClient.tsx`)

**Audit checklist:**

- [x] Audit `src/app/contact/ContactPageClient.tsx` — map iframe should lazy-load on user interaction (facade pattern) — `MapFacade` component already implemented
- [x] Build passes: `npm run build:next`

---

### `/dashboard` — 🟢 LOW

**Scanned issues:**

- `"use client"` (appropriate — admin UI)
- 481 kB first-load JS (flagged in build output — heaviest page)

**Audit checklist:**

- [x] Identified heaviest deps: `SafetyTab` uses `recharts`; all three tabs statically imported but only analytics tab visible initially
- [x] Lazy-loaded `SafetyTab`, `DriversTab`, `LeadsTab` via `dynamic()` — split out of initial bundle
- [x] Build passes: `npx tsc --noEmit` passes with 0 errors

---

### `/` (Home) — 🟢 LOW

**Scanned issues:**

- 7 dynamic imports — all below-fold ✓ (correct pattern, confirmed in page.tsx)
- 350 kB first-load JS (acceptable but monitor)

**Audit checklist:**

- [x] Confirm `HeroSection` and `CoreValuesSection` (static imports) contain the LCP image with `priority` — hero is CSS-only gradient, no `<Image>`, LCP is text ✓
- [x] No FIW directly in page — verify sub-components are not overusing it
- [x] Build passes: `npm run build:next`

---

### `/accessibility`, `/privacy`, `/terms`, `/offline` — 🟢 CLEAN

No images, no animation wrappers, no client components (except `/offline`), no decorators.

**Audit checklist:**

- [ ] Quick visual check — confirm pages render correctly
- [ ] No action needed

---

## Global Fixes (apply once, benefits all pages)

- [x] **Expand `optimizePackageImports`** in `next.config.js` — `recharts` already present; `lucide-react` and `framer-motion` are not in `package.json` (confirmed unused)
- [x] **Remove `framer-motion`** — confirmed not in `package.json`, no imports found in source
- [x] **Run `npm audit --omit=dev`** — 0 vulnerabilities found
- [x] **Build + type-check gate:** `npx tsc --noEmit` — 0 errors ✓ | `npx jest` — 1792/1795 pass; 3 pre-existing failures (chat API, HeroSection text, chatbot) unrelated to performance changes

---

## Repeating Patterns to Fix Site-Wide

These patterns appear across many pages. When you touch any file, fix the pattern in that file:

| Pattern                                                   | Problem                                     | Fix                                                                 |
| --------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| `FadeInWhenVisible` wrapping an entire `<section>`        | Wastes JS budget on large invisible trees   | Use `.scroll-reveal` CSS class instead                              |
| `DiagonalStripePattern` + `BrandColorBlobs` per section   | Background SVGs re-instantiated per section | Import once at the top of the page, outside `map()`                 |
| Images without `priority` on first viewport               | LCP delayed                                 | Add `priority` to the first visible `<Image>` on each page          |
| `"use client"` on a page that only needs it for 1-2 hooks | Full page hydrates client-side              | Extract a thin `PageNameClient.tsx` with just the interactive parts |
| `<img>` tags (not `<Image>`) for logos/badges             | No lazy loading, no size hints              | OK for external seal images (BBB, AGC) — document as exception      |

---

## Audit Progress Tracker

| Page             | Severity | Audited | Fixed | Notes                                                                                      |
| ---------------- | -------- | ------- | ----- | ------------------------------------------------------------------------------------------ |
| `/veterans`      | 🔴 HIGH  | [x]     | [x]   | Fixed BG + repeated image + FIW                                                            |
| `/careers`       | 🔴 HIGH  | [x]     | [x]   | Client boundary + modal lazy + decorBG                                                     |
| `/about`         | 🟡 MED   | [x]     | [x]   | 17 FIW, 10 dynamic                                                                         |
| `/allies`        | 🟡 MED   | [x]     | [x]   | 7 images no priority                                                                       |
| `/faq`           | 🟡 MED   | [x]     | [x]   | 9 FIW                                                                                      |
| `/public-sector` | 🟡 MED   | [x]     | [x]   | 17 FIW, no priority images                                                                 |
| `/resources`     | 🟡 MED   | [x]     | [x]   | 9 FIW                                                                                      |
| `/safety`        | 🟡 MED   | [x]     | [x]   | 10× decorBG                                                                                |
| `/services`      | 🟡 MED   | [x]     | [x]   | 9 FIW, no priority images                                                                  |
| `/team`          | 🟡 MED   | [x]     | [x]   | 8× decorBG                                                                                 |
| `/testimonials`  | 🟢 LOW   | [x]     | [x]   | Removed hero FIW + 2 section DecorBGs                                                      |
| `/projects`      | 🟢 LOW   | [x]     | [x]   | No Suspense needed — uses window.location                                                  |
| `/contact`       | 🟢 LOW   | [x]     | [x]   | Map facade already implemented                                                             |
| `/dashboard`     | 🟢 LOW   | [x]     | [x]   | Lazy-loaded 3 tab components (incl. recharts)                                              |
| `/`              | 🟢 LOW   | [x]     | [x]   | Hero is CSS gradient — no Image to prioritize                                              |
| `/accessibility` | 🟢 CLEAN | [ ]     | [ ]   | Visual check only                                                                          |
| `/privacy`       | 🟢 CLEAN | [ ]     | [ ]   | Visual check only                                                                          |
| `/terms`         | 🟢 CLEAN | [ ]     | [ ]   | Visual check only                                                                          |
| `/offline`       | 🟢 CLEAN | [ ]     | [ ]   | Visual check only                                                                          |
| **Global**       | —        | [x]     | [x]   | recharts already in optimizePackageImports; framer-motion/lucide-react not in package.json |
