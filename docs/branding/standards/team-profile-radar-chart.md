# Team Profile Radar Chart System

**Date:** December 24, 2025  
**Status:** ✅ Current  
**Category:** Business - Team Profiles  
**Last Updated:** December 24, 2025  
**Version:** 2.0.0

## Quick Navigation

- [🏠 Brand Documentation](../)
- [🎨 Color System](./color-system.md)
- [🏆 Badge System](./team-badge-system.md)
- [📋 Brand Overview](../strategy/brand-overview.md)

---

## Overview

The Team Profile Radar Chart provides a visual representation of team member competencies across 10 core
skill dimensions. Each dimension is scored 0-100 and reflects objective performance metrics, certifications,
and role responsibilities.

## Core Principles

1. **Objective Measurement**: Scores based on verifiable criteria (certifications, experience, performance)
2. **Role-Appropriate**: Expectations align with position responsibilities
3. **Brand-Aligned**: Skill names reflect MH Construction partnership values
4. **Realistic Range**: Scores typically range 50-95 to show meaningful differentiation
5. **Growth-Oriented**: Tracks development and continuing education

---

## The 10 Skill Dimensions

### 1. Partnership Leadership

**Display Name**: "Partnership\nLeadership"  
**Data Field**: `member.skills.leadership`  
**Range**: 60-98

**Scoring Criteria**:

- **88+**: Senior leadership roles (President, VP, Senior Superintendents)
- **75-87**: Mid-level management (Project Managers, Superintendents)
- **60-74**: Support roles with some leadership responsibility

**Factors**:

- Years in leadership position
- Team size managed
- Mentorship activity
- Decision-making authority

---

### 2. Technical Excellence

**Display Name**: "Technical\nExcellence"  
**Data Field**: `member.skills.technical`  
**Range**: 68-94

**Scoring Criteria**:

- **88+**: Advanced technical specialists (Estimators, Senior Supers, Finance)
- **75-87**: Field supervisors, Project Managers
- **68-74**: Administrative, HR roles

**Factors**:

- Technical certifications (CAD, estimating software, financial systems)
- Field experience
- Specialty training
- Software proficiency

---

### 3. Transparent Communication

**Display Name**: "Transparent\nCommunication"  
**Data Field**: `member.skills.communication`  
**Range**: 76-96

**Scoring Criteria**:

- **88+**: Client-facing roles, marketing, senior leadership
- **75-87**: Coordination roles, field supervision
- **70-74**: Support roles

**Factors**:

- Client satisfaction ratings
- Multilingual capability (Spanish/English)
- Written communication quality
- Presentation skills

---

### 4. Safety Excellence

**Display Name**: "Safety\nExcellence"  
**Data Field**: `member.skills.safety`  
**Range**: 52-95

**Scoring Criteria**:

- **88+**: OSHA 30 certified, Safety Officers, Field Superintendents
- **75-87**: OSHA 10 certified, some field experience
- **60-74**: Basic safety training, limited field exposure
- **50-59**: Office roles without field certification

**Factors**:

- OSHA 30 certification (+20 points)
- OSHA 10 certification (+10 points)
- Safety record (PERFECT/EXCELLENT)
- Field superintendent role
- CPR/First Aid certification
- Safety management responsibilities

**Note**: This is the most objective scoring dimension, directly tied to certifications and field experience.

---

### 5. Strategic Thinking (Problem-Solving)

**Display Name**: "Strategic\nThinking"  
**Data Field**: `member.skills.problemSolving`  
**Range**: 74-94

**Scoring Criteria**:

- **88+**: Senior decision-makers, financial analysts, estimators
- **75-87**: Field problem-solvers, project coordinators
- **70-74**: Execution-focused roles

**Factors**:

- Budget management success
- Complex project completion
- Innovation initiatives
- Crisis management experience

---

### 6. Partnership Unity (Teamwork)

**Display Name**: "Partnership\nUnity"  
**Data Field**: `member.skills.teamwork`  
**Range**: 76-93

**Scoring Criteria**:

- **88+**: Team builders, HR, collaborative leaders
- **75-87**: Strong team players, mentors
- **70-76**: Individual contributors

**Factors**:

- Team collaboration metrics
- Mentorship activity
- Cross-department coordination
- Cultural contribution

---

### 7. Thoroughness (Organization)

**Display Name**: "Thoroughness"  
**Data Field**: `member.skills.organization`  
**Range**: 80-98

**Scoring Criteria**:

- **90+**: Finance, estimating, project engineering roles requiring precision
- **85-89**: Superintendents, project coordinators
- **80-84**: Administrative support

**Factors**:

- Project documentation quality
- Schedule adherence
- Detail orientation
- System implementation

---

### 8. Client-Focused Excellence (Innovation)

**Display Name**: "Client-Focused\nExcellence"  
**Data Field**: `member.skills.innovation`  
**Range**: 68-92

**Scoring Criteria**:

- **88+**: Marketing, technology advocates, estimators
- **75-87**: Process improvement leaders
- **68-74**: Traditional execution roles

