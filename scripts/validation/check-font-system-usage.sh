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

if [[ $FAIL -ne 0 ]]; then
  echo ""
  echo "[font-system] Font system check failed."
  exit 1
fi

echo "[font-system] PASS: canonical font system is enforced."
