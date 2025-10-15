#!/bin/bash

# Backup File Review and Cleanup Script
# Helps review changes made by advanced formatting and clean up backup files

echo "🔍 Backup File Review and Cleanup"
echo "=================================="

# Find all backup files
BACKUP_FILES=$(find . -name "*.backup" -type f)

if [ -z "$BACKUP_FILES" ]; then
    echo "✅ No backup files found"
    exit 0
fi

echo "📋 Found backup files:"
echo "$BACKUP_FILES"
echo ""

# Count backup files
BACKUP_COUNT=$(echo "$BACKUP_FILES" | wc -l)
echo "📊 Total backup files: $BACKUP_COUNT"
echo ""

# Ask user what to do
echo "🤔 What would you like to do?"
echo "1) Review changes (show diff for each file)"
echo "2) Remove all backup files (keep the improved versions)"
echo "3) Restore from backups (undo the changes)"
echo "4) Exit without action"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📖 Reviewing changes..."
        for backup in $BACKUP_FILES; do
            original="${backup%.backup}"
            echo ""
            echo "🔄 Changes in: $original"
            echo "----------------------------------------"
            if [ -f "$original" ]; then
                diff -u "$backup" "$original" || true
            else
                echo "⚠️  Original file not found: $original"
            fi
            echo ""
            read -p "Press Enter to continue to next file..."
        done
        ;;
    2)
        echo ""
        echo "🗑️  Removing backup files..."
        for backup in $BACKUP_FILES; do
            rm "$backup"
            echo "✅ Removed: $backup"
        done
        echo ""
        echo "🎉 All backup files removed! Your improved files are now active."
        ;;
    3)
        echo ""
        echo "⏪ Restoring from backups..."
        for backup in $BACKUP_FILES; do
            original="${backup%.backup}"
            mv "$backup" "$original"
            echo "✅ Restored: $original"
        done
        echo ""
        echo "🔄 All files restored to their previous state."
        ;;
    4)
        echo ""
        echo "👋 Exiting without changes. Backup files preserved."
        ;;
    *)
        echo ""
        echo "❌ Invalid choice. Exiting without changes."
        ;;
esac

echo ""
echo "✨ Backup review complete!"