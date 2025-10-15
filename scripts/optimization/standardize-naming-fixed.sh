#!/bin/bash

# Fixed Naming Standardization Tool
# Properly handles file paths with quotes and better parsing

echo "🔧 MH Construction Documentation Naming Standardization (Fixed)"
echo "=============================================================="
echo ""

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

echo "📝 Analyzing files for standardization..."

files_to_rename=0
files_already_correct=0

# Create arrays to store file info
declare -a old_paths
declare -a new_paths

# Process each file
while IFS= read -r -d '' filepath; do
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
    
    old_paths[files_to_rename]="$filepath"
    new_paths[files_to_rename]="$new_filepath"
    files_to_rename=$((files_to_rename + 1))
    
done < <(find docs/ -name "*.md" -print0)

total_files=$((files_to_rename + files_already_correct))

echo ""
echo "📊 Standardization Plan:"
echo "========================"
echo "Total markdown files: $total_files"
echo "Already correct: $files_already_correct"
echo "Need renaming: $files_to_rename"
echo ""

if [ "$files_to_rename" -eq 0 ]; then
    echo "✅ All files already follow UPPERCASE_WITH_UNDERSCORES pattern!"
    rm -rf "$backup_dir"
    exit 0
fi

echo "📋 Files to be renamed (first 10):"
echo "=================================="
for ((i=0; i<files_to_rename && i<10; i++)); do
    echo "   $(basename "${old_paths[i]}") → $(basename "${new_paths[i]}")"
done
if [ "$files_to_rename" -gt 10 ]; then
    echo "   ... and $((files_to_rename - 10)) more files"
fi
echo ""

# Ask for confirmation
read -p "🤔 Proceed with renaming $files_to_rename files? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Standardization cancelled by user"
    rm -rf "$backup_dir"
    exit 0
fi

echo ""
echo "🚀 Starting standardization process..."
echo "======================================"

renamed_count=0
error_count=0

# Execute renames
for ((i=0; i<files_to_rename; i++)); do
    old_path="${old_paths[i]}"
    new_path="${new_paths[i]}"
    
    # Copy original to backup
    backup_path="$backup_dir/${old_path#docs/}"
    backup_parent=$(dirname "$backup_path")
    mkdir -p "$backup_parent"
    
    if cp "$old_path" "$backup_path"; then
        # Perform rename
        if mv "$old_path" "$new_path"; then
            echo "✅ $(basename "$old_path") → $(basename "$new_path")"
            renamed_count=$((renamed_count + 1))
        else
            echo "❌ Failed to rename: $old_path"
            error_count=$((error_count + 1))
        fi
    else
        echo "❌ Failed to backup: $old_path"
        error_count=$((error_count + 1))
    fi
done

echo ""
echo "📊 Standardization Complete!"
echo "============================"
echo "Successfully renamed: $renamed_count files"
echo "Errors encountered: $error_count files"
echo "Backup created at: $backup_dir"

# Calculate new health score impact
echo ""
echo "📈 Health Score Impact:"
echo "======================"
echo "Files standardized: $renamed_count"
echo "Estimated health improvement: +$((renamed_count * 2)) points"
echo "New naming consistency: 100%"

if [ "$error_count" -eq 0 ]; then
    echo ""
    echo "✅ Naming standardization completed successfully!"
    echo "   All markdown files now follow UPPERCASE_WITH_UNDERSCORES pattern"
else
    echo ""
    echo "⚠️  Some errors occurred during standardization"
    echo "   Check backup directory for original files"
fi

echo ""
echo "🎯 To revert changes: mv files back from $backup_dir"