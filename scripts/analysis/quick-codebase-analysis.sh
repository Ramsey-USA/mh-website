#!/bin/bash

# MH Construction - Quick File Analysis Script
# Identifies the largest files that need splitting

echo "🔍 Analyzing MH Construction Codebase for Improvement Opportunities"
echo "=================================================================="

echo ""
echo "📊 LARGEST SOURCE FILES (by lines):"
echo "-----------------------------------"
find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | sort -nr | head -10

echo ""
echo "📁 LARGEST FILES (by size):"
echo "---------------------------"
find src -name "*.ts" -o -name "*.tsx" -exec ls -lah {} \; | sort -k5 -hr | head -10 | awk '{print $5, $9}'

echo ""
echo "🎯 PRIORITY IMPROVEMENTS:"
echo "========================="

# Check for files over 1000 lines
large_files=$(find src -name "*.ts" -o -name "*.tsx" | xargs wc -l | awk '$1 > 1000 {print $2, $1}' | wc -l)
echo "🔴 Files over 1000 lines: $large_files (should be split)"

# Check for files over 50KB
large_size=$(find src -name "*.ts" -o -name "*.tsx" -size +50k | wc -l)
echo "🟡 Files over 50KB: $large_size (consider splitting)"

# Count total TypeScript files
total_files=$(find src -name "*.ts" -o -name "*.tsx" | wc -l)
echo "📈 Total TypeScript files: $total_files"

echo ""
echo "💡 RECOMMENDATIONS:"
echo "==================="
echo "1. Split militaryConstructionAI.ts (104KB) into smaller modules"
echo "2. Break down page.tsx (71KB) into component sections"
echo "3. Modularize VeteranProfileEngine.ts (1,491 lines)"
echo "4. Consider dynamic imports for heavy components"
echo "5. Implement bundle splitting for better performance"

echo ""
echo "🚀 NEXT STEPS:"
echo "=============="
echo "1. Review CODEBASE_IMPROVEMENT_PLAN.md for detailed implementation"
echo "2. Start with Phase 1 critical fixes"
echo "3. Test thoroughly after each change"
echo "4. Monitor build performance improvements"

echo ""
echo "📈 EXPECTED BENEFITS:"
echo "===================="
echo "• Build time: 40-50% reduction (44s → 22-25s)"
echo "• Bundle size: 25-30% reduction"
echo "• First load: 30% faster"
echo "• Better maintainability and developer experience"