import * as React from 'react';
import { cn } from '../../utils/cn';

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display */
  icon?: React.ReactNode;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Action button or element */
  action?: React.ReactNode;
}

/**
 * Empty state component
 * Displays when there's no data to show
 */
const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ className, icon, title, description, action, children, ...props }, ref) => (
    <div
      ref={ref}
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
      {icon && (
        <div className="text-[var(--color-foreground-subtle)]">{icon}</div>
      )}
      {title && (
        <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
          {title}
        </h3>
      )}
      {description && (
        <p className="max-w-sm text-sm text-[var(--color-foreground-muted)]">
          {description}
        </p>
      )}
      {action && <div className="mt-[var(--spacing-sm)]">{action}</div>}
      {children}
    </div>
  )
);

Empty.displayName = 'Empty';

export { Empty };
