#!/bin/bash

# MH Website Documentation Tracker - Docs Directory Only
# Focused analysis of project documentation

echo "📊 MH Construction Documentation Analysis (Docs Only)"
echo "===================================================="
echo ""

# Change to project root
cd /workspaces/mh-website

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
        find "$dir" -name "*.md" -exec stat -c "%Y %n" {} \; 2>/dev/null | sort -n | tail -1 | cut -d' ' -f2- | xargs stat -c "%y" 2>/dev/null | cut -d' ' -f1 || echo "Unknown"
    else
        echo "N/A"
    fi
}

# Main analysis - docs/ directory only
echo "📁 Documentation Directory Analysis:"
echo "====================================="

# Count total markdown files in docs/
TOTAL_DOCS=$(count_files "docs")
echo "📄 Total Documentation Files: $TOTAL_DOCS"
echo ""

# Analyze docs/ subdirectories
echo "📂 Documentation Categories:"
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

# Special directories within docs/
echo "📁 Special Documentation Areas:"
echo "-------------------------------"
archive_count=$(count_files "docs/project/archive")
team_count=$(count_files "docs/business/team")
echo "Archive files:     $archive_count"
echo "Team profiles:     $team_count"
echo ""

# README analysis - docs directory only
echo "📋 Documentation README Files:"
echo "------------------------------"
find docs/ -name "README.md" | while read -r readme; do
    size=$(wc -l < "$readme" 2>/dev/null || echo "0")
    echo "📄 $readme ($size lines)"
done

# Check for DOCUMENTATION_INDEX.md
if [ -f "docs/DOCUMENTATION_INDEX.md" ]; then
    size=$(wc -l < "docs/DOCUMENTATION_INDEX.md")
    echo "📄 docs/DOCUMENTATION_INDEX.md ($size lines)"
fi

echo ""

# File naming patterns in docs/
echo "📝 Documentation Naming Patterns:"
echo "---------------------------------"
echo "UPPERCASE files:"
find docs/ -name "*.md" | grep -E '/[A-Z_]+\.md$' | wc -l | xargs echo "Count:"

echo "lowercase files:"
find docs/ -name "*.md" | grep -E '/[a-z-]+\.md$' | wc -l | xargs echo "Count:"

echo "Mixed case files:"
find docs/ -name "*.md" | grep -E '/[A-Za-z][a-z]*[A-Z].*\.md$' | wc -l | xargs echo "Count:"
echo ""

# Large documentation files (>200 lines)
echo "📊 Large Documentation Files (>200 lines):"
echo "-------------------------------------------"
find docs/ -name "*.md" -exec wc -l {} \; | sort -nr | head -5 | while read -r lines file; do
    if [ "$lines" -gt 200 ]; then
        echo "📄 $file: $lines lines"
    fi
done
echo ""

# Recent documentation activity
echo "⏰ Recent Documentation Activity (Last 7 days):"
echo "-----------------------------------------------"
find docs/ -name "*.md" -mtime -7 | head -5 | while read -r file; do
    echo "📄 $file"
done
echo ""

# Specific recommendations for docs/
echo "💡 Documentation-Specific Recommendations:"
echo "=========================================="

# Check for README confusion in docs/
readme_count=$(find docs/ -name "README.md" | wc -l)
if [ "$readme_count" -gt 0 ]; then
    echo "⚠️  README files in docs/ directory ($readme_count found)"
    echo "   → Consider renaming docs/README.md to docs/NAVIGATION.md for clarity"
fi

# Check for DOCUMENTATION_INDEX redundancy
if [ -f "docs/DOCUMENTATION_INDEX.md" ] && [ -f "docs/README.md" ]; then
    echo "⚠️  Redundant documentation index files"
    echo "   → docs/DOCUMENTATION_INDEX.md and docs/README.md serve similar purposes"
    echo "   → Consider consolidating into one navigation file"
fi

# Check team directory organization
if [ "$team_count" -gt 10 ]; then
    echo "⚠️  Large number of team files ($team_count)"
    echo "   → Consider organizing into docs/business/team-profiles/ subdirectory"
fi

# Check archive organization
if [ "$archive_count" -gt 15 ]; then
    echo "⚠️  Large archive directory ($archive_count files)"
    echo "   → Consider organizing archives by topic or phase"
fi

# Check for very large files
large_files=$(find docs/ -name "*.md" -exec wc -l {} \; | awk '$1 > 500' | wc -l)
if [ "$large_files" -gt 0 ]; then
    echo "⚠️  Very large documentation files detected ($large_files files >500 lines)"
    echo "   → Consider breaking down large files into smaller, focused documents"
fi

echo ""
echo "🎯 Priority Actions for Documentation:"
echo "======================================"
echo "1. Resolve README file naming confusion"
echo "2. Consolidate redundant index files"
echo "3. Implement consistent naming convention"
echo "4. Organize team profiles into subdirectory"
echo "5. Add metadata headers to all documentation"
echo "6. Create automated documentation tracking"
echo ""

# Generate documentation health score (docs only)
redundant_files=0
if [ -f "docs/DOCUMENTATION_INDEX.md" ] && [ -f "docs/README.md" ]; then
    redundant_files=1
fi

large_file_penalty=$(find docs/ -name "*.md" -exec wc -l {} \; | awk '$1 > 500' | wc -l)
naming_inconsistency=$(find docs/ -name "*.md" | grep -E '/[a-z-].*[A-Z].*\.md$|/[A-Z].*[a-z].*\.md$' | wc -l)

health_score=$((100 - (redundant_files * 10) - (large_file_penalty * 5) - (naming_inconsistency * 2)))
if [ "$health_score" -lt 0 ]; then
    health_score=0
fi

echo "📈 Documentation Health Score: ${health_score}%"
echo ""

# Save focused analysis to file
{
    echo "# Documentation Analysis Report (Docs Directory)"
    echo "**Generated:** $(date)"
    echo "**Total Documentation Files:** $TOTAL_DOCS"
    echo "**Health Score:** ${health_score}%"
    echo ""
    echo "## Category Breakdown"
    for category in "${categories[@]}"; do
        if [ -d "docs/$category" ]; then
            count=$(count_files "docs/$category")
            echo "- **$category**: $count files"
        fi
    done
    echo ""
    echo "## Issues Identified"
    echo "- README file confusion: $readme_count files"
    echo "- Redundant index files: $([ -f "docs/DOCUMENTATION_INDEX.md" ] && [ -f "docs/README.md" ] && echo "Yes" || echo "No")"
    echo "- Large files (>500 lines): $large_file_penalty files"
    echo "- Archive files: $archive_count files"
    echo "- Team profile files: $team_count files"
} > docs/DOCS_ANALYSIS_REPORT.md

echo "📄 Focused analysis saved to: docs/DOCS_ANALYSIS_REPORT.md"