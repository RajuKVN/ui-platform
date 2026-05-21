import * as React from 'react';
import { cn } from '../utils';

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  /** Fixed position */
  fixed?: boolean;
  /** Border on top */
  bordered?: boolean;
}

/**
 * Footer - Application footer
 */
const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ className, children, fixed = false, bordered = true, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(
        [
          'flex items-center',
          'h-[var(--footer-height)]',
          'px-[var(--spacing-lg)]',
          'bg-[var(--color-surface)]',
          'text-sm text-[var(--color-foreground-muted)]',
        ].join(' '),
        fixed && 'fixed bottom-0 left-0 right-0 z-[1200]',
        bordered && 'border-t border-[var(--color-border)]',
        className
      )}
      {...props}
    >
      {children}
    </footer>
  )
);

Footer.displayName = 'Footer';

export { Footer };
