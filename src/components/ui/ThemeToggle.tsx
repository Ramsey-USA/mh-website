'use client'

import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import {
  WPZoomSunIcon as SunIcon,
  WPZoomMoonIcon as MoonIcon,
  WPZoomDesktopIcon as DesktopIcon,
} from '../icons/WPZoomIcons'

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
  compact?: boolean
}

export function ThemeToggle({
  size = 'md',
  showLabel = false,
  className = '',
  compact = false,
}: ThemeToggleProps) {
  const { theme, setTheme, isDarkMode } = useTheme()

  const themes = [
    {
      key: 'light' as const,
      label: 'Light',
      icon: SunIcon,
      colors: 'text-yellow-500',
    },
    {
      key: 'dark' as const,
      label: 'Dark',
      icon: MoonIcon,
      colors: 'text-blue-400',
    },
    {
      key: 'system' as const,
      label: 'System',
      icon: DesktopIcon,
      colors: 'text-gray-500',
    },
  ]

  const sizeClasses = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-28',
  }

  const iconSizes = {
    sm: 'sm' as const,
    md: 'md' as const,
    lg: 'lg' as const,
  }

  if (compact) {
    // Compact toggle for mobile/header use
    return (
      <div className={`flex items-center ${className}`}>
        <button
          onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
          className={`
            relative inline-flex items-center justify-center
            ${sizeClasses[size]} rounded-full
            bg-gradient-to-r from-gray-200 to-gray-300 
            dark:from-gray-700 dark:to-gray-600
            border-2 border-gray-300 dark:border-gray-500
            transition-all duration-300 ease-in-out
            hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
            group overflow-hidden
          `}
          aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
          {/* Sliding Background */}
          <div
            className={`
              absolute inset-1 rounded-full 
              bg-gradient-to-r from-red-400 to-red-500
              transition-transform duration-300 ease-in-out
              ${isDarkMode ? 'translate-x-0' : 'translate-x-full'}
            `}
            style={{ width: '40%' }}
          />

          {/* Icons */}
          <div className="relative flex justify-between items-center px-2 w-full">
            <MoonIcon
              size={iconSizes[size]}
              color={isDarkMode ? 'white' : 'rgb(107 114 128)'}
              className="transition-colors duration-300"
            />
            <SunIcon
              size={iconSizes[size]}
              color={!isDarkMode ? 'white' : 'rgb(107 114 128)'}
              className="transition-colors duration-300"
            />
          </div>
        </button>

        {showLabel && (
          <span className="ml-2 font-medium text-gray-700 dark:text-gray-300 text-sm">
            {isDarkMode ? 'Dark' : 'Light'}
          </span>
        )}
      </div>
    )
  }

  // Full theme selector with 3 options
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {showLabel && (
        <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
          Theme:
        </span>
      )}

      <div className="flex bg-gray-100 dark:bg-gray-800 p-1 border border-gray-200 dark:border-gray-700 rounded-lg">
        {themes.map(({ key, label, icon: Icon, colors }) => (
          <button
            key={key}
            onClick={() => setTheme(key)}
            className={`
              relative flex items-center justify-center px-3 py-2 rounded-md
              transition-all duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2
              ${
                theme === key
                  ? 'bg-gradient-to-r from-red-400 to-red-500 text-white shadow-md transform scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white dark:hover:bg-gray-700'
              }
            `}
            aria-label={`Switch to ${label.toLowerCase()} mode`}
            title={label}
          >
            <Icon
              size={iconSizes[size]}
              color={theme === key ? 'currentColor' : undefined}
              className={theme !== key ? colors : ''}
            />
            {size === 'lg' && (
              <span className="ml-2 font-medium text-xs">{label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
