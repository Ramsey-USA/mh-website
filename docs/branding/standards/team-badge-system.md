# Team Achievement Badge System

**Date:** December 24, 2025  
**Status:** ✅ Current  
**Category:** Business - Team Recognition  
**Last Updated:** December 24, 2025  
**Version:** 1.0.0

## Quick Navigation

- [🏠 Brand Documentation](../)
- [🎨 Color System](./color-system.md)
- [📋 Brand Overview](../strategy/brand-overview.md)

---

## Overview

The Team Achievement Badge System provides a standardized way to recognize and display team member accomplishments, certifications, and milestones on the MH Construction website. Badges follow strict branding guidelines and are awarded based on objective, verifiable criteria.

## Core Principles

1. **Merit-Based**: All badges must be earned through objective achievements
2. **Brand-Compliant**: Colors and styling must follow established brand guidelines
3. **Verifiable**: Criteria must be documentable and factual
4. **Meaningful**: Badges represent significant accomplishments or qualifications
5. **Inclusive**: Opportunities exist across all roles and experience levels

---

## Active Badge Categories

### 1. Veteran Service Recognition 🇺🇸

**Purpose**: Honor military service to our country

#### Military Veteran Badge

**Criteria**: Active military service (any branch)  
**Icon**: `military_tech`  
**Color**: Bronze (`#CD7F32` / `bg-bronze-badge`)  
**Text Color**: White  
**Special Designation**: Gold ring highlight  
**Display Text**: `[Branch] Veteran` (e.g., "Navy Veteran", "Army Veteran")

**Branch-Specific Display**:

- Army Veteran
- Navy Veteran
- Air Force Veteran
- Marine Corps Veteran
- Coast Guard Veteran
- Space Force Veteran

**Implementation Notes**:

- Reserved exclusively for verified military service
- Includes service description in tooltip (years served, medals, honors)
- Special visual treatment with bronze ring and star icon
- Displayed prominently in center of radar chart (above Professional Skills Profile)
- Material Icon `flag` with "Thank you for your service" message displays below veteran badge

**Data Source**: `member.veteranStatus` field

---

### 2. Educational Achievement

**Purpose**: Recognize formal education and continuous learning

#### Master's Degree

**Criteria**: Completed master's degree (any field)  
**Icon**: `school`  
**Color**: Bronze (`#CD7F32` / `bg-bronze-badge` / `dark:bg-bronze-badge`)  
**Text Color**: White  
**Display Text**: "Master's Degree"  
**Note**: Bronze color represents highest educational achievement, matching veteran honor color

**Detection Keywords**: master, m.s, m.a, mba

#### Bachelor's Degree

**Criteria**: Completed bachelor's degree (any field)  
**Icon**: `school`  
**Color**: Hunter Green (`#386851` / `bg-brand-primary` / `dark:bg-brand-primary-light`)  
**Text Color**: White  
**Display Text**: "Bachelor's Degree"  
**Note**: Uses MH brand primary color

**Detection Keywords**: bas, bachelor, b.s, b.a

#### College Graduate

**Criteria**: Completed college education (associate or technical degree)  
**Icon**: `school`  
**Color**: Leather Tan (`#BD9264` / `bg-brand-secondary` / `dark:bg-brand-secondary-light`)  
**Text Color**: White  
**Display Text**: "College Graduate"  
**Note**: Uses MH brand secondary color

**Detection Keywords**: management, engineering, technology, administration, operations, aas

**Data Source**: `member.education` field

---

### 3. Company Legacy & Milestones

**Purpose**: Honor foundational and long-term contributions

#### Company Founder

**Criteria**: Founded MH Construction  
**Icon**: `foundation`  
**Color**: Brand Secondary (`bg-brand-secondary`)  
**Text Color**: White  
**Display Text**: "Company Founder"

**Data Source**: `member.role` contains "founder"

#### Senior Experience (20+ Years)

**Criteria**: 20 or more years of industry experience  
**Icon**: `workspace_premium`  
**Color**: Brand Primary (`bg-brand-primary`)  
**Text Color**: White  
**Display Text**: "[Years]+ Years" (e.g., "35+ Years")

**Milestones**:

- 20+ years: Standard badge
- 30+ years: Enhanced prestige
- 40+ years: Exceptional recognition

**Data Source**: `member.careerStats.yearsExperience >= 20`

---

### 4. Performance Excellence

**Purpose**: Recognize exceptional work output and quality

#### Elite Performer

**Criteria**: 500+ completed projects  
**Icon**: `star`  
**Color**: Brand Secondary (`bg-brand-secondary`)  
**Text Color**: White  
**Display Text**: "Elite Performer"

