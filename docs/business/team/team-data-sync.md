# Team Data Synchronization System - Tactical Data Management

**Date:** December 14, 2025  
**Status:** ✅ Current  
**Category:** Business - Team Operations  
**Version:** 2.0.0  
**Last Updated:** December 14, 2025

## Overview

This document establishes a systematic approach to ensure team member information
flows efficiently from team profile sections to MD documentation files,
maintaining consistency and accuracy across all platforms.

**Military Connection:** Like maintaining accurate SITREP data, our team information
system ensures single-source-of-truth accuracy across all deployment channels.

## Data Architecture

### Source of Truth: `src/lib/data/vintage-team.ts`

All team member information originates from the `VintageTeamMember` interface in the
vintage team data file. This centralized approach ensures:

- **Single Source Updates**: Changes made in one location propagate to all displays
- **Data Consistency**: Identical information across team profiles and documentation
- **Validation**: Type-safe data structure prevents inconsistencies
- **Maintainability**: Easier to update and manage team information

### Distribution Targets

1. **Team Profile Sections** (`/src/components/team/TeamProfileSection.tsx`)
   - Modern professional display on team page
   - Skills radar charts with 6 key competencies
   - Comprehensive statistics and career information
   - Alternating layout for visual variety

2. **Individual MD Files** (`/docs/business/team/[name].md`)
   - Detailed documentation format
   - Easy reference and sharing
   - SEO-friendly content structure

3. **Centralized Team Roster** (`/docs/business/team-roster.md`)
   - Overview format for quick reference
   - Leadership hierarchy display
   - Department organization

## Synchronization Workflow

### 1. Data Entry Process

When updating team member information:

1. Update vintage-team.ts (Source of Truth)
   ↓
2. Run `node scripts/add-team-skills.js` to generate skill profiles (if needed)
   ↓
3. Generate/Update individual MD file
   ↓
4. Update centralized team-roster.md if needed
   ↓
5. Validate team profile display with radar charts

### 2. Required Field Mapping

| VintageTeamMember Field      | Profile Display         | MD File Section          |
| ---------------------------- | ----------------------- | ------------------------ |
| `name`                       | Header with photo       | Document title           |
| `nickname`                   | Subtitle quote          | Title subtitle           |
| `role`/`position`            | Role badge              | Quick Facts              |
| `department`                 | Department label        | Header badge             |
| `skills`                     | Radar chart (6 metrics) | Skills section           |
| `veteranStatus`              | Veteran badge           | Header badge             |
| `awards`                     | Personal details card   | Awards & Recognition     |
| `currentYearStats`           | 2025 Stats card         | 2025 Performance         |
| `careerStats`                | Career totals card      | Career Statistics        |
| `bio`                        | Biography section       | Biography                |
| `careerHighlights`           | Checkmark list          | Career Highlights        |
| `specialties`                | Tag pills               | Professional Specialties |
| `certifications`             | Personal details        | Certifications           |
| `hobbies`/`specialInterests` | Personal details        | Personal Interests       |

### 3. Update Triggers

Update MD files when these vintage-team.ts fields change:

**Critical Updates** (Immediate sync required):

- Personal information (`name`, `nickname`, `role`)
- Professional achievements (`awards`, `certifications`)
- Performance statistics (`currentYearStats`, `careerStats`)
- Skills profiles (`skills` object with 6 metrics)

**Content Updates** (Regular sync):

- Biography and highlights content
- Hobbies and personal interests
- Specialties

**Structural Updates** (Validation required):

- Department changes (affects display order)
- Veteran status updates (affects badges)
- Role changes (may affect skill profile generation)

### 4. Validation Checklist

Before publishing updates, verify:

- [ ] VintageTeamMember interface compliance
- [ ] Skills object with all 6 metrics (0-100 scale)
- [ ] Team profile section displays correctly with radar chart
- [ ] MD file follows template structure
- [ ] All required fields populated
- [ ] Awards formatting consistent
- [ ] Statistics accuracy
- [ ] Professional tone maintained

## Skills Profile System

### Automated Skills Generation

Skills are automatically generated based on role and experience using `scripts/add-team-skills.js`:

**Six Key Skills (0-100 scale):**

1. **Leadership** - Team management and direction
2. **Technical** - Construction expertise and knowledge
3. **Communication** - Client and team interaction
4. **Safety** - Safety protocols and awareness
5. **Problem Solving** - Critical thinking and solutions
6. **Teamwork** - Collaboration and cooperation

**Generation Logic:**

- Base score: 60-95 (based on years of experience)
- Role adjustments:
  - **Leadership roles**: +5 leadership, +3 communication
  - **Project managers**: +5 communication, +5 problem solving
  - **Field operations**: +5 technical, +10 safety
  - **Estimators**: +5 technical, +3 problem solving

**Running the Script:**

```bash
node scripts/add-team-skills.js
```

This automatically adds/updates skills for all team members in `team-data.json`.

## File Generation Process

### Automated Template Application

Use the standardized template from `/docs/business/team/TEMPLATE.md`:

````bash
# Generate new team member MD file
cp docs/business/team/TEMPLATE.md docs/business/team/[slug].md

# Update with actual data from vintage-team.ts
# Follow field mapping table above
```text

### Manual Updates

When adding new team members:

1. **Add to vintage-team.ts** with complete VintageTeamMember data
2. **Run skills generation** if adding new member: `node scripts/add-team-skills.js`
3. **Generate MD file** using template
4. **Update team-roster.md** with new entry
5. **Test team profile display** with radar charts on team page
6. **Validate data consistency** across all formats

## Quality Assurance

### Data Integrity Checks

1. **Field Completeness**: All required fields populated
2. **Format Consistency**: Awards, dates, statistics formatting
3. **Professional Standards**: Biography tone and content quality
4. **Visual Validation**: Team profile display verification with radar charts

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

- ✅ VintageTeamMember interface with comprehensive fields including skills
- ✅ Skills radar chart system with automated generation
- ✅ Modern team profile sections replacing service record cards
- ✅ MD file template structure
- ✅ Complete MD files for all 16 team members
- ✅ Team profile integration with skills visualization
- ✅ Awards and nickname system
- ✅ New team member additions (Derek Parks, Lisa Kandle)

### Recent Updates

**November 2025**: Modern Team Profile Redesign

- Migrated from service record card theme to professional profile sections
- Implemented skills radar charts with 6 key metrics
- Added automated skill profile generation script
- Updated all 16 team members with comprehensive skill data
- Maintained backward compatibility with existing data structure

**October 2025**: Added new team members:

- **Derek Parks** - Superintendent with 10 years experience in Site & Field Operations
- **Lisa Kandle** - Administrative Assistant in Administration & Support

### Next Steps

1. ✅ ~~Generate remaining team member MD files~~ **COMPLETED**
2. Update centralized team-roster.md with new team members
3. Create automated validation scripts
4. Establish regular update schedule

---

*This documentation ensures efficient data flow from team profile sections to MD files while
maintaining accuracy and professional presentation standards. The modern profile system with
skills radar charts provides comprehensive visualization of team member competencies.*
````
