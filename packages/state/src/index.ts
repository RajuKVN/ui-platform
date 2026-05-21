/**
 * @ui-platform/state
 * Zustand-based UI state management
 * 
 * NOTE: For theme-related preferences (colorMode, density, reducedMotion),
 * use @ui-platform/theme-engine's useTheme, useColorMode, or useDensity hooks.
 */

export { useSidebarStore } from './sidebar-store';
export type { SidebarState, SidebarActions, SidebarStore } from './sidebar-store';

// New recommended export
export { useUIPreferencesStore } from './preferences-store';
export type {
  UIPreferencesState,
  UIPreferencesActions,
  UIPreferencesStore,
} from './preferences-store';

// Deprecated exports for backward compatibility
export { usePreferencesStore } from './preferences-store';
export type {
  PreferencesState,
  PreferencesActions,
  PreferencesStore,
  ColorMode,
  DensityMode,
} from './preferences-store';

export { useToastStore, toast } from './toast-store';
export type { ToastState, ToastActions, ToastStore, Toast, ToastVariant } from './toast-store';

export { useModalStore } from './modal-store';
export type { ModalState, ModalActions, ModalStore } from './modal-store';
