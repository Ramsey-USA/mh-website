#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(git rev-parse --show-toplevel)"
ROOT_SCRIPTS_DIR="$ROOT_DIR/scripts"
APP_SCRIPTS_DIR="$ROOT_DIR/apps/website/scripts"

MODE="sync"
if [[ "${1:-}" == "--check" ]]; then
  MODE="check"
fi

MANAGED_FILES=(
  "add-team-qr-codes.js"
  "check-translations.js"
  "fix-code-issues.js"
  "lighthouse-guide.js"
  "resend-all-submissions.mjs"
  "seo-audit.js"
  "test-basic-performance.js"
  "test-lighthouse.js"
  "test-lighthouse-quick.js"
  "test-pwa.js"
  "test-qr-codes.js"
)

WITH_SHEBANG=(
  "check-translations.js"
  "lighthouse-guide.js"
  "resend-all-submissions.mjs"
  "test-basic-performance.js"
  "test-pwa.js"
)

has_shebang() {
  local file_name="$1"
  for candidate in "${WITH_SHEBANG[@]}"; do
    if [[ "$candidate" == "$file_name" ]]; then
      return 0
    fi
  done
  return 1
}

generate_wrapper() {
  local file_name="$1"
  local temp_file="$2"

  if has_shebang "$file_name"; then
    echo '#!/usr/bin/env node' >"$temp_file"
    echo '' >>"$temp_file"
  else
    : >"$temp_file"
  fi

  if [[ "$file_name" == *.mjs ]]; then
    cat >>"$temp_file" <<EOF
import path from "node:path";
import { spawnSync } from "node:child_process";

const scriptPath = path.join(
  import.meta.dirname,
  "..",
  "apps",
  "website",
  "scripts",
  "$file_name",
);
const result = spawnSync(
  process.execPath,
  [scriptPath, ...process.argv.slice(2)],
  {
    stdio: "inherit",
  },
);

process.exit(result.status ?? 1);
EOF
    return 0
  fi

  cat >>"$temp_file" <<EOF
"use strict";

const path = require("path");
const { spawnSync } = require("child_process");

const scriptPath = path.join(
  __dirname,
  "..",
  "apps",
  "website",
  "scripts",
  "$file_name",
);
const result = spawnSync(
  process.execPath,
  [scriptPath, ...process.argv.slice(2)],
  {
    stdio: "inherit",
  },
);

process.exit(result.status ?? 1);
EOF
}

for file_name in "${MANAGED_FILES[@]}"; do
  root_file="$ROOT_SCRIPTS_DIR/$file_name"
  app_file="$APP_SCRIPTS_DIR/$file_name"

  if [[ ! -f "$app_file" ]]; then
    echo "Missing canonical website script: $app_file" >&2
    exit 1
  fi

  tmp_file="$(mktemp)"
  generate_wrapper "$file_name" "$tmp_file"

  if [[ "$MODE" == "check" ]]; then
    if [[ ! -f "$root_file" ]]; then
      echo "Missing root wrapper script: $root_file" >&2
      rm -f "$tmp_file"
      exit 1
    fi

    if ! cmp -s "$tmp_file" "$root_file"; then
      echo "Root wrapper drift detected: scripts/$file_name" >&2
      diff -u "$root_file" "$tmp_file" || true
      rm -f "$tmp_file"
      exit 1
    fi
  else
    cp "$tmp_file" "$root_file"
  fi

  rm -f "$tmp_file"
done

if [[ "$MODE" == "check" ]]; then
  echo "Root script wrappers are in sync with canonical website script ownership."
else
  echo "Synchronized root script wrappers to canonical website script ownership."
fi
