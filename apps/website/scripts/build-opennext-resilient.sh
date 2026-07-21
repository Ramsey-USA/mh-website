#!/usr/bin/env bash
set -euo pipefail

max_attempts="${OPENNEXT_BUILD_MAX_ATTEMPTS:-3}"
attempt=1
use_low_memory_mode="${LOW_MEMORY_BUILD:-false}"
use_standalone_prebuild_fallback="false"

run_standalone_prebuild() {
  local existing_node_options="${NODE_OPTIONS:-}"
  if [[ "${existing_node_options}" != *"--max-old-space-size="* ]]; then
    existing_node_options="${existing_node_options} --max-old-space-size=4096"
  fi

  echo "[build:opennext] Building standalone Next.js output for skip-build packaging."
  rm -rf .next .open-next
  NEXT_PRIVATE_STANDALONE=true NODE_OPTIONS="${existing_node_options# }" npx next build
}

run_build() {
  if [[ "${use_standalone_prebuild_fallback}" == "true" ]]; then
    run_standalone_prebuild
    echo "[build:opennext] Packaging prebuilt standalone output."
    opennextjs-cloudflare build --skipNextBuild
    return
  fi

  if [[ "${use_low_memory_mode}" == "true" ]]; then
    local existing_node_options="${NODE_OPTIONS:-}"
    if [[ "${existing_node_options}" != *"--max-old-space-size="* ]]; then
      existing_node_options="${existing_node_options} --max-old-space-size=4096"
    fi

    echo "[build:opennext] Running in low-memory mode."
    LOW_MEMORY_BUILD=true NODE_OPTIONS="${existing_node_options# }" opennextjs-cloudflare build
    return
  fi

  opennextjs-cloudflare build
}

while [[ "$attempt" -le "$max_attempts" ]]; do
  echo "[build:opennext] Attempt ${attempt}/${max_attempts}"

  set +e
  run_build
  exit_code=$?
  set -e

  if [[ "$exit_code" -eq 0 ]]; then
    echo "[build:opennext] Success on attempt ${attempt}."
    exit 0
  fi

  echo "[build:opennext] Attempt ${attempt} failed with exit code ${exit_code}."

  if [[ "${use_low_memory_mode}" != "true" ]]; then
    echo "[build:opennext] Enabling low-memory mode for retry."
    use_low_memory_mode="true"
  elif [[ "${use_standalone_prebuild_fallback}" != "true" ]]; then
    echo "[build:opennext] Falling back to standalone prebuild plus skip-build packaging."
    use_standalone_prebuild_fallback="true"
  elif [[ "$attempt" -ge "$max_attempts" ]]; then
    echo "[build:opennext] Exhausted retries."
    exit "$exit_code"
  else
    echo "[build:opennext] Exhausted retries."
    exit "$exit_code"
  fi

  attempt=$((attempt + 1))
  echo "[build:opennext] Retrying..."
done
