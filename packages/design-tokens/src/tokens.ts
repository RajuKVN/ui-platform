/**
 * Complete design token definitions
 * This is the main export for consuming applications
 */

import { primitiveColors } from './primitives/colors';
import { primitiveSpacing } from './primitives/spacing';
import { fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacings } from './primitives/typography';
import { primitiveRadius } from './primitives/radius';
import { primitiveElevation } from './primitives/elevation';
import { durations, easings } from './primitives/motion';
import { breakpoints, containerWidths, zIndices } from './primitives/layout';

/**
 * Complete token set for runtime access
 */
export const tokens = {
  colors: primitiveColors,
  spacing: primitiveSpacing,
  fonts: fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  radius: primitiveRadius,
  elevation: primitiveElevation,
  durations,
  easings,
  breakpoints,
  containerWidths,
  zIndices,
} as const;

export type Tokens = typeof tokens;

/**
 * Density mode configuration
 */
export type DensityMode = 'compact' | 'comfortable' | 'spacious';

export const densityMultipliers: Record<DensityMode, number> = {
  compact: 0.75,
  comfortable: 1,
  spacious: 1.25,
};

/**
 * Default CSS variable values for light theme
 */
export const lightThemeValues = {
  // Background
  '--color-background': primitiveColors.neutral[0],
  '--color-background-subtle': primitiveColors.neutral[50],
  '--color-background-muted': primitiveColors.neutral[100],
  '--color-background-emphasized': primitiveColors.neutral[200],
  '--color-background-inverse': primitiveColors.neutral[900],
  
  // Foreground
  '--color-foreground': primitiveColors.neutral[900],
  '--color-foreground-muted': primitiveColors.neutral[600],
  '--color-foreground-subtle': primitiveColors.neutral[400],
  '--color-foreground-inverse': primitiveColors.neutral[0],
  
  // Surface
  '--color-surface': primitiveColors.neutral[0],
  '--color-surface-raised': primitiveColors.neutral[0],
  '--color-surface-overlay': primitiveColors.neutral[0],
  '--color-surface-sunken': primitiveColors.neutral[100],
  
  // Border
  '--color-border': primitiveColors.neutral[200],
  '--color-border-subtle': primitiveColors.neutral[100],
  '--color-border-strong': primitiveColors.neutral[300],
  '--color-border-focus': primitiveColors.primary[500],
  
  // Primary
  '--color-primary': primitiveColors.primary[600],
  '--color-primary-foreground': primitiveColors.neutral[0],
  '--color-primary-hover': primitiveColors.primary[700],
  '--color-primary-active': primitiveColors.primary[800],
  '--color-primary-subtle': primitiveColors.primary[100],
  '--color-primary-muted': primitiveColors.primary[50],
  
  // Secondary
  '--color-secondary': primitiveColors.secondary[600],
  '--color-secondary-foreground': primitiveColors.neutral[0],
  '--color-secondary-hover': primitiveColors.secondary[700],
  '--color-secondary-active': primitiveColors.secondary[800],
  '--color-secondary-subtle': primitiveColors.secondary[100],
  '--color-secondary-muted': primitiveColors.secondary[50],
  
  // Accent
  '--color-accent': primitiveColors.accent[500],
  '--color-accent-foreground': primitiveColors.neutral[900],
  '--color-accent-hover': primitiveColors.accent[600],
  '--color-accent-active': primitiveColors.accent[700],
  '--color-accent-subtle': primitiveColors.accent[100],
  '--color-accent-muted': primitiveColors.accent[50],
  
  // Success
  '--color-success': primitiveColors.success[600],
  '--color-success-foreground': primitiveColors.neutral[0],
  '--color-success-subtle': primitiveColors.success[100],
  '--color-success-muted': primitiveColors.success[50],
  
  // Warning
  '--color-warning': primitiveColors.warning[500],
  '--color-warning-foreground': primitiveColors.neutral[900],
  '--color-warning-subtle': primitiveColors.warning[100],
  '--color-warning-muted': primitiveColors.warning[50],
  
  // Error
  '--color-error': primitiveColors.error[600],
  '--color-error-foreground': primitiveColors.neutral[0],
  '--color-error-subtle': primitiveColors.error[100],
  '--color-error-muted': primitiveColors.error[50],
  
  // Info
  '--color-info': primitiveColors.info[600],
  '--color-info-foreground': primitiveColors.neutral[0],
  '--color-info-subtle': primitiveColors.info[100],
  '--color-info-muted': primitiveColors.info[50],
} as const;

