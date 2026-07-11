#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
cd "$ROOT_DIR"

failures=0

require_text() {
  local file="$1"
  local pattern="$2"
  local message="$3"

  if ! grep -Fq "$pattern" "$file"; then
    echo "FAIL: $message" >&2
    echo "  Missing pattern: $pattern" >&2
    echo "  File: $file" >&2
    failures=1
  fi
}

check_no_inline_transform_examples() {
  local file="$1"
  local regex="$2"

  if grep -nE "$regex" "$file" > /tmp/branding-doc-contract-check.txt; then
    echo "FAIL: Inline transform example(s) found in $file" >&2
    cat /tmp/branding-doc-contract-check.txt >&2
    failures=1
  fi
}

check_no_floating_workflow_action_refs() {
  local workflow_dir="$1"
  local regex='^[[:space:]]*uses:[[:space:]]*[^[:space:]]+@(master|main|HEAD)[[:space:]]*$'

  if grep -RInE "$regex" "$workflow_dir" --include='*.yml' --include='*.yaml' > /tmp/workflow-action-pin-check.txt; then
    echo "FAIL: Floating GitHub Action ref(s) found in workflow files" >&2
    cat /tmp/workflow-action-pin-check.txt >&2
    failures=1
  fi
}

COVERAGE_FILE="docs/branding/governance/website-guardrails-coverage.md"
BRANDING_CHECKLIST="docs/development/standards/branding-congruency-checklist.md"
PAGE_CHECKLIST="docs/development/standards/page-compliance-checklist.md"

# Canonical anchors that must stay present in coverage routing.
require_text "$COVERAGE_FILE" "#heading-and-typography-visual-contract-canonical" "Missing heading canonical anchor in coverage map"
require_text "$COVERAGE_FILE" "#button-visual-contract-canonical" "Missing button canonical anchor in coverage map"
require_text "$COVERAGE_FILE" "#container-and-modal-visual-contract-canonical" "Missing container/modal canonical anchor in coverage map"
require_text "$COVERAGE_FILE" "#card-visual-contract-canonical" "Missing card canonical anchor in coverage map"
require_text "$COVERAGE_FILE" "#form-field-and-form-shell-visual-contract-canonical" "Missing form canonical anchor in coverage map"
require_text "$COVERAGE_FILE" "#navigation-overlay-and-header-action-visual-contract-canonical" "Missing navigation canonical anchor in coverage map"
require_text "$COVERAGE_FILE" "#footer-accreditation-and-trust-continuity-visual-contract-canonical" "Missing footer/trust canonical anchor in coverage map"

# Companion checklist must route to all canonical contracts.
require_text "$BRANDING_CHECKLIST" "Heading and Typography Visual Contract" "Branding congruency checklist missing heading contract link"
require_text "$BRANDING_CHECKLIST" "Button Visual Contract" "Branding congruency checklist missing button contract link"
require_text "$BRANDING_CHECKLIST" "Container and Modal Visual Contract" "Branding congruency checklist missing container/modal contract link"
require_text "$BRANDING_CHECKLIST" "Card Visual Contract" "Branding congruency checklist missing card contract link"
require_text "$BRANDING_CHECKLIST" "Form Field and Form Shell Visual Contract" "Branding congruency checklist missing form contract link"
require_text "$BRANDING_CHECKLIST" "Navigation Overlay and Header Action Visual Contract" "Branding congruency checklist missing navigation contract link"
require_text "$BRANDING_CHECKLIST" "Footer Accreditation and Trust Continuity Visual Contract" "Branding congruency checklist missing footer/trust contract link"

# Verification checklist must point at key canonical contracts.
require_text "$PAGE_CHECKLIST" "Heading and Typography Visual Contract" "Page compliance checklist missing heading contract conformance check"
require_text "$PAGE_CHECKLIST" "Button Visual Contract" "Page compliance checklist missing button contract conformance check"
require_text "$PAGE_CHECKLIST" "Container and Modal Visual Contract" "Page compliance checklist missing container/modal contract conformance check"
require_text "$PAGE_CHECKLIST" "Card Visual Contract" "Page compliance checklist missing card contract conformance check"
require_text "$PAGE_CHECKLIST" "Form Field and Form Shell Visual Contract" "Page compliance checklist missing form contract conformance check"
require_text "$PAGE_CHECKLIST" "Navigation Overlay and Header Action Visual Contract" "Page compliance checklist missing navigation contract conformance check"
require_text "$PAGE_CHECKLIST" "Footer Accreditation and Trust Continuity Visual Contract" "Page compliance checklist missing footer/trust contract conformance check"

# Hard guardrail: disallow inline transform examples in canonical guidance docs.
INLINE_TRANSFORM_REGEX='group-hover:scale-[0-9]|group-hover:rotate-[0-9]|group-hover:-translate-[a-z]-[0-9]|hover:scale-[0-9]|hover:-translate-[a-z]-[0-9]|animate-pulse'
check_no_inline_transform_examples "docs/branding/standards/unified-component-standards.md" "$INLINE_TRANSFORM_REGEX"
check_no_inline_transform_examples "docs/development/standards/consistency-guide.md" "$INLINE_TRANSFORM_REGEX"
check_no_inline_transform_examples "docs/technical/design-system/buttons-ctas-complete-guide.md" "$INLINE_TRANSFORM_REGEX"

# CI congruency: external GitHub Actions must use pinned tags/SHAs, never floating branches.
check_no_floating_workflow_action_refs ".github/workflows"

if [[ $failures -ne 0 ]]; then
  echo "Branding docs contract guard FAILED." >&2
  exit 1
fi

echo "Branding docs contract guard passed."
