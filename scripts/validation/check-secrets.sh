#!/bin/bash
# Pre-commit security check script
# Scans staged files for potential credential exposure

set -e

echo "🔒 Running pre-commit security checks..."

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Function to check for potential secrets
check_secrets() {
    local file=$1
    local issues=0
    
    # Check for potential API keys (re_xxx, sk_xxx, pk_xxx patterns)
    if grep -qE "(re|sk|pk)_[a-zA-Z0-9]{30,}" "$file" 2>/dev/null; then
        echo -e "${RED}⚠️  Potential API key found in: $file${NC}"
        grep -nE "(re|sk|pk)_[a-zA-Z0-9]{30,}" "$file" | head -3
        ((issues++))
    fi
    
    # Check for hardcoded passwords (common patterns)
    if grep -qEi "(password|passwd|pwd)['\"]?\s*[:=]\s*['\"][^'\"]{8,}['\"]" "$file" 2>/dev/null; then
        if ! grep -q "admin123\|demo123\|password123" "$file"; then
            echo -e "${YELLOW}⚠️  Potential hardcoded password in: $file${NC}"
            grep -nEi "(password|passwd|pwd)['\"]?\s*[:=]\s*['\"][^'\"]{8,}['\"]" "$file" | head -3
            ((issues++))
        fi
    fi
    
    # Check for AWS keys
    if grep -qE "AKIA[0-9A-Z]{16}" "$file" 2>/dev/null; then
        echo -e "${RED}⚠️  Potential AWS access key in: $file${NC}"
        ((issues++))
    fi
    
    # Check for private keys
    if grep -q "BEGIN.*PRIVATE KEY" "$file" 2>/dev/null; then
        echo -e "${RED}⚠️  Private key found in: $file${NC}"
        ((issues++))
    fi
    
    # Check for database connection strings
    if grep -qE "(mongodb|mysql|postgres|postgresql)://[^'\"\s]+" "$file" 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Database connection string in: $file${NC}"
        ((issues++))
    fi
    
    return $issues
}

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$STAGED_FILES" ]; then
    echo -e "${GREEN}✓ No files to check${NC}"
    exit 0
fi

# Check if .env.local is accidentally staged
if echo "$STAGED_FILES" | grep -q "\.env\.local"; then
    echo -e "${RED}❌ ERROR: .env.local file is staged!${NC}"
    echo "This file contains secrets and should NEVER be committed."
    echo "Run: git reset HEAD .env.local"
    exit 1
fi

# Check if any .env files (except .env.local.example) are staged
if echo "$STAGED_FILES" | grep -E "\.env(\.[a-z]+)?$" | grep -v "\.env\.local\.example"; then
    echo -e "${RED}❌ ERROR: .env file(s) detected in staged files!${NC}"
    echo "Environment files with secrets should not be committed."
    echo "Only .env.local.example (template) should be committed."
    exit 1
fi

TOTAL_ISSUES=0

# Check each staged file
for file in $STAGED_FILES; do
    # Skip binary files, node_modules, and certain extensions
    if [[ -f "$file" ]] && \
       [[ ! "$file" =~ \.png$ ]] && \
       [[ ! "$file" =~ \.jpg$ ]] && \
       [[ ! "$file" =~ \.jpeg$ ]] && \
       [[ ! "$file" =~ \.gif$ ]] && \
       [[ ! "$file" =~ \.ico$ ]] && \
       [[ ! "$file" =~ \.woff$ ]] && \
       [[ ! "$file" =~ \.woff2$ ]] && \
       [[ ! "$file" =~ \.ttf$ ]] && \
       [[ ! "$file" =~ \.eot$ ]] && \
       [[ ! "$file" =~ node_modules ]] && \
       [[ ! "$file" =~ \.next ]] && \
       [[ ! "$file" =~ coverage ]]; then
        
        check_secrets "$file" || ((TOTAL_ISSUES++))
    fi
done

echo ""
if [ $TOTAL_ISSUES -gt 0 ]; then
    echo -e "${RED}❌ Security check failed: Found $TOTAL_ISSUES potential issue(s)${NC}"
    echo ""
    echo "If these are false positives, you can:"
    echo "1. Add exceptions to this script for known safe patterns"
    echo "2. Skip this check with: git commit --no-verify (NOT recommended)"
    echo ""
    echo "For actual secrets:"
    echo "1. Remove them from the files"
    echo "2. Use environment variables instead"
    echo "3. Add to .env.local (which is gitignored)"
    echo "4. For production, use Cloudflare Workers secrets"
    exit 1
else
    echo -e "${GREEN}✓ Security check passed - no secrets detected${NC}"
    exit 0
fi
