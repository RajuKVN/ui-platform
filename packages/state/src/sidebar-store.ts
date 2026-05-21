import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SidebarState {
  /** Whether the sidebar is collapsed */
  collapsed: boolean;
  /** Whether the sidebar is open on mobile */
  mobileOpen: boolean;
  /** Width of the sidebar in pixels */
  width: number;
  /** Minimum width for resizing */
  minWidth: number;
  /** Maximum width for resizing */
  maxWidth: number;
}

export interface SidebarActions {
  /** Toggle sidebar collapsed state */
  toggle: () => void;
  /** Set collapsed state */
  setCollapsed: (collapsed: boolean) => void;
  /** Toggle mobile sidebar */
  toggleMobile: () => void;
  /** Set mobile open state */
  setMobileOpen: (open: boolean) => void;
  /** Set sidebar width */
  setWidth: (width: number) => void;
  /** Reset to defaults */
  reset: () => void;
}

export type SidebarStore = SidebarState & SidebarActions;

const DEFAULT_STATE: SidebarState = {
  collapsed: false,
  mobileOpen: false,
  width: 256,
  minWidth: 200,
  maxWidth: 400,
};

/**
 * Sidebar state store
 * Manages sidebar collapse, mobile visibility, and width
 */
export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      toggle: () => set((state) => ({ collapsed: !state.collapsed })),

      setCollapsed: (collapsed) => set({ collapsed }),

      toggleMobile: () => set((state) => ({ mobileOpen: !state.mobileOpen })),

      setMobileOpen: (mobileOpen) => set({ mobileOpen }),

      setWidth: (width) =>
        set((state) => ({
          width: Math.min(Math.max(width, state.minWidth), state.maxWidth),
        })),

      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: 'ui-platform-sidebar',
      partialize: (state) => ({
        collapsed: state.collapsed,
        width: state.width,
      }),
    }
  )
);
