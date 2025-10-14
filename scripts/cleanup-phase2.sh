#!/bin/bash
# MH Website Codebase Cleanup - Phase 2 (Test Routes Removal)
# This script removes test/demo routes from production app structure
# IMPORTANT: Review and test before running in production

set -e  # Exit on error

echo "=================================================="
echo "MH Website Codebase Cleanup - Phase 2"
echo "Test Routes Removal"
echo "=================================================="
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Warning
echo "${RED}⚠️  WARNING: This script will remove test routes from production${NC}"
echo "${RED}⚠️  Make sure you have committed your work before proceeding${NC}"
echo ""
read -p "Do you want to continue? (yes/no): " -r
echo
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "Aborting..."
    exit 1
fi

# Create backup before removal
BACKUP_DIR="backups/test-routes-removal-$(date +%Y%m%d_%H%M%S)"
echo "${YELLOW}Creating backup in $BACKUP_DIR...${NC}"
mkdir -p "$BACKUP_DIR"

# Backup test directories
for dir in test test-markdown phase1-test phase2-test analytics-demo; do
    if [ -d "/workspaces/mh-website/src/app/$dir" ]; then
        cp -r "/workspaces/mh-website/src/app/$dir" "$BACKUP_DIR/"
        echo "✓ Backed up $dir"
    fi
done
echo ""

# Track removals
ROUTES_REMOVED=0

# Remove test directories
echo "${YELLOW}Removing test routes...${NC}"

TEST_ROUTES=(
    "/workspaces/mh-website/src/app/test"
    "/workspaces/mh-website/src/app/test-markdown"
    "/workspaces/mh-website/src/app/phase1-test"
    "/workspaces/mh-website/src/app/phase2-test"
)

for route in "${TEST_ROUTES[@]}"; do
    if [ -d "$route" ]; then
        rm -rf "$route"
        ROUTES_REMOVED=$((ROUTES_REMOVED + 1))
        echo "${GREEN}✓ Removed $(basename "$route")${NC}"
    else
        echo "Route not found: $(basename "$route")"
    fi
done
echo ""

# Handle analytics-demo separately
echo "${YELLOW}Analytics Demo Route:${NC}"
if [ -d "/workspaces/mh-website/src/app/analytics-demo" ]; then
    echo "Found analytics-demo route"
    read -p "Do you want to remove analytics-demo as well? (yes/no): " -r
    echo
    if [[ $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
        rm -rf "/workspaces/mh-website/src/app/analytics-demo"
        ROUTES_REMOVED=$((ROUTES_REMOVED + 1))
        echo "${GREEN}✓ Removed analytics-demo${NC}"
    else
        echo "${YELLOW}⚠️  Kept analytics-demo (consider gating with auth)${NC}"
    fi
else
    echo "analytics-demo not found"
fi
echo ""

# Summary
echo "=================================================="
echo "${GREEN}Phase 2 Cleanup Complete!${NC}"
echo "=================================================="
echo "Test routes removed: $ROUTES_REMOVED"
echo "Backup location: $BACKUP_DIR"
echo ""
echo "${RED}IMPORTANT: Verify everything works before deploying!${NC}"
echo ""
echo "Next steps:"
echo "1. Run 'npm run build' to verify build succeeds"
echo "2. Run 'npm run dev' and test your site"
echo "3. Verify sitemap doesn't include removed routes"
echo "4. Check for any import errors"
echo "5. If everything works, commit the changes"
echo "6. If there are issues, restore from backup:"
echo "   cp -r $BACKUP_DIR/* /workspaces/mh-website/src/app/"
echo ""
