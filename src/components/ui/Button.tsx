// Enhanced Button component with MH Construction standardized styling
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'destructive'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  withRing?: boolean
  children: React.ReactNode
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  withRing = true,
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-bold rounded-lg transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2'
  
  // Ring styles for consistent outer ring effect
  const ringClasses = withRing 
    ? 'ring-2 ring-offset-2 ring-offset-white hover:ring-4 focus:ring-4 active:ring-2' 
    : 'focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: `btn-primary-enhanced ${ringClasses} ring-brand-primary/30 hover:ring-brand-primary/50 focus:ring-brand-primary/50`,
    secondary: `btn-secondary-enhanced ${ringClasses} ring-brand-secondary/30 hover:ring-brand-secondary/50 focus:ring-brand-secondary/50`,
    outline: `btn-outline-enhanced ${ringClasses} ring-brand-primary/30 hover:ring-brand-primary/50 focus:ring-brand-primary/50`,
    ghost: `btn-ghost-enhanced ${ringClasses} ring-brand-primary/30 hover:ring-brand-primary/50 focus:ring-brand-primary/50`,
    gradient: `btn-gradient-enhanced ${ringClasses} ring-brand-primary/30 hover:ring-brand-primary/50 focus:ring-brand-primary/50`,
    destructive: `btn-destructive-enhanced ${ringClasses} ring-red-300 hover:ring-red-400 focus:ring-red-400`
  }
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
    xl: 'px-8 py-4 text-xl min-h-[60px]'
  }
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}