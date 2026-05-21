import * as React from 'react';
import { cn } from '../utils';

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether sidebar is collapsed (controlled mode) */
  sidebarCollapsed?: boolean;
  /** Callback when sidebar collapsed state should change (required for controlled mode) */
  onSidebarChange?: (collapsed: boolean) => void;
  /** Whether app has a fixed header */
  fixedHeader?: boolean;
  /** Whether app has a fixed footer */
  fixedFooter?: boolean;
}

interface AppShellContextValue {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  toggleSidebar: () => void;
}

const AppShellContext = React.createContext<AppShellContextValue | undefined>(undefined);

export function useAppShell(): AppShellContextValue {
  const context = React.useContext(AppShellContext);
  if (!context) {
    throw new Error('useAppShell must be used within an AppShell');
  }
  return context;
}

/**
 * AppShell - Main application layout container
 * Provides context for sidebar state and layout coordination
 * 
 * Supports both controlled and uncontrolled modes:
 * - Uncontrolled: Don't pass `sidebarCollapsed` prop, internal state is used
 * - Controlled: Pass both `sidebarCollapsed` and `onSidebarChange` props
 */
const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      className,
      children,
      sidebarCollapsed: controlledCollapsed,
      onSidebarChange,
      fixedHeader = true,
      fixedFooter = false,
      ...props
    },
    ref
  ) => {
    const [internalCollapsed, setInternalCollapsed] = React.useState(false);
    
    const isControlled = controlledCollapsed !== undefined;
    const sidebarCollapsed = isControlled ? controlledCollapsed : internalCollapsed;
    
    // Warn in development if using controlled mode without onSidebarChange
    React.useEffect(() => {
      if (process.env.NODE_ENV !== 'production') {
        if (isControlled && !onSidebarChange) {
          console.warn(
            'AppShell: `sidebarCollapsed` prop was provided without `onSidebarChange`. ' +
            'This will make the sidebar state read-only. ' +
            'Either provide `onSidebarChange` to handle state changes, or remove `sidebarCollapsed` to use uncontrolled mode.'
          );
        }
      }
    }, [isControlled, onSidebarChange]);
    
    const setSidebarCollapsed = React.useCallback((collapsed: boolean) => {
      if (isControlled) {
        // In controlled mode, call the callback
        if (onSidebarChange) {
          onSidebarChange(collapsed);
        } else if (process.env.NODE_ENV !== 'production') {
          console.warn(
            'AppShell: Attempted to change sidebar state in controlled mode without `onSidebarChange` handler.'
          );
        }
      } else {
        // In uncontrolled mode, update internal state
        setInternalCollapsed(collapsed);
      }
    }, [isControlled, onSidebarChange]);
    
    const toggleSidebar = React.useCallback(() => {
      setSidebarCollapsed(!sidebarCollapsed);
    }, [sidebarCollapsed, setSidebarCollapsed]);
    
    const contextValue = React.useMemo(
      () => ({
        sidebarCollapsed,
        setSidebarCollapsed,
        toggleSidebar,
      }),
      [sidebarCollapsed, setSidebarCollapsed, toggleSidebar]
    );

    return (
      <AppShellContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'relative flex min-h-screen w-full bg-[var(--color-background)]',
            fixedHeader && 'pt-[var(--header-height)]',
            fixedFooter && 'pb-[var(--footer-height)]',
            className
          )}
          data-sidebar-collapsed={sidebarCollapsed}
          {...props}
        >
          {children}
        </div>
      </AppShellContext.Provider>
    );
  }
);

AppShell.displayName = 'AppShell';

export { AppShell, AppShellContext };
