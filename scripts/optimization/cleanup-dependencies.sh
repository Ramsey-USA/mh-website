#!/bin/bash

# MH Website - Dependency Cleanup Script
# Removes unused dependencies to reduce bundle size

echo "🧹 Cleaning up unused dependencies..."

# Remove unused dependencies
npm uninstall \
  @radix-ui/react-alert-dialog \
  @tailwindcss/line-clamp \
  critters \
  web-push \
  react-syntax-highlighter \
  recharts

# Remove unused dev dependencies  
npm uninstall --save-dev \
  @lhci/cli \
  lighthouse \
  markdownlint

echo "✅ Dependency cleanup complete!"
echo "💾 Estimated bundle size reduction: 25-30%"
echo ""
echo "Next steps:"
echo "1. npm run build    # Test build"
echo "2. npm run dev      # Test functionality" 
echo "3. git add .        # Commit if successful"