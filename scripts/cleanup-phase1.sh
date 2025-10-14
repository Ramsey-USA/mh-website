#!/bin/bash
# MH Website Codebase Cleanup - Phase 1 (Safe)
# This script performs safe cleanup operations with low risk
# All .backup files are already backed up in /backups/ directory

set -e  # Exit on error

echo "=================================================="
echo "MH Website Codebase Cleanup - Phase 1"
echo "=================================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track changes
BACKUP_COUNT=0
FILES_REMOVED=0
DIRS_REMOVED=0

# 1. Remove all .backup files from src (already backed up in /backups/)
echo "${YELLOW}Step 1: Removing .backup files from src directory...${NC}"
BACKUP_FILES=$(find /workspaces/mh-website/src -name "*.backup" -type f)
if [ -n "$BACKUP_FILES" ]; then
    BACKUP_COUNT=$(echo "$BACKUP_FILES" | wc -l)
    echo "Found $BACKUP_COUNT backup files"
    find /workspaces/mh-website/src -name "*.backup" -type f -delete
    FILES_REMOVED=$((FILES_REMOVED + BACKUP_COUNT))
    echo "${GREEN}✓ Removed $BACKUP_COUNT .backup files${NC}"
else
    echo "No .backup files found"
fi
echo ""

# 2. Remove backup config file
echo "${YELLOW}Step 2: Removing backup config files...${NC}"
if [ -f /workspaces/mh-website/.markdownlint-cli2.jsonc.backup ]; then
    rm /workspaces/mh-website/.markdownlint-cli2.jsonc.backup
    FILES_REMOVED=$((FILES_REMOVED + 1))
    echo "${GREEN}✓ Removed .markdownlint-cli2.jsonc.backup${NC}"
else
    echo "Backup config file not found (may have been removed already)"
fi
echo ""

# 3. Remove empty test directories
echo "${YELLOW}Step 3: Removing empty directories...${NC}"
for dir in "/workspaces/mh-website/src/app/phase-testing" "/workspaces/mh-website/src/app/test-css"; do
    if [ -d "$dir" ]; then
        if [ -z "$(ls -A "$dir")" ]; then
            rmdir "$dir"
            DIRS_REMOVED=$((DIRS_REMOVED + 1))
            echo "${GREEN}✓ Removed empty directory: $dir${NC}"
        else
            echo "Directory not empty, skipping: $dir"
        fi
    else
        echo "Directory not found: $dir"
    fi
done
echo ""

# 4. Move test files from root
echo "${YELLOW}Step 4: Moving test files to scripts/tests/...${NC}"
mkdir -p /workspaces/mh-website/scripts/tests

if [ -f /workspaces/mh-website/test-responsive-complete.html ]; then
    mv /workspaces/mh-website/test-responsive-complete.html /workspaces/mh-website/scripts/tests/
    echo "${GREEN}✓ Moved test-responsive-complete.html${NC}"
else
    echo "test-responsive-complete.html not found"
fi

if [ -f /workspaces/mh-website/test-responsive.sh ]; then
    mv /workspaces/mh-website/test-responsive.sh /workspaces/mh-website/scripts/tests/
    chmod +x /workspaces/mh-website/scripts/tests/test-responsive.sh
    echo "${GREEN}✓ Moved test-responsive.sh${NC}"
else
    echo "test-responsive.sh not found"
fi
echo ""

# 5. Remove test file from public
echo "${YELLOW}Step 5: Removing test file from public directory...${NC}"
if [ -f /workspaces/mh-website/public/test-hero.html ]; then
    rm /workspaces/mh-website/public/test-hero.html
    FILES_REMOVED=$((FILES_REMOVED + 1))
    echo "${GREEN}✓ Removed test-hero.html from public${NC}"
else
    echo "test-hero.html not found in public directory"
fi
echo ""

# Summary
echo "=================================================="
echo "${GREEN}Phase 1 Cleanup Complete!${NC}"
echo "=================================================="
echo "Files removed: $FILES_REMOVED"
echo "Directories removed: $DIRS_REMOVED"
echo ""
echo "Next steps:"
echo "1. Run 'npm run build' to verify everything still works"
echo "2. Run 'git status' to review changes"
echo "3. Review CODEBASE_AUDIT_REPORT.md for Phase 2 actions"
echo ""
