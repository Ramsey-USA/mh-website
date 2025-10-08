#!/bin/bash

# MH Website Documentation Tracker - Updated for New Structure
# Focused analysis of project documentation with accurate health scoring

echo "📊 MH Construction Documentation Analysis (Updated)"
echo "=================================================="
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
planning_count=$(count_files "docs/project/planning")
echo "Archive files:     $archive_count"
echo "Team profiles:     $team_count"
echo "Planning files:    $planning_count"
echo ""

# README analysis - updated for new structure
echo "📋 Documentation Navigation Files:"
echo "----------------------------------"
if [ -f "docs/NAVIGATION.md" ]; then
    size=$(wc -l < "docs/NAVIGATION.md")
    echo "📄 docs/NAVIGATION.md ($size lines) ✅ Primary navigation"
fi

# Check for any remaining README files (these might be legitimate now)
find docs/ -name "README.md" | while read -r readme; do
    size=$(wc -l < "$readme" 2>/dev/null || echo "0")
    # Check if it's a directory index (which is good)
    if [[ "$readme" == *"/archive/"* ]] || [[ "$readme" == *"/planning/"* ]] || [[ "$readme" == *"/team-profiles/"* ]]; then
        echo "📄 $readme ($size lines) ✅ Directory index"
    else
        echo "📄 $readme ($size lines) ⚠️  Review needed"
    fi
done
echo ""

# File naming patterns in docs/
echo "📝 Documentation Naming Patterns:"
echo "---------------------------------"
uppercase_count=$(find docs/ -name "*.md" | grep -E '/[A-Z_]+\.md$' | wc -l)
lowercase_count=$(find docs/ -name "*.md" | grep -E '/[a-z-]+\.md$' | wc -l)
mixed_count=$(find docs/ -name "*.md" | grep -E '/[A-Za-z][a-z]*[A-Z].*\.md$' | wc -l)

echo "UPPERCASE files: $uppercase_count"
echo "lowercase files: $lowercase_count"
echo "Mixed case files: $mixed_count"

# Calculate naming consistency percentage
total_files=$((uppercase_count + lowercase_count + mixed_count))
if [ "$total_files" -gt 0 ]; then
    # Assume UPPERCASE is the preferred pattern for this project
    consistency_percent=$((uppercase_count * 100 / total_files))
    echo "Naming consistency: ${consistency_percent}% (UPPERCASE preferred)"
fi
echo ""

# Large documentation files (>500 lines)
echo "📊 Large Documentation Files (>500 lines):"
echo "-------------------------------------------"
large_files_list=$(find docs/ -name "*.md" -exec wc -l {} \; | awk '$1 > 500' | sort -nr)
large_files_count=$(echo "$large_files_list" | wc -l)

if [ "$large_files_count" -gt 0 ]; then
    echo "$large_files_list" | head -5 | while read -r lines file; do
        echo "📄 $file: $lines lines"
    done
else
    echo "✅ No excessively large files found"
fi
echo ""

# Recent documentation activity
echo "⏰ Recent Documentation Activity (Last 7 days):"
echo "-----------------------------------------------"
recent_files=$(find docs/ -name "*.md" -mtime -7)
if [ -n "$recent_files" ]; then
    echo "$recent_files" | head -5 | while read -r file; do
        echo "📄 $file"
    done
else
    echo "📄 No recent activity in last 7 days"
fi
echo ""

# Updated recommendations based on new structure
echo "💡 Documentation-Specific Recommendations:"
echo "=========================================="

# Check for navigation file
if [ ! -f "docs/NAVIGATION.md" ]; then
    echo "❌ Missing primary navigation file"
    echo "   → docs/NAVIGATION.md not found"
fi

# Check team directory organization (updated logic)
if [ "$team_count" -gt 15 ]; then
    echo "⚠️  Large number of team files ($team_count)"
    echo "   → Consider organizing into docs/business/team-profiles/ subdirectory"
elif [ "$team_count" -gt 0 ] && [ "$team_count" -le 15 ]; then
    echo "✅ Team files manageable ($team_count files)"
fi

# Check archive organization (updated thresholds)
if [ "$archive_count" -gt 30 ]; then
    echo "⚠️  Large archive directory ($archive_count files)"
    echo "   → Consider further organizing archives by sub-topics"
elif [ "$archive_count" -gt 0 ]; then
    echo "✅ Archive directory well-organized ($archive_count files)"
fi

# Check for very large files with better context
if [ "$large_files_count" -gt 0 ]; then
    echo "⚠️  Very large documentation files detected ($large_files_count files >500 lines)"
    echo "   → Consider breaking down large files into smaller, focused documents"
    echo "   → Largest files should be reviewed for modular organization"
