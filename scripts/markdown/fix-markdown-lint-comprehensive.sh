#!/bin/bash

# Comprehensive Markdown Linting Fix Script
# Fixes common markdown linting issues across all .md files

set -e

echo "🔧 Comprehensive Markdown Linting Fix"
echo "===================================="

# Function to fix a single markdown file
fix_markdown_file() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    echo "🔄 Processing: $file"
    
    # Read the file and apply fixes
    python3 -c "
import re
import sys

def fix_markdown(content):
    lines = content.split('\n')
    fixed_lines = []
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # MD022: Headings should be surrounded by blank lines
        if re.match(r'^#{1,6}\s+', line):
            # Add blank line before heading if not at start and previous line isn't blank
            if i > 0 and fixed_lines and fixed_lines[-1].strip() != '':
                fixed_lines.append('')
            
            fixed_lines.append(line)
            
            # Add blank line after heading if next line exists and isn't blank
            if i + 1 < len(lines) and lines[i + 1].strip() != '':
                fixed_lines.append('')
        
        # MD032: Lists should be surrounded by blank lines
        elif re.match(r'^[\s]*[-*+]\s+', line) or re.match(r'^[\s]*\d+\.\s+', line):
            # Check if this is the start of a list
            prev_line = lines[i-1] if i > 0 else ''
            is_list_start = not re.match(r'^[\s]*[-*+]\s+', prev_line) and not re.match(r'^[\s]*\d+\.\s+', prev_line)
            
            if is_list_start and i > 0 and prev_line.strip() != '':
                fixed_lines.append('')
            
            # Add all consecutive list items
            while i < len(lines) and (re.match(r'^[\s]*[-*+]\s+', lines[i]) or re.match(r'^[\s]*\d+\.\s+', lines[i]) or (lines[i].strip() == '' and i + 1 < len(lines) and (re.match(r'^[\s]*[-*+]\s+', lines[i+1]) or re.match(r'^[\s]*\d+\.\s+', lines[i+1])))):
                fixed_lines.append(lines[i])
                i += 1
            
            # Add blank line after list if next line exists and isn't blank
            if i < len(lines) and lines[i].strip() != '':
                fixed_lines.append('')
            
            i -= 1  # Adjust because we'll increment at the end of the loop
        
        # MD031: Fenced code blocks should be surrounded by blank lines
        elif line.strip().startswith('```'):
            # Add blank line before code block if previous line isn't blank
            if i > 0 and fixed_lines and fixed_lines[-1].strip() != '':
                fixed_lines.append('')
            
            fixed_lines.append(line)
            i += 1
            
            # Add all lines until closing fence
            while i < len(lines) and not lines[i].strip().startswith('```'):
                fixed_lines.append(lines[i])
                i += 1
            
            # Add closing fence
            if i < len(lines):
                fixed_lines.append(lines[i])
            
            # Add blank line after code block if next line exists and isn't blank
            if i + 1 < len(lines) and lines[i + 1].strip() != '':
                fixed_lines.append('')
        
        else:
            fixed_lines.append(line)
        
        i += 1
    
    # MD047: Files should end with a single newline character
    # Remove multiple trailing newlines
    while len(fixed_lines) > 0 and fixed_lines[-1] == '':
        fixed_lines.pop()
    
    # Add single trailing newline
    if fixed_lines:
        fixed_lines.append('')
    
    return '\n'.join(fixed_lines)

# Read input file
with open('$file', 'r', encoding='utf-8') as f:
    content = f.read()

# Apply fixes
fixed_content = fix_markdown(content)

# Write to temp file
with open('$temp_file', 'w', encoding='utf-8') as f:
    f.write(fixed_content)

print('Fixed: $file')
" && mv "$temp_file" "$file"
}

# Find all markdown files
echo "📁 Finding markdown files..."
find /workspaces/mh-website -name "*.md" -type f | while read -r file; do
    # Skip files in node_modules or .git
    if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *".git"* ]]; then
        continue
    fi
    
    fix_markdown_file "$file"
done

echo ""
echo "🎉 Markdown linting fixes complete!"
echo "💡 All .md files have been processed for common linting issues"