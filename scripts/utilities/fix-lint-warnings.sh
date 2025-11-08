#!/bin/bash

# MH Construction - Lint Warning Fixer
# Helps systematically address ESLint warnings
# Usage: ./scripts/utilities/fix-lint-warnings.sh [phase]

set -e

PHASE="${1:-report}"

echo "========================================="
echo "MH Construction - Lint Warning Fixer"
echo "========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

case "$PHASE" in
  "report")
    echo -e "${BLUE}📊 Generating Lint Report...${NC}"
    echo ""
    
    # Create reports directory if it doesn't exist
    mkdir -p reports
    
    # Generate full report
    npm run lint 2>&1 | tee reports/lint-full-report.txt
    
    # Generate summary by type
    echo ""
    echo -e "${BLUE}📋 Warning Summary by Type:${NC}"
    echo ""
    grep "warning" reports/lint-full-report.txt | \
      sed 's/.*@typescript-eslint/@typescript-eslint/g' | \
      sed 's/.*no-console/no-console/g' | \
      sed 's/.*require-await/require-await/g' | \
      sed 's/.*jsx-a11y/jsx-a11y/g' | \
      grep -E "^(@typescript-eslint|no-console|require-await|jsx-a11y|next/)" | \
      cut -d' ' -f1 | \
      sort | uniq -c | sort -rn | \
      awk '{printf "  %-50s %s\n", $2, $1}'
    
    echo ""
    echo -e "${GREEN}✅ Report saved to: reports/lint-full-report.txt${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Review the report"
    echo "  2. Run: ./scripts/utilities/fix-lint-warnings.sh phase1"
    echo ""
    ;;
    
  "phase1")
    echo -e "${YELLOW}🔧 Phase 1: High Priority Fixes${NC}"
    echo "  - Accessibility issues"
    echo "  - Critical 'any' types"
    echo ""
    
    # Find accessibility issues
    echo -e "${BLUE}Finding accessibility issues...${NC}"
    npm run lint 2>&1 | grep "jsx-a11y" | head -20
    
    echo ""
    echo -e "${YELLOW}Action Required:${NC}"
    echo "  1. Review components with onClick on <div> elements"
    echo "  2. Replace with <button> or add keyboard handlers"
    echo "  3. Add role and tabIndex attributes where needed"
    echo ""
    echo "See: docs/technical/configuration-guide.md#5-accessibility-issues"
    echo ""
    ;;
    
  "phase2")
    echo -e "${YELLOW}🔧 Phase 2: Medium Priority Fixes${NC}"
    echo "  - Console statements"
    echo "  - Obvious unused variables"
    echo ""
    
    # Find console statements (excluding service worker)
    echo -e "${BLUE}Finding console statements...${NC}"
    npm run lint 2>&1 | grep "no-console" | grep -v "sw.js" | head -10
    
    echo ""
    echo -e "${YELLOW}Quick Fix Available:${NC}"
    echo "  Remove debug console.log statements:"
    echo "  find src -name '*.ts' -o -name '*.tsx' | xargs grep -l 'console\\.log'"
    echo ""
    echo "⚠️  Manual review recommended before removing"
    echo ""
    ;;
    
  "phase3")
    echo -e "${YELLOW}🔧 Phase 3: Low Priority Fixes${NC}"
    echo "  - Remaining unused variables"
    echo "  - Async/await consistency"
    echo "  - Remaining 'any' types"
    echo ""
    
    # Find unused variables
    echo -e "${BLUE}Finding unused variables...${NC}"
    npm run lint 2>&1 | grep "no-unused-vars" | head -10
    
    echo ""
    echo -e "${YELLOW}Recommended Approach:${NC}"
    echo "  1. Review each unused variable individually"
    echo "  2. Delete if truly unused"
    echo "  3. Prefix with '_' if intentionally unused"
    echo "  4. Document exports for future use"
    echo ""
    ;;
    
  "autofix")
    echo -e "${YELLOW}🔧 Running ESLint Auto-Fix...${NC}"
    echo ""
    echo "This will automatically fix what ESLint can handle:"
    echo "  - Import sorting"
    echo "  - Some formatting issues"
    echo ""
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
      npm run lint:fix
      echo ""
      echo -e "${GREEN}✅ Auto-fix complete${NC}"
      echo ""
      echo "Run 'npm run lint' to see remaining warnings"
    else
      echo "Cancelled."
    fi
    ;;
    
  "compare")
    echo -e "${BLUE}📊 Comparing with Baseline...${NC}"
    echo ""
    
    if [ ! -f "reports/lint-baseline.txt" ]; then
      echo -e "${YELLOW}⚠️  No baseline found. Creating one now...${NC}"
      npm run lint 2>&1 > reports/lint-baseline.txt
      echo -e "${GREEN}✅ Baseline created: reports/lint-baseline.txt${NC}"
      echo ""
      echo "Make your fixes, then run: ./scripts/utilities/fix-lint-warnings.sh compare"
    else
      npm run lint 2>&1 > reports/lint-current.txt
      
      BASELINE_COUNT=$(grep -c "warning" reports/lint-baseline.txt || echo "0")
      CURRENT_COUNT=$(grep -c "warning" reports/lint-current.txt || echo "0")
      IMPROVEMENT=$((BASELINE_COUNT - CURRENT_COUNT))
      
      echo -e "${BLUE}Results:${NC}"
      echo "  Baseline warnings: $BASELINE_COUNT"
      echo "  Current warnings:  $CURRENT_COUNT"
      
      if [ $IMPROVEMENT -gt 0 ]; then
        echo -e "  Improvement:       ${GREEN}▼ $IMPROVEMENT warnings fixed${NC}"
      elif [ $IMPROVEMENT -lt 0 ]; then
        echo -e "  Change:            ${RED}▲ $((-IMPROVEMENT)) new warnings${NC}"
      else
        echo "  Change:            No change"
      fi
      
      echo ""
      echo "Detailed diff saved to: reports/lint-diff.txt"
      diff reports/lint-baseline.txt reports/lint-current.txt > reports/lint-diff.txt || true
    fi
    ;;
    
  *)
    echo "Usage: $0 [phase]"
    echo ""
    echo "Available phases:"
    echo "  report   - Generate detailed lint warning report (default)"
    echo "  phase1   - Show Phase 1 fixes (High Priority: Accessibility & Any types)"
    echo "  phase2   - Show Phase 2 fixes (Medium Priority: Console & Unused vars)"
    echo "  phase3   - Show Phase 3 fixes (Low Priority: Remaining issues)"
    echo "  autofix  - Run ESLint auto-fix"
    echo "  compare  - Compare current warnings with baseline"
    echo ""
    echo "Workflow:"
    echo "  1. ./scripts/utilities/fix-lint-warnings.sh report"
    echo "  2. ./scripts/utilities/fix-lint-warnings.sh phase1"
    echo "  3. Make fixes"
    echo "  4. ./scripts/utilities/fix-lint-warnings.sh compare"
    echo ""
    exit 1
    ;;
esac
