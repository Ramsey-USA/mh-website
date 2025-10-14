'use client'

import React from 'react'
import { MaterialIcon } from '../icons/MaterialIcon'
import { VeteranStatus } from '@/lib/recommendations/SmartRecommendationEngine'

interface VeteranBadgeProps {
  veteranStatus: VeteranStatus
  size?: 'sm' | 'md' | 'lg'
  showDetails?: boolean
}

export default function VeteranBadge({
  veteranStatus,
  size = 'md',
  showDetails = false,
}: VeteranBadgeProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-5 w-5 text-xs'
      case 'lg':
        return 'h-8 w-8 text-lg'
      default:
        return 'h-6 w-6 text-sm'
    }
  }

  const getBranchColor = () => {
    switch (veteranStatus.branch.toLowerCase()) {
      case 'army':
        return 'text-green-600 border-green-600'
      case 'navy':
        return 'text-blue-600 border-blue-600'
      case 'air force':
        return 'text-sky-600 border-sky-600'
      case 'marines':
        return 'text-red-600 border-red-600'
      case 'coast guard':
        return 'text-orange-600 border-orange-600'
      case 'space force':
        return 'text-purple-600 border-purple-600'
      default:
        return 'text-slate-600 border-slate-600'
    }
  }

  const getIcon = () => {
    const iconSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'

    if (veteranStatus.combatVeteran) {
      return <MaterialIcon icon="military_tech" size={iconSize} />
    }
    if (veteranStatus.disabilityRating && veteranStatus.disabilityRating > 0) {
      return <MaterialIcon icon="workspace_premium" size={iconSize} />
    }
    return <MaterialIcon icon="security" size={iconSize} />
  }

  const getBadgeTitle = () => {
    const parts = []
    parts.push(`${veteranStatus.branch} Veteran`)
    if (veteranStatus.combatVeteran) parts.push('Combat Veteran')
    if (veteranStatus.disabilityRating && veteranStatus.disabilityRating > 0) {
      parts.push(`${veteranStatus.disabilityRating}% Service-Connected`)
    }
    return parts.join(' • ')
  }

  return (
    <div className="flex items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-full border-2 ${getBranchColor()} bg-white`}
        title={getBadgeTitle()}
      >
        {getIcon()}
      </div>

      {showDetails && (
        <div className="flex flex-col">
          <span className={`font-semibold ${getBranchColor().split(' ')[0]}`}>
            {veteranStatus.branch} Veteran
          </span>
          <div className="flex gap-2 text-slate-600 text-xs">
            {veteranStatus.combatVeteran && (
              <span className="flex items-center gap-1">
                <MaterialIcon icon="military_tech" size="sm" />
                Combat
              </span>
            )}
            {veteranStatus.disabilityRating &&
              veteranStatus.disabilityRating > 0 && (
                <span className="flex items-center gap-1">
                  <MaterialIcon icon="workspace_premium" size="sm" />
                  {veteranStatus.disabilityRating}% Service-Connected
                </span>
              )}
          </div>
        </div>
      )}
    </div>
  )
}
