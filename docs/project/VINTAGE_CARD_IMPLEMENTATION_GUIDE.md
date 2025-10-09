# Vintage Baseball Card - Implementation Guide

**Project**: MH Construction Vintage Baseball Cards
**Type**: Technical Implementation Document
**Phase**: Development Ready
**Date**: October 2025

---

## 🚀 Implementation Roadmap

This document provides specific code examples and step-by-step implementation  
instructions for transforming the current baseball cards into authentic  
vintage-style trading cards.

### Key Changes Required

1. **Component restructure** for vintage proportions and layout
2. **Enhanced data model** with vintage-specific fields
3. **Typography system** using period-appropriate fonts
4. **Color palette** based on vintage card themes
5. **Enhanced flip animation** with authentic feel

---

## 📝 Step 1: Update Component Structure

### New VintageBaseballCard Component

```tsx
'use client'

import React, { useState } from 'react'
import { MaterialIcon } from '../icons/MaterialIcon'

// Enhanced type definition
interface VintageTeamMember {
  // Core fields
  name: string
  role: string
  department: string

  // Vintage-specific fields
  cardNumber: number
  position: string
  yearsWithCompany: number
  height?: string
  hometown?: string
  education?: string

  // Stats
  currentYearStats: {
    projectsCompleted: number
    clientSatisfaction: number
    safetyRecord: string
    teamCollaborations: number
  }

  careerStats: {
    totalProjects: number
    yearsExperience: number
    specialtyAreas: number
    mentorships: number
  }

  // Content
  bio: string
  careerHighlights: string[]
  funFact?: string

  // Optional fields
  avatar?: string
  veteranStatus?: string
  active: boolean
  slug: string
}

interface VintageBaseballCardProps {
  member: VintageTeamMember
}

export function VintageBaseballCard({ member }: VintageBaseballCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Get department color scheme
  const getCardColors = (department: string) => {
    const colorMap = {
      'Executive Leadership': {
        primary: '#8B0000',
        rgb: '139, 0, 0',
        name: 'EXECUTIVE RED'
      },
      'Project Management & Estimating': {
        primary: '#1e3a8a',
        rgb: '30, 58, 138',
        name: 'PROJECT BLUE'
      },
      'Site & Field Operations': {
        primary: '#166534',
        rgb: '22, 101, 52',
        name: 'FIELD GREEN'
      },
      'Administration & Support': {
        primary: '#7c2d12',
        rgb: '124, 45, 18',
        name: 'ADMIN ORANGE'
      }
    }

    return colorMap[department] || colorMap['Administration & Support']
  }

  const cardColors = getCardColors(member.department)
  const isMascot = member.name === 'Trigger'

  // Mascot gets special golden theme
  const finalColors = isMascot ?
    { primary: '#a16207', rgb: '161, 98, 7', name: 'MASCOT GOLD' } :
    cardColors

  return (
    <div className="vintage-card-container">
      <div
        className="vintage-card-inner"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          '--card-color': finalColors.primary,
          '--card-color-rgb': finalColors.rgb
        } as React.CSSProperties}
      >
        {/* FRONT SIDE */}
        <div className={`vintage-card-face vintage-card-front ${isFlipped ? 'flipped' : ''}`}>
          {/* Outer aged border */}
          <div className="vintage-outer-border">
            {/* Color frame */}
            <div className="vintage-color-frame">

              {/* Card number badge */}
              <div className="vintage-card-number">
                {member.cardNumber}
              </div>

              {/* Company logo */}
              <div className="vintage-company-logo">
                <img src="/images/logo/mh-logo.png" alt="MH" />
              </div>

              {/* Photo container */}
              <div className="vintage-photo-container">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="vintage-player-image"
                  />
                ) : (
                  <div className="vintage-photo-placeholder">
                    <MaterialIcon icon="person" size="4xl" />
                  </div>
                )}
              </div>

              {/* Text overlay */}
              <div className="vintage-text-overlay">
                <div className="vintage-player-name">
                  {member.name}
                </div>
                <div className="vintage-team-role">
                  {member.position} • MH CONSTRUCTION
                </div>
              </div>

              {/* Set identifier */}
              <div className="vintage-set-id">
                2025 MH CONSTRUCTION
              </div>

              {/* Flip indicator */}
              <div className="vintage-flip-indicator">
                Click to flip
              </div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className={`vintage-card-face vintage-card-back ${isFlipped ? 'flipped' : ''}`}>
          <div className="vintage-back-content">

            {/* Header with card number and name */}
            <div className="vintage-back-header">
              <div className="vintage-card-number-back">
                #{member.cardNumber}
              </div>
              <div className="vintage-player-name-back">
                {member.name}
              </div>

              {/* Player vitals */}
              <div className="vintage-player-vitals">
                <div className="vital-row">
                  <span className="vital-label">Position:</span>
                  <span className="vital-value">{member.position}</span>
                </div>
                <div className="vital-row">
                  <span className="vital-label">Department:</span>
                  <span className="vital-value">{member.department}</span>
                </div>
                <div className="vital-row">
                  <span className="vital-label">Years w/ MH:</span>
                  <span className="vital-value">{member.yearsWithCompany}</span>
                </div>
                {member.hometown && (
                  <div className="vital-row">
                    <span className="vital-label">Hometown:</span>
                    <span className="vital-value">{member.hometown}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Statistics section */}
            <div className="vintage-stats-section">
              <div className="vintage-stats-title">
                PROFESSIONAL STATISTICS
              </div>

              <table className="vintage-stats-table">
                <thead>
                  <tr>
                    <th>YEAR</th>
                    <th>PROJ</th>
                    <th>SAT</th>
                    <th>SAFE</th>
                    <th>TEAM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="current-year">
                    <td>2025</td>
                    <td>{member.currentYearStats.projectsCompleted}</td>
                    <td>{member.currentYearStats.clientSatisfaction}%</td>
                    <td>{member.currentYearStats.safetyRecord}</td>
                    <td>{member.currentYearStats.teamCollaborations}</td>
                  </tr>
                  <tr>
                    <td>CAREER</td>
                    <td>{member.careerStats.totalProjects}</td>
                    <td>--</td>
                    <td>EXCELLENT</td>
                    <td>--</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Biography section */}
            <div className="vintage-bio-section">
              <div className="vintage-bio-title">CAREER HIGHLIGHTS</div>
              <div className="vintage-bio-text">
                {member.bio}
              </div>

              {member.careerHighlights.length > 0 && (
                <div className="vintage-highlights">
                  {member.careerHighlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      • {highlight}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Fun fact */}
            {member.funFact && (
              <div className="vintage-fun-fact">
                <strong>Did you know?</strong> {member.funFact}
              </div>
            )}

            {/* Footer */}
            <div className="vintage-card-footer">
              <div className="vintage-copyright">
                © 2025 MH CONSTRUCTION • PRINTED IN U.S.A.
              </div>
              <div className="vintage-logo-small">
                <img src="/images/logo/mh-logo.png" alt="MH" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
```text

