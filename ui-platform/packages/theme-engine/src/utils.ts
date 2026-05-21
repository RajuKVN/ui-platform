import type { ColorOverrides, ResolvedColorMode, ColorMode, ThemeState, ModeColor } from './types';

const STORAGE_KEY = 'ui-platform-theme';

/**
 * Convert hex color to HSL components
 */
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convert HSL to hex color
 */
function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else if (h >= 300 && h < 360) {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number): string => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Calculate the relative luminance of a color (WCAG formula)
 * Returns a value between 0 (black) and 1 (white)
 * @see https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getRelativeLuminance(hex: string): number {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  // Apply gamma correction (linearize)
  const linearize = (c: number): number => {
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const rLin = linearize(r);
  const gLin = linearize(g);
  const bLin = linearize(b);

  // Calculate relative luminance
  return 0.2126 * rLin + 0.7152 * gLin + 0.0722 * bLin;
}

/**
 * Calculate contrast ratio between two colors (WCAG formula)
 * Returns a value between 1 and 21
 * @see https://www.w3.org/WAI/GL/wiki/Contrast_ratio
 */
function getContrastRatio(color1: string, color2: string): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determine the best foreground color (white or black) for a given background
 * Uses WCAG contrast ratio calculation to ensure readability
 * 
 * This function calculates which foreground color provides better contrast
 * against the provided background color, regardless of light/dark theme mode.
 */
function getOptimalForeground(backgroundColor: string): string {
  const WHITE = '#ffffff';
  const BLACK = '#0f172a'; // Slate-900, slightly softer than pure black
  
  const contrastWithWhite = getContrastRatio(backgroundColor, WHITE);
  const contrastWithBlack = getContrastRatio(backgroundColor, BLACK);
  
  // Return the color with better contrast
  // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
  return contrastWithWhite >= contrastWithBlack ? WHITE : BLACK;
}

/**
 * Generate color variants from a base color
 * 
 * The foreground color is calculated using WCAG contrast ratio to ensure
 * maximum readability regardless of the base color or theme mode.
 * 
 * Examples:
 * - Dark indigo (#4f46e5) → white foreground (better contrast)
 * - Light amber (#fbbf24) → black foreground (better contrast)
 * - Medium teal (#14b8a6) → white foreground (better contrast)
 */
function generateColorVariants(baseColor: string, isDark: boolean): {
  base: string;
  foreground: string;
  hover: string;
  active: string;
  subtle: string;
  muted: string;
} {
  const { h, s, l } = hexToHSL(baseColor);
  
  // Calculate optimal foreground based on the actual color's luminance
  // This uses WCAG contrast ratio calculation, not theme mode
  const foreground = getOptimalForeground(baseColor);
  
  if (isDark) {
    return {
      base: baseColor,
      foreground,
      hover: hslToHex(h, s, Math.min(l + 10, 90)),
      active: hslToHex(h, s, Math.min(l + 20, 95)),
      subtle: hslToHex(h, Math.max(s - 30, 20), 15),
      muted: hslToHex(h, Math.max(s - 40, 15), 25),
    };
  }
  
  return {
    base: baseColor,
    foreground,
    hover: hslToHex(h, s, Math.max(l - 10, 20)),
    active: hslToHex(h, s, Math.max(l - 20, 15)),
    subtle: hslToHex(h, Math.max(s - 30, 20), 92),
    muted: hslToHex(h, Math.max(s - 40, 15), 96),
  };
}

/**
 * Get the system color mode preference
 */
export function getSystemColorMode(): ResolvedColorMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get the system reduced motion preference
 */
export function getSystemReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Resolve color mode from preference
 */
export function resolveColorMode(mode: ColorMode): ResolvedColorMode {
  if (mode === 'system') {
    return getSystemColorMode();
  }
  return mode;
}

/**
 * Helper to check if a value is a ModeColor object
 */
function isModeColor(value: string | ModeColor | undefined): value is ModeColor {
  return typeof value === 'object' && value !== null && ('light' in value || 'dark' in value);
}

/**
 * Get the appropriate color value based on current mode
 */
function resolveColor(value: string | ModeColor | undefined, isDark: boolean): string | undefined {
  if (!value) return undefined;
  if (isModeColor(value)) {
    return isDark ? value.dark : value.light;
  }
  return value;
}

/**
 * Base radius values (in rem) that will be scaled
 */
const BASE_RADIUS = {
  sm: 0.125,
  default: 0.25,
  md: 0.375,
  lg: 0.5,
  xl: 0.75,
  '2xl': 1,
  '3xl': 1.5,
};

/**
 * Apply theme to document
 * Uses CSS variables for zero-rerender theme switching
 */
export function applyThemeToDocument(theme: ThemeState): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const isDark = theme.resolvedColorMode === 'dark';

  // Apply color mode
  root.classList.remove('light', 'dark');
  root.classList.add(theme.resolvedColorMode);
  root.setAttribute('data-theme', theme.resolvedColorMode);

  // Apply density
  root.setAttribute('data-density', theme.density);

  // Apply primary color with all variants
  if (theme.colors.primary) {
    const variants = generateColorVariants(theme.colors.primary, isDark);
    root.style.setProperty('--color-primary', variants.base);
    root.style.setProperty('--color-primary-foreground', variants.foreground);
    root.style.setProperty('--color-primary-hover', variants.hover);
    root.style.setProperty('--color-primary-active', variants.active);
    root.style.setProperty('--color-primary-subtle', variants.subtle);
    root.style.setProperty('--color-primary-muted', variants.muted);
    // Also update focus border to match primary
    root.style.setProperty('--color-border-focus', variants.base);
  }

  // Apply secondary color with all variants
  if (theme.colors.secondary) {
    const variants = generateColorVariants(theme.colors.secondary, isDark);
    root.style.setProperty('--color-secondary', variants.base);
    root.style.setProperty('--color-secondary-foreground', variants.foreground);
    root.style.setProperty('--color-secondary-hover', variants.hover);
    root.style.setProperty('--color-secondary-active', variants.active);
    root.style.setProperty('--color-secondary-subtle', variants.subtle);
    root.style.setProperty('--color-secondary-muted', variants.muted);
  }

  // Apply accent color with all variants
  if (theme.colors.accent) {
    const variants = generateColorVariants(theme.colors.accent, isDark);
    root.style.setProperty('--color-accent', variants.base);
    root.style.setProperty('--color-accent-foreground', variants.foreground);
    root.style.setProperty('--color-accent-hover', variants.hover);
    root.style.setProperty('--color-accent-active', variants.active);
    root.style.setProperty('--color-accent-subtle', variants.subtle);
    root.style.setProperty('--color-accent-muted', variants.muted);
  }

  // Apply background/foreground overrides (mode-aware)
  const bgColor = resolveColor(theme.colors.background, isDark);
  if (bgColor) {
    root.style.setProperty('--color-background', bgColor);
  }
  
  const fgColor = resolveColor(theme.colors.foreground, isDark);
  if (fgColor) {
    root.style.setProperty('--color-foreground', fgColor);
  }
  
  if (theme.colors.border) {
    root.style.setProperty('--color-border', theme.colors.border as string);
  }

  // Apply font overrides
  if (theme.fonts.sans) {
    root.style.setProperty('--font-sans', theme.fonts.sans);
  }
  if (theme.fonts.mono) {
    root.style.setProperty('--font-mono', theme.fonts.mono);
  }
  if (theme.fonts.display) {
    root.style.setProperty('--font-display', theme.fonts.display);
  }

  // Apply radius scale - scale ALL radius tokens
  const scale = theme.radiusScale;
  if (scale !== 1) {
    // Scale all radius values
    root.style.setProperty('--radius-sm', `${BASE_RADIUS.sm * scale}rem`);
    root.style.setProperty('--radius-default', `${BASE_RADIUS.default * scale}rem`);
    root.style.setProperty('--radius-md', `${BASE_RADIUS.md * scale}rem`);
    root.style.setProperty('--radius-lg', `${BASE_RADIUS.lg * scale}rem`);
    root.style.setProperty('--radius-xl', `${BASE_RADIUS.xl * scale}rem`);
    root.style.setProperty('--radius-2xl', `${BASE_RADIUS['2xl'] * scale}rem`);
    root.style.setProperty('--radius-3xl', `${BASE_RADIUS['3xl'] * scale}rem`);
    // Handle edge cases
    if (scale === 0) {
      root.style.setProperty('--radius-full', '0px');
    }
  }
  // Store scale for reference
  root.style.setProperty('--radius-scale', String(scale));

  // Apply reduced motion
  if (theme.reducedMotion) {
    root.setAttribute('data-reduced-motion', 'true');
  } else {
    root.removeAttribute('data-reduced-motion');
  }
}

