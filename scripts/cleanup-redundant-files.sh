#!/bin/bash

# Comprehensive Redundant File Cleanup Script
# Removes backup files, duplicate scripts, and unnecessary files

set -e

echo "🧹 MH Website - Redundant File Cleanup"
echo "======================================"
echo ""

# Create cleanup backup
CLEANUP_BACKUP_DIR="backups/cleanup-$(date +%Y%m%d_%H%M%S)"
mkdir -p "$CLEANUP_BACKUP_DIR"
echo "💾 Backup directory created: $CLEANUP_BACKUP_DIR"
echo ""

# Function to safely remove files with backup
remove_with_backup() {
    local file="$1"
    local reason="$2"
    
    if [ -f "$file" ]; then
        echo "🗑️  Removing: $file ($reason)"
        cp "$file" "$CLEANUP_BACKUP_DIR/$(basename "$file")" 2>/dev/null || true
        rm "$file"
        echo "   ✅ Removed and backed up"
    else
        echo "   ℹ️  File not found: $file"
    fi
}

# Function to remove directory with backup
remove_dir_with_backup() {
    local dir="$1"
    local reason="$2"
    
    if [ -d "$dir" ]; then
        echo "🗑️  Removing directory: $dir ($reason)"
        cp -r "$dir" "$CLEANUP_BACKUP_DIR/" 2>/dev/null || true
        rm -rf "$dir"
        echo "   ✅ Directory removed and backed up"
    else
        echo "   ℹ️  Directory not found: $dir"
    fi
}

echo "1️⃣ Removing README.md backup files..."
echo "====================================="
remove_with_backup "README.md.backup" "redundant backup"
remove_with_backup "README.md.backup.1760369711" "redundant backup"
remove_with_backup "README.md.nuclear_temp.1" "temporary file"
remove_with_backup "README.md.nuclear_temp.2" "temporary file"
remove_with_backup "README.md.nuclear_temp.3" "temporary file"
remove_with_backup "README.md.nuclear_temp.4" "empty temporary file"
echo ""

echo "2️⃣ Removing technical documentation backups..."
echo "============================================="
remove_with_backup "docs/technical/DESIGN_SYSTEM.md.backup" "redundant backup"
remove_with_backup "docs/technical/DESIGN_SYSTEM.md.backup.1760369711" "redundant backup"
echo ""

echo "3️⃣ Removing duplicate markdown fixing scripts..."
echo "==============================================="
echo "⚠️  Keeping: fix-markdown-lint-comprehensive.sh (most complete)"
remove_with_backup "scripts/fix-markdown-lint.sh" "superseded by comprehensive version"
remove_with_backup "scripts/enhanced-markdown-fix.sh" "redundant functionality"
remove_with_backup "scripts/final-markdown-fix.sh" "redundant functionality"
remove_with_backup "scripts/fix-all-markdown.sh" "redundant functionality"
remove_with_backup "scripts/fix-markdown-simple.sh" "redundant functionality"
remove_with_backup "scripts/simple-markdown-fix.sh" "redundant functionality"
echo ""

echo "4️⃣ Removing duplicate naming scripts..."
echo "======================================"
echo "⚠️  Keeping: standardize-naming-fixed.sh (improved version)"
remove_with_backup "scripts/standardize-naming.sh" "superseded by fixed version"
echo ""

echo "5️⃣ Removing test and development files..."
echo "========================================"
remove_with_backup "extension-test.tsx" "test file marked for deletion"
echo ""

echo "6️⃣ Removing empty scripts..."
echo "==========================="
remove_with_backup "scripts/test-cloudflare-security.sh" "empty file"
remove_with_backup "scripts/setup-cloudflare-security.sh" "empty file"
echo ""

echo "7️⃣ Removing build artifacts and logs..."
echo "====================================="
remove_with_backup "tsconfig.tsbuildinfo" "TypeScript build cache"
remove_with_backup "firestore-debug.log" "debug log file"
echo ""

echo "8️⃣ Additional cleanup suggestions..."
echo "=================================="
echo "🔍 Large directories that could be cleaned:"
echo "   • node_modules (1.2G) - can be regenerated with 'npm install'"
echo "   • .next (565M) - can be regenerated with 'npm run build'"
echo ""
echo "💡 Consider running 'npm run clean' if available, or:"
echo "   • rm -rf node_modules && npm install"
echo "   • rm -rf .next"
echo ""

# Count files in cleanup backup
BACKUP_COUNT=$(find "$CLEANUP_BACKUP_DIR" -type f | wc -l)
BACKUP_SIZE=$(du -sh "$CLEANUP_BACKUP_DIR" | cut -f1)

echo "📊 Cleanup Summary:"
echo "=================="
echo "Files removed: $BACKUP_COUNT"
echo "Backup size: $BACKUP_SIZE"
echo "Backup location: $CLEANUP_BACKUP_DIR"
echo ""
echo "✅ Cleanup complete!"
echo ""
echo "⚠️  To restore any files: cp backups/cleanup-*/filename ./original/location"
echo "🗑️  To permanently delete backups after 30 days: rm -rf $CLEANUP_BACKUP_DIR"