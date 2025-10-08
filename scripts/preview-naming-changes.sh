#!/bin/bash

# Dry Run - Preview Naming Standardization Changes
# Shows what files would be renamed without making changes

echo "👁️  MH Construction Documentation Naming Preview"
echo "================================================"
echo ""

cd /workspaces/mh-website

# Function to convert filename to UPPERCASE_WITH_UNDERSCORES
convert_to_uppercase() {
    local filename="$1"
    local base="${filename%.md}"
    local converted=$(echo "$base" | \
        sed 's/[[:space:]]\+/_/g' | \
        sed 's/-/_/g' | \
        sed 's/\./_/g' | \
        sed 's/__\+/_/g' | \
        tr '[:lower:]' '[:upper:]')
    echo "${converted}.md"
}

# Function to check if file already follows UPPERCASE pattern
is_uppercase_pattern() {
    local filename="$1"
    [[ "$filename" =~ ^[A-Z][A-Z0-9_]*\.md$ ]]
}

temp_files=$(mktemp)
find docs/ -name "*.md" > "$temp_files"

files_to_rename=0
files_already_correct=0
files_conflicts=0

echo "📊 Standardization Preview:"
echo "=========================="
echo ""

# Group files by directory for better organization
declare -A dir_changes

while read -r filepath; do
    filename=$(basename "$filepath")
    dirname=$(dirname "$filepath")
    
    if is_uppercase_pattern "$filename"; then
        files_already_correct=$((files_already_correct + 1))
        continue
    fi
    
    new_filename=$(convert_to_uppercase "$filename")
    new_filepath="$dirname/$new_filename"
    
    if [ "$filename" = "$new_filename" ]; then
        files_already_correct=$((files_already_correct + 1))
        continue
    fi
    
    if [ -e "$new_filepath" ]; then
        echo "⚠️  CONFLICT: $filepath -> $new_filepath (target exists)"
        files_conflicts=$((files_conflicts + 1))
        continue
    fi
    
    # Add to directory grouping
    if [ -z "${dir_changes[$dirname]}" ]; then
        dir_changes[$dirname]=""
    fi
    dir_changes[$dirname]="${dir_changes[$dirname]}$filename -> $new_filename\n"
    files_to_rename=$((files_to_rename + 1))
    
done < "$temp_files"

total_files=$(wc -l < "$temp_files")

# Display changes by directory
for dir in $(printf '%s\n' "${!dir_changes[@]}" | sort); do
    if [ -n "${dir_changes[$dir]}" ]; then
        echo "📁 $dir/"
        echo -e "${dir_changes[$dir]}" | sed 's/^/   /'
        echo ""
    fi
done

echo "📊 Summary:"
echo "==========="
printf "%-20s: %3d files\n" "Total files" "$total_files"
printf "%-20s: %3d files (%2d%%)\n" "Already correct" "$files_already_correct" "$((files_already_correct * 100 / total_files))"
printf "%-20s: %3d files (%2d%%)\n" "Need renaming" "$files_to_rename" "$((files_to_rename * 100 / total_files))"
printf "%-20s: %3d files\n" "Conflicts found" "$files_conflicts"
echo ""

if [ "$files_conflicts" -gt 0 ]; then
    echo "⚠️  Warning: $files_conflicts conflicts detected!"
    echo "   These files cannot be renamed due to existing targets"
    echo ""
fi

echo "📈 Expected Impact:"
echo "==================="
echo "Health score improvement: +$((files_to_rename * 2)) points"
echo "Final naming consistency: $((($files_already_correct + $files_to_rename) * 100 / total_files))%"
echo "Current health score: ~29%"
echo "Projected health score: ~$((29 + files_to_rename * 2))%"

rm -f "$temp_files"

echo ""
echo "🚀 To execute standardization:"
echo "==============================="
echo "./scripts/standardize-naming.sh"