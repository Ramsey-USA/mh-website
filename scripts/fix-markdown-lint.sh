#!/bin/bash#!/bin/bash



# Fix Markdown Linting Issues in Team Profile Files# Markdown Linting Fix Script

echo "🔧 Fixing markdown linting issues in team profile files..."# Fixes common markdown linting issues across the documentation



cd /workspaces/mh-websiteecho "🔧 MH Construction Documentation - Markdown Linting Fixes"

echo "========================================================="

# Function to remove inline HTML span tags from headingsecho ""

fix_inline_html() {

    local file="$1"cd /workspaces/mh-website

    echo "  Fixing inline HTML in: $(basename "$file")"

    # Create backup for safety

    # Remove colored span tags from headingsbackup_dir="docs/.markdown-lint-backup-$(date +%Y%m%d-%H%M%S)"

    sed -i 's/<span style="color: #[^"]*;">\([^<]*\)<\/span>/\1/g' "$file"echo "💾 Creating backup at: $backup_dir"

}mkdir -p "$backup_dir"



# Function to fix emphasis used as heading# Function to backup and fix a file

fix_emphasis_heading() {fix_markdown_file() {

    local file="$1"    local file="$1"

    echo "  Fixing emphasis headings in: $(basename "$file")"    

        if [ ! -f "$file" ]; then

    # Replace *Information not specified in current data* with proper text        return

    sed -i 's/\*Information not specified in current data\*/Information not specified in current data/g' "$file"    fi

}    

    echo "🔧 Fixing: $(basename "$file")"

# List of files with inline HTML issues    

files_with_html=(    # Create backup

    "docs/business/team-profiles/DEREK_PARKS.md"    backup_path="$backup_dir/${file#docs/}"

    "docs/business/team-profiles/JEREMY_THAMERT.md"    backup_parent=$(dirname "$backup_path")

    "docs/business/team-profiles/MIKE_HOLSTEIN.md"    mkdir -p "$backup_parent"

)    cp "$file" "$backup_path"

    

# List of files with emphasis heading issues    # Create temporary file for processing

files_with_emphasis=(    temp_file=$(mktemp)

    "docs/business/team-profiles/BRITTNEY_HOLSTEIN.md"    

    "docs/business/team-profiles/JENNIFER_TENEHUERTA.md"    # Fix MD040: Add language to fenced code blocks

)    # Look for ``` without language and add 'text' as default

    sed 's/^```$/```text/' "$file" > "$temp_file"

echo "📝 Fixing inline HTML issues..."    

for file in "${files_with_html[@]}"; do    # Fix MD036: Convert bold text that should be headings

    if [ -f "$file" ]; then    # This is more complex, so we'll do specific replacements

        fix_inline_html "$file"    sed -i 's/^\*\*\([0-9]\+\. [^*]*\)\*\*$/### \1/' "$temp_file"

    fi    sed -i 's/^\*\*\([^*]*\)\*\*$/### \1/' "$temp_file"

done    

    # Copy back to original

echo "📝 Fixing emphasis heading issues..."    cp "$temp_file" "$file"

for file in "${files_with_emphasis[@]}"; do    rm "$temp_file"

    if [ -f "$file" ]; then}

        fix_emphasis_heading "$file"

    fi# Function to fix duplicate headings

donefix_duplicate_headings() {

    local file="$1"

echo "✅ Markdown linting fixes completed!"    

echo ""    if [ ! -f "$file" ]; then

echo "🔍 Checking results..."        return
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