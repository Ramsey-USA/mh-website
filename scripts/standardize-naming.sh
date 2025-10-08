#!/bin/bash

# Comprehensive Naming Standardization Tool
# Standardizes all markdown files to UPPERCASE_WITH_UNDERSCORES pattern

echo "🔧 MH Construction Documentation Naming Standardization"
echo "======================================================="
echo ""

# Change to project root
cd /workspaces/mh-website

# Safety check
if [ ! -d "docs/" ]; then
    echo "❌ Error: docs/ directory not found!"
    exit 1
fi

# Create backup directory
backup_dir="docs/.naming-backup-$(date +%Y%m%d-%H%M%S)"
echo "💾 Creating backup at: $backup_dir"
mkdir -p "$backup_dir"

# Create temp files for processing
temp_files=$(mktemp)
temp_renames=$(mktemp)

# Find all markdown files
find docs/ -name "*.md" > "$temp_files"

echo "📝 Analyzing files for standardization..."
echo ""

# Function to convert filename to UPPERCASE_WITH_UNDERSCORES
convert_to_uppercase() {
    local filename="$1"
    
    # Remove .md extension
    local base="${filename%.md}"
    
    # Convert to uppercase and replace common separators with underscores
    local converted=$(echo "$base" | \
        sed 's/[[:space:]]\+/_/g' | \
        sed 's/-/_/g' | \
        sed 's/\./_/g' | \
        sed 's/__\+/_/g' | \
        tr '[:lower:]' '[:upper:]')
    
    # Add .md extension back
    echo "${converted}.md"
}

# Function to check if file already follows UPPERCASE pattern
is_uppercase_pattern() {
    local filename="$1"
    if [[ "$filename" =~ ^[A-Z][A-Z0-9_]*\.md$ ]]; then
        return 0  # true
    else
        return 1  # false
    fi
}

# Process each file
files_to_rename=0
files_already_correct=0

while read -r filepath; do
    filename=$(basename "$filepath")
    dirname=$(dirname "$filepath")
    
    if is_uppercase_pattern "$filename"; then
        files_already_correct=$((files_already_correct + 1))
        continue
    fi
    
    new_filename=$(convert_to_uppercase "$filename")
    new_filepath="$dirname/$new_filename"
    
    # Skip if conversion would result in the same name
    if [ "$filename" = "$new_filename" ]; then
        files_already_correct=$((files_already_correct + 1))
        continue
    fi
    
    # Check for conflicts
    if [ -e "$new_filepath" ]; then
        echo "⚠️  Conflict: $new_filepath already exists, skipping $filepath"
        continue
    fi
    
    echo "$filepath -> $new_filepath" >> "$temp_renames"
    files_to_rename=$((files_to_rename + 1))
    
done < "$temp_files"

total_files=$(wc -l < "$temp_files")

echo "📊 Standardization Plan:"
echo "========================"
echo "Total markdown files: $total_files"
echo "Already correct: $files_already_correct"
echo "Need renaming: $files_to_rename"
echo ""

if [ "$files_to_rename" -eq 0 ]; then
    echo "✅ All files already follow UPPERCASE_WITH_UNDERSCORES pattern!"
    rm -rf "$backup_dir"
    rm -f "$temp_files" "$temp_renames"
    exit 0
fi

echo "📋 Files to be renamed:"
echo "======================="
head -10 "$temp_renames"
if [ "$files_to_rename" -gt 10 ]; then
    echo "... and $((files_to_rename - 10)) more files"
fi
echo ""

# Ask for confirmation
read -p "🤔 Proceed with renaming $files_to_rename files? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Standardization cancelled by user"
    rm -rf "$backup_dir"
    rm -f "$temp_files" "$temp_renames"
    exit 0
fi

echo ""
echo "🚀 Starting standardization process..."
echo "======================================"

# Create rename script for review
rename_script="scripts/execute-naming-standardization.sh"
echo "#!/bin/bash" > "$rename_script"
echo "# Auto-generated naming standardization script" >> "$rename_script"
echo "# Generated on $(date)" >> "$rename_script"
echo "" >> "$rename_script"

renamed_count=0
error_count=0

# Execute renames
while IFS=' -> ' read -r old_path new_path; do
    # Copy original to backup
    backup_path="$backup_dir/${old_path#docs/}"
    backup_parent=$(dirname "$backup_path")
    mkdir -p "$backup_parent"
    cp "$old_path" "$backup_path"
    
    # Add to rename script
    echo "mv \"$old_path\" \"$new_path\"" >> "$rename_script"
    
    # Perform rename
    if mv "$old_path" "$new_path"; then
        echo "✅ $(basename "$old_path") → $(basename "$new_path")"
        renamed_count=$((renamed_count + 1))
    else
        echo "❌ Failed to rename: $old_path"
        error_count=$((error_count + 1))
    fi
    
done < "$temp_renames"

chmod +x "$rename_script"

echo ""
echo "📊 Standardization Complete!"
echo "============================"
echo "Successfully renamed: $renamed_count files"
echo "Errors encountered: $error_count files"
echo "Backup created at: $backup_dir"
echo "Rename script saved: $rename_script"

# Calculate new health score impact
echo ""
echo "📈 Health Score Impact:"
echo "======================"
echo "Files standardized: $renamed_count"
echo "Estimated health improvement: +$((renamed_count * 2)) points"
echo "New naming consistency: ~$((($files_already_correct + $renamed_count) * 100 / $total_files))%"

# Clean up temp files
rm -f "$temp_files" "$temp_renames"

echo ""
echo "⚠️  Next Steps:"
echo "==============="
echo "1. Run tests to ensure no broken references"
echo "2. Update any hardcoded file references in code"
echo "3. Update documentation indexes if needed"
echo "4. Consider updating git history references"
echo ""
echo "🎯 To revert changes: mv files back from $backup_dir"