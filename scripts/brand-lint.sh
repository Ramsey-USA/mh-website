#!/bin/bash
# scripts/brand-lint.sh
# Brand consistency lint: checks for banned variants of slogan, address, and veteran-owned phrases.
# Files inside docs/project/ (audit history) and lines inside <!-- LINT-EXEMPT --> blocks are skipped.
set -euo pipefail

FAIL=0

check() {
  local pattern="$1"
  local results
  results=$(grep -rn "$pattern" \
    --include="*.md" --include="*.ts" --include="*.tsx" \
    --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=coverage \
    --exclude-dir=.open-next --exclude-dir=dist \
    . 2>/dev/null \
    | grep -v "brand-lint" \
    | grep -v "^./docs/project/" \
    | grep -v "LINT-EXEMPT" \
    || true)

  if [[ -n "$results" ]]; then
    echo "❌ BANNED PATTERN: $pattern"
    echo "$results"
    echo
    FAIL=1
  fi
}

echo "Running brand consistency lint..."
echo

check "for the client, not the"
check "N\. Capitol Ave\."
check "Veteran-[Oo]wned since [0-9]"
check "veteran-owned since"

if [[ $FAIL -eq 0 ]]; then
  echo "✅ Brand lint passed — no banned patterns found."
fi

exit $FAIL