---

## 🎨 Step 2: CSS Styling System

### Create vintage-baseball-card.css

```css
/* ===== VINTAGE BASEBALL CARD STYLES ===== */

/* Container and base structure */
.vintage-card-container {
  /* Standard vintage proportions - 5:7 aspect ratio */
  width: 280px;
  height: 392px;
  perspective: 1000px;
  cursor: pointer;
  margin: 0 auto;

  /* Vintage card handling feel */
  transition: all 0.3s ease;
  transform-style: preserve-3d;
}

.vintage-card-container:hover {
  transform: translateY(-3px);
  box-shadow:
    0 12px 25px rgba(0,0,0,0.15),
    0 0 0 2px rgba(255,255,255,0.9);
}

/* 3D flip mechanism */
.vintage-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
}

.vintage-card-inner.flipped {
  transform: rotateY(180deg);
}

/* Card face base */
.vintage-card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  overflow: hidden;
}

.vintage-card-back {
  transform: rotateY(180deg);
}

/* ===== FRONT SIDE STYLING ===== */

.vintage-outer-border {
  width: 100%;
  height: 100%;

  /* Aged white frame */
  border: 4px solid #f8f6f0;
  border-radius: 8px;

  /* Vintage aging effects */
  box-shadow:
    0 0 0 1px #e8e4dc,
    3px 3px 12px rgba(0,0,0,0.25),
    inset 0 0 30px rgba(0,0,0,0.05);

  /* Subtle paper texture */
  background-image:
    radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 60%),
    linear-gradient(45deg, transparent 25%, rgba(0,0,0,0.02) 25%, rgba(0,0,0,0.02) 50%, transparent 50%);
  background-size: 60px 60px, 12px 12px;
}

.vintage-color-frame {
  width: 100%;
  height: 100%;
  background: var(--card-color);
  border: 6px solid var(--card-color);
  border-radius: 4px;
  position: relative;

  /* Subtle color variations */
  background-image:
    radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
    linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.05) 100%);
}

/* Card number badge */
.vintage-card-number {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;

  background: #ffffff;
  border: 2px solid var(--card-color);
  border-radius: 50%;
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--card-color);

  box-shadow:
    0 3px 6px rgba(0,0,0,0.2),
    inset 0 1px 2px rgba(255,255,255,0.8);
}

/* Company logo */
.vintage-company-logo {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 28px;
  height: 28px;
  z-index: 8;
}

.vintage-company-logo img {
  width: 100%;
  height: 100%;
  filter: brightness(0) invert(1);
  opacity: 0.9;
  mix-blend-mode: screen;
}

/* Photo container */
.vintage-photo-container {
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  height: 240px;
  z-index: 5;

  background: #ffffff;
  border: 3px solid #e8e4dc;
  border-radius: 2px;

  /* Photo frame shadow */
  box-shadow:
    inset 0 0 15px rgba(0,0,0,0.1),
    0 2px 8px rgba(0,0,0,0.15);
}

.vintage-player-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;

  /* Vintage photo treatment */
  filter:
    contrast(1.15)
    saturate(1.1)
    sepia(0.08)
    brightness(1.02);

  /* Subtle halftone effect */
  background-image:
    radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px);
  background-size: 4px 4px;
  background-blend-mode: overlay;
}

.vintage-photo-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f2f0eb 0%, #e6e2d8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0a0a0;
}

/* Text overlay */
.vintage-text-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;

  background: linear-gradient(
    to top,
    rgba(0,0,0,0.8) 0%,
    rgba(0,0,0,0.4) 70%,
    transparent 100%
  );

  padding: 20px 20px 25px 20px;
}

.vintage-player-name {
  font-family: 'Times New Roman', serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 6px;

  text-shadow:
    2px 2px 4px rgba(0,0,0,0.9),
    1px 1px 2px rgba(0,0,0,0.7);

  /* Handle long names */
  hyphens: auto;
  word-wrap: break-word;
}

.vintage-team-role {
  font-family: 'Times New Roman', serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: #ffffff;
  text-align: center;

  text-shadow:
    1px 1px 3px rgba(0,0,0,0.9),
    1px 1px 1px rgba(0,0,0,0.7);
}

/* Set identifier */
.vintage-set-id {
  position: absolute;
  bottom: 8px;
  left: 20px;
  z-index: 6;

  font-family: 'Arial', sans-serif;
  font-size: 8px;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  text-transform: uppercase;
  letter-spacing: 0.5px;

  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
}

/* Flip indicator */
.vintage-flip-indicator {
  position: absolute;
  bottom: 8px;
  right: 12px;
  z-index: 6;

  font-family: 'Arial', sans-serif;
  font-size: 8px;
  font-style: italic;
  color: rgba(255,255,255,0.7);

  text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
  pointer-events: none;
}

/* ===== BACK SIDE STYLING ===== */

.vintage-card-back {
  background: #f6f4e8;

  /* Vintage cardstock texture */
  background-image:
    radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%),
    linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.06) 25%, rgba(255,255,255,0.06) 26%, transparent 27%),
    radial-gradient(circle at 70% 70%, rgba(139,69,19,0.02) 0%, transparent 50%);
  background-size: 80px 80px, 6px 6px, 40px 40px;
}

.vintage-back-content {
  height: 100%;
  padding: 18px;
  font-family: 'Times New Roman', serif;
  color: #2c2c2c;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

/* Header section */
.vintage-back-header {
  border-bottom: 1px solid #d0c4a8;
  padding-bottom: 8px;
  margin-bottom: 12px;
}

.vintage-card-number-back {
  float: right;
  background: var(--card-color);
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 4px;
  font-family: 'Arial', sans-serif;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 8px;

  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.vintage-player-name-back {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 8px;
  letter-spacing: 0.6px;
  clear: both;
}

.vintage-player-vitals {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px 8px;
  font-size: 10px;
  line-height: 1.4;
}

.vital-row {
  display: flex;
  justify-content: space-between;
}

.vital-label {
  font-weight: 600;
  text-transform: uppercase;
  color: #555;
}

.vital-value {
  font-weight: 400;
  color: #333;
}

/* Statistics section */
.vintage-stats-section {
  border-top: 1px solid #d0c4a8;
  border-bottom: 1px solid #d0c4a8;
  padding: 10px 0;
  margin: 8px 0;
}

.vintage-stats-title {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 8px;
  letter-spacing: 0.8px;
  color: #555;
}

.vintage-stats-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 9px;
  line-height: 1.2;
}

.vintage-stats-table th {
  background: rgba(139, 69, 19, 0.08);
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 2px;
  border: 1px solid #d0c4a8;
  text-align: center;
  font-size: 8px;
  letter-spacing: 0.3px;
}

.vintage-stats-table td {
  padding: 4px 2px;
  border: 1px solid #d0c4a8;
  text-align: center;
  font-weight: 400;
}

.current-year {
  background: rgba(var(--card-color-rgb), 0.08);
  font-weight: 600;
}

/* Biography section */
.vintage-bio-section {
  flex-grow: 1;
  margin: 8px 0;
}

.vintage-bio-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 6px;
  letter-spacing: 0.6px;
  color: #555;
}

.vintage-bio-text {
  font-size: 9px;
  line-height: 1.5;
  text-align: justify;
  text-justify: inter-word;
  hyphens: auto;
  margin-bottom: 6px;

  /* Classic indented paragraph */
  text-indent: 12px;
}

.vintage-highlights {
  font-size: 8px;
  line-height: 1.4;
  margin-top: 4px;
}

.highlight-item {
  margin-bottom: 2px;
  color: #444;
}

/* Fun fact */
.vintage-fun-fact {
  font-size: 8px;
  font-style: italic;
  color: #666;
  text-align: center;
  margin: 6px 0;
  padding: 6px;
  background: rgba(255,255,255,0.4);
  border-radius: 3px;
  border: 1px solid rgba(139, 69, 19, 0.1);
}

/* Footer */
.vintage-card-footer {
  border-top: 1px solid #d0c4a8;
  padding-top: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vintage-copyright {
  font-size: 7px;
  font-weight: 500;
  color: #777;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.vintage-logo-small {
  width: 16px;
  height: 16px;
  opacity: 0.5;
}

.vintage-logo-small img {
  width: 100%;
  height: 100%;
  filter: sepia(1) hue-rotate(30deg) saturate(0.8);
}

/* ===== RESPONSIVE DESIGN ===== */

@media (max-width: 768px) {
  .vintage-card-container {
    width: 240px;
    height: 336px;
  }

  .vintage-player-name {
    font-size: 16px;
  }

  .vintage-team-role {
    font-size: 10px;
  }

  .vintage-photo-container {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .vintage-card-container {
    width: 200px;
    height: 280px;
  }

  .vintage-player-name {
    font-size: 14px;
  }

  .vintage-photo-container {
    height: 160px;
  }

  .vintage-stats-table {
    font-size: 8px;
  }
}

/* ===== ACCESSIBILITY ===== */

@media (prefers-reduced-motion: reduce) {
  .vintage-card-inner {
    transition: none;
  }

  .vintage-card-container:hover {
    transform: none;
  }
}

@media (prefers-contrast: high) {
  .vintage-color-frame {
    border: 4px solid currentColor;
  }

  .vintage-player-name {
    background: rgba(0,0,0,0.9);
    padding: 4px 8px;
    border-radius: 2px;
  }
}
```text

