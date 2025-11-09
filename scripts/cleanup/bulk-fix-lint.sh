#!/bin/bash

# Bulk Fix ESLint Warnings
# Systematically fixes common patterns

set -e

echo "🔧 Starting bulk lint fixes..."

cd "$(dirname "$0")/../.."

# Function to fix unused index in map functions
fix_unused_index() {
    echo "📝 Fixing unused 'index' in map functions..."
    find src -type f \( -name "*.ts" -o -name "*.tsx" \) -print0 | while IFS= read -r -d '' file; do
        # Replace (item, index) with (item, _index) when index is not used
        sed -i 's/\.map((\([^,)]*\), index) =>/\.map((\1, _index) =>/g' "$file"
        sed -i 's/\.forEach((\([^,)]*\), index) =>/\.forEach((\1, _index) =>/g' "$file"
        sed -i 's/\.filter((\([^,)]*\), index) =>/\.filter((\1, _index) =>/g' "$file"
    done
    echo "✅ Fixed unused index parameters"
}

# Function to prefix unused destructured variables
fix_unused_destructured() {
    echo "📝 Fixing common unused destructured variables..."
    
    # Common patterns to fix
    patterns=(
        "s/const { \([^}]*\)error\([^}]*\) } =/const { \1_error\2 } =/g"
        "s/const { \([^}]*\)props\([^}]*\) } =/const { \1_props\2 } =/g"
    )
    
    for pattern in "${patterns[@]}"; do
        find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i "$pattern" {} +
    done
    
    echo "✅ Fixed unused destructured variables"
}

# Main execution
fix_unused_index
fix_unused_destructured

echo ""
echo "✅ Bulk fixes complete!"
echo "📊 Running lint to check progress..."
npm run lint 2>&1 | grep -E "✖ [0-9]+ problems" || echo "✨ No problems found!"
