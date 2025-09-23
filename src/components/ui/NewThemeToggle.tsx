'use client'

import { useTheme } from '../../contexts/ThemeContext'

export default function NewThemeToggle() {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return '🌙'
      case 'dark':
        return '💻'
      case 'system':
        return '☀️'
      default:
        return '🌙'
    }
  }

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode'
      case 'dark':
        return 'Switch to system mode'
      case 'system':
        return 'Switch to light mode'
      default:
        return 'Toggle theme'
    }
  }

  return (
    <button
      onClick={handleToggle}
      className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm hover:shadow-md p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200"
      title={getLabel()}
      aria-label={getLabel()}
    >
      <span className="text-lg">{getIcon()}</span>
    </button>
  )
}
