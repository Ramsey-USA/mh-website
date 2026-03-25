#!/bin/bash

###############################################################################
# MH Construction - Code Quality Cleanup Check
# Automated checks for code quality issues
###############################################################################

set -e

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║       MH Construction - Code Quality Checks              ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

ISSUES_FOUND=0

# =============================================================================
# 1. Check for commented-out code blocks
# =============================================================================
echo -e "${BLUE}1. Checking for commented-out code blocks...${NC}"
COMMENTED_BLOCKS=$(find src -name "*.ts" -o -name "*.tsx" | xargs grep -l "^\s*//.*" | \
  xargs grep -c "^\s*//.*" 2>/dev/null | \
  awk -F: '$2 > 5 {print $1": "$2" comment lines"}' || true)

if [ -n "$COMMENTED_BLOCKS" ]; then
  echo -e "${YELLOW}⚠️  Files with excessive comments:${NC}"
  echo "$COMMENTED_BLOCKS"
  ((ISSUES_FOUND++))
else
  echo -e "${GREEN}✓ No excessive commented code found${NC}"
fi
echo ""

# =============================================================================
# 2. Check for console.log statements
# =============================================================================
echo -e "${BLUE}2. Checking for console.log statements...${NC}"
CONSOLE_LOGS=$(grep -r "console\.log" src/ --include="*.ts" --include="*.tsx" 2>/dev/null | \
  grep -v "src/lib/utils/logger.ts" || true)

if [ -n "$CONSOLE_LOGS" ]; then
  echo -e "${YELLOW}⚠️  Found console.log statements (use logger instead):${NC}"
  echo "$CONSOLE_LOGS" | head -10
  if [ $(echo "$CONSOLE_LOGS" | wc -l) -gt 10 ]; then
    echo "... and $(($(echo "$CONSOLE_LOGS" | wc -l) - 10)) more"
  fi
  ((ISSUES_FOUND++))
else
  echo -e "${GREEN}✓ No console.log statements found${NC}"
fi
echo ""

# =============================================================================
# 3. Check for @ts-ignore / @ts-expect-error
# =============================================================================
echo -e "${BLUE}3. Checking for TypeScript ignore directives...${NC}"
TS_IGNORES=$(grep -r "@ts-ignore\|@ts-expect-error\|@ts-nocheck" src/ --include="*.ts" --include="*.tsx" 2>/dev/null || true)

if [ -n "$TS_IGNORES" ]; then
  echo -e "${YELLOW}⚠️  Found TypeScript ignore directives:${NC}"
  echo "$TS_IGNORES" | wc -l | xargs echo "Total:"
  ((ISSUES_FOUND++))
else
  echo -e "${GREEN}✓ No TypeScript ignore directives found${NC}"
fi
echo ""

# =============================================================================
# 4. Check for large files (>500 lines)
# =============================================================================
echo -e "${BLUE}4. Checking for large files...${NC}"
LARGE_FILES=$(find src -name "*.ts" -o -name "*.tsx" | while read file; do
  lines=$(wc -l < "$file")
  if [ $lines -gt 500 ]; then
    echo "$file: $lines lines"
  fi
done | head -10)

if [ -n "$LARGE_FILES" ]; then
  echo -e "${YELLOW}⚠️  Large files (>500 lines) - consider refactoring:${NC}"
  echo "$LARGE_FILES"
else
  echo -e "${GREEN}✓ No excessively large files found${NC}"
fi
echo ""

# =============================================================================
# 5. Check for unused dependencies
# =============================================================================
echo -e "${BLUE}5. Checking for unused dependencies...${NC}"
if command -v depcheck &> /dev/null; then
  UNUSED_DEPS=$(npx depcheck --ignores="@types/*,eslint-*,prettier,husky,@commitlint/*,postcss,autoprefixer,jest-environment-jsdom,chalk" --json | \
    node -e "const data = JSON.parse(require('fs').readFileSync(0)); console.log(data.dependencies.join('\n'))" 2>/dev/null || true)
  
  if [ -n "$UNUSED_DEPS" ]; then
    echo -e "${YELLOW}⚠️  Potentially unused dependencies:${NC}"
    echo "$UNUSED_DEPS"
    ((ISSUES_FOUND++))
  else
    echo -e "${GREEN}✓ No unused dependencies found${NC}"
  fi
else
  echo -e "${YELLOW}⚠️  depcheck not installed - skipping${NC}"
fi
echo ""

# =============================================================================
# 6. Check bundle size
# =============================================================================
echo -e "${BLUE}6. Checking bundle size...${NC}"
if [ -d ".next" ]; then
  BUNDLE_SIZE=$(du -sh .next/static/chunks/*.js 2>/dev/null | sort -hr | head -5 || true)
  if [ -n "$BUNDLE_SIZE" ]; then
    echo -e "${GREEN}Top 5 bundle chunks:${NC}"
    echo "$BUNDLE_SIZE"
  fi
else
  echo -e "${YELLOW}⚠️  .next directory not found - run 'npm run build' first${NC}"
fi
echo ""

# =============================================================================
# 7. Check for duplicate code patterns
# =============================================================================
echo -e "${BLUE}7. Checking for duplicate imports...${NC}"
DUPLICATE_IMPORTS=$(grep -rh "^import.*dynamic.*from.*next/dynamic" src/app --include="*.tsx" 2>/dev/null | \
  sort | uniq -c | awk '$1 > 3 {print}' || true)

if [ -n "$DUPLICATE_IMPORTS" ]; then
  echo -e "${YELLOW}⚠️  Duplicate dynamic import patterns found:${NC}"
  echo "$DUPLICATE_IMPORTS"
  echo "Tip: Consider using src/lib/utils/dynamic-imports.ts"
  ((ISSUES_FOUND++))
else
  echo -e "${GREEN}✓ No excessive duplicate imports found${NC}"
fi
echo ""

# =============================================================================
# Summary
# =============================================================================
echo -e "${BLUE}╔═══════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                      SUMMARY                             ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════════════════════╝${NC}"
echo ""

if [ $ISSUES_FOUND -eq 0 ]; then
  echo -e "${GREEN}✅ All checks passed! Code quality looks great!${NC}"
  exit 0
else
  echo -e "${YELLOW}⚠️  Found $ISSUES_FOUND issue(s) to review${NC}"
  echo ""
  echo "These are suggestions for improvement, not errors."
  echo "Review the items above and address as needed."
  exit 0
fi