**Performance Tiers**:

- 500+ projects: Elite Performer
- 1000+ projects: (Future: Master Performer)

**Data Source**: `member.careerStats.totalProjects >= 500`

#### Client Champion

**Criteria**: 99%+ client satisfaction rating  
**Icon**: `sentiment_very_satisfied`  
**Color**: Brand Primary (`bg-brand-primary`)  
**Text Color**: White  
**Display Text**: "Client Champion"

**Data Source**: `member.currentYearStats.clientSatisfaction >= 99`

---

### 5. Safety Excellence

**Purpose**: Recognize commitment to safety standards and practices

#### Perfect Safety Record

**Criteria**: Perfect safety record for current year  
**Icon**: `verified_user`  
**Color**: Success Green (`bg-green-600` / `dark:bg-green-500`)  
**Text Color**: White  
**Display Text**: "Perfect Safety"

**Data Source**: `member.currentYearStats.safetyRecord === "PERFECT"`

#### Safety Champion

**Criteria**: Safety skills score of 88+ (typically OSHA certified or field superintendents)  
**Icon**: `shield`  
**Color**: Error Red (`bg-red-600` / `dark:bg-red-500`)  
**Text Color**: White  
**Display Text**: "Safety Champion"  
**Note**: Red color emphasizes critical importance of safety. Score reflects OSHA certification and field experience.

**Data Source**: `member.skills.safety >= 88`

---

### 6. Professional Certifications

**Purpose**: Highlight specialized training and credentials

#### Six Sigma Certification

**Criteria**: Six Sigma Black Belt or equivalent  
**Icon**: `analytics`  
**Color**: Neutral Gray (`bg-gray-700` / `dark:bg-gray-600`)  
**Text Color**: White  
**Display Text**: "Six Sigma"

**Data Source**: `member.certifications` contains "Six Sigma"

---

### 7. Skills-Based Recognition

**Purpose**: Reward exceptional skill development in core competencies  
**Threshold**: All skill-based badges require 88+ score for excellence recognition

#### Leadership Excellence

**Criteria**: Partnership Leadership score of 88+  
**Icon**: `military_tech`  
**Color**: Brand Primary (`bg-brand-primary` / `dark:bg-brand-primary-light`)  
**Text Color**: White  
**Display Text**: "Leadership Excellence"

**Data Source**: `member.skills.leadership >= 88`

#### Technical Master

**Criteria**: Technical Excellence score of 88+  
**Icon**: `engineering`  
**Color**: Neutral Gray (`bg-gray-700` / `dark:bg-gray-600`)  
**Text Color**: White  
**Display Text**: "Technical Master"

**Data Source**: `member.skills.technical >= 88`

#### Communication Expert

**Criteria**: Transparent Communication score of 88+  
**Icon**: `forum`  
**Color**: Brand Secondary (`bg-brand-secondary` / `dark:bg-brand-secondary-light`)  
**Text Color**: White  
**Display Text**: "Communication Expert"

**Data Source**: `member.skills.communication >= 88`

#### Problem-Solving Pro

**Criteria**: Strategic Thinking/Problem-Solving score of 88+  
**Icon**: `psychology`  
**Color**: Success Green (`bg-green-600` / `dark:bg-green-500`)  
**Text Color**: White  
**Display Text**: "Problem-Solving Pro"

**Data Source**: `member.skills.problemSolving >= 88`

#### Team Builder

**Criteria**: Partnership Unity/Teamwork score of 88+  
**Icon**: `groups`  
**Color**: Brand Primary (`bg-brand-primary` / `dark:bg-brand-primary-light`)  
**Text Color**: White  
**Display Text**: "Team Builder"

**Data Source**: `member.skills.teamwork >= 88`

#### Precision Expert

**Criteria**: Thoroughness/Organization score of 88+  
**Icon**: `precision_manufacturing`  
**Color**: Neutral Gray (`bg-gray-700` / `dark:bg-gray-600`)  
**Text Color**: White  
**Display Text**: "Precision Expert"

**Data Source**: `member.skills.organization >= 88`

#### Innovation Leader

**Criteria**: Client-Focused Excellence/Innovation score of 88+  
**Icon**: `lightbulb`  
**Color**: Warning Orange (`bg-orange-600` / `dark:bg-orange-500`)  
**Text Color**: White  
**Display Text**: "Innovation Leader"

**Data Source**: `member.skills.innovation >= 88`

---

## Future Badge Opportunities

### Planned for Implementation

#### OSHA Certification Badges

**OSHA 30 Certified**

- **Criteria**: OSHA 30-hour safety certification
- **Icon**: `security`
- **Color**: Success Green
- **Detection**: `member.certifications` contains "OSHA 30"

