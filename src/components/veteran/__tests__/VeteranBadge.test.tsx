/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import VeteranBadge from '../VeteranBadge'
import { VeteranStatus } from '@/lib/recommendations/SmartRecommendationEngine'

const mockVeteranStatus: VeteranStatus = {
  branch: 'Army',
  combatVeteran: true,
  disabilityRating: 30,
  serviceEra: '2001-Present',
  activeDuty: false,
  dischargeBBStatus: 'Honorable',
}

describe('VeteranBadge', () => {
  it('renders veteran badge with correct branch', () => {
    render(<VeteranBadge veteranStatus={mockVeteranStatus} />)

    expect(screen.getByTitle(/Army Veteran/)).toBeInTheDocument()
  })

  it('shows combat veteran star icon for combat veterans', () => {
    render(<VeteranBadge veteranStatus={mockVeteranStatus} />)

    const badge = screen.getByTitle(/Combat Veteran/)
    expect(badge).toBeInTheDocument()
  })

  it('displays disability rating when present', () => {
    render(
      <VeteranBadge veteranStatus={mockVeteranStatus} showDetails={true} />
    )

    expect(screen.getByText('30% Service-Connected')).toBeInTheDocument()
  })

  it('applies correct color for different branches', () => {
    const { rerender } = render(
      <VeteranBadge veteranStatus={mockVeteranStatus} />
    )

    // Army should have green color
    expect(screen.getByTitle(/Army Veteran/).closest('div')).toHaveClass(
      'text-green-600'
    )

    // Test Navy
    const navyStatus = { ...mockVeteranStatus, branch: 'Navy' as const }
    rerender(<VeteranBadge veteranStatus={navyStatus} />)
    expect(screen.getByTitle(/Navy Veteran/).closest('div')).toHaveClass(
      'text-blue-600'
    )
  })

  it('shows details when showDetails prop is true', () => {
    render(
      <VeteranBadge veteranStatus={mockVeteranStatus} showDetails={true} />
    )

    expect(screen.getByText('Army Veteran')).toBeInTheDocument()
    expect(screen.getByText('Combat')).toBeInTheDocument()
  })

  it('hides details when showDetails prop is false', () => {
    render(
      <VeteranBadge veteranStatus={mockVeteranStatus} showDetails={false} />
    )

    expect(screen.queryByText('Army Veteran')).not.toBeInTheDocument()
    expect(screen.queryByText('Combat')).not.toBeInTheDocument()
  })

  it('handles different sizes correctly', () => {
    const { rerender } = render(
      <VeteranBadge veteranStatus={mockVeteranStatus} size="sm" />
    )

    let icon = screen.getByTitle(/Army Veteran/).querySelector('svg')
    expect(icon).toHaveClass('h-5 w-5')

    rerender(<VeteranBadge veteranStatus={mockVeteranStatus} size="lg" />)
    icon = screen.getByTitle(/Army Veteran/).querySelector('svg')
    expect(icon).toHaveClass('h-8 w-8')
  })

  it('shows award icon for veterans with disability rating', () => {
    const disabledVetStatus = {
      ...mockVeteranStatus,
      combatVeteran: false,
      disabilityRating: 20,
    }

    render(<VeteranBadge veteranStatus={disabledVetStatus} />)

    expect(screen.getByTitle(/20% Service-Connected/)).toBeInTheDocument()
  })

  it('shows shield icon for non-combat veterans without disability', () => {
    const standardVetStatus = {
      ...mockVeteranStatus,
      combatVeteran: false,
      disabilityRating: 0,
    }

    render(<VeteranBadge veteranStatus={standardVetStatus} />)

    expect(screen.getByTitle(/Army Veteran/)).toBeInTheDocument()
  })
})
