import * as React from 'react';
import { cn } from '../../utils/cn';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of the loading spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Optional loading text */
  text?: string;
}

const sizeClasses = {
  sm: 'h-[1rem] w-[1rem] border-2',
  md: 'h-[2rem] w-[2rem] border-2',
  lg: 'h-[3rem] w-[3rem] border-[3px]',
};

/**
 * Loading state component
 * Displays a spinner with optional text
 */
const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, size = 'md', text, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      aria-label={text ?? 'Loading'}
      className={cn('flex flex-col items-center justify-center gap-[var(--spacing-gap-sm)]', className)}
      {...props}
    >
      <div
        className={cn(
          'animate-spin rounded-full border-[var(--color-border)] border-t-[var(--color-primary)]',
          sizeClasses[size]
        )}
      />
      {text && (
        <p className="text-sm text-[var(--color-foreground-muted)]">{text}</p>
      )}
    </div>
  )
);

Loading.displayName = 'Loading';

export { Loading };
