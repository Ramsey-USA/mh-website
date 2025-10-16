#!/bin/bash

# MH Construction - Comprehensive Link Validation Test
# Tests all internal markdown links to ensure they're working after reorganization

echo "🔗 MH Construction - Link Validation Test"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
total_links=0
broken_links=0
working_links=0
skipped_links=0

# Function to check if a file exists relative to the markdown file's directory
check_link() {
    local md_file="$1"
    local link_path="$2"
    local md_dir=$(dirname "$md_file")
    
    # Skip external links (http/https/mailto)
    if [[ "$link_path" =~ ^https?:// ]] || [[ "$link_path" =~ ^mailto: ]] || [[ "$link_path" =~ ^# ]]; then
        return 2 # Skip
    fi
    
    # Handle relative paths
    if [[ "$link_path" =~ ^\.\/ ]]; then
        # Remove leading ./
        link_path="${link_path#./}"
    fi
    
    # Construct full path
    if [[ "$link_path" =~ ^/ ]]; then
        # Absolute path from root
        full_path="/workspaces/mh-website${link_path}"
    else
        # Relative path from markdown file directory
        full_path="$md_dir/$link_path"
    fi
    
    # Remove fragment identifiers (#section)
    full_path="${full_path%#*}"
    
    # Check if file exists
    if [ -f "$full_path" ] || [ -d "$full_path" ]; then
        return 0 # Working
    else
        return 1 # Broken
    fi
}

# Function to extract and test links from a markdown file
test_markdown_file() {
    local file="$1"
    echo -e "${BLUE}📄 Testing: ${file}${NC}"
    
    local file_link_count=0
    local file_broken_count=0
    
    # Extract markdown links [text](url) and [text]: url
    while IFS= read -r link; do
        if [ -n "$link" ]; then
            ((total_links++))
            ((file_link_count++))
            
            check_link "$file" "$link"
            case $? in
                0) # Working
                    ((working_links++))
                    echo -e "  ${GREEN}✅${NC} $link"
                    ;;
                1) # Broken
                    ((broken_links++))
                    ((file_broken_count++))
                    echo -e "  ${RED}❌${NC} $link (FILE NOT FOUND)"
                    ;;
                2) # Skipped
                    ((skipped_links++))
                    echo -e "  ${YELLOW}⏭️${NC} $link (external/anchor)"
                    ;;
            esac
        fi
    done < <(grep -oP '\[([^\]]*)\]\(([^)]+)\)' "$file" | sed 's/\[.*\](\([^)]*\))/\1/' | grep -v '^$')
    
    if [ $file_broken_count -gt 0 ]; then
        echo -e "  ${RED}⚠️  Found $file_broken_count broken link(s) in this file${NC}"
    else
        echo -e "  ${GREEN}✅ All $file_link_count link(s) working${NC}"
    fi
    echo ""
}

echo "🔍 Scanning for markdown files (excluding archives)..."
echo ""

# Find all markdown files excluding archives and backups
while IFS= read -r -d '' file; do
    test_markdown_file "$file"
done < <(find /workspaces/mh-website -name "*.md" -not -path "*/archive/*" -not -path "*/backups/*" -not -path "*/.git/*" -not -path "*/node_modules/*" -print0)

echo "========================================"
echo -e "${BLUE}📊 LINK VALIDATION SUMMARY${NC}"
echo "========================================"
echo -e "Total internal links tested: ${BLUE}$total_links${NC}"
echo -e "Working links: ${GREEN}$working_links${NC}"
echo -e "Broken links: ${RED}$broken_links${NC}"
echo -e "Skipped links (external/anchors): ${YELLOW}$skipped_links${NC}"
echo ""

if [ $broken_links -eq 0 ]; then
    echo -e "${GREEN}🎉 SUCCESS: All internal links are working!${NC}"
    echo -e "${GREEN}✅ Navigation is fully intact after reorganization${NC}"
    exit 0
else
    echo -e "${RED}⚠️  WARNING: Found $broken_links broken link(s)${NC}"
    echo -e "${YELLOW}🔧 These links need to be fixed to maintain navigation${NC}"
    exit 1
fi