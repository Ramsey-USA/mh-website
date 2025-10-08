#!/bin/bash

# Markdown Linting Fix Script
# Fixes common markdown linting issues across the documentation

echo "🔧 MH Construction Documentation - Markdown Linting Fixes"
echo "========================================================="
echo ""

cd /workspaces/mh-website

# Create backup for safety
backup_dir="docs/.markdown-lint-backup-$(date +%Y%m%d-%H%M%S)"
echo "💾 Creating backup at: $backup_dir"
mkdir -p "$backup_dir"

# Function to backup and fix a file
fix_markdown_file() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        return
    fi
    
    echo "🔧 Fixing: $(basename "$file")"
    
    # Create backup
    backup_path="$backup_dir/${file#docs/}"
    backup_parent=$(dirname "$backup_path")
    mkdir -p "$backup_parent"
    cp "$file" "$backup_path"
    
    # Create temporary file for processing
    temp_file=$(mktemp)
    
    # Fix MD040: Add language to fenced code blocks
    # Look for ``` without language and add 'text' as default
    sed 's/^```$/```text/' "$file" > "$temp_file"
    
    # Fix MD036: Convert bold text that should be headings
    # This is more complex, so we'll do specific replacements
    sed -i 's/^\*\*\([0-9]\+\. [^*]*\)\*\*$/### \1/' "$temp_file"
    sed -i 's/^\*\*\([^*]*\)\*\*$/### \1/' "$temp_file"
    
    # Copy back to original
    cp "$temp_file" "$file"
    rm "$temp_file"
}

# Function to fix duplicate headings
fix_duplicate_headings() {
    local file="$1"
    
    if [ ! -f "$file" ]; then
        return
    fi
    
    # Create a more specific heading for duplicate "Health Score Impact"
    sed -i 's/### ✅ Health Score Impact$/### ✅ Final Health Score Impact/' "$file"
}

echo "📝 Scanning for markdown files with linting issues..."

# Get list of files with errors from the error output
files_with_errors=(
    "docs/project/archive/phases/completed/phase-2-documentation/PHASE_2_DOCUMENTATION_REORGANIZATION.md"
    "docs/OPTIMIZATION_SUMMARY.md"
    "docs/project/PHASE_CONSOLIDATION_STRATEGY.md"
    "docs/project/TEAM_ORGANIZATION_RESULTS.md"
)

fixed_count=0

for file in "${files_with_errors[@]}"; do
    if [ -f "$file" ]; then
        fix_markdown_file "$file"
        
        # Special handling for duplicate headings
        if [[ "$file" == *"TEAM_ORGANIZATION_RESULTS.md" ]]; then
            fix_duplicate_headings "$file"
        fi
        
        fixed_count=$((fixed_count + 1))
    else
        echo "⚠️  File not found: $file"
    fi
done

echo ""
echo "📊 Markdown Linting Fixes Complete!"
echo "===================================="
echo "Files processed: $fixed_count"
echo "Backup created at: $backup_dir"

echo ""
echo "🔧 Fixed Issues:"
echo "================"
echo "✅ MD040: Added language specifications to fenced code blocks"
echo "✅ MD036: Converted bold emphasis to proper headings"
echo "✅ MD024: Fixed duplicate heading names"

echo ""
echo "🎯 To revert changes: mv files back from $backup_dir"