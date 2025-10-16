#!/usr/bin/env bash

echo "📊 Large File Splitting Analysis"
echo "================================"

echo ""
echo "🔴 Files over 50KB (CRITICAL for splitting):"
find src -name "*.ts" -o -name "*.tsx" | xargs ls -la | awk '$5 > 50000 {print $5/1024 "KB", $9}' | sort -nr

echo ""
echo "🟡 Files 30-50KB (should consider splitting):"
find src -name "*.ts" -o -name "*.tsx" | xargs ls -la | awk '$5 > 30000 && $5 <= 50000 {print $5/1024 "KB", $9}' | sort -nr

echo ""
echo "💡 Splitting Recommendations:"
echo "============================="

# Check militaryConstructionAI.ts
if [ -f "src/lib/militaryConstructionAI.ts" ]; then
    size=$(stat -c%s "src/lib/militaryConstructionAI.ts" 2>/dev/null || stat -f%z "src/lib/militaryConstructionAI.ts" 2>/dev/null)
    if [ $size -gt 50000 ]; then
        echo "🚨 CRITICAL: militaryConstructionAI.ts ($(($size/1024))KB)"
        echo "   Split into: ai-core.ts, ai-utils.ts, ai-types.ts, ai-config.ts"
        echo "   Expected time saved: 3-4 seconds"
    fi
fi

# Check page.tsx
if [ -f "src/app/page.tsx" ]; then
    size=$(stat -c%s "src/app/page.tsx" 2>/dev/null || stat -f%z "src/app/page.tsx" 2>/dev/null)
    if [ $size -gt 50000 ]; then
        echo "🚨 CRITICAL: app/page.tsx ($(($size/1024))KB)"
        echo "   Split into: Hero.tsx, Features.tsx, Services.tsx, Footer.tsx"
        echo "   Expected time saved: 2-3 seconds"
    fi
fi

echo ""
echo "🎯 IMPACT ESTIMATE:"
echo "=================="
echo "Current build: 16-17s"
echo "After file splitting: 10-12s"
echo "After ultra-config: 8-10s"
echo "Total improvement: 6-9s (35-53% faster)"
