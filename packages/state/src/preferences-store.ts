import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * UI Preferences State
 * 
 * NOTE: Theme-related preferences (colorMode, density, reducedMotion) are managed
 * by @ui-platform/theme-engine's ThemeProvider. Use the `useTheme`, `useColorMode`,
 * or `useDensity` hooks from that package for theme state.
 * 
 * This store is for UI preferences that are NOT theme-related.
 */
export interface UIPreferencesState {
  /** Font size scale (1 = 100%) */
  fontScale: number;
  /** Sidebar position */
  sidebarPosition: 'left' | 'right';
  /** Show keyboard shortcuts hints */
  showShortcuts: boolean;
}

export interface UIPreferencesActions {
  /** Set font scale */
  setFontScale: (scale: number) => void;
  /** Set sidebar position */
  setSidebarPosition: (position: 'left' | 'right') => void;
  /** Toggle shortcuts hints */
  toggleShortcuts: () => void;
  /** Reset to defaults */
  reset: () => void;
}

export type UIPreferencesStore = UIPreferencesState & UIPreferencesActions;

const DEFAULT_STATE: UIPreferencesState = {
  fontScale: 1,
  sidebarPosition: 'left',
  showShortcuts: true,
};

/**
 * UI preferences store
 * Manages non-theme UI preferences
 * 
 * For theme-related preferences (colorMode, density, reducedMotion),
 * use @ui-platform/theme-engine's useTheme hook instead.
 */
export const useUIPreferencesStore = create<UIPreferencesStore>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,

      setFontScale: (fontScale) =>
        set({ fontScale: Math.min(Math.max(fontScale, 0.75), 1.5) }),

      setSidebarPosition: (sidebarPosition) => set({ sidebarPosition }),

      toggleShortcuts: () => set((state) => ({ showShortcuts: !state.showShortcuts })),

      reset: () => set(DEFAULT_STATE),
    }),
    {
      name: 'ui-platform-ui-preferences',
    }
  )
);

/**
 * @deprecated Use useUIPreferencesStore instead. Theme-related preferences
 * (colorMode, density, reducedMotion) should use @ui-platform/theme-engine's useTheme hook.
 */
export const usePreferencesStore = useUIPreferencesStore;

// Re-export types for backward compatibility (deprecated)
/** @deprecated Use ColorMode from @ui-platform/theme-engine instead */
export type ColorMode = 'light' | 'dark' | 'system';
/** @deprecated Use DensityMode from @ui-platform/design-tokens instead */
export type DensityMode = 'compact' | 'comfortable' | 'spacious';
/** @deprecated Use UIPreferencesState instead */
export type PreferencesState = UIPreferencesState;
/** @deprecated Use UIPreferencesActions instead */
export type PreferencesActions = UIPreferencesActions;
/** @deprecated Use UIPreferencesStore instead */
export type PreferencesStore = UIPreferencesStore;
