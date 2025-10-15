#!/bin/bash

# Phase Analysis Script for MH Website
# Analyzes status of all PHASE_*.md files

echo "📊 MH Construction Phase Analysis"
echo "================================"
echo ""

cd /workspaces/mh-website

# Arrays to store phase information
declare -A phases_completed
declare -A phases_active  
declare -A phases_future
declare -A phases_duplicates

# Function to check phase status
analyze_phase() {
    local file="$1"
    local basename=$(basename "$file" .md)
    
    # Extract phase number if it exists
    if [[ $basename =~ PHASE_([0-9]+) ]]; then
        local phase_num="${BASH_REMATCH[1]}"
    elif [[ $basename =~ PHASE_([0-9]+)_([0-9]+) ]]; then
        local phase_num="${BASH_REMATCH[1]}.${BASH_REMATCH[2]}"
    else
        local phase_num="misc"
    fi
    
    # Check file content for status indicators
    local content=$(head -20 "$file" 2>/dev/null)
    
    if echo "$content" | grep -qi "complete\|✅.*complete\|status.*complete"; then
        phases_completed["$basename"]="$phase_num"
    elif echo "$content" | grep -qi "urgent\|active\|current\|in progress"; then
        phases_active["$basename"]="$phase_num"
    elif echo "$content" | grep -qi "future\|planned\|draft\|upcoming"; then
        phases_future["$basename"]="$phase_num"
    else
        # Check for more content if unclear
        local full_content=$(cat "$file" 2>/dev/null)
        if echo "$full_content" | grep -qi "complete\|✅.*complete"; then
            phases_completed["$basename"]="$phase_num"
        elif echo "$full_content" | grep -qi "draft\|planned\|future"; then
            phases_future["$basename"]="$phase_num"
        else
            phases_active["$basename"]="$phase_num"
        fi
    fi
}

# Analyze all PHASE files
echo "🔍 Analyzing phase files..."
for file in docs/project/PHASE_*.md; do
    if [[ -f "$file" ]]; then
        analyze_phase "$file"
    fi
done

echo ""
echo "📋 Phase Status Summary:"
echo "========================"

echo ""
echo "✅ COMPLETED PHASES:"
if [[ ${#phases_completed[@]} -eq 0 ]]; then
    echo "   (None found)"
else
    for phase in "${!phases_completed[@]}"; do
        printf "   %-50s (Phase %s)\n" "$phase" "${phases_completed[$phase]}"
    done
fi

echo ""
echo "🚨 ACTIVE/CURRENT PHASES:"
if [[ ${#phases_active[@]} -eq 0 ]]; then
    echo "   (None found)"
else
    for phase in "${!phases_active[@]}"; do
        printf "   %-50s (Phase %s)\n" "$phase" "${phases_active[$phase]}"
    done
fi

echo ""
echo "📋 FUTURE/PLANNED PHASES:"
if [[ ${#phases_future[@]} -eq 0 ]]; then
    echo "   (None found)"
else
    for phase in "${!phases_future[@]}"; do
        printf "   %-50s (Phase %s)\n" "$phase" "${phases_future[$phase]}"
    done
fi

echo ""
echo "🔄 Potential Duplicates/Overlaps:"
echo "=================================="

# Check for potential duplicates
declare -A phase_numbers
for phase in "${!phases_completed[@]}" "${!phases_active[@]}" "${!phases_future[@]}"; do
    if [[ $phase =~ PHASE_([0-9]+) ]]; then
        local num="${BASH_REMATCH[1]}"
        if [[ -n "${phase_numbers[$num]}" ]]; then
            echo "   ⚠️  Phase $num has multiple files:"
            echo "      - ${phase_numbers[$num]}"
            echo "      - $phase"
        else
            phase_numbers[$num]="$phase"
        fi
    fi
done

# Look for specific patterns that might indicate duplicates
echo ""
echo "📁 File Size Analysis:"
echo "====================="
echo "Large files (>500 lines) that might need consolidation:"
find docs/project/ -name "PHASE_*.md" -exec wc -l {} \; | sort -nr | while read lines file; do
    if [[ $lines -gt 500 ]]; then
        echo "   📄 $file: $lines lines"
    fi
done | head -5

echo ""
echo "📊 Consolidation Recommendations:"
echo "================================="

total_phases=$((${#phases_completed[@]} + ${#phases_active[@]} + ${#phases_future[@]}))
echo "Total phase files: $total_phases"

if [[ ${#phases_completed[@]} -gt 7 ]]; then
    echo "⚠️  Large number of completed phases (${#phases_completed[@]})"
    echo "   → Consider archiving or consolidating completed phases"
fi

if [[ ${#phases_future[@]} -gt 5 ]]; then
    echo "⚠️  Many future phase files (${#phases_future[@]})"
    echo "   → Consider consolidating into planning documents"
fi

# Check for naming inconsistencies
echo ""
echo "📝 Naming Pattern Analysis:"
echo "============================="
echo "Files not following PHASE_X pattern:"
find docs/project/ -name "*PHASE*" -not -name "PHASE_[0-9]*" | while read file; do
    echo "   📄 $(basename "$file")"
done

echo ""
echo "💡 Consolidation Strategy Suggestions:"
echo "======================================"
echo "1. Move completed phases to archive/"
echo "2. Consolidate similar/duplicate phases"
echo "3. Create single planning doc for future phases"
echo "4. Standardize naming convention"
echo "5. Keep only active/current phases in main directory"