**Factors**:

- Technology adoption
- Process improvement initiatives
- Client satisfaction innovations
- Creative problem-solving

---

### 9. Passionate Drive

**Display Name**: "Passionate\nDrive"  
**Data Field**: `member.skills.passion`  
**Range**: 76-95

**Scoring Criteria**:

- **88+**: Founders, senior leaders, highly engaged individuals
- **80-87**: Dedicated professionals with strong work ethic
- **76-79**: Solid contributors

**Factors**:

- Career longevity
- Extra-mile efforts
- Company culture contribution
- Personal mission alignment

---

### 10. Growth Mindset (Continuing Education)

**Display Name**: "Growth\nMindset"  
**Data Field**: `member.skills.continuingEducation`  
**Range**: 70-89

**Scoring Criteria**:

- **85+**: Actively pursuing degrees, multiple recent certifications
- **80-84**: Regular training and certification renewal
- **75-79**: Periodic training
- **70-74**: Basic requirement maintenance

**Factors**:

- Current degree programs (e.g., ASU enrollment)
- Recent certifications (past 2 years)
- Training attendance
- Professional development investments

---

## Overall Score Averages

Team members' 10 skills average to these realistic overall ratings:

| Tier                | Average | Roles                                                      |
| ------------------- | ------- | ---------------------------------------------------------- |
| Executive           | 88-92%  | President, VP, Senior leadership                           |
| Senior Professional | 85-87%  | Marketing Manager, Finance Manager, Senior Superintendents |
| Management          | 80-85%  | Project Managers, Superintendents                          |
| Professional        | 75-80%  | Admin coordinators, HR, Project engineers                  |

**Note**: These are overall averages. Individual skills may be significantly higher or lower based on role specialization.

---

## Visual Design

### Colors (MH Branding Compliant)

**Chart Elements**:

- **Grid lines**: Hunter Green (`#386851`) in light mode, Leather Tan (`#BD9264`) in dark mode
- **Data fill**: Hunter Green with 60% opacity
- **Data stroke**: Hunter Green (2px weight)
- **Labels**: Hunter Green in light mode, Leather Tan in dark mode

**Skill Level Indicators**:

- **Master (95+)**: Bronze (`text-bronze-badge`)
- **Expert (85-94)**: Hunter Green (`text-brand-primary`)
- **Proficient (75-84)**: Olive Green (`text-green-700`)
- **Competent (65-74)**: Leather Tan (`text-brand-secondary`)
- **Developing (<65)**: Gray (`text-gray-500`)

### Interactive Features

**Tooltips**: Hover over any data point to see:

- Skill name (full, no line break)
- Exact score (e.g., "94/100")
- Skill level with icon (e.g., "Master 👑")

**Top 3 Skills Display**: Below chart shows:

- Medal icons (Material Icons: `workspace_premium`, `verified`, `stars`)
- Skill name
- Exact score
- Skill level indicator

### Veteran Badge Display

For military veterans (Jeremy - Army, Matt - Navy):

- Bronze badge displayed in CENTER of radar chart
- Above the skills visualization
- Includes star icon and "Thank you for your service" message with flag icon
- Special ring effect with bronze color

---

## Implementation Notes

### Data Structure

```typescript
interface TeamMemberSkills {
  leadership: number; // 0-100
  technical: number; // 0-100
  communication: number; // 0-100
  safety: number; // 0-100
  problemSolving: number; // 0-100
  teamwork: number; // 0-100
  organization: number; // 0-100
  innovation: number; // 0-100
  passion: number; // 0-100
  continuingEducation: number; // 0-100
}
```

### Scoring Guidelines

**DO**:

- Base scores on objective criteria
- Account for OSHA certification in safety scores
- Differentiate based on role requirements
- Use full 50-95 range for meaningful spread

**DON'T**:

- Give 100 in any category (unrealistic perfection)
- Score below 50 (implies incompetence)
- Make all scores uniform (shows no specialization)
- Ignore certification impact on safety scores

### Maintenance

**When adding new team members**:

1. Review role requirements
2. Check certifications (especially OSHA for safety)
3. Consider years of experience
4. Balance scores to achieve realistic overall average
5. Ensure 10 skills average to target percentage

**Annual review**:

- Update for new certifications earned
- Adjust for promotions/role changes
- Reflect continuing education progress
- Update safety scores for OSHA certification

---

## Related Documentation

- [Badge System](./team-badge-system.md) - Achievement recognition
- [Color System](./color-system.md) - Brand color palette
- [Team Data Schema](../../technical/design-system/team-data-structure.md) - Data structure
- [Brand Overview](../strategy/brand-overview.md) - Core values

---

**Version History**:

- v2.0.0 (Dec 24, 2025): Added Passion and Growth Mindset dimensions (10 total)
- v1.0.0: Initial 8 dimensions

**Last Review Date**: December 24, 2025  
**Next Review Date**: March 24, 2026  
**Document Owner**: Marketing/HR Department  
**Technical Contact**: Development Team
