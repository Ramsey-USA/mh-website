#!/usr/bin/env bash
set -euo pipefail

max_attempts="${OPENNEXT_BUILD_MAX_ATTEMPTS:-2}"
attempt=1

while [[ "$attempt" -le "$max_attempts" ]]; do
  echo "[build:opennext] Attempt ${attempt}/${max_attempts}"

  set +e
  opennextjs-cloudflare build
  exit_code=$?
  set -e

  if [[ "$exit_code" -eq 0 ]]; then
    echo "[build:opennext] Success on attempt ${attempt}."
    exit 0
  fi

  echo "[build:opennext] Attempt ${attempt} failed with exit code ${exit_code}."

  if [[ "$attempt" -ge "$max_attempts" ]]; then
    echo "[build:opennext] Exhausted retries."
    exit "$exit_code"
  fi

  attempt=$((attempt + 1))
  echo "[build:opennext] Retrying..."
done
