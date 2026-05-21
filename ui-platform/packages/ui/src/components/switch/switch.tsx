import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

const switchVariants = cva(
  [
    'peer inline-flex shrink-0 cursor-pointer items-center',
    'rounded-full border-2 border-transparent',
    'transition-colors duration-[var(--duration-200)] ease-[var(--easing-out)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)] focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'data-[state=unchecked]:bg-[var(--color-background-emphasized)]',
    'data-[state=checked]:bg-[var(--color-primary)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-[1.25rem] w-[2.25rem]',
        md: 'h-[1.5rem] w-[2.75rem]',
        lg: 'h-[1.75rem] w-[3.5rem]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const thumbVariants = cva(
  [
    'pointer-events-none block rounded-full',
    'bg-[var(--color-surface)]',
    'shadow-[var(--shadow-sm)]',
    'ring-0',
    'transition-transform duration-[var(--duration-200)] ease-[var(--easing-out)]',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'h-[1rem] w-[1rem] data-[state=checked]:translate-x-[1rem] data-[state=unchecked]:translate-x-0',
        md: 'h-[1.25rem] w-[1.25rem] data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-0',
        lg: 'h-[1.5rem] w-[1.5rem] data-[state=checked]:translate-x-[1.75rem] data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size, ...props }, ref) => (
    <SwitchPrimitive.Root className={cn(switchVariants({ size }), className)} {...props} ref={ref}>
      <SwitchPrimitive.Thumb className={thumbVariants({ size })} />
    </SwitchPrimitive.Root>
  )
);

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch, switchVariants };
