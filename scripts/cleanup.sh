#!/bin/bash

# Cleanup Script for MH Website
# Removes build artifacts and temporary files to reduce repository size

set -e

echo "🧹 Starting cleanup process..."

# Function to check size before and after
check_size() {
    if [ -d "$1" ] || [ -f "$1" ]; then
        du -sh "$1" 2>/dev/null || echo "0B"
    else
        echo "0B"
    fi
}

# Clean Next.js build artifacts
echo "🔄 Cleaning Next.js artifacts..."
if [ -d ".next" ]; then
    NEXT_SIZE_BEFORE=$(check_size ".next")
    rm -rf .next/cache
    rm -rf .next/static
    rm -rf .next/server
    NEXT_SIZE_AFTER=$(check_size ".next")
    echo "   ✅ Next.js: $NEXT_SIZE_BEFORE → $NEXT_SIZE_AFTER"
else
    echo "   ℹ️  No .next directory found"
fi

# Clean TypeScript build info
echo "🔄 Cleaning TypeScript artifacts..."
if [ -f "tsconfig.tsbuildinfo" ]; then
    TS_SIZE=$(check_size "tsconfig.tsbuildinfo")
    rm -f tsconfig.tsbuildinfo
    echo "   ✅ Removed tsconfig.tsbuildinfo ($TS_SIZE)"
else
    echo "   ℹ️  No TypeScript build info found"
fi

# Clean test artifacts
echo "🔄 Cleaning test artifacts..."
if [ -d "test-results" ]; then
    TEST_SIZE=$(check_size "test-results")
    rm -rf test-results/*
    echo "   ✅ Cleaned test-results ($TEST_SIZE)"
fi

if [ -d "playwright-report" ]; then
    PLAYWRIGHT_SIZE=$(check_size "playwright-report")
    rm -rf playwright-report/*
    echo "   ✅ Cleaned playwright-report ($PLAYWRIGHT_SIZE)"
fi

# Clean coverage reports
echo "🔄 Cleaning coverage reports..."
if [ -d "coverage" ]; then
    COVERAGE_SIZE=$(check_size "coverage")
    rm -rf coverage
    echo "   ✅ Cleaned coverage ($COVERAGE_SIZE)"
fi

# Clean temporary files
echo "🔄 Cleaning temporary files..."
find . -name "*.tmp" -type f -delete
find . -name "*.temp" -type f -delete
find . -name ".DS_Store" -type f -delete
find . -name "Thumbs.db" -type f -delete
echo "   ✅ Cleaned temporary files"

# Clean old log files
echo "🔄 Cleaning log files..."
find . -name "*.log" -type f -mtime +7 -delete
find . -name "npm-debug.log*" -type f -delete
find . -name "yarn-debug.log*" -type f -delete
find . -name "yarn-error.log*" -type f -delete
echo "   ✅ Cleaned old log files"

# Show disk usage after cleanup
echo ""
echo "📊 Current disk usage by directory:"
du -sh */ 2>/dev/null | sort -hr | head -10

echo ""
echo "🎉 Cleanup complete!"
echo "💡 Run 'npm run build' to regenerate optimized build files when needed."