'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { MaterialIcon } from '../icons/MaterialIcon'

// Enhanced interface for vintage baseball cards
export interface VintageTeamMember {
  // Basic identification
  name: string
  role: string
  department: string
  cardNumber: number
  position: string // Simplified role for card display
  nickname?: string // Baseball-style nickname

  // Personal details
  yearsWithCompany: number
  height?: string
  hometown?: string
  education?: string
  veteranStatus?: string

  // Current year performance (2025)
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

  // Military/Professional awards
  awards?: string

  // Content
  bio: string
  careerHighlights: string[]
  funFact?: string
  certifications?: string
  hobbies?: string
  specialInterests?: string
  avatar?: string

  // Additional fields from data
  specialties: string[]
  active: boolean
  slug: string
}

interface VintageBaseballCardProps {
  member: VintageTeamMember
}

export function VintageBaseballCard({ member }: VintageBaseballCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  // Helper function to split name into first and last
  const formatNameForCard = (fullName: string) => {
    const nameParts = fullName.trim().split(' ')
    if (nameParts.length >= 2) {
      const firstName = nameParts[0]
      const lastName = nameParts.slice(1).join(' ')
      return { firstName, lastName }
    }
    return { firstName: fullName, lastName: '' }
  }

  // Get department-specific colors - monochrome style
  const getCardColors = (department: string) => {
    const colorMap = {
      'Executive Leadership': {
        primary: '#1f2937',
        secondary: '#4b5563',
        rgb: '31, 41, 55',
      },
      'Project Management & Estimating': {
        primary: '#374151',
        secondary: '#6b7280',
        rgb: '55, 65, 81',
      },
      'Site & Field Operations': {
        primary: '#4b5563',
        secondary: '#9ca3af',
        rgb: '75, 85, 99',
      },
      'Administration & Support': {
        primary: '#6b7280',
        secondary: '#d1d5db',
        rgb: '107, 114, 128',
      },
    }

    return (
      colorMap[department as keyof typeof colorMap] || {
        primary: '#374151',
        secondary: '#6b7280',
        rgb: '55, 65, 81',
      }
    )
  }

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('project')) return 'engineering'
    if (role.toLowerCase().includes('estimat')) return 'calculate'
    if (role.toLowerCase().includes('superintend')) return 'construction'
    if (role.toLowerCase().includes('foreman')) return 'build'
    if (role.toLowerCase().includes('safety')) return 'security'
    if (
      role.toLowerCase().includes('ceo') ||
      role.toLowerCase().includes('president')
    )
      return 'business'
    if (role.toLowerCase().includes('admin')) return 'admin_panel_settings'
    if (role.toLowerCase().includes('sales')) return 'handshake'
    return 'person'
  }

  const finalColors = getCardColors(member.department)
  const { firstName, lastName } = formatNameForCard(member.name)

  return (
    <div className="vintage-card-container">
      <div
        className={`vintage-card-inner ${isFlipped ? 'flipped' : ''}`}
        onClick={() => setIsFlipped(!isFlipped)}
        style={
          {
            '--card-color': finalColors.primary,
            '--card-color-rgb': finalColors.rgb,
          } as React.CSSProperties
        }
      >
        {/* FRONT SIDE */}
        <div className="vintage-card-face vintage-card-front">
          {/* Outer aged border */}
          <div className="vintage-outer-border">
            {/* Color frame */}
            <div className="vintage-color-frame">
              {/* Card number badge */}
              <div className="vintage-card-number">
                {member.name === 'Mike Holstein'
                  ? 'RET'
                  : member.cardNumber === 0
                  ? '00'
                  : member.cardNumber}
              </div>

              {/* Company logo */}
              <div className="vintage-company-logo">
                <Image
                  src="/images/logo/mh-logo.png"
                  alt="MH Construction Logo"
                  width={32}
                  height={32}
                  className="company-logo-image"
                />
              </div>

              {/* Veteran status badge */}
              {member.veteranStatus &&
                (member.veteranStatus.includes('Veteran') ||
                  member.veteranStatus.includes('Good Boy')) && (
                  <div
                    className={`vintage-veteran-badge ${
                      member.veteranStatus.includes('Veteran')
                        ? 'veteran'
                        : 'mascot'
                    }`}
                  >
                    {member.veteranStatus.includes('Veteran') ? 'VET' : '🐕'}
                  </div>
                )}

              {/* Photo container */}
              <div className="vintage-photo-container">
                {member.avatar ? (
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="vintage-player-image"
                    sizes="200px"
                  />
                ) : (
                  <div className="vintage-photo-placeholder">
                    <MaterialIcon icon={getRoleIcon(member.role)} size="4xl" />
                  </div>
                )}
              </div>

              {/* Text overlay */}
              <div className="vintage-text-overlay">
                <div className="vintage-player-name">{member.name}</div>
                <div className="vintage-team-role">{member.position}</div>
              </div>

              {/* Set identifier */}
              <div className="vintage-set-id">2025 SERIES</div>

              {/* Flip indicator */}
              <div className="vintage-flip-indicator">Click to flip</div>
            </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div className="vintage-card-face vintage-card-back">
          <div className="vintage-back-content">
            {/* Header with name and card number with logo */}
            <div className="vintage-back-header">
              <div className="vintage-player-name-back">
                <div className="name-first">{firstName}</div>
                {lastName && <div className="name-last">{lastName}</div>}
              </div>

              <div className="vintage-card-number-with-logo">
                <div className="vintage-mh-logo-small">
                  <Image
                    src="/images/logo/mh-logo.png"
                    alt="MH Construction Logo"
                    width={24}
                    height={24}
                    className="mh-logo-image"
                  />
                </div>
                <div className="vintage-card-number-back">
                  {member.name === 'Mike Holstein'
                    ? 'RET'
                    : member.cardNumber === 0
                    ? '00'
                    : member.cardNumber}
                </div>
              </div>
            </div>
            {/* About section */}
            <div className="vintage-about-section">
              <div className="vintage-about-container">
                {/* Background photo */}
                <div
                  className="vintage-about-photo"
                  style={{
                    backgroundImage: member.avatar
                      ? `url(${member.avatar})`
                      : undefined,
                  }}
                />

                {/* About content with overlay */}
                <div className="vintage-about-content">
                  {/* Nickname if available */}
                  {member.nickname && (
                    <div className="about-item">
                      <span className="about-label">Nick:</span>
                      <span className="about-value">"{member.nickname}"</span>
                    </div>
                  )}

                  {/* Core role information */}
                  <div className="about-item">
                    <span className="about-label">Pos:</span>
                    <span className="about-value">{member.position}</span>
                  </div>
                  <div className="about-item">
                    <span className="about-label">Dept:</span>
                    <span className="about-value">{member.department}</span>
                  </div>

                  {/* Experience metrics */}
                  <div className="about-item">
                    <span className="about-label">Years:</span>
                    <span className="about-value">
                      {member.yearsWithCompany} at MH,{' '}
                      {member.careerStats.yearsExperience} total
                    </span>
                  </div>
                  <div className="about-item">
                    <span className="about-label">Proj:</span>
                    <span className="about-value">
                      {member.careerStats.totalProjects}+ completed
                    </span>
                  </div>

                  {/* Awards if available */}
                  {member.awards && (
                    <div className="about-item">
                      <span className="about-label">Awards:</span>
                      <span className="about-value">{member.awards}</span>
                    </div>
                  )}

                  {/* Certifications and skills */}
                  <div className="about-item">
                    <span className="about-label">Certs:</span>
                    <span className="about-value">
                      {member.certifications ||
                        'Various construction certifications'}
                    </span>
                  </div>

                  {/* Personal background */}
                  {member.hometown && (
                    <div className="about-item">
                      <span className="about-label">Home:</span>
                      <span className="about-value">{member.hometown}</span>
                    </div>
                  )}
                  {member.education && (
                    <div className="about-item">
                      <span className="about-label">Edu:</span>
                      <span className="about-value">{member.education}</span>
                    </div>
                  )}
                  {member.veteranStatus &&
                    member.veteranStatus !== 'Civilian' && (
                      <div className="about-item">
                        <span className="about-label">Svc:</span>
                        <span className="about-value">
                          {member.veteranStatus}
                        </span>
                      </div>
                    )}

                  {/* Interests */}
                  <div className="about-item">
                    <span className="about-label">Hobbies:</span>
                    <span className="about-value">
                      {member.hobbies || 'Construction and building'}
                    </span>
                  </div>
                  <div className="about-item">
                    <span className="about-label">Focus:</span>
                    <span className="about-value">
                      {member.specialInterests ||
                        'Quality construction projects'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Quick highlights */}
            <div className="vintage-quick-highlights">
              {member.careerHighlights.length > 0 && (
                <div className="vintage-highlights">
                  {member.careerHighlights
                    .slice(0, 3)
                    .map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        {highlight}
                      </div>
                    ))}
                </div>
              )}
            </div>
            {/* Fun fact */}
            {member.funFact && (
              <div className="vintage-fun-fact">{member.funFact}</div>
            )}
            {/* Footer */}
            <div className="vintage-card-footer">
              <div className="vintage-copyright">© 2025 MH CONSTRUCTION</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
