import * as React from 'react';
import { cn } from '../../utils/cn';

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Error title */
  title?: string;
  /** Error message or description */
  message?: string;
  /** Retry action */
  onRetry?: () => void;
  /** Custom retry button text */
  retryText?: string;
  /** Custom icon */
  icon?: React.ReactNode;
}

const DefaultErrorIcon = () => (
  <svg
    className="h-[3rem] w-[3rem]"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <circle cx="12" cy="16" r="0.5" fill="currentColor" />
  </svg>
);

/**
 * Error state component
 * Displays when an error occurs
 */
const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    {
      className,
      title = 'Something went wrong',
      message,
      onRetry,
      retryText = 'Try again',
      icon,
      children,
      ...props
    },
    ref
  ) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        [
          'flex flex-col items-center justify-center',
          'gap-[var(--spacing-gap-md)]',
          'py-[var(--spacing-3xl)]',
          'text-center',
        ].join(' '),
        className
      )}
      {...props}
    >
      <div className="text-[var(--color-error)]">{icon ?? <DefaultErrorIcon />}</div>
      <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
        {title}
      </h3>
      {message && (
        <p className="max-w-sm text-sm text-[var(--color-foreground-muted)]">
          {message}
        </p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className={cn(
            [
              'mt-[var(--spacing-sm)]',
              'inline-flex items-center justify-center',
              'rounded-[var(--radius-md)]',
              'bg-[var(--color-primary)] text-[var(--color-primary-foreground)]',
              'px-[var(--spacing-inline-md)] py-[var(--spacing-block-sm)]',
              'text-sm font-medium',
              'transition-colors',
              'hover:bg-[var(--color-primary-hover)]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
            ].join(' ')
          )}
        >
          {retryText}
        </button>
      )}
      {children}
    </div>
  )
);

ErrorState.displayName = 'ErrorState';

export { ErrorState };
