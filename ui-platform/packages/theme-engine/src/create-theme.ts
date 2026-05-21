import type { DensityMode } from '@ui-platform/design-tokens';
import type { ColorMode, ThemeConfig } from './types';

/**
 * Brand theme configuration
 */
export interface BrandTheme {
  name: string;
  colors: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: {
      light?: string;
      dark?: string;
    };
    foreground?: {
      light?: string;
      dark?: string;
    };
  };
  fonts?: {
    sans?: string;
    mono?: string;
    display?: string;
  };
  radius?: 'none' | 'small' | 'medium' | 'large' | 'full';
}

/**
 * Theme creation options
 */
export interface CreateThemeOptions {
  /** Default color mode */
  defaultColorMode?: ColorMode;
  /** Default density */
  defaultDensity?: DensityMode;
  /** Brand theme configuration */
  brand?: BrandTheme;
  /** Enable reduced motion by default */
  reducedMotion?: boolean;
}

/**
 * Create a theme configuration from options
 * This is the primary API for apps to define their theme
 */
export function createTheme(options: CreateThemeOptions = {}): ThemeConfig {
  const { defaultColorMode = 'system', defaultDensity = 'comfortable', brand, reducedMotion = false } = options;

  const radiusScaleMap: Record<string, number> = {
    none: 0,
    small: 0.5,
    medium: 1,
    large: 1.5,
    full: 2,
  };

  return {
    colorMode: defaultColorMode,
    density: defaultDensity,
    colors: brand?.colors
      ? {
          primary: brand.colors.primary,
          secondary: brand.colors.secondary,
          accent: brand.colors.accent,
          // Pass mode-specific background/foreground
          background: brand.colors.background,
          foreground: brand.colors.foreground,
        }
      : undefined,
    // Pass font overrides
    fonts: brand?.fonts
      ? {
          sans: brand.fonts.sans,
          mono: brand.fonts.mono,
          display: brand.fonts.display,
        }
      : undefined,
    radiusScale: brand?.radius ? radiusScaleMap[brand.radius] ?? 1 : 1,
    reducedMotion,
  };
}

/**
 * Generate CSS for a brand theme
 * Useful for SSR or static generation
 */
export function generateBrandCSS(brand: BrandTheme): string {
  const lines: string[] = [':root {'];

  if (brand.colors.primary) {
    lines.push(`  --color-primary: ${brand.colors.primary};`);
  }
  if (brand.colors.secondary) {
    lines.push(`  --color-secondary: ${brand.colors.secondary};`);
  }
  if (brand.colors.accent) {
    lines.push(`  --color-accent: ${brand.colors.accent};`);
  }
  if (brand.fonts?.sans) {
    lines.push(`  --font-sans: ${brand.fonts.sans};`);
  }
  if (brand.fonts?.mono) {
    lines.push(`  --font-mono: ${brand.fonts.mono};`);
  }
  if (brand.fonts?.display) {
    lines.push(`  --font-display: ${brand.fonts.display};`);
  }

  lines.push('}');

  // Light theme overrides
  if (brand.colors.background?.light || brand.colors.foreground?.light) {
    lines.push('');
    lines.push(':root, .light, [data-theme="light"] {');
    if (brand.colors.background?.light) {
      lines.push(`  --color-background: ${brand.colors.background.light};`);
    }
    if (brand.colors.foreground?.light) {
      lines.push(`  --color-foreground: ${brand.colors.foreground.light};`);
    }
    lines.push('}');
  }

  // Dark theme overrides
  if (brand.colors.background?.dark || brand.colors.foreground?.dark) {
    lines.push('');
    lines.push('.dark, [data-theme="dark"] {');
    if (brand.colors.background?.dark) {
      lines.push(`  --color-background: ${brand.colors.background.dark};`);
    }
    if (brand.colors.foreground?.dark) {
      lines.push(`  --color-foreground: ${brand.colors.foreground.dark};`);
    }
    lines.push('}');
  }

  return lines.join('\n');
}

/**
 * Preset brand themes for quick setup
 */
export const presetThemes = {
  /** Default indigo theme */
  indigo: {
    name: 'Indigo',
    colors: {
      primary: '#4f46e5',
      secondary: '#0d9488',
      accent: '#f59e0b',
    },
  },

  /** Ocean blue theme */
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#0ea5e9',
      secondary: '#06b6d4',
      accent: '#f97316',
    },
  },

  /** Forest green theme */
  forest: {
    name: 'Forest',
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      accent: '#eab308',
    },
  },

  /** Rose theme */
  rose: {
    name: 'Rose',
    colors: {
      primary: '#e11d48',
      secondary: '#db2777',
      accent: '#8b5cf6',
    },
  },

  /** Slate monochrome theme */
  slate: {
    name: 'Slate',
    colors: {
      primary: '#475569',
      secondary: '#64748b',
      accent: '#0ea5e9',
    },
  },
} as const satisfies Record<string, BrandTheme>;
