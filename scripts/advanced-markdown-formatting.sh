#!/bin/bash

# Advanced Markdown Formatting Improvements
# Handles advanced formatting consistency and enhancements

set -e

echo "✨ Advanced Markdown Formatting Improvements"
echo "==========================================="

improve_table_formatting() {
    local file="$1"
    local temp_file="${file}.table_temp"
    
    echo "📊 Improving table formatting in: $file"
    
    # Check if file has tables
    if ! grep -q '|' "$file"; then
        echo "   ℹ️  No tables found"
        return
    fi
    
    # Improve table formatting (basic approach)
    awk '
    /^\|.*\|$/ {
        # This is a table row
        gsub(/^ *\| */, "|")
        gsub(/ *\| *$/, "|")
        gsub(/ *\| */, " | ")
        print
        next
    }
    { print }
    ' "$file" > "$temp_file"
    
    mv "$temp_file" "$file"
    echo "   ✅ Table formatting improved"
}

standardize_emphasis() {
    local file="$1"
    local temp_file="${file}.emphasis_temp"
    
    echo "**📝 Standardizing emphasis formatting in: $file"
    
    # Standardize bold formatting (prefer ** over __)
    sed 's/__\([^_]*\)__/**\1**/g' "$file" > "$temp_file.1"
    
    # Standardize italic formatting (prefer * over _)
    sed 's/\b_\([^_]*\)_\b/*\1*/g' "$temp_file.1" > "$temp_file.2"
    
    # Clean up any double formatting
    sed 's/\*\*\*\*/**/g' "$temp_file.2" > "$temp_file"
    
    mv "$temp_file" "$file"
    rm -f "$temp_file.1" "$temp_file.2"
    echo "   ✅ Emphasis formatting standardized"
}

improve_code_formatting() {
    local file="$1"
    local temp_file="${file}.code_temp"
    
    echo "💻 Improving code formatting in: $file"
    
    # Add consistent spacing around inline code
    sed 's/`\([^`]*\)`/ `\1` /g' "$file" | sed 's/  ` / `/g' | sed 's/` $/ `/g' > "$temp_file"
    
    mv "$temp_file" "$file"
    echo "   ✅ Code formatting improved"
}

add_section_breaks() {
    local file="$1"
    local temp_file="${file}.breaks_temp"
    
    echo "📄 Adding visual section breaks in: $file"
    
    # Add horizontal rules before major sections (level 2 headings)
    awk '
    /^## / {
        if (NR > 1) {
            print ""
            print "---"
            print ""
        }
    }
    { print }
    ' "$file" > "$temp_file"
    
    mv "$temp_file" "$file"
    echo "   ✅ Section breaks added"
}

improve_list_formatting() {
    local file="$1"
    local temp_file="${file}.list_temp"
    
    echo "📋 Improving list formatting in: $file"
    
    # Ensure consistent bullet characters and spacing
    awk '
    /^[ ]*[-+*] / {
        # Extract indentation and content
        match($0, /^[ ]*/)
        indent = substr($0, 1, RLENGTH)
        rest = substr($0, RLENGTH + 1)
        
        # Standardize to dash with single space
        gsub(/^[-+*] /, "", rest)
        print indent "- " rest
        next
    }
    { print }
    ' "$file" > "$temp_file"
    
    mv "$temp_file" "$file"
    echo "   ✅ List formatting improved"
}

add_badges_and_metadata() {
    local file="$1"
    
    echo "🏷️  Suggesting badges and metadata for: $file"
    
    filename=$(basename "$file" .md)
    
    # Suggest badges for different file types
    case "$filename" in
        "README")
            echo "   💡 Consider adding badges like:"
            echo "      ![Build Status](https://img.shields.io/badge/build-passing-brightgreen)"
            echo "      ![Version](https://img.shields.io/badge/version-2.2.0-blue)"
            ;;
        "CONTRIBUTING")
            echo "   💡 Consider adding contribution badges:"
            echo "      ![Contributors Welcome](https://img.shields.io/badge/contributors-welcome-green)"
            ;;
        *)
            if [[ "$file" =~ docs/technical ]]; then
                echo "   💡 Consider adding technical documentation badges"
            fi
            ;;
    esac
}

# Process files with advanced formatting
important_files=(
    "/workspaces/mh-website/README.md"
    "/workspaces/mh-website/docs/development/SETUP_GUIDE.md"
    "/workspaces/mh-website/docs/technical/DESIGN_SYSTEM.md"
    "/workspaces/mh-website/docs/guidelines/MARKDOWN_STYLE_GUIDE.md"
)

for file in "${important_files[@]}"; do
    if [ -f "$file" ]; then
        echo ""
        echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
        echo "Processing: $file"
        
        # Create backup
        cp "$file" "${file}.backup"
        
        improve_table_formatting "$file"
        standardize_emphasis "$file"
        improve_code_formatting "$file"
        improve_list_formatting "$file"
        add_badges_and_metadata "$file"
        
        echo "   ✅ Advanced formatting complete for: $file"
    fi
done

echo ""
echo "🎉 Advanced formatting improvements complete!"
echo "💾 Backups created with .backup extension"
echo "📋 Review changes and remove backups if satisfied"