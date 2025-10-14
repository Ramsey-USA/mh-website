# Icon Usage Reference

This document tracks icon usage across the website to ensure unique icons and avoid duplication.

## Navigation & Footer Icons

### Main Navigation Links

- **Start Partnership** (`/booking`): `handshake` - Partnership initiation
- **AI Estimator** (`/estimator`): `calculate` - Calculator/estimation tool
- **Home** (`/`): `home` - Home/house icon
- **Our Story** (`/about`): `info` - Information icon
- **Partnership Approach** (`/services`): `build` - Tools/construction icon
- **Our Team** (`/team`): `people` - People/team icon
- **Success Stories** (`/projects`): `photo_library` - Portfolio/gallery icon
- **Government** (`/government`): `account_balance` - Government building icon
- **Trade Partners** (`/trade-partners`): `business` - Business/corporate icon
- **Join Our Team** (`/careers`): `badge` - Career/job icon
- **Connect With Us** (`/contact`): `contact_phone` - Contact/phone icon

### Footer Specific Icons

- **Partnership Links Section Header**: `link` - Link chain icon
- **Connect & Resources Section Header**: `share` - Share/social icon
- **Search Button**: `search` - Magnifying glass icon
- **Arrow Forward**: `arrow_forward` - Navigation arrow (used for all footer links)

### Contact Information Icons

- **Partnership Phone**: `call` - Phone icon
- **Partnership Office**: `place` - Location/map pin icon
- **Partnership Email**: `mail` - Email/mail icon

### Social Media Icons

- **Facebook**: `thumb_up` - Like/thumbs up icon
- **Instagram**: `photo_camera` - Camera icon
- **X (Twitter)**: `close` - X icon (representing the X platform)
- **YouTube**: `play_circle` - Play button icon
- **LinkedIn**: `work` - Work/briefcase icon

### Footer Resources Icons

- **Partnership Brochures**: `description` - Document icon
- **Veteran Partnership Programs**: `military_tech` - Military/veteran icon

### Bottom Bar Icons

- **Copyright**: `copyright` - Copyright symbol
- **Veteran-owned**: `military_tech` - Military/veteran icon (reused)
- **Licensed & Insured**: `verified` - Verified/checkmark icon
- **Location**: `location_on` - Location pin icon
- **Building Philosophy**: `build` - Tools/construction icon (reused)

## Icon Duplication Check

### ✅ Unique Icons (No Conflicts)

- `handshake` - Used only for "Start Partnership"
- `calculate` - Used only for "AI Estimator"
- `home` - Used only for "Home"
- `info` - Used only for "Our Story"
- `people` - Used only for "Our Team"
- `photo_library` - Used only for "Success Stories"
- `account_balance` - Used only for "Government"
- `business` - Used only for "Trade Partners"
- `badge` - Used only for "Join Our Team"
- `contact_phone` - Used only for "Connect With Us"
- `link` - Used only for footer section header
- `share` - Used only for footer section header
- `call` - Used only for phone contact
- `place` - Used only for office address
- `mail` - Used only for email contact
- `thumb_up` - Used only for Facebook
- `photo_camera` - Used only for Instagram
- `close` - Used only for X (Twitter)
- `play_circle` - Used only for YouTube
- `description` - Used only for brochures
- `copyright` - Used only for copyright notice
- `verified` - Used only for licensed & insured
- `location_on` - Used only for service area

### ⚠️ Intentionally Reused Icons

- `military_tech` - Used for both veteran-owned status AND veteran programs (acceptable as both
  relate to veteran services)
- `build` - Used for both services AND building philosophy (acceptable as both relate to
  construction)
- `work` - Used only for LinkedIn (moved from careers to avoid duplication)
- `arrow_forward` - Used for all footer navigation links (acceptable as consistent navigation
  element)

## Design Guidelines

1. **Unique Context**: Each icon should represent a unique concept or page
2. **Semantic Meaning**: Icons should clearly relate to their associated content
3. **Consistent Style**: All icons use Material Design icon system
4. **Accessibility**: Icons are accompanied by descriptive text
5. **Visual Hierarchy**: Important actions use more prominent icons

## Change Log

**October 10, 2025:**

- **CRITICAL TERMINOLOGY UPDATE**: Established clear distinction between internal team and external partners
- Changed `/team` from `groups` to `people` icon
- **Changed team label from "Your Partners" to "Our Team"** - This is a critical distinction:
  - **"Our Team"** (`/team`) = Internal MH Construction employees and staff
  - **"Trade Partners"** (`/trade-partners`) = External subcontractors and business partnerships
- Changed `/trade-partners` from `handshake` to `business` icon
- Changed `/careers` from `work` to `badge` icon
- Ensured `handshake` is uniquely used for "Start Partnership"
- Updated PageHero component navigation to match main Navigation component
- Fixed PageHero icon inconsistencies: `group` → `people`, `construction` → `build`,
  `work` → `photo_library`, `work_outline` → `badge`, `contact_mail` → `contact_phone`
- Applied MH brand colors (`brand-primary`) to PageHero navigation styling
- Verified no icon conflicts between Navigation, Footer, and PageHero components
- **Terminology Impact**: This change eliminates user confusion and clearly distinguishes
  internal capabilities from external partnerships
