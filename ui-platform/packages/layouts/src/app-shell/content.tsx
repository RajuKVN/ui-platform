import * as React from 'react';
import { cn } from '../utils';
import { useAppShell } from './app-shell';

export interface ContentProps extends React.HTMLAttributes<HTMLElement> {
  /** Has sidebar on left */
  hasSidebar?: boolean;
  /** Padding */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const paddingClasses = {
  none: 'p-0',
  sm: 'p-[var(--spacing-sm)]',
  md: 'p-[var(--spacing-lg)]',
  lg: 'p-[var(--spacing-xl)]',
  xl: 'p-[var(--spacing-2xl)]',
};

/**
 * Content - Main content area
 * Automatically adjusts margin based on sidebar state
 */
const Content = React.forwardRef<HTMLElement, ContentProps>(
  ({ className, children, hasSidebar = true, padding = 'md', ...props }, ref) => {
    const { sidebarCollapsed } = useAppShell();

    return (
      <main
        ref={ref}
        className={cn(
          'flex-1 transition-[margin] duration-[var(--duration-200)] ease-[var(--easing-out)]',
          paddingClasses[padding],
          className
        )}
        style={
          hasSidebar
            ? {
                marginLeft: sidebarCollapsed
                  ? 'var(--sidebar-collapsed)'
                  : 'var(--sidebar-width)',
              }
            : undefined
        }
        {...props}
      >
        {children}
      </main>
    );
  }
);

Content.displayName = 'Content';

export { Content };
