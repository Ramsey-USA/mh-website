import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex justify-center items-center disabled:opacity-50 border-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ring-offset-background focus-visible:ring-offset-2 font-medium transition-all duration-300 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default:
          'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500',
        destructive:
          'border-red-500 bg-white dark:bg-gray-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-600 dark:hover:border-red-300',
        outline:
          'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500',
        secondary:
          'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500',
        ghost:
          'border-transparent bg-transparent text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700',
        link: 'border-transparent bg-transparent text-brand-primary dark:text-brand-primary-light underline-offset-4 hover:underline hover:text-brand-primary-dark dark:hover:text-brand-primary',
        primary:
          'border-brand-primary bg-white dark:bg-gray-900 text-brand-primary dark:text-brand-primary-light hover:bg-brand-primary hover:text-white hover:border-brand-primary-dark focus:ring-brand-primary',
        neutral:
          'border-gray-800 dark:border-gray-200 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-white hover:border-gray-900 dark:hover:bg-gray-200 dark:hover:text-gray-900 dark:hover:border-gray-100',
      },
      size: {
        default: 'h-10 px-4 text-sm',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
