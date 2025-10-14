#!/bin/bash

# Auto-fix the most common markdown linting errors
# Run this before committing any markdown changes

echo "🔧 Auto-fixing markdown linting errors..."

# Fix trailing newlines and spaces
find . -name "*.md" -not -path "./node_modules/*" -not -path "./firebase/functions/node_modules/*" | while read -r file; do
    # Remove trailing spaces
    sed -i 's/[[:space:]]*$//' "$file"
    
    # Ensure file ends with single newline
    if [ -n "$(tail -c1 "$file")" ]; then
        echo "" >> "$file"
    fi
done

# Run the built-in auto-fixer
npm run lint:markdown:fix

echo "✅ Auto-fix complete. Run 'npm run lint:markdown' to check for remaining issues."