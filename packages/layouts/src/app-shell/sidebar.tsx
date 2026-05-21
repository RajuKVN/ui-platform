import * as React from 'react';
import { cn } from '../utils';
import { useAppShell } from './app-shell';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Fixed position */
  fixed?: boolean;
  /** Position (left or right) */
  position?: 'left' | 'right';
  /** Custom width when expanded */
  width?: string;
  /** Custom width when collapsed */
  collapsedWidth?: string;
}

/**
 * Sidebar - Navigation sidebar component
 * Automatically responds to AppShell context for collapse state
 */
const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      children,
      fixed = true,
      position = 'left',
      width,
      collapsedWidth,
      style,
      ...props
    },
    ref
  ) => {
    const { sidebarCollapsed } = useAppShell();

    return (
      <aside
        ref={ref}
        className={cn(
          [
            'flex flex-col',
            'border-[var(--color-border)]',
            'bg-[var(--color-surface)]',
            'transition-[width] duration-[var(--duration-200)] ease-[var(--easing-out)]',
          ].join(' '),
          fixed && 'fixed top-[var(--header-height)] bottom-0 z-[1300]',
          position === 'left' ? 'left-0 border-r' : 'right-0 border-l',
          className
        )}
        style={{
          width: sidebarCollapsed
            ? (collapsedWidth ?? 'var(--sidebar-collapsed)')
            : (width ?? 'var(--sidebar-width)'),
          ...style,
        }}
        data-collapsed={sidebarCollapsed}
        {...props}
      >
        {children}
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center px-[var(--spacing-lg)] py-[var(--spacing-md)] border-b border-[var(--color-border)]',
        className
      )}
      {...props}
    />
  )
);

SidebarHeader.displayName = 'SidebarHeader';

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarContent = React.forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex-1 overflow-y-auto p-[var(--spacing-md)]',
        className
      )}
      {...props}
    />
  )
);

SidebarContent.displayName = 'SidebarContent';

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'mt-auto px-[var(--spacing-lg)] py-[var(--spacing-md)] border-t border-[var(--color-border)]',
        className
      )}
      {...props}
    />
  )
);

SidebarFooter.displayName = 'SidebarFooter';

export interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {}

const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>(
  ({ className, ...props }, ref) => (
    <nav
      ref={ref}
      className={cn('flex flex-col gap-[var(--spacing-gap-xs)]', className)}
      {...props}
    />
  )
);

SidebarNav.displayName = 'SidebarNav';

export interface SidebarNavItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Is this item active */
  active?: boolean;
  /** Icon element */
  icon?: React.ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

const SidebarNavItem = React.forwardRef<HTMLButtonElement, SidebarNavItemProps>(
  ({ className, children, active, icon, disabled, ...props }, ref) => {
    const { sidebarCollapsed } = useAppShell();

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          [
            'flex items-center gap-[var(--spacing-gap-sm)]',
            'rounded-[var(--radius-md)]',
            'px-[var(--spacing-inline-sm)] py-[var(--spacing-block-sm)]',
            'text-sm',
            'text-[var(--color-foreground-muted)]',
            'transition-colors duration-[var(--duration-150)]',
            'hover:bg-[var(--color-background-muted)] hover:text-[var(--color-foreground)]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-focus)]',
            'disabled:pointer-events-none disabled:opacity-50',
          ].join(' '),
          active && 'bg-[var(--color-primary-muted)] text-[var(--color-foreground)]',
          sidebarCollapsed && 'justify-center px-[var(--spacing-xs)]',
          className
        )}
        {...props}
      >
        {icon && <span className="shrink-0">{icon}</span>}
        {!sidebarCollapsed && <span className="truncate">{children}</span>}
      </button>
    );
  }
);

SidebarNavItem.displayName = 'SidebarNavItem';

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavItem,
};
