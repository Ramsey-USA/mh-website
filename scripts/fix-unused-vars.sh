#!/bin/bash

# Script to fix unused variable warnings
# This script will prefix unused variables with _ to indicate they're intentionally unused

echo "Fixing unused variable warnings..."

# Get list of files with unused vars
files_with_warnings=$(npx eslint src --ext .js,.jsx,.ts,.tsx 2>&1 | grep "no-unused-vars" | cut -d':' -f1 | sort -u)

echo "Found files with unused variable warnings:"
echo "$files_with_warnings"

# For each file, we'll need to manually review since automated fixes could break code
echo ""
echo "To fix these systematically:"
echo "1. Use ESLint's --fix flag for auto-fixable issues"
echo "2. Manually prefix intentionally unused params with _"
echo "3. Remove truly unused imports"

# Try ESLint autofix first
npx eslint src --ext .js,.jsx,.ts,.tsx --fix

echo "Auto-fix complete. Remaining warnings need manual review."
