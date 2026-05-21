/**
 * Typography primitives
 * Font families, sizes, weights, and line heights
 */

export const fontFamilies = {
  /** Primary sans-serif for UI */
  sans: 'var(--font-sans, "Plus Jakarta Sans", system-ui, -apple-system, sans-serif)',
  /** Monospace for code */
  mono: 'var(--font-mono, "JetBrains Mono", "Fira Code", monospace)',
  /** Display font for headings */
  display: 'var(--font-display, "Clash Display", "Plus Jakarta Sans", system-ui, sans-serif)',
} as const;

export const fontSizes = {
  /** 10px */
  '2xs': '0.625rem',
  /** 12px */
  xs: '0.75rem',
  /** 14px */
  sm: '0.875rem',
  /** 16px */
  base: '1rem',
  /** 18px */
  lg: '1.125rem',
  /** 20px */
  xl: '1.25rem',
  /** 24px */
  '2xl': '1.5rem',
  /** 30px */
  '3xl': '1.875rem',
  /** 36px */
  '4xl': '2.25rem',
  /** 48px */
  '5xl': '3rem',
  /** 60px */
  '6xl': '3.75rem',
  /** 72px */
  '7xl': '4.5rem',
  /** 96px */
  '8xl': '6rem',
  /** 128px */
  '9xl': '8rem',
} as const;

export const fontWeights = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const lineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

export type FontFamilies = typeof fontFamilies;
export type FontSizes = typeof fontSizes;
export type FontWeights = typeof fontWeights;
export type LineHeights = typeof lineHeights;
export type LetterSpacings = typeof letterSpacings;