fi

# Check naming consistency
if [ "$consistency_percent" -lt 70 ]; then
    echo "⚠️  Naming inconsistency detected (${consistency_percent}% consistent)"
    echo "   → Consider standardizing on UPPERCASE naming convention"
fi

# Planning directory check
if [ "$planning_count" -gt 0 ]; then
    echo "✅ Future planning organized ($planning_count files in planning/)"
fi

echo ""
echo "🎯 Priority Actions for Documentation:"
echo "======================================"

priority_actions=()
if [ ! -f "docs/NAVIGATION.md" ]; then
    priority_actions+=("1. Create primary navigation file (docs/NAVIGATION.md)")
fi
if [ "$team_count" -gt 15 ]; then
    priority_actions+=("2. Organize team profiles into subdirectory")
fi
if [ "$large_files_count" -gt 5 ]; then
    priority_actions+=("3. Review and split large documentation files")
fi
if [ "$consistency_percent" -lt 70 ]; then
    priority_actions+=("4. Implement consistent naming convention")
fi
if [ "$archive_count" -gt 30 ]; then
    priority_actions+=("5. Further organize archive structure")
fi

if [ ${#priority_actions[@]} -eq 0 ]; then
    echo "✅ No critical priority actions needed"
    echo "📈 Documentation structure is well-organized"
else
    for action in "${priority_actions[@]}"; do
        echo "$action"
    done
fi

echo ""

# Updated health score calculation
echo "📈 Documentation Health Score Calculation:"
echo "==========================================="

# Base score
base_score=100

# Deductions
navigation_penalty=0
if [ ! -f "docs/NAVIGATION.md" ]; then
    navigation_penalty=20
    echo "Navigation file missing: -$navigation_penalty points"
fi

team_org_penalty=0
if [ "$team_count" -gt 15 ]; then
    team_org_penalty=10
    echo "Team files disorganized: -$team_org_penalty points"
fi

large_files_penalty=$((large_files_count * 3))
if [ "$large_files_penalty" -gt 0 ]; then
    echo "Large files penalty ($large_files_count files): -$large_files_penalty points"
fi

naming_penalty=0
if [ "$consistency_percent" -lt 70 ]; then
    naming_penalty=$((80 - consistency_percent))
    echo "Naming inconsistency: -$naming_penalty points"
fi

archive_penalty=0
if [ "$archive_count" -gt 30 ]; then
    archive_penalty=5
    echo "Large archive directory: -$archive_penalty points"
fi

# Bonuses
organization_bonus=0
if [ -f "docs/NAVIGATION.md" ] && [ "$archive_count" -gt 0 ] && [ "$planning_count" -gt 0 ]; then
    organization_bonus=15
    echo "Well-organized structure bonus: +$organization_bonus points"
fi

# Calculate final score
health_score=$((base_score - navigation_penalty - team_org_penalty - large_files_penalty - naming_penalty - archive_penalty + organization_bonus))

# Ensure score doesn't go below 0 or above 100
if [ "$health_score" -lt 0 ]; then
    health_score=0
elif [ "$health_score" -gt 100 ]; then
    health_score=100
fi

echo ""
echo "📊 Final Documentation Health Score: ${health_score}%"

# Health score interpretation
if [ "$health_score" -ge 90 ]; then
    echo "🎉 Excellent - Documentation is very well organized"
elif [ "$health_score" -ge 75 ]; then
    echo "👍 Good - Minor improvements needed"
elif [ "$health_score" -ge 60 ]; then
    echo "⚠️  Fair - Several areas need attention"
else
    echo "🚨 Needs Work - Significant improvements required"
fi

echo ""

# Save updated analysis to file
{
    echo "# Documentation Analysis Report (Updated Structure)"
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
    echo "## Organization Status"
    echo "- Archive files: $archive_count files"
    echo "- Team profile files: $team_count files"
    echo "- Planning files: $planning_count files"
    echo "- Large files (>500 lines): $large_files_count files"
    echo "- Naming consistency: ${consistency_percent}%"
    echo ""
    echo "## Recommendations"
    if [ ${#priority_actions[@]} -eq 0 ]; then
        echo "✅ Documentation structure is well-organized"
    else
        for action in "${priority_actions[@]}"; do
            echo "- $action"
        done
    fi
} > docs/DOCS_ANALYSIS_REPORT_UPDATED.md

echo "📄 Updated analysis saved to: docs/DOCS_ANALYSIS_REPORT_UPDATED.md"