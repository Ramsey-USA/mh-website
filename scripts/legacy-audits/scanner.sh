#!/bin/bash

# Target file patterns
MARKERS="hero-section|<[A-Z][a-zA-Z]*Hero|PageHero"

check_file() {
    local file="$1"
    local depth="$2"
    
    if [[ ! -f "$file" ]]; then return 1; fi
    
    # Check markers in the file
    if grep -qE "$MARKERS" "$file"; then
        return 0
    fi
    
    if [[ $depth -lt 2 ]]; then
        local dir=$(dirname "$file")
        # Extract relative imports
        grep "from " "$file" | grep -E "['\"]\\.\\.?/" | sed -E "s/.*from ['\"]([^'\"]+)['\"].*/\1/" | while read -r imp; do
            for ext in ".tsx" ".ts" ".jsx" ".js" "/index.tsx" "/index.ts"; do
                local imp_target="$dir/$imp$ext"
                if [[ -f "$imp_target" ]]; then
                    if check_file "$imp_target" $((depth + 1)); then
                        return 0
                    fi
                fi
            done
        done | grep -q "^" && return 0
    fi
    
    return 1
}

echo "Path,HeroPresent"
find apps/website/src/app -name "page.tsx" -not -path "*/api/*" | sort | while read -r page; do
    if check_file "$page" 0; then
        echo "$page,YES"
    else
        echo "$page,NO"
    fi
done
