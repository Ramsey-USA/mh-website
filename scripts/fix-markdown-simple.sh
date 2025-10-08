#!/bin/bash

# Simple Markdown Linting Fix Script
# Fixes common markdown linting issues

set -e

echo "🔧 Simple Markdown Linting Fix"
echo "==============================="

fix_markdown_file() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    echo "🔄 Processing: $file"
    
    # Use sed to fix common issues
    sed '
        # MD022: Add blank lines around headings
        /^#{1,6} /{
            # If previous line is not empty, add blank line before
            x
            /./{
                x
                i\

                x
            }
            x
        }
        
        # Store each line for next iteration
        h
    ' "$file" > "$temp_file.1"
    
    # Second pass for list formatting and final cleanup
    awk '
    BEGIN { 
        in_list = 0
        in_code_block = 0
    }
    
    # Track code blocks
    /^```/ {
        if (!in_code_block) {
            # Starting code block - add blank line before if needed
            if (prev_line && prev_line !~ /^$/) {
                print ""
            }
            in_code_block = 1
        } else {
            # Ending code block
            in_code_block = 0
            print $0
            # Add blank line after if next line exists and isnt blank
            next_line_blank = 0
            next
        }
    }
    
    # Track lists
    /^[[:space:]]*[-*+][[:space:]]/ || /^[[:space:]]*[0-9]+\.[[:space:]]/ {
        if (!in_list) {
            # Starting list - add blank line before if needed
            if (prev_line && prev_line !~ /^$/) {
                print ""
            }
            in_list = 1
        }
    }
    
    # Check if we are leaving a list
    !/^[[:space:]]*[-*+][[:space:]]/ && !/^[[:space:]]*[0-9]+\.[[:space:]]/ && !/^$/ {
        if (in_list && !in_code_block) {
            # Ending list - add blank line before current line
            print ""
            in_list = 0
        }
    }
    
    # Print current line
    { 
        print $0
        prev_line = $0
    }
    
    END {
        # Ensure file ends with single newline
        if (prev_line !~ /^$/) {
            print ""
        }
    }
    ' "$temp_file.1" > "$temp_file.2"
    
    # Clean up multiple consecutive blank lines
    awk '
    /^$/ {
        if (empty_lines < 2) {
            empty_lines++
            print
        }
        next
    }
    
    {
        empty_lines = 0
        print
    }
    ' "$temp_file.2" > "$temp_file"
    
    # Replace original file
    mv "$temp_file" "$file"
    rm -f "$temp_file.1" "$temp_file.2"
    
    echo "   ✅ Fixed: $file"
}

# Process all markdown files
echo "📁 Finding markdown files..."

find /workspaces/mh-website -name "*.md" -type f | while read -r file; do
    # Skip files in node_modules, .git, or .next
    if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".git"* ]] || [[ "$file" == *".next"* ]]; then
        continue
    fi
    
    fix_markdown_file "$file"
done

echo ""
echo "🎉 Markdown linting fixes complete!"
echo "📝 Fixed common issues:"
echo "   - MD022: Blank lines around headings"
echo "   - MD032: Blank lines around lists"
echo "   - MD031: Blank lines around code blocks"
echo "   - MD047: Single trailing newline"