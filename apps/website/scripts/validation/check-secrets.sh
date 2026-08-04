#!/bin/bash
# Pre-commit security check script
# Scans local files for potential credential exposure

set -euo pipefail

find_repo_root() {
  local dir="${1:-$PWD}"
  while [[ "$dir" != "/" ]]; do
    if [[ -f "$dir/package.json" && -f "$dir/pnpm-workspace.yaml" ]]; then
      printf '%s\n' "$dir"
      return 0
    fi
    dir="$(dirname "$dir")"
  done
  return 1
}

ROOT_DIR="$(find_repo_root "$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)")"
if [[ -z "${ROOT_DIR:-}" ]]; then
  echo "Unable to locate repository root." >&2
  exit 1
fi

cd "$ROOT_DIR"

echo "🔒 Running pre-commit security checks..."

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

check_secrets() {
    local file=$1
    local issues=0

    if grep -qE "(re|sk|pk)_[a-zA-Z0-9]{30,}" "$file" 2>/dev/null; then
        echo -e "${RED}⚠️  Potential API key found in: $file${NC}"
        grep -nE "(re|sk|pk)_[a-zA-Z0-9]{30,}" "$file" | head -3
        ((issues++))
    fi

    if grep -qEi "(password|passwd|pwd)['\"]?\s*[:=]\s*['\"][^'\"]{8,}['\"]" "$file" 2>/dev/null; then
        if ! grep -q "admin123\|demo123\|password123" "$file"; then
            echo -e "${YELLOW}⚠️  Potential hardcoded password in: $file${NC}"
            grep -nEi "(password|passwd|pwd)['\"]?\s*[:=]\s*['\"][^'\"]{8,}['\"]" "$file" | head -3
            ((issues++))
        fi
    fi

    if grep -qE "AKIA[0-9A-Z]{16}" "$file" 2>/dev/null; then
        echo -e "${RED}⚠️  Potential AWS access key in: $file${NC}"
        ((issues++))
    fi

    if grep -qE "cfat_[A-Za-z0-9_-]{20,}" "$file" 2>/dev/null; then
        echo -e "${RED}⚠️  Potential Cloudflare API token found in: $file${NC}"
        grep -nE "cfat_[A-Za-z0-9_-]{20,}" "$file" | head -3
        ((issues++))
    fi

    if grep -q "BEGIN.*PRIVATE KEY" "$file" 2>/dev/null; then
        echo -e "${RED}⚠️  Private key found in: $file${NC}"
        ((issues++))
    fi

    if grep -qE "(mongodb|mysql|postgres|postgresql)://[^'\"\s]+" "$file" 2>/dev/null; then
        echo -e "${YELLOW}⚠️  Database connection string in: $file${NC}"
        ((issues++))
    fi

    return $issues
}

collect_files() {
    if [[ $# -gt 0 ]]; then
        printf '%s\n' "$@"
        return 0
    fi

    if [[ -d "$ROOT_DIR/.git" ]] && command -v git >/dev/null 2>&1; then
        git -C "$ROOT_DIR" diff --cached --name-only --diff-filter=ACM
        return 0
    fi

    find "$ROOT_DIR" -type f \
        ! -path "*/node_modules/*" \
        ! -path "*/.git/*" \
        ! -path "*/.next/*" \
        ! -path "*/coverage/*" \
        | sed "s#^$ROOT_DIR/##" | sort
}

mapfile -t STAGED_FILES < <(collect_files "$@")

if [ ${#STAGED_FILES[@]} -eq 0 ]; then
    echo -e "${GREEN}✓ No files to check${NC}"
    exit 0
fi

if printf '%s\n' "${STAGED_FILES[@]}" | grep -qE '(^|/)\.env(\.r2)?\.local$'; then
    echo -e "${RED}❌ ERROR: private local env file is staged!${NC}"
    echo "These files can contain secrets and should NEVER be committed."
    exit 1
fi

if printf '%s\n' "${STAGED_FILES[@]}" | grep -E '(^|/)\.env(\.[A-Za-z0-9_-]+)?$' | grep -vE '\.env\.local\.example$|\.env\.r2\.local\.example$'; then
    echo -e "${RED}❌ ERROR: .env file(s) detected in staged files!${NC}"
    echo "Environment files with secrets should not be committed."
    echo "Only committed example templates should be checked in."
    exit 1
fi

TOTAL_ISSUES=0
for file in "${STAGED_FILES[@]}"; do
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
