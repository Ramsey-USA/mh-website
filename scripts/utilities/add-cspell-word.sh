#!/bin/bash

# Add word(s) to cSpell dictionary
# Usage: ./scripts/add-cspell-word.sh word1 word2 word3

if [ $# -eq 0 ]; then
    echo "Usage: $0 word1 [word2 word3 ...]"
    echo "Adds words to the cSpell dictionary in cspell.json"
    exit 1
fi

CSPELL_FILE="/workspaces/mh-website/cspell.json"

# Check if cspell.json exists
if [ ! -f "$CSPELL_FILE" ]; then
    echo "Error: cspell.json not found at $CSPELL_FILE"
    exit 1
fi

# Create backup
cp "$CSPELL_FILE" "${CSPELL_FILE}.backup"

echo "Adding words to cSpell dictionary:"

for word in "$@"; do
    echo "  - $word"
    
    # Check if word already exists
    if grep -q "\"$word\"" "$CSPELL_FILE"; then
        echo "    (already exists)"
        continue
    fi
    
    # Add word before the closing bracket of the words array
    # Use a more robust approach with awk
    awk -v word="$word" '
    /^[ ]*],$/ && in_words {
        print "    \"" word "\","
        in_words = 0
    }
    /^[ ]*"words":/ { in_words = 1 }
    { print }
    ' "$CSPELL_FILE" > "${CSPELL_FILE}.tmp"
    
    mv "${CSPELL_FILE}.tmp" "$CSPELL_FILE"
done

echo ""
echo "✅ Words added successfully!"
echo "📄 Backup saved as cspell.json.backup"
echo ""
echo "💡 Test with: npm run cspell:check"