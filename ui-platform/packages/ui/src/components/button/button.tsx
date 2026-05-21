import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

/**
 * Button variants using CSS variables from design tokens
 * No hardcoded Tailwind utility classes for colors/spacing
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-[var(--spacing-xs)]',
    'font-medium',
    'transition-colors duration-[var(--duration-150)] ease-[var(--easing-out)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'select-none',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
          'hover:bg-[var(--color-primary-hover)]',
          'active:bg-[var(--color-primary-active)]',
        ].join(' '),
        secondary: [
          'bg-[var(--color-secondary)] text-[var(--color-secondary-foreground)]',
          'hover:bg-[var(--color-secondary-hover)]',
          'active:bg-[var(--color-secondary-active)]',
        ].join(' '),
        outline: [
          'border border-[var(--color-border)]',
          'bg-transparent text-[var(--color-foreground)]',
          'hover:bg-[var(--color-background-muted)]',
          'active:bg-[var(--color-background-emphasized)]',
        ].join(' '),
        ghost: [
          'bg-transparent text-[var(--color-foreground)]',
          'hover:bg-[var(--color-background-muted)]',
          'active:bg-[var(--color-background-emphasized)]',
        ].join(' '),
        destructive: [
          'bg-[var(--color-error)] text-[var(--color-error-foreground)]',
          'hover:bg-[var(--color-error)]/90',
          'active:bg-[var(--color-error)]/80',
        ].join(' '),
        link: [
          'text-[var(--color-primary)]',
          'underline-offset-4 hover:underline',
          'bg-transparent',
        ].join(' '),
      },
      size: {
        xs: [
          'h-[var(--size-xs)] px-[var(--spacing-inline-xs)]',
          'text-xs',
          'rounded-[var(--radius-sm)]',
        ].join(' '),
        sm: [
          'h-[var(--size-sm)] px-[var(--spacing-inline-sm)]',
          'text-sm',
          'rounded-[var(--radius-md)]',
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
        xl: [
          'h-[var(--size-xl)] px-[var(--spacing-inline-xl)]',
          'text-lg',
          'rounded-[var(--radius-lg)]',
        ].join(' '),
        icon: [
          'h-[var(--size-md)] w-[var(--size-md)]',
          'rounded-[var(--radius-md)]',
        ].join(' '),
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child component (Slot) */
  asChild?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Left icon */
  leftIcon?: React.ReactNode;
  /** Right icon */
  rightIcon?: React.ReactNode;
}

/**
 * Button component
 * Token-driven, accessible button with multiple variants
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={isDisabled}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <span
            className="inline-block h-[1em] w-[1em] animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
