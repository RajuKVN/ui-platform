import * as React from 'react';
import { cn } from '../utils';

type Gap = 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the stack */
  direction?: 'row' | 'column';
  /** Gap between items */
  gap?: Gap;
  /** Align items */
  align?: Align;
  /** Justify content */
  justify?: Justify;
  /** Wrap items */
  wrap?: boolean;
  /** Full width */
  fullWidth?: boolean;
  /** As child element type */
  as?: React.ElementType;
}

const gapClasses: Record<Gap, string> = {
  none: 'gap-[var(--spacing-none)]',
  '2xs': 'gap-[var(--spacing-2xs)]',
  xs: 'gap-[var(--spacing-xs)]',
  sm: 'gap-[var(--spacing-sm)]',
  md: 'gap-[var(--spacing-md)]',
  lg: 'gap-[var(--spacing-lg)]',
  xl: 'gap-[var(--spacing-xl)]',
  '2xl': 'gap-[var(--spacing-2xl)]',
  '3xl': 'gap-[var(--spacing-3xl)]',
};

const alignClasses: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyClasses: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

/**
 * Stack - Flexible layout primitive
 * Use for arranging items in a row or column
 */
const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    {
      className,
      direction = 'column',
      gap = 'md',
      align = 'stretch',
      justify = 'start',
      wrap = false,
      fullWidth = false,
      as: Component = 'div',
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && 'flex-wrap',
        fullWidth && 'w-full',
        className
      )}
      {...props}
    />
  )
);

Stack.displayName = 'Stack';

/**
 * HStack - Horizontal stack (row)
 */
const HStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="row" {...props} />
);

HStack.displayName = 'HStack';

/**
 * VStack - Vertical stack (column)
 */
const VStack = React.forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
  (props, ref) => <Stack ref={ref} direction="column" {...props} />
);

VStack.displayName = 'VStack';

export { Stack, HStack, VStack };
