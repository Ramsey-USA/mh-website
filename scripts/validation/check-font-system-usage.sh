#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

echo "[font-system] Running documents typography guardrail..."
(
  cd "$ROOT_DIR/apps/website"
  npm run docs:guardrails:typography:check >/dev/null
)

echo "[font-system] Scanning repository for legacy font patterns..."

# Keep denylist checks focused on source/template assets.
INCLUDE_GLOBS=(
  "*.ts"
  "*.tsx"
  "*.js"
  "*.mjs"
  "*.cjs"
  "*.css"
  "*.scss"
  "*.html"
)

EXCLUDE_GLOBS=(
  "!**/node_modules/**"
  "!**/.next/**"
  "!**/documents/output/**"
  "!**/apps/website/documents/output/**"
  "!**/documents/_tmp_*"
  "!**/apps/website/documents/_tmp_*"
  "!documents/scripts/generate.mjs"
  "!scripts/brand-lint.sh"
  "!apps/website/scripts/brand-lint.sh"
)

FAIL=0

assert_contains() {
  local file="$1"
  local pattern="$2"
  local label="$3"

  if ! rg -q --no-heading -S -e "$pattern" "$file"; then
    echo ""
    echo "[font-system] FAIL: $label"
    echo "[font-system] Missing pattern: $pattern"
    echo "[font-system] File: $file"
    FAIL=1
  fi
}

assert_not_contains() {
  local file="$1"
  local pattern="$2"
  local label="$3"

  if rg -q --no-heading -S -e "$pattern" "$file"; then
    echo ""
    echo "[font-system] FAIL: $label"
    echo "[font-system] Forbidden pattern: $pattern"
    echo "[font-system] File: $file"
    FAIL=1
  fi
}

run_check() {
  local pattern="$1"
  local label="$2"
  local rg_args=()
  local g

  for g in "${INCLUDE_GLOBS[@]}"; do
    rg_args+=("-g" "$g")
  done
  for g in "${EXCLUDE_GLOBS[@]}"; do
    rg_args+=("-g" "$g")
  done

  set +e
  local out
  out=$(rg -n --no-heading -S "$pattern" . "${rg_args[@]}" 2>/dev/null)
  local status=$?
  set -e

  if [[ $status -eq 0 && -n "$out" ]]; then
    echo ""
    echo "[font-system] FAIL: $label"
    echo "$out"
    FAIL=1
  fi
}

run_check "Times New Roman" "Times New Roman is not allowed"
run_check '"DIN 2014", "Helvetica Neue", Arial, "Liberation Sans"' "Legacy DIN fallback stack is not allowed"
run_check '"mendl-sans-dusk", "Mendl Sans Dusk", "Abolition"' "Legacy Mendl/Abolition stack is not allowed"
run_check "'DIN 2014','Helvetica Neue',Arial,sans-serif" "Legacy inline DIN stack is not allowed"
run_check "Tactic Sans|Garamond|Poppins|Roboto Condensed" "Off-brand font family detected"

assert_contains "apps/website/src/styles/variables.css" "--font-heading:" "Website typography variables must define heading stack"
assert_contains "apps/website/src/styles/variables.css" "mendl-sans-dusk" "Website heading stack must include Mendl Sans Dusk"
assert_contains "apps/website/src/styles/variables.css" "--font-body:" "Website typography variables must define body stack"
assert_contains "apps/website/src/styles/variables.css" "Inter" "Website body stack must include Inter"
assert_contains "apps/dashboard/src/styles/variables.css" "--font-heading:" "Dashboard typography variables must define heading stack"
assert_contains "apps/dashboard/src/styles/variables.css" "mendl-sans-dusk" "Dashboard heading stack must include Mendl Sans Dusk"
assert_contains "apps/dashboard/src/styles/variables.css" "--font-body:" "Dashboard typography variables must define body stack"
assert_contains "apps/dashboard/src/styles/variables.css" "Inter" "Dashboard body stack must include Inter"

assert_contains "apps/website/src/app/layout.tsx" "use.typekit.net/jqs8bjh.css" "Website layout must load MH Typekit kit for Mendl Sans Dusk"
assert_contains "apps/website/src/app/layout.tsx" "next/font/google" "Website layout must import next/font/google"
assert_contains "apps/website/src/app/layout.tsx" "Inter" "Website layout must load Inter font"
assert_contains "apps/dashboard/src/app/layout.tsx" "use.typekit.net/jqs8bjh.css" "Dashboard layout must load MH Typekit kit for Mendl Sans Dusk"
assert_contains "apps/dashboard/src/app/layout.tsx" "next/font/google" "Dashboard layout must import next/font/google"
assert_contains "apps/dashboard/src/app/layout.tsx" "Inter" "Dashboard layout must load Inter font"

assert_contains "documents/styles/brand.css" "--font-heading:" "Document brand stylesheet must define heading stack"
assert_contains "documents/styles/brand.css" "mendl-sans-dusk" "Document heading stack must include Mendl Sans Dusk"
assert_contains "documents/styles/brand.css" "--font-body:" "Document brand stylesheet must define body stack"
assert_contains "documents/styles/brand.css" "Inter" "Document body stack must include Inter"

assert_contains "docs/branding/brand-constants.md" "Inter" "Root brand constants must document Inter body font"
assert_contains "docs/branding/brand-constants.md" "next/font/google" "Root brand constants must document Inter delivery"
assert_not_contains "docs/branding/brand-constants.md" "DIN 2014" "Root brand constants must not reference legacy DIN body font"
assert_contains "docs/branding/standards/unified-component-standards.md" "Body Font — Inter" "Root unified standards must define Inter as body font"
assert_contains "docs/branding/standards/unified-component-standards.md" "next/font/google" "Root unified standards must document Inter delivery"
assert_not_contains "docs/branding/standards/unified-component-standards.md" "DIN 2014" "Root unified standards must not reference legacy DIN body font"
assert_contains "docs/development/standards/page-compliance-checklist.md" 'Non-hero section body copy uses Inter' "Root page checklist must require Inter body copy"
assert_not_contains "docs/development/standards/page-compliance-checklist.md" "DIN 2014" "Root page checklist must not reference legacy DIN body font"

assert_contains "apps/website/docs/branding/brand-constants.md" "Inter" "App brand constants mirror must document Inter body font"
assert_contains "apps/website/docs/branding/brand-constants.md" "next/font/google" "App brand constants mirror must document Inter delivery"
assert_not_contains "apps/website/docs/branding/brand-constants.md" "DIN 2014" "App brand constants mirror must not reference legacy DIN body font"
assert_contains "apps/website/docs/branding/standards/unified-component-standards.md" "Body Font — Inter" "App unified standards mirror must define Inter as body font"
assert_contains "apps/website/docs/branding/standards/unified-component-standards.md" "next/font/google" "App unified standards mirror must document Inter delivery"
assert_not_contains "apps/website/docs/branding/standards/unified-component-standards.md" "DIN 2014" "App unified standards mirror must not reference legacy DIN body font"
assert_contains "apps/website/docs/development/standards/page-compliance-checklist.md" 'Non-hero section body copy uses Inter' "App page checklist mirror must require Inter body copy"
assert_not_contains "apps/website/docs/development/standards/page-compliance-checklist.md" "DIN 2014" "App page checklist mirror must not reference legacy DIN body font"

if [[ $FAIL -ne 0 ]]; then
  echo ""
  echo "[font-system] Font system check failed."
  exit 1
fi

echo "[font-system] PASS: canonical font system is enforced."
