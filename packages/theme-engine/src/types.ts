import type { DensityMode } from '@ui-platform/design-tokens';

/**
 * Color mode - light or dark theme
 */
export type ColorMode = 'light' | 'dark' | 'system';

/**
 * Resolved color mode (never 'system')
 */
export type ResolvedColorMode = 'light' | 'dark';

/**
 * Mode-specific color (different values for light/dark)
 */
export interface ModeColor {
  light?: string;
  dark?: string;
}

/**
 * Custom color overrides for theming
 */
export interface ColorOverrides {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string | ModeColor;
  foreground?: string | ModeColor;
  border?: string;
}

/**
 * Font overrides
 */
export interface FontOverrides {
  sans?: string;
  mono?: string;
  display?: string;
}

/**
 * Theme configuration object
 */
export interface ThemeConfig {
  /** Color mode preference */
  colorMode?: ColorMode;
  /** Density mode */
  density?: DensityMode;
  /** Custom color overrides */
  colors?: ColorOverrides;
  /** Font overrides */
  fonts?: FontOverrides;
  /** Border radius multiplier (1 = default) */
  radiusScale?: number;
  /** Enable reduced motion */
  reducedMotion?: boolean;
}

/**
 * Complete theme state
 */
export interface ThemeState {
  /** User's color mode preference */
  colorMode: ColorMode;
  /** Resolved color mode (light or dark) */
  resolvedColorMode: ResolvedColorMode;
  /** Density mode */
  density: DensityMode;
  /** Custom color overrides */
  colors: ColorOverrides;
  /** Font overrides */
  fonts: FontOverrides;
  /** Radius scale multiplier */
  radiusScale: number;
  /** Reduced motion preference */
  reducedMotion: boolean;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  /** Current theme state */
  theme: ThemeState;
  /** Set color mode */
  setColorMode: (mode: ColorMode) => void;
  /** Set density mode */
  setDensity: (density: DensityMode) => void;
  /** Set custom colors */
  setColors: (colors: ColorOverrides) => void;
  /** Set radius scale */
  setRadiusScale: (scale: number) => void;
  /** Set reduced motion */
  setReducedMotion: (enabled: boolean) => void;
  /** Toggle between light and dark */
  toggleColorMode: () => void;
  /** Reset to default theme */
  resetTheme: () => void;
}

/**
 * Props for ThemeProvider
 */
export interface ThemeProviderProps {
  /** Initial theme configuration */
  defaultTheme?: ThemeConfig;
  /** Persist theme to localStorage */
  storageKey?: string;
  /** Children to render */
  children: React.ReactNode;
  /** Disable transitions during theme change */
  disableTransitions?: boolean;
  /** Force a specific color mode (overrides user preference) */
  forcedColorMode?: ResolvedColorMode;
}
