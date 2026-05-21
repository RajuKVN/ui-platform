/**
 * @ui-platform/theme-engine
 * Theme engine with React context and zero-rerender switching
 */

// Types
export type {
  ColorMode,
  ResolvedColorMode,
  ModeColor,
  ColorOverrides,
  FontOverrides,
  ThemeConfig,
  ThemeState,
  ThemeContextValue,
  ThemeProviderProps,
} from './types';

// Context and hooks
export { ThemeProvider, useTheme, useColorMode, useDensity } from './context';

// Theme creation
export { createTheme, generateBrandCSS, presetThemes } from './create-theme';
export type { BrandTheme, CreateThemeOptions } from './create-theme';

// Utilities
export {
  getSystemColorMode,
  getSystemReducedMotion,
  resolveColorMode,
  applyThemeToDocument,
  disableTransitionsTemporarily,
} from './utils';