**OSHA 10 Certified**

- **Criteria**: OSHA 10-hour safety certification
- **Icon**: `verified`
- **Color**: Green variant
- **Detection**: `member.certifications` contains "OSHA 10"

#### Medical & Emergency Response

**First Aid/CPR Certified**

- **Criteria**: Current First Aid and CPR certification
- **Icon**: `local_hospital`
- **Color**: Red medical (`bg-red-500`)
- **Detection**: `member.certifications` contains "CPR" or "First Aid"

#### Equipment & Operations

**CDL License Holder**

- **Criteria**: Commercial Driver's License
- **Icon**: `local_shipping`
- **Color**: Gray professional
- **Detection**: `member.certifications` contains "CDL"

**Forklift Certified**

- **Criteria**: Forklift operation certification
- **Icon**: `forklift`
- **Color**: Yellow warning
- **Detection**: `member.certifications` contains "Forklift"

**Aerial Lift Certified**

- **Criteria**: Scissor lift, snake lift, aerial platform certification
- **Icon**: `elevator`
- **Color**: Orange safety
- **Detection**: `member.certifications` contains "Scissor Lift" or "Aerial"

#### Sustainability & Green Building

**LEED Certified Professional**

- **Criteria**: LEED accreditation (any level)
- **Icon**: `eco`
- **Color**: Eco green (`bg-green-700`)
- **Display Text**: "LEED Professional"

#### Language & Communication

**Bilingual Professional**

- **Criteria**: Certified interpreter or fluent in multiple languages
- **Icon**: `translate`
- **Color**: Brand primary
- **Example**: "Spanish/English Interpreter"
- **Detection**: `member.certifications` contains "Interpreter"

#### Mentorship & Leadership

**Mentor Achievement**

- **Criteria**: 10+ documented mentorships
- **Icon**: `supervisor_account`
- **Color**: Brand primary
- **Display Text**: "Mentor" or "Mentor Leader"
- **Tiers**: 10+ (Mentor), 20+ (Master Mentor), 30+ (Elite Mentor)
- **Data**: `member.careerStats.mentorships >= 10`

#### Company Tenure

**Decade of Service**

- **Criteria**: 10+ years with MH Construction
- **Icon**: `military_tech`
- **Color**: Brand secondary
- **Display Text**: "[Years] Years of Service"
- **Milestones**: 10, 15, 20, 25, 30 years
- **Data**: `member.yearsWithCompany >= 10`

#### Project Performance

**On-Time Delivery Expert**

- **Criteria**: Consistent on-time project completion (tracked metric)
- **Icon**: `schedule`
- **Color**: Success green
- **Display Text**: "On-Time Delivery"

**Budget Master**

- **Criteria**: Consistent under-budget project completion
- **Icon**: "savings"
- **Color**: Success green
- **Display Text**: "Budget Master"

**Quality Assurance Champion**

- **Criteria**: Zero defect/rework rate over extended period
- **Icon**: `verified`
- **Color**: Brand primary
- **Display Text**: "Quality Champion"

#### Client Relations

**Client Retention Specialist**

- **Criteria**: High repeat client rate (75%+ of projects from repeat clients)
- **Icon**: `handshake`
- **Color**: Brand primary
- **Display Text**: "Client Retention Expert"

**Referral Champion**

- **Criteria**: High percentage of projects from referrals
- **Icon**: `share`
- **Color**: Brand secondary
- **Display Text**: "Referral Champion"

#### Expertise & Specialization

**Cross-Functional Expert**

- **Criteria**: 6+ documented specialty areas
- **Icon**: `category`
- **Color**: Neutral gray
- **Display Text**: "Multi-Specialty Expert"
- **Data**: `member.careerStats.specialtyAreas >= 6`

**Technical Mastery**

- **Criteria**: Technical Excellence skill score of 95+
- **Icon**: `engineering`
- **Color**: Brand primary
- **Display Text**: "Technical Master"
- **Data**: `member.skills.technical >= 95`

#### Industry Recognition

**Award Winner**

- **Criteria**: Industry or company awards
- **Icon**: `emoji_events`
- **Color**: Gold/Bronze based on award type
- **Display Text**: Award name
- **Data**: `member.awards` field

#### Community & Culture

**Community Leader**

- **Criteria**: Documented community service or volunteer leadership
- **Icon**: `volunteer_activism`
- **Color**: Brand secondary
- **Display Text**: "Community Leader"

**Culture Champion**

- **Criteria**: Team building initiatives, positive culture impact
- **Icon**: `groups_2`
- **Color**: Brand primary
- **Display Text**: "Culture Champion"

