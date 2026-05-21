import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const inputVariants = cva(
  [
    'flex w-full',
    'bg-[var(--color-surface)] text-[var(--color-foreground)]',
    'border border-[var(--color-border)]',
    'transition-colors duration-[var(--duration-150)] ease-[var(--easing-out)]',
    'placeholder:text-[var(--color-foreground-subtle)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:border-transparent',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-background-muted)]',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  ].join(' '),
  {
    variants: {
      size: {
        sm: [
          'h-[var(--size-sm)] px-[var(--spacing-inline-sm)]',
          'text-sm',
          'rounded-[var(--radius-sm)]',
        ].join(' '),
        md: [
          'h-[var(--size-md)] px-[var(--spacing-inline-md)]',
          'text-sm',
          'rounded-[var(--radius-md)]',
        ].join(' '),
        lg: [
          'h-[var(--size-lg)] px-[var(--spacing-inline-lg)]',
          'text-base',
          'rounded-[var(--radius-lg)]',
        ].join(' '),
      },
      state: {
        default: '',
        error: 'border-[var(--color-error)] focus-visible:ring-[var(--color-error)]',
        success: 'border-[var(--color-success)] focus-visible:ring-[var(--color-success)]',
      },
    },
    defaultVariants: {
      size: 'md',
      state: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  /** Left addon/icon */
  leftAddon?: React.ReactNode;
  /** Right addon/icon */
  rightAddon?: React.ReactNode;
}

/**
 * Input component
 * Token-driven, accessible text input
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, state, type = 'text', leftAddon, rightAddon, ...props }, ref) => {
    if (leftAddon || rightAddon) {
      return (
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-0 flex items-center pl-[var(--spacing-inline-sm)] text-[var(--color-foreground-muted)]">
              {leftAddon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ size, state }),
              leftAddon && 'pl-[var(--spacing-3xl)]',
              rightAddon && 'pr-[var(--spacing-3xl)]',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-0 flex items-center pr-[var(--spacing-inline-sm)] text-[var(--color-foreground-muted)]">
              {rightAddon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ size, state, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };
