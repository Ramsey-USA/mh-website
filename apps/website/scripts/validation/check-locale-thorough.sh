#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$ROOT_DIR"

RUN_RUNTIME_SWEEP="${RUN_RUNTIME_SWEEP:-0}"

log() {
  echo ""
  echo "==> $1"
}

run_parallel_source_checks() {
  local work_dir
  work_dir="$(mktemp -d)"
  local report_log="$work_dir/report.log"
  local parity_log="$work_dir/parity.log"
  local translations_log="$work_dir/translations.log"

  log "Source-level locale checks (parallel)"

  (
    SPANISH_COVERAGE_STRICT=1 npm run report:spanish:coverage >"$report_log" 2>&1
  ) &
  local report_pid=$!

  (
    npm run congruency:locale:check >"$parity_log" 2>&1
  ) &
  local parity_pid=$!

  (
    npm run check:translations >"$translations_log" 2>&1
  ) &
  local translations_pid=$!

  local failed=0

  wait "$report_pid" || failed=1
  wait "$parity_pid" || failed=1
  wait "$translations_pid" || failed=1

  cat "$report_log"
  cat "$parity_log"
  cat "$translations_log"

  rm -rf "$work_dir"

  if [[ "$failed" -ne 0 ]]; then
    echo ""
    echo "FAIL: One or more source-level locale checks failed."
    exit 1
  fi
}

run_render_contract_checks() {
  log "Render and congruency contract checks"
  npx jest --runInBand \
    src/app/__tests__/projects-events-congruency-contract.test.ts \
    src/app/__tests__/pages-smoke.test.tsx
}

run_page_coverage_audit() {
  log "Page coverage audit"
  node scripts/validation/check-locale-page-coverage.js
}

run_optional_runtime_sweep() {
  if [[ "$RUN_RUNTIME_SWEEP" != "1" ]]; then
    log "Runtime sweep skipped (set RUN_RUNTIME_SWEEP=1 to include)"
    return
  fi

  log "Runtime sweep (optional)"
  npm run sweep:spanish:render
}

log "Thorough locale congruency gate"
run_parallel_source_checks
run_page_coverage_audit
run_render_contract_checks
run_optional_runtime_sweep

echo ""
echo "PASS: Thorough locale congruency checks completed."