---

## Badge Display Guidelines

### Visual Hierarchy

**Order of Display** (left to right):

1. Veteran service badges (special recognition)
2. Founder/legacy badges
3. Education badges
4. Certification badges
5. Performance badges
6. Skills-based badges

### Responsive Behavior

- **Desktop**: Full badge display with icons and labels
- **Tablet**: Full display, may wrap to multiple rows
- **Mobile**: Compact display, icons scale appropriately

### Accessibility

- All badges include `title` attribute with full description
- Color contrast meets WCAG AA standards minimum
- Screen reader labels describe achievement
- Keyboard navigation supported

### Visual Treatment

**Standard Badge**:

- Rounded corners (`rounded-lg`)
- Drop shadow (`shadow-md`)
- Hover effect increases shadow (`hover:shadow-lg`)
- Icon + text display
- Appropriate color from brand palette

**Special Badge (Veteran)**:

- All standard features plus:
- Bronze ring highlight (`ring-2 ring-bronze-badge`)
- Additional star icon (Material Icon `stars`)
- Enhanced tooltip with service details
- Displayed in center of radar chart for prominence
- Special recognition message with flag icon

---

## Implementation Code Reference

### Badge Structure

```typescript
interface Badge {
  icon: string; // Material Icon name
  label: string; // Display text
  color: string; // Tailwind background class
  textColor: string; // Tailwind text color class
  special?: boolean; // Special visual treatment
  description?: string; // Tooltip/hover text
}
```

### Adding New Badges

1. Define criteria in this document
2. Add detection logic to `getAchievementBadges()` function
3. Use brand-compliant colors
4. Test with multiple team members
5. Verify accessibility compliance
6. Update this documentation

### Badge Color Palette

| Category                    | Color        | Tailwind Class       | Use Case                           |
| --------------------------- | ------------ | -------------------- | ---------------------------------- |
| Veteran/Highest Achievement | Bronze       | `bg-bronze-badge`    | Military service, Master's degrees |
| Primary                     | Hunter Green | `bg-brand-primary`   | Company values, Bachelor's degrees |
| Secondary                   | Leather Tan  | `bg-brand-secondary` | College graduates, milestones      |
| Success                     | Green        | `bg-green-600`       | Safety, performance                |
| Warning                     | Orange       | `bg-orange-600`      | Innovation, attention              |
| Error                       | Red          | `bg-red-600`         | Critical importance (safety)       |
| Neutral                     | Gray         | `bg-gray-700`        | Professional certifications        |

**Note**: All badge colors now follow MH branding and military color compliance. Purple and generic blues have been replaced with brand palette colors.

---

## Data Requirements

### Required Fields in team-data.json

For badges to function, team member objects must include:

```json
{
  "veteranStatus": "Navy Veteran",
  "education": "Bachelor of Science in Construction Management",
  "certifications": "OSHA 30, CPR, Six Sigma Black Belt",
  "awards": "Navy Achievement Medal",
  "role": "Project Manager",
  "yearsWithCompany": 5,
  "careerStats": {
    "yearsExperience": 15,
    "totalProjects": 220,
    "specialtyAreas": 5,
    "mentorships": 15
  },
  "currentYearStats": {
    "clientSatisfaction": 95,
    "safetyRecord": "EXCELLENT"
  },
  "skills": {
    "leadership": 75,
    "technical": 85,
    "communication": 88,
    "safety": 80,
    "problemSolving": 90,
    "teamwork": 82,
    "organization": 88,
    "innovation": 85,
    "passion": 82,
    "continuingEducation": 78
  }
}
```

---

## Maintenance & Updates

### Review Schedule

- **Quarterly**: Review badge criteria effectiveness
- **Annually**: Assess new badge opportunities
- **As Needed**: Adjust thresholds based on team growth

### Adding Team Members

When adding new team members:

1. Complete all data fields accurately
2. Verify certification and achievement documentation
3. Test badge display in development
4. Ensure descriptions are accurate

### Removing/Retiring Badges

Process for deprecating badges:

1. Document reason for removal
2. Provide transition period (if applicable)
3. Update this documentation
4. Remove badge logic from component
5. Archive historical badge data

---

## Related Documentation

- [Color System](./color-system.md) - Brand color palette
- [Team Data Structure](../../technical/design-system/team-data-structure.md) - Data schema
- [Component Standards](./component-standards.md) - UI guidelines
- [Brand Overview](../strategy/brand-overview.md) - Core values

---

**Last Review Date**: December 24, 2025  
**Next Review Date**: March 24, 2026  
**Document Owner**: Marketing/HR Department  
**Technical Contact**: Development Team
