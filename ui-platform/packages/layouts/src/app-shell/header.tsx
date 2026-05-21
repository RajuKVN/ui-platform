import * as React from 'react';
import { cn } from '../utils';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Fixed position */
  fixed?: boolean;
  /** Border on bottom */
  bordered?: boolean;
}

/**
 * Header - Application header/app bar
 */
const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, children, fixed = true, bordered = true, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        [
          'flex items-center',
          'h-[var(--header-height)]',
          'px-[var(--spacing-lg)]',
          'bg-[var(--color-surface)]',
          'z-[1200]',
        ].join(' '),
        fixed && 'fixed top-0 left-0 right-0',
        bordered && 'border-b border-[var(--color-border)]',
        className
      )}
      {...props}
    >
      {children}
    </header>
  )
);

Header.displayName = 'Header';

export interface HeaderBrandProps extends React.HTMLAttributes<HTMLDivElement> {}

const HeaderBrand = React.forwardRef<HTMLDivElement, HeaderBrandProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--spacing-gap-sm)] font-semibold text-lg',
        className
      )}
      {...props}
    />
  )
);

HeaderBrand.displayName = 'HeaderBrand';

export interface HeaderNavProps extends React.HTMLAttributes<HTMLElement> {}

const HeaderNav = React.forwardRef<HTMLElement, HeaderNavProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--spacing-gap-sm)] ml-[var(--spacing-xl)]',
        className
      )}
      {...props}
    />
  )
);

HeaderNav.displayName = 'HeaderNav';

export interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

const HeaderActions = React.forwardRef<HTMLDivElement, HeaderActionsProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-[var(--spacing-gap-sm)] ml-auto',
        className
      )}
      {...props}
    />
  )
);

HeaderActions.displayName = 'HeaderActions';

export { Header, HeaderBrand, HeaderNav, HeaderActions };
