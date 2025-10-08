#!/bin/bash

# Final Markdown Lint Fix - Comprehensive Clean
echo "🔧 Final Markdown Linting - Comprehensive Fix"
echo "============================================="
echo ""

cd /workspaces/mh-website

# Find all actual markdown files (excluding backups)
echo "📝 Finding all markdown files (excluding backups)..."
find docs/ -name "*.md" -not -path "*/.*" > /tmp/md_files.txt

echo "📊 Found $(wc -l < /tmp/md_files.txt) markdown files"
echo ""

fixed_files=0
total_fixes=0

while read -r file; do
    if [ ! -f "$file" ]; then
        continue
    fi
    
    # Create temporary file
    temp_file=$(mktemp)
    cp "$file" "$temp_file"
    
    file_modified=false
    
    # Fix MD040: Fenced code blocks without language
    if grep -q "^```$" "$file"; then
        echo "🔧 Fixing MD040 in: $(basename "$file")"
        sed -i 's/^```$/```text/' "$temp_file"
        file_modified=true
        total_fixes=$((total_fixes + 1))
    fi
    
    # Fix MD036: Bold text used as headings (specific patterns)
    if grep -q "^\*\*.*\*\*$" "$file"; then
        echo "🔧 Fixing MD036 in: $(basename "$file")"
        # Convert standalone bold lines to headings
        sed -i 's/^\*\*\([0-9]\+\. [^*]*\)\*\*$/#### \1/' "$temp_file"
        sed -i 's/^\*\*\([^*]*\)\*\*$/#### \1/' "$temp_file"
        file_modified=true
        total_fixes=$((total_fixes + 1))
    fi
    
    # Fix MD026: Remove trailing punctuation from headings
    if grep -q "^#.*:$" "$file"; then
        echo "🔧 Fixing MD026 in: $(basename "$file")"
        sed -i 's/^###\(.*\):$/###\1/' "$temp_file"
        file_modified=true
        total_fixes=$((total_fixes + 1))
    fi
    
    # Only update file if changes were made
    if [ "$file_modified" = true ]; then
        cp "$temp_file" "$file"
        fixed_files=$((fixed_files + 1))
    fi
    
    rm "$temp_file"
    
done < /tmp/md_files.txt

echo ""
echo "📊 Markdown Linting Fix Complete!"
echo "=================================="
echo "Files checked: $(wc -l < /tmp/md_files.txt)"
echo "Files modified: $fixed_files"
echo "Total fixes applied: $total_fixes"

# Clean up
rm /tmp/md_files.txt

echo ""
echo "✅ All markdown linting issues should now be resolved!"
echo ""
echo "🎯 To verify: Run your markdown linter again"