# Team Data Synchronization System

## Overview

This document establishes a systematic approach to ensure team member information flows efficiently from vintage baseball cards to MD documentation files, maintaining consistency and accuracy across all platforms.

## Data Architecture

### Source of Truth: `src/lib/data/vintage-team.ts`

All team member information originates from the `VintageTeamMember` interface in the vintage team data file. This centralized approach ensures:

- **Single Source Updates**: Changes made in one location propagate to all displays
- **Data Consistency**: Identical information across baseball cards and documentation
- **Validation**: Type-safe data structure prevents inconsistencies
- **Maintainability**: Easier to update and manage team information

### Distribution Targets

1. **Vintage Baseball Cards** (`/src/components/ui/VintageBaseballCard.tsx`)
   - Visual display on team page
   - Interactive flip cards with statistics
   - Professional presentation format

2. **Individual MD Files** (`/docs/business/team/[name].md`)
   - Detailed documentation format
   - Easy reference and sharing
   - SEO-friendly content structure

3. **Centralized Team Roster** (`/docs/business/TEAM_ROSTER.md`)
   - Overview format for quick reference
   - Leadership hierarchy display
   - Department organization

## Synchronization Workflow

### 1. Data Entry Process

When updating team member information:

1. Update vintage-team.ts (Source of Truth)
   ↓
2. Generate/Update individual MD file
   ↓
3. Update centralized TEAM_ROSTER.md if needed
   ↓
4. Validate baseball card display

### 2. Required Field Mapping

| VintageTeamMember Field | Baseball Card Display | MD File Section |
|------------------------|----------------------|-----------------|
| `name` | Front card header | Document title |
| `nickname` | Front card subtitle | Title subtitle |
| `role`/`position` | Back card role | Quick Facts |
| `department` | Color theming | Header badge |
| `cardNumber` | Card numbering | Header badge |
| `veteranStatus` | Gold shield badge | Header badge |
| `awards` | Back card awards section | Awards & Recognition |
| `currentYearStats` | Back card statistics | 2025 Performance |
| `careerStats` | Back card career totals | Career Statistics |
| `bio` | Back card about section | Biography |
| `careerHighlights` | Back card highlights | Career Highlights |
| `specialties` | Back card specialties | Professional Specialties |
| `certifications` | Back card certifications | Certifications |
| `hobbies`/`specialInterests` | Back card personal | Personal Interests |
| `funFact` | Back card fun fact | Fun Fact |

### 3. Update Triggers

Update MD files when these vintage-team.ts fields change:

**Critical Updates** (Immediate sync required):

- Personal information (`name`, `nickname`, `role`)
- Professional achievements (`awards`, `certifications`)
- Performance statistics (`currentYearStats`, `careerStats`)

**Content Updates** (Regular sync):

- Biography and highlights content
- Hobbies and personal interests
- Fun facts and specialties

**Structural Updates** (Validation required):

- Department changes (affects card theming)
- Veteran status updates (affects badges)
- Card numbering changes

### 4. Validation Checklist

Before publishing updates, verify:

- [ ] VintageTeamMember interface compliance
- [ ] Baseball card displays correctly
- [ ] MD file follows template structure
- [ ] All required fields populated
- [ ] Awards formatting consistent
- [ ] Statistics accuracy
- [ ] Professional tone maintained

## File Generation Process

### Automated Template Application

Use the standardized template from `/docs/business/team/TEMPLATE.md`:

```bash
# Generate new team member MD file
cp docs/business/team/TEMPLATE.md docs/business/team/[slug].md

# Update with actual data from vintage-team.ts
# Follow field mapping table above
```text

### Manual Updates

When adding new team members:

1. **Add to vintage-team.ts** with complete VintageTeamMember data
2. **Generate MD file** using template
3. **Update TEAM_ROSTER.md** with new entry
4. **Test baseball card display** on team page
5. **Validate data consistency** across all formats

## Quality Assurance

### Data Integrity Checks

1. **Field Completeness**: All required fields populated
2. **Format Consistency**: Awards, dates, statistics formatting
3. **Professional Standards**: Biography tone and content quality
4. **Visual Validation**: Baseball card display verification

### Regular Maintenance

- **Monthly Review**: Verify data accuracy and completeness
- **Quarterly Updates**: Refresh statistics and achievements
- **Annual Audit**: Comprehensive data validation and cleanup

## Benefits of This System

### For Development Team

- **Single Source Updates**: Change data once, propagate everywhere
- **Type Safety**: TypeScript validation prevents data errors
- **Maintainability**: Clear structure and documentation

### For Content Management

- **Consistency**: Identical information across all platforms
- **Efficiency**: Streamlined update process
- **Accuracy**: Reduced manual transcription errors

### For Team Members

- **Professional Presentation**: Comprehensive, accurate profiles
- **Recognition**: Proper awards and achievement display
- **Accessibility**: Multiple formats for different use cases

## Implementation Status

### Completed

- ✅ VintageTeamMember interface with comprehensive fields
- ✅ MD file template structure
- ✅ Complete MD files for all 16 team members
- ✅ Baseball card integration
- ✅ Awards and nickname system
- ✅ New team member additions (Derek Parks, Lisa Kandle)

### Recent Updates

**October 2025**: Added new team members:

- **Derek Parks** - Superintendent with 10 years experience in Site & Field Operations
- **Lisa Kandle** - Administrative Assistant in Administration & Support

### Next Steps

1. ✅ ~~Generate remaining team member MD files~~ **COMPLETED**
2. Update centralized TEAM_ROSTER.md with new team members
3. Create automated validation scripts
4. Establish regular update schedule

---

*This documentation ensures efficient data flow from baseball card information to MD files while maintaining accuracy and professional presentation standards.*