---

## 📊 Step 3: Enhanced Data Structure

### Update team data type definition

```typescript
// /src/lib/data/team.ts

export interface VintageTeamMember {
  // Core identification
  name: string
  role: string
  department: string
  cardNumber: number
  position: string // Simplified role for card

  // Personal details
  yearsWithCompany: number
  height?: string
  hometown?: string
  education?: string

  // Current year performance
  currentYearStats: {
    projectsCompleted: number
    clientSatisfaction: number
    safetyRecord: string
    teamCollaborations: number
  }

  // Career totals
  careerStats: {
    totalProjects: number
    yearsExperience: number
    specialtyAreas: number
    mentorships: number
  }

  // Content
  bio: string
  careerHighlights: string[]
  funFact?: string

  // Existing fields
  specialties: string[]
  avatar?: string
  veteranStatus?: string
  active: boolean
  slug: string
}

// Example updated team member
export const vintageTeamMembers: VintageTeamMember[] = [
  {
    name: "Jeremy Thamert",
    role: "Owner & General Manager",
    department: "Executive Leadership",
    cardNumber: 1,
    position: "General Manager",

    yearsWithCompany: 2,
    hometown: "Tri-Cities, WA",
    education: "Business Management",

    currentYearStats: {
      projectsCompleted: 45,
      clientSatisfaction: 98,
      safetyRecord: "EXCELLENT",
      teamCollaborations: 25
    },

    careerStats: {
      totalProjects: 85,
      yearsExperience: 2,
      specialtyAreas: 5,
      mentorships: 8
    },

    bio: "Jeremy brings innovative leadership to MH Construction, focusing on technology integration and strategic growth. His vision drives the company's commitment to excellence in construction services.",

    careerHighlights: [
      "Led digital transformation initiative",
      "Expanded service territories",
      "Implemented AI-powered project management",
      "Achieved 98% client satisfaction rating"
    ],

    funFact: "Jeremy was the first construction company owner in the region to implement AI-powered estimating tools.",

    specialties: ["Strategic Vision", "Technology Integration", "Business Development"],
    avatar: "/images/team/jeremy-thamert.jpg",
    veteranStatus: "Civilian Supporter",
    active: true,
    slug: "jeremy-thamert"
  },

  // Add more team members with vintage data...
]
```text

