'use client'

import { useTheme } from '../../contexts/ThemeContext'
import { useState, useEffect } from 'react'

export default function NewThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = () => {
    // Simple toggle between light and dark only
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  const isDark = theme === 'dark'

  if (!mounted) {
    return (
      <div className="inline-flex relative bg-gray-200 rounded-full w-14 h-7">
        <div className="bg-white shadow-md m-0.5 rounded-full w-6 h-6 transition-all duration-300" />
      </div>
    )
  }

  return (
    <button
      onClick={handleToggle}
      className={`relative inline-flex items-center w-14 h-7 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 ${
        isDark
          ? 'bg-brand-primary shadow-inner'
          : 'bg-gray-200 hover:bg-gray-300'
      }`}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={isDark}
    >
      {/* Toggle Circle */}
      <div
        className={`relative flex items-center justify-center bg-white shadow-lg rounded-full w-6 h-6 transition-all duration-300 transform ${
          isDark ? 'translate-x-7' : 'translate-x-0.5'
        }`}
      >
        {/* Icons */}
        <svg
          className={`absolute w-3 h-3 text-yellow-500 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className={`absolute w-3 h-3 text-gray-600 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
    </button>
  )
}
