#!/bin/bash

# MH Website Documentation Tracker
# Comprehensive analysis and tracking tool

echo "📊 MH Construction Documentation Analysis"
echo "========================================"
echo ""

# Function to count files in a directory
count_files() {
    local dir="$1"
    if [ -d "$dir" ]; then
        find "$dir" -name "*.md" | wc -l
    else
        echo "0"
    fi
}

# Function to get last modified date
get_last_modified() {
    local dir="$1"
    if [ -d "$dir" ]; then
        find "$dir" -name "*.md" -exec stat -f "%m %N" {} \; 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2- | xargs stat -f "%Sm" -t "%Y-%m-%d" 2>/dev/null || echo "Unknown"
    else
        echo "N/A"
    fi
}

# Function to check for broken links
check_links() {
    local dir="$1"
    echo "🔍 Checking links in $dir..."
    find "$dir" -name "*.md" -exec grep -l "\[.*\](.*\.md)" {} \; | head -5
}

# Main analysis
echo "📁 Directory Structure Analysis:"
echo "================================"

# Count total markdown files
TOTAL_MD=$(find . -name "*.md" | wc -l)
echo "📄 Total Markdown Files: $TOTAL_MD"
echo ""

# Analyze docs/ structure
echo "📂 docs/ Directory Breakdown:"
echo "-----------------------------"

categories=("business" "development" "guidelines" "project" "reference" "standards" "technical" "templates")

for category in "${categories[@]}"; do
    if [ -d "docs/$category" ]; then
        count=$(count_files "docs/$category")
        last_mod=$(get_last_modified "docs/$category")
        printf "%-15s: %3d files (Last: %s)\n" "$category" "$count" "$last_mod"
    fi
done

echo ""

# Special directories
echo "📁 Special Directories:"
echo "----------------------"
archive_count=$(count_files "docs/project/archive")
team_count=$(count_files "docs/business/team")
echo "Archive files:     $archive_count"
echo "Team profiles:     $team_count"
echo ""

# README analysis
echo "📋 README Files Analysis:"
echo "-------------------------"
find . -name "README.md" | while read -r readme; do
    size=$(wc -l < "$readme" 2>/dev/null || echo "0")
    echo "📄 $readme ($size lines)"
done
echo ""

# Duplicate and similar files
echo "🔄 Potential Duplicates:"
echo "------------------------"
echo "Files with similar names:"
find docs/ -name "*README*" -o -name "*INDEX*" -o -name "*NAVIGATION*" | sort
echo ""

# File naming patterns
echo "📝 Naming Pattern Analysis:"
echo "----------------------------"
echo "UPPERCASE files:"
find docs/ -name "*.md" | grep -E '/[A-Z_]+\.md$' | wc -l | xargs echo "Count:"

echo "lowercase files:"
find docs/ -name "*.md" | grep -E '/[a-z-]+\.md$' | wc -l | xargs echo "Count:"

echo "Mixed case files:"
find docs/ -name "*.md" | grep -E '/[A-Za-z][a-z]*[A-Z].*\.md$' | wc -l | xargs echo "Count:"
echo ""

# Large files (potentially need splitting)
echo "📊 Large Files (>100 lines):"
echo "-----------------------------"
find docs/ -name "*.md" -exec wc -l {} \; | sort -nr | head -5 | while read -r lines file; do
    if [ "$lines" -gt 100 ]; then
        echo "📄 $file: $lines lines"
    fi
done
echo ""

# Recent activity
echo "⏰ Recent Activity (Last 7 days):"
echo "----------------------------------"
find docs/ -name "*.md" -mtime -7 | head -5 | while read -r file; do
    echo "📄 $file"
done
echo ""

# Recommendations
echo "💡 Optimization Recommendations:"
echo "================================"

# Check for README confusion
readme_count=$(find . -name "README.md" | wc -l)
if [ "$readme_count" -gt 1 ]; then
    echo "⚠️  Multiple README.md files detected ($readme_count found)"
    echo "   → Consider renaming docs/README.md to docs/NAVIGATION.md"
fi

# Check for DOCUMENTATION_INDEX redundancy
if [ -f "docs/DOCUMENTATION_INDEX.md" ] && [ -f "docs/README.md" ]; then
    echo "⚠️  Redundant documentation index files"
    echo "   → Remove docs/DOCUMENTATION_INDEX.md if content overlaps"
fi

# Check team directory organization
if [ "$team_count" -gt 10 ]; then
    echo "⚠️  Large number of team files ($team_count)"
    echo "   → Consider organizing into team-profiles/ subdirectory"
fi

# Check archive organization
if [ "$archive_count" -gt 10 ]; then
    echo "⚠️  Large archive directory ($archive_count files)"
    echo "   → Consider organizing archives by topic or date"
fi

echo ""
echo "🎯 Quick Actions:"
echo "=================="
echo "1. Run: ./scripts/optimize-docs-phase1.sh"
echo "2. Review and consolidate README files"
echo "3. Implement consistent naming convention"
echo "4. Add metadata headers to all files"
echo "5. Set up automated link checking"
echo ""

# Generate health score
healthy_files=$((TOTAL_MD - readme_count + 1))
health_score=$((healthy_files * 100 / TOTAL_MD))

echo "📈 Documentation Health Score: ${health_score}%"
echo ""

# Save results to file
{
    echo "# Documentation Analysis Report"
    echo "**Generated:** $(date)"
    echo "**Total Files:** $TOTAL_MD"
    echo "**Health Score:** ${health_score}%"
    echo ""
    echo "## Summary"
    echo "- Total markdown files: $TOTAL_MD"
    echo "- README files: $readme_count"
    echo "- Archive files: $archive_count"
    echo "- Team profiles: $team_count"
} > docs/ANALYSIS_REPORT.md

echo "📄 Analysis saved to: docs/ANALYSIS_REPORT.md"