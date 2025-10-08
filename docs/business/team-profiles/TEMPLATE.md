# Team Member Profile Template

This template ensures consistency between vintage baseball card data and individual team member MD files.

## File Structure

docs/business/team/
├── jeremy-thamert.md
├── mike-holstein.md
├── arnold-garcia.md
├── makayla-holstein.md
├── ben-woodall.md
├── todd-schoeff.md
├── matt-ramsey.md
├── ronaldo-garcia.md
├── steve-mcclary.md
├── reagan-massey.md
├── porter-cline.md
├── brooks-morris.md
├── brittney-holstein.md
├── jennifer-tenehuerta.md
└── trigger.md

## Standard MD Template with MH Brand Colors

```markdown
# [Full Name] - "[Nickname]"

> **Card #[Number]** | **[Department]** | **[Veteran Status if applicable]**

## <span style="color: #2D5016;">📋 Quick Facts</span>
- **Role**: [Position]
- **Years with Company**: [Number]
- **Hometown**: [Location]
- **Education**: [School/Training]
- **Height**: [If applicable]

## <span style="color: #D2B48C;">📊 2025 Performance Statistics</span>
- **Projects Completed**: [Number]
- **Client Satisfaction**: [Percentage]%
- **Safety Record**: [Status]
- **Team Collaborations**: [Number]

## <span style="color: #2D5016;">🏆 Career Statistics</span>
- **Total Projects**: [Number]
- **Years Experience**: [Number]
- **Specialty Areas**: [Number]
- **Mentorships**: [Number]

## <span style="color: #D2B48C;">🎖️ Awards & Recognition</span>
[List of awards from vintage-team.ts awards field]

## <span style="color: #2D5016;">👤 Biography</span>
[Bio from vintage-team.ts]

## <span style="color: #D2B48C;">⭐ Career Highlights</span>
[Bullet points from careerHighlights array]

## <span style="color: #2D5016;">🔧 Professional Specialties</span>
[List from specialties array]

## <span style="color: #D2B48C;">📜 Certifications</span>
[From certifications field]

## <span style="color: #2D5016;">🎯 Personal Interests</span>
- **Hobbies**: [From hobbies field]
- **Special Interests**: [From specialInterests field]

## <span style="color: #D2B48C;">💡 Fun Fact</span>
[From funFact field]
```text

## MH Construction Brand Colors

- **Hunter Green**: `#2D5016` - Used for primary sections (Quick Facts, Career Stats, Biography, Specialties, Personal Interests)
- **Leather Tan**: `#D2B48C` - Used for secondary sections (Performance Stats, Awards, Highlights, Certifications, Fun Fact)

## Header Icons & Sections

- 📋 Quick Facts (Hunter Green)
- 📊 2025 Performance Statistics (Leather Tan)
- 🏆 Career Statistics (Hunter Green)
- 🎖️ Awards & Recognition (Leather Tan)
- 👤 Biography (Hunter Green)
- ⭐ Career Highlights (Leather Tan)
- 🔧 Professional Specialties (Hunter Green)
- 📜 Certifications (Leather Tan)
- 🎯 Personal Interests (Hunter Green)
- 💡 Fun Fact (Leather Tan)

## Awards & Recognition

[List of awards from vintage-team.ts awards field]

## Biography

[Bio from vintage-team.ts]

## Career Highlights

[Bullet points from careerHighlights array]

## Professional Specialties

[List from specialties array]

## Certifications

[From certifications field]

## Personal Interests

- **Hobbies**: [From hobbies field]
- **Special Interests**: [From specialInterests field]

## Fun Fact

[From funFact field]

---
*This profile is synchronized with vintage baseball card data in `src/lib/data/vintage-team.ts`*

## Data Synchronization Rules

1. **Source of Truth**: `src/lib/data/vintage-team.ts`
2. **Update Process**: When baseball card data changes, corresponding MD file must be updated
3. **Validation**: All fields should match between baseball card and MD file
4. **Consistency**: Nicknames, awards, and statistics must be identical across both formats

## Key Fields to Sync

### Core Information

- `name` → Full Name
- `nickname` → Nickname in quotes
- `role` / `position` → Role
- `department` → Department
- `cardNumber` → Card number
- `veteranStatus` → Veteran status badge

### Personal Details

- `yearsWithCompany` → Years with company
- `hometown` → Hometown
- `education` → Education
- `height` → Height

### Statistics

- `currentYearStats` → 2025 Performance Statistics section
- `careerStats` → Career Statistics section

### Content

- `awards` → Awards & Recognition section
- `bio` → Biography section
- `careerHighlights` → Career Highlights section
- `specialties` → Professional Specialties section
- `certifications` → Certifications section
- `hobbies` → Hobbies under Personal Interests
- `specialInterests` → Special Interests under Personal Interests
- `funFact` → Fun Fact section
