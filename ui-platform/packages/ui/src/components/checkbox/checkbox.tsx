import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const checkboxVariants = cva(
  [
    'peer shrink-0',
    'border border-[var(--color-border)]',
    'bg-[var(--color-surface)]',
    'transition-colors duration-[var(--duration-150)] ease-[var(--easing-out)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=checked]:bg-[var(--color-primary)] data-[state=checked]:border-[var(--color-primary)] data-[state=checked]:text-[var(--color-primary-foreground)]',
    'data-[state=indeterminate]:bg-[var(--color-primary)] data-[state=indeterminate]:border-[var(--color-primary)] data-[state=indeterminate]:text-[var(--color-primary-foreground)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-[1rem] w-[1rem] rounded-[var(--radius-sm)]',
        md: 'h-[1.25rem] w-[1.25rem] rounded-[var(--radius-sm)]',
        lg: 'h-[1.5rem] w-[1.5rem] rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const MinusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, size, ...props }, ref) => (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        {props.checked === 'indeterminate' ? (
          <MinusIcon className="h-[0.875rem] w-[0.875rem]" />
        ) : (
          <CheckIcon className="h-[0.875rem] w-[0.875rem]" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);

Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox, checkboxVariants };