---

## 🔧 Step 4: Integration Updates

### Update team page to use vintage cards

```tsx
// /src/app/team/page.tsx

import { VintageBaseballCard } from '../../components/ui/VintageBaseballCard'
import { vintageTeamMembers } from '../../lib/data/team'

export default function TeamPage() {
  // Group by department
  const membersByDepartment = groupByDepartment(vintageTeamMembers)

  return (
    <div className="bg-gray-50 min-h-screen">
      <PageHero
        title="Our Team"
        subtitle="Meet the professionals behind MH Construction"
        description="Click on any team member card to flip it and discover their career highlights, professional statistics, and background story."
      />

      <div className="bg-gray-50 py-16">
        <div className="mx-auto px-4 max-w-7xl">
          {/* Vintage-themed introduction */}
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-bold text-gray-900 text-4xl">
              Professional Team Cards
            </h2>
            <p className="mx-auto max-w-3xl text-gray-600 text-lg leading-relaxed">
              Discover our team through authentic vintage-style trading cards.
              Each card features professional statistics, career highlights, and
              the unique story of the dedicated individuals who make MH Construction
              a leader in Pacific Northwest construction.
            </p>
          </div>

          {/* Department sections with vintage styling */}
          <div className="space-y-24">
            {departmentOrder.map((department) => {
              const members = membersByDepartment[department]
              if (!members || members.length === 0) return null

              return (
                <FadeInWhenVisible key={department}>
                  <div className="relative">
                    {/* Vintage-styled department header */}
                    <div className="mb-16 text-center">
                      <div className="inline-block bg-gradient-to-r from-amber-800 to-amber-600 mb-6 px-12 py-4 rounded-lg shadow-lg">
                        <h3 className="font-black text-white text-2xl uppercase tracking-wider">
                          {department}
                        </h3>
                      </div>
                      <div className="bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto rounded-full w-48 h-1"></div>
                    </div>

                    {/* Vintage cards grid */}
                    <div className="justify-items-center gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {members.map((member, index) => (
                        <div key={member.cardNumber} className="hover:scale-[1.02] transition-transform duration-300 transform">
                          <VintageBaseballCard member={member} />
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInWhenVisible>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
```text

