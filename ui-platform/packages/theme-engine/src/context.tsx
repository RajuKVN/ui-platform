import * as React from 'react';
import type { DensityMode } from '@ui-platform/design-tokens';
import type {
  ColorMode,
  ColorOverrides,
  ThemeContextValue,
  ThemeProviderProps,
  ThemeState,
} from './types';
import {
  applyThemeToDocument,
  clearCustomStyles,
  getSystemColorMode,
  getSystemReducedMotion,
  loadThemeFromStorage,
  resolveColorMode,
  saveThemeToStorage,
  disableTransitionsTemporarily,
} from './utils';

const DEFAULT_THEME: ThemeState = {
  colorMode: 'system',
  resolvedColorMode: 'light',
  density: 'comfortable',
  colors: {},
  fonts: {},
  radiusScale: 1,
  reducedMotion: false,
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

/**
 * Theme Provider component
 * Provides theme context to the entire application
 */
export function ThemeProvider({
  defaultTheme,
  storageKey = 'ui-platform-theme',
  children,
  disableTransitions = true,
  forcedColorMode,
}: ThemeProviderProps): React.JSX.Element {
  // Initialize state from storage or defaults
  // Note: Brand colors (primary/secondary/accent) always come from defaultTheme (code),
  // not localStorage. Only user preferences (colorMode, density) are persisted.
  const [theme, setTheme] = React.useState<ThemeState>(() => {
    const stored = loadThemeFromStorage(storageKey);
    const systemReducedMotion = getSystemReducedMotion();

    const initialColorMode = stored?.colorMode ?? defaultTheme?.colorMode ?? 'system';
    const resolvedMode = forcedColorMode ?? resolveColorMode(initialColorMode);

    return {
      colorMode: initialColorMode,
      resolvedColorMode: resolvedMode,
      density: stored?.density ?? defaultTheme?.density ?? 'comfortable',
      // Brand colors from code take priority - they define the app's identity
      // Only user-adjustable colors (if any) would come from storage
      colors: defaultTheme?.colors ?? {},
      // Fonts from code (not persisted)
      fonts: defaultTheme?.fonts ?? {},
      radiusScale: defaultTheme?.radiusScale ?? 1,
      reducedMotion: stored?.reducedMotion ?? defaultTheme?.reducedMotion ?? systemReducedMotion,
    };
  });

  // Apply theme to document on mount and changes
  React.useLayoutEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Persist to storage on changes
  React.useEffect(() => {
    saveThemeToStorage(theme, storageKey);
  }, [theme, storageKey]);

  // Listen for system color scheme changes
  React.useEffect(() => {
    if (theme.colorMode !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (): void => {
      const newResolvedMode = getSystemColorMode();
      setTheme((prev) => ({
        ...prev,
        resolvedColorMode: forcedColorMode ?? newResolvedMode,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme.colorMode, forcedColorMode]);

  // Listen for system reduced motion changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (): void => {
      setTheme((prev) => ({
        ...prev,
        reducedMotion: mediaQuery.matches,
      }));
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setColorMode = React.useCallback(
    (mode: ColorMode) => {
      if (disableTransitions) {
        disableTransitionsTemporarily(50);
      }

      setTheme((prev) => ({
        ...prev,
        colorMode: mode,
        resolvedColorMode: forcedColorMode ?? resolveColorMode(mode),
      }));
    },
    [disableTransitions, forcedColorMode]
  );

  const setDensity = React.useCallback((density: DensityMode) => {
    setTheme((prev) => ({ ...prev, density }));
  }, []);

  const setColors = React.useCallback((colors: ColorOverrides) => {
    setTheme((prev) => ({ ...prev, colors: { ...prev.colors, ...colors } }));
  }, []);

  const setRadiusScale = React.useCallback((radiusScale: number) => {
    setTheme((prev) => ({ ...prev, radiusScale }));
  }, []);

  const setReducedMotion = React.useCallback((reducedMotion: boolean) => {
    setTheme((prev) => ({ ...prev, reducedMotion }));
  }, []);

  const toggleColorMode = React.useCallback(() => {
    if (disableTransitions) {
      disableTransitionsTemporarily(50);
    }

    setTheme((prev) => {
      const currentResolved = prev.resolvedColorMode;
      const newMode = currentResolved === 'light' ? 'dark' : 'light';
      return {
        ...prev,
        colorMode: newMode,
        resolvedColorMode: forcedColorMode ?? newMode,
      };
    });
  }, [disableTransitions, forcedColorMode]);

  const resetTheme = React.useCallback(() => {
    clearCustomStyles();
    setTheme({
      ...DEFAULT_THEME,
      resolvedColorMode: forcedColorMode ?? resolveColorMode('system'),
    });
  }, [forcedColorMode]);

  const contextValue = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setColorMode,
      setDensity,
      setColors,
      setRadiusScale,
      setReducedMotion,
      toggleColorMode,
      resetTheme,
    }),
    [
      theme,
      setColorMode,
      setDensity,
      setColors,
      setRadiusScale,
      setReducedMotion,
      toggleColorMode,
      resetTheme,
    ]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme context
 */
export function useTheme(): ThemeContextValue {
  const context = React.useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

/**
 * Hook to get just the color mode
 */
export function useColorMode(): {
  colorMode: ColorMode;
  resolvedColorMode: 'light' | 'dark';
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
} {
  const { theme, setColorMode, toggleColorMode } = useTheme();

  return {
    colorMode: theme.colorMode,
    resolvedColorMode: theme.resolvedColorMode,
    setColorMode,
    toggleColorMode,
  };
}

/**
 * Hook to get just the density mode
 */
export function useDensity(): {
  density: DensityMode;
  setDensity: (density: DensityMode) => void;
} {
  const { theme, setDensity } = useTheme();

  return {
    density: theme.density,
    setDensity,
  };
}
