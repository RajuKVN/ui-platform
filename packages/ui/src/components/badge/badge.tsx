import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const badgeVariants = cva(
  [
    'inline-flex items-center',
    'rounded-full',
    'border',
    'font-semibold',
    'transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-[var(--color-border-focus)] focus:ring-offset-2',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'border-transparent',
          'bg-[var(--color-primary)]',
          'text-[var(--color-primary-foreground)]',
        ].join(' '),
        secondary: [
          'border-transparent',
          'bg-[var(--color-secondary)]',
          'text-[var(--color-secondary-foreground)]',
        ].join(' '),
        outline: [
          'border-[var(--color-border)]',
          'text-[var(--color-foreground)]',
        ].join(' '),
        success: [
          'border-transparent',
          'bg-[var(--color-success)]',
          'text-[var(--color-success-foreground)]',
        ].join(' '),
        warning: [
          'border-transparent',
          'bg-[var(--color-warning)]',
          'text-[var(--color-warning-foreground)]',
        ].join(' '),
        error: [
          'border-transparent',
          'bg-[var(--color-error)]',
          'text-[var(--color-error-foreground)]',
        ].join(' '),
        info: [
          'border-transparent',
          'bg-[var(--color-info)]',
          'text-[var(--color-info-foreground)]',
        ].join(' '),
      },
      size: {
        sm: 'px-[var(--spacing-xs)] py-[var(--spacing-2xs)] text-[0.625rem]',
        md: 'px-[var(--spacing-sm)] py-[var(--spacing-2xs)] text-xs',
        lg: 'px-[var(--spacing-md)] py-[var(--spacing-xs)] text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => (
    <div ref={ref} className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
