#!/bin/bash
# MH Website Codebase Cleanup - Phase 3 (Configuration Consolidation)
# This script consolidates duplicate configuration files
# IMPORTANT: Review diffs before running

set -e  # Exit on error

echo "=================================================="
echo "MH Website Codebase Cleanup - Phase 3"
echo "Configuration Consolidation"
echo "=================================================="
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check for differences
echo "${YELLOW}Checking for differences in configuration files...${NC}"
echo ""

CONFIG_IDENTICAL=true

# Compare firebase.json
echo "Comparing firebase.json files..."
if diff -q /workspaces/mh-website/firebase.json /workspaces/mh-website/config/deployment/firebase.json >/dev/null 2>&1; then
    echo "${GREEN}✓ firebase.json files are identical${NC}"
else
    echo "${RED}✗ firebase.json files differ!${NC}"
    echo "Showing differences:"
    diff /workspaces/mh-website/firebase.json /workspaces/mh-website/config/deployment/firebase.json || true
    CONFIG_IDENTICAL=false
fi
echo ""

# Compare .eslintrc.json
echo "Comparing .eslintrc.json files..."
if diff -q /workspaces/mh-website/.eslintrc.json /workspaces/mh-website/config/quality/.eslintrc.json >/dev/null 2>&1; then
    echo "${GREEN}✓ .eslintrc.json files are identical${NC}"
else
    echo "${RED}✗ .eslintrc.json files differ!${NC}"
    echo "Showing differences:"
    diff /workspaces/mh-website/.eslintrc.json /workspaces/mh-website/config/quality/.eslintrc.json || true
    CONFIG_IDENTICAL=false
fi
echo ""

if [ "$CONFIG_IDENTICAL" = false ]; then
    echo "${RED}⚠️  Configuration files differ!${NC}"
    echo "Please review the differences above and reconcile them before proceeding."
    echo "Aborting..."
    exit 1
fi

# Proceed with removal
echo "${YELLOW}All configuration files are identical.${NC}"
echo "This script will remove duplicate configs from /config/ directory"
echo "and keep the root-level configs (standard for most tools)."
echo ""
read -p "Do you want to continue? (yes/no): " -r
echo
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "Aborting..."
    exit 1
fi

# Create backup
BACKUP_DIR="backups/config-consolidation-$(date +%Y%m%d_%H%M%S)"
echo "${YELLOW}Creating backup in $BACKUP_DIR...${NC}"
mkdir -p "$BACKUP_DIR"

if [ -f /workspaces/mh-website/config/deployment/firebase.json ]; then
    cp /workspaces/mh-website/config/deployment/firebase.json "$BACKUP_DIR/"
    echo "✓ Backed up config/deployment/firebase.json"
fi

if [ -f /workspaces/mh-website/config/quality/.eslintrc.json ]; then
    cp /workspaces/mh-website/config/quality/.eslintrc.json "$BACKUP_DIR/"
    echo "✓ Backed up config/quality/.eslintrc.json"
fi
echo ""

# Remove duplicate configs
echo "${YELLOW}Removing duplicate configuration files...${NC}"

FILES_REMOVED=0

if [ -f /workspaces/mh-website/config/deployment/firebase.json ]; then
    rm /workspaces/mh-website/config/deployment/firebase.json
    FILES_REMOVED=$((FILES_REMOVED + 1))
    echo "${GREEN}✓ Removed config/deployment/firebase.json${NC}"
fi

if [ -f /workspaces/mh-website/config/quality/.eslintrc.json ]; then
    rm /workspaces/mh-website/config/quality/.eslintrc.json
    FILES_REMOVED=$((FILES_REMOVED + 1))
    echo "${GREEN}✓ Removed config/quality/.eslintrc.json${NC}"
fi
echo ""

# Summary
echo "=================================================="
echo "${GREEN}Phase 3 Cleanup Complete!${NC}"
echo "=================================================="
echo "Duplicate configs removed: $FILES_REMOVED"
echo "Backup location: $BACKUP_DIR"
echo ""
echo "Active configurations (in root):"
echo "  - firebase.json"
echo "  - .eslintrc.json"
echo ""
echo "Next steps:"
echo "1. Run 'npm run build' to verify build succeeds"
echo "2. Run 'npm run lint' to verify linting works"
echo "3. Test Firebase deployment commands"
echo "4. If everything works, commit the changes"
echo "5. If there are issues, restore from backup:"
echo "   cp $BACKUP_DIR/firebase.json /workspaces/mh-website/config/deployment/"
echo "   cp $BACKUP_DIR/.eslintrc.json /workspaces/mh-website/config/quality/"
echo ""
