#!/bin/bash

# Add Table of Contents to Markdown Files
# Automatically generates TOC for files without one

set -e

echo "🔗 Adding Table of Contents to Markdown Files"
echo "============================================="

add_toc_to_file() {
    local file="$1"
    local temp_file="${file}.toc_temp"
    
    echo "🔄 Processing: $file"
    
    # Check if file already has a TOC
    if grep -q "## Table of Contents\|# Table of Contents" "$file"; then
        echo "   ℹ️  TOC already exists, skipping"
        return
    fi
    
    # Extract headings (level 2 and 3 only for TOC)
    headings=$(grep -E '^##[^#]|^###[^#]' "$file" | head -10)
    
    if [ -z "$headings" ]; then
        echo "   ℹ️  No suitable headings found, skipping"
        return
    fi
    
    # Create TOC
    toc="## Table of Contents\n\n"
    while IFS= read -r heading; do
        # Remove markdown formatting
        clean_heading=$(echo "$heading" | sed 's/^##* //' | sed 's/\*\*//g' | sed 's/`//g')
        # Create anchor link
        anchor=$(echo "$clean_heading" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 ]//g' | sed 's/ /-/g')
        # Determine indentation level
        if [[ $heading =~ ^### ]]; then
            toc="${toc}  - [$clean_heading](#$anchor)\n"
        else
            toc="${toc}- [$clean_heading](#$anchor)\n"
        fi
    done <<< "$headings"
    
    toc="${toc}\n"
    
    # Insert TOC after first heading
    awk -v toc="$toc" '
    BEGIN { inserted = 0 }
    /^# / && !inserted {
        print $0
        print ""
        printf "%s", toc
        inserted = 1
        next
    }
    { print }
    ' "$file" > "$temp_file"
    
    mv "$temp_file" "$file"
    echo "   ✅ Added TOC to: $file"
}

# Process major documentation files
important_files=(
    "/workspaces/mh-website/README.md"
    "/workspaces/mh-website/CONTRIBUTING.md"
    "/workspaces/mh-website/docs/development/SETUP_GUIDE.md"
    "/workspaces/mh-website/docs/technical/DESIGN_SYSTEM.md"
    "/workspaces/mh-website/docs/project/ARCHITECTURE.md"
)

for file in "${important_files[@]}"; do
    if [ -f "$file" ]; then
        add_toc_to_file "$file"
    fi
done

echo ""
echo "🎉 Table of Contents generation complete!"