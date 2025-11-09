#!/bin/bash

# Fix Lint Warnings Script
# This script systematically fixes common ESLint warnings

set -e

echo "🔧 Starting systematic lint warning fixes..."

# Function to prefix unused variables with underscore
fix_unused_vars() {
    local file="$1"
    echo "  Fixing unused variables in: $file"
    
    # This is a simplified example - we'd need more sophisticated sed/awk for real use
    # In practice, manual fixes or ESLint's --fix with custom rules works better
}

# Fix files with 'index' unused in map functions
echo "📝 Fixing unused 'index' parameters in map functions..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/\.map((item, index) =>/\.map((item, _index) =>/g' {} +
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/\.map((item, index,/\.map((item, _index,/g' {} +

# Fix common unused imports patterns
echo "📝 Fixing unused React import..."
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "^import React" {} + | while read file; do
    # Check if React is actually used (JSX or React.something)
    if ! grep -q "React\." "$file" && ! grep -q "<.*>" "$file"; then
        echo "  Removing unused React import from: $file"
        sed -i '/^import React,/d' "$file"
    fi
done

echo "✅ Automated fixes complete!"
echo "⚠️  Note: Some warnings require manual intervention"
echo "📊 Run 'npm run lint' to see remaining warnings"
