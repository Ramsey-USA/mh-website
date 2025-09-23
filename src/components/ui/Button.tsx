// Enhanced Button component with Pure Tailwind CSS - MH Construction standardized styling
import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'gradient'
    | 'destructive'
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
  const baseClasses =
    'font-bold rounded-full transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 relative overflow-hidden group'

  // Ring styles for consistent outer ring effect
  const ringClasses = withRing
    ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-dark hover:ring-4 focus:ring-4 active:ring-2'
    : 'focus:ring-2 focus:ring-offset-2'

  const variantClasses = {
    primary: `
      bg-brand-primary border-2 border-brand-primary text-white
      shadow-[0_4px_16px_rgba(56,104,81,0.2)] dark:shadow-[0_4px_16px_rgba(74,122,99,0.3)]
      hover:bg-brand-primary-dark hover:-translate-y-1 hover:shadow-[0_0_0_3px_rgba(56,104,81,0.3),0_8px_25px_rgba(56,104,81,0.35)]
      dark:hover:shadow-[0_0_0_3px_rgba(74,122,99,0.4),0_8px_25px_rgba(74,122,99,0.4)]
      before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full
      before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent
      before:transition-all before:duration-500 before:z-10
      hover:before:left-full
      ${ringClasses} ring-brand-primary/30 hover:ring-brand-primary/50 focus:ring-brand-primary/50
    `,
    secondary: `
      bg-brand-secondary border-2 border-brand-secondary text-white
      shadow-[0_4px_16px_rgba(189,146,100,0.2)] dark:shadow-[0_4px_16px_rgba(201,161,118,0.3)]
      hover:bg-brand-secondary-light hover:-translate-y-1 hover:shadow-[0_0_0_3px_rgba(189,146,100,0.3),0_8px_25px_rgba(189,146,100,0.35)]
      dark:hover:shadow-[0_0_0_3px_rgba(201,161,118,0.4),0_8px_25px_rgba(201,161,118,0.4)]
      before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full
      before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent
      before:transition-all before:duration-500 before:z-10
      hover:before:left-full
      ${ringClasses} ring-brand-secondary/30 hover:ring-brand-secondary/50 focus:ring-brand-secondary/50
    `,
    outline: `
      bg-transparent border-2 border-brand-primary text-brand-primary
      shadow-[0_2px_8px_rgba(56,104,81,0.1)] dark:shadow-[0_2px_8px_rgba(74,122,99,0.2)]
      dark:border-brand-primary-light dark:text-brand-primary-light
      hover:bg-brand-primary/5 dark:hover:bg-brand-primary-light/10 hover:-translate-y-0.5
      hover:shadow-[0_0_0_2px_rgba(56,104,81,0.2),0_6px_20px_rgba(56,104,81,0.15)]
      dark:hover:shadow-[0_0_0_2px_rgba(74,122,99,0.3),0_6px_20px_rgba(74,122,99,0.2)]
      before:content-[''] before:absolute before:top-0 before:-left-full before:w-full before:h-full
      before:bg-gradient-to-r before:from-transparent before:via-brand-primary/10 before:to-transparent
      dark:before:via-brand-primary-light/10
      before:transition-all before:duration-500 before:z-10
      hover:before:left-full
      ${ringClasses} ring-brand-primary/30 hover:ring-brand-primary/50 focus:ring-brand-primary/50
    `,
    ghost: `
      bg-transparent border-2 border-transparent text-brand-primary
      hover:bg-brand-primary/5 hover:border-brand-primary/20 hover:-translate-y-0.5
      dark:text-brand-primary-light dark:hover:bg-brand-primary-light/10
      ${ringClasses} ring-brand-primary/30 hover:ring-brand-primary/50 focus:ring-brand-primary/50
    `,
    gradient: `
      bg-gradient-to-r from-brand-primary to-brand-secondary border-2 border-transparent text-white
      shadow-[0_4px_16px_rgba(56,104,81,0.2)]
      hover:from-brand-primary-dark hover:to-brand-secondary-dark hover:-translate-y-1
      hover:shadow-[0_8px_25px_rgba(56,104,81,0.35)]
      ${ringClasses} ring-brand-primary/30 hover:ring-brand-primary/50 focus:ring-brand-primary/50
    `,
    destructive: `
      bg-error border-2 border-error text-white
      shadow-[0_4px_16px_rgba(239,68,68,0.2)]
      hover:bg-error-dark hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(239,68,68,0.35)]
      ${ringClasses} ring-red-300 hover:ring-red-400 focus:ring-red-400
    `,
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[36px]',
    md: 'px-4 py-2 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
    xl: 'px-8 py-4 text-xl min-h-[60px]',
  }

  const classes =
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`
      .replace(/\s+/g, ' ')
      .trim()

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}
