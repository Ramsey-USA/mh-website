# Baseball Card Team Page Implementation# Baseball Card Team Page Implementation

**Status**: ✅ **COMPLETED** - Baseball card theme successfully implemented for team page  **Status**: ✅ **COMPLETED** - Baseball card theme successfully implemented for team page

**Date**: October 2025  **Date**: October 2025

**Component**: `BaseballCard.tsx` + Team Page Integration  **Component**: `BaseballCard.tsx` + Team Page Integration

**Purpose**: Interactive, engaging team member display with professional baseball card aesthetic**Purpose**: Interactive, engaging team member display with professional baseball card aesthetic

------

## 🎯 Overview

The baseball card theme transforms the traditional team page into an interactive, engaging experience that showcases
MH Construction team members in a professional yet memorable format. Each team member is displayed as a flippable
baseball card with company branding and detailed profile information.

### Key Features

- **Interactive Flip Cards**: Click to reveal detailed member information

- **Department Organization**: Team members grouped by department with branded headers- **Department Organization**: Team members grouped by department with branded headers

- **Mascot Integration**: Special styling for "Trigger" the company mascot- **Mascot Integration**: Special styling for "Trigger" the company mascot

- **Veteran Status Badges**: Visual recognition for military service- **Veteran Status Badges**: Visual recognition for military service

- **Responsive Design**: Works seamlessly across all device sizes- **Responsive Design**: Works seamlessly across all device sizes

- **Brand Consistency**: Aligned with MH Construction color palette and typography- **Brand Consistency**: Aligned with MH Construction color palette and typography

------

## 🏗️ Technical Implementation## 🏗️ Technical Implementation

### Core Components### **Core Components**

#### 1. BaseballCard Component (`/src/components/ui/BaseballCard.tsx`)#### 1. **BaseballCard Component** (`/src/components/ui/BaseballCard.tsx`)

- **Type**: Interactive flip card component

- **Type**: Interactive flip card component- **Props**: `TeamMember` object

- **Props**: `TeamMember` object- **Features**:

- **Features**:  - 3D flip animation using CSS transforms

  - 3D flip animation using CSS transforms  - Dynamic role-based icons

  - Dynamic role-based icons  - Veteran status badge system

  - Veteran status badge system  - Special mascot theming

  - Special mascot theming  - Click-to-flip functionality

  - Click-to-flip functionality

#### 2. **Team Page** (`/src/app/team/page.tsx`)

#### 2. Team Page (`/src/app/team/page.tsx`)- **Layout**: Department-based grouping with responsive grid

- **Integration**: Uses `BaseballCard` component for each team member

- **Layout**: Department-based grouping with responsive grid- **Mascot Logic**: Adds Trigger to Executive Leadership section

- **Integration**: Uses `BaseballCard` component for each team member- **Animations**: Framer Motion fade-in effects

- **Mascot Logic**: Adds Trigger to Executive Leadership section

- **Animations**: Framer Motion fade-in effects### **Visual Structure**

### Visual Structure```

Team Page Layout:

```text├── Page Hero (Title & Instructions)

Team Page Layout:├── Department Sections

├── Page Hero (Title & Instructions)│   ├── Department Header (Branded)

├── Department Sections│   └── Baseball Cards Grid

│   ├── Department Header (Branded)│       ├── Front Side (Photo, Name, Role)

│   └── Baseball Cards Grid│       └── Back Side (Bio, Specialties, Stats)

│       ├── Front Side (Photo, Name, Role)└── Call-to-Action Section

│       └── Back Side (Bio, Specialties, Stats)```

└── Call-to-Action Section

```---



---## 🎨 Design System Integration



## 🎨 Design System Integration### **Brand Colors Applied**



### Brand Colors Applied#### **Standard Team Members**

```css

#### Standard Team Members/* Primary Elements */