/**
 * Default CSS variable values for dark theme
 */
export const darkThemeValues = {
  // Background
  '--color-background': primitiveColors.neutral[950],
  '--color-background-subtle': primitiveColors.neutral[900],
  '--color-background-muted': primitiveColors.neutral[800],
  '--color-background-emphasized': primitiveColors.neutral[700],
  '--color-background-inverse': primitiveColors.neutral[50],
  
  // Foreground
  '--color-foreground': primitiveColors.neutral[50],
  '--color-foreground-muted': primitiveColors.neutral[400],
  '--color-foreground-subtle': primitiveColors.neutral[500],
  '--color-foreground-inverse': primitiveColors.neutral[900],
  
  // Surface
  '--color-surface': primitiveColors.neutral[900],
  '--color-surface-raised': primitiveColors.neutral[800],
  '--color-surface-overlay': primitiveColors.neutral[800],
  '--color-surface-sunken': primitiveColors.neutral[950],
  
  // Border
  '--color-border': primitiveColors.neutral[700],
  '--color-border-subtle': primitiveColors.neutral[800],
  '--color-border-strong': primitiveColors.neutral[600],
  '--color-border-focus': primitiveColors.primary[400],
  
  // Primary
  '--color-primary': primitiveColors.primary[500],
  '--color-primary-foreground': primitiveColors.neutral[0],
  '--color-primary-hover': primitiveColors.primary[400],
  '--color-primary-active': primitiveColors.primary[300],
  '--color-primary-subtle': primitiveColors.primary[950],
  '--color-primary-muted': primitiveColors.primary[900],
  
  // Secondary
  '--color-secondary': primitiveColors.secondary[500],
  '--color-secondary-foreground': primitiveColors.neutral[0],
  '--color-secondary-hover': primitiveColors.secondary[400],
  '--color-secondary-active': primitiveColors.secondary[300],
  '--color-secondary-subtle': primitiveColors.secondary[950],
  '--color-secondary-muted': primitiveColors.secondary[900],
  
  // Accent
  '--color-accent': primitiveColors.accent[400],
  '--color-accent-foreground': primitiveColors.neutral[900],
  '--color-accent-hover': primitiveColors.accent[300],
  '--color-accent-active': primitiveColors.accent[200],
  '--color-accent-subtle': primitiveColors.accent[950],
  '--color-accent-muted': primitiveColors.accent[900],
  
  // Success
  '--color-success': primitiveColors.success[500],
  '--color-success-foreground': primitiveColors.neutral[0],
  '--color-success-subtle': primitiveColors.success[950],
  '--color-success-muted': primitiveColors.success[900],
  
  // Warning
  '--color-warning': primitiveColors.warning[400],
  '--color-warning-foreground': primitiveColors.neutral[900],
  '--color-warning-subtle': primitiveColors.warning[950],
  '--color-warning-muted': primitiveColors.warning[900],
  
  // Error
  '--color-error': primitiveColors.error[500],
  '--color-error-foreground': primitiveColors.neutral[0],
  '--color-error-subtle': primitiveColors.error[950],
  '--color-error-muted': primitiveColors.error[900],
  
  // Info
  '--color-info': primitiveColors.info[500],
  '--color-info-foreground': primitiveColors.neutral[0],
  '--color-info-subtle': primitiveColors.info[950],
  '--color-info-muted': primitiveColors.info[900],
} as const;

export type ThemeValues = typeof lightThemeValues;
