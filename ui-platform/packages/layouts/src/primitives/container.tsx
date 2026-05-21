import * as React from 'react';
import { cn } from '../utils';

type MaxWidth = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
type Padding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the container */
  maxWidth?: MaxWidth;
  /** Horizontal padding */
  padding?: Padding;
  /** Center the container */
  center?: boolean;
  /** As child element type */
  as?: React.ElementType;
}

const maxWidthClasses: Record<MaxWidth, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

const paddingClasses: Record<Padding, string> = {
  none: 'px-0',
  sm: 'px-[var(--spacing-sm)]',
  md: 'px-[var(--spacing-lg)]',
  lg: 'px-[var(--spacing-xl)]',
  xl: 'px-[var(--spacing-2xl)]',
};

/**
 * Container - Centered content container with max-width
 */
const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      maxWidth = 'xl',
      padding = 'md',
      center = true,
      as: Component = 'div',
      ...props
    },
    ref
  ) => (
    <Component
      ref={ref}
      className={cn(
        'w-full',
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        center && 'mx-auto',
        className
      )}
      {...props}
    />
  )
);

Container.displayName = 'Container';

export { Container };