---

## 📚 Step 5: Documentation Updates

### Update existing documentation

1. **Update BASEBALL_CARD_TEAM_IMPLEMENTATION.md** with vintage specifications
2. **Update DESIGN_SYSTEM.md** with vintage color palette and typography
3. **Update BASEBALL_CARD_USAGE_GUIDE.md** with new data fields and examples

### Key documentation changes needed

- New vintage proportions (5:7 aspect ratio)
- Enhanced data structure with statistics and highlights
- Vintage color palette by department
- Typography system using Times New Roman and Arial
- Professional statistics tracking system
- Card numbering system implementation

---

## 🎯 Implementation Timeline

### Week 1: Core Structure

- [ ] Create VintageBaseballCard component
- [ ] Implement basic 5:7 aspect ratio layout
- [ ] Add vintage border and frame system
- [ ] Set up department color schemes

### Week 2: Content & Data

- [ ] Expand team member data structure
- [ ] Implement statistics tables
- [ ] Add career highlights system
- [ ] Create card numbering logic

### Week 3: Visual Polish

- [ ] Add vintage textures and aging effects
- [ ] Implement typography system
- [ ] Enhance flip animations
- [ ] Add responsive breakpoints

### Week 4: Testing & Refinement

- [ ] Cross-device testing
- [ ] Accessibility improvements
- [ ] Performance optimization
- [ ] Documentation updates

---

**Implementation Status**: Ready for Development
**Estimated Effort**: 3-4 weeks
**Priority**: High
**Dependencies**: Design approval, content gathering for enhanced team data
