#!/bin/bash

# Naming Consistency Analysis and Standardization Tool
# Analyzes current naming patterns and provides standardization options

echo "📝 MH Construction Documentation Naming Analysis"
echo "==============================================="
echo ""

# Change to project root
cd /workspaces/mh-website

# Create temporary files for analysis
temp_all_files=$(mktemp)
temp_uppercase=$(mktemp)
temp_lowercase=$(mktemp)
temp_mixed=$(mktemp)
temp_kebab=$(mktemp)

# Get all markdown files
find docs/ -name "*.md" > "$temp_all_files"

echo "📊 Current Naming Pattern Analysis:"
echo "===================================="

# Categorize files by naming pattern
while read -r file; do
    basename_file=$(basename "$file")
    
    if [[ "$basename_file" =~ ^[A-Z][A-Z_]*\.md$ ]]; then
        # Pure UPPERCASE with underscores
        echo "$file" >> "$temp_uppercase"
    elif [[ "$basename_file" =~ ^[a-z][a-z-]*\.md$ ]]; then
        # Pure lowercase with hyphens (kebab-case)
        echo "$file" >> "$temp_kebab"
    elif [[ "$basename_file" =~ ^[a-z][a-z]*\.md$ ]]; then
        # Pure lowercase without hyphens
        echo "$file" >> "$temp_lowercase"
    else
        # Mixed case or other patterns
        echo "$file" >> "$temp_mixed"
    fi
done < "$temp_all_files"

# Count each category
uppercase_count=$([ -f "$temp_uppercase" ] && wc -l < "$temp_uppercase" || echo 0)
kebab_count=$([ -f "$temp_kebab" ] && wc -l < "$temp_kebab" || echo 0)
lowercase_count=$([ -f "$temp_lowercase" ] && wc -l < "$temp_lowercase" || echo 0)
mixed_count=$([ -f "$temp_mixed" ] && wc -l < "$temp_mixed" || echo 0)
total_count=$(wc -l < "$temp_all_files")

echo "📋 Pattern Breakdown:"
echo "--------------------"
printf "%-20s: %3d files (%2d%%)\n" "UPPERCASE" "$uppercase_count" "$((uppercase_count * 100 / total_count))"
printf "%-20s: %3d files (%2d%%)\n" "kebab-case" "$kebab_count" "$((kebab_count * 100 / total_count))"
printf "%-20s: %3d files (%2d%%)\n" "lowercase" "$lowercase_count" "$((lowercase_count * 100 / total_count))"
printf "%-20s: %3d files (%2d%%)\n" "Mixed/Other" "$mixed_count" "$((mixed_count * 100 / total_count))"
echo "--------------------"
printf "%-20s: %3d files\n" "TOTAL" "$total_count"

echo ""
echo "📁 Examples by Pattern:"
echo "======================="

if [ "$uppercase_count" -gt 0 ]; then
    echo "🔠 UPPERCASE Examples:"
    head -3 "$temp_uppercase" | while read -r file; do
        echo "   📄 $(basename "$file")"
    done
fi

if [ "$kebab_count" -gt 0 ]; then
    echo "🔗 kebab-case Examples:"
    head -3 "$temp_kebab" | while read -r file; do
        echo "   📄 $(basename "$file")"
    done
fi

if [ "$mixed_count" -gt 0 ]; then
    echo "🎭 Mixed/Other Examples:"
    head -3 "$temp_mixed" | while read -r file; do
        echo "   📄 $(basename "$file")"
    done
fi

echo ""
echo "💡 Standardization Options:"
echo "============================"

# Determine best standardization approach
if [ "$uppercase_count" -gt "$kebab_count" ] && [ "$uppercase_count" -gt "$mixed_count" ]; then
    recommended="UPPERCASE"
    current_consistent="$uppercase_count"
elif [ "$kebab_count" -gt "$uppercase_count" ] && [ "$kebab_count" -gt "$mixed_count" ]; then
    recommended="kebab-case"
    current_consistent="$kebab_count"
else
    # Choose UPPERCASE as default for project documentation
    recommended="UPPERCASE"
    current_consistent="$uppercase_count"
fi

consistency_percent=$((current_consistent * 100 / total_count))

echo "📊 Current Consistency: ${consistency_percent}% ($current_consistent files follow most common pattern)"
echo "🎯 Recommended Standard: $recommended"
echo ""

# Calculate impact of standardization
files_to_rename=$((total_count - current_consistent))
health_improvement=$((files_to_rename * 2))  # Approximate health score improvement

echo "📈 Standardization Impact:"
echo "-------------------------"
echo "Files needing rename: $files_to_rename"
echo "Estimated health score improvement: +$health_improvement points"
echo "Estimated final consistency: 100%"

echo ""
echo "🛠️  Standardization Options:"
echo "============================"
echo "1. UPPERCASE_WITH_UNDERSCORES (current majority)"
echo "   Example: PHASE_MASTER_ROADMAP.md"
echo "   Pros: Already majority pattern, enterprise standard"
echo "   Cons: Less readable, harder to type"
echo ""
echo "2. kebab-case-with-hyphens (team profiles pattern)"
echo "   Example: phase-master-roadmap.md"
echo "   Pros: More readable, web-friendly, modern standard"
echo "   Cons: Need to rename majority of files"
echo ""
echo "3. Mixed approach (different standards by directory)"
echo "   Example: Project docs = UPPERCASE, Team profiles = kebab-case"
echo "   Pros: Respects existing patterns by context"
echo "   Cons: Still mixed standards"

# Clean up temp files
rm -f "$temp_all_files" "$temp_uppercase" "$temp_lowercase" "$temp_mixed" "$temp_kebab"

echo ""
echo "🎯 Recommendation:"
echo "=================="
echo "For maximum health score improvement with minimal disruption:"
echo "✅ Standardize on UPPERCASE_WITH_UNDERSCORES"
echo "📊 This would require renaming $files_to_rename files"
echo "📈 Expected health score improvement: +$health_improvement points"
echo "🎯 Final consistency: 100%"