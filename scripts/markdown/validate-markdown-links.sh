#!/bin/bash

# Markdown Link Validator and Fixer
# Checks internal links and suggests improvements

set -e

echo "🔗 Markdown Link Validation and Enhancement"
echo "=========================================="

check_internal_links() {
    local file="$1"
    local base_dir=$(dirname "$file")
    local issues_found=0
    
    echo "🔍 Checking links in: $file"
    
    # Find all markdown links
    grep -n '\[.*\](.*)' "$file" | while IFS=: read -r line_num link_line; do
        # Extract link URL
        url=$(echo "$link_line" | sed -n 's/.*\[.*\](\([^)]*\)).*/\1/p')
        
        # Skip external links and anchors
        if [[ "$url" =~ ^https?:// ]] || [[ "$url" =~ ^# ]]; then
            continue
        fi
        
        # Check if internal file exists
        if [[ "$url" =~ \.md$ ]]; then
            if [[ "$url" =~ ^\./ ]]; then
                target_file="$base_dir/${url#./}"
            elif [[ "$url" =~ ^/ ]]; then
                target_file="/workspaces/mh-website${url}"
            else
                target_file="$base_dir/$url"
            fi
            
            if [ ! -f "$target_file" ]; then
                echo "   ❌ Line $line_num: Broken link -> $url"
                issues_found=$((issues_found + 1))
            else
                echo "   ✅ Line $line_num: Valid link -> $url"
            fi
        fi
    done
    
    return $issues_found
}

validate_link_text() {
    local file="$1"
    
    echo "📝 Checking link text quality in: $file"
    
    # Find links with poor descriptions
    grep -n '\[.*\](.*)' "$file" | while IFS=: read -r line_num link_line; do
        link_text=$(echo "$link_line" | sed -n 's/.*\[\([^]]*\)\].*/\1/p')
        
        # Check for poor link text
        if [[ "$link_text" =~ ^(here|click|link|this)$ ]]; then
            echo "   ⚠️  Line $line_num: Poor link text '$link_text' - consider more descriptive text"
        elif [ ${#link_text} -lt 3 ]; then
            echo "   ⚠️  Line $line_num: Very short link text '$link_text'"
        fi
    done
}

suggest_cross_references() {
    local file="$1"
    local filename=$(basename "$file" .md)
    
    echo "🔄 Suggesting cross-references for: $file"
    
    # Find related files that might benefit from cross-linking
    related_files=$(find /workspaces/mh-website/docs -name "*.md" -type f | grep -v "$file" | head -5)
    
    echo "   💡 Consider adding links to related documents:"
    echo "$related_files" | while read -r related_file; do
        related_name=$(basename "$related_file" .md)
        echo "      - [$related_name]($related_file)"
    done
}

# Process all markdown files
echo "📁 Finding markdown files..."
find /workspaces/mh-website -name "*.md" -type f ! -path "*/node_modules/*" ! -path "*/.git/*" | head -10 | while read -r file; do
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    check_internal_links "$file"
    validate_link_text "$file"
    suggest_cross_references "$file"
done

echo ""
echo "🎉 Link validation complete!"
echo "💡 Run this script regularly to maintain link quality"