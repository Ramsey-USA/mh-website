#!/usr/bin/env python3
"""
Script to refactor Services page by replacing inline sections with component calls
"""

# Read the backup file
with open('src/app/services/page.tsx.backup', 'r') as f:
    lines = f.readlines()

# Define the sections to replace (line numbers are 0-indexed in Python)
# Format: (start_line, end_line, replacement_text)
replacements = [
    # Construction Expertise Section: lines 252-334 (1-indexed) = 251-333 (0-indexed)
    (251, 334, "        {/* Construction Expertise Section */}\n        <ConstructionExpertiseSection />\n\n"),
    
    # Core Services Section: lines 336-374 (1-indexed) = 335-373 (0-indexed)
    (335, 374, "        {/* Core Services Section */}\n        <CoreServicesSection services={coreServices} />\n\n"),
    
    # Specialty Services Section: lines 375-420 (1-indexed) = 374-419 (0-indexed)
    (374, 420, "        {/* Specialty Services Section */}\n        <SpecialtyServicesSection services={specialtyServices} />\n\n"),
    
    # Government & Grant-Funded Projects Section: lines 421-746 (1-indexed) = 420-745 (0-indexed)
    (420, 746, "        {/* Government & Grant-Funded Projects Section */}\n        <GovernmentProjectsSection />\n\n"),
    
    # Service Areas Section: lines 747-814 (1-indexed) = 746-813 (0-indexed)
    (746, 814, "        {/* Service Areas Section */}\n        <ServiceAreasSection serviceAreas={serviceAreas} />\n\n"),
    
    # Construction Process Overview Section: lines 843-1184 (1-indexed) = 842-1183 (0-indexed)
    (842, 1184, "        {/* Construction Process Overview Section */}\n        <ConstructionProcessSection />\n\n")
]

# Apply replacements in reverse order to maintain line numbers
output_lines = lines[:]
for start, end, replacement in reversed(replacements):
    output_lines[start:end] = [replacement]

# Write the refactored file
with open('src/app/services/page.tsx', 'w') as f:
    f.writelines(output_lines)

print(f"Refactoring complete!")
print(f"Original lines: {len(lines)}")
print(f"New lines: {len(output_lines)}")
print(f"Lines saved: {len(lines) - len(output_lines)}")
