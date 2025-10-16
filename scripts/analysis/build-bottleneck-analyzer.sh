#!/usr/bin/env bash

# Build Performance Analysis Script
# Analyzes what's taking the most time in the build process

echo "🔍 Analyzing Build Performance Bottlenecks"
echo "=========================================="

# Check large source files that might slow down compilation
echo ""
echo "📁 Large Source Files (>30KB):"
find src -name "*.ts" -o -name "*.tsx" | xargs ls -la | awk '$5 > 30000 {print $5/1024 "KB", $9}' | sort -nr

# Check total TypeScript files
echo ""
echo "📊 TypeScript File Count:"
ts_count=$(find src -name "*.ts" -o -name "*.tsx" | wc -l)
echo "Total TS/TSX files: $ts_count"

# Check node_modules size (impacts bundle analysis)
echo ""
echo "📦 Dependencies Analysis:"
if [ -d "node_modules" ]; then
    echo "node_modules size: $(du -sh node_modules | cut -f1)"
    echo "Package count: $(find node_modules -maxdepth 1 -type d | wc -l)"
fi

# Check current .next cache size
echo ""
echo "🗄️  Build Cache Analysis:"
if [ -d ".next" ]; then
    echo "Current .next size: $(du -sh .next | cut -f1)"
    echo "Cache directories:"
    ls -la .next/ | grep -E "cache|webpack"
else
    echo "No .next directory (clean build)"
fi

# Check build output complexity
echo ""
echo "📋 Build Complexity Indicators:"
echo "Pages in app directory: $(find src/app -name "page.tsx" -o -name "page.ts" | wc -l)"
echo "API routes: $(find src/app -path "*/api/*" -name "route.ts" | wc -l)"
echo "Components: $(find src/components -name "*.tsx" -o -name "*.ts" | wc -l)"

# Memory and CPU info
echo ""
echo "🖥️  System Resources:"
echo "Available memory: $(free -h | awk '/^Mem:/ {print $7}')"
echo "CPU cores: $(nproc)"
echo "Node.js version: $(node --version)"

echo ""
echo "💡 Optimization Recommendations:"
echo "================================"

# Large file recommendations
large_files=$(find src -name "*.ts" -o -name "*.tsx" | xargs ls -la | awk '$5 > 50000 {print $9}' | wc -l)
if [ "$large_files" -gt 0 ]; then
    echo "🔴 Split large files (>50KB) into smaller modules"
fi

# TypeScript file count recommendations  
if [ "$ts_count" -gt 200 ]; then
    echo "🟡 Consider code splitting for $ts_count TypeScript files"
fi

# Cache recommendations
if [ ! -d ".next/cache" ]; then
    echo "🟡 Build cache not present - first build will be slower"
fi

echo ""
echo "🚀 Quick Build Optimization Tests:"
echo "=================================="
echo "1. Test without linting: npm run build:fast"
echo "2. Test with more memory: npm run build:profile"  
echo "3. Clear cache and rebuild: rm -rf .next && npm run build"
echo "4. Profile bundle size: npm run build:analyze"