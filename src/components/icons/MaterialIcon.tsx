import React from 'react'

interface MaterialIconProps {
  icon: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  style?: React.CSSProperties
}

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  xl: 'text-3xl',
  '2xl': 'text-4xl',
  '3xl': 'text-5xl',
  '4xl': 'text-6xl',
}

export const MaterialIcon: React.FC<MaterialIconProps> = ({
  icon,
  className = '',
  size = 'md',
  style,
}) => {
  return (
    <span
      className={`material-icons ${sizeClasses[size]} ${className}`}
      style={{ userSelect: 'none', ...style }}
    >
      {icon}
    </span>
  )
}
