# Baseball Card Team Page - Usage & Maintenance Guide

**Component**: Baseball Card Team Display
**Page**: `/team`
**Last Updated**: October 2025
**Maintainer**: MH Construction Development Team

---

## 📖 Quick Start Guide

The baseball card team page provides an interactive, engaging way to showcase MH  
Construction team members. This guide covers everything you need to know for using  
and maintaining the system.

### What Users See

- **Interactive Cards**: Team members displayed as professional baseball cards
- **Flip Animation**: Click any card to see detailed member information
- **Department Organization**: Team members grouped by their roles
- **Special Features**: Company mascot "Trigger" has unique styling
- **Responsive Design**: Works perfectly on all devices

---

## 👥 Adding New Team Members

### Step 1: Prepare Member Data

Create a new team member object in `/src/lib/data/team.ts`:

```typescript
{
  name: "John Smith",
  role: "Project Manager",
  department: "Project Management & Estimating",
  experienceYears: 8,
  specialties: ["Commercial Construction", "Project Planning", "Client Relations"],
  bio: "John brings 8 years of construction project management experience to MH Construction. He specializes in commercial projects and has successfully managed over 50 projects from conception to completion.",
  slug: "john-smith",
  active: true,
  avatar: "/images/team/john-smith.jpg",          // Optional
  veteranStatus: "Army Veteran"                   // Optional
}
```text

### Step 2: Add Member Photo (Optional)

1. Add high-quality photo to `/public/images/team/`
2. Use format: `firstname-lastname.jpg`
3. **Recommended specs**:
   - Square aspect ratio (1:1)
   - Minimum 256x256 pixels
   - Professional headshot
   - Good lighting and contrast

### Step 3: Deploy Changes

The page automatically updates with new team members. No additional code changes needed!

---

## ✏️ Editing Existing Members

### Updating Member Information

1. **Open team data file**: `/src/lib/data/team.ts`
2. **Find the member**: Locate by name or slug
3. **Update fields**: Modify any property (role, bio, specialties, etc.)
4. **Save changes**: File automatically rebuilds the page

### Changing Member Photos

1. **Replace image file** in `/public/images/team/`
2. **Keep same filename** or update `avatar` property
3. **Clear browser cache** to see new image immediately

### Common Updates

#### Updating Role or Department

```typescript
// Before
role: "Site Supervisor",
department: "Site & Field Operations",

// After
role: "Project Superintendent",
department: "Project Management & Estimating",
```text

#### Adding Specialties

```typescript
// Add new skills to existing array
specialties: [
  "Commercial Construction",
  "Project Planning",
  "Client Relations",
  "Safety Management"  // New specialty
]
```text

#### Updating Experience Years

```typescript
// Increment as time passes
experienceYears: 9  // Was 8, now 9
```text

---

## 🎨 Customizing Card Appearance

### Standard vs Mascot Styling

The system automatically applies special styling for "Trigger" the mascot:

```typescript
// Mascot detection (automatic)
const isMascot = member.name === 'Trigger'

// Mascot gets special amber/orange theme
// All other team members get standard brand colors
```text

### Veteran Status Badges

Add military service recognition:

```typescript
veteranStatus: "Army Veteran"        // Green badge with military icon
veteranStatus: "Navy Veteran"        // Blue badge with anchor icon
veteranStatus: "Air Force Veteran"   // Sky blue with flight icon
veteranStatus: "Marine Veteran"      // Red badge with shield icon
veteranStatus: "Coast Guard Veteran" // Cyan badge with waves icon
veteranStatus: "Civilian Supporter"  // Amber badge with handshake icon
veteranStatus: "Retired Leadership"  // Purple badge with premium icon
```text

### Department Organization

Team members are automatically grouped by department:

1. **Executive Leadership**
2. **Project Management & Estimating**
3. **Site & Field Operations**
4. **Administration & Support**

To change grouping, update the `department` field.

---

## 🔧 Technical Maintenance

### Component Structure

```text
Team Page Components:
├── /src/app/team/page.tsx           # Main team page layout
├── /src/components/ui/BaseballCard.tsx  # Individual card component
├── /src/lib/data/team.ts            # Team member data
└── /public/images/team/             # Member photos
```text

### Key Files to Monitor

#### 1. Team Data (`/src/lib/data/team.ts`)

- **Purpose**: Central repository for all team member information
- **Format**: TypeScript array of TeamMember objects
- **Updates**: Add, edit, or remove team members here

#### 2. Baseball Card Component (`/src/components/ui/BaseballCard.tsx`)

- **Purpose**: Renders individual team member cards
- **Customization**: Modify styling, animations, or layout
- **Maintenance**: Usually stable, update only for design changes

#### 3. Team Page (`/src/app/team/page.tsx`)

- **Purpose**: Page layout and team organization
- **Updates**: Modify department order or page structure
- **Mascot Logic**: Handles Trigger integration

### Performance Monitoring

#### Image Optimization

```bash
# Check image file sizes
ls -lh /public/images/team/

# Optimize large images if needed
# Target: Under 200KB per image
```text

#### Component Performance

