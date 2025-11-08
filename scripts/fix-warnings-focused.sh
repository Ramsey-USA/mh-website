#!/bin/bash

# Focused script to fix warnings systematically
# This script fixes one file at a time with verification

set -e

echo "🎯 Systematic Warning Fixer"
echo "============================"
echo ""

# Function to fix a single file
fix_file() {
    local file=$1
    local backup="${file}.backup"
    
    echo "📄 Processing: $file"
    
    # Create backup
    cp "$file" "$backup"
    
    # Fix 1: Replace ': any' with ': unknown' in parameters and types
    # But preserve Record<string, any> patterns for now
    sed -i 's/\([(,]\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:\s*\)any\(\s*[),=]\)/\1unknown\2/g' "$file"
    
    # Fix 2: Replace '...args: any[]' with '...args: unknown[]'
    sed -i 's/\.\.\.args: any\[\]/...args: unknown[]/g' "$file"
    sed -i 's/\.\.\.data: any\[\]/...data: unknown[]/g' "$file"
    
    # Fix 3: Prefix unused parameters (common patterns)
    sed -i 's/private handleError(\([a-zA-Z]*\): Error)/private handleError(_\1: Error)/g' "$file"
    sed -i "s/\(async\s\+[a-zA-Z_][a-zA-Z0-9_]*\s*(\)\([a-zA-Z_][a-zA-Z0-9_]*\)\(:\s*[^)]\+)\s*{[^}]*\/\/.*unused\)/\1_\2\3/g" "$file"
    
    # Fix 4: Replace common Record<string, any> with Record<string, unknown>
    sed -i 's/Record<string, any>/Record<string, unknown>/g' "$file"
    
    # Check if file compiles
    if npx eslint "$file" --quiet 2>/dev/null; then
        echo "  ✅ File compiles - keeping changes"
        rm "$backup"
        return 0
    else
        echo "  ❌ Compilation error - reverting"
        mv "$backup" "$file"
        return 1
    fi
}

# Get list of files with most warnings
files=$(npx eslint src --ext .js,.jsx,.ts,.tsx --format json 2>/dev/null | \
    jq -r '.[] | select(.messages | length > 5) | .filePath' | \
    head -20)

total_fixed=0
total_failed=0

for file in $files; do
    if fix_file "$file"; then
        ((total_fixed++))
    else
        ((total_failed++))
    fi
    echo ""
done

echo "============================"
echo "✨ Summary:"
echo "   Fixed: $total_fixed files"
echo "   Failed: $total_failed files"
echo ""
echo "Running final check..."
npm run build --silent 2>&1 | grep -E "(Compiled|Failed)" || true
