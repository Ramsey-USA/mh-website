#!/bin/bash

set -uo pipefail

cd /workspaces/mh-website || exit 1

output_file="${1:-}"
tmp_file="$(mktemp)"

cleanup() {
    rm -f "$tmp_file"
}

trap cleanup EXIT

set +e
npx --yes cspell lint "**/*.{md,js,ts,tsx,json}" --no-progress --words-only --unique --no-summary > "$tmp_file" 2>&1
cspell_exit=$?
set -e

LC_ALL=C sort -fu "$tmp_file" > "${tmp_file}.words"

if [ -n "$output_file" ]; then
  cp "${tmp_file}.words" "$output_file"
fi

cat "${tmp_file}.words"

if [ ! -s "${tmp_file}.words" ]; then
  echo "No unknown words found."
fi

exit 0