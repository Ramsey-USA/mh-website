#!/bin/bash

# Comprehensive Markdown Linting Fix Script
# Fixes all markdown linting violations across the entire codebase

set -e

echo "🔧 Starting comprehensive markdown linting fixes..."

# Function to add blank lines around headings (MD022)
fix_heading_spacing() {
    local file="$1"
    echo "  📝 Fixing heading spacing in $file"
    
    # Use sed to add blank lines before and after headings
    sed -i '
        # Add blank line before headings (if not already there)
        /^#/ {
            x
            /^$/ !{
                x
                i\

                b
            }
            x
        }
        
        # Store current line for next iteration
        h
    ' "$file"
    
    # Add blank line after headings
    sed -i '
        /^#/ {
            N
            /\n$/ !{
                s/$/\n/
            }
        }
    ' "$file"
}

# Function to add blank lines around lists (MD032)
fix_list_spacing() {
    local file="$1"
    echo "  📋 Fixing list spacing in $file"
    
    # Add blank lines before lists
    sed -i '
        /^[[:space:]]*[-*+]/ {
            x
            /^$/ !{
                x
                i\

                b
            }
            x
        }
        /^[[:space:]]*[0-9]/ {
            x
            /^$/ !{
                x
                i\

                b
            }
            x
        }
        h
    ' "$file"
    
    # Add blank lines after lists
    sed -i '
        /^[[:space:]]*[-*+]/ {
            :loop
            N
            /\n[[:space:]]*[-*+]/ b loop
            /\n[[:space:]]*[0-9]/ b loop
            /\n$/ !{
                s/$/\n/
            }
        }
        /^[[:space:]]*[0-9]/ {
            :loop2
            N
            /\n[[:space:]]*[-*+]/ b loop2
            /\n[[:space:]]*[0-9]/ b loop2
            /\n$/ !{
                s/$/\n/
            }
        }
    ' "$file"
}

# Function to fix line length issues (MD013)
fix_line_length() {
    local file="$1"
    echo "  📏 Fixing line length in $file"
    
    # Break long lines at 80 characters for regular text
    # Skip code blocks, URLs, and tables
    python3 << 'EOF'
import sys
import re

def fix_line_length(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    fixed_lines = []
    in_code_block = False
    
    for line in lines:
        # Check if we're entering/leaving a code block
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            fixed_lines.append(line)
            continue
        
        # Skip code blocks, tables, and URLs
        if (in_code_block or 
            '|' in line or 
            line.strip().startswith('    ') or
            'http' in line or
            line.strip().startswith('>')):
            fixed_lines.append(line)
            continue
        
        # Fix long lines
        if len(line.rstrip()) > 80:
            # Try to break at word boundaries
            words = line.split()
            if len(words) > 1:
                current_line = ""
                for word in words:
                    if len(current_line + word) > 78:  # Leave room for continuation
                        fixed_lines.append(current_line.rstrip() + '\n')
                        current_line = word + " "
                    else:
                        current_line += word + " "
                if current_line.strip():
                    fixed_lines.append(current_line.rstrip() + '\n')
            else:
                fixed_lines.append(line)
        else:
            fixed_lines.append(line)
    
    with open(filename, 'w') as f:
        f.writelines(fixed_lines)

if __name__ == "__main__":
    fix_line_length(sys.argv[1])
EOF
    python3 - "$file"
}

# Function to remove trailing spaces (MD009)
fix_trailing_spaces() {
    local file="$1"
    echo "  🧹 Removing trailing spaces from $file"
    sed -i 's/[[:space:]]*$//' "$file"
}

# Function to fix duplicate headings (MD024)
fix_duplicate_headings() {
    local file="$1"
    echo "  🔄 Checking for duplicate headings in $file"
    
    # This is complex and file-specific, so we'll handle manually
    # For now, just report duplicates
    grep -n "^#" "$file" | sort -k2 | uniq -f1 -d || true
}

# Main processing function
process_file() {
    local file="$1"
    echo "🔧 Processing: $file"
    
    # Create backup
    cp "$file" "$file.backup"
    
    # Apply fixes
    fix_trailing_spaces "$file"
    fix_heading_spacing "$file"
    fix_list_spacing "$file"
    fix_line_length "$file"
    fix_duplicate_headings "$file"
    
    echo "✅ Completed: $file"
}

# Find all markdown files and process them
echo "🔍 Finding all markdown files..."
find . -name "*.md" -not -path "./node_modules/*" -not -path "*/.git/*" | while read -r file; do
    process_file "$file"
done

echo "🎉 Comprehensive markdown fixes completed!"
echo "📝 Running final lint check..."

# Run final lint check
npm run lint:markdown || echo "⚠️  Some issues may require manual review"

echo "✨ Process complete!"