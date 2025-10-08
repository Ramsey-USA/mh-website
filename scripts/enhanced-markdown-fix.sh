#!/bin/bash

# Enhanced Markdown Fix Script with file-specific configurations
# Handles README files and other markdown files with appropriate configs

set -e

echo "🔧 Enhanced Markdown Linting Fix"
echo "================================"

# Function to fix markdown with appropriate config
fix_markdown_file() {
    local file="$1"
    local basename_file=$(basename "$file")
    
    echo "🔄 Processing: $file"
    
    # Use specific config for README files
    if [[ "$basename_file" == "README.md" ]]; then
        if command -v markdownlint >/dev/null 2>&1; then
            markdownlint --fix --config .markdownlint-readme.json "$file" 2>/dev/null || true
        fi
    else
        # Use default config for other files
        if command -v markdownlint >/dev/null 2>&1; then
            markdownlint --fix "$file" 2>/dev/null || true
        fi
    fi
    
    # Apply universal fixes
    # Fix fenced code blocks without language
    sed -i 's/^```$/```text/' "$file" 2>/dev/null || true
    
    # Ensure single trailing newline
    # Remove trailing whitespace and ensure single newline
    sed -i 's/[[:space:]]*$//' "$file" 2>/dev/null || true
    # Ensure file ends with exactly one newline
    if [ -s "$file" ] && [ "$(tail -c1 "$file" | wc -l)" -eq 0 ]; then
        echo "" >> "$file"
    fi
    
    echo "   ✅ Fixed: $file"
}

# If specific file provided, process just that file
if [ $# -eq 1 ] && [ -f "$1" ]; then
    echo "📄 Processing single file: $1"
    fix_markdown_file "$1"
    echo ""
    echo "🎯 Single file processing complete!"
    exit 0
fi

# Otherwise, process all markdown files
cd /workspaces/mh-website

# Count total files
total_files=$(find . -name "*.md" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/.next/*" | wc -l)
echo "📁 Found $total_files markdown files to process"

current=0

# Process all markdown files
find . -name "*.md" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/.next/*" | sort | while read -r file; do
    current=$((current + 1))
    echo "[$current/$total_files] Processing: $(basename "$file")"
    fix_markdown_file "$file"
done

echo ""
echo "🎉 Enhanced markdown linting fixes complete!"
echo "📋 Applied fixes:"
echo "   • README.md files: Used custom config (allows HTML, long lines)"
echo "   • Other .md files: Used standard markdown linting rules"
echo "   • All files: Fixed code blocks, trailing whitespace, newlines"
echo ""
echo "💡 Next steps:"
echo "   • Run your linter to verify fixes"
echo "   • Commit the changes if satisfied"