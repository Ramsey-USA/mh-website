#!/usr/bin/env python3
"""
Script to standardize all imports to use @/ absolute paths
Part of Consistency Master Plan - Phase 2

This script properly handles both single and double quotes.
"""

import os
import re
import sys
from pathlib import Path
from datetime import datetime

def standardize_imports(content):
    """
    Replace relative imports with @/ absolute imports.
    Handles both single and double quotes properly.
    """
    patterns = [
        # Three levels up: ../../../
        (r'from\s+(["\'])(\.\./\.\./\.\./)(components|hooks|lib|types|contexts|middleware|app)/', r'from \1@/\3/'),
        # Two levels up: ../../
        (r'from\s+(["\'])(\.\./\.\./)(components|hooks|lib|types|contexts|middleware|app)/', r'from \1@/\3/'),
        # One level up: ../
        (r'from\s+(["\'])(\.\./)(components|hooks|lib|types|contexts|middleware|app)/', r'from \1@/\3/'),
        # Same level: ./
        (r'from\s+(["\'])(\./)(components|hooks|lib|types|contexts|middleware|app)/', r'from \1@/\3/'),
    ]
    
    modified = content
    for pattern, replacement in patterns:
        modified = re.sub(pattern, replacement, modified)
    
    return modified

def process_file(file_path):
    """Process a single TypeScript file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            original = f.read()
        
        modified = standardize_imports(original)
        
        if original != modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(modified)
            return True
        return False
    except Exception as e:
        print(f"❌ Error processing {file_path}: {e}", file=sys.stderr)
        return False

def main():
    src_dir = Path('/workspaces/mh-website/src')
    
    print("🔄 Starting import standardization...")
    print("━" * 60)
    
    # Find all TypeScript files
    ts_files = list(src_dir.rglob('*.ts')) + list(src_dir.rglob('*.tsx'))
    print(f"📊 Found {len(ts_files)} TypeScript files to process\n")
    
    modified_count = 0
    
    for file_path in ts_files:
        if process_file(file_path):
            print(f"✅ Modified: {file_path.relative_to(src_dir.parent)}")
            modified_count += 1
    
    print("\n" + "━" * 60)
    print(f"✨ Import standardization complete!")
    print(f"📝 Modified files: {modified_count}")
    print("\nNext steps:")
    print("1. Run: npm run type-check")
    print("2. Run: npm run lint")
    print("3. Test the application")
    print("4. If successful, commit changes")

if __name__ == '__main__':
    main()
