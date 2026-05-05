#!/bin/bash

# Add word(s) to a cSpell project dictionary
# Usage: ./scripts/utilities/add-cspell-word.sh [--dict technical|safety|names|tech-additions|spanish] word1 word2 word3

set -euo pipefail

DICT_NAME="technical"
if [ "${1:-}" = "--dict" ]; then
    DICT_NAME="${2:-}"
    shift 2
fi

if [ $# -eq 0 ]; then
    echo "Usage: $0 [--dict technical|safety|names|tech-additions|spanish] word1 [word2 word3 ...]"
    echo "Adds words to a categorized cSpell project dictionary under config/cspell/"
    exit 1
fi

case "$DICT_NAME" in
    technical)
        CSPELL_FILE="/workspaces/mh-website/config/cspell/project-words.txt"
        ;;
    safety)
        CSPELL_FILE="/workspaces/mh-website/config/cspell/safety-industry-words.txt"
        ;;
    names)
        CSPELL_FILE="/workspaces/mh-website/config/cspell/names-and-places-words.txt"
        ;;
    tech-additions)
        CSPELL_FILE="/workspaces/mh-website/config/cspell/technical-additions.txt"
        ;;
    spanish)
        CSPELL_FILE="/workspaces/mh-website/config/cspell/spanish-custom-words.txt"
        ;;
    *)
        echo "Unknown dictionary: $DICT_NAME"
        echo "Valid options: technical, safety, names, tech-additions, spanish"
        exit 1
        ;;
esac

# Check if project dictionary exists
if [ ! -f "$CSPELL_FILE" ]; then
    echo "Error: project dictionary not found at $CSPELL_FILE"
    exit 1
fi

sort_file() {
    local tmp_file
    tmp_file="$(mktemp)"
    awk 'NF > 0' "$CSPELL_FILE" | LC_ALL=C sort -u > "$tmp_file"
    mv "$tmp_file" "$CSPELL_FILE"
}

echo "Adding words to cSpell dictionary '$DICT_NAME':"

for word in "$@"; do
    echo "  - $word"
    
    # Check if word already exists
    if grep -Fqx "$word" "$CSPELL_FILE"; then
        echo "    (already exists)"
        continue
    fi

    printf '%s\n' "$word" >> "$CSPELL_FILE"
done

sort_file

echo ""
echo "✅ Words added successfully!"
echo ""
echo "💡 Test with: npm run cspell:check"