#!/bin/bash

# Universal Markdown Linting Fix Script
# Uses existing tools to fix markdown issues

set -e

echo "🔧 Universal Markdown Linting Fix"
echo "================================="

# Function to fix a single file using the existing simple fix
fix_single_file() {
    local file="$1"
    echo "🔄 Processing: $file"
    
    # Use the existing simple markdown fix that we know works
    if [ -f "/workspaces/mh-website/scripts/simple-markdown-fix.sh" ]; then
        bash /workspaces/mh-website/scripts/simple-markdown-fix.sh "$file" > /dev/null 2>&1
    else
        # Fallback: manual sed commands for common issues
        # Add blank lines around headings
        sed -i '/^#{1,6} /{
            x; /./{x; i\
; x}; x
        }' "$file"
        
        # Ensure single trailing newline
        sed -i -e :a -e '/^\s*$/{$d;N;ba' -e '}' "$file"
        echo "" >> "$file"
    fi
    
    echo "   ✅ Fixed: $file"
}

# Count total files to process
total_files=$(find /workspaces/mh-website -name "*.md" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/.next/*" | wc -l)
echo "📁 Found $total_files markdown files to process"

current=0

# Process all markdown files
find /workspaces/mh-website -name "*.md" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" ! -path "*/.next/*" | while read -r file; do
    current=$((current + 1))
    echo "[$current/$total_files] Processing: $(basename "$file")"
    fix_single_file "$file"
done

echo ""
echo "🎉 Markdown linting fixes complete!"
echo "📋 Common issues addressed:"
echo "   • MD022: Blank lines around headings"
echo "   • MD032: Blank lines around lists"  
echo "   • MD031: Blank lines around code blocks"
echo "   • MD047: Single trailing newline"
echo ""
echo "💡 Next steps:"
echo "   • Run your linter to verify fixes"
echo "   • Commit the changes if satisfied"