/**
 * Clear custom theme styles from document
 */
export function clearCustomStyles(): void {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const customProps = [
    // Primary variants
    '--color-primary',
    '--color-primary-foreground',
    '--color-primary-hover',
    '--color-primary-active',
    '--color-primary-subtle',
    '--color-primary-muted',
    // Secondary variants
    '--color-secondary',
    '--color-secondary-foreground',
    '--color-secondary-hover',
    '--color-secondary-active',
    '--color-secondary-subtle',
    '--color-secondary-muted',
    // Accent variants
    '--color-accent',
    '--color-accent-foreground',
    '--color-accent-hover',
    '--color-accent-active',
    '--color-accent-subtle',
    '--color-accent-muted',
    // Other colors
    '--color-background',
    '--color-foreground',
    '--color-border',
    '--color-border-focus',
    // Fonts
    '--font-sans',
    '--font-mono',
    '--font-display',
    // Radius tokens
    '--radius-scale',
    '--radius-sm',
    '--radius-default',
    '--radius-md',
    '--radius-lg',
    '--radius-xl',
    '--radius-2xl',
    '--radius-3xl',
    '--radius-full',
  ];

  customProps.forEach((prop) => {
    root.style.removeProperty(prop);
  });
}

/**
 * Save theme to localStorage
 * Note: Only user preferences are saved. Brand colors (primary/secondary/accent)
 * are always defined in code by the developer, not stored in user preferences.
 */