header: brand-primary gradient (#386851 to brand-primary-dark)

```cssphoto-ring: brand-primary/20 to brand-secondary/20

/* Primary Elements */role-text: brand-secondary (#BD9264)

header: brand-primary gradient (#386851 to brand-primary-dark)specialty-tags: brand-primary/10 background, brand-primary text

photo-ring: brand-primary/20 to brand-secondary/20stats: brand-primary color

role-text: brand-secondary (#BD9264)

specialty-tags: brand-primary/10 background, brand-primary text/* Card Background */

stats: brand-primary colorfront/back: white via gray-50 to gray-100 gradient

border: gray-200

/* Card Background */```

front/back: white via gray-50 to gray-100 gradient

border: gray-200#### **Mascot (Trigger) Styling**

``````css

/* Special Amber Theme */

#### Mascot (Trigger) Stylingheader: amber-500 to orange-500 gradient

photo-ring: amber-300/20 to orange-300/20

```cssrole-text: orange-600

/* Special Amber Theme */specialty-tags: amber-200 background, amber-800 text

header: amber-500 to orange-500 gradientstats: amber-600 color

photo-ring: amber-300/20 to orange-300/20

role-text: orange-600/* Card Background */

specialty-tags: amber-200 background, amber-800 textfront/back: amber-50 via orange-50 to yellow-50 gradient

stats: amber-600 colorborder: amber-300

```text

/*Card Background*/

front/back: amber-50 via orange-50 to yellow-50 gradient### **Typography Hierarchy**

border: amber-300- **Names**: `text-xl font-black` (Primary focus)

```- **Roles**: `text-sm font-bold uppercase tracking-wide` (Secondary)

- **Bio Text**: `text-sm leading-relaxed` (Readable body text)

### Typography Hierarchy- **Specialties**: `text-xs font-medium` (Compact tags)

- **Stats**: `text-2xl font-bold` (Prominent numbers)

- **Names**: `text-xl font-black` (Primary focus)

- **Roles**: `text-sm font-bold uppercase tracking-wide` (Secondary)---

- **Bio Text**: `text-sm leading-relaxed` (Readable body text)

- **Specialties**: `text-xs font-medium` (Compact tags)## 🔧 Component Architecture

- **Stats**: `text-2xl font-bold` (Prominent numbers)

### **BaseballCard Props Interface**

---```typescript

interface BaseballCardProps {

## 🔧 Component Architecture  member: TeamMember

}

### BaseballCard Props Interface

type TeamMember = {

```typescript  name: string

interface BaseballCardProps {  role: string

  member: TeamMember  department: string

}  experienceYears: number | string

  specialties: string[]

type TeamMember = {  bio: string

  name: string  slug: string

  role: string  active: boolean

  department: string  avatar?: string

  experienceYears: number | string  veteranStatus?: string

  specialties: string[]}

  bio: string```

  slug: string

  active: boolean### **Key Functions**

  avatar?: string

  veteranStatus?: string#### **Role Icon Mapping**

}```typescript

```function getRoleIcon(role: string): string

```text

### Key Functions- Maps job titles to Material Design icons

- Supports Owner, VP, Project Manager, Estimator, etc.

#### Role Icon Mapping- Special case for mascot (`pets` icon)

```typescript#### **Veteran Badge System**

function getRoleIcon(role: string): string```typescript

```function getVeteranStatusBadge(status?: string)

```text

- Maps job titles to Material Design icons- Displays appropriate military branch icons

- Supports Owner, VP, Project Manager, Estimator, etc.- Color-coded by service branch

- Special case for mascot (`pets` icon)- Supports civilian supporters and retired leadership

#### Veteran Badge System### **Animation System**

- **3D Flip Effect**: CSS `preserve-3d` and `rotate-y-180`

```typescript- **Hover Effects**: Scale transform on card hover

function getVeteranStatusBadge(status?: string)- **Page Animations**: Framer Motion `FadeInWhenVisible`

```- **Staggered Loading**: Department sections animate sequentially



- Displays appropriate military branch icons---

- Color-coded by service branch

- Supports civilian supporters and retired leadership## 📱 Responsive Design



### Animation System### **Grid Breakpoints**

```css

- **3D Flip Effect**: CSS `preserve-3d` and `rotate-y-180`/* Mobile First Approach */

- **Hover Effects**: Scale transform on card hovergrid-cols-1                    /* Default: Single column */

- **Page Animations**: Framer Motion `FadeInWhenVisible`md:grid-cols-2                /* Tablet: Two columns */

- **Staggered Loading**: Department sections animate sequentiallylg:grid-cols-3                /* Desktop: Three columns */

xl:grid-cols-4                /* Large: Four columns */

---```



## 📱 Responsive Design### **Card Dimensions**

- **Container**: `max-w-sm` (24rem/384px) width

### Grid Breakpoints- **Height**: Fixed `h-[500px]` for consistency

- **Photo**: `w-32 h-32` (8rem/128px) circular

```css- **Responsive Scaling**: Maintains proportions across devices

/* Mobile First Approach */

grid-cols-1                    /* Default: Single column */---

md:grid-cols-2                /* Tablet: Two columns */

lg:grid-cols-3                /* Desktop: Three columns */## 🎭 Interactive Features

xl:grid-cols-4                /* Large: Four columns */

```### **Flip Animation**

- **Trigger**: Click anywhere on card

### Card Dimensions- **Duration**: 700ms transition

- **Effect**: 3D rotation on Y-axis

- **Container**: `max-w-sm` (24rem/384px) width- **States**: Front (photo/basic info) ↔ Back (bio/specialties)

- **Height**: Fixed `h-[500px]` for consistency

- **Photo**: `w-32 h-32` (8rem/128px) circular### **Visual Feedback**

- **Responsive Scaling**: Maintains proportions across devices- **Hover**: Card scales to 102% (`hover:scale-[1.02]`)

- **Flip Indicators**: "Click to flip" / "Click to flip back"

---- **Shadow Changes**: Increased shadow on hover



## 🎭 Interactive Features### **Accessibility**

- **Cursor**: Pointer cursor indicates interactivity

### Flip Animation- **Alt Text**: Proper image alt attributes

- **Keyboard**: Click handlers work with keyboard activation

- **Trigger**: Click anywhere on card

- **Duration**: 700ms transition---

- **Effect**: 3D rotation on Y-axis

- **States**: Front (photo/basic info) ↔ Back (bio/specialties)## 👥 Team Member Data Structure



### Visual Feedback### **Department Organization**

```typescript

- **Hover**: Card scales to 102% (`hover:scale-[1.02]`)const departmentOrder = [

- **Flip Indicators**: "Click to flip" / "Click to flip back"  'Executive Leadership',

- **Shadow Changes**: Increased shadow on hover  'Project Management & Estimating',

  'Site & Field Operations',

### Accessibility  'Administration & Support'

]

- **Cursor**: Pointer cursor indicates interactivity```

- **Alt Text**: Proper image alt attributes

- **Keyboard**: Click handlers work with keyboard activation### **Mascot Integration**

```typescript

---const triggerMascot: TeamMember = {

  name: 'Trigger',

## 👥 Team Member Data Structure  role: 'Chief Morale Officer',

  department: 'Executive Leadership',

### Department Organization  experienceYears: 'Good Boy',

  specialties: ['Tail Wagging', 'Treat Evaluation', 'Security Patrol', 'Team Spirit'],

```typescript  bio: 'Trigger is our beloved company mascot...',

const departmentOrder = [  // ... other properties

  'Executive Leadership',}

  'Project Management & Estimating', ```

  'Site & Field Operations',

  'Administration & Support'---

]

```## 🔍 Quality Assurance



### Mascot Integration### **Visual Testing Checklist**

- ✅ Card flip animations work smoothly

```typescript- ✅ Images load properly with fallback icons

const triggerMascot: TeamMember = {- ✅ Text content fits within card boundaries

  name: 'Trigger',- ✅ Veteran badges display correctly

  role: 'Chief Morale Officer',- ✅ Mascot styling differs appropriately

  department: 'Executive Leadership',- ✅ Grid layouts work across devices

  experienceYears: 'Good Boy',- ✅ Brand colors match design system

  specialties: ['Tail Wagging', 'Treat Evaluation', 'Security Patrol', 'Team Spirit'],

  bio: 'Trigger is our beloved company mascot...',### **Interaction Testing**

  // ... other properties- ✅ Click-to-flip functionality

}- ✅ Hover effects respond properly

```- ✅ Touch interactions work on mobile

- ✅ Keyboard accessibility

---- ✅ Screen reader compatibility



## 🔍 Quality Assurance### **Performance Considerations**

- ✅ CSS transforms use GPU acceleration

### Visual Testing Checklist- ✅ Images optimized for web

- ✅ Component re-renders minimized

- ✅ Card flip animations work smoothly- ✅ Animation performance smooth on mobile

- ✅ Images load properly with fallback icons

- ✅ Text content fits within card boundaries---

- ✅ Veteran badges display correctly

- ✅ Mascot styling differs appropriately## 📊 Impact & Results

- ✅ Grid layouts work across devices

- ✅ Brand colors match design system### **User Experience Improvements**

- **Engagement**: Interactive cards increase time on page

### Interaction Testing- **Information Access**: Detailed profiles without page navigation

- **Visual Appeal**: Professional yet playful presentation

- ✅ Click-to-flip functionality- **Brand Recognition**: Consistent company theming throughout

- ✅ Hover effects respond properly

- ✅ Touch interactions work on mobile### **Technical Benefits**

- ✅ Keyboard accessibility- **Reusability**: Component can be used for other team displays

- ✅ Screen reader compatibility- **Maintainability**: Clear separation of data and presentation

- **Scalability**: Easy to add new team members

### Performance Considerations- **Accessibility**: Built with web standards compliance



- ✅ CSS transforms use GPU acceleration---

- ✅ Images optimized for web

- ✅ Component re-renders minimized## 🚀 Future Enhancements

- ✅ Animation performance smooth on mobile

### **Potential Improvements**

---- **Search/Filter**: Add ability to filter by department or specialty

- **Enhanced Animations**: More sophisticated card transitions

## 📊 Impact & Results- **Dynamic Data**: Integration with CMS for real-time updates

- **Social Links**: Add social media profile links

### User Experience Improvements- **Print Styles**: Optimized printing layouts



- **Engagement**: Interactive cards increase time on page### **Content Expansion**

- **Information Access**: Detailed profiles without page navigation- **Project Highlights**: Link to projects each member worked on

- **Visual Appeal**: Professional yet playful presentation- **Testimonials**: Client feedback specific to team members

- **Brand Recognition**: Consistent company theming throughout- **Certifications**: Display professional certifications and licenses

- **Video Profiles**: Optional video introductions

### Technical Benefits

---

- **Reusability**: Component can be used for other team displays

- **Maintainability**: Clear separation of data and presentation## 📝 Maintenance Notes

- **Scalability**: Easy to add new team members

- **Accessibility**: Built with web standards compliance### **Adding New Team Members**

1. Update `/src/lib/data/team.ts` with new member data

---2. Add avatar image to `/public/images/team/`

3. Component automatically handles display and styling

## 🚀 Future Enhancements

### **Updating Existing Members**

### Potential Improvements1. Modify data in team configuration file

2. Replace avatar images as needed

- **Search/Filter**: Add ability to filter by department or specialty3. No code changes required for content updates

- **Enhanced Animations**: More sophisticated card transitions

- **Dynamic Data**: Integration with CMS for real-time updates### **Styling Modifications**

- **Social Links**: Add social media profile links- Card dimensions: Adjust in `BaseballCard.tsx`

- **Print Styles**: Optimized printing layouts- Colors: Update in component or extend design system

- Animations: Modify CSS transforms and transitions

### Content Expansion

---

- **Project Highlights**: Link to projects each member worked on

- **Testimonials**: Client feedback specific to team members**Documentation Complete** ✅

- **Certifications**: Display professional certifications and licenses*This implementation successfully creates an engaging, professional team showcase that aligns with MH Construction's brand identity while providing an interactive user experience.*
- **Video Profiles**: Optional video introductions

---

## 📝 Maintenance Notes

### Adding New Team Members

1. Update `/src/lib/data/team.ts` with new member data
2. Add avatar image to `/public/images/team/`
3. Component automatically handles display and styling

### Updating Existing Members

1. Modify data in team configuration file
2. Replace avatar images as needed
3. No code changes required for content updates

### Styling Modifications

- Card dimensions: Adjust in `BaseballCard.tsx`
- Colors: Update in component or extend design system
- Animations: Modify CSS transforms and transitions

---

**Documentation Complete** ✅
*This implementation successfully creates an engaging, professional team showcase that aligns with MH Construction's brand identity while providing an interactive user experience.*
