# Archived Components

This directory contains deprecated components that have been replaced with better solutions.

## calculator-deprecated-2025-11-10

**Archived:** November 10, 2025  
**Reason:** Replaced with AI Estimator (`/estimator` page)

### What was removed

- `ProjectCostCalculator.tsx` (714 lines) - Basic calculator widget
- `QuickCostCalculator.tsx` (184 lines) - Simplified calculator
- `index.ts` - Export file

### Why removed

- **Redundancy**: Two separate estimation systems (simple calculator vs AI estimator)
- **User confusion**: Unclear which tool to use
- **Maintenance burden**: Two codebases to maintain
- **Weaker UX**: Simple calculator undermined sophisticated AI system
- **Brand dilution**: Calculator felt "cheap" vs AI estimator's intelligence

### Replacement

All estimation functionality now uses the AI-powered estimator at `/estimator`:

- Multi-step intelligent form
- 500+ project database
- Regional Pacific Northwest data
- AI-powered cost analysis (`CostAnalyzer.ts`)
- Detailed breakdowns (materials, labor, permits)
- Progress saving to localStorage
- Veteran discounts

### Migration

- **Homepage** (`/src/app/page.tsx`): Replaced with AI Estimator CTA section
- **Services Page** (`/src/app/services/page.tsx`): Replaced with AI Estimator CTA section

Both pages now have compelling CTAs that direct users to the superior `/estimator` experience.

### Files Affected

- ✅ `/src/app/page.tsx` - Removed `ProjectCostCalculator`, added AI CTA
- ✅ `/src/app/services/page.tsx` - Removed `QuickCostCalculator`, added AI CTA

### Recovery

If needed, these components can be restored from this archive or git history:

```bash
git log --all --full-history -- "src/components/calculator/*"
```

---

**Status:** Phase 1 Complete ✅  
**Next Phase:** Enhance AI Estimator with quick mode and homepage integration