export function saveThemeToStorage(theme: ThemeState, key: string = STORAGE_KEY): void {
  if (typeof localStorage === 'undefined') return;

  try {
    // Only save user preferences, not brand colors
    // Brand colors are defined in code and should not be overridden by cached values
    const data = {
      colorMode: theme.colorMode,
      density: theme.density,
      reducedMotion: theme.reducedMotion,
      // Note: colors and radiusScale are NOT saved - they come from app config
    };
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Silently fail if localStorage is not available
  }
}

/**
 * Load theme from localStorage
 */
export function loadThemeFromStorage(key: string = STORAGE_KEY): Partial<ThemeState> | null {
  if (typeof localStorage === 'undefined') return null;

  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;
    return JSON.parse(stored) as Partial<ThemeState>;
  } catch {
    return null;
  }
}

/**
 * Generate CSS custom properties from color overrides
 */
export function generateColorCSS(colors: ColorOverrides): string {
  const lines: string[] = [];

  if (colors.primary) {
    lines.push(`--color-primary: ${colors.primary};`);
  }
  if (colors.secondary) {
    lines.push(`--color-secondary: ${colors.secondary};`);
  }
  if (colors.accent) {
    lines.push(`--color-accent: ${colors.accent};`);
  }
  if (colors.background) {
    lines.push(`--color-background: ${colors.background};`);
  }
  if (colors.foreground) {
    lines.push(`--color-foreground: ${colors.foreground};`);
  }
  if (colors.border) {
    lines.push(`--color-border: ${colors.border};`);
  }

  return lines.join('\n');
}

/**
 * Disable transitions temporarily (for theme switches)
 */
export function disableTransitionsTemporarily(duration: number = 0): void {
  if (typeof document === 'undefined') return;

  const style = document.createElement('style');
  style.textContent = `
    *,
    *::before,
    *::after {
      transition-duration: 0s !important;
    }
  `;
  document.head.appendChild(style);

  setTimeout(() => {
    style.remove();
  }, duration);
}