- **Animation smoothness**: Test card flip animations on mobile devices
- **Loading speed**: Monitor page load times with multiple team members
- **Memory usage**: Check for image loading issues on slower connections

---

## 📱 Testing Checklist

### Cross-Device Testing

#### Desktop (1200px+)

- ✅ Cards display in 4-column grid
- ✅ Hover effects work smoothly
- ✅ Click-to-flip functions properly
- ✅ All images load correctly
- ✅ Text fits within card boundaries

#### Tablet (768px - 1199px)

- ✅ Cards display in 2-3 column grid
- ✅ Touch interactions work
- ✅ Cards maintain proper proportions
- ✅ Department headers remain visible

#### Mobile (< 768px)

- ✅ Single column layout
- ✅ Cards are properly sized
- ✅ Touch flip works reliably
- ✅ Text remains readable
- ✅ Scrolling is smooth

### Content Testing

#### New Team Member Checklist

- ✅ Name displays correctly
- ✅ Role and department are accurate
- ✅ Photo loads (or fallback icon appears)
- ✅ Bio text fits within card back
- ✅ Specialties display as tags
- ✅ Experience years show properly
- ✅ Veteran badge appears if applicable

#### Existing Member Updates

- ✅ Changed information reflects accurately
- ✅ New photos display correctly
- ✅ Updated roles appear in proper departments
- ✅ Specialty tags render properly

---

## 🚨 Troubleshooting

### Common Issues

#### 1. Team Member Not Appearing

**Problem**: New team member added but not showing on page

**Solutions**:

- Check team data file syntax for errors
- Verify member has `active: true` property
- Restart development server
- Clear browser cache

#### 2. Image Not Loading

**Problem**: Team member photo not displaying

**Solutions**:

- Verify image file exists in `/public/images/team/`
- Check filename matches `avatar` property exactly
- Ensure image file size is reasonable (< 1MB)
- Try different image format (JPG, PNG, WebP)

#### 3. Card Flip Not Working

**Problem**: Click-to-flip animation not functioning

**Solutions**:

- Check JavaScript console for errors
- Verify component state management
- Test on different browsers
- Check for CSS conflicts

#### 4. Layout Issues

**Problem**: Cards not aligning properly

**Solutions**:

- Verify all bio text lengths are reasonable
- Check for overly long specialty lists
- Test with different screen sizes
- Validate CSS grid implementation

### Debug Mode

For development troubleshooting, you can add temporary logging:

```typescript
// In BaseballCard.tsx
console.log('Rendering card for:', member.name)
console.log('Mascot status:', member.name === 'Trigger')
console.log('Veteran status:', member.veteranStatus)
```text

---

## 🎯 Best Practices

### Content Guidelines

#### Writing Effective Bios

- **Length**: Keep to 2-3 sentences (150-200 characters)
- **Focus**: Highlight experience and key strengths
- **Tone**: Professional but personable
- **Format**: Avoid bullet points or lists

#### Selecting Specialties

- **Limit**: 3-5 specialties maximum
- **Relevance**: Focus on job-relevant skills
- **Consistency**: Use similar terminology across team
- **Clarity**: Avoid jargon or overly technical terms

#### Professional Photos

- **Background**: Clean, neutral backgrounds preferred
- **Framing**: Head and shoulders, professional attire
- **Quality**: High resolution, good lighting
- **Consistency**: Similar style across all photos

### Technical Best Practices

#### Performance

- **Image sizes**: Optimize photos before uploading
- **Component updates**: Test changes on multiple devices
- **Animation performance**: Ensure smooth animations on mobile

#### Accessibility

- **Alt text**: Ensure images have descriptive alt attributes
- **Keyboard navigation**: Test card interactions with keyboard
- **Screen readers**: Verify content structure is logical
- **Color contrast**: Maintain readable text on all backgrounds

#### Maintenance

- **Regular updates**: Keep team information current
- **Backup**: Version control team data changes
- **Testing**: Test after any component modifications
- **Documentation**: Keep this guide updated with changes

---

## 📈 Future Enhancements

### Planned Improvements

#### Content Features

- **Project links**: Connect team members to specific projects
- **Testimonials**: Add client feedback for individual members
- **Certifications**: Display professional licenses and certifications
- **Social profiles**: Link to LinkedIn or professional profiles

#### Interactive Features

- **Search functionality**: Find team members by name or specialty
- **Filter options**: Sort by department, experience, or specialties
- **Enhanced animations**: More sophisticated card transitions
- **Mobile gestures**: Swipe gestures for mobile users

#### Technical Improvements

- **Dynamic data**: Connect to CMS for real-time updates
- **Image optimization**: Automatic image resizing and compression
- **Performance monitoring**: Track page load times and user interactions
- **Analytics integration**: Monitor which team members get most views

---

## 📞 Support & Contact

### For Content Updates

- **Team changes**: Contact HR or department heads
- **Photo updates**: Coordinate with marketing team
- **Bio updates**: Work directly with team members

### For Technical Issues

- **Development team**: Contact MH Construction web development team
- **Emergency fixes**: Use version control to revert problematic changes
- **New features**: Submit requests through proper channels

---

**Guide Complete** ✅
*This guide provides comprehensive information for maintaining and expanding the baseball card team page feature.*
