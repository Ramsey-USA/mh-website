#!/bin/bash

# Systematic Kebab-Case Conversion Script
# Converts all UPPER_CASE.md files to kebab-case.md

echo "🔧 MH Construction - Systematic Kebab-Case Conversion"
echo "================================================="

# Function to convert UPPER_CASE to kebab-case
convert_to_kebab() {
    echo "$1" | sed 's/_/-/g' | tr '[:upper:]' '[:lower:]'
}

# Function to rename file and track changes
rename_file() {
    local old_path="$1"
    local old_name=$(basename "$old_path")
    local dir_path=$(dirname "$old_path")
    local new_name=$(convert_to_kebab "$old_name")
    local new_path="$dir_path/$new_name"
    
    if [ "$old_name" != "$new_name" ]; then
        if [ -f "$old_path" ]; then
            mv "$old_path" "$new_path"
            echo "✅ $old_name → $new_name"
            return 0
        else
            echo "⚠️  File not found: $old_path"
            return 1
        fi
    else
        echo "ℹ️  Already kebab-case: $old_name"
        return 0
    fi
}

# Counter for changes
changes=0

echo ""
echo "📁 Processing /docs/project/ directory..."
for file in /workspaces/mh-website/docs/project/*_*.md; do
    if [ -f "$file" ]; then
        if rename_file "$file"; then
            ((changes++))
        fi
    fi
done

echo ""
echo "📁 Processing /docs/development/ directory..."
for file in /workspaces/mh-website/docs/development/*_*.md; do
    if [ -f "$file" ]; then
        if rename_file "$file"; then
            ((changes++))
        fi
    fi
done

echo ""
echo "📁 Processing /docs/deployment/ directory..."
for file in /workspaces/mh-website/docs/deployment/*_*.md; do
    if [ -f "$file" ]; then
        if rename_file "$file"; then
            ((changes++))
        fi
    fi
done

echo ""
echo "📁 Processing /docs/migrations/ directory..."
for file in /workspaces/mh-website/docs/migrations/*_*.md; do
    if [ -f "$file" ]; then
        if rename_file "$file"; then
            ((changes++))
        fi
    fi
done

echo ""
echo "📁 Processing /docs/partnerships/ directory..."
for file in /workspaces/mh-website/docs/partnerships/*_*.md; do
    if [ -f "$file" ]; then
        if rename_file "$file"; then
            ((changes++))
        fi
    fi
done

# Handle subdirectories
echo ""
echo "📁 Processing subdirectories..."
find /workspaces/mh-website/docs -name "*_*.md" -not -path "*/archive/*" | while read file; do
    if rename_file "$file"; then
        ((changes++))
    fi
done

echo ""
echo "🎉 Kebab-case conversion complete!"
echo "📊 Total files renamed: $changes"
echo ""
echo "⚠️  Important: Links may need updating after this conversion."
echo "🔍 Next step: Run link validation to check for broken references."