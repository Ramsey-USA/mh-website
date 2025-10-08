#!/bin/bash

# Markdown Content Quality Analyzer
# Analyzes and suggests improvements for content quality

set -e

echo "📊 Markdown Content Quality Analysis"
echo "==================================="

analyze_content_quality() {
    local file="$1"
    local issues=0
    
    echo "🔍 Analyzing: $file"
    
    # Check for common content issues
    
    # 1. Overly long lines (readability)
    long_lines=$(awk 'length($0) > 120 { print NR ": " $0 }' "$file")
    if [ ! -z "$long_lines" ]; then
        echo "   ⚠️  Long lines found (>120 chars):"
        echo "$long_lines" | head -3
        issues=$((issues + 1))
    fi
    
    # 2. Missing alt text for images
    images_without_alt=$(grep -n '!\[\](' "$file" || true)
    if [ ! -z "$images_without_alt" ]; then
        echo "   ❌ Images missing alt text:"
        echo "$images_without_alt"
        issues=$((issues + 1))
    fi
    
    # 3. Inconsistent heading levels
    headings=$(grep -n '^#' "$file" | cut -d: -f2)
    if [ ! -z "$headings" ]; then
        prev_level=0
        while IFS= read -r heading; do
            level=$(echo "$heading" | grep -o '^#*' | wc -c)
            level=$((level - 1))
            
            if [ $level -gt $((prev_level + 1)) ] && [ $prev_level -gt 0 ]; then
                echo "   ⚠️  Heading level skip detected: $heading"
                issues=$((issues + 1))
            fi
            prev_level=$level
        done <<< "$headings"
    fi
    
    # 4. TODO/FIXME comments
    todos=$(grep -n -i 'todo\|fixme\|xxx\|hack' "$file" || true)
    if [ ! -z "$todos" ]; then
        echo "   📝 TODO items found:"
        echo "$todos"
    fi
    
    # 5. Spelling and grammar suggestions
    common_typos=$(grep -n -i 'teh\|recieve\|seperate\|occured\|definately' "$file" || true)
    if [ ! -z "$common_typos" ]; then
        echo "   ✏️  Possible typos found:"
        echo "$common_typos"
        issues=$((issues + 1))
    fi
    
    # 6. Inconsistent code formatting
    inline_code_issues=$(grep -n '`[^`]*[A-Z][^`]*`' "$file" || true)
    if [ ! -z "$inline_code_issues" ]; then
        echo "   🔤 Consider lowercase for code elements:"
        echo "$inline_code_issues" | head -2
    fi
    
    return $issues
}

check_document_structure() {
    local file="$1"
    
    echo "🏗️  Checking document structure: $file"
    
    # Check for standard sections
    has_overview=$(grep -i '^## overview\|^# overview' "$file" || true)
    has_examples=$(grep -i '^## example\|^# example' "$file" || true)
    has_usage=$(grep -i '^## usage\|^# usage' "$file" || true)
    
    if [ -z "$has_overview" ] && [ $(wc -l < "$file") -gt 50 ]; then
        echo "   💡 Consider adding an Overview section for long documents"
    fi
    
    # Check for consistent section ordering
    sections=$(grep -n '^##' "$file" | cut -d: -f2 | tr '[:upper:]' '[:lower:]')
    echo "   📋 Current sections:"
    echo "$sections" | sed 's/^/      /'
}

suggest_improvements() {
    local file="$1"
    
    echo "💡 Improvement suggestions for: $file"
    
    # Word count and readability
    word_count=$(wc -w < "$file")
    if [ $word_count -gt 2000 ]; then
        echo "   📄 Large document ($word_count words) - consider splitting into multiple files"
    elif [ $word_count -lt 50 ]; then
        echo "   📝 Short document ($word_count words) - consider adding more detail or examples"
    fi
    
    # Code block language specification
    untagged_blocks=$(grep -n '^```$' "$file" || true)
    if [ ! -z "$untagged_blocks" ]; then
        echo "   🏷️  Add language tags to code blocks for syntax highlighting"
    fi
    
    # Link opportunities
    potential_links=$(grep -i 'github\|npm\|api\|documentation' "$file" | wc -l)
    if [ $potential_links -gt 0 ]; then
        echo "   🔗 Consider adding links for references to external resources"
    fi
}

# Analyze key documentation files
important_files=(
    "/workspaces/mh-website/README.md"
    "/workspaces/mh-website/docs/development/SETUP_GUIDE.md"
    "/workspaces/mh-website/docs/technical/DESIGN_SYSTEM.md"
    "/workspaces/mh-website/docs/guidelines/MARKDOWN_STYLE_GUIDE.md"
)

total_issues=0

for file in "${important_files[@]}"; do
    if [ -f "$file" ]; then
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        analyze_content_quality "$file"
        file_issues=$?
        total_issues=$((total_issues + file_issues))
        
        check_document_structure "$file"
        suggest_improvements "$file"
    fi
done

echo ""
echo "📊 ANALYSIS SUMMARY"
echo "==================="
echo "Total files analyzed: ${#important_files[@]}"
echo "Total issues found: $total_issues"

if [ $total_issues -eq 0 ]; then
    echo "🎉 All analyzed files look great!"
else
    echo "💡 $total_issues issues found. Consider addressing them to improve quality."